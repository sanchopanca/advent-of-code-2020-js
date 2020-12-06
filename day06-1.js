'use strict';

const fs = require('fs');

const result = fs.readFileSync('input-day06.txt', 'utf-8')
        .split(/\r?\n\r?\n/)
        .map(x => new Set(x.replace(/\s/g, '')).size)
        .reduce((a, b) => a + b, 0);
console.log(result);
