import re

def to_binary_string(number, min_length):
    return (min_length + 2 - len(bin(number))) * '0' + bin(number)[2:]

def test_to_binary_string():
    assert(to_binary_string(5, 10) == '0000000101')
    assert(to_binary_string(8, 4) == '1000')
    assert(to_binary_string(8, 3) == '1000')
    assert(to_binary_string(0, 0) == '0')
    assert(to_binary_string(0, 36) == '0' * 36)

def apply_mask(number, mask):
    result = []
    number_b = to_binary_string(number, len(mask))
    # print('?', number_b)
    # print('?', mask)
    for n, m in zip(number_b, mask):
        if m == '0':
            result.append(n)
        elif m == '1':
            result.append('1')
        elif m == 'X':
            result.append('X')
    # print('?', ''.join(result))
    return ''.join(result)

def test_apply_mask():
    assert(apply_mask(0b1, '1') == '1')
    assert(apply_mask(0b0, '1') == '1')
    assert(apply_mask(0b1, '0') == '1')
    assert(apply_mask(0b0, '0') == '0')
    assert(apply_mask(0b1, 'X') == 'X')
    assert(apply_mask(0b0, 'X') == 'X')
    assert(apply_mask(0b10101, 'XX01X') == 'XX11X')

def do_addresses_intersect(addr1, addr2):
    for a1, a2 in zip(addr1, addr2):
        if a1 != a2 and a1 != 'X' and a2 != 'X':
            return False
    return True

def test_do_addresses_intersect():
    assert(do_addresses_intersect('111', '000') == False)
    assert(do_addresses_intersect('111', '111') == True)
    assert(do_addresses_intersect('111', '101') == False)
    assert(do_addresses_intersect('111', '101') == False)
    assert(do_addresses_intersect('111', 'X00') == False)
    assert(do_addresses_intersect('111', 'X11') == True)
    assert(do_addresses_intersect('X1101X', '01X0XX') == True)

def adjust_address(old_address, new_address):
    result = []
    for o, n in zip(old_address, new_address):
        if o != 'X' and n != 'X':
            result.append(o)
        elif n == 'X':
            result.append(o)
        else:  # n != 'X' and o == 'X'
            result.append('1' if n == '0' else '0')
    result = ''.join(result)
    # print(old_address, new_address, result)
    return result, result == old_address

def test_adjust_address():
    assert(adjust_address('1', '1') == ('1', True))
    assert(adjust_address('X', 'X') == ('X', True))
    assert(adjust_address('1', 'X') == ('1', True))
    assert(adjust_address('X', '1') == ('0', False))
    assert(adjust_address('1X1X', 'X1X1') == ('1010', False))




memory = []

def adjust_memory(new_address):
    for old_address in memory:
        if old_address['deleted']:
            # print('was_here!!!')
            continue
        if old_address['address'] == new_address:
            old_address['deleted'] = True
            # print('was_here???')
            continue
        if do_addresses_intersect(old_address['address'], new_address):
            old_address['address'], old_address['deleted'] = adjust_address(old_address['address'], new_address)
    

current_mask = None

for instruction in open('input-day14.txt'):
    if instruction.startswith('mask'):
        current_mask = instruction.split(' ')[2].strip()
        continue
    m = re.match(r'^mem\[(\d+)\] = (\d+)$', instruction)
    address, value = map(int, m.group(1, 2))
    address = apply_mask(address, current_mask)
    adjust_memory(address)
    memory.append({
        'address': address,
        'value': value,
        'deleted': False,
    })
    # print(memory)

print(sum([m['value'] * (2 ** m['address'].count('X')) for m in memory if not m['deleted']]))

test_to_binary_string()
test_apply_mask()
test_do_addresses_intersect()
test_adjust_address()
