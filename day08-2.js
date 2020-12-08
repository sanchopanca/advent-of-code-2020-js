'use strict';

const fs = require('fs');

const instructions = fs.readFileSync('input-day08.txt', 'utf-8').split(/\r?\n/).map(x => x.split(/\s+/));
let candidates = [];

for (const [i, instruction] of instructions.entries()) {
    if (instruction[0] === 'acc') {
        continue;
    }
    const newOpCode = instruction[0] === 'nop' ? 'jmp' : 'nop'
    let candidate = JSON.parse(JSON.stringify(instructions));  // deep copy
    candidate[i][0] = newOpCode;
    candidates.push(candidate);
}

let acc;

CANDIDATE:
for (const candidate of candidates) {
    acc = 0;
    let pointer = 0;
    let executed = new Set();

    while (pointer < candidate.length) {
        executed.add(pointer);
        const [instruction, argument] = candidate[pointer];
        if (instruction === 'jmp') {
            pointer += parseInt(argument, 10);
        } else {
            if (instruction === 'acc') {
                acc += parseInt(argument, 10);
            }
            ++pointer;
        }
        if (executed.has(pointer)) {
            continue CANDIDATE;
        }
    }
    break;
}

console.log(acc);
