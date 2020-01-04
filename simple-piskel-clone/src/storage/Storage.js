import {
  COLOR,
  TOOL_NAMES,
  CANVAS_SIZE_NAMES,
  PEN_SIZE_NAMES,
} from '../constants';

import {
  getLocalStorageState,
  setLocalStorageState,
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
        stroke: false,
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
    };
  }

  getState() {
    if (localStorage.getItem('inApp') == null) {
      return;
    }
    this.state.inApp = JSON.parse(localStorage.getItem('inApp'));
    this.state.color.primaryColor = (localStorage.getItem('primaryColor'));
    this.state.color.secondaryColor = (localStorage.getItem('secondaryColor'));
    getLocalStorageState(TOOL_NAMES, this.state.tool);
    getLocalStorageState(CANVAS_SIZE_NAMES, this.state.canvasSize);
    getLocalStorageState(PEN_SIZE_NAMES, this.state.penSize);
    this.getCanvasImageState();
  }

  getCanvasImageState() {
    this.state.canvasImage = localStorage.getItem('canvasImage');
    const img = new Image();
    img.src = this.state.canvasImage;
    img.addEventListener('load', () => {
      this.ctx.drawImage(img, 0, 0);
    });
  }

  setState() {
    localStorage.setItem('inApp', this.state.inApp);
    localStorage.setItem('primaryColor', this.state.color.primaryColor);
    localStorage.setItem('secondaryColor', this.state.color.secondaryColor);
    setLocalStorageState(TOOL_NAMES, this.state.tool);
    setLocalStorageState(CANVAS_SIZE_NAMES, this.state.canvasSize);
    setLocalStorageState(PEN_SIZE_NAMES, this.state.penSize);
    this.setCanvasImageState();
  }

  setCanvasImageState() {
    this.state.canvasImage = this.canvasElem.toDataURL();
    localStorage.setItem('canvasImage', this.state.canvasImage);
  }
}
