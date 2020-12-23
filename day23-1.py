class Circle:
    def __init__(self, string):
        self.numbers = list(map(int, string))
        self.current = self.numbers[0]
    
    def __str__(self):
        s = ''
        for i, n in enumerate(self.numbers):
            if i == self.current_position():
                s += f'({n}) '
            else:
                s += f'{n} '
        return s.strip()
    
    def current_position(self):
        return self.numbers.index(self.current)
    
    def remove_cup(self):
        n = self.numbers.pop((self.current_position() + 1) % len(self.numbers))
        return n
    
    def remove_3_cups(self):
        return [self.remove_cup() for _ in range(3)]
    
    def destination_index(self):
        mn = min(self.numbers)
        mx = max(self.numbers)
        look_for = self.current - 1
        while look_for not in self.numbers:
            look_for -= 1
            if look_for < mn:
                look_for = mx
        return self.numbers.index(look_for)
    
    def insert_after_destination(self, insertees):
        insert_index = self.destination_index() + 1
        while insertees:
            self.numbers.insert(insert_index, insertees.pop())
    
    def advance(self):
        index = (self.current_position() + 1) % len(self.numbers)
        self.current = self.numbers[index]
    
    def move(self):
        cups = self.remove_3_cups()
        self.insert_after_destination(cups)
        self.advance()

inp = '974618352'
circle = Circle(inp)
# print(circle.numbers)

for _ in range(100):
    # print(circle)
    circle.move()

# print(circle)
# cups = circle.remove_3_cups()
# print(circle)
# circle.insert_after_destination(cups)
# print(circle)
# circle.advance()
# print(circle)

parts = ''.join(str(v) for v in circle.numbers).split('1')
print(parts[-1], parts[-2], sep='')
        
        
