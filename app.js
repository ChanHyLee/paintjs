const canvas = document.getElementById("jsCanvas"); //canvas는 pixel을 다루는 기능이 있는 HTML5의 태그
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const effect = document.getElementById("jsEffect");
const mode = document.getElementById("jsMode");
const classEffect = document.querySelector(".jsClassEffect");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

//pixel modifier
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

//default
ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;
let effectValue = "ff";

let painting = false;
let filling = false;

function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}

function rgbToHex(rgb) {
    const len = rgb.length;
    const rgbArray = rgb.substring(4, len - 1).split(", ");
    const R = String(Number(rgbArray[0]).toString(16));
    const G = String(Number(rgbArray[1]).toString(16));
    const B = String(Number(rgbArray[2]).toString(16));
    return `#${
        parseInt(Number("0x" + R), 10) < 16 ? `0${R}` : R
    }${
        parseInt(Number("0x" + G), 10) < 16 ? `0${G}` : G
    }${
        parseInt(Number("0x" + B), 10) < 16 ? `0${B}` : B
    }`;
}

function rgbaToHex(rgba) {
    const len = rgba.length;
    const rgbArray = rgba.substring(5, len - 1).split(", ");
    const R = String(Number(rgbArray[0]).toString(16));
    const G = String(Number(rgbArray[1]).toString(16));
    const B = String(Number(rgbArray[2]).toString(16));
    const A = String(Number(rgbArray[3]).toString(16));
    return `#${
        parseInt(Number("0x" + R), 10) < 16 ? `0${R}` : R
    }${
        parseInt(Number("0x" + G), 10) < 16 ? `0${G}` : G
    }${
        parseInt(Number("0x" + B), 10) < 16 ? `0${B}` : B
    }${
        parseInt(Number("0x" + A), 10) < 16 ? `0${A}` : A
    }`;
}
/*
function hexToRgb(hex) {
    const R = parseInt(Number("0x" + hex.substring(1, 3), 10));
    const G = parseInt(Number("0x" + hex.substring(3, 5), 10));
    const B = parseInt(Number("0x" + hex.substring(5, 7), 10));
    return `rgba(${R}, ${G}, ${B})`;
}

function hexToRgba(hex) {
    const R = parseInt(Number("0x" + hex.substring(1, 3), 10));
    const G = parseInt(Number("0x" + hex.substring(3, 5), 10));
    const B = parseInt(Number("0x" + hex.substring(5, 7), 10));
    const A = parseInt(Number("0x" + hex.substring(7, 9), 10));
    return `rgba(${R}, ${G}, ${B}, ${A})`;
}
*/
function clearColor(color) {
    if (String(color).length === 7) {
        return String(color);
    } else if (String(color).length === 9) {
        return String(color).substring(0, 7);
    } else {
        if (String(color).startsWith("rgba")) {
            return rgbaToHex(color).substring(0, 7);
        } else {
            return rgbToHex(color);
        }
    }
}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if (!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
        //ctx.closePath();
    }
}

function handleColorClick(event) {
    const color = rgbToHex(event.target.style.backgroundColor);
    const colorFinal = color + effectValue;
    ctx.strokeStyle = colorFinal;
    ctx.fillStyle = color;
}

function handleRangeChange(event) {
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleEffectChange(event) {
    const getValue = Number(event.target.value);
    if (Boolean(getValue)) {
        //Effect On
        effectValue = "40";
    } else {
        //Effect Off
        effectValue = "ff";
    }
    ctx.strokeStyle = clearColor(ctx.strokeStyle);
    const color = ctx.strokeStyle;
    const colorFinal = color + effectValue;
    ctx.strokeStyle = colorFinal;
}

function handleModeClick() {
    if (filling === true) {
        filling = false;
        mode.innerText = "Fill";
        classEffect.classList.remove("visible");
    } else {
        filling = true;
        mode.innerText = "Paint";
        classEffect.classList.add("visible");
    }
}

function handleCanvasClick() {
    if (filling === true) {
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
}

function handleCM(event) {
    event.preventDefault();
}

function handleSaveClick(event) {
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS🎨";
    link.click();
}

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}

Array.from(colors).forEach(
    color => color.addEventListener("click", handleColorClick)
);

if (range) {
    range.addEventListener("input", handleRangeChange);
}

if (effect) {
    effect.addEventListener("input", handleEffectChange);
}

if (mode) {
    mode.addEventListener("click", handleModeClick);
}

if (saveBtn) {
    saveBtn.addEventListener("click", handleSaveClick);
}