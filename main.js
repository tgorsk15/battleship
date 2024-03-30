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
/* harmony import */ var _ship_object__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ship-object */ "./src/ship-object.js");
/* harmony import */ var _userInterface__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./userInterface */ "./src/userInterface.js");
/* eslint-disable import/prefer-default-export */




const initializeGame = function createGame() {
  const runDOM = (0,_userInterface__WEBPACK_IMPORTED_MODULE_3__.domManipulation)();
  const humanPlayer = new _player__WEBPACK_IMPORTED_MODULE_0__.Player('Player 1');
  const humanFleet = (0,_ship_object__WEBPACK_IMPORTED_MODULE_2__.createFleet)();
  humanPlayer.gameBoard = (0,_gameboardController__WEBPACK_IMPORTED_MODULE_1__.gameBoardController)(humanFleet, humanPlayer.player);
  const humanBoard = humanPlayer.gameBoard;
  const AIplayer = new _player__WEBPACK_IMPORTED_MODULE_0__.Player('Player 2');
  const computerFleet = (0,_ship_object__WEBPACK_IMPORTED_MODULE_2__.createOppFleet)();
  AIplayer.gameBoard = (0,_gameboardController__WEBPACK_IMPORTED_MODULE_1__.gameBoardController)(computerFleet, AIplayer.player);
  const computerBoard = AIplayer.gameBoard;
  computerBoard.createBoard();
  runDOM.renderGameBoard(computerBoard.createBoard(), AIplayer.player);
  runDOM.renderGameBoard(computerBoard, humanPlayer.player);

  // call render dialogue box here
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
/* harmony import */ var _userInterface__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./userInterface */ "./src/userInterface.js");
/* eslint-disable no-use-before-define */
/* eslint-disable no-else-return */
/* eslint-disable no-loop-func */
/* eslint-disable no-plusplus */
/* eslint-disable import/prefer-default-export */

// gameBoard should check if a game is over by seeing if the
// length of "ships" is zero (checkAllSunk)

// placing ships vertically... possible idea: have a column number (e.g 3)
// that you use to select the corresponding array item in each
// of the arrays that represents a row on the board


const runDOM = (0,_userInterface__WEBPACK_IMPORTED_MODULE_1__.domManipulation)();
function gameBoardController(fleet, name) {
  const playerName = name;
  const board = [];
  const ships = fleet;
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
  function placeHorizontalShip(row, col, ship) {
    for (let i = 0; i < ship.length; i++) {
      const newCoords = [row, col + i];
      // put a check here to see if this conflicts with
      // any other ship's coords 
      ship.coords.push(newCoords);
    }
    return ship;
  }
  function placeVerticalShip(row, col, ship) {
    for (let i = 0; i < ship.length; i++) {
      const newCoords = [row + i, col];
      // put a check here to see if this conflicts with
      // any other ship's coords 
      ship.coords.push(newCoords);
    }
    return ship;
  }
  function recieveAttack(coords) {
    console.log(coords);
    let attackStatus = 'miss';

    // check to see if coords have already been used:
    if (checkIfUsed(coords) === true) {
      return 'filled already';
    }
    for (let i = 0; i < ships.length; i++) {
      ships[i].coords.forEach(coord => {
        if (checkIfUsed(coords) === true) {
          return 'filled already';
        }
        if (coord[0] === coords[0] && coord[1] === coords[1]) {
          console.log([coord[0], coord[1]]);
          console.log('hit');
          attackStatus = 'hit';
          ships[i].hit();
          updateBoardSpot(coords);
          const sunkCheck = ships[i].checkIfSunk();
          if (sunkCheck) {
            ships.splice(i, 1);
            checkAllSunk();
          }
          return false;
        }
      });
    }
    updateBoardSpot(coords, attackStatus);
    return attackStatus;
  }
  function checkAllSunk() {
    console.log(ships);
    console.log(board);
    if (ships.length === 0) {
      console.log('player defeated');
      return true;
    } else {
      return false;
    }
  }
  function updateBoardSpot(coords, attackStatus) {
    board[coords[0] - 1][coords[1] - 1] = true;
    // console.log(board)
    runDOM.useGridSpot(coords, attackStatus, playerName);
    return board;
  }
  function checkIfUsed(coords) {
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
/* harmony export */   createFleet: () => (/* binding */ createFleet),
/* harmony export */   createOppFleet: () => (/* binding */ createOppFleet)
/* harmony export */ });
/* harmony import */ var _gameboardController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboardController */ "./src/gameboardController.js");
/* eslint-disable no-else-return */
/* eslint-disable import/prefer-default-export */

class Ship {
  constructor(length, name, hits, isSunk, coords) {
    this.length = length;
    this.name = name;
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
const boardRun = (0,_gameboardController__WEBPACK_IMPORTED_MODULE_0__.gameBoardController)();
function createFleet() {
  const ships = [];
  const carrier = new Ship(5, 'Carrier');
  const battleship = new Ship(4, 'Battleship');
  const destroyer = new Ship(3, 'Destroyer');
  const submarine = new Ship(3, 'Submarine');
  const patrolBoat = new Ship(2, 'Patrol Boat');
  ships.push(carrier, battleship, destroyer, submarine, patrolBoat);
  boardRun.placeHorizontalShip(1, 8, carrier);
  boardRun.placeVerticalShip(4, 1, battleship);
  boardRun.placeHorizontalShip(7, 4, destroyer);
  boardRun.placeVerticalShip(7, 8, submarine);
  boardRun.placeHorizontalShip(2, 6, patrolBoat);
  console.log(ships);
  return ships;
}
function createOppFleet() {
  const ships = [];
  const carrier = new Ship(5);
  const battleship = new Ship(4);
  const destroyer = new Ship(3);
  const submarine = new Ship(3);
  const patrolBoat = new Ship(2);
  ships.push(carrier, battleship, destroyer, submarine, patrolBoat);
  boardRun.placeHorizontalShip(1, 1, carrier);
  boardRun.placeVerticalShip(4, 2, battleship);
  boardRun.placeHorizontalShip(6, 6, destroyer);
  boardRun.placeVerticalShip(7, 8, submarine);
  boardRun.placeHorizontalShip(3, 7, patrolBoat);
  console.log(ships);
  return ships;
}

/***/ }),

/***/ "./src/userInterface.js":
/*!******************************!*\
  !*** ./src/userInterface.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   domManipulation: () => (/* binding */ domManipulation),
/* harmony export */   initialLoad: () => (/* binding */ initialLoad)
/* harmony export */ });
/* eslint-disable import/prefer-default-export */

const initialLoad = function () {};
const domManipulation = function () {
  const playerBoards = document.querySelector('.gameboards');
  function renderGameBoard(boardController, playerName) {
    let isComputer = false;
    if (playerName === 'Player 2') {
      isComputer = true;
    }
    console.log(isComputer);
    const gameBoardWrapper = document.createElement('div');
    appendElement(gameBoardWrapper, 'board-wrapper', playerBoards);
    const boardTitle = document.createElement('h2');
    appendElement(boardTitle, 'board-title', gameBoardWrapper);
    boardTitle.textContent = playerName;

    // render board:
    const gameboard = document.createElement('div');
    appendElement(gameboard, 'gameboard', gameBoardWrapper);
    buildGrid(gameboard, isComputer);
    if (isComputer === false) {
      console.log('triggered');
      setGridTriggers(boardController);
    }
  }
  function buildGrid(gameboardElement, isComputer) {
    for (let i = 1; i < 11; i++) {
      const row = document.createElement('div');
      appendElement(row, 'row', gameboardElement);
      for (let j = 1; j < 11; j++) {
        const cell = document.createElement('div');
        cell.coordinates = [i, j];
        // console.log(cell.coordinates)
        if (isComputer === true) {
          appendElement(cell, 'cell-c', row);
          cell.setAttribute('id', `${i} ${j}c`);
        } else {
          appendElement(cell, 'cell', row);
          cell.setAttribute('id', `${i} ${j}h`);
        }
      }
    }
  }
  function setGridTriggers(computerBoardController) {
    const cells = document.querySelectorAll('.cell-c');
    console.log(cells);
    cells.forEach(cell => {
      cell.addEventListener('click', () => {
        console.log(cell.coordinates);
        computerBoardController.recieveAttack(cell.coordinates);
        // need to trigger recieveAttack on the correct
        // game board 
        // need to trigger computer's attack in response
      });
    });
  }
  function useGridSpot(coords, status, name) {
    // registers that teh grid spot was used, and displays
    // either a hit or miss

    if (name === 'Player 2') {
      console.log(status);
      const usedCell = document.getElementById(`${coords[0]} ${coords[1]}c`);
      if (status === 'hit') {
        usedCell.textContent = 'X';
      } else if (status === 'miss') {
        usedCell.textContent = '.';
      }
    } else {
      console.log(status);
      const usedCell = document.getElementById(`${coords[0]} ${coords[1]}c`);
      if (status === 'hit') {
        usedCell.textContent = 'X';
      } else if (status === 'miss') {
        usedCell.textContent = '.';
      }
    }
    console.log('used up the spot');
  }
  function appendElement(elementName, className, fatherElement) {
    elementName.classList.add(className);
    fatherElement.appendChild(elementName);
    return elementName;
  }
  return {
    renderGameBoard,
    appendElement,
    buildGrid,
    setGridTriggers,
    useGridSpot
  };
};

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/pageStyling.css":
/*!*******************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/pageStyling.css ***!
  \*******************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `html, body {
    min-height: 100%;
    min-width: 100%;
    margin: 0px;
}

body {
    background-color: navy;
}

.prompt-box {
    display: none
}

.game-container {
    display: grid;
    grid-template-rows: 1fr 4fr 1.7fr;
    height: 100vh;
    width: 100vw;
    background-color: rgb(59, 59, 59);
}

.header {
    display: flex;
    grid-row: 1 / 2;
}

.gameboards {
    display: flex;
    justify-content: space-around;
    grid-row: 2 / 3;
    background-color: rgb(114, 155, 155);
}

.dialogue-box {
    display: flex;
    grid-row: 3 / 4;
}

/* gameboard wrapper styling */
.board-wrapper {
    height: 100%;
    width: 400px;
    background-color: bisque;
}

.board-title {

}

.gameboard {
    display: flex;
    flex-direction: column;
    height: 400px;
    width: 400px;
    background-color: blueviolet;
}

.row {
    display: flex;
    /* flex-direction: column; */
    height: 10%;
    width: 100%;
    background-color: pink;
}

.cell {
    width: 100%;
    margin: 0px;
    aspect-ratio: 1;
    background-color: rgb(221, 241, 241);
    border: 1px solid black;
}

.cell-c {
    width: 100%;
    margin: 0px;
    aspect-ratio: 1;
    background-color: rgb(221, 241, 241);
    border: 1px solid black;
}

.cell:hover, .cell-c:hover {
    background-color: antiquewhite;
}
`, "",{"version":3,"sources":["webpack://./src/pageStyling.css"],"names":[],"mappings":"AAAA;IACI,gBAAgB;IAChB,eAAe;IACf,WAAW;AACf;;AAEA;IACI,sBAAsB;AAC1B;;AAEA;IACI;AACJ;;AAEA;IACI,aAAa;IACb,iCAAiC;IACjC,aAAa;IACb,YAAY;IACZ,iCAAiC;AACrC;;AAEA;IACI,aAAa;IACb,eAAe;AACnB;;AAEA;IACI,aAAa;IACb,6BAA6B;IAC7B,eAAe;IACf,oCAAoC;AACxC;;AAEA;IACI,aAAa;IACb,eAAe;AACnB;;AAEA,8BAA8B;AAC9B;IACI,YAAY;IACZ,YAAY;IACZ,wBAAwB;AAC5B;;AAEA;;AAEA;;AAEA;IACI,aAAa;IACb,sBAAsB;IACtB,aAAa;IACb,YAAY;IACZ,4BAA4B;AAChC;;AAEA;IACI,aAAa;IACb,4BAA4B;IAC5B,WAAW;IACX,WAAW;IACX,sBAAsB;AAC1B;;AAEA;IACI,WAAW;IACX,WAAW;IACX,eAAe;IACf,oCAAoC;IACpC,uBAAuB;AAC3B;;AAEA;IACI,WAAW;IACX,WAAW;IACX,eAAe;IACf,oCAAoC;IACpC,uBAAuB;AAC3B;;AAEA;IACI,8BAA8B;AAClC","sourcesContent":["html, body {\n    min-height: 100%;\n    min-width: 100%;\n    margin: 0px;\n}\n\nbody {\n    background-color: navy;\n}\n\n.prompt-box {\n    display: none\n}\n\n.game-container {\n    display: grid;\n    grid-template-rows: 1fr 4fr 1.7fr;\n    height: 100vh;\n    width: 100vw;\n    background-color: rgb(59, 59, 59);\n}\n\n.header {\n    display: flex;\n    grid-row: 1 / 2;\n}\n\n.gameboards {\n    display: flex;\n    justify-content: space-around;\n    grid-row: 2 / 3;\n    background-color: rgb(114, 155, 155);\n}\n\n.dialogue-box {\n    display: flex;\n    grid-row: 3 / 4;\n}\n\n/* gameboard wrapper styling */\n.board-wrapper {\n    height: 100%;\n    width: 400px;\n    background-color: bisque;\n}\n\n.board-title {\n\n}\n\n.gameboard {\n    display: flex;\n    flex-direction: column;\n    height: 400px;\n    width: 400px;\n    background-color: blueviolet;\n}\n\n.row {\n    display: flex;\n    /* flex-direction: column; */\n    height: 10%;\n    width: 100%;\n    background-color: pink;\n}\n\n.cell {\n    width: 100%;\n    margin: 0px;\n    aspect-ratio: 1;\n    background-color: rgb(221, 241, 241);\n    border: 1px solid black;\n}\n\n.cell-c {\n    width: 100%;\n    margin: 0px;\n    aspect-ratio: 1;\n    background-color: rgb(221, 241, 241);\n    border: 1px solid black;\n}\n\n.cell:hover, .cell-c:hover {\n    background-color: antiquewhite;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./src/pageStyling.css":
/*!*****************************!*\
  !*** ./src/pageStyling.css ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_pageStyling_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./pageStyling.css */ "./node_modules/css-loader/dist/cjs.js!./src/pageStyling.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_pageStyling_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_pageStyling_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_pageStyling_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_pageStyling_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

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
/******/ 			id: moduleId,
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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
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
/* harmony import */ var _pageStyling_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pageStyling.css */ "./src/pageStyling.css");
/* harmony import */ var _gameboardController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gameboardController */ "./src/gameboardController.js");
/* harmony import */ var _gameLoop__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./gameLoop */ "./src/gameLoop.js");




// consoleTest.createBoard()

console.log('yeppp');
(0,_gameLoop__WEBPACK_IMPORTED_MODULE_2__.initializeGame)();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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aUMsV0FBVztXQUM1QztXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztXQ05BOzs7Ozs7Ozs7Ozs7OztBQ0EyQjtBQUNpQztBQUNoQjs7QUFHNUM7O0FBRUF4QixPQUFPLENBQUNDLEdBQUcsQ0FBQyxPQUFPLENBQUM7QUFFcEJwQix5REFBYyxDQUFDLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL21haW4tdGVtcGxhdGUvLi9zcmMvZ2FtZUxvb3AuanMiLCJ3ZWJwYWNrOi8vbWFpbi10ZW1wbGF0ZS8uL3NyYy9nYW1lYm9hcmRDb250cm9sbGVyLmpzIiwid2VicGFjazovL21haW4tdGVtcGxhdGUvLi9zcmMvcGxheWVyLmpzIiwid2VicGFjazovL21haW4tdGVtcGxhdGUvLi9zcmMvc2hpcC1vYmplY3QuanMiLCJ3ZWJwYWNrOi8vbWFpbi10ZW1wbGF0ZS8uL3NyYy91c2VySW50ZXJmYWNlLmpzIiwid2VicGFjazovL21haW4tdGVtcGxhdGUvLi9zcmMvcGFnZVN0eWxpbmcuY3NzIiwid2VicGFjazovL21haW4tdGVtcGxhdGUvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL21haW4tdGVtcGxhdGUvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9tYWluLXRlbXBsYXRlLy4vc3JjL3BhZ2VTdHlsaW5nLmNzcz9hOWI3Iiwid2VicGFjazovL21haW4tdGVtcGxhdGUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vbWFpbi10ZW1wbGF0ZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vbWFpbi10ZW1wbGF0ZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9tYWluLXRlbXBsYXRlLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL21haW4tdGVtcGxhdGUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly9tYWluLXRlbXBsYXRlLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vbWFpbi10ZW1wbGF0ZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9tYWluLXRlbXBsYXRlL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL21haW4tdGVtcGxhdGUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL21haW4tdGVtcGxhdGUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9tYWluLXRlbXBsYXRlL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbWFpbi10ZW1wbGF0ZS93ZWJwYWNrL3J1bnRpbWUvbm9uY2UiLCJ3ZWJwYWNrOi8vbWFpbi10ZW1wbGF0ZS8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvcHJlZmVyLWRlZmF1bHQtZXhwb3J0ICovXG5pbXBvcnQgeyBQbGF5ZXIsIHVzZXJQbGF5ZXIsIGNvbXB1dGVyUGxheWVyIH0gZnJvbSBcIi4vcGxheWVyXCI7XG5pbXBvcnQgeyBnYW1lQm9hcmRDb250cm9sbGVyIH0gZnJvbSBcIi4vZ2FtZWJvYXJkQ29udHJvbGxlclwiO1xuaW1wb3J0IHsgY3JlYXRlRmxlZXQsIGNyZWF0ZU9wcEZsZWV0IH0gZnJvbSBcIi4vc2hpcC1vYmplY3RcIjtcbmltcG9ydCB7IGRvbU1hbmlwdWxhdGlvbiB9IGZyb20gXCIuL3VzZXJJbnRlcmZhY2VcIjtcblxuZXhwb3J0IGNvbnN0IGluaXRpYWxpemVHYW1lID0gZnVuY3Rpb24gY3JlYXRlR2FtZSgpIHtcbiAgICBjb25zdCBydW5ET00gPSBkb21NYW5pcHVsYXRpb24oKTtcblxuICAgIGNvbnN0IGh1bWFuUGxheWVyID0gbmV3IFBsYXllcignUGxheWVyIDEnKVxuICAgIGNvbnN0IGh1bWFuRmxlZXQgPSBjcmVhdGVGbGVldCgpXG4gICAgaHVtYW5QbGF5ZXIuZ2FtZUJvYXJkID0gZ2FtZUJvYXJkQ29udHJvbGxlcihodW1hbkZsZWV0LCBodW1hblBsYXllci5wbGF5ZXIpO1xuICAgIGNvbnN0IGh1bWFuQm9hcmQgPSBodW1hblBsYXllci5nYW1lQm9hcmRcbiAgICBcblxuXG5cbiAgICBjb25zdCBBSXBsYXllciA9IG5ldyBQbGF5ZXIoJ1BsYXllciAyJyk7XG4gICAgY29uc3QgY29tcHV0ZXJGbGVldCA9IGNyZWF0ZU9wcEZsZWV0KCk7XG4gICAgQUlwbGF5ZXIuZ2FtZUJvYXJkID0gZ2FtZUJvYXJkQ29udHJvbGxlcihjb21wdXRlckZsZWV0LCBBSXBsYXllci5wbGF5ZXIpO1xuICAgIGNvbnN0IGNvbXB1dGVyQm9hcmQgPSBBSXBsYXllci5nYW1lQm9hcmQ7XG4gICAgY29tcHV0ZXJCb2FyZC5jcmVhdGVCb2FyZCgpO1xuXG4gICAgXG4gICAgcnVuRE9NLnJlbmRlckdhbWVCb2FyZChjb21wdXRlckJvYXJkLmNyZWF0ZUJvYXJkKCksIEFJcGxheWVyLnBsYXllcik7XG4gICAgcnVuRE9NLnJlbmRlckdhbWVCb2FyZChjb21wdXRlckJvYXJkLCBodW1hblBsYXllci5wbGF5ZXIpO1xuICAgIFxuXG4gICAgLy8gY2FsbCByZW5kZXIgZGlhbG9ndWUgYm94IGhlcmVcbn0iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby11c2UtYmVmb3JlLWRlZmluZSAqL1xuLyogZXNsaW50LWRpc2FibGUgbm8tZWxzZS1yZXR1cm4gKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLWxvb3AtZnVuYyAqL1xuLyogZXNsaW50LWRpc2FibGUgbm8tcGx1c3BsdXMgKi9cbi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9wcmVmZXItZGVmYXVsdC1leHBvcnQgKi9cblxuLy8gZ2FtZUJvYXJkIHNob3VsZCBjaGVjayBpZiBhIGdhbWUgaXMgb3ZlciBieSBzZWVpbmcgaWYgdGhlXG4vLyBsZW5ndGggb2YgXCJzaGlwc1wiIGlzIHplcm8gKGNoZWNrQWxsU3VuaylcblxuLy8gcGxhY2luZyBzaGlwcyB2ZXJ0aWNhbGx5Li4uIHBvc3NpYmxlIGlkZWE6IGhhdmUgYSBjb2x1bW4gbnVtYmVyIChlLmcgMylcbi8vIHRoYXQgeW91IHVzZSB0byBzZWxlY3QgdGhlIGNvcnJlc3BvbmRpbmcgYXJyYXkgaXRlbSBpbiBlYWNoXG4vLyBvZiB0aGUgYXJyYXlzIHRoYXQgcmVwcmVzZW50cyBhIHJvdyBvbiB0aGUgYm9hcmRcbmltcG9ydCB7IFNoaXAsIGNyZWF0ZUZsZWV0IH0gZnJvbSBcIi4vc2hpcC1vYmplY3RcIlxuaW1wb3J0IHsgZG9tTWFuaXB1bGF0aW9uIH0gZnJvbSBcIi4vdXNlckludGVyZmFjZVwiO1xuXG5jb25zdCBydW5ET00gPSBkb21NYW5pcHVsYXRpb24oKTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdhbWVCb2FyZENvbnRyb2xsZXIoZmxlZXQsIG5hbWUpIHtcbiAgICBjb25zdCBwbGF5ZXJOYW1lID0gbmFtZTtcbiAgICBjb25zdCBib2FyZCA9IFtdO1xuICAgIGNvbnN0IHNoaXBzID0gZmxlZXQ7XG5cbiAgICBjb25zb2xlLmxvZyhzaGlwcyk7XG5cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZUJvYXJkKCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICAgICAgICAgIGJvYXJkW2ldID0gW107XG5cbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGorKykge1xuICAgICAgICAgICAgICAgIGJvYXJkW2ldW2pdID0gZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyhib2FyZCk7XG4gICAgICAgIHJldHVybiBib2FyZFxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBsYWNlSG9yaXpvbnRhbFNoaXAocm93LCBjb2wsIHNoaXApIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBuZXdDb29yZHMgPSBbcm93LCBjb2wgKyBpXTtcbiAgICAgICAgICAgIC8vIHB1dCBhIGNoZWNrIGhlcmUgdG8gc2VlIGlmIHRoaXMgY29uZmxpY3RzIHdpdGhcbiAgICAgICAgICAgIC8vIGFueSBvdGhlciBzaGlwJ3MgY29vcmRzIFxuICAgICAgICAgICAgc2hpcC5jb29yZHMucHVzaChuZXdDb29yZHMpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNoaXBcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwbGFjZVZlcnRpY2FsU2hpcChyb3csIGNvbCwgc2hpcCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IG5ld0Nvb3JkcyA9IFtyb3cgKyBpLCBjb2xdO1xuICAgICAgICAgICAgLy8gcHV0IGEgY2hlY2sgaGVyZSB0byBzZWUgaWYgdGhpcyBjb25mbGljdHMgd2l0aFxuICAgICAgICAgICAgLy8gYW55IG90aGVyIHNoaXAncyBjb29yZHMgXG4gICAgICAgICAgICBzaGlwLmNvb3Jkcy5wdXNoKG5ld0Nvb3Jkcyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNoaXBcbiAgICB9XG4gICAgXG4gICAgZnVuY3Rpb24gcmVjaWV2ZUF0dGFjayhjb29yZHMpIHtcbiAgICAgICAgY29uc29sZS5sb2coY29vcmRzKVxuICAgICAgICBsZXQgYXR0YWNrU3RhdHVzID0gJ21pc3MnO1xuXG4gICAgICAgIC8vIGNoZWNrIHRvIHNlZSBpZiBjb29yZHMgaGF2ZSBhbHJlYWR5IGJlZW4gdXNlZDpcbiAgICAgICAgaWYgKGNoZWNrSWZVc2VkKGNvb3JkcykgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHJldHVybiAnZmlsbGVkIGFscmVhZHknXG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBzaGlwc1tpXS5jb29yZHMuZm9yRWFjaCgoY29vcmQpID0+IHtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAoY2hlY2tJZlVzZWQoY29vcmRzKSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ2ZpbGxlZCBhbHJlYWR5J1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChjb29yZFswXSA9PT0gY29vcmRzWzBdICYmIGNvb3JkWzFdID09PSBjb29yZHNbMV0pIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coW2Nvb3JkWzBdLCBjb29yZFsxXV0pXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdoaXQnKTtcbiAgICAgICAgICAgICAgICAgICAgYXR0YWNrU3RhdHVzID0gJ2hpdCdcbiAgICAgICAgICAgICAgICAgICAgc2hpcHNbaV0uaGl0KCk7XG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZUJvYXJkU3BvdChjb29yZHMpO1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHN1bmtDaGVjayA9IHNoaXBzW2ldLmNoZWNrSWZTdW5rKClcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN1bmtDaGVjaykge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2hpcHMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tBbGxTdW5rKClcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIHVwZGF0ZUJvYXJkU3BvdChjb29yZHMsIGF0dGFja1N0YXR1cyk7XG4gICAgICAgIHJldHVybiBhdHRhY2tTdGF0dXNcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjaGVja0FsbFN1bmsoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKHNoaXBzKVxuICAgICAgICBjb25zb2xlLmxvZyhib2FyZClcbiAgICAgICAgaWYgKHNoaXBzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ3BsYXllciBkZWZlYXRlZCcpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlQm9hcmRTcG90KGNvb3JkcywgYXR0YWNrU3RhdHVzKSB7XG4gICAgICAgIGJvYXJkW2Nvb3Jkc1swXSAtIDFdW2Nvb3Jkc1sxXSAtIDFdID0gdHJ1ZTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coYm9hcmQpXG4gICAgICAgIHJ1bkRPTS51c2VHcmlkU3BvdChjb29yZHMsIGF0dGFja1N0YXR1cywgcGxheWVyTmFtZSlcbiAgICAgICAgcmV0dXJuIGJvYXJkXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2hlY2tJZlVzZWQoY29vcmRzKSB7XG4gICAgICAgIGlmIChib2FyZFtjb29yZHNbMF0gLSAxXVtjb29yZHNbMV0gLSAxXSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2FscmVhZHkgdXNlZCcpXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICBcbiAgICB9XG5cbiAgICAvLyBsaWtlbHkgd2lsbCBoYXZlIHRvIGltcGxlbWVudCBjaGVjayB0byBtYWtlIHN1cmUgYSBzaGlwIGNhblxuICAgIC8vIGJlIHBsYWNlZCB3aXRoIG5vIG92ZXJsYXBcbiAgICBjb25zb2xlLmxvZygnYm9hcmQgZXhpc3RzJyk7XG5cblxuICAgIHJldHVybiB7IGNyZWF0ZUJvYXJkLCBwbGFjZUhvcml6b250YWxTaGlwLCBwbGFjZVZlcnRpY2FsU2hpcCwgcmVjaWV2ZUF0dGFjayxcbiAgICBjaGVja0FsbFN1bmssIHVwZGF0ZUJvYXJkU3BvdCwgY2hlY2tJZlVzZWQgfVxufVxuXG4iLCIvLyBjcmVhdGUgYm90aCB0aGUgdXNlciBwbGF5ZXIgYW5kIHRoZSBjb21wdXRlciBwbGF5ZXIgaGVyZVxuXG4vLyBjb21wdXRlciBwbGF5ZXIgc2hvdWxkIGhhdmUgYSByYW5kb20gY2VsbCBwaWNrZXIgZnVuY3Rpb25cblxuLy8gcGVyaGFwcyBlYWNoIHBsYXllciBzaG91bGQgYmUgYXNzaWduZWQgYW4gYXJyYXkgd2l0aCBzcGVjaWZpZWRcbi8vIGxlbmd0aHMgZm9yIGVhY2ggc2hpcCB0aGF0IGlzIGNyZWF0ZWQgZm9yIHRoZW0gKGJhdHRsZXNoaXAsXG4vLyBjYXJyaWVyLCBldGMuLi4pXG4vLyB0aGlzIGFycnkgY2FuIGJlIGl0ZXJhdGVkIHRocm91Z2gsIG5kIGNyZWF0ZSBhbGwgdGhlIG5lY2Vzc2FyeSBzaGlwc1xuZXhwb3J0IGNsYXNzIFBsYXllciB7XG4gICAgY29uc3RydWN0b3IocGxheWVyLCBnYW1lQm9hcmQpIHtcbiAgICAgICAgdGhpcy5wbGF5ZXIgPSBwbGF5ZXI7XG4gICAgICAgIC8vIHRoaXMucGxheWVyU2hpcHMgPSBbXVxuICAgICAgICB0aGlzLmdhbWVCb2FyZD0gbnVsbFxuICAgIH1cbn1cblxuXG5leHBvcnQgY29uc3QgdXNlclBsYXllciA9IGZ1bmN0aW9uICgpIHtcblxufVxuXG5leHBvcnQgY29uc3QgY29tcHV0ZXJQbGF5ZXIgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICBmdW5jdGlvbiBwaWNrUmFuZG9tQ2VsbCgpIHtcbiAgICAgICAgY29uc3Qgcm93ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApICsgMVxuICAgICAgICBjb25zdCBjb2x1bW4gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCkgKyAxXG4gICAgICAgIGNvbnNvbGUubG9nKHJvdylcbiAgICAgICAgY29uc29sZS5sb2coY29sdW1uKVxuICAgICAgICByZXR1cm4geyByb3csIGNvbHVtbiB9XG4gICAgICAgIC8vIG5lZWQgdG8gaW1wbGVtZW50IGEgY2hlY2tlciBhdCBzb21lIHBvaW50IHRvIGVuc3VyZVxuICAgICAgICAvLyB0aGF0IGNvbXB1dGVyIGNhbid0IHBpY2sgYWxyZWFkeSB1c2VkIGNlbGxzXG4gICAgfVxuXG4gICAgcmV0dXJuIHtwaWNrUmFuZG9tQ2VsbH1cbn0iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby1lbHNlLXJldHVybiAqL1xuLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L3ByZWZlci1kZWZhdWx0LWV4cG9ydCAqL1xuaW1wb3J0IHsgZ2FtZUJvYXJkQ29udHJvbGxlciB9IGZyb20gXCIuL2dhbWVib2FyZENvbnRyb2xsZXJcIjtcblxuZXhwb3J0IGNsYXNzIFNoaXAge1xuICAgIGNvbnN0cnVjdG9yKGxlbmd0aCwgbmFtZSwgaGl0cywgaXNTdW5rLCBjb29yZHMpIHtcbiAgICAgICAgdGhpcy5sZW5ndGggPSBsZW5ndGg7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMuaGl0cyA9IDA7XG4gICAgICAgIHRoaXMuaXNTdW5rID0gZmFsc2U7XG4gICAgICAgIHRoaXMuY29vcmRzID0gW11cbiAgICB9XG5cbiAgICBoaXQoKSB7XG4gICAgICAgIHRoaXMuaGl0cyArPSAxXG4gICAgICAgIGNvbnNvbGUubG9nKCdoaXQgYWRkZWQnKVxuICAgIH1cblxuICAgIGNoZWNrSWZTdW5rKCkge1xuICAgICAgICBpZiAodGhpcy5sZW5ndGggPT09IHRoaXMuaGl0cykge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ1N1bmshJylcbiAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmxlbmd0aCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmhpdHMpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICB9XG5cbn1cblxuY29uc3QgYm9hcmRSdW4gPSBnYW1lQm9hcmRDb250cm9sbGVyKCk7XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVGbGVldCgpIHtcbiAgICBjb25zdCBzaGlwcyA9IFtdXG5cbiAgICBjb25zdCBjYXJyaWVyID0gbmV3IFNoaXAoNSwgJ0NhcnJpZXInKTtcbiAgICBjb25zdCBiYXR0bGVzaGlwID0gbmV3IFNoaXAoNCwgJ0JhdHRsZXNoaXAnKTtcbiAgICBjb25zdCBkZXN0cm95ZXIgPSBuZXcgU2hpcCgzLCAnRGVzdHJveWVyJyk7XG4gICAgY29uc3Qgc3VibWFyaW5lID0gbmV3IFNoaXAoMywgJ1N1Ym1hcmluZScpO1xuICAgIGNvbnN0IHBhdHJvbEJvYXQgPSBuZXcgU2hpcCgyLCAnUGF0cm9sIEJvYXQnKTtcbiBcbiAgICBzaGlwcy5wdXNoKGNhcnJpZXIsIGJhdHRsZXNoaXAsIGRlc3Ryb3llciwgc3VibWFyaW5lLCBwYXRyb2xCb2F0KVxuXG4gICAgYm9hcmRSdW4ucGxhY2VIb3Jpem9udGFsU2hpcCgxLCA4LCBjYXJyaWVyKTtcbiAgICBib2FyZFJ1bi5wbGFjZVZlcnRpY2FsU2hpcCg0LDEsIGJhdHRsZXNoaXApXG4gICAgYm9hcmRSdW4ucGxhY2VIb3Jpem9udGFsU2hpcCg3LCA0LCBkZXN0cm95ZXIpO1xuICAgIGJvYXJkUnVuLnBsYWNlVmVydGljYWxTaGlwKDcsIDgsIHN1Ym1hcmluZSk7XG4gICAgYm9hcmRSdW4ucGxhY2VIb3Jpem9udGFsU2hpcCgyLCA2LHBhdHJvbEJvYXQpO1xuICAgIGNvbnNvbGUubG9nKHNoaXBzKTtcbiAgICByZXR1cm4gc2hpcHNcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZU9wcEZsZWV0KCkge1xuICAgIGNvbnN0IHNoaXBzID0gW11cblxuICAgIGNvbnN0IGNhcnJpZXIgPSBuZXcgU2hpcCg1KTtcbiAgICBjb25zdCBiYXR0bGVzaGlwID0gbmV3IFNoaXAoNCk7XG4gICAgY29uc3QgZGVzdHJveWVyID0gbmV3IFNoaXAoMyk7XG4gICAgY29uc3Qgc3VibWFyaW5lID0gbmV3IFNoaXAoMyk7XG4gICAgY29uc3QgcGF0cm9sQm9hdCA9IG5ldyBTaGlwKDIpO1xuXG4gICAgc2hpcHMucHVzaChjYXJyaWVyLCBiYXR0bGVzaGlwLCBkZXN0cm95ZXIsIHN1Ym1hcmluZSwgcGF0cm9sQm9hdCk7XG5cbiAgICBib2FyZFJ1bi5wbGFjZUhvcml6b250YWxTaGlwKDEsIDEsIGNhcnJpZXIpO1xuICAgIGJvYXJkUnVuLnBsYWNlVmVydGljYWxTaGlwKDQsMiwgYmF0dGxlc2hpcClcbiAgICBib2FyZFJ1bi5wbGFjZUhvcml6b250YWxTaGlwKDYsIDYsIGRlc3Ryb3llcik7XG4gICAgYm9hcmRSdW4ucGxhY2VWZXJ0aWNhbFNoaXAoNywgOCwgc3VibWFyaW5lKTtcbiAgICBib2FyZFJ1bi5wbGFjZUhvcml6b250YWxTaGlwKDMsIDcscGF0cm9sQm9hdCk7XG4gICAgY29uc29sZS5sb2coc2hpcHMpO1xuICAgIHJldHVybiBzaGlwc1xufSIsIi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9wcmVmZXItZGVmYXVsdC1leHBvcnQgKi9cblxuXG5leHBvcnQgY29uc3QgaW5pdGlhbExvYWQgPSBmdW5jdGlvbigpIHtcblxufVxuXG5cbmV4cG9ydCBjb25zdCBkb21NYW5pcHVsYXRpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgcGxheWVyQm9hcmRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdhbWVib2FyZHMnKTtcblxuXG4gICAgZnVuY3Rpb24gcmVuZGVyR2FtZUJvYXJkKGJvYXJkQ29udHJvbGxlciwgcGxheWVyTmFtZSkge1xuICAgICAgICBsZXQgaXNDb21wdXRlciA9IGZhbHNlO1xuICAgICAgICBpZiAocGxheWVyTmFtZSA9PT0gJ1BsYXllciAyJykge1xuICAgICAgICAgICAgaXNDb21wdXRlciA9IHRydWVcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyhpc0NvbXB1dGVyKTtcblxuICAgICAgICBjb25zdCBnYW1lQm9hcmRXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGFwcGVuZEVsZW1lbnQoZ2FtZUJvYXJkV3JhcHBlciwgJ2JvYXJkLXdyYXBwZXInLCBwbGF5ZXJCb2FyZHMpXG4gICAgICAgXG4gICAgICAgIGNvbnN0IGJvYXJkVGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMicpO1xuICAgICAgICBhcHBlbmRFbGVtZW50KGJvYXJkVGl0bGUsICdib2FyZC10aXRsZScsIGdhbWVCb2FyZFdyYXBwZXIpO1xuICAgICAgICBib2FyZFRpdGxlLnRleHRDb250ZW50ID0gcGxheWVyTmFtZTtcblxuICAgICAgICAvLyByZW5kZXIgYm9hcmQ6XG4gICAgICAgIGNvbnN0IGdhbWVib2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBhcHBlbmRFbGVtZW50KGdhbWVib2FyZCwgJ2dhbWVib2FyZCcsIGdhbWVCb2FyZFdyYXBwZXIpO1xuXG4gICAgICAgIGJ1aWxkR3JpZChnYW1lYm9hcmQsIGlzQ29tcHV0ZXIpO1xuICAgICAgICBcbiAgICAgICAgaWYgKGlzQ29tcHV0ZXIgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygndHJpZ2dlcmVkJylcbiAgICAgICAgICAgIHNldEdyaWRUcmlnZ2Vycyhib2FyZENvbnRyb2xsZXIpXG4gICAgICAgIH1cbiAgICAgICAgXG5cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBidWlsZEdyaWQoZ2FtZWJvYXJkRWxlbWVudCwgaXNDb21wdXRlcikge1xuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IDExOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgYXBwZW5kRWxlbWVudChyb3csICdyb3cnLCBnYW1lYm9hcmRFbGVtZW50KTtcblxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDE7IGogPCAxMTsgaisrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgICAgIGNlbGwuY29vcmRpbmF0ZXMgPSBbaSwgal07XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coY2VsbC5jb29yZGluYXRlcylcbiAgICAgICAgICAgICAgICBpZiAoaXNDb21wdXRlciA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICBhcHBlbmRFbGVtZW50KGNlbGwsICdjZWxsLWMnLCByb3cpO1xuICAgICAgICAgICAgICAgICAgICBjZWxsLnNldEF0dHJpYnV0ZSgnaWQnLCBgJHtpfSAke2p9Y2ApXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICBhcHBlbmRFbGVtZW50KGNlbGwsICdjZWxsJywgcm93KTtcbiAgICAgICAgICAgICAgICAgICBjZWxsLnNldEF0dHJpYnV0ZSgnaWQnLCBgJHtpfSAke2p9aGApIFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2V0R3JpZFRyaWdnZXJzKGNvbXB1dGVyQm9hcmRDb250cm9sbGVyKSB7XG4gICAgICAgIGNvbnN0IGNlbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNlbGwtYycpO1xuICAgICAgICBjb25zb2xlLmxvZyhjZWxscyk7XG4gICAgICAgIGNlbGxzLmZvckVhY2goKGNlbGwpID0+IHtcbiAgICAgICAgICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coY2VsbC5jb29yZGluYXRlcyk7XG4gICAgICAgICAgICAgICAgY29tcHV0ZXJCb2FyZENvbnRyb2xsZXIucmVjaWV2ZUF0dGFjayhjZWxsLmNvb3JkaW5hdGVzKTtcbiAgICAgICAgICAgICAgICAvLyBuZWVkIHRvIHRyaWdnZXIgcmVjaWV2ZUF0dGFjayBvbiB0aGUgY29ycmVjdFxuICAgICAgICAgICAgICAgIC8vIGdhbWUgYm9hcmQgXG4gICAgICAgICAgICAgICAgLy8gbmVlZCB0byB0cmlnZ2VyIGNvbXB1dGVyJ3MgYXR0YWNrIGluIHJlc3BvbnNlXG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgICAgICAgICAgXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXNlR3JpZFNwb3QoY29vcmRzLCBzdGF0dXMsIG5hbWUpIHtcbiAgICAgICAgLy8gcmVnaXN0ZXJzIHRoYXQgdGVoIGdyaWQgc3BvdCB3YXMgdXNlZCwgYW5kIGRpc3BsYXlzXG4gICAgICAgIC8vIGVpdGhlciBhIGhpdCBvciBtaXNzXG5cbiAgICAgICAgaWYgKG5hbWUgPT09ICdQbGF5ZXIgMicpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHN0YXR1cyk7XG4gICAgICAgICAgICBjb25zdCB1c2VkQ2VsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxuICAgICAgICAgICAgICAgIGAke2Nvb3Jkc1swXX0gJHtjb29yZHNbMV19Y2ApXG5cbiAgICAgICAgICAgIGlmIChzdGF0dXMgPT09ICdoaXQnKSB7XG4gICAgICAgICAgICAgICAgdXNlZENlbGwudGV4dENvbnRlbnQgPSAnWCdcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc3RhdHVzID09PSAnbWlzcycpIHtcbiAgICAgICAgICAgICAgICB1c2VkQ2VsbC50ZXh0Q29udGVudCA9ICcuJ1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhzdGF0dXMpO1xuICAgICAgICAgICAgY29uc3QgdXNlZENlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcbiAgICAgICAgICAgICAgICBgJHtjb29yZHNbMF19ICR7Y29vcmRzWzFdfWNgKVxuXG4gICAgICAgICAgICBpZiAoc3RhdHVzID09PSAnaGl0Jykge1xuICAgICAgICAgICAgICAgIHVzZWRDZWxsLnRleHRDb250ZW50ID0gJ1gnXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHN0YXR1cyA9PT0gJ21pc3MnKSB7XG4gICAgICAgICAgICAgICAgdXNlZENlbGwudGV4dENvbnRlbnQgPSAnLidcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZygndXNlZCB1cCB0aGUgc3BvdCcpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFwcGVuZEVsZW1lbnQoZWxlbWVudE5hbWUsIGNsYXNzTmFtZSwgZmF0aGVyRWxlbWVudCApIHtcbiAgICAgICAgZWxlbWVudE5hbWUuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xuICAgICAgICBmYXRoZXJFbGVtZW50LmFwcGVuZENoaWxkKGVsZW1lbnROYW1lKTtcblxuICAgICAgICByZXR1cm4gZWxlbWVudE5hbWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtyZW5kZXJHYW1lQm9hcmQsIGFwcGVuZEVsZW1lbnQsIGJ1aWxkR3JpZCxcbiAgICAgICAgc2V0R3JpZFRyaWdnZXJzLCB1c2VHcmlkU3BvdH1cblxufSIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIGBodG1sLCBib2R5IHtcbiAgICBtaW4taGVpZ2h0OiAxMDAlO1xuICAgIG1pbi13aWR0aDogMTAwJTtcbiAgICBtYXJnaW46IDBweDtcbn1cblxuYm9keSB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogbmF2eTtcbn1cblxuLnByb21wdC1ib3gge1xuICAgIGRpc3BsYXk6IG5vbmVcbn1cblxuLmdhbWUtY29udGFpbmVyIHtcbiAgICBkaXNwbGF5OiBncmlkO1xuICAgIGdyaWQtdGVtcGxhdGUtcm93czogMWZyIDRmciAxLjdmcjtcbiAgICBoZWlnaHQ6IDEwMHZoO1xuICAgIHdpZHRoOiAxMDB2dztcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoNTksIDU5LCA1OSk7XG59XG5cbi5oZWFkZXIge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZ3JpZC1yb3c6IDEgLyAyO1xufVxuXG4uZ2FtZWJvYXJkcyB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcbiAgICBncmlkLXJvdzogMiAvIDM7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDExNCwgMTU1LCAxNTUpO1xufVxuXG4uZGlhbG9ndWUtYm94IHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGdyaWQtcm93OiAzIC8gNDtcbn1cblxuLyogZ2FtZWJvYXJkIHdyYXBwZXIgc3R5bGluZyAqL1xuLmJvYXJkLXdyYXBwZXIge1xuICAgIGhlaWdodDogMTAwJTtcbiAgICB3aWR0aDogNDAwcHg7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogYmlzcXVlO1xufVxuXG4uYm9hcmQtdGl0bGUge1xuXG59XG5cbi5nYW1lYm9hcmQge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICBoZWlnaHQ6IDQwMHB4O1xuICAgIHdpZHRoOiA0MDBweDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBibHVldmlvbGV0O1xufVxuXG4ucm93IHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIC8qIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47ICovXG4gICAgaGVpZ2h0OiAxMCU7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcGluaztcbn1cblxuLmNlbGwge1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIG1hcmdpbjogMHB4O1xuICAgIGFzcGVjdC1yYXRpbzogMTtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjIxLCAyNDEsIDI0MSk7XG4gICAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XG59XG5cbi5jZWxsLWMge1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIG1hcmdpbjogMHB4O1xuICAgIGFzcGVjdC1yYXRpbzogMTtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjIxLCAyNDEsIDI0MSk7XG4gICAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XG59XG5cbi5jZWxsOmhvdmVyLCAuY2VsbC1jOmhvdmVyIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBhbnRpcXVld2hpdGU7XG59XG5gLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9wYWdlU3R5bGluZy5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7SUFDSSxnQkFBZ0I7SUFDaEIsZUFBZTtJQUNmLFdBQVc7QUFDZjs7QUFFQTtJQUNJLHNCQUFzQjtBQUMxQjs7QUFFQTtJQUNJO0FBQ0o7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsaUNBQWlDO0lBQ2pDLGFBQWE7SUFDYixZQUFZO0lBQ1osaUNBQWlDO0FBQ3JDOztBQUVBO0lBQ0ksYUFBYTtJQUNiLGVBQWU7QUFDbkI7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsNkJBQTZCO0lBQzdCLGVBQWU7SUFDZixvQ0FBb0M7QUFDeEM7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsZUFBZTtBQUNuQjs7QUFFQSw4QkFBOEI7QUFDOUI7SUFDSSxZQUFZO0lBQ1osWUFBWTtJQUNaLHdCQUF3QjtBQUM1Qjs7QUFFQTs7QUFFQTs7QUFFQTtJQUNJLGFBQWE7SUFDYixzQkFBc0I7SUFDdEIsYUFBYTtJQUNiLFlBQVk7SUFDWiw0QkFBNEI7QUFDaEM7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsNEJBQTRCO0lBQzVCLFdBQVc7SUFDWCxXQUFXO0lBQ1gsc0JBQXNCO0FBQzFCOztBQUVBO0lBQ0ksV0FBVztJQUNYLFdBQVc7SUFDWCxlQUFlO0lBQ2Ysb0NBQW9DO0lBQ3BDLHVCQUF1QjtBQUMzQjs7QUFFQTtJQUNJLFdBQVc7SUFDWCxXQUFXO0lBQ1gsZUFBZTtJQUNmLG9DQUFvQztJQUNwQyx1QkFBdUI7QUFDM0I7O0FBRUE7SUFDSSw4QkFBOEI7QUFDbENcIixcInNvdXJjZXNDb250ZW50XCI6W1wiaHRtbCwgYm9keSB7XFxuICAgIG1pbi1oZWlnaHQ6IDEwMCU7XFxuICAgIG1pbi13aWR0aDogMTAwJTtcXG4gICAgbWFyZ2luOiAwcHg7XFxufVxcblxcbmJvZHkge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBuYXZ5O1xcbn1cXG5cXG4ucHJvbXB0LWJveCB7XFxuICAgIGRpc3BsYXk6IG5vbmVcXG59XFxuXFxuLmdhbWUtY29udGFpbmVyIHtcXG4gICAgZGlzcGxheTogZ3JpZDtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiAxZnIgNGZyIDEuN2ZyO1xcbiAgICBoZWlnaHQ6IDEwMHZoO1xcbiAgICB3aWR0aDogMTAwdnc7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYig1OSwgNTksIDU5KTtcXG59XFxuXFxuLmhlYWRlciB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGdyaWQtcm93OiAxIC8gMjtcXG59XFxuXFxuLmdhbWVib2FyZHMge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcXG4gICAgZ3JpZC1yb3c6IDIgLyAzO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTE0LCAxNTUsIDE1NSk7XFxufVxcblxcbi5kaWFsb2d1ZS1ib3gge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBncmlkLXJvdzogMyAvIDQ7XFxufVxcblxcbi8qIGdhbWVib2FyZCB3cmFwcGVyIHN0eWxpbmcgKi9cXG4uYm9hcmQtd3JhcHBlciB7XFxuICAgIGhlaWdodDogMTAwJTtcXG4gICAgd2lkdGg6IDQwMHB4O1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBiaXNxdWU7XFxufVxcblxcbi5ib2FyZC10aXRsZSB7XFxuXFxufVxcblxcbi5nYW1lYm9hcmQge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBoZWlnaHQ6IDQwMHB4O1xcbiAgICB3aWR0aDogNDAwcHg7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IGJsdWV2aW9sZXQ7XFxufVxcblxcbi5yb3cge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICAvKiBmbGV4LWRpcmVjdGlvbjogY29sdW1uOyAqL1xcbiAgICBoZWlnaHQ6IDEwJTtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHBpbms7XFxufVxcblxcbi5jZWxsIHtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIG1hcmdpbjogMHB4O1xcbiAgICBhc3BlY3QtcmF0aW86IDE7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYigyMjEsIDI0MSwgMjQxKTtcXG4gICAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XFxufVxcblxcbi5jZWxsLWMge1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgbWFyZ2luOiAwcHg7XFxuICAgIGFzcGVjdC1yYXRpbzogMTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDIyMSwgMjQxLCAyNDEpO1xcbiAgICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcXG59XFxuXFxuLmNlbGw6aG92ZXIsIC5jZWxsLWM6aG92ZXIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBhbnRpcXVld2hpdGU7XFxufVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTtcblxuICAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTtcblxuICAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3BhZ2VTdHlsaW5nLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vcGFnZVN0eWxpbmcuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7XG5cbiAgICAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cbiAgY3NzICs9IG9iai5jc3M7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH1cblxuICAvLyBGb3Igb2xkIElFXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoKSB7fSxcbiAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge31cbiAgICB9O1xuICB9XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5uYyA9IHVuZGVmaW5lZDsiLCJpbXBvcnQgJy4vcGFnZVN0eWxpbmcuY3NzJztcbmltcG9ydCB7IGdhbWVCb2FyZENvbnRyb2xsZXIgfSBmcm9tIFwiLi9nYW1lYm9hcmRDb250cm9sbGVyXCI7XG5pbXBvcnQgeyBpbml0aWFsaXplR2FtZSB9IGZyb20gXCIuL2dhbWVMb29wXCI7XG5cblxuLy8gY29uc29sZVRlc3QuY3JlYXRlQm9hcmQoKVxuXG5jb25zb2xlLmxvZygneWVwcHAnKVxuXG5pbml0aWFsaXplR2FtZSgpIl0sIm5hbWVzIjpbIlBsYXllciIsInVzZXJQbGF5ZXIiLCJjb21wdXRlclBsYXllciIsImdhbWVCb2FyZENvbnRyb2xsZXIiLCJjcmVhdGVGbGVldCIsImNyZWF0ZU9wcEZsZWV0IiwiZG9tTWFuaXB1bGF0aW9uIiwiaW5pdGlhbGl6ZUdhbWUiLCJjcmVhdGVHYW1lIiwicnVuRE9NIiwiaHVtYW5QbGF5ZXIiLCJodW1hbkZsZWV0IiwiZ2FtZUJvYXJkIiwicGxheWVyIiwiaHVtYW5Cb2FyZCIsIkFJcGxheWVyIiwiY29tcHV0ZXJGbGVldCIsImNvbXB1dGVyQm9hcmQiLCJjcmVhdGVCb2FyZCIsInJlbmRlckdhbWVCb2FyZCIsIlNoaXAiLCJmbGVldCIsIm5hbWUiLCJwbGF5ZXJOYW1lIiwiYm9hcmQiLCJzaGlwcyIsImNvbnNvbGUiLCJsb2ciLCJpIiwiaiIsInBsYWNlSG9yaXpvbnRhbFNoaXAiLCJyb3ciLCJjb2wiLCJzaGlwIiwibGVuZ3RoIiwibmV3Q29vcmRzIiwiY29vcmRzIiwicHVzaCIsInBsYWNlVmVydGljYWxTaGlwIiwicmVjaWV2ZUF0dGFjayIsImF0dGFja1N0YXR1cyIsImNoZWNrSWZVc2VkIiwiZm9yRWFjaCIsImNvb3JkIiwiaGl0IiwidXBkYXRlQm9hcmRTcG90Iiwic3Vua0NoZWNrIiwiY2hlY2tJZlN1bmsiLCJzcGxpY2UiLCJjaGVja0FsbFN1bmsiLCJ1c2VHcmlkU3BvdCIsImNvbnN0cnVjdG9yIiwicGlja1JhbmRvbUNlbGwiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJjb2x1bW4iLCJoaXRzIiwiaXNTdW5rIiwiYm9hcmRSdW4iLCJjYXJyaWVyIiwiYmF0dGxlc2hpcCIsImRlc3Ryb3llciIsInN1Ym1hcmluZSIsInBhdHJvbEJvYXQiLCJpbml0aWFsTG9hZCIsInBsYXllckJvYXJkcyIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImJvYXJkQ29udHJvbGxlciIsImlzQ29tcHV0ZXIiLCJnYW1lQm9hcmRXcmFwcGVyIiwiY3JlYXRlRWxlbWVudCIsImFwcGVuZEVsZW1lbnQiLCJib2FyZFRpdGxlIiwidGV4dENvbnRlbnQiLCJnYW1lYm9hcmQiLCJidWlsZEdyaWQiLCJzZXRHcmlkVHJpZ2dlcnMiLCJnYW1lYm9hcmRFbGVtZW50IiwiY2VsbCIsImNvb3JkaW5hdGVzIiwic2V0QXR0cmlidXRlIiwiY29tcHV0ZXJCb2FyZENvbnRyb2xsZXIiLCJjZWxscyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJhZGRFdmVudExpc3RlbmVyIiwic3RhdHVzIiwidXNlZENlbGwiLCJnZXRFbGVtZW50QnlJZCIsImVsZW1lbnROYW1lIiwiY2xhc3NOYW1lIiwiZmF0aGVyRWxlbWVudCIsImNsYXNzTGlzdCIsImFkZCIsImFwcGVuZENoaWxkIl0sInNvdXJjZVJvb3QiOiIifQ==