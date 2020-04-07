import {
  KEYS,
} from '../constants';

export default class KeyboardShortcuts {
  constructor(storage, tools, frames, preview) {
    this.storage = storage;
    this.tools = tools;
    this.frames = frames;
    this.preview = preview;
  }

  init() {
    document.addEventListener('keyup', ({ keyCode }) => {
      if (keyCode === KEYS.keyA.code) {
        this.frames.addNewFrame();
      }
      if (keyCode === KEYS.keyC.code) {
        this.frames.duplicateActiveFrame();
      }
      if (keyCode === KEYS.keyD.code) {
        this.frames.deleteActiveFrame();
      }

      if (keyCode === KEYS.keyP.code) {
        this.storage.state.toolClassIndex = KEYS.keyP.toolIndex;
        this.tools.changeActiveTool();
      }
      if (keyCode === KEYS.keyE.code) {
        this.storage.state.toolClassIndex = KEYS.keyE.toolIndex;
        this.tools.changeActiveTool();
      }
      if (keyCode === KEYS.keyB.code) {
        this.storage.state.toolClassIndex = KEYS.keyB.toolIndex;
        this.tools.changeActiveTool();
      }
      if (keyCode === KEYS.keyS.code) {
        this.storage.state.toolClassIndex = KEYS.keyS.toolIndex;
        this.tools.changeActiveTool();
      }
      if (keyCode === KEYS.keyO.code) {
        this.storage.state.toolClassIndex = KEYS.keyO.toolIndex;
        this.tools.changeActiveTool();
      }

      if (keyCode === KEYS.key1.code) {
        this.storage.state.penSizeIndex = KEYS.key1.penSizeIndex;
        this.tools.penSize.changeActivePenSize();
      }
      if (keyCode === KEYS.key2.code) {
        this.storage.state.penSizeIndex = KEYS.key2.penSizeIndex;
        this.tools.penSize.changeActivePenSize();
      }
      if (keyCode === KEYS.key3.code) {
        this.storage.state.penSizeIndex = KEYS.key3.penSizeIndex;
        this.tools.penSize.changeActivePenSize();
      }
      if (keyCode === KEYS.key4.code) {
        this.storage.state.penSizeIndex = KEYS.key4.penSizeIndex;
        this.tools.penSize.changeActivePenSize();
      }

      if (keyCode === KEYS.keyK.code) {
        this.storage.state.canvasSizeIndex = KEYS.keyK.canvasSizeIndex;
        this.tools.canvasSize.setCanvasSize();
      }
      if (keyCode === KEYS.keyL.code) {
        this.storage.state.canvasSizeIndex = KEYS.keyL.canvasSizeIndex;
        this.tools.canvasSize.setCanvasSize();
      }
      if (keyCode === KEYS.keyM.code) {
        this.storage.state.canvasSizeIndex = KEYS.keyM.canvasSizeIndex;
        this.tools.canvasSize.setCanvasSize();
      }

      if (keyCode === KEYS.keyX.code) {
        this.tools.colorSelect.colorSwap();
      }

      if (keyCode === KEYS.keyF.code) {
        this.preview.toggleFullScreenMode();
      }
    });
  }
}
