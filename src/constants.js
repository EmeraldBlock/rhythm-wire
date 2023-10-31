import Vec from "./vec.js";

export const canvas = /** @type {HTMLCanvasElement} */ (document.getElementById("game"));
export const dims = new Vec(canvas.width,canvas.height);
