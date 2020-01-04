import {
  matchStartColor,
  hexToRgb,
  colorPixel,
  getPixelPos,
} from '../../helper';

export default class Bucket {
  constructor(storage, canvasElem) {
    this.storage = storage;
    this.canvasElem = canvasElem;
    this.ctx = this.canvasElem.getContext('2d');
    this.reachLeft = false;
    this.reachRight = false;
  }

  init() {
    this.bucketTool();
  }

  bucketTool() {
    this.canvasElem.addEventListener('click', (event) => {
      const startX = event.offsetX;
      const startY = event.offsetY;
      // console.log(paintX);
      // console.log(paintY);
      // const imgData = this.ctx.getImageData(0, 0, 32, 32).data;
      // console.log(imgData);
      // console.log(this.ctx);
      const color = hexToRgb(this.storage.state.color.primaryColor);
      console.log(color);
      this.floodFill(startX, startY, color);
      // this.floodFill(this.ctx, paintX, paintY, color);
      // sameColorPixels(paintX, paintY, color, imgData, this.canvasElem);
    });
  }

  floodFill(startX, startY, fillColor) {
    const dstImg = this.ctx.getImageData(0, 0, this.canvasElem.width, this.canvasElem.height);
    const dstData = dstImg.data;
    console.log(dstData);

    const startPos = getPixelPos(startX, startY, this.canvasElem);
    const startColor = {
      r: dstData[startPos],
      g: dstData[startPos + 1],
      b: dstData[startPos + 2],
    };
    const todo = [[startX, startY]];

    while (todo.length) {
      const pos = todo.pop();
      const x = pos[0];
      let y = pos[1];
      let currentPos = getPixelPos(x, y, this.canvasElem);

      while ((y-- >= 0) && matchStartColor(dstData, currentPos, startColor)) {
        currentPos -= this.canvasElem.width * 4;
      }

      currentPos += this.canvasElem.width * 4;
      y += 1;

      while ((y++ < this.canvasElem.height - 1) && matchStartColor(dstData, currentPos, startColor)) {
        colorPixel(dstData, currentPos, fillColor);

        if (x > 0) {
          if (matchStartColor(dstData, currentPos - 4, startColor)) {
            if (!this.reachLeft) {
              todo.push([x - 1, y]);
              this.reachLeft = true;
            }
          } else if (this.reachLeft) {
            this.reachLeft = false;
          }
        }

        if (x < this.canvasElem.width - 1) {
          if (matchStartColor(dstData, currentPos + 4, startColor)) {
            if (!this.reachRight) {
              todo.push([x + 1, y]);
              this.reachRight = true;
            }
          } else if (this.reachRight) {
            this.reachRight = false;
          }
        }

        currentPos += this.canvasElem.width * 4;
      }
    }

    this.ctx.putImageData(dstImg, 0, 0);
  }


  // const paintBucketToolEvent = (context, mainColor) => (e) => {
  //   context.switchLayers(e);
  //   const { x, y } = getElemCoords(context.canv, e);
  //   const imgData = context.ctx.getImageData(0, 0, context.canv.width, context.canv.height);

  //   const color = mainColor || ((e.which === 3) ? context.secondColor : context.color);

  //   colorSamePixels(x, y, color, imgData, context.canv);
  // };

  // this.canvasElem.addEventListener('click', (event) => {
  //   this.coordX = event.offsetX;
  //   this.coordY = event.offsetY;
  //   const colorForPaintArr = this.ctx.getImageData(this.coordX, this.coordY, 1, 1).data;
  //   this.colorForPaint = `rgba(${colorForPaintArr[0]},${colorForPaintArr[1]},${colorForPaintArr[2]},1)`;
  //   this.ctx.fillStyle = this.storage.state.color.primaryColor;
  //   if (this.colorForPaint === this.storage.state.color.primaryColor) {
  //     return;
  //   }
  //   this.fill(this.coordX, this.coordY);
  // });

  // floodFill(ctx, x, y, fillColor) {
  //   const imageData = this.ctx.getImageData(0, 0, this.canvasElem.width, this.canvasElem.height);
  //   const pixelData = {
  //     width: imageData.width,
  //     height: imageData.height,
  //     data: new Uint32Array(imageData.data.buffer),
  //   };
  //   const targetColor = getPixel(pixelData, x, y);

  //   if (targetColor !== fillColor) {
  //     const pixelsToCheck = [x, y];
  //     while (pixelsToCheck.length > 0) {
  //       const y = pixelsToCheck.pop();
  //       const x = pixelsToCheck.pop();

  //       const currentColor = getPixel(pixelData, x, y);
  //       if (currentColor === targetColor) {
  //         pixelData.data[y * pixelData.width + x] = fillColor;
  //         pixelsToCheck.push(x + 1, y);
  //         pixelsToCheck.push(x - 1, y);
  //         pixelsToCheck.push(x, y + 1);
  //         pixelsToCheck.push(x, y - 1);
  //       }
  //     }
  //     ctx.putImageData(imageData, 0, 0);
  //   }
  // }

  // fill(x, y) {
  //   const newColorForPaintArr = this.ctx.getImageData(x, y, 1, 1).data;
  //   const newColorForPaint = `rgba(${newColorForPaintArr[0]},${newColorForPaintArr[1]},${newColorForPaintArr[2]},1)`;
  //   if (this.colorForPaint !== newColorForPaint) {
  //     return;
  //   }

  //   this.ctx.fillRect(x, y, 1, 1);

  //   if (x > 0) {
  //     this.fill(x - 1, y);
  //   }

  //   if (y > 0) {
  //     this.fill(x, y - 1);
  //   }

  //   if (x < 32) {
  //     this.fill(x + +1, y);
  //   }

  //   if (y < 32) {
  //     this.fill(x, y + +1);
  //   }
  // }
}
