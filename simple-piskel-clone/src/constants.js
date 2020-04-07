const COLOR = { gold: '#ffd700', black: '#000000' };

const TOOL_CLASSES = ['pen-tool', 'eraser-tool', 'paint-bucket-tool', 'paint-same-pixel-tool', 'color-picker'];
const TOOL_NAMES = ['pen', 'eraser', 'bucket', 'paintSamePixel', 'picker'];

const CANVAS_SIZE_CLASSES = ['canvas-size-item1', 'canvas-size-item2', 'canvas-size-item3'];
const CANVAS_SCALE_CLASSES = ['canvas-scale1', 'canvas-scale2', 'canvas-scale3'];
const CANVAS_SIZE_NAMES = ['sizeOne', 'sizeTwo', 'sizeThree'];

const CANVAS_SIZE = { size1: 32, size2: 64, size3: 128 };

const PEN_SIZE_CLASSES = ['pen-size-item1', 'pen-size-item2', 'pen-size-item3', 'pen-size-item4'];
const PEN_SIZE_NAMES = ['penSizeOne', 'penSizeTwo', 'penSizeThree', 'penSizeFour'];

const FRAME_SCALE_CLASSES = ['frame-scale1', 'frame-scale2', 'frame-scale3'];

const PREVIEW_SCALE_CLASSES = ['preview-scale1', 'preview-scale2', 'preview-scale3'];

const MOUSE_BUTTON_EVENT = { left: 0, right: 2 };

const VALUE_OF_ALPHA = 255;

const STEP_OF_RGB_COLOR = 4;

const KEYS = {
  keyF: {
    code: 70,
  },
  keyA: {
    code: 65,
  },
  keyX: {
    code: 88,
  },
  keyD: {
    code: 68,
  },
  keyC: {
    code: 67,
  },
  keyP: {
    code: 80,
    toolIndex: 0,
  },
  keyE: {
    code: 69,
    toolIndex: 1,
  },
  keyB: {
    code: 66,
    toolIndex: 2,
  },
  keyS: {
    code: 83,
    toolIndex: 3,
  },
  keyO: {
    code: 79,
    toolIndex: 4,
  },
  key1: {
    code: 49,
    penSizeIndex: 0,
  },
  key2: {
    code: 50,
    penSizeIndex: 1,
  },
  key3: {
    code: 51,
    penSizeIndex: 2,
  },
  key4: {
    code: 52,
    penSizeIndex: 3,
  },
  keyK: {
    code: 75,
    canvasSizeIndex: 0,
  },
  keyL: {
    code: 76,
    canvasSizeIndex: 1,
  },
  keyM: {
    code: 77,
    canvasSizeIndex: 2,
  },
};

export {
  COLOR,
  TOOL_CLASSES,
  TOOL_NAMES,
  CANVAS_SIZE,
  CANVAS_SIZE_CLASSES,
  CANVAS_SCALE_CLASSES,
  CANVAS_SIZE_NAMES,
  MOUSE_BUTTON_EVENT,
  PEN_SIZE_CLASSES,
  PEN_SIZE_NAMES,
  VALUE_OF_ALPHA,
  STEP_OF_RGB_COLOR,
  FRAME_SCALE_CLASSES,
  PREVIEW_SCALE_CLASSES,
  KEYS,
};
