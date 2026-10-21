import unittest
from verify_structure import validate


class SlideStructureTests(unittest.TestCase):
    def test_top_level_slides(self):
        self.assertEqual(validate('<main id="canvas"><section class="slide" id="a"></section><section class="slide" id="b"></section></main>'), ['a', 'b'])

    def test_nested_gallery_is_allowed(self):
        self.assertEqual(validate('<main id="canvas"><section class="slide" id="a"><dialog><section hidden><img src="x"><br></section></dialog></section></main>'), ['a'])

    def test_slide_inside_gallery_is_rejected(self):
        with self.assertRaisesRegex(ValueError, 'direct child'):
            validate('<main id="canvas"><section class="slide" id="a"><dialog><section class="slide" id="b"></section></dialog></section></main>')

    def test_slide_outside_canvas_is_rejected(self):
        with self.assertRaisesRegex(ValueError, 'direct child'):
            validate('<body><section class="slide" id="a"></section></body>')

    def test_unbalanced_tags_are_rejected(self):
        with self.assertRaisesRegex(ValueError, 'Unbalanced'):
            validate('<main id="canvas"><section class="slide" id="a"><div></section></main>')


if __name__ == '__main__':
    unittest.main()
