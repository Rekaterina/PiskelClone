import LandingPage from './landing-page/Landing-page';
import Storage from './storage/Storage';
import Frames from './frames/Frames';
import Preview from './preview/Preview';
import Tools from './tools/Tools';
import './main.css';

export default class App {
  constructor() {
    this.canvasElem = document.querySelector('.canvas');
    this.storage = new Storage(this.canvasElem);
    this.preview = new Preview(this.storage);
    this.frames = new Frames(this.storage, this.canvasElem, this.preview);
    this.landingPage = new LandingPage(this.storage);
    this.tools = new Tools(this.storage, this.canvasElem, this.frames, this.preview);
  }

  init() {
    // localStorage.clear();
    this.storage.getState();
    this.setStateBeforeunload();
    this.frames.init();
    this.preview.init();
    this.landingPage.init();
    this.tools.init();
  }

  setStateBeforeunload() {
    window.addEventListener('beforeunload', () => {
      this.storage.setState();
    });
  }
}
