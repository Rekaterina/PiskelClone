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
    this.animation = this.animation.bind(this);
    this.stopAnim = this.animateFrames.bind(this);
    this.isAnimation = true;
    this.timeOutId = null;
  }

  init() {
    this.fullScreenButtonListener();
    this.inputRangeListener();
    this.setAnimationRate();
  }

  fullScreenButtonListener() {
    this.fullScreenButton.addEventListener('click', () => this.toggleFullScreenMode());
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
    this.inputRange.addEventListener('change', () => this.changeAnimationRange());
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
    if (!this.frameIndex) {
      this.frameIndex = 0;
    }
    if (!this.isAnimation) return;
    this.animationInterval = 1000 / this.storage.state.FPS;
    this.clearPreview();
    if (!this.storage.state.frameItems[this.frameIndex]) {
      return;
    }
    drawImage(this.storage.state.frameItems[this.frameIndex], this.ctx);
    if (this.storage.state.frameItems.length === 1) {
      return;
    }
    this.frameIndex += 1;
    if (this.frameIndex === this.storage.state.frameItems.length) {
      this.frameIndex = 0;
    }

    this.timeOutId = setTimeout(this.animation, this.animationInterval);
  }
  
  clearPreview() {
    this.ctx.clearRect(0, 0, this.previewElem.width, this.previewElem.height);
  }

  setPreviewSize() {
    removeClasses(this.previewElem, 'preview-scale1', 'preview-scale2', 'preview-scale3');
    changeCanvasSize(this.previewElem, this.storage.state.canvasSizeIndex, PREVIEW_SCALE_CLASSES);
  }

  stopAnim() {
    clearTimeout(this.timeOutId);
  }
}
