'use strict';

const fs = require('fs');

const rules = fs.readFileSync('input-day07.txt', 'utf-8').split(/\r?\n/);

let possibleParentBags = {};

for (const rule of rules) {

    if (/contain no other bags/.test(rule)) {
        continue;
    }
    const parentBag = rule.match(/^(\w+ \w+)/)[1];
    const ruleParts = rule.split(',');
    for (const rulePart of ruleParts) {
        const childBag = rulePart.match(/\d+ (\w+ \w+) bag/)[1];
        if (possibleParentBags[childBag] === undefined) {
            possibleParentBags[childBag] = [parentBag];
        } else {
            possibleParentBags[childBag].push(parentBag);
        }
    }
}

let queue = new Set(possibleParentBags['shiny gold']);
let result = 0;
queue.forEach(color => {
    ++result;
    if (possibleParentBags[color] !== undefined) {
        for (const parentColor of possibleParentBags[color]) {
            queue.add(parentColor);
        }
    }
})

console.log(result);
