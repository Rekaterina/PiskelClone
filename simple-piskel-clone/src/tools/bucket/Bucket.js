import {
  compareColors,
  hexToRgbColorValueArray,
  changeColorData,
} from '../../helper';

import {
  MOUSE_BUTTON_EVENT,
  STEP_OF_RGB_COLOR,
} from '../../constants';

export default class Bucket {
  constructor(storage, canvasElem) {
    this.storage = storage;
    this.canvasElem = canvasElem;
    this.ctx = this.canvasElem.getContext('2d');
    this.index = 0;
  }

  bucketTool() {
    this.canvasElem.addEventListener('mousedown', (event) => {
      if (this.storage.state.tool.bucket) {
        const targetX = event.offsetX;
        const targetY = event.offsetY;
        const { width } = this.canvasElem;
        const { height } = this.canvasElem;
        const imageData = this.ctx.getImageData(0, 0, width, height);
        const { data } = imageData;
        const targetColorData = this.ctx.getImageData(targetX, targetY, 1, 1).data;
        if (event.button === MOUSE_BUTTON_EVENT.left) {
          this.paintColorData = hexToRgbColorValueArray(this.storage.state.color.primaryColor);
        }
        if (event.button === MOUSE_BUTTON_EVENT.right) {
          this.paintColorData = hexToRgbColorValueArray(this.storage.state.color.secondaryColor);
        }
        const stack = [[targetX, targetY]];
        if (compareColors(targetColorData, this.index, this.paintColorData)) return;
        while (stack.length > 0) {
          const pixel = stack.pop();
          if ((pixel[0] > 0 || pixel[0] <= width) && (pixel[1] > 0 || pixel[1] <= height)) {
            this.index = pixel[1] * STEP_OF_RGB_COLOR * width + pixel[0] * STEP_OF_RGB_COLOR;

            if (compareColors(data, this.index, targetColorData)) {
              changeColorData(data, this.index, this.paintColorData);
              stack.push([
                pixel[0] - 1,
                pixel[1],
              ]);

              stack.push([
                pixel[0] + 1,
                pixel[1],
              ]);

              stack.push([
                pixel[0],
                pixel[1] - 1]);

              stack.push([
                pixel[0],
                pixel[1] + 1,
              ]);
            }
          }
        }
        this.ctx.putImageData(imageData, 0, 0);
      }
    });
  }
}
