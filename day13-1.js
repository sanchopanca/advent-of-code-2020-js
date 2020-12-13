'use strict';

const fs = require('fs');

let [yourTimeOfArrival, busses] = fs.readFileSync('input-day13.txt', 'utf-8').split(/\r?\n/);
// let [yourTimeOfArrival, busses] = fs.readFileSync('input-day13-test.txt', 'utf-8').split(/\r?\n/);

yourTimeOfArrival = parseInt(yourTimeOfArrival, 10);
busses = busses.split(/,/).filter(x => x != 'x').map(x => parseInt(x));

let timeToWait = Infinity;
let bestBus = 0;

for (const bus of busses) {
    let toWait;
    const r = yourTimeOfArrival % bus;
    if (r === 0) {
        toWait = 0;
    } else {
        toWait = bus - r;
    }

    if (toWait < timeToWait) {
        timeToWait = toWait;
        bestBus = bus;
    }
}

console.log(timeToWait * bestBus);
