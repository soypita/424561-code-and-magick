'use strict';

var createComplexRect = function (ctx, initialX, initialY, color) {
  var rectWidth = 420;
  var rectHeight = 270;
  var rectShift = 10;
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(initialX, initialY);
  ctx.lineTo(initialX + rectWidth / 2, initialY + rectShift);
  ctx.lineTo(initialX + rectWidth, initialY);
  ctx.lineTo(initialX + rectWidth - rectShift, initialY + rectHeight / 2);
  ctx.lineTo(initialX + rectWidth, initialY + rectHeight);
  ctx.lineTo(initialX + rectWidth / 2, initialY + rectHeight - rectShift);
  ctx.lineTo(initialX, initialY + rectHeight);
  ctx.lineTo(initialX + rectShift, initialY + rectHeight / 2);
  ctx.lineTo(initialX, initialY);
  ctx.closePath();
  ctx.stroke();
  ctx.fill();
};
var findMaxValue = function (arr) {
  var max = -1;
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
  }
  return max;
};

var getRandomBlueColor = function () {
  return 'rgba(0, 0, 255, ' + (Math.random() * 0.9 + 0.1) + ')';
};

var getUserColor = function (name) {
  var PLAYER_NAME = 'Вы';
  var PLAYER_COLOR = 'rgba(255, 0, 0, 1)';
  return name === PLAYER_NAME ? PLAYER_COLOR : getRandomBlueColor();
};

var drawColorText = function (ctx, value, initialX, initialY, color) {
  ctx.fillStyle = color;
  ctx.fillText(value, initialX, initialY);
};

var getXshift = function (initialX, width, indent, currentNumber) {
  return initialX + (width + indent) * currentNumber;
};

var getYshift = function (initialY, height, shift) {
  return initialY + height + shift;
};

var drawHistogramBar = function (ctx, xPosition, yPosition, width, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(xPosition, yPosition, width, height);
};

window.renderStatistics = function (ctx, names, times) {
  createComplexRect(ctx, 110, 20, 'rgba(0, 0, 0, 0.7)');
  createComplexRect(ctx, 100, 10, 'white');
  ctx.font = '16px PT Mono';
  drawColorText(ctx, 'Ура вы победили!', 120, 40, '#000');
  drawColorText(ctx, 'Список результатов:', 120, 55, '#000');

  var histogramHeight = 150;
  var worstResult = findMaxValue(times);
  var step = histogramHeight / worstResult;
  var barWidth = 40;
  var indent = 50;
  var initialX = 155;
  var initialY = 80;
  var lineHeight = 15;
  var nameShift = getYshift(initialY, histogramHeight, 2 * lineHeight);

  for (var i = 0; i < names.length; i++) {
    var result = times[i].toFixed();
    var barHeight = times[i] * step;
    var x = getXshift(initialX, barWidth, indent, i);
    var y = getYshift(initialY, histogramHeight, -barHeight);
    drawColorText(ctx, result, x, y, '#000');
    drawHistogramBar(ctx, x, lineHeight + y, barWidth, barHeight, getUserColor(names[i]));
    drawColorText(ctx, names[i], x, nameShift, '#000');
  }
};
