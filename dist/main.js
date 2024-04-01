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
  humanBoard.createBoard();
  const AIplayer = new _player__WEBPACK_IMPORTED_MODULE_0__.Player('Player 2');
  const computerFleet = (0,_ship_object__WEBPACK_IMPORTED_MODULE_2__.createOppFleet)();
  AIplayer.gameBoard = (0,_gameboardController__WEBPACK_IMPORTED_MODULE_1__.gameBoardController)(computerFleet, AIplayer.player);
  const computerBoard = AIplayer.gameBoard;
  computerBoard.createBoard();
  runDOM.renderGameBoard(computerBoard.createBoard(), AIplayer.player);
  runDOM.renderGameBoard(computerBoard, humanPlayer.player, humanBoard);

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
/* harmony import */ var _gameboardController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboardController */ "./src/gameboardController.js");
// create both the user player and the computer player here

// computer player has attack coordinates generator function

class Player {
  constructor(player, gameBoard) {
    this.player = player;
    // this.playerShips = []
    this.gameBoard = null;
  }
}
const userPlayer = function () {};
const computerPlayer = function () {
  const visited = [];
  function pickRandomCell(humanBoard) {
    const row = Math.floor(Math.random() * 10) + 1;
    const column = Math.floor(Math.random() * 10) + 1;
    const compCoords = [row, column];
    const repeatBoolean = checkRepeatCell(compCoords);
    console.log(repeatBoolean);
    if (repeatBoolean === true) {
      console.log('computer picked used cell!!');
      pickRandomCell(humanBoard);
    } else if (repeatBoolean === false) {
      visited.push(compCoords);
      console.log(compCoords);
      humanBoard.recieveAttack(compCoords);
      return compCoords;
    }
  }
  function checkRepeatCell(coords) {
    const stringedCoords = JSON.stringify(coords);
    console.log(stringedCoords);
    const existsBoolean = visited.some(coord => JSON.stringify(coord) === stringedCoords);
    console.log(existsBoolean);
    return existsBoolean;
  }
  return {
    pickRandomCell,
    checkRepeatCell
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
  boardRun.placeHorizontalShip(1, 5, carrier);
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
/* harmony export */   domManipulation: () => (/* binding */ domManipulation)
/* harmony export */ });
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player */ "./src/player.js");
/* eslint-disable import/prefer-default-export */

const computerMoves = (0,_player__WEBPACK_IMPORTED_MODULE_0__.computerPlayer)();
const domManipulation = function () {
  const playerBoards = document.querySelector('.gameboards');
  function renderGameBoard(boardController, playerName, humanBoard) {
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
      setGridTriggers(boardController, humanBoard);
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
  function setGridTriggers(computerBoardController, humanBoardController) {
    const cells = document.querySelectorAll('.cell-c');
    // console.log(cells);
    cells.forEach(cell => {
      cell.addEventListener('click', () => {
        console.log(cell.coordinates);
        computerBoardController.recieveAttack(cell.coordinates);
        // need to trigger recieveAttack on the correct
        // game board 
        // need to trigger computer's attack in response
        console.log(humanBoardController);
        computerMoves.pickRandomCell(humanBoardController);
        // humanBoardController.recieveAttack(cp);
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
        usedCell.textContent = 'O';
      }
    } else {
      console.log(status);
      const usedCell = document.getElementById(`${coords[0]} ${coords[1]}h`);
      if (status === 'hit') {
        usedCell.textContent = 'X';
      } else if (status === 'miss') {
        usedCell.textContent = 'O';
      }
    }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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OztBQ0EyQjtBQUNpQztBQUNoQjs7QUFHNUM7O0FBRUF4QixPQUFPLENBQUNDLEdBQUcsQ0FBQyxPQUFPLENBQUM7QUFFcEJwQix5REFBYyxDQUFDLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL21haW4tdGVtcGxhdGUvLi9zcmMvZ2FtZUxvb3AuanMiLCJ3ZWJwYWNrOi8vbWFpbi10ZW1wbGF0ZS8uL3NyYy9nYW1lYm9hcmRDb250cm9sbGVyLmpzIiwid2VicGFjazovL21haW4tdGVtcGxhdGUvLi9zcmMvcGxheWVyLmpzIiwid2VicGFjazovL21haW4tdGVtcGxhdGUvLi9zcmMvc2hpcC1vYmplY3QuanMiLCJ3ZWJwYWNrOi8vbWFpbi10ZW1wbGF0ZS8uL3NyYy91c2VySW50ZXJmYWNlLmpzIiwid2VicGFjazovL21haW4tdGVtcGxhdGUvLi9zcmMvcGFnZVN0eWxpbmcuY3NzIiwid2VicGFjazovL21haW4tdGVtcGxhdGUvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL21haW4tdGVtcGxhdGUvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9tYWluLXRlbXBsYXRlLy4vc3JjL3BhZ2VTdHlsaW5nLmNzcz9hOWI3Iiwid2VicGFjazovL21haW4tdGVtcGxhdGUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vbWFpbi10ZW1wbGF0ZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vbWFpbi10ZW1wbGF0ZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9tYWluLXRlbXBsYXRlLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL21haW4tdGVtcGxhdGUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly9tYWluLXRlbXBsYXRlLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vbWFpbi10ZW1wbGF0ZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9tYWluLXRlbXBsYXRlL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL21haW4tdGVtcGxhdGUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL21haW4tdGVtcGxhdGUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9tYWluLXRlbXBsYXRlL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbWFpbi10ZW1wbGF0ZS93ZWJwYWNrL3J1bnRpbWUvbm9uY2UiLCJ3ZWJwYWNrOi8vbWFpbi10ZW1wbGF0ZS8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvcHJlZmVyLWRlZmF1bHQtZXhwb3J0ICovXG5pbXBvcnQgeyBQbGF5ZXIsIHVzZXJQbGF5ZXIsIGNvbXB1dGVyUGxheWVyIH0gZnJvbSBcIi4vcGxheWVyXCI7XG5pbXBvcnQgeyBnYW1lQm9hcmRDb250cm9sbGVyIH0gZnJvbSBcIi4vZ2FtZWJvYXJkQ29udHJvbGxlclwiO1xuaW1wb3J0IHsgY3JlYXRlRmxlZXQsIGNyZWF0ZU9wcEZsZWV0IH0gZnJvbSBcIi4vc2hpcC1vYmplY3RcIjtcbmltcG9ydCB7IGRvbU1hbmlwdWxhdGlvbiB9IGZyb20gXCIuL3VzZXJJbnRlcmZhY2VcIjtcblxuZXhwb3J0IGNvbnN0IGluaXRpYWxpemVHYW1lID0gZnVuY3Rpb24gY3JlYXRlR2FtZSgpIHtcbiAgICBjb25zdCBydW5ET00gPSBkb21NYW5pcHVsYXRpb24oKTtcblxuICAgIGNvbnN0IGh1bWFuUGxheWVyID0gbmV3IFBsYXllcignUGxheWVyIDEnKVxuICAgIGNvbnN0IGh1bWFuRmxlZXQgPSBjcmVhdGVGbGVldCgpXG4gICAgaHVtYW5QbGF5ZXIuZ2FtZUJvYXJkID0gZ2FtZUJvYXJkQ29udHJvbGxlcihodW1hbkZsZWV0LCBodW1hblBsYXllci5wbGF5ZXIpO1xuICAgIGNvbnN0IGh1bWFuQm9hcmQgPSBodW1hblBsYXllci5nYW1lQm9hcmRcbiAgICBodW1hbkJvYXJkLmNyZWF0ZUJvYXJkKCk7XG4gICAgXG5cblxuXG4gICAgY29uc3QgQUlwbGF5ZXIgPSBuZXcgUGxheWVyKCdQbGF5ZXIgMicpO1xuICAgIGNvbnN0IGNvbXB1dGVyRmxlZXQgPSBjcmVhdGVPcHBGbGVldCgpO1xuICAgIEFJcGxheWVyLmdhbWVCb2FyZCA9IGdhbWVCb2FyZENvbnRyb2xsZXIoY29tcHV0ZXJGbGVldCwgQUlwbGF5ZXIucGxheWVyKTtcbiAgICBjb25zdCBjb21wdXRlckJvYXJkID0gQUlwbGF5ZXIuZ2FtZUJvYXJkO1xuICAgIGNvbXB1dGVyQm9hcmQuY3JlYXRlQm9hcmQoKTtcblxuICAgIFxuICAgIHJ1bkRPTS5yZW5kZXJHYW1lQm9hcmQoY29tcHV0ZXJCb2FyZC5jcmVhdGVCb2FyZCgpLCBBSXBsYXllci5wbGF5ZXIpO1xuICAgIHJ1bkRPTS5yZW5kZXJHYW1lQm9hcmQoY29tcHV0ZXJCb2FyZCwgaHVtYW5QbGF5ZXIucGxheWVyLCBodW1hbkJvYXJkKTtcbiAgICBcblxuICAgIC8vIGNhbGwgcmVuZGVyIGRpYWxvZ3VlIGJveCBoZXJlXG59IiwiLyogZXNsaW50LWRpc2FibGUgbm8tdXNlLWJlZm9yZS1kZWZpbmUgKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLWVsc2UtcmV0dXJuICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1sb29wLWZ1bmMgKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLXBsdXNwbHVzICovXG4vKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvcHJlZmVyLWRlZmF1bHQtZXhwb3J0ICovXG5cbi8vIGdhbWVCb2FyZCBzaG91bGQgY2hlY2sgaWYgYSBnYW1lIGlzIG92ZXIgYnkgc2VlaW5nIGlmIHRoZVxuLy8gbGVuZ3RoIG9mIFwic2hpcHNcIiBpcyB6ZXJvIChjaGVja0FsbFN1bmspXG5cbi8vIHBsYWNpbmcgc2hpcHMgdmVydGljYWxseS4uLiBwb3NzaWJsZSBpZGVhOiBoYXZlIGEgY29sdW1uIG51bWJlciAoZS5nIDMpXG4vLyB0aGF0IHlvdSB1c2UgdG8gc2VsZWN0IHRoZSBjb3JyZXNwb25kaW5nIGFycmF5IGl0ZW0gaW4gZWFjaFxuLy8gb2YgdGhlIGFycmF5cyB0aGF0IHJlcHJlc2VudHMgYSByb3cgb24gdGhlIGJvYXJkXG5pbXBvcnQgeyBTaGlwLCBjcmVhdGVGbGVldCB9IGZyb20gXCIuL3NoaXAtb2JqZWN0XCJcbmltcG9ydCB7IGRvbU1hbmlwdWxhdGlvbiB9IGZyb20gXCIuL3VzZXJJbnRlcmZhY2VcIjtcblxuY29uc3QgcnVuRE9NID0gZG9tTWFuaXB1bGF0aW9uKCk7XG5cbmV4cG9ydCBmdW5jdGlvbiBnYW1lQm9hcmRDb250cm9sbGVyKGZsZWV0LCBuYW1lKSB7XG4gICAgY29uc3QgcGxheWVyTmFtZSA9IG5hbWU7XG4gICAgY29uc3QgYm9hcmQgPSBbXTtcbiAgICBjb25zdCBzaGlwcyA9IGZsZWV0O1xuXG4gICAgY29uc29sZS5sb2coc2hpcHMpO1xuXG5cbiAgICBmdW5jdGlvbiBjcmVhdGVCb2FyZCgpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgICAgICAgICBib2FyZFtpXSA9IFtdO1xuXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspIHtcbiAgICAgICAgICAgICAgICBib2FyZFtpXVtqXSA9IGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2coYm9hcmQpO1xuICAgICAgICByZXR1cm4gYm9hcmRcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwbGFjZUhvcml6b250YWxTaGlwKHJvdywgY29sLCBzaGlwKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgbmV3Q29vcmRzID0gW3JvdywgY29sICsgaV07XG4gICAgICAgICAgICAvLyBwdXQgYSBjaGVjayBoZXJlIHRvIHNlZSBpZiB0aGlzIGNvbmZsaWN0cyB3aXRoXG4gICAgICAgICAgICAvLyBhbnkgb3RoZXIgc2hpcCdzIGNvb3JkcyBcbiAgICAgICAgICAgIHNoaXAuY29vcmRzLnB1c2gobmV3Q29vcmRzKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzaGlwXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGxhY2VWZXJ0aWNhbFNoaXAocm93LCBjb2wsIHNoaXApIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBuZXdDb29yZHMgPSBbcm93ICsgaSwgY29sXTtcbiAgICAgICAgICAgIC8vIHB1dCBhIGNoZWNrIGhlcmUgdG8gc2VlIGlmIHRoaXMgY29uZmxpY3RzIHdpdGhcbiAgICAgICAgICAgIC8vIGFueSBvdGhlciBzaGlwJ3MgY29vcmRzIFxuICAgICAgICAgICAgc2hpcC5jb29yZHMucHVzaChuZXdDb29yZHMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzaGlwXG4gICAgfVxuICAgIFxuICAgIGZ1bmN0aW9uIHJlY2lldmVBdHRhY2soY29vcmRzKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGNvb3JkcylcbiAgICAgICAgbGV0IGF0dGFja1N0YXR1cyA9ICdtaXNzJztcblxuICAgICAgICAvLyBjaGVjayB0byBzZWUgaWYgY29vcmRzIGhhdmUgYWxyZWFkeSBiZWVuIHVzZWQ6XG4gICAgICAgIGlmIChjaGVja0lmVXNlZChjb29yZHMpID09PSB0cnVlKSB7XG4gICAgICAgICAgICByZXR1cm4gJ2ZpbGxlZCBhbHJlYWR5J1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgc2hpcHNbaV0uY29vcmRzLmZvckVhY2goKGNvb3JkKSA9PiB7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKGNoZWNrSWZVc2VkKGNvb3JkcykgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdmaWxsZWQgYWxyZWFkeSdcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoY29vcmRbMF0gPT09IGNvb3Jkc1swXSAmJiBjb29yZFsxXSA9PT0gY29vcmRzWzFdKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFtjb29yZFswXSwgY29vcmRbMV1dKVxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnaGl0Jyk7XG4gICAgICAgICAgICAgICAgICAgIGF0dGFja1N0YXR1cyA9ICdoaXQnXG4gICAgICAgICAgICAgICAgICAgIHNoaXBzW2ldLmhpdCgpO1xuICAgICAgICAgICAgICAgICAgICB1cGRhdGVCb2FyZFNwb3QoY29vcmRzKTtcblxuICAgICAgICAgICAgICAgICAgICBjb25zdCBzdW5rQ2hlY2sgPSBzaGlwc1tpXS5jaGVja0lmU3VuaygpXG4gICAgICAgICAgICAgICAgICAgIGlmIChzdW5rQ2hlY2spIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNoaXBzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrQWxsU3VuaygpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICB1cGRhdGVCb2FyZFNwb3QoY29vcmRzLCBhdHRhY2tTdGF0dXMpO1xuICAgICAgICByZXR1cm4gYXR0YWNrU3RhdHVzXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2hlY2tBbGxTdW5rKCkge1xuICAgICAgICBjb25zb2xlLmxvZyhzaGlwcylcbiAgICAgICAgY29uc29sZS5sb2coYm9hcmQpXG4gICAgICAgIGlmIChzaGlwcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdwbGF5ZXIgZGVmZWF0ZWQnKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVwZGF0ZUJvYXJkU3BvdChjb29yZHMsIGF0dGFja1N0YXR1cykge1xuICAgICAgICBib2FyZFtjb29yZHNbMF0gLSAxXVtjb29yZHNbMV0gLSAxXSA9IHRydWU7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGJvYXJkKVxuICAgICAgICBydW5ET00udXNlR3JpZFNwb3QoY29vcmRzLCBhdHRhY2tTdGF0dXMsIHBsYXllck5hbWUpXG4gICAgICAgIHJldHVybiBib2FyZFxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNoZWNrSWZVc2VkKGNvb3Jkcykge1xuICAgICAgICBpZiAoYm9hcmRbY29vcmRzWzBdIC0gMV1bY29vcmRzWzFdIC0gMV0gPT09IHRydWUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdhbHJlYWR5IHVzZWQnKVxuICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgXG4gICAgfVxuXG4gICAgLy8gbGlrZWx5IHdpbGwgaGF2ZSB0byBpbXBsZW1lbnQgY2hlY2sgdG8gbWFrZSBzdXJlIGEgc2hpcCBjYW5cbiAgICAvLyBiZSBwbGFjZWQgd2l0aCBubyBvdmVybGFwXG4gICAgY29uc29sZS5sb2coJ2JvYXJkIGV4aXN0cycpO1xuXG5cbiAgICByZXR1cm4geyBjcmVhdGVCb2FyZCwgcGxhY2VIb3Jpem9udGFsU2hpcCwgcGxhY2VWZXJ0aWNhbFNoaXAsIHJlY2lldmVBdHRhY2ssXG4gICAgY2hlY2tBbGxTdW5rLCB1cGRhdGVCb2FyZFNwb3QsIGNoZWNrSWZVc2VkIH1cbn1cblxuIiwiLy8gY3JlYXRlIGJvdGggdGhlIHVzZXIgcGxheWVyIGFuZCB0aGUgY29tcHV0ZXIgcGxheWVyIGhlcmVcblxuLy8gY29tcHV0ZXIgcGxheWVyIGhhcyBhdHRhY2sgY29vcmRpbmF0ZXMgZ2VuZXJhdG9yIGZ1bmN0aW9uXG5pbXBvcnQgeyBnYW1lQm9hcmRDb250cm9sbGVyIH0gZnJvbSBcIi4vZ2FtZWJvYXJkQ29udHJvbGxlclwiO1xuXG5leHBvcnQgY2xhc3MgUGxheWVyIHtcbiAgICBjb25zdHJ1Y3RvcihwbGF5ZXIsIGdhbWVCb2FyZCkge1xuICAgICAgICB0aGlzLnBsYXllciA9IHBsYXllcjtcbiAgICAgICAgLy8gdGhpcy5wbGF5ZXJTaGlwcyA9IFtdXG4gICAgICAgIHRoaXMuZ2FtZUJvYXJkPSBudWxsXG4gICAgfVxufVxuXG5cbmV4cG9ydCBjb25zdCB1c2VyUGxheWVyID0gZnVuY3Rpb24gKCkge1xuXG59XG5cbmV4cG9ydCBjb25zdCBjb21wdXRlclBsYXllciA9IGZ1bmN0aW9uICgpIHtcbiAgICBjb25zdCB2aXNpdGVkID0gW107XG5cbiAgICBmdW5jdGlvbiBwaWNrUmFuZG9tQ2VsbChodW1hbkJvYXJkKSB7XG4gICAgICAgIGNvbnN0IHJvdyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKSArIDFcbiAgICAgICAgY29uc3QgY29sdW1uID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApICsgMVxuICAgICAgICBjb25zdCBjb21wQ29vcmRzID0gW3JvdywgY29sdW1uXTtcblxuICAgICAgICBjb25zdCByZXBlYXRCb29sZWFuID0gY2hlY2tSZXBlYXRDZWxsKGNvbXBDb29yZHMpXG4gICAgICAgIGNvbnNvbGUubG9nKHJlcGVhdEJvb2xlYW4pXG4gICAgICAgIGlmIChyZXBlYXRCb29sZWFuID09PSB0cnVlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnY29tcHV0ZXIgcGlja2VkIHVzZWQgY2VsbCEhJylcbiAgICAgICAgICAgIHBpY2tSYW5kb21DZWxsKGh1bWFuQm9hcmQpO1xuICAgICAgICB9IGVsc2UgaWYgKHJlcGVhdEJvb2xlYW4gPT09IGZhbHNlKSB7XG4gICAgICAgICAgICB2aXNpdGVkLnB1c2goY29tcENvb3Jkcyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhjb21wQ29vcmRzKVxuICAgICAgICAgICAgaHVtYW5Cb2FyZC5yZWNpZXZlQXR0YWNrKGNvbXBDb29yZHMpO1xuXG4gICAgICAgICAgICByZXR1cm4gY29tcENvb3JkcyBcbiAgICAgICAgfVxuICAgICAgICBcblxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNoZWNrUmVwZWF0Q2VsbChjb29yZHMpIHtcbiAgICAgICAgY29uc3Qgc3RyaW5nZWRDb29yZHMgPSBKU09OLnN0cmluZ2lmeShjb29yZHMpO1xuICAgICAgICBjb25zb2xlLmxvZyhzdHJpbmdlZENvb3JkcylcbiAgICAgICAgY29uc3QgZXhpc3RzQm9vbGVhbiA9IHZpc2l0ZWQuc29tZSgoY29vcmQpID0+IEpTT04uc3RyaW5naWZ5KGNvb3JkKSA9PT0gc3RyaW5nZWRDb29yZHMpXG4gICAgICAgIGNvbnNvbGUubG9nKGV4aXN0c0Jvb2xlYW4pXG4gICAgICAgIHJldHVybiBleGlzdHNCb29sZWFuXG4gICAgfVxuXG4gICAgcmV0dXJuIHtwaWNrUmFuZG9tQ2VsbCwgY2hlY2tSZXBlYXRDZWxsfVxufSIsIi8qIGVzbGludC1kaXNhYmxlIG5vLWVsc2UtcmV0dXJuICovXG4vKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvcHJlZmVyLWRlZmF1bHQtZXhwb3J0ICovXG5pbXBvcnQgeyBnYW1lQm9hcmRDb250cm9sbGVyIH0gZnJvbSBcIi4vZ2FtZWJvYXJkQ29udHJvbGxlclwiO1xuXG5leHBvcnQgY2xhc3MgU2hpcCB7XG4gICAgY29uc3RydWN0b3IobGVuZ3RoLCBuYW1lLCBoaXRzLCBpc1N1bmssIGNvb3Jkcykge1xuICAgICAgICB0aGlzLmxlbmd0aCA9IGxlbmd0aDtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy5oaXRzID0gMDtcbiAgICAgICAgdGhpcy5pc1N1bmsgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5jb29yZHMgPSBbXVxuICAgIH1cblxuICAgIGhpdCgpIHtcbiAgICAgICAgdGhpcy5oaXRzICs9IDFcbiAgICAgICAgY29uc29sZS5sb2coJ2hpdCBhZGRlZCcpXG4gICAgfVxuXG4gICAgY2hlY2tJZlN1bmsoKSB7XG4gICAgICAgIGlmICh0aGlzLmxlbmd0aCA9PT0gdGhpcy5oaXRzKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnU3VuayEnKVxuICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMubGVuZ3RoKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuaGl0cyk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgIH1cblxufVxuXG5jb25zdCBib2FyZFJ1biA9IGdhbWVCb2FyZENvbnRyb2xsZXIoKTtcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUZsZWV0KCkge1xuICAgIGNvbnN0IHNoaXBzID0gW11cblxuICAgIGNvbnN0IGNhcnJpZXIgPSBuZXcgU2hpcCg1LCAnQ2FycmllcicpO1xuICAgIGNvbnN0IGJhdHRsZXNoaXAgPSBuZXcgU2hpcCg0LCAnQmF0dGxlc2hpcCcpO1xuICAgIGNvbnN0IGRlc3Ryb3llciA9IG5ldyBTaGlwKDMsICdEZXN0cm95ZXInKTtcbiAgICBjb25zdCBzdWJtYXJpbmUgPSBuZXcgU2hpcCgzLCAnU3VibWFyaW5lJyk7XG4gICAgY29uc3QgcGF0cm9sQm9hdCA9IG5ldyBTaGlwKDIsICdQYXRyb2wgQm9hdCcpO1xuIFxuICAgIHNoaXBzLnB1c2goY2FycmllciwgYmF0dGxlc2hpcCwgZGVzdHJveWVyLCBzdWJtYXJpbmUsIHBhdHJvbEJvYXQpXG5cbiAgICBib2FyZFJ1bi5wbGFjZUhvcml6b250YWxTaGlwKDEsIDUsIGNhcnJpZXIpO1xuICAgIGJvYXJkUnVuLnBsYWNlVmVydGljYWxTaGlwKDQsMSwgYmF0dGxlc2hpcClcbiAgICBib2FyZFJ1bi5wbGFjZUhvcml6b250YWxTaGlwKDcsIDQsIGRlc3Ryb3llcik7XG4gICAgYm9hcmRSdW4ucGxhY2VWZXJ0aWNhbFNoaXAoNywgOCwgc3VibWFyaW5lKTtcbiAgICBib2FyZFJ1bi5wbGFjZUhvcml6b250YWxTaGlwKDIsIDYscGF0cm9sQm9hdCk7XG4gICAgY29uc29sZS5sb2coc2hpcHMpO1xuICAgIHJldHVybiBzaGlwc1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlT3BwRmxlZXQoKSB7XG4gICAgY29uc3Qgc2hpcHMgPSBbXVxuXG4gICAgY29uc3QgY2FycmllciA9IG5ldyBTaGlwKDUpO1xuICAgIGNvbnN0IGJhdHRsZXNoaXAgPSBuZXcgU2hpcCg0KTtcbiAgICBjb25zdCBkZXN0cm95ZXIgPSBuZXcgU2hpcCgzKTtcbiAgICBjb25zdCBzdWJtYXJpbmUgPSBuZXcgU2hpcCgzKTtcbiAgICBjb25zdCBwYXRyb2xCb2F0ID0gbmV3IFNoaXAoMik7XG5cbiAgICBzaGlwcy5wdXNoKGNhcnJpZXIsIGJhdHRsZXNoaXAsIGRlc3Ryb3llciwgc3VibWFyaW5lLCBwYXRyb2xCb2F0KTtcblxuICAgIGJvYXJkUnVuLnBsYWNlSG9yaXpvbnRhbFNoaXAoMSwgMSwgY2Fycmllcik7XG4gICAgYm9hcmRSdW4ucGxhY2VWZXJ0aWNhbFNoaXAoNCwyLCBiYXR0bGVzaGlwKVxuICAgIGJvYXJkUnVuLnBsYWNlSG9yaXpvbnRhbFNoaXAoNiwgNiwgZGVzdHJveWVyKTtcbiAgICBib2FyZFJ1bi5wbGFjZVZlcnRpY2FsU2hpcCg3LCA4LCBzdWJtYXJpbmUpO1xuICAgIGJvYXJkUnVuLnBsYWNlSG9yaXpvbnRhbFNoaXAoMywgNyxwYXRyb2xCb2F0KTtcbiAgICBjb25zb2xlLmxvZyhzaGlwcyk7XG4gICAgcmV0dXJuIHNoaXBzXG59IiwiLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L3ByZWZlci1kZWZhdWx0LWV4cG9ydCAqL1xuaW1wb3J0IHsgY29tcHV0ZXJQbGF5ZXIgfSBmcm9tIFwiLi9wbGF5ZXJcIjtcblxuY29uc3QgY29tcHV0ZXJNb3ZlcyA9IGNvbXB1dGVyUGxheWVyKClcblxuXG5leHBvcnQgY29uc3QgZG9tTWFuaXB1bGF0aW9uID0gZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IHBsYXllckJvYXJkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nYW1lYm9hcmRzJyk7XG5cblxuICAgIGZ1bmN0aW9uIHJlbmRlckdhbWVCb2FyZChib2FyZENvbnRyb2xsZXIsIHBsYXllck5hbWUsIGh1bWFuQm9hcmQpIHtcbiAgICAgICAgbGV0IGlzQ29tcHV0ZXIgPSBmYWxzZTtcbiAgICAgICAgaWYgKHBsYXllck5hbWUgPT09ICdQbGF5ZXIgMicpIHtcbiAgICAgICAgICAgIGlzQ29tcHV0ZXIgPSB0cnVlXG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2coaXNDb21wdXRlcik7XG5cbiAgICAgICAgY29uc3QgZ2FtZUJvYXJkV3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBhcHBlbmRFbGVtZW50KGdhbWVCb2FyZFdyYXBwZXIsICdib2FyZC13cmFwcGVyJywgcGxheWVyQm9hcmRzKVxuICAgICAgIFxuICAgICAgICBjb25zdCBib2FyZFRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDInKTtcbiAgICAgICAgYXBwZW5kRWxlbWVudChib2FyZFRpdGxlLCAnYm9hcmQtdGl0bGUnLCBnYW1lQm9hcmRXcmFwcGVyKTtcbiAgICAgICAgYm9hcmRUaXRsZS50ZXh0Q29udGVudCA9IHBsYXllck5hbWU7XG5cbiAgICAgICAgLy8gcmVuZGVyIGJvYXJkOlxuICAgICAgICBjb25zdCBnYW1lYm9hcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgYXBwZW5kRWxlbWVudChnYW1lYm9hcmQsICdnYW1lYm9hcmQnLCBnYW1lQm9hcmRXcmFwcGVyKTtcblxuICAgICAgICBidWlsZEdyaWQoZ2FtZWJvYXJkLCBpc0NvbXB1dGVyKTtcbiAgICAgICAgXG4gICAgICAgIGlmIChpc0NvbXB1dGVyID09PSBmYWxzZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ3RyaWdnZXJlZCcpXG4gICAgICAgICAgICBzZXRHcmlkVHJpZ2dlcnMoYm9hcmRDb250cm9sbGVyLCBodW1hbkJvYXJkKTtcbiAgICAgICAgfVxuICAgICAgICBcblxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGJ1aWxkR3JpZChnYW1lYm9hcmRFbGVtZW50LCBpc0NvbXB1dGVyKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgMTE7IGkrKykge1xuICAgICAgICAgICAgY29uc3Qgcm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBhcHBlbmRFbGVtZW50KHJvdywgJ3JvdycsIGdhbWVib2FyZEVsZW1lbnQpO1xuXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMTsgaiA8IDExOyBqKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICAgICAgY2VsbC5jb29yZGluYXRlcyA9IFtpLCBqXTtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhjZWxsLmNvb3JkaW5hdGVzKVxuICAgICAgICAgICAgICAgIGlmIChpc0NvbXB1dGVyID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGFwcGVuZEVsZW1lbnQoY2VsbCwgJ2NlbGwtYycsIHJvdyk7XG4gICAgICAgICAgICAgICAgICAgIGNlbGwuc2V0QXR0cmlidXRlKCdpZCcsIGAke2l9ICR7an1jYClcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgIGFwcGVuZEVsZW1lbnQoY2VsbCwgJ2NlbGwnLCByb3cpO1xuICAgICAgICAgICAgICAgICAgIGNlbGwuc2V0QXR0cmlidXRlKCdpZCcsIGAke2l9ICR7an1oYCkgXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXRHcmlkVHJpZ2dlcnMoY29tcHV0ZXJCb2FyZENvbnRyb2xsZXIsIGh1bWFuQm9hcmRDb250cm9sbGVyKSB7XG4gICAgICAgIGNvbnN0IGNlbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNlbGwtYycpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhjZWxscyk7XG4gICAgICAgIGNlbGxzLmZvckVhY2goKGNlbGwpID0+IHtcbiAgICAgICAgICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coY2VsbC5jb29yZGluYXRlcyk7XG4gICAgICAgICAgICAgICAgY29tcHV0ZXJCb2FyZENvbnRyb2xsZXIucmVjaWV2ZUF0dGFjayhjZWxsLmNvb3JkaW5hdGVzKTtcbiAgICAgICAgICAgICAgICAvLyBuZWVkIHRvIHRyaWdnZXIgcmVjaWV2ZUF0dGFjayBvbiB0aGUgY29ycmVjdFxuICAgICAgICAgICAgICAgIC8vIGdhbWUgYm9hcmQgXG4gICAgICAgICAgICAgICAgLy8gbmVlZCB0byB0cmlnZ2VyIGNvbXB1dGVyJ3MgYXR0YWNrIGluIHJlc3BvbnNlXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coaHVtYW5Cb2FyZENvbnRyb2xsZXIpO1xuICAgICAgICAgICAgICAgIGNvbXB1dGVyTW92ZXMucGlja1JhbmRvbUNlbGwoaHVtYW5Cb2FyZENvbnRyb2xsZXIpO1xuICAgICAgICAgICAgICAgIC8vIGh1bWFuQm9hcmRDb250cm9sbGVyLnJlY2lldmVBdHRhY2soY3ApO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICAgICAgICAgIFxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVzZUdyaWRTcG90KGNvb3Jkcywgc3RhdHVzLCBuYW1lKSB7XG4gICAgICAgIC8vIHJlZ2lzdGVycyB0aGF0IHRlaCBncmlkIHNwb3Qgd2FzIHVzZWQsIGFuZCBkaXNwbGF5c1xuICAgICAgICAvLyBlaXRoZXIgYSBoaXQgb3IgbWlzc1xuXG4gICAgICAgIGlmIChuYW1lID09PSAnUGxheWVyIDInKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhzdGF0dXMpO1xuICAgICAgICAgICAgY29uc3QgdXNlZENlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcbiAgICAgICAgICAgICAgICBgJHtjb29yZHNbMF19ICR7Y29vcmRzWzFdfWNgKVxuXG4gICAgICAgICAgICBpZiAoc3RhdHVzID09PSAnaGl0Jykge1xuICAgICAgICAgICAgICAgIHVzZWRDZWxsLnRleHRDb250ZW50ID0gJ1gnXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHN0YXR1cyA9PT0gJ21pc3MnKSB7XG4gICAgICAgICAgICAgICAgdXNlZENlbGwudGV4dENvbnRlbnQgPSAnTydcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2coc3RhdHVzKTtcbiAgICAgICAgICAgIGNvbnN0IHVzZWRDZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXG4gICAgICAgICAgICAgICAgYCR7Y29vcmRzWzBdfSAke2Nvb3Jkc1sxXX1oYClcblxuICAgICAgICAgICAgaWYgKHN0YXR1cyA9PT0gJ2hpdCcpIHtcbiAgICAgICAgICAgICAgICB1c2VkQ2VsbC50ZXh0Q29udGVudCA9ICdYJ1xuICAgICAgICAgICAgfSBlbHNlIGlmIChzdGF0dXMgPT09ICdtaXNzJykge1xuICAgICAgICAgICAgICAgIHVzZWRDZWxsLnRleHRDb250ZW50ID0gJ08nXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhcHBlbmRFbGVtZW50KGVsZW1lbnROYW1lLCBjbGFzc05hbWUsIGZhdGhlckVsZW1lbnQgKSB7XG4gICAgICAgIGVsZW1lbnROYW1lLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcbiAgICAgICAgZmF0aGVyRWxlbWVudC5hcHBlbmRDaGlsZChlbGVtZW50TmFtZSk7XG5cbiAgICAgICAgcmV0dXJuIGVsZW1lbnROYW1lO1xuICAgIH1cblxuICAgIHJldHVybiB7cmVuZGVyR2FtZUJvYXJkLCBhcHBlbmRFbGVtZW50LCBidWlsZEdyaWQsXG4gICAgICAgIHNldEdyaWRUcmlnZ2VycywgdXNlR3JpZFNwb3R9XG5cbn0iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBgaHRtbCwgYm9keSB7XG4gICAgbWluLWhlaWdodDogMTAwJTtcbiAgICBtaW4td2lkdGg6IDEwMCU7XG4gICAgbWFyZ2luOiAwcHg7XG59XG5cbmJvZHkge1xuICAgIGJhY2tncm91bmQtY29sb3I6IG5hdnk7XG59XG5cbi5wcm9tcHQtYm94IHtcbiAgICBkaXNwbGF5OiBub25lXG59XG5cbi5nYW1lLWNvbnRhaW5lciB7XG4gICAgZGlzcGxheTogZ3JpZDtcbiAgICBncmlkLXRlbXBsYXRlLXJvd3M6IDFmciA0ZnIgMS43ZnI7XG4gICAgaGVpZ2h0OiAxMDB2aDtcbiAgICB3aWR0aDogMTAwdnc7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDU5LCA1OSwgNTkpO1xufVxuXG4uaGVhZGVyIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGdyaWQtcm93OiAxIC8gMjtcbn1cblxuLmdhbWVib2FyZHMge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XG4gICAgZ3JpZC1yb3c6IDIgLyAzO1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYigxMTQsIDE1NSwgMTU1KTtcbn1cblxuLmRpYWxvZ3VlLWJveCB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBncmlkLXJvdzogMyAvIDQ7XG59XG5cbi8qIGdhbWVib2FyZCB3cmFwcGVyIHN0eWxpbmcgKi9cbi5ib2FyZC13cmFwcGVyIHtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gICAgd2lkdGg6IDQwMHB4O1xuICAgIGJhY2tncm91bmQtY29sb3I6IGJpc3F1ZTtcbn1cblxuLmJvYXJkLXRpdGxlIHtcblxufVxuXG4uZ2FtZWJvYXJkIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgaGVpZ2h0OiA0MDBweDtcbiAgICB3aWR0aDogNDAwcHg7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogYmx1ZXZpb2xldDtcbn1cblxuLnJvdyB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICAvKiBmbGV4LWRpcmVjdGlvbjogY29sdW1uOyAqL1xuICAgIGhlaWdodDogMTAlO1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGJhY2tncm91bmQtY29sb3I6IHBpbms7XG59XG5cbi5jZWxsIHtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBtYXJnaW46IDBweDtcbiAgICBhc3BlY3QtcmF0aW86IDE7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDIyMSwgMjQxLCAyNDEpO1xuICAgIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xufVxuXG4uY2VsbC1jIHtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBtYXJnaW46IDBweDtcbiAgICBhc3BlY3QtcmF0aW86IDE7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDIyMSwgMjQxLCAyNDEpO1xuICAgIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xufVxuXG4uY2VsbDpob3ZlciwgLmNlbGwtYzpob3ZlciB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogYW50aXF1ZXdoaXRlO1xufVxuYCwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvcGFnZVN0eWxpbmcuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0lBQ0ksZ0JBQWdCO0lBQ2hCLGVBQWU7SUFDZixXQUFXO0FBQ2Y7O0FBRUE7SUFDSSxzQkFBc0I7QUFDMUI7O0FBRUE7SUFDSTtBQUNKOztBQUVBO0lBQ0ksYUFBYTtJQUNiLGlDQUFpQztJQUNqQyxhQUFhO0lBQ2IsWUFBWTtJQUNaLGlDQUFpQztBQUNyQzs7QUFFQTtJQUNJLGFBQWE7SUFDYixlQUFlO0FBQ25COztBQUVBO0lBQ0ksYUFBYTtJQUNiLDZCQUE2QjtJQUM3QixlQUFlO0lBQ2Ysb0NBQW9DO0FBQ3hDOztBQUVBO0lBQ0ksYUFBYTtJQUNiLGVBQWU7QUFDbkI7O0FBRUEsOEJBQThCO0FBQzlCO0lBQ0ksWUFBWTtJQUNaLFlBQVk7SUFDWix3QkFBd0I7QUFDNUI7O0FBRUE7O0FBRUE7O0FBRUE7SUFDSSxhQUFhO0lBQ2Isc0JBQXNCO0lBQ3RCLGFBQWE7SUFDYixZQUFZO0lBQ1osNEJBQTRCO0FBQ2hDOztBQUVBO0lBQ0ksYUFBYTtJQUNiLDRCQUE0QjtJQUM1QixXQUFXO0lBQ1gsV0FBVztJQUNYLHNCQUFzQjtBQUMxQjs7QUFFQTtJQUNJLFdBQVc7SUFDWCxXQUFXO0lBQ1gsZUFBZTtJQUNmLG9DQUFvQztJQUNwQyx1QkFBdUI7QUFDM0I7O0FBRUE7SUFDSSxXQUFXO0lBQ1gsV0FBVztJQUNYLGVBQWU7SUFDZixvQ0FBb0M7SUFDcEMsdUJBQXVCO0FBQzNCOztBQUVBO0lBQ0ksOEJBQThCO0FBQ2xDXCIsXCJzb3VyY2VzQ29udGVudFwiOltcImh0bWwsIGJvZHkge1xcbiAgICBtaW4taGVpZ2h0OiAxMDAlO1xcbiAgICBtaW4td2lkdGg6IDEwMCU7XFxuICAgIG1hcmdpbjogMHB4O1xcbn1cXG5cXG5ib2R5IHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogbmF2eTtcXG59XFxuXFxuLnByb21wdC1ib3gge1xcbiAgICBkaXNwbGF5OiBub25lXFxufVxcblxcbi5nYW1lLWNvbnRhaW5lciB7XFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxuICAgIGdyaWQtdGVtcGxhdGUtcm93czogMWZyIDRmciAxLjdmcjtcXG4gICAgaGVpZ2h0OiAxMDB2aDtcXG4gICAgd2lkdGg6IDEwMHZ3O1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoNTksIDU5LCA1OSk7XFxufVxcblxcbi5oZWFkZXIge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBncmlkLXJvdzogMSAvIDI7XFxufVxcblxcbi5nYW1lYm9hcmRzIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XFxuICAgIGdyaWQtcm93OiAyIC8gMztcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDExNCwgMTU1LCAxNTUpO1xcbn1cXG5cXG4uZGlhbG9ndWUtYm94IHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZ3JpZC1yb3c6IDMgLyA0O1xcbn1cXG5cXG4vKiBnYW1lYm9hcmQgd3JhcHBlciBzdHlsaW5nICovXFxuLmJvYXJkLXdyYXBwZXIge1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxuICAgIHdpZHRoOiA0MDBweDtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogYmlzcXVlO1xcbn1cXG5cXG4uYm9hcmQtdGl0bGUge1xcblxcbn1cXG5cXG4uZ2FtZWJvYXJkIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgaGVpZ2h0OiA0MDBweDtcXG4gICAgd2lkdGg6IDQwMHB4O1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBibHVldmlvbGV0O1xcbn1cXG5cXG4ucm93IHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgLyogZmxleC1kaXJlY3Rpb246IGNvbHVtbjsgKi9cXG4gICAgaGVpZ2h0OiAxMCU7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBwaW5rO1xcbn1cXG5cXG4uY2VsbCB7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBtYXJnaW46IDBweDtcXG4gICAgYXNwZWN0LXJhdGlvOiAxO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjIxLCAyNDEsIDI0MSk7XFxuICAgIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xcbn1cXG5cXG4uY2VsbC1jIHtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIG1hcmdpbjogMHB4O1xcbiAgICBhc3BlY3QtcmF0aW86IDE7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYigyMjEsIDI0MSwgMjQxKTtcXG4gICAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XFxufVxcblxcbi5jZWxsOmhvdmVyLCAuY2VsbC1jOmhvdmVyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogYW50aXF1ZXdoaXRlO1xcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107XG5cbiAgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07XG5cbiAgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9wYWdlU3R5bGluZy5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3BhZ2VTdHlsaW5nLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiB1cGRhdGVyO1xufVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpO1xuXG4gICAgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG4gIGNzcyArPSBvYmouY3NzO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9XG5cbiAgLy8gRm9yIG9sZCBJRVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKCkge30sXG4gICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHt9XG4gICAgfTtcbiAgfVxuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubmMgPSB1bmRlZmluZWQ7IiwiaW1wb3J0ICcuL3BhZ2VTdHlsaW5nLmNzcyc7XG5pbXBvcnQgeyBnYW1lQm9hcmRDb250cm9sbGVyIH0gZnJvbSBcIi4vZ2FtZWJvYXJkQ29udHJvbGxlclwiO1xuaW1wb3J0IHsgaW5pdGlhbGl6ZUdhbWUgfSBmcm9tIFwiLi9nYW1lTG9vcFwiO1xuXG5cbi8vIGNvbnNvbGVUZXN0LmNyZWF0ZUJvYXJkKClcblxuY29uc29sZS5sb2coJ3llcHBwJylcblxuaW5pdGlhbGl6ZUdhbWUoKSJdLCJuYW1lcyI6WyJQbGF5ZXIiLCJ1c2VyUGxheWVyIiwiY29tcHV0ZXJQbGF5ZXIiLCJnYW1lQm9hcmRDb250cm9sbGVyIiwiY3JlYXRlRmxlZXQiLCJjcmVhdGVPcHBGbGVldCIsImRvbU1hbmlwdWxhdGlvbiIsImluaXRpYWxpemVHYW1lIiwiY3JlYXRlR2FtZSIsInJ1bkRPTSIsImh1bWFuUGxheWVyIiwiaHVtYW5GbGVldCIsImdhbWVCb2FyZCIsInBsYXllciIsImh1bWFuQm9hcmQiLCJjcmVhdGVCb2FyZCIsIkFJcGxheWVyIiwiY29tcHV0ZXJGbGVldCIsImNvbXB1dGVyQm9hcmQiLCJyZW5kZXJHYW1lQm9hcmQiLCJTaGlwIiwiZmxlZXQiLCJuYW1lIiwicGxheWVyTmFtZSIsImJvYXJkIiwic2hpcHMiLCJjb25zb2xlIiwibG9nIiwiaSIsImoiLCJwbGFjZUhvcml6b250YWxTaGlwIiwicm93IiwiY29sIiwic2hpcCIsImxlbmd0aCIsIm5ld0Nvb3JkcyIsImNvb3JkcyIsInB1c2giLCJwbGFjZVZlcnRpY2FsU2hpcCIsInJlY2lldmVBdHRhY2siLCJhdHRhY2tTdGF0dXMiLCJjaGVja0lmVXNlZCIsImZvckVhY2giLCJjb29yZCIsImhpdCIsInVwZGF0ZUJvYXJkU3BvdCIsInN1bmtDaGVjayIsImNoZWNrSWZTdW5rIiwic3BsaWNlIiwiY2hlY2tBbGxTdW5rIiwidXNlR3JpZFNwb3QiLCJjb25zdHJ1Y3RvciIsInZpc2l0ZWQiLCJwaWNrUmFuZG9tQ2VsbCIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsImNvbHVtbiIsImNvbXBDb29yZHMiLCJyZXBlYXRCb29sZWFuIiwiY2hlY2tSZXBlYXRDZWxsIiwic3RyaW5nZWRDb29yZHMiLCJKU09OIiwic3RyaW5naWZ5IiwiZXhpc3RzQm9vbGVhbiIsInNvbWUiLCJoaXRzIiwiaXNTdW5rIiwiYm9hcmRSdW4iLCJjYXJyaWVyIiwiYmF0dGxlc2hpcCIsImRlc3Ryb3llciIsInN1Ym1hcmluZSIsInBhdHJvbEJvYXQiLCJjb21wdXRlck1vdmVzIiwicGxheWVyQm9hcmRzIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiYm9hcmRDb250cm9sbGVyIiwiaXNDb21wdXRlciIsImdhbWVCb2FyZFdyYXBwZXIiLCJjcmVhdGVFbGVtZW50IiwiYXBwZW5kRWxlbWVudCIsImJvYXJkVGl0bGUiLCJ0ZXh0Q29udGVudCIsImdhbWVib2FyZCIsImJ1aWxkR3JpZCIsInNldEdyaWRUcmlnZ2VycyIsImdhbWVib2FyZEVsZW1lbnQiLCJjZWxsIiwiY29vcmRpbmF0ZXMiLCJzZXRBdHRyaWJ1dGUiLCJjb21wdXRlckJvYXJkQ29udHJvbGxlciIsImh1bWFuQm9hcmRDb250cm9sbGVyIiwiY2VsbHMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiYWRkRXZlbnRMaXN0ZW5lciIsInN0YXR1cyIsInVzZWRDZWxsIiwiZ2V0RWxlbWVudEJ5SWQiLCJlbGVtZW50TmFtZSIsImNsYXNzTmFtZSIsImZhdGhlckVsZW1lbnQiLCJjbGFzc0xpc3QiLCJhZGQiLCJhcHBlbmRDaGlsZCJdLCJzb3VyY2VSb290IjoiIn0=