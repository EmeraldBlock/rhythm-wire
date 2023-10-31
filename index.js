class Vec {
    constructor(x,y) {
        this.x = x;
        this.y = y;
    }
    add(v) {
        return new Vec(this.x+v.x,this.y+v.y);
    }
    scale(a) {
        return new Vec(this.x*a,this.y*a);
    }
    lerp(v,a) {
        return this.scale(1-a).add(v.scale(a));
    }
}

let saber = new Vec(50,50);
let aim = new Vec(50,50);

const elem = document.getElementById("saber");

const active = new Set();
document.addEventListener("keydown", (e) => {
    active.add(e.code);
    e.preventDefault();
});
document.addEventListener("keyup", (e) => {
    active.delete(e.code);
    e.preventDefault();
});

let saber2 = new Vec(50,50);
let aim2 = new Vec(50,50);

const elem2 = document.getElementById("saber2");

document.addEventListener("mousemove", (e) => {
    aim2 = new Vec(e.pageX,e.pageY);
});

document.addEventListener("blur", (e) => {
    active.clear();
});

const offX = 5;
const keyX = 8;
const keyY = 16;

const locs = new Map();
{
    let x = offX-keyX/2;
    for (const c of [...[..."1234567890"].map(c=>`Digit${c}`), "Minus", "Equal", "Backspace"]) {
        locs.set(c, new Vec(x,25-keyY));
        x += keyX;
    };
}
{
    let x = offX;
    for (const c of [...[..."QWERTYUIOP"].map(c=>`Key${c}`), "BracketLeft", "BracketRight", "Backslash"]) {
        locs.set(c, new Vec(x,25));
        x += keyX;
    };
}
{
    let x = offX+keyX/4;
    for (const c of [...[..."ASDFGHJKL"].map(c=>`Key${c}`), "Semicolon", "Quote", "Enter"]) {
        locs.set(c, new Vec(x,25+keyY));
        x += keyX;
    };
}
{
    let x = offX+keyX*3/4;
    for (const c of [...[..."ZXCVBNM"].map(c=>`Key${c}`), "Comma", "Period", "Slash", "ShiftRight"]) {
        locs.set(c, new Vec(x,25+keyY*2));
        x += keyX;
    };
}

const upd = (t) => {
    let nxt = new Vec(0,0);
    let n = 0;
    for (const k of active) {
        if (!locs.has(k)) continue;
        nxt = nxt.add(locs.get(k));
        ++n;
    }
    if (n === 0) {
        // idk
    } else {
        aim = nxt.scale(1/n);
    }
    // console.log(active);
    saber = saber.lerp(aim,0.2);
    elem.style.left = `${saber.x}vw`;
    elem.style.top = `${saber.y}vh`;

    saber2 = saber2.lerp(aim2,0.2);
    elem2.style.left = `${saber2.x}px`;
    elem2.style.top = `${saber2.y}px`;
    requestAnimationFrame(upd);
};

requestAnimationFrame(upd);
