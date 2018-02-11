/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var canvasEl = document.querySelector('.canvas');
var ctx = canvasEl.getContext('2d');

// utils --->
var iterate = function iterate(num, fn) {
  return Array(num).fill().map(function (v, i) {
    return fn(i);
  });
};
// <---

// hash function
var getCeilValue = function getCeilValue(x, y, time) {
  var sectorX = x % 100;
  var sectorY = y % 100;
  var sectorTime = time % 100;
  if (sectorX < sectorTime && sectorY < sectorTime) {
    return 200;
  }
  return 0;
};
// <---

// DRAW WORLD --->
var drawPixel = function drawPixel(x, y, color) {
  ctx.fillStyle = 'rgb(' + color + ', ' + color + ', ' + color + ')';
  ctx.fillRect(x, y, 1, 1);
};

var drawWorld = function drawWorld(time, getCeilValueFn) {
  var _ctx$canvas = ctx.canvas,
      width = _ctx$canvas.width,
      height = _ctx$canvas.height;

  iterate(width * height, function (i) {
    var x = i % width;
    var y = Math.floor(i / width);
    var value = getCeilValueFn(x, y, time);
    drawPixel(x, y, value);
  });
};
// <---

// start TIME
var timeTick = function timeTick(time) {
  drawWorld(time, getCeilValue);
  requestAnimationFrame(function () {
    return timeTick(time + 1);
  });
};
//

// Fit CANVAS to window --->
var fitCanvasToWindow = function fitCanvasToWindow() {
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
};
window.addEventListener('resize', fitCanvasToWindow);
fitCanvasToWindow();
// <---

timeTick(0);

/***/ })
/******/ ]);