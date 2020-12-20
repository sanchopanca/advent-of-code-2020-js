'use strict';

const fs = require('fs');

const slice = fs.readFileSync('input-day17.txt', 'utf-8').split(/\r?\n/).map(x => x.split(''));

// console.log(slice);

const steps = 6;

let cube = [];
for (let w = -steps; w <= steps; ++w) {
    const wArray = [];
    if (w == 0) {
        for (let z = -steps; z <= steps; ++z) {
            const zArray = [];
            if (z != 0) {
                for (let y = -slice.length/2 - steps; y < slice.length/2 + steps; ++y) {
                    zArray.push(Array(slice[0].length + steps * 2).fill('.'));
                }
                wArray.push(zArray);
                continue;
            }
            for (let y = 0; y < slice.length + steps * 2; ++y) {
                let yArray = [];
                for (let x = 0; x < slice[0].length + steps * 2; ++x) {
                    if (y >= steps && y < steps + slice.length && x >= steps && x < steps + slice[0].length) {
                        yArray.push(slice[y-steps][x-steps]);
                    } else {
                        yArray.push('.')
                    }
                }
                zArray.push(yArray);
            }

            wArray.push(zArray);
        }
    } else {
        for (let z = -steps; z <= steps; ++z) {
            const zArray = [];
            for (let y = 0; y < slice.length + steps * 2; ++y) {
                let yArray = [];
                for (let x = 0; x < slice[0].length + steps * 2; ++x) {
                    yArray.push('.')
                }
                zArray.push(yArray);
            }
            wArray.push(zArray);
        }
    }
    cube.push(wArray);
}

let newCube;

for (let step = 1; step <= steps; ++step) {
    newCube = JSON.parse(JSON.stringify(cube));
    for (let w = 0; w < cube.length; ++w) {
        for (let z = 0; z < cube[w].length; ++z) {
            for (let y = 0; y < cube[w][z].length; ++y) {
                for (let x = 0; x < cube[w][z][y].length; ++x) {
                    const neighbors = countNeighbors(cube, w, z, y, x);
                    // if (neighbors > 0) console.log(neighbors);
                    if (cube[w][z][y][x] === '#') {
                        if (neighbors != 2 && neighbors != 3) {
                            newCube[w][z][y][x] = '.';
                        }
                    } else if (neighbors === 3) {
                        newCube[w][z][y][x] = '#';
                    }
                }
            }
        }
    }
    // console.log(countActive(cube));
    cube = newCube;
}

console.log(countActive(cube));


function countNeighbors(ar, w, z, y, x) {
    let res = 0;
    for (let m = Math.max(w - 1, 0); m <= Math.min(w + 1, ar.length - 1); ++m) {
        for (let i = Math.max(z - 1, 0); i <= Math.min(z + 1, ar[0].length - 1); ++i) {
            for (let j = Math.max(y - 1, 0); j <= Math.min(y + 1, ar[0][0].length - 1); ++j) {
                for (let k = Math.max(x - 1, 0); k <= Math.min(x + 1, ar[0][0][0].length - 1); ++k) {
                    // console.log(i, j, k);
                    if (m == w && i == z && j == y && k == x) {
                        continue;
                    }
                    if (ar[m][i][j][k] === '#') {
                        ++res;
                    }
                }
            }
        }
    }
    return res;
}

function countActive(ar) {
    let res = 0;
    for (let i = 0; i < ar.length; ++i) {
        for (let j = 0; j < ar[i].length; ++j) {
            for (let k = 0; k < ar[i][j].length; ++k) {
                for (let l = 0; l < ar[i][j][k].length; ++l) {
                    if (ar[i][j][k][l] === '#') {
                        ++res;
                    }
                }
            }
        }
    }
    return res;
}