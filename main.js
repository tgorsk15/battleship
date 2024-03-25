/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/gameboardController.js":
/*!************************************!*\
  !*** ./src/gameboardController.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   gameBoardController: () => (/* binding */ gameBoardController)
/* harmony export */ });
/* harmony import */ var _ship_object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship-object */ "./src/ship-object.js");
/* eslint-disable import/prefer-default-export */

// need to create a board that is 10 x 10 ... board controller should get
// run twice to create eachplayer's board
// should board be a graph??

// gameBoard should check if a game is over by seeing if the
// total amount of 'hits' or 'trues' equals the total length
// of ships that are on the board

// placing ships vertically... possible idea: have a column number (e.g 3)
// that you use to select the corresponding array item in each
// of the arrays that represents a row on the board

function gameBoardController() {
  // const alphabet = ['a','b','c','d','e','f','g','h','i','j']
  const board = [];
  const ships = [];
  function createBoard() {
    for (let i = 0; i < 10; i++) {
      board[i] = [];
      for (let j = 0; j < 10; j++) {
        board[i][j] = false;
      }
    }
    console.log(board);
    return board;
  }
  function placeHorizontalShip(row, col, size) {
    // maybe make a separate function that determines the END POINT of
    // the ship, given the starting row and column positions, as well
    // as the length ... or maybe keep it in house here since 
    // horizontal is dfferent from vertical

    // need to store the memory of the ships coordinates somewhere,
    // potentially in the Ship class
    const ship = new _ship_object__WEBPACK_IMPORTED_MODULE_0__.Ship(size);
    for (let i = 0; i < size; i++) {
      const newCoords = [row, col + i];
      ship.coords.push(newCoords);
    }
    ships.push(ship);
    console.log(ships);
    console.log(ship);
    return ship;
  }
  function placeVerticalShip(row, col, size) {
    // maybe make a separate function that determines the END POINT of
    // the ship, given the starting row and column positions
    // as the length ... or maybe keep it in house here since 
    // horizontal is idfferent from vertical
    const ship = new _ship_object__WEBPACK_IMPORTED_MODULE_0__.Ship(size);
    for (let i = 0; i < size; i++) {
      const newCoords = [row + i, col];
      ship.coords.push(newCoords);
    }
    ships.push(ship);
    console.log(ships);
    console.log(ship);
    return ship;
  }
  return {
    createBoard,
    placeHorizontalShip,
    placeVerticalShip
  };
}

/***/ }),

/***/ "./src/ship-object.js":
/*!****************************!*\
  !*** ./src/ship-object.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Ship: () => (/* binding */ Ship)
/* harmony export */ });
/* eslint-disable import/prefer-default-export */
class Ship {
  constructor(length, hits, isSunk, coords) {
    this.length = length;
    this.hits = 0;
    this.isSunk = false;
    this.coords = [];
  }
  hit() {
    this.hits += 1;
  }
  checkIfSunk() {
    if (this.length === this.hits) {
      console.log('Sunk!');
    }
  }
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _gameboardController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboardController */ "./src/gameboardController.js");

const consoleTest = (0,_gameboardController__WEBPACK_IMPORTED_MODULE_0__.gameBoardController)();
consoleTest.createBoard();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFJLElBQUksQ0FBQztFQUNsQjtFQUVBRyxXQUFXQSxDQUFBLEVBQUc7SUFDVixJQUFJLElBQUksQ0FBQ0osTUFBTSxLQUFLLElBQUksQ0FBQ0MsSUFBSSxFQUFFO01BQzNCYixPQUFPLENBQUNDLEdBQUcsQ0FBQyxPQUFPLENBQUM7SUFDeEI7RUFDSjtBQUVKOzs7Ozs7VUNuQkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ040RDtBQUU1RCxNQUFNZ0IsV0FBVyxHQUFHdkIseUVBQW1CLENBQUMsQ0FBQztBQUV6Q3VCLFdBQVcsQ0FBQ3BCLFdBQVcsQ0FBQyxDQUFDLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tYWluLXRlbXBsYXRlLy4vc3JjL2dhbWVib2FyZENvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vbWFpbi10ZW1wbGF0ZS8uL3NyYy9zaGlwLW9iamVjdC5qcyIsIndlYnBhY2s6Ly9tYWluLXRlbXBsYXRlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL21haW4tdGVtcGxhdGUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL21haW4tdGVtcGxhdGUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9tYWluLXRlbXBsYXRlL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbWFpbi10ZW1wbGF0ZS8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvcHJlZmVyLWRlZmF1bHQtZXhwb3J0ICovXG5cbi8vIG5lZWQgdG8gY3JlYXRlIGEgYm9hcmQgdGhhdCBpcyAxMCB4IDEwIC4uLiBib2FyZCBjb250cm9sbGVyIHNob3VsZCBnZXRcbi8vIHJ1biB0d2ljZSB0byBjcmVhdGUgZWFjaHBsYXllcidzIGJvYXJkXG4vLyBzaG91bGQgYm9hcmQgYmUgYSBncmFwaD8/XG5cbi8vIGdhbWVCb2FyZCBzaG91bGQgY2hlY2sgaWYgYSBnYW1lIGlzIG92ZXIgYnkgc2VlaW5nIGlmIHRoZVxuLy8gdG90YWwgYW1vdW50IG9mICdoaXRzJyBvciAndHJ1ZXMnIGVxdWFscyB0aGUgdG90YWwgbGVuZ3RoXG4vLyBvZiBzaGlwcyB0aGF0IGFyZSBvbiB0aGUgYm9hcmRcblxuLy8gcGxhY2luZyBzaGlwcyB2ZXJ0aWNhbGx5Li4uIHBvc3NpYmxlIGlkZWE6IGhhdmUgYSBjb2x1bW4gbnVtYmVyIChlLmcgMylcbi8vIHRoYXQgeW91IHVzZSB0byBzZWxlY3QgdGhlIGNvcnJlc3BvbmRpbmcgYXJyYXkgaXRlbSBpbiBlYWNoXG4vLyBvZiB0aGUgYXJyYXlzIHRoYXQgcmVwcmVzZW50cyBhIHJvdyBvbiB0aGUgYm9hcmRcbmltcG9ydCB7IFNoaXAgfSBmcm9tIFwiLi9zaGlwLW9iamVjdFwiXG5cblxuZXhwb3J0IGZ1bmN0aW9uIGdhbWVCb2FyZENvbnRyb2xsZXIoKSB7XG4gICAgLy8gY29uc3QgYWxwaGFiZXQgPSBbJ2EnLCdiJywnYycsJ2QnLCdlJywnZicsJ2cnLCdoJywnaScsJ2onXVxuICAgIGNvbnN0IGJvYXJkID0gW107XG4gICAgY29uc3Qgc2hpcHMgPSBbXTtcblxuICAgIGZ1bmN0aW9uIGNyZWF0ZUJvYXJkKCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICAgICAgICAgIGJvYXJkW2ldID0gW107XG5cbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGorKykge1xuICAgICAgICAgICAgICAgIGJvYXJkW2ldW2pdID0gZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyhib2FyZCk7XG4gICAgICAgIHJldHVybiBib2FyZFxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBsYWNlSG9yaXpvbnRhbFNoaXAocm93LCBjb2wsIHNpemUpIHtcbiAgICAgICAgLy8gbWF5YmUgbWFrZSBhIHNlcGFyYXRlIGZ1bmN0aW9uIHRoYXQgZGV0ZXJtaW5lcyB0aGUgRU5EIFBPSU5UIG9mXG4gICAgICAgIC8vIHRoZSBzaGlwLCBnaXZlbiB0aGUgc3RhcnRpbmcgcm93IGFuZCBjb2x1bW4gcG9zaXRpb25zLCBhcyB3ZWxsXG4gICAgICAgIC8vIGFzIHRoZSBsZW5ndGggLi4uIG9yIG1heWJlIGtlZXAgaXQgaW4gaG91c2UgaGVyZSBzaW5jZSBcbiAgICAgICAgLy8gaG9yaXpvbnRhbCBpcyBkZmZlcmVudCBmcm9tIHZlcnRpY2FsXG5cbiAgICAgICAgLy8gbmVlZCB0byBzdG9yZSB0aGUgbWVtb3J5IG9mIHRoZSBzaGlwcyBjb29yZGluYXRlcyBzb21ld2hlcmUsXG4gICAgICAgIC8vIHBvdGVudGlhbGx5IGluIHRoZSBTaGlwIGNsYXNzXG4gICAgICAgIGNvbnN0IHNoaXAgPSBuZXcgU2hpcChzaXplKTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNpemU7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgbmV3Q29vcmRzID0gW3JvdywgY29sICsgaV07XG4gICAgICAgICAgICBzaGlwLmNvb3Jkcy5wdXNoKG5ld0Nvb3JkcylcbiAgICAgICAgfVxuICAgICAgICBzaGlwcy5wdXNoKHNoaXApO1xuICAgICAgICBjb25zb2xlLmxvZyhzaGlwcyk7XG4gICAgICAgIGNvbnNvbGUubG9nKHNoaXApXG4gICAgICAgIHJldHVybiBzaGlwXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGxhY2VWZXJ0aWNhbFNoaXAocm93LCBjb2wsIHNpemUpIHtcbiAgICAgICAgLy8gbWF5YmUgbWFrZSBhIHNlcGFyYXRlIGZ1bmN0aW9uIHRoYXQgZGV0ZXJtaW5lcyB0aGUgRU5EIFBPSU5UIG9mXG4gICAgICAgIC8vIHRoZSBzaGlwLCBnaXZlbiB0aGUgc3RhcnRpbmcgcm93IGFuZCBjb2x1bW4gcG9zaXRpb25zXG4gICAgICAgIC8vIGFzIHRoZSBsZW5ndGggLi4uIG9yIG1heWJlIGtlZXAgaXQgaW4gaG91c2UgaGVyZSBzaW5jZSBcbiAgICAgICAgLy8gaG9yaXpvbnRhbCBpcyBpZGZmZXJlbnQgZnJvbSB2ZXJ0aWNhbFxuICAgICAgICBjb25zdCBzaGlwID0gbmV3IFNoaXAoc2l6ZSk7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaXplOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IG5ld0Nvb3JkcyA9IFtyb3cgKyBpLCBjb2xdO1xuICAgICAgICAgICAgc2hpcC5jb29yZHMucHVzaChuZXdDb29yZHMpO1xuICAgICAgICB9XG4gICAgICAgIHNoaXBzLnB1c2goc2hpcCk7XG4gICAgICAgIGNvbnNvbGUubG9nKHNoaXBzKTtcbiAgICAgICAgY29uc29sZS5sb2coc2hpcClcbiAgICAgICAgcmV0dXJuIHNoaXBcbiAgICB9XG4gXG5cblxuXG4gICAgcmV0dXJuIHsgY3JlYXRlQm9hcmQsIHBsYWNlSG9yaXpvbnRhbFNoaXAsIHBsYWNlVmVydGljYWxTaGlwIH1cbn1cblxuIiwiLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L3ByZWZlci1kZWZhdWx0LWV4cG9ydCAqL1xuZXhwb3J0IGNsYXNzIFNoaXAge1xuICAgIGNvbnN0cnVjdG9yKGxlbmd0aCwgaGl0cywgaXNTdW5rLCBjb29yZHMpIHtcbiAgICAgICAgdGhpcy5sZW5ndGggPSBsZW5ndGg7XG4gICAgICAgIHRoaXMuaGl0cyA9IDA7XG4gICAgICAgIHRoaXMuaXNTdW5rID0gZmFsc2U7XG4gICAgICAgIHRoaXMuY29vcmRzID0gW11cbiAgICB9XG5cbiAgICBoaXQoKSB7XG4gICAgICAgIHRoaXMuaGl0cyArPSAxXG4gICAgfVxuXG4gICAgY2hlY2tJZlN1bmsoKSB7XG4gICAgICAgIGlmICh0aGlzLmxlbmd0aCA9PT0gdGhpcy5oaXRzKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnU3VuayEnKVxuICAgICAgICB9XG4gICAgfVxuXG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBnYW1lQm9hcmRDb250cm9sbGVyIH0gZnJvbSBcIi4vZ2FtZWJvYXJkQ29udHJvbGxlclwiO1xuXG5jb25zdCBjb25zb2xlVGVzdCA9IGdhbWVCb2FyZENvbnRyb2xsZXIoKTtcblxuY29uc29sZVRlc3QuY3JlYXRlQm9hcmQoKSJdLCJuYW1lcyI6WyJTaGlwIiwiZ2FtZUJvYXJkQ29udHJvbGxlciIsImJvYXJkIiwic2hpcHMiLCJjcmVhdGVCb2FyZCIsImkiLCJqIiwiY29uc29sZSIsImxvZyIsInBsYWNlSG9yaXpvbnRhbFNoaXAiLCJyb3ciLCJjb2wiLCJzaXplIiwic2hpcCIsIm5ld0Nvb3JkcyIsImNvb3JkcyIsInB1c2giLCJwbGFjZVZlcnRpY2FsU2hpcCIsImNvbnN0cnVjdG9yIiwibGVuZ3RoIiwiaGl0cyIsImlzU3VuayIsImhpdCIsImNoZWNrSWZTdW5rIiwiY29uc29sZVRlc3QiXSwic291cmNlUm9vdCI6IiJ9