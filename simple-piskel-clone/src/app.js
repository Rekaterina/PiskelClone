import LandingPage from './landing-page/Landing-page';
import Storage from './storage/Storage';
import Tools from './tools/Tools';
import './main.css';

export default class App {
  constructor() {
    this.canvasElem = document.querySelector('.canvas');
    this.storage = new Storage(this.canvasElem);
    this.landingPage = new LandingPage(this.storage);
    this.tools = new Tools(this.storage, this.canvasElem);
  }

  init() {
    // localStorage.clear();
    this.storage.getState();
    this.setState();
    this.landingPage.init();
    this.tools.init();
  }

  setState() {
    window.addEventListener('beforeunload', () => {
      this.storage.setState();
    });
  }
}
