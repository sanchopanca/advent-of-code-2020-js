'use strict';

const fs = require('fs');

let [rules, yourTicket, otherTickets] = fs.readFileSync('input-day16.txt', 'utf-8').split(/\r?\n\r?\n/);

let ranges = [];

for (const rule of rules.split(/\r?\n/)) {
    const m = rule.match(/(\d+-\d+) or (\d+-\d+)/);
    ranges.push(m[1].split('-').map(x => parseInt(x)));
    ranges.push(m[2].split('-').map(x => parseInt(x)));
}

otherTickets = otherTickets.split(/\r?\n/);
otherTickets.shift();

let errorRate = 0;
for (const ticket of otherTickets) {
    VALUE:
    for (const value of ticket.split(/,/).map(x => parseInt(x))) {
        for (const range of ranges) {
            if (value >= range[0] && value <= range[1]) {
                continue VALUE;
            }
        }
        errorRate += value;
    }
}

console.log(errorRate);