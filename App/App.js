const canvasEl = document.querySelector('.canvas');
const ctx = canvasEl.getContext('2d');

// utils --->
const iterate = (num, fn) => Array(num).fill().map((v, i) => fn(i));
// <---

// hash function
const getCeilValue = (x, y, time) => {
  const sectorX = x % 100;
  const sectorY = y % 100;
  const sectorTime = time % 100;
  if (sectorX < sectorTime && sectorY < sectorTime) {
    return 200;
  }
  return 0;
};
// <---

// DRAW WORLD --->
const drawPixel = (x, y, color) => {
  ctx.fillStyle = `rgb(${color}, ${color}, ${color})`;
  ctx.fillRect(x, y, 1, 1);
};

const drawWorld = (time, getCeilValueFn) => {
  const { width, height } = ctx.canvas;
  iterate(width * height, (i) => {
    const x = i % width;
    const y = Math.floor(i / width);
    const value = getCeilValueFn(x, y, time);
    drawPixel(x, y, value);
  });
};
// <---

// start TIME
const timeTick = (time) => {
  drawWorld(time, getCeilValue);
  requestAnimationFrame(() => timeTick(time + 1));
};
//

// Fit CANVAS to window --->
const fitCanvasToWindow = () => {
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
};
window.addEventListener('resize', fitCanvasToWindow);
fitCanvasToWindow();
// <---

timeTick(0);

