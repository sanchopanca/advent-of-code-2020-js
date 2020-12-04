'use strict';

const fs = require('fs');

const entries = fs.readFileSync('input-day04.txt', 'utf-8').split(/\r?\n\r?\n/);

let valid = 0;

for (const entry of entries) {
    const pairs = entry.split(/\s+/);
    let data = {};
    for (const pair of pairs) {
        const [key, value] = pair.split(':');
        data[key] = value;
    }


    if (Object.keys(data).length === 8) {
        ++valid;
    }

    if (Object.keys(data).length === 7 && !data.hasOwnProperty('cid')) {
        ++valid;
    }
}

console.log(valid);
