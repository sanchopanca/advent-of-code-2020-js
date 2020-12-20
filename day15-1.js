'use strict';

const startingNumbers = [9,12,1,4,17,0,18];

let memory = {};
let lastNumber = -Infinity;
for (let i = 1; i <= 30000001; ++i) {
    // console.log(lastNumber);
    if (startingNumbers.length > 0) {
        const number = startingNumbers.shift();
        memory[lastNumber] = i - 1;
        lastNumber = number;
        continue;
    }
    const newNumber = memory[lastNumber] === undefined ? 0 : i - memory[lastNumber] - 1;
    // console.log(i, newNumber);
    memory[lastNumber] = i - 1;
    lastNumber = newNumber;
}
// console.log(memory);
console.log(lastNumber);
