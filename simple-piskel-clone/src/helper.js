import {
  CANVAS_SIZE,
  VALUE_OF_ALPHA,
  STEP_OF_RGB_COLOR,
} from './constants';

const createNewElement = (element, ...classes) => {
  const newElement = document.createElement(element);
  classes.forEach((item) => {
    newElement.classList.add(item);
  });
  return newElement;
};

const appendChildren = (parent, ...children) => {
  children.forEach((item) => {
    parent.appendChild(item);
  });
};

const addTextNode = (element, text) => element.appendChild(document.createTextNode(text));

const removeChildNode = (...elements) => {
  elements.forEach((item) => {
    item.removeChild(item.childNodes[0]);
  });
};

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

const getLocalStorageFrameState = (storageArray, stateArray) => {
  const arr = stateArray;
  storageArray.map((item, index) => {
    if (localStorage.getItem(`${item}`) !== 'undefined') {
      arr[index] = localStorage.getItem(`${item}`);
    }
    return stateArray;
  });
};

const setLocalStorageFrameState = (storageArray, stateArray) => {
  storageArray.forEach((item, index) => {
    localStorage.setItem(`${item}`, stateArray[index]);
  });
};

const changeCanvasSize = (element, index, classes) => {
  const elem = element;
  elem.width = CANVAS_SIZE[Object.keys(CANVAS_SIZE)[index]];
  elem.height = CANVAS_SIZE[Object.keys(CANVAS_SIZE)[index]];
  addClass(classes[index], elem);
};

const extractRgbColor = (dataArr) => `rgb(${dataArr[0]}, ${dataArr[1]}, ${dataArr[2]})`;

const rgbToHexColor = (rgb) => {
  const arrOfValue = rgb.replace(/[^\d,]/g, '').split(',');
  const r = (+arrOfValue[0]).toString(16);
  const g = (+arrOfValue[1]).toString(16);
  const b = (+arrOfValue[2]).toString(16);
  return `#${
    (r.length === 1 ? `0${r}` : r)
        + (g.length === 1 ? `0${g}` : g)
        + (b.length === 1 ? `0${b}` : b)}`;
};

const hexToRgbColorValueArray = (hex) => {
  const arrOfHexValue = hex.slice(1).match(/.{2}/g);
  const arrOfRgbValue = [];

  arrOfRgbValue[0] = parseInt(arrOfHexValue[0], 16);
  arrOfRgbValue[1] = parseInt(arrOfHexValue[1], 16);
  arrOfRgbValue[2] = parseInt(arrOfHexValue[2], 16);
  return arrOfRgbValue;
};

const replaceColor = (targetColor, paintColor, dataColor) => {
  const data = dataColor;
  for (let i = 0; i < dataColor.length; i += STEP_OF_RGB_COLOR) {
    if (dataColor[i] === targetColor[0]
      && dataColor[i + 1] === targetColor[1]
      && dataColor[i + 2] === targetColor[2]
      && dataColor[i + 3] === targetColor[3]) {
    /* eslint-disable*/
      data[i] = paintColor[0];
      data[i + 1] = paintColor[1];
      data[i + 2] = paintColor[2];
      data[i + 3] = VALUE_OF_ALPHA;
      /* eslint-enable */
    }
  }
  return dataColor;
};

const compareColors = (data, index, color) => {
  if (data[index + 0] === color[0]
    && data[index + 1] === color[1]
    && data[index + 2] === color[2]) {
    return true;
  }
  return false;
};

const changeColorData = (colorData, index, color) => {
  const data = colorData;
  /* eslint-disable*/
  data[index] = color[0];
  data[index + 1] = color[1];
  data[index + 2] = color[2];
  data[index + 3] = VALUE_OF_ALPHA;
   /* eslint-enable */
};

const drawImage = (url, context) => {
  const img = new Image();
  img.src = url;
  img.addEventListener('load', () => {
    context.drawImage(img, 0, 0);
  });
};

const removeArrayElem = (arr, index) => {
  arr.splice(index, 1);
  return arr;
};

const insertArrayElem = (arr, index) => {
  arr.splice(index, 0, arr[index - 1]);
  return arr;
};

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
  rgbToHexColor,
  extractRgbColor,
  hexToRgbColorValueArray,
  replaceColor,
  compareColors,
  changeColorData,
  drawImage,
  getLocalStorageFrameState,
  setLocalStorageFrameState,
  createNewElement,
  appendChildren,
  addTextNode,
  removeChildNode,
  removeArrayElem,
  insertArrayElem,
};
