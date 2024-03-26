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
/* eslint-disable no-loop-func */
/* eslint-disable no-plusplus */
/* eslint-disable import/prefer-default-export */

// need to create a board that is 10 x 10 ... board controller should get
// run twice to create eachplayer's board

// gameBoard should check if a game is over by seeing if the
// length of "ships" is zero

// placing ships vertically... possible idea: have a column number (e.g 3)
// that you use to select the corresponding array item in each
// of the arrays that represents a row on the board

function gameBoardController() {
  const shipControlRun = (0,_ship_object__WEBPACK_IMPORTED_MODULE_0__.shipController)();
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
    return ship;
  }
  function placeVerticalShip(row, col, size) {
    const ship = new _ship_object__WEBPACK_IMPORTED_MODULE_0__.Ship(size);
    for (let i = 0; i < size; i++) {
      const newCoords = [row + i, col];
      ship.coords.push(newCoords);
    }
    ships.push(ship);
    console.log(ships);
    return ship;
  }
  function recieveAttack(coords) {
    let attackStatus = 'miss';
    for (let i = 0; i < ships.length; i++) {
      ships[i].coords.every(coord => {
        if (coord[0] === coords[0] && coord[1] === coords[1]) {
          console.log('hit');
          attackStatus = 'hit';
          ships[i].hit();
          const sunkCheck = ships[i].checkIfSunk();
          if (sunkCheck) {
            ships.splice(i, 1);
            console.log(ships);
            checkAllSunk();
          }
          return false;
        }
      });
    }
    updateBoardSpot(coords);
    return attackStatus;
  }
  function checkAllSunk() {
    console.log('ahoy mateys');
  }
  function updateBoardSpot(coords) {
    console.log(coords[0]);
    console.log(board);
    // board[coords[0]][coords[1]] = true;
    return board;
  }
  return {
    createBoard,
    placeHorizontalShip,
    placeVerticalShip,
    recieveAttack,
    checkAllSunk,
    updateBoardSpot
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
/* harmony export */   Ship: () => (/* binding */ Ship),
/* harmony export */   shipController: () => (/* binding */ shipController)
/* harmony export */ });
/* eslint-disable no-else-return */
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
    console.log('hit added');
  }
  checkIfSunk() {
    if (this.length === this.hits) {
      console.log('Sunk!');
      return true;
    } else {
      console.log(this.length);
      console.log(this.hits);
      return false;
    }
  }
}
function shipController() {

  // function shipSunk(ship) {
  //     console.log('ahoy mateys');
  // }

  // return { shipSunk }
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
console.log('yeppp');
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFFO0VBQ3BCO0VBRUFRLEdBQUdBLENBQUEsRUFBRztJQUNGLElBQUksQ0FBQ08sSUFBSSxJQUFJLENBQUM7SUFDZHZCLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLFdBQVcsQ0FBQztFQUM1QjtFQUVBaUIsV0FBV0EsQ0FBQSxFQUFHO0lBQ1YsSUFBSSxJQUFJLENBQUNMLE1BQU0sS0FBSyxJQUFJLENBQUNVLElBQUksRUFBRTtNQUMzQnZCLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLE9BQU8sQ0FBQztNQUNwQixPQUFPLElBQUk7SUFDZixDQUFDLE1BQU07TUFDSEQsT0FBTyxDQUFDQyxHQUFHLENBQUMsSUFBSSxDQUFDWSxNQUFNLENBQUM7TUFDeEJiLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLElBQUksQ0FBQ3NCLElBQUksQ0FBQztNQUN0QixPQUFPLEtBQUs7SUFDaEI7RUFDSjtBQUVKO0FBR08sU0FBUy9CLGNBQWNBLENBQUEsRUFBRzs7RUFFN0I7RUFDQTtFQUNBOztFQUVBO0FBQUE7Ozs7OztVQ25DSjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTjREO0FBRTVELE1BQU1pQyxXQUFXLEdBQUdoQyx5RUFBbUIsQ0FBQyxDQUFDO0FBRXpDZ0MsV0FBVyxDQUFDNUIsV0FBVyxDQUFDLENBQUM7QUFFekJHLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbWFpbi10ZW1wbGF0ZS8uL3NyYy9nYW1lYm9hcmRDb250cm9sbGVyLmpzIiwid2VicGFjazovL21haW4tdGVtcGxhdGUvLi9zcmMvc2hpcC1vYmplY3QuanMiLCJ3ZWJwYWNrOi8vbWFpbi10ZW1wbGF0ZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9tYWluLXRlbXBsYXRlL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9tYWluLXRlbXBsYXRlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vbWFpbi10ZW1wbGF0ZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL21haW4tdGVtcGxhdGUvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgbm8tbG9vcC1mdW5jICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1wbHVzcGx1cyAqL1xuLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L3ByZWZlci1kZWZhdWx0LWV4cG9ydCAqL1xuXG4vLyBuZWVkIHRvIGNyZWF0ZSBhIGJvYXJkIHRoYXQgaXMgMTAgeCAxMCAuLi4gYm9hcmQgY29udHJvbGxlciBzaG91bGQgZ2V0XG4vLyBydW4gdHdpY2UgdG8gY3JlYXRlIGVhY2hwbGF5ZXIncyBib2FyZFxuXG4vLyBnYW1lQm9hcmQgc2hvdWxkIGNoZWNrIGlmIGEgZ2FtZSBpcyBvdmVyIGJ5IHNlZWluZyBpZiB0aGVcbi8vIGxlbmd0aCBvZiBcInNoaXBzXCIgaXMgemVyb1xuXG4vLyBwbGFjaW5nIHNoaXBzIHZlcnRpY2FsbHkuLi4gcG9zc2libGUgaWRlYTogaGF2ZSBhIGNvbHVtbiBudW1iZXIgKGUuZyAzKVxuLy8gdGhhdCB5b3UgdXNlIHRvIHNlbGVjdCB0aGUgY29ycmVzcG9uZGluZyBhcnJheSBpdGVtIGluIGVhY2hcbi8vIG9mIHRoZSBhcnJheXMgdGhhdCByZXByZXNlbnRzIGEgcm93IG9uIHRoZSBib2FyZFxuaW1wb3J0IHsgU2hpcCwgc2hpcENvbnRyb2xsZXIgfSBmcm9tIFwiLi9zaGlwLW9iamVjdFwiXG5cblxuZXhwb3J0IGZ1bmN0aW9uIGdhbWVCb2FyZENvbnRyb2xsZXIoKSB7XG4gICAgY29uc3Qgc2hpcENvbnRyb2xSdW4gPSBzaGlwQ29udHJvbGxlcigpO1xuICAgIC8vIGNvbnN0IGFscGhhYmV0ID0gWydhJywnYicsJ2MnLCdkJywnZScsJ2YnLCdnJywnaCcsJ2knLCdqJ11cbiAgICBjb25zdCBib2FyZCA9IFtdO1xuICAgIGNvbnN0IHNoaXBzID0gW107XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVCb2FyZCgpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgICAgICAgICBib2FyZFtpXSA9IFtdO1xuXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspIHtcbiAgICAgICAgICAgICAgICBib2FyZFtpXVtqXSA9IGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2coYm9hcmQpO1xuICAgICAgICByZXR1cm4gYm9hcmRcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwbGFjZUhvcml6b250YWxTaGlwKHJvdywgY29sLCBzaXplKSB7XG4gICAgICAgIC8vIG1heWJlIG1ha2UgYSBzZXBhcmF0ZSBmdW5jdGlvbiB0aGF0IGRldGVybWluZXMgdGhlIEVORCBQT0lOVCBvZlxuICAgICAgICAvLyB0aGUgc2hpcCwgZ2l2ZW4gdGhlIHN0YXJ0aW5nIHJvdyBhbmQgY29sdW1uIHBvc2l0aW9ucywgYXMgd2VsbFxuICAgICAgICAvLyBhcyB0aGUgbGVuZ3RoIC4uLiBvciBtYXliZSBrZWVwIGl0IGluIGhvdXNlIGhlcmUgc2luY2UgXG4gICAgICAgIC8vIGhvcml6b250YWwgaXMgZGZmZXJlbnQgZnJvbSB2ZXJ0aWNhbFxuXG4gICAgICAgIC8vIG5lZWQgdG8gc3RvcmUgdGhlIG1lbW9yeSBvZiB0aGUgc2hpcHMgY29vcmRpbmF0ZXMgc29tZXdoZXJlLFxuICAgICAgICAvLyBwb3RlbnRpYWxseSBpbiB0aGUgU2hpcCBjbGFzc1xuICAgICAgICBjb25zdCBzaGlwID0gbmV3IFNoaXAoc2l6ZSk7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaXplOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IG5ld0Nvb3JkcyA9IFtyb3csIGNvbCArIGldO1xuICAgICAgICAgICAgc2hpcC5jb29yZHMucHVzaChuZXdDb29yZHMpXG4gICAgICAgIH1cbiAgICAgICAgc2hpcHMucHVzaChzaGlwKTtcbiAgICAgICAgY29uc29sZS5sb2coc2hpcHMpO1xuICAgICAgICByZXR1cm4gc2hpcFxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBsYWNlVmVydGljYWxTaGlwKHJvdywgY29sLCBzaXplKSB7XG4gICAgICAgIGNvbnN0IHNoaXAgPSBuZXcgU2hpcChzaXplKTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNpemU7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgbmV3Q29vcmRzID0gW3JvdyArIGksIGNvbF07XG4gICAgICAgICAgICBzaGlwLmNvb3Jkcy5wdXNoKG5ld0Nvb3Jkcyk7XG4gICAgICAgIH1cbiAgICAgICAgc2hpcHMucHVzaChzaGlwKTtcbiAgICAgICAgY29uc29sZS5sb2coc2hpcHMpO1xuICAgICAgICByZXR1cm4gc2hpcFxuICAgIH1cbiAgICBcbiAgICBmdW5jdGlvbiByZWNpZXZlQXR0YWNrKGNvb3Jkcykge1xuICAgICAgICBsZXQgYXR0YWNrU3RhdHVzID0gJ21pc3MnO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBzaGlwc1tpXS5jb29yZHMuZXZlcnkoY29vcmQgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChjb29yZFswXSA9PT0gY29vcmRzWzBdICYmIGNvb3JkWzFdID09PSBjb29yZHNbMV0pIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2hpdCcpO1xuICAgICAgICAgICAgICAgICAgICBhdHRhY2tTdGF0dXMgPSAnaGl0J1xuICAgICAgICAgICAgICAgICAgICBzaGlwc1tpXS5oaXQoKVxuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHN1bmtDaGVjayA9IHNoaXBzW2ldLmNoZWNrSWZTdW5rKClcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN1bmtDaGVjaykge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2hpcHMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coc2hpcHMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tBbGxTdW5rKClcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICAgICAgdXBkYXRlQm9hcmRTcG90KGNvb3Jkcyk7XG4gICAgICAgIHJldHVybiBhdHRhY2tTdGF0dXNcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjaGVja0FsbFN1bmsoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdhaG95IG1hdGV5cycpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlQm9hcmRTcG90KGNvb3Jkcykge1xuICAgICAgICBjb25zb2xlLmxvZyhjb29yZHNbMF0pXG4gICAgICAgIGNvbnNvbGUubG9nKGJvYXJkKVxuICAgICAgICAvLyBib2FyZFtjb29yZHNbMF1dW2Nvb3Jkc1sxXV0gPSB0cnVlO1xuICAgICAgICByZXR1cm4gYm9hcmRcbiAgICB9XG5cblxuXG4gICAgcmV0dXJuIHsgY3JlYXRlQm9hcmQsIHBsYWNlSG9yaXpvbnRhbFNoaXAsIHBsYWNlVmVydGljYWxTaGlwLCByZWNpZXZlQXR0YWNrLFxuICAgIGNoZWNrQWxsU3VuaywgdXBkYXRlQm9hcmRTcG90IH1cbn1cblxuIiwiLyogZXNsaW50LWRpc2FibGUgbm8tZWxzZS1yZXR1cm4gKi9cbi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9wcmVmZXItZGVmYXVsdC1leHBvcnQgKi9cbmV4cG9ydCBjbGFzcyBTaGlwIHtcbiAgICBjb25zdHJ1Y3RvcihsZW5ndGgsIGhpdHMsIGlzU3VuaywgY29vcmRzKSB7XG4gICAgICAgIHRoaXMubGVuZ3RoID0gbGVuZ3RoO1xuICAgICAgICB0aGlzLmhpdHMgPSAwO1xuICAgICAgICB0aGlzLmlzU3VuayA9IGZhbHNlO1xuICAgICAgICB0aGlzLmNvb3JkcyA9IFtdXG4gICAgfVxuXG4gICAgaGl0KCkge1xuICAgICAgICB0aGlzLmhpdHMgKz0gMVxuICAgICAgICBjb25zb2xlLmxvZygnaGl0IGFkZGVkJylcbiAgICB9XG5cbiAgICBjaGVja0lmU3VuaygpIHtcbiAgICAgICAgaWYgKHRoaXMubGVuZ3RoID09PSB0aGlzLmhpdHMpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdTdW5rIScpXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5sZW5ndGgpO1xuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5oaXRzKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgfVxuXG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIHNoaXBDb250cm9sbGVyKCkge1xuXG4gICAgLy8gZnVuY3Rpb24gc2hpcFN1bmsoc2hpcCkge1xuICAgIC8vICAgICBjb25zb2xlLmxvZygnYWhveSBtYXRleXMnKTtcbiAgICAvLyB9XG5cbiAgICAvLyByZXR1cm4geyBzaGlwU3VuayB9XG5cbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IGdhbWVCb2FyZENvbnRyb2xsZXIgfSBmcm9tIFwiLi9nYW1lYm9hcmRDb250cm9sbGVyXCI7XG5cbmNvbnN0IGNvbnNvbGVUZXN0ID0gZ2FtZUJvYXJkQ29udHJvbGxlcigpO1xuXG5jb25zb2xlVGVzdC5jcmVhdGVCb2FyZCgpXG5cbmNvbnNvbGUubG9nKCd5ZXBwcCcpIl0sIm5hbWVzIjpbIlNoaXAiLCJzaGlwQ29udHJvbGxlciIsImdhbWVCb2FyZENvbnRyb2xsZXIiLCJzaGlwQ29udHJvbFJ1biIsImJvYXJkIiwic2hpcHMiLCJjcmVhdGVCb2FyZCIsImkiLCJqIiwiY29uc29sZSIsImxvZyIsInBsYWNlSG9yaXpvbnRhbFNoaXAiLCJyb3ciLCJjb2wiLCJzaXplIiwic2hpcCIsIm5ld0Nvb3JkcyIsImNvb3JkcyIsInB1c2giLCJwbGFjZVZlcnRpY2FsU2hpcCIsInJlY2lldmVBdHRhY2siLCJhdHRhY2tTdGF0dXMiLCJsZW5ndGgiLCJldmVyeSIsImNvb3JkIiwiaGl0Iiwic3Vua0NoZWNrIiwiY2hlY2tJZlN1bmsiLCJzcGxpY2UiLCJjaGVja0FsbFN1bmsiLCJ1cGRhdGVCb2FyZFNwb3QiLCJjb25zdHJ1Y3RvciIsImhpdHMiLCJpc1N1bmsiLCJjb25zb2xlVGVzdCJdLCJzb3VyY2VSb290IjoiIn0=