'use strict'

const fs = require('fs');

// i removed mentions of Player 1 and Player 2 from the file
let [deck1, deck2] = fs.readFileSync('input-day22.txt', 'utf-8').split(/\r?\n\r?\n/).map(x => x.split(/\r?\n/).map(x => parseInt(x)));
// let [deck1, deck2] = fs.readFileSync('input-day22-test.txt', 'utf-8').split(/\r?\n\r?\n/).map(x => x.split(/\r?\n/).map(x => parseInt(x)));


let loop1 = {};
let cache = {};

function game(deck1, deck2, n) {

    const key = deck1.join('.') + '#' + deck2.join('.');
    if(cache[key] !== undefined) {
        console.log(key);
        // console.log('was here');
        return cache[key];
    }

    let instantWin = false
    while (deck1.length > 0 && deck2.length > 0) {
        [instantWin, deck1, deck2] = round(deck1, deck2, n);
        if (instantWin) {
            // console.log('was here');
            cache[key] = [1, deck1, deck2];
            return [1, deck1, deck2];
        }
    }
    cache[key] = [(deck2.length > 0) + 1, deck1, deck2];
    return [(deck2.length > 0) + 1, deck1, deck2];
}

function round(deck1, deck2, n) {
    const key = deck1.join('.') + '#' + deck2.join('.');
    if (loop1[key]) {
        return [true, deck1, deck2];
    }

    loop1[key] = true;

    // console.log(n, deck1.length, deck2.length)//, deck1, deck2);
    // if (n === 10 && deck1.length === 18 && deck2.length == 12) {
        // console.log(deck1, deck2);
    // }
    const card1 = deck1.shift();
    const card2 = deck2.shift();
    let whoWon;

    if (card1 > deck1.length || card2 > deck2.length) {
        whoWon = card1 > card2 ? 1 : 2;
    } else {
        const deck1Copy = []
        for (let i = 0; i < card1; ++i) {
            deck1Copy.push(deck1[i]);
        }
        const deck2Copy = [];
        for (let i = 0; i < card2; ++i) {
            deck2Copy.push(deck2[i]);
        }

        [whoWon,] = game(deck1Copy, deck2Copy, n+1);
    }
    
    if (whoWon === 1) {
        deck1.push(card1);
        deck1.push(card2);
    } else {
        deck2.push(card2);
        deck2.push(card1);
    }
    return [false, deck1,deck2];
}

let whatever;

[whatever, deck1, deck2] = game(deck1, deck2, 0);
console.log(deck2);

const winningDeck = deck1.length > 0 ? deck1 : deck2;

console.log(winningDeck);

let s = 0;
let f = 1;

while (winningDeck.length > 0) {
    s += winningDeck.pop() * f++;
}

console.log(s);
