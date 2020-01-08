import {
  rgbToHexColor,
  extractRgbColor,
} from '../../helper';

export default class ColorPicker {
  constructor(storage, canvasElem) {
    this.storage = storage;
    this.canvasElem = canvasElem;
    this.ctx = this.canvasElem.getContext('2d');
    this.primaryColor = document.querySelector('.primary-color');
  }

  colorPickerTool() {
    this.canvasElem.addEventListener('click', (event) => {
      if (this.storage.state.tool.picker) {
        const x = event.offsetX;
        const y = event.offsetY;
        const imageData = this.ctx.getImageData(x, y, 1, 1).data;
        const newColorRgb = extractRgbColor(imageData);
        const newColorHex = rgbToHexColor(newColorRgb);
        if (this.storage.state.color.primaryColor !== newColorHex) {
          this.storage.state.color.primaryColor = newColorHex;
          this.primaryColor.value = this.storage.state.color.primaryColor;
        }
      }
    });
  }
}
