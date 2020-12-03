'use strict';

const fs = require('fs');

const forest = fs.readFileSync('input-day03.txt', 'utf-8').split(/\r?\n/);

const period = forest[0].length

let trees = 0;

let x = 0;
for (let y = 0; y < forest.length; ++y) {
    if (forest[y][x] === '#') {
        ++trees;
    }
    x = (x + 3) % period;
}

console.log(trees);
