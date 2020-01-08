import {
  COLOR,
  TOOL_NAMES,
  CANVAS_SIZE_NAMES,
  PEN_SIZE_NAMES,
  FRAME_NAMES,
} from '../constants';

import {
  getLocalStorageState,
  setLocalStorageState,
  drawImage,
  getLocalStorageFrameState,
  setLocalStorageFrameState,
} from '../helper';

export default class Storage {
  constructor(canvasElem) {
    this.canvasElem = canvasElem;
    this.ctx = this.canvasElem.getContext('2d');
    this.state = {
      inApp: false,
      color: {
        primaryColor: COLOR.gold,
        secondaryColor: COLOR.black,
      },
      tool: {
        pen: true,
        eraser: false,
        bucket: false,
        paintSamePixel: false,
        picker: false,
      },
      canvasSize: {
        sizeOne: true,
        sizeTwo: false,
        sizeThree: false,
      },
      penSize: {
        penSizeOne: true,
        penSizeTwo: false,
        penSizeThree: false,
        penSizeFour: false,
      },
      canvasImage: '',
      frameItems: [],
      FPS: 1,
    };
  }

  getState() {
    if (localStorage.getItem('inApp') == null) {
      return;
    }
    this.state.inApp = JSON.parse(localStorage.getItem('inApp'));
    this.state.color.primaryColor = (localStorage.getItem('primaryColor'));
    this.state.color.secondaryColor = (localStorage.getItem('secondaryColor'));
    if (localStorage.getItem('FPS') !== 'undefined') {
      this.state.FPS = localStorage.getItem('FPS');
    }
    getLocalStorageState(TOOL_NAMES, this.state.tool);
    getLocalStorageState(CANVAS_SIZE_NAMES, this.state.canvasSize);
    getLocalStorageState(PEN_SIZE_NAMES, this.state.penSize);
    this.state.canvasImage = localStorage.getItem('canvasImage');
    getLocalStorageFrameState(FRAME_NAMES, this.state.frameItems);
  }

  drawImageOnCanvas() {
    drawImage(this.state.canvasImage, this.ctx);
  }

  setState() {
    localStorage.setItem('inApp', this.state.inApp);
    localStorage.setItem('primaryColor', this.state.color.primaryColor);
    localStorage.setItem('secondaryColor', this.state.color.secondaryColor);
    localStorage.setItem('FPS', this.state.FPS);
    setLocalStorageState(TOOL_NAMES, this.state.tool);
    setLocalStorageState(CANVAS_SIZE_NAMES, this.state.canvasSize);
    setLocalStorageState(PEN_SIZE_NAMES, this.state.penSize);
    localStorage.setItem('canvasImage', this.state.canvasImage);
    setLocalStorageFrameState(FRAME_NAMES, this.state.frameItems);
  }

  setCanvasImage() {
    this.state.canvasImage = this.canvasElem.toDataURL();
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvasElem.width, this.canvasElem.height);
  }
}
