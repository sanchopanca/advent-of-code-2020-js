'use strict';


// lost the first solution because started to directly modify this file
const fs = require('fs')

let room = fs.readFileSync('input-day11.txt', 'utf-8').split(/\r?\n/).map(x => x.split(''));


let changed = true;
let occupied = 0;

while (changed) {
    [changed, occupied] = round();
}

console.log(occupied);


function round() {

    let newRoom = JSON.parse(JSON.stringify(room));
    let occupied = 0;
    let changed = false;
    for (let row = 0; row < room.length; ++row) {
        for (let seat = 0; seat < room[row].length; ++seat) {
            let neighbors = findNeighborSeats(room, row, seat);
            const occupiedNeighbors = neighbors.reduce((n, x) => n + (x === '#'), 0);
            if (room[row][seat] === 'L' && occupiedNeighbors === 0) {
                newRoom[row][seat] = '#';
                changed = true;
            } else if (room[row][seat] === '#' && occupiedNeighbors >= 5) {
                newRoom[row][seat] = 'L';
                changed = true;
            }

            if (newRoom[row][seat] === '#') {
                ++occupied;
            }
        }
    }
    room = newRoom;
    return [changed, occupied];
}

function findNeighborSeats(room, row, seat) {
    let result = [];
    // up
    for (let i = row - 1; i >= 0; --i) {
        if (room[i][seat] === 'L' || room[i][seat] === '#') {
            result.push(room[i][seat]);
            break;
        }
    }
    //down
    for (let i = row + 1; i < room.length; ++i) {
        if (room[i][seat] === 'L' || room[i][seat] === '#') {
            result.push(room[i][seat]);
            break;
        }
    }
    // left
    for (let i = seat - 1; i >= 0; --i) {
        if (room[row][i] === 'L' || room[row][i] === '#') {
            result.push(room[row][i]);
            break;
        }
    }
    // right
    for (let i = seat + 1; i < room[row].length; ++i) {
        if (room[row][i] === 'L' || room[row][i] === '#') {
            result.push(room[row][i]);
            break;
        }
    }
    // up-left
    for (let i = row - 1, j = seat - 1; i >= 0 && j >= 0; --i, --j) {
        if (room[i][j] === 'L' || room[i][j] === '#') {
            result.push(room[i][j]);
            break;
        }
    }
    // up-right
    for (let i = row - 1, j = seat + 1; i >= 0 && j < room[row].length; --i, ++j) {
        if (room[i][j] === 'L' || room[i][j] === '#') {
            result.push(room[i][j]);
            break;
        }
    }
    // down-right
    for (let i = row + 1, j = seat + 1; i < room.length && j < room[row].length; ++i, ++j) {
        if (room[i][j] === 'L' || room[i][j] === '#') {
            result.push(room[i][j]);
            break;
        }
    }
    // down-left
    for (let i = row + 1, j = seat - 1; i < room.length && j >= 0; ++i, --j) {
        if (room[i][j] === 'L' || room[i][j] === '#') {
            result.push(room[i][j]);
            break;
        }
    }
    return result;
}
