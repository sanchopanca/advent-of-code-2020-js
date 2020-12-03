'use strict';

const fs = require('fs');

const forest = fs.readFileSync('input-day03.txt', 'utf-8').split(/\r?\n/);

const period = forest[0].length;

let product = 1;

const patterns = [[1, 1], [3, 1], [5, 1], [7, 1], [1, 2]];

for (const [right, down] of patterns) {
    let trees = 0;
    let x = 0;
    for (let y = 0; y < forest.length; y += down) {
        if (forest[y][x] === '#') {
            ++trees;
        }
        x = (x + right) % period;
    }
    product *= trees;
}

console.log(product);
