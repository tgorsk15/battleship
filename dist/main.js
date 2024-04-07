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
  runDOM.renderStart();
  runDOM.renderGameBoard(computerBoard.createBoard(), AIplayer.player);
  runDOM.renderGameBoard(computerBoard, humanPlayer.player, humanBoard);

  // call render dialogue box here
  const creatDialogue = runDOM.renderDialogueBox();
  const dialogue = (0,_userInterface__WEBPACK_IMPORTED_MODULE_3__.dialogueController)();
  dialogue.placeShipsMessage();

  // call computerPlacement to set up computer's chips:
  const computerPlacements = (0,_shipPlacement__WEBPACK_IMPORTED_MODULE_4__.computerPlacement)(computerBoard, computerFleet);

  // call shipPlacement function here for humanBoard
  const humanPlacement = (0,_shipPlacement__WEBPACK_IMPORTED_MODULE_4__.humanShipPlacement)(humanBoard, humanFleet);
};
const resetInterface = function (bodyE, endBox) {
  console.log('reseting all this shit');
  const playerBoards = document.querySelector('.gameboards');
  const dialogueContainer = document.querySelector('.dialogue-container');
  const dialogueBox = document.querySelector('.dialogue-box');
  const gameBoardWrappers = document.querySelectorAll('.board-wrapper');
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
      ship.coords.push(newCoords);
    }
    console.log(ship);
    console.log(ship.name);
    console.log(ships);
    return ship;
  }
  function placeVerticalShip(row, col, ship) {
    for (let i = 0; i < ship.length; i++) {
      const newCoords = [row + i, col];
      ship.coords.push(newCoords);
    }
    console.log(ship);
    console.log(ships);
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
// create both the user player and the computer player here

// computer player has attack coordinates generator function

class Player {
  constructor(player, gameBoard) {
    this.player = player;
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
/* harmony import */ var _userInterface__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./userInterface */ "./src/userInterface.js");
/* eslint-disable no-use-before-define */
/* eslint-disable import/prefer-default-export */

// rotateButton allows players to rotate ships during placement phase
// startButton allows player to attack when all ships have been placed

const humanShipPlacement = function (humanBoard, ships) {
  const rotateButton = document.querySelector('.rotate-ship');
  const startButton = document.querySelector('.start-game-button');
  const gameBoard = document.querySelector('.gameboard');
  const dialogueRun = (0,_userInterface__WEBPACK_IMPORTED_MODULE_0__.dialogueController)();

  // memory storage for where cells can't be used again
  const occupiedCells = [];

  // sets plane
  let currentPlane = 'horizontal';
  createRotationAbility();
  const humanCells = document.querySelectorAll('.cell');
  let shipIndex = 0;
  humanCells.forEach(cell => {
    cell.addEventListener('mouseover', () => {
      cellHover(cell, ships[shipIndex]);
    });
    cell.addEventListener('click', () => {
      if (cell.classList.contains('valid-placement')) {
        if (currentPlane === 'horizontal') {
          placeHorizontally(cell.coordinates, cell.activeCells, ships[shipIndex]);
          shipIndex += 1;
          if (shipIndex === 5) {
            startButtonEmerge();
          }
          console.log(shipIndex);
        } else if (currentPlane === 'vertical') {
          placeVertically(cell.coordinates, cell.activeCells, ships[shipIndex]);
          shipIndex += 1;
          if (shipIndex === 5) {
            startButtonEmerge();
          }
          console.log(shipIndex);
        }
      }
      return shipIndex;
    });
  });
  function cellHover(cell, ship) {
    const cellCoords = cell.coordinates;
    cell.activeCells = [];
    const groupedCells = cell.activeCells;
    // have to check if its horizontal or vertical
    // then check if starting point + ship length is valid
    if (shipIndex === 5) {
      return;
    }
    if (currentPlane === 'horizontal') {
      const cellRow = cellCoords[0];
      let cellColumn = cellCoords[1];
      for (let i = 0; i < ship.length; i++) {
        const activeCell = document.getElementById(`${cellRow} ${cellColumn}h`);
        groupedCells.push(activeCell);
        cellColumn += 1;
        if (cellColumn > 10) {
          break;
        }
      }
      const conflicting = checkConflictingShips(groupedCells);
      if (cellCoords[1] + ship.length - 1 <= 10 && conflicting === false) {
        groupedCells.forEach(elem => {
          elem.classList.add('valid-placement');
        });
      } else if (cellCoords[1] + ship.length - 1 > 10 || conflicting === true) {
        groupedCells.forEach(elem => {
          elem.classList.add('invalid-placement');
        });
      }
      cell.addEventListener('mouseout', () => {
        groupedCells.forEach(elem => {
          elem.classList.remove('valid-placement', 'invalid-placement');
        });
      });
    } else if (currentPlane === 'vertical') {
      let cellRow = cellCoords[0];
      const cellColumn = cellCoords[1];
      for (let i = 0; i < ship.length; i++) {
        const activeCell = document.getElementById(`${cellRow} ${cellColumn}h`);
        groupedCells.push(activeCell);
        cellRow += 1;
        if (cellRow > 10) {
          break;
        }
      }
      const conflicting = checkConflictingShips(groupedCells);
      if (cellCoords[0] + ship.length - 1 <= 10 && conflicting === false) {
        groupedCells.forEach(elem => {
          elem.classList.add('valid-placement');
        });
      } else if (cellCoords[0] + ship.length - 1 > 10 || conflicting === true) {
        groupedCells.forEach(elem => {
          elem.classList.add('invalid-placement');
        });
      }
      cell.addEventListener('mouseout', () => {
        groupedCells.forEach(elem => {
          elem.classList.remove('valid-placement', 'invalid-placement');
        });
      });
    }
  }
  function placeHorizontally(cellCoords, activeCells, ship) {
    activeCells.forEach(elem => {
      console.log(elem.coordinates);
      occupiedCells.push(elem.coordinates);
      elem.classList.add('placed');
    });
    humanBoard.placeHorizontalShip(cellCoords[0], cellCoords[1], ship);
    console.log(occupiedCells);
  }
  function placeVertically(cellCoords, activeCells, ship) {
    activeCells.forEach(elem => {
      console.log(elem.coordinates);
      occupiedCells.push(elem.coordinates);
      elem.classList.add('placed');
    });
    humanBoard.placeVerticalShip(cellCoords[0], cellCoords[1], ship);
    console.log(occupiedCells);
  }
  function checkConflictingShips(activeCells) {
    let alreadyUsed = false;
    activeCells.forEach(elem => {
      if (checkForRepeat(elem.coordinates, occupiedCells) === true) {
        alreadyUsed = true;
      }
    });
    return alreadyUsed;
  }
  function createRotationAbility() {
    rotateButton.addEventListener('click', () => {
      const newPlane = switchPlane(currentPlane);
      currentPlane = newPlane;
    });
  }
  function startButtonEmerge() {
    startButton.style.display = 'block';
    startButton.addEventListener('click', () => {
      dialogueRun.beginAttackMessage();
      console.log('start!');
      gameBoard.style.pointerEvents = 'auto';
    });
  }
  return {
    cellHover,
    placeHorizontally,
    checkConflictingShips
  };
};

// computer placement logic

const computerPlacement = function (computerBoard, ships) {
  const planes = ['horizontal', 'vertical'];
  const usedCells = [];
  for (let i = 0; i < ships.length; i++) {
    createShipCoords(ships[i]);
  }
  function createShipCoords(ship) {
    // const chosenPlane = choosePlane(planes);
    // test:
    const chosenPlane = 'vertical';
    console.log(chosenPlane);
    if (chosenPlane === 'horizontal') {
      testHorizontalShip(ship);
    } else if (chosenPlane === 'vertical') {
      testVerticalShip(ship);
    }
  }
  function testHorizontalShip(ship) {
    const startingCoords = createHorizontalStart(ship);
    usedCells.push(startingCoords);
    let repeatDetect = false;
    for (let i = 1; i < ship.length; i++) {
      const newCoords = [startingCoords[0], startingCoords[1] + i];
      const repeat = checkForRepeat(newCoords, usedCells);
      if (repeat === false) {
        usedCells.push(newCoords);
      } else if (repeat === true) {
        repeatDetect = true;
        break;
      }
    }
    if (repeatDetect === false) {
      computerBoard.placeHorizontalShip(startingCoords[0], startingCoords[1], ship);
    } else if (repeatDetect === true) {
      testHorizontalShip(ship);
    }
  }
  function testVerticalShip(ship) {
    const startingCoords = createVerticalStart(ship);
    usedCells.push(startingCoords);
    let repeatDetect = false;
    for (let i = 1; i < ship.length; i++) {
      const newCoords = [startingCoords[0] + i, startingCoords[1]];
      const repeat = checkForRepeat(newCoords, usedCells);
      if (repeat === false) {
        usedCells.push(newCoords);
      } else if (repeat === true) {
        repeatDetect = true;
        break;
      }
    }
    if (repeatDetect === false) {
      computerBoard.placeVerticalShip(startingCoords[0], startingCoords[1], ship);
    } else if (repeatDetect === true) {
      testVerticalShip(ship);
    }
  }
  function choosePlane(planes) {
    const chosenIndex = Math.floor(Math.random() * planes.length);
    console.log(planes[chosenIndex]);
    return planes[chosenIndex];
  }
  function createHorizontalStart(ship) {
    const row = Math.floor(Math.random() * 10) + 1;
    const column = Math.floor(Math.random() * (10 - ship.length)) + 1;
    const startingCoord = [row, column];
    return startingCoord;
  }
  function createVerticalStart(ship) {
    const row = Math.floor(Math.random() * (10 - ship.length)) + 1;
    const column = Math.floor(Math.random() * 10) + 1;
    const startingCoord = [row, column];
    return startingCoord;
  }
  return {
    createShipCoords,
    testHorizontalShip,
    testVerticalShip,
    choosePlane,
    createHorizontalStart,
    createVerticalStart
  };
};
function checkForRepeat(coords, array) {
  const stringedCoords = JSON.stringify(coords);
  const existsBoolean = array.some(coord => JSON.stringify(coord) === stringedCoords);
  console.log(existsBoolean);
  return existsBoolean;
}
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
  function renderStart() {
    const startGameButton = document.createElement('button');
    appendElement(startGameButton, 'start-game-button', playerBoards);
    startGameButton.textContent = 'Start Firing!';
    startGameButton.style.display = 'none';
  }
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
      const rotateShipButton = document.createElement('button');
      appendElement(rotateShipButton, 'rotate-ship', gameBoardWrapper);
      rotateShipButton.textContent = 'Rotate';
      setGridTriggers(boardController, humanBoard);
    } else {
      gameboard.style.pointerEvents = 'none';
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
    renderStart,
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
  function placeShipsMessage() {
    const textBox1 = document.querySelector('.text-box1');
    textBox1.textContent = 'Place your ships on the board to the right to begin!';
  }
  function beginAttackMessage() {
    const textBox1 = document.querySelector('.text-box1');
    textBox1.textContent = 'Ready to Attack!!';
  }
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
    if (name === 'Player 2') {
      textBox3.textContent = 'The enemy fleet has been sank. Excellent work Soldier!';
    } else {
      textBox3.textContent = 'We have lost our fleet and been defeated. Abort the mission!';
    }
  }
  return {
    placeShipsMessage,
    beginAttackMessage,
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
    justify-content: center;
    align-items: center;
    grid-row: 1 / 2;
}

.game-title {
    font-size: 67px;
    margin-top: 20px;
    margin-bottom: 10px;
}

.gameboards {
    position: relative;
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
    position: relative;
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

.cell-c:hover {
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
    align-items: center;
    height: 20vh;
    width: 55vw;
    background-color: rgb(77, 134, 77);
}

.text-box1, .text-box2, .text-box3 {
    height: 5vh;
    width: 50vw;
    background-color: lightblue;
    font-size: 25px;
    text-align: center;
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
}

.invalid-placement {
    background-color: rgb(249, 116, 116);
}

.placed {
    background-color: rgb(76, 76, 110);
}

.rotate-ship {
    position: absolute;
    top: 15px;
    right: 20px;
    height: 25px;
    width: 60px;
    /* border: 2px solid orange; */
}

.start-game-button {
    position: absolute;
    top: 350px;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    height: 25px;
    width: 110px;
    border: 2px solid orange;
}`, "",{"version":3,"sources":["webpack://./src/pageStyling.css"],"names":[],"mappings":"AAAA;IACI,gBAAgB;IAChB,eAAe;IACf,WAAW;AACf;;AAEA;IACI,sBAAsB;IACtB,kBAAkB;AACtB;;AAEA;IACI;AACJ;;AAEA;IACI,aAAa;IACb,iCAAiC;IACjC,aAAa;IACb,YAAY;IACZ,iCAAiC;AACrC;;AAEA;IACI,aAAa;IACb,uBAAuB;IACvB,mBAAmB;IACnB,eAAe;AACnB;;AAEA;IACI,eAAe;IACf,gBAAgB;IAChB,mBAAmB;AACvB;;AAEA;IACI,kBAAkB;IAClB,aAAa;IACb,6BAA6B;IAC7B,eAAe;IACf,oCAAoC;AACxC;;AAEA;IACI,aAAa;IACb,uBAAuB;IACvB,mBAAmB;IACnB,eAAe;AACnB;;AAEA;IACI,YAAY;IACZ,WAAW;IACX,kCAAkC;AACtC;;;AAGA,8BAA8B;AAC9B;IACI,kBAAkB;IAClB,YAAY;IACZ,YAAY;IACZ,wBAAwB;IACxB,eAAe;AACnB;;AAEA;;AAEA;;AAEA;IACI,aAAa;IACb,sBAAsB;IACtB,aAAa;IACb,YAAY;IACZ,4BAA4B;AAChC;;AAEA;IACI,aAAa;IACb,WAAW;IACX,WAAW;IACX,sBAAsB;AAC1B;;AAEA;IACI,WAAW;IACX,WAAW;IACX,eAAe;IACf,oCAAoC;IACpC,uBAAuB;AAC3B;;AAEA;IACI,WAAW;IACX,WAAW;IACX,eAAe;IACf,oCAAoC;IACpC,uBAAuB;AAC3B;;AAEA;IACI,8BAA8B;AAClC;;;AAGA,6BAA6B;AAC7B;IACI,aAAa;IACb,uBAAuB;IACvB,mBAAmB;IACnB,eAAe;AACnB;;AAEA;IACI,aAAa;IACb,sBAAsB;IACtB,6BAA6B;IAC7B,mBAAmB;IACnB,YAAY;IACZ,WAAW;IACX,kCAAkC;AACtC;;AAEA;IACI,WAAW;IACX,WAAW;IACX,2BAA2B;IAC3B,eAAe;IACf,kBAAkB;AACtB;;;;AAIA,2BAA2B;AAC3B;IACI,kBAAkB;IAClB,aAAa;IACb,uBAAuB;IACvB,mBAAmB;IACnB,UAAU;IACV,OAAO;IACP,QAAQ;IACR,iBAAiB;IACjB,kBAAkB;IAClB,YAAY;IACZ,aAAa;IACb,uBAAuB;AAC3B;;AAEA;IACI,YAAY;IACZ,WAAW;IACX,kCAAkC;AACtC;;;AAGA,+BAA+B;AAC/B;IACI,oCAAoC;AACxC;;AAEA;IACI,oCAAoC;AACxC;;AAEA;IACI,kCAAkC;AACtC;;AAEA;IACI,kBAAkB;IAClB,SAAS;IACT,WAAW;IACX,YAAY;IACZ,WAAW;IACX,8BAA8B;AAClC;;AAEA;IACI,kBAAkB;IAClB,UAAU;IACV,OAAO;IACP,QAAQ;IACR,iBAAiB;IACjB,kBAAkB;IAClB,YAAY;IACZ,YAAY;IACZ,wBAAwB;AAC5B","sourcesContent":["html, body {\n    min-height: 100%;\n    min-width: 100%;\n    margin: 0px;\n}\n\nbody {\n    background-color: navy;\n    position: relative;\n}\n\n.prompt-box {\n    display: none\n}\n\n.game-container {\n    display: grid;\n    grid-template-rows: 1fr 4fr 1.7fr;\n    height: 100vh;\n    width: 100vw;\n    background-color: rgb(59, 59, 59);\n}\n\n.header {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    grid-row: 1 / 2;\n}\n\n.game-title {\n    font-size: 67px;\n    margin-top: 20px;\n    margin-bottom: 10px;\n}\n\n.gameboards {\n    position: relative;\n    display: flex;\n    justify-content: space-around;\n    grid-row: 2 / 3;\n    background-color: rgb(114, 155, 155);\n}\n\n.dialogue-container {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    grid-row: 3 / 4;\n}\n\n.dialogue-box {\n    height: 20vh;\n    width: 50vw;\n    background-color: rgb(77, 134, 77);\n}\n\n\n/* gameboard wrapper styling */\n.board-wrapper {\n    position: relative;\n    height: 100%;\n    width: 400px;\n    background-color: bisque;\n    padding: 0 15px;\n}\n\n.board-title {\n\n}\n\n.gameboard {\n    display: flex;\n    flex-direction: column;\n    height: 400px;\n    width: 400px;\n    background-color: blueviolet;\n}\n\n.row {\n    display: flex;\n    height: 10%;\n    width: 100%;\n    background-color: pink;\n}\n\n.cell {\n    width: 100%;\n    margin: 0px;\n    aspect-ratio: 1;\n    background-color: rgb(221, 241, 241);\n    border: 1px solid black;\n}\n\n.cell-c {\n    width: 100%;\n    margin: 0px;\n    aspect-ratio: 1;\n    background-color: rgb(221, 241, 241);\n    border: 1px solid black;\n}\n\n.cell-c:hover {\n    background-color: antiquewhite;\n}\n\n\n/* styling for dialogue box */\n.dialogue-container {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    grid-row: 3 / 4;\n}\n\n.dialogue-box {\n    display: flex;\n    flex-direction: column;\n    justify-content: space-evenly;\n    align-items: center;\n    height: 20vh;\n    width: 55vw;\n    background-color: rgb(77, 134, 77);\n}\n\n.text-box1, .text-box2, .text-box3 {\n    height: 5vh;\n    width: 50vw;\n    background-color: lightblue;\n    font-size: 25px;\n    text-align: center;\n}\n\n\n\n/* styling for reset game */\n.end-game-box {\n    position: absolute;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    top: 245px;\n    left: 0;\n    right: 0;\n    margin-left: auto;\n    margin-right: auto;\n    width: 220px;\n    height: 220px;\n    background-color: azure;\n}\n\n.reset-game-button {\n    height: 50px;\n    width: 50px;\n    background-color: rgb(144, 58, 58);\n}\n\n\n/* styling for ship Placement */\n.valid-placement {\n    background-color: rgb(110, 189, 110);\n}\n\n.invalid-placement {\n    background-color: rgb(249, 116, 116);\n}\n\n.placed {\n    background-color: rgb(76, 76, 110);\n}\n\n.rotate-ship {\n    position: absolute;\n    top: 15px;\n    right: 20px;\n    height: 25px;\n    width: 60px;\n    /* border: 2px solid orange; */\n}\n\n.start-game-button {\n    position: absolute;\n    top: 350px;\n    left: 0;\n    right: 0;\n    margin-left: auto;\n    margin-right: auto;\n    height: 25px;\n    width: 110px;\n    border: 2px solid orange;\n}"],"sourceRoot":""}]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7V0NOQTs7Ozs7Ozs7Ozs7Ozs7QUNBMkI7QUFDaUM7QUFDaEI7QUFJNUNqRSx5REFBYyxDQUFDLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL21haW4tdGVtcGxhdGUvLi9zcmMvZ2FtZUxvb3AuanMiLCJ3ZWJwYWNrOi8vbWFpbi10ZW1wbGF0ZS8uL3NyYy9nYW1lYm9hcmRDb250cm9sbGVyLmpzIiwid2VicGFjazovL21haW4tdGVtcGxhdGUvLi9zcmMvcGxheWVyLmpzIiwid2VicGFjazovL21haW4tdGVtcGxhdGUvLi9zcmMvc2hpcC1vYmplY3QuanMiLCJ3ZWJwYWNrOi8vbWFpbi10ZW1wbGF0ZS8uL3NyYy9zaGlwUGxhY2VtZW50LmpzIiwid2VicGFjazovL21haW4tdGVtcGxhdGUvLi9zcmMvdXNlckludGVyZmFjZS5qcyIsIndlYnBhY2s6Ly9tYWluLXRlbXBsYXRlLy4vc3JjL3BhZ2VTdHlsaW5nLmNzcyIsIndlYnBhY2s6Ly9tYWluLXRlbXBsYXRlLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly9tYWluLXRlbXBsYXRlLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vbWFpbi10ZW1wbGF0ZS8uL3NyYy9wYWdlU3R5bGluZy5jc3M/YTliNyIsIndlYnBhY2s6Ly9tYWluLXRlbXBsYXRlLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL21haW4tdGVtcGxhdGUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL21haW4tdGVtcGxhdGUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vbWFpbi10ZW1wbGF0ZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9tYWluLXRlbXBsYXRlLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vbWFpbi10ZW1wbGF0ZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL21haW4tdGVtcGxhdGUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbWFpbi10ZW1wbGF0ZS93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9tYWluLXRlbXBsYXRlL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9tYWluLXRlbXBsYXRlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vbWFpbi10ZW1wbGF0ZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL21haW4tdGVtcGxhdGUvd2VicGFjay9ydW50aW1lL25vbmNlIiwid2VicGFjazovL21haW4tdGVtcGxhdGUvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L3ByZWZlci1kZWZhdWx0LWV4cG9ydCAqL1xuaW1wb3J0IHsgUGxheWVyIH0gZnJvbSBcIi4vcGxheWVyXCI7XG5pbXBvcnQgeyBnYW1lQm9hcmRDb250cm9sbGVyIH0gZnJvbSBcIi4vZ2FtZWJvYXJkQ29udHJvbGxlclwiO1xuaW1wb3J0IHsgY3JlYXRlRmxlZXQsIGNyZWF0ZU9wcEZsZWV0IH0gZnJvbSBcIi4vc2hpcC1vYmplY3RcIjtcbmltcG9ydCB7IGRvbU1hbmlwdWxhdGlvbiwgZGlhbG9ndWVDb250cm9sbGVyIH0gZnJvbSBcIi4vdXNlckludGVyZmFjZVwiO1xuaW1wb3J0IHsgaHVtYW5TaGlwUGxhY2VtZW50LCBjb21wdXRlclBsYWNlbWVudCB9IGZyb20gXCIuL3NoaXBQbGFjZW1lbnRcIjtcblxuZXhwb3J0IGNvbnN0IGluaXRpYWxpemVHYW1lID0gZnVuY3Rpb24gY3JlYXRlR2FtZSgpIHtcbiAgICBjb25zdCBydW5ET00gPSBkb21NYW5pcHVsYXRpb24oKTtcblxuXG4gICAgY29uc3QgaHVtYW5QbGF5ZXIgPSBuZXcgUGxheWVyKCdQbGF5ZXIgMScpXG4gICAgY29uc3QgaHVtYW5GbGVldCA9IGNyZWF0ZUZsZWV0KClcbiAgICBjb25zb2xlLmxvZyhodW1hbkZsZWV0KVxuICAgIGh1bWFuUGxheWVyLmdhbWVCb2FyZCA9IGdhbWVCb2FyZENvbnRyb2xsZXIoaHVtYW5GbGVldCwgaHVtYW5QbGF5ZXIucGxheWVyKTtcbiAgICBjb25zdCBodW1hbkJvYXJkID0gaHVtYW5QbGF5ZXIuZ2FtZUJvYXJkXG4gICAgaHVtYW5Cb2FyZC5jcmVhdGVCb2FyZCgpO1xuICAgIFxuXG4gICAgY29uc3QgQUlwbGF5ZXIgPSBuZXcgUGxheWVyKCdQbGF5ZXIgMicpO1xuICAgIGNvbnN0IGNvbXB1dGVyRmxlZXQgPSBjcmVhdGVPcHBGbGVldCgpO1xuICAgIEFJcGxheWVyLmdhbWVCb2FyZCA9IGdhbWVCb2FyZENvbnRyb2xsZXIoY29tcHV0ZXJGbGVldCwgQUlwbGF5ZXIucGxheWVyKTtcbiAgICBjb25zdCBjb21wdXRlckJvYXJkID0gQUlwbGF5ZXIuZ2FtZUJvYXJkO1xuICAgIGNvbXB1dGVyQm9hcmQuY3JlYXRlQm9hcmQoKTtcblxuICAgIHJ1bkRPTS5yZW5kZXJTdGFydCgpO1xuICAgIHJ1bkRPTS5yZW5kZXJHYW1lQm9hcmQoY29tcHV0ZXJCb2FyZC5jcmVhdGVCb2FyZCgpLCBBSXBsYXllci5wbGF5ZXIpO1xuICAgIHJ1bkRPTS5yZW5kZXJHYW1lQm9hcmQoY29tcHV0ZXJCb2FyZCwgaHVtYW5QbGF5ZXIucGxheWVyLCBodW1hbkJvYXJkKTtcbiAgICBcbiAgICAvLyBjYWxsIHJlbmRlciBkaWFsb2d1ZSBib3ggaGVyZVxuICAgIGNvbnN0IGNyZWF0RGlhbG9ndWUgPSBydW5ET00ucmVuZGVyRGlhbG9ndWVCb3goKTtcbiAgICBjb25zdCBkaWFsb2d1ZSA9IGRpYWxvZ3VlQ29udHJvbGxlcigpXG4gICAgZGlhbG9ndWUucGxhY2VTaGlwc01lc3NhZ2UoKVxuXG4gICAgLy8gY2FsbCBjb21wdXRlclBsYWNlbWVudCB0byBzZXQgdXAgY29tcHV0ZXIncyBjaGlwczpcbiAgICBjb25zdCBjb21wdXRlclBsYWNlbWVudHMgPSBjb21wdXRlclBsYWNlbWVudChjb21wdXRlckJvYXJkLCBjb21wdXRlckZsZWV0KTtcbiAgICBcbiAgICAvLyBjYWxsIHNoaXBQbGFjZW1lbnQgZnVuY3Rpb24gaGVyZSBmb3IgaHVtYW5Cb2FyZFxuICAgIGNvbnN0IGh1bWFuUGxhY2VtZW50ID0gaHVtYW5TaGlwUGxhY2VtZW50KGh1bWFuQm9hcmQsIGh1bWFuRmxlZXQpO1xuXG4gICBcbn1cblxuZXhwb3J0IGNvbnN0IHJlc2V0SW50ZXJmYWNlID0gZnVuY3Rpb24gKGJvZHlFLCBlbmRCb3gpIHtcbiAgICBjb25zb2xlLmxvZygncmVzZXRpbmcgYWxsIHRoaXMgc2hpdCcpO1xuICAgIGNvbnN0IHBsYXllckJvYXJkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nYW1lYm9hcmRzJyk7XG4gICAgY29uc3QgZGlhbG9ndWVDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGlhbG9ndWUtY29udGFpbmVyJyk7XG4gICAgY29uc3QgZGlhbG9ndWVCb3ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGlhbG9ndWUtYm94Jyk7XG4gICAgY29uc3QgZ2FtZUJvYXJkV3JhcHBlcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYm9hcmQtd3JhcHBlcicpO1xuXG5cbiAgICBnYW1lQm9hcmRXcmFwcGVycy5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG4gICAgICAgIHBsYXllckJvYXJkcy5yZW1vdmVDaGlsZChlbGVtZW50KTtcbiAgICB9KTtcblxuICAgIGRpYWxvZ3VlQ29udGFpbmVyLnJlbW92ZUNoaWxkKGRpYWxvZ3VlQm94KTtcbiAgICBib2R5RS5yZW1vdmVDaGlsZChlbmRCb3gpO1xuXG4gICAgaW5pdGlhbGl6ZUdhbWUoKTtcblxufSIsIi8qIGVzbGludC1kaXNhYmxlIG5vLXVzZS1iZWZvcmUtZGVmaW5lICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1lbHNlLXJldHVybiAqL1xuLyogZXNsaW50LWRpc2FibGUgbm8tbG9vcC1mdW5jICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1wbHVzcGx1cyAqL1xuLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L3ByZWZlci1kZWZhdWx0LWV4cG9ydCAqL1xuXG4vLyBnYW1lQm9hcmQgc2hvdWxkIGNoZWNrIGlmIGEgZ2FtZSBpcyBvdmVyIGJ5IHNlZWluZyBpZiB0aGVcbi8vIGxlbmd0aCBvZiBcInNoaXBzXCIgaXMgemVybyAoY2hlY2tBbGxTdW5rKVxuXG4vLyBwbGFjaW5nIHNoaXBzIHZlcnRpY2FsbHkuLi4gcG9zc2libGUgaWRlYTogaGF2ZSBhIGNvbHVtbiBudW1iZXIgKGUuZyAzKVxuLy8gdGhhdCB5b3UgdXNlIHRvIHNlbGVjdCB0aGUgY29ycmVzcG9uZGluZyBhcnJheSBpdGVtIGluIGVhY2hcbi8vIG9mIHRoZSBhcnJheXMgdGhhdCByZXByZXNlbnRzIGEgcm93IG9uIHRoZSBib2FyZFxuaW1wb3J0IHsgU2hpcCwgY3JlYXRlRmxlZXQgfSBmcm9tIFwiLi9zaGlwLW9iamVjdFwiXG5pbXBvcnQgeyBkb21NYW5pcHVsYXRpb24sIGRpYWxvZ3VlQ29udHJvbGxlciB9IGZyb20gXCIuL3VzZXJJbnRlcmZhY2VcIjtcblxuY29uc3QgcnVuRE9NID0gZG9tTWFuaXB1bGF0aW9uKCk7XG5jb25zdCBkaWFsb2d1ZVJlZnJlc2ggPSBkaWFsb2d1ZUNvbnRyb2xsZXIoKTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdhbWVCb2FyZENvbnRyb2xsZXIoZmxlZXQsIG5hbWUpIHtcbiAgICBjb25zdCBwbGF5ZXJOYW1lID0gbmFtZTtcbiAgICBjb25zdCBib2FyZCA9IFtdO1xuICAgIGNvbnN0IHNoaXBzID0gZmxlZXQ7XG5cbiAgICAvLyBjb25zb2xlLmxvZyhzaGlwcyk7XG5cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZUJvYXJkKCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICAgICAgICAgIGJvYXJkW2ldID0gW107XG5cbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGorKykge1xuICAgICAgICAgICAgICAgIGJvYXJkW2ldW2pdID0gZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyhib2FyZCk7XG4gICAgICAgIHJldHVybiBib2FyZFxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBsYWNlSG9yaXpvbnRhbFNoaXAocm93LCBjb2wsIHNoaXApIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBuZXdDb29yZHMgPSBbcm93LCBjb2wgKyBpXTtcbiAgICAgICAgICAgIHNoaXAuY29vcmRzLnB1c2gobmV3Q29vcmRzKVxuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKHNoaXApO1xuICAgICAgICBjb25zb2xlLmxvZyhzaGlwLm5hbWUpO1xuICAgICAgICBjb25zb2xlLmxvZyhzaGlwcylcbiAgICAgICAgcmV0dXJuIHNoaXBcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwbGFjZVZlcnRpY2FsU2hpcChyb3csIGNvbCwgc2hpcCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IG5ld0Nvb3JkcyA9IFtyb3cgKyBpLCBjb2xdO1xuICAgICAgICAgICAgc2hpcC5jb29yZHMucHVzaChuZXdDb29yZHMpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKHNoaXApXG4gICAgICAgIGNvbnNvbGUubG9nKHNoaXBzKVxuICAgICAgICByZXR1cm4gc2hpcFxuICAgIH1cbiAgICBcbiAgICBmdW5jdGlvbiByZWNpZXZlQXR0YWNrKGNvb3Jkcykge1xuICAgICAgICBjb25zb2xlLmxvZyhjb29yZHMpXG4gICAgICAgIGxldCBhdHRhY2tTdGF0dXMgPSAnbWlzcyc7XG5cbiAgICAgICAgLy8gY2hlY2sgdG8gc2VlIGlmIGNvb3JkcyBoYXZlIGFscmVhZHkgYmVlbiB1c2VkOlxuICAgICAgICBpZiAoY2hlY2tJZlVzZWQoY29vcmRzKSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgcmV0dXJuICdmaWxsZWQgYWxyZWFkeSdcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHNoaXBzW2ldLmNvb3Jkcy5mb3JFYWNoKChjb29yZCkgPT4ge1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmIChjaGVja0lmVXNlZChjb29yZHMpID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnZmlsbGVkIGFscmVhZHknXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGNvb3JkWzBdID09PSBjb29yZHNbMF0gJiYgY29vcmRbMV0gPT09IGNvb3Jkc1sxXSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnaGl0Jyk7XG4gICAgICAgICAgICAgICAgICAgIGF0dGFja1N0YXR1cyA9ICdoaXQnXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGF0dGFja1N0YXR1cylcbiAgICAgICAgICAgICAgICAgICAgc2hpcHNbaV0uaGl0KCk7XG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZUJvYXJkU3BvdChjb29yZHMpO1xuICAgICAgICAgICAgICAgICAgICBkaWFsb2d1ZVJlZnJlc2gubW92ZVJlc3VsdChhdHRhY2tTdGF0dXMsXG4gICAgICAgICAgICAgICAgICAgICAgICBwbGF5ZXJOYW1lLCBjb29yZHMsIHNoaXBzW2ldKVxuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHN1bmtDaGVjayA9IHNoaXBzW2ldLmNoZWNrSWZTdW5rKClcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN1bmtDaGVjaykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGlhbG9ndWVSZWZyZXNoLnN1bmtTaGlwTWVzc2FnZShzaGlwc1tpXSwgcGxheWVyTmFtZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHNoaXBzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrQWxsU3VuaygpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICB1cGRhdGVCb2FyZFNwb3QoY29vcmRzLCBhdHRhY2tTdGF0dXMpO1xuICAgICAgICBpZiAoYXR0YWNrU3RhdHVzID09PSAnbWlzcycpIHtcbiAgICAgICAgICAgIGRpYWxvZ3VlUmVmcmVzaC5tb3ZlUmVzdWx0KGF0dGFja1N0YXR1cyxcbiAgICAgICAgICAgICAgICBwbGF5ZXJOYW1lLCBjb29yZHMpXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiBhdHRhY2tTdGF0dXNcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjaGVja0FsbFN1bmsoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKHNoaXBzKTtcbiAgICAgICAgaWYgKHNoaXBzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgZGlhbG9ndWVSZWZyZXNoLmVuZEdhbWVNZXNzYWdlKHBsYXllck5hbWUpXG4gICAgICAgICAgICBlbmRHYW1lKClcbiAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVwZGF0ZUJvYXJkU3BvdChjb29yZHMsIGF0dGFja1N0YXR1cykge1xuICAgICAgICBib2FyZFtjb29yZHNbMF0gLSAxXVtjb29yZHNbMV0gLSAxXSA9IHRydWU7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGJvYXJkKVxuICAgICAgICBydW5ET00udXNlR3JpZFNwb3QoY29vcmRzLCBhdHRhY2tTdGF0dXMsIHBsYXllck5hbWUpXG4gICAgICAgIHJldHVybiBib2FyZFxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNoZWNrSWZVc2VkKGNvb3Jkcykge1xuICAgICAgICBpZiAoYm9hcmRbY29vcmRzWzBdIC0gMV1bY29vcmRzWzFdIC0gMV0gPT09IHRydWUpIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdhbHJlYWR5IHVzZWQnKVxuICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZW5kR2FtZSgpIHtcbiAgICAgICAgLy8gd2FudCB0byBkaXNhYmxlIGJvdGggZ2FtZUJvYXJkc1xuICAgICAgICAvLyB3YW50IHRvIG1ha2UgdGhlIHJlc3RhcnQgYnV0dG9uIGFwcGVhclxuICAgICAgICBjb25zb2xlLmxvZygnZW5kaW5nIGdhbWUnKTtcbiAgICAgICAgcnVuRE9NLmZyZWV6ZUdyaWQoKTtcbiAgICAgICAgcnVuRE9NLnJlbmRlckVuZEdhbWUoKTtcbiAgICB9XG4gICAgLy8gbGlrZWx5IHdpbGwgaGF2ZSB0byBpbXBsZW1lbnQgY2hlY2sgdG8gbWFrZSBzdXJlIGEgc2hpcCBjYW5cbiAgICAvLyBiZSBwbGFjZWQgd2l0aCBubyBvdmVybGFwXG5cblxuICAgIHJldHVybiB7IGNyZWF0ZUJvYXJkLCBwbGFjZUhvcml6b250YWxTaGlwLCBwbGFjZVZlcnRpY2FsU2hpcCwgcmVjaWV2ZUF0dGFjayxcbiAgICBjaGVja0FsbFN1bmssIHVwZGF0ZUJvYXJkU3BvdCwgY2hlY2tJZlVzZWQsIGVuZEdhbWUgfVxufVxuXG4iLCIvLyBjcmVhdGUgYm90aCB0aGUgdXNlciBwbGF5ZXIgYW5kIHRoZSBjb21wdXRlciBwbGF5ZXIgaGVyZVxuXG4vLyBjb21wdXRlciBwbGF5ZXIgaGFzIGF0dGFjayBjb29yZGluYXRlcyBnZW5lcmF0b3IgZnVuY3Rpb25cblxuZXhwb3J0IGNsYXNzIFBsYXllciB7XG4gICAgY29uc3RydWN0b3IocGxheWVyLCBnYW1lQm9hcmQpIHtcbiAgICAgICAgdGhpcy5wbGF5ZXIgPSBwbGF5ZXI7XG4gICAgICAgIHRoaXMuZ2FtZUJvYXJkPSBudWxsXG4gICAgfVxufVxuXG5cbmV4cG9ydCBjb25zdCB1c2VyUGxheWVyID0gZnVuY3Rpb24gKCkge1xuXG59XG5cbmV4cG9ydCBjb25zdCBjb21wdXRlclBsYXllciA9IGZ1bmN0aW9uICgpIHtcbiAgICBjb25zdCB2aXNpdGVkID0gW107XG5cbiAgICBmdW5jdGlvbiBwaWNrUmFuZG9tQ2VsbChodW1hbkJvYXJkKSB7XG4gICAgICAgIGNvbnN0IHJvdyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKSArIDFcbiAgICAgICAgY29uc3QgY29sdW1uID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApICsgMVxuICAgICAgICBjb25zdCBjb21wQ29vcmRzID0gW3JvdywgY29sdW1uXTtcblxuICAgICAgICBjb25zdCByZXBlYXRCb29sZWFuID0gY2hlY2tSZXBlYXRDZWxsKGNvbXBDb29yZHMpXG4gICAgICAgIGNvbnNvbGUubG9nKHJlcGVhdEJvb2xlYW4pXG4gICAgICAgIGlmIChyZXBlYXRCb29sZWFuID09PSB0cnVlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnY29tcHV0ZXIgcGlja2VkIHVzZWQgY2VsbCEhJylcbiAgICAgICAgICAgIHBpY2tSYW5kb21DZWxsKGh1bWFuQm9hcmQpO1xuICAgICAgICB9IGVsc2UgaWYgKHJlcGVhdEJvb2xlYW4gPT09IGZhbHNlKSB7XG4gICAgICAgICAgICB2aXNpdGVkLnB1c2goY29tcENvb3Jkcyk7XG4gICAgICAgICAgICBodW1hbkJvYXJkLnJlY2lldmVBdHRhY2soY29tcENvb3Jkcyk7XG5cbiAgICAgICAgICAgIHJldHVybiBjb21wQ29vcmRzIFxuICAgICAgICB9XG4gICAgICAgIFxuXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2hlY2tSZXBlYXRDZWxsKGNvb3Jkcykge1xuICAgICAgICBjb25zdCBzdHJpbmdlZENvb3JkcyA9IEpTT04uc3RyaW5naWZ5KGNvb3Jkcyk7XG4gICAgICAgIGNvbnN0IGV4aXN0c0Jvb2xlYW4gPSB2aXNpdGVkLnNvbWUoKGNvb3JkKSA9PiBKU09OLnN0cmluZ2lmeShjb29yZCkgPT09IHN0cmluZ2VkQ29vcmRzKVxuICAgICAgICBjb25zb2xlLmxvZyhleGlzdHNCb29sZWFuKVxuICAgICAgICByZXR1cm4gZXhpc3RzQm9vbGVhblxuICAgIH1cblxuICAgIHJldHVybiB7cGlja1JhbmRvbUNlbGwsIGNoZWNrUmVwZWF0Q2VsbH1cbn0iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby1lbHNlLXJldHVybiAqL1xuLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L3ByZWZlci1kZWZhdWx0LWV4cG9ydCAqL1xuaW1wb3J0IHsgZ2FtZUJvYXJkQ29udHJvbGxlciB9IGZyb20gXCIuL2dhbWVib2FyZENvbnRyb2xsZXJcIjtcblxuXG5leHBvcnQgY2xhc3MgU2hpcCB7XG4gICAgY29uc3RydWN0b3IobGVuZ3RoLCBuYW1lLCBoaXRzLCBpc1N1bmssIGNvb3Jkcykge1xuICAgICAgICB0aGlzLmxlbmd0aCA9IGxlbmd0aDtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy5oaXRzID0gMDtcbiAgICAgICAgdGhpcy5pc1N1bmsgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5jb29yZHMgPSBbXVxuICAgIH1cblxuICAgIGhpdCgpIHtcbiAgICAgICAgdGhpcy5oaXRzICs9IDFcbiAgICAgICAgY29uc29sZS5sb2coJ2hpdCBhZGRlZCcpXG4gICAgfVxuXG4gICAgY2hlY2tJZlN1bmsoKSB7XG4gICAgICAgIGlmICh0aGlzLmxlbmd0aCA9PT0gdGhpcy5oaXRzKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnU3VuayEnKVxuICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMubGVuZ3RoKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuaGl0cyk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgIH1cblxufVxuXG5jb25zdCBib2FyZFJ1biA9IGdhbWVCb2FyZENvbnRyb2xsZXIoKTtcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUZsZWV0KCkge1xuICAgIGNvbnN0IHNoaXBzID0gW11cblxuICAgIGNvbnN0IGNhcnJpZXIgPSBuZXcgU2hpcCg1LCAnQ2FycmllcicpO1xuICAgIGNvbnN0IGJhdHRsZXNoaXAgPSBuZXcgU2hpcCg0LCAnQmF0dGxlc2hpcCcpO1xuICAgIGNvbnN0IGRlc3Ryb3llciA9IG5ldyBTaGlwKDMsICdEZXN0cm95ZXInKTtcbiAgICBjb25zdCBzdWJtYXJpbmUgPSBuZXcgU2hpcCgzLCAnU3VibWFyaW5lJyk7XG4gICAgY29uc3QgcGF0cm9sQm9hdCA9IG5ldyBTaGlwKDIsICdQYXRyb2wgQm9hdCcpO1xuIFxuICAgIHNoaXBzLnB1c2goY2FycmllciwgYmF0dGxlc2hpcCwgZGVzdHJveWVyLCBzdWJtYXJpbmUsIHBhdHJvbEJvYXQpXG5cbiAgICBjb25zb2xlLmxvZyhzaGlwcyk7XG4gICAgcmV0dXJuIHNoaXBzXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVPcHBGbGVldCgpIHtcbiAgICBjb25zdCBzaGlwcyA9IFtdXG5cbiAgICBjb25zdCBjYXJyaWVyID0gbmV3IFNoaXAoNSwgJ0NhcnJpZXInKTtcbiAgICBjb25zdCBiYXR0bGVzaGlwID0gbmV3IFNoaXAoNCwgJ0JhdHRsZXNoaXAnKTtcbiAgICBjb25zdCBkZXN0cm95ZXIgPSBuZXcgU2hpcCgzLCAnRGVzdHJveWVyJyk7XG4gICAgY29uc3Qgc3VibWFyaW5lID0gbmV3IFNoaXAoMywgJ1N1Ym1hcmluZScpO1xuICAgIGNvbnN0IHBhdHJvbEJvYXQgPSBuZXcgU2hpcCgyLCAnUGF0cm9sIEJvYXQnKTtcblxuICAgIHNoaXBzLnB1c2goY2FycmllciwgYmF0dGxlc2hpcCwgZGVzdHJveWVyLCBzdWJtYXJpbmUsIHBhdHJvbEJvYXQpO1xuXG4gICAgY29uc29sZS5sb2coc2hpcHMpO1xuICAgIHJldHVybiBzaGlwc1xufSIsIi8qIGVzbGludC1kaXNhYmxlIG5vLXVzZS1iZWZvcmUtZGVmaW5lICovXG4vKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvcHJlZmVyLWRlZmF1bHQtZXhwb3J0ICovXG5cbi8vIHJvdGF0ZUJ1dHRvbiBhbGxvd3MgcGxheWVycyB0byByb3RhdGUgc2hpcHMgZHVyaW5nIHBsYWNlbWVudCBwaGFzZVxuLy8gc3RhcnRCdXR0b24gYWxsb3dzIHBsYXllciB0byBhdHRhY2sgd2hlbiBhbGwgc2hpcHMgaGF2ZSBiZWVuIHBsYWNlZFxuaW1wb3J0IHsgZGlhbG9ndWVDb250cm9sbGVyIH0gZnJvbSBcIi4vdXNlckludGVyZmFjZVwiO1xuXG5cbmV4cG9ydCBjb25zdCBodW1hblNoaXBQbGFjZW1lbnQgPSBmdW5jdGlvbiAoaHVtYW5Cb2FyZCwgc2hpcHMpIHtcbiAgICBjb25zdCByb3RhdGVCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucm90YXRlLXNoaXAnKTtcbiAgICBjb25zdCBzdGFydEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdGFydC1nYW1lLWJ1dHRvbicpO1xuICAgIGNvbnN0IGdhbWVCb2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nYW1lYm9hcmQnKTtcbiAgICBjb25zdCBkaWFsb2d1ZVJ1biA9IGRpYWxvZ3VlQ29udHJvbGxlcigpO1xuXG4gICAgLy8gbWVtb3J5IHN0b3JhZ2UgZm9yIHdoZXJlIGNlbGxzIGNhbid0IGJlIHVzZWQgYWdhaW5cbiAgICBjb25zdCBvY2N1cGllZENlbGxzID0gW107XG5cbiAgICAvLyBzZXRzIHBsYW5lXG4gICAgbGV0IGN1cnJlbnRQbGFuZSA9ICdob3Jpem9udGFsJztcbiAgICBjcmVhdGVSb3RhdGlvbkFiaWxpdHkoKTtcblxuICAgIGNvbnN0IGh1bWFuQ2VsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2VsbCcpO1xuICAgIGxldCBzaGlwSW5kZXggPSAwO1xuICAgIFxuXG4gICAgaHVtYW5DZWxscy5mb3JFYWNoKChjZWxsKSA9PiB7XG4gICAgICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgKCkgPT4ge1xuICAgICAgICAgICAgY2VsbEhvdmVyKGNlbGwsIHNoaXBzW3NoaXBJbmRleF0pXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICBpZiAoY2VsbC5jbGFzc0xpc3QuY29udGFpbnMoJ3ZhbGlkLXBsYWNlbWVudCcpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRQbGFuZSA9PT0gJ2hvcml6b250YWwnKSB7XG4gICAgICAgICAgICAgICAgICAgIHBsYWNlSG9yaXpvbnRhbGx5KGNlbGwuY29vcmRpbmF0ZXMsIGNlbGwuYWN0aXZlQ2VsbHMsIHNoaXBzW3NoaXBJbmRleF0pO1xuICAgICAgICAgICAgICAgICAgICBzaGlwSW5kZXggKz0gMTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNoaXBJbmRleCA9PT0gNSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRCdXR0b25FbWVyZ2UoKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHNoaXBJbmRleCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjdXJyZW50UGxhbmUgPT09ICd2ZXJ0aWNhbCcpIHtcbiAgICAgICAgICAgICAgICAgICAgcGxhY2VWZXJ0aWNhbGx5KGNlbGwuY29vcmRpbmF0ZXMsIGNlbGwuYWN0aXZlQ2VsbHMsIHNoaXBzW3NoaXBJbmRleF0pO1xuICAgICAgICAgICAgICAgICAgICBzaGlwSW5kZXggKz0gMTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNoaXBJbmRleCA9PT0gNSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRCdXR0b25FbWVyZ2UoKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHNoaXBJbmRleCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHNoaXBJbmRleFxuICAgICAgICB9KVxuICAgIH0pXG5cbiAgICBcbiAgICBmdW5jdGlvbiBjZWxsSG92ZXIoY2VsbCwgc2hpcCkge1xuICAgICAgICBjb25zdCBjZWxsQ29vcmRzID0gY2VsbC5jb29yZGluYXRlcztcbiAgICAgICAgY2VsbC5hY3RpdmVDZWxscyA9IFtdO1xuICAgICAgICBjb25zdCBncm91cGVkQ2VsbHMgPSBjZWxsLmFjdGl2ZUNlbGxzO1xuICAgICAgICAvLyBoYXZlIHRvIGNoZWNrIGlmIGl0cyBob3Jpem9udGFsIG9yIHZlcnRpY2FsXG4gICAgICAgIC8vIHRoZW4gY2hlY2sgaWYgc3RhcnRpbmcgcG9pbnQgKyBzaGlwIGxlbmd0aCBpcyB2YWxpZFxuICAgICAgICBpZiAoc2hpcEluZGV4ID09PSA1KSB7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjdXJyZW50UGxhbmUgPT09ICdob3Jpem9udGFsJykge1xuICAgICAgICAgICAgY29uc3QgY2VsbFJvdyA9IGNlbGxDb29yZHNbMF1cbiAgICAgICAgICAgIGxldCBjZWxsQ29sdW1uID0gY2VsbENvb3Jkc1sxXTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgYWN0aXZlQ2VsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGAke2NlbGxSb3d9ICR7Y2VsbENvbHVtbn1oYClcbiAgICAgICAgICAgICAgICBncm91cGVkQ2VsbHMucHVzaChhY3RpdmVDZWxsKTtcbiAgICAgICAgICAgICAgICBjZWxsQ29sdW1uICs9IDFcbiAgICAgICAgICAgICAgICBpZiAoY2VsbENvbHVtbiA+IDEwKSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgY29uZmxpY3RpbmcgPSBjaGVja0NvbmZsaWN0aW5nU2hpcHMoZ3JvdXBlZENlbGxzKTtcblxuICAgICAgICAgICAgaWYgKChjZWxsQ29vcmRzWzFdICsgc2hpcC5sZW5ndGgpIC0gMSA8PSAxMCAmJiBjb25mbGljdGluZyA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICBncm91cGVkQ2VsbHMuZm9yRWFjaCgoZWxlbSkgPT4ge1xuICAgICAgICAgICAgICAgICAgIGVsZW0uY2xhc3NMaXN0LmFkZCgndmFsaWQtcGxhY2VtZW50Jyk7IFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9IGVsc2UgaWYgKChjZWxsQ29vcmRzWzFdICsgc2hpcC5sZW5ndGgpIC0gMSA+IDEwIHx8IGNvbmZsaWN0aW5nID09PSB0cnVlKXtcbiAgICAgICAgICAgICAgICBncm91cGVkQ2VsbHMuZm9yRWFjaCgoZWxlbSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBlbGVtLmNsYXNzTGlzdC5hZGQoJ2ludmFsaWQtcGxhY2VtZW50Jyk7IFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdXQnLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgZ3JvdXBlZENlbGxzLmZvckVhY2goKGVsZW0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZWxlbS5jbGFzc0xpc3QucmVtb3ZlKCd2YWxpZC1wbGFjZW1lbnQnLCAnaW52YWxpZC1wbGFjZW1lbnQnKVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KVxuXG5cbiAgICAgICAgfSBlbHNlIGlmIChjdXJyZW50UGxhbmUgPT09ICd2ZXJ0aWNhbCcpIHtcbiAgICAgICAgICAgIGxldCBjZWxsUm93ID0gY2VsbENvb3Jkc1swXVxuICAgICAgICAgICAgY29uc3QgY2VsbENvbHVtbiA9IGNlbGxDb29yZHNbMV07XG5cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGFjdGl2ZUNlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHtjZWxsUm93fSAke2NlbGxDb2x1bW59aGApXG4gICAgICAgICAgICAgICAgZ3JvdXBlZENlbGxzLnB1c2goYWN0aXZlQ2VsbCk7XG4gICAgICAgICAgICAgICAgY2VsbFJvdyArPSAxXG4gICAgICAgICAgICAgICAgaWYgKGNlbGxSb3cgPiAxMCkge1xuICAgICAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGNvbmZsaWN0aW5nID0gY2hlY2tDb25mbGljdGluZ1NoaXBzKGdyb3VwZWRDZWxscyk7XG5cblxuICAgICAgICAgICAgaWYgKChjZWxsQ29vcmRzWzBdICsgc2hpcC5sZW5ndGgpIC0gMSA8PSAxMCAmJiBjb25mbGljdGluZyA9PT0gZmFsc2UgKSB7XG4gICAgICAgICAgICAgICAgZ3JvdXBlZENlbGxzLmZvckVhY2goKGVsZW0pID0+IHtcbiAgICAgICAgICAgICAgICAgICBlbGVtLmNsYXNzTGlzdC5hZGQoJ3ZhbGlkLXBsYWNlbWVudCcpOyBcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfSBlbHNlIGlmICgoY2VsbENvb3Jkc1swXSArIHNoaXAubGVuZ3RoKSAtIDEgPiAxMCB8fCBjb25mbGljdGluZyA9PT0gdHJ1ZSl7XG4gICAgICAgICAgICAgICAgZ3JvdXBlZENlbGxzLmZvckVhY2goKGVsZW0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZWxlbS5jbGFzc0xpc3QuYWRkKCdpbnZhbGlkLXBsYWNlbWVudCcpOyBcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0JywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGdyb3VwZWRDZWxscy5mb3JFYWNoKChlbGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGVsZW0uY2xhc3NMaXN0LnJlbW92ZSgndmFsaWQtcGxhY2VtZW50JywgJ2ludmFsaWQtcGxhY2VtZW50JylcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBsYWNlSG9yaXpvbnRhbGx5KGNlbGxDb29yZHMsIGFjdGl2ZUNlbGxzLCBzaGlwKSB7XG4gICAgICAgIGFjdGl2ZUNlbGxzLmZvckVhY2goKGVsZW0pID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVsZW0uY29vcmRpbmF0ZXMpO1xuICAgICAgICAgICAgb2NjdXBpZWRDZWxscy5wdXNoKGVsZW0uY29vcmRpbmF0ZXMpO1xuICAgICAgICAgICAgZWxlbS5jbGFzc0xpc3QuYWRkKCdwbGFjZWQnKVxuICAgICAgICB9KTtcbiAgICAgICAgaHVtYW5Cb2FyZC5wbGFjZUhvcml6b250YWxTaGlwKGNlbGxDb29yZHNbMF0sIGNlbGxDb29yZHNbMV0sIHNoaXApO1xuICAgICAgICBjb25zb2xlLmxvZyhvY2N1cGllZENlbGxzKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwbGFjZVZlcnRpY2FsbHkoY2VsbENvb3JkcywgYWN0aXZlQ2VsbHMsIHNoaXApIHtcbiAgICAgICAgYWN0aXZlQ2VsbHMuZm9yRWFjaCgoZWxlbSkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZWxlbS5jb29yZGluYXRlcyk7XG4gICAgICAgICAgICBvY2N1cGllZENlbGxzLnB1c2goZWxlbS5jb29yZGluYXRlcyk7XG4gICAgICAgICAgICBlbGVtLmNsYXNzTGlzdC5hZGQoJ3BsYWNlZCcpXG4gICAgICAgIH0pO1xuICAgICAgICBodW1hbkJvYXJkLnBsYWNlVmVydGljYWxTaGlwKGNlbGxDb29yZHNbMF0sIGNlbGxDb29yZHNbMV0sIHNoaXApO1xuICAgICAgICBjb25zb2xlLmxvZyhvY2N1cGllZENlbGxzKVxuICAgIH1cblxuXG4gICAgXG4gICAgZnVuY3Rpb24gY2hlY2tDb25mbGljdGluZ1NoaXBzKGFjdGl2ZUNlbGxzKSB7XG4gICAgICAgIGxldCBhbHJlYWR5VXNlZCA9IGZhbHNlXG4gICAgICAgIGFjdGl2ZUNlbGxzLmZvckVhY2goKGVsZW0pID0+IHtcbiAgICAgICAgICAgIGlmIChjaGVja0ZvclJlcGVhdChlbGVtLmNvb3JkaW5hdGVzLCBvY2N1cGllZENlbGxzKSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIGFscmVhZHlVc2VkID0gdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICByZXR1cm4gYWxyZWFkeVVzZWRcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVSb3RhdGlvbkFiaWxpdHkoKSB7XG4gICAgICAgIHJvdGF0ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG5ld1BsYW5lID0gc3dpdGNoUGxhbmUoY3VycmVudFBsYW5lKTtcbiAgICAgICAgICAgIGN1cnJlbnRQbGFuZSA9IG5ld1BsYW5lXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc3RhcnRCdXR0b25FbWVyZ2UoKSB7XG4gICAgICAgIHN0YXJ0QnV0dG9uLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snOyBcbiAgICAgICAgc3RhcnRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICBkaWFsb2d1ZVJ1bi5iZWdpbkF0dGFja01lc3NhZ2UoKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzdGFydCEnKTtcbiAgICAgICAgICAgIGdhbWVCb2FyZC5zdHlsZS5wb2ludGVyRXZlbnRzID0gJ2F1dG8nO1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIHJldHVybiB7IGNlbGxIb3ZlciwgcGxhY2VIb3Jpem9udGFsbHksIGNoZWNrQ29uZmxpY3RpbmdTaGlwcyB9XG59XG5cblxuXG5cblxuLy8gY29tcHV0ZXIgcGxhY2VtZW50IGxvZ2ljXG5cbmV4cG9ydCBjb25zdCBjb21wdXRlclBsYWNlbWVudCA9IGZ1bmN0aW9uIChjb21wdXRlckJvYXJkLCBzaGlwcykge1xuICAgIGNvbnN0IHBsYW5lcyA9IFsnaG9yaXpvbnRhbCcsICd2ZXJ0aWNhbCddXG4gICAgY29uc3QgdXNlZENlbGxzID0gW107XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNyZWF0ZVNoaXBDb29yZHMoc2hpcHNbaV0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZVNoaXBDb29yZHMoc2hpcCkge1xuXG4gICAgICAgIC8vIGNvbnN0IGNob3NlblBsYW5lID0gY2hvb3NlUGxhbmUocGxhbmVzKTtcbiAgICAgICAgLy8gdGVzdDpcbiAgICAgICAgY29uc3QgY2hvc2VuUGxhbmUgPSAndmVydGljYWwnO1xuICAgICAgICBjb25zb2xlLmxvZyhjaG9zZW5QbGFuZSlcbiAgICAgICAgaWYgKGNob3NlblBsYW5lID09PSAnaG9yaXpvbnRhbCcpIHtcbiAgICAgICAgICAgIHRlc3RIb3Jpem9udGFsU2hpcChzaGlwKVxuICAgICAgICB9IGVsc2UgaWYgKGNob3NlblBsYW5lID09PSAndmVydGljYWwnKSB7XG4gICAgICAgICAgICB0ZXN0VmVydGljYWxTaGlwKHNoaXApO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBmdW5jdGlvbiB0ZXN0SG9yaXpvbnRhbFNoaXAoc2hpcCkge1xuICAgICAgICBjb25zdCBzdGFydGluZ0Nvb3JkcyA9IGNyZWF0ZUhvcml6b250YWxTdGFydChzaGlwKVxuICAgICAgICB1c2VkQ2VsbHMucHVzaChzdGFydGluZ0Nvb3Jkcyk7XG4gICAgICAgIGxldCByZXBlYXREZXRlY3QgPSBmYWxzZTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBzaGlwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBuZXdDb29yZHMgPSBbc3RhcnRpbmdDb29yZHNbMF0sIHN0YXJ0aW5nQ29vcmRzWzFdICsgaV07XG4gICAgICAgICAgICBjb25zdCByZXBlYXQgPSBjaGVja0ZvclJlcGVhdChuZXdDb29yZHMsIHVzZWRDZWxscylcbiAgICAgICAgICAgIGlmIChyZXBlYXQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgdXNlZENlbGxzLnB1c2gobmV3Q29vcmRzKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocmVwZWF0ID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgcmVwZWF0RGV0ZWN0ID0gdHJ1ZVxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocmVwZWF0RGV0ZWN0ID09PSBmYWxzZSkge1xuICAgICAgICAgICAgY29tcHV0ZXJCb2FyZC5wbGFjZUhvcml6b250YWxTaGlwKHN0YXJ0aW5nQ29vcmRzWzBdLCBzdGFydGluZ0Nvb3Jkc1sxXSwgc2hpcCk7XG4gICAgICAgIH0gZWxzZSBpZiAocmVwZWF0RGV0ZWN0ID09PSB0cnVlKSB7XG4gICAgICAgICAgICB0ZXN0SG9yaXpvbnRhbFNoaXAoc2hpcCk7XG4gICAgICAgIH1cblxuICAgIH1cblxuXG4gICAgZnVuY3Rpb24gdGVzdFZlcnRpY2FsU2hpcChzaGlwKSB7XG4gICAgICAgIGNvbnN0IHN0YXJ0aW5nQ29vcmRzID0gY3JlYXRlVmVydGljYWxTdGFydChzaGlwKVxuICAgICAgICB1c2VkQ2VsbHMucHVzaChzdGFydGluZ0Nvb3Jkcyk7XG4gICAgICAgIGxldCByZXBlYXREZXRlY3QgPSBmYWxzZTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBzaGlwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBuZXdDb29yZHMgPSBbc3RhcnRpbmdDb29yZHNbMF0gKyBpLCBzdGFydGluZ0Nvb3Jkc1sxXV07XG4gICAgICAgICAgICBjb25zdCByZXBlYXQgPSBjaGVja0ZvclJlcGVhdChuZXdDb29yZHMsIHVzZWRDZWxscylcbiAgICAgICAgICAgIGlmIChyZXBlYXQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgIHVzZWRDZWxscy5wdXNoKG5ld0Nvb3Jkcyk7XG4gICAgICAgICAgICAgIFxuICAgICAgICAgICAgfSBlbHNlIGlmIChyZXBlYXQgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICByZXBlYXREZXRlY3QgPSB0cnVlXG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHJlcGVhdERldGVjdCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIGNvbXB1dGVyQm9hcmQucGxhY2VWZXJ0aWNhbFNoaXAoc3RhcnRpbmdDb29yZHNbMF0sIHN0YXJ0aW5nQ29vcmRzWzFdLCBzaGlwKTtcbiAgICAgICAgfSBlbHNlIGlmIChyZXBlYXREZXRlY3QgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHRlc3RWZXJ0aWNhbFNoaXAoc2hpcCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjaG9vc2VQbGFuZShwbGFuZXMpIHtcbiAgICAgICAgY29uc3QgY2hvc2VuSW5kZXggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBwbGFuZXMubGVuZ3RoKTtcbiAgICAgICAgY29uc29sZS5sb2cocGxhbmVzW2Nob3NlbkluZGV4XSk7XG4gICAgICAgIHJldHVybiBwbGFuZXNbY2hvc2VuSW5kZXhdXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlSG9yaXpvbnRhbFN0YXJ0KHNoaXApIHtcbiAgICAgICAgY29uc3Qgcm93ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApICsgMVxuICAgICAgICBjb25zdCBjb2x1bW4gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoMTAgLSBzaGlwLmxlbmd0aCkpICsgMVxuICAgICAgICBjb25zdCBzdGFydGluZ0Nvb3JkID0gW3JvdywgY29sdW1uXTtcbiAgICAgICAgcmV0dXJuIHN0YXJ0aW5nQ29vcmRcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVWZXJ0aWNhbFN0YXJ0KHNoaXApIHtcbiAgICAgICAgY29uc3Qgcm93ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKDEwIC0gc2hpcC5sZW5ndGgpKSArIDFcbiAgICAgICAgY29uc3QgY29sdW1uID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApICsgMVxuICAgICAgICBjb25zdCBzdGFydGluZ0Nvb3JkID0gW3JvdywgY29sdW1uXTtcbiAgICAgICAgcmV0dXJuIHN0YXJ0aW5nQ29vcmRcbiAgICB9XG5cbiAgICByZXR1cm4ge2NyZWF0ZVNoaXBDb29yZHMsIHRlc3RIb3Jpem9udGFsU2hpcCwgdGVzdFZlcnRpY2FsU2hpcCxcbiAgICAgICAgY2hvb3NlUGxhbmUsIGNyZWF0ZUhvcml6b250YWxTdGFydCwgY3JlYXRlVmVydGljYWxTdGFydH1cbn1cblxuXG5mdW5jdGlvbiBjaGVja0ZvclJlcGVhdChjb29yZHMsIGFycmF5KSB7XG4gICAgY29uc3Qgc3RyaW5nZWRDb29yZHMgPSBKU09OLnN0cmluZ2lmeShjb29yZHMpO1xuICAgIGNvbnN0IGV4aXN0c0Jvb2xlYW4gPSBhcnJheS5zb21lKChjb29yZCkgPT4gSlNPTi5zdHJpbmdpZnkoY29vcmQpID09PSBzdHJpbmdlZENvb3JkcylcbiAgICBjb25zb2xlLmxvZyhleGlzdHNCb29sZWFuKVxuICAgIHJldHVybiBleGlzdHNCb29sZWFuXG59XG5cbmZ1bmN0aW9uIHN3aXRjaFBsYW5lKGN1cnJlbnRQbGFuZSkge1xuICAgIGlmIChjdXJyZW50UGxhbmUgPT09ICdob3Jpem9udGFsJykge1xuICAgICAgICBjdXJyZW50UGxhbmUgPSAndmVydGljYWwnXG4gICAgfSBlbHNlIGlmIChjdXJyZW50UGxhbmUgPT09ICd2ZXJ0aWNhbCcpIHtcbiAgICAgICAgY3VycmVudFBsYW5lID0gJ2hvcml6b250YWwnXG4gICAgfVxuICAgIHJldHVybiBjdXJyZW50UGxhbmVcbn07IiwiLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L3ByZWZlci1kZWZhdWx0LWV4cG9ydCAqL1xuaW1wb3J0IHsgY29tcHV0ZXJQbGF5ZXIgfSBmcm9tIFwiLi9wbGF5ZXJcIjtcbmltcG9ydCB7IHJlc2V0SW50ZXJmYWNlIH0gZnJvbSBcIi4vZ2FtZUxvb3BcIjtcblxuXG5leHBvcnQgY29uc3QgZG9tTWFuaXB1bGF0aW9uID0gZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IGNvbXB1dGVyTW92ZXMgPSBjb21wdXRlclBsYXllcigpXG5cbiAgICBjb25zdCBwbGF5ZXJCb2FyZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ2FtZWJvYXJkcycpO1xuICAgIGNvbnN0IGRpYWxvZ3VlQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRpYWxvZ3VlLWNvbnRhaW5lcicpXG5cbiAgICBmdW5jdGlvbiByZW5kZXJTdGFydCgpIHtcbiAgICAgICAgY29uc3Qgc3RhcnRHYW1lQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgIGFwcGVuZEVsZW1lbnQoc3RhcnRHYW1lQnV0dG9uLCAnc3RhcnQtZ2FtZS1idXR0b24nLCBwbGF5ZXJCb2FyZHMpO1xuICAgICAgICBzdGFydEdhbWVCdXR0b24udGV4dENvbnRlbnQgPSAnU3RhcnQgRmlyaW5nISdcbiAgICAgICAgc3RhcnRHYW1lQnV0dG9uLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG5cbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZW5kZXJHYW1lQm9hcmQoYm9hcmRDb250cm9sbGVyLCBwbGF5ZXJOYW1lLCBodW1hbkJvYXJkKSB7XG4gICAgICAgIGxldCBpc0NvbXB1dGVyID0gZmFsc2U7XG4gICAgICAgIGlmIChwbGF5ZXJOYW1lID09PSAnUGxheWVyIDInKSB7XG4gICAgICAgICAgICBpc0NvbXB1dGVyID0gdHJ1ZVxuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKGlzQ29tcHV0ZXIpO1xuXG4gICAgICAgIGNvbnN0IGdhbWVCb2FyZFdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgYXBwZW5kRWxlbWVudChnYW1lQm9hcmRXcmFwcGVyLCAnYm9hcmQtd3JhcHBlcicsIHBsYXllckJvYXJkcylcbiAgICAgICBcbiAgICAgICAgY29uc3QgYm9hcmRUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gyJyk7XG4gICAgICAgIGFwcGVuZEVsZW1lbnQoYm9hcmRUaXRsZSwgJ2JvYXJkLXRpdGxlJywgZ2FtZUJvYXJkV3JhcHBlcik7XG4gICAgICAgIGJvYXJkVGl0bGUudGV4dENvbnRlbnQgPSBwbGF5ZXJOYW1lO1xuXG4gICAgICAgIC8vIHJlbmRlciBib2FyZDpcbiAgICAgICAgY29uc3QgZ2FtZWJvYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGFwcGVuZEVsZW1lbnQoZ2FtZWJvYXJkLCAnZ2FtZWJvYXJkJywgZ2FtZUJvYXJkV3JhcHBlcik7XG5cbiAgICAgICAgYnVpbGRHcmlkKGdhbWVib2FyZCwgaXNDb21wdXRlcik7XG4gICAgICAgIFxuICAgICAgICBpZiAoaXNDb21wdXRlciA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIGNvbnN0IHJvdGF0ZVNoaXBCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgICAgIGFwcGVuZEVsZW1lbnQocm90YXRlU2hpcEJ1dHRvbiwgJ3JvdGF0ZS1zaGlwJywgZ2FtZUJvYXJkV3JhcHBlcik7XG4gICAgICAgICAgICByb3RhdGVTaGlwQnV0dG9uLnRleHRDb250ZW50ID0gJ1JvdGF0ZSc7ICAgICAgICBcblxuICAgICAgICAgICAgc2V0R3JpZFRyaWdnZXJzKGJvYXJkQ29udHJvbGxlciwgaHVtYW5Cb2FyZCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBnYW1lYm9hcmQuc3R5bGUucG9pbnRlckV2ZW50cyA9ICdub25lJ1xuICAgICAgICB9XG4gICAgICAgIFxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGJ1aWxkR3JpZChnYW1lYm9hcmRFbGVtZW50LCBpc0NvbXB1dGVyKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgMTE7IGkrKykge1xuICAgICAgICAgICAgY29uc3Qgcm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBhcHBlbmRFbGVtZW50KHJvdywgJ3JvdycsIGdhbWVib2FyZEVsZW1lbnQpO1xuXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMTsgaiA8IDExOyBqKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICAgICAgY2VsbC5jb29yZGluYXRlcyA9IFtpLCBqXTtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhjZWxsLmNvb3JkaW5hdGVzKVxuICAgICAgICAgICAgICAgIGlmIChpc0NvbXB1dGVyID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGFwcGVuZEVsZW1lbnQoY2VsbCwgJ2NlbGwtYycsIHJvdyk7XG4gICAgICAgICAgICAgICAgICAgIGNlbGwuc2V0QXR0cmlidXRlKCdpZCcsIGAke2l9ICR7an1jYClcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgIGFwcGVuZEVsZW1lbnQoY2VsbCwgJ2NlbGwnLCByb3cpO1xuICAgICAgICAgICAgICAgICAgIGNlbGwuc2V0QXR0cmlidXRlKCdpZCcsIGAke2l9ICR7an1oYCkgXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXRHcmlkVHJpZ2dlcnMoY29tcHV0ZXJCb2FyZENvbnRyb2xsZXIsIGh1bWFuQm9hcmRDb250cm9sbGVyKSB7XG4gICAgICAgIGNvbnN0IGNlbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNlbGwtYycpO1xuICAgICAgICBjZWxscy5mb3JFYWNoKChjZWxsKSA9PiB7XG4gICAgICAgICAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGNlbGwuY29vcmRpbmF0ZXMpO1xuICAgICAgICAgICAgICAgIGNvbXB1dGVyQm9hcmRDb250cm9sbGVyLnJlY2lldmVBdHRhY2soY2VsbC5jb29yZGluYXRlcyk7XG5cbiAgICAgICAgICAgICAgICAvLyB0cmlnZ2VyIGNvbXB1dGVyJ3MgYXR0YWNrIGluIHJlc3BvbnNlXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coaHVtYW5Cb2FyZENvbnRyb2xsZXIpO1xuICAgICAgICAgICAgICAgIGNvbXB1dGVyTW92ZXMucGlja1JhbmRvbUNlbGwoaHVtYW5Cb2FyZENvbnRyb2xsZXIpO1xuXG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgICAgICAgICAgXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXNlR3JpZFNwb3QoY29vcmRzLCBzdGF0dXMsIG5hbWUpIHtcbiAgICAgICAgLy8gcmVnaXN0ZXJzIHRoYXQgdGVoIGdyaWQgc3BvdCB3YXMgdXNlZCwgYW5kIGRpc3BsYXlzXG4gICAgICAgIC8vIGVpdGhlciBhIGhpdCBvciBtaXNzXG5cbiAgICAgICAgaWYgKG5hbWUgPT09ICdQbGF5ZXIgMicpIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHN0YXR1cyk7XG4gICAgICAgICAgICBjb25zdCB1c2VkQ2VsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxuICAgICAgICAgICAgICAgIGAke2Nvb3Jkc1swXX0gJHtjb29yZHNbMV19Y2ApXG5cbiAgICAgICAgICAgIGlmIChzdGF0dXMgPT09ICdoaXQnKSB7XG4gICAgICAgICAgICAgICAgdXNlZENlbGwudGV4dENvbnRlbnQgPSAnWCdcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc3RhdHVzID09PSAnbWlzcycpIHtcbiAgICAgICAgICAgICAgICB1c2VkQ2VsbC50ZXh0Q29udGVudCA9ICdPJ1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhzdGF0dXMpO1xuICAgICAgICAgICAgY29uc3QgdXNlZENlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcbiAgICAgICAgICAgICAgICBgJHtjb29yZHNbMF19ICR7Y29vcmRzWzFdfWhgKVxuXG4gICAgICAgICAgICBpZiAoc3RhdHVzID09PSAnaGl0Jykge1xuICAgICAgICAgICAgICAgIHVzZWRDZWxsLnRleHRDb250ZW50ID0gJ1gnXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHN0YXR1cyA9PT0gJ21pc3MnKSB7XG4gICAgICAgICAgICAgICAgdXNlZENlbGwudGV4dENvbnRlbnQgPSAnTydcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZyZWV6ZUdyaWQoKSB7XG4gICAgICAgIGNvbnN0IGdhbWVib2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nYW1lYm9hcmQnKTtcbiAgICAgICAgZ2FtZWJvYXJkLnN0eWxlLnBvaW50ZXJFdmVudHMgPSAnbm9uZSc7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVuZGVyRGlhbG9ndWVCb3goKSB7XG4gICAgICAgIGNvbnN0IGRpYWxvZ3VlQm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGFwcGVuZEVsZW1lbnQoZGlhbG9ndWVCb3gsICdkaWFsb2d1ZS1ib3gnLCBkaWFsb2d1ZUNvbnRhaW5lcilcblxuICAgICAgICBjb25zdCB0ZXh0Qm94MSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICAgIGFwcGVuZEVsZW1lbnQodGV4dEJveDEsICd0ZXh0LWJveDEnLCBkaWFsb2d1ZUJveClcblxuICAgICAgICBjb25zdCB0ZXh0Qm94MiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICAgIGFwcGVuZEVsZW1lbnQodGV4dEJveDIsICd0ZXh0LWJveDInLCBkaWFsb2d1ZUJveClcblxuICAgICAgICBjb25zdCB0ZXh0Qm94MyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBhcHBlbmRFbGVtZW50KHRleHRCb3gzLCAndGV4dC1ib3gzJywgZGlhbG9ndWVCb3gpXG4gICAgfVxuXG5cbiAgICBmdW5jdGlvbiByZW5kZXJFbmRHYW1lKCkge1xuICAgICAgICBjb25zdCBib2R5RWxlbWVudCA9IGRvY3VtZW50LmJvZHlcblxuICAgICAgICBjb25zdCBlbmRHYW1lQm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGFwcGVuZEVsZW1lbnQoZW5kR2FtZUJveCwgJ2VuZC1nYW1lLWJveCcsIGJvZHlFbGVtZW50KTtcblxuICAgICAgICBjb25zdCBlbmRHYW1lSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBhcHBlbmRFbGVtZW50KGVuZEdhbWVJY29uLCAnZW5kLWdhbWUtaWNvbicsIGVuZEdhbWVCb3gpO1xuXG4gICAgICAgIGNvbnN0IHJlc2V0R2FtZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICBhcHBlbmRFbGVtZW50KHJlc2V0R2FtZUJ1dHRvbiwgJ3Jlc2V0LWdhbWUtYnV0dG9uJywgZW5kR2FtZUJveCk7XG5cbiAgICAgICAgcmVzZXRHYW1lQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgcmVzZXRJbnRlcmZhY2UoYm9keUVsZW1lbnQsIGVuZEdhbWVCb3gpO1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFwcGVuZEVsZW1lbnQoZWxlbWVudE5hbWUsIGNsYXNzTmFtZSwgZmF0aGVyRWxlbWVudCApIHtcbiAgICAgICAgZWxlbWVudE5hbWUuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xuICAgICAgICBmYXRoZXJFbGVtZW50LmFwcGVuZENoaWxkKGVsZW1lbnROYW1lKTtcblxuICAgICAgICByZXR1cm4gZWxlbWVudE5hbWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtyZW5kZXJTdGFydCwgcmVuZGVyR2FtZUJvYXJkLCBhcHBlbmRFbGVtZW50LCBidWlsZEdyaWQsXG4gICAgICAgIHNldEdyaWRUcmlnZ2VycywgdXNlR3JpZFNwb3QsIGZyZWV6ZUdyaWQsIHJlbmRlckRpYWxvZ3VlQm94LFxuICAgICAgICByZW5kZXJFbmRHYW1lfVxuXG59XG5cblxuXG5cbmV4cG9ydCBjb25zdCBkaWFsb2d1ZUNvbnRyb2xsZXIgPSBmdW5jdGlvbigpIHtcblxuICAgIGZ1bmN0aW9uICBwbGFjZVNoaXBzTWVzc2FnZSgpIHtcbiAgICAgICAgY29uc3QgdGV4dEJveDEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGV4dC1ib3gxJyk7XG4gICAgICAgIHRleHRCb3gxLnRleHRDb250ZW50ID0gJ1BsYWNlIHlvdXIgc2hpcHMgb24gdGhlIGJvYXJkIHRvIHRoZSByaWdodCB0byBiZWdpbiEnXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYmVnaW5BdHRhY2tNZXNzYWdlKCkge1xuICAgICAgICBjb25zdCB0ZXh0Qm94MSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50ZXh0LWJveDEnKTtcbiAgICAgICAgdGV4dEJveDEudGV4dENvbnRlbnQgPSAnUmVhZHkgdG8gQXR0YWNrISEnXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbW92ZVJlc3VsdChzdGF0dXMsIHBsYXllck5hbWUsIGNvb3Jkcywgc2hpcCA9IG51bGwpIHtcbiAgICAgICAgLy8gbmVlZCBhdHRhY2tTdGF0dXMsIHNoaXAgbmFtZSwgY29vcmRpbmF0ZXNcbiAgICAgICAgY29uc3QgdGV4dEJveDEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGV4dC1ib3gxJyk7XG4gICAgICAgIGNvbnN0IHRleHRCb3gyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRleHQtYm94MicpO1xuICAgICAgICBjb25zb2xlLmxvZygnZGlhbG9ndWUgcmVjb3JkZWQnKVxuICAgICAgICBpZiAocGxheWVyTmFtZSAhPT0gJ1BsYXllciAyJykge1xuICAgICAgICAgICAgaWYgKHN0YXR1cyA9PT0gJ2hpdCcpIHtcbiAgICAgICAgICAgICAgICB0ZXh0Qm94Mi50ZXh0Q29udGVudCA9IGBUaGUgZW5lbXkgaGFzIGhpdCB5b3VyICR7c2hpcC5uYW1lfVxuICAgICAgICAgICAgICAgIGF0IHJvdzogJHtjb29yZHNbMF19IGNvbHVtbjogJHtjb29yZHNbMV19IWBcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc3RhdHVzID09PSAnbWlzcycpIHtcbiAgICAgICAgICAgICAgICB0ZXh0Qm94Mi50ZXh0Q29udGVudCA9IGBUaGUgZW5lbXkgYXR0YWNrZWQgcm93OlxuICAgICAgICAgICAgICAgICR7Y29vcmRzWzBdfSBjb2x1bW46ICR7Y29vcmRzWzFdfSBhbmQgbWlzc2VkIWBcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9IGVsc2UgaWYgKHBsYXllck5hbWUgPT09ICdQbGF5ZXIgMicpIHtcbiAgICAgICAgICAgIGlmIChzdGF0dXMgPT09ICdoaXQnKSB7XG4gICAgICAgICAgICAgICAgdGV4dEJveDEudGV4dENvbnRlbnQgPSBgWW91IGhpdCB0aGUgZW5lbXkncyAke3NoaXAubmFtZX1cbiAgICAgICAgICAgICAgICBhdCByb3c6ICR7Y29vcmRzWzBdfSBjb2x1bW46ICR7Y29vcmRzWzFdfSFgXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHN0YXR1cyA9PT0gJ21pc3MnKSB7XG4gICAgICAgICAgICAgICAgdGV4dEJveDEudGV4dENvbnRlbnQgPSBgWW91IGF0dGFja2VkIHJvdzpcbiAgICAgICAgICAgICAgICAke2Nvb3Jkc1swXX0gY29sdW1uOiAke2Nvb3Jkc1sxXX0gYW5kIG1pc3NlZCFgXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzdW5rU2hpcE1lc3NhZ2Uoc2hpcCwgbmFtZSkge1xuICAgICAgICBjb25zdCB0ZXh0Qm94MSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50ZXh0LWJveDEnKTtcbiAgICAgICAgY29uc3QgdGV4dEJveDIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGV4dC1ib3gyJyk7XG4gICAgICAgIGNvbnNvbGUubG9nKHNoaXAsIG5hbWUpXG4gICAgICAgIGlmIChuYW1lICE9PSAnUGxheWVyIDInKSB7XG4gICAgICAgICAgICB0ZXh0Qm94Mi50ZXh0Q29udGVudCA9IGBZb3VyICR7c2hpcC5uYW1lfSBoYXMgYmVlbiBzdW5rISFgXG4gICAgICAgIH0gZWxzZSBpZiAobmFtZSA9PT0gJ1BsYXllciAyJykge1xuICAgICAgICAgICAgdGV4dEJveDEudGV4dENvbnRlbnQgPSBgWW91IHN1bmsgdGhlIGVuZW15J3MgJHtzaGlwLm5hbWV9ISFgXG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGVuZEdhbWVNZXNzYWdlKG5hbWUpIHtcbiAgICAgICAgY29uc3QgdGV4dEJveDMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGV4dC1ib3gzJylcbiAgICAgICAgaWYgKG5hbWUgPT09ICdQbGF5ZXIgMicpIHtcbiAgICAgICAgICAgIHRleHRCb3gzLnRleHRDb250ZW50ID0gJ1RoZSBlbmVteSBmbGVldCBoYXMgYmVlbiBzYW5rLiBFeGNlbGxlbnQgd29yayBTb2xkaWVyISdcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRleHRCb3gzLnRleHRDb250ZW50ID0gJ1dlIGhhdmUgbG9zdCBvdXIgZmxlZXQgYW5kIGJlZW4gZGVmZWF0ZWQuIEFib3J0IHRoZSBtaXNzaW9uISdcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgcmV0dXJuIHtwbGFjZVNoaXBzTWVzc2FnZSwgYmVnaW5BdHRhY2tNZXNzYWdlLCBtb3ZlUmVzdWx0LCBcbiAgICAgICAgc3Vua1NoaXBNZXNzYWdlLCBlbmRHYW1lTWVzc2FnZX1cbn0iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBgaHRtbCwgYm9keSB7XG4gICAgbWluLWhlaWdodDogMTAwJTtcbiAgICBtaW4td2lkdGg6IDEwMCU7XG4gICAgbWFyZ2luOiAwcHg7XG59XG5cbmJvZHkge1xuICAgIGJhY2tncm91bmQtY29sb3I6IG5hdnk7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xufVxuXG4ucHJvbXB0LWJveCB7XG4gICAgZGlzcGxheTogbm9uZVxufVxuXG4uZ2FtZS1jb250YWluZXIge1xuICAgIGRpc3BsYXk6IGdyaWQ7XG4gICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiAxZnIgNGZyIDEuN2ZyO1xuICAgIGhlaWdodDogMTAwdmg7XG4gICAgd2lkdGg6IDEwMHZ3O1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYig1OSwgNTksIDU5KTtcbn1cblxuLmhlYWRlciB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIGdyaWQtcm93OiAxIC8gMjtcbn1cblxuLmdhbWUtdGl0bGUge1xuICAgIGZvbnQtc2l6ZTogNjdweDtcbiAgICBtYXJnaW4tdG9wOiAyMHB4O1xuICAgIG1hcmdpbi1ib3R0b206IDEwcHg7XG59XG5cbi5nYW1lYm9hcmRzIHtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcbiAgICBncmlkLXJvdzogMiAvIDM7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDExNCwgMTU1LCAxNTUpO1xufVxuXG4uZGlhbG9ndWUtY29udGFpbmVyIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgZ3JpZC1yb3c6IDMgLyA0O1xufVxuXG4uZGlhbG9ndWUtYm94IHtcbiAgICBoZWlnaHQ6IDIwdmg7XG4gICAgd2lkdGg6IDUwdnc7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDc3LCAxMzQsIDc3KTtcbn1cblxuXG4vKiBnYW1lYm9hcmQgd3JhcHBlciBzdHlsaW5nICovXG4uYm9hcmQtd3JhcHBlciB7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIGhlaWdodDogMTAwJTtcbiAgICB3aWR0aDogNDAwcHg7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogYmlzcXVlO1xuICAgIHBhZGRpbmc6IDAgMTVweDtcbn1cblxuLmJvYXJkLXRpdGxlIHtcblxufVxuXG4uZ2FtZWJvYXJkIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgaGVpZ2h0OiA0MDBweDtcbiAgICB3aWR0aDogNDAwcHg7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogYmx1ZXZpb2xldDtcbn1cblxuLnJvdyB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBoZWlnaHQ6IDEwJTtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBwaW5rO1xufVxuXG4uY2VsbCB7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgbWFyZ2luOiAwcHg7XG4gICAgYXNwZWN0LXJhdGlvOiAxO1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYigyMjEsIDI0MSwgMjQxKTtcbiAgICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcbn1cblxuLmNlbGwtYyB7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgbWFyZ2luOiAwcHg7XG4gICAgYXNwZWN0LXJhdGlvOiAxO1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYigyMjEsIDI0MSwgMjQxKTtcbiAgICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcbn1cblxuLmNlbGwtYzpob3ZlciB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogYW50aXF1ZXdoaXRlO1xufVxuXG5cbi8qIHN0eWxpbmcgZm9yIGRpYWxvZ3VlIGJveCAqL1xuLmRpYWxvZ3VlLWNvbnRhaW5lciB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIGdyaWQtcm93OiAzIC8gNDtcbn1cblxuLmRpYWxvZ3VlLWJveCB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtZXZlbmx5O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgaGVpZ2h0OiAyMHZoO1xuICAgIHdpZHRoOiA1NXZ3O1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYig3NywgMTM0LCA3Nyk7XG59XG5cbi50ZXh0LWJveDEsIC50ZXh0LWJveDIsIC50ZXh0LWJveDMge1xuICAgIGhlaWdodDogNXZoO1xuICAgIHdpZHRoOiA1MHZ3O1xuICAgIGJhY2tncm91bmQtY29sb3I6IGxpZ2h0Ymx1ZTtcbiAgICBmb250LXNpemU6IDI1cHg7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuXG5cblxuLyogc3R5bGluZyBmb3IgcmVzZXQgZ2FtZSAqL1xuLmVuZC1nYW1lLWJveCB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICB0b3A6IDI0NXB4O1xuICAgIGxlZnQ6IDA7XG4gICAgcmlnaHQ6IDA7XG4gICAgbWFyZ2luLWxlZnQ6IGF1dG87XG4gICAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xuICAgIHdpZHRoOiAyMjBweDtcbiAgICBoZWlnaHQ6IDIyMHB4O1xuICAgIGJhY2tncm91bmQtY29sb3I6IGF6dXJlO1xufVxuXG4ucmVzZXQtZ2FtZS1idXR0b24ge1xuICAgIGhlaWdodDogNTBweDtcbiAgICB3aWR0aDogNTBweDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTQ0LCA1OCwgNTgpO1xufVxuXG5cbi8qIHN0eWxpbmcgZm9yIHNoaXAgUGxhY2VtZW50ICovXG4udmFsaWQtcGxhY2VtZW50IHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTEwLCAxODksIDExMCk7XG59XG5cbi5pbnZhbGlkLXBsYWNlbWVudCB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDI0OSwgMTE2LCAxMTYpO1xufVxuXG4ucGxhY2VkIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoNzYsIDc2LCAxMTApO1xufVxuXG4ucm90YXRlLXNoaXAge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB0b3A6IDE1cHg7XG4gICAgcmlnaHQ6IDIwcHg7XG4gICAgaGVpZ2h0OiAyNXB4O1xuICAgIHdpZHRoOiA2MHB4O1xuICAgIC8qIGJvcmRlcjogMnB4IHNvbGlkIG9yYW5nZTsgKi9cbn1cblxuLnN0YXJ0LWdhbWUtYnV0dG9uIHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgdG9wOiAzNTBweDtcbiAgICBsZWZ0OiAwO1xuICAgIHJpZ2h0OiAwO1xuICAgIG1hcmdpbi1sZWZ0OiBhdXRvO1xuICAgIG1hcmdpbi1yaWdodDogYXV0bztcbiAgICBoZWlnaHQ6IDI1cHg7XG4gICAgd2lkdGg6IDExMHB4O1xuICAgIGJvcmRlcjogMnB4IHNvbGlkIG9yYW5nZTtcbn1gLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9wYWdlU3R5bGluZy5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7SUFDSSxnQkFBZ0I7SUFDaEIsZUFBZTtJQUNmLFdBQVc7QUFDZjs7QUFFQTtJQUNJLHNCQUFzQjtJQUN0QixrQkFBa0I7QUFDdEI7O0FBRUE7SUFDSTtBQUNKOztBQUVBO0lBQ0ksYUFBYTtJQUNiLGlDQUFpQztJQUNqQyxhQUFhO0lBQ2IsWUFBWTtJQUNaLGlDQUFpQztBQUNyQzs7QUFFQTtJQUNJLGFBQWE7SUFDYix1QkFBdUI7SUFDdkIsbUJBQW1CO0lBQ25CLGVBQWU7QUFDbkI7O0FBRUE7SUFDSSxlQUFlO0lBQ2YsZ0JBQWdCO0lBQ2hCLG1CQUFtQjtBQUN2Qjs7QUFFQTtJQUNJLGtCQUFrQjtJQUNsQixhQUFhO0lBQ2IsNkJBQTZCO0lBQzdCLGVBQWU7SUFDZixvQ0FBb0M7QUFDeEM7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsdUJBQXVCO0lBQ3ZCLG1CQUFtQjtJQUNuQixlQUFlO0FBQ25COztBQUVBO0lBQ0ksWUFBWTtJQUNaLFdBQVc7SUFDWCxrQ0FBa0M7QUFDdEM7OztBQUdBLDhCQUE4QjtBQUM5QjtJQUNJLGtCQUFrQjtJQUNsQixZQUFZO0lBQ1osWUFBWTtJQUNaLHdCQUF3QjtJQUN4QixlQUFlO0FBQ25COztBQUVBOztBQUVBOztBQUVBO0lBQ0ksYUFBYTtJQUNiLHNCQUFzQjtJQUN0QixhQUFhO0lBQ2IsWUFBWTtJQUNaLDRCQUE0QjtBQUNoQzs7QUFFQTtJQUNJLGFBQWE7SUFDYixXQUFXO0lBQ1gsV0FBVztJQUNYLHNCQUFzQjtBQUMxQjs7QUFFQTtJQUNJLFdBQVc7SUFDWCxXQUFXO0lBQ1gsZUFBZTtJQUNmLG9DQUFvQztJQUNwQyx1QkFBdUI7QUFDM0I7O0FBRUE7SUFDSSxXQUFXO0lBQ1gsV0FBVztJQUNYLGVBQWU7SUFDZixvQ0FBb0M7SUFDcEMsdUJBQXVCO0FBQzNCOztBQUVBO0lBQ0ksOEJBQThCO0FBQ2xDOzs7QUFHQSw2QkFBNkI7QUFDN0I7SUFDSSxhQUFhO0lBQ2IsdUJBQXVCO0lBQ3ZCLG1CQUFtQjtJQUNuQixlQUFlO0FBQ25COztBQUVBO0lBQ0ksYUFBYTtJQUNiLHNCQUFzQjtJQUN0Qiw2QkFBNkI7SUFDN0IsbUJBQW1CO0lBQ25CLFlBQVk7SUFDWixXQUFXO0lBQ1gsa0NBQWtDO0FBQ3RDOztBQUVBO0lBQ0ksV0FBVztJQUNYLFdBQVc7SUFDWCwyQkFBMkI7SUFDM0IsZUFBZTtJQUNmLGtCQUFrQjtBQUN0Qjs7OztBQUlBLDJCQUEyQjtBQUMzQjtJQUNJLGtCQUFrQjtJQUNsQixhQUFhO0lBQ2IsdUJBQXVCO0lBQ3ZCLG1CQUFtQjtJQUNuQixVQUFVO0lBQ1YsT0FBTztJQUNQLFFBQVE7SUFDUixpQkFBaUI7SUFDakIsa0JBQWtCO0lBQ2xCLFlBQVk7SUFDWixhQUFhO0lBQ2IsdUJBQXVCO0FBQzNCOztBQUVBO0lBQ0ksWUFBWTtJQUNaLFdBQVc7SUFDWCxrQ0FBa0M7QUFDdEM7OztBQUdBLCtCQUErQjtBQUMvQjtJQUNJLG9DQUFvQztBQUN4Qzs7QUFFQTtJQUNJLG9DQUFvQztBQUN4Qzs7QUFFQTtJQUNJLGtDQUFrQztBQUN0Qzs7QUFFQTtJQUNJLGtCQUFrQjtJQUNsQixTQUFTO0lBQ1QsV0FBVztJQUNYLFlBQVk7SUFDWixXQUFXO0lBQ1gsOEJBQThCO0FBQ2xDOztBQUVBO0lBQ0ksa0JBQWtCO0lBQ2xCLFVBQVU7SUFDVixPQUFPO0lBQ1AsUUFBUTtJQUNSLGlCQUFpQjtJQUNqQixrQkFBa0I7SUFDbEIsWUFBWTtJQUNaLFlBQVk7SUFDWix3QkFBd0I7QUFDNUJcIixcInNvdXJjZXNDb250ZW50XCI6W1wiaHRtbCwgYm9keSB7XFxuICAgIG1pbi1oZWlnaHQ6IDEwMCU7XFxuICAgIG1pbi13aWR0aDogMTAwJTtcXG4gICAgbWFyZ2luOiAwcHg7XFxufVxcblxcbmJvZHkge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBuYXZ5O1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxufVxcblxcbi5wcm9tcHQtYm94IHtcXG4gICAgZGlzcGxheTogbm9uZVxcbn1cXG5cXG4uZ2FtZS1jb250YWluZXIge1xcbiAgICBkaXNwbGF5OiBncmlkO1xcbiAgICBncmlkLXRlbXBsYXRlLXJvd3M6IDFmciA0ZnIgMS43ZnI7XFxuICAgIGhlaWdodDogMTAwdmg7XFxuICAgIHdpZHRoOiAxMDB2dztcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDU5LCA1OSwgNTkpO1xcbn1cXG5cXG4uaGVhZGVyIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGdyaWQtcm93OiAxIC8gMjtcXG59XFxuXFxuLmdhbWUtdGl0bGUge1xcbiAgICBmb250LXNpemU6IDY3cHg7XFxuICAgIG1hcmdpbi10b3A6IDIwcHg7XFxuICAgIG1hcmdpbi1ib3R0b206IDEwcHg7XFxufVxcblxcbi5nYW1lYm9hcmRzIHtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcXG4gICAgZ3JpZC1yb3c6IDIgLyAzO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTE0LCAxNTUsIDE1NSk7XFxufVxcblxcbi5kaWFsb2d1ZS1jb250YWluZXIge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgZ3JpZC1yb3c6IDMgLyA0O1xcbn1cXG5cXG4uZGlhbG9ndWUtYm94IHtcXG4gICAgaGVpZ2h0OiAyMHZoO1xcbiAgICB3aWR0aDogNTB2dztcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDc3LCAxMzQsIDc3KTtcXG59XFxuXFxuXFxuLyogZ2FtZWJvYXJkIHdyYXBwZXIgc3R5bGluZyAqL1xcbi5ib2FyZC13cmFwcGVyIHtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxuICAgIHdpZHRoOiA0MDBweDtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogYmlzcXVlO1xcbiAgICBwYWRkaW5nOiAwIDE1cHg7XFxufVxcblxcbi5ib2FyZC10aXRsZSB7XFxuXFxufVxcblxcbi5nYW1lYm9hcmQge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBoZWlnaHQ6IDQwMHB4O1xcbiAgICB3aWR0aDogNDAwcHg7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IGJsdWV2aW9sZXQ7XFxufVxcblxcbi5yb3cge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBoZWlnaHQ6IDEwJTtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHBpbms7XFxufVxcblxcbi5jZWxsIHtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIG1hcmdpbjogMHB4O1xcbiAgICBhc3BlY3QtcmF0aW86IDE7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYigyMjEsIDI0MSwgMjQxKTtcXG4gICAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XFxufVxcblxcbi5jZWxsLWMge1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgbWFyZ2luOiAwcHg7XFxuICAgIGFzcGVjdC1yYXRpbzogMTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDIyMSwgMjQxLCAyNDEpO1xcbiAgICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcXG59XFxuXFxuLmNlbGwtYzpob3ZlciB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IGFudGlxdWV3aGl0ZTtcXG59XFxuXFxuXFxuLyogc3R5bGluZyBmb3IgZGlhbG9ndWUgYm94ICovXFxuLmRpYWxvZ3VlLWNvbnRhaW5lciB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBncmlkLXJvdzogMyAvIDQ7XFxufVxcblxcbi5kaWFsb2d1ZS1ib3gge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWV2ZW5seTtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgaGVpZ2h0OiAyMHZoO1xcbiAgICB3aWR0aDogNTV2dztcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDc3LCAxMzQsIDc3KTtcXG59XFxuXFxuLnRleHQtYm94MSwgLnRleHQtYm94MiwgLnRleHQtYm94MyB7XFxuICAgIGhlaWdodDogNXZoO1xcbiAgICB3aWR0aDogNTB2dztcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogbGlnaHRibHVlO1xcbiAgICBmb250LXNpemU6IDI1cHg7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG59XFxuXFxuXFxuXFxuLyogc3R5bGluZyBmb3IgcmVzZXQgZ2FtZSAqL1xcbi5lbmQtZ2FtZS1ib3gge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICB0b3A6IDI0NXB4O1xcbiAgICBsZWZ0OiAwO1xcbiAgICByaWdodDogMDtcXG4gICAgbWFyZ2luLWxlZnQ6IGF1dG87XFxuICAgIG1hcmdpbi1yaWdodDogYXV0bztcXG4gICAgd2lkdGg6IDIyMHB4O1xcbiAgICBoZWlnaHQ6IDIyMHB4O1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBhenVyZTtcXG59XFxuXFxuLnJlc2V0LWdhbWUtYnV0dG9uIHtcXG4gICAgaGVpZ2h0OiA1MHB4O1xcbiAgICB3aWR0aDogNTBweDtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDE0NCwgNTgsIDU4KTtcXG59XFxuXFxuXFxuLyogc3R5bGluZyBmb3Igc2hpcCBQbGFjZW1lbnQgKi9cXG4udmFsaWQtcGxhY2VtZW50IHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDExMCwgMTg5LCAxMTApO1xcbn1cXG5cXG4uaW52YWxpZC1wbGFjZW1lbnQge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjQ5LCAxMTYsIDExNik7XFxufVxcblxcbi5wbGFjZWQge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoNzYsIDc2LCAxMTApO1xcbn1cXG5cXG4ucm90YXRlLXNoaXAge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHRvcDogMTVweDtcXG4gICAgcmlnaHQ6IDIwcHg7XFxuICAgIGhlaWdodDogMjVweDtcXG4gICAgd2lkdGg6IDYwcHg7XFxuICAgIC8qIGJvcmRlcjogMnB4IHNvbGlkIG9yYW5nZTsgKi9cXG59XFxuXFxuLnN0YXJ0LWdhbWUtYnV0dG9uIHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB0b3A6IDM1MHB4O1xcbiAgICBsZWZ0OiAwO1xcbiAgICByaWdodDogMDtcXG4gICAgbWFyZ2luLWxlZnQ6IGF1dG87XFxuICAgIG1hcmdpbi1yaWdodDogYXV0bztcXG4gICAgaGVpZ2h0OiAyNXB4O1xcbiAgICB3aWR0aDogMTEwcHg7XFxuICAgIGJvcmRlcjogMnB4IHNvbGlkIG9yYW5nZTtcXG59XCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdO1xuXG4gIC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9O1xuXG4gIC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vcGFnZVN0eWxpbmcuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9wYWdlU3R5bGluZy5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gdXBkYXRlcjtcbn1cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTtcblxuICAgIC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuICBjc3MgKz0gb2JqLmNzcztcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfVxuXG4gIC8vIEZvciBvbGQgSUVcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHJldHVybiB7XG4gICAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZSgpIHt9LFxuICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7fVxuICAgIH07XG4gIH1cbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5jID0gdW5kZWZpbmVkOyIsImltcG9ydCAnLi9wYWdlU3R5bGluZy5jc3MnO1xuaW1wb3J0IHsgZ2FtZUJvYXJkQ29udHJvbGxlciB9IGZyb20gXCIuL2dhbWVib2FyZENvbnRyb2xsZXJcIjtcbmltcG9ydCB7IGluaXRpYWxpemVHYW1lIH0gZnJvbSBcIi4vZ2FtZUxvb3BcIjtcblxuXG5cbmluaXRpYWxpemVHYW1lKCkiXSwibmFtZXMiOlsiUGxheWVyIiwiZ2FtZUJvYXJkQ29udHJvbGxlciIsImNyZWF0ZUZsZWV0IiwiY3JlYXRlT3BwRmxlZXQiLCJkb21NYW5pcHVsYXRpb24iLCJkaWFsb2d1ZUNvbnRyb2xsZXIiLCJodW1hblNoaXBQbGFjZW1lbnQiLCJjb21wdXRlclBsYWNlbWVudCIsImluaXRpYWxpemVHYW1lIiwiY3JlYXRlR2FtZSIsInJ1bkRPTSIsImh1bWFuUGxheWVyIiwiaHVtYW5GbGVldCIsImNvbnNvbGUiLCJsb2ciLCJnYW1lQm9hcmQiLCJwbGF5ZXIiLCJodW1hbkJvYXJkIiwiY3JlYXRlQm9hcmQiLCJBSXBsYXllciIsImNvbXB1dGVyRmxlZXQiLCJjb21wdXRlckJvYXJkIiwicmVuZGVyU3RhcnQiLCJyZW5kZXJHYW1lQm9hcmQiLCJjcmVhdERpYWxvZ3VlIiwicmVuZGVyRGlhbG9ndWVCb3giLCJkaWFsb2d1ZSIsInBsYWNlU2hpcHNNZXNzYWdlIiwiY29tcHV0ZXJQbGFjZW1lbnRzIiwiaHVtYW5QbGFjZW1lbnQiLCJyZXNldEludGVyZmFjZSIsImJvZHlFIiwiZW5kQm94IiwicGxheWVyQm9hcmRzIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiZGlhbG9ndWVDb250YWluZXIiLCJkaWFsb2d1ZUJveCIsImdhbWVCb2FyZFdyYXBwZXJzIiwicXVlcnlTZWxlY3RvckFsbCIsImZvckVhY2giLCJlbGVtZW50IiwicmVtb3ZlQ2hpbGQiLCJTaGlwIiwiZGlhbG9ndWVSZWZyZXNoIiwiZmxlZXQiLCJuYW1lIiwicGxheWVyTmFtZSIsImJvYXJkIiwic2hpcHMiLCJpIiwiaiIsInBsYWNlSG9yaXpvbnRhbFNoaXAiLCJyb3ciLCJjb2wiLCJzaGlwIiwibGVuZ3RoIiwibmV3Q29vcmRzIiwiY29vcmRzIiwicHVzaCIsInBsYWNlVmVydGljYWxTaGlwIiwicmVjaWV2ZUF0dGFjayIsImF0dGFja1N0YXR1cyIsImNoZWNrSWZVc2VkIiwiY29vcmQiLCJoaXQiLCJ1cGRhdGVCb2FyZFNwb3QiLCJtb3ZlUmVzdWx0Iiwic3Vua0NoZWNrIiwiY2hlY2tJZlN1bmsiLCJzdW5rU2hpcE1lc3NhZ2UiLCJzcGxpY2UiLCJjaGVja0FsbFN1bmsiLCJlbmRHYW1lTWVzc2FnZSIsImVuZEdhbWUiLCJ1c2VHcmlkU3BvdCIsImZyZWV6ZUdyaWQiLCJyZW5kZXJFbmRHYW1lIiwiY29uc3RydWN0b3IiLCJ1c2VyUGxheWVyIiwiY29tcHV0ZXJQbGF5ZXIiLCJ2aXNpdGVkIiwicGlja1JhbmRvbUNlbGwiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJjb2x1bW4iLCJjb21wQ29vcmRzIiwicmVwZWF0Qm9vbGVhbiIsImNoZWNrUmVwZWF0Q2VsbCIsInN0cmluZ2VkQ29vcmRzIiwiSlNPTiIsInN0cmluZ2lmeSIsImV4aXN0c0Jvb2xlYW4iLCJzb21lIiwiaGl0cyIsImlzU3VuayIsImJvYXJkUnVuIiwiY2FycmllciIsImJhdHRsZXNoaXAiLCJkZXN0cm95ZXIiLCJzdWJtYXJpbmUiLCJwYXRyb2xCb2F0Iiwicm90YXRlQnV0dG9uIiwic3RhcnRCdXR0b24iLCJkaWFsb2d1ZVJ1biIsIm9jY3VwaWVkQ2VsbHMiLCJjdXJyZW50UGxhbmUiLCJjcmVhdGVSb3RhdGlvbkFiaWxpdHkiLCJodW1hbkNlbGxzIiwic2hpcEluZGV4IiwiY2VsbCIsImFkZEV2ZW50TGlzdGVuZXIiLCJjZWxsSG92ZXIiLCJjbGFzc0xpc3QiLCJjb250YWlucyIsInBsYWNlSG9yaXpvbnRhbGx5IiwiY29vcmRpbmF0ZXMiLCJhY3RpdmVDZWxscyIsInN0YXJ0QnV0dG9uRW1lcmdlIiwicGxhY2VWZXJ0aWNhbGx5IiwiY2VsbENvb3JkcyIsImdyb3VwZWRDZWxscyIsImNlbGxSb3ciLCJjZWxsQ29sdW1uIiwiYWN0aXZlQ2VsbCIsImdldEVsZW1lbnRCeUlkIiwiY29uZmxpY3RpbmciLCJjaGVja0NvbmZsaWN0aW5nU2hpcHMiLCJlbGVtIiwiYWRkIiwicmVtb3ZlIiwiYWxyZWFkeVVzZWQiLCJjaGVja0ZvclJlcGVhdCIsIm5ld1BsYW5lIiwic3dpdGNoUGxhbmUiLCJzdHlsZSIsImRpc3BsYXkiLCJiZWdpbkF0dGFja01lc3NhZ2UiLCJwb2ludGVyRXZlbnRzIiwicGxhbmVzIiwidXNlZENlbGxzIiwiY3JlYXRlU2hpcENvb3JkcyIsImNob3NlblBsYW5lIiwidGVzdEhvcml6b250YWxTaGlwIiwidGVzdFZlcnRpY2FsU2hpcCIsInN0YXJ0aW5nQ29vcmRzIiwiY3JlYXRlSG9yaXpvbnRhbFN0YXJ0IiwicmVwZWF0RGV0ZWN0IiwicmVwZWF0IiwiY3JlYXRlVmVydGljYWxTdGFydCIsImNob29zZVBsYW5lIiwiY2hvc2VuSW5kZXgiLCJzdGFydGluZ0Nvb3JkIiwiYXJyYXkiLCJjb21wdXRlck1vdmVzIiwic3RhcnRHYW1lQnV0dG9uIiwiY3JlYXRlRWxlbWVudCIsImFwcGVuZEVsZW1lbnQiLCJ0ZXh0Q29udGVudCIsImJvYXJkQ29udHJvbGxlciIsImlzQ29tcHV0ZXIiLCJnYW1lQm9hcmRXcmFwcGVyIiwiYm9hcmRUaXRsZSIsImdhbWVib2FyZCIsImJ1aWxkR3JpZCIsInJvdGF0ZVNoaXBCdXR0b24iLCJzZXRHcmlkVHJpZ2dlcnMiLCJnYW1lYm9hcmRFbGVtZW50Iiwic2V0QXR0cmlidXRlIiwiY29tcHV0ZXJCb2FyZENvbnRyb2xsZXIiLCJodW1hbkJvYXJkQ29udHJvbGxlciIsImNlbGxzIiwic3RhdHVzIiwidXNlZENlbGwiLCJ0ZXh0Qm94MSIsInRleHRCb3gyIiwidGV4dEJveDMiLCJib2R5RWxlbWVudCIsImJvZHkiLCJlbmRHYW1lQm94IiwiZW5kR2FtZUljb24iLCJyZXNldEdhbWVCdXR0b24iLCJlbGVtZW50TmFtZSIsImNsYXNzTmFtZSIsImZhdGhlckVsZW1lbnQiLCJhcHBlbmRDaGlsZCIsImFyZ3VtZW50cyIsInVuZGVmaW5lZCJdLCJzb3VyY2VSb290IjoiIn0=