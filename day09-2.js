'use strict';

const fs = require('fs');

const numbers = fs.readFileSync('input-day09.txt', 'utf-8').split(/\r?\n/).map(x => parseInt(x));
// const numbers = fs.readFileSync('input-day09-test.txt', 'utf-8').split(/\r?\n/).map(x => parseInt(x));

const lookBehind = 25;

let invalidNumber;

LOOP:
for (let i = lookBehind; i < numbers.length; ++i) {
    for (let j = i - lookBehind; j < i - 1; ++j) {
        for (let k = j + 1; k < i; ++k) {
            if (numbers[i] === numbers[j] + numbers[k]) {
                continue LOOP;
            }
        }
    }
    invalidNumber = numbers[i];
    console.log(invalidNumber);
    break;
}
LOOP2:
for (let i = 0; i < numbers.length; ++i) {
    let smallest = numbers[i];
    let largest = numbers[i];
    let s = numbers[i];
    for (let j = i + 1; j < numbers.length; ++j) {
        s += numbers[j];
        smallest = Math.min(smallest, numbers[j]);
        largest = Math.max(largest, numbers[j]);
        if (s === invalidNumber) {
            console.log(smallest, largest);
            console.log(smallest + largest);
            break LOOP2;
        }
        if (s > invalidNumber) {
            continue LOOP2;
        }
    }
}
