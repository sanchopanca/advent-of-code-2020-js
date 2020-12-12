'use strict';

const fs = require('fs');

const instructions = fs.readFileSync('input-day12.txt', 'utf-8').split(/\r?\n/).map(x => ({action: x[0], value: parseInt(x.substr(1), 10)}));

let x = 0, y = 0;

let wayPoint = [-1, 10];

for (const instruction of instructions) {
    performInstruction(instruction);
}

console.log(Math.abs(x) + Math.abs(y));

function performInstruction(instruction) {
    if (instruction.action === 'N') {
        wayPoint[0] -= instruction.value;
    } else if (instruction.action === 'S') {
        wayPoint[0] += instruction.value;
    } else if (instruction.action === 'E') {
        wayPoint[1] += instruction.value;
    } else if (instruction.action === 'W') {
        wayPoint[1] -= instruction.value;
    } else if (instruction.action === 'L') {
        rotateLeft(instruction.value / 90);
    } else if (instruction.action === 'R') {
        rotateRight(instruction.value / 90);
    } else if (instruction.action === 'F') {
        x += wayPoint[0] * instruction.value;
        y += wayPoint[1] * instruction.value;
    }
}

function rotateRight(n) {
    rotateLeft(4 - n);
}

function rotateLeft(n) {
    for (let i = 0; i < n; ++ i) {
        rotateLeftOnce();
    }
}

function rotateLeftOnce() {
    wayPoint = [-wayPoint[1], wayPoint[0]];
}
