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
  humanPlayer.gameBoard = (0,_gameboardController__WEBPACK_IMPORTED_MODULE_1__.gameBoardController)(humanFleet);
  const humanBoard = humanPlayer.gameBoard;
  runDOM.renderGameBoard(humanBoard.createBoard(), humanPlayer.player);
  const AIplayer = new _player__WEBPACK_IMPORTED_MODULE_0__.Player('Player 2');
  const computerFleet = (0,_ship_object__WEBPACK_IMPORTED_MODULE_2__.createOppFleet)();
  AIplayer.gameBoard = (0,_gameboardController__WEBPACK_IMPORTED_MODULE_1__.gameBoardController)(computerFleet);
  const computerBoard = AIplayer.gameBoard;
  computerBoard.createBoard();
  runDOM.renderGameBoard(computerBoard.createBoard(), AIplayer.player);

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

function gameBoardController(fleet) {
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
    updateBoardSpot(coords);
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
  function updateBoardSpot(coords) {
    board[coords[0] - 1][coords[1] - 1] = true;
    // console.log(board)
    return board;
  }
  function checkIfUsed(coords) {
    // console.log(board[coords[0] - 1][coords[1] - 1])
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
const boardRun = (0,_gameboardController__WEBPACK_IMPORTED_MODULE_0__.gameBoardController)();
function createFleet() {
  const ships = [];
  const carrier = new Ship(5);
  const battleship = new Ship(4);
  const destroyer = new Ship(3);
  const submarine = new Ship(3);
  const patrolBoat = new Ship(2);
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
  function renderGameBoard(board, playerName) {
    // console.log(board);
    const gameBoardWrapper = document.createElement('div');
    appendElement(gameBoardWrapper, 'board-wrapper', playerBoards);
    const boardTitle = document.createElement('h2');
    appendElement(boardTitle, 'board-title', gameBoardWrapper);
    boardTitle.textContent = playerName;

    // render board:
    const gameboard = document.createElement('div');
    appendElement(gameboard, 'gameboard', gameBoardWrapper);
    buildGrid(gameboard, board);
  }
  function buildGrid(gameboardElement, board) {
    for (let i = 1; i < 11; i++) {
      const row = document.createElement('div');
      appendElement(row, 'row', gameboardElement);
      for (let j = 1; j < 11; j++) {
        const cell = document.createElement('div');
        cell.coordinates = [i, j];
        console.log(cell.coordinates);
        appendElement(cell, 'cell', row);
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
    appendElement
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
    /* justify-content: flex-end; */
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

.cell:hover {
    background-color: antiquewhite;
}
`, "",{"version":3,"sources":["webpack://./src/pageStyling.css"],"names":[],"mappings":"AAAA;IACI,gBAAgB;IAChB,eAAe;IACf,WAAW;AACf;;AAEA;IACI,sBAAsB;AAC1B;;AAEA;IACI;AACJ;;AAEA;IACI,aAAa;IACb,iCAAiC;IACjC,aAAa;IACb,YAAY;IACZ,iCAAiC;AACrC;;AAEA;IACI,aAAa;IACb,eAAe;AACnB;;AAEA;IACI,aAAa;IACb,6BAA6B;IAC7B,eAAe;IACf,oCAAoC;AACxC;;AAEA;IACI,aAAa;IACb,eAAe;AACnB;;AAEA,8BAA8B;AAC9B;IACI,YAAY;IACZ,YAAY;IACZ,wBAAwB;AAC5B;;AAEA;;AAEA;;AAEA;IACI,aAAa;IACb,+BAA+B;IAC/B,sBAAsB;IACtB,aAAa;IACb,YAAY;IACZ,4BAA4B;AAChC;;AAEA;IACI,aAAa;IACb,4BAA4B;IAC5B,WAAW;IACX,WAAW;IACX,sBAAsB;AAC1B;;AAEA;IACI,WAAW;IACX,WAAW;IACX,eAAe;IACf,oCAAoC;IACpC,uBAAuB;AAC3B;;AAEA;IACI,8BAA8B;AAClC","sourcesContent":["html, body {\n    min-height: 100%;\n    min-width: 100%;\n    margin: 0px;\n}\n\nbody {\n    background-color: navy;\n}\n\n.prompt-box {\n    display: none\n}\n\n.game-container {\n    display: grid;\n    grid-template-rows: 1fr 4fr 1.7fr;\n    height: 100vh;\n    width: 100vw;\n    background-color: rgb(59, 59, 59);\n}\n\n.header {\n    display: flex;\n    grid-row: 1 / 2;\n}\n\n.gameboards {\n    display: flex;\n    justify-content: space-around;\n    grid-row: 2 / 3;\n    background-color: rgb(114, 155, 155);\n}\n\n.dialogue-box {\n    display: flex;\n    grid-row: 3 / 4;\n}\n\n/* gameboard wrapper styling */\n.board-wrapper {\n    height: 100%;\n    width: 400px;\n    background-color: bisque;\n}\n\n.board-title {\n\n}\n\n.gameboard {\n    display: flex;\n    /* justify-content: flex-end; */\n    flex-direction: column;\n    height: 400px;\n    width: 400px;\n    background-color: blueviolet;\n}\n\n.row {\n    display: flex;\n    /* flex-direction: column; */\n    height: 10%;\n    width: 100%;\n    background-color: pink;\n}\n\n.cell {\n    width: 100%;\n    margin: 0px;\n    aspect-ratio: 1;\n    background-color: rgb(221, 241, 241);\n    border: 1px solid black;\n}\n\n.cell:hover {\n    background-color: antiquewhite;\n}\n"],"sourceRoot":""}]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ2lDO0FBQ2hCOztBQUc1Qzs7QUFFQTdDLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLE9BQU8sQ0FBQztBQUVwQmxCLHlEQUFjLENBQUMsQ0FBQyxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbWFpbi10ZW1wbGF0ZS8uL3NyYy9nYW1lTG9vcC5qcyIsIndlYnBhY2s6Ly9tYWluLXRlbXBsYXRlLy4vc3JjL2dhbWVib2FyZENvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vbWFpbi10ZW1wbGF0ZS8uL3NyYy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vbWFpbi10ZW1wbGF0ZS8uL3NyYy9zaGlwLW9iamVjdC5qcyIsIndlYnBhY2s6Ly9tYWluLXRlbXBsYXRlLy4vc3JjL3VzZXJJbnRlcmZhY2UuanMiLCJ3ZWJwYWNrOi8vbWFpbi10ZW1wbGF0ZS8uL3NyYy9wYWdlU3R5bGluZy5jc3MiLCJ3ZWJwYWNrOi8vbWFpbi10ZW1wbGF0ZS8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vbWFpbi10ZW1wbGF0ZS8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL21haW4tdGVtcGxhdGUvLi9zcmMvcGFnZVN0eWxpbmcuY3NzP2E5YjciLCJ3ZWJwYWNrOi8vbWFpbi10ZW1wbGF0ZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9tYWluLXRlbXBsYXRlLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly9tYWluLXRlbXBsYXRlLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL21haW4tdGVtcGxhdGUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vbWFpbi10ZW1wbGF0ZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL21haW4tdGVtcGxhdGUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly9tYWluLXRlbXBsYXRlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL21haW4tdGVtcGxhdGUvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vbWFpbi10ZW1wbGF0ZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbWFpbi10ZW1wbGF0ZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL21haW4tdGVtcGxhdGUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9tYWluLXRlbXBsYXRlL3dlYnBhY2svcnVudGltZS9ub25jZSIsIndlYnBhY2s6Ly9tYWluLXRlbXBsYXRlLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9wcmVmZXItZGVmYXVsdC1leHBvcnQgKi9cbmltcG9ydCB7IFBsYXllciwgdXNlclBsYXllciwgY29tcHV0ZXJQbGF5ZXIgfSBmcm9tIFwiLi9wbGF5ZXJcIjtcbmltcG9ydCB7IGdhbWVCb2FyZENvbnRyb2xsZXIgfSBmcm9tIFwiLi9nYW1lYm9hcmRDb250cm9sbGVyXCI7XG5pbXBvcnQgeyBjcmVhdGVGbGVldCwgY3JlYXRlT3BwRmxlZXQgfSBmcm9tIFwiLi9zaGlwLW9iamVjdFwiO1xuaW1wb3J0IHsgZG9tTWFuaXB1bGF0aW9uIH0gZnJvbSBcIi4vdXNlckludGVyZmFjZVwiO1xuXG5leHBvcnQgY29uc3QgaW5pdGlhbGl6ZUdhbWUgPSBmdW5jdGlvbiBjcmVhdGVHYW1lKCkge1xuICAgIGNvbnN0IHJ1bkRPTSA9IGRvbU1hbmlwdWxhdGlvbigpO1xuXG4gICAgY29uc3QgaHVtYW5QbGF5ZXIgPSBuZXcgUGxheWVyKCdQbGF5ZXIgMScpXG4gICAgY29uc3QgaHVtYW5GbGVldCA9IGNyZWF0ZUZsZWV0KClcbiAgICBodW1hblBsYXllci5nYW1lQm9hcmQgPSBnYW1lQm9hcmRDb250cm9sbGVyKGh1bWFuRmxlZXQpO1xuICAgIGNvbnN0IGh1bWFuQm9hcmQgPSBodW1hblBsYXllci5nYW1lQm9hcmRcbiAgICBydW5ET00ucmVuZGVyR2FtZUJvYXJkKGh1bWFuQm9hcmQuY3JlYXRlQm9hcmQoKSwgaHVtYW5QbGF5ZXIucGxheWVyKTtcblxuXG4gICAgY29uc3QgQUlwbGF5ZXIgPSBuZXcgUGxheWVyKCdQbGF5ZXIgMicpO1xuICAgIGNvbnN0IGNvbXB1dGVyRmxlZXQgPSBjcmVhdGVPcHBGbGVldCgpO1xuICAgIEFJcGxheWVyLmdhbWVCb2FyZCA9IGdhbWVCb2FyZENvbnRyb2xsZXIoY29tcHV0ZXJGbGVldCk7XG4gICAgY29uc3QgY29tcHV0ZXJCb2FyZCA9IEFJcGxheWVyLmdhbWVCb2FyZDtcbiAgICBjb21wdXRlckJvYXJkLmNyZWF0ZUJvYXJkKCk7XG4gICAgcnVuRE9NLnJlbmRlckdhbWVCb2FyZChjb21wdXRlckJvYXJkLmNyZWF0ZUJvYXJkKCksIEFJcGxheWVyLnBsYXllcik7XG5cbiAgICAvLyBjYWxsIHJlbmRlciBkaWFsb2d1ZSBib3ggaGVyZVxufSIsIi8qIGVzbGludC1kaXNhYmxlIG5vLXVzZS1iZWZvcmUtZGVmaW5lICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1lbHNlLXJldHVybiAqL1xuLyogZXNsaW50LWRpc2FibGUgbm8tbG9vcC1mdW5jICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1wbHVzcGx1cyAqL1xuLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L3ByZWZlci1kZWZhdWx0LWV4cG9ydCAqL1xuXG4vLyBnYW1lQm9hcmQgc2hvdWxkIGNoZWNrIGlmIGEgZ2FtZSBpcyBvdmVyIGJ5IHNlZWluZyBpZiB0aGVcbi8vIGxlbmd0aCBvZiBcInNoaXBzXCIgaXMgemVybyAoY2hlY2tBbGxTdW5rKVxuXG4vLyBwbGFjaW5nIHNoaXBzIHZlcnRpY2FsbHkuLi4gcG9zc2libGUgaWRlYTogaGF2ZSBhIGNvbHVtbiBudW1iZXIgKGUuZyAzKVxuLy8gdGhhdCB5b3UgdXNlIHRvIHNlbGVjdCB0aGUgY29ycmVzcG9uZGluZyBhcnJheSBpdGVtIGluIGVhY2hcbi8vIG9mIHRoZSBhcnJheXMgdGhhdCByZXByZXNlbnRzIGEgcm93IG9uIHRoZSBib2FyZFxuaW1wb3J0IHsgU2hpcCwgY3JlYXRlRmxlZXQgfSBmcm9tIFwiLi9zaGlwLW9iamVjdFwiXG5cblxuZXhwb3J0IGZ1bmN0aW9uIGdhbWVCb2FyZENvbnRyb2xsZXIoZmxlZXQpIHtcbiAgICBjb25zdCBib2FyZCA9IFtdO1xuICAgIGNvbnN0IHNoaXBzID0gZmxlZXQ7XG5cbiAgICBjb25zb2xlLmxvZyhzaGlwcyk7XG5cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZUJvYXJkKCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICAgICAgICAgIGJvYXJkW2ldID0gW107XG5cbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGorKykge1xuICAgICAgICAgICAgICAgIGJvYXJkW2ldW2pdID0gZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyhib2FyZCk7XG4gICAgICAgIHJldHVybiBib2FyZFxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBsYWNlSG9yaXpvbnRhbFNoaXAocm93LCBjb2wsIHNoaXApIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBuZXdDb29yZHMgPSBbcm93LCBjb2wgKyBpXTtcbiAgICAgICAgICAgIC8vIHB1dCBhIGNoZWNrIGhlcmUgdG8gc2VlIGlmIHRoaXMgY29uZmxpY3RzIHdpdGhcbiAgICAgICAgICAgIC8vIGFueSBvdGhlciBzaGlwJ3MgY29vcmRzIFxuICAgICAgICAgICAgc2hpcC5jb29yZHMucHVzaChuZXdDb29yZHMpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNoaXBcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwbGFjZVZlcnRpY2FsU2hpcChyb3csIGNvbCwgc2hpcCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IG5ld0Nvb3JkcyA9IFtyb3cgKyBpLCBjb2xdO1xuICAgICAgICAgICAgLy8gcHV0IGEgY2hlY2sgaGVyZSB0byBzZWUgaWYgdGhpcyBjb25mbGljdHMgd2l0aFxuICAgICAgICAgICAgLy8gYW55IG90aGVyIHNoaXAncyBjb29yZHMgXG4gICAgICAgICAgICBzaGlwLmNvb3Jkcy5wdXNoKG5ld0Nvb3Jkcyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNoaXBcbiAgICB9XG4gICAgXG4gICAgZnVuY3Rpb24gcmVjaWV2ZUF0dGFjayhjb29yZHMpIHtcbiAgICAgICAgY29uc29sZS5sb2coY29vcmRzKVxuICAgICAgICBsZXQgYXR0YWNrU3RhdHVzID0gJ21pc3MnO1xuXG4gICAgICAgIC8vIGNoZWNrIHRvIHNlZSBpZiBjb29yZHMgaGF2ZSBhbHJlYWR5IGJlZW4gdXNlZDpcbiAgICAgICAgaWYgKGNoZWNrSWZVc2VkKGNvb3JkcykgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHJldHVybiAnZmlsbGVkIGFscmVhZHknXG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBzaGlwc1tpXS5jb29yZHMuZm9yRWFjaCgoY29vcmQpID0+IHtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAoY2hlY2tJZlVzZWQoY29vcmRzKSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ2ZpbGxlZCBhbHJlYWR5J1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChjb29yZFswXSA9PT0gY29vcmRzWzBdICYmIGNvb3JkWzFdID09PSBjb29yZHNbMV0pIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coW2Nvb3JkWzBdLCBjb29yZFsxXV0pXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdoaXQnKTtcbiAgICAgICAgICAgICAgICAgICAgYXR0YWNrU3RhdHVzID0gJ2hpdCdcbiAgICAgICAgICAgICAgICAgICAgc2hpcHNbaV0uaGl0KCk7XG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZUJvYXJkU3BvdChjb29yZHMpO1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHN1bmtDaGVjayA9IHNoaXBzW2ldLmNoZWNrSWZTdW5rKClcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN1bmtDaGVjaykge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2hpcHMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tBbGxTdW5rKClcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIHVwZGF0ZUJvYXJkU3BvdChjb29yZHMpO1xuICAgICAgICByZXR1cm4gYXR0YWNrU3RhdHVzXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2hlY2tBbGxTdW5rKCkge1xuICAgICAgICBjb25zb2xlLmxvZyhzaGlwcylcbiAgICAgICAgY29uc29sZS5sb2coYm9hcmQpXG4gICAgICAgIGlmIChzaGlwcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdwbGF5ZXIgZGVmZWF0ZWQnKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVwZGF0ZUJvYXJkU3BvdChjb29yZHMpIHtcbiAgICAgICAgYm9hcmRbY29vcmRzWzBdIC0gMV1bY29vcmRzWzFdIC0gMV0gPSB0cnVlO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhib2FyZClcbiAgICAgICAgcmV0dXJuIGJvYXJkXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2hlY2tJZlVzZWQoY29vcmRzKSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGJvYXJkW2Nvb3Jkc1swXSAtIDFdW2Nvb3Jkc1sxXSAtIDFdKVxuICAgICAgICBpZiAoYm9hcmRbY29vcmRzWzBdIC0gMV1bY29vcmRzWzFdIC0gMV0gPT09IHRydWUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdhbHJlYWR5IHVzZWQnKVxuICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgXG4gICAgfVxuXG4gICAgLy8gbGlrZWx5IHdpbGwgaGF2ZSB0byBpbXBsZW1lbnQgY2hlY2sgdG8gbWFrZSBzdXJlIGEgc2hpcCBjYW5cbiAgICAvLyBiZSBwbGFjZWQgd2l0aCBubyBvdmVybGFwXG4gICAgY29uc29sZS5sb2coJ2JvYXJkIGV4aXN0cycpO1xuXG5cbiAgICByZXR1cm4geyBjcmVhdGVCb2FyZCwgcGxhY2VIb3Jpem9udGFsU2hpcCwgcGxhY2VWZXJ0aWNhbFNoaXAsIHJlY2lldmVBdHRhY2ssXG4gICAgY2hlY2tBbGxTdW5rLCB1cGRhdGVCb2FyZFNwb3QsIGNoZWNrSWZVc2VkIH1cbn1cblxuIiwiLy8gY3JlYXRlIGJvdGggdGhlIHVzZXIgcGxheWVyIGFuZCB0aGUgY29tcHV0ZXIgcGxheWVyIGhlcmVcblxuLy8gY29tcHV0ZXIgcGxheWVyIHNob3VsZCBoYXZlIGEgcmFuZG9tIGNlbGwgcGlja2VyIGZ1bmN0aW9uXG5cbi8vIHBlcmhhcHMgZWFjaCBwbGF5ZXIgc2hvdWxkIGJlIGFzc2lnbmVkIGFuIGFycmF5IHdpdGggc3BlY2lmaWVkXG4vLyBsZW5ndGhzIGZvciBlYWNoIHNoaXAgdGhhdCBpcyBjcmVhdGVkIGZvciB0aGVtIChiYXR0bGVzaGlwLFxuLy8gY2FycmllciwgZXRjLi4uKVxuLy8gdGhpcyBhcnJ5IGNhbiBiZSBpdGVyYXRlZCB0aHJvdWdoLCBuZCBjcmVhdGUgYWxsIHRoZSBuZWNlc3Nhcnkgc2hpcHNcbmV4cG9ydCBjbGFzcyBQbGF5ZXIge1xuICAgIGNvbnN0cnVjdG9yKHBsYXllciwgZ2FtZUJvYXJkKSB7XG4gICAgICAgIHRoaXMucGxheWVyID0gcGxheWVyO1xuICAgICAgICAvLyB0aGlzLnBsYXllclNoaXBzID0gW11cbiAgICAgICAgdGhpcy5nYW1lQm9hcmQ9IG51bGxcbiAgICB9XG59XG5cblxuZXhwb3J0IGNvbnN0IHVzZXJQbGF5ZXIgPSBmdW5jdGlvbiAoKSB7XG5cbn1cblxuZXhwb3J0IGNvbnN0IGNvbXB1dGVyUGxheWVyID0gZnVuY3Rpb24gKCkge1xuXG4gICAgZnVuY3Rpb24gcGlja1JhbmRvbUNlbGwoKSB7XG4gICAgICAgIGNvbnN0IHJvdyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKSArIDFcbiAgICAgICAgY29uc3QgY29sdW1uID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApICsgMVxuICAgICAgICBjb25zb2xlLmxvZyhyb3cpXG4gICAgICAgIGNvbnNvbGUubG9nKGNvbHVtbilcbiAgICAgICAgcmV0dXJuIHsgcm93LCBjb2x1bW4gfVxuICAgICAgICAvLyBuZWVkIHRvIGltcGxlbWVudCBhIGNoZWNrZXIgYXQgc29tZSBwb2ludCB0byBlbnN1cmVcbiAgICAgICAgLy8gdGhhdCBjb21wdXRlciBjYW4ndCBwaWNrIGFscmVhZHkgdXNlZCBjZWxsc1xuICAgIH1cblxuICAgIHJldHVybiB7cGlja1JhbmRvbUNlbGx9XG59IiwiLyogZXNsaW50LWRpc2FibGUgbm8tZWxzZS1yZXR1cm4gKi9cbi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9wcmVmZXItZGVmYXVsdC1leHBvcnQgKi9cbmltcG9ydCB7IGdhbWVCb2FyZENvbnRyb2xsZXIgfSBmcm9tIFwiLi9nYW1lYm9hcmRDb250cm9sbGVyXCI7XG5cbmV4cG9ydCBjbGFzcyBTaGlwIHtcbiAgICBjb25zdHJ1Y3RvcihsZW5ndGgsIGhpdHMsIGlzU3VuaywgY29vcmRzKSB7XG4gICAgICAgIHRoaXMubGVuZ3RoID0gbGVuZ3RoO1xuICAgICAgICB0aGlzLmhpdHMgPSAwO1xuICAgICAgICB0aGlzLmlzU3VuayA9IGZhbHNlO1xuICAgICAgICB0aGlzLmNvb3JkcyA9IFtdXG4gICAgfVxuXG4gICAgaGl0KCkge1xuICAgICAgICB0aGlzLmhpdHMgKz0gMVxuICAgICAgICBjb25zb2xlLmxvZygnaGl0IGFkZGVkJylcbiAgICB9XG5cbiAgICBjaGVja0lmU3VuaygpIHtcbiAgICAgICAgaWYgKHRoaXMubGVuZ3RoID09PSB0aGlzLmhpdHMpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdTdW5rIScpXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5sZW5ndGgpO1xuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5oaXRzKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgfVxuXG59XG5cbmNvbnN0IGJvYXJkUnVuID0gZ2FtZUJvYXJkQ29udHJvbGxlcigpO1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRmxlZXQoKSB7XG4gICAgY29uc3Qgc2hpcHMgPSBbXVxuXG4gICAgY29uc3QgY2FycmllciA9IG5ldyBTaGlwKDUpO1xuICAgIGNvbnN0IGJhdHRsZXNoaXAgPSBuZXcgU2hpcCg0KTtcbiAgICBjb25zdCBkZXN0cm95ZXIgPSBuZXcgU2hpcCgzKTtcbiAgICBjb25zdCBzdWJtYXJpbmUgPSBuZXcgU2hpcCgzKTtcbiAgICBjb25zdCBwYXRyb2xCb2F0ID0gbmV3IFNoaXAoMik7XG4gXG4gICAgc2hpcHMucHVzaChjYXJyaWVyLCBiYXR0bGVzaGlwLCBkZXN0cm95ZXIsIHN1Ym1hcmluZSwgcGF0cm9sQm9hdClcblxuICAgIGJvYXJkUnVuLnBsYWNlSG9yaXpvbnRhbFNoaXAoMSwgOCwgY2Fycmllcik7XG4gICAgYm9hcmRSdW4ucGxhY2VWZXJ0aWNhbFNoaXAoNCwxLCBiYXR0bGVzaGlwKVxuICAgIGJvYXJkUnVuLnBsYWNlSG9yaXpvbnRhbFNoaXAoNywgNCwgZGVzdHJveWVyKTtcbiAgICBib2FyZFJ1bi5wbGFjZVZlcnRpY2FsU2hpcCg3LCA4LCBzdWJtYXJpbmUpO1xuICAgIGJvYXJkUnVuLnBsYWNlSG9yaXpvbnRhbFNoaXAoMiwgNixwYXRyb2xCb2F0KTtcbiAgICBjb25zb2xlLmxvZyhzaGlwcyk7XG4gICAgcmV0dXJuIHNoaXBzXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVPcHBGbGVldCgpIHtcbiAgICBjb25zdCBzaGlwcyA9IFtdXG5cbiAgICBjb25zdCBjYXJyaWVyID0gbmV3IFNoaXAoNSk7XG4gICAgY29uc3QgYmF0dGxlc2hpcCA9IG5ldyBTaGlwKDQpO1xuICAgIGNvbnN0IGRlc3Ryb3llciA9IG5ldyBTaGlwKDMpO1xuICAgIGNvbnN0IHN1Ym1hcmluZSA9IG5ldyBTaGlwKDMpO1xuICAgIGNvbnN0IHBhdHJvbEJvYXQgPSBuZXcgU2hpcCgyKTtcblxuICAgIHNoaXBzLnB1c2goY2FycmllciwgYmF0dGxlc2hpcCwgZGVzdHJveWVyLCBzdWJtYXJpbmUsIHBhdHJvbEJvYXQpO1xuXG4gICAgYm9hcmRSdW4ucGxhY2VIb3Jpem9udGFsU2hpcCgxLCAxLCBjYXJyaWVyKTtcbiAgICBib2FyZFJ1bi5wbGFjZVZlcnRpY2FsU2hpcCg0LDIsIGJhdHRsZXNoaXApXG4gICAgYm9hcmRSdW4ucGxhY2VIb3Jpem9udGFsU2hpcCg2LCA2LCBkZXN0cm95ZXIpO1xuICAgIGJvYXJkUnVuLnBsYWNlVmVydGljYWxTaGlwKDcsIDgsIHN1Ym1hcmluZSk7XG4gICAgYm9hcmRSdW4ucGxhY2VIb3Jpem9udGFsU2hpcCgzLCA3LHBhdHJvbEJvYXQpO1xuICAgIGNvbnNvbGUubG9nKHNoaXBzKTtcbiAgICByZXR1cm4gc2hpcHNcbn0iLCIvKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvcHJlZmVyLWRlZmF1bHQtZXhwb3J0ICovXG5cblxuZXhwb3J0IGNvbnN0IGluaXRpYWxMb2FkID0gZnVuY3Rpb24oKSB7XG5cbn1cblxuXG5leHBvcnQgY29uc3QgZG9tTWFuaXB1bGF0aW9uID0gZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IHBsYXllckJvYXJkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nYW1lYm9hcmRzJyk7XG5cbiAgICBmdW5jdGlvbiByZW5kZXJHYW1lQm9hcmQoYm9hcmQsIHBsYXllck5hbWUpIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coYm9hcmQpO1xuICAgICAgICBjb25zdCBnYW1lQm9hcmRXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGFwcGVuZEVsZW1lbnQoZ2FtZUJvYXJkV3JhcHBlciwgJ2JvYXJkLXdyYXBwZXInLCBwbGF5ZXJCb2FyZHMpXG4gICAgICAgXG4gICAgICAgIGNvbnN0IGJvYXJkVGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMicpO1xuICAgICAgICBhcHBlbmRFbGVtZW50KGJvYXJkVGl0bGUsICdib2FyZC10aXRsZScsIGdhbWVCb2FyZFdyYXBwZXIpO1xuICAgICAgICBib2FyZFRpdGxlLnRleHRDb250ZW50ID0gcGxheWVyTmFtZTtcblxuICAgICAgICAvLyByZW5kZXIgYm9hcmQ6XG4gICAgICAgIGNvbnN0IGdhbWVib2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBhcHBlbmRFbGVtZW50KGdhbWVib2FyZCwgJ2dhbWVib2FyZCcsIGdhbWVCb2FyZFdyYXBwZXIpO1xuXG4gICAgICAgIGJ1aWxkR3JpZChnYW1lYm9hcmQsIGJvYXJkKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBidWlsZEdyaWQoZ2FtZWJvYXJkRWxlbWVudCwgYm9hcmQpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCAxMTsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCByb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGFwcGVuZEVsZW1lbnQocm93LCAncm93JywgZ2FtZWJvYXJkRWxlbWVudCk7XG5cbiAgICAgICAgICAgIGZvciAobGV0IGogPSAxOyBqIDwgMTE7IGorKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgICAgICBjZWxsLmNvb3JkaW5hdGVzID0gW2ksIGpdO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGNlbGwuY29vcmRpbmF0ZXMpXG4gICAgICAgICAgICAgICAgYXBwZW5kRWxlbWVudChjZWxsLCAnY2VsbCcsIHJvdyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFwcGVuZEVsZW1lbnQoZWxlbWVudE5hbWUsIGNsYXNzTmFtZSwgZmF0aGVyRWxlbWVudCApIHtcbiAgICAgICAgZWxlbWVudE5hbWUuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xuICAgICAgICBmYXRoZXJFbGVtZW50LmFwcGVuZENoaWxkKGVsZW1lbnROYW1lKTtcblxuICAgICAgICByZXR1cm4gZWxlbWVudE5hbWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtyZW5kZXJHYW1lQm9hcmQsIGFwcGVuZEVsZW1lbnR9XG5cbn0iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBgaHRtbCwgYm9keSB7XG4gICAgbWluLWhlaWdodDogMTAwJTtcbiAgICBtaW4td2lkdGg6IDEwMCU7XG4gICAgbWFyZ2luOiAwcHg7XG59XG5cbmJvZHkge1xuICAgIGJhY2tncm91bmQtY29sb3I6IG5hdnk7XG59XG5cbi5wcm9tcHQtYm94IHtcbiAgICBkaXNwbGF5OiBub25lXG59XG5cbi5nYW1lLWNvbnRhaW5lciB7XG4gICAgZGlzcGxheTogZ3JpZDtcbiAgICBncmlkLXRlbXBsYXRlLXJvd3M6IDFmciA0ZnIgMS43ZnI7XG4gICAgaGVpZ2h0OiAxMDB2aDtcbiAgICB3aWR0aDogMTAwdnc7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDU5LCA1OSwgNTkpO1xufVxuXG4uaGVhZGVyIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGdyaWQtcm93OiAxIC8gMjtcbn1cblxuLmdhbWVib2FyZHMge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XG4gICAgZ3JpZC1yb3c6IDIgLyAzO1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYigxMTQsIDE1NSwgMTU1KTtcbn1cblxuLmRpYWxvZ3VlLWJveCB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBncmlkLXJvdzogMyAvIDQ7XG59XG5cbi8qIGdhbWVib2FyZCB3cmFwcGVyIHN0eWxpbmcgKi9cbi5ib2FyZC13cmFwcGVyIHtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gICAgd2lkdGg6IDQwMHB4O1xuICAgIGJhY2tncm91bmQtY29sb3I6IGJpc3F1ZTtcbn1cblxuLmJvYXJkLXRpdGxlIHtcblxufVxuXG4uZ2FtZWJvYXJkIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIC8qIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7ICovXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICBoZWlnaHQ6IDQwMHB4O1xuICAgIHdpZHRoOiA0MDBweDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBibHVldmlvbGV0O1xufVxuXG4ucm93IHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIC8qIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47ICovXG4gICAgaGVpZ2h0OiAxMCU7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcGluaztcbn1cblxuLmNlbGwge1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIG1hcmdpbjogMHB4O1xuICAgIGFzcGVjdC1yYXRpbzogMTtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjIxLCAyNDEsIDI0MSk7XG4gICAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XG59XG5cbi5jZWxsOmhvdmVyIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBhbnRpcXVld2hpdGU7XG59XG5gLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9wYWdlU3R5bGluZy5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7SUFDSSxnQkFBZ0I7SUFDaEIsZUFBZTtJQUNmLFdBQVc7QUFDZjs7QUFFQTtJQUNJLHNCQUFzQjtBQUMxQjs7QUFFQTtJQUNJO0FBQ0o7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsaUNBQWlDO0lBQ2pDLGFBQWE7SUFDYixZQUFZO0lBQ1osaUNBQWlDO0FBQ3JDOztBQUVBO0lBQ0ksYUFBYTtJQUNiLGVBQWU7QUFDbkI7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsNkJBQTZCO0lBQzdCLGVBQWU7SUFDZixvQ0FBb0M7QUFDeEM7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsZUFBZTtBQUNuQjs7QUFFQSw4QkFBOEI7QUFDOUI7SUFDSSxZQUFZO0lBQ1osWUFBWTtJQUNaLHdCQUF3QjtBQUM1Qjs7QUFFQTs7QUFFQTs7QUFFQTtJQUNJLGFBQWE7SUFDYiwrQkFBK0I7SUFDL0Isc0JBQXNCO0lBQ3RCLGFBQWE7SUFDYixZQUFZO0lBQ1osNEJBQTRCO0FBQ2hDOztBQUVBO0lBQ0ksYUFBYTtJQUNiLDRCQUE0QjtJQUM1QixXQUFXO0lBQ1gsV0FBVztJQUNYLHNCQUFzQjtBQUMxQjs7QUFFQTtJQUNJLFdBQVc7SUFDWCxXQUFXO0lBQ1gsZUFBZTtJQUNmLG9DQUFvQztJQUNwQyx1QkFBdUI7QUFDM0I7O0FBRUE7SUFDSSw4QkFBOEI7QUFDbENcIixcInNvdXJjZXNDb250ZW50XCI6W1wiaHRtbCwgYm9keSB7XFxuICAgIG1pbi1oZWlnaHQ6IDEwMCU7XFxuICAgIG1pbi13aWR0aDogMTAwJTtcXG4gICAgbWFyZ2luOiAwcHg7XFxufVxcblxcbmJvZHkge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBuYXZ5O1xcbn1cXG5cXG4ucHJvbXB0LWJveCB7XFxuICAgIGRpc3BsYXk6IG5vbmVcXG59XFxuXFxuLmdhbWUtY29udGFpbmVyIHtcXG4gICAgZGlzcGxheTogZ3JpZDtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiAxZnIgNGZyIDEuN2ZyO1xcbiAgICBoZWlnaHQ6IDEwMHZoO1xcbiAgICB3aWR0aDogMTAwdnc7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYig1OSwgNTksIDU5KTtcXG59XFxuXFxuLmhlYWRlciB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGdyaWQtcm93OiAxIC8gMjtcXG59XFxuXFxuLmdhbWVib2FyZHMge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcXG4gICAgZ3JpZC1yb3c6IDIgLyAzO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTE0LCAxNTUsIDE1NSk7XFxufVxcblxcbi5kaWFsb2d1ZS1ib3gge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBncmlkLXJvdzogMyAvIDQ7XFxufVxcblxcbi8qIGdhbWVib2FyZCB3cmFwcGVyIHN0eWxpbmcgKi9cXG4uYm9hcmQtd3JhcHBlciB7XFxuICAgIGhlaWdodDogMTAwJTtcXG4gICAgd2lkdGg6IDQwMHB4O1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBiaXNxdWU7XFxufVxcblxcbi5ib2FyZC10aXRsZSB7XFxuXFxufVxcblxcbi5nYW1lYm9hcmQge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICAvKiBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtZW5kOyAqL1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBoZWlnaHQ6IDQwMHB4O1xcbiAgICB3aWR0aDogNDAwcHg7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IGJsdWV2aW9sZXQ7XFxufVxcblxcbi5yb3cge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICAvKiBmbGV4LWRpcmVjdGlvbjogY29sdW1uOyAqL1xcbiAgICBoZWlnaHQ6IDEwJTtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHBpbms7XFxufVxcblxcbi5jZWxsIHtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIG1hcmdpbjogMHB4O1xcbiAgICBhc3BlY3QtcmF0aW86IDE7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYigyMjEsIDI0MSwgMjQxKTtcXG4gICAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XFxufVxcblxcbi5jZWxsOmhvdmVyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogYW50aXF1ZXdoaXRlO1xcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107XG5cbiAgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07XG5cbiAgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9wYWdlU3R5bGluZy5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3BhZ2VTdHlsaW5nLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiB1cGRhdGVyO1xufVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpO1xuXG4gICAgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG4gIGNzcyArPSBvYmouY3NzO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9XG5cbiAgLy8gRm9yIG9sZCBJRVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKCkge30sXG4gICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHt9XG4gICAgfTtcbiAgfVxuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubmMgPSB1bmRlZmluZWQ7IiwiaW1wb3J0ICcuL3BhZ2VTdHlsaW5nLmNzcyc7XG5pbXBvcnQgeyBnYW1lQm9hcmRDb250cm9sbGVyIH0gZnJvbSBcIi4vZ2FtZWJvYXJkQ29udHJvbGxlclwiO1xuaW1wb3J0IHsgaW5pdGlhbGl6ZUdhbWUgfSBmcm9tIFwiLi9nYW1lTG9vcFwiO1xuXG5cbi8vIGNvbnNvbGVUZXN0LmNyZWF0ZUJvYXJkKClcblxuY29uc29sZS5sb2coJ3llcHBwJylcblxuaW5pdGlhbGl6ZUdhbWUoKSJdLCJuYW1lcyI6WyJQbGF5ZXIiLCJ1c2VyUGxheWVyIiwiY29tcHV0ZXJQbGF5ZXIiLCJnYW1lQm9hcmRDb250cm9sbGVyIiwiY3JlYXRlRmxlZXQiLCJjcmVhdGVPcHBGbGVldCIsImRvbU1hbmlwdWxhdGlvbiIsImluaXRpYWxpemVHYW1lIiwiY3JlYXRlR2FtZSIsInJ1bkRPTSIsImh1bWFuUGxheWVyIiwiaHVtYW5GbGVldCIsImdhbWVCb2FyZCIsImh1bWFuQm9hcmQiLCJyZW5kZXJHYW1lQm9hcmQiLCJjcmVhdGVCb2FyZCIsInBsYXllciIsIkFJcGxheWVyIiwiY29tcHV0ZXJGbGVldCIsImNvbXB1dGVyQm9hcmQiLCJTaGlwIiwiZmxlZXQiLCJib2FyZCIsInNoaXBzIiwiY29uc29sZSIsImxvZyIsImkiLCJqIiwicGxhY2VIb3Jpem9udGFsU2hpcCIsInJvdyIsImNvbCIsInNoaXAiLCJsZW5ndGgiLCJuZXdDb29yZHMiLCJjb29yZHMiLCJwdXNoIiwicGxhY2VWZXJ0aWNhbFNoaXAiLCJyZWNpZXZlQXR0YWNrIiwiYXR0YWNrU3RhdHVzIiwiY2hlY2tJZlVzZWQiLCJmb3JFYWNoIiwiY29vcmQiLCJoaXQiLCJ1cGRhdGVCb2FyZFNwb3QiLCJzdW5rQ2hlY2siLCJjaGVja0lmU3VuayIsInNwbGljZSIsImNoZWNrQWxsU3VuayIsImNvbnN0cnVjdG9yIiwicGlja1JhbmRvbUNlbGwiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJjb2x1bW4iLCJoaXRzIiwiaXNTdW5rIiwiYm9hcmRSdW4iLCJjYXJyaWVyIiwiYmF0dGxlc2hpcCIsImRlc3Ryb3llciIsInN1Ym1hcmluZSIsInBhdHJvbEJvYXQiLCJpbml0aWFsTG9hZCIsInBsYXllckJvYXJkcyIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsInBsYXllck5hbWUiLCJnYW1lQm9hcmRXcmFwcGVyIiwiY3JlYXRlRWxlbWVudCIsImFwcGVuZEVsZW1lbnQiLCJib2FyZFRpdGxlIiwidGV4dENvbnRlbnQiLCJnYW1lYm9hcmQiLCJidWlsZEdyaWQiLCJnYW1lYm9hcmRFbGVtZW50IiwiY2VsbCIsImNvb3JkaW5hdGVzIiwiZWxlbWVudE5hbWUiLCJjbGFzc05hbWUiLCJmYXRoZXJFbGVtZW50IiwiY2xhc3NMaXN0IiwiYWRkIiwiYXBwZW5kQ2hpbGQiXSwic291cmNlUm9vdCI6IiJ9