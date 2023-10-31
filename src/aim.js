import Vec from "./vec.js";
import { locs } from "./keys.js";
import { canvas, dims } from "./constants.js";

const active = new Set();
document.addEventListener("keydown", (e) => {
    if (e.ctrlKey || !locs.has(e.code)) return;
    e.preventDefault();

    active.add(e.code);
});
document.addEventListener("keyup", (e) => {
    if (!active.has(e.code)) return;
    e.preventDefault();

    active.delete(e.code);
    lastLoc = locs.get(e.code);
});
document.addEventListener("blur", (e) => {
    active.clear();
});

let lastLoc = dims.scale(1/2);
export const getLeftAim = () => {
    const n = active.size;
    if (n !== 0) {
        return [...active].reduce((sum,k) => sum.add(locs.get(k)), new Vec(0,0)).scale(1/n);
    } else {
        return lastLoc;
    }
};

let rightAim = dims.scale(1/2);
document.addEventListener("mousemove", (e) => {
    const { x, y } = canvas.getBoundingClientRect();
    rightAim = new Vec(e.clientX-x,e.clientY-y);
});

export const getRightAim = () => rightAim;
