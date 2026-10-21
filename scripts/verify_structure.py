"""Reject slides nested in galleries or moved out of the presentation canvas."""
from html.parser import HTMLParser
from pathlib import Path
import sys

VOID = set('area base br col embed hr img input link meta param source track wbr'.split())


class SlideStructure(HTMLParser):
    def __init__(self):
        super().__init__()
        self.stack = []
        self.ids = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == 'section' and 'slide' in attrs.get('class', '').split():
            parent = self.stack[-1] if self.stack else None
            if not parent or parent[0] != 'main' or parent[1].get('id') != 'canvas':
                raise ValueError(f"Slide {attrs.get('id')} must be a direct child of main#canvas; parent={parent}")
            self.ids.append(attrs.get('id'))
        if tag not in VOID:
            self.stack.append((tag, attrs))

    def handle_endtag(self, tag):
        if tag in VOID:
            return
        if not self.stack or self.stack[-1][0] != tag:
            raise ValueError(f"Unbalanced closing tag </{tag}> at {self.getpos()}")
        self.stack.pop()

    def finish(self):
        if self.stack:
            raise ValueError('Unclosed HTML elements')
        return self.ids


def validate(source):
    parser = SlideStructure()
    parser.feed(source)
    return parser.finish()


if __name__ == '__main__':
    ids = validate(Path(sys.argv[1]).read_text())
    print(f'PASS: {len(ids)} top-level slide elements; balanced HTML.')
