import './landingPage.css';
import {
  toggleClass,
} from '../helper';

export default class LandingPage {
  constructor(storage) {
    this.storage = storage;
    this.startButton = document.querySelector('.start-btn');
    this.landingPageElem = document.querySelector('.landing-page');
    this.appPageElem = document.querySelector('.app-page');
    this.backButton = document.querySelector('.back-btn');
  }

  init() {
    this.pageGetState();
    this.eventListener();
  }

  pageGetState() {
    if (this.storage.state.inApp) {
      this.toggleClasses();
    }
  }

  toggleClasses() {
    toggleClass('hidden', this.landingPageElem, this.appPageElem, this.backButton);
  }

  eventListener() {
    this.startButton.addEventListener('click', this.openAppPage.bind(this));
    this.backButton.addEventListener('click', this.openLandingPage.bind(this));
  }

  openAppPage() {
    this.toggleClasses();
    this.storage.state.inApp = true;
  }

  openLandingPage() {
    this.toggleClasses();
    this.storage.state.inApp = false;
  }
}
