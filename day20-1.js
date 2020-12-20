'use strict';

const fs = require('fs');

const tiles = fs.readFileSync('input-day20.txt', 'utf-8').split(/\r?\n\r?\n/).map(x => {
// const tiles = fs.readFileSync('input-day20-test.txt', 'utf-8').split(/\r?\n\r?\n/).map(x => {
    const o = {};
    const [header, data] = x.split(/:\r?\n/);
    const [_, id] = header.split(' ');
    o.id = parseInt(id, 10);
    o.data = data.split(/\r?\n/);
    return o;
});

const matches = {}

for (const tile of tiles) {
    for (const edge of edges(tile)) {
        if (matches[edge] === undefined) {
            matches[edge] = [];
        }
        matches[edge].push(tile.id);
    }
}

let lonelyIDs = {};

for (const ids of Object.values(matches)) {
    if (ids.length === 1) {
        if (lonelyIDs[ids[0]] === undefined) {
            lonelyIDs[ids[0]] = 0;
        }
        ++lonelyIDs[ids[0]];
    }
}

let p = 1;

for (const [id, n] of Object.entries(lonelyIDs)) {
    if (n === 4) {
        p *= id;
    }
}

console.log(p);

function edges(tile) {
    const result = [];
    result.push(tile.data[0], reverse(tile.data[0]));
    result.push(tile.data[tile.data.length-1], reverse(tile.data[tile.data.length-1]));
    let left = '';
    let right = '';
    for (const s of tile.data) {
        left += s[0];
        right += s[s.length-1];
    }
    result.push(left, reverse(left));
    result.push(right, reverse(right));
    return result;
}

function reverse(str) {
    return [...str].reverse().join("");
}