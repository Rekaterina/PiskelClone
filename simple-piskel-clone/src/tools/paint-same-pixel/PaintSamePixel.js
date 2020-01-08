import {
  hexToRgbColorValueArray,
  replaceColor,
} from '../../helper';

import {
  MOUSE_BUTTON_EVENT,
} from '../../constants';

export default class PaintSamePixel {
  constructor(storage, canvasElem) {
    this.storage = storage;
    this.canvasElem = canvasElem;
    this.ctx = this.canvasElem.getContext('2d');
  }

  paintSamePixelTool() {
    this.canvasElem.addEventListener('mousedown', (event) => {
      if (this.storage.state.tool.paintSamePixel) {
        const targetX = event.offsetX;
        const targetY = event.offsetY;
        const { width } = this.canvasElem;
        const { height } = this.canvasElem;
        const canvasColorData = this.ctx.getImageData(0, 0, width, height);
        const { data } = canvasColorData;
        if (event.button === MOUSE_BUTTON_EVENT.left) {
          this.paintColor = hexToRgbColorValueArray(this.storage.state.color.primaryColor);
        }
        if (event.button === MOUSE_BUTTON_EVENT.right) {
          this.paintColor = hexToRgbColorValueArray(this.storage.state.color.secondaryColor);
        }
        const targetColor = this.ctx.getImageData(targetX, targetY, 1, 1).data;
        replaceColor(targetColor, this.paintColor, data);
        this.ctx.putImageData(canvasColorData, 0, 0);
      }
    });
  }
}
