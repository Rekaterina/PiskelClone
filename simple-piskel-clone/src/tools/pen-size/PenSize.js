import {
  PEN_SIZE_NAMES,
  PEN_SIZE_CLASSES,
} from '../../constants';

import {
  getTrueIndex,
  removeClass,
  addClass,
  setAllFlagFalse,
  setOneFlagTrue,
} from '../../helper';

export default class PenSize {
  constructor(storage) {
    this.storage = storage;
    this.penSizeItems = document.querySelectorAll('.pen-size-item');
    this.penSizeItem1 = document.querySelector('.pen-size-item1');
    this.penSizeItem2 = document.querySelector('.pen-size-item2');
    this.penSizeItem3 = document.querySelector('.pen-size-item3');
    this.penSizeItem4 = document.querySelector('.pen-size-item4');
    this.arrayPenSizeItem = [this.penSizeItem1,
      this.penSizeItem2, this.penSizeItem3, this.penSizeItem4];
    this.size = 1;
  }

  init() {
    this.penSizeTool();
  }

  penSizeTool() {
    this.addClassActive();
    this.setPenSize();
    this.choosePenSize();
  }

  addClassActive() {
    this.removeClassActive();
    this.penSizeIndex = getTrueIndex(this.storage.state.penSize);
    addClass('active', this.arrayPenSizeItem[this.penSizeIndex]);
  }

  setPenSize() {
    this.size = this.penSizeIndex + 1;
  }

  removeClassActive() {
    removeClass('active', ...Array.from(this.penSizeItems));
  }

  choosePenSize() {
    const penSizeContainer = document.querySelector('.pen-size-container');
    penSizeContainer.addEventListener('click', (e) => {
      this.getPenSizeClassIndex(e);
      this.removeActivePenSize();
      this.addNewActivePenSize();
      this.addClassActive();
      this.setPenSize();
    });
  }

  getPenSizeClassIndex({ target }) {
    target.classList.forEach((item) => {
      if (PEN_SIZE_CLASSES.indexOf(item) !== -1) {
        this.index = PEN_SIZE_CLASSES.indexOf(item);
      } else {
        target.parentNode.classList.forEach((item2) => {
          if (PEN_SIZE_CLASSES.indexOf(item2) !== -1) {
            this.index = PEN_SIZE_CLASSES.indexOf(item2);
          }
        });
      }
    });
  }

  removeActivePenSize() {
    setAllFlagFalse(this.storage.state.penSize);
  }

  addNewActivePenSize() {
    setOneFlagTrue(this.storage.state.penSize, `${PEN_SIZE_NAMES[this.index]}`);
  }
}
