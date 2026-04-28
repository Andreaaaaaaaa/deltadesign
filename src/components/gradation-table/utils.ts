const colorRgb = (startColor: string): number[] | string => {
  const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  let sColor = startColor.toLowerCase();
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      let sColorNew = '#';
      for (let i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
      }
      sColor = sColorNew;
    }
    // 处理六位的颜色值
    const sColorChange = [];
    for (let i = 1; i < 7; i += 2) {
      sColorChange.push(parseInt(`0x${sColor.slice(i, i + 2)}`));
    }
    return sColorChange;
  }
  return sColor;
};
// 将rgb表示方式转换为hex表示方式
const colorHex = (rgb) => {
  const rgbHex = rgb;
  const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  if (/^(rgb|RGB)/.test(rgbHex)) {
    const aColor = rgbHex.replace(/(?:(|)|rgb|RGB)*/g, '').split(',');
    let strHex = '#';
    for (let i = 0; i < aColor.length; i++) {
      let hex = Number(aColor[i]).toString(16);
      hex = hex < 10 ? 0 + '' + hex : hex; // 保证每个rgb的值为2位
      if (hex === '0') {
        hex += hex;
      }
      strHex += hex;
    }
    if (strHex.length !== 7) {
      strHex = rgbHex;
    }
    return strHex;
  }
  if (reg.test(rgbHex)) {
    let aNum = rgbHex.replace(/#/, '').split('');
    if (aNum.length === 6) {
      return rgbHex;
    }
    let numHex = '#';
    for (let i = 0; i < aNum.length; i += 1) {
      numHex += aNum[i] + aNum[i];
    }
    return numHex;
  }
  return rgbHex;
};

// 返回value对应的hex值
// value 0 ~ 100;
export const gradientColor = (value: number, baseValue: number, leftColor: string, rightColor: string): string => {
  let colorValue = 0;
  const startColor = '#ffffff';
  let endColor = '';
  if (value < baseValue) {
    colorValue = 100 - (value / baseValue) * 100;
    endColor = leftColor;
  } else {
    colorValue = ((value - baseValue) / baseValue) * 100;
    endColor = rightColor;
  }

  if (colorValue > 100) {
    colorValue = 100;
  }

  const startRGB = colorRgb(startColor); // 转换为rgb数组模式
  const startR = Number(startRGB[0]);
  const startG = Number(startRGB[1]);
  const startB = Number(startRGB[2]);
  const endRGB = colorRgb(endColor);
  const endR = Number(endRGB[0]);
  const endG = Number(endRGB[1]);
  const endB = Number(endRGB[2]);
  const sR = (endR - startR) / 100; // 总差值
  const sG = (endG - startG) / 100;
  const sB = (endB - startB) / 100;
  // 计算hex值
  const hex = colorHex(
    'rgb(' +
      parseInt(sR * colorValue + startR) +
      ',' +
      parseInt(sG * colorValue + startG) +
      ',' +
      parseInt(sB * colorValue + startB) +
      ')',
  );
  return hex;
};
