"""Reproduce the six article-specific SVGs using only Python's standard library.

Run from the repository root. Stages validated outside public precede integration.
No network, generated product UI, external fonts or new provider research.
"""
from pathlib import Path
from html import escape
import json
import re

ROOT = Path(__file__).resolve().parents[3]
OUT = Path(__file__).resolve().parent / 'assets'
OUT.mkdir(parents=True, exist_ok=True)
C = dict(paper='#F4F0E8', ink='#2B2A28', teal='#2F5D5A', gold='#B99963', sage='#DFE7DE', brick='#9C5A4D', line='#BDC4B6')

def rect(x, y, w, h, fill, stroke='none', radius=0):
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{radius}" fill="{C.get(fill, fill)}" stroke="{C.get(stroke, stroke)}" stroke-width="2"/>'

def text(x, y, lines, size=40, color='ink', weight=400, serif=False):
    if isinstance(lines, str): lines = [lines]
    family = 'Lora, Georgia, serif' if serif else 'DM Sans, Arial, sans-serif'
    return f'<text x="{x}" y="{y}" fill="{C[color]}" font-family="{family}" font-size="{size}" font-weight="{weight}">' + ''.join(f'<tspan x="{x}" dy="{0 if i == 0 else round(size * 1.23)}">{escape(line)}</tspan>' for i, line in enumerate(lines)) + '</text>'

def arrow(points):
    x = y = 0
    direction = (0, 1)
    for command, values in re.findall(r'([MHV])([0-9 .-]+)', points):
        nums = [float(n) for n in values.split()]
        if command == 'M': x, y = nums
        elif command == 'H':
            direction = (1 if nums[0] > x else -1, 0)
            x = nums[0]
        elif command == 'V':
            direction = (0, 1 if nums[0] > y else -1)
            y = nums[0]
    dx, dy = direction
    head = f'M{x - dx * 12 - dy * 7} {y - dy * 12 + dx * 7} L{x} {y} L{x - dx * 12 + dy * 7} {y - dy * 12 - dx * 7}'
    return f'<path d="{points}" fill="none" stroke="{C["teal"]}" stroke-width="4"/><path d="{head}" fill="none" stroke="{C["teal"]}" stroke-width="4"/>'

def svg(w, h, title, body):
    return f'''<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}" role="img" aria-labelledby="title">
<title id="title">{escape(title)}</title>
<desc>{escape(title)} Original Domsky editorial diagram; details and evidence remain in the article.</desc>
{rect(0, 0, w, h, 'paper')}{body}
</svg>'''

STAGES = [
    ['Define the', 'question'], ['Build the', 'source ledger'],
    ['Approve the', 'argument'], ['Draft with', 'claim references'],
    ['Correct', 'and approve'], ['Adapt for', 'each format'],
    ['Run the', 'release check'],
]

def workflow(mobile):
    b = text(70 if mobile else 80, 80, 'THE EDITORIAL WORKFLOW', 28, 'teal', 700)
    b += text(70 if mobile else 80, 145, 'Seven stages. Two approval gates.', 44 if mobile else 52, serif=True)
    for i, lines in enumerate(STAGES):
        gate = i in (2, 4)
        if mobile:
            x, y, w, h = 70, 205 + i * 165, 860, 140
            if i: b += arrow(f'M500 {y - 25} V{y - 8}')
            b += rect(x, y, w, h, 'teal' if gate else 'sage' if i == 6 else 'paper', 'teal')
            b += text(96, y + 63, f'{i + 1:02}', 44, 'paper' if gate else 'teal', 700)
            b += text(195, y + 56, ' '.join(lines), 49, 'paper' if gate else 'ink', 700)
            b += text(195, y + 108, 'HUMAN APPROVAL' if gate else 'Manual release check' if i == 6 else ['Reader + scope', 'Claims + dated sources', '', 'Source IDs retained', '', 'Channel-specific drafts'][i], 31, 'paper' if gate else 'teal')
        else:
            x, y = [(80, 225), (450, 225), (820, 225), (1190, 225), (1190, 555), (635, 555), (80, 555)][i]
            if i in (1, 2, 3): b += arrow(f'M{x - 40} 330 H{x - 12}')
            if i == 4: b += arrow('M1355 435 V543')
            if i in (5, 6): b += arrow(f'M{1190 if i == 5 else 635} 660 H{x + 342}')
            b += rect(x, y, 330, 210, 'teal' if gate else 'sage' if i == 6 else 'paper', 'teal')
            b += text(x + 24, y + 44, f'{i + 1:02}', 30, 'paper' if gate else 'teal', 700)
            b += text(x + 24, y + 100, lines, 36 if i == 3 else 40, 'paper' if gate else 'ink', 700)
            if gate or i == 6: b += text(x + 24, y + 184, 'HUMAN APPROVAL' if gate else 'MANUAL CHECK', 25, 'paper' if gate else 'teal', 700)
    b += rect(70 if mobile else 80, 1400 if mobile else 824, 860 if mobile else 1440, 3, 'gold')
    b += text(70 if mobile else 80, 1450 if mobile else 870, 'Approve the argument before drafting; approve the article before adapting.', 24 if mobile else 30, 'teal') if not mobile else text(70, 1448, ['Approve before drafting. Approve before adapting.'], 31, 'teal')
    return b

def correction(mobile):
    x = 70 if mobile else 80
    b = text(x, 80, 'A CLAIM BECOMES PUBLISHABLE', 28, 'teal', 700)
    b += text(x, 145, 'The Kit correction', 56, serif=True)
    b += text(x, 198, 'Documented example · 25 September 2026', 30, 'teal')
    if mobile:
        bands = [
            (245, 205, '01  SOURCE', ['Kit Help: Visual Automations', 'on the Newsletter Plan'], 'sage'),
            (480, 225, '02  REJECTED DRAFT CLAIM', ['“Kit Free does not include', 'sequences or visual automation.”'], 'paper'),
            (735, 250, '03  VERIFY AND CORRECT', ['Specific help article includes', 'one Email Sequence and one', 'basic Visual Automation.'], 'sage'),
            (1015, 350, '04  APPROVED WORDING', ['Kit Free includes one sequence', 'and one basic action-only', 'automation; paid plans add', 'unlimited sequences and', 'advanced automation.'], 'teal'),
        ]
        for y, h, label, lines, fill in bands:
            b += rect(70, y, 860, h, fill, 'brick' if 'REJECTED' in label else 'teal')
            b += text(100, y + 50, label, 29, 'paper' if fill == 'teal' else 'brick' if 'REJECTED' in label else 'teal', 700)
            b += text(100, y + 112, lines, 46, 'paper' if fill == 'teal' else 'ink')
            if y != 1015: b += arrow(f'M500 {y + h + 3} V{y + h + 22}')
        b += text(70, 1430, ['Historical example, not new verification.', 'Recheck provider limits before release.'], 31, 'teal')
    else:
        bands = [
            (245, 110, '01  SOURCE', ['Kit Help: Visual Automations on the Newsletter Plan'], 'sage'),
            (380, 110, '02  REJECTED CLAIM', ['“Kit Free does not include sequences or visual automation.”'], 'paper'),
            (515, 125, '03  CORRECTION', ['Specific help article includes one Email Sequence', 'and one basic Visual Automation.'], 'sage'),
            (665, 155, '04  APPROVED WORDING', ['Kit Free includes one sequence and one basic action-only', 'automation; paid plans add unlimited sequences and', 'advanced automation.'], 'teal'),
        ]
        for y, h, label, lines, fill in bands:
            b += rect(80, y, 1440, h, fill, 'brick' if 'REJECTED' in label else 'line')
            b += text(104, y + 52, label, 25, 'paper' if fill == 'teal' else 'brick' if 'REJECTED' in label else 'teal', 700)
            b += text(455, y + 48, lines, 32, 'paper' if fill == 'teal' else 'ink')
            if y != 665: b += arrow(f'M260 {y + h + 2} V{y + h + 20}')
        b += text(80, 870, 'Historical example, not new verification. Recheck provider limits before release.', 29, 'teal')
    return b

def adaptation(mobile):
    x = 70 if mobile else 80
    b = text(x, 80, 'ONE FACTUAL CORE · THREE FORMATS', 28, 'teal', 700)
    b += text(x, 145, 'Adapt the delivery. Keep the evidence.', 43 if mobile else 52, serif=True)
    if mobile:
        b += rect(70, 205, 860, 155, 'sage')
        b += text(100, 259, 'SOURCE-SUPPORTED FACTUAL CORE', 31, 'teal', 700)
        b += text(100, 319, 'Approved facts + core conclusion', 46, 'ink')
        b += arrow('M500 365 V405')
        b += rect(70, 420, 860, 230, 'teal')
        b += text(100, 477, '01  APPROVED ARTICLE', 34, 'paper', 700)
        b += text(100, 540, ['Full explanation + evidence', 'Context, boundaries, next decision'], 46, 'paper')
        b += arrow('M500 654 V705')
        b += text(70, 758, 'ADAPT ONLY AFTER ARTICLE APPROVAL', 31, 'teal', 700)
        for y, title, lines in [(800, '02  EMAIL DRAFT', ['One useful insight + one action', 'New opening; shorter explanation']), (1060, '03  LINKEDIN DRAFT', ['Self-contained observation', 'New structure; mobile line breaks'])]:
            b += rect(70, y, 860, 225, 'paper', 'line')
            b += text(100, y + 55, title, 34, 'teal', 700)
            b += text(100, y + 122, lines, 46)
        b += text(70, 1360, ['Change opening, structure, depth and action.', 'Review before distribution. These example', 'drafts were not sent, posted or measured.'], 33, 'teal')
    else:
        b += rect(80, 210, 1440, 110, 'sage')
        b += text(110, 256, 'SOURCE-SUPPORTED FACTUAL CORE', 26, 'teal', 700)
        b += text(110, 298, 'Keep approved facts and the core conclusion consistent.', 31)
        b += arrow('M800 322 V360')
        b += rect(420, 375, 760, 135, 'teal')
        b += text(452, 424, '01  APPROVED ARTICLE', 30, 'paper', 700)
        b += text(452, 475, 'Full explanation, evidence and next decision', 32, 'paper')
        b += arrow('M800 515 V550 H420 V587') + arrow('M800 550 H1180 V587')
        for xx, title, lines in [(80, '02  EMAIL DRAFT', ['One useful insight + one action', 'New opening; shorter explanation']), (840, '03  LINKEDIN DRAFT', ['Self-contained observation', 'New structure; mobile line breaks'])]:
            b += rect(xx, 600, 680, 165, 'paper', 'line')
            b += text(xx + 28, 648, title, 30, 'teal', 700)
            b += text(xx + 28, 700, lines, 31)
        b += text(80, 820, 'Change opening, structure, depth and action. Review before distribution.', 31, 'teal')
        b += text(80, 870, 'The example email and LinkedIn drafts were not sent, posted or measured.', 29, 'teal')
    return b

VISUALS = [
    ('seven-stage-workflow', workflow, 'Seven stages from defining the question to the release check, with human approval at the argument and corrected-article stages.'),
    ('claim-correction', correction, 'The September 2026 Kit example connects a rejected claim to the specific help article, correction and approved wording.'),
    ('three-formats', adaptation, 'An approved article supplies consistent facts and a core conclusion to distinct email and LinkedIn drafts; distribution still requires approval.'),
]
for name, draw, alt in VISUALS:
    for mobile in (False, True):
        id = f'lean-content-{name}{"-mobile" if mobile else ""}'
        w, h = (1000, 1500) if mobile else (1600, 900)
        filename = id + '.svg'
        (OUT / filename).write_text(svg(w, h, alt, draw(mobile)), encoding='utf-8')
        manifest = dict(id=id, file=filename, articleSlug='/blog/ai-daily-workflow-solo-business', articleStatus='published', width=w, height=h, format='pinterest' if mobile else 'article', alt=alt, archetype='software-workflow', method='programmatic', status='draft', sourceBrief='docs/visuals/lean-content-workflow/brief.md', maxBytes=400000, sitePath='/images/workflows/' + filename)
        (OUT / (id + '.visual.json')).write_text(json.dumps(manifest, indent=2) + '\n', encoding='utf-8')
        print(filename)
