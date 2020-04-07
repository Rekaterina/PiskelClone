import {
  extractRgbColor,
  rgbToHexColor,
  hexToRgbColorValueArray,
  insertArrayElem,
  removeArrayElem,
} from './helper';

describe('helper.extractRgbColor', () => {
  test('extract RGB Color from canvas data pixel', () => {
    expect(extractRgbColor([255, 255, 255, 255])).toBe('rgb(255, 255, 255)');
    expect(extractRgbColor([102, 200, 255, 255])).toBe('rgb(102, 200, 255)');
    expect(extractRgbColor([80, 30, 39, 255])).toBe('rgb(80, 30, 39)');
    expect(extractRgbColor([25, 5, 15, 255])).toBe('rgb(25, 5, 15)');
    expect(extractRgbColor([55, 155, 75, 255])).toBe('rgb(55, 155, 75)');
  });
});

describe('helper.rgbToHexColor', () => {
  test('convert RGB color to hex color', () => {
    expect(rgbToHexColor('rgb(255, 255, 255)')).toBe('#ffffff');
    expect(rgbToHexColor('rgb(102, 200, 255)')).toBe('#66c8ff');
    expect(rgbToHexColor('rgb(80, 30, 39)')).toBe('#501e27');
    expect(rgbToHexColor('rgb(25, 5, 15)')).toBe('#19050f');
    expect(rgbToHexColor('rgb(55, 155, 75)')).toBe('#379b4b');
  });
});

describe('helper.hexToRgbColorValueArray', () => {
  test('get array of RGB color values from hex color', () => {
    expect(hexToRgbColorValueArray('#ffffff')).toStrictEqual([255, 255, 255]);
    expect(hexToRgbColorValueArray('#66c8ff')).toStrictEqual([102, 200, 255]);
    expect(hexToRgbColorValueArray('#501e27')).toStrictEqual([80, 30, 39]);
    expect(hexToRgbColorValueArray('#19050f')).toStrictEqual([25, 5, 15]);
    expect(hexToRgbColorValueArray('#379b4b')).toStrictEqual([55, 155, 75]);
  });
});

describe('helper.insertArrayElem', () => {
  test('insert an array element into the same array', () => {
    expect(insertArrayElem([1, 2, 3], 2)).toStrictEqual([1, 2, 3, 3]);
    expect(insertArrayElem([1, 20, 3, 7], 0)).toStrictEqual([1, 1, 20, 3, 7]);
  });
});

describe('helper.removeArrayElem ', () => {
  test('remove an array element', () => {
    expect(removeArrayElem([1, 2, 3], 2)).toStrictEqual([1, 2]);
    expect(removeArrayElem([1, 20, 3, 7], 1)).toStrictEqual([1, 3, 7]);
  });
});
