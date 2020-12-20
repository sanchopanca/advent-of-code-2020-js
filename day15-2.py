starting_numbers = [9,12,1,4,17,0,18]

memory = {}
last_number = float('-inf')
for i in range(1, 30000001):
# for i in range(1, 2021):
    if len(starting_numbers) > 0:
        number = starting_numbers.pop(0)
        memory[last_number] = i - 1
        last_number = number
        continue
    new_number = 0 if last_number not in memory else i - memory[last_number] - 1
    memory[last_number] = i - 1
    last_number = new_number
    # print(i)

print(last_number)
