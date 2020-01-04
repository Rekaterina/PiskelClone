export default class Stroke {
  constructor(storage, canvasElem) {
    this.storage = storage;
    this.canvasElem = canvasElem;
    this.ctx = this.canvasElem.getContext('2d');
    this.mousedown = false;
    this.lastMouseX = 0;
    this.lastMouseY = 0;
    this.mouseX = 0;
    this.mouseY = 0;
  }

  init() {
    this.strokeTool();
  }

  strokeTool() {


    this.canvasElem.addEventListener('mousedown', (e) => {
      this.storage.setCanvasImageState();
      this.mousedown = true;
      this.startX = e.offsetX;
      this.startY = e.offsetY;
    });

    this.canvasElem.addEventListener('mouseup', (e) => {
      this.mousedown = false;
    });

    this.canvasElem.addEventListener('mousemove', (e) => {
      this.endX = e.offsetX;
      this.endY = e.offsetY;
      if (this.mousedown) {
        this.ctx.clearRect(0, 0, 64, 64);
        //this.storage.getCanvasImageState();
        this.ctx.beginPath();
        this.ctx.moveTo(this.startX, this.startY);
        this.ctx.lineTo(this.endX, this.endY);
        this.ctx.strokeStyle = this.storage.state.color.primaryColor;
        this.ctx.closePath();
        this.storage.getCanvasImageState();
        this.ctx.stroke();
      }
    });
    // const canvasX = this.canvasElem.offsetLeft;
    // console.log(canvasX);
    // const canvasY = this.canvasElem.offsetTop;
    // console.log(canvasY);

    // this.canvasElem.addEventListener('mousedown', (e) => {
    //   this.mousedown = true;
    //   this.lastMouseX = e.clientX - canvasX;
    //   this.lastMouseY = e.clientY - canvasY;
    // });

    // this.canvasElem.addEventListener('mouseup', () => {
    //   this.mousedown = false;
    // });

    // this.canvasElem.addEventListener('mousemove', (e) => {
    //   this.mouseX = e.clientX - canvasX;
    //   this.mouseY = e.clientY - canvasY;
    //   if (this.mousedown) {
    //     this.ctx.beginPath();
    //     this.ctx.moveTo(this.lastMouseX, this.lastMouseY);
    //     this.ctx.lineTo(this.mouseX, this.mouseY);
    //     this.ctx.strokeStyle = 'white';
    //     this.ctx.stroke();
    //   }
    // });
  }
}
