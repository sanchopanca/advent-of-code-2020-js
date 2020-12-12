'use strict';

const fs = require('fs');

const numbers = fs.readFileSync('input-day09.txt', 'utf-8').split(/\r?\n/).map(x => parseInt(x));
// const numbers = fs.readFileSync('input-day09-test.txt', 'utf-8').split(/\r?\n/).map(x => parseInt(x));

const lookBehind = 25;

LOOP:
for (let i = lookBehind; i < numbers.length; ++i) {
    for (let j = i - lookBehind; j < i - 1; ++j) {
        for (let k = j + 1; k < i; ++k) {
            if (numbers[i] === numbers[j] + numbers[k]) {
                continue LOOP;
            }
        }
    }
    console.log(numbers[i]);
    break;
}
