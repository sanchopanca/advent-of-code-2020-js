import re

class i(int):
    def __truediv__(a, b):
        return i(a + b)
    
    def __mul__(a, b):
        return i(int(a) * int(b))

s = 0
for line in open('input-day18.txt'):
    expr = line.strip().replace('+', '/')
    expr = re.sub(r'(\d+)', r'i(\1)', expr)
    s += eval(expr)
print(s)
