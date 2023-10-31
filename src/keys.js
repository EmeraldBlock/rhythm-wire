import { dims } from "./constants.js";
import Vec from "./vec.js";

const offX = 100;
const offY = 250;
const keyX = 100;
const keyY = 100;

export const locs = new Map();
{
    let x = offX+keyX/2;
    for (const c of [...[..."1234567890"].map(c=>`Digit${c}`), "Minus", "Equal"]) {
        locs.set(c, new Vec(x,offY+keyY/2));
        x += keyX;
    };
}
{
    let x = offX+keyX;
    for (const c of [...[..."QWERTYUIOP"].map(c=>`Key${c}`), "BracketLeft", "BracketRight"]) {
        locs.set(c, new Vec(x,offY+keyY*3/2));
        x += keyX;
    };
}
{
    let x = offX+keyX*5/4;
    for (const c of [...[..."ASDFGHJKL"].map(c=>`Key${c}`), "Semicolon", "Quote"]) {
        locs.set(c, new Vec(x,offY+keyY*5/2));
        x += keyX;
    };
}
{
    let x = offX+keyX*7/4;
    for (const c of [...[..."ZXCVBNM"].map(c=>`Key${c}`), "Comma", "Period", "Slash"]) {
        locs.set(c, new Vec(x,offY+keyY*7/2));
        x += keyX;
    };
}

let keymap = undefined;
if (navigator.keyboard !== undefined) {
    (async () => {
        keymap = await navigator.keyboard.getLayoutMap();
    })();
}

export const drawKeyboard = (ctx) => {
    ctx.strokeStyle = "#400000";
    ctx.fillStyle = "#400000";
    for (const [k, v] of locs) {
        ctx.strokeRect(v.x-keyX/2,v.y-keyY/2,keyX,keyY);
        if (keymap !== undefined) {
            ctx.textBaseline = "top";
            ctx.font = "50px monospace";
            ctx.fillText(keymap.get(k),v.x-keyX/2+15,v.y-keyY/2+10);
        }
    }
};
