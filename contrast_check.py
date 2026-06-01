import re
from pathlib import Path

def hex_to_rgb(h):
    h = h.lstrip('#')
    if len(h) == 3:
        h = ''.join([c*2 for c in h])
    return tuple(int(h[i:i+2], 16) / 255.0 for i in (0, 2, 4))

def linearize(c):
    if c <= 0.03928:
        return c / 12.92
    return ((c + 0.055) / 1.055) ** 2.4

def luminance(rgb):
    r, g, b = rgb
    return 0.2126 * linearize(r) + 0.7152 * linearize(g) + 0.0722 * linearize(b)

def contrast_ratio(c1, c2):
    L1 = luminance(c1)
    L2 = luminance(c2)
    lighter = max(L1, L2)
    darker = min(L1, L2)
    return (lighter + 0.05) / (darker + 0.05)

css_path = Path('week04/styles/filtered-temples.css')
text = css_path.read_text(encoding='utf-8')
# parse :root variables
vars_block = re.search(r':root\s*{([^}]*)}', text, re.S)
vars = {}
if vars_block:
    for m in re.finditer(r'--([a-zA-Z0-9-]+)\s*:\s*([^;]+);', vars_block.group(1)):
        name = m.group(1).strip()
        val = m.group(2).strip()
        vars[name] = val

pairs = [
    ('text', 'background'),
    ('text', 'surface'),
    ('text-muted', 'surface'),
    ('accent', 'primary'),
    ('accent-light', 'primary'),
    ('accent-light', 'primary-dark')
]

results = []
for a,b in pairs:
    va = vars.get(a)
    vb = vars.get(b)
    if not va or not vb:
        results.append((a,b,'missing-var', va, vb))
        continue
    # support var(...) or hex or named; handle var() by resolving
    def resolve(v):
        v=v.strip()
        if v.startswith('var('):
            inner = re.match(r'var\(--([a-zA-Z0-9-]+)\)', v)
            if inner:
                return vars.get(inner.group(1))
        return v
    ra = resolve(va)
    rb = resolve(vb)
    # only handle hex for now
    if not ra.startswith('#') or not rb.startswith('#'):
        results.append((a,b,'unsupported-format', ra, rb))
        continue
    c1 = hex_to_rgb(ra)
    c2 = hex_to_rgb(rb)
    ratio = contrast_ratio(c1, c2)
    results.append((a,b,round(ratio,2),ra,rb))

for r in results:
    if r[2] == 'missing-var':
        print(f'MISSING VAR: {r[0]} or {r[1]} -> {r[3]} / {r[4]}')
    elif r[2] == 'unsupported-format':
        print(f'UNSUPPORTED FORMAT for {r[0]} on {r[1]}: {r[3]} / {r[4]}')
    else:
        status = 'PASS' if r[2] >= 4.5 else 'FAIL'
        print(f'{r[0]} on {r[1]}: ratio={r[2]} {status} ({r[3]} on {r[4]})')
