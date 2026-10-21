from functools import partial
import http.client
from http.server import ThreadingHTTPServer
from pathlib import Path
import tempfile
import threading
import unittest

from serve import RangeHandler


class QuietHandler(RangeHandler):
    def log_message(self, *_args):
        pass


class RangeTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.temp = tempfile.TemporaryDirectory()
        Path(cls.temp.name, "clip.mp4").write_bytes(b"0123456789")
        Path(cls.temp.name, "empty.mp4").touch()
        cls.server = ThreadingHTTPServer(
            ("127.0.0.1", 0), partial(QuietHandler, directory=cls.temp.name)
        )
        cls.thread = threading.Thread(target=cls.server.serve_forever)
        cls.thread.start()

    @classmethod
    def tearDownClass(cls):
        cls.server.shutdown()
        cls.thread.join()
        cls.server.server_close()
        cls.temp.cleanup()

    def request(self, range_header=None, method="GET", path="/clip.mp4", extra=None):
        conn = http.client.HTTPConnection(*self.server.server_address, timeout=3)
        headers = dict(extra or {})
        if range_header is not None:
            headers["Range"] = range_header
        conn.request(method, path, headers=headers)
        response = conn.getresponse()
        result = response.status, dict(response.getheaders()), response.read()
        conn.close()
        return result

    def test_full_file(self):
        status, headers, body = self.request()
        self.assertEqual((status, body), (200, b"0123456789"))
        self.assertEqual(headers["Accept-Ranges"], "bytes")

    def test_bounded_range(self):
        status, headers, body = self.request("bytes=2-5")
        self.assertEqual((status, body), (206, b"2345"))
        self.assertEqual(headers["Content-Range"], "bytes 2-5/10")
        self.assertEqual(headers["Content-Length"], "4")

    def test_open_ended_and_suffix(self):
        self.assertEqual(self.request("bytes=7-")[2], b"789")
        self.assertEqual(self.request("bytes=-3")[2], b"789")
        self.assertEqual(self.request("bytes=7-999")[2], b"789")

    def test_head(self):
        status, headers, body = self.request("bytes=2-5", method="HEAD")
        self.assertEqual((status, body), (200, b""))
        self.assertEqual(headers["Content-Length"], "10")

    def test_not_modified_precedes_range(self):
        modified = self.request()[1]["Last-Modified"]
        status, _headers, body = self.request(
            "bytes=2-5", extra={"If-Modified-Since": modified}
        )
        self.assertEqual((status, body), (304, b""))

    def test_unsatisfiable(self):
        for value in ("bytes=10-", "bytes=8-2", "bytes=-0", "bytes=-"):
            status, headers, body = self.request(value)
            self.assertEqual((status, body), (416, b""))
            self.assertEqual(headers["Content-Range"], "bytes */10")
        self.assertEqual(self.request("bytes=0-", path="/empty.mp4")[0], 416)

    def test_unsupported_falls_back(self):
        for value in ("bytes=0-1,5-6", "other=0-5", "bytes=bad"):
            self.assertEqual(self.request(value)[0], 200)
        self.assertEqual(
            self.request("bytes=2-5", extra={"If-Range": '"old-version"'})[0], 200
        )

    def test_missing(self):
        self.assertEqual(self.request("bytes=0-5", path="/missing.mp4")[0], 404)


if __name__ == "__main__":
    unittest.main()
