import re
s=open('week04/scripts/filtered-temples.js',encoding='utf-8').read()
m=re.search(r'const\s+temples\s*=\s*\[',s)
if not m:
    print('not found')
    raise SystemExit(1)
start=m.end()
# find matching closing bracket index
depth=1
i=start
while i<len(s) and depth>0:
    if s[i]=='[': depth+=1
    elif s[i]==']': depth-=1
    i+=1
arr=s[start:i-1]
# simple count of occurrences of '{' at top-level by splitting by '},' occurrences
entries = [e for e in re.split(r'},\s*\n\s*{', arr) if e.strip()]
print(len(entries))
