import re

class i(int):
    def __truediv__(a, b):
        return i(int(a) + int(b))
    
    def __sub__(a, b):
        return i(int(a) * int(b))

s = 0
for line in open('input-day18.txt'):
    expr = line.strip().replace('+', '/').replace('*', '-')
    expr = re.sub(r'(\d+)', r'i(\1)', expr)
    s += eval(expr)
print(s)
