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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/asteroid.js":
/*!*************************!*\
  !*** ./src/asteroid.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const MovingObject = __webpack_require__(/*! ./moving_object.js */ \"./src/moving_object.js\");\nconst Util = __webpack_require__(/*! ./util.js */ \"./src/util.js\");\n\nconst Asteroid = function(options) {\n  this.COLOR = \"gray\";\n  this.RADIUS = 20;\n  this.pos = options.pos;\n  this.vel = Util.randomVec(Math.random() * 10);\n  this.game = options.game;\n  return new MovingObject({pos: this.pos, vel: this.vel, radius: this.RADIUS, color: this.COLOR, game: this.game});\n};\n\nAsteroid.prototype.collideWith = function (otherObject) {\n  if ( otherObject === this.game.ship ){\n    otherObject.relocate();\n  }\n};\n\nUtil.inherits(Asteroid, MovingObject);\n\nmodule.exports = Asteroid;\n\n//# sourceURL=webpack:///./src/asteroid.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Asteroid = __webpack_require__(/*! ./asteroid.js */ \"./src/asteroid.js\");\nconst Ship = __webpack_require__(/*! ./ship.js */ \"./src/ship.js\");\n\n\nconst Game = function(dimX, dimY) {\n  this.DIM_X = dimX;\n  this.DIM_Y = dimY;\n  this.NUM_ASTEROIDS = 10;\n  this.asteroids = [];\n  this.addAsteroids();\n  this.ship = new Ship( { game: this, pos: this.randomPosition() } );\n};\n\nGame.prototype.addAsteroids = function() {\n  while (this.asteroids.length < this.NUM_ASTEROIDS) {\n    this.asteroids.push(new Asteroid(\n        { pos: this.randomPosition() , game: this }\n      )\n    );\n  }\n};\n\nGame.prototype.randomPosition = function() {\n  let pos = [];\n  pos.push(Math.random() * this.DIM_X);\n  pos.push(Math.random() * this.DIM_Y);\n  return pos;\n};\n\nGame.prototype.draw = function(ctx) {\n  ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);\n  this.allObjects().forEach( function(object) {\n    object.draw(ctx);\n  });\n};\n\nGame.prototype.moveObjects = function() {\n\n  this.allObjects().forEach( function(asteroid) {\n\n    asteroid.move();\n  });\n};\n\nGame.prototype.wrap = function(pos) {\n  if (pos[0] > this.DIM_X)  pos[0] = 0;\n  if (pos[0] < 0) pos[0] = this.DIM_X;\n  if (pos[1] > this.DIM_Y) pos[1] = 0;\n  if (pos[1] < 0) pos[1] = this.DIM_Y;\n\n  return pos;\n};\n\nGame.prototype.checkCollisions = function() {\n  for (let i = 0; i < this.allObjects().length - 1; i++) {\n    for (let j = i + 1; j < this.allObjects().length; j++) {\n      if (this.allObjects()[i].isCollidedWith(this.allObjects()[j])) {\n        this.allObjects()[i].collideWith(this.allObjects()[j]);\n      }\n    }\n  }\n};\n\nGame.prototype.step = function() {\n  this.moveObjects();\n  this.checkCollisions();\n};\n\nGame.prototype.remove = function(asteroid) {\n  let index = this.asteroids.indexOf(asteroid);\n  this.asteroids.splice(index, 1);\n};\n\nGame.prototype.allObjects = function () {\n  return this.asteroids.concat(this.ship);\n};\n\nmodule.exports = Game;\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/game_view.js":
/*!**************************!*\
  !*** ./src/game_view.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Game = __webpack_require__(/*! ./game.js */ \"./src/game.js\");\n\nconst GameView = function(ctx) {\n  this.game = new Game(800, 800);\n  this.ctx = ctx;\n};\n\nGameView.prototype.start = function() {\n  const that = this;\n  function cb() {\n    that.game.step();\n    that.game.draw(that.ctx);\n  }\n  setInterval(cb.bind(this), 20);\n};\n\nmodule.exports = GameView;\n\n//# sourceURL=webpack:///./src/game_view.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const MovingObject = __webpack_require__(/*! ./moving_object.js */ \"./src/moving_object.js\");\nconst Asteroid = __webpack_require__(/*! ./asteroid.js */ \"./src/asteroid.js\");\nconst GameView = __webpack_require__(/*! ./game_view.js */ \"./src/game_view.js\");\n\nwindow.addEventListener('DOMContentLoaded', (event) => {\n  const gameCanvas = document.getElementById(\"game-canvas\");\n  const ctx = gameCanvas.getContext('2d');\n  const gameView = new GameView(ctx);\n  gameView.start();\n  window.gameView = gameView;\n  console.log('DOM fully loaded and parsed');\n});\n\nconsole.log(\"Our webpack is working!!\");\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/moving_object.js":
/*!******************************!*\
  !*** ./src/moving_object.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const MovingObject = function(options) {\n  this.pos = options.pos;\n  this.vel = options.vel;\n  this.radius = options.radius;\n  this.color = options.color;\n  this.game = options.game;\n};\n\nMovingObject.prototype.draw = function(ctx) {\n  ctx.fillStyle = this.color;\n  ctx.beginPath();\n\n  ctx.arc(\n    this.pos[0],\n    this.pos[1],\n    this.radius,\n    0,\n    2 * Math.PI,\n    false\n  );\n\n  ctx.fill();\n};\n\nMovingObject.prototype.move = function () {\n  this.pos[0] += this.vel[0];\n  this.pos[1] += this.vel[1];\n  this.pos = this.game.wrap(this.pos);\n};\n\nMovingObject.prototype.isCollidedWith = function(otherObject) {\n  const xPos = Math.sqrt(Math.pow((this.pos[0] - otherObject.pos[0]), 2));\n  const yPos = Math.sqrt(Math.pow((this.pos[1] - otherObject.pos[1]), 2));\n  const radSum = this.radius + otherObject.radius;\n\n  if (xPos < radSum && yPos < radSum ) return true;\n  return false;\n};\n\nMovingObject.prototype.collideWith = function(otherObject) {\n  \n  // if (this === this.game.ship || otherObject === this.game.ship ){\n  //   this.game.remove(this);\n  //   this.game.remove(otherObject);\n  // }\n};\n\nmodule.exports = MovingObject;\n\n//# sourceURL=webpack:///./src/moving_object.js?");

/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const MovingObject = __webpack_require__(/*! ./moving_object.js */ \"./src/moving_object.js\");\nconst Util = __webpack_require__(/*! ./util.js */ \"./src/util.js\");\n\nconst Ship = function (options) {\n  this.COLOR = \"red\";\n  this.RADIUS = 10;\n  this.pos = options.pos;\n  this.vel = [0,0];\n  this.game = options.game;\n  return new MovingObject({pos: this.pos, vel: this.vel, color: this.COLOR, radius: this.RADIUS, game: this.game});\n};\n\nUtil.inherits(Ship, MovingObject);\n\nmodule.exports = Ship;\n\n//# sourceURL=webpack:///./src/ship.js?");

/***/ }),

/***/ "./src/util.js":
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const Util = {\n  inherits (childClass, parentClass) {\n    function Surrogate () {}\n    Surrogate.prototype = parentClass.prototype;\n    childClass.prototype = new Surrogate();\n    childClass.prototype.constructor = childClass;\n  },\n\n  randomVec(length) {\n    const deg = 2 * Math.PI * Math.random();\n    return Util.scale([Math.sin(deg), Math.cos(deg)], length);\n  },\n  \n  scale(vec,m) {\n    return [vec[0] * m , vec[1] * m];\n  }\n};\n\n\n\nmodule.exports = Util;\n\n//# sourceURL=webpack:///./src/util.js?");

/***/ })

/******/ });