'use strict';

const fs = require('fs');

const lines = fs.readFileSync('input-day02.txt', 'utf-8').split(/\r?\n/);

const re = /(\d+)-(\d+)\s([a-z]):\s([a-z]+)/;

const passwords = lines.map(x => {
    const match = x.match(re);
    return {
        min: parseInt(match[1], 10),
        max: parseInt(match[2], 10),
        letter: match[3],
        password: match[4],
    };
});

let validPasswordCount = 0;

for (const entry of passwords) {
    const occurencies = (entry.password.match(new RegExp(entry.letter, 'g')) || []).length;
    if (occurencies >= entry.min && occurencies <= entry.max) {
        ++validPasswordCount;
    }
}

console.log(validPasswordCount);
