"""Build exact editable cover using repository tokens and the actual DS logo."""
from pathlib import Path
import json
import re
from html import escape

OUT=Path(__file__).resolve().parent
REPO=OUT.parents[3]
STEM='solo-business-ai-tools-v2'
ALT='10 AI tools for common solo-business tasks. One useful task at a time.'
css=(REPO/'src/index.css').read_text(encoding='utf8')
def token(name):
    return re.search(r'--color-'+name+r':\s*(#[0-9A-Fa-f]{6});',css).group(1)
def font(name):
    return re.search(r'--font-'+name+r':\s*([^;]+);',css).group(1)
paper,ink,teal,sage,gold=[token(n) for n in ['page','ink','action','sage','gold']]
serif,sans=font('serif'),font('sans')
logo=(REPO/'public/images/brand/logo-light.svg').read_text(encoding='utf8').strip()
logo=re.sub(r'^<svg[^>]*>','',logo).removesuffix('</svg>')
svg=f'''<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900" role="img">
<title>10 AI tools — one useful task at a time</title>
<desc>{ALT} Editorial title illustration for proposed task recipes, not observed results.</desc>
<rect width="1600" height="900" fill="{paper}"/>
<g transform="translate(80 54) scale(0.95)">{logo}</g>
<line x1="80" y1="210" x2="1520" y2="210" stroke="{gold}" stroke-width="3"/>
<text x="80" y="491" font-family="{escape(serif,quote=True)}" font-size="210" font-weight="600" fill="{ink}">10 AI tools</text>
<rect x="80" y="644" width="1440" height="176" fill="{sage}"/>
<line x1="80" y1="644" x2="1520" y2="644" stroke="{teal}" stroke-width="4"/>
<text x="120" y="755" font-family="{escape(sans,quote=True)}" font-size="72" font-weight="500" fill="{teal}">One useful task at a time</text>
</svg>
'''
(OUT/(STEM+'.svg')).write_text(svg,encoding='utf8')
for ext,status in [('.svg','draft'),('.webp','integrated')]:
    data=dict(id=STEM+('-source' if ext=='.svg' else ''),file=STEM+ext,articleSlug='/blog/ai-tools-look-like-team-of-10',articleStatus='published',width=1600,height=900,format='article',alt=ALT,archetype='software-workflow',method='programmatic',status=status,sourceBrief='docs/editorial/guides-upgrade/visuals/visual-brief.md',maxBytes=400000,flow=False,releaseState='Review branch only; not final owner editorial approval or deployment.')
    if ext=='.webp': data['sitePath']='/images/blog/'+STEM+ext
    (OUT/(STEM+('-source' if ext=='.svg' else '')+'.visual.json')).write_text(json.dumps(data,indent=2)+'\n',encoding='utf8')
print('Wrote editable cover SVG and source/delivery manifests.')
