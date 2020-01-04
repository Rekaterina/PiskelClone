import {
  CANVAS_SIZE,
  CANVAS_SCALE_CLASSES,
} from './constants';

const toggleClass = (classItem, ...elements) => {
  elements.forEach((item) => {
    item.classList.toggle(classItem);
  });
};

const addClass = (classItem, ...elements) => {
  elements.forEach((item) => {
    item.classList.add(classItem);
  });
};

const removeClass = (classItem, ...elements) => {
  elements.forEach((item) => {
    item.classList.remove(classItem);
  });
};

const removeClasses = (element, ...classes) => {
  classes.forEach((item) => {
    element.classList.remove(item);
  });
};

const getTrueIndex = (object) => Object.values(object).indexOf(true);

const setAllFlagFalse = (object) => {
  Object.keys(object).forEach((item) => {
    Object.defineProperty(object, `${item}`, {
      value: false,
    });
  });
};

const setOneFlagTrue = (object, key) => {
  Object.defineProperty(object, key, {
    value: true,
  });
};

const getLocalStorageState = (arr, object) => {
  arr.forEach((item) => {
    const obj = object;
    obj[item] = JSON.parse((localStorage.getItem(`${item}`)));
  });
};

const setLocalStorageState = (arr, object) => {
  arr.forEach((item) => {
    localStorage.setItem(`${item}`, object[item]);
  });
};

const changeCanvasSize = (element, index) => {
  const elem = element;
  elem.width = CANVAS_SIZE[Object.keys(CANVAS_SIZE)[index]];
  elem.height = CANVAS_SIZE[Object.keys(CANVAS_SIZE)[index]];
  addClass(CANVAS_SCALE_CLASSES[index], elem);
};

const fill = (elem, startX, startY, size) => elem.getContext('2d').fillRect(startX, startY, size, size);

const line = (event, startX, startY, func) => {
  const currentX = event.offsetX;
  const currentY = event.offsetY;
  const deltaX = Math.abs(currentX - startX);
  const deltaY = Math.abs(currentY - startY);
  const dirX = startX < currentX ? 1 : -1;
  const dirY = startY < currentY ? 1 : -1;
  let error = deltaX - deltaY;
  while (!(startX === currentX && startY === currentY)) {
    const e2 = error;
    if (e2 > -deltaY) {
      error -= deltaY;
      startX += dirX;
    }

    if (e2 < deltaX) {
      error += deltaX;
      startY += dirY;
    }
    func();
  }
};

const hexToRgb = (hex) => {
  const arr = hex.slice(1).match(/.{2}/g);

  const r = parseInt(arr[0], 16);
  const g = parseInt(arr[1], 16);
  const b = parseInt(arr[2], 16);
  return `rgb(${r}, ${g}, ${b})`;
};

const matchStartColor = (data, pos, startColor) => (data[pos] === startColor.r
    && data[pos + 1] === startColor.g
    && data[pos + 2] === startColor.b);

const colorPixel = (data, pos, color) => {
  const arrOfRgb = color.replace(/[^\d,]/g, '').split(',');
  const colorData = data;
  colorData[pos] = +arrOfRgb[0];
  colorData[pos + 1] = +arrOfRgb[1];
  colorData[pos + 2] = +arrOfRgb[2];
};

const getPixelPos = (x, y, elem) => (y * elem.width + x) * 4;

// const sameColorPixels = (paintX, paintY, color, imgData, canvas) => {
//   const { data } = imgData;
//   console.log(data);
//   let rgb = hexToRgb(color);
//   console.log(rgb);
//   rgb = rgb.replace(/[^\d,]/g, '').split(',');

//   const n = (paintY * canvas.width + paintX) * 4;
//   const currentData = [];

//   let isCurrentColor = true;

//   for (let k = 0; k < 4; k += 1) {
//     currentData.push(data[n + k]);

//     if (data[n + k] !== +rgb[k]) {
//       isCurrentColor = false;
//     }
//   }

//   if (isCurrentColor) {
//     return;
//   }
// };

// const getPixel = (pixelData, x, y) => {
//   if (x < 0 || y < 0 || x >= pixelData.width || y >= pixelData.height) {
//     return -1;
//   }
//   return pixelData.data[y * pixelData.width + x];
// };


export {
  toggleClass,
  getTrueIndex,
  addClass,
  removeClass,
  removeClasses,
  setAllFlagFalse,
  setOneFlagTrue,
  getLocalStorageState,
  setLocalStorageState,
  changeCanvasSize,
  colorPixel,
  line,
  fill,
  hexToRgb,
  matchStartColor,
  getPixelPos,
};
