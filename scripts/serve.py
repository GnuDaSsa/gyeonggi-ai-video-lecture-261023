#!/usr/bin/env python3
"""Local deck preview with byte-range support for native video seeking."""
import argparse
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import re


class RangeHandler(SimpleHTTPRequestHandler):
    def send_head(self):
        self.range_length = None
        header = self.headers.get("Range")
        path = Path(self.translate_path(self.path))
        # Unsupported multi-range and conditional-range requests fall back to 200.
        match = re.fullmatch(r"bytes=(\d*)-(\d*)", header or "")
        if (self.command != "GET" or not match
                or self.headers.get("If-Range")
                or self.headers.get("If-Modified-Since")
                or not path.is_file()):
            return super().send_head()
        try:
            source = path.open("rb")
        except OSError:
            self.send_error(404, "File not found")
            return None
        size = path.stat().st_size
        first, last = match.groups()
        start = int(first) if first else max(0, size - int(last or "0"))
        end = min(int(last), size - 1) if first and last else size - 1
        if not size or start >= size or end < start or not (first or last):
            source.close()
            self.send_response(416)
            self.send_header("Content-Range", "bytes */%d" % size)
            self.send_header("Content-Length", "0")
            self.end_headers()
            return None
        self.range_length = end - start + 1
        self.send_response(206)
        self.send_header("Content-type", self.guess_type(str(path)))
        self.send_header("Content-Range", "bytes %d-%d/%d" % (start, end, size))
        self.send_header("Content-Length", str(self.range_length))
        self.send_header("Last-Modified", self.date_time_string(path.stat().st_mtime))
        self.end_headers()
        source.seek(start)
        return source

    def end_headers(self):
        self.send_header("Accept-Ranges", "bytes")
        super().end_headers()

    def copyfile(self, source, outputfile):
        try:
            if self.range_length is None:
                return super().copyfile(source, outputfile)
            remaining = self.range_length
            while remaining:
                block = source.read(min(64 * 1024, remaining))
                if not block:
                    break
                outputfile.write(block)
                remaining -= len(block)
        except (BrokenPipeError, ConnectionResetError):
            pass  # Browsers cancel requests when seeking or leaving a slide.


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--port", type=int, default=8765)
    args = parser.parse_args()
    root = Path(__file__).resolve().parents[1]
    handler = partial(RangeHandler, directory=str(root))
    with ThreadingHTTPServer(("127.0.0.1", args.port), handler) as server:
        print("Preview: http://127.0.0.1:%d" % args.port, flush=True)
        try:
            server.serve_forever()
        except KeyboardInterrupt:
            pass


if __name__ == "__main__":
    main()
