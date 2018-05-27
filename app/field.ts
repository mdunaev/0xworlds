import * as interact from 'interactjs';
import { state, setView } from './state';

export class WorldField {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private isTimePlayed = false;
  private time = 10;

  constructor(private eternityFunction) {
    this.canvas = document.querySelector('#canvas');
    this.ctx = this.canvas.getContext('2d');

    window.addEventListener('resize', this.fitCanvasToWindow);
    window.addEventListener('wheel', this.zoomField);
    this.fitCanvasToWindow();

    interact('#canvas')
      .draggable({
        onmove: (event: interact.InteractEvent) =>
          setView({
            ...state.view,
            x: state.view.x + event.dx / state.view.scale,
            y: state.view.y + event.dy / state.view.scale
          })
      })
      .styleCursor(false);
  }

  private timeTick() {
    this.time++;
    this.draw();
    if (this.isTimePlayed)
      requestAnimationFrame(() => this.timeTick());
  }

  public timeStart() {
    this.isTimePlayed = true;
    this.timeTick();
  }

  public timeStop = () => (this.isTimePlayed = false);

  private fitCanvasToWindow() {
    this.canvas.width = window.innerWidth / state.settings.dimension;
    this.canvas.height =
      window.innerHeight / state.settings.dimension;
    this.canvas.style.width = `${window.innerWidth}px`;
    this.canvas.style.height = `${window.innerHeight}px`;
  }

  private zoomField(event: WheelEvent) {
    const scaleDelta = event.deltaY / state.settings.scaleSpeed;
    const newScale = state.view.scale + scaleDelta;
    const newWidth = this.canvas.width / newScale;
    const newHeight = this.canvas.height / newScale;
    const oldWidth = this.canvas.width / state.view.scale;
    const oldHeight = this.canvas.height / state.view.scale;
    const adaptiveMouseX =
      event.pageX / state.settings.dimension / state.view.scale;
    const adaptiveMouseY =
      event.pageY / state.settings.dimension / state.view.scale;
    const mousePercentX =
      (adaptiveMouseX - oldWidth / 2) / (oldWidth / 2);
    const mousePercentY =
      (adaptiveMouseY - oldHeight / 2) / (oldHeight / 2);
    const widthDiff =
      oldWidth - newWidth + (oldWidth - newWidth) * mousePercentX;
    const heightDiff =
      oldHeight - newHeight + (oldHeight - newHeight) * mousePercentY;
    const xDiff = widthDiff / 2 * state.settings.dimension;
    const yDiff = heightDiff / 2 * state.settings.dimension;
    setView({
      ...state.view,
      x: state.view.x - xDiff,
      y: state.view.y - yDiff,
      scale: newScale
    });
    event.preventDefault();
  }

  private draw() {
    const { width, height } = this.canvas;

    const drawPixel = (x: number, y: number, color: number) => {
      x = Math.round(x);
      y = Math.round(y);
      const hexColorGray = Math.round(color);
      let hexColor = `rgb(${hexColorGray},${hexColorGray},${hexColorGray})`;
      if (color > 255) hexColor = '#ff0000';
      if (color < 0) hexColor = '#00ff00';
      this.ctx.fillStyle = hexColor;
      this.ctx.fillRect(x, y, 1, 1);
    };

    this.ctx.fillStyle = '#000';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = '#fff';

    Array(width * height)
      .fill(0)
      .map((v, i) => {
        const x = i % width;
        const y = Math.floor(i / width);

        const etX =
          x / state.view.scale -
          state.view.x / state.settings.dimension;
        const etY =
          y / state.view.scale -
          state.view.y / state.settings.dimension;

        const value = this.eternityFunction(etX, etY, this.time);
        if (value > 0) drawPixel(x, y, value);
      });
  }
}
