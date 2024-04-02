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
/* harmony export */   initializeGame: () => (/* binding */ initializeGame),
/* harmony export */   resetInterface: () => (/* binding */ resetInterface)
/* harmony export */ });
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player */ "./src/player.js");
/* harmony import */ var _gameboardController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gameboardController */ "./src/gameboardController.js");
/* harmony import */ var _ship_object__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ship-object */ "./src/ship-object.js");
/* harmony import */ var _userInterface__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./userInterface */ "./src/userInterface.js");
/* harmony import */ var _shipPlacement__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./shipPlacement */ "./src/shipPlacement.js");
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
  runDOM.renderDialogueBox();

  // call shipPlacement function here for humanBoard
  const humanPlacement = (0,_shipPlacement__WEBPACK_IMPORTED_MODULE_4__.humanShipPlacement)();
};
const resetInterface = function (bodyE, endBox) {
  console.log('reseting all this shit');
  const playerBoards = document.querySelector('.gameboards');
  const dialogueContainer = document.querySelector('.dialogue-container');
  const gameBoardWrappers = document.querySelectorAll('.board-wrapper');
  const dialogueBox = document.querySelector('.dialogue-box');
  // console.log(playerBoards, dialogueContainer, gameBoardWrappers, dialogueBox)
  console.log(bodyE, endBox);
  gameBoardWrappers.forEach(element => {
    playerBoards.removeChild(element);
  });
  dialogueContainer.removeChild(dialogueBox);
  bodyE.removeChild(endBox);
  initializeGame();
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
const dialogueRefresh = (0,_userInterface__WEBPACK_IMPORTED_MODULE_1__.dialogueController)();
function gameBoardController(fleet, name) {
  const playerName = name;
  const board = [];
  const ships = fleet;

  // console.log(ships);

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
          console.log('hit');
          attackStatus = 'hit';
          console.log(attackStatus);
          ships[i].hit();
          updateBoardSpot(coords);
          dialogueRefresh.moveResult(attackStatus, playerName, coords, ships[i]);
          const sunkCheck = ships[i].checkIfSunk();
          if (sunkCheck) {
            dialogueRefresh.sunkShipMessage(ships[i], playerName);
            ships.splice(i, 1);
            checkAllSunk();
          }
          return false;
        }
      });
    }
    updateBoardSpot(coords, attackStatus);
    if (attackStatus === 'miss') {
      dialogueRefresh.moveResult(attackStatus, playerName, coords);
    }
    return attackStatus;
  }
  function checkAllSunk() {
    console.log(ships);
    // console.log(board)
    if (ships.length === 0) {
      dialogueRefresh.endGameMessage(playerName);
      endGame();
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
      // console.log('already used')
      return true;
    }
    return false;
  }
  function endGame() {
    // want to disable both gameBoards
    // want to make the restart button appear
    console.log('ending game');
    runDOM.freezeGrid();
    runDOM.renderEndGame();
  }
  // likely will have to implement check to make sure a ship can
  // be placed with no overlap

  return {
    createBoard,
    placeHorizontalShip,
    placeVerticalShip,
    recieveAttack,
    checkAllSunk,
    updateBoardSpot,
    checkIfUsed,
    endGame
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
  const carrier = new Ship(5, 'Carrier');
  const battleship = new Ship(4, 'Battleship');
  const destroyer = new Ship(3, 'Destroyer');
  const submarine = new Ship(3, 'Submarine');
  const patrolBoat = new Ship(2, 'Patrol Boat');
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

/***/ "./src/shipPlacement.js":
/*!******************************!*\
  !*** ./src/shipPlacement.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   computerPlacement: () => (/* binding */ computerPlacement),
/* harmony export */   humanShipPlacement: () => (/* binding */ humanShipPlacement)
/* harmony export */ });
/* eslint-disable import/prefer-default-export */

// this will house the function that checks to see if ALL coords
// are staying in bounds of the gameBoard

// have to add buttons to UI to switch betwen horizontal and vertical
// have to make a start button that user can press when all 
// ships are placed

const humanShipPlacement = function () {
  // this will be either horizontal or vertical
  const currentPlane = 'horizontal';
  const humanCells = document.querySelectorAll('.cell');
  console.log(currentPlane);
};
const computerPlacement = function () {};
function switchPlane(currentPlane) {
  if (currentPlane === 'horizontal') {
    currentPlane = 'vertical';
  } else if (currentPlane === 'vertical') {
    currentPlane = 'horizontal';
  }
  return currentPlane;
}
;

/***/ }),

/***/ "./src/userInterface.js":
/*!******************************!*\
  !*** ./src/userInterface.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   dialogueController: () => (/* binding */ dialogueController),
/* harmony export */   domManipulation: () => (/* binding */ domManipulation)
/* harmony export */ });
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player */ "./src/player.js");
/* harmony import */ var _gameLoop__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gameLoop */ "./src/gameLoop.js");
/* eslint-disable import/prefer-default-export */


const domManipulation = function () {
  const computerMoves = (0,_player__WEBPACK_IMPORTED_MODULE_0__.computerPlayer)();
  const playerBoards = document.querySelector('.gameboards');
  const dialogueContainer = document.querySelector('.dialogue-container');
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
    cells.forEach(cell => {
      cell.addEventListener('click', () => {
        console.log(cell.coordinates);
        computerBoardController.recieveAttack(cell.coordinates);

        // trigger computer's attack in response
        console.log(humanBoardController);
        computerMoves.pickRandomCell(humanBoardController);
      });
    });
  }
  function useGridSpot(coords, status, name) {
    // registers that teh grid spot was used, and displays
    // either a hit or miss

    if (name === 'Player 2') {
      // console.log(status);
      const usedCell = document.getElementById(`${coords[0]} ${coords[1]}c`);
      if (status === 'hit') {
        usedCell.textContent = 'X';
      } else if (status === 'miss') {
        usedCell.textContent = 'O';
      }
    } else {
      // console.log(status);
      const usedCell = document.getElementById(`${coords[0]} ${coords[1]}h`);
      if (status === 'hit') {
        usedCell.textContent = 'X';
      } else if (status === 'miss') {
        usedCell.textContent = 'O';
      }
    }
  }
  function freezeGrid() {
    const gameboard = document.querySelector('.gameboard');
    gameboard.style.pointerEvents = 'none';
  }
  function renderDialogueBox() {
    const dialogueBox = document.createElement('div');
    appendElement(dialogueBox, 'dialogue-box', dialogueContainer);
    const textBox1 = document.createElement('div');
    appendElement(textBox1, 'text-box1', dialogueBox);
    const textBox2 = document.createElement('div');
    appendElement(textBox2, 'text-box2', dialogueBox);
    const textBox3 = document.createElement('div');
    appendElement(textBox3, 'text-box3', dialogueBox);
  }
  function renderEndGame() {
    const bodyElement = document.body;
    const endGameBox = document.createElement('div');
    appendElement(endGameBox, 'end-game-box', bodyElement);
    const endGameIcon = document.createElement('div');
    appendElement(endGameIcon, 'end-game-icon', endGameBox);
    const resetGameButton = document.createElement('button');
    appendElement(resetGameButton, 'reset-game-button', endGameBox);
    resetGameButton.addEventListener('click', () => {
      (0,_gameLoop__WEBPACK_IMPORTED_MODULE_1__.resetInterface)(bodyElement, endGameBox);
    });
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
    useGridSpot,
    freezeGrid,
    renderDialogueBox,
    renderEndGame
  };
};
const dialogueController = function () {
  function placeShipsMessage() {}
  function moveResult(status, playerName, coords) {
    let ship = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    // need attackStatus, ship name, coordinates
    const textBox1 = document.querySelector('.text-box1');
    const textBox2 = document.querySelector('.text-box2');
    console.log('dialogue recorded');
    if (playerName !== 'Player 2') {
      if (status === 'hit') {
        textBox2.textContent = `The enemy has hit your ${ship.name}
                at row: ${coords[0]} column: ${coords[1]}!`;
      } else if (status === 'miss') {
        textBox2.textContent = `The enemy attacked row:
                ${coords[0]} column: ${coords[1]} and missed!`;
      }
    } else if (playerName === 'Player 2') {
      if (status === 'hit') {
        textBox1.textContent = `You hit the enemy's ${ship.name}
                at row: ${coords[0]} column: ${coords[1]}!`;
      } else if (status === 'miss') {
        textBox1.textContent = `You attacked row:
                ${coords[0]} column: ${coords[1]} and missed!`;
      }
    }
  }
  function sunkShipMessage(ship, name) {
    const textBox1 = document.querySelector('.text-box1');
    const textBox2 = document.querySelector('.text-box2');
    console.log(ship, name);
    if (name !== 'Player 2') {
      textBox2.textContent = `Your ${ship.name} has been sunk!!`;
    } else if (name === 'Player 2') {
      textBox1.textContent = `You sunk the enemy's ${ship.name}!!`;
    }
  }
  function endGameMessage(name) {
    const textBox3 = document.querySelector('.text-box3');
    // maybe put trigger here to make a 'restart game'
    // button to pop up
    if (name === 'Player 2') {
      textBox3.textContent = 'The enemy fleet has been sank. Excellent work Soldier!';
    } else {
      textBox3.textContent = 'We have lost our fleet and been defeated. Abort the mission!';
    }
  }
  return {
    placeShipsMessage,
    moveResult,
    sunkShipMessage,
    endGameMessage
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
    position: relative;
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

.dialogue-container {
    display: flex;
    justify-content: center;
    align-items: center;
    grid-row: 3 / 4;
}

.dialogue-box {
    height: 20vh;
    width: 50vw;
    background-color: rgb(77, 134, 77);
}


/* gameboard wrapper styling */
.board-wrapper {
    height: 100%;
    width: 400px;
    background-color: bisque;
    padding: 0 15px;
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


/* styling for dialogue box */
.dialogue-container {
    display: flex;
    justify-content: center;
    align-items: center;
    grid-row: 3 / 4;
}

.dialogue-box {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    height: 20vh;
    width: 45vw;
    background-color: rgb(77, 134, 77);
}

.text-box1 {
    height: 4vh;
    width: 40vw;
    background-color: lightblue;
}

.text-box2 {
    height: 4vh;
    width: 40vw;
    background-color: lightblue;
}

.text-box3 {
    height: 4vh;
    width: 40vw;
    background-color: lightblue;
}


/* styling for reset game */
.end-game-box {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 245px;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    width: 220px;
    height: 220px;
    background-color: azure;
}

.reset-game-button {
    height: 50px;
    width: 50px;
    background-color: rgb(144, 58, 58);
}`, "",{"version":3,"sources":["webpack://./src/pageStyling.css"],"names":[],"mappings":"AAAA;IACI,gBAAgB;IAChB,eAAe;IACf,WAAW;AACf;;AAEA;IACI,sBAAsB;IACtB,kBAAkB;AACtB;;AAEA;IACI;AACJ;;AAEA;IACI,aAAa;IACb,iCAAiC;IACjC,aAAa;IACb,YAAY;IACZ,iCAAiC;AACrC;;AAEA;IACI,aAAa;IACb,eAAe;AACnB;;AAEA;IACI,aAAa;IACb,6BAA6B;IAC7B,eAAe;IACf,oCAAoC;AACxC;;AAEA;IACI,aAAa;IACb,uBAAuB;IACvB,mBAAmB;IACnB,eAAe;AACnB;;AAEA;IACI,YAAY;IACZ,WAAW;IACX,kCAAkC;AACtC;;;AAGA,8BAA8B;AAC9B;IACI,YAAY;IACZ,YAAY;IACZ,wBAAwB;IACxB,eAAe;AACnB;;AAEA;;AAEA;;AAEA;IACI,aAAa;IACb,sBAAsB;IACtB,aAAa;IACb,YAAY;IACZ,4BAA4B;AAChC;;AAEA;IACI,aAAa;IACb,4BAA4B;IAC5B,WAAW;IACX,WAAW;IACX,sBAAsB;AAC1B;;AAEA;IACI,WAAW;IACX,WAAW;IACX,eAAe;IACf,oCAAoC;IACpC,uBAAuB;AAC3B;;AAEA;IACI,WAAW;IACX,WAAW;IACX,eAAe;IACf,oCAAoC;IACpC,uBAAuB;AAC3B;;AAEA;IACI,8BAA8B;AAClC;;;AAGA,6BAA6B;AAC7B;IACI,aAAa;IACb,uBAAuB;IACvB,mBAAmB;IACnB,eAAe;AACnB;;AAEA;IACI,aAAa;IACb,sBAAsB;IACtB,6BAA6B;IAC7B,YAAY;IACZ,WAAW;IACX,kCAAkC;AACtC;;AAEA;IACI,WAAW;IACX,WAAW;IACX,2BAA2B;AAC/B;;AAEA;IACI,WAAW;IACX,WAAW;IACX,2BAA2B;AAC/B;;AAEA;IACI,WAAW;IACX,WAAW;IACX,2BAA2B;AAC/B;;;AAGA,2BAA2B;AAC3B;IACI,kBAAkB;IAClB,aAAa;IACb,uBAAuB;IACvB,mBAAmB;IACnB,UAAU;IACV,OAAO;IACP,QAAQ;IACR,iBAAiB;IACjB,kBAAkB;IAClB,YAAY;IACZ,aAAa;IACb,uBAAuB;AAC3B;;AAEA;IACI,YAAY;IACZ,WAAW;IACX,kCAAkC;AACtC","sourcesContent":["html, body {\n    min-height: 100%;\n    min-width: 100%;\n    margin: 0px;\n}\n\nbody {\n    background-color: navy;\n    position: relative;\n}\n\n.prompt-box {\n    display: none\n}\n\n.game-container {\n    display: grid;\n    grid-template-rows: 1fr 4fr 1.7fr;\n    height: 100vh;\n    width: 100vw;\n    background-color: rgb(59, 59, 59);\n}\n\n.header {\n    display: flex;\n    grid-row: 1 / 2;\n}\n\n.gameboards {\n    display: flex;\n    justify-content: space-around;\n    grid-row: 2 / 3;\n    background-color: rgb(114, 155, 155);\n}\n\n.dialogue-container {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    grid-row: 3 / 4;\n}\n\n.dialogue-box {\n    height: 20vh;\n    width: 50vw;\n    background-color: rgb(77, 134, 77);\n}\n\n\n/* gameboard wrapper styling */\n.board-wrapper {\n    height: 100%;\n    width: 400px;\n    background-color: bisque;\n    padding: 0 15px;\n}\n\n.board-title {\n\n}\n\n.gameboard {\n    display: flex;\n    flex-direction: column;\n    height: 400px;\n    width: 400px;\n    background-color: blueviolet;\n}\n\n.row {\n    display: flex;\n    /* flex-direction: column; */\n    height: 10%;\n    width: 100%;\n    background-color: pink;\n}\n\n.cell {\n    width: 100%;\n    margin: 0px;\n    aspect-ratio: 1;\n    background-color: rgb(221, 241, 241);\n    border: 1px solid black;\n}\n\n.cell-c {\n    width: 100%;\n    margin: 0px;\n    aspect-ratio: 1;\n    background-color: rgb(221, 241, 241);\n    border: 1px solid black;\n}\n\n.cell:hover, .cell-c:hover {\n    background-color: antiquewhite;\n}\n\n\n/* styling for dialogue box */\n.dialogue-container {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    grid-row: 3 / 4;\n}\n\n.dialogue-box {\n    display: flex;\n    flex-direction: column;\n    justify-content: space-evenly;\n    height: 20vh;\n    width: 45vw;\n    background-color: rgb(77, 134, 77);\n}\n\n.text-box1 {\n    height: 4vh;\n    width: 40vw;\n    background-color: lightblue;\n}\n\n.text-box2 {\n    height: 4vh;\n    width: 40vw;\n    background-color: lightblue;\n}\n\n.text-box3 {\n    height: 4vh;\n    width: 40vw;\n    background-color: lightblue;\n}\n\n\n/* styling for reset game */\n.end-game-box {\n    position: absolute;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    top: 245px;\n    left: 0;\n    right: 0;\n    margin-left: auto;\n    margin-right: auto;\n    width: 220px;\n    height: 220px;\n    background-color: azure;\n}\n\n.reset-game-button {\n    height: 50px;\n    width: 50px;\n    background-color: rgb(144, 58, 58);\n}"],"sourceRoot":""}]);
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



(0,_gameLoop__WEBPACK_IMPORTED_MODULE_2__.initializeGame)();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLE9BQU8sc0ZBQXNGLFlBQVksV0FBVyxVQUFVLE1BQU0sS0FBSyxZQUFZLGFBQWEsT0FBTyxLQUFLLEtBQUssTUFBTSxLQUFLLFVBQVUsWUFBWSxXQUFXLFVBQVUsWUFBWSxPQUFPLEtBQUssVUFBVSxVQUFVLE9BQU8sS0FBSyxVQUFVLFlBQVksV0FBVyxZQUFZLE9BQU8sS0FBSyxVQUFVLFlBQVksYUFBYSxXQUFXLE9BQU8sS0FBSyxVQUFVLFVBQVUsWUFBWSxRQUFRLFlBQVksTUFBTSxVQUFVLFVBQVUsWUFBWSxXQUFXLE9BQU8sTUFBTSxNQUFNLEtBQUssVUFBVSxZQUFZLFdBQVcsVUFBVSxZQUFZLE9BQU8sS0FBSyxVQUFVLFlBQVksV0FBVyxVQUFVLFlBQVksT0FBTyxLQUFLLFVBQVUsVUFBVSxVQUFVLFlBQVksYUFBYSxPQUFPLEtBQUssVUFBVSxVQUFVLFVBQVUsWUFBWSxhQUFhLE9BQU8sS0FBSyxZQUFZLFFBQVEsWUFBWSxNQUFNLFVBQVUsWUFBWSxhQUFhLFdBQVcsT0FBTyxLQUFLLFVBQVUsWUFBWSxhQUFhLFdBQVcsVUFBVSxZQUFZLE9BQU8sS0FBSyxVQUFVLFVBQVUsWUFBWSxPQUFPLEtBQUssVUFBVSxVQUFVLFlBQVksT0FBTyxLQUFLLFVBQVUsVUFBVSxZ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ZWJwYWNrOi8vbWFpbi10ZW1wbGF0ZS8uL3NyYy9nYW1lTG9vcC5qcyIsIndlYnBhY2s6Ly9tYWluLXRlbXBsYXRlLy4vc3JjL2dhbWVib2FyZENvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vbWFpbi10ZW1wbGF0ZS8uL3NyYy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vbWFpbi10ZW1wbGF0ZS8uL3NyYy9zaGlwLW9iamVjdC5qcyIsIndlYnBhY2s6Ly9tYWluLXRlbXBsYXRlLy4vc3JjL3NoaXBQbGFjZW1lbnQuanMiLCJ3ZWJwYWNrOi8vbWFpbi10ZW1wbGF0ZS8uL3NyYy91c2VySW50ZXJmYWNlLmpzIiwid2VicGFjazovL21haW4tdGVtcGxhdGUvLi9zcmMvcGFnZVN0eWxpbmcuY3NzIiwid2VicGFjazovL21haW4tdGVtcGxhdGUvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL21haW4tdGVtcGxhdGUvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9tYWluLXRlbXBsYXRlLy4vc3JjL3BhZ2VTdHlsaW5nLmNzcz9hOWI3Iiwid2VicGFjazovL21haW4tdGVtcGxhdGUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vbWFpbi10ZW1wbGF0ZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vbWFpbi10ZW1wbGF0ZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9tYWluLXRlbXBsYXRlLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL21haW4tdGVtcGxhdGUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly9tYWluLXRlbXBsYXRlLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vbWFpbi10ZW1wbGF0ZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9tYWluLXRlbXBsYXRlL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL21haW4tdGVtcGxhdGUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL21haW4tdGVtcGxhdGUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9tYWluLXRlbXBsYXRlL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbWFpbi10ZW1wbGF0ZS93ZWJwYWNrL3J1bnRpbWUvbm9uY2UiLCJ3ZWJwYWNrOi8vbWFpbi10ZW1wbGF0ZS8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvcHJlZmVyLWRlZmF1bHQtZXhwb3J0ICovXG5pbXBvcnQgeyBQbGF5ZXIsIHVzZXJQbGF5ZXIsIGNvbXB1dGVyUGxheWVyIH0gZnJvbSBcIi4vcGxheWVyXCI7XG5pbXBvcnQgeyBnYW1lQm9hcmRDb250cm9sbGVyIH0gZnJvbSBcIi4vZ2FtZWJvYXJkQ29udHJvbGxlclwiO1xuaW1wb3J0IHsgY3JlYXRlRmxlZXQsIGNyZWF0ZU9wcEZsZWV0IH0gZnJvbSBcIi4vc2hpcC1vYmplY3RcIjtcbmltcG9ydCB7IGRvbU1hbmlwdWxhdGlvbiB9IGZyb20gXCIuL3VzZXJJbnRlcmZhY2VcIjtcbmltcG9ydCB7IGh1bWFuU2hpcFBsYWNlbWVudCB9IGZyb20gXCIuL3NoaXBQbGFjZW1lbnRcIjtcblxuZXhwb3J0IGNvbnN0IGluaXRpYWxpemVHYW1lID0gZnVuY3Rpb24gY3JlYXRlR2FtZSgpIHtcbiAgICBjb25zdCBydW5ET00gPSBkb21NYW5pcHVsYXRpb24oKTtcblxuICAgIGNvbnN0IGh1bWFuUGxheWVyID0gbmV3IFBsYXllcignUGxheWVyIDEnKVxuICAgIGNvbnN0IGh1bWFuRmxlZXQgPSBjcmVhdGVGbGVldCgpXG4gICAgaHVtYW5QbGF5ZXIuZ2FtZUJvYXJkID0gZ2FtZUJvYXJkQ29udHJvbGxlcihodW1hbkZsZWV0LCBodW1hblBsYXllci5wbGF5ZXIpO1xuICAgIGNvbnN0IGh1bWFuQm9hcmQgPSBodW1hblBsYXllci5nYW1lQm9hcmRcbiAgICBodW1hbkJvYXJkLmNyZWF0ZUJvYXJkKCk7XG4gICAgXG5cbiAgICBjb25zdCBBSXBsYXllciA9IG5ldyBQbGF5ZXIoJ1BsYXllciAyJyk7XG4gICAgY29uc3QgY29tcHV0ZXJGbGVldCA9IGNyZWF0ZU9wcEZsZWV0KCk7XG4gICAgQUlwbGF5ZXIuZ2FtZUJvYXJkID0gZ2FtZUJvYXJkQ29udHJvbGxlcihjb21wdXRlckZsZWV0LCBBSXBsYXllci5wbGF5ZXIpO1xuICAgIGNvbnN0IGNvbXB1dGVyQm9hcmQgPSBBSXBsYXllci5nYW1lQm9hcmQ7XG4gICAgY29tcHV0ZXJCb2FyZC5jcmVhdGVCb2FyZCgpO1xuXG4gICAgXG4gICAgcnVuRE9NLnJlbmRlckdhbWVCb2FyZChjb21wdXRlckJvYXJkLmNyZWF0ZUJvYXJkKCksIEFJcGxheWVyLnBsYXllcik7XG4gICAgcnVuRE9NLnJlbmRlckdhbWVCb2FyZChjb21wdXRlckJvYXJkLCBodW1hblBsYXllci5wbGF5ZXIsIGh1bWFuQm9hcmQpO1xuICAgIFxuICAgIC8vIGNhbGwgcmVuZGVyIGRpYWxvZ3VlIGJveCBoZXJlXG4gICAgcnVuRE9NLnJlbmRlckRpYWxvZ3VlQm94KCk7XG5cbiAgICAvLyBjYWxsIHNoaXBQbGFjZW1lbnQgZnVuY3Rpb24gaGVyZSBmb3IgaHVtYW5Cb2FyZFxuICAgIGNvbnN0IGh1bWFuUGxhY2VtZW50ID0gaHVtYW5TaGlwUGxhY2VtZW50KClcbn1cblxuZXhwb3J0IGNvbnN0IHJlc2V0SW50ZXJmYWNlID0gZnVuY3Rpb24gKGJvZHlFLCBlbmRCb3gpIHtcbiAgICBjb25zb2xlLmxvZygncmVzZXRpbmcgYWxsIHRoaXMgc2hpdCcpO1xuICAgIGNvbnN0IHBsYXllckJvYXJkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nYW1lYm9hcmRzJyk7XG4gICAgY29uc3QgZGlhbG9ndWVDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGlhbG9ndWUtY29udGFpbmVyJyk7XG5cbiAgICBjb25zdCBnYW1lQm9hcmRXcmFwcGVycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ib2FyZC13cmFwcGVyJyk7XG4gICAgY29uc3QgZGlhbG9ndWVCb3ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGlhbG9ndWUtYm94Jyk7XG4gICAgLy8gY29uc29sZS5sb2cocGxheWVyQm9hcmRzLCBkaWFsb2d1ZUNvbnRhaW5lciwgZ2FtZUJvYXJkV3JhcHBlcnMsIGRpYWxvZ3VlQm94KVxuICAgIGNvbnNvbGUubG9nKGJvZHlFLCBlbmRCb3gpXG5cbiAgICBnYW1lQm9hcmRXcmFwcGVycy5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG4gICAgICAgIHBsYXllckJvYXJkcy5yZW1vdmVDaGlsZChlbGVtZW50KTtcbiAgICB9KTtcbiAgICBkaWFsb2d1ZUNvbnRhaW5lci5yZW1vdmVDaGlsZChkaWFsb2d1ZUJveCk7XG4gICAgYm9keUUucmVtb3ZlQ2hpbGQoZW5kQm94KTtcblxuICAgIGluaXRpYWxpemVHYW1lKCk7XG5cbn0iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby11c2UtYmVmb3JlLWRlZmluZSAqL1xuLyogZXNsaW50LWRpc2FibGUgbm8tZWxzZS1yZXR1cm4gKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLWxvb3AtZnVuYyAqL1xuLyogZXNsaW50LWRpc2FibGUgbm8tcGx1c3BsdXMgKi9cbi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9wcmVmZXItZGVmYXVsdC1leHBvcnQgKi9cblxuLy8gZ2FtZUJvYXJkIHNob3VsZCBjaGVjayBpZiBhIGdhbWUgaXMgb3ZlciBieSBzZWVpbmcgaWYgdGhlXG4vLyBsZW5ndGggb2YgXCJzaGlwc1wiIGlzIHplcm8gKGNoZWNrQWxsU3VuaylcblxuLy8gcGxhY2luZyBzaGlwcyB2ZXJ0aWNhbGx5Li4uIHBvc3NpYmxlIGlkZWE6IGhhdmUgYSBjb2x1bW4gbnVtYmVyIChlLmcgMylcbi8vIHRoYXQgeW91IHVzZSB0byBzZWxlY3QgdGhlIGNvcnJlc3BvbmRpbmcgYXJyYXkgaXRlbSBpbiBlYWNoXG4vLyBvZiB0aGUgYXJyYXlzIHRoYXQgcmVwcmVzZW50cyBhIHJvdyBvbiB0aGUgYm9hcmRcbmltcG9ydCB7IFNoaXAsIGNyZWF0ZUZsZWV0IH0gZnJvbSBcIi4vc2hpcC1vYmplY3RcIlxuaW1wb3J0IHsgZG9tTWFuaXB1bGF0aW9uLCBkaWFsb2d1ZUNvbnRyb2xsZXIgfSBmcm9tIFwiLi91c2VySW50ZXJmYWNlXCI7XG5cbmNvbnN0IHJ1bkRPTSA9IGRvbU1hbmlwdWxhdGlvbigpO1xuY29uc3QgZGlhbG9ndWVSZWZyZXNoID0gZGlhbG9ndWVDb250cm9sbGVyKCk7XG5cbmV4cG9ydCBmdW5jdGlvbiBnYW1lQm9hcmRDb250cm9sbGVyKGZsZWV0LCBuYW1lKSB7XG4gICAgY29uc3QgcGxheWVyTmFtZSA9IG5hbWU7XG4gICAgY29uc3QgYm9hcmQgPSBbXTtcbiAgICBjb25zdCBzaGlwcyA9IGZsZWV0O1xuXG4gICAgLy8gY29uc29sZS5sb2coc2hpcHMpO1xuXG5cbiAgICBmdW5jdGlvbiBjcmVhdGVCb2FyZCgpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgICAgICAgICBib2FyZFtpXSA9IFtdO1xuXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspIHtcbiAgICAgICAgICAgICAgICBib2FyZFtpXVtqXSA9IGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2coYm9hcmQpO1xuICAgICAgICByZXR1cm4gYm9hcmRcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwbGFjZUhvcml6b250YWxTaGlwKHJvdywgY29sLCBzaGlwKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgbmV3Q29vcmRzID0gW3JvdywgY29sICsgaV07XG4gICAgICAgICAgICAvLyBwdXQgYSBjaGVjayBoZXJlIHRvIHNlZSBpZiB0aGlzIGNvbmZsaWN0cyB3aXRoXG4gICAgICAgICAgICAvLyBhbnkgb3RoZXIgc2hpcCdzIGNvb3JkcyBcbiAgICAgICAgICAgIHNoaXAuY29vcmRzLnB1c2gobmV3Q29vcmRzKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzaGlwXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGxhY2VWZXJ0aWNhbFNoaXAocm93LCBjb2wsIHNoaXApIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBuZXdDb29yZHMgPSBbcm93ICsgaSwgY29sXTtcbiAgICAgICAgICAgIC8vIHB1dCBhIGNoZWNrIGhlcmUgdG8gc2VlIGlmIHRoaXMgY29uZmxpY3RzIHdpdGhcbiAgICAgICAgICAgIC8vIGFueSBvdGhlciBzaGlwJ3MgY29vcmRzIFxuICAgICAgICAgICAgc2hpcC5jb29yZHMucHVzaChuZXdDb29yZHMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzaGlwXG4gICAgfVxuICAgIFxuICAgIGZ1bmN0aW9uIHJlY2lldmVBdHRhY2soY29vcmRzKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGNvb3JkcylcbiAgICAgICAgbGV0IGF0dGFja1N0YXR1cyA9ICdtaXNzJztcblxuICAgICAgICAvLyBjaGVjayB0byBzZWUgaWYgY29vcmRzIGhhdmUgYWxyZWFkeSBiZWVuIHVzZWQ6XG4gICAgICAgIGlmIChjaGVja0lmVXNlZChjb29yZHMpID09PSB0cnVlKSB7XG4gICAgICAgICAgICByZXR1cm4gJ2ZpbGxlZCBhbHJlYWR5J1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgc2hpcHNbaV0uY29vcmRzLmZvckVhY2goKGNvb3JkKSA9PiB7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKGNoZWNrSWZVc2VkKGNvb3JkcykgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdmaWxsZWQgYWxyZWFkeSdcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoY29vcmRbMF0gPT09IGNvb3Jkc1swXSAmJiBjb29yZFsxXSA9PT0gY29vcmRzWzFdKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdoaXQnKTtcbiAgICAgICAgICAgICAgICAgICAgYXR0YWNrU3RhdHVzID0gJ2hpdCdcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYXR0YWNrU3RhdHVzKVxuICAgICAgICAgICAgICAgICAgICBzaGlwc1tpXS5oaXQoKTtcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlQm9hcmRTcG90KGNvb3Jkcyk7XG4gICAgICAgICAgICAgICAgICAgIGRpYWxvZ3VlUmVmcmVzaC5tb3ZlUmVzdWx0KGF0dGFja1N0YXR1cyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYXllck5hbWUsIGNvb3Jkcywgc2hpcHNbaV0pXG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3Vua0NoZWNrID0gc2hpcHNbaV0uY2hlY2tJZlN1bmsoKVxuICAgICAgICAgICAgICAgICAgICBpZiAoc3Vua0NoZWNrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkaWFsb2d1ZVJlZnJlc2guc3Vua1NoaXBNZXNzYWdlKHNoaXBzW2ldLCBwbGF5ZXJOYW1lKVxuICAgICAgICAgICAgICAgICAgICAgICAgc2hpcHMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tBbGxTdW5rKClcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIHVwZGF0ZUJvYXJkU3BvdChjb29yZHMsIGF0dGFja1N0YXR1cyk7XG4gICAgICAgIGlmIChhdHRhY2tTdGF0dXMgPT09ICdtaXNzJykge1xuICAgICAgICAgICAgZGlhbG9ndWVSZWZyZXNoLm1vdmVSZXN1bHQoYXR0YWNrU3RhdHVzLFxuICAgICAgICAgICAgICAgIHBsYXllck5hbWUsIGNvb3JkcylcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGF0dGFja1N0YXR1c1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNoZWNrQWxsU3VuaygpIHtcbiAgICAgICAgY29uc29sZS5sb2coc2hpcHMpXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGJvYXJkKVxuICAgICAgICBpZiAoc2hpcHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICBkaWFsb2d1ZVJlZnJlc2guZW5kR2FtZU1lc3NhZ2UocGxheWVyTmFtZSlcbiAgICAgICAgICAgIGVuZEdhbWUoKVxuICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlQm9hcmRTcG90KGNvb3JkcywgYXR0YWNrU3RhdHVzKSB7XG4gICAgICAgIGJvYXJkW2Nvb3Jkc1swXSAtIDFdW2Nvb3Jkc1sxXSAtIDFdID0gdHJ1ZTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coYm9hcmQpXG4gICAgICAgIHJ1bkRPTS51c2VHcmlkU3BvdChjb29yZHMsIGF0dGFja1N0YXR1cywgcGxheWVyTmFtZSlcbiAgICAgICAgcmV0dXJuIGJvYXJkXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2hlY2tJZlVzZWQoY29vcmRzKSB7XG4gICAgICAgIGlmIChib2FyZFtjb29yZHNbMF0gLSAxXVtjb29yZHNbMV0gLSAxXSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ2FscmVhZHkgdXNlZCcpXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICBcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBlbmRHYW1lKCkge1xuICAgICAgICAvLyB3YW50IHRvIGRpc2FibGUgYm90aCBnYW1lQm9hcmRzXG4gICAgICAgIC8vIHdhbnQgdG8gbWFrZSB0aGUgcmVzdGFydCBidXR0b24gYXBwZWFyXG4gICAgICAgIGNvbnNvbGUubG9nKCdlbmRpbmcgZ2FtZScpO1xuICAgICAgICBydW5ET00uZnJlZXplR3JpZCgpO1xuICAgICAgICBydW5ET00ucmVuZGVyRW5kR2FtZSgpO1xuICAgIH1cbiAgICAvLyBsaWtlbHkgd2lsbCBoYXZlIHRvIGltcGxlbWVudCBjaGVjayB0byBtYWtlIHN1cmUgYSBzaGlwIGNhblxuICAgIC8vIGJlIHBsYWNlZCB3aXRoIG5vIG92ZXJsYXBcblxuXG4gICAgcmV0dXJuIHsgY3JlYXRlQm9hcmQsIHBsYWNlSG9yaXpvbnRhbFNoaXAsIHBsYWNlVmVydGljYWxTaGlwLCByZWNpZXZlQXR0YWNrLFxuICAgIGNoZWNrQWxsU3VuaywgdXBkYXRlQm9hcmRTcG90LCBjaGVja0lmVXNlZCwgZW5kR2FtZSB9XG59XG5cbiIsIi8vIGNyZWF0ZSBib3RoIHRoZSB1c2VyIHBsYXllciBhbmQgdGhlIGNvbXB1dGVyIHBsYXllciBoZXJlXG5cbi8vIGNvbXB1dGVyIHBsYXllciBoYXMgYXR0YWNrIGNvb3JkaW5hdGVzIGdlbmVyYXRvciBmdW5jdGlvblxuaW1wb3J0IHsgZ2FtZUJvYXJkQ29udHJvbGxlciB9IGZyb20gXCIuL2dhbWVib2FyZENvbnRyb2xsZXJcIjtcblxuZXhwb3J0IGNsYXNzIFBsYXllciB7XG4gICAgY29uc3RydWN0b3IocGxheWVyLCBnYW1lQm9hcmQpIHtcbiAgICAgICAgdGhpcy5wbGF5ZXIgPSBwbGF5ZXI7XG4gICAgICAgIC8vIHRoaXMucGxheWVyU2hpcHMgPSBbXVxuICAgICAgICB0aGlzLmdhbWVCb2FyZD0gbnVsbFxuICAgIH1cbn1cblxuXG5leHBvcnQgY29uc3QgdXNlclBsYXllciA9IGZ1bmN0aW9uICgpIHtcblxufVxuXG5leHBvcnQgY29uc3QgY29tcHV0ZXJQbGF5ZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgdmlzaXRlZCA9IFtdO1xuXG4gICAgZnVuY3Rpb24gcGlja1JhbmRvbUNlbGwoaHVtYW5Cb2FyZCkge1xuICAgICAgICBjb25zdCByb3cgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCkgKyAxXG4gICAgICAgIGNvbnN0IGNvbHVtbiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKSArIDFcbiAgICAgICAgY29uc3QgY29tcENvb3JkcyA9IFtyb3csIGNvbHVtbl07XG5cbiAgICAgICAgY29uc3QgcmVwZWF0Qm9vbGVhbiA9IGNoZWNrUmVwZWF0Q2VsbChjb21wQ29vcmRzKVxuICAgICAgICBjb25zb2xlLmxvZyhyZXBlYXRCb29sZWFuKVxuICAgICAgICBpZiAocmVwZWF0Qm9vbGVhbiA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2NvbXB1dGVyIHBpY2tlZCB1c2VkIGNlbGwhIScpXG4gICAgICAgICAgICBwaWNrUmFuZG9tQ2VsbChodW1hbkJvYXJkKTtcbiAgICAgICAgfSBlbHNlIGlmIChyZXBlYXRCb29sZWFuID09PSBmYWxzZSkge1xuICAgICAgICAgICAgdmlzaXRlZC5wdXNoKGNvbXBDb29yZHMpO1xuICAgICAgICAgICAgaHVtYW5Cb2FyZC5yZWNpZXZlQXR0YWNrKGNvbXBDb29yZHMpO1xuXG4gICAgICAgICAgICByZXR1cm4gY29tcENvb3JkcyBcbiAgICAgICAgfVxuICAgICAgICBcblxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNoZWNrUmVwZWF0Q2VsbChjb29yZHMpIHtcbiAgICAgICAgY29uc3Qgc3RyaW5nZWRDb29yZHMgPSBKU09OLnN0cmluZ2lmeShjb29yZHMpO1xuICAgICAgICBjb25zb2xlLmxvZyhzdHJpbmdlZENvb3JkcylcbiAgICAgICAgY29uc3QgZXhpc3RzQm9vbGVhbiA9IHZpc2l0ZWQuc29tZSgoY29vcmQpID0+IEpTT04uc3RyaW5naWZ5KGNvb3JkKSA9PT0gc3RyaW5nZWRDb29yZHMpXG4gICAgICAgIGNvbnNvbGUubG9nKGV4aXN0c0Jvb2xlYW4pXG4gICAgICAgIHJldHVybiBleGlzdHNCb29sZWFuXG4gICAgfVxuXG4gICAgcmV0dXJuIHtwaWNrUmFuZG9tQ2VsbCwgY2hlY2tSZXBlYXRDZWxsfVxufSIsIi8qIGVzbGludC1kaXNhYmxlIG5vLWVsc2UtcmV0dXJuICovXG4vKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvcHJlZmVyLWRlZmF1bHQtZXhwb3J0ICovXG5pbXBvcnQgeyBnYW1lQm9hcmRDb250cm9sbGVyIH0gZnJvbSBcIi4vZ2FtZWJvYXJkQ29udHJvbGxlclwiO1xuXG5leHBvcnQgY2xhc3MgU2hpcCB7XG4gICAgY29uc3RydWN0b3IobGVuZ3RoLCBuYW1lLCBoaXRzLCBpc1N1bmssIGNvb3Jkcykge1xuICAgICAgICB0aGlzLmxlbmd0aCA9IGxlbmd0aDtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy5oaXRzID0gMDtcbiAgICAgICAgdGhpcy5pc1N1bmsgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5jb29yZHMgPSBbXVxuICAgIH1cblxuICAgIGhpdCgpIHtcbiAgICAgICAgdGhpcy5oaXRzICs9IDFcbiAgICAgICAgY29uc29sZS5sb2coJ2hpdCBhZGRlZCcpXG4gICAgfVxuXG4gICAgY2hlY2tJZlN1bmsoKSB7XG4gICAgICAgIGlmICh0aGlzLmxlbmd0aCA9PT0gdGhpcy5oaXRzKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnU3VuayEnKVxuICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMubGVuZ3RoKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuaGl0cyk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgIH1cblxufVxuXG5jb25zdCBib2FyZFJ1biA9IGdhbWVCb2FyZENvbnRyb2xsZXIoKTtcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUZsZWV0KCkge1xuICAgIGNvbnN0IHNoaXBzID0gW11cblxuICAgIGNvbnN0IGNhcnJpZXIgPSBuZXcgU2hpcCg1LCAnQ2FycmllcicpO1xuICAgIGNvbnN0IGJhdHRsZXNoaXAgPSBuZXcgU2hpcCg0LCAnQmF0dGxlc2hpcCcpO1xuICAgIGNvbnN0IGRlc3Ryb3llciA9IG5ldyBTaGlwKDMsICdEZXN0cm95ZXInKTtcbiAgICBjb25zdCBzdWJtYXJpbmUgPSBuZXcgU2hpcCgzLCAnU3VibWFyaW5lJyk7XG4gICAgY29uc3QgcGF0cm9sQm9hdCA9IG5ldyBTaGlwKDIsICdQYXRyb2wgQm9hdCcpO1xuIFxuICAgIHNoaXBzLnB1c2goY2FycmllciwgYmF0dGxlc2hpcCwgZGVzdHJveWVyLCBzdWJtYXJpbmUsIHBhdHJvbEJvYXQpXG5cbiAgICBib2FyZFJ1bi5wbGFjZUhvcml6b250YWxTaGlwKDEsIDUsIGNhcnJpZXIpO1xuICAgIGJvYXJkUnVuLnBsYWNlVmVydGljYWxTaGlwKDQsMSwgYmF0dGxlc2hpcClcbiAgICBib2FyZFJ1bi5wbGFjZUhvcml6b250YWxTaGlwKDcsIDQsIGRlc3Ryb3llcik7XG4gICAgYm9hcmRSdW4ucGxhY2VWZXJ0aWNhbFNoaXAoNywgOCwgc3VibWFyaW5lKTtcbiAgICBib2FyZFJ1bi5wbGFjZUhvcml6b250YWxTaGlwKDIsIDYsIHBhdHJvbEJvYXQpO1xuICAgIGNvbnNvbGUubG9nKHNoaXBzKTtcbiAgICByZXR1cm4gc2hpcHNcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZU9wcEZsZWV0KCkge1xuICAgIGNvbnN0IHNoaXBzID0gW11cblxuICAgIGNvbnN0IGNhcnJpZXIgPSBuZXcgU2hpcCg1LCAnQ2FycmllcicpO1xuICAgIGNvbnN0IGJhdHRsZXNoaXAgPSBuZXcgU2hpcCg0LCAnQmF0dGxlc2hpcCcpO1xuICAgIGNvbnN0IGRlc3Ryb3llciA9IG5ldyBTaGlwKDMsICdEZXN0cm95ZXInKTtcbiAgICBjb25zdCBzdWJtYXJpbmUgPSBuZXcgU2hpcCgzLCAnU3VibWFyaW5lJyk7XG4gICAgY29uc3QgcGF0cm9sQm9hdCA9IG5ldyBTaGlwKDIsICdQYXRyb2wgQm9hdCcpO1xuXG4gICAgc2hpcHMucHVzaChjYXJyaWVyLCBiYXR0bGVzaGlwLCBkZXN0cm95ZXIsIHN1Ym1hcmluZSwgcGF0cm9sQm9hdCk7XG5cbiAgICBib2FyZFJ1bi5wbGFjZUhvcml6b250YWxTaGlwKDEsIDEsIGNhcnJpZXIpO1xuICAgIGJvYXJkUnVuLnBsYWNlVmVydGljYWxTaGlwKDQsMiwgYmF0dGxlc2hpcClcbiAgICBib2FyZFJ1bi5wbGFjZUhvcml6b250YWxTaGlwKDYsIDYsIGRlc3Ryb3llcik7XG4gICAgYm9hcmRSdW4ucGxhY2VWZXJ0aWNhbFNoaXAoNywgOCwgc3VibWFyaW5lKTtcbiAgICBib2FyZFJ1bi5wbGFjZUhvcml6b250YWxTaGlwKDMsIDcsIHBhdHJvbEJvYXQpO1xuICAgIGNvbnNvbGUubG9nKHNoaXBzKTtcbiAgICByZXR1cm4gc2hpcHNcbn0iLCIvKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvcHJlZmVyLWRlZmF1bHQtZXhwb3J0ICovXG5cbi8vIHRoaXMgd2lsbCBob3VzZSB0aGUgZnVuY3Rpb24gdGhhdCBjaGVja3MgdG8gc2VlIGlmIEFMTCBjb29yZHNcbi8vIGFyZSBzdGF5aW5nIGluIGJvdW5kcyBvZiB0aGUgZ2FtZUJvYXJkXG5cbi8vIGhhdmUgdG8gYWRkIGJ1dHRvbnMgdG8gVUkgdG8gc3dpdGNoIGJldHdlbiBob3Jpem9udGFsIGFuZCB2ZXJ0aWNhbFxuLy8gaGF2ZSB0byBtYWtlIGEgc3RhcnQgYnV0dG9uIHRoYXQgdXNlciBjYW4gcHJlc3Mgd2hlbiBhbGwgXG4vLyBzaGlwcyBhcmUgcGxhY2VkXG5cblxuZXhwb3J0IGNvbnN0IGh1bWFuU2hpcFBsYWNlbWVudCA9IGZ1bmN0aW9uICgpIHtcbiAgICAvLyB0aGlzIHdpbGwgYmUgZWl0aGVyIGhvcml6b250YWwgb3IgdmVydGljYWxcbiAgICBjb25zdCBjdXJyZW50UGxhbmUgPSAnaG9yaXpvbnRhbCc7XG4gICAgY29uc3QgaHVtYW5DZWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jZWxsJylcbiAgICBjb25zb2xlLmxvZyhjdXJyZW50UGxhbmUpO1xufVxuXG5cbmV4cG9ydCBjb25zdCBjb21wdXRlclBsYWNlbWVudCA9IGZ1bmN0aW9uICgpIHtcblxufVxuXG5mdW5jdGlvbiBzd2l0Y2hQbGFuZShjdXJyZW50UGxhbmUpIHtcbiAgICBpZiAoY3VycmVudFBsYW5lID09PSAnaG9yaXpvbnRhbCcpIHtcbiAgICAgICAgY3VycmVudFBsYW5lID0gJ3ZlcnRpY2FsJ1xuICAgIH0gZWxzZSBpZiAoY3VycmVudFBsYW5lID09PSAndmVydGljYWwnKSB7XG4gICAgICAgIGN1cnJlbnRQbGFuZSA9ICdob3Jpem9udGFsJ1xuICAgIH1cbiAgICByZXR1cm4gY3VycmVudFBsYW5lXG59OyIsIi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9wcmVmZXItZGVmYXVsdC1leHBvcnQgKi9cbmltcG9ydCB7IGNvbXB1dGVyUGxheWVyIH0gZnJvbSBcIi4vcGxheWVyXCI7XG5pbXBvcnQgeyByZXNldEludGVyZmFjZSB9IGZyb20gXCIuL2dhbWVMb29wXCI7XG5cblxuZXhwb3J0IGNvbnN0IGRvbU1hbmlwdWxhdGlvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICBjb25zdCBjb21wdXRlck1vdmVzID0gY29tcHV0ZXJQbGF5ZXIoKVxuXG4gICAgY29uc3QgcGxheWVyQm9hcmRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdhbWVib2FyZHMnKTtcbiAgICBjb25zdCBkaWFsb2d1ZUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kaWFsb2d1ZS1jb250YWluZXInKVxuXG4gICAgZnVuY3Rpb24gcmVuZGVyR2FtZUJvYXJkKGJvYXJkQ29udHJvbGxlciwgcGxheWVyTmFtZSwgaHVtYW5Cb2FyZCkge1xuICAgICAgICBsZXQgaXNDb21wdXRlciA9IGZhbHNlO1xuICAgICAgICBpZiAocGxheWVyTmFtZSA9PT0gJ1BsYXllciAyJykge1xuICAgICAgICAgICAgaXNDb21wdXRlciA9IHRydWVcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyhpc0NvbXB1dGVyKTtcblxuICAgICAgICBjb25zdCBnYW1lQm9hcmRXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGFwcGVuZEVsZW1lbnQoZ2FtZUJvYXJkV3JhcHBlciwgJ2JvYXJkLXdyYXBwZXInLCBwbGF5ZXJCb2FyZHMpXG4gICAgICAgXG4gICAgICAgIGNvbnN0IGJvYXJkVGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMicpO1xuICAgICAgICBhcHBlbmRFbGVtZW50KGJvYXJkVGl0bGUsICdib2FyZC10aXRsZScsIGdhbWVCb2FyZFdyYXBwZXIpO1xuICAgICAgICBib2FyZFRpdGxlLnRleHRDb250ZW50ID0gcGxheWVyTmFtZTtcblxuICAgICAgICAvLyByZW5kZXIgYm9hcmQ6XG4gICAgICAgIGNvbnN0IGdhbWVib2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBhcHBlbmRFbGVtZW50KGdhbWVib2FyZCwgJ2dhbWVib2FyZCcsIGdhbWVCb2FyZFdyYXBwZXIpO1xuXG4gICAgICAgIGJ1aWxkR3JpZChnYW1lYm9hcmQsIGlzQ29tcHV0ZXIpO1xuICAgICAgICBcbiAgICAgICAgaWYgKGlzQ29tcHV0ZXIgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygndHJpZ2dlcmVkJylcbiAgICAgICAgICAgIHNldEdyaWRUcmlnZ2Vycyhib2FyZENvbnRyb2xsZXIsIGh1bWFuQm9hcmQpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGJ1aWxkR3JpZChnYW1lYm9hcmRFbGVtZW50LCBpc0NvbXB1dGVyKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgMTE7IGkrKykge1xuICAgICAgICAgICAgY29uc3Qgcm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBhcHBlbmRFbGVtZW50KHJvdywgJ3JvdycsIGdhbWVib2FyZEVsZW1lbnQpO1xuXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMTsgaiA8IDExOyBqKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICAgICAgY2VsbC5jb29yZGluYXRlcyA9IFtpLCBqXTtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhjZWxsLmNvb3JkaW5hdGVzKVxuICAgICAgICAgICAgICAgIGlmIChpc0NvbXB1dGVyID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGFwcGVuZEVsZW1lbnQoY2VsbCwgJ2NlbGwtYycsIHJvdyk7XG4gICAgICAgICAgICAgICAgICAgIGNlbGwuc2V0QXR0cmlidXRlKCdpZCcsIGAke2l9ICR7an1jYClcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgIGFwcGVuZEVsZW1lbnQoY2VsbCwgJ2NlbGwnLCByb3cpO1xuICAgICAgICAgICAgICAgICAgIGNlbGwuc2V0QXR0cmlidXRlKCdpZCcsIGAke2l9ICR7an1oYCkgXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXRHcmlkVHJpZ2dlcnMoY29tcHV0ZXJCb2FyZENvbnRyb2xsZXIsIGh1bWFuQm9hcmRDb250cm9sbGVyKSB7XG4gICAgICAgIGNvbnN0IGNlbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNlbGwtYycpO1xuICAgICAgICBjZWxscy5mb3JFYWNoKChjZWxsKSA9PiB7XG4gICAgICAgICAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGNlbGwuY29vcmRpbmF0ZXMpO1xuICAgICAgICAgICAgICAgIGNvbXB1dGVyQm9hcmRDb250cm9sbGVyLnJlY2lldmVBdHRhY2soY2VsbC5jb29yZGluYXRlcyk7XG5cbiAgICAgICAgICAgICAgICAvLyB0cmlnZ2VyIGNvbXB1dGVyJ3MgYXR0YWNrIGluIHJlc3BvbnNlXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coaHVtYW5Cb2FyZENvbnRyb2xsZXIpO1xuICAgICAgICAgICAgICAgIGNvbXB1dGVyTW92ZXMucGlja1JhbmRvbUNlbGwoaHVtYW5Cb2FyZENvbnRyb2xsZXIpO1xuXG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgICAgICAgICAgXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXNlR3JpZFNwb3QoY29vcmRzLCBzdGF0dXMsIG5hbWUpIHtcbiAgICAgICAgLy8gcmVnaXN0ZXJzIHRoYXQgdGVoIGdyaWQgc3BvdCB3YXMgdXNlZCwgYW5kIGRpc3BsYXlzXG4gICAgICAgIC8vIGVpdGhlciBhIGhpdCBvciBtaXNzXG5cbiAgICAgICAgaWYgKG5hbWUgPT09ICdQbGF5ZXIgMicpIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHN0YXR1cyk7XG4gICAgICAgICAgICBjb25zdCB1c2VkQ2VsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxuICAgICAgICAgICAgICAgIGAke2Nvb3Jkc1swXX0gJHtjb29yZHNbMV19Y2ApXG5cbiAgICAgICAgICAgIGlmIChzdGF0dXMgPT09ICdoaXQnKSB7XG4gICAgICAgICAgICAgICAgdXNlZENlbGwudGV4dENvbnRlbnQgPSAnWCdcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc3RhdHVzID09PSAnbWlzcycpIHtcbiAgICAgICAgICAgICAgICB1c2VkQ2VsbC50ZXh0Q29udGVudCA9ICdPJ1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhzdGF0dXMpO1xuICAgICAgICAgICAgY29uc3QgdXNlZENlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcbiAgICAgICAgICAgICAgICBgJHtjb29yZHNbMF19ICR7Y29vcmRzWzFdfWhgKVxuXG4gICAgICAgICAgICBpZiAoc3RhdHVzID09PSAnaGl0Jykge1xuICAgICAgICAgICAgICAgIHVzZWRDZWxsLnRleHRDb250ZW50ID0gJ1gnXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHN0YXR1cyA9PT0gJ21pc3MnKSB7XG4gICAgICAgICAgICAgICAgdXNlZENlbGwudGV4dENvbnRlbnQgPSAnTydcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZyZWV6ZUdyaWQoKSB7XG4gICAgICAgIGNvbnN0IGdhbWVib2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nYW1lYm9hcmQnKTtcbiAgICAgICAgZ2FtZWJvYXJkLnN0eWxlLnBvaW50ZXJFdmVudHMgPSAnbm9uZSc7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVuZGVyRGlhbG9ndWVCb3goKSB7XG4gICAgICAgIGNvbnN0IGRpYWxvZ3VlQm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGFwcGVuZEVsZW1lbnQoZGlhbG9ndWVCb3gsICdkaWFsb2d1ZS1ib3gnLCBkaWFsb2d1ZUNvbnRhaW5lcilcblxuICAgICAgICBjb25zdCB0ZXh0Qm94MSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICAgIGFwcGVuZEVsZW1lbnQodGV4dEJveDEsICd0ZXh0LWJveDEnLCBkaWFsb2d1ZUJveClcblxuICAgICAgICBjb25zdCB0ZXh0Qm94MiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICAgIGFwcGVuZEVsZW1lbnQodGV4dEJveDIsICd0ZXh0LWJveDInLCBkaWFsb2d1ZUJveClcblxuICAgICAgICBjb25zdCB0ZXh0Qm94MyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBhcHBlbmRFbGVtZW50KHRleHRCb3gzLCAndGV4dC1ib3gzJywgZGlhbG9ndWVCb3gpXG4gICAgfVxuXG5cbiAgICBmdW5jdGlvbiByZW5kZXJFbmRHYW1lKCkge1xuICAgICAgICBjb25zdCBib2R5RWxlbWVudCA9IGRvY3VtZW50LmJvZHlcblxuICAgICAgICBjb25zdCBlbmRHYW1lQm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGFwcGVuZEVsZW1lbnQoZW5kR2FtZUJveCwgJ2VuZC1nYW1lLWJveCcsIGJvZHlFbGVtZW50KTtcblxuICAgICAgICBjb25zdCBlbmRHYW1lSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBhcHBlbmRFbGVtZW50KGVuZEdhbWVJY29uLCAnZW5kLWdhbWUtaWNvbicsIGVuZEdhbWVCb3gpO1xuXG4gICAgICAgIGNvbnN0IHJlc2V0R2FtZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICBhcHBlbmRFbGVtZW50KHJlc2V0R2FtZUJ1dHRvbiwgJ3Jlc2V0LWdhbWUtYnV0dG9uJywgZW5kR2FtZUJveCk7XG5cbiAgICAgICAgcmVzZXRHYW1lQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgcmVzZXRJbnRlcmZhY2UoYm9keUVsZW1lbnQsIGVuZEdhbWVCb3gpO1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFwcGVuZEVsZW1lbnQoZWxlbWVudE5hbWUsIGNsYXNzTmFtZSwgZmF0aGVyRWxlbWVudCApIHtcbiAgICAgICAgZWxlbWVudE5hbWUuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xuICAgICAgICBmYXRoZXJFbGVtZW50LmFwcGVuZENoaWxkKGVsZW1lbnROYW1lKTtcblxuICAgICAgICByZXR1cm4gZWxlbWVudE5hbWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtyZW5kZXJHYW1lQm9hcmQsIGFwcGVuZEVsZW1lbnQsIGJ1aWxkR3JpZCxcbiAgICAgICAgc2V0R3JpZFRyaWdnZXJzLCB1c2VHcmlkU3BvdCwgZnJlZXplR3JpZCwgcmVuZGVyRGlhbG9ndWVCb3gsXG4gICAgICAgIHJlbmRlckVuZEdhbWV9XG5cbn1cblxuXG5cblxuZXhwb3J0IGNvbnN0IGRpYWxvZ3VlQ29udHJvbGxlciA9IGZ1bmN0aW9uKCkge1xuXG4gICAgZnVuY3Rpb24gIHBsYWNlU2hpcHNNZXNzYWdlKCkge1xuXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbW92ZVJlc3VsdChzdGF0dXMsIHBsYXllck5hbWUsIGNvb3Jkcywgc2hpcCA9IG51bGwpIHtcbiAgICAgICAgLy8gbmVlZCBhdHRhY2tTdGF0dXMsIHNoaXAgbmFtZSwgY29vcmRpbmF0ZXNcbiAgICAgICAgY29uc3QgdGV4dEJveDEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGV4dC1ib3gxJyk7XG4gICAgICAgIGNvbnN0IHRleHRCb3gyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRleHQtYm94MicpO1xuICAgICAgICBjb25zb2xlLmxvZygnZGlhbG9ndWUgcmVjb3JkZWQnKVxuICAgICAgICBpZiAocGxheWVyTmFtZSAhPT0gJ1BsYXllciAyJykge1xuICAgICAgICAgICAgaWYgKHN0YXR1cyA9PT0gJ2hpdCcpIHtcbiAgICAgICAgICAgICAgICB0ZXh0Qm94Mi50ZXh0Q29udGVudCA9IGBUaGUgZW5lbXkgaGFzIGhpdCB5b3VyICR7c2hpcC5uYW1lfVxuICAgICAgICAgICAgICAgIGF0IHJvdzogJHtjb29yZHNbMF19IGNvbHVtbjogJHtjb29yZHNbMV19IWBcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc3RhdHVzID09PSAnbWlzcycpIHtcbiAgICAgICAgICAgICAgICB0ZXh0Qm94Mi50ZXh0Q29udGVudCA9IGBUaGUgZW5lbXkgYXR0YWNrZWQgcm93OlxuICAgICAgICAgICAgICAgICR7Y29vcmRzWzBdfSBjb2x1bW46ICR7Y29vcmRzWzFdfSBhbmQgbWlzc2VkIWBcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9IGVsc2UgaWYgKHBsYXllck5hbWUgPT09ICdQbGF5ZXIgMicpIHtcbiAgICAgICAgICAgIGlmIChzdGF0dXMgPT09ICdoaXQnKSB7XG4gICAgICAgICAgICAgICAgdGV4dEJveDEudGV4dENvbnRlbnQgPSBgWW91IGhpdCB0aGUgZW5lbXkncyAke3NoaXAubmFtZX1cbiAgICAgICAgICAgICAgICBhdCByb3c6ICR7Y29vcmRzWzBdfSBjb2x1bW46ICR7Y29vcmRzWzFdfSFgXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHN0YXR1cyA9PT0gJ21pc3MnKSB7XG4gICAgICAgICAgICAgICAgdGV4dEJveDEudGV4dENvbnRlbnQgPSBgWW91IGF0dGFja2VkIHJvdzpcbiAgICAgICAgICAgICAgICAke2Nvb3Jkc1swXX0gY29sdW1uOiAke2Nvb3Jkc1sxXX0gYW5kIG1pc3NlZCFgXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzdW5rU2hpcE1lc3NhZ2Uoc2hpcCwgbmFtZSkge1xuICAgICAgICBjb25zdCB0ZXh0Qm94MSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50ZXh0LWJveDEnKTtcbiAgICAgICAgY29uc3QgdGV4dEJveDIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGV4dC1ib3gyJyk7XG4gICAgICAgIGNvbnNvbGUubG9nKHNoaXAsIG5hbWUpXG4gICAgICAgIGlmIChuYW1lICE9PSAnUGxheWVyIDInKSB7XG4gICAgICAgICAgICB0ZXh0Qm94Mi50ZXh0Q29udGVudCA9IGBZb3VyICR7c2hpcC5uYW1lfSBoYXMgYmVlbiBzdW5rISFgXG4gICAgICAgIH0gZWxzZSBpZiAobmFtZSA9PT0gJ1BsYXllciAyJykge1xuICAgICAgICAgICAgdGV4dEJveDEudGV4dENvbnRlbnQgPSBgWW91IHN1bmsgdGhlIGVuZW15J3MgJHtzaGlwLm5hbWV9ISFgXG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGVuZEdhbWVNZXNzYWdlKG5hbWUpIHtcbiAgICAgICAgY29uc3QgdGV4dEJveDMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGV4dC1ib3gzJylcbiAgICAgICAgLy8gbWF5YmUgcHV0IHRyaWdnZXIgaGVyZSB0byBtYWtlIGEgJ3Jlc3RhcnQgZ2FtZSdcbiAgICAgICAgLy8gYnV0dG9uIHRvIHBvcCB1cFxuICAgICAgICBpZiAobmFtZSA9PT0gJ1BsYXllciAyJykge1xuICAgICAgICAgICAgdGV4dEJveDMudGV4dENvbnRlbnQgPSAnVGhlIGVuZW15IGZsZWV0IGhhcyBiZWVuIHNhbmsuIEV4Y2VsbGVudCB3b3JrIFNvbGRpZXIhJ1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGV4dEJveDMudGV4dENvbnRlbnQgPSAnV2UgaGF2ZSBsb3N0IG91ciBmbGVldCBhbmQgYmVlbiBkZWZlYXRlZC4gQWJvcnQgdGhlIG1pc3Npb24hJ1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICByZXR1cm4ge3BsYWNlU2hpcHNNZXNzYWdlLCBtb3ZlUmVzdWx0LFxuICAgICAgICBzdW5rU2hpcE1lc3NhZ2UsIGVuZEdhbWVNZXNzYWdlfVxufSIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIGBodG1sLCBib2R5IHtcbiAgICBtaW4taGVpZ2h0OiAxMDAlO1xuICAgIG1pbi13aWR0aDogMTAwJTtcbiAgICBtYXJnaW46IDBweDtcbn1cblxuYm9keSB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogbmF2eTtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG59XG5cbi5wcm9tcHQtYm94IHtcbiAgICBkaXNwbGF5OiBub25lXG59XG5cbi5nYW1lLWNvbnRhaW5lciB7XG4gICAgZGlzcGxheTogZ3JpZDtcbiAgICBncmlkLXRlbXBsYXRlLXJvd3M6IDFmciA0ZnIgMS43ZnI7XG4gICAgaGVpZ2h0OiAxMDB2aDtcbiAgICB3aWR0aDogMTAwdnc7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDU5LCA1OSwgNTkpO1xufVxuXG4uaGVhZGVyIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGdyaWQtcm93OiAxIC8gMjtcbn1cblxuLmdhbWVib2FyZHMge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XG4gICAgZ3JpZC1yb3c6IDIgLyAzO1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYigxMTQsIDE1NSwgMTU1KTtcbn1cblxuLmRpYWxvZ3VlLWNvbnRhaW5lciB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIGdyaWQtcm93OiAzIC8gNDtcbn1cblxuLmRpYWxvZ3VlLWJveCB7XG4gICAgaGVpZ2h0OiAyMHZoO1xuICAgIHdpZHRoOiA1MHZ3O1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYig3NywgMTM0LCA3Nyk7XG59XG5cblxuLyogZ2FtZWJvYXJkIHdyYXBwZXIgc3R5bGluZyAqL1xuLmJvYXJkLXdyYXBwZXIge1xuICAgIGhlaWdodDogMTAwJTtcbiAgICB3aWR0aDogNDAwcHg7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogYmlzcXVlO1xuICAgIHBhZGRpbmc6IDAgMTVweDtcbn1cblxuLmJvYXJkLXRpdGxlIHtcblxufVxuXG4uZ2FtZWJvYXJkIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgaGVpZ2h0OiA0MDBweDtcbiAgICB3aWR0aDogNDAwcHg7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogYmx1ZXZpb2xldDtcbn1cblxuLnJvdyB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICAvKiBmbGV4LWRpcmVjdGlvbjogY29sdW1uOyAqL1xuICAgIGhlaWdodDogMTAlO1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGJhY2tncm91bmQtY29sb3I6IHBpbms7XG59XG5cbi5jZWxsIHtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBtYXJnaW46IDBweDtcbiAgICBhc3BlY3QtcmF0aW86IDE7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDIyMSwgMjQxLCAyNDEpO1xuICAgIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xufVxuXG4uY2VsbC1jIHtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBtYXJnaW46IDBweDtcbiAgICBhc3BlY3QtcmF0aW86IDE7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDIyMSwgMjQxLCAyNDEpO1xuICAgIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xufVxuXG4uY2VsbDpob3ZlciwgLmNlbGwtYzpob3ZlciB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogYW50aXF1ZXdoaXRlO1xufVxuXG5cbi8qIHN0eWxpbmcgZm9yIGRpYWxvZ3VlIGJveCAqL1xuLmRpYWxvZ3VlLWNvbnRhaW5lciB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIGdyaWQtcm93OiAzIC8gNDtcbn1cblxuLmRpYWxvZ3VlLWJveCB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtZXZlbmx5O1xuICAgIGhlaWdodDogMjB2aDtcbiAgICB3aWR0aDogNDV2dztcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoNzcsIDEzNCwgNzcpO1xufVxuXG4udGV4dC1ib3gxIHtcbiAgICBoZWlnaHQ6IDR2aDtcbiAgICB3aWR0aDogNDB2dztcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBsaWdodGJsdWU7XG59XG5cbi50ZXh0LWJveDIge1xuICAgIGhlaWdodDogNHZoO1xuICAgIHdpZHRoOiA0MHZ3O1xuICAgIGJhY2tncm91bmQtY29sb3I6IGxpZ2h0Ymx1ZTtcbn1cblxuLnRleHQtYm94MyB7XG4gICAgaGVpZ2h0OiA0dmg7XG4gICAgd2lkdGg6IDQwdnc7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogbGlnaHRibHVlO1xufVxuXG5cbi8qIHN0eWxpbmcgZm9yIHJlc2V0IGdhbWUgKi9cbi5lbmQtZ2FtZS1ib3gge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgdG9wOiAyNDVweDtcbiAgICBsZWZ0OiAwO1xuICAgIHJpZ2h0OiAwO1xuICAgIG1hcmdpbi1sZWZ0OiBhdXRvO1xuICAgIG1hcmdpbi1yaWdodDogYXV0bztcbiAgICB3aWR0aDogMjIwcHg7XG4gICAgaGVpZ2h0OiAyMjBweDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBhenVyZTtcbn1cblxuLnJlc2V0LWdhbWUtYnV0dG9uIHtcbiAgICBoZWlnaHQ6IDUwcHg7XG4gICAgd2lkdGg6IDUwcHg7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDE0NCwgNTgsIDU4KTtcbn1gLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9wYWdlU3R5bGluZy5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7SUFDSSxnQkFBZ0I7SUFDaEIsZUFBZTtJQUNmLFdBQVc7QUFDZjs7QUFFQTtJQUNJLHNCQUFzQjtJQUN0QixrQkFBa0I7QUFDdEI7O0FBRUE7SUFDSTtBQUNKOztBQUVBO0lBQ0ksYUFBYTtJQUNiLGlDQUFpQztJQUNqQyxhQUFhO0lBQ2IsWUFBWTtJQUNaLGlDQUFpQztBQUNyQzs7QUFFQTtJQUNJLGFBQWE7SUFDYixlQUFlO0FBQ25COztBQUVBO0lBQ0ksYUFBYTtJQUNiLDZCQUE2QjtJQUM3QixlQUFlO0lBQ2Ysb0NBQW9DO0FBQ3hDOztBQUVBO0lBQ0ksYUFBYTtJQUNiLHVCQUF1QjtJQUN2QixtQkFBbUI7SUFDbkIsZUFBZTtBQUNuQjs7QUFFQTtJQUNJLFlBQVk7SUFDWixXQUFXO0lBQ1gsa0NBQWtDO0FBQ3RDOzs7QUFHQSw4QkFBOEI7QUFDOUI7SUFDSSxZQUFZO0lBQ1osWUFBWTtJQUNaLHdCQUF3QjtJQUN4QixlQUFlO0FBQ25COztBQUVBOztBQUVBOztBQUVBO0lBQ0ksYUFBYTtJQUNiLHNCQUFzQjtJQUN0QixhQUFhO0lBQ2IsWUFBWTtJQUNaLDRCQUE0QjtBQUNoQzs7QUFFQTtJQUNJLGFBQWE7SUFDYiw0QkFBNEI7SUFDNUIsV0FBVztJQUNYLFdBQVc7SUFDWCxzQkFBc0I7QUFDMUI7O0FBRUE7SUFDSSxXQUFXO0lBQ1gsV0FBVztJQUNYLGVBQWU7SUFDZixvQ0FBb0M7SUFDcEMsdUJBQXVCO0FBQzNCOztBQUVBO0lBQ0ksV0FBVztJQUNYLFdBQVc7SUFDWCxlQUFlO0lBQ2Ysb0NBQW9DO0lBQ3BDLHVCQUF1QjtBQUMzQjs7QUFFQTtJQUNJLDhCQUE4QjtBQUNsQzs7O0FBR0EsNkJBQTZCO0FBQzdCO0lBQ0ksYUFBYTtJQUNiLHVCQUF1QjtJQUN2QixtQkFBbUI7SUFDbkIsZUFBZTtBQUNuQjs7QUFFQTtJQUNJLGFBQWE7SUFDYixzQkFBc0I7SUFDdEIsNkJBQTZCO0lBQzdCLFlBQVk7SUFDWixXQUFXO0lBQ1gsa0NBQWtDO0FBQ3RDOztBQUVBO0lBQ0ksV0FBVztJQUNYLFdBQVc7SUFDWCwyQkFBMkI7QUFDL0I7O0FBRUE7SUFDSSxXQUFXO0lBQ1gsV0FBVztJQUNYLDJCQUEyQjtBQUMvQjs7QUFFQTtJQUNJLFdBQVc7SUFDWCxXQUFXO0lBQ1gsMkJBQTJCO0FBQy9COzs7QUFHQSwyQkFBMkI7QUFDM0I7SUFDSSxrQkFBa0I7SUFDbEIsYUFBYTtJQUNiLHVCQUF1QjtJQUN2QixtQkFBbUI7SUFDbkIsVUFBVTtJQUNWLE9BQU87SUFDUCxRQUFRO0lBQ1IsaUJBQWlCO0lBQ2pCLGtCQUFrQjtJQUNsQixZQUFZO0lBQ1osYUFBYTtJQUNiLHVCQUF1QjtBQUMzQjs7QUFFQTtJQUNJLFlBQVk7SUFDWixXQUFXO0lBQ1gsa0NBQWtDO0FBQ3RDXCIsXCJzb3VyY2VzQ29udGVudFwiOltcImh0bWwsIGJvZHkge1xcbiAgICBtaW4taGVpZ2h0OiAxMDAlO1xcbiAgICBtaW4td2lkdGg6IDEwMCU7XFxuICAgIG1hcmdpbjogMHB4O1xcbn1cXG5cXG5ib2R5IHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogbmF2eTtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbn1cXG5cXG4ucHJvbXB0LWJveCB7XFxuICAgIGRpc3BsYXk6IG5vbmVcXG59XFxuXFxuLmdhbWUtY29udGFpbmVyIHtcXG4gICAgZGlzcGxheTogZ3JpZDtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiAxZnIgNGZyIDEuN2ZyO1xcbiAgICBoZWlnaHQ6IDEwMHZoO1xcbiAgICB3aWR0aDogMTAwdnc7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYig1OSwgNTksIDU5KTtcXG59XFxuXFxuLmhlYWRlciB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGdyaWQtcm93OiAxIC8gMjtcXG59XFxuXFxuLmdhbWVib2FyZHMge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcXG4gICAgZ3JpZC1yb3c6IDIgLyAzO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTE0LCAxNTUsIDE1NSk7XFxufVxcblxcbi5kaWFsb2d1ZS1jb250YWluZXIge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgZ3JpZC1yb3c6IDMgLyA0O1xcbn1cXG5cXG4uZGlhbG9ndWUtYm94IHtcXG4gICAgaGVpZ2h0OiAyMHZoO1xcbiAgICB3aWR0aDogNTB2dztcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDc3LCAxMzQsIDc3KTtcXG59XFxuXFxuXFxuLyogZ2FtZWJvYXJkIHdyYXBwZXIgc3R5bGluZyAqL1xcbi5ib2FyZC13cmFwcGVyIHtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbiAgICB3aWR0aDogNDAwcHg7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IGJpc3F1ZTtcXG4gICAgcGFkZGluZzogMCAxNXB4O1xcbn1cXG5cXG4uYm9hcmQtdGl0bGUge1xcblxcbn1cXG5cXG4uZ2FtZWJvYXJkIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgaGVpZ2h0OiA0MDBweDtcXG4gICAgd2lkdGg6IDQwMHB4O1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBibHVldmlvbGV0O1xcbn1cXG5cXG4ucm93IHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgLyogZmxleC1kaXJlY3Rpb246IGNvbHVtbjsgKi9cXG4gICAgaGVpZ2h0OiAxMCU7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBwaW5rO1xcbn1cXG5cXG4uY2VsbCB7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBtYXJnaW46IDBweDtcXG4gICAgYXNwZWN0LXJhdGlvOiAxO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjIxLCAyNDEsIDI0MSk7XFxuICAgIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xcbn1cXG5cXG4uY2VsbC1jIHtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIG1hcmdpbjogMHB4O1xcbiAgICBhc3BlY3QtcmF0aW86IDE7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYigyMjEsIDI0MSwgMjQxKTtcXG4gICAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XFxufVxcblxcbi5jZWxsOmhvdmVyLCAuY2VsbC1jOmhvdmVyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogYW50aXF1ZXdoaXRlO1xcbn1cXG5cXG5cXG4vKiBzdHlsaW5nIGZvciBkaWFsb2d1ZSBib3ggKi9cXG4uZGlhbG9ndWUtY29udGFpbmVyIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGdyaWQtcm93OiAzIC8gNDtcXG59XFxuXFxuLmRpYWxvZ3VlLWJveCB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtZXZlbmx5O1xcbiAgICBoZWlnaHQ6IDIwdmg7XFxuICAgIHdpZHRoOiA0NXZ3O1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoNzcsIDEzNCwgNzcpO1xcbn1cXG5cXG4udGV4dC1ib3gxIHtcXG4gICAgaGVpZ2h0OiA0dmg7XFxuICAgIHdpZHRoOiA0MHZ3O1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBsaWdodGJsdWU7XFxufVxcblxcbi50ZXh0LWJveDIge1xcbiAgICBoZWlnaHQ6IDR2aDtcXG4gICAgd2lkdGg6IDQwdnc7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IGxpZ2h0Ymx1ZTtcXG59XFxuXFxuLnRleHQtYm94MyB7XFxuICAgIGhlaWdodDogNHZoO1xcbiAgICB3aWR0aDogNDB2dztcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogbGlnaHRibHVlO1xcbn1cXG5cXG5cXG4vKiBzdHlsaW5nIGZvciByZXNldCBnYW1lICovXFxuLmVuZC1nYW1lLWJveCB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIHRvcDogMjQ1cHg7XFxuICAgIGxlZnQ6IDA7XFxuICAgIHJpZ2h0OiAwO1xcbiAgICBtYXJnaW4tbGVmdDogYXV0bztcXG4gICAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xcbiAgICB3aWR0aDogMjIwcHg7XFxuICAgIGhlaWdodDogMjIwcHg7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IGF6dXJlO1xcbn1cXG5cXG4ucmVzZXQtZ2FtZS1idXR0b24ge1xcbiAgICBoZWlnaHQ6IDUwcHg7XFxuICAgIHdpZHRoOiA1MHB4O1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTQ0LCA1OCwgNTgpO1xcbn1cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107XG5cbiAgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07XG5cbiAgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9wYWdlU3R5bGluZy5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3BhZ2VTdHlsaW5nLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiB1cGRhdGVyO1xufVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpO1xuXG4gICAgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG4gIGNzcyArPSBvYmouY3NzO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9XG5cbiAgLy8gRm9yIG9sZCBJRVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKCkge30sXG4gICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHt9XG4gICAgfTtcbiAgfVxuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubmMgPSB1bmRlZmluZWQ7IiwiaW1wb3J0ICcuL3BhZ2VTdHlsaW5nLmNzcyc7XG5pbXBvcnQgeyBnYW1lQm9hcmRDb250cm9sbGVyIH0gZnJvbSBcIi4vZ2FtZWJvYXJkQ29udHJvbGxlclwiO1xuaW1wb3J0IHsgaW5pdGlhbGl6ZUdhbWUgfSBmcm9tIFwiLi9nYW1lTG9vcFwiO1xuXG5cblxuaW5pdGlhbGl6ZUdhbWUoKSJdLCJuYW1lcyI6WyJQbGF5ZXIiLCJ1c2VyUGxheWVyIiwiY29tcHV0ZXJQbGF5ZXIiLCJnYW1lQm9hcmRDb250cm9sbGVyIiwiY3JlYXRlRmxlZXQiLCJjcmVhdGVPcHBGbGVldCIsImRvbU1hbmlwdWxhdGlvbiIsImh1bWFuU2hpcFBsYWNlbWVudCIsImluaXRpYWxpemVHYW1lIiwiY3JlYXRlR2FtZSIsInJ1bkRPTSIsImh1bWFuUGxheWVyIiwiaHVtYW5GbGVldCIsImdhbWVCb2FyZCIsInBsYXllciIsImh1bWFuQm9hcmQiLCJjcmVhdGVCb2FyZCIsIkFJcGxheWVyIiwiY29tcHV0ZXJGbGVldCIsImNvbXB1dGVyQm9hcmQiLCJyZW5kZXJHYW1lQm9hcmQiLCJyZW5kZXJEaWFsb2d1ZUJveCIsImh1bWFuUGxhY2VtZW50IiwicmVzZXRJbnRlcmZhY2UiLCJib2R5RSIsImVuZEJveCIsImNvbnNvbGUiLCJsb2ciLCJwbGF5ZXJCb2FyZHMiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJkaWFsb2d1ZUNvbnRhaW5lciIsImdhbWVCb2FyZFdyYXBwZXJzIiwicXVlcnlTZWxlY3RvckFsbCIsImRpYWxvZ3VlQm94IiwiZm9yRWFjaCIsImVsZW1lbnQiLCJyZW1vdmVDaGlsZCIsIlNoaXAiLCJkaWFsb2d1ZUNvbnRyb2xsZXIiLCJkaWFsb2d1ZVJlZnJlc2giLCJmbGVldCIsIm5hbWUiLCJwbGF5ZXJOYW1lIiwiYm9hcmQiLCJzaGlwcyIsImkiLCJqIiwicGxhY2VIb3Jpem9udGFsU2hpcCIsInJvdyIsImNvbCIsInNoaXAiLCJsZW5ndGgiLCJuZXdDb29yZHMiLCJjb29yZHMiLCJwdXNoIiwicGxhY2VWZXJ0aWNhbFNoaXAiLCJyZWNpZXZlQXR0YWNrIiwiYXR0YWNrU3RhdHVzIiwiY2hlY2tJZlVzZWQiLCJjb29yZCIsImhpdCIsInVwZGF0ZUJvYXJkU3BvdCIsIm1vdmVSZXN1bHQiLCJzdW5rQ2hlY2siLCJjaGVja0lmU3VuayIsInN1bmtTaGlwTWVzc2FnZSIsInNwbGljZSIsImNoZWNrQWxsU3VuayIsImVuZEdhbWVNZXNzYWdlIiwiZW5kR2FtZSIsInVzZUdyaWRTcG90IiwiZnJlZXplR3JpZCIsInJlbmRlckVuZEdhbWUiLCJjb25zdHJ1Y3RvciIsInZpc2l0ZWQiLCJwaWNrUmFuZG9tQ2VsbCIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsImNvbHVtbiIsImNvbXBDb29yZHMiLCJyZXBlYXRCb29sZWFuIiwiY2hlY2tSZXBlYXRDZWxsIiwic3RyaW5nZWRDb29yZHMiLCJKU09OIiwic3RyaW5naWZ5IiwiZXhpc3RzQm9vbGVhbiIsInNvbWUiLCJoaXRzIiwiaXNTdW5rIiwiYm9hcmRSdW4iLCJjYXJyaWVyIiwiYmF0dGxlc2hpcCIsImRlc3Ryb3llciIsInN1Ym1hcmluZSIsInBhdHJvbEJvYXQiLCJjdXJyZW50UGxhbmUiLCJodW1hbkNlbGxzIiwiY29tcHV0ZXJQbGFjZW1lbnQiLCJzd2l0Y2hQbGFuZSIsImNvbXB1dGVyTW92ZXMiLCJib2FyZENvbnRyb2xsZXIiLCJpc0NvbXB1dGVyIiwiZ2FtZUJvYXJkV3JhcHBlciIsImNyZWF0ZUVsZW1lbnQiLCJhcHBlbmRFbGVtZW50IiwiYm9hcmRUaXRsZSIsInRleHRDb250ZW50IiwiZ2FtZWJvYXJkIiwiYnVpbGRHcmlkIiwic2V0R3JpZFRyaWdnZXJzIiwiZ2FtZWJvYXJkRWxlbWVudCIsImNlbGwiLCJjb29yZGluYXRlcyIsInNldEF0dHJpYnV0ZSIsImNvbXB1dGVyQm9hcmRDb250cm9sbGVyIiwiaHVtYW5Cb2FyZENvbnRyb2xsZXIiLCJjZWxscyIsImFkZEV2ZW50TGlzdGVuZXIiLCJzdGF0dXMiLCJ1c2VkQ2VsbCIsImdldEVsZW1lbnRCeUlkIiwic3R5bGUiLCJwb2ludGVyRXZlbnRzIiwidGV4dEJveDEiLCJ0ZXh0Qm94MiIsInRleHRCb3gzIiwiYm9keUVsZW1lbnQiLCJib2R5IiwiZW5kR2FtZUJveCIsImVuZEdhbWVJY29uIiwicmVzZXRHYW1lQnV0dG9uIiwiZWxlbWVudE5hbWUiLCJjbGFzc05hbWUiLCJmYXRoZXJFbGVtZW50IiwiY2xhc3NMaXN0IiwiYWRkIiwiYXBwZW5kQ2hpbGQiLCJwbGFjZVNoaXBzTWVzc2FnZSIsImFyZ3VtZW50cyIsInVuZGVmaW5lZCJdLCJzb3VyY2VSb290IjoiIn0=