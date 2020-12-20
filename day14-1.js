'use strict';

const fs = require('fs');

const instructions = fs.readFileSync('input-day14.txt', 'utf-8').split(/\r?\n/);
// const instructions = fs.readFileSync('input-day14-test.txt', 'utf-8').split(/\r?\n/);

const memory = {};

let currentMask = '0';

for (const instruction of instructions) {
    if (instruction.startsWith('mask')) {
        currentMask = instruction.split(' ')[2];
        continue;
    }
    const groups = instruction.match(/^mem\[(\d+)\] = (\d+)$/);
    const address = parseInt(groups[1], 10);
    const value = parseInt(groups[2], 10);
    memory[address] = applyMask(value, currentMask);
}


console.log(Object.values(memory).reduce((a, b) => a + b));

// gotcha: this would have work if Javascript supported bitwise operations
// on integers larger than 32 bits, but alas. So I'll show myself out
// and pick up python for this problem
function applyMask(number, mask) {
    number |= parseInt(mask.replace(/X/g, '0'), 2);
    number &= parseInt(mask.replace(/X/g, '1'), 2);
    return number;
}
