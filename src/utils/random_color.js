var us = require('underscore');

export default function randomColor(red=29, green=156, blue=73, difference = 10) {
  red = red + us.random(-difference, difference)
  green = green + us.random(-difference, difference)
  blue = blue + us.random(-difference, difference)
  return 'rgb(' + red + ',' + green + ',' + blue + ')';
};
