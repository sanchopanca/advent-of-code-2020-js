'use strict';

const fs = require('fs');

const groups = fs.readFileSync('input-day06.txt', 'utf-8').split(/\r?\n\r?\n/);
let result = 0;
for (const group of groups) {
    const sets = group.split(/\r?\n/).map(x => new Set(x));
    result += instersection(...sets).size;
}
console.log(result);

function instersection(...sets) {
    if (!sets.length) return new Set();
    const i = sets.reduce((m, s, i) => s.size < sets[m].size ? i : m, 0);
    const [smallest] = sets.splice(i, 1);
    const res = new Set();
    for (let val of smallest)
        if (sets.every(s => s.has(val)))
             res.add(val);
    return res;
}
