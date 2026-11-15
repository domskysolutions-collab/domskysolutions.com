"""Reproduce the draft cover from active Domsky tokens and the approved logo.

Run from the repository root. Writes only to this review package, not public/.
"""
from pathlib import Path
from html import escape
import importlib.util
import json

ROOT = Path(__file__).resolve().parents[3]
HERE = Path(__file__).resolve().parent
spec = importlib.util.spec_from_file_location('domsky_visuals', ROOT / '.agents/skills/domsky-editorial-visuals/scripts/generate-visual.py')
visuals = importlib.util.module_from_spec(spec)
spec.loader.exec_module(visuals)
p, fonts = visuals.tokens(ROOT)
logo = (ROOT / 'public/images/brand/logo-light.svg').read_text(encoding='utf-8').split('>', 1)[1].rsplit('</svg>', 1)[0]

def text(x, y, value, size, color='ink', family='sans', weight=400):
    return f'<text x="{x}" y="{y}" fill="{p[color]}" font-family="{escape(fonts[family], quote=True)}" font-size="{size}" font-weight="{weight}">{escape(value)}</text>'

alt = 'ChatGPT Business Hub editorial guide: check eligibility, prepare business facts and review answers.'
body = f'<rect width="1600" height="900" fill="{p["page"]}"/>'
body += f'<g transform="translate(80 48) scale(.85)">{logo}</g>'
body += text(1195, 102, 'AI NEWS', 30, 'action', weight=700)
body += f'<line x1="80" x2="1520" y1="190" y2="190" stroke="{p["gold"]}" stroke-width="3"/>'
body += text(80, 335, 'ChatGPT', 112, family='serif', weight=600)
body += text(80, 475, 'Business Hub', 112, family='serif', weight=600)
body += text(85, 573, 'What to set up first.', 48, 'action')
for i, label in enumerate(['Check eligibility', 'Prepare facts', 'Review answers']):
    y = 260 + i * 155
    body += f'<rect x="970" y="{y}" width="550" height="125" fill="{p["sage"] if i < 2 else p["action"]}"/>'
    body += text(1000, y + 77, str(i + 1).zfill(2), 34, 'action' if i < 2 else 'page', weight=700)
    body += text(1080, y + 77, label, 43, 'ink' if i < 2 else 'page', weight=600)
    if i < 2:
        body += f'<path d="M1245 {y+127} V{y+150} M1237 {y+142} L1245 {y+150} L1253 {y+142}" fill="none" stroke="{p["action"]}" stroke-width="3"/>'
body += f'<line x1="80" x2="1520" y1="740" y2="740" stroke="{p["gold"]}" stroke-width="3"/>'
body += text(80, 820, 'Start with accurate business information.', 42, 'action')
name = 'chatgpt-business-hub-small-business-cover'
svg = f'<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900" role="img" aria-labelledby="title desc"><title id="title">ChatGPT Business Hub: what to set up first</title><desc id="desc">{escape(alt)} Original editorial preparation sequence, not a product interface or guarantee of access.</desc>{body}</svg>\n'
(HERE / (name + '.svg')).write_text(svg, encoding='utf-8')
manifest = dict(id=name, file=name+'.svg', articleSlug='/blog/chatgpt-business-hub-small-business', articleStatus='published', width=1600, height=900, format='article', alt=alt, archetype='software-workflow', method='programmatic', status='draft', sourceBrief='docs/editorial/chatgpt-business-hub/brief.md', maxBytes=400000)
(HERE / (name+'.visual.json')).write_text(json.dumps(manifest, indent=2)+'\n', encoding='utf-8')
manifest.update(id='chatgpt-business-hub-small-business', file='chatgpt-business-hub-small-business.webp')
(HERE / 'chatgpt-business-hub-small-business.visual.json').write_text(json.dumps(manifest, indent=2)+'\n', encoding='utf-8')
print(name+'.svg')
