foods = []

for line in open('input-day21.txt'):
    ingridients_raw, allregens_raw = line.strip().split(' (')
    allregens_raw = allregens_raw[9:-1]
    foods.append([ingridients_raw.split(' '), allregens_raw.split(', ')])


ingridient_to_allergens = {}
allergen_to_ingridients = {}

for food in foods:
    for ingridient in food[0]:
        if ingridient in ingridient_to_allergens:
            ingridient_to_allergens[ingridient] |= set(food[1])
        else:
            ingridient_to_allergens[ingridient] = set(food[1])
    for allergen in food[1]:
        if allergen in allergen_to_ingridients:
            allergen_to_ingridients[allergen] &= set(food[0])
        else:
            allergen_to_ingridients[allergen] = set(food[0])


dangerous_ingridients = set()
# print(allergen_to_ingridients.values())
for ingridients in allergen_to_ingridients.values():
    # print(ingridients)
    dangerous_ingridients.update(ingridients)


c = 0

for food in foods:
    for ingridient in food[0]:
        if ingridient not in dangerous_ingridients:
            c += 1

print(c)
# print(dangerous_ingridients)
# print(ingridient_to_allergens)
# print(allergen_to_ingridients)

    