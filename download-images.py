#!/usr/bin/env python3
"""Save the photos listed in js/script.js (PHOTOS) into assets/images/. Run once with internet: python3 download-images.py"""
import re, pathlib, urllib.request
root = pathlib.Path(__file__).parent
photos = re.findall(r"'([\w-]+)':\s*'(\d+-[0-9a-f]+)'", (root / 'js/script.js').read_text(encoding='utf8'))
out = root / 'assets/images'
out.mkdir(parents=True, exist_ok=True)
for name, pid in photos:
    url = f'https://images.unsplash.com/photo-{pid}?auto=format&fit=crop&w=1600&q=75'
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        (out / f'{name}.jpg').write_bytes(urllib.request.urlopen(req, timeout=30).read())
        print('saved', name)
    except Exception as e:
        print('FAILED', name, e)
