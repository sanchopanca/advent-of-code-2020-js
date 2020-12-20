'use strict'

const fs = require('fs');

const [rulesUnparsed, messages] = fs.readFileSync('input-day19.txt', 'utf-8').split(/\r?\n\r?\n/);
// const [rulesUnparsed, messages] = fs.readFileSync('input-day19-test.txt', 'utf-8').split(/\r?\n\r?\n/);

const rules = {};

for (const rule of rulesUnparsed.split(/\r?\n/)) {
    const groups = rule.match(/(\d+): (.+)/);
    const resolved = groups[2][0] === '"';
    rules[groups[1]] = {
        resolved: resolved,
        value: groups[2].replace(/"/g, ''),
    }
}

resolve(0);

function resolve(n) {
    // console.log(n);
    const rule = rules[n];
    if (rule.resolved) {
        return rule.value;
    }
    let resolvedValue = '';
    let or = false;
    for (const part of rule.value.split(' ')) {
        if (part === '|') {
            or = true;
            resolvedValue += '|';
            continue
        }
        resolvedValue += resolve(part);
    }
    if (or) {
        resolvedValue = '(' + resolvedValue + ')';
    }
    rule.value = resolvedValue;
    rule.resolved = true;
    return resolvedValue;
}

const re = new RegExp(rules[0].value);
let matched = 0;
for (const message of messages.split(/\r?\n/)) {
    const m = message.match(re);
    if(m) {
        if (m[0] === message) {
            ++matched;
        }
    }
}
console.log(rules[0].value);

console.log(matched);
