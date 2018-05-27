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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vYXBwL2FwcC50cyIsIndlYnBhY2s6Ly8vLi9hcHAvZXRlcm5pdHkudHMiLCJ3ZWJwYWNrOi8vLy4vYXBwL2ZpZWxkLnRzIiwid2VicGFjazovLy8uL2FwcC9zdGF0ZS50cyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvaW50ZXJhY3Rqcy9kaXN0L2ludGVyYWN0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDbkU4QztBQUNUO0FBRXJDLE1BQU0sS0FBSyxHQUFHLElBQUksaURBQVUsQ0FBQywwREFBZ0IsQ0FBQyxDQUFDO0FBQy9DLEtBQUssQ0FBQyxTQUFTLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7QUNKbEI7QUFBQSwyREFBMkQ7QUFDM0Qsc0ZBQXNGO0FBQ2hGLDBCQUEyQixDQUFTLEVBQUUsQ0FBUyxFQUFFLElBQVk7SUFDakUsT0FBTyxDQUNMLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMs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O0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDOztBQUVEOztBQUVBLENBQUMsRUFBRSx1QkFBdUI7QUFDMUI7O0FBRUEsaURBQWlELDBDQUEwQywwREFBMEQsRUFBRTs7QUFFdko7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsd0JBQXdCO0FBQ3hCLDBCQUEwQjs7QUFFMUI7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTs7O0FBR0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEOztBQUVBOztBQUVBLENBQUMsRUFBRSx3RkFBd0Y7QUFDM0Y7O0FBRUEsaURBQWlELDBD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QWE7QUFDMUIsZUFBZSxhQUFhO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxhQUFhO0FBQzFCLGVBQWUsYUFBYTtBQUM1QjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxhQUFhLGFBQWE7QUFDMUIsZUFBZSxhQUFhO0FBQzVCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGFBQWEscUNBQXFDO0FBQ2xELGVBQWUscUNBQXFDO0FBQ3BEO0FBQ0E7O0FBRUEsMEJBQTBCO0FBQzFCOztBQUVBO0FBQ0E7O0FBRUEsMEJBQTBCOztBQUUxQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLGVBQWU7QUFDN0M7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZDQUE2QyxxQkFBcUI7QUFDbEU7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQixhQUFhLGFBQWE7QUFDMUIsYUFBYSxRQUFRO0FBQ3JCLGNBQWMsT0FBTztBQUNyQjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNB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QUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUEsQ0FBQyxFQUFFLGtJQUFrSTtBQUNySTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLENBQUM7O0FBRUQ7O0FBRUE7O0FBRUE7O0FBRUEsQ0FBQyxFQUFFLG1IQUFtSDtBQUN0SDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtB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QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsNEJBQTRCLDJCQUEyQjtBQUN2RDs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsa0JBQWtCLGdDQUFnQztBQUNsRDs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUEsQ0FBQyxFQUFFLGdMQUFnTDtBQUNuTDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBLENBQUMsRUFBRSxzRkFBc0Y7QUFDekY7O0FBRUE7O0FBRUEsQ0FBQyxFQUFFLG1DQUFtQztBQUN0Qzs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLENBQUMsRUFBRSwrQkFBK0I7QUFDbEM7O0FBRUE7O0FBRUEsQ0FBQyxFQUFFLG1DQUFtQztBQUN0Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBLGFBQWEsYUFBYTs7QUFFMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsQ0FBQyxHQUFHO0FBQ0o7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBLENBQUMsRUFBRSwrZUFBK2U7QUFDbGY7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsZ0JBQWdCOztBQUVoQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSw0QkFBNEI7QUFDNUI7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztB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QUE0Qjs7QUFFNUI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUEscUJBQXFCLHNCQUFzQjtBQUMzQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLHVCQUF1QixzQ0FBc0M7QUFDN0Q7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEscUNBQXFDLFNBQVM7QUFDOUM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSxDQUFDLEVBQUUsa0VBQWtFO0FBQ3JFOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtB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O0FBQ0Esa0JBQWtCLG9CQUFvQjtBQUN0Qzs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxDQUFDLEdBQUc7QUFDSjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUEsQ0FBQyxFQUFFLDBDQUEwQztBQUM3Qzs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsQ0FBQyxFQUFFLFVBQVU7QUFDYjs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxDQUFDLEVBQUUsY0FBYztBQUNqQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxlQUFlLHFCQUFxQjtBQUNwQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLE9BQU87QUFDUDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxDQUFDLEVBQUUseURBQXlEO0FBQzVEOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtB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QUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxDQUFDLEVBQUUsOEJBQThCO0FBQ2pDOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxDQUFDLEdBQUc7QUFDSjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBLENBQUMsR0FBRztBQUNKOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQSxHQUFHOztBQUVIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7O0FBRUg7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG9CQUFvQixzQkFBc0I7QUFDMUM7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxDQUFDLEVBQUUsNkZBQTZGO0FBQ2hHOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsZUFBZSxxREFBcUQ7QUFDcEU7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxDQUFDLEVBQUUsY0FBYztBQUNqQjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxzQkFBc0I7O0FBRXRCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxzQkFBc0I7O0FBRXRCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBLENBQUMsRUFBRSx3Q0FBd0M7QUFDM0M7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUEsQ0FBQyxFQUFFLGdCQUFnQixFQUFFLEdBQUc7QUFDeEIsQ0FBQzs7O0FBR0QiLCJmaWxlIjoiYWxsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vYXBwL2FwcC50c1wiKTtcbiIsImltcG9ydCB7IGV0ZXJuaXR5RnVuY3Rpb24gfSBmcm9tICcuL2V0ZXJuaXR5JztcbmltcG9ydCB7IFdvcmxkRmllbGQgfSBmcm9tICcuL2ZpZWxkJztcblxuY29uc3Qgd29ybGQgPSBuZXcgV29ybGRGaWVsZChldGVybml0eUZ1bmN0aW9uKTtcbndvcmxkLnRpbWVTdGFydCgpO1xuIiwiLy8gVGhlIHJldHVybmVkIHZhbHVlIHNob3VsZCBiZSBpbiB0aGUgcmFuZ2UgZnJvbSAwIHRvIDI1NS5cbi8vIFdoZXJlIDAgaXMgYmxhY2sgYW5kIDI1NSBpcyB3aGl0ZSBhbmQgaW50ZXJtZWRpYXRlIHZhbHVlcyBhcmUgc2hhZGVzIG9mIGdyYXkgY29sb3IuXG5leHBvcnQgZnVuY3Rpb24gZXRlcm5pdHlGdW5jdGlvbih4OiBudW1iZXIsIHk6IG51bWJlciwgdGltZTogbnVtYmVyKSB7XG4gIHJldHVybiAoXG4gICAgKE1hdGguc2luKCh4ICsgTWF0aC5zaW4odGltZSAvIDEwMCkgKiAxMDApIC8gMTApICtcbiAgICAgIE1hdGguY29zKCh5ICsgTWF0aC5jb3ModGltZSAvIDEwMCkgKiAxMDApIC8gMTApKSAqXG4gICAgMjU1IC9cbiAgICAyXG4gICk7XG59XG4iLCJpbXBvcnQgKiBhcyBpbnRlcmFjdCBmcm9tICdpbnRlcmFjdGpzJztcbmltcG9ydCB7IHN0YXRlLCBzZXRWaWV3IH0gZnJvbSAnLi9zdGF0ZSc7XG5cbmV4cG9ydCBjbGFzcyBXb3JsZEZpZWxkIHtcbiAgcHJpdmF0ZSBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50O1xuICBwcml2YXRlIGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xuICBwcml2YXRlIGlzVGltZVBsYXllZCA9IGZhbHNlO1xuICBwcml2YXRlIHRpbWUgPSAxMDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGV0ZXJuaXR5RnVuY3Rpb24pIHtcbiAgICB0aGlzLmNhbnZhcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjYW52YXMnKTtcbiAgICB0aGlzLmN0eCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5maXRDYW52YXNUb1dpbmRvdyk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3doZWVsJywgdGhpcy56b29tRmllbGQpO1xuICAgIHRoaXMuZml0Q2FudmFzVG9XaW5kb3coKTtcblxuICAgIGludGVyYWN0KCcjY2FudmFzJylcbiAgICAgIC5kcmFnZ2FibGUoe1xuICAgICAgICBvbm1vdmU6IChldmVudDogaW50ZXJhY3QuSW50ZXJhY3RFdmVudCkgPT5cbiAgICAgICAgICBzZXRWaWV3KHtcbiAgICAgICAgICAgIC4uLnN0YXRlLnZpZXcsXG4gICAgICAgICAgICB4OiBzdGF0ZS52aWV3LnggKyBldmVudC5keCAvIHN0YXRlLnZpZXcuc2NhbGUsXG4gICAgICAgICAgICB5OiBzdGF0ZS52aWV3LnkgKyBldmVudC5keSAvIHN0YXRlLnZpZXcuc2NhbGVcbiAgICAgICAgICB9KVxuICAgICAgfSlcbiAgICAgIC5zdHlsZUN1cnNvcihmYWxzZSk7XG4gIH1cblxuICBwcml2YXRlIHRpbWVUaWNrKCkge1xuICAgIHRoaXMudGltZSsrO1xuICAgIHRoaXMuZHJhdygpO1xuICAgIGlmICh0aGlzLmlzVGltZVBsYXllZClcbiAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB0aGlzLnRpbWVUaWNrKCkpO1xuICB9XG5cbiAgcHVibGljIHRpbWVTdGFydCgpIHtcbiAgICB0aGlzLmlzVGltZVBsYXllZCA9IHRydWU7XG4gICAgdGhpcy50aW1lVGljaygpO1xuICB9XG5cbiAgcHVibGljIHRpbWVTdG9wID0gKCkgPT4gKHRoaXMuaXNUaW1lUGxheWVkID0gZmFsc2UpO1xuXG4gIHByaXZhdGUgZml0Q2FudmFzVG9XaW5kb3coKSB7XG4gICAgdGhpcy5jYW52YXMud2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aCAvIHN0YXRlLnNldHRpbmdzLmRpbWVuc2lvbjtcbiAgICB0aGlzLmNhbnZhcy5oZWlnaHQgPVxuICAgICAgd2luZG93LmlubmVySGVpZ2h0IC8gc3RhdGUuc2V0dGluZ3MuZGltZW5zaW9uO1xuICAgIHRoaXMuY2FudmFzLnN0eWxlLndpZHRoID0gYCR7d2luZG93LmlubmVyV2lkdGh9cHhgO1xuICAgIHRoaXMuY2FudmFzLnN0eWxlLmhlaWdodCA9IGAke3dpbmRvdy5pbm5lckhlaWdodH1weGA7XG4gIH1cblxuICBwcml2YXRlIHpvb21GaWVsZChldmVudDogV2hlZWxFdmVudCkge1xuICAgIGNvbnN0IHNjYWxlRGVsdGEgPSBldmVudC5kZWx0YVkgLyBzdGF0ZS5zZXR0aW5ncy5zY2FsZVNwZWVkO1xuICAgIGNvbnN0IG5ld1NjYWxlID0gc3RhdGUudmlldy5zY2FsZSArIHNjYWxlRGVsdGE7XG4gICAgY29uc3QgbmV3V2lkdGggPSB0aGlzLmNhbnZhcy53aWR0aCAvIG5ld1NjYWxlO1xuICAgIGNvbnN0IG5ld0hlaWdodCA9IHRoaXMuY2FudmFzLmhlaWdodCAvIG5ld1NjYWxlO1xuICAgIGNvbnN0IG9sZFdpZHRoID0gdGhpcy5jYW52YXMud2lkdGggLyBzdGF0ZS52aWV3LnNjYWxlO1xuICAgIGNvbnN0IG9sZEhlaWdodCA9IHRoaXMuY2FudmFzLmhlaWdodCAvIHN0YXRlLnZpZXcuc2NhbGU7XG4gICAgY29uc3QgYWRhcHRpdmVNb3VzZVggPVxuICAgICAgZXZlbnQucGFnZVggLyBzdGF0ZS5zZXR0aW5ncy5kaW1lbnNpb24gLyBzdGF0ZS52aWV3LnNjYWxlO1xuICAgIGNvbnN0IGFkYXB0aXZlTW91c2VZID1cbiAgICAgIGV2ZW50LnBhZ2VZIC8gc3RhdGUuc2V0dGluZ3MuZGltZW5zaW9uIC8gc3RhdGUudmlldy5zY2FsZTtcbiAgICBjb25zdCBtb3VzZVBlcmNlbnRYID1cbiAgICAgIChhZGFwdGl2ZU1vdXNlWCAtIG9sZFdpZHRoIC8gMikgLyAob2xkV2lkdGggLyAyKTtcbiAgICBjb25zdCBtb3VzZVBlcmNlbnRZID1cbiAgICAgIChhZGFwdGl2ZU1vdXNlWSAtIG9sZEhlaWdodCAvIDIpIC8gKG9sZEhlaWdodCAvIDIpO1xuICAgIGNvbnN0IHdpZHRoRGlmZiA9XG4gICAgICBvbGRXaWR0aCAtIG5ld1dpZHRoICsgKG9sZFdpZHRoIC0gbmV3V2lkdGgpICogbW91c2VQZXJjZW50WDtcbiAgICBjb25zdCBoZWlnaHREaWZmID1cbiAgICAgIG9sZEhlaWdodCAtIG5ld0hlaWdodCArIChvbGRIZWlnaHQgLSBuZXdIZWlnaHQpICogbW91c2VQZXJjZW50WTtcbiAgICBjb25zdCB4RGlmZiA9IHdpZHRoRGlmZiAvIDIgKiBzdGF0ZS5zZXR0aW5ncy5kaW1lbnNpb247XG4gICAgY29uc3QgeURpZmYgPSBoZWlnaHREaWZmIC8gMiAqIHN0YXRlLnNldHRpbmdzLmRpbWVuc2lvbjtcbiAgICBzZXRWaWV3KHtcbiAgICAgIC4uLnN0YXRlLnZpZXcsXG4gICAgICB4OiBzdGF0ZS52aWV3LnggLSB4RGlmZixcbiAgICAgIHk6IHN0YXRlLnZpZXcueSAtIHlEaWZmLFxuICAgICAgc2NhbGU6IG5ld1NjYWxlXG4gICAgfSk7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgfVxuXG4gIHByaXZhdGUgZHJhdygpIHtcbiAgICBjb25zdCB7IHdpZHRoLCBoZWlnaHQgfSA9IHRoaXMuY2FudmFzO1xuXG4gICAgY29uc3QgZHJhd1BpeGVsID0gKHg6IG51bWJlciwgeTogbnVtYmVyLCBjb2xvcjogbnVtYmVyKSA9PiB7XG4gICAgICB4ID0gTWF0aC5yb3VuZCh4KTtcbiAgICAgIHkgPSBNYXRoLnJvdW5kKHkpO1xuICAgICAgY29uc3QgaGV4Q29sb3JHcmF5ID0gTWF0aC5yb3VuZChjb2xvcik7XG4gICAgICBsZXQgaGV4Q29sb3IgPSBgcmdiKCR7aGV4Q29sb3JHcmF5fSwke2hleENvbG9yR3JheX0sJHtoZXhDb2xvckdyYXl9KWA7XG4gICAgICBpZiAoY29sb3IgPiAyNTUpIGhleENvbG9yID0gJyNmZjAwMDAnO1xuICAgICAgaWYgKGNvbG9yIDwgMCkgaGV4Q29sb3IgPSAnIzAwZmYwMCc7XG4gICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBoZXhDb2xvcjtcbiAgICAgIHRoaXMuY3R4LmZpbGxSZWN0KHgsIHksIDEsIDEpO1xuICAgIH07XG5cbiAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSAnIzAwMCc7XG4gICAgdGhpcy5jdHguZmlsbFJlY3QoMCwgMCwgdGhpcy5jYW52YXMud2lkdGgsIHRoaXMuY2FudmFzLmhlaWdodCk7XG4gICAgdGhpcy5jdHguZmlsbFN0eWxlID0gJyNmZmYnO1xuXG4gICAgQXJyYXkod2lkdGggKiBoZWlnaHQpXG4gICAgICAuZmlsbCgwKVxuICAgICAgLm1hcCgodiwgaSkgPT4ge1xuICAgICAgICBjb25zdCB4ID0gaSAlIHdpZHRoO1xuICAgICAgICBjb25zdCB5ID0gTWF0aC5mbG9vcihpIC8gd2lkdGgpO1xuXG4gICAgICAgIGNvbnN0IGV0WCA9XG4gICAgICAgICAgeCAvIHN0YXRlLnZpZXcuc2NhbGUgLVxuICAgICAgICAgIHN0YXRlLnZpZXcueCAvIHN0YXRlLnNldHRpbmdzLmRpbWVuc2lvbjtcbiAgICAgICAgY29uc3QgZXRZID1cbiAgICAgICAgICB5IC8gc3RhdGUudmlldy5zY2FsZSAtXG4gICAgICAgICAgc3RhdGUudmlldy55IC8gc3RhdGUuc2V0dGluZ3MuZGltZW5zaW9uO1xuXG4gICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5ldGVybml0eUZ1bmN0aW9uKGV0WCwgZXRZLCB0aGlzLnRpbWUpO1xuICAgICAgICBpZiAodmFsdWUgPiAwKSBkcmF3UGl4ZWwoeCwgeSwgdmFsdWUpO1xuICAgICAgfSk7XG4gIH1cbn1cbiIsImV4cG9ydCBpbnRlcmZhY2UgVmlld1N0YXRlIHtcbiAgeDogbnVtYmVyO1xuICB5OiBudW1iZXI7XG4gIHNjYWxlOiBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU2V0dGluZ3NTdGF0ZSB7XG4gIHNjYWxlU3BlZWQ6IG51bWJlcjtcbiAgZGltZW5zaW9uOiBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3RhdGUge1xuICB2aWV3OiBWaWV3U3RhdGU7XG4gIHNldHRpbmdzOiBTZXR0aW5nc1N0YXRlO1xufVxuXG5leHBvcnQgY29uc3Qgc3RhdGU6IFN0YXRlID0ge1xuICB2aWV3OiB7XG4gICAgeDogMCxcbiAgICB5OiAwLFxuICAgIHNjYWxlOiAwLjVcbiAgfSxcbiAgc2V0dGluZ3M6IHtcbiAgICBzY2FsZVNwZWVkOiAxMDAwLFxuICAgIGRpbWVuc2lvbjogNFxuICB9XG59O1xuXG5leHBvcnQgY29uc3Qgc2V0VmlldyA9ICh2aWV3U3RhdGU6IFZpZXdTdGF0ZSkgPT5cbiAgKHN0YXRlLnZpZXcgPSB2aWV3U3RhdGUpO1xuIiwiLyoqXG4gKiBpbnRlcmFjdC5qcyB2MS4zLjRcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTItMjAxOCBUYXllIEFkZXllbWkgPGRldkB0YXllLm1lPlxuICogUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuICogaHR0cHM6Ly9yYXcuZ2l0aHViLmNvbS90YXllL2ludGVyYWN0LmpzL21hc3Rlci9MSUNFTlNFXG4gKi9cbihmdW5jdGlvbihmKXtpZih0eXBlb2YgZXhwb3J0cz09PVwib2JqZWN0XCImJnR5cGVvZiBtb2R1bGUhPT1cInVuZGVmaW5lZFwiKXttb2R1bGUuZXhwb3J0cz1mKCl9ZWxzZSBpZih0eXBlb2YgZGVmaW5lPT09XCJmdW5jdGlvblwiJiZkZWZpbmUuYW1kKXtkZWZpbmUoW10sZil9ZWxzZXt2YXIgZztpZih0eXBlb2Ygd2luZG93IT09XCJ1bmRlZmluZWRcIil7Zz13aW5kb3d9ZWxzZSBpZih0eXBlb2YgZ2xvYmFsIT09XCJ1bmRlZmluZWRcIil7Zz1nbG9iYWx9ZWxzZSBpZih0eXBlb2Ygc2VsZiE9PVwidW5kZWZpbmVkXCIpe2c9c2VsZn1lbHNle2c9dGhpc31nLmludGVyYWN0ID0gZigpfX0pKGZ1bmN0aW9uKCl7dmFyIGRlZmluZSxtb2R1bGUsZXhwb3J0cztyZXR1cm4gKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkoezE6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG4vKlxuICogSW4gYSAod2luZG93bGVzcykgc2VydmVyIGVudmlyb25tZW50IHRoaXMgZmlsZSBleHBvcnRzIGEgZmFjdG9yeSBmdW5jdGlvblxuICogdGhhdCB0YWtlcyB0aGUgd2luZG93IHRvIHVzZS5cbiAqXG4gKiAgICAgdmFyIGludGVyYWN0ID0gcmVxdWlyZSgnaW50ZXJhY3QuanMnKSh3aW5kb3dPYmplY3QpO1xuICpcbiAqIFNlZSBodHRwczovL2dpdGh1Yi5jb20vdGF5ZS9pbnRlcmFjdC5qcy9pc3N1ZXMvMTg3XG4gKi9cbmlmICh0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJykge1xuICBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh3aW5kb3cpIHtcbiAgICByZXF1aXJlKCcuL3NyYy91dGlscy93aW5kb3cnKS5pbml0KHdpbmRvdyk7XG5cbiAgICByZXR1cm4gcmVxdWlyZSgnLi9zcmMvaW5kZXgnKTtcbiAgfTtcbn0gZWxzZSB7XG4gIG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9zcmMvaW5kZXgnKTtcbn1cblxufSx7XCIuL3NyYy9pbmRleFwiOjE5LFwiLi9zcmMvdXRpbHMvd2luZG93XCI6NTJ9XSwyOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxudmFyIGV4dGVuZCA9IHJlcXVpcmUoJy4vdXRpbHMvZXh0ZW5kLmpzJyk7XG5cbmZ1bmN0aW9uIGZpcmVVbnRpbEltbWVkaWF0ZVN0b3BwZWQoZXZlbnQsIGxpc3RlbmVycykge1xuICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGlzdGVuZXJzLmxlbmd0aDsgX2krKykge1xuICAgIHZhciBfcmVmO1xuXG4gICAgX3JlZiA9IGxpc3RlbmVyc1tfaV07XG4gICAgdmFyIGxpc3RlbmVyID0gX3JlZjtcblxuICAgIGlmIChldmVudC5pbW1lZGlhdGVQcm9wYWdhdGlvblN0b3BwZWQpIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGxpc3RlbmVyKGV2ZW50KTtcbiAgfVxufVxuXG52YXIgRXZlbnRhYmxlID0gZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBFdmVudGFibGUob3B0aW9ucykge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBFdmVudGFibGUpO1xuXG4gICAgdGhpcy5vcHRpb25zID0gZXh0ZW5kKHt9LCBvcHRpb25zIHx8IHt9KTtcbiAgfVxuXG4gIEV2ZW50YWJsZS5wcm90b3R5cGUuZmlyZSA9IGZ1bmN0aW9uIGZpcmUoZXZlbnQpIHtcbiAgICB2YXIgbGlzdGVuZXJzID0gdm9pZCAwO1xuICAgIHZhciBvbkV2ZW50ID0gJ29uJyArIGV2ZW50LnR5cGU7XG4gICAgdmFyIGdsb2JhbCA9IHRoaXMuZ2xvYmFsO1xuXG4gICAgLy8gSW50ZXJhY3RhYmxlI29uKCkgbGlzdGVuZXJzXG4gICAgaWYgKGxpc3RlbmVycyA9IHRoaXNbZXZlbnQudHlwZV0pIHtcbiAgICAgIGZpcmVVbnRpbEltbWVkaWF0ZVN0b3BwZWQoZXZlbnQsIGxpc3RlbmVycyk7XG4gICAgfVxuXG4gICAgLy8gaW50ZXJhY3RhYmxlLm9uZXZlbnQgbGlzdGVuZXJcbiAgICBpZiAodGhpc1tvbkV2ZW50XSkge1xuICAgICAgdGhpc1tvbkV2ZW50XShldmVudCk7XG4gICAgfVxuXG4gICAgLy8gaW50ZXJhY3Qub24oKSBsaXN0ZW5lcnNcbiAgICBpZiAoIWV2ZW50LnByb3BhZ2F0aW9uU3RvcHBlZCAmJiBnbG9iYWwgJiYgKGxpc3RlbmVycyA9IGdsb2JhbFtldmVudC50eXBlXSkpIHtcbiAgICAgIGZpcmVVbnRpbEltbWVkaWF0ZVN0b3BwZWQoZXZlbnQsIGxpc3RlbmVycyk7XG4gICAgfVxuICB9O1xuXG4gIEV2ZW50YWJsZS5wcm90b3R5cGUub24gPSBmdW5jdGlvbiBvbihldmVudFR5cGUsIGxpc3RlbmVyKSB7XG4gICAgLy8gaWYgdGhpcyB0eXBlIG9mIGV2ZW50IHdhcyBuZXZlciBib3VuZFxuICAgIGlmICh0aGlzW2V2ZW50VHlwZV0pIHtcbiAgICAgIHRoaXNbZXZlbnRUeXBlXS5wdXNoKGxpc3RlbmVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpc1tldmVudFR5cGVdID0gW2xpc3RlbmVyXTtcbiAgICB9XG4gIH07XG5cbiAgRXZlbnRhYmxlLnByb3RvdHlwZS5vZmYgPSBmdW5jdGlvbiBvZmYoZXZlbnRUeXBlLCBsaXN0ZW5lcikge1xuICAgIC8vIGlmIGl0IGlzIGFuIGFjdGlvbiBldmVudCB0eXBlXG4gICAgdmFyIGV2ZW50TGlzdCA9IHRoaXNbZXZlbnRUeXBlXTtcbiAgICB2YXIgaW5kZXggPSBldmVudExpc3QgPyBldmVudExpc3QuaW5kZXhPZihsaXN0ZW5lcikgOiAtMTtcblxuICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgIGV2ZW50TGlzdC5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cblxuICAgIGlmIChldmVudExpc3QgJiYgZXZlbnRMaXN0Lmxlbmd0aCA9PT0gMCB8fCAhbGlzdGVuZXIpIHtcbiAgICAgIHRoaXNbZXZlbnRUeXBlXSA9IHVuZGVmaW5lZDtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIEV2ZW50YWJsZTtcbn0oKTtcblxubW9kdWxlLmV4cG9ydHMgPSBFdmVudGFibGU7XG5cbn0se1wiLi91dGlscy9leHRlbmQuanNcIjo0MX1dLDM6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG52YXIgZXh0ZW5kID0gcmVxdWlyZSgnLi91dGlscy9leHRlbmQnKTtcbnZhciBnZXRPcmlnaW5YWSA9IHJlcXVpcmUoJy4vdXRpbHMvZ2V0T3JpZ2luWFknKTtcbnZhciBkZWZhdWx0cyA9IHJlcXVpcmUoJy4vZGVmYXVsdE9wdGlvbnMnKTtcbnZhciBzaWduYWxzID0gcmVxdWlyZSgnLi91dGlscy9TaWduYWxzJykubmV3KCk7XG5cbnZhciBJbnRlcmFjdEV2ZW50ID0gZnVuY3Rpb24gKCkge1xuICAvKiogKi9cbiAgZnVuY3Rpb24gSW50ZXJhY3RFdmVudChpbnRlcmFjdGlvbiwgZXZlbnQsIGFjdGlvbiwgcGhhc2UsIGVsZW1lbnQsIHJlbGF0ZWQpIHtcbiAgICB2YXIgcHJlRW5kID0gYXJndW1lbnRzLmxlbmd0aCA+IDYgJiYgYXJndW1lbnRzWzZdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbNl0gOiBmYWxzZTtcblxuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBJbnRlcmFjdEV2ZW50KTtcblxuICAgIHZhciB0YXJnZXQgPSBpbnRlcmFjdGlvbi50YXJnZXQ7XG4gICAgdmFyIGRlbHRhU291cmNlID0gKHRhcmdldCAmJiB0YXJnZXQub3B0aW9ucyB8fCBkZWZhdWx0cykuZGVsdGFTb3VyY2U7XG4gICAgdmFyIG9yaWdpbiA9IGdldE9yaWdpblhZKHRhcmdldCwgZWxlbWVudCwgYWN0aW9uKTtcbiAgICB2YXIgc3RhcnRpbmcgPSBwaGFzZSA9PT0gJ3N0YXJ0JztcbiAgICB2YXIgZW5kaW5nID0gcGhhc2UgPT09ICdlbmQnO1xuICAgIHZhciBjb29yZHMgPSBzdGFydGluZyA/IGludGVyYWN0aW9uLnN0YXJ0Q29vcmRzIDogaW50ZXJhY3Rpb24uY3VyQ29vcmRzO1xuICAgIHZhciBwcmV2RXZlbnQgPSBpbnRlcmFjdGlvbi5wcmV2RXZlbnQ7XG5cbiAgICBlbGVtZW50ID0gZWxlbWVudCB8fCBpbnRlcmFjdGlvbi5lbGVtZW50O1xuXG4gICAgdmFyIHBhZ2UgPSBleHRlbmQoe30sIGNvb3Jkcy5wYWdlKTtcbiAgICB2YXIgY2xpZW50ID0gZXh0ZW5kKHt9LCBjb29yZHMuY2xpZW50KTtcblxuICAgIHBhZ2UueCAtPSBvcmlnaW4ueDtcbiAgICBwYWdlLnkgLT0gb3JpZ2luLnk7XG5cbiAgICBjbGllbnQueCAtPSBvcmlnaW4ueDtcbiAgICBjbGllbnQueSAtPSBvcmlnaW4ueTtcblxuICAgIHRoaXMuY3RybEtleSA9IGV2ZW50LmN0cmxLZXk7XG4gICAgdGhpcy5hbHRLZXkgPSBldmVudC5hbHRLZXk7XG4gICAgdGhpcy5zaGlmdEtleSA9IGV2ZW50LnNoaWZ0S2V5O1xuICAgIHRoaXMubWV0YUtleSA9IGV2ZW50Lm1ldGFLZXk7XG4gICAgdGhpcy5idXR0b24gPSBldmVudC5idXR0b247XG4gICAgdGhpcy5idXR0b25zID0gZXZlbnQuYnV0dG9ucztcbiAgICB0aGlzLnRhcmdldCA9IGVsZW1lbnQ7XG4gICAgdGhpcy5jdXJyZW50VGFyZ2V0ID0gZWxlbWVudDtcbiAgICB0aGlzLnJlbGF0ZWRUYXJnZXQgPSByZWxhdGVkIHx8IG51bGw7XG4gICAgdGhpcy5wcmVFbmQgPSBwcmVFbmQ7XG4gICAgdGhpcy50eXBlID0gYWN0aW9uICsgKHBoYXNlIHx8ICcnKTtcbiAgICB0aGlzLmludGVyYWN0aW9uID0gaW50ZXJhY3Rpb247XG4gICAgdGhpcy5pbnRlcmFjdGFibGUgPSB0YXJnZXQ7XG5cbiAgICB0aGlzLnQwID0gc3RhcnRpbmcgPyBpbnRlcmFjdGlvbi5kb3duVGltZXNbaW50ZXJhY3Rpb24uZG93blRpbWVzLmxlbmd0aCAtIDFdIDogcHJldkV2ZW50LnQwO1xuXG4gICAgdmFyIHNpZ25hbEFyZyA9IHtcbiAgICAgIGludGVyYWN0aW9uOiBpbnRlcmFjdGlvbixcbiAgICAgIGV2ZW50OiBldmVudCxcbiAgICAgIGFjdGlvbjogYWN0aW9uLFxuICAgICAgcGhhc2U6IHBoYXNlLFxuICAgICAgZWxlbWVudDogZWxlbWVudCxcbiAgICAgIHJlbGF0ZWQ6IHJlbGF0ZWQsXG4gICAgICBwYWdlOiBwYWdlLFxuICAgICAgY2xpZW50OiBjbGllbnQsXG4gICAgICBjb29yZHM6IGNvb3JkcyxcbiAgICAgIHN0YXJ0aW5nOiBzdGFydGluZyxcbiAgICAgIGVuZGluZzogZW5kaW5nLFxuICAgICAgZGVsdGFTb3VyY2U6IGRlbHRhU291cmNlLFxuICAgICAgaUV2ZW50OiB0aGlzXG4gICAgfTtcblxuICAgIHNpZ25hbHMuZmlyZSgnc2V0LXh5Jywgc2lnbmFsQXJnKTtcblxuICAgIGlmIChlbmRpbmcpIHtcbiAgICAgIC8vIHVzZSBwcmV2aW91cyBjb29yZHMgd2hlbiBlbmRpbmdcbiAgICAgIHRoaXMucGFnZVggPSBwcmV2RXZlbnQucGFnZVg7XG4gICAgICB0aGlzLnBhZ2VZID0gcHJldkV2ZW50LnBhZ2VZO1xuICAgICAgdGhpcy5jbGllbnRYID0gcHJldkV2ZW50LmNsaWVudFg7XG4gICAgICB0aGlzLmNsaWVudFkgPSBwcmV2RXZlbnQuY2xpZW50WTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wYWdlWCA9IHBhZ2UueDtcbiAgICAgIHRoaXMucGFnZVkgPSBwYWdlLnk7XG4gICAgICB0aGlzLmNsaWVudFggPSBjbGllbnQueDtcbiAgICAgIHRoaXMuY2xpZW50WSA9IGNsaWVudC55O1xuICAgIH1cblxuICAgIHRoaXMueDAgPSBpbnRlcmFjdGlvbi5zdGFydENvb3Jkcy5wYWdlLnggLSBvcmlnaW4ueDtcbiAgICB0aGlzLnkwID0gaW50ZXJhY3Rpb24uc3RhcnRDb29yZHMucGFnZS55IC0gb3JpZ2luLnk7XG4gICAgdGhpcy5jbGllbnRYMCA9IGludGVyYWN0aW9uLnN0YXJ0Q29vcmRzLmNsaWVudC54IC0gb3JpZ2luLng7XG4gICAgdGhpcy5jbGllbnRZMCA9IGludGVyYWN0aW9uLnN0YXJ0Q29vcmRzLmNsaWVudC55IC0gb3JpZ2luLnk7XG5cbiAgICBzaWduYWxzLmZpcmUoJ3NldC1kZWx0YScsIHNpZ25hbEFyZyk7XG5cbiAgICB0aGlzLnRpbWVTdGFtcCA9IGNvb3Jkcy50aW1lU3RhbXA7XG4gICAgdGhpcy5kdCA9IGludGVyYWN0aW9uLnBvaW50ZXJEZWx0YS50aW1lU3RhbXA7XG4gICAgdGhpcy5kdXJhdGlvbiA9IHRoaXMudGltZVN0YW1wIC0gdGhpcy50MDtcblxuICAgIC8vIHNwZWVkIGFuZCB2ZWxvY2l0eSBpbiBwaXhlbHMgcGVyIHNlY29uZFxuICAgIHRoaXMuc3BlZWQgPSBpbnRlcmFjdGlvbi5wb2ludGVyRGVsdGFbZGVsdGFTb3VyY2VdLnNwZWVkO1xuICAgIHRoaXMudmVsb2NpdHlYID0gaW50ZXJhY3Rpb24ucG9pbnRlckRlbHRhW2RlbHRhU291cmNlXS52eDtcbiAgICB0aGlzLnZlbG9jaXR5WSA9IGludGVyYWN0aW9uLnBvaW50ZXJEZWx0YVtkZWx0YVNvdXJjZV0udnk7XG5cbiAgICB0aGlzLnN3aXBlID0gZW5kaW5nIHx8IHBoYXNlID09PSAnaW5lcnRpYXN0YXJ0JyA/IHRoaXMuZ2V0U3dpcGUoKSA6IG51bGw7XG5cbiAgICBzaWduYWxzLmZpcmUoJ25ldycsIHNpZ25hbEFyZyk7XG4gIH1cblxuICBJbnRlcmFjdEV2ZW50LnByb3RvdHlwZS5nZXRTd2lwZSA9IGZ1bmN0aW9uIGdldFN3aXBlKCkge1xuICAgIHZhciBpbnRlcmFjdGlvbiA9IHRoaXMuaW50ZXJhY3Rpb247XG5cbiAgICBpZiAoaW50ZXJhY3Rpb24ucHJldkV2ZW50LnNwZWVkIDwgNjAwIHx8IHRoaXMudGltZVN0YW1wIC0gaW50ZXJhY3Rpb24ucHJldkV2ZW50LnRpbWVTdGFtcCA+IDE1MCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgdmFyIGFuZ2xlID0gMTgwICogTWF0aC5hdGFuMihpbnRlcmFjdGlvbi5wcmV2RXZlbnQudmVsb2NpdHlZLCBpbnRlcmFjdGlvbi5wcmV2RXZlbnQudmVsb2NpdHlYKSAvIE1hdGguUEk7XG4gICAgdmFyIG92ZXJsYXAgPSAyMi41O1xuXG4gICAgaWYgKGFuZ2xlIDwgMCkge1xuICAgICAgYW5nbGUgKz0gMzYwO1xuICAgIH1cblxuICAgIHZhciBsZWZ0ID0gMTM1IC0gb3ZlcmxhcCA8PSBhbmdsZSAmJiBhbmdsZSA8IDIyNSArIG92ZXJsYXA7XG4gICAgdmFyIHVwID0gMjI1IC0gb3ZlcmxhcCA8PSBhbmdsZSAmJiBhbmdsZSA8IDMxNSArIG92ZXJsYXA7XG5cbiAgICB2YXIgcmlnaHQgPSAhbGVmdCAmJiAoMzE1IC0gb3ZlcmxhcCA8PSBhbmdsZSB8fCBhbmdsZSA8IDQ1ICsgb3ZlcmxhcCk7XG4gICAgdmFyIGRvd24gPSAhdXAgJiYgNDUgLSBvdmVybGFwIDw9IGFuZ2xlICYmIGFuZ2xlIDwgMTM1ICsgb3ZlcmxhcDtcblxuICAgIHJldHVybiB7XG4gICAgICB1cDogdXAsXG4gICAgICBkb3duOiBkb3duLFxuICAgICAgbGVmdDogbGVmdCxcbiAgICAgIHJpZ2h0OiByaWdodCxcbiAgICAgIGFuZ2xlOiBhbmdsZSxcbiAgICAgIHNwZWVkOiBpbnRlcmFjdGlvbi5wcmV2RXZlbnQuc3BlZWQsXG4gICAgICB2ZWxvY2l0eToge1xuICAgICAgICB4OiBpbnRlcmFjdGlvbi5wcmV2RXZlbnQudmVsb2NpdHlYLFxuICAgICAgICB5OiBpbnRlcmFjdGlvbi5wcmV2RXZlbnQudmVsb2NpdHlZXG4gICAgICB9XG4gICAgfTtcbiAgfTtcblxuICBJbnRlcmFjdEV2ZW50LnByb3RvdHlwZS5wcmV2ZW50RGVmYXVsdCA9IGZ1bmN0aW9uIHByZXZlbnREZWZhdWx0KCkge307XG5cbiAgLyoqICovXG5cblxuICBJbnRlcmFjdEV2ZW50LnByb3RvdHlwZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24gPSBmdW5jdGlvbiBzdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKSB7XG4gICAgdGhpcy5pbW1lZGlhdGVQcm9wYWdhdGlvblN0b3BwZWQgPSB0aGlzLnByb3BhZ2F0aW9uU3RvcHBlZCA9IHRydWU7XG4gIH07XG5cbiAgLyoqICovXG5cblxuICBJbnRlcmFjdEV2ZW50LnByb3RvdHlwZS5zdG9wUHJvcGFnYXRpb24gPSBmdW5jdGlvbiBzdG9wUHJvcGFnYXRpb24oKSB7XG4gICAgdGhpcy5wcm9wYWdhdGlvblN0b3BwZWQgPSB0cnVlO1xuICB9O1xuXG4gIHJldHVybiBJbnRlcmFjdEV2ZW50O1xufSgpO1xuXG5zaWduYWxzLm9uKCdzZXQtZGVsdGEnLCBmdW5jdGlvbiAoX3JlZikge1xuICB2YXIgaUV2ZW50ID0gX3JlZi5pRXZlbnQsXG4gICAgICBpbnRlcmFjdGlvbiA9IF9yZWYuaW50ZXJhY3Rpb24sXG4gICAgICBzdGFydGluZyA9IF9yZWYuc3RhcnRpbmcsXG4gICAgICBkZWx0YVNvdXJjZSA9IF9yZWYuZGVsdGFTb3VyY2U7XG5cbiAgdmFyIHByZXZFdmVudCA9IHN0YXJ0aW5nID8gaUV2ZW50IDogaW50ZXJhY3Rpb24ucHJldkV2ZW50O1xuXG4gIGlmIChkZWx0YVNvdXJjZSA9PT0gJ2NsaWVudCcpIHtcbiAgICBpRXZlbnQuZHggPSBpRXZlbnQuY2xpZW50WCAtIHByZXZFdmVudC5jbGllbnRYO1xuICAgIGlFdmVudC5keSA9IGlFdmVudC5jbGllbnRZIC0gcHJldkV2ZW50LmNsaWVudFk7XG4gIH0gZWxzZSB7XG4gICAgaUV2ZW50LmR4ID0gaUV2ZW50LnBhZ2VYIC0gcHJldkV2ZW50LnBhZ2VYO1xuICAgIGlFdmVudC5keSA9IGlFdmVudC5wYWdlWSAtIHByZXZFdmVudC5wYWdlWTtcbiAgfVxufSk7XG5cbkludGVyYWN0RXZlbnQuc2lnbmFscyA9IHNpZ25hbHM7XG5cbm1vZHVsZS5leHBvcnRzID0gSW50ZXJhY3RFdmVudDtcblxufSx7XCIuL2RlZmF1bHRPcHRpb25zXCI6MTgsXCIuL3V0aWxzL1NpZ25hbHNcIjozNCxcIi4vdXRpbHMvZXh0ZW5kXCI6NDEsXCIuL3V0aWxzL2dldE9yaWdpblhZXCI6NDJ9XSw0OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxudmFyIGNsb25lID0gcmVxdWlyZSgnLi91dGlscy9jbG9uZScpO1xudmFyIGlzID0gcmVxdWlyZSgnLi91dGlscy9pcycpO1xudmFyIGV2ZW50cyA9IHJlcXVpcmUoJy4vdXRpbHMvZXZlbnRzJyk7XG52YXIgZXh0ZW5kID0gcmVxdWlyZSgnLi91dGlscy9leHRlbmQnKTtcbnZhciBhY3Rpb25zID0gcmVxdWlyZSgnLi9hY3Rpb25zL2Jhc2UnKTtcbnZhciBzY29wZSA9IHJlcXVpcmUoJy4vc2NvcGUnKTtcbnZhciBFdmVudGFibGUgPSByZXF1aXJlKCcuL0V2ZW50YWJsZScpO1xudmFyIGRlZmF1bHRzID0gcmVxdWlyZSgnLi9kZWZhdWx0T3B0aW9ucycpO1xudmFyIHNpZ25hbHMgPSByZXF1aXJlKCcuL3V0aWxzL1NpZ25hbHMnKS5uZXcoKTtcblxudmFyIF9yZXF1aXJlID0gcmVxdWlyZSgnLi91dGlscy9kb21VdGlscycpLFxuICAgIGdldEVsZW1lbnRSZWN0ID0gX3JlcXVpcmUuZ2V0RWxlbWVudFJlY3QsXG4gICAgbm9kZUNvbnRhaW5zID0gX3JlcXVpcmUubm9kZUNvbnRhaW5zLFxuICAgIHRyeVNlbGVjdG9yID0gX3JlcXVpcmUudHJ5U2VsZWN0b3IsXG4gICAgbWF0Y2hlc1NlbGVjdG9yID0gX3JlcXVpcmUubWF0Y2hlc1NlbGVjdG9yO1xuXG52YXIgX3JlcXVpcmUyID0gcmVxdWlyZSgnLi91dGlscy93aW5kb3cnKSxcbiAgICBnZXRXaW5kb3cgPSBfcmVxdWlyZTIuZ2V0V2luZG93O1xuXG52YXIgX3JlcXVpcmUzID0gcmVxdWlyZSgnLi91dGlscy9hcnInKSxcbiAgICBjb250YWlucyA9IF9yZXF1aXJlMy5jb250YWlucztcblxudmFyIF9yZXF1aXJlNCA9IHJlcXVpcmUoJy4vdXRpbHMvYnJvd3NlcicpLFxuICAgIHdoZWVsRXZlbnQgPSBfcmVxdWlyZTQud2hlZWxFdmVudDtcblxuLy8gYWxsIHNldCBpbnRlcmFjdGFibGVzXG5cblxuc2NvcGUuaW50ZXJhY3RhYmxlcyA9IFtdO1xuXG52YXIgSW50ZXJhY3RhYmxlID0gZnVuY3Rpb24gKCkge1xuICAvKiogKi9cbiAgZnVuY3Rpb24gSW50ZXJhY3RhYmxlKHRhcmdldCwgb3B0aW9ucykge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBJbnRlcmFjdGFibGUpO1xuXG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgICB0aGlzLnRhcmdldCA9IHRhcmdldDtcbiAgICB0aGlzLmV2ZW50cyA9IG5ldyBFdmVudGFibGUoKTtcbiAgICB0aGlzLl9jb250ZXh0ID0gb3B0aW9ucy5jb250ZXh0IHx8IHNjb3BlLmRvY3VtZW50O1xuICAgIHRoaXMuX3dpbiA9IGdldFdpbmRvdyh0cnlTZWxlY3Rvcih0YXJnZXQpID8gdGhpcy5fY29udGV4dCA6IHRhcmdldCk7XG4gICAgdGhpcy5fZG9jID0gdGhpcy5fd2luLmRvY3VtZW50O1xuXG4gICAgc2lnbmFscy5maXJlKCduZXcnLCB7XG4gICAgICB0YXJnZXQ6IHRhcmdldCxcbiAgICAgIG9wdGlvbnM6IG9wdGlvbnMsXG4gICAgICBpbnRlcmFjdGFibGU6IHRoaXMsXG4gICAgICB3aW46IHRoaXMuX3dpblxuICAgIH0pO1xuXG4gICAgc2NvcGUuYWRkRG9jdW1lbnQodGhpcy5fZG9jLCB0aGlzLl93aW4pO1xuXG4gICAgc2NvcGUuaW50ZXJhY3RhYmxlcy5wdXNoKHRoaXMpO1xuXG4gICAgdGhpcy5zZXQob3B0aW9ucyk7XG4gIH1cblxuICBJbnRlcmFjdGFibGUucHJvdG90eXBlLnNldE9uRXZlbnRzID0gZnVuY3Rpb24gc2V0T25FdmVudHMoYWN0aW9uLCBwaGFzZXMpIHtcbiAgICB2YXIgb25BY3Rpb24gPSAnb24nICsgYWN0aW9uO1xuXG4gICAgaWYgKGlzLmZ1bmN0aW9uKHBoYXNlcy5vbnN0YXJ0KSkge1xuICAgICAgdGhpcy5ldmVudHNbb25BY3Rpb24gKyAnc3RhcnQnXSA9IHBoYXNlcy5vbnN0YXJ0O1xuICAgIH1cbiAgICBpZiAoaXMuZnVuY3Rpb24ocGhhc2VzLm9ubW92ZSkpIHtcbiAgICAgIHRoaXMuZXZlbnRzW29uQWN0aW9uICsgJ21vdmUnXSA9IHBoYXNlcy5vbm1vdmU7XG4gICAgfVxuICAgIGlmIChpcy5mdW5jdGlvbihwaGFzZXMub25lbmQpKSB7XG4gICAgICB0aGlzLmV2ZW50c1tvbkFjdGlvbiArICdlbmQnXSA9IHBoYXNlcy5vbmVuZDtcbiAgICB9XG4gICAgaWYgKGlzLmZ1bmN0aW9uKHBoYXNlcy5vbmluZXJ0aWFzdGFydCkpIHtcbiAgICAgIHRoaXMuZXZlbnRzW29uQWN0aW9uICsgJ2luZXJ0aWFzdGFydCddID0gcGhhc2VzLm9uaW5lcnRpYXN0YXJ0O1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIEludGVyYWN0YWJsZS5wcm90b3R5cGUuc2V0UGVyQWN0aW9uID0gZnVuY3Rpb24gc2V0UGVyQWN0aW9uKGFjdGlvbiwgb3B0aW9ucykge1xuICAgIC8vIGZvciBhbGwgdGhlIGRlZmF1bHQgcGVyLWFjdGlvbiBvcHRpb25zXG4gICAgZm9yICh2YXIgb3B0aW9uIGluIG9wdGlvbnMpIHtcbiAgICAgIC8vIGlmIHRoaXMgb3B0aW9uIGV4aXN0cyBmb3IgdGhpcyBhY3Rpb25cbiAgICAgIGlmIChvcHRpb24gaW4gZGVmYXVsdHNbYWN0aW9uXSkge1xuICAgICAgICAvLyBpZiB0aGUgb3B0aW9uIGluIHRoZSBvcHRpb25zIGFyZyBpcyBhbiBvYmplY3QgdmFsdWVcbiAgICAgICAgaWYgKGlzLm9iamVjdChvcHRpb25zW29wdGlvbl0pKSB7XG4gICAgICAgICAgLy8gZHVwbGljYXRlIHRoZSBvYmplY3QgYW5kIG1lcmdlXG4gICAgICAgICAgdGhpcy5vcHRpb25zW2FjdGlvbl1bb3B0aW9uXSA9IGNsb25lKHRoaXMub3B0aW9uc1thY3Rpb25dW29wdGlvbl0gfHwge30pO1xuICAgICAgICAgIGV4dGVuZCh0aGlzLm9wdGlvbnNbYWN0aW9uXVtvcHRpb25dLCBvcHRpb25zW29wdGlvbl0pO1xuXG4gICAgICAgICAgaWYgKGlzLm9iamVjdChkZWZhdWx0cy5wZXJBY3Rpb25bb3B0aW9uXSkgJiYgJ2VuYWJsZWQnIGluIGRlZmF1bHRzLnBlckFjdGlvbltvcHRpb25dKSB7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnNbYWN0aW9uXVtvcHRpb25dLmVuYWJsZWQgPSBvcHRpb25zW29wdGlvbl0uZW5hYmxlZCA9PT0gZmFsc2UgPyBmYWxzZSA6IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGlzLmJvb2wob3B0aW9uc1tvcHRpb25dKSAmJiBpcy5vYmplY3QoZGVmYXVsdHMucGVyQWN0aW9uW29wdGlvbl0pKSB7XG4gICAgICAgICAgdGhpcy5vcHRpb25zW2FjdGlvbl1bb3B0aW9uXS5lbmFibGVkID0gb3B0aW9uc1tvcHRpb25dO1xuICAgICAgICB9IGVsc2UgaWYgKG9wdGlvbnNbb3B0aW9uXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgLy8gb3IgaWYgaXQncyBub3QgdW5kZWZpbmVkLCBkbyBhIHBsYWluIGFzc2lnbm1lbnRcbiAgICAgICAgICB0aGlzLm9wdGlvbnNbYWN0aW9uXVtvcHRpb25dID0gb3B0aW9uc1tvcHRpb25dO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBUaGUgZGVmYXVsdCBmdW5jdGlvbiB0byBnZXQgYW4gSW50ZXJhY3RhYmxlcyBib3VuZGluZyByZWN0LiBDYW4gYmVcbiAgICogb3ZlcnJpZGRlbiB1c2luZyB7QGxpbmsgSW50ZXJhY3RhYmxlLnJlY3RDaGVja2VyfS5cbiAgICpcbiAgICogQHBhcmFtIHtFbGVtZW50fSBbZWxlbWVudF0gVGhlIGVsZW1lbnQgdG8gbWVhc3VyZS5cbiAgICogQHJldHVybiB7b2JqZWN0fSBUaGUgb2JqZWN0J3MgYm91bmRpbmcgcmVjdGFuZ2xlLlxuICAgKi9cblxuXG4gIEludGVyYWN0YWJsZS5wcm90b3R5cGUuZ2V0UmVjdCA9IGZ1bmN0aW9uIGdldFJlY3QoZWxlbWVudCkge1xuICAgIGVsZW1lbnQgPSBlbGVtZW50IHx8IHRoaXMudGFyZ2V0O1xuXG4gICAgaWYgKGlzLnN0cmluZyh0aGlzLnRhcmdldCkgJiYgIWlzLmVsZW1lbnQoZWxlbWVudCkpIHtcbiAgICAgIGVsZW1lbnQgPSB0aGlzLl9jb250ZXh0LnF1ZXJ5U2VsZWN0b3IodGhpcy50YXJnZXQpO1xuICAgIH1cblxuICAgIHJldHVybiBnZXRFbGVtZW50UmVjdChlbGVtZW50KTtcbiAgfTtcblxuICAvKipcbiAgICogUmV0dXJucyBvciBzZXRzIHRoZSBmdW5jdGlvbiB1c2VkIHRvIGNhbGN1bGF0ZSB0aGUgaW50ZXJhY3RhYmxlJ3NcbiAgICogZWxlbWVudCdzIHJlY3RhbmdsZVxuICAgKlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBbY2hlY2tlcl0gQSBmdW5jdGlvbiB3aGljaCByZXR1cm5zIHRoaXMgSW50ZXJhY3RhYmxlJ3NcbiAgICogYm91bmRpbmcgcmVjdGFuZ2xlLiBTZWUge0BsaW5rIEludGVyYWN0YWJsZS5nZXRSZWN0fVxuICAgKiBAcmV0dXJuIHtmdW5jdGlvbiB8IG9iamVjdH0gVGhlIGNoZWNrZXIgZnVuY3Rpb24gb3IgdGhpcyBJbnRlcmFjdGFibGVcbiAgICovXG5cblxuICBJbnRlcmFjdGFibGUucHJvdG90eXBlLnJlY3RDaGVja2VyID0gZnVuY3Rpb24gcmVjdENoZWNrZXIoY2hlY2tlcikge1xuICAgIGlmIChpcy5mdW5jdGlvbihjaGVja2VyKSkge1xuICAgICAgdGhpcy5nZXRSZWN0ID0gY2hlY2tlcjtcblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgaWYgKGNoZWNrZXIgPT09IG51bGwpIHtcbiAgICAgIGRlbGV0ZSB0aGlzLm9wdGlvbnMuZ2V0UmVjdDtcblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuZ2V0UmVjdDtcbiAgfTtcblxuICBJbnRlcmFjdGFibGUucHJvdG90eXBlLl9iYWNrQ29tcGF0T3B0aW9uID0gZnVuY3Rpb24gX2JhY2tDb21wYXRPcHRpb24ob3B0aW9uTmFtZSwgbmV3VmFsdWUpIHtcbiAgICBpZiAodHJ5U2VsZWN0b3IobmV3VmFsdWUpIHx8IGlzLm9iamVjdChuZXdWYWx1ZSkpIHtcbiAgICAgIHRoaXMub3B0aW9uc1tvcHRpb25OYW1lXSA9IG5ld1ZhbHVlO1xuXG4gICAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYWN0aW9ucy5uYW1lcy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgdmFyIF9yZWY7XG5cbiAgICAgICAgX3JlZiA9IGFjdGlvbnMubmFtZXNbX2ldO1xuICAgICAgICB2YXIgYWN0aW9uID0gX3JlZjtcblxuICAgICAgICB0aGlzLm9wdGlvbnNbYWN0aW9uXVtvcHRpb25OYW1lXSA9IG5ld1ZhbHVlO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5vcHRpb25zW29wdGlvbk5hbWVdO1xuICB9O1xuXG4gIC8qKlxuICAgKiBHZXRzIG9yIHNldHMgdGhlIG9yaWdpbiBvZiB0aGUgSW50ZXJhY3RhYmxlJ3MgZWxlbWVudC4gIFRoZSB4IGFuZCB5XG4gICAqIG9mIHRoZSBvcmlnaW4gd2lsbCBiZSBzdWJ0cmFjdGVkIGZyb20gYWN0aW9uIGV2ZW50IGNvb3JkaW5hdGVzLlxuICAgKlxuICAgKiBAcGFyYW0ge0VsZW1lbnQgfCBvYmplY3QgfCBzdHJpbmd9IFtvcmlnaW5dIEFuIEhUTUwgb3IgU1ZHIEVsZW1lbnQgd2hvc2VcbiAgICogcmVjdCB3aWxsIGJlIHVzZWQsIGFuIG9iamVjdCBlZy4geyB4OiAwLCB5OiAwIH0gb3Igc3RyaW5nICdwYXJlbnQnLCAnc2VsZidcbiAgICogb3IgYW55IENTUyBzZWxlY3RvclxuICAgKlxuICAgKiBAcmV0dXJuIHtvYmplY3R9IFRoZSBjdXJyZW50IG9yaWdpbiBvciB0aGlzIEludGVyYWN0YWJsZVxuICAgKi9cblxuXG4gIEludGVyYWN0YWJsZS5wcm90b3R5cGUub3JpZ2luID0gZnVuY3Rpb24gb3JpZ2luKG5ld1ZhbHVlKSB7XG4gICAgcmV0dXJuIHRoaXMuX2JhY2tDb21wYXRPcHRpb24oJ29yaWdpbicsIG5ld1ZhbHVlKTtcbiAgfTtcblxuICAvKipcbiAgICogUmV0dXJucyBvciBzZXRzIHRoZSBtb3VzZSBjb29yZGluYXRlIHR5cGVzIHVzZWQgdG8gY2FsY3VsYXRlIHRoZVxuICAgKiBtb3ZlbWVudCBvZiB0aGUgcG9pbnRlci5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IFtuZXdWYWx1ZV0gVXNlICdjbGllbnQnIGlmIHlvdSB3aWxsIGJlIHNjcm9sbGluZyB3aGlsZVxuICAgKiBpbnRlcmFjdGluZzsgVXNlICdwYWdlJyBpZiB5b3Ugd2FudCBhdXRvU2Nyb2xsIHRvIHdvcmtcbiAgICogQHJldHVybiB7c3RyaW5nIHwgb2JqZWN0fSBUaGUgY3VycmVudCBkZWx0YVNvdXJjZSBvciB0aGlzIEludGVyYWN0YWJsZVxuICAgKi9cblxuXG4gIEludGVyYWN0YWJsZS5wcm90b3R5cGUuZGVsdGFTb3VyY2UgPSBmdW5jdGlvbiBkZWx0YVNvdXJjZShuZXdWYWx1ZSkge1xuICAgIGlmIChuZXdWYWx1ZSA9PT0gJ3BhZ2UnIHx8IG5ld1ZhbHVlID09PSAnY2xpZW50Jykge1xuICAgICAgdGhpcy5vcHRpb25zLmRlbHRhU291cmNlID0gbmV3VmFsdWU7XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLm9wdGlvbnMuZGVsdGFTb3VyY2U7XG4gIH07XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIHNlbGVjdG9yIGNvbnRleHQgTm9kZSBvZiB0aGUgSW50ZXJhY3RhYmxlLiBUaGUgZGVmYXVsdCBpc1xuICAgKiBgd2luZG93LmRvY3VtZW50YC5cbiAgICpcbiAgICogQHJldHVybiB7Tm9kZX0gVGhlIGNvbnRleHQgTm9kZSBvZiB0aGlzIEludGVyYWN0YWJsZVxuICAgKi9cblxuXG4gIEludGVyYWN0YWJsZS5wcm90b3R5cGUuY29udGV4dCA9IGZ1bmN0aW9uIGNvbnRleHQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbnRleHQ7XG4gIH07XG5cbiAgSW50ZXJhY3RhYmxlLnByb3RvdHlwZS5pbkNvbnRleHQgPSBmdW5jdGlvbiBpbkNvbnRleHQoZWxlbWVudCkge1xuICAgIHJldHVybiB0aGlzLl9jb250ZXh0ID09PSBlbGVtZW50Lm93bmVyRG9jdW1lbnQgfHwgbm9kZUNvbnRhaW5zKHRoaXMuX2NvbnRleHQsIGVsZW1lbnQpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBDYWxscyBsaXN0ZW5lcnMgZm9yIHRoZSBnaXZlbiBJbnRlcmFjdEV2ZW50IHR5cGUgYm91bmQgZ2xvYmFsbHlcbiAgICogYW5kIGRpcmVjdGx5IHRvIHRoaXMgSW50ZXJhY3RhYmxlXG4gICAqXG4gICAqIEBwYXJhbSB7SW50ZXJhY3RFdmVudH0gaUV2ZW50IFRoZSBJbnRlcmFjdEV2ZW50IG9iamVjdCB0byBiZSBmaXJlZCBvbiB0aGlzXG4gICAqIEludGVyYWN0YWJsZVxuICAgKiBAcmV0dXJuIHtJbnRlcmFjdGFibGV9IHRoaXMgSW50ZXJhY3RhYmxlXG4gICAqL1xuXG5cbiAgSW50ZXJhY3RhYmxlLnByb3RvdHlwZS5maXJlID0gZnVuY3Rpb24gZmlyZShpRXZlbnQpIHtcbiAgICB0aGlzLmV2ZW50cy5maXJlKGlFdmVudCk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBJbnRlcmFjdGFibGUucHJvdG90eXBlLl9vbk9mZk11bHRpcGxlID0gZnVuY3Rpb24gX29uT2ZmTXVsdGlwbGUobWV0aG9kLCBldmVudFR5cGUsIGxpc3RlbmVyLCBvcHRpb25zKSB7XG4gICAgaWYgKGlzLnN0cmluZyhldmVudFR5cGUpICYmIGV2ZW50VHlwZS5zZWFyY2goJyAnKSAhPT0gLTEpIHtcbiAgICAgIGV2ZW50VHlwZSA9IGV2ZW50VHlwZS50cmltKCkuc3BsaXQoLyArLyk7XG4gICAgfVxuXG4gICAgaWYgKGlzLmFycmF5KGV2ZW50VHlwZSkpIHtcbiAgICAgIGZvciAodmFyIF9pMiA9IDA7IF9pMiA8IGV2ZW50VHlwZS5sZW5ndGg7IF9pMisrKSB7XG4gICAgICAgIHZhciBfcmVmMjtcblxuICAgICAgICBfcmVmMiA9IGV2ZW50VHlwZVtfaTJdO1xuICAgICAgICB2YXIgdHlwZSA9IF9yZWYyO1xuXG4gICAgICAgIHRoaXNbbWV0aG9kXSh0eXBlLCBsaXN0ZW5lciwgb3B0aW9ucyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGlmIChpcy5vYmplY3QoZXZlbnRUeXBlKSkge1xuICAgICAgZm9yICh2YXIgcHJvcCBpbiBldmVudFR5cGUpIHtcbiAgICAgICAgdGhpc1ttZXRob2RdKHByb3AsIGV2ZW50VHlwZVtwcm9wXSwgbGlzdGVuZXIpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIEJpbmRzIGEgbGlzdGVuZXIgZm9yIGFuIEludGVyYWN0RXZlbnQsIHBvaW50ZXJFdmVudCBvciBET00gZXZlbnQuXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nIHwgYXJyYXkgfCBvYmplY3R9IGV2ZW50VHlwZSAgVGhlIHR5cGVzIG9mIGV2ZW50cyB0byBsaXN0ZW5cbiAgICogZm9yXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGxpc3RlbmVyICAgVGhlIGZ1bmN0aW9uIGV2ZW50IChzKVxuICAgKiBAcGFyYW0ge29iamVjdCB8IGJvb2xlYW59IFtvcHRpb25zXSAgICBvcHRpb25zIG9iamVjdCBvciB1c2VDYXB0dXJlIGZsYWdcbiAgICogZm9yIGFkZEV2ZW50TGlzdGVuZXJcbiAgICogQHJldHVybiB7b2JqZWN0fSBUaGlzIEludGVyYWN0YWJsZVxuICAgKi9cblxuXG4gIEludGVyYWN0YWJsZS5wcm90b3R5cGUub24gPSBmdW5jdGlvbiBvbihldmVudFR5cGUsIGxpc3RlbmVyLCBvcHRpb25zKSB7XG4gICAgaWYgKHRoaXMuX29uT2ZmTXVsdGlwbGUoJ29uJywgZXZlbnRUeXBlLCBsaXN0ZW5lciwgb3B0aW9ucykpIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGlmIChldmVudFR5cGUgPT09ICd3aGVlbCcpIHtcbiAgICAgIGV2ZW50VHlwZSA9IHdoZWVsRXZlbnQ7XG4gICAgfVxuXG4gICAgaWYgKGNvbnRhaW5zKEludGVyYWN0YWJsZS5ldmVudFR5cGVzLCBldmVudFR5cGUpKSB7XG4gICAgICB0aGlzLmV2ZW50cy5vbihldmVudFR5cGUsIGxpc3RlbmVyKTtcbiAgICB9XG4gICAgLy8gZGVsZWdhdGVkIGV2ZW50IGZvciBzZWxlY3RvclxuICAgIGVsc2UgaWYgKGlzLnN0cmluZyh0aGlzLnRhcmdldCkpIHtcbiAgICAgICAgZXZlbnRzLmFkZERlbGVnYXRlKHRoaXMudGFyZ2V0LCB0aGlzLl9jb250ZXh0LCBldmVudFR5cGUsIGxpc3RlbmVyLCBvcHRpb25zKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGV2ZW50cy5hZGQodGhpcy50YXJnZXQsIGV2ZW50VHlwZSwgbGlzdGVuZXIsIG9wdGlvbnMpO1xuICAgICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYW4gSW50ZXJhY3RFdmVudCwgcG9pbnRlckV2ZW50IG9yIERPTSBldmVudCBsaXN0ZW5lclxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZyB8IGFycmF5IHwgb2JqZWN0fSBldmVudFR5cGUgVGhlIHR5cGVzIG9mIGV2ZW50cyB0aGF0IHdlcmVcbiAgICogbGlzdGVuZWQgZm9yXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGxpc3RlbmVyIFRoZSBsaXN0ZW5lciBmdW5jdGlvbiB0byBiZSByZW1vdmVkXG4gICAqIEBwYXJhbSB7b2JqZWN0IHwgYm9vbGVhbn0gW29wdGlvbnNdIG9wdGlvbnMgb2JqZWN0IG9yIHVzZUNhcHR1cmUgZmxhZyBmb3JcbiAgICogcmVtb3ZlRXZlbnRMaXN0ZW5lclxuICAgKiBAcmV0dXJuIHtvYmplY3R9IFRoaXMgSW50ZXJhY3RhYmxlXG4gICAqL1xuXG5cbiAgSW50ZXJhY3RhYmxlLnByb3RvdHlwZS5vZmYgPSBmdW5jdGlvbiBvZmYoZXZlbnRUeXBlLCBsaXN0ZW5lciwgb3B0aW9ucykge1xuICAgIGlmICh0aGlzLl9vbk9mZk11bHRpcGxlKCdvZmYnLCBldmVudFR5cGUsIGxpc3RlbmVyLCBvcHRpb25zKSkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgaWYgKGV2ZW50VHlwZSA9PT0gJ3doZWVsJykge1xuICAgICAgZXZlbnRUeXBlID0gd2hlZWxFdmVudDtcbiAgICB9XG5cbiAgICAvLyBpZiBpdCBpcyBhbiBhY3Rpb24gZXZlbnQgdHlwZVxuICAgIGlmIChjb250YWlucyhJbnRlcmFjdGFibGUuZXZlbnRUeXBlcywgZXZlbnRUeXBlKSkge1xuICAgICAgdGhpcy5ldmVudHMub2ZmKGV2ZW50VHlwZSwgbGlzdGVuZXIpO1xuICAgIH1cbiAgICAvLyBkZWxlZ2F0ZWQgZXZlbnRcbiAgICBlbHNlIGlmIChpcy5zdHJpbmcodGhpcy50YXJnZXQpKSB7XG4gICAgICAgIGV2ZW50cy5yZW1vdmVEZWxlZ2F0ZSh0aGlzLnRhcmdldCwgdGhpcy5fY29udGV4dCwgZXZlbnRUeXBlLCBsaXN0ZW5lciwgb3B0aW9ucyk7XG4gICAgICB9XG4gICAgICAvLyByZW1vdmUgbGlzdGVuZXIgZnJvbSB0aGlzIEludGVyYXRhYmxlJ3MgZWxlbWVudFxuICAgICAgZWxzZSB7XG4gICAgICAgICAgZXZlbnRzLnJlbW92ZSh0aGlzLnRhcmdldCwgZXZlbnRUeXBlLCBsaXN0ZW5lciwgb3B0aW9ucyk7XG4gICAgICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIC8qKlxuICAgKiBSZXNldCB0aGUgb3B0aW9ucyBvZiB0aGlzIEludGVyYWN0YWJsZVxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucyBUaGUgbmV3IHNldHRpbmdzIHRvIGFwcGx5XG4gICAqIEByZXR1cm4ge29iamVjdH0gVGhpcyBJbnRlcmFjdGFibGVcbiAgICovXG5cblxuICBJbnRlcmFjdGFibGUucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uIHNldChvcHRpb25zKSB7XG4gICAgaWYgKCFpcy5vYmplY3Qob3B0aW9ucykpIHtcbiAgICAgIG9wdGlvbnMgPSB7fTtcbiAgICB9XG5cbiAgICB0aGlzLm9wdGlvbnMgPSBjbG9uZShkZWZhdWx0cy5iYXNlKTtcblxuICAgIHZhciBwZXJBY3Rpb25zID0gY2xvbmUoZGVmYXVsdHMucGVyQWN0aW9uKTtcblxuICAgIGZvciAodmFyIGFjdGlvbk5hbWUgaW4gYWN0aW9ucy5tZXRob2REaWN0KSB7XG4gICAgICB2YXIgbWV0aG9kTmFtZSA9IGFjdGlvbnMubWV0aG9kRGljdFthY3Rpb25OYW1lXTtcblxuICAgICAgdGhpcy5vcHRpb25zW2FjdGlvbk5hbWVdID0gY2xvbmUoZGVmYXVsdHNbYWN0aW9uTmFtZV0pO1xuXG4gICAgICB0aGlzLnNldFBlckFjdGlvbihhY3Rpb25OYW1lLCBwZXJBY3Rpb25zKTtcblxuICAgICAgdGhpc1ttZXRob2ROYW1lXShvcHRpb25zW2FjdGlvbk5hbWVdKTtcbiAgICB9XG5cbiAgICBmb3IgKHZhciBfaTMgPSAwOyBfaTMgPCBJbnRlcmFjdGFibGUuc2V0dGluZ3NNZXRob2RzLmxlbmd0aDsgX2kzKyspIHtcbiAgICAgIHZhciBfcmVmMztcblxuICAgICAgX3JlZjMgPSBJbnRlcmFjdGFibGUuc2V0dGluZ3NNZXRob2RzW19pM107XG4gICAgICB2YXIgc2V0dGluZyA9IF9yZWYzO1xuXG4gICAgICB0aGlzLm9wdGlvbnNbc2V0dGluZ10gPSBkZWZhdWx0cy5iYXNlW3NldHRpbmddO1xuXG4gICAgICBpZiAoc2V0dGluZyBpbiBvcHRpb25zKSB7XG4gICAgICAgIHRoaXNbc2V0dGluZ10ob3B0aW9uc1tzZXR0aW5nXSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgc2lnbmFscy5maXJlKCdzZXQnLCB7XG4gICAgICBvcHRpb25zOiBvcHRpb25zLFxuICAgICAgaW50ZXJhY3RhYmxlOiB0aGlzXG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICAvKipcbiAgICogUmVtb3ZlIHRoaXMgaW50ZXJhY3RhYmxlIGZyb20gdGhlIGxpc3Qgb2YgaW50ZXJhY3RhYmxlcyBhbmQgcmVtb3ZlIGl0J3NcbiAgICogYWN0aW9uIGNhcGFiaWxpdGllcyBhbmQgZXZlbnQgbGlzdGVuZXJzXG4gICAqXG4gICAqIEByZXR1cm4ge2ludGVyYWN0fVxuICAgKi9cblxuXG4gIEludGVyYWN0YWJsZS5wcm90b3R5cGUudW5zZXQgPSBmdW5jdGlvbiB1bnNldCgpIHtcbiAgICBldmVudHMucmVtb3ZlKHRoaXMudGFyZ2V0LCAnYWxsJyk7XG5cbiAgICBpZiAoaXMuc3RyaW5nKHRoaXMudGFyZ2V0KSkge1xuICAgICAgLy8gcmVtb3ZlIGRlbGVnYXRlZCBldmVudHNcbiAgICAgIGZvciAodmFyIHR5cGUgaW4gZXZlbnRzLmRlbGVnYXRlZEV2ZW50cykge1xuICAgICAgICB2YXIgZGVsZWdhdGVkID0gZXZlbnRzLmRlbGVnYXRlZEV2ZW50c1t0eXBlXTtcblxuICAgICAgICBpZiAoZGVsZWdhdGVkLnNlbGVjdG9yc1swXSA9PT0gdGhpcy50YXJnZXQgJiYgZGVsZWdhdGVkLmNvbnRleHRzWzBdID09PSB0aGlzLl9jb250ZXh0KSB7XG5cbiAgICAgICAgICBkZWxlZ2F0ZWQuc2VsZWN0b3JzLnNwbGljZSgwLCAxKTtcbiAgICAgICAgICBkZWxlZ2F0ZWQuY29udGV4dHMuc3BsaWNlKDAsIDEpO1xuICAgICAgICAgIGRlbGVnYXRlZC5saXN0ZW5lcnMuc3BsaWNlKDAsIDEpO1xuXG4gICAgICAgICAgLy8gcmVtb3ZlIHRoZSBhcnJheXMgaWYgdGhleSBhcmUgZW1wdHlcbiAgICAgICAgICBpZiAoIWRlbGVnYXRlZC5zZWxlY3RvcnMubGVuZ3RoKSB7XG4gICAgICAgICAgICBkZWxlZ2F0ZWRbdHlwZV0gPSBudWxsO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGV2ZW50cy5yZW1vdmUodGhpcy5fY29udGV4dCwgdHlwZSwgZXZlbnRzLmRlbGVnYXRlTGlzdGVuZXIpO1xuICAgICAgICBldmVudHMucmVtb3ZlKHRoaXMuX2NvbnRleHQsIHR5cGUsIGV2ZW50cy5kZWxlZ2F0ZVVzZUNhcHR1cmUsIHRydWUpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBldmVudHMucmVtb3ZlKHRoaXMsICdhbGwnKTtcbiAgICB9XG5cbiAgICBzaWduYWxzLmZpcmUoJ3Vuc2V0JywgeyBpbnRlcmFjdGFibGU6IHRoaXMgfSk7XG5cbiAgICBzY29wZS5pbnRlcmFjdGFibGVzLnNwbGljZShzY29wZS5pbnRlcmFjdGFibGVzLmluZGV4T2YodGhpcyksIDEpO1xuXG4gICAgLy8gU3RvcCByZWxhdGVkIGludGVyYWN0aW9ucyB3aGVuIGFuIEludGVyYWN0YWJsZSBpcyB1bnNldFxuICAgIGZvciAodmFyIF9pNCA9IDA7IF9pNCA8IChzY29wZS5pbnRlcmFjdGlvbnMgfHwgW10pLmxlbmd0aDsgX2k0KyspIHtcbiAgICAgIHZhciBfcmVmNDtcblxuICAgICAgX3JlZjQgPSAoc2NvcGUuaW50ZXJhY3Rpb25zIHx8IFtdKVtfaTRdO1xuICAgICAgdmFyIGludGVyYWN0aW9uID0gX3JlZjQ7XG5cbiAgICAgIGlmIChpbnRlcmFjdGlvbi50YXJnZXQgPT09IHRoaXMgJiYgaW50ZXJhY3Rpb24uaW50ZXJhY3RpbmcoKSAmJiAhaW50ZXJhY3Rpb24uX2VuZGluZykge1xuICAgICAgICBpbnRlcmFjdGlvbi5zdG9wKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHNjb3BlLmludGVyYWN0O1xuICB9O1xuXG4gIHJldHVybiBJbnRlcmFjdGFibGU7XG59KCk7XG5cbnNjb3BlLmludGVyYWN0YWJsZXMuaW5kZXhPZkVsZW1lbnQgPSBmdW5jdGlvbiBpbmRleE9mRWxlbWVudCh0YXJnZXQsIGNvbnRleHQpIHtcbiAgY29udGV4dCA9IGNvbnRleHQgfHwgc2NvcGUuZG9jdW1lbnQ7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGludGVyYWN0YWJsZSA9IHRoaXNbaV07XG5cbiAgICBpZiAoaW50ZXJhY3RhYmxlLnRhcmdldCA9PT0gdGFyZ2V0ICYmIGludGVyYWN0YWJsZS5fY29udGV4dCA9PT0gY29udGV4dCkge1xuICAgICAgcmV0dXJuIGk7XG4gICAgfVxuICB9XG4gIHJldHVybiAtMTtcbn07XG5cbnNjb3BlLmludGVyYWN0YWJsZXMuZ2V0ID0gZnVuY3Rpb24gaW50ZXJhY3RhYmxlR2V0KGVsZW1lbnQsIG9wdGlvbnMsIGRvbnRDaGVja0luQ29udGV4dCkge1xuICB2YXIgcmV0ID0gdGhpc1t0aGlzLmluZGV4T2ZFbGVtZW50KGVsZW1lbnQsIG9wdGlvbnMgJiYgb3B0aW9ucy5jb250ZXh0KV07XG5cbiAgcmV0dXJuIHJldCAmJiAoaXMuc3RyaW5nKGVsZW1lbnQpIHx8IGRvbnRDaGVja0luQ29udGV4dCB8fCByZXQuaW5Db250ZXh0KGVsZW1lbnQpKSA/IHJldCA6IG51bGw7XG59O1xuXG5zY29wZS5pbnRlcmFjdGFibGVzLmZvckVhY2hNYXRjaCA9IGZ1bmN0aW9uIChlbGVtZW50LCBjYWxsYmFjaykge1xuICBmb3IgKHZhciBfaTUgPSAwOyBfaTUgPCB0aGlzLmxlbmd0aDsgX2k1KyspIHtcbiAgICB2YXIgX3JlZjU7XG5cbiAgICBfcmVmNSA9IHRoaXNbX2k1XTtcbiAgICB2YXIgaW50ZXJhY3RhYmxlID0gX3JlZjU7XG5cbiAgICB2YXIgcmV0ID0gdm9pZCAwO1xuXG4gICAgaWYgKChpcy5zdHJpbmcoaW50ZXJhY3RhYmxlLnRhcmdldClcbiAgICAvLyB0YXJnZXQgaXMgYSBzZWxlY3RvciBhbmQgdGhlIGVsZW1lbnQgbWF0Y2hlc1xuICAgID8gaXMuZWxlbWVudChlbGVtZW50KSAmJiBtYXRjaGVzU2VsZWN0b3IoZWxlbWVudCwgaW50ZXJhY3RhYmxlLnRhcmdldCkgOlxuICAgIC8vIHRhcmdldCBpcyB0aGUgZWxlbWVudFxuICAgIGVsZW1lbnQgPT09IGludGVyYWN0YWJsZS50YXJnZXQpICYmXG4gICAgLy8gdGhlIGVsZW1lbnQgaXMgaW4gY29udGV4dFxuICAgIGludGVyYWN0YWJsZS5pbkNvbnRleHQoZWxlbWVudCkpIHtcbiAgICAgIHJldCA9IGNhbGxiYWNrKGludGVyYWN0YWJsZSk7XG4gICAgfVxuXG4gICAgaWYgKHJldCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gcmV0O1xuICAgIH1cbiAgfVxufTtcblxuLy8gYWxsIGludGVyYWN0LmpzIGV2ZW50VHlwZXNcbkludGVyYWN0YWJsZS5ldmVudFR5cGVzID0gc2NvcGUuZXZlbnRUeXBlcyA9IFtdO1xuXG5JbnRlcmFjdGFibGUuc2lnbmFscyA9IHNpZ25hbHM7XG5cbkludGVyYWN0YWJsZS5zZXR0aW5nc01ldGhvZHMgPSBbJ2RlbHRhU291cmNlJywgJ29yaWdpbicsICdwcmV2ZW50RGVmYXVsdCcsICdyZWN0Q2hlY2tlciddO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEludGVyYWN0YWJsZTtcblxufSx7XCIuL0V2ZW50YWJsZVwiOjIsXCIuL2FjdGlvbnMvYmFzZVwiOjYsXCIuL2RlZmF1bHRPcHRpb25zXCI6MTgsXCIuL3Njb3BlXCI6MzMsXCIuL3V0aWxzL1NpZ25hbHNcIjozNCxcIi4vdXRpbHMvYXJyXCI6MzUsXCIuL3V0aWxzL2Jyb3dzZXJcIjozNixcIi4vdXRpbHMvY2xvbmVcIjozNyxcIi4vdXRpbHMvZG9tVXRpbHNcIjozOSxcIi4vdXRpbHMvZXZlbnRzXCI6NDAsXCIuL3V0aWxzL2V4dGVuZFwiOjQxLFwiLi91dGlscy9pc1wiOjQ2LFwiLi91dGlscy93aW5kb3dcIjo1Mn1dLDU6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG52YXIgc2NvcGUgPSByZXF1aXJlKCcuL3Njb3BlJyk7XG52YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG52YXIgZXZlbnRzID0gcmVxdWlyZSgnLi91dGlscy9ldmVudHMnKTtcbnZhciBicm93c2VyID0gcmVxdWlyZSgnLi91dGlscy9icm93c2VyJyk7XG52YXIgZG9tT2JqZWN0cyA9IHJlcXVpcmUoJy4vdXRpbHMvZG9tT2JqZWN0cycpO1xudmFyIGZpbmRlciA9IHJlcXVpcmUoJy4vdXRpbHMvaW50ZXJhY3Rpb25GaW5kZXInKTtcbnZhciBzaWduYWxzID0gcmVxdWlyZSgnLi91dGlscy9TaWduYWxzJykubmV3KCk7XG5cbnZhciBsaXN0ZW5lcnMgPSB7fTtcbnZhciBtZXRob2ROYW1lcyA9IFsncG9pbnRlckRvd24nLCAncG9pbnRlck1vdmUnLCAncG9pbnRlclVwJywgJ3VwZGF0ZVBvaW50ZXInLCAncmVtb3ZlUG9pbnRlciddO1xuXG4vLyBmb3IgaWdub3JpbmcgYnJvd3NlcidzIHNpbXVsYXRlZCBtb3VzZSBldmVudHNcbnZhciBwcmV2VG91Y2hUaW1lID0gMDtcblxuLy8gYWxsIGFjdGl2ZSBhbmQgaWRsZSBpbnRlcmFjdGlvbnNcbnNjb3BlLmludGVyYWN0aW9ucyA9IFtdO1xuXG52YXIgSW50ZXJhY3Rpb24gPSBmdW5jdGlvbiAoKSB7XG4gIC8qKiAqL1xuICBmdW5jdGlvbiBJbnRlcmFjdGlvbihfcmVmKSB7XG4gICAgdmFyIHBvaW50ZXJUeXBlID0gX3JlZi5wb2ludGVyVHlwZTtcblxuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBJbnRlcmFjdGlvbik7XG5cbiAgICB0aGlzLnRhcmdldCA9IG51bGw7IC8vIGN1cnJlbnQgaW50ZXJhY3RhYmxlIGJlaW5nIGludGVyYWN0ZWQgd2l0aFxuICAgIHRoaXMuZWxlbWVudCA9IG51bGw7IC8vIHRoZSB0YXJnZXQgZWxlbWVudCBvZiB0aGUgaW50ZXJhY3RhYmxlXG5cbiAgICB0aGlzLnByZXBhcmVkID0geyAvLyBhY3Rpb24gdGhhdCdzIHJlYWR5IHRvIGJlIGZpcmVkIG9uIG5leHQgbW92ZSBldmVudFxuICAgICAgbmFtZTogbnVsbCxcbiAgICAgIGF4aXM6IG51bGwsXG4gICAgICBlZGdlczogbnVsbFxuICAgIH07XG5cbiAgICAvLyBrZWVwIHRyYWNrIG9mIGFkZGVkIHBvaW50ZXJzXG4gICAgdGhpcy5wb2ludGVycyA9IFtdO1xuICAgIHRoaXMucG9pbnRlcklkcyA9IFtdO1xuICAgIHRoaXMuZG93blRhcmdldHMgPSBbXTtcbiAgICB0aGlzLmRvd25UaW1lcyA9IFtdO1xuXG4gICAgLy8gUHJldmlvdXMgbmF0aXZlIHBvaW50ZXIgbW92ZSBldmVudCBjb29yZGluYXRlc1xuICAgIHRoaXMucHJldkNvb3JkcyA9IHtcbiAgICAgIHBhZ2U6IHsgeDogMCwgeTogMCB9LFxuICAgICAgY2xpZW50OiB7IHg6IDAsIHk6IDAgfSxcbiAgICAgIHRpbWVTdGFtcDogMFxuICAgIH07XG4gICAgLy8gY3VycmVudCBuYXRpdmUgcG9pbnRlciBtb3ZlIGV2ZW50IGNvb3JkaW5hdGVzXG4gICAgdGhpcy5jdXJDb29yZHMgPSB7XG4gICAgICBwYWdlOiB7IHg6IDAsIHk6IDAgfSxcbiAgICAgIGNsaWVudDogeyB4OiAwLCB5OiAwIH0sXG4gICAgICB0aW1lU3RhbXA6IDBcbiAgICB9O1xuXG4gICAgLy8gU3RhcnRpbmcgSW50ZXJhY3RFdmVudCBwb2ludGVyIGNvb3JkaW5hdGVzXG4gICAgdGhpcy5zdGFydENvb3JkcyA9IHtcbiAgICAgIHBhZ2U6IHsgeDogMCwgeTogMCB9LFxuICAgICAgY2xpZW50OiB7IHg6IDAsIHk6IDAgfSxcbiAgICAgIHRpbWVTdGFtcDogMFxuICAgIH07XG5cbiAgICAvLyBDaGFuZ2UgaW4gY29vcmRpbmF0ZXMgYW5kIHRpbWUgb2YgdGhlIHBvaW50ZXJcbiAgICB0aGlzLnBvaW50ZXJEZWx0YSA9IHtcbiAgICAgIHBhZ2U6IHsgeDogMCwgeTogMCwgdng6IDAsIHZ5OiAwLCBzcGVlZDogMCB9LFxuICAgICAgY2xpZW50OiB7IHg6IDAsIHk6IDAsIHZ4OiAwLCB2eTogMCwgc3BlZWQ6IDAgfSxcbiAgICAgIHRpbWVTdGFtcDogMFxuICAgIH07XG5cbiAgICB0aGlzLmRvd25FdmVudCA9IG51bGw7IC8vIHBvaW50ZXJkb3duL21vdXNlZG93bi90b3VjaHN0YXJ0IGV2ZW50XG4gICAgdGhpcy5kb3duUG9pbnRlciA9IHt9O1xuXG4gICAgdGhpcy5fZXZlbnRUYXJnZXQgPSBudWxsO1xuICAgIHRoaXMuX2N1ckV2ZW50VGFyZ2V0ID0gbnVsbDtcblxuICAgIHRoaXMucHJldkV2ZW50ID0gbnVsbDsgLy8gcHJldmlvdXMgYWN0aW9uIGV2ZW50XG5cbiAgICB0aGlzLnBvaW50ZXJJc0Rvd24gPSBmYWxzZTtcbiAgICB0aGlzLnBvaW50ZXJXYXNNb3ZlZCA9IGZhbHNlO1xuICAgIHRoaXMuX2ludGVyYWN0aW5nID0gZmFsc2U7XG4gICAgdGhpcy5fZW5kaW5nID0gZmFsc2U7XG5cbiAgICB0aGlzLnBvaW50ZXJUeXBlID0gcG9pbnRlclR5cGU7XG5cbiAgICBzaWduYWxzLmZpcmUoJ25ldycsIHRoaXMpO1xuXG4gICAgc2NvcGUuaW50ZXJhY3Rpb25zLnB1c2godGhpcyk7XG4gIH1cblxuICBJbnRlcmFjdGlvbi5wcm90b3R5cGUucG9pbnRlckRvd24gPSBmdW5jdGlvbiBwb2ludGVyRG93bihwb2ludGVyLCBldmVudCwgZXZlbnRUYXJnZXQpIHtcbiAgICB2YXIgcG9pbnRlckluZGV4ID0gdGhpcy51cGRhdGVQb2ludGVyKHBvaW50ZXIsIGV2ZW50LCB0cnVlKTtcblxuICAgIHNpZ25hbHMuZmlyZSgnZG93bicsIHtcbiAgICAgIHBvaW50ZXI6IHBvaW50ZXIsXG4gICAgICBldmVudDogZXZlbnQsXG4gICAgICBldmVudFRhcmdldDogZXZlbnRUYXJnZXQsXG4gICAgICBwb2ludGVySW5kZXg6IHBvaW50ZXJJbmRleCxcbiAgICAgIGludGVyYWN0aW9uOiB0aGlzXG4gICAgfSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIGBgYGpzXG4gICAqIGludGVyYWN0KHRhcmdldClcbiAgICogICAuZHJhZ2dhYmxlKHtcbiAgICogICAgIC8vIGRpc2FibGUgdGhlIGRlZmF1bHQgZHJhZyBzdGFydCBieSBkb3duLT5tb3ZlXG4gICAqICAgICBtYW51YWxTdGFydDogdHJ1ZVxuICAgKiAgIH0pXG4gICAqICAgLy8gc3RhcnQgZHJhZ2dpbmcgYWZ0ZXIgdGhlIHVzZXIgaG9sZHMgdGhlIHBvaW50ZXIgZG93blxuICAgKiAgIC5vbignaG9sZCcsIGZ1bmN0aW9uIChldmVudCkge1xuICAgKiAgICAgdmFyIGludGVyYWN0aW9uID0gZXZlbnQuaW50ZXJhY3Rpb247XG4gICAqXG4gICAqICAgICBpZiAoIWludGVyYWN0aW9uLmludGVyYWN0aW5nKCkpIHtcbiAgICogICAgICAgaW50ZXJhY3Rpb24uc3RhcnQoeyBuYW1lOiAnZHJhZycgfSxcbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQuaW50ZXJhY3RhYmxlLFxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICBldmVudC5jdXJyZW50VGFyZ2V0KTtcbiAgICogICAgIH1cbiAgICogfSk7XG4gICAqIGBgYFxuICAgKlxuICAgKiBTdGFydCBhbiBhY3Rpb24gd2l0aCB0aGUgZ2l2ZW4gSW50ZXJhY3RhYmxlIGFuZCBFbGVtZW50IGFzIHRhcnRnZXRzLiBUaGVcbiAgICogYWN0aW9uIG11c3QgYmUgZW5hYmxlZCBmb3IgdGhlIHRhcmdldCBJbnRlcmFjdGFibGUgYW5kIGFuIGFwcHJvcHJpYXRlXG4gICAqIG51bWJlciBvZiBwb2ludGVycyBtdXN0IGJlIGhlbGQgZG93biAtIDEgZm9yIGRyYWcvcmVzaXplLCAyIGZvciBnZXN0dXJlLlxuICAgKlxuICAgKiBVc2UgaXQgd2l0aCBgaW50ZXJhY3RhYmxlLjxhY3Rpb24+YWJsZSh7IG1hbnVhbFN0YXJ0OiBmYWxzZSB9KWAgdG8gYWx3YXlzXG4gICAqIFtzdGFydCBhY3Rpb25zIG1hbnVhbGx5XShodHRwczovL2dpdGh1Yi5jb20vdGF5ZS9pbnRlcmFjdC5qcy9pc3N1ZXMvMTE0KVxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0gYWN0aW9uICAgVGhlIGFjdGlvbiB0byBiZSBwZXJmb3JtZWQgLSBkcmFnLCByZXNpemUsIGV0Yy5cbiAgICogQHBhcmFtIHtJbnRlcmFjdGFibGV9IHRhcmdldCAgVGhlIEludGVyYWN0YWJsZSB0byB0YXJnZXRcbiAgICogQHBhcmFtIHtFbGVtZW50fSBlbGVtZW50IFRoZSBET00gRWxlbWVudCB0byB0YXJnZXRcbiAgICogQHJldHVybiB7b2JqZWN0fSBpbnRlcmFjdFxuICAgKi9cblxuXG4gIEludGVyYWN0aW9uLnByb3RvdHlwZS5zdGFydCA9IGZ1bmN0aW9uIHN0YXJ0KGFjdGlvbiwgdGFyZ2V0LCBlbGVtZW50KSB7XG4gICAgaWYgKHRoaXMuaW50ZXJhY3RpbmcoKSB8fCAhdGhpcy5wb2ludGVySXNEb3duIHx8IHRoaXMucG9pbnRlcklkcy5sZW5ndGggPCAoYWN0aW9uLm5hbWUgPT09ICdnZXN0dXJlJyA/IDIgOiAxKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIGlmIHRoaXMgaW50ZXJhY3Rpb24gaGFkIGJlZW4gcmVtb3ZlZCBhZnRlciBzdG9wcGluZ1xuICAgIC8vIGFkZCBpdCBiYWNrXG4gICAgaWYgKHNjb3BlLmludGVyYWN0aW9ucy5pbmRleE9mKHRoaXMpID09PSAtMSkge1xuICAgICAgc2NvcGUuaW50ZXJhY3Rpb25zLnB1c2godGhpcyk7XG4gICAgfVxuXG4gICAgdXRpbHMuY29weUFjdGlvbih0aGlzLnByZXBhcmVkLCBhY3Rpb24pO1xuICAgIHRoaXMudGFyZ2V0ID0gdGFyZ2V0O1xuICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG5cbiAgICBzaWduYWxzLmZpcmUoJ2FjdGlvbi1zdGFydCcsIHtcbiAgICAgIGludGVyYWN0aW9uOiB0aGlzLFxuICAgICAgZXZlbnQ6IHRoaXMuZG93bkV2ZW50XG4gICAgfSk7XG4gIH07XG5cbiAgSW50ZXJhY3Rpb24ucHJvdG90eXBlLnBvaW50ZXJNb3ZlID0gZnVuY3Rpb24gcG9pbnRlck1vdmUocG9pbnRlciwgZXZlbnQsIGV2ZW50VGFyZ2V0KSB7XG4gICAgaWYgKCF0aGlzLnNpbXVsYXRpb24pIHtcbiAgICAgIHRoaXMudXBkYXRlUG9pbnRlcihwb2ludGVyKTtcbiAgICAgIHV0aWxzLnNldENvb3Jkcyh0aGlzLmN1ckNvb3JkcywgdGhpcy5wb2ludGVycyk7XG4gICAgfVxuXG4gICAgdmFyIGR1cGxpY2F0ZU1vdmUgPSB0aGlzLmN1ckNvb3Jkcy5wYWdlLnggPT09IHRoaXMucHJldkNvb3Jkcy5wYWdlLnggJiYgdGhpcy5jdXJDb29yZHMucGFnZS55ID09PSB0aGlzLnByZXZDb29yZHMucGFnZS55ICYmIHRoaXMuY3VyQ29vcmRzLmNsaWVudC54ID09PSB0aGlzLnByZXZDb29yZHMuY2xpZW50LnggJiYgdGhpcy5jdXJDb29yZHMuY2xpZW50LnkgPT09IHRoaXMucHJldkNvb3Jkcy5jbGllbnQueTtcblxuICAgIHZhciBkeCA9IHZvaWQgMDtcbiAgICB2YXIgZHkgPSB2b2lkIDA7XG5cbiAgICAvLyByZWdpc3RlciBtb3ZlbWVudCBncmVhdGVyIHRoYW4gcG9pbnRlck1vdmVUb2xlcmFuY2VcbiAgICBpZiAodGhpcy5wb2ludGVySXNEb3duICYmICF0aGlzLnBvaW50ZXJXYXNNb3ZlZCkge1xuICAgICAgZHggPSB0aGlzLmN1ckNvb3Jkcy5jbGllbnQueCAtIHRoaXMuc3RhcnRDb29yZHMuY2xpZW50Lng7XG4gICAgICBkeSA9IHRoaXMuY3VyQ29vcmRzLmNsaWVudC55IC0gdGhpcy5zdGFydENvb3Jkcy5jbGllbnQueTtcblxuICAgICAgdGhpcy5wb2ludGVyV2FzTW92ZWQgPSB1dGlscy5oeXBvdChkeCwgZHkpID4gSW50ZXJhY3Rpb24ucG9pbnRlck1vdmVUb2xlcmFuY2U7XG4gICAgfVxuXG4gICAgdmFyIHNpZ25hbEFyZyA9IHtcbiAgICAgIHBvaW50ZXI6IHBvaW50ZXIsXG4gICAgICBwb2ludGVySW5kZXg6IHRoaXMuZ2V0UG9pbnRlckluZGV4KHBvaW50ZXIpLFxuICAgICAgZXZlbnQ6IGV2ZW50LFxuICAgICAgZXZlbnRUYXJnZXQ6IGV2ZW50VGFyZ2V0LFxuICAgICAgZHg6IGR4LFxuICAgICAgZHk6IGR5LFxuICAgICAgZHVwbGljYXRlOiBkdXBsaWNhdGVNb3ZlLFxuICAgICAgaW50ZXJhY3Rpb246IHRoaXMsXG4gICAgICBpbnRlcmFjdGluZ0JlZm9yZU1vdmU6IHRoaXMuaW50ZXJhY3RpbmcoKVxuICAgIH07XG5cbiAgICBpZiAoIWR1cGxpY2F0ZU1vdmUpIHtcbiAgICAgIC8vIHNldCBwb2ludGVyIGNvb3JkaW5hdGUsIHRpbWUgY2hhbmdlcyBhbmQgc3BlZWRzXG4gICAgICB1dGlscy5zZXRDb29yZERlbHRhcyh0aGlzLnBvaW50ZXJEZWx0YSwgdGhpcy5wcmV2Q29vcmRzLCB0aGlzLmN1ckNvb3Jkcyk7XG4gICAgfVxuXG4gICAgc2lnbmFscy5maXJlKCdtb3ZlJywgc2lnbmFsQXJnKTtcblxuICAgIGlmICghZHVwbGljYXRlTW92ZSkge1xuICAgICAgLy8gaWYgaW50ZXJhY3RpbmcsIGZpcmUgYW4gJ2FjdGlvbi1tb3ZlJyBzaWduYWwgZXRjXG4gICAgICBpZiAodGhpcy5pbnRlcmFjdGluZygpKSB7XG4gICAgICAgIHRoaXMuZG9Nb3ZlKHNpZ25hbEFyZyk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLnBvaW50ZXJXYXNNb3ZlZCkge1xuICAgICAgICB1dGlscy5jb3B5Q29vcmRzKHRoaXMucHJldkNvb3JkcywgdGhpcy5jdXJDb29yZHMpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogYGBganNcbiAgICogaW50ZXJhY3QodGFyZ2V0KVxuICAgKiAgIC5kcmFnZ2FibGUodHJ1ZSlcbiAgICogICAub24oJ2RyYWdtb3ZlJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAqICAgICBpZiAoc29tZUNvbmRpdGlvbikge1xuICAgKiAgICAgICAvLyBjaGFuZ2UgdGhlIHNuYXAgc2V0dGluZ3NcbiAgICogICAgICAgZXZlbnQuaW50ZXJhY3RhYmxlLmRyYWdnYWJsZSh7IHNuYXA6IHsgdGFyZ2V0czogW10gfX0pO1xuICAgKiAgICAgICAvLyBmaXJlIGFub3RoZXIgbW92ZSBldmVudCB3aXRoIHJlLWNhbGN1bGF0ZWQgc25hcFxuICAgKiAgICAgICBldmVudC5pbnRlcmFjdGlvbi5kb01vdmUoKTtcbiAgICogICAgIH1cbiAgICogICB9KTtcbiAgICogYGBgXG4gICAqXG4gICAqIEZvcmNlIGEgbW92ZSBvZiB0aGUgY3VycmVudCBhY3Rpb24gYXQgdGhlIHNhbWUgY29vcmRpbmF0ZXMuIFVzZWZ1bCBpZlxuICAgKiBzbmFwL3Jlc3RyaWN0IGhhcyBiZWVuIGNoYW5nZWQgYW5kIHlvdSB3YW50IGEgbW92ZW1lbnQgd2l0aCB0aGUgbmV3XG4gICAqIHNldHRpbmdzLlxuICAgKi9cblxuXG4gIEludGVyYWN0aW9uLnByb3RvdHlwZS5kb01vdmUgPSBmdW5jdGlvbiBkb01vdmUoc2lnbmFsQXJnKSB7XG4gICAgc2lnbmFsQXJnID0gdXRpbHMuZXh0ZW5kKHtcbiAgICAgIHBvaW50ZXI6IHRoaXMucG9pbnRlcnNbMF0sXG4gICAgICBldmVudDogdGhpcy5wcmV2RXZlbnQsXG4gICAgICBldmVudFRhcmdldDogdGhpcy5fZXZlbnRUYXJnZXQsXG4gICAgICBpbnRlcmFjdGlvbjogdGhpc1xuICAgIH0sIHNpZ25hbEFyZyB8fCB7fSk7XG5cbiAgICBzaWduYWxzLmZpcmUoJ2JlZm9yZS1hY3Rpb24tbW92ZScsIHNpZ25hbEFyZyk7XG5cbiAgICBpZiAoIXRoaXMuX2RvbnRGaXJlTW92ZSkge1xuICAgICAgc2lnbmFscy5maXJlKCdhY3Rpb24tbW92ZScsIHNpZ25hbEFyZyk7XG4gICAgfVxuXG4gICAgdGhpcy5fZG9udEZpcmVNb3ZlID0gZmFsc2U7XG4gIH07XG5cbiAgLy8gRW5kIGludGVyYWN0IG1vdmUgZXZlbnRzIGFuZCBzdG9wIGF1dG8tc2Nyb2xsIHVubGVzcyBzaW11bGF0aW9uIGlzIHJ1bm5pbmdcblxuXG4gIEludGVyYWN0aW9uLnByb3RvdHlwZS5wb2ludGVyVXAgPSBmdW5jdGlvbiBwb2ludGVyVXAocG9pbnRlciwgZXZlbnQsIGV2ZW50VGFyZ2V0LCBjdXJFdmVudFRhcmdldCkge1xuICAgIHZhciBwb2ludGVySW5kZXggPSB0aGlzLmdldFBvaW50ZXJJbmRleChwb2ludGVyKTtcblxuICAgIHNpZ25hbHMuZmlyZSgvY2FuY2VsJC9pLnRlc3QoZXZlbnQudHlwZSkgPyAnY2FuY2VsJyA6ICd1cCcsIHtcbiAgICAgIHBvaW50ZXI6IHBvaW50ZXIsXG4gICAgICBwb2ludGVySW5kZXg6IHBvaW50ZXJJbmRleCxcbiAgICAgIGV2ZW50OiBldmVudCxcbiAgICAgIGV2ZW50VGFyZ2V0OiBldmVudFRhcmdldCxcbiAgICAgIGN1ckV2ZW50VGFyZ2V0OiBjdXJFdmVudFRhcmdldCxcbiAgICAgIGludGVyYWN0aW9uOiB0aGlzXG4gICAgfSk7XG5cbiAgICBpZiAoIXRoaXMuc2ltdWxhdGlvbikge1xuICAgICAgdGhpcy5lbmQoZXZlbnQpO1xuICAgIH1cblxuICAgIHRoaXMucG9pbnRlcklzRG93biA9IGZhbHNlO1xuICAgIHRoaXMucmVtb3ZlUG9pbnRlcihwb2ludGVyLCBldmVudCk7XG4gIH07XG5cbiAgLyoqXG4gICAqIGBgYGpzXG4gICAqIGludGVyYWN0KHRhcmdldClcbiAgICogICAuZHJhZ2dhYmxlKHRydWUpXG4gICAqICAgLm9uKCdtb3ZlJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAqICAgICBpZiAoZXZlbnQucGFnZVggPiAxMDAwKSB7XG4gICAqICAgICAgIC8vIGVuZCB0aGUgY3VycmVudCBhY3Rpb25cbiAgICogICAgICAgZXZlbnQuaW50ZXJhY3Rpb24uZW5kKCk7XG4gICAqICAgICAgIC8vIHN0b3AgYWxsIGZ1cnRoZXIgbGlzdGVuZXJzIGZyb20gYmVpbmcgY2FsbGVkXG4gICAqICAgICAgIGV2ZW50LnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuICAgKiAgICAgfVxuICAgKiAgIH0pO1xuICAgKiBgYGBcbiAgICpcbiAgICogU3RvcCB0aGUgY3VycmVudCBhY3Rpb24gYW5kIGZpcmUgYW4gZW5kIGV2ZW50LiBJbmVydGlhbCBtb3ZlbWVudCBkb2VzXG4gICAqIG5vdCBoYXBwZW4uXG4gICAqXG4gICAqIEBwYXJhbSB7UG9pbnRlckV2ZW50fSBbZXZlbnRdXG4gICAqL1xuXG5cbiAgSW50ZXJhY3Rpb24ucHJvdG90eXBlLmVuZCA9IGZ1bmN0aW9uIGVuZChldmVudCkge1xuICAgIHRoaXMuX2VuZGluZyA9IHRydWU7XG5cbiAgICBldmVudCA9IGV2ZW50IHx8IHRoaXMucHJldkV2ZW50O1xuXG4gICAgaWYgKHRoaXMuaW50ZXJhY3RpbmcoKSkge1xuICAgICAgc2lnbmFscy5maXJlKCdhY3Rpb24tZW5kJywge1xuICAgICAgICBldmVudDogZXZlbnQsXG4gICAgICAgIGludGVyYWN0aW9uOiB0aGlzXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICB0aGlzLnN0b3AoKTtcbiAgICB0aGlzLl9lbmRpbmcgPSBmYWxzZTtcbiAgfTtcblxuICBJbnRlcmFjdGlvbi5wcm90b3R5cGUuY3VycmVudEFjdGlvbiA9IGZ1bmN0aW9uIGN1cnJlbnRBY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuX2ludGVyYWN0aW5nID8gdGhpcy5wcmVwYXJlZC5uYW1lIDogbnVsbDtcbiAgfTtcblxuICBJbnRlcmFjdGlvbi5wcm90b3R5cGUuaW50ZXJhY3RpbmcgPSBmdW5jdGlvbiBpbnRlcmFjdGluZygpIHtcbiAgICByZXR1cm4gdGhpcy5faW50ZXJhY3Rpbmc7XG4gIH07XG5cbiAgLyoqICovXG5cblxuICBJbnRlcmFjdGlvbi5wcm90b3R5cGUuc3RvcCA9IGZ1bmN0aW9uIHN0b3AoKSB7XG4gICAgc2lnbmFscy5maXJlKCdzdG9wJywgeyBpbnRlcmFjdGlvbjogdGhpcyB9KTtcblxuICAgIGlmICh0aGlzLl9pbnRlcmFjdGluZykge1xuICAgICAgc2lnbmFscy5maXJlKCdzdG9wLWFjdGl2ZScsIHsgaW50ZXJhY3Rpb246IHRoaXMgfSk7XG4gICAgICBzaWduYWxzLmZpcmUoJ3N0b3AtJyArIHRoaXMucHJlcGFyZWQubmFtZSwgeyBpbnRlcmFjdGlvbjogdGhpcyB9KTtcbiAgICB9XG5cbiAgICB0aGlzLnRhcmdldCA9IHRoaXMuZWxlbWVudCA9IG51bGw7XG5cbiAgICB0aGlzLl9pbnRlcmFjdGluZyA9IGZhbHNlO1xuICAgIHRoaXMucHJlcGFyZWQubmFtZSA9IHRoaXMucHJldkV2ZW50ID0gbnVsbDtcbiAgfTtcblxuICBJbnRlcmFjdGlvbi5wcm90b3R5cGUuZ2V0UG9pbnRlckluZGV4ID0gZnVuY3Rpb24gZ2V0UG9pbnRlckluZGV4KHBvaW50ZXIpIHtcbiAgICAvLyBtb3VzZSBhbmQgcGVuIGludGVyYWN0aW9ucyBtYXkgaGF2ZSBvbmx5IG9uZSBwb2ludGVyXG4gICAgaWYgKHRoaXMucG9pbnRlclR5cGUgPT09ICdtb3VzZScgfHwgdGhpcy5wb2ludGVyVHlwZSA9PT0gJ3BlbicpIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnBvaW50ZXJJZHMuaW5kZXhPZih1dGlscy5nZXRQb2ludGVySWQocG9pbnRlcikpO1xuICB9O1xuXG4gIEludGVyYWN0aW9uLnByb3RvdHlwZS51cGRhdGVQb2ludGVyID0gZnVuY3Rpb24gdXBkYXRlUG9pbnRlcihwb2ludGVyLCBldmVudCkge1xuICAgIHZhciBkb3duID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgJiYgYXJndW1lbnRzWzJdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMl0gOiBldmVudCAmJiAvKGRvd258c3RhcnQpJC9pLnRlc3QoZXZlbnQudHlwZSk7XG5cbiAgICB2YXIgaWQgPSB1dGlscy5nZXRQb2ludGVySWQocG9pbnRlcik7XG4gICAgdmFyIGluZGV4ID0gdGhpcy5nZXRQb2ludGVySW5kZXgocG9pbnRlcik7XG5cbiAgICBpZiAoaW5kZXggPT09IC0xKSB7XG4gICAgICBpbmRleCA9IHRoaXMucG9pbnRlcklkcy5sZW5ndGg7XG4gICAgICB0aGlzLnBvaW50ZXJJZHNbaW5kZXhdID0gaWQ7XG4gICAgfVxuXG4gICAgaWYgKGRvd24pIHtcbiAgICAgIHNpZ25hbHMuZmlyZSgndXBkYXRlLXBvaW50ZXItZG93bicsIHtcbiAgICAgICAgcG9pbnRlcjogcG9pbnRlcixcbiAgICAgICAgZXZlbnQ6IGV2ZW50LFxuICAgICAgICBkb3duOiBkb3duLFxuICAgICAgICBwb2ludGVySWQ6IGlkLFxuICAgICAgICBwb2ludGVySW5kZXg6IGluZGV4LFxuICAgICAgICBpbnRlcmFjdGlvbjogdGhpc1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgdGhpcy5wb2ludGVyc1tpbmRleF0gPSBwb2ludGVyO1xuXG4gICAgcmV0dXJuIGluZGV4O1xuICB9O1xuXG4gIEludGVyYWN0aW9uLnByb3RvdHlwZS5yZW1vdmVQb2ludGVyID0gZnVuY3Rpb24gcmVtb3ZlUG9pbnRlcihwb2ludGVyLCBldmVudCkge1xuICAgIHZhciBpbmRleCA9IHRoaXMuZ2V0UG9pbnRlckluZGV4KHBvaW50ZXIpO1xuXG4gICAgaWYgKGluZGV4ID09PSAtMSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHNpZ25hbHMuZmlyZSgncmVtb3ZlLXBvaW50ZXInLCB7XG4gICAgICBwb2ludGVyOiBwb2ludGVyLFxuICAgICAgZXZlbnQ6IGV2ZW50LFxuICAgICAgcG9pbnRlckluZGV4OiBpbmRleCxcbiAgICAgIGludGVyYWN0aW9uOiB0aGlzXG4gICAgfSk7XG5cbiAgICB0aGlzLnBvaW50ZXJzLnNwbGljZShpbmRleCwgMSk7XG4gICAgdGhpcy5wb2ludGVySWRzLnNwbGljZShpbmRleCwgMSk7XG4gICAgdGhpcy5kb3duVGFyZ2V0cy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIHRoaXMuZG93blRpbWVzLnNwbGljZShpbmRleCwgMSk7XG4gIH07XG5cbiAgSW50ZXJhY3Rpb24ucHJvdG90eXBlLl91cGRhdGVFdmVudFRhcmdldHMgPSBmdW5jdGlvbiBfdXBkYXRlRXZlbnRUYXJnZXRzKHRhcmdldCwgY3VycmVudFRhcmdldCkge1xuICAgIHRoaXMuX2V2ZW50VGFyZ2V0ID0gdGFyZ2V0O1xuICAgIHRoaXMuX2N1ckV2ZW50VGFyZ2V0ID0gY3VycmVudFRhcmdldDtcbiAgfTtcblxuICByZXR1cm4gSW50ZXJhY3Rpb247XG59KCk7XG5cbmZvciAodmFyIF9pID0gMDsgX2kgPCBtZXRob2ROYW1lcy5sZW5ndGg7IF9pKyspIHtcbiAgdmFyIG1ldGhvZCA9IG1ldGhvZE5hbWVzW19pXTtcbiAgbGlzdGVuZXJzW21ldGhvZF0gPSBkb09uSW50ZXJhY3Rpb25zKG1ldGhvZCk7XG59XG5cbmZ1bmN0aW9uIGRvT25JbnRlcmFjdGlvbnMobWV0aG9kKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICB2YXIgcG9pbnRlclR5cGUgPSB1dGlscy5nZXRQb2ludGVyVHlwZShldmVudCk7XG5cbiAgICB2YXIgX3V0aWxzJGdldEV2ZW50VGFyZ2V0ID0gdXRpbHMuZ2V0RXZlbnRUYXJnZXRzKGV2ZW50KSxcbiAgICAgICAgZXZlbnRUYXJnZXQgPSBfdXRpbHMkZ2V0RXZlbnRUYXJnZXRbMF0sXG4gICAgICAgIGN1ckV2ZW50VGFyZ2V0ID0gX3V0aWxzJGdldEV2ZW50VGFyZ2V0WzFdO1xuXG4gICAgdmFyIG1hdGNoZXMgPSBbXTsgLy8gWyBbcG9pbnRlciwgaW50ZXJhY3Rpb25dLCAuLi5dXG5cbiAgICBpZiAoYnJvd3Nlci5zdXBwb3J0c1RvdWNoICYmIC90b3VjaC8udGVzdChldmVudC50eXBlKSkge1xuICAgICAgcHJldlRvdWNoVGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuXG4gICAgICBmb3IgKHZhciBfaTIgPSAwOyBfaTIgPCBldmVudC5jaGFuZ2VkVG91Y2hlcy5sZW5ndGg7IF9pMisrKSB7XG4gICAgICAgIHZhciBfcmVmMjtcblxuICAgICAgICBfcmVmMiA9IGV2ZW50LmNoYW5nZWRUb3VjaGVzW19pMl07XG4gICAgICAgIHZhciBjaGFuZ2VkVG91Y2ggPSBfcmVmMjtcblxuICAgICAgICB2YXIgcG9pbnRlciA9IGNoYW5nZWRUb3VjaDtcbiAgICAgICAgdmFyIGludGVyYWN0aW9uID0gZmluZGVyLnNlYXJjaChwb2ludGVyLCBldmVudC50eXBlLCBldmVudFRhcmdldCk7XG5cbiAgICAgICAgbWF0Y2hlcy5wdXNoKFtwb2ludGVyLCBpbnRlcmFjdGlvbiB8fCBuZXcgSW50ZXJhY3Rpb24oeyBwb2ludGVyVHlwZTogcG9pbnRlclR5cGUgfSldKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGludmFsaWRQb2ludGVyID0gZmFsc2U7XG5cbiAgICAgIGlmICghYnJvd3Nlci5zdXBwb3J0c1BvaW50ZXJFdmVudCAmJiAvbW91c2UvLnRlc3QoZXZlbnQudHlwZSkpIHtcbiAgICAgICAgLy8gaWdub3JlIG1vdXNlIGV2ZW50cyB3aGlsZSB0b3VjaCBpbnRlcmFjdGlvbnMgYXJlIGFjdGl2ZVxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNjb3BlLmludGVyYWN0aW9ucy5sZW5ndGggJiYgIWludmFsaWRQb2ludGVyOyBpKyspIHtcbiAgICAgICAgICBpbnZhbGlkUG9pbnRlciA9IHNjb3BlLmludGVyYWN0aW9uc1tpXS5wb2ludGVyVHlwZSAhPT0gJ21vdXNlJyAmJiBzY29wZS5pbnRlcmFjdGlvbnNbaV0ucG9pbnRlcklzRG93bjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHRyeSB0byBpZ25vcmUgbW91c2UgZXZlbnRzIHRoYXQgYXJlIHNpbXVsYXRlZCBieSB0aGUgYnJvd3NlclxuICAgICAgICAvLyBhZnRlciBhIHRvdWNoIGV2ZW50XG4gICAgICAgIGludmFsaWRQb2ludGVyID0gaW52YWxpZFBvaW50ZXIgfHwgbmV3IERhdGUoKS5nZXRUaW1lKCkgLSBwcmV2VG91Y2hUaW1lIDwgNTAwXG4gICAgICAgIC8vIG9uIGlPUyBhbmQgRmlyZWZveCBNb2JpbGUsIE1vdXNlRXZlbnQudGltZVN0YW1wIGlzIHplcm8gaWYgc2ltdWxhdGVkXG4gICAgICAgIHx8IGV2ZW50LnRpbWVTdGFtcCA9PT0gMDtcbiAgICAgIH1cblxuICAgICAgaWYgKCFpbnZhbGlkUG9pbnRlcikge1xuICAgICAgICB2YXIgX2ludGVyYWN0aW9uID0gZmluZGVyLnNlYXJjaChldmVudCwgZXZlbnQudHlwZSwgZXZlbnRUYXJnZXQpO1xuXG4gICAgICAgIGlmICghX2ludGVyYWN0aW9uKSB7XG4gICAgICAgICAgX2ludGVyYWN0aW9uID0gbmV3IEludGVyYWN0aW9uKHsgcG9pbnRlclR5cGU6IHBvaW50ZXJUeXBlIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgbWF0Y2hlcy5wdXNoKFtldmVudCwgX2ludGVyYWN0aW9uXSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yICh2YXIgX2kzID0gMDsgX2kzIDwgbWF0Y2hlcy5sZW5ndGg7IF9pMysrKSB7XG4gICAgICB2YXIgX3JlZjMgPSBtYXRjaGVzW19pM107XG4gICAgICB2YXIgX3BvaW50ZXIgPSBfcmVmM1swXTtcbiAgICAgIHZhciBfaW50ZXJhY3Rpb24yID0gX3JlZjNbMV07XG5cbiAgICAgIF9pbnRlcmFjdGlvbjIuX3VwZGF0ZUV2ZW50VGFyZ2V0cyhldmVudFRhcmdldCwgY3VyRXZlbnRUYXJnZXQpO1xuICAgICAgX2ludGVyYWN0aW9uMlttZXRob2RdKF9wb2ludGVyLCBldmVudCwgZXZlbnRUYXJnZXQsIGN1ckV2ZW50VGFyZ2V0KTtcbiAgICB9XG4gIH07XG59XG5cbmZ1bmN0aW9uIGVuZEFsbChldmVudCkge1xuICBmb3IgKHZhciBfaTQgPSAwOyBfaTQgPCBzY29wZS5pbnRlcmFjdGlvbnMubGVuZ3RoOyBfaTQrKykge1xuICAgIHZhciBfcmVmNDtcblxuICAgIF9yZWY0ID0gc2NvcGUuaW50ZXJhY3Rpb25zW19pNF07XG4gICAgdmFyIGludGVyYWN0aW9uID0gX3JlZjQ7XG5cbiAgICBpbnRlcmFjdGlvbi5lbmQoZXZlbnQpO1xuICAgIHNpZ25hbHMuZmlyZSgnZW5kYWxsJywgeyBldmVudDogZXZlbnQsIGludGVyYWN0aW9uOiBpbnRlcmFjdGlvbiB9KTtcbiAgfVxufVxuXG52YXIgZG9jRXZlbnRzID0gey8qICdldmVudFR5cGUnOiBsaXN0ZW5lckZ1bmMgKi99O1xudmFyIHBFdmVudFR5cGVzID0gYnJvd3Nlci5wRXZlbnRUeXBlcztcblxuaWYgKGRvbU9iamVjdHMuUG9pbnRlckV2ZW50KSB7XG4gIGRvY0V2ZW50c1twRXZlbnRUeXBlcy5kb3duXSA9IGxpc3RlbmVycy5wb2ludGVyRG93bjtcbiAgZG9jRXZlbnRzW3BFdmVudFR5cGVzLm1vdmVdID0gbGlzdGVuZXJzLnBvaW50ZXJNb3ZlO1xuICBkb2NFdmVudHNbcEV2ZW50VHlwZXMudXBdID0gbGlzdGVuZXJzLnBvaW50ZXJVcDtcbiAgZG9jRXZlbnRzW3BFdmVudFR5cGVzLmNhbmNlbF0gPSBsaXN0ZW5lcnMucG9pbnRlclVwO1xufSBlbHNlIHtcbiAgZG9jRXZlbnRzLm1vdXNlZG93biA9IGxpc3RlbmVycy5wb2ludGVyRG93bjtcbiAgZG9jRXZlbnRzLm1vdXNlbW92ZSA9IGxpc3RlbmVycy5wb2ludGVyTW92ZTtcbiAgZG9jRXZlbnRzLm1vdXNldXAgPSBsaXN0ZW5lcnMucG9pbnRlclVwO1xuXG4gIGRvY0V2ZW50cy50b3VjaHN0YXJ0ID0gbGlzdGVuZXJzLnBvaW50ZXJEb3duO1xuICBkb2NFdmVudHMudG91Y2htb3ZlID0gbGlzdGVuZXJzLnBvaW50ZXJNb3ZlO1xuICBkb2NFdmVudHMudG91Y2hlbmQgPSBsaXN0ZW5lcnMucG9pbnRlclVwO1xuICBkb2NFdmVudHMudG91Y2hjYW5jZWwgPSBsaXN0ZW5lcnMucG9pbnRlclVwO1xufVxuXG5kb2NFdmVudHMuYmx1ciA9IGVuZEFsbDtcblxuZnVuY3Rpb24gb25Eb2NTaWduYWwoX3JlZjUsIHNpZ25hbE5hbWUpIHtcbiAgdmFyIGRvYyA9IF9yZWY1LmRvYztcblxuICB2YXIgZXZlbnRNZXRob2QgPSBzaWduYWxOYW1lLmluZGV4T2YoJ2FkZCcpID09PSAwID8gZXZlbnRzLmFkZCA6IGV2ZW50cy5yZW1vdmU7XG5cbiAgLy8gZGVsZWdhdGUgZXZlbnQgbGlzdGVuZXJcbiAgZm9yICh2YXIgZXZlbnRUeXBlIGluIHNjb3BlLmRlbGVnYXRlZEV2ZW50cykge1xuICAgIGV2ZW50TWV0aG9kKGRvYywgZXZlbnRUeXBlLCBldmVudHMuZGVsZWdhdGVMaXN0ZW5lcik7XG4gICAgZXZlbnRNZXRob2QoZG9jLCBldmVudFR5cGUsIGV2ZW50cy5kZWxlZ2F0ZVVzZUNhcHR1cmUsIHRydWUpO1xuICB9XG5cbiAgZm9yICh2YXIgX2V2ZW50VHlwZSBpbiBkb2NFdmVudHMpIHtcbiAgICBldmVudE1ldGhvZChkb2MsIF9ldmVudFR5cGUsIGRvY0V2ZW50c1tfZXZlbnRUeXBlXSwgYnJvd3Nlci5pc0lPUyA/IHsgcGFzc2l2ZTogZmFsc2UgfSA6IHVuZGVmaW5lZCk7XG4gIH1cbn1cblxuc2lnbmFscy5vbigndXBkYXRlLXBvaW50ZXItZG93bicsIGZ1bmN0aW9uIChfcmVmNikge1xuICB2YXIgaW50ZXJhY3Rpb24gPSBfcmVmNi5pbnRlcmFjdGlvbixcbiAgICAgIHBvaW50ZXIgPSBfcmVmNi5wb2ludGVyLFxuICAgICAgcG9pbnRlcklkID0gX3JlZjYucG9pbnRlcklkLFxuICAgICAgcG9pbnRlckluZGV4ID0gX3JlZjYucG9pbnRlckluZGV4LFxuICAgICAgZXZlbnQgPSBfcmVmNi5ldmVudCxcbiAgICAgIGV2ZW50VGFyZ2V0ID0gX3JlZjYuZXZlbnRUYXJnZXQsXG4gICAgICBkb3duID0gX3JlZjYuZG93bjtcblxuICBpbnRlcmFjdGlvbi5wb2ludGVySWRzW3BvaW50ZXJJbmRleF0gPSBwb2ludGVySWQ7XG4gIGludGVyYWN0aW9uLnBvaW50ZXJzW3BvaW50ZXJJbmRleF0gPSBwb2ludGVyO1xuXG4gIGlmIChkb3duKSB7XG4gICAgaW50ZXJhY3Rpb24ucG9pbnRlcklzRG93biA9IHRydWU7XG4gIH1cblxuICBpZiAoIWludGVyYWN0aW9uLmludGVyYWN0aW5nKCkpIHtcbiAgICB1dGlscy5zZXRDb29yZHMoaW50ZXJhY3Rpb24uc3RhcnRDb29yZHMsIGludGVyYWN0aW9uLnBvaW50ZXJzKTtcblxuICAgIHV0aWxzLmNvcHlDb29yZHMoaW50ZXJhY3Rpb24uY3VyQ29vcmRzLCBpbnRlcmFjdGlvbi5zdGFydENvb3Jkcyk7XG4gICAgdXRpbHMuY29weUNvb3JkcyhpbnRlcmFjdGlvbi5wcmV2Q29vcmRzLCBpbnRlcmFjdGlvbi5zdGFydENvb3Jkcyk7XG5cbiAgICBpbnRlcmFjdGlvbi5kb3duRXZlbnQgPSBldmVudDtcbiAgICBpbnRlcmFjdGlvbi5kb3duVGltZXNbcG9pbnRlckluZGV4XSA9IGludGVyYWN0aW9uLmN1ckNvb3Jkcy50aW1lU3RhbXA7XG4gICAgaW50ZXJhY3Rpb24uZG93blRhcmdldHNbcG9pbnRlckluZGV4XSA9IGV2ZW50VGFyZ2V0IHx8IGV2ZW50ICYmIHV0aWxzLmdldEV2ZW50VGFyZ2V0cyhldmVudClbMF07XG4gICAgaW50ZXJhY3Rpb24ucG9pbnRlcldhc01vdmVkID0gZmFsc2U7XG5cbiAgICB1dGlscy5wb2ludGVyRXh0ZW5kKGludGVyYWN0aW9uLmRvd25Qb2ludGVyLCBwb2ludGVyKTtcbiAgfVxufSk7XG5cbnNjb3BlLnNpZ25hbHMub24oJ2FkZC1kb2N1bWVudCcsIG9uRG9jU2lnbmFsKTtcbnNjb3BlLnNpZ25hbHMub24oJ3JlbW92ZS1kb2N1bWVudCcsIG9uRG9jU2lnbmFsKTtcblxuSW50ZXJhY3Rpb24ucG9pbnRlck1vdmVUb2xlcmFuY2UgPSAxO1xuSW50ZXJhY3Rpb24uZG9PbkludGVyYWN0aW9ucyA9IGRvT25JbnRlcmFjdGlvbnM7XG5JbnRlcmFjdGlvbi5lbmRBbGwgPSBlbmRBbGw7XG5JbnRlcmFjdGlvbi5zaWduYWxzID0gc2lnbmFscztcbkludGVyYWN0aW9uLmRvY0V2ZW50cyA9IGRvY0V2ZW50cztcblxuc2NvcGUuZW5kQWxsSW50ZXJhY3Rpb25zID0gZW5kQWxsO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEludGVyYWN0aW9uO1xuXG59LHtcIi4vc2NvcGVcIjozMyxcIi4vdXRpbHNcIjo0NCxcIi4vdXRpbHMvU2lnbmFsc1wiOjM0LFwiLi91dGlscy9icm93c2VyXCI6MzYsXCIuL3V0aWxzL2RvbU9iamVjdHNcIjozOCxcIi4vdXRpbHMvZXZlbnRzXCI6NDAsXCIuL3V0aWxzL2ludGVyYWN0aW9uRmluZGVyXCI6NDV9XSw2OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbid1c2Ugc3RyaWN0JztcblxudmFyIEludGVyYWN0aW9uID0gcmVxdWlyZSgnLi4vSW50ZXJhY3Rpb24nKTtcbnZhciBJbnRlcmFjdEV2ZW50ID0gcmVxdWlyZSgnLi4vSW50ZXJhY3RFdmVudCcpO1xuXG52YXIgYWN0aW9ucyA9IHtcbiAgZmlyZVByZXBhcmVkOiBmaXJlUHJlcGFyZWQsXG4gIG5hbWVzOiBbXSxcbiAgbWV0aG9kRGljdDoge31cbn07XG5cbkludGVyYWN0aW9uLnNpZ25hbHMub24oJ2FjdGlvbi1zdGFydCcsIGZ1bmN0aW9uIChfcmVmKSB7XG4gIHZhciBpbnRlcmFjdGlvbiA9IF9yZWYuaW50ZXJhY3Rpb24sXG4gICAgICBldmVudCA9IF9yZWYuZXZlbnQ7XG5cbiAgaW50ZXJhY3Rpb24uX2ludGVyYWN0aW5nID0gdHJ1ZTtcbiAgZmlyZVByZXBhcmVkKGludGVyYWN0aW9uLCBldmVudCwgJ3N0YXJ0Jyk7XG59KTtcblxuSW50ZXJhY3Rpb24uc2lnbmFscy5vbignYWN0aW9uLW1vdmUnLCBmdW5jdGlvbiAoX3JlZjIpIHtcbiAgdmFyIGludGVyYWN0aW9uID0gX3JlZjIuaW50ZXJhY3Rpb24sXG4gICAgICBldmVudCA9IF9yZWYyLmV2ZW50LFxuICAgICAgcHJlRW5kID0gX3JlZjIucHJlRW5kO1xuXG4gIGZpcmVQcmVwYXJlZChpbnRlcmFjdGlvbiwgZXZlbnQsICdtb3ZlJywgcHJlRW5kKTtcblxuICAvLyBpZiB0aGUgYWN0aW9uIHdhcyBlbmRlZCBpbiBhIGxpc3RlbmVyXG4gIGlmICghaW50ZXJhY3Rpb24uaW50ZXJhY3RpbmcoKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufSk7XG5cbkludGVyYWN0aW9uLnNpZ25hbHMub24oJ2FjdGlvbi1lbmQnLCBmdW5jdGlvbiAoX3JlZjMpIHtcbiAgdmFyIGludGVyYWN0aW9uID0gX3JlZjMuaW50ZXJhY3Rpb24sXG4gICAgICBldmVudCA9IF9yZWYzLmV2ZW50O1xuXG4gIGZpcmVQcmVwYXJlZChpbnRlcmFjdGlvbiwgZXZlbnQsICdlbmQnKTtcbn0pO1xuXG5mdW5jdGlvbiBmaXJlUHJlcGFyZWQoaW50ZXJhY3Rpb24sIGV2ZW50LCBwaGFzZSwgcHJlRW5kKSB7XG4gIHZhciBhY3Rpb25OYW1lID0gaW50ZXJhY3Rpb24ucHJlcGFyZWQubmFtZTtcblxuICB2YXIgbmV3RXZlbnQgPSBuZXcgSW50ZXJhY3RFdmVudChpbnRlcmFjdGlvbiwgZXZlbnQsIGFjdGlvbk5hbWUsIHBoYXNlLCBpbnRlcmFjdGlvbi5lbGVtZW50LCBudWxsLCBwcmVFbmQpO1xuXG4gIGludGVyYWN0aW9uLnRhcmdldC5maXJlKG5ld0V2ZW50KTtcbiAgaW50ZXJhY3Rpb24ucHJldkV2ZW50ID0gbmV3RXZlbnQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYWN0aW9ucztcblxufSx7XCIuLi9JbnRlcmFjdEV2ZW50XCI6MyxcIi4uL0ludGVyYWN0aW9uXCI6NX1dLDc6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgYWN0aW9ucyA9IHJlcXVpcmUoJy4vYmFzZScpO1xudmFyIHV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMnKTtcbnZhciBJbnRlcmFjdEV2ZW50ID0gcmVxdWlyZSgnLi4vSW50ZXJhY3RFdmVudCcpO1xuLyoqIEBsZW5kcyBJbnRlcmFjdGFibGUgKi9cbnZhciBJbnRlcmFjdGFibGUgPSByZXF1aXJlKCcuLi9JbnRlcmFjdGFibGUnKTtcbnZhciBJbnRlcmFjdGlvbiA9IHJlcXVpcmUoJy4uL0ludGVyYWN0aW9uJyk7XG52YXIgZGVmYXVsdE9wdGlvbnMgPSByZXF1aXJlKCcuLi9kZWZhdWx0T3B0aW9ucycpO1xuXG52YXIgZHJhZyA9IHtcbiAgZGVmYXVsdHM6IHtcbiAgICBlbmFibGVkOiBmYWxzZSxcbiAgICBtb3VzZUJ1dHRvbnM6IG51bGwsXG5cbiAgICBvcmlnaW46IG51bGwsXG4gICAgc25hcDogbnVsbCxcbiAgICByZXN0cmljdDogbnVsbCxcbiAgICBpbmVydGlhOiBudWxsLFxuICAgIGF1dG9TY3JvbGw6IG51bGwsXG5cbiAgICBzdGFydEF4aXM6ICd4eScsXG4gICAgbG9ja0F4aXM6ICd4eSdcbiAgfSxcblxuICBjaGVja2VyOiBmdW5jdGlvbiBjaGVja2VyKHBvaW50ZXIsIGV2ZW50LCBpbnRlcmFjdGFibGUpIHtcbiAgICB2YXIgZHJhZ09wdGlvbnMgPSBpbnRlcmFjdGFibGUub3B0aW9ucy5kcmFnO1xuXG4gICAgcmV0dXJuIGRyYWdPcHRpb25zLmVuYWJsZWQgPyB7IG5hbWU6ICdkcmFnJywgYXhpczogZHJhZ09wdGlvbnMubG9ja0F4aXMgPT09ICdzdGFydCcgPyBkcmFnT3B0aW9ucy5zdGFydEF4aXMgOiBkcmFnT3B0aW9ucy5sb2NrQXhpcyB9IDogbnVsbDtcbiAgfSxcblxuICBnZXRDdXJzb3I6IGZ1bmN0aW9uIGdldEN1cnNvcigpIHtcbiAgICByZXR1cm4gJ21vdmUnO1xuICB9XG59O1xuXG5JbnRlcmFjdGlvbi5zaWduYWxzLm9uKCdiZWZvcmUtYWN0aW9uLW1vdmUnLCBmdW5jdGlvbiAoX3JlZikge1xuICB2YXIgaW50ZXJhY3Rpb24gPSBfcmVmLmludGVyYWN0aW9uO1xuXG4gIGlmIChpbnRlcmFjdGlvbi5wcmVwYXJlZC5uYW1lICE9PSAnZHJhZycpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgYXhpcyA9IGludGVyYWN0aW9uLnByZXBhcmVkLmF4aXM7XG5cbiAgaWYgKGF4aXMgPT09ICd4Jykge1xuICAgIGludGVyYWN0aW9uLmN1ckNvb3Jkcy5wYWdlLnkgPSBpbnRlcmFjdGlvbi5zdGFydENvb3Jkcy5wYWdlLnk7XG4gICAgaW50ZXJhY3Rpb24uY3VyQ29vcmRzLmNsaWVudC55ID0gaW50ZXJhY3Rpb24uc3RhcnRDb29yZHMuY2xpZW50Lnk7XG5cbiAgICBpbnRlcmFjdGlvbi5wb2ludGVyRGVsdGEucGFnZS5zcGVlZCA9IE1hdGguYWJzKGludGVyYWN0aW9uLnBvaW50ZXJEZWx0YS5wYWdlLnZ4KTtcbiAgICBpbnRlcmFjdGlvbi5wb2ludGVyRGVsdGEuY2xpZW50LnNwZWVkID0gTWF0aC5hYnMoaW50ZXJhY3Rpb24ucG9pbnRlckRlbHRhLmNsaWVudC52eCk7XG4gICAgaW50ZXJhY3Rpb24ucG9pbnRlckRlbHRhLmNsaWVudC52eSA9IDA7XG4gICAgaW50ZXJhY3Rpb24ucG9pbnRlckRlbHRhLnBhZ2UudnkgPSAwO1xuICB9IGVsc2UgaWYgKGF4aXMgPT09ICd5Jykge1xuICAgIGludGVyYWN0aW9uLmN1ckNvb3Jkcy5wYWdlLnggPSBpbnRlcmFjdGlvbi5zdGFydENvb3Jkcy5wYWdlLng7XG4gICAgaW50ZXJhY3Rpb24uY3VyQ29vcmRzLmNsaWVudC54ID0gaW50ZXJhY3Rpb24uc3RhcnRDb29yZHMuY2xpZW50Lng7XG5cbiAgICBpbnRlcmFjdGlvbi5wb2ludGVyRGVsdGEucGFnZS5zcGVlZCA9IE1hdGguYWJzKGludGVyYWN0aW9uLnBvaW50ZXJEZWx0YS5wYWdlLnZ5KTtcbiAgICBpbnRlcmFjdGlvbi5wb2ludGVyRGVsdGEuY2xpZW50LnNwZWVkID0gTWF0aC5hYnMoaW50ZXJhY3Rpb24ucG9pbnRlckRlbHRhLmNsaWVudC52eSk7XG4gICAgaW50ZXJhY3Rpb24ucG9pbnRlckRlbHRhLmNsaWVudC52eCA9IDA7XG4gICAgaW50ZXJhY3Rpb24ucG9pbnRlckRlbHRhLnBhZ2UudnggPSAwO1xuICB9XG59KTtcblxuLy8gZHJhZ21vdmVcbkludGVyYWN0RXZlbnQuc2lnbmFscy5vbignbmV3JywgZnVuY3Rpb24gKF9yZWYyKSB7XG4gIHZhciBpRXZlbnQgPSBfcmVmMi5pRXZlbnQsXG4gICAgICBpbnRlcmFjdGlvbiA9IF9yZWYyLmludGVyYWN0aW9uO1xuXG4gIGlmIChpRXZlbnQudHlwZSAhPT0gJ2RyYWdtb3ZlJykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHZhciBheGlzID0gaW50ZXJhY3Rpb24ucHJlcGFyZWQuYXhpcztcblxuICBpZiAoYXhpcyA9PT0gJ3gnKSB7XG4gICAgaUV2ZW50LnBhZ2VZID0gaW50ZXJhY3Rpb24uc3RhcnRDb29yZHMucGFnZS55O1xuICAgIGlFdmVudC5jbGllbnRZID0gaW50ZXJhY3Rpb24uc3RhcnRDb29yZHMuY2xpZW50Lnk7XG4gICAgaUV2ZW50LmR5ID0gMDtcbiAgfSBlbHNlIGlmIChheGlzID09PSAneScpIHtcbiAgICBpRXZlbnQucGFnZVggPSBpbnRlcmFjdGlvbi5zdGFydENvb3Jkcy5wYWdlLng7XG4gICAgaUV2ZW50LmNsaWVudFggPSBpbnRlcmFjdGlvbi5zdGFydENvb3Jkcy5jbGllbnQueDtcbiAgICBpRXZlbnQuZHggPSAwO1xuICB9XG59KTtcblxuLyoqXG4gKiBgYGBqc1xuICogaW50ZXJhY3QoZWxlbWVudCkuZHJhZ2dhYmxlKHtcbiAqICAgICBvbnN0YXJ0OiBmdW5jdGlvbiAoZXZlbnQpIHt9LFxuICogICAgIG9ubW92ZSA6IGZ1bmN0aW9uIChldmVudCkge30sXG4gKiAgICAgb25lbmQgIDogZnVuY3Rpb24gKGV2ZW50KSB7fSxcbiAqXG4gKiAgICAgLy8gdGhlIGF4aXMgaW4gd2hpY2ggdGhlIGZpcnN0IG1vdmVtZW50IG11c3QgYmVcbiAqICAgICAvLyBmb3IgdGhlIGRyYWcgc2VxdWVuY2UgdG8gc3RhcnRcbiAqICAgICAvLyAneHknIGJ5IGRlZmF1bHQgLSBhbnkgZGlyZWN0aW9uXG4gKiAgICAgc3RhcnRBeGlzOiAneCcgfHwgJ3knIHx8ICd4eScsXG4gKlxuICogICAgIC8vICd4eScgYnkgZGVmYXVsdCAtIGRvbid0IHJlc3RyaWN0IHRvIG9uZSBheGlzIChtb3ZlIGluIGFueSBkaXJlY3Rpb24pXG4gKiAgICAgLy8gJ3gnIG9yICd5JyB0byByZXN0cmljdCBtb3ZlbWVudCB0byBlaXRoZXIgYXhpc1xuICogICAgIC8vICdzdGFydCcgdG8gcmVzdHJpY3QgbW92ZW1lbnQgdG8gdGhlIGF4aXMgdGhlIGRyYWcgc3RhcnRlZCBpblxuICogICAgIGxvY2tBeGlzOiAneCcgfHwgJ3knIHx8ICd4eScgfHwgJ3N0YXJ0JyxcbiAqXG4gKiAgICAgLy8gbWF4IG51bWJlciBvZiBkcmFncyB0aGF0IGNhbiBoYXBwZW4gY29uY3VycmVudGx5XG4gKiAgICAgLy8gd2l0aCBlbGVtZW50cyBvZiB0aGlzIEludGVyYWN0YWJsZS4gSW5maW5pdHkgYnkgZGVmYXVsdFxuICogICAgIG1heDogSW5maW5pdHksXG4gKlxuICogICAgIC8vIG1heCBudW1iZXIgb2YgZHJhZ3MgdGhhdCBjYW4gdGFyZ2V0IHRoZSBzYW1lIGVsZW1lbnQrSW50ZXJhY3RhYmxlXG4gKiAgICAgLy8gMSBieSBkZWZhdWx0XG4gKiAgICAgbWF4UGVyRWxlbWVudDogMlxuICogfSk7XG4gKlxuICogdmFyIGlzRHJhZ2dhYmxlID0gaW50ZXJhY3QoJ2VsZW1lbnQnKS5kcmFnZ2FibGUoKTsgLy8gdHJ1ZVxuICogYGBgXG4gKlxuICogR2V0IG9yIHNldCB3aGV0aGVyIGRyYWcgYWN0aW9ucyBjYW4gYmUgcGVyZm9ybWVkIG9uIHRoZSB0YXJnZXRcbiAqXG4gKiBAcGFyYW0ge2Jvb2xlYW4gfCBvYmplY3R9IFtvcHRpb25zXSB0cnVlL2ZhbHNlIG9yIEFuIG9iamVjdCB3aXRoIGV2ZW50XG4gKiBsaXN0ZW5lcnMgdG8gYmUgZmlyZWQgb24gZHJhZyBldmVudHMgKG9iamVjdCBtYWtlcyB0aGUgSW50ZXJhY3RhYmxlXG4gKiBkcmFnZ2FibGUpXG4gKiBAcmV0dXJuIHtib29sZWFuIHwgSW50ZXJhY3RhYmxlfSBib29sZWFuIGluZGljYXRpbmcgaWYgdGhpcyBjYW4gYmUgdGhlXG4gKiB0YXJnZXQgb2YgZHJhZyBldmVudHMsIG9yIHRoaXMgSW50ZXJjdGFibGVcbiAqL1xuSW50ZXJhY3RhYmxlLnByb3RvdHlwZS5kcmFnZ2FibGUgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICBpZiAodXRpbHMuaXMub2JqZWN0KG9wdGlvbnMpKSB7XG4gICAgdGhpcy5vcHRpb25zLmRyYWcuZW5hYmxlZCA9IG9wdGlvbnMuZW5hYmxlZCA9PT0gZmFsc2UgPyBmYWxzZSA6IHRydWU7XG4gICAgdGhpcy5zZXRQZXJBY3Rpb24oJ2RyYWcnLCBvcHRpb25zKTtcbiAgICB0aGlzLnNldE9uRXZlbnRzKCdkcmFnJywgb3B0aW9ucyk7XG5cbiAgICBpZiAoL14oeHl8eHx5fHN0YXJ0KSQvLnRlc3Qob3B0aW9ucy5sb2NrQXhpcykpIHtcbiAgICAgIHRoaXMub3B0aW9ucy5kcmFnLmxvY2tBeGlzID0gb3B0aW9ucy5sb2NrQXhpcztcbiAgICB9XG4gICAgaWYgKC9eKHh5fHh8eSkkLy50ZXN0KG9wdGlvbnMuc3RhcnRBeGlzKSkge1xuICAgICAgdGhpcy5vcHRpb25zLmRyYWcuc3RhcnRBeGlzID0gb3B0aW9ucy5zdGFydEF4aXM7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBpZiAodXRpbHMuaXMuYm9vbChvcHRpb25zKSkge1xuICAgIHRoaXMub3B0aW9ucy5kcmFnLmVuYWJsZWQgPSBvcHRpb25zO1xuXG4gICAgaWYgKCFvcHRpb25zKSB7XG4gICAgICB0aGlzLm9uZHJhZ3N0YXJ0ID0gdGhpcy5vbmRyYWdzdGFydCA9IHRoaXMub25kcmFnZW5kID0gbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHJldHVybiB0aGlzLm9wdGlvbnMuZHJhZztcbn07XG5cbmFjdGlvbnMuZHJhZyA9IGRyYWc7XG5hY3Rpb25zLm5hbWVzLnB1c2goJ2RyYWcnKTtcbnV0aWxzLm1lcmdlKEludGVyYWN0YWJsZS5ldmVudFR5cGVzLCBbJ2RyYWdzdGFydCcsICdkcmFnbW92ZScsICdkcmFnaW5lcnRpYXN0YXJ0JywgJ2RyYWdpbmVydGlhcmVzdW1lJywgJ2RyYWdlbmQnXSk7XG5hY3Rpb25zLm1ldGhvZERpY3QuZHJhZyA9ICdkcmFnZ2FibGUnO1xuXG5kZWZhdWx0T3B0aW9ucy5kcmFnID0gZHJhZy5kZWZhdWx0cztcblxubW9kdWxlLmV4cG9ydHMgPSBkcmFnO1xuXG59LHtcIi4uL0ludGVyYWN0RXZlbnRcIjozLFwiLi4vSW50ZXJhY3RhYmxlXCI6NCxcIi4uL0ludGVyYWN0aW9uXCI6NSxcIi4uL2RlZmF1bHRPcHRpb25zXCI6MTgsXCIuLi91dGlsc1wiOjQ0LFwiLi9iYXNlXCI6Nn1dLDg6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgYWN0aW9ucyA9IHJlcXVpcmUoJy4vYmFzZScpO1xudmFyIHV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMnKTtcbnZhciBzY29wZSA9IHJlcXVpcmUoJy4uL3Njb3BlJyk7XG4vKiogQGxlbmRzIG1vZHVsZTppbnRlcmFjdCAqL1xudmFyIGludGVyYWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJhY3QnKTtcbnZhciBJbnRlcmFjdEV2ZW50ID0gcmVxdWlyZSgnLi4vSW50ZXJhY3RFdmVudCcpO1xuLyoqIEBsZW5kcyBJbnRlcmFjdGFibGUgKi9cbnZhciBJbnRlcmFjdGFibGUgPSByZXF1aXJlKCcuLi9JbnRlcmFjdGFibGUnKTtcbnZhciBJbnRlcmFjdGlvbiA9IHJlcXVpcmUoJy4uL0ludGVyYWN0aW9uJyk7XG52YXIgZGVmYXVsdE9wdGlvbnMgPSByZXF1aXJlKCcuLi9kZWZhdWx0T3B0aW9ucycpO1xuXG52YXIgZHJvcCA9IHtcbiAgZGVmYXVsdHM6IHtcbiAgICBlbmFibGVkOiBmYWxzZSxcbiAgICBhY2NlcHQ6IG51bGwsXG4gICAgb3ZlcmxhcDogJ3BvaW50ZXInXG4gIH1cbn07XG5cbnZhciBkeW5hbWljRHJvcCA9IGZhbHNlO1xuXG5JbnRlcmFjdGlvbi5zaWduYWxzLm9uKCdhY3Rpb24tc3RhcnQnLCBmdW5jdGlvbiAoX3JlZikge1xuICB2YXIgaW50ZXJhY3Rpb24gPSBfcmVmLmludGVyYWN0aW9uLFxuICAgICAgZXZlbnQgPSBfcmVmLmV2ZW50O1xuXG4gIGlmIChpbnRlcmFjdGlvbi5wcmVwYXJlZC5uYW1lICE9PSAnZHJhZycpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyByZXNldCBhY3RpdmUgZHJvcHpvbmVzXG4gIGludGVyYWN0aW9uLmFjdGl2ZURyb3BzLmRyb3B6b25lcyA9IFtdO1xuICBpbnRlcmFjdGlvbi5hY3RpdmVEcm9wcy5lbGVtZW50cyA9IFtdO1xuICBpbnRlcmFjdGlvbi5hY3RpdmVEcm9wcy5yZWN0cyA9IFtdO1xuXG4gIGludGVyYWN0aW9uLmRyb3BFdmVudHMgPSBudWxsO1xuXG4gIGlmICghaW50ZXJhY3Rpb24uZHluYW1pY0Ryb3ApIHtcbiAgICBzZXRBY3RpdmVEcm9wcyhpbnRlcmFjdGlvbi5hY3RpdmVEcm9wcywgaW50ZXJhY3Rpb24uZWxlbWVudCk7XG4gIH1cblxuICB2YXIgZHJhZ0V2ZW50ID0gaW50ZXJhY3Rpb24ucHJldkV2ZW50O1xuICB2YXIgZHJvcEV2ZW50cyA9IGdldERyb3BFdmVudHMoaW50ZXJhY3Rpb24sIGV2ZW50LCBkcmFnRXZlbnQpO1xuXG4gIGlmIChkcm9wRXZlbnRzLmFjdGl2YXRlKSB7XG4gICAgZmlyZUFjdGl2ZURyb3BzKGludGVyYWN0aW9uLmFjdGl2ZURyb3BzLCBkcm9wRXZlbnRzLmFjdGl2YXRlKTtcbiAgfVxufSk7XG5cbkludGVyYWN0RXZlbnQuc2lnbmFscy5vbignbmV3JywgZnVuY3Rpb24gKF9yZWYyKSB7XG4gIHZhciBpbnRlcmFjdGlvbiA9IF9yZWYyLmludGVyYWN0aW9uLFxuICAgICAgaUV2ZW50ID0gX3JlZjIuaUV2ZW50LFxuICAgICAgZXZlbnQgPSBfcmVmMi5ldmVudDtcblxuICBpZiAoaUV2ZW50LnR5cGUgIT09ICdkcmFnbW92ZScgJiYgaUV2ZW50LnR5cGUgIT09ICdkcmFnZW5kJykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHZhciBkcmFnZ2FibGVFbGVtZW50ID0gaW50ZXJhY3Rpb24uZWxlbWVudDtcbiAgdmFyIGRyYWdFdmVudCA9IGlFdmVudDtcbiAgdmFyIGRyb3BSZXN1bHQgPSBnZXREcm9wKGRyYWdFdmVudCwgZXZlbnQsIGRyYWdnYWJsZUVsZW1lbnQpO1xuXG4gIGludGVyYWN0aW9uLmRyb3BUYXJnZXQgPSBkcm9wUmVzdWx0LmRyb3B6b25lO1xuICBpbnRlcmFjdGlvbi5kcm9wRWxlbWVudCA9IGRyb3BSZXN1bHQuZWxlbWVudDtcblxuICBpbnRlcmFjdGlvbi5kcm9wRXZlbnRzID0gZ2V0RHJvcEV2ZW50cyhpbnRlcmFjdGlvbiwgZXZlbnQsIGRyYWdFdmVudCk7XG59KTtcblxuSW50ZXJhY3Rpb24uc2lnbmFscy5vbignYWN0aW9uLW1vdmUnLCBmdW5jdGlvbiAoX3JlZjMpIHtcbiAgdmFyIGludGVyYWN0aW9uID0gX3JlZjMuaW50ZXJhY3Rpb247XG5cbiAgaWYgKGludGVyYWN0aW9uLnByZXBhcmVkLm5hbWUgIT09ICdkcmFnJykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGZpcmVEcm9wRXZlbnRzKGludGVyYWN0aW9uLCBpbnRlcmFjdGlvbi5kcm9wRXZlbnRzKTtcbn0pO1xuXG5JbnRlcmFjdGlvbi5zaWduYWxzLm9uKCdhY3Rpb24tZW5kJywgZnVuY3Rpb24gKF9yZWY0KSB7XG4gIHZhciBpbnRlcmFjdGlvbiA9IF9yZWY0LmludGVyYWN0aW9uO1xuXG4gIGlmIChpbnRlcmFjdGlvbi5wcmVwYXJlZC5uYW1lID09PSAnZHJhZycpIHtcbiAgICBmaXJlRHJvcEV2ZW50cyhpbnRlcmFjdGlvbiwgaW50ZXJhY3Rpb24uZHJvcEV2ZW50cyk7XG4gIH1cbn0pO1xuXG5JbnRlcmFjdGlvbi5zaWduYWxzLm9uKCdzdG9wLWRyYWcnLCBmdW5jdGlvbiAoX3JlZjUpIHtcbiAgdmFyIGludGVyYWN0aW9uID0gX3JlZjUuaW50ZXJhY3Rpb247XG5cbiAgaW50ZXJhY3Rpb24uYWN0aXZlRHJvcHMgPSB7XG4gICAgZHJvcHpvbmVzOiBudWxsLFxuICAgIGVsZW1lbnRzOiBudWxsLFxuICAgIHJlY3RzOiBudWxsXG4gIH07XG5cbiAgaW50ZXJhY3Rpb24uZHJvcEV2ZW50cyA9IG51bGw7XG59KTtcblxuZnVuY3Rpb24gY29sbGVjdERyb3BzKGFjdGl2ZURyb3BzLCBlbGVtZW50KSB7XG4gIHZhciBkcm9wcyA9IFtdO1xuICB2YXIgZWxlbWVudHMgPSBbXTtcblxuICAvLyBjb2xsZWN0IGFsbCBkcm9wem9uZXMgYW5kIHRoZWlyIGVsZW1lbnRzIHdoaWNoIHF1YWxpZnkgZm9yIGEgZHJvcFxuICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgc2NvcGUuaW50ZXJhY3RhYmxlcy5sZW5ndGg7IF9pKyspIHtcbiAgICB2YXIgX3JlZjY7XG5cbiAgICBfcmVmNiA9IHNjb3BlLmludGVyYWN0YWJsZXNbX2ldO1xuICAgIHZhciBjdXJyZW50ID0gX3JlZjY7XG5cbiAgICBpZiAoIWN1cnJlbnQub3B0aW9ucy5kcm9wLmVuYWJsZWQpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIHZhciBhY2NlcHQgPSBjdXJyZW50Lm9wdGlvbnMuZHJvcC5hY2NlcHQ7XG5cbiAgICAvLyB0ZXN0IHRoZSBkcmFnZ2FibGUgZWxlbWVudCBhZ2FpbnN0IHRoZSBkcm9wem9uZSdzIGFjY2VwdCBzZXR0aW5nXG4gICAgaWYgKHV0aWxzLmlzLmVsZW1lbnQoYWNjZXB0KSAmJiBhY2NlcHQgIT09IGVsZW1lbnQgfHwgdXRpbHMuaXMuc3RyaW5nKGFjY2VwdCkgJiYgIXV0aWxzLm1hdGNoZXNTZWxlY3RvcihlbGVtZW50LCBhY2NlcHQpKSB7XG5cbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8vIHF1ZXJ5IGZvciBuZXcgZWxlbWVudHMgaWYgbmVjZXNzYXJ5XG4gICAgdmFyIGRyb3BFbGVtZW50cyA9IHV0aWxzLmlzLnN0cmluZyhjdXJyZW50LnRhcmdldCkgPyBjdXJyZW50Ll9jb250ZXh0LnF1ZXJ5U2VsZWN0b3JBbGwoY3VycmVudC50YXJnZXQpIDogW2N1cnJlbnQudGFyZ2V0XTtcblxuICAgIGZvciAodmFyIF9pMiA9IDA7IF9pMiA8IGRyb3BFbGVtZW50cy5sZW5ndGg7IF9pMisrKSB7XG4gICAgICB2YXIgX3JlZjc7XG5cbiAgICAgIF9yZWY3ID0gZHJvcEVsZW1lbnRzW19pMl07XG4gICAgICB2YXIgY3VycmVudEVsZW1lbnQgPSBfcmVmNztcblxuICAgICAgaWYgKGN1cnJlbnRFbGVtZW50ICE9PSBlbGVtZW50KSB7XG4gICAgICAgIGRyb3BzLnB1c2goY3VycmVudCk7XG4gICAgICAgIGVsZW1lbnRzLnB1c2goY3VycmVudEVsZW1lbnQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgZWxlbWVudHM6IGVsZW1lbnRzLFxuICAgIGRyb3B6b25lczogZHJvcHNcbiAgfTtcbn1cblxuZnVuY3Rpb24gZmlyZUFjdGl2ZURyb3BzKGFjdGl2ZURyb3BzLCBldmVudCkge1xuICB2YXIgcHJldkVsZW1lbnQgPSB2b2lkIDA7XG5cbiAgLy8gbG9vcCB0aHJvdWdoIGFsbCBhY3RpdmUgZHJvcHpvbmVzIGFuZCB0cmlnZ2VyIGV2ZW50XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYWN0aXZlRHJvcHMuZHJvcHpvbmVzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGN1cnJlbnQgPSBhY3RpdmVEcm9wcy5kcm9wem9uZXNbaV07XG4gICAgdmFyIGN1cnJlbnRFbGVtZW50ID0gYWN0aXZlRHJvcHMuZWxlbWVudHNbaV07XG5cbiAgICAvLyBwcmV2ZW50IHRyaWdnZXIgb2YgZHVwbGljYXRlIGV2ZW50cyBvbiBzYW1lIGVsZW1lbnRcbiAgICBpZiAoY3VycmVudEVsZW1lbnQgIT09IHByZXZFbGVtZW50KSB7XG4gICAgICAvLyBzZXQgY3VycmVudCBlbGVtZW50IGFzIGV2ZW50IHRhcmdldFxuICAgICAgZXZlbnQudGFyZ2V0ID0gY3VycmVudEVsZW1lbnQ7XG4gICAgICBjdXJyZW50LmZpcmUoZXZlbnQpO1xuICAgIH1cbiAgICBwcmV2RWxlbWVudCA9IGN1cnJlbnRFbGVtZW50O1xuICB9XG59XG5cbi8vIENvbGxlY3QgYSBuZXcgc2V0IG9mIHBvc3NpYmxlIGRyb3BzIGFuZCBzYXZlIHRoZW0gaW4gYWN0aXZlRHJvcHMuXG4vLyBzZXRBY3RpdmVEcm9wcyBzaG91bGQgYWx3YXlzIGJlIGNhbGxlZCB3aGVuIGEgZHJhZyBoYXMganVzdCBzdGFydGVkIG9yIGFcbi8vIGRyYWcgZXZlbnQgaGFwcGVucyB3aGlsZSBkeW5hbWljRHJvcCBpcyB0cnVlXG5mdW5jdGlvbiBzZXRBY3RpdmVEcm9wcyhhY3RpdmVEcm9wcywgZHJhZ0VsZW1lbnQpIHtcbiAgLy8gZ2V0IGRyb3B6b25lcyBhbmQgdGhlaXIgZWxlbWVudHMgdGhhdCBjb3VsZCByZWNlaXZlIHRoZSBkcmFnZ2FibGVcbiAgdmFyIHBvc3NpYmxlRHJvcHMgPSBjb2xsZWN0RHJvcHMoYWN0aXZlRHJvcHMsIGRyYWdFbGVtZW50KTtcblxuICBhY3RpdmVEcm9wcy5kcm9wem9uZXMgPSBwb3NzaWJsZURyb3BzLmRyb3B6b25lcztcbiAgYWN0aXZlRHJvcHMuZWxlbWVudHMgPSBwb3NzaWJsZURyb3BzLmVsZW1lbnRzO1xuICBhY3RpdmVEcm9wcy5yZWN0cyA9IFtdO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYWN0aXZlRHJvcHMuZHJvcHpvbmVzLmxlbmd0aDsgaSsrKSB7XG4gICAgYWN0aXZlRHJvcHMucmVjdHNbaV0gPSBhY3RpdmVEcm9wcy5kcm9wem9uZXNbaV0uZ2V0UmVjdChhY3RpdmVEcm9wcy5lbGVtZW50c1tpXSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0RHJvcChkcmFnRXZlbnQsIGV2ZW50LCBkcmFnRWxlbWVudCkge1xuICB2YXIgaW50ZXJhY3Rpb24gPSBkcmFnRXZlbnQuaW50ZXJhY3Rpb247XG4gIHZhciB2YWxpZERyb3BzID0gW107XG5cbiAgaWYgKGR5bmFtaWNEcm9wKSB7XG4gICAgc2V0QWN0aXZlRHJvcHMoaW50ZXJhY3Rpb24uYWN0aXZlRHJvcHMsIGRyYWdFbGVtZW50KTtcbiAgfVxuXG4gIC8vIGNvbGxlY3QgYWxsIGRyb3B6b25lcyBhbmQgdGhlaXIgZWxlbWVudHMgd2hpY2ggcXVhbGlmeSBmb3IgYSBkcm9wXG4gIGZvciAodmFyIGogPSAwOyBqIDwgaW50ZXJhY3Rpb24uYWN0aXZlRHJvcHMuZHJvcHpvbmVzLmxlbmd0aDsgaisrKSB7XG4gICAgdmFyIGN1cnJlbnQgPSBpbnRlcmFjdGlvbi5hY3RpdmVEcm9wcy5kcm9wem9uZXNbal07XG4gICAgdmFyIGN1cnJlbnRFbGVtZW50ID0gaW50ZXJhY3Rpb24uYWN0aXZlRHJvcHMuZWxlbWVudHNbal07XG4gICAgdmFyIHJlY3QgPSBpbnRlcmFjdGlvbi5hY3RpdmVEcm9wcy5yZWN0c1tqXTtcblxuICAgIHZhbGlkRHJvcHMucHVzaChjdXJyZW50LmRyb3BDaGVjayhkcmFnRXZlbnQsIGV2ZW50LCBpbnRlcmFjdGlvbi50YXJnZXQsIGRyYWdFbGVtZW50LCBjdXJyZW50RWxlbWVudCwgcmVjdCkgPyBjdXJyZW50RWxlbWVudCA6IG51bGwpO1xuICB9XG5cbiAgLy8gZ2V0IHRoZSBtb3N0IGFwcHJvcHJpYXRlIGRyb3B6b25lIGJhc2VkIG9uIERPTSBkZXB0aCBhbmQgb3JkZXJcbiAgdmFyIGRyb3BJbmRleCA9IHV0aWxzLmluZGV4T2ZEZWVwZXN0RWxlbWVudCh2YWxpZERyb3BzKTtcblxuICByZXR1cm4ge1xuICAgIGRyb3B6b25lOiBpbnRlcmFjdGlvbi5hY3RpdmVEcm9wcy5kcm9wem9uZXNbZHJvcEluZGV4XSB8fCBudWxsLFxuICAgIGVsZW1lbnQ6IGludGVyYWN0aW9uLmFjdGl2ZURyb3BzLmVsZW1lbnRzW2Ryb3BJbmRleF0gfHwgbnVsbFxuICB9O1xufVxuXG5mdW5jdGlvbiBnZXREcm9wRXZlbnRzKGludGVyYWN0aW9uLCBwb2ludGVyRXZlbnQsIGRyYWdFdmVudCkge1xuICB2YXIgZHJvcEV2ZW50cyA9IHtcbiAgICBlbnRlcjogbnVsbCxcbiAgICBsZWF2ZTogbnVsbCxcbiAgICBhY3RpdmF0ZTogbnVsbCxcbiAgICBkZWFjdGl2YXRlOiBudWxsLFxuICAgIG1vdmU6IG51bGwsXG4gICAgZHJvcDogbnVsbFxuICB9O1xuXG4gIHZhciB0bXBsID0ge1xuICAgIGRyYWdFdmVudDogZHJhZ0V2ZW50LFxuICAgIGludGVyYWN0aW9uOiBpbnRlcmFjdGlvbixcbiAgICB0YXJnZXQ6IGludGVyYWN0aW9uLmRyb3BFbGVtZW50LFxuICAgIGRyb3B6b25lOiBpbnRlcmFjdGlvbi5kcm9wVGFyZ2V0LFxuICAgIHJlbGF0ZWRUYXJnZXQ6IGRyYWdFdmVudC50YXJnZXQsXG4gICAgZHJhZ2dhYmxlOiBkcmFnRXZlbnQuaW50ZXJhY3RhYmxlLFxuICAgIHRpbWVTdGFtcDogZHJhZ0V2ZW50LnRpbWVTdGFtcFxuICB9O1xuXG4gIGlmIChpbnRlcmFjdGlvbi5kcm9wRWxlbWVudCAhPT0gaW50ZXJhY3Rpb24ucHJldkRyb3BFbGVtZW50KSB7XG4gICAgLy8gaWYgdGhlcmUgd2FzIGEgcHJldkRyb3BUYXJnZXQsIGNyZWF0ZSBhIGRyYWdsZWF2ZSBldmVudFxuICAgIGlmIChpbnRlcmFjdGlvbi5wcmV2RHJvcFRhcmdldCkge1xuICAgICAgZHJvcEV2ZW50cy5sZWF2ZSA9IHV0aWxzLmV4dGVuZCh7IHR5cGU6ICdkcmFnbGVhdmUnIH0sIHRtcGwpO1xuXG4gICAgICBkcmFnRXZlbnQuZHJhZ0xlYXZlID0gZHJvcEV2ZW50cy5sZWF2ZS50YXJnZXQgPSBpbnRlcmFjdGlvbi5wcmV2RHJvcEVsZW1lbnQ7XG4gICAgICBkcmFnRXZlbnQucHJldkRyb3B6b25lID0gZHJvcEV2ZW50cy5sZWF2ZS5kcm9wem9uZSA9IGludGVyYWN0aW9uLnByZXZEcm9wVGFyZ2V0O1xuICAgIH1cbiAgICAvLyBpZiB0aGUgZHJvcFRhcmdldCBpcyBub3QgbnVsbCwgY3JlYXRlIGEgZHJhZ2VudGVyIGV2ZW50XG4gICAgaWYgKGludGVyYWN0aW9uLmRyb3BUYXJnZXQpIHtcbiAgICAgIGRyb3BFdmVudHMuZW50ZXIgPSB7XG4gICAgICAgIGRyYWdFdmVudDogZHJhZ0V2ZW50LFxuICAgICAgICBpbnRlcmFjdGlvbjogaW50ZXJhY3Rpb24sXG4gICAgICAgIHRhcmdldDogaW50ZXJhY3Rpb24uZHJvcEVsZW1lbnQsXG4gICAgICAgIGRyb3B6b25lOiBpbnRlcmFjdGlvbi5kcm9wVGFyZ2V0LFxuICAgICAgICByZWxhdGVkVGFyZ2V0OiBkcmFnRXZlbnQudGFyZ2V0LFxuICAgICAgICBkcmFnZ2FibGU6IGRyYWdFdmVudC5pbnRlcmFjdGFibGUsXG4gICAgICAgIHRpbWVTdGFtcDogZHJhZ0V2ZW50LnRpbWVTdGFtcCxcbiAgICAgICAgdHlwZTogJ2RyYWdlbnRlcidcbiAgICAgIH07XG5cbiAgICAgIGRyYWdFdmVudC5kcmFnRW50ZXIgPSBpbnRlcmFjdGlvbi5kcm9wRWxlbWVudDtcbiAgICAgIGRyYWdFdmVudC5kcm9wem9uZSA9IGludGVyYWN0aW9uLmRyb3BUYXJnZXQ7XG4gICAgfVxuICB9XG5cbiAgaWYgKGRyYWdFdmVudC50eXBlID09PSAnZHJhZ2VuZCcgJiYgaW50ZXJhY3Rpb24uZHJvcFRhcmdldCkge1xuICAgIGRyb3BFdmVudHMuZHJvcCA9IHV0aWxzLmV4dGVuZCh7IHR5cGU6ICdkcm9wJyB9LCB0bXBsKTtcblxuICAgIGRyYWdFdmVudC5kcm9wem9uZSA9IGludGVyYWN0aW9uLmRyb3BUYXJnZXQ7XG4gICAgZHJhZ0V2ZW50LnJlbGF0ZWRUYXJnZXQgPSBpbnRlcmFjdGlvbi5kcm9wRWxlbWVudDtcbiAgfVxuICBpZiAoZHJhZ0V2ZW50LnR5cGUgPT09ICdkcmFnc3RhcnQnKSB7XG4gICAgZHJvcEV2ZW50cy5hY3RpdmF0ZSA9IHV0aWxzLmV4dGVuZCh7IHR5cGU6ICdkcm9wYWN0aXZhdGUnIH0sIHRtcGwpO1xuXG4gICAgZHJvcEV2ZW50cy5hY3RpdmF0ZS50YXJnZXQgPSBudWxsO1xuICAgIGRyb3BFdmVudHMuYWN0aXZhdGUuZHJvcHpvbmUgPSBudWxsO1xuICB9XG4gIGlmIChkcmFnRXZlbnQudHlwZSA9PT0gJ2RyYWdlbmQnKSB7XG4gICAgZHJvcEV2ZW50cy5kZWFjdGl2YXRlID0gdXRpbHMuZXh0ZW5kKHsgdHlwZTogJ2Ryb3BkZWFjdGl2YXRlJyB9LCB0bXBsKTtcblxuICAgIGRyb3BFdmVudHMuZGVhY3RpdmF0ZS50YXJnZXQgPSBudWxsO1xuICAgIGRyb3BFdmVudHMuZGVhY3RpdmF0ZS5kcm9wem9uZSA9IG51bGw7XG4gIH1cbiAgaWYgKGRyYWdFdmVudC50eXBlID09PSAnZHJhZ21vdmUnICYmIGludGVyYWN0aW9uLmRyb3BUYXJnZXQpIHtcbiAgICBkcm9wRXZlbnRzLm1vdmUgPSB1dGlscy5leHRlbmQoe1xuICAgICAgZHJhZ21vdmU6IGRyYWdFdmVudCxcbiAgICAgIHR5cGU6ICdkcm9wbW92ZSdcbiAgICB9LCB0bXBsKTtcblxuICAgIGRyYWdFdmVudC5kcm9wem9uZSA9IGludGVyYWN0aW9uLmRyb3BUYXJnZXQ7XG4gIH1cblxuICByZXR1cm4gZHJvcEV2ZW50cztcbn1cblxuZnVuY3Rpb24gZmlyZURyb3BFdmVudHMoaW50ZXJhY3Rpb24sIGRyb3BFdmVudHMpIHtcbiAgdmFyIGFjdGl2ZURyb3BzID0gaW50ZXJhY3Rpb24uYWN0aXZlRHJvcHMsXG4gICAgICBwcmV2RHJvcFRhcmdldCA9IGludGVyYWN0aW9uLnByZXZEcm9wVGFyZ2V0LFxuICAgICAgZHJvcFRhcmdldCA9IGludGVyYWN0aW9uLmRyb3BUYXJnZXQsXG4gICAgICBkcm9wRWxlbWVudCA9IGludGVyYWN0aW9uLmRyb3BFbGVtZW50O1xuXG5cbiAgaWYgKGRyb3BFdmVudHMubGVhdmUpIHtcbiAgICBwcmV2RHJvcFRhcmdldC5maXJlKGRyb3BFdmVudHMubGVhdmUpO1xuICB9XG4gIGlmIChkcm9wRXZlbnRzLm1vdmUpIHtcbiAgICBkcm9wVGFyZ2V0LmZpcmUoZHJvcEV2ZW50cy5tb3ZlKTtcbiAgfVxuICBpZiAoZHJvcEV2ZW50cy5lbnRlcikge1xuICAgIGRyb3BUYXJnZXQuZmlyZShkcm9wRXZlbnRzLmVudGVyKTtcbiAgfVxuICBpZiAoZHJvcEV2ZW50cy5kcm9wKSB7XG4gICAgZHJvcFRhcmdldC5maXJlKGRyb3BFdmVudHMuZHJvcCk7XG4gIH1cbiAgaWYgKGRyb3BFdmVudHMuZGVhY3RpdmF0ZSkge1xuICAgIGZpcmVBY3RpdmVEcm9wcyhhY3RpdmVEcm9wcywgZHJvcEV2ZW50cy5kZWFjdGl2YXRlKTtcbiAgfVxuXG4gIGludGVyYWN0aW9uLnByZXZEcm9wVGFyZ2V0ID0gZHJvcFRhcmdldDtcbiAgaW50ZXJhY3Rpb24ucHJldkRyb3BFbGVtZW50ID0gZHJvcEVsZW1lbnQ7XG59XG5cbi8qKlxuICogYGBganNcbiAqIGludGVyYWN0KHRhcmdldClcbiAqIC5kcm9wQ2hlY2tlcihmdW5jdGlvbihkcmFnRXZlbnQsICAgICAgICAgLy8gcmVsYXRlZCBkcmFnbW92ZSBvciBkcmFnZW5kIGV2ZW50XG4gKiAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQsICAgICAgICAgICAgIC8vIFRvdWNoRXZlbnQvUG9pbnRlckV2ZW50L01vdXNlRXZlbnRcbiAqICAgICAgICAgICAgICAgICAgICAgICBkcm9wcGVkLCAgICAgICAgICAgLy8gYm9vbCByZXN1bHQgb2YgdGhlIGRlZmF1bHQgY2hlY2tlclxuICogICAgICAgICAgICAgICAgICAgICAgIGRyb3B6b25lLCAgICAgICAgICAvLyBkcm9wem9uZSBJbnRlcmFjdGFibGVcbiAqICAgICAgICAgICAgICAgICAgICAgICBkcm9wRWxlbWVudCwgICAgICAgLy8gZHJvcHpvbmUgZWxlbW50XG4gKiAgICAgICAgICAgICAgICAgICAgICAgZHJhZ2dhYmxlLCAgICAgICAgIC8vIGRyYWdnYWJsZSBJbnRlcmFjdGFibGVcbiAqICAgICAgICAgICAgICAgICAgICAgICBkcmFnZ2FibGVFbGVtZW50KSB7Ly8gZHJhZ2dhYmxlIGVsZW1lbnRcbiAqXG4gKiAgIHJldHVybiBkcm9wcGVkICYmIGV2ZW50LnRhcmdldC5oYXNBdHRyaWJ1dGUoJ2FsbG93LWRyb3AnKTtcbiAqIH1cbiAqIGBgYFxuICpcbiAqIGBgYGpzXG4gKiBpbnRlcmFjdCgnLmRyb3AnKS5kcm9wem9uZSh7XG4gKiAgIGFjY2VwdDogJy5jYW4tZHJvcCcgfHwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NpbmdsZS1kcm9wJyksXG4gKiAgIG92ZXJsYXA6ICdwb2ludGVyJyB8fCAnY2VudGVyJyB8fCB6ZXJvVG9PbmVcbiAqIH1cbiAqIGBgYFxuICpcbiAqIFJldHVybnMgb3Igc2V0cyB3aGV0aGVyIGRyYWdnYWJsZXMgY2FuIGJlIGRyb3BwZWQgb250byB0aGlzIHRhcmdldCB0b1xuICogdHJpZ2dlciBkcm9wIGV2ZW50c1xuICpcbiAqIERyb3B6b25lcyBjYW4gcmVjZWl2ZSB0aGUgZm9sbG93aW5nIGV2ZW50czpcbiAqICAtIGBkcm9wYWN0aXZhdGVgIGFuZCBgZHJvcGRlYWN0aXZhdGVgIHdoZW4gYW4gYWNjZXB0YWJsZSBkcmFnIHN0YXJ0cyBhbmQgZW5kc1xuICogIC0gYGRyYWdlbnRlcmAgYW5kIGBkcmFnbGVhdmVgIHdoZW4gYSBkcmFnZ2FibGUgZW50ZXJzIGFuZCBsZWF2ZXMgdGhlIGRyb3B6b25lXG4gKiAgLSBgZHJhZ21vdmVgIHdoZW4gYSBkcmFnZ2FibGUgdGhhdCBoYXMgZW50ZXJlZCB0aGUgZHJvcHpvbmUgaXMgbW92ZWRcbiAqICAtIGBkcm9wYCB3aGVuIGEgZHJhZ2dhYmxlIGlzIGRyb3BwZWQgaW50byB0aGlzIGRyb3B6b25lXG4gKlxuICogVXNlIHRoZSBgYWNjZXB0YCBvcHRpb24gdG8gYWxsb3cgb25seSBlbGVtZW50cyB0aGF0IG1hdGNoIHRoZSBnaXZlbiBDU1NcbiAqIHNlbGVjdG9yIG9yIGVsZW1lbnQuIFRoZSB2YWx1ZSBjYW4gYmU6XG4gKlxuICogIC0gKiphbiBFbGVtZW50KiogLSBvbmx5IHRoYXQgZWxlbWVudCBjYW4gYmUgZHJvcHBlZCBpbnRvIHRoaXMgZHJvcHpvbmUuXG4gKiAgLSAqKmEgc3RyaW5nKiosIC0gdGhlIGVsZW1lbnQgYmVpbmcgZHJhZ2dlZCBtdXN0IG1hdGNoIGl0IGFzIGEgQ1NTIHNlbGVjdG9yLlxuICogIC0gKipgbnVsbGAqKiAtIGFjY2VwdCBvcHRpb25zIGlzIGNsZWFyZWQgLSBpdCBhY2NlcHRzIGFueSBlbGVtZW50LlxuICpcbiAqIFVzZSB0aGUgYG92ZXJsYXBgIG9wdGlvbiB0byBzZXQgaG93IGRyb3BzIGFyZSBjaGVja2VkIGZvci4gVGhlIGFsbG93ZWRcbiAqIHZhbHVlcyBhcmU6XG4gKlxuICogICAtIGAncG9pbnRlcidgLCB0aGUgcG9pbnRlciBtdXN0IGJlIG92ZXIgdGhlIGRyb3B6b25lIChkZWZhdWx0KVxuICogICAtIGAnY2VudGVyJ2AsIHRoZSBkcmFnZ2FibGUgZWxlbWVudCdzIGNlbnRlciBtdXN0IGJlIG92ZXIgdGhlIGRyb3B6b25lXG4gKiAgIC0gYSBudW1iZXIgZnJvbSAwLTEgd2hpY2ggaXMgdGhlIGAoaW50ZXJzZWN0aW9uIGFyZWEpIC8gKGRyYWdnYWJsZSBhcmVhKWAuXG4gKiAgIGUuZy4gYDAuNWAgZm9yIGRyb3AgdG8gaGFwcGVuIHdoZW4gaGFsZiBvZiB0aGUgYXJlYSBvZiB0aGUgZHJhZ2dhYmxlIGlzXG4gKiAgIG92ZXIgdGhlIGRyb3B6b25lXG4gKlxuICogVXNlIHRoZSBgY2hlY2tlcmAgb3B0aW9uIHRvIHNwZWNpZnkgYSBmdW5jdGlvbiB0byBjaGVjayBpZiBhIGRyYWdnZWQgZWxlbWVudFxuICogaXMgb3ZlciB0aGlzIEludGVyYWN0YWJsZS5cbiAqXG4gKiBAcGFyYW0ge2Jvb2xlYW4gfCBvYmplY3QgfCBudWxsfSBbb3B0aW9uc10gVGhlIG5ldyBvcHRpb25zIHRvIGJlIHNldC5cbiAqIEByZXR1cm4ge2Jvb2xlYW4gfCBJbnRlcmFjdGFibGV9IFRoZSBjdXJyZW50IHNldHRpbmcgb3IgdGhpcyBJbnRlcmFjdGFibGVcbiAqL1xuSW50ZXJhY3RhYmxlLnByb3RvdHlwZS5kcm9wem9uZSA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gIGlmICh1dGlscy5pcy5vYmplY3Qob3B0aW9ucykpIHtcbiAgICB0aGlzLm9wdGlvbnMuZHJvcC5lbmFibGVkID0gb3B0aW9ucy5lbmFibGVkID09PSBmYWxzZSA/IGZhbHNlIDogdHJ1ZTtcblxuICAgIGlmICh1dGlscy5pcy5mdW5jdGlvbihvcHRpb25zLm9uZHJvcCkpIHtcbiAgICAgIHRoaXMuZXZlbnRzLm9uZHJvcCA9IG9wdGlvbnMub25kcm9wO1xuICAgIH1cbiAgICBpZiAodXRpbHMuaXMuZnVuY3Rpb24ob3B0aW9ucy5vbmRyb3BhY3RpdmF0ZSkpIHtcbiAgICAgIHRoaXMuZXZlbnRzLm9uZHJvcGFjdGl2YXRlID0gb3B0aW9ucy5vbmRyb3BhY3RpdmF0ZTtcbiAgICB9XG4gICAgaWYgKHV0aWxzLmlzLmZ1bmN0aW9uKG9wdGlvbnMub25kcm9wZGVhY3RpdmF0ZSkpIHtcbiAgICAgIHRoaXMuZXZlbnRzLm9uZHJvcGRlYWN0aXZhdGUgPSBvcHRpb25zLm9uZHJvcGRlYWN0aXZhdGU7XG4gICAgfVxuICAgIGlmICh1dGlscy5pcy5mdW5jdGlvbihvcHRpb25zLm9uZHJhZ2VudGVyKSkge1xuICAgICAgdGhpcy5ldmVudHMub25kcmFnZW50ZXIgPSBvcHRpb25zLm9uZHJhZ2VudGVyO1xuICAgIH1cbiAgICBpZiAodXRpbHMuaXMuZnVuY3Rpb24ob3B0aW9ucy5vbmRyYWdsZWF2ZSkpIHtcbiAgICAgIHRoaXMuZXZlbnRzLm9uZHJhZ2xlYXZlID0gb3B0aW9ucy5vbmRyYWdsZWF2ZTtcbiAgICB9XG4gICAgaWYgKHV0aWxzLmlzLmZ1bmN0aW9uKG9wdGlvbnMub25kcm9wbW92ZSkpIHtcbiAgICAgIHRoaXMuZXZlbnRzLm9uZHJvcG1vdmUgPSBvcHRpb25zLm9uZHJvcG1vdmU7XG4gICAgfVxuXG4gICAgaWYgKC9eKHBvaW50ZXJ8Y2VudGVyKSQvLnRlc3Qob3B0aW9ucy5vdmVybGFwKSkge1xuICAgICAgdGhpcy5vcHRpb25zLmRyb3Aub3ZlcmxhcCA9IG9wdGlvbnMub3ZlcmxhcDtcbiAgICB9IGVsc2UgaWYgKHV0aWxzLmlzLm51bWJlcihvcHRpb25zLm92ZXJsYXApKSB7XG4gICAgICB0aGlzLm9wdGlvbnMuZHJvcC5vdmVybGFwID0gTWF0aC5tYXgoTWF0aC5taW4oMSwgb3B0aW9ucy5vdmVybGFwKSwgMCk7XG4gICAgfVxuICAgIGlmICgnYWNjZXB0JyBpbiBvcHRpb25zKSB7XG4gICAgICB0aGlzLm9wdGlvbnMuZHJvcC5hY2NlcHQgPSBvcHRpb25zLmFjY2VwdDtcbiAgICB9XG4gICAgaWYgKCdjaGVja2VyJyBpbiBvcHRpb25zKSB7XG4gICAgICB0aGlzLm9wdGlvbnMuZHJvcC5jaGVja2VyID0gb3B0aW9ucy5jaGVja2VyO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgaWYgKHV0aWxzLmlzLmJvb2wob3B0aW9ucykpIHtcbiAgICB0aGlzLm9wdGlvbnMuZHJvcC5lbmFibGVkID0gb3B0aW9ucztcblxuICAgIGlmICghb3B0aW9ucykge1xuICAgICAgdGhpcy5vbmRyYWdlbnRlciA9IHRoaXMub25kcmFnbGVhdmUgPSB0aGlzLm9uZHJvcCA9IHRoaXMub25kcm9wYWN0aXZhdGUgPSB0aGlzLm9uZHJvcGRlYWN0aXZhdGUgPSBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgcmV0dXJuIHRoaXMub3B0aW9ucy5kcm9wO1xufTtcblxuSW50ZXJhY3RhYmxlLnByb3RvdHlwZS5kcm9wQ2hlY2sgPSBmdW5jdGlvbiAoZHJhZ0V2ZW50LCBldmVudCwgZHJhZ2dhYmxlLCBkcmFnZ2FibGVFbGVtZW50LCBkcm9wRWxlbWVudCwgcmVjdCkge1xuICB2YXIgZHJvcHBlZCA9IGZhbHNlO1xuXG4gIC8vIGlmIHRoZSBkcm9wem9uZSBoYXMgbm8gcmVjdCAoZWcuIGRpc3BsYXk6IG5vbmUpXG4gIC8vIGNhbGwgdGhlIGN1c3RvbSBkcm9wQ2hlY2tlciBvciBqdXN0IHJldHVybiBmYWxzZVxuICBpZiAoIShyZWN0ID0gcmVjdCB8fCB0aGlzLmdldFJlY3QoZHJvcEVsZW1lbnQpKSkge1xuICAgIHJldHVybiB0aGlzLm9wdGlvbnMuZHJvcC5jaGVja2VyID8gdGhpcy5vcHRpb25zLmRyb3AuY2hlY2tlcihkcmFnRXZlbnQsIGV2ZW50LCBkcm9wcGVkLCB0aGlzLCBkcm9wRWxlbWVudCwgZHJhZ2dhYmxlLCBkcmFnZ2FibGVFbGVtZW50KSA6IGZhbHNlO1xuICB9XG5cbiAgdmFyIGRyb3BPdmVybGFwID0gdGhpcy5vcHRpb25zLmRyb3Aub3ZlcmxhcDtcblxuICBpZiAoZHJvcE92ZXJsYXAgPT09ICdwb2ludGVyJykge1xuICAgIHZhciBvcmlnaW4gPSB1dGlscy5nZXRPcmlnaW5YWShkcmFnZ2FibGUsIGRyYWdnYWJsZUVsZW1lbnQsICdkcmFnJyk7XG4gICAgdmFyIHBhZ2UgPSB1dGlscy5nZXRQYWdlWFkoZHJhZ0V2ZW50KTtcblxuICAgIHBhZ2UueCArPSBvcmlnaW4ueDtcbiAgICBwYWdlLnkgKz0gb3JpZ2luLnk7XG5cbiAgICB2YXIgaG9yaXpvbnRhbCA9IHBhZ2UueCA+IHJlY3QubGVmdCAmJiBwYWdlLnggPCByZWN0LnJpZ2h0O1xuICAgIHZhciB2ZXJ0aWNhbCA9IHBhZ2UueSA+IHJlY3QudG9wICYmIHBhZ2UueSA8IHJlY3QuYm90dG9tO1xuXG4gICAgZHJvcHBlZCA9IGhvcml6b250YWwgJiYgdmVydGljYWw7XG4gIH1cblxuICB2YXIgZHJhZ1JlY3QgPSBkcmFnZ2FibGUuZ2V0UmVjdChkcmFnZ2FibGVFbGVtZW50KTtcblxuICBpZiAoZHJhZ1JlY3QgJiYgZHJvcE92ZXJsYXAgPT09ICdjZW50ZXInKSB7XG4gICAgdmFyIGN4ID0gZHJhZ1JlY3QubGVmdCArIGRyYWdSZWN0LndpZHRoIC8gMjtcbiAgICB2YXIgY3kgPSBkcmFnUmVjdC50b3AgKyBkcmFnUmVjdC5oZWlnaHQgLyAyO1xuXG4gICAgZHJvcHBlZCA9IGN4ID49IHJlY3QubGVmdCAmJiBjeCA8PSByZWN0LnJpZ2h0ICYmIGN5ID49IHJlY3QudG9wICYmIGN5IDw9IHJlY3QuYm90dG9tO1xuICB9XG5cbiAgaWYgKGRyYWdSZWN0ICYmIHV0aWxzLmlzLm51bWJlcihkcm9wT3ZlcmxhcCkpIHtcbiAgICB2YXIgb3ZlcmxhcEFyZWEgPSBNYXRoLm1heCgwLCBNYXRoLm1pbihyZWN0LnJpZ2h0LCBkcmFnUmVjdC5yaWdodCkgLSBNYXRoLm1heChyZWN0LmxlZnQsIGRyYWdSZWN0LmxlZnQpKSAqIE1hdGgubWF4KDAsIE1hdGgubWluKHJlY3QuYm90dG9tLCBkcmFnUmVjdC5ib3R0b20pIC0gTWF0aC5tYXgocmVjdC50b3AsIGRyYWdSZWN0LnRvcCkpO1xuXG4gICAgdmFyIG92ZXJsYXBSYXRpbyA9IG92ZXJsYXBBcmVhIC8gKGRyYWdSZWN0LndpZHRoICogZHJhZ1JlY3QuaGVpZ2h0KTtcblxuICAgIGRyb3BwZWQgPSBvdmVybGFwUmF0aW8gPj0gZHJvcE92ZXJsYXA7XG4gIH1cblxuICBpZiAodGhpcy5vcHRpb25zLmRyb3AuY2hlY2tlcikge1xuICAgIGRyb3BwZWQgPSB0aGlzLm9wdGlvbnMuZHJvcC5jaGVja2VyKGRyYWdFdmVudCwgZXZlbnQsIGRyb3BwZWQsIHRoaXMsIGRyb3BFbGVtZW50LCBkcmFnZ2FibGUsIGRyYWdnYWJsZUVsZW1lbnQpO1xuICB9XG5cbiAgcmV0dXJuIGRyb3BwZWQ7XG59O1xuXG5JbnRlcmFjdGFibGUuc2lnbmFscy5vbigndW5zZXQnLCBmdW5jdGlvbiAoX3JlZjgpIHtcbiAgdmFyIGludGVyYWN0YWJsZSA9IF9yZWY4LmludGVyYWN0YWJsZTtcblxuICBpbnRlcmFjdGFibGUuZHJvcHpvbmUoZmFsc2UpO1xufSk7XG5cbkludGVyYWN0YWJsZS5zZXR0aW5nc01ldGhvZHMucHVzaCgnZHJvcENoZWNrZXInKTtcblxuSW50ZXJhY3Rpb24uc2lnbmFscy5vbignbmV3JywgZnVuY3Rpb24gKGludGVyYWN0aW9uKSB7XG4gIGludGVyYWN0aW9uLmRyb3BUYXJnZXQgPSBudWxsOyAvLyB0aGUgZHJvcHpvbmUgYSBkcmFnIHRhcmdldCBtaWdodCBiZSBkcm9wcGVkIGludG9cbiAgaW50ZXJhY3Rpb24uZHJvcEVsZW1lbnQgPSBudWxsOyAvLyB0aGUgZWxlbWVudCBhdCB0aGUgdGltZSBvZiBjaGVja2luZ1xuICBpbnRlcmFjdGlvbi5wcmV2RHJvcFRhcmdldCA9IG51bGw7IC8vIHRoZSBkcm9wem9uZSB0aGF0IHdhcyByZWNlbnRseSBkcmFnZ2VkIGF3YXkgZnJvbVxuICBpbnRlcmFjdGlvbi5wcmV2RHJvcEVsZW1lbnQgPSBudWxsOyAvLyB0aGUgZWxlbWVudCBhdCB0aGUgdGltZSBvZiBjaGVja2luZ1xuICBpbnRlcmFjdGlvbi5kcm9wRXZlbnRzID0gbnVsbDsgLy8gdGhlIGRyb3BFdmVudHMgcmVsYXRlZCB0byB0aGUgY3VycmVudCBkcmFnIGV2ZW50XG5cbiAgaW50ZXJhY3Rpb24uYWN0aXZlRHJvcHMgPSB7XG4gICAgZHJvcHpvbmVzOiBbXSwgLy8gdGhlIGRyb3B6b25lcyB0aGF0IGFyZSBtZW50aW9uZWQgYmVsb3dcbiAgICBlbGVtZW50czogW10sIC8vIGVsZW1lbnRzIG9mIGRyb3B6b25lcyB0aGF0IGFjY2VwdCB0aGUgdGFyZ2V0IGRyYWdnYWJsZVxuICAgIHJlY3RzOiBbXSAvLyB0aGUgcmVjdHMgb2YgdGhlIGVsZW1lbnRzIG1lbnRpb25lZCBhYm92ZVxuICB9O1xufSk7XG5cbkludGVyYWN0aW9uLnNpZ25hbHMub24oJ3N0b3AnLCBmdW5jdGlvbiAoX3JlZjkpIHtcbiAgdmFyIGludGVyYWN0aW9uID0gX3JlZjkuaW50ZXJhY3Rpb247XG5cbiAgaW50ZXJhY3Rpb24uZHJvcFRhcmdldCA9IGludGVyYWN0aW9uLmRyb3BFbGVtZW50ID0gaW50ZXJhY3Rpb24ucHJldkRyb3BUYXJnZXQgPSBpbnRlcmFjdGlvbi5wcmV2RHJvcEVsZW1lbnQgPSBudWxsO1xufSk7XG5cbi8qKlxuICogUmV0dXJucyBvciBzZXRzIHdoZXRoZXIgdGhlIGRpbWVuc2lvbnMgb2YgZHJvcHpvbmUgZWxlbWVudHMgYXJlIGNhbGN1bGF0ZWRcbiAqIG9uIGV2ZXJ5IGRyYWdtb3ZlIG9yIG9ubHkgb24gZHJhZ3N0YXJ0IGZvciB0aGUgZGVmYXVsdCBkcm9wQ2hlY2tlclxuICpcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW25ld1ZhbHVlXSBUcnVlIHRvIGNoZWNrIG9uIGVhY2ggbW92ZS4gRmFsc2UgdG8gY2hlY2sgb25seVxuICogYmVmb3JlIHN0YXJ0XG4gKiBAcmV0dXJuIHtib29sZWFuIHwgaW50ZXJhY3R9IFRoZSBjdXJyZW50IHNldHRpbmcgb3IgaW50ZXJhY3RcbiAqL1xuaW50ZXJhY3QuZHluYW1pY0Ryb3AgPSBmdW5jdGlvbiAobmV3VmFsdWUpIHtcbiAgaWYgKHV0aWxzLmlzLmJvb2wobmV3VmFsdWUpKSB7XG4gICAgLy9pZiAoZHJhZ2dpbmcgJiYgZHluYW1pY0Ryb3AgIT09IG5ld1ZhbHVlICYmICFuZXdWYWx1ZSkge1xuICAgIC8vY2FsY1JlY3RzKGRyb3B6b25lcyk7XG4gICAgLy99XG5cbiAgICBkeW5hbWljRHJvcCA9IG5ld1ZhbHVlO1xuXG4gICAgcmV0dXJuIGludGVyYWN0O1xuICB9XG4gIHJldHVybiBkeW5hbWljRHJvcDtcbn07XG5cbnV0aWxzLm1lcmdlKEludGVyYWN0YWJsZS5ldmVudFR5cGVzLCBbJ2RyYWdlbnRlcicsICdkcmFnbGVhdmUnLCAnZHJvcGFjdGl2YXRlJywgJ2Ryb3BkZWFjdGl2YXRlJywgJ2Ryb3Btb3ZlJywgJ2Ryb3AnXSk7XG5hY3Rpb25zLm1ldGhvZERpY3QuZHJvcCA9ICdkcm9wem9uZSc7XG5cbmRlZmF1bHRPcHRpb25zLmRyb3AgPSBkcm9wLmRlZmF1bHRzO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGRyb3A7XG5cbn0se1wiLi4vSW50ZXJhY3RFdmVudFwiOjMsXCIuLi9JbnRlcmFjdGFibGVcIjo0LFwiLi4vSW50ZXJhY3Rpb25cIjo1LFwiLi4vZGVmYXVsdE9wdGlvbnNcIjoxOCxcIi4uL2ludGVyYWN0XCI6MjEsXCIuLi9zY29wZVwiOjMzLFwiLi4vdXRpbHNcIjo0NCxcIi4vYmFzZVwiOjZ9XSw5OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbid1c2Ugc3RyaWN0JztcblxudmFyIGFjdGlvbnMgPSByZXF1aXJlKCcuL2Jhc2UnKTtcbnZhciB1dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzJyk7XG52YXIgSW50ZXJhY3RFdmVudCA9IHJlcXVpcmUoJy4uL0ludGVyYWN0RXZlbnQnKTtcbnZhciBJbnRlcmFjdGFibGUgPSByZXF1aXJlKCcuLi9JbnRlcmFjdGFibGUnKTtcbnZhciBJbnRlcmFjdGlvbiA9IHJlcXVpcmUoJy4uL0ludGVyYWN0aW9uJyk7XG52YXIgZGVmYXVsdE9wdGlvbnMgPSByZXF1aXJlKCcuLi9kZWZhdWx0T3B0aW9ucycpO1xuXG52YXIgZ2VzdHVyZSA9IHtcbiAgZGVmYXVsdHM6IHtcbiAgICBlbmFibGVkOiBmYWxzZSxcbiAgICBvcmlnaW46IG51bGwsXG4gICAgcmVzdHJpY3Q6IG51bGxcbiAgfSxcblxuICBjaGVja2VyOiBmdW5jdGlvbiBjaGVja2VyKHBvaW50ZXIsIGV2ZW50LCBpbnRlcmFjdGFibGUsIGVsZW1lbnQsIGludGVyYWN0aW9uKSB7XG4gICAgaWYgKGludGVyYWN0aW9uLnBvaW50ZXJJZHMubGVuZ3RoID49IDIpIHtcbiAgICAgIHJldHVybiB7IG5hbWU6ICdnZXN0dXJlJyB9O1xuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9LFxuXG4gIGdldEN1cnNvcjogZnVuY3Rpb24gZ2V0Q3Vyc29yKCkge1xuICAgIHJldHVybiAnJztcbiAgfVxufTtcblxuSW50ZXJhY3RFdmVudC5zaWduYWxzLm9uKCduZXcnLCBmdW5jdGlvbiAoX3JlZikge1xuICB2YXIgaUV2ZW50ID0gX3JlZi5pRXZlbnQsXG4gICAgICBpbnRlcmFjdGlvbiA9IF9yZWYuaW50ZXJhY3Rpb247XG5cbiAgaWYgKGlFdmVudC50eXBlICE9PSAnZ2VzdHVyZXN0YXJ0Jykge1xuICAgIHJldHVybjtcbiAgfVxuICBpRXZlbnQuZHMgPSAwO1xuXG4gIGludGVyYWN0aW9uLmdlc3R1cmUuc3RhcnREaXN0YW5jZSA9IGludGVyYWN0aW9uLmdlc3R1cmUucHJldkRpc3RhbmNlID0gaUV2ZW50LmRpc3RhbmNlO1xuICBpbnRlcmFjdGlvbi5nZXN0dXJlLnN0YXJ0QW5nbGUgPSBpbnRlcmFjdGlvbi5nZXN0dXJlLnByZXZBbmdsZSA9IGlFdmVudC5hbmdsZTtcbiAgaW50ZXJhY3Rpb24uZ2VzdHVyZS5zY2FsZSA9IDE7XG59KTtcblxuSW50ZXJhY3RFdmVudC5zaWduYWxzLm9uKCduZXcnLCBmdW5jdGlvbiAoX3JlZjIpIHtcbiAgdmFyIGlFdmVudCA9IF9yZWYyLmlFdmVudCxcbiAgICAgIGludGVyYWN0aW9uID0gX3JlZjIuaW50ZXJhY3Rpb247XG5cbiAgaWYgKGlFdmVudC50eXBlICE9PSAnZ2VzdHVyZW1vdmUnKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaUV2ZW50LmRzID0gaUV2ZW50LnNjYWxlIC0gaW50ZXJhY3Rpb24uZ2VzdHVyZS5zY2FsZTtcblxuICBpbnRlcmFjdGlvbi50YXJnZXQuZmlyZShpRXZlbnQpO1xuXG4gIGludGVyYWN0aW9uLmdlc3R1cmUucHJldkFuZ2xlID0gaUV2ZW50LmFuZ2xlO1xuICBpbnRlcmFjdGlvbi5nZXN0dXJlLnByZXZEaXN0YW5jZSA9IGlFdmVudC5kaXN0YW5jZTtcblxuICBpZiAoaUV2ZW50LnNjYWxlICE9PSBJbmZpbml0eSAmJiBpRXZlbnQuc2NhbGUgIT09IG51bGwgJiYgaUV2ZW50LnNjYWxlICE9PSB1bmRlZmluZWQgJiYgIWlzTmFOKGlFdmVudC5zY2FsZSkpIHtcblxuICAgIGludGVyYWN0aW9uLmdlc3R1cmUuc2NhbGUgPSBpRXZlbnQuc2NhbGU7XG4gIH1cbn0pO1xuXG4vKipcbiAqIGBgYGpzXG4gKiBpbnRlcmFjdChlbGVtZW50KS5nZXN0dXJhYmxlKHtcbiAqICAgICBvbnN0YXJ0OiBmdW5jdGlvbiAoZXZlbnQpIHt9LFxuICogICAgIG9ubW92ZSA6IGZ1bmN0aW9uIChldmVudCkge30sXG4gKiAgICAgb25lbmQgIDogZnVuY3Rpb24gKGV2ZW50KSB7fSxcbiAqXG4gKiAgICAgLy8gbGltaXQgbXVsdGlwbGUgZ2VzdHVyZXMuXG4gKiAgICAgLy8gU2VlIHRoZSBleHBsYW5hdGlvbiBpbiB7QGxpbmsgSW50ZXJhY3RhYmxlLmRyYWdnYWJsZX0gZXhhbXBsZVxuICogICAgIG1heDogSW5maW5pdHksXG4gKiAgICAgbWF4UGVyRWxlbWVudDogMSxcbiAqIH0pO1xuICpcbiAqIHZhciBpc0dlc3R1cmVhYmxlID0gaW50ZXJhY3QoZWxlbWVudCkuZ2VzdHVyYWJsZSgpO1xuICogYGBgXG4gKlxuICogR2V0cyBvciBzZXRzIHdoZXRoZXIgbXVsdGl0b3VjaCBnZXN0dXJlcyBjYW4gYmUgcGVyZm9ybWVkIG9uIHRoZSB0YXJnZXRcbiAqXG4gKiBAcGFyYW0ge2Jvb2xlYW4gfCBvYmplY3R9IFtvcHRpb25zXSB0cnVlL2ZhbHNlIG9yIEFuIG9iamVjdCB3aXRoIGV2ZW50XG4gKiBsaXN0ZW5lcnMgdG8gYmUgZmlyZWQgb24gZ2VzdHVyZSBldmVudHMgKG1ha2VzIHRoZSBJbnRlcmFjdGFibGUgZ2VzdHVyYWJsZSlcbiAqIEByZXR1cm4ge2Jvb2xlYW4gfCBJbnRlcmFjdGFibGV9IEEgYm9vbGVhbiBpbmRpY2F0aW5nIGlmIHRoaXMgY2FuIGJlIHRoZVxuICogdGFyZ2V0IG9mIGdlc3R1cmUgZXZlbnRzLCBvciB0aGlzIEludGVyYWN0YWJsZVxuICovXG5JbnRlcmFjdGFibGUucHJvdG90eXBlLmdlc3R1cmFibGUgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICBpZiAodXRpbHMuaXMub2JqZWN0KG9wdGlvbnMpKSB7XG4gICAgdGhpcy5vcHRpb25zLmdlc3R1cmUuZW5hYmxlZCA9IG9wdGlvbnMuZW5hYmxlZCA9PT0gZmFsc2UgPyBmYWxzZSA6IHRydWU7XG4gICAgdGhpcy5zZXRQZXJBY3Rpb24oJ2dlc3R1cmUnLCBvcHRpb25zKTtcbiAgICB0aGlzLnNldE9uRXZlbnRzKCdnZXN0dXJlJywgb3B0aW9ucyk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGlmICh1dGlscy5pcy5ib29sKG9wdGlvbnMpKSB7XG4gICAgdGhpcy5vcHRpb25zLmdlc3R1cmUuZW5hYmxlZCA9IG9wdGlvbnM7XG5cbiAgICBpZiAoIW9wdGlvbnMpIHtcbiAgICAgIHRoaXMub25nZXN0dXJlc3RhcnQgPSB0aGlzLm9uZ2VzdHVyZXN0YXJ0ID0gdGhpcy5vbmdlc3R1cmVlbmQgPSBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgcmV0dXJuIHRoaXMub3B0aW9ucy5nZXN0dXJlO1xufTtcblxuSW50ZXJhY3RFdmVudC5zaWduYWxzLm9uKCdzZXQtZGVsdGEnLCBmdW5jdGlvbiAoX3JlZjMpIHtcbiAgdmFyIGludGVyYWN0aW9uID0gX3JlZjMuaW50ZXJhY3Rpb24sXG4gICAgICBpRXZlbnQgPSBfcmVmMy5pRXZlbnQsXG4gICAgICBhY3Rpb24gPSBfcmVmMy5hY3Rpb24sXG4gICAgICBldmVudCA9IF9yZWYzLmV2ZW50LFxuICAgICAgc3RhcnRpbmcgPSBfcmVmMy5zdGFydGluZyxcbiAgICAgIGVuZGluZyA9IF9yZWYzLmVuZGluZyxcbiAgICAgIGRlbHRhU291cmNlID0gX3JlZjMuZGVsdGFTb3VyY2U7XG5cbiAgaWYgKGFjdGlvbiAhPT0gJ2dlc3R1cmUnKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyIHBvaW50ZXJzID0gaW50ZXJhY3Rpb24ucG9pbnRlcnM7XG5cbiAgaUV2ZW50LnRvdWNoZXMgPSBbcG9pbnRlcnNbMF0sIHBvaW50ZXJzWzFdXTtcblxuICBpZiAoc3RhcnRpbmcpIHtcbiAgICBpRXZlbnQuZGlzdGFuY2UgPSB1dGlscy50b3VjaERpc3RhbmNlKHBvaW50ZXJzLCBkZWx0YVNvdXJjZSk7XG4gICAgaUV2ZW50LmJveCA9IHV0aWxzLnRvdWNoQkJveChwb2ludGVycyk7XG4gICAgaUV2ZW50LnNjYWxlID0gMTtcbiAgICBpRXZlbnQuZHMgPSAwO1xuICAgIGlFdmVudC5hbmdsZSA9IHV0aWxzLnRvdWNoQW5nbGUocG9pbnRlcnMsIHVuZGVmaW5lZCwgZGVsdGFTb3VyY2UpO1xuICAgIGlFdmVudC5kYSA9IDA7XG4gIH0gZWxzZSBpZiAoZW5kaW5nIHx8IGV2ZW50IGluc3RhbmNlb2YgSW50ZXJhY3RFdmVudCkge1xuICAgIGlFdmVudC5kaXN0YW5jZSA9IGludGVyYWN0aW9uLnByZXZFdmVudC5kaXN0YW5jZTtcbiAgICBpRXZlbnQuYm94ID0gaW50ZXJhY3Rpb24ucHJldkV2ZW50LmJveDtcbiAgICBpRXZlbnQuc2NhbGUgPSBpbnRlcmFjdGlvbi5wcmV2RXZlbnQuc2NhbGU7XG4gICAgaUV2ZW50LmRzID0gaUV2ZW50LnNjYWxlIC0gMTtcbiAgICBpRXZlbnQuYW5nbGUgPSBpbnRlcmFjdGlvbi5wcmV2RXZlbnQuYW5nbGU7XG4gICAgaUV2ZW50LmRhID0gaUV2ZW50LmFuZ2xlIC0gaW50ZXJhY3Rpb24uZ2VzdHVyZS5zdGFydEFuZ2xlO1xuICB9IGVsc2Uge1xuICAgIGlFdmVudC5kaXN0YW5jZSA9IHV0aWxzLnRvdWNoRGlzdGFuY2UocG9pbnRlcnMsIGRlbHRhU291cmNlKTtcbiAgICBpRXZlbnQuYm94ID0gdXRpbHMudG91Y2hCQm94KHBvaW50ZXJzKTtcbiAgICBpRXZlbnQuc2NhbGUgPSBpRXZlbnQuZGlzdGFuY2UgLyBpbnRlcmFjdGlvbi5nZXN0dXJlLnN0YXJ0RGlzdGFuY2U7XG4gICAgaUV2ZW50LmFuZ2xlID0gdXRpbHMudG91Y2hBbmdsZShwb2ludGVycywgaW50ZXJhY3Rpb24uZ2VzdHVyZS5wcmV2QW5nbGUsIGRlbHRhU291cmNlKTtcblxuICAgIGlFdmVudC5kcyA9IGlFdmVudC5zY2FsZSAtIGludGVyYWN0aW9uLmdlc3R1cmUucHJldlNjYWxlO1xuICAgIGlFdmVudC5kYSA9IGlFdmVudC5hbmdsZSAtIGludGVyYWN0aW9uLmdlc3R1cmUucHJldkFuZ2xlO1xuICB9XG59KTtcblxuSW50ZXJhY3Rpb24uc2lnbmFscy5vbignbmV3JywgZnVuY3Rpb24gKGludGVyYWN0aW9uKSB7XG4gIGludGVyYWN0aW9uLmdlc3R1cmUgPSB7XG4gICAgc3RhcnQ6IHsgeDogMCwgeTogMCB9LFxuXG4gICAgc3RhcnREaXN0YW5jZTogMCwgLy8gZGlzdGFuY2UgYmV0d2VlbiB0d28gdG91Y2hlcyBvZiB0b3VjaFN0YXJ0XG4gICAgcHJldkRpc3RhbmNlOiAwLFxuICAgIGRpc3RhbmNlOiAwLFxuXG4gICAgc2NhbGU6IDEsIC8vIGdlc3R1cmUuZGlzdGFuY2UgLyBnZXN0dXJlLnN0YXJ0RGlzdGFuY2VcblxuICAgIHN0YXJ0QW5nbGU6IDAsIC8vIGFuZ2xlIG9mIGxpbmUgam9pbmluZyB0d28gdG91Y2hlc1xuICAgIHByZXZBbmdsZTogMCAvLyBhbmdsZSBvZiB0aGUgcHJldmlvdXMgZ2VzdHVyZSBldmVudFxuICB9O1xufSk7XG5cbmFjdGlvbnMuZ2VzdHVyZSA9IGdlc3R1cmU7XG5hY3Rpb25zLm5hbWVzLnB1c2goJ2dlc3R1cmUnKTtcbnV0aWxzLm1lcmdlKEludGVyYWN0YWJsZS5ldmVudFR5cGVzLCBbJ2dlc3R1cmVzdGFydCcsICdnZXN0dXJlbW92ZScsICdnZXN0dXJlZW5kJ10pO1xuYWN0aW9ucy5tZXRob2REaWN0Lmdlc3R1cmUgPSAnZ2VzdHVyYWJsZSc7XG5cbmRlZmF1bHRPcHRpb25zLmdlc3R1cmUgPSBnZXN0dXJlLmRlZmF1bHRzO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGdlc3R1cmU7XG5cbn0se1wiLi4vSW50ZXJhY3RFdmVudFwiOjMsXCIuLi9JbnRlcmFjdGFibGVcIjo0LFwiLi4vSW50ZXJhY3Rpb25cIjo1LFwiLi4vZGVmYXVsdE9wdGlvbnNcIjoxOCxcIi4uL3V0aWxzXCI6NDQsXCIuL2Jhc2VcIjo2fV0sMTA6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgYWN0aW9ucyA9IHJlcXVpcmUoJy4vYmFzZScpO1xudmFyIHV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMnKTtcbnZhciBicm93c2VyID0gcmVxdWlyZSgnLi4vdXRpbHMvYnJvd3NlcicpO1xudmFyIEludGVyYWN0RXZlbnQgPSByZXF1aXJlKCcuLi9JbnRlcmFjdEV2ZW50Jyk7XG4vKiogQGxlbmRzIEludGVyYWN0YWJsZSAqL1xudmFyIEludGVyYWN0YWJsZSA9IHJlcXVpcmUoJy4uL0ludGVyYWN0YWJsZScpO1xudmFyIEludGVyYWN0aW9uID0gcmVxdWlyZSgnLi4vSW50ZXJhY3Rpb24nKTtcbnZhciBkZWZhdWx0T3B0aW9ucyA9IHJlcXVpcmUoJy4uL2RlZmF1bHRPcHRpb25zJyk7XG5cbi8vIExlc3MgUHJlY2lzaW9uIHdpdGggdG91Y2ggaW5wdXRcbnZhciBkZWZhdWx0TWFyZ2luID0gYnJvd3Nlci5zdXBwb3J0c1RvdWNoIHx8IGJyb3dzZXIuc3VwcG9ydHNQb2ludGVyRXZlbnQgPyAyMCA6IDEwO1xuXG52YXIgcmVzaXplID0ge1xuICBkZWZhdWx0czoge1xuICAgIGVuYWJsZWQ6IGZhbHNlLFxuICAgIG1vdXNlQnV0dG9uczogbnVsbCxcblxuICAgIG9yaWdpbjogbnVsbCxcbiAgICBzbmFwOiBudWxsLFxuICAgIHJlc3RyaWN0OiBudWxsLFxuICAgIGluZXJ0aWE6IG51bGwsXG4gICAgYXV0b1Njcm9sbDogbnVsbCxcblxuICAgIHNxdWFyZTogZmFsc2UsXG4gICAgcHJlc2VydmVBc3BlY3RSYXRpbzogZmFsc2UsXG4gICAgYXhpczogJ3h5JyxcblxuICAgIC8vIHVzZSBkZWZhdWx0IG1hcmdpblxuICAgIG1hcmdpbjogTmFOLFxuXG4gICAgLy8gb2JqZWN0IHdpdGggcHJvcHMgbGVmdCwgcmlnaHQsIHRvcCwgYm90dG9tIHdoaWNoIGFyZVxuICAgIC8vIHRydWUvZmFsc2UgdmFsdWVzIHRvIHJlc2l6ZSB3aGVuIHRoZSBwb2ludGVyIGlzIG92ZXIgdGhhdCBlZGdlLFxuICAgIC8vIENTUyBzZWxlY3RvcnMgdG8gbWF0Y2ggdGhlIGhhbmRsZXMgZm9yIGVhY2ggZGlyZWN0aW9uXG4gICAgLy8gb3IgdGhlIEVsZW1lbnRzIGZvciBlYWNoIGhhbmRsZVxuICAgIGVkZ2VzOiBudWxsLFxuXG4gICAgLy8gYSB2YWx1ZSBvZiAnbm9uZScgd2lsbCBsaW1pdCB0aGUgcmVzaXplIHJlY3QgdG8gYSBtaW5pbXVtIG9mIDB4MFxuICAgIC8vICduZWdhdGUnIHdpbGwgYWxvdyB0aGUgcmVjdCB0byBoYXZlIG5lZ2F0aXZlIHdpZHRoL2hlaWdodFxuICAgIC8vICdyZXBvc2l0aW9uJyB3aWxsIGtlZXAgdGhlIHdpZHRoL2hlaWdodCBwb3NpdGl2ZSBieSBzd2FwcGluZ1xuICAgIC8vIHRoZSB0b3AgYW5kIGJvdHRvbSBlZGdlcyBhbmQvb3Igc3dhcHBpbmcgdGhlIGxlZnQgYW5kIHJpZ2h0IGVkZ2VzXG4gICAgaW52ZXJ0OiAnbm9uZSdcbiAgfSxcblxuICBjaGVja2VyOiBmdW5jdGlvbiBjaGVja2VyKHBvaW50ZXIsIGV2ZW50LCBpbnRlcmFjdGFibGUsIGVsZW1lbnQsIGludGVyYWN0aW9uLCByZWN0KSB7XG4gICAgaWYgKCFyZWN0KSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICB2YXIgcGFnZSA9IHV0aWxzLmV4dGVuZCh7fSwgaW50ZXJhY3Rpb24uY3VyQ29vcmRzLnBhZ2UpO1xuICAgIHZhciBvcHRpb25zID0gaW50ZXJhY3RhYmxlLm9wdGlvbnM7XG5cbiAgICBpZiAob3B0aW9ucy5yZXNpemUuZW5hYmxlZCkge1xuICAgICAgdmFyIHJlc2l6ZU9wdGlvbnMgPSBvcHRpb25zLnJlc2l6ZTtcbiAgICAgIHZhciByZXNpemVFZGdlcyA9IHsgbGVmdDogZmFsc2UsIHJpZ2h0OiBmYWxzZSwgdG9wOiBmYWxzZSwgYm90dG9tOiBmYWxzZSB9O1xuXG4gICAgICAvLyBpZiB1c2luZyByZXNpemUuZWRnZXNcbiAgICAgIGlmICh1dGlscy5pcy5vYmplY3QocmVzaXplT3B0aW9ucy5lZGdlcykpIHtcbiAgICAgICAgZm9yICh2YXIgZWRnZSBpbiByZXNpemVFZGdlcykge1xuICAgICAgICAgIHJlc2l6ZUVkZ2VzW2VkZ2VdID0gY2hlY2tSZXNpemVFZGdlKGVkZ2UsIHJlc2l6ZU9wdGlvbnMuZWRnZXNbZWRnZV0sIHBhZ2UsIGludGVyYWN0aW9uLl9ldmVudFRhcmdldCwgZWxlbWVudCwgcmVjdCwgcmVzaXplT3B0aW9ucy5tYXJnaW4gfHwgZGVmYXVsdE1hcmdpbik7XG4gICAgICAgIH1cblxuICAgICAgICByZXNpemVFZGdlcy5sZWZ0ID0gcmVzaXplRWRnZXMubGVmdCAmJiAhcmVzaXplRWRnZXMucmlnaHQ7XG4gICAgICAgIHJlc2l6ZUVkZ2VzLnRvcCA9IHJlc2l6ZUVkZ2VzLnRvcCAmJiAhcmVzaXplRWRnZXMuYm90dG9tO1xuXG4gICAgICAgIGlmIChyZXNpemVFZGdlcy5sZWZ0IHx8IHJlc2l6ZUVkZ2VzLnJpZ2h0IHx8IHJlc2l6ZUVkZ2VzLnRvcCB8fCByZXNpemVFZGdlcy5ib3R0b20pIHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbmFtZTogJ3Jlc2l6ZScsXG4gICAgICAgICAgICBlZGdlczogcmVzaXplRWRnZXNcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgcmlnaHQgPSBvcHRpb25zLnJlc2l6ZS5heGlzICE9PSAneScgJiYgcGFnZS54ID4gcmVjdC5yaWdodCAtIGRlZmF1bHRNYXJnaW47XG4gICAgICAgIHZhciBib3R0b20gPSBvcHRpb25zLnJlc2l6ZS5heGlzICE9PSAneCcgJiYgcGFnZS55ID4gcmVjdC5ib3R0b20gLSBkZWZhdWx0TWFyZ2luO1xuXG4gICAgICAgIGlmIChyaWdodCB8fCBib3R0b20pIHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbmFtZTogJ3Jlc2l6ZScsXG4gICAgICAgICAgICBheGVzOiAocmlnaHQgPyAneCcgOiAnJykgKyAoYm90dG9tID8gJ3knIDogJycpXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9LFxuXG4gIGN1cnNvcnM6IGJyb3dzZXIuaXNJZTkgPyB7XG4gICAgeDogJ2UtcmVzaXplJyxcbiAgICB5OiAncy1yZXNpemUnLFxuICAgIHh5OiAnc2UtcmVzaXplJyxcblxuICAgIHRvcDogJ24tcmVzaXplJyxcbiAgICBsZWZ0OiAndy1yZXNpemUnLFxuICAgIGJvdHRvbTogJ3MtcmVzaXplJyxcbiAgICByaWdodDogJ2UtcmVzaXplJyxcbiAgICB0b3BsZWZ0OiAnc2UtcmVzaXplJyxcbiAgICBib3R0b21yaWdodDogJ3NlLXJlc2l6ZScsXG4gICAgdG9wcmlnaHQ6ICduZS1yZXNpemUnLFxuICAgIGJvdHRvbWxlZnQ6ICduZS1yZXNpemUnXG4gIH0gOiB7XG4gICAgeDogJ2V3LXJlc2l6ZScsXG4gICAgeTogJ25zLXJlc2l6ZScsXG4gICAgeHk6ICdud3NlLXJlc2l6ZScsXG5cbiAgICB0b3A6ICducy1yZXNpemUnLFxuICAgIGxlZnQ6ICdldy1yZXNpemUnLFxuICAgIGJvdHRvbTogJ25zLXJlc2l6ZScsXG4gICAgcmlnaHQ6ICdldy1yZXNpemUnLFxuICAgIHRvcGxlZnQ6ICdud3NlLXJlc2l6ZScsXG4gICAgYm90dG9tcmlnaHQ6ICdud3NlLXJlc2l6ZScsXG4gICAgdG9wcmlnaHQ6ICduZXN3LXJlc2l6ZScsXG4gICAgYm90dG9tbGVmdDogJ25lc3ctcmVzaXplJ1xuICB9LFxuXG4gIGdldEN1cnNvcjogZnVuY3Rpb24gZ2V0Q3Vyc29yKGFjdGlvbikge1xuICAgIGlmIChhY3Rpb24uYXhpcykge1xuICAgICAgcmV0dXJuIHJlc2l6ZS5jdXJzb3JzW2FjdGlvbi5uYW1lICsgYWN0aW9uLmF4aXNdO1xuICAgIH0gZWxzZSBpZiAoYWN0aW9uLmVkZ2VzKSB7XG4gICAgICB2YXIgY3Vyc29yS2V5ID0gJyc7XG4gICAgICB2YXIgZWRnZU5hbWVzID0gWyd0b3AnLCAnYm90dG9tJywgJ2xlZnQnLCAncmlnaHQnXTtcblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA0OyBpKyspIHtcbiAgICAgICAgaWYgKGFjdGlvbi5lZGdlc1tlZGdlTmFtZXNbaV1dKSB7XG4gICAgICAgICAgY3Vyc29yS2V5ICs9IGVkZ2VOYW1lc1tpXTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gcmVzaXplLmN1cnNvcnNbY3Vyc29yS2V5XTtcbiAgICB9XG4gIH1cbn07XG5cbi8vIHJlc2l6ZXN0YXJ0XG5JbnRlcmFjdEV2ZW50LnNpZ25hbHMub24oJ25ldycsIGZ1bmN0aW9uIChfcmVmKSB7XG4gIHZhciBpRXZlbnQgPSBfcmVmLmlFdmVudCxcbiAgICAgIGludGVyYWN0aW9uID0gX3JlZi5pbnRlcmFjdGlvbjtcblxuICBpZiAoaUV2ZW50LnR5cGUgIT09ICdyZXNpemVzdGFydCcgfHwgIWludGVyYWN0aW9uLnByZXBhcmVkLmVkZ2VzKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyIHN0YXJ0UmVjdCA9IGludGVyYWN0aW9uLnRhcmdldC5nZXRSZWN0KGludGVyYWN0aW9uLmVsZW1lbnQpO1xuICB2YXIgcmVzaXplT3B0aW9ucyA9IGludGVyYWN0aW9uLnRhcmdldC5vcHRpb25zLnJlc2l6ZTtcblxuICAvKlxuICAgKiBXaGVuIHVzaW5nIHRoZSBgcmVzaXphYmxlLnNxdWFyZWAgb3IgYHJlc2l6YWJsZS5wcmVzZXJ2ZUFzcGVjdFJhdGlvYCBvcHRpb25zLCByZXNpemluZyBmcm9tIG9uZSBlZGdlXG4gICAqIHdpbGwgYWZmZWN0IGFub3RoZXIuIEUuZy4gd2l0aCBgcmVzaXphYmxlLnNxdWFyZWAsIHJlc2l6aW5nIHRvIG1ha2UgdGhlIHJpZ2h0IGVkZ2UgbGFyZ2VyIHdpbGwgbWFrZVxuICAgKiB0aGUgYm90dG9tIGVkZ2UgbGFyZ2VyIGJ5IHRoZSBzYW1lIGFtb3VudC4gV2UgY2FsbCB0aGVzZSAnbGlua2VkJyBlZGdlcy4gQW55IGxpbmtlZCBlZGdlcyB3aWxsIGRlcGVuZFxuICAgKiBvbiB0aGUgYWN0aXZlIGVkZ2VzIGFuZCB0aGUgZWRnZSBiZWluZyBpbnRlcmFjdGVkIHdpdGguXG4gICAqL1xuICBpZiAocmVzaXplT3B0aW9ucy5zcXVhcmUgfHwgcmVzaXplT3B0aW9ucy5wcmVzZXJ2ZUFzcGVjdFJhdGlvKSB7XG4gICAgdmFyIGxpbmtlZEVkZ2VzID0gdXRpbHMuZXh0ZW5kKHt9LCBpbnRlcmFjdGlvbi5wcmVwYXJlZC5lZGdlcyk7XG5cbiAgICBsaW5rZWRFZGdlcy50b3AgPSBsaW5rZWRFZGdlcy50b3AgfHwgbGlua2VkRWRnZXMubGVmdCAmJiAhbGlua2VkRWRnZXMuYm90dG9tO1xuICAgIGxpbmtlZEVkZ2VzLmxlZnQgPSBsaW5rZWRFZGdlcy5sZWZ0IHx8IGxpbmtlZEVkZ2VzLnRvcCAmJiAhbGlua2VkRWRnZXMucmlnaHQ7XG4gICAgbGlua2VkRWRnZXMuYm90dG9tID0gbGlua2VkRWRnZXMuYm90dG9tIHx8IGxpbmtlZEVkZ2VzLnJpZ2h0ICYmICFsaW5rZWRFZGdlcy50b3A7XG4gICAgbGlua2VkRWRnZXMucmlnaHQgPSBsaW5rZWRFZGdlcy5yaWdodCB8fCBsaW5rZWRFZGdlcy5ib3R0b20gJiYgIWxpbmtlZEVkZ2VzLmxlZnQ7XG5cbiAgICBpbnRlcmFjdGlvbi5wcmVwYXJlZC5fbGlua2VkRWRnZXMgPSBsaW5rZWRFZGdlcztcbiAgfSBlbHNlIHtcbiAgICBpbnRlcmFjdGlvbi5wcmVwYXJlZC5fbGlua2VkRWRnZXMgPSBudWxsO1xuICB9XG5cbiAgLy8gaWYgdXNpbmcgYHJlc2l6YWJsZS5wcmVzZXJ2ZUFzcGVjdFJhdGlvYCBvcHRpb24sIHJlY29yZCBhc3BlY3QgcmF0aW8gYXQgdGhlIHN0YXJ0IG9mIHRoZSByZXNpemVcbiAgaWYgKHJlc2l6ZU9wdGlvbnMucHJlc2VydmVBc3BlY3RSYXRpbykge1xuICAgIGludGVyYWN0aW9uLnJlc2l6ZVN0YXJ0QXNwZWN0UmF0aW8gPSBzdGFydFJlY3Qud2lkdGggLyBzdGFydFJlY3QuaGVpZ2h0O1xuICB9XG5cbiAgaW50ZXJhY3Rpb24ucmVzaXplUmVjdHMgPSB7XG4gICAgc3RhcnQ6IHN0YXJ0UmVjdCxcbiAgICBjdXJyZW50OiB1dGlscy5leHRlbmQoe30sIHN0YXJ0UmVjdCksXG4gICAgaW52ZXJ0ZWQ6IHV0aWxzLmV4dGVuZCh7fSwgc3RhcnRSZWN0KSxcbiAgICBwcmV2aW91czogdXRpbHMuZXh0ZW5kKHt9LCBzdGFydFJlY3QpLFxuICAgIGRlbHRhOiB7XG4gICAgICBsZWZ0OiAwLCByaWdodDogMCwgd2lkdGg6IDAsXG4gICAgICB0b3A6IDAsIGJvdHRvbTogMCwgaGVpZ2h0OiAwXG4gICAgfVxuICB9O1xuXG4gIGlFdmVudC5yZWN0ID0gaW50ZXJhY3Rpb24ucmVzaXplUmVjdHMuaW52ZXJ0ZWQ7XG4gIGlFdmVudC5kZWx0YVJlY3QgPSBpbnRlcmFjdGlvbi5yZXNpemVSZWN0cy5kZWx0YTtcbn0pO1xuXG4vLyByZXNpemVtb3ZlXG5JbnRlcmFjdEV2ZW50LnNpZ25hbHMub24oJ25ldycsIGZ1bmN0aW9uIChfcmVmMikge1xuICB2YXIgaUV2ZW50ID0gX3JlZjIuaUV2ZW50LFxuICAgICAgcGhhc2UgPSBfcmVmMi5waGFzZSxcbiAgICAgIGludGVyYWN0aW9uID0gX3JlZjIuaW50ZXJhY3Rpb247XG5cbiAgaWYgKHBoYXNlICE9PSAnbW92ZScgfHwgIWludGVyYWN0aW9uLnByZXBhcmVkLmVkZ2VzKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyIHJlc2l6ZU9wdGlvbnMgPSBpbnRlcmFjdGlvbi50YXJnZXQub3B0aW9ucy5yZXNpemU7XG4gIHZhciBpbnZlcnQgPSByZXNpemVPcHRpb25zLmludmVydDtcbiAgdmFyIGludmVydGlibGUgPSBpbnZlcnQgPT09ICdyZXBvc2l0aW9uJyB8fCBpbnZlcnQgPT09ICduZWdhdGUnO1xuXG4gIHZhciBlZGdlcyA9IGludGVyYWN0aW9uLnByZXBhcmVkLmVkZ2VzO1xuXG4gIHZhciBzdGFydCA9IGludGVyYWN0aW9uLnJlc2l6ZVJlY3RzLnN0YXJ0O1xuICB2YXIgY3VycmVudCA9IGludGVyYWN0aW9uLnJlc2l6ZVJlY3RzLmN1cnJlbnQ7XG4gIHZhciBpbnZlcnRlZCA9IGludGVyYWN0aW9uLnJlc2l6ZVJlY3RzLmludmVydGVkO1xuICB2YXIgZGVsdGEgPSBpbnRlcmFjdGlvbi5yZXNpemVSZWN0cy5kZWx0YTtcbiAgdmFyIHByZXZpb3VzID0gdXRpbHMuZXh0ZW5kKGludGVyYWN0aW9uLnJlc2l6ZVJlY3RzLnByZXZpb3VzLCBpbnZlcnRlZCk7XG4gIHZhciBvcmlnaW5hbEVkZ2VzID0gZWRnZXM7XG5cbiAgdmFyIGR4ID0gaUV2ZW50LmR4O1xuICB2YXIgZHkgPSBpRXZlbnQuZHk7XG5cbiAgaWYgKHJlc2l6ZU9wdGlvbnMucHJlc2VydmVBc3BlY3RSYXRpbyB8fCByZXNpemVPcHRpb25zLnNxdWFyZSkge1xuICAgIC8vIGByZXNpemUucHJlc2VydmVBc3BlY3RSYXRpb2AgdGFrZXMgcHJlY2VkZW5jZSBvdmVyIGByZXNpemUuc3F1YXJlYFxuICAgIHZhciBzdGFydEFzcGVjdFJhdGlvID0gcmVzaXplT3B0aW9ucy5wcmVzZXJ2ZUFzcGVjdFJhdGlvID8gaW50ZXJhY3Rpb24ucmVzaXplU3RhcnRBc3BlY3RSYXRpbyA6IDE7XG5cbiAgICBlZGdlcyA9IGludGVyYWN0aW9uLnByZXBhcmVkLl9saW5rZWRFZGdlcztcblxuICAgIGlmIChvcmlnaW5hbEVkZ2VzLmxlZnQgJiYgb3JpZ2luYWxFZGdlcy5ib3R0b20gfHwgb3JpZ2luYWxFZGdlcy5yaWdodCAmJiBvcmlnaW5hbEVkZ2VzLnRvcCkge1xuICAgICAgZHkgPSAtZHggLyBzdGFydEFzcGVjdFJhdGlvO1xuICAgIH0gZWxzZSBpZiAob3JpZ2luYWxFZGdlcy5sZWZ0IHx8IG9yaWdpbmFsRWRnZXMucmlnaHQpIHtcbiAgICAgIGR5ID0gZHggLyBzdGFydEFzcGVjdFJhdGlvO1xuICAgIH0gZWxzZSBpZiAob3JpZ2luYWxFZGdlcy50b3AgfHwgb3JpZ2luYWxFZGdlcy5ib3R0b20pIHtcbiAgICAgIGR4ID0gZHkgKiBzdGFydEFzcGVjdFJhdGlvO1xuICAgIH1cbiAgfVxuXG4gIC8vIHVwZGF0ZSB0aGUgJ2N1cnJlbnQnIHJlY3Qgd2l0aG91dCBtb2RpZmljYXRpb25zXG4gIGlmIChlZGdlcy50b3ApIHtcbiAgICBjdXJyZW50LnRvcCArPSBkeTtcbiAgfVxuICBpZiAoZWRnZXMuYm90dG9tKSB7XG4gICAgY3VycmVudC5ib3R0b20gKz0gZHk7XG4gIH1cbiAgaWYgKGVkZ2VzLmxlZnQpIHtcbiAgICBjdXJyZW50LmxlZnQgKz0gZHg7XG4gIH1cbiAgaWYgKGVkZ2VzLnJpZ2h0KSB7XG4gICAgY3VycmVudC5yaWdodCArPSBkeDtcbiAgfVxuXG4gIGlmIChpbnZlcnRpYmxlKSB7XG4gICAgLy8gaWYgaW52ZXJ0aWJsZSwgY29weSB0aGUgY3VycmVudCByZWN0XG4gICAgdXRpbHMuZXh0ZW5kKGludmVydGVkLCBjdXJyZW50KTtcblxuICAgIGlmIChpbnZlcnQgPT09ICdyZXBvc2l0aW9uJykge1xuICAgICAgLy8gc3dhcCBlZGdlIHZhbHVlcyBpZiBuZWNlc3NhcnkgdG8ga2VlcCB3aWR0aC9oZWlnaHQgcG9zaXRpdmVcbiAgICAgIHZhciBzd2FwID0gdm9pZCAwO1xuXG4gICAgICBpZiAoaW52ZXJ0ZWQudG9wID4gaW52ZXJ0ZWQuYm90dG9tKSB7XG4gICAgICAgIHN3YXAgPSBpbnZlcnRlZC50b3A7XG5cbiAgICAgICAgaW52ZXJ0ZWQudG9wID0gaW52ZXJ0ZWQuYm90dG9tO1xuICAgICAgICBpbnZlcnRlZC5ib3R0b20gPSBzd2FwO1xuICAgICAgfVxuICAgICAgaWYgKGludmVydGVkLmxlZnQgPiBpbnZlcnRlZC5yaWdodCkge1xuICAgICAgICBzd2FwID0gaW52ZXJ0ZWQubGVmdDtcblxuICAgICAgICBpbnZlcnRlZC5sZWZ0ID0gaW52ZXJ0ZWQucmlnaHQ7XG4gICAgICAgIGludmVydGVkLnJpZ2h0ID0gc3dhcDtcbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgLy8gaWYgbm90IGludmVydGlibGUsIHJlc3RyaWN0IHRvIG1pbmltdW0gb2YgMHgwIHJlY3RcbiAgICBpbnZlcnRlZC50b3AgPSBNYXRoLm1pbihjdXJyZW50LnRvcCwgc3RhcnQuYm90dG9tKTtcbiAgICBpbnZlcnRlZC5ib3R0b20gPSBNYXRoLm1heChjdXJyZW50LmJvdHRvbSwgc3RhcnQudG9wKTtcbiAgICBpbnZlcnRlZC5sZWZ0ID0gTWF0aC5taW4oY3VycmVudC5sZWZ0LCBzdGFydC5yaWdodCk7XG4gICAgaW52ZXJ0ZWQucmlnaHQgPSBNYXRoLm1heChjdXJyZW50LnJpZ2h0LCBzdGFydC5sZWZ0KTtcbiAgfVxuXG4gIGludmVydGVkLndpZHRoID0gaW52ZXJ0ZWQucmlnaHQgLSBpbnZlcnRlZC5sZWZ0O1xuICBpbnZlcnRlZC5oZWlnaHQgPSBpbnZlcnRlZC5ib3R0b20gLSBpbnZlcnRlZC50b3A7XG5cbiAgZm9yICh2YXIgZWRnZSBpbiBpbnZlcnRlZCkge1xuICAgIGRlbHRhW2VkZ2VdID0gaW52ZXJ0ZWRbZWRnZV0gLSBwcmV2aW91c1tlZGdlXTtcbiAgfVxuXG4gIGlFdmVudC5lZGdlcyA9IGludGVyYWN0aW9uLnByZXBhcmVkLmVkZ2VzO1xuICBpRXZlbnQucmVjdCA9IGludmVydGVkO1xuICBpRXZlbnQuZGVsdGFSZWN0ID0gZGVsdGE7XG59KTtcblxuLyoqXG4gKiBgYGBqc1xuICogaW50ZXJhY3QoZWxlbWVudCkucmVzaXphYmxlKHtcbiAqICAgb25zdGFydDogZnVuY3Rpb24gKGV2ZW50KSB7fSxcbiAqICAgb25tb3ZlIDogZnVuY3Rpb24gKGV2ZW50KSB7fSxcbiAqICAgb25lbmQgIDogZnVuY3Rpb24gKGV2ZW50KSB7fSxcbiAqXG4gKiAgIGVkZ2VzOiB7XG4gKiAgICAgdG9wICAgOiB0cnVlLCAgICAgICAvLyBVc2UgcG9pbnRlciBjb29yZHMgdG8gY2hlY2sgZm9yIHJlc2l6ZS5cbiAqICAgICBsZWZ0ICA6IGZhbHNlLCAgICAgIC8vIERpc2FibGUgcmVzaXppbmcgZnJvbSBsZWZ0IGVkZ2UuXG4gKiAgICAgYm90dG9tOiAnLnJlc2l6ZS1zJywvLyBSZXNpemUgaWYgcG9pbnRlciB0YXJnZXQgbWF0Y2hlcyBzZWxlY3RvclxuICogICAgIHJpZ2h0IDogaGFuZGxlRWwgICAgLy8gUmVzaXplIGlmIHBvaW50ZXIgdGFyZ2V0IGlzIHRoZSBnaXZlbiBFbGVtZW50XG4gKiAgIH0sXG4gKlxuICogICAgIC8vIFdpZHRoIGFuZCBoZWlnaHQgY2FuIGJlIGFkanVzdGVkIGluZGVwZW5kZW50bHkuIFdoZW4gYHRydWVgLCB3aWR0aCBhbmRcbiAqICAgICAvLyBoZWlnaHQgYXJlIGFkanVzdGVkIGF0IGEgMToxIHJhdGlvLlxuICogICAgIHNxdWFyZTogZmFsc2UsXG4gKlxuICogICAgIC8vIFdpZHRoIGFuZCBoZWlnaHQgY2FuIGJlIGFkanVzdGVkIGluZGVwZW5kZW50bHkuIFdoZW4gYHRydWVgLCB3aWR0aCBhbmRcbiAqICAgICAvLyBoZWlnaHQgbWFpbnRhaW4gdGhlIGFzcGVjdCByYXRpbyB0aGV5IGhhZCB3aGVuIHJlc2l6aW5nIHN0YXJ0ZWQuXG4gKiAgICAgcHJlc2VydmVBc3BlY3RSYXRpbzogZmFsc2UsXG4gKlxuICogICAvLyBhIHZhbHVlIG9mICdub25lJyB3aWxsIGxpbWl0IHRoZSByZXNpemUgcmVjdCB0byBhIG1pbmltdW0gb2YgMHgwXG4gKiAgIC8vICduZWdhdGUnIHdpbGwgYWxsb3cgdGhlIHJlY3QgdG8gaGF2ZSBuZWdhdGl2ZSB3aWR0aC9oZWlnaHRcbiAqICAgLy8gJ3JlcG9zaXRpb24nIHdpbGwga2VlcCB0aGUgd2lkdGgvaGVpZ2h0IHBvc2l0aXZlIGJ5IHN3YXBwaW5nXG4gKiAgIC8vIHRoZSB0b3AgYW5kIGJvdHRvbSBlZGdlcyBhbmQvb3Igc3dhcHBpbmcgdGhlIGxlZnQgYW5kIHJpZ2h0IGVkZ2VzXG4gKiAgIGludmVydDogJ25vbmUnIHx8ICduZWdhdGUnIHx8ICdyZXBvc2l0aW9uJ1xuICpcbiAqICAgLy8gbGltaXQgbXVsdGlwbGUgcmVzaXplcy5cbiAqICAgLy8gU2VlIHRoZSBleHBsYW5hdGlvbiBpbiB0aGUge0BsaW5rIEludGVyYWN0YWJsZS5kcmFnZ2FibGV9IGV4YW1wbGVcbiAqICAgbWF4OiBJbmZpbml0eSxcbiAqICAgbWF4UGVyRWxlbWVudDogMSxcbiAqIH0pO1xuICpcbiAqIHZhciBpc1Jlc2l6ZWFibGUgPSBpbnRlcmFjdChlbGVtZW50KS5yZXNpemFibGUoKTtcbiAqIGBgYFxuICpcbiAqIEdldHMgb3Igc2V0cyB3aGV0aGVyIHJlc2l6ZSBhY3Rpb25zIGNhbiBiZSBwZXJmb3JtZWQgb24gdGhlIHRhcmdldFxuICpcbiAqIEBwYXJhbSB7Ym9vbGVhbiB8IG9iamVjdH0gW29wdGlvbnNdIHRydWUvZmFsc2Ugb3IgQW4gb2JqZWN0IHdpdGggZXZlbnRcbiAqIGxpc3RlbmVycyB0byBiZSBmaXJlZCBvbiByZXNpemUgZXZlbnRzIChvYmplY3QgbWFrZXMgdGhlIEludGVyYWN0YWJsZVxuICogcmVzaXphYmxlKVxuICogQHJldHVybiB7Ym9vbGVhbiB8IEludGVyYWN0YWJsZX0gQSBib29sZWFuIGluZGljYXRpbmcgaWYgdGhpcyBjYW4gYmUgdGhlXG4gKiB0YXJnZXQgb2YgcmVzaXplIGVsZW1lbnRzLCBvciB0aGlzIEludGVyYWN0YWJsZVxuICovXG5JbnRlcmFjdGFibGUucHJvdG90eXBlLnJlc2l6YWJsZSA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gIGlmICh1dGlscy5pcy5vYmplY3Qob3B0aW9ucykpIHtcbiAgICB0aGlzLm9wdGlvbnMucmVzaXplLmVuYWJsZWQgPSBvcHRpb25zLmVuYWJsZWQgPT09IGZhbHNlID8gZmFsc2UgOiB0cnVlO1xuICAgIHRoaXMuc2V0UGVyQWN0aW9uKCdyZXNpemUnLCBvcHRpb25zKTtcbiAgICB0aGlzLnNldE9uRXZlbnRzKCdyZXNpemUnLCBvcHRpb25zKTtcblxuICAgIGlmICgvXngkfF55JHxeeHkkLy50ZXN0KG9wdGlvbnMuYXhpcykpIHtcbiAgICAgIHRoaXMub3B0aW9ucy5yZXNpemUuYXhpcyA9IG9wdGlvbnMuYXhpcztcbiAgICB9IGVsc2UgaWYgKG9wdGlvbnMuYXhpcyA9PT0gbnVsbCkge1xuICAgICAgdGhpcy5vcHRpb25zLnJlc2l6ZS5heGlzID0gZGVmYXVsdE9wdGlvbnMucmVzaXplLmF4aXM7XG4gICAgfVxuXG4gICAgaWYgKHV0aWxzLmlzLmJvb2wob3B0aW9ucy5wcmVzZXJ2ZUFzcGVjdFJhdGlvKSkge1xuICAgICAgdGhpcy5vcHRpb25zLnJlc2l6ZS5wcmVzZXJ2ZUFzcGVjdFJhdGlvID0gb3B0aW9ucy5wcmVzZXJ2ZUFzcGVjdFJhdGlvO1xuICAgIH0gZWxzZSBpZiAodXRpbHMuaXMuYm9vbChvcHRpb25zLnNxdWFyZSkpIHtcbiAgICAgIHRoaXMub3B0aW9ucy5yZXNpemUuc3F1YXJlID0gb3B0aW9ucy5zcXVhcmU7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgaWYgKHV0aWxzLmlzLmJvb2wob3B0aW9ucykpIHtcbiAgICB0aGlzLm9wdGlvbnMucmVzaXplLmVuYWJsZWQgPSBvcHRpb25zO1xuXG4gICAgaWYgKCFvcHRpb25zKSB7XG4gICAgICB0aGlzLm9ucmVzaXplc3RhcnQgPSB0aGlzLm9ucmVzaXplc3RhcnQgPSB0aGlzLm9ucmVzaXplZW5kID0gbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICByZXR1cm4gdGhpcy5vcHRpb25zLnJlc2l6ZTtcbn07XG5cbmZ1bmN0aW9uIGNoZWNrUmVzaXplRWRnZShuYW1lLCB2YWx1ZSwgcGFnZSwgZWxlbWVudCwgaW50ZXJhY3RhYmxlRWxlbWVudCwgcmVjdCwgbWFyZ2luKSB7XG4gIC8vIGZhbHNlLCAnJywgdW5kZWZpbmVkLCBudWxsXG4gIGlmICghdmFsdWUpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvLyB0cnVlIHZhbHVlLCB1c2UgcG9pbnRlciBjb29yZHMgYW5kIGVsZW1lbnQgcmVjdFxuICBpZiAodmFsdWUgPT09IHRydWUpIHtcbiAgICAvLyBpZiBkaW1lbnNpb25zIGFyZSBuZWdhdGl2ZSwgXCJzd2l0Y2hcIiBlZGdlc1xuICAgIHZhciB3aWR0aCA9IHV0aWxzLmlzLm51bWJlcihyZWN0LndpZHRoKSA/IHJlY3Qud2lkdGggOiByZWN0LnJpZ2h0IC0gcmVjdC5sZWZ0O1xuICAgIHZhciBoZWlnaHQgPSB1dGlscy5pcy5udW1iZXIocmVjdC5oZWlnaHQpID8gcmVjdC5oZWlnaHQgOiByZWN0LmJvdHRvbSAtIHJlY3QudG9wO1xuXG4gICAgaWYgKHdpZHRoIDwgMCkge1xuICAgICAgaWYgKG5hbWUgPT09ICdsZWZ0Jykge1xuICAgICAgICBuYW1lID0gJ3JpZ2h0JztcbiAgICAgIH0gZWxzZSBpZiAobmFtZSA9PT0gJ3JpZ2h0Jykge1xuICAgICAgICBuYW1lID0gJ2xlZnQnO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoaGVpZ2h0IDwgMCkge1xuICAgICAgaWYgKG5hbWUgPT09ICd0b3AnKSB7XG4gICAgICAgIG5hbWUgPSAnYm90dG9tJztcbiAgICAgIH0gZWxzZSBpZiAobmFtZSA9PT0gJ2JvdHRvbScpIHtcbiAgICAgICAgbmFtZSA9ICd0b3AnO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChuYW1lID09PSAnbGVmdCcpIHtcbiAgICAgIHJldHVybiBwYWdlLnggPCAod2lkdGggPj0gMCA/IHJlY3QubGVmdCA6IHJlY3QucmlnaHQpICsgbWFyZ2luO1xuICAgIH1cbiAgICBpZiAobmFtZSA9PT0gJ3RvcCcpIHtcbiAgICAgIHJldHVybiBwYWdlLnkgPCAoaGVpZ2h0ID49IDAgPyByZWN0LnRvcCA6IHJlY3QuYm90dG9tKSArIG1hcmdpbjtcbiAgICB9XG5cbiAgICBpZiAobmFtZSA9PT0gJ3JpZ2h0Jykge1xuICAgICAgcmV0dXJuIHBhZ2UueCA+ICh3aWR0aCA+PSAwID8gcmVjdC5yaWdodCA6IHJlY3QubGVmdCkgLSBtYXJnaW47XG4gICAgfVxuICAgIGlmIChuYW1lID09PSAnYm90dG9tJykge1xuICAgICAgcmV0dXJuIHBhZ2UueSA+IChoZWlnaHQgPj0gMCA/IHJlY3QuYm90dG9tIDogcmVjdC50b3ApIC0gbWFyZ2luO1xuICAgIH1cbiAgfVxuXG4gIC8vIHRoZSByZW1haW5pbmcgY2hlY2tzIHJlcXVpcmUgYW4gZWxlbWVudFxuICBpZiAoIXV0aWxzLmlzLmVsZW1lbnQoZWxlbWVudCkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gdXRpbHMuaXMuZWxlbWVudCh2YWx1ZSlcbiAgLy8gdGhlIHZhbHVlIGlzIGFuIGVsZW1lbnQgdG8gdXNlIGFzIGEgcmVzaXplIGhhbmRsZVxuICA/IHZhbHVlID09PSBlbGVtZW50XG4gIC8vIG90aGVyd2lzZSBjaGVjayBpZiBlbGVtZW50IG1hdGNoZXMgdmFsdWUgYXMgc2VsZWN0b3JcbiAgOiB1dGlscy5tYXRjaGVzVXBUbyhlbGVtZW50LCB2YWx1ZSwgaW50ZXJhY3RhYmxlRWxlbWVudCk7XG59XG5cbkludGVyYWN0aW9uLnNpZ25hbHMub24oJ25ldycsIGZ1bmN0aW9uIChpbnRlcmFjdGlvbikge1xuICBpbnRlcmFjdGlvbi5yZXNpemVBeGVzID0gJ3h5Jztcbn0pO1xuXG5JbnRlcmFjdEV2ZW50LnNpZ25hbHMub24oJ3NldC1kZWx0YScsIGZ1bmN0aW9uIChfcmVmMykge1xuICB2YXIgaW50ZXJhY3Rpb24gPSBfcmVmMy5pbnRlcmFjdGlvbixcbiAgICAgIGlFdmVudCA9IF9yZWYzLmlFdmVudCxcbiAgICAgIGFjdGlvbiA9IF9yZWYzLmFjdGlvbjtcblxuICBpZiAoYWN0aW9uICE9PSAncmVzaXplJyB8fCAhaW50ZXJhY3Rpb24ucmVzaXplQXhlcykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHZhciBvcHRpb25zID0gaW50ZXJhY3Rpb24udGFyZ2V0Lm9wdGlvbnM7XG5cbiAgaWYgKG9wdGlvbnMucmVzaXplLnNxdWFyZSkge1xuICAgIGlmIChpbnRlcmFjdGlvbi5yZXNpemVBeGVzID09PSAneScpIHtcbiAgICAgIGlFdmVudC5keCA9IGlFdmVudC5keTtcbiAgICB9IGVsc2Uge1xuICAgICAgaUV2ZW50LmR5ID0gaUV2ZW50LmR4O1xuICAgIH1cbiAgICBpRXZlbnQuYXhlcyA9ICd4eSc7XG4gIH0gZWxzZSB7XG4gICAgaUV2ZW50LmF4ZXMgPSBpbnRlcmFjdGlvbi5yZXNpemVBeGVzO1xuXG4gICAgaWYgKGludGVyYWN0aW9uLnJlc2l6ZUF4ZXMgPT09ICd4Jykge1xuICAgICAgaUV2ZW50LmR5ID0gMDtcbiAgICB9IGVsc2UgaWYgKGludGVyYWN0aW9uLnJlc2l6ZUF4ZXMgPT09ICd5Jykge1xuICAgICAgaUV2ZW50LmR4ID0gMDtcbiAgICB9XG4gIH1cbn0pO1xuXG5hY3Rpb25zLnJlc2l6ZSA9IHJlc2l6ZTtcbmFjdGlvbnMubmFtZXMucHVzaCgncmVzaXplJyk7XG51dGlscy5tZXJnZShJbnRlcmFjdGFibGUuZXZlbnRUeXBlcywgWydyZXNpemVzdGFydCcsICdyZXNpemVtb3ZlJywgJ3Jlc2l6ZWluZXJ0aWFzdGFydCcsICdyZXNpemVpbmVydGlhcmVzdW1lJywgJ3Jlc2l6ZWVuZCddKTtcbmFjdGlvbnMubWV0aG9kRGljdC5yZXNpemUgPSAncmVzaXphYmxlJztcblxuZGVmYXVsdE9wdGlvbnMucmVzaXplID0gcmVzaXplLmRlZmF1bHRzO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlc2l6ZTtcblxufSx7XCIuLi9JbnRlcmFjdEV2ZW50XCI6MyxcIi4uL0ludGVyYWN0YWJsZVwiOjQsXCIuLi9JbnRlcmFjdGlvblwiOjUsXCIuLi9kZWZhdWx0T3B0aW9uc1wiOjE4LFwiLi4vdXRpbHNcIjo0NCxcIi4uL3V0aWxzL2Jyb3dzZXJcIjozNixcIi4vYmFzZVwiOjZ9XSwxMTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4ndXNlIHN0cmljdCc7XG5cbnZhciByYWYgPSByZXF1aXJlKCcuL3V0aWxzL3JhZicpO1xudmFyIGdldFdpbmRvdyA9IHJlcXVpcmUoJy4vdXRpbHMvd2luZG93JykuZ2V0V2luZG93O1xudmFyIGlzID0gcmVxdWlyZSgnLi91dGlscy9pcycpO1xudmFyIGRvbVV0aWxzID0gcmVxdWlyZSgnLi91dGlscy9kb21VdGlscycpO1xudmFyIEludGVyYWN0aW9uID0gcmVxdWlyZSgnLi9JbnRlcmFjdGlvbicpO1xudmFyIGRlZmF1bHRPcHRpb25zID0gcmVxdWlyZSgnLi9kZWZhdWx0T3B0aW9ucycpO1xuXG52YXIgYXV0b1Njcm9sbCA9IHtcbiAgZGVmYXVsdHM6IHtcbiAgICBlbmFibGVkOiBmYWxzZSxcbiAgICBjb250YWluZXI6IG51bGwsIC8vIHRoZSBpdGVtIHRoYXQgaXMgc2Nyb2xsZWQgKFdpbmRvdyBvciBIVE1MRWxlbWVudClcbiAgICBtYXJnaW46IDYwLFxuICAgIHNwZWVkOiAzMDAgLy8gdGhlIHNjcm9sbCBzcGVlZCBpbiBwaXhlbHMgcGVyIHNlY29uZFxuICB9LFxuXG4gIGludGVyYWN0aW9uOiBudWxsLFxuICBpOiBudWxsLCAvLyB0aGUgaGFuZGxlIHJldHVybmVkIGJ5IHdpbmRvdy5zZXRJbnRlcnZhbFxuICB4OiAwLCB5OiAwLCAvLyBEaXJlY3Rpb24gZWFjaCBwdWxzZSBpcyB0byBzY3JvbGwgaW5cblxuICBpc1Njcm9sbGluZzogZmFsc2UsXG4gIHByZXZUaW1lOiAwLFxuXG4gIHN0YXJ0OiBmdW5jdGlvbiBzdGFydChpbnRlcmFjdGlvbikge1xuICAgIGF1dG9TY3JvbGwuaXNTY3JvbGxpbmcgPSB0cnVlO1xuICAgIHJhZi5jYW5jZWwoYXV0b1Njcm9sbC5pKTtcblxuICAgIGF1dG9TY3JvbGwuaW50ZXJhY3Rpb24gPSBpbnRlcmFjdGlvbjtcbiAgICBhdXRvU2Nyb2xsLnByZXZUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgYXV0b1Njcm9sbC5pID0gcmFmLnJlcXVlc3QoYXV0b1Njcm9sbC5zY3JvbGwpO1xuICB9LFxuXG4gIHN0b3A6IGZ1bmN0aW9uIHN0b3AoKSB7XG4gICAgYXV0b1Njcm9sbC5pc1Njcm9sbGluZyA9IGZhbHNlO1xuICAgIHJhZi5jYW5jZWwoYXV0b1Njcm9sbC5pKTtcbiAgfSxcblxuICAvLyBzY3JvbGwgdGhlIHdpbmRvdyBieSB0aGUgdmFsdWVzIGluIHNjcm9sbC54L3lcbiAgc2Nyb2xsOiBmdW5jdGlvbiBzY3JvbGwoKSB7XG4gICAgdmFyIG9wdGlvbnMgPSBhdXRvU2Nyb2xsLmludGVyYWN0aW9uLnRhcmdldC5vcHRpb25zW2F1dG9TY3JvbGwuaW50ZXJhY3Rpb24ucHJlcGFyZWQubmFtZV0uYXV0b1Njcm9sbDtcbiAgICB2YXIgY29udGFpbmVyID0gb3B0aW9ucy5jb250YWluZXIgfHwgZ2V0V2luZG93KGF1dG9TY3JvbGwuaW50ZXJhY3Rpb24uZWxlbWVudCk7XG4gICAgdmFyIG5vdyA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgIC8vIGNoYW5nZSBpbiB0aW1lIGluIHNlY29uZHNcbiAgICB2YXIgZHQgPSAobm93IC0gYXV0b1Njcm9sbC5wcmV2VGltZSkgLyAxMDAwO1xuICAgIC8vIGRpc3BsYWNlbWVudFxuICAgIHZhciBzID0gb3B0aW9ucy5zcGVlZCAqIGR0O1xuXG4gICAgaWYgKHMgPj0gMSkge1xuICAgICAgaWYgKGlzLndpbmRvdyhjb250YWluZXIpKSB7XG4gICAgICAgIGNvbnRhaW5lci5zY3JvbGxCeShhdXRvU2Nyb2xsLnggKiBzLCBhdXRvU2Nyb2xsLnkgKiBzKTtcbiAgICAgIH0gZWxzZSBpZiAoY29udGFpbmVyKSB7XG4gICAgICAgIGNvbnRhaW5lci5zY3JvbGxMZWZ0ICs9IGF1dG9TY3JvbGwueCAqIHM7XG4gICAgICAgIGNvbnRhaW5lci5zY3JvbGxUb3AgKz0gYXV0b1Njcm9sbC55ICogcztcbiAgICAgIH1cblxuICAgICAgYXV0b1Njcm9sbC5wcmV2VGltZSA9IG5vdztcbiAgICB9XG5cbiAgICBpZiAoYXV0b1Njcm9sbC5pc1Njcm9sbGluZykge1xuICAgICAgcmFmLmNhbmNlbChhdXRvU2Nyb2xsLmkpO1xuICAgICAgYXV0b1Njcm9sbC5pID0gcmFmLnJlcXVlc3QoYXV0b1Njcm9sbC5zY3JvbGwpO1xuICAgIH1cbiAgfSxcbiAgY2hlY2s6IGZ1bmN0aW9uIGNoZWNrKGludGVyYWN0YWJsZSwgYWN0aW9uTmFtZSkge1xuICAgIHZhciBvcHRpb25zID0gaW50ZXJhY3RhYmxlLm9wdGlvbnM7XG5cbiAgICByZXR1cm4gb3B0aW9uc1thY3Rpb25OYW1lXS5hdXRvU2Nyb2xsICYmIG9wdGlvbnNbYWN0aW9uTmFtZV0uYXV0b1Njcm9sbC5lbmFibGVkO1xuICB9LFxuICBvbkludGVyYWN0aW9uTW92ZTogZnVuY3Rpb24gb25JbnRlcmFjdGlvbk1vdmUoX3JlZikge1xuICAgIHZhciBpbnRlcmFjdGlvbiA9IF9yZWYuaW50ZXJhY3Rpb24sXG4gICAgICAgIHBvaW50ZXIgPSBfcmVmLnBvaW50ZXI7XG5cbiAgICBpZiAoIShpbnRlcmFjdGlvbi5pbnRlcmFjdGluZygpICYmIGF1dG9TY3JvbGwuY2hlY2soaW50ZXJhY3Rpb24udGFyZ2V0LCBpbnRlcmFjdGlvbi5wcmVwYXJlZC5uYW1lKSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoaW50ZXJhY3Rpb24uc2ltdWxhdGlvbikge1xuICAgICAgYXV0b1Njcm9sbC54ID0gYXV0b1Njcm9sbC55ID0gMDtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgdG9wID0gdm9pZCAwO1xuICAgIHZhciByaWdodCA9IHZvaWQgMDtcbiAgICB2YXIgYm90dG9tID0gdm9pZCAwO1xuICAgIHZhciBsZWZ0ID0gdm9pZCAwO1xuXG4gICAgdmFyIG9wdGlvbnMgPSBpbnRlcmFjdGlvbi50YXJnZXQub3B0aW9uc1tpbnRlcmFjdGlvbi5wcmVwYXJlZC5uYW1lXS5hdXRvU2Nyb2xsO1xuICAgIHZhciBjb250YWluZXIgPSBvcHRpb25zLmNvbnRhaW5lciB8fCBnZXRXaW5kb3coaW50ZXJhY3Rpb24uZWxlbWVudCk7XG5cbiAgICBpZiAoaXMud2luZG93KGNvbnRhaW5lcikpIHtcbiAgICAgIGxlZnQgPSBwb2ludGVyLmNsaWVudFggPCBhdXRvU2Nyb2xsLm1hcmdpbjtcbiAgICAgIHRvcCA9IHBvaW50ZXIuY2xpZW50WSA8IGF1dG9TY3JvbGwubWFyZ2luO1xuICAgICAgcmlnaHQgPSBwb2ludGVyLmNsaWVudFggPiBjb250YWluZXIuaW5uZXJXaWR0aCAtIGF1dG9TY3JvbGwubWFyZ2luO1xuICAgICAgYm90dG9tID0gcG9pbnRlci5jbGllbnRZID4gY29udGFpbmVyLmlubmVySGVpZ2h0IC0gYXV0b1Njcm9sbC5tYXJnaW47XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciByZWN0ID0gZG9tVXRpbHMuZ2V0RWxlbWVudENsaWVudFJlY3QoY29udGFpbmVyKTtcblxuICAgICAgbGVmdCA9IHBvaW50ZXIuY2xpZW50WCA8IHJlY3QubGVmdCArIGF1dG9TY3JvbGwubWFyZ2luO1xuICAgICAgdG9wID0gcG9pbnRlci5jbGllbnRZIDwgcmVjdC50b3AgKyBhdXRvU2Nyb2xsLm1hcmdpbjtcbiAgICAgIHJpZ2h0ID0gcG9pbnRlci5jbGllbnRYID4gcmVjdC5yaWdodCAtIGF1dG9TY3JvbGwubWFyZ2luO1xuICAgICAgYm90dG9tID0gcG9pbnRlci5jbGllbnRZID4gcmVjdC5ib3R0b20gLSBhdXRvU2Nyb2xsLm1hcmdpbjtcbiAgICB9XG5cbiAgICBhdXRvU2Nyb2xsLnggPSByaWdodCA/IDEgOiBsZWZ0ID8gLTEgOiAwO1xuICAgIGF1dG9TY3JvbGwueSA9IGJvdHRvbSA/IDEgOiB0b3AgPyAtMSA6IDA7XG5cbiAgICBpZiAoIWF1dG9TY3JvbGwuaXNTY3JvbGxpbmcpIHtcbiAgICAgIC8vIHNldCB0aGUgYXV0b1Njcm9sbCBwcm9wZXJ0aWVzIHRvIHRob3NlIG9mIHRoZSB0YXJnZXRcbiAgICAgIGF1dG9TY3JvbGwubWFyZ2luID0gb3B0aW9ucy5tYXJnaW47XG4gICAgICBhdXRvU2Nyb2xsLnNwZWVkID0gb3B0aW9ucy5zcGVlZDtcblxuICAgICAgYXV0b1Njcm9sbC5zdGFydChpbnRlcmFjdGlvbik7XG4gICAgfVxuICB9XG59O1xuXG5JbnRlcmFjdGlvbi5zaWduYWxzLm9uKCdzdG9wLWFjdGl2ZScsIGZ1bmN0aW9uICgpIHtcbiAgYXV0b1Njcm9sbC5zdG9wKCk7XG59KTtcblxuSW50ZXJhY3Rpb24uc2lnbmFscy5vbignYWN0aW9uLW1vdmUnLCBhdXRvU2Nyb2xsLm9uSW50ZXJhY3Rpb25Nb3ZlKTtcblxuZGVmYXVsdE9wdGlvbnMucGVyQWN0aW9uLmF1dG9TY3JvbGwgPSBhdXRvU2Nyb2xsLmRlZmF1bHRzO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGF1dG9TY3JvbGw7XG5cbn0se1wiLi9JbnRlcmFjdGlvblwiOjUsXCIuL2RlZmF1bHRPcHRpb25zXCI6MTgsXCIuL3V0aWxzL2RvbVV0aWxzXCI6MzksXCIuL3V0aWxzL2lzXCI6NDYsXCIuL3V0aWxzL3JhZlwiOjUwLFwiLi91dGlscy93aW5kb3dcIjo1Mn1dLDEyOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbid1c2Ugc3RyaWN0JztcblxuLyoqIEBsZW5kcyBJbnRlcmFjdGFibGUgKi9cbnZhciBJbnRlcmFjdGFibGUgPSByZXF1aXJlKCcuLi9JbnRlcmFjdGFibGUnKTtcbnZhciBhY3Rpb25zID0gcmVxdWlyZSgnLi4vYWN0aW9ucy9iYXNlJyk7XG52YXIgaXMgPSByZXF1aXJlKCcuLi91dGlscy9pcycpO1xudmFyIGRvbVV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMvZG9tVXRpbHMnKTtcblxudmFyIF9yZXF1aXJlID0gcmVxdWlyZSgnLi4vdXRpbHMnKSxcbiAgICB3YXJuT25jZSA9IF9yZXF1aXJlLndhcm5PbmNlO1xuXG5JbnRlcmFjdGFibGUucHJvdG90eXBlLmdldEFjdGlvbiA9IGZ1bmN0aW9uIChwb2ludGVyLCBldmVudCwgaW50ZXJhY3Rpb24sIGVsZW1lbnQpIHtcbiAgdmFyIGFjdGlvbiA9IHRoaXMuZGVmYXVsdEFjdGlvbkNoZWNrZXIocG9pbnRlciwgZXZlbnQsIGludGVyYWN0aW9uLCBlbGVtZW50KTtcblxuICBpZiAodGhpcy5vcHRpb25zLmFjdGlvbkNoZWNrZXIpIHtcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLmFjdGlvbkNoZWNrZXIocG9pbnRlciwgZXZlbnQsIGFjdGlvbiwgdGhpcywgZWxlbWVudCwgaW50ZXJhY3Rpb24pO1xuICB9XG5cbiAgcmV0dXJuIGFjdGlvbjtcbn07XG5cbi8qKlxuICogYGBganNcbiAqIGludGVyYWN0KGVsZW1lbnQsIHsgaWdub3JlRnJvbTogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25vLWFjdGlvbicpIH0pO1xuICogLy8gb3JcbiAqIGludGVyYWN0KGVsZW1lbnQpLmlnbm9yZUZyb20oJ2lucHV0LCB0ZXh0YXJlYSwgYScpO1xuICogYGBgXG4gKiBAZGVwcmVjYXRlZFxuICogSWYgdGhlIHRhcmdldCBvZiB0aGUgYG1vdXNlZG93bmAsIGBwb2ludGVyZG93bmAgb3IgYHRvdWNoc3RhcnRgIGV2ZW50IG9yIGFueVxuICogb2YgaXQncyBwYXJlbnRzIG1hdGNoIHRoZSBnaXZlbiBDU1Mgc2VsZWN0b3Igb3IgRWxlbWVudCwgbm9cbiAqIGRyYWcvcmVzaXplL2dlc3R1cmUgaXMgc3RhcnRlZC5cbiAqXG4gKiBEb24ndCB1c2UgdGhpcyBtZXRob2QuIEluc3RlYWQgc2V0IHRoZSBgaWdub3JlRnJvbWAgb3B0aW9uIGZvciBlYWNoIGFjdGlvblxuICogb3IgZm9yIGBwb2ludGVyRXZlbnRzYFxuICpcbiAqIEBleGFtcGxlXG4gKiBpbnRlcmFjdCh0YXJnZXR0KVxuICogICAuZHJhZ2dhYmxlKHtcbiAqICAgICBpZ25vcmVGcm9tOiAnaW5wdXQsIHRleHRhcmVhLCBhW2hyZWZdJycsXG4gKiAgIH0pXG4gKiAgIC5wb2ludGVyRXZlbnRzKHtcbiAqICAgICBpZ25vcmVGcm9tOiAnW25vLXBvaW50ZXJdJyxcbiAqICAgfSk7XG4gKlxuICogQHBhcmFtIHtzdHJpbmcgfCBFbGVtZW50IHwgbnVsbH0gW25ld1ZhbHVlXSBhIENTUyBzZWxlY3RvciBzdHJpbmcsIGFuXG4gKiBFbGVtZW50IG9yIGBudWxsYCB0byBub3QgaWdub3JlIGFueSBlbGVtZW50c1xuICogQHJldHVybiB7c3RyaW5nIHwgRWxlbWVudCB8IG9iamVjdH0gVGhlIGN1cnJlbnQgaWdub3JlRnJvbSB2YWx1ZSBvciB0aGlzXG4gKiBJbnRlcmFjdGFibGVcbiAqL1xuSW50ZXJhY3RhYmxlLnByb3RvdHlwZS5pZ25vcmVGcm9tID0gd2Fybk9uY2UoZnVuY3Rpb24gKG5ld1ZhbHVlKSB7XG4gIHJldHVybiB0aGlzLl9iYWNrQ29tcGF0T3B0aW9uKCdpZ25vcmVGcm9tJywgbmV3VmFsdWUpO1xufSwgJ0ludGVyYWN0YWJsZS5pZ25vcmVGb3JtKCkgaGFzIGJlZW4gZGVwcmVjYXRlZC4gVXNlIEludGVyYWN0YmxlLmRyYWdnYWJsZSh7aWdub3JlRnJvbTogbmV3VmFsdWV9KS4nKTtcblxuLyoqXG4gKiBgYGBqc1xuICpcbiAqIEBkZXByZWNhdGVkXG4gKiBBIGRyYWcvcmVzaXplL2dlc3R1cmUgaXMgc3RhcnRlZCBvbmx5IElmIHRoZSB0YXJnZXQgb2YgdGhlIGBtb3VzZWRvd25gLFxuICogYHBvaW50ZXJkb3duYCBvciBgdG91Y2hzdGFydGAgZXZlbnQgb3IgYW55IG9mIGl0J3MgcGFyZW50cyBtYXRjaCB0aGUgZ2l2ZW5cbiAqIENTUyBzZWxlY3RvciBvciBFbGVtZW50LlxuICpcbiAqIERvbid0IHVzZSB0aGlzIG1ldGhvZC4gSW5zdGVhZCBzZXQgdGhlIGBhbGxvd0Zyb21gIG9wdGlvbiBmb3IgZWFjaCBhY3Rpb25cbiAqIG9yIGZvciBgcG9pbnRlckV2ZW50c2BcbiAqXG4gKiBAZXhhbXBsZVxuICogaW50ZXJhY3QodGFyZ2V0dClcbiAqICAgLnJlc2l6YWJsZSh7XG4gKiAgICAgYWxsb3dGcm9tOiAnLnJlc2l6ZS1oYW5kbGUnLFxuICogICAucG9pbnRlckV2ZW50cyh7XG4gKiAgICAgYWxsb3dGcm9tOiAnLmhhbmRsZScsLFxuICogICB9KTtcbiAqXG4gKiBAcGFyYW0ge3N0cmluZyB8IEVsZW1lbnQgfCBudWxsfSBbbmV3VmFsdWVdIGEgQ1NTIHNlbGVjdG9yIHN0cmluZywgYW5cbiAqIEVsZW1lbnQgb3IgYG51bGxgIHRvIGFsbG93IGZyb20gYW55IGVsZW1lbnRcbiAqIEByZXR1cm4ge3N0cmluZyB8IEVsZW1lbnQgfCBvYmplY3R9IFRoZSBjdXJyZW50IGFsbG93RnJvbSB2YWx1ZSBvciB0aGlzXG4gKiBJbnRlcmFjdGFibGVcbiAqL1xuSW50ZXJhY3RhYmxlLnByb3RvdHlwZS5hbGxvd0Zyb20gPSB3YXJuT25jZShmdW5jdGlvbiAobmV3VmFsdWUpIHtcbiAgcmV0dXJuIHRoaXMuX2JhY2tDb21wYXRPcHRpb24oJ2FsbG93RnJvbScsIG5ld1ZhbHVlKTtcbn0sICdJbnRlcmFjdGFibGUuYWxsb3dGb3JtKCkgaGFzIGJlZW4gZGVwcmVjYXRlZC4gVXNlIEludGVyYWN0YmxlLmRyYWdnYWJsZSh7YWxsb3dGcm9tOiBuZXdWYWx1ZX0pLicpO1xuXG5JbnRlcmFjdGFibGUucHJvdG90eXBlLnRlc3RJZ25vcmUgPSBmdW5jdGlvbiAoaWdub3JlRnJvbSwgaW50ZXJhY3RhYmxlRWxlbWVudCwgZWxlbWVudCkge1xuICBpZiAoIWlnbm9yZUZyb20gfHwgIWlzLmVsZW1lbnQoZWxlbWVudCkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpZiAoaXMuc3RyaW5nKGlnbm9yZUZyb20pKSB7XG4gICAgcmV0dXJuIGRvbVV0aWxzLm1hdGNoZXNVcFRvKGVsZW1lbnQsIGlnbm9yZUZyb20sIGludGVyYWN0YWJsZUVsZW1lbnQpO1xuICB9IGVsc2UgaWYgKGlzLmVsZW1lbnQoaWdub3JlRnJvbSkpIHtcbiAgICByZXR1cm4gZG9tVXRpbHMubm9kZUNvbnRhaW5zKGlnbm9yZUZyb20sIGVsZW1lbnQpO1xuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufTtcblxuSW50ZXJhY3RhYmxlLnByb3RvdHlwZS50ZXN0QWxsb3cgPSBmdW5jdGlvbiAoYWxsb3dGcm9tLCBpbnRlcmFjdGFibGVFbGVtZW50LCBlbGVtZW50KSB7XG4gIGlmICghYWxsb3dGcm9tKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBpZiAoIWlzLmVsZW1lbnQoZWxlbWVudCkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpZiAoaXMuc3RyaW5nKGFsbG93RnJvbSkpIHtcbiAgICByZXR1cm4gZG9tVXRpbHMubWF0Y2hlc1VwVG8oZWxlbWVudCwgYWxsb3dGcm9tLCBpbnRlcmFjdGFibGVFbGVtZW50KTtcbiAgfSBlbHNlIGlmIChpcy5lbGVtZW50KGFsbG93RnJvbSkpIHtcbiAgICByZXR1cm4gZG9tVXRpbHMubm9kZUNvbnRhaW5zKGFsbG93RnJvbSwgZWxlbWVudCk7XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59O1xuXG5JbnRlcmFjdGFibGUucHJvdG90eXBlLnRlc3RJZ25vcmVBbGxvdyA9IGZ1bmN0aW9uIChvcHRpb25zLCBpbnRlcmFjdGFibGVFbGVtZW50LCBldmVudFRhcmdldCkge1xuICByZXR1cm4gIXRoaXMudGVzdElnbm9yZShvcHRpb25zLmlnbm9yZUZyb20sIGludGVyYWN0YWJsZUVsZW1lbnQsIGV2ZW50VGFyZ2V0KSAmJiB0aGlzLnRlc3RBbGxvdyhvcHRpb25zLmFsbG93RnJvbSwgaW50ZXJhY3RhYmxlRWxlbWVudCwgZXZlbnRUYXJnZXQpO1xufTtcblxuLyoqXG4gKiBgYGBqc1xuICogaW50ZXJhY3QoJy5yZXNpemUtZHJhZycpXG4gKiAgIC5yZXNpemFibGUodHJ1ZSlcbiAqICAgLmRyYWdnYWJsZSh0cnVlKVxuICogICAuYWN0aW9uQ2hlY2tlcihmdW5jdGlvbiAocG9pbnRlciwgZXZlbnQsIGFjdGlvbiwgaW50ZXJhY3RhYmxlLCBlbGVtZW50LCBpbnRlcmFjdGlvbikge1xuICpcbiAqICAgaWYgKGludGVyYWN0Lm1hdGNoZXNTZWxlY3RvcihldmVudC50YXJnZXQsICcuZHJhZy1oYW5kbGUnKSB7XG4gKiAgICAgLy8gZm9yY2UgZHJhZyB3aXRoIGhhbmRsZSB0YXJnZXRcbiAqICAgICBhY3Rpb24ubmFtZSA9IGRyYWc7XG4gKiAgIH1cbiAqICAgZWxzZSB7XG4gKiAgICAgLy8gcmVzaXplIGZyb20gdGhlIHRvcCBhbmQgcmlnaHQgZWRnZXNcbiAqICAgICBhY3Rpb24ubmFtZSAgPSAncmVzaXplJztcbiAqICAgICBhY3Rpb24uZWRnZXMgPSB7IHRvcDogdHJ1ZSwgcmlnaHQ6IHRydWUgfTtcbiAqICAgfVxuICpcbiAqICAgcmV0dXJuIGFjdGlvbjtcbiAqIH0pO1xuICogYGBgXG4gKlxuICogR2V0cyBvciBzZXRzIHRoZSBmdW5jdGlvbiB1c2VkIHRvIGNoZWNrIGFjdGlvbiB0byBiZSBwZXJmb3JtZWQgb25cbiAqIHBvaW50ZXJEb3duXG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbiB8IG51bGx9IFtjaGVja2VyXSBBIGZ1bmN0aW9uIHdoaWNoIHRha2VzIGEgcG9pbnRlciBldmVudCxcbiAqIGRlZmF1bHRBY3Rpb24gc3RyaW5nLCBpbnRlcmFjdGFibGUsIGVsZW1lbnQgYW5kIGludGVyYWN0aW9uIGFzIHBhcmFtZXRlcnNcbiAqIGFuZCByZXR1cm5zIGFuIG9iamVjdCB3aXRoIG5hbWUgcHJvcGVydHkgJ2RyYWcnICdyZXNpemUnIG9yICdnZXN0dXJlJyBhbmRcbiAqIG9wdGlvbmFsbHkgYW4gYGVkZ2VzYCBvYmplY3Qgd2l0aCBib29sZWFuICd0b3AnLCAnbGVmdCcsICdib3R0b20nIGFuZCByaWdodFxuICogcHJvcHMuXG4gKiBAcmV0dXJuIHtGdW5jdGlvbiB8IEludGVyYWN0YWJsZX0gVGhlIGNoZWNrZXIgZnVuY3Rpb24gb3IgdGhpcyBJbnRlcmFjdGFibGVcbiAqL1xuSW50ZXJhY3RhYmxlLnByb3RvdHlwZS5hY3Rpb25DaGVja2VyID0gZnVuY3Rpb24gKGNoZWNrZXIpIHtcbiAgaWYgKGlzLmZ1bmN0aW9uKGNoZWNrZXIpKSB7XG4gICAgdGhpcy5vcHRpb25zLmFjdGlvbkNoZWNrZXIgPSBjaGVja2VyO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBpZiAoY2hlY2tlciA9PT0gbnVsbCkge1xuICAgIGRlbGV0ZSB0aGlzLm9wdGlvbnMuYWN0aW9uQ2hlY2tlcjtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgcmV0dXJuIHRoaXMub3B0aW9ucy5hY3Rpb25DaGVja2VyO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIG9yIHNldHMgd2hldGhlciB0aGUgdGhlIGN1cnNvciBzaG91bGQgYmUgY2hhbmdlZCBkZXBlbmRpbmcgb24gdGhlXG4gKiBhY3Rpb24gdGhhdCB3b3VsZCBiZSBwZXJmb3JtZWQgaWYgdGhlIG1vdXNlIHdlcmUgcHJlc3NlZCBhbmQgZHJhZ2dlZC5cbiAqXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtuZXdWYWx1ZV1cbiAqIEByZXR1cm4ge2Jvb2xlYW4gfCBJbnRlcmFjdGFibGV9IFRoZSBjdXJyZW50IHNldHRpbmcgb3IgdGhpcyBJbnRlcmFjdGFibGVcbiAqL1xuSW50ZXJhY3RhYmxlLnByb3RvdHlwZS5zdHlsZUN1cnNvciA9IGZ1bmN0aW9uIChuZXdWYWx1ZSkge1xuICBpZiAoaXMuYm9vbChuZXdWYWx1ZSkpIHtcbiAgICB0aGlzLm9wdGlvbnMuc3R5bGVDdXJzb3IgPSBuZXdWYWx1ZTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgaWYgKG5ld1ZhbHVlID09PSBudWxsKSB7XG4gICAgZGVsZXRlIHRoaXMub3B0aW9ucy5zdHlsZUN1cnNvcjtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgcmV0dXJuIHRoaXMub3B0aW9ucy5zdHlsZUN1cnNvcjtcbn07XG5cbkludGVyYWN0YWJsZS5wcm90b3R5cGUuZGVmYXVsdEFjdGlvbkNoZWNrZXIgPSBmdW5jdGlvbiAocG9pbnRlciwgZXZlbnQsIGludGVyYWN0aW9uLCBlbGVtZW50KSB7XG4gIHZhciByZWN0ID0gdGhpcy5nZXRSZWN0KGVsZW1lbnQpO1xuICB2YXIgYnV0dG9ucyA9IGV2ZW50LmJ1dHRvbnMgfHwge1xuICAgIDA6IDEsXG4gICAgMTogNCxcbiAgICAzOiA4LFxuICAgIDQ6IDE2XG4gIH1bZXZlbnQuYnV0dG9uXTtcbiAgdmFyIGFjdGlvbiA9IG51bGw7XG5cbiAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFjdGlvbnMubmFtZXMubGVuZ3RoOyBfaSsrKSB7XG4gICAgdmFyIF9yZWY7XG5cbiAgICBfcmVmID0gYWN0aW9ucy5uYW1lc1tfaV07XG4gICAgdmFyIGFjdGlvbk5hbWUgPSBfcmVmO1xuXG4gICAgLy8gY2hlY2sgbW91c2VCdXR0b24gc2V0dGluZyBpZiB0aGUgcG9pbnRlciBpcyBkb3duXG4gICAgaWYgKGludGVyYWN0aW9uLnBvaW50ZXJJc0Rvd24gJiYgL21vdXNlfHBvaW50ZXIvLnRlc3QoaW50ZXJhY3Rpb24ucG9pbnRlclR5cGUpICYmIChidXR0b25zICYgdGhpcy5vcHRpb25zW2FjdGlvbk5hbWVdLm1vdXNlQnV0dG9ucykgPT09IDApIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGFjdGlvbiA9IGFjdGlvbnNbYWN0aW9uTmFtZV0uY2hlY2tlcihwb2ludGVyLCBldmVudCwgdGhpcywgZWxlbWVudCwgaW50ZXJhY3Rpb24sIHJlY3QpO1xuXG4gICAgaWYgKGFjdGlvbikge1xuICAgICAgcmV0dXJuIGFjdGlvbjtcbiAgICB9XG4gIH1cbn07XG5cbn0se1wiLi4vSW50ZXJhY3RhYmxlXCI6NCxcIi4uL2FjdGlvbnMvYmFzZVwiOjYsXCIuLi91dGlsc1wiOjQ0LFwiLi4vdXRpbHMvZG9tVXRpbHNcIjozOSxcIi4uL3V0aWxzL2lzXCI6NDZ9XSwxMzpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4ndXNlIHN0cmljdCc7XG5cbnZhciBpbnRlcmFjdCA9IHJlcXVpcmUoJy4uL2ludGVyYWN0Jyk7XG52YXIgSW50ZXJhY3RhYmxlID0gcmVxdWlyZSgnLi4vSW50ZXJhY3RhYmxlJyk7XG52YXIgSW50ZXJhY3Rpb24gPSByZXF1aXJlKCcuLi9JbnRlcmFjdGlvbicpO1xudmFyIGFjdGlvbnMgPSByZXF1aXJlKCcuLi9hY3Rpb25zL2Jhc2UnKTtcbnZhciBkZWZhdWx0T3B0aW9ucyA9IHJlcXVpcmUoJy4uL2RlZmF1bHRPcHRpb25zJyk7XG52YXIgc2NvcGUgPSByZXF1aXJlKCcuLi9zY29wZScpO1xudmFyIHV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMnKTtcbnZhciBzaWduYWxzID0gcmVxdWlyZSgnLi4vdXRpbHMvU2lnbmFscycpLm5ldygpO1xuXG5yZXF1aXJlKCcuL0ludGVyYWN0YWJsZU1ldGhvZHMnKTtcblxudmFyIGF1dG9TdGFydCA9IHtcbiAgc2lnbmFsczogc2lnbmFscyxcbiAgd2l0aGluSW50ZXJhY3Rpb25MaW1pdDogd2l0aGluSW50ZXJhY3Rpb25MaW1pdCxcbiAgLy8gQWxsb3cgdGhpcyBtYW55IGludGVyYWN0aW9ucyB0byBoYXBwZW4gc2ltdWx0YW5lb3VzbHlcbiAgbWF4SW50ZXJhY3Rpb25zOiBJbmZpbml0eSxcbiAgZGVmYXVsdHM6IHtcbiAgICBwZXJBY3Rpb246IHtcbiAgICAgIG1hbnVhbFN0YXJ0OiBmYWxzZSxcbiAgICAgIG1heDogSW5maW5pdHksXG4gICAgICBtYXhQZXJFbGVtZW50OiAxLFxuICAgICAgYWxsb3dGcm9tOiBudWxsLFxuICAgICAgaWdub3JlRnJvbTogbnVsbCxcblxuICAgICAgLy8gb25seSBhbGxvdyBsZWZ0IGJ1dHRvbiBieSBkZWZhdWx0XG4gICAgICAvLyBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL01vdXNlRXZlbnQvYnV0dG9ucyNSZXR1cm5fdmFsdWVcbiAgICAgIG1vdXNlQnV0dG9uczogMVxuICAgIH1cbiAgfSxcbiAgc2V0QWN0aW9uRGVmYXVsdHM6IGZ1bmN0aW9uIHNldEFjdGlvbkRlZmF1bHRzKGFjdGlvbikge1xuICAgIHV0aWxzLmV4dGVuZChhY3Rpb24uZGVmYXVsdHMsIGF1dG9TdGFydC5kZWZhdWx0cy5wZXJBY3Rpb24pO1xuICB9LFxuICB2YWxpZGF0ZUFjdGlvbjogdmFsaWRhdGVBY3Rpb25cbn07XG5cbi8vIHNldCBjdXJzb3Igc3R5bGUgb24gbW91c2Vkb3duXG5JbnRlcmFjdGlvbi5zaWduYWxzLm9uKCdkb3duJywgZnVuY3Rpb24gKF9yZWYpIHtcbiAgdmFyIGludGVyYWN0aW9uID0gX3JlZi5pbnRlcmFjdGlvbixcbiAgICAgIHBvaW50ZXIgPSBfcmVmLnBvaW50ZXIsXG4gICAgICBldmVudCA9IF9yZWYuZXZlbnQsXG4gICAgICBldmVudFRhcmdldCA9IF9yZWYuZXZlbnRUYXJnZXQ7XG5cbiAgaWYgKGludGVyYWN0aW9uLmludGVyYWN0aW5nKCkpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgYWN0aW9uSW5mbyA9IGdldEFjdGlvbkluZm8oaW50ZXJhY3Rpb24sIHBvaW50ZXIsIGV2ZW50LCBldmVudFRhcmdldCk7XG4gIHByZXBhcmUoaW50ZXJhY3Rpb24sIGFjdGlvbkluZm8pO1xufSk7XG5cbi8vIHNldCBjdXJzb3Igc3R5bGUgb24gbW91c2Vtb3ZlXG5JbnRlcmFjdGlvbi5zaWduYWxzLm9uKCdtb3ZlJywgZnVuY3Rpb24gKF9yZWYyKSB7XG4gIHZhciBpbnRlcmFjdGlvbiA9IF9yZWYyLmludGVyYWN0aW9uLFxuICAgICAgcG9pbnRlciA9IF9yZWYyLnBvaW50ZXIsXG4gICAgICBldmVudCA9IF9yZWYyLmV2ZW50LFxuICAgICAgZXZlbnRUYXJnZXQgPSBfcmVmMi5ldmVudFRhcmdldDtcblxuICBpZiAoaW50ZXJhY3Rpb24ucG9pbnRlclR5cGUgIT09ICdtb3VzZScgfHwgaW50ZXJhY3Rpb24ucG9pbnRlcklzRG93biB8fCBpbnRlcmFjdGlvbi5pbnRlcmFjdGluZygpKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyIGFjdGlvbkluZm8gPSBnZXRBY3Rpb25JbmZvKGludGVyYWN0aW9uLCBwb2ludGVyLCBldmVudCwgZXZlbnRUYXJnZXQpO1xuICBwcmVwYXJlKGludGVyYWN0aW9uLCBhY3Rpb25JbmZvKTtcbn0pO1xuXG5JbnRlcmFjdGlvbi5zaWduYWxzLm9uKCdtb3ZlJywgZnVuY3Rpb24gKGFyZykge1xuICB2YXIgaW50ZXJhY3Rpb24gPSBhcmcuaW50ZXJhY3Rpb24sXG4gICAgICBldmVudCA9IGFyZy5ldmVudDtcblxuXG4gIGlmICghaW50ZXJhY3Rpb24ucG9pbnRlcklzRG93biB8fCBpbnRlcmFjdGlvbi5pbnRlcmFjdGluZygpIHx8ICFpbnRlcmFjdGlvbi5wb2ludGVyV2FzTW92ZWQgfHwgIWludGVyYWN0aW9uLnByZXBhcmVkLm5hbWUpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBzaWduYWxzLmZpcmUoJ2JlZm9yZS1zdGFydCcsIGFyZyk7XG5cbiAgdmFyIHRhcmdldCA9IGludGVyYWN0aW9uLnRhcmdldDtcblxuICBpZiAoaW50ZXJhY3Rpb24ucHJlcGFyZWQubmFtZSAmJiB0YXJnZXQpIHtcbiAgICAvLyBjaGVjayBtYW51YWxTdGFydCBhbmQgaW50ZXJhY3Rpb24gbGltaXRcbiAgICBpZiAodGFyZ2V0Lm9wdGlvbnNbaW50ZXJhY3Rpb24ucHJlcGFyZWQubmFtZV0ubWFudWFsU3RhcnQgfHwgIXdpdGhpbkludGVyYWN0aW9uTGltaXQodGFyZ2V0LCBpbnRlcmFjdGlvbi5lbGVtZW50LCBpbnRlcmFjdGlvbi5wcmVwYXJlZCkpIHtcbiAgICAgIGludGVyYWN0aW9uLnN0b3AoZXZlbnQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpbnRlcmFjdGlvbi5zdGFydChpbnRlcmFjdGlvbi5wcmVwYXJlZCwgdGFyZ2V0LCBpbnRlcmFjdGlvbi5lbGVtZW50KTtcbiAgICB9XG4gIH1cbn0pO1xuXG4vLyBDaGVjayBpZiB0aGUgY3VycmVudCB0YXJnZXQgc3VwcG9ydHMgdGhlIGFjdGlvbi5cbi8vIElmIHNvLCByZXR1cm4gdGhlIHZhbGlkYXRlZCBhY3Rpb24uIE90aGVyd2lzZSwgcmV0dXJuIG51bGxcbmZ1bmN0aW9uIHZhbGlkYXRlQWN0aW9uKGFjdGlvbiwgaW50ZXJhY3RhYmxlLCBlbGVtZW50LCBldmVudFRhcmdldCkge1xuICBpZiAodXRpbHMuaXMub2JqZWN0KGFjdGlvbikgJiYgaW50ZXJhY3RhYmxlLnRlc3RJZ25vcmVBbGxvdyhpbnRlcmFjdGFibGUub3B0aW9uc1thY3Rpb24ubmFtZV0sIGVsZW1lbnQsIGV2ZW50VGFyZ2V0KSAmJiBpbnRlcmFjdGFibGUub3B0aW9uc1thY3Rpb24ubmFtZV0uZW5hYmxlZCAmJiB3aXRoaW5JbnRlcmFjdGlvbkxpbWl0KGludGVyYWN0YWJsZSwgZWxlbWVudCwgYWN0aW9uKSkge1xuICAgIHJldHVybiBhY3Rpb247XG4gIH1cblxuICByZXR1cm4gbnVsbDtcbn1cblxuZnVuY3Rpb24gdmFsaWRhdGVTZWxlY3RvcihpbnRlcmFjdGlvbiwgcG9pbnRlciwgZXZlbnQsIG1hdGNoZXMsIG1hdGNoRWxlbWVudHMsIGV2ZW50VGFyZ2V0KSB7XG4gIGZvciAodmFyIGkgPSAwLCBsZW4gPSBtYXRjaGVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgdmFyIG1hdGNoID0gbWF0Y2hlc1tpXTtcbiAgICB2YXIgbWF0Y2hFbGVtZW50ID0gbWF0Y2hFbGVtZW50c1tpXTtcbiAgICB2YXIgYWN0aW9uID0gdmFsaWRhdGVBY3Rpb24obWF0Y2guZ2V0QWN0aW9uKHBvaW50ZXIsIGV2ZW50LCBpbnRlcmFjdGlvbiwgbWF0Y2hFbGVtZW50KSwgbWF0Y2gsIG1hdGNoRWxlbWVudCwgZXZlbnRUYXJnZXQpO1xuXG4gICAgaWYgKGFjdGlvbikge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgYWN0aW9uOiBhY3Rpb24sXG4gICAgICAgIHRhcmdldDogbWF0Y2gsXG4gICAgICAgIGVsZW1lbnQ6IG1hdGNoRWxlbWVudFxuICAgICAgfTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4ge307XG59XG5cbmZ1bmN0aW9uIGdldEFjdGlvbkluZm8oaW50ZXJhY3Rpb24sIHBvaW50ZXIsIGV2ZW50LCBldmVudFRhcmdldCkge1xuICB2YXIgbWF0Y2hlcyA9IFtdO1xuICB2YXIgbWF0Y2hFbGVtZW50cyA9IFtdO1xuXG4gIHZhciBlbGVtZW50ID0gZXZlbnRUYXJnZXQ7XG5cbiAgZnVuY3Rpb24gcHVzaE1hdGNoZXMoaW50ZXJhY3RhYmxlKSB7XG4gICAgbWF0Y2hlcy5wdXNoKGludGVyYWN0YWJsZSk7XG4gICAgbWF0Y2hFbGVtZW50cy5wdXNoKGVsZW1lbnQpO1xuICB9XG5cbiAgd2hpbGUgKHV0aWxzLmlzLmVsZW1lbnQoZWxlbWVudCkpIHtcbiAgICBtYXRjaGVzID0gW107XG4gICAgbWF0Y2hFbGVtZW50cyA9IFtdO1xuXG4gICAgc2NvcGUuaW50ZXJhY3RhYmxlcy5mb3JFYWNoTWF0Y2goZWxlbWVudCwgcHVzaE1hdGNoZXMpO1xuXG4gICAgdmFyIGFjdGlvbkluZm8gPSB2YWxpZGF0ZVNlbGVjdG9yKGludGVyYWN0aW9uLCBwb2ludGVyLCBldmVudCwgbWF0Y2hlcywgbWF0Y2hFbGVtZW50cywgZXZlbnRUYXJnZXQpO1xuXG4gICAgaWYgKGFjdGlvbkluZm8uYWN0aW9uICYmICFhY3Rpb25JbmZvLnRhcmdldC5vcHRpb25zW2FjdGlvbkluZm8uYWN0aW9uLm5hbWVdLm1hbnVhbFN0YXJ0KSB7XG4gICAgICByZXR1cm4gYWN0aW9uSW5mbztcbiAgICB9XG5cbiAgICBlbGVtZW50ID0gdXRpbHMucGFyZW50Tm9kZShlbGVtZW50KTtcbiAgfVxuXG4gIHJldHVybiB7fTtcbn1cblxuZnVuY3Rpb24gcHJlcGFyZShpbnRlcmFjdGlvbiwgX3JlZjMpIHtcbiAgdmFyIGFjdGlvbiA9IF9yZWYzLmFjdGlvbixcbiAgICAgIHRhcmdldCA9IF9yZWYzLnRhcmdldCxcbiAgICAgIGVsZW1lbnQgPSBfcmVmMy5lbGVtZW50O1xuXG4gIGFjdGlvbiA9IGFjdGlvbiB8fCB7fTtcblxuICBpZiAoaW50ZXJhY3Rpb24udGFyZ2V0ICYmIGludGVyYWN0aW9uLnRhcmdldC5vcHRpb25zLnN0eWxlQ3Vyc29yKSB7XG4gICAgaW50ZXJhY3Rpb24udGFyZ2V0Ll9kb2MuZG9jdW1lbnRFbGVtZW50LnN0eWxlLmN1cnNvciA9ICcnO1xuICB9XG5cbiAgaW50ZXJhY3Rpb24udGFyZ2V0ID0gdGFyZ2V0O1xuICBpbnRlcmFjdGlvbi5lbGVtZW50ID0gZWxlbWVudDtcbiAgdXRpbHMuY29weUFjdGlvbihpbnRlcmFjdGlvbi5wcmVwYXJlZCwgYWN0aW9uKTtcblxuICBpZiAodGFyZ2V0ICYmIHRhcmdldC5vcHRpb25zLnN0eWxlQ3Vyc29yKSB7XG4gICAgdmFyIGN1cnNvciA9IGFjdGlvbiA/IGFjdGlvbnNbYWN0aW9uLm5hbWVdLmdldEN1cnNvcihhY3Rpb24pIDogJyc7XG4gICAgaW50ZXJhY3Rpb24udGFyZ2V0Ll9kb2MuZG9jdW1lbnRFbGVtZW50LnN0eWxlLmN1cnNvciA9IGN1cnNvcjtcbiAgfVxuXG4gIHNpZ25hbHMuZmlyZSgncHJlcGFyZWQnLCB7IGludGVyYWN0aW9uOiBpbnRlcmFjdGlvbiB9KTtcbn1cblxuSW50ZXJhY3Rpb24uc2lnbmFscy5vbignc3RvcCcsIGZ1bmN0aW9uIChfcmVmNCkge1xuICB2YXIgaW50ZXJhY3Rpb24gPSBfcmVmNC5pbnRlcmFjdGlvbjtcblxuICB2YXIgdGFyZ2V0ID0gaW50ZXJhY3Rpb24udGFyZ2V0O1xuXG4gIGlmICh0YXJnZXQgJiYgdGFyZ2V0Lm9wdGlvbnMuc3R5bGVDdXJzb3IpIHtcbiAgICB0YXJnZXQuX2RvYy5kb2N1bWVudEVsZW1lbnQuc3R5bGUuY3Vyc29yID0gJyc7XG4gIH1cbn0pO1xuXG5mdW5jdGlvbiB3aXRoaW5JbnRlcmFjdGlvbkxpbWl0KGludGVyYWN0YWJsZSwgZWxlbWVudCwgYWN0aW9uKSB7XG4gIHZhciBvcHRpb25zID0gaW50ZXJhY3RhYmxlLm9wdGlvbnM7XG4gIHZhciBtYXhBY3Rpb25zID0gb3B0aW9uc1thY3Rpb24ubmFtZV0ubWF4O1xuICB2YXIgbWF4UGVyRWxlbWVudCA9IG9wdGlvbnNbYWN0aW9uLm5hbWVdLm1heFBlckVsZW1lbnQ7XG4gIHZhciBhY3RpdmVJbnRlcmFjdGlvbnMgPSAwO1xuICB2YXIgdGFyZ2V0Q291bnQgPSAwO1xuICB2YXIgdGFyZ2V0RWxlbWVudENvdW50ID0gMDtcblxuICAvLyBubyBhY3Rpb25zIGlmIGFueSBvZiB0aGVzZSB2YWx1ZXMgPT0gMFxuICBpZiAoIShtYXhBY3Rpb25zICYmIG1heFBlckVsZW1lbnQgJiYgYXV0b1N0YXJ0Lm1heEludGVyYWN0aW9ucykpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgc2NvcGUuaW50ZXJhY3Rpb25zLmxlbmd0aDsgX2krKykge1xuICAgIHZhciBfcmVmNTtcblxuICAgIF9yZWY1ID0gc2NvcGUuaW50ZXJhY3Rpb25zW19pXTtcbiAgICB2YXIgaW50ZXJhY3Rpb24gPSBfcmVmNTtcblxuICAgIHZhciBvdGhlckFjdGlvbiA9IGludGVyYWN0aW9uLnByZXBhcmVkLm5hbWU7XG5cbiAgICBpZiAoIWludGVyYWN0aW9uLmludGVyYWN0aW5nKCkpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGFjdGl2ZUludGVyYWN0aW9ucysrO1xuXG4gICAgaWYgKGFjdGl2ZUludGVyYWN0aW9ucyA+PSBhdXRvU3RhcnQubWF4SW50ZXJhY3Rpb25zKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKGludGVyYWN0aW9uLnRhcmdldCAhPT0gaW50ZXJhY3RhYmxlKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICB0YXJnZXRDb3VudCArPSBvdGhlckFjdGlvbiA9PT0gYWN0aW9uLm5hbWUgfCAwO1xuXG4gICAgaWYgKHRhcmdldENvdW50ID49IG1heEFjdGlvbnMpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAoaW50ZXJhY3Rpb24uZWxlbWVudCA9PT0gZWxlbWVudCkge1xuICAgICAgdGFyZ2V0RWxlbWVudENvdW50Kys7XG5cbiAgICAgIGlmIChvdGhlckFjdGlvbiAhPT0gYWN0aW9uLm5hbWUgfHwgdGFyZ2V0RWxlbWVudENvdW50ID49IG1heFBlckVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBhdXRvU3RhcnQubWF4SW50ZXJhY3Rpb25zID4gMDtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIG9yIHNldHMgdGhlIG1heGltdW0gbnVtYmVyIG9mIGNvbmN1cnJlbnQgaW50ZXJhY3Rpb25zIGFsbG93ZWQuICBCeVxuICogZGVmYXVsdCBvbmx5IDEgaW50ZXJhY3Rpb24gaXMgYWxsb3dlZCBhdCBhIHRpbWUgKGZvciBiYWNrd2FyZHNcbiAqIGNvbXBhdGliaWxpdHkpLiBUbyBhbGxvdyBtdWx0aXBsZSBpbnRlcmFjdGlvbnMgb24gdGhlIHNhbWUgSW50ZXJhY3RhYmxlcyBhbmRcbiAqIGVsZW1lbnRzLCB5b3UgbmVlZCB0byBlbmFibGUgaXQgaW4gdGhlIGRyYWdnYWJsZSwgcmVzaXphYmxlIGFuZCBnZXN0dXJhYmxlXG4gKiBgJ21heCdgIGFuZCBgJ21heFBlckVsZW1lbnQnYCBvcHRpb25zLlxuICpcbiAqIEBhbGlhcyBtb2R1bGU6aW50ZXJhY3QubWF4SW50ZXJhY3Rpb25zXG4gKlxuICogQHBhcmFtIHtudW1iZXJ9IFtuZXdWYWx1ZV0gQW55IG51bWJlci4gbmV3VmFsdWUgPD0gMCBtZWFucyBubyBpbnRlcmFjdGlvbnMuXG4gKi9cbmludGVyYWN0Lm1heEludGVyYWN0aW9ucyA9IGZ1bmN0aW9uIChuZXdWYWx1ZSkge1xuICBpZiAodXRpbHMuaXMubnVtYmVyKG5ld1ZhbHVlKSkge1xuICAgIGF1dG9TdGFydC5tYXhJbnRlcmFjdGlvbnMgPSBuZXdWYWx1ZTtcblxuICAgIHJldHVybiBpbnRlcmFjdDtcbiAgfVxuXG4gIHJldHVybiBhdXRvU3RhcnQubWF4SW50ZXJhY3Rpb25zO1xufTtcblxuSW50ZXJhY3RhYmxlLnNldHRpbmdzTWV0aG9kcy5wdXNoKCdzdHlsZUN1cnNvcicpO1xuSW50ZXJhY3RhYmxlLnNldHRpbmdzTWV0aG9kcy5wdXNoKCdhY3Rpb25DaGVja2VyJyk7XG5JbnRlcmFjdGFibGUuc2V0dGluZ3NNZXRob2RzLnB1c2goJ2lnbm9yZUZyb20nKTtcbkludGVyYWN0YWJsZS5zZXR0aW5nc01ldGhvZHMucHVzaCgnYWxsb3dGcm9tJyk7XG5cbmRlZmF1bHRPcHRpb25zLmJhc2UuYWN0aW9uQ2hlY2tlciA9IG51bGw7XG5kZWZhdWx0T3B0aW9ucy5iYXNlLnN0eWxlQ3Vyc29yID0gdHJ1ZTtcblxudXRpbHMuZXh0ZW5kKGRlZmF1bHRPcHRpb25zLnBlckFjdGlvbiwgYXV0b1N0YXJ0LmRlZmF1bHRzLnBlckFjdGlvbik7XG5cbm1vZHVsZS5leHBvcnRzID0gYXV0b1N0YXJ0O1xuXG59LHtcIi4uL0ludGVyYWN0YWJsZVwiOjQsXCIuLi9JbnRlcmFjdGlvblwiOjUsXCIuLi9hY3Rpb25zL2Jhc2VcIjo2LFwiLi4vZGVmYXVsdE9wdGlvbnNcIjoxOCxcIi4uL2ludGVyYWN0XCI6MjEsXCIuLi9zY29wZVwiOjMzLFwiLi4vdXRpbHNcIjo0NCxcIi4uL3V0aWxzL1NpZ25hbHNcIjozNCxcIi4vSW50ZXJhY3RhYmxlTWV0aG9kc1wiOjEyfV0sMTQ6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgYXV0b1N0YXJ0ID0gcmVxdWlyZSgnLi9iYXNlJyk7XG52YXIgc2NvcGUgPSByZXF1aXJlKCcuLi9zY29wZScpO1xudmFyIGlzID0gcmVxdWlyZSgnLi4vdXRpbHMvaXMnKTtcblxudmFyIF9yZXF1aXJlID0gcmVxdWlyZSgnLi4vdXRpbHMvZG9tVXRpbHMnKSxcbiAgICBwYXJlbnROb2RlID0gX3JlcXVpcmUucGFyZW50Tm9kZTtcblxuYXV0b1N0YXJ0LnNldEFjdGlvbkRlZmF1bHRzKHJlcXVpcmUoJy4uL2FjdGlvbnMvZHJhZycpKTtcblxuYXV0b1N0YXJ0LnNpZ25hbHMub24oJ2JlZm9yZS1zdGFydCcsIGZ1bmN0aW9uIChfcmVmKSB7XG4gIHZhciBpbnRlcmFjdGlvbiA9IF9yZWYuaW50ZXJhY3Rpb24sXG4gICAgICBldmVudFRhcmdldCA9IF9yZWYuZXZlbnRUYXJnZXQsXG4gICAgICBkeCA9IF9yZWYuZHgsXG4gICAgICBkeSA9IF9yZWYuZHk7XG5cbiAgaWYgKGludGVyYWN0aW9uLnByZXBhcmVkLm5hbWUgIT09ICdkcmFnJykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIGNoZWNrIGlmIGEgZHJhZyBpcyBpbiB0aGUgY29ycmVjdCBheGlzXG4gIHZhciBhYnNYID0gTWF0aC5hYnMoZHgpO1xuICB2YXIgYWJzWSA9IE1hdGguYWJzKGR5KTtcbiAgdmFyIHRhcmdldE9wdGlvbnMgPSBpbnRlcmFjdGlvbi50YXJnZXQub3B0aW9ucy5kcmFnO1xuICB2YXIgc3RhcnRBeGlzID0gdGFyZ2V0T3B0aW9ucy5zdGFydEF4aXM7XG4gIHZhciBjdXJyZW50QXhpcyA9IGFic1ggPiBhYnNZID8gJ3gnIDogYWJzWCA8IGFic1kgPyAneScgOiAneHknO1xuXG4gIGludGVyYWN0aW9uLnByZXBhcmVkLmF4aXMgPSB0YXJnZXRPcHRpb25zLmxvY2tBeGlzID09PSAnc3RhcnQnID8gY3VycmVudEF4aXNbMF0gLy8gYWx3YXlzIGxvY2sgdG8gb25lIGF4aXMgZXZlbiBpZiBjdXJyZW50QXhpcyA9PT0gJ3h5J1xuICA6IHRhcmdldE9wdGlvbnMubG9ja0F4aXM7XG5cbiAgLy8gaWYgdGhlIG1vdmVtZW50IGlzbid0IGluIHRoZSBzdGFydEF4aXMgb2YgdGhlIGludGVyYWN0YWJsZVxuICBpZiAoY3VycmVudEF4aXMgIT09ICd4eScgJiYgc3RhcnRBeGlzICE9PSAneHknICYmIHN0YXJ0QXhpcyAhPT0gY3VycmVudEF4aXMpIHtcbiAgICAvLyBjYW5jZWwgdGhlIHByZXBhcmVkIGFjdGlvblxuICAgIGludGVyYWN0aW9uLnByZXBhcmVkLm5hbWUgPSBudWxsO1xuXG4gICAgLy8gdGhlbiB0cnkgdG8gZ2V0IGEgZHJhZyBmcm9tIGFub3RoZXIgaW5lcmFjdGFibGVcbiAgICB2YXIgZWxlbWVudCA9IGV2ZW50VGFyZ2V0O1xuXG4gICAgdmFyIGdldERyYWdnYWJsZSA9IGZ1bmN0aW9uIGdldERyYWdnYWJsZShpbnRlcmFjdGFibGUpIHtcbiAgICAgIGlmIChpbnRlcmFjdGFibGUgPT09IGludGVyYWN0aW9uLnRhcmdldCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHZhciBvcHRpb25zID0gaW50ZXJhY3Rpb24udGFyZ2V0Lm9wdGlvbnMuZHJhZztcblxuICAgICAgaWYgKCFvcHRpb25zLm1hbnVhbFN0YXJ0ICYmIGludGVyYWN0YWJsZS50ZXN0SWdub3JlQWxsb3cob3B0aW9ucywgZWxlbWVudCwgZXZlbnRUYXJnZXQpKSB7XG5cbiAgICAgICAgdmFyIGFjdGlvbiA9IGludGVyYWN0YWJsZS5nZXRBY3Rpb24oaW50ZXJhY3Rpb24uZG93blBvaW50ZXIsIGludGVyYWN0aW9uLmRvd25FdmVudCwgaW50ZXJhY3Rpb24sIGVsZW1lbnQpO1xuXG4gICAgICAgIGlmIChhY3Rpb24gJiYgYWN0aW9uLm5hbWUgPT09ICdkcmFnJyAmJiBjaGVja1N0YXJ0QXhpcyhjdXJyZW50QXhpcywgaW50ZXJhY3RhYmxlKSAmJiBhdXRvU3RhcnQudmFsaWRhdGVBY3Rpb24oYWN0aW9uLCBpbnRlcmFjdGFibGUsIGVsZW1lbnQsIGV2ZW50VGFyZ2V0KSkge1xuXG4gICAgICAgICAgcmV0dXJuIGludGVyYWN0YWJsZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICAvLyBjaGVjayBhbGwgaW50ZXJhY3RhYmxlc1xuICAgIHdoaWxlIChpcy5lbGVtZW50KGVsZW1lbnQpKSB7XG4gICAgICB2YXIgaW50ZXJhY3RhYmxlID0gc2NvcGUuaW50ZXJhY3RhYmxlcy5mb3JFYWNoTWF0Y2goZWxlbWVudCwgZ2V0RHJhZ2dhYmxlKTtcblxuICAgICAgaWYgKGludGVyYWN0YWJsZSkge1xuICAgICAgICBpbnRlcmFjdGlvbi5wcmVwYXJlZC5uYW1lID0gJ2RyYWcnO1xuICAgICAgICBpbnRlcmFjdGlvbi50YXJnZXQgPSBpbnRlcmFjdGFibGU7XG4gICAgICAgIGludGVyYWN0aW9uLmVsZW1lbnQgPSBlbGVtZW50O1xuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgZWxlbWVudCA9IHBhcmVudE5vZGUoZWxlbWVudCk7XG4gICAgfVxuICB9XG59KTtcblxuZnVuY3Rpb24gY2hlY2tTdGFydEF4aXMoc3RhcnRBeGlzLCBpbnRlcmFjdGFibGUpIHtcbiAgaWYgKCFpbnRlcmFjdGFibGUpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICB2YXIgdGhpc0F4aXMgPSBpbnRlcmFjdGFibGUub3B0aW9ucy5kcmFnLnN0YXJ0QXhpcztcblxuICByZXR1cm4gc3RhcnRBeGlzID09PSAneHknIHx8IHRoaXNBeGlzID09PSAneHknIHx8IHRoaXNBeGlzID09PSBzdGFydEF4aXM7XG59XG5cbn0se1wiLi4vYWN0aW9ucy9kcmFnXCI6NyxcIi4uL3Njb3BlXCI6MzMsXCIuLi91dGlscy9kb21VdGlsc1wiOjM5LFwiLi4vdXRpbHMvaXNcIjo0NixcIi4vYmFzZVwiOjEzfV0sMTU6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG5yZXF1aXJlKCcuL2Jhc2UnKS5zZXRBY3Rpb25EZWZhdWx0cyhyZXF1aXJlKCcuLi9hY3Rpb25zL2dlc3R1cmUnKSk7XG5cbn0se1wiLi4vYWN0aW9ucy9nZXN0dXJlXCI6OSxcIi4vYmFzZVwiOjEzfV0sMTY6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgYXV0b1N0YXJ0ID0gcmVxdWlyZSgnLi9iYXNlJyk7XG52YXIgSW50ZXJhY3Rpb24gPSByZXF1aXJlKCcuLi9JbnRlcmFjdGlvbicpO1xuXG5hdXRvU3RhcnQuZGVmYXVsdHMucGVyQWN0aW9uLmhvbGQgPSAwO1xuYXV0b1N0YXJ0LmRlZmF1bHRzLnBlckFjdGlvbi5kZWxheSA9IDA7XG5cbkludGVyYWN0aW9uLnNpZ25hbHMub24oJ25ldycsIGZ1bmN0aW9uIChpbnRlcmFjdGlvbikge1xuICBpbnRlcmFjdGlvbi5hdXRvU3RhcnRIb2xkVGltZXIgPSBudWxsO1xufSk7XG5cbmF1dG9TdGFydC5zaWduYWxzLm9uKCdwcmVwYXJlZCcsIGZ1bmN0aW9uIChfcmVmKSB7XG4gIHZhciBpbnRlcmFjdGlvbiA9IF9yZWYuaW50ZXJhY3Rpb247XG5cbiAgdmFyIGhvbGQgPSBnZXRIb2xkRHVyYXRpb24oaW50ZXJhY3Rpb24pO1xuXG4gIGlmIChob2xkID4gMCkge1xuICAgIGludGVyYWN0aW9uLmF1dG9TdGFydEhvbGRUaW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgaW50ZXJhY3Rpb24uc3RhcnQoaW50ZXJhY3Rpb24ucHJlcGFyZWQsIGludGVyYWN0aW9uLnRhcmdldCwgaW50ZXJhY3Rpb24uZWxlbWVudCk7XG4gICAgfSwgaG9sZCk7XG4gIH1cbn0pO1xuXG5JbnRlcmFjdGlvbi5zaWduYWxzLm9uKCdtb3ZlJywgZnVuY3Rpb24gKF9yZWYyKSB7XG4gIHZhciBpbnRlcmFjdGlvbiA9IF9yZWYyLmludGVyYWN0aW9uLFxuICAgICAgZHVwbGljYXRlID0gX3JlZjIuZHVwbGljYXRlO1xuXG4gIGlmIChpbnRlcmFjdGlvbi5wb2ludGVyV2FzTW92ZWQgJiYgIWR1cGxpY2F0ZSkge1xuICAgIGNsZWFyVGltZW91dChpbnRlcmFjdGlvbi5hdXRvU3RhcnRIb2xkVGltZXIpO1xuICB9XG59KTtcblxuLy8gcHJldmVudCByZWd1bGFyIGRvd24tPm1vdmUgYXV0b1N0YXJ0XG5hdXRvU3RhcnQuc2lnbmFscy5vbignYmVmb3JlLXN0YXJ0JywgZnVuY3Rpb24gKF9yZWYzKSB7XG4gIHZhciBpbnRlcmFjdGlvbiA9IF9yZWYzLmludGVyYWN0aW9uO1xuXG4gIHZhciBob2xkID0gZ2V0SG9sZER1cmF0aW9uKGludGVyYWN0aW9uKTtcblxuICBpZiAoaG9sZCA+IDApIHtcbiAgICBpbnRlcmFjdGlvbi5wcmVwYXJlZC5uYW1lID0gbnVsbDtcbiAgfVxufSk7XG5cbmZ1bmN0aW9uIGdldEhvbGREdXJhdGlvbihpbnRlcmFjdGlvbikge1xuICB2YXIgYWN0aW9uTmFtZSA9IGludGVyYWN0aW9uLnByZXBhcmVkICYmIGludGVyYWN0aW9uLnByZXBhcmVkLm5hbWU7XG5cbiAgaWYgKCFhY3Rpb25OYW1lKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICB2YXIgb3B0aW9ucyA9IGludGVyYWN0aW9uLnRhcmdldC5vcHRpb25zO1xuXG4gIHJldHVybiBvcHRpb25zW2FjdGlvbk5hbWVdLmhvbGQgfHwgb3B0aW9uc1thY3Rpb25OYW1lXS5kZWxheTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGdldEhvbGREdXJhdGlvbjogZ2V0SG9sZER1cmF0aW9uXG59O1xuXG59LHtcIi4uL0ludGVyYWN0aW9uXCI6NSxcIi4vYmFzZVwiOjEzfV0sMTc6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG5yZXF1aXJlKCcuL2Jhc2UnKS5zZXRBY3Rpb25EZWZhdWx0cyhyZXF1aXJlKCcuLi9hY3Rpb25zL3Jlc2l6ZScpKTtcblxufSx7XCIuLi9hY3Rpb25zL3Jlc2l6ZVwiOjEwLFwiLi9iYXNlXCI6MTN9XSwxODpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBiYXNlOiB7XG4gICAgYWNjZXB0OiBudWxsLFxuICAgIHByZXZlbnREZWZhdWx0OiAnYXV0bycsXG4gICAgZGVsdGFTb3VyY2U6ICdwYWdlJ1xuICB9LFxuXG4gIHBlckFjdGlvbjoge1xuICAgIG9yaWdpbjogeyB4OiAwLCB5OiAwIH0sXG5cbiAgICBpbmVydGlhOiB7XG4gICAgICBlbmFibGVkOiBmYWxzZSxcbiAgICAgIHJlc2lzdGFuY2U6IDEwLCAvLyB0aGUgbGFtYmRhIGluIGV4cG9uZW50aWFsIGRlY2F5XG4gICAgICBtaW5TcGVlZDogMTAwLCAvLyB0YXJnZXQgc3BlZWQgbXVzdCBiZSBhYm92ZSB0aGlzIGZvciBpbmVydGlhIHRvIHN0YXJ0XG4gICAgICBlbmRTcGVlZDogMTAsIC8vIHRoZSBzcGVlZCBhdCB3aGljaCBpbmVydGlhIGlzIHNsb3cgZW5vdWdoIHRvIHN0b3BcbiAgICAgIGFsbG93UmVzdW1lOiB0cnVlLCAvLyBhbGxvdyByZXN1bWluZyBhbiBhY3Rpb24gaW4gaW5lcnRpYSBwaGFzZVxuICAgICAgc21vb3RoRW5kRHVyYXRpb246IDMwMCAvLyBhbmltYXRlIHRvIHNuYXAvcmVzdHJpY3QgZW5kT25seSBpZiB0aGVyZSdzIG5vIGluZXJ0aWFcbiAgICB9XG4gIH1cbn07XG5cbn0se31dLDE5OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbid1c2Ugc3RyaWN0JztcblxuLyogYnJvd3NlciBlbnRyeSBwb2ludCAqL1xuXG4vLyBpbmVydGlhXG5yZXF1aXJlKCcuL2luZXJ0aWEnKTtcblxuLy8gbW9kaWZpZXJzXG5yZXF1aXJlKCcuL21vZGlmaWVycy9zbmFwJyk7XG5yZXF1aXJlKCcuL21vZGlmaWVycy9yZXN0cmljdCcpO1xuXG4vLyBwb2ludGVyRXZlbnRzXG5yZXF1aXJlKCcuL3BvaW50ZXJFdmVudHMvYmFzZScpO1xucmVxdWlyZSgnLi9wb2ludGVyRXZlbnRzL2hvbGRSZXBlYXQnKTtcbnJlcXVpcmUoJy4vcG9pbnRlckV2ZW50cy9pbnRlcmFjdGFibGVUYXJnZXRzJyk7XG5cbi8vIGF1dG9TdGFydCBob2xkXG5yZXF1aXJlKCcuL2F1dG9TdGFydC9ob2xkJyk7XG5cbi8vIGFjdGlvbnNcbnJlcXVpcmUoJy4vYWN0aW9ucy9nZXN0dXJlJyk7XG5yZXF1aXJlKCcuL2FjdGlvbnMvcmVzaXplJyk7XG5yZXF1aXJlKCcuL2FjdGlvbnMvZHJhZycpO1xucmVxdWlyZSgnLi9hY3Rpb25zL2Ryb3AnKTtcblxuLy8gbG9hZCB0aGVzZSBtb2RpZmllcnMgYWZ0ZXIgcmVzaXplIGlzIGxvYWRlZFxucmVxdWlyZSgnLi9tb2RpZmllcnMvc25hcFNpemUnKTtcbnJlcXVpcmUoJy4vbW9kaWZpZXJzL3Jlc3RyaWN0RWRnZXMnKTtcbnJlcXVpcmUoJy4vbW9kaWZpZXJzL3Jlc3RyaWN0U2l6ZScpO1xuXG4vLyBhdXRvU3RhcnQgYWN0aW9uc1xucmVxdWlyZSgnLi9hdXRvU3RhcnQvZ2VzdHVyZScpO1xucmVxdWlyZSgnLi9hdXRvU3RhcnQvcmVzaXplJyk7XG5yZXF1aXJlKCcuL2F1dG9TdGFydC9kcmFnJyk7XG5cbi8vIEludGVyYWN0YWJsZSBwcmV2ZW50RGVmYXVsdCBzZXR0aW5nXG5yZXF1aXJlKCcuL2ludGVyYWN0YWJsZVByZXZlbnREZWZhdWx0LmpzJyk7XG5cbi8vIGF1dG9TY3JvbGxcbnJlcXVpcmUoJy4vYXV0b1Njcm9sbCcpO1xuXG4vLyBleHBvcnQgaW50ZXJhY3Rcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9pbnRlcmFjdCcpO1xuXG59LHtcIi4vYWN0aW9ucy9kcmFnXCI6NyxcIi4vYWN0aW9ucy9kcm9wXCI6OCxcIi4vYWN0aW9ucy9nZXN0dXJlXCI6OSxcIi4vYWN0aW9ucy9yZXNpemVcIjoxMCxcIi4vYXV0b1Njcm9sbFwiOjExLFwiLi9hdXRvU3RhcnQvZHJhZ1wiOjE0LFwiLi9hdXRvU3RhcnQvZ2VzdHVyZVwiOjE1LFwiLi9hdXRvU3RhcnQvaG9sZFwiOjE2LFwiLi9hdXRvU3RhcnQvcmVzaXplXCI6MTcsXCIuL2luZXJ0aWFcIjoyMCxcIi4vaW50ZXJhY3RcIjoyMSxcIi4vaW50ZXJhY3RhYmxlUHJldmVudERlZmF1bHQuanNcIjoyMixcIi4vbW9kaWZpZXJzL3Jlc3RyaWN0XCI6MjQsXCIuL21vZGlmaWVycy9yZXN0cmljdEVkZ2VzXCI6MjUsXCIuL21vZGlmaWVycy9yZXN0cmljdFNpemVcIjoyNixcIi4vbW9kaWZpZXJzL3NuYXBcIjoyNyxcIi4vbW9kaWZpZXJzL3NuYXBTaXplXCI6MjgsXCIuL3BvaW50ZXJFdmVudHMvYmFzZVwiOjMwLFwiLi9wb2ludGVyRXZlbnRzL2hvbGRSZXBlYXRcIjozMSxcIi4vcG9pbnRlckV2ZW50cy9pbnRlcmFjdGFibGVUYXJnZXRzXCI6MzJ9XSwyMDpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4ndXNlIHN0cmljdCc7XG5cbnZhciBJbnRlcmFjdEV2ZW50ID0gcmVxdWlyZSgnLi9JbnRlcmFjdEV2ZW50Jyk7XG52YXIgSW50ZXJhY3Rpb24gPSByZXF1aXJlKCcuL0ludGVyYWN0aW9uJyk7XG52YXIgbW9kaWZpZXJzID0gcmVxdWlyZSgnLi9tb2RpZmllcnMvYmFzZScpO1xudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xudmFyIGFuaW1hdGlvbkZyYW1lID0gcmVxdWlyZSgnLi91dGlscy9yYWYnKTtcblxuSW50ZXJhY3Rpb24uc2lnbmFscy5vbignbmV3JywgZnVuY3Rpb24gKGludGVyYWN0aW9uKSB7XG4gIGludGVyYWN0aW9uLmluZXJ0aWFTdGF0dXMgPSB7XG4gICAgYWN0aXZlOiBmYWxzZSxcbiAgICBzbW9vdGhFbmQ6IGZhbHNlLFxuICAgIGFsbG93UmVzdW1lOiBmYWxzZSxcblxuICAgIHN0YXJ0RXZlbnQ6IG51bGwsXG4gICAgdXBDb29yZHM6IHt9LFxuXG4gICAgeGU6IDAsIHllOiAwLFxuICAgIHN4OiAwLCBzeTogMCxcblxuICAgIHQwOiAwLFxuICAgIHZ4MDogMCwgdnlzOiAwLFxuICAgIGR1cmF0aW9uOiAwLFxuXG4gICAgbGFtYmRhX3YwOiAwLFxuICAgIG9uZV92ZV92MDogMCxcbiAgICBpOiBudWxsXG4gIH07XG5cbiAgaW50ZXJhY3Rpb24uYm91bmRJbmVydGlhRnJhbWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGluZXJ0aWFGcmFtZS5hcHBseShpbnRlcmFjdGlvbik7XG4gIH07XG4gIGludGVyYWN0aW9uLmJvdW5kU21vb3RoRW5kRnJhbWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHNtb290aEVuZEZyYW1lLmFwcGx5KGludGVyYWN0aW9uKTtcbiAgfTtcbn0pO1xuXG5JbnRlcmFjdGlvbi5zaWduYWxzLm9uKCdkb3duJywgZnVuY3Rpb24gKF9yZWYpIHtcbiAgdmFyIGludGVyYWN0aW9uID0gX3JlZi5pbnRlcmFjdGlvbixcbiAgICAgIGV2ZW50ID0gX3JlZi5ldmVudCxcbiAgICAgIHBvaW50ZXIgPSBfcmVmLnBvaW50ZXIsXG4gICAgICBldmVudFRhcmdldCA9IF9yZWYuZXZlbnRUYXJnZXQ7XG5cbiAgdmFyIHN0YXR1cyA9IGludGVyYWN0aW9uLmluZXJ0aWFTdGF0dXM7XG5cbiAgLy8gQ2hlY2sgaWYgdGhlIGRvd24gZXZlbnQgaGl0cyB0aGUgY3VycmVudCBpbmVydGlhIHRhcmdldFxuICBpZiAoc3RhdHVzLmFjdGl2ZSkge1xuICAgIHZhciBlbGVtZW50ID0gZXZlbnRUYXJnZXQ7XG5cbiAgICAvLyBjbGltYiB1cCB0aGUgRE9NIHRyZWUgZnJvbSB0aGUgZXZlbnQgdGFyZ2V0XG4gICAgd2hpbGUgKHV0aWxzLmlzLmVsZW1lbnQoZWxlbWVudCkpIHtcblxuICAgICAgLy8gaWYgaW50ZXJhY3Rpb24gZWxlbWVudCBpcyB0aGUgY3VycmVudCBpbmVydGlhIHRhcmdldCBlbGVtZW50XG4gICAgICBpZiAoZWxlbWVudCA9PT0gaW50ZXJhY3Rpb24uZWxlbWVudCkge1xuICAgICAgICAvLyBzdG9wIGluZXJ0aWFcbiAgICAgICAgYW5pbWF0aW9uRnJhbWUuY2FuY2VsKHN0YXR1cy5pKTtcbiAgICAgICAgc3RhdHVzLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICBpbnRlcmFjdGlvbi5zaW11bGF0aW9uID0gbnVsbDtcblxuICAgICAgICAvLyB1cGRhdGUgcG9pbnRlcnMgdG8gdGhlIGRvd24gZXZlbnQncyBjb29yZGluYXRlc1xuICAgICAgICBpbnRlcmFjdGlvbi51cGRhdGVQb2ludGVyKHBvaW50ZXIpO1xuICAgICAgICB1dGlscy5zZXRDb29yZHMoaW50ZXJhY3Rpb24uY3VyQ29vcmRzLCBpbnRlcmFjdGlvbi5wb2ludGVycyk7XG5cbiAgICAgICAgLy8gZmlyZSBhcHByb3ByaWF0ZSBzaWduYWxzXG4gICAgICAgIHZhciBzaWduYWxBcmcgPSB7IGludGVyYWN0aW9uOiBpbnRlcmFjdGlvbiB9O1xuICAgICAgICBJbnRlcmFjdGlvbi5zaWduYWxzLmZpcmUoJ2JlZm9yZS1hY3Rpb24tbW92ZScsIHNpZ25hbEFyZyk7XG4gICAgICAgIEludGVyYWN0aW9uLnNpZ25hbHMuZmlyZSgnYWN0aW9uLXJlc3VtZScsIHNpZ25hbEFyZyk7XG5cbiAgICAgICAgLy8gZmlyZSBhIHJldW1lIGV2ZW50XG4gICAgICAgIHZhciByZXN1bWVFdmVudCA9IG5ldyBJbnRlcmFjdEV2ZW50KGludGVyYWN0aW9uLCBldmVudCwgaW50ZXJhY3Rpb24ucHJlcGFyZWQubmFtZSwgJ2luZXJ0aWFyZXN1bWUnLCBpbnRlcmFjdGlvbi5lbGVtZW50KTtcblxuICAgICAgICBpbnRlcmFjdGlvbi50YXJnZXQuZmlyZShyZXN1bWVFdmVudCk7XG4gICAgICAgIGludGVyYWN0aW9uLnByZXZFdmVudCA9IHJlc3VtZUV2ZW50O1xuICAgICAgICBtb2RpZmllcnMucmVzZXRTdGF0dXNlcyhpbnRlcmFjdGlvbi5tb2RpZmllclN0YXR1c2VzKTtcblxuICAgICAgICB1dGlscy5jb3B5Q29vcmRzKGludGVyYWN0aW9uLnByZXZDb29yZHMsIGludGVyYWN0aW9uLmN1ckNvb3Jkcyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBlbGVtZW50ID0gdXRpbHMucGFyZW50Tm9kZShlbGVtZW50KTtcbiAgICB9XG4gIH1cbn0pO1xuXG5JbnRlcmFjdGlvbi5zaWduYWxzLm9uKCd1cCcsIGZ1bmN0aW9uIChfcmVmMikge1xuICB2YXIgaW50ZXJhY3Rpb24gPSBfcmVmMi5pbnRlcmFjdGlvbixcbiAgICAgIGV2ZW50ID0gX3JlZjIuZXZlbnQ7XG5cbiAgdmFyIHN0YXR1cyA9IGludGVyYWN0aW9uLmluZXJ0aWFTdGF0dXM7XG5cbiAgaWYgKCFpbnRlcmFjdGlvbi5pbnRlcmFjdGluZygpIHx8IHN0YXR1cy5hY3RpdmUpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgdGFyZ2V0ID0gaW50ZXJhY3Rpb24udGFyZ2V0O1xuICB2YXIgb3B0aW9ucyA9IHRhcmdldCAmJiB0YXJnZXQub3B0aW9ucztcbiAgdmFyIGluZXJ0aWFPcHRpb25zID0gb3B0aW9ucyAmJiBpbnRlcmFjdGlvbi5wcmVwYXJlZC5uYW1lICYmIG9wdGlvbnNbaW50ZXJhY3Rpb24ucHJlcGFyZWQubmFtZV0uaW5lcnRpYTtcblxuICB2YXIgbm93ID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gIHZhciBzdGF0dXNlcyA9IHt9O1xuICB2YXIgcGFnZSA9IHV0aWxzLmV4dGVuZCh7fSwgaW50ZXJhY3Rpb24uY3VyQ29vcmRzLnBhZ2UpO1xuICB2YXIgcG9pbnRlclNwZWVkID0gaW50ZXJhY3Rpb24ucG9pbnRlckRlbHRhLmNsaWVudC5zcGVlZDtcblxuICB2YXIgc21vb3RoRW5kID0gZmFsc2U7XG4gIHZhciBtb2RpZmllclJlc3VsdCA9IHZvaWQgMDtcblxuICAvLyBjaGVjayBpZiBpbmVydGlhIHNob3VsZCBiZSBzdGFydGVkXG4gIHZhciBpbmVydGlhUG9zc2libGUgPSBpbmVydGlhT3B0aW9ucyAmJiBpbmVydGlhT3B0aW9ucy5lbmFibGVkICYmIGludGVyYWN0aW9uLnByZXBhcmVkLm5hbWUgIT09ICdnZXN0dXJlJyAmJiBldmVudCAhPT0gc3RhdHVzLnN0YXJ0RXZlbnQ7XG5cbiAgdmFyIGluZXJ0aWEgPSBpbmVydGlhUG9zc2libGUgJiYgbm93IC0gaW50ZXJhY3Rpb24uY3VyQ29vcmRzLnRpbWVTdGFtcCA8IDUwICYmIHBvaW50ZXJTcGVlZCA+IGluZXJ0aWFPcHRpb25zLm1pblNwZWVkICYmIHBvaW50ZXJTcGVlZCA+IGluZXJ0aWFPcHRpb25zLmVuZFNwZWVkO1xuXG4gIHZhciBtb2RpZmllckFyZyA9IHtcbiAgICBpbnRlcmFjdGlvbjogaW50ZXJhY3Rpb24sXG4gICAgcGFnZUNvb3JkczogcGFnZSxcbiAgICBzdGF0dXNlczogc3RhdHVzZXMsXG4gICAgcHJlRW5kOiB0cnVlLFxuICAgIHJlcXVpcmVFbmRPbmx5OiB0cnVlXG4gIH07XG5cbiAgLy8gc21vb3RoRW5kXG4gIGlmIChpbmVydGlhUG9zc2libGUgJiYgIWluZXJ0aWEpIHtcbiAgICBtb2RpZmllcnMucmVzZXRTdGF0dXNlcyhzdGF0dXNlcyk7XG5cbiAgICBtb2RpZmllclJlc3VsdCA9IG1vZGlmaWVycy5zZXRBbGwobW9kaWZpZXJBcmcpO1xuXG4gICAgaWYgKG1vZGlmaWVyUmVzdWx0LnNob3VsZE1vdmUgJiYgbW9kaWZpZXJSZXN1bHQubG9ja2VkKSB7XG4gICAgICBzbW9vdGhFbmQgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIGlmICghKGluZXJ0aWEgfHwgc21vb3RoRW5kKSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHV0aWxzLmNvcHlDb29yZHMoc3RhdHVzLnVwQ29vcmRzLCBpbnRlcmFjdGlvbi5jdXJDb29yZHMpO1xuXG4gIGludGVyYWN0aW9uLnBvaW50ZXJzWzBdID0gc3RhdHVzLnN0YXJ0RXZlbnQgPSBuZXcgSW50ZXJhY3RFdmVudChpbnRlcmFjdGlvbiwgZXZlbnQsIGludGVyYWN0aW9uLnByZXBhcmVkLm5hbWUsICdpbmVydGlhc3RhcnQnLCBpbnRlcmFjdGlvbi5lbGVtZW50KTtcblxuICBzdGF0dXMudDAgPSBub3c7XG5cbiAgc3RhdHVzLmFjdGl2ZSA9IHRydWU7XG4gIHN0YXR1cy5hbGxvd1Jlc3VtZSA9IGluZXJ0aWFPcHRpb25zLmFsbG93UmVzdW1lO1xuICBpbnRlcmFjdGlvbi5zaW11bGF0aW9uID0gc3RhdHVzO1xuXG4gIHRhcmdldC5maXJlKHN0YXR1cy5zdGFydEV2ZW50KTtcblxuICBpZiAoaW5lcnRpYSkge1xuICAgIHN0YXR1cy52eDAgPSBpbnRlcmFjdGlvbi5wb2ludGVyRGVsdGEuY2xpZW50LnZ4O1xuICAgIHN0YXR1cy52eTAgPSBpbnRlcmFjdGlvbi5wb2ludGVyRGVsdGEuY2xpZW50LnZ5O1xuICAgIHN0YXR1cy52MCA9IHBvaW50ZXJTcGVlZDtcblxuICAgIGNhbGNJbmVydGlhKGludGVyYWN0aW9uLCBzdGF0dXMpO1xuXG4gICAgdXRpbHMuZXh0ZW5kKHBhZ2UsIGludGVyYWN0aW9uLmN1ckNvb3Jkcy5wYWdlKTtcblxuICAgIHBhZ2UueCArPSBzdGF0dXMueGU7XG4gICAgcGFnZS55ICs9IHN0YXR1cy55ZTtcblxuICAgIG1vZGlmaWVycy5yZXNldFN0YXR1c2VzKHN0YXR1c2VzKTtcblxuICAgIG1vZGlmaWVyUmVzdWx0ID0gbW9kaWZpZXJzLnNldEFsbChtb2RpZmllckFyZyk7XG5cbiAgICBzdGF0dXMubW9kaWZpZWRYZSArPSBtb2RpZmllclJlc3VsdC5keDtcbiAgICBzdGF0dXMubW9kaWZpZWRZZSArPSBtb2RpZmllclJlc3VsdC5keTtcblxuICAgIHN0YXR1cy5pID0gYW5pbWF0aW9uRnJhbWUucmVxdWVzdChpbnRlcmFjdGlvbi5ib3VuZEluZXJ0aWFGcmFtZSk7XG4gIH0gZWxzZSB7XG4gICAgc3RhdHVzLnNtb290aEVuZCA9IHRydWU7XG4gICAgc3RhdHVzLnhlID0gbW9kaWZpZXJSZXN1bHQuZHg7XG4gICAgc3RhdHVzLnllID0gbW9kaWZpZXJSZXN1bHQuZHk7XG5cbiAgICBzdGF0dXMuc3ggPSBzdGF0dXMuc3kgPSAwO1xuXG4gICAgc3RhdHVzLmkgPSBhbmltYXRpb25GcmFtZS5yZXF1ZXN0KGludGVyYWN0aW9uLmJvdW5kU21vb3RoRW5kRnJhbWUpO1xuICB9XG59KTtcblxuSW50ZXJhY3Rpb24uc2lnbmFscy5vbignc3RvcC1hY3RpdmUnLCBmdW5jdGlvbiAoX3JlZjMpIHtcbiAgdmFyIGludGVyYWN0aW9uID0gX3JlZjMuaW50ZXJhY3Rpb247XG5cbiAgdmFyIHN0YXR1cyA9IGludGVyYWN0aW9uLmluZXJ0aWFTdGF0dXM7XG5cbiAgaWYgKHN0YXR1cy5hY3RpdmUpIHtcbiAgICBhbmltYXRpb25GcmFtZS5jYW5jZWwoc3RhdHVzLmkpO1xuICAgIHN0YXR1cy5hY3RpdmUgPSBmYWxzZTtcbiAgICBpbnRlcmFjdGlvbi5zaW11bGF0aW9uID0gbnVsbDtcbiAgfVxufSk7XG5cbmZ1bmN0aW9uIGNhbGNJbmVydGlhKGludGVyYWN0aW9uLCBzdGF0dXMpIHtcbiAgdmFyIGluZXJ0aWFPcHRpb25zID0gaW50ZXJhY3Rpb24udGFyZ2V0Lm9wdGlvbnNbaW50ZXJhY3Rpb24ucHJlcGFyZWQubmFtZV0uaW5lcnRpYTtcbiAgdmFyIGxhbWJkYSA9IGluZXJ0aWFPcHRpb25zLnJlc2lzdGFuY2U7XG4gIHZhciBpbmVydGlhRHVyID0gLU1hdGgubG9nKGluZXJ0aWFPcHRpb25zLmVuZFNwZWVkIC8gc3RhdHVzLnYwKSAvIGxhbWJkYTtcblxuICBzdGF0dXMueDAgPSBpbnRlcmFjdGlvbi5wcmV2RXZlbnQucGFnZVg7XG4gIHN0YXR1cy55MCA9IGludGVyYWN0aW9uLnByZXZFdmVudC5wYWdlWTtcbiAgc3RhdHVzLnQwID0gc3RhdHVzLnN0YXJ0RXZlbnQudGltZVN0YW1wIC8gMTAwMDtcbiAgc3RhdHVzLnN4ID0gc3RhdHVzLnN5ID0gMDtcblxuICBzdGF0dXMubW9kaWZpZWRYZSA9IHN0YXR1cy54ZSA9IChzdGF0dXMudngwIC0gaW5lcnRpYUR1cikgLyBsYW1iZGE7XG4gIHN0YXR1cy5tb2RpZmllZFllID0gc3RhdHVzLnllID0gKHN0YXR1cy52eTAgLSBpbmVydGlhRHVyKSAvIGxhbWJkYTtcbiAgc3RhdHVzLnRlID0gaW5lcnRpYUR1cjtcblxuICBzdGF0dXMubGFtYmRhX3YwID0gbGFtYmRhIC8gc3RhdHVzLnYwO1xuICBzdGF0dXMub25lX3ZlX3YwID0gMSAtIGluZXJ0aWFPcHRpb25zLmVuZFNwZWVkIC8gc3RhdHVzLnYwO1xufVxuXG5mdW5jdGlvbiBpbmVydGlhRnJhbWUoKSB7XG4gIHVwZGF0ZUluZXJ0aWFDb29yZHModGhpcyk7XG4gIHV0aWxzLnNldENvb3JkRGVsdGFzKHRoaXMucG9pbnRlckRlbHRhLCB0aGlzLnByZXZDb29yZHMsIHRoaXMuY3VyQ29vcmRzKTtcblxuICB2YXIgc3RhdHVzID0gdGhpcy5pbmVydGlhU3RhdHVzO1xuICB2YXIgb3B0aW9ucyA9IHRoaXMudGFyZ2V0Lm9wdGlvbnNbdGhpcy5wcmVwYXJlZC5uYW1lXS5pbmVydGlhO1xuICB2YXIgbGFtYmRhID0gb3B0aW9ucy5yZXNpc3RhbmNlO1xuICB2YXIgdCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpIC8gMTAwMCAtIHN0YXR1cy50MDtcblxuICBpZiAodCA8IHN0YXR1cy50ZSkge1xuXG4gICAgdmFyIHByb2dyZXNzID0gMSAtIChNYXRoLmV4cCgtbGFtYmRhICogdCkgLSBzdGF0dXMubGFtYmRhX3YwKSAvIHN0YXR1cy5vbmVfdmVfdjA7XG5cbiAgICBpZiAoc3RhdHVzLm1vZGlmaWVkWGUgPT09IHN0YXR1cy54ZSAmJiBzdGF0dXMubW9kaWZpZWRZZSA9PT0gc3RhdHVzLnllKSB7XG4gICAgICBzdGF0dXMuc3ggPSBzdGF0dXMueGUgKiBwcm9ncmVzcztcbiAgICAgIHN0YXR1cy5zeSA9IHN0YXR1cy55ZSAqIHByb2dyZXNzO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgcXVhZFBvaW50ID0gdXRpbHMuZ2V0UXVhZHJhdGljQ3VydmVQb2ludCgwLCAwLCBzdGF0dXMueGUsIHN0YXR1cy55ZSwgc3RhdHVzLm1vZGlmaWVkWGUsIHN0YXR1cy5tb2RpZmllZFllLCBwcm9ncmVzcyk7XG5cbiAgICAgIHN0YXR1cy5zeCA9IHF1YWRQb2ludC54O1xuICAgICAgc3RhdHVzLnN5ID0gcXVhZFBvaW50Lnk7XG4gICAgfVxuXG4gICAgdGhpcy5kb01vdmUoKTtcblxuICAgIHN0YXR1cy5pID0gYW5pbWF0aW9uRnJhbWUucmVxdWVzdCh0aGlzLmJvdW5kSW5lcnRpYUZyYW1lKTtcbiAgfSBlbHNlIHtcbiAgICBzdGF0dXMuc3ggPSBzdGF0dXMubW9kaWZpZWRYZTtcbiAgICBzdGF0dXMuc3kgPSBzdGF0dXMubW9kaWZpZWRZZTtcblxuICAgIHRoaXMuZG9Nb3ZlKCk7XG4gICAgdGhpcy5lbmQoc3RhdHVzLnN0YXJ0RXZlbnQpO1xuICAgIHN0YXR1cy5hY3RpdmUgPSBmYWxzZTtcbiAgICB0aGlzLnNpbXVsYXRpb24gPSBudWxsO1xuICB9XG5cbiAgdXRpbHMuY29weUNvb3Jkcyh0aGlzLnByZXZDb29yZHMsIHRoaXMuY3VyQ29vcmRzKTtcbn1cblxuZnVuY3Rpb24gc21vb3RoRW5kRnJhbWUoKSB7XG4gIHVwZGF0ZUluZXJ0aWFDb29yZHModGhpcyk7XG5cbiAgdmFyIHN0YXR1cyA9IHRoaXMuaW5lcnRpYVN0YXR1cztcbiAgdmFyIHQgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKSAtIHN0YXR1cy50MDtcbiAgdmFyIGR1cmF0aW9uID0gdGhpcy50YXJnZXQub3B0aW9uc1t0aGlzLnByZXBhcmVkLm5hbWVdLmluZXJ0aWEuc21vb3RoRW5kRHVyYXRpb247XG5cbiAgaWYgKHQgPCBkdXJhdGlvbikge1xuICAgIHN0YXR1cy5zeCA9IHV0aWxzLmVhc2VPdXRRdWFkKHQsIDAsIHN0YXR1cy54ZSwgZHVyYXRpb24pO1xuICAgIHN0YXR1cy5zeSA9IHV0aWxzLmVhc2VPdXRRdWFkKHQsIDAsIHN0YXR1cy55ZSwgZHVyYXRpb24pO1xuXG4gICAgdGhpcy5wb2ludGVyTW92ZShzdGF0dXMuc3RhcnRFdmVudCwgc3RhdHVzLnN0YXJ0RXZlbnQpO1xuXG4gICAgc3RhdHVzLmkgPSBhbmltYXRpb25GcmFtZS5yZXF1ZXN0KHRoaXMuYm91bmRTbW9vdGhFbmRGcmFtZSk7XG4gIH0gZWxzZSB7XG4gICAgc3RhdHVzLnN4ID0gc3RhdHVzLnhlO1xuICAgIHN0YXR1cy5zeSA9IHN0YXR1cy55ZTtcblxuICAgIHRoaXMucG9pbnRlck1vdmUoc3RhdHVzLnN0YXJ0RXZlbnQsIHN0YXR1cy5zdGFydEV2ZW50KTtcbiAgICB0aGlzLmVuZChzdGF0dXMuc3RhcnRFdmVudCk7XG5cbiAgICBzdGF0dXMuc21vb3RoRW5kID0gc3RhdHVzLmFjdGl2ZSA9IGZhbHNlO1xuICAgIHRoaXMuc2ltdWxhdGlvbiA9IG51bGw7XG4gIH1cbn1cblxuZnVuY3Rpb24gdXBkYXRlSW5lcnRpYUNvb3JkcyhpbnRlcmFjdGlvbikge1xuICB2YXIgc3RhdHVzID0gaW50ZXJhY3Rpb24uaW5lcnRpYVN0YXR1cztcblxuICAvLyByZXR1cm4gaWYgaW5lcnRpYSBpc24ndCBydW5uaW5nXG4gIGlmICghc3RhdHVzLmFjdGl2ZSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHZhciBwYWdlVXAgPSBzdGF0dXMudXBDb29yZHMucGFnZTtcbiAgdmFyIGNsaWVudFVwID0gc3RhdHVzLnVwQ29vcmRzLmNsaWVudDtcblxuICB1dGlscy5zZXRDb29yZHMoaW50ZXJhY3Rpb24uY3VyQ29vcmRzLCBbe1xuICAgIHBhZ2VYOiBwYWdlVXAueCArIHN0YXR1cy5zeCxcbiAgICBwYWdlWTogcGFnZVVwLnkgKyBzdGF0dXMuc3ksXG4gICAgY2xpZW50WDogY2xpZW50VXAueCArIHN0YXR1cy5zeCxcbiAgICBjbGllbnRZOiBjbGllbnRVcC55ICsgc3RhdHVzLnN5XG4gIH1dKTtcbn1cblxufSx7XCIuL0ludGVyYWN0RXZlbnRcIjozLFwiLi9JbnRlcmFjdGlvblwiOjUsXCIuL21vZGlmaWVycy9iYXNlXCI6MjMsXCIuL3V0aWxzXCI6NDQsXCIuL3V0aWxzL3JhZlwiOjUwfV0sMjE6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG4vKiogQG1vZHVsZSBpbnRlcmFjdCAqL1xuXG52YXIgYnJvd3NlciA9IHJlcXVpcmUoJy4vdXRpbHMvYnJvd3NlcicpO1xudmFyIGV2ZW50cyA9IHJlcXVpcmUoJy4vdXRpbHMvZXZlbnRzJyk7XG52YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG52YXIgc2NvcGUgPSByZXF1aXJlKCcuL3Njb3BlJyk7XG52YXIgSW50ZXJhY3RhYmxlID0gcmVxdWlyZSgnLi9JbnRlcmFjdGFibGUnKTtcbnZhciBJbnRlcmFjdGlvbiA9IHJlcXVpcmUoJy4vSW50ZXJhY3Rpb24nKTtcblxudmFyIGdsb2JhbEV2ZW50cyA9IHt9O1xuXG4vKipcbiAqIGBgYGpzXG4gKiBpbnRlcmFjdCgnI2RyYWdnYWJsZScpLmRyYWdnYWJsZSh0cnVlKTtcbiAqXG4gKiB2YXIgcmVjdGFibGVzID0gaW50ZXJhY3QoJ3JlY3QnKTtcbiAqIHJlY3RhYmxlc1xuICogICAuZ2VzdHVyYWJsZSh0cnVlKVxuICogICAub24oJ2dlc3R1cmVtb3ZlJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gKiAgICAgICAvLyAuLi5cbiAqICAgfSk7XG4gKiBgYGBcbiAqXG4gKiBUaGUgbWV0aG9kcyBvZiB0aGlzIHZhcmlhYmxlIGNhbiBiZSB1c2VkIHRvIHNldCBlbGVtZW50cyBhcyBpbnRlcmFjdGFibGVzXG4gKiBhbmQgYWxzbyB0byBjaGFuZ2UgdmFyaW91cyBkZWZhdWx0IHNldHRpbmdzLlxuICpcbiAqIENhbGxpbmcgaXQgYXMgYSBmdW5jdGlvbiBhbmQgcGFzc2luZyBhbiBlbGVtZW50IG9yIGEgdmFsaWQgQ1NTIHNlbGVjdG9yXG4gKiBzdHJpbmcgcmV0dXJucyBhbiBJbnRlcmFjdGFibGUgb2JqZWN0IHdoaWNoIGhhcyB2YXJpb3VzIG1ldGhvZHMgdG8gY29uZmlndXJlXG4gKiBpdC5cbiAqXG4gKiBAZ2xvYmFsXG4gKlxuICogQHBhcmFtIHtFbGVtZW50IHwgc3RyaW5nfSBlbGVtZW50IFRoZSBIVE1MIG9yIFNWRyBFbGVtZW50IHRvIGludGVyYWN0IHdpdGhcbiAqIG9yIENTUyBzZWxlY3RvclxuICogQHJldHVybiB7SW50ZXJhY3RhYmxlfVxuICovXG5mdW5jdGlvbiBpbnRlcmFjdChlbGVtZW50LCBvcHRpb25zKSB7XG4gIHZhciBpbnRlcmFjdGFibGUgPSBzY29wZS5pbnRlcmFjdGFibGVzLmdldChlbGVtZW50LCBvcHRpb25zKTtcblxuICBpZiAoIWludGVyYWN0YWJsZSkge1xuICAgIGludGVyYWN0YWJsZSA9IG5ldyBJbnRlcmFjdGFibGUoZWxlbWVudCwgb3B0aW9ucyk7XG4gICAgaW50ZXJhY3RhYmxlLmV2ZW50cy5nbG9iYWwgPSBnbG9iYWxFdmVudHM7XG4gIH1cblxuICByZXR1cm4gaW50ZXJhY3RhYmxlO1xufVxuXG4vKipcbiAqIENoZWNrIGlmIGFuIGVsZW1lbnQgb3Igc2VsZWN0b3IgaGFzIGJlZW4gc2V0IHdpdGggdGhlIHtAbGluayBpbnRlcmFjdH1cbiAqIGZ1bmN0aW9uXG4gKlxuICogQGFsaWFzIG1vZHVsZTppbnRlcmFjdC5pc1NldFxuICpcbiAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudCBUaGUgRWxlbWVudCBiZWluZyBzZWFyY2hlZCBmb3JcbiAqIEByZXR1cm4ge2Jvb2xlYW59IEluZGljYXRlcyBpZiB0aGUgZWxlbWVudCBvciBDU1Mgc2VsZWN0b3Igd2FzIHByZXZpb3VzbHlcbiAqIHBhc3NlZCB0byBpbnRlcmFjdFxuKi9cbmludGVyYWN0LmlzU2V0ID0gZnVuY3Rpb24gKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgcmV0dXJuIHNjb3BlLmludGVyYWN0YWJsZXMuaW5kZXhPZkVsZW1lbnQoZWxlbWVudCwgb3B0aW9ucyAmJiBvcHRpb25zLmNvbnRleHQpICE9PSAtMTtcbn07XG5cbi8qKlxuICogQWRkIGEgZ2xvYmFsIGxpc3RlbmVyIGZvciBhbiBJbnRlcmFjdEV2ZW50IG9yIGFkZHMgYSBET00gZXZlbnQgdG8gYGRvY3VtZW50YFxuICpcbiAqIEBhbGlhcyBtb2R1bGU6aW50ZXJhY3Qub25cbiAqXG4gKiBAcGFyYW0ge3N0cmluZyB8IGFycmF5IHwgb2JqZWN0fSB0eXBlIFRoZSB0eXBlcyBvZiBldmVudHMgdG8gbGlzdGVuIGZvclxuICogQHBhcmFtIHtmdW5jdGlvbn0gbGlzdGVuZXIgVGhlIGZ1bmN0aW9uIGV2ZW50IChzKVxuICogQHBhcmFtIHtvYmplY3QgfCBib29sZWFufSBbb3B0aW9uc10gb2JqZWN0IG9yIHVzZUNhcHR1cmUgZmxhZyBmb3JcbiAqIGFkZEV2ZW50TGlzdGVuZXJcbiAqIEByZXR1cm4ge29iamVjdH0gaW50ZXJhY3RcbiAqL1xuaW50ZXJhY3Qub24gPSBmdW5jdGlvbiAodHlwZSwgbGlzdGVuZXIsIG9wdGlvbnMpIHtcbiAgaWYgKHV0aWxzLmlzLnN0cmluZyh0eXBlKSAmJiB0eXBlLnNlYXJjaCgnICcpICE9PSAtMSkge1xuICAgIHR5cGUgPSB0eXBlLnRyaW0oKS5zcGxpdCgvICsvKTtcbiAgfVxuXG4gIGlmICh1dGlscy5pcy5hcnJheSh0eXBlKSkge1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCB0eXBlLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9yZWY7XG5cbiAgICAgIF9yZWYgPSB0eXBlW19pXTtcbiAgICAgIHZhciBldmVudFR5cGUgPSBfcmVmO1xuXG4gICAgICBpbnRlcmFjdC5vbihldmVudFR5cGUsIGxpc3RlbmVyLCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICByZXR1cm4gaW50ZXJhY3Q7XG4gIH1cblxuICBpZiAodXRpbHMuaXMub2JqZWN0KHR5cGUpKSB7XG4gICAgZm9yICh2YXIgcHJvcCBpbiB0eXBlKSB7XG4gICAgICBpbnRlcmFjdC5vbihwcm9wLCB0eXBlW3Byb3BdLCBsaXN0ZW5lcik7XG4gICAgfVxuXG4gICAgcmV0dXJuIGludGVyYWN0O1xuICB9XG5cbiAgLy8gaWYgaXQgaXMgYW4gSW50ZXJhY3RFdmVudCB0eXBlLCBhZGQgbGlzdGVuZXIgdG8gZ2xvYmFsRXZlbnRzXG4gIGlmICh1dGlscy5jb250YWlucyhJbnRlcmFjdGFibGUuZXZlbnRUeXBlcywgdHlwZSkpIHtcbiAgICAvLyBpZiB0aGlzIHR5cGUgb2YgZXZlbnQgd2FzIG5ldmVyIGJvdW5kXG4gICAgaWYgKCFnbG9iYWxFdmVudHNbdHlwZV0pIHtcbiAgICAgIGdsb2JhbEV2ZW50c1t0eXBlXSA9IFtsaXN0ZW5lcl07XG4gICAgfSBlbHNlIHtcbiAgICAgIGdsb2JhbEV2ZW50c1t0eXBlXS5wdXNoKGxpc3RlbmVyKTtcbiAgICB9XG4gIH1cbiAgLy8gSWYgbm9uIEludGVyYWN0RXZlbnQgdHlwZSwgYWRkRXZlbnRMaXN0ZW5lciB0byBkb2N1bWVudFxuICBlbHNlIHtcbiAgICAgIGV2ZW50cy5hZGQoc2NvcGUuZG9jdW1lbnQsIHR5cGUsIGxpc3RlbmVyLCB7IG9wdGlvbnM6IG9wdGlvbnMgfSk7XG4gICAgfVxuXG4gIHJldHVybiBpbnRlcmFjdDtcbn07XG5cbi8qKlxuICogUmVtb3ZlcyBhIGdsb2JhbCBJbnRlcmFjdEV2ZW50IGxpc3RlbmVyIG9yIERPTSBldmVudCBmcm9tIGBkb2N1bWVudGBcbiAqXG4gKiBAYWxpYXMgbW9kdWxlOmludGVyYWN0Lm9mZlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nIHwgYXJyYXkgfCBvYmplY3R9IHR5cGUgVGhlIHR5cGVzIG9mIGV2ZW50cyB0aGF0IHdlcmUgbGlzdGVuZWRcbiAqIGZvclxuICogQHBhcmFtIHtmdW5jdGlvbn0gbGlzdGVuZXIgVGhlIGxpc3RlbmVyIGZ1bmN0aW9uIHRvIGJlIHJlbW92ZWRcbiAqIEBwYXJhbSB7b2JqZWN0IHwgYm9vbGVhbn0gb3B0aW9ucyBbb3B0aW9uc10gb2JqZWN0IG9yIHVzZUNhcHR1cmUgZmxhZyBmb3JcbiAqIHJlbW92ZUV2ZW50TGlzdGVuZXJcbiAqIEByZXR1cm4ge29iamVjdH0gaW50ZXJhY3RcbiAqL1xuaW50ZXJhY3Qub2ZmID0gZnVuY3Rpb24gKHR5cGUsIGxpc3RlbmVyLCBvcHRpb25zKSB7XG4gIGlmICh1dGlscy5pcy5zdHJpbmcodHlwZSkgJiYgdHlwZS5zZWFyY2goJyAnKSAhPT0gLTEpIHtcbiAgICB0eXBlID0gdHlwZS50cmltKCkuc3BsaXQoLyArLyk7XG4gIH1cblxuICBpZiAodXRpbHMuaXMuYXJyYXkodHlwZSkpIHtcbiAgICBmb3IgKHZhciBfaTIgPSAwOyBfaTIgPCB0eXBlLmxlbmd0aDsgX2kyKyspIHtcbiAgICAgIHZhciBfcmVmMjtcblxuICAgICAgX3JlZjIgPSB0eXBlW19pMl07XG4gICAgICB2YXIgZXZlbnRUeXBlID0gX3JlZjI7XG5cbiAgICAgIGludGVyYWN0Lm9mZihldmVudFR5cGUsIGxpc3RlbmVyLCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICByZXR1cm4gaW50ZXJhY3Q7XG4gIH1cblxuICBpZiAodXRpbHMuaXMub2JqZWN0KHR5cGUpKSB7XG4gICAgZm9yICh2YXIgcHJvcCBpbiB0eXBlKSB7XG4gICAgICBpbnRlcmFjdC5vZmYocHJvcCwgdHlwZVtwcm9wXSwgbGlzdGVuZXIpO1xuICAgIH1cblxuICAgIHJldHVybiBpbnRlcmFjdDtcbiAgfVxuXG4gIGlmICghdXRpbHMuY29udGFpbnMoSW50ZXJhY3RhYmxlLmV2ZW50VHlwZXMsIHR5cGUpKSB7XG4gICAgZXZlbnRzLnJlbW92ZShzY29wZS5kb2N1bWVudCwgdHlwZSwgbGlzdGVuZXIsIG9wdGlvbnMpO1xuICB9IGVsc2Uge1xuICAgIHZhciBpbmRleCA9IHZvaWQgMDtcblxuICAgIGlmICh0eXBlIGluIGdsb2JhbEV2ZW50cyAmJiAoaW5kZXggPSBnbG9iYWxFdmVudHNbdHlwZV0uaW5kZXhPZihsaXN0ZW5lcikpICE9PSAtMSkge1xuICAgICAgZ2xvYmFsRXZlbnRzW3R5cGVdLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGludGVyYWN0O1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIGFuIG9iamVjdCB3aGljaCBleHBvc2VzIGludGVybmFsIGRhdGFcblxuICogQGFsaWFzIG1vZHVsZTppbnRlcmFjdC5kZWJ1Z1xuICpcbiAqIEByZXR1cm4ge29iamVjdH0gQW4gb2JqZWN0IHdpdGggcHJvcGVydGllcyB0aGF0IG91dGxpbmUgdGhlIGN1cnJlbnQgc3RhdGVcbiAqIGFuZCBleHBvc2UgaW50ZXJuYWwgZnVuY3Rpb25zIGFuZCB2YXJpYWJsZXNcbiAqL1xuaW50ZXJhY3QuZGVidWcgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBzY29wZTtcbn07XG5cbi8vIGV4cG9zZSB0aGUgZnVuY3Rpb25zIHVzZWQgdG8gY2FsY3VsYXRlIG11bHRpLXRvdWNoIHByb3BlcnRpZXNcbmludGVyYWN0LmdldFBvaW50ZXJBdmVyYWdlID0gdXRpbHMucG9pbnRlckF2ZXJhZ2U7XG5pbnRlcmFjdC5nZXRUb3VjaEJCb3ggPSB1dGlscy50b3VjaEJCb3g7XG5pbnRlcmFjdC5nZXRUb3VjaERpc3RhbmNlID0gdXRpbHMudG91Y2hEaXN0YW5jZTtcbmludGVyYWN0LmdldFRvdWNoQW5nbGUgPSB1dGlscy50b3VjaEFuZ2xlO1xuXG5pbnRlcmFjdC5nZXRFbGVtZW50UmVjdCA9IHV0aWxzLmdldEVsZW1lbnRSZWN0O1xuaW50ZXJhY3QuZ2V0RWxlbWVudENsaWVudFJlY3QgPSB1dGlscy5nZXRFbGVtZW50Q2xpZW50UmVjdDtcbmludGVyYWN0Lm1hdGNoZXNTZWxlY3RvciA9IHV0aWxzLm1hdGNoZXNTZWxlY3RvcjtcbmludGVyYWN0LmNsb3Nlc3QgPSB1dGlscy5jbG9zZXN0O1xuXG4vKipcbiAqIEBhbGlhcyBtb2R1bGU6aW50ZXJhY3Quc3VwcG9ydHNUb3VjaFxuICpcbiAqIEByZXR1cm4ge2Jvb2xlYW59IFdoZXRoZXIgb3Igbm90IHRoZSBicm93c2VyIHN1cHBvcnRzIHRvdWNoIGlucHV0XG4gKi9cbmludGVyYWN0LnN1cHBvcnRzVG91Y2ggPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBicm93c2VyLnN1cHBvcnRzVG91Y2g7XG59O1xuXG4vKipcbiAqIEBhbGlhcyBtb2R1bGU6aW50ZXJhY3Quc3VwcG9ydHNQb2ludGVyRXZlbnRcbiAqXG4gKiBAcmV0dXJuIHtib29sZWFufSBXaGV0aGVyIG9yIG5vdCB0aGUgYnJvd3NlciBzdXBwb3J0cyBQb2ludGVyRXZlbnRzXG4gKi9cbmludGVyYWN0LnN1cHBvcnRzUG9pbnRlckV2ZW50ID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gYnJvd3Nlci5zdXBwb3J0c1BvaW50ZXJFdmVudDtcbn07XG5cbi8qKlxuICogQ2FuY2VscyBhbGwgaW50ZXJhY3Rpb25zIChlbmQgZXZlbnRzIGFyZSBub3QgZmlyZWQpXG4gKlxuICogQGFsaWFzIG1vZHVsZTppbnRlcmFjdC5zdG9wXG4gKlxuICogQHBhcmFtIHtFdmVudH0gZXZlbnQgQW4gZXZlbnQgb24gd2hpY2ggdG8gY2FsbCBwcmV2ZW50RGVmYXVsdCgpXG4gKiBAcmV0dXJuIHtvYmplY3R9IGludGVyYWN0XG4gKi9cbmludGVyYWN0LnN0b3AgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgZm9yICh2YXIgaSA9IHNjb3BlLmludGVyYWN0aW9ucy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgIHNjb3BlLmludGVyYWN0aW9uc1tpXS5zdG9wKGV2ZW50KTtcbiAgfVxuXG4gIHJldHVybiBpbnRlcmFjdDtcbn07XG5cbi8qKlxuICogUmV0dXJucyBvciBzZXRzIHRoZSBkaXN0YW5jZSB0aGUgcG9pbnRlciBtdXN0IGJlIG1vdmVkIGJlZm9yZSBhbiBhY3Rpb25cbiAqIHNlcXVlbmNlIG9jY3Vycy4gVGhpcyBhbHNvIGFmZmVjdHMgdG9sZXJhbmNlIGZvciB0YXAgZXZlbnRzLlxuICpcbiAqIEBhbGlhcyBtb2R1bGU6aW50ZXJhY3QucG9pbnRlck1vdmVUb2xlcmFuY2VcbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gW25ld1ZhbHVlXSBUaGUgbW92ZW1lbnQgZnJvbSB0aGUgc3RhcnQgcG9zaXRpb24gbXVzdCBiZSBncmVhdGVyIHRoYW4gdGhpcyB2YWx1ZVxuICogQHJldHVybiB7aW50ZXJhY3QgfCBudW1iZXJ9XG4gKi9cbmludGVyYWN0LnBvaW50ZXJNb3ZlVG9sZXJhbmNlID0gZnVuY3Rpb24gKG5ld1ZhbHVlKSB7XG4gIGlmICh1dGlscy5pcy5udW1iZXIobmV3VmFsdWUpKSB7XG4gICAgSW50ZXJhY3Rpb24ucG9pbnRlck1vdmVUb2xlcmFuY2UgPSBuZXdWYWx1ZTtcblxuICAgIHJldHVybiBpbnRlcmFjdDtcbiAgfVxuXG4gIHJldHVybiBJbnRlcmFjdGlvbi5wb2ludGVyTW92ZVRvbGVyYW5jZTtcbn07XG5cbmludGVyYWN0LmFkZERvY3VtZW50ID0gc2NvcGUuYWRkRG9jdW1lbnQ7XG5pbnRlcmFjdC5yZW1vdmVEb2N1bWVudCA9IHNjb3BlLnJlbW92ZURvY3VtZW50O1xuXG5zY29wZS5pbnRlcmFjdCA9IGludGVyYWN0O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGludGVyYWN0O1xuXG59LHtcIi4vSW50ZXJhY3RhYmxlXCI6NCxcIi4vSW50ZXJhY3Rpb25cIjo1LFwiLi9zY29wZVwiOjMzLFwiLi91dGlsc1wiOjQ0LFwiLi91dGlscy9icm93c2VyXCI6MzYsXCIuL3V0aWxzL2V2ZW50c1wiOjQwfV0sMjI6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgSW50ZXJhY3RhYmxlID0gcmVxdWlyZSgnLi9JbnRlcmFjdGFibGUnKTtcbnZhciBJbnRlcmFjdGlvbiA9IHJlcXVpcmUoJy4vSW50ZXJhY3Rpb24nKTtcbnZhciBzY29wZSA9IHJlcXVpcmUoJy4vc2NvcGUnKTtcbnZhciBpcyA9IHJlcXVpcmUoJy4vdXRpbHMvaXMnKTtcbnZhciBldmVudHMgPSByZXF1aXJlKCcuL3V0aWxzL2V2ZW50cycpO1xudmFyIGJyb3dzZXIgPSByZXF1aXJlKCcuL3V0aWxzL2Jyb3dzZXInKTtcblxudmFyIF9yZXF1aXJlID0gcmVxdWlyZSgnLi91dGlscy9kb21VdGlscycpLFxuICAgIG5vZGVDb250YWlucyA9IF9yZXF1aXJlLm5vZGVDb250YWlucyxcbiAgICBtYXRjaGVzU2VsZWN0b3IgPSBfcmVxdWlyZS5tYXRjaGVzU2VsZWN0b3I7XG5cbi8qKlxuICogUmV0dXJucyBvciBzZXRzIHdoZXRoZXIgdG8gcHJldmVudCB0aGUgYnJvd3NlcidzIGRlZmF1bHQgYmVoYXZpb3VyIGluXG4gKiByZXNwb25zZSB0byBwb2ludGVyIGV2ZW50cy4gQ2FuIGJlIHNldCB0bzpcbiAqICAtIGAnYWx3YXlzJ2AgdG8gYWx3YXlzIHByZXZlbnRcbiAqICAtIGAnbmV2ZXInYCB0byBuZXZlciBwcmV2ZW50XG4gKiAgLSBgJ2F1dG8nYCB0byBsZXQgaW50ZXJhY3QuanMgdHJ5IHRvIGRldGVybWluZSB3aGF0IHdvdWxkIGJlIGJlc3RcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gW25ld1ZhbHVlXSBgdHJ1ZWAsIGBmYWxzZWAgb3IgYCdhdXRvJ2BcbiAqIEByZXR1cm4ge3N0cmluZyB8IEludGVyYWN0YWJsZX0gVGhlIGN1cnJlbnQgc2V0dGluZyBvciB0aGlzIEludGVyYWN0YWJsZVxuICovXG5cblxuSW50ZXJhY3RhYmxlLnByb3RvdHlwZS5wcmV2ZW50RGVmYXVsdCA9IGZ1bmN0aW9uIChuZXdWYWx1ZSkge1xuICBpZiAoL14oYWx3YXlzfG5ldmVyfGF1dG8pJC8udGVzdChuZXdWYWx1ZSkpIHtcbiAgICB0aGlzLm9wdGlvbnMucHJldmVudERlZmF1bHQgPSBuZXdWYWx1ZTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGlmIChpcy5ib29sKG5ld1ZhbHVlKSkge1xuICAgIHRoaXMub3B0aW9ucy5wcmV2ZW50RGVmYXVsdCA9IG5ld1ZhbHVlID8gJ2Fsd2F5cycgOiAnbmV2ZXInO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgcmV0dXJuIHRoaXMub3B0aW9ucy5wcmV2ZW50RGVmYXVsdDtcbn07XG5cbkludGVyYWN0YWJsZS5wcm90b3R5cGUuY2hlY2tBbmRQcmV2ZW50RGVmYXVsdCA9IGZ1bmN0aW9uIChldmVudCkge1xuICB2YXIgc2V0dGluZyA9IHRoaXMub3B0aW9ucy5wcmV2ZW50RGVmYXVsdDtcblxuICBpZiAoc2V0dGluZyA9PT0gJ25ldmVyJykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmIChzZXR0aW5nID09PSAnYWx3YXlzJykge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gc2V0dGluZyA9PT0gJ2F1dG8nXG5cbiAgLy8gZG9uJ3QgcHJldmVudERlZmF1bHQgb2YgdG91Y2h7c3RhcnQsbW92ZX0gZXZlbnRzIGlmIHRoZSBicm93c2VyIHN1cHBvcnRzIHBhc3NpdmVcbiAgLy8gZXZlbnRzIGxpc3RlbmVycy4gQ1NTIHRvdWNoLWFjdGlvbiBhbmQgdXNlci1zZWxlY2N0IHNob3VsZCBiZSB1c2VkIGluc3RlYWRcbiAgaWYgKGV2ZW50cy5zdXBwb3J0c1Bhc3NpdmUgJiYgL150b3VjaChzdGFydHxtb3ZlKSQvLnRlc3QoZXZlbnQudHlwZSkgJiYgIWJyb3dzZXIuaXNJT1MpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBkb24ndCBwcmV2ZW50RGVmYXVsdCBvZiBwb2ludGVyZG93biBldmVudHNcbiAgaWYgKC9eKG1vdXNlfHBvaW50ZXJ8dG91Y2gpKihkb3dufHN0YXJ0KS9pLnRlc3QoZXZlbnQudHlwZSkpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBkb24ndCBwcmV2ZW50RGVmYXVsdCBvbiBlZGl0YWJsZSBlbGVtZW50c1xuICBpZiAoaXMuZWxlbWVudChldmVudC50YXJnZXQpICYmIG1hdGNoZXNTZWxlY3RvcihldmVudC50YXJnZXQsICdpbnB1dCxzZWxlY3QsdGV4dGFyZWEsW2NvbnRlbnRlZGl0YWJsZT10cnVlXSxbY29udGVudGVkaXRhYmxlPXRydWVdIConKSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG59O1xuXG5mdW5jdGlvbiBvbkludGVyYWN0aW9uRXZlbnQoX3JlZikge1xuICB2YXIgaW50ZXJhY3Rpb24gPSBfcmVmLmludGVyYWN0aW9uLFxuICAgICAgZXZlbnQgPSBfcmVmLmV2ZW50O1xuXG4gIGlmIChpbnRlcmFjdGlvbi50YXJnZXQpIHtcbiAgICBpbnRlcmFjdGlvbi50YXJnZXQuY2hlY2tBbmRQcmV2ZW50RGVmYXVsdChldmVudCk7XG4gIH1cbn1cblxudmFyIF9hcnIgPSBbJ2Rvd24nLCAnbW92ZScsICd1cCcsICdjYW5jZWwnXTtcbmZvciAodmFyIF9pID0gMDsgX2kgPCBfYXJyLmxlbmd0aDsgX2krKykge1xuICB2YXIgZXZlbnRTaWduYWwgPSBfYXJyW19pXTtcbiAgSW50ZXJhY3Rpb24uc2lnbmFscy5vbihldmVudFNpZ25hbCwgb25JbnRlcmFjdGlvbkV2ZW50KTtcbn1cblxuLy8gcHJldmVudCBuYXRpdmUgSFRNTDUgZHJhZyBvbiBpbnRlcmFjdC5qcyB0YXJnZXQgZWxlbWVudHNcbkludGVyYWN0aW9uLmRvY0V2ZW50cy5kcmFnc3RhcnQgPSBmdW5jdGlvbiBwcmV2ZW50TmF0aXZlRHJhZyhldmVudCkge1xuICBmb3IgKHZhciBfaTIgPSAwOyBfaTIgPCBzY29wZS5pbnRlcmFjdGlvbnMubGVuZ3RoOyBfaTIrKykge1xuICAgIHZhciBfcmVmMjtcblxuICAgIF9yZWYyID0gc2NvcGUuaW50ZXJhY3Rpb25zW19pMl07XG4gICAgdmFyIGludGVyYWN0aW9uID0gX3JlZjI7XG5cblxuICAgIGlmIChpbnRlcmFjdGlvbi5lbGVtZW50ICYmIChpbnRlcmFjdGlvbi5lbGVtZW50ID09PSBldmVudC50YXJnZXQgfHwgbm9kZUNvbnRhaW5zKGludGVyYWN0aW9uLmVsZW1lbnQsIGV2ZW50LnRhcmdldCkpKSB7XG5cbiAgICAgIGludGVyYWN0aW9uLnRhcmdldC5jaGVja0FuZFByZXZlbnREZWZhdWx0KGV2ZW50KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gIH1cbn07XG5cbn0se1wiLi9JbnRlcmFjdGFibGVcIjo0LFwiLi9JbnRlcmFjdGlvblwiOjUsXCIuL3Njb3BlXCI6MzMsXCIuL3V0aWxzL2Jyb3dzZXJcIjozNixcIi4vdXRpbHMvZG9tVXRpbHNcIjozOSxcIi4vdXRpbHMvZXZlbnRzXCI6NDAsXCIuL3V0aWxzL2lzXCI6NDZ9XSwyMzpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4ndXNlIHN0cmljdCc7XG5cbnZhciBJbnRlcmFjdEV2ZW50ID0gcmVxdWlyZSgnLi4vSW50ZXJhY3RFdmVudCcpO1xudmFyIEludGVyYWN0aW9uID0gcmVxdWlyZSgnLi4vSW50ZXJhY3Rpb24nKTtcbnZhciBleHRlbmQgPSByZXF1aXJlKCcuLi91dGlscy9leHRlbmQnKTtcblxudmFyIG1vZGlmaWVycyA9IHtcbiAgbmFtZXM6IFtdLFxuXG4gIHNldE9mZnNldHM6IGZ1bmN0aW9uIHNldE9mZnNldHMoYXJnKSB7XG4gICAgdmFyIGludGVyYWN0aW9uID0gYXJnLmludGVyYWN0aW9uLFxuICAgICAgICBwYWdlID0gYXJnLnBhZ2VDb29yZHM7XG4gICAgdmFyIHRhcmdldCA9IGludGVyYWN0aW9uLnRhcmdldCxcbiAgICAgICAgZWxlbWVudCA9IGludGVyYWN0aW9uLmVsZW1lbnQsXG4gICAgICAgIHN0YXJ0T2Zmc2V0ID0gaW50ZXJhY3Rpb24uc3RhcnRPZmZzZXQ7XG5cbiAgICB2YXIgcmVjdCA9IHRhcmdldC5nZXRSZWN0KGVsZW1lbnQpO1xuXG4gICAgaWYgKHJlY3QpIHtcbiAgICAgIHN0YXJ0T2Zmc2V0LmxlZnQgPSBwYWdlLnggLSByZWN0LmxlZnQ7XG4gICAgICBzdGFydE9mZnNldC50b3AgPSBwYWdlLnkgLSByZWN0LnRvcDtcblxuICAgICAgc3RhcnRPZmZzZXQucmlnaHQgPSByZWN0LnJpZ2h0IC0gcGFnZS54O1xuICAgICAgc3RhcnRPZmZzZXQuYm90dG9tID0gcmVjdC5ib3R0b20gLSBwYWdlLnk7XG5cbiAgICAgIGlmICghKCd3aWR0aCcgaW4gcmVjdCkpIHtcbiAgICAgICAgcmVjdC53aWR0aCA9IHJlY3QucmlnaHQgLSByZWN0LmxlZnQ7XG4gICAgICB9XG4gICAgICBpZiAoISgnaGVpZ2h0JyBpbiByZWN0KSkge1xuICAgICAgICByZWN0LmhlaWdodCA9IHJlY3QuYm90dG9tIC0gcmVjdC50b3A7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0YXJ0T2Zmc2V0LmxlZnQgPSBzdGFydE9mZnNldC50b3AgPSBzdGFydE9mZnNldC5yaWdodCA9IHN0YXJ0T2Zmc2V0LmJvdHRvbSA9IDA7XG4gICAgfVxuXG4gICAgYXJnLnJlY3QgPSByZWN0O1xuICAgIGFyZy5pbnRlcmFjdGFibGUgPSB0YXJnZXQ7XG4gICAgYXJnLmVsZW1lbnQgPSBlbGVtZW50O1xuXG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IG1vZGlmaWVycy5uYW1lcy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfcmVmO1xuXG4gICAgICBfcmVmID0gbW9kaWZpZXJzLm5hbWVzW19pXTtcbiAgICAgIHZhciBtb2RpZmllck5hbWUgPSBfcmVmO1xuXG4gICAgICBhcmcub3B0aW9ucyA9IHRhcmdldC5vcHRpb25zW2ludGVyYWN0aW9uLnByZXBhcmVkLm5hbWVdW21vZGlmaWVyTmFtZV07XG5cbiAgICAgIGlmICghYXJnLm9wdGlvbnMpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGludGVyYWN0aW9uLm1vZGlmaWVyT2Zmc2V0c1ttb2RpZmllck5hbWVdID0gbW9kaWZpZXJzW21vZGlmaWVyTmFtZV0uc2V0T2Zmc2V0KGFyZyk7XG4gICAgfVxuICB9LFxuXG4gIHNldEFsbDogZnVuY3Rpb24gc2V0QWxsKGFyZykge1xuICAgIHZhciBpbnRlcmFjdGlvbiA9IGFyZy5pbnRlcmFjdGlvbixcbiAgICAgICAgc3RhdHVzZXMgPSBhcmcuc3RhdHVzZXMsXG4gICAgICAgIHByZUVuZCA9IGFyZy5wcmVFbmQsXG4gICAgICAgIHJlcXVpcmVFbmRPbmx5ID0gYXJnLnJlcXVpcmVFbmRPbmx5O1xuXG4gICAgdmFyIHJlc3VsdCA9IHtcbiAgICAgIGR4OiAwLFxuICAgICAgZHk6IDAsXG4gICAgICBjaGFuZ2VkOiBmYWxzZSxcbiAgICAgIGxvY2tlZDogZmFsc2UsXG4gICAgICBzaG91bGRNb3ZlOiB0cnVlXG4gICAgfTtcblxuICAgIGFyZy5tb2RpZmllZENvb3JkcyA9IGV4dGVuZCh7fSwgYXJnLnBhZ2VDb29yZHMpO1xuXG4gICAgZm9yICh2YXIgX2kyID0gMDsgX2kyIDwgbW9kaWZpZXJzLm5hbWVzLmxlbmd0aDsgX2kyKyspIHtcbiAgICAgIHZhciBfcmVmMjtcblxuICAgICAgX3JlZjIgPSBtb2RpZmllcnMubmFtZXNbX2kyXTtcbiAgICAgIHZhciBtb2RpZmllck5hbWUgPSBfcmVmMjtcblxuICAgICAgdmFyIG1vZGlmaWVyID0gbW9kaWZpZXJzW21vZGlmaWVyTmFtZV07XG4gICAgICB2YXIgb3B0aW9ucyA9IGludGVyYWN0aW9uLnRhcmdldC5vcHRpb25zW2ludGVyYWN0aW9uLnByZXBhcmVkLm5hbWVdW21vZGlmaWVyTmFtZV07XG5cbiAgICAgIGlmICghc2hvdWxkRG8ob3B0aW9ucywgcHJlRW5kLCByZXF1aXJlRW5kT25seSkpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGFyZy5zdGF0dXMgPSBhcmcuc3RhdHVzID0gc3RhdHVzZXNbbW9kaWZpZXJOYW1lXTtcbiAgICAgIGFyZy5vcHRpb25zID0gb3B0aW9ucztcbiAgICAgIGFyZy5vZmZzZXQgPSBhcmcuaW50ZXJhY3Rpb24ubW9kaWZpZXJPZmZzZXRzW21vZGlmaWVyTmFtZV07XG5cbiAgICAgIG1vZGlmaWVyLnNldChhcmcpO1xuXG4gICAgICBpZiAoYXJnLnN0YXR1cy5sb2NrZWQpIHtcbiAgICAgICAgYXJnLm1vZGlmaWVkQ29vcmRzLnggKz0gYXJnLnN0YXR1cy5keDtcbiAgICAgICAgYXJnLm1vZGlmaWVkQ29vcmRzLnkgKz0gYXJnLnN0YXR1cy5keTtcblxuICAgICAgICByZXN1bHQuZHggKz0gYXJnLnN0YXR1cy5keDtcbiAgICAgICAgcmVzdWx0LmR5ICs9IGFyZy5zdGF0dXMuZHk7XG5cbiAgICAgICAgcmVzdWx0LmxvY2tlZCA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gYSBtb3ZlIHNob3VsZCBiZSBmaXJlZCBpZjpcbiAgICAvLyAgLSB0aGVyZSBhcmUgbm8gbW9kaWZpZXJzIGVuYWJsZWQsXG4gICAgLy8gIC0gbm8gbW9kaWZpZXJzIGFyZSBcImxvY2tlZFwiIGkuZS4gaGF2ZSBjaGFuZ2VkIHRoZSBwb2ludGVyJ3MgY29vcmRpbmF0ZXMsIG9yXG4gICAgLy8gIC0gdGhlIGxvY2tlZCBjb29yZHMgaGF2ZSBjaGFuZ2VkIHNpbmNlIHRoZSBsYXN0IHBvaW50ZXIgbW92ZVxuICAgIHJlc3VsdC5zaG91bGRNb3ZlID0gIWFyZy5zdGF0dXMgfHwgIXJlc3VsdC5sb2NrZWQgfHwgYXJnLnN0YXR1cy5jaGFuZ2VkO1xuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfSxcblxuICByZXNldFN0YXR1c2VzOiBmdW5jdGlvbiByZXNldFN0YXR1c2VzKHN0YXR1c2VzKSB7XG4gICAgZm9yICh2YXIgX2kzID0gMDsgX2kzIDwgbW9kaWZpZXJzLm5hbWVzLmxlbmd0aDsgX2kzKyspIHtcbiAgICAgIHZhciBfcmVmMztcblxuICAgICAgX3JlZjMgPSBtb2RpZmllcnMubmFtZXNbX2kzXTtcbiAgICAgIHZhciBtb2RpZmllck5hbWUgPSBfcmVmMztcblxuICAgICAgdmFyIHN0YXR1cyA9IHN0YXR1c2VzW21vZGlmaWVyTmFtZV0gfHwge307XG5cbiAgICAgIHN0YXR1cy5keCA9IHN0YXR1cy5keSA9IDA7XG4gICAgICBzdGF0dXMubW9kaWZpZWRYID0gc3RhdHVzLm1vZGlmaWVkWSA9IE5hTjtcbiAgICAgIHN0YXR1cy5sb2NrZWQgPSBmYWxzZTtcbiAgICAgIHN0YXR1cy5jaGFuZ2VkID0gdHJ1ZTtcblxuICAgICAgc3RhdHVzZXNbbW9kaWZpZXJOYW1lXSA9IHN0YXR1cztcbiAgICB9XG5cbiAgICByZXR1cm4gc3RhdHVzZXM7XG4gIH0sXG5cbiAgc3RhcnQ6IGZ1bmN0aW9uIHN0YXJ0KF9yZWY0LCBzaWduYWxOYW1lKSB7XG4gICAgdmFyIGludGVyYWN0aW9uID0gX3JlZjQuaW50ZXJhY3Rpb247XG5cbiAgICB2YXIgYXJnID0ge1xuICAgICAgaW50ZXJhY3Rpb246IGludGVyYWN0aW9uLFxuICAgICAgcGFnZUNvb3JkczogKHNpZ25hbE5hbWUgPT09ICdhY3Rpb24tcmVzdW1lJyA/IGludGVyYWN0aW9uLmN1ckNvb3JkcyA6IGludGVyYWN0aW9uLnN0YXJ0Q29vcmRzKS5wYWdlLFxuICAgICAgc3RhcnRPZmZzZXQ6IGludGVyYWN0aW9uLnN0YXJ0T2Zmc2V0LFxuICAgICAgc3RhdHVzZXM6IGludGVyYWN0aW9uLm1vZGlmaWVyU3RhdHVzZXMsXG4gICAgICBwcmVFbmQ6IGZhbHNlLFxuICAgICAgcmVxdWlyZUVuZE9ubHk6IGZhbHNlXG4gICAgfTtcblxuICAgIG1vZGlmaWVycy5zZXRPZmZzZXRzKGFyZyk7XG4gICAgbW9kaWZpZXJzLnJlc2V0U3RhdHVzZXMoYXJnLnN0YXR1c2VzKTtcblxuICAgIGFyZy5wYWdlQ29vcmRzID0gZXh0ZW5kKHt9LCBpbnRlcmFjdGlvbi5zdGFydENvb3Jkcy5wYWdlKTtcbiAgICBpbnRlcmFjdGlvbi5tb2RpZmllclJlc3VsdCA9IG1vZGlmaWVycy5zZXRBbGwoYXJnKTtcbiAgfSxcblxuICBiZWZvcmVNb3ZlOiBmdW5jdGlvbiBiZWZvcmVNb3ZlKF9yZWY1KSB7XG4gICAgdmFyIGludGVyYWN0aW9uID0gX3JlZjUuaW50ZXJhY3Rpb24sXG4gICAgICAgIHByZUVuZCA9IF9yZWY1LnByZUVuZCxcbiAgICAgICAgaW50ZXJhY3RpbmdCZWZvcmVNb3ZlID0gX3JlZjUuaW50ZXJhY3RpbmdCZWZvcmVNb3ZlO1xuXG4gICAgdmFyIG1vZGlmaWVyUmVzdWx0ID0gbW9kaWZpZXJzLnNldEFsbCh7XG4gICAgICBpbnRlcmFjdGlvbjogaW50ZXJhY3Rpb24sXG4gICAgICBwcmVFbmQ6IHByZUVuZCxcbiAgICAgIHBhZ2VDb29yZHM6IGludGVyYWN0aW9uLmN1ckNvb3Jkcy5wYWdlLFxuICAgICAgc3RhdHVzZXM6IGludGVyYWN0aW9uLm1vZGlmaWVyU3RhdHVzZXMsXG4gICAgICByZXF1aXJlRW5kT25seTogZmFsc2VcbiAgICB9KTtcblxuICAgIC8vIGRvbid0IGZpcmUgYW4gYWN0aW9uIG1vdmUgaWYgYSBtb2RpZmllciB3b3VsZCBrZWVwIHRoZSBldmVudCBpbiB0aGUgc2FtZVxuICAgIC8vIGNvcmRpbmF0ZXMgYXMgYmVmb3JlXG4gICAgaWYgKCFtb2RpZmllclJlc3VsdC5zaG91bGRNb3ZlICYmIGludGVyYWN0aW5nQmVmb3JlTW92ZSkge1xuICAgICAgaW50ZXJhY3Rpb24uX2RvbnRGaXJlTW92ZSA9IHRydWU7XG4gICAgfVxuXG4gICAgaW50ZXJhY3Rpb24ubW9kaWZpZXJSZXN1bHQgPSBtb2RpZmllclJlc3VsdDtcbiAgfSxcblxuICBlbmQ6IGZ1bmN0aW9uIGVuZChfcmVmNikge1xuICAgIHZhciBpbnRlcmFjdGlvbiA9IF9yZWY2LmludGVyYWN0aW9uLFxuICAgICAgICBldmVudCA9IF9yZWY2LmV2ZW50O1xuXG4gICAgZm9yICh2YXIgX2k0ID0gMDsgX2k0IDwgbW9kaWZpZXJzLm5hbWVzLmxlbmd0aDsgX2k0KyspIHtcbiAgICAgIHZhciBfcmVmNztcblxuICAgICAgX3JlZjcgPSBtb2RpZmllcnMubmFtZXNbX2k0XTtcbiAgICAgIHZhciBtb2RpZmllck5hbWUgPSBfcmVmNztcblxuICAgICAgdmFyIG9wdGlvbnMgPSBpbnRlcmFjdGlvbi50YXJnZXQub3B0aW9uc1tpbnRlcmFjdGlvbi5wcmVwYXJlZC5uYW1lXVttb2RpZmllck5hbWVdO1xuXG4gICAgICAvLyBpZiB0aGUgZW5kT25seSBvcHRpb24gaXMgdHJ1ZSBmb3IgYW55IG1vZGlmaWVyXG4gICAgICBpZiAoc2hvdWxkRG8ob3B0aW9ucywgdHJ1ZSwgdHJ1ZSkpIHtcbiAgICAgICAgLy8gZmlyZSBhIG1vdmUgZXZlbnQgYXQgdGhlIG1vZGlmaWVkIGNvb3JkaW5hdGVzXG4gICAgICAgIGludGVyYWN0aW9uLmRvTW92ZSh7IGV2ZW50OiBldmVudCwgcHJlRW5kOiB0cnVlIH0pO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgc2V0WFk6IGZ1bmN0aW9uIHNldFhZKGFyZykge1xuICAgIHZhciBpRXZlbnQgPSBhcmcuaUV2ZW50LFxuICAgICAgICBpbnRlcmFjdGlvbiA9IGFyZy5pbnRlcmFjdGlvbjtcblxuICAgIHZhciBtb2RpZmllckFyZyA9IGV4dGVuZCh7fSwgYXJnKTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbW9kaWZpZXJzLm5hbWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgbW9kaWZpZXJOYW1lID0gbW9kaWZpZXJzLm5hbWVzW2ldO1xuICAgICAgbW9kaWZpZXJBcmcub3B0aW9ucyA9IGludGVyYWN0aW9uLnRhcmdldC5vcHRpb25zW2ludGVyYWN0aW9uLnByZXBhcmVkLm5hbWVdW21vZGlmaWVyTmFtZV07XG5cbiAgICAgIGlmICghbW9kaWZpZXJBcmcub3B0aW9ucykge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgdmFyIG1vZGlmaWVyID0gbW9kaWZpZXJzW21vZGlmaWVyTmFtZV07XG5cbiAgICAgIG1vZGlmaWVyQXJnLnN0YXR1cyA9IGludGVyYWN0aW9uLm1vZGlmaWVyU3RhdHVzZXNbbW9kaWZpZXJOYW1lXTtcblxuICAgICAgaUV2ZW50W21vZGlmaWVyTmFtZV0gPSBtb2RpZmllci5tb2RpZnlDb29yZHMobW9kaWZpZXJBcmcpO1xuICAgIH1cbiAgfVxufTtcblxuSW50ZXJhY3Rpb24uc2lnbmFscy5vbignbmV3JywgZnVuY3Rpb24gKGludGVyYWN0aW9uKSB7XG4gIGludGVyYWN0aW9uLnN0YXJ0T2Zmc2V0ID0geyBsZWZ0OiAwLCByaWdodDogMCwgdG9wOiAwLCBib3R0b206IDAgfTtcbiAgaW50ZXJhY3Rpb24ubW9kaWZpZXJPZmZzZXRzID0ge307XG4gIGludGVyYWN0aW9uLm1vZGlmaWVyU3RhdHVzZXMgPSBtb2RpZmllcnMucmVzZXRTdGF0dXNlcyh7fSk7XG4gIGludGVyYWN0aW9uLm1vZGlmaWVyUmVzdWx0ID0gbnVsbDtcbn0pO1xuXG5JbnRlcmFjdGlvbi5zaWduYWxzLm9uKCdhY3Rpb24tc3RhcnQnLCBtb2RpZmllcnMuc3RhcnQpO1xuSW50ZXJhY3Rpb24uc2lnbmFscy5vbignYWN0aW9uLXJlc3VtZScsIG1vZGlmaWVycy5zdGFydCk7XG5JbnRlcmFjdGlvbi5zaWduYWxzLm9uKCdiZWZvcmUtYWN0aW9uLW1vdmUnLCBtb2RpZmllcnMuYmVmb3JlTW92ZSk7XG5JbnRlcmFjdGlvbi5zaWduYWxzLm9uKCdhY3Rpb24tZW5kJywgbW9kaWZpZXJzLmVuZCk7XG5cbkludGVyYWN0RXZlbnQuc2lnbmFscy5vbignc2V0LXh5JywgbW9kaWZpZXJzLnNldFhZKTtcblxuZnVuY3Rpb24gc2hvdWxkRG8ob3B0aW9ucywgcHJlRW5kLCByZXF1aXJlRW5kT25seSkge1xuICByZXR1cm4gb3B0aW9ucyAmJiBvcHRpb25zLmVuYWJsZWQgJiYgKHByZUVuZCB8fCAhb3B0aW9ucy5lbmRPbmx5KSAmJiAoIXJlcXVpcmVFbmRPbmx5IHx8IG9wdGlvbnMuZW5kT25seSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbW9kaWZpZXJzO1xuXG59LHtcIi4uL0ludGVyYWN0RXZlbnRcIjozLFwiLi4vSW50ZXJhY3Rpb25cIjo1LFwiLi4vdXRpbHMvZXh0ZW5kXCI6NDF9XSwyNDpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4ndXNlIHN0cmljdCc7XG5cbnZhciBtb2RpZmllcnMgPSByZXF1aXJlKCcuL2Jhc2UnKTtcbnZhciB1dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzJyk7XG52YXIgZGVmYXVsdE9wdGlvbnMgPSByZXF1aXJlKCcuLi9kZWZhdWx0T3B0aW9ucycpO1xuXG52YXIgcmVzdHJpY3QgPSB7XG4gIGRlZmF1bHRzOiB7XG4gICAgZW5hYmxlZDogZmFsc2UsXG4gICAgZW5kT25seTogZmFsc2UsXG4gICAgcmVzdHJpY3Rpb246IG51bGwsXG4gICAgZWxlbWVudFJlY3Q6IG51bGxcbiAgfSxcblxuICBzZXRPZmZzZXQ6IGZ1bmN0aW9uIHNldE9mZnNldChfcmVmKSB7XG4gICAgdmFyIHJlY3QgPSBfcmVmLnJlY3QsXG4gICAgICAgIHN0YXJ0T2Zmc2V0ID0gX3JlZi5zdGFydE9mZnNldCxcbiAgICAgICAgb3B0aW9ucyA9IF9yZWYub3B0aW9ucztcblxuICAgIHZhciBlbGVtZW50UmVjdCA9IG9wdGlvbnMgJiYgb3B0aW9ucy5lbGVtZW50UmVjdDtcbiAgICB2YXIgb2Zmc2V0ID0ge307XG5cbiAgICBpZiAocmVjdCAmJiBlbGVtZW50UmVjdCkge1xuICAgICAgb2Zmc2V0LmxlZnQgPSBzdGFydE9mZnNldC5sZWZ0IC0gcmVjdC53aWR0aCAqIGVsZW1lbnRSZWN0LmxlZnQ7XG4gICAgICBvZmZzZXQudG9wID0gc3RhcnRPZmZzZXQudG9wIC0gcmVjdC5oZWlnaHQgKiBlbGVtZW50UmVjdC50b3A7XG5cbiAgICAgIG9mZnNldC5yaWdodCA9IHN0YXJ0T2Zmc2V0LnJpZ2h0IC0gcmVjdC53aWR0aCAqICgxIC0gZWxlbWVudFJlY3QucmlnaHQpO1xuICAgICAgb2Zmc2V0LmJvdHRvbSA9IHN0YXJ0T2Zmc2V0LmJvdHRvbSAtIHJlY3QuaGVpZ2h0ICogKDEgLSBlbGVtZW50UmVjdC5ib3R0b20pO1xuICAgIH0gZWxzZSB7XG4gICAgICBvZmZzZXQubGVmdCA9IG9mZnNldC50b3AgPSBvZmZzZXQucmlnaHQgPSBvZmZzZXQuYm90dG9tID0gMDtcbiAgICB9XG5cbiAgICByZXR1cm4gb2Zmc2V0O1xuICB9LFxuXG4gIHNldDogZnVuY3Rpb24gc2V0KF9yZWYyKSB7XG4gICAgdmFyIG1vZGlmaWVkQ29vcmRzID0gX3JlZjIubW9kaWZpZWRDb29yZHMsXG4gICAgICAgIGludGVyYWN0aW9uID0gX3JlZjIuaW50ZXJhY3Rpb24sXG4gICAgICAgIHN0YXR1cyA9IF9yZWYyLnN0YXR1cyxcbiAgICAgICAgb3B0aW9ucyA9IF9yZWYyLm9wdGlvbnM7XG5cbiAgICBpZiAoIW9wdGlvbnMpIHtcbiAgICAgIHJldHVybiBzdGF0dXM7XG4gICAgfVxuXG4gICAgdmFyIHBhZ2UgPSBzdGF0dXMudXNlU3RhdHVzWFkgPyB7IHg6IHN0YXR1cy54LCB5OiBzdGF0dXMueSB9IDogdXRpbHMuZXh0ZW5kKHt9LCBtb2RpZmllZENvb3Jkcyk7XG5cbiAgICB2YXIgcmVzdHJpY3Rpb24gPSBnZXRSZXN0cmljdGlvblJlY3Qob3B0aW9ucy5yZXN0cmljdGlvbiwgaW50ZXJhY3Rpb24sIHBhZ2UpO1xuXG4gICAgaWYgKCFyZXN0cmljdGlvbikge1xuICAgICAgcmV0dXJuIHN0YXR1cztcbiAgICB9XG5cbiAgICBzdGF0dXMuZHggPSAwO1xuICAgIHN0YXR1cy5keSA9IDA7XG4gICAgc3RhdHVzLmxvY2tlZCA9IGZhbHNlO1xuXG4gICAgdmFyIHJlY3QgPSByZXN0cmljdGlvbjtcbiAgICB2YXIgbW9kaWZpZWRYID0gcGFnZS54O1xuICAgIHZhciBtb2RpZmllZFkgPSBwYWdlLnk7XG5cbiAgICB2YXIgb2Zmc2V0ID0gaW50ZXJhY3Rpb24ubW9kaWZpZXJPZmZzZXRzLnJlc3RyaWN0O1xuXG4gICAgLy8gb2JqZWN0IGlzIGFzc3VtZWQgdG8gaGF2ZVxuICAgIC8vIHgsIHksIHdpZHRoLCBoZWlnaHQgb3JcbiAgICAvLyBsZWZ0LCB0b3AsIHJpZ2h0LCBib3R0b21cbiAgICBpZiAoJ3gnIGluIHJlc3RyaWN0aW9uICYmICd5JyBpbiByZXN0cmljdGlvbikge1xuICAgICAgbW9kaWZpZWRYID0gTWF0aC5tYXgoTWF0aC5taW4ocmVjdC54ICsgcmVjdC53aWR0aCAtIG9mZnNldC5yaWdodCwgcGFnZS54KSwgcmVjdC54ICsgb2Zmc2V0LmxlZnQpO1xuICAgICAgbW9kaWZpZWRZID0gTWF0aC5tYXgoTWF0aC5taW4ocmVjdC55ICsgcmVjdC5oZWlnaHQgLSBvZmZzZXQuYm90dG9tLCBwYWdlLnkpLCByZWN0LnkgKyBvZmZzZXQudG9wKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbW9kaWZpZWRYID0gTWF0aC5tYXgoTWF0aC5taW4ocmVjdC5yaWdodCAtIG9mZnNldC5yaWdodCwgcGFnZS54KSwgcmVjdC5sZWZ0ICsgb2Zmc2V0LmxlZnQpO1xuICAgICAgbW9kaWZpZWRZID0gTWF0aC5tYXgoTWF0aC5taW4ocmVjdC5ib3R0b20gLSBvZmZzZXQuYm90dG9tLCBwYWdlLnkpLCByZWN0LnRvcCArIG9mZnNldC50b3ApO1xuICAgIH1cblxuICAgIHN0YXR1cy5keCA9IG1vZGlmaWVkWCAtIHBhZ2UueDtcbiAgICBzdGF0dXMuZHkgPSBtb2RpZmllZFkgLSBwYWdlLnk7XG5cbiAgICBzdGF0dXMuY2hhbmdlZCA9IHN0YXR1cy5tb2RpZmllZFggIT09IG1vZGlmaWVkWCB8fCBzdGF0dXMubW9kaWZpZWRZICE9PSBtb2RpZmllZFk7XG4gICAgc3RhdHVzLmxvY2tlZCA9ICEhKHN0YXR1cy5keCB8fCBzdGF0dXMuZHkpO1xuXG4gICAgc3RhdHVzLm1vZGlmaWVkWCA9IG1vZGlmaWVkWDtcbiAgICBzdGF0dXMubW9kaWZpZWRZID0gbW9kaWZpZWRZO1xuICB9LFxuXG4gIG1vZGlmeUNvb3JkczogZnVuY3Rpb24gbW9kaWZ5Q29vcmRzKF9yZWYzKSB7XG4gICAgdmFyIHBhZ2UgPSBfcmVmMy5wYWdlLFxuICAgICAgICBjbGllbnQgPSBfcmVmMy5jbGllbnQsXG4gICAgICAgIHN0YXR1cyA9IF9yZWYzLnN0YXR1cyxcbiAgICAgICAgcGhhc2UgPSBfcmVmMy5waGFzZSxcbiAgICAgICAgb3B0aW9ucyA9IF9yZWYzLm9wdGlvbnM7XG5cbiAgICB2YXIgZWxlbWVudFJlY3QgPSBvcHRpb25zICYmIG9wdGlvbnMuZWxlbWVudFJlY3Q7XG5cbiAgICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLmVuYWJsZWQgJiYgIShwaGFzZSA9PT0gJ3N0YXJ0JyAmJiBlbGVtZW50UmVjdCAmJiBzdGF0dXMubG9ja2VkKSkge1xuXG4gICAgICBpZiAoc3RhdHVzLmxvY2tlZCkge1xuICAgICAgICBwYWdlLnggKz0gc3RhdHVzLmR4O1xuICAgICAgICBwYWdlLnkgKz0gc3RhdHVzLmR5O1xuICAgICAgICBjbGllbnQueCArPSBzdGF0dXMuZHg7XG4gICAgICAgIGNsaWVudC55ICs9IHN0YXR1cy5keTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGR4OiBzdGF0dXMuZHgsXG4gICAgICAgICAgZHk6IHN0YXR1cy5keVxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICBnZXRSZXN0cmljdGlvblJlY3Q6IGdldFJlc3RyaWN0aW9uUmVjdFxufTtcblxuZnVuY3Rpb24gZ2V0UmVzdHJpY3Rpb25SZWN0KHZhbHVlLCBpbnRlcmFjdGlvbiwgcGFnZSkge1xuICBpZiAodXRpbHMuaXMuZnVuY3Rpb24odmFsdWUpKSB7XG4gICAgcmV0dXJuIHV0aWxzLnJlc29sdmVSZWN0TGlrZSh2YWx1ZSwgaW50ZXJhY3Rpb24udGFyZ2V0LCBpbnRlcmFjdGlvbi5lbGVtZW50LCBbcGFnZS54LCBwYWdlLnksIGludGVyYWN0aW9uXSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHV0aWxzLnJlc29sdmVSZWN0TGlrZSh2YWx1ZSwgaW50ZXJhY3Rpb24udGFyZ2V0LCBpbnRlcmFjdGlvbi5lbGVtZW50KTtcbiAgfVxufVxuXG5tb2RpZmllcnMucmVzdHJpY3QgPSByZXN0cmljdDtcbm1vZGlmaWVycy5uYW1lcy5wdXNoKCdyZXN0cmljdCcpO1xuXG5kZWZhdWx0T3B0aW9ucy5wZXJBY3Rpb24ucmVzdHJpY3QgPSByZXN0cmljdC5kZWZhdWx0cztcblxubW9kdWxlLmV4cG9ydHMgPSByZXN0cmljdDtcblxufSx7XCIuLi9kZWZhdWx0T3B0aW9uc1wiOjE4LFwiLi4vdXRpbHNcIjo0NCxcIi4vYmFzZVwiOjIzfV0sMjU6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG4vLyBUaGlzIG1vZHVsZSBhZGRzIHRoZSBvcHRpb25zLnJlc2l6ZS5yZXN0cmljdEVkZ2VzIHNldHRpbmcgd2hpY2ggc2V0cyBtaW4gYW5kXG4vLyBtYXggZm9yIHRoZSB0b3AsIGxlZnQsIGJvdHRvbSBhbmQgcmlnaHQgZWRnZXMgb2YgdGhlIHRhcmdldCBiZWluZyByZXNpemVkLlxuLy9cbi8vIGludGVyYWN0KHRhcmdldCkucmVzaXplKHtcbi8vICAgZWRnZXM6IHsgdG9wOiB0cnVlLCBsZWZ0OiB0cnVlIH0sXG4vLyAgIHJlc3RyaWN0RWRnZXM6IHtcbi8vICAgICBpbm5lcjogeyB0b3A6IDIwMCwgbGVmdDogMjAwLCByaWdodDogNDAwLCBib3R0b206IDQwMCB9LFxuLy8gICAgIG91dGVyOiB7IHRvcDogICAwLCBsZWZ0OiAgIDAsIHJpZ2h0OiA2MDAsIGJvdHRvbTogNjAwIH0sXG4vLyAgIH0sXG4vLyB9KTtcblxudmFyIG1vZGlmaWVycyA9IHJlcXVpcmUoJy4vYmFzZScpO1xudmFyIHV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMnKTtcbnZhciByZWN0VXRpbHMgPSByZXF1aXJlKCcuLi91dGlscy9yZWN0Jyk7XG52YXIgZGVmYXVsdE9wdGlvbnMgPSByZXF1aXJlKCcuLi9kZWZhdWx0T3B0aW9ucycpO1xudmFyIHJlc2l6ZSA9IHJlcXVpcmUoJy4uL2FjdGlvbnMvcmVzaXplJyk7XG5cbnZhciBfcmVxdWlyZSA9IHJlcXVpcmUoJy4vcmVzdHJpY3QnKSxcbiAgICBnZXRSZXN0cmljdGlvblJlY3QgPSBfcmVxdWlyZS5nZXRSZXN0cmljdGlvblJlY3Q7XG5cbnZhciBub0lubmVyID0geyB0b3A6ICtJbmZpbml0eSwgbGVmdDogK0luZmluaXR5LCBib3R0b206IC1JbmZpbml0eSwgcmlnaHQ6IC1JbmZpbml0eSB9O1xudmFyIG5vT3V0ZXIgPSB7IHRvcDogLUluZmluaXR5LCBsZWZ0OiAtSW5maW5pdHksIGJvdHRvbTogK0luZmluaXR5LCByaWdodDogK0luZmluaXR5IH07XG5cbnZhciByZXN0cmljdEVkZ2VzID0ge1xuICBkZWZhdWx0czoge1xuICAgIGVuYWJsZWQ6IGZhbHNlLFxuICAgIGVuZE9ubHk6IGZhbHNlLFxuICAgIG1pbjogbnVsbCxcbiAgICBtYXg6IG51bGwsXG4gICAgb2Zmc2V0OiBudWxsXG4gIH0sXG5cbiAgc2V0T2Zmc2V0OiBmdW5jdGlvbiBzZXRPZmZzZXQoX3JlZikge1xuICAgIHZhciBpbnRlcmFjdGlvbiA9IF9yZWYuaW50ZXJhY3Rpb24sXG4gICAgICAgIHN0YXJ0T2Zmc2V0ID0gX3JlZi5zdGFydE9mZnNldCxcbiAgICAgICAgb3B0aW9ucyA9IF9yZWYub3B0aW9ucztcblxuICAgIGlmICghb3B0aW9ucykge1xuICAgICAgcmV0dXJuIHV0aWxzLmV4dGVuZCh7fSwgc3RhcnRPZmZzZXQpO1xuICAgIH1cblxuICAgIHZhciBvZmZzZXQgPSBnZXRSZXN0cmljdGlvblJlY3Qob3B0aW9ucy5vZmZzZXQsIGludGVyYWN0aW9uLCBpbnRlcmFjdGlvbi5zdGFydENvb3Jkcy5wYWdlKTtcblxuICAgIGlmIChvZmZzZXQpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHRvcDogc3RhcnRPZmZzZXQudG9wICsgb2Zmc2V0LnksXG4gICAgICAgIGxlZnQ6IHN0YXJ0T2Zmc2V0LmxlZnQgKyBvZmZzZXQueCxcbiAgICAgICAgYm90dG9tOiBzdGFydE9mZnNldC5ib3R0b20gKyBvZmZzZXQueSxcbiAgICAgICAgcmlnaHQ6IHN0YXJ0T2Zmc2V0LnJpZ2h0ICsgb2Zmc2V0LnhcbiAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIHN0YXJ0T2Zmc2V0O1xuICB9LFxuXG4gIHNldDogZnVuY3Rpb24gc2V0KF9yZWYyKSB7XG4gICAgdmFyIG1vZGlmaWVkQ29vcmRzID0gX3JlZjIubW9kaWZpZWRDb29yZHMsXG4gICAgICAgIGludGVyYWN0aW9uID0gX3JlZjIuaW50ZXJhY3Rpb24sXG4gICAgICAgIHN0YXR1cyA9IF9yZWYyLnN0YXR1cyxcbiAgICAgICAgb2Zmc2V0ID0gX3JlZjIub2Zmc2V0LFxuICAgICAgICBvcHRpb25zID0gX3JlZjIub3B0aW9ucztcblxuICAgIHZhciBlZGdlcyA9IGludGVyYWN0aW9uLnByZXBhcmVkLmxpbmtlZEVkZ2VzIHx8IGludGVyYWN0aW9uLnByZXBhcmVkLmVkZ2VzO1xuXG4gICAgaWYgKCFpbnRlcmFjdGlvbi5pbnRlcmFjdGluZygpIHx8ICFlZGdlcykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciBwYWdlID0gc3RhdHVzLnVzZVN0YXR1c1hZID8geyB4OiBzdGF0dXMueCwgeTogc3RhdHVzLnkgfSA6IHV0aWxzLmV4dGVuZCh7fSwgbW9kaWZpZWRDb29yZHMpO1xuICAgIHZhciBpbm5lciA9IHJlY3RVdGlscy54eXdoVG9UbGJyKGdldFJlc3RyaWN0aW9uUmVjdChvcHRpb25zLmlubmVyLCBpbnRlcmFjdGlvbiwgcGFnZSkpIHx8IG5vSW5uZXI7XG4gICAgdmFyIG91dGVyID0gcmVjdFV0aWxzLnh5d2hUb1RsYnIoZ2V0UmVzdHJpY3Rpb25SZWN0KG9wdGlvbnMub3V0ZXIsIGludGVyYWN0aW9uLCBwYWdlKSkgfHwgbm9PdXRlcjtcblxuICAgIHZhciBtb2RpZmllZFggPSBwYWdlLng7XG4gICAgdmFyIG1vZGlmaWVkWSA9IHBhZ2UueTtcblxuICAgIHN0YXR1cy5keCA9IDA7XG4gICAgc3RhdHVzLmR5ID0gMDtcbiAgICBzdGF0dXMubG9ja2VkID0gZmFsc2U7XG5cbiAgICBpZiAoZWRnZXMudG9wKSB7XG4gICAgICBtb2RpZmllZFkgPSBNYXRoLm1pbihNYXRoLm1heChvdXRlci50b3AgKyBvZmZzZXQudG9wLCBwYWdlLnkpLCBpbm5lci50b3AgKyBvZmZzZXQudG9wKTtcbiAgICB9IGVsc2UgaWYgKGVkZ2VzLmJvdHRvbSkge1xuICAgICAgbW9kaWZpZWRZID0gTWF0aC5tYXgoTWF0aC5taW4ob3V0ZXIuYm90dG9tIC0gb2Zmc2V0LmJvdHRvbSwgcGFnZS55KSwgaW5uZXIuYm90dG9tIC0gb2Zmc2V0LmJvdHRvbSk7XG4gICAgfVxuICAgIGlmIChlZGdlcy5sZWZ0KSB7XG4gICAgICBtb2RpZmllZFggPSBNYXRoLm1pbihNYXRoLm1heChvdXRlci5sZWZ0ICsgb2Zmc2V0LmxlZnQsIHBhZ2UueCksIGlubmVyLmxlZnQgKyBvZmZzZXQubGVmdCk7XG4gICAgfSBlbHNlIGlmIChlZGdlcy5yaWdodCkge1xuICAgICAgbW9kaWZpZWRYID0gTWF0aC5tYXgoTWF0aC5taW4ob3V0ZXIucmlnaHQgLSBvZmZzZXQucmlnaHQsIHBhZ2UueCksIGlubmVyLnJpZ2h0IC0gb2Zmc2V0LnJpZ2h0KTtcbiAgICB9XG5cbiAgICBzdGF0dXMuZHggPSBtb2RpZmllZFggLSBwYWdlLng7XG4gICAgc3RhdHVzLmR5ID0gbW9kaWZpZWRZIC0gcGFnZS55O1xuXG4gICAgc3RhdHVzLmNoYW5nZWQgPSBzdGF0dXMubW9kaWZpZWRYICE9PSBtb2RpZmllZFggfHwgc3RhdHVzLm1vZGlmaWVkWSAhPT0gbW9kaWZpZWRZO1xuICAgIHN0YXR1cy5sb2NrZWQgPSAhIShzdGF0dXMuZHggfHwgc3RhdHVzLmR5KTtcblxuICAgIHN0YXR1cy5tb2RpZmllZFggPSBtb2RpZmllZFg7XG4gICAgc3RhdHVzLm1vZGlmaWVkWSA9IG1vZGlmaWVkWTtcbiAgfSxcblxuICBtb2RpZnlDb29yZHM6IGZ1bmN0aW9uIG1vZGlmeUNvb3JkcyhfcmVmMykge1xuICAgIHZhciBwYWdlID0gX3JlZjMucGFnZSxcbiAgICAgICAgY2xpZW50ID0gX3JlZjMuY2xpZW50LFxuICAgICAgICBzdGF0dXMgPSBfcmVmMy5zdGF0dXMsXG4gICAgICAgIHBoYXNlID0gX3JlZjMucGhhc2UsXG4gICAgICAgIG9wdGlvbnMgPSBfcmVmMy5vcHRpb25zO1xuXG4gICAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5lbmFibGVkICYmICEocGhhc2UgPT09ICdzdGFydCcgJiYgc3RhdHVzLmxvY2tlZCkpIHtcblxuICAgICAgaWYgKHN0YXR1cy5sb2NrZWQpIHtcbiAgICAgICAgcGFnZS54ICs9IHN0YXR1cy5keDtcbiAgICAgICAgcGFnZS55ICs9IHN0YXR1cy5keTtcbiAgICAgICAgY2xpZW50LnggKz0gc3RhdHVzLmR4O1xuICAgICAgICBjbGllbnQueSArPSBzdGF0dXMuZHk7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBkeDogc3RhdHVzLmR4LFxuICAgICAgICAgIGR5OiBzdGF0dXMuZHlcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgbm9Jbm5lcjogbm9Jbm5lcixcbiAgbm9PdXRlcjogbm9PdXRlcixcbiAgZ2V0UmVzdHJpY3Rpb25SZWN0OiBnZXRSZXN0cmljdGlvblJlY3Rcbn07XG5cbm1vZGlmaWVycy5yZXN0cmljdEVkZ2VzID0gcmVzdHJpY3RFZGdlcztcbm1vZGlmaWVycy5uYW1lcy5wdXNoKCdyZXN0cmljdEVkZ2VzJyk7XG5cbmRlZmF1bHRPcHRpb25zLnBlckFjdGlvbi5yZXN0cmljdEVkZ2VzID0gcmVzdHJpY3RFZGdlcy5kZWZhdWx0cztcbnJlc2l6ZS5kZWZhdWx0cy5yZXN0cmljdEVkZ2VzID0gcmVzdHJpY3RFZGdlcy5kZWZhdWx0cztcblxubW9kdWxlLmV4cG9ydHMgPSByZXN0cmljdEVkZ2VzO1xuXG59LHtcIi4uL2FjdGlvbnMvcmVzaXplXCI6MTAsXCIuLi9kZWZhdWx0T3B0aW9uc1wiOjE4LFwiLi4vdXRpbHNcIjo0NCxcIi4uL3V0aWxzL3JlY3RcIjo1MSxcIi4vYmFzZVwiOjIzLFwiLi9yZXN0cmljdFwiOjI0fV0sMjY6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG4vLyBUaGlzIG1vZHVsZSBhZGRzIHRoZSBvcHRpb25zLnJlc2l6ZS5yZXN0cmljdFNpemUgc2V0dGluZyB3aGljaCBzZXRzIG1pbiBhbmRcbi8vIG1heCB3aWR0aCBhbmQgaGVpZ2h0IGZvciB0aGUgdGFyZ2V0IGJlaW5nIHJlc2l6ZWQuXG4vL1xuLy8gaW50ZXJhY3QodGFyZ2V0KS5yZXNpemUoe1xuLy8gICBlZGdlczogeyB0b3A6IHRydWUsIGxlZnQ6IHRydWUgfSxcbi8vICAgcmVzdHJpY3RTaXplOiB7XG4vLyAgICAgbWluOiB7IHdpZHRoOiAtNjAwLCBoZWlnaHQ6IC02MDAgfSxcbi8vICAgICBtYXg6IHsgd2lkdGg6ICA2MDAsIGhlaWdodDogIDYwMCB9LFxuLy8gICB9LFxuLy8gfSk7XG5cbnZhciBtb2RpZmllcnMgPSByZXF1aXJlKCcuL2Jhc2UnKTtcbnZhciByZXN0cmljdEVkZ2VzID0gcmVxdWlyZSgnLi9yZXN0cmljdEVkZ2VzJyk7XG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpO1xudmFyIHJlY3RVdGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzL3JlY3QnKTtcbnZhciBkZWZhdWx0T3B0aW9ucyA9IHJlcXVpcmUoJy4uL2RlZmF1bHRPcHRpb25zJyk7XG52YXIgcmVzaXplID0gcmVxdWlyZSgnLi4vYWN0aW9ucy9yZXNpemUnKTtcblxudmFyIG5vTWluID0geyB3aWR0aDogLUluZmluaXR5LCBoZWlnaHQ6IC1JbmZpbml0eSB9O1xudmFyIG5vTWF4ID0geyB3aWR0aDogK0luZmluaXR5LCBoZWlnaHQ6ICtJbmZpbml0eSB9O1xuXG52YXIgcmVzdHJpY3RTaXplID0ge1xuICBkZWZhdWx0czoge1xuICAgIGVuYWJsZWQ6IGZhbHNlLFxuICAgIGVuZE9ubHk6IGZhbHNlLFxuICAgIG1pbjogbnVsbCxcbiAgICBtYXg6IG51bGxcbiAgfSxcblxuICBzZXRPZmZzZXQ6IGZ1bmN0aW9uIHNldE9mZnNldChfcmVmKSB7XG4gICAgdmFyIGludGVyYWN0aW9uID0gX3JlZi5pbnRlcmFjdGlvbjtcblxuICAgIHJldHVybiBpbnRlcmFjdGlvbi5zdGFydE9mZnNldDtcbiAgfSxcblxuICBzZXQ6IGZ1bmN0aW9uIHNldChhcmcpIHtcbiAgICB2YXIgaW50ZXJhY3Rpb24gPSBhcmcuaW50ZXJhY3Rpb24sXG4gICAgICAgIG9wdGlvbnMgPSBhcmcub3B0aW9ucztcblxuICAgIHZhciBlZGdlcyA9IGludGVyYWN0aW9uLnByZXBhcmVkLmxpbmtlZEVkZ2VzIHx8IGludGVyYWN0aW9uLnByZXBhcmVkLmVkZ2VzO1xuXG4gICAgaWYgKCFpbnRlcmFjdGlvbi5pbnRlcmFjdGluZygpIHx8ICFlZGdlcykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciByZWN0ID0gcmVjdFV0aWxzLnh5d2hUb1RsYnIoaW50ZXJhY3Rpb24ucmVzaXplUmVjdHMuaW52ZXJ0ZWQpO1xuXG4gICAgdmFyIG1pblNpemUgPSByZWN0VXRpbHMudGxiclRvWHl3aChyZXN0cmljdEVkZ2VzLmdldFJlc3RyaWN0aW9uUmVjdChvcHRpb25zLm1pbiwgaW50ZXJhY3Rpb24pKSB8fCBub01pbjtcbiAgICB2YXIgbWF4U2l6ZSA9IHJlY3RVdGlscy50bGJyVG9YeXdoKHJlc3RyaWN0RWRnZXMuZ2V0UmVzdHJpY3Rpb25SZWN0KG9wdGlvbnMubWF4LCBpbnRlcmFjdGlvbikpIHx8IG5vTWF4O1xuXG4gICAgYXJnLm9wdGlvbnMgPSB7XG4gICAgICBlbmFibGVkOiBvcHRpb25zLmVuYWJsZWQsXG4gICAgICBlbmRPbmx5OiBvcHRpb25zLmVuZE9ubHksXG4gICAgICBpbm5lcjogdXRpbHMuZXh0ZW5kKHt9LCByZXN0cmljdEVkZ2VzLm5vSW5uZXIpLFxuICAgICAgb3V0ZXI6IHV0aWxzLmV4dGVuZCh7fSwgcmVzdHJpY3RFZGdlcy5ub091dGVyKVxuICAgIH07XG5cbiAgICBpZiAoZWRnZXMudG9wKSB7XG4gICAgICBhcmcub3B0aW9ucy5pbm5lci50b3AgPSByZWN0LmJvdHRvbSAtIG1pblNpemUuaGVpZ2h0O1xuICAgICAgYXJnLm9wdGlvbnMub3V0ZXIudG9wID0gcmVjdC5ib3R0b20gLSBtYXhTaXplLmhlaWdodDtcbiAgICB9IGVsc2UgaWYgKGVkZ2VzLmJvdHRvbSkge1xuICAgICAgYXJnLm9wdGlvbnMuaW5uZXIuYm90dG9tID0gcmVjdC50b3AgKyBtaW5TaXplLmhlaWdodDtcbiAgICAgIGFyZy5vcHRpb25zLm91dGVyLmJvdHRvbSA9IHJlY3QudG9wICsgbWF4U2l6ZS5oZWlnaHQ7XG4gICAgfVxuICAgIGlmIChlZGdlcy5sZWZ0KSB7XG4gICAgICBhcmcub3B0aW9ucy5pbm5lci5sZWZ0ID0gcmVjdC5yaWdodCAtIG1pblNpemUud2lkdGg7XG4gICAgICBhcmcub3B0aW9ucy5vdXRlci5sZWZ0ID0gcmVjdC5yaWdodCAtIG1heFNpemUud2lkdGg7XG4gICAgfSBlbHNlIGlmIChlZGdlcy5yaWdodCkge1xuICAgICAgYXJnLm9wdGlvbnMuaW5uZXIucmlnaHQgPSByZWN0LmxlZnQgKyBtaW5TaXplLndpZHRoO1xuICAgICAgYXJnLm9wdGlvbnMub3V0ZXIucmlnaHQgPSByZWN0LmxlZnQgKyBtYXhTaXplLndpZHRoO1xuICAgIH1cblxuICAgIHJlc3RyaWN0RWRnZXMuc2V0KGFyZyk7XG4gIH0sXG5cbiAgbW9kaWZ5Q29vcmRzOiByZXN0cmljdEVkZ2VzLm1vZGlmeUNvb3Jkc1xufTtcblxubW9kaWZpZXJzLnJlc3RyaWN0U2l6ZSA9IHJlc3RyaWN0U2l6ZTtcbm1vZGlmaWVycy5uYW1lcy5wdXNoKCdyZXN0cmljdFNpemUnKTtcblxuZGVmYXVsdE9wdGlvbnMucGVyQWN0aW9uLnJlc3RyaWN0U2l6ZSA9IHJlc3RyaWN0U2l6ZS5kZWZhdWx0cztcbnJlc2l6ZS5kZWZhdWx0cy5yZXN0cmljdFNpemUgPSByZXN0cmljdFNpemUuZGVmYXVsdHM7XG5cbm1vZHVsZS5leHBvcnRzID0gcmVzdHJpY3RTaXplO1xuXG59LHtcIi4uL2FjdGlvbnMvcmVzaXplXCI6MTAsXCIuLi9kZWZhdWx0T3B0aW9uc1wiOjE4LFwiLi4vdXRpbHNcIjo0NCxcIi4uL3V0aWxzL3JlY3RcIjo1MSxcIi4vYmFzZVwiOjIzLFwiLi9yZXN0cmljdEVkZ2VzXCI6MjV9XSwyNzpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4ndXNlIHN0cmljdCc7XG5cbnZhciBtb2RpZmllcnMgPSByZXF1aXJlKCcuL2Jhc2UnKTtcbnZhciBpbnRlcmFjdCA9IHJlcXVpcmUoJy4uL2ludGVyYWN0Jyk7XG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpO1xudmFyIGRlZmF1bHRPcHRpb25zID0gcmVxdWlyZSgnLi4vZGVmYXVsdE9wdGlvbnMnKTtcblxudmFyIHNuYXAgPSB7XG4gIGRlZmF1bHRzOiB7XG4gICAgZW5hYmxlZDogZmFsc2UsXG4gICAgZW5kT25seTogZmFsc2UsXG4gICAgcmFuZ2U6IEluZmluaXR5LFxuICAgIHRhcmdldHM6IG51bGwsXG4gICAgb2Zmc2V0czogbnVsbCxcblxuICAgIHJlbGF0aXZlUG9pbnRzOiBudWxsXG4gIH0sXG5cbiAgc2V0T2Zmc2V0OiBmdW5jdGlvbiBzZXRPZmZzZXQoX3JlZikge1xuICAgIHZhciBpbnRlcmFjdGlvbiA9IF9yZWYuaW50ZXJhY3Rpb24sXG4gICAgICAgIGludGVyYWN0YWJsZSA9IF9yZWYuaW50ZXJhY3RhYmxlLFxuICAgICAgICBlbGVtZW50ID0gX3JlZi5lbGVtZW50LFxuICAgICAgICByZWN0ID0gX3JlZi5yZWN0LFxuICAgICAgICBzdGFydE9mZnNldCA9IF9yZWYuc3RhcnRPZmZzZXQsXG4gICAgICAgIG9wdGlvbnMgPSBfcmVmLm9wdGlvbnM7XG5cbiAgICB2YXIgb2Zmc2V0cyA9IFtdO1xuICAgIHZhciBvcHRpb25zT3JpZ2luID0gdXRpbHMucmVjdFRvWFkodXRpbHMucmVzb2x2ZVJlY3RMaWtlKG9wdGlvbnMub3JpZ2luKSk7XG4gICAgdmFyIG9yaWdpbiA9IG9wdGlvbnNPcmlnaW4gfHwgdXRpbHMuZ2V0T3JpZ2luWFkoaW50ZXJhY3RhYmxlLCBlbGVtZW50LCBpbnRlcmFjdGlvbi5wcmVwYXJlZC5uYW1lKTtcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCBpbnRlcmFjdGFibGUub3B0aW9uc1tpbnRlcmFjdGlvbi5wcmVwYXJlZC5uYW1lXS5zbmFwIHx8IHt9O1xuXG4gICAgdmFyIHNuYXBPZmZzZXQgPSB2b2lkIDA7XG5cbiAgICBpZiAob3B0aW9ucy5vZmZzZXQgPT09ICdzdGFydENvb3JkcycpIHtcbiAgICAgIHNuYXBPZmZzZXQgPSB7XG4gICAgICAgIHg6IGludGVyYWN0aW9uLnN0YXJ0Q29vcmRzLnBhZ2UueCAtIG9yaWdpbi54LFxuICAgICAgICB5OiBpbnRlcmFjdGlvbi5zdGFydENvb3Jkcy5wYWdlLnkgLSBvcmlnaW4ueVxuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIG9mZnNldFJlY3QgPSB1dGlscy5yZXNvbHZlUmVjdExpa2Uob3B0aW9ucy5vZmZzZXQsIGludGVyYWN0YWJsZSwgZWxlbWVudCwgW2ludGVyYWN0aW9uXSk7XG5cbiAgICAgIHNuYXBPZmZzZXQgPSB1dGlscy5yZWN0VG9YWShvZmZzZXRSZWN0KSB8fCB7IHg6IDAsIHk6IDAgfTtcbiAgICB9XG5cbiAgICBpZiAocmVjdCAmJiBvcHRpb25zLnJlbGF0aXZlUG9pbnRzICYmIG9wdGlvbnMucmVsYXRpdmVQb2ludHMubGVuZ3RoKSB7XG4gICAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgb3B0aW9ucy5yZWxhdGl2ZVBvaW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgdmFyIF9yZWYzO1xuXG4gICAgICAgIF9yZWYzID0gb3B0aW9ucy5yZWxhdGl2ZVBvaW50c1tfaV07XG4gICAgICAgIHZhciBfcmVmMiA9IF9yZWYzO1xuICAgICAgICB2YXIgcmVsYXRpdmVYID0gX3JlZjIueDtcbiAgICAgICAgdmFyIHJlbGF0aXZlWSA9IF9yZWYyLnk7XG5cbiAgICAgICAgb2Zmc2V0cy5wdXNoKHtcbiAgICAgICAgICB4OiBzdGFydE9mZnNldC5sZWZ0IC0gcmVjdC53aWR0aCAqIHJlbGF0aXZlWCArIHNuYXBPZmZzZXQueCxcbiAgICAgICAgICB5OiBzdGFydE9mZnNldC50b3AgLSByZWN0LmhlaWdodCAqIHJlbGF0aXZlWSArIHNuYXBPZmZzZXQueVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgb2Zmc2V0cy5wdXNoKHNuYXBPZmZzZXQpO1xuICAgIH1cblxuICAgIHJldHVybiBvZmZzZXRzO1xuICB9LFxuXG4gIHNldDogZnVuY3Rpb24gc2V0KF9yZWY0KSB7XG4gICAgdmFyIGludGVyYWN0aW9uID0gX3JlZjQuaW50ZXJhY3Rpb24sXG4gICAgICAgIG1vZGlmaWVkQ29vcmRzID0gX3JlZjQubW9kaWZpZWRDb29yZHMsXG4gICAgICAgIHN0YXR1cyA9IF9yZWY0LnN0YXR1cyxcbiAgICAgICAgb3B0aW9ucyA9IF9yZWY0Lm9wdGlvbnMsXG4gICAgICAgIG9mZnNldHMgPSBfcmVmNC5vZmZzZXQ7XG5cbiAgICB2YXIgdGFyZ2V0cyA9IFtdO1xuICAgIHZhciB0YXJnZXQgPSB2b2lkIDA7XG4gICAgdmFyIHBhZ2UgPSB2b2lkIDA7XG4gICAgdmFyIGkgPSB2b2lkIDA7XG5cbiAgICBpZiAoc3RhdHVzLnVzZVN0YXR1c1hZKSB7XG4gICAgICBwYWdlID0geyB4OiBzdGF0dXMueCwgeTogc3RhdHVzLnkgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIG9yaWdpbiA9IHV0aWxzLmdldE9yaWdpblhZKGludGVyYWN0aW9uLnRhcmdldCwgaW50ZXJhY3Rpb24uZWxlbWVudCwgaW50ZXJhY3Rpb24ucHJlcGFyZWQubmFtZSk7XG5cbiAgICAgIHBhZ2UgPSB1dGlscy5leHRlbmQoe30sIG1vZGlmaWVkQ29vcmRzKTtcblxuICAgICAgcGFnZS54IC09IG9yaWdpbi54O1xuICAgICAgcGFnZS55IC09IG9yaWdpbi55O1xuICAgIH1cblxuICAgIHN0YXR1cy5yZWFsWCA9IHBhZ2UueDtcbiAgICBzdGF0dXMucmVhbFkgPSBwYWdlLnk7XG5cbiAgICB2YXIgbGVuID0gb3B0aW9ucy50YXJnZXRzID8gb3B0aW9ucy50YXJnZXRzLmxlbmd0aCA6IDA7XG5cbiAgICBmb3IgKHZhciBfaTIgPSAwOyBfaTIgPCBvZmZzZXRzLmxlbmd0aDsgX2kyKyspIHtcbiAgICAgIHZhciBfcmVmNjtcblxuICAgICAgX3JlZjYgPSBvZmZzZXRzW19pMl07XG4gICAgICB2YXIgX3JlZjUgPSBfcmVmNjtcbiAgICAgIHZhciBvZmZzZXRYID0gX3JlZjUueDtcbiAgICAgIHZhciBvZmZzZXRZID0gX3JlZjUueTtcblxuICAgICAgdmFyIHJlbGF0aXZlWCA9IHBhZ2UueCAtIG9mZnNldFg7XG4gICAgICB2YXIgcmVsYXRpdmVZID0gcGFnZS55IC0gb2Zmc2V0WTtcblxuICAgICAgZm9yICh2YXIgX2kzID0gMDsgX2kzIDwgKG9wdGlvbnMudGFyZ2V0cyB8fCBbXSkubGVuZ3RoOyBfaTMrKykge1xuICAgICAgICB2YXIgX3JlZjc7XG5cbiAgICAgICAgX3JlZjcgPSAob3B0aW9ucy50YXJnZXRzIHx8IFtdKVtfaTNdO1xuICAgICAgICB2YXIgc25hcFRhcmdldCA9IF9yZWY3O1xuXG4gICAgICAgIGlmICh1dGlscy5pcy5mdW5jdGlvbihzbmFwVGFyZ2V0KSkge1xuICAgICAgICAgIHRhcmdldCA9IHNuYXBUYXJnZXQocmVsYXRpdmVYLCByZWxhdGl2ZVksIGludGVyYWN0aW9uKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0YXJnZXQgPSBzbmFwVGFyZ2V0O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0YXJnZXQpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRhcmdldHMucHVzaCh7XG4gICAgICAgICAgeDogdXRpbHMuaXMubnVtYmVyKHRhcmdldC54KSA/IHRhcmdldC54ICsgb2Zmc2V0WCA6IHJlbGF0aXZlWCxcbiAgICAgICAgICB5OiB1dGlscy5pcy5udW1iZXIodGFyZ2V0LnkpID8gdGFyZ2V0LnkgKyBvZmZzZXRZIDogcmVsYXRpdmVZLFxuXG4gICAgICAgICAgcmFuZ2U6IHV0aWxzLmlzLm51bWJlcih0YXJnZXQucmFuZ2UpID8gdGFyZ2V0LnJhbmdlIDogb3B0aW9ucy5yYW5nZVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgY2xvc2VzdCA9IHtcbiAgICAgIHRhcmdldDogbnVsbCxcbiAgICAgIGluUmFuZ2U6IGZhbHNlLFxuICAgICAgZGlzdGFuY2U6IDAsXG4gICAgICByYW5nZTogMCxcbiAgICAgIGR4OiAwLFxuICAgICAgZHk6IDBcbiAgICB9O1xuXG4gICAgZm9yIChpID0gMCwgbGVuID0gdGFyZ2V0cy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgdGFyZ2V0ID0gdGFyZ2V0c1tpXTtcblxuICAgICAgdmFyIHJhbmdlID0gdGFyZ2V0LnJhbmdlO1xuICAgICAgdmFyIGR4ID0gdGFyZ2V0LnggLSBwYWdlLng7XG4gICAgICB2YXIgZHkgPSB0YXJnZXQueSAtIHBhZ2UueTtcbiAgICAgIHZhciBkaXN0YW5jZSA9IHV0aWxzLmh5cG90KGR4LCBkeSk7XG4gICAgICB2YXIgaW5SYW5nZSA9IGRpc3RhbmNlIDw9IHJhbmdlO1xuXG4gICAgICAvLyBJbmZpbml0ZSB0YXJnZXRzIGNvdW50IGFzIGJlaW5nIG91dCBvZiByYW5nZVxuICAgICAgLy8gY29tcGFyZWQgdG8gbm9uIGluZmluaXRlIG9uZXMgdGhhdCBhcmUgaW4gcmFuZ2VcbiAgICAgIGlmIChyYW5nZSA9PT0gSW5maW5pdHkgJiYgY2xvc2VzdC5pblJhbmdlICYmIGNsb3Nlc3QucmFuZ2UgIT09IEluZmluaXR5KSB7XG4gICAgICAgIGluUmFuZ2UgPSBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFjbG9zZXN0LnRhcmdldCB8fCAoaW5SYW5nZVxuICAgICAgLy8gaXMgdGhlIGNsb3Nlc3QgdGFyZ2V0IGluIHJhbmdlP1xuICAgICAgPyBjbG9zZXN0LmluUmFuZ2UgJiYgcmFuZ2UgIT09IEluZmluaXR5XG4gICAgICAvLyB0aGUgcG9pbnRlciBpcyByZWxhdGl2ZWx5IGRlZXBlciBpbiB0aGlzIHRhcmdldFxuICAgICAgPyBkaXN0YW5jZSAvIHJhbmdlIDwgY2xvc2VzdC5kaXN0YW5jZSAvIGNsb3Nlc3QucmFuZ2VcbiAgICAgIC8vIHRoaXMgdGFyZ2V0IGhhcyBJbmZpbml0ZSByYW5nZSBhbmQgdGhlIGNsb3Nlc3QgZG9lc24ndFxuICAgICAgOiByYW5nZSA9PT0gSW5maW5pdHkgJiYgY2xvc2VzdC5yYW5nZSAhPT0gSW5maW5pdHkgfHxcbiAgICAgIC8vIE9SIHRoaXMgdGFyZ2V0IGlzIGNsb3NlciB0aGF0IHRoZSBwcmV2aW91cyBjbG9zZXN0XG4gICAgICBkaXN0YW5jZSA8IGNsb3Nlc3QuZGlzdGFuY2UgOlxuICAgICAgLy8gVGhlIG90aGVyIGlzIG5vdCBpbiByYW5nZSBhbmQgdGhlIHBvaW50ZXIgaXMgY2xvc2VyIHRvIHRoaXMgdGFyZ2V0XG4gICAgICAhY2xvc2VzdC5pblJhbmdlICYmIGRpc3RhbmNlIDwgY2xvc2VzdC5kaXN0YW5jZSkpIHtcblxuICAgICAgICBjbG9zZXN0LnRhcmdldCA9IHRhcmdldDtcbiAgICAgICAgY2xvc2VzdC5kaXN0YW5jZSA9IGRpc3RhbmNlO1xuICAgICAgICBjbG9zZXN0LnJhbmdlID0gcmFuZ2U7XG4gICAgICAgIGNsb3Nlc3QuaW5SYW5nZSA9IGluUmFuZ2U7XG4gICAgICAgIGNsb3Nlc3QuZHggPSBkeDtcbiAgICAgICAgY2xvc2VzdC5keSA9IGR5O1xuXG4gICAgICAgIHN0YXR1cy5yYW5nZSA9IHJhbmdlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBzbmFwQ2hhbmdlZCA9IHZvaWQgMDtcblxuICAgIGlmIChjbG9zZXN0LnRhcmdldCkge1xuICAgICAgc25hcENoYW5nZWQgPSBzdGF0dXMubW9kaWZpZWRYICE9PSBjbG9zZXN0LnRhcmdldC54IHx8IHN0YXR1cy5tb2RpZmllZFkgIT09IGNsb3Nlc3QudGFyZ2V0Lnk7XG5cbiAgICAgIHN0YXR1cy5tb2RpZmllZFggPSBjbG9zZXN0LnRhcmdldC54O1xuICAgICAgc3RhdHVzLm1vZGlmaWVkWSA9IGNsb3Nlc3QudGFyZ2V0Lnk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNuYXBDaGFuZ2VkID0gdHJ1ZTtcblxuICAgICAgc3RhdHVzLm1vZGlmaWVkWCA9IE5hTjtcbiAgICAgIHN0YXR1cy5tb2RpZmllZFkgPSBOYU47XG4gICAgfVxuXG4gICAgc3RhdHVzLmR4ID0gY2xvc2VzdC5keDtcbiAgICBzdGF0dXMuZHkgPSBjbG9zZXN0LmR5O1xuXG4gICAgc3RhdHVzLmNoYW5nZWQgPSBzbmFwQ2hhbmdlZCB8fCBjbG9zZXN0LmluUmFuZ2UgJiYgIXN0YXR1cy5sb2NrZWQ7XG4gICAgc3RhdHVzLmxvY2tlZCA9IGNsb3Nlc3QuaW5SYW5nZTtcbiAgfSxcblxuICBtb2RpZnlDb29yZHM6IGZ1bmN0aW9uIG1vZGlmeUNvb3JkcyhfcmVmOCkge1xuICAgIHZhciBwYWdlID0gX3JlZjgucGFnZSxcbiAgICAgICAgY2xpZW50ID0gX3JlZjguY2xpZW50LFxuICAgICAgICBzdGF0dXMgPSBfcmVmOC5zdGF0dXMsXG4gICAgICAgIHBoYXNlID0gX3JlZjgucGhhc2UsXG4gICAgICAgIG9wdGlvbnMgPSBfcmVmOC5vcHRpb25zO1xuXG4gICAgdmFyIHJlbGF0aXZlUG9pbnRzID0gb3B0aW9ucyAmJiBvcHRpb25zLnJlbGF0aXZlUG9pbnRzO1xuXG4gICAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5lbmFibGVkICYmICEocGhhc2UgPT09ICdzdGFydCcgJiYgcmVsYXRpdmVQb2ludHMgJiYgcmVsYXRpdmVQb2ludHMubGVuZ3RoKSkge1xuXG4gICAgICBpZiAoc3RhdHVzLmxvY2tlZCkge1xuICAgICAgICBwYWdlLnggKz0gc3RhdHVzLmR4O1xuICAgICAgICBwYWdlLnkgKz0gc3RhdHVzLmR5O1xuICAgICAgICBjbGllbnQueCArPSBzdGF0dXMuZHg7XG4gICAgICAgIGNsaWVudC55ICs9IHN0YXR1cy5keTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcmFuZ2U6IHN0YXR1cy5yYW5nZSxcbiAgICAgICAgbG9ja2VkOiBzdGF0dXMubG9ja2VkLFxuICAgICAgICB4OiBzdGF0dXMubW9kaWZpZWRYLFxuICAgICAgICB5OiBzdGF0dXMubW9kaWZpZWRZLFxuICAgICAgICByZWFsWDogc3RhdHVzLnJlYWxYLFxuICAgICAgICByZWFsWTogc3RhdHVzLnJlYWxZLFxuICAgICAgICBkeDogc3RhdHVzLmR4LFxuICAgICAgICBkeTogc3RhdHVzLmR5XG4gICAgICB9O1xuICAgIH1cbiAgfVxufTtcblxuaW50ZXJhY3QuY3JlYXRlU25hcEdyaWQgPSBmdW5jdGlvbiAoZ3JpZCkge1xuICByZXR1cm4gZnVuY3Rpb24gKHgsIHkpIHtcbiAgICB2YXIgbGltaXRzID0gZ3JpZC5saW1pdHMgfHwge1xuICAgICAgbGVmdDogLUluZmluaXR5LFxuICAgICAgcmlnaHQ6IEluZmluaXR5LFxuICAgICAgdG9wOiAtSW5maW5pdHksXG4gICAgICBib3R0b206IEluZmluaXR5XG4gICAgfTtcbiAgICB2YXIgb2Zmc2V0WCA9IDA7XG4gICAgdmFyIG9mZnNldFkgPSAwO1xuXG4gICAgaWYgKHV0aWxzLmlzLm9iamVjdChncmlkLm9mZnNldCkpIHtcbiAgICAgIG9mZnNldFggPSBncmlkLm9mZnNldC54O1xuICAgICAgb2Zmc2V0WSA9IGdyaWQub2Zmc2V0Lnk7XG4gICAgfVxuXG4gICAgdmFyIGdyaWR4ID0gTWF0aC5yb3VuZCgoeCAtIG9mZnNldFgpIC8gZ3JpZC54KTtcbiAgICB2YXIgZ3JpZHkgPSBNYXRoLnJvdW5kKCh5IC0gb2Zmc2V0WSkgLyBncmlkLnkpO1xuXG4gICAgdmFyIG5ld1ggPSBNYXRoLm1heChsaW1pdHMubGVmdCwgTWF0aC5taW4obGltaXRzLnJpZ2h0LCBncmlkeCAqIGdyaWQueCArIG9mZnNldFgpKTtcbiAgICB2YXIgbmV3WSA9IE1hdGgubWF4KGxpbWl0cy50b3AsIE1hdGgubWluKGxpbWl0cy5ib3R0b20sIGdyaWR5ICogZ3JpZC55ICsgb2Zmc2V0WSkpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHg6IG5ld1gsXG4gICAgICB5OiBuZXdZLFxuICAgICAgcmFuZ2U6IGdyaWQucmFuZ2VcbiAgICB9O1xuICB9O1xufTtcblxubW9kaWZpZXJzLnNuYXAgPSBzbmFwO1xubW9kaWZpZXJzLm5hbWVzLnB1c2goJ3NuYXAnKTtcblxuZGVmYXVsdE9wdGlvbnMucGVyQWN0aW9uLnNuYXAgPSBzbmFwLmRlZmF1bHRzO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHNuYXA7XG5cbn0se1wiLi4vZGVmYXVsdE9wdGlvbnNcIjoxOCxcIi4uL2ludGVyYWN0XCI6MjEsXCIuLi91dGlsc1wiOjQ0LFwiLi9iYXNlXCI6MjN9XSwyODpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4ndXNlIHN0cmljdCc7XG5cbi8vIFRoaXMgbW9kdWxlIGFsbG93cyBzbmFwcGluZyBvZiB0aGUgc2l6ZSBvZiB0YXJnZXRzIGR1cmluZyByZXNpemVcbi8vIGludGVyYWN0aW9ucy5cblxudmFyIG1vZGlmaWVycyA9IHJlcXVpcmUoJy4vYmFzZScpO1xudmFyIHNuYXAgPSByZXF1aXJlKCcuL3NuYXAnKTtcbnZhciBkZWZhdWx0T3B0aW9ucyA9IHJlcXVpcmUoJy4uL2RlZmF1bHRPcHRpb25zJyk7XG52YXIgcmVzaXplID0gcmVxdWlyZSgnLi4vYWN0aW9ucy9yZXNpemUnKTtcbnZhciB1dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzLycpO1xuXG52YXIgc25hcFNpemUgPSB7XG4gIGRlZmF1bHRzOiB7XG4gICAgZW5hYmxlZDogZmFsc2UsXG4gICAgZW5kT25seTogZmFsc2UsXG4gICAgcmFuZ2U6IEluZmluaXR5LFxuICAgIHRhcmdldHM6IG51bGwsXG4gICAgb2Zmc2V0czogbnVsbFxuICB9LFxuXG4gIHNldE9mZnNldDogZnVuY3Rpb24gc2V0T2Zmc2V0KGFyZykge1xuICAgIHZhciBpbnRlcmFjdGlvbiA9IGFyZy5pbnRlcmFjdGlvbixcbiAgICAgICAgb3B0aW9ucyA9IGFyZy5vcHRpb25zO1xuXG4gICAgdmFyIGVkZ2VzID0gaW50ZXJhY3Rpb24ucHJlcGFyZWQuZWRnZXM7XG5cbiAgICBpZiAoIWVkZ2VzKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgYXJnLm9wdGlvbnMgPSB7XG4gICAgICByZWxhdGl2ZVBvaW50czogW3tcbiAgICAgICAgeDogZWRnZXMubGVmdCA/IDAgOiAxLFxuICAgICAgICB5OiBlZGdlcy50b3AgPyAwIDogMVxuICAgICAgfV0sXG4gICAgICBvcmlnaW46IHsgeDogMCwgeTogMCB9LFxuICAgICAgb2Zmc2V0OiAnc2VsZicsXG4gICAgICByYW5nZTogb3B0aW9ucy5yYW5nZVxuICAgIH07XG5cbiAgICB2YXIgb2Zmc2V0cyA9IHNuYXAuc2V0T2Zmc2V0KGFyZyk7XG4gICAgYXJnLm9wdGlvbnMgPSBvcHRpb25zO1xuXG4gICAgcmV0dXJuIG9mZnNldHM7XG4gIH0sXG5cbiAgc2V0OiBmdW5jdGlvbiBzZXQoYXJnKSB7XG4gICAgdmFyIGludGVyYWN0aW9uID0gYXJnLmludGVyYWN0aW9uLFxuICAgICAgICBvcHRpb25zID0gYXJnLm9wdGlvbnMsXG4gICAgICAgIG9mZnNldCA9IGFyZy5vZmZzZXQsXG4gICAgICAgIG1vZGlmaWVkQ29vcmRzID0gYXJnLm1vZGlmaWVkQ29vcmRzO1xuXG4gICAgdmFyIHBhZ2UgPSB1dGlscy5leHRlbmQoe30sIG1vZGlmaWVkQ29vcmRzKTtcbiAgICB2YXIgcmVsYXRpdmVYID0gcGFnZS54IC0gb2Zmc2V0WzBdLng7XG4gICAgdmFyIHJlbGF0aXZlWSA9IHBhZ2UueSAtIG9mZnNldFswXS55O1xuXG4gICAgYXJnLm9wdGlvbnMgPSB1dGlscy5leHRlbmQoe30sIG9wdGlvbnMpO1xuICAgIGFyZy5vcHRpb25zLnRhcmdldHMgPSBbXTtcblxuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCAob3B0aW9ucy50YXJnZXRzIHx8IFtdKS5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfcmVmO1xuXG4gICAgICBfcmVmID0gKG9wdGlvbnMudGFyZ2V0cyB8fCBbXSlbX2ldO1xuICAgICAgdmFyIHNuYXBUYXJnZXQgPSBfcmVmO1xuXG4gICAgICB2YXIgdGFyZ2V0ID0gdm9pZCAwO1xuXG4gICAgICBpZiAodXRpbHMuaXMuZnVuY3Rpb24oc25hcFRhcmdldCkpIHtcbiAgICAgICAgdGFyZ2V0ID0gc25hcFRhcmdldChyZWxhdGl2ZVgsIHJlbGF0aXZlWSwgaW50ZXJhY3Rpb24pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGFyZ2V0ID0gc25hcFRhcmdldDtcbiAgICAgIH1cblxuICAgICAgaWYgKCF0YXJnZXQpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmICgnd2lkdGgnIGluIHRhcmdldCAmJiAnaGVpZ2h0JyBpbiB0YXJnZXQpIHtcbiAgICAgICAgdGFyZ2V0LnggPSB0YXJnZXQud2lkdGg7XG4gICAgICAgIHRhcmdldC55ID0gdGFyZ2V0LmhlaWdodDtcbiAgICAgIH1cblxuICAgICAgYXJnLm9wdGlvbnMudGFyZ2V0cy5wdXNoKHRhcmdldCk7XG4gICAgfVxuXG4gICAgc25hcC5zZXQoYXJnKTtcbiAgfSxcblxuICBtb2RpZnlDb29yZHM6IGZ1bmN0aW9uIG1vZGlmeUNvb3JkcyhhcmcpIHtcbiAgICB2YXIgb3B0aW9ucyA9IGFyZy5vcHRpb25zO1xuXG5cbiAgICBhcmcub3B0aW9ucyA9IHV0aWxzLmV4dGVuZCh7fSwgb3B0aW9ucyk7XG4gICAgYXJnLm9wdGlvbnMuZW5hYmxlZCA9IG9wdGlvbnMuZW5hYmxlZDtcbiAgICBhcmcub3B0aW9ucy5yZWxhdGl2ZVBvaW50cyA9IFtudWxsXTtcblxuICAgIHNuYXAubW9kaWZ5Q29vcmRzKGFyZyk7XG4gIH1cbn07XG5cbm1vZGlmaWVycy5zbmFwU2l6ZSA9IHNuYXBTaXplO1xubW9kaWZpZXJzLm5hbWVzLnB1c2goJ3NuYXBTaXplJyk7XG5cbmRlZmF1bHRPcHRpb25zLnBlckFjdGlvbi5zbmFwU2l6ZSA9IHNuYXBTaXplLmRlZmF1bHRzO1xucmVzaXplLmRlZmF1bHRzLnNuYXBTaXplID0gc25hcFNpemUuZGVmYXVsdHM7XG5cbm1vZHVsZS5leHBvcnRzID0gc25hcFNpemU7XG5cbn0se1wiLi4vYWN0aW9ucy9yZXNpemVcIjoxMCxcIi4uL2RlZmF1bHRPcHRpb25zXCI6MTgsXCIuLi91dGlscy9cIjo0NCxcIi4vYmFzZVwiOjIzLFwiLi9zbmFwXCI6Mjd9XSwyOTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4ndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbnZhciBwb2ludGVyVXRpbHMgPSByZXF1aXJlKCcuLi91dGlscy9wb2ludGVyVXRpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoKSB7XG4gIC8qKiAqL1xuICBmdW5jdGlvbiBQb2ludGVyRXZlbnQodHlwZSwgcG9pbnRlciwgZXZlbnQsIGV2ZW50VGFyZ2V0LCBpbnRlcmFjdGlvbikge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBQb2ludGVyRXZlbnQpO1xuXG4gICAgcG9pbnRlclV0aWxzLnBvaW50ZXJFeHRlbmQodGhpcywgZXZlbnQpO1xuXG4gICAgaWYgKGV2ZW50ICE9PSBwb2ludGVyKSB7XG4gICAgICBwb2ludGVyVXRpbHMucG9pbnRlckV4dGVuZCh0aGlzLCBwb2ludGVyKTtcbiAgICB9XG5cbiAgICB0aGlzLmludGVyYWN0aW9uID0gaW50ZXJhY3Rpb247XG5cbiAgICB0aGlzLnRpbWVTdGFtcCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgIHRoaXMub3JpZ2luYWxFdmVudCA9IGV2ZW50O1xuICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgdGhpcy5wb2ludGVySWQgPSBwb2ludGVyVXRpbHMuZ2V0UG9pbnRlcklkKHBvaW50ZXIpO1xuICAgIHRoaXMucG9pbnRlclR5cGUgPSBwb2ludGVyVXRpbHMuZ2V0UG9pbnRlclR5cGUocG9pbnRlcik7XG4gICAgdGhpcy50YXJnZXQgPSBldmVudFRhcmdldDtcbiAgICB0aGlzLmN1cnJlbnRUYXJnZXQgPSBudWxsO1xuXG4gICAgaWYgKHR5cGUgPT09ICd0YXAnKSB7XG4gICAgICB2YXIgcG9pbnRlckluZGV4ID0gaW50ZXJhY3Rpb24uZ2V0UG9pbnRlckluZGV4KHBvaW50ZXIpO1xuICAgICAgdGhpcy5kdCA9IHRoaXMudGltZVN0YW1wIC0gaW50ZXJhY3Rpb24uZG93blRpbWVzW3BvaW50ZXJJbmRleF07XG5cbiAgICAgIHZhciBpbnRlcnZhbCA9IHRoaXMudGltZVN0YW1wIC0gaW50ZXJhY3Rpb24udGFwVGltZTtcblxuICAgICAgdGhpcy5kb3VibGUgPSAhIShpbnRlcmFjdGlvbi5wcmV2VGFwICYmIGludGVyYWN0aW9uLnByZXZUYXAudHlwZSAhPT0gJ2RvdWJsZXRhcCcgJiYgaW50ZXJhY3Rpb24ucHJldlRhcC50YXJnZXQgPT09IHRoaXMudGFyZ2V0ICYmIGludGVydmFsIDwgNTAwKTtcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdkb3VibGV0YXAnKSB7XG4gICAgICB0aGlzLmR0ID0gcG9pbnRlci50aW1lU3RhbXAgLSBpbnRlcmFjdGlvbi50YXBUaW1lO1xuICAgIH1cbiAgfVxuXG4gIFBvaW50ZXJFdmVudC5wcm90b3R5cGUuc3VidHJhY3RPcmlnaW4gPSBmdW5jdGlvbiBzdWJ0cmFjdE9yaWdpbihfcmVmKSB7XG4gICAgdmFyIG9yaWdpblggPSBfcmVmLngsXG4gICAgICAgIG9yaWdpblkgPSBfcmVmLnk7XG5cbiAgICB0aGlzLnBhZ2VYIC09IG9yaWdpblg7XG4gICAgdGhpcy5wYWdlWSAtPSBvcmlnaW5ZO1xuICAgIHRoaXMuY2xpZW50WCAtPSBvcmlnaW5YO1xuICAgIHRoaXMuY2xpZW50WSAtPSBvcmlnaW5ZO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgUG9pbnRlckV2ZW50LnByb3RvdHlwZS5hZGRPcmlnaW4gPSBmdW5jdGlvbiBhZGRPcmlnaW4oX3JlZjIpIHtcbiAgICB2YXIgb3JpZ2luWCA9IF9yZWYyLngsXG4gICAgICAgIG9yaWdpblkgPSBfcmVmMi55O1xuXG4gICAgdGhpcy5wYWdlWCArPSBvcmlnaW5YO1xuICAgIHRoaXMucGFnZVkgKz0gb3JpZ2luWTtcbiAgICB0aGlzLmNsaWVudFggKz0gb3JpZ2luWDtcbiAgICB0aGlzLmNsaWVudFkgKz0gb3JpZ2luWTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIC8qKiAqL1xuXG5cbiAgUG9pbnRlckV2ZW50LnByb3RvdHlwZS5wcmV2ZW50RGVmYXVsdCA9IGZ1bmN0aW9uIHByZXZlbnREZWZhdWx0KCkge1xuICAgIHRoaXMub3JpZ2luYWxFdmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICB9O1xuXG4gIC8qKiAqL1xuXG5cbiAgUG9pbnRlckV2ZW50LnByb3RvdHlwZS5zdG9wUHJvcGFnYXRpb24gPSBmdW5jdGlvbiBzdG9wUHJvcGFnYXRpb24oKSB7XG4gICAgdGhpcy5wcm9wYWdhdGlvblN0b3BwZWQgPSB0cnVlO1xuICB9O1xuXG4gIC8qKiAqL1xuXG5cbiAgUG9pbnRlckV2ZW50LnByb3RvdHlwZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24gPSBmdW5jdGlvbiBzdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKSB7XG4gICAgdGhpcy5pbW1lZGlhdGVQcm9wYWdhdGlvblN0b3BwZWQgPSB0aGlzLnByb3BhZ2F0aW9uU3RvcHBlZCA9IHRydWU7XG4gIH07XG5cbiAgcmV0dXJuIFBvaW50ZXJFdmVudDtcbn0oKTtcblxufSx7XCIuLi91dGlscy9wb2ludGVyVXRpbHNcIjo0OX1dLDMwOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbid1c2Ugc3RyaWN0JztcblxudmFyIFBvaW50ZXJFdmVudCA9IHJlcXVpcmUoJy4vUG9pbnRlckV2ZW50Jyk7XG52YXIgSW50ZXJhY3Rpb24gPSByZXF1aXJlKCcuLi9JbnRlcmFjdGlvbicpO1xudmFyIHV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMnKTtcbnZhciBkZWZhdWx0cyA9IHJlcXVpcmUoJy4uL2RlZmF1bHRPcHRpb25zJyk7XG52YXIgc2lnbmFscyA9IHJlcXVpcmUoJy4uL3V0aWxzL1NpZ25hbHMnKS5uZXcoKTtcblxudmFyIHNpbXBsZVNpZ25hbHMgPSBbJ2Rvd24nLCAndXAnLCAnY2FuY2VsJ107XG52YXIgc2ltcGxlRXZlbnRzID0gWydkb3duJywgJ3VwJywgJ2NhbmNlbCddO1xuXG52YXIgcG9pbnRlckV2ZW50cyA9IHtcbiAgUG9pbnRlckV2ZW50OiBQb2ludGVyRXZlbnQsXG4gIGZpcmU6IGZpcmUsXG4gIGNvbGxlY3RFdmVudFRhcmdldHM6IGNvbGxlY3RFdmVudFRhcmdldHMsXG4gIHNpZ25hbHM6IHNpZ25hbHMsXG4gIGRlZmF1bHRzOiB7XG4gICAgaG9sZER1cmF0aW9uOiA2MDAsXG4gICAgaWdub3JlRnJvbTogbnVsbCxcbiAgICBhbGxvd0Zyb206IG51bGwsXG4gICAgb3JpZ2luOiB7IHg6IDAsIHk6IDAgfVxuICB9LFxuICB0eXBlczogWydkb3duJywgJ21vdmUnLCAndXAnLCAnY2FuY2VsJywgJ3RhcCcsICdkb3VibGV0YXAnLCAnaG9sZCddXG59O1xuXG5mdW5jdGlvbiBmaXJlKGFyZykge1xuICB2YXIgaW50ZXJhY3Rpb24gPSBhcmcuaW50ZXJhY3Rpb24sXG4gICAgICBwb2ludGVyID0gYXJnLnBvaW50ZXIsXG4gICAgICBldmVudCA9IGFyZy5ldmVudCxcbiAgICAgIGV2ZW50VGFyZ2V0ID0gYXJnLmV2ZW50VGFyZ2V0LFxuICAgICAgX2FyZyR0eXBlID0gYXJnLnR5cGUsXG4gICAgICB0eXBlID0gX2FyZyR0eXBlID09PSB1bmRlZmluZWQgPyBhcmcucG9pbnRlckV2ZW50LnR5cGUgOiBfYXJnJHR5cGUsXG4gICAgICBfYXJnJHRhcmdldHMgPSBhcmcudGFyZ2V0cyxcbiAgICAgIHRhcmdldHMgPSBfYXJnJHRhcmdldHMgPT09IHVuZGVmaW5lZCA/IGNvbGxlY3RFdmVudFRhcmdldHMoYXJnKSA6IF9hcmckdGFyZ2V0cyxcbiAgICAgIF9hcmckcG9pbnRlckV2ZW50ID0gYXJnLnBvaW50ZXJFdmVudCxcbiAgICAgIHBvaW50ZXJFdmVudCA9IF9hcmckcG9pbnRlckV2ZW50ID09PSB1bmRlZmluZWQgPyBuZXcgUG9pbnRlckV2ZW50KHR5cGUsIHBvaW50ZXIsIGV2ZW50LCBldmVudFRhcmdldCwgaW50ZXJhY3Rpb24pIDogX2FyZyRwb2ludGVyRXZlbnQ7XG5cblxuICB2YXIgc2lnbmFsQXJnID0ge1xuICAgIGludGVyYWN0aW9uOiBpbnRlcmFjdGlvbixcbiAgICBwb2ludGVyOiBwb2ludGVyLFxuICAgIGV2ZW50OiBldmVudCxcbiAgICBldmVudFRhcmdldDogZXZlbnRUYXJnZXQsXG4gICAgdGFyZ2V0czogdGFyZ2V0cyxcbiAgICB0eXBlOiB0eXBlLFxuICAgIHBvaW50ZXJFdmVudDogcG9pbnRlckV2ZW50XG4gIH07XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB0YXJnZXRzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHRhcmdldCA9IHRhcmdldHNbaV07XG5cbiAgICBmb3IgKHZhciBwcm9wIGluIHRhcmdldC5wcm9wcyB8fCB7fSkge1xuICAgICAgcG9pbnRlckV2ZW50W3Byb3BdID0gdGFyZ2V0LnByb3BzW3Byb3BdO1xuICAgIH1cblxuICAgIHZhciBvcmlnaW4gPSB1dGlscy5nZXRPcmlnaW5YWSh0YXJnZXQuZXZlbnRhYmxlLCB0YXJnZXQuZWxlbWVudCk7XG5cbiAgICBwb2ludGVyRXZlbnQuc3VidHJhY3RPcmlnaW4ob3JpZ2luKTtcbiAgICBwb2ludGVyRXZlbnQuZXZlbnRhYmxlID0gdGFyZ2V0LmV2ZW50YWJsZTtcbiAgICBwb2ludGVyRXZlbnQuY3VycmVudFRhcmdldCA9IHRhcmdldC5lbGVtZW50O1xuXG4gICAgdGFyZ2V0LmV2ZW50YWJsZS5maXJlKHBvaW50ZXJFdmVudCk7XG5cbiAgICBwb2ludGVyRXZlbnQuYWRkT3JpZ2luKG9yaWdpbik7XG5cbiAgICBpZiAocG9pbnRlckV2ZW50LmltbWVkaWF0ZVByb3BhZ2F0aW9uU3RvcHBlZCB8fCBwb2ludGVyRXZlbnQucHJvcGFnYXRpb25TdG9wcGVkICYmIGkgKyAxIDwgdGFyZ2V0cy5sZW5ndGggJiYgdGFyZ2V0c1tpICsgMV0uZWxlbWVudCAhPT0gcG9pbnRlckV2ZW50LmN1cnJlbnRUYXJnZXQpIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHNpZ25hbHMuZmlyZSgnZmlyZWQnLCBzaWduYWxBcmcpO1xuXG4gIGlmICh0eXBlID09PSAndGFwJykge1xuICAgIC8vIGlmIHBvaW50ZXJFdmVudCBzaG91bGQgbWFrZSBhIGRvdWJsZSB0YXAsIGNyZWF0ZSBhbmQgZmlyZSBhIGRvdWJsZXRhcFxuICAgIC8vIFBvaW50ZXJFdmVudCBhbmQgdXNlIHRoYXQgYXMgdGhlIHByZXZUYXBcbiAgICB2YXIgcHJldlRhcCA9IHBvaW50ZXJFdmVudC5kb3VibGUgPyBmaXJlKHtcbiAgICAgIGludGVyYWN0aW9uOiBpbnRlcmFjdGlvbiwgcG9pbnRlcjogcG9pbnRlciwgZXZlbnQ6IGV2ZW50LCBldmVudFRhcmdldDogZXZlbnRUYXJnZXQsXG4gICAgICB0eXBlOiAnZG91YmxldGFwJ1xuICAgIH0pIDogcG9pbnRlckV2ZW50O1xuXG4gICAgaW50ZXJhY3Rpb24ucHJldlRhcCA9IHByZXZUYXA7XG4gICAgaW50ZXJhY3Rpb24udGFwVGltZSA9IHByZXZUYXAudGltZVN0YW1wO1xuICB9XG5cbiAgcmV0dXJuIHBvaW50ZXJFdmVudDtcbn1cblxuZnVuY3Rpb24gY29sbGVjdEV2ZW50VGFyZ2V0cyhfcmVmKSB7XG4gIHZhciBpbnRlcmFjdGlvbiA9IF9yZWYuaW50ZXJhY3Rpb24sXG4gICAgICBwb2ludGVyID0gX3JlZi5wb2ludGVyLFxuICAgICAgZXZlbnQgPSBfcmVmLmV2ZW50LFxuICAgICAgZXZlbnRUYXJnZXQgPSBfcmVmLmV2ZW50VGFyZ2V0LFxuICAgICAgdHlwZSA9IF9yZWYudHlwZTtcblxuICB2YXIgcG9pbnRlckluZGV4ID0gaW50ZXJhY3Rpb24uZ2V0UG9pbnRlckluZGV4KHBvaW50ZXIpO1xuXG4gIC8vIGRvIG5vdCBmaXJlIGEgdGFwIGV2ZW50IGlmIHRoZSBwb2ludGVyIHdhcyBtb3ZlZCBiZWZvcmUgYmVpbmcgbGlmdGVkXG4gIGlmICh0eXBlID09PSAndGFwJyAmJiAoaW50ZXJhY3Rpb24ucG9pbnRlcldhc01vdmVkXG4gIC8vIG9yIGlmIHRoZSBwb2ludGVydXAgdGFyZ2V0IGlzIGRpZmZlcmVudCB0byB0aGUgcG9pbnRlcmRvd24gdGFyZ2V0XG4gIHx8ICEoaW50ZXJhY3Rpb24uZG93blRhcmdldHNbcG9pbnRlckluZGV4XSAmJiBpbnRlcmFjdGlvbi5kb3duVGFyZ2V0c1twb2ludGVySW5kZXhdID09PSBldmVudFRhcmdldCkpKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgdmFyIHBhdGggPSB1dGlscy5nZXRQYXRoKGV2ZW50VGFyZ2V0KTtcbiAgdmFyIHNpZ25hbEFyZyA9IHtcbiAgICBpbnRlcmFjdGlvbjogaW50ZXJhY3Rpb24sXG4gICAgcG9pbnRlcjogcG9pbnRlcixcbiAgICBldmVudDogZXZlbnQsXG4gICAgZXZlbnRUYXJnZXQ6IGV2ZW50VGFyZ2V0LFxuICAgIHR5cGU6IHR5cGUsXG4gICAgcGF0aDogcGF0aCxcbiAgICB0YXJnZXRzOiBbXSxcbiAgICBlbGVtZW50OiBudWxsXG4gIH07XG5cbiAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IHBhdGgubGVuZ3RoOyBfaSsrKSB7XG4gICAgdmFyIF9yZWYyO1xuXG4gICAgX3JlZjIgPSBwYXRoW19pXTtcbiAgICB2YXIgZWxlbWVudCA9IF9yZWYyO1xuXG4gICAgc2lnbmFsQXJnLmVsZW1lbnQgPSBlbGVtZW50O1xuXG4gICAgc2lnbmFscy5maXJlKCdjb2xsZWN0LXRhcmdldHMnLCBzaWduYWxBcmcpO1xuICB9XG5cbiAgaWYgKHR5cGUgPT09ICdob2xkJykge1xuICAgIHNpZ25hbEFyZy50YXJnZXRzID0gc2lnbmFsQXJnLnRhcmdldHMuZmlsdGVyKGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICAgIHJldHVybiB0YXJnZXQuZXZlbnRhYmxlLm9wdGlvbnMuaG9sZER1cmF0aW9uID09PSBpbnRlcmFjdGlvbi5ob2xkVGltZXJzW3BvaW50ZXJJbmRleF0uZHVyYXRpb247XG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4gc2lnbmFsQXJnLnRhcmdldHM7XG59XG5cbkludGVyYWN0aW9uLnNpZ25hbHMub24oJ3VwZGF0ZS1wb2ludGVyLWRvd24nLCBmdW5jdGlvbiAoX3JlZjMpIHtcbiAgdmFyIGludGVyYWN0aW9uID0gX3JlZjMuaW50ZXJhY3Rpb24sXG4gICAgICBwb2ludGVySW5kZXggPSBfcmVmMy5wb2ludGVySW5kZXg7XG5cbiAgaW50ZXJhY3Rpb24uaG9sZFRpbWVyc1twb2ludGVySW5kZXhdID0geyBkdXJhdGlvbjogSW5maW5pdHksIHRpbWVvdXQ6IG51bGwgfTtcbn0pO1xuXG5JbnRlcmFjdGlvbi5zaWduYWxzLm9uKCdyZW1vdmUtcG9pbnRlcicsIGZ1bmN0aW9uIChfcmVmNCkge1xuICB2YXIgaW50ZXJhY3Rpb24gPSBfcmVmNC5pbnRlcmFjdGlvbixcbiAgICAgIHBvaW50ZXJJbmRleCA9IF9yZWY0LnBvaW50ZXJJbmRleDtcblxuICBpbnRlcmFjdGlvbi5ob2xkVGltZXJzLnNwbGljZShwb2ludGVySW5kZXgsIDEpO1xufSk7XG5cbkludGVyYWN0aW9uLnNpZ25hbHMub24oJ21vdmUnLCBmdW5jdGlvbiAoX3JlZjUpIHtcbiAgdmFyIGludGVyYWN0aW9uID0gX3JlZjUuaW50ZXJhY3Rpb24sXG4gICAgICBwb2ludGVyID0gX3JlZjUucG9pbnRlcixcbiAgICAgIGV2ZW50ID0gX3JlZjUuZXZlbnQsXG4gICAgICBldmVudFRhcmdldCA9IF9yZWY1LmV2ZW50VGFyZ2V0LFxuICAgICAgZHVwbGljYXRlTW92ZSA9IF9yZWY1LmR1cGxpY2F0ZU1vdmU7XG5cbiAgdmFyIHBvaW50ZXJJbmRleCA9IGludGVyYWN0aW9uLmdldFBvaW50ZXJJbmRleChwb2ludGVyKTtcblxuICBpZiAoIWR1cGxpY2F0ZU1vdmUgJiYgKCFpbnRlcmFjdGlvbi5wb2ludGVySXNEb3duIHx8IGludGVyYWN0aW9uLnBvaW50ZXJXYXNNb3ZlZCkpIHtcbiAgICBpZiAoaW50ZXJhY3Rpb24ucG9pbnRlcklzRG93bikge1xuICAgICAgY2xlYXJUaW1lb3V0KGludGVyYWN0aW9uLmhvbGRUaW1lcnNbcG9pbnRlckluZGV4XS50aW1lb3V0KTtcbiAgICB9XG5cbiAgICBmaXJlKHtcbiAgICAgIGludGVyYWN0aW9uOiBpbnRlcmFjdGlvbiwgcG9pbnRlcjogcG9pbnRlciwgZXZlbnQ6IGV2ZW50LCBldmVudFRhcmdldDogZXZlbnRUYXJnZXQsXG4gICAgICB0eXBlOiAnbW92ZSdcbiAgICB9KTtcbiAgfVxufSk7XG5cbkludGVyYWN0aW9uLnNpZ25hbHMub24oJ2Rvd24nLCBmdW5jdGlvbiAoX3JlZjYpIHtcbiAgdmFyIGludGVyYWN0aW9uID0gX3JlZjYuaW50ZXJhY3Rpb24sXG4gICAgICBwb2ludGVyID0gX3JlZjYucG9pbnRlcixcbiAgICAgIGV2ZW50ID0gX3JlZjYuZXZlbnQsXG4gICAgICBldmVudFRhcmdldCA9IF9yZWY2LmV2ZW50VGFyZ2V0LFxuICAgICAgcG9pbnRlckluZGV4ID0gX3JlZjYucG9pbnRlckluZGV4O1xuXG4gIHZhciB0aW1lciA9IGludGVyYWN0aW9uLmhvbGRUaW1lcnNbcG9pbnRlckluZGV4XTtcbiAgdmFyIHBhdGggPSB1dGlscy5nZXRQYXRoKGV2ZW50VGFyZ2V0KTtcbiAgdmFyIHNpZ25hbEFyZyA9IHtcbiAgICBpbnRlcmFjdGlvbjogaW50ZXJhY3Rpb24sXG4gICAgcG9pbnRlcjogcG9pbnRlcixcbiAgICBldmVudDogZXZlbnQsXG4gICAgZXZlbnRUYXJnZXQ6IGV2ZW50VGFyZ2V0LFxuICAgIHR5cGU6ICdob2xkJyxcbiAgICB0YXJnZXRzOiBbXSxcbiAgICBwYXRoOiBwYXRoLFxuICAgIGVsZW1lbnQ6IG51bGxcbiAgfTtcblxuICBmb3IgKHZhciBfaTIgPSAwOyBfaTIgPCBwYXRoLmxlbmd0aDsgX2kyKyspIHtcbiAgICB2YXIgX3JlZjc7XG5cbiAgICBfcmVmNyA9IHBhdGhbX2kyXTtcbiAgICB2YXIgZWxlbWVudCA9IF9yZWY3O1xuXG4gICAgc2lnbmFsQXJnLmVsZW1lbnQgPSBlbGVtZW50O1xuXG4gICAgc2lnbmFscy5maXJlKCdjb2xsZWN0LXRhcmdldHMnLCBzaWduYWxBcmcpO1xuICB9XG5cbiAgaWYgKCFzaWduYWxBcmcudGFyZ2V0cy5sZW5ndGgpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgbWluRHVyYXRpb24gPSBJbmZpbml0eTtcblxuICBmb3IgKHZhciBfaTMgPSAwOyBfaTMgPCBzaWduYWxBcmcudGFyZ2V0cy5sZW5ndGg7IF9pMysrKSB7XG4gICAgdmFyIF9yZWY4O1xuXG4gICAgX3JlZjggPSBzaWduYWxBcmcudGFyZ2V0c1tfaTNdO1xuICAgIHZhciB0YXJnZXQgPSBfcmVmODtcblxuICAgIHZhciBob2xkRHVyYXRpb24gPSB0YXJnZXQuZXZlbnRhYmxlLm9wdGlvbnMuaG9sZER1cmF0aW9uO1xuXG4gICAgaWYgKGhvbGREdXJhdGlvbiA8IG1pbkR1cmF0aW9uKSB7XG4gICAgICBtaW5EdXJhdGlvbiA9IGhvbGREdXJhdGlvbjtcbiAgICB9XG4gIH1cblxuICB0aW1lci5kdXJhdGlvbiA9IG1pbkR1cmF0aW9uO1xuICB0aW1lci50aW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgZmlyZSh7XG4gICAgICBpbnRlcmFjdGlvbjogaW50ZXJhY3Rpb24sXG4gICAgICBldmVudFRhcmdldDogZXZlbnRUYXJnZXQsXG4gICAgICBwb2ludGVyOiBwb2ludGVyLFxuICAgICAgZXZlbnQ6IGV2ZW50LFxuICAgICAgdHlwZTogJ2hvbGQnXG4gICAgfSk7XG4gIH0sIG1pbkR1cmF0aW9uKTtcbn0pO1xuXG5JbnRlcmFjdGlvbi5zaWduYWxzLm9uKCd1cCcsIGZ1bmN0aW9uIChfcmVmOSkge1xuICB2YXIgaW50ZXJhY3Rpb24gPSBfcmVmOS5pbnRlcmFjdGlvbixcbiAgICAgIHBvaW50ZXIgPSBfcmVmOS5wb2ludGVyLFxuICAgICAgZXZlbnQgPSBfcmVmOS5ldmVudCxcbiAgICAgIGV2ZW50VGFyZ2V0ID0gX3JlZjkuZXZlbnRUYXJnZXQ7XG5cbiAgaWYgKCFpbnRlcmFjdGlvbi5wb2ludGVyV2FzTW92ZWQpIHtcbiAgICBmaXJlKHsgaW50ZXJhY3Rpb246IGludGVyYWN0aW9uLCBldmVudFRhcmdldDogZXZlbnRUYXJnZXQsIHBvaW50ZXI6IHBvaW50ZXIsIGV2ZW50OiBldmVudCwgdHlwZTogJ3RhcCcgfSk7XG4gIH1cbn0pO1xuXG52YXIgX2FyciA9IFsndXAnLCAnY2FuY2VsJ107XG5mb3IgKHZhciBfaTQgPSAwOyBfaTQgPCBfYXJyLmxlbmd0aDsgX2k0KyspIHtcbiAgdmFyIHNpZ25hbE5hbWUgPSBfYXJyW19pNF07XG4gIEludGVyYWN0aW9uLnNpZ25hbHMub24oc2lnbmFsTmFtZSwgZnVuY3Rpb24gKF9yZWYxMSkge1xuICAgIHZhciBpbnRlcmFjdGlvbiA9IF9yZWYxMS5pbnRlcmFjdGlvbixcbiAgICAgICAgcG9pbnRlckluZGV4ID0gX3JlZjExLnBvaW50ZXJJbmRleDtcblxuICAgIGlmIChpbnRlcmFjdGlvbi5ob2xkVGltZXJzW3BvaW50ZXJJbmRleF0pIHtcbiAgICAgIGNsZWFyVGltZW91dChpbnRlcmFjdGlvbi5ob2xkVGltZXJzW3BvaW50ZXJJbmRleF0udGltZW91dCk7XG4gICAgfVxuICB9KTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlU2lnbmFsTGlzdGVuZXIodHlwZSkge1xuICByZXR1cm4gZnVuY3Rpb24gKF9yZWYxMCkge1xuICAgIHZhciBpbnRlcmFjdGlvbiA9IF9yZWYxMC5pbnRlcmFjdGlvbixcbiAgICAgICAgcG9pbnRlciA9IF9yZWYxMC5wb2ludGVyLFxuICAgICAgICBldmVudCA9IF9yZWYxMC5ldmVudCxcbiAgICAgICAgZXZlbnRUYXJnZXQgPSBfcmVmMTAuZXZlbnRUYXJnZXQ7XG5cbiAgICBmaXJlKHsgaW50ZXJhY3Rpb246IGludGVyYWN0aW9uLCBldmVudFRhcmdldDogZXZlbnRUYXJnZXQsIHBvaW50ZXI6IHBvaW50ZXIsIGV2ZW50OiBldmVudCwgdHlwZTogdHlwZSB9KTtcbiAgfTtcbn1cblxuZm9yICh2YXIgaSA9IDA7IGkgPCBzaW1wbGVTaWduYWxzLmxlbmd0aDsgaSsrKSB7XG4gIEludGVyYWN0aW9uLnNpZ25hbHMub24oc2ltcGxlU2lnbmFsc1tpXSwgY3JlYXRlU2lnbmFsTGlzdGVuZXIoc2ltcGxlRXZlbnRzW2ldKSk7XG59XG5cbkludGVyYWN0aW9uLnNpZ25hbHMub24oJ25ldycsIGZ1bmN0aW9uIChpbnRlcmFjdGlvbikge1xuICBpbnRlcmFjdGlvbi5wcmV2VGFwID0gbnVsbDsgLy8gdGhlIG1vc3QgcmVjZW50IHRhcCBldmVudCBvbiB0aGlzIGludGVyYWN0aW9uXG4gIGludGVyYWN0aW9uLnRhcFRpbWUgPSAwOyAvLyB0aW1lIG9mIHRoZSBtb3N0IHJlY2VudCB0YXAgZXZlbnRcbiAgaW50ZXJhY3Rpb24uaG9sZFRpbWVycyA9IFtdOyAvLyBbeyBkdXJhdGlvbiwgdGltZW91dCB9XVxufSk7XG5cbmRlZmF1bHRzLnBvaW50ZXJFdmVudHMgPSBwb2ludGVyRXZlbnRzLmRlZmF1bHRzO1xubW9kdWxlLmV4cG9ydHMgPSBwb2ludGVyRXZlbnRzO1xuXG59LHtcIi4uL0ludGVyYWN0aW9uXCI6NSxcIi4uL2RlZmF1bHRPcHRpb25zXCI6MTgsXCIuLi91dGlsc1wiOjQ0LFwiLi4vdXRpbHMvU2lnbmFsc1wiOjM0LFwiLi9Qb2ludGVyRXZlbnRcIjoyOX1dLDMxOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbid1c2Ugc3RyaWN0JztcblxudmFyIHBvaW50ZXJFdmVudHMgPSByZXF1aXJlKCcuL2Jhc2UnKTtcbnZhciBJbnRlcmFjdGlvbiA9IHJlcXVpcmUoJy4uL0ludGVyYWN0aW9uJyk7XG5cbnBvaW50ZXJFdmVudHMuc2lnbmFscy5vbignbmV3Jywgb25OZXcpO1xucG9pbnRlckV2ZW50cy5zaWduYWxzLm9uKCdmaXJlZCcsIG9uRmlyZWQpO1xuXG52YXIgX2FyciA9IFsnbW92ZScsICd1cCcsICdjYW5jZWwnLCAnZW5kYWxsJ107XG5mb3IgKHZhciBfaSA9IDA7IF9pIDwgX2Fyci5sZW5ndGg7IF9pKyspIHtcbiAgdmFyIHNpZ25hbCA9IF9hcnJbX2ldO1xuICBJbnRlcmFjdGlvbi5zaWduYWxzLm9uKHNpZ25hbCwgZW5kSG9sZFJlcGVhdCk7XG59XG5cbmZ1bmN0aW9uIG9uTmV3KF9yZWYpIHtcbiAgdmFyIHBvaW50ZXJFdmVudCA9IF9yZWYucG9pbnRlckV2ZW50O1xuXG4gIGlmIChwb2ludGVyRXZlbnQudHlwZSAhPT0gJ2hvbGQnKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgcG9pbnRlckV2ZW50LmNvdW50ID0gKHBvaW50ZXJFdmVudC5jb3VudCB8fCAwKSArIDE7XG59XG5cbmZ1bmN0aW9uIG9uRmlyZWQoX3JlZjIpIHtcbiAgdmFyIGludGVyYWN0aW9uID0gX3JlZjIuaW50ZXJhY3Rpb24sXG4gICAgICBwb2ludGVyRXZlbnQgPSBfcmVmMi5wb2ludGVyRXZlbnQsXG4gICAgICBldmVudFRhcmdldCA9IF9yZWYyLmV2ZW50VGFyZ2V0LFxuICAgICAgdGFyZ2V0cyA9IF9yZWYyLnRhcmdldHM7XG5cbiAgaWYgKHBvaW50ZXJFdmVudC50eXBlICE9PSAnaG9sZCcgfHwgIXRhcmdldHMubGVuZ3RoKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gZ2V0IHRoZSByZXBlYXQgaW50ZXJ2YWwgZnJvbSB0aGUgZmlyc3QgZXZlbnRhYmxlXG4gIHZhciBpbnRlcnZhbCA9IHRhcmdldHNbMF0uZXZlbnRhYmxlLm9wdGlvbnMuaG9sZFJlcGVhdEludGVydmFsO1xuXG4gIC8vIGRvbid0IHJlcGVhdCBpZiB0aGUgaW50ZXJ2YWwgaXMgMCBvciBsZXNzXG4gIGlmIChpbnRlcnZhbCA8PSAwKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gc2V0IGEgdGltZW91dCB0byBmaXJlIHRoZSBob2xkcmVwZWF0IGV2ZW50XG4gIGludGVyYWN0aW9uLmhvbGRJbnRlcnZhbEhhbmRsZSA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgIHBvaW50ZXJFdmVudHMuZmlyZSh7XG4gICAgICBpbnRlcmFjdGlvbjogaW50ZXJhY3Rpb24sXG4gICAgICBldmVudFRhcmdldDogZXZlbnRUYXJnZXQsXG4gICAgICB0eXBlOiAnaG9sZCcsXG4gICAgICBwb2ludGVyOiBwb2ludGVyRXZlbnQsXG4gICAgICBldmVudDogcG9pbnRlckV2ZW50XG4gICAgfSk7XG4gIH0sIGludGVydmFsKTtcbn1cblxuZnVuY3Rpb24gZW5kSG9sZFJlcGVhdChfcmVmMykge1xuICB2YXIgaW50ZXJhY3Rpb24gPSBfcmVmMy5pbnRlcmFjdGlvbjtcblxuICAvLyBzZXQgdGhlIGludGVyYWN0aW9uJ3MgaG9sZFN0b3BUaW1lIHByb3BlcnR5XG4gIC8vIHRvIHN0b3AgZnVydGhlciBob2xkUmVwZWF0IGV2ZW50c1xuICBpZiAoaW50ZXJhY3Rpb24uaG9sZEludGVydmFsSGFuZGxlKSB7XG4gICAgY2xlYXJJbnRlcnZhbChpbnRlcmFjdGlvbi5ob2xkSW50ZXJ2YWxIYW5kbGUpO1xuICAgIGludGVyYWN0aW9uLmhvbGRJbnRlcnZhbEhhbmRsZSA9IG51bGw7XG4gIH1cbn1cblxuLy8gZG9uJ3QgcmVwZWF0IGJ5IGRlZmF1bHRcbnBvaW50ZXJFdmVudHMuZGVmYXVsdHMuaG9sZFJlcGVhdEludGVydmFsID0gMDtcbnBvaW50ZXJFdmVudHMudHlwZXMucHVzaCgnaG9sZHJlcGVhdCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgb25OZXc6IG9uTmV3LFxuICBvbkZpcmVkOiBvbkZpcmVkLFxuICBlbmRIb2xkUmVwZWF0OiBlbmRIb2xkUmVwZWF0XG59O1xuXG59LHtcIi4uL0ludGVyYWN0aW9uXCI6NSxcIi4vYmFzZVwiOjMwfV0sMzI6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgcG9pbnRlckV2ZW50cyA9IHJlcXVpcmUoJy4vYmFzZScpO1xudmFyIEludGVyYWN0YWJsZSA9IHJlcXVpcmUoJy4uL0ludGVyYWN0YWJsZScpO1xudmFyIGlzID0gcmVxdWlyZSgnLi4vdXRpbHMvaXMnKTtcbnZhciBzY29wZSA9IHJlcXVpcmUoJy4uL3Njb3BlJyk7XG52YXIgZXh0ZW5kID0gcmVxdWlyZSgnLi4vdXRpbHMvZXh0ZW5kJyk7XG5cbnZhciBfcmVxdWlyZSA9IHJlcXVpcmUoJy4uL3V0aWxzL2FycicpLFxuICAgIG1lcmdlID0gX3JlcXVpcmUubWVyZ2U7XG5cbnBvaW50ZXJFdmVudHMuc2lnbmFscy5vbignY29sbGVjdC10YXJnZXRzJywgZnVuY3Rpb24gKF9yZWYpIHtcbiAgdmFyIHRhcmdldHMgPSBfcmVmLnRhcmdldHMsXG4gICAgICBlbGVtZW50ID0gX3JlZi5lbGVtZW50LFxuICAgICAgdHlwZSA9IF9yZWYudHlwZSxcbiAgICAgIGV2ZW50VGFyZ2V0ID0gX3JlZi5ldmVudFRhcmdldDtcblxuICBzY29wZS5pbnRlcmFjdGFibGVzLmZvckVhY2hNYXRjaChlbGVtZW50LCBmdW5jdGlvbiAoaW50ZXJhY3RhYmxlKSB7XG4gICAgdmFyIGV2ZW50YWJsZSA9IGludGVyYWN0YWJsZS5ldmVudHM7XG4gICAgdmFyIG9wdGlvbnMgPSBldmVudGFibGUub3B0aW9ucztcblxuICAgIGlmIChldmVudGFibGVbdHlwZV0gJiYgaXMuZWxlbWVudChlbGVtZW50KSAmJiBpbnRlcmFjdGFibGUudGVzdElnbm9yZUFsbG93KG9wdGlvbnMsIGVsZW1lbnQsIGV2ZW50VGFyZ2V0KSkge1xuXG4gICAgICB0YXJnZXRzLnB1c2goe1xuICAgICAgICBlbGVtZW50OiBlbGVtZW50LFxuICAgICAgICBldmVudGFibGU6IGV2ZW50YWJsZSxcbiAgICAgICAgcHJvcHM6IHsgaW50ZXJhY3RhYmxlOiBpbnRlcmFjdGFibGUgfVxuICAgICAgfSk7XG4gICAgfVxuICB9KTtcbn0pO1xuXG5JbnRlcmFjdGFibGUuc2lnbmFscy5vbignbmV3JywgZnVuY3Rpb24gKF9yZWYyKSB7XG4gIHZhciBpbnRlcmFjdGFibGUgPSBfcmVmMi5pbnRlcmFjdGFibGU7XG5cbiAgaW50ZXJhY3RhYmxlLmV2ZW50cy5nZXRSZWN0ID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICByZXR1cm4gaW50ZXJhY3RhYmxlLmdldFJlY3QoZWxlbWVudCk7XG4gIH07XG59KTtcblxuSW50ZXJhY3RhYmxlLnNpZ25hbHMub24oJ3NldCcsIGZ1bmN0aW9uIChfcmVmMykge1xuICB2YXIgaW50ZXJhY3RhYmxlID0gX3JlZjMuaW50ZXJhY3RhYmxlLFxuICAgICAgb3B0aW9ucyA9IF9yZWYzLm9wdGlvbnM7XG5cbiAgZXh0ZW5kKGludGVyYWN0YWJsZS5ldmVudHMub3B0aW9ucywgcG9pbnRlckV2ZW50cy5kZWZhdWx0cyk7XG4gIGV4dGVuZChpbnRlcmFjdGFibGUuZXZlbnRzLm9wdGlvbnMsIG9wdGlvbnMpO1xufSk7XG5cbm1lcmdlKEludGVyYWN0YWJsZS5ldmVudFR5cGVzLCBwb2ludGVyRXZlbnRzLnR5cGVzKTtcblxuSW50ZXJhY3RhYmxlLnByb3RvdHlwZS5wb2ludGVyRXZlbnRzID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgZXh0ZW5kKHRoaXMuZXZlbnRzLm9wdGlvbnMsIG9wdGlvbnMpO1xuXG4gIHJldHVybiB0aGlzO1xufTtcblxudmFyIF9fYmFja0NvbXBhdE9wdGlvbiA9IEludGVyYWN0YWJsZS5wcm90b3R5cGUuX2JhY2tDb21wYXRPcHRpb247XG5cbkludGVyYWN0YWJsZS5wcm90b3R5cGUuX2JhY2tDb21wYXRPcHRpb24gPSBmdW5jdGlvbiAob3B0aW9uTmFtZSwgbmV3VmFsdWUpIHtcbiAgdmFyIHJldCA9IF9fYmFja0NvbXBhdE9wdGlvbi5jYWxsKHRoaXMsIG9wdGlvbk5hbWUsIG5ld1ZhbHVlKTtcblxuICBpZiAocmV0ID09PSB0aGlzKSB7XG4gICAgdGhpcy5ldmVudHMub3B0aW9uc1tvcHRpb25OYW1lXSA9IG5ld1ZhbHVlO1xuICB9XG5cbiAgcmV0dXJuIHJldDtcbn07XG5cbkludGVyYWN0YWJsZS5zZXR0aW5nc01ldGhvZHMucHVzaCgncG9pbnRlckV2ZW50cycpO1xuXG59LHtcIi4uL0ludGVyYWN0YWJsZVwiOjQsXCIuLi9zY29wZVwiOjMzLFwiLi4vdXRpbHMvYXJyXCI6MzUsXCIuLi91dGlscy9leHRlbmRcIjo0MSxcIi4uL3V0aWxzL2lzXCI6NDYsXCIuL2Jhc2VcIjozMH1dLDMzOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xudmFyIGV2ZW50cyA9IHJlcXVpcmUoJy4vdXRpbHMvZXZlbnRzJyk7XG52YXIgc2lnbmFscyA9IHJlcXVpcmUoJy4vdXRpbHMvU2lnbmFscycpLm5ldygpO1xuXG52YXIgX3JlcXVpcmUgPSByZXF1aXJlKCcuL3V0aWxzL3dpbmRvdycpLFxuICAgIGdldFdpbmRvdyA9IF9yZXF1aXJlLmdldFdpbmRvdztcblxudmFyIHNjb3BlID0ge1xuICBzaWduYWxzOiBzaWduYWxzLFxuICBldmVudHM6IGV2ZW50cyxcbiAgdXRpbHM6IHV0aWxzLFxuXG4gIC8vIG1haW4gZG9jdW1lbnRcbiAgZG9jdW1lbnQ6IHJlcXVpcmUoJy4vdXRpbHMvZG9tT2JqZWN0cycpLmRvY3VtZW50LFxuICAvLyBhbGwgZG9jdW1lbnRzIGJlaW5nIGxpc3RlbmVkIHRvXG4gIGRvY3VtZW50czogW10sXG5cbiAgYWRkRG9jdW1lbnQ6IGZ1bmN0aW9uIGFkZERvY3VtZW50KGRvYywgd2luKSB7XG4gICAgLy8gZG8gbm90aGluZyBpZiBkb2N1bWVudCBpcyBhbHJlYWR5IGtub3duXG4gICAgaWYgKHV0aWxzLmNvbnRhaW5zKHNjb3BlLmRvY3VtZW50cywgZG9jKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHdpbiA9IHdpbiB8fCBnZXRXaW5kb3coZG9jKTtcblxuICAgIHNjb3BlLmRvY3VtZW50cy5wdXNoKGRvYyk7XG4gICAgZXZlbnRzLmRvY3VtZW50cy5wdXNoKGRvYyk7XG5cbiAgICAvLyBkb24ndCBhZGQgYW4gdW5sb2FkIGV2ZW50IGZvciB0aGUgbWFpbiBkb2N1bWVudFxuICAgIC8vIHNvIHRoYXQgdGhlIHBhZ2UgbWF5IGJlIGNhY2hlZCBpbiBicm93c2VyIGhpc3RvcnlcbiAgICBpZiAoZG9jICE9PSBzY29wZS5kb2N1bWVudCkge1xuICAgICAgZXZlbnRzLmFkZCh3aW4sICd1bmxvYWQnLCBzY29wZS5vbldpbmRvd1VubG9hZCk7XG4gICAgfVxuXG4gICAgc2lnbmFscy5maXJlKCdhZGQtZG9jdW1lbnQnLCB7IGRvYzogZG9jLCB3aW46IHdpbiB9KTtcbiAgfSxcblxuICByZW1vdmVEb2N1bWVudDogZnVuY3Rpb24gcmVtb3ZlRG9jdW1lbnQoZG9jLCB3aW4pIHtcbiAgICB2YXIgaW5kZXggPSBzY29wZS5kb2N1bWVudHMuaW5kZXhPZihkb2MpO1xuXG4gICAgd2luID0gd2luIHx8IGdldFdpbmRvdyhkb2MpO1xuXG4gICAgZXZlbnRzLnJlbW92ZSh3aW4sICd1bmxvYWQnLCBzY29wZS5vbldpbmRvd1VubG9hZCk7XG5cbiAgICBzY29wZS5kb2N1bWVudHMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICBldmVudHMuZG9jdW1lbnRzLnNwbGljZShpbmRleCwgMSk7XG5cbiAgICBzaWduYWxzLmZpcmUoJ3JlbW92ZS1kb2N1bWVudCcsIHsgd2luOiB3aW4sIGRvYzogZG9jIH0pO1xuICB9LFxuXG4gIG9uV2luZG93VW5sb2FkOiBmdW5jdGlvbiBvbldpbmRvd1VubG9hZCgpIHtcbiAgICBzY29wZS5yZW1vdmVEb2N1bWVudCh0aGlzLmRvY3VtZW50LCB0aGlzKTtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBzY29wZTtcblxufSx7XCIuL3V0aWxzXCI6NDQsXCIuL3V0aWxzL1NpZ25hbHNcIjozNCxcIi4vdXRpbHMvZG9tT2JqZWN0c1wiOjM4LFwiLi91dGlscy9ldmVudHNcIjo0MCxcIi4vdXRpbHMvd2luZG93XCI6NTJ9XSwzNDpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cInVzZSBzdHJpY3RcIjtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxudmFyIFNpZ25hbHMgPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIFNpZ25hbHMoKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFNpZ25hbHMpO1xuXG4gICAgdGhpcy5saXN0ZW5lcnMgPSB7XG4gICAgICAvLyBzaWduYWxOYW1lOiBbbGlzdGVuZXJzXSxcbiAgICB9O1xuICB9XG5cbiAgU2lnbmFscy5wcm90b3R5cGUub24gPSBmdW5jdGlvbiBvbihuYW1lLCBsaXN0ZW5lcikge1xuICAgIGlmICghdGhpcy5saXN0ZW5lcnNbbmFtZV0pIHtcbiAgICAgIHRoaXMubGlzdGVuZXJzW25hbWVdID0gW2xpc3RlbmVyXTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmxpc3RlbmVyc1tuYW1lXS5wdXNoKGxpc3RlbmVyKTtcbiAgfTtcblxuICBTaWduYWxzLnByb3RvdHlwZS5vZmYgPSBmdW5jdGlvbiBvZmYobmFtZSwgbGlzdGVuZXIpIHtcbiAgICBpZiAoIXRoaXMubGlzdGVuZXJzW25hbWVdKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIGluZGV4ID0gdGhpcy5saXN0ZW5lcnNbbmFtZV0uaW5kZXhPZihsaXN0ZW5lcik7XG5cbiAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICB0aGlzLmxpc3RlbmVyc1tuYW1lXS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cbiAgfTtcblxuICBTaWduYWxzLnByb3RvdHlwZS5maXJlID0gZnVuY3Rpb24gZmlyZShuYW1lLCBhcmcpIHtcbiAgICB2YXIgdGFyZ2V0TGlzdGVuZXJzID0gdGhpcy5saXN0ZW5lcnNbbmFtZV07XG5cbiAgICBpZiAoIXRhcmdldExpc3RlbmVycykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCB0YXJnZXRMaXN0ZW5lcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX3JlZjtcblxuICAgICAgX3JlZiA9IHRhcmdldExpc3RlbmVyc1tfaV07XG4gICAgICB2YXIgbGlzdGVuZXIgPSBfcmVmO1xuXG4gICAgICBpZiAobGlzdGVuZXIoYXJnLCBuYW1lKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICByZXR1cm4gU2lnbmFscztcbn0oKTtcblxuU2lnbmFscy5uZXcgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBuZXcgU2lnbmFscygpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBTaWduYWxzO1xuXG59LHt9XSwzNTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cInVzZSBzdHJpY3RcIjtcblxuZnVuY3Rpb24gY29udGFpbnMoYXJyYXksIHRhcmdldCkge1xuICByZXR1cm4gYXJyYXkuaW5kZXhPZih0YXJnZXQpICE9PSAtMTtcbn1cblxuZnVuY3Rpb24gbWVyZ2UodGFyZ2V0LCBzb3VyY2UpIHtcbiAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IHNvdXJjZS5sZW5ndGg7IF9pKyspIHtcbiAgICB2YXIgX3JlZjtcblxuICAgIF9yZWYgPSBzb3VyY2VbX2ldO1xuICAgIHZhciBpdGVtID0gX3JlZjtcblxuICAgIHRhcmdldC5wdXNoKGl0ZW0pO1xuICB9XG5cbiAgcmV0dXJuIHRhcmdldDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGNvbnRhaW5zOiBjb250YWlucyxcbiAgbWVyZ2U6IG1lcmdlXG59O1xuXG59LHt9XSwzNjpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4ndXNlIHN0cmljdCc7XG5cbnZhciBfcmVxdWlyZSA9IHJlcXVpcmUoJy4vd2luZG93JyksXG4gICAgd2luZG93ID0gX3JlcXVpcmUud2luZG93O1xuXG52YXIgaXMgPSByZXF1aXJlKCcuL2lzJyk7XG52YXIgZG9tT2JqZWN0cyA9IHJlcXVpcmUoJy4vZG9tT2JqZWN0cycpO1xuXG52YXIgRWxlbWVudCA9IGRvbU9iamVjdHMuRWxlbWVudDtcbnZhciBuYXZpZ2F0b3IgPSB3aW5kb3cubmF2aWdhdG9yO1xuXG52YXIgYnJvd3NlciA9IHtcbiAgLy8gRG9lcyB0aGUgYnJvd3NlciBzdXBwb3J0IHRvdWNoIGlucHV0P1xuICBzdXBwb3J0c1RvdWNoOiAhISgnb250b3VjaHN0YXJ0JyBpbiB3aW5kb3cgfHwgaXMuZnVuY3Rpb24od2luZG93LkRvY3VtZW50VG91Y2gpICYmIGRvbU9iamVjdHMuZG9jdW1lbnQgaW5zdGFuY2VvZiB3aW5kb3cuRG9jdW1lbnRUb3VjaCksXG5cbiAgLy8gRG9lcyB0aGUgYnJvd3NlciBzdXBwb3J0IFBvaW50ZXJFdmVudHNcbiAgc3VwcG9ydHNQb2ludGVyRXZlbnQ6ICEhZG9tT2JqZWN0cy5Qb2ludGVyRXZlbnQsXG5cbiAgaXNJT1M6IC9pUChob25lfG9kfGFkKS8udGVzdChuYXZpZ2F0b3IucGxhdGZvcm0pLFxuXG4gIC8vIHNjcm9sbGluZyBkb2Vzbid0IGNoYW5nZSB0aGUgcmVzdWx0IG9mIGdldENsaWVudFJlY3RzIG9uIGlPUyA3XG4gIGlzSU9TNzogL2lQKGhvbmV8b2R8YWQpLy50ZXN0KG5hdmlnYXRvci5wbGF0Zm9ybSkgJiYgL09TIDdbXlxcZF0vLnRlc3QobmF2aWdhdG9yLmFwcFZlcnNpb24pLFxuXG4gIGlzSWU5OiAvTVNJRSA5Ly50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpLFxuXG4gIC8vIHByZWZpeCBtYXRjaGVzU2VsZWN0b3JcbiAgcHJlZml4ZWRNYXRjaGVzU2VsZWN0b3I6ICdtYXRjaGVzJyBpbiBFbGVtZW50LnByb3RvdHlwZSA/ICdtYXRjaGVzJyA6ICd3ZWJraXRNYXRjaGVzU2VsZWN0b3InIGluIEVsZW1lbnQucHJvdG90eXBlID8gJ3dlYmtpdE1hdGNoZXNTZWxlY3RvcicgOiAnbW96TWF0Y2hlc1NlbGVjdG9yJyBpbiBFbGVtZW50LnByb3RvdHlwZSA/ICdtb3pNYXRjaGVzU2VsZWN0b3InIDogJ29NYXRjaGVzU2VsZWN0b3InIGluIEVsZW1lbnQucHJvdG90eXBlID8gJ29NYXRjaGVzU2VsZWN0b3InIDogJ21zTWF0Y2hlc1NlbGVjdG9yJyxcblxuICBwRXZlbnRUeXBlczogZG9tT2JqZWN0cy5Qb2ludGVyRXZlbnQgPyBkb21PYmplY3RzLlBvaW50ZXJFdmVudCA9PT0gd2luZG93Lk1TUG9pbnRlckV2ZW50ID8ge1xuICAgIHVwOiAnTVNQb2ludGVyVXAnLFxuICAgIGRvd246ICdNU1BvaW50ZXJEb3duJyxcbiAgICBvdmVyOiAnbW91c2VvdmVyJyxcbiAgICBvdXQ6ICdtb3VzZW91dCcsXG4gICAgbW92ZTogJ01TUG9pbnRlck1vdmUnLFxuICAgIGNhbmNlbDogJ01TUG9pbnRlckNhbmNlbCdcbiAgfSA6IHtcbiAgICB1cDogJ3BvaW50ZXJ1cCcsXG4gICAgZG93bjogJ3BvaW50ZXJkb3duJyxcbiAgICBvdmVyOiAncG9pbnRlcm92ZXInLFxuICAgIG91dDogJ3BvaW50ZXJvdXQnLFxuICAgIG1vdmU6ICdwb2ludGVybW92ZScsXG4gICAgY2FuY2VsOiAncG9pbnRlcmNhbmNlbCdcbiAgfSA6IG51bGwsXG5cbiAgLy8gYmVjYXVzZSBXZWJraXQgYW5kIE9wZXJhIHN0aWxsIHVzZSAnbW91c2V3aGVlbCcgZXZlbnQgdHlwZVxuICB3aGVlbEV2ZW50OiAnb25tb3VzZXdoZWVsJyBpbiBkb21PYmplY3RzLmRvY3VtZW50ID8gJ21vdXNld2hlZWwnIDogJ3doZWVsJ1xuXG59O1xuXG4vLyBPcGVyYSBNb2JpbGUgbXVzdCBiZSBoYW5kbGVkIGRpZmZlcmVudGx5XG5icm93c2VyLmlzT3BlcmFNb2JpbGUgPSBuYXZpZ2F0b3IuYXBwTmFtZSA9PT0gJ09wZXJhJyAmJiBicm93c2VyLnN1cHBvcnRzVG91Y2ggJiYgbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgnUHJlc3RvJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gYnJvd3NlcjtcblxufSx7XCIuL2RvbU9iamVjdHNcIjozOCxcIi4vaXNcIjo0NixcIi4vd2luZG93XCI6NTJ9XSwzNzpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4ndXNlIHN0cmljdCc7XG5cbnZhciBpcyA9IHJlcXVpcmUoJy4vaXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjbG9uZShzb3VyY2UpIHtcbiAgdmFyIGRlc3QgPSB7fTtcbiAgZm9yICh2YXIgcHJvcCBpbiBzb3VyY2UpIHtcbiAgICBpZiAoaXMucGxhaW5PYmplY3Qoc291cmNlW3Byb3BdKSkge1xuICAgICAgZGVzdFtwcm9wXSA9IGNsb25lKHNvdXJjZVtwcm9wXSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlc3RbcHJvcF0gPSBzb3VyY2VbcHJvcF07XG4gICAgfVxuICB9XG4gIHJldHVybiBkZXN0O1xufTtcblxufSx7XCIuL2lzXCI6NDZ9XSwzODpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4ndXNlIHN0cmljdCc7XG5cbnZhciBkb21PYmplY3RzID0ge307XG52YXIgd2luID0gcmVxdWlyZSgnLi93aW5kb3cnKS53aW5kb3c7XG5cbmZ1bmN0aW9uIGJsYW5rKCkge31cblxuZG9tT2JqZWN0cy5kb2N1bWVudCA9IHdpbi5kb2N1bWVudDtcbmRvbU9iamVjdHMuRG9jdW1lbnRGcmFnbWVudCA9IHdpbi5Eb2N1bWVudEZyYWdtZW50IHx8IGJsYW5rO1xuZG9tT2JqZWN0cy5TVkdFbGVtZW50ID0gd2luLlNWR0VsZW1lbnQgfHwgYmxhbms7XG5kb21PYmplY3RzLlNWR1NWR0VsZW1lbnQgPSB3aW4uU1ZHU1ZHRWxlbWVudCB8fCBibGFuaztcbmRvbU9iamVjdHMuU1ZHRWxlbWVudEluc3RhbmNlID0gd2luLlNWR0VsZW1lbnRJbnN0YW5jZSB8fCBibGFuaztcbmRvbU9iamVjdHMuRWxlbWVudCA9IHdpbi5FbGVtZW50IHx8IGJsYW5rO1xuZG9tT2JqZWN0cy5IVE1MRWxlbWVudCA9IHdpbi5IVE1MRWxlbWVudCB8fCBkb21PYmplY3RzLkVsZW1lbnQ7XG5cbmRvbU9iamVjdHMuRXZlbnQgPSB3aW4uRXZlbnQ7XG5kb21PYmplY3RzLlRvdWNoID0gd2luLlRvdWNoIHx8IGJsYW5rO1xuZG9tT2JqZWN0cy5Qb2ludGVyRXZlbnQgPSB3aW4uUG9pbnRlckV2ZW50IHx8IHdpbi5NU1BvaW50ZXJFdmVudDtcblxubW9kdWxlLmV4cG9ydHMgPSBkb21PYmplY3RzO1xuXG59LHtcIi4vd2luZG93XCI6NTJ9XSwzOTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4ndXNlIHN0cmljdCc7XG5cbnZhciB3aW4gPSByZXF1aXJlKCcuL3dpbmRvdycpO1xudmFyIGJyb3dzZXIgPSByZXF1aXJlKCcuL2Jyb3dzZXInKTtcbnZhciBpcyA9IHJlcXVpcmUoJy4vaXMnKTtcbnZhciBkb21PYmplY3RzID0gcmVxdWlyZSgnLi9kb21PYmplY3RzJyk7XG5cbnZhciBkb21VdGlscyA9IHtcbiAgbm9kZUNvbnRhaW5zOiBmdW5jdGlvbiBub2RlQ29udGFpbnMocGFyZW50LCBjaGlsZCkge1xuICAgIHdoaWxlIChjaGlsZCkge1xuICAgICAgaWYgKGNoaWxkID09PSBwYXJlbnQpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG5cbiAgICAgIGNoaWxkID0gY2hpbGQucGFyZW50Tm9kZTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH0sXG5cbiAgY2xvc2VzdDogZnVuY3Rpb24gY2xvc2VzdChlbGVtZW50LCBzZWxlY3Rvcikge1xuICAgIHdoaWxlIChpcy5lbGVtZW50KGVsZW1lbnQpKSB7XG4gICAgICBpZiAoZG9tVXRpbHMubWF0Y2hlc1NlbGVjdG9yKGVsZW1lbnQsIHNlbGVjdG9yKSkge1xuICAgICAgICByZXR1cm4gZWxlbWVudDtcbiAgICAgIH1cblxuICAgICAgZWxlbWVudCA9IGRvbVV0aWxzLnBhcmVudE5vZGUoZWxlbWVudCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH0sXG5cbiAgcGFyZW50Tm9kZTogZnVuY3Rpb24gcGFyZW50Tm9kZShub2RlKSB7XG4gICAgdmFyIHBhcmVudCA9IG5vZGUucGFyZW50Tm9kZTtcblxuICAgIGlmIChpcy5kb2NGcmFnKHBhcmVudCkpIHtcbiAgICAgIC8vIHNraXAgcGFzdCAjc2hhZG8tcm9vdCBmcmFnbWVudHNcbiAgICAgIHdoaWxlICgocGFyZW50ID0gcGFyZW50Lmhvc3QpICYmIGlzLmRvY0ZyYWcocGFyZW50KSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHBhcmVudDtcbiAgICB9XG5cbiAgICByZXR1cm4gcGFyZW50O1xuICB9LFxuXG4gIG1hdGNoZXNTZWxlY3RvcjogZnVuY3Rpb24gbWF0Y2hlc1NlbGVjdG9yKGVsZW1lbnQsIHNlbGVjdG9yKSB7XG4gICAgLy8gcmVtb3ZlIC9kZWVwLyBmcm9tIHNlbGVjdG9ycyBpZiBzaGFkb3dET00gcG9seWZpbGwgaXMgdXNlZFxuICAgIGlmICh3aW4ud2luZG93ICE9PSB3aW4ucmVhbFdpbmRvdykge1xuICAgICAgc2VsZWN0b3IgPSBzZWxlY3Rvci5yZXBsYWNlKC9cXC9kZWVwXFwvL2csICcgJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGVsZW1lbnRbYnJvd3Nlci5wcmVmaXhlZE1hdGNoZXNTZWxlY3Rvcl0oc2VsZWN0b3IpO1xuICB9LFxuXG4gIC8vIFRlc3QgZm9yIHRoZSBlbGVtZW50IHRoYXQncyBcImFib3ZlXCIgYWxsIG90aGVyIHF1YWxpZmllcnNcbiAgaW5kZXhPZkRlZXBlc3RFbGVtZW50OiBmdW5jdGlvbiBpbmRleE9mRGVlcGVzdEVsZW1lbnQoZWxlbWVudHMpIHtcbiAgICB2YXIgZGVlcGVzdFpvbmVQYXJlbnRzID0gW107XG4gICAgdmFyIGRyb3B6b25lUGFyZW50cyA9IFtdO1xuICAgIHZhciBkcm9wem9uZSA9IHZvaWQgMDtcbiAgICB2YXIgZGVlcGVzdFpvbmUgPSBlbGVtZW50c1swXTtcbiAgICB2YXIgaW5kZXggPSBkZWVwZXN0Wm9uZSA/IDAgOiAtMTtcbiAgICB2YXIgcGFyZW50ID0gdm9pZCAwO1xuICAgIHZhciBjaGlsZCA9IHZvaWQgMDtcbiAgICB2YXIgaSA9IHZvaWQgMDtcbiAgICB2YXIgbiA9IHZvaWQgMDtcblxuICAgIGZvciAoaSA9IDE7IGkgPCBlbGVtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgZHJvcHpvbmUgPSBlbGVtZW50c1tpXTtcblxuICAgICAgLy8gYW4gZWxlbWVudCBtaWdodCBiZWxvbmcgdG8gbXVsdGlwbGUgc2VsZWN0b3IgZHJvcHpvbmVzXG4gICAgICBpZiAoIWRyb3B6b25lIHx8IGRyb3B6b25lID09PSBkZWVwZXN0Wm9uZSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFkZWVwZXN0Wm9uZSkge1xuICAgICAgICBkZWVwZXN0Wm9uZSA9IGRyb3B6b25lO1xuICAgICAgICBpbmRleCA9IGk7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICAvLyBjaGVjayBpZiB0aGUgZGVlcGVzdCBvciBjdXJyZW50IGFyZSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQgb3IgZG9jdW1lbnQucm9vdEVsZW1lbnRcbiAgICAgIC8vIC0gaWYgdGhlIGN1cnJlbnQgZHJvcHpvbmUgaXMsIGRvIG5vdGhpbmcgYW5kIGNvbnRpbnVlXG4gICAgICBpZiAoZHJvcHpvbmUucGFyZW50Tm9kZSA9PT0gZHJvcHpvbmUub3duZXJEb2N1bWVudCkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIC8vIC0gaWYgZGVlcGVzdCBpcywgdXBkYXRlIHdpdGggdGhlIGN1cnJlbnQgZHJvcHpvbmUgYW5kIGNvbnRpbnVlIHRvIG5leHRcbiAgICAgIGVsc2UgaWYgKGRlZXBlc3Rab25lLnBhcmVudE5vZGUgPT09IGRyb3B6b25lLm93bmVyRG9jdW1lbnQpIHtcbiAgICAgICAgICBkZWVwZXN0Wm9uZSA9IGRyb3B6b25lO1xuICAgICAgICAgIGluZGV4ID0gaTtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICBpZiAoIWRlZXBlc3Rab25lUGFyZW50cy5sZW5ndGgpIHtcbiAgICAgICAgcGFyZW50ID0gZGVlcGVzdFpvbmU7XG4gICAgICAgIHdoaWxlIChwYXJlbnQucGFyZW50Tm9kZSAmJiBwYXJlbnQucGFyZW50Tm9kZSAhPT0gcGFyZW50Lm93bmVyRG9jdW1lbnQpIHtcbiAgICAgICAgICBkZWVwZXN0Wm9uZVBhcmVudHMudW5zaGlmdChwYXJlbnQpO1xuICAgICAgICAgIHBhcmVudCA9IHBhcmVudC5wYXJlbnROb2RlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIGlmIHRoaXMgZWxlbWVudCBpcyBhbiBzdmcgZWxlbWVudCBhbmQgdGhlIGN1cnJlbnQgZGVlcGVzdCBpc1xuICAgICAgLy8gYW4gSFRNTEVsZW1lbnRcbiAgICAgIGlmIChkZWVwZXN0Wm9uZSBpbnN0YW5jZW9mIGRvbU9iamVjdHMuSFRNTEVsZW1lbnQgJiYgZHJvcHpvbmUgaW5zdGFuY2VvZiBkb21PYmplY3RzLlNWR0VsZW1lbnQgJiYgIShkcm9wem9uZSBpbnN0YW5jZW9mIGRvbU9iamVjdHMuU1ZHU1ZHRWxlbWVudCkpIHtcblxuICAgICAgICBpZiAoZHJvcHpvbmUgPT09IGRlZXBlc3Rab25lLnBhcmVudE5vZGUpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHBhcmVudCA9IGRyb3B6b25lLm93bmVyU1ZHRWxlbWVudDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBhcmVudCA9IGRyb3B6b25lO1xuICAgICAgfVxuXG4gICAgICBkcm9wem9uZVBhcmVudHMgPSBbXTtcblxuICAgICAgd2hpbGUgKHBhcmVudC5wYXJlbnROb2RlICE9PSBwYXJlbnQub3duZXJEb2N1bWVudCkge1xuICAgICAgICBkcm9wem9uZVBhcmVudHMudW5zaGlmdChwYXJlbnQpO1xuICAgICAgICBwYXJlbnQgPSBwYXJlbnQucGFyZW50Tm9kZTtcbiAgICAgIH1cblxuICAgICAgbiA9IDA7XG5cbiAgICAgIC8vIGdldCAocG9zaXRpb24gb2YgbGFzdCBjb21tb24gYW5jZXN0b3IpICsgMVxuICAgICAgd2hpbGUgKGRyb3B6b25lUGFyZW50c1tuXSAmJiBkcm9wem9uZVBhcmVudHNbbl0gPT09IGRlZXBlc3Rab25lUGFyZW50c1tuXSkge1xuICAgICAgICBuKys7XG4gICAgICB9XG5cbiAgICAgIHZhciBwYXJlbnRzID0gW2Ryb3B6b25lUGFyZW50c1tuIC0gMV0sIGRyb3B6b25lUGFyZW50c1tuXSwgZGVlcGVzdFpvbmVQYXJlbnRzW25dXTtcblxuICAgICAgY2hpbGQgPSBwYXJlbnRzWzBdLmxhc3RDaGlsZDtcblxuICAgICAgd2hpbGUgKGNoaWxkKSB7XG4gICAgICAgIGlmIChjaGlsZCA9PT0gcGFyZW50c1sxXSkge1xuICAgICAgICAgIGRlZXBlc3Rab25lID0gZHJvcHpvbmU7XG4gICAgICAgICAgaW5kZXggPSBpO1xuICAgICAgICAgIGRlZXBlc3Rab25lUGFyZW50cyA9IFtdO1xuXG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH0gZWxzZSBpZiAoY2hpbGQgPT09IHBhcmVudHNbMl0pIHtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGNoaWxkID0gY2hpbGQucHJldmlvdXNTaWJsaW5nO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBpbmRleDtcbiAgfSxcblxuICBtYXRjaGVzVXBUbzogZnVuY3Rpb24gbWF0Y2hlc1VwVG8oZWxlbWVudCwgc2VsZWN0b3IsIGxpbWl0KSB7XG4gICAgd2hpbGUgKGlzLmVsZW1lbnQoZWxlbWVudCkpIHtcbiAgICAgIGlmIChkb21VdGlscy5tYXRjaGVzU2VsZWN0b3IoZWxlbWVudCwgc2VsZWN0b3IpKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuXG4gICAgICBlbGVtZW50ID0gZG9tVXRpbHMucGFyZW50Tm9kZShlbGVtZW50KTtcblxuICAgICAgaWYgKGVsZW1lbnQgPT09IGxpbWl0KSB7XG4gICAgICAgIHJldHVybiBkb21VdGlscy5tYXRjaGVzU2VsZWN0b3IoZWxlbWVudCwgc2VsZWN0b3IpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfSxcblxuICBnZXRBY3R1YWxFbGVtZW50OiBmdW5jdGlvbiBnZXRBY3R1YWxFbGVtZW50KGVsZW1lbnQpIHtcbiAgICByZXR1cm4gZWxlbWVudCBpbnN0YW5jZW9mIGRvbU9iamVjdHMuU1ZHRWxlbWVudEluc3RhbmNlID8gZWxlbWVudC5jb3JyZXNwb25kaW5nVXNlRWxlbWVudCA6IGVsZW1lbnQ7XG4gIH0sXG5cbiAgZ2V0U2Nyb2xsWFk6IGZ1bmN0aW9uIGdldFNjcm9sbFhZKHJlbGV2YW50V2luZG93KSB7XG4gICAgcmVsZXZhbnRXaW5kb3cgPSByZWxldmFudFdpbmRvdyB8fCB3aW4ud2luZG93O1xuICAgIHJldHVybiB7XG4gICAgICB4OiByZWxldmFudFdpbmRvdy5zY3JvbGxYIHx8IHJlbGV2YW50V2luZG93LmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxMZWZ0LFxuICAgICAgeTogcmVsZXZhbnRXaW5kb3cuc2Nyb2xsWSB8fCByZWxldmFudFdpbmRvdy5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wXG4gICAgfTtcbiAgfSxcblxuICBnZXRFbGVtZW50Q2xpZW50UmVjdDogZnVuY3Rpb24gZ2V0RWxlbWVudENsaWVudFJlY3QoZWxlbWVudCkge1xuICAgIHZhciBjbGllbnRSZWN0ID0gZWxlbWVudCBpbnN0YW5jZW9mIGRvbU9iamVjdHMuU1ZHRWxlbWVudCA/IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkgOiBlbGVtZW50LmdldENsaWVudFJlY3RzKClbMF07XG5cbiAgICByZXR1cm4gY2xpZW50UmVjdCAmJiB7XG4gICAgICBsZWZ0OiBjbGllbnRSZWN0LmxlZnQsXG4gICAgICByaWdodDogY2xpZW50UmVjdC5yaWdodCxcbiAgICAgIHRvcDogY2xpZW50UmVjdC50b3AsXG4gICAgICBib3R0b206IGNsaWVudFJlY3QuYm90dG9tLFxuICAgICAgd2lkdGg6IGNsaWVudFJlY3Qud2lkdGggfHwgY2xpZW50UmVjdC5yaWdodCAtIGNsaWVudFJlY3QubGVmdCxcbiAgICAgIGhlaWdodDogY2xpZW50UmVjdC5oZWlnaHQgfHwgY2xpZW50UmVjdC5ib3R0b20gLSBjbGllbnRSZWN0LnRvcFxuICAgIH07XG4gIH0sXG5cbiAgZ2V0RWxlbWVudFJlY3Q6IGZ1bmN0aW9uIGdldEVsZW1lbnRSZWN0KGVsZW1lbnQpIHtcbiAgICB2YXIgY2xpZW50UmVjdCA9IGRvbVV0aWxzLmdldEVsZW1lbnRDbGllbnRSZWN0KGVsZW1lbnQpO1xuXG4gICAgaWYgKCFicm93c2VyLmlzSU9TNyAmJiBjbGllbnRSZWN0KSB7XG4gICAgICB2YXIgc2Nyb2xsID0gZG9tVXRpbHMuZ2V0U2Nyb2xsWFkod2luLmdldFdpbmRvdyhlbGVtZW50KSk7XG5cbiAgICAgIGNsaWVudFJlY3QubGVmdCArPSBzY3JvbGwueDtcbiAgICAgIGNsaWVudFJlY3QucmlnaHQgKz0gc2Nyb2xsLng7XG4gICAgICBjbGllbnRSZWN0LnRvcCArPSBzY3JvbGwueTtcbiAgICAgIGNsaWVudFJlY3QuYm90dG9tICs9IHNjcm9sbC55O1xuICAgIH1cblxuICAgIHJldHVybiBjbGllbnRSZWN0O1xuICB9LFxuXG4gIGdldFBhdGg6IGZ1bmN0aW9uIGdldFBhdGgoZWxlbWVudCkge1xuICAgIHZhciBwYXRoID0gW107XG5cbiAgICB3aGlsZSAoZWxlbWVudCkge1xuICAgICAgcGF0aC5wdXNoKGVsZW1lbnQpO1xuICAgICAgZWxlbWVudCA9IGRvbVV0aWxzLnBhcmVudE5vZGUoZWxlbWVudCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHBhdGg7XG4gIH0sXG5cbiAgdHJ5U2VsZWN0b3I6IGZ1bmN0aW9uIHRyeVNlbGVjdG9yKHZhbHVlKSB7XG4gICAgaWYgKCFpcy5zdHJpbmcodmFsdWUpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gYW4gZXhjZXB0aW9uIHdpbGwgYmUgcmFpc2VkIGlmIGl0IGlzIGludmFsaWRcbiAgICBkb21PYmplY3RzLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodmFsdWUpO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGRvbVV0aWxzO1xuXG59LHtcIi4vYnJvd3NlclwiOjM2LFwiLi9kb21PYmplY3RzXCI6MzgsXCIuL2lzXCI6NDYsXCIuL3dpbmRvd1wiOjUyfV0sNDA6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgaXMgPSByZXF1aXJlKCcuL2lzJyk7XG52YXIgZG9tVXRpbHMgPSByZXF1aXJlKCcuL2RvbVV0aWxzJyk7XG52YXIgcG9pbnRlclV0aWxzID0gcmVxdWlyZSgnLi9wb2ludGVyVXRpbHMnKTtcbnZhciBwRXh0ZW5kID0gcmVxdWlyZSgnLi9wb2ludGVyRXh0ZW5kJyk7XG5cbnZhciBfcmVxdWlyZSA9IHJlcXVpcmUoJy4vd2luZG93JyksXG4gICAgd2luZG93ID0gX3JlcXVpcmUud2luZG93O1xuXG52YXIgX3JlcXVpcmUyID0gcmVxdWlyZSgnLi9hcnInKSxcbiAgICBjb250YWlucyA9IF9yZXF1aXJlMi5jb250YWlucztcblxudmFyIGVsZW1lbnRzID0gW107XG52YXIgdGFyZ2V0cyA9IFtdO1xuXG4vLyB7XG4vLyAgIHR5cGU6IHtcbi8vICAgICBzZWxlY3RvcnM6IFsnc2VsZWN0b3InLCAuLi5dLFxuLy8gICAgIGNvbnRleHRzIDogW2RvY3VtZW50LCAuLi5dLFxuLy8gICAgIGxpc3RlbmVyczogW1tsaXN0ZW5lciwgY2FwdHVyZSwgcGFzc2l2ZV0sIC4uLl1cbi8vICAgfVxuLy8gIH1cbnZhciBkZWxlZ2F0ZWRFdmVudHMgPSB7fTtcbnZhciBkb2N1bWVudHMgPSBbXTtcblxudmFyIHN1cHBvcnRzT3B0aW9ucyA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHN1cHBvcnRlZCA9IGZhbHNlO1xuXG4gIHdpbmRvdy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKS5hZGRFdmVudExpc3RlbmVyKCd0ZXN0JywgbnVsbCwge1xuICAgIGdldCBjYXB0dXJlKCkge1xuICAgICAgc3VwcG9ydGVkID0gdHJ1ZTtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBzdXBwb3J0ZWQ7XG59KCk7XG5cbmZ1bmN0aW9uIGFkZChlbGVtZW50LCB0eXBlLCBsaXN0ZW5lciwgb3B0aW9uYWxBcmcpIHtcbiAgdmFyIG9wdGlvbnMgPSBnZXRPcHRpb25zKG9wdGlvbmFsQXJnKTtcbiAgdmFyIGVsZW1lbnRJbmRleCA9IGVsZW1lbnRzLmluZGV4T2YoZWxlbWVudCk7XG4gIHZhciB0YXJnZXQgPSB0YXJnZXRzW2VsZW1lbnRJbmRleF07XG5cbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0YXJnZXQgPSB7XG4gICAgICBldmVudHM6IHt9LFxuICAgICAgdHlwZUNvdW50OiAwXG4gICAgfTtcblxuICAgIGVsZW1lbnRJbmRleCA9IGVsZW1lbnRzLnB1c2goZWxlbWVudCkgLSAxO1xuICAgIHRhcmdldHMucHVzaCh0YXJnZXQpO1xuICB9XG5cbiAgaWYgKCF0YXJnZXQuZXZlbnRzW3R5cGVdKSB7XG4gICAgdGFyZ2V0LmV2ZW50c1t0eXBlXSA9IFtdO1xuICAgIHRhcmdldC50eXBlQ291bnQrKztcbiAgfVxuXG4gIGlmICghY29udGFpbnModGFyZ2V0LmV2ZW50c1t0eXBlXSwgbGlzdGVuZXIpKSB7XG4gICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyLCBzdXBwb3J0c09wdGlvbnMgPyBvcHRpb25zIDogISFvcHRpb25zLmNhcHR1cmUpO1xuICAgIHRhcmdldC5ldmVudHNbdHlwZV0ucHVzaChsaXN0ZW5lcik7XG4gIH1cbn1cblxuZnVuY3Rpb24gcmVtb3ZlKGVsZW1lbnQsIHR5cGUsIGxpc3RlbmVyLCBvcHRpb25hbEFyZykge1xuICB2YXIgb3B0aW9ucyA9IGdldE9wdGlvbnMob3B0aW9uYWxBcmcpO1xuICB2YXIgZWxlbWVudEluZGV4ID0gZWxlbWVudHMuaW5kZXhPZihlbGVtZW50KTtcbiAgdmFyIHRhcmdldCA9IHRhcmdldHNbZWxlbWVudEluZGV4XTtcblxuICBpZiAoIXRhcmdldCB8fCAhdGFyZ2V0LmV2ZW50cykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmICh0eXBlID09PSAnYWxsJykge1xuICAgIGZvciAodHlwZSBpbiB0YXJnZXQuZXZlbnRzKSB7XG4gICAgICBpZiAodGFyZ2V0LmV2ZW50cy5oYXNPd25Qcm9wZXJ0eSh0eXBlKSkge1xuICAgICAgICByZW1vdmUoZWxlbWVudCwgdHlwZSwgJ2FsbCcpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAodGFyZ2V0LmV2ZW50c1t0eXBlXSkge1xuICAgIHZhciBsZW4gPSB0YXJnZXQuZXZlbnRzW3R5cGVdLmxlbmd0aDtcblxuICAgIGlmIChsaXN0ZW5lciA9PT0gJ2FsbCcpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgcmVtb3ZlKGVsZW1lbnQsIHR5cGUsIHRhcmdldC5ldmVudHNbdHlwZV1baV0sIG9wdGlvbnMpO1xuICAgICAgfVxuICAgICAgcmV0dXJuO1xuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGVuOyBfaSsrKSB7XG4gICAgICAgIGlmICh0YXJnZXQuZXZlbnRzW3R5cGVdW19pXSA9PT0gbGlzdGVuZXIpIHtcbiAgICAgICAgICBlbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ29uJyArIHR5cGUsIGxpc3RlbmVyLCBzdXBwb3J0c09wdGlvbnMgPyBvcHRpb25zIDogISFvcHRpb25zLmNhcHR1cmUpO1xuICAgICAgICAgIHRhcmdldC5ldmVudHNbdHlwZV0uc3BsaWNlKF9pLCAxKTtcblxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRhcmdldC5ldmVudHNbdHlwZV0gJiYgdGFyZ2V0LmV2ZW50c1t0eXBlXS5sZW5ndGggPT09IDApIHtcbiAgICAgIHRhcmdldC5ldmVudHNbdHlwZV0gPSBudWxsO1xuICAgICAgdGFyZ2V0LnR5cGVDb3VudC0tO1xuICAgIH1cbiAgfVxuXG4gIGlmICghdGFyZ2V0LnR5cGVDb3VudCkge1xuICAgIHRhcmdldHMuc3BsaWNlKGVsZW1lbnRJbmRleCwgMSk7XG4gICAgZWxlbWVudHMuc3BsaWNlKGVsZW1lbnRJbmRleCwgMSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gYWRkRGVsZWdhdGUoc2VsZWN0b3IsIGNvbnRleHQsIHR5cGUsIGxpc3RlbmVyLCBvcHRpb25hbEFyZykge1xuICB2YXIgb3B0aW9ucyA9IGdldE9wdGlvbnMob3B0aW9uYWxBcmcpO1xuICBpZiAoIWRlbGVnYXRlZEV2ZW50c1t0eXBlXSkge1xuICAgIGRlbGVnYXRlZEV2ZW50c1t0eXBlXSA9IHtcbiAgICAgIHNlbGVjdG9yczogW10sXG4gICAgICBjb250ZXh0czogW10sXG4gICAgICBsaXN0ZW5lcnM6IFtdXG4gICAgfTtcblxuICAgIC8vIGFkZCBkZWxlZ2F0ZSBsaXN0ZW5lciBmdW5jdGlvbnNcbiAgICBmb3IgKHZhciBfaTIgPSAwOyBfaTIgPCBkb2N1bWVudHMubGVuZ3RoOyBfaTIrKykge1xuICAgICAgdmFyIGRvYyA9IGRvY3VtZW50c1tfaTJdO1xuICAgICAgYWRkKGRvYywgdHlwZSwgZGVsZWdhdGVMaXN0ZW5lcik7XG4gICAgICBhZGQoZG9jLCB0eXBlLCBkZWxlZ2F0ZVVzZUNhcHR1cmUsIHRydWUpO1xuICAgIH1cbiAgfVxuXG4gIHZhciBkZWxlZ2F0ZWQgPSBkZWxlZ2F0ZWRFdmVudHNbdHlwZV07XG4gIHZhciBpbmRleCA9IHZvaWQgMDtcblxuICBmb3IgKGluZGV4ID0gZGVsZWdhdGVkLnNlbGVjdG9ycy5sZW5ndGggLSAxOyBpbmRleCA+PSAwOyBpbmRleC0tKSB7XG4gICAgaWYgKGRlbGVnYXRlZC5zZWxlY3RvcnNbaW5kZXhdID09PSBzZWxlY3RvciAmJiBkZWxlZ2F0ZWQuY29udGV4dHNbaW5kZXhdID09PSBjb250ZXh0KSB7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBpZiAoaW5kZXggPT09IC0xKSB7XG4gICAgaW5kZXggPSBkZWxlZ2F0ZWQuc2VsZWN0b3JzLmxlbmd0aDtcblxuICAgIGRlbGVnYXRlZC5zZWxlY3RvcnMucHVzaChzZWxlY3Rvcik7XG4gICAgZGVsZWdhdGVkLmNvbnRleHRzLnB1c2goY29udGV4dCk7XG4gICAgZGVsZWdhdGVkLmxpc3RlbmVycy5wdXNoKFtdKTtcbiAgfVxuXG4gIC8vIGtlZXAgbGlzdGVuZXIgYW5kIGNhcHR1cmUgYW5kIHBhc3NpdmUgZmxhZ3NcbiAgZGVsZWdhdGVkLmxpc3RlbmVyc1tpbmRleF0ucHVzaChbbGlzdGVuZXIsICEhb3B0aW9ucy5jYXB0dXJlLCBvcHRpb25zLnBhc3NpdmVdKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlRGVsZWdhdGUoc2VsZWN0b3IsIGNvbnRleHQsIHR5cGUsIGxpc3RlbmVyLCBvcHRpb25hbEFyZykge1xuICB2YXIgb3B0aW9ucyA9IGdldE9wdGlvbnMob3B0aW9uYWxBcmcpO1xuICB2YXIgZGVsZWdhdGVkID0gZGVsZWdhdGVkRXZlbnRzW3R5cGVdO1xuICB2YXIgbWF0Y2hGb3VuZCA9IGZhbHNlO1xuICB2YXIgaW5kZXggPSB2b2lkIDA7XG5cbiAgaWYgKCFkZWxlZ2F0ZWQpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBjb3VudCBmcm9tIGxhc3QgaW5kZXggb2YgZGVsZWdhdGVkIHRvIDBcbiAgZm9yIChpbmRleCA9IGRlbGVnYXRlZC5zZWxlY3RvcnMubGVuZ3RoIC0gMTsgaW5kZXggPj0gMDsgaW5kZXgtLSkge1xuICAgIC8vIGxvb2sgZm9yIG1hdGNoaW5nIHNlbGVjdG9yIGFuZCBjb250ZXh0IE5vZGVcbiAgICBpZiAoZGVsZWdhdGVkLnNlbGVjdG9yc1tpbmRleF0gPT09IHNlbGVjdG9yICYmIGRlbGVnYXRlZC5jb250ZXh0c1tpbmRleF0gPT09IGNvbnRleHQpIHtcblxuICAgICAgdmFyIGxpc3RlbmVycyA9IGRlbGVnYXRlZC5saXN0ZW5lcnNbaW5kZXhdO1xuXG4gICAgICAvLyBlYWNoIGl0ZW0gb2YgdGhlIGxpc3RlbmVycyBhcnJheSBpcyBhbiBhcnJheTogW2Z1bmN0aW9uLCBjYXB0dXJlLCBwYXNzaXZlXVxuICAgICAgZm9yICh2YXIgaSA9IGxpc3RlbmVycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICB2YXIgX2xpc3RlbmVycyRpID0gbGlzdGVuZXJzW2ldLFxuICAgICAgICAgICAgZm4gPSBfbGlzdGVuZXJzJGlbMF0sXG4gICAgICAgICAgICBjYXB0dXJlID0gX2xpc3RlbmVycyRpWzFdLFxuICAgICAgICAgICAgcGFzc2l2ZSA9IF9saXN0ZW5lcnMkaVsyXTtcblxuICAgICAgICAvLyBjaGVjayBpZiB0aGUgbGlzdGVuZXIgZnVuY3Rpb25zIGFuZCBjYXB0dXJlIGFuZCBwYXNzaXZlIGZsYWdzIG1hdGNoXG5cbiAgICAgICAgaWYgKGZuID09PSBsaXN0ZW5lciAmJiBjYXB0dXJlID09PSAhIW9wdGlvbnMuY2FwdHVyZSAmJiBwYXNzaXZlID09PSBvcHRpb25zLnBhc3NpdmUpIHtcbiAgICAgICAgICAvLyByZW1vdmUgdGhlIGxpc3RlbmVyIGZyb20gdGhlIGFycmF5IG9mIGxpc3RlbmVyc1xuICAgICAgICAgIGxpc3RlbmVycy5zcGxpY2UoaSwgMSk7XG5cbiAgICAgICAgICAvLyBpZiBhbGwgbGlzdGVuZXJzIGZvciB0aGlzIGludGVyYWN0YWJsZSBoYXZlIGJlZW4gcmVtb3ZlZFxuICAgICAgICAgIC8vIHJlbW92ZSB0aGUgaW50ZXJhY3RhYmxlIGZyb20gdGhlIGRlbGVnYXRlZCBhcnJheXNcbiAgICAgICAgICBpZiAoIWxpc3RlbmVycy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGRlbGVnYXRlZC5zZWxlY3RvcnMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgIGRlbGVnYXRlZC5jb250ZXh0cy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgZGVsZWdhdGVkLmxpc3RlbmVycy5zcGxpY2UoaW5kZXgsIDEpO1xuXG4gICAgICAgICAgICAvLyByZW1vdmUgZGVsZWdhdGUgZnVuY3Rpb24gZnJvbSBjb250ZXh0XG4gICAgICAgICAgICByZW1vdmUoY29udGV4dCwgdHlwZSwgZGVsZWdhdGVMaXN0ZW5lcik7XG4gICAgICAgICAgICByZW1vdmUoY29udGV4dCwgdHlwZSwgZGVsZWdhdGVVc2VDYXB0dXJlLCB0cnVlKTtcblxuICAgICAgICAgICAgLy8gcmVtb3ZlIHRoZSBhcnJheXMgaWYgdGhleSBhcmUgZW1wdHlcbiAgICAgICAgICAgIGlmICghZGVsZWdhdGVkLnNlbGVjdG9ycy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgZGVsZWdhdGVkRXZlbnRzW3R5cGVdID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBvbmx5IHJlbW92ZSBvbmUgbGlzdGVuZXJcbiAgICAgICAgICBtYXRjaEZvdW5kID0gdHJ1ZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAobWF0Y2hGb3VuZCkge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuLy8gYm91bmQgdG8gdGhlIGludGVyYWN0YWJsZSBjb250ZXh0IHdoZW4gYSBET00gZXZlbnRcbi8vIGxpc3RlbmVyIGlzIGFkZGVkIHRvIGEgc2VsZWN0b3IgaW50ZXJhY3RhYmxlXG5mdW5jdGlvbiBkZWxlZ2F0ZUxpc3RlbmVyKGV2ZW50LCBvcHRpb25hbEFyZykge1xuICB2YXIgb3B0aW9ucyA9IGdldE9wdGlvbnMob3B0aW9uYWxBcmcpO1xuICB2YXIgZmFrZUV2ZW50ID0ge307XG4gIHZhciBkZWxlZ2F0ZWQgPSBkZWxlZ2F0ZWRFdmVudHNbZXZlbnQudHlwZV07XG5cbiAgdmFyIF9wb2ludGVyVXRpbHMkZ2V0RXZlbiA9IHBvaW50ZXJVdGlscy5nZXRFdmVudFRhcmdldHMoZXZlbnQpLFxuICAgICAgZXZlbnRUYXJnZXQgPSBfcG9pbnRlclV0aWxzJGdldEV2ZW5bMF07XG5cbiAgdmFyIGVsZW1lbnQgPSBldmVudFRhcmdldDtcblxuICAvLyBkdXBsaWNhdGUgdGhlIGV2ZW50IHNvIHRoYXQgY3VycmVudFRhcmdldCBjYW4gYmUgY2hhbmdlZFxuICBwRXh0ZW5kKGZha2VFdmVudCwgZXZlbnQpO1xuXG4gIGZha2VFdmVudC5vcmlnaW5hbEV2ZW50ID0gZXZlbnQ7XG4gIGZha2VFdmVudC5wcmV2ZW50RGVmYXVsdCA9IHByZXZlbnRPcmlnaW5hbERlZmF1bHQ7XG5cbiAgLy8gY2xpbWIgdXAgZG9jdW1lbnQgdHJlZSBsb29raW5nIGZvciBzZWxlY3RvciBtYXRjaGVzXG4gIHdoaWxlIChpcy5lbGVtZW50KGVsZW1lbnQpKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkZWxlZ2F0ZWQuc2VsZWN0b3JzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgc2VsZWN0b3IgPSBkZWxlZ2F0ZWQuc2VsZWN0b3JzW2ldO1xuICAgICAgdmFyIGNvbnRleHQgPSBkZWxlZ2F0ZWQuY29udGV4dHNbaV07XG5cbiAgICAgIGlmIChkb21VdGlscy5tYXRjaGVzU2VsZWN0b3IoZWxlbWVudCwgc2VsZWN0b3IpICYmIGRvbVV0aWxzLm5vZGVDb250YWlucyhjb250ZXh0LCBldmVudFRhcmdldCkgJiYgZG9tVXRpbHMubm9kZUNvbnRhaW5zKGNvbnRleHQsIGVsZW1lbnQpKSB7XG5cbiAgICAgICAgdmFyIGxpc3RlbmVycyA9IGRlbGVnYXRlZC5saXN0ZW5lcnNbaV07XG5cbiAgICAgICAgZmFrZUV2ZW50LmN1cnJlbnRUYXJnZXQgPSBlbGVtZW50O1xuXG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgbGlzdGVuZXJzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgdmFyIF9saXN0ZW5lcnMkaiA9IGxpc3RlbmVyc1tqXSxcbiAgICAgICAgICAgICAgZm4gPSBfbGlzdGVuZXJzJGpbMF0sXG4gICAgICAgICAgICAgIGNhcHR1cmUgPSBfbGlzdGVuZXJzJGpbMV0sXG4gICAgICAgICAgICAgIHBhc3NpdmUgPSBfbGlzdGVuZXJzJGpbMl07XG5cblxuICAgICAgICAgIGlmIChjYXB0dXJlID09PSAhIW9wdGlvbnMuY2FwdHVyZSAmJiBwYXNzaXZlID09PSBvcHRpb25zLnBhc3NpdmUpIHtcbiAgICAgICAgICAgIGZuKGZha2VFdmVudCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZWxlbWVudCA9IGRvbVV0aWxzLnBhcmVudE5vZGUoZWxlbWVudCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZGVsZWdhdGVVc2VDYXB0dXJlKGV2ZW50KSB7XG4gIHJldHVybiBkZWxlZ2F0ZUxpc3RlbmVyLmNhbGwodGhpcywgZXZlbnQsIHRydWUpO1xufVxuXG5mdW5jdGlvbiBwcmV2ZW50T3JpZ2luYWxEZWZhdWx0KCkge1xuICB0aGlzLm9yaWdpbmFsRXZlbnQucHJldmVudERlZmF1bHQoKTtcbn1cblxuZnVuY3Rpb24gZ2V0T3B0aW9ucyhwYXJhbSkge1xuICByZXR1cm4gaXMub2JqZWN0KHBhcmFtKSA/IHBhcmFtIDogeyBjYXB0dXJlOiBwYXJhbSB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgYWRkOiBhZGQsXG4gIHJlbW92ZTogcmVtb3ZlLFxuXG4gIGFkZERlbGVnYXRlOiBhZGREZWxlZ2F0ZSxcbiAgcmVtb3ZlRGVsZWdhdGU6IHJlbW92ZURlbGVnYXRlLFxuXG4gIGRlbGVnYXRlTGlzdGVuZXI6IGRlbGVnYXRlTGlzdGVuZXIsXG4gIGRlbGVnYXRlVXNlQ2FwdHVyZTogZGVsZWdhdGVVc2VDYXB0dXJlLFxuICBkZWxlZ2F0ZWRFdmVudHM6IGRlbGVnYXRlZEV2ZW50cyxcbiAgZG9jdW1lbnRzOiBkb2N1bWVudHMsXG5cbiAgc3VwcG9ydHNPcHRpb25zOiBzdXBwb3J0c09wdGlvbnMsXG5cbiAgX2VsZW1lbnRzOiBlbGVtZW50cyxcbiAgX3RhcmdldHM6IHRhcmdldHNcbn07XG5cbn0se1wiLi9hcnJcIjozNSxcIi4vZG9tVXRpbHNcIjozOSxcIi4vaXNcIjo0NixcIi4vcG9pbnRlckV4dGVuZFwiOjQ4LFwiLi9wb2ludGVyVXRpbHNcIjo0OSxcIi4vd2luZG93XCI6NTJ9XSw0MTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBleHRlbmQoZGVzdCwgc291cmNlKSB7XG4gIGZvciAodmFyIHByb3AgaW4gc291cmNlKSB7XG4gICAgZGVzdFtwcm9wXSA9IHNvdXJjZVtwcm9wXTtcbiAgfVxuICByZXR1cm4gZGVzdDtcbn07XG5cbn0se31dLDQyOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbid1c2Ugc3RyaWN0JztcblxudmFyIF9yZXF1aXJlID0gcmVxdWlyZSgnLi9yZWN0JyksXG4gICAgcmVzb2x2ZVJlY3RMaWtlID0gX3JlcXVpcmUucmVzb2x2ZVJlY3RMaWtlLFxuICAgIHJlY3RUb1hZID0gX3JlcXVpcmUucmVjdFRvWFk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHRhcmdldCwgZWxlbWVudCwgYWN0aW9uKSB7XG4gIHZhciBhY3Rpb25PcHRpb25zID0gdGFyZ2V0Lm9wdGlvbnNbYWN0aW9uXTtcbiAgdmFyIGFjdGlvbk9yaWdpbiA9IGFjdGlvbk9wdGlvbnMgJiYgYWN0aW9uT3B0aW9ucy5vcmlnaW47XG4gIHZhciBvcmlnaW4gPSBhY3Rpb25PcmlnaW4gfHwgdGFyZ2V0Lm9wdGlvbnMub3JpZ2luO1xuXG4gIHZhciBvcmlnaW5SZWN0ID0gcmVzb2x2ZVJlY3RMaWtlKG9yaWdpbiwgdGFyZ2V0LCBlbGVtZW50LCBbdGFyZ2V0ICYmIGVsZW1lbnRdKTtcblxuICByZXR1cm4gcmVjdFRvWFkob3JpZ2luUmVjdCkgfHwgeyB4OiAwLCB5OiAwIH07XG59O1xuXG59LHtcIi4vcmVjdFwiOjUxfV0sNDM6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHgsIHkpIHtcbiAgcmV0dXJuIE1hdGguc3FydCh4ICogeCArIHkgKiB5KTtcbn07XG5cbn0se31dLDQ0OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbid1c2Ugc3RyaWN0JztcblxudmFyIGV4dGVuZCA9IHJlcXVpcmUoJy4vZXh0ZW5kJyk7XG52YXIgd2luID0gcmVxdWlyZSgnLi93aW5kb3cnKTtcblxudmFyIHV0aWxzID0ge1xuICB3YXJuT25jZTogZnVuY3Rpb24gd2Fybk9uY2UobWV0aG9kLCBtZXNzYWdlKSB7XG4gICAgdmFyIHdhcm5lZCA9IGZhbHNlO1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICghd2FybmVkKSB7XG4gICAgICAgIHdpbi53aW5kb3cuY29uc29sZS53YXJuKG1lc3NhZ2UpO1xuICAgICAgICB3YXJuZWQgPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbWV0aG9kLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfTtcbiAgfSxcblxuICAvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS81NjM0NTI4LzIyODA4ODhcbiAgX2dldFFCZXppZXJWYWx1ZTogZnVuY3Rpb24gX2dldFFCZXppZXJWYWx1ZSh0LCBwMSwgcDIsIHAzKSB7XG4gICAgdmFyIGlUID0gMSAtIHQ7XG4gICAgcmV0dXJuIGlUICogaVQgKiBwMSArIDIgKiBpVCAqIHQgKiBwMiArIHQgKiB0ICogcDM7XG4gIH0sXG5cbiAgZ2V0UXVhZHJhdGljQ3VydmVQb2ludDogZnVuY3Rpb24gZ2V0UXVhZHJhdGljQ3VydmVQb2ludChzdGFydFgsIHN0YXJ0WSwgY3BYLCBjcFksIGVuZFgsIGVuZFksIHBvc2l0aW9uKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHg6IHV0aWxzLl9nZXRRQmV6aWVyVmFsdWUocG9zaXRpb24sIHN0YXJ0WCwgY3BYLCBlbmRYKSxcbiAgICAgIHk6IHV0aWxzLl9nZXRRQmV6aWVyVmFsdWUocG9zaXRpb24sIHN0YXJ0WSwgY3BZLCBlbmRZKVxuICAgIH07XG4gIH0sXG5cbiAgLy8gaHR0cDovL2dpem1hLmNvbS9lYXNpbmcvXG4gIGVhc2VPdXRRdWFkOiBmdW5jdGlvbiBlYXNlT3V0UXVhZCh0LCBiLCBjLCBkKSB7XG4gICAgdCAvPSBkO1xuICAgIHJldHVybiAtYyAqIHQgKiAodCAtIDIpICsgYjtcbiAgfSxcblxuICBjb3B5QWN0aW9uOiBmdW5jdGlvbiBjb3B5QWN0aW9uKGRlc3QsIHNyYykge1xuICAgIGRlc3QubmFtZSA9IHNyYy5uYW1lO1xuICAgIGRlc3QuYXhpcyA9IHNyYy5heGlzO1xuICAgIGRlc3QuZWRnZXMgPSBzcmMuZWRnZXM7XG5cbiAgICByZXR1cm4gZGVzdDtcbiAgfSxcblxuICBpczogcmVxdWlyZSgnLi9pcycpLFxuICBleHRlbmQ6IGV4dGVuZCxcbiAgaHlwb3Q6IHJlcXVpcmUoJy4vaHlwb3QnKSxcbiAgZ2V0T3JpZ2luWFk6IHJlcXVpcmUoJy4vZ2V0T3JpZ2luWFknKVxufTtcblxuZXh0ZW5kKHV0aWxzLCByZXF1aXJlKCcuL2FycicpKTtcbmV4dGVuZCh1dGlscywgcmVxdWlyZSgnLi9kb21VdGlscycpKTtcbmV4dGVuZCh1dGlscywgcmVxdWlyZSgnLi9wb2ludGVyVXRpbHMnKSk7XG5leHRlbmQodXRpbHMsIHJlcXVpcmUoJy4vcmVjdCcpKTtcblxubW9kdWxlLmV4cG9ydHMgPSB1dGlscztcblxufSx7XCIuL2FyclwiOjM1LFwiLi9kb21VdGlsc1wiOjM5LFwiLi9leHRlbmRcIjo0MSxcIi4vZ2V0T3JpZ2luWFlcIjo0MixcIi4vaHlwb3RcIjo0MyxcIi4vaXNcIjo0NixcIi4vcG9pbnRlclV0aWxzXCI6NDksXCIuL3JlY3RcIjo1MSxcIi4vd2luZG93XCI6NTJ9XSw0NTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4ndXNlIHN0cmljdCc7XG5cbnZhciBzY29wZSA9IHJlcXVpcmUoJy4uL3Njb3BlJyk7XG52YXIgdXRpbHMgPSByZXF1aXJlKCcuL2luZGV4Jyk7XG5cbnZhciBmaW5kZXIgPSB7XG4gIG1ldGhvZE9yZGVyOiBbJ3NpbXVsYXRpb25SZXN1bWUnLCAnbW91c2VPclBlbicsICdoYXNQb2ludGVyJywgJ2lkbGUnXSxcblxuICBzZWFyY2g6IGZ1bmN0aW9uIHNlYXJjaChwb2ludGVyLCBldmVudFR5cGUsIGV2ZW50VGFyZ2V0KSB7XG4gICAgdmFyIHBvaW50ZXJUeXBlID0gdXRpbHMuZ2V0UG9pbnRlclR5cGUocG9pbnRlcik7XG4gICAgdmFyIHBvaW50ZXJJZCA9IHV0aWxzLmdldFBvaW50ZXJJZChwb2ludGVyKTtcbiAgICB2YXIgZGV0YWlscyA9IHsgcG9pbnRlcjogcG9pbnRlciwgcG9pbnRlcklkOiBwb2ludGVySWQsIHBvaW50ZXJUeXBlOiBwb2ludGVyVHlwZSwgZXZlbnRUeXBlOiBldmVudFR5cGUsIGV2ZW50VGFyZ2V0OiBldmVudFRhcmdldCB9O1xuXG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGZpbmRlci5tZXRob2RPcmRlci5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfcmVmO1xuXG4gICAgICBfcmVmID0gZmluZGVyLm1ldGhvZE9yZGVyW19pXTtcbiAgICAgIHZhciBtZXRob2QgPSBfcmVmO1xuXG4gICAgICB2YXIgaW50ZXJhY3Rpb24gPSBmaW5kZXJbbWV0aG9kXShkZXRhaWxzKTtcblxuICAgICAgaWYgKGludGVyYWN0aW9uKSB7XG4gICAgICAgIHJldHVybiBpbnRlcmFjdGlvbjtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgLy8gdHJ5IHRvIHJlc3VtZSBzaW11bGF0aW9uIHdpdGggYSBuZXcgcG9pbnRlclxuICBzaW11bGF0aW9uUmVzdW1lOiBmdW5jdGlvbiBzaW11bGF0aW9uUmVzdW1lKF9yZWYyKSB7XG4gICAgdmFyIHBvaW50ZXJUeXBlID0gX3JlZjIucG9pbnRlclR5cGUsXG4gICAgICAgIGV2ZW50VHlwZSA9IF9yZWYyLmV2ZW50VHlwZSxcbiAgICAgICAgZXZlbnRUYXJnZXQgPSBfcmVmMi5ldmVudFRhcmdldDtcblxuICAgIGlmICghL2Rvd258c3RhcnQvaS50ZXN0KGV2ZW50VHlwZSkpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGZvciAodmFyIF9pMiA9IDA7IF9pMiA8IHNjb3BlLmludGVyYWN0aW9ucy5sZW5ndGg7IF9pMisrKSB7XG4gICAgICB2YXIgX3JlZjM7XG5cbiAgICAgIF9yZWYzID0gc2NvcGUuaW50ZXJhY3Rpb25zW19pMl07XG4gICAgICB2YXIgaW50ZXJhY3Rpb24gPSBfcmVmMztcblxuICAgICAgdmFyIGVsZW1lbnQgPSBldmVudFRhcmdldDtcblxuICAgICAgaWYgKGludGVyYWN0aW9uLnNpbXVsYXRpb24gJiYgaW50ZXJhY3Rpb24uc2ltdWxhdGlvbi5hbGxvd1Jlc3VtZSAmJiBpbnRlcmFjdGlvbi5wb2ludGVyVHlwZSA9PT0gcG9pbnRlclR5cGUpIHtcbiAgICAgICAgd2hpbGUgKGVsZW1lbnQpIHtcbiAgICAgICAgICAvLyBpZiB0aGUgZWxlbWVudCBpcyB0aGUgaW50ZXJhY3Rpb24gZWxlbWVudFxuICAgICAgICAgIGlmIChlbGVtZW50ID09PSBpbnRlcmFjdGlvbi5lbGVtZW50KSB7XG4gICAgICAgICAgICByZXR1cm4gaW50ZXJhY3Rpb247XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsZW1lbnQgPSB1dGlscy5wYXJlbnROb2RlKGVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH0sXG5cbiAgLy8gaWYgaXQncyBhIG1vdXNlIG9yIHBlbiBpbnRlcmFjdGlvblxuICBtb3VzZU9yUGVuOiBmdW5jdGlvbiBtb3VzZU9yUGVuKF9yZWY0KSB7XG4gICAgdmFyIHBvaW50ZXJJZCA9IF9yZWY0LnBvaW50ZXJJZCxcbiAgICAgICAgcG9pbnRlclR5cGUgPSBfcmVmNC5wb2ludGVyVHlwZSxcbiAgICAgICAgZXZlbnRUeXBlID0gX3JlZjQuZXZlbnRUeXBlO1xuXG4gICAgaWYgKHBvaW50ZXJUeXBlICE9PSAnbW91c2UnICYmIHBvaW50ZXJUeXBlICE9PSAncGVuJykge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgdmFyIGZpcnN0Tm9uQWN0aXZlID0gdm9pZCAwO1xuXG4gICAgZm9yICh2YXIgX2kzID0gMDsgX2kzIDwgc2NvcGUuaW50ZXJhY3Rpb25zLmxlbmd0aDsgX2kzKyspIHtcbiAgICAgIHZhciBfcmVmNTtcblxuICAgICAgX3JlZjUgPSBzY29wZS5pbnRlcmFjdGlvbnNbX2kzXTtcbiAgICAgIHZhciBpbnRlcmFjdGlvbiA9IF9yZWY1O1xuXG4gICAgICBpZiAoaW50ZXJhY3Rpb24ucG9pbnRlclR5cGUgPT09IHBvaW50ZXJUeXBlKSB7XG4gICAgICAgIC8vIGlmIGl0J3MgYSBkb3duIGV2ZW50LCBza2lwIGludGVyYWN0aW9ucyB3aXRoIHJ1bm5pbmcgc2ltdWxhdGlvbnNcbiAgICAgICAgaWYgKGludGVyYWN0aW9uLnNpbXVsYXRpb24gJiYgIXV0aWxzLmNvbnRhaW5zKGludGVyYWN0aW9uLnBvaW50ZXJJZHMsIHBvaW50ZXJJZCkpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGlmIHRoZSBpbnRlcmFjdGlvbiBpcyBhY3RpdmUsIHJldHVybiBpdCBpbW1lZGlhdGVseVxuICAgICAgICBpZiAoaW50ZXJhY3Rpb24uaW50ZXJhY3RpbmcoKSkge1xuICAgICAgICAgIHJldHVybiBpbnRlcmFjdGlvbjtcbiAgICAgICAgfVxuICAgICAgICAvLyBvdGhlcndpc2Ugc2F2ZSBpdCBhbmQgbG9vayBmb3IgYW5vdGhlciBhY3RpdmUgaW50ZXJhY3Rpb25cbiAgICAgICAgZWxzZSBpZiAoIWZpcnN0Tm9uQWN0aXZlKSB7XG4gICAgICAgICAgICBmaXJzdE5vbkFjdGl2ZSA9IGludGVyYWN0aW9uO1xuICAgICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBpZiBubyBhY3RpdmUgbW91c2UgaW50ZXJhY3Rpb24gd2FzIGZvdW5kIHVzZSB0aGUgZmlyc3QgaW5hY3RpdmUgbW91c2VcbiAgICAvLyBpbnRlcmFjdGlvblxuICAgIGlmIChmaXJzdE5vbkFjdGl2ZSkge1xuICAgICAgcmV0dXJuIGZpcnN0Tm9uQWN0aXZlO1xuICAgIH1cblxuICAgIC8vIGZpbmQgYW55IG1vdXNlIG9yIHBlbiBpbnRlcmFjdGlvbi5cbiAgICAvLyBpZ25vcmUgdGhlIGludGVyYWN0aW9uIGlmIHRoZSBldmVudFR5cGUgaXMgYSAqZG93biwgYW5kIGEgc2ltdWxhdGlvblxuICAgIC8vIGlzIGFjdGl2ZVxuICAgIGZvciAodmFyIF9pNCA9IDA7IF9pNCA8IHNjb3BlLmludGVyYWN0aW9ucy5sZW5ndGg7IF9pNCsrKSB7XG4gICAgICB2YXIgX3JlZjY7XG5cbiAgICAgIF9yZWY2ID0gc2NvcGUuaW50ZXJhY3Rpb25zW19pNF07XG4gICAgICB2YXIgX2ludGVyYWN0aW9uID0gX3JlZjY7XG5cbiAgICAgIGlmIChfaW50ZXJhY3Rpb24ucG9pbnRlclR5cGUgPT09IHBvaW50ZXJUeXBlICYmICEoL2Rvd24vaS50ZXN0KGV2ZW50VHlwZSkgJiYgX2ludGVyYWN0aW9uLnNpbXVsYXRpb24pKSB7XG4gICAgICAgIHJldHVybiBfaW50ZXJhY3Rpb247XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH0sXG5cbiAgLy8gZ2V0IGludGVyYWN0aW9uIHRoYXQgaGFzIHRoaXMgcG9pbnRlclxuICBoYXNQb2ludGVyOiBmdW5jdGlvbiBoYXNQb2ludGVyKF9yZWY3KSB7XG4gICAgdmFyIHBvaW50ZXJJZCA9IF9yZWY3LnBvaW50ZXJJZDtcblxuICAgIGZvciAodmFyIF9pNSA9IDA7IF9pNSA8IHNjb3BlLmludGVyYWN0aW9ucy5sZW5ndGg7IF9pNSsrKSB7XG4gICAgICB2YXIgX3JlZjg7XG5cbiAgICAgIF9yZWY4ID0gc2NvcGUuaW50ZXJhY3Rpb25zW19pNV07XG4gICAgICB2YXIgaW50ZXJhY3Rpb24gPSBfcmVmODtcblxuICAgICAgaWYgKHV0aWxzLmNvbnRhaW5zKGludGVyYWN0aW9uLnBvaW50ZXJJZHMsIHBvaW50ZXJJZCkpIHtcbiAgICAgICAgcmV0dXJuIGludGVyYWN0aW9uO1xuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICAvLyBnZXQgZmlyc3QgaWRsZSBpbnRlcmFjdGlvbiB3aXRoIGEgbWF0Y2hpbmcgcG9pbnRlclR5cGVcbiAgaWRsZTogZnVuY3Rpb24gaWRsZShfcmVmOSkge1xuICAgIHZhciBwb2ludGVyVHlwZSA9IF9yZWY5LnBvaW50ZXJUeXBlO1xuXG4gICAgZm9yICh2YXIgX2k2ID0gMDsgX2k2IDwgc2NvcGUuaW50ZXJhY3Rpb25zLmxlbmd0aDsgX2k2KyspIHtcbiAgICAgIHZhciBfcmVmMTA7XG5cbiAgICAgIF9yZWYxMCA9IHNjb3BlLmludGVyYWN0aW9uc1tfaTZdO1xuICAgICAgdmFyIGludGVyYWN0aW9uID0gX3JlZjEwO1xuXG4gICAgICAvLyBpZiB0aGVyZSdzIGFscmVhZHkgYSBwb2ludGVyIGhlbGQgZG93blxuICAgICAgaWYgKGludGVyYWN0aW9uLnBvaW50ZXJJZHMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIHZhciB0YXJnZXQgPSBpbnRlcmFjdGlvbi50YXJnZXQ7XG4gICAgICAgIC8vIGRvbid0IGFkZCB0aGlzIHBvaW50ZXIgaWYgdGhlcmUgaXMgYSB0YXJnZXQgaW50ZXJhY3RhYmxlIGFuZCBpdFxuICAgICAgICAvLyBpc24ndCBnZXN0dXJhYmxlXG4gICAgICAgIGlmICh0YXJnZXQgJiYgIXRhcmdldC5vcHRpb25zLmdlc3R1cmUuZW5hYmxlZCkge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICAvLyBtYXhpbXVtIG9mIDIgcG9pbnRlcnMgcGVyIGludGVyYWN0aW9uXG4gICAgICBlbHNlIGlmIChpbnRlcmFjdGlvbi5wb2ludGVySWRzLmxlbmd0aCA+PSAyKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgaWYgKCFpbnRlcmFjdGlvbi5pbnRlcmFjdGluZygpICYmIHBvaW50ZXJUeXBlID09PSBpbnRlcmFjdGlvbi5wb2ludGVyVHlwZSkge1xuICAgICAgICByZXR1cm4gaW50ZXJhY3Rpb247XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZmluZGVyO1xuXG59LHtcIi4uL3Njb3BlXCI6MzMsXCIuL2luZGV4XCI6NDR9XSw0NjpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4ndXNlIHN0cmljdCc7XG5cbnZhciBfdHlwZW9mID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9IDogZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTtcblxudmFyIHdpbiA9IHJlcXVpcmUoJy4vd2luZG93Jyk7XG52YXIgaXNXaW5kb3cgPSByZXF1aXJlKCcuL2lzV2luZG93Jyk7XG5cbnZhciBpcyA9IHtcbiAgYXJyYXk6IGZ1bmN0aW9uIGFycmF5KCkge30sXG5cbiAgd2luZG93OiBmdW5jdGlvbiB3aW5kb3codGhpbmcpIHtcbiAgICByZXR1cm4gdGhpbmcgPT09IHdpbi53aW5kb3cgfHwgaXNXaW5kb3codGhpbmcpO1xuICB9LFxuXG4gIGRvY0ZyYWc6IGZ1bmN0aW9uIGRvY0ZyYWcodGhpbmcpIHtcbiAgICByZXR1cm4gaXMub2JqZWN0KHRoaW5nKSAmJiB0aGluZy5ub2RlVHlwZSA9PT0gMTE7XG4gIH0sXG5cbiAgb2JqZWN0OiBmdW5jdGlvbiBvYmplY3QodGhpbmcpIHtcbiAgICByZXR1cm4gISF0aGluZyAmJiAodHlwZW9mIHRoaW5nID09PSAndW5kZWZpbmVkJyA/ICd1bmRlZmluZWQnIDogX3R5cGVvZih0aGluZykpID09PSAnb2JqZWN0JztcbiAgfSxcblxuICBmdW5jdGlvbjogZnVuY3Rpb24gX2Z1bmN0aW9uKHRoaW5nKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB0aGluZyA9PT0gJ2Z1bmN0aW9uJztcbiAgfSxcblxuICBudW1iZXI6IGZ1bmN0aW9uIG51bWJlcih0aGluZykge1xuICAgIHJldHVybiB0eXBlb2YgdGhpbmcgPT09ICdudW1iZXInO1xuICB9LFxuXG4gIGJvb2w6IGZ1bmN0aW9uIGJvb2wodGhpbmcpIHtcbiAgICByZXR1cm4gdHlwZW9mIHRoaW5nID09PSAnYm9vbGVhbic7XG4gIH0sXG5cbiAgc3RyaW5nOiBmdW5jdGlvbiBzdHJpbmcodGhpbmcpIHtcbiAgICByZXR1cm4gdHlwZW9mIHRoaW5nID09PSAnc3RyaW5nJztcbiAgfSxcblxuICBlbGVtZW50OiBmdW5jdGlvbiBlbGVtZW50KHRoaW5nKSB7XG4gICAgaWYgKCF0aGluZyB8fCAodHlwZW9mIHRoaW5nID09PSAndW5kZWZpbmVkJyA/ICd1bmRlZmluZWQnIDogX3R5cGVvZih0aGluZykpICE9PSAnb2JqZWN0Jykge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHZhciBfd2luZG93ID0gd2luLmdldFdpbmRvdyh0aGluZykgfHwgd2luLndpbmRvdztcblxuICAgIHJldHVybiAoL29iamVjdHxmdW5jdGlvbi8udGVzdChfdHlwZW9mKF93aW5kb3cuRWxlbWVudCkpID8gdGhpbmcgaW5zdGFuY2VvZiBfd2luZG93LkVsZW1lbnQgLy9ET00yXG4gICAgICA6IHRoaW5nLm5vZGVUeXBlID09PSAxICYmIHR5cGVvZiB0aGluZy5ub2RlTmFtZSA9PT0gJ3N0cmluZydcbiAgICApO1xuICB9LFxuXG4gIHBsYWluT2JqZWN0OiBmdW5jdGlvbiBwbGFpbk9iamVjdCh0aGluZykge1xuICAgIHJldHVybiBpcy5vYmplY3QodGhpbmcpICYmIHRoaW5nLmNvbnN0cnVjdG9yLm5hbWUgPT09ICdPYmplY3QnO1xuICB9XG59O1xuXG5pcy5hcnJheSA9IGZ1bmN0aW9uICh0aGluZykge1xuICByZXR1cm4gaXMub2JqZWN0KHRoaW5nKSAmJiB0eXBlb2YgdGhpbmcubGVuZ3RoICE9PSAndW5kZWZpbmVkJyAmJiBpcy5mdW5jdGlvbih0aGluZy5zcGxpY2UpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBpcztcblxufSx7XCIuL2lzV2luZG93XCI6NDcsXCIuL3dpbmRvd1wiOjUyfV0sNDc6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHRoaW5nKSB7XG4gIHJldHVybiAhISh0aGluZyAmJiB0aGluZy5XaW5kb3cpICYmIHRoaW5nIGluc3RhbmNlb2YgdGhpbmcuV2luZG93O1xufTtcblxufSx7fV0sNDg6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBwb2ludGVyRXh0ZW5kKGRlc3QsIHNvdXJjZSkge1xuICBmb3IgKHZhciBwcm9wIGluIHNvdXJjZSkge1xuICAgIHZhciBwcmVmaXhlZFByb3BSRXMgPSBtb2R1bGUuZXhwb3J0cy5wcmVmaXhlZFByb3BSRXM7XG4gICAgdmFyIGRlcHJlY2F0ZWQgPSBmYWxzZTtcblxuICAgIC8vIHNraXAgZGVwcmVjYXRlZCBwcmVmaXhlZCBwcm9wZXJ0aWVzXG4gICAgZm9yICh2YXIgdmVuZG9yIGluIHByZWZpeGVkUHJvcFJFcykge1xuICAgICAgaWYgKHByb3AuaW5kZXhPZih2ZW5kb3IpID09PSAwICYmIHByZWZpeGVkUHJvcFJFc1t2ZW5kb3JdLnRlc3QocHJvcCkpIHtcbiAgICAgICAgZGVwcmVjYXRlZCA9IHRydWU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICghZGVwcmVjYXRlZCAmJiB0eXBlb2Ygc291cmNlW3Byb3BdICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICBkZXN0W3Byb3BdID0gc291cmNlW3Byb3BdO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZGVzdDtcbn1cblxucG9pbnRlckV4dGVuZC5wcmVmaXhlZFByb3BSRXMgPSB7XG4gIHdlYmtpdDogLyhNb3ZlbWVudFtYWV18UmFkaXVzW1hZXXxSb3RhdGlvbkFuZ2xlfEZvcmNlKSQvXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHBvaW50ZXJFeHRlbmQ7XG5cbn0se31dLDQ5OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbid1c2Ugc3RyaWN0JztcblxudmFyIGh5cG90ID0gcmVxdWlyZSgnLi9oeXBvdCcpO1xudmFyIGJyb3dzZXIgPSByZXF1aXJlKCcuL2Jyb3dzZXInKTtcbnZhciBkb20gPSByZXF1aXJlKCcuL2RvbU9iamVjdHMnKTtcbnZhciBkb21VdGlscyA9IHJlcXVpcmUoJy4vZG9tVXRpbHMnKTtcbnZhciBkb21PYmplY3RzID0gcmVxdWlyZSgnLi9kb21PYmplY3RzJyk7XG52YXIgaXMgPSByZXF1aXJlKCcuL2lzJyk7XG52YXIgcG9pbnRlckV4dGVuZCA9IHJlcXVpcmUoJy4vcG9pbnRlckV4dGVuZCcpO1xuXG52YXIgcG9pbnRlclV0aWxzID0ge1xuICBjb3B5Q29vcmRzOiBmdW5jdGlvbiBjb3B5Q29vcmRzKGRlc3QsIHNyYykge1xuICAgIGRlc3QucGFnZSA9IGRlc3QucGFnZSB8fCB7fTtcbiAgICBkZXN0LnBhZ2UueCA9IHNyYy5wYWdlLng7XG4gICAgZGVzdC5wYWdlLnkgPSBzcmMucGFnZS55O1xuXG4gICAgZGVzdC5jbGllbnQgPSBkZXN0LmNsaWVudCB8fCB7fTtcbiAgICBkZXN0LmNsaWVudC54ID0gc3JjLmNsaWVudC54O1xuICAgIGRlc3QuY2xpZW50LnkgPSBzcmMuY2xpZW50Lnk7XG5cbiAgICBkZXN0LnRpbWVTdGFtcCA9IHNyYy50aW1lU3RhbXA7XG4gIH0sXG5cbiAgc2V0Q29vcmREZWx0YXM6IGZ1bmN0aW9uIHNldENvb3JkRGVsdGFzKHRhcmdldE9iaiwgcHJldiwgY3VyKSB7XG4gICAgdGFyZ2V0T2JqLnBhZ2UueCA9IGN1ci5wYWdlLnggLSBwcmV2LnBhZ2UueDtcbiAgICB0YXJnZXRPYmoucGFnZS55ID0gY3VyLnBhZ2UueSAtIHByZXYucGFnZS55O1xuICAgIHRhcmdldE9iai5jbGllbnQueCA9IGN1ci5jbGllbnQueCAtIHByZXYuY2xpZW50Lng7XG4gICAgdGFyZ2V0T2JqLmNsaWVudC55ID0gY3VyLmNsaWVudC55IC0gcHJldi5jbGllbnQueTtcbiAgICB0YXJnZXRPYmoudGltZVN0YW1wID0gY3VyLnRpbWVTdGFtcCAtIHByZXYudGltZVN0YW1wO1xuXG4gICAgLy8gc2V0IHBvaW50ZXIgdmVsb2NpdHlcbiAgICB2YXIgZHQgPSBNYXRoLm1heCh0YXJnZXRPYmoudGltZVN0YW1wIC8gMTAwMCwgMC4wMDEpO1xuXG4gICAgdGFyZ2V0T2JqLnBhZ2Uuc3BlZWQgPSBoeXBvdCh0YXJnZXRPYmoucGFnZS54LCB0YXJnZXRPYmoucGFnZS55KSAvIGR0O1xuICAgIHRhcmdldE9iai5wYWdlLnZ4ID0gdGFyZ2V0T2JqLnBhZ2UueCAvIGR0O1xuICAgIHRhcmdldE9iai5wYWdlLnZ5ID0gdGFyZ2V0T2JqLnBhZ2UueSAvIGR0O1xuXG4gICAgdGFyZ2V0T2JqLmNsaWVudC5zcGVlZCA9IGh5cG90KHRhcmdldE9iai5jbGllbnQueCwgdGFyZ2V0T2JqLnBhZ2UueSkgLyBkdDtcbiAgICB0YXJnZXRPYmouY2xpZW50LnZ4ID0gdGFyZ2V0T2JqLmNsaWVudC54IC8gZHQ7XG4gICAgdGFyZ2V0T2JqLmNsaWVudC52eSA9IHRhcmdldE9iai5jbGllbnQueSAvIGR0O1xuICB9LFxuXG4gIGlzTmF0aXZlUG9pbnRlcjogZnVuY3Rpb24gaXNOYXRpdmVQb2ludGVyKHBvaW50ZXIpIHtcbiAgICByZXR1cm4gcG9pbnRlciBpbnN0YW5jZW9mIGRvbS5FdmVudCB8fCBwb2ludGVyIGluc3RhbmNlb2YgZG9tLlRvdWNoO1xuICB9LFxuXG4gIC8vIEdldCBzcGVjaWZpZWQgWC9ZIGNvb3JkcyBmb3IgbW91c2Ugb3IgZXZlbnQudG91Y2hlc1swXVxuICBnZXRYWTogZnVuY3Rpb24gZ2V0WFkodHlwZSwgcG9pbnRlciwgeHkpIHtcbiAgICB4eSA9IHh5IHx8IHt9O1xuICAgIHR5cGUgPSB0eXBlIHx8ICdwYWdlJztcblxuICAgIHh5LnggPSBwb2ludGVyW3R5cGUgKyAnWCddO1xuICAgIHh5LnkgPSBwb2ludGVyW3R5cGUgKyAnWSddO1xuXG4gICAgcmV0dXJuIHh5O1xuICB9LFxuXG4gIGdldFBhZ2VYWTogZnVuY3Rpb24gZ2V0UGFnZVhZKHBvaW50ZXIsIHBhZ2UpIHtcbiAgICBwYWdlID0gcGFnZSB8fCB7fTtcblxuICAgIC8vIE9wZXJhIE1vYmlsZSBoYW5kbGVzIHRoZSB2aWV3cG9ydCBhbmQgc2Nyb2xsaW5nIG9kZGx5XG4gICAgaWYgKGJyb3dzZXIuaXNPcGVyYU1vYmlsZSAmJiBwb2ludGVyVXRpbHMuaXNOYXRpdmVQb2ludGVyKHBvaW50ZXIpKSB7XG4gICAgICBwb2ludGVyVXRpbHMuZ2V0WFkoJ3NjcmVlbicsIHBvaW50ZXIsIHBhZ2UpO1xuXG4gICAgICBwYWdlLnggKz0gd2luZG93LnNjcm9sbFg7XG4gICAgICBwYWdlLnkgKz0gd2luZG93LnNjcm9sbFk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHBvaW50ZXJVdGlscy5nZXRYWSgncGFnZScsIHBvaW50ZXIsIHBhZ2UpO1xuICAgIH1cblxuICAgIHJldHVybiBwYWdlO1xuICB9LFxuXG4gIGdldENsaWVudFhZOiBmdW5jdGlvbiBnZXRDbGllbnRYWShwb2ludGVyLCBjbGllbnQpIHtcbiAgICBjbGllbnQgPSBjbGllbnQgfHwge307XG5cbiAgICBpZiAoYnJvd3Nlci5pc09wZXJhTW9iaWxlICYmIHBvaW50ZXJVdGlscy5pc05hdGl2ZVBvaW50ZXIocG9pbnRlcikpIHtcbiAgICAgIC8vIE9wZXJhIE1vYmlsZSBoYW5kbGVzIHRoZSB2aWV3cG9ydCBhbmQgc2Nyb2xsaW5nIG9kZGx5XG4gICAgICBwb2ludGVyVXRpbHMuZ2V0WFkoJ3NjcmVlbicsIHBvaW50ZXIsIGNsaWVudCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHBvaW50ZXJVdGlscy5nZXRYWSgnY2xpZW50JywgcG9pbnRlciwgY2xpZW50KTtcbiAgICB9XG5cbiAgICByZXR1cm4gY2xpZW50O1xuICB9LFxuXG4gIGdldFBvaW50ZXJJZDogZnVuY3Rpb24gZ2V0UG9pbnRlcklkKHBvaW50ZXIpIHtcbiAgICByZXR1cm4gaXMubnVtYmVyKHBvaW50ZXIucG9pbnRlcklkKSA/IHBvaW50ZXIucG9pbnRlcklkIDogcG9pbnRlci5pZGVudGlmaWVyO1xuICB9LFxuXG4gIHNldENvb3JkczogZnVuY3Rpb24gc2V0Q29vcmRzKHRhcmdldE9iaiwgcG9pbnRlcnMsIHRpbWVTdGFtcCkge1xuICAgIHZhciBwb2ludGVyID0gcG9pbnRlcnMubGVuZ3RoID4gMSA/IHBvaW50ZXJVdGlscy5wb2ludGVyQXZlcmFnZShwb2ludGVycykgOiBwb2ludGVyc1swXTtcblxuICAgIHZhciB0bXBYWSA9IHt9O1xuXG4gICAgcG9pbnRlclV0aWxzLmdldFBhZ2VYWShwb2ludGVyLCB0bXBYWSk7XG4gICAgdGFyZ2V0T2JqLnBhZ2UueCA9IHRtcFhZLng7XG4gICAgdGFyZ2V0T2JqLnBhZ2UueSA9IHRtcFhZLnk7XG5cbiAgICBwb2ludGVyVXRpbHMuZ2V0Q2xpZW50WFkocG9pbnRlciwgdG1wWFkpO1xuICAgIHRhcmdldE9iai5jbGllbnQueCA9IHRtcFhZLng7XG4gICAgdGFyZ2V0T2JqLmNsaWVudC55ID0gdG1wWFkueTtcblxuICAgIHRhcmdldE9iai50aW1lU3RhbXAgPSBpcy5udW1iZXIodGltZVN0YW1wKSA/IHRpbWVTdGFtcCA6IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICB9LFxuXG4gIHBvaW50ZXJFeHRlbmQ6IHBvaW50ZXJFeHRlbmQsXG5cbiAgZ2V0VG91Y2hQYWlyOiBmdW5jdGlvbiBnZXRUb3VjaFBhaXIoZXZlbnQpIHtcbiAgICB2YXIgdG91Y2hlcyA9IFtdO1xuXG4gICAgLy8gYXJyYXkgb2YgdG91Y2hlcyBpcyBzdXBwbGllZFxuICAgIGlmIChpcy5hcnJheShldmVudCkpIHtcbiAgICAgIHRvdWNoZXNbMF0gPSBldmVudFswXTtcbiAgICAgIHRvdWNoZXNbMV0gPSBldmVudFsxXTtcbiAgICB9XG4gICAgLy8gYW4gZXZlbnRcbiAgICBlbHNlIHtcbiAgICAgICAgaWYgKGV2ZW50LnR5cGUgPT09ICd0b3VjaGVuZCcpIHtcbiAgICAgICAgICBpZiAoZXZlbnQudG91Y2hlcy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgIHRvdWNoZXNbMF0gPSBldmVudC50b3VjaGVzWzBdO1xuICAgICAgICAgICAgdG91Y2hlc1sxXSA9IGV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdO1xuICAgICAgICAgIH0gZWxzZSBpZiAoZXZlbnQudG91Y2hlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHRvdWNoZXNbMF0gPSBldmVudC5jaGFuZ2VkVG91Y2hlc1swXTtcbiAgICAgICAgICAgIHRvdWNoZXNbMV0gPSBldmVudC5jaGFuZ2VkVG91Y2hlc1sxXTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdG91Y2hlc1swXSA9IGV2ZW50LnRvdWNoZXNbMF07XG4gICAgICAgICAgdG91Y2hlc1sxXSA9IGV2ZW50LnRvdWNoZXNbMV07XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgIHJldHVybiB0b3VjaGVzO1xuICB9LFxuXG4gIHBvaW50ZXJBdmVyYWdlOiBmdW5jdGlvbiBwb2ludGVyQXZlcmFnZShwb2ludGVycykge1xuICAgIHZhciBhdmVyYWdlID0ge1xuICAgICAgcGFnZVg6IDAsXG4gICAgICBwYWdlWTogMCxcbiAgICAgIGNsaWVudFg6IDAsXG4gICAgICBjbGllbnRZOiAwLFxuICAgICAgc2NyZWVuWDogMCxcbiAgICAgIHNjcmVlblk6IDBcbiAgICB9O1xuXG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IHBvaW50ZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9yZWY7XG5cbiAgICAgIF9yZWYgPSBwb2ludGVyc1tfaV07XG4gICAgICB2YXIgcG9pbnRlciA9IF9yZWY7XG5cbiAgICAgIGZvciAodmFyIF9wcm9wIGluIGF2ZXJhZ2UpIHtcbiAgICAgICAgYXZlcmFnZVtfcHJvcF0gKz0gcG9pbnRlcltfcHJvcF07XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAodmFyIHByb3AgaW4gYXZlcmFnZSkge1xuICAgICAgYXZlcmFnZVtwcm9wXSAvPSBwb2ludGVycy5sZW5ndGg7XG4gICAgfVxuXG4gICAgcmV0dXJuIGF2ZXJhZ2U7XG4gIH0sXG5cbiAgdG91Y2hCQm94OiBmdW5jdGlvbiB0b3VjaEJCb3goZXZlbnQpIHtcbiAgICBpZiAoIWV2ZW50Lmxlbmd0aCAmJiAhKGV2ZW50LnRvdWNoZXMgJiYgZXZlbnQudG91Y2hlcy5sZW5ndGggPiAxKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciB0b3VjaGVzID0gcG9pbnRlclV0aWxzLmdldFRvdWNoUGFpcihldmVudCk7XG4gICAgdmFyIG1pblggPSBNYXRoLm1pbih0b3VjaGVzWzBdLnBhZ2VYLCB0b3VjaGVzWzFdLnBhZ2VYKTtcbiAgICB2YXIgbWluWSA9IE1hdGgubWluKHRvdWNoZXNbMF0ucGFnZVksIHRvdWNoZXNbMV0ucGFnZVkpO1xuICAgIHZhciBtYXhYID0gTWF0aC5tYXgodG91Y2hlc1swXS5wYWdlWCwgdG91Y2hlc1sxXS5wYWdlWCk7XG4gICAgdmFyIG1heFkgPSBNYXRoLm1heCh0b3VjaGVzWzBdLnBhZ2VZLCB0b3VjaGVzWzFdLnBhZ2VZKTtcblxuICAgIHJldHVybiB7XG4gICAgICB4OiBtaW5YLFxuICAgICAgeTogbWluWSxcbiAgICAgIGxlZnQ6IG1pblgsXG4gICAgICB0b3A6IG1pblksXG4gICAgICB3aWR0aDogbWF4WCAtIG1pblgsXG4gICAgICBoZWlnaHQ6IG1heFkgLSBtaW5ZXG4gICAgfTtcbiAgfSxcblxuICB0b3VjaERpc3RhbmNlOiBmdW5jdGlvbiB0b3VjaERpc3RhbmNlKGV2ZW50LCBkZWx0YVNvdXJjZSkge1xuICAgIHZhciBzb3VyY2VYID0gZGVsdGFTb3VyY2UgKyAnWCc7XG4gICAgdmFyIHNvdXJjZVkgPSBkZWx0YVNvdXJjZSArICdZJztcbiAgICB2YXIgdG91Y2hlcyA9IHBvaW50ZXJVdGlscy5nZXRUb3VjaFBhaXIoZXZlbnQpO1xuXG4gICAgdmFyIGR4ID0gdG91Y2hlc1swXVtzb3VyY2VYXSAtIHRvdWNoZXNbMV1bc291cmNlWF07XG4gICAgdmFyIGR5ID0gdG91Y2hlc1swXVtzb3VyY2VZXSAtIHRvdWNoZXNbMV1bc291cmNlWV07XG5cbiAgICByZXR1cm4gaHlwb3QoZHgsIGR5KTtcbiAgfSxcblxuICB0b3VjaEFuZ2xlOiBmdW5jdGlvbiB0b3VjaEFuZ2xlKGV2ZW50LCBwcmV2QW5nbGUsIGRlbHRhU291cmNlKSB7XG4gICAgdmFyIHNvdXJjZVggPSBkZWx0YVNvdXJjZSArICdYJztcbiAgICB2YXIgc291cmNlWSA9IGRlbHRhU291cmNlICsgJ1knO1xuICAgIHZhciB0b3VjaGVzID0gcG9pbnRlclV0aWxzLmdldFRvdWNoUGFpcihldmVudCk7XG4gICAgdmFyIGR4ID0gdG91Y2hlc1sxXVtzb3VyY2VYXSAtIHRvdWNoZXNbMF1bc291cmNlWF07XG4gICAgdmFyIGR5ID0gdG91Y2hlc1sxXVtzb3VyY2VZXSAtIHRvdWNoZXNbMF1bc291cmNlWV07XG4gICAgdmFyIGFuZ2xlID0gMTgwICogTWF0aC5hdGFuMihkeSwgZHgpIC8gTWF0aC5QSTtcblxuICAgIHJldHVybiBhbmdsZTtcbiAgfSxcblxuICBnZXRQb2ludGVyVHlwZTogZnVuY3Rpb24gZ2V0UG9pbnRlclR5cGUocG9pbnRlcikge1xuICAgIHJldHVybiBpcy5zdHJpbmcocG9pbnRlci5wb2ludGVyVHlwZSkgPyBwb2ludGVyLnBvaW50ZXJUeXBlIDogaXMubnVtYmVyKHBvaW50ZXIucG9pbnRlclR5cGUpID8gW3VuZGVmaW5lZCwgdW5kZWZpbmVkLCAndG91Y2gnLCAncGVuJywgJ21vdXNlJ11bcG9pbnRlci5wb2ludGVyVHlwZV1cbiAgICAvLyBpZiB0aGUgUG9pbnRlckV2ZW50IEFQSSBpc24ndCBhdmFpbGFibGUsIHRoZW4gdGhlIFwicG9pbnRlclwiIG11c3RcbiAgICAvLyBiZSBlaXRoZXIgYSBNb3VzZUV2ZW50LCBUb3VjaEV2ZW50LCBvciBUb3VjaCBvYmplY3RcbiAgICA6IC90b3VjaC8udGVzdChwb2ludGVyLnR5cGUpIHx8IHBvaW50ZXIgaW5zdGFuY2VvZiBkb21PYmplY3RzLlRvdWNoID8gJ3RvdWNoJyA6ICdtb3VzZSc7XG4gIH0sXG5cbiAgLy8gWyBldmVudC50YXJnZXQsIGV2ZW50LmN1cnJlbnRUYXJnZXQgXVxuICBnZXRFdmVudFRhcmdldHM6IGZ1bmN0aW9uIGdldEV2ZW50VGFyZ2V0cyhldmVudCkge1xuICAgIHZhciBwYXRoID0gaXMuZnVuY3Rpb24oZXZlbnQuY29tcG9zZWRQYXRoKSA/IGV2ZW50LmNvbXBvc2VkUGF0aCgpIDogZXZlbnQucGF0aDtcblxuICAgIHJldHVybiBbZG9tVXRpbHMuZ2V0QWN0dWFsRWxlbWVudChwYXRoID8gcGF0aFswXSA6IGV2ZW50LnRhcmdldCksIGRvbVV0aWxzLmdldEFjdHVhbEVsZW1lbnQoZXZlbnQuY3VycmVudFRhcmdldCldO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHBvaW50ZXJVdGlscztcblxufSx7XCIuL2Jyb3dzZXJcIjozNixcIi4vZG9tT2JqZWN0c1wiOjM4LFwiLi9kb21VdGlsc1wiOjM5LFwiLi9oeXBvdFwiOjQzLFwiLi9pc1wiOjQ2LFwiLi9wb2ludGVyRXh0ZW5kXCI6NDh9XSw1MDpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4ndXNlIHN0cmljdCc7XG5cbnZhciBfcmVxdWlyZSA9IHJlcXVpcmUoJy4vd2luZG93JyksXG4gICAgd2luZG93ID0gX3JlcXVpcmUud2luZG93O1xuXG52YXIgdmVuZG9ycyA9IFsnbXMnLCAnbW96JywgJ3dlYmtpdCcsICdvJ107XG52YXIgbGFzdFRpbWUgPSAwO1xudmFyIHJlcXVlc3QgPSB2b2lkIDA7XG52YXIgY2FuY2VsID0gdm9pZCAwO1xuXG5mb3IgKHZhciB4ID0gMDsgeCA8IHZlbmRvcnMubGVuZ3RoICYmICF3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lOyB4KyspIHtcbiAgcmVxdWVzdCA9IHdpbmRvd1t2ZW5kb3JzW3hdICsgJ1JlcXVlc3RBbmltYXRpb25GcmFtZSddO1xuICBjYW5jZWwgPSB3aW5kb3dbdmVuZG9yc1t4XSArICdDYW5jZWxBbmltYXRpb25GcmFtZSddIHx8IHdpbmRvd1t2ZW5kb3JzW3hdICsgJ0NhbmNlbFJlcXVlc3RBbmltYXRpb25GcmFtZSddO1xufVxuXG5pZiAoIXJlcXVlc3QpIHtcbiAgcmVxdWVzdCA9IGZ1bmN0aW9uIHJlcXVlc3QoY2FsbGJhY2spIHtcbiAgICB2YXIgY3VyclRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICB2YXIgdGltZVRvQ2FsbCA9IE1hdGgubWF4KDAsIDE2IC0gKGN1cnJUaW1lIC0gbGFzdFRpbWUpKTtcbiAgICB2YXIgaWQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgIGNhbGxiYWNrKGN1cnJUaW1lICsgdGltZVRvQ2FsbCk7XG4gICAgfSwgdGltZVRvQ2FsbCk7XG5cbiAgICBsYXN0VGltZSA9IGN1cnJUaW1lICsgdGltZVRvQ2FsbDtcbiAgICByZXR1cm4gaWQ7XG4gIH07XG59XG5cbmlmICghY2FuY2VsKSB7XG4gIGNhbmNlbCA9IGZ1bmN0aW9uIGNhbmNlbChpZCkge1xuICAgIGNsZWFyVGltZW91dChpZCk7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICByZXF1ZXN0OiByZXF1ZXN0LFxuICBjYW5jZWw6IGNhbmNlbFxufTtcblxufSx7XCIuL3dpbmRvd1wiOjUyfV0sNTE6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgZXh0ZW5kID0gcmVxdWlyZSgnLi9leHRlbmQnKTtcbnZhciBpcyA9IHJlcXVpcmUoJy4vaXMnKTtcblxudmFyIF9yZXF1aXJlID0gcmVxdWlyZSgnLi9kb21VdGlscycpLFxuICAgIGNsb3Nlc3QgPSBfcmVxdWlyZS5jbG9zZXN0LFxuICAgIHBhcmVudE5vZGUgPSBfcmVxdWlyZS5wYXJlbnROb2RlLFxuICAgIGdldEVsZW1lbnRSZWN0ID0gX3JlcXVpcmUuZ2V0RWxlbWVudFJlY3Q7XG5cbnZhciByZWN0VXRpbHMgPSB7XG4gIGdldFN0cmluZ09wdGlvblJlc3VsdDogZnVuY3Rpb24gZ2V0U3RyaW5nT3B0aW9uUmVzdWx0KHZhbHVlLCBpbnRlcmFjdGFibGUsIGVsZW1lbnQpIHtcbiAgICBpZiAoIWlzLnN0cmluZyh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGlmICh2YWx1ZSA9PT0gJ3BhcmVudCcpIHtcbiAgICAgIHZhbHVlID0gcGFyZW50Tm9kZShlbGVtZW50KTtcbiAgICB9IGVsc2UgaWYgKHZhbHVlID09PSAnc2VsZicpIHtcbiAgICAgIHZhbHVlID0gaW50ZXJhY3RhYmxlLmdldFJlY3QoZWxlbWVudCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhbHVlID0gY2xvc2VzdChlbGVtZW50LCB2YWx1ZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbHVlO1xuICB9LFxuXG4gIHJlc29sdmVSZWN0TGlrZTogZnVuY3Rpb24gcmVzb2x2ZVJlY3RMaWtlKHZhbHVlLCBpbnRlcmFjdGFibGUsIGVsZW1lbnQsIGZ1bmN0aW9uQXJncykge1xuICAgIHZhbHVlID0gcmVjdFV0aWxzLmdldFN0cmluZ09wdGlvblJlc3VsdCh2YWx1ZSwgaW50ZXJhY3RhYmxlLCBlbGVtZW50KSB8fCB2YWx1ZTtcblxuICAgIGlmIChpcy5mdW5jdGlvbih2YWx1ZSkpIHtcbiAgICAgIHZhbHVlID0gdmFsdWUuYXBwbHkobnVsbCwgZnVuY3Rpb25BcmdzKTtcbiAgICB9XG5cbiAgICBpZiAoaXMuZWxlbWVudCh2YWx1ZSkpIHtcbiAgICAgIHZhbHVlID0gZ2V0RWxlbWVudFJlY3QodmFsdWUpO1xuICAgIH1cblxuICAgIHJldHVybiB2YWx1ZTtcbiAgfSxcblxuICByZWN0VG9YWTogZnVuY3Rpb24gcmVjdFRvWFkocmVjdCkge1xuICAgIHJldHVybiByZWN0ICYmIHtcbiAgICAgIHg6ICd4JyBpbiByZWN0ID8gcmVjdC54IDogcmVjdC5sZWZ0LFxuICAgICAgeTogJ3knIGluIHJlY3QgPyByZWN0LnkgOiByZWN0LnRvcFxuICAgIH07XG4gIH0sXG5cbiAgeHl3aFRvVGxicjogZnVuY3Rpb24geHl3aFRvVGxicihyZWN0KSB7XG4gICAgaWYgKHJlY3QgJiYgISgnbGVmdCcgaW4gcmVjdCAmJiAndG9wJyBpbiByZWN0KSkge1xuICAgICAgcmVjdCA9IGV4dGVuZCh7fSwgcmVjdCk7XG5cbiAgICAgIHJlY3QubGVmdCA9IHJlY3QueCB8fCAwO1xuICAgICAgcmVjdC50b3AgPSByZWN0LnkgfHwgMDtcbiAgICAgIHJlY3QucmlnaHQgPSByZWN0LnJpZ2h0IHx8IHJlY3QubGVmdCArIHJlY3Qud2lkdGg7XG4gICAgICByZWN0LmJvdHRvbSA9IHJlY3QuYm90dG9tIHx8IHJlY3QudG9wICsgcmVjdC5oZWlnaHQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlY3Q7XG4gIH0sXG5cbiAgdGxiclRvWHl3aDogZnVuY3Rpb24gdGxiclRvWHl3aChyZWN0KSB7XG4gICAgaWYgKHJlY3QgJiYgISgneCcgaW4gcmVjdCAmJiAneScgaW4gcmVjdCkpIHtcbiAgICAgIHJlY3QgPSBleHRlbmQoe30sIHJlY3QpO1xuXG4gICAgICByZWN0LnggPSByZWN0LmxlZnQgfHwgMDtcbiAgICAgIHJlY3QudG9wID0gcmVjdC50b3AgfHwgMDtcbiAgICAgIHJlY3Qud2lkdGggPSByZWN0LndpZHRoIHx8IHJlY3QucmlnaHQgLSByZWN0Lng7XG4gICAgICByZWN0LmhlaWdodCA9IHJlY3QuaGVpZ2h0IHx8IHJlY3QuYm90dG9tIC0gcmVjdC55O1xuICAgIH1cblxuICAgIHJldHVybiByZWN0O1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlY3RVdGlscztcblxufSx7XCIuL2RvbVV0aWxzXCI6MzksXCIuL2V4dGVuZFwiOjQxLFwiLi9pc1wiOjQ2fV0sNTI6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgd2luID0gbW9kdWxlLmV4cG9ydHM7XG52YXIgaXNXaW5kb3cgPSByZXF1aXJlKCcuL2lzV2luZG93Jyk7XG5cbmZ1bmN0aW9uIGluaXQod2luZG93KSB7XG4gIC8vIGdldCB3cmFwcGVkIHdpbmRvdyBpZiB1c2luZyBTaGFkb3cgRE9NIHBvbHlmaWxsXG5cbiAgd2luLnJlYWxXaW5kb3cgPSB3aW5kb3c7XG5cbiAgLy8gY3JlYXRlIGEgVGV4dE5vZGVcbiAgdmFyIGVsID0gd2luZG93LmRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCcnKTtcblxuICAvLyBjaGVjayBpZiBpdCdzIHdyYXBwZWQgYnkgYSBwb2x5ZmlsbFxuICBpZiAoZWwub3duZXJEb2N1bWVudCAhPT0gd2luZG93LmRvY3VtZW50ICYmIHR5cGVvZiB3aW5kb3cud3JhcCA9PT0gJ2Z1bmN0aW9uJyAmJiB3aW5kb3cud3JhcChlbCkgPT09IGVsKSB7XG4gICAgLy8gdXNlIHdyYXBwZWQgd2luZG93XG4gICAgd2luZG93ID0gd2luZG93LndyYXAod2luZG93KTtcbiAgfVxuXG4gIHdpbi53aW5kb3cgPSB3aW5kb3c7XG59XG5cbmlmICh0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJykge1xuICB3aW4ud2luZG93ID0gdW5kZWZpbmVkO1xuICB3aW4ucmVhbFdpbmRvdyA9IHVuZGVmaW5lZDtcbn0gZWxzZSB7XG4gIGluaXQod2luZG93KTtcbn1cblxud2luLmdldFdpbmRvdyA9IGZ1bmN0aW9uIGdldFdpbmRvdyhub2RlKSB7XG4gIGlmIChpc1dpbmRvdyhub2RlKSkge1xuICAgIHJldHVybiBub2RlO1xuICB9XG5cbiAgdmFyIHJvb3ROb2RlID0gbm9kZS5vd25lckRvY3VtZW50IHx8IG5vZGU7XG5cbiAgcmV0dXJuIHJvb3ROb2RlLmRlZmF1bHRWaWV3IHx8IHJvb3ROb2RlLnBhcmVudFdpbmRvdyB8fCB3aW4ud2luZG93O1xufTtcblxud2luLmluaXQgPSBpbml0O1xuXG59LHtcIi4vaXNXaW5kb3dcIjo0N31dfSx7fSxbMV0pKDEpXG59KTtcblxuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbnRlcmFjdC5qcy5tYXBcbiJdLCJzb3VyY2VSb290IjoiIn0=