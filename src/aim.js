import Vec from "./vec.js";
import locs from "./keys.js";
import { canvas, dims } from "./constants.js";

const active = new Set();
document.addEventListener("keydown", (e) => {
    if (!locs.has(e.code)) return;
    active.add(e.code);
    e.preventDefault();
});
document.addEventListener("keyup", (e) => {
    active.delete(e.code);
    e.preventDefault();
});
document.addEventListener("blur", (e) => {
    active.clear();
});

let leftAim = dims.scale(1/2);
export const getLeftAim = () => {
    const n = active.size;
    if (n !== 0) {
        leftAim = [...active].reduce((sum,k) => sum.add(locs.get(k)), new Vec(0,0)).scale(1/n).scale(dims.x/100,dims.y/100);
    }
    return leftAim;
};

let rightAim = dims.scale(1/2);
document.addEventListener("mousemove", (e) => {
    const { x, y } = canvas.getBoundingClientRect();
    rightAim = new Vec(e.clientX-x,e.clientY-y);
});

export const getRightAim = () => rightAim;
