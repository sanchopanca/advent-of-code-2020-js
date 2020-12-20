import re

def apply_mask(number, mask):
    number |= int(mask.replace('X', '0'), 2)
    number &= int(mask.replace('X', '1'), 2)
    return number

memory = {}
current_mask = None

for instruction in open('input-day14.txt'):
    if instruction.startswith('mask'):
        current_mask = instruction.split(' ')[2]
        continue
    m = re.match(r'^mem\[(\d+)\] = (\d+)$', instruction)
    address, value = map(int, m.group(1, 2))
    memory[address] = apply_mask(value, current_mask)

print(sum(memory.values()))
