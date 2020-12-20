'use strict';

const fs = require('fs');

const tiles = fs.readFileSync('input-day20.txt', 'utf-8').split(/\r?\n\r?\n/).map(x => {
// const tiles = fs.readFileSync('input-day20-test.txt', 'utf-8').split(/\r?\n\r?\n/).map(x => {
    const o = {};
    const [header, data] = x.split(/:\r?\n/);
    const [_, id] = header.split(' ');
    o.id = parseInt(id, 10);
    o.data = data.split(/\r?\n/);
    o.used = false;
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
let lonelyEdges = {};

for (const [edge, ids] of Object.entries(matches)) {
    if (ids.length === 1) {
        if (lonelyIDs[ids[0]] === undefined) {
            lonelyIDs[ids[0]] = 0;
        }
        lonelyEdges[edge] = true;
        ++lonelyIDs[ids[0]];
    }
}


let firstCorner;

for (const tile of tiles) {
    if (isCorner(tile)) {
        firstCorner = tile;
        break;
    }
}

const solution = [];

while (true) {
    if (lonelyEdges[firstCorner.data[0]] && lonelyEdges[rotateClockwise(firstCorner.data)[0]]) {
        firstCorner.used = true;
        solution.push([firstCorner]);
        break;
    }
    firstCorner.data = rotateCounterClockwise(firstCorner.data);
}

const operations = [
    rotateCounterClockwise,
    rotateCounterClockwise,
    rotateCounterClockwise, 
    rotateCounterClockwise,
    flipHorizontally,
    rotateCounterClockwise,
    rotateCounterClockwise, 
    rotateCounterClockwise,
    flipVertically,
    rotateCounterClockwise,
    rotateCounterClockwise, 
    rotateCounterClockwise,
    flipHorizontally,
    rotateCounterClockwise,
    rotateCounterClockwise, 
    rotateCounterClockwise,
];


// First row
while (true) {
    let prveviousTile = solution[0][solution[0].length - 1];
    let tile = findMatch(rightEdge(prveviousTile));
    tile.used = true;
    solution[0].push(tile);
    if (isCorner(tile)) {
        break;
    }
}

const rows = tiles.length / solution[0].length;

for (let row = 1; row < rows; ++row) {
    solution.push([]);
    let firstTile = findMatch(null, bottomEdge(solution[row-1][0]));
    firstTile.used = true;
    solution[row].push(firstTile);
    for (let col = 1; col < solution[0].length; ++col) {
        let tile = findMatch(rightEdge(solution[row][col-1]), bottomEdge(solution[row-1][col]));
        tile.used = true;
        solution[row].push(tile);
    }
}

let picture = [];
for (let row = 0; row < solution.length; ++row) {
    for (let i = 0; i < solution[0][0].data.length - 2; ++i) {
        picture.push('');
    }
    for (let col = 0; col < solution[0].length; ++col) {
        const tile = solution[row][col];
        const trimmed = removeEdge(tile.data);
        for (const [i, line] of trimmed.entries()) {
            picture[row * trimmed.length + i] += line;
        }
    }
}

const monster = [
    '                  # ',
    '#    ##    ##    ###',
    ' #  #  #  #  #  #   ',

    // '###...##...#...#..##',
    // '###..##..##..####.##',
    // '#..#..#...#..####...',
];

let found = false;
let monsters = 0;
for (const op of operations) {
    if (found) break;
    picture = op(picture);
    for (let pRow = 0; pRow < picture.length - monster.length; ++pRow) {
        SHIFT:
        for (let pCol = 0; pCol < picture[0].length - monster[0].length; ++pCol) {
            for (let mRow = 0; mRow < monster.length; ++mRow) {
                for (let mCol = 0; mCol < monster[0].length; ++mCol) {
                    const mPixel = monster[mRow][mCol];
                    const pPixel = picture[pRow + mRow][pCol + mCol];
                    if (mPixel === '#' && pPixel !== '#') {
                        continue SHIFT;
                    }
                }
            }
            // console.log(pRow, pCol);
            // pCol += monster[0].length - 1;
            found = true;
            ++monsters;
        }
    }
}
// console.log(picture);
// console.log(monsters);

console.log(countPounds(picture) - monsters * countPounds(monster));



// console.log(picture);
// console.log(firstCorner.data);

function findMatch(left, top = null) {
    for (const tile of tiles) {
        if (tile.used) continue;
        if (left && top) {
            if (!hasEdge(tile, left) || !hasEdge(tile, top)) continue;
        } else if (left) {
            if (!hasEdge(tile, left)) continue;
        } else if (top) {
            if (!hasEdge(tile, top)) continue;
        }
        for (const op of operations) {
            tile.data = op(tile.data);
            if (left && left !== leftEdge(tile)) continue;
            if (top && top !== topEdge(tile)) continue;
            return tile;
        }
    }
}

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

function rightEdge(tile) {
    let right = '';
    for (const s of tile.data) {
        right += s[s.length-1];
    }
    return right;
}

function leftEdge(tile) {
    let left = '';
    for (const s of tile.data) {
        left += s[0];
    }
    return left;
}

function topEdge(tile) {
    return tile.data[0];
}

function bottomEdge(tile) {
    return tile.data[tile.data.length - 1];
}

function hasEdge(tile, edge) {
    for (const e of edges(tile)) {
        if (e === edge) {
            return true;
        }
    }
    return false;
}

function reverse(str) {
    return [...str].reverse().join("");
}

function removeEdge(data) {
    const result = [];
    for (let i = 1; i < data.length - 1; ++i) {
        result.push(data[i].substring(1, data[i].length - 1));
    }
    return result;
}

function rotateCounterClockwise(data, times = 1) {
    for (let i = 0; i < times; ++i) {
        data = rotateCounterClockwiseOnce(data);
    }
    return data;
}

function rotateClockwise(data, times = 1) {
    return rotateCounterClockwise(data, 4 - times);
}

function rotateCounterClockwiseOnce(data) {
    const result = [];
    for (let x = data[0].length - 1; x >= 0; --x) {
        let s = '';
        for (let y = 0; y < data.length; ++y) {
            s += data[y][x];
        }
        result.push(s);
    }
    return result;
}

function flipHorizontally(data) {
    const result = [];
    for (const line of data) {
        result.push(reverse(line));
    }
    return result;
}

function flipVertically(data) {
    return rotateClockwise(flipHorizontally(rotateCounterClockwise(data)));
}

function isCorner(tile) {
    return lonelyIDs[tile.id] === 4;
}

function countPounds(data) {
    let result = 0;
    for (const line of data) {
        for (const c of line) {
            if (c === '#') {
                ++result;
            }
        }
    }
    return result;
}


// console.log(flipVertically(flipHorizontally([
//     '123',
//     '456',
//     '789',
// ])));
