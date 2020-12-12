'use strict';

const fs = require('fs');

const instructions = fs.readFileSync('input-day12.txt', 'utf-8').split(/\r?\n/).map(x => ({action: x[0], value: parseInt(x.substr(1), 10)}));

let x = 0, y = 0;

let direction = 'E';

for (const instruction of instructions) {
    performInstruction(instruction);
}

console.log(Math.abs(x) + Math.abs(y));

function performInstruction(instruction) {
    if (instruction.action === 'N') {
        y -= instruction.value;
    } else if (instruction.action === 'S') {
        y += instruction.value;
    } else if (instruction.action === 'E') {
        x += instruction.value;
    } else if (instruction.action === 'W') {
        x -= instruction.value;
    } else if (instruction.action === 'L') {
        rotateLeft(instruction.value / 90);
    } else if (instruction.action === 'R') {
        rotateRight(instruction.value / 90);
    } else if (instruction.action === 'F') {
        performInstruction({action: direction, value: instruction.value});
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
    if (direction === 'E') {
        direction = 'N';
    } else if (direction === 'N') {
        direction = 'W';
    } else if (direction === 'W') {
        direction = 'S';
    } else {
        direction = 'E';
    }
}
