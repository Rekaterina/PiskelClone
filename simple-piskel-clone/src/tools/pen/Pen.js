import {
  MOUSE_BUTTON_EVENT,
} from '../../constants';

export default class Pen {
  constructor(storage, canvasElem, penSize, frames) {
    this.storage = storage;
    this.canvasElem = canvasElem;
    this.penSize = penSize;
    this.frames = frames;
    this.ctx = this.canvasElem.getContext('2d');
    this.drawing = false;
  }

  penTool() {
    this.canvasElem.addEventListener('mousedown', (event) => {
      if (this.storage.state.tool.pen || this.storage.state.tool.eraser) {
        this.drawing = true;
        this.startX = event.offsetX;
        this.startY = event.offsetY;
        this.mouseEvent = event;
      }
    });

    this.canvasElem.addEventListener('mousemove', (event) => {
      if (this.storage.state.tool.pen || this.storage.state.tool.eraser) {
        if (this.drawing) {
          this.draw(event);
        }
      }
    });

    this.canvasElem.addEventListener('mouseup', () => {
      this.storage.setCanvasImage();
      this.frames.updateImageOnFrame();
      if (this.storage.state.tool.pen || this.storage.state.tool.eraser) {
        this.drawing = false;
      }
    });
  }

  draw(event) {
    if (this.mouseEvent.button === MOUSE_BUTTON_EVENT.left) {
      this.ctx.fillStyle = this.storage.state.color.primaryColor;
    }
    if (this.mouseEvent.button === MOUSE_BUTTON_EVENT.right) {
      this.ctx.fillStyle = this.storage.state.color.secondaryColor;
    }

    const currentX = event.offsetX;
    const currentY = event.offsetY;
    const deltaX = Math.abs(currentX - this.startX);
    const deltaY = Math.abs(currentY - this.startY);
    const dirX = this.startX < currentX ? 1 : -1;
    const dirY = this.startY < currentY ? 1 : -1;
    let error = deltaX - deltaY;

    while (!(this.startX === currentX && this.startY === currentY)) {
      const e2 = error;
      if (e2 > -deltaY) {
        error -= deltaY;
        this.startX += dirX;
      }

      if (e2 < deltaX) {
        error += deltaX;
        this.startY += dirY;
      }
      const method = this.storage.state.tool.pen ? 'fillRect' : 'clearRect';
      this.ctx[method](this.startX, this.startY, this.penSize.size, this.penSize.size);
    }
  }
}
