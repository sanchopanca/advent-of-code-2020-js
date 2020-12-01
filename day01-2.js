'use strict';

const fs = require('fs');

const numbers = fs.readFileSync('input-day01.txt', 'utf-8').split(/\r?\n/).map(x => parseInt(x, 10));

const lookUpTable = {};

for (const [i, number] of numbers.entries()) {
    lookUpTable[number] = i;
}

LOOP:
for (const [i, number1] of numbers.entries()) {
    for (let j = i + 1; j < numbers.length; ++j) {
        const number2 = numbers[j];
        const candidate = 2020 - number1 - number2;
        if (lookUpTable[candidate] !== undefined && lookUpTable[candidate] !== i && lookUpTable[candidate] !== j) {
            console.log(`${number1} * ${number2} * ${candidate} = ${number1 * number2 * candidate}`);
            break LOOP;
        }
    }
}

