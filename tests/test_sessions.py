"""Check the public session feed, static routes and their local dependencies."""
from datetime import datetime
from html.parser import HTMLParser
import json
from pathlib import Path
import subprocess
import sys
import unittest
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parents[1]


class References(HTMLParser):
    def __init__(self, source):
        super().__init__()
        self.references = []
        self.ids = set()
        self.feed(source)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if 'id' in attrs:
            if attrs['id'] in self.ids:
                raise ValueError(f'Duplicate HTML ID: {attrs["id"]}')
            self.ids.add(attrs['id'])
        for attribute in ('src', 'href'):
            if attrs.get(attribute):
                self.references.append(attrs[attribute])


class SessionsTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.feed = json.loads((ROOT / 'openfeedback.json').read_text())

    def test_generated_files_are_current(self):
        subprocess.run([sys.executable, str(ROOT / 'scripts/build_sessions.py'), '--check'], check=True, capture_output=True)

    def test_feed_references_and_schedule(self):
        sessions, speakers = self.feed['sessions'], self.feed['speakers']
        visible = {key for key, session in sessions.items() if not session['hideInFeedback']}
        self.assertEqual(visible, {f'talk{i}' for i in range(1, 6)} | {f'panel{i}' for i in range(1, 5)})
        self.assertEqual(len(sessions), 13)
        for key, session in sessions.items():
            self.assertEqual(key, session['id'])
            self.assertTrue(session['title'])
            self.assertTrue(session['trackTitle'])
            self.assertIsInstance(session['tags'], list)
            start = datetime.fromisoformat(session['startTime'])
            end = datetime.fromisoformat(session['endTime'])
            self.assertEqual(start.date().isoformat(), '2026-11-28')
            self.assertEqual(start.utcoffset().total_seconds(), 7200)
            self.assertGreater(end, start)
            for speaker_id in session['speakers']:
                self.assertIn(speaker_id, speakers)
            if key in visible:
                self.assertTrue(session['speakers'])
                page = ROOT / f'sessions/{key}/index.html'
                self.assertTrue(page.exists())
                self.assertIn(f'data-session-id="{key}"', page.read_text())
        for key, speaker in speakers.items():
            self.assertEqual(key, speaker['id'])
            self.assertTrue(speaker['name'])
            url = urlsplit(speaker['photoUrl'])
            self.assertEqual(url.scheme, 'https')
            self.assertTrue((ROOT / url.path.lstrip('/')).is_file())

    def test_local_page_links_and_assets(self):
        for page in [ROOT / 'index.html', *sorted((ROOT / 'sessions').rglob('*.html'))]:
            parsed = References(page.read_text())
            for reference in parsed.references:
                url = urlsplit(reference)
                if url.scheme or url.netloc:
                    continue
                target = ((ROOT / unquote(url.path).lstrip('/')) if url.path.startswith('/')
                          else (page.parent / unquote(url.path))) if url.path else page
                if target.is_dir():
                    target /= 'index.html'
                self.assertTrue(target.is_file(), f'{page.relative_to(ROOT)}: {reference}')
                if url.fragment and target.suffix == '.html':
                    self.assertIn(unquote(url.fragment), References(target.read_text()).ids,
                                  f'{page.relative_to(ROOT)}: {reference}')


if __name__ == '__main__':
    unittest.main()
