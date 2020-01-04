import {
  MOUSE_BUTTON_EVENT,
} from '../../constants';

export default class Pen {
  constructor(storage, canvasElem, penSize) {
    this.storage = storage;
    this.canvasElem = canvasElem;
    this.penSize = penSize;
    this.ctx = this.canvasElem.getContext('2d');
    this.drawing = false;
    this.penMousedown = (event) => {
      this.drawing = true;
      this.startX = event.offsetX;
      this.startY = event.offsetY;
      this.mouseEvent = event;
    };

    this.penMousemove = (event) => {
      if (this.drawing) {
        this.draw(event);
      }
    };

    this.penMouseup = () => {
      this.drawing = false;
    };

    this.penMouseout = () => {
      this.drawing = false;
    };
  }

  init() {
    this.penTool();
  }

  penTool() {
    this.canvasElem.addEventListener('mousedown', this.penMousedown);
    this.canvasElem.addEventListener('mousemove', this.penMousemove);
    this.canvasElem.addEventListener('mouseup', this.penMouseup);
    this.canvasElem.addEventListener('mouseout', this.penMouseout);
  }

  removePenEventListeners() {
    this.canvasElem.removeEventListener('mousedown', this.penMousedown);
    this.canvasElem.removeEventListener('mousemove', this.penMousemove);
    this.canvasElem.removeEventListener('mouseup', this.penMouseup);
    this.canvasElem.removeEventListener('mouseout', this.penMouseout);
  }

  draw(event) {
    if (this.mouseEvent.button === MOUSE_BUTTON_EVENT.left) {
      this.ctx.fillStyle = this.storage.state.color.primaryColor;
    }
    if (this.mouseEvent.button === MOUSE_BUTTON_EVENT.right) {
      this.ctx.fillStyle = this.storage.state.color.secondaryColor;
    }

    // line(e, this.startX, this.startY, fill.bind(this.canvasElem, this.startX, this.startY, this.penSize));
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
      this.ctx.fillRect(this.startX, this.startY, this.penSize.size, this.penSize.size);
    }
  }
}
