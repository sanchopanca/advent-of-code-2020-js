'use strict';

const fs = require('fs');

const rules = fs.readFileSync('input-day07.txt', 'utf-8').split(/\r?\n/);

let graph = {};

for (const rule of rules) {
    const parentBag = rule.match(/^(\w+ \w+)/)[1];
    graph[parentBag] = [];
    if (/contain no other bags/.test(rule)) {
        continue;
    }
    const ruleParts = rule.split(',');
    for (const rulePart of ruleParts) {
        const parsed = rulePart.match(/(\d+) (\w+ \w+) bag/);
        const node = {
            color: parsed[2],
            amount: parseInt(parsed[1], 10),
        };
        graph[parentBag].push(node);
    }
}

console.log(calculate({color: 'shiny gold', amount: 1}) - 1);

function calculate(node) {
    if (graph[node.color].length === 0) {
        return node.amount;
    }
    let result = 0;
    for (const child of graph[node.color]) {
        result += calculate(child);
    }
    return result * node.amount + node.amount;
}
