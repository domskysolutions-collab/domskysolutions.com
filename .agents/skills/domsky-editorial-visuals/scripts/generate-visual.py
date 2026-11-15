#!/usr/bin/env python3
"""Create editable, staged Domsky SVG artwork from a reviewed JSON brief."""
import argparse
import html
import json
import re
import sys
import textwrap
from pathlib import Path
import xml.etree.ElementTree as ET

SIZES = {'article': (1600, 900), 'social': (1200, 630), 'pinterest': (1000, 1500)}
ARCHETYPES = ('editorial-comparison', 'software-workflow', 'geometric-editorial')
HOME = Path(__file__).resolve().parents[1]


def escape(value):
    return html.escape(str(value), quote=True)


def choose(brief):
    explicit = brief.get('archetype')
    if explicit:
        if explicit not in ARCHETYPES:
            raise ValueError('Unknown archetype')
        return explicit
    if brief.get('contentType') == 'comparison' or brief.get('intent') == 'comparison':
        return ARCHETYPES[0]
    if brief.get('steps') or brief.get('intent') in ('workflow', 'audit', 'tutorial'):
        return ARCHETYPES[1]
    return ARCHETYPES[2]


def validate_brief(brief, repo):
    for field in ('id', 'title', 'contentType', 'intent', 'audience', 'decision', 'message', 'concept', 'headline', 'alt'):
        if not isinstance(brief.get(field), str) or not brief[field].strip():
            raise ValueError('Missing text field: ' + field)
        if len(brief[field]) > 240:
            raise ValueError('Brief text is too long: ' + field)
    if not re.fullmatch(r'[a-z0-9]+(?:-[a-z0-9]+)*', brief['id']):
        raise ValueError('id must be a lowercase filename stem')
    if brief.get('method') != 'programmatic':
        raise ValueError('This generator produces programmatic SVG only')
    if brief.get('articleStatus') not in ('published', 'concept'):
        raise ValueError('articleStatus must be published or concept')
    sources = brief.get('sourceFiles')
    if not isinstance(sources, list) or not all(isinstance(s, str) for s in sources):
        raise ValueError('sourceFiles must be an array of repository paths')
    slug = brief.get('articleSlug')
    if brief['articleStatus'] == 'published':
        if not isinstance(slug, str) or not re.fullmatch(r'/(?:uses|(?:blog|comparisons|reviews)/[a-z0-9-]+)', slug) or not sources:
            raise ValueError('Published articles need a canonical slug and sourceFiles')
    elif slug is not None:
        raise ValueError('Unpublished concepts must not invent an articleSlug')
    contents = []
    for source in sources:
        file = (repo / source).resolve()
        if not file.is_relative_to(repo) or not file.is_file():
            raise ValueError('Missing or external article source: ' + source)
        contents.append(file.read_text(encoding='utf-8'))
    if slug and not any(re.search(r"['\"]" + re.escape(slug) + r"['\"]", s) for s in contents):
        raise ValueError('Canonical slug not found in the supplied article sources')
    archetype = choose(brief)
    field, count = ('products', (2, 3)) if archetype == ARCHETYPES[0] else ('steps', (2, 5))
    if archetype != ARCHETYPES[2]:
        items = brief.get(field)
        if not isinstance(items, list) or not count[0] <= len(items) <= count[1] or not all(isinstance(s, str) and s.strip() and len(s) <= 48 for s in items):
            raise ValueError(f'{field} needs {count[0]}–{count[1]} short, exact labels')
        if archetype == ARCHETYPES[1] and not isinstance(brief.get('flow'), bool):
            raise ValueError('Workflow brief must explicitly set flow true or false')
    else:
        for key in ('selectedLabel', 'extrasLabel', 'moduleMeaning'):
            if not isinstance(brief.get(key), str) or not brief[key].strip() or len(brief[key]) > 48:
                raise ValueError('Geometric brief needs a short ' + key)
        for key in ('selectedModules', 'extraModules'):
            if type(brief.get(key)) is not int or not 1 <= brief[key] <= 6:
                raise ValueError('Geometric brief must explicitly choose 1–6 '+key)
    variants = {'editorial-comparison': ('columns', 'bands'), 'software-workflow': ('cards', 'lanes'), 'geometric-editorial': ('selected', 'connected')}
    if brief.get('variant', variants[archetype][0]) not in variants[archetype]:
        raise ValueError('Variant does not belong to the selected archetype')
    return archetype


def tokens(repo):
    css = (repo / 'src/index.css').read_text(encoding='utf-8')
    palette = {}
    for role in ('page', 'ink', 'action', 'gold', 'brick', 'sage', 'sand', 'dark'):
        match = re.search(r'--color-' + role + r':\s*(#[0-9a-fA-F]{6})\s*;', css)
        if not match:
            raise ValueError('Missing active color token: ' + role)
        palette[role] = match[1]
    fonts = {}
    for role in ('sans', 'serif'):
        match = re.search(r'--font-' + role + r':\s*([^;]+);', css)
        if not match:
            raise ValueError('Missing active font token: ' + role)
        fonts[role] = match[1]
    return palette, fonts


def text(value, x, y, width, size, fill, family, max_lines=2, weight=600):
    # Conservative line estimates; the finished SVG still requires actual rendering.
    for _ in range(30):
        lines = textwrap.wrap(value, width=max(5, int(width / (size * .62))), break_long_words=False, break_on_hyphens=False)
        longest = max((len(s) for s in lines), default=0) * size * .62
        if len(lines) <= max_lines and longest <= width:
            break
        size *= .94
    else:
        raise ValueError('Text does not fit; shorten the brief label')
    nodes = [f'<text x="{x:.1f}" y="{y + i * size * 1.2:.1f}" font-family="{escape(family)}" font-size="{size:.1f}" font-weight="{weight}" fill="{fill}">{escape(line)}</text>' for i, line in enumerate(lines)]
    return '\n'.join(nodes), y + (len(lines) - 1) * size * 1.2


def rect(x, y, w, h, fill, stroke=None):
    edge = f' stroke="{stroke}" stroke-width="2"' if stroke else ''
    return f'<rect x="{x:.1f}" y="{y:.1f}" width="{w:.1f}" height="{h:.1f}" fill="{fill}"{edge}/>'


def artwork(brief, repo, width, height):
    kind = validate_brief(brief, repo)
    p, fonts = tokens(repo)
    m, right = width * .05, width * .95
    scale = width / 1600
    logo = (repo / 'public/images/brand/logo-light.svg').read_text(encoding='utf-8')
    ET.fromstring(logo)
    inner = logo.split('>', 1)[1].rsplit('</svg>', 1)[0]
    logo = f'<g transform="translate({m:.1f} {m * .6:.1f}) scale({.65 * scale:.4f})">{inner}</g>'
    rule_y = 166 * scale
    heading, bottom = text(brief['headline'], m, rule_y + 95 * scale, width - 2*m, 64*scale, p['ink'], fonts['serif'])
    top, floor = bottom + 80*scale, height - m
    available, content = floor - top, [heading]
    portrait = height > width
    if kind == ARCHETYPES[0]:
        products = brief['products']
        rows = portrait or brief.get('variant') == 'bands'
        for i, label in enumerate(products):
            if rows:
                gap, box_h = 22*scale, (available - (len(products)-1)*22*scale) / len(products)
                x, y, box_w = m, top + i*(box_h+gap), right-m
            else:
                gap, box_w = 40*scale, (right-m-(len(products)-1)*40*scale)/len(products)
                x, y, box_h = m+i*(box_w+gap), top, available
            content.append(rect(x, y, box_w, box_h, p['sand'] if i % 2 else p['sage']))
            content.append(rect(x, y, box_w, 7*scale, p['action']))
            label_svg, _ = text(label, x+30*scale, y+box_h*.52, box_w-60*scale, (76 if rows else 85)*scale, p['ink'], fonts['sans'])
            content.append(label_svg)
        template = 'comparison-cover.svg'
    elif kind == ARCHETYPES[1]:
        steps = brief['steps']
        rows = portrait or brief.get('variant') == 'lanes'
        for i, label in enumerate(steps):
            gap = 42*scale
            if rows:
                box_h = (available-(len(steps)-1)*gap)/len(steps)
                x, y, box_w = m, top+i*(box_h+gap), right-m
            else:
                box_w = (right-m-(len(steps)-1)*gap)/len(steps)
                x, y, box_h = m+i*(box_w+gap), top, available
            content.append(rect(x, y, box_w, box_h, p['page'], p['action']))
            content.append(rect(x, y, 8*scale, box_h, p['action']))
            label_svg, _ = text(label, x+28*scale, y+(box_h*.56 if rows else 80*scale), box_w-56*scale, (48 if rows else 44)*scale, p['ink'], fonts['sans'])
            content.append(label_svg)
            if not rows:
                for n in range(3):
                    content.append(rect(x+28*scale, y+box_h*.55+n*34*scale, box_w-60*scale, 9*scale, p['sage']))
            if brief['flow'] and i < len(steps)-1:
                if rows:
                    ax, ay = width/2, y+box_h+gap/2
                    points = f'{ax-9*scale},{ay-5*scale} {ax+9*scale},{ay-5*scale} {ax},{ay+7*scale}'
                else:
                    ax, ay = x+box_w+gap/2, y+box_h/2
                    points = f'{ax-5*scale},{ay-9*scale} {ax-5*scale},{ay+9*scale} {ax+7*scale},{ay}'
                content.append(f'<polygon points="{points}" fill="{p["brick"]}"/>')
        template = 'workflow-cover.svg'
    else:
        # Modules signify a relationship, not a recommended number of products.
        group_w = right-m if portrait else (right-m-90*scale)/2
        group_h = (available-60*scale)/2 if portrait else available
        for group, label in enumerate((brief['selectedLabel'], brief['extrasLabel'])):
            gx = m if portrait else m+group*(group_w+90*scale)
            gy = top+group*(group_h+60*scale) if portrait else top
            heading_svg, _ = text(label, gx, gy+30*scale, group_w, 36*scale, p['ink'], fonts['sans'])
            content.append(heading_svg)
            count, cols = (brief['selectedModules'] if group == 0 else brief['extraModules']), 3
            cell = min(group_w/3.7, (group_h-80*scale)/2.4)
            for i in range(count):
                bx, by = gx+(i%cols)*(cell+24*scale), gy+75*scale+(i//cols)*(cell+24*scale)
                content.append(rect(bx, by, cell, cell, p['action'] if group == 0 else p['sage']))
                if brief.get('variant') == 'connected' and i % cols:
                    content.append(f'<line x1="{bx-24*scale}" y1="{by+cell/2}" x2="{bx}" y2="{by+cell/2}" stroke="{p["gold"]}" stroke-width="3"/>')
        template = 'editorial-cover.svg'
    values = dict(WIDTH=width, HEIGHT=height, TITLE=escape(brief['title']), ALT=escape(brief['alt']), PAGE=p['page'], GOLD=p['gold'], SAGE=p['sage'], LOGO=logo, MARGIN=f'{m:.1f}', RIGHT=f'{right:.1f}', RULE_Y=f'{rule_y:.1f}', ACCENT_WIDTH=f'{width*.15:.1f}', CONTENT='\n'.join(content))
    svg = (HOME / 'templates' / template).read_text(encoding='utf-8')
    for key, value in values.items():
        svg = svg.replace('{{'+key+'}}', str(value))
    if '{{' in svg:
        raise ValueError('Unresolved template field')
    ET.fromstring(svg)
    return svg, kind


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--repo', type=Path, required=True)
    parser.add_argument('--brief', type=Path, required=True)
    parser.add_argument('--out', type=Path, required=True)
    parser.add_argument('--format', choices=SIZES, default='article')
    args = parser.parse_args()
    repo, out = args.repo.resolve(), args.out.resolve()
    if not out.is_relative_to(repo) or out.is_relative_to(repo/'public') or out.is_relative_to(repo/'.git') or out.is_relative_to(repo/'node_modules'):
        raise ValueError('Draft output must stay inside the repository and outside public/.git/node_modules')
    brief = json.loads(args.brief.read_text(encoding='utf-8'))
    width, height = SIZES[args.format]
    svg, kind = artwork(brief, repo, width, height)
    suffix = '' if args.format == 'article' else '-'+args.format
    name = brief['id']+suffix
    out.mkdir(parents=True, exist_ok=True)
    image, manifest = out/(name+'.svg'), out/(name+'.visual.json')
    if image.exists() or manifest.exists():
        raise ValueError('Draft exists; choose a new output directory or id')
    metadata = dict(id=name, file=image.name, articleSlug=brief['articleSlug'], articleStatus=brief['articleStatus'], width=width, height=height, format=args.format, alt=brief['alt'], archetype=kind, method='programmatic', status='draft', sourceBrief=str(args.brief.as_posix()), maxBytes=400000)
    with image.open('x', encoding='utf-8', newline='\n') as file:
        file.write(svg)
    with manifest.open('x', encoding='utf-8', newline='\n') as file:
        json.dump(metadata, file, ensure_ascii=False, indent=2)
        file.write('\n')
    print(json.dumps(dict(image=str(image), manifest=str(manifest), archetype=kind, status='draft')))


if __name__ == '__main__':
    try:
        main()
    except (ValueError, OSError, KeyError, json.JSONDecodeError, ET.ParseError) as error:
        print('ERROR: '+str(error), file=sys.stderr)
        sys.exit(1)
