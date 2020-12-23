'use strict'

const fs = require('fs');

// i removed mentions of Player 1 and Player 2 from the file
const [deck1, deck2] = fs.readFileSync('input-day22.txt', 'utf-8').split(/\r?\n\r?\n/).map(x => x.split(/\r?\n/).map(x => parseInt(x)));
// const [deck1, deck2] = fs.readFileSync('input-day22-test.txt', 'utf-8').split(/\r?\n\r?\n/).map(x => x.split(/\r?\n/).map(x => parseInt(x)));



while (deck1.length > 0 && deck2.length > 0) {
    const card1 = deck1.shift();
    const card2 = deck2.shift();

    if (card1 > card2) {
        deck1.push(card1);
        deck1.push(card2);
    } else {
        deck2.push(card2);
        deck2.push(card1);
    }
}

const winningDeck = deck1.length > 0 ? deck1 : deck2;

console.log(winningDeck);

let s = 0;
let f = 1;

while (winningDeck.length > 0) {
    s += winningDeck.pop() * f++;
}

console.log(s);
