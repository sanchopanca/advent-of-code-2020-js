from math import prod

busses = open('input-day13.txt').read().split('\n')[1].split(',')

# x = A (mod N)
# https://brilliant.org/wiki/chinese-remainder-theorem/
a = []
n = []

for i, bus in enumerate(busses):
    if bus == 'x':
        continue
    a.append((int(bus) - i) % int(bus))
    n.append(int(bus))

# x = A (mod N)
# https://brilliant.org/wiki/chinese-remainder-theorem/
def solve(a, n):
    N = prod(n)
    y = [N // n_i for n_i in n]
    z = [pow(y[i], -1, mod=n[i]) for i in range(len(n))]
    x = sum([a[i] * y[i] * z[i] for i in range(len(n))])

    return x % N

result = solve(a, n)

print(result)
