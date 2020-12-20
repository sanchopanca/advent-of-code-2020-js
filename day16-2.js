'use strict';

const fs = require('fs');

let [rulesUnparsed, yourTicket, otherTickets] = fs.readFileSync('input-day16.txt', 'utf-8').split(/\r?\n\r?\n/);

let allRanges = [];
let rules = {};

for (const rule of rulesUnparsed.split(/\r?\n/)) {
    const m = rule.match(/(\w+\s?\w+): (\d+-\d+) or (\d+-\d+)/);
    const range1 = m[2].split('-').map(x => parseInt(x));
    const range2 = m[3].split('-').map(x => parseInt(x));
    allRanges.push(range1, range2);
    rules[m[1]] = [range1, range2];
}

yourTicket = yourTicket.split(/\r?\n/)[1].split(/,/).map(x => parseInt(x));

otherTickets = otherTickets.split(/\r?\n/);
otherTickets.shift();

let correctTickets = [];

TICKET:
for (const ticket of otherTickets) {
    VALUE:
    for (const value of ticket.split(/,/).map(x => parseInt(x))) {
        for (const range of allRanges) {
            if (value >= range[0] && value <= range[1]) {
                continue VALUE;
            }
        }
        continue TICKET;
    }
    correctTickets.push(ticket.split(/,/).map(x => parseInt(x)));
}

let potentials = {};
for (const key of Object.keys(rules)) {
    potentials[key] = [...Array(Object.keys(rules).length).keys()];
}


for (const ticket of correctTickets) {
    for (const [i, value] of ticket.entries()) {
        for (const [rule, ranges] of Object.entries(rules)) {
            const inRange = value >= ranges[0][0] && value <= ranges[0][1]
                    || value >= ranges[1][0] && value <= ranges[1][1];
            if (!inRange) {
                remove(potentials[rule], i);
            }
        }
    }
}

let solution = {};

LOOP:
while (true) {
    for (const [rule, potential] of Object.entries(potentials)) {
        if (potential.length == 1) {
            cleanPotentials(rule);
            continue LOOP;
        }
    }
    break;
}

function remove(array, what) {
    const index = array.indexOf(what);
    if (index > -1) {
        array.splice(index, 1);
    }
}

function cleanPotentials(rule) {
    solution[rule] = potentials[rule][0];
    delete potentials[rule];
    for (const potential of Object.values(potentials)) {
        remove(potential, solution[rule]);
    }
}

let result = 1;
for (const [rule, index] of Object.entries(solution)) {
    if (rule.startsWith('departure')) {
        result *= yourTicket[index];
    }
}

console.log(result);