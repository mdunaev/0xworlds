import interact from 'interactjs';
import EternityFunction from './Eternity';

const canvasEl = document.querySelector('.canvas');
const ctx = canvasEl.getContext('2d');

const state = {
  view: {
    x: 500,
    y: 500,
    scale: 1,
  },
};

// utils --->
const iterate = (num, fn) => Array(num).fill().map((v, i) => fn(i));
// <---

// DRAW WORLD --->
const drawPixel = (x, y, color) => {
  ctx.fillStyle = `rgb(${color}, ${color}, ${color})`;
  ctx.fillRect(x, y, 1, 1);
};

const drawWorld = (time, getCeilValueFn) => {
  const { width, height } = ctx.canvas;
  iterate(width * height, (i) => { // <--- iterate by canvas
    const x = i % width;
    const y = Math.floor(i / width);
    const value = getCeilValueFn(x - state.view.x / 4, y - state.view.y / 4, time);
    drawPixel(x, y, value);
  });
};
// <---

// start TIME
const timeTick = (time) => {
  drawWorld(time, EternityFunction);
  requestAnimationFrame(() => timeTick(time + 1));
};
//

// Fit CANVAS to window --->
const fitCanvasToWindow = () => {
  ctx.canvas.width = window.innerWidth / 4;
  ctx.canvas.height = window.innerHeight / 4;
  canvasEl.style.width = `${window.innerWidth}px`;
  canvasEl.style.height = `${window.innerHeight}px`;
};
window.addEventListener('resize', fitCanvasToWindow);
fitCanvasToWindow();
// <---

// Init canvas DRAG --->
const draggableSettings = {
  onmove: (event) => {
    state.view.x += event.dx;
    state.view.y += event.dy;
  }
};
interact('#canvas').draggable(draggableSettings).styleCursor(false);
// <---

timeTick(0);

