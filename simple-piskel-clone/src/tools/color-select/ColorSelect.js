export default class ColorSelect {
  constructor(storage) {
    this.storage = storage;
    this.primaryColor = document.querySelector('.primary-color');
    this.secondaryColor = document.querySelector('.secondary-color');
    this.colorSwapElem = document.querySelector('.color-swap');
  }

  init() {
    this.setColorValue();
    this.choosePrimaryColor();
    this.chooseSecondaryColor();
    this.colorSwap();
  }

  setColorValue() {
    this.primaryColor.value = this.storage.state.color.primaryColor;
    this.secondaryColor.value = this.storage.state.color.secondaryColor;
  }

  choosePrimaryColor() {
    this.primaryColor.addEventListener('input', ({ target }) => {
      this.storage.state.color.primaryColor = (target.value);
    });
  }

  chooseSecondaryColor() {
    this.secondaryColor.addEventListener('input', ({ target }) => {
      this.storage.state.color.secondaryColor = (target.value);
    });
  }

  colorSwap() {
    this.colorSwapElem.addEventListener('click', () => {
      const tempColor = this.storage.state.color.primaryColor;
      this.storage.state.color.primaryColor = this.storage.state.color.secondaryColor;
      this.storage.state.color.secondaryColor = tempColor;
      this.setColorValue();
    });
  }
}
