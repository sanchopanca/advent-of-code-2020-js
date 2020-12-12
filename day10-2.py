from functools import lru_cache

adapters = sorted([int(l.strip()) for l in open('input-day10.txt')])
adapters.insert(0, 0)
adapters.append(adapters[-1] + 3)
print(adapters)

@lru_cache(maxsize=None)
def calculate(a):
    if len(a) <= 2:
        return 1
    if len(a) == 3:
        return 2 if a[2] - a[0] <= 3 else 1
    result = 0
    trying = []
    how = [0]
    if a[-1] - a[-4] <= 3:
        result += calculate(a[0:-3])
        trying.append(a[0:-3])
        trying.append(a[0:-3] + (a[-2],))
        how.append(1)
    if a[-1] - a[-3] <= 3:
        result += calculate(a[0:-2])
        trying.append(a[0:-2])
        how.append(2)
    result += calculate(a[0:-1])
    trying.append(a[0:-1])
    print(trying, how, a)
    return result

print(calculate(tuple(adapters)))
