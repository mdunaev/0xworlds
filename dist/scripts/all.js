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
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./app/app.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app/app.ts":
/*!********************!*\
  !*** ./app/app.ts ***!
  \********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _eternity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./eternity */ "./app/eternity.ts");
/* harmony import */ var _field__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./field */ "./app/field.ts");


const world = new _field__WEBPACK_IMPORTED_MODULE_1__["WorldField"](_eternity__WEBPACK_IMPORTED_MODULE_0__["eternityFunction"]);
world.timeStart();


/***/ }),

/***/ "./app/eternity.ts":
/*!*************************!*\
  !*** ./app/eternity.ts ***!
  \*************************/
/*! exports provided: eternityFunction */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "eternityFunction", function() { return eternityFunction; });
// The returned value should be in the range from 0 to 255.
// Where 0 is black and 255 is white and intermediate values are shades of gray color.
function eternityFunction(x, y, time) {
    return ((Math.sin((x + Math.sin(time / 100) * 100) / 10) +
        Math.cos((y + Math.cos(time / 100) * 100) / 10)) *
        255 /
        2);
}


/***/ }),

/***/ "./app/field.ts":
/*!**********************!*\
  !*** ./app/field.ts ***!
  \**********************/
/*! exports provided: WorldField */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WorldField", function() { return WorldField; });
/* harmony import */ var interactjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! interactjs */ "./node_modules/interactjs/dist/interact.js");
/* harmony import */ var interactjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(interactjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./state */ "./app/state.ts");


class WorldField {
    constructor(eternityFunction) {
        this.eternityFunction = eternityFunction;
        this.isTimePlayed = false;
        this.time = 10;
        this.timeStop = () => (this.isTimePlayed = false);
        this.canvas = document.querySelector('#canvas');
        this.ctx = this.canvas.getContext('2d');
        window.addEventListener('resize', this.fitCanvasToWindow);
        window.addEventListener('wheel', this.zoomField);
        this.fitCanvasToWindow();
        interactjs__WEBPACK_IMPORTED_MODULE_0__('#canvas')
            .draggable({
            onmove: (event) => Object(_state__WEBPACK_IMPORTED_MODULE_1__["setView"])(Object.assign({}, _state__WEBPACK_IMPORTED_MODULE_1__["state"].view, { x: _state__WEBPACK_IMPORTED_MODULE_1__["state"].view.x + event.dx / _state__WEBPACK_IMPORTED_MODULE_1__["state"].view.scale, y: _state__WEBPACK_IMPORTED_MODULE_1__["state"].view.y + event.dy / _state__WEBPACK_IMPORTED_MODULE_1__["state"].view.scale }))
        })
            .styleCursor(false);
    }
    timeTick() {
        this.time++;
        this.draw();
        if (this.isTimePlayed)
            requestAnimationFrame(() => this.timeTick());
    }
    timeStart() {
        this.isTimePlayed = true;
        this.timeTick();
    }
    fitCanvasToWindow() {
        this.canvas.width = window.innerWidth / _state__WEBPACK_IMPORTED_MODULE_1__["state"].settings.dimension;
        this.canvas.height =
            window.innerHeight / _state__WEBPACK_IMPORTED_MODULE_1__["state"].settings.dimension;
        this.canvas.style.width = `${window.innerWidth}px`;
        this.canvas.style.height = `${window.innerHeight}px`;
    }
    zoomField(event) {
        const scaleDelta = event.deltaY / _state__WEBPACK_IMPORTED_MODULE_1__["state"].settings.scaleSpeed;
        const newScale = _state__WEBPACK_IMPORTED_MODULE_1__["state"].view.scale + scaleDelta;
        const newWidth = this.canvas.width / newScale;
        const newHeight = this.canvas.height / newScale;
        const oldWidth = this.canvas.width / _state__WEBPACK_IMPORTED_MODULE_1__["state"].view.scale;
        const oldHeight = this.canvas.height / _state__WEBPACK_IMPORTED_MODULE_1__["state"].view.scale;
        const adaptiveMouseX = event.pageX / _state__WEBPACK_IMPORTED_MODULE_1__["state"].settings.dimension / _state__WEBPACK_IMPORTED_MODULE_1__["state"].view.scale;
        const adaptiveMouseY = event.pageY / _state__WEBPACK_IMPORTED_MODULE_1__["state"].settings.dimension / _state__WEBPACK_IMPORTED_MODULE_1__["state"].view.scale;
        const mousePercentX = (adaptiveMouseX - oldWidth / 2) / (oldWidth / 2);
        const mousePercentY = (adaptiveMouseY - oldHeight / 2) / (oldHeight / 2);
        const widthDiff = oldWidth - newWidth + (oldWidth - newWidth) * mousePercentX;
        const heightDiff = oldHeight - newHeight + (oldHeight - newHeight) * mousePercentY;
        const xDiff = widthDiff / 2 * _state__WEBPACK_IMPORTED_MODULE_1__["state"].settings.dimension;
        const yDiff = heightDiff / 2 * _state__WEBPACK_IMPORTED_MODULE_1__["state"].settings.dimension;
        Object(_state__WEBPACK_IMPORTED_MODULE_1__["setView"])(Object.assign({}, _state__WEBPACK_IMPORTED_MODULE_1__["state"].view, { x: _state__WEBPACK_IMPORTED_MODULE_1__["state"].view.x - xDiff, y: _state__WEBPACK_IMPORTED_MODULE_1__["state"].view.y - yDiff, scale: newScale }));
        event.preventDefault();
    }
    draw() {
        const { width, height } = this.canvas;
        const drawPixel = (x, y, color) => {
            x = Math.round(x);
            y = Math.round(y);
            const hexColorGray = Math.round(color);
            let hexColor = `rgb(${hexColorGray},${hexColorGray},${hexColorGray})`;
            if (color > 255)
                hexColor = '#ff0000';
            if (color < 0)
                hexColor = '#00ff00';
            this.ctx.fillStyle = hexColor;
            this.ctx.fillRect(x, y, 1, 1);
        };
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = '#fff';
        Array(width * height)
            .fill(0)
            .map((v, i) => {
            const x = i % width;
            const y = Math.floor(i / width);
            const etX = x / _state__WEBPACK_IMPORTED_MODULE_1__["state"].view.scale -
                _state__WEBPACK_IMPORTED_MODULE_1__["state"].view.x / _state__WEBPACK_IMPORTED_MODULE_1__["state"].settings.dimension;
            const etY = y / _state__WEBPACK_IMPORTED_MODULE_1__["state"].view.scale -
                _state__WEBPACK_IMPORTED_MODULE_1__["state"].view.y / _state__WEBPACK_IMPORTED_MODULE_1__["state"].settings.dimension;
            const value = this.eternityFunction(etX, etY, this.time);
            if (value > 0)
                drawPixel(x, y, value);
        });
    }
}


/***/ }),

/***/ "./app/state.ts":
/*!**********************!*\
  !*** ./app/state.ts ***!
  \**********************/
/*! exports provided: state, setView */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "state", function() { return state; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setView", function() { return setView; });
const state = {
    view: {
        x: 0,
        y: 0,
        scale: 0.5
    },
    settings: {
        scaleSpeed: 1000,
        dimension: 4
    }
};
const setView = (viewState) => (state.view = viewState);


/***/ }),

/***/ "./node_modules/interactjs/dist/interact.js":
/*!**************************************************!*\
  !*** ./node_modules/interactjs/dist/interact.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var require;var require;/**
 * interact.js v1.3.4
 *
 * Copyright (c) 2012-2018 Taye Adeyemi <dev@taye.me>
 * Released under the MIT License.
 * https://raw.github.com/taye/interact.js/master/LICENSE
 */
(function(f){if(true){module.exports=f()}else { var g; }})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return require(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

/*
 * In a (windowless) server environment this file exports a factory function
 * that takes the window to use.
 *
 *     var interact = require('interact.js')(windowObject);
 *
 * See https://github.com/taye/interact.js/issues/187
 */
if (typeof window === 'undefined') {
  module.exports = function (window) {
    require('./src/utils/window').init(window);

    return require('./src/index');
  };
} else {
  module.exports = require('./src/index');
}

},{"./src/index":19,"./src/utils/window":52}],2:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var extend = require('./utils/extend.js');

function fireUntilImmediateStopped(event, listeners) {
  for (var _i = 0; _i < listeners.length; _i++) {
    var _ref;

    _ref = listeners[_i];
    var listener = _ref;

    if (event.immediatePropagationStopped) {
      break;
    }

    listener(event);
  }
}

var Eventable = function () {
  function Eventable(options) {
    _classCallCheck(this, Eventable);

    this.options = extend({}, options || {});
  }

  Eventable.prototype.fire = function fire(event) {
    var listeners = void 0;
    var onEvent = 'on' + event.type;
    var global = this.global;

    // Interactable#on() listeners
    if (listeners = this[event.type]) {
      fireUntilImmediateStopped(event, listeners);
    }

    // interactable.onevent listener
    if (this[onEvent]) {
      this[onEvent](event);
    }

    // interact.on() listeners
    if (!event.propagationStopped && global && (listeners = global[event.type])) {
      fireUntilImmediateStopped(event, listeners);
    }
  };

  Eventable.prototype.on = function on(eventType, listener) {
    // if this type of event was never bound
    if (this[eventType]) {
      this[eventType].push(listener);
    } else {
      this[eventType] = [listener];
    }
  };

  Eventable.prototype.off = function off(eventType, listener) {
    // if it is an action event type
    var eventList = this[eventType];
    var index = eventList ? eventList.indexOf(listener) : -1;

    if (index !== -1) {
      eventList.splice(index, 1);
    }

    if (eventList && eventList.length === 0 || !listener) {
      this[eventType] = undefined;
    }
  };

  return Eventable;
}();

module.exports = Eventable;

},{"./utils/extend.js":41}],3:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var extend = require('./utils/extend');
var getOriginXY = require('./utils/getOriginXY');
var defaults = require('./defaultOptions');
var signals = require('./utils/Signals').new();

var InteractEvent = function () {
  /** */
  function InteractEvent(interaction, event, action, phase, element, related) {
    var preEnd = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;

    _classCallCheck(this, InteractEvent);

    var target = interaction.target;
    var deltaSource = (target && target.options || defaults).deltaSource;
    var origin = getOriginXY(target, element, action);
    var starting = phase === 'start';
    var ending = phase === 'end';
    var coords = starting ? interaction.startCoords : interaction.curCoords;
    var prevEvent = interaction.prevEvent;

    element = element || interaction.element;

    var page = extend({}, coords.page);
    var client = extend({}, coords.client);

    page.x -= origin.x;
    page.y -= origin.y;

    client.x -= origin.x;
    client.y -= origin.y;

    this.ctrlKey = event.ctrlKey;
    this.altKey = event.altKey;
    this.shiftKey = event.shiftKey;
    this.metaKey = event.metaKey;
    this.button = event.button;
    this.buttons = event.buttons;
    this.target = element;
    this.currentTarget = element;
    this.relatedTarget = related || null;
    this.preEnd = preEnd;
    this.type = action + (phase || '');
    this.interaction = interaction;
    this.interactable = target;

    this.t0 = starting ? interaction.downTimes[interaction.downTimes.length - 1] : prevEvent.t0;

    var signalArg = {
      interaction: interaction,
      event: event,
      action: action,
      phase: phase,
      element: element,
      related: related,
      page: page,
      client: client,
      coords: coords,
      starting: starting,
      ending: ending,
      deltaSource: deltaSource,
      iEvent: this
    };

    signals.fire('set-xy', signalArg);

    if (ending) {
      // use previous coords when ending
      this.pageX = prevEvent.pageX;
      this.pageY = prevEvent.pageY;
      this.clientX = prevEvent.clientX;
      this.clientY = prevEvent.clientY;
    } else {
      this.pageX = page.x;
      this.pageY = page.y;
      this.clientX = client.x;
      this.clientY = client.y;
    }

    this.x0 = interaction.startCoords.page.x - origin.x;
    this.y0 = interaction.startCoords.page.y - origin.y;
    this.clientX0 = interaction.startCoords.client.x - origin.x;
    this.clientY0 = interaction.startCoords.client.y - origin.y;

    signals.fire('set-delta', signalArg);

    this.timeStamp = coords.timeStamp;
    this.dt = interaction.pointerDelta.timeStamp;
    this.duration = this.timeStamp - this.t0;

    // speed and velocity in pixels per second
    this.speed = interaction.pointerDelta[deltaSource].speed;
    this.velocityX = interaction.pointerDelta[deltaSource].vx;
    this.velocityY = interaction.pointerDelta[deltaSource].vy;

    this.swipe = ending || phase === 'inertiastart' ? this.getSwipe() : null;

    signals.fire('new', signalArg);
  }

  InteractEvent.prototype.getSwipe = function getSwipe() {
    var interaction = this.interaction;

    if (interaction.prevEvent.speed < 600 || this.timeStamp - interaction.prevEvent.timeStamp > 150) {
      return null;
    }

    var angle = 180 * Math.atan2(interaction.prevEvent.velocityY, interaction.prevEvent.velocityX) / Math.PI;
    var overlap = 22.5;

    if (angle < 0) {
      angle += 360;
    }

    var left = 135 - overlap <= angle && angle < 225 + overlap;
    var up = 225 - overlap <= angle && angle < 315 + overlap;

    var right = !left && (315 - overlap <= angle || angle < 45 + overlap);
    var down = !up && 45 - overlap <= angle && angle < 135 + overlap;

    return {
      up: up,
      down: down,
      left: left,
      right: right,
      angle: angle,
      speed: interaction.prevEvent.speed,
      velocity: {
        x: interaction.prevEvent.velocityX,
        y: interaction.prevEvent.velocityY
      }
    };
  };

  InteractEvent.prototype.preventDefault = function preventDefault() {};

  /** */


  InteractEvent.prototype.stopImmediatePropagation = function stopImmediatePropagation() {
    this.immediatePropagationStopped = this.propagationStopped = true;
  };

  /** */


  InteractEvent.prototype.stopPropagation = function stopPropagation() {
    this.propagationStopped = true;
  };

  return InteractEvent;
}();

signals.on('set-delta', function (_ref) {
  var iEvent = _ref.iEvent,
      interaction = _ref.interaction,
      starting = _ref.starting,
      deltaSource = _ref.deltaSource;

  var prevEvent = starting ? iEvent : interaction.prevEvent;

  if (deltaSource === 'client') {
    iEvent.dx = iEvent.clientX - prevEvent.clientX;
    iEvent.dy = iEvent.clientY - prevEvent.clientY;
  } else {
    iEvent.dx = iEvent.pageX - prevEvent.pageX;
    iEvent.dy = iEvent.pageY - prevEvent.pageY;
  }
});

InteractEvent.signals = signals;

module.exports = InteractEvent;

},{"./defaultOptions":18,"./utils/Signals":34,"./utils/extend":41,"./utils/getOriginXY":42}],4:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var clone = require('./utils/clone');
var is = require('./utils/is');
var events = require('./utils/events');
var extend = require('./utils/extend');
var actions = require('./actions/base');
var scope = require('./scope');
var Eventable = require('./Eventable');
var defaults = require('./defaultOptions');
var signals = require('./utils/Signals').new();

var _require = require('./utils/domUtils'),
    getElementRect = _require.getElementRect,
    nodeContains = _require.nodeContains,
    trySelector = _require.trySelector,
    matchesSelector = _require.matchesSelector;

var _require2 = require('./utils/window'),
    getWindow = _require2.getWindow;

var _require3 = require('./utils/arr'),
    contains = _require3.contains;

var _require4 = require('./utils/browser'),
    wheelEvent = _require4.wheelEvent;

// all set interactables


scope.interactables = [];

var Interactable = function () {
  /** */
  function Interactable(target, options) {
    _classCallCheck(this, Interactable);

    options = options || {};

    this.target = target;
    this.events = new Eventable();
    this._context = options.context || scope.document;
    this._win = getWindow(trySelector(target) ? this._context : target);
    this._doc = this._win.document;

    signals.fire('new', {
      target: target,
      options: options,
      interactable: this,
      win: this._win
    });

    scope.addDocument(this._doc, this._win);

    scope.interactables.push(this);

    this.set(options);
  }

  Interactable.prototype.setOnEvents = function setOnEvents(action, phases) {
    var onAction = 'on' + action;

    if (is.function(phases.onstart)) {
      this.events[onAction + 'start'] = phases.onstart;
    }
    if (is.function(phases.onmove)) {
      this.events[onAction + 'move'] = phases.onmove;
    }
    if (is.function(phases.onend)) {
      this.events[onAction + 'end'] = phases.onend;
    }
    if (is.function(phases.oninertiastart)) {
      this.events[onAction + 'inertiastart'] = phases.oninertiastart;
    }

    return this;
  };

  Interactable.prototype.setPerAction = function setPerAction(action, options) {
    // for all the default per-action options
    for (var option in options) {
      // if this option exists for this action
      if (option in defaults[action]) {
        // if the option in the options arg is an object value
        if (is.object(options[option])) {
          // duplicate the object and merge
          this.options[action][option] = clone(this.options[action][option] || {});
          extend(this.options[action][option], options[option]);

          if (is.object(defaults.perAction[option]) && 'enabled' in defaults.perAction[option]) {
            this.options[action][option].enabled = options[option].enabled === false ? false : true;
          }
        } else if (is.bool(options[option]) && is.object(defaults.perAction[option])) {
          this.options[action][option].enabled = options[option];
        } else if (options[option] !== undefined) {
          // or if it's not undefined, do a plain assignment
          this.options[action][option] = options[option];
        }
      }
    }
  };

  /**
   * The default function to get an Interactables bounding rect. Can be
   * overridden using {@link Interactable.rectChecker}.
   *
   * @param {Element} [element] The element to measure.
   * @return {object} The object's bounding rectangle.
   */


  Interactable.prototype.getRect = function getRect(element) {
    element = element || this.target;

    if (is.string(this.target) && !is.element(element)) {
      element = this._context.querySelector(this.target);
    }

    return getElementRect(element);
  };

  /**
   * Returns or sets the function used to calculate the interactable's
   * element's rectangle
   *
   * @param {function} [checker] A function which returns this Interactable's
   * bounding rectangle. See {@link Interactable.getRect}
   * @return {function | object} The checker function or this Interactable
   */


  Interactable.prototype.rectChecker = function rectChecker(checker) {
    if (is.function(checker)) {
      this.getRect = checker;

      return this;
    }

    if (checker === null) {
      delete this.options.getRect;

      return this;
    }

    return this.getRect;
  };

  Interactable.prototype._backCompatOption = function _backCompatOption(optionName, newValue) {
    if (trySelector(newValue) || is.object(newValue)) {
      this.options[optionName] = newValue;

      for (var _i = 0; _i < actions.names.length; _i++) {
        var _ref;

        _ref = actions.names[_i];
        var action = _ref;

        this.options[action][optionName] = newValue;
      }

      return this;
    }

    return this.options[optionName];
  };

  /**
   * Gets or sets the origin of the Interactable's element.  The x and y
   * of the origin will be subtracted from action event coordinates.
   *
   * @param {Element | object | string} [origin] An HTML or SVG Element whose
   * rect will be used, an object eg. { x: 0, y: 0 } or string 'parent', 'self'
   * or any CSS selector
   *
   * @return {object} The current origin or this Interactable
   */


  Interactable.prototype.origin = function origin(newValue) {
    return this._backCompatOption('origin', newValue);
  };

  /**
   * Returns or sets the mouse coordinate types used to calculate the
   * movement of the pointer.
   *
   * @param {string} [newValue] Use 'client' if you will be scrolling while
   * interacting; Use 'page' if you want autoScroll to work
   * @return {string | object} The current deltaSource or this Interactable
   */


  Interactable.prototype.deltaSource = function deltaSource(newValue) {
    if (newValue === 'page' || newValue === 'client') {
      this.options.deltaSource = newValue;

      return this;
    }

    return this.options.deltaSource;
  };

  /**
   * Gets the selector context Node of the Interactable. The default is
   * `window.document`.
   *
   * @return {Node} The context Node of this Interactable
   */


  Interactable.prototype.context = function context() {
    return this._context;
  };

  Interactable.prototype.inContext = function inContext(element) {
    return this._context === element.ownerDocument || nodeContains(this._context, element);
  };

  /**
   * Calls listeners for the given InteractEvent type bound globally
   * and directly to this Interactable
   *
   * @param {InteractEvent} iEvent The InteractEvent object to be fired on this
   * Interactable
   * @return {Interactable} this Interactable
   */


  Interactable.prototype.fire = function fire(iEvent) {
    this.events.fire(iEvent);

    return this;
  };

  Interactable.prototype._onOffMultiple = function _onOffMultiple(method, eventType, listener, options) {
    if (is.string(eventType) && eventType.search(' ') !== -1) {
      eventType = eventType.trim().split(/ +/);
    }

    if (is.array(eventType)) {
      for (var _i2 = 0; _i2 < eventType.length; _i2++) {
        var _ref2;

        _ref2 = eventType[_i2];
        var type = _ref2;

        this[method](type, listener, options);
      }

      return true;
    }

    if (is.object(eventType)) {
      for (var prop in eventType) {
        this[method](prop, eventType[prop], listener);
      }

      return true;
    }
  };

  /**
   * Binds a listener for an InteractEvent, pointerEvent or DOM event.
   *
   * @param {string | array | object} eventType  The types of events to listen
   * for
   * @param {function} listener   The function event (s)
   * @param {object | boolean} [options]    options object or useCapture flag
   * for addEventListener
   * @return {object} This Interactable
   */


  Interactable.prototype.on = function on(eventType, listener, options) {
    if (this._onOffMultiple('on', eventType, listener, options)) {
      return this;
    }

    if (eventType === 'wheel') {
      eventType = wheelEvent;
    }

    if (contains(Interactable.eventTypes, eventType)) {
      this.events.on(eventType, listener);
    }
    // delegated event for selector
    else if (is.string(this.target)) {
        events.addDelegate(this.target, this._context, eventType, listener, options);
      } else {
        events.add(this.target, eventType, listener, options);
      }

    return this;
  };

  /**
   * Removes an InteractEvent, pointerEvent or DOM event listener
   *
   * @param {string | array | object} eventType The types of events that were
   * listened for
   * @param {function} listener The listener function to be removed
   * @param {object | boolean} [options] options object or useCapture flag for
   * removeEventListener
   * @return {object} This Interactable
   */


  Interactable.prototype.off = function off(eventType, listener, options) {
    if (this._onOffMultiple('off', eventType, listener, options)) {
      return this;
    }

    if (eventType === 'wheel') {
      eventType = wheelEvent;
    }

    // if it is an action event type
    if (contains(Interactable.eventTypes, eventType)) {
      this.events.off(eventType, listener);
    }
    // delegated event
    else if (is.string(this.target)) {
        events.removeDelegate(this.target, this._context, eventType, listener, options);
      }
      // remove listener from this Interatable's element
      else {
          events.remove(this.target, eventType, listener, options);
        }

    return this;
  };

  /**
   * Reset the options of this Interactable
   *
   * @param {object} options The new settings to apply
   * @return {object} This Interactable
   */


  Interactable.prototype.set = function set(options) {
    if (!is.object(options)) {
      options = {};
    }

    this.options = clone(defaults.base);

    var perActions = clone(defaults.perAction);

    for (var actionName in actions.methodDict) {
      var methodName = actions.methodDict[actionName];

      this.options[actionName] = clone(defaults[actionName]);

      this.setPerAction(actionName, perActions);

      this[methodName](options[actionName]);
    }

    for (var _i3 = 0; _i3 < Interactable.settingsMethods.length; _i3++) {
      var _ref3;

      _ref3 = Interactable.settingsMethods[_i3];
      var setting = _ref3;

      this.options[setting] = defaults.base[setting];

      if (setting in options) {
        this[setting](options[setting]);
      }
    }

    signals.fire('set', {
      options: options,
      interactable: this
    });

    return this;
  };

  /**
   * Remove this interactable from the list of interactables and remove it's
   * action capabilities and event listeners
   *
   * @return {interact}
   */


  Interactable.prototype.unset = function unset() {
    events.remove(this.target, 'all');

    if (is.string(this.target)) {
      // remove delegated events
      for (var type in events.delegatedEvents) {
        var delegated = events.delegatedEvents[type];

        if (delegated.selectors[0] === this.target && delegated.contexts[0] === this._context) {

          delegated.selectors.splice(0, 1);
          delegated.contexts.splice(0, 1);
          delegated.listeners.splice(0, 1);

          // remove the arrays if they are empty
          if (!delegated.selectors.length) {
            delegated[type] = null;
          }
        }

        events.remove(this._context, type, events.delegateListener);
        events.remove(this._context, type, events.delegateUseCapture, true);
      }
    } else {
      events.remove(this, 'all');
    }

    signals.fire('unset', { interactable: this });

    scope.interactables.splice(scope.interactables.indexOf(this), 1);

    // Stop related interactions when an Interactable is unset
    for (var _i4 = 0; _i4 < (scope.interactions || []).length; _i4++) {
      var _ref4;

      _ref4 = (scope.interactions || [])[_i4];
      var interaction = _ref4;

      if (interaction.target === this && interaction.interacting() && !interaction._ending) {
        interaction.stop();
      }
    }

    return scope.interact;
  };

  return Interactable;
}();

scope.interactables.indexOfElement = function indexOfElement(target, context) {
  context = context || scope.document;

  for (var i = 0; i < this.length; i++) {
    var interactable = this[i];

    if (interactable.target === target && interactable._context === context) {
      return i;
    }
  }
  return -1;
};

scope.interactables.get = function interactableGet(element, options, dontCheckInContext) {
  var ret = this[this.indexOfElement(element, options && options.context)];

  return ret && (is.string(element) || dontCheckInContext || ret.inContext(element)) ? ret : null;
};

scope.interactables.forEachMatch = function (element, callback) {
  for (var _i5 = 0; _i5 < this.length; _i5++) {
    var _ref5;

    _ref5 = this[_i5];
    var interactable = _ref5;

    var ret = void 0;

    if ((is.string(interactable.target)
    // target is a selector and the element matches
    ? is.element(element) && matchesSelector(element, interactable.target) :
    // target is the element
    element === interactable.target) &&
    // the element is in context
    interactable.inContext(element)) {
      ret = callback(interactable);
    }

    if (ret !== undefined) {
      return ret;
    }
  }
};

// all interact.js eventTypes
Interactable.eventTypes = scope.eventTypes = [];

Interactable.signals = signals;

Interactable.settingsMethods = ['deltaSource', 'origin', 'preventDefault', 'rectChecker'];

module.exports = Interactable;

},{"./Eventable":2,"./actions/base":6,"./defaultOptions":18,"./scope":33,"./utils/Signals":34,"./utils/arr":35,"./utils/browser":36,"./utils/clone":37,"./utils/domUtils":39,"./utils/events":40,"./utils/extend":41,"./utils/is":46,"./utils/window":52}],5:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var scope = require('./scope');
var utils = require('./utils');
var events = require('./utils/events');
var browser = require('./utils/browser');
var domObjects = require('./utils/domObjects');
var finder = require('./utils/interactionFinder');
var signals = require('./utils/Signals').new();

var listeners = {};
var methodNames = ['pointerDown', 'pointerMove', 'pointerUp', 'updatePointer', 'removePointer'];

// for ignoring browser's simulated mouse events
var prevTouchTime = 0;

// all active and idle interactions
scope.interactions = [];

var Interaction = function () {
  /** */
  function Interaction(_ref) {
    var pointerType = _ref.pointerType;

    _classCallCheck(this, Interaction);

    this.target = null; // current interactable being interacted with
    this.element = null; // the target element of the interactable

    this.prepared = { // action that's ready to be fired on next move event
      name: null,
      axis: null,
      edges: null
    };

    // keep track of added pointers
    this.pointers = [];
    this.pointerIds = [];
    this.downTargets = [];
    this.downTimes = [];

    // Previous native pointer move event coordinates
    this.prevCoords = {
      page: { x: 0, y: 0 },
      client: { x: 0, y: 0 },
      timeStamp: 0
    };
    // current native pointer move event coordinates
    this.curCoords = {
      page: { x: 0, y: 0 },
      client: { x: 0, y: 0 },
      timeStamp: 0
    };

    // Starting InteractEvent pointer coordinates
    this.startCoords = {
      page: { x: 0, y: 0 },
      client: { x: 0, y: 0 },
      timeStamp: 0
    };

    // Change in coordinates and time of the pointer
    this.pointerDelta = {
      page: { x: 0, y: 0, vx: 0, vy: 0, speed: 0 },
      client: { x: 0, y: 0, vx: 0, vy: 0, speed: 0 },
      timeStamp: 0
    };

    this.downEvent = null; // pointerdown/mousedown/touchstart event
    this.downPointer = {};

    this._eventTarget = null;
    this._curEventTarget = null;

    this.prevEvent = null; // previous action event

    this.pointerIsDown = false;
    this.pointerWasMoved = false;
    this._interacting = false;
    this._ending = false;

    this.pointerType = pointerType;

    signals.fire('new', this);

    scope.interactions.push(this);
  }

  Interaction.prototype.pointerDown = function pointerDown(pointer, event, eventTarget) {
    var pointerIndex = this.updatePointer(pointer, event, true);

    signals.fire('down', {
      pointer: pointer,
      event: event,
      eventTarget: eventTarget,
      pointerIndex: pointerIndex,
      interaction: this
    });
  };

  /**
   * ```js
   * interact(target)
   *   .draggable({
   *     // disable the default drag start by down->move
   *     manualStart: true
   *   })
   *   // start dragging after the user holds the pointer down
   *   .on('hold', function (event) {
   *     var interaction = event.interaction;
   *
   *     if (!interaction.interacting()) {
   *       interaction.start({ name: 'drag' },
   *                         event.interactable,
   *                         event.currentTarget);
   *     }
   * });
   * ```
   *
   * Start an action with the given Interactable and Element as tartgets. The
   * action must be enabled for the target Interactable and an appropriate
   * number of pointers must be held down - 1 for drag/resize, 2 for gesture.
   *
   * Use it with `interactable.<action>able({ manualStart: false })` to always
   * [start actions manually](https://github.com/taye/interact.js/issues/114)
   *
   * @param {object} action   The action to be performed - drag, resize, etc.
   * @param {Interactable} target  The Interactable to target
   * @param {Element} element The DOM Element to target
   * @return {object} interact
   */


  Interaction.prototype.start = function start(action, target, element) {
    if (this.interacting() || !this.pointerIsDown || this.pointerIds.length < (action.name === 'gesture' ? 2 : 1)) {
      return;
    }

    // if this interaction had been removed after stopping
    // add it back
    if (scope.interactions.indexOf(this) === -1) {
      scope.interactions.push(this);
    }

    utils.copyAction(this.prepared, action);
    this.target = target;
    this.element = element;

    signals.fire('action-start', {
      interaction: this,
      event: this.downEvent
    });
  };

  Interaction.prototype.pointerMove = function pointerMove(pointer, event, eventTarget) {
    if (!this.simulation) {
      this.updatePointer(pointer);
      utils.setCoords(this.curCoords, this.pointers);
    }

    var duplicateMove = this.curCoords.page.x === this.prevCoords.page.x && this.curCoords.page.y === this.prevCoords.page.y && this.curCoords.client.x === this.prevCoords.client.x && this.curCoords.client.y === this.prevCoords.client.y;

    var dx = void 0;
    var dy = void 0;

    // register movement greater than pointerMoveTolerance
    if (this.pointerIsDown && !this.pointerWasMoved) {
      dx = this.curCoords.client.x - this.startCoords.client.x;
      dy = this.curCoords.client.y - this.startCoords.client.y;

      this.pointerWasMoved = utils.hypot(dx, dy) > Interaction.pointerMoveTolerance;
    }

    var signalArg = {
      pointer: pointer,
      pointerIndex: this.getPointerIndex(pointer),
      event: event,
      eventTarget: eventTarget,
      dx: dx,
      dy: dy,
      duplicate: duplicateMove,
      interaction: this,
      interactingBeforeMove: this.interacting()
    };

    if (!duplicateMove) {
      // set pointer coordinate, time changes and speeds
      utils.setCoordDeltas(this.pointerDelta, this.prevCoords, this.curCoords);
    }

    signals.fire('move', signalArg);

    if (!duplicateMove) {
      // if interacting, fire an 'action-move' signal etc
      if (this.interacting()) {
        this.doMove(signalArg);
      }

      if (this.pointerWasMoved) {
        utils.copyCoords(this.prevCoords, this.curCoords);
      }
    }
  };

  /**
   * ```js
   * interact(target)
   *   .draggable(true)
   *   .on('dragmove', function (event) {
   *     if (someCondition) {
   *       // change the snap settings
   *       event.interactable.draggable({ snap: { targets: [] }});
   *       // fire another move event with re-calculated snap
   *       event.interaction.doMove();
   *     }
   *   });
   * ```
   *
   * Force a move of the current action at the same coordinates. Useful if
   * snap/restrict has been changed and you want a movement with the new
   * settings.
   */


  Interaction.prototype.doMove = function doMove(signalArg) {
    signalArg = utils.extend({
      pointer: this.pointers[0],
      event: this.prevEvent,
      eventTarget: this._eventTarget,
      interaction: this
    }, signalArg || {});

    signals.fire('before-action-move', signalArg);

    if (!this._dontFireMove) {
      signals.fire('action-move', signalArg);
    }

    this._dontFireMove = false;
  };

  // End interact move events and stop auto-scroll unless simulation is running


  Interaction.prototype.pointerUp = function pointerUp(pointer, event, eventTarget, curEventTarget) {
    var pointerIndex = this.getPointerIndex(pointer);

    signals.fire(/cancel$/i.test(event.type) ? 'cancel' : 'up', {
      pointer: pointer,
      pointerIndex: pointerIndex,
      event: event,
      eventTarget: eventTarget,
      curEventTarget: curEventTarget,
      interaction: this
    });

    if (!this.simulation) {
      this.end(event);
    }

    this.pointerIsDown = false;
    this.removePointer(pointer, event);
  };

  /**
   * ```js
   * interact(target)
   *   .draggable(true)
   *   .on('move', function (event) {
   *     if (event.pageX > 1000) {
   *       // end the current action
   *       event.interaction.end();
   *       // stop all further listeners from being called
   *       event.stopImmediatePropagation();
   *     }
   *   });
   * ```
   *
   * Stop the current action and fire an end event. Inertial movement does
   * not happen.
   *
   * @param {PointerEvent} [event]
   */


  Interaction.prototype.end = function end(event) {
    this._ending = true;

    event = event || this.prevEvent;

    if (this.interacting()) {
      signals.fire('action-end', {
        event: event,
        interaction: this
      });
    }

    this.stop();
    this._ending = false;
  };

  Interaction.prototype.currentAction = function currentAction() {
    return this._interacting ? this.prepared.name : null;
  };

  Interaction.prototype.interacting = function interacting() {
    return this._interacting;
  };

  /** */


  Interaction.prototype.stop = function stop() {
    signals.fire('stop', { interaction: this });

    if (this._interacting) {
      signals.fire('stop-active', { interaction: this });
      signals.fire('stop-' + this.prepared.name, { interaction: this });
    }

    this.target = this.element = null;

    this._interacting = false;
    this.prepared.name = this.prevEvent = null;
  };

  Interaction.prototype.getPointerIndex = function getPointerIndex(pointer) {
    // mouse and pen interactions may have only one pointer
    if (this.pointerType === 'mouse' || this.pointerType === 'pen') {
      return 0;
    }

    return this.pointerIds.indexOf(utils.getPointerId(pointer));
  };

  Interaction.prototype.updatePointer = function updatePointer(pointer, event) {
    var down = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : event && /(down|start)$/i.test(event.type);

    var id = utils.getPointerId(pointer);
    var index = this.getPointerIndex(pointer);

    if (index === -1) {
      index = this.pointerIds.length;
      this.pointerIds[index] = id;
    }

    if (down) {
      signals.fire('update-pointer-down', {
        pointer: pointer,
        event: event,
        down: down,
        pointerId: id,
        pointerIndex: index,
        interaction: this
      });
    }

    this.pointers[index] = pointer;

    return index;
  };

  Interaction.prototype.removePointer = function removePointer(pointer, event) {
    var index = this.getPointerIndex(pointer);

    if (index === -1) {
      return;
    }

    signals.fire('remove-pointer', {
      pointer: pointer,
      event: event,
      pointerIndex: index,
      interaction: this
    });

    this.pointers.splice(index, 1);
    this.pointerIds.splice(index, 1);
    this.downTargets.splice(index, 1);
    this.downTimes.splice(index, 1);
  };

  Interaction.prototype._updateEventTargets = function _updateEventTargets(target, currentTarget) {
    this._eventTarget = target;
    this._curEventTarget = currentTarget;
  };

  return Interaction;
}();

for (var _i = 0; _i < methodNames.length; _i++) {
  var method = methodNames[_i];
  listeners[method] = doOnInteractions(method);
}

function doOnInteractions(method) {
  return function (event) {
    var pointerType = utils.getPointerType(event);

    var _utils$getEventTarget = utils.getEventTargets(event),
        eventTarget = _utils$getEventTarget[0],
        curEventTarget = _utils$getEventTarget[1];

    var matches = []; // [ [pointer, interaction], ...]

    if (browser.supportsTouch && /touch/.test(event.type)) {
      prevTouchTime = new Date().getTime();

      for (var _i2 = 0; _i2 < event.changedTouches.length; _i2++) {
        var _ref2;

        _ref2 = event.changedTouches[_i2];
        var changedTouch = _ref2;

        var pointer = changedTouch;
        var interaction = finder.search(pointer, event.type, eventTarget);

        matches.push([pointer, interaction || new Interaction({ pointerType: pointerType })]);
      }
    } else {
      var invalidPointer = false;

      if (!browser.supportsPointerEvent && /mouse/.test(event.type)) {
        // ignore mouse events while touch interactions are active
        for (var i = 0; i < scope.interactions.length && !invalidPointer; i++) {
          invalidPointer = scope.interactions[i].pointerType !== 'mouse' && scope.interactions[i].pointerIsDown;
        }

        // try to ignore mouse events that are simulated by the browser
        // after a touch event
        invalidPointer = invalidPointer || new Date().getTime() - prevTouchTime < 500
        // on iOS and Firefox Mobile, MouseEvent.timeStamp is zero if simulated
        || event.timeStamp === 0;
      }

      if (!invalidPointer) {
        var _interaction = finder.search(event, event.type, eventTarget);

        if (!_interaction) {
          _interaction = new Interaction({ pointerType: pointerType });
        }

        matches.push([event, _interaction]);
      }
    }

    for (var _i3 = 0; _i3 < matches.length; _i3++) {
      var _ref3 = matches[_i3];
      var _pointer = _ref3[0];
      var _interaction2 = _ref3[1];

      _interaction2._updateEventTargets(eventTarget, curEventTarget);
      _interaction2[method](_pointer, event, eventTarget, curEventTarget);
    }
  };
}

function endAll(event) {
  for (var _i4 = 0; _i4 < scope.interactions.length; _i4++) {
    var _ref4;

    _ref4 = scope.interactions[_i4];
    var interaction = _ref4;

    interaction.end(event);
    signals.fire('endall', { event: event, interaction: interaction });
  }
}

var docEvents = {/* 'eventType': listenerFunc */};
var pEventTypes = browser.pEventTypes;

if (domObjects.PointerEvent) {
  docEvents[pEventTypes.down] = listeners.pointerDown;
  docEvents[pEventTypes.move] = listeners.pointerMove;
  docEvents[pEventTypes.up] = listeners.pointerUp;
  docEvents[pEventTypes.cancel] = listeners.pointerUp;
} else {
  docEvents.mousedown = listeners.pointerDown;
  docEvents.mousemove = listeners.pointerMove;
  docEvents.mouseup = listeners.pointerUp;

  docEvents.touchstart = listeners.pointerDown;
  docEvents.touchmove = listeners.pointerMove;
  docEvents.touchend = listeners.pointerUp;
  docEvents.touchcancel = listeners.pointerUp;
}

docEvents.blur = endAll;

function onDocSignal(_ref5, signalName) {
  var doc = _ref5.doc;

  var eventMethod = signalName.indexOf('add') === 0 ? events.add : events.remove;

  // delegate event listener
  for (var eventType in scope.delegatedEvents) {
    eventMethod(doc, eventType, events.delegateListener);
    eventMethod(doc, eventType, events.delegateUseCapture, true);
  }

  for (var _eventType in docEvents) {
    eventMethod(doc, _eventType, docEvents[_eventType], browser.isIOS ? { passive: false } : undefined);
  }
}

signals.on('update-pointer-down', function (_ref6) {
  var interaction = _ref6.interaction,
      pointer = _ref6.pointer,
      pointerId = _ref6.pointerId,
      pointerIndex = _ref6.pointerIndex,
      event = _ref6.event,
      eventTarget = _ref6.eventTarget,
      down = _ref6.down;

  interaction.pointerIds[pointerIndex] = pointerId;
  interaction.pointers[pointerIndex] = pointer;

  if (down) {
    interaction.pointerIsDown = true;
  }

  if (!interaction.interacting()) {
    utils.setCoords(interaction.startCoords, interaction.pointers);

    utils.copyCoords(interaction.curCoords, interaction.startCoords);
    utils.copyCoords(interaction.prevCoords, interaction.startCoords);

    interaction.downEvent = event;
    interaction.downTimes[pointerIndex] = interaction.curCoords.timeStamp;
    interaction.downTargets[pointerIndex] = eventTarget || event && utils.getEventTargets(event)[0];
    interaction.pointerWasMoved = false;

    utils.pointerExtend(interaction.downPointer, pointer);
  }
});

scope.signals.on('add-document', onDocSignal);
scope.signals.on('remove-document', onDocSignal);

Interaction.pointerMoveTolerance = 1;
Interaction.doOnInteractions = doOnInteractions;
Interaction.endAll = endAll;
Interaction.signals = signals;
Interaction.docEvents = docEvents;

scope.endAllInteractions = endAll;

module.exports = Interaction;

},{"./scope":33,"./utils":44,"./utils/Signals":34,"./utils/browser":36,"./utils/domObjects":38,"./utils/events":40,"./utils/interactionFinder":45}],6:[function(require,module,exports){
'use strict';

var Interaction = require('../Interaction');
var InteractEvent = require('../InteractEvent');

var actions = {
  firePrepared: firePrepared,
  names: [],
  methodDict: {}
};

Interaction.signals.on('action-start', function (_ref) {
  var interaction = _ref.interaction,
      event = _ref.event;

  interaction._interacting = true;
  firePrepared(interaction, event, 'start');
});

Interaction.signals.on('action-move', function (_ref2) {
  var interaction = _ref2.interaction,
      event = _ref2.event,
      preEnd = _ref2.preEnd;

  firePrepared(interaction, event, 'move', preEnd);

  // if the action was ended in a listener
  if (!interaction.interacting()) {
    return false;
  }
});

Interaction.signals.on('action-end', function (_ref3) {
  var interaction = _ref3.interaction,
      event = _ref3.event;

  firePrepared(interaction, event, 'end');
});

function firePrepared(interaction, event, phase, preEnd) {
  var actionName = interaction.prepared.name;

  var newEvent = new InteractEvent(interaction, event, actionName, phase, interaction.element, null, preEnd);

  interaction.target.fire(newEvent);
  interaction.prevEvent = newEvent;
}

module.exports = actions;

},{"../InteractEvent":3,"../Interaction":5}],7:[function(require,module,exports){
'use strict';

var actions = require('./base');
var utils = require('../utils');
var InteractEvent = require('../InteractEvent');
/** @lends Interactable */
var Interactable = require('../Interactable');
var Interaction = require('../Interaction');
var defaultOptions = require('../defaultOptions');

var drag = {
  defaults: {
    enabled: false,
    mouseButtons: null,

    origin: null,
    snap: null,
    restrict: null,
    inertia: null,
    autoScroll: null,

    startAxis: 'xy',
    lockAxis: 'xy'
  },

  checker: function checker(pointer, event, interactable) {
    var dragOptions = interactable.options.drag;

    return dragOptions.enabled ? { name: 'drag', axis: dragOptions.lockAxis === 'start' ? dragOptions.startAxis : dragOptions.lockAxis } : null;
  },

  getCursor: function getCursor() {
    return 'move';
  }
};

Interaction.signals.on('before-action-move', function (_ref) {
  var interaction = _ref.interaction;

  if (interaction.prepared.name !== 'drag') {
    return;
  }

  var axis = interaction.prepared.axis;

  if (axis === 'x') {
    interaction.curCoords.page.y = interaction.startCoords.page.y;
    interaction.curCoords.client.y = interaction.startCoords.client.y;

    interaction.pointerDelta.page.speed = Math.abs(interaction.pointerDelta.page.vx);
    interaction.pointerDelta.client.speed = Math.abs(interaction.pointerDelta.client.vx);
    interaction.pointerDelta.client.vy = 0;
    interaction.pointerDelta.page.vy = 0;
  } else if (axis === 'y') {
    interaction.curCoords.page.x = interaction.startCoords.page.x;
    interaction.curCoords.client.x = interaction.startCoords.client.x;

    interaction.pointerDelta.page.speed = Math.abs(interaction.pointerDelta.page.vy);
    interaction.pointerDelta.client.speed = Math.abs(interaction.pointerDelta.client.vy);
    interaction.pointerDelta.client.vx = 0;
    interaction.pointerDelta.page.vx = 0;
  }
});

// dragmove
InteractEvent.signals.on('new', function (_ref2) {
  var iEvent = _ref2.iEvent,
      interaction = _ref2.interaction;

  if (iEvent.type !== 'dragmove') {
    return;
  }

  var axis = interaction.prepared.axis;

  if (axis === 'x') {
    iEvent.pageY = interaction.startCoords.page.y;
    iEvent.clientY = interaction.startCoords.client.y;
    iEvent.dy = 0;
  } else if (axis === 'y') {
    iEvent.pageX = interaction.startCoords.page.x;
    iEvent.clientX = interaction.startCoords.client.x;
    iEvent.dx = 0;
  }
});

/**
 * ```js
 * interact(element).draggable({
 *     onstart: function (event) {},
 *     onmove : function (event) {},
 *     onend  : function (event) {},
 *
 *     // the axis in which the first movement must be
 *     // for the drag sequence to start
 *     // 'xy' by default - any direction
 *     startAxis: 'x' || 'y' || 'xy',
 *
 *     // 'xy' by default - don't restrict to one axis (move in any direction)
 *     // 'x' or 'y' to restrict movement to either axis
 *     // 'start' to restrict movement to the axis the drag started in
 *     lockAxis: 'x' || 'y' || 'xy' || 'start',
 *
 *     // max number of drags that can happen concurrently
 *     // with elements of this Interactable. Infinity by default
 *     max: Infinity,
 *
 *     // max number of drags that can target the same element+Interactable
 *     // 1 by default
 *     maxPerElement: 2
 * });
 *
 * var isDraggable = interact('element').draggable(); // true
 * ```
 *
 * Get or set whether drag actions can be performed on the target
 *
 * @param {boolean | object} [options] true/false or An object with event
 * listeners to be fired on drag events (object makes the Interactable
 * draggable)
 * @return {boolean | Interactable} boolean indicating if this can be the
 * target of drag events, or this Interctable
 */
Interactable.prototype.draggable = function (options) {
  if (utils.is.object(options)) {
    this.options.drag.enabled = options.enabled === false ? false : true;
    this.setPerAction('drag', options);
    this.setOnEvents('drag', options);

    if (/^(xy|x|y|start)$/.test(options.lockAxis)) {
      this.options.drag.lockAxis = options.lockAxis;
    }
    if (/^(xy|x|y)$/.test(options.startAxis)) {
      this.options.drag.startAxis = options.startAxis;
    }

    return this;
  }

  if (utils.is.bool(options)) {
    this.options.drag.enabled = options;

    if (!options) {
      this.ondragstart = this.ondragstart = this.ondragend = null;
    }

    return this;
  }

  return this.options.drag;
};

actions.drag = drag;
actions.names.push('drag');
utils.merge(Interactable.eventTypes, ['dragstart', 'dragmove', 'draginertiastart', 'draginertiaresume', 'dragend']);
actions.methodDict.drag = 'draggable';

defaultOptions.drag = drag.defaults;

module.exports = drag;

},{"../InteractEvent":3,"../Interactable":4,"../Interaction":5,"../defaultOptions":18,"../utils":44,"./base":6}],8:[function(require,module,exports){
'use strict';

var actions = require('./base');
var utils = require('../utils');
var scope = require('../scope');
/** @lends module:interact */
var interact = require('../interact');
var InteractEvent = require('../InteractEvent');
/** @lends Interactable */
var Interactable = require('../Interactable');
var Interaction = require('../Interaction');
var defaultOptions = require('../defaultOptions');

var drop = {
  defaults: {
    enabled: false,
    accept: null,
    overlap: 'pointer'
  }
};

var dynamicDrop = false;

Interaction.signals.on('action-start', function (_ref) {
  var interaction = _ref.interaction,
      event = _ref.event;

  if (interaction.prepared.name !== 'drag') {
    return;
  }

  // reset active dropzones
  interaction.activeDrops.dropzones = [];
  interaction.activeDrops.elements = [];
  interaction.activeDrops.rects = [];

  interaction.dropEvents = null;

  if (!interaction.dynamicDrop) {
    setActiveDrops(interaction.activeDrops, interaction.element);
  }

  var dragEvent = interaction.prevEvent;
  var dropEvents = getDropEvents(interaction, event, dragEvent);

  if (dropEvents.activate) {
    fireActiveDrops(interaction.activeDrops, dropEvents.activate);
  }
});

InteractEvent.signals.on('new', function (_ref2) {
  var interaction = _ref2.interaction,
      iEvent = _ref2.iEvent,
      event = _ref2.event;

  if (iEvent.type !== 'dragmove' && iEvent.type !== 'dragend') {
    return;
  }

  var draggableElement = interaction.element;
  var dragEvent = iEvent;
  var dropResult = getDrop(dragEvent, event, draggableElement);

  interaction.dropTarget = dropResult.dropzone;
  interaction.dropElement = dropResult.element;

  interaction.dropEvents = getDropEvents(interaction, event, dragEvent);
});

Interaction.signals.on('action-move', function (_ref3) {
  var interaction = _ref3.interaction;

  if (interaction.prepared.name !== 'drag') {
    return;
  }

  fireDropEvents(interaction, interaction.dropEvents);
});

Interaction.signals.on('action-end', function (_ref4) {
  var interaction = _ref4.interaction;

  if (interaction.prepared.name === 'drag') {
    fireDropEvents(interaction, interaction.dropEvents);
  }
});

Interaction.signals.on('stop-drag', function (_ref5) {
  var interaction = _ref5.interaction;

  interaction.activeDrops = {
    dropzones: null,
    elements: null,
    rects: null
  };

  interaction.dropEvents = null;
});

function collectDrops(activeDrops, element) {
  var drops = [];
  var elements = [];

  // collect all dropzones and their elements which qualify for a drop
  for (var _i = 0; _i < scope.interactables.length; _i++) {
    var _ref6;

    _ref6 = scope.interactables[_i];
    var current = _ref6;

    if (!current.options.drop.enabled) {
      continue;
    }

    var accept = current.options.drop.accept;

    // test the draggable element against the dropzone's accept setting
    if (utils.is.element(accept) && accept !== element || utils.is.string(accept) && !utils.matchesSelector(element, accept)) {

      continue;
    }

    // query for new elements if necessary
    var dropElements = utils.is.string(current.target) ? current._context.querySelectorAll(current.target) : [current.target];

    for (var _i2 = 0; _i2 < dropElements.length; _i2++) {
      var _ref7;

      _ref7 = dropElements[_i2];
      var currentElement = _ref7;

      if (currentElement !== element) {
        drops.push(current);
        elements.push(currentElement);
      }
    }
  }

  return {
    elements: elements,
    dropzones: drops
  };
}

function fireActiveDrops(activeDrops, event) {
  var prevElement = void 0;

  // loop through all active dropzones and trigger event
  for (var i = 0; i < activeDrops.dropzones.length; i++) {
    var current = activeDrops.dropzones[i];
    var currentElement = activeDrops.elements[i];

    // prevent trigger of duplicate events on same element
    if (currentElement !== prevElement) {
      // set current element as event target
      event.target = currentElement;
      current.fire(event);
    }
    prevElement = currentElement;
  }
}

// Collect a new set of possible drops and save them in activeDrops.
// setActiveDrops should always be called when a drag has just started or a
// drag event happens while dynamicDrop is true
function setActiveDrops(activeDrops, dragElement) {
  // get dropzones and their elements that could receive the draggable
  var possibleDrops = collectDrops(activeDrops, dragElement);

  activeDrops.dropzones = possibleDrops.dropzones;
  activeDrops.elements = possibleDrops.elements;
  activeDrops.rects = [];

  for (var i = 0; i < activeDrops.dropzones.length; i++) {
    activeDrops.rects[i] = activeDrops.dropzones[i].getRect(activeDrops.elements[i]);
  }
}

function getDrop(dragEvent, event, dragElement) {
  var interaction = dragEvent.interaction;
  var validDrops = [];

  if (dynamicDrop) {
    setActiveDrops(interaction.activeDrops, dragElement);
  }

  // collect all dropzones and their elements which qualify for a drop
  for (var j = 0; j < interaction.activeDrops.dropzones.length; j++) {
    var current = interaction.activeDrops.dropzones[j];
    var currentElement = interaction.activeDrops.elements[j];
    var rect = interaction.activeDrops.rects[j];

    validDrops.push(current.dropCheck(dragEvent, event, interaction.target, dragElement, currentElement, rect) ? currentElement : null);
  }

  // get the most appropriate dropzone based on DOM depth and order
  var dropIndex = utils.indexOfDeepestElement(validDrops);

  return {
    dropzone: interaction.activeDrops.dropzones[dropIndex] || null,
    element: interaction.activeDrops.elements[dropIndex] || null
  };
}

function getDropEvents(interaction, pointerEvent, dragEvent) {
  var dropEvents = {
    enter: null,
    leave: null,
    activate: null,
    deactivate: null,
    move: null,
    drop: null
  };

  var tmpl = {
    dragEvent: dragEvent,
    interaction: interaction,
    target: interaction.dropElement,
    dropzone: interaction.dropTarget,
    relatedTarget: dragEvent.target,
    draggable: dragEvent.interactable,
    timeStamp: dragEvent.timeStamp
  };

  if (interaction.dropElement !== interaction.prevDropElement) {
    // if there was a prevDropTarget, create a dragleave event
    if (interaction.prevDropTarget) {
      dropEvents.leave = utils.extend({ type: 'dragleave' }, tmpl);

      dragEvent.dragLeave = dropEvents.leave.target = interaction.prevDropElement;
      dragEvent.prevDropzone = dropEvents.leave.dropzone = interaction.prevDropTarget;
    }
    // if the dropTarget is not null, create a dragenter event
    if (interaction.dropTarget) {
      dropEvents.enter = {
        dragEvent: dragEvent,
        interaction: interaction,
        target: interaction.dropElement,
        dropzone: interaction.dropTarget,
        relatedTarget: dragEvent.target,
        draggable: dragEvent.interactable,
        timeStamp: dragEvent.timeStamp,
        type: 'dragenter'
      };

      dragEvent.dragEnter = interaction.dropElement;
      dragEvent.dropzone = interaction.dropTarget;
    }
  }

  if (dragEvent.type === 'dragend' && interaction.dropTarget) {
    dropEvents.drop = utils.extend({ type: 'drop' }, tmpl);

    dragEvent.dropzone = interaction.dropTarget;
    dragEvent.relatedTarget = interaction.dropElement;
  }
  if (dragEvent.type === 'dragstart') {
    dropEvents.activate = utils.extend({ type: 'dropactivate' }, tmpl);

    dropEvents.activate.target = null;
    dropEvents.activate.dropzone = null;
  }
  if (dragEvent.type === 'dragend') {
    dropEvents.deactivate = utils.extend({ type: 'dropdeactivate' }, tmpl);

    dropEvents.deactivate.target = null;
    dropEvents.deactivate.dropzone = null;
  }
  if (dragEvent.type === 'dragmove' && interaction.dropTarget) {
    dropEvents.move = utils.extend({
      dragmove: dragEvent,
      type: 'dropmove'
    }, tmpl);

    dragEvent.dropzone = interaction.dropTarget;
  }

  return dropEvents;
}

function fireDropEvents(interaction, dropEvents) {
  var activeDrops = interaction.activeDrops,
      prevDropTarget = interaction.prevDropTarget,
      dropTarget = interaction.dropTarget,
      dropElement = interaction.dropElement;


  if (dropEvents.leave) {
    prevDropTarget.fire(dropEvents.leave);
  }
  if (dropEvents.move) {
    dropTarget.fire(dropEvents.move);
  }
  if (dropEvents.enter) {
    dropTarget.fire(dropEvents.enter);
  }
  if (dropEvents.drop) {
    dropTarget.fire(dropEvents.drop);
  }
  if (dropEvents.deactivate) {
    fireActiveDrops(activeDrops, dropEvents.deactivate);
  }

  interaction.prevDropTarget = dropTarget;
  interaction.prevDropElement = dropElement;
}

/**
 * ```js
 * interact(target)
 * .dropChecker(function(dragEvent,         // related dragmove or dragend event
 *                       event,             // TouchEvent/PointerEvent/MouseEvent
 *                       dropped,           // bool result of the default checker
 *                       dropzone,          // dropzone Interactable
 *                       dropElement,       // dropzone elemnt
 *                       draggable,         // draggable Interactable
 *                       draggableElement) {// draggable element
 *
 *   return dropped && event.target.hasAttribute('allow-drop');
 * }
 * ```
 *
 * ```js
 * interact('.drop').dropzone({
 *   accept: '.can-drop' || document.getElementById('single-drop'),
 *   overlap: 'pointer' || 'center' || zeroToOne
 * }
 * ```
 *
 * Returns or sets whether draggables can be dropped onto this target to
 * trigger drop events
 *
 * Dropzones can receive the following events:
 *  - `dropactivate` and `dropdeactivate` when an acceptable drag starts and ends
 *  - `dragenter` and `dragleave` when a draggable enters and leaves the dropzone
 *  - `dragmove` when a draggable that has entered the dropzone is moved
 *  - `drop` when a draggable is dropped into this dropzone
 *
 * Use the `accept` option to allow only elements that match the given CSS
 * selector or element. The value can be:
 *
 *  - **an Element** - only that element can be dropped into this dropzone.
 *  - **a string**, - the element being dragged must match it as a CSS selector.
 *  - **`null`** - accept options is cleared - it accepts any element.
 *
 * Use the `overlap` option to set how drops are checked for. The allowed
 * values are:
 *
 *   - `'pointer'`, the pointer must be over the dropzone (default)
 *   - `'center'`, the draggable element's center must be over the dropzone
 *   - a number from 0-1 which is the `(intersection area) / (draggable area)`.
 *   e.g. `0.5` for drop to happen when half of the area of the draggable is
 *   over the dropzone
 *
 * Use the `checker` option to specify a function to check if a dragged element
 * is over this Interactable.
 *
 * @param {boolean | object | null} [options] The new options to be set.
 * @return {boolean | Interactable} The current setting or this Interactable
 */
Interactable.prototype.dropzone = function (options) {
  if (utils.is.object(options)) {
    this.options.drop.enabled = options.enabled === false ? false : true;

    if (utils.is.function(options.ondrop)) {
      this.events.ondrop = options.ondrop;
    }
    if (utils.is.function(options.ondropactivate)) {
      this.events.ondropactivate = options.ondropactivate;
    }
    if (utils.is.function(options.ondropdeactivate)) {
      this.events.ondropdeactivate = options.ondropdeactivate;
    }
    if (utils.is.function(options.ondragenter)) {
      this.events.ondragenter = options.ondragenter;
    }
    if (utils.is.function(options.ondragleave)) {
      this.events.ondragleave = options.ondragleave;
    }
    if (utils.is.function(options.ondropmove)) {
      this.events.ondropmove = options.ondropmove;
    }

    if (/^(pointer|center)$/.test(options.overlap)) {
      this.options.drop.overlap = options.overlap;
    } else if (utils.is.number(options.overlap)) {
      this.options.drop.overlap = Math.max(Math.min(1, options.overlap), 0);
    }
    if ('accept' in options) {
      this.options.drop.accept = options.accept;
    }
    if ('checker' in options) {
      this.options.drop.checker = options.checker;
    }

    return this;
  }

  if (utils.is.bool(options)) {
    this.options.drop.enabled = options;

    if (!options) {
      this.ondragenter = this.ondragleave = this.ondrop = this.ondropactivate = this.ondropdeactivate = null;
    }

    return this;
  }

  return this.options.drop;
};

Interactable.prototype.dropCheck = function (dragEvent, event, draggable, draggableElement, dropElement, rect) {
  var dropped = false;

  // if the dropzone has no rect (eg. display: none)
  // call the custom dropChecker or just return false
  if (!(rect = rect || this.getRect(dropElement))) {
    return this.options.drop.checker ? this.options.drop.checker(dragEvent, event, dropped, this, dropElement, draggable, draggableElement) : false;
  }

  var dropOverlap = this.options.drop.overlap;

  if (dropOverlap === 'pointer') {
    var origin = utils.getOriginXY(draggable, draggableElement, 'drag');
    var page = utils.getPageXY(dragEvent);

    page.x += origin.x;
    page.y += origin.y;

    var horizontal = page.x > rect.left && page.x < rect.right;
    var vertical = page.y > rect.top && page.y < rect.bottom;

    dropped = horizontal && vertical;
  }

  var dragRect = draggable.getRect(draggableElement);

  if (dragRect && dropOverlap === 'center') {
    var cx = dragRect.left + dragRect.width / 2;
    var cy = dragRect.top + dragRect.height / 2;

    dropped = cx >= rect.left && cx <= rect.right && cy >= rect.top && cy <= rect.bottom;
  }

  if (dragRect && utils.is.number(dropOverlap)) {
    var overlapArea = Math.max(0, Math.min(rect.right, dragRect.right) - Math.max(rect.left, dragRect.left)) * Math.max(0, Math.min(rect.bottom, dragRect.bottom) - Math.max(rect.top, dragRect.top));

    var overlapRatio = overlapArea / (dragRect.width * dragRect.height);

    dropped = overlapRatio >= dropOverlap;
  }

  if (this.options.drop.checker) {
    dropped = this.options.drop.checker(dragEvent, event, dropped, this, dropElement, draggable, draggableElement);
  }

  return dropped;
};

Interactable.signals.on('unset', function (_ref8) {
  var interactable = _ref8.interactable;

  interactable.dropzone(false);
});

Interactable.settingsMethods.push('dropChecker');

Interaction.signals.on('new', function (interaction) {
  interaction.dropTarget = null; // the dropzone a drag target might be dropped into
  interaction.dropElement = null; // the element at the time of checking
  interaction.prevDropTarget = null; // the dropzone that was recently dragged away from
  interaction.prevDropElement = null; // the element at the time of checking
  interaction.dropEvents = null; // the dropEvents related to the current drag event

  interaction.activeDrops = {
    dropzones: [], // the dropzones that are mentioned below
    elements: [], // elements of dropzones that accept the target draggable
    rects: [] // the rects of the elements mentioned above
  };
});

Interaction.signals.on('stop', function (_ref9) {
  var interaction = _ref9.interaction;

  interaction.dropTarget = interaction.dropElement = interaction.prevDropTarget = interaction.prevDropElement = null;
});

/**
 * Returns or sets whether the dimensions of dropzone elements are calculated
 * on every dragmove or only on dragstart for the default dropChecker
 *
 * @param {boolean} [newValue] True to check on each move. False to check only
 * before start
 * @return {boolean | interact} The current setting or interact
 */
interact.dynamicDrop = function (newValue) {
  if (utils.is.bool(newValue)) {
    //if (dragging && dynamicDrop !== newValue && !newValue) {
    //calcRects(dropzones);
    //}

    dynamicDrop = newValue;

    return interact;
  }
  return dynamicDrop;
};

utils.merge(Interactable.eventTypes, ['dragenter', 'dragleave', 'dropactivate', 'dropdeactivate', 'dropmove', 'drop']);
actions.methodDict.drop = 'dropzone';

defaultOptions.drop = drop.defaults;

module.exports = drop;

},{"../InteractEvent":3,"../Interactable":4,"../Interaction":5,"../defaultOptions":18,"../interact":21,"../scope":33,"../utils":44,"./base":6}],9:[function(require,module,exports){
'use strict';

var actions = require('./base');
var utils = require('../utils');
var InteractEvent = require('../InteractEvent');
var Interactable = require('../Interactable');
var Interaction = require('../Interaction');
var defaultOptions = require('../defaultOptions');

var gesture = {
  defaults: {
    enabled: false,
    origin: null,
    restrict: null
  },

  checker: function checker(pointer, event, interactable, element, interaction) {
    if (interaction.pointerIds.length >= 2) {
      return { name: 'gesture' };
    }

    return null;
  },

  getCursor: function getCursor() {
    return '';
  }
};

InteractEvent.signals.on('new', function (_ref) {
  var iEvent = _ref.iEvent,
      interaction = _ref.interaction;

  if (iEvent.type !== 'gesturestart') {
    return;
  }
  iEvent.ds = 0;

  interaction.gesture.startDistance = interaction.gesture.prevDistance = iEvent.distance;
  interaction.gesture.startAngle = interaction.gesture.prevAngle = iEvent.angle;
  interaction.gesture.scale = 1;
});

InteractEvent.signals.on('new', function (_ref2) {
  var iEvent = _ref2.iEvent,
      interaction = _ref2.interaction;

  if (iEvent.type !== 'gesturemove') {
    return;
  }

  iEvent.ds = iEvent.scale - interaction.gesture.scale;

  interaction.target.fire(iEvent);

  interaction.gesture.prevAngle = iEvent.angle;
  interaction.gesture.prevDistance = iEvent.distance;

  if (iEvent.scale !== Infinity && iEvent.scale !== null && iEvent.scale !== undefined && !isNaN(iEvent.scale)) {

    interaction.gesture.scale = iEvent.scale;
  }
});

/**
 * ```js
 * interact(element).gesturable({
 *     onstart: function (event) {},
 *     onmove : function (event) {},
 *     onend  : function (event) {},
 *
 *     // limit multiple gestures.
 *     // See the explanation in {@link Interactable.draggable} example
 *     max: Infinity,
 *     maxPerElement: 1,
 * });
 *
 * var isGestureable = interact(element).gesturable();
 * ```
 *
 * Gets or sets whether multitouch gestures can be performed on the target
 *
 * @param {boolean | object} [options] true/false or An object with event
 * listeners to be fired on gesture events (makes the Interactable gesturable)
 * @return {boolean | Interactable} A boolean indicating if this can be the
 * target of gesture events, or this Interactable
 */
Interactable.prototype.gesturable = function (options) {
  if (utils.is.object(options)) {
    this.options.gesture.enabled = options.enabled === false ? false : true;
    this.setPerAction('gesture', options);
    this.setOnEvents('gesture', options);

    return this;
  }

  if (utils.is.bool(options)) {
    this.options.gesture.enabled = options;

    if (!options) {
      this.ongesturestart = this.ongesturestart = this.ongestureend = null;
    }

    return this;
  }

  return this.options.gesture;
};

InteractEvent.signals.on('set-delta', function (_ref3) {
  var interaction = _ref3.interaction,
      iEvent = _ref3.iEvent,
      action = _ref3.action,
      event = _ref3.event,
      starting = _ref3.starting,
      ending = _ref3.ending,
      deltaSource = _ref3.deltaSource;

  if (action !== 'gesture') {
    return;
  }

  var pointers = interaction.pointers;

  iEvent.touches = [pointers[0], pointers[1]];

  if (starting) {
    iEvent.distance = utils.touchDistance(pointers, deltaSource);
    iEvent.box = utils.touchBBox(pointers);
    iEvent.scale = 1;
    iEvent.ds = 0;
    iEvent.angle = utils.touchAngle(pointers, undefined, deltaSource);
    iEvent.da = 0;
  } else if (ending || event instanceof InteractEvent) {
    iEvent.distance = interaction.prevEvent.distance;
    iEvent.box = interaction.prevEvent.box;
    iEvent.scale = interaction.prevEvent.scale;
    iEvent.ds = iEvent.scale - 1;
    iEvent.angle = interaction.prevEvent.angle;
    iEvent.da = iEvent.angle - interaction.gesture.startAngle;
  } else {
    iEvent.distance = utils.touchDistance(pointers, deltaSource);
    iEvent.box = utils.touchBBox(pointers);
    iEvent.scale = iEvent.distance / interaction.gesture.startDistance;
    iEvent.angle = utils.touchAngle(pointers, interaction.gesture.prevAngle, deltaSource);

    iEvent.ds = iEvent.scale - interaction.gesture.prevScale;
    iEvent.da = iEvent.angle - interaction.gesture.prevAngle;
  }
});

Interaction.signals.on('new', function (interaction) {
  interaction.gesture = {
    start: { x: 0, y: 0 },

    startDistance: 0, // distance between two touches of touchStart
    prevDistance: 0,
    distance: 0,

    scale: 1, // gesture.distance / gesture.startDistance

    startAngle: 0, // angle of line joining two touches
    prevAngle: 0 // angle of the previous gesture event
  };
});

actions.gesture = gesture;
actions.names.push('gesture');
utils.merge(Interactable.eventTypes, ['gesturestart', 'gesturemove', 'gestureend']);
actions.methodDict.gesture = 'gesturable';

defaultOptions.gesture = gesture.defaults;

module.exports = gesture;

},{"../InteractEvent":3,"../Interactable":4,"../Interaction":5,"../defaultOptions":18,"../utils":44,"./base":6}],10:[function(require,module,exports){
'use strict';

var actions = require('./base');
var utils = require('../utils');
var browser = require('../utils/browser');
var InteractEvent = require('../InteractEvent');
/** @lends Interactable */
var Interactable = require('../Interactable');
var Interaction = require('../Interaction');
var defaultOptions = require('../defaultOptions');

// Less Precision with touch input
var defaultMargin = browser.supportsTouch || browser.supportsPointerEvent ? 20 : 10;

var resize = {
  defaults: {
    enabled: false,
    mouseButtons: null,

    origin: null,
    snap: null,
    restrict: null,
    inertia: null,
    autoScroll: null,

    square: false,
    preserveAspectRatio: false,
    axis: 'xy',

    // use default margin
    margin: NaN,

    // object with props left, right, top, bottom which are
    // true/false values to resize when the pointer is over that edge,
    // CSS selectors to match the handles for each direction
    // or the Elements for each handle
    edges: null,

    // a value of 'none' will limit the resize rect to a minimum of 0x0
    // 'negate' will alow the rect to have negative width/height
    // 'reposition' will keep the width/height positive by swapping
    // the top and bottom edges and/or swapping the left and right edges
    invert: 'none'
  },

  checker: function checker(pointer, event, interactable, element, interaction, rect) {
    if (!rect) {
      return null;
    }

    var page = utils.extend({}, interaction.curCoords.page);
    var options = interactable.options;

    if (options.resize.enabled) {
      var resizeOptions = options.resize;
      var resizeEdges = { left: false, right: false, top: false, bottom: false };

      // if using resize.edges
      if (utils.is.object(resizeOptions.edges)) {
        for (var edge in resizeEdges) {
          resizeEdges[edge] = checkResizeEdge(edge, resizeOptions.edges[edge], page, interaction._eventTarget, element, rect, resizeOptions.margin || defaultMargin);
        }

        resizeEdges.left = resizeEdges.left && !resizeEdges.right;
        resizeEdges.top = resizeEdges.top && !resizeEdges.bottom;

        if (resizeEdges.left || resizeEdges.right || resizeEdges.top || resizeEdges.bottom) {
          return {
            name: 'resize',
            edges: resizeEdges
          };
        }
      } else {
        var right = options.resize.axis !== 'y' && page.x > rect.right - defaultMargin;
        var bottom = options.resize.axis !== 'x' && page.y > rect.bottom - defaultMargin;

        if (right || bottom) {
          return {
            name: 'resize',
            axes: (right ? 'x' : '') + (bottom ? 'y' : '')
          };
        }
      }
    }

    return null;
  },

  cursors: browser.isIe9 ? {
    x: 'e-resize',
    y: 's-resize',
    xy: 'se-resize',

    top: 'n-resize',
    left: 'w-resize',
    bottom: 's-resize',
    right: 'e-resize',
    topleft: 'se-resize',
    bottomright: 'se-resize',
    topright: 'ne-resize',
    bottomleft: 'ne-resize'
  } : {
    x: 'ew-resize',
    y: 'ns-resize',
    xy: 'nwse-resize',

    top: 'ns-resize',
    left: 'ew-resize',
    bottom: 'ns-resize',
    right: 'ew-resize',
    topleft: 'nwse-resize',
    bottomright: 'nwse-resize',
    topright: 'nesw-resize',
    bottomleft: 'nesw-resize'
  },

  getCursor: function getCursor(action) {
    if (action.axis) {
      return resize.cursors[action.name + action.axis];
    } else if (action.edges) {
      var cursorKey = '';
      var edgeNames = ['top', 'bottom', 'left', 'right'];

      for (var i = 0; i < 4; i++) {
        if (action.edges[edgeNames[i]]) {
          cursorKey += edgeNames[i];
        }
      }

      return resize.cursors[cursorKey];
    }
  }
};

// resizestart
InteractEvent.signals.on('new', function (_ref) {
  var iEvent = _ref.iEvent,
      interaction = _ref.interaction;

  if (iEvent.type !== 'resizestart' || !interaction.prepared.edges) {
    return;
  }

  var startRect = interaction.target.getRect(interaction.element);
  var resizeOptions = interaction.target.options.resize;

  /*
   * When using the `resizable.square` or `resizable.preserveAspectRatio` options, resizing from one edge
   * will affect another. E.g. with `resizable.square`, resizing to make the right edge larger will make
   * the bottom edge larger by the same amount. We call these 'linked' edges. Any linked edges will depend
   * on the active edges and the edge being interacted with.
   */
  if (resizeOptions.square || resizeOptions.preserveAspectRatio) {
    var linkedEdges = utils.extend({}, interaction.prepared.edges);

    linkedEdges.top = linkedEdges.top || linkedEdges.left && !linkedEdges.bottom;
    linkedEdges.left = linkedEdges.left || linkedEdges.top && !linkedEdges.right;
    linkedEdges.bottom = linkedEdges.bottom || linkedEdges.right && !linkedEdges.top;
    linkedEdges.right = linkedEdges.right || linkedEdges.bottom && !linkedEdges.left;

    interaction.prepared._linkedEdges = linkedEdges;
  } else {
    interaction.prepared._linkedEdges = null;
  }

  // if using `resizable.preserveAspectRatio` option, record aspect ratio at the start of the resize
  if (resizeOptions.preserveAspectRatio) {
    interaction.resizeStartAspectRatio = startRect.width / startRect.height;
  }

  interaction.resizeRects = {
    start: startRect,
    current: utils.extend({}, startRect),
    inverted: utils.extend({}, startRect),
    previous: utils.extend({}, startRect),
    delta: {
      left: 0, right: 0, width: 0,
      top: 0, bottom: 0, height: 0
    }
  };

  iEvent.rect = interaction.resizeRects.inverted;
  iEvent.deltaRect = interaction.resizeRects.delta;
});

// resizemove
InteractEvent.signals.on('new', function (_ref2) {
  var iEvent = _ref2.iEvent,
      phase = _ref2.phase,
      interaction = _ref2.interaction;

  if (phase !== 'move' || !interaction.prepared.edges) {
    return;
  }

  var resizeOptions = interaction.target.options.resize;
  var invert = resizeOptions.invert;
  var invertible = invert === 'reposition' || invert === 'negate';

  var edges = interaction.prepared.edges;

  var start = interaction.resizeRects.start;
  var current = interaction.resizeRects.current;
  var inverted = interaction.resizeRects.inverted;
  var delta = interaction.resizeRects.delta;
  var previous = utils.extend(interaction.resizeRects.previous, inverted);
  var originalEdges = edges;

  var dx = iEvent.dx;
  var dy = iEvent.dy;

  if (resizeOptions.preserveAspectRatio || resizeOptions.square) {
    // `resize.preserveAspectRatio` takes precedence over `resize.square`
    var startAspectRatio = resizeOptions.preserveAspectRatio ? interaction.resizeStartAspectRatio : 1;

    edges = interaction.prepared._linkedEdges;

    if (originalEdges.left && originalEdges.bottom || originalEdges.right && originalEdges.top) {
      dy = -dx / startAspectRatio;
    } else if (originalEdges.left || originalEdges.right) {
      dy = dx / startAspectRatio;
    } else if (originalEdges.top || originalEdges.bottom) {
      dx = dy * startAspectRatio;
    }
  }

  // update the 'current' rect without modifications
  if (edges.top) {
    current.top += dy;
  }
  if (edges.bottom) {
    current.bottom += dy;
  }
  if (edges.left) {
    current.left += dx;
  }
  if (edges.right) {
    current.right += dx;
  }

  if (invertible) {
    // if invertible, copy the current rect
    utils.extend(inverted, current);

    if (invert === 'reposition') {
      // swap edge values if necessary to keep width/height positive
      var swap = void 0;

      if (inverted.top > inverted.bottom) {
        swap = inverted.top;

        inverted.top = inverted.bottom;
        inverted.bottom = swap;
      }
      if (inverted.left > inverted.right) {
        swap = inverted.left;

        inverted.left = inverted.right;
        inverted.right = swap;
      }
    }
  } else {
    // if not invertible, restrict to minimum of 0x0 rect
    inverted.top = Math.min(current.top, start.bottom);
    inverted.bottom = Math.max(current.bottom, start.top);
    inverted.left = Math.min(current.left, start.right);
    inverted.right = Math.max(current.right, start.left);
  }

  inverted.width = inverted.right - inverted.left;
  inverted.height = inverted.bottom - inverted.top;

  for (var edge in inverted) {
    delta[edge] = inverted[edge] - previous[edge];
  }

  iEvent.edges = interaction.prepared.edges;
  iEvent.rect = inverted;
  iEvent.deltaRect = delta;
});

/**
 * ```js
 * interact(element).resizable({
 *   onstart: function (event) {},
 *   onmove : function (event) {},
 *   onend  : function (event) {},
 *
 *   edges: {
 *     top   : true,       // Use pointer coords to check for resize.
 *     left  : false,      // Disable resizing from left edge.
 *     bottom: '.resize-s',// Resize if pointer target matches selector
 *     right : handleEl    // Resize if pointer target is the given Element
 *   },
 *
 *     // Width and height can be adjusted independently. When `true`, width and
 *     // height are adjusted at a 1:1 ratio.
 *     square: false,
 *
 *     // Width and height can be adjusted independently. When `true`, width and
 *     // height maintain the aspect ratio they had when resizing started.
 *     preserveAspectRatio: false,
 *
 *   // a value of 'none' will limit the resize rect to a minimum of 0x0
 *   // 'negate' will allow the rect to have negative width/height
 *   // 'reposition' will keep the width/height positive by swapping
 *   // the top and bottom edges and/or swapping the left and right edges
 *   invert: 'none' || 'negate' || 'reposition'
 *
 *   // limit multiple resizes.
 *   // See the explanation in the {@link Interactable.draggable} example
 *   max: Infinity,
 *   maxPerElement: 1,
 * });
 *
 * var isResizeable = interact(element).resizable();
 * ```
 *
 * Gets or sets whether resize actions can be performed on the target
 *
 * @param {boolean | object} [options] true/false or An object with event
 * listeners to be fired on resize events (object makes the Interactable
 * resizable)
 * @return {boolean | Interactable} A boolean indicating if this can be the
 * target of resize elements, or this Interactable
 */
Interactable.prototype.resizable = function (options) {
  if (utils.is.object(options)) {
    this.options.resize.enabled = options.enabled === false ? false : true;
    this.setPerAction('resize', options);
    this.setOnEvents('resize', options);

    if (/^x$|^y$|^xy$/.test(options.axis)) {
      this.options.resize.axis = options.axis;
    } else if (options.axis === null) {
      this.options.resize.axis = defaultOptions.resize.axis;
    }

    if (utils.is.bool(options.preserveAspectRatio)) {
      this.options.resize.preserveAspectRatio = options.preserveAspectRatio;
    } else if (utils.is.bool(options.square)) {
      this.options.resize.square = options.square;
    }

    return this;
  }
  if (utils.is.bool(options)) {
    this.options.resize.enabled = options;

    if (!options) {
      this.onresizestart = this.onresizestart = this.onresizeend = null;
    }

    return this;
  }
  return this.options.resize;
};

function checkResizeEdge(name, value, page, element, interactableElement, rect, margin) {
  // false, '', undefined, null
  if (!value) {
    return false;
  }

  // true value, use pointer coords and element rect
  if (value === true) {
    // if dimensions are negative, "switch" edges
    var width = utils.is.number(rect.width) ? rect.width : rect.right - rect.left;
    var height = utils.is.number(rect.height) ? rect.height : rect.bottom - rect.top;

    if (width < 0) {
      if (name === 'left') {
        name = 'right';
      } else if (name === 'right') {
        name = 'left';
      }
    }
    if (height < 0) {
      if (name === 'top') {
        name = 'bottom';
      } else if (name === 'bottom') {
        name = 'top';
      }
    }

    if (name === 'left') {
      return page.x < (width >= 0 ? rect.left : rect.right) + margin;
    }
    if (name === 'top') {
      return page.y < (height >= 0 ? rect.top : rect.bottom) + margin;
    }

    if (name === 'right') {
      return page.x > (width >= 0 ? rect.right : rect.left) - margin;
    }
    if (name === 'bottom') {
      return page.y > (height >= 0 ? rect.bottom : rect.top) - margin;
    }
  }

  // the remaining checks require an element
  if (!utils.is.element(element)) {
    return false;
  }

  return utils.is.element(value)
  // the value is an element to use as a resize handle
  ? value === element
  // otherwise check if element matches value as selector
  : utils.matchesUpTo(element, value, interactableElement);
}

Interaction.signals.on('new', function (interaction) {
  interaction.resizeAxes = 'xy';
});

InteractEvent.signals.on('set-delta', function (_ref3) {
  var interaction = _ref3.interaction,
      iEvent = _ref3.iEvent,
      action = _ref3.action;

  if (action !== 'resize' || !interaction.resizeAxes) {
    return;
  }

  var options = interaction.target.options;

  if (options.resize.square) {
    if (interaction.resizeAxes === 'y') {
      iEvent.dx = iEvent.dy;
    } else {
      iEvent.dy = iEvent.dx;
    }
    iEvent.axes = 'xy';
  } else {
    iEvent.axes = interaction.resizeAxes;

    if (interaction.resizeAxes === 'x') {
      iEvent.dy = 0;
    } else if (interaction.resizeAxes === 'y') {
      iEvent.dx = 0;
    }
  }
});

actions.resize = resize;
actions.names.push('resize');
utils.merge(Interactable.eventTypes, ['resizestart', 'resizemove', 'resizeinertiastart', 'resizeinertiaresume', 'resizeend']);
actions.methodDict.resize = 'resizable';

defaultOptions.resize = resize.defaults;

module.exports = resize;

},{"../InteractEvent":3,"../Interactable":4,"../Interaction":5,"../defaultOptions":18,"../utils":44,"../utils/browser":36,"./base":6}],11:[function(require,module,exports){
'use strict';

var raf = require('./utils/raf');
var getWindow = require('./utils/window').getWindow;
var is = require('./utils/is');
var domUtils = require('./utils/domUtils');
var Interaction = require('./Interaction');
var defaultOptions = require('./defaultOptions');

var autoScroll = {
  defaults: {
    enabled: false,
    container: null, // the item that is scrolled (Window or HTMLElement)
    margin: 60,
    speed: 300 // the scroll speed in pixels per second
  },

  interaction: null,
  i: null, // the handle returned by window.setInterval
  x: 0, y: 0, // Direction each pulse is to scroll in

  isScrolling: false,
  prevTime: 0,

  start: function start(interaction) {
    autoScroll.isScrolling = true;
    raf.cancel(autoScroll.i);

    autoScroll.interaction = interaction;
    autoScroll.prevTime = new Date().getTime();
    autoScroll.i = raf.request(autoScroll.scroll);
  },

  stop: function stop() {
    autoScroll.isScrolling = false;
    raf.cancel(autoScroll.i);
  },

  // scroll the window by the values in scroll.x/y
  scroll: function scroll() {
    var options = autoScroll.interaction.target.options[autoScroll.interaction.prepared.name].autoScroll;
    var container = options.container || getWindow(autoScroll.interaction.element);
    var now = new Date().getTime();
    // change in time in seconds
    var dt = (now - autoScroll.prevTime) / 1000;
    // displacement
    var s = options.speed * dt;

    if (s >= 1) {
      if (is.window(container)) {
        container.scrollBy(autoScroll.x * s, autoScroll.y * s);
      } else if (container) {
        container.scrollLeft += autoScroll.x * s;
        container.scrollTop += autoScroll.y * s;
      }

      autoScroll.prevTime = now;
    }

    if (autoScroll.isScrolling) {
      raf.cancel(autoScroll.i);
      autoScroll.i = raf.request(autoScroll.scroll);
    }
  },
  check: function check(interactable, actionName) {
    var options = interactable.options;

    return options[actionName].autoScroll && options[actionName].autoScroll.enabled;
  },
  onInteractionMove: function onInteractionMove(_ref) {
    var interaction = _ref.interaction,
        pointer = _ref.pointer;

    if (!(interaction.interacting() && autoScroll.check(interaction.target, interaction.prepared.name))) {
      return;
    }

    if (interaction.simulation) {
      autoScroll.x = autoScroll.y = 0;
      return;
    }

    var top = void 0;
    var right = void 0;
    var bottom = void 0;
    var left = void 0;

    var options = interaction.target.options[interaction.prepared.name].autoScroll;
    var container = options.container || getWindow(interaction.element);

    if (is.window(container)) {
      left = pointer.clientX < autoScroll.margin;
      top = pointer.clientY < autoScroll.margin;
      right = pointer.clientX > container.innerWidth - autoScroll.margin;
      bottom = pointer.clientY > container.innerHeight - autoScroll.margin;
    } else {
      var rect = domUtils.getElementClientRect(container);

      left = pointer.clientX < rect.left + autoScroll.margin;
      top = pointer.clientY < rect.top + autoScroll.margin;
      right = pointer.clientX > rect.right - autoScroll.margin;
      bottom = pointer.clientY > rect.bottom - autoScroll.margin;
    }

    autoScroll.x = right ? 1 : left ? -1 : 0;
    autoScroll.y = bottom ? 1 : top ? -1 : 0;

    if (!autoScroll.isScrolling) {
      // set the autoScroll properties to those of the target
      autoScroll.margin = options.margin;
      autoScroll.speed = options.speed;

      autoScroll.start(interaction);
    }
  }
};

Interaction.signals.on('stop-active', function () {
  autoScroll.stop();
});

Interaction.signals.on('action-move', autoScroll.onInteractionMove);

defaultOptions.perAction.autoScroll = autoScroll.defaults;

module.exports = autoScroll;

},{"./Interaction":5,"./defaultOptions":18,"./utils/domUtils":39,"./utils/is":46,"./utils/raf":50,"./utils/window":52}],12:[function(require,module,exports){
'use strict';

/** @lends Interactable */
var Interactable = require('../Interactable');
var actions = require('../actions/base');
var is = require('../utils/is');
var domUtils = require('../utils/domUtils');

var _require = require('../utils'),
    warnOnce = _require.warnOnce;

Interactable.prototype.getAction = function (pointer, event, interaction, element) {
  var action = this.defaultActionChecker(pointer, event, interaction, element);

  if (this.options.actionChecker) {
    return this.options.actionChecker(pointer, event, action, this, element, interaction);
  }

  return action;
};

/**
 * ```js
 * interact(element, { ignoreFrom: document.getElementById('no-action') });
 * // or
 * interact(element).ignoreFrom('input, textarea, a');
 * ```
 * @deprecated
 * If the target of the `mousedown`, `pointerdown` or `touchstart` event or any
 * of it's parents match the given CSS selector or Element, no
 * drag/resize/gesture is started.
 *
 * Don't use this method. Instead set the `ignoreFrom` option for each action
 * or for `pointerEvents`
 *
 * @example
 * interact(targett)
 *   .draggable({
 *     ignoreFrom: 'input, textarea, a[href]'',
 *   })
 *   .pointerEvents({
 *     ignoreFrom: '[no-pointer]',
 *   });
 *
 * @param {string | Element | null} [newValue] a CSS selector string, an
 * Element or `null` to not ignore any elements
 * @return {string | Element | object} The current ignoreFrom value or this
 * Interactable
 */
Interactable.prototype.ignoreFrom = warnOnce(function (newValue) {
  return this._backCompatOption('ignoreFrom', newValue);
}, 'Interactable.ignoreForm() has been deprecated. Use Interactble.draggable({ignoreFrom: newValue}).');

/**
 * ```js
 *
 * @deprecated
 * A drag/resize/gesture is started only If the target of the `mousedown`,
 * `pointerdown` or `touchstart` event or any of it's parents match the given
 * CSS selector or Element.
 *
 * Don't use this method. Instead set the `allowFrom` option for each action
 * or for `pointerEvents`
 *
 * @example
 * interact(targett)
 *   .resizable({
 *     allowFrom: '.resize-handle',
 *   .pointerEvents({
 *     allowFrom: '.handle',,
 *   });
 *
 * @param {string | Element | null} [newValue] a CSS selector string, an
 * Element or `null` to allow from any element
 * @return {string | Element | object} The current allowFrom value or this
 * Interactable
 */
Interactable.prototype.allowFrom = warnOnce(function (newValue) {
  return this._backCompatOption('allowFrom', newValue);
}, 'Interactable.allowForm() has been deprecated. Use Interactble.draggable({allowFrom: newValue}).');

Interactable.prototype.testIgnore = function (ignoreFrom, interactableElement, element) {
  if (!ignoreFrom || !is.element(element)) {
    return false;
  }

  if (is.string(ignoreFrom)) {
    return domUtils.matchesUpTo(element, ignoreFrom, interactableElement);
  } else if (is.element(ignoreFrom)) {
    return domUtils.nodeContains(ignoreFrom, element);
  }

  return false;
};

Interactable.prototype.testAllow = function (allowFrom, interactableElement, element) {
  if (!allowFrom) {
    return true;
  }

  if (!is.element(element)) {
    return false;
  }

  if (is.string(allowFrom)) {
    return domUtils.matchesUpTo(element, allowFrom, interactableElement);
  } else if (is.element(allowFrom)) {
    return domUtils.nodeContains(allowFrom, element);
  }

  return false;
};

Interactable.prototype.testIgnoreAllow = function (options, interactableElement, eventTarget) {
  return !this.testIgnore(options.ignoreFrom, interactableElement, eventTarget) && this.testAllow(options.allowFrom, interactableElement, eventTarget);
};

/**
 * ```js
 * interact('.resize-drag')
 *   .resizable(true)
 *   .draggable(true)
 *   .actionChecker(function (pointer, event, action, interactable, element, interaction) {
 *
 *   if (interact.matchesSelector(event.target, '.drag-handle') {
 *     // force drag with handle target
 *     action.name = drag;
 *   }
 *   else {
 *     // resize from the top and right edges
 *     action.name  = 'resize';
 *     action.edges = { top: true, right: true };
 *   }
 *
 *   return action;
 * });
 * ```
 *
 * Gets or sets the function used to check action to be performed on
 * pointerDown
 *
 * @param {function | null} [checker] A function which takes a pointer event,
 * defaultAction string, interactable, element and interaction as parameters
 * and returns an object with name property 'drag' 'resize' or 'gesture' and
 * optionally an `edges` object with boolean 'top', 'left', 'bottom' and right
 * props.
 * @return {Function | Interactable} The checker function or this Interactable
 */
Interactable.prototype.actionChecker = function (checker) {
  if (is.function(checker)) {
    this.options.actionChecker = checker;

    return this;
  }

  if (checker === null) {
    delete this.options.actionChecker;

    return this;
  }

  return this.options.actionChecker;
};

/**
 * Returns or sets whether the the cursor should be changed depending on the
 * action that would be performed if the mouse were pressed and dragged.
 *
 * @param {boolean} [newValue]
 * @return {boolean | Interactable} The current setting or this Interactable
 */
Interactable.prototype.styleCursor = function (newValue) {
  if (is.bool(newValue)) {
    this.options.styleCursor = newValue;

    return this;
  }

  if (newValue === null) {
    delete this.options.styleCursor;

    return this;
  }

  return this.options.styleCursor;
};

Interactable.prototype.defaultActionChecker = function (pointer, event, interaction, element) {
  var rect = this.getRect(element);
  var buttons = event.buttons || {
    0: 1,
    1: 4,
    3: 8,
    4: 16
  }[event.button];
  var action = null;

  for (var _i = 0; _i < actions.names.length; _i++) {
    var _ref;

    _ref = actions.names[_i];
    var actionName = _ref;

    // check mouseButton setting if the pointer is down
    if (interaction.pointerIsDown && /mouse|pointer/.test(interaction.pointerType) && (buttons & this.options[actionName].mouseButtons) === 0) {
      continue;
    }

    action = actions[actionName].checker(pointer, event, this, element, interaction, rect);

    if (action) {
      return action;
    }
  }
};

},{"../Interactable":4,"../actions/base":6,"../utils":44,"../utils/domUtils":39,"../utils/is":46}],13:[function(require,module,exports){
'use strict';

var interact = require('../interact');
var Interactable = require('../Interactable');
var Interaction = require('../Interaction');
var actions = require('../actions/base');
var defaultOptions = require('../defaultOptions');
var scope = require('../scope');
var utils = require('../utils');
var signals = require('../utils/Signals').new();

require('./InteractableMethods');

var autoStart = {
  signals: signals,
  withinInteractionLimit: withinInteractionLimit,
  // Allow this many interactions to happen simultaneously
  maxInteractions: Infinity,
  defaults: {
    perAction: {
      manualStart: false,
      max: Infinity,
      maxPerElement: 1,
      allowFrom: null,
      ignoreFrom: null,

      // only allow left button by default
      // see https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/buttons#Return_value
      mouseButtons: 1
    }
  },
  setActionDefaults: function setActionDefaults(action) {
    utils.extend(action.defaults, autoStart.defaults.perAction);
  },
  validateAction: validateAction
};

// set cursor style on mousedown
Interaction.signals.on('down', function (_ref) {
  var interaction = _ref.interaction,
      pointer = _ref.pointer,
      event = _ref.event,
      eventTarget = _ref.eventTarget;

  if (interaction.interacting()) {
    return;
  }

  var actionInfo = getActionInfo(interaction, pointer, event, eventTarget);
  prepare(interaction, actionInfo);
});

// set cursor style on mousemove
Interaction.signals.on('move', function (_ref2) {
  var interaction = _ref2.interaction,
      pointer = _ref2.pointer,
      event = _ref2.event,
      eventTarget = _ref2.eventTarget;

  if (interaction.pointerType !== 'mouse' || interaction.pointerIsDown || interaction.interacting()) {
    return;
  }

  var actionInfo = getActionInfo(interaction, pointer, event, eventTarget);
  prepare(interaction, actionInfo);
});

Interaction.signals.on('move', function (arg) {
  var interaction = arg.interaction,
      event = arg.event;


  if (!interaction.pointerIsDown || interaction.interacting() || !interaction.pointerWasMoved || !interaction.prepared.name) {
    return;
  }

  signals.fire('before-start', arg);

  var target = interaction.target;

  if (interaction.prepared.name && target) {
    // check manualStart and interaction limit
    if (target.options[interaction.prepared.name].manualStart || !withinInteractionLimit(target, interaction.element, interaction.prepared)) {
      interaction.stop(event);
    } else {
      interaction.start(interaction.prepared, target, interaction.element);
    }
  }
});

// Check if the current target supports the action.
// If so, return the validated action. Otherwise, return null
function validateAction(action, interactable, element, eventTarget) {
  if (utils.is.object(action) && interactable.testIgnoreAllow(interactable.options[action.name], element, eventTarget) && interactable.options[action.name].enabled && withinInteractionLimit(interactable, element, action)) {
    return action;
  }

  return null;
}

function validateSelector(interaction, pointer, event, matches, matchElements, eventTarget) {
  for (var i = 0, len = matches.length; i < len; i++) {
    var match = matches[i];
    var matchElement = matchElements[i];
    var action = validateAction(match.getAction(pointer, event, interaction, matchElement), match, matchElement, eventTarget);

    if (action) {
      return {
        action: action,
        target: match,
        element: matchElement
      };
    }
  }

  return {};
}

function getActionInfo(interaction, pointer, event, eventTarget) {
  var matches = [];
  var matchElements = [];

  var element = eventTarget;

  function pushMatches(interactable) {
    matches.push(interactable);
    matchElements.push(element);
  }

  while (utils.is.element(element)) {
    matches = [];
    matchElements = [];

    scope.interactables.forEachMatch(element, pushMatches);

    var actionInfo = validateSelector(interaction, pointer, event, matches, matchElements, eventTarget);

    if (actionInfo.action && !actionInfo.target.options[actionInfo.action.name].manualStart) {
      return actionInfo;
    }

    element = utils.parentNode(element);
  }

  return {};
}

function prepare(interaction, _ref3) {
  var action = _ref3.action,
      target = _ref3.target,
      element = _ref3.element;

  action = action || {};

  if (interaction.target && interaction.target.options.styleCursor) {
    interaction.target._doc.documentElement.style.cursor = '';
  }

  interaction.target = target;
  interaction.element = element;
  utils.copyAction(interaction.prepared, action);

  if (target && target.options.styleCursor) {
    var cursor = action ? actions[action.name].getCursor(action) : '';
    interaction.target._doc.documentElement.style.cursor = cursor;
  }

  signals.fire('prepared', { interaction: interaction });
}

Interaction.signals.on('stop', function (_ref4) {
  var interaction = _ref4.interaction;

  var target = interaction.target;

  if (target && target.options.styleCursor) {
    target._doc.documentElement.style.cursor = '';
  }
});

function withinInteractionLimit(interactable, element, action) {
  var options = interactable.options;
  var maxActions = options[action.name].max;
  var maxPerElement = options[action.name].maxPerElement;
  var activeInteractions = 0;
  var targetCount = 0;
  var targetElementCount = 0;

  // no actions if any of these values == 0
  if (!(maxActions && maxPerElement && autoStart.maxInteractions)) {
    return;
  }

  for (var _i = 0; _i < scope.interactions.length; _i++) {
    var _ref5;

    _ref5 = scope.interactions[_i];
    var interaction = _ref5;

    var otherAction = interaction.prepared.name;

    if (!interaction.interacting()) {
      continue;
    }

    activeInteractions++;

    if (activeInteractions >= autoStart.maxInteractions) {
      return false;
    }

    if (interaction.target !== interactable) {
      continue;
    }

    targetCount += otherAction === action.name | 0;

    if (targetCount >= maxActions) {
      return false;
    }

    if (interaction.element === element) {
      targetElementCount++;

      if (otherAction !== action.name || targetElementCount >= maxPerElement) {
        return false;
      }
    }
  }

  return autoStart.maxInteractions > 0;
}

/**
 * Returns or sets the maximum number of concurrent interactions allowed.  By
 * default only 1 interaction is allowed at a time (for backwards
 * compatibility). To allow multiple interactions on the same Interactables and
 * elements, you need to enable it in the draggable, resizable and gesturable
 * `'max'` and `'maxPerElement'` options.
 *
 * @alias module:interact.maxInteractions
 *
 * @param {number} [newValue] Any number. newValue <= 0 means no interactions.
 */
interact.maxInteractions = function (newValue) {
  if (utils.is.number(newValue)) {
    autoStart.maxInteractions = newValue;

    return interact;
  }

  return autoStart.maxInteractions;
};

Interactable.settingsMethods.push('styleCursor');
Interactable.settingsMethods.push('actionChecker');
Interactable.settingsMethods.push('ignoreFrom');
Interactable.settingsMethods.push('allowFrom');

defaultOptions.base.actionChecker = null;
defaultOptions.base.styleCursor = true;

utils.extend(defaultOptions.perAction, autoStart.defaults.perAction);

module.exports = autoStart;

},{"../Interactable":4,"../Interaction":5,"../actions/base":6,"../defaultOptions":18,"../interact":21,"../scope":33,"../utils":44,"../utils/Signals":34,"./InteractableMethods":12}],14:[function(require,module,exports){
'use strict';

var autoStart = require('./base');
var scope = require('../scope');
var is = require('../utils/is');

var _require = require('../utils/domUtils'),
    parentNode = _require.parentNode;

autoStart.setActionDefaults(require('../actions/drag'));

autoStart.signals.on('before-start', function (_ref) {
  var interaction = _ref.interaction,
      eventTarget = _ref.eventTarget,
      dx = _ref.dx,
      dy = _ref.dy;

  if (interaction.prepared.name !== 'drag') {
    return;
  }

  // check if a drag is in the correct axis
  var absX = Math.abs(dx);
  var absY = Math.abs(dy);
  var targetOptions = interaction.target.options.drag;
  var startAxis = targetOptions.startAxis;
  var currentAxis = absX > absY ? 'x' : absX < absY ? 'y' : 'xy';

  interaction.prepared.axis = targetOptions.lockAxis === 'start' ? currentAxis[0] // always lock to one axis even if currentAxis === 'xy'
  : targetOptions.lockAxis;

  // if the movement isn't in the startAxis of the interactable
  if (currentAxis !== 'xy' && startAxis !== 'xy' && startAxis !== currentAxis) {
    // cancel the prepared action
    interaction.prepared.name = null;

    // then try to get a drag from another ineractable
    var element = eventTarget;

    var getDraggable = function getDraggable(interactable) {
      if (interactable === interaction.target) {
        return;
      }

      var options = interaction.target.options.drag;

      if (!options.manualStart && interactable.testIgnoreAllow(options, element, eventTarget)) {

        var action = interactable.getAction(interaction.downPointer, interaction.downEvent, interaction, element);

        if (action && action.name === 'drag' && checkStartAxis(currentAxis, interactable) && autoStart.validateAction(action, interactable, element, eventTarget)) {

          return interactable;
        }
      }
    };

    // check all interactables
    while (is.element(element)) {
      var interactable = scope.interactables.forEachMatch(element, getDraggable);

      if (interactable) {
        interaction.prepared.name = 'drag';
        interaction.target = interactable;
        interaction.element = element;
        break;
      }

      element = parentNode(element);
    }
  }
});

function checkStartAxis(startAxis, interactable) {
  if (!interactable) {
    return false;
  }

  var thisAxis = interactable.options.drag.startAxis;

  return startAxis === 'xy' || thisAxis === 'xy' || thisAxis === startAxis;
}

},{"../actions/drag":7,"../scope":33,"../utils/domUtils":39,"../utils/is":46,"./base":13}],15:[function(require,module,exports){
'use strict';

require('./base').setActionDefaults(require('../actions/gesture'));

},{"../actions/gesture":9,"./base":13}],16:[function(require,module,exports){
'use strict';

var autoStart = require('./base');
var Interaction = require('../Interaction');

autoStart.defaults.perAction.hold = 0;
autoStart.defaults.perAction.delay = 0;

Interaction.signals.on('new', function (interaction) {
  interaction.autoStartHoldTimer = null;
});

autoStart.signals.on('prepared', function (_ref) {
  var interaction = _ref.interaction;

  var hold = getHoldDuration(interaction);

  if (hold > 0) {
    interaction.autoStartHoldTimer = setTimeout(function () {
      interaction.start(interaction.prepared, interaction.target, interaction.element);
    }, hold);
  }
});

Interaction.signals.on('move', function (_ref2) {
  var interaction = _ref2.interaction,
      duplicate = _ref2.duplicate;

  if (interaction.pointerWasMoved && !duplicate) {
    clearTimeout(interaction.autoStartHoldTimer);
  }
});

// prevent regular down->move autoStart
autoStart.signals.on('before-start', function (_ref3) {
  var interaction = _ref3.interaction;

  var hold = getHoldDuration(interaction);

  if (hold > 0) {
    interaction.prepared.name = null;
  }
});

function getHoldDuration(interaction) {
  var actionName = interaction.prepared && interaction.prepared.name;

  if (!actionName) {
    return null;
  }

  var options = interaction.target.options;

  return options[actionName].hold || options[actionName].delay;
}

module.exports = {
  getHoldDuration: getHoldDuration
};

},{"../Interaction":5,"./base":13}],17:[function(require,module,exports){
'use strict';

require('./base').setActionDefaults(require('../actions/resize'));

},{"../actions/resize":10,"./base":13}],18:[function(require,module,exports){
'use strict';

module.exports = {
  base: {
    accept: null,
    preventDefault: 'auto',
    deltaSource: 'page'
  },

  perAction: {
    origin: { x: 0, y: 0 },

    inertia: {
      enabled: false,
      resistance: 10, // the lambda in exponential decay
      minSpeed: 100, // target speed must be above this for inertia to start
      endSpeed: 10, // the speed at which inertia is slow enough to stop
      allowResume: true, // allow resuming an action in inertia phase
      smoothEndDuration: 300 // animate to snap/restrict endOnly if there's no inertia
    }
  }
};

},{}],19:[function(require,module,exports){
'use strict';

/* browser entry point */

// inertia
require('./inertia');

// modifiers
require('./modifiers/snap');
require('./modifiers/restrict');

// pointerEvents
require('./pointerEvents/base');
require('./pointerEvents/holdRepeat');
require('./pointerEvents/interactableTargets');

// autoStart hold
require('./autoStart/hold');

// actions
require('./actions/gesture');
require('./actions/resize');
require('./actions/drag');
require('./actions/drop');

// load these modifiers after resize is loaded
require('./modifiers/snapSize');
require('./modifiers/restrictEdges');
require('./modifiers/restrictSize');

// autoStart actions
require('./autoStart/gesture');
require('./autoStart/resize');
require('./autoStart/drag');

// Interactable preventDefault setting
require('./interactablePreventDefault.js');

// autoScroll
require('./autoScroll');

// export interact
module.exports = require('./interact');

},{"./actions/drag":7,"./actions/drop":8,"./actions/gesture":9,"./actions/resize":10,"./autoScroll":11,"./autoStart/drag":14,"./autoStart/gesture":15,"./autoStart/hold":16,"./autoStart/resize":17,"./inertia":20,"./interact":21,"./interactablePreventDefault.js":22,"./modifiers/restrict":24,"./modifiers/restrictEdges":25,"./modifiers/restrictSize":26,"./modifiers/snap":27,"./modifiers/snapSize":28,"./pointerEvents/base":30,"./pointerEvents/holdRepeat":31,"./pointerEvents/interactableTargets":32}],20:[function(require,module,exports){
'use strict';

var InteractEvent = require('./InteractEvent');
var Interaction = require('./Interaction');
var modifiers = require('./modifiers/base');
var utils = require('./utils');
var animationFrame = require('./utils/raf');

Interaction.signals.on('new', function (interaction) {
  interaction.inertiaStatus = {
    active: false,
    smoothEnd: false,
    allowResume: false,

    startEvent: null,
    upCoords: {},

    xe: 0, ye: 0,
    sx: 0, sy: 0,

    t0: 0,
    vx0: 0, vys: 0,
    duration: 0,

    lambda_v0: 0,
    one_ve_v0: 0,
    i: null
  };

  interaction.boundInertiaFrame = function () {
    return inertiaFrame.apply(interaction);
  };
  interaction.boundSmoothEndFrame = function () {
    return smoothEndFrame.apply(interaction);
  };
});

Interaction.signals.on('down', function (_ref) {
  var interaction = _ref.interaction,
      event = _ref.event,
      pointer = _ref.pointer,
      eventTarget = _ref.eventTarget;

  var status = interaction.inertiaStatus;

  // Check if the down event hits the current inertia target
  if (status.active) {
    var element = eventTarget;

    // climb up the DOM tree from the event target
    while (utils.is.element(element)) {

      // if interaction element is the current inertia target element
      if (element === interaction.element) {
        // stop inertia
        animationFrame.cancel(status.i);
        status.active = false;
        interaction.simulation = null;

        // update pointers to the down event's coordinates
        interaction.updatePointer(pointer);
        utils.setCoords(interaction.curCoords, interaction.pointers);

        // fire appropriate signals
        var signalArg = { interaction: interaction };
        Interaction.signals.fire('before-action-move', signalArg);
        Interaction.signals.fire('action-resume', signalArg);

        // fire a reume event
        var resumeEvent = new InteractEvent(interaction, event, interaction.prepared.name, 'inertiaresume', interaction.element);

        interaction.target.fire(resumeEvent);
        interaction.prevEvent = resumeEvent;
        modifiers.resetStatuses(interaction.modifierStatuses);

        utils.copyCoords(interaction.prevCoords, interaction.curCoords);
        break;
      }

      element = utils.parentNode(element);
    }
  }
});

Interaction.signals.on('up', function (_ref2) {
  var interaction = _ref2.interaction,
      event = _ref2.event;

  var status = interaction.inertiaStatus;

  if (!interaction.interacting() || status.active) {
    return;
  }

  var target = interaction.target;
  var options = target && target.options;
  var inertiaOptions = options && interaction.prepared.name && options[interaction.prepared.name].inertia;

  var now = new Date().getTime();
  var statuses = {};
  var page = utils.extend({}, interaction.curCoords.page);
  var pointerSpeed = interaction.pointerDelta.client.speed;

  var smoothEnd = false;
  var modifierResult = void 0;

  // check if inertia should be started
  var inertiaPossible = inertiaOptions && inertiaOptions.enabled && interaction.prepared.name !== 'gesture' && event !== status.startEvent;

  var inertia = inertiaPossible && now - interaction.curCoords.timeStamp < 50 && pointerSpeed > inertiaOptions.minSpeed && pointerSpeed > inertiaOptions.endSpeed;

  var modifierArg = {
    interaction: interaction,
    pageCoords: page,
    statuses: statuses,
    preEnd: true,
    requireEndOnly: true
  };

  // smoothEnd
  if (inertiaPossible && !inertia) {
    modifiers.resetStatuses(statuses);

    modifierResult = modifiers.setAll(modifierArg);

    if (modifierResult.shouldMove && modifierResult.locked) {
      smoothEnd = true;
    }
  }

  if (!(inertia || smoothEnd)) {
    return;
  }

  utils.copyCoords(status.upCoords, interaction.curCoords);

  interaction.pointers[0] = status.startEvent = new InteractEvent(interaction, event, interaction.prepared.name, 'inertiastart', interaction.element);

  status.t0 = now;

  status.active = true;
  status.allowResume = inertiaOptions.allowResume;
  interaction.simulation = status;

  target.fire(status.startEvent);

  if (inertia) {
    status.vx0 = interaction.pointerDelta.client.vx;
    status.vy0 = interaction.pointerDelta.client.vy;
    status.v0 = pointerSpeed;

    calcInertia(interaction, status);

    utils.extend(page, interaction.curCoords.page);

    page.x += status.xe;
    page.y += status.ye;

    modifiers.resetStatuses(statuses);

    modifierResult = modifiers.setAll(modifierArg);

    status.modifiedXe += modifierResult.dx;
    status.modifiedYe += modifierResult.dy;

    status.i = animationFrame.request(interaction.boundInertiaFrame);
  } else {
    status.smoothEnd = true;
    status.xe = modifierResult.dx;
    status.ye = modifierResult.dy;

    status.sx = status.sy = 0;

    status.i = animationFrame.request(interaction.boundSmoothEndFrame);
  }
});

Interaction.signals.on('stop-active', function (_ref3) {
  var interaction = _ref3.interaction;

  var status = interaction.inertiaStatus;

  if (status.active) {
    animationFrame.cancel(status.i);
    status.active = false;
    interaction.simulation = null;
  }
});

function calcInertia(interaction, status) {
  var inertiaOptions = interaction.target.options[interaction.prepared.name].inertia;
  var lambda = inertiaOptions.resistance;
  var inertiaDur = -Math.log(inertiaOptions.endSpeed / status.v0) / lambda;

  status.x0 = interaction.prevEvent.pageX;
  status.y0 = interaction.prevEvent.pageY;
  status.t0 = status.startEvent.timeStamp / 1000;
  status.sx = status.sy = 0;

  status.modifiedXe = status.xe = (status.vx0 - inertiaDur) / lambda;
  status.modifiedYe = status.ye = (status.vy0 - inertiaDur) / lambda;
  status.te = inertiaDur;

  status.lambda_v0 = lambda / status.v0;
  status.one_ve_v0 = 1 - inertiaOptions.endSpeed / status.v0;
}

function inertiaFrame() {
  updateInertiaCoords(this);
  utils.setCoordDeltas(this.pointerDelta, this.prevCoords, this.curCoords);

  var status = this.inertiaStatus;
  var options = this.target.options[this.prepared.name].inertia;
  var lambda = options.resistance;
  var t = new Date().getTime() / 1000 - status.t0;

  if (t < status.te) {

    var progress = 1 - (Math.exp(-lambda * t) - status.lambda_v0) / status.one_ve_v0;

    if (status.modifiedXe === status.xe && status.modifiedYe === status.ye) {
      status.sx = status.xe * progress;
      status.sy = status.ye * progress;
    } else {
      var quadPoint = utils.getQuadraticCurvePoint(0, 0, status.xe, status.ye, status.modifiedXe, status.modifiedYe, progress);

      status.sx = quadPoint.x;
      status.sy = quadPoint.y;
    }

    this.doMove();

    status.i = animationFrame.request(this.boundInertiaFrame);
  } else {
    status.sx = status.modifiedXe;
    status.sy = status.modifiedYe;

    this.doMove();
    this.end(status.startEvent);
    status.active = false;
    this.simulation = null;
  }

  utils.copyCoords(this.prevCoords, this.curCoords);
}

function smoothEndFrame() {
  updateInertiaCoords(this);

  var status = this.inertiaStatus;
  var t = new Date().getTime() - status.t0;
  var duration = this.target.options[this.prepared.name].inertia.smoothEndDuration;

  if (t < duration) {
    status.sx = utils.easeOutQuad(t, 0, status.xe, duration);
    status.sy = utils.easeOutQuad(t, 0, status.ye, duration);

    this.pointerMove(status.startEvent, status.startEvent);

    status.i = animationFrame.request(this.boundSmoothEndFrame);
  } else {
    status.sx = status.xe;
    status.sy = status.ye;

    this.pointerMove(status.startEvent, status.startEvent);
    this.end(status.startEvent);

    status.smoothEnd = status.active = false;
    this.simulation = null;
  }
}

function updateInertiaCoords(interaction) {
  var status = interaction.inertiaStatus;

  // return if inertia isn't running
  if (!status.active) {
    return;
  }

  var pageUp = status.upCoords.page;
  var clientUp = status.upCoords.client;

  utils.setCoords(interaction.curCoords, [{
    pageX: pageUp.x + status.sx,
    pageY: pageUp.y + status.sy,
    clientX: clientUp.x + status.sx,
    clientY: clientUp.y + status.sy
  }]);
}

},{"./InteractEvent":3,"./Interaction":5,"./modifiers/base":23,"./utils":44,"./utils/raf":50}],21:[function(require,module,exports){
'use strict';

/** @module interact */

var browser = require('./utils/browser');
var events = require('./utils/events');
var utils = require('./utils');
var scope = require('./scope');
var Interactable = require('./Interactable');
var Interaction = require('./Interaction');

var globalEvents = {};

/**
 * ```js
 * interact('#draggable').draggable(true);
 *
 * var rectables = interact('rect');
 * rectables
 *   .gesturable(true)
 *   .on('gesturemove', function (event) {
 *       // ...
 *   });
 * ```
 *
 * The methods of this variable can be used to set elements as interactables
 * and also to change various default settings.
 *
 * Calling it as a function and passing an element or a valid CSS selector
 * string returns an Interactable object which has various methods to configure
 * it.
 *
 * @global
 *
 * @param {Element | string} element The HTML or SVG Element to interact with
 * or CSS selector
 * @return {Interactable}
 */
function interact(element, options) {
  var interactable = scope.interactables.get(element, options);

  if (!interactable) {
    interactable = new Interactable(element, options);
    interactable.events.global = globalEvents;
  }

  return interactable;
}

/**
 * Check if an element or selector has been set with the {@link interact}
 * function
 *
 * @alias module:interact.isSet
 *
 * @param {Element} element The Element being searched for
 * @return {boolean} Indicates if the element or CSS selector was previously
 * passed to interact
*/
interact.isSet = function (element, options) {
  return scope.interactables.indexOfElement(element, options && options.context) !== -1;
};

/**
 * Add a global listener for an InteractEvent or adds a DOM event to `document`
 *
 * @alias module:interact.on
 *
 * @param {string | array | object} type The types of events to listen for
 * @param {function} listener The function event (s)
 * @param {object | boolean} [options] object or useCapture flag for
 * addEventListener
 * @return {object} interact
 */
interact.on = function (type, listener, options) {
  if (utils.is.string(type) && type.search(' ') !== -1) {
    type = type.trim().split(/ +/);
  }

  if (utils.is.array(type)) {
    for (var _i = 0; _i < type.length; _i++) {
      var _ref;

      _ref = type[_i];
      var eventType = _ref;

      interact.on(eventType, listener, options);
    }

    return interact;
  }

  if (utils.is.object(type)) {
    for (var prop in type) {
      interact.on(prop, type[prop], listener);
    }

    return interact;
  }

  // if it is an InteractEvent type, add listener to globalEvents
  if (utils.contains(Interactable.eventTypes, type)) {
    // if this type of event was never bound
    if (!globalEvents[type]) {
      globalEvents[type] = [listener];
    } else {
      globalEvents[type].push(listener);
    }
  }
  // If non InteractEvent type, addEventListener to document
  else {
      events.add(scope.document, type, listener, { options: options });
    }

  return interact;
};

/**
 * Removes a global InteractEvent listener or DOM event from `document`
 *
 * @alias module:interact.off
 *
 * @param {string | array | object} type The types of events that were listened
 * for
 * @param {function} listener The listener function to be removed
 * @param {object | boolean} options [options] object or useCapture flag for
 * removeEventListener
 * @return {object} interact
 */
interact.off = function (type, listener, options) {
  if (utils.is.string(type) && type.search(' ') !== -1) {
    type = type.trim().split(/ +/);
  }

  if (utils.is.array(type)) {
    for (var _i2 = 0; _i2 < type.length; _i2++) {
      var _ref2;

      _ref2 = type[_i2];
      var eventType = _ref2;

      interact.off(eventType, listener, options);
    }

    return interact;
  }

  if (utils.is.object(type)) {
    for (var prop in type) {
      interact.off(prop, type[prop], listener);
    }

    return interact;
  }

  if (!utils.contains(Interactable.eventTypes, type)) {
    events.remove(scope.document, type, listener, options);
  } else {
    var index = void 0;

    if (type in globalEvents && (index = globalEvents[type].indexOf(listener)) !== -1) {
      globalEvents[type].splice(index, 1);
    }
  }

  return interact;
};

/**
 * Returns an object which exposes internal data

 * @alias module:interact.debug
 *
 * @return {object} An object with properties that outline the current state
 * and expose internal functions and variables
 */
interact.debug = function () {
  return scope;
};

// expose the functions used to calculate multi-touch properties
interact.getPointerAverage = utils.pointerAverage;
interact.getTouchBBox = utils.touchBBox;
interact.getTouchDistance = utils.touchDistance;
interact.getTouchAngle = utils.touchAngle;

interact.getElementRect = utils.getElementRect;
interact.getElementClientRect = utils.getElementClientRect;
interact.matchesSelector = utils.matchesSelector;
interact.closest = utils.closest;

/**
 * @alias module:interact.supportsTouch
 *
 * @return {boolean} Whether or not the browser supports touch input
 */
interact.supportsTouch = function () {
  return browser.supportsTouch;
};

/**
 * @alias module:interact.supportsPointerEvent
 *
 * @return {boolean} Whether or not the browser supports PointerEvents
 */
interact.supportsPointerEvent = function () {
  return browser.supportsPointerEvent;
};

/**
 * Cancels all interactions (end events are not fired)
 *
 * @alias module:interact.stop
 *
 * @param {Event} event An event on which to call preventDefault()
 * @return {object} interact
 */
interact.stop = function (event) {
  for (var i = scope.interactions.length - 1; i >= 0; i--) {
    scope.interactions[i].stop(event);
  }

  return interact;
};

/**
 * Returns or sets the distance the pointer must be moved before an action
 * sequence occurs. This also affects tolerance for tap events.
 *
 * @alias module:interact.pointerMoveTolerance
 *
 * @param {number} [newValue] The movement from the start position must be greater than this value
 * @return {interact | number}
 */
interact.pointerMoveTolerance = function (newValue) {
  if (utils.is.number(newValue)) {
    Interaction.pointerMoveTolerance = newValue;

    return interact;
  }

  return Interaction.pointerMoveTolerance;
};

interact.addDocument = scope.addDocument;
interact.removeDocument = scope.removeDocument;

scope.interact = interact;

module.exports = interact;

},{"./Interactable":4,"./Interaction":5,"./scope":33,"./utils":44,"./utils/browser":36,"./utils/events":40}],22:[function(require,module,exports){
'use strict';

var Interactable = require('./Interactable');
var Interaction = require('./Interaction');
var scope = require('./scope');
var is = require('./utils/is');
var events = require('./utils/events');
var browser = require('./utils/browser');

var _require = require('./utils/domUtils'),
    nodeContains = _require.nodeContains,
    matchesSelector = _require.matchesSelector;

/**
 * Returns or sets whether to prevent the browser's default behaviour in
 * response to pointer events. Can be set to:
 *  - `'always'` to always prevent
 *  - `'never'` to never prevent
 *  - `'auto'` to let interact.js try to determine what would be best
 *
 * @param {string} [newValue] `true`, `false` or `'auto'`
 * @return {string | Interactable} The current setting or this Interactable
 */


Interactable.prototype.preventDefault = function (newValue) {
  if (/^(always|never|auto)$/.test(newValue)) {
    this.options.preventDefault = newValue;
    return this;
  }

  if (is.bool(newValue)) {
    this.options.preventDefault = newValue ? 'always' : 'never';
    return this;
  }

  return this.options.preventDefault;
};

Interactable.prototype.checkAndPreventDefault = function (event) {
  var setting = this.options.preventDefault;

  if (setting === 'never') {
    return;
  }

  if (setting === 'always') {
    event.preventDefault();
    return;
  }

  // setting === 'auto'

  // don't preventDefault of touch{start,move} events if the browser supports passive
  // events listeners. CSS touch-action and user-selecct should be used instead
  if (events.supportsPassive && /^touch(start|move)$/.test(event.type) && !browser.isIOS) {
    return;
  }

  // don't preventDefault of pointerdown events
  if (/^(mouse|pointer|touch)*(down|start)/i.test(event.type)) {
    return;
  }

  // don't preventDefault on editable elements
  if (is.element(event.target) && matchesSelector(event.target, 'input,select,textarea,[contenteditable=true],[contenteditable=true] *')) {
    return;
  }

  event.preventDefault();
};

function onInteractionEvent(_ref) {
  var interaction = _ref.interaction,
      event = _ref.event;

  if (interaction.target) {
    interaction.target.checkAndPreventDefault(event);
  }
}

var _arr = ['down', 'move', 'up', 'cancel'];
for (var _i = 0; _i < _arr.length; _i++) {
  var eventSignal = _arr[_i];
  Interaction.signals.on(eventSignal, onInteractionEvent);
}

// prevent native HTML5 drag on interact.js target elements
Interaction.docEvents.dragstart = function preventNativeDrag(event) {
  for (var _i2 = 0; _i2 < scope.interactions.length; _i2++) {
    var _ref2;

    _ref2 = scope.interactions[_i2];
    var interaction = _ref2;


    if (interaction.element && (interaction.element === event.target || nodeContains(interaction.element, event.target))) {

      interaction.target.checkAndPreventDefault(event);
      return;
    }
  }
};

},{"./Interactable":4,"./Interaction":5,"./scope":33,"./utils/browser":36,"./utils/domUtils":39,"./utils/events":40,"./utils/is":46}],23:[function(require,module,exports){
'use strict';

var InteractEvent = require('../InteractEvent');
var Interaction = require('../Interaction');
var extend = require('../utils/extend');

var modifiers = {
  names: [],

  setOffsets: function setOffsets(arg) {
    var interaction = arg.interaction,
        page = arg.pageCoords;
    var target = interaction.target,
        element = interaction.element,
        startOffset = interaction.startOffset;

    var rect = target.getRect(element);

    if (rect) {
      startOffset.left = page.x - rect.left;
      startOffset.top = page.y - rect.top;

      startOffset.right = rect.right - page.x;
      startOffset.bottom = rect.bottom - page.y;

      if (!('width' in rect)) {
        rect.width = rect.right - rect.left;
      }
      if (!('height' in rect)) {
        rect.height = rect.bottom - rect.top;
      }
    } else {
      startOffset.left = startOffset.top = startOffset.right = startOffset.bottom = 0;
    }

    arg.rect = rect;
    arg.interactable = target;
    arg.element = element;

    for (var _i = 0; _i < modifiers.names.length; _i++) {
      var _ref;

      _ref = modifiers.names[_i];
      var modifierName = _ref;

      arg.options = target.options[interaction.prepared.name][modifierName];

      if (!arg.options) {
        continue;
      }

      interaction.modifierOffsets[modifierName] = modifiers[modifierName].setOffset(arg);
    }
  },

  setAll: function setAll(arg) {
    var interaction = arg.interaction,
        statuses = arg.statuses,
        preEnd = arg.preEnd,
        requireEndOnly = arg.requireEndOnly;

    var result = {
      dx: 0,
      dy: 0,
      changed: false,
      locked: false,
      shouldMove: true
    };

    arg.modifiedCoords = extend({}, arg.pageCoords);

    for (var _i2 = 0; _i2 < modifiers.names.length; _i2++) {
      var _ref2;

      _ref2 = modifiers.names[_i2];
      var modifierName = _ref2;

      var modifier = modifiers[modifierName];
      var options = interaction.target.options[interaction.prepared.name][modifierName];

      if (!shouldDo(options, preEnd, requireEndOnly)) {
        continue;
      }

      arg.status = arg.status = statuses[modifierName];
      arg.options = options;
      arg.offset = arg.interaction.modifierOffsets[modifierName];

      modifier.set(arg);

      if (arg.status.locked) {
        arg.modifiedCoords.x += arg.status.dx;
        arg.modifiedCoords.y += arg.status.dy;

        result.dx += arg.status.dx;
        result.dy += arg.status.dy;

        result.locked = true;
      }
    }

    // a move should be fired if:
    //  - there are no modifiers enabled,
    //  - no modifiers are "locked" i.e. have changed the pointer's coordinates, or
    //  - the locked coords have changed since the last pointer move
    result.shouldMove = !arg.status || !result.locked || arg.status.changed;

    return result;
  },

  resetStatuses: function resetStatuses(statuses) {
    for (var _i3 = 0; _i3 < modifiers.names.length; _i3++) {
      var _ref3;

      _ref3 = modifiers.names[_i3];
      var modifierName = _ref3;

      var status = statuses[modifierName] || {};

      status.dx = status.dy = 0;
      status.modifiedX = status.modifiedY = NaN;
      status.locked = false;
      status.changed = true;

      statuses[modifierName] = status;
    }

    return statuses;
  },

  start: function start(_ref4, signalName) {
    var interaction = _ref4.interaction;

    var arg = {
      interaction: interaction,
      pageCoords: (signalName === 'action-resume' ? interaction.curCoords : interaction.startCoords).page,
      startOffset: interaction.startOffset,
      statuses: interaction.modifierStatuses,
      preEnd: false,
      requireEndOnly: false
    };

    modifiers.setOffsets(arg);
    modifiers.resetStatuses(arg.statuses);

    arg.pageCoords = extend({}, interaction.startCoords.page);
    interaction.modifierResult = modifiers.setAll(arg);
  },

  beforeMove: function beforeMove(_ref5) {
    var interaction = _ref5.interaction,
        preEnd = _ref5.preEnd,
        interactingBeforeMove = _ref5.interactingBeforeMove;

    var modifierResult = modifiers.setAll({
      interaction: interaction,
      preEnd: preEnd,
      pageCoords: interaction.curCoords.page,
      statuses: interaction.modifierStatuses,
      requireEndOnly: false
    });

    // don't fire an action move if a modifier would keep the event in the same
    // cordinates as before
    if (!modifierResult.shouldMove && interactingBeforeMove) {
      interaction._dontFireMove = true;
    }

    interaction.modifierResult = modifierResult;
  },

  end: function end(_ref6) {
    var interaction = _ref6.interaction,
        event = _ref6.event;

    for (var _i4 = 0; _i4 < modifiers.names.length; _i4++) {
      var _ref7;

      _ref7 = modifiers.names[_i4];
      var modifierName = _ref7;

      var options = interaction.target.options[interaction.prepared.name][modifierName];

      // if the endOnly option is true for any modifier
      if (shouldDo(options, true, true)) {
        // fire a move event at the modified coordinates
        interaction.doMove({ event: event, preEnd: true });
        break;
      }
    }
  },

  setXY: function setXY(arg) {
    var iEvent = arg.iEvent,
        interaction = arg.interaction;

    var modifierArg = extend({}, arg);

    for (var i = 0; i < modifiers.names.length; i++) {
      var modifierName = modifiers.names[i];
      modifierArg.options = interaction.target.options[interaction.prepared.name][modifierName];

      if (!modifierArg.options) {
        continue;
      }

      var modifier = modifiers[modifierName];

      modifierArg.status = interaction.modifierStatuses[modifierName];

      iEvent[modifierName] = modifier.modifyCoords(modifierArg);
    }
  }
};

Interaction.signals.on('new', function (interaction) {
  interaction.startOffset = { left: 0, right: 0, top: 0, bottom: 0 };
  interaction.modifierOffsets = {};
  interaction.modifierStatuses = modifiers.resetStatuses({});
  interaction.modifierResult = null;
});

Interaction.signals.on('action-start', modifiers.start);
Interaction.signals.on('action-resume', modifiers.start);
Interaction.signals.on('before-action-move', modifiers.beforeMove);
Interaction.signals.on('action-end', modifiers.end);

InteractEvent.signals.on('set-xy', modifiers.setXY);

function shouldDo(options, preEnd, requireEndOnly) {
  return options && options.enabled && (preEnd || !options.endOnly) && (!requireEndOnly || options.endOnly);
}

module.exports = modifiers;

},{"../InteractEvent":3,"../Interaction":5,"../utils/extend":41}],24:[function(require,module,exports){
'use strict';

var modifiers = require('./base');
var utils = require('../utils');
var defaultOptions = require('../defaultOptions');

var restrict = {
  defaults: {
    enabled: false,
    endOnly: false,
    restriction: null,
    elementRect: null
  },

  setOffset: function setOffset(_ref) {
    var rect = _ref.rect,
        startOffset = _ref.startOffset,
        options = _ref.options;

    var elementRect = options && options.elementRect;
    var offset = {};

    if (rect && elementRect) {
      offset.left = startOffset.left - rect.width * elementRect.left;
      offset.top = startOffset.top - rect.height * elementRect.top;

      offset.right = startOffset.right - rect.width * (1 - elementRect.right);
      offset.bottom = startOffset.bottom - rect.height * (1 - elementRect.bottom);
    } else {
      offset.left = offset.top = offset.right = offset.bottom = 0;
    }

    return offset;
  },

  set: function set(_ref2) {
    var modifiedCoords = _ref2.modifiedCoords,
        interaction = _ref2.interaction,
        status = _ref2.status,
        options = _ref2.options;

    if (!options) {
      return status;
    }

    var page = status.useStatusXY ? { x: status.x, y: status.y } : utils.extend({}, modifiedCoords);

    var restriction = getRestrictionRect(options.restriction, interaction, page);

    if (!restriction) {
      return status;
    }

    status.dx = 0;
    status.dy = 0;
    status.locked = false;

    var rect = restriction;
    var modifiedX = page.x;
    var modifiedY = page.y;

    var offset = interaction.modifierOffsets.restrict;

    // object is assumed to have
    // x, y, width, height or
    // left, top, right, bottom
    if ('x' in restriction && 'y' in restriction) {
      modifiedX = Math.max(Math.min(rect.x + rect.width - offset.right, page.x), rect.x + offset.left);
      modifiedY = Math.max(Math.min(rect.y + rect.height - offset.bottom, page.y), rect.y + offset.top);
    } else {
      modifiedX = Math.max(Math.min(rect.right - offset.right, page.x), rect.left + offset.left);
      modifiedY = Math.max(Math.min(rect.bottom - offset.bottom, page.y), rect.top + offset.top);
    }

    status.dx = modifiedX - page.x;
    status.dy = modifiedY - page.y;

    status.changed = status.modifiedX !== modifiedX || status.modifiedY !== modifiedY;
    status.locked = !!(status.dx || status.dy);

    status.modifiedX = modifiedX;
    status.modifiedY = modifiedY;
  },

  modifyCoords: function modifyCoords(_ref3) {
    var page = _ref3.page,
        client = _ref3.client,
        status = _ref3.status,
        phase = _ref3.phase,
        options = _ref3.options;

    var elementRect = options && options.elementRect;

    if (options && options.enabled && !(phase === 'start' && elementRect && status.locked)) {

      if (status.locked) {
        page.x += status.dx;
        page.y += status.dy;
        client.x += status.dx;
        client.y += status.dy;

        return {
          dx: status.dx,
          dy: status.dy
        };
      }
    }
  },

  getRestrictionRect: getRestrictionRect
};

function getRestrictionRect(value, interaction, page) {
  if (utils.is.function(value)) {
    return utils.resolveRectLike(value, interaction.target, interaction.element, [page.x, page.y, interaction]);
  } else {
    return utils.resolveRectLike(value, interaction.target, interaction.element);
  }
}

modifiers.restrict = restrict;
modifiers.names.push('restrict');

defaultOptions.perAction.restrict = restrict.defaults;

module.exports = restrict;

},{"../defaultOptions":18,"../utils":44,"./base":23}],25:[function(require,module,exports){
'use strict';

// This module adds the options.resize.restrictEdges setting which sets min and
// max for the top, left, bottom and right edges of the target being resized.
//
// interact(target).resize({
//   edges: { top: true, left: true },
//   restrictEdges: {
//     inner: { top: 200, left: 200, right: 400, bottom: 400 },
//     outer: { top:   0, left:   0, right: 600, bottom: 600 },
//   },
// });

var modifiers = require('./base');
var utils = require('../utils');
var rectUtils = require('../utils/rect');
var defaultOptions = require('../defaultOptions');
var resize = require('../actions/resize');

var _require = require('./restrict'),
    getRestrictionRect = _require.getRestrictionRect;

var noInner = { top: +Infinity, left: +Infinity, bottom: -Infinity, right: -Infinity };
var noOuter = { top: -Infinity, left: -Infinity, bottom: +Infinity, right: +Infinity };

var restrictEdges = {
  defaults: {
    enabled: false,
    endOnly: false,
    min: null,
    max: null,
    offset: null
  },

  setOffset: function setOffset(_ref) {
    var interaction = _ref.interaction,
        startOffset = _ref.startOffset,
        options = _ref.options;

    if (!options) {
      return utils.extend({}, startOffset);
    }

    var offset = getRestrictionRect(options.offset, interaction, interaction.startCoords.page);

    if (offset) {
      return {
        top: startOffset.top + offset.y,
        left: startOffset.left + offset.x,
        bottom: startOffset.bottom + offset.y,
        right: startOffset.right + offset.x
      };
    }

    return startOffset;
  },

  set: function set(_ref2) {
    var modifiedCoords = _ref2.modifiedCoords,
        interaction = _ref2.interaction,
        status = _ref2.status,
        offset = _ref2.offset,
        options = _ref2.options;

    var edges = interaction.prepared.linkedEdges || interaction.prepared.edges;

    if (!interaction.interacting() || !edges) {
      return;
    }

    var page = status.useStatusXY ? { x: status.x, y: status.y } : utils.extend({}, modifiedCoords);
    var inner = rectUtils.xywhToTlbr(getRestrictionRect(options.inner, interaction, page)) || noInner;
    var outer = rectUtils.xywhToTlbr(getRestrictionRect(options.outer, interaction, page)) || noOuter;

    var modifiedX = page.x;
    var modifiedY = page.y;

    status.dx = 0;
    status.dy = 0;
    status.locked = false;

    if (edges.top) {
      modifiedY = Math.min(Math.max(outer.top + offset.top, page.y), inner.top + offset.top);
    } else if (edges.bottom) {
      modifiedY = Math.max(Math.min(outer.bottom - offset.bottom, page.y), inner.bottom - offset.bottom);
    }
    if (edges.left) {
      modifiedX = Math.min(Math.max(outer.left + offset.left, page.x), inner.left + offset.left);
    } else if (edges.right) {
      modifiedX = Math.max(Math.min(outer.right - offset.right, page.x), inner.right - offset.right);
    }

    status.dx = modifiedX - page.x;
    status.dy = modifiedY - page.y;

    status.changed = status.modifiedX !== modifiedX || status.modifiedY !== modifiedY;
    status.locked = !!(status.dx || status.dy);

    status.modifiedX = modifiedX;
    status.modifiedY = modifiedY;
  },

  modifyCoords: function modifyCoords(_ref3) {
    var page = _ref3.page,
        client = _ref3.client,
        status = _ref3.status,
        phase = _ref3.phase,
        options = _ref3.options;

    if (options && options.enabled && !(phase === 'start' && status.locked)) {

      if (status.locked) {
        page.x += status.dx;
        page.y += status.dy;
        client.x += status.dx;
        client.y += status.dy;

        return {
          dx: status.dx,
          dy: status.dy
        };
      }
    }
  },

  noInner: noInner,
  noOuter: noOuter,
  getRestrictionRect: getRestrictionRect
};

modifiers.restrictEdges = restrictEdges;
modifiers.names.push('restrictEdges');

defaultOptions.perAction.restrictEdges = restrictEdges.defaults;
resize.defaults.restrictEdges = restrictEdges.defaults;

module.exports = restrictEdges;

},{"../actions/resize":10,"../defaultOptions":18,"../utils":44,"../utils/rect":51,"./base":23,"./restrict":24}],26:[function(require,module,exports){
'use strict';

// This module adds the options.resize.restrictSize setting which sets min and
// max width and height for the target being resized.
//
// interact(target).resize({
//   edges: { top: true, left: true },
//   restrictSize: {
//     min: { width: -600, height: -600 },
//     max: { width:  600, height:  600 },
//   },
// });

var modifiers = require('./base');
var restrictEdges = require('./restrictEdges');
var utils = require('../utils');
var rectUtils = require('../utils/rect');
var defaultOptions = require('../defaultOptions');
var resize = require('../actions/resize');

var noMin = { width: -Infinity, height: -Infinity };
var noMax = { width: +Infinity, height: +Infinity };

var restrictSize = {
  defaults: {
    enabled: false,
    endOnly: false,
    min: null,
    max: null
  },

  setOffset: function setOffset(_ref) {
    var interaction = _ref.interaction;

    return interaction.startOffset;
  },

  set: function set(arg) {
    var interaction = arg.interaction,
        options = arg.options;

    var edges = interaction.prepared.linkedEdges || interaction.prepared.edges;

    if (!interaction.interacting() || !edges) {
      return;
    }

    var rect = rectUtils.xywhToTlbr(interaction.resizeRects.inverted);

    var minSize = rectUtils.tlbrToXywh(restrictEdges.getRestrictionRect(options.min, interaction)) || noMin;
    var maxSize = rectUtils.tlbrToXywh(restrictEdges.getRestrictionRect(options.max, interaction)) || noMax;

    arg.options = {
      enabled: options.enabled,
      endOnly: options.endOnly,
      inner: utils.extend({}, restrictEdges.noInner),
      outer: utils.extend({}, restrictEdges.noOuter)
    };

    if (edges.top) {
      arg.options.inner.top = rect.bottom - minSize.height;
      arg.options.outer.top = rect.bottom - maxSize.height;
    } else if (edges.bottom) {
      arg.options.inner.bottom = rect.top + minSize.height;
      arg.options.outer.bottom = rect.top + maxSize.height;
    }
    if (edges.left) {
      arg.options.inner.left = rect.right - minSize.width;
      arg.options.outer.left = rect.right - maxSize.width;
    } else if (edges.right) {
      arg.options.inner.right = rect.left + minSize.width;
      arg.options.outer.right = rect.left + maxSize.width;
    }

    restrictEdges.set(arg);
  },

  modifyCoords: restrictEdges.modifyCoords
};

modifiers.restrictSize = restrictSize;
modifiers.names.push('restrictSize');

defaultOptions.perAction.restrictSize = restrictSize.defaults;
resize.defaults.restrictSize = restrictSize.defaults;

module.exports = restrictSize;

},{"../actions/resize":10,"../defaultOptions":18,"../utils":44,"../utils/rect":51,"./base":23,"./restrictEdges":25}],27:[function(require,module,exports){
'use strict';

var modifiers = require('./base');
var interact = require('../interact');
var utils = require('../utils');
var defaultOptions = require('../defaultOptions');

var snap = {
  defaults: {
    enabled: false,
    endOnly: false,
    range: Infinity,
    targets: null,
    offsets: null,

    relativePoints: null
  },

  setOffset: function setOffset(_ref) {
    var interaction = _ref.interaction,
        interactable = _ref.interactable,
        element = _ref.element,
        rect = _ref.rect,
        startOffset = _ref.startOffset,
        options = _ref.options;

    var offsets = [];
    var optionsOrigin = utils.rectToXY(utils.resolveRectLike(options.origin));
    var origin = optionsOrigin || utils.getOriginXY(interactable, element, interaction.prepared.name);
    options = options || interactable.options[interaction.prepared.name].snap || {};

    var snapOffset = void 0;

    if (options.offset === 'startCoords') {
      snapOffset = {
        x: interaction.startCoords.page.x - origin.x,
        y: interaction.startCoords.page.y - origin.y
      };
    } else {
      var offsetRect = utils.resolveRectLike(options.offset, interactable, element, [interaction]);

      snapOffset = utils.rectToXY(offsetRect) || { x: 0, y: 0 };
    }

    if (rect && options.relativePoints && options.relativePoints.length) {
      for (var _i = 0; _i < options.relativePoints.length; _i++) {
        var _ref3;

        _ref3 = options.relativePoints[_i];
        var _ref2 = _ref3;
        var relativeX = _ref2.x;
        var relativeY = _ref2.y;

        offsets.push({
          x: startOffset.left - rect.width * relativeX + snapOffset.x,
          y: startOffset.top - rect.height * relativeY + snapOffset.y
        });
      }
    } else {
      offsets.push(snapOffset);
    }

    return offsets;
  },

  set: function set(_ref4) {
    var interaction = _ref4.interaction,
        modifiedCoords = _ref4.modifiedCoords,
        status = _ref4.status,
        options = _ref4.options,
        offsets = _ref4.offset;

    var targets = [];
    var target = void 0;
    var page = void 0;
    var i = void 0;

    if (status.useStatusXY) {
      page = { x: status.x, y: status.y };
    } else {
      var origin = utils.getOriginXY(interaction.target, interaction.element, interaction.prepared.name);

      page = utils.extend({}, modifiedCoords);

      page.x -= origin.x;
      page.y -= origin.y;
    }

    status.realX = page.x;
    status.realY = page.y;

    var len = options.targets ? options.targets.length : 0;

    for (var _i2 = 0; _i2 < offsets.length; _i2++) {
      var _ref6;

      _ref6 = offsets[_i2];
      var _ref5 = _ref6;
      var offsetX = _ref5.x;
      var offsetY = _ref5.y;

      var relativeX = page.x - offsetX;
      var relativeY = page.y - offsetY;

      for (var _i3 = 0; _i3 < (options.targets || []).length; _i3++) {
        var _ref7;

        _ref7 = (options.targets || [])[_i3];
        var snapTarget = _ref7;

        if (utils.is.function(snapTarget)) {
          target = snapTarget(relativeX, relativeY, interaction);
        } else {
          target = snapTarget;
        }

        if (!target) {
          continue;
        }

        targets.push({
          x: utils.is.number(target.x) ? target.x + offsetX : relativeX,
          y: utils.is.number(target.y) ? target.y + offsetY : relativeY,

          range: utils.is.number(target.range) ? target.range : options.range
        });
      }
    }

    var closest = {
      target: null,
      inRange: false,
      distance: 0,
      range: 0,
      dx: 0,
      dy: 0
    };

    for (i = 0, len = targets.length; i < len; i++) {
      target = targets[i];

      var range = target.range;
      var dx = target.x - page.x;
      var dy = target.y - page.y;
      var distance = utils.hypot(dx, dy);
      var inRange = distance <= range;

      // Infinite targets count as being out of range
      // compared to non infinite ones that are in range
      if (range === Infinity && closest.inRange && closest.range !== Infinity) {
        inRange = false;
      }

      if (!closest.target || (inRange
      // is the closest target in range?
      ? closest.inRange && range !== Infinity
      // the pointer is relatively deeper in this target
      ? distance / range < closest.distance / closest.range
      // this target has Infinite range and the closest doesn't
      : range === Infinity && closest.range !== Infinity ||
      // OR this target is closer that the previous closest
      distance < closest.distance :
      // The other is not in range and the pointer is closer to this target
      !closest.inRange && distance < closest.distance)) {

        closest.target = target;
        closest.distance = distance;
        closest.range = range;
        closest.inRange = inRange;
        closest.dx = dx;
        closest.dy = dy;

        status.range = range;
      }
    }

    var snapChanged = void 0;

    if (closest.target) {
      snapChanged = status.modifiedX !== closest.target.x || status.modifiedY !== closest.target.y;

      status.modifiedX = closest.target.x;
      status.modifiedY = closest.target.y;
    } else {
      snapChanged = true;

      status.modifiedX = NaN;
      status.modifiedY = NaN;
    }

    status.dx = closest.dx;
    status.dy = closest.dy;

    status.changed = snapChanged || closest.inRange && !status.locked;
    status.locked = closest.inRange;
  },

  modifyCoords: function modifyCoords(_ref8) {
    var page = _ref8.page,
        client = _ref8.client,
        status = _ref8.status,
        phase = _ref8.phase,
        options = _ref8.options;

    var relativePoints = options && options.relativePoints;

    if (options && options.enabled && !(phase === 'start' && relativePoints && relativePoints.length)) {

      if (status.locked) {
        page.x += status.dx;
        page.y += status.dy;
        client.x += status.dx;
        client.y += status.dy;
      }

      return {
        range: status.range,
        locked: status.locked,
        x: status.modifiedX,
        y: status.modifiedY,
        realX: status.realX,
        realY: status.realY,
        dx: status.dx,
        dy: status.dy
      };
    }
  }
};

interact.createSnapGrid = function (grid) {
  return function (x, y) {
    var limits = grid.limits || {
      left: -Infinity,
      right: Infinity,
      top: -Infinity,
      bottom: Infinity
    };
    var offsetX = 0;
    var offsetY = 0;

    if (utils.is.object(grid.offset)) {
      offsetX = grid.offset.x;
      offsetY = grid.offset.y;
    }

    var gridx = Math.round((x - offsetX) / grid.x);
    var gridy = Math.round((y - offsetY) / grid.y);

    var newX = Math.max(limits.left, Math.min(limits.right, gridx * grid.x + offsetX));
    var newY = Math.max(limits.top, Math.min(limits.bottom, gridy * grid.y + offsetY));

    return {
      x: newX,
      y: newY,
      range: grid.range
    };
  };
};

modifiers.snap = snap;
modifiers.names.push('snap');

defaultOptions.perAction.snap = snap.defaults;

module.exports = snap;

},{"../defaultOptions":18,"../interact":21,"../utils":44,"./base":23}],28:[function(require,module,exports){
'use strict';

// This module allows snapping of the size of targets during resize
// interactions.

var modifiers = require('./base');
var snap = require('./snap');
var defaultOptions = require('../defaultOptions');
var resize = require('../actions/resize');
var utils = require('../utils/');

var snapSize = {
  defaults: {
    enabled: false,
    endOnly: false,
    range: Infinity,
    targets: null,
    offsets: null
  },

  setOffset: function setOffset(arg) {
    var interaction = arg.interaction,
        options = arg.options;

    var edges = interaction.prepared.edges;

    if (!edges) {
      return;
    }

    arg.options = {
      relativePoints: [{
        x: edges.left ? 0 : 1,
        y: edges.top ? 0 : 1
      }],
      origin: { x: 0, y: 0 },
      offset: 'self',
      range: options.range
    };

    var offsets = snap.setOffset(arg);
    arg.options = options;

    return offsets;
  },

  set: function set(arg) {
    var interaction = arg.interaction,
        options = arg.options,
        offset = arg.offset,
        modifiedCoords = arg.modifiedCoords;

    var page = utils.extend({}, modifiedCoords);
    var relativeX = page.x - offset[0].x;
    var relativeY = page.y - offset[0].y;

    arg.options = utils.extend({}, options);
    arg.options.targets = [];

    for (var _i = 0; _i < (options.targets || []).length; _i++) {
      var _ref;

      _ref = (options.targets || [])[_i];
      var snapTarget = _ref;

      var target = void 0;

      if (utils.is.function(snapTarget)) {
        target = snapTarget(relativeX, relativeY, interaction);
      } else {
        target = snapTarget;
      }

      if (!target) {
        continue;
      }

      if ('width' in target && 'height' in target) {
        target.x = target.width;
        target.y = target.height;
      }

      arg.options.targets.push(target);
    }

    snap.set(arg);
  },

  modifyCoords: function modifyCoords(arg) {
    var options = arg.options;


    arg.options = utils.extend({}, options);
    arg.options.enabled = options.enabled;
    arg.options.relativePoints = [null];

    snap.modifyCoords(arg);
  }
};

modifiers.snapSize = snapSize;
modifiers.names.push('snapSize');

defaultOptions.perAction.snapSize = snapSize.defaults;
resize.defaults.snapSize = snapSize.defaults;

module.exports = snapSize;

},{"../actions/resize":10,"../defaultOptions":18,"../utils/":44,"./base":23,"./snap":27}],29:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var pointerUtils = require('../utils/pointerUtils');

module.exports = function () {
  /** */
  function PointerEvent(type, pointer, event, eventTarget, interaction) {
    _classCallCheck(this, PointerEvent);

    pointerUtils.pointerExtend(this, event);

    if (event !== pointer) {
      pointerUtils.pointerExtend(this, pointer);
    }

    this.interaction = interaction;

    this.timeStamp = new Date().getTime();
    this.originalEvent = event;
    this.type = type;
    this.pointerId = pointerUtils.getPointerId(pointer);
    this.pointerType = pointerUtils.getPointerType(pointer);
    this.target = eventTarget;
    this.currentTarget = null;

    if (type === 'tap') {
      var pointerIndex = interaction.getPointerIndex(pointer);
      this.dt = this.timeStamp - interaction.downTimes[pointerIndex];

      var interval = this.timeStamp - interaction.tapTime;

      this.double = !!(interaction.prevTap && interaction.prevTap.type !== 'doubletap' && interaction.prevTap.target === this.target && interval < 500);
    } else if (type === 'doubletap') {
      this.dt = pointer.timeStamp - interaction.tapTime;
    }
  }

  PointerEvent.prototype.subtractOrigin = function subtractOrigin(_ref) {
    var originX = _ref.x,
        originY = _ref.y;

    this.pageX -= originX;
    this.pageY -= originY;
    this.clientX -= originX;
    this.clientY -= originY;

    return this;
  };

  PointerEvent.prototype.addOrigin = function addOrigin(_ref2) {
    var originX = _ref2.x,
        originY = _ref2.y;

    this.pageX += originX;
    this.pageY += originY;
    this.clientX += originX;
    this.clientY += originY;

    return this;
  };

  /** */


  PointerEvent.prototype.preventDefault = function preventDefault() {
    this.originalEvent.preventDefault();
  };

  /** */


  PointerEvent.prototype.stopPropagation = function stopPropagation() {
    this.propagationStopped = true;
  };

  /** */


  PointerEvent.prototype.stopImmediatePropagation = function stopImmediatePropagation() {
    this.immediatePropagationStopped = this.propagationStopped = true;
  };

  return PointerEvent;
}();

},{"../utils/pointerUtils":49}],30:[function(require,module,exports){
'use strict';

var PointerEvent = require('./PointerEvent');
var Interaction = require('../Interaction');
var utils = require('../utils');
var defaults = require('../defaultOptions');
var signals = require('../utils/Signals').new();

var simpleSignals = ['down', 'up', 'cancel'];
var simpleEvents = ['down', 'up', 'cancel'];

var pointerEvents = {
  PointerEvent: PointerEvent,
  fire: fire,
  collectEventTargets: collectEventTargets,
  signals: signals,
  defaults: {
    holdDuration: 600,
    ignoreFrom: null,
    allowFrom: null,
    origin: { x: 0, y: 0 }
  },
  types: ['down', 'move', 'up', 'cancel', 'tap', 'doubletap', 'hold']
};

function fire(arg) {
  var interaction = arg.interaction,
      pointer = arg.pointer,
      event = arg.event,
      eventTarget = arg.eventTarget,
      _arg$type = arg.type,
      type = _arg$type === undefined ? arg.pointerEvent.type : _arg$type,
      _arg$targets = arg.targets,
      targets = _arg$targets === undefined ? collectEventTargets(arg) : _arg$targets,
      _arg$pointerEvent = arg.pointerEvent,
      pointerEvent = _arg$pointerEvent === undefined ? new PointerEvent(type, pointer, event, eventTarget, interaction) : _arg$pointerEvent;


  var signalArg = {
    interaction: interaction,
    pointer: pointer,
    event: event,
    eventTarget: eventTarget,
    targets: targets,
    type: type,
    pointerEvent: pointerEvent
  };

  for (var i = 0; i < targets.length; i++) {
    var target = targets[i];

    for (var prop in target.props || {}) {
      pointerEvent[prop] = target.props[prop];
    }

    var origin = utils.getOriginXY(target.eventable, target.element);

    pointerEvent.subtractOrigin(origin);
    pointerEvent.eventable = target.eventable;
    pointerEvent.currentTarget = target.element;

    target.eventable.fire(pointerEvent);

    pointerEvent.addOrigin(origin);

    if (pointerEvent.immediatePropagationStopped || pointerEvent.propagationStopped && i + 1 < targets.length && targets[i + 1].element !== pointerEvent.currentTarget) {
      break;
    }
  }

  signals.fire('fired', signalArg);

  if (type === 'tap') {
    // if pointerEvent should make a double tap, create and fire a doubletap
    // PointerEvent and use that as the prevTap
    var prevTap = pointerEvent.double ? fire({
      interaction: interaction, pointer: pointer, event: event, eventTarget: eventTarget,
      type: 'doubletap'
    }) : pointerEvent;

    interaction.prevTap = prevTap;
    interaction.tapTime = prevTap.timeStamp;
  }

  return pointerEvent;
}

function collectEventTargets(_ref) {
  var interaction = _ref.interaction,
      pointer = _ref.pointer,
      event = _ref.event,
      eventTarget = _ref.eventTarget,
      type = _ref.type;

  var pointerIndex = interaction.getPointerIndex(pointer);

  // do not fire a tap event if the pointer was moved before being lifted
  if (type === 'tap' && (interaction.pointerWasMoved
  // or if the pointerup target is different to the pointerdown target
  || !(interaction.downTargets[pointerIndex] && interaction.downTargets[pointerIndex] === eventTarget))) {
    return [];
  }

  var path = utils.getPath(eventTarget);
  var signalArg = {
    interaction: interaction,
    pointer: pointer,
    event: event,
    eventTarget: eventTarget,
    type: type,
    path: path,
    targets: [],
    element: null
  };

  for (var _i = 0; _i < path.length; _i++) {
    var _ref2;

    _ref2 = path[_i];
    var element = _ref2;

    signalArg.element = element;

    signals.fire('collect-targets', signalArg);
  }

  if (type === 'hold') {
    signalArg.targets = signalArg.targets.filter(function (target) {
      return target.eventable.options.holdDuration === interaction.holdTimers[pointerIndex].duration;
    });
  }

  return signalArg.targets;
}

Interaction.signals.on('update-pointer-down', function (_ref3) {
  var interaction = _ref3.interaction,
      pointerIndex = _ref3.pointerIndex;

  interaction.holdTimers[pointerIndex] = { duration: Infinity, timeout: null };
});

Interaction.signals.on('remove-pointer', function (_ref4) {
  var interaction = _ref4.interaction,
      pointerIndex = _ref4.pointerIndex;

  interaction.holdTimers.splice(pointerIndex, 1);
});

Interaction.signals.on('move', function (_ref5) {
  var interaction = _ref5.interaction,
      pointer = _ref5.pointer,
      event = _ref5.event,
      eventTarget = _ref5.eventTarget,
      duplicateMove = _ref5.duplicateMove;

  var pointerIndex = interaction.getPointerIndex(pointer);

  if (!duplicateMove && (!interaction.pointerIsDown || interaction.pointerWasMoved)) {
    if (interaction.pointerIsDown) {
      clearTimeout(interaction.holdTimers[pointerIndex].timeout);
    }

    fire({
      interaction: interaction, pointer: pointer, event: event, eventTarget: eventTarget,
      type: 'move'
    });
  }
});

Interaction.signals.on('down', function (_ref6) {
  var interaction = _ref6.interaction,
      pointer = _ref6.pointer,
      event = _ref6.event,
      eventTarget = _ref6.eventTarget,
      pointerIndex = _ref6.pointerIndex;

  var timer = interaction.holdTimers[pointerIndex];
  var path = utils.getPath(eventTarget);
  var signalArg = {
    interaction: interaction,
    pointer: pointer,
    event: event,
    eventTarget: eventTarget,
    type: 'hold',
    targets: [],
    path: path,
    element: null
  };

  for (var _i2 = 0; _i2 < path.length; _i2++) {
    var _ref7;

    _ref7 = path[_i2];
    var element = _ref7;

    signalArg.element = element;

    signals.fire('collect-targets', signalArg);
  }

  if (!signalArg.targets.length) {
    return;
  }

  var minDuration = Infinity;

  for (var _i3 = 0; _i3 < signalArg.targets.length; _i3++) {
    var _ref8;

    _ref8 = signalArg.targets[_i3];
    var target = _ref8;

    var holdDuration = target.eventable.options.holdDuration;

    if (holdDuration < minDuration) {
      minDuration = holdDuration;
    }
  }

  timer.duration = minDuration;
  timer.timeout = setTimeout(function () {
    fire({
      interaction: interaction,
      eventTarget: eventTarget,
      pointer: pointer,
      event: event,
      type: 'hold'
    });
  }, minDuration);
});

Interaction.signals.on('up', function (_ref9) {
  var interaction = _ref9.interaction,
      pointer = _ref9.pointer,
      event = _ref9.event,
      eventTarget = _ref9.eventTarget;

  if (!interaction.pointerWasMoved) {
    fire({ interaction: interaction, eventTarget: eventTarget, pointer: pointer, event: event, type: 'tap' });
  }
});

var _arr = ['up', 'cancel'];
for (var _i4 = 0; _i4 < _arr.length; _i4++) {
  var signalName = _arr[_i4];
  Interaction.signals.on(signalName, function (_ref11) {
    var interaction = _ref11.interaction,
        pointerIndex = _ref11.pointerIndex;

    if (interaction.holdTimers[pointerIndex]) {
      clearTimeout(interaction.holdTimers[pointerIndex].timeout);
    }
  });
}

function createSignalListener(type) {
  return function (_ref10) {
    var interaction = _ref10.interaction,
        pointer = _ref10.pointer,
        event = _ref10.event,
        eventTarget = _ref10.eventTarget;

    fire({ interaction: interaction, eventTarget: eventTarget, pointer: pointer, event: event, type: type });
  };
}

for (var i = 0; i < simpleSignals.length; i++) {
  Interaction.signals.on(simpleSignals[i], createSignalListener(simpleEvents[i]));
}

Interaction.signals.on('new', function (interaction) {
  interaction.prevTap = null; // the most recent tap event on this interaction
  interaction.tapTime = 0; // time of the most recent tap event
  interaction.holdTimers = []; // [{ duration, timeout }]
});

defaults.pointerEvents = pointerEvents.defaults;
module.exports = pointerEvents;

},{"../Interaction":5,"../defaultOptions":18,"../utils":44,"../utils/Signals":34,"./PointerEvent":29}],31:[function(require,module,exports){
'use strict';

var pointerEvents = require('./base');
var Interaction = require('../Interaction');

pointerEvents.signals.on('new', onNew);
pointerEvents.signals.on('fired', onFired);

var _arr = ['move', 'up', 'cancel', 'endall'];
for (var _i = 0; _i < _arr.length; _i++) {
  var signal = _arr[_i];
  Interaction.signals.on(signal, endHoldRepeat);
}

function onNew(_ref) {
  var pointerEvent = _ref.pointerEvent;

  if (pointerEvent.type !== 'hold') {
    return;
  }

  pointerEvent.count = (pointerEvent.count || 0) + 1;
}

function onFired(_ref2) {
  var interaction = _ref2.interaction,
      pointerEvent = _ref2.pointerEvent,
      eventTarget = _ref2.eventTarget,
      targets = _ref2.targets;

  if (pointerEvent.type !== 'hold' || !targets.length) {
    return;
  }

  // get the repeat interval from the first eventable
  var interval = targets[0].eventable.options.holdRepeatInterval;

  // don't repeat if the interval is 0 or less
  if (interval <= 0) {
    return;
  }

  // set a timeout to fire the holdrepeat event
  interaction.holdIntervalHandle = setTimeout(function () {
    pointerEvents.fire({
      interaction: interaction,
      eventTarget: eventTarget,
      type: 'hold',
      pointer: pointerEvent,
      event: pointerEvent
    });
  }, interval);
}

function endHoldRepeat(_ref3) {
  var interaction = _ref3.interaction;

  // set the interaction's holdStopTime property
  // to stop further holdRepeat events
  if (interaction.holdIntervalHandle) {
    clearInterval(interaction.holdIntervalHandle);
    interaction.holdIntervalHandle = null;
  }
}

// don't repeat by default
pointerEvents.defaults.holdRepeatInterval = 0;
pointerEvents.types.push('holdrepeat');

module.exports = {
  onNew: onNew,
  onFired: onFired,
  endHoldRepeat: endHoldRepeat
};

},{"../Interaction":5,"./base":30}],32:[function(require,module,exports){
'use strict';

var pointerEvents = require('./base');
var Interactable = require('../Interactable');
var is = require('../utils/is');
var scope = require('../scope');
var extend = require('../utils/extend');

var _require = require('../utils/arr'),
    merge = _require.merge;

pointerEvents.signals.on('collect-targets', function (_ref) {
  var targets = _ref.targets,
      element = _ref.element,
      type = _ref.type,
      eventTarget = _ref.eventTarget;

  scope.interactables.forEachMatch(element, function (interactable) {
    var eventable = interactable.events;
    var options = eventable.options;

    if (eventable[type] && is.element(element) && interactable.testIgnoreAllow(options, element, eventTarget)) {

      targets.push({
        element: element,
        eventable: eventable,
        props: { interactable: interactable }
      });
    }
  });
});

Interactable.signals.on('new', function (_ref2) {
  var interactable = _ref2.interactable;

  interactable.events.getRect = function (element) {
    return interactable.getRect(element);
  };
});

Interactable.signals.on('set', function (_ref3) {
  var interactable = _ref3.interactable,
      options = _ref3.options;

  extend(interactable.events.options, pointerEvents.defaults);
  extend(interactable.events.options, options);
});

merge(Interactable.eventTypes, pointerEvents.types);

Interactable.prototype.pointerEvents = function (options) {
  extend(this.events.options, options);

  return this;
};

var __backCompatOption = Interactable.prototype._backCompatOption;

Interactable.prototype._backCompatOption = function (optionName, newValue) {
  var ret = __backCompatOption.call(this, optionName, newValue);

  if (ret === this) {
    this.events.options[optionName] = newValue;
  }

  return ret;
};

Interactable.settingsMethods.push('pointerEvents');

},{"../Interactable":4,"../scope":33,"../utils/arr":35,"../utils/extend":41,"../utils/is":46,"./base":30}],33:[function(require,module,exports){
'use strict';

var utils = require('./utils');
var events = require('./utils/events');
var signals = require('./utils/Signals').new();

var _require = require('./utils/window'),
    getWindow = _require.getWindow;

var scope = {
  signals: signals,
  events: events,
  utils: utils,

  // main document
  document: require('./utils/domObjects').document,
  // all documents being listened to
  documents: [],

  addDocument: function addDocument(doc, win) {
    // do nothing if document is already known
    if (utils.contains(scope.documents, doc)) {
      return false;
    }

    win = win || getWindow(doc);

    scope.documents.push(doc);
    events.documents.push(doc);

    // don't add an unload event for the main document
    // so that the page may be cached in browser history
    if (doc !== scope.document) {
      events.add(win, 'unload', scope.onWindowUnload);
    }

    signals.fire('add-document', { doc: doc, win: win });
  },

  removeDocument: function removeDocument(doc, win) {
    var index = scope.documents.indexOf(doc);

    win = win || getWindow(doc);

    events.remove(win, 'unload', scope.onWindowUnload);

    scope.documents.splice(index, 1);
    events.documents.splice(index, 1);

    signals.fire('remove-document', { win: win, doc: doc });
  },

  onWindowUnload: function onWindowUnload() {
    scope.removeDocument(this.document, this);
  }
};

module.exports = scope;

},{"./utils":44,"./utils/Signals":34,"./utils/domObjects":38,"./utils/events":40,"./utils/window":52}],34:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Signals = function () {
  function Signals() {
    _classCallCheck(this, Signals);

    this.listeners = {
      // signalName: [listeners],
    };
  }

  Signals.prototype.on = function on(name, listener) {
    if (!this.listeners[name]) {
      this.listeners[name] = [listener];
      return;
    }

    this.listeners[name].push(listener);
  };

  Signals.prototype.off = function off(name, listener) {
    if (!this.listeners[name]) {
      return;
    }

    var index = this.listeners[name].indexOf(listener);

    if (index !== -1) {
      this.listeners[name].splice(index, 1);
    }
  };

  Signals.prototype.fire = function fire(name, arg) {
    var targetListeners = this.listeners[name];

    if (!targetListeners) {
      return;
    }

    for (var _i = 0; _i < targetListeners.length; _i++) {
      var _ref;

      _ref = targetListeners[_i];
      var listener = _ref;

      if (listener(arg, name) === false) {
        return;
      }
    }
  };

  return Signals;
}();

Signals.new = function () {
  return new Signals();
};

module.exports = Signals;

},{}],35:[function(require,module,exports){
"use strict";

function contains(array, target) {
  return array.indexOf(target) !== -1;
}

function merge(target, source) {
  for (var _i = 0; _i < source.length; _i++) {
    var _ref;

    _ref = source[_i];
    var item = _ref;

    target.push(item);
  }

  return target;
}

module.exports = {
  contains: contains,
  merge: merge
};

},{}],36:[function(require,module,exports){
'use strict';

var _require = require('./window'),
    window = _require.window;

var is = require('./is');
var domObjects = require('./domObjects');

var Element = domObjects.Element;
var navigator = window.navigator;

var browser = {
  // Does the browser support touch input?
  supportsTouch: !!('ontouchstart' in window || is.function(window.DocumentTouch) && domObjects.document instanceof window.DocumentTouch),

  // Does the browser support PointerEvents
  supportsPointerEvent: !!domObjects.PointerEvent,

  isIOS: /iP(hone|od|ad)/.test(navigator.platform),

  // scrolling doesn't change the result of getClientRects on iOS 7
  isIOS7: /iP(hone|od|ad)/.test(navigator.platform) && /OS 7[^\d]/.test(navigator.appVersion),

  isIe9: /MSIE 9/.test(navigator.userAgent),

  // prefix matchesSelector
  prefixedMatchesSelector: 'matches' in Element.prototype ? 'matches' : 'webkitMatchesSelector' in Element.prototype ? 'webkitMatchesSelector' : 'mozMatchesSelector' in Element.prototype ? 'mozMatchesSelector' : 'oMatchesSelector' in Element.prototype ? 'oMatchesSelector' : 'msMatchesSelector',

  pEventTypes: domObjects.PointerEvent ? domObjects.PointerEvent === window.MSPointerEvent ? {
    up: 'MSPointerUp',
    down: 'MSPointerDown',
    over: 'mouseover',
    out: 'mouseout',
    move: 'MSPointerMove',
    cancel: 'MSPointerCancel'
  } : {
    up: 'pointerup',
    down: 'pointerdown',
    over: 'pointerover',
    out: 'pointerout',
    move: 'pointermove',
    cancel: 'pointercancel'
  } : null,

  // because Webkit and Opera still use 'mousewheel' event type
  wheelEvent: 'onmousewheel' in domObjects.document ? 'mousewheel' : 'wheel'

};

// Opera Mobile must be handled differently
browser.isOperaMobile = navigator.appName === 'Opera' && browser.supportsTouch && navigator.userAgent.match('Presto');

module.exports = browser;

},{"./domObjects":38,"./is":46,"./window":52}],37:[function(require,module,exports){
'use strict';

var is = require('./is');

module.exports = function clone(source) {
  var dest = {};
  for (var prop in source) {
    if (is.plainObject(source[prop])) {
      dest[prop] = clone(source[prop]);
    } else {
      dest[prop] = source[prop];
    }
  }
  return dest;
};

},{"./is":46}],38:[function(require,module,exports){
'use strict';

var domObjects = {};
var win = require('./window').window;

function blank() {}

domObjects.document = win.document;
domObjects.DocumentFragment = win.DocumentFragment || blank;
domObjects.SVGElement = win.SVGElement || blank;
domObjects.SVGSVGElement = win.SVGSVGElement || blank;
domObjects.SVGElementInstance = win.SVGElementInstance || blank;
domObjects.Element = win.Element || blank;
domObjects.HTMLElement = win.HTMLElement || domObjects.Element;

domObjects.Event = win.Event;
domObjects.Touch = win.Touch || blank;
domObjects.PointerEvent = win.PointerEvent || win.MSPointerEvent;

module.exports = domObjects;

},{"./window":52}],39:[function(require,module,exports){
'use strict';

var win = require('./window');
var browser = require('./browser');
var is = require('./is');
var domObjects = require('./domObjects');

var domUtils = {
  nodeContains: function nodeContains(parent, child) {
    while (child) {
      if (child === parent) {
        return true;
      }

      child = child.parentNode;
    }

    return false;
  },

  closest: function closest(element, selector) {
    while (is.element(element)) {
      if (domUtils.matchesSelector(element, selector)) {
        return element;
      }

      element = domUtils.parentNode(element);
    }

    return null;
  },

  parentNode: function parentNode(node) {
    var parent = node.parentNode;

    if (is.docFrag(parent)) {
      // skip past #shado-root fragments
      while ((parent = parent.host) && is.docFrag(parent)) {
        continue;
      }

      return parent;
    }

    return parent;
  },

  matchesSelector: function matchesSelector(element, selector) {
    // remove /deep/ from selectors if shadowDOM polyfill is used
    if (win.window !== win.realWindow) {
      selector = selector.replace(/\/deep\//g, ' ');
    }

    return element[browser.prefixedMatchesSelector](selector);
  },

  // Test for the element that's "above" all other qualifiers
  indexOfDeepestElement: function indexOfDeepestElement(elements) {
    var deepestZoneParents = [];
    var dropzoneParents = [];
    var dropzone = void 0;
    var deepestZone = elements[0];
    var index = deepestZone ? 0 : -1;
    var parent = void 0;
    var child = void 0;
    var i = void 0;
    var n = void 0;

    for (i = 1; i < elements.length; i++) {
      dropzone = elements[i];

      // an element might belong to multiple selector dropzones
      if (!dropzone || dropzone === deepestZone) {
        continue;
      }

      if (!deepestZone) {
        deepestZone = dropzone;
        index = i;
        continue;
      }

      // check if the deepest or current are document.documentElement or document.rootElement
      // - if the current dropzone is, do nothing and continue
      if (dropzone.parentNode === dropzone.ownerDocument) {
        continue;
      }
      // - if deepest is, update with the current dropzone and continue to next
      else if (deepestZone.parentNode === dropzone.ownerDocument) {
          deepestZone = dropzone;
          index = i;
          continue;
        }

      if (!deepestZoneParents.length) {
        parent = deepestZone;
        while (parent.parentNode && parent.parentNode !== parent.ownerDocument) {
          deepestZoneParents.unshift(parent);
          parent = parent.parentNode;
        }
      }

      // if this element is an svg element and the current deepest is
      // an HTMLElement
      if (deepestZone instanceof domObjects.HTMLElement && dropzone instanceof domObjects.SVGElement && !(dropzone instanceof domObjects.SVGSVGElement)) {

        if (dropzone === deepestZone.parentNode) {
          continue;
        }

        parent = dropzone.ownerSVGElement;
      } else {
        parent = dropzone;
      }

      dropzoneParents = [];

      while (parent.parentNode !== parent.ownerDocument) {
        dropzoneParents.unshift(parent);
        parent = parent.parentNode;
      }

      n = 0;

      // get (position of last common ancestor) + 1
      while (dropzoneParents[n] && dropzoneParents[n] === deepestZoneParents[n]) {
        n++;
      }

      var parents = [dropzoneParents[n - 1], dropzoneParents[n], deepestZoneParents[n]];

      child = parents[0].lastChild;

      while (child) {
        if (child === parents[1]) {
          deepestZone = dropzone;
          index = i;
          deepestZoneParents = [];

          break;
        } else if (child === parents[2]) {
          break;
        }

        child = child.previousSibling;
      }
    }

    return index;
  },

  matchesUpTo: function matchesUpTo(element, selector, limit) {
    while (is.element(element)) {
      if (domUtils.matchesSelector(element, selector)) {
        return true;
      }

      element = domUtils.parentNode(element);

      if (element === limit) {
        return domUtils.matchesSelector(element, selector);
      }
    }

    return false;
  },

  getActualElement: function getActualElement(element) {
    return element instanceof domObjects.SVGElementInstance ? element.correspondingUseElement : element;
  },

  getScrollXY: function getScrollXY(relevantWindow) {
    relevantWindow = relevantWindow || win.window;
    return {
      x: relevantWindow.scrollX || relevantWindow.document.documentElement.scrollLeft,
      y: relevantWindow.scrollY || relevantWindow.document.documentElement.scrollTop
    };
  },

  getElementClientRect: function getElementClientRect(element) {
    var clientRect = element instanceof domObjects.SVGElement ? element.getBoundingClientRect() : element.getClientRects()[0];

    return clientRect && {
      left: clientRect.left,
      right: clientRect.right,
      top: clientRect.top,
      bottom: clientRect.bottom,
      width: clientRect.width || clientRect.right - clientRect.left,
      height: clientRect.height || clientRect.bottom - clientRect.top
    };
  },

  getElementRect: function getElementRect(element) {
    var clientRect = domUtils.getElementClientRect(element);

    if (!browser.isIOS7 && clientRect) {
      var scroll = domUtils.getScrollXY(win.getWindow(element));

      clientRect.left += scroll.x;
      clientRect.right += scroll.x;
      clientRect.top += scroll.y;
      clientRect.bottom += scroll.y;
    }

    return clientRect;
  },

  getPath: function getPath(element) {
    var path = [];

    while (element) {
      path.push(element);
      element = domUtils.parentNode(element);
    }

    return path;
  },

  trySelector: function trySelector(value) {
    if (!is.string(value)) {
      return false;
    }

    // an exception will be raised if it is invalid
    domObjects.document.querySelector(value);
    return true;
  }
};

module.exports = domUtils;

},{"./browser":36,"./domObjects":38,"./is":46,"./window":52}],40:[function(require,module,exports){
'use strict';

var is = require('./is');
var domUtils = require('./domUtils');
var pointerUtils = require('./pointerUtils');
var pExtend = require('./pointerExtend');

var _require = require('./window'),
    window = _require.window;

var _require2 = require('./arr'),
    contains = _require2.contains;

var elements = [];
var targets = [];

// {
//   type: {
//     selectors: ['selector', ...],
//     contexts : [document, ...],
//     listeners: [[listener, capture, passive], ...]
//   }
//  }
var delegatedEvents = {};
var documents = [];

var supportsOptions = function () {
  var supported = false;

  window.document.createElement('div').addEventListener('test', null, {
    get capture() {
      supported = true;
    }
  });

  return supported;
}();

function add(element, type, listener, optionalArg) {
  var options = getOptions(optionalArg);
  var elementIndex = elements.indexOf(element);
  var target = targets[elementIndex];

  if (!target) {
    target = {
      events: {},
      typeCount: 0
    };

    elementIndex = elements.push(element) - 1;
    targets.push(target);
  }

  if (!target.events[type]) {
    target.events[type] = [];
    target.typeCount++;
  }

  if (!contains(target.events[type], listener)) {
    element.addEventListener(type, listener, supportsOptions ? options : !!options.capture);
    target.events[type].push(listener);
  }
}

function remove(element, type, listener, optionalArg) {
  var options = getOptions(optionalArg);
  var elementIndex = elements.indexOf(element);
  var target = targets[elementIndex];

  if (!target || !target.events) {
    return;
  }

  if (type === 'all') {
    for (type in target.events) {
      if (target.events.hasOwnProperty(type)) {
        remove(element, type, 'all');
      }
    }
    return;
  }

  if (target.events[type]) {
    var len = target.events[type].length;

    if (listener === 'all') {
      for (var i = 0; i < len; i++) {
        remove(element, type, target.events[type][i], options);
      }
      return;
    } else {
      for (var _i = 0; _i < len; _i++) {
        if (target.events[type][_i] === listener) {
          element.removeEventListener('on' + type, listener, supportsOptions ? options : !!options.capture);
          target.events[type].splice(_i, 1);

          break;
        }
      }
    }

    if (target.events[type] && target.events[type].length === 0) {
      target.events[type] = null;
      target.typeCount--;
    }
  }

  if (!target.typeCount) {
    targets.splice(elementIndex, 1);
    elements.splice(elementIndex, 1);
  }
}

function addDelegate(selector, context, type, listener, optionalArg) {
  var options = getOptions(optionalArg);
  if (!delegatedEvents[type]) {
    delegatedEvents[type] = {
      selectors: [],
      contexts: [],
      listeners: []
    };

    // add delegate listener functions
    for (var _i2 = 0; _i2 < documents.length; _i2++) {
      var doc = documents[_i2];
      add(doc, type, delegateListener);
      add(doc, type, delegateUseCapture, true);
    }
  }

  var delegated = delegatedEvents[type];
  var index = void 0;

  for (index = delegated.selectors.length - 1; index >= 0; index--) {
    if (delegated.selectors[index] === selector && delegated.contexts[index] === context) {
      break;
    }
  }

  if (index === -1) {
    index = delegated.selectors.length;

    delegated.selectors.push(selector);
    delegated.contexts.push(context);
    delegated.listeners.push([]);
  }

  // keep listener and capture and passive flags
  delegated.listeners[index].push([listener, !!options.capture, options.passive]);
}

function removeDelegate(selector, context, type, listener, optionalArg) {
  var options = getOptions(optionalArg);
  var delegated = delegatedEvents[type];
  var matchFound = false;
  var index = void 0;

  if (!delegated) {
    return;
  }

  // count from last index of delegated to 0
  for (index = delegated.selectors.length - 1; index >= 0; index--) {
    // look for matching selector and context Node
    if (delegated.selectors[index] === selector && delegated.contexts[index] === context) {

      var listeners = delegated.listeners[index];

      // each item of the listeners array is an array: [function, capture, passive]
      for (var i = listeners.length - 1; i >= 0; i--) {
        var _listeners$i = listeners[i],
            fn = _listeners$i[0],
            capture = _listeners$i[1],
            passive = _listeners$i[2];

        // check if the listener functions and capture and passive flags match

        if (fn === listener && capture === !!options.capture && passive === options.passive) {
          // remove the listener from the array of listeners
          listeners.splice(i, 1);

          // if all listeners for this interactable have been removed
          // remove the interactable from the delegated arrays
          if (!listeners.length) {
            delegated.selectors.splice(index, 1);
            delegated.contexts.splice(index, 1);
            delegated.listeners.splice(index, 1);

            // remove delegate function from context
            remove(context, type, delegateListener);
            remove(context, type, delegateUseCapture, true);

            // remove the arrays if they are empty
            if (!delegated.selectors.length) {
              delegatedEvents[type] = null;
            }
          }

          // only remove one listener
          matchFound = true;
          break;
        }
      }

      if (matchFound) {
        break;
      }
    }
  }
}

// bound to the interactable context when a DOM event
// listener is added to a selector interactable
function delegateListener(event, optionalArg) {
  var options = getOptions(optionalArg);
  var fakeEvent = {};
  var delegated = delegatedEvents[event.type];

  var _pointerUtils$getEven = pointerUtils.getEventTargets(event),
      eventTarget = _pointerUtils$getEven[0];

  var element = eventTarget;

  // duplicate the event so that currentTarget can be changed
  pExtend(fakeEvent, event);

  fakeEvent.originalEvent = event;
  fakeEvent.preventDefault = preventOriginalDefault;

  // climb up document tree looking for selector matches
  while (is.element(element)) {
    for (var i = 0; i < delegated.selectors.length; i++) {
      var selector = delegated.selectors[i];
      var context = delegated.contexts[i];

      if (domUtils.matchesSelector(element, selector) && domUtils.nodeContains(context, eventTarget) && domUtils.nodeContains(context, element)) {

        var listeners = delegated.listeners[i];

        fakeEvent.currentTarget = element;

        for (var j = 0; j < listeners.length; j++) {
          var _listeners$j = listeners[j],
              fn = _listeners$j[0],
              capture = _listeners$j[1],
              passive = _listeners$j[2];


          if (capture === !!options.capture && passive === options.passive) {
            fn(fakeEvent);
          }
        }
      }
    }

    element = domUtils.parentNode(element);
  }
}

function delegateUseCapture(event) {
  return delegateListener.call(this, event, true);
}

function preventOriginalDefault() {
  this.originalEvent.preventDefault();
}

function getOptions(param) {
  return is.object(param) ? param : { capture: param };
}

module.exports = {
  add: add,
  remove: remove,

  addDelegate: addDelegate,
  removeDelegate: removeDelegate,

  delegateListener: delegateListener,
  delegateUseCapture: delegateUseCapture,
  delegatedEvents: delegatedEvents,
  documents: documents,

  supportsOptions: supportsOptions,

  _elements: elements,
  _targets: targets
};

},{"./arr":35,"./domUtils":39,"./is":46,"./pointerExtend":48,"./pointerUtils":49,"./window":52}],41:[function(require,module,exports){
"use strict";

module.exports = function extend(dest, source) {
  for (var prop in source) {
    dest[prop] = source[prop];
  }
  return dest;
};

},{}],42:[function(require,module,exports){
'use strict';

var _require = require('./rect'),
    resolveRectLike = _require.resolveRectLike,
    rectToXY = _require.rectToXY;

module.exports = function (target, element, action) {
  var actionOptions = target.options[action];
  var actionOrigin = actionOptions && actionOptions.origin;
  var origin = actionOrigin || target.options.origin;

  var originRect = resolveRectLike(origin, target, element, [target && element]);

  return rectToXY(originRect) || { x: 0, y: 0 };
};

},{"./rect":51}],43:[function(require,module,exports){
"use strict";

module.exports = function (x, y) {
  return Math.sqrt(x * x + y * y);
};

},{}],44:[function(require,module,exports){
'use strict';

var extend = require('./extend');
var win = require('./window');

var utils = {
  warnOnce: function warnOnce(method, message) {
    var warned = false;

    return function () {
      if (!warned) {
        win.window.console.warn(message);
        warned = true;
      }

      return method.apply(this, arguments);
    };
  },

  // http://stackoverflow.com/a/5634528/2280888
  _getQBezierValue: function _getQBezierValue(t, p1, p2, p3) {
    var iT = 1 - t;
    return iT * iT * p1 + 2 * iT * t * p2 + t * t * p3;
  },

  getQuadraticCurvePoint: function getQuadraticCurvePoint(startX, startY, cpX, cpY, endX, endY, position) {
    return {
      x: utils._getQBezierValue(position, startX, cpX, endX),
      y: utils._getQBezierValue(position, startY, cpY, endY)
    };
  },

  // http://gizma.com/easing/
  easeOutQuad: function easeOutQuad(t, b, c, d) {
    t /= d;
    return -c * t * (t - 2) + b;
  },

  copyAction: function copyAction(dest, src) {
    dest.name = src.name;
    dest.axis = src.axis;
    dest.edges = src.edges;

    return dest;
  },

  is: require('./is'),
  extend: extend,
  hypot: require('./hypot'),
  getOriginXY: require('./getOriginXY')
};

extend(utils, require('./arr'));
extend(utils, require('./domUtils'));
extend(utils, require('./pointerUtils'));
extend(utils, require('./rect'));

module.exports = utils;

},{"./arr":35,"./domUtils":39,"./extend":41,"./getOriginXY":42,"./hypot":43,"./is":46,"./pointerUtils":49,"./rect":51,"./window":52}],45:[function(require,module,exports){
'use strict';

var scope = require('../scope');
var utils = require('./index');

var finder = {
  methodOrder: ['simulationResume', 'mouseOrPen', 'hasPointer', 'idle'],

  search: function search(pointer, eventType, eventTarget) {
    var pointerType = utils.getPointerType(pointer);
    var pointerId = utils.getPointerId(pointer);
    var details = { pointer: pointer, pointerId: pointerId, pointerType: pointerType, eventType: eventType, eventTarget: eventTarget };

    for (var _i = 0; _i < finder.methodOrder.length; _i++) {
      var _ref;

      _ref = finder.methodOrder[_i];
      var method = _ref;

      var interaction = finder[method](details);

      if (interaction) {
        return interaction;
      }
    }
  },

  // try to resume simulation with a new pointer
  simulationResume: function simulationResume(_ref2) {
    var pointerType = _ref2.pointerType,
        eventType = _ref2.eventType,
        eventTarget = _ref2.eventTarget;

    if (!/down|start/i.test(eventType)) {
      return null;
    }

    for (var _i2 = 0; _i2 < scope.interactions.length; _i2++) {
      var _ref3;

      _ref3 = scope.interactions[_i2];
      var interaction = _ref3;

      var element = eventTarget;

      if (interaction.simulation && interaction.simulation.allowResume && interaction.pointerType === pointerType) {
        while (element) {
          // if the element is the interaction element
          if (element === interaction.element) {
            return interaction;
          }
          element = utils.parentNode(element);
        }
      }
    }

    return null;
  },

  // if it's a mouse or pen interaction
  mouseOrPen: function mouseOrPen(_ref4) {
    var pointerId = _ref4.pointerId,
        pointerType = _ref4.pointerType,
        eventType = _ref4.eventType;

    if (pointerType !== 'mouse' && pointerType !== 'pen') {
      return null;
    }

    var firstNonActive = void 0;

    for (var _i3 = 0; _i3 < scope.interactions.length; _i3++) {
      var _ref5;

      _ref5 = scope.interactions[_i3];
      var interaction = _ref5;

      if (interaction.pointerType === pointerType) {
        // if it's a down event, skip interactions with running simulations
        if (interaction.simulation && !utils.contains(interaction.pointerIds, pointerId)) {
          continue;
        }

        // if the interaction is active, return it immediately
        if (interaction.interacting()) {
          return interaction;
        }
        // otherwise save it and look for another active interaction
        else if (!firstNonActive) {
            firstNonActive = interaction;
          }
      }
    }

    // if no active mouse interaction was found use the first inactive mouse
    // interaction
    if (firstNonActive) {
      return firstNonActive;
    }

    // find any mouse or pen interaction.
    // ignore the interaction if the eventType is a *down, and a simulation
    // is active
    for (var _i4 = 0; _i4 < scope.interactions.length; _i4++) {
      var _ref6;

      _ref6 = scope.interactions[_i4];
      var _interaction = _ref6;

      if (_interaction.pointerType === pointerType && !(/down/i.test(eventType) && _interaction.simulation)) {
        return _interaction;
      }
    }

    return null;
  },

  // get interaction that has this pointer
  hasPointer: function hasPointer(_ref7) {
    var pointerId = _ref7.pointerId;

    for (var _i5 = 0; _i5 < scope.interactions.length; _i5++) {
      var _ref8;

      _ref8 = scope.interactions[_i5];
      var interaction = _ref8;

      if (utils.contains(interaction.pointerIds, pointerId)) {
        return interaction;
      }
    }
  },

  // get first idle interaction with a matching pointerType
  idle: function idle(_ref9) {
    var pointerType = _ref9.pointerType;

    for (var _i6 = 0; _i6 < scope.interactions.length; _i6++) {
      var _ref10;

      _ref10 = scope.interactions[_i6];
      var interaction = _ref10;

      // if there's already a pointer held down
      if (interaction.pointerIds.length === 1) {
        var target = interaction.target;
        // don't add this pointer if there is a target interactable and it
        // isn't gesturable
        if (target && !target.options.gesture.enabled) {
          continue;
        }
      }
      // maximum of 2 pointers per interaction
      else if (interaction.pointerIds.length >= 2) {
          continue;
        }

      if (!interaction.interacting() && pointerType === interaction.pointerType) {
        return interaction;
      }
    }

    return null;
  }
};

module.exports = finder;

},{"../scope":33,"./index":44}],46:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var win = require('./window');
var isWindow = require('./isWindow');

var is = {
  array: function array() {},

  window: function window(thing) {
    return thing === win.window || isWindow(thing);
  },

  docFrag: function docFrag(thing) {
    return is.object(thing) && thing.nodeType === 11;
  },

  object: function object(thing) {
    return !!thing && (typeof thing === 'undefined' ? 'undefined' : _typeof(thing)) === 'object';
  },

  function: function _function(thing) {
    return typeof thing === 'function';
  },

  number: function number(thing) {
    return typeof thing === 'number';
  },

  bool: function bool(thing) {
    return typeof thing === 'boolean';
  },

  string: function string(thing) {
    return typeof thing === 'string';
  },

  element: function element(thing) {
    if (!thing || (typeof thing === 'undefined' ? 'undefined' : _typeof(thing)) !== 'object') {
      return false;
    }

    var _window = win.getWindow(thing) || win.window;

    return (/object|function/.test(_typeof(_window.Element)) ? thing instanceof _window.Element //DOM2
      : thing.nodeType === 1 && typeof thing.nodeName === 'string'
    );
  },

  plainObject: function plainObject(thing) {
    return is.object(thing) && thing.constructor.name === 'Object';
  }
};

is.array = function (thing) {
  return is.object(thing) && typeof thing.length !== 'undefined' && is.function(thing.splice);
};

module.exports = is;

},{"./isWindow":47,"./window":52}],47:[function(require,module,exports){
"use strict";

module.exports = function (thing) {
  return !!(thing && thing.Window) && thing instanceof thing.Window;
};

},{}],48:[function(require,module,exports){
'use strict';

function pointerExtend(dest, source) {
  for (var prop in source) {
    var prefixedPropREs = module.exports.prefixedPropREs;
    var deprecated = false;

    // skip deprecated prefixed properties
    for (var vendor in prefixedPropREs) {
      if (prop.indexOf(vendor) === 0 && prefixedPropREs[vendor].test(prop)) {
        deprecated = true;
        break;
      }
    }

    if (!deprecated && typeof source[prop] !== 'function') {
      dest[prop] = source[prop];
    }
  }
  return dest;
}

pointerExtend.prefixedPropREs = {
  webkit: /(Movement[XY]|Radius[XY]|RotationAngle|Force)$/
};

module.exports = pointerExtend;

},{}],49:[function(require,module,exports){
'use strict';

var hypot = require('./hypot');
var browser = require('./browser');
var dom = require('./domObjects');
var domUtils = require('./domUtils');
var domObjects = require('./domObjects');
var is = require('./is');
var pointerExtend = require('./pointerExtend');

var pointerUtils = {
  copyCoords: function copyCoords(dest, src) {
    dest.page = dest.page || {};
    dest.page.x = src.page.x;
    dest.page.y = src.page.y;

    dest.client = dest.client || {};
    dest.client.x = src.client.x;
    dest.client.y = src.client.y;

    dest.timeStamp = src.timeStamp;
  },

  setCoordDeltas: function setCoordDeltas(targetObj, prev, cur) {
    targetObj.page.x = cur.page.x - prev.page.x;
    targetObj.page.y = cur.page.y - prev.page.y;
    targetObj.client.x = cur.client.x - prev.client.x;
    targetObj.client.y = cur.client.y - prev.client.y;
    targetObj.timeStamp = cur.timeStamp - prev.timeStamp;

    // set pointer velocity
    var dt = Math.max(targetObj.timeStamp / 1000, 0.001);

    targetObj.page.speed = hypot(targetObj.page.x, targetObj.page.y) / dt;
    targetObj.page.vx = targetObj.page.x / dt;
    targetObj.page.vy = targetObj.page.y / dt;

    targetObj.client.speed = hypot(targetObj.client.x, targetObj.page.y) / dt;
    targetObj.client.vx = targetObj.client.x / dt;
    targetObj.client.vy = targetObj.client.y / dt;
  },

  isNativePointer: function isNativePointer(pointer) {
    return pointer instanceof dom.Event || pointer instanceof dom.Touch;
  },

  // Get specified X/Y coords for mouse or event.touches[0]
  getXY: function getXY(type, pointer, xy) {
    xy = xy || {};
    type = type || 'page';

    xy.x = pointer[type + 'X'];
    xy.y = pointer[type + 'Y'];

    return xy;
  },

  getPageXY: function getPageXY(pointer, page) {
    page = page || {};

    // Opera Mobile handles the viewport and scrolling oddly
    if (browser.isOperaMobile && pointerUtils.isNativePointer(pointer)) {
      pointerUtils.getXY('screen', pointer, page);

      page.x += window.scrollX;
      page.y += window.scrollY;
    } else {
      pointerUtils.getXY('page', pointer, page);
    }

    return page;
  },

  getClientXY: function getClientXY(pointer, client) {
    client = client || {};

    if (browser.isOperaMobile && pointerUtils.isNativePointer(pointer)) {
      // Opera Mobile handles the viewport and scrolling oddly
      pointerUtils.getXY('screen', pointer, client);
    } else {
      pointerUtils.getXY('client', pointer, client);
    }

    return client;
  },

  getPointerId: function getPointerId(pointer) {
    return is.number(pointer.pointerId) ? pointer.pointerId : pointer.identifier;
  },

  setCoords: function setCoords(targetObj, pointers, timeStamp) {
    var pointer = pointers.length > 1 ? pointerUtils.pointerAverage(pointers) : pointers[0];

    var tmpXY = {};

    pointerUtils.getPageXY(pointer, tmpXY);
    targetObj.page.x = tmpXY.x;
    targetObj.page.y = tmpXY.y;

    pointerUtils.getClientXY(pointer, tmpXY);
    targetObj.client.x = tmpXY.x;
    targetObj.client.y = tmpXY.y;

    targetObj.timeStamp = is.number(timeStamp) ? timeStamp : new Date().getTime();
  },

  pointerExtend: pointerExtend,

  getTouchPair: function getTouchPair(event) {
    var touches = [];

    // array of touches is supplied
    if (is.array(event)) {
      touches[0] = event[0];
      touches[1] = event[1];
    }
    // an event
    else {
        if (event.type === 'touchend') {
          if (event.touches.length === 1) {
            touches[0] = event.touches[0];
            touches[1] = event.changedTouches[0];
          } else if (event.touches.length === 0) {
            touches[0] = event.changedTouches[0];
            touches[1] = event.changedTouches[1];
          }
        } else {
          touches[0] = event.touches[0];
          touches[1] = event.touches[1];
        }
      }

    return touches;
  },

  pointerAverage: function pointerAverage(pointers) {
    var average = {
      pageX: 0,
      pageY: 0,
      clientX: 0,
      clientY: 0,
      screenX: 0,
      screenY: 0
    };

    for (var _i = 0; _i < pointers.length; _i++) {
      var _ref;

      _ref = pointers[_i];
      var pointer = _ref;

      for (var _prop in average) {
        average[_prop] += pointer[_prop];
      }
    }
    for (var prop in average) {
      average[prop] /= pointers.length;
    }

    return average;
  },

  touchBBox: function touchBBox(event) {
    if (!event.length && !(event.touches && event.touches.length > 1)) {
      return;
    }

    var touches = pointerUtils.getTouchPair(event);
    var minX = Math.min(touches[0].pageX, touches[1].pageX);
    var minY = Math.min(touches[0].pageY, touches[1].pageY);
    var maxX = Math.max(touches[0].pageX, touches[1].pageX);
    var maxY = Math.max(touches[0].pageY, touches[1].pageY);

    return {
      x: minX,
      y: minY,
      left: minX,
      top: minY,
      width: maxX - minX,
      height: maxY - minY
    };
  },

  touchDistance: function touchDistance(event, deltaSource) {
    var sourceX = deltaSource + 'X';
    var sourceY = deltaSource + 'Y';
    var touches = pointerUtils.getTouchPair(event);

    var dx = touches[0][sourceX] - touches[1][sourceX];
    var dy = touches[0][sourceY] - touches[1][sourceY];

    return hypot(dx, dy);
  },

  touchAngle: function touchAngle(event, prevAngle, deltaSource) {
    var sourceX = deltaSource + 'X';
    var sourceY = deltaSource + 'Y';
    var touches = pointerUtils.getTouchPair(event);
    var dx = touches[1][sourceX] - touches[0][sourceX];
    var dy = touches[1][sourceY] - touches[0][sourceY];
    var angle = 180 * Math.atan2(dy, dx) / Math.PI;

    return angle;
  },

  getPointerType: function getPointerType(pointer) {
    return is.string(pointer.pointerType) ? pointer.pointerType : is.number(pointer.pointerType) ? [undefined, undefined, 'touch', 'pen', 'mouse'][pointer.pointerType]
    // if the PointerEvent API isn't available, then the "pointer" must
    // be either a MouseEvent, TouchEvent, or Touch object
    : /touch/.test(pointer.type) || pointer instanceof domObjects.Touch ? 'touch' : 'mouse';
  },

  // [ event.target, event.currentTarget ]
  getEventTargets: function getEventTargets(event) {
    var path = is.function(event.composedPath) ? event.composedPath() : event.path;

    return [domUtils.getActualElement(path ? path[0] : event.target), domUtils.getActualElement(event.currentTarget)];
  }
};

module.exports = pointerUtils;

},{"./browser":36,"./domObjects":38,"./domUtils":39,"./hypot":43,"./is":46,"./pointerExtend":48}],50:[function(require,module,exports){
'use strict';

var _require = require('./window'),
    window = _require.window;

var vendors = ['ms', 'moz', 'webkit', 'o'];
var lastTime = 0;
var request = void 0;
var cancel = void 0;

for (var x = 0; x < vendors.length && !window.requestAnimationFrame; x++) {
  request = window[vendors[x] + 'RequestAnimationFrame'];
  cancel = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
}

if (!request) {
  request = function request(callback) {
    var currTime = new Date().getTime();
    var timeToCall = Math.max(0, 16 - (currTime - lastTime));
    var id = setTimeout(function () {
      callback(currTime + timeToCall);
    }, timeToCall);

    lastTime = currTime + timeToCall;
    return id;
  };
}

if (!cancel) {
  cancel = function cancel(id) {
    clearTimeout(id);
  };
}

module.exports = {
  request: request,
  cancel: cancel
};

},{"./window":52}],51:[function(require,module,exports){
'use strict';

var extend = require('./extend');
var is = require('./is');

var _require = require('./domUtils'),
    closest = _require.closest,
    parentNode = _require.parentNode,
    getElementRect = _require.getElementRect;

var rectUtils = {
  getStringOptionResult: function getStringOptionResult(value, interactable, element) {
    if (!is.string(value)) {
      return null;
    }

    if (value === 'parent') {
      value = parentNode(element);
    } else if (value === 'self') {
      value = interactable.getRect(element);
    } else {
      value = closest(element, value);
    }

    return value;
  },

  resolveRectLike: function resolveRectLike(value, interactable, element, functionArgs) {
    value = rectUtils.getStringOptionResult(value, interactable, element) || value;

    if (is.function(value)) {
      value = value.apply(null, functionArgs);
    }

    if (is.element(value)) {
      value = getElementRect(value);
    }

    return value;
  },

  rectToXY: function rectToXY(rect) {
    return rect && {
      x: 'x' in rect ? rect.x : rect.left,
      y: 'y' in rect ? rect.y : rect.top
    };
  },

  xywhToTlbr: function xywhToTlbr(rect) {
    if (rect && !('left' in rect && 'top' in rect)) {
      rect = extend({}, rect);

      rect.left = rect.x || 0;
      rect.top = rect.y || 0;
      rect.right = rect.right || rect.left + rect.width;
      rect.bottom = rect.bottom || rect.top + rect.height;
    }

    return rect;
  },

  tlbrToXywh: function tlbrToXywh(rect) {
    if (rect && !('x' in rect && 'y' in rect)) {
      rect = extend({}, rect);

      rect.x = rect.left || 0;
      rect.top = rect.top || 0;
      rect.width = rect.width || rect.right - rect.x;
      rect.height = rect.height || rect.bottom - rect.y;
    }

    return rect;
  }
};

module.exports = rectUtils;

},{"./domUtils":39,"./extend":41,"./is":46}],52:[function(require,module,exports){
'use strict';

var win = module.exports;
var isWindow = require('./isWindow');

function init(window) {
  // get wrapped window if using Shadow DOM polyfill

  win.realWindow = window;

  // create a TextNode
  var el = window.document.createTextNode('');

  // check if it's wrapped by a polyfill
  if (el.ownerDocument !== window.document && typeof window.wrap === 'function' && window.wrap(el) === el) {
    // use wrapped window
    window = window.wrap(window);
  }

  win.window = window;
}

if (typeof window === 'undefined') {
  win.window = undefined;
  win.realWindow = undefined;
} else {
  init(window);
}

win.getWindow = function getWindow(node) {
  if (isWindow(node)) {
    return node;
  }

  var rootNode = node.ownerDocument || node;

  return rootNode.defaultView || rootNode.parentWindow || win.window;
};

win.init = init;

},{"./isWindow":47}]},{},[1])(1)
});


//# sourceMappingURL=interact.js.map


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vYXBwL2FwcC50cyIsIndlYnBhY2s6Ly8vLi9hcHAvZXRlcm5pdHkudHMiLCJ3ZWJwYWNrOi8vLy4vYXBwL2ZpZWxkLnRzIiwid2VicGFjazovLy8uL2FwcC9zdGF0ZS50cyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvaW50ZXJhY3Rqcy9kaXN0L2ludGVyYWN0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDbkU4QztBQUNUO0FBRXJDLE1BQU0sS0FBSyxHQUFHLElBQUksaURBQVUsQ0FBQywwREFBZ0IsQ0FBQyxDQUFDO0FBQy9DLEtBQUssQ0FBQyxTQUFTLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7QUNKbEI7QUFBQSwyREFBMkQ7QUFDM0Qsc0ZBQXNGO0FBQ2hGLDBCQUEyQixDQUFTLEVBQUUsQ0FBUyxFQUFFLElBQVk7SUFDakUsT0FBTyxDQUNMLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMs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O0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDOztBQUVEOztBQUVBLENBQUMsRUFBRSx1QkFBdUI7QUFDMUI7O0FBRUEsaURBQWlELDBDQUEwQywwREFBMEQsRUFBRTs7QUFFdko7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsd0JBQXdCO0FBQ3hCLDBCQUEwQjs7QUFFMUI7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTs7O0FBR0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEOztBQUVBOztBQUVBLENBQUMsRUFBRSx3RkFBd0Y7QUFDM0Y7O0FBRUEsaURBQWlELDBD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QWE7QUFDMUIsZUFBZSxhQUFhO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxhQUFhO0FBQzFCLGVBQWUsYUFBYTtBQUM1QjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxhQUFhLGFBQWE7QUFDMUIsZUFBZSxhQUFhO0FBQzVCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGFBQWEscUNBQXFDO0FBQ2xELGVBQWUscUNBQXFDO0FBQ3BEO0FBQ0E7O0FBRUEsMEJBQTBCO0FBQzFCOztBQUVBO0FBQ0E7O0FBRUEsMEJBQTBCOztBQUUxQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLGVBQWU7QUFDN0M7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZDQUE2QyxxQkFBcUI7QUFDbEU7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQixhQUFhLGFBQWE7QUFDMUIsYUFBYSxRQUFRO0FBQ3JCLGNBQWMsT0FBTztBQUNyQjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNB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QUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUEsQ0FBQyxFQUFFLGtJQUFrSTtBQUNySTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLENBQUM7O0FBRUQ7O0FBRUE7O0FBRUE7O0FBRUEsQ0FBQyxFQUFFLG1IQUFtSDtBQUN0SDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtB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QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsNEJBQTRCLDJCQUEyQjtBQUN2RDs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsa0JBQWtCLGdDQUFnQztBQUNsRDs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUEsQ0FBQyxFQUFFLGdMQUFnTDtBQUNuTDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBLENBQUMsRUFBRSxzRkFBc0Y7QUFDekY7O0FBRUE7O0FBRUEsQ0FBQyxFQUFFLG1DQUFtQztBQUN0Qzs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLENBQUMsRUFBRSwrQkFBK0I7QUFDbEM7O0FBRUE7O0FBRUEsQ0FBQyxFQUFFLG1DQUFtQztBQUN0Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBLGFBQWEsYUFBYTs7QUFFMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsQ0FBQyxHQUFHO0FBQ0o7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBLENBQUMsRUFBRSwrZUFBK2U7QUFDbGY7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsZ0JBQWdCOztBQUVoQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSw0QkFBNEI7QUFDNUI7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztB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QUE0Qjs7QUFFNUI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUEscUJBQXFCLHNCQUFzQjtBQUMzQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLHVCQUF1QixzQ0FBc0M7QUFDN0Q7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEscUNBQXFDLFNBQVM7QUFDOUM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSxDQUFDLEVBQUUsa0VBQWtFO0FBQ3JFOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtB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O0FBQ0Esa0JBQWtCLG9CQUFvQjtBQUN0Qzs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxDQUFDLEdBQUc7QUFDSjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUEsQ0FBQyxFQUFFLDBDQUEwQztBQUM3Qzs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsQ0FBQyxFQUFFLFVBQVU7QUFDYjs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxDQUFDLEVBQUUsY0FBYztBQUNqQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxlQUFlLHFCQUFxQjtBQUNwQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLE9BQU87QUFDUDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxDQUFDLEVBQUUseURBQXlEO0FBQzVEOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtB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QUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxDQUFDLEVBQUUsOEJBQThCO0FBQ2pDOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxDQUFDLEdBQUc7QUFDSjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBLENBQUMsR0FBRztBQUNKOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQSxHQUFHOztBQUVIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7O0FBRUg7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG9CQUFvQixzQkFBc0I7QUFDMUM7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxDQUFDLEVBQUUsNkZBQTZGO0FBQ2hHOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsZUFBZSxxREFBcUQ7QUFDcEU7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxDQUFDLEVBQUUsY0FBYztBQUNqQjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxzQkFBc0I7O0FBRXRCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxzQkFBc0I7O0FBRXRCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBLENBQUMsRUFBRSx3Q0FBd0M7QUFDM0M7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUEsQ0FBQyxFQUFFLGdCQUFnQixFQUFFLEdBQUc7QUFDeEIsQ0FBQzs7O0FBR0QiLCJmaWxlIjoic2NyaXB0cy9hbGwuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9hcHAvYXBwLnRzXCIpO1xuIiwiaW1wb3J0IHsgZXRlcm5pdHlGdW5jdGlvbiB9IGZyb20gJy4vZXRlcm5pdHknO1xuaW1wb3J0IHsgV29ybGRGaWVsZCB9IGZyb20gJy4vZmllbGQnO1xuXG5jb25zdCB3b3JsZCA9IG5ldyBXb3JsZEZpZWxkKGV0ZXJuaXR5RnVuY3Rpb24pO1xud29ybGQudGltZVN0YXJ0KCk7XG4iLCIvLyBUaGUgcmV0dXJuZWQgdmFsdWUgc2hvdWxkIGJlIGluIHRoZSByYW5nZSBmcm9tIDAgdG8gMjU1LlxuLy8gV2hlcmUgMCBpcyBibGFjayBhbmQgMjU1IGlzIHdoaXRlIGFuZCBpbnRlcm1lZGlhdGUgdmFsdWVzIGFyZSBzaGFkZXMgb2YgZ3JheSBjb2xvci5cbmV4cG9ydCBmdW5jdGlvbiBldGVybml0eUZ1bmN0aW9uKHg6IG51bWJlciwgeTogbnVtYmVyLCB0aW1lOiBudW1iZXIpIHtcbiAgcmV0dXJuIChcbiAgICAoTWF0aC5zaW4oKHggKyBNYXRoLnNpbih0aW1lIC8gMTAwKSAqIDEwMCkgLyAxMCkgK1xuICAgICAgTWF0aC5jb3MoKHkgKyBNYXRoLmNvcyh0aW1lIC8gMTAwKSAqIDEwMCkgLyAxMCkpICpcbiAgICAyNTUgL1xuICAgIDJcbiAgKTtcbn1cbiIsImltcG9ydCAqIGFzIGludGVyYWN0IGZyb20gJ2ludGVyYWN0anMnO1xuaW1wb3J0IHsgc3RhdGUsIHNldFZpZXcgfSBmcm9tICcuL3N0YXRlJztcblxuZXhwb3J0IGNsYXNzIFdvcmxkRmllbGQge1xuICBwcml2YXRlIGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQ7XG4gIHByaXZhdGUgY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XG4gIHByaXZhdGUgaXNUaW1lUGxheWVkID0gZmFsc2U7XG4gIHByaXZhdGUgdGltZSA9IDEwO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZXRlcm5pdHlGdW5jdGlvbikge1xuICAgIHRoaXMuY2FudmFzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NhbnZhcycpO1xuICAgIHRoaXMuY3R4ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLmZpdENhbnZhc1RvV2luZG93KTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignd2hlZWwnLCB0aGlzLnpvb21GaWVsZCk7XG4gICAgdGhpcy5maXRDYW52YXNUb1dpbmRvdygpO1xuXG4gICAgaW50ZXJhY3QoJyNjYW52YXMnKVxuICAgICAgLmRyYWdnYWJsZSh7XG4gICAgICAgIG9ubW92ZTogKGV2ZW50OiBpbnRlcmFjdC5JbnRlcmFjdEV2ZW50KSA9PlxuICAgICAgICAgIHNldFZpZXcoe1xuICAgICAgICAgICAgLi4uc3RhdGUudmlldyxcbiAgICAgICAgICAgIHg6IHN0YXRlLnZpZXcueCArIGV2ZW50LmR4IC8gc3RhdGUudmlldy5zY2FsZSxcbiAgICAgICAgICAgIHk6IHN0YXRlLnZpZXcueSArIGV2ZW50LmR5IC8gc3RhdGUudmlldy5zY2FsZVxuICAgICAgICAgIH0pXG4gICAgICB9KVxuICAgICAgLnN0eWxlQ3Vyc29yKGZhbHNlKTtcbiAgfVxuXG4gIHByaXZhdGUgdGltZVRpY2soKSB7XG4gICAgdGhpcy50aW1lKys7XG4gICAgdGhpcy5kcmF3KCk7XG4gICAgaWYgKHRoaXMuaXNUaW1lUGxheWVkKVxuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHRoaXMudGltZVRpY2soKSk7XG4gIH1cblxuICBwdWJsaWMgdGltZVN0YXJ0KCkge1xuICAgIHRoaXMuaXNUaW1lUGxheWVkID0gdHJ1ZTtcbiAgICB0aGlzLnRpbWVUaWNrKCk7XG4gIH1cblxuICBwdWJsaWMgdGltZVN0b3AgPSAoKSA9PiAodGhpcy5pc1RpbWVQbGF5ZWQgPSBmYWxzZSk7XG5cbiAgcHJpdmF0ZSBmaXRDYW52YXNUb1dpbmRvdygpIHtcbiAgICB0aGlzLmNhbnZhcy53aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoIC8gc3RhdGUuc2V0dGluZ3MuZGltZW5zaW9uO1xuICAgIHRoaXMuY2FudmFzLmhlaWdodCA9XG4gICAgICB3aW5kb3cuaW5uZXJIZWlnaHQgLyBzdGF0ZS5zZXR0aW5ncy5kaW1lbnNpb247XG4gICAgdGhpcy5jYW52YXMuc3R5bGUud2lkdGggPSBgJHt3aW5kb3cuaW5uZXJXaWR0aH1weGA7XG4gICAgdGhpcy5jYW52YXMuc3R5bGUuaGVpZ2h0ID0gYCR7d2luZG93LmlubmVySGVpZ2h0fXB4YDtcbiAgfVxuXG4gIHByaXZhdGUgem9vbUZpZWxkKGV2ZW50OiBXaGVlbEV2ZW50KSB7XG4gICAgY29uc3Qgc2NhbGVEZWx0YSA9IGV2ZW50LmRlbHRhWSAvIHN0YXRlLnNldHRpbmdzLnNjYWxlU3BlZWQ7XG4gICAgY29uc3QgbmV3U2NhbGUgPSBzdGF0ZS52aWV3LnNjYWxlICsgc2NhbGVEZWx0YTtcbiAgICBjb25zdCBuZXdXaWR0aCA9IHRoaXMuY2FudmFzLndpZHRoIC8gbmV3U2NhbGU7XG4gICAgY29uc3QgbmV3SGVpZ2h0ID0gdGhpcy5jYW52YXMuaGVpZ2h0IC8gbmV3U2NhbGU7XG4gICAgY29uc3Qgb2xkV2lkdGggPSB0aGlzLmNhbnZhcy53aWR0aCAvIHN0YXRlLnZpZXcuc2NhbGU7XG4gICAgY29uc3Qgb2xkSGVpZ2h0ID0gdGhpcy5jYW52YXMuaGVpZ2h0IC8gc3RhdGUudmlldy5zY2FsZTtcbiAgICBjb25zdCBhZGFwdGl2ZU1vdXNlWCA9XG4gICAgICBldmVudC5wYWdlWCAvIHN0YXRlLnNldHRpbmdzLmRpbWVuc2lvbiAvIHN0YXRlLnZpZXcuc2NhbGU7XG4gICAgY29uc3QgYWRhcHRpdmVNb3VzZVkgPVxuICAgICAgZXZlbnQucGFnZVkgLyBzdGF0ZS5zZXR0aW5ncy5kaW1lbnNpb24gLyBzdGF0ZS52aWV3LnNjYWxlO1xuICAgIGNvbnN0IG1vdXNlUGVyY2VudFggPVxuICAgICAgKGFkYXB0aXZlTW91c2VYIC0gb2xkV2lkdGggLyAyKSAvIChvbGRXaWR0aCAvIDIpO1xuICAgIGNvbnN0IG1vdXNlUGVyY2VudFkgPVxuICAgICAgKGFkYXB0aXZlTW91c2VZIC0gb2xkSGVpZ2h0IC8gMikgLyAob2xkSGVpZ2h0IC8gMik7XG4gICAgY29uc3Qgd2lkdGhEaWZmID1cbiAgICAgIG9sZFdpZHRoIC0gbmV3V2lkdGggKyAob2xkV2lkdGggLSBuZXdXaWR0aCkgKiBtb3VzZVBlcmNlbnRYO1xuICAgIGNvbnN0IGhlaWdodERpZmYgPVxuICAgICAgb2xkSGVpZ2h0IC0gbmV3SGVpZ2h0ICsgKG9sZEhlaWdodCAtIG5ld0hlaWdodCkgKiBtb3VzZVBlcmNlbnRZO1xuICAgIGNvbnN0IHhEaWZmID0gd2lkdGhEaWZmIC8gMiAqIHN0YXRlLnNldHRpbmdzLmRpbWVuc2lvbjtcbiAgICBjb25zdCB5RGlmZiA9IGhlaWdodERpZmYgLyAyICogc3RhdGUuc2V0dGluZ3MuZGltZW5zaW9uO1xuICAgIHNldFZpZXcoe1xuICAgICAgLi4uc3RhdGUudmlldyxcbiAgICAgIHg6IHN0YXRlLnZpZXcueCAtIHhEaWZmLFxuICAgICAgeTogc3RhdGUudmlldy55IC0geURpZmYsXG4gICAgICBzY2FsZTogbmV3U2NhbGVcbiAgICB9KTtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBkcmF3KCkge1xuICAgIGNvbnN0IHsgd2lkdGgsIGhlaWdodCB9ID0gdGhpcy5jYW52YXM7XG5cbiAgICBjb25zdCBkcmF3UGl4ZWwgPSAoeDogbnVtYmVyLCB5OiBudW1iZXIsIGNvbG9yOiBudW1iZXIpID0+IHtcbiAgICAgIHggPSBNYXRoLnJvdW5kKHgpO1xuICAgICAgeSA9IE1hdGgucm91bmQoeSk7XG4gICAgICBjb25zdCBoZXhDb2xvckdyYXkgPSBNYXRoLnJvdW5kKGNvbG9yKTtcbiAgICAgIGxldCBoZXhDb2xvciA9IGByZ2IoJHtoZXhDb2xvckdyYXl9LCR7aGV4Q29sb3JHcmF5fSwke2hleENvbG9yR3JheX0pYDtcbiAgICAgIGlmIChjb2xvciA+IDI1NSkgaGV4Q29sb3IgPSAnI2ZmMDAwMCc7XG4gICAgICBpZiAoY29sb3IgPCAwKSBoZXhDb2xvciA9ICcjMDBmZjAwJztcbiAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IGhleENvbG9yO1xuICAgICAgdGhpcy5jdHguZmlsbFJlY3QoeCwgeSwgMSwgMSk7XG4gICAgfTtcblxuICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9ICcjMDAwJztcbiAgICB0aGlzLmN0eC5maWxsUmVjdCgwLCAwLCB0aGlzLmNhbnZhcy53aWR0aCwgdGhpcy5jYW52YXMuaGVpZ2h0KTtcbiAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSAnI2ZmZic7XG5cbiAgICBBcnJheSh3aWR0aCAqIGhlaWdodClcbiAgICAgIC5maWxsKDApXG4gICAgICAubWFwKCh2LCBpKSA9PiB7XG4gICAgICAgIGNvbnN0IHggPSBpICUgd2lkdGg7XG4gICAgICAgIGNvbnN0IHkgPSBNYXRoLmZsb29yKGkgLyB3aWR0aCk7XG5cbiAgICAgICAgY29uc3QgZXRYID1cbiAgICAgICAgICB4IC8gc3RhdGUudmlldy5zY2FsZSAtXG4gICAgICAgICAgc3RhdGUudmlldy54IC8gc3RhdGUuc2V0dGluZ3MuZGltZW5zaW9uO1xuICAgICAgICBjb25zdCBldFkgPVxuICAgICAgICAgIHkgLyBzdGF0ZS52aWV3LnNjYWxlIC1cbiAgICAgICAgICBzdGF0ZS52aWV3LnkgLyBzdGF0ZS5zZXR0aW5ncy5kaW1lbnNpb247XG5cbiAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLmV0ZXJuaXR5RnVuY3Rpb24oZXRYLCBldFksIHRoaXMudGltZSk7XG4gICAgICAgIGlmICh2YWx1ZSA+IDApIGRyYXdQaXhlbCh4LCB5LCB2YWx1ZSk7XG4gICAgICB9KTtcbiAgfVxufVxuIiwiZXhwb3J0IGludGVyZmFjZSBWaWV3U3RhdGUge1xuICB4OiBudW1iZXI7XG4gIHk6IG51bWJlcjtcbiAgc2NhbGU6IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBTZXR0aW5nc1N0YXRlIHtcbiAgc2NhbGVTcGVlZDogbnVtYmVyO1xuICBkaW1lbnNpb246IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBTdGF0ZSB7XG4gIHZpZXc6IFZpZXdTdGF0ZTtcbiAgc2V0dGluZ3M6IFNldHRpbmdzU3RhdGU7XG59XG5cbmV4cG9ydCBjb25zdCBzdGF0ZTogU3RhdGUgPSB7XG4gIHZpZXc6IHtcbiAgICB4OiAwLFxuICAgIHk6IDAsXG4gICAgc2NhbGU6IDAuNVxuICB9LFxuICBzZXR0aW5nczoge1xuICAgIHNjYWxlU3BlZWQ6IDEwMDAsXG4gICAgZGltZW5zaW9uOiA0XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBzZXRWaWV3ID0gKHZpZXdTdGF0ZTogVmlld1N0YXRlKSA9PlxuICAoc3RhdGUudmlldyA9IHZpZXdTdGF0ZSk7XG4iLCIvKipcbiAqIGludGVyYWN0LmpzIHYxLjMuNFxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxMi0yMDE4IFRheWUgQWRleWVtaSA8ZGV2QHRheWUubWU+XG4gKiBSZWxlYXNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG4gKiBodHRwczovL3Jhdy5naXRodWIuY29tL3RheWUvaW50ZXJhY3QuanMvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuKGZ1bmN0aW9uKGYpe2lmKHR5cGVvZiBleHBvcnRzPT09XCJvYmplY3RcIiYmdHlwZW9mIG1vZHVsZSE9PVwidW5kZWZpbmVkXCIpe21vZHVsZS5leHBvcnRzPWYoKX1lbHNlIGlmKHR5cGVvZiBkZWZpbmU9PT1cImZ1bmN0aW9uXCImJmRlZmluZS5hbWQpe2RlZmluZShbXSxmKX1lbHNle3ZhciBnO2lmKHR5cGVvZiB3aW5kb3chPT1cInVuZGVmaW5lZFwiKXtnPXdpbmRvd31lbHNlIGlmKHR5cGVvZiBnbG9iYWwhPT1cInVuZGVmaW5lZFwiKXtnPWdsb2JhbH1lbHNlIGlmKHR5cGVvZiBzZWxmIT09XCJ1bmRlZmluZWRcIil7Zz1zZWxmfWVsc2V7Zz10aGlzfWcuaW50ZXJhY3QgPSBmKCl9fSkoZnVuY3Rpb24oKXt2YXIgZGVmaW5lLG1vZHVsZSxleHBvcnRzO3JldHVybiAoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSh7MTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4ndXNlIHN0cmljdCc7XG5cbi8qXG4gKiBJbiBhICh3aW5kb3dsZXNzKSBzZXJ2ZXIgZW52aXJvbm1lbnQgdGhpcyBmaWxlIGV4cG9ydHMgYSBmYWN0b3J5IGZ1bmN0aW9uXG4gKiB0aGF0IHRha2VzIHRoZSB3aW5kb3cgdG8gdXNlLlxuICpcbiAqICAgICB2YXIgaW50ZXJhY3QgPSByZXF1aXJlKCdpbnRlcmFjdC5qcycpKHdpbmRvd09iamVjdCk7XG4gKlxuICogU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS90YXllL2ludGVyYWN0LmpzL2lzc3Vlcy8xODdcbiAqL1xuaWYgKHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnKSB7XG4gIG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHdpbmRvdykge1xuICAgIHJlcXVpcmUoJy4vc3JjL3V0aWxzL3dpbmRvdycpLmluaXQod2luZG93KTtcblxuICAgIHJldHVybiByZXF1aXJlKCcuL3NyYy9pbmRleCcpO1xuICB9O1xufSBlbHNlIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL3NyYy9pbmRleCcpO1xufVxuXG59LHtcIi4vc3JjL2luZGV4XCI6MTksXCIuL3NyYy91dGlscy93aW5kb3dcIjo1Mn1dLDI6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG52YXIgZXh0ZW5kID0gcmVxdWlyZSgnLi91dGlscy9leHRlbmQuanMnKTtcblxuZnVuY3Rpb24gZmlyZVVudGlsSW1tZWRpYXRlU3RvcHBlZChldmVudCwgbGlzdGVuZXJzKSB7XG4gIGZvciAodmFyIF9pID0gMDsgX2kgPCBsaXN0ZW5lcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgdmFyIF9yZWY7XG5cbiAgICBfcmVmID0gbGlzdGVuZXJzW19pXTtcbiAgICB2YXIgbGlzdGVuZXIgPSBfcmVmO1xuXG4gICAgaWYgKGV2ZW50LmltbWVkaWF0ZVByb3BhZ2F0aW9uU3RvcHBlZCkge1xuICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgbGlzdGVuZXIoZXZlbnQpO1xuICB9XG59XG5cbnZhciBFdmVudGFibGUgPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIEV2ZW50YWJsZShvcHRpb25zKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEV2ZW50YWJsZSk7XG5cbiAgICB0aGlzLm9wdGlvbnMgPSBleHRlbmQoe30sIG9wdGlvbnMgfHwge30pO1xuICB9XG5cbiAgRXZlbnRhYmxlLnByb3RvdHlwZS5maXJlID0gZnVuY3Rpb24gZmlyZShldmVudCkge1xuICAgIHZhciBsaXN0ZW5lcnMgPSB2b2lkIDA7XG4gICAgdmFyIG9uRXZlbnQgPSAnb24nICsgZXZlbnQudHlwZTtcbiAgICB2YXIgZ2xvYmFsID0gdGhpcy5nbG9iYWw7XG5cbiAgICAvLyBJbnRlcmFjdGFibGUjb24oKSBsaXN0ZW5lcnNcbiAgICBpZiAobGlzdGVuZXJzID0gdGhpc1tldmVudC50eXBlXSkge1xuICAgICAgZmlyZVVudGlsSW1tZWRpYXRlU3RvcHBlZChldmVudCwgbGlzdGVuZXJzKTtcbiAgICB9XG5cbiAgICAvLyBpbnRlcmFjdGFibGUub25ldmVudCBsaXN0ZW5lclxuICAgIGlmICh0aGlzW29uRXZlbnRdKSB7XG4gICAgICB0aGlzW29uRXZlbnRdKGV2ZW50KTtcbiAgICB9XG5cbiAgICAvLyBpbnRlcmFjdC5vbigpIGxpc3RlbmVyc1xuICAgIGlmICghZXZlbnQucHJvcGFnYXRpb25TdG9wcGVkICYmIGdsb2JhbCAmJiAobGlzdGVuZXJzID0gZ2xvYmFsW2V2ZW50LnR5cGVdKSkge1xuICAgICAgZmlyZVVudGlsSW1tZWRpYXRlU3RvcHBlZChldmVudCwgbGlzdGVuZXJzKTtcbiAgICB9XG4gIH07XG5cbiAgRXZlbnRhYmxlLnByb3RvdHlwZS5vbiA9IGZ1bmN0aW9uIG9uKGV2ZW50VHlwZSwgbGlzdGVuZXIpIHtcbiAgICAvLyBpZiB0aGlzIHR5cGUgb2YgZXZlbnQgd2FzIG5ldmVyIGJvdW5kXG4gICAgaWYgKHRoaXNbZXZlbnRUeXBlXSkge1xuICAgICAgdGhpc1tldmVudFR5cGVdLnB1c2gobGlzdGVuZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzW2V2ZW50VHlwZV0gPSBbbGlzdGVuZXJdO1xuICAgIH1cbiAgfTtcblxuICBFdmVudGFibGUucHJvdG90eXBlLm9mZiA9IGZ1bmN0aW9uIG9mZihldmVudFR5cGUsIGxpc3RlbmVyKSB7XG4gICAgLy8gaWYgaXQgaXMgYW4gYWN0aW9uIGV2ZW50IHR5cGVcbiAgICB2YXIgZXZlbnRMaXN0ID0gdGhpc1tldmVudFR5cGVdO1xuICAgIHZhciBpbmRleCA9IGV2ZW50TGlzdCA/IGV2ZW50TGlzdC5pbmRleE9mKGxpc3RlbmVyKSA6IC0xO1xuXG4gICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgZXZlbnRMaXN0LnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxuXG4gICAgaWYgKGV2ZW50TGlzdCAmJiBldmVudExpc3QubGVuZ3RoID09PSAwIHx8ICFsaXN0ZW5lcikge1xuICAgICAgdGhpc1tldmVudFR5cGVdID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gRXZlbnRhYmxlO1xufSgpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEV2ZW50YWJsZTtcblxufSx7XCIuL3V0aWxzL2V4dGVuZC5qc1wiOjQxfV0sMzpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4ndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbnZhciBleHRlbmQgPSByZXF1aXJlKCcuL3V0aWxzL2V4dGVuZCcpO1xudmFyIGdldE9yaWdpblhZID0gcmVxdWlyZSgnLi91dGlscy9nZXRPcmlnaW5YWScpO1xudmFyIGRlZmF1bHRzID0gcmVxdWlyZSgnLi9kZWZhdWx0T3B0aW9ucycpO1xudmFyIHNpZ25hbHMgPSByZXF1aXJlKCcuL3V0aWxzL1NpZ25hbHMnKS5uZXcoKTtcblxudmFyIEludGVyYWN0RXZlbnQgPSBmdW5jdGlvbiAoKSB7XG4gIC8qKiAqL1xuICBmdW5jdGlvbiBJbnRlcmFjdEV2ZW50KGludGVyYWN0aW9uLCBldmVudCwgYWN0aW9uLCBwaGFzZSwgZWxlbWVudCwgcmVsYXRlZCkge1xuICAgIHZhciBwcmVFbmQgPSBhcmd1bWVudHMubGVuZ3RoID4gNiAmJiBhcmd1bWVudHNbNl0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1s2XSA6IGZhbHNlO1xuXG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEludGVyYWN0RXZlbnQpO1xuXG4gICAgdmFyIHRhcmdldCA9IGludGVyYWN0aW9uLnRhcmdldDtcbiAgICB2YXIgZGVsdGFTb3VyY2UgPSAodGFyZ2V0ICYmIHRhcmdldC5vcHRpb25zIHx8IGRlZmF1bHRzKS5kZWx0YVNvdXJjZTtcbiAgICB2YXIgb3JpZ2luID0gZ2V0T3JpZ2luWFkodGFyZ2V0LCBlbGVtZW50LCBhY3Rpb24pO1xuICAgIHZhciBzdGFydGluZyA9IHBoYXNlID09PSAnc3RhcnQnO1xuICAgIHZhciBlbmRpbmcgPSBwaGFzZSA9PT0gJ2VuZCc7XG4gICAgdmFyIGNvb3JkcyA9IHN0YXJ0aW5nID8gaW50ZXJhY3Rpb24uc3RhcnRDb29yZHMgOiBpbnRlcmFjdGlvbi5jdXJDb29yZHM7XG4gICAgdmFyIHByZXZFdmVudCA9IGludGVyYWN0aW9uLnByZXZFdmVudDtcblxuICAgIGVsZW1lbnQgPSBlbGVtZW50IHx8IGludGVyYWN0aW9uLmVsZW1lbnQ7XG5cbiAgICB2YXIgcGFnZSA9IGV4dGVuZCh7fSwgY29vcmRzLnBhZ2UpO1xuICAgIHZhciBjbGllbnQgPSBleHRlbmQoe30sIGNvb3Jkcy5jbGllbnQpO1xuXG4gICAgcGFnZS54IC09IG9yaWdpbi54O1xuICAgIHBhZ2UueSAtPSBvcmlnaW4ueTtcblxuICAgIGNsaWVudC54IC09IG9yaWdpbi54O1xuICAgIGNsaWVudC55IC09IG9yaWdpbi55O1xuXG4gICAgdGhpcy5jdHJsS2V5ID0gZXZlbnQuY3RybEtleTtcbiAgICB0aGlzLmFsdEtleSA9IGV2ZW50LmFsdEtleTtcbiAgICB0aGlzLnNoaWZ0S2V5ID0gZXZlbnQuc2hpZnRLZXk7XG4gICAgdGhpcy5tZXRhS2V5ID0gZXZlbnQubWV0YUtleTtcbiAgICB0aGlzLmJ1dHRvbiA9IGV2ZW50LmJ1dHRvbjtcbiAgICB0aGlzLmJ1dHRvbnMgPSBldmVudC5idXR0b25zO1xuICAgIHRoaXMudGFyZ2V0ID0gZWxlbWVudDtcbiAgICB0aGlzLmN1cnJlbnRUYXJnZXQgPSBlbGVtZW50O1xuICAgIHRoaXMucmVsYXRlZFRhcmdldCA9IHJlbGF0ZWQgfHwgbnVsbDtcbiAgICB0aGlzLnByZUVuZCA9IHByZUVuZDtcbiAgICB0aGlzLnR5cGUgPSBhY3Rpb24gKyAocGhhc2UgfHwgJycpO1xuICAgIHRoaXMuaW50ZXJhY3Rpb24gPSBpbnRlcmFjdGlvbjtcbiAgICB0aGlzLmludGVyYWN0YWJsZSA9IHRhcmdldDtcblxuICAgIHRoaXMudDAgPSBzdGFydGluZyA/IGludGVyYWN0aW9uLmRvd25UaW1lc1tpbnRlcmFjdGlvbi5kb3duVGltZXMubGVuZ3RoIC0gMV0gOiBwcmV2RXZlbnQudDA7XG5cbiAgICB2YXIgc2lnbmFsQXJnID0ge1xuICAgICAgaW50ZXJhY3Rpb246IGludGVyYWN0aW9uLFxuICAgICAgZXZlbnQ6IGV2ZW50LFxuICAgICAgYWN0aW9uOiBhY3Rpb24sXG4gICAgICBwaGFzZTogcGhhc2UsXG4gICAgICBlbGVtZW50OiBlbGVtZW50LFxuICAgICAgcmVsYXRlZDogcmVsYXRlZCxcbiAgICAgIHBhZ2U6IHBhZ2UsXG4gICAgICBjbGllbnQ6IGNsaWVudCxcbiAgICAgIGNvb3JkczogY29vcmRzLFxuICAgICAgc3RhcnRpbmc6IHN0YXJ0aW5nLFxuICAgICAgZW5kaW5nOiBlbmRpbmcsXG4gICAgICBkZWx0YVNvdXJjZTogZGVsdGFTb3VyY2UsXG4gICAgICBpRXZlbnQ6IHRoaXNcbiAgICB9O1xuXG4gICAgc2lnbmFscy5maXJlKCdzZXQteHknLCBzaWduYWxBcmcpO1xuXG4gICAgaWYgKGVuZGluZykge1xuICAgICAgLy8gdXNlIHByZXZpb3VzIGNvb3JkcyB3aGVuIGVuZGluZ1xuICAgICAgdGhpcy5wYWdlWCA9IHByZXZFdmVudC5wYWdlWDtcbiAgICAgIHRoaXMucGFnZVkgPSBwcmV2RXZlbnQucGFnZVk7XG4gICAgICB0aGlzLmNsaWVudFggPSBwcmV2RXZlbnQuY2xpZW50WDtcbiAgICAgIHRoaXMuY2xpZW50WSA9IHByZXZFdmVudC5jbGllbnRZO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnBhZ2VYID0gcGFnZS54O1xuICAgICAgdGhpcy5wYWdlWSA9IHBhZ2UueTtcbiAgICAgIHRoaXMuY2xpZW50WCA9IGNsaWVudC54O1xuICAgICAgdGhpcy5jbGllbnRZID0gY2xpZW50Lnk7XG4gICAgfVxuXG4gICAgdGhpcy54MCA9IGludGVyYWN0aW9uLnN0YXJ0Q29vcmRzLnBhZ2UueCAtIG9yaWdpbi54O1xuICAgIHRoaXMueTAgPSBpbnRlcmFjdGlvbi5zdGFydENvb3Jkcy5wYWdlLnkgLSBvcmlnaW4ueTtcbiAgICB0aGlzLmNsaWVudFgwID0gaW50ZXJhY3Rpb24uc3RhcnRDb29yZHMuY2xpZW50LnggLSBvcmlnaW4ueDtcbiAgICB0aGlzLmNsaWVudFkwID0gaW50ZXJhY3Rpb24uc3RhcnRDb29yZHMuY2xpZW50LnkgLSBvcmlnaW4ueTtcblxuICAgIHNpZ25hbHMuZmlyZSgnc2V0LWRlbHRhJywgc2lnbmFsQXJnKTtcblxuICAgIHRoaXMudGltZVN0YW1wID0gY29vcmRzLnRpbWVTdGFtcDtcbiAgICB0aGlzLmR0ID0gaW50ZXJhY3Rpb24ucG9pbnRlckRlbHRhLnRpbWVTdGFtcDtcbiAgICB0aGlzLmR1cmF0aW9uID0gdGhpcy50aW1lU3RhbXAgLSB0aGlzLnQwO1xuXG4gICAgLy8gc3BlZWQgYW5kIHZlbG9jaXR5IGluIHBpeGVscyBwZXIgc2Vjb25kXG4gICAgdGhpcy5zcGVlZCA9IGludGVyYWN0aW9uLnBvaW50ZXJEZWx0YVtkZWx0YVNvdXJjZV0uc3BlZWQ7XG4gICAgdGhpcy52ZWxvY2l0eVggPSBpbnRlcmFjdGlvbi5wb2ludGVyRGVsdGFbZGVsdGFTb3VyY2VdLnZ4O1xuICAgIHRoaXMudmVsb2NpdHlZID0gaW50ZXJhY3Rpb24ucG9pbnRlckRlbHRhW2RlbHRhU291cmNlXS52eTtcblxuICAgIHRoaXMuc3dpcGUgPSBlbmRpbmcgfHwgcGhhc2UgPT09ICdpbmVydGlhc3RhcnQnID8gdGhpcy5nZXRTd2lwZSgpIDogbnVsbDtcblxuICAgIHNpZ25hbHMuZmlyZSgnbmV3Jywgc2lnbmFsQXJnKTtcbiAgfVxuXG4gIEludGVyYWN0RXZlbnQucHJvdG90eXBlLmdldFN3aXBlID0gZnVuY3Rpb24gZ2V0U3dpcGUoKSB7XG4gICAgdmFyIGludGVyYWN0aW9uID0gdGhpcy5pbnRlcmFjdGlvbjtcblxuICAgIGlmIChpbnRlcmFjdGlvbi5wcmV2RXZlbnQuc3BlZWQgPCA2MDAgfHwgdGhpcy50aW1lU3RhbXAgLSBpbnRlcmFjdGlvbi5wcmV2RXZlbnQudGltZVN0YW1wID4gMTUwKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICB2YXIgYW5nbGUgPSAxODAgKiBNYXRoLmF0YW4yKGludGVyYWN0aW9uLnByZXZFdmVudC52ZWxvY2l0eVksIGludGVyYWN0aW9uLnByZXZFdmVudC52ZWxvY2l0eVgpIC8gTWF0aC5QSTtcbiAgICB2YXIgb3ZlcmxhcCA9IDIyLjU7XG5cbiAgICBpZiAoYW5nbGUgPCAwKSB7XG4gICAgICBhbmdsZSArPSAzNjA7XG4gICAgfVxuXG4gICAgdmFyIGxlZnQgPSAxMzUgLSBvdmVybGFwIDw9IGFuZ2xlICYmIGFuZ2xlIDwgMjI1ICsgb3ZlcmxhcDtcbiAgICB2YXIgdXAgPSAyMjUgLSBvdmVybGFwIDw9IGFuZ2xlICYmIGFuZ2xlIDwgMzE1ICsgb3ZlcmxhcDtcblxuICAgIHZhciByaWdodCA9ICFsZWZ0ICYmICgzMTUgLSBvdmVybGFwIDw9IGFuZ2xlIHx8IGFuZ2xlIDwgNDUgKyBvdmVybGFwKTtcbiAgICB2YXIgZG93biA9ICF1cCAmJiA0NSAtIG92ZXJsYXAgPD0gYW5nbGUgJiYgYW5nbGUgPCAxMzUgKyBvdmVybGFwO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHVwOiB1cCxcbiAgICAgIGRvd246IGRvd24sXG4gICAgICBsZWZ0OiBsZWZ0LFxuICAgICAgcmlnaHQ6IHJpZ2h0LFxuICAgICAgYW5nbGU6IGFuZ2xlLFxuICAgICAgc3BlZWQ6IGludGVyYWN0aW9uLnByZXZFdmVudC5zcGVlZCxcbiAgICAgIHZlbG9jaXR5OiB7XG4gICAgICAgIHg6IGludGVyYWN0aW9uLnByZXZFdmVudC52ZWxvY2l0eVgsXG4gICAgICAgIHk6IGludGVyYWN0aW9uLnByZXZFdmVudC52ZWxvY2l0eVlcbiAgICAgIH1cbiAgICB9O1xuICB9O1xuXG4gIEludGVyYWN0RXZlbnQucHJvdG90eXBlLnByZXZlbnREZWZhdWx0ID0gZnVuY3Rpb24gcHJldmVudERlZmF1bHQoKSB7fTtcblxuICAvKiogKi9cblxuXG4gIEludGVyYWN0RXZlbnQucHJvdG90eXBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbiA9IGZ1bmN0aW9uIHN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpIHtcbiAgICB0aGlzLmltbWVkaWF0ZVByb3BhZ2F0aW9uU3RvcHBlZCA9IHRoaXMucHJvcGFnYXRpb25TdG9wcGVkID0gdHJ1ZTtcbiAgfTtcblxuICAvKiogKi9cblxuXG4gIEludGVyYWN0RXZlbnQucHJvdG90eXBlLnN0b3BQcm9wYWdhdGlvbiA9IGZ1bmN0aW9uIHN0b3BQcm9wYWdhdGlvbigpIHtcbiAgICB0aGlzLnByb3BhZ2F0aW9uU3RvcHBlZCA9IHRydWU7XG4gIH07XG5cbiAgcmV0dXJuIEludGVyYWN0RXZlbnQ7XG59KCk7XG5cbnNpZ25hbHMub24oJ3NldC1kZWx0YScsIGZ1bmN0aW9uIChfcmVmKSB7XG4gIHZhciBpRXZlbnQgPSBfcmVmLmlFdmVudCxcbiAgICAgIGludGVyYWN0aW9uID0gX3JlZi5pbnRlcmFjdGlvbixcbiAgICAgIHN0YXJ0aW5nID0gX3JlZi5zdGFydGluZyxcbiAgICAgIGRlbHRhU291cmNlID0gX3JlZi5kZWx0YVNvdXJjZTtcblxuICB2YXIgcHJldkV2ZW50ID0gc3RhcnRpbmcgPyBpRXZlbnQgOiBpbnRlcmFjdGlvbi5wcmV2RXZlbnQ7XG5cbiAgaWYgKGRlbHRhU291cmNlID09PSAnY2xpZW50Jykge1xuICAgIGlFdmVudC5keCA9IGlFdmVudC5jbGllbnRYIC0gcHJldkV2ZW50LmNsaWVudFg7XG4gICAgaUV2ZW50LmR5ID0gaUV2ZW50LmNsaWVudFkgLSBwcmV2RXZlbnQuY2xpZW50WTtcbiAgfSBlbHNlIHtcbiAgICBpRXZlbnQuZHggPSBpRXZlbnQucGFnZVggLSBwcmV2RXZlbnQucGFnZVg7XG4gICAgaUV2ZW50LmR5ID0gaUV2ZW50LnBhZ2VZIC0gcHJldkV2ZW50LnBhZ2VZO1xuICB9XG59KTtcblxuSW50ZXJhY3RFdmVudC5zaWduYWxzID0gc2lnbmFscztcblxubW9kdWxlLmV4cG9ydHMgPSBJbnRlcmFjdEV2ZW50O1xuXG59LHtcIi4vZGVmYXVsdE9wdGlvbnNcIjoxOCxcIi4vdXRpbHMvU2lnbmFsc1wiOjM0LFwiLi91dGlscy9leHRlbmRcIjo0MSxcIi4vdXRpbHMvZ2V0T3JpZ2luWFlcIjo0Mn1dLDQ6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG52YXIgY2xvbmUgPSByZXF1aXJlKCcuL3V0aWxzL2Nsb25lJyk7XG52YXIgaXMgPSByZXF1aXJlKCcuL3V0aWxzL2lzJyk7XG52YXIgZXZlbnRzID0gcmVxdWlyZSgnLi91dGlscy9ldmVudHMnKTtcbnZhciBleHRlbmQgPSByZXF1aXJlKCcuL3V0aWxzL2V4dGVuZCcpO1xudmFyIGFjdGlvbnMgPSByZXF1aXJlKCcuL2FjdGlvbnMvYmFzZScpO1xudmFyIHNjb3BlID0gcmVxdWlyZSgnLi9zY29wZScpO1xudmFyIEV2ZW50YWJsZSA9IHJlcXVpcmUoJy4vRXZlbnRhYmxlJyk7XG52YXIgZGVmYXVsdHMgPSByZXF1aXJlKCcuL2RlZmF1bHRPcHRpb25zJyk7XG52YXIgc2lnbmFscyA9IHJlcXVpcmUoJy4vdXRpbHMvU2lnbmFscycpLm5ldygpO1xuXG52YXIgX3JlcXVpcmUgPSByZXF1aXJlKCcuL3V0aWxzL2RvbVV0aWxzJyksXG4gICAgZ2V0RWxlbWVudFJlY3QgPSBfcmVxdWlyZS5nZXRFbGVtZW50UmVjdCxcbiAgICBub2RlQ29udGFpbnMgPSBfcmVxdWlyZS5ub2RlQ29udGFpbnMsXG4gICAgdHJ5U2VsZWN0b3IgPSBfcmVxdWlyZS50cnlTZWxlY3RvcixcbiAgICBtYXRjaGVzU2VsZWN0b3IgPSBfcmVxdWlyZS5tYXRjaGVzU2VsZWN0b3I7XG5cbnZhciBfcmVxdWlyZTIgPSByZXF1aXJlKCcuL3V0aWxzL3dpbmRvdycpLFxuICAgIGdldFdpbmRvdyA9IF9yZXF1aXJlMi5nZXRXaW5kb3c7XG5cbnZhciBfcmVxdWlyZTMgPSByZXF1aXJlKCcuL3V0aWxzL2FycicpLFxuICAgIGNvbnRhaW5zID0gX3JlcXVpcmUzLmNvbnRhaW5zO1xuXG52YXIgX3JlcXVpcmU0ID0gcmVxdWlyZSgnLi91dGlscy9icm93c2VyJyksXG4gICAgd2hlZWxFdmVudCA9IF9yZXF1aXJlNC53aGVlbEV2ZW50O1xuXG4vLyBhbGwgc2V0IGludGVyYWN0YWJsZXNcblxuXG5zY29wZS5pbnRlcmFjdGFibGVzID0gW107XG5cbnZhciBJbnRlcmFjdGFibGUgPSBmdW5jdGlvbiAoKSB7XG4gIC8qKiAqL1xuICBmdW5jdGlvbiBJbnRlcmFjdGFibGUodGFyZ2V0LCBvcHRpb25zKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEludGVyYWN0YWJsZSk7XG5cbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICAgIHRoaXMudGFyZ2V0ID0gdGFyZ2V0O1xuICAgIHRoaXMuZXZlbnRzID0gbmV3IEV2ZW50YWJsZSgpO1xuICAgIHRoaXMuX2NvbnRleHQgPSBvcHRpb25zLmNvbnRleHQgfHwgc2NvcGUuZG9jdW1lbnQ7XG4gICAgdGhpcy5fd2luID0gZ2V0V2luZG93KHRyeVNlbGVjdG9yKHRhcmdldCkgPyB0aGlzLl9jb250ZXh0IDogdGFyZ2V0KTtcbiAgICB0aGlzLl9kb2MgPSB0aGlzLl93aW4uZG9jdW1lbnQ7XG5cbiAgICBzaWduYWxzLmZpcmUoJ25ldycsIHtcbiAgICAgIHRhcmdldDogdGFyZ2V0LFxuICAgICAgb3B0aW9uczogb3B0aW9ucyxcbiAgICAgIGludGVyYWN0YWJsZTogdGhpcyxcbiAgICAgIHdpbjogdGhpcy5fd2luXG4gICAgfSk7XG5cbiAgICBzY29wZS5hZGREb2N1bWVudCh0aGlzLl9kb2MsIHRoaXMuX3dpbik7XG5cbiAgICBzY29wZS5pbnRlcmFjdGFibGVzLnB1c2godGhpcyk7XG5cbiAgICB0aGlzLnNldChvcHRpb25zKTtcbiAgfVxuXG4gIEludGVyYWN0YWJsZS5wcm90b3R5cGUuc2V0T25FdmVudHMgPSBmdW5jdGlvbiBzZXRPbkV2ZW50cyhhY3Rpb24sIHBoYXNlcykge1xuICAgIHZhciBvbkFjdGlvbiA9ICdvbicgKyBhY3Rpb247XG5cbiAgICBpZiAoaXMuZnVuY3Rpb24ocGhhc2VzLm9uc3RhcnQpKSB7XG4gICAgICB0aGlzLmV2ZW50c1tvbkFjdGlvbiArICdzdGFydCddID0gcGhhc2VzLm9uc3RhcnQ7XG4gICAgfVxuICAgIGlmIChpcy5mdW5jdGlvbihwaGFzZXMub25tb3ZlKSkge1xuICAgICAgdGhpcy5ldmVudHNbb25BY3Rpb24gKyAnbW92ZSddID0gcGhhc2VzLm9ubW92ZTtcbiAgICB9XG4gICAgaWYgKGlzLmZ1bmN0aW9uKHBoYXNlcy5vbmVuZCkpIHtcbiAgICAgIHRoaXMuZXZlbnRzW29uQWN0aW9uICsgJ2VuZCddID0gcGhhc2VzLm9uZW5kO1xuICAgIH1cbiAgICBpZiAoaXMuZnVuY3Rpb24ocGhhc2VzLm9uaW5lcnRpYXN0YXJ0KSkge1xuICAgICAgdGhpcy5ldmVudHNbb25BY3Rpb24gKyAnaW5lcnRpYXN0YXJ0J10gPSBwaGFzZXMub25pbmVydGlhc3RhcnQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgSW50ZXJhY3RhYmxlLnByb3RvdHlwZS5zZXRQZXJBY3Rpb24gPSBmdW5jdGlvbiBzZXRQZXJBY3Rpb24oYWN0aW9uLCBvcHRpb25zKSB7XG4gICAgLy8gZm9yIGFsbCB0aGUgZGVmYXVsdCBwZXItYWN0aW9uIG9wdGlvbnNcbiAgICBmb3IgKHZhciBvcHRpb24gaW4gb3B0aW9ucykge1xuICAgICAgLy8gaWYgdGhpcyBvcHRpb24gZXhpc3RzIGZvciB0aGlzIGFjdGlvblxuICAgICAgaWYgKG9wdGlvbiBpbiBkZWZhdWx0c1thY3Rpb25dKSB7XG4gICAgICAgIC8vIGlmIHRoZSBvcHRpb24gaW4gdGhlIG9wdGlvbnMgYXJnIGlzIGFuIG9iamVjdCB2YWx1ZVxuICAgICAgICBpZiAoaXMub2JqZWN0KG9wdGlvbnNbb3B0aW9uXSkpIHtcbiAgICAgICAgICAvLyBkdXBsaWNhdGUgdGhlIG9iamVjdCBhbmQgbWVyZ2VcbiAgICAgICAgICB0aGlzLm9wdGlvbnNbYWN0aW9uXVtvcHRpb25dID0gY2xvbmUodGhpcy5vcHRpb25zW2FjdGlvbl1bb3B0aW9uXSB8fCB7fSk7XG4gICAgICAgICAgZXh0ZW5kKHRoaXMub3B0aW9uc1thY3Rpb25dW29wdGlvbl0sIG9wdGlvbnNbb3B0aW9uXSk7XG5cbiAgICAgICAgICBpZiAoaXMub2JqZWN0KGRlZmF1bHRzLnBlckFjdGlvbltvcHRpb25dKSAmJiAnZW5hYmxlZCcgaW4gZGVmYXVsdHMucGVyQWN0aW9uW29wdGlvbl0pIHtcbiAgICAgICAgICAgIHRoaXMub3B0aW9uc1thY3Rpb25dW29wdGlvbl0uZW5hYmxlZCA9IG9wdGlvbnNbb3B0aW9uXS5lbmFibGVkID09PSBmYWxzZSA/IGZhbHNlIDogdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoaXMuYm9vbChvcHRpb25zW29wdGlvbl0pICYmIGlzLm9iamVjdChkZWZhdWx0cy5wZXJBY3Rpb25bb3B0aW9uXSkpIHtcbiAgICAgICAgICB0aGlzLm9wdGlvbnNbYWN0aW9uXVtvcHRpb25dLmVuYWJsZWQgPSBvcHRpb25zW29wdGlvbl07XG4gICAgICAgIH0gZWxzZSBpZiAob3B0aW9uc1tvcHRpb25dICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAvLyBvciBpZiBpdCdzIG5vdCB1bmRlZmluZWQsIGRvIGEgcGxhaW4gYXNzaWdubWVudFxuICAgICAgICAgIHRoaXMub3B0aW9uc1thY3Rpb25dW29wdGlvbl0gPSBvcHRpb25zW29wdGlvbl07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIFRoZSBkZWZhdWx0IGZ1bmN0aW9uIHRvIGdldCBhbiBJbnRlcmFjdGFibGVzIGJvdW5kaW5nIHJlY3QuIENhbiBiZVxuICAgKiBvdmVycmlkZGVuIHVzaW5nIHtAbGluayBJbnRlcmFjdGFibGUucmVjdENoZWNrZXJ9LlxuICAgKlxuICAgKiBAcGFyYW0ge0VsZW1lbnR9IFtlbGVtZW50XSBUaGUgZWxlbWVudCB0byBtZWFzdXJlLlxuICAgKiBAcmV0dXJuIHtvYmplY3R9IFRoZSBvYmplY3QncyBib3VuZGluZyByZWN0YW5nbGUuXG4gICAqL1xuXG5cbiAgSW50ZXJhY3RhYmxlLnByb3RvdHlwZS5nZXRSZWN0ID0gZnVuY3Rpb24gZ2V0UmVjdChlbGVtZW50KSB7XG4gICAgZWxlbWVudCA9IGVsZW1lbnQgfHwgdGhpcy50YXJnZXQ7XG5cbiAgICBpZiAoaXMuc3RyaW5nKHRoaXMudGFyZ2V0KSAmJiAhaXMuZWxlbWVudChlbGVtZW50KSkge1xuICAgICAgZWxlbWVudCA9IHRoaXMuX2NvbnRleHQucXVlcnlTZWxlY3Rvcih0aGlzLnRhcmdldCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGdldEVsZW1lbnRSZWN0KGVsZW1lbnQpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBSZXR1cm5zIG9yIHNldHMgdGhlIGZ1bmN0aW9uIHVzZWQgdG8gY2FsY3VsYXRlIHRoZSBpbnRlcmFjdGFibGUnc1xuICAgKiBlbGVtZW50J3MgcmVjdGFuZ2xlXG4gICAqXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IFtjaGVja2VyXSBBIGZ1bmN0aW9uIHdoaWNoIHJldHVybnMgdGhpcyBJbnRlcmFjdGFibGUnc1xuICAgKiBib3VuZGluZyByZWN0YW5nbGUuIFNlZSB7QGxpbmsgSW50ZXJhY3RhYmxlLmdldFJlY3R9XG4gICAqIEByZXR1cm4ge2Z1bmN0aW9uIHwgb2JqZWN0fSBUaGUgY2hlY2tlciBmdW5jdGlvbiBvciB0aGlzIEludGVyYWN0YWJsZVxuICAgKi9cblxuXG4gIEludGVyYWN0YWJsZS5wcm90b3R5cGUucmVjdENoZWNrZXIgPSBmdW5jdGlvbiByZWN0Q2hlY2tlcihjaGVja2VyKSB7XG4gICAgaWYgKGlzLmZ1bmN0aW9uKGNoZWNrZXIpKSB7XG4gICAgICB0aGlzLmdldFJlY3QgPSBjaGVja2VyO1xuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBpZiAoY2hlY2tlciA9PT0gbnVsbCkge1xuICAgICAgZGVsZXRlIHRoaXMub3B0aW9ucy5nZXRSZWN0O1xuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5nZXRSZWN0O1xuICB9O1xuXG4gIEludGVyYWN0YWJsZS5wcm90b3R5cGUuX2JhY2tDb21wYXRPcHRpb24gPSBmdW5jdGlvbiBfYmFja0NvbXBhdE9wdGlvbihvcHRpb25OYW1lLCBuZXdWYWx1ZSkge1xuICAgIGlmICh0cnlTZWxlY3RvcihuZXdWYWx1ZSkgfHwgaXMub2JqZWN0KG5ld1ZhbHVlKSkge1xuICAgICAgdGhpcy5vcHRpb25zW29wdGlvbk5hbWVdID0gbmV3VmFsdWU7XG5cbiAgICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhY3Rpb25zLm5hbWVzLmxlbmd0aDsgX2krKykge1xuICAgICAgICB2YXIgX3JlZjtcblxuICAgICAgICBfcmVmID0gYWN0aW9ucy5uYW1lc1tfaV07XG4gICAgICAgIHZhciBhY3Rpb24gPSBfcmVmO1xuXG4gICAgICAgIHRoaXMub3B0aW9uc1thY3Rpb25dW29wdGlvbk5hbWVdID0gbmV3VmFsdWU7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLm9wdGlvbnNbb3B0aW9uTmFtZV07XG4gIH07XG5cbiAgLyoqXG4gICAqIEdldHMgb3Igc2V0cyB0aGUgb3JpZ2luIG9mIHRoZSBJbnRlcmFjdGFibGUncyBlbGVtZW50LiAgVGhlIHggYW5kIHlcbiAgICogb2YgdGhlIG9yaWdpbiB3aWxsIGJlIHN1YnRyYWN0ZWQgZnJvbSBhY3Rpb24gZXZlbnQgY29vcmRpbmF0ZXMuXG4gICAqXG4gICAqIEBwYXJhbSB7RWxlbWVudCB8IG9iamVjdCB8IHN0cmluZ30gW29yaWdpbl0gQW4gSFRNTCBvciBTVkcgRWxlbWVudCB3aG9zZVxuICAgKiByZWN0IHdpbGwgYmUgdXNlZCwgYW4gb2JqZWN0IGVnLiB7IHg6IDAsIHk6IDAgfSBvciBzdHJpbmcgJ3BhcmVudCcsICdzZWxmJ1xuICAgKiBvciBhbnkgQ1NTIHNlbGVjdG9yXG4gICAqXG4gICAqIEByZXR1cm4ge29iamVjdH0gVGhlIGN1cnJlbnQgb3JpZ2luIG9yIHRoaXMgSW50ZXJhY3RhYmxlXG4gICAqL1xuXG5cbiAgSW50ZXJhY3RhYmxlLnByb3RvdHlwZS5vcmlnaW4gPSBmdW5jdGlvbiBvcmlnaW4obmV3VmFsdWUpIHtcbiAgICByZXR1cm4gdGhpcy5fYmFja0NvbXBhdE9wdGlvbignb3JpZ2luJywgbmV3VmFsdWUpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBSZXR1cm5zIG9yIHNldHMgdGhlIG1vdXNlIGNvb3JkaW5hdGUgdHlwZXMgdXNlZCB0byBjYWxjdWxhdGUgdGhlXG4gICAqIG1vdmVtZW50IG9mIHRoZSBwb2ludGVyLlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gW25ld1ZhbHVlXSBVc2UgJ2NsaWVudCcgaWYgeW91IHdpbGwgYmUgc2Nyb2xsaW5nIHdoaWxlXG4gICAqIGludGVyYWN0aW5nOyBVc2UgJ3BhZ2UnIGlmIHlvdSB3YW50IGF1dG9TY3JvbGwgdG8gd29ya1xuICAgKiBAcmV0dXJuIHtzdHJpbmcgfCBvYmplY3R9IFRoZSBjdXJyZW50IGRlbHRhU291cmNlIG9yIHRoaXMgSW50ZXJhY3RhYmxlXG4gICAqL1xuXG5cbiAgSW50ZXJhY3RhYmxlLnByb3RvdHlwZS5kZWx0YVNvdXJjZSA9IGZ1bmN0aW9uIGRlbHRhU291cmNlKG5ld1ZhbHVlKSB7XG4gICAgaWYgKG5ld1ZhbHVlID09PSAncGFnZScgfHwgbmV3VmFsdWUgPT09ICdjbGllbnQnKSB7XG4gICAgICB0aGlzLm9wdGlvbnMuZGVsdGFTb3VyY2UgPSBuZXdWYWx1ZTtcblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy5kZWx0YVNvdXJjZTtcbiAgfTtcblxuICAvKipcbiAgICogR2V0cyB0aGUgc2VsZWN0b3IgY29udGV4dCBOb2RlIG9mIHRoZSBJbnRlcmFjdGFibGUuIFRoZSBkZWZhdWx0IGlzXG4gICAqIGB3aW5kb3cuZG9jdW1lbnRgLlxuICAgKlxuICAgKiBAcmV0dXJuIHtOb2RlfSBUaGUgY29udGV4dCBOb2RlIG9mIHRoaXMgSW50ZXJhY3RhYmxlXG4gICAqL1xuXG5cbiAgSW50ZXJhY3RhYmxlLnByb3RvdHlwZS5jb250ZXh0ID0gZnVuY3Rpb24gY29udGV4dCgpIHtcbiAgICByZXR1cm4gdGhpcy5fY29udGV4dDtcbiAgfTtcblxuICBJbnRlcmFjdGFibGUucHJvdG90eXBlLmluQ29udGV4dCA9IGZ1bmN0aW9uIGluQ29udGV4dChlbGVtZW50KSB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbnRleHQgPT09IGVsZW1lbnQub3duZXJEb2N1bWVudCB8fCBub2RlQ29udGFpbnModGhpcy5fY29udGV4dCwgZWxlbWVudCk7XG4gIH07XG5cbiAgLyoqXG4gICAqIENhbGxzIGxpc3RlbmVycyBmb3IgdGhlIGdpdmVuIEludGVyYWN0RXZlbnQgdHlwZSBib3VuZCBnbG9iYWxseVxuICAgKiBhbmQgZGlyZWN0bHkgdG8gdGhpcyBJbnRlcmFjdGFibGVcbiAgICpcbiAgICogQHBhcmFtIHtJbnRlcmFjdEV2ZW50fSBpRXZlbnQgVGhlIEludGVyYWN0RXZlbnQgb2JqZWN0IHRvIGJlIGZpcmVkIG9uIHRoaXNcbiAgICogSW50ZXJhY3RhYmxlXG4gICAqIEByZXR1cm4ge0ludGVyYWN0YWJsZX0gdGhpcyBJbnRlcmFjdGFibGVcbiAgICovXG5cblxuICBJbnRlcmFjdGFibGUucHJvdG90eXBlLmZpcmUgPSBmdW5jdGlvbiBmaXJlKGlFdmVudCkge1xuICAgIHRoaXMuZXZlbnRzLmZpcmUoaUV2ZW50KTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIEludGVyYWN0YWJsZS5wcm90b3R5cGUuX29uT2ZmTXVsdGlwbGUgPSBmdW5jdGlvbiBfb25PZmZNdWx0aXBsZShtZXRob2QsIGV2ZW50VHlwZSwgbGlzdGVuZXIsIG9wdGlvbnMpIHtcbiAgICBpZiAoaXMuc3RyaW5nKGV2ZW50VHlwZSkgJiYgZXZlbnRUeXBlLnNlYXJjaCgnICcpICE9PSAtMSkge1xuICAgICAgZXZlbnRUeXBlID0gZXZlbnRUeXBlLnRyaW0oKS5zcGxpdCgvICsvKTtcbiAgICB9XG5cbiAgICBpZiAoaXMuYXJyYXkoZXZlbnRUeXBlKSkge1xuICAgICAgZm9yICh2YXIgX2kyID0gMDsgX2kyIDwgZXZlbnRUeXBlLmxlbmd0aDsgX2kyKyspIHtcbiAgICAgICAgdmFyIF9yZWYyO1xuXG4gICAgICAgIF9yZWYyID0gZXZlbnRUeXBlW19pMl07XG4gICAgICAgIHZhciB0eXBlID0gX3JlZjI7XG5cbiAgICAgICAgdGhpc1ttZXRob2RdKHR5cGUsIGxpc3RlbmVyLCBvcHRpb25zKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgaWYgKGlzLm9iamVjdChldmVudFR5cGUpKSB7XG4gICAgICBmb3IgKHZhciBwcm9wIGluIGV2ZW50VHlwZSkge1xuICAgICAgICB0aGlzW21ldGhvZF0ocHJvcCwgZXZlbnRUeXBlW3Byb3BdLCBsaXN0ZW5lcik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogQmluZHMgYSBsaXN0ZW5lciBmb3IgYW4gSW50ZXJhY3RFdmVudCwgcG9pbnRlckV2ZW50IG9yIERPTSBldmVudC5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmcgfCBhcnJheSB8IG9iamVjdH0gZXZlbnRUeXBlICBUaGUgdHlwZXMgb2YgZXZlbnRzIHRvIGxpc3RlblxuICAgKiBmb3JcbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gbGlzdGVuZXIgICBUaGUgZnVuY3Rpb24gZXZlbnQgKHMpXG4gICAqIEBwYXJhbSB7b2JqZWN0IHwgYm9vbGVhbn0gW29wdGlvbnNdICAgIG9wdGlvbnMgb2JqZWN0IG9yIHVzZUNhcHR1cmUgZmxhZ1xuICAgKiBmb3IgYWRkRXZlbnRMaXN0ZW5lclxuICAgKiBAcmV0dXJuIHtvYmplY3R9IFRoaXMgSW50ZXJhY3RhYmxlXG4gICAqL1xuXG5cbiAgSW50ZXJhY3RhYmxlLnByb3RvdHlwZS5vbiA9IGZ1bmN0aW9uIG9uKGV2ZW50VHlwZSwgbGlzdGVuZXIsIG9wdGlvbnMpIHtcbiAgICBpZiAodGhpcy5fb25PZmZNdWx0aXBsZSgnb24nLCBldmVudFR5cGUsIGxpc3RlbmVyLCBvcHRpb25zKSkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgaWYgKGV2ZW50VHlwZSA9PT0gJ3doZWVsJykge1xuICAgICAgZXZlbnRUeXBlID0gd2hlZWxFdmVudDtcbiAgICB9XG5cbiAgICBpZiAoY29udGFpbnMoSW50ZXJhY3RhYmxlLmV2ZW50VHlwZXMsIGV2ZW50VHlwZSkpIHtcbiAgICAgIHRoaXMuZXZlbnRzLm9uKGV2ZW50VHlwZSwgbGlzdGVuZXIpO1xuICAgIH1cbiAgICAvLyBkZWxlZ2F0ZWQgZXZlbnQgZm9yIHNlbGVjdG9yXG4gICAgZWxzZSBpZiAoaXMuc3RyaW5nKHRoaXMudGFyZ2V0KSkge1xuICAgICAgICBldmVudHMuYWRkRGVsZWdhdGUodGhpcy50YXJnZXQsIHRoaXMuX2NvbnRleHQsIGV2ZW50VHlwZSwgbGlzdGVuZXIsIG9wdGlvbnMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZXZlbnRzLmFkZCh0aGlzLnRhcmdldCwgZXZlbnRUeXBlLCBsaXN0ZW5lciwgb3B0aW9ucyk7XG4gICAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICAvKipcbiAgICogUmVtb3ZlcyBhbiBJbnRlcmFjdEV2ZW50LCBwb2ludGVyRXZlbnQgb3IgRE9NIGV2ZW50IGxpc3RlbmVyXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nIHwgYXJyYXkgfCBvYmplY3R9IGV2ZW50VHlwZSBUaGUgdHlwZXMgb2YgZXZlbnRzIHRoYXQgd2VyZVxuICAgKiBsaXN0ZW5lZCBmb3JcbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gbGlzdGVuZXIgVGhlIGxpc3RlbmVyIGZ1bmN0aW9uIHRvIGJlIHJlbW92ZWRcbiAgICogQHBhcmFtIHtvYmplY3QgfCBib29sZWFufSBbb3B0aW9uc10gb3B0aW9ucyBvYmplY3Qgb3IgdXNlQ2FwdHVyZSBmbGFnIGZvclxuICAgKiByZW1vdmVFdmVudExpc3RlbmVyXG4gICAqIEByZXR1cm4ge29iamVjdH0gVGhpcyBJbnRlcmFjdGFibGVcbiAgICovXG5cblxuICBJbnRlcmFjdGFibGUucHJvdG90eXBlLm9mZiA9IGZ1bmN0aW9uIG9mZihldmVudFR5cGUsIGxpc3RlbmVyLCBvcHRpb25zKSB7XG4gICAgaWYgKHRoaXMuX29uT2ZmTXVsdGlwbGUoJ29mZicsIGV2ZW50VHlwZSwgbGlzdGVuZXIsIG9wdGlvbnMpKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBpZiAoZXZlbnRUeXBlID09PSAnd2hlZWwnKSB7XG4gICAgICBldmVudFR5cGUgPSB3aGVlbEV2ZW50O1xuICAgIH1cblxuICAgIC8vIGlmIGl0IGlzIGFuIGFjdGlvbiBldmVudCB0eXBlXG4gICAgaWYgKGNvbnRhaW5zKEludGVyYWN0YWJsZS5ldmVudFR5cGVzLCBldmVudFR5cGUpKSB7XG4gICAgICB0aGlzLmV2ZW50cy5vZmYoZXZlbnRUeXBlLCBsaXN0ZW5lcik7XG4gICAgfVxuICAgIC8vIGRlbGVnYXRlZCBldmVudFxuICAgIGVsc2UgaWYgKGlzLnN0cmluZyh0aGlzLnRhcmdldCkpIHtcbiAgICAgICAgZXZlbnRzLnJlbW92ZURlbGVnYXRlKHRoaXMudGFyZ2V0LCB0aGlzLl9jb250ZXh0LCBldmVudFR5cGUsIGxpc3RlbmVyLCBvcHRpb25zKTtcbiAgICAgIH1cbiAgICAgIC8vIHJlbW92ZSBsaXN0ZW5lciBmcm9tIHRoaXMgSW50ZXJhdGFibGUncyBlbGVtZW50XG4gICAgICBlbHNlIHtcbiAgICAgICAgICBldmVudHMucmVtb3ZlKHRoaXMudGFyZ2V0LCBldmVudFR5cGUsIGxpc3RlbmVyLCBvcHRpb25zKTtcbiAgICAgICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgLyoqXG4gICAqIFJlc2V0IHRoZSBvcHRpb25zIG9mIHRoaXMgSW50ZXJhY3RhYmxlXG4gICAqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIFRoZSBuZXcgc2V0dGluZ3MgdG8gYXBwbHlcbiAgICogQHJldHVybiB7b2JqZWN0fSBUaGlzIEludGVyYWN0YWJsZVxuICAgKi9cblxuXG4gIEludGVyYWN0YWJsZS5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24gc2V0KG9wdGlvbnMpIHtcbiAgICBpZiAoIWlzLm9iamVjdChvcHRpb25zKSkge1xuICAgICAgb3B0aW9ucyA9IHt9O1xuICAgIH1cblxuICAgIHRoaXMub3B0aW9ucyA9IGNsb25lKGRlZmF1bHRzLmJhc2UpO1xuXG4gICAgdmFyIHBlckFjdGlvbnMgPSBjbG9uZShkZWZhdWx0cy5wZXJBY3Rpb24pO1xuXG4gICAgZm9yICh2YXIgYWN0aW9uTmFtZSBpbiBhY3Rpb25zLm1ldGhvZERpY3QpIHtcbiAgICAgIHZhciBtZXRob2ROYW1lID0gYWN0aW9ucy5tZXRob2REaWN0W2FjdGlvbk5hbWVdO1xuXG4gICAgICB0aGlzLm9wdGlvbnNbYWN0aW9uTmFtZV0gPSBjbG9uZShkZWZhdWx0c1thY3Rpb25OYW1lXSk7XG5cbiAgICAgIHRoaXMuc2V0UGVyQWN0aW9uKGFjdGlvbk5hbWUsIHBlckFjdGlvbnMpO1xuXG4gICAgICB0aGlzW21ldGhvZE5hbWVdKG9wdGlvbnNbYWN0aW9uTmFtZV0pO1xuICAgIH1cblxuICAgIGZvciAodmFyIF9pMyA9IDA7IF9pMyA8IEludGVyYWN0YWJsZS5zZXR0aW5nc01ldGhvZHMubGVuZ3RoOyBfaTMrKykge1xuICAgICAgdmFyIF9yZWYzO1xuXG4gICAgICBfcmVmMyA9IEludGVyYWN0YWJsZS5zZXR0aW5nc01ldGhvZHNbX2kzXTtcbiAgICAgIHZhciBzZXR0aW5nID0gX3JlZjM7XG5cbiAgICAgIHRoaXMub3B0aW9uc1tzZXR0aW5nXSA9IGRlZmF1bHRzLmJhc2Vbc2V0dGluZ107XG5cbiAgICAgIGlmIChzZXR0aW5nIGluIG9wdGlvbnMpIHtcbiAgICAgICAgdGhpc1tzZXR0aW5nXShvcHRpb25zW3NldHRpbmddKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBzaWduYWxzLmZpcmUoJ3NldCcsIHtcbiAgICAgIG9wdGlvbnM6IG9wdGlvbnMsXG4gICAgICBpbnRlcmFjdGFibGU6IHRoaXNcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIC8qKlxuICAgKiBSZW1vdmUgdGhpcyBpbnRlcmFjdGFibGUgZnJvbSB0aGUgbGlzdCBvZiBpbnRlcmFjdGFibGVzIGFuZCByZW1vdmUgaXQnc1xuICAgKiBhY3Rpb24gY2FwYWJpbGl0aWVzIGFuZCBldmVudCBsaXN0ZW5lcnNcbiAgICpcbiAgICogQHJldHVybiB7aW50ZXJhY3R9XG4gICAqL1xuXG5cbiAgSW50ZXJhY3RhYmxlLnByb3RvdHlwZS51bnNldCA9IGZ1bmN0aW9uIHVuc2V0KCkge1xuICAgIGV2ZW50cy5yZW1vdmUodGhpcy50YXJnZXQsICdhbGwnKTtcblxuICAgIGlmIChpcy5zdHJpbmcodGhpcy50YXJnZXQpKSB7XG4gICAgICAvLyByZW1vdmUgZGVsZWdhdGVkIGV2ZW50c1xuICAgICAgZm9yICh2YXIgdHlwZSBpbiBldmVudHMuZGVsZWdhdGVkRXZlbnRzKSB7XG4gICAgICAgIHZhciBkZWxlZ2F0ZWQgPSBldmVudHMuZGVsZWdhdGVkRXZlbnRzW3R5cGVdO1xuXG4gICAgICAgIGlmIChkZWxlZ2F0ZWQuc2VsZWN0b3JzWzBdID09PSB0aGlzLnRhcmdldCAmJiBkZWxlZ2F0ZWQuY29udGV4dHNbMF0gPT09IHRoaXMuX2NvbnRleHQpIHtcblxuICAgICAgICAgIGRlbGVnYXRlZC5zZWxlY3RvcnMuc3BsaWNlKDAsIDEpO1xuICAgICAgICAgIGRlbGVnYXRlZC5jb250ZXh0cy5zcGxpY2UoMCwgMSk7XG4gICAgICAgICAgZGVsZWdhdGVkLmxpc3RlbmVycy5zcGxpY2UoMCwgMSk7XG5cbiAgICAgICAgICAvLyByZW1vdmUgdGhlIGFycmF5cyBpZiB0aGV5IGFyZSBlbXB0eVxuICAgICAgICAgIGlmICghZGVsZWdhdGVkLnNlbGVjdG9ycy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGRlbGVnYXRlZFt0eXBlXSA9IG51bGw7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZXZlbnRzLnJlbW92ZSh0aGlzLl9jb250ZXh0LCB0eXBlLCBldmVudHMuZGVsZWdhdGVMaXN0ZW5lcik7XG4gICAgICAgIGV2ZW50cy5yZW1vdmUodGhpcy5fY29udGV4dCwgdHlwZSwgZXZlbnRzLmRlbGVnYXRlVXNlQ2FwdHVyZSwgdHJ1ZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGV2ZW50cy5yZW1vdmUodGhpcywgJ2FsbCcpO1xuICAgIH1cblxuICAgIHNpZ25hbHMuZmlyZSgndW5zZXQnLCB7IGludGVyYWN0YWJsZTogdGhpcyB9KTtcblxuICAgIHNjb3BlLmludGVyYWN0YWJsZXMuc3BsaWNlKHNjb3BlLmludGVyYWN0YWJsZXMuaW5kZXhPZih0aGlzKSwgMSk7XG5cbiAgICAvLyBTdG9wIHJlbGF0ZWQgaW50ZXJhY3Rpb25zIHdoZW4gYW4gSW50ZXJhY3RhYmxlIGlzIHVuc2V0XG4gICAgZm9yICh2YXIgX2k0ID0gMDsgX2k0IDwgKHNjb3BlLmludGVyYWN0aW9ucyB8fCBbXSkubGVuZ3RoOyBfaTQrKykge1xuICAgICAgdmFyIF9yZWY0O1xuXG4gICAgICBfcmVmNCA9IChzY29wZS5pbnRlcmFjdGlvbnMgfHwgW10pW19pNF07XG4gICAgICB2YXIgaW50ZXJhY3Rpb24gPSBfcmVmNDtcblxuICAgICAgaWYgKGludGVyYWN0aW9uLnRhcmdldCA9PT0gdGhpcyAmJiBpbnRlcmFjdGlvbi5pbnRlcmFjdGluZygpICYmICFpbnRlcmFjdGlvbi5fZW5kaW5nKSB7XG4gICAgICAgIGludGVyYWN0aW9uLnN0b3AoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gc2NvcGUuaW50ZXJhY3Q7XG4gIH07XG5cbiAgcmV0dXJuIEludGVyYWN0YWJsZTtcbn0oKTtcblxuc2NvcGUuaW50ZXJhY3RhYmxlcy5pbmRleE9mRWxlbWVudCA9IGZ1bmN0aW9uIGluZGV4T2ZFbGVtZW50KHRhcmdldCwgY29udGV4dCkge1xuICBjb250ZXh0ID0gY29udGV4dCB8fCBzY29wZS5kb2N1bWVudDtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaW50ZXJhY3RhYmxlID0gdGhpc1tpXTtcblxuICAgIGlmIChpbnRlcmFjdGFibGUudGFyZ2V0ID09PSB0YXJnZXQgJiYgaW50ZXJhY3RhYmxlLl9jb250ZXh0ID09PSBjb250ZXh0KSB7XG4gICAgICByZXR1cm4gaTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIC0xO1xufTtcblxuc2NvcGUuaW50ZXJhY3RhYmxlcy5nZXQgPSBmdW5jdGlvbiBpbnRlcmFjdGFibGVHZXQoZWxlbWVudCwgb3B0aW9ucywgZG9udENoZWNrSW5Db250ZXh0KSB7XG4gIHZhciByZXQgPSB0aGlzW3RoaXMuaW5kZXhPZkVsZW1lbnQoZWxlbWVudCwgb3B0aW9ucyAmJiBvcHRpb25zLmNvbnRleHQpXTtcblxuICByZXR1cm4gcmV0ICYmIChpcy5zdHJpbmcoZWxlbWVudCkgfHwgZG9udENoZWNrSW5Db250ZXh0IHx8IHJldC5pbkNvbnRleHQoZWxlbWVudCkpID8gcmV0IDogbnVsbDtcbn07XG5cbnNjb3BlLmludGVyYWN0YWJsZXMuZm9yRWFjaE1hdGNoID0gZnVuY3Rpb24gKGVsZW1lbnQsIGNhbGxiYWNrKSB7XG4gIGZvciAodmFyIF9pNSA9IDA7IF9pNSA8IHRoaXMubGVuZ3RoOyBfaTUrKykge1xuICAgIHZhciBfcmVmNTtcblxuICAgIF9yZWY1ID0gdGhpc1tfaTVdO1xuICAgIHZhciBpbnRlcmFjdGFibGUgPSBfcmVmNTtcblxuICAgIHZhciByZXQgPSB2b2lkIDA7XG5cbiAgICBpZiAoKGlzLnN0cmluZyhpbnRlcmFjdGFibGUudGFyZ2V0KVxuICAgIC8vIHRhcmdldCBpcyBhIHNlbGVjdG9yIGFuZCB0aGUgZWxlbWVudCBtYXRjaGVzXG4gICAgPyBpcy5lbGVtZW50KGVsZW1lbnQpICYmIG1hdGNoZXNTZWxlY3RvcihlbGVtZW50LCBpbnRlcmFjdGFibGUudGFyZ2V0KSA6XG4gICAgLy8gdGFyZ2V0IGlzIHRoZSBlbGVtZW50XG4gICAgZWxlbWVudCA9PT0gaW50ZXJhY3RhYmxlLnRhcmdldCkgJiZcbiAgICAvLyB0aGUgZWxlbWVudCBpcyBpbiBjb250ZXh0XG4gICAgaW50ZXJhY3RhYmxlLmluQ29udGV4dChlbGVtZW50KSkge1xuICAgICAgcmV0ID0gY2FsbGJhY2soaW50ZXJhY3RhYmxlKTtcbiAgICB9XG5cbiAgICBpZiAocmV0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiByZXQ7XG4gICAgfVxuICB9XG59O1xuXG4vLyBhbGwgaW50ZXJhY3QuanMgZXZlbnRUeXBlc1xuSW50ZXJhY3RhYmxlLmV2ZW50VHlwZXMgPSBzY29wZS5ldmVudFR5cGVzID0gW107XG5cbkludGVyYWN0YWJsZS5zaWduYWxzID0gc2lnbmFscztcblxuSW50ZXJhY3RhYmxlLnNldHRpbmdzTWV0aG9kcyA9IFsnZGVsdGFTb3VyY2UnLCAnb3JpZ2luJywgJ3ByZXZlbnREZWZhdWx0JywgJ3JlY3RDaGVja2VyJ107XG5cbm1vZHVsZS5leHBvcnRzID0gSW50ZXJhY3RhYmxlO1xuXG59LHtcIi4vRXZlbnRhYmxlXCI6MixcIi4vYWN0aW9ucy9iYXNlXCI6NixcIi4vZGVmYXVsdE9wdGlvbnNcIjoxOCxcIi4vc2NvcGVcIjozMyxcIi4vdXRpbHMvU2lnbmFsc1wiOjM0LFwiLi91dGlscy9hcnJcIjozNSxcIi4vdXRpbHMvYnJvd3NlclwiOjM2LFwiLi91dGlscy9jbG9uZVwiOjM3LFwiLi91dGlscy9kb21VdGlsc1wiOjM5LFwiLi91dGlscy9ldmVudHNcIjo0MCxcIi4vdXRpbHMvZXh0ZW5kXCI6NDEsXCIuL3V0aWxzL2lzXCI6NDYsXCIuL3V0aWxzL3dpbmRvd1wiOjUyfV0sNTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4ndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbnZhciBzY29wZSA9IHJlcXVpcmUoJy4vc2NvcGUnKTtcbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcbnZhciBldmVudHMgPSByZXF1aXJlKCcuL3V0aWxzL2V2ZW50cycpO1xudmFyIGJyb3dzZXIgPSByZXF1aXJlKCcuL3V0aWxzL2Jyb3dzZXInKTtcbnZhciBkb21PYmplY3RzID0gcmVxdWlyZSgnLi91dGlscy9kb21PYmplY3RzJyk7XG52YXIgZmluZGVyID0gcmVxdWlyZSgnLi91dGlscy9pbnRlcmFjdGlvbkZpbmRlcicpO1xudmFyIHNpZ25hbHMgPSByZXF1aXJlKCcuL3V0aWxzL1NpZ25hbHMnKS5uZXcoKTtcblxudmFyIGxpc3RlbmVycyA9IHt9O1xudmFyIG1ldGhvZE5hbWVzID0gWydwb2ludGVyRG93bicsICdwb2ludGVyTW92ZScsICdwb2ludGVyVXAnLCAndXBkYXRlUG9pbnRlcicsICdyZW1vdmVQb2ludGVyJ107XG5cbi8vIGZvciBpZ25vcmluZyBicm93c2VyJ3Mgc2ltdWxhdGVkIG1vdXNlIGV2ZW50c1xudmFyIHByZXZUb3VjaFRpbWUgPSAwO1xuXG4vLyBhbGwgYWN0aXZlIGFuZCBpZGxlIGludGVyYWN0aW9uc1xuc2NvcGUuaW50ZXJhY3Rpb25zID0gW107XG5cbnZhciBJbnRlcmFjdGlvbiA9IGZ1bmN0aW9uICgpIHtcbiAgLyoqICovXG4gIGZ1bmN0aW9uIEludGVyYWN0aW9uKF9yZWYpIHtcbiAgICB2YXIgcG9pbnRlclR5cGUgPSBfcmVmLnBvaW50ZXJUeXBlO1xuXG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEludGVyYWN0aW9uKTtcblxuICAgIHRoaXMudGFyZ2V0ID0gbnVsbDsgLy8gY3VycmVudCBpbnRlcmFjdGFibGUgYmVpbmcgaW50ZXJhY3RlZCB3aXRoXG4gICAgdGhpcy5lbGVtZW50ID0gbnVsbDsgLy8gdGhlIHRhcmdldCBlbGVtZW50IG9mIHRoZSBpbnRlcmFjdGFibGVcblxuICAgIHRoaXMucHJlcGFyZWQgPSB7IC8vIGFjdGlvbiB0aGF0J3MgcmVhZHkgdG8gYmUgZmlyZWQgb24gbmV4dCBtb3ZlIGV2ZW50XG4gICAgICBuYW1lOiBudWxsLFxuICAgICAgYXhpczogbnVsbCxcbiAgICAgIGVkZ2VzOiBudWxsXG4gICAgfTtcblxuICAgIC8vIGtlZXAgdHJhY2sgb2YgYWRkZWQgcG9pbnRlcnNcbiAgICB0aGlzLnBvaW50ZXJzID0gW107XG4gICAgdGhpcy5wb2ludGVySWRzID0gW107XG4gICAgdGhpcy5kb3duVGFyZ2V0cyA9IFtdO1xuICAgIHRoaXMuZG93blRpbWVzID0gW107XG5cbiAgICAvLyBQcmV2aW91cyBuYXRpdmUgcG9pbnRlciBtb3ZlIGV2ZW50IGNvb3JkaW5hdGVzXG4gICAgdGhpcy5wcmV2Q29vcmRzID0ge1xuICAgICAgcGFnZTogeyB4OiAwLCB5OiAwIH0sXG4gICAgICBjbGllbnQ6IHsgeDogMCwgeTogMCB9LFxuICAgICAgdGltZVN0YW1wOiAwXG4gICAgfTtcbiAgICAvLyBjdXJyZW50IG5hdGl2ZSBwb2ludGVyIG1vdmUgZXZlbnQgY29vcmRpbmF0ZXNcbiAgICB0aGlzLmN1ckNvb3JkcyA9IHtcbiAgICAgIHBhZ2U6IHsgeDogMCwgeTogMCB9LFxuICAgICAgY2xpZW50OiB7IHg6IDAsIHk6IDAgfSxcbiAgICAgIHRpbWVTdGFtcDogMFxuICAgIH07XG5cbiAgICAvLyBTdGFydGluZyBJbnRlcmFjdEV2ZW50IHBvaW50ZXIgY29vcmRpbmF0ZXNcbiAgICB0aGlzLnN0YXJ0Q29vcmRzID0ge1xuICAgICAgcGFnZTogeyB4OiAwLCB5OiAwIH0sXG4gICAgICBjbGllbnQ6IHsgeDogMCwgeTogMCB9LFxuICAgICAgdGltZVN0YW1wOiAwXG4gICAgfTtcblxuICAgIC8vIENoYW5nZSBpbiBjb29yZGluYXRlcyBhbmQgdGltZSBvZiB0aGUgcG9pbnRlclxuICAgIHRoaXMucG9pbnRlckRlbHRhID0ge1xuICAgICAgcGFnZTogeyB4OiAwLCB5OiAwLCB2eDogMCwgdnk6IDAsIHNwZWVkOiAwIH0sXG4gICAgICBjbGllbnQ6IHsgeDogMCwgeTogMCwgdng6IDAsIHZ5OiAwLCBzcGVlZDogMCB9LFxuICAgICAgdGltZVN0YW1wOiAwXG4gICAgfTtcblxuICAgIHRoaXMuZG93bkV2ZW50ID0gbnVsbDsgLy8gcG9pbnRlcmRvd24vbW91c2Vkb3duL3RvdWNoc3RhcnQgZXZlbnRcbiAgICB0aGlzLmRvd25Qb2ludGVyID0ge307XG5cbiAgICB0aGlzLl9ldmVudFRhcmdldCA9IG51bGw7XG4gICAgdGhpcy5fY3VyRXZlbnRUYXJnZXQgPSBudWxsO1xuXG4gICAgdGhpcy5wcmV2RXZlbnQgPSBudWxsOyAvLyBwcmV2aW91cyBhY3Rpb24gZXZlbnRcblxuICAgIHRoaXMucG9pbnRlcklzRG93biA9IGZhbHNlO1xuICAgIHRoaXMucG9pbnRlcldhc01vdmVkID0gZmFsc2U7XG4gICAgdGhpcy5faW50ZXJhY3RpbmcgPSBmYWxzZTtcbiAgICB0aGlzLl9lbmRpbmcgPSBmYWxzZTtcblxuICAgIHRoaXMucG9pbnRlclR5cGUgPSBwb2ludGVyVHlwZTtcblxuICAgIHNpZ25hbHMuZmlyZSgnbmV3JywgdGhpcyk7XG5cbiAgICBzY29wZS5pbnRlcmFjdGlvbnMucHVzaCh0aGlzKTtcbiAgfVxuXG4gIEludGVyYWN0aW9uLnByb3RvdHlwZS5wb2ludGVyRG93biA9IGZ1bmN0aW9uIHBvaW50ZXJEb3duKHBvaW50ZXIsIGV2ZW50LCBldmVudFRhcmdldCkge1xuICAgIHZhciBwb2ludGVySW5kZXggPSB0aGlzLnVwZGF0ZVBvaW50ZXIocG9pbnRlciwgZXZlbnQsIHRydWUpO1xuXG4gICAgc2lnbmFscy5maXJlKCdkb3duJywge1xuICAgICAgcG9pbnRlcjogcG9pbnRlcixcbiAgICAgIGV2ZW50OiBldmVudCxcbiAgICAgIGV2ZW50VGFyZ2V0OiBldmVudFRhcmdldCxcbiAgICAgIHBvaW50ZXJJbmRleDogcG9pbnRlckluZGV4LFxuICAgICAgaW50ZXJhY3Rpb246IHRoaXNcbiAgICB9KTtcbiAgfTtcblxuICAvKipcbiAgICogYGBganNcbiAgICogaW50ZXJhY3QodGFyZ2V0KVxuICAgKiAgIC5kcmFnZ2FibGUoe1xuICAgKiAgICAgLy8gZGlzYWJsZSB0aGUgZGVmYXVsdCBkcmFnIHN0YXJ0IGJ5IGRvd24tPm1vdmVcbiAgICogICAgIG1hbnVhbFN0YXJ0OiB0cnVlXG4gICAqICAgfSlcbiAgICogICAvLyBzdGFydCBkcmFnZ2luZyBhZnRlciB0aGUgdXNlciBob2xkcyB0aGUgcG9pbnRlciBkb3duXG4gICAqICAgLm9uKCdob2xkJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAqICAgICB2YXIgaW50ZXJhY3Rpb24gPSBldmVudC5pbnRlcmFjdGlvbjtcbiAgICpcbiAgICogICAgIGlmICghaW50ZXJhY3Rpb24uaW50ZXJhY3RpbmcoKSkge1xuICAgKiAgICAgICBpbnRlcmFjdGlvbi5zdGFydCh7IG5hbWU6ICdkcmFnJyB9LFxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICBldmVudC5pbnRlcmFjdGFibGUsXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50LmN1cnJlbnRUYXJnZXQpO1xuICAgKiAgICAgfVxuICAgKiB9KTtcbiAgICogYGBgXG4gICAqXG4gICAqIFN0YXJ0IGFuIGFjdGlvbiB3aXRoIHRoZSBnaXZlbiBJbnRlcmFjdGFibGUgYW5kIEVsZW1lbnQgYXMgdGFydGdldHMuIFRoZVxuICAgKiBhY3Rpb24gbXVzdCBiZSBlbmFibGVkIGZvciB0aGUgdGFyZ2V0IEludGVyYWN0YWJsZSBhbmQgYW4gYXBwcm9wcmlhdGVcbiAgICogbnVtYmVyIG9mIHBvaW50ZXJzIG11c3QgYmUgaGVsZCBkb3duIC0gMSBmb3IgZHJhZy9yZXNpemUsIDIgZm9yIGdlc3R1cmUuXG4gICAqXG4gICAqIFVzZSBpdCB3aXRoIGBpbnRlcmFjdGFibGUuPGFjdGlvbj5hYmxlKHsgbWFudWFsU3RhcnQ6IGZhbHNlIH0pYCB0byBhbHdheXNcbiAgICogW3N0YXJ0IGFjdGlvbnMgbWFudWFsbHldKGh0dHBzOi8vZ2l0aHViLmNvbS90YXllL2ludGVyYWN0LmpzL2lzc3Vlcy8xMTQpXG4gICAqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBhY3Rpb24gICBUaGUgYWN0aW9uIHRvIGJlIHBlcmZvcm1lZCAtIGRyYWcsIHJlc2l6ZSwgZXRjLlxuICAgKiBAcGFyYW0ge0ludGVyYWN0YWJsZX0gdGFyZ2V0ICBUaGUgSW50ZXJhY3RhYmxlIHRvIHRhcmdldFxuICAgKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnQgVGhlIERPTSBFbGVtZW50IHRvIHRhcmdldFxuICAgKiBAcmV0dXJuIHtvYmplY3R9IGludGVyYWN0XG4gICAqL1xuXG5cbiAgSW50ZXJhY3Rpb24ucHJvdG90eXBlLnN0YXJ0ID0gZnVuY3Rpb24gc3RhcnQoYWN0aW9uLCB0YXJnZXQsIGVsZW1lbnQpIHtcbiAgICBpZiAodGhpcy5pbnRlcmFjdGluZygpIHx8ICF0aGlzLnBvaW50ZXJJc0Rvd24gfHwgdGhpcy5wb2ludGVySWRzLmxlbmd0aCA8IChhY3Rpb24ubmFtZSA9PT0gJ2dlc3R1cmUnID8gMiA6IDEpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gaWYgdGhpcyBpbnRlcmFjdGlvbiBoYWQgYmVlbiByZW1vdmVkIGFmdGVyIHN0b3BwaW5nXG4gICAgLy8gYWRkIGl0IGJhY2tcbiAgICBpZiAoc2NvcGUuaW50ZXJhY3Rpb25zLmluZGV4T2YodGhpcykgPT09IC0xKSB7XG4gICAgICBzY29wZS5pbnRlcmFjdGlvbnMucHVzaCh0aGlzKTtcbiAgICB9XG5cbiAgICB1dGlscy5jb3B5QWN0aW9uKHRoaXMucHJlcGFyZWQsIGFjdGlvbik7XG4gICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XG4gICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcblxuICAgIHNpZ25hbHMuZmlyZSgnYWN0aW9uLXN0YXJ0Jywge1xuICAgICAgaW50ZXJhY3Rpb246IHRoaXMsXG4gICAgICBldmVudDogdGhpcy5kb3duRXZlbnRcbiAgICB9KTtcbiAgfTtcblxuICBJbnRlcmFjdGlvbi5wcm90b3R5cGUucG9pbnRlck1vdmUgPSBmdW5jdGlvbiBwb2ludGVyTW92ZShwb2ludGVyLCBldmVudCwgZXZlbnRUYXJnZXQpIHtcbiAgICBpZiAoIXRoaXMuc2ltdWxhdGlvbikge1xuICAgICAgdGhpcy51cGRhdGVQb2ludGVyKHBvaW50ZXIpO1xuICAgICAgdXRpbHMuc2V0Q29vcmRzKHRoaXMuY3VyQ29vcmRzLCB0aGlzLnBvaW50ZXJzKTtcbiAgICB9XG5cbiAgICB2YXIgZHVwbGljYXRlTW92ZSA9IHRoaXMuY3VyQ29vcmRzLnBhZ2UueCA9PT0gdGhpcy5wcmV2Q29vcmRzLnBhZ2UueCAmJiB0aGlzLmN1ckNvb3Jkcy5wYWdlLnkgPT09IHRoaXMucHJldkNvb3Jkcy5wYWdlLnkgJiYgdGhpcy5jdXJDb29yZHMuY2xpZW50LnggPT09IHRoaXMucHJldkNvb3Jkcy5jbGllbnQueCAmJiB0aGlzLmN1ckNvb3Jkcy5jbGllbnQueSA9PT0gdGhpcy5wcmV2Q29vcmRzLmNsaWVudC55O1xuXG4gICAgdmFyIGR4ID0gdm9pZCAwO1xuICAgIHZhciBkeSA9IHZvaWQgMDtcblxuICAgIC8vIHJlZ2lzdGVyIG1vdmVtZW50IGdyZWF0ZXIgdGhhbiBwb2ludGVyTW92ZVRvbGVyYW5jZVxuICAgIGlmICh0aGlzLnBvaW50ZXJJc0Rvd24gJiYgIXRoaXMucG9pbnRlcldhc01vdmVkKSB7XG4gICAgICBkeCA9IHRoaXMuY3VyQ29vcmRzLmNsaWVudC54IC0gdGhpcy5zdGFydENvb3Jkcy5jbGllbnQueDtcbiAgICAgIGR5ID0gdGhpcy5jdXJDb29yZHMuY2xpZW50LnkgLSB0aGlzLnN0YXJ0Q29vcmRzLmNsaWVudC55O1xuXG4gICAgICB0aGlzLnBvaW50ZXJXYXNNb3ZlZCA9IHV0aWxzLmh5cG90KGR4LCBkeSkgPiBJbnRlcmFjdGlvbi5wb2ludGVyTW92ZVRvbGVyYW5jZTtcbiAgICB9XG5cbiAgICB2YXIgc2lnbmFsQXJnID0ge1xuICAgICAgcG9pbnRlcjogcG9pbnRlcixcbiAgICAgIHBvaW50ZXJJbmRleDogdGhpcy5nZXRQb2ludGVySW5kZXgocG9pbnRlciksXG4gICAgICBldmVudDogZXZlbnQsXG4gICAgICBldmVudFRhcmdldDogZXZlbnRUYXJnZXQsXG4gICAgICBkeDogZHgsXG4gICAgICBkeTogZHksXG4gICAgICBkdXBsaWNhdGU6IGR1cGxpY2F0ZU1vdmUsXG4gICAgICBpbnRlcmFjdGlvbjogdGhpcyxcbiAgICAgIGludGVyYWN0aW5nQmVmb3JlTW92ZTogdGhpcy5pbnRlcmFjdGluZygpXG4gICAgfTtcblxuICAgIGlmICghZHVwbGljYXRlTW92ZSkge1xuICAgICAgLy8gc2V0IHBvaW50ZXIgY29vcmRpbmF0ZSwgdGltZSBjaGFuZ2VzIGFuZCBzcGVlZHNcbiAgICAgIHV0aWxzLnNldENvb3JkRGVsdGFzKHRoaXMucG9pbnRlckRlbHRhLCB0aGlzLnByZXZDb29yZHMsIHRoaXMuY3VyQ29vcmRzKTtcbiAgICB9XG5cbiAgICBzaWduYWxzLmZpcmUoJ21vdmUnLCBzaWduYWxBcmcpO1xuXG4gICAgaWYgKCFkdXBsaWNhdGVNb3ZlKSB7XG4gICAgICAvLyBpZiBpbnRlcmFjdGluZywgZmlyZSBhbiAnYWN0aW9uLW1vdmUnIHNpZ25hbCBldGNcbiAgICAgIGlmICh0aGlzLmludGVyYWN0aW5nKCkpIHtcbiAgICAgICAgdGhpcy5kb01vdmUoc2lnbmFsQXJnKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMucG9pbnRlcldhc01vdmVkKSB7XG4gICAgICAgIHV0aWxzLmNvcHlDb29yZHModGhpcy5wcmV2Q29vcmRzLCB0aGlzLmN1ckNvb3Jkcyk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBgYGBqc1xuICAgKiBpbnRlcmFjdCh0YXJnZXQpXG4gICAqICAgLmRyYWdnYWJsZSh0cnVlKVxuICAgKiAgIC5vbignZHJhZ21vdmUnLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICogICAgIGlmIChzb21lQ29uZGl0aW9uKSB7XG4gICAqICAgICAgIC8vIGNoYW5nZSB0aGUgc25hcCBzZXR0aW5nc1xuICAgKiAgICAgICBldmVudC5pbnRlcmFjdGFibGUuZHJhZ2dhYmxlKHsgc25hcDogeyB0YXJnZXRzOiBbXSB9fSk7XG4gICAqICAgICAgIC8vIGZpcmUgYW5vdGhlciBtb3ZlIGV2ZW50IHdpdGggcmUtY2FsY3VsYXRlZCBzbmFwXG4gICAqICAgICAgIGV2ZW50LmludGVyYWN0aW9uLmRvTW92ZSgpO1xuICAgKiAgICAgfVxuICAgKiAgIH0pO1xuICAgKiBgYGBcbiAgICpcbiAgICogRm9yY2UgYSBtb3ZlIG9mIHRoZSBjdXJyZW50IGFjdGlvbiBhdCB0aGUgc2FtZSBjb29yZGluYXRlcy4gVXNlZnVsIGlmXG4gICAqIHNuYXAvcmVzdHJpY3QgaGFzIGJlZW4gY2hhbmdlZCBhbmQgeW91IHdhbnQgYSBtb3ZlbWVudCB3aXRoIHRoZSBuZXdcbiAgICogc2V0dGluZ3MuXG4gICAqL1xuXG5cbiAgSW50ZXJhY3Rpb24ucHJvdG90eXBlLmRvTW92ZSA9IGZ1bmN0aW9uIGRvTW92ZShzaWduYWxBcmcpIHtcbiAgICBzaWduYWxBcmcgPSB1dGlscy5leHRlbmQoe1xuICAgICAgcG9pbnRlcjogdGhpcy5wb2ludGVyc1swXSxcbiAgICAgIGV2ZW50OiB0aGlzLnByZXZFdmVudCxcbiAgICAgIGV2ZW50VGFyZ2V0OiB0aGlzLl9ldmVudFRhcmdldCxcbiAgICAgIGludGVyYWN0aW9uOiB0aGlzXG4gICAgfSwgc2lnbmFsQXJnIHx8IHt9KTtcblxuICAgIHNpZ25hbHMuZmlyZSgnYmVmb3JlLWFjdGlvbi1tb3ZlJywgc2lnbmFsQXJnKTtcblxuICAgIGlmICghdGhpcy5fZG9udEZpcmVNb3ZlKSB7XG4gICAgICBzaWduYWxzLmZpcmUoJ2FjdGlvbi1tb3ZlJywgc2lnbmFsQXJnKTtcbiAgICB9XG5cbiAgICB0aGlzLl9kb250RmlyZU1vdmUgPSBmYWxzZTtcbiAgfTtcblxuICAvLyBFbmQgaW50ZXJhY3QgbW92ZSBldmVudHMgYW5kIHN0b3AgYXV0by1zY3JvbGwgdW5sZXNzIHNpbXVsYXRpb24gaXMgcnVubmluZ1xuXG5cbiAgSW50ZXJhY3Rpb24ucHJvdG90eXBlLnBvaW50ZXJVcCA9IGZ1bmN0aW9uIHBvaW50ZXJVcChwb2ludGVyLCBldmVudCwgZXZlbnRUYXJnZXQsIGN1ckV2ZW50VGFyZ2V0KSB7XG4gICAgdmFyIHBvaW50ZXJJbmRleCA9IHRoaXMuZ2V0UG9pbnRlckluZGV4KHBvaW50ZXIpO1xuXG4gICAgc2lnbmFscy5maXJlKC9jYW5jZWwkL2kudGVzdChldmVudC50eXBlKSA/ICdjYW5jZWwnIDogJ3VwJywge1xuICAgICAgcG9pbnRlcjogcG9pbnRlcixcbiAgICAgIHBvaW50ZXJJbmRleDogcG9pbnRlckluZGV4LFxuICAgICAgZXZlbnQ6IGV2ZW50LFxuICAgICAgZXZlbnRUYXJnZXQ6IGV2ZW50VGFyZ2V0LFxuICAgICAgY3VyRXZlbnRUYXJnZXQ6IGN1ckV2ZW50VGFyZ2V0LFxuICAgICAgaW50ZXJhY3Rpb246IHRoaXNcbiAgICB9KTtcblxuICAgIGlmICghdGhpcy5zaW11bGF0aW9uKSB7XG4gICAgICB0aGlzLmVuZChldmVudCk7XG4gICAgfVxuXG4gICAgdGhpcy5wb2ludGVySXNEb3duID0gZmFsc2U7XG4gICAgdGhpcy5yZW1vdmVQb2ludGVyKHBvaW50ZXIsIGV2ZW50KTtcbiAgfTtcblxuICAvKipcbiAgICogYGBganNcbiAgICogaW50ZXJhY3QodGFyZ2V0KVxuICAgKiAgIC5kcmFnZ2FibGUodHJ1ZSlcbiAgICogICAub24oJ21vdmUnLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICogICAgIGlmIChldmVudC5wYWdlWCA+IDEwMDApIHtcbiAgICogICAgICAgLy8gZW5kIHRoZSBjdXJyZW50IGFjdGlvblxuICAgKiAgICAgICBldmVudC5pbnRlcmFjdGlvbi5lbmQoKTtcbiAgICogICAgICAgLy8gc3RvcCBhbGwgZnVydGhlciBsaXN0ZW5lcnMgZnJvbSBiZWluZyBjYWxsZWRcbiAgICogICAgICAgZXZlbnQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG4gICAqICAgICB9XG4gICAqICAgfSk7XG4gICAqIGBgYFxuICAgKlxuICAgKiBTdG9wIHRoZSBjdXJyZW50IGFjdGlvbiBhbmQgZmlyZSBhbiBlbmQgZXZlbnQuIEluZXJ0aWFsIG1vdmVtZW50IGRvZXNcbiAgICogbm90IGhhcHBlbi5cbiAgICpcbiAgICogQHBhcmFtIHtQb2ludGVyRXZlbnR9IFtldmVudF1cbiAgICovXG5cblxuICBJbnRlcmFjdGlvbi5wcm90b3R5cGUuZW5kID0gZnVuY3Rpb24gZW5kKGV2ZW50KSB7XG4gICAgdGhpcy5fZW5kaW5nID0gdHJ1ZTtcblxuICAgIGV2ZW50ID0gZXZlbnQgfHwgdGhpcy5wcmV2RXZlbnQ7XG5cbiAgICBpZiAodGhpcy5pbnRlcmFjdGluZygpKSB7XG4gICAgICBzaWduYWxzLmZpcmUoJ2FjdGlvbi1lbmQnLCB7XG4gICAgICAgIGV2ZW50OiBldmVudCxcbiAgICAgICAgaW50ZXJhY3Rpb246IHRoaXNcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHRoaXMuc3RvcCgpO1xuICAgIHRoaXMuX2VuZGluZyA9IGZhbHNlO1xuICB9O1xuXG4gIEludGVyYWN0aW9uLnByb3RvdHlwZS5jdXJyZW50QWN0aW9uID0gZnVuY3Rpb24gY3VycmVudEFjdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5faW50ZXJhY3RpbmcgPyB0aGlzLnByZXBhcmVkLm5hbWUgOiBudWxsO1xuICB9O1xuXG4gIEludGVyYWN0aW9uLnByb3RvdHlwZS5pbnRlcmFjdGluZyA9IGZ1bmN0aW9uIGludGVyYWN0aW5nKCkge1xuICAgIHJldHVybiB0aGlzLl9pbnRlcmFjdGluZztcbiAgfTtcblxuICAvKiogKi9cblxuXG4gIEludGVyYWN0aW9uLnByb3RvdHlwZS5zdG9wID0gZnVuY3Rpb24gc3RvcCgpIHtcbiAgICBzaWduYWxzLmZpcmUoJ3N0b3AnLCB7IGludGVyYWN0aW9uOiB0aGlzIH0pO1xuXG4gICAgaWYgKHRoaXMuX2ludGVyYWN0aW5nKSB7XG4gICAgICBzaWduYWxzLmZpcmUoJ3N0b3AtYWN0aXZlJywgeyBpbnRlcmFjdGlvbjogdGhpcyB9KTtcbiAgICAgIHNpZ25hbHMuZmlyZSgnc3RvcC0nICsgdGhpcy5wcmVwYXJlZC5uYW1lLCB7IGludGVyYWN0aW9uOiB0aGlzIH0pO1xuICAgIH1cblxuICAgIHRoaXMudGFyZ2V0ID0gdGhpcy5lbGVtZW50ID0gbnVsbDtcblxuICAgIHRoaXMuX2ludGVyYWN0aW5nID0gZmFsc2U7XG4gICAgdGhpcy5wcmVwYXJlZC5uYW1lID0gdGhpcy5wcmV2RXZlbnQgPSBudWxsO1xuICB9O1xuXG4gIEludGVyYWN0aW9uLnByb3RvdHlwZS5nZXRQb2ludGVySW5kZXggPSBmdW5jdGlvbiBnZXRQb2ludGVySW5kZXgocG9pbnRlcikge1xuICAgIC8vIG1vdXNlIGFuZCBwZW4gaW50ZXJhY3Rpb25zIG1heSBoYXZlIG9ubHkgb25lIHBvaW50ZXJcbiAgICBpZiAodGhpcy5wb2ludGVyVHlwZSA9PT0gJ21vdXNlJyB8fCB0aGlzLnBvaW50ZXJUeXBlID09PSAncGVuJykge1xuICAgICAgcmV0dXJuIDA7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMucG9pbnRlcklkcy5pbmRleE9mKHV0aWxzLmdldFBvaW50ZXJJZChwb2ludGVyKSk7XG4gIH07XG5cbiAgSW50ZXJhY3Rpb24ucHJvdG90eXBlLnVwZGF0ZVBvaW50ZXIgPSBmdW5jdGlvbiB1cGRhdGVQb2ludGVyKHBvaW50ZXIsIGV2ZW50KSB7XG4gICAgdmFyIGRvd24gPSBhcmd1bWVudHMubGVuZ3RoID4gMiAmJiBhcmd1bWVudHNbMl0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1syXSA6IGV2ZW50ICYmIC8oZG93bnxzdGFydCkkL2kudGVzdChldmVudC50eXBlKTtcblxuICAgIHZhciBpZCA9IHV0aWxzLmdldFBvaW50ZXJJZChwb2ludGVyKTtcbiAgICB2YXIgaW5kZXggPSB0aGlzLmdldFBvaW50ZXJJbmRleChwb2ludGVyKTtcblxuICAgIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICAgIGluZGV4ID0gdGhpcy5wb2ludGVySWRzLmxlbmd0aDtcbiAgICAgIHRoaXMucG9pbnRlcklkc1tpbmRleF0gPSBpZDtcbiAgICB9XG5cbiAgICBpZiAoZG93bikge1xuICAgICAgc2lnbmFscy5maXJlKCd1cGRhdGUtcG9pbnRlci1kb3duJywge1xuICAgICAgICBwb2ludGVyOiBwb2ludGVyLFxuICAgICAgICBldmVudDogZXZlbnQsXG4gICAgICAgIGRvd246IGRvd24sXG4gICAgICAgIHBvaW50ZXJJZDogaWQsXG4gICAgICAgIHBvaW50ZXJJbmRleDogaW5kZXgsXG4gICAgICAgIGludGVyYWN0aW9uOiB0aGlzXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICB0aGlzLnBvaW50ZXJzW2luZGV4XSA9IHBvaW50ZXI7XG5cbiAgICByZXR1cm4gaW5kZXg7XG4gIH07XG5cbiAgSW50ZXJhY3Rpb24ucHJvdG90eXBlLnJlbW92ZVBvaW50ZXIgPSBmdW5jdGlvbiByZW1vdmVQb2ludGVyKHBvaW50ZXIsIGV2ZW50KSB7XG4gICAgdmFyIGluZGV4ID0gdGhpcy5nZXRQb2ludGVySW5kZXgocG9pbnRlcik7XG5cbiAgICBpZiAoaW5kZXggPT09IC0xKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgc2lnbmFscy5maXJlKCdyZW1vdmUtcG9pbnRlcicsIHtcbiAgICAgIHBvaW50ZXI6IHBvaW50ZXIsXG4gICAgICBldmVudDogZXZlbnQsXG4gICAgICBwb2ludGVySW5kZXg6IGluZGV4LFxuICAgICAgaW50ZXJhY3Rpb246IHRoaXNcbiAgICB9KTtcblxuICAgIHRoaXMucG9pbnRlcnMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB0aGlzLnBvaW50ZXJJZHMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB0aGlzLmRvd25UYXJnZXRzLnNwbGljZShpbmRleCwgMSk7XG4gICAgdGhpcy5kb3duVGltZXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgfTtcblxuICBJbnRlcmFjdGlvbi5wcm90b3R5cGUuX3VwZGF0ZUV2ZW50VGFyZ2V0cyA9IGZ1bmN0aW9uIF91cGRhdGVFdmVudFRhcmdldHModGFyZ2V0LCBjdXJyZW50VGFyZ2V0KSB7XG4gICAgdGhpcy5fZXZlbnRUYXJnZXQgPSB0YXJnZXQ7XG4gICAgdGhpcy5fY3VyRXZlbnRUYXJnZXQgPSBjdXJyZW50VGFyZ2V0O1xuICB9O1xuXG4gIHJldHVybiBJbnRlcmFjdGlvbjtcbn0oKTtcblxuZm9yICh2YXIgX2kgPSAwOyBfaSA8IG1ldGhvZE5hbWVzLmxlbmd0aDsgX2krKykge1xuICB2YXIgbWV0aG9kID0gbWV0aG9kTmFtZXNbX2ldO1xuICBsaXN0ZW5lcnNbbWV0aG9kXSA9IGRvT25JbnRlcmFjdGlvbnMobWV0aG9kKTtcbn1cblxuZnVuY3Rpb24gZG9PbkludGVyYWN0aW9ucyhtZXRob2QpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChldmVudCkge1xuICAgIHZhciBwb2ludGVyVHlwZSA9IHV0aWxzLmdldFBvaW50ZXJUeXBlKGV2ZW50KTtcblxuICAgIHZhciBfdXRpbHMkZ2V0RXZlbnRUYXJnZXQgPSB1dGlscy5nZXRFdmVudFRhcmdldHMoZXZlbnQpLFxuICAgICAgICBldmVudFRhcmdldCA9IF91dGlscyRnZXRFdmVudFRhcmdldFswXSxcbiAgICAgICAgY3VyRXZlbnRUYXJnZXQgPSBfdXRpbHMkZ2V0RXZlbnRUYXJnZXRbMV07XG5cbiAgICB2YXIgbWF0Y2hlcyA9IFtdOyAvLyBbIFtwb2ludGVyLCBpbnRlcmFjdGlvbl0sIC4uLl1cblxuICAgIGlmIChicm93c2VyLnN1cHBvcnRzVG91Y2ggJiYgL3RvdWNoLy50ZXN0KGV2ZW50LnR5cGUpKSB7XG4gICAgICBwcmV2VG91Y2hUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG5cbiAgICAgIGZvciAodmFyIF9pMiA9IDA7IF9pMiA8IGV2ZW50LmNoYW5nZWRUb3VjaGVzLmxlbmd0aDsgX2kyKyspIHtcbiAgICAgICAgdmFyIF9yZWYyO1xuXG4gICAgICAgIF9yZWYyID0gZXZlbnQuY2hhbmdlZFRvdWNoZXNbX2kyXTtcbiAgICAgICAgdmFyIGNoYW5nZWRUb3VjaCA9IF9yZWYyO1xuXG4gICAgICAgIHZhciBwb2ludGVyID0gY2hhbmdlZFRvdWNoO1xuICAgICAgICB2YXIgaW50ZXJhY3Rpb24gPSBmaW5kZXIuc2VhcmNoKHBvaW50ZXIsIGV2ZW50LnR5cGUsIGV2ZW50VGFyZ2V0KTtcblxuICAgICAgICBtYXRjaGVzLnB1c2goW3BvaW50ZXIsIGludGVyYWN0aW9uIHx8IG5ldyBJbnRlcmFjdGlvbih7IHBvaW50ZXJUeXBlOiBwb2ludGVyVHlwZSB9KV0pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgaW52YWxpZFBvaW50ZXIgPSBmYWxzZTtcblxuICAgICAgaWYgKCFicm93c2VyLnN1cHBvcnRzUG9pbnRlckV2ZW50ICYmIC9tb3VzZS8udGVzdChldmVudC50eXBlKSkge1xuICAgICAgICAvLyBpZ25vcmUgbW91c2UgZXZlbnRzIHdoaWxlIHRvdWNoIGludGVyYWN0aW9ucyBhcmUgYWN0aXZlXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2NvcGUuaW50ZXJhY3Rpb25zLmxlbmd0aCAmJiAhaW52YWxpZFBvaW50ZXI7IGkrKykge1xuICAgICAgICAgIGludmFsaWRQb2ludGVyID0gc2NvcGUuaW50ZXJhY3Rpb25zW2ldLnBvaW50ZXJUeXBlICE9PSAnbW91c2UnICYmIHNjb3BlLmludGVyYWN0aW9uc1tpXS5wb2ludGVySXNEb3duO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gdHJ5IHRvIGlnbm9yZSBtb3VzZSBldmVudHMgdGhhdCBhcmUgc2ltdWxhdGVkIGJ5IHRoZSBicm93c2VyXG4gICAgICAgIC8vIGFmdGVyIGEgdG91Y2ggZXZlbnRcbiAgICAgICAgaW52YWxpZFBvaW50ZXIgPSBpbnZhbGlkUG9pbnRlciB8fCBuZXcgRGF0ZSgpLmdldFRpbWUoKSAtIHByZXZUb3VjaFRpbWUgPCA1MDBcbiAgICAgICAgLy8gb24gaU9TIGFuZCBGaXJlZm94IE1vYmlsZSwgTW91c2VFdmVudC50aW1lU3RhbXAgaXMgemVybyBpZiBzaW11bGF0ZWRcbiAgICAgICAgfHwgZXZlbnQudGltZVN0YW1wID09PSAwO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWludmFsaWRQb2ludGVyKSB7XG4gICAgICAgIHZhciBfaW50ZXJhY3Rpb24gPSBmaW5kZXIuc2VhcmNoKGV2ZW50LCBldmVudC50eXBlLCBldmVudFRhcmdldCk7XG5cbiAgICAgICAgaWYgKCFfaW50ZXJhY3Rpb24pIHtcbiAgICAgICAgICBfaW50ZXJhY3Rpb24gPSBuZXcgSW50ZXJhY3Rpb24oeyBwb2ludGVyVHlwZTogcG9pbnRlclR5cGUgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBtYXRjaGVzLnB1c2goW2V2ZW50LCBfaW50ZXJhY3Rpb25dKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKHZhciBfaTMgPSAwOyBfaTMgPCBtYXRjaGVzLmxlbmd0aDsgX2kzKyspIHtcbiAgICAgIHZhciBfcmVmMyA9IG1hdGNoZXNbX2kzXTtcbiAgICAgIHZhciBfcG9pbnRlciA9IF9yZWYzWzBdO1xuICAgICAgdmFyIF9pbnRlcmFjdGlvbjIgPSBfcmVmM1sxXTtcblxuICAgICAgX2ludGVyYWN0aW9uMi5fdXBkYXRlRXZlbnRUYXJnZXRzKGV2ZW50VGFyZ2V0LCBjdXJFdmVudFRhcmdldCk7XG4gICAgICBfaW50ZXJhY3Rpb24yW21ldGhvZF0oX3BvaW50ZXIsIGV2ZW50LCBldmVudFRhcmdldCwgY3VyRXZlbnRUYXJnZXQpO1xuICAgIH1cbiAgfTtcbn1cblxuZnVuY3Rpb24gZW5kQWxsKGV2ZW50KSB7XG4gIGZvciAodmFyIF9pNCA9IDA7IF9pNCA8IHNjb3BlLmludGVyYWN0aW9ucy5sZW5ndGg7IF9pNCsrKSB7XG4gICAgdmFyIF9yZWY0O1xuXG4gICAgX3JlZjQgPSBzY29wZS5pbnRlcmFjdGlvbnNbX2k0XTtcbiAgICB2YXIgaW50ZXJhY3Rpb24gPSBfcmVmNDtcblxuICAgIGludGVyYWN0aW9uLmVuZChldmVudCk7XG4gICAgc2lnbmFscy5maXJlKCdlbmRhbGwnLCB7IGV2ZW50OiBldmVudCwgaW50ZXJhY3Rpb246IGludGVyYWN0aW9uIH0pO1xuICB9XG59XG5cbnZhciBkb2NFdmVudHMgPSB7LyogJ2V2ZW50VHlwZSc6IGxpc3RlbmVyRnVuYyAqL307XG52YXIgcEV2ZW50VHlwZXMgPSBicm93c2VyLnBFdmVudFR5cGVzO1xuXG5pZiAoZG9tT2JqZWN0cy5Qb2ludGVyRXZlbnQpIHtcbiAgZG9jRXZlbnRzW3BFdmVudFR5cGVzLmRvd25dID0gbGlzdGVuZXJzLnBvaW50ZXJEb3duO1xuICBkb2NFdmVudHNbcEV2ZW50VHlwZXMubW92ZV0gPSBsaXN0ZW5lcnMucG9pbnRlck1vdmU7XG4gIGRvY0V2ZW50c1twRXZlbnRUeXBlcy51cF0gPSBsaXN0ZW5lcnMucG9pbnRlclVwO1xuICBkb2NFdmVudHNbcEV2ZW50VHlwZXMuY2FuY2VsXSA9IGxpc3RlbmVycy5wb2ludGVyVXA7XG59IGVsc2Uge1xuICBkb2NFdmVudHMubW91c2Vkb3duID0gbGlzdGVuZXJzLnBvaW50ZXJEb3duO1xuICBkb2NFdmVudHMubW91c2Vtb3ZlID0gbGlzdGVuZXJzLnBvaW50ZXJNb3ZlO1xuICBkb2NFdmVudHMubW91c2V1cCA9IGxpc3RlbmVycy5wb2ludGVyVXA7XG5cbiAgZG9jRXZlbnRzLnRvdWNoc3RhcnQgPSBsaXN0ZW5lcnMucG9pbnRlckRvd247XG4gIGRvY0V2ZW50cy50b3VjaG1vdmUgPSBsaXN0ZW5lcnMucG9pbnRlck1vdmU7XG4gIGRvY0V2ZW50cy50b3VjaGVuZCA9IGxpc3RlbmVycy5wb2ludGVyVXA7XG4gIGRvY0V2ZW50cy50b3VjaGNhbmNlbCA9IGxpc3RlbmVycy5wb2ludGVyVXA7XG59XG5cbmRvY0V2ZW50cy5ibHVyID0gZW5kQWxsO1xuXG5mdW5jdGlvbiBvbkRvY1NpZ25hbChfcmVmNSwgc2lnbmFsTmFtZSkge1xuICB2YXIgZG9jID0gX3JlZjUuZG9jO1xuXG4gIHZhciBldmVudE1ldGhvZCA9IHNpZ25hbE5hbWUuaW5kZXhPZignYWRkJykgPT09IDAgPyBldmVudHMuYWRkIDogZXZlbnRzLnJlbW92ZTtcblxuICAvLyBkZWxlZ2F0ZSBldmVudCBsaXN0ZW5lclxuICBmb3IgKHZhciBldmVudFR5cGUgaW4gc2NvcGUuZGVsZWdhdGVkRXZlbnRzKSB7XG4gICAgZXZlbnRNZXRob2QoZG9jLCBldmVudFR5cGUsIGV2ZW50cy5kZWxlZ2F0ZUxpc3RlbmVyKTtcbiAgICBldmVudE1ldGhvZChkb2MsIGV2ZW50VHlwZSwgZXZlbnRzLmRlbGVnYXRlVXNlQ2FwdHVyZSwgdHJ1ZSk7XG4gIH1cblxuICBmb3IgKHZhciBfZXZlbnRUeXBlIGluIGRvY0V2ZW50cykge1xuICAgIGV2ZW50TWV0aG9kKGRvYywgX2V2ZW50VHlwZSwgZG9jRXZlbnRzW19ldmVudFR5cGVdLCBicm93c2VyLmlzSU9TID8geyBwYXNzaXZlOiBmYWxzZSB9IDogdW5kZWZpbmVkKTtcbiAgfVxufVxuXG5zaWduYWxzLm9uKCd1cGRhdGUtcG9pbnRlci1kb3duJywgZnVuY3Rpb24gKF9yZWY2KSB7XG4gIHZhciBpbnRlcmFjdGlvbiA9IF9yZWY2LmludGVyYWN0aW9uLFxuICAgICAgcG9pbnRlciA9IF9yZWY2LnBvaW50ZXIsXG4gICAgICBwb2ludGVySWQgPSBfcmVmNi5wb2ludGVySWQsXG4gICAgICBwb2ludGVySW5kZXggPSBfcmVmNi5wb2ludGVySW5kZXgsXG4gICAgICBldmVudCA9IF9yZWY2LmV2ZW50LFxuICAgICAgZXZlbnRUYXJnZXQgPSBfcmVmNi5ldmVudFRhcmdldCxcbiAgICAgIGRvd24gPSBfcmVmNi5kb3duO1xuXG4gIGludGVyYWN0aW9uLnBvaW50ZXJJZHNbcG9pbnRlckluZGV4XSA9IHBvaW50ZXJJZDtcbiAgaW50ZXJhY3Rpb24ucG9pbnRlcnNbcG9pbnRlckluZGV4XSA9IHBvaW50ZXI7XG5cbiAgaWYgKGRvd24pIHtcbiAgICBpbnRlcmFjdGlvbi5wb2ludGVySXNEb3duID0gdHJ1ZTtcbiAgfVxuXG4gIGlmICghaW50ZXJhY3Rpb24uaW50ZXJhY3RpbmcoKSkge1xuICAgIHV0aWxzLnNldENvb3JkcyhpbnRlcmFjdGlvbi5zdGFydENvb3JkcywgaW50ZXJhY3Rpb24ucG9pbnRlcnMpO1xuXG4gICAgdXRpbHMuY29weUNvb3JkcyhpbnRlcmFjdGlvbi5jdXJDb29yZHMsIGludGVyYWN0aW9uLnN0YXJ0Q29vcmRzKTtcbiAgICB1dGlscy5jb3B5Q29vcmRzKGludGVyYWN0aW9uLnByZXZDb29yZHMsIGludGVyYWN0aW9uLnN0YXJ0Q29vcmRzKTtcblxuICAgIGludGVyYWN0aW9uLmRvd25FdmVudCA9IGV2ZW50O1xuICAgIGludGVyYWN0aW9uLmRvd25UaW1lc1twb2ludGVySW5kZXhdID0gaW50ZXJhY3Rpb24uY3VyQ29vcmRzLnRpbWVTdGFtcDtcbiAgICBpbnRlcmFjdGlvbi5kb3duVGFyZ2V0c1twb2ludGVySW5kZXhdID0gZXZlbnRUYXJnZXQgfHwgZXZlbnQgJiYgdXRpbHMuZ2V0RXZlbnRUYXJnZXRzKGV2ZW50KVswXTtcbiAgICBpbnRlcmFjdGlvbi5wb2ludGVyV2FzTW92ZWQgPSBmYWxzZTtcblxuICAgIHV0aWxzLnBvaW50ZXJFeHRlbmQoaW50ZXJhY3Rpb24uZG93blBvaW50ZXIsIHBvaW50ZXIpO1xuICB9XG59KTtcblxuc2NvcGUuc2lnbmFscy5vbignYWRkLWRvY3VtZW50Jywgb25Eb2NTaWduYWwpO1xuc2NvcGUuc2lnbmFscy5vbigncmVtb3ZlLWRvY3VtZW50Jywgb25Eb2NTaWduYWwpO1xuXG5JbnRlcmFjdGlvbi5wb2ludGVyTW92ZVRvbGVyYW5jZSA9IDE7XG5JbnRlcmFjdGlvbi5kb09uSW50ZXJhY3Rpb25zID0gZG9PbkludGVyYWN0aW9ucztcbkludGVyYWN0aW9uLmVuZEFsbCA9IGVuZEFsbDtcbkludGVyYWN0aW9uLnNpZ25hbHMgPSBzaWduYWxzO1xuSW50ZXJhY3Rpb24uZG9jRXZlbnRzID0gZG9jRXZlbnRzO1xuXG5zY29wZS5lbmRBbGxJbnRlcmFjdGlvbnMgPSBlbmRBbGw7XG5cbm1vZHVsZS5leHBvcnRzID0gSW50ZXJhY3Rpb247XG5cbn0se1wiLi9zY29wZVwiOjMzLFwiLi91dGlsc1wiOjQ0LFwiLi91dGlscy9TaWduYWxzXCI6MzQsXCIuL3V0aWxzL2Jyb3dzZXJcIjozNixcIi4vdXRpbHMvZG9tT2JqZWN0c1wiOjM4LFwiLi91dGlscy9ldmVudHNcIjo0MCxcIi4vdXRpbHMvaW50ZXJhY3Rpb25GaW5kZXJcIjo0NX1dLDY6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgSW50ZXJhY3Rpb24gPSByZXF1aXJlKCcuLi9JbnRlcmFjdGlvbicpO1xudmFyIEludGVyYWN0RXZlbnQgPSByZXF1aXJlKCcuLi9JbnRlcmFjdEV2ZW50Jyk7XG5cbnZhciBhY3Rpb25zID0ge1xuICBmaXJlUHJlcGFyZWQ6IGZpcmVQcmVwYXJlZCxcbiAgbmFtZXM6IFtdLFxuICBtZXRob2REaWN0OiB7fVxufTtcblxuSW50ZXJhY3Rpb24uc2lnbmFscy5vbignYWN0aW9uLXN0YXJ0JywgZnVuY3Rpb24gKF9yZWYpIHtcbiAgdmFyIGludGVyYWN0aW9uID0gX3JlZi5pbnRlcmFjdGlvbixcbiAgICAgIGV2ZW50ID0gX3JlZi5ldmVudDtcblxuICBpbnRlcmFjdGlvbi5faW50ZXJhY3RpbmcgPSB0cnVlO1xuICBmaXJlUHJlcGFyZWQoaW50ZXJhY3Rpb24sIGV2ZW50LCAnc3RhcnQnKTtcbn0pO1xuXG5JbnRlcmFjdGlvbi5zaWduYWxzLm9uKCdhY3Rpb24tbW92ZScsIGZ1bmN0aW9uIChfcmVmMikge1xuICB2YXIgaW50ZXJhY3Rpb24gPSBfcmVmMi5pbnRlcmFjdGlvbixcbiAgICAgIGV2ZW50ID0gX3JlZjIuZXZlbnQsXG4gICAgICBwcmVFbmQgPSBfcmVmMi5wcmVFbmQ7XG5cbiAgZmlyZVByZXBhcmVkKGludGVyYWN0aW9uLCBldmVudCwgJ21vdmUnLCBwcmVFbmQpO1xuXG4gIC8vIGlmIHRoZSBhY3Rpb24gd2FzIGVuZGVkIGluIGEgbGlzdGVuZXJcbiAgaWYgKCFpbnRlcmFjdGlvbi5pbnRlcmFjdGluZygpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59KTtcblxuSW50ZXJhY3Rpb24uc2lnbmFscy5vbignYWN0aW9uLWVuZCcsIGZ1bmN0aW9uIChfcmVmMykge1xuICB2YXIgaW50ZXJhY3Rpb24gPSBfcmVmMy5pbnRlcmFjdGlvbixcbiAgICAgIGV2ZW50ID0gX3JlZjMuZXZlbnQ7XG5cbiAgZmlyZVByZXBhcmVkKGludGVyYWN0aW9uLCBldmVudCwgJ2VuZCcpO1xufSk7XG5cbmZ1bmN0aW9uIGZpcmVQcmVwYXJlZChpbnRlcmFjdGlvbiwgZXZlbnQsIHBoYXNlLCBwcmVFbmQpIHtcbiAgdmFyIGFjdGlvbk5hbWUgPSBpbnRlcmFjdGlvbi5wcmVwYXJlZC5uYW1lO1xuXG4gIHZhciBuZXdFdmVudCA9IG5ldyBJbnRlcmFjdEV2ZW50KGludGVyYWN0aW9uLCBldmVudCwgYWN0aW9uTmFtZSwgcGhhc2UsIGludGVyYWN0aW9uLmVsZW1lbnQsIG51bGwsIHByZUVuZCk7XG5cbiAgaW50ZXJhY3Rpb24udGFyZ2V0LmZpcmUobmV3RXZlbnQpO1xuICBpbnRlcmFjdGlvbi5wcmV2RXZlbnQgPSBuZXdFdmVudDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBhY3Rpb25zO1xuXG59LHtcIi4uL0ludGVyYWN0RXZlbnRcIjozLFwiLi4vSW50ZXJhY3Rpb25cIjo1fV0sNzpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4ndXNlIHN0cmljdCc7XG5cbnZhciBhY3Rpb25zID0gcmVxdWlyZSgnLi9iYXNlJyk7XG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpO1xudmFyIEludGVyYWN0RXZlbnQgPSByZXF1aXJlKCcuLi9JbnRlcmFjdEV2ZW50Jyk7XG4vKiogQGxlbmRzIEludGVyYWN0YWJsZSAqL1xudmFyIEludGVyYWN0YWJsZSA9IHJlcXVpcmUoJy4uL0ludGVyYWN0YWJsZScpO1xudmFyIEludGVyYWN0aW9uID0gcmVxdWlyZSgnLi4vSW50ZXJhY3Rpb24nKTtcbnZhciBkZWZhdWx0T3B0aW9ucyA9IHJlcXVpcmUoJy4uL2RlZmF1bHRPcHRpb25zJyk7XG5cbnZhciBkcmFnID0ge1xuICBkZWZhdWx0czoge1xuICAgIGVuYWJsZWQ6IGZhbHNlLFxuICAgIG1vdXNlQnV0dG9uczogbnVsbCxcblxuICAgIG9yaWdpbjogbnVsbCxcbiAgICBzbmFwOiBudWxsLFxuICAgIHJlc3RyaWN0OiBudWxsLFxuICAgIGluZXJ0aWE6IG51bGwsXG4gICAgYXV0b1Njcm9sbDogbnVsbCxcblxuICAgIHN0YXJ0QXhpczogJ3h5JyxcbiAgICBsb2NrQXhpczogJ3h5J1xuICB9LFxuXG4gIGNoZWNrZXI6IGZ1bmN0aW9uIGNoZWNrZXIocG9pbnRlciwgZXZlbnQsIGludGVyYWN0YWJsZSkge1xuICAgIHZhciBkcmFnT3B0aW9ucyA9IGludGVyYWN0YWJsZS5vcHRpb25zLmRyYWc7XG5cbiAgICByZXR1cm4gZHJhZ09wdGlvbnMuZW5hYmxlZCA/IHsgbmFtZTogJ2RyYWcnLCBheGlzOiBkcmFnT3B0aW9ucy5sb2NrQXhpcyA9PT0gJ3N0YXJ0JyA/IGRyYWdPcHRpb25zLnN0YXJ0QXhpcyA6IGRyYWdPcHRpb25zLmxvY2tBeGlzIH0gOiBudWxsO1xuICB9LFxuXG4gIGdldEN1cnNvcjogZnVuY3Rpb24gZ2V0Q3Vyc29yKCkge1xuICAgIHJldHVybiAnbW92ZSc7XG4gIH1cbn07XG5cbkludGVyYWN0aW9uLnNpZ25hbHMub24oJ2JlZm9yZS1hY3Rpb24tbW92ZScsIGZ1bmN0aW9uIChfcmVmKSB7XG4gIHZhciBpbnRlcmFjdGlvbiA9IF9yZWYuaW50ZXJhY3Rpb247XG5cbiAgaWYgKGludGVyYWN0aW9uLnByZXBhcmVkLm5hbWUgIT09ICdkcmFnJykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHZhciBheGlzID0gaW50ZXJhY3Rpb24ucHJlcGFyZWQuYXhpcztcblxuICBpZiAoYXhpcyA9PT0gJ3gnKSB7XG4gICAgaW50ZXJhY3Rpb24uY3VyQ29vcmRzLnBhZ2UueSA9IGludGVyYWN0aW9uLnN0YXJ0Q29vcmRzLnBhZ2UueTtcbiAgICBpbnRlcmFjdGlvbi5jdXJDb29yZHMuY2xpZW50LnkgPSBpbnRlcmFjdGlvbi5zdGFydENvb3Jkcy5jbGllbnQueTtcblxuICAgIGludGVyYWN0aW9uLnBvaW50ZXJEZWx0YS5wYWdlLnNwZWVkID0gTWF0aC5hYnMoaW50ZXJhY3Rpb24ucG9pbnRlckRlbHRhLnBhZ2UudngpO1xuICAgIGludGVyYWN0aW9uLnBvaW50ZXJEZWx0YS5jbGllbnQuc3BlZWQgPSBNYXRoLmFicyhpbnRlcmFjdGlvbi5wb2ludGVyRGVsdGEuY2xpZW50LnZ4KTtcbiAgICBpbnRlcmFjdGlvbi5wb2ludGVyRGVsdGEuY2xpZW50LnZ5ID0gMDtcbiAgICBpbnRlcmFjdGlvbi5wb2ludGVyRGVsdGEucGFnZS52eSA9IDA7XG4gIH0gZWxzZSBpZiAoYXhpcyA9PT0gJ3knKSB7XG4gICAgaW50ZXJhY3Rpb24uY3VyQ29vcmRzLnBhZ2UueCA9IGludGVyYWN0aW9uLnN0YXJ0Q29vcmRzLnBhZ2UueDtcbiAgICBpbnRlcmFjdGlvbi5jdXJDb29yZHMuY2xpZW50LnggPSBpbnRlcmFjdGlvbi5zdGFydENvb3Jkcy5jbGllbnQueDtcblxuICAgIGludGVyYWN0aW9uLnBvaW50ZXJEZWx0YS5wYWdlLnNwZWVkID0gTWF0aC5hYnMoaW50ZXJhY3Rpb24ucG9pbnRlckRlbHRhLnBhZ2UudnkpO1xuICAgIGludGVyYWN0aW9uLnBvaW50ZXJEZWx0YS5jbGllbnQuc3BlZWQgPSBNYXRoLmFicyhpbnRlcmFjdGlvbi5wb2ludGVyRGVsdGEuY2xpZW50LnZ5KTtcbiAgICBpbnRlcmFjdGlvbi5wb2ludGVyRGVsdGEuY2xpZW50LnZ4ID0gMDtcbiAgICBpbnRlcmFjdGlvbi5wb2ludGVyRGVsdGEucGFnZS52eCA9IDA7XG4gIH1cbn0pO1xuXG4vLyBkcmFnbW92ZVxuSW50ZXJhY3RFdmVudC5zaWduYWxzLm9uKCduZXcnLCBmdW5jdGlvbiAoX3JlZjIpIHtcbiAgdmFyIGlFdmVudCA9IF9yZWYyLmlFdmVudCxcbiAgICAgIGludGVyYWN0aW9uID0gX3JlZjIuaW50ZXJhY3Rpb247XG5cbiAgaWYgKGlFdmVudC50eXBlICE9PSAnZHJhZ21vdmUnKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyIGF4aXMgPSBpbnRlcmFjdGlvbi5wcmVwYXJlZC5heGlzO1xuXG4gIGlmIChheGlzID09PSAneCcpIHtcbiAgICBpRXZlbnQucGFnZVkgPSBpbnRlcmFjdGlvbi5zdGFydENvb3Jkcy5wYWdlLnk7XG4gICAgaUV2ZW50LmNsaWVudFkgPSBpbnRlcmFjdGlvbi5zdGFydENvb3Jkcy5jbGllbnQueTtcbiAgICBpRXZlbnQuZHkgPSAwO1xuICB9IGVsc2UgaWYgKGF4aXMgPT09ICd5Jykge1xuICAgIGlFdmVudC5wYWdlWCA9IGludGVyYWN0aW9uLnN0YXJ0Q29vcmRzLnBhZ2UueDtcbiAgICBpRXZlbnQuY2xpZW50WCA9IGludGVyYWN0aW9uLnN0YXJ0Q29vcmRzLmNsaWVudC54O1xuICAgIGlFdmVudC5keCA9IDA7XG4gIH1cbn0pO1xuXG4vKipcbiAqIGBgYGpzXG4gKiBpbnRlcmFjdChlbGVtZW50KS5kcmFnZ2FibGUoe1xuICogICAgIG9uc3RhcnQ6IGZ1bmN0aW9uIChldmVudCkge30sXG4gKiAgICAgb25tb3ZlIDogZnVuY3Rpb24gKGV2ZW50KSB7fSxcbiAqICAgICBvbmVuZCAgOiBmdW5jdGlvbiAoZXZlbnQpIHt9LFxuICpcbiAqICAgICAvLyB0aGUgYXhpcyBpbiB3aGljaCB0aGUgZmlyc3QgbW92ZW1lbnQgbXVzdCBiZVxuICogICAgIC8vIGZvciB0aGUgZHJhZyBzZXF1ZW5jZSB0byBzdGFydFxuICogICAgIC8vICd4eScgYnkgZGVmYXVsdCAtIGFueSBkaXJlY3Rpb25cbiAqICAgICBzdGFydEF4aXM6ICd4JyB8fCAneScgfHwgJ3h5JyxcbiAqXG4gKiAgICAgLy8gJ3h5JyBieSBkZWZhdWx0IC0gZG9uJ3QgcmVzdHJpY3QgdG8gb25lIGF4aXMgKG1vdmUgaW4gYW55IGRpcmVjdGlvbilcbiAqICAgICAvLyAneCcgb3IgJ3knIHRvIHJlc3RyaWN0IG1vdmVtZW50IHRvIGVpdGhlciBheGlzXG4gKiAgICAgLy8gJ3N0YXJ0JyB0byByZXN0cmljdCBtb3ZlbWVudCB0byB0aGUgYXhpcyB0aGUgZHJhZyBzdGFydGVkIGluXG4gKiAgICAgbG9ja0F4aXM6ICd4JyB8fCAneScgfHwgJ3h5JyB8fCAnc3RhcnQnLFxuICpcbiAqICAgICAvLyBtYXggbnVtYmVyIG9mIGRyYWdzIHRoYXQgY2FuIGhhcHBlbiBjb25jdXJyZW50bHlcbiAqICAgICAvLyB3aXRoIGVsZW1lbnRzIG9mIHRoaXMgSW50ZXJhY3RhYmxlLiBJbmZpbml0eSBieSBkZWZhdWx0XG4gKiAgICAgbWF4OiBJbmZpbml0eSxcbiAqXG4gKiAgICAgLy8gbWF4IG51bWJlciBvZiBkcmFncyB0aGF0IGNhbiB0YXJnZXQgdGhlIHNhbWUgZWxlbWVudCtJbnRlcmFjdGFibGVcbiAqICAgICAvLyAxIGJ5IGRlZmF1bHRcbiAqICAgICBtYXhQZXJFbGVtZW50OiAyXG4gKiB9KTtcbiAqXG4gKiB2YXIgaXNEcmFnZ2FibGUgPSBpbnRlcmFjdCgnZWxlbWVudCcpLmRyYWdnYWJsZSgpOyAvLyB0cnVlXG4gKiBgYGBcbiAqXG4gKiBHZXQgb3Igc2V0IHdoZXRoZXIgZHJhZyBhY3Rpb25zIGNhbiBiZSBwZXJmb3JtZWQgb24gdGhlIHRhcmdldFxuICpcbiAqIEBwYXJhbSB7Ym9vbGVhbiB8IG9iamVjdH0gW29wdGlvbnNdIHRydWUvZmFsc2Ugb3IgQW4gb2JqZWN0IHdpdGggZXZlbnRcbiAqIGxpc3RlbmVycyB0byBiZSBmaXJlZCBvbiBkcmFnIGV2ZW50cyAob2JqZWN0IG1ha2VzIHRoZSBJbnRlcmFjdGFibGVcbiAqIGRyYWdnYWJsZSlcbiAqIEByZXR1cm4ge2Jvb2xlYW4gfCBJbnRlcmFjdGFibGV9IGJvb2xlYW4gaW5kaWNhdGluZyBpZiB0aGlzIGNhbiBiZSB0aGVcbiAqIHRhcmdldCBvZiBkcmFnIGV2ZW50cywgb3IgdGhpcyBJbnRlcmN0YWJsZVxuICovXG5JbnRlcmFjdGFibGUucHJvdG90eXBlLmRyYWdnYWJsZSA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gIGlmICh1dGlscy5pcy5vYmplY3Qob3B0aW9ucykpIHtcbiAgICB0aGlzLm9wdGlvbnMuZHJhZy5lbmFibGVkID0gb3B0aW9ucy5lbmFibGVkID09PSBmYWxzZSA/IGZhbHNlIDogdHJ1ZTtcbiAgICB0aGlzLnNldFBlckFjdGlvbignZHJhZycsIG9wdGlvbnMpO1xuICAgIHRoaXMuc2V0T25FdmVudHMoJ2RyYWcnLCBvcHRpb25zKTtcblxuICAgIGlmICgvXih4eXx4fHl8c3RhcnQpJC8udGVzdChvcHRpb25zLmxvY2tBeGlzKSkge1xuICAgICAgdGhpcy5vcHRpb25zLmRyYWcubG9ja0F4aXMgPSBvcHRpb25zLmxvY2tBeGlzO1xuICAgIH1cbiAgICBpZiAoL14oeHl8eHx5KSQvLnRlc3Qob3B0aW9ucy5zdGFydEF4aXMpKSB7XG4gICAgICB0aGlzLm9wdGlvbnMuZHJhZy5zdGFydEF4aXMgPSBvcHRpb25zLnN0YXJ0QXhpcztcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGlmICh1dGlscy5pcy5ib29sKG9wdGlvbnMpKSB7XG4gICAgdGhpcy5vcHRpb25zLmRyYWcuZW5hYmxlZCA9IG9wdGlvbnM7XG5cbiAgICBpZiAoIW9wdGlvbnMpIHtcbiAgICAgIHRoaXMub25kcmFnc3RhcnQgPSB0aGlzLm9uZHJhZ3N0YXJ0ID0gdGhpcy5vbmRyYWdlbmQgPSBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgcmV0dXJuIHRoaXMub3B0aW9ucy5kcmFnO1xufTtcblxuYWN0aW9ucy5kcmFnID0gZHJhZztcbmFjdGlvbnMubmFtZXMucHVzaCgnZHJhZycpO1xudXRpbHMubWVyZ2UoSW50ZXJhY3RhYmxlLmV2ZW50VHlwZXMsIFsnZHJhZ3N0YXJ0JywgJ2RyYWdtb3ZlJywgJ2RyYWdpbmVydGlhc3RhcnQnLCAnZHJhZ2luZXJ0aWFyZXN1bWUnLCAnZHJhZ2VuZCddKTtcbmFjdGlvbnMubWV0aG9kRGljdC5kcmFnID0gJ2RyYWdnYWJsZSc7XG5cbmRlZmF1bHRPcHRpb25zLmRyYWcgPSBkcmFnLmRlZmF1bHRzO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGRyYWc7XG5cbn0se1wiLi4vSW50ZXJhY3RFdmVudFwiOjMsXCIuLi9JbnRlcmFjdGFibGVcIjo0LFwiLi4vSW50ZXJhY3Rpb25cIjo1LFwiLi4vZGVmYXVsdE9wdGlvbnNcIjoxOCxcIi4uL3V0aWxzXCI6NDQsXCIuL2Jhc2VcIjo2fV0sODpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4ndXNlIHN0cmljdCc7XG5cbnZhciBhY3Rpb25zID0gcmVxdWlyZSgnLi9iYXNlJyk7XG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpO1xudmFyIHNjb3BlID0gcmVxdWlyZSgnLi4vc2NvcGUnKTtcbi8qKiBAbGVuZHMgbW9kdWxlOmludGVyYWN0ICovXG52YXIgaW50ZXJhY3QgPSByZXF1aXJlKCcuLi9pbnRlcmFjdCcpO1xudmFyIEludGVyYWN0RXZlbnQgPSByZXF1aXJlKCcuLi9JbnRlcmFjdEV2ZW50Jyk7XG4vKiogQGxlbmRzIEludGVyYWN0YWJsZSAqL1xudmFyIEludGVyYWN0YWJsZSA9IHJlcXVpcmUoJy4uL0ludGVyYWN0YWJsZScpO1xudmFyIEludGVyYWN0aW9uID0gcmVxdWlyZSgnLi4vSW50ZXJhY3Rpb24nKTtcbnZhciBkZWZhdWx0T3B0aW9ucyA9IHJlcXVpcmUoJy4uL2RlZmF1bHRPcHRpb25zJyk7XG5cbnZhciBkcm9wID0ge1xuICBkZWZhdWx0czoge1xuICAgIGVuYWJsZWQ6IGZhbHNlLFxuICAgIGFjY2VwdDogbnVsbCxcbiAgICBvdmVybGFwOiAncG9pbnRlcidcbiAgfVxufTtcblxudmFyIGR5bmFtaWNEcm9wID0gZmFsc2U7XG5cbkludGVyYWN0aW9uLnNpZ25hbHMub24oJ2FjdGlvbi1zdGFydCcsIGZ1bmN0aW9uIChfcmVmKSB7XG4gIHZhciBpbnRlcmFjdGlvbiA9IF9yZWYuaW50ZXJhY3Rpb24sXG4gICAgICBldmVudCA9IF9yZWYuZXZlbnQ7XG5cbiAgaWYgKGludGVyYWN0aW9uLnByZXBhcmVkLm5hbWUgIT09ICdkcmFnJykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIHJlc2V0IGFjdGl2ZSBkcm9wem9uZXNcbiAgaW50ZXJhY3Rpb24uYWN0aXZlRHJvcHMuZHJvcHpvbmVzID0gW107XG4gIGludGVyYWN0aW9uLmFjdGl2ZURyb3BzLmVsZW1lbnRzID0gW107XG4gIGludGVyYWN0aW9uLmFjdGl2ZURyb3BzLnJlY3RzID0gW107XG5cbiAgaW50ZXJhY3Rpb24uZHJvcEV2ZW50cyA9IG51bGw7XG5cbiAgaWYgKCFpbnRlcmFjdGlvbi5keW5hbWljRHJvcCkge1xuICAgIHNldEFjdGl2ZURyb3BzKGludGVyYWN0aW9uLmFjdGl2ZURyb3BzLCBpbnRlcmFjdGlvbi5lbGVtZW50KTtcbiAgfVxuXG4gIHZhciBkcmFnRXZlbnQgPSBpbnRlcmFjdGlvbi5wcmV2RXZlbnQ7XG4gIHZhciBkcm9wRXZlbnRzID0gZ2V0RHJvcEV2ZW50cyhpbnRlcmFjdGlvbiwgZXZlbnQsIGRyYWdFdmVudCk7XG5cbiAgaWYgKGRyb3BFdmVudHMuYWN0aXZhdGUpIHtcbiAgICBmaXJlQWN0aXZlRHJvcHMoaW50ZXJhY3Rpb24uYWN0aXZlRHJvcHMsIGRyb3BFdmVudHMuYWN0aXZhdGUpO1xuICB9XG59KTtcblxuSW50ZXJhY3RFdmVudC5zaWduYWxzLm9uKCduZXcnLCBmdW5jdGlvbiAoX3JlZjIpIHtcbiAgdmFyIGludGVyYWN0aW9uID0gX3JlZjIuaW50ZXJhY3Rpb24sXG4gICAgICBpRXZlbnQgPSBfcmVmMi5pRXZlbnQsXG4gICAgICBldmVudCA9IF9yZWYyLmV2ZW50O1xuXG4gIGlmIChpRXZlbnQudHlwZSAhPT0gJ2RyYWdtb3ZlJyAmJiBpRXZlbnQudHlwZSAhPT0gJ2RyYWdlbmQnKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyIGRyYWdnYWJsZUVsZW1lbnQgPSBpbnRlcmFjdGlvbi5lbGVtZW50O1xuICB2YXIgZHJhZ0V2ZW50ID0gaUV2ZW50O1xuICB2YXIgZHJvcFJlc3VsdCA9IGdldERyb3AoZHJhZ0V2ZW50LCBldmVudCwgZHJhZ2dhYmxlRWxlbWVudCk7XG5cbiAgaW50ZXJhY3Rpb24uZHJvcFRhcmdldCA9IGRyb3BSZXN1bHQuZHJvcHpvbmU7XG4gIGludGVyYWN0aW9uLmRyb3BFbGVtZW50ID0gZHJvcFJlc3VsdC5lbGVtZW50O1xuXG4gIGludGVyYWN0aW9uLmRyb3BFdmVudHMgPSBnZXREcm9wRXZlbnRzKGludGVyYWN0aW9uLCBldmVudCwgZHJhZ0V2ZW50KTtcbn0pO1xuXG5JbnRlcmFjdGlvbi5zaWduYWxzLm9uKCdhY3Rpb24tbW92ZScsIGZ1bmN0aW9uIChfcmVmMykge1xuICB2YXIgaW50ZXJhY3Rpb24gPSBfcmVmMy5pbnRlcmFjdGlvbjtcblxuICBpZiAoaW50ZXJhY3Rpb24ucHJlcGFyZWQubmFtZSAhPT0gJ2RyYWcnKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgZmlyZURyb3BFdmVudHMoaW50ZXJhY3Rpb24sIGludGVyYWN0aW9uLmRyb3BFdmVudHMpO1xufSk7XG5cbkludGVyYWN0aW9uLnNpZ25hbHMub24oJ2FjdGlvbi1lbmQnLCBmdW5jdGlvbiAoX3JlZjQpIHtcbiAgdmFyIGludGVyYWN0aW9uID0gX3JlZjQuaW50ZXJhY3Rpb247XG5cbiAgaWYgKGludGVyYWN0aW9uLnByZXBhcmVkLm5hbWUgPT09ICdkcmFnJykge1xuICAgIGZpcmVEcm9wRXZlbnRzKGludGVyYWN0aW9uLCBpbnRlcmFjdGlvbi5kcm9wRXZlbnRzKTtcbiAgfVxufSk7XG5cbkludGVyYWN0aW9uLnNpZ25hbHMub24oJ3N0b3AtZHJhZycsIGZ1bmN0aW9uIChfcmVmNSkge1xuICB2YXIgaW50ZXJhY3Rpb24gPSBfcmVmNS5pbnRlcmFjdGlvbjtcblxuICBpbnRlcmFjdGlvbi5hY3RpdmVEcm9wcyA9IHtcbiAgICBkcm9wem9uZXM6IG51bGwsXG4gICAgZWxlbWVudHM6IG51bGwsXG4gICAgcmVjdHM6IG51bGxcbiAgfTtcblxuICBpbnRlcmFjdGlvbi5kcm9wRXZlbnRzID0gbnVsbDtcbn0pO1xuXG5mdW5jdGlvbiBjb2xsZWN0RHJvcHMoYWN0aXZlRHJvcHMsIGVsZW1lbnQpIHtcbiAgdmFyIGRyb3BzID0gW107XG4gIHZhciBlbGVtZW50cyA9IFtdO1xuXG4gIC8vIGNvbGxlY3QgYWxsIGRyb3B6b25lcyBhbmQgdGhlaXIgZWxlbWVudHMgd2hpY2ggcXVhbGlmeSBmb3IgYSBkcm9wXG4gIGZvciAodmFyIF9pID0gMDsgX2kgPCBzY29wZS5pbnRlcmFjdGFibGVzLmxlbmd0aDsgX2krKykge1xuICAgIHZhciBfcmVmNjtcblxuICAgIF9yZWY2ID0gc2NvcGUuaW50ZXJhY3RhYmxlc1tfaV07XG4gICAgdmFyIGN1cnJlbnQgPSBfcmVmNjtcblxuICAgIGlmICghY3VycmVudC5vcHRpb25zLmRyb3AuZW5hYmxlZCkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgdmFyIGFjY2VwdCA9IGN1cnJlbnQub3B0aW9ucy5kcm9wLmFjY2VwdDtcblxuICAgIC8vIHRlc3QgdGhlIGRyYWdnYWJsZSBlbGVtZW50IGFnYWluc3QgdGhlIGRyb3B6b25lJ3MgYWNjZXB0IHNldHRpbmdcbiAgICBpZiAodXRpbHMuaXMuZWxlbWVudChhY2NlcHQpICYmIGFjY2VwdCAhPT0gZWxlbWVudCB8fCB1dGlscy5pcy5zdHJpbmcoYWNjZXB0KSAmJiAhdXRpbHMubWF0Y2hlc1NlbGVjdG9yKGVsZW1lbnQsIGFjY2VwdCkpIHtcblxuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLy8gcXVlcnkgZm9yIG5ldyBlbGVtZW50cyBpZiBuZWNlc3NhcnlcbiAgICB2YXIgZHJvcEVsZW1lbnRzID0gdXRpbHMuaXMuc3RyaW5nKGN1cnJlbnQudGFyZ2V0KSA/IGN1cnJlbnQuX2NvbnRleHQucXVlcnlTZWxlY3RvckFsbChjdXJyZW50LnRhcmdldCkgOiBbY3VycmVudC50YXJnZXRdO1xuXG4gICAgZm9yICh2YXIgX2kyID0gMDsgX2kyIDwgZHJvcEVsZW1lbnRzLmxlbmd0aDsgX2kyKyspIHtcbiAgICAgIHZhciBfcmVmNztcblxuICAgICAgX3JlZjcgPSBkcm9wRWxlbWVudHNbX2kyXTtcbiAgICAgIHZhciBjdXJyZW50RWxlbWVudCA9IF9yZWY3O1xuXG4gICAgICBpZiAoY3VycmVudEVsZW1lbnQgIT09IGVsZW1lbnQpIHtcbiAgICAgICAgZHJvcHMucHVzaChjdXJyZW50KTtcbiAgICAgICAgZWxlbWVudHMucHVzaChjdXJyZW50RWxlbWVudCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBlbGVtZW50czogZWxlbWVudHMsXG4gICAgZHJvcHpvbmVzOiBkcm9wc1xuICB9O1xufVxuXG5mdW5jdGlvbiBmaXJlQWN0aXZlRHJvcHMoYWN0aXZlRHJvcHMsIGV2ZW50KSB7XG4gIHZhciBwcmV2RWxlbWVudCA9IHZvaWQgMDtcblxuICAvLyBsb29wIHRocm91Z2ggYWxsIGFjdGl2ZSBkcm9wem9uZXMgYW5kIHRyaWdnZXIgZXZlbnRcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBhY3RpdmVEcm9wcy5kcm9wem9uZXMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgY3VycmVudCA9IGFjdGl2ZURyb3BzLmRyb3B6b25lc1tpXTtcbiAgICB2YXIgY3VycmVudEVsZW1lbnQgPSBhY3RpdmVEcm9wcy5lbGVtZW50c1tpXTtcblxuICAgIC8vIHByZXZlbnQgdHJpZ2dlciBvZiBkdXBsaWNhdGUgZXZlbnRzIG9uIHNhbWUgZWxlbWVudFxuICAgIGlmIChjdXJyZW50RWxlbWVudCAhPT0gcHJldkVsZW1lbnQpIHtcbiAgICAgIC8vIHNldCBjdXJyZW50IGVsZW1lbnQgYXMgZXZlbnQgdGFyZ2V0XG4gICAgICBldmVudC50YXJnZXQgPSBjdXJyZW50RWxlbWVudDtcbiAgICAgIGN1cnJlbnQuZmlyZShldmVudCk7XG4gICAgfVxuICAgIHByZXZFbGVtZW50ID0gY3VycmVudEVsZW1lbnQ7XG4gIH1cbn1cblxuLy8gQ29sbGVjdCBhIG5ldyBzZXQgb2YgcG9zc2libGUgZHJvcHMgYW5kIHNhdmUgdGhlbSBpbiBhY3RpdmVEcm9wcy5cbi8vIHNldEFjdGl2ZURyb3BzIHNob3VsZCBhbHdheXMgYmUgY2FsbGVkIHdoZW4gYSBkcmFnIGhhcyBqdXN0IHN0YXJ0ZWQgb3IgYVxuLy8gZHJhZyBldmVudCBoYXBwZW5zIHdoaWxlIGR5bmFtaWNEcm9wIGlzIHRydWVcbmZ1bmN0aW9uIHNldEFjdGl2ZURyb3BzKGFjdGl2ZURyb3BzLCBkcmFnRWxlbWVudCkge1xuICAvLyBnZXQgZHJvcHpvbmVzIGFuZCB0aGVpciBlbGVtZW50cyB0aGF0IGNvdWxkIHJlY2VpdmUgdGhlIGRyYWdnYWJsZVxuICB2YXIgcG9zc2libGVEcm9wcyA9IGNvbGxlY3REcm9wcyhhY3RpdmVEcm9wcywgZHJhZ0VsZW1lbnQpO1xuXG4gIGFjdGl2ZURyb3BzLmRyb3B6b25lcyA9IHBvc3NpYmxlRHJvcHMuZHJvcHpvbmVzO1xuICBhY3RpdmVEcm9wcy5lbGVtZW50cyA9IHBvc3NpYmxlRHJvcHMuZWxlbWVudHM7XG4gIGFjdGl2ZURyb3BzLnJlY3RzID0gW107XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBhY3RpdmVEcm9wcy5kcm9wem9uZXMubGVuZ3RoOyBpKyspIHtcbiAgICBhY3RpdmVEcm9wcy5yZWN0c1tpXSA9IGFjdGl2ZURyb3BzLmRyb3B6b25lc1tpXS5nZXRSZWN0KGFjdGl2ZURyb3BzLmVsZW1lbnRzW2ldKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXREcm9wKGRyYWdFdmVudCwgZXZlbnQsIGRyYWdFbGVtZW50KSB7XG4gIHZhciBpbnRlcmFjdGlvbiA9IGRyYWdFdmVudC5pbnRlcmFjdGlvbjtcbiAgdmFyIHZhbGlkRHJvcHMgPSBbXTtcblxuICBpZiAoZHluYW1pY0Ryb3ApIHtcbiAgICBzZXRBY3RpdmVEcm9wcyhpbnRlcmFjdGlvbi5hY3RpdmVEcm9wcywgZHJhZ0VsZW1lbnQpO1xuICB9XG5cbiAgLy8gY29sbGVjdCBhbGwgZHJvcHpvbmVzIGFuZCB0aGVpciBlbGVtZW50cyB3aGljaCBxdWFsaWZ5IGZvciBhIGRyb3BcbiAgZm9yICh2YXIgaiA9IDA7IGogPCBpbnRlcmFjdGlvbi5hY3RpdmVEcm9wcy5kcm9wem9uZXMubGVuZ3RoOyBqKyspIHtcbiAgICB2YXIgY3VycmVudCA9IGludGVyYWN0aW9uLmFjdGl2ZURyb3BzLmRyb3B6b25lc1tqXTtcbiAgICB2YXIgY3VycmVudEVsZW1lbnQgPSBpbnRlcmFjdGlvbi5hY3RpdmVEcm9wcy5lbGVtZW50c1tqXTtcbiAgICB2YXIgcmVjdCA9IGludGVyYWN0aW9uLmFjdGl2ZURyb3BzLnJlY3RzW2pdO1xuXG4gICAgdmFsaWREcm9wcy5wdXNoKGN1cnJlbnQuZHJvcENoZWNrKGRyYWdFdmVudCwgZXZlbnQsIGludGVyYWN0aW9uLnRhcmdldCwgZHJhZ0VsZW1lbnQsIGN1cnJlbnRFbGVtZW50LCByZWN0KSA/IGN1cnJlbnRFbGVtZW50IDogbnVsbCk7XG4gIH1cblxuICAvLyBnZXQgdGhlIG1vc3QgYXBwcm9wcmlhdGUgZHJvcHpvbmUgYmFzZWQgb24gRE9NIGRlcHRoIGFuZCBvcmRlclxuICB2YXIgZHJvcEluZGV4ID0gdXRpbHMuaW5kZXhPZkRlZXBlc3RFbGVtZW50KHZhbGlkRHJvcHMpO1xuXG4gIHJldHVybiB7XG4gICAgZHJvcHpvbmU6IGludGVyYWN0aW9uLmFjdGl2ZURyb3BzLmRyb3B6b25lc1tkcm9wSW5kZXhdIHx8IG51bGwsXG4gICAgZWxlbWVudDogaW50ZXJhY3Rpb24uYWN0aXZlRHJvcHMuZWxlbWVudHNbZHJvcEluZGV4XSB8fCBudWxsXG4gIH07XG59XG5cbmZ1bmN0aW9uIGdldERyb3BFdmVudHMoaW50ZXJhY3Rpb24sIHBvaW50ZXJFdmVudCwgZHJhZ0V2ZW50KSB7XG4gIHZhciBkcm9wRXZlbnRzID0ge1xuICAgIGVudGVyOiBudWxsLFxuICAgIGxlYXZlOiBudWxsLFxuICAgIGFjdGl2YXRlOiBudWxsLFxuICAgIGRlYWN0aXZhdGU6IG51bGwsXG4gICAgbW92ZTogbnVsbCxcbiAgICBkcm9wOiBudWxsXG4gIH07XG5cbiAgdmFyIHRtcGwgPSB7XG4gICAgZHJhZ0V2ZW50OiBkcmFnRXZlbnQsXG4gICAgaW50ZXJhY3Rpb246IGludGVyYWN0aW9uLFxuICAgIHRhcmdldDogaW50ZXJhY3Rpb24uZHJvcEVsZW1lbnQsXG4gICAgZHJvcHpvbmU6IGludGVyYWN0aW9uLmRyb3BUYXJnZXQsXG4gICAgcmVsYXRlZFRhcmdldDogZHJhZ0V2ZW50LnRhcmdldCxcbiAgICBkcmFnZ2FibGU6IGRyYWdFdmVudC5pbnRlcmFjdGFibGUsXG4gICAgdGltZVN0YW1wOiBkcmFnRXZlbnQudGltZVN0YW1wXG4gIH07XG5cbiAgaWYgKGludGVyYWN0aW9uLmRyb3BFbGVtZW50ICE9PSBpbnRlcmFjdGlvbi5wcmV2RHJvcEVsZW1lbnQpIHtcbiAgICAvLyBpZiB0aGVyZSB3YXMgYSBwcmV2RHJvcFRhcmdldCwgY3JlYXRlIGEgZHJhZ2xlYXZlIGV2ZW50XG4gICAgaWYgKGludGVyYWN0aW9uLnByZXZEcm9wVGFyZ2V0KSB7XG4gICAgICBkcm9wRXZlbnRzLmxlYXZlID0gdXRpbHMuZXh0ZW5kKHsgdHlwZTogJ2RyYWdsZWF2ZScgfSwgdG1wbCk7XG5cbiAgICAgIGRyYWdFdmVudC5kcmFnTGVhdmUgPSBkcm9wRXZlbnRzLmxlYXZlLnRhcmdldCA9IGludGVyYWN0aW9uLnByZXZEcm9wRWxlbWVudDtcbiAgICAgIGRyYWdFdmVudC5wcmV2RHJvcHpvbmUgPSBkcm9wRXZlbnRzLmxlYXZlLmRyb3B6b25lID0gaW50ZXJhY3Rpb24ucHJldkRyb3BUYXJnZXQ7XG4gICAgfVxuICAgIC8vIGlmIHRoZSBkcm9wVGFyZ2V0IGlzIG5vdCBudWxsLCBjcmVhdGUgYSBkcmFnZW50ZXIgZXZlbnRcbiAgICBpZiAoaW50ZXJhY3Rpb24uZHJvcFRhcmdldCkge1xuICAgICAgZHJvcEV2ZW50cy5lbnRlciA9IHtcbiAgICAgICAgZHJhZ0V2ZW50OiBkcmFnRXZlbnQsXG4gICAgICAgIGludGVyYWN0aW9uOiBpbnRlcmFjdGlvbixcbiAgICAgICAgdGFyZ2V0OiBpbnRlcmFjdGlvbi5kcm9wRWxlbWVudCxcbiAgICAgICAgZHJvcHpvbmU6IGludGVyYWN0aW9uLmRyb3BUYXJnZXQsXG4gICAgICAgIHJlbGF0ZWRUYXJnZXQ6IGRyYWdFdmVudC50YXJnZXQsXG4gICAgICAgIGRyYWdnYWJsZTogZHJhZ0V2ZW50LmludGVyYWN0YWJsZSxcbiAgICAgICAgdGltZVN0YW1wOiBkcmFnRXZlbnQudGltZVN0YW1wLFxuICAgICAgICB0eXBlOiAnZHJhZ2VudGVyJ1xuICAgICAgfTtcblxuICAgICAgZHJhZ0V2ZW50LmRyYWdFbnRlciA9IGludGVyYWN0aW9uLmRyb3BFbGVtZW50O1xuICAgICAgZHJhZ0V2ZW50LmRyb3B6b25lID0gaW50ZXJhY3Rpb24uZHJvcFRhcmdldDtcbiAgICB9XG4gIH1cblxuICBpZiAoZHJhZ0V2ZW50LnR5cGUgPT09ICdkcmFnZW5kJyAmJiBpbnRlcmFjdGlvbi5kcm9wVGFyZ2V0KSB7XG4gICAgZHJvcEV2ZW50cy5kcm9wID0gdXRpbHMuZXh0ZW5kKHsgdHlwZTogJ2Ryb3AnIH0sIHRtcGwpO1xuXG4gICAgZHJhZ0V2ZW50LmRyb3B6b25lID0gaW50ZXJhY3Rpb24uZHJvcFRhcmdldDtcbiAgICBkcmFnRXZlbnQucmVsYXRlZFRhcmdldCA9IGludGVyYWN0aW9uLmRyb3BFbGVtZW50O1xuICB9XG4gIGlmIChkcmFnRXZlbnQudHlwZSA9PT0gJ2RyYWdzdGFydCcpIHtcbiAgICBkcm9wRXZlbnRzLmFjdGl2YXRlID0gdXRpbHMuZXh0ZW5kKHsgdHlwZTogJ2Ryb3BhY3RpdmF0ZScgfSwgdG1wbCk7XG5cbiAgICBkcm9wRXZlbnRzLmFjdGl2YXRlLnRhcmdldCA9IG51bGw7XG4gICAgZHJvcEV2ZW50cy5hY3RpdmF0ZS5kcm9wem9uZSA9IG51bGw7XG4gIH1cbiAgaWYgKGRyYWdFdmVudC50eXBlID09PSAnZHJhZ2VuZCcpIHtcbiAgICBkcm9wRXZlbnRzLmRlYWN0aXZhdGUgPSB1dGlscy5leHRlbmQoeyB0eXBlOiAnZHJvcGRlYWN0aXZhdGUnIH0sIHRtcGwpO1xuXG4gICAgZHJvcEV2ZW50cy5kZWFjdGl2YXRlLnRhcmdldCA9IG51bGw7XG4gICAgZHJvcEV2ZW50cy5kZWFjdGl2YXRlLmRyb3B6b25lID0gbnVsbDtcbiAgfVxuICBpZiAoZHJhZ0V2ZW50LnR5cGUgPT09ICdkcmFnbW92ZScgJiYgaW50ZXJhY3Rpb24uZHJvcFRhcmdldCkge1xuICAgIGRyb3BFdmVudHMubW92ZSA9IHV0aWxzLmV4dGVuZCh7XG4gICAgICBkcmFnbW92ZTogZHJhZ0V2ZW50LFxuICAgICAgdHlwZTogJ2Ryb3Btb3ZlJ1xuICAgIH0sIHRtcGwpO1xuXG4gICAgZHJhZ0V2ZW50LmRyb3B6b25lID0gaW50ZXJhY3Rpb24uZHJvcFRhcmdldDtcbiAgfVxuXG4gIHJldHVybiBkcm9wRXZlbnRzO1xufVxuXG5mdW5jdGlvbiBmaXJlRHJvcEV2ZW50cyhpbnRlcmFjdGlvbiwgZHJvcEV2ZW50cykge1xuICB2YXIgYWN0aXZlRHJvcHMgPSBpbnRlcmFjdGlvbi5hY3RpdmVEcm9wcyxcbiAgICAgIHByZXZEcm9wVGFyZ2V0ID0gaW50ZXJhY3Rpb24ucHJldkRyb3BUYXJnZXQsXG4gICAgICBkcm9wVGFyZ2V0ID0gaW50ZXJhY3Rpb24uZHJvcFRhcmdldCxcbiAgICAgIGRyb3BFbGVtZW50ID0gaW50ZXJhY3Rpb24uZHJvcEVsZW1lbnQ7XG5cblxuICBpZiAoZHJvcEV2ZW50cy5sZWF2ZSkge1xuICAgIHByZXZEcm9wVGFyZ2V0LmZpcmUoZHJvcEV2ZW50cy5sZWF2ZSk7XG4gIH1cbiAgaWYgKGRyb3BFdmVudHMubW92ZSkge1xuICAgIGRyb3BUYXJnZXQuZmlyZShkcm9wRXZlbnRzLm1vdmUpO1xuICB9XG4gIGlmIChkcm9wRXZlbnRzLmVudGVyKSB7XG4gICAgZHJvcFRhcmdldC5maXJlKGRyb3BFdmVudHMuZW50ZXIpO1xuICB9XG4gIGlmIChkcm9wRXZlbnRzLmRyb3ApIHtcbiAgICBkcm9wVGFyZ2V0LmZpcmUoZHJvcEV2ZW50cy5kcm9wKTtcbiAgfVxuICBpZiAoZHJvcEV2ZW50cy5kZWFjdGl2YXRlKSB7XG4gICAgZmlyZUFjdGl2ZURyb3BzKGFjdGl2ZURyb3BzLCBkcm9wRXZlbnRzLmRlYWN0aXZhdGUpO1xuICB9XG5cbiAgaW50ZXJhY3Rpb24ucHJldkRyb3BUYXJnZXQgPSBkcm9wVGFyZ2V0O1xuICBpbnRlcmFjdGlvbi5wcmV2RHJvcEVsZW1lbnQgPSBkcm9wRWxlbWVudDtcbn1cblxuLyoqXG4gKiBgYGBqc1xuICogaW50ZXJhY3QodGFyZ2V0KVxuICogLmRyb3BDaGVja2VyKGZ1bmN0aW9uKGRyYWdFdmVudCwgICAgICAgICAvLyByZWxhdGVkIGRyYWdtb3ZlIG9yIGRyYWdlbmQgZXZlbnRcbiAqICAgICAgICAgICAgICAgICAgICAgICBldmVudCwgICAgICAgICAgICAgLy8gVG91Y2hFdmVudC9Qb2ludGVyRXZlbnQvTW91c2VFdmVudFxuICogICAgICAgICAgICAgICAgICAgICAgIGRyb3BwZWQsICAgICAgICAgICAvLyBib29sIHJlc3VsdCBvZiB0aGUgZGVmYXVsdCBjaGVja2VyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgZHJvcHpvbmUsICAgICAgICAgIC8vIGRyb3B6b25lIEludGVyYWN0YWJsZVxuICogICAgICAgICAgICAgICAgICAgICAgIGRyb3BFbGVtZW50LCAgICAgICAvLyBkcm9wem9uZSBlbGVtbnRcbiAqICAgICAgICAgICAgICAgICAgICAgICBkcmFnZ2FibGUsICAgICAgICAgLy8gZHJhZ2dhYmxlIEludGVyYWN0YWJsZVxuICogICAgICAgICAgICAgICAgICAgICAgIGRyYWdnYWJsZUVsZW1lbnQpIHsvLyBkcmFnZ2FibGUgZWxlbWVudFxuICpcbiAqICAgcmV0dXJuIGRyb3BwZWQgJiYgZXZlbnQudGFyZ2V0Lmhhc0F0dHJpYnV0ZSgnYWxsb3ctZHJvcCcpO1xuICogfVxuICogYGBgXG4gKlxuICogYGBganNcbiAqIGludGVyYWN0KCcuZHJvcCcpLmRyb3B6b25lKHtcbiAqICAgYWNjZXB0OiAnLmNhbi1kcm9wJyB8fCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2luZ2xlLWRyb3AnKSxcbiAqICAgb3ZlcmxhcDogJ3BvaW50ZXInIHx8ICdjZW50ZXInIHx8IHplcm9Ub09uZVxuICogfVxuICogYGBgXG4gKlxuICogUmV0dXJucyBvciBzZXRzIHdoZXRoZXIgZHJhZ2dhYmxlcyBjYW4gYmUgZHJvcHBlZCBvbnRvIHRoaXMgdGFyZ2V0IHRvXG4gKiB0cmlnZ2VyIGRyb3AgZXZlbnRzXG4gKlxuICogRHJvcHpvbmVzIGNhbiByZWNlaXZlIHRoZSBmb2xsb3dpbmcgZXZlbnRzOlxuICogIC0gYGRyb3BhY3RpdmF0ZWAgYW5kIGBkcm9wZGVhY3RpdmF0ZWAgd2hlbiBhbiBhY2NlcHRhYmxlIGRyYWcgc3RhcnRzIGFuZCBlbmRzXG4gKiAgLSBgZHJhZ2VudGVyYCBhbmQgYGRyYWdsZWF2ZWAgd2hlbiBhIGRyYWdnYWJsZSBlbnRlcnMgYW5kIGxlYXZlcyB0aGUgZHJvcHpvbmVcbiAqICAtIGBkcmFnbW92ZWAgd2hlbiBhIGRyYWdnYWJsZSB0aGF0IGhhcyBlbnRlcmVkIHRoZSBkcm9wem9uZSBpcyBtb3ZlZFxuICogIC0gYGRyb3BgIHdoZW4gYSBkcmFnZ2FibGUgaXMgZHJvcHBlZCBpbnRvIHRoaXMgZHJvcHpvbmVcbiAqXG4gKiBVc2UgdGhlIGBhY2NlcHRgIG9wdGlvbiB0byBhbGxvdyBvbmx5IGVsZW1lbnRzIHRoYXQgbWF0Y2ggdGhlIGdpdmVuIENTU1xuICogc2VsZWN0b3Igb3IgZWxlbWVudC4gVGhlIHZhbHVlIGNhbiBiZTpcbiAqXG4gKiAgLSAqKmFuIEVsZW1lbnQqKiAtIG9ubHkgdGhhdCBlbGVtZW50IGNhbiBiZSBkcm9wcGVkIGludG8gdGhpcyBkcm9wem9uZS5cbiAqICAtICoqYSBzdHJpbmcqKiwgLSB0aGUgZWxlbWVudCBiZWluZyBkcmFnZ2VkIG11c3QgbWF0Y2ggaXQgYXMgYSBDU1Mgc2VsZWN0b3IuXG4gKiAgLSAqKmBudWxsYCoqIC0gYWNjZXB0IG9wdGlvbnMgaXMgY2xlYXJlZCAtIGl0IGFjY2VwdHMgYW55IGVsZW1lbnQuXG4gKlxuICogVXNlIHRoZSBgb3ZlcmxhcGAgb3B0aW9uIHRvIHNldCBob3cgZHJvcHMgYXJlIGNoZWNrZWQgZm9yLiBUaGUgYWxsb3dlZFxuICogdmFsdWVzIGFyZTpcbiAqXG4gKiAgIC0gYCdwb2ludGVyJ2AsIHRoZSBwb2ludGVyIG11c3QgYmUgb3ZlciB0aGUgZHJvcHpvbmUgKGRlZmF1bHQpXG4gKiAgIC0gYCdjZW50ZXInYCwgdGhlIGRyYWdnYWJsZSBlbGVtZW50J3MgY2VudGVyIG11c3QgYmUgb3ZlciB0aGUgZHJvcHpvbmVcbiAqICAgLSBhIG51bWJlciBmcm9tIDAtMSB3aGljaCBpcyB0aGUgYChpbnRlcnNlY3Rpb24gYXJlYSkgLyAoZHJhZ2dhYmxlIGFyZWEpYC5cbiAqICAgZS5nLiBgMC41YCBmb3IgZHJvcCB0byBoYXBwZW4gd2hlbiBoYWxmIG9mIHRoZSBhcmVhIG9mIHRoZSBkcmFnZ2FibGUgaXNcbiAqICAgb3ZlciB0aGUgZHJvcHpvbmVcbiAqXG4gKiBVc2UgdGhlIGBjaGVja2VyYCBvcHRpb24gdG8gc3BlY2lmeSBhIGZ1bmN0aW9uIHRvIGNoZWNrIGlmIGEgZHJhZ2dlZCBlbGVtZW50XG4gKiBpcyBvdmVyIHRoaXMgSW50ZXJhY3RhYmxlLlxuICpcbiAqIEBwYXJhbSB7Ym9vbGVhbiB8IG9iamVjdCB8IG51bGx9IFtvcHRpb25zXSBUaGUgbmV3IG9wdGlvbnMgdG8gYmUgc2V0LlxuICogQHJldHVybiB7Ym9vbGVhbiB8IEludGVyYWN0YWJsZX0gVGhlIGN1cnJlbnQgc2V0dGluZyBvciB0aGlzIEludGVyYWN0YWJsZVxuICovXG5JbnRlcmFjdGFibGUucHJvdG90eXBlLmRyb3B6b25lID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgaWYgKHV0aWxzLmlzLm9iamVjdChvcHRpb25zKSkge1xuICAgIHRoaXMub3B0aW9ucy5kcm9wLmVuYWJsZWQgPSBvcHRpb25zLmVuYWJsZWQgPT09IGZhbHNlID8gZmFsc2UgOiB0cnVlO1xuXG4gICAgaWYgKHV0aWxzLmlzLmZ1bmN0aW9uKG9wdGlvbnMub25kcm9wKSkge1xuICAgICAgdGhpcy5ldmVudHMub25kcm9wID0gb3B0aW9ucy5vbmRyb3A7XG4gICAgfVxuICAgIGlmICh1dGlscy5pcy5mdW5jdGlvbihvcHRpb25zLm9uZHJvcGFjdGl2YXRlKSkge1xuICAgICAgdGhpcy5ldmVudHMub25kcm9wYWN0aXZhdGUgPSBvcHRpb25zLm9uZHJvcGFjdGl2YXRlO1xuICAgIH1cbiAgICBpZiAodXRpbHMuaXMuZnVuY3Rpb24ob3B0aW9ucy5vbmRyb3BkZWFjdGl2YXRlKSkge1xuICAgICAgdGhpcy5ldmVudHMub25kcm9wZGVhY3RpdmF0ZSA9IG9wdGlvbnMub25kcm9wZGVhY3RpdmF0ZTtcbiAgICB9XG4gICAgaWYgKHV0aWxzLmlzLmZ1bmN0aW9uKG9wdGlvbnMub25kcmFnZW50ZXIpKSB7XG4gICAgICB0aGlzLmV2ZW50cy5vbmRyYWdlbnRlciA9IG9wdGlvbnMub25kcmFnZW50ZXI7XG4gICAgfVxuICAgIGlmICh1dGlscy5pcy5mdW5jdGlvbihvcHRpb25zLm9uZHJhZ2xlYXZlKSkge1xuICAgICAgdGhpcy5ldmVudHMub25kcmFnbGVhdmUgPSBvcHRpb25zLm9uZHJhZ2xlYXZlO1xuICAgIH1cbiAgICBpZiAodXRpbHMuaXMuZnVuY3Rpb24ob3B0aW9ucy5vbmRyb3Btb3ZlKSkge1xuICAgICAgdGhpcy5ldmVudHMub25kcm9wbW92ZSA9IG9wdGlvbnMub25kcm9wbW92ZTtcbiAgICB9XG5cbiAgICBpZiAoL14ocG9pbnRlcnxjZW50ZXIpJC8udGVzdChvcHRpb25zLm92ZXJsYXApKSB7XG4gICAgICB0aGlzLm9wdGlvbnMuZHJvcC5vdmVybGFwID0gb3B0aW9ucy5vdmVybGFwO1xuICAgIH0gZWxzZSBpZiAodXRpbHMuaXMubnVtYmVyKG9wdGlvbnMub3ZlcmxhcCkpIHtcbiAgICAgIHRoaXMub3B0aW9ucy5kcm9wLm92ZXJsYXAgPSBNYXRoLm1heChNYXRoLm1pbigxLCBvcHRpb25zLm92ZXJsYXApLCAwKTtcbiAgICB9XG4gICAgaWYgKCdhY2NlcHQnIGluIG9wdGlvbnMpIHtcbiAgICAgIHRoaXMub3B0aW9ucy5kcm9wLmFjY2VwdCA9IG9wdGlvbnMuYWNjZXB0O1xuICAgIH1cbiAgICBpZiAoJ2NoZWNrZXInIGluIG9wdGlvbnMpIHtcbiAgICAgIHRoaXMub3B0aW9ucy5kcm9wLmNoZWNrZXIgPSBvcHRpb25zLmNoZWNrZXI7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBpZiAodXRpbHMuaXMuYm9vbChvcHRpb25zKSkge1xuICAgIHRoaXMub3B0aW9ucy5kcm9wLmVuYWJsZWQgPSBvcHRpb25zO1xuXG4gICAgaWYgKCFvcHRpb25zKSB7XG4gICAgICB0aGlzLm9uZHJhZ2VudGVyID0gdGhpcy5vbmRyYWdsZWF2ZSA9IHRoaXMub25kcm9wID0gdGhpcy5vbmRyb3BhY3RpdmF0ZSA9IHRoaXMub25kcm9wZGVhY3RpdmF0ZSA9IG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICByZXR1cm4gdGhpcy5vcHRpb25zLmRyb3A7XG59O1xuXG5JbnRlcmFjdGFibGUucHJvdG90eXBlLmRyb3BDaGVjayA9IGZ1bmN0aW9uIChkcmFnRXZlbnQsIGV2ZW50LCBkcmFnZ2FibGUsIGRyYWdnYWJsZUVsZW1lbnQsIGRyb3BFbGVtZW50LCByZWN0KSB7XG4gIHZhciBkcm9wcGVkID0gZmFsc2U7XG5cbiAgLy8gaWYgdGhlIGRyb3B6b25lIGhhcyBubyByZWN0IChlZy4gZGlzcGxheTogbm9uZSlcbiAgLy8gY2FsbCB0aGUgY3VzdG9tIGRyb3BDaGVja2VyIG9yIGp1c3QgcmV0dXJuIGZhbHNlXG4gIGlmICghKHJlY3QgPSByZWN0IHx8IHRoaXMuZ2V0UmVjdChkcm9wRWxlbWVudCkpKSB7XG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy5kcm9wLmNoZWNrZXIgPyB0aGlzLm9wdGlvbnMuZHJvcC5jaGVja2VyKGRyYWdFdmVudCwgZXZlbnQsIGRyb3BwZWQsIHRoaXMsIGRyb3BFbGVtZW50LCBkcmFnZ2FibGUsIGRyYWdnYWJsZUVsZW1lbnQpIDogZmFsc2U7XG4gIH1cblxuICB2YXIgZHJvcE92ZXJsYXAgPSB0aGlzLm9wdGlvbnMuZHJvcC5vdmVybGFwO1xuXG4gIGlmIChkcm9wT3ZlcmxhcCA9PT0gJ3BvaW50ZXInKSB7XG4gICAgdmFyIG9yaWdpbiA9IHV0aWxzLmdldE9yaWdpblhZKGRyYWdnYWJsZSwgZHJhZ2dhYmxlRWxlbWVudCwgJ2RyYWcnKTtcbiAgICB2YXIgcGFnZSA9IHV0aWxzLmdldFBhZ2VYWShkcmFnRXZlbnQpO1xuXG4gICAgcGFnZS54ICs9IG9yaWdpbi54O1xuICAgIHBhZ2UueSArPSBvcmlnaW4ueTtcblxuICAgIHZhciBob3Jpem9udGFsID0gcGFnZS54ID4gcmVjdC5sZWZ0ICYmIHBhZ2UueCA8IHJlY3QucmlnaHQ7XG4gICAgdmFyIHZlcnRpY2FsID0gcGFnZS55ID4gcmVjdC50b3AgJiYgcGFnZS55IDwgcmVjdC5ib3R0b207XG5cbiAgICBkcm9wcGVkID0gaG9yaXpvbnRhbCAmJiB2ZXJ0aWNhbDtcbiAgfVxuXG4gIHZhciBkcmFnUmVjdCA9IGRyYWdnYWJsZS5nZXRSZWN0KGRyYWdnYWJsZUVsZW1lbnQpO1xuXG4gIGlmIChkcmFnUmVjdCAmJiBkcm9wT3ZlcmxhcCA9PT0gJ2NlbnRlcicpIHtcbiAgICB2YXIgY3ggPSBkcmFnUmVjdC5sZWZ0ICsgZHJhZ1JlY3Qud2lkdGggLyAyO1xuICAgIHZhciBjeSA9IGRyYWdSZWN0LnRvcCArIGRyYWdSZWN0LmhlaWdodCAvIDI7XG5cbiAgICBkcm9wcGVkID0gY3ggPj0gcmVjdC5sZWZ0ICYmIGN4IDw9IHJlY3QucmlnaHQgJiYgY3kgPj0gcmVjdC50b3AgJiYgY3kgPD0gcmVjdC5ib3R0b207XG4gIH1cblxuICBpZiAoZHJhZ1JlY3QgJiYgdXRpbHMuaXMubnVtYmVyKGRyb3BPdmVybGFwKSkge1xuICAgIHZhciBvdmVybGFwQXJlYSA9IE1hdGgubWF4KDAsIE1hdGgubWluKHJlY3QucmlnaHQsIGRyYWdSZWN0LnJpZ2h0KSAtIE1hdGgubWF4KHJlY3QubGVmdCwgZHJhZ1JlY3QubGVmdCkpICogTWF0aC5tYXgoMCwgTWF0aC5taW4ocmVjdC5ib3R0b20sIGRyYWdSZWN0LmJvdHRvbSkgLSBNYXRoLm1heChyZWN0LnRvcCwgZHJhZ1JlY3QudG9wKSk7XG5cbiAgICB2YXIgb3ZlcmxhcFJhdGlvID0gb3ZlcmxhcEFyZWEgLyAoZHJhZ1JlY3Qud2lkdGggKiBkcmFnUmVjdC5oZWlnaHQpO1xuXG4gICAgZHJvcHBlZCA9IG92ZXJsYXBSYXRpbyA+PSBkcm9wT3ZlcmxhcDtcbiAgfVxuXG4gIGlmICh0aGlzLm9wdGlvbnMuZHJvcC5jaGVja2VyKSB7XG4gICAgZHJvcHBlZCA9IHRoaXMub3B0aW9ucy5kcm9wLmNoZWNrZXIoZHJhZ0V2ZW50LCBldmVudCwgZHJvcHBlZCwgdGhpcywgZHJvcEVsZW1lbnQsIGRyYWdnYWJsZSwgZHJhZ2dhYmxlRWxlbWVudCk7XG4gIH1cblxuICByZXR1cm4gZHJvcHBlZDtcbn07XG5cbkludGVyYWN0YWJsZS5zaWduYWxzLm9uKCd1bnNldCcsIGZ1bmN0aW9uIChfcmVmOCkge1xuICB2YXIgaW50ZXJhY3RhYmxlID0gX3JlZjguaW50ZXJhY3RhYmxlO1xuXG4gIGludGVyYWN0YWJsZS5kcm9wem9uZShmYWxzZSk7XG59KTtcblxuSW50ZXJhY3RhYmxlLnNldHRpbmdzTWV0aG9kcy5wdXNoKCdkcm9wQ2hlY2tlcicpO1xuXG5JbnRlcmFjdGlvbi5zaWduYWxzLm9uKCduZXcnLCBmdW5jdGlvbiAoaW50ZXJhY3Rpb24pIHtcbiAgaW50ZXJhY3Rpb24uZHJvcFRhcmdldCA9IG51bGw7IC8vIHRoZSBkcm9wem9uZSBhIGRyYWcgdGFyZ2V0IG1pZ2h0IGJlIGRyb3BwZWQgaW50b1xuICBpbnRlcmFjdGlvbi5kcm9wRWxlbWVudCA9IG51bGw7IC8vIHRoZSBlbGVtZW50IGF0IHRoZSB0aW1lIG9mIGNoZWNraW5nXG4gIGludGVyYWN0aW9uLnByZXZEcm9wVGFyZ2V0ID0gbnVsbDsgLy8gdGhlIGRyb3B6b25lIHRoYXQgd2FzIHJlY2VudGx5IGRyYWdnZWQgYXdheSBmcm9tXG4gIGludGVyYWN0aW9uLnByZXZEcm9wRWxlbWVudCA9IG51bGw7IC8vIHRoZSBlbGVtZW50IGF0IHRoZSB0aW1lIG9mIGNoZWNraW5nXG4gIGludGVyYWN0aW9uLmRyb3BFdmVudHMgPSBudWxsOyAvLyB0aGUgZHJvcEV2ZW50cyByZWxhdGVkIHRvIHRoZSBjdXJyZW50IGRyYWcgZXZlbnRcblxuICBpbnRlcmFjdGlvbi5hY3RpdmVEcm9wcyA9IHtcbiAgICBkcm9wem9uZXM6IFtdLCAvLyB0aGUgZHJvcHpvbmVzIHRoYXQgYXJlIG1lbnRpb25lZCBiZWxvd1xuICAgIGVsZW1lbnRzOiBbXSwgLy8gZWxlbWVudHMgb2YgZHJvcHpvbmVzIHRoYXQgYWNjZXB0IHRoZSB0YXJnZXQgZHJhZ2dhYmxlXG4gICAgcmVjdHM6IFtdIC8vIHRoZSByZWN0cyBvZiB0aGUgZWxlbWVudHMgbWVudGlvbmVkIGFib3ZlXG4gIH07XG59KTtcblxuSW50ZXJhY3Rpb24uc2lnbmFscy5vbignc3RvcCcsIGZ1bmN0aW9uIChfcmVmOSkge1xuICB2YXIgaW50ZXJhY3Rpb24gPSBfcmVmOS5pbnRlcmFjdGlvbjtcblxuICBpbnRlcmFjdGlvbi5kcm9wVGFyZ2V0ID0gaW50ZXJhY3Rpb24uZHJvcEVsZW1lbnQgPSBpbnRlcmFjdGlvbi5wcmV2RHJvcFRhcmdldCA9IGludGVyYWN0aW9uLnByZXZEcm9wRWxlbWVudCA9IG51bGw7XG59KTtcblxuLyoqXG4gKiBSZXR1cm5zIG9yIHNldHMgd2hldGhlciB0aGUgZGltZW5zaW9ucyBvZiBkcm9wem9uZSBlbGVtZW50cyBhcmUgY2FsY3VsYXRlZFxuICogb24gZXZlcnkgZHJhZ21vdmUgb3Igb25seSBvbiBkcmFnc3RhcnQgZm9yIHRoZSBkZWZhdWx0IGRyb3BDaGVja2VyXG4gKlxuICogQHBhcmFtIHtib29sZWFufSBbbmV3VmFsdWVdIFRydWUgdG8gY2hlY2sgb24gZWFjaCBtb3ZlLiBGYWxzZSB0byBjaGVjayBvbmx5XG4gKiBiZWZvcmUgc3RhcnRcbiAqIEByZXR1cm4ge2Jvb2xlYW4gfCBpbnRlcmFjdH0gVGhlIGN1cnJlbnQgc2V0dGluZyBvciBpbnRlcmFjdFxuICovXG5pbnRlcmFjdC5keW5hbWljRHJvcCA9IGZ1bmN0aW9uIChuZXdWYWx1ZSkge1xuICBpZiAodXRpbHMuaXMuYm9vbChuZXdWYWx1ZSkpIHtcbiAgICAvL2lmIChkcmFnZ2luZyAmJiBkeW5hbWljRHJvcCAhPT0gbmV3VmFsdWUgJiYgIW5ld1ZhbHVlKSB7XG4gICAgLy9jYWxjUmVjdHMoZHJvcHpvbmVzKTtcbiAgICAvL31cblxuICAgIGR5bmFtaWNEcm9wID0gbmV3VmFsdWU7XG5cbiAgICByZXR1cm4gaW50ZXJhY3Q7XG4gIH1cbiAgcmV0dXJuIGR5bmFtaWNEcm9wO1xufTtcblxudXRpbHMubWVyZ2UoSW50ZXJhY3RhYmxlLmV2ZW50VHlwZXMsIFsnZHJhZ2VudGVyJywgJ2RyYWdsZWF2ZScsICdkcm9wYWN0aXZhdGUnLCAnZHJvcGRlYWN0aXZhdGUnLCAnZHJvcG1vdmUnLCAnZHJvcCddKTtcbmFjdGlvbnMubWV0aG9kRGljdC5kcm9wID0gJ2Ryb3B6b25lJztcblxuZGVmYXVsdE9wdGlvbnMuZHJvcCA9IGRyb3AuZGVmYXVsdHM7XG5cbm1vZHVsZS5leHBvcnRzID0gZHJvcDtcblxufSx7XCIuLi9JbnRlcmFjdEV2ZW50XCI6MyxcIi4uL0ludGVyYWN0YWJsZVwiOjQsXCIuLi9JbnRlcmFjdGlvblwiOjUsXCIuLi9kZWZhdWx0T3B0aW9uc1wiOjE4LFwiLi4vaW50ZXJhY3RcIjoyMSxcIi4uL3Njb3BlXCI6MzMsXCIuLi91dGlsc1wiOjQ0LFwiLi9iYXNlXCI6Nn1dLDk6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgYWN0aW9ucyA9IHJlcXVpcmUoJy4vYmFzZScpO1xudmFyIHV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMnKTtcbnZhciBJbnRlcmFjdEV2ZW50ID0gcmVxdWlyZSgnLi4vSW50ZXJhY3RFdmVudCcpO1xudmFyIEludGVyYWN0YWJsZSA9IHJlcXVpcmUoJy4uL0ludGVyYWN0YWJsZScpO1xudmFyIEludGVyYWN0aW9uID0gcmVxdWlyZSgnLi4vSW50ZXJhY3Rpb24nKTtcbnZhciBkZWZhdWx0T3B0aW9ucyA9IHJlcXVpcmUoJy4uL2RlZmF1bHRPcHRpb25zJyk7XG5cbnZhciBnZXN0dXJlID0ge1xuICBkZWZhdWx0czoge1xuICAgIGVuYWJsZWQ6IGZhbHNlLFxuICAgIG9yaWdpbjogbnVsbCxcbiAgICByZXN0cmljdDogbnVsbFxuICB9LFxuXG4gIGNoZWNrZXI6IGZ1bmN0aW9uIGNoZWNrZXIocG9pbnRlciwgZXZlbnQsIGludGVyYWN0YWJsZSwgZWxlbWVudCwgaW50ZXJhY3Rpb24pIHtcbiAgICBpZiAoaW50ZXJhY3Rpb24ucG9pbnRlcklkcy5sZW5ndGggPj0gMikge1xuICAgICAgcmV0dXJuIHsgbmFtZTogJ2dlc3R1cmUnIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH0sXG5cbiAgZ2V0Q3Vyc29yOiBmdW5jdGlvbiBnZXRDdXJzb3IoKSB7XG4gICAgcmV0dXJuICcnO1xuICB9XG59O1xuXG5JbnRlcmFjdEV2ZW50LnNpZ25hbHMub24oJ25ldycsIGZ1bmN0aW9uIChfcmVmKSB7XG4gIHZhciBpRXZlbnQgPSBfcmVmLmlFdmVudCxcbiAgICAgIGludGVyYWN0aW9uID0gX3JlZi5pbnRlcmFjdGlvbjtcblxuICBpZiAoaUV2ZW50LnR5cGUgIT09ICdnZXN0dXJlc3RhcnQnKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlFdmVudC5kcyA9IDA7XG5cbiAgaW50ZXJhY3Rpb24uZ2VzdHVyZS5zdGFydERpc3RhbmNlID0gaW50ZXJhY3Rpb24uZ2VzdHVyZS5wcmV2RGlzdGFuY2UgPSBpRXZlbnQuZGlzdGFuY2U7XG4gIGludGVyYWN0aW9uLmdlc3R1cmUuc3RhcnRBbmdsZSA9IGludGVyYWN0aW9uLmdlc3R1cmUucHJldkFuZ2xlID0gaUV2ZW50LmFuZ2xlO1xuICBpbnRlcmFjdGlvbi5nZXN0dXJlLnNjYWxlID0gMTtcbn0pO1xuXG5JbnRlcmFjdEV2ZW50LnNpZ25hbHMub24oJ25ldycsIGZ1bmN0aW9uIChfcmVmMikge1xuICB2YXIgaUV2ZW50ID0gX3JlZjIuaUV2ZW50LFxuICAgICAgaW50ZXJhY3Rpb24gPSBfcmVmMi5pbnRlcmFjdGlvbjtcblxuICBpZiAoaUV2ZW50LnR5cGUgIT09ICdnZXN0dXJlbW92ZScpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBpRXZlbnQuZHMgPSBpRXZlbnQuc2NhbGUgLSBpbnRlcmFjdGlvbi5nZXN0dXJlLnNjYWxlO1xuXG4gIGludGVyYWN0aW9uLnRhcmdldC5maXJlKGlFdmVudCk7XG5cbiAgaW50ZXJhY3Rpb24uZ2VzdHVyZS5wcmV2QW5nbGUgPSBpRXZlbnQuYW5nbGU7XG4gIGludGVyYWN0aW9uLmdlc3R1cmUucHJldkRpc3RhbmNlID0gaUV2ZW50LmRpc3RhbmNlO1xuXG4gIGlmIChpRXZlbnQuc2NhbGUgIT09IEluZmluaXR5ICYmIGlFdmVudC5zY2FsZSAhPT0gbnVsbCAmJiBpRXZlbnQuc2NhbGUgIT09IHVuZGVmaW5lZCAmJiAhaXNOYU4oaUV2ZW50LnNjYWxlKSkge1xuXG4gICAgaW50ZXJhY3Rpb24uZ2VzdHVyZS5zY2FsZSA9IGlFdmVudC5zY2FsZTtcbiAgfVxufSk7XG5cbi8qKlxuICogYGBganNcbiAqIGludGVyYWN0KGVsZW1lbnQpLmdlc3R1cmFibGUoe1xuICogICAgIG9uc3RhcnQ6IGZ1bmN0aW9uIChldmVudCkge30sXG4gKiAgICAgb25tb3ZlIDogZnVuY3Rpb24gKGV2ZW50KSB7fSxcbiAqICAgICBvbmVuZCAgOiBmdW5jdGlvbiAoZXZlbnQpIHt9LFxuICpcbiAqICAgICAvLyBsaW1pdCBtdWx0aXBsZSBnZXN0dXJlcy5cbiAqICAgICAvLyBTZWUgdGhlIGV4cGxhbmF0aW9uIGluIHtAbGluayBJbnRlcmFjdGFibGUuZHJhZ2dhYmxlfSBleGFtcGxlXG4gKiAgICAgbWF4OiBJbmZpbml0eSxcbiAqICAgICBtYXhQZXJFbGVtZW50OiAxLFxuICogfSk7XG4gKlxuICogdmFyIGlzR2VzdHVyZWFibGUgPSBpbnRlcmFjdChlbGVtZW50KS5nZXN0dXJhYmxlKCk7XG4gKiBgYGBcbiAqXG4gKiBHZXRzIG9yIHNldHMgd2hldGhlciBtdWx0aXRvdWNoIGdlc3R1cmVzIGNhbiBiZSBwZXJmb3JtZWQgb24gdGhlIHRhcmdldFxuICpcbiAqIEBwYXJhbSB7Ym9vbGVhbiB8IG9iamVjdH0gW29wdGlvbnNdIHRydWUvZmFsc2Ugb3IgQW4gb2JqZWN0IHdpdGggZXZlbnRcbiAqIGxpc3RlbmVycyB0byBiZSBmaXJlZCBvbiBnZXN0dXJlIGV2ZW50cyAobWFrZXMgdGhlIEludGVyYWN0YWJsZSBnZXN0dXJhYmxlKVxuICogQHJldHVybiB7Ym9vbGVhbiB8IEludGVyYWN0YWJsZX0gQSBib29sZWFuIGluZGljYXRpbmcgaWYgdGhpcyBjYW4gYmUgdGhlXG4gKiB0YXJnZXQgb2YgZ2VzdHVyZSBldmVudHMsIG9yIHRoaXMgSW50ZXJhY3RhYmxlXG4gKi9cbkludGVyYWN0YWJsZS5wcm90b3R5cGUuZ2VzdHVyYWJsZSA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gIGlmICh1dGlscy5pcy5vYmplY3Qob3B0aW9ucykpIHtcbiAgICB0aGlzLm9wdGlvbnMuZ2VzdHVyZS5lbmFibGVkID0gb3B0aW9ucy5lbmFibGVkID09PSBmYWxzZSA/IGZhbHNlIDogdHJ1ZTtcbiAgICB0aGlzLnNldFBlckFjdGlvbignZ2VzdHVyZScsIG9wdGlvbnMpO1xuICAgIHRoaXMuc2V0T25FdmVudHMoJ2dlc3R1cmUnLCBvcHRpb25zKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgaWYgKHV0aWxzLmlzLmJvb2wob3B0aW9ucykpIHtcbiAgICB0aGlzLm9wdGlvbnMuZ2VzdHVyZS5lbmFibGVkID0gb3B0aW9ucztcblxuICAgIGlmICghb3B0aW9ucykge1xuICAgICAgdGhpcy5vbmdlc3R1cmVzdGFydCA9IHRoaXMub25nZXN0dXJlc3RhcnQgPSB0aGlzLm9uZ2VzdHVyZWVuZCA9IG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICByZXR1cm4gdGhpcy5vcHRpb25zLmdlc3R1cmU7XG59O1xuXG5JbnRlcmFjdEV2ZW50LnNpZ25hbHMub24oJ3NldC1kZWx0YScsIGZ1bmN0aW9uIChfcmVmMykge1xuICB2YXIgaW50ZXJhY3Rpb24gPSBfcmVmMy5pbnRlcmFjdGlvbixcbiAgICAgIGlFdmVudCA9IF9yZWYzLmlFdmVudCxcbiAgICAgIGFjdGlvbiA9IF9yZWYzLmFjdGlvbixcbiAgICAgIGV2ZW50ID0gX3JlZjMuZXZlbnQsXG4gICAgICBzdGFydGluZyA9IF9yZWYzLnN0YXJ0aW5nLFxuICAgICAgZW5kaW5nID0gX3JlZjMuZW5kaW5nLFxuICAgICAgZGVsdGFTb3VyY2UgPSBfcmVmMy5kZWx0YVNvdXJjZTtcblxuICBpZiAoYWN0aW9uICE9PSAnZ2VzdHVyZScpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgcG9pbnRlcnMgPSBpbnRlcmFjdGlvbi5wb2ludGVycztcblxuICBpRXZlbnQudG91Y2hlcyA9IFtwb2ludGVyc1swXSwgcG9pbnRlcnNbMV1dO1xuXG4gIGlmIChzdGFydGluZykge1xuICAgIGlFdmVudC5kaXN0YW5jZSA9IHV0aWxzLnRvdWNoRGlzdGFuY2UocG9pbnRlcnMsIGRlbHRhU291cmNlKTtcbiAgICBpRXZlbnQuYm94ID0gdXRpbHMudG91Y2hCQm94KHBvaW50ZXJzKTtcbiAgICBpRXZlbnQuc2NhbGUgPSAxO1xuICAgIGlFdmVudC5kcyA9IDA7XG4gICAgaUV2ZW50LmFuZ2xlID0gdXRpbHMudG91Y2hBbmdsZShwb2ludGVycywgdW5kZWZpbmVkLCBkZWx0YVNvdXJjZSk7XG4gICAgaUV2ZW50LmRhID0gMDtcbiAgfSBlbHNlIGlmIChlbmRpbmcgfHwgZXZlbnQgaW5zdGFuY2VvZiBJbnRlcmFjdEV2ZW50KSB7XG4gICAgaUV2ZW50LmRpc3RhbmNlID0gaW50ZXJhY3Rpb24ucHJldkV2ZW50LmRpc3RhbmNlO1xuICAgIGlFdmVudC5ib3ggPSBpbnRlcmFjdGlvbi5wcmV2RXZlbnQuYm94O1xuICAgIGlFdmVudC5zY2FsZSA9IGludGVyYWN0aW9uLnByZXZFdmVudC5zY2FsZTtcbiAgICBpRXZlbnQuZHMgPSBpRXZlbnQuc2NhbGUgLSAxO1xuICAgIGlFdmVudC5hbmdsZSA9IGludGVyYWN0aW9uLnByZXZFdmVudC5hbmdsZTtcbiAgICBpRXZlbnQuZGEgPSBpRXZlbnQuYW5nbGUgLSBpbnRlcmFjdGlvbi5nZXN0dXJlLnN0YXJ0QW5nbGU7XG4gIH0gZWxzZSB7XG4gICAgaUV2ZW50LmRpc3RhbmNlID0gdXRpbHMudG91Y2hEaXN0YW5jZShwb2ludGVycywgZGVsdGFTb3VyY2UpO1xuICAgIGlFdmVudC5ib3ggPSB1dGlscy50b3VjaEJCb3gocG9pbnRlcnMpO1xuICAgIGlFdmVudC5zY2FsZSA9IGlFdmVudC5kaXN0YW5jZSAvIGludGVyYWN0aW9uLmdlc3R1cmUuc3RhcnREaXN0YW5jZTtcbiAgICBpRXZlbnQuYW5nbGUgPSB1dGlscy50b3VjaEFuZ2xlKHBvaW50ZXJzLCBpbnRlcmFjdGlvbi5nZXN0dXJlLnByZXZBbmdsZSwgZGVsdGFTb3VyY2UpO1xuXG4gICAgaUV2ZW50LmRzID0gaUV2ZW50LnNjYWxlIC0gaW50ZXJhY3Rpb24uZ2VzdHVyZS5wcmV2U2NhbGU7XG4gICAgaUV2ZW50LmRhID0gaUV2ZW50LmFuZ2xlIC0gaW50ZXJhY3Rpb24uZ2VzdHVyZS5wcmV2QW5nbGU7XG4gIH1cbn0pO1xuXG5JbnRlcmFjdGlvbi5zaWduYWxzLm9uKCduZXcnLCBmdW5jdGlvbiAoaW50ZXJhY3Rpb24pIHtcbiAgaW50ZXJhY3Rpb24uZ2VzdHVyZSA9IHtcbiAgICBzdGFydDogeyB4OiAwLCB5OiAwIH0sXG5cbiAgICBzdGFydERpc3RhbmNlOiAwLCAvLyBkaXN0YW5jZSBiZXR3ZWVuIHR3byB0b3VjaGVzIG9mIHRvdWNoU3RhcnRcbiAgICBwcmV2RGlzdGFuY2U6IDAsXG4gICAgZGlzdGFuY2U6IDAsXG5cbiAgICBzY2FsZTogMSwgLy8gZ2VzdHVyZS5kaXN0YW5jZSAvIGdlc3R1cmUuc3RhcnREaXN0YW5jZVxuXG4gICAgc3RhcnRBbmdsZTogMCwgLy8gYW5nbGUgb2YgbGluZSBqb2luaW5nIHR3byB0b3VjaGVzXG4gICAgcHJldkFuZ2xlOiAwIC8vIGFuZ2xlIG9mIHRoZSBwcmV2aW91cyBnZXN0dXJlIGV2ZW50XG4gIH07XG59KTtcblxuYWN0aW9ucy5nZXN0dXJlID0gZ2VzdHVyZTtcbmFjdGlvbnMubmFtZXMucHVzaCgnZ2VzdHVyZScpO1xudXRpbHMubWVyZ2UoSW50ZXJhY3RhYmxlLmV2ZW50VHlwZXMsIFsnZ2VzdHVyZXN0YXJ0JywgJ2dlc3R1cmVtb3ZlJywgJ2dlc3R1cmVlbmQnXSk7XG5hY3Rpb25zLm1ldGhvZERpY3QuZ2VzdHVyZSA9ICdnZXN0dXJhYmxlJztcblxuZGVmYXVsdE9wdGlvbnMuZ2VzdHVyZSA9IGdlc3R1cmUuZGVmYXVsdHM7XG5cbm1vZHVsZS5leHBvcnRzID0gZ2VzdHVyZTtcblxufSx7XCIuLi9JbnRlcmFjdEV2ZW50XCI6MyxcIi4uL0ludGVyYWN0YWJsZVwiOjQsXCIuLi9JbnRlcmFjdGlvblwiOjUsXCIuLi9kZWZhdWx0T3B0aW9uc1wiOjE4LFwiLi4vdXRpbHNcIjo0NCxcIi4vYmFzZVwiOjZ9XSwxMDpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4ndXNlIHN0cmljdCc7XG5cbnZhciBhY3Rpb25zID0gcmVxdWlyZSgnLi9iYXNlJyk7XG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpO1xudmFyIGJyb3dzZXIgPSByZXF1aXJlKCcuLi91dGlscy9icm93c2VyJyk7XG52YXIgSW50ZXJhY3RFdmVudCA9IHJlcXVpcmUoJy4uL0ludGVyYWN0RXZlbnQnKTtcbi8qKiBAbGVuZHMgSW50ZXJhY3RhYmxlICovXG52YXIgSW50ZXJhY3RhYmxlID0gcmVxdWlyZSgnLi4vSW50ZXJhY3RhYmxlJyk7XG52YXIgSW50ZXJhY3Rpb24gPSByZXF1aXJlKCcuLi9JbnRlcmFjdGlvbicpO1xudmFyIGRlZmF1bHRPcHRpb25zID0gcmVxdWlyZSgnLi4vZGVmYXVsdE9wdGlvbnMnKTtcblxuLy8gTGVzcyBQcmVjaXNpb24gd2l0aCB0b3VjaCBpbnB1dFxudmFyIGRlZmF1bHRNYXJnaW4gPSBicm93c2VyLnN1cHBvcnRzVG91Y2ggfHwgYnJvd3Nlci5zdXBwb3J0c1BvaW50ZXJFdmVudCA/IDIwIDogMTA7XG5cbnZhciByZXNpemUgPSB7XG4gIGRlZmF1bHRzOiB7XG4gICAgZW5hYmxlZDogZmFsc2UsXG4gICAgbW91c2VCdXR0b25zOiBudWxsLFxuXG4gICAgb3JpZ2luOiBudWxsLFxuICAgIHNuYXA6IG51bGwsXG4gICAgcmVzdHJpY3Q6IG51bGwsXG4gICAgaW5lcnRpYTogbnVsbCxcbiAgICBhdXRvU2Nyb2xsOiBudWxsLFxuXG4gICAgc3F1YXJlOiBmYWxzZSxcbiAgICBwcmVzZXJ2ZUFzcGVjdFJhdGlvOiBmYWxzZSxcbiAgICBheGlzOiAneHknLFxuXG4gICAgLy8gdXNlIGRlZmF1bHQgbWFyZ2luXG4gICAgbWFyZ2luOiBOYU4sXG5cbiAgICAvLyBvYmplY3Qgd2l0aCBwcm9wcyBsZWZ0LCByaWdodCwgdG9wLCBib3R0b20gd2hpY2ggYXJlXG4gICAgLy8gdHJ1ZS9mYWxzZSB2YWx1ZXMgdG8gcmVzaXplIHdoZW4gdGhlIHBvaW50ZXIgaXMgb3ZlciB0aGF0IGVkZ2UsXG4gICAgLy8gQ1NTIHNlbGVjdG9ycyB0byBtYXRjaCB0aGUgaGFuZGxlcyBmb3IgZWFjaCBkaXJlY3Rpb25cbiAgICAvLyBvciB0aGUgRWxlbWVudHMgZm9yIGVhY2ggaGFuZGxlXG4gICAgZWRnZXM6IG51bGwsXG5cbiAgICAvLyBhIHZhbHVlIG9mICdub25lJyB3aWxsIGxpbWl0IHRoZSByZXNpemUgcmVjdCB0byBhIG1pbmltdW0gb2YgMHgwXG4gICAgLy8gJ25lZ2F0ZScgd2lsbCBhbG93IHRoZSByZWN0IHRvIGhhdmUgbmVnYXRpdmUgd2lkdGgvaGVpZ2h0XG4gICAgLy8gJ3JlcG9zaXRpb24nIHdpbGwga2VlcCB0aGUgd2lkdGgvaGVpZ2h0IHBvc2l0aXZlIGJ5IHN3YXBwaW5nXG4gICAgLy8gdGhlIHRvcCBhbmQgYm90dG9tIGVkZ2VzIGFuZC9vciBzd2FwcGluZyB0aGUgbGVmdCBhbmQgcmlnaHQgZWRnZXNcbiAgICBpbnZlcnQ6ICdub25lJ1xuICB9LFxuXG4gIGNoZWNrZXI6IGZ1bmN0aW9uIGNoZWNrZXIocG9pbnRlciwgZXZlbnQsIGludGVyYWN0YWJsZSwgZWxlbWVudCwgaW50ZXJhY3Rpb24sIHJlY3QpIHtcbiAgICBpZiAoIXJlY3QpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHZhciBwYWdlID0gdXRpbHMuZXh0ZW5kKHt9LCBpbnRlcmFjdGlvbi5jdXJDb29yZHMucGFnZSk7XG4gICAgdmFyIG9wdGlvbnMgPSBpbnRlcmFjdGFibGUub3B0aW9ucztcblxuICAgIGlmIChvcHRpb25zLnJlc2l6ZS5lbmFibGVkKSB7XG4gICAgICB2YXIgcmVzaXplT3B0aW9ucyA9IG9wdGlvbnMucmVzaXplO1xuICAgICAgdmFyIHJlc2l6ZUVkZ2VzID0geyBsZWZ0OiBmYWxzZSwgcmlnaHQ6IGZhbHNlLCB0b3A6IGZhbHNlLCBib3R0b206IGZhbHNlIH07XG5cbiAgICAgIC8vIGlmIHVzaW5nIHJlc2l6ZS5lZGdlc1xuICAgICAgaWYgKHV0aWxzLmlzLm9iamVjdChyZXNpemVPcHRpb25zLmVkZ2VzKSkge1xuICAgICAgICBmb3IgKHZhciBlZGdlIGluIHJlc2l6ZUVkZ2VzKSB7XG4gICAgICAgICAgcmVzaXplRWRnZXNbZWRnZV0gPSBjaGVja1Jlc2l6ZUVkZ2UoZWRnZSwgcmVzaXplT3B0aW9ucy5lZGdlc1tlZGdlXSwgcGFnZSwgaW50ZXJhY3Rpb24uX2V2ZW50VGFyZ2V0LCBlbGVtZW50LCByZWN0LCByZXNpemVPcHRpb25zLm1hcmdpbiB8fCBkZWZhdWx0TWFyZ2luKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlc2l6ZUVkZ2VzLmxlZnQgPSByZXNpemVFZGdlcy5sZWZ0ICYmICFyZXNpemVFZGdlcy5yaWdodDtcbiAgICAgICAgcmVzaXplRWRnZXMudG9wID0gcmVzaXplRWRnZXMudG9wICYmICFyZXNpemVFZGdlcy5ib3R0b207XG5cbiAgICAgICAgaWYgKHJlc2l6ZUVkZ2VzLmxlZnQgfHwgcmVzaXplRWRnZXMucmlnaHQgfHwgcmVzaXplRWRnZXMudG9wIHx8IHJlc2l6ZUVkZ2VzLmJvdHRvbSkge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBuYW1lOiAncmVzaXplJyxcbiAgICAgICAgICAgIGVkZ2VzOiByZXNpemVFZGdlc1xuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciByaWdodCA9IG9wdGlvbnMucmVzaXplLmF4aXMgIT09ICd5JyAmJiBwYWdlLnggPiByZWN0LnJpZ2h0IC0gZGVmYXVsdE1hcmdpbjtcbiAgICAgICAgdmFyIGJvdHRvbSA9IG9wdGlvbnMucmVzaXplLmF4aXMgIT09ICd4JyAmJiBwYWdlLnkgPiByZWN0LmJvdHRvbSAtIGRlZmF1bHRNYXJnaW47XG5cbiAgICAgICAgaWYgKHJpZ2h0IHx8IGJvdHRvbSkge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBuYW1lOiAncmVzaXplJyxcbiAgICAgICAgICAgIGF4ZXM6IChyaWdodCA/ICd4JyA6ICcnKSArIChib3R0b20gPyAneScgOiAnJylcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH0sXG5cbiAgY3Vyc29yczogYnJvd3Nlci5pc0llOSA/IHtcbiAgICB4OiAnZS1yZXNpemUnLFxuICAgIHk6ICdzLXJlc2l6ZScsXG4gICAgeHk6ICdzZS1yZXNpemUnLFxuXG4gICAgdG9wOiAnbi1yZXNpemUnLFxuICAgIGxlZnQ6ICd3LXJlc2l6ZScsXG4gICAgYm90dG9tOiAncy1yZXNpemUnLFxuICAgIHJpZ2h0OiAnZS1yZXNpemUnLFxuICAgIHRvcGxlZnQ6ICdzZS1yZXNpemUnLFxuICAgIGJvdHRvbXJpZ2h0OiAnc2UtcmVzaXplJyxcbiAgICB0b3ByaWdodDogJ25lLXJlc2l6ZScsXG4gICAgYm90dG9tbGVmdDogJ25lLXJlc2l6ZSdcbiAgfSA6IHtcbiAgICB4OiAnZXctcmVzaXplJyxcbiAgICB5OiAnbnMtcmVzaXplJyxcbiAgICB4eTogJ253c2UtcmVzaXplJyxcblxuICAgIHRvcDogJ25zLXJlc2l6ZScsXG4gICAgbGVmdDogJ2V3LXJlc2l6ZScsXG4gICAgYm90dG9tOiAnbnMtcmVzaXplJyxcbiAgICByaWdodDogJ2V3LXJlc2l6ZScsXG4gICAgdG9wbGVmdDogJ253c2UtcmVzaXplJyxcbiAgICBib3R0b21yaWdodDogJ253c2UtcmVzaXplJyxcbiAgICB0b3ByaWdodDogJ25lc3ctcmVzaXplJyxcbiAgICBib3R0b21sZWZ0OiAnbmVzdy1yZXNpemUnXG4gIH0sXG5cbiAgZ2V0Q3Vyc29yOiBmdW5jdGlvbiBnZXRDdXJzb3IoYWN0aW9uKSB7XG4gICAgaWYgKGFjdGlvbi5heGlzKSB7XG4gICAgICByZXR1cm4gcmVzaXplLmN1cnNvcnNbYWN0aW9uLm5hbWUgKyBhY3Rpb24uYXhpc107XG4gICAgfSBlbHNlIGlmIChhY3Rpb24uZWRnZXMpIHtcbiAgICAgIHZhciBjdXJzb3JLZXkgPSAnJztcbiAgICAgIHZhciBlZGdlTmFtZXMgPSBbJ3RvcCcsICdib3R0b20nLCAnbGVmdCcsICdyaWdodCddO1xuXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDQ7IGkrKykge1xuICAgICAgICBpZiAoYWN0aW9uLmVkZ2VzW2VkZ2VOYW1lc1tpXV0pIHtcbiAgICAgICAgICBjdXJzb3JLZXkgKz0gZWRnZU5hbWVzW2ldO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiByZXNpemUuY3Vyc29yc1tjdXJzb3JLZXldO1xuICAgIH1cbiAgfVxufTtcblxuLy8gcmVzaXplc3RhcnRcbkludGVyYWN0RXZlbnQuc2lnbmFscy5vbignbmV3JywgZnVuY3Rpb24gKF9yZWYpIHtcbiAgdmFyIGlFdmVudCA9IF9yZWYuaUV2ZW50LFxuICAgICAgaW50ZXJhY3Rpb24gPSBfcmVmLmludGVyYWN0aW9uO1xuXG4gIGlmIChpRXZlbnQudHlwZSAhPT0gJ3Jlc2l6ZXN0YXJ0JyB8fCAhaW50ZXJhY3Rpb24ucHJlcGFyZWQuZWRnZXMpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgc3RhcnRSZWN0ID0gaW50ZXJhY3Rpb24udGFyZ2V0LmdldFJlY3QoaW50ZXJhY3Rpb24uZWxlbWVudCk7XG4gIHZhciByZXNpemVPcHRpb25zID0gaW50ZXJhY3Rpb24udGFyZ2V0Lm9wdGlvbnMucmVzaXplO1xuXG4gIC8qXG4gICAqIFdoZW4gdXNpbmcgdGhlIGByZXNpemFibGUuc3F1YXJlYCBvciBgcmVzaXphYmxlLnByZXNlcnZlQXNwZWN0UmF0aW9gIG9wdGlvbnMsIHJlc2l6aW5nIGZyb20gb25lIGVkZ2VcbiAgICogd2lsbCBhZmZlY3QgYW5vdGhlci4gRS5nLiB3aXRoIGByZXNpemFibGUuc3F1YXJlYCwgcmVzaXppbmcgdG8gbWFrZSB0aGUgcmlnaHQgZWRnZSBsYXJnZXIgd2lsbCBtYWtlXG4gICAqIHRoZSBib3R0b20gZWRnZSBsYXJnZXIgYnkgdGhlIHNhbWUgYW1vdW50LiBXZSBjYWxsIHRoZXNlICdsaW5rZWQnIGVkZ2VzLiBBbnkgbGlua2VkIGVkZ2VzIHdpbGwgZGVwZW5kXG4gICAqIG9uIHRoZSBhY3RpdmUgZWRnZXMgYW5kIHRoZSBlZGdlIGJlaW5nIGludGVyYWN0ZWQgd2l0aC5cbiAgICovXG4gIGlmIChyZXNpemVPcHRpb25zLnNxdWFyZSB8fCByZXNpemVPcHRpb25zLnByZXNlcnZlQXNwZWN0UmF0aW8pIHtcbiAgICB2YXIgbGlua2VkRWRnZXMgPSB1dGlscy5leHRlbmQoe30sIGludGVyYWN0aW9uLnByZXBhcmVkLmVkZ2VzKTtcblxuICAgIGxpbmtlZEVkZ2VzLnRvcCA9IGxpbmtlZEVkZ2VzLnRvcCB8fCBsaW5rZWRFZGdlcy5sZWZ0ICYmICFsaW5rZWRFZGdlcy5ib3R0b207XG4gICAgbGlua2VkRWRnZXMubGVmdCA9IGxpbmtlZEVkZ2VzLmxlZnQgfHwgbGlua2VkRWRnZXMudG9wICYmICFsaW5rZWRFZGdlcy5yaWdodDtcbiAgICBsaW5rZWRFZGdlcy5ib3R0b20gPSBsaW5rZWRFZGdlcy5ib3R0b20gfHwgbGlua2VkRWRnZXMucmlnaHQgJiYgIWxpbmtlZEVkZ2VzLnRvcDtcbiAgICBsaW5rZWRFZGdlcy5yaWdodCA9IGxpbmtlZEVkZ2VzLnJpZ2h0IHx8IGxpbmtlZEVkZ2VzLmJvdHRvbSAmJiAhbGlua2VkRWRnZXMubGVmdDtcblxuICAgIGludGVyYWN0aW9uLnByZXBhcmVkLl9saW5rZWRFZGdlcyA9IGxpbmtlZEVkZ2VzO1xuICB9IGVsc2Uge1xuICAgIGludGVyYWN0aW9uLnByZXBhcmVkLl9saW5rZWRFZGdlcyA9IG51bGw7XG4gIH1cblxuICAvLyBpZiB1c2luZyBgcmVzaXphYmxlLnByZXNlcnZlQXNwZWN0UmF0aW9gIG9wdGlvbiwgcmVjb3JkIGFzcGVjdCByYXRpbyBhdCB0aGUgc3RhcnQgb2YgdGhlIHJlc2l6ZVxuICBpZiAocmVzaXplT3B0aW9ucy5wcmVzZXJ2ZUFzcGVjdFJhdGlvKSB7XG4gICAgaW50ZXJhY3Rpb24ucmVzaXplU3RhcnRBc3BlY3RSYXRpbyA9IHN0YXJ0UmVjdC53aWR0aCAvIHN0YXJ0UmVjdC5oZWlnaHQ7XG4gIH1cblxuICBpbnRlcmFjdGlvbi5yZXNpemVSZWN0cyA9IHtcbiAgICBzdGFydDogc3RhcnRSZWN0LFxuICAgIGN1cnJlbnQ6IHV0aWxzLmV4dGVuZCh7fSwgc3RhcnRSZWN0KSxcbiAgICBpbnZlcnRlZDogdXRpbHMuZXh0ZW5kKHt9LCBzdGFydFJlY3QpLFxuICAgIHByZXZpb3VzOiB1dGlscy5leHRlbmQoe30sIHN0YXJ0UmVjdCksXG4gICAgZGVsdGE6IHtcbiAgICAgIGxlZnQ6IDAsIHJpZ2h0OiAwLCB3aWR0aDogMCxcbiAgICAgIHRvcDogMCwgYm90dG9tOiAwLCBoZWlnaHQ6IDBcbiAgICB9XG4gIH07XG5cbiAgaUV2ZW50LnJlY3QgPSBpbnRlcmFjdGlvbi5yZXNpemVSZWN0cy5pbnZlcnRlZDtcbiAgaUV2ZW50LmRlbHRhUmVjdCA9IGludGVyYWN0aW9uLnJlc2l6ZVJlY3RzLmRlbHRhO1xufSk7XG5cbi8vIHJlc2l6ZW1vdmVcbkludGVyYWN0RXZlbnQuc2lnbmFscy5vbignbmV3JywgZnVuY3Rpb24gKF9yZWYyKSB7XG4gIHZhciBpRXZlbnQgPSBfcmVmMi5pRXZlbnQsXG4gICAgICBwaGFzZSA9IF9yZWYyLnBoYXNlLFxuICAgICAgaW50ZXJhY3Rpb24gPSBfcmVmMi5pbnRlcmFjdGlvbjtcblxuICBpZiAocGhhc2UgIT09ICdtb3ZlJyB8fCAhaW50ZXJhY3Rpb24ucHJlcGFyZWQuZWRnZXMpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgcmVzaXplT3B0aW9ucyA9IGludGVyYWN0aW9uLnRhcmdldC5vcHRpb25zLnJlc2l6ZTtcbiAgdmFyIGludmVydCA9IHJlc2l6ZU9wdGlvbnMuaW52ZXJ0O1xuICB2YXIgaW52ZXJ0aWJsZSA9IGludmVydCA9PT0gJ3JlcG9zaXRpb24nIHx8IGludmVydCA9PT0gJ25lZ2F0ZSc7XG5cbiAgdmFyIGVkZ2VzID0gaW50ZXJhY3Rpb24ucHJlcGFyZWQuZWRnZXM7XG5cbiAgdmFyIHN0YXJ0ID0gaW50ZXJhY3Rpb24ucmVzaXplUmVjdHMuc3RhcnQ7XG4gIHZhciBjdXJyZW50ID0gaW50ZXJhY3Rpb24ucmVzaXplUmVjdHMuY3VycmVudDtcbiAgdmFyIGludmVydGVkID0gaW50ZXJhY3Rpb24ucmVzaXplUmVjdHMuaW52ZXJ0ZWQ7XG4gIHZhciBkZWx0YSA9IGludGVyYWN0aW9uLnJlc2l6ZVJlY3RzLmRlbHRhO1xuICB2YXIgcHJldmlvdXMgPSB1dGlscy5leHRlbmQoaW50ZXJhY3Rpb24ucmVzaXplUmVjdHMucHJldmlvdXMsIGludmVydGVkKTtcbiAgdmFyIG9yaWdpbmFsRWRnZXMgPSBlZGdlcztcblxuICB2YXIgZHggPSBpRXZlbnQuZHg7XG4gIHZhciBkeSA9IGlFdmVudC5keTtcblxuICBpZiAocmVzaXplT3B0aW9ucy5wcmVzZXJ2ZUFzcGVjdFJhdGlvIHx8IHJlc2l6ZU9wdGlvbnMuc3F1YXJlKSB7XG4gICAgLy8gYHJlc2l6ZS5wcmVzZXJ2ZUFzcGVjdFJhdGlvYCB0YWtlcyBwcmVjZWRlbmNlIG92ZXIgYHJlc2l6ZS5zcXVhcmVgXG4gICAgdmFyIHN0YXJ0QXNwZWN0UmF0aW8gPSByZXNpemVPcHRpb25zLnByZXNlcnZlQXNwZWN0UmF0aW8gPyBpbnRlcmFjdGlvbi5yZXNpemVTdGFydEFzcGVjdFJhdGlvIDogMTtcblxuICAgIGVkZ2VzID0gaW50ZXJhY3Rpb24ucHJlcGFyZWQuX2xpbmtlZEVkZ2VzO1xuXG4gICAgaWYgKG9yaWdpbmFsRWRnZXMubGVmdCAmJiBvcmlnaW5hbEVkZ2VzLmJvdHRvbSB8fCBvcmlnaW5hbEVkZ2VzLnJpZ2h0ICYmIG9yaWdpbmFsRWRnZXMudG9wKSB7XG4gICAgICBkeSA9IC1keCAvIHN0YXJ0QXNwZWN0UmF0aW87XG4gICAgfSBlbHNlIGlmIChvcmlnaW5hbEVkZ2VzLmxlZnQgfHwgb3JpZ2luYWxFZGdlcy5yaWdodCkge1xuICAgICAgZHkgPSBkeCAvIHN0YXJ0QXNwZWN0UmF0aW87XG4gICAgfSBlbHNlIGlmIChvcmlnaW5hbEVkZ2VzLnRvcCB8fCBvcmlnaW5hbEVkZ2VzLmJvdHRvbSkge1xuICAgICAgZHggPSBkeSAqIHN0YXJ0QXNwZWN0UmF0aW87XG4gICAgfVxuICB9XG5cbiAgLy8gdXBkYXRlIHRoZSAnY3VycmVudCcgcmVjdCB3aXRob3V0IG1vZGlmaWNhdGlvbnNcbiAgaWYgKGVkZ2VzLnRvcCkge1xuICAgIGN1cnJlbnQudG9wICs9IGR5O1xuICB9XG4gIGlmIChlZGdlcy5ib3R0b20pIHtcbiAgICBjdXJyZW50LmJvdHRvbSArPSBkeTtcbiAgfVxuICBpZiAoZWRnZXMubGVmdCkge1xuICAgIGN1cnJlbnQubGVmdCArPSBkeDtcbiAgfVxuICBpZiAoZWRnZXMucmlnaHQpIHtcbiAgICBjdXJyZW50LnJpZ2h0ICs9IGR4O1xuICB9XG5cbiAgaWYgKGludmVydGlibGUpIHtcbiAgICAvLyBpZiBpbnZlcnRpYmxlLCBjb3B5IHRoZSBjdXJyZW50IHJlY3RcbiAgICB1dGlscy5leHRlbmQoaW52ZXJ0ZWQsIGN1cnJlbnQpO1xuXG4gICAgaWYgKGludmVydCA9PT0gJ3JlcG9zaXRpb24nKSB7XG4gICAgICAvLyBzd2FwIGVkZ2UgdmFsdWVzIGlmIG5lY2Vzc2FyeSB0byBrZWVwIHdpZHRoL2hlaWdodCBwb3NpdGl2ZVxuICAgICAgdmFyIHN3YXAgPSB2b2lkIDA7XG5cbiAgICAgIGlmIChpbnZlcnRlZC50b3AgPiBpbnZlcnRlZC5ib3R0b20pIHtcbiAgICAgICAgc3dhcCA9IGludmVydGVkLnRvcDtcblxuICAgICAgICBpbnZlcnRlZC50b3AgPSBpbnZlcnRlZC5ib3R0b207XG4gICAgICAgIGludmVydGVkLmJvdHRvbSA9IHN3YXA7XG4gICAgICB9XG4gICAgICBpZiAoaW52ZXJ0ZWQubGVmdCA+IGludmVydGVkLnJpZ2h0KSB7XG4gICAgICAgIHN3YXAgPSBpbnZlcnRlZC5sZWZ0O1xuXG4gICAgICAgIGludmVydGVkLmxlZnQgPSBpbnZlcnRlZC5yaWdodDtcbiAgICAgICAgaW52ZXJ0ZWQucmlnaHQgPSBzd2FwO1xuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICAvLyBpZiBub3QgaW52ZXJ0aWJsZSwgcmVzdHJpY3QgdG8gbWluaW11bSBvZiAweDAgcmVjdFxuICAgIGludmVydGVkLnRvcCA9IE1hdGgubWluKGN1cnJlbnQudG9wLCBzdGFydC5ib3R0b20pO1xuICAgIGludmVydGVkLmJvdHRvbSA9IE1hdGgubWF4KGN1cnJlbnQuYm90dG9tLCBzdGFydC50b3ApO1xuICAgIGludmVydGVkLmxlZnQgPSBNYXRoLm1pbihjdXJyZW50LmxlZnQsIHN0YXJ0LnJpZ2h0KTtcbiAgICBpbnZlcnRlZC5yaWdodCA9IE1hdGgubWF4KGN1cnJlbnQucmlnaHQsIHN0YXJ0LmxlZnQpO1xuICB9XG5cbiAgaW52ZXJ0ZWQud2lkdGggPSBpbnZlcnRlZC5yaWdodCAtIGludmVydGVkLmxlZnQ7XG4gIGludmVydGVkLmhlaWdodCA9IGludmVydGVkLmJvdHRvbSAtIGludmVydGVkLnRvcDtcblxuICBmb3IgKHZhciBlZGdlIGluIGludmVydGVkKSB7XG4gICAgZGVsdGFbZWRnZV0gPSBpbnZlcnRlZFtlZGdlXSAtIHByZXZpb3VzW2VkZ2VdO1xuICB9XG5cbiAgaUV2ZW50LmVkZ2VzID0gaW50ZXJhY3Rpb24ucHJlcGFyZWQuZWRnZXM7XG4gIGlFdmVudC5yZWN0ID0gaW52ZXJ0ZWQ7XG4gIGlFdmVudC5kZWx0YVJlY3QgPSBkZWx0YTtcbn0pO1xuXG4vKipcbiAqIGBgYGpzXG4gKiBpbnRlcmFjdChlbGVtZW50KS5yZXNpemFibGUoe1xuICogICBvbnN0YXJ0OiBmdW5jdGlvbiAoZXZlbnQpIHt9LFxuICogICBvbm1vdmUgOiBmdW5jdGlvbiAoZXZlbnQpIHt9LFxuICogICBvbmVuZCAgOiBmdW5jdGlvbiAoZXZlbnQpIHt9LFxuICpcbiAqICAgZWRnZXM6IHtcbiAqICAgICB0b3AgICA6IHRydWUsICAgICAgIC8vIFVzZSBwb2ludGVyIGNvb3JkcyB0byBjaGVjayBmb3IgcmVzaXplLlxuICogICAgIGxlZnQgIDogZmFsc2UsICAgICAgLy8gRGlzYWJsZSByZXNpemluZyBmcm9tIGxlZnQgZWRnZS5cbiAqICAgICBib3R0b206ICcucmVzaXplLXMnLC8vIFJlc2l6ZSBpZiBwb2ludGVyIHRhcmdldCBtYXRjaGVzIHNlbGVjdG9yXG4gKiAgICAgcmlnaHQgOiBoYW5kbGVFbCAgICAvLyBSZXNpemUgaWYgcG9pbnRlciB0YXJnZXQgaXMgdGhlIGdpdmVuIEVsZW1lbnRcbiAqICAgfSxcbiAqXG4gKiAgICAgLy8gV2lkdGggYW5kIGhlaWdodCBjYW4gYmUgYWRqdXN0ZWQgaW5kZXBlbmRlbnRseS4gV2hlbiBgdHJ1ZWAsIHdpZHRoIGFuZFxuICogICAgIC8vIGhlaWdodCBhcmUgYWRqdXN0ZWQgYXQgYSAxOjEgcmF0aW8uXG4gKiAgICAgc3F1YXJlOiBmYWxzZSxcbiAqXG4gKiAgICAgLy8gV2lkdGggYW5kIGhlaWdodCBjYW4gYmUgYWRqdXN0ZWQgaW5kZXBlbmRlbnRseS4gV2hlbiBgdHJ1ZWAsIHdpZHRoIGFuZFxuICogICAgIC8vIGhlaWdodCBtYWludGFpbiB0aGUgYXNwZWN0IHJhdGlvIHRoZXkgaGFkIHdoZW4gcmVzaXppbmcgc3RhcnRlZC5cbiAqICAgICBwcmVzZXJ2ZUFzcGVjdFJhdGlvOiBmYWxzZSxcbiAqXG4gKiAgIC8vIGEgdmFsdWUgb2YgJ25vbmUnIHdpbGwgbGltaXQgdGhlIHJlc2l6ZSByZWN0IHRvIGEgbWluaW11bSBvZiAweDBcbiAqICAgLy8gJ25lZ2F0ZScgd2lsbCBhbGxvdyB0aGUgcmVjdCB0byBoYXZlIG5lZ2F0aXZlIHdpZHRoL2hlaWdodFxuICogICAvLyAncmVwb3NpdGlvbicgd2lsbCBrZWVwIHRoZSB3aWR0aC9oZWlnaHQgcG9zaXRpdmUgYnkgc3dhcHBpbmdcbiAqICAgLy8gdGhlIHRvcCBhbmQgYm90dG9tIGVkZ2VzIGFuZC9vciBzd2FwcGluZyB0aGUgbGVmdCBhbmQgcmlnaHQgZWRnZXNcbiAqICAgaW52ZXJ0OiAnbm9uZScgfHwgJ25lZ2F0ZScgfHwgJ3JlcG9zaXRpb24nXG4gKlxuICogICAvLyBsaW1pdCBtdWx0aXBsZSByZXNpemVzLlxuICogICAvLyBTZWUgdGhlIGV4cGxhbmF0aW9uIGluIHRoZSB7QGxpbmsgSW50ZXJhY3RhYmxlLmRyYWdnYWJsZX0gZXhhbXBsZVxuICogICBtYXg6IEluZmluaXR5LFxuICogICBtYXhQZXJFbGVtZW50OiAxLFxuICogfSk7XG4gKlxuICogdmFyIGlzUmVzaXplYWJsZSA9IGludGVyYWN0KGVsZW1lbnQpLnJlc2l6YWJsZSgpO1xuICogYGBgXG4gKlxuICogR2V0cyBvciBzZXRzIHdoZXRoZXIgcmVzaXplIGFjdGlvbnMgY2FuIGJlIHBlcmZvcm1lZCBvbiB0aGUgdGFyZ2V0XG4gKlxuICogQHBhcmFtIHtib29sZWFuIHwgb2JqZWN0fSBbb3B0aW9uc10gdHJ1ZS9mYWxzZSBvciBBbiBvYmplY3Qgd2l0aCBldmVudFxuICogbGlzdGVuZXJzIHRvIGJlIGZpcmVkIG9uIHJlc2l6ZSBldmVudHMgKG9iamVjdCBtYWtlcyB0aGUgSW50ZXJhY3RhYmxlXG4gKiByZXNpemFibGUpXG4gKiBAcmV0dXJuIHtib29sZWFuIHwgSW50ZXJhY3RhYmxlfSBBIGJvb2xlYW4gaW5kaWNhdGluZyBpZiB0aGlzIGNhbiBiZSB0aGVcbiAqIHRhcmdldCBvZiByZXNpemUgZWxlbWVudHMsIG9yIHRoaXMgSW50ZXJhY3RhYmxlXG4gKi9cbkludGVyYWN0YWJsZS5wcm90b3R5cGUucmVzaXphYmxlID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgaWYgKHV0aWxzLmlzLm9iamVjdChvcHRpb25zKSkge1xuICAgIHRoaXMub3B0aW9ucy5yZXNpemUuZW5hYmxlZCA9IG9wdGlvbnMuZW5hYmxlZCA9PT0gZmFsc2UgPyBmYWxzZSA6IHRydWU7XG4gICAgdGhpcy5zZXRQZXJBY3Rpb24oJ3Jlc2l6ZScsIG9wdGlvbnMpO1xuICAgIHRoaXMuc2V0T25FdmVudHMoJ3Jlc2l6ZScsIG9wdGlvbnMpO1xuXG4gICAgaWYgKC9eeCR8XnkkfF54eSQvLnRlc3Qob3B0aW9ucy5heGlzKSkge1xuICAgICAgdGhpcy5vcHRpb25zLnJlc2l6ZS5heGlzID0gb3B0aW9ucy5heGlzO1xuICAgIH0gZWxzZSBpZiAob3B0aW9ucy5heGlzID09PSBudWxsKSB7XG4gICAgICB0aGlzLm9wdGlvbnMucmVzaXplLmF4aXMgPSBkZWZhdWx0T3B0aW9ucy5yZXNpemUuYXhpcztcbiAgICB9XG5cbiAgICBpZiAodXRpbHMuaXMuYm9vbChvcHRpb25zLnByZXNlcnZlQXNwZWN0UmF0aW8pKSB7XG4gICAgICB0aGlzLm9wdGlvbnMucmVzaXplLnByZXNlcnZlQXNwZWN0UmF0aW8gPSBvcHRpb25zLnByZXNlcnZlQXNwZWN0UmF0aW87XG4gICAgfSBlbHNlIGlmICh1dGlscy5pcy5ib29sKG9wdGlvbnMuc3F1YXJlKSkge1xuICAgICAgdGhpcy5vcHRpb25zLnJlc2l6ZS5zcXVhcmUgPSBvcHRpb25zLnNxdWFyZTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICBpZiAodXRpbHMuaXMuYm9vbChvcHRpb25zKSkge1xuICAgIHRoaXMub3B0aW9ucy5yZXNpemUuZW5hYmxlZCA9IG9wdGlvbnM7XG5cbiAgICBpZiAoIW9wdGlvbnMpIHtcbiAgICAgIHRoaXMub25yZXNpemVzdGFydCA9IHRoaXMub25yZXNpemVzdGFydCA9IHRoaXMub25yZXNpemVlbmQgPSBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIHJldHVybiB0aGlzLm9wdGlvbnMucmVzaXplO1xufTtcblxuZnVuY3Rpb24gY2hlY2tSZXNpemVFZGdlKG5hbWUsIHZhbHVlLCBwYWdlLCBlbGVtZW50LCBpbnRlcmFjdGFibGVFbGVtZW50LCByZWN0LCBtYXJnaW4pIHtcbiAgLy8gZmFsc2UsICcnLCB1bmRlZmluZWQsIG51bGxcbiAgaWYgKCF2YWx1ZSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8vIHRydWUgdmFsdWUsIHVzZSBwb2ludGVyIGNvb3JkcyBhbmQgZWxlbWVudCByZWN0XG4gIGlmICh2YWx1ZSA9PT0gdHJ1ZSkge1xuICAgIC8vIGlmIGRpbWVuc2lvbnMgYXJlIG5lZ2F0aXZlLCBcInN3aXRjaFwiIGVkZ2VzXG4gICAgdmFyIHdpZHRoID0gdXRpbHMuaXMubnVtYmVyKHJlY3Qud2lkdGgpID8gcmVjdC53aWR0aCA6IHJlY3QucmlnaHQgLSByZWN0LmxlZnQ7XG4gICAgdmFyIGhlaWdodCA9IHV0aWxzLmlzLm51bWJlcihyZWN0LmhlaWdodCkgPyByZWN0LmhlaWdodCA6IHJlY3QuYm90dG9tIC0gcmVjdC50b3A7XG5cbiAgICBpZiAod2lkdGggPCAwKSB7XG4gICAgICBpZiAobmFtZSA9PT0gJ2xlZnQnKSB7XG4gICAgICAgIG5hbWUgPSAncmlnaHQnO1xuICAgICAgfSBlbHNlIGlmIChuYW1lID09PSAncmlnaHQnKSB7XG4gICAgICAgIG5hbWUgPSAnbGVmdCc7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChoZWlnaHQgPCAwKSB7XG4gICAgICBpZiAobmFtZSA9PT0gJ3RvcCcpIHtcbiAgICAgICAgbmFtZSA9ICdib3R0b20nO1xuICAgICAgfSBlbHNlIGlmIChuYW1lID09PSAnYm90dG9tJykge1xuICAgICAgICBuYW1lID0gJ3RvcCc7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKG5hbWUgPT09ICdsZWZ0Jykge1xuICAgICAgcmV0dXJuIHBhZ2UueCA8ICh3aWR0aCA+PSAwID8gcmVjdC5sZWZ0IDogcmVjdC5yaWdodCkgKyBtYXJnaW47XG4gICAgfVxuICAgIGlmIChuYW1lID09PSAndG9wJykge1xuICAgICAgcmV0dXJuIHBhZ2UueSA8IChoZWlnaHQgPj0gMCA/IHJlY3QudG9wIDogcmVjdC5ib3R0b20pICsgbWFyZ2luO1xuICAgIH1cblxuICAgIGlmIChuYW1lID09PSAncmlnaHQnKSB7XG4gICAgICByZXR1cm4gcGFnZS54ID4gKHdpZHRoID49IDAgPyByZWN0LnJpZ2h0IDogcmVjdC5sZWZ0KSAtIG1hcmdpbjtcbiAgICB9XG4gICAgaWYgKG5hbWUgPT09ICdib3R0b20nKSB7XG4gICAgICByZXR1cm4gcGFnZS55ID4gKGhlaWdodCA+PSAwID8gcmVjdC5ib3R0b20gOiByZWN0LnRvcCkgLSBtYXJnaW47XG4gICAgfVxuICB9XG5cbiAgLy8gdGhlIHJlbWFpbmluZyBjaGVja3MgcmVxdWlyZSBhbiBlbGVtZW50XG4gIGlmICghdXRpbHMuaXMuZWxlbWVudChlbGVtZW50KSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiB1dGlscy5pcy5lbGVtZW50KHZhbHVlKVxuICAvLyB0aGUgdmFsdWUgaXMgYW4gZWxlbWVudCB0byB1c2UgYXMgYSByZXNpemUgaGFuZGxlXG4gID8gdmFsdWUgPT09IGVsZW1lbnRcbiAgLy8gb3RoZXJ3aXNlIGNoZWNrIGlmIGVsZW1lbnQgbWF0Y2hlcyB2YWx1ZSBhcyBzZWxlY3RvclxuICA6IHV0aWxzLm1hdGNoZXNVcFRvKGVsZW1lbnQsIHZhbHVlLCBpbnRlcmFjdGFibGVFbGVtZW50KTtcbn1cblxuSW50ZXJhY3Rpb24uc2lnbmFscy5vbignbmV3JywgZnVuY3Rpb24gKGludGVyYWN0aW9uKSB7XG4gIGludGVyYWN0aW9uLnJlc2l6ZUF4ZXMgPSAneHknO1xufSk7XG5cbkludGVyYWN0RXZlbnQuc2lnbmFscy5vbignc2V0LWRlbHRhJywgZnVuY3Rpb24gKF9yZWYzKSB7XG4gIHZhciBpbnRlcmFjdGlvbiA9IF9yZWYzLmludGVyYWN0aW9uLFxuICAgICAgaUV2ZW50ID0gX3JlZjMuaUV2ZW50LFxuICAgICAgYWN0aW9uID0gX3JlZjMuYWN0aW9uO1xuXG4gIGlmIChhY3Rpb24gIT09ICdyZXNpemUnIHx8ICFpbnRlcmFjdGlvbi5yZXNpemVBeGVzKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyIG9wdGlvbnMgPSBpbnRlcmFjdGlvbi50YXJnZXQub3B0aW9ucztcblxuICBpZiAob3B0aW9ucy5yZXNpemUuc3F1YXJlKSB7XG4gICAgaWYgKGludGVyYWN0aW9uLnJlc2l6ZUF4ZXMgPT09ICd5Jykge1xuICAgICAgaUV2ZW50LmR4ID0gaUV2ZW50LmR5O1xuICAgIH0gZWxzZSB7XG4gICAgICBpRXZlbnQuZHkgPSBpRXZlbnQuZHg7XG4gICAgfVxuICAgIGlFdmVudC5heGVzID0gJ3h5JztcbiAgfSBlbHNlIHtcbiAgICBpRXZlbnQuYXhlcyA9IGludGVyYWN0aW9uLnJlc2l6ZUF4ZXM7XG5cbiAgICBpZiAoaW50ZXJhY3Rpb24ucmVzaXplQXhlcyA9PT0gJ3gnKSB7XG4gICAgICBpRXZlbnQuZHkgPSAwO1xuICAgIH0gZWxzZSBpZiAoaW50ZXJhY3Rpb24ucmVzaXplQXhlcyA9PT0gJ3knKSB7XG4gICAgICBpRXZlbnQuZHggPSAwO1xuICAgIH1cbiAgfVxufSk7XG5cbmFjdGlvbnMucmVzaXplID0gcmVzaXplO1xuYWN0aW9ucy5uYW1lcy5wdXNoKCdyZXNpemUnKTtcbnV0aWxzLm1lcmdlKEludGVyYWN0YWJsZS5ldmVudFR5cGVzLCBbJ3Jlc2l6ZXN0YXJ0JywgJ3Jlc2l6ZW1vdmUnLCAncmVzaXplaW5lcnRpYXN0YXJ0JywgJ3Jlc2l6ZWluZXJ0aWFyZXN1bWUnLCAncmVzaXplZW5kJ10pO1xuYWN0aW9ucy5tZXRob2REaWN0LnJlc2l6ZSA9ICdyZXNpemFibGUnO1xuXG5kZWZhdWx0T3B0aW9ucy5yZXNpemUgPSByZXNpemUuZGVmYXVsdHM7XG5cbm1vZHVsZS5leHBvcnRzID0gcmVzaXplO1xuXG59LHtcIi4uL0ludGVyYWN0RXZlbnRcIjozLFwiLi4vSW50ZXJhY3RhYmxlXCI6NCxcIi4uL0ludGVyYWN0aW9uXCI6NSxcIi4uL2RlZmF1bHRPcHRpb25zXCI6MTgsXCIuLi91dGlsc1wiOjQ0LFwiLi4vdXRpbHMvYnJvd3NlclwiOjM2LFwiLi9iYXNlXCI6Nn1dLDExOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbid1c2Ugc3RyaWN0JztcblxudmFyIHJhZiA9IHJlcXVpcmUoJy4vdXRpbHMvcmFmJyk7XG52YXIgZ2V0V2luZG93ID0gcmVxdWlyZSgnLi91dGlscy93aW5kb3cnKS5nZXRXaW5kb3c7XG52YXIgaXMgPSByZXF1aXJlKCcuL3V0aWxzL2lzJyk7XG52YXIgZG9tVXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzL2RvbVV0aWxzJyk7XG52YXIgSW50ZXJhY3Rpb24gPSByZXF1aXJlKCcuL0ludGVyYWN0aW9uJyk7XG52YXIgZGVmYXVsdE9wdGlvbnMgPSByZXF1aXJlKCcuL2RlZmF1bHRPcHRpb25zJyk7XG5cbnZhciBhdXRvU2Nyb2xsID0ge1xuICBkZWZhdWx0czoge1xuICAgIGVuYWJsZWQ6IGZhbHNlLFxuICAgIGNvbnRhaW5lcjogbnVsbCwgLy8gdGhlIGl0ZW0gdGhhdCBpcyBzY3JvbGxlZCAoV2luZG93IG9yIEhUTUxFbGVtZW50KVxuICAgIG1hcmdpbjogNjAsXG4gICAgc3BlZWQ6IDMwMCAvLyB0aGUgc2Nyb2xsIHNwZWVkIGluIHBpeGVscyBwZXIgc2Vjb25kXG4gIH0sXG5cbiAgaW50ZXJhY3Rpb246IG51bGwsXG4gIGk6IG51bGwsIC8vIHRoZSBoYW5kbGUgcmV0dXJuZWQgYnkgd2luZG93LnNldEludGVydmFsXG4gIHg6IDAsIHk6IDAsIC8vIERpcmVjdGlvbiBlYWNoIHB1bHNlIGlzIHRvIHNjcm9sbCBpblxuXG4gIGlzU2Nyb2xsaW5nOiBmYWxzZSxcbiAgcHJldlRpbWU6IDAsXG5cbiAgc3RhcnQ6IGZ1bmN0aW9uIHN0YXJ0KGludGVyYWN0aW9uKSB7XG4gICAgYXV0b1Njcm9sbC5pc1Njcm9sbGluZyA9IHRydWU7XG4gICAgcmFmLmNhbmNlbChhdXRvU2Nyb2xsLmkpO1xuXG4gICAgYXV0b1Njcm9sbC5pbnRlcmFjdGlvbiA9IGludGVyYWN0aW9uO1xuICAgIGF1dG9TY3JvbGwucHJldlRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICBhdXRvU2Nyb2xsLmkgPSByYWYucmVxdWVzdChhdXRvU2Nyb2xsLnNjcm9sbCk7XG4gIH0sXG5cbiAgc3RvcDogZnVuY3Rpb24gc3RvcCgpIHtcbiAgICBhdXRvU2Nyb2xsLmlzU2Nyb2xsaW5nID0gZmFsc2U7XG4gICAgcmFmLmNhbmNlbChhdXRvU2Nyb2xsLmkpO1xuICB9LFxuXG4gIC8vIHNjcm9sbCB0aGUgd2luZG93IGJ5IHRoZSB2YWx1ZXMgaW4gc2Nyb2xsLngveVxuICBzY3JvbGw6IGZ1bmN0aW9uIHNjcm9sbCgpIHtcbiAgICB2YXIgb3B0aW9ucyA9IGF1dG9TY3JvbGwuaW50ZXJhY3Rpb24udGFyZ2V0Lm9wdGlvbnNbYXV0b1Njcm9sbC5pbnRlcmFjdGlvbi5wcmVwYXJlZC5uYW1lXS5hdXRvU2Nyb2xsO1xuICAgIHZhciBjb250YWluZXIgPSBvcHRpb25zLmNvbnRhaW5lciB8fCBnZXRXaW5kb3coYXV0b1Njcm9sbC5pbnRlcmFjdGlvbi5lbGVtZW50KTtcbiAgICB2YXIgbm93ID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgLy8gY2hhbmdlIGluIHRpbWUgaW4gc2Vjb25kc1xuICAgIHZhciBkdCA9IChub3cgLSBhdXRvU2Nyb2xsLnByZXZUaW1lKSAvIDEwMDA7XG4gICAgLy8gZGlzcGxhY2VtZW50XG4gICAgdmFyIHMgPSBvcHRpb25zLnNwZWVkICogZHQ7XG5cbiAgICBpZiAocyA+PSAxKSB7XG4gICAgICBpZiAoaXMud2luZG93KGNvbnRhaW5lcikpIHtcbiAgICAgICAgY29udGFpbmVyLnNjcm9sbEJ5KGF1dG9TY3JvbGwueCAqIHMsIGF1dG9TY3JvbGwueSAqIHMpO1xuICAgICAgfSBlbHNlIGlmIChjb250YWluZXIpIHtcbiAgICAgICAgY29udGFpbmVyLnNjcm9sbExlZnQgKz0gYXV0b1Njcm9sbC54ICogcztcbiAgICAgICAgY29udGFpbmVyLnNjcm9sbFRvcCArPSBhdXRvU2Nyb2xsLnkgKiBzO1xuICAgICAgfVxuXG4gICAgICBhdXRvU2Nyb2xsLnByZXZUaW1lID0gbm93O1xuICAgIH1cblxuICAgIGlmIChhdXRvU2Nyb2xsLmlzU2Nyb2xsaW5nKSB7XG4gICAgICByYWYuY2FuY2VsKGF1dG9TY3JvbGwuaSk7XG4gICAgICBhdXRvU2Nyb2xsLmkgPSByYWYucmVxdWVzdChhdXRvU2Nyb2xsLnNjcm9sbCk7XG4gICAgfVxuICB9LFxuICBjaGVjazogZnVuY3Rpb24gY2hlY2soaW50ZXJhY3RhYmxlLCBhY3Rpb25OYW1lKSB7XG4gICAgdmFyIG9wdGlvbnMgPSBpbnRlcmFjdGFibGUub3B0aW9ucztcblxuICAgIHJldHVybiBvcHRpb25zW2FjdGlvbk5hbWVdLmF1dG9TY3JvbGwgJiYgb3B0aW9uc1thY3Rpb25OYW1lXS5hdXRvU2Nyb2xsLmVuYWJsZWQ7XG4gIH0sXG4gIG9uSW50ZXJhY3Rpb25Nb3ZlOiBmdW5jdGlvbiBvbkludGVyYWN0aW9uTW92ZShfcmVmKSB7XG4gICAgdmFyIGludGVyYWN0aW9uID0gX3JlZi5pbnRlcmFjdGlvbixcbiAgICAgICAgcG9pbnRlciA9IF9yZWYucG9pbnRlcjtcblxuICAgIGlmICghKGludGVyYWN0aW9uLmludGVyYWN0aW5nKCkgJiYgYXV0b1Njcm9sbC5jaGVjayhpbnRlcmFjdGlvbi50YXJnZXQsIGludGVyYWN0aW9uLnByZXBhcmVkLm5hbWUpKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChpbnRlcmFjdGlvbi5zaW11bGF0aW9uKSB7XG4gICAgICBhdXRvU2Nyb2xsLnggPSBhdXRvU2Nyb2xsLnkgPSAwO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciB0b3AgPSB2b2lkIDA7XG4gICAgdmFyIHJpZ2h0ID0gdm9pZCAwO1xuICAgIHZhciBib3R0b20gPSB2b2lkIDA7XG4gICAgdmFyIGxlZnQgPSB2b2lkIDA7XG5cbiAgICB2YXIgb3B0aW9ucyA9IGludGVyYWN0aW9uLnRhcmdldC5vcHRpb25zW2ludGVyYWN0aW9uLnByZXBhcmVkLm5hbWVdLmF1dG9TY3JvbGw7XG4gICAgdmFyIGNvbnRhaW5lciA9IG9wdGlvbnMuY29udGFpbmVyIHx8IGdldFdpbmRvdyhpbnRlcmFjdGlvbi5lbGVtZW50KTtcblxuICAgIGlmIChpcy53aW5kb3coY29udGFpbmVyKSkge1xuICAgICAgbGVmdCA9IHBvaW50ZXIuY2xpZW50WCA8IGF1dG9TY3JvbGwubWFyZ2luO1xuICAgICAgdG9wID0gcG9pbnRlci5jbGllbnRZIDwgYXV0b1Njcm9sbC5tYXJnaW47XG4gICAgICByaWdodCA9IHBvaW50ZXIuY2xpZW50WCA+IGNvbnRhaW5lci5pbm5lcldpZHRoIC0gYXV0b1Njcm9sbC5tYXJnaW47XG4gICAgICBib3R0b20gPSBwb2ludGVyLmNsaWVudFkgPiBjb250YWluZXIuaW5uZXJIZWlnaHQgLSBhdXRvU2Nyb2xsLm1hcmdpbjtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHJlY3QgPSBkb21VdGlscy5nZXRFbGVtZW50Q2xpZW50UmVjdChjb250YWluZXIpO1xuXG4gICAgICBsZWZ0ID0gcG9pbnRlci5jbGllbnRYIDwgcmVjdC5sZWZ0ICsgYXV0b1Njcm9sbC5tYXJnaW47XG4gICAgICB0b3AgPSBwb2ludGVyLmNsaWVudFkgPCByZWN0LnRvcCArIGF1dG9TY3JvbGwubWFyZ2luO1xuICAgICAgcmlnaHQgPSBwb2ludGVyLmNsaWVudFggPiByZWN0LnJpZ2h0IC0gYXV0b1Njcm9sbC5tYXJnaW47XG4gICAgICBib3R0b20gPSBwb2ludGVyLmNsaWVudFkgPiByZWN0LmJvdHRvbSAtIGF1dG9TY3JvbGwubWFyZ2luO1xuICAgIH1cblxuICAgIGF1dG9TY3JvbGwueCA9IHJpZ2h0ID8gMSA6IGxlZnQgPyAtMSA6IDA7XG4gICAgYXV0b1Njcm9sbC55ID0gYm90dG9tID8gMSA6IHRvcCA/IC0xIDogMDtcblxuICAgIGlmICghYXV0b1Njcm9sbC5pc1Njcm9sbGluZykge1xuICAgICAgLy8gc2V0IHRoZSBhdXRvU2Nyb2xsIHByb3BlcnRpZXMgdG8gdGhvc2Ugb2YgdGhlIHRhcmdldFxuICAgICAgYXV0b1Njcm9sbC5tYXJnaW4gPSBvcHRpb25zLm1hcmdpbjtcbiAgICAgIGF1dG9TY3JvbGwuc3BlZWQgPSBvcHRpb25zLnNwZWVkO1xuXG4gICAgICBhdXRvU2Nyb2xsLnN0YXJ0KGludGVyYWN0aW9uKTtcbiAgICB9XG4gIH1cbn07XG5cbkludGVyYWN0aW9uLnNpZ25hbHMub24oJ3N0b3AtYWN0aXZlJywgZnVuY3Rpb24gKCkge1xuICBhdXRvU2Nyb2xsLnN0b3AoKTtcbn0pO1xuXG5JbnRlcmFjdGlvbi5zaWduYWxzLm9uKCdhY3Rpb24tbW92ZScsIGF1dG9TY3JvbGwub25JbnRlcmFjdGlvbk1vdmUpO1xuXG5kZWZhdWx0T3B0aW9ucy5wZXJBY3Rpb24uYXV0b1Njcm9sbCA9IGF1dG9TY3JvbGwuZGVmYXVsdHM7XG5cbm1vZHVsZS5leHBvcnRzID0gYXV0b1Njcm9sbDtcblxufSx7XCIuL0ludGVyYWN0aW9uXCI6NSxcIi4vZGVmYXVsdE9wdGlvbnNcIjoxOCxcIi4vdXRpbHMvZG9tVXRpbHNcIjozOSxcIi4vdXRpbHMvaXNcIjo0NixcIi4vdXRpbHMvcmFmXCI6NTAsXCIuL3V0aWxzL3dpbmRvd1wiOjUyfV0sMTI6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG4vKiogQGxlbmRzIEludGVyYWN0YWJsZSAqL1xudmFyIEludGVyYWN0YWJsZSA9IHJlcXVpcmUoJy4uL0ludGVyYWN0YWJsZScpO1xudmFyIGFjdGlvbnMgPSByZXF1aXJlKCcuLi9hY3Rpb25zL2Jhc2UnKTtcbnZhciBpcyA9IHJlcXVpcmUoJy4uL3V0aWxzL2lzJyk7XG52YXIgZG9tVXRpbHMgPSByZXF1aXJlKCcuLi91dGlscy9kb21VdGlscycpO1xuXG52YXIgX3JlcXVpcmUgPSByZXF1aXJlKCcuLi91dGlscycpLFxuICAgIHdhcm5PbmNlID0gX3JlcXVpcmUud2Fybk9uY2U7XG5cbkludGVyYWN0YWJsZS5wcm90b3R5cGUuZ2V0QWN0aW9uID0gZnVuY3Rpb24gKHBvaW50ZXIsIGV2ZW50LCBpbnRlcmFjdGlvbiwgZWxlbWVudCkge1xuICB2YXIgYWN0aW9uID0gdGhpcy5kZWZhdWx0QWN0aW9uQ2hlY2tlcihwb2ludGVyLCBldmVudCwgaW50ZXJhY3Rpb24sIGVsZW1lbnQpO1xuXG4gIGlmICh0aGlzLm9wdGlvbnMuYWN0aW9uQ2hlY2tlcikge1xuICAgIHJldHVybiB0aGlzLm9wdGlvbnMuYWN0aW9uQ2hlY2tlcihwb2ludGVyLCBldmVudCwgYWN0aW9uLCB0aGlzLCBlbGVtZW50LCBpbnRlcmFjdGlvbik7XG4gIH1cblxuICByZXR1cm4gYWN0aW9uO1xufTtcblxuLyoqXG4gKiBgYGBqc1xuICogaW50ZXJhY3QoZWxlbWVudCwgeyBpZ25vcmVGcm9tOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbm8tYWN0aW9uJykgfSk7XG4gKiAvLyBvclxuICogaW50ZXJhY3QoZWxlbWVudCkuaWdub3JlRnJvbSgnaW5wdXQsIHRleHRhcmVhLCBhJyk7XG4gKiBgYGBcbiAqIEBkZXByZWNhdGVkXG4gKiBJZiB0aGUgdGFyZ2V0IG9mIHRoZSBgbW91c2Vkb3duYCwgYHBvaW50ZXJkb3duYCBvciBgdG91Y2hzdGFydGAgZXZlbnQgb3IgYW55XG4gKiBvZiBpdCdzIHBhcmVudHMgbWF0Y2ggdGhlIGdpdmVuIENTUyBzZWxlY3RvciBvciBFbGVtZW50LCBub1xuICogZHJhZy9yZXNpemUvZ2VzdHVyZSBpcyBzdGFydGVkLlxuICpcbiAqIERvbid0IHVzZSB0aGlzIG1ldGhvZC4gSW5zdGVhZCBzZXQgdGhlIGBpZ25vcmVGcm9tYCBvcHRpb24gZm9yIGVhY2ggYWN0aW9uXG4gKiBvciBmb3IgYHBvaW50ZXJFdmVudHNgXG4gKlxuICogQGV4YW1wbGVcbiAqIGludGVyYWN0KHRhcmdldHQpXG4gKiAgIC5kcmFnZ2FibGUoe1xuICogICAgIGlnbm9yZUZyb206ICdpbnB1dCwgdGV4dGFyZWEsIGFbaHJlZl0nJyxcbiAqICAgfSlcbiAqICAgLnBvaW50ZXJFdmVudHMoe1xuICogICAgIGlnbm9yZUZyb206ICdbbm8tcG9pbnRlcl0nLFxuICogICB9KTtcbiAqXG4gKiBAcGFyYW0ge3N0cmluZyB8IEVsZW1lbnQgfCBudWxsfSBbbmV3VmFsdWVdIGEgQ1NTIHNlbGVjdG9yIHN0cmluZywgYW5cbiAqIEVsZW1lbnQgb3IgYG51bGxgIHRvIG5vdCBpZ25vcmUgYW55IGVsZW1lbnRzXG4gKiBAcmV0dXJuIHtzdHJpbmcgfCBFbGVtZW50IHwgb2JqZWN0fSBUaGUgY3VycmVudCBpZ25vcmVGcm9tIHZhbHVlIG9yIHRoaXNcbiAqIEludGVyYWN0YWJsZVxuICovXG5JbnRlcmFjdGFibGUucHJvdG90eXBlLmlnbm9yZUZyb20gPSB3YXJuT25jZShmdW5jdGlvbiAobmV3VmFsdWUpIHtcbiAgcmV0dXJuIHRoaXMuX2JhY2tDb21wYXRPcHRpb24oJ2lnbm9yZUZyb20nLCBuZXdWYWx1ZSk7XG59LCAnSW50ZXJhY3RhYmxlLmlnbm9yZUZvcm0oKSBoYXMgYmVlbiBkZXByZWNhdGVkLiBVc2UgSW50ZXJhY3RibGUuZHJhZ2dhYmxlKHtpZ25vcmVGcm9tOiBuZXdWYWx1ZX0pLicpO1xuXG4vKipcbiAqIGBgYGpzXG4gKlxuICogQGRlcHJlY2F0ZWRcbiAqIEEgZHJhZy9yZXNpemUvZ2VzdHVyZSBpcyBzdGFydGVkIG9ubHkgSWYgdGhlIHRhcmdldCBvZiB0aGUgYG1vdXNlZG93bmAsXG4gKiBgcG9pbnRlcmRvd25gIG9yIGB0b3VjaHN0YXJ0YCBldmVudCBvciBhbnkgb2YgaXQncyBwYXJlbnRzIG1hdGNoIHRoZSBnaXZlblxuICogQ1NTIHNlbGVjdG9yIG9yIEVsZW1lbnQuXG4gKlxuICogRG9uJ3QgdXNlIHRoaXMgbWV0aG9kLiBJbnN0ZWFkIHNldCB0aGUgYGFsbG93RnJvbWAgb3B0aW9uIGZvciBlYWNoIGFjdGlvblxuICogb3IgZm9yIGBwb2ludGVyRXZlbnRzYFxuICpcbiAqIEBleGFtcGxlXG4gKiBpbnRlcmFjdCh0YXJnZXR0KVxuICogICAucmVzaXphYmxlKHtcbiAqICAgICBhbGxvd0Zyb206ICcucmVzaXplLWhhbmRsZScsXG4gKiAgIC5wb2ludGVyRXZlbnRzKHtcbiAqICAgICBhbGxvd0Zyb206ICcuaGFuZGxlJywsXG4gKiAgIH0pO1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nIHwgRWxlbWVudCB8IG51bGx9IFtuZXdWYWx1ZV0gYSBDU1Mgc2VsZWN0b3Igc3RyaW5nLCBhblxuICogRWxlbWVudCBvciBgbnVsbGAgdG8gYWxsb3cgZnJvbSBhbnkgZWxlbWVudFxuICogQHJldHVybiB7c3RyaW5nIHwgRWxlbWVudCB8IG9iamVjdH0gVGhlIGN1cnJlbnQgYWxsb3dGcm9tIHZhbHVlIG9yIHRoaXNcbiAqIEludGVyYWN0YWJsZVxuICovXG5JbnRlcmFjdGFibGUucHJvdG90eXBlLmFsbG93RnJvbSA9IHdhcm5PbmNlKGZ1bmN0aW9uIChuZXdWYWx1ZSkge1xuICByZXR1cm4gdGhpcy5fYmFja0NvbXBhdE9wdGlvbignYWxsb3dGcm9tJywgbmV3VmFsdWUpO1xufSwgJ0ludGVyYWN0YWJsZS5hbGxvd0Zvcm0oKSBoYXMgYmVlbiBkZXByZWNhdGVkLiBVc2UgSW50ZXJhY3RibGUuZHJhZ2dhYmxlKHthbGxvd0Zyb206IG5ld1ZhbHVlfSkuJyk7XG5cbkludGVyYWN0YWJsZS5wcm90b3R5cGUudGVzdElnbm9yZSA9IGZ1bmN0aW9uIChpZ25vcmVGcm9tLCBpbnRlcmFjdGFibGVFbGVtZW50LCBlbGVtZW50KSB7XG4gIGlmICghaWdub3JlRnJvbSB8fCAhaXMuZWxlbWVudChlbGVtZW50KSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlmIChpcy5zdHJpbmcoaWdub3JlRnJvbSkpIHtcbiAgICByZXR1cm4gZG9tVXRpbHMubWF0Y2hlc1VwVG8oZWxlbWVudCwgaWdub3JlRnJvbSwgaW50ZXJhY3RhYmxlRWxlbWVudCk7XG4gIH0gZWxzZSBpZiAoaXMuZWxlbWVudChpZ25vcmVGcm9tKSkge1xuICAgIHJldHVybiBkb21VdGlscy5ub2RlQ29udGFpbnMoaWdub3JlRnJvbSwgZWxlbWVudCk7XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59O1xuXG5JbnRlcmFjdGFibGUucHJvdG90eXBlLnRlc3RBbGxvdyA9IGZ1bmN0aW9uIChhbGxvd0Zyb20sIGludGVyYWN0YWJsZUVsZW1lbnQsIGVsZW1lbnQpIHtcbiAgaWYgKCFhbGxvd0Zyb20pIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGlmICghaXMuZWxlbWVudChlbGVtZW50KSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlmIChpcy5zdHJpbmcoYWxsb3dGcm9tKSkge1xuICAgIHJldHVybiBkb21VdGlscy5tYXRjaGVzVXBUbyhlbGVtZW50LCBhbGxvd0Zyb20sIGludGVyYWN0YWJsZUVsZW1lbnQpO1xuICB9IGVsc2UgaWYgKGlzLmVsZW1lbnQoYWxsb3dGcm9tKSkge1xuICAgIHJldHVybiBkb21VdGlscy5ub2RlQ29udGFpbnMoYWxsb3dGcm9tLCBlbGVtZW50KTtcbiAgfVxuXG4gIHJldHVybiBmYWxzZTtcbn07XG5cbkludGVyYWN0YWJsZS5wcm90b3R5cGUudGVzdElnbm9yZUFsbG93ID0gZnVuY3Rpb24gKG9wdGlvbnMsIGludGVyYWN0YWJsZUVsZW1lbnQsIGV2ZW50VGFyZ2V0KSB7XG4gIHJldHVybiAhdGhpcy50ZXN0SWdub3JlKG9wdGlvbnMuaWdub3JlRnJvbSwgaW50ZXJhY3RhYmxlRWxlbWVudCwgZXZlbnRUYXJnZXQpICYmIHRoaXMudGVzdEFsbG93KG9wdGlvbnMuYWxsb3dGcm9tLCBpbnRlcmFjdGFibGVFbGVtZW50LCBldmVudFRhcmdldCk7XG59O1xuXG4vKipcbiAqIGBgYGpzXG4gKiBpbnRlcmFjdCgnLnJlc2l6ZS1kcmFnJylcbiAqICAgLnJlc2l6YWJsZSh0cnVlKVxuICogICAuZHJhZ2dhYmxlKHRydWUpXG4gKiAgIC5hY3Rpb25DaGVja2VyKGZ1bmN0aW9uIChwb2ludGVyLCBldmVudCwgYWN0aW9uLCBpbnRlcmFjdGFibGUsIGVsZW1lbnQsIGludGVyYWN0aW9uKSB7XG4gKlxuICogICBpZiAoaW50ZXJhY3QubWF0Y2hlc1NlbGVjdG9yKGV2ZW50LnRhcmdldCwgJy5kcmFnLWhhbmRsZScpIHtcbiAqICAgICAvLyBmb3JjZSBkcmFnIHdpdGggaGFuZGxlIHRhcmdldFxuICogICAgIGFjdGlvbi5uYW1lID0gZHJhZztcbiAqICAgfVxuICogICBlbHNlIHtcbiAqICAgICAvLyByZXNpemUgZnJvbSB0aGUgdG9wIGFuZCByaWdodCBlZGdlc1xuICogICAgIGFjdGlvbi5uYW1lICA9ICdyZXNpemUnO1xuICogICAgIGFjdGlvbi5lZGdlcyA9IHsgdG9wOiB0cnVlLCByaWdodDogdHJ1ZSB9O1xuICogICB9XG4gKlxuICogICByZXR1cm4gYWN0aW9uO1xuICogfSk7XG4gKiBgYGBcbiAqXG4gKiBHZXRzIG9yIHNldHMgdGhlIGZ1bmN0aW9uIHVzZWQgdG8gY2hlY2sgYWN0aW9uIHRvIGJlIHBlcmZvcm1lZCBvblxuICogcG9pbnRlckRvd25cbiAqXG4gKiBAcGFyYW0ge2Z1bmN0aW9uIHwgbnVsbH0gW2NoZWNrZXJdIEEgZnVuY3Rpb24gd2hpY2ggdGFrZXMgYSBwb2ludGVyIGV2ZW50LFxuICogZGVmYXVsdEFjdGlvbiBzdHJpbmcsIGludGVyYWN0YWJsZSwgZWxlbWVudCBhbmQgaW50ZXJhY3Rpb24gYXMgcGFyYW1ldGVyc1xuICogYW5kIHJldHVybnMgYW4gb2JqZWN0IHdpdGggbmFtZSBwcm9wZXJ0eSAnZHJhZycgJ3Jlc2l6ZScgb3IgJ2dlc3R1cmUnIGFuZFxuICogb3B0aW9uYWxseSBhbiBgZWRnZXNgIG9iamVjdCB3aXRoIGJvb2xlYW4gJ3RvcCcsICdsZWZ0JywgJ2JvdHRvbScgYW5kIHJpZ2h0XG4gKiBwcm9wcy5cbiAqIEByZXR1cm4ge0Z1bmN0aW9uIHwgSW50ZXJhY3RhYmxlfSBUaGUgY2hlY2tlciBmdW5jdGlvbiBvciB0aGlzIEludGVyYWN0YWJsZVxuICovXG5JbnRlcmFjdGFibGUucHJvdG90eXBlLmFjdGlvbkNoZWNrZXIgPSBmdW5jdGlvbiAoY2hlY2tlcikge1xuICBpZiAoaXMuZnVuY3Rpb24oY2hlY2tlcikpIHtcbiAgICB0aGlzLm9wdGlvbnMuYWN0aW9uQ2hlY2tlciA9IGNoZWNrZXI7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGlmIChjaGVja2VyID09PSBudWxsKSB7XG4gICAgZGVsZXRlIHRoaXMub3B0aW9ucy5hY3Rpb25DaGVja2VyO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICByZXR1cm4gdGhpcy5vcHRpb25zLmFjdGlvbkNoZWNrZXI7XG59O1xuXG4vKipcbiAqIFJldHVybnMgb3Igc2V0cyB3aGV0aGVyIHRoZSB0aGUgY3Vyc29yIHNob3VsZCBiZSBjaGFuZ2VkIGRlcGVuZGluZyBvbiB0aGVcbiAqIGFjdGlvbiB0aGF0IHdvdWxkIGJlIHBlcmZvcm1lZCBpZiB0aGUgbW91c2Ugd2VyZSBwcmVzc2VkIGFuZCBkcmFnZ2VkLlxuICpcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW25ld1ZhbHVlXVxuICogQHJldHVybiB7Ym9vbGVhbiB8IEludGVyYWN0YWJsZX0gVGhlIGN1cnJlbnQgc2V0dGluZyBvciB0aGlzIEludGVyYWN0YWJsZVxuICovXG5JbnRlcmFjdGFibGUucHJvdG90eXBlLnN0eWxlQ3Vyc29yID0gZnVuY3Rpb24gKG5ld1ZhbHVlKSB7XG4gIGlmIChpcy5ib29sKG5ld1ZhbHVlKSkge1xuICAgIHRoaXMub3B0aW9ucy5zdHlsZUN1cnNvciA9IG5ld1ZhbHVlO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBpZiAobmV3VmFsdWUgPT09IG51bGwpIHtcbiAgICBkZWxldGUgdGhpcy5vcHRpb25zLnN0eWxlQ3Vyc29yO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICByZXR1cm4gdGhpcy5vcHRpb25zLnN0eWxlQ3Vyc29yO1xufTtcblxuSW50ZXJhY3RhYmxlLnByb3RvdHlwZS5kZWZhdWx0QWN0aW9uQ2hlY2tlciA9IGZ1bmN0aW9uIChwb2ludGVyLCBldmVudCwgaW50ZXJhY3Rpb24sIGVsZW1lbnQpIHtcbiAgdmFyIHJlY3QgPSB0aGlzLmdldFJlY3QoZWxlbWVudCk7XG4gIHZhciBidXR0b25zID0gZXZlbnQuYnV0dG9ucyB8fCB7XG4gICAgMDogMSxcbiAgICAxOiA0LFxuICAgIDM6IDgsXG4gICAgNDogMTZcbiAgfVtldmVudC5idXR0b25dO1xuICB2YXIgYWN0aW9uID0gbnVsbDtcblxuICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYWN0aW9ucy5uYW1lcy5sZW5ndGg7IF9pKyspIHtcbiAgICB2YXIgX3JlZjtcblxuICAgIF9yZWYgPSBhY3Rpb25zLm5hbWVzW19pXTtcbiAgICB2YXIgYWN0aW9uTmFtZSA9IF9yZWY7XG5cbiAgICAvLyBjaGVjayBtb3VzZUJ1dHRvbiBzZXR0aW5nIGlmIHRoZSBwb2ludGVyIGlzIGRvd25cbiAgICBpZiAoaW50ZXJhY3Rpb24ucG9pbnRlcklzRG93biAmJiAvbW91c2V8cG9pbnRlci8udGVzdChpbnRlcmFjdGlvbi5wb2ludGVyVHlwZSkgJiYgKGJ1dHRvbnMgJiB0aGlzLm9wdGlvbnNbYWN0aW9uTmFtZV0ubW91c2VCdXR0b25zKSA9PT0gMCkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgYWN0aW9uID0gYWN0aW9uc1thY3Rpb25OYW1lXS5jaGVja2VyKHBvaW50ZXIsIGV2ZW50LCB0aGlzLCBlbGVtZW50LCBpbnRlcmFjdGlvbiwgcmVjdCk7XG5cbiAgICBpZiAoYWN0aW9uKSB7XG4gICAgICByZXR1cm4gYWN0aW9uO1xuICAgIH1cbiAgfVxufTtcblxufSx7XCIuLi9JbnRlcmFjdGFibGVcIjo0LFwiLi4vYWN0aW9ucy9iYXNlXCI6NixcIi4uL3V0aWxzXCI6NDQsXCIuLi91dGlscy9kb21VdGlsc1wiOjM5LFwiLi4vdXRpbHMvaXNcIjo0Nn1dLDEzOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbid1c2Ugc3RyaWN0JztcblxudmFyIGludGVyYWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJhY3QnKTtcbnZhciBJbnRlcmFjdGFibGUgPSByZXF1aXJlKCcuLi9JbnRlcmFjdGFibGUnKTtcbnZhciBJbnRlcmFjdGlvbiA9IHJlcXVpcmUoJy4uL0ludGVyYWN0aW9uJyk7XG52YXIgYWN0aW9ucyA9IHJlcXVpcmUoJy4uL2FjdGlvbnMvYmFzZScpO1xudmFyIGRlZmF1bHRPcHRpb25zID0gcmVxdWlyZSgnLi4vZGVmYXVsdE9wdGlvbnMnKTtcbnZhciBzY29wZSA9IHJlcXVpcmUoJy4uL3Njb3BlJyk7XG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpO1xudmFyIHNpZ25hbHMgPSByZXF1aXJlKCcuLi91dGlscy9TaWduYWxzJykubmV3KCk7XG5cbnJlcXVpcmUoJy4vSW50ZXJhY3RhYmxlTWV0aG9kcycpO1xuXG52YXIgYXV0b1N0YXJ0ID0ge1xuICBzaWduYWxzOiBzaWduYWxzLFxuICB3aXRoaW5JbnRlcmFjdGlvbkxpbWl0OiB3aXRoaW5JbnRlcmFjdGlvbkxpbWl0LFxuICAvLyBBbGxvdyB0aGlzIG1hbnkgaW50ZXJhY3Rpb25zIHRvIGhhcHBlbiBzaW11bHRhbmVvdXNseVxuICBtYXhJbnRlcmFjdGlvbnM6IEluZmluaXR5LFxuICBkZWZhdWx0czoge1xuICAgIHBlckFjdGlvbjoge1xuICAgICAgbWFudWFsU3RhcnQ6IGZhbHNlLFxuICAgICAgbWF4OiBJbmZpbml0eSxcbiAgICAgIG1heFBlckVsZW1lbnQ6IDEsXG4gICAgICBhbGxvd0Zyb206IG51bGwsXG4gICAgICBpZ25vcmVGcm9tOiBudWxsLFxuXG4gICAgICAvLyBvbmx5IGFsbG93IGxlZnQgYnV0dG9uIGJ5IGRlZmF1bHRcbiAgICAgIC8vIHNlZSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvTW91c2VFdmVudC9idXR0b25zI1JldHVybl92YWx1ZVxuICAgICAgbW91c2VCdXR0b25zOiAxXG4gICAgfVxuICB9LFxuICBzZXRBY3Rpb25EZWZhdWx0czogZnVuY3Rpb24gc2V0QWN0aW9uRGVmYXVsdHMoYWN0aW9uKSB7XG4gICAgdXRpbHMuZXh0ZW5kKGFjdGlvbi5kZWZhdWx0cywgYXV0b1N0YXJ0LmRlZmF1bHRzLnBlckFjdGlvbik7XG4gIH0sXG4gIHZhbGlkYXRlQWN0aW9uOiB2YWxpZGF0ZUFjdGlvblxufTtcblxuLy8gc2V0IGN1cnNvciBzdHlsZSBvbiBtb3VzZWRvd25cbkludGVyYWN0aW9uLnNpZ25hbHMub24oJ2Rvd24nLCBmdW5jdGlvbiAoX3JlZikge1xuICB2YXIgaW50ZXJhY3Rpb24gPSBfcmVmLmludGVyYWN0aW9uLFxuICAgICAgcG9pbnRlciA9IF9yZWYucG9pbnRlcixcbiAgICAgIGV2ZW50ID0gX3JlZi5ldmVudCxcbiAgICAgIGV2ZW50VGFyZ2V0ID0gX3JlZi5ldmVudFRhcmdldDtcblxuICBpZiAoaW50ZXJhY3Rpb24uaW50ZXJhY3RpbmcoKSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHZhciBhY3Rpb25JbmZvID0gZ2V0QWN0aW9uSW5mbyhpbnRlcmFjdGlvbiwgcG9pbnRlciwgZXZlbnQsIGV2ZW50VGFyZ2V0KTtcbiAgcHJlcGFyZShpbnRlcmFjdGlvbiwgYWN0aW9uSW5mbyk7XG59KTtcblxuLy8gc2V0IGN1cnNvciBzdHlsZSBvbiBtb3VzZW1vdmVcbkludGVyYWN0aW9uLnNpZ25hbHMub24oJ21vdmUnLCBmdW5jdGlvbiAoX3JlZjIpIHtcbiAgdmFyIGludGVyYWN0aW9uID0gX3JlZjIuaW50ZXJhY3Rpb24sXG4gICAgICBwb2ludGVyID0gX3JlZjIucG9pbnRlcixcbiAgICAgIGV2ZW50ID0gX3JlZjIuZXZlbnQsXG4gICAgICBldmVudFRhcmdldCA9IF9yZWYyLmV2ZW50VGFyZ2V0O1xuXG4gIGlmIChpbnRlcmFjdGlvbi5wb2ludGVyVHlwZSAhPT0gJ21vdXNlJyB8fCBpbnRlcmFjdGlvbi5wb2ludGVySXNEb3duIHx8IGludGVyYWN0aW9uLmludGVyYWN0aW5nKCkpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgYWN0aW9uSW5mbyA9IGdldEFjdGlvbkluZm8oaW50ZXJhY3Rpb24sIHBvaW50ZXIsIGV2ZW50LCBldmVudFRhcmdldCk7XG4gIHByZXBhcmUoaW50ZXJhY3Rpb24sIGFjdGlvbkluZm8pO1xufSk7XG5cbkludGVyYWN0aW9uLnNpZ25hbHMub24oJ21vdmUnLCBmdW5jdGlvbiAoYXJnKSB7XG4gIHZhciBpbnRlcmFjdGlvbiA9IGFyZy5pbnRlcmFjdGlvbixcbiAgICAgIGV2ZW50ID0gYXJnLmV2ZW50O1xuXG5cbiAgaWYgKCFpbnRlcmFjdGlvbi5wb2ludGVySXNEb3duIHx8IGludGVyYWN0aW9uLmludGVyYWN0aW5nKCkgfHwgIWludGVyYWN0aW9uLnBvaW50ZXJXYXNNb3ZlZCB8fCAhaW50ZXJhY3Rpb24ucHJlcGFyZWQubmFtZSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHNpZ25hbHMuZmlyZSgnYmVmb3JlLXN0YXJ0JywgYXJnKTtcblxuICB2YXIgdGFyZ2V0ID0gaW50ZXJhY3Rpb24udGFyZ2V0O1xuXG4gIGlmIChpbnRlcmFjdGlvbi5wcmVwYXJlZC5uYW1lICYmIHRhcmdldCkge1xuICAgIC8vIGNoZWNrIG1hbnVhbFN0YXJ0IGFuZCBpbnRlcmFjdGlvbiBsaW1pdFxuICAgIGlmICh0YXJnZXQub3B0aW9uc1tpbnRlcmFjdGlvbi5wcmVwYXJlZC5uYW1lXS5tYW51YWxTdGFydCB8fCAhd2l0aGluSW50ZXJhY3Rpb25MaW1pdCh0YXJnZXQsIGludGVyYWN0aW9uLmVsZW1lbnQsIGludGVyYWN0aW9uLnByZXBhcmVkKSkge1xuICAgICAgaW50ZXJhY3Rpb24uc3RvcChldmVudCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGludGVyYWN0aW9uLnN0YXJ0KGludGVyYWN0aW9uLnByZXBhcmVkLCB0YXJnZXQsIGludGVyYWN0aW9uLmVsZW1lbnQpO1xuICAgIH1cbiAgfVxufSk7XG5cbi8vIENoZWNrIGlmIHRoZSBjdXJyZW50IHRhcmdldCBzdXBwb3J0cyB0aGUgYWN0aW9uLlxuLy8gSWYgc28sIHJldHVybiB0aGUgdmFsaWRhdGVkIGFjdGlvbi4gT3RoZXJ3aXNlLCByZXR1cm4gbnVsbFxuZnVuY3Rpb24gdmFsaWRhdGVBY3Rpb24oYWN0aW9uLCBpbnRlcmFjdGFibGUsIGVsZW1lbnQsIGV2ZW50VGFyZ2V0KSB7XG4gIGlmICh1dGlscy5pcy5vYmplY3QoYWN0aW9uKSAmJiBpbnRlcmFjdGFibGUudGVzdElnbm9yZUFsbG93KGludGVyYWN0YWJsZS5vcHRpb25zW2FjdGlvbi5uYW1lXSwgZWxlbWVudCwgZXZlbnRUYXJnZXQpICYmIGludGVyYWN0YWJsZS5vcHRpb25zW2FjdGlvbi5uYW1lXS5lbmFibGVkICYmIHdpdGhpbkludGVyYWN0aW9uTGltaXQoaW50ZXJhY3RhYmxlLCBlbGVtZW50LCBhY3Rpb24pKSB7XG4gICAgcmV0dXJuIGFjdGlvbjtcbiAgfVxuXG4gIHJldHVybiBudWxsO1xufVxuXG5mdW5jdGlvbiB2YWxpZGF0ZVNlbGVjdG9yKGludGVyYWN0aW9uLCBwb2ludGVyLCBldmVudCwgbWF0Y2hlcywgbWF0Y2hFbGVtZW50cywgZXZlbnRUYXJnZXQpIHtcbiAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IG1hdGNoZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICB2YXIgbWF0Y2ggPSBtYXRjaGVzW2ldO1xuICAgIHZhciBtYXRjaEVsZW1lbnQgPSBtYXRjaEVsZW1lbnRzW2ldO1xuICAgIHZhciBhY3Rpb24gPSB2YWxpZGF0ZUFjdGlvbihtYXRjaC5nZXRBY3Rpb24ocG9pbnRlciwgZXZlbnQsIGludGVyYWN0aW9uLCBtYXRjaEVsZW1lbnQpLCBtYXRjaCwgbWF0Y2hFbGVtZW50LCBldmVudFRhcmdldCk7XG5cbiAgICBpZiAoYWN0aW9uKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBhY3Rpb246IGFjdGlvbixcbiAgICAgICAgdGFyZ2V0OiBtYXRjaCxcbiAgICAgICAgZWxlbWVudDogbWF0Y2hFbGVtZW50XG4gICAgICB9O1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7fTtcbn1cblxuZnVuY3Rpb24gZ2V0QWN0aW9uSW5mbyhpbnRlcmFjdGlvbiwgcG9pbnRlciwgZXZlbnQsIGV2ZW50VGFyZ2V0KSB7XG4gIHZhciBtYXRjaGVzID0gW107XG4gIHZhciBtYXRjaEVsZW1lbnRzID0gW107XG5cbiAgdmFyIGVsZW1lbnQgPSBldmVudFRhcmdldDtcblxuICBmdW5jdGlvbiBwdXNoTWF0Y2hlcyhpbnRlcmFjdGFibGUpIHtcbiAgICBtYXRjaGVzLnB1c2goaW50ZXJhY3RhYmxlKTtcbiAgICBtYXRjaEVsZW1lbnRzLnB1c2goZWxlbWVudCk7XG4gIH1cblxuICB3aGlsZSAodXRpbHMuaXMuZWxlbWVudChlbGVtZW50KSkge1xuICAgIG1hdGNoZXMgPSBbXTtcbiAgICBtYXRjaEVsZW1lbnRzID0gW107XG5cbiAgICBzY29wZS5pbnRlcmFjdGFibGVzLmZvckVhY2hNYXRjaChlbGVtZW50LCBwdXNoTWF0Y2hlcyk7XG5cbiAgICB2YXIgYWN0aW9uSW5mbyA9IHZhbGlkYXRlU2VsZWN0b3IoaW50ZXJhY3Rpb24sIHBvaW50ZXIsIGV2ZW50LCBtYXRjaGVzLCBtYXRjaEVsZW1lbnRzLCBldmVudFRhcmdldCk7XG5cbiAgICBpZiAoYWN0aW9uSW5mby5hY3Rpb24gJiYgIWFjdGlvbkluZm8udGFyZ2V0Lm9wdGlvbnNbYWN0aW9uSW5mby5hY3Rpb24ubmFtZV0ubWFudWFsU3RhcnQpIHtcbiAgICAgIHJldHVybiBhY3Rpb25JbmZvO1xuICAgIH1cblxuICAgIGVsZW1lbnQgPSB1dGlscy5wYXJlbnROb2RlKGVsZW1lbnQpO1xuICB9XG5cbiAgcmV0dXJuIHt9O1xufVxuXG5mdW5jdGlvbiBwcmVwYXJlKGludGVyYWN0aW9uLCBfcmVmMykge1xuICB2YXIgYWN0aW9uID0gX3JlZjMuYWN0aW9uLFxuICAgICAgdGFyZ2V0ID0gX3JlZjMudGFyZ2V0LFxuICAgICAgZWxlbWVudCA9IF9yZWYzLmVsZW1lbnQ7XG5cbiAgYWN0aW9uID0gYWN0aW9uIHx8IHt9O1xuXG4gIGlmIChpbnRlcmFjdGlvbi50YXJnZXQgJiYgaW50ZXJhY3Rpb24udGFyZ2V0Lm9wdGlvbnMuc3R5bGVDdXJzb3IpIHtcbiAgICBpbnRlcmFjdGlvbi50YXJnZXQuX2RvYy5kb2N1bWVudEVsZW1lbnQuc3R5bGUuY3Vyc29yID0gJyc7XG4gIH1cblxuICBpbnRlcmFjdGlvbi50YXJnZXQgPSB0YXJnZXQ7XG4gIGludGVyYWN0aW9uLmVsZW1lbnQgPSBlbGVtZW50O1xuICB1dGlscy5jb3B5QWN0aW9uKGludGVyYWN0aW9uLnByZXBhcmVkLCBhY3Rpb24pO1xuXG4gIGlmICh0YXJnZXQgJiYgdGFyZ2V0Lm9wdGlvbnMuc3R5bGVDdXJzb3IpIHtcbiAgICB2YXIgY3Vyc29yID0gYWN0aW9uID8gYWN0aW9uc1thY3Rpb24ubmFtZV0uZ2V0Q3Vyc29yKGFjdGlvbikgOiAnJztcbiAgICBpbnRlcmFjdGlvbi50YXJnZXQuX2RvYy5kb2N1bWVudEVsZW1lbnQuc3R5bGUuY3Vyc29yID0gY3Vyc29yO1xuICB9XG5cbiAgc2lnbmFscy5maXJlKCdwcmVwYXJlZCcsIHsgaW50ZXJhY3Rpb246IGludGVyYWN0aW9uIH0pO1xufVxuXG5JbnRlcmFjdGlvbi5zaWduYWxzLm9uKCdzdG9wJywgZnVuY3Rpb24gKF9yZWY0KSB7XG4gIHZhciBpbnRlcmFjdGlvbiA9IF9yZWY0LmludGVyYWN0aW9uO1xuXG4gIHZhciB0YXJnZXQgPSBpbnRlcmFjdGlvbi50YXJnZXQ7XG5cbiAgaWYgKHRhcmdldCAmJiB0YXJnZXQub3B0aW9ucy5zdHlsZUN1cnNvcikge1xuICAgIHRhcmdldC5fZG9jLmRvY3VtZW50RWxlbWVudC5zdHlsZS5jdXJzb3IgPSAnJztcbiAgfVxufSk7XG5cbmZ1bmN0aW9uIHdpdGhpbkludGVyYWN0aW9uTGltaXQoaW50ZXJhY3RhYmxlLCBlbGVtZW50LCBhY3Rpb24pIHtcbiAgdmFyIG9wdGlvbnMgPSBpbnRlcmFjdGFibGUub3B0aW9ucztcbiAgdmFyIG1heEFjdGlvbnMgPSBvcHRpb25zW2FjdGlvbi5uYW1lXS5tYXg7XG4gIHZhciBtYXhQZXJFbGVtZW50ID0gb3B0aW9uc1thY3Rpb24ubmFtZV0ubWF4UGVyRWxlbWVudDtcbiAgdmFyIGFjdGl2ZUludGVyYWN0aW9ucyA9IDA7XG4gIHZhciB0YXJnZXRDb3VudCA9IDA7XG4gIHZhciB0YXJnZXRFbGVtZW50Q291bnQgPSAwO1xuXG4gIC8vIG5vIGFjdGlvbnMgaWYgYW55IG9mIHRoZXNlIHZhbHVlcyA9PSAwXG4gIGlmICghKG1heEFjdGlvbnMgJiYgbWF4UGVyRWxlbWVudCAmJiBhdXRvU3RhcnQubWF4SW50ZXJhY3Rpb25zKSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGZvciAodmFyIF9pID0gMDsgX2kgPCBzY29wZS5pbnRlcmFjdGlvbnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgdmFyIF9yZWY1O1xuXG4gICAgX3JlZjUgPSBzY29wZS5pbnRlcmFjdGlvbnNbX2ldO1xuICAgIHZhciBpbnRlcmFjdGlvbiA9IF9yZWY1O1xuXG4gICAgdmFyIG90aGVyQWN0aW9uID0gaW50ZXJhY3Rpb24ucHJlcGFyZWQubmFtZTtcblxuICAgIGlmICghaW50ZXJhY3Rpb24uaW50ZXJhY3RpbmcoKSkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgYWN0aXZlSW50ZXJhY3Rpb25zKys7XG5cbiAgICBpZiAoYWN0aXZlSW50ZXJhY3Rpb25zID49IGF1dG9TdGFydC5tYXhJbnRlcmFjdGlvbnMpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAoaW50ZXJhY3Rpb24udGFyZ2V0ICE9PSBpbnRlcmFjdGFibGUpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIHRhcmdldENvdW50ICs9IG90aGVyQWN0aW9uID09PSBhY3Rpb24ubmFtZSB8IDA7XG5cbiAgICBpZiAodGFyZ2V0Q291bnQgPj0gbWF4QWN0aW9ucykge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlmIChpbnRlcmFjdGlvbi5lbGVtZW50ID09PSBlbGVtZW50KSB7XG4gICAgICB0YXJnZXRFbGVtZW50Q291bnQrKztcblxuICAgICAgaWYgKG90aGVyQWN0aW9uICE9PSBhY3Rpb24ubmFtZSB8fCB0YXJnZXRFbGVtZW50Q291bnQgPj0gbWF4UGVyRWxlbWVudCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGF1dG9TdGFydC5tYXhJbnRlcmFjdGlvbnMgPiAwO1xufVxuXG4vKipcbiAqIFJldHVybnMgb3Igc2V0cyB0aGUgbWF4aW11bSBudW1iZXIgb2YgY29uY3VycmVudCBpbnRlcmFjdGlvbnMgYWxsb3dlZC4gIEJ5XG4gKiBkZWZhdWx0IG9ubHkgMSBpbnRlcmFjdGlvbiBpcyBhbGxvd2VkIGF0IGEgdGltZSAoZm9yIGJhY2t3YXJkc1xuICogY29tcGF0aWJpbGl0eSkuIFRvIGFsbG93IG11bHRpcGxlIGludGVyYWN0aW9ucyBvbiB0aGUgc2FtZSBJbnRlcmFjdGFibGVzIGFuZFxuICogZWxlbWVudHMsIHlvdSBuZWVkIHRvIGVuYWJsZSBpdCBpbiB0aGUgZHJhZ2dhYmxlLCByZXNpemFibGUgYW5kIGdlc3R1cmFibGVcbiAqIGAnbWF4J2AgYW5kIGAnbWF4UGVyRWxlbWVudCdgIG9wdGlvbnMuXG4gKlxuICogQGFsaWFzIG1vZHVsZTppbnRlcmFjdC5tYXhJbnRlcmFjdGlvbnNcbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gW25ld1ZhbHVlXSBBbnkgbnVtYmVyLiBuZXdWYWx1ZSA8PSAwIG1lYW5zIG5vIGludGVyYWN0aW9ucy5cbiAqL1xuaW50ZXJhY3QubWF4SW50ZXJhY3Rpb25zID0gZnVuY3Rpb24gKG5ld1ZhbHVlKSB7XG4gIGlmICh1dGlscy5pcy5udW1iZXIobmV3VmFsdWUpKSB7XG4gICAgYXV0b1N0YXJ0Lm1heEludGVyYWN0aW9ucyA9IG5ld1ZhbHVlO1xuXG4gICAgcmV0dXJuIGludGVyYWN0O1xuICB9XG5cbiAgcmV0dXJuIGF1dG9TdGFydC5tYXhJbnRlcmFjdGlvbnM7XG59O1xuXG5JbnRlcmFjdGFibGUuc2V0dGluZ3NNZXRob2RzLnB1c2goJ3N0eWxlQ3Vyc29yJyk7XG5JbnRlcmFjdGFibGUuc2V0dGluZ3NNZXRob2RzLnB1c2goJ2FjdGlvbkNoZWNrZXInKTtcbkludGVyYWN0YWJsZS5zZXR0aW5nc01ldGhvZHMucHVzaCgnaWdub3JlRnJvbScpO1xuSW50ZXJhY3RhYmxlLnNldHRpbmdzTWV0aG9kcy5wdXNoKCdhbGxvd0Zyb20nKTtcblxuZGVmYXVsdE9wdGlvbnMuYmFzZS5hY3Rpb25DaGVja2VyID0gbnVsbDtcbmRlZmF1bHRPcHRpb25zLmJhc2Uuc3R5bGVDdXJzb3IgPSB0cnVlO1xuXG51dGlscy5leHRlbmQoZGVmYXVsdE9wdGlvbnMucGVyQWN0aW9uLCBhdXRvU3RhcnQuZGVmYXVsdHMucGVyQWN0aW9uKTtcblxubW9kdWxlLmV4cG9ydHMgPSBhdXRvU3RhcnQ7XG5cbn0se1wiLi4vSW50ZXJhY3RhYmxlXCI6NCxcIi4uL0ludGVyYWN0aW9uXCI6NSxcIi4uL2FjdGlvbnMvYmFzZVwiOjYsXCIuLi9kZWZhdWx0T3B0aW9uc1wiOjE4LFwiLi4vaW50ZXJhY3RcIjoyMSxcIi4uL3Njb3BlXCI6MzMsXCIuLi91dGlsc1wiOjQ0LFwiLi4vdXRpbHMvU2lnbmFsc1wiOjM0LFwiLi9JbnRlcmFjdGFibGVNZXRob2RzXCI6MTJ9XSwxNDpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4ndXNlIHN0cmljdCc7XG5cbnZhciBhdXRvU3RhcnQgPSByZXF1aXJlKCcuL2Jhc2UnKTtcbnZhciBzY29wZSA9IHJlcXVpcmUoJy4uL3Njb3BlJyk7XG52YXIgaXMgPSByZXF1aXJlKCcuLi91dGlscy9pcycpO1xuXG52YXIgX3JlcXVpcmUgPSByZXF1aXJlKCcuLi91dGlscy9kb21VdGlscycpLFxuICAgIHBhcmVudE5vZGUgPSBfcmVxdWlyZS5wYXJlbnROb2RlO1xuXG5hdXRvU3RhcnQuc2V0QWN0aW9uRGVmYXVsdHMocmVxdWlyZSgnLi4vYWN0aW9ucy9kcmFnJykpO1xuXG5hdXRvU3RhcnQuc2lnbmFscy5vbignYmVmb3JlLXN0YXJ0JywgZnVuY3Rpb24gKF9yZWYpIHtcbiAgdmFyIGludGVyYWN0aW9uID0gX3JlZi5pbnRlcmFjdGlvbixcbiAgICAgIGV2ZW50VGFyZ2V0ID0gX3JlZi5ldmVudFRhcmdldCxcbiAgICAgIGR4ID0gX3JlZi5keCxcbiAgICAgIGR5ID0gX3JlZi5keTtcblxuICBpZiAoaW50ZXJhY3Rpb24ucHJlcGFyZWQubmFtZSAhPT0gJ2RyYWcnKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gY2hlY2sgaWYgYSBkcmFnIGlzIGluIHRoZSBjb3JyZWN0IGF4aXNcbiAgdmFyIGFic1ggPSBNYXRoLmFicyhkeCk7XG4gIHZhciBhYnNZID0gTWF0aC5hYnMoZHkpO1xuICB2YXIgdGFyZ2V0T3B0aW9ucyA9IGludGVyYWN0aW9uLnRhcmdldC5vcHRpb25zLmRyYWc7XG4gIHZhciBzdGFydEF4aXMgPSB0YXJnZXRPcHRpb25zLnN0YXJ0QXhpcztcbiAgdmFyIGN1cnJlbnRBeGlzID0gYWJzWCA+IGFic1kgPyAneCcgOiBhYnNYIDwgYWJzWSA/ICd5JyA6ICd4eSc7XG5cbiAgaW50ZXJhY3Rpb24ucHJlcGFyZWQuYXhpcyA9IHRhcmdldE9wdGlvbnMubG9ja0F4aXMgPT09ICdzdGFydCcgPyBjdXJyZW50QXhpc1swXSAvLyBhbHdheXMgbG9jayB0byBvbmUgYXhpcyBldmVuIGlmIGN1cnJlbnRBeGlzID09PSAneHknXG4gIDogdGFyZ2V0T3B0aW9ucy5sb2NrQXhpcztcblxuICAvLyBpZiB0aGUgbW92ZW1lbnQgaXNuJ3QgaW4gdGhlIHN0YXJ0QXhpcyBvZiB0aGUgaW50ZXJhY3RhYmxlXG4gIGlmIChjdXJyZW50QXhpcyAhPT0gJ3h5JyAmJiBzdGFydEF4aXMgIT09ICd4eScgJiYgc3RhcnRBeGlzICE9PSBjdXJyZW50QXhpcykge1xuICAgIC8vIGNhbmNlbCB0aGUgcHJlcGFyZWQgYWN0aW9uXG4gICAgaW50ZXJhY3Rpb24ucHJlcGFyZWQubmFtZSA9IG51bGw7XG5cbiAgICAvLyB0aGVuIHRyeSB0byBnZXQgYSBkcmFnIGZyb20gYW5vdGhlciBpbmVyYWN0YWJsZVxuICAgIHZhciBlbGVtZW50ID0gZXZlbnRUYXJnZXQ7XG5cbiAgICB2YXIgZ2V0RHJhZ2dhYmxlID0gZnVuY3Rpb24gZ2V0RHJhZ2dhYmxlKGludGVyYWN0YWJsZSkge1xuICAgICAgaWYgKGludGVyYWN0YWJsZSA9PT0gaW50ZXJhY3Rpb24udGFyZ2V0KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdmFyIG9wdGlvbnMgPSBpbnRlcmFjdGlvbi50YXJnZXQub3B0aW9ucy5kcmFnO1xuXG4gICAgICBpZiAoIW9wdGlvbnMubWFudWFsU3RhcnQgJiYgaW50ZXJhY3RhYmxlLnRlc3RJZ25vcmVBbGxvdyhvcHRpb25zLCBlbGVtZW50LCBldmVudFRhcmdldCkpIHtcblxuICAgICAgICB2YXIgYWN0aW9uID0gaW50ZXJhY3RhYmxlLmdldEFjdGlvbihpbnRlcmFjdGlvbi5kb3duUG9pbnRlciwgaW50ZXJhY3Rpb24uZG93bkV2ZW50LCBpbnRlcmFjdGlvbiwgZWxlbWVudCk7XG5cbiAgICAgICAgaWYgKGFjdGlvbiAmJiBhY3Rpb24ubmFtZSA9PT0gJ2RyYWcnICYmIGNoZWNrU3RhcnRBeGlzKGN1cnJlbnRBeGlzLCBpbnRlcmFjdGFibGUpICYmIGF1dG9TdGFydC52YWxpZGF0ZUFjdGlvbihhY3Rpb24sIGludGVyYWN0YWJsZSwgZWxlbWVudCwgZXZlbnRUYXJnZXQpKSB7XG5cbiAgICAgICAgICByZXR1cm4gaW50ZXJhY3RhYmxlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIC8vIGNoZWNrIGFsbCBpbnRlcmFjdGFibGVzXG4gICAgd2hpbGUgKGlzLmVsZW1lbnQoZWxlbWVudCkpIHtcbiAgICAgIHZhciBpbnRlcmFjdGFibGUgPSBzY29wZS5pbnRlcmFjdGFibGVzLmZvckVhY2hNYXRjaChlbGVtZW50LCBnZXREcmFnZ2FibGUpO1xuXG4gICAgICBpZiAoaW50ZXJhY3RhYmxlKSB7XG4gICAgICAgIGludGVyYWN0aW9uLnByZXBhcmVkLm5hbWUgPSAnZHJhZyc7XG4gICAgICAgIGludGVyYWN0aW9uLnRhcmdldCA9IGludGVyYWN0YWJsZTtcbiAgICAgICAgaW50ZXJhY3Rpb24uZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBlbGVtZW50ID0gcGFyZW50Tm9kZShlbGVtZW50KTtcbiAgICB9XG4gIH1cbn0pO1xuXG5mdW5jdGlvbiBjaGVja1N0YXJ0QXhpcyhzdGFydEF4aXMsIGludGVyYWN0YWJsZSkge1xuICBpZiAoIWludGVyYWN0YWJsZSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHZhciB0aGlzQXhpcyA9IGludGVyYWN0YWJsZS5vcHRpb25zLmRyYWcuc3RhcnRBeGlzO1xuXG4gIHJldHVybiBzdGFydEF4aXMgPT09ICd4eScgfHwgdGhpc0F4aXMgPT09ICd4eScgfHwgdGhpc0F4aXMgPT09IHN0YXJ0QXhpcztcbn1cblxufSx7XCIuLi9hY3Rpb25zL2RyYWdcIjo3LFwiLi4vc2NvcGVcIjozMyxcIi4uL3V0aWxzL2RvbVV0aWxzXCI6MzksXCIuLi91dGlscy9pc1wiOjQ2LFwiLi9iYXNlXCI6MTN9XSwxNTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4ndXNlIHN0cmljdCc7XG5cbnJlcXVpcmUoJy4vYmFzZScpLnNldEFjdGlvbkRlZmF1bHRzKHJlcXVpcmUoJy4uL2FjdGlvbnMvZ2VzdHVyZScpKTtcblxufSx7XCIuLi9hY3Rpb25zL2dlc3R1cmVcIjo5LFwiLi9iYXNlXCI6MTN9XSwxNjpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4ndXNlIHN0cmljdCc7XG5cbnZhciBhdXRvU3RhcnQgPSByZXF1aXJlKCcuL2Jhc2UnKTtcbnZhciBJbnRlcmFjdGlvbiA9IHJlcXVpcmUoJy4uL0ludGVyYWN0aW9uJyk7XG5cbmF1dG9TdGFydC5kZWZhdWx0cy5wZXJBY3Rpb24uaG9sZCA9IDA7XG5hdXRvU3RhcnQuZGVmYXVsdHMucGVyQWN0aW9uLmRlbGF5ID0gMDtcblxuSW50ZXJhY3Rpb24uc2lnbmFscy5vbignbmV3JywgZnVuY3Rpb24gKGludGVyYWN0aW9uKSB7XG4gIGludGVyYWN0aW9uLmF1dG9TdGFydEhvbGRUaW1lciA9IG51bGw7XG59KTtcblxuYXV0b1N0YXJ0LnNpZ25hbHMub24oJ3ByZXBhcmVkJywgZnVuY3Rpb24gKF9yZWYpIHtcbiAgdmFyIGludGVyYWN0aW9uID0gX3JlZi5pbnRlcmFjdGlvbjtcblxuICB2YXIgaG9sZCA9IGdldEhvbGREdXJhdGlvbihpbnRlcmFjdGlvbik7XG5cbiAgaWYgKGhvbGQgPiAwKSB7XG4gICAgaW50ZXJhY3Rpb24uYXV0b1N0YXJ0SG9sZFRpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICBpbnRlcmFjdGlvbi5zdGFydChpbnRlcmFjdGlvbi5wcmVwYXJlZCwgaW50ZXJhY3Rpb24udGFyZ2V0LCBpbnRlcmFjdGlvbi5lbGVtZW50KTtcbiAgICB9LCBob2xkKTtcbiAgfVxufSk7XG5cbkludGVyYWN0aW9uLnNpZ25hbHMub24oJ21vdmUnLCBmdW5jdGlvbiAoX3JlZjIpIHtcbiAgdmFyIGludGVyYWN0aW9uID0gX3JlZjIuaW50ZXJhY3Rpb24sXG4gICAgICBkdXBsaWNhdGUgPSBfcmVmMi5kdXBsaWNhdGU7XG5cbiAgaWYgKGludGVyYWN0aW9uLnBvaW50ZXJXYXNNb3ZlZCAmJiAhZHVwbGljYXRlKSB7XG4gICAgY2xlYXJUaW1lb3V0KGludGVyYWN0aW9uLmF1dG9TdGFydEhvbGRUaW1lcik7XG4gIH1cbn0pO1xuXG4vLyBwcmV2ZW50IHJlZ3VsYXIgZG93bi0+bW92ZSBhdXRvU3RhcnRcbmF1dG9TdGFydC5zaWduYWxzLm9uKCdiZWZvcmUtc3RhcnQnLCBmdW5jdGlvbiAoX3JlZjMpIHtcbiAgdmFyIGludGVyYWN0aW9uID0gX3JlZjMuaW50ZXJhY3Rpb247XG5cbiAgdmFyIGhvbGQgPSBnZXRIb2xkRHVyYXRpb24oaW50ZXJhY3Rpb24pO1xuXG4gIGlmIChob2xkID4gMCkge1xuICAgIGludGVyYWN0aW9uLnByZXBhcmVkLm5hbWUgPSBudWxsO1xuICB9XG59KTtcblxuZnVuY3Rpb24gZ2V0SG9sZER1cmF0aW9uKGludGVyYWN0aW9uKSB7XG4gIHZhciBhY3Rpb25OYW1lID0gaW50ZXJhY3Rpb24ucHJlcGFyZWQgJiYgaW50ZXJhY3Rpb24ucHJlcGFyZWQubmFtZTtcblxuICBpZiAoIWFjdGlvbk5hbWUpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHZhciBvcHRpb25zID0gaW50ZXJhY3Rpb24udGFyZ2V0Lm9wdGlvbnM7XG5cbiAgcmV0dXJuIG9wdGlvbnNbYWN0aW9uTmFtZV0uaG9sZCB8fCBvcHRpb25zW2FjdGlvbk5hbWVdLmRlbGF5O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgZ2V0SG9sZER1cmF0aW9uOiBnZXRIb2xkRHVyYXRpb25cbn07XG5cbn0se1wiLi4vSW50ZXJhY3Rpb25cIjo1LFwiLi9iYXNlXCI6MTN9XSwxNzpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4ndXNlIHN0cmljdCc7XG5cbnJlcXVpcmUoJy4vYmFzZScpLnNldEFjdGlvbkRlZmF1bHRzKHJlcXVpcmUoJy4uL2FjdGlvbnMvcmVzaXplJykpO1xuXG59LHtcIi4uL2FjdGlvbnMvcmVzaXplXCI6MTAsXCIuL2Jhc2VcIjoxM31dLDE4OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGJhc2U6IHtcbiAgICBhY2NlcHQ6IG51bGwsXG4gICAgcHJldmVudERlZmF1bHQ6ICdhdXRvJyxcbiAgICBkZWx0YVNvdXJjZTogJ3BhZ2UnXG4gIH0sXG5cbiAgcGVyQWN0aW9uOiB7XG4gICAgb3JpZ2luOiB7IHg6IDAsIHk6IDAgfSxcblxuICAgIGluZXJ0aWE6IHtcbiAgICAgIGVuYWJsZWQ6IGZhbHNlLFxuICAgICAgcmVzaXN0YW5jZTogMTAsIC8vIHRoZSBsYW1iZGEgaW4gZXhwb25lbnRpYWwgZGVjYXlcbiAgICAgIG1pblNwZWVkOiAxMDAsIC8vIHRhcmdldCBzcGVlZCBtdXN0IGJlIGFib3ZlIHRoaXMgZm9yIGluZXJ0aWEgdG8gc3RhcnRcbiAgICAgIGVuZFNwZWVkOiAxMCwgLy8gdGhlIHNwZWVkIGF0IHdoaWNoIGluZXJ0aWEgaXMgc2xvdyBlbm91Z2ggdG8gc3RvcFxuICAgICAgYWxsb3dSZXN1bWU6IHRydWUsIC8vIGFsbG93IHJlc3VtaW5nIGFuIGFjdGlvbiBpbiBpbmVydGlhIHBoYXNlXG4gICAgICBzbW9vdGhFbmREdXJhdGlvbjogMzAwIC8vIGFuaW1hdGUgdG8gc25hcC9yZXN0cmljdCBlbmRPbmx5IGlmIHRoZXJlJ3Mgbm8gaW5lcnRpYVxuICAgIH1cbiAgfVxufTtcblxufSx7fV0sMTk6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG4vKiBicm93c2VyIGVudHJ5IHBvaW50ICovXG5cbi8vIGluZXJ0aWFcbnJlcXVpcmUoJy4vaW5lcnRpYScpO1xuXG4vLyBtb2RpZmllcnNcbnJlcXVpcmUoJy4vbW9kaWZpZXJzL3NuYXAnKTtcbnJlcXVpcmUoJy4vbW9kaWZpZXJzL3Jlc3RyaWN0Jyk7XG5cbi8vIHBvaW50ZXJFdmVudHNcbnJlcXVpcmUoJy4vcG9pbnRlckV2ZW50cy9iYXNlJyk7XG5yZXF1aXJlKCcuL3BvaW50ZXJFdmVudHMvaG9sZFJlcGVhdCcpO1xucmVxdWlyZSgnLi9wb2ludGVyRXZlbnRzL2ludGVyYWN0YWJsZVRhcmdldHMnKTtcblxuLy8gYXV0b1N0YXJ0IGhvbGRcbnJlcXVpcmUoJy4vYXV0b1N0YXJ0L2hvbGQnKTtcblxuLy8gYWN0aW9uc1xucmVxdWlyZSgnLi9hY3Rpb25zL2dlc3R1cmUnKTtcbnJlcXVpcmUoJy4vYWN0aW9ucy9yZXNpemUnKTtcbnJlcXVpcmUoJy4vYWN0aW9ucy9kcmFnJyk7XG5yZXF1aXJlKCcuL2FjdGlvbnMvZHJvcCcpO1xuXG4vLyBsb2FkIHRoZXNlIG1vZGlmaWVycyBhZnRlciByZXNpemUgaXMgbG9hZGVkXG5yZXF1aXJlKCcuL21vZGlmaWVycy9zbmFwU2l6ZScpO1xucmVxdWlyZSgnLi9tb2RpZmllcnMvcmVzdHJpY3RFZGdlcycpO1xucmVxdWlyZSgnLi9tb2RpZmllcnMvcmVzdHJpY3RTaXplJyk7XG5cbi8vIGF1dG9TdGFydCBhY3Rpb25zXG5yZXF1aXJlKCcuL2F1dG9TdGFydC9nZXN0dXJlJyk7XG5yZXF1aXJlKCcuL2F1dG9TdGFydC9yZXNpemUnKTtcbnJlcXVpcmUoJy4vYXV0b1N0YXJ0L2RyYWcnKTtcblxuLy8gSW50ZXJhY3RhYmxlIHByZXZlbnREZWZhdWx0IHNldHRpbmdcbnJlcXVpcmUoJy4vaW50ZXJhY3RhYmxlUHJldmVudERlZmF1bHQuanMnKTtcblxuLy8gYXV0b1Njcm9sbFxucmVxdWlyZSgnLi9hdXRvU2Nyb2xsJyk7XG5cbi8vIGV4cG9ydCBpbnRlcmFjdFxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2ludGVyYWN0Jyk7XG5cbn0se1wiLi9hY3Rpb25zL2RyYWdcIjo3LFwiLi9hY3Rpb25zL2Ryb3BcIjo4LFwiLi9hY3Rpb25zL2dlc3R1cmVcIjo5LFwiLi9hY3Rpb25zL3Jlc2l6ZVwiOjEwLFwiLi9hdXRvU2Nyb2xsXCI6MTEsXCIuL2F1dG9TdGFydC9kcmFnXCI6MTQsXCIuL2F1dG9TdGFydC9nZXN0dXJlXCI6MTUsXCIuL2F1dG9TdGFydC9ob2xkXCI6MTYsXCIuL2F1dG9TdGFydC9yZXNpemVcIjoxNyxcIi4vaW5lcnRpYVwiOjIwLFwiLi9pbnRlcmFjdFwiOjIxLFwiLi9pbnRlcmFjdGFibGVQcmV2ZW50RGVmYXVsdC5qc1wiOjIyLFwiLi9tb2RpZmllcnMvcmVzdHJpY3RcIjoyNCxcIi4vbW9kaWZpZXJzL3Jlc3RyaWN0RWRnZXNcIjoyNSxcIi4vbW9kaWZpZXJzL3Jlc3RyaWN0U2l6ZVwiOjI2LFwiLi9tb2RpZmllcnMvc25hcFwiOjI3LFwiLi9tb2RpZmllcnMvc25hcFNpemVcIjoyOCxcIi4vcG9pbnRlckV2ZW50cy9iYXNlXCI6MzAsXCIuL3BvaW50ZXJFdmVudHMvaG9sZFJlcGVhdFwiOjMxLFwiLi9wb2ludGVyRXZlbnRzL2ludGVyYWN0YWJsZVRhcmdldHNcIjozMn1dLDIwOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbid1c2Ugc3RyaWN0JztcblxudmFyIEludGVyYWN0RXZlbnQgPSByZXF1aXJlKCcuL0ludGVyYWN0RXZlbnQnKTtcbnZhciBJbnRlcmFjdGlvbiA9IHJlcXVpcmUoJy4vSW50ZXJhY3Rpb24nKTtcbnZhciBtb2RpZmllcnMgPSByZXF1aXJlKCcuL21vZGlmaWVycy9iYXNlJyk7XG52YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG52YXIgYW5pbWF0aW9uRnJhbWUgPSByZXF1aXJlKCcuL3V0aWxzL3JhZicpO1xuXG5JbnRlcmFjdGlvbi5zaWduYWxzLm9uKCduZXcnLCBmdW5jdGlvbiAoaW50ZXJhY3Rpb24pIHtcbiAgaW50ZXJhY3Rpb24uaW5lcnRpYVN0YXR1cyA9IHtcbiAgICBhY3RpdmU6IGZhbHNlLFxuICAgIHNtb290aEVuZDogZmFsc2UsXG4gICAgYWxsb3dSZXN1bWU6IGZhbHNlLFxuXG4gICAgc3RhcnRFdmVudDogbnVsbCxcbiAgICB1cENvb3Jkczoge30sXG5cbiAgICB4ZTogMCwgeWU6IDAsXG4gICAgc3g6IDAsIHN5OiAwLFxuXG4gICAgdDA6IDAsXG4gICAgdngwOiAwLCB2eXM6IDAsXG4gICAgZHVyYXRpb246IDAsXG5cbiAgICBsYW1iZGFfdjA6IDAsXG4gICAgb25lX3ZlX3YwOiAwLFxuICAgIGk6IG51bGxcbiAgfTtcblxuICBpbnRlcmFjdGlvbi5ib3VuZEluZXJ0aWFGcmFtZSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gaW5lcnRpYUZyYW1lLmFwcGx5KGludGVyYWN0aW9uKTtcbiAgfTtcbiAgaW50ZXJhY3Rpb24uYm91bmRTbW9vdGhFbmRGcmFtZSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gc21vb3RoRW5kRnJhbWUuYXBwbHkoaW50ZXJhY3Rpb24pO1xuICB9O1xufSk7XG5cbkludGVyYWN0aW9uLnNpZ25hbHMub24oJ2Rvd24nLCBmdW5jdGlvbiAoX3JlZikge1xuICB2YXIgaW50ZXJhY3Rpb24gPSBfcmVmLmludGVyYWN0aW9uLFxuICAgICAgZXZlbnQgPSBfcmVmLmV2ZW50LFxuICAgICAgcG9pbnRlciA9IF9yZWYucG9pbnRlcixcbiAgICAgIGV2ZW50VGFyZ2V0ID0gX3JlZi5ldmVudFRhcmdldDtcblxuICB2YXIgc3RhdHVzID0gaW50ZXJhY3Rpb24uaW5lcnRpYVN0YXR1cztcblxuICAvLyBDaGVjayBpZiB0aGUgZG93biBldmVudCBoaXRzIHRoZSBjdXJyZW50IGluZXJ0aWEgdGFyZ2V0XG4gIGlmIChzdGF0dXMuYWN0aXZlKSB7XG4gICAgdmFyIGVsZW1lbnQgPSBldmVudFRhcmdldDtcblxuICAgIC8vIGNsaW1iIHVwIHRoZSBET00gdHJlZSBmcm9tIHRoZSBldmVudCB0YXJnZXRcbiAgICB3aGlsZSAodXRpbHMuaXMuZWxlbWVudChlbGVtZW50KSkge1xuXG4gICAgICAvLyBpZiBpbnRlcmFjdGlvbiBlbGVtZW50IGlzIHRoZSBjdXJyZW50IGluZXJ0aWEgdGFyZ2V0IGVsZW1lbnRcbiAgICAgIGlmIChlbGVtZW50ID09PSBpbnRlcmFjdGlvbi5lbGVtZW50KSB7XG4gICAgICAgIC8vIHN0b3AgaW5lcnRpYVxuICAgICAgICBhbmltYXRpb25GcmFtZS5jYW5jZWwoc3RhdHVzLmkpO1xuICAgICAgICBzdGF0dXMuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIGludGVyYWN0aW9uLnNpbXVsYXRpb24gPSBudWxsO1xuXG4gICAgICAgIC8vIHVwZGF0ZSBwb2ludGVycyB0byB0aGUgZG93biBldmVudCdzIGNvb3JkaW5hdGVzXG4gICAgICAgIGludGVyYWN0aW9uLnVwZGF0ZVBvaW50ZXIocG9pbnRlcik7XG4gICAgICAgIHV0aWxzLnNldENvb3JkcyhpbnRlcmFjdGlvbi5jdXJDb29yZHMsIGludGVyYWN0aW9uLnBvaW50ZXJzKTtcblxuICAgICAgICAvLyBmaXJlIGFwcHJvcHJpYXRlIHNpZ25hbHNcbiAgICAgICAgdmFyIHNpZ25hbEFyZyA9IHsgaW50ZXJhY3Rpb246IGludGVyYWN0aW9uIH07XG4gICAgICAgIEludGVyYWN0aW9uLnNpZ25hbHMuZmlyZSgnYmVmb3JlLWFjdGlvbi1tb3ZlJywgc2lnbmFsQXJnKTtcbiAgICAgICAgSW50ZXJhY3Rpb24uc2lnbmFscy5maXJlKCdhY3Rpb24tcmVzdW1lJywgc2lnbmFsQXJnKTtcblxuICAgICAgICAvLyBmaXJlIGEgcmV1bWUgZXZlbnRcbiAgICAgICAgdmFyIHJlc3VtZUV2ZW50ID0gbmV3IEludGVyYWN0RXZlbnQoaW50ZXJhY3Rpb24sIGV2ZW50LCBpbnRlcmFjdGlvbi5wcmVwYXJlZC5uYW1lLCAnaW5lcnRpYXJlc3VtZScsIGludGVyYWN0aW9uLmVsZW1lbnQpO1xuXG4gICAgICAgIGludGVyYWN0aW9uLnRhcmdldC5maXJlKHJlc3VtZUV2ZW50KTtcbiAgICAgICAgaW50ZXJhY3Rpb24ucHJldkV2ZW50ID0gcmVzdW1lRXZlbnQ7XG4gICAgICAgIG1vZGlmaWVycy5yZXNldFN0YXR1c2VzKGludGVyYWN0aW9uLm1vZGlmaWVyU3RhdHVzZXMpO1xuXG4gICAgICAgIHV0aWxzLmNvcHlDb29yZHMoaW50ZXJhY3Rpb24ucHJldkNvb3JkcywgaW50ZXJhY3Rpb24uY3VyQ29vcmRzKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIGVsZW1lbnQgPSB1dGlscy5wYXJlbnROb2RlKGVsZW1lbnQpO1xuICAgIH1cbiAgfVxufSk7XG5cbkludGVyYWN0aW9uLnNpZ25hbHMub24oJ3VwJywgZnVuY3Rpb24gKF9yZWYyKSB7XG4gIHZhciBpbnRlcmFjdGlvbiA9IF9yZWYyLmludGVyYWN0aW9uLFxuICAgICAgZXZlbnQgPSBfcmVmMi5ldmVudDtcblxuICB2YXIgc3RhdHVzID0gaW50ZXJhY3Rpb24uaW5lcnRpYVN0YXR1cztcblxuICBpZiAoIWludGVyYWN0aW9uLmludGVyYWN0aW5nKCkgfHwgc3RhdHVzLmFjdGl2ZSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHZhciB0YXJnZXQgPSBpbnRlcmFjdGlvbi50YXJnZXQ7XG4gIHZhciBvcHRpb25zID0gdGFyZ2V0ICYmIHRhcmdldC5vcHRpb25zO1xuICB2YXIgaW5lcnRpYU9wdGlvbnMgPSBvcHRpb25zICYmIGludGVyYWN0aW9uLnByZXBhcmVkLm5hbWUgJiYgb3B0aW9uc1tpbnRlcmFjdGlvbi5wcmVwYXJlZC5uYW1lXS5pbmVydGlhO1xuXG4gIHZhciBub3cgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgdmFyIHN0YXR1c2VzID0ge307XG4gIHZhciBwYWdlID0gdXRpbHMuZXh0ZW5kKHt9LCBpbnRlcmFjdGlvbi5jdXJDb29yZHMucGFnZSk7XG4gIHZhciBwb2ludGVyU3BlZWQgPSBpbnRlcmFjdGlvbi5wb2ludGVyRGVsdGEuY2xpZW50LnNwZWVkO1xuXG4gIHZhciBzbW9vdGhFbmQgPSBmYWxzZTtcbiAgdmFyIG1vZGlmaWVyUmVzdWx0ID0gdm9pZCAwO1xuXG4gIC8vIGNoZWNrIGlmIGluZXJ0aWEgc2hvdWxkIGJlIHN0YXJ0ZWRcbiAgdmFyIGluZXJ0aWFQb3NzaWJsZSA9IGluZXJ0aWFPcHRpb25zICYmIGluZXJ0aWFPcHRpb25zLmVuYWJsZWQgJiYgaW50ZXJhY3Rpb24ucHJlcGFyZWQubmFtZSAhPT0gJ2dlc3R1cmUnICYmIGV2ZW50ICE9PSBzdGF0dXMuc3RhcnRFdmVudDtcblxuICB2YXIgaW5lcnRpYSA9IGluZXJ0aWFQb3NzaWJsZSAmJiBub3cgLSBpbnRlcmFjdGlvbi5jdXJDb29yZHMudGltZVN0YW1wIDwgNTAgJiYgcG9pbnRlclNwZWVkID4gaW5lcnRpYU9wdGlvbnMubWluU3BlZWQgJiYgcG9pbnRlclNwZWVkID4gaW5lcnRpYU9wdGlvbnMuZW5kU3BlZWQ7XG5cbiAgdmFyIG1vZGlmaWVyQXJnID0ge1xuICAgIGludGVyYWN0aW9uOiBpbnRlcmFjdGlvbixcbiAgICBwYWdlQ29vcmRzOiBwYWdlLFxuICAgIHN0YXR1c2VzOiBzdGF0dXNlcyxcbiAgICBwcmVFbmQ6IHRydWUsXG4gICAgcmVxdWlyZUVuZE9ubHk6IHRydWVcbiAgfTtcblxuICAvLyBzbW9vdGhFbmRcbiAgaWYgKGluZXJ0aWFQb3NzaWJsZSAmJiAhaW5lcnRpYSkge1xuICAgIG1vZGlmaWVycy5yZXNldFN0YXR1c2VzKHN0YXR1c2VzKTtcblxuICAgIG1vZGlmaWVyUmVzdWx0ID0gbW9kaWZpZXJzLnNldEFsbChtb2RpZmllckFyZyk7XG5cbiAgICBpZiAobW9kaWZpZXJSZXN1bHQuc2hvdWxkTW92ZSAmJiBtb2RpZmllclJlc3VsdC5sb2NrZWQpIHtcbiAgICAgIHNtb290aEVuZCA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgaWYgKCEoaW5lcnRpYSB8fCBzbW9vdGhFbmQpKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdXRpbHMuY29weUNvb3JkcyhzdGF0dXMudXBDb29yZHMsIGludGVyYWN0aW9uLmN1ckNvb3Jkcyk7XG5cbiAgaW50ZXJhY3Rpb24ucG9pbnRlcnNbMF0gPSBzdGF0dXMuc3RhcnRFdmVudCA9IG5ldyBJbnRlcmFjdEV2ZW50KGludGVyYWN0aW9uLCBldmVudCwgaW50ZXJhY3Rpb24ucHJlcGFyZWQubmFtZSwgJ2luZXJ0aWFzdGFydCcsIGludGVyYWN0aW9uLmVsZW1lbnQpO1xuXG4gIHN0YXR1cy50MCA9IG5vdztcblxuICBzdGF0dXMuYWN0aXZlID0gdHJ1ZTtcbiAgc3RhdHVzLmFsbG93UmVzdW1lID0gaW5lcnRpYU9wdGlvbnMuYWxsb3dSZXN1bWU7XG4gIGludGVyYWN0aW9uLnNpbXVsYXRpb24gPSBzdGF0dXM7XG5cbiAgdGFyZ2V0LmZpcmUoc3RhdHVzLnN0YXJ0RXZlbnQpO1xuXG4gIGlmIChpbmVydGlhKSB7XG4gICAgc3RhdHVzLnZ4MCA9IGludGVyYWN0aW9uLnBvaW50ZXJEZWx0YS5jbGllbnQudng7XG4gICAgc3RhdHVzLnZ5MCA9IGludGVyYWN0aW9uLnBvaW50ZXJEZWx0YS5jbGllbnQudnk7XG4gICAgc3RhdHVzLnYwID0gcG9pbnRlclNwZWVkO1xuXG4gICAgY2FsY0luZXJ0aWEoaW50ZXJhY3Rpb24sIHN0YXR1cyk7XG5cbiAgICB1dGlscy5leHRlbmQocGFnZSwgaW50ZXJhY3Rpb24uY3VyQ29vcmRzLnBhZ2UpO1xuXG4gICAgcGFnZS54ICs9IHN0YXR1cy54ZTtcbiAgICBwYWdlLnkgKz0gc3RhdHVzLnllO1xuXG4gICAgbW9kaWZpZXJzLnJlc2V0U3RhdHVzZXMoc3RhdHVzZXMpO1xuXG4gICAgbW9kaWZpZXJSZXN1bHQgPSBtb2RpZmllcnMuc2V0QWxsKG1vZGlmaWVyQXJnKTtcblxuICAgIHN0YXR1cy5tb2RpZmllZFhlICs9IG1vZGlmaWVyUmVzdWx0LmR4O1xuICAgIHN0YXR1cy5tb2RpZmllZFllICs9IG1vZGlmaWVyUmVzdWx0LmR5O1xuXG4gICAgc3RhdHVzLmkgPSBhbmltYXRpb25GcmFtZS5yZXF1ZXN0KGludGVyYWN0aW9uLmJvdW5kSW5lcnRpYUZyYW1lKTtcbiAgfSBlbHNlIHtcbiAgICBzdGF0dXMuc21vb3RoRW5kID0gdHJ1ZTtcbiAgICBzdGF0dXMueGUgPSBtb2RpZmllclJlc3VsdC5keDtcbiAgICBzdGF0dXMueWUgPSBtb2RpZmllclJlc3VsdC5keTtcblxuICAgIHN0YXR1cy5zeCA9IHN0YXR1cy5zeSA9IDA7XG5cbiAgICBzdGF0dXMuaSA9IGFuaW1hdGlvbkZyYW1lLnJlcXVlc3QoaW50ZXJhY3Rpb24uYm91bmRTbW9vdGhFbmRGcmFtZSk7XG4gIH1cbn0pO1xuXG5JbnRlcmFjdGlvbi5zaWduYWxzLm9uKCdzdG9wLWFjdGl2ZScsIGZ1bmN0aW9uIChfcmVmMykge1xuICB2YXIgaW50ZXJhY3Rpb24gPSBfcmVmMy5pbnRlcmFjdGlvbjtcblxuICB2YXIgc3RhdHVzID0gaW50ZXJhY3Rpb24uaW5lcnRpYVN0YXR1cztcblxuICBpZiAoc3RhdHVzLmFjdGl2ZSkge1xuICAgIGFuaW1hdGlvbkZyYW1lLmNhbmNlbChzdGF0dXMuaSk7XG4gICAgc3RhdHVzLmFjdGl2ZSA9IGZhbHNlO1xuICAgIGludGVyYWN0aW9uLnNpbXVsYXRpb24gPSBudWxsO1xuICB9XG59KTtcblxuZnVuY3Rpb24gY2FsY0luZXJ0aWEoaW50ZXJhY3Rpb24sIHN0YXR1cykge1xuICB2YXIgaW5lcnRpYU9wdGlvbnMgPSBpbnRlcmFjdGlvbi50YXJnZXQub3B0aW9uc1tpbnRlcmFjdGlvbi5wcmVwYXJlZC5uYW1lXS5pbmVydGlhO1xuICB2YXIgbGFtYmRhID0gaW5lcnRpYU9wdGlvbnMucmVzaXN0YW5jZTtcbiAgdmFyIGluZXJ0aWFEdXIgPSAtTWF0aC5sb2coaW5lcnRpYU9wdGlvbnMuZW5kU3BlZWQgLyBzdGF0dXMudjApIC8gbGFtYmRhO1xuXG4gIHN0YXR1cy54MCA9IGludGVyYWN0aW9uLnByZXZFdmVudC5wYWdlWDtcbiAgc3RhdHVzLnkwID0gaW50ZXJhY3Rpb24ucHJldkV2ZW50LnBhZ2VZO1xuICBzdGF0dXMudDAgPSBzdGF0dXMuc3RhcnRFdmVudC50aW1lU3RhbXAgLyAxMDAwO1xuICBzdGF0dXMuc3ggPSBzdGF0dXMuc3kgPSAwO1xuXG4gIHN0YXR1cy5tb2RpZmllZFhlID0gc3RhdHVzLnhlID0gKHN0YXR1cy52eDAgLSBpbmVydGlhRHVyKSAvIGxhbWJkYTtcbiAgc3RhdHVzLm1vZGlmaWVkWWUgPSBzdGF0dXMueWUgPSAoc3RhdHVzLnZ5MCAtIGluZXJ0aWFEdXIpIC8gbGFtYmRhO1xuICBzdGF0dXMudGUgPSBpbmVydGlhRHVyO1xuXG4gIHN0YXR1cy5sYW1iZGFfdjAgPSBsYW1iZGEgLyBzdGF0dXMudjA7XG4gIHN0YXR1cy5vbmVfdmVfdjAgPSAxIC0gaW5lcnRpYU9wdGlvbnMuZW5kU3BlZWQgLyBzdGF0dXMudjA7XG59XG5cbmZ1bmN0aW9uIGluZXJ0aWFGcmFtZSgpIHtcbiAgdXBkYXRlSW5lcnRpYUNvb3Jkcyh0aGlzKTtcbiAgdXRpbHMuc2V0Q29vcmREZWx0YXModGhpcy5wb2ludGVyRGVsdGEsIHRoaXMucHJldkNvb3JkcywgdGhpcy5jdXJDb29yZHMpO1xuXG4gIHZhciBzdGF0dXMgPSB0aGlzLmluZXJ0aWFTdGF0dXM7XG4gIHZhciBvcHRpb25zID0gdGhpcy50YXJnZXQub3B0aW9uc1t0aGlzLnByZXBhcmVkLm5hbWVdLmluZXJ0aWE7XG4gIHZhciBsYW1iZGEgPSBvcHRpb25zLnJlc2lzdGFuY2U7XG4gIHZhciB0ID0gbmV3IERhdGUoKS5nZXRUaW1lKCkgLyAxMDAwIC0gc3RhdHVzLnQwO1xuXG4gIGlmICh0IDwgc3RhdHVzLnRlKSB7XG5cbiAgICB2YXIgcHJvZ3Jlc3MgPSAxIC0gKE1hdGguZXhwKC1sYW1iZGEgKiB0KSAtIHN0YXR1cy5sYW1iZGFfdjApIC8gc3RhdHVzLm9uZV92ZV92MDtcblxuICAgIGlmIChzdGF0dXMubW9kaWZpZWRYZSA9PT0gc3RhdHVzLnhlICYmIHN0YXR1cy5tb2RpZmllZFllID09PSBzdGF0dXMueWUpIHtcbiAgICAgIHN0YXR1cy5zeCA9IHN0YXR1cy54ZSAqIHByb2dyZXNzO1xuICAgICAgc3RhdHVzLnN5ID0gc3RhdHVzLnllICogcHJvZ3Jlc3M7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBxdWFkUG9pbnQgPSB1dGlscy5nZXRRdWFkcmF0aWNDdXJ2ZVBvaW50KDAsIDAsIHN0YXR1cy54ZSwgc3RhdHVzLnllLCBzdGF0dXMubW9kaWZpZWRYZSwgc3RhdHVzLm1vZGlmaWVkWWUsIHByb2dyZXNzKTtcblxuICAgICAgc3RhdHVzLnN4ID0gcXVhZFBvaW50Lng7XG4gICAgICBzdGF0dXMuc3kgPSBxdWFkUG9pbnQueTtcbiAgICB9XG5cbiAgICB0aGlzLmRvTW92ZSgpO1xuXG4gICAgc3RhdHVzLmkgPSBhbmltYXRpb25GcmFtZS5yZXF1ZXN0KHRoaXMuYm91bmRJbmVydGlhRnJhbWUpO1xuICB9IGVsc2Uge1xuICAgIHN0YXR1cy5zeCA9IHN0YXR1cy5tb2RpZmllZFhlO1xuICAgIHN0YXR1cy5zeSA9IHN0YXR1cy5tb2RpZmllZFllO1xuXG4gICAgdGhpcy5kb01vdmUoKTtcbiAgICB0aGlzLmVuZChzdGF0dXMuc3RhcnRFdmVudCk7XG4gICAgc3RhdHVzLmFjdGl2ZSA9IGZhbHNlO1xuICAgIHRoaXMuc2ltdWxhdGlvbiA9IG51bGw7XG4gIH1cblxuICB1dGlscy5jb3B5Q29vcmRzKHRoaXMucHJldkNvb3JkcywgdGhpcy5jdXJDb29yZHMpO1xufVxuXG5mdW5jdGlvbiBzbW9vdGhFbmRGcmFtZSgpIHtcbiAgdXBkYXRlSW5lcnRpYUNvb3Jkcyh0aGlzKTtcblxuICB2YXIgc3RhdHVzID0gdGhpcy5pbmVydGlhU3RhdHVzO1xuICB2YXIgdCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpIC0gc3RhdHVzLnQwO1xuICB2YXIgZHVyYXRpb24gPSB0aGlzLnRhcmdldC5vcHRpb25zW3RoaXMucHJlcGFyZWQubmFtZV0uaW5lcnRpYS5zbW9vdGhFbmREdXJhdGlvbjtcblxuICBpZiAodCA8IGR1cmF0aW9uKSB7XG4gICAgc3RhdHVzLnN4ID0gdXRpbHMuZWFzZU91dFF1YWQodCwgMCwgc3RhdHVzLnhlLCBkdXJhdGlvbik7XG4gICAgc3RhdHVzLnN5ID0gdXRpbHMuZWFzZU91dFF1YWQodCwgMCwgc3RhdHVzLnllLCBkdXJhdGlvbik7XG5cbiAgICB0aGlzLnBvaW50ZXJNb3ZlKHN0YXR1cy5zdGFydEV2ZW50LCBzdGF0dXMuc3RhcnRFdmVudCk7XG5cbiAgICBzdGF0dXMuaSA9IGFuaW1hdGlvbkZyYW1lLnJlcXVlc3QodGhpcy5ib3VuZFNtb290aEVuZEZyYW1lKTtcbiAgfSBlbHNlIHtcbiAgICBzdGF0dXMuc3ggPSBzdGF0dXMueGU7XG4gICAgc3RhdHVzLnN5ID0gc3RhdHVzLnllO1xuXG4gICAgdGhpcy5wb2ludGVyTW92ZShzdGF0dXMuc3RhcnRFdmVudCwgc3RhdHVzLnN0YXJ0RXZlbnQpO1xuICAgIHRoaXMuZW5kKHN0YXR1cy5zdGFydEV2ZW50KTtcblxuICAgIHN0YXR1cy5zbW9vdGhFbmQgPSBzdGF0dXMuYWN0aXZlID0gZmFsc2U7XG4gICAgdGhpcy5zaW11bGF0aW9uID0gbnVsbDtcbiAgfVxufVxuXG5mdW5jdGlvbiB1cGRhdGVJbmVydGlhQ29vcmRzKGludGVyYWN0aW9uKSB7XG4gIHZhciBzdGF0dXMgPSBpbnRlcmFjdGlvbi5pbmVydGlhU3RhdHVzO1xuXG4gIC8vIHJldHVybiBpZiBpbmVydGlhIGlzbid0IHJ1bm5pbmdcbiAgaWYgKCFzdGF0dXMuYWN0aXZlKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyIHBhZ2VVcCA9IHN0YXR1cy51cENvb3Jkcy5wYWdlO1xuICB2YXIgY2xpZW50VXAgPSBzdGF0dXMudXBDb29yZHMuY2xpZW50O1xuXG4gIHV0aWxzLnNldENvb3JkcyhpbnRlcmFjdGlvbi5jdXJDb29yZHMsIFt7XG4gICAgcGFnZVg6IHBhZ2VVcC54ICsgc3RhdHVzLnN4LFxuICAgIHBhZ2VZOiBwYWdlVXAueSArIHN0YXR1cy5zeSxcbiAgICBjbGllbnRYOiBjbGllbnRVcC54ICsgc3RhdHVzLnN4LFxuICAgIGNsaWVudFk6IGNsaWVudFVwLnkgKyBzdGF0dXMuc3lcbiAgfV0pO1xufVxuXG59LHtcIi4vSW50ZXJhY3RFdmVudFwiOjMsXCIuL0ludGVyYWN0aW9uXCI6NSxcIi4vbW9kaWZpZXJzL2Jhc2VcIjoyMyxcIi4vdXRpbHNcIjo0NCxcIi4vdXRpbHMvcmFmXCI6NTB9XSwyMTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4ndXNlIHN0cmljdCc7XG5cbi8qKiBAbW9kdWxlIGludGVyYWN0ICovXG5cbnZhciBicm93c2VyID0gcmVxdWlyZSgnLi91dGlscy9icm93c2VyJyk7XG52YXIgZXZlbnRzID0gcmVxdWlyZSgnLi91dGlscy9ldmVudHMnKTtcbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcbnZhciBzY29wZSA9IHJlcXVpcmUoJy4vc2NvcGUnKTtcbnZhciBJbnRlcmFjdGFibGUgPSByZXF1aXJlKCcuL0ludGVyYWN0YWJsZScpO1xudmFyIEludGVyYWN0aW9uID0gcmVxdWlyZSgnLi9JbnRlcmFjdGlvbicpO1xuXG52YXIgZ2xvYmFsRXZlbnRzID0ge307XG5cbi8qKlxuICogYGBganNcbiAqIGludGVyYWN0KCcjZHJhZ2dhYmxlJykuZHJhZ2dhYmxlKHRydWUpO1xuICpcbiAqIHZhciByZWN0YWJsZXMgPSBpbnRlcmFjdCgncmVjdCcpO1xuICogcmVjdGFibGVzXG4gKiAgIC5nZXN0dXJhYmxlKHRydWUpXG4gKiAgIC5vbignZ2VzdHVyZW1vdmUnLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAqICAgICAgIC8vIC4uLlxuICogICB9KTtcbiAqIGBgYFxuICpcbiAqIFRoZSBtZXRob2RzIG9mIHRoaXMgdmFyaWFibGUgY2FuIGJlIHVzZWQgdG8gc2V0IGVsZW1lbnRzIGFzIGludGVyYWN0YWJsZXNcbiAqIGFuZCBhbHNvIHRvIGNoYW5nZSB2YXJpb3VzIGRlZmF1bHQgc2V0dGluZ3MuXG4gKlxuICogQ2FsbGluZyBpdCBhcyBhIGZ1bmN0aW9uIGFuZCBwYXNzaW5nIGFuIGVsZW1lbnQgb3IgYSB2YWxpZCBDU1Mgc2VsZWN0b3JcbiAqIHN0cmluZyByZXR1cm5zIGFuIEludGVyYWN0YWJsZSBvYmplY3Qgd2hpY2ggaGFzIHZhcmlvdXMgbWV0aG9kcyB0byBjb25maWd1cmVcbiAqIGl0LlxuICpcbiAqIEBnbG9iYWxcbiAqXG4gKiBAcGFyYW0ge0VsZW1lbnQgfCBzdHJpbmd9IGVsZW1lbnQgVGhlIEhUTUwgb3IgU1ZHIEVsZW1lbnQgdG8gaW50ZXJhY3Qgd2l0aFxuICogb3IgQ1NTIHNlbGVjdG9yXG4gKiBAcmV0dXJuIHtJbnRlcmFjdGFibGV9XG4gKi9cbmZ1bmN0aW9uIGludGVyYWN0KGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgdmFyIGludGVyYWN0YWJsZSA9IHNjb3BlLmludGVyYWN0YWJsZXMuZ2V0KGVsZW1lbnQsIG9wdGlvbnMpO1xuXG4gIGlmICghaW50ZXJhY3RhYmxlKSB7XG4gICAgaW50ZXJhY3RhYmxlID0gbmV3IEludGVyYWN0YWJsZShlbGVtZW50LCBvcHRpb25zKTtcbiAgICBpbnRlcmFjdGFibGUuZXZlbnRzLmdsb2JhbCA9IGdsb2JhbEV2ZW50cztcbiAgfVxuXG4gIHJldHVybiBpbnRlcmFjdGFibGU7XG59XG5cbi8qKlxuICogQ2hlY2sgaWYgYW4gZWxlbWVudCBvciBzZWxlY3RvciBoYXMgYmVlbiBzZXQgd2l0aCB0aGUge0BsaW5rIGludGVyYWN0fVxuICogZnVuY3Rpb25cbiAqXG4gKiBAYWxpYXMgbW9kdWxlOmludGVyYWN0LmlzU2V0XG4gKlxuICogQHBhcmFtIHtFbGVtZW50fSBlbGVtZW50IFRoZSBFbGVtZW50IGJlaW5nIHNlYXJjaGVkIGZvclxuICogQHJldHVybiB7Ym9vbGVhbn0gSW5kaWNhdGVzIGlmIHRoZSBlbGVtZW50IG9yIENTUyBzZWxlY3RvciB3YXMgcHJldmlvdXNseVxuICogcGFzc2VkIHRvIGludGVyYWN0XG4qL1xuaW50ZXJhY3QuaXNTZXQgPSBmdW5jdGlvbiAoZWxlbWVudCwgb3B0aW9ucykge1xuICByZXR1cm4gc2NvcGUuaW50ZXJhY3RhYmxlcy5pbmRleE9mRWxlbWVudChlbGVtZW50LCBvcHRpb25zICYmIG9wdGlvbnMuY29udGV4dCkgIT09IC0xO1xufTtcblxuLyoqXG4gKiBBZGQgYSBnbG9iYWwgbGlzdGVuZXIgZm9yIGFuIEludGVyYWN0RXZlbnQgb3IgYWRkcyBhIERPTSBldmVudCB0byBgZG9jdW1lbnRgXG4gKlxuICogQGFsaWFzIG1vZHVsZTppbnRlcmFjdC5vblxuICpcbiAqIEBwYXJhbSB7c3RyaW5nIHwgYXJyYXkgfCBvYmplY3R9IHR5cGUgVGhlIHR5cGVzIG9mIGV2ZW50cyB0byBsaXN0ZW4gZm9yXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBsaXN0ZW5lciBUaGUgZnVuY3Rpb24gZXZlbnQgKHMpXG4gKiBAcGFyYW0ge29iamVjdCB8IGJvb2xlYW59IFtvcHRpb25zXSBvYmplY3Qgb3IgdXNlQ2FwdHVyZSBmbGFnIGZvclxuICogYWRkRXZlbnRMaXN0ZW5lclxuICogQHJldHVybiB7b2JqZWN0fSBpbnRlcmFjdFxuICovXG5pbnRlcmFjdC5vbiA9IGZ1bmN0aW9uICh0eXBlLCBsaXN0ZW5lciwgb3B0aW9ucykge1xuICBpZiAodXRpbHMuaXMuc3RyaW5nKHR5cGUpICYmIHR5cGUuc2VhcmNoKCcgJykgIT09IC0xKSB7XG4gICAgdHlwZSA9IHR5cGUudHJpbSgpLnNwbGl0KC8gKy8pO1xuICB9XG5cbiAgaWYgKHV0aWxzLmlzLmFycmF5KHR5cGUpKSB7XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IHR5cGUubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX3JlZjtcblxuICAgICAgX3JlZiA9IHR5cGVbX2ldO1xuICAgICAgdmFyIGV2ZW50VHlwZSA9IF9yZWY7XG5cbiAgICAgIGludGVyYWN0Lm9uKGV2ZW50VHlwZSwgbGlzdGVuZXIsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIHJldHVybiBpbnRlcmFjdDtcbiAgfVxuXG4gIGlmICh1dGlscy5pcy5vYmplY3QodHlwZSkpIHtcbiAgICBmb3IgKHZhciBwcm9wIGluIHR5cGUpIHtcbiAgICAgIGludGVyYWN0Lm9uKHByb3AsIHR5cGVbcHJvcF0sIGxpc3RlbmVyKTtcbiAgICB9XG5cbiAgICByZXR1cm4gaW50ZXJhY3Q7XG4gIH1cblxuICAvLyBpZiBpdCBpcyBhbiBJbnRlcmFjdEV2ZW50IHR5cGUsIGFkZCBsaXN0ZW5lciB0byBnbG9iYWxFdmVudHNcbiAgaWYgKHV0aWxzLmNvbnRhaW5zKEludGVyYWN0YWJsZS5ldmVudFR5cGVzLCB0eXBlKSkge1xuICAgIC8vIGlmIHRoaXMgdHlwZSBvZiBldmVudCB3YXMgbmV2ZXIgYm91bmRcbiAgICBpZiAoIWdsb2JhbEV2ZW50c1t0eXBlXSkge1xuICAgICAgZ2xvYmFsRXZlbnRzW3R5cGVdID0gW2xpc3RlbmVyXTtcbiAgICB9IGVsc2Uge1xuICAgICAgZ2xvYmFsRXZlbnRzW3R5cGVdLnB1c2gobGlzdGVuZXIpO1xuICAgIH1cbiAgfVxuICAvLyBJZiBub24gSW50ZXJhY3RFdmVudCB0eXBlLCBhZGRFdmVudExpc3RlbmVyIHRvIGRvY3VtZW50XG4gIGVsc2Uge1xuICAgICAgZXZlbnRzLmFkZChzY29wZS5kb2N1bWVudCwgdHlwZSwgbGlzdGVuZXIsIHsgb3B0aW9uczogb3B0aW9ucyB9KTtcbiAgICB9XG5cbiAgcmV0dXJuIGludGVyYWN0O1xufTtcblxuLyoqXG4gKiBSZW1vdmVzIGEgZ2xvYmFsIEludGVyYWN0RXZlbnQgbGlzdGVuZXIgb3IgRE9NIGV2ZW50IGZyb20gYGRvY3VtZW50YFxuICpcbiAqIEBhbGlhcyBtb2R1bGU6aW50ZXJhY3Qub2ZmXG4gKlxuICogQHBhcmFtIHtzdHJpbmcgfCBhcnJheSB8IG9iamVjdH0gdHlwZSBUaGUgdHlwZXMgb2YgZXZlbnRzIHRoYXQgd2VyZSBsaXN0ZW5lZFxuICogZm9yXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBsaXN0ZW5lciBUaGUgbGlzdGVuZXIgZnVuY3Rpb24gdG8gYmUgcmVtb3ZlZFxuICogQHBhcmFtIHtvYmplY3QgfCBib29sZWFufSBvcHRpb25zIFtvcHRpb25zXSBvYmplY3Qgb3IgdXNlQ2FwdHVyZSBmbGFnIGZvclxuICogcmVtb3ZlRXZlbnRMaXN0ZW5lclxuICogQHJldHVybiB7b2JqZWN0fSBpbnRlcmFjdFxuICovXG5pbnRlcmFjdC5vZmYgPSBmdW5jdGlvbiAodHlwZSwgbGlzdGVuZXIsIG9wdGlvbnMpIHtcbiAgaWYgKHV0aWxzLmlzLnN0cmluZyh0eXBlKSAmJiB0eXBlLnNlYXJjaCgnICcpICE9PSAtMSkge1xuICAgIHR5cGUgPSB0eXBlLnRyaW0oKS5zcGxpdCgvICsvKTtcbiAgfVxuXG4gIGlmICh1dGlscy5pcy5hcnJheSh0eXBlKSkge1xuICAgIGZvciAodmFyIF9pMiA9IDA7IF9pMiA8IHR5cGUubGVuZ3RoOyBfaTIrKykge1xuICAgICAgdmFyIF9yZWYyO1xuXG4gICAgICBfcmVmMiA9IHR5cGVbX2kyXTtcbiAgICAgIHZhciBldmVudFR5cGUgPSBfcmVmMjtcblxuICAgICAgaW50ZXJhY3Qub2ZmKGV2ZW50VHlwZSwgbGlzdGVuZXIsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIHJldHVybiBpbnRlcmFjdDtcbiAgfVxuXG4gIGlmICh1dGlscy5pcy5vYmplY3QodHlwZSkpIHtcbiAgICBmb3IgKHZhciBwcm9wIGluIHR5cGUpIHtcbiAgICAgIGludGVyYWN0Lm9mZihwcm9wLCB0eXBlW3Byb3BdLCBsaXN0ZW5lcik7XG4gICAgfVxuXG4gICAgcmV0dXJuIGludGVyYWN0O1xuICB9XG5cbiAgaWYgKCF1dGlscy5jb250YWlucyhJbnRlcmFjdGFibGUuZXZlbnRUeXBlcywgdHlwZSkpIHtcbiAgICBldmVudHMucmVtb3ZlKHNjb3BlLmRvY3VtZW50LCB0eXBlLCBsaXN0ZW5lciwgb3B0aW9ucyk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIGluZGV4ID0gdm9pZCAwO1xuXG4gICAgaWYgKHR5cGUgaW4gZ2xvYmFsRXZlbnRzICYmIChpbmRleCA9IGdsb2JhbEV2ZW50c1t0eXBlXS5pbmRleE9mKGxpc3RlbmVyKSkgIT09IC0xKSB7XG4gICAgICBnbG9iYWxFdmVudHNbdHlwZV0uc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gaW50ZXJhY3Q7XG59O1xuXG4vKipcbiAqIFJldHVybnMgYW4gb2JqZWN0IHdoaWNoIGV4cG9zZXMgaW50ZXJuYWwgZGF0YVxuXG4gKiBAYWxpYXMgbW9kdWxlOmludGVyYWN0LmRlYnVnXG4gKlxuICogQHJldHVybiB7b2JqZWN0fSBBbiBvYmplY3Qgd2l0aCBwcm9wZXJ0aWVzIHRoYXQgb3V0bGluZSB0aGUgY3VycmVudCBzdGF0ZVxuICogYW5kIGV4cG9zZSBpbnRlcm5hbCBmdW5jdGlvbnMgYW5kIHZhcmlhYmxlc1xuICovXG5pbnRlcmFjdC5kZWJ1ZyA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHNjb3BlO1xufTtcblxuLy8gZXhwb3NlIHRoZSBmdW5jdGlvbnMgdXNlZCB0byBjYWxjdWxhdGUgbXVsdGktdG91Y2ggcHJvcGVydGllc1xuaW50ZXJhY3QuZ2V0UG9pbnRlckF2ZXJhZ2UgPSB1dGlscy5wb2ludGVyQXZlcmFnZTtcbmludGVyYWN0LmdldFRvdWNoQkJveCA9IHV0aWxzLnRvdWNoQkJveDtcbmludGVyYWN0LmdldFRvdWNoRGlzdGFuY2UgPSB1dGlscy50b3VjaERpc3RhbmNlO1xuaW50ZXJhY3QuZ2V0VG91Y2hBbmdsZSA9IHV0aWxzLnRvdWNoQW5nbGU7XG5cbmludGVyYWN0LmdldEVsZW1lbnRSZWN0ID0gdXRpbHMuZ2V0RWxlbWVudFJlY3Q7XG5pbnRlcmFjdC5nZXRFbGVtZW50Q2xpZW50UmVjdCA9IHV0aWxzLmdldEVsZW1lbnRDbGllbnRSZWN0O1xuaW50ZXJhY3QubWF0Y2hlc1NlbGVjdG9yID0gdXRpbHMubWF0Y2hlc1NlbGVjdG9yO1xuaW50ZXJhY3QuY2xvc2VzdCA9IHV0aWxzLmNsb3Nlc3Q7XG5cbi8qKlxuICogQGFsaWFzIG1vZHVsZTppbnRlcmFjdC5zdXBwb3J0c1RvdWNoXG4gKlxuICogQHJldHVybiB7Ym9vbGVhbn0gV2hldGhlciBvciBub3QgdGhlIGJyb3dzZXIgc3VwcG9ydHMgdG91Y2ggaW5wdXRcbiAqL1xuaW50ZXJhY3Quc3VwcG9ydHNUb3VjaCA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIGJyb3dzZXIuc3VwcG9ydHNUb3VjaDtcbn07XG5cbi8qKlxuICogQGFsaWFzIG1vZHVsZTppbnRlcmFjdC5zdXBwb3J0c1BvaW50ZXJFdmVudFxuICpcbiAqIEByZXR1cm4ge2Jvb2xlYW59IFdoZXRoZXIgb3Igbm90IHRoZSBicm93c2VyIHN1cHBvcnRzIFBvaW50ZXJFdmVudHNcbiAqL1xuaW50ZXJhY3Quc3VwcG9ydHNQb2ludGVyRXZlbnQgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBicm93c2VyLnN1cHBvcnRzUG9pbnRlckV2ZW50O1xufTtcblxuLyoqXG4gKiBDYW5jZWxzIGFsbCBpbnRlcmFjdGlvbnMgKGVuZCBldmVudHMgYXJlIG5vdCBmaXJlZClcbiAqXG4gKiBAYWxpYXMgbW9kdWxlOmludGVyYWN0LnN0b3BcbiAqXG4gKiBAcGFyYW0ge0V2ZW50fSBldmVudCBBbiBldmVudCBvbiB3aGljaCB0byBjYWxsIHByZXZlbnREZWZhdWx0KClcbiAqIEByZXR1cm4ge29iamVjdH0gaW50ZXJhY3RcbiAqL1xuaW50ZXJhY3Quc3RvcCA9IGZ1bmN0aW9uIChldmVudCkge1xuICBmb3IgKHZhciBpID0gc2NvcGUuaW50ZXJhY3Rpb25zLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgc2NvcGUuaW50ZXJhY3Rpb25zW2ldLnN0b3AoZXZlbnQpO1xuICB9XG5cbiAgcmV0dXJuIGludGVyYWN0O1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIG9yIHNldHMgdGhlIGRpc3RhbmNlIHRoZSBwb2ludGVyIG11c3QgYmUgbW92ZWQgYmVmb3JlIGFuIGFjdGlvblxuICogc2VxdWVuY2Ugb2NjdXJzLiBUaGlzIGFsc28gYWZmZWN0cyB0b2xlcmFuY2UgZm9yIHRhcCBldmVudHMuXG4gKlxuICogQGFsaWFzIG1vZHVsZTppbnRlcmFjdC5wb2ludGVyTW92ZVRvbGVyYW5jZVxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSBbbmV3VmFsdWVdIFRoZSBtb3ZlbWVudCBmcm9tIHRoZSBzdGFydCBwb3NpdGlvbiBtdXN0IGJlIGdyZWF0ZXIgdGhhbiB0aGlzIHZhbHVlXG4gKiBAcmV0dXJuIHtpbnRlcmFjdCB8IG51bWJlcn1cbiAqL1xuaW50ZXJhY3QucG9pbnRlck1vdmVUb2xlcmFuY2UgPSBmdW5jdGlvbiAobmV3VmFsdWUpIHtcbiAgaWYgKHV0aWxzLmlzLm51bWJlcihuZXdWYWx1ZSkpIHtcbiAgICBJbnRlcmFjdGlvbi5wb2ludGVyTW92ZVRvbGVyYW5jZSA9IG5ld1ZhbHVlO1xuXG4gICAgcmV0dXJuIGludGVyYWN0O1xuICB9XG5cbiAgcmV0dXJuIEludGVyYWN0aW9uLnBvaW50ZXJNb3ZlVG9sZXJhbmNlO1xufTtcblxuaW50ZXJhY3QuYWRkRG9jdW1lbnQgPSBzY29wZS5hZGREb2N1bWVudDtcbmludGVyYWN0LnJlbW92ZURvY3VtZW50ID0gc2NvcGUucmVtb3ZlRG9jdW1lbnQ7XG5cbnNjb3BlLmludGVyYWN0ID0gaW50ZXJhY3Q7XG5cbm1vZHVsZS5leHBvcnRzID0gaW50ZXJhY3Q7XG5cbn0se1wiLi9JbnRlcmFjdGFibGVcIjo0LFwiLi9JbnRlcmFjdGlvblwiOjUsXCIuL3Njb3BlXCI6MzMsXCIuL3V0aWxzXCI6NDQsXCIuL3V0aWxzL2Jyb3dzZXJcIjozNixcIi4vdXRpbHMvZXZlbnRzXCI6NDB9XSwyMjpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4ndXNlIHN0cmljdCc7XG5cbnZhciBJbnRlcmFjdGFibGUgPSByZXF1aXJlKCcuL0ludGVyYWN0YWJsZScpO1xudmFyIEludGVyYWN0aW9uID0gcmVxdWlyZSgnLi9JbnRlcmFjdGlvbicpO1xudmFyIHNjb3BlID0gcmVxdWlyZSgnLi9zY29wZScpO1xudmFyIGlzID0gcmVxdWlyZSgnLi91dGlscy9pcycpO1xudmFyIGV2ZW50cyA9IHJlcXVpcmUoJy4vdXRpbHMvZXZlbnRzJyk7XG52YXIgYnJvd3NlciA9IHJlcXVpcmUoJy4vdXRpbHMvYnJvd3NlcicpO1xuXG52YXIgX3JlcXVpcmUgPSByZXF1aXJlKCcuL3V0aWxzL2RvbVV0aWxzJyksXG4gICAgbm9kZUNvbnRhaW5zID0gX3JlcXVpcmUubm9kZUNvbnRhaW5zLFxuICAgIG1hdGNoZXNTZWxlY3RvciA9IF9yZXF1aXJlLm1hdGNoZXNTZWxlY3RvcjtcblxuLyoqXG4gKiBSZXR1cm5zIG9yIHNldHMgd2hldGhlciB0byBwcmV2ZW50IHRoZSBicm93c2VyJ3MgZGVmYXVsdCBiZWhhdmlvdXIgaW5cbiAqIHJlc3BvbnNlIHRvIHBvaW50ZXIgZXZlbnRzLiBDYW4gYmUgc2V0IHRvOlxuICogIC0gYCdhbHdheXMnYCB0byBhbHdheXMgcHJldmVudFxuICogIC0gYCduZXZlcidgIHRvIG5ldmVyIHByZXZlbnRcbiAqICAtIGAnYXV0bydgIHRvIGxldCBpbnRlcmFjdC5qcyB0cnkgdG8gZGV0ZXJtaW5lIHdoYXQgd291bGQgYmUgYmVzdFxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBbbmV3VmFsdWVdIGB0cnVlYCwgYGZhbHNlYCBvciBgJ2F1dG8nYFxuICogQHJldHVybiB7c3RyaW5nIHwgSW50ZXJhY3RhYmxlfSBUaGUgY3VycmVudCBzZXR0aW5nIG9yIHRoaXMgSW50ZXJhY3RhYmxlXG4gKi9cblxuXG5JbnRlcmFjdGFibGUucHJvdG90eXBlLnByZXZlbnREZWZhdWx0ID0gZnVuY3Rpb24gKG5ld1ZhbHVlKSB7XG4gIGlmICgvXihhbHdheXN8bmV2ZXJ8YXV0bykkLy50ZXN0KG5ld1ZhbHVlKSkge1xuICAgIHRoaXMub3B0aW9ucy5wcmV2ZW50RGVmYXVsdCA9IG5ld1ZhbHVlO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgaWYgKGlzLmJvb2wobmV3VmFsdWUpKSB7XG4gICAgdGhpcy5vcHRpb25zLnByZXZlbnREZWZhdWx0ID0gbmV3VmFsdWUgPyAnYWx3YXlzJyA6ICduZXZlcic7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICByZXR1cm4gdGhpcy5vcHRpb25zLnByZXZlbnREZWZhdWx0O1xufTtcblxuSW50ZXJhY3RhYmxlLnByb3RvdHlwZS5jaGVja0FuZFByZXZlbnREZWZhdWx0ID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gIHZhciBzZXR0aW5nID0gdGhpcy5vcHRpb25zLnByZXZlbnREZWZhdWx0O1xuXG4gIGlmIChzZXR0aW5nID09PSAnbmV2ZXInKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKHNldHRpbmcgPT09ICdhbHdheXMnKSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBzZXR0aW5nID09PSAnYXV0bydcblxuICAvLyBkb24ndCBwcmV2ZW50RGVmYXVsdCBvZiB0b3VjaHtzdGFydCxtb3ZlfSBldmVudHMgaWYgdGhlIGJyb3dzZXIgc3VwcG9ydHMgcGFzc2l2ZVxuICAvLyBldmVudHMgbGlzdGVuZXJzLiBDU1MgdG91Y2gtYWN0aW9uIGFuZCB1c2VyLXNlbGVjY3Qgc2hvdWxkIGJlIHVzZWQgaW5zdGVhZFxuICBpZiAoZXZlbnRzLnN1cHBvcnRzUGFzc2l2ZSAmJiAvXnRvdWNoKHN0YXJ0fG1vdmUpJC8udGVzdChldmVudC50eXBlKSAmJiAhYnJvd3Nlci5pc0lPUykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIGRvbid0IHByZXZlbnREZWZhdWx0IG9mIHBvaW50ZXJkb3duIGV2ZW50c1xuICBpZiAoL14obW91c2V8cG9pbnRlcnx0b3VjaCkqKGRvd258c3RhcnQpL2kudGVzdChldmVudC50eXBlKSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIGRvbid0IHByZXZlbnREZWZhdWx0IG9uIGVkaXRhYmxlIGVsZW1lbnRzXG4gIGlmIChpcy5lbGVtZW50KGV2ZW50LnRhcmdldCkgJiYgbWF0Y2hlc1NlbGVjdG9yKGV2ZW50LnRhcmdldCwgJ2lucHV0LHNlbGVjdCx0ZXh0YXJlYSxbY29udGVudGVkaXRhYmxlPXRydWVdLFtjb250ZW50ZWRpdGFibGU9dHJ1ZV0gKicpKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbn07XG5cbmZ1bmN0aW9uIG9uSW50ZXJhY3Rpb25FdmVudChfcmVmKSB7XG4gIHZhciBpbnRlcmFjdGlvbiA9IF9yZWYuaW50ZXJhY3Rpb24sXG4gICAgICBldmVudCA9IF9yZWYuZXZlbnQ7XG5cbiAgaWYgKGludGVyYWN0aW9uLnRhcmdldCkge1xuICAgIGludGVyYWN0aW9uLnRhcmdldC5jaGVja0FuZFByZXZlbnREZWZhdWx0KGV2ZW50KTtcbiAgfVxufVxuXG52YXIgX2FyciA9IFsnZG93bicsICdtb3ZlJywgJ3VwJywgJ2NhbmNlbCddO1xuZm9yICh2YXIgX2kgPSAwOyBfaSA8IF9hcnIubGVuZ3RoOyBfaSsrKSB7XG4gIHZhciBldmVudFNpZ25hbCA9IF9hcnJbX2ldO1xuICBJbnRlcmFjdGlvbi5zaWduYWxzLm9uKGV2ZW50U2lnbmFsLCBvbkludGVyYWN0aW9uRXZlbnQpO1xufVxuXG4vLyBwcmV2ZW50IG5hdGl2ZSBIVE1MNSBkcmFnIG9uIGludGVyYWN0LmpzIHRhcmdldCBlbGVtZW50c1xuSW50ZXJhY3Rpb24uZG9jRXZlbnRzLmRyYWdzdGFydCA9IGZ1bmN0aW9uIHByZXZlbnROYXRpdmVEcmFnKGV2ZW50KSB7XG4gIGZvciAodmFyIF9pMiA9IDA7IF9pMiA8IHNjb3BlLmludGVyYWN0aW9ucy5sZW5ndGg7IF9pMisrKSB7XG4gICAgdmFyIF9yZWYyO1xuXG4gICAgX3JlZjIgPSBzY29wZS5pbnRlcmFjdGlvbnNbX2kyXTtcbiAgICB2YXIgaW50ZXJhY3Rpb24gPSBfcmVmMjtcblxuXG4gICAgaWYgKGludGVyYWN0aW9uLmVsZW1lbnQgJiYgKGludGVyYWN0aW9uLmVsZW1lbnQgPT09IGV2ZW50LnRhcmdldCB8fCBub2RlQ29udGFpbnMoaW50ZXJhY3Rpb24uZWxlbWVudCwgZXZlbnQudGFyZ2V0KSkpIHtcblxuICAgICAgaW50ZXJhY3Rpb24udGFyZ2V0LmNoZWNrQW5kUHJldmVudERlZmF1bHQoZXZlbnQpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfVxufTtcblxufSx7XCIuL0ludGVyYWN0YWJsZVwiOjQsXCIuL0ludGVyYWN0aW9uXCI6NSxcIi4vc2NvcGVcIjozMyxcIi4vdXRpbHMvYnJvd3NlclwiOjM2LFwiLi91dGlscy9kb21VdGlsc1wiOjM5LFwiLi91dGlscy9ldmVudHNcIjo0MCxcIi4vdXRpbHMvaXNcIjo0Nn1dLDIzOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbid1c2Ugc3RyaWN0JztcblxudmFyIEludGVyYWN0RXZlbnQgPSByZXF1aXJlKCcuLi9JbnRlcmFjdEV2ZW50Jyk7XG52YXIgSW50ZXJhY3Rpb24gPSByZXF1aXJlKCcuLi9JbnRlcmFjdGlvbicpO1xudmFyIGV4dGVuZCA9IHJlcXVpcmUoJy4uL3V0aWxzL2V4dGVuZCcpO1xuXG52YXIgbW9kaWZpZXJzID0ge1xuICBuYW1lczogW10sXG5cbiAgc2V0T2Zmc2V0czogZnVuY3Rpb24gc2V0T2Zmc2V0cyhhcmcpIHtcbiAgICB2YXIgaW50ZXJhY3Rpb24gPSBhcmcuaW50ZXJhY3Rpb24sXG4gICAgICAgIHBhZ2UgPSBhcmcucGFnZUNvb3JkcztcbiAgICB2YXIgdGFyZ2V0ID0gaW50ZXJhY3Rpb24udGFyZ2V0LFxuICAgICAgICBlbGVtZW50ID0gaW50ZXJhY3Rpb24uZWxlbWVudCxcbiAgICAgICAgc3RhcnRPZmZzZXQgPSBpbnRlcmFjdGlvbi5zdGFydE9mZnNldDtcblxuICAgIHZhciByZWN0ID0gdGFyZ2V0LmdldFJlY3QoZWxlbWVudCk7XG5cbiAgICBpZiAocmVjdCkge1xuICAgICAgc3RhcnRPZmZzZXQubGVmdCA9IHBhZ2UueCAtIHJlY3QubGVmdDtcbiAgICAgIHN0YXJ0T2Zmc2V0LnRvcCA9IHBhZ2UueSAtIHJlY3QudG9wO1xuXG4gICAgICBzdGFydE9mZnNldC5yaWdodCA9IHJlY3QucmlnaHQgLSBwYWdlLng7XG4gICAgICBzdGFydE9mZnNldC5ib3R0b20gPSByZWN0LmJvdHRvbSAtIHBhZ2UueTtcblxuICAgICAgaWYgKCEoJ3dpZHRoJyBpbiByZWN0KSkge1xuICAgICAgICByZWN0LndpZHRoID0gcmVjdC5yaWdodCAtIHJlY3QubGVmdDtcbiAgICAgIH1cbiAgICAgIGlmICghKCdoZWlnaHQnIGluIHJlY3QpKSB7XG4gICAgICAgIHJlY3QuaGVpZ2h0ID0gcmVjdC5ib3R0b20gLSByZWN0LnRvcDtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgc3RhcnRPZmZzZXQubGVmdCA9IHN0YXJ0T2Zmc2V0LnRvcCA9IHN0YXJ0T2Zmc2V0LnJpZ2h0ID0gc3RhcnRPZmZzZXQuYm90dG9tID0gMDtcbiAgICB9XG5cbiAgICBhcmcucmVjdCA9IHJlY3Q7XG4gICAgYXJnLmludGVyYWN0YWJsZSA9IHRhcmdldDtcbiAgICBhcmcuZWxlbWVudCA9IGVsZW1lbnQ7XG5cbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbW9kaWZpZXJzLm5hbWVzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9yZWY7XG5cbiAgICAgIF9yZWYgPSBtb2RpZmllcnMubmFtZXNbX2ldO1xuICAgICAgdmFyIG1vZGlmaWVyTmFtZSA9IF9yZWY7XG5cbiAgICAgIGFyZy5vcHRpb25zID0gdGFyZ2V0Lm9wdGlvbnNbaW50ZXJhY3Rpb24ucHJlcGFyZWQubmFtZV1bbW9kaWZpZXJOYW1lXTtcblxuICAgICAgaWYgKCFhcmcub3B0aW9ucykge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaW50ZXJhY3Rpb24ubW9kaWZpZXJPZmZzZXRzW21vZGlmaWVyTmFtZV0gPSBtb2RpZmllcnNbbW9kaWZpZXJOYW1lXS5zZXRPZmZzZXQoYXJnKTtcbiAgICB9XG4gIH0sXG5cbiAgc2V0QWxsOiBmdW5jdGlvbiBzZXRBbGwoYXJnKSB7XG4gICAgdmFyIGludGVyYWN0aW9uID0gYXJnLmludGVyYWN0aW9uLFxuICAgICAgICBzdGF0dXNlcyA9IGFyZy5zdGF0dXNlcyxcbiAgICAgICAgcHJlRW5kID0gYXJnLnByZUVuZCxcbiAgICAgICAgcmVxdWlyZUVuZE9ubHkgPSBhcmcucmVxdWlyZUVuZE9ubHk7XG5cbiAgICB2YXIgcmVzdWx0ID0ge1xuICAgICAgZHg6IDAsXG4gICAgICBkeTogMCxcbiAgICAgIGNoYW5nZWQ6IGZhbHNlLFxuICAgICAgbG9ja2VkOiBmYWxzZSxcbiAgICAgIHNob3VsZE1vdmU6IHRydWVcbiAgICB9O1xuXG4gICAgYXJnLm1vZGlmaWVkQ29vcmRzID0gZXh0ZW5kKHt9LCBhcmcucGFnZUNvb3Jkcyk7XG5cbiAgICBmb3IgKHZhciBfaTIgPSAwOyBfaTIgPCBtb2RpZmllcnMubmFtZXMubGVuZ3RoOyBfaTIrKykge1xuICAgICAgdmFyIF9yZWYyO1xuXG4gICAgICBfcmVmMiA9IG1vZGlmaWVycy5uYW1lc1tfaTJdO1xuICAgICAgdmFyIG1vZGlmaWVyTmFtZSA9IF9yZWYyO1xuXG4gICAgICB2YXIgbW9kaWZpZXIgPSBtb2RpZmllcnNbbW9kaWZpZXJOYW1lXTtcbiAgICAgIHZhciBvcHRpb25zID0gaW50ZXJhY3Rpb24udGFyZ2V0Lm9wdGlvbnNbaW50ZXJhY3Rpb24ucHJlcGFyZWQubmFtZV1bbW9kaWZpZXJOYW1lXTtcblxuICAgICAgaWYgKCFzaG91bGREbyhvcHRpb25zLCBwcmVFbmQsIHJlcXVpcmVFbmRPbmx5KSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgYXJnLnN0YXR1cyA9IGFyZy5zdGF0dXMgPSBzdGF0dXNlc1ttb2RpZmllck5hbWVdO1xuICAgICAgYXJnLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgICAgYXJnLm9mZnNldCA9IGFyZy5pbnRlcmFjdGlvbi5tb2RpZmllck9mZnNldHNbbW9kaWZpZXJOYW1lXTtcblxuICAgICAgbW9kaWZpZXIuc2V0KGFyZyk7XG5cbiAgICAgIGlmIChhcmcuc3RhdHVzLmxvY2tlZCkge1xuICAgICAgICBhcmcubW9kaWZpZWRDb29yZHMueCArPSBhcmcuc3RhdHVzLmR4O1xuICAgICAgICBhcmcubW9kaWZpZWRDb29yZHMueSArPSBhcmcuc3RhdHVzLmR5O1xuXG4gICAgICAgIHJlc3VsdC5keCArPSBhcmcuc3RhdHVzLmR4O1xuICAgICAgICByZXN1bHQuZHkgKz0gYXJnLnN0YXR1cy5keTtcblxuICAgICAgICByZXN1bHQubG9ja2VkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBhIG1vdmUgc2hvdWxkIGJlIGZpcmVkIGlmOlxuICAgIC8vICAtIHRoZXJlIGFyZSBubyBtb2RpZmllcnMgZW5hYmxlZCxcbiAgICAvLyAgLSBubyBtb2RpZmllcnMgYXJlIFwibG9ja2VkXCIgaS5lLiBoYXZlIGNoYW5nZWQgdGhlIHBvaW50ZXIncyBjb29yZGluYXRlcywgb3JcbiAgICAvLyAgLSB0aGUgbG9ja2VkIGNvb3JkcyBoYXZlIGNoYW5nZWQgc2luY2UgdGhlIGxhc3QgcG9pbnRlciBtb3ZlXG4gICAgcmVzdWx0LnNob3VsZE1vdmUgPSAhYXJnLnN0YXR1cyB8fCAhcmVzdWx0LmxvY2tlZCB8fCBhcmcuc3RhdHVzLmNoYW5nZWQ7XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9LFxuXG4gIHJlc2V0U3RhdHVzZXM6IGZ1bmN0aW9uIHJlc2V0U3RhdHVzZXMoc3RhdHVzZXMpIHtcbiAgICBmb3IgKHZhciBfaTMgPSAwOyBfaTMgPCBtb2RpZmllcnMubmFtZXMubGVuZ3RoOyBfaTMrKykge1xuICAgICAgdmFyIF9yZWYzO1xuXG4gICAgICBfcmVmMyA9IG1vZGlmaWVycy5uYW1lc1tfaTNdO1xuICAgICAgdmFyIG1vZGlmaWVyTmFtZSA9IF9yZWYzO1xuXG4gICAgICB2YXIgc3RhdHVzID0gc3RhdHVzZXNbbW9kaWZpZXJOYW1lXSB8fCB7fTtcblxuICAgICAgc3RhdHVzLmR4ID0gc3RhdHVzLmR5ID0gMDtcbiAgICAgIHN0YXR1cy5tb2RpZmllZFggPSBzdGF0dXMubW9kaWZpZWRZID0gTmFOO1xuICAgICAgc3RhdHVzLmxvY2tlZCA9IGZhbHNlO1xuICAgICAgc3RhdHVzLmNoYW5nZWQgPSB0cnVlO1xuXG4gICAgICBzdGF0dXNlc1ttb2RpZmllck5hbWVdID0gc3RhdHVzO1xuICAgIH1cblxuICAgIHJldHVybiBzdGF0dXNlcztcbiAgfSxcblxuICBzdGFydDogZnVuY3Rpb24gc3RhcnQoX3JlZjQsIHNpZ25hbE5hbWUpIHtcbiAgICB2YXIgaW50ZXJhY3Rpb24gPSBfcmVmNC5pbnRlcmFjdGlvbjtcblxuICAgIHZhciBhcmcgPSB7XG4gICAgICBpbnRlcmFjdGlvbjogaW50ZXJhY3Rpb24sXG4gICAgICBwYWdlQ29vcmRzOiAoc2lnbmFsTmFtZSA9PT0gJ2FjdGlvbi1yZXN1bWUnID8gaW50ZXJhY3Rpb24uY3VyQ29vcmRzIDogaW50ZXJhY3Rpb24uc3RhcnRDb29yZHMpLnBhZ2UsXG4gICAgICBzdGFydE9mZnNldDogaW50ZXJhY3Rpb24uc3RhcnRPZmZzZXQsXG4gICAgICBzdGF0dXNlczogaW50ZXJhY3Rpb24ubW9kaWZpZXJTdGF0dXNlcyxcbiAgICAgIHByZUVuZDogZmFsc2UsXG4gICAgICByZXF1aXJlRW5kT25seTogZmFsc2VcbiAgICB9O1xuXG4gICAgbW9kaWZpZXJzLnNldE9mZnNldHMoYXJnKTtcbiAgICBtb2RpZmllcnMucmVzZXRTdGF0dXNlcyhhcmcuc3RhdHVzZXMpO1xuXG4gICAgYXJnLnBhZ2VDb29yZHMgPSBleHRlbmQoe30sIGludGVyYWN0aW9uLnN0YXJ0Q29vcmRzLnBhZ2UpO1xuICAgIGludGVyYWN0aW9uLm1vZGlmaWVyUmVzdWx0ID0gbW9kaWZpZXJzLnNldEFsbChhcmcpO1xuICB9LFxuXG4gIGJlZm9yZU1vdmU6IGZ1bmN0aW9uIGJlZm9yZU1vdmUoX3JlZjUpIHtcbiAgICB2YXIgaW50ZXJhY3Rpb24gPSBfcmVmNS5pbnRlcmFjdGlvbixcbiAgICAgICAgcHJlRW5kID0gX3JlZjUucHJlRW5kLFxuICAgICAgICBpbnRlcmFjdGluZ0JlZm9yZU1vdmUgPSBfcmVmNS5pbnRlcmFjdGluZ0JlZm9yZU1vdmU7XG5cbiAgICB2YXIgbW9kaWZpZXJSZXN1bHQgPSBtb2RpZmllcnMuc2V0QWxsKHtcbiAgICAgIGludGVyYWN0aW9uOiBpbnRlcmFjdGlvbixcbiAgICAgIHByZUVuZDogcHJlRW5kLFxuICAgICAgcGFnZUNvb3JkczogaW50ZXJhY3Rpb24uY3VyQ29vcmRzLnBhZ2UsXG4gICAgICBzdGF0dXNlczogaW50ZXJhY3Rpb24ubW9kaWZpZXJTdGF0dXNlcyxcbiAgICAgIHJlcXVpcmVFbmRPbmx5OiBmYWxzZVxuICAgIH0pO1xuXG4gICAgLy8gZG9uJ3QgZmlyZSBhbiBhY3Rpb24gbW92ZSBpZiBhIG1vZGlmaWVyIHdvdWxkIGtlZXAgdGhlIGV2ZW50IGluIHRoZSBzYW1lXG4gICAgLy8gY29yZGluYXRlcyBhcyBiZWZvcmVcbiAgICBpZiAoIW1vZGlmaWVyUmVzdWx0LnNob3VsZE1vdmUgJiYgaW50ZXJhY3RpbmdCZWZvcmVNb3ZlKSB7XG4gICAgICBpbnRlcmFjdGlvbi5fZG9udEZpcmVNb3ZlID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpbnRlcmFjdGlvbi5tb2RpZmllclJlc3VsdCA9IG1vZGlmaWVyUmVzdWx0O1xuICB9LFxuXG4gIGVuZDogZnVuY3Rpb24gZW5kKF9yZWY2KSB7XG4gICAgdmFyIGludGVyYWN0aW9uID0gX3JlZjYuaW50ZXJhY3Rpb24sXG4gICAgICAgIGV2ZW50ID0gX3JlZjYuZXZlbnQ7XG5cbiAgICBmb3IgKHZhciBfaTQgPSAwOyBfaTQgPCBtb2RpZmllcnMubmFtZXMubGVuZ3RoOyBfaTQrKykge1xuICAgICAgdmFyIF9yZWY3O1xuXG4gICAgICBfcmVmNyA9IG1vZGlmaWVycy5uYW1lc1tfaTRdO1xuICAgICAgdmFyIG1vZGlmaWVyTmFtZSA9IF9yZWY3O1xuXG4gICAgICB2YXIgb3B0aW9ucyA9IGludGVyYWN0aW9uLnRhcmdldC5vcHRpb25zW2ludGVyYWN0aW9uLnByZXBhcmVkLm5hbWVdW21vZGlmaWVyTmFtZV07XG5cbiAgICAgIC8vIGlmIHRoZSBlbmRPbmx5IG9wdGlvbiBpcyB0cnVlIGZvciBhbnkgbW9kaWZpZXJcbiAgICAgIGlmIChzaG91bGREbyhvcHRpb25zLCB0cnVlLCB0cnVlKSkge1xuICAgICAgICAvLyBmaXJlIGEgbW92ZSBldmVudCBhdCB0aGUgbW9kaWZpZWQgY29vcmRpbmF0ZXNcbiAgICAgICAgaW50ZXJhY3Rpb24uZG9Nb3ZlKHsgZXZlbnQ6IGV2ZW50LCBwcmVFbmQ6IHRydWUgfSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICBzZXRYWTogZnVuY3Rpb24gc2V0WFkoYXJnKSB7XG4gICAgdmFyIGlFdmVudCA9IGFyZy5pRXZlbnQsXG4gICAgICAgIGludGVyYWN0aW9uID0gYXJnLmludGVyYWN0aW9uO1xuXG4gICAgdmFyIG1vZGlmaWVyQXJnID0gZXh0ZW5kKHt9LCBhcmcpO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtb2RpZmllcnMubmFtZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBtb2RpZmllck5hbWUgPSBtb2RpZmllcnMubmFtZXNbaV07XG4gICAgICBtb2RpZmllckFyZy5vcHRpb25zID0gaW50ZXJhY3Rpb24udGFyZ2V0Lm9wdGlvbnNbaW50ZXJhY3Rpb24ucHJlcGFyZWQubmFtZV1bbW9kaWZpZXJOYW1lXTtcblxuICAgICAgaWYgKCFtb2RpZmllckFyZy5vcHRpb25zKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICB2YXIgbW9kaWZpZXIgPSBtb2RpZmllcnNbbW9kaWZpZXJOYW1lXTtcblxuICAgICAgbW9kaWZpZXJBcmcuc3RhdHVzID0gaW50ZXJhY3Rpb24ubW9kaWZpZXJTdGF0dXNlc1ttb2RpZmllck5hbWVdO1xuXG4gICAgICBpRXZlbnRbbW9kaWZpZXJOYW1lXSA9IG1vZGlmaWVyLm1vZGlmeUNvb3Jkcyhtb2RpZmllckFyZyk7XG4gICAgfVxuICB9XG59O1xuXG5JbnRlcmFjdGlvbi5zaWduYWxzLm9uKCduZXcnLCBmdW5jdGlvbiAoaW50ZXJhY3Rpb24pIHtcbiAgaW50ZXJhY3Rpb24uc3RhcnRPZmZzZXQgPSB7IGxlZnQ6IDAsIHJpZ2h0OiAwLCB0b3A6IDAsIGJvdHRvbTogMCB9O1xuICBpbnRlcmFjdGlvbi5tb2RpZmllck9mZnNldHMgPSB7fTtcbiAgaW50ZXJhY3Rpb24ubW9kaWZpZXJTdGF0dXNlcyA9IG1vZGlmaWVycy5yZXNldFN0YXR1c2VzKHt9KTtcbiAgaW50ZXJhY3Rpb24ubW9kaWZpZXJSZXN1bHQgPSBudWxsO1xufSk7XG5cbkludGVyYWN0aW9uLnNpZ25hbHMub24oJ2FjdGlvbi1zdGFydCcsIG1vZGlmaWVycy5zdGFydCk7XG5JbnRlcmFjdGlvbi5zaWduYWxzLm9uKCdhY3Rpb24tcmVzdW1lJywgbW9kaWZpZXJzLnN0YXJ0KTtcbkludGVyYWN0aW9uLnNpZ25hbHMub24oJ2JlZm9yZS1hY3Rpb24tbW92ZScsIG1vZGlmaWVycy5iZWZvcmVNb3ZlKTtcbkludGVyYWN0aW9uLnNpZ25hbHMub24oJ2FjdGlvbi1lbmQnLCBtb2RpZmllcnMuZW5kKTtcblxuSW50ZXJhY3RFdmVudC5zaWduYWxzLm9uKCdzZXQteHknLCBtb2RpZmllcnMuc2V0WFkpO1xuXG5mdW5jdGlvbiBzaG91bGREbyhvcHRpb25zLCBwcmVFbmQsIHJlcXVpcmVFbmRPbmx5KSB7XG4gIHJldHVybiBvcHRpb25zICYmIG9wdGlvbnMuZW5hYmxlZCAmJiAocHJlRW5kIHx8ICFvcHRpb25zLmVuZE9ubHkpICYmICghcmVxdWlyZUVuZE9ubHkgfHwgb3B0aW9ucy5lbmRPbmx5KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBtb2RpZmllcnM7XG5cbn0se1wiLi4vSW50ZXJhY3RFdmVudFwiOjMsXCIuLi9JbnRlcmFjdGlvblwiOjUsXCIuLi91dGlscy9leHRlbmRcIjo0MX1dLDI0OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbid1c2Ugc3RyaWN0JztcblxudmFyIG1vZGlmaWVycyA9IHJlcXVpcmUoJy4vYmFzZScpO1xudmFyIHV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMnKTtcbnZhciBkZWZhdWx0T3B0aW9ucyA9IHJlcXVpcmUoJy4uL2RlZmF1bHRPcHRpb25zJyk7XG5cbnZhciByZXN0cmljdCA9IHtcbiAgZGVmYXVsdHM6IHtcbiAgICBlbmFibGVkOiBmYWxzZSxcbiAgICBlbmRPbmx5OiBmYWxzZSxcbiAgICByZXN0cmljdGlvbjogbnVsbCxcbiAgICBlbGVtZW50UmVjdDogbnVsbFxuICB9LFxuXG4gIHNldE9mZnNldDogZnVuY3Rpb24gc2V0T2Zmc2V0KF9yZWYpIHtcbiAgICB2YXIgcmVjdCA9IF9yZWYucmVjdCxcbiAgICAgICAgc3RhcnRPZmZzZXQgPSBfcmVmLnN0YXJ0T2Zmc2V0LFxuICAgICAgICBvcHRpb25zID0gX3JlZi5vcHRpb25zO1xuXG4gICAgdmFyIGVsZW1lbnRSZWN0ID0gb3B0aW9ucyAmJiBvcHRpb25zLmVsZW1lbnRSZWN0O1xuICAgIHZhciBvZmZzZXQgPSB7fTtcblxuICAgIGlmIChyZWN0ICYmIGVsZW1lbnRSZWN0KSB7XG4gICAgICBvZmZzZXQubGVmdCA9IHN0YXJ0T2Zmc2V0LmxlZnQgLSByZWN0LndpZHRoICogZWxlbWVudFJlY3QubGVmdDtcbiAgICAgIG9mZnNldC50b3AgPSBzdGFydE9mZnNldC50b3AgLSByZWN0LmhlaWdodCAqIGVsZW1lbnRSZWN0LnRvcDtcblxuICAgICAgb2Zmc2V0LnJpZ2h0ID0gc3RhcnRPZmZzZXQucmlnaHQgLSByZWN0LndpZHRoICogKDEgLSBlbGVtZW50UmVjdC5yaWdodCk7XG4gICAgICBvZmZzZXQuYm90dG9tID0gc3RhcnRPZmZzZXQuYm90dG9tIC0gcmVjdC5oZWlnaHQgKiAoMSAtIGVsZW1lbnRSZWN0LmJvdHRvbSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG9mZnNldC5sZWZ0ID0gb2Zmc2V0LnRvcCA9IG9mZnNldC5yaWdodCA9IG9mZnNldC5ib3R0b20gPSAwO1xuICAgIH1cblxuICAgIHJldHVybiBvZmZzZXQ7XG4gIH0sXG5cbiAgc2V0OiBmdW5jdGlvbiBzZXQoX3JlZjIpIHtcbiAgICB2YXIgbW9kaWZpZWRDb29yZHMgPSBfcmVmMi5tb2RpZmllZENvb3JkcyxcbiAgICAgICAgaW50ZXJhY3Rpb24gPSBfcmVmMi5pbnRlcmFjdGlvbixcbiAgICAgICAgc3RhdHVzID0gX3JlZjIuc3RhdHVzLFxuICAgICAgICBvcHRpb25zID0gX3JlZjIub3B0aW9ucztcblxuICAgIGlmICghb3B0aW9ucykge1xuICAgICAgcmV0dXJuIHN0YXR1cztcbiAgICB9XG5cbiAgICB2YXIgcGFnZSA9IHN0YXR1cy51c2VTdGF0dXNYWSA/IHsgeDogc3RhdHVzLngsIHk6IHN0YXR1cy55IH0gOiB1dGlscy5leHRlbmQoe30sIG1vZGlmaWVkQ29vcmRzKTtcblxuICAgIHZhciByZXN0cmljdGlvbiA9IGdldFJlc3RyaWN0aW9uUmVjdChvcHRpb25zLnJlc3RyaWN0aW9uLCBpbnRlcmFjdGlvbiwgcGFnZSk7XG5cbiAgICBpZiAoIXJlc3RyaWN0aW9uKSB7XG4gICAgICByZXR1cm4gc3RhdHVzO1xuICAgIH1cblxuICAgIHN0YXR1cy5keCA9IDA7XG4gICAgc3RhdHVzLmR5ID0gMDtcbiAgICBzdGF0dXMubG9ja2VkID0gZmFsc2U7XG5cbiAgICB2YXIgcmVjdCA9IHJlc3RyaWN0aW9uO1xuICAgIHZhciBtb2RpZmllZFggPSBwYWdlLng7XG4gICAgdmFyIG1vZGlmaWVkWSA9IHBhZ2UueTtcblxuICAgIHZhciBvZmZzZXQgPSBpbnRlcmFjdGlvbi5tb2RpZmllck9mZnNldHMucmVzdHJpY3Q7XG5cbiAgICAvLyBvYmplY3QgaXMgYXNzdW1lZCB0byBoYXZlXG4gICAgLy8geCwgeSwgd2lkdGgsIGhlaWdodCBvclxuICAgIC8vIGxlZnQsIHRvcCwgcmlnaHQsIGJvdHRvbVxuICAgIGlmICgneCcgaW4gcmVzdHJpY3Rpb24gJiYgJ3knIGluIHJlc3RyaWN0aW9uKSB7XG4gICAgICBtb2RpZmllZFggPSBNYXRoLm1heChNYXRoLm1pbihyZWN0LnggKyByZWN0LndpZHRoIC0gb2Zmc2V0LnJpZ2h0LCBwYWdlLngpLCByZWN0LnggKyBvZmZzZXQubGVmdCk7XG4gICAgICBtb2RpZmllZFkgPSBNYXRoLm1heChNYXRoLm1pbihyZWN0LnkgKyByZWN0LmhlaWdodCAtIG9mZnNldC5ib3R0b20sIHBhZ2UueSksIHJlY3QueSArIG9mZnNldC50b3ApO1xuICAgIH0gZWxzZSB7XG4gICAgICBtb2RpZmllZFggPSBNYXRoLm1heChNYXRoLm1pbihyZWN0LnJpZ2h0IC0gb2Zmc2V0LnJpZ2h0LCBwYWdlLngpLCByZWN0LmxlZnQgKyBvZmZzZXQubGVmdCk7XG4gICAgICBtb2RpZmllZFkgPSBNYXRoLm1heChNYXRoLm1pbihyZWN0LmJvdHRvbSAtIG9mZnNldC5ib3R0b20sIHBhZ2UueSksIHJlY3QudG9wICsgb2Zmc2V0LnRvcCk7XG4gICAgfVxuXG4gICAgc3RhdHVzLmR4ID0gbW9kaWZpZWRYIC0gcGFnZS54O1xuICAgIHN0YXR1cy5keSA9IG1vZGlmaWVkWSAtIHBhZ2UueTtcblxuICAgIHN0YXR1cy5jaGFuZ2VkID0gc3RhdHVzLm1vZGlmaWVkWCAhPT0gbW9kaWZpZWRYIHx8IHN0YXR1cy5tb2RpZmllZFkgIT09IG1vZGlmaWVkWTtcbiAgICBzdGF0dXMubG9ja2VkID0gISEoc3RhdHVzLmR4IHx8IHN0YXR1cy5keSk7XG5cbiAgICBzdGF0dXMubW9kaWZpZWRYID0gbW9kaWZpZWRYO1xuICAgIHN0YXR1cy5tb2RpZmllZFkgPSBtb2RpZmllZFk7XG4gIH0sXG5cbiAgbW9kaWZ5Q29vcmRzOiBmdW5jdGlvbiBtb2RpZnlDb29yZHMoX3JlZjMpIHtcbiAgICB2YXIgcGFnZSA9IF9yZWYzLnBhZ2UsXG4gICAgICAgIGNsaWVudCA9IF9yZWYzLmNsaWVudCxcbiAgICAgICAgc3RhdHVzID0gX3JlZjMuc3RhdHVzLFxuICAgICAgICBwaGFzZSA9IF9yZWYzLnBoYXNlLFxuICAgICAgICBvcHRpb25zID0gX3JlZjMub3B0aW9ucztcblxuICAgIHZhciBlbGVtZW50UmVjdCA9IG9wdGlvbnMgJiYgb3B0aW9ucy5lbGVtZW50UmVjdDtcblxuICAgIGlmIChvcHRpb25zICYmIG9wdGlvbnMuZW5hYmxlZCAmJiAhKHBoYXNlID09PSAnc3RhcnQnICYmIGVsZW1lbnRSZWN0ICYmIHN0YXR1cy5sb2NrZWQpKSB7XG5cbiAgICAgIGlmIChzdGF0dXMubG9ja2VkKSB7XG4gICAgICAgIHBhZ2UueCArPSBzdGF0dXMuZHg7XG4gICAgICAgIHBhZ2UueSArPSBzdGF0dXMuZHk7XG4gICAgICAgIGNsaWVudC54ICs9IHN0YXR1cy5keDtcbiAgICAgICAgY2xpZW50LnkgKz0gc3RhdHVzLmR5O1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgZHg6IHN0YXR1cy5keCxcbiAgICAgICAgICBkeTogc3RhdHVzLmR5XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIGdldFJlc3RyaWN0aW9uUmVjdDogZ2V0UmVzdHJpY3Rpb25SZWN0XG59O1xuXG5mdW5jdGlvbiBnZXRSZXN0cmljdGlvblJlY3QodmFsdWUsIGludGVyYWN0aW9uLCBwYWdlKSB7XG4gIGlmICh1dGlscy5pcy5mdW5jdGlvbih2YWx1ZSkpIHtcbiAgICByZXR1cm4gdXRpbHMucmVzb2x2ZVJlY3RMaWtlKHZhbHVlLCBpbnRlcmFjdGlvbi50YXJnZXQsIGludGVyYWN0aW9uLmVsZW1lbnQsIFtwYWdlLngsIHBhZ2UueSwgaW50ZXJhY3Rpb25dKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gdXRpbHMucmVzb2x2ZVJlY3RMaWtlKHZhbHVlLCBpbnRlcmFjdGlvbi50YXJnZXQsIGludGVyYWN0aW9uLmVsZW1lbnQpO1xuICB9XG59XG5cbm1vZGlmaWVycy5yZXN0cmljdCA9IHJlc3RyaWN0O1xubW9kaWZpZXJzLm5hbWVzLnB1c2goJ3Jlc3RyaWN0Jyk7XG5cbmRlZmF1bHRPcHRpb25zLnBlckFjdGlvbi5yZXN0cmljdCA9IHJlc3RyaWN0LmRlZmF1bHRzO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlc3RyaWN0O1xuXG59LHtcIi4uL2RlZmF1bHRPcHRpb25zXCI6MTgsXCIuLi91dGlsc1wiOjQ0LFwiLi9iYXNlXCI6MjN9XSwyNTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4ndXNlIHN0cmljdCc7XG5cbi8vIFRoaXMgbW9kdWxlIGFkZHMgdGhlIG9wdGlvbnMucmVzaXplLnJlc3RyaWN0RWRnZXMgc2V0dGluZyB3aGljaCBzZXRzIG1pbiBhbmRcbi8vIG1heCBmb3IgdGhlIHRvcCwgbGVmdCwgYm90dG9tIGFuZCByaWdodCBlZGdlcyBvZiB0aGUgdGFyZ2V0IGJlaW5nIHJlc2l6ZWQuXG4vL1xuLy8gaW50ZXJhY3QodGFyZ2V0KS5yZXNpemUoe1xuLy8gICBlZGdlczogeyB0b3A6IHRydWUsIGxlZnQ6IHRydWUgfSxcbi8vICAgcmVzdHJpY3RFZGdlczoge1xuLy8gICAgIGlubmVyOiB7IHRvcDogMjAwLCBsZWZ0OiAyMDAsIHJpZ2h0OiA0MDAsIGJvdHRvbTogNDAwIH0sXG4vLyAgICAgb3V0ZXI6IHsgdG9wOiAgIDAsIGxlZnQ6ICAgMCwgcmlnaHQ6IDYwMCwgYm90dG9tOiA2MDAgfSxcbi8vICAgfSxcbi8vIH0pO1xuXG52YXIgbW9kaWZpZXJzID0gcmVxdWlyZSgnLi9iYXNlJyk7XG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpO1xudmFyIHJlY3RVdGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzL3JlY3QnKTtcbnZhciBkZWZhdWx0T3B0aW9ucyA9IHJlcXVpcmUoJy4uL2RlZmF1bHRPcHRpb25zJyk7XG52YXIgcmVzaXplID0gcmVxdWlyZSgnLi4vYWN0aW9ucy9yZXNpemUnKTtcblxudmFyIF9yZXF1aXJlID0gcmVxdWlyZSgnLi9yZXN0cmljdCcpLFxuICAgIGdldFJlc3RyaWN0aW9uUmVjdCA9IF9yZXF1aXJlLmdldFJlc3RyaWN0aW9uUmVjdDtcblxudmFyIG5vSW5uZXIgPSB7IHRvcDogK0luZmluaXR5LCBsZWZ0OiArSW5maW5pdHksIGJvdHRvbTogLUluZmluaXR5LCByaWdodDogLUluZmluaXR5IH07XG52YXIgbm9PdXRlciA9IHsgdG9wOiAtSW5maW5pdHksIGxlZnQ6IC1JbmZpbml0eSwgYm90dG9tOiArSW5maW5pdHksIHJpZ2h0OiArSW5maW5pdHkgfTtcblxudmFyIHJlc3RyaWN0RWRnZXMgPSB7XG4gIGRlZmF1bHRzOiB7XG4gICAgZW5hYmxlZDogZmFsc2UsXG4gICAgZW5kT25seTogZmFsc2UsXG4gICAgbWluOiBudWxsLFxuICAgIG1heDogbnVsbCxcbiAgICBvZmZzZXQ6IG51bGxcbiAgfSxcblxuICBzZXRPZmZzZXQ6IGZ1bmN0aW9uIHNldE9mZnNldChfcmVmKSB7XG4gICAgdmFyIGludGVyYWN0aW9uID0gX3JlZi5pbnRlcmFjdGlvbixcbiAgICAgICAgc3RhcnRPZmZzZXQgPSBfcmVmLnN0YXJ0T2Zmc2V0LFxuICAgICAgICBvcHRpb25zID0gX3JlZi5vcHRpb25zO1xuXG4gICAgaWYgKCFvcHRpb25zKSB7XG4gICAgICByZXR1cm4gdXRpbHMuZXh0ZW5kKHt9LCBzdGFydE9mZnNldCk7XG4gICAgfVxuXG4gICAgdmFyIG9mZnNldCA9IGdldFJlc3RyaWN0aW9uUmVjdChvcHRpb25zLm9mZnNldCwgaW50ZXJhY3Rpb24sIGludGVyYWN0aW9uLnN0YXJ0Q29vcmRzLnBhZ2UpO1xuXG4gICAgaWYgKG9mZnNldCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdG9wOiBzdGFydE9mZnNldC50b3AgKyBvZmZzZXQueSxcbiAgICAgICAgbGVmdDogc3RhcnRPZmZzZXQubGVmdCArIG9mZnNldC54LFxuICAgICAgICBib3R0b206IHN0YXJ0T2Zmc2V0LmJvdHRvbSArIG9mZnNldC55LFxuICAgICAgICByaWdodDogc3RhcnRPZmZzZXQucmlnaHQgKyBvZmZzZXQueFxuICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gc3RhcnRPZmZzZXQ7XG4gIH0sXG5cbiAgc2V0OiBmdW5jdGlvbiBzZXQoX3JlZjIpIHtcbiAgICB2YXIgbW9kaWZpZWRDb29yZHMgPSBfcmVmMi5tb2RpZmllZENvb3JkcyxcbiAgICAgICAgaW50ZXJhY3Rpb24gPSBfcmVmMi5pbnRlcmFjdGlvbixcbiAgICAgICAgc3RhdHVzID0gX3JlZjIuc3RhdHVzLFxuICAgICAgICBvZmZzZXQgPSBfcmVmMi5vZmZzZXQsXG4gICAgICAgIG9wdGlvbnMgPSBfcmVmMi5vcHRpb25zO1xuXG4gICAgdmFyIGVkZ2VzID0gaW50ZXJhY3Rpb24ucHJlcGFyZWQubGlua2VkRWRnZXMgfHwgaW50ZXJhY3Rpb24ucHJlcGFyZWQuZWRnZXM7XG5cbiAgICBpZiAoIWludGVyYWN0aW9uLmludGVyYWN0aW5nKCkgfHwgIWVkZ2VzKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIHBhZ2UgPSBzdGF0dXMudXNlU3RhdHVzWFkgPyB7IHg6IHN0YXR1cy54LCB5OiBzdGF0dXMueSB9IDogdXRpbHMuZXh0ZW5kKHt9LCBtb2RpZmllZENvb3Jkcyk7XG4gICAgdmFyIGlubmVyID0gcmVjdFV0aWxzLnh5d2hUb1RsYnIoZ2V0UmVzdHJpY3Rpb25SZWN0KG9wdGlvbnMuaW5uZXIsIGludGVyYWN0aW9uLCBwYWdlKSkgfHwgbm9Jbm5lcjtcbiAgICB2YXIgb3V0ZXIgPSByZWN0VXRpbHMueHl3aFRvVGxicihnZXRSZXN0cmljdGlvblJlY3Qob3B0aW9ucy5vdXRlciwgaW50ZXJhY3Rpb24sIHBhZ2UpKSB8fCBub091dGVyO1xuXG4gICAgdmFyIG1vZGlmaWVkWCA9IHBhZ2UueDtcbiAgICB2YXIgbW9kaWZpZWRZID0gcGFnZS55O1xuXG4gICAgc3RhdHVzLmR4ID0gMDtcbiAgICBzdGF0dXMuZHkgPSAwO1xuICAgIHN0YXR1cy5sb2NrZWQgPSBmYWxzZTtcblxuICAgIGlmIChlZGdlcy50b3ApIHtcbiAgICAgIG1vZGlmaWVkWSA9IE1hdGgubWluKE1hdGgubWF4KG91dGVyLnRvcCArIG9mZnNldC50b3AsIHBhZ2UueSksIGlubmVyLnRvcCArIG9mZnNldC50b3ApO1xuICAgIH0gZWxzZSBpZiAoZWRnZXMuYm90dG9tKSB7XG4gICAgICBtb2RpZmllZFkgPSBNYXRoLm1heChNYXRoLm1pbihvdXRlci5ib3R0b20gLSBvZmZzZXQuYm90dG9tLCBwYWdlLnkpLCBpbm5lci5ib3R0b20gLSBvZmZzZXQuYm90dG9tKTtcbiAgICB9XG4gICAgaWYgKGVkZ2VzLmxlZnQpIHtcbiAgICAgIG1vZGlmaWVkWCA9IE1hdGgubWluKE1hdGgubWF4KG91dGVyLmxlZnQgKyBvZmZzZXQubGVmdCwgcGFnZS54KSwgaW5uZXIubGVmdCArIG9mZnNldC5sZWZ0KTtcbiAgICB9IGVsc2UgaWYgKGVkZ2VzLnJpZ2h0KSB7XG4gICAgICBtb2RpZmllZFggPSBNYXRoLm1heChNYXRoLm1pbihvdXRlci5yaWdodCAtIG9mZnNldC5yaWdodCwgcGFnZS54KSwgaW5uZXIucmlnaHQgLSBvZmZzZXQucmlnaHQpO1xuICAgIH1cblxuICAgIHN0YXR1cy5keCA9IG1vZGlmaWVkWCAtIHBhZ2UueDtcbiAgICBzdGF0dXMuZHkgPSBtb2RpZmllZFkgLSBwYWdlLnk7XG5cbiAgICBzdGF0dXMuY2hhbmdlZCA9IHN0YXR1cy5tb2RpZmllZFggIT09IG1vZGlmaWVkWCB8fCBzdGF0dXMubW9kaWZpZWRZICE9PSBtb2RpZmllZFk7XG4gICAgc3RhdHVzLmxvY2tlZCA9ICEhKHN0YXR1cy5keCB8fCBzdGF0dXMuZHkpO1xuXG4gICAgc3RhdHVzLm1vZGlmaWVkWCA9IG1vZGlmaWVkWDtcbiAgICBzdGF0dXMubW9kaWZpZWRZID0gbW9kaWZpZWRZO1xuICB9LFxuXG4gIG1vZGlmeUNvb3JkczogZnVuY3Rpb24gbW9kaWZ5Q29vcmRzKF9yZWYzKSB7XG4gICAgdmFyIHBhZ2UgPSBfcmVmMy5wYWdlLFxuICAgICAgICBjbGllbnQgPSBfcmVmMy5jbGllbnQsXG4gICAgICAgIHN0YXR1cyA9IF9yZWYzLnN0YXR1cyxcbiAgICAgICAgcGhhc2UgPSBfcmVmMy5waGFzZSxcbiAgICAgICAgb3B0aW9ucyA9IF9yZWYzLm9wdGlvbnM7XG5cbiAgICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLmVuYWJsZWQgJiYgIShwaGFzZSA9PT0gJ3N0YXJ0JyAmJiBzdGF0dXMubG9ja2VkKSkge1xuXG4gICAgICBpZiAoc3RhdHVzLmxvY2tlZCkge1xuICAgICAgICBwYWdlLnggKz0gc3RhdHVzLmR4O1xuICAgICAgICBwYWdlLnkgKz0gc3RhdHVzLmR5O1xuICAgICAgICBjbGllbnQueCArPSBzdGF0dXMuZHg7XG4gICAgICAgIGNsaWVudC55ICs9IHN0YXR1cy5keTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGR4OiBzdGF0dXMuZHgsXG4gICAgICAgICAgZHk6IHN0YXR1cy5keVxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICBub0lubmVyOiBub0lubmVyLFxuICBub091dGVyOiBub091dGVyLFxuICBnZXRSZXN0cmljdGlvblJlY3Q6IGdldFJlc3RyaWN0aW9uUmVjdFxufTtcblxubW9kaWZpZXJzLnJlc3RyaWN0RWRnZXMgPSByZXN0cmljdEVkZ2VzO1xubW9kaWZpZXJzLm5hbWVzLnB1c2goJ3Jlc3RyaWN0RWRnZXMnKTtcblxuZGVmYXVsdE9wdGlvbnMucGVyQWN0aW9uLnJlc3RyaWN0RWRnZXMgPSByZXN0cmljdEVkZ2VzLmRlZmF1bHRzO1xucmVzaXplLmRlZmF1bHRzLnJlc3RyaWN0RWRnZXMgPSByZXN0cmljdEVkZ2VzLmRlZmF1bHRzO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlc3RyaWN0RWRnZXM7XG5cbn0se1wiLi4vYWN0aW9ucy9yZXNpemVcIjoxMCxcIi4uL2RlZmF1bHRPcHRpb25zXCI6MTgsXCIuLi91dGlsc1wiOjQ0LFwiLi4vdXRpbHMvcmVjdFwiOjUxLFwiLi9iYXNlXCI6MjMsXCIuL3Jlc3RyaWN0XCI6MjR9XSwyNjpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4ndXNlIHN0cmljdCc7XG5cbi8vIFRoaXMgbW9kdWxlIGFkZHMgdGhlIG9wdGlvbnMucmVzaXplLnJlc3RyaWN0U2l6ZSBzZXR0aW5nIHdoaWNoIHNldHMgbWluIGFuZFxuLy8gbWF4IHdpZHRoIGFuZCBoZWlnaHQgZm9yIHRoZSB0YXJnZXQgYmVpbmcgcmVzaXplZC5cbi8vXG4vLyBpbnRlcmFjdCh0YXJnZXQpLnJlc2l6ZSh7XG4vLyAgIGVkZ2VzOiB7IHRvcDogdHJ1ZSwgbGVmdDogdHJ1ZSB9LFxuLy8gICByZXN0cmljdFNpemU6IHtcbi8vICAgICBtaW46IHsgd2lkdGg6IC02MDAsIGhlaWdodDogLTYwMCB9LFxuLy8gICAgIG1heDogeyB3aWR0aDogIDYwMCwgaGVpZ2h0OiAgNjAwIH0sXG4vLyAgIH0sXG4vLyB9KTtcblxudmFyIG1vZGlmaWVycyA9IHJlcXVpcmUoJy4vYmFzZScpO1xudmFyIHJlc3RyaWN0RWRnZXMgPSByZXF1aXJlKCcuL3Jlc3RyaWN0RWRnZXMnKTtcbnZhciB1dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzJyk7XG52YXIgcmVjdFV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMvcmVjdCcpO1xudmFyIGRlZmF1bHRPcHRpb25zID0gcmVxdWlyZSgnLi4vZGVmYXVsdE9wdGlvbnMnKTtcbnZhciByZXNpemUgPSByZXF1aXJlKCcuLi9hY3Rpb25zL3Jlc2l6ZScpO1xuXG52YXIgbm9NaW4gPSB7IHdpZHRoOiAtSW5maW5pdHksIGhlaWdodDogLUluZmluaXR5IH07XG52YXIgbm9NYXggPSB7IHdpZHRoOiArSW5maW5pdHksIGhlaWdodDogK0luZmluaXR5IH07XG5cbnZhciByZXN0cmljdFNpemUgPSB7XG4gIGRlZmF1bHRzOiB7XG4gICAgZW5hYmxlZDogZmFsc2UsXG4gICAgZW5kT25seTogZmFsc2UsXG4gICAgbWluOiBudWxsLFxuICAgIG1heDogbnVsbFxuICB9LFxuXG4gIHNldE9mZnNldDogZnVuY3Rpb24gc2V0T2Zmc2V0KF9yZWYpIHtcbiAgICB2YXIgaW50ZXJhY3Rpb24gPSBfcmVmLmludGVyYWN0aW9uO1xuXG4gICAgcmV0dXJuIGludGVyYWN0aW9uLnN0YXJ0T2Zmc2V0O1xuICB9LFxuXG4gIHNldDogZnVuY3Rpb24gc2V0KGFyZykge1xuICAgIHZhciBpbnRlcmFjdGlvbiA9IGFyZy5pbnRlcmFjdGlvbixcbiAgICAgICAgb3B0aW9ucyA9IGFyZy5vcHRpb25zO1xuXG4gICAgdmFyIGVkZ2VzID0gaW50ZXJhY3Rpb24ucHJlcGFyZWQubGlua2VkRWRnZXMgfHwgaW50ZXJhY3Rpb24ucHJlcGFyZWQuZWRnZXM7XG5cbiAgICBpZiAoIWludGVyYWN0aW9uLmludGVyYWN0aW5nKCkgfHwgIWVkZ2VzKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIHJlY3QgPSByZWN0VXRpbHMueHl3aFRvVGxicihpbnRlcmFjdGlvbi5yZXNpemVSZWN0cy5pbnZlcnRlZCk7XG5cbiAgICB2YXIgbWluU2l6ZSA9IHJlY3RVdGlscy50bGJyVG9YeXdoKHJlc3RyaWN0RWRnZXMuZ2V0UmVzdHJpY3Rpb25SZWN0KG9wdGlvbnMubWluLCBpbnRlcmFjdGlvbikpIHx8IG5vTWluO1xuICAgIHZhciBtYXhTaXplID0gcmVjdFV0aWxzLnRsYnJUb1h5d2gocmVzdHJpY3RFZGdlcy5nZXRSZXN0cmljdGlvblJlY3Qob3B0aW9ucy5tYXgsIGludGVyYWN0aW9uKSkgfHwgbm9NYXg7XG5cbiAgICBhcmcub3B0aW9ucyA9IHtcbiAgICAgIGVuYWJsZWQ6IG9wdGlvbnMuZW5hYmxlZCxcbiAgICAgIGVuZE9ubHk6IG9wdGlvbnMuZW5kT25seSxcbiAgICAgIGlubmVyOiB1dGlscy5leHRlbmQoe30sIHJlc3RyaWN0RWRnZXMubm9Jbm5lciksXG4gICAgICBvdXRlcjogdXRpbHMuZXh0ZW5kKHt9LCByZXN0cmljdEVkZ2VzLm5vT3V0ZXIpXG4gICAgfTtcblxuICAgIGlmIChlZGdlcy50b3ApIHtcbiAgICAgIGFyZy5vcHRpb25zLmlubmVyLnRvcCA9IHJlY3QuYm90dG9tIC0gbWluU2l6ZS5oZWlnaHQ7XG4gICAgICBhcmcub3B0aW9ucy5vdXRlci50b3AgPSByZWN0LmJvdHRvbSAtIG1heFNpemUuaGVpZ2h0O1xuICAgIH0gZWxzZSBpZiAoZWRnZXMuYm90dG9tKSB7XG4gICAgICBhcmcub3B0aW9ucy5pbm5lci5ib3R0b20gPSByZWN0LnRvcCArIG1pblNpemUuaGVpZ2h0O1xuICAgICAgYXJnLm9wdGlvbnMub3V0ZXIuYm90dG9tID0gcmVjdC50b3AgKyBtYXhTaXplLmhlaWdodDtcbiAgICB9XG4gICAgaWYgKGVkZ2VzLmxlZnQpIHtcbiAgICAgIGFyZy5vcHRpb25zLmlubmVyLmxlZnQgPSByZWN0LnJpZ2h0IC0gbWluU2l6ZS53aWR0aDtcbiAgICAgIGFyZy5vcHRpb25zLm91dGVyLmxlZnQgPSByZWN0LnJpZ2h0IC0gbWF4U2l6ZS53aWR0aDtcbiAgICB9IGVsc2UgaWYgKGVkZ2VzLnJpZ2h0KSB7XG4gICAgICBhcmcub3B0aW9ucy5pbm5lci5yaWdodCA9IHJlY3QubGVmdCArIG1pblNpemUud2lkdGg7XG4gICAgICBhcmcub3B0aW9ucy5vdXRlci5yaWdodCA9IHJlY3QubGVmdCArIG1heFNpemUud2lkdGg7XG4gICAgfVxuXG4gICAgcmVzdHJpY3RFZGdlcy5zZXQoYXJnKTtcbiAgfSxcblxuICBtb2RpZnlDb29yZHM6IHJlc3RyaWN0RWRnZXMubW9kaWZ5Q29vcmRzXG59O1xuXG5tb2RpZmllcnMucmVzdHJpY3RTaXplID0gcmVzdHJpY3RTaXplO1xubW9kaWZpZXJzLm5hbWVzLnB1c2goJ3Jlc3RyaWN0U2l6ZScpO1xuXG5kZWZhdWx0T3B0aW9ucy5wZXJBY3Rpb24ucmVzdHJpY3RTaXplID0gcmVzdHJpY3RTaXplLmRlZmF1bHRzO1xucmVzaXplLmRlZmF1bHRzLnJlc3RyaWN0U2l6ZSA9IHJlc3RyaWN0U2l6ZS5kZWZhdWx0cztcblxubW9kdWxlLmV4cG9ydHMgPSByZXN0cmljdFNpemU7XG5cbn0se1wiLi4vYWN0aW9ucy9yZXNpemVcIjoxMCxcIi4uL2RlZmF1bHRPcHRpb25zXCI6MTgsXCIuLi91dGlsc1wiOjQ0LFwiLi4vdXRpbHMvcmVjdFwiOjUxLFwiLi9iYXNlXCI6MjMsXCIuL3Jlc3RyaWN0RWRnZXNcIjoyNX1dLDI3OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbid1c2Ugc3RyaWN0JztcblxudmFyIG1vZGlmaWVycyA9IHJlcXVpcmUoJy4vYmFzZScpO1xudmFyIGludGVyYWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJhY3QnKTtcbnZhciB1dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzJyk7XG52YXIgZGVmYXVsdE9wdGlvbnMgPSByZXF1aXJlKCcuLi9kZWZhdWx0T3B0aW9ucycpO1xuXG52YXIgc25hcCA9IHtcbiAgZGVmYXVsdHM6IHtcbiAgICBlbmFibGVkOiBmYWxzZSxcbiAgICBlbmRPbmx5OiBmYWxzZSxcbiAgICByYW5nZTogSW5maW5pdHksXG4gICAgdGFyZ2V0czogbnVsbCxcbiAgICBvZmZzZXRzOiBudWxsLFxuXG4gICAgcmVsYXRpdmVQb2ludHM6IG51bGxcbiAgfSxcblxuICBzZXRPZmZzZXQ6IGZ1bmN0aW9uIHNldE9mZnNldChfcmVmKSB7XG4gICAgdmFyIGludGVyYWN0aW9uID0gX3JlZi5pbnRlcmFjdGlvbixcbiAgICAgICAgaW50ZXJhY3RhYmxlID0gX3JlZi5pbnRlcmFjdGFibGUsXG4gICAgICAgIGVsZW1lbnQgPSBfcmVmLmVsZW1lbnQsXG4gICAgICAgIHJlY3QgPSBfcmVmLnJlY3QsXG4gICAgICAgIHN0YXJ0T2Zmc2V0ID0gX3JlZi5zdGFydE9mZnNldCxcbiAgICAgICAgb3B0aW9ucyA9IF9yZWYub3B0aW9ucztcblxuICAgIHZhciBvZmZzZXRzID0gW107XG4gICAgdmFyIG9wdGlvbnNPcmlnaW4gPSB1dGlscy5yZWN0VG9YWSh1dGlscy5yZXNvbHZlUmVjdExpa2Uob3B0aW9ucy5vcmlnaW4pKTtcbiAgICB2YXIgb3JpZ2luID0gb3B0aW9uc09yaWdpbiB8fCB1dGlscy5nZXRPcmlnaW5YWShpbnRlcmFjdGFibGUsIGVsZW1lbnQsIGludGVyYWN0aW9uLnByZXBhcmVkLm5hbWUpO1xuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IGludGVyYWN0YWJsZS5vcHRpb25zW2ludGVyYWN0aW9uLnByZXBhcmVkLm5hbWVdLnNuYXAgfHwge307XG5cbiAgICB2YXIgc25hcE9mZnNldCA9IHZvaWQgMDtcblxuICAgIGlmIChvcHRpb25zLm9mZnNldCA9PT0gJ3N0YXJ0Q29vcmRzJykge1xuICAgICAgc25hcE9mZnNldCA9IHtcbiAgICAgICAgeDogaW50ZXJhY3Rpb24uc3RhcnRDb29yZHMucGFnZS54IC0gb3JpZ2luLngsXG4gICAgICAgIHk6IGludGVyYWN0aW9uLnN0YXJ0Q29vcmRzLnBhZ2UueSAtIG9yaWdpbi55XG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgb2Zmc2V0UmVjdCA9IHV0aWxzLnJlc29sdmVSZWN0TGlrZShvcHRpb25zLm9mZnNldCwgaW50ZXJhY3RhYmxlLCBlbGVtZW50LCBbaW50ZXJhY3Rpb25dKTtcblxuICAgICAgc25hcE9mZnNldCA9IHV0aWxzLnJlY3RUb1hZKG9mZnNldFJlY3QpIHx8IHsgeDogMCwgeTogMCB9O1xuICAgIH1cblxuICAgIGlmIChyZWN0ICYmIG9wdGlvbnMucmVsYXRpdmVQb2ludHMgJiYgb3B0aW9ucy5yZWxhdGl2ZVBvaW50cy5sZW5ndGgpIHtcbiAgICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBvcHRpb25zLnJlbGF0aXZlUG9pbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICB2YXIgX3JlZjM7XG5cbiAgICAgICAgX3JlZjMgPSBvcHRpb25zLnJlbGF0aXZlUG9pbnRzW19pXTtcbiAgICAgICAgdmFyIF9yZWYyID0gX3JlZjM7XG4gICAgICAgIHZhciByZWxhdGl2ZVggPSBfcmVmMi54O1xuICAgICAgICB2YXIgcmVsYXRpdmVZID0gX3JlZjIueTtcblxuICAgICAgICBvZmZzZXRzLnB1c2goe1xuICAgICAgICAgIHg6IHN0YXJ0T2Zmc2V0LmxlZnQgLSByZWN0LndpZHRoICogcmVsYXRpdmVYICsgc25hcE9mZnNldC54LFxuICAgICAgICAgIHk6IHN0YXJ0T2Zmc2V0LnRvcCAtIHJlY3QuaGVpZ2h0ICogcmVsYXRpdmVZICsgc25hcE9mZnNldC55XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBvZmZzZXRzLnB1c2goc25hcE9mZnNldCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG9mZnNldHM7XG4gIH0sXG5cbiAgc2V0OiBmdW5jdGlvbiBzZXQoX3JlZjQpIHtcbiAgICB2YXIgaW50ZXJhY3Rpb24gPSBfcmVmNC5pbnRlcmFjdGlvbixcbiAgICAgICAgbW9kaWZpZWRDb29yZHMgPSBfcmVmNC5tb2RpZmllZENvb3JkcyxcbiAgICAgICAgc3RhdHVzID0gX3JlZjQuc3RhdHVzLFxuICAgICAgICBvcHRpb25zID0gX3JlZjQub3B0aW9ucyxcbiAgICAgICAgb2Zmc2V0cyA9IF9yZWY0Lm9mZnNldDtcblxuICAgIHZhciB0YXJnZXRzID0gW107XG4gICAgdmFyIHRhcmdldCA9IHZvaWQgMDtcbiAgICB2YXIgcGFnZSA9IHZvaWQgMDtcbiAgICB2YXIgaSA9IHZvaWQgMDtcblxuICAgIGlmIChzdGF0dXMudXNlU3RhdHVzWFkpIHtcbiAgICAgIHBhZ2UgPSB7IHg6IHN0YXR1cy54LCB5OiBzdGF0dXMueSB9O1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgb3JpZ2luID0gdXRpbHMuZ2V0T3JpZ2luWFkoaW50ZXJhY3Rpb24udGFyZ2V0LCBpbnRlcmFjdGlvbi5lbGVtZW50LCBpbnRlcmFjdGlvbi5wcmVwYXJlZC5uYW1lKTtcblxuICAgICAgcGFnZSA9IHV0aWxzLmV4dGVuZCh7fSwgbW9kaWZpZWRDb29yZHMpO1xuXG4gICAgICBwYWdlLnggLT0gb3JpZ2luLng7XG4gICAgICBwYWdlLnkgLT0gb3JpZ2luLnk7XG4gICAgfVxuXG4gICAgc3RhdHVzLnJlYWxYID0gcGFnZS54O1xuICAgIHN0YXR1cy5yZWFsWSA9IHBhZ2UueTtcblxuICAgIHZhciBsZW4gPSBvcHRpb25zLnRhcmdldHMgPyBvcHRpb25zLnRhcmdldHMubGVuZ3RoIDogMDtcblxuICAgIGZvciAodmFyIF9pMiA9IDA7IF9pMiA8IG9mZnNldHMubGVuZ3RoOyBfaTIrKykge1xuICAgICAgdmFyIF9yZWY2O1xuXG4gICAgICBfcmVmNiA9IG9mZnNldHNbX2kyXTtcbiAgICAgIHZhciBfcmVmNSA9IF9yZWY2O1xuICAgICAgdmFyIG9mZnNldFggPSBfcmVmNS54O1xuICAgICAgdmFyIG9mZnNldFkgPSBfcmVmNS55O1xuXG4gICAgICB2YXIgcmVsYXRpdmVYID0gcGFnZS54IC0gb2Zmc2V0WDtcbiAgICAgIHZhciByZWxhdGl2ZVkgPSBwYWdlLnkgLSBvZmZzZXRZO1xuXG4gICAgICBmb3IgKHZhciBfaTMgPSAwOyBfaTMgPCAob3B0aW9ucy50YXJnZXRzIHx8IFtdKS5sZW5ndGg7IF9pMysrKSB7XG4gICAgICAgIHZhciBfcmVmNztcblxuICAgICAgICBfcmVmNyA9IChvcHRpb25zLnRhcmdldHMgfHwgW10pW19pM107XG4gICAgICAgIHZhciBzbmFwVGFyZ2V0ID0gX3JlZjc7XG5cbiAgICAgICAgaWYgKHV0aWxzLmlzLmZ1bmN0aW9uKHNuYXBUYXJnZXQpKSB7XG4gICAgICAgICAgdGFyZ2V0ID0gc25hcFRhcmdldChyZWxhdGl2ZVgsIHJlbGF0aXZlWSwgaW50ZXJhY3Rpb24pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRhcmdldCA9IHNuYXBUYXJnZXQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRhcmdldCkge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgdGFyZ2V0cy5wdXNoKHtcbiAgICAgICAgICB4OiB1dGlscy5pcy5udW1iZXIodGFyZ2V0LngpID8gdGFyZ2V0LnggKyBvZmZzZXRYIDogcmVsYXRpdmVYLFxuICAgICAgICAgIHk6IHV0aWxzLmlzLm51bWJlcih0YXJnZXQueSkgPyB0YXJnZXQueSArIG9mZnNldFkgOiByZWxhdGl2ZVksXG5cbiAgICAgICAgICByYW5nZTogdXRpbHMuaXMubnVtYmVyKHRhcmdldC5yYW5nZSkgPyB0YXJnZXQucmFuZ2UgOiBvcHRpb25zLnJhbmdlXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBjbG9zZXN0ID0ge1xuICAgICAgdGFyZ2V0OiBudWxsLFxuICAgICAgaW5SYW5nZTogZmFsc2UsXG4gICAgICBkaXN0YW5jZTogMCxcbiAgICAgIHJhbmdlOiAwLFxuICAgICAgZHg6IDAsXG4gICAgICBkeTogMFxuICAgIH07XG5cbiAgICBmb3IgKGkgPSAwLCBsZW4gPSB0YXJnZXRzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICB0YXJnZXQgPSB0YXJnZXRzW2ldO1xuXG4gICAgICB2YXIgcmFuZ2UgPSB0YXJnZXQucmFuZ2U7XG4gICAgICB2YXIgZHggPSB0YXJnZXQueCAtIHBhZ2UueDtcbiAgICAgIHZhciBkeSA9IHRhcmdldC55IC0gcGFnZS55O1xuICAgICAgdmFyIGRpc3RhbmNlID0gdXRpbHMuaHlwb3QoZHgsIGR5KTtcbiAgICAgIHZhciBpblJhbmdlID0gZGlzdGFuY2UgPD0gcmFuZ2U7XG5cbiAgICAgIC8vIEluZmluaXRlIHRhcmdldHMgY291bnQgYXMgYmVpbmcgb3V0IG9mIHJhbmdlXG4gICAgICAvLyBjb21wYXJlZCB0byBub24gaW5maW5pdGUgb25lcyB0aGF0IGFyZSBpbiByYW5nZVxuICAgICAgaWYgKHJhbmdlID09PSBJbmZpbml0eSAmJiBjbG9zZXN0LmluUmFuZ2UgJiYgY2xvc2VzdC5yYW5nZSAhPT0gSW5maW5pdHkpIHtcbiAgICAgICAgaW5SYW5nZSA9IGZhbHNlO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWNsb3Nlc3QudGFyZ2V0IHx8IChpblJhbmdlXG4gICAgICAvLyBpcyB0aGUgY2xvc2VzdCB0YXJnZXQgaW4gcmFuZ2U/XG4gICAgICA/IGNsb3Nlc3QuaW5SYW5nZSAmJiByYW5nZSAhPT0gSW5maW5pdHlcbiAgICAgIC8vIHRoZSBwb2ludGVyIGlzIHJlbGF0aXZlbHkgZGVlcGVyIGluIHRoaXMgdGFyZ2V0XG4gICAgICA/IGRpc3RhbmNlIC8gcmFuZ2UgPCBjbG9zZXN0LmRpc3RhbmNlIC8gY2xvc2VzdC5yYW5nZVxuICAgICAgLy8gdGhpcyB0YXJnZXQgaGFzIEluZmluaXRlIHJhbmdlIGFuZCB0aGUgY2xvc2VzdCBkb2Vzbid0XG4gICAgICA6IHJhbmdlID09PSBJbmZpbml0eSAmJiBjbG9zZXN0LnJhbmdlICE9PSBJbmZpbml0eSB8fFxuICAgICAgLy8gT1IgdGhpcyB0YXJnZXQgaXMgY2xvc2VyIHRoYXQgdGhlIHByZXZpb3VzIGNsb3Nlc3RcbiAgICAgIGRpc3RhbmNlIDwgY2xvc2VzdC5kaXN0YW5jZSA6XG4gICAgICAvLyBUaGUgb3RoZXIgaXMgbm90IGluIHJhbmdlIGFuZCB0aGUgcG9pbnRlciBpcyBjbG9zZXIgdG8gdGhpcyB0YXJnZXRcbiAgICAgICFjbG9zZXN0LmluUmFuZ2UgJiYgZGlzdGFuY2UgPCBjbG9zZXN0LmRpc3RhbmNlKSkge1xuXG4gICAgICAgIGNsb3Nlc3QudGFyZ2V0ID0gdGFyZ2V0O1xuICAgICAgICBjbG9zZXN0LmRpc3RhbmNlID0gZGlzdGFuY2U7XG4gICAgICAgIGNsb3Nlc3QucmFuZ2UgPSByYW5nZTtcbiAgICAgICAgY2xvc2VzdC5pblJhbmdlID0gaW5SYW5nZTtcbiAgICAgICAgY2xvc2VzdC5keCA9IGR4O1xuICAgICAgICBjbG9zZXN0LmR5ID0gZHk7XG5cbiAgICAgICAgc3RhdHVzLnJhbmdlID0gcmFuZ2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIHNuYXBDaGFuZ2VkID0gdm9pZCAwO1xuXG4gICAgaWYgKGNsb3Nlc3QudGFyZ2V0KSB7XG4gICAgICBzbmFwQ2hhbmdlZCA9IHN0YXR1cy5tb2RpZmllZFggIT09IGNsb3Nlc3QudGFyZ2V0LnggfHwgc3RhdHVzLm1vZGlmaWVkWSAhPT0gY2xvc2VzdC50YXJnZXQueTtcblxuICAgICAgc3RhdHVzLm1vZGlmaWVkWCA9IGNsb3Nlc3QudGFyZ2V0Lng7XG4gICAgICBzdGF0dXMubW9kaWZpZWRZID0gY2xvc2VzdC50YXJnZXQueTtcbiAgICB9IGVsc2Uge1xuICAgICAgc25hcENoYW5nZWQgPSB0cnVlO1xuXG4gICAgICBzdGF0dXMubW9kaWZpZWRYID0gTmFOO1xuICAgICAgc3RhdHVzLm1vZGlmaWVkWSA9IE5hTjtcbiAgICB9XG5cbiAgICBzdGF0dXMuZHggPSBjbG9zZXN0LmR4O1xuICAgIHN0YXR1cy5keSA9IGNsb3Nlc3QuZHk7XG5cbiAgICBzdGF0dXMuY2hhbmdlZCA9IHNuYXBDaGFuZ2VkIHx8IGNsb3Nlc3QuaW5SYW5nZSAmJiAhc3RhdHVzLmxvY2tlZDtcbiAgICBzdGF0dXMubG9ja2VkID0gY2xvc2VzdC5pblJhbmdlO1xuICB9LFxuXG4gIG1vZGlmeUNvb3JkczogZnVuY3Rpb24gbW9kaWZ5Q29vcmRzKF9yZWY4KSB7XG4gICAgdmFyIHBhZ2UgPSBfcmVmOC5wYWdlLFxuICAgICAgICBjbGllbnQgPSBfcmVmOC5jbGllbnQsXG4gICAgICAgIHN0YXR1cyA9IF9yZWY4LnN0YXR1cyxcbiAgICAgICAgcGhhc2UgPSBfcmVmOC5waGFzZSxcbiAgICAgICAgb3B0aW9ucyA9IF9yZWY4Lm9wdGlvbnM7XG5cbiAgICB2YXIgcmVsYXRpdmVQb2ludHMgPSBvcHRpb25zICYmIG9wdGlvbnMucmVsYXRpdmVQb2ludHM7XG5cbiAgICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLmVuYWJsZWQgJiYgIShwaGFzZSA9PT0gJ3N0YXJ0JyAmJiByZWxhdGl2ZVBvaW50cyAmJiByZWxhdGl2ZVBvaW50cy5sZW5ndGgpKSB7XG5cbiAgICAgIGlmIChzdGF0dXMubG9ja2VkKSB7XG4gICAgICAgIHBhZ2UueCArPSBzdGF0dXMuZHg7XG4gICAgICAgIHBhZ2UueSArPSBzdGF0dXMuZHk7XG4gICAgICAgIGNsaWVudC54ICs9IHN0YXR1cy5keDtcbiAgICAgICAgY2xpZW50LnkgKz0gc3RhdHVzLmR5O1xuICAgICAgfVxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICByYW5nZTogc3RhdHVzLnJhbmdlLFxuICAgICAgICBsb2NrZWQ6IHN0YXR1cy5sb2NrZWQsXG4gICAgICAgIHg6IHN0YXR1cy5tb2RpZmllZFgsXG4gICAgICAgIHk6IHN0YXR1cy5tb2RpZmllZFksXG4gICAgICAgIHJlYWxYOiBzdGF0dXMucmVhbFgsXG4gICAgICAgIHJlYWxZOiBzdGF0dXMucmVhbFksXG4gICAgICAgIGR4OiBzdGF0dXMuZHgsXG4gICAgICAgIGR5OiBzdGF0dXMuZHlcbiAgICAgIH07XG4gICAgfVxuICB9XG59O1xuXG5pbnRlcmFjdC5jcmVhdGVTbmFwR3JpZCA9IGZ1bmN0aW9uIChncmlkKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoeCwgeSkge1xuICAgIHZhciBsaW1pdHMgPSBncmlkLmxpbWl0cyB8fCB7XG4gICAgICBsZWZ0OiAtSW5maW5pdHksXG4gICAgICByaWdodDogSW5maW5pdHksXG4gICAgICB0b3A6IC1JbmZpbml0eSxcbiAgICAgIGJvdHRvbTogSW5maW5pdHlcbiAgICB9O1xuICAgIHZhciBvZmZzZXRYID0gMDtcbiAgICB2YXIgb2Zmc2V0WSA9IDA7XG5cbiAgICBpZiAodXRpbHMuaXMub2JqZWN0KGdyaWQub2Zmc2V0KSkge1xuICAgICAgb2Zmc2V0WCA9IGdyaWQub2Zmc2V0Lng7XG4gICAgICBvZmZzZXRZID0gZ3JpZC5vZmZzZXQueTtcbiAgICB9XG5cbiAgICB2YXIgZ3JpZHggPSBNYXRoLnJvdW5kKCh4IC0gb2Zmc2V0WCkgLyBncmlkLngpO1xuICAgIHZhciBncmlkeSA9IE1hdGgucm91bmQoKHkgLSBvZmZzZXRZKSAvIGdyaWQueSk7XG5cbiAgICB2YXIgbmV3WCA9IE1hdGgubWF4KGxpbWl0cy5sZWZ0LCBNYXRoLm1pbihsaW1pdHMucmlnaHQsIGdyaWR4ICogZ3JpZC54ICsgb2Zmc2V0WCkpO1xuICAgIHZhciBuZXdZID0gTWF0aC5tYXgobGltaXRzLnRvcCwgTWF0aC5taW4obGltaXRzLmJvdHRvbSwgZ3JpZHkgKiBncmlkLnkgKyBvZmZzZXRZKSk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgeDogbmV3WCxcbiAgICAgIHk6IG5ld1ksXG4gICAgICByYW5nZTogZ3JpZC5yYW5nZVxuICAgIH07XG4gIH07XG59O1xuXG5tb2RpZmllcnMuc25hcCA9IHNuYXA7XG5tb2RpZmllcnMubmFtZXMucHVzaCgnc25hcCcpO1xuXG5kZWZhdWx0T3B0aW9ucy5wZXJBY3Rpb24uc25hcCA9IHNuYXAuZGVmYXVsdHM7XG5cbm1vZHVsZS5leHBvcnRzID0gc25hcDtcblxufSx7XCIuLi9kZWZhdWx0T3B0aW9uc1wiOjE4LFwiLi4vaW50ZXJhY3RcIjoyMSxcIi4uL3V0aWxzXCI6NDQsXCIuL2Jhc2VcIjoyM31dLDI4OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbid1c2Ugc3RyaWN0JztcblxuLy8gVGhpcyBtb2R1bGUgYWxsb3dzIHNuYXBwaW5nIG9mIHRoZSBzaXplIG9mIHRhcmdldHMgZHVyaW5nIHJlc2l6ZVxuLy8gaW50ZXJhY3Rpb25zLlxuXG52YXIgbW9kaWZpZXJzID0gcmVxdWlyZSgnLi9iYXNlJyk7XG52YXIgc25hcCA9IHJlcXVpcmUoJy4vc25hcCcpO1xudmFyIGRlZmF1bHRPcHRpb25zID0gcmVxdWlyZSgnLi4vZGVmYXVsdE9wdGlvbnMnKTtcbnZhciByZXNpemUgPSByZXF1aXJlKCcuLi9hY3Rpb25zL3Jlc2l6ZScpO1xudmFyIHV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMvJyk7XG5cbnZhciBzbmFwU2l6ZSA9IHtcbiAgZGVmYXVsdHM6IHtcbiAgICBlbmFibGVkOiBmYWxzZSxcbiAgICBlbmRPbmx5OiBmYWxzZSxcbiAgICByYW5nZTogSW5maW5pdHksXG4gICAgdGFyZ2V0czogbnVsbCxcbiAgICBvZmZzZXRzOiBudWxsXG4gIH0sXG5cbiAgc2V0T2Zmc2V0OiBmdW5jdGlvbiBzZXRPZmZzZXQoYXJnKSB7XG4gICAgdmFyIGludGVyYWN0aW9uID0gYXJnLmludGVyYWN0aW9uLFxuICAgICAgICBvcHRpb25zID0gYXJnLm9wdGlvbnM7XG5cbiAgICB2YXIgZWRnZXMgPSBpbnRlcmFjdGlvbi5wcmVwYXJlZC5lZGdlcztcblxuICAgIGlmICghZWRnZXMpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBhcmcub3B0aW9ucyA9IHtcbiAgICAgIHJlbGF0aXZlUG9pbnRzOiBbe1xuICAgICAgICB4OiBlZGdlcy5sZWZ0ID8gMCA6IDEsXG4gICAgICAgIHk6IGVkZ2VzLnRvcCA/IDAgOiAxXG4gICAgICB9XSxcbiAgICAgIG9yaWdpbjogeyB4OiAwLCB5OiAwIH0sXG4gICAgICBvZmZzZXQ6ICdzZWxmJyxcbiAgICAgIHJhbmdlOiBvcHRpb25zLnJhbmdlXG4gICAgfTtcblxuICAgIHZhciBvZmZzZXRzID0gc25hcC5zZXRPZmZzZXQoYXJnKTtcbiAgICBhcmcub3B0aW9ucyA9IG9wdGlvbnM7XG5cbiAgICByZXR1cm4gb2Zmc2V0cztcbiAgfSxcblxuICBzZXQ6IGZ1bmN0aW9uIHNldChhcmcpIHtcbiAgICB2YXIgaW50ZXJhY3Rpb24gPSBhcmcuaW50ZXJhY3Rpb24sXG4gICAgICAgIG9wdGlvbnMgPSBhcmcub3B0aW9ucyxcbiAgICAgICAgb2Zmc2V0ID0gYXJnLm9mZnNldCxcbiAgICAgICAgbW9kaWZpZWRDb29yZHMgPSBhcmcubW9kaWZpZWRDb29yZHM7XG5cbiAgICB2YXIgcGFnZSA9IHV0aWxzLmV4dGVuZCh7fSwgbW9kaWZpZWRDb29yZHMpO1xuICAgIHZhciByZWxhdGl2ZVggPSBwYWdlLnggLSBvZmZzZXRbMF0ueDtcbiAgICB2YXIgcmVsYXRpdmVZID0gcGFnZS55IC0gb2Zmc2V0WzBdLnk7XG5cbiAgICBhcmcub3B0aW9ucyA9IHV0aWxzLmV4dGVuZCh7fSwgb3B0aW9ucyk7XG4gICAgYXJnLm9wdGlvbnMudGFyZ2V0cyA9IFtdO1xuXG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IChvcHRpb25zLnRhcmdldHMgfHwgW10pLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9yZWY7XG5cbiAgICAgIF9yZWYgPSAob3B0aW9ucy50YXJnZXRzIHx8IFtdKVtfaV07XG4gICAgICB2YXIgc25hcFRhcmdldCA9IF9yZWY7XG5cbiAgICAgIHZhciB0YXJnZXQgPSB2b2lkIDA7XG5cbiAgICAgIGlmICh1dGlscy5pcy5mdW5jdGlvbihzbmFwVGFyZ2V0KSkge1xuICAgICAgICB0YXJnZXQgPSBzbmFwVGFyZ2V0KHJlbGF0aXZlWCwgcmVsYXRpdmVZLCBpbnRlcmFjdGlvbik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0YXJnZXQgPSBzbmFwVGFyZ2V0O1xuICAgICAgfVxuXG4gICAgICBpZiAoIXRhcmdldCkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKCd3aWR0aCcgaW4gdGFyZ2V0ICYmICdoZWlnaHQnIGluIHRhcmdldCkge1xuICAgICAgICB0YXJnZXQueCA9IHRhcmdldC53aWR0aDtcbiAgICAgICAgdGFyZ2V0LnkgPSB0YXJnZXQuaGVpZ2h0O1xuICAgICAgfVxuXG4gICAgICBhcmcub3B0aW9ucy50YXJnZXRzLnB1c2godGFyZ2V0KTtcbiAgICB9XG5cbiAgICBzbmFwLnNldChhcmcpO1xuICB9LFxuXG4gIG1vZGlmeUNvb3JkczogZnVuY3Rpb24gbW9kaWZ5Q29vcmRzKGFyZykge1xuICAgIHZhciBvcHRpb25zID0gYXJnLm9wdGlvbnM7XG5cblxuICAgIGFyZy5vcHRpb25zID0gdXRpbHMuZXh0ZW5kKHt9LCBvcHRpb25zKTtcbiAgICBhcmcub3B0aW9ucy5lbmFibGVkID0gb3B0aW9ucy5lbmFibGVkO1xuICAgIGFyZy5vcHRpb25zLnJlbGF0aXZlUG9pbnRzID0gW251bGxdO1xuXG4gICAgc25hcC5tb2RpZnlDb29yZHMoYXJnKTtcbiAgfVxufTtcblxubW9kaWZpZXJzLnNuYXBTaXplID0gc25hcFNpemU7XG5tb2RpZmllcnMubmFtZXMucHVzaCgnc25hcFNpemUnKTtcblxuZGVmYXVsdE9wdGlvbnMucGVyQWN0aW9uLnNuYXBTaXplID0gc25hcFNpemUuZGVmYXVsdHM7XG5yZXNpemUuZGVmYXVsdHMuc25hcFNpemUgPSBzbmFwU2l6ZS5kZWZhdWx0cztcblxubW9kdWxlLmV4cG9ydHMgPSBzbmFwU2l6ZTtcblxufSx7XCIuLi9hY3Rpb25zL3Jlc2l6ZVwiOjEwLFwiLi4vZGVmYXVsdE9wdGlvbnNcIjoxOCxcIi4uL3V0aWxzL1wiOjQ0LFwiLi9iYXNlXCI6MjMsXCIuL3NuYXBcIjoyN31dLDI5OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxudmFyIHBvaW50ZXJVdGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzL3BvaW50ZXJVdGlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHtcbiAgLyoqICovXG4gIGZ1bmN0aW9uIFBvaW50ZXJFdmVudCh0eXBlLCBwb2ludGVyLCBldmVudCwgZXZlbnRUYXJnZXQsIGludGVyYWN0aW9uKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFBvaW50ZXJFdmVudCk7XG5cbiAgICBwb2ludGVyVXRpbHMucG9pbnRlckV4dGVuZCh0aGlzLCBldmVudCk7XG5cbiAgICBpZiAoZXZlbnQgIT09IHBvaW50ZXIpIHtcbiAgICAgIHBvaW50ZXJVdGlscy5wb2ludGVyRXh0ZW5kKHRoaXMsIHBvaW50ZXIpO1xuICAgIH1cblxuICAgIHRoaXMuaW50ZXJhY3Rpb24gPSBpbnRlcmFjdGlvbjtcblxuICAgIHRoaXMudGltZVN0YW1wID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgdGhpcy5vcmlnaW5hbEV2ZW50ID0gZXZlbnQ7XG4gICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICB0aGlzLnBvaW50ZXJJZCA9IHBvaW50ZXJVdGlscy5nZXRQb2ludGVySWQocG9pbnRlcik7XG4gICAgdGhpcy5wb2ludGVyVHlwZSA9IHBvaW50ZXJVdGlscy5nZXRQb2ludGVyVHlwZShwb2ludGVyKTtcbiAgICB0aGlzLnRhcmdldCA9IGV2ZW50VGFyZ2V0O1xuICAgIHRoaXMuY3VycmVudFRhcmdldCA9IG51bGw7XG5cbiAgICBpZiAodHlwZSA9PT0gJ3RhcCcpIHtcbiAgICAgIHZhciBwb2ludGVySW5kZXggPSBpbnRlcmFjdGlvbi5nZXRQb2ludGVySW5kZXgocG9pbnRlcik7XG4gICAgICB0aGlzLmR0ID0gdGhpcy50aW1lU3RhbXAgLSBpbnRlcmFjdGlvbi5kb3duVGltZXNbcG9pbnRlckluZGV4XTtcblxuICAgICAgdmFyIGludGVydmFsID0gdGhpcy50aW1lU3RhbXAgLSBpbnRlcmFjdGlvbi50YXBUaW1lO1xuXG4gICAgICB0aGlzLmRvdWJsZSA9ICEhKGludGVyYWN0aW9uLnByZXZUYXAgJiYgaW50ZXJhY3Rpb24ucHJldlRhcC50eXBlICE9PSAnZG91YmxldGFwJyAmJiBpbnRlcmFjdGlvbi5wcmV2VGFwLnRhcmdldCA9PT0gdGhpcy50YXJnZXQgJiYgaW50ZXJ2YWwgPCA1MDApO1xuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ2RvdWJsZXRhcCcpIHtcbiAgICAgIHRoaXMuZHQgPSBwb2ludGVyLnRpbWVTdGFtcCAtIGludGVyYWN0aW9uLnRhcFRpbWU7XG4gICAgfVxuICB9XG5cbiAgUG9pbnRlckV2ZW50LnByb3RvdHlwZS5zdWJ0cmFjdE9yaWdpbiA9IGZ1bmN0aW9uIHN1YnRyYWN0T3JpZ2luKF9yZWYpIHtcbiAgICB2YXIgb3JpZ2luWCA9IF9yZWYueCxcbiAgICAgICAgb3JpZ2luWSA9IF9yZWYueTtcblxuICAgIHRoaXMucGFnZVggLT0gb3JpZ2luWDtcbiAgICB0aGlzLnBhZ2VZIC09IG9yaWdpblk7XG4gICAgdGhpcy5jbGllbnRYIC09IG9yaWdpblg7XG4gICAgdGhpcy5jbGllbnRZIC09IG9yaWdpblk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBQb2ludGVyRXZlbnQucHJvdG90eXBlLmFkZE9yaWdpbiA9IGZ1bmN0aW9uIGFkZE9yaWdpbihfcmVmMikge1xuICAgIHZhciBvcmlnaW5YID0gX3JlZjIueCxcbiAgICAgICAgb3JpZ2luWSA9IF9yZWYyLnk7XG5cbiAgICB0aGlzLnBhZ2VYICs9IG9yaWdpblg7XG4gICAgdGhpcy5wYWdlWSArPSBvcmlnaW5ZO1xuICAgIHRoaXMuY2xpZW50WCArPSBvcmlnaW5YO1xuICAgIHRoaXMuY2xpZW50WSArPSBvcmlnaW5ZO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgLyoqICovXG5cblxuICBQb2ludGVyRXZlbnQucHJvdG90eXBlLnByZXZlbnREZWZhdWx0ID0gZnVuY3Rpb24gcHJldmVudERlZmF1bHQoKSB7XG4gICAgdGhpcy5vcmlnaW5hbEV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIH07XG5cbiAgLyoqICovXG5cblxuICBQb2ludGVyRXZlbnQucHJvdG90eXBlLnN0b3BQcm9wYWdhdGlvbiA9IGZ1bmN0aW9uIHN0b3BQcm9wYWdhdGlvbigpIHtcbiAgICB0aGlzLnByb3BhZ2F0aW9uU3RvcHBlZCA9IHRydWU7XG4gIH07XG5cbiAgLyoqICovXG5cblxuICBQb2ludGVyRXZlbnQucHJvdG90eXBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbiA9IGZ1bmN0aW9uIHN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpIHtcbiAgICB0aGlzLmltbWVkaWF0ZVByb3BhZ2F0aW9uU3RvcHBlZCA9IHRoaXMucHJvcGFnYXRpb25TdG9wcGVkID0gdHJ1ZTtcbiAgfTtcblxuICByZXR1cm4gUG9pbnRlckV2ZW50O1xufSgpO1xuXG59LHtcIi4uL3V0aWxzL3BvaW50ZXJVdGlsc1wiOjQ5fV0sMzA6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUG9pbnRlckV2ZW50ID0gcmVxdWlyZSgnLi9Qb2ludGVyRXZlbnQnKTtcbnZhciBJbnRlcmFjdGlvbiA9IHJlcXVpcmUoJy4uL0ludGVyYWN0aW9uJyk7XG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpO1xudmFyIGRlZmF1bHRzID0gcmVxdWlyZSgnLi4vZGVmYXVsdE9wdGlvbnMnKTtcbnZhciBzaWduYWxzID0gcmVxdWlyZSgnLi4vdXRpbHMvU2lnbmFscycpLm5ldygpO1xuXG52YXIgc2ltcGxlU2lnbmFscyA9IFsnZG93bicsICd1cCcsICdjYW5jZWwnXTtcbnZhciBzaW1wbGVFdmVudHMgPSBbJ2Rvd24nLCAndXAnLCAnY2FuY2VsJ107XG5cbnZhciBwb2ludGVyRXZlbnRzID0ge1xuICBQb2ludGVyRXZlbnQ6IFBvaW50ZXJFdmVudCxcbiAgZmlyZTogZmlyZSxcbiAgY29sbGVjdEV2ZW50VGFyZ2V0czogY29sbGVjdEV2ZW50VGFyZ2V0cyxcbiAgc2lnbmFsczogc2lnbmFscyxcbiAgZGVmYXVsdHM6IHtcbiAgICBob2xkRHVyYXRpb246IDYwMCxcbiAgICBpZ25vcmVGcm9tOiBudWxsLFxuICAgIGFsbG93RnJvbTogbnVsbCxcbiAgICBvcmlnaW46IHsgeDogMCwgeTogMCB9XG4gIH0sXG4gIHR5cGVzOiBbJ2Rvd24nLCAnbW92ZScsICd1cCcsICdjYW5jZWwnLCAndGFwJywgJ2RvdWJsZXRhcCcsICdob2xkJ11cbn07XG5cbmZ1bmN0aW9uIGZpcmUoYXJnKSB7XG4gIHZhciBpbnRlcmFjdGlvbiA9IGFyZy5pbnRlcmFjdGlvbixcbiAgICAgIHBvaW50ZXIgPSBhcmcucG9pbnRlcixcbiAgICAgIGV2ZW50ID0gYXJnLmV2ZW50LFxuICAgICAgZXZlbnRUYXJnZXQgPSBhcmcuZXZlbnRUYXJnZXQsXG4gICAgICBfYXJnJHR5cGUgPSBhcmcudHlwZSxcbiAgICAgIHR5cGUgPSBfYXJnJHR5cGUgPT09IHVuZGVmaW5lZCA/IGFyZy5wb2ludGVyRXZlbnQudHlwZSA6IF9hcmckdHlwZSxcbiAgICAgIF9hcmckdGFyZ2V0cyA9IGFyZy50YXJnZXRzLFxuICAgICAgdGFyZ2V0cyA9IF9hcmckdGFyZ2V0cyA9PT0gdW5kZWZpbmVkID8gY29sbGVjdEV2ZW50VGFyZ2V0cyhhcmcpIDogX2FyZyR0YXJnZXRzLFxuICAgICAgX2FyZyRwb2ludGVyRXZlbnQgPSBhcmcucG9pbnRlckV2ZW50LFxuICAgICAgcG9pbnRlckV2ZW50ID0gX2FyZyRwb2ludGVyRXZlbnQgPT09IHVuZGVmaW5lZCA/IG5ldyBQb2ludGVyRXZlbnQodHlwZSwgcG9pbnRlciwgZXZlbnQsIGV2ZW50VGFyZ2V0LCBpbnRlcmFjdGlvbikgOiBfYXJnJHBvaW50ZXJFdmVudDtcblxuXG4gIHZhciBzaWduYWxBcmcgPSB7XG4gICAgaW50ZXJhY3Rpb246IGludGVyYWN0aW9uLFxuICAgIHBvaW50ZXI6IHBvaW50ZXIsXG4gICAgZXZlbnQ6IGV2ZW50LFxuICAgIGV2ZW50VGFyZ2V0OiBldmVudFRhcmdldCxcbiAgICB0YXJnZXRzOiB0YXJnZXRzLFxuICAgIHR5cGU6IHR5cGUsXG4gICAgcG9pbnRlckV2ZW50OiBwb2ludGVyRXZlbnRcbiAgfTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHRhcmdldHMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgdGFyZ2V0ID0gdGFyZ2V0c1tpXTtcblxuICAgIGZvciAodmFyIHByb3AgaW4gdGFyZ2V0LnByb3BzIHx8IHt9KSB7XG4gICAgICBwb2ludGVyRXZlbnRbcHJvcF0gPSB0YXJnZXQucHJvcHNbcHJvcF07XG4gICAgfVxuXG4gICAgdmFyIG9yaWdpbiA9IHV0aWxzLmdldE9yaWdpblhZKHRhcmdldC5ldmVudGFibGUsIHRhcmdldC5lbGVtZW50KTtcblxuICAgIHBvaW50ZXJFdmVudC5zdWJ0cmFjdE9yaWdpbihvcmlnaW4pO1xuICAgIHBvaW50ZXJFdmVudC5ldmVudGFibGUgPSB0YXJnZXQuZXZlbnRhYmxlO1xuICAgIHBvaW50ZXJFdmVudC5jdXJyZW50VGFyZ2V0ID0gdGFyZ2V0LmVsZW1lbnQ7XG5cbiAgICB0YXJnZXQuZXZlbnRhYmxlLmZpcmUocG9pbnRlckV2ZW50KTtcblxuICAgIHBvaW50ZXJFdmVudC5hZGRPcmlnaW4ob3JpZ2luKTtcblxuICAgIGlmIChwb2ludGVyRXZlbnQuaW1tZWRpYXRlUHJvcGFnYXRpb25TdG9wcGVkIHx8IHBvaW50ZXJFdmVudC5wcm9wYWdhdGlvblN0b3BwZWQgJiYgaSArIDEgPCB0YXJnZXRzLmxlbmd0aCAmJiB0YXJnZXRzW2kgKyAxXS5lbGVtZW50ICE9PSBwb2ludGVyRXZlbnQuY3VycmVudFRhcmdldCkge1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgc2lnbmFscy5maXJlKCdmaXJlZCcsIHNpZ25hbEFyZyk7XG5cbiAgaWYgKHR5cGUgPT09ICd0YXAnKSB7XG4gICAgLy8gaWYgcG9pbnRlckV2ZW50IHNob3VsZCBtYWtlIGEgZG91YmxlIHRhcCwgY3JlYXRlIGFuZCBmaXJlIGEgZG91YmxldGFwXG4gICAgLy8gUG9pbnRlckV2ZW50IGFuZCB1c2UgdGhhdCBhcyB0aGUgcHJldlRhcFxuICAgIHZhciBwcmV2VGFwID0gcG9pbnRlckV2ZW50LmRvdWJsZSA/IGZpcmUoe1xuICAgICAgaW50ZXJhY3Rpb246IGludGVyYWN0aW9uLCBwb2ludGVyOiBwb2ludGVyLCBldmVudDogZXZlbnQsIGV2ZW50VGFyZ2V0OiBldmVudFRhcmdldCxcbiAgICAgIHR5cGU6ICdkb3VibGV0YXAnXG4gICAgfSkgOiBwb2ludGVyRXZlbnQ7XG5cbiAgICBpbnRlcmFjdGlvbi5wcmV2VGFwID0gcHJldlRhcDtcbiAgICBpbnRlcmFjdGlvbi50YXBUaW1lID0gcHJldlRhcC50aW1lU3RhbXA7XG4gIH1cblxuICByZXR1cm4gcG9pbnRlckV2ZW50O1xufVxuXG5mdW5jdGlvbiBjb2xsZWN0RXZlbnRUYXJnZXRzKF9yZWYpIHtcbiAgdmFyIGludGVyYWN0aW9uID0gX3JlZi5pbnRlcmFjdGlvbixcbiAgICAgIHBvaW50ZXIgPSBfcmVmLnBvaW50ZXIsXG4gICAgICBldmVudCA9IF9yZWYuZXZlbnQsXG4gICAgICBldmVudFRhcmdldCA9IF9yZWYuZXZlbnRUYXJnZXQsXG4gICAgICB0eXBlID0gX3JlZi50eXBlO1xuXG4gIHZhciBwb2ludGVySW5kZXggPSBpbnRlcmFjdGlvbi5nZXRQb2ludGVySW5kZXgocG9pbnRlcik7XG5cbiAgLy8gZG8gbm90IGZpcmUgYSB0YXAgZXZlbnQgaWYgdGhlIHBvaW50ZXIgd2FzIG1vdmVkIGJlZm9yZSBiZWluZyBsaWZ0ZWRcbiAgaWYgKHR5cGUgPT09ICd0YXAnICYmIChpbnRlcmFjdGlvbi5wb2ludGVyV2FzTW92ZWRcbiAgLy8gb3IgaWYgdGhlIHBvaW50ZXJ1cCB0YXJnZXQgaXMgZGlmZmVyZW50IHRvIHRoZSBwb2ludGVyZG93biB0YXJnZXRcbiAgfHwgIShpbnRlcmFjdGlvbi5kb3duVGFyZ2V0c1twb2ludGVySW5kZXhdICYmIGludGVyYWN0aW9uLmRvd25UYXJnZXRzW3BvaW50ZXJJbmRleF0gPT09IGV2ZW50VGFyZ2V0KSkpIHtcbiAgICByZXR1cm4gW107XG4gIH1cblxuICB2YXIgcGF0aCA9IHV0aWxzLmdldFBhdGgoZXZlbnRUYXJnZXQpO1xuICB2YXIgc2lnbmFsQXJnID0ge1xuICAgIGludGVyYWN0aW9uOiBpbnRlcmFjdGlvbixcbiAgICBwb2ludGVyOiBwb2ludGVyLFxuICAgIGV2ZW50OiBldmVudCxcbiAgICBldmVudFRhcmdldDogZXZlbnRUYXJnZXQsXG4gICAgdHlwZTogdHlwZSxcbiAgICBwYXRoOiBwYXRoLFxuICAgIHRhcmdldHM6IFtdLFxuICAgIGVsZW1lbnQ6IG51bGxcbiAgfTtcblxuICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgcGF0aC5sZW5ndGg7IF9pKyspIHtcbiAgICB2YXIgX3JlZjI7XG5cbiAgICBfcmVmMiA9IHBhdGhbX2ldO1xuICAgIHZhciBlbGVtZW50ID0gX3JlZjI7XG5cbiAgICBzaWduYWxBcmcuZWxlbWVudCA9IGVsZW1lbnQ7XG5cbiAgICBzaWduYWxzLmZpcmUoJ2NvbGxlY3QtdGFyZ2V0cycsIHNpZ25hbEFyZyk7XG4gIH1cblxuICBpZiAodHlwZSA9PT0gJ2hvbGQnKSB7XG4gICAgc2lnbmFsQXJnLnRhcmdldHMgPSBzaWduYWxBcmcudGFyZ2V0cy5maWx0ZXIoZnVuY3Rpb24gKHRhcmdldCkge1xuICAgICAgcmV0dXJuIHRhcmdldC5ldmVudGFibGUub3B0aW9ucy5ob2xkRHVyYXRpb24gPT09IGludGVyYWN0aW9uLmhvbGRUaW1lcnNbcG9pbnRlckluZGV4XS5kdXJhdGlvbjtcbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiBzaWduYWxBcmcudGFyZ2V0cztcbn1cblxuSW50ZXJhY3Rpb24uc2lnbmFscy5vbigndXBkYXRlLXBvaW50ZXItZG93bicsIGZ1bmN0aW9uIChfcmVmMykge1xuICB2YXIgaW50ZXJhY3Rpb24gPSBfcmVmMy5pbnRlcmFjdGlvbixcbiAgICAgIHBvaW50ZXJJbmRleCA9IF9yZWYzLnBvaW50ZXJJbmRleDtcblxuICBpbnRlcmFjdGlvbi5ob2xkVGltZXJzW3BvaW50ZXJJbmRleF0gPSB7IGR1cmF0aW9uOiBJbmZpbml0eSwgdGltZW91dDogbnVsbCB9O1xufSk7XG5cbkludGVyYWN0aW9uLnNpZ25hbHMub24oJ3JlbW92ZS1wb2ludGVyJywgZnVuY3Rpb24gKF9yZWY0KSB7XG4gIHZhciBpbnRlcmFjdGlvbiA9IF9yZWY0LmludGVyYWN0aW9uLFxuICAgICAgcG9pbnRlckluZGV4ID0gX3JlZjQucG9pbnRlckluZGV4O1xuXG4gIGludGVyYWN0aW9uLmhvbGRUaW1lcnMuc3BsaWNlKHBvaW50ZXJJbmRleCwgMSk7XG59KTtcblxuSW50ZXJhY3Rpb24uc2lnbmFscy5vbignbW92ZScsIGZ1bmN0aW9uIChfcmVmNSkge1xuICB2YXIgaW50ZXJhY3Rpb24gPSBfcmVmNS5pbnRlcmFjdGlvbixcbiAgICAgIHBvaW50ZXIgPSBfcmVmNS5wb2ludGVyLFxuICAgICAgZXZlbnQgPSBfcmVmNS5ldmVudCxcbiAgICAgIGV2ZW50VGFyZ2V0ID0gX3JlZjUuZXZlbnRUYXJnZXQsXG4gICAgICBkdXBsaWNhdGVNb3ZlID0gX3JlZjUuZHVwbGljYXRlTW92ZTtcblxuICB2YXIgcG9pbnRlckluZGV4ID0gaW50ZXJhY3Rpb24uZ2V0UG9pbnRlckluZGV4KHBvaW50ZXIpO1xuXG4gIGlmICghZHVwbGljYXRlTW92ZSAmJiAoIWludGVyYWN0aW9uLnBvaW50ZXJJc0Rvd24gfHwgaW50ZXJhY3Rpb24ucG9pbnRlcldhc01vdmVkKSkge1xuICAgIGlmIChpbnRlcmFjdGlvbi5wb2ludGVySXNEb3duKSB7XG4gICAgICBjbGVhclRpbWVvdXQoaW50ZXJhY3Rpb24uaG9sZFRpbWVyc1twb2ludGVySW5kZXhdLnRpbWVvdXQpO1xuICAgIH1cblxuICAgIGZpcmUoe1xuICAgICAgaW50ZXJhY3Rpb246IGludGVyYWN0aW9uLCBwb2ludGVyOiBwb2ludGVyLCBldmVudDogZXZlbnQsIGV2ZW50VGFyZ2V0OiBldmVudFRhcmdldCxcbiAgICAgIHR5cGU6ICdtb3ZlJ1xuICAgIH0pO1xuICB9XG59KTtcblxuSW50ZXJhY3Rpb24uc2lnbmFscy5vbignZG93bicsIGZ1bmN0aW9uIChfcmVmNikge1xuICB2YXIgaW50ZXJhY3Rpb24gPSBfcmVmNi5pbnRlcmFjdGlvbixcbiAgICAgIHBvaW50ZXIgPSBfcmVmNi5wb2ludGVyLFxuICAgICAgZXZlbnQgPSBfcmVmNi5ldmVudCxcbiAgICAgIGV2ZW50VGFyZ2V0ID0gX3JlZjYuZXZlbnRUYXJnZXQsXG4gICAgICBwb2ludGVySW5kZXggPSBfcmVmNi5wb2ludGVySW5kZXg7XG5cbiAgdmFyIHRpbWVyID0gaW50ZXJhY3Rpb24uaG9sZFRpbWVyc1twb2ludGVySW5kZXhdO1xuICB2YXIgcGF0aCA9IHV0aWxzLmdldFBhdGgoZXZlbnRUYXJnZXQpO1xuICB2YXIgc2lnbmFsQXJnID0ge1xuICAgIGludGVyYWN0aW9uOiBpbnRlcmFjdGlvbixcbiAgICBwb2ludGVyOiBwb2ludGVyLFxuICAgIGV2ZW50OiBldmVudCxcbiAgICBldmVudFRhcmdldDogZXZlbnRUYXJnZXQsXG4gICAgdHlwZTogJ2hvbGQnLFxuICAgIHRhcmdldHM6IFtdLFxuICAgIHBhdGg6IHBhdGgsXG4gICAgZWxlbWVudDogbnVsbFxuICB9O1xuXG4gIGZvciAodmFyIF9pMiA9IDA7IF9pMiA8IHBhdGgubGVuZ3RoOyBfaTIrKykge1xuICAgIHZhciBfcmVmNztcblxuICAgIF9yZWY3ID0gcGF0aFtfaTJdO1xuICAgIHZhciBlbGVtZW50ID0gX3JlZjc7XG5cbiAgICBzaWduYWxBcmcuZWxlbWVudCA9IGVsZW1lbnQ7XG5cbiAgICBzaWduYWxzLmZpcmUoJ2NvbGxlY3QtdGFyZ2V0cycsIHNpZ25hbEFyZyk7XG4gIH1cblxuICBpZiAoIXNpZ25hbEFyZy50YXJnZXRzLmxlbmd0aCkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHZhciBtaW5EdXJhdGlvbiA9IEluZmluaXR5O1xuXG4gIGZvciAodmFyIF9pMyA9IDA7IF9pMyA8IHNpZ25hbEFyZy50YXJnZXRzLmxlbmd0aDsgX2kzKyspIHtcbiAgICB2YXIgX3JlZjg7XG5cbiAgICBfcmVmOCA9IHNpZ25hbEFyZy50YXJnZXRzW19pM107XG4gICAgdmFyIHRhcmdldCA9IF9yZWY4O1xuXG4gICAgdmFyIGhvbGREdXJhdGlvbiA9IHRhcmdldC5ldmVudGFibGUub3B0aW9ucy5ob2xkRHVyYXRpb247XG5cbiAgICBpZiAoaG9sZER1cmF0aW9uIDwgbWluRHVyYXRpb24pIHtcbiAgICAgIG1pbkR1cmF0aW9uID0gaG9sZER1cmF0aW9uO1xuICAgIH1cbiAgfVxuXG4gIHRpbWVyLmR1cmF0aW9uID0gbWluRHVyYXRpb247XG4gIHRpbWVyLnRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICBmaXJlKHtcbiAgICAgIGludGVyYWN0aW9uOiBpbnRlcmFjdGlvbixcbiAgICAgIGV2ZW50VGFyZ2V0OiBldmVudFRhcmdldCxcbiAgICAgIHBvaW50ZXI6IHBvaW50ZXIsXG4gICAgICBldmVudDogZXZlbnQsXG4gICAgICB0eXBlOiAnaG9sZCdcbiAgICB9KTtcbiAgfSwgbWluRHVyYXRpb24pO1xufSk7XG5cbkludGVyYWN0aW9uLnNpZ25hbHMub24oJ3VwJywgZnVuY3Rpb24gKF9yZWY5KSB7XG4gIHZhciBpbnRlcmFjdGlvbiA9IF9yZWY5LmludGVyYWN0aW9uLFxuICAgICAgcG9pbnRlciA9IF9yZWY5LnBvaW50ZXIsXG4gICAgICBldmVudCA9IF9yZWY5LmV2ZW50LFxuICAgICAgZXZlbnRUYXJnZXQgPSBfcmVmOS5ldmVudFRhcmdldDtcblxuICBpZiAoIWludGVyYWN0aW9uLnBvaW50ZXJXYXNNb3ZlZCkge1xuICAgIGZpcmUoeyBpbnRlcmFjdGlvbjogaW50ZXJhY3Rpb24sIGV2ZW50VGFyZ2V0OiBldmVudFRhcmdldCwgcG9pbnRlcjogcG9pbnRlciwgZXZlbnQ6IGV2ZW50LCB0eXBlOiAndGFwJyB9KTtcbiAgfVxufSk7XG5cbnZhciBfYXJyID0gWyd1cCcsICdjYW5jZWwnXTtcbmZvciAodmFyIF9pNCA9IDA7IF9pNCA8IF9hcnIubGVuZ3RoOyBfaTQrKykge1xuICB2YXIgc2lnbmFsTmFtZSA9IF9hcnJbX2k0XTtcbiAgSW50ZXJhY3Rpb24uc2lnbmFscy5vbihzaWduYWxOYW1lLCBmdW5jdGlvbiAoX3JlZjExKSB7XG4gICAgdmFyIGludGVyYWN0aW9uID0gX3JlZjExLmludGVyYWN0aW9uLFxuICAgICAgICBwb2ludGVySW5kZXggPSBfcmVmMTEucG9pbnRlckluZGV4O1xuXG4gICAgaWYgKGludGVyYWN0aW9uLmhvbGRUaW1lcnNbcG9pbnRlckluZGV4XSkge1xuICAgICAgY2xlYXJUaW1lb3V0KGludGVyYWN0aW9uLmhvbGRUaW1lcnNbcG9pbnRlckluZGV4XS50aW1lb3V0KTtcbiAgICB9XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVTaWduYWxMaXN0ZW5lcih0eXBlKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoX3JlZjEwKSB7XG4gICAgdmFyIGludGVyYWN0aW9uID0gX3JlZjEwLmludGVyYWN0aW9uLFxuICAgICAgICBwb2ludGVyID0gX3JlZjEwLnBvaW50ZXIsXG4gICAgICAgIGV2ZW50ID0gX3JlZjEwLmV2ZW50LFxuICAgICAgICBldmVudFRhcmdldCA9IF9yZWYxMC5ldmVudFRhcmdldDtcblxuICAgIGZpcmUoeyBpbnRlcmFjdGlvbjogaW50ZXJhY3Rpb24sIGV2ZW50VGFyZ2V0OiBldmVudFRhcmdldCwgcG9pbnRlcjogcG9pbnRlciwgZXZlbnQ6IGV2ZW50LCB0eXBlOiB0eXBlIH0pO1xuICB9O1xufVxuXG5mb3IgKHZhciBpID0gMDsgaSA8IHNpbXBsZVNpZ25hbHMubGVuZ3RoOyBpKyspIHtcbiAgSW50ZXJhY3Rpb24uc2lnbmFscy5vbihzaW1wbGVTaWduYWxzW2ldLCBjcmVhdGVTaWduYWxMaXN0ZW5lcihzaW1wbGVFdmVudHNbaV0pKTtcbn1cblxuSW50ZXJhY3Rpb24uc2lnbmFscy5vbignbmV3JywgZnVuY3Rpb24gKGludGVyYWN0aW9uKSB7XG4gIGludGVyYWN0aW9uLnByZXZUYXAgPSBudWxsOyAvLyB0aGUgbW9zdCByZWNlbnQgdGFwIGV2ZW50IG9uIHRoaXMgaW50ZXJhY3Rpb25cbiAgaW50ZXJhY3Rpb24udGFwVGltZSA9IDA7IC8vIHRpbWUgb2YgdGhlIG1vc3QgcmVjZW50IHRhcCBldmVudFxuICBpbnRlcmFjdGlvbi5ob2xkVGltZXJzID0gW107IC8vIFt7IGR1cmF0aW9uLCB0aW1lb3V0IH1dXG59KTtcblxuZGVmYXVsdHMucG9pbnRlckV2ZW50cyA9IHBvaW50ZXJFdmVudHMuZGVmYXVsdHM7XG5tb2R1bGUuZXhwb3J0cyA9IHBvaW50ZXJFdmVudHM7XG5cbn0se1wiLi4vSW50ZXJhY3Rpb25cIjo1LFwiLi4vZGVmYXVsdE9wdGlvbnNcIjoxOCxcIi4uL3V0aWxzXCI6NDQsXCIuLi91dGlscy9TaWduYWxzXCI6MzQsXCIuL1BvaW50ZXJFdmVudFwiOjI5fV0sMzE6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgcG9pbnRlckV2ZW50cyA9IHJlcXVpcmUoJy4vYmFzZScpO1xudmFyIEludGVyYWN0aW9uID0gcmVxdWlyZSgnLi4vSW50ZXJhY3Rpb24nKTtcblxucG9pbnRlckV2ZW50cy5zaWduYWxzLm9uKCduZXcnLCBvbk5ldyk7XG5wb2ludGVyRXZlbnRzLnNpZ25hbHMub24oJ2ZpcmVkJywgb25GaXJlZCk7XG5cbnZhciBfYXJyID0gWydtb3ZlJywgJ3VwJywgJ2NhbmNlbCcsICdlbmRhbGwnXTtcbmZvciAodmFyIF9pID0gMDsgX2kgPCBfYXJyLmxlbmd0aDsgX2krKykge1xuICB2YXIgc2lnbmFsID0gX2FycltfaV07XG4gIEludGVyYWN0aW9uLnNpZ25hbHMub24oc2lnbmFsLCBlbmRIb2xkUmVwZWF0KTtcbn1cblxuZnVuY3Rpb24gb25OZXcoX3JlZikge1xuICB2YXIgcG9pbnRlckV2ZW50ID0gX3JlZi5wb2ludGVyRXZlbnQ7XG5cbiAgaWYgKHBvaW50ZXJFdmVudC50eXBlICE9PSAnaG9sZCcpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBwb2ludGVyRXZlbnQuY291bnQgPSAocG9pbnRlckV2ZW50LmNvdW50IHx8IDApICsgMTtcbn1cblxuZnVuY3Rpb24gb25GaXJlZChfcmVmMikge1xuICB2YXIgaW50ZXJhY3Rpb24gPSBfcmVmMi5pbnRlcmFjdGlvbixcbiAgICAgIHBvaW50ZXJFdmVudCA9IF9yZWYyLnBvaW50ZXJFdmVudCxcbiAgICAgIGV2ZW50VGFyZ2V0ID0gX3JlZjIuZXZlbnRUYXJnZXQsXG4gICAgICB0YXJnZXRzID0gX3JlZjIudGFyZ2V0cztcblxuICBpZiAocG9pbnRlckV2ZW50LnR5cGUgIT09ICdob2xkJyB8fCAhdGFyZ2V0cy5sZW5ndGgpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBnZXQgdGhlIHJlcGVhdCBpbnRlcnZhbCBmcm9tIHRoZSBmaXJzdCBldmVudGFibGVcbiAgdmFyIGludGVydmFsID0gdGFyZ2V0c1swXS5ldmVudGFibGUub3B0aW9ucy5ob2xkUmVwZWF0SW50ZXJ2YWw7XG5cbiAgLy8gZG9uJ3QgcmVwZWF0IGlmIHRoZSBpbnRlcnZhbCBpcyAwIG9yIGxlc3NcbiAgaWYgKGludGVydmFsIDw9IDApIHtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBzZXQgYSB0aW1lb3V0IHRvIGZpcmUgdGhlIGhvbGRyZXBlYXQgZXZlbnRcbiAgaW50ZXJhY3Rpb24uaG9sZEludGVydmFsSGFuZGxlID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgcG9pbnRlckV2ZW50cy5maXJlKHtcbiAgICAgIGludGVyYWN0aW9uOiBpbnRlcmFjdGlvbixcbiAgICAgIGV2ZW50VGFyZ2V0OiBldmVudFRhcmdldCxcbiAgICAgIHR5cGU6ICdob2xkJyxcbiAgICAgIHBvaW50ZXI6IHBvaW50ZXJFdmVudCxcbiAgICAgIGV2ZW50OiBwb2ludGVyRXZlbnRcbiAgICB9KTtcbiAgfSwgaW50ZXJ2YWwpO1xufVxuXG5mdW5jdGlvbiBlbmRIb2xkUmVwZWF0KF9yZWYzKSB7XG4gIHZhciBpbnRlcmFjdGlvbiA9IF9yZWYzLmludGVyYWN0aW9uO1xuXG4gIC8vIHNldCB0aGUgaW50ZXJhY3Rpb24ncyBob2xkU3RvcFRpbWUgcHJvcGVydHlcbiAgLy8gdG8gc3RvcCBmdXJ0aGVyIGhvbGRSZXBlYXQgZXZlbnRzXG4gIGlmIChpbnRlcmFjdGlvbi5ob2xkSW50ZXJ2YWxIYW5kbGUpIHtcbiAgICBjbGVhckludGVydmFsKGludGVyYWN0aW9uLmhvbGRJbnRlcnZhbEhhbmRsZSk7XG4gICAgaW50ZXJhY3Rpb24uaG9sZEludGVydmFsSGFuZGxlID0gbnVsbDtcbiAgfVxufVxuXG4vLyBkb24ndCByZXBlYXQgYnkgZGVmYXVsdFxucG9pbnRlckV2ZW50cy5kZWZhdWx0cy5ob2xkUmVwZWF0SW50ZXJ2YWwgPSAwO1xucG9pbnRlckV2ZW50cy50eXBlcy5wdXNoKCdob2xkcmVwZWF0Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBvbk5ldzogb25OZXcsXG4gIG9uRmlyZWQ6IG9uRmlyZWQsXG4gIGVuZEhvbGRSZXBlYXQ6IGVuZEhvbGRSZXBlYXRcbn07XG5cbn0se1wiLi4vSW50ZXJhY3Rpb25cIjo1LFwiLi9iYXNlXCI6MzB9XSwzMjpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4ndXNlIHN0cmljdCc7XG5cbnZhciBwb2ludGVyRXZlbnRzID0gcmVxdWlyZSgnLi9iYXNlJyk7XG52YXIgSW50ZXJhY3RhYmxlID0gcmVxdWlyZSgnLi4vSW50ZXJhY3RhYmxlJyk7XG52YXIgaXMgPSByZXF1aXJlKCcuLi91dGlscy9pcycpO1xudmFyIHNjb3BlID0gcmVxdWlyZSgnLi4vc2NvcGUnKTtcbnZhciBleHRlbmQgPSByZXF1aXJlKCcuLi91dGlscy9leHRlbmQnKTtcblxudmFyIF9yZXF1aXJlID0gcmVxdWlyZSgnLi4vdXRpbHMvYXJyJyksXG4gICAgbWVyZ2UgPSBfcmVxdWlyZS5tZXJnZTtcblxucG9pbnRlckV2ZW50cy5zaWduYWxzLm9uKCdjb2xsZWN0LXRhcmdldHMnLCBmdW5jdGlvbiAoX3JlZikge1xuICB2YXIgdGFyZ2V0cyA9IF9yZWYudGFyZ2V0cyxcbiAgICAgIGVsZW1lbnQgPSBfcmVmLmVsZW1lbnQsXG4gICAgICB0eXBlID0gX3JlZi50eXBlLFxuICAgICAgZXZlbnRUYXJnZXQgPSBfcmVmLmV2ZW50VGFyZ2V0O1xuXG4gIHNjb3BlLmludGVyYWN0YWJsZXMuZm9yRWFjaE1hdGNoKGVsZW1lbnQsIGZ1bmN0aW9uIChpbnRlcmFjdGFibGUpIHtcbiAgICB2YXIgZXZlbnRhYmxlID0gaW50ZXJhY3RhYmxlLmV2ZW50cztcbiAgICB2YXIgb3B0aW9ucyA9IGV2ZW50YWJsZS5vcHRpb25zO1xuXG4gICAgaWYgKGV2ZW50YWJsZVt0eXBlXSAmJiBpcy5lbGVtZW50KGVsZW1lbnQpICYmIGludGVyYWN0YWJsZS50ZXN0SWdub3JlQWxsb3cob3B0aW9ucywgZWxlbWVudCwgZXZlbnRUYXJnZXQpKSB7XG5cbiAgICAgIHRhcmdldHMucHVzaCh7XG4gICAgICAgIGVsZW1lbnQ6IGVsZW1lbnQsXG4gICAgICAgIGV2ZW50YWJsZTogZXZlbnRhYmxlLFxuICAgICAgICBwcm9wczogeyBpbnRlcmFjdGFibGU6IGludGVyYWN0YWJsZSB9XG4gICAgICB9KTtcbiAgICB9XG4gIH0pO1xufSk7XG5cbkludGVyYWN0YWJsZS5zaWduYWxzLm9uKCduZXcnLCBmdW5jdGlvbiAoX3JlZjIpIHtcbiAgdmFyIGludGVyYWN0YWJsZSA9IF9yZWYyLmludGVyYWN0YWJsZTtcblxuICBpbnRlcmFjdGFibGUuZXZlbnRzLmdldFJlY3QgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgIHJldHVybiBpbnRlcmFjdGFibGUuZ2V0UmVjdChlbGVtZW50KTtcbiAgfTtcbn0pO1xuXG5JbnRlcmFjdGFibGUuc2lnbmFscy5vbignc2V0JywgZnVuY3Rpb24gKF9yZWYzKSB7XG4gIHZhciBpbnRlcmFjdGFibGUgPSBfcmVmMy5pbnRlcmFjdGFibGUsXG4gICAgICBvcHRpb25zID0gX3JlZjMub3B0aW9ucztcblxuICBleHRlbmQoaW50ZXJhY3RhYmxlLmV2ZW50cy5vcHRpb25zLCBwb2ludGVyRXZlbnRzLmRlZmF1bHRzKTtcbiAgZXh0ZW5kKGludGVyYWN0YWJsZS5ldmVudHMub3B0aW9ucywgb3B0aW9ucyk7XG59KTtcblxubWVyZ2UoSW50ZXJhY3RhYmxlLmV2ZW50VHlwZXMsIHBvaW50ZXJFdmVudHMudHlwZXMpO1xuXG5JbnRlcmFjdGFibGUucHJvdG90eXBlLnBvaW50ZXJFdmVudHMgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICBleHRlbmQodGhpcy5ldmVudHMub3B0aW9ucywgb3B0aW9ucyk7XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG52YXIgX19iYWNrQ29tcGF0T3B0aW9uID0gSW50ZXJhY3RhYmxlLnByb3RvdHlwZS5fYmFja0NvbXBhdE9wdGlvbjtcblxuSW50ZXJhY3RhYmxlLnByb3RvdHlwZS5fYmFja0NvbXBhdE9wdGlvbiA9IGZ1bmN0aW9uIChvcHRpb25OYW1lLCBuZXdWYWx1ZSkge1xuICB2YXIgcmV0ID0gX19iYWNrQ29tcGF0T3B0aW9uLmNhbGwodGhpcywgb3B0aW9uTmFtZSwgbmV3VmFsdWUpO1xuXG4gIGlmIChyZXQgPT09IHRoaXMpIHtcbiAgICB0aGlzLmV2ZW50cy5vcHRpb25zW29wdGlvbk5hbWVdID0gbmV3VmFsdWU7XG4gIH1cblxuICByZXR1cm4gcmV0O1xufTtcblxuSW50ZXJhY3RhYmxlLnNldHRpbmdzTWV0aG9kcy5wdXNoKCdwb2ludGVyRXZlbnRzJyk7XG5cbn0se1wiLi4vSW50ZXJhY3RhYmxlXCI6NCxcIi4uL3Njb3BlXCI6MzMsXCIuLi91dGlscy9hcnJcIjozNSxcIi4uL3V0aWxzL2V4dGVuZFwiOjQxLFwiLi4vdXRpbHMvaXNcIjo0NixcIi4vYmFzZVwiOjMwfV0sMzM6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG52YXIgZXZlbnRzID0gcmVxdWlyZSgnLi91dGlscy9ldmVudHMnKTtcbnZhciBzaWduYWxzID0gcmVxdWlyZSgnLi91dGlscy9TaWduYWxzJykubmV3KCk7XG5cbnZhciBfcmVxdWlyZSA9IHJlcXVpcmUoJy4vdXRpbHMvd2luZG93JyksXG4gICAgZ2V0V2luZG93ID0gX3JlcXVpcmUuZ2V0V2luZG93O1xuXG52YXIgc2NvcGUgPSB7XG4gIHNpZ25hbHM6IHNpZ25hbHMsXG4gIGV2ZW50czogZXZlbnRzLFxuICB1dGlsczogdXRpbHMsXG5cbiAgLy8gbWFpbiBkb2N1bWVudFxuICBkb2N1bWVudDogcmVxdWlyZSgnLi91dGlscy9kb21PYmplY3RzJykuZG9jdW1lbnQsXG4gIC8vIGFsbCBkb2N1bWVudHMgYmVpbmcgbGlzdGVuZWQgdG9cbiAgZG9jdW1lbnRzOiBbXSxcblxuICBhZGREb2N1bWVudDogZnVuY3Rpb24gYWRkRG9jdW1lbnQoZG9jLCB3aW4pIHtcbiAgICAvLyBkbyBub3RoaW5nIGlmIGRvY3VtZW50IGlzIGFscmVhZHkga25vd25cbiAgICBpZiAodXRpbHMuY29udGFpbnMoc2NvcGUuZG9jdW1lbnRzLCBkb2MpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgd2luID0gd2luIHx8IGdldFdpbmRvdyhkb2MpO1xuXG4gICAgc2NvcGUuZG9jdW1lbnRzLnB1c2goZG9jKTtcbiAgICBldmVudHMuZG9jdW1lbnRzLnB1c2goZG9jKTtcblxuICAgIC8vIGRvbid0IGFkZCBhbiB1bmxvYWQgZXZlbnQgZm9yIHRoZSBtYWluIGRvY3VtZW50XG4gICAgLy8gc28gdGhhdCB0aGUgcGFnZSBtYXkgYmUgY2FjaGVkIGluIGJyb3dzZXIgaGlzdG9yeVxuICAgIGlmIChkb2MgIT09IHNjb3BlLmRvY3VtZW50KSB7XG4gICAgICBldmVudHMuYWRkKHdpbiwgJ3VubG9hZCcsIHNjb3BlLm9uV2luZG93VW5sb2FkKTtcbiAgICB9XG5cbiAgICBzaWduYWxzLmZpcmUoJ2FkZC1kb2N1bWVudCcsIHsgZG9jOiBkb2MsIHdpbjogd2luIH0pO1xuICB9LFxuXG4gIHJlbW92ZURvY3VtZW50OiBmdW5jdGlvbiByZW1vdmVEb2N1bWVudChkb2MsIHdpbikge1xuICAgIHZhciBpbmRleCA9IHNjb3BlLmRvY3VtZW50cy5pbmRleE9mKGRvYyk7XG5cbiAgICB3aW4gPSB3aW4gfHwgZ2V0V2luZG93KGRvYyk7XG5cbiAgICBldmVudHMucmVtb3ZlKHdpbiwgJ3VubG9hZCcsIHNjb3BlLm9uV2luZG93VW5sb2FkKTtcblxuICAgIHNjb3BlLmRvY3VtZW50cy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIGV2ZW50cy5kb2N1bWVudHMuc3BsaWNlKGluZGV4LCAxKTtcblxuICAgIHNpZ25hbHMuZmlyZSgncmVtb3ZlLWRvY3VtZW50JywgeyB3aW46IHdpbiwgZG9jOiBkb2MgfSk7XG4gIH0sXG5cbiAgb25XaW5kb3dVbmxvYWQ6IGZ1bmN0aW9uIG9uV2luZG93VW5sb2FkKCkge1xuICAgIHNjb3BlLnJlbW92ZURvY3VtZW50KHRoaXMuZG9jdW1lbnQsIHRoaXMpO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHNjb3BlO1xuXG59LHtcIi4vdXRpbHNcIjo0NCxcIi4vdXRpbHMvU2lnbmFsc1wiOjM0LFwiLi91dGlscy9kb21PYmplY3RzXCI6MzgsXCIuL3V0aWxzL2V2ZW50c1wiOjQwLFwiLi91dGlscy93aW5kb3dcIjo1Mn1dLDM0OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblwidXNlIHN0cmljdFwiO1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG52YXIgU2lnbmFscyA9IGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gU2lnbmFscygpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgU2lnbmFscyk7XG5cbiAgICB0aGlzLmxpc3RlbmVycyA9IHtcbiAgICAgIC8vIHNpZ25hbE5hbWU6IFtsaXN0ZW5lcnNdLFxuICAgIH07XG4gIH1cblxuICBTaWduYWxzLnByb3RvdHlwZS5vbiA9IGZ1bmN0aW9uIG9uKG5hbWUsIGxpc3RlbmVyKSB7XG4gICAgaWYgKCF0aGlzLmxpc3RlbmVyc1tuYW1lXSkge1xuICAgICAgdGhpcy5saXN0ZW5lcnNbbmFtZV0gPSBbbGlzdGVuZXJdO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMubGlzdGVuZXJzW25hbWVdLnB1c2gobGlzdGVuZXIpO1xuICB9O1xuXG4gIFNpZ25hbHMucHJvdG90eXBlLm9mZiA9IGZ1bmN0aW9uIG9mZihuYW1lLCBsaXN0ZW5lcikge1xuICAgIGlmICghdGhpcy5saXN0ZW5lcnNbbmFtZV0pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgaW5kZXggPSB0aGlzLmxpc3RlbmVyc1tuYW1lXS5pbmRleE9mKGxpc3RlbmVyKTtcblxuICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgIHRoaXMubGlzdGVuZXJzW25hbWVdLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxuICB9O1xuXG4gIFNpZ25hbHMucHJvdG90eXBlLmZpcmUgPSBmdW5jdGlvbiBmaXJlKG5hbWUsIGFyZykge1xuICAgIHZhciB0YXJnZXRMaXN0ZW5lcnMgPSB0aGlzLmxpc3RlbmVyc1tuYW1lXTtcblxuICAgIGlmICghdGFyZ2V0TGlzdGVuZXJzKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IHRhcmdldExpc3RlbmVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfcmVmO1xuXG4gICAgICBfcmVmID0gdGFyZ2V0TGlzdGVuZXJzW19pXTtcbiAgICAgIHZhciBsaXN0ZW5lciA9IF9yZWY7XG5cbiAgICAgIGlmIChsaXN0ZW5lcihhcmcsIG5hbWUpID09PSBmYWxzZSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBTaWduYWxzO1xufSgpO1xuXG5TaWduYWxzLm5ldyA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIG5ldyBTaWduYWxzKCk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNpZ25hbHM7XG5cbn0se31dLDM1OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblwidXNlIHN0cmljdFwiO1xuXG5mdW5jdGlvbiBjb250YWlucyhhcnJheSwgdGFyZ2V0KSB7XG4gIHJldHVybiBhcnJheS5pbmRleE9mKHRhcmdldCkgIT09IC0xO1xufVxuXG5mdW5jdGlvbiBtZXJnZSh0YXJnZXQsIHNvdXJjZSkge1xuICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgc291cmNlLmxlbmd0aDsgX2krKykge1xuICAgIHZhciBfcmVmO1xuXG4gICAgX3JlZiA9IHNvdXJjZVtfaV07XG4gICAgdmFyIGl0ZW0gPSBfcmVmO1xuXG4gICAgdGFyZ2V0LnB1c2goaXRlbSk7XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgY29udGFpbnM6IGNvbnRhaW5zLFxuICBtZXJnZTogbWVyZ2Vcbn07XG5cbn0se31dLDM2OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbid1c2Ugc3RyaWN0JztcblxudmFyIF9yZXF1aXJlID0gcmVxdWlyZSgnLi93aW5kb3cnKSxcbiAgICB3aW5kb3cgPSBfcmVxdWlyZS53aW5kb3c7XG5cbnZhciBpcyA9IHJlcXVpcmUoJy4vaXMnKTtcbnZhciBkb21PYmplY3RzID0gcmVxdWlyZSgnLi9kb21PYmplY3RzJyk7XG5cbnZhciBFbGVtZW50ID0gZG9tT2JqZWN0cy5FbGVtZW50O1xudmFyIG5hdmlnYXRvciA9IHdpbmRvdy5uYXZpZ2F0b3I7XG5cbnZhciBicm93c2VyID0ge1xuICAvLyBEb2VzIHRoZSBicm93c2VyIHN1cHBvcnQgdG91Y2ggaW5wdXQ/XG4gIHN1cHBvcnRzVG91Y2g6ICEhKCdvbnRvdWNoc3RhcnQnIGluIHdpbmRvdyB8fCBpcy5mdW5jdGlvbih3aW5kb3cuRG9jdW1lbnRUb3VjaCkgJiYgZG9tT2JqZWN0cy5kb2N1bWVudCBpbnN0YW5jZW9mIHdpbmRvdy5Eb2N1bWVudFRvdWNoKSxcblxuICAvLyBEb2VzIHRoZSBicm93c2VyIHN1cHBvcnQgUG9pbnRlckV2ZW50c1xuICBzdXBwb3J0c1BvaW50ZXJFdmVudDogISFkb21PYmplY3RzLlBvaW50ZXJFdmVudCxcblxuICBpc0lPUzogL2lQKGhvbmV8b2R8YWQpLy50ZXN0KG5hdmlnYXRvci5wbGF0Zm9ybSksXG5cbiAgLy8gc2Nyb2xsaW5nIGRvZXNuJ3QgY2hhbmdlIHRoZSByZXN1bHQgb2YgZ2V0Q2xpZW50UmVjdHMgb24gaU9TIDdcbiAgaXNJT1M3OiAvaVAoaG9uZXxvZHxhZCkvLnRlc3QobmF2aWdhdG9yLnBsYXRmb3JtKSAmJiAvT1MgN1teXFxkXS8udGVzdChuYXZpZ2F0b3IuYXBwVmVyc2lvbiksXG5cbiAgaXNJZTk6IC9NU0lFIDkvLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCksXG5cbiAgLy8gcHJlZml4IG1hdGNoZXNTZWxlY3RvclxuICBwcmVmaXhlZE1hdGNoZXNTZWxlY3RvcjogJ21hdGNoZXMnIGluIEVsZW1lbnQucHJvdG90eXBlID8gJ21hdGNoZXMnIDogJ3dlYmtpdE1hdGNoZXNTZWxlY3RvcicgaW4gRWxlbWVudC5wcm90b3R5cGUgPyAnd2Via2l0TWF0Y2hlc1NlbGVjdG9yJyA6ICdtb3pNYXRjaGVzU2VsZWN0b3InIGluIEVsZW1lbnQucHJvdG90eXBlID8gJ21vek1hdGNoZXNTZWxlY3RvcicgOiAnb01hdGNoZXNTZWxlY3RvcicgaW4gRWxlbWVudC5wcm90b3R5cGUgPyAnb01hdGNoZXNTZWxlY3RvcicgOiAnbXNNYXRjaGVzU2VsZWN0b3InLFxuXG4gIHBFdmVudFR5cGVzOiBkb21PYmplY3RzLlBvaW50ZXJFdmVudCA/IGRvbU9iamVjdHMuUG9pbnRlckV2ZW50ID09PSB3aW5kb3cuTVNQb2ludGVyRXZlbnQgPyB7XG4gICAgdXA6ICdNU1BvaW50ZXJVcCcsXG4gICAgZG93bjogJ01TUG9pbnRlckRvd24nLFxuICAgIG92ZXI6ICdtb3VzZW92ZXInLFxuICAgIG91dDogJ21vdXNlb3V0JyxcbiAgICBtb3ZlOiAnTVNQb2ludGVyTW92ZScsXG4gICAgY2FuY2VsOiAnTVNQb2ludGVyQ2FuY2VsJ1xuICB9IDoge1xuICAgIHVwOiAncG9pbnRlcnVwJyxcbiAgICBkb3duOiAncG9pbnRlcmRvd24nLFxuICAgIG92ZXI6ICdwb2ludGVyb3ZlcicsXG4gICAgb3V0OiAncG9pbnRlcm91dCcsXG4gICAgbW92ZTogJ3BvaW50ZXJtb3ZlJyxcbiAgICBjYW5jZWw6ICdwb2ludGVyY2FuY2VsJ1xuICB9IDogbnVsbCxcblxuICAvLyBiZWNhdXNlIFdlYmtpdCBhbmQgT3BlcmEgc3RpbGwgdXNlICdtb3VzZXdoZWVsJyBldmVudCB0eXBlXG4gIHdoZWVsRXZlbnQ6ICdvbm1vdXNld2hlZWwnIGluIGRvbU9iamVjdHMuZG9jdW1lbnQgPyAnbW91c2V3aGVlbCcgOiAnd2hlZWwnXG5cbn07XG5cbi8vIE9wZXJhIE1vYmlsZSBtdXN0IGJlIGhhbmRsZWQgZGlmZmVyZW50bHlcbmJyb3dzZXIuaXNPcGVyYU1vYmlsZSA9IG5hdmlnYXRvci5hcHBOYW1lID09PSAnT3BlcmEnICYmIGJyb3dzZXIuc3VwcG9ydHNUb3VjaCAmJiBuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKCdQcmVzdG8nKTtcblxubW9kdWxlLmV4cG9ydHMgPSBicm93c2VyO1xuXG59LHtcIi4vZG9tT2JqZWN0c1wiOjM4LFwiLi9pc1wiOjQ2LFwiLi93aW5kb3dcIjo1Mn1dLDM3OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbid1c2Ugc3RyaWN0JztcblxudmFyIGlzID0gcmVxdWlyZSgnLi9pcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNsb25lKHNvdXJjZSkge1xuICB2YXIgZGVzdCA9IHt9O1xuICBmb3IgKHZhciBwcm9wIGluIHNvdXJjZSkge1xuICAgIGlmIChpcy5wbGFpbk9iamVjdChzb3VyY2VbcHJvcF0pKSB7XG4gICAgICBkZXN0W3Byb3BdID0gY2xvbmUoc291cmNlW3Byb3BdKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGVzdFtwcm9wXSA9IHNvdXJjZVtwcm9wXTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGRlc3Q7XG59O1xuXG59LHtcIi4vaXNcIjo0Nn1dLDM4OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbid1c2Ugc3RyaWN0JztcblxudmFyIGRvbU9iamVjdHMgPSB7fTtcbnZhciB3aW4gPSByZXF1aXJlKCcuL3dpbmRvdycpLndpbmRvdztcblxuZnVuY3Rpb24gYmxhbmsoKSB7fVxuXG5kb21PYmplY3RzLmRvY3VtZW50ID0gd2luLmRvY3VtZW50O1xuZG9tT2JqZWN0cy5Eb2N1bWVudEZyYWdtZW50ID0gd2luLkRvY3VtZW50RnJhZ21lbnQgfHwgYmxhbms7XG5kb21PYmplY3RzLlNWR0VsZW1lbnQgPSB3aW4uU1ZHRWxlbWVudCB8fCBibGFuaztcbmRvbU9iamVjdHMuU1ZHU1ZHRWxlbWVudCA9IHdpbi5TVkdTVkdFbGVtZW50IHx8IGJsYW5rO1xuZG9tT2JqZWN0cy5TVkdFbGVtZW50SW5zdGFuY2UgPSB3aW4uU1ZHRWxlbWVudEluc3RhbmNlIHx8IGJsYW5rO1xuZG9tT2JqZWN0cy5FbGVtZW50ID0gd2luLkVsZW1lbnQgfHwgYmxhbms7XG5kb21PYmplY3RzLkhUTUxFbGVtZW50ID0gd2luLkhUTUxFbGVtZW50IHx8IGRvbU9iamVjdHMuRWxlbWVudDtcblxuZG9tT2JqZWN0cy5FdmVudCA9IHdpbi5FdmVudDtcbmRvbU9iamVjdHMuVG91Y2ggPSB3aW4uVG91Y2ggfHwgYmxhbms7XG5kb21PYmplY3RzLlBvaW50ZXJFdmVudCA9IHdpbi5Qb2ludGVyRXZlbnQgfHwgd2luLk1TUG9pbnRlckV2ZW50O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGRvbU9iamVjdHM7XG5cbn0se1wiLi93aW5kb3dcIjo1Mn1dLDM5OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbid1c2Ugc3RyaWN0JztcblxudmFyIHdpbiA9IHJlcXVpcmUoJy4vd2luZG93Jyk7XG52YXIgYnJvd3NlciA9IHJlcXVpcmUoJy4vYnJvd3NlcicpO1xudmFyIGlzID0gcmVxdWlyZSgnLi9pcycpO1xudmFyIGRvbU9iamVjdHMgPSByZXF1aXJlKCcuL2RvbU9iamVjdHMnKTtcblxudmFyIGRvbVV0aWxzID0ge1xuICBub2RlQ29udGFpbnM6IGZ1bmN0aW9uIG5vZGVDb250YWlucyhwYXJlbnQsIGNoaWxkKSB7XG4gICAgd2hpbGUgKGNoaWxkKSB7XG4gICAgICBpZiAoY2hpbGQgPT09IHBhcmVudCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgY2hpbGQgPSBjaGlsZC5wYXJlbnROb2RlO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfSxcblxuICBjbG9zZXN0OiBmdW5jdGlvbiBjbG9zZXN0KGVsZW1lbnQsIHNlbGVjdG9yKSB7XG4gICAgd2hpbGUgKGlzLmVsZW1lbnQoZWxlbWVudCkpIHtcbiAgICAgIGlmIChkb21VdGlscy5tYXRjaGVzU2VsZWN0b3IoZWxlbWVudCwgc2VsZWN0b3IpKSB7XG4gICAgICAgIHJldHVybiBlbGVtZW50O1xuICAgICAgfVxuXG4gICAgICBlbGVtZW50ID0gZG9tVXRpbHMucGFyZW50Tm9kZShlbGVtZW50KTtcbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfSxcblxuICBwYXJlbnROb2RlOiBmdW5jdGlvbiBwYXJlbnROb2RlKG5vZGUpIHtcbiAgICB2YXIgcGFyZW50ID0gbm9kZS5wYXJlbnROb2RlO1xuXG4gICAgaWYgKGlzLmRvY0ZyYWcocGFyZW50KSkge1xuICAgICAgLy8gc2tpcCBwYXN0ICNzaGFkby1yb290IGZyYWdtZW50c1xuICAgICAgd2hpbGUgKChwYXJlbnQgPSBwYXJlbnQuaG9zdCkgJiYgaXMuZG9jRnJhZyhwYXJlbnQpKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcGFyZW50O1xuICAgIH1cblxuICAgIHJldHVybiBwYXJlbnQ7XG4gIH0sXG5cbiAgbWF0Y2hlc1NlbGVjdG9yOiBmdW5jdGlvbiBtYXRjaGVzU2VsZWN0b3IoZWxlbWVudCwgc2VsZWN0b3IpIHtcbiAgICAvLyByZW1vdmUgL2RlZXAvIGZyb20gc2VsZWN0b3JzIGlmIHNoYWRvd0RPTSBwb2x5ZmlsbCBpcyB1c2VkXG4gICAgaWYgKHdpbi53aW5kb3cgIT09IHdpbi5yZWFsV2luZG93KSB7XG4gICAgICBzZWxlY3RvciA9IHNlbGVjdG9yLnJlcGxhY2UoL1xcL2RlZXBcXC8vZywgJyAnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZWxlbWVudFticm93c2VyLnByZWZpeGVkTWF0Y2hlc1NlbGVjdG9yXShzZWxlY3Rvcik7XG4gIH0sXG5cbiAgLy8gVGVzdCBmb3IgdGhlIGVsZW1lbnQgdGhhdCdzIFwiYWJvdmVcIiBhbGwgb3RoZXIgcXVhbGlmaWVyc1xuICBpbmRleE9mRGVlcGVzdEVsZW1lbnQ6IGZ1bmN0aW9uIGluZGV4T2ZEZWVwZXN0RWxlbWVudChlbGVtZW50cykge1xuICAgIHZhciBkZWVwZXN0Wm9uZVBhcmVudHMgPSBbXTtcbiAgICB2YXIgZHJvcHpvbmVQYXJlbnRzID0gW107XG4gICAgdmFyIGRyb3B6b25lID0gdm9pZCAwO1xuICAgIHZhciBkZWVwZXN0Wm9uZSA9IGVsZW1lbnRzWzBdO1xuICAgIHZhciBpbmRleCA9IGRlZXBlc3Rab25lID8gMCA6IC0xO1xuICAgIHZhciBwYXJlbnQgPSB2b2lkIDA7XG4gICAgdmFyIGNoaWxkID0gdm9pZCAwO1xuICAgIHZhciBpID0gdm9pZCAwO1xuICAgIHZhciBuID0gdm9pZCAwO1xuXG4gICAgZm9yIChpID0gMTsgaSA8IGVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBkcm9wem9uZSA9IGVsZW1lbnRzW2ldO1xuXG4gICAgICAvLyBhbiBlbGVtZW50IG1pZ2h0IGJlbG9uZyB0byBtdWx0aXBsZSBzZWxlY3RvciBkcm9wem9uZXNcbiAgICAgIGlmICghZHJvcHpvbmUgfHwgZHJvcHpvbmUgPT09IGRlZXBlc3Rab25lKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWRlZXBlc3Rab25lKSB7XG4gICAgICAgIGRlZXBlc3Rab25lID0gZHJvcHpvbmU7XG4gICAgICAgIGluZGV4ID0gaTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIC8vIGNoZWNrIGlmIHRoZSBkZWVwZXN0IG9yIGN1cnJlbnQgYXJlIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCBvciBkb2N1bWVudC5yb290RWxlbWVudFxuICAgICAgLy8gLSBpZiB0aGUgY3VycmVudCBkcm9wem9uZSBpcywgZG8gbm90aGluZyBhbmQgY29udGludWVcbiAgICAgIGlmIChkcm9wem9uZS5wYXJlbnROb2RlID09PSBkcm9wem9uZS5vd25lckRvY3VtZW50KSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgLy8gLSBpZiBkZWVwZXN0IGlzLCB1cGRhdGUgd2l0aCB0aGUgY3VycmVudCBkcm9wem9uZSBhbmQgY29udGludWUgdG8gbmV4dFxuICAgICAgZWxzZSBpZiAoZGVlcGVzdFpvbmUucGFyZW50Tm9kZSA9PT0gZHJvcHpvbmUub3duZXJEb2N1bWVudCkge1xuICAgICAgICAgIGRlZXBlc3Rab25lID0gZHJvcHpvbmU7XG4gICAgICAgICAgaW5kZXggPSBpO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgIGlmICghZGVlcGVzdFpvbmVQYXJlbnRzLmxlbmd0aCkge1xuICAgICAgICBwYXJlbnQgPSBkZWVwZXN0Wm9uZTtcbiAgICAgICAgd2hpbGUgKHBhcmVudC5wYXJlbnROb2RlICYmIHBhcmVudC5wYXJlbnROb2RlICE9PSBwYXJlbnQub3duZXJEb2N1bWVudCkge1xuICAgICAgICAgIGRlZXBlc3Rab25lUGFyZW50cy51bnNoaWZ0KHBhcmVudCk7XG4gICAgICAgICAgcGFyZW50ID0gcGFyZW50LnBhcmVudE5vZGU7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gaWYgdGhpcyBlbGVtZW50IGlzIGFuIHN2ZyBlbGVtZW50IGFuZCB0aGUgY3VycmVudCBkZWVwZXN0IGlzXG4gICAgICAvLyBhbiBIVE1MRWxlbWVudFxuICAgICAgaWYgKGRlZXBlc3Rab25lIGluc3RhbmNlb2YgZG9tT2JqZWN0cy5IVE1MRWxlbWVudCAmJiBkcm9wem9uZSBpbnN0YW5jZW9mIGRvbU9iamVjdHMuU1ZHRWxlbWVudCAmJiAhKGRyb3B6b25lIGluc3RhbmNlb2YgZG9tT2JqZWN0cy5TVkdTVkdFbGVtZW50KSkge1xuXG4gICAgICAgIGlmIChkcm9wem9uZSA9PT0gZGVlcGVzdFpvbmUucGFyZW50Tm9kZSkge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgcGFyZW50ID0gZHJvcHpvbmUub3duZXJTVkdFbGVtZW50O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGFyZW50ID0gZHJvcHpvbmU7XG4gICAgICB9XG5cbiAgICAgIGRyb3B6b25lUGFyZW50cyA9IFtdO1xuXG4gICAgICB3aGlsZSAocGFyZW50LnBhcmVudE5vZGUgIT09IHBhcmVudC5vd25lckRvY3VtZW50KSB7XG4gICAgICAgIGRyb3B6b25lUGFyZW50cy51bnNoaWZ0KHBhcmVudCk7XG4gICAgICAgIHBhcmVudCA9IHBhcmVudC5wYXJlbnROb2RlO1xuICAgICAgfVxuXG4gICAgICBuID0gMDtcblxuICAgICAgLy8gZ2V0IChwb3NpdGlvbiBvZiBsYXN0IGNvbW1vbiBhbmNlc3RvcikgKyAxXG4gICAgICB3aGlsZSAoZHJvcHpvbmVQYXJlbnRzW25dICYmIGRyb3B6b25lUGFyZW50c1tuXSA9PT0gZGVlcGVzdFpvbmVQYXJlbnRzW25dKSB7XG4gICAgICAgIG4rKztcbiAgICAgIH1cblxuICAgICAgdmFyIHBhcmVudHMgPSBbZHJvcHpvbmVQYXJlbnRzW24gLSAxXSwgZHJvcHpvbmVQYXJlbnRzW25dLCBkZWVwZXN0Wm9uZVBhcmVudHNbbl1dO1xuXG4gICAgICBjaGlsZCA9IHBhcmVudHNbMF0ubGFzdENoaWxkO1xuXG4gICAgICB3aGlsZSAoY2hpbGQpIHtcbiAgICAgICAgaWYgKGNoaWxkID09PSBwYXJlbnRzWzFdKSB7XG4gICAgICAgICAgZGVlcGVzdFpvbmUgPSBkcm9wem9uZTtcbiAgICAgICAgICBpbmRleCA9IGk7XG4gICAgICAgICAgZGVlcGVzdFpvbmVQYXJlbnRzID0gW107XG5cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfSBlbHNlIGlmIChjaGlsZCA9PT0gcGFyZW50c1syXSkge1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgY2hpbGQgPSBjaGlsZC5wcmV2aW91c1NpYmxpbmc7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGluZGV4O1xuICB9LFxuXG4gIG1hdGNoZXNVcFRvOiBmdW5jdGlvbiBtYXRjaGVzVXBUbyhlbGVtZW50LCBzZWxlY3RvciwgbGltaXQpIHtcbiAgICB3aGlsZSAoaXMuZWxlbWVudChlbGVtZW50KSkge1xuICAgICAgaWYgKGRvbVV0aWxzLm1hdGNoZXNTZWxlY3RvcihlbGVtZW50LCBzZWxlY3RvcikpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG5cbiAgICAgIGVsZW1lbnQgPSBkb21VdGlscy5wYXJlbnROb2RlKGVsZW1lbnQpO1xuXG4gICAgICBpZiAoZWxlbWVudCA9PT0gbGltaXQpIHtcbiAgICAgICAgcmV0dXJuIGRvbVV0aWxzLm1hdGNoZXNTZWxlY3RvcihlbGVtZW50LCBzZWxlY3Rvcik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9LFxuXG4gIGdldEFjdHVhbEVsZW1lbnQ6IGZ1bmN0aW9uIGdldEFjdHVhbEVsZW1lbnQoZWxlbWVudCkge1xuICAgIHJldHVybiBlbGVtZW50IGluc3RhbmNlb2YgZG9tT2JqZWN0cy5TVkdFbGVtZW50SW5zdGFuY2UgPyBlbGVtZW50LmNvcnJlc3BvbmRpbmdVc2VFbGVtZW50IDogZWxlbWVudDtcbiAgfSxcblxuICBnZXRTY3JvbGxYWTogZnVuY3Rpb24gZ2V0U2Nyb2xsWFkocmVsZXZhbnRXaW5kb3cpIHtcbiAgICByZWxldmFudFdpbmRvdyA9IHJlbGV2YW50V2luZG93IHx8IHdpbi53aW5kb3c7XG4gICAgcmV0dXJuIHtcbiAgICAgIHg6IHJlbGV2YW50V2luZG93LnNjcm9sbFggfHwgcmVsZXZhbnRXaW5kb3cuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbExlZnQsXG4gICAgICB5OiByZWxldmFudFdpbmRvdy5zY3JvbGxZIHx8IHJlbGV2YW50V2luZG93LmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3BcbiAgICB9O1xuICB9LFxuXG4gIGdldEVsZW1lbnRDbGllbnRSZWN0OiBmdW5jdGlvbiBnZXRFbGVtZW50Q2xpZW50UmVjdChlbGVtZW50KSB7XG4gICAgdmFyIGNsaWVudFJlY3QgPSBlbGVtZW50IGluc3RhbmNlb2YgZG9tT2JqZWN0cy5TVkdFbGVtZW50ID8gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSA6IGVsZW1lbnQuZ2V0Q2xpZW50UmVjdHMoKVswXTtcblxuICAgIHJldHVybiBjbGllbnRSZWN0ICYmIHtcbiAgICAgIGxlZnQ6IGNsaWVudFJlY3QubGVmdCxcbiAgICAgIHJpZ2h0OiBjbGllbnRSZWN0LnJpZ2h0LFxuICAgICAgdG9wOiBjbGllbnRSZWN0LnRvcCxcbiAgICAgIGJvdHRvbTogY2xpZW50UmVjdC5ib3R0b20sXG4gICAgICB3aWR0aDogY2xpZW50UmVjdC53aWR0aCB8fCBjbGllbnRSZWN0LnJpZ2h0IC0gY2xpZW50UmVjdC5sZWZ0LFxuICAgICAgaGVpZ2h0OiBjbGllbnRSZWN0LmhlaWdodCB8fCBjbGllbnRSZWN0LmJvdHRvbSAtIGNsaWVudFJlY3QudG9wXG4gICAgfTtcbiAgfSxcblxuICBnZXRFbGVtZW50UmVjdDogZnVuY3Rpb24gZ2V0RWxlbWVudFJlY3QoZWxlbWVudCkge1xuICAgIHZhciBjbGllbnRSZWN0ID0gZG9tVXRpbHMuZ2V0RWxlbWVudENsaWVudFJlY3QoZWxlbWVudCk7XG5cbiAgICBpZiAoIWJyb3dzZXIuaXNJT1M3ICYmIGNsaWVudFJlY3QpIHtcbiAgICAgIHZhciBzY3JvbGwgPSBkb21VdGlscy5nZXRTY3JvbGxYWSh3aW4uZ2V0V2luZG93KGVsZW1lbnQpKTtcblxuICAgICAgY2xpZW50UmVjdC5sZWZ0ICs9IHNjcm9sbC54O1xuICAgICAgY2xpZW50UmVjdC5yaWdodCArPSBzY3JvbGwueDtcbiAgICAgIGNsaWVudFJlY3QudG9wICs9IHNjcm9sbC55O1xuICAgICAgY2xpZW50UmVjdC5ib3R0b20gKz0gc2Nyb2xsLnk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNsaWVudFJlY3Q7XG4gIH0sXG5cbiAgZ2V0UGF0aDogZnVuY3Rpb24gZ2V0UGF0aChlbGVtZW50KSB7XG4gICAgdmFyIHBhdGggPSBbXTtcblxuICAgIHdoaWxlIChlbGVtZW50KSB7XG4gICAgICBwYXRoLnB1c2goZWxlbWVudCk7XG4gICAgICBlbGVtZW50ID0gZG9tVXRpbHMucGFyZW50Tm9kZShlbGVtZW50KTtcbiAgICB9XG5cbiAgICByZXR1cm4gcGF0aDtcbiAgfSxcblxuICB0cnlTZWxlY3RvcjogZnVuY3Rpb24gdHJ5U2VsZWN0b3IodmFsdWUpIHtcbiAgICBpZiAoIWlzLnN0cmluZyh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyBhbiBleGNlcHRpb24gd2lsbCBiZSByYWlzZWQgaWYgaXQgaXMgaW52YWxpZFxuICAgIGRvbU9iamVjdHMuZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih2YWx1ZSk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZG9tVXRpbHM7XG5cbn0se1wiLi9icm93c2VyXCI6MzYsXCIuL2RvbU9iamVjdHNcIjozOCxcIi4vaXNcIjo0NixcIi4vd2luZG93XCI6NTJ9XSw0MDpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4ndXNlIHN0cmljdCc7XG5cbnZhciBpcyA9IHJlcXVpcmUoJy4vaXMnKTtcbnZhciBkb21VdGlscyA9IHJlcXVpcmUoJy4vZG9tVXRpbHMnKTtcbnZhciBwb2ludGVyVXRpbHMgPSByZXF1aXJlKCcuL3BvaW50ZXJVdGlscycpO1xudmFyIHBFeHRlbmQgPSByZXF1aXJlKCcuL3BvaW50ZXJFeHRlbmQnKTtcblxudmFyIF9yZXF1aXJlID0gcmVxdWlyZSgnLi93aW5kb3cnKSxcbiAgICB3aW5kb3cgPSBfcmVxdWlyZS53aW5kb3c7XG5cbnZhciBfcmVxdWlyZTIgPSByZXF1aXJlKCcuL2FycicpLFxuICAgIGNvbnRhaW5zID0gX3JlcXVpcmUyLmNvbnRhaW5zO1xuXG52YXIgZWxlbWVudHMgPSBbXTtcbnZhciB0YXJnZXRzID0gW107XG5cbi8vIHtcbi8vICAgdHlwZToge1xuLy8gICAgIHNlbGVjdG9yczogWydzZWxlY3RvcicsIC4uLl0sXG4vLyAgICAgY29udGV4dHMgOiBbZG9jdW1lbnQsIC4uLl0sXG4vLyAgICAgbGlzdGVuZXJzOiBbW2xpc3RlbmVyLCBjYXB0dXJlLCBwYXNzaXZlXSwgLi4uXVxuLy8gICB9XG4vLyAgfVxudmFyIGRlbGVnYXRlZEV2ZW50cyA9IHt9O1xudmFyIGRvY3VtZW50cyA9IFtdO1xuXG52YXIgc3VwcG9ydHNPcHRpb25zID0gZnVuY3Rpb24gKCkge1xuICB2YXIgc3VwcG9ydGVkID0gZmFsc2U7XG5cbiAgd2luZG93LmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLmFkZEV2ZW50TGlzdGVuZXIoJ3Rlc3QnLCBudWxsLCB7XG4gICAgZ2V0IGNhcHR1cmUoKSB7XG4gICAgICBzdXBwb3J0ZWQgPSB0cnVlO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIHN1cHBvcnRlZDtcbn0oKTtcblxuZnVuY3Rpb24gYWRkKGVsZW1lbnQsIHR5cGUsIGxpc3RlbmVyLCBvcHRpb25hbEFyZykge1xuICB2YXIgb3B0aW9ucyA9IGdldE9wdGlvbnMob3B0aW9uYWxBcmcpO1xuICB2YXIgZWxlbWVudEluZGV4ID0gZWxlbWVudHMuaW5kZXhPZihlbGVtZW50KTtcbiAgdmFyIHRhcmdldCA9IHRhcmdldHNbZWxlbWVudEluZGV4XTtcblxuICBpZiAoIXRhcmdldCkge1xuICAgIHRhcmdldCA9IHtcbiAgICAgIGV2ZW50czoge30sXG4gICAgICB0eXBlQ291bnQ6IDBcbiAgICB9O1xuXG4gICAgZWxlbWVudEluZGV4ID0gZWxlbWVudHMucHVzaChlbGVtZW50KSAtIDE7XG4gICAgdGFyZ2V0cy5wdXNoKHRhcmdldCk7XG4gIH1cblxuICBpZiAoIXRhcmdldC5ldmVudHNbdHlwZV0pIHtcbiAgICB0YXJnZXQuZXZlbnRzW3R5cGVdID0gW107XG4gICAgdGFyZ2V0LnR5cGVDb3VudCsrO1xuICB9XG5cbiAgaWYgKCFjb250YWlucyh0YXJnZXQuZXZlbnRzW3R5cGVdLCBsaXN0ZW5lcikpIHtcbiAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgbGlzdGVuZXIsIHN1cHBvcnRzT3B0aW9ucyA/IG9wdGlvbnMgOiAhIW9wdGlvbnMuY2FwdHVyZSk7XG4gICAgdGFyZ2V0LmV2ZW50c1t0eXBlXS5wdXNoKGxpc3RlbmVyKTtcbiAgfVxufVxuXG5mdW5jdGlvbiByZW1vdmUoZWxlbWVudCwgdHlwZSwgbGlzdGVuZXIsIG9wdGlvbmFsQXJnKSB7XG4gIHZhciBvcHRpb25zID0gZ2V0T3B0aW9ucyhvcHRpb25hbEFyZyk7XG4gIHZhciBlbGVtZW50SW5kZXggPSBlbGVtZW50cy5pbmRleE9mKGVsZW1lbnQpO1xuICB2YXIgdGFyZ2V0ID0gdGFyZ2V0c1tlbGVtZW50SW5kZXhdO1xuXG4gIGlmICghdGFyZ2V0IHx8ICF0YXJnZXQuZXZlbnRzKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKHR5cGUgPT09ICdhbGwnKSB7XG4gICAgZm9yICh0eXBlIGluIHRhcmdldC5ldmVudHMpIHtcbiAgICAgIGlmICh0YXJnZXQuZXZlbnRzLmhhc093blByb3BlcnR5KHR5cGUpKSB7XG4gICAgICAgIHJlbW92ZShlbGVtZW50LCB0eXBlLCAnYWxsJyk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmICh0YXJnZXQuZXZlbnRzW3R5cGVdKSB7XG4gICAgdmFyIGxlbiA9IHRhcmdldC5ldmVudHNbdHlwZV0ubGVuZ3RoO1xuXG4gICAgaWYgKGxpc3RlbmVyID09PSAnYWxsJykge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICByZW1vdmUoZWxlbWVudCwgdHlwZSwgdGFyZ2V0LmV2ZW50c1t0eXBlXVtpXSwgb3B0aW9ucyk7XG4gICAgICB9XG4gICAgICByZXR1cm47XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsZW47IF9pKyspIHtcbiAgICAgICAgaWYgKHRhcmdldC5ldmVudHNbdHlwZV1bX2ldID09PSBsaXN0ZW5lcikge1xuICAgICAgICAgIGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignb24nICsgdHlwZSwgbGlzdGVuZXIsIHN1cHBvcnRzT3B0aW9ucyA/IG9wdGlvbnMgOiAhIW9wdGlvbnMuY2FwdHVyZSk7XG4gICAgICAgICAgdGFyZ2V0LmV2ZW50c1t0eXBlXS5zcGxpY2UoX2ksIDEpO1xuXG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGFyZ2V0LmV2ZW50c1t0eXBlXSAmJiB0YXJnZXQuZXZlbnRzW3R5cGVdLmxlbmd0aCA9PT0gMCkge1xuICAgICAgdGFyZ2V0LmV2ZW50c1t0eXBlXSA9IG51bGw7XG4gICAgICB0YXJnZXQudHlwZUNvdW50LS07XG4gICAgfVxuICB9XG5cbiAgaWYgKCF0YXJnZXQudHlwZUNvdW50KSB7XG4gICAgdGFyZ2V0cy5zcGxpY2UoZWxlbWVudEluZGV4LCAxKTtcbiAgICBlbGVtZW50cy5zcGxpY2UoZWxlbWVudEluZGV4LCAxKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBhZGREZWxlZ2F0ZShzZWxlY3RvciwgY29udGV4dCwgdHlwZSwgbGlzdGVuZXIsIG9wdGlvbmFsQXJnKSB7XG4gIHZhciBvcHRpb25zID0gZ2V0T3B0aW9ucyhvcHRpb25hbEFyZyk7XG4gIGlmICghZGVsZWdhdGVkRXZlbnRzW3R5cGVdKSB7XG4gICAgZGVsZWdhdGVkRXZlbnRzW3R5cGVdID0ge1xuICAgICAgc2VsZWN0b3JzOiBbXSxcbiAgICAgIGNvbnRleHRzOiBbXSxcbiAgICAgIGxpc3RlbmVyczogW11cbiAgICB9O1xuXG4gICAgLy8gYWRkIGRlbGVnYXRlIGxpc3RlbmVyIGZ1bmN0aW9uc1xuICAgIGZvciAodmFyIF9pMiA9IDA7IF9pMiA8IGRvY3VtZW50cy5sZW5ndGg7IF9pMisrKSB7XG4gICAgICB2YXIgZG9jID0gZG9jdW1lbnRzW19pMl07XG4gICAgICBhZGQoZG9jLCB0eXBlLCBkZWxlZ2F0ZUxpc3RlbmVyKTtcbiAgICAgIGFkZChkb2MsIHR5cGUsIGRlbGVnYXRlVXNlQ2FwdHVyZSwgdHJ1ZSk7XG4gICAgfVxuICB9XG5cbiAgdmFyIGRlbGVnYXRlZCA9IGRlbGVnYXRlZEV2ZW50c1t0eXBlXTtcbiAgdmFyIGluZGV4ID0gdm9pZCAwO1xuXG4gIGZvciAoaW5kZXggPSBkZWxlZ2F0ZWQuc2VsZWN0b3JzLmxlbmd0aCAtIDE7IGluZGV4ID49IDA7IGluZGV4LS0pIHtcbiAgICBpZiAoZGVsZWdhdGVkLnNlbGVjdG9yc1tpbmRleF0gPT09IHNlbGVjdG9yICYmIGRlbGVnYXRlZC5jb250ZXh0c1tpbmRleF0gPT09IGNvbnRleHQpIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICBpbmRleCA9IGRlbGVnYXRlZC5zZWxlY3RvcnMubGVuZ3RoO1xuXG4gICAgZGVsZWdhdGVkLnNlbGVjdG9ycy5wdXNoKHNlbGVjdG9yKTtcbiAgICBkZWxlZ2F0ZWQuY29udGV4dHMucHVzaChjb250ZXh0KTtcbiAgICBkZWxlZ2F0ZWQubGlzdGVuZXJzLnB1c2goW10pO1xuICB9XG5cbiAgLy8ga2VlcCBsaXN0ZW5lciBhbmQgY2FwdHVyZSBhbmQgcGFzc2l2ZSBmbGFnc1xuICBkZWxlZ2F0ZWQubGlzdGVuZXJzW2luZGV4XS5wdXNoKFtsaXN0ZW5lciwgISFvcHRpb25zLmNhcHR1cmUsIG9wdGlvbnMucGFzc2l2ZV0pO1xufVxuXG5mdW5jdGlvbiByZW1vdmVEZWxlZ2F0ZShzZWxlY3RvciwgY29udGV4dCwgdHlwZSwgbGlzdGVuZXIsIG9wdGlvbmFsQXJnKSB7XG4gIHZhciBvcHRpb25zID0gZ2V0T3B0aW9ucyhvcHRpb25hbEFyZyk7XG4gIHZhciBkZWxlZ2F0ZWQgPSBkZWxlZ2F0ZWRFdmVudHNbdHlwZV07XG4gIHZhciBtYXRjaEZvdW5kID0gZmFsc2U7XG4gIHZhciBpbmRleCA9IHZvaWQgMDtcblxuICBpZiAoIWRlbGVnYXRlZCkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIGNvdW50IGZyb20gbGFzdCBpbmRleCBvZiBkZWxlZ2F0ZWQgdG8gMFxuICBmb3IgKGluZGV4ID0gZGVsZWdhdGVkLnNlbGVjdG9ycy5sZW5ndGggLSAxOyBpbmRleCA+PSAwOyBpbmRleC0tKSB7XG4gICAgLy8gbG9vayBmb3IgbWF0Y2hpbmcgc2VsZWN0b3IgYW5kIGNvbnRleHQgTm9kZVxuICAgIGlmIChkZWxlZ2F0ZWQuc2VsZWN0b3JzW2luZGV4XSA9PT0gc2VsZWN0b3IgJiYgZGVsZWdhdGVkLmNvbnRleHRzW2luZGV4XSA9PT0gY29udGV4dCkge1xuXG4gICAgICB2YXIgbGlzdGVuZXJzID0gZGVsZWdhdGVkLmxpc3RlbmVyc1tpbmRleF07XG5cbiAgICAgIC8vIGVhY2ggaXRlbSBvZiB0aGUgbGlzdGVuZXJzIGFycmF5IGlzIGFuIGFycmF5OiBbZnVuY3Rpb24sIGNhcHR1cmUsIHBhc3NpdmVdXG4gICAgICBmb3IgKHZhciBpID0gbGlzdGVuZXJzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgIHZhciBfbGlzdGVuZXJzJGkgPSBsaXN0ZW5lcnNbaV0sXG4gICAgICAgICAgICBmbiA9IF9saXN0ZW5lcnMkaVswXSxcbiAgICAgICAgICAgIGNhcHR1cmUgPSBfbGlzdGVuZXJzJGlbMV0sXG4gICAgICAgICAgICBwYXNzaXZlID0gX2xpc3RlbmVycyRpWzJdO1xuXG4gICAgICAgIC8vIGNoZWNrIGlmIHRoZSBsaXN0ZW5lciBmdW5jdGlvbnMgYW5kIGNhcHR1cmUgYW5kIHBhc3NpdmUgZmxhZ3MgbWF0Y2hcblxuICAgICAgICBpZiAoZm4gPT09IGxpc3RlbmVyICYmIGNhcHR1cmUgPT09ICEhb3B0aW9ucy5jYXB0dXJlICYmIHBhc3NpdmUgPT09IG9wdGlvbnMucGFzc2l2ZSkge1xuICAgICAgICAgIC8vIHJlbW92ZSB0aGUgbGlzdGVuZXIgZnJvbSB0aGUgYXJyYXkgb2YgbGlzdGVuZXJzXG4gICAgICAgICAgbGlzdGVuZXJzLnNwbGljZShpLCAxKTtcblxuICAgICAgICAgIC8vIGlmIGFsbCBsaXN0ZW5lcnMgZm9yIHRoaXMgaW50ZXJhY3RhYmxlIGhhdmUgYmVlbiByZW1vdmVkXG4gICAgICAgICAgLy8gcmVtb3ZlIHRoZSBpbnRlcmFjdGFibGUgZnJvbSB0aGUgZGVsZWdhdGVkIGFycmF5c1xuICAgICAgICAgIGlmICghbGlzdGVuZXJzLmxlbmd0aCkge1xuICAgICAgICAgICAgZGVsZWdhdGVkLnNlbGVjdG9ycy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgZGVsZWdhdGVkLmNvbnRleHRzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICBkZWxlZ2F0ZWQubGlzdGVuZXJzLnNwbGljZShpbmRleCwgMSk7XG5cbiAgICAgICAgICAgIC8vIHJlbW92ZSBkZWxlZ2F0ZSBmdW5jdGlvbiBmcm9tIGNvbnRleHRcbiAgICAgICAgICAgIHJlbW92ZShjb250ZXh0LCB0eXBlLCBkZWxlZ2F0ZUxpc3RlbmVyKTtcbiAgICAgICAgICAgIHJlbW92ZShjb250ZXh0LCB0eXBlLCBkZWxlZ2F0ZVVzZUNhcHR1cmUsIHRydWUpO1xuXG4gICAgICAgICAgICAvLyByZW1vdmUgdGhlIGFycmF5cyBpZiB0aGV5IGFyZSBlbXB0eVxuICAgICAgICAgICAgaWYgKCFkZWxlZ2F0ZWQuc2VsZWN0b3JzLmxlbmd0aCkge1xuICAgICAgICAgICAgICBkZWxlZ2F0ZWRFdmVudHNbdHlwZV0gPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIG9ubHkgcmVtb3ZlIG9uZSBsaXN0ZW5lclxuICAgICAgICAgIG1hdGNoRm91bmQgPSB0cnVlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChtYXRjaEZvdW5kKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vLyBib3VuZCB0byB0aGUgaW50ZXJhY3RhYmxlIGNvbnRleHQgd2hlbiBhIERPTSBldmVudFxuLy8gbGlzdGVuZXIgaXMgYWRkZWQgdG8gYSBzZWxlY3RvciBpbnRlcmFjdGFibGVcbmZ1bmN0aW9uIGRlbGVnYXRlTGlzdGVuZXIoZXZlbnQsIG9wdGlvbmFsQXJnKSB7XG4gIHZhciBvcHRpb25zID0gZ2V0T3B0aW9ucyhvcHRpb25hbEFyZyk7XG4gIHZhciBmYWtlRXZlbnQgPSB7fTtcbiAgdmFyIGRlbGVnYXRlZCA9IGRlbGVnYXRlZEV2ZW50c1tldmVudC50eXBlXTtcblxuICB2YXIgX3BvaW50ZXJVdGlscyRnZXRFdmVuID0gcG9pbnRlclV0aWxzLmdldEV2ZW50VGFyZ2V0cyhldmVudCksXG4gICAgICBldmVudFRhcmdldCA9IF9wb2ludGVyVXRpbHMkZ2V0RXZlblswXTtcblxuICB2YXIgZWxlbWVudCA9IGV2ZW50VGFyZ2V0O1xuXG4gIC8vIGR1cGxpY2F0ZSB0aGUgZXZlbnQgc28gdGhhdCBjdXJyZW50VGFyZ2V0IGNhbiBiZSBjaGFuZ2VkXG4gIHBFeHRlbmQoZmFrZUV2ZW50LCBldmVudCk7XG5cbiAgZmFrZUV2ZW50Lm9yaWdpbmFsRXZlbnQgPSBldmVudDtcbiAgZmFrZUV2ZW50LnByZXZlbnREZWZhdWx0ID0gcHJldmVudE9yaWdpbmFsRGVmYXVsdDtcblxuICAvLyBjbGltYiB1cCBkb2N1bWVudCB0cmVlIGxvb2tpbmcgZm9yIHNlbGVjdG9yIG1hdGNoZXNcbiAgd2hpbGUgKGlzLmVsZW1lbnQoZWxlbWVudCkpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRlbGVnYXRlZC5zZWxlY3RvcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBzZWxlY3RvciA9IGRlbGVnYXRlZC5zZWxlY3RvcnNbaV07XG4gICAgICB2YXIgY29udGV4dCA9IGRlbGVnYXRlZC5jb250ZXh0c1tpXTtcblxuICAgICAgaWYgKGRvbVV0aWxzLm1hdGNoZXNTZWxlY3RvcihlbGVtZW50LCBzZWxlY3RvcikgJiYgZG9tVXRpbHMubm9kZUNvbnRhaW5zKGNvbnRleHQsIGV2ZW50VGFyZ2V0KSAmJiBkb21VdGlscy5ub2RlQ29udGFpbnMoY29udGV4dCwgZWxlbWVudCkpIHtcblxuICAgICAgICB2YXIgbGlzdGVuZXJzID0gZGVsZWdhdGVkLmxpc3RlbmVyc1tpXTtcblxuICAgICAgICBmYWtlRXZlbnQuY3VycmVudFRhcmdldCA9IGVsZW1lbnQ7XG5cbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBsaXN0ZW5lcnMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICB2YXIgX2xpc3RlbmVycyRqID0gbGlzdGVuZXJzW2pdLFxuICAgICAgICAgICAgICBmbiA9IF9saXN0ZW5lcnMkalswXSxcbiAgICAgICAgICAgICAgY2FwdHVyZSA9IF9saXN0ZW5lcnMkalsxXSxcbiAgICAgICAgICAgICAgcGFzc2l2ZSA9IF9saXN0ZW5lcnMkalsyXTtcblxuXG4gICAgICAgICAgaWYgKGNhcHR1cmUgPT09ICEhb3B0aW9ucy5jYXB0dXJlICYmIHBhc3NpdmUgPT09IG9wdGlvbnMucGFzc2l2ZSkge1xuICAgICAgICAgICAgZm4oZmFrZUV2ZW50KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBlbGVtZW50ID0gZG9tVXRpbHMucGFyZW50Tm9kZShlbGVtZW50KTtcbiAgfVxufVxuXG5mdW5jdGlvbiBkZWxlZ2F0ZVVzZUNhcHR1cmUoZXZlbnQpIHtcbiAgcmV0dXJuIGRlbGVnYXRlTGlzdGVuZXIuY2FsbCh0aGlzLCBldmVudCwgdHJ1ZSk7XG59XG5cbmZ1bmN0aW9uIHByZXZlbnRPcmlnaW5hbERlZmF1bHQoKSB7XG4gIHRoaXMub3JpZ2luYWxFdmVudC5wcmV2ZW50RGVmYXVsdCgpO1xufVxuXG5mdW5jdGlvbiBnZXRPcHRpb25zKHBhcmFtKSB7XG4gIHJldHVybiBpcy5vYmplY3QocGFyYW0pID8gcGFyYW0gOiB7IGNhcHR1cmU6IHBhcmFtIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBhZGQ6IGFkZCxcbiAgcmVtb3ZlOiByZW1vdmUsXG5cbiAgYWRkRGVsZWdhdGU6IGFkZERlbGVnYXRlLFxuICByZW1vdmVEZWxlZ2F0ZTogcmVtb3ZlRGVsZWdhdGUsXG5cbiAgZGVsZWdhdGVMaXN0ZW5lcjogZGVsZWdhdGVMaXN0ZW5lcixcbiAgZGVsZWdhdGVVc2VDYXB0dXJlOiBkZWxlZ2F0ZVVzZUNhcHR1cmUsXG4gIGRlbGVnYXRlZEV2ZW50czogZGVsZWdhdGVkRXZlbnRzLFxuICBkb2N1bWVudHM6IGRvY3VtZW50cyxcblxuICBzdXBwb3J0c09wdGlvbnM6IHN1cHBvcnRzT3B0aW9ucyxcblxuICBfZWxlbWVudHM6IGVsZW1lbnRzLFxuICBfdGFyZ2V0czogdGFyZ2V0c1xufTtcblxufSx7XCIuL2FyclwiOjM1LFwiLi9kb21VdGlsc1wiOjM5LFwiLi9pc1wiOjQ2LFwiLi9wb2ludGVyRXh0ZW5kXCI6NDgsXCIuL3BvaW50ZXJVdGlsc1wiOjQ5LFwiLi93aW5kb3dcIjo1Mn1dLDQxOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGV4dGVuZChkZXN0LCBzb3VyY2UpIHtcbiAgZm9yICh2YXIgcHJvcCBpbiBzb3VyY2UpIHtcbiAgICBkZXN0W3Byb3BdID0gc291cmNlW3Byb3BdO1xuICB9XG4gIHJldHVybiBkZXN0O1xufTtcblxufSx7fV0sNDI6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgX3JlcXVpcmUgPSByZXF1aXJlKCcuL3JlY3QnKSxcbiAgICByZXNvbHZlUmVjdExpa2UgPSBfcmVxdWlyZS5yZXNvbHZlUmVjdExpa2UsXG4gICAgcmVjdFRvWFkgPSBfcmVxdWlyZS5yZWN0VG9YWTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodGFyZ2V0LCBlbGVtZW50LCBhY3Rpb24pIHtcbiAgdmFyIGFjdGlvbk9wdGlvbnMgPSB0YXJnZXQub3B0aW9uc1thY3Rpb25dO1xuICB2YXIgYWN0aW9uT3JpZ2luID0gYWN0aW9uT3B0aW9ucyAmJiBhY3Rpb25PcHRpb25zLm9yaWdpbjtcbiAgdmFyIG9yaWdpbiA9IGFjdGlvbk9yaWdpbiB8fCB0YXJnZXQub3B0aW9ucy5vcmlnaW47XG5cbiAgdmFyIG9yaWdpblJlY3QgPSByZXNvbHZlUmVjdExpa2Uob3JpZ2luLCB0YXJnZXQsIGVsZW1lbnQsIFt0YXJnZXQgJiYgZWxlbWVudF0pO1xuXG4gIHJldHVybiByZWN0VG9YWShvcmlnaW5SZWN0KSB8fCB7IHg6IDAsIHk6IDAgfTtcbn07XG5cbn0se1wiLi9yZWN0XCI6NTF9XSw0MzpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoeCwgeSkge1xuICByZXR1cm4gTWF0aC5zcXJ0KHggKiB4ICsgeSAqIHkpO1xufTtcblxufSx7fV0sNDQ6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgZXh0ZW5kID0gcmVxdWlyZSgnLi9leHRlbmQnKTtcbnZhciB3aW4gPSByZXF1aXJlKCcuL3dpbmRvdycpO1xuXG52YXIgdXRpbHMgPSB7XG4gIHdhcm5PbmNlOiBmdW5jdGlvbiB3YXJuT25jZShtZXRob2QsIG1lc3NhZ2UpIHtcbiAgICB2YXIgd2FybmVkID0gZmFsc2U7XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKCF3YXJuZWQpIHtcbiAgICAgICAgd2luLndpbmRvdy5jb25zb2xlLndhcm4obWVzc2FnZSk7XG4gICAgICAgIHdhcm5lZCA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBtZXRob2QuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9O1xuICB9LFxuXG4gIC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzU2MzQ1MjgvMjI4MDg4OFxuICBfZ2V0UUJlemllclZhbHVlOiBmdW5jdGlvbiBfZ2V0UUJlemllclZhbHVlKHQsIHAxLCBwMiwgcDMpIHtcbiAgICB2YXIgaVQgPSAxIC0gdDtcbiAgICByZXR1cm4gaVQgKiBpVCAqIHAxICsgMiAqIGlUICogdCAqIHAyICsgdCAqIHQgKiBwMztcbiAgfSxcblxuICBnZXRRdWFkcmF0aWNDdXJ2ZVBvaW50OiBmdW5jdGlvbiBnZXRRdWFkcmF0aWNDdXJ2ZVBvaW50KHN0YXJ0WCwgc3RhcnRZLCBjcFgsIGNwWSwgZW5kWCwgZW5kWSwgcG9zaXRpb24pIHtcbiAgICByZXR1cm4ge1xuICAgICAgeDogdXRpbHMuX2dldFFCZXppZXJWYWx1ZShwb3NpdGlvbiwgc3RhcnRYLCBjcFgsIGVuZFgpLFxuICAgICAgeTogdXRpbHMuX2dldFFCZXppZXJWYWx1ZShwb3NpdGlvbiwgc3RhcnRZLCBjcFksIGVuZFkpXG4gICAgfTtcbiAgfSxcblxuICAvLyBodHRwOi8vZ2l6bWEuY29tL2Vhc2luZy9cbiAgZWFzZU91dFF1YWQ6IGZ1bmN0aW9uIGVhc2VPdXRRdWFkKHQsIGIsIGMsIGQpIHtcbiAgICB0IC89IGQ7XG4gICAgcmV0dXJuIC1jICogdCAqICh0IC0gMikgKyBiO1xuICB9LFxuXG4gIGNvcHlBY3Rpb246IGZ1bmN0aW9uIGNvcHlBY3Rpb24oZGVzdCwgc3JjKSB7XG4gICAgZGVzdC5uYW1lID0gc3JjLm5hbWU7XG4gICAgZGVzdC5heGlzID0gc3JjLmF4aXM7XG4gICAgZGVzdC5lZGdlcyA9IHNyYy5lZGdlcztcblxuICAgIHJldHVybiBkZXN0O1xuICB9LFxuXG4gIGlzOiByZXF1aXJlKCcuL2lzJyksXG4gIGV4dGVuZDogZXh0ZW5kLFxuICBoeXBvdDogcmVxdWlyZSgnLi9oeXBvdCcpLFxuICBnZXRPcmlnaW5YWTogcmVxdWlyZSgnLi9nZXRPcmlnaW5YWScpXG59O1xuXG5leHRlbmQodXRpbHMsIHJlcXVpcmUoJy4vYXJyJykpO1xuZXh0ZW5kKHV0aWxzLCByZXF1aXJlKCcuL2RvbVV0aWxzJykpO1xuZXh0ZW5kKHV0aWxzLCByZXF1aXJlKCcuL3BvaW50ZXJVdGlscycpKTtcbmV4dGVuZCh1dGlscywgcmVxdWlyZSgnLi9yZWN0JykpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHV0aWxzO1xuXG59LHtcIi4vYXJyXCI6MzUsXCIuL2RvbVV0aWxzXCI6MzksXCIuL2V4dGVuZFwiOjQxLFwiLi9nZXRPcmlnaW5YWVwiOjQyLFwiLi9oeXBvdFwiOjQzLFwiLi9pc1wiOjQ2LFwiLi9wb2ludGVyVXRpbHNcIjo0OSxcIi4vcmVjdFwiOjUxLFwiLi93aW5kb3dcIjo1Mn1dLDQ1OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbid1c2Ugc3RyaWN0JztcblxudmFyIHNjb3BlID0gcmVxdWlyZSgnLi4vc2NvcGUnKTtcbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vaW5kZXgnKTtcblxudmFyIGZpbmRlciA9IHtcbiAgbWV0aG9kT3JkZXI6IFsnc2ltdWxhdGlvblJlc3VtZScsICdtb3VzZU9yUGVuJywgJ2hhc1BvaW50ZXInLCAnaWRsZSddLFxuXG4gIHNlYXJjaDogZnVuY3Rpb24gc2VhcmNoKHBvaW50ZXIsIGV2ZW50VHlwZSwgZXZlbnRUYXJnZXQpIHtcbiAgICB2YXIgcG9pbnRlclR5cGUgPSB1dGlscy5nZXRQb2ludGVyVHlwZShwb2ludGVyKTtcbiAgICB2YXIgcG9pbnRlcklkID0gdXRpbHMuZ2V0UG9pbnRlcklkKHBvaW50ZXIpO1xuICAgIHZhciBkZXRhaWxzID0geyBwb2ludGVyOiBwb2ludGVyLCBwb2ludGVySWQ6IHBvaW50ZXJJZCwgcG9pbnRlclR5cGU6IHBvaW50ZXJUeXBlLCBldmVudFR5cGU6IGV2ZW50VHlwZSwgZXZlbnRUYXJnZXQ6IGV2ZW50VGFyZ2V0IH07XG5cbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgZmluZGVyLm1ldGhvZE9yZGVyLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9yZWY7XG5cbiAgICAgIF9yZWYgPSBmaW5kZXIubWV0aG9kT3JkZXJbX2ldO1xuICAgICAgdmFyIG1ldGhvZCA9IF9yZWY7XG5cbiAgICAgIHZhciBpbnRlcmFjdGlvbiA9IGZpbmRlclttZXRob2RdKGRldGFpbHMpO1xuXG4gICAgICBpZiAoaW50ZXJhY3Rpb24pIHtcbiAgICAgICAgcmV0dXJuIGludGVyYWN0aW9uO1xuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICAvLyB0cnkgdG8gcmVzdW1lIHNpbXVsYXRpb24gd2l0aCBhIG5ldyBwb2ludGVyXG4gIHNpbXVsYXRpb25SZXN1bWU6IGZ1bmN0aW9uIHNpbXVsYXRpb25SZXN1bWUoX3JlZjIpIHtcbiAgICB2YXIgcG9pbnRlclR5cGUgPSBfcmVmMi5wb2ludGVyVHlwZSxcbiAgICAgICAgZXZlbnRUeXBlID0gX3JlZjIuZXZlbnRUeXBlLFxuICAgICAgICBldmVudFRhcmdldCA9IF9yZWYyLmV2ZW50VGFyZ2V0O1xuXG4gICAgaWYgKCEvZG93bnxzdGFydC9pLnRlc3QoZXZlbnRUeXBlKSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgZm9yICh2YXIgX2kyID0gMDsgX2kyIDwgc2NvcGUuaW50ZXJhY3Rpb25zLmxlbmd0aDsgX2kyKyspIHtcbiAgICAgIHZhciBfcmVmMztcblxuICAgICAgX3JlZjMgPSBzY29wZS5pbnRlcmFjdGlvbnNbX2kyXTtcbiAgICAgIHZhciBpbnRlcmFjdGlvbiA9IF9yZWYzO1xuXG4gICAgICB2YXIgZWxlbWVudCA9IGV2ZW50VGFyZ2V0O1xuXG4gICAgICBpZiAoaW50ZXJhY3Rpb24uc2ltdWxhdGlvbiAmJiBpbnRlcmFjdGlvbi5zaW11bGF0aW9uLmFsbG93UmVzdW1lICYmIGludGVyYWN0aW9uLnBvaW50ZXJUeXBlID09PSBwb2ludGVyVHlwZSkge1xuICAgICAgICB3aGlsZSAoZWxlbWVudCkge1xuICAgICAgICAgIC8vIGlmIHRoZSBlbGVtZW50IGlzIHRoZSBpbnRlcmFjdGlvbiBlbGVtZW50XG4gICAgICAgICAgaWYgKGVsZW1lbnQgPT09IGludGVyYWN0aW9uLmVsZW1lbnQpIHtcbiAgICAgICAgICAgIHJldHVybiBpbnRlcmFjdGlvbjtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxlbWVudCA9IHV0aWxzLnBhcmVudE5vZGUoZWxlbWVudCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfSxcblxuICAvLyBpZiBpdCdzIGEgbW91c2Ugb3IgcGVuIGludGVyYWN0aW9uXG4gIG1vdXNlT3JQZW46IGZ1bmN0aW9uIG1vdXNlT3JQZW4oX3JlZjQpIHtcbiAgICB2YXIgcG9pbnRlcklkID0gX3JlZjQucG9pbnRlcklkLFxuICAgICAgICBwb2ludGVyVHlwZSA9IF9yZWY0LnBvaW50ZXJUeXBlLFxuICAgICAgICBldmVudFR5cGUgPSBfcmVmNC5ldmVudFR5cGU7XG5cbiAgICBpZiAocG9pbnRlclR5cGUgIT09ICdtb3VzZScgJiYgcG9pbnRlclR5cGUgIT09ICdwZW4nKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICB2YXIgZmlyc3ROb25BY3RpdmUgPSB2b2lkIDA7XG5cbiAgICBmb3IgKHZhciBfaTMgPSAwOyBfaTMgPCBzY29wZS5pbnRlcmFjdGlvbnMubGVuZ3RoOyBfaTMrKykge1xuICAgICAgdmFyIF9yZWY1O1xuXG4gICAgICBfcmVmNSA9IHNjb3BlLmludGVyYWN0aW9uc1tfaTNdO1xuICAgICAgdmFyIGludGVyYWN0aW9uID0gX3JlZjU7XG5cbiAgICAgIGlmIChpbnRlcmFjdGlvbi5wb2ludGVyVHlwZSA9PT0gcG9pbnRlclR5cGUpIHtcbiAgICAgICAgLy8gaWYgaXQncyBhIGRvd24gZXZlbnQsIHNraXAgaW50ZXJhY3Rpb25zIHdpdGggcnVubmluZyBzaW11bGF0aW9uc1xuICAgICAgICBpZiAoaW50ZXJhY3Rpb24uc2ltdWxhdGlvbiAmJiAhdXRpbHMuY29udGFpbnMoaW50ZXJhY3Rpb24ucG9pbnRlcklkcywgcG9pbnRlcklkKSkge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gaWYgdGhlIGludGVyYWN0aW9uIGlzIGFjdGl2ZSwgcmV0dXJuIGl0IGltbWVkaWF0ZWx5XG4gICAgICAgIGlmIChpbnRlcmFjdGlvbi5pbnRlcmFjdGluZygpKSB7XG4gICAgICAgICAgcmV0dXJuIGludGVyYWN0aW9uO1xuICAgICAgICB9XG4gICAgICAgIC8vIG90aGVyd2lzZSBzYXZlIGl0IGFuZCBsb29rIGZvciBhbm90aGVyIGFjdGl2ZSBpbnRlcmFjdGlvblxuICAgICAgICBlbHNlIGlmICghZmlyc3ROb25BY3RpdmUpIHtcbiAgICAgICAgICAgIGZpcnN0Tm9uQWN0aXZlID0gaW50ZXJhY3Rpb247XG4gICAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIGlmIG5vIGFjdGl2ZSBtb3VzZSBpbnRlcmFjdGlvbiB3YXMgZm91bmQgdXNlIHRoZSBmaXJzdCBpbmFjdGl2ZSBtb3VzZVxuICAgIC8vIGludGVyYWN0aW9uXG4gICAgaWYgKGZpcnN0Tm9uQWN0aXZlKSB7XG4gICAgICByZXR1cm4gZmlyc3ROb25BY3RpdmU7XG4gICAgfVxuXG4gICAgLy8gZmluZCBhbnkgbW91c2Ugb3IgcGVuIGludGVyYWN0aW9uLlxuICAgIC8vIGlnbm9yZSB0aGUgaW50ZXJhY3Rpb24gaWYgdGhlIGV2ZW50VHlwZSBpcyBhICpkb3duLCBhbmQgYSBzaW11bGF0aW9uXG4gICAgLy8gaXMgYWN0aXZlXG4gICAgZm9yICh2YXIgX2k0ID0gMDsgX2k0IDwgc2NvcGUuaW50ZXJhY3Rpb25zLmxlbmd0aDsgX2k0KyspIHtcbiAgICAgIHZhciBfcmVmNjtcblxuICAgICAgX3JlZjYgPSBzY29wZS5pbnRlcmFjdGlvbnNbX2k0XTtcbiAgICAgIHZhciBfaW50ZXJhY3Rpb24gPSBfcmVmNjtcblxuICAgICAgaWYgKF9pbnRlcmFjdGlvbi5wb2ludGVyVHlwZSA9PT0gcG9pbnRlclR5cGUgJiYgISgvZG93bi9pLnRlc3QoZXZlbnRUeXBlKSAmJiBfaW50ZXJhY3Rpb24uc2ltdWxhdGlvbikpIHtcbiAgICAgICAgcmV0dXJuIF9pbnRlcmFjdGlvbjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfSxcblxuICAvLyBnZXQgaW50ZXJhY3Rpb24gdGhhdCBoYXMgdGhpcyBwb2ludGVyXG4gIGhhc1BvaW50ZXI6IGZ1bmN0aW9uIGhhc1BvaW50ZXIoX3JlZjcpIHtcbiAgICB2YXIgcG9pbnRlcklkID0gX3JlZjcucG9pbnRlcklkO1xuXG4gICAgZm9yICh2YXIgX2k1ID0gMDsgX2k1IDwgc2NvcGUuaW50ZXJhY3Rpb25zLmxlbmd0aDsgX2k1KyspIHtcbiAgICAgIHZhciBfcmVmODtcblxuICAgICAgX3JlZjggPSBzY29wZS5pbnRlcmFjdGlvbnNbX2k1XTtcbiAgICAgIHZhciBpbnRlcmFjdGlvbiA9IF9yZWY4O1xuXG4gICAgICBpZiAodXRpbHMuY29udGFpbnMoaW50ZXJhY3Rpb24ucG9pbnRlcklkcywgcG9pbnRlcklkKSkge1xuICAgICAgICByZXR1cm4gaW50ZXJhY3Rpb247XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIC8vIGdldCBmaXJzdCBpZGxlIGludGVyYWN0aW9uIHdpdGggYSBtYXRjaGluZyBwb2ludGVyVHlwZVxuICBpZGxlOiBmdW5jdGlvbiBpZGxlKF9yZWY5KSB7XG4gICAgdmFyIHBvaW50ZXJUeXBlID0gX3JlZjkucG9pbnRlclR5cGU7XG5cbiAgICBmb3IgKHZhciBfaTYgPSAwOyBfaTYgPCBzY29wZS5pbnRlcmFjdGlvbnMubGVuZ3RoOyBfaTYrKykge1xuICAgICAgdmFyIF9yZWYxMDtcblxuICAgICAgX3JlZjEwID0gc2NvcGUuaW50ZXJhY3Rpb25zW19pNl07XG4gICAgICB2YXIgaW50ZXJhY3Rpb24gPSBfcmVmMTA7XG5cbiAgICAgIC8vIGlmIHRoZXJlJ3MgYWxyZWFkeSBhIHBvaW50ZXIgaGVsZCBkb3duXG4gICAgICBpZiAoaW50ZXJhY3Rpb24ucG9pbnRlcklkcy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgdmFyIHRhcmdldCA9IGludGVyYWN0aW9uLnRhcmdldDtcbiAgICAgICAgLy8gZG9uJ3QgYWRkIHRoaXMgcG9pbnRlciBpZiB0aGVyZSBpcyBhIHRhcmdldCBpbnRlcmFjdGFibGUgYW5kIGl0XG4gICAgICAgIC8vIGlzbid0IGdlc3R1cmFibGVcbiAgICAgICAgaWYgKHRhcmdldCAmJiAhdGFyZ2V0Lm9wdGlvbnMuZ2VzdHVyZS5lbmFibGVkKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIC8vIG1heGltdW0gb2YgMiBwb2ludGVycyBwZXIgaW50ZXJhY3Rpb25cbiAgICAgIGVsc2UgaWYgKGludGVyYWN0aW9uLnBvaW50ZXJJZHMubGVuZ3RoID49IDIpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICBpZiAoIWludGVyYWN0aW9uLmludGVyYWN0aW5nKCkgJiYgcG9pbnRlclR5cGUgPT09IGludGVyYWN0aW9uLnBvaW50ZXJUeXBlKSB7XG4gICAgICAgIHJldHVybiBpbnRlcmFjdGlvbjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmaW5kZXI7XG5cbn0se1wiLi4vc2NvcGVcIjozMyxcIi4vaW5kZXhcIjo0NH1dLDQ2OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbid1c2Ugc3RyaWN0JztcblxudmFyIF90eXBlb2YgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH0gOiBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9O1xuXG52YXIgd2luID0gcmVxdWlyZSgnLi93aW5kb3cnKTtcbnZhciBpc1dpbmRvdyA9IHJlcXVpcmUoJy4vaXNXaW5kb3cnKTtcblxudmFyIGlzID0ge1xuICBhcnJheTogZnVuY3Rpb24gYXJyYXkoKSB7fSxcblxuICB3aW5kb3c6IGZ1bmN0aW9uIHdpbmRvdyh0aGluZykge1xuICAgIHJldHVybiB0aGluZyA9PT0gd2luLndpbmRvdyB8fCBpc1dpbmRvdyh0aGluZyk7XG4gIH0sXG5cbiAgZG9jRnJhZzogZnVuY3Rpb24gZG9jRnJhZyh0aGluZykge1xuICAgIHJldHVybiBpcy5vYmplY3QodGhpbmcpICYmIHRoaW5nLm5vZGVUeXBlID09PSAxMTtcbiAgfSxcblxuICBvYmplY3Q6IGZ1bmN0aW9uIG9iamVjdCh0aGluZykge1xuICAgIHJldHVybiAhIXRoaW5nICYmICh0eXBlb2YgdGhpbmcgPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiBfdHlwZW9mKHRoaW5nKSkgPT09ICdvYmplY3QnO1xuICB9LFxuXG4gIGZ1bmN0aW9uOiBmdW5jdGlvbiBfZnVuY3Rpb24odGhpbmcpIHtcbiAgICByZXR1cm4gdHlwZW9mIHRoaW5nID09PSAnZnVuY3Rpb24nO1xuICB9LFxuXG4gIG51bWJlcjogZnVuY3Rpb24gbnVtYmVyKHRoaW5nKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB0aGluZyA9PT0gJ251bWJlcic7XG4gIH0sXG5cbiAgYm9vbDogZnVuY3Rpb24gYm9vbCh0aGluZykge1xuICAgIHJldHVybiB0eXBlb2YgdGhpbmcgPT09ICdib29sZWFuJztcbiAgfSxcblxuICBzdHJpbmc6IGZ1bmN0aW9uIHN0cmluZyh0aGluZykge1xuICAgIHJldHVybiB0eXBlb2YgdGhpbmcgPT09ICdzdHJpbmcnO1xuICB9LFxuXG4gIGVsZW1lbnQ6IGZ1bmN0aW9uIGVsZW1lbnQodGhpbmcpIHtcbiAgICBpZiAoIXRoaW5nIHx8ICh0eXBlb2YgdGhpbmcgPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiBfdHlwZW9mKHRoaW5nKSkgIT09ICdvYmplY3QnKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgdmFyIF93aW5kb3cgPSB3aW4uZ2V0V2luZG93KHRoaW5nKSB8fCB3aW4ud2luZG93O1xuXG4gICAgcmV0dXJuICgvb2JqZWN0fGZ1bmN0aW9uLy50ZXN0KF90eXBlb2YoX3dpbmRvdy5FbGVtZW50KSkgPyB0aGluZyBpbnN0YW5jZW9mIF93aW5kb3cuRWxlbWVudCAvL0RPTTJcbiAgICAgIDogdGhpbmcubm9kZVR5cGUgPT09IDEgJiYgdHlwZW9mIHRoaW5nLm5vZGVOYW1lID09PSAnc3RyaW5nJ1xuICAgICk7XG4gIH0sXG5cbiAgcGxhaW5PYmplY3Q6IGZ1bmN0aW9uIHBsYWluT2JqZWN0KHRoaW5nKSB7XG4gICAgcmV0dXJuIGlzLm9iamVjdCh0aGluZykgJiYgdGhpbmcuY29uc3RydWN0b3IubmFtZSA9PT0gJ09iamVjdCc7XG4gIH1cbn07XG5cbmlzLmFycmF5ID0gZnVuY3Rpb24gKHRoaW5nKSB7XG4gIHJldHVybiBpcy5vYmplY3QodGhpbmcpICYmIHR5cGVvZiB0aGluZy5sZW5ndGggIT09ICd1bmRlZmluZWQnICYmIGlzLmZ1bmN0aW9uKHRoaW5nLnNwbGljZSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGlzO1xuXG59LHtcIi4vaXNXaW5kb3dcIjo0NyxcIi4vd2luZG93XCI6NTJ9XSw0NzpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodGhpbmcpIHtcbiAgcmV0dXJuICEhKHRoaW5nICYmIHRoaW5nLldpbmRvdykgJiYgdGhpbmcgaW5zdGFuY2VvZiB0aGluZy5XaW5kb3c7XG59O1xuXG59LHt9XSw0ODpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4ndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIHBvaW50ZXJFeHRlbmQoZGVzdCwgc291cmNlKSB7XG4gIGZvciAodmFyIHByb3AgaW4gc291cmNlKSB7XG4gICAgdmFyIHByZWZpeGVkUHJvcFJFcyA9IG1vZHVsZS5leHBvcnRzLnByZWZpeGVkUHJvcFJFcztcbiAgICB2YXIgZGVwcmVjYXRlZCA9IGZhbHNlO1xuXG4gICAgLy8gc2tpcCBkZXByZWNhdGVkIHByZWZpeGVkIHByb3BlcnRpZXNcbiAgICBmb3IgKHZhciB2ZW5kb3IgaW4gcHJlZml4ZWRQcm9wUkVzKSB7XG4gICAgICBpZiAocHJvcC5pbmRleE9mKHZlbmRvcikgPT09IDAgJiYgcHJlZml4ZWRQcm9wUkVzW3ZlbmRvcl0udGVzdChwcm9wKSkge1xuICAgICAgICBkZXByZWNhdGVkID0gdHJ1ZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCFkZXByZWNhdGVkICYmIHR5cGVvZiBzb3VyY2VbcHJvcF0gIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGRlc3RbcHJvcF0gPSBzb3VyY2VbcHJvcF07XG4gICAgfVxuICB9XG4gIHJldHVybiBkZXN0O1xufVxuXG5wb2ludGVyRXh0ZW5kLnByZWZpeGVkUHJvcFJFcyA9IHtcbiAgd2Via2l0OiAvKE1vdmVtZW50W1hZXXxSYWRpdXNbWFldfFJvdGF0aW9uQW5nbGV8Rm9yY2UpJC9cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gcG9pbnRlckV4dGVuZDtcblxufSx7fV0sNDk6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgaHlwb3QgPSByZXF1aXJlKCcuL2h5cG90Jyk7XG52YXIgYnJvd3NlciA9IHJlcXVpcmUoJy4vYnJvd3NlcicpO1xudmFyIGRvbSA9IHJlcXVpcmUoJy4vZG9tT2JqZWN0cycpO1xudmFyIGRvbVV0aWxzID0gcmVxdWlyZSgnLi9kb21VdGlscycpO1xudmFyIGRvbU9iamVjdHMgPSByZXF1aXJlKCcuL2RvbU9iamVjdHMnKTtcbnZhciBpcyA9IHJlcXVpcmUoJy4vaXMnKTtcbnZhciBwb2ludGVyRXh0ZW5kID0gcmVxdWlyZSgnLi9wb2ludGVyRXh0ZW5kJyk7XG5cbnZhciBwb2ludGVyVXRpbHMgPSB7XG4gIGNvcHlDb29yZHM6IGZ1bmN0aW9uIGNvcHlDb29yZHMoZGVzdCwgc3JjKSB7XG4gICAgZGVzdC5wYWdlID0gZGVzdC5wYWdlIHx8IHt9O1xuICAgIGRlc3QucGFnZS54ID0gc3JjLnBhZ2UueDtcbiAgICBkZXN0LnBhZ2UueSA9IHNyYy5wYWdlLnk7XG5cbiAgICBkZXN0LmNsaWVudCA9IGRlc3QuY2xpZW50IHx8IHt9O1xuICAgIGRlc3QuY2xpZW50LnggPSBzcmMuY2xpZW50Lng7XG4gICAgZGVzdC5jbGllbnQueSA9IHNyYy5jbGllbnQueTtcblxuICAgIGRlc3QudGltZVN0YW1wID0gc3JjLnRpbWVTdGFtcDtcbiAgfSxcblxuICBzZXRDb29yZERlbHRhczogZnVuY3Rpb24gc2V0Q29vcmREZWx0YXModGFyZ2V0T2JqLCBwcmV2LCBjdXIpIHtcbiAgICB0YXJnZXRPYmoucGFnZS54ID0gY3VyLnBhZ2UueCAtIHByZXYucGFnZS54O1xuICAgIHRhcmdldE9iai5wYWdlLnkgPSBjdXIucGFnZS55IC0gcHJldi5wYWdlLnk7XG4gICAgdGFyZ2V0T2JqLmNsaWVudC54ID0gY3VyLmNsaWVudC54IC0gcHJldi5jbGllbnQueDtcbiAgICB0YXJnZXRPYmouY2xpZW50LnkgPSBjdXIuY2xpZW50LnkgLSBwcmV2LmNsaWVudC55O1xuICAgIHRhcmdldE9iai50aW1lU3RhbXAgPSBjdXIudGltZVN0YW1wIC0gcHJldi50aW1lU3RhbXA7XG5cbiAgICAvLyBzZXQgcG9pbnRlciB2ZWxvY2l0eVxuICAgIHZhciBkdCA9IE1hdGgubWF4KHRhcmdldE9iai50aW1lU3RhbXAgLyAxMDAwLCAwLjAwMSk7XG5cbiAgICB0YXJnZXRPYmoucGFnZS5zcGVlZCA9IGh5cG90KHRhcmdldE9iai5wYWdlLngsIHRhcmdldE9iai5wYWdlLnkpIC8gZHQ7XG4gICAgdGFyZ2V0T2JqLnBhZ2UudnggPSB0YXJnZXRPYmoucGFnZS54IC8gZHQ7XG4gICAgdGFyZ2V0T2JqLnBhZ2UudnkgPSB0YXJnZXRPYmoucGFnZS55IC8gZHQ7XG5cbiAgICB0YXJnZXRPYmouY2xpZW50LnNwZWVkID0gaHlwb3QodGFyZ2V0T2JqLmNsaWVudC54LCB0YXJnZXRPYmoucGFnZS55KSAvIGR0O1xuICAgIHRhcmdldE9iai5jbGllbnQudnggPSB0YXJnZXRPYmouY2xpZW50LnggLyBkdDtcbiAgICB0YXJnZXRPYmouY2xpZW50LnZ5ID0gdGFyZ2V0T2JqLmNsaWVudC55IC8gZHQ7XG4gIH0sXG5cbiAgaXNOYXRpdmVQb2ludGVyOiBmdW5jdGlvbiBpc05hdGl2ZVBvaW50ZXIocG9pbnRlcikge1xuICAgIHJldHVybiBwb2ludGVyIGluc3RhbmNlb2YgZG9tLkV2ZW50IHx8IHBvaW50ZXIgaW5zdGFuY2VvZiBkb20uVG91Y2g7XG4gIH0sXG5cbiAgLy8gR2V0IHNwZWNpZmllZCBYL1kgY29vcmRzIGZvciBtb3VzZSBvciBldmVudC50b3VjaGVzWzBdXG4gIGdldFhZOiBmdW5jdGlvbiBnZXRYWSh0eXBlLCBwb2ludGVyLCB4eSkge1xuICAgIHh5ID0geHkgfHwge307XG4gICAgdHlwZSA9IHR5cGUgfHwgJ3BhZ2UnO1xuXG4gICAgeHkueCA9IHBvaW50ZXJbdHlwZSArICdYJ107XG4gICAgeHkueSA9IHBvaW50ZXJbdHlwZSArICdZJ107XG5cbiAgICByZXR1cm4geHk7XG4gIH0sXG5cbiAgZ2V0UGFnZVhZOiBmdW5jdGlvbiBnZXRQYWdlWFkocG9pbnRlciwgcGFnZSkge1xuICAgIHBhZ2UgPSBwYWdlIHx8IHt9O1xuXG4gICAgLy8gT3BlcmEgTW9iaWxlIGhhbmRsZXMgdGhlIHZpZXdwb3J0IGFuZCBzY3JvbGxpbmcgb2RkbHlcbiAgICBpZiAoYnJvd3Nlci5pc09wZXJhTW9iaWxlICYmIHBvaW50ZXJVdGlscy5pc05hdGl2ZVBvaW50ZXIocG9pbnRlcikpIHtcbiAgICAgIHBvaW50ZXJVdGlscy5nZXRYWSgnc2NyZWVuJywgcG9pbnRlciwgcGFnZSk7XG5cbiAgICAgIHBhZ2UueCArPSB3aW5kb3cuc2Nyb2xsWDtcbiAgICAgIHBhZ2UueSArPSB3aW5kb3cuc2Nyb2xsWTtcbiAgICB9IGVsc2Uge1xuICAgICAgcG9pbnRlclV0aWxzLmdldFhZKCdwYWdlJywgcG9pbnRlciwgcGFnZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHBhZ2U7XG4gIH0sXG5cbiAgZ2V0Q2xpZW50WFk6IGZ1bmN0aW9uIGdldENsaWVudFhZKHBvaW50ZXIsIGNsaWVudCkge1xuICAgIGNsaWVudCA9IGNsaWVudCB8fCB7fTtcblxuICAgIGlmIChicm93c2VyLmlzT3BlcmFNb2JpbGUgJiYgcG9pbnRlclV0aWxzLmlzTmF0aXZlUG9pbnRlcihwb2ludGVyKSkge1xuICAgICAgLy8gT3BlcmEgTW9iaWxlIGhhbmRsZXMgdGhlIHZpZXdwb3J0IGFuZCBzY3JvbGxpbmcgb2RkbHlcbiAgICAgIHBvaW50ZXJVdGlscy5nZXRYWSgnc2NyZWVuJywgcG9pbnRlciwgY2xpZW50KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcG9pbnRlclV0aWxzLmdldFhZKCdjbGllbnQnLCBwb2ludGVyLCBjbGllbnQpO1xuICAgIH1cblxuICAgIHJldHVybiBjbGllbnQ7XG4gIH0sXG5cbiAgZ2V0UG9pbnRlcklkOiBmdW5jdGlvbiBnZXRQb2ludGVySWQocG9pbnRlcikge1xuICAgIHJldHVybiBpcy5udW1iZXIocG9pbnRlci5wb2ludGVySWQpID8gcG9pbnRlci5wb2ludGVySWQgOiBwb2ludGVyLmlkZW50aWZpZXI7XG4gIH0sXG5cbiAgc2V0Q29vcmRzOiBmdW5jdGlvbiBzZXRDb29yZHModGFyZ2V0T2JqLCBwb2ludGVycywgdGltZVN0YW1wKSB7XG4gICAgdmFyIHBvaW50ZXIgPSBwb2ludGVycy5sZW5ndGggPiAxID8gcG9pbnRlclV0aWxzLnBvaW50ZXJBdmVyYWdlKHBvaW50ZXJzKSA6IHBvaW50ZXJzWzBdO1xuXG4gICAgdmFyIHRtcFhZID0ge307XG5cbiAgICBwb2ludGVyVXRpbHMuZ2V0UGFnZVhZKHBvaW50ZXIsIHRtcFhZKTtcbiAgICB0YXJnZXRPYmoucGFnZS54ID0gdG1wWFkueDtcbiAgICB0YXJnZXRPYmoucGFnZS55ID0gdG1wWFkueTtcblxuICAgIHBvaW50ZXJVdGlscy5nZXRDbGllbnRYWShwb2ludGVyLCB0bXBYWSk7XG4gICAgdGFyZ2V0T2JqLmNsaWVudC54ID0gdG1wWFkueDtcbiAgICB0YXJnZXRPYmouY2xpZW50LnkgPSB0bXBYWS55O1xuXG4gICAgdGFyZ2V0T2JqLnRpbWVTdGFtcCA9IGlzLm51bWJlcih0aW1lU3RhbXApID8gdGltZVN0YW1wIDogbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gIH0sXG5cbiAgcG9pbnRlckV4dGVuZDogcG9pbnRlckV4dGVuZCxcblxuICBnZXRUb3VjaFBhaXI6IGZ1bmN0aW9uIGdldFRvdWNoUGFpcihldmVudCkge1xuICAgIHZhciB0b3VjaGVzID0gW107XG5cbiAgICAvLyBhcnJheSBvZiB0b3VjaGVzIGlzIHN1cHBsaWVkXG4gICAgaWYgKGlzLmFycmF5KGV2ZW50KSkge1xuICAgICAgdG91Y2hlc1swXSA9IGV2ZW50WzBdO1xuICAgICAgdG91Y2hlc1sxXSA9IGV2ZW50WzFdO1xuICAgIH1cbiAgICAvLyBhbiBldmVudFxuICAgIGVsc2Uge1xuICAgICAgICBpZiAoZXZlbnQudHlwZSA9PT0gJ3RvdWNoZW5kJykge1xuICAgICAgICAgIGlmIChldmVudC50b3VjaGVzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgdG91Y2hlc1swXSA9IGV2ZW50LnRvdWNoZXNbMF07XG4gICAgICAgICAgICB0b3VjaGVzWzFdID0gZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF07XG4gICAgICAgICAgfSBlbHNlIGlmIChldmVudC50b3VjaGVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgdG91Y2hlc1swXSA9IGV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdO1xuICAgICAgICAgICAgdG91Y2hlc1sxXSA9IGV2ZW50LmNoYW5nZWRUb3VjaGVzWzFdO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0b3VjaGVzWzBdID0gZXZlbnQudG91Y2hlc1swXTtcbiAgICAgICAgICB0b3VjaGVzWzFdID0gZXZlbnQudG91Y2hlc1sxXTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgcmV0dXJuIHRvdWNoZXM7XG4gIH0sXG5cbiAgcG9pbnRlckF2ZXJhZ2U6IGZ1bmN0aW9uIHBvaW50ZXJBdmVyYWdlKHBvaW50ZXJzKSB7XG4gICAgdmFyIGF2ZXJhZ2UgPSB7XG4gICAgICBwYWdlWDogMCxcbiAgICAgIHBhZ2VZOiAwLFxuICAgICAgY2xpZW50WDogMCxcbiAgICAgIGNsaWVudFk6IDAsXG4gICAgICBzY3JlZW5YOiAwLFxuICAgICAgc2NyZWVuWTogMFxuICAgIH07XG5cbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgcG9pbnRlcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX3JlZjtcblxuICAgICAgX3JlZiA9IHBvaW50ZXJzW19pXTtcbiAgICAgIHZhciBwb2ludGVyID0gX3JlZjtcblxuICAgICAgZm9yICh2YXIgX3Byb3AgaW4gYXZlcmFnZSkge1xuICAgICAgICBhdmVyYWdlW19wcm9wXSArPSBwb2ludGVyW19wcm9wXTtcbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgcHJvcCBpbiBhdmVyYWdlKSB7XG4gICAgICBhdmVyYWdlW3Byb3BdIC89IHBvaW50ZXJzLmxlbmd0aDtcbiAgICB9XG5cbiAgICByZXR1cm4gYXZlcmFnZTtcbiAgfSxcblxuICB0b3VjaEJCb3g6IGZ1bmN0aW9uIHRvdWNoQkJveChldmVudCkge1xuICAgIGlmICghZXZlbnQubGVuZ3RoICYmICEoZXZlbnQudG91Y2hlcyAmJiBldmVudC50b3VjaGVzLmxlbmd0aCA+IDEpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIHRvdWNoZXMgPSBwb2ludGVyVXRpbHMuZ2V0VG91Y2hQYWlyKGV2ZW50KTtcbiAgICB2YXIgbWluWCA9IE1hdGgubWluKHRvdWNoZXNbMF0ucGFnZVgsIHRvdWNoZXNbMV0ucGFnZVgpO1xuICAgIHZhciBtaW5ZID0gTWF0aC5taW4odG91Y2hlc1swXS5wYWdlWSwgdG91Y2hlc1sxXS5wYWdlWSk7XG4gICAgdmFyIG1heFggPSBNYXRoLm1heCh0b3VjaGVzWzBdLnBhZ2VYLCB0b3VjaGVzWzFdLnBhZ2VYKTtcbiAgICB2YXIgbWF4WSA9IE1hdGgubWF4KHRvdWNoZXNbMF0ucGFnZVksIHRvdWNoZXNbMV0ucGFnZVkpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHg6IG1pblgsXG4gICAgICB5OiBtaW5ZLFxuICAgICAgbGVmdDogbWluWCxcbiAgICAgIHRvcDogbWluWSxcbiAgICAgIHdpZHRoOiBtYXhYIC0gbWluWCxcbiAgICAgIGhlaWdodDogbWF4WSAtIG1pbllcbiAgICB9O1xuICB9LFxuXG4gIHRvdWNoRGlzdGFuY2U6IGZ1bmN0aW9uIHRvdWNoRGlzdGFuY2UoZXZlbnQsIGRlbHRhU291cmNlKSB7XG4gICAgdmFyIHNvdXJjZVggPSBkZWx0YVNvdXJjZSArICdYJztcbiAgICB2YXIgc291cmNlWSA9IGRlbHRhU291cmNlICsgJ1knO1xuICAgIHZhciB0b3VjaGVzID0gcG9pbnRlclV0aWxzLmdldFRvdWNoUGFpcihldmVudCk7XG5cbiAgICB2YXIgZHggPSB0b3VjaGVzWzBdW3NvdXJjZVhdIC0gdG91Y2hlc1sxXVtzb3VyY2VYXTtcbiAgICB2YXIgZHkgPSB0b3VjaGVzWzBdW3NvdXJjZVldIC0gdG91Y2hlc1sxXVtzb3VyY2VZXTtcblxuICAgIHJldHVybiBoeXBvdChkeCwgZHkpO1xuICB9LFxuXG4gIHRvdWNoQW5nbGU6IGZ1bmN0aW9uIHRvdWNoQW5nbGUoZXZlbnQsIHByZXZBbmdsZSwgZGVsdGFTb3VyY2UpIHtcbiAgICB2YXIgc291cmNlWCA9IGRlbHRhU291cmNlICsgJ1gnO1xuICAgIHZhciBzb3VyY2VZID0gZGVsdGFTb3VyY2UgKyAnWSc7XG4gICAgdmFyIHRvdWNoZXMgPSBwb2ludGVyVXRpbHMuZ2V0VG91Y2hQYWlyKGV2ZW50KTtcbiAgICB2YXIgZHggPSB0b3VjaGVzWzFdW3NvdXJjZVhdIC0gdG91Y2hlc1swXVtzb3VyY2VYXTtcbiAgICB2YXIgZHkgPSB0b3VjaGVzWzFdW3NvdXJjZVldIC0gdG91Y2hlc1swXVtzb3VyY2VZXTtcbiAgICB2YXIgYW5nbGUgPSAxODAgKiBNYXRoLmF0YW4yKGR5LCBkeCkgLyBNYXRoLlBJO1xuXG4gICAgcmV0dXJuIGFuZ2xlO1xuICB9LFxuXG4gIGdldFBvaW50ZXJUeXBlOiBmdW5jdGlvbiBnZXRQb2ludGVyVHlwZShwb2ludGVyKSB7XG4gICAgcmV0dXJuIGlzLnN0cmluZyhwb2ludGVyLnBvaW50ZXJUeXBlKSA/IHBvaW50ZXIucG9pbnRlclR5cGUgOiBpcy5udW1iZXIocG9pbnRlci5wb2ludGVyVHlwZSkgPyBbdW5kZWZpbmVkLCB1bmRlZmluZWQsICd0b3VjaCcsICdwZW4nLCAnbW91c2UnXVtwb2ludGVyLnBvaW50ZXJUeXBlXVxuICAgIC8vIGlmIHRoZSBQb2ludGVyRXZlbnQgQVBJIGlzbid0IGF2YWlsYWJsZSwgdGhlbiB0aGUgXCJwb2ludGVyXCIgbXVzdFxuICAgIC8vIGJlIGVpdGhlciBhIE1vdXNlRXZlbnQsIFRvdWNoRXZlbnQsIG9yIFRvdWNoIG9iamVjdFxuICAgIDogL3RvdWNoLy50ZXN0KHBvaW50ZXIudHlwZSkgfHwgcG9pbnRlciBpbnN0YW5jZW9mIGRvbU9iamVjdHMuVG91Y2ggPyAndG91Y2gnIDogJ21vdXNlJztcbiAgfSxcblxuICAvLyBbIGV2ZW50LnRhcmdldCwgZXZlbnQuY3VycmVudFRhcmdldCBdXG4gIGdldEV2ZW50VGFyZ2V0czogZnVuY3Rpb24gZ2V0RXZlbnRUYXJnZXRzKGV2ZW50KSB7XG4gICAgdmFyIHBhdGggPSBpcy5mdW5jdGlvbihldmVudC5jb21wb3NlZFBhdGgpID8gZXZlbnQuY29tcG9zZWRQYXRoKCkgOiBldmVudC5wYXRoO1xuXG4gICAgcmV0dXJuIFtkb21VdGlscy5nZXRBY3R1YWxFbGVtZW50KHBhdGggPyBwYXRoWzBdIDogZXZlbnQudGFyZ2V0KSwgZG9tVXRpbHMuZ2V0QWN0dWFsRWxlbWVudChldmVudC5jdXJyZW50VGFyZ2V0KV07XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gcG9pbnRlclV0aWxzO1xuXG59LHtcIi4vYnJvd3NlclwiOjM2LFwiLi9kb21PYmplY3RzXCI6MzgsXCIuL2RvbVV0aWxzXCI6MzksXCIuL2h5cG90XCI6NDMsXCIuL2lzXCI6NDYsXCIuL3BvaW50ZXJFeHRlbmRcIjo0OH1dLDUwOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbid1c2Ugc3RyaWN0JztcblxudmFyIF9yZXF1aXJlID0gcmVxdWlyZSgnLi93aW5kb3cnKSxcbiAgICB3aW5kb3cgPSBfcmVxdWlyZS53aW5kb3c7XG5cbnZhciB2ZW5kb3JzID0gWydtcycsICdtb3onLCAnd2Via2l0JywgJ28nXTtcbnZhciBsYXN0VGltZSA9IDA7XG52YXIgcmVxdWVzdCA9IHZvaWQgMDtcbnZhciBjYW5jZWwgPSB2b2lkIDA7XG5cbmZvciAodmFyIHggPSAwOyB4IDwgdmVuZG9ycy5sZW5ndGggJiYgIXdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWU7IHgrKykge1xuICByZXF1ZXN0ID0gd2luZG93W3ZlbmRvcnNbeF0gKyAnUmVxdWVzdEFuaW1hdGlvbkZyYW1lJ107XG4gIGNhbmNlbCA9IHdpbmRvd1t2ZW5kb3JzW3hdICsgJ0NhbmNlbEFuaW1hdGlvbkZyYW1lJ10gfHwgd2luZG93W3ZlbmRvcnNbeF0gKyAnQ2FuY2VsUmVxdWVzdEFuaW1hdGlvbkZyYW1lJ107XG59XG5cbmlmICghcmVxdWVzdCkge1xuICByZXF1ZXN0ID0gZnVuY3Rpb24gcmVxdWVzdChjYWxsYmFjaykge1xuICAgIHZhciBjdXJyVGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgIHZhciB0aW1lVG9DYWxsID0gTWF0aC5tYXgoMCwgMTYgLSAoY3VyclRpbWUgLSBsYXN0VGltZSkpO1xuICAgIHZhciBpZCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgY2FsbGJhY2soY3VyclRpbWUgKyB0aW1lVG9DYWxsKTtcbiAgICB9LCB0aW1lVG9DYWxsKTtcblxuICAgIGxhc3RUaW1lID0gY3VyclRpbWUgKyB0aW1lVG9DYWxsO1xuICAgIHJldHVybiBpZDtcbiAgfTtcbn1cblxuaWYgKCFjYW5jZWwpIHtcbiAgY2FuY2VsID0gZnVuY3Rpb24gY2FuY2VsKGlkKSB7XG4gICAgY2xlYXJUaW1lb3V0KGlkKTtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHJlcXVlc3Q6IHJlcXVlc3QsXG4gIGNhbmNlbDogY2FuY2VsXG59O1xuXG59LHtcIi4vd2luZG93XCI6NTJ9XSw1MTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4ndXNlIHN0cmljdCc7XG5cbnZhciBleHRlbmQgPSByZXF1aXJlKCcuL2V4dGVuZCcpO1xudmFyIGlzID0gcmVxdWlyZSgnLi9pcycpO1xuXG52YXIgX3JlcXVpcmUgPSByZXF1aXJlKCcuL2RvbVV0aWxzJyksXG4gICAgY2xvc2VzdCA9IF9yZXF1aXJlLmNsb3Nlc3QsXG4gICAgcGFyZW50Tm9kZSA9IF9yZXF1aXJlLnBhcmVudE5vZGUsXG4gICAgZ2V0RWxlbWVudFJlY3QgPSBfcmVxdWlyZS5nZXRFbGVtZW50UmVjdDtcblxudmFyIHJlY3RVdGlscyA9IHtcbiAgZ2V0U3RyaW5nT3B0aW9uUmVzdWx0OiBmdW5jdGlvbiBnZXRTdHJpbmdPcHRpb25SZXN1bHQodmFsdWUsIGludGVyYWN0YWJsZSwgZWxlbWVudCkge1xuICAgIGlmICghaXMuc3RyaW5nKHZhbHVlKSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgaWYgKHZhbHVlID09PSAncGFyZW50Jykge1xuICAgICAgdmFsdWUgPSBwYXJlbnROb2RlKGVsZW1lbnQpO1xuICAgIH0gZWxzZSBpZiAodmFsdWUgPT09ICdzZWxmJykge1xuICAgICAgdmFsdWUgPSBpbnRlcmFjdGFibGUuZ2V0UmVjdChlbGVtZW50KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFsdWUgPSBjbG9zZXN0KGVsZW1lbnQsIHZhbHVlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdmFsdWU7XG4gIH0sXG5cbiAgcmVzb2x2ZVJlY3RMaWtlOiBmdW5jdGlvbiByZXNvbHZlUmVjdExpa2UodmFsdWUsIGludGVyYWN0YWJsZSwgZWxlbWVudCwgZnVuY3Rpb25BcmdzKSB7XG4gICAgdmFsdWUgPSByZWN0VXRpbHMuZ2V0U3RyaW5nT3B0aW9uUmVzdWx0KHZhbHVlLCBpbnRlcmFjdGFibGUsIGVsZW1lbnQpIHx8IHZhbHVlO1xuXG4gICAgaWYgKGlzLmZ1bmN0aW9uKHZhbHVlKSkge1xuICAgICAgdmFsdWUgPSB2YWx1ZS5hcHBseShudWxsLCBmdW5jdGlvbkFyZ3MpO1xuICAgIH1cblxuICAgIGlmIChpcy5lbGVtZW50KHZhbHVlKSkge1xuICAgICAgdmFsdWUgPSBnZXRFbGVtZW50UmVjdCh2YWx1ZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbHVlO1xuICB9LFxuXG4gIHJlY3RUb1hZOiBmdW5jdGlvbiByZWN0VG9YWShyZWN0KSB7XG4gICAgcmV0dXJuIHJlY3QgJiYge1xuICAgICAgeDogJ3gnIGluIHJlY3QgPyByZWN0LnggOiByZWN0LmxlZnQsXG4gICAgICB5OiAneScgaW4gcmVjdCA/IHJlY3QueSA6IHJlY3QudG9wXG4gICAgfTtcbiAgfSxcblxuICB4eXdoVG9UbGJyOiBmdW5jdGlvbiB4eXdoVG9UbGJyKHJlY3QpIHtcbiAgICBpZiAocmVjdCAmJiAhKCdsZWZ0JyBpbiByZWN0ICYmICd0b3AnIGluIHJlY3QpKSB7XG4gICAgICByZWN0ID0gZXh0ZW5kKHt9LCByZWN0KTtcblxuICAgICAgcmVjdC5sZWZ0ID0gcmVjdC54IHx8IDA7XG4gICAgICByZWN0LnRvcCA9IHJlY3QueSB8fCAwO1xuICAgICAgcmVjdC5yaWdodCA9IHJlY3QucmlnaHQgfHwgcmVjdC5sZWZ0ICsgcmVjdC53aWR0aDtcbiAgICAgIHJlY3QuYm90dG9tID0gcmVjdC5ib3R0b20gfHwgcmVjdC50b3AgKyByZWN0LmhlaWdodDtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVjdDtcbiAgfSxcblxuICB0bGJyVG9YeXdoOiBmdW5jdGlvbiB0bGJyVG9YeXdoKHJlY3QpIHtcbiAgICBpZiAocmVjdCAmJiAhKCd4JyBpbiByZWN0ICYmICd5JyBpbiByZWN0KSkge1xuICAgICAgcmVjdCA9IGV4dGVuZCh7fSwgcmVjdCk7XG5cbiAgICAgIHJlY3QueCA9IHJlY3QubGVmdCB8fCAwO1xuICAgICAgcmVjdC50b3AgPSByZWN0LnRvcCB8fCAwO1xuICAgICAgcmVjdC53aWR0aCA9IHJlY3Qud2lkdGggfHwgcmVjdC5yaWdodCAtIHJlY3QueDtcbiAgICAgIHJlY3QuaGVpZ2h0ID0gcmVjdC5oZWlnaHQgfHwgcmVjdC5ib3R0b20gLSByZWN0Lnk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlY3Q7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gcmVjdFV0aWxzO1xuXG59LHtcIi4vZG9tVXRpbHNcIjozOSxcIi4vZXh0ZW5kXCI6NDEsXCIuL2lzXCI6NDZ9XSw1MjpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4ndXNlIHN0cmljdCc7XG5cbnZhciB3aW4gPSBtb2R1bGUuZXhwb3J0cztcbnZhciBpc1dpbmRvdyA9IHJlcXVpcmUoJy4vaXNXaW5kb3cnKTtcblxuZnVuY3Rpb24gaW5pdCh3aW5kb3cpIHtcbiAgLy8gZ2V0IHdyYXBwZWQgd2luZG93IGlmIHVzaW5nIFNoYWRvdyBET00gcG9seWZpbGxcblxuICB3aW4ucmVhbFdpbmRvdyA9IHdpbmRvdztcblxuICAvLyBjcmVhdGUgYSBUZXh0Tm9kZVxuICB2YXIgZWwgPSB3aW5kb3cuZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJycpO1xuXG4gIC8vIGNoZWNrIGlmIGl0J3Mgd3JhcHBlZCBieSBhIHBvbHlmaWxsXG4gIGlmIChlbC5vd25lckRvY3VtZW50ICE9PSB3aW5kb3cuZG9jdW1lbnQgJiYgdHlwZW9mIHdpbmRvdy53cmFwID09PSAnZnVuY3Rpb24nICYmIHdpbmRvdy53cmFwKGVsKSA9PT0gZWwpIHtcbiAgICAvLyB1c2Ugd3JhcHBlZCB3aW5kb3dcbiAgICB3aW5kb3cgPSB3aW5kb3cud3JhcCh3aW5kb3cpO1xuICB9XG5cbiAgd2luLndpbmRvdyA9IHdpbmRvdztcbn1cblxuaWYgKHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnKSB7XG4gIHdpbi53aW5kb3cgPSB1bmRlZmluZWQ7XG4gIHdpbi5yZWFsV2luZG93ID0gdW5kZWZpbmVkO1xufSBlbHNlIHtcbiAgaW5pdCh3aW5kb3cpO1xufVxuXG53aW4uZ2V0V2luZG93ID0gZnVuY3Rpb24gZ2V0V2luZG93KG5vZGUpIHtcbiAgaWYgKGlzV2luZG93KG5vZGUpKSB7XG4gICAgcmV0dXJuIG5vZGU7XG4gIH1cblxuICB2YXIgcm9vdE5vZGUgPSBub2RlLm93bmVyRG9jdW1lbnQgfHwgbm9kZTtcblxuICByZXR1cm4gcm9vdE5vZGUuZGVmYXVsdFZpZXcgfHwgcm9vdE5vZGUucGFyZW50V2luZG93IHx8IHdpbi53aW5kb3c7XG59O1xuXG53aW4uaW5pdCA9IGluaXQ7XG5cbn0se1wiLi9pc1dpbmRvd1wiOjQ3fV19LHt9LFsxXSkoMSlcbn0pO1xuXG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWludGVyYWN0LmpzLm1hcFxuIl0sInNvdXJjZVJvb3QiOiIifQ==