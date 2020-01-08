import CanvasSize from './canvas-size/CanvasSize';
import PenSize from './pen-size/PenSize';
import ColorSelect from './color-select/ColorSelect';
import Pen from './pen/Pen';
import ColorPicker from './color-picker/ColorPicker';
import Bucket from './bucket/Bucket';
import PaintSamePixel from './paint-same-pixel/PaintSamePixel';
import './tools.css';

import {
  getTrueIndex,
  removeClass,
  addClass,
  setAllFlagFalse,
  setOneFlagTrue,
} from '../helper';

import {
  TOOL_CLASSES,
  TOOL_NAMES,
} from '../constants';

export default class Tools {
  constructor(storage, canvasElem, frames, preview) {
    this.storage = storage;
    this.canvasElem = canvasElem;
    this.frames = frames;
    this.preview = preview;
    this.canvasSize = new CanvasSize(this.storage, this.canvasElem, frames, preview);
    this.penSize = new PenSize(this.storage);
    this.colorSelect = new ColorSelect(this.storage);
    this.pen = new Pen(this.storage, this.canvasElem, this.penSize, frames);
    this.colorPicker = new ColorPicker(this.storage, this.canvasElem);
    this.bucket = new Bucket(this.storage, this.canvasElem);
    this.paintSamePixel = new PaintSamePixel(this.storage, this.canvasElem);
    this.toolItem = document.querySelectorAll('.tool-item');
    this.penToolElem = document.querySelector('.pen-tool');
    this.eraserToolElem = document.querySelector('.eraser-tool');
    this.colorPickerElem = document.querySelector('.color-picker');
    this.paintBucketToolElem = document.querySelector('.paint-bucket-tool');
    this.paintSamePixelToolElem = document.querySelector('.paint-same-pixel-tool');
    this.arrayToolElem = [this.penToolElem, this.eraserToolElem, this.paintBucketToolElem,
      this.paintSamePixelToolElem, this.colorPickerElem];
  }

  init() {
    this.noContextmenu();
    this.canvasSize.init();
    this.penSize.init();
    this.colorSelect.init();
    this.addClassActive();
    this.chooseTool();
    this.pen.penTool();
    this.colorPicker.colorPickerTool();
    this.bucket.bucketTool();
    this.paintSamePixel.paintSamePixelTool();
  }

  noContextmenu() {
    this.canvasElem.addEventListener('contextmenu', (e) => {
      e.preventDefault();
    });
  }

  addClassActive() {
    this.removeClassActive();
    const toolIndex = getTrueIndex(this.storage.state.tool);
    addClass('active', this.arrayToolElem[toolIndex]);
  }

  removeClassActive() {
    removeClass('active', ...Array.from(this.toolItem));
  }

  chooseTool() {
    const toolsContainer = document.querySelector('.tools-container');
    toolsContainer.addEventListener('click', (e) => {
      this.getToolClassIndex(e);
      this.removeActiveTool();
      this.addNewActiveTool();
      this.addClassActive();
    });
  }

  getToolClassIndex({ target }) {
    target.classList.forEach((item) => {
      if (TOOL_CLASSES.indexOf(item) !== -1) {
        this.toolClassIndex = TOOL_CLASSES.indexOf(item);
      } else {
        target.parentNode.classList.forEach((item2) => {
          if (TOOL_CLASSES.indexOf(item2) !== -1) {
            this.toolClassIndex = TOOL_CLASSES.indexOf(item2);
          }
        });
      }
    });
  }

  removeActiveTool() {
    setAllFlagFalse(this.storage.state.tool);
  }

  addNewActiveTool() {
    setOneFlagTrue(this.storage.state.tool, `${TOOL_NAMES[this.toolClassIndex]}`);
  }
}
