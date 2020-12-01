'use strict';

const fs = require('fs');

const numbers = fs.readFileSync('input-day01.txt', 'utf-8').split(/\r?\n/).map(x => parseInt(x, 10));

const lookUpTable = {};

for (const [i, number] of numbers.entries()) {
    lookUpTable[number] = i;
}

for (const [i, number] of numbers.entries()) {
    const candidate = 2020 - number;
    if (lookUpTable[candidate] !== undefined && lookUpTable[candidate] !== i) {
        console.log(`${number} * ${candidate} = ${number * candidate}`);
        break;
    }
}

