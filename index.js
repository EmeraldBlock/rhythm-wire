import { canvas, dims } from "./src/constants.js";
import { getLeftAim, getRightAim } from "./src/aim.js";
import { drawKeyboard } from "./src/keys.js";

let leftLoc = getLeftAim();
let rightLoc = getRightAim();

const ctx = canvas.getContext("2d");

const dot = (v, color) => {
    ctx.beginPath();
    ctx.arc(v.x,v.y,10,0,Math.PI*2);
    ctx.fillStyle = color;
    ctx.fill();
};

const upd = (t) => {
    leftLoc = leftLoc.lerp(getLeftAim(),0.5);
    rightLoc = rightLoc.lerp(getRightAim(),0.5);

    ctx.fillStyle = "black";
    ctx.fillRect(0,0,dims.x,dims.y);
    drawKeyboard(ctx);

    ctx.beginPath();
    ctx.moveTo(leftLoc.x,leftLoc.y);
    ctx.lineTo(rightLoc.x,rightLoc.y);
    ctx.lineWidth = 5;
    ctx.strokeStyle = "white";
    ctx.stroke();

    dot(leftLoc, "red");
    dot(rightLoc, "blue");
    ctx.globalCompositeOperation = "screen";
    dot(leftLoc, "red");
    ctx.globalCompositeOperation = "source-over";

    requestAnimationFrame(upd);
};
requestAnimationFrame(upd);
