const start = 1750460400000;
const end = 1755454800000;

function getNowMilliseconds() {
    return Date.now();
};

function getData(theStart, theEnd, theNow) {
    const fullPercent = theEnd - theStart;
    const now = theNow;

    const remaining = end - now;
    const beenThrough = fullPercent - remaining;

    let remainingPercent = remaining / fullPercent * 100;
    let beenThroughPercent = beenThrough / fullPercent * 100;

    if (remainingPercent >= 0) {
        remainingPercent = remainingPercent;
    } else {
        remainingPercent = 0;
    };

    if (beenThroughPercent <= 100) {
        beenThroughPercent = beenThroughPercent;
    } else {
        beenThroughPercent = 100;
    };

    const other = {
        days: {
                done: String(Math.floor(beenThrough / 1000 / 60 / 60 / 24)),
                left: String(Math.floor(remaining / 1000 / 60 / 60 / 24))
            },
            hours: {
                done: String(Math.floor(beenThrough / 1000 / 60 / 60)),
                left: String(Math.floor(remaining / 1000 / 60 / 60))
            },
            minutes: {
                done: String(Math.floor(beenThrough / 1000 / 60)),
                left: String(Math.floor(remaining / 1000 / 60))
            },
            seconds: {
                done: String(Math.floor(beenThrough / 1000)),
                left: String(Math.floor(remaining / 1000))
            }
    };

    const percent = {
        remaining: String(remainingPercent).slice(0, 6),
        beenThrough: String(beenThroughPercent).slice(0, 6)
    };

    
    return {
        percent: percent,
        other: other
    };
};

function readifyString(string) {
    const stringArr = string.split("");

    const revStringArr = stringArr.reverse();

    const revLength = revStringArr.length;

    const newStringArr = [];

    revStringArr.forEach((letter, i) => {
        if ((i+1) % 3 === 0 && !((i+1) === revLength)) {
            newStringArr.push(` ${letter}`);
        } else {
            newStringArr.push(`${letter}`);
        };
    });

    return newStringArr.reverse().join("");
};

function updateDOM(object) {
    const tableDOMObj = {
        days: {
            done: document.querySelector("#dager-gatt"),
            left: document.querySelector("#dager-igjen")
        },
        hours: {
            done: document.querySelector("#timer-gatt"),
            left: document.querySelector("#timer-igjen")
        },
        minutes: {
            done: document.querySelector("#minutter-gatt"),
            left: document.querySelector("#minutter-igjen")
        },
        seconds: {
            done: document.querySelector("#sekunder-gatt"),
            left: document.querySelector("#sekunder-igjen")
        }
    };
    const dataTableObj = object.other;

    tableDOMObj.days.done.textContent = readifyString(dataTableObj.days.done);
    tableDOMObj.days.left.textContent = readifyString(dataTableObj.days.left);
    
    tableDOMObj.hours.done.textContent = readifyString(dataTableObj.hours.done);
    tableDOMObj.hours.left.textContent = readifyString(dataTableObj.hours.left);

    tableDOMObj.minutes.done.textContent = readifyString(dataTableObj.minutes.done);
    tableDOMObj.minutes.left.textContent = readifyString(dataTableObj.minutes.left);

    tableDOMObj.seconds.done.textContent = readifyString(dataTableObj.seconds.done);
    tableDOMObj.seconds.left.textContent = readifyString(dataTableObj.seconds.left);

    document.querySelector("#rest-removal-white").style.width = `${object.percent.remaining}%`;
    document.querySelector("#percent-display-done").textContent = `${object.percent.beenThrough}%`;
    document.querySelector("#percent-display-left").textContent = `${object.percent.remaining}%`;
};

console.log(readifyString("1543873"));

setInterval(() => {
    updateDOM(getData(start, end, getNowMilliseconds()));
}, 500)