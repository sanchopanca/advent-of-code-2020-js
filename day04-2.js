'use strict';

const fs = require('fs');

const entries = fs.readFileSync('input-day04.txt', 'utf-8').split(/\r?\n\r?\n/);

let valid = 0;

for (const entry of entries) {
    const pairs = entry.split(/\s+/);
    let data = {};
    for (const pair of pairs) {
        const [key, value] = pair.split(':');
        data[key] = value;
    }

    if (!validYear(data.byr, 1920, 2002)) {
        continue;
    }

    if (!validYear(data.iyr, 2010, 2020)) {
        continue;
    }

    if (!validYear(data.eyr, 2020, 2030)) {
        continue;
    }

    if (!validHgt(data.hgt)) {
        continue;
    }

    if (!validHcl(data.hcl)) {
        continue;
    }

    if (!validEcl(data.ecl)) {
        continue;
    }

    if (!validPid(data.pid)) {
        continue;
    }

    ++valid;
}

console.log(valid);

function validYear(year, from, to) {
    if (!/^\d\d\d\d$/.test(year)) {
        return false;
    }
    year = parseInt(year, 10);

    return year >= from && year <= to;
}

function validHgt(hgt) {
    if (!hgt) {
        return false;
    }
    let groups;
    if (groups = hgt.match(/^(\d+)(cm|in)$/)) {
        const height = parseInt(groups[1], 10);
        if (groups[2] === 'cm') {
            return height >= 150 && height <= 193;
        } else {
            return height >= 59 && height <= 76;
        }
    }
    return false;
}

function validHcl(hcl) {
    return /^#([0-9a-f]){6}$/.test(hcl);
}

function validEcl(ecl) {
    return /^(amb|blu|brn|gry|grn|hzl|oth)$/.test(ecl);
}

function validPid(pid) {
    return/^\d{9}$/.test(pid);
}
