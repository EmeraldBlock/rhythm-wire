import Vec from "./vec.js";

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

export default locs;
