'use strict';

// couldn't finish, resorted to debug using python
const fs = require('fs');

let adapters = fs.readFileSync('input-day10txt', 'utf-8').split(/\r?\n/).map(x => parseInt(x)).sort((a, b) => a - b);
adapters.unshift(0);
adapters.push(adapters[adapters.length-1] + 3);

let cache = {};

function calculate(a, debug, parent) {
    if (cache[a]) {
        return cache[a];
    }
    console.log(a, debug, parent);
    let result = 0;
    if (a.length <= 2) {
        result = 1;
    } else if (a.length === 3) {
        result = a[2] - a[0] <= 3 ? 2 : 1;
    } else {
        let trying = [];
        if (a[a.length-1] - a[a.length-4] <= 3) {
            result += calculate(a.slice(0, a.length-3), 1, a) + calculate([...a.slice(0, a.length-3), a[a.length-2]], 3, a);
            trying.push(a.slice(0, a.length-3), [...a.slice(0, a.length-3), a[a.length-2]]);
        }
        if (a[a.length-1] - a[a.length-3] <= 3) {
            result += calculate(a.slice(0, a.length-2), 2, a);
            trying.push(a.slice(0, a.length-2));
        }
        result += calculate(a.slice(0, a.length-1), 4, a);
        trying.push(a.slice(0, a.length-1));
    }
    cache[a] = result;
    return result;
}

console.log(calculate(adapters));
console.log(cache);
