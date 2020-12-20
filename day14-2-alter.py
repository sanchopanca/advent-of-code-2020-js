import re

def to_binary_string(number, min_length):
    return (min_length + 2 - len(bin(number))) * '0' + bin(number)[2:]


def apply_mask(number, mask):
    result = []
    number_b = to_binary_string(number, len(mask))
    for n, m in zip(number_b, mask):
        if m == '0':
            result.append(n)
        elif m == '1':
            result.append('1')
        elif m == 'X':
            result.append('X')
    return ''.join(result)

def get_concrete_addresses(float_addr):
    if 'X' in float_addr:
        res = get_concrete_addresses(float_addr.replace('X', '0', 1))
        res += get_concrete_addresses(float_addr.replace('X', '1', 1))
        return res
    return [float_addr]


memory = {}


current_mask = None

for instruction in open('input-day14.txt'):
    if instruction.startswith('mask'):
        current_mask = instruction.split(' ')[2].strip()
        continue
    m = re.match(r'^mem\[(\d+)\] = (\d+)$', instruction)
    address, value = map(int, m.group(1, 2))
    float_address = apply_mask(address, current_mask)
    for address in get_concrete_addresses(float_address):
        memory[address] = value
    
    # print(memory)

print(sum(memory.values()))
