'use strict';

const fs = require('fs');

const instructions = fs.readFileSync('input-day08.txt', 'utf-8').split(/\r?\n/).map(x => x.split(/\s+/));

let acc = 0;
let pointer = 0;

let executed = new Set();

while (!executed.has(pointer)) {
    executed.add(pointer);
    const [instruction, argument] = instructions[pointer];
    if (instruction === 'jmp') {
        pointer += parseInt(argument, 10);
        continue;
    }
    if (instruction === 'acc') {
        acc += parseInt(argument, 10);
    }
    ++pointer;
}

console.log(acc);
