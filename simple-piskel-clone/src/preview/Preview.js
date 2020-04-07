import GIF from '../../node_modules/gif.js.optimized/dist/gif';
import './preview.css';

import {
  changeCanvasSize,
  removeClasses,
  drawImage,
  removeChildNode,
  addTextNode,
} from '../helper';

import {
  PREVIEW_SCALE_CLASSES,
} from '../constants';

export default class Preview {
  constructor(storage) {
    this.storage = storage;
    this.previewElem = document.querySelector('.preview');
    this.ctx = this.previewElem.getContext('2d');
    this.previewContainer = document.querySelector('.preview-container');
    this.fullScreenButton = document.querySelector('.full-screen-btn');
    this.inputRange = document.querySelector('.input-range');
    this.rateValue = document.querySelector('.rate-value');
    this.gifButton = document.querySelector('.gif-btn');
    this.animation = this.animation.bind(this);
  }

  init() {
    this.fullScreenButtonListener();
    this.inputRangeListener();
    this.setAnimationRate();
    this.exportListener();
  }

  fullScreenButtonListener() {
    this.fullScreenButton.addEventListener('click', this.toggleFullScreenMode.bind(this));
  }

  toggleFullScreenMode() {
    if (!document.fullscreenElement) {
      this.previewContainer.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }

  setAnimationRate() {
    this.inputRange.value = this.storage.state.FPS;
    addTextNode(this.rateValue, this.storage.state.FPS);
  }

  inputRangeListener() {
    this.inputRange.addEventListener('change', this.changeAnimationRange.bind(this));
  }

  changeAnimationRange() {
    this.storage.state.FPS = this.inputRange.value;
    removeChildNode(this.rateValue);
    addTextNode(this.rateValue, this.storage.state.FPS);
  }

  animateFrames() {
    this.frameIndex = 0;
    this.animation();
  }

  animation() {
    this.animationInterval = 1000 / this.storage.state.FPS;
    this.clearPreview();
    if (!this.storage.state.frameItems[this.frameIndex]) {
      this.frameIndex = 0;
    }
    drawImage(this.storage.state.frameItems[this.frameIndex], this.ctx);
    if (this.storage.state.frameItems.length === 1) {
      return;
    }
    this.frameIndex += 1;
    if (this.frameIndex === this.storage.state.frameItems.length) {
      this.frameIndex = 0;
    }

    setTimeout(this.animation, this.animationInterval);
  }

  clearPreview() {
    this.ctx.clearRect(0, 0, this.previewElem.width, this.previewElem.height);
  }

  setPreviewSize() {
    removeClasses(this.previewElem, 'preview-scale1', 'preview-scale2', 'preview-scale3');
    changeCanvasSize(this.previewElem, this.storage.state.canvasSizeIndex, PREVIEW_SCALE_CLASSES);
  }

  exportListener() {
    this.gifButton.addEventListener('click', this.exportAsGif.bind(this));
  }

  exportAsGif() {
    const gif = new GIF({
      quality: 1,
      workerScript: './gif/gif.worker.js',
      width: this.previewElem.width,
      height: this.previewElem.height,
    });

    this.storage.state.frameItems.forEach((item) => {
      const gifCanvas = document.createElement('canvas');
      const ctx = gifCanvas.getContext('2d');
      gifCanvas.width = this.previewElem.width;
      gifCanvas.height = this.previewElem.height;
      if (!item) return;
      drawImage(item, ctx);
      gif.addFrame(gifCanvas, { delay: this.animationInterval });
    });

    gif.on('finished', this.downloadGif.bind(this));
    gif.render();
  }

  downloadGif(blob) {
    this.url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = 'image.gif';
    link.href = this.url;
    link.click();
  }
}
