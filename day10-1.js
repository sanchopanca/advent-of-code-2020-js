'use strict';

const fs = require('fs');

const adapters = fs.readFileSync('input-day10.txt', 'utf-8').split(/\r?\n/).map(x => parseInt(x)).sort((a, b) => a - b);
// let adapters = fs.readFileSync('input-day10-test2.txt', 'utf-8').split(/\r?\n/).map(x => parseInt(x)).sort((a, b) => a - b);
adapters.unshift(0);
console.log(adapters);

let diff1 = 0;
let diff3 = 1;

for (let i = 1; i < adapters.length; ++i) {
    const diff = adapters[i] - adapters[i-1];
    if (diff === 1) ++diff1;
    if (diff === 3) ++diff3;
}

console.log(diff1, diff3, diff1 * diff3);
