/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/gameLoop.js":
/*!*************************!*\
  !*** ./src/gameLoop.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   initializeGame: () => (/* binding */ initializeGame)
/* harmony export */ });
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player */ "./src/player.js");
/* harmony import */ var _gameboardController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gameboardController */ "./src/gameboardController.js");
/* eslint-disable import/prefer-default-export */


const initializeGame = function createGame() {
  const humanPlayer = new _player__WEBPACK_IMPORTED_MODULE_0__.Player();
  let humanBoard = humanPlayer.gameBoard;
  humanBoard = (0,_gameboardController__WEBPACK_IMPORTED_MODULE_1__.gameBoardController)();
  humanBoard.createBoard();
};

/***/ }),

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
/* eslint-disable no-use-before-define */
/* eslint-disable no-else-return */
/* eslint-disable no-loop-func */
/* eslint-disable no-plusplus */
/* eslint-disable import/prefer-default-export */

// need to create a board that is 10 x 10 ... board controller should get
// run twice to create eachplayer's board

// gameBoard should check if a game is over by seeing if the
// length of "ships" is zero (checkAllSunk)

// placing ships vertically... possible idea: have a column number (e.g 3)
// that you use to select the corresponding array item in each
// of the arrays that represents a row on the board

function gameBoardController() {
  // const alphabet = ['a','b','c','d','e','f','g','h','i','j']
  const board = [];
  const ships = [];
  (0,_ship_object__WEBPACK_IMPORTED_MODULE_0__.createFleet)(ships);
  console.log(ships);
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

    // check to see if coords have already been used:
    if (checkIfUsed(coords) === true) {
      return 'filled already';
    }
    for (let i = 0; i < ships.length; i++) {
      ships[i].coords.every(coord => {
        if (coord[0] === coords[0] && coord[1] === coords[1]) {
          console.log('hit');
          attackStatus = 'hit';
          ships[i].hit();
          const sunkCheck = ships[i].checkIfSunk();
          if (sunkCheck) {
            ships.splice(i, 1);
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
    console.log(ships);
    if (ships.length === 0) {
      console.log('player defeated');
      return true;
    } else {
      return false;
    }
  }
  function updateBoardSpot(coords) {
    board[coords[0] - 1][coords[1] - 1] = true;
    // console.log(board)
    return board;
  }
  function checkIfUsed(coords) {
    console.log(board[coords[0] - 1][coords[1] - 1]);
    if (board[coords[0] - 1][coords[1] - 1] === true) {
      console.log('already used');
      return true;
    }
    return false;
  }

  // likely will have to implement check to make sure a ship can
  // be placed with no overlap
  console.log('board exists');
  return {
    createBoard,
    placeHorizontalShip,
    placeVerticalShip,
    recieveAttack,
    checkAllSunk,
    updateBoardSpot,
    checkIfUsed
  };
}

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Player: () => (/* binding */ Player),
/* harmony export */   computerPlayer: () => (/* binding */ computerPlayer),
/* harmony export */   userPlayer: () => (/* binding */ userPlayer)
/* harmony export */ });
// create both the user player and the computer player here

// computer player should have a random cell picker function

// perhaps each player should be assigned an array with specified
// lengths for each ship that is created for them (battleship,
// carrier, etc...)
// this arry can be iterated through, nd create all the necessary ships
class Player {
  constructor(player, gameBoard) {
    this.player = player;
    // this.playerShips = []
    this.gameBoard = null;
  }
}
const userPlayer = function () {};
const computerPlayer = function () {
  function pickRandomCell() {
    const row = Math.floor(Math.random() * 10) + 1;
    const column = Math.floor(Math.random() * 10) + 1;
    console.log(row);
    console.log(column);
    return {
      row,
      column
    };
    // need to implement a checker at some point to ensure
    // that computer can't pick already used cells
  }
  return {
    pickRandomCell
  };
};

/***/ }),

/***/ "./src/ship-object.js":
/*!****************************!*\
  !*** ./src/ship-object.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Ship: () => (/* binding */ Ship),
/* harmony export */   createFleet: () => (/* binding */ createFleet)
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
function createFleet(ships) {
  const carrier = new Ship(5);
  const battleship = new Ship(4);
  const destroyer = new Ship(3);
  const submarine = new Ship(3);
  const patrolBoat = new Ship(2);
  ships.push(carrier, battleship, destroyer, submarine, patrolBoat);
  console.log(ships);
  return ships;
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
/* harmony import */ var _gameLoop__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gameLoop */ "./src/gameLoop.js");


// const consoleTest = gameBoardController();

// consoleTest.createBoard()

console.log('yeppp');
(0,_gameLoop__WEBPACK_IMPORTED_MODULE_1__.initializeGame)();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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aW4tdGVtcGxhdGUvLi9zcmMvZ2FtZUxvb3AuanMiLCJ3ZWJwYWNrOi8vbWFpbi10ZW1wbGF0ZS8uL3NyYy9nYW1lYm9hcmRDb250cm9sbGVyLmpzIiwid2VicGFjazovL21haW4tdGVtcGxhdGUvLi9zcmMvcGxheWVyLmpzIiwid2VicGFjazovL21haW4tdGVtcGxhdGUvLi9zcmMvc2hpcC1vYmplY3QuanMiLCJ3ZWJwYWNrOi8vbWFpbi10ZW1wbGF0ZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9tYWluLXRlbXBsYXRlL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9tYWluLXRlbXBsYXRlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vbWFpbi10ZW1wbGF0ZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL21haW4tdGVtcGxhdGUvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L3ByZWZlci1kZWZhdWx0LWV4cG9ydCAqL1xuaW1wb3J0IHsgUGxheWVyLCB1c2VyUGxheWVyLCBjb21wdXRlclBsYXllciB9IGZyb20gXCIuL3BsYXllclwiO1xuaW1wb3J0IHsgZ2FtZUJvYXJkQ29udHJvbGxlciB9IGZyb20gXCIuL2dhbWVib2FyZENvbnRyb2xsZXJcIjtcblxuZXhwb3J0IGNvbnN0IGluaXRpYWxpemVHYW1lID0gZnVuY3Rpb24gY3JlYXRlR2FtZSgpIHtcbiAgICBjb25zdCBodW1hblBsYXllciA9IG5ldyBQbGF5ZXJcbiAgICBsZXQgaHVtYW5Cb2FyZCA9IGh1bWFuUGxheWVyLmdhbWVCb2FyZDtcbiAgICBodW1hbkJvYXJkID0gZ2FtZUJvYXJkQ29udHJvbGxlcigpO1xuICAgIGh1bWFuQm9hcmQuY3JlYXRlQm9hcmQoKTtcbn0iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby11c2UtYmVmb3JlLWRlZmluZSAqL1xuLyogZXNsaW50LWRpc2FibGUgbm8tZWxzZS1yZXR1cm4gKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLWxvb3AtZnVuYyAqL1xuLyogZXNsaW50LWRpc2FibGUgbm8tcGx1c3BsdXMgKi9cbi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9wcmVmZXItZGVmYXVsdC1leHBvcnQgKi9cblxuLy8gbmVlZCB0byBjcmVhdGUgYSBib2FyZCB0aGF0IGlzIDEwIHggMTAgLi4uIGJvYXJkIGNvbnRyb2xsZXIgc2hvdWxkIGdldFxuLy8gcnVuIHR3aWNlIHRvIGNyZWF0ZSBlYWNocGxheWVyJ3MgYm9hcmRcblxuLy8gZ2FtZUJvYXJkIHNob3VsZCBjaGVjayBpZiBhIGdhbWUgaXMgb3ZlciBieSBzZWVpbmcgaWYgdGhlXG4vLyBsZW5ndGggb2YgXCJzaGlwc1wiIGlzIHplcm8gKGNoZWNrQWxsU3VuaylcblxuLy8gcGxhY2luZyBzaGlwcyB2ZXJ0aWNhbGx5Li4uIHBvc3NpYmxlIGlkZWE6IGhhdmUgYSBjb2x1bW4gbnVtYmVyIChlLmcgMylcbi8vIHRoYXQgeW91IHVzZSB0byBzZWxlY3QgdGhlIGNvcnJlc3BvbmRpbmcgYXJyYXkgaXRlbSBpbiBlYWNoXG4vLyBvZiB0aGUgYXJyYXlzIHRoYXQgcmVwcmVzZW50cyBhIHJvdyBvbiB0aGUgYm9hcmRcbmltcG9ydCB7IFNoaXAsIGNyZWF0ZUZsZWV0IH0gZnJvbSBcIi4vc2hpcC1vYmplY3RcIlxuXG5cbmV4cG9ydCBmdW5jdGlvbiBnYW1lQm9hcmRDb250cm9sbGVyKCkge1xuICAgIC8vIGNvbnN0IGFscGhhYmV0ID0gWydhJywnYicsJ2MnLCdkJywnZScsJ2YnLCdnJywnaCcsJ2knLCdqJ11cbiAgICBjb25zdCBib2FyZCA9IFtdO1xuICAgIGNvbnN0IHNoaXBzID0gW107XG5cbiAgICBjcmVhdGVGbGVldChzaGlwcyk7XG4gICAgY29uc29sZS5sb2coc2hpcHMpO1xuXG5cbiAgICBmdW5jdGlvbiBjcmVhdGVCb2FyZCgpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgICAgICAgICBib2FyZFtpXSA9IFtdO1xuXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspIHtcbiAgICAgICAgICAgICAgICBib2FyZFtpXVtqXSA9IGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2coYm9hcmQpO1xuICAgICAgICByZXR1cm4gYm9hcmRcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwbGFjZUhvcml6b250YWxTaGlwKHJvdywgY29sLCBzaXplKSB7XG4gICAgICAgIGNvbnN0IHNoaXAgPSBuZXcgU2hpcChzaXplKTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNpemU7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgbmV3Q29vcmRzID0gW3JvdywgY29sICsgaV07XG4gICAgICAgICAgICBzaGlwLmNvb3Jkcy5wdXNoKG5ld0Nvb3JkcylcbiAgICAgICAgfVxuICAgICAgICBzaGlwcy5wdXNoKHNoaXApO1xuICAgICAgICBjb25zb2xlLmxvZyhzaGlwcyk7XG4gICAgICAgIHJldHVybiBzaGlwXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGxhY2VWZXJ0aWNhbFNoaXAocm93LCBjb2wsIHNpemUpIHtcbiAgICAgICAgY29uc3Qgc2hpcCA9IG5ldyBTaGlwKHNpemUpO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2l6ZTsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBuZXdDb29yZHMgPSBbcm93ICsgaSwgY29sXTtcbiAgICAgICAgICAgIHNoaXAuY29vcmRzLnB1c2gobmV3Q29vcmRzKTtcbiAgICAgICAgfVxuICAgICAgICBzaGlwcy5wdXNoKHNoaXApO1xuICAgICAgICBjb25zb2xlLmxvZyhzaGlwcyk7XG4gICAgICAgIHJldHVybiBzaGlwXG4gICAgfVxuICAgIFxuICAgIGZ1bmN0aW9uIHJlY2lldmVBdHRhY2soY29vcmRzKSB7XG4gICAgICAgIGxldCBhdHRhY2tTdGF0dXMgPSAnbWlzcyc7XG5cbiAgICAgICAgLy8gY2hlY2sgdG8gc2VlIGlmIGNvb3JkcyBoYXZlIGFscmVhZHkgYmVlbiB1c2VkOlxuICAgICAgICBpZiAoY2hlY2tJZlVzZWQoY29vcmRzKSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgcmV0dXJuICdmaWxsZWQgYWxyZWFkeSdcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHNoaXBzW2ldLmNvb3Jkcy5ldmVyeShjb29yZCA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGNvb3JkWzBdID09PSBjb29yZHNbMF0gJiYgY29vcmRbMV0gPT09IGNvb3Jkc1sxXSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnaGl0Jyk7XG4gICAgICAgICAgICAgICAgICAgIGF0dGFja1N0YXR1cyA9ICdoaXQnXG4gICAgICAgICAgICAgICAgICAgIHNoaXBzW2ldLmhpdCgpXG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3Vua0NoZWNrID0gc2hpcHNbaV0uY2hlY2tJZlN1bmsoKVxuICAgICAgICAgICAgICAgICAgICBpZiAoc3Vua0NoZWNrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzaGlwcy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGVja0FsbFN1bmsoKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgdXBkYXRlQm9hcmRTcG90KGNvb3Jkcyk7XG4gICAgICAgIHJldHVybiBhdHRhY2tTdGF0dXNcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjaGVja0FsbFN1bmsoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKHNoaXBzKVxuICAgICAgICBpZiAoc2hpcHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygncGxheWVyIGRlZmVhdGVkJyk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVCb2FyZFNwb3QoY29vcmRzKSB7XG4gICAgICAgIGJvYXJkW2Nvb3Jkc1swXSAtIDFdW2Nvb3Jkc1sxXSAtIDFdID0gdHJ1ZTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coYm9hcmQpXG4gICAgICAgIHJldHVybiBib2FyZFxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNoZWNrSWZVc2VkKGNvb3Jkcykge1xuICAgICAgICBjb25zb2xlLmxvZyhib2FyZFtjb29yZHNbMF0gLSAxXVtjb29yZHNbMV0gLSAxXSlcbiAgICAgICAgaWYgKGJvYXJkW2Nvb3Jkc1swXSAtIDFdW2Nvb3Jkc1sxXSAtIDFdID09PSB0cnVlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnYWxyZWFkeSB1c2VkJylcbiAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIFxuICAgIH1cblxuICAgIC8vIGxpa2VseSB3aWxsIGhhdmUgdG8gaW1wbGVtZW50IGNoZWNrIHRvIG1ha2Ugc3VyZSBhIHNoaXAgY2FuXG4gICAgLy8gYmUgcGxhY2VkIHdpdGggbm8gb3ZlcmxhcFxuICAgIGNvbnNvbGUubG9nKCdib2FyZCBleGlzdHMnKTtcblxuXG4gICAgcmV0dXJuIHsgY3JlYXRlQm9hcmQsIHBsYWNlSG9yaXpvbnRhbFNoaXAsIHBsYWNlVmVydGljYWxTaGlwLCByZWNpZXZlQXR0YWNrLFxuICAgIGNoZWNrQWxsU3VuaywgdXBkYXRlQm9hcmRTcG90LCBjaGVja0lmVXNlZCB9XG59XG5cbiIsIi8vIGNyZWF0ZSBib3RoIHRoZSB1c2VyIHBsYXllciBhbmQgdGhlIGNvbXB1dGVyIHBsYXllciBoZXJlXG5cbi8vIGNvbXB1dGVyIHBsYXllciBzaG91bGQgaGF2ZSBhIHJhbmRvbSBjZWxsIHBpY2tlciBmdW5jdGlvblxuXG4vLyBwZXJoYXBzIGVhY2ggcGxheWVyIHNob3VsZCBiZSBhc3NpZ25lZCBhbiBhcnJheSB3aXRoIHNwZWNpZmllZFxuLy8gbGVuZ3RocyBmb3IgZWFjaCBzaGlwIHRoYXQgaXMgY3JlYXRlZCBmb3IgdGhlbSAoYmF0dGxlc2hpcCxcbi8vIGNhcnJpZXIsIGV0Yy4uLilcbi8vIHRoaXMgYXJyeSBjYW4gYmUgaXRlcmF0ZWQgdGhyb3VnaCwgbmQgY3JlYXRlIGFsbCB0aGUgbmVjZXNzYXJ5IHNoaXBzXG5leHBvcnQgY2xhc3MgUGxheWVyIHtcbiAgICBjb25zdHJ1Y3RvcihwbGF5ZXIsIGdhbWVCb2FyZCkge1xuICAgICAgICB0aGlzLnBsYXllciA9IHBsYXllcjtcbiAgICAgICAgLy8gdGhpcy5wbGF5ZXJTaGlwcyA9IFtdXG4gICAgICAgIHRoaXMuZ2FtZUJvYXJkPSBudWxsXG4gICAgfVxufVxuXG5cbmV4cG9ydCBjb25zdCB1c2VyUGxheWVyID0gZnVuY3Rpb24gKCkge1xuXG59XG5cbmV4cG9ydCBjb25zdCBjb21wdXRlclBsYXllciA9IGZ1bmN0aW9uICgpIHtcblxuICAgIGZ1bmN0aW9uIHBpY2tSYW5kb21DZWxsKCkge1xuICAgICAgICBjb25zdCByb3cgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCkgKyAxXG4gICAgICAgIGNvbnN0IGNvbHVtbiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKSArIDFcbiAgICAgICAgY29uc29sZS5sb2cocm93KVxuICAgICAgICBjb25zb2xlLmxvZyhjb2x1bW4pXG4gICAgICAgIHJldHVybiB7IHJvdywgY29sdW1uIH1cbiAgICAgICAgLy8gbmVlZCB0byBpbXBsZW1lbnQgYSBjaGVja2VyIGF0IHNvbWUgcG9pbnQgdG8gZW5zdXJlXG4gICAgICAgIC8vIHRoYXQgY29tcHV0ZXIgY2FuJ3QgcGljayBhbHJlYWR5IHVzZWQgY2VsbHNcbiAgICB9XG5cbiAgICByZXR1cm4ge3BpY2tSYW5kb21DZWxsfVxufSIsIi8qIGVzbGludC1kaXNhYmxlIG5vLWVsc2UtcmV0dXJuICovXG4vKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvcHJlZmVyLWRlZmF1bHQtZXhwb3J0ICovXG5leHBvcnQgY2xhc3MgU2hpcCB7XG4gICAgY29uc3RydWN0b3IobGVuZ3RoLCBoaXRzLCBpc1N1bmssIGNvb3Jkcykge1xuICAgICAgICB0aGlzLmxlbmd0aCA9IGxlbmd0aDtcbiAgICAgICAgdGhpcy5oaXRzID0gMDtcbiAgICAgICAgdGhpcy5pc1N1bmsgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5jb29yZHMgPSBbXVxuICAgIH1cblxuICAgIGhpdCgpIHtcbiAgICAgICAgdGhpcy5oaXRzICs9IDFcbiAgICAgICAgY29uc29sZS5sb2coJ2hpdCBhZGRlZCcpXG4gICAgfVxuXG4gICAgY2hlY2tJZlN1bmsoKSB7XG4gICAgICAgIGlmICh0aGlzLmxlbmd0aCA9PT0gdGhpcy5oaXRzKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnU3VuayEnKVxuICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMubGVuZ3RoKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuaGl0cyk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgIH1cblxufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVGbGVldChzaGlwcykge1xuICAgIGNvbnN0IGNhcnJpZXIgPSBuZXcgU2hpcCg1KTtcbiAgICBjb25zdCBiYXR0bGVzaGlwID0gbmV3IFNoaXAoNCk7XG4gICAgY29uc3QgZGVzdHJveWVyID0gbmV3IFNoaXAoMyk7XG4gICAgY29uc3Qgc3VibWFyaW5lID0gbmV3IFNoaXAoMyk7XG4gICAgY29uc3QgcGF0cm9sQm9hdCA9IG5ldyBTaGlwKDIpO1xuICAgIFxuICAgIHNoaXBzLnB1c2goY2FycmllciwgYmF0dGxlc2hpcCwgZGVzdHJveWVyLCBzdWJtYXJpbmUsIHBhdHJvbEJvYXQpXG4gICAgY29uc29sZS5sb2coc2hpcHMpO1xuICAgIHJldHVybiBzaGlwc1xufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgZ2FtZUJvYXJkQ29udHJvbGxlciB9IGZyb20gXCIuL2dhbWVib2FyZENvbnRyb2xsZXJcIjtcbmltcG9ydCB7IGluaXRpYWxpemVHYW1lIH0gZnJvbSBcIi4vZ2FtZUxvb3BcIjtcbi8vIGNvbnN0IGNvbnNvbGVUZXN0ID0gZ2FtZUJvYXJkQ29udHJvbGxlcigpO1xuXG4vLyBjb25zb2xlVGVzdC5jcmVhdGVCb2FyZCgpXG5cbmNvbnNvbGUubG9nKCd5ZXBwcCcpXG5cbmluaXRpYWxpemVHYW1lKCkiXSwibmFtZXMiOlsiUGxheWVyIiwidXNlclBsYXllciIsImNvbXB1dGVyUGxheWVyIiwiZ2FtZUJvYXJkQ29udHJvbGxlciIsImluaXRpYWxpemVHYW1lIiwiY3JlYXRlR2FtZSIsImh1bWFuUGxheWVyIiwiaHVtYW5Cb2FyZCIsImdhbWVCb2FyZCIsImNyZWF0ZUJvYXJkIiwiU2hpcCIsImNyZWF0ZUZsZWV0IiwiYm9hcmQiLCJzaGlwcyIsImNvbnNvbGUiLCJsb2ciLCJpIiwiaiIsInBsYWNlSG9yaXpvbnRhbFNoaXAiLCJyb3ciLCJjb2wiLCJzaXplIiwic2hpcCIsIm5ld0Nvb3JkcyIsImNvb3JkcyIsInB1c2giLCJwbGFjZVZlcnRpY2FsU2hpcCIsInJlY2lldmVBdHRhY2siLCJhdHRhY2tTdGF0dXMiLCJjaGVja0lmVXNlZCIsImxlbmd0aCIsImV2ZXJ5IiwiY29vcmQiLCJoaXQiLCJzdW5rQ2hlY2siLCJjaGVja0lmU3VuayIsInNwbGljZSIsImNoZWNrQWxsU3VuayIsInVwZGF0ZUJvYXJkU3BvdCIsImNvbnN0cnVjdG9yIiwicGxheWVyIiwicGlja1JhbmRvbUNlbGwiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJjb2x1bW4iLCJoaXRzIiwiaXNTdW5rIiwiY2FycmllciIsImJhdHRsZXNoaXAiLCJkZXN0cm95ZXIiLCJzdWJtYXJpbmUiLCJwYXRyb2xCb2F0Il0sInNvdXJjZVJvb3QiOiIifQ==