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
  console.log(humanFleet);
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
  const humanPlacement = (0,_shipPlacement__WEBPACK_IMPORTED_MODULE_4__.humanShipPlacement)(humanBoard, humanFleet);
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

const humanShipPlacement = function (humanBoard, ships) {
  // memory storage for where ships are placed, so new ships
  // can't be placed on top of them
  const occupiedCells = [];

  // this will be either horizontal or vertical
  const currentPlane = 'horizontal';
  const humanCells = document.querySelectorAll('.cell');
  const allShipsPlaced = false;
  const shipIndex = 0;
  if (allShipsPlaced === false) {
    humanCells.forEach(cell => {
      cell.addEventListener('mouseover', () => {
        cellHover(cell, ships[shipIndex]);
      });
      cell.addEventListener('click', () => {
        console.log(cell.id);
      });
    });
  }
  function cellHover(cell, ship) {
    console.log(ship);
    const cellCoords = cell.coordinates;
    console.log(cellCoords);
    // have to check if its horizontal or vertical
    // then check if starting point + ship length is valid

    // if valid, give cell AND its follwers
    // their valid Placement class

    // if invalid give cell + followers invalid class
    if (currentPlane === 'horizontal') {
      if (cellCoords[1] + ship.length - 1 <= 10) {
        console.log('this is valid!');
        cell.classList.add('valid-placement');
      }
      ;
    } else if (currentPlane === 'vertical') {}
  }
  return {
    cellHover
  };
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
}


/* styling for ship Placement */

.valid-placement {
    background-color: rgb(110, 189, 110);
}`, "",{"version":3,"sources":["webpack://./src/pageStyling.css"],"names":[],"mappings":"AAAA;IACI,gBAAgB;IAChB,eAAe;IACf,WAAW;AACf;;AAEA;IACI,sBAAsB;IACtB,kBAAkB;AACtB;;AAEA;IACI;AACJ;;AAEA;IACI,aAAa;IACb,iCAAiC;IACjC,aAAa;IACb,YAAY;IACZ,iCAAiC;AACrC;;AAEA;IACI,aAAa;IACb,eAAe;AACnB;;AAEA;IACI,aAAa;IACb,6BAA6B;IAC7B,eAAe;IACf,oCAAoC;AACxC;;AAEA;IACI,aAAa;IACb,uBAAuB;IACvB,mBAAmB;IACnB,eAAe;AACnB;;AAEA;IACI,YAAY;IACZ,WAAW;IACX,kCAAkC;AACtC;;;AAGA,8BAA8B;AAC9B;IACI,YAAY;IACZ,YAAY;IACZ,wBAAwB;IACxB,eAAe;AACnB;;AAEA;;AAEA;;AAEA;IACI,aAAa;IACb,sBAAsB;IACtB,aAAa;IACb,YAAY;IACZ,4BAA4B;AAChC;;AAEA;IACI,aAAa;IACb,4BAA4B;IAC5B,WAAW;IACX,WAAW;IACX,sBAAsB;AAC1B;;AAEA;IACI,WAAW;IACX,WAAW;IACX,eAAe;IACf,oCAAoC;IACpC,uBAAuB;AAC3B;;AAEA;IACI,WAAW;IACX,WAAW;IACX,eAAe;IACf,oCAAoC;IACpC,uBAAuB;AAC3B;;AAEA;IACI,8BAA8B;AAClC;;;AAGA,6BAA6B;AAC7B;IACI,aAAa;IACb,uBAAuB;IACvB,mBAAmB;IACnB,eAAe;AACnB;;AAEA;IACI,aAAa;IACb,sBAAsB;IACtB,6BAA6B;IAC7B,YAAY;IACZ,WAAW;IACX,kCAAkC;AACtC;;AAEA;IACI,WAAW;IACX,WAAW;IACX,2BAA2B;AAC/B;;AAEA;IACI,WAAW;IACX,WAAW;IACX,2BAA2B;AAC/B;;AAEA;IACI,WAAW;IACX,WAAW;IACX,2BAA2B;AAC/B;;;AAGA,2BAA2B;AAC3B;IACI,kBAAkB;IAClB,aAAa;IACb,uBAAuB;IACvB,mBAAmB;IACnB,UAAU;IACV,OAAO;IACP,QAAQ;IACR,iBAAiB;IACjB,kBAAkB;IAClB,YAAY;IACZ,aAAa;IACb,uBAAuB;AAC3B;;AAEA;IACI,YAAY;IACZ,WAAW;IACX,kCAAkC;AACtC;;;AAGA,+BAA+B;;AAE/B;IACI,oCAAoC;AACxC","sourcesContent":["html, body {\n    min-height: 100%;\n    min-width: 100%;\n    margin: 0px;\n}\n\nbody {\n    background-color: navy;\n    position: relative;\n}\n\n.prompt-box {\n    display: none\n}\n\n.game-container {\n    display: grid;\n    grid-template-rows: 1fr 4fr 1.7fr;\n    height: 100vh;\n    width: 100vw;\n    background-color: rgb(59, 59, 59);\n}\n\n.header {\n    display: flex;\n    grid-row: 1 / 2;\n}\n\n.gameboards {\n    display: flex;\n    justify-content: space-around;\n    grid-row: 2 / 3;\n    background-color: rgb(114, 155, 155);\n}\n\n.dialogue-container {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    grid-row: 3 / 4;\n}\n\n.dialogue-box {\n    height: 20vh;\n    width: 50vw;\n    background-color: rgb(77, 134, 77);\n}\n\n\n/* gameboard wrapper styling */\n.board-wrapper {\n    height: 100%;\n    width: 400px;\n    background-color: bisque;\n    padding: 0 15px;\n}\n\n.board-title {\n\n}\n\n.gameboard {\n    display: flex;\n    flex-direction: column;\n    height: 400px;\n    width: 400px;\n    background-color: blueviolet;\n}\n\n.row {\n    display: flex;\n    /* flex-direction: column; */\n    height: 10%;\n    width: 100%;\n    background-color: pink;\n}\n\n.cell {\n    width: 100%;\n    margin: 0px;\n    aspect-ratio: 1;\n    background-color: rgb(221, 241, 241);\n    border: 1px solid black;\n}\n\n.cell-c {\n    width: 100%;\n    margin: 0px;\n    aspect-ratio: 1;\n    background-color: rgb(221, 241, 241);\n    border: 1px solid black;\n}\n\n.cell:hover, .cell-c:hover {\n    background-color: antiquewhite;\n}\n\n\n/* styling for dialogue box */\n.dialogue-container {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    grid-row: 3 / 4;\n}\n\n.dialogue-box {\n    display: flex;\n    flex-direction: column;\n    justify-content: space-evenly;\n    height: 20vh;\n    width: 45vw;\n    background-color: rgb(77, 134, 77);\n}\n\n.text-box1 {\n    height: 4vh;\n    width: 40vw;\n    background-color: lightblue;\n}\n\n.text-box2 {\n    height: 4vh;\n    width: 40vw;\n    background-color: lightblue;\n}\n\n.text-box3 {\n    height: 4vh;\n    width: 40vw;\n    background-color: lightblue;\n}\n\n\n/* styling for reset game */\n.end-game-box {\n    position: absolute;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    top: 245px;\n    left: 0;\n    right: 0;\n    margin-left: auto;\n    margin-right: auto;\n    width: 220px;\n    height: 220px;\n    background-color: azure;\n}\n\n.reset-game-button {\n    height: 50px;\n    width: 50px;\n    background-color: rgb(144, 58, 58);\n}\n\n\n/* styling for ship Placement */\n\n.valid-placement {\n    background-color: rgb(110, 189, 110);\n}"],"sourceRoot":""}]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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REFBZ0QsYUFBYTtXQUM3RDs7Ozs7V0NOQTs7Ozs7Ozs7Ozs7Ozs7QUNBMkI7QUFDaUM7QUFDaEI7QUFJNUM3RCx5REFBYyxDQUFDLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL21haW4tdGVtcGxhdGUvLi9zcmMvZ2FtZUxvb3AuanMiLCJ3ZWJwYWNrOi8vbWFpbi10ZW1wbGF0ZS8uL3NyYy9nYW1lYm9hcmRDb250cm9sbGVyLmpzIiwid2VicGFjazovL21haW4tdGVtcGxhdGUvLi9zcmMvcGxheWVyLmpzIiwid2VicGFjazovL21haW4tdGVtcGxhdGUvLi9zcmMvc2hpcC1vYmplY3QuanMiLCJ3ZWJwYWNrOi8vbWFpbi10ZW1wbGF0ZS8uL3NyYy9zaGlwUGxhY2VtZW50LmpzIiwid2VicGFjazovL21haW4tdGVtcGxhdGUvLi9zcmMvdXNlckludGVyZmFjZS5qcyIsIndlYnBhY2s6Ly9tYWluLXRlbXBsYXRlLy4vc3JjL3BhZ2VTdHlsaW5nLmNzcyIsIndlYnBhY2s6Ly9tYWluLXRlbXBsYXRlLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly9tYWluLXRlbXBsYXRlLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vbWFpbi10ZW1wbGF0ZS8uL3NyYy9wYWdlU3R5bGluZy5jc3M/YTliNyIsIndlYnBhY2s6Ly9tYWluLXRlbXBsYXRlLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL21haW4tdGVtcGxhdGUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL21haW4tdGVtcGxhdGUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vbWFpbi10ZW1wbGF0ZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9tYWluLXRlbXBsYXRlLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vbWFpbi10ZW1wbGF0ZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL21haW4tdGVtcGxhdGUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbWFpbi10ZW1wbGF0ZS93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9tYWluLXRlbXBsYXRlL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9tYWluLXRlbXBsYXRlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vbWFpbi10ZW1wbGF0ZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL21haW4tdGVtcGxhdGUvd2VicGFjay9ydW50aW1lL25vbmNlIiwid2VicGFjazovL21haW4tdGVtcGxhdGUvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L3ByZWZlci1kZWZhdWx0LWV4cG9ydCAqL1xuaW1wb3J0IHsgUGxheWVyLCB1c2VyUGxheWVyLCBjb21wdXRlclBsYXllciB9IGZyb20gXCIuL3BsYXllclwiO1xuaW1wb3J0IHsgZ2FtZUJvYXJkQ29udHJvbGxlciB9IGZyb20gXCIuL2dhbWVib2FyZENvbnRyb2xsZXJcIjtcbmltcG9ydCB7IGNyZWF0ZUZsZWV0LCBjcmVhdGVPcHBGbGVldCB9IGZyb20gXCIuL3NoaXAtb2JqZWN0XCI7XG5pbXBvcnQgeyBkb21NYW5pcHVsYXRpb24gfSBmcm9tIFwiLi91c2VySW50ZXJmYWNlXCI7XG5pbXBvcnQgeyBodW1hblNoaXBQbGFjZW1lbnQgfSBmcm9tIFwiLi9zaGlwUGxhY2VtZW50XCI7XG5cbmV4cG9ydCBjb25zdCBpbml0aWFsaXplR2FtZSA9IGZ1bmN0aW9uIGNyZWF0ZUdhbWUoKSB7XG4gICAgY29uc3QgcnVuRE9NID0gZG9tTWFuaXB1bGF0aW9uKCk7XG5cbiAgICBjb25zdCBodW1hblBsYXllciA9IG5ldyBQbGF5ZXIoJ1BsYXllciAxJylcbiAgICBjb25zdCBodW1hbkZsZWV0ID0gY3JlYXRlRmxlZXQoKVxuICAgIGNvbnNvbGUubG9nKGh1bWFuRmxlZXQpXG4gICAgaHVtYW5QbGF5ZXIuZ2FtZUJvYXJkID0gZ2FtZUJvYXJkQ29udHJvbGxlcihodW1hbkZsZWV0LCBodW1hblBsYXllci5wbGF5ZXIpO1xuICAgIGNvbnN0IGh1bWFuQm9hcmQgPSBodW1hblBsYXllci5nYW1lQm9hcmRcbiAgICBodW1hbkJvYXJkLmNyZWF0ZUJvYXJkKCk7XG4gICAgXG5cbiAgICBjb25zdCBBSXBsYXllciA9IG5ldyBQbGF5ZXIoJ1BsYXllciAyJyk7XG4gICAgY29uc3QgY29tcHV0ZXJGbGVldCA9IGNyZWF0ZU9wcEZsZWV0KCk7XG4gICAgQUlwbGF5ZXIuZ2FtZUJvYXJkID0gZ2FtZUJvYXJkQ29udHJvbGxlcihjb21wdXRlckZsZWV0LCBBSXBsYXllci5wbGF5ZXIpO1xuICAgIGNvbnN0IGNvbXB1dGVyQm9hcmQgPSBBSXBsYXllci5nYW1lQm9hcmQ7XG4gICAgY29tcHV0ZXJCb2FyZC5jcmVhdGVCb2FyZCgpO1xuXG4gICAgXG4gICAgcnVuRE9NLnJlbmRlckdhbWVCb2FyZChjb21wdXRlckJvYXJkLmNyZWF0ZUJvYXJkKCksIEFJcGxheWVyLnBsYXllcik7XG4gICAgcnVuRE9NLnJlbmRlckdhbWVCb2FyZChjb21wdXRlckJvYXJkLCBodW1hblBsYXllci5wbGF5ZXIsIGh1bWFuQm9hcmQpO1xuICAgIFxuICAgIC8vIGNhbGwgcmVuZGVyIGRpYWxvZ3VlIGJveCBoZXJlXG4gICAgcnVuRE9NLnJlbmRlckRpYWxvZ3VlQm94KCk7XG5cbiAgICAvLyBjYWxsIHNoaXBQbGFjZW1lbnQgZnVuY3Rpb24gaGVyZSBmb3IgaHVtYW5Cb2FyZFxuICAgIGNvbnN0IGh1bWFuUGxhY2VtZW50ID0gaHVtYW5TaGlwUGxhY2VtZW50KGh1bWFuQm9hcmQsIGh1bWFuRmxlZXQpO1xufVxuXG5leHBvcnQgY29uc3QgcmVzZXRJbnRlcmZhY2UgPSBmdW5jdGlvbiAoYm9keUUsIGVuZEJveCkge1xuICAgIGNvbnNvbGUubG9nKCdyZXNldGluZyBhbGwgdGhpcyBzaGl0Jyk7XG4gICAgY29uc3QgcGxheWVyQm9hcmRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdhbWVib2FyZHMnKTtcbiAgICBjb25zdCBkaWFsb2d1ZUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kaWFsb2d1ZS1jb250YWluZXInKTtcblxuICAgIGNvbnN0IGdhbWVCb2FyZFdyYXBwZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmJvYXJkLXdyYXBwZXInKTtcbiAgICBjb25zdCBkaWFsb2d1ZUJveCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kaWFsb2d1ZS1ib3gnKTtcbiAgICAvLyBjb25zb2xlLmxvZyhwbGF5ZXJCb2FyZHMsIGRpYWxvZ3VlQ29udGFpbmVyLCBnYW1lQm9hcmRXcmFwcGVycywgZGlhbG9ndWVCb3gpXG4gICAgY29uc29sZS5sb2coYm9keUUsIGVuZEJveClcblxuICAgIGdhbWVCb2FyZFdyYXBwZXJzLmZvckVhY2goKGVsZW1lbnQpID0+IHtcbiAgICAgICAgcGxheWVyQm9hcmRzLnJlbW92ZUNoaWxkKGVsZW1lbnQpO1xuICAgIH0pO1xuICAgIGRpYWxvZ3VlQ29udGFpbmVyLnJlbW92ZUNoaWxkKGRpYWxvZ3VlQm94KTtcbiAgICBib2R5RS5yZW1vdmVDaGlsZChlbmRCb3gpO1xuXG4gICAgaW5pdGlhbGl6ZUdhbWUoKTtcblxufSIsIi8qIGVzbGludC1kaXNhYmxlIG5vLXVzZS1iZWZvcmUtZGVmaW5lICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1lbHNlLXJldHVybiAqL1xuLyogZXNsaW50LWRpc2FibGUgbm8tbG9vcC1mdW5jICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1wbHVzcGx1cyAqL1xuLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L3ByZWZlci1kZWZhdWx0LWV4cG9ydCAqL1xuXG4vLyBnYW1lQm9hcmQgc2hvdWxkIGNoZWNrIGlmIGEgZ2FtZSBpcyBvdmVyIGJ5IHNlZWluZyBpZiB0aGVcbi8vIGxlbmd0aCBvZiBcInNoaXBzXCIgaXMgemVybyAoY2hlY2tBbGxTdW5rKVxuXG4vLyBwbGFjaW5nIHNoaXBzIHZlcnRpY2FsbHkuLi4gcG9zc2libGUgaWRlYTogaGF2ZSBhIGNvbHVtbiBudW1iZXIgKGUuZyAzKVxuLy8gdGhhdCB5b3UgdXNlIHRvIHNlbGVjdCB0aGUgY29ycmVzcG9uZGluZyBhcnJheSBpdGVtIGluIGVhY2hcbi8vIG9mIHRoZSBhcnJheXMgdGhhdCByZXByZXNlbnRzIGEgcm93IG9uIHRoZSBib2FyZFxuaW1wb3J0IHsgU2hpcCwgY3JlYXRlRmxlZXQgfSBmcm9tIFwiLi9zaGlwLW9iamVjdFwiXG5pbXBvcnQgeyBkb21NYW5pcHVsYXRpb24sIGRpYWxvZ3VlQ29udHJvbGxlciB9IGZyb20gXCIuL3VzZXJJbnRlcmZhY2VcIjtcblxuY29uc3QgcnVuRE9NID0gZG9tTWFuaXB1bGF0aW9uKCk7XG5jb25zdCBkaWFsb2d1ZVJlZnJlc2ggPSBkaWFsb2d1ZUNvbnRyb2xsZXIoKTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdhbWVCb2FyZENvbnRyb2xsZXIoZmxlZXQsIG5hbWUpIHtcbiAgICBjb25zdCBwbGF5ZXJOYW1lID0gbmFtZTtcbiAgICBjb25zdCBib2FyZCA9IFtdO1xuICAgIGNvbnN0IHNoaXBzID0gZmxlZXQ7XG5cbiAgICAvLyBjb25zb2xlLmxvZyhzaGlwcyk7XG5cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZUJvYXJkKCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICAgICAgICAgIGJvYXJkW2ldID0gW107XG5cbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGorKykge1xuICAgICAgICAgICAgICAgIGJvYXJkW2ldW2pdID0gZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyhib2FyZCk7XG4gICAgICAgIHJldHVybiBib2FyZFxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBsYWNlSG9yaXpvbnRhbFNoaXAocm93LCBjb2wsIHNoaXApIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBuZXdDb29yZHMgPSBbcm93LCBjb2wgKyBpXTtcbiAgICAgICAgICAgIC8vIHB1dCBhIGNoZWNrIGhlcmUgdG8gc2VlIGlmIHRoaXMgY29uZmxpY3RzIHdpdGhcbiAgICAgICAgICAgIC8vIGFueSBvdGhlciBzaGlwJ3MgY29vcmRzIFxuICAgICAgICAgICAgc2hpcC5jb29yZHMucHVzaChuZXdDb29yZHMpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNoaXBcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwbGFjZVZlcnRpY2FsU2hpcChyb3csIGNvbCwgc2hpcCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IG5ld0Nvb3JkcyA9IFtyb3cgKyBpLCBjb2xdO1xuICAgICAgICAgICAgLy8gcHV0IGEgY2hlY2sgaGVyZSB0byBzZWUgaWYgdGhpcyBjb25mbGljdHMgd2l0aFxuICAgICAgICAgICAgLy8gYW55IG90aGVyIHNoaXAncyBjb29yZHMgXG4gICAgICAgICAgICBzaGlwLmNvb3Jkcy5wdXNoKG5ld0Nvb3Jkcyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNoaXBcbiAgICB9XG4gICAgXG4gICAgZnVuY3Rpb24gcmVjaWV2ZUF0dGFjayhjb29yZHMpIHtcbiAgICAgICAgY29uc29sZS5sb2coY29vcmRzKVxuICAgICAgICBsZXQgYXR0YWNrU3RhdHVzID0gJ21pc3MnO1xuXG4gICAgICAgIC8vIGNoZWNrIHRvIHNlZSBpZiBjb29yZHMgaGF2ZSBhbHJlYWR5IGJlZW4gdXNlZDpcbiAgICAgICAgaWYgKGNoZWNrSWZVc2VkKGNvb3JkcykgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHJldHVybiAnZmlsbGVkIGFscmVhZHknXG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBzaGlwc1tpXS5jb29yZHMuZm9yRWFjaCgoY29vcmQpID0+IHtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAoY2hlY2tJZlVzZWQoY29vcmRzKSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ2ZpbGxlZCBhbHJlYWR5J1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChjb29yZFswXSA9PT0gY29vcmRzWzBdICYmIGNvb3JkWzFdID09PSBjb29yZHNbMV0pIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2hpdCcpO1xuICAgICAgICAgICAgICAgICAgICBhdHRhY2tTdGF0dXMgPSAnaGl0J1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhhdHRhY2tTdGF0dXMpXG4gICAgICAgICAgICAgICAgICAgIHNoaXBzW2ldLmhpdCgpO1xuICAgICAgICAgICAgICAgICAgICB1cGRhdGVCb2FyZFNwb3QoY29vcmRzKTtcbiAgICAgICAgICAgICAgICAgICAgZGlhbG9ndWVSZWZyZXNoLm1vdmVSZXN1bHQoYXR0YWNrU3RhdHVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGxheWVyTmFtZSwgY29vcmRzLCBzaGlwc1tpXSlcblxuICAgICAgICAgICAgICAgICAgICBjb25zdCBzdW5rQ2hlY2sgPSBzaGlwc1tpXS5jaGVja0lmU3VuaygpXG4gICAgICAgICAgICAgICAgICAgIGlmIChzdW5rQ2hlY2spIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpYWxvZ3VlUmVmcmVzaC5zdW5rU2hpcE1lc3NhZ2Uoc2hpcHNbaV0sIHBsYXllck5hbWUpXG4gICAgICAgICAgICAgICAgICAgICAgICBzaGlwcy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGVja0FsbFN1bmsoKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgdXBkYXRlQm9hcmRTcG90KGNvb3JkcywgYXR0YWNrU3RhdHVzKTtcbiAgICAgICAgaWYgKGF0dGFja1N0YXR1cyA9PT0gJ21pc3MnKSB7XG4gICAgICAgICAgICBkaWFsb2d1ZVJlZnJlc2gubW92ZVJlc3VsdChhdHRhY2tTdGF0dXMsXG4gICAgICAgICAgICAgICAgcGxheWVyTmFtZSwgY29vcmRzKVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gYXR0YWNrU3RhdHVzXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2hlY2tBbGxTdW5rKCkge1xuICAgICAgICBjb25zb2xlLmxvZyhzaGlwcyk7XG4gICAgICAgIGlmIChzaGlwcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIGRpYWxvZ3VlUmVmcmVzaC5lbmRHYW1lTWVzc2FnZShwbGF5ZXJOYW1lKVxuICAgICAgICAgICAgZW5kR2FtZSgpXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVCb2FyZFNwb3QoY29vcmRzLCBhdHRhY2tTdGF0dXMpIHtcbiAgICAgICAgYm9hcmRbY29vcmRzWzBdIC0gMV1bY29vcmRzWzFdIC0gMV0gPSB0cnVlO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhib2FyZClcbiAgICAgICAgcnVuRE9NLnVzZUdyaWRTcG90KGNvb3JkcywgYXR0YWNrU3RhdHVzLCBwbGF5ZXJOYW1lKVxuICAgICAgICByZXR1cm4gYm9hcmRcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjaGVja0lmVXNlZChjb29yZHMpIHtcbiAgICAgICAgaWYgKGJvYXJkW2Nvb3Jkc1swXSAtIDFdW2Nvb3Jkc1sxXSAtIDFdID09PSB0cnVlKSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnYWxyZWFkeSB1c2VkJylcbiAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIFxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGVuZEdhbWUoKSB7XG4gICAgICAgIC8vIHdhbnQgdG8gZGlzYWJsZSBib3RoIGdhbWVCb2FyZHNcbiAgICAgICAgLy8gd2FudCB0byBtYWtlIHRoZSByZXN0YXJ0IGJ1dHRvbiBhcHBlYXJcbiAgICAgICAgY29uc29sZS5sb2coJ2VuZGluZyBnYW1lJyk7XG4gICAgICAgIHJ1bkRPTS5mcmVlemVHcmlkKCk7XG4gICAgICAgIHJ1bkRPTS5yZW5kZXJFbmRHYW1lKCk7XG4gICAgfVxuICAgIC8vIGxpa2VseSB3aWxsIGhhdmUgdG8gaW1wbGVtZW50IGNoZWNrIHRvIG1ha2Ugc3VyZSBhIHNoaXAgY2FuXG4gICAgLy8gYmUgcGxhY2VkIHdpdGggbm8gb3ZlcmxhcFxuXG5cbiAgICByZXR1cm4geyBjcmVhdGVCb2FyZCwgcGxhY2VIb3Jpem9udGFsU2hpcCwgcGxhY2VWZXJ0aWNhbFNoaXAsIHJlY2lldmVBdHRhY2ssXG4gICAgY2hlY2tBbGxTdW5rLCB1cGRhdGVCb2FyZFNwb3QsIGNoZWNrSWZVc2VkLCBlbmRHYW1lIH1cbn1cblxuIiwiLy8gY3JlYXRlIGJvdGggdGhlIHVzZXIgcGxheWVyIGFuZCB0aGUgY29tcHV0ZXIgcGxheWVyIGhlcmVcblxuLy8gY29tcHV0ZXIgcGxheWVyIGhhcyBhdHRhY2sgY29vcmRpbmF0ZXMgZ2VuZXJhdG9yIGZ1bmN0aW9uXG5pbXBvcnQgeyBnYW1lQm9hcmRDb250cm9sbGVyIH0gZnJvbSBcIi4vZ2FtZWJvYXJkQ29udHJvbGxlclwiO1xuXG5leHBvcnQgY2xhc3MgUGxheWVyIHtcbiAgICBjb25zdHJ1Y3RvcihwbGF5ZXIsIGdhbWVCb2FyZCkge1xuICAgICAgICB0aGlzLnBsYXllciA9IHBsYXllcjtcbiAgICAgICAgLy8gdGhpcy5wbGF5ZXJTaGlwcyA9IFtdXG4gICAgICAgIHRoaXMuZ2FtZUJvYXJkPSBudWxsXG4gICAgfVxufVxuXG5cbmV4cG9ydCBjb25zdCB1c2VyUGxheWVyID0gZnVuY3Rpb24gKCkge1xuXG59XG5cbmV4cG9ydCBjb25zdCBjb21wdXRlclBsYXllciA9IGZ1bmN0aW9uICgpIHtcbiAgICBjb25zdCB2aXNpdGVkID0gW107XG5cbiAgICBmdW5jdGlvbiBwaWNrUmFuZG9tQ2VsbChodW1hbkJvYXJkKSB7XG4gICAgICAgIGNvbnN0IHJvdyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKSArIDFcbiAgICAgICAgY29uc3QgY29sdW1uID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApICsgMVxuICAgICAgICBjb25zdCBjb21wQ29vcmRzID0gW3JvdywgY29sdW1uXTtcblxuICAgICAgICBjb25zdCByZXBlYXRCb29sZWFuID0gY2hlY2tSZXBlYXRDZWxsKGNvbXBDb29yZHMpXG4gICAgICAgIGNvbnNvbGUubG9nKHJlcGVhdEJvb2xlYW4pXG4gICAgICAgIGlmIChyZXBlYXRCb29sZWFuID09PSB0cnVlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnY29tcHV0ZXIgcGlja2VkIHVzZWQgY2VsbCEhJylcbiAgICAgICAgICAgIHBpY2tSYW5kb21DZWxsKGh1bWFuQm9hcmQpO1xuICAgICAgICB9IGVsc2UgaWYgKHJlcGVhdEJvb2xlYW4gPT09IGZhbHNlKSB7XG4gICAgICAgICAgICB2aXNpdGVkLnB1c2goY29tcENvb3Jkcyk7XG4gICAgICAgICAgICBodW1hbkJvYXJkLnJlY2lldmVBdHRhY2soY29tcENvb3Jkcyk7XG5cbiAgICAgICAgICAgIHJldHVybiBjb21wQ29vcmRzIFxuICAgICAgICB9XG4gICAgICAgIFxuXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2hlY2tSZXBlYXRDZWxsKGNvb3Jkcykge1xuICAgICAgICBjb25zdCBzdHJpbmdlZENvb3JkcyA9IEpTT04uc3RyaW5naWZ5KGNvb3Jkcyk7XG4gICAgICAgIGNvbnNvbGUubG9nKHN0cmluZ2VkQ29vcmRzKVxuICAgICAgICBjb25zdCBleGlzdHNCb29sZWFuID0gdmlzaXRlZC5zb21lKChjb29yZCkgPT4gSlNPTi5zdHJpbmdpZnkoY29vcmQpID09PSBzdHJpbmdlZENvb3JkcylcbiAgICAgICAgY29uc29sZS5sb2coZXhpc3RzQm9vbGVhbilcbiAgICAgICAgcmV0dXJuIGV4aXN0c0Jvb2xlYW5cbiAgICB9XG5cbiAgICByZXR1cm4ge3BpY2tSYW5kb21DZWxsLCBjaGVja1JlcGVhdENlbGx9XG59IiwiLyogZXNsaW50LWRpc2FibGUgbm8tZWxzZS1yZXR1cm4gKi9cbi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9wcmVmZXItZGVmYXVsdC1leHBvcnQgKi9cbmltcG9ydCB7IGdhbWVCb2FyZENvbnRyb2xsZXIgfSBmcm9tIFwiLi9nYW1lYm9hcmRDb250cm9sbGVyXCI7XG5cbmV4cG9ydCBjbGFzcyBTaGlwIHtcbiAgICBjb25zdHJ1Y3RvcihsZW5ndGgsIG5hbWUsIGhpdHMsIGlzU3VuaywgY29vcmRzKSB7XG4gICAgICAgIHRoaXMubGVuZ3RoID0gbGVuZ3RoO1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLmhpdHMgPSAwO1xuICAgICAgICB0aGlzLmlzU3VuayA9IGZhbHNlO1xuICAgICAgICB0aGlzLmNvb3JkcyA9IFtdXG4gICAgfVxuXG4gICAgaGl0KCkge1xuICAgICAgICB0aGlzLmhpdHMgKz0gMVxuICAgICAgICBjb25zb2xlLmxvZygnaGl0IGFkZGVkJylcbiAgICB9XG5cbiAgICBjaGVja0lmU3VuaygpIHtcbiAgICAgICAgaWYgKHRoaXMubGVuZ3RoID09PSB0aGlzLmhpdHMpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdTdW5rIScpXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5sZW5ndGgpO1xuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5oaXRzKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgfVxuXG59XG5cbmNvbnN0IGJvYXJkUnVuID0gZ2FtZUJvYXJkQ29udHJvbGxlcigpO1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRmxlZXQoKSB7XG4gICAgY29uc3Qgc2hpcHMgPSBbXVxuXG4gICAgY29uc3QgY2FycmllciA9IG5ldyBTaGlwKDUsICdDYXJyaWVyJyk7XG4gICAgY29uc3QgYmF0dGxlc2hpcCA9IG5ldyBTaGlwKDQsICdCYXR0bGVzaGlwJyk7XG4gICAgY29uc3QgZGVzdHJveWVyID0gbmV3IFNoaXAoMywgJ0Rlc3Ryb3llcicpO1xuICAgIGNvbnN0IHN1Ym1hcmluZSA9IG5ldyBTaGlwKDMsICdTdWJtYXJpbmUnKTtcbiAgICBjb25zdCBwYXRyb2xCb2F0ID0gbmV3IFNoaXAoMiwgJ1BhdHJvbCBCb2F0Jyk7XG4gXG4gICAgc2hpcHMucHVzaChjYXJyaWVyLCBiYXR0bGVzaGlwLCBkZXN0cm95ZXIsIHN1Ym1hcmluZSwgcGF0cm9sQm9hdClcblxuICAgIGJvYXJkUnVuLnBsYWNlSG9yaXpvbnRhbFNoaXAoMSwgNSwgY2Fycmllcik7XG4gICAgYm9hcmRSdW4ucGxhY2VWZXJ0aWNhbFNoaXAoNCwxLCBiYXR0bGVzaGlwKVxuICAgIGJvYXJkUnVuLnBsYWNlSG9yaXpvbnRhbFNoaXAoNywgNCwgZGVzdHJveWVyKTtcbiAgICBib2FyZFJ1bi5wbGFjZVZlcnRpY2FsU2hpcCg3LCA4LCBzdWJtYXJpbmUpO1xuICAgIGJvYXJkUnVuLnBsYWNlSG9yaXpvbnRhbFNoaXAoMiwgNiwgcGF0cm9sQm9hdCk7XG4gICAgY29uc29sZS5sb2coc2hpcHMpO1xuICAgIHJldHVybiBzaGlwc1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlT3BwRmxlZXQoKSB7XG4gICAgY29uc3Qgc2hpcHMgPSBbXVxuXG4gICAgY29uc3QgY2FycmllciA9IG5ldyBTaGlwKDUsICdDYXJyaWVyJyk7XG4gICAgY29uc3QgYmF0dGxlc2hpcCA9IG5ldyBTaGlwKDQsICdCYXR0bGVzaGlwJyk7XG4gICAgY29uc3QgZGVzdHJveWVyID0gbmV3IFNoaXAoMywgJ0Rlc3Ryb3llcicpO1xuICAgIGNvbnN0IHN1Ym1hcmluZSA9IG5ldyBTaGlwKDMsICdTdWJtYXJpbmUnKTtcbiAgICBjb25zdCBwYXRyb2xCb2F0ID0gbmV3IFNoaXAoMiwgJ1BhdHJvbCBCb2F0Jyk7XG5cbiAgICBzaGlwcy5wdXNoKGNhcnJpZXIsIGJhdHRsZXNoaXAsIGRlc3Ryb3llciwgc3VibWFyaW5lLCBwYXRyb2xCb2F0KTtcblxuICAgIGJvYXJkUnVuLnBsYWNlSG9yaXpvbnRhbFNoaXAoMSwgMSwgY2Fycmllcik7XG4gICAgYm9hcmRSdW4ucGxhY2VWZXJ0aWNhbFNoaXAoNCwyLCBiYXR0bGVzaGlwKVxuICAgIGJvYXJkUnVuLnBsYWNlSG9yaXpvbnRhbFNoaXAoNiwgNiwgZGVzdHJveWVyKTtcbiAgICBib2FyZFJ1bi5wbGFjZVZlcnRpY2FsU2hpcCg3LCA4LCBzdWJtYXJpbmUpO1xuICAgIGJvYXJkUnVuLnBsYWNlSG9yaXpvbnRhbFNoaXAoMywgNywgcGF0cm9sQm9hdCk7XG4gICAgY29uc29sZS5sb2coc2hpcHMpO1xuICAgIHJldHVybiBzaGlwc1xufSIsIi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9wcmVmZXItZGVmYXVsdC1leHBvcnQgKi9cblxuLy8gdGhpcyB3aWxsIGhvdXNlIHRoZSBmdW5jdGlvbiB0aGF0IGNoZWNrcyB0byBzZWUgaWYgQUxMIGNvb3Jkc1xuLy8gYXJlIHN0YXlpbmcgaW4gYm91bmRzIG9mIHRoZSBnYW1lQm9hcmRcblxuLy8gaGF2ZSB0byBhZGQgYnV0dG9ucyB0byBVSSB0byBzd2l0Y2ggYmV0d2VuIGhvcml6b250YWwgYW5kIHZlcnRpY2FsXG4vLyBoYXZlIHRvIG1ha2UgYSBzdGFydCBidXR0b24gdGhhdCB1c2VyIGNhbiBwcmVzcyB3aGVuIGFsbCBcbi8vIHNoaXBzIGFyZSBwbGFjZWRcblxuXG5leHBvcnQgY29uc3QgaHVtYW5TaGlwUGxhY2VtZW50ID0gZnVuY3Rpb24gKGh1bWFuQm9hcmQsIHNoaXBzKSB7XG4gICAgLy8gbWVtb3J5IHN0b3JhZ2UgZm9yIHdoZXJlIHNoaXBzIGFyZSBwbGFjZWQsIHNvIG5ldyBzaGlwc1xuICAgIC8vIGNhbid0IGJlIHBsYWNlZCBvbiB0b3Agb2YgdGhlbVxuICAgIGNvbnN0IG9jY3VwaWVkQ2VsbHMgPSBbXTtcblxuICAgIC8vIHRoaXMgd2lsbCBiZSBlaXRoZXIgaG9yaXpvbnRhbCBvciB2ZXJ0aWNhbFxuICAgIGNvbnN0IGN1cnJlbnRQbGFuZSA9ICdob3Jpem9udGFsJztcbiAgICBjb25zdCBodW1hbkNlbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNlbGwnKTtcbiAgICBcbiAgICBjb25zdCBhbGxTaGlwc1BsYWNlZCA9IGZhbHNlO1xuICAgIGNvbnN0IHNoaXBJbmRleCA9IDA7XG5cbiAgICBpZiAoYWxsU2hpcHNQbGFjZWQgPT09IGZhbHNlKSB7XG4gICAgICAgIGh1bWFuQ2VsbHMuZm9yRWFjaCgoY2VsbCkgPT4ge1xuICAgICAgICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY2VsbEhvdmVyKGNlbGwsIHNoaXBzW3NoaXBJbmRleF0pXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coY2VsbC5pZClcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KVxuICAgIH1cbiAgICBcbiAgICBmdW5jdGlvbiBjZWxsSG92ZXIoY2VsbCwgc2hpcCkge1xuICAgICAgICBjb25zb2xlLmxvZyhzaGlwKTtcbiAgICAgICAgY29uc3QgY2VsbENvb3JkcyA9IGNlbGwuY29vcmRpbmF0ZXM7XG4gICAgICAgIGNvbnNvbGUubG9nKGNlbGxDb29yZHMpO1xuICAgICAgICAvLyBoYXZlIHRvIGNoZWNrIGlmIGl0cyBob3Jpem9udGFsIG9yIHZlcnRpY2FsXG4gICAgICAgIC8vIHRoZW4gY2hlY2sgaWYgc3RhcnRpbmcgcG9pbnQgKyBzaGlwIGxlbmd0aCBpcyB2YWxpZFxuXG4gICAgICAgIC8vIGlmIHZhbGlkLCBnaXZlIGNlbGwgQU5EIGl0cyBmb2xsd2Vyc1xuICAgICAgICAvLyB0aGVpciB2YWxpZCBQbGFjZW1lbnQgY2xhc3NcblxuICAgICAgICAvLyBpZiBpbnZhbGlkIGdpdmUgY2VsbCArIGZvbGxvd2VycyBpbnZhbGlkIGNsYXNzXG4gICAgICAgIGlmIChjdXJyZW50UGxhbmUgPT09ICdob3Jpem9udGFsJykge1xuICAgICAgICAgICAgaWYgKChjZWxsQ29vcmRzWzFdICsgc2hpcC5sZW5ndGgpIC0gMSA8PSAxMCApIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygndGhpcyBpcyB2YWxpZCEnKVxuICAgICAgICAgICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgndmFsaWQtcGxhY2VtZW50Jyk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgIH0gZWxzZSBpZiAoY3VycmVudFBsYW5lID09PSAndmVydGljYWwnKSB7XG5cblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHsgY2VsbEhvdmVyIH1cbn1cblxuXG5leHBvcnQgY29uc3QgY29tcHV0ZXJQbGFjZW1lbnQgPSBmdW5jdGlvbiAoKSB7XG5cbn1cblxuZnVuY3Rpb24gc3dpdGNoUGxhbmUoY3VycmVudFBsYW5lKSB7XG4gICAgaWYgKGN1cnJlbnRQbGFuZSA9PT0gJ2hvcml6b250YWwnKSB7XG4gICAgICAgIGN1cnJlbnRQbGFuZSA9ICd2ZXJ0aWNhbCdcbiAgICB9IGVsc2UgaWYgKGN1cnJlbnRQbGFuZSA9PT0gJ3ZlcnRpY2FsJykge1xuICAgICAgICBjdXJyZW50UGxhbmUgPSAnaG9yaXpvbnRhbCdcbiAgICB9XG4gICAgcmV0dXJuIGN1cnJlbnRQbGFuZVxufTsiLCIvKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvcHJlZmVyLWRlZmF1bHQtZXhwb3J0ICovXG5pbXBvcnQgeyBjb21wdXRlclBsYXllciB9IGZyb20gXCIuL3BsYXllclwiO1xuaW1wb3J0IHsgcmVzZXRJbnRlcmZhY2UgfSBmcm9tIFwiLi9nYW1lTG9vcFwiO1xuXG5cbmV4cG9ydCBjb25zdCBkb21NYW5pcHVsYXRpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgY29tcHV0ZXJNb3ZlcyA9IGNvbXB1dGVyUGxheWVyKClcblxuICAgIGNvbnN0IHBsYXllckJvYXJkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nYW1lYm9hcmRzJyk7XG4gICAgY29uc3QgZGlhbG9ndWVDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGlhbG9ndWUtY29udGFpbmVyJylcblxuICAgIGZ1bmN0aW9uIHJlbmRlckdhbWVCb2FyZChib2FyZENvbnRyb2xsZXIsIHBsYXllck5hbWUsIGh1bWFuQm9hcmQpIHtcbiAgICAgICAgbGV0IGlzQ29tcHV0ZXIgPSBmYWxzZTtcbiAgICAgICAgaWYgKHBsYXllck5hbWUgPT09ICdQbGF5ZXIgMicpIHtcbiAgICAgICAgICAgIGlzQ29tcHV0ZXIgPSB0cnVlXG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2coaXNDb21wdXRlcik7XG5cbiAgICAgICAgY29uc3QgZ2FtZUJvYXJkV3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBhcHBlbmRFbGVtZW50KGdhbWVCb2FyZFdyYXBwZXIsICdib2FyZC13cmFwcGVyJywgcGxheWVyQm9hcmRzKVxuICAgICAgIFxuICAgICAgICBjb25zdCBib2FyZFRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDInKTtcbiAgICAgICAgYXBwZW5kRWxlbWVudChib2FyZFRpdGxlLCAnYm9hcmQtdGl0bGUnLCBnYW1lQm9hcmRXcmFwcGVyKTtcbiAgICAgICAgYm9hcmRUaXRsZS50ZXh0Q29udGVudCA9IHBsYXllck5hbWU7XG5cbiAgICAgICAgLy8gcmVuZGVyIGJvYXJkOlxuICAgICAgICBjb25zdCBnYW1lYm9hcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgYXBwZW5kRWxlbWVudChnYW1lYm9hcmQsICdnYW1lYm9hcmQnLCBnYW1lQm9hcmRXcmFwcGVyKTtcblxuICAgICAgICBidWlsZEdyaWQoZ2FtZWJvYXJkLCBpc0NvbXB1dGVyKTtcbiAgICAgICAgXG4gICAgICAgIGlmIChpc0NvbXB1dGVyID09PSBmYWxzZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ3RyaWdnZXJlZCcpXG4gICAgICAgICAgICBzZXRHcmlkVHJpZ2dlcnMoYm9hcmRDb250cm9sbGVyLCBodW1hbkJvYXJkKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBidWlsZEdyaWQoZ2FtZWJvYXJkRWxlbWVudCwgaXNDb21wdXRlcikge1xuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IDExOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgYXBwZW5kRWxlbWVudChyb3csICdyb3cnLCBnYW1lYm9hcmRFbGVtZW50KTtcblxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDE7IGogPCAxMTsgaisrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgICAgIGNlbGwuY29vcmRpbmF0ZXMgPSBbaSwgal07XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coY2VsbC5jb29yZGluYXRlcylcbiAgICAgICAgICAgICAgICBpZiAoaXNDb21wdXRlciA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICBhcHBlbmRFbGVtZW50KGNlbGwsICdjZWxsLWMnLCByb3cpO1xuICAgICAgICAgICAgICAgICAgICBjZWxsLnNldEF0dHJpYnV0ZSgnaWQnLCBgJHtpfSAke2p9Y2ApXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICBhcHBlbmRFbGVtZW50KGNlbGwsICdjZWxsJywgcm93KTtcbiAgICAgICAgICAgICAgICAgICBjZWxsLnNldEF0dHJpYnV0ZSgnaWQnLCBgJHtpfSAke2p9aGApIFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2V0R3JpZFRyaWdnZXJzKGNvbXB1dGVyQm9hcmRDb250cm9sbGVyLCBodW1hbkJvYXJkQ29udHJvbGxlcikge1xuICAgICAgICBjb25zdCBjZWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jZWxsLWMnKTtcbiAgICAgICAgY2VsbHMuZm9yRWFjaCgoY2VsbCkgPT4ge1xuICAgICAgICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhjZWxsLmNvb3JkaW5hdGVzKTtcbiAgICAgICAgICAgICAgICBjb21wdXRlckJvYXJkQ29udHJvbGxlci5yZWNpZXZlQXR0YWNrKGNlbGwuY29vcmRpbmF0ZXMpO1xuXG4gICAgICAgICAgICAgICAgLy8gdHJpZ2dlciBjb21wdXRlcidzIGF0dGFjayBpbiByZXNwb25zZVxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGh1bWFuQm9hcmRDb250cm9sbGVyKTtcbiAgICAgICAgICAgICAgICBjb21wdXRlck1vdmVzLnBpY2tSYW5kb21DZWxsKGh1bWFuQm9hcmRDb250cm9sbGVyKTtcblxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICAgICAgICAgIFxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVzZUdyaWRTcG90KGNvb3Jkcywgc3RhdHVzLCBuYW1lKSB7XG4gICAgICAgIC8vIHJlZ2lzdGVycyB0aGF0IHRlaCBncmlkIHNwb3Qgd2FzIHVzZWQsIGFuZCBkaXNwbGF5c1xuICAgICAgICAvLyBlaXRoZXIgYSBoaXQgb3IgbWlzc1xuXG4gICAgICAgIGlmIChuYW1lID09PSAnUGxheWVyIDInKSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhzdGF0dXMpO1xuICAgICAgICAgICAgY29uc3QgdXNlZENlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcbiAgICAgICAgICAgICAgICBgJHtjb29yZHNbMF19ICR7Y29vcmRzWzFdfWNgKVxuXG4gICAgICAgICAgICBpZiAoc3RhdHVzID09PSAnaGl0Jykge1xuICAgICAgICAgICAgICAgIHVzZWRDZWxsLnRleHRDb250ZW50ID0gJ1gnXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHN0YXR1cyA9PT0gJ21pc3MnKSB7XG4gICAgICAgICAgICAgICAgdXNlZENlbGwudGV4dENvbnRlbnQgPSAnTydcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coc3RhdHVzKTtcbiAgICAgICAgICAgIGNvbnN0IHVzZWRDZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXG4gICAgICAgICAgICAgICAgYCR7Y29vcmRzWzBdfSAke2Nvb3Jkc1sxXX1oYClcblxuICAgICAgICAgICAgaWYgKHN0YXR1cyA9PT0gJ2hpdCcpIHtcbiAgICAgICAgICAgICAgICB1c2VkQ2VsbC50ZXh0Q29udGVudCA9ICdYJ1xuICAgICAgICAgICAgfSBlbHNlIGlmIChzdGF0dXMgPT09ICdtaXNzJykge1xuICAgICAgICAgICAgICAgIHVzZWRDZWxsLnRleHRDb250ZW50ID0gJ08nXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmcmVlemVHcmlkKCkge1xuICAgICAgICBjb25zdCBnYW1lYm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ2FtZWJvYXJkJyk7XG4gICAgICAgIGdhbWVib2FyZC5zdHlsZS5wb2ludGVyRXZlbnRzID0gJ25vbmUnO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlbmRlckRpYWxvZ3VlQm94KCkge1xuICAgICAgICBjb25zdCBkaWFsb2d1ZUJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBhcHBlbmRFbGVtZW50KGRpYWxvZ3VlQm94LCAnZGlhbG9ndWUtYm94JywgZGlhbG9ndWVDb250YWluZXIpXG5cbiAgICAgICAgY29uc3QgdGV4dEJveDEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgICBhcHBlbmRFbGVtZW50KHRleHRCb3gxLCAndGV4dC1ib3gxJywgZGlhbG9ndWVCb3gpXG5cbiAgICAgICAgY29uc3QgdGV4dEJveDIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgICBhcHBlbmRFbGVtZW50KHRleHRCb3gyLCAndGV4dC1ib3gyJywgZGlhbG9ndWVCb3gpXG5cbiAgICAgICAgY29uc3QgdGV4dEJveDMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgYXBwZW5kRWxlbWVudCh0ZXh0Qm94MywgJ3RleHQtYm94MycsIGRpYWxvZ3VlQm94KVxuICAgIH1cblxuXG4gICAgZnVuY3Rpb24gcmVuZGVyRW5kR2FtZSgpIHtcbiAgICAgICAgY29uc3QgYm9keUVsZW1lbnQgPSBkb2N1bWVudC5ib2R5XG5cbiAgICAgICAgY29uc3QgZW5kR2FtZUJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBhcHBlbmRFbGVtZW50KGVuZEdhbWVCb3gsICdlbmQtZ2FtZS1ib3gnLCBib2R5RWxlbWVudCk7XG5cbiAgICAgICAgY29uc3QgZW5kR2FtZUljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgYXBwZW5kRWxlbWVudChlbmRHYW1lSWNvbiwgJ2VuZC1nYW1lLWljb24nLCBlbmRHYW1lQm94KTtcblxuICAgICAgICBjb25zdCByZXNldEdhbWVCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgYXBwZW5kRWxlbWVudChyZXNldEdhbWVCdXR0b24sICdyZXNldC1nYW1lLWJ1dHRvbicsIGVuZEdhbWVCb3gpO1xuXG4gICAgICAgIHJlc2V0R2FtZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIHJlc2V0SW50ZXJmYWNlKGJvZHlFbGVtZW50LCBlbmRHYW1lQm94KTtcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhcHBlbmRFbGVtZW50KGVsZW1lbnROYW1lLCBjbGFzc05hbWUsIGZhdGhlckVsZW1lbnQgKSB7XG4gICAgICAgIGVsZW1lbnROYW1lLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcbiAgICAgICAgZmF0aGVyRWxlbWVudC5hcHBlbmRDaGlsZChlbGVtZW50TmFtZSk7XG5cbiAgICAgICAgcmV0dXJuIGVsZW1lbnROYW1lO1xuICAgIH1cblxuICAgIHJldHVybiB7cmVuZGVyR2FtZUJvYXJkLCBhcHBlbmRFbGVtZW50LCBidWlsZEdyaWQsXG4gICAgICAgIHNldEdyaWRUcmlnZ2VycywgdXNlR3JpZFNwb3QsIGZyZWV6ZUdyaWQsIHJlbmRlckRpYWxvZ3VlQm94LFxuICAgICAgICByZW5kZXJFbmRHYW1lfVxuXG59XG5cblxuXG5cbmV4cG9ydCBjb25zdCBkaWFsb2d1ZUNvbnRyb2xsZXIgPSBmdW5jdGlvbigpIHtcblxuICAgIGZ1bmN0aW9uICBwbGFjZVNoaXBzTWVzc2FnZSgpIHtcblxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1vdmVSZXN1bHQoc3RhdHVzLCBwbGF5ZXJOYW1lLCBjb29yZHMsIHNoaXAgPSBudWxsKSB7XG4gICAgICAgIC8vIG5lZWQgYXR0YWNrU3RhdHVzLCBzaGlwIG5hbWUsIGNvb3JkaW5hdGVzXG4gICAgICAgIGNvbnN0IHRleHRCb3gxID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRleHQtYm94MScpO1xuICAgICAgICBjb25zdCB0ZXh0Qm94MiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50ZXh0LWJveDInKTtcbiAgICAgICAgY29uc29sZS5sb2coJ2RpYWxvZ3VlIHJlY29yZGVkJylcbiAgICAgICAgaWYgKHBsYXllck5hbWUgIT09ICdQbGF5ZXIgMicpIHtcbiAgICAgICAgICAgIGlmIChzdGF0dXMgPT09ICdoaXQnKSB7XG4gICAgICAgICAgICAgICAgdGV4dEJveDIudGV4dENvbnRlbnQgPSBgVGhlIGVuZW15IGhhcyBoaXQgeW91ciAke3NoaXAubmFtZX1cbiAgICAgICAgICAgICAgICBhdCByb3c6ICR7Y29vcmRzWzBdfSBjb2x1bW46ICR7Y29vcmRzWzFdfSFgXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHN0YXR1cyA9PT0gJ21pc3MnKSB7XG4gICAgICAgICAgICAgICAgdGV4dEJveDIudGV4dENvbnRlbnQgPSBgVGhlIGVuZW15IGF0dGFja2VkIHJvdzpcbiAgICAgICAgICAgICAgICAke2Nvb3Jkc1swXX0gY29sdW1uOiAke2Nvb3Jkc1sxXX0gYW5kIG1pc3NlZCFgXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIGlmIChwbGF5ZXJOYW1lID09PSAnUGxheWVyIDInKSB7XG4gICAgICAgICAgICBpZiAoc3RhdHVzID09PSAnaGl0Jykge1xuICAgICAgICAgICAgICAgIHRleHRCb3gxLnRleHRDb250ZW50ID0gYFlvdSBoaXQgdGhlIGVuZW15J3MgJHtzaGlwLm5hbWV9XG4gICAgICAgICAgICAgICAgYXQgcm93OiAke2Nvb3Jkc1swXX0gY29sdW1uOiAke2Nvb3Jkc1sxXX0hYFxuICAgICAgICAgICAgfSBlbHNlIGlmIChzdGF0dXMgPT09ICdtaXNzJykge1xuICAgICAgICAgICAgICAgIHRleHRCb3gxLnRleHRDb250ZW50ID0gYFlvdSBhdHRhY2tlZCByb3c6XG4gICAgICAgICAgICAgICAgJHtjb29yZHNbMF19IGNvbHVtbjogJHtjb29yZHNbMV19IGFuZCBtaXNzZWQhYFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc3Vua1NoaXBNZXNzYWdlKHNoaXAsIG5hbWUpIHtcbiAgICAgICAgY29uc3QgdGV4dEJveDEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGV4dC1ib3gxJyk7XG4gICAgICAgIGNvbnN0IHRleHRCb3gyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRleHQtYm94MicpO1xuICAgICAgICBjb25zb2xlLmxvZyhzaGlwLCBuYW1lKVxuICAgICAgICBpZiAobmFtZSAhPT0gJ1BsYXllciAyJykge1xuICAgICAgICAgICAgdGV4dEJveDIudGV4dENvbnRlbnQgPSBgWW91ciAke3NoaXAubmFtZX0gaGFzIGJlZW4gc3VuayEhYFxuICAgICAgICB9IGVsc2UgaWYgKG5hbWUgPT09ICdQbGF5ZXIgMicpIHtcbiAgICAgICAgICAgIHRleHRCb3gxLnRleHRDb250ZW50ID0gYFlvdSBzdW5rIHRoZSBlbmVteSdzICR7c2hpcC5uYW1lfSEhYFxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBlbmRHYW1lTWVzc2FnZShuYW1lKSB7XG4gICAgICAgIGNvbnN0IHRleHRCb3gzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRleHQtYm94MycpXG4gICAgICAgIC8vIG1heWJlIHB1dCB0cmlnZ2VyIGhlcmUgdG8gbWFrZSBhICdyZXN0YXJ0IGdhbWUnXG4gICAgICAgIC8vIGJ1dHRvbiB0byBwb3AgdXBcbiAgICAgICAgaWYgKG5hbWUgPT09ICdQbGF5ZXIgMicpIHtcbiAgICAgICAgICAgIHRleHRCb3gzLnRleHRDb250ZW50ID0gJ1RoZSBlbmVteSBmbGVldCBoYXMgYmVlbiBzYW5rLiBFeGNlbGxlbnQgd29yayBTb2xkaWVyISdcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRleHRCb3gzLnRleHRDb250ZW50ID0gJ1dlIGhhdmUgbG9zdCBvdXIgZmxlZXQgYW5kIGJlZW4gZGVmZWF0ZWQuIEFib3J0IHRoZSBtaXNzaW9uISdcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgcmV0dXJuIHtwbGFjZVNoaXBzTWVzc2FnZSwgbW92ZVJlc3VsdCxcbiAgICAgICAgc3Vua1NoaXBNZXNzYWdlLCBlbmRHYW1lTWVzc2FnZX1cbn0iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBgaHRtbCwgYm9keSB7XG4gICAgbWluLWhlaWdodDogMTAwJTtcbiAgICBtaW4td2lkdGg6IDEwMCU7XG4gICAgbWFyZ2luOiAwcHg7XG59XG5cbmJvZHkge1xuICAgIGJhY2tncm91bmQtY29sb3I6IG5hdnk7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xufVxuXG4ucHJvbXB0LWJveCB7XG4gICAgZGlzcGxheTogbm9uZVxufVxuXG4uZ2FtZS1jb250YWluZXIge1xuICAgIGRpc3BsYXk6IGdyaWQ7XG4gICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiAxZnIgNGZyIDEuN2ZyO1xuICAgIGhlaWdodDogMTAwdmg7XG4gICAgd2lkdGg6IDEwMHZ3O1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYig1OSwgNTksIDU5KTtcbn1cblxuLmhlYWRlciB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBncmlkLXJvdzogMSAvIDI7XG59XG5cbi5nYW1lYm9hcmRzIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xuICAgIGdyaWQtcm93OiAyIC8gMztcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTE0LCAxNTUsIDE1NSk7XG59XG5cbi5kaWFsb2d1ZS1jb250YWluZXIge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBncmlkLXJvdzogMyAvIDQ7XG59XG5cbi5kaWFsb2d1ZS1ib3gge1xuICAgIGhlaWdodDogMjB2aDtcbiAgICB3aWR0aDogNTB2dztcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoNzcsIDEzNCwgNzcpO1xufVxuXG5cbi8qIGdhbWVib2FyZCB3cmFwcGVyIHN0eWxpbmcgKi9cbi5ib2FyZC13cmFwcGVyIHtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gICAgd2lkdGg6IDQwMHB4O1xuICAgIGJhY2tncm91bmQtY29sb3I6IGJpc3F1ZTtcbiAgICBwYWRkaW5nOiAwIDE1cHg7XG59XG5cbi5ib2FyZC10aXRsZSB7XG5cbn1cblxuLmdhbWVib2FyZCB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIGhlaWdodDogNDAwcHg7XG4gICAgd2lkdGg6IDQwMHB4O1xuICAgIGJhY2tncm91bmQtY29sb3I6IGJsdWV2aW9sZXQ7XG59XG5cbi5yb3cge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgLyogZmxleC1kaXJlY3Rpb246IGNvbHVtbjsgKi9cbiAgICBoZWlnaHQ6IDEwJTtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBwaW5rO1xufVxuXG4uY2VsbCB7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgbWFyZ2luOiAwcHg7XG4gICAgYXNwZWN0LXJhdGlvOiAxO1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYigyMjEsIDI0MSwgMjQxKTtcbiAgICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcbn1cblxuLmNlbGwtYyB7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgbWFyZ2luOiAwcHg7XG4gICAgYXNwZWN0LXJhdGlvOiAxO1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYigyMjEsIDI0MSwgMjQxKTtcbiAgICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcbn1cblxuLmNlbGw6aG92ZXIsIC5jZWxsLWM6aG92ZXIge1xuICAgIGJhY2tncm91bmQtY29sb3I6IGFudGlxdWV3aGl0ZTtcbn1cblxuXG4vKiBzdHlsaW5nIGZvciBkaWFsb2d1ZSBib3ggKi9cbi5kaWFsb2d1ZS1jb250YWluZXIge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBncmlkLXJvdzogMyAvIDQ7XG59XG5cbi5kaWFsb2d1ZS1ib3gge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWV2ZW5seTtcbiAgICBoZWlnaHQ6IDIwdmg7XG4gICAgd2lkdGg6IDQ1dnc7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDc3LCAxMzQsIDc3KTtcbn1cblxuLnRleHQtYm94MSB7XG4gICAgaGVpZ2h0OiA0dmg7XG4gICAgd2lkdGg6IDQwdnc7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogbGlnaHRibHVlO1xufVxuXG4udGV4dC1ib3gyIHtcbiAgICBoZWlnaHQ6IDR2aDtcbiAgICB3aWR0aDogNDB2dztcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBsaWdodGJsdWU7XG59XG5cbi50ZXh0LWJveDMge1xuICAgIGhlaWdodDogNHZoO1xuICAgIHdpZHRoOiA0MHZ3O1xuICAgIGJhY2tncm91bmQtY29sb3I6IGxpZ2h0Ymx1ZTtcbn1cblxuXG4vKiBzdHlsaW5nIGZvciByZXNldCBnYW1lICovXG4uZW5kLWdhbWUtYm94IHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIHRvcDogMjQ1cHg7XG4gICAgbGVmdDogMDtcbiAgICByaWdodDogMDtcbiAgICBtYXJnaW4tbGVmdDogYXV0bztcbiAgICBtYXJnaW4tcmlnaHQ6IGF1dG87XG4gICAgd2lkdGg6IDIyMHB4O1xuICAgIGhlaWdodDogMjIwcHg7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogYXp1cmU7XG59XG5cbi5yZXNldC1nYW1lLWJ1dHRvbiB7XG4gICAgaGVpZ2h0OiA1MHB4O1xuICAgIHdpZHRoOiA1MHB4O1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYigxNDQsIDU4LCA1OCk7XG59XG5cblxuLyogc3R5bGluZyBmb3Igc2hpcCBQbGFjZW1lbnQgKi9cblxuLnZhbGlkLXBsYWNlbWVudCB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDExMCwgMTg5LCAxMTApO1xufWAsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3BhZ2VTdHlsaW5nLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtJQUNJLGdCQUFnQjtJQUNoQixlQUFlO0lBQ2YsV0FBVztBQUNmOztBQUVBO0lBQ0ksc0JBQXNCO0lBQ3RCLGtCQUFrQjtBQUN0Qjs7QUFFQTtJQUNJO0FBQ0o7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsaUNBQWlDO0lBQ2pDLGFBQWE7SUFDYixZQUFZO0lBQ1osaUNBQWlDO0FBQ3JDOztBQUVBO0lBQ0ksYUFBYTtJQUNiLGVBQWU7QUFDbkI7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsNkJBQTZCO0lBQzdCLGVBQWU7SUFDZixvQ0FBb0M7QUFDeEM7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsdUJBQXVCO0lBQ3ZCLG1CQUFtQjtJQUNuQixlQUFlO0FBQ25COztBQUVBO0lBQ0ksWUFBWTtJQUNaLFdBQVc7SUFDWCxrQ0FBa0M7QUFDdEM7OztBQUdBLDhCQUE4QjtBQUM5QjtJQUNJLFlBQVk7SUFDWixZQUFZO0lBQ1osd0JBQXdCO0lBQ3hCLGVBQWU7QUFDbkI7O0FBRUE7O0FBRUE7O0FBRUE7SUFDSSxhQUFhO0lBQ2Isc0JBQXNCO0lBQ3RCLGFBQWE7SUFDYixZQUFZO0lBQ1osNEJBQTRCO0FBQ2hDOztBQUVBO0lBQ0ksYUFBYTtJQUNiLDRCQUE0QjtJQUM1QixXQUFXO0lBQ1gsV0FBVztJQUNYLHNCQUFzQjtBQUMxQjs7QUFFQTtJQUNJLFdBQVc7SUFDWCxXQUFXO0lBQ1gsZUFBZTtJQUNmLG9DQUFvQztJQUNwQyx1QkFBdUI7QUFDM0I7O0FBRUE7SUFDSSxXQUFXO0lBQ1gsV0FBVztJQUNYLGVBQWU7SUFDZixvQ0FBb0M7SUFDcEMsdUJBQXVCO0FBQzNCOztBQUVBO0lBQ0ksOEJBQThCO0FBQ2xDOzs7QUFHQSw2QkFBNkI7QUFDN0I7SUFDSSxhQUFhO0lBQ2IsdUJBQXVCO0lBQ3ZCLG1CQUFtQjtJQUNuQixlQUFlO0FBQ25COztBQUVBO0lBQ0ksYUFBYTtJQUNiLHNCQUFzQjtJQUN0Qiw2QkFBNkI7SUFDN0IsWUFBWTtJQUNaLFdBQVc7SUFDWCxrQ0FBa0M7QUFDdEM7O0FBRUE7SUFDSSxXQUFXO0lBQ1gsV0FBVztJQUNYLDJCQUEyQjtBQUMvQjs7QUFFQTtJQUNJLFdBQVc7SUFDWCxXQUFXO0lBQ1gsMkJBQTJCO0FBQy9COztBQUVBO0lBQ0ksV0FBVztJQUNYLFdBQVc7SUFDWCwyQkFBMkI7QUFDL0I7OztBQUdBLDJCQUEyQjtBQUMzQjtJQUNJLGtCQUFrQjtJQUNsQixhQUFhO0lBQ2IsdUJBQXVCO0lBQ3ZCLG1CQUFtQjtJQUNuQixVQUFVO0lBQ1YsT0FBTztJQUNQLFFBQVE7SUFDUixpQkFBaUI7SUFDakIsa0JBQWtCO0lBQ2xCLFlBQVk7SUFDWixhQUFhO0lBQ2IsdUJBQXVCO0FBQzNCOztBQUVBO0lBQ0ksWUFBWTtJQUNaLFdBQVc7SUFDWCxrQ0FBa0M7QUFDdEM7OztBQUdBLCtCQUErQjs7QUFFL0I7SUFDSSxvQ0FBb0M7QUFDeENcIixcInNvdXJjZXNDb250ZW50XCI6W1wiaHRtbCwgYm9keSB7XFxuICAgIG1pbi1oZWlnaHQ6IDEwMCU7XFxuICAgIG1pbi13aWR0aDogMTAwJTtcXG4gICAgbWFyZ2luOiAwcHg7XFxufVxcblxcbmJvZHkge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBuYXZ5O1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxufVxcblxcbi5wcm9tcHQtYm94IHtcXG4gICAgZGlzcGxheTogbm9uZVxcbn1cXG5cXG4uZ2FtZS1jb250YWluZXIge1xcbiAgICBkaXNwbGF5OiBncmlkO1xcbiAgICBncmlkLXRlbXBsYXRlLXJvd3M6IDFmciA0ZnIgMS43ZnI7XFxuICAgIGhlaWdodDogMTAwdmg7XFxuICAgIHdpZHRoOiAxMDB2dztcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDU5LCA1OSwgNTkpO1xcbn1cXG5cXG4uaGVhZGVyIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZ3JpZC1yb3c6IDEgLyAyO1xcbn1cXG5cXG4uZ2FtZWJvYXJkcyB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xcbiAgICBncmlkLXJvdzogMiAvIDM7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYigxMTQsIDE1NSwgMTU1KTtcXG59XFxuXFxuLmRpYWxvZ3VlLWNvbnRhaW5lciB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBncmlkLXJvdzogMyAvIDQ7XFxufVxcblxcbi5kaWFsb2d1ZS1ib3gge1xcbiAgICBoZWlnaHQ6IDIwdmg7XFxuICAgIHdpZHRoOiA1MHZ3O1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoNzcsIDEzNCwgNzcpO1xcbn1cXG5cXG5cXG4vKiBnYW1lYm9hcmQgd3JhcHBlciBzdHlsaW5nICovXFxuLmJvYXJkLXdyYXBwZXIge1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxuICAgIHdpZHRoOiA0MDBweDtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogYmlzcXVlO1xcbiAgICBwYWRkaW5nOiAwIDE1cHg7XFxufVxcblxcbi5ib2FyZC10aXRsZSB7XFxuXFxufVxcblxcbi5nYW1lYm9hcmQge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBoZWlnaHQ6IDQwMHB4O1xcbiAgICB3aWR0aDogNDAwcHg7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IGJsdWV2aW9sZXQ7XFxufVxcblxcbi5yb3cge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICAvKiBmbGV4LWRpcmVjdGlvbjogY29sdW1uOyAqL1xcbiAgICBoZWlnaHQ6IDEwJTtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHBpbms7XFxufVxcblxcbi5jZWxsIHtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIG1hcmdpbjogMHB4O1xcbiAgICBhc3BlY3QtcmF0aW86IDE7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYigyMjEsIDI0MSwgMjQxKTtcXG4gICAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XFxufVxcblxcbi5jZWxsLWMge1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgbWFyZ2luOiAwcHg7XFxuICAgIGFzcGVjdC1yYXRpbzogMTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDIyMSwgMjQxLCAyNDEpO1xcbiAgICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcXG59XFxuXFxuLmNlbGw6aG92ZXIsIC5jZWxsLWM6aG92ZXIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBhbnRpcXVld2hpdGU7XFxufVxcblxcblxcbi8qIHN0eWxpbmcgZm9yIGRpYWxvZ3VlIGJveCAqL1xcbi5kaWFsb2d1ZS1jb250YWluZXIge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgZ3JpZC1yb3c6IDMgLyA0O1xcbn1cXG5cXG4uZGlhbG9ndWUtYm94IHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1ldmVubHk7XFxuICAgIGhlaWdodDogMjB2aDtcXG4gICAgd2lkdGg6IDQ1dnc7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYig3NywgMTM0LCA3Nyk7XFxufVxcblxcbi50ZXh0LWJveDEge1xcbiAgICBoZWlnaHQ6IDR2aDtcXG4gICAgd2lkdGg6IDQwdnc7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IGxpZ2h0Ymx1ZTtcXG59XFxuXFxuLnRleHQtYm94MiB7XFxuICAgIGhlaWdodDogNHZoO1xcbiAgICB3aWR0aDogNDB2dztcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogbGlnaHRibHVlO1xcbn1cXG5cXG4udGV4dC1ib3gzIHtcXG4gICAgaGVpZ2h0OiA0dmg7XFxuICAgIHdpZHRoOiA0MHZ3O1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBsaWdodGJsdWU7XFxufVxcblxcblxcbi8qIHN0eWxpbmcgZm9yIHJlc2V0IGdhbWUgKi9cXG4uZW5kLWdhbWUtYm94IHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgdG9wOiAyNDVweDtcXG4gICAgbGVmdDogMDtcXG4gICAgcmlnaHQ6IDA7XFxuICAgIG1hcmdpbi1sZWZ0OiBhdXRvO1xcbiAgICBtYXJnaW4tcmlnaHQ6IGF1dG87XFxuICAgIHdpZHRoOiAyMjBweDtcXG4gICAgaGVpZ2h0OiAyMjBweDtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogYXp1cmU7XFxufVxcblxcbi5yZXNldC1nYW1lLWJ1dHRvbiB7XFxuICAgIGhlaWdodDogNTBweDtcXG4gICAgd2lkdGg6IDUwcHg7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYigxNDQsIDU4LCA1OCk7XFxufVxcblxcblxcbi8qIHN0eWxpbmcgZm9yIHNoaXAgUGxhY2VtZW50ICovXFxuXFxuLnZhbGlkLXBsYWNlbWVudCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYigxMTAsIDE4OSwgMTEwKTtcXG59XCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdO1xuXG4gIC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9O1xuXG4gIC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vcGFnZVN0eWxpbmcuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9wYWdlU3R5bGluZy5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gdXBkYXRlcjtcbn1cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTtcblxuICAgIC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuICBjc3MgKz0gb2JqLmNzcztcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfVxuXG4gIC8vIEZvciBvbGQgSUVcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHJldHVybiB7XG4gICAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZSgpIHt9LFxuICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7fVxuICAgIH07XG4gIH1cbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5jID0gdW5kZWZpbmVkOyIsImltcG9ydCAnLi9wYWdlU3R5bGluZy5jc3MnO1xuaW1wb3J0IHsgZ2FtZUJvYXJkQ29udHJvbGxlciB9IGZyb20gXCIuL2dhbWVib2FyZENvbnRyb2xsZXJcIjtcbmltcG9ydCB7IGluaXRpYWxpemVHYW1lIH0gZnJvbSBcIi4vZ2FtZUxvb3BcIjtcblxuXG5cbmluaXRpYWxpemVHYW1lKCkiXSwibmFtZXMiOlsiUGxheWVyIiwidXNlclBsYXllciIsImNvbXB1dGVyUGxheWVyIiwiZ2FtZUJvYXJkQ29udHJvbGxlciIsImNyZWF0ZUZsZWV0IiwiY3JlYXRlT3BwRmxlZXQiLCJkb21NYW5pcHVsYXRpb24iLCJodW1hblNoaXBQbGFjZW1lbnQiLCJpbml0aWFsaXplR2FtZSIsImNyZWF0ZUdhbWUiLCJydW5ET00iLCJodW1hblBsYXllciIsImh1bWFuRmxlZXQiLCJjb25zb2xlIiwibG9nIiwiZ2FtZUJvYXJkIiwicGxheWVyIiwiaHVtYW5Cb2FyZCIsImNyZWF0ZUJvYXJkIiwiQUlwbGF5ZXIiLCJjb21wdXRlckZsZWV0IiwiY29tcHV0ZXJCb2FyZCIsInJlbmRlckdhbWVCb2FyZCIsInJlbmRlckRpYWxvZ3VlQm94IiwiaHVtYW5QbGFjZW1lbnQiLCJyZXNldEludGVyZmFjZSIsImJvZHlFIiwiZW5kQm94IiwicGxheWVyQm9hcmRzIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiZGlhbG9ndWVDb250YWluZXIiLCJnYW1lQm9hcmRXcmFwcGVycyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJkaWFsb2d1ZUJveCIsImZvckVhY2giLCJlbGVtZW50IiwicmVtb3ZlQ2hpbGQiLCJTaGlwIiwiZGlhbG9ndWVDb250cm9sbGVyIiwiZGlhbG9ndWVSZWZyZXNoIiwiZmxlZXQiLCJuYW1lIiwicGxheWVyTmFtZSIsImJvYXJkIiwic2hpcHMiLCJpIiwiaiIsInBsYWNlSG9yaXpvbnRhbFNoaXAiLCJyb3ciLCJjb2wiLCJzaGlwIiwibGVuZ3RoIiwibmV3Q29vcmRzIiwiY29vcmRzIiwicHVzaCIsInBsYWNlVmVydGljYWxTaGlwIiwicmVjaWV2ZUF0dGFjayIsImF0dGFja1N0YXR1cyIsImNoZWNrSWZVc2VkIiwiY29vcmQiLCJoaXQiLCJ1cGRhdGVCb2FyZFNwb3QiLCJtb3ZlUmVzdWx0Iiwic3Vua0NoZWNrIiwiY2hlY2tJZlN1bmsiLCJzdW5rU2hpcE1lc3NhZ2UiLCJzcGxpY2UiLCJjaGVja0FsbFN1bmsiLCJlbmRHYW1lTWVzc2FnZSIsImVuZEdhbWUiLCJ1c2VHcmlkU3BvdCIsImZyZWV6ZUdyaWQiLCJyZW5kZXJFbmRHYW1lIiwiY29uc3RydWN0b3IiLCJ2aXNpdGVkIiwicGlja1JhbmRvbUNlbGwiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJjb2x1bW4iLCJjb21wQ29vcmRzIiwicmVwZWF0Qm9vbGVhbiIsImNoZWNrUmVwZWF0Q2VsbCIsInN0cmluZ2VkQ29vcmRzIiwiSlNPTiIsInN0cmluZ2lmeSIsImV4aXN0c0Jvb2xlYW4iLCJzb21lIiwiaGl0cyIsImlzU3VuayIsImJvYXJkUnVuIiwiY2FycmllciIsImJhdHRsZXNoaXAiLCJkZXN0cm95ZXIiLCJzdWJtYXJpbmUiLCJwYXRyb2xCb2F0Iiwib2NjdXBpZWRDZWxscyIsImN1cnJlbnRQbGFuZSIsImh1bWFuQ2VsbHMiLCJhbGxTaGlwc1BsYWNlZCIsInNoaXBJbmRleCIsImNlbGwiLCJhZGRFdmVudExpc3RlbmVyIiwiY2VsbEhvdmVyIiwiaWQiLCJjZWxsQ29vcmRzIiwiY29vcmRpbmF0ZXMiLCJjbGFzc0xpc3QiLCJhZGQiLCJjb21wdXRlclBsYWNlbWVudCIsInN3aXRjaFBsYW5lIiwiY29tcHV0ZXJNb3ZlcyIsImJvYXJkQ29udHJvbGxlciIsImlzQ29tcHV0ZXIiLCJnYW1lQm9hcmRXcmFwcGVyIiwiY3JlYXRlRWxlbWVudCIsImFwcGVuZEVsZW1lbnQiLCJib2FyZFRpdGxlIiwidGV4dENvbnRlbnQiLCJnYW1lYm9hcmQiLCJidWlsZEdyaWQiLCJzZXRHcmlkVHJpZ2dlcnMiLCJnYW1lYm9hcmRFbGVtZW50Iiwic2V0QXR0cmlidXRlIiwiY29tcHV0ZXJCb2FyZENvbnRyb2xsZXIiLCJodW1hbkJvYXJkQ29udHJvbGxlciIsImNlbGxzIiwic3RhdHVzIiwidXNlZENlbGwiLCJnZXRFbGVtZW50QnlJZCIsInN0eWxlIiwicG9pbnRlckV2ZW50cyIsInRleHRCb3gxIiwidGV4dEJveDIiLCJ0ZXh0Qm94MyIsImJvZHlFbGVtZW50IiwiYm9keSIsImVuZEdhbWVCb3giLCJlbmRHYW1lSWNvbiIsInJlc2V0R2FtZUJ1dHRvbiIsImVsZW1lbnROYW1lIiwiY2xhc3NOYW1lIiwiZmF0aGVyRWxlbWVudCIsImFwcGVuZENoaWxkIiwicGxhY2VTaGlwc01lc3NhZ2UiLCJhcmd1bWVudHMiLCJ1bmRlZmluZWQiXSwic291cmNlUm9vdCI6IiJ9