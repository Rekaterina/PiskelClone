import {
  removeClass,
  removeClasses,
  addClass,
  getTrueIndex,
  setAllFlagFalse,
  setOneFlagTrue,
  changeCanvasSize,
} from '../../helper';

import {
  CANVAS_SIZE_CLASSES,
  CANVAS_SIZE_NAMES,
  CANVAS_SCALE_CLASSES,
} from '../../constants';

export default class CanvasSize {
  constructor(storage, canvasElem, frames, preview) {
    this.storage = storage;
    this.canvasElem = canvasElem;
    this.frames = frames;
    this.preview = preview;
    this.ctx = this.canvasElem.getContext('2d');
    this.canvasSizeItems = document.querySelectorAll('.canvas-size-item');
    this.canvasSizeItem1 = document.querySelector('.canvas-size-item1');
    this.canvasSizeItem2 = document.querySelector('.canvas-size-item2');
    this.canvasSizeItem3 = document.querySelector('.canvas-size-item3');
    this.arrayCanvasSizeItem = [this.canvasSizeItem1, this.canvasSizeItem2, this.canvasSizeItem3];
  }

  init() {
    this.addClassActive();
    changeCanvasSize(this.canvasElem, this.storage.state.canvasSizeIndex, CANVAS_SCALE_CLASSES);
    this.frames.setFramesSize();
    this.preview.setPreviewSize();
    this.chooseCanvasSize();
  }

  addClassActive() {
    this.removeClassActive();
    this.storage.state.canvasSizeIndex = getTrueIndex(this.storage.state.canvasSize);
    addClass('active', this.arrayCanvasSizeItem[this.storage.state.canvasSizeIndex]);
  }

  removeClassActive() {
    removeClass('active', ...Array.from(this.canvasSizeItems));
  }

  chooseCanvasSize() {
    const canvasSizeContainer = document.querySelector('.canvas-size-container');
    canvasSizeContainer.addEventListener('click', (e) => {
      this.storage.setCanvasImage();
      this.getCanvasSizeClassIndex(e);
      this.removeActiveCanvasSize();
      this.addNewActiveCanvasSize();
      this.addClassActive();
      this.removeClassScale();
      changeCanvasSize(this.canvasElem, this.storage.state.canvasSizeIndex, CANVAS_SCALE_CLASSES);
      this.frames.setFramesSize();
      this.preview.setPreviewSize();
      this.storage.drawImageOnCanvas();
      this.frames.drawImageOnFrames();
    });
  }

  getCanvasSizeClassIndex({ target }) {
    target.classList.forEach((item) => {
      if (CANVAS_SIZE_CLASSES.indexOf(item) !== -1) {
        this.storage.state.canvasSizeIndex = CANVAS_SIZE_CLASSES.indexOf(item);
      }
    });
  }

  removeActiveCanvasSize() {
    setAllFlagFalse(this.storage.state.canvasSize);
  }

  addNewActiveCanvasSize() {
    setOneFlagTrue(this.storage.state.canvasSize, `${CANVAS_SIZE_NAMES[this.storage.state.canvasSizeIndex]}`);
  }

  removeClassScale() {
    removeClasses(this.canvasElem, 'canvas-scale1', 'canvas-scale2', 'canvas-scale3');
  }
}
