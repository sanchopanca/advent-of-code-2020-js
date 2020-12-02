'use strict';

const fs = require('fs');

const lines = fs.readFileSync('input-day02.txt', 'utf-8').split(/\r?\n/);

const re = /(\d+)-(\d+)\s([a-z]):\s([a-z]+)/;

const passwords = lines.map(x => {
    const match = x.match(re);
    return {
        first: parseInt(match[1], 10) - 1,
        second: parseInt(match[2], 10) - 1,
        letter: match[3],
        password: match[4],
    };
});

let validPasswordCount = 0;

for (const entry of passwords) {
    const firstPositionCorrect = entry.password[entry.first] === entry.letter;
    const secondPositionCorrect = entry.password[entry.second] === entry.letter;
    if (firstPositionCorrect !== secondPositionCorrect) {
        ++validPasswordCount;
    }

}

console.log(validPasswordCount);
