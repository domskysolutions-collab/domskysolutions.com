#!/usr/bin/env python3
"""Validate real visual files/manifests. This is not an aesthetic or rights review."""
import argparse
import hashlib
import json
import re
import sys
from pathlib import Path
import xml.etree.ElementTree as ET

SIZES = {'article': (1600, 900), 'social': (1200, 630), 'pinterest': (1000, 1500)}
ALLOWED = {'svg', 'g', 'rect', 'line', 'path', 'circle', 'ellipse', 'polyline', 'polygon', 'text', 'tspan', 'title', 'desc', 'defs', 'clipPath'}


def local(value):
    return value.rsplit('}', 1)[-1]


def dimensions(file):
    if file.suffix.lower() == '.svg':
        source = file.read_text(encoding='utf-8')
        if re.search(r'<!DOCTYPE|<!ENTITY', source, re.I):
            raise ValueError('SVG document/entity declarations are not allowed')
        root = ET.fromstring(source)
        if root.tag != '{http://www.w3.org/2000/svg}svg':
            raise ValueError('SVG needs a namespaced svg root')
        ids = set()
        for node in root.iter():
            if local(node.tag) not in ALLOWED:
                raise ValueError('Unsupported/active SVG element: '+local(node.tag))
            if 'id' in node.attrib:
                if node.attrib['id'] in ids:
                    raise ValueError('Duplicate SVG id')
                ids.add(node.attrib['id'])
            for attr, value in node.attrib.items():
                key = local(attr).lower()
                if key.startswith('on') or key in ('href', 'src'):
                    raise ValueError('Active or external SVG reference: '+key)
                if 'url(' in value.lower() and not re.fullmatch(r'url\(#[A-Za-z0-9_-]+\)', value):
                    raise ValueError('External SVG paint/resource reference')
        if not any(local(n.tag) == 'title' and (n.text or '').strip() for n in root):
            raise ValueError('SVG needs a descriptive title')
        if not any(local(n.tag) == 'desc' and (n.text or '').strip() for n in root):
            raise ValueError('SVG needs a descriptive desc')
        width, height = float(root.attrib['width']), float(root.attrib['height'])
        box = [float(n) for n in re.split(r'[ ,]+', root.attrib['viewBox'].strip())]
        if box != [0, 0, width, height]:
            raise ValueError('SVG viewBox must match its declared canvas')
        return width, height
    if file.suffix.lower() not in ('.webp', '.avif', '.png', '.jpg', '.jpeg'):
        raise ValueError('Unsupported visual format')
    try:
        from PIL import Image
    except ImportError as error:
        raise ValueError('Raster validation needs an already available Pillow runtime; dimensions were not validated') from error
    with Image.open(file) as image:
        expected = {'.webp': 'WEBP', '.avif': 'AVIF', '.png': 'PNG', '.jpg': 'JPEG', '.jpeg': 'JPEG'}[file.suffix.lower()]
        if image.format != expected:
            raise ValueError('Raster content differs from filename format')
        size = image.size
        image.verify()
        return size


def validate(manifest, repo=None, require_approved=False, check_site_path=False):
    data = json.loads(manifest.read_text(encoding='utf-8'))
    for field in ('id', 'file', 'alt', 'sourceBrief'):
        if not isinstance(data.get(field), str) or not data[field].strip():
            raise ValueError('Missing '+field)
    if Path(data['file']).name != data['file'] or '/' in data['file'] or '\\' in data['file']:
        raise ValueError('file must be a local basename, not an external/path reference')
    image = (manifest.parent/data['file']).resolve()
    if not image.is_relative_to(manifest.parent.resolve()) or not image.is_file():
        raise ValueError('Missing or external visual file')
    if data.get('articleStatus') not in ('published', 'concept'):
        raise ValueError('Invalid articleStatus')
    if data['articleStatus'] == 'concept' and data.get('articleSlug') is not None:
        raise ValueError('Concept must not invent a published slug')
    if data['articleStatus'] == 'published' and not re.fullmatch(r'/(?:uses|(?:blog|comparisons|reviews)/[a-z0-9-]+)', data.get('articleSlug') or ''):
        raise ValueError('Missing canonical article slug')
    if data.get('archetype') not in ('editorial-comparison', 'software-workflow', 'geometric-editorial'):
        raise ValueError('Invalid archetype')
    if data.get('method') not in ('programmatic', 'generative', 'supplied'):
        raise ValueError('Missing production provenance')
    if data.get('status') not in ('draft', 'approved', 'integrated'):
        raise ValueError('Invalid approval status')
    if require_approved and data['status'] not in ('approved', 'integrated'):
        raise ValueError('Visual has not been recorded as approved')
    expected = (data.get('width'), data.get('height'))
    if not all(isinstance(n, int) and not isinstance(n, bool) and n > 0 for n in expected):
        raise ValueError('Positive integer dimensions are required')
    if data.get('format') not in SIZES or expected != SIZES[data['format']]:
        raise ValueError('Dimensions/aspect ratio differ from requested format')
    actual = dimensions(image)
    if actual != expected:
        raise ValueError(f'Declared/actual dimensions differ: {expected} vs {actual}')
    budget = data.get('maxBytes', 400000)
    if not isinstance(budget, int) or budget <= 0:
        raise ValueError('Invalid byte budget')
    warnings = ['File exceeds byte budget; optimize or explain the exception'] if image.stat().st_size > budget else []
    if check_site_path:
        if repo is None or data.get('articleStatus') != 'published' or data.get('status') not in ('approved', 'integrated'):
            raise ValueError('Site-path validation needs --repo and an approved published-article visual')
        site_path = data.get('sitePath', '')
        if not isinstance(site_path, str) or not site_path.startswith('/images/') or '?' in site_path or '#' in site_path:
            raise ValueError('sitePath must be a local /images/ path')
        target = (repo/'public'/site_path.lstrip('/')).resolve()
        if not target.is_relative_to((repo/'public/images').resolve()) or not target.is_file():
            raise ValueError('Broken or escaping sitePath')
        if hashlib.sha256(image.read_bytes()).digest() != hashlib.sha256(target.read_bytes()).digest():
            raise ValueError('Staged and website asset bytes differ')
    return dict(manifest=str(manifest), file=data['file'], width=actual[0], height=actual[1], bytes=image.stat().st_size, status=data['status'], warnings=warnings)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--manifest', type=Path, action='append', required=True)
    parser.add_argument('--repo', type=Path)
    parser.add_argument('--require-approved', action='store_true')
    parser.add_argument('--check-site-path', action='store_true')
    args = parser.parse_args()
    reports, errors, names = [], [], set()
    for manifest in args.manifest:
        try:
            report = validate(manifest.resolve(), args.repo.resolve() if args.repo else None, args.require_approved, args.check_site_path)
            if report['file'].casefold() in names:
                raise ValueError('Duplicate output filename in batch: '+report['file'])
            names.add(report['file'].casefold())
            reports.append(report)
        except (ValueError, OSError, KeyError, json.JSONDecodeError, ET.ParseError, ImportError) as error:
            errors.append(dict(manifest=str(manifest), error=str(error)))
    print(json.dumps(dict(valid=not errors, results=reports, errors=errors, humanReviewRequired=True), indent=2))
    return bool(errors)


if __name__ == '__main__':
    sys.exit(main())
