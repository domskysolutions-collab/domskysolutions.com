"""Editable editorial artwork. Run from this directory; no network/dependencies."""
from pathlib import Path
import json
import re
from html import escape

OUT = Path(__file__).resolve().parent
REPO = OUT.parents[3]
PUBLIC = REPO / 'public/images/comparisons'
CREAM, INK, TEAL, SAGE, GOLD, LINE = '#F4F0E8', '#2B2A28', '#2F5D5A', '#DFE7DE', '#B99963', '#BDC4B6'
SANS = 'DM Sans, Arial, sans-serif'
SERIF = 'Lora, Georgia, serif'
COVER = 'ai-agent-vs-automation-client-intake-2027-cover-v1'
DESKTOP = 'client-intake-approval-boundary-v1'
MOBILE = 'client-intake-approval-boundary-mobile-v1'
ALT_COVER = 'Three client-intake approaches for 2027 planning: manual handling, rules-based automation and an agent with human review.'
ALT_DIAGRAM = 'Proposed agent route: draft, owner review, approval validation and external dispatch. Pending, declined or expired approvals hold the message; changed content needs new review.'

def rect(x,y,w,h,fill=CREAM,stroke=None):
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="{fill}"'+(f' stroke="{stroke}" stroke-width="2"' if stroke else '')+'/>'

def text(x,y,lines,size=40,fill=INK,weight=400,family=SANS,anchor='start',gap=None):
    if isinstance(lines,str): lines=[lines]
    gap=gap or size*1.2
    return f'<text x="{x}" y="{y}" font-family="{family}" font-size="{size}" font-weight="{weight}" fill="{fill}" text-anchor="{anchor}">'+''.join(f'<tspan x="{x}" dy="{0 if i==0 else gap}">{escape(s)}</tspan>' for i,s in enumerate(lines))+'</text>'

def line(points,color=TEAL,width=4,arrow=False):
    result=f'<polyline points="'+ ' '.join(f'{x},{y}' for x,y in points)+f'" fill="none" stroke="{color}" stroke-width="{width}" stroke-linejoin="round"/>'
    if arrow:
        (a,b),(x,y)=points[-2:]
        if x>a: d=f'M{x-12} {y-8}L{x} {y}L{x-12} {y+8}'
        elif x<a: d=f'M{x+12} {y-8}L{x} {y}L{x+12} {y+8}'
        elif y>b: d=f'M{x-8} {y-12}L{x} {y}L{x+8} {y-12}'
        else: d=f'M{x-8} {y+12}L{x} {y}L{x+8} {y+12}'
        result+=f'<path d="{d}" fill="none" stroke="{color}" stroke-width="{width}"/>'
    return result

def svg(width,height,title,desc,parts):
    return f'<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}" viewBox="0 0 {width} {height}" role="img"><title>{escape(title)}</title><desc>{escape(desc)}</desc>'+''.join(parts)+'</svg>\n'

def manifest(stem,suffix,width,height,alt,site=False):
    data=dict(id=stem+('-source' if suffix=='.svg' and stem==COVER else ''),file=stem+suffix,articleSlug='/comparisons/ai-agent-vs-automation-client-intake-2027',articleStatus='published',width=width,height=height,format='pinterest' if height==1500 else 'article',alt=alt,archetype='software-workflow',method='programmatic',status='integrated' if site else 'draft',sourceBrief='docs/editorial/client-intake-2027/approved-package/06-visual-brief.md',maxBytes=400000,releaseState='review branch only; owner editorial approval pending; not deployed')
    if site: data['sitePath']='/images/comparisons/'+stem+suffix
    (OUT/(stem+('-source' if suffix=='.svg' and stem==COVER else '')+'.visual.json')).write_text(json.dumps(data,indent=2)+'\n',encoding='utf-8')

logo=(REPO/'public/images/brand/logo-light.svg').read_text(encoding='utf-8')
logo=re.sub(r'^<svg[^>]*>','',logo).removesuffix('\n').removesuffix('</svg>')
p=[rect(0,0,1600,900),f'<g transform="translate(80 54) scale(0.95)">{logo}</g>',text(1520,120,'COMPARISONS',28,TEAL,600,anchor='end'),line([(80,205),(1520,205)],GOLD,3),text(80,365,['Client intake','in 2027'],120,INK,600,SERIF,gap=136)]
for x,label in [(80,'Manual'),(570,'Rules'),(1060,'Agent + review')]:
    p += [rect(x,645,460,165,SAGE),rect(x,645,460,5,TEAL),text(x+230,711 if label=='Agent + review' else 746,['Agent +','review'] if label=='Agent + review' else label,64,INK,600,anchor='middle',gap=72)]
(OUT/(COVER+'.svg')).write_text(svg(1600,900,'Client intake in 2027',ALT_COVER,p),encoding='utf-8')
manifest(COVER,'.svg',1600,900,ALT_COVER)
manifest(COVER,'.webp',1600,900,ALT_COVER,True)

labels=[(['Agent','proposes'],['Read-only tools','+ a draft']),(['Owner','reviews'],['Recipient, message','and action']),(['Validate','approval'],['Same proposal','and policy version']),(['Dispatcher','sends'],['Only the exact','approved message'])]
p=[rect(0,0,1600,900),text(80,100,'Proposed agent approval boundary',54,INK,600,SERIF),line([(80,142),(1520,142)],GOLD,3),rect(435,184,1085,650,SAGE)]
for i,(x,(primary,support)) in enumerate(zip([80,450,820,1190],labels)):
    p += [rect(x,250,330,250,CREAM,LINE),text(x+24,290,str(i+1).zfill(2),27,TEAL,600),text(x+24,345,primary,42,INK,600,gap=49),text(x+24,438,support,26,TEAL,gap=33)]
    if i<3: p += [line([(x+330,365),(x+370,365)],arrow=True)]
p += [text(800,232,'Approve',23,TEAL,600,anchor='middle'),text(1170,232,'Valid',23,TEAL,600,anchor='middle')]
p += [line([(540,500),(540,662),(565,662)],arrow=True),text(700,546,['Pending, declined','or expired'],25,TEAL,anchor='middle',gap=32),rect(565,610,270,104,CREAM,LINE),text(700,674,'Hold — no send',30,INK,600,anchor='middle')]
p += [line([(985,500),(985,610)],arrow=True),text(1150,546,['Recipient, body, action','or policy changed'],25,TEAL,anchor='middle',gap=32),rect(850,610,300,104,CREAM,LINE),text(1000,650,['New review','required'],30,INK,600,anchor='middle',gap=37),line([(985,714),(985,785),(490,785),(490,500)],arrow=True),text(725,766,'Return to owner review',26,TEAL,600,anchor='middle')]
source=svg(1600,900,'Proposed agent approval boundary',ALT_DIAGRAM,p)
(OUT/(DESKTOP+'.svg')).write_text(source,encoding='utf-8')
(PUBLIC/(DESKTOP+'.svg')).write_text(source,encoding='utf-8')
manifest(DESKTOP,'.svg',1600,900,ALT_DIAGRAM,True)

p=[rect(0,0,1000,1500),text(70,82,['Proposed agent','approval boundary'],52,INK,600,SERIF,gap=60),line([(70,165),(930,165)],GOLD,3)]
positions=[210,440,850,1290]
heights=[170,170,170,160]
for i,((primary,support),y,h) in enumerate(zip(labels,positions,heights)):
    p += [rect(70,y,860,h,SAGE if i in [1,2] else CREAM,LINE),text(100,y+52,str(i+1).zfill(2),36,TEAL,600),text(195,y+58,' '.join(primary),52,INK,600),text(195,y+112,' '.join(support),38,TEAL)]
p += [line([(500,380),(500,440)],arrow=True)]
# Review: the left branch terminates; only approval follows the right connector.
p += [line([(80,610),(80,747),(90,747)],arrow=True),text(300,641,['Pending / declined','or expired'],34,TEAL,anchor='middle',gap=36),rect(90,690,420,115,CREAM,LINE),text(300,758,'Hold — no send',46,INK,600,anchor='middle'),line([(740,610),(740,827),(500,827),(500,850)],arrow=True),text(754,686,'Approve',37,TEAL,600)]
# Changed content returns to review, never downstream of validation.
p += [line([(80,1020),(80,1170),(90,1170)],arrow=True),text(300,1050,['Recipient, body, action','or policy changed'],32,TEAL,anchor='middle',gap=34),rect(90,1092,420,160,CREAM,LINE),text(300,1139,['New review','required'],46,INK,600,anchor='middle',gap=50),text(300,1230,'Return to owner review',30,TEAL,600,anchor='middle'),line([(740,1020),(740,1267),(500,1267),(500,1290)],arrow=True),text(754,1090,['Valid','approval'],37,TEAL,600,gap=43)]
source=svg(1000,1500,'Proposed agent approval boundary — mobile',ALT_DIAGRAM,p)
(OUT/(MOBILE+'.svg')).write_text(source,encoding='utf-8')
(PUBLIC/(MOBILE+'.svg')).write_text(source,encoding='utf-8')
manifest(MOBILE,'.svg',1000,1500,ALT_DIAGRAM,True)
print('Produced editable cover, desktop/mobile diagrams and four manifests.')
