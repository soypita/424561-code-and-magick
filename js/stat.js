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

window.renderStatistics = function (ctx, names, times) {
  createComplexRect(ctx, 110, 20, 'rgba(0, 0, 0, 0.7)');
  createComplexRect(ctx, 100, 10, 'white');
  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', 120, 40);
  ctx.fillText('Список результатов:', 120, 55);

  var worstResult = findMaxValue(times);
  var histogramHeight = 150;
  var step = histogramHeight / worstResult;
  var barWidth = 40;
  var indent = 50;
  var initialX = 155;
  var initialY = 80;
  var lineHeight = 15;

  for (var i = 0; i < names.length; i++) {
    ctx.fillStyle = '#000';
    var result = times[i].toFixed().toString();
    ctx.fillText(result, initialX + (barWidth + indent) * i, initialY + histogramHeight - times[i] * step);

    ctx.fillStyle = (names[i] === 'Вы' ? 'rgba(255, 0, 0, 1)' : 'rgba(0, 0, 255, ' + (Math.random() * 0.9 + 0.1) + ')');
    ctx.fillRect(initialX + (barWidth + indent) * i, initialY + (lineHeight + histogramHeight - times[i] * step), barWidth, times[i] * step);

    ctx.fillStyle = '#000';
    ctx.fillText(names[i], initialX + (barWidth + indent) * i, initialY + (histogramHeight + 2 * lineHeight));
  }
};
