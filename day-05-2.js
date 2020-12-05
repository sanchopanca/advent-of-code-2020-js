'use strict';

const fs = require('fs');

const seats = fs.readFileSync('input-day05.txt', 'utf-8').split(/\r?\n/);

const seatIDsSorted = seats.map(seatID).sort((a, b) => a - b);

for (let i = 1; i < seatIDsSorted.length; ++i) {
    if (seatIDsSorted[i] - seatIDsSorted[i-1] > 1) {
        console.log(seatIDsSorted[i] - 1);
        break;
    }
}

function seatID(seat) {
    let rowMin = 0;
    let rowMax = 127;
    for (let i = 0; i < 7; ++i) {
        if (seat[i] === 'F') {
            rowMax = rowMax - (rowMax - rowMin + 1) / 2;
        } else {
            rowMin = rowMin + (rowMax - rowMin + 1) / 2;
        }
    }

    let seatMin = 0;
    let seatMax = 7;
    for (let i = 7; i < 10; ++i) {
        if (seat[i] === 'L') {
            seatMax = seatMax - (seatMax - seatMin + 1) / 2;
        } else {
            seatMin = seatMin + (seatMax - seatMin + 1) / 2;
        }
    }
    return rowMin * 8 + seatMin;
}