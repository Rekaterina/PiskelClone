import './frames.css';

import {
  drawImage,
  createNewElement,
  appendChildren,
  addTextNode,
  addClass,
  changeCanvasSize,
  removeClasses,
  removeClass,
  removeChildNode,
  removeArrayElem,
  insertArrayElem,
} from '../helper';

import {
  FRAME_SCALE_CLASSES,
} from '../constants';

export default class Frames {
  constructor(storage, canvasElem, preview) {
    this.storage = storage;
    this.canvasElem = canvasElem;
    this.preview = preview;
    this.framesContainer = document.querySelector('.frames-container');
    this.ctx = this.canvasElem.getContext('2d');
  }

  init() {
    this.drawFrame();
    this.addFramesPagination();
    this.addClassActiveToFirstFrame();
    this.drawImageOnFrames();
    this.preview.animateFrames();
    this.addButtonListener();
    this.addFramesListener();
  }

  drawFrame() {
    let frameNumber = this.storage.state.frameItems.length;
    if (frameNumber === 0) {
      this.createFrame();
    }
    while (frameNumber) {
      this.createFrame();
      frameNumber -= 1;
    }
  }

  createFrame() {
    this.framesContainer = document.querySelector('.frames-container');
    const frameItemContainer = createNewElement('div', 'frame-item-container');
    const frameItem = createNewElement('canvas', 'frame-item');
    const frameNumber = createNewElement('button', 'frame-number');
    const deleteButton = createNewElement('button', 'delete-btn');
    deleteButton.setAttribute('title', 'Delete this frame (D)');
    const duplicateButton = createNewElement('button', 'duplicate-btn');
    duplicateButton.setAttribute('title', 'Duplicate this frame (C)');
    const deleteIcon = createNewElement('i', 'fas', 'fa-trash-alt');
    const duplicateIcon = createNewElement('i', 'fas', 'fa-copy');

    appendChildren(deleteButton, deleteIcon);
    appendChildren(duplicateButton, duplicateIcon);
    appendChildren(frameItemContainer, frameItem, frameNumber, deleteButton, duplicateButton);
    appendChildren(this.framesContainer, frameItemContainer);
    this.toggleDeleteButton();
  }

  drawImageOnFrames() {
    if (this.storage.state.frameItems.length) {
      const frameItems = document.querySelectorAll('.frame-item');
      frameItems.forEach((item, index) => {
        if (frameItems[index]) {
          drawImage(this.storage.state.frameItems[index], item.getContext('2d'));
        }
      });
    }
  }

  addButtonListener() {
    const addFrameButton = document.querySelector('.add-btn');
    addFrameButton.addEventListener('click', this.addNewFrame.bind(this));
  }

  addNewFrame() {
    this.renderFrame();
    this.addClassActiveToLastFrame();
    this.storage.clearCanvas();
    this.storage.setCanvasImage();
    this.updateImageOnFrame();
    this.startFrameAnimation();
  }

  renderFrame() {
    this.createFrame();
    this.setFramesSize();
    this.setFramesPagination();
  }

  setFramesSize() {
    this.frameItems = document.querySelectorAll('.frame-item');
    this.frameItems.forEach((item) => {
      removeClasses(item, 'frame-scale1', 'frame-scale2', 'frame-scale3');
      changeCanvasSize(item, this.storage.state.canvasSizeIndex, FRAME_SCALE_CLASSES);
    });
  }

  setFramesPagination() {
    this.removeFramesPagination();
    this.addFramesPagination();
  }

  removeFramesPagination() {
    this.frameNumbers.forEach((item) => {
      if (item.childNodes[0]) {
        removeChildNode(item);
      }
    });
  }

  addFramesPagination() {
    this.frameNumbers = document.querySelectorAll('.frame-number');
    this.frameNumbers.forEach((item, index) => {
      addTextNode(item, `${index + 1}`);
    });
  }

  addClassActiveToFirstFrame() {
    this.frameItemContainers = document.querySelectorAll('.frame-item-container');
    addClass('active', this.frameItemContainers[0]);
    this.updateImageOnCanvasFromActiveFrame();
  }

  addClassActiveToLastFrame() {
    this.removeClassActive();
    this.frameItemContainers = document.querySelectorAll('.frame-item-container');
    addClass('active', this.frameItemContainers[this.frameItemContainers.length - 1]);
    this.updateImageOnCanvasFromActiveFrame();
  }

  addClassActiveToTargetFrame(target) {
    this.removeClassActive();
    addClass('active', target.parentNode);
  }

  addClassActiveToDuplicateFrame(frameIndex) {
    this.frameItemContainers = document.querySelectorAll('.frame-item-container');
    this.removeClassActive();
    addClass('active', this.frameItemContainers[frameIndex + 1]);
  }

  removeClassActive() {
    removeClass('active', ...Array.from(this.frameItemContainers));
  }

  addFramesListener() {
    this.framesContainer.addEventListener('click', (event) => this.framesHandler(event));
  }

  framesHandler({ target }) {
    if (target.classList.contains('frame-item') || target.classList.contains('frame-number')) {
      this.addClassActiveToTargetFrame(target);
      this.updateImageOnCanvasFromActiveFrame();
    }

    if (target.classList.contains('delete-btn') || target.classList.contains('fa-trash-alt')) {
      this.deleteTargetFrame(target);
    }

    if (target.classList.contains('duplicate-btn') || target.classList.contains('fa-copy')) {
      this.duplicateTargetFrame(target);
    }
  }

  deleteTargetFrame(target) {
    this.getTargetFrameIndex(target);
    this.removeFrameDataFromState(this.targetFrameIndex);
    this.frameItemContainers = document.querySelectorAll('.frame-item-container');
    this.targetFrame = this.frameItemContainers[this.targetFrameIndex];
    if (this.targetFrame.classList.contains('active')) {
      this.targetFrame.remove();
      this.changeActiveFrame(this.targetFrameIndex);
    } else {
      this.targetFrame.remove();
    }
    this.toggleDeleteButton();
    this.setFramesPagination();
  }

  deleteActiveFrame() {
    if (this.storage.state.frameItems.length === 1) {
      return;
    }
    this.getActiveFrameIndex();
    this.removeFrameDataFromState(this.storage.state.activeFrameIndex);
    this.frameItemContainers = document.querySelectorAll('.frame-item-container');
    this.activeFrame = this.frameItemContainers[this.storage.state.activeFrameIndex];
    this.activeFrame.remove();
    this.changeActiveFrame(this.storage.state.activeFrameIndex);
    this.toggleDeleteButton();
    this.setFramesPagination();
  }

  duplicateTargetFrame(target) {
    this.getTargetFrameIndex(target);
    this.updateFrameDataInState(this.targetFrameIndex);
    this.renderFrame();
    this.addClassActiveToDuplicateFrame(this.targetFrameIndex);
    this.drawImageOnFrames();
    this.updateImageOnCanvasFromActiveFrame();
    this.startFrameAnimation();
  }

  duplicateActiveFrame() {
    this.getActiveFrameIndex();
    this.updateFrameDataInState(this.storage.state.activeFrameIndex);
    this.renderFrame();
    this.addClassActiveToDuplicateFrame(this.storage.state.activeFrameIndex);
    this.drawImageOnFrames();
    this.updateImageOnCanvasFromActiveFrame();
    this.startFrameAnimation();
  }

  getTargetFrameIndex(target) {
    if (target.classList.contains('delete-btn')) {
      this.targetFrameIndex = target.previousElementSibling.innerHTML - 1;
    }
    if (target.classList.contains('fa-trash-alt')) {
      this.targetFrameIndex = target.parentNode.previousElementSibling.innerHTML - 1;
    }

    if (target.classList.contains('duplicate-btn')) {
      this.targetFrameIndex = target.previousElementSibling.previousElementSibling.innerHTML - 1;
    }
    if (target.classList.contains('fa-copy')) {
      const index = target.parentNode.previousElementSibling.previousElementSibling.innerHTML - 1;
      this.targetFrameIndex = index;
    }
  }

  updateFrameDataInState(frameIndex) {
    insertArrayElem(this.storage.state.frameItems, frameIndex);
  }

  removeFrameDataFromState(frameIndex) {
    removeArrayElem(this.storage.state.frameItems, frameIndex);
  }

  changeActiveFrame(frameIndex) {
    const frameItemContainers = document.querySelectorAll('.frame-item-container');
    const newActiveFrameIndex = frameIndex - 1;
    if (newActiveFrameIndex > 0) {
      addClass('active', frameItemContainers[newActiveFrameIndex]);
    } else {
      this.addClassActiveToFirstFrame();
    }
    this.updateImageOnCanvasFromActiveFrame();
  }

  toggleDeleteButton() {
    const frameItemContainers = document.querySelectorAll('.frame-item-container');
    if (frameItemContainers.length === 1) {
      this.deleteButton = document.querySelector('.delete-btn');
      addClass('hidden', this.deleteButton);
    } else {
      removeClass('hidden', this.deleteButton);
    }
  }

  getActiveFrameIndex() {
    const frameItemContainers = document.querySelectorAll('.frame-item-container');
    frameItemContainers.forEach((item, index) => {
      if (item.classList.contains('active')) {
        this.storage.state.activeFrameIndex = index;
      }
    });
  }

  updateImageOnFrame() {
    this.getActiveFrameIndex();
    const index = this.storage.state.activeFrameIndex;
    this.storage.state.frameItems[index] = this.storage.state.canvasImage;
    this.drawImageOnFrames();
  }

  updateImageOnCanvasFromActiveFrame() {
    this.getActiveFrameIndex();
    this.frameActiveData = this.storage.state.frameItems[this.storage.state.activeFrameIndex];
    if (this.frameActiveData) {
      this.storage.clearCanvas();
      this.storage.state.canvasImage = this.frameActiveData;
      drawImage(this.storage.state.canvasImage, this.ctx);
    } else {
      const index = this.storage.state.activeFrameIndex;
      this.storage.state.frameItems[index] = this.canvasElem.toDataURL();
    }
  }

  startFrameAnimation() {
    const frameItem = document.querySelectorAll('.frame-item');
    if (frameItem.length === 2) {
      this.preview.animateFrames();
    }
  }

  setFramesImages() {
    const frameItems = document.querySelectorAll('.frame-item');
    frameItems.forEach((item, index) => {
      this.storage.state.frameItems[index] = item.toDataURL();
    });
  }
}
