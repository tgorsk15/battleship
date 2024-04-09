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
  const humanPlayer = new _player__WEBPACK_IMPORTED_MODULE_0__.Player('User');
  const humanFleet = (0,_ship_object__WEBPACK_IMPORTED_MODULE_2__.createFleet)();
  console.log(humanFleet);
  humanPlayer.gameBoard = (0,_gameboardController__WEBPACK_IMPORTED_MODULE_1__.gameBoardController)(humanFleet, humanPlayer.player);
  const humanBoard = humanPlayer.gameBoard;
  humanBoard.createBoard();
  const AIplayer = new _player__WEBPACK_IMPORTED_MODULE_0__.Player('Enemy');
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
const resetInterface = function (resetButton) {
  console.log('reseting all this shit');
  const playerBoards = document.querySelector('.gameboards');
  const dialogueContainer = document.querySelector('.dialogue-container');
  const dialogueBox = document.querySelector('.dialogue-box');
  const gameBoardWrappers = document.querySelectorAll('.board-wrapper');
  gameBoardWrappers.forEach(element => {
    playerBoards.removeChild(element);
  });
  dialogueContainer.removeChild(dialogueBox);
  playerBoards.removeChild(resetButton);
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
/* harmony import */ var _userInterface__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./userInterface */ "./src/userInterface.js");
/* eslint-disable no-use-before-define */
/* eslint-disable no-else-return */
/* eslint-disable no-loop-func */
/* eslint-disable no-plusplus */
/* eslint-disable import/prefer-default-export */

const runDOM = (0,_userInterface__WEBPACK_IMPORTED_MODULE_0__.domManipulation)();
const dialogueRefresh = (0,_userInterface__WEBPACK_IMPORTED_MODULE_0__.dialogueController)();
function gameBoardController(fleet, name) {
  const playerName = name;
  const board = [];
  const ships = fleet;
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
    console.log(ship.coords);
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
    console.log(ship.coords);
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
  const playerBoards = document.querySelector('.gameboards');
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
      gameBoard.style.pointerEvents = 'auto';
      playerBoards.removeChild(startButton);
      rotateButton.style.display = 'none';
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
    const chosenPlane = choosePlane(planes);
    console.log(chosenPlane);
    if (chosenPlane === 'horizontal') {
      testHorizontalShip(ship);
    } else if (chosenPlane === 'vertical') {
      testVerticalShip(ship);
    }
  }
  function testHorizontalShip(ship) {
    let startingCoords = createHorizontalStart(ship);

    // initial check of repeat:
    let firstRepeat = checkForRepeat(startingCoords, usedCells);
    while (firstRepeat === true) {
      console.log('need new start');
      startingCoords = createHorizontalStart(ship);
      firstRepeat = checkForRepeat(startingCoords, usedCells);
    }
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
    let startingCoords = createVerticalStart(ship);

    // initial check of repeat:
    let firstRepeat = checkForRepeat(startingCoords, usedCells);
    while (firstRepeat === true) {
      console.log('need new start');
      startingCoords = createVerticalStart(ship);
      firstRepeat = checkForRepeat(startingCoords, usedCells);
    }
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
/* harmony import */ var _icons_hit_png__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./icons/hit.png */ "./src/icons/hit.png");
/* harmony import */ var _icons_miss_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./icons/miss.png */ "./src/icons/miss.png");
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./player */ "./src/player.js");
/* harmony import */ var _gameLoop__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./gameLoop */ "./src/gameLoop.js");
/* eslint-disable import/prefer-default-export */




const domManipulation = function () {
  const computerMoves = (0,_player__WEBPACK_IMPORTED_MODULE_2__.computerPlayer)();
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
    if (playerName === 'Enemy') {
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
        cell.style.pointerEvents = 'none';

        // trigger computer's attack in response
        console.log(humanBoardController);
        computerMoves.pickRandomCell(humanBoardController);
      });
    });
  }
  function useGridSpot(coords, status, name) {
    // registers that teh grid spot was used, and displays
    // either a hit or miss
    const attackIcon = new Image();
    attackIcon.classList.add('attack-icon');
    if (name === 'Enemy') {
      const usedCell = document.getElementById(`${coords[0]} ${coords[1]}c`);
      usedCell.appendChild(attackIcon);
      if (status === 'hit') {
        attackIcon.src = _icons_hit_png__WEBPACK_IMPORTED_MODULE_0__;
      } else if (status === 'miss') {
        attackIcon.src = _icons_miss_png__WEBPACK_IMPORTED_MODULE_1__;
      }
    } else {
      const usedCell = document.getElementById(`${coords[0]} ${coords[1]}h`);
      usedCell.appendChild(attackIcon);
      if (status === 'hit') {
        attackIcon.src = _icons_hit_png__WEBPACK_IMPORTED_MODULE_0__;
      } else if (status === 'miss') {
        attackIcon.src = _icons_miss_png__WEBPACK_IMPORTED_MODULE_1__;
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
    const resetGameButton = document.createElement('button');
    appendElement(resetGameButton, 'reset-game-button', playerBoards);
    resetGameButton.textContent = 'Play Again?';
    resetGameButton.addEventListener('click', () => {
      (0,_gameLoop__WEBPACK_IMPORTED_MODULE_3__.resetInterface)(resetGameButton);
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
    const textBox1 = document.querySelector('.text-box1');
    const textBox2 = document.querySelector('.text-box2');
    if (playerName !== 'Enemy') {
      if (status === 'hit') {
        textBox2.textContent = `The enemy has hit your ${ship.name}
                at row: ${coords[0]} column: ${coords[1]}!`;
      } else if (status === 'miss') {
        textBox2.textContent = `The enemy attacked row:
                ${coords[0]} column: ${coords[1]} and missed!`;
      }
    } else if (playerName === 'Enemy') {
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
    if (name !== 'Enemy') {
      textBox2.textContent = `Your ${ship.name} has been sunk!!`;
    } else if (name === 'Enemy') {
      textBox1.textContent = `You sunk the enemy's ${ship.name}!!`;
    }
  }
  function endGameMessage(name) {
    const textBox3 = document.querySelector('.text-box3');
    if (name === 'Enemy') {
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
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ./assets/background.jpg */ "./src/assets/background.jpg"), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `html, body {
    min-height: 100%;
    min-width: 100%;
    margin: 0px;
}

body {
    background-image: url(${___CSS_LOADER_URL_REPLACEMENT_0___});
    background-size: cover;
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
    /* background-color: rgb(59, 59, 59); */
}

.header {
    display: flex;
    justify-content: center;
    align-items: center;
    grid-row: 1 / 2;
    
}

.game-title {
    font-size: 67px;
    margin-top: 15px;
    margin-bottom: 17px;
    color: rgba(58, 4, 58, 0.7);
    text-shadow: 0px 0px 40px rgb(127, 122, 122);
}

.gameboards {
    position: relative;
    display: flex;
    justify-content: space-around;
    grid-row: 2 / 3;
    /* background-color: rgb(114, 155, 155); */
    /* background-color: rgb(59, 59, 59); */
}

.dialogue-container {
    display: flex;
    justify-content: center;
    align-items: center;
    grid-row: 3 / 4;
}

.dialogue-box {
    margin-top: 8px;
    height: 20vh;
    width: 50vw;
    background-color: rgb(77, 134, 77);
}


/* gameboard wrapper styling */
.board-wrapper {
    position: relative;
    height: 100%;
    width: 400px;
    background: rgb(128, 0, 128, 0.4);
    border: 5px solid rgb(128, 0, 128);
    padding: 0 15px;
    padding-bottom: 7px;
    border-radius: 25px;
}

.board-title {
    text-align: center;
    font-size: 27px;
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
    /* background-color: pink; */
}

.cell {
    width: 100%;
    margin: 0px;
    aspect-ratio: 1;
    background-color: rgb(221, 241, 241, 0.5);
    border: 1px solid black;
}

.cell-c {
    width: 100%;
    margin: 0px;
    aspect-ratio: 1;
    background-color: rgb(221, 241, 241, 0.5);
    border: 1px solid black;
}

.cell-c:hover {
    background-color: rgb(117, 156, 211);
}

/* icons */
.attack-icon {
    object-fit: cover;
    height: 100%;
}


/* styling for dialogue box */
.dialogue-container {
    position: relative;
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
    height: 18vh;
    width: 45vw;
    background-color: rgb(72, 61, 139, 0.8);
    border: 5px solid rgb(91, 22, 91, 1);
    border-radius: 25px;
    margin-top: 20px;
}

.text-box1, .text-box2, .text-box3 {
    color: rgb(183, 183, 183);
    display: flex;
    justify-content: center;
    align-items: center;
    height: 5vh;
    width: 50vw;
    font-size: 25px;
    font-weight: bold;
}


.reset-game-button {
    position: absolute;
    top: 245px;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    height: 90px;
    width: 125px;
    background-color: rgb(72, 61, 139);
    border: 4px solid rgb(74, 38, 254);
    border-radius: 15px;
    font-size: 30px;
    color: rgb(222, 224, 225);
}

/* signature */
.signature {
    color: white;
    position: absolute;
    bottom: 25px;
    right: 20px;

}

a {
    color: purple;
    text-shadow: 0px 0px 10px black;
}


/* styling for ship Placement */
.valid-placement {
    background-color: rgb(110, 189, 110, 1);
}

.invalid-placement {
    background-color: rgb(249, 116, 116, 1);
}

.placed {
    background-color: rgb(214, 100, 166);
}

.rotate-ship {
    position: absolute;
    top: 15px;
    right: 20px;
    height: 25px;
    width: 60px;
    background-color: rgb(221, 241, 241, 1);
    opacity: 1;
    border-radius: 20px;
    border: none;
}

.start-game-button {
    position: absolute;
    top: 350px;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    height: 110px;
    width: 140px;
    background-color: rgb(72, 61, 139);
    border: 4px solid purple;
    border-radius: 15px;
    font-size: 30px;
    font-weight: bold;
    color: rgb(222, 224, 225);
}`, "",{"version":3,"sources":["webpack://./src/pageStyling.css"],"names":[],"mappings":"AAAA;IACI,gBAAgB;IAChB,eAAe;IACf,WAAW;AACf;;AAEA;IACI,yDAAgD;IAChD,sBAAsB;IACtB,kBAAkB;AACtB;;AAEA;IACI;AACJ;;AAEA;IACI,aAAa;IACb,iCAAiC;IACjC,aAAa;IACb,YAAY;IACZ,uCAAuC;AAC3C;;AAEA;IACI,aAAa;IACb,uBAAuB;IACvB,mBAAmB;IACnB,eAAe;;AAEnB;;AAEA;IACI,eAAe;IACf,gBAAgB;IAChB,mBAAmB;IACnB,2BAA2B;IAC3B,4CAA4C;AAChD;;AAEA;IACI,kBAAkB;IAClB,aAAa;IACb,6BAA6B;IAC7B,eAAe;IACf,0CAA0C;IAC1C,uCAAuC;AAC3C;;AAEA;IACI,aAAa;IACb,uBAAuB;IACvB,mBAAmB;IACnB,eAAe;AACnB;;AAEA;IACI,eAAe;IACf,YAAY;IACZ,WAAW;IACX,kCAAkC;AACtC;;;AAGA,8BAA8B;AAC9B;IACI,kBAAkB;IAClB,YAAY;IACZ,YAAY;IACZ,iCAAiC;IACjC,kCAAkC;IAClC,eAAe;IACf,mBAAmB;IACnB,mBAAmB;AACvB;;AAEA;IACI,kBAAkB;IAClB,eAAe;AACnB;;AAEA;IACI,aAAa;IACb,sBAAsB;IACtB,aAAa;IACb,YAAY;IACZ,4BAA4B;AAChC;;AAEA;IACI,aAAa;IACb,WAAW;IACX,WAAW;IACX,4BAA4B;AAChC;;AAEA;IACI,WAAW;IACX,WAAW;IACX,eAAe;IACf,yCAAyC;IACzC,uBAAuB;AAC3B;;AAEA;IACI,WAAW;IACX,WAAW;IACX,eAAe;IACf,yCAAyC;IACzC,uBAAuB;AAC3B;;AAEA;IACI,oCAAoC;AACxC;;AAEA,UAAU;AACV;IACI,iBAAiB;IACjB,YAAY;AAChB;;;AAGA,6BAA6B;AAC7B;IACI,kBAAkB;IAClB,aAAa;IACb,uBAAuB;IACvB,mBAAmB;IACnB,eAAe;AACnB;;AAEA;IACI,aAAa;IACb,sBAAsB;IACtB,6BAA6B;IAC7B,mBAAmB;IACnB,YAAY;IACZ,WAAW;IACX,uCAAuC;IACvC,oCAAoC;IACpC,mBAAmB;IACnB,gBAAgB;AACpB;;AAEA;IACI,yBAAyB;IACzB,aAAa;IACb,uBAAuB;IACvB,mBAAmB;IACnB,WAAW;IACX,WAAW;IACX,eAAe;IACf,iBAAiB;AACrB;;;AAGA;IACI,kBAAkB;IAClB,UAAU;IACV,OAAO;IACP,QAAQ;IACR,iBAAiB;IACjB,kBAAkB;IAClB,YAAY;IACZ,YAAY;IACZ,kCAAkC;IAClC,kCAAkC;IAClC,mBAAmB;IACnB,eAAe;IACf,yBAAyB;AAC7B;;AAEA,cAAc;AACd;IACI,YAAY;IACZ,kBAAkB;IAClB,YAAY;IACZ,WAAW;;AAEf;;AAEA;IACI,aAAa;IACb,+BAA+B;AACnC;;;AAGA,+BAA+B;AAC/B;IACI,uCAAuC;AAC3C;;AAEA;IACI,uCAAuC;AAC3C;;AAEA;IACI,oCAAoC;AACxC;;AAEA;IACI,kBAAkB;IAClB,SAAS;IACT,WAAW;IACX,YAAY;IACZ,WAAW;IACX,uCAAuC;IACvC,UAAU;IACV,mBAAmB;IACnB,YAAY;AAChB;;AAEA;IACI,kBAAkB;IAClB,UAAU;IACV,OAAO;IACP,QAAQ;IACR,iBAAiB;IACjB,kBAAkB;IAClB,aAAa;IACb,YAAY;IACZ,kCAAkC;IAClC,wBAAwB;IACxB,mBAAmB;IACnB,eAAe;IACf,iBAAiB;IACjB,yBAAyB;AAC7B","sourcesContent":["html, body {\n    min-height: 100%;\n    min-width: 100%;\n    margin: 0px;\n}\n\nbody {\n    background-image: url(\"./assets/background.jpg\");\n    background-size: cover;\n    position: relative;\n}\n\n.prompt-box {\n    display: none\n}\n\n.game-container {\n    display: grid;\n    grid-template-rows: 1fr 4fr 1.7fr;\n    height: 100vh;\n    width: 100vw;\n    /* background-color: rgb(59, 59, 59); */\n}\n\n.header {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    grid-row: 1 / 2;\n    \n}\n\n.game-title {\n    font-size: 67px;\n    margin-top: 15px;\n    margin-bottom: 17px;\n    color: rgba(58, 4, 58, 0.7);\n    text-shadow: 0px 0px 40px rgb(127, 122, 122);\n}\n\n.gameboards {\n    position: relative;\n    display: flex;\n    justify-content: space-around;\n    grid-row: 2 / 3;\n    /* background-color: rgb(114, 155, 155); */\n    /* background-color: rgb(59, 59, 59); */\n}\n\n.dialogue-container {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    grid-row: 3 / 4;\n}\n\n.dialogue-box {\n    margin-top: 8px;\n    height: 20vh;\n    width: 50vw;\n    background-color: rgb(77, 134, 77);\n}\n\n\n/* gameboard wrapper styling */\n.board-wrapper {\n    position: relative;\n    height: 100%;\n    width: 400px;\n    background: rgb(128, 0, 128, 0.4);\n    border: 5px solid rgb(128, 0, 128);\n    padding: 0 15px;\n    padding-bottom: 7px;\n    border-radius: 25px;\n}\n\n.board-title {\n    text-align: center;\n    font-size: 27px;\n}\n\n.gameboard {\n    display: flex;\n    flex-direction: column;\n    height: 400px;\n    width: 400px;\n    background-color: blueviolet;\n}\n\n.row {\n    display: flex;\n    height: 10%;\n    width: 100%;\n    /* background-color: pink; */\n}\n\n.cell {\n    width: 100%;\n    margin: 0px;\n    aspect-ratio: 1;\n    background-color: rgb(221, 241, 241, 0.5);\n    border: 1px solid black;\n}\n\n.cell-c {\n    width: 100%;\n    margin: 0px;\n    aspect-ratio: 1;\n    background-color: rgb(221, 241, 241, 0.5);\n    border: 1px solid black;\n}\n\n.cell-c:hover {\n    background-color: rgb(117, 156, 211);\n}\n\n/* icons */\n.attack-icon {\n    object-fit: cover;\n    height: 100%;\n}\n\n\n/* styling for dialogue box */\n.dialogue-container {\n    position: relative;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    grid-row: 3 / 4;\n}\n\n.dialogue-box {\n    display: flex;\n    flex-direction: column;\n    justify-content: space-evenly;\n    align-items: center;\n    height: 18vh;\n    width: 45vw;\n    background-color: rgb(72, 61, 139, 0.8);\n    border: 5px solid rgb(91, 22, 91, 1);\n    border-radius: 25px;\n    margin-top: 20px;\n}\n\n.text-box1, .text-box2, .text-box3 {\n    color: rgb(183, 183, 183);\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    height: 5vh;\n    width: 50vw;\n    font-size: 25px;\n    font-weight: bold;\n}\n\n\n.reset-game-button {\n    position: absolute;\n    top: 245px;\n    left: 0;\n    right: 0;\n    margin-left: auto;\n    margin-right: auto;\n    height: 90px;\n    width: 125px;\n    background-color: rgb(72, 61, 139);\n    border: 4px solid rgb(74, 38, 254);\n    border-radius: 15px;\n    font-size: 30px;\n    color: rgb(222, 224, 225);\n}\n\n/* signature */\n.signature {\n    color: white;\n    position: absolute;\n    bottom: 25px;\n    right: 20px;\n\n}\n\na {\n    color: purple;\n    text-shadow: 0px 0px 10px black;\n}\n\n\n/* styling for ship Placement */\n.valid-placement {\n    background-color: rgb(110, 189, 110, 1);\n}\n\n.invalid-placement {\n    background-color: rgb(249, 116, 116, 1);\n}\n\n.placed {\n    background-color: rgb(214, 100, 166);\n}\n\n.rotate-ship {\n    position: absolute;\n    top: 15px;\n    right: 20px;\n    height: 25px;\n    width: 60px;\n    background-color: rgb(221, 241, 241, 1);\n    opacity: 1;\n    border-radius: 20px;\n    border: none;\n}\n\n.start-game-button {\n    position: absolute;\n    top: 350px;\n    left: 0;\n    right: 0;\n    margin-left: auto;\n    margin-right: auto;\n    height: 110px;\n    width: 140px;\n    background-color: rgb(72, 61, 139);\n    border: 4px solid purple;\n    border-radius: 15px;\n    font-size: 30px;\n    font-weight: bold;\n    color: rgb(222, 224, 225);\n}"],"sourceRoot":""}]);
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

/***/ "./node_modules/css-loader/dist/runtime/getUrl.js":
/*!********************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/getUrl.js ***!
  \********************************************************/
/***/ ((module) => {



module.exports = function (url, options) {
  if (!options) {
    options = {};
  }
  if (!url) {
    return url;
  }
  url = String(url.__esModule ? url.default : url);

  // If url is already wrapped in quotes, remove them
  if (/^['"].*['"]$/.test(url)) {
    url = url.slice(1, -1);
  }
  if (options.hash) {
    url += options.hash;
  }

  // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls
  if (/["'() \t\n]|(%20)/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }
  return url;
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

/***/ }),

/***/ "./src/assets/background.jpg":
/*!***********************************!*\
  !*** ./src/assets/background.jpg ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "322b2d0e6a2a0f6417d3.jpg";

/***/ }),

/***/ "./src/icons/hit.png":
/*!***************************!*\
  !*** ./src/icons/hit.png ***!
  \***************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "10ecd0512007798bad59.png";

/***/ }),

/***/ "./src/icons/miss.png":
/*!****************************!*\
  !*** ./src/icons/miss.png ***!
  \****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "b5b71613138ed8e5e46c.png";

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
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
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
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
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
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && (!scriptUrl || !/^http(s?):/.test(scriptUrl))) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2Q0FBNkM7QUFDN0MsMENBQTBDO0FBQzFDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0I7QUFDL0I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxPQUFPLHNGQUFzRixZQUFZLFdBQVcsVUFBVSxNQUFNLEtBQUssWUFBWSxhQUFhLGFBQWEsT0FBTyxLQUFLLEtBQUssTUFBTSxLQUFLLFVBQVUsWUFBWSxXQUFXLFVBQVUsWUFBWSxPQUFPLEtBQUssVUFBVSxZQUFZLGFBQWEsWUFBWSxPQUFPLEtBQUssVUFBVSxZQUFZLGFBQWEsYUFBYSxhQUFhLE9BQU8sS0FBSyxZQUFZLFdBQVcsWUFBWSxXQUFXLFlBQVksYUFBYSxPQUFPLEtBQUssVUFBVSxZQUFZLGFBQWEsV0FBVyxPQUFPLEtBQUssVUFBVSxVQUFVLFVBQVUsWUFBWSxRQUFRLFlBQVksTUFBTSxZQUFZLFdBQVcsVUFBVSxZQUFZLGFBQWEsV0FBVyxZQUFZLGFBQWEsT0FBTyxLQUFLLFlBQVksV0FBVyxPQUFPLEtBQUssVUFBVSxZQUFZLFdBQVcsVUFBVSxZQUFZLE9BQU8sS0FBSyxVQUFVLFVBQVUsVUFBVSxZQUFZLE9BQU8sS0FBSyxVQUFVLFVBQVUsVUFBVSxZQUFZLGFBQWEsT0FBTyxLQUFLLFVBQVUsVUFBVSxVQUFVLFlBQVksYUFBYSxPQUFPLEtBQUssWUFBWSxPQUFPLFVBQVUsS0FBSyxZQUFZLFdBQVcsUUFBUSxZQUFZLE1BQU0sWUFBWSxXQUFXLFlBQVksYUFBYSxXQUFXLE9BQU8sS0FBSyxVQUFVLFlBQVksYUFBYSxhQUFhLFdBQVcsVUFBVSxZQUFZLGFBQWEsYUFBYSxhQUFhLE9BQU8sS0FBSyxZQUFZLFdBQVcsWUFBWSxhQUFhLFdBQVcsVUFBVSxVQUFVLFlBQVksUUFBUSxLQUFLLFlBQVksV0FBVyxVQUFVLFVBQVUsWUFBWSxhQUFhLFdBQVcsVUFBVSxZQUFZLGFBQWEsYUFBYSxXQUFXLFlBQVksT0FBTyxVQUFVLEtBQUssVUFBVSxZQUFZLFdBQVcsV0FBVyxNQUFNLEtBQUssVUFBVSxZQUFZLFFBQVEsWUFBWSxNQUFNLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksV0FBVyxVQUFVLFVBQVUsVUFBVSxZQUFZLFdBQVcsWUFBWSxXQUFXLE9BQU8sS0FBSyxZQUFZLFdBQVcsVUFBVSxV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QUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQzVEYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1VDYkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOzs7OztXQ3pCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsR0FBRztXQUNIO1dBQ0E7V0FDQSxDQUFDOzs7OztXQ1BEOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7V0NOQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7Ozs7V0NsQkE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOzs7OztXQ3JCQTs7Ozs7Ozs7Ozs7Ozs7QUNBMkI7QUFDaUM7QUFDaEI7QUFJNUMvRCx5REFBYyxDQUFDLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL21haW4tdGVtcGxhdGUvLi9zcmMvZ2FtZUxvb3AuanMiLCJ3ZWJwYWNrOi8vbWFpbi10ZW1wbGF0ZS8uL3NyYy9nYW1lYm9hcmRDb250cm9sbGVyLmpzIiwid2VicGFjazovL21haW4tdGVtcGxhdGUvLi9zcmMvcGxheWVyLmpzIiwid2VicGFjazovL21haW4tdGVtcGxhdGUvLi9zcmMvc2hpcC1vYmplY3QuanMiLCJ3ZWJwYWNrOi8vbWFpbi10ZW1wbGF0ZS8uL3NyYy9zaGlwUGxhY2VtZW50LmpzIiwid2VicGFjazovL21haW4tdGVtcGxhdGUvLi9zcmMvdXNlckludGVyZmFjZS5qcyIsIndlYnBhY2s6Ly9tYWluLXRlbXBsYXRlLy4vc3JjL3BhZ2VTdHlsaW5nLmNzcyIsIndlYnBhY2s6Ly9tYWluLXRlbXBsYXRlLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly9tYWluLXRlbXBsYXRlLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2dldFVybC5qcyIsIndlYnBhY2s6Ly9tYWluLXRlbXBsYXRlLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vbWFpbi10ZW1wbGF0ZS8uL3NyYy9wYWdlU3R5bGluZy5jc3M/YTliNyIsIndlYnBhY2s6Ly9tYWluLXRlbXBsYXRlLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL21haW4tdGVtcGxhdGUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL21haW4tdGVtcGxhdGUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vbWFpbi10ZW1wbGF0ZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9tYWluLXRlbXBsYXRlLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vbWFpbi10ZW1wbGF0ZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL21haW4tdGVtcGxhdGUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbWFpbi10ZW1wbGF0ZS93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9tYWluLXRlbXBsYXRlL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9tYWluLXRlbXBsYXRlL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vbWFpbi10ZW1wbGF0ZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL21haW4tdGVtcGxhdGUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9tYWluLXRlbXBsYXRlL3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL21haW4tdGVtcGxhdGUvd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vbWFpbi10ZW1wbGF0ZS93ZWJwYWNrL3J1bnRpbWUvbm9uY2UiLCJ3ZWJwYWNrOi8vbWFpbi10ZW1wbGF0ZS8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvcHJlZmVyLWRlZmF1bHQtZXhwb3J0ICovXG5pbXBvcnQgeyBQbGF5ZXIgfSBmcm9tIFwiLi9wbGF5ZXJcIjtcbmltcG9ydCB7IGdhbWVCb2FyZENvbnRyb2xsZXIgfSBmcm9tIFwiLi9nYW1lYm9hcmRDb250cm9sbGVyXCI7XG5pbXBvcnQgeyBjcmVhdGVGbGVldCwgY3JlYXRlT3BwRmxlZXQgfSBmcm9tIFwiLi9zaGlwLW9iamVjdFwiO1xuaW1wb3J0IHsgZG9tTWFuaXB1bGF0aW9uLCBkaWFsb2d1ZUNvbnRyb2xsZXIgfSBmcm9tIFwiLi91c2VySW50ZXJmYWNlXCI7XG5pbXBvcnQgeyBodW1hblNoaXBQbGFjZW1lbnQsIGNvbXB1dGVyUGxhY2VtZW50IH0gZnJvbSBcIi4vc2hpcFBsYWNlbWVudFwiO1xuXG5leHBvcnQgY29uc3QgaW5pdGlhbGl6ZUdhbWUgPSBmdW5jdGlvbiBjcmVhdGVHYW1lKCkge1xuICAgIGNvbnN0IHJ1bkRPTSA9IGRvbU1hbmlwdWxhdGlvbigpO1xuXG5cbiAgICBjb25zdCBodW1hblBsYXllciA9IG5ldyBQbGF5ZXIoJ1VzZXInKVxuICAgIGNvbnN0IGh1bWFuRmxlZXQgPSBjcmVhdGVGbGVldCgpXG4gICAgY29uc29sZS5sb2coaHVtYW5GbGVldClcbiAgICBodW1hblBsYXllci5nYW1lQm9hcmQgPSBnYW1lQm9hcmRDb250cm9sbGVyKGh1bWFuRmxlZXQsIGh1bWFuUGxheWVyLnBsYXllcik7XG4gICAgY29uc3QgaHVtYW5Cb2FyZCA9IGh1bWFuUGxheWVyLmdhbWVCb2FyZFxuICAgIGh1bWFuQm9hcmQuY3JlYXRlQm9hcmQoKTtcbiAgICBcblxuICAgIGNvbnN0IEFJcGxheWVyID0gbmV3IFBsYXllcignRW5lbXknKTtcbiAgICBjb25zdCBjb21wdXRlckZsZWV0ID0gY3JlYXRlT3BwRmxlZXQoKTtcbiAgICBBSXBsYXllci5nYW1lQm9hcmQgPSBnYW1lQm9hcmRDb250cm9sbGVyKGNvbXB1dGVyRmxlZXQsIEFJcGxheWVyLnBsYXllcik7XG4gICAgY29uc3QgY29tcHV0ZXJCb2FyZCA9IEFJcGxheWVyLmdhbWVCb2FyZDtcbiAgICBjb21wdXRlckJvYXJkLmNyZWF0ZUJvYXJkKCk7XG5cbiAgICBydW5ET00ucmVuZGVyU3RhcnQoKTtcbiAgICBydW5ET00ucmVuZGVyR2FtZUJvYXJkKGNvbXB1dGVyQm9hcmQuY3JlYXRlQm9hcmQoKSwgQUlwbGF5ZXIucGxheWVyKTtcbiAgICBydW5ET00ucmVuZGVyR2FtZUJvYXJkKGNvbXB1dGVyQm9hcmQsIGh1bWFuUGxheWVyLnBsYXllciwgaHVtYW5Cb2FyZCk7XG4gICAgXG4gICAgLy8gY2FsbCByZW5kZXIgZGlhbG9ndWUgYm94IGhlcmVcbiAgICBjb25zdCBjcmVhdERpYWxvZ3VlID0gcnVuRE9NLnJlbmRlckRpYWxvZ3VlQm94KCk7XG4gICAgY29uc3QgZGlhbG9ndWUgPSBkaWFsb2d1ZUNvbnRyb2xsZXIoKVxuICAgIGRpYWxvZ3VlLnBsYWNlU2hpcHNNZXNzYWdlKClcblxuICAgIC8vIGNhbGwgY29tcHV0ZXJQbGFjZW1lbnQgdG8gc2V0IHVwIGNvbXB1dGVyJ3MgY2hpcHM6XG4gICAgY29uc3QgY29tcHV0ZXJQbGFjZW1lbnRzID0gY29tcHV0ZXJQbGFjZW1lbnQoY29tcHV0ZXJCb2FyZCwgY29tcHV0ZXJGbGVldCk7XG4gICAgXG4gICAgLy8gY2FsbCBzaGlwUGxhY2VtZW50IGZ1bmN0aW9uIGhlcmUgZm9yIGh1bWFuQm9hcmRcbiAgICBjb25zdCBodW1hblBsYWNlbWVudCA9IGh1bWFuU2hpcFBsYWNlbWVudChodW1hbkJvYXJkLCBodW1hbkZsZWV0KTtcblxuICAgXG59XG5cbmV4cG9ydCBjb25zdCByZXNldEludGVyZmFjZSA9IGZ1bmN0aW9uIChyZXNldEJ1dHRvbikge1xuICAgIGNvbnNvbGUubG9nKCdyZXNldGluZyBhbGwgdGhpcyBzaGl0Jyk7XG4gICAgY29uc3QgcGxheWVyQm9hcmRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdhbWVib2FyZHMnKTtcbiAgICBjb25zdCBkaWFsb2d1ZUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kaWFsb2d1ZS1jb250YWluZXInKTtcbiAgICBjb25zdCBkaWFsb2d1ZUJveCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kaWFsb2d1ZS1ib3gnKTtcbiAgICBjb25zdCBnYW1lQm9hcmRXcmFwcGVycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ib2FyZC13cmFwcGVyJyk7XG5cblxuICAgIGdhbWVCb2FyZFdyYXBwZXJzLmZvckVhY2goKGVsZW1lbnQpID0+IHtcbiAgICAgICAgcGxheWVyQm9hcmRzLnJlbW92ZUNoaWxkKGVsZW1lbnQpO1xuICAgIH0pO1xuXG4gICAgZGlhbG9ndWVDb250YWluZXIucmVtb3ZlQ2hpbGQoZGlhbG9ndWVCb3gpO1xuICAgIHBsYXllckJvYXJkcy5yZW1vdmVDaGlsZChyZXNldEJ1dHRvbilcblxuICAgIGluaXRpYWxpemVHYW1lKCk7XG5cbn0iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby11c2UtYmVmb3JlLWRlZmluZSAqL1xuLyogZXNsaW50LWRpc2FibGUgbm8tZWxzZS1yZXR1cm4gKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLWxvb3AtZnVuYyAqL1xuLyogZXNsaW50LWRpc2FibGUgbm8tcGx1c3BsdXMgKi9cbi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9wcmVmZXItZGVmYXVsdC1leHBvcnQgKi9cbmltcG9ydCB7IGRvbU1hbmlwdWxhdGlvbiwgZGlhbG9ndWVDb250cm9sbGVyIH0gZnJvbSBcIi4vdXNlckludGVyZmFjZVwiO1xuXG5cbmNvbnN0IHJ1bkRPTSA9IGRvbU1hbmlwdWxhdGlvbigpO1xuY29uc3QgZGlhbG9ndWVSZWZyZXNoID0gZGlhbG9ndWVDb250cm9sbGVyKCk7XG5cbmV4cG9ydCBmdW5jdGlvbiBnYW1lQm9hcmRDb250cm9sbGVyKGZsZWV0LCBuYW1lKSB7XG4gICAgY29uc3QgcGxheWVyTmFtZSA9IG5hbWU7XG4gICAgY29uc3QgYm9hcmQgPSBbXTtcbiAgICBjb25zdCBzaGlwcyA9IGZsZWV0O1xuXG5cbiAgICBmdW5jdGlvbiBjcmVhdGVCb2FyZCgpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgICAgICAgICBib2FyZFtpXSA9IFtdO1xuXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspIHtcbiAgICAgICAgICAgICAgICBib2FyZFtpXVtqXSA9IGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2coYm9hcmQpO1xuICAgICAgICByZXR1cm4gYm9hcmRcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwbGFjZUhvcml6b250YWxTaGlwKHJvdywgY29sLCBzaGlwKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgbmV3Q29vcmRzID0gW3JvdywgY29sICsgaV07XG4gICAgICAgICAgICBzaGlwLmNvb3Jkcy5wdXNoKG5ld0Nvb3JkcylcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyhzaGlwKTtcbiAgICAgICAgY29uc29sZS5sb2coc2hpcC5uYW1lKTtcbiAgICAgICAgY29uc29sZS5sb2coc2hpcC5jb29yZHMpO1xuICAgICAgICBjb25zb2xlLmxvZyhzaGlwcylcbiAgICAgICAgcmV0dXJuIHNoaXBcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwbGFjZVZlcnRpY2FsU2hpcChyb3csIGNvbCwgc2hpcCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IG5ld0Nvb3JkcyA9IFtyb3cgKyBpLCBjb2xdO1xuICAgICAgICAgICAgc2hpcC5jb29yZHMucHVzaChuZXdDb29yZHMpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKHNoaXApXG4gICAgICAgIGNvbnNvbGUubG9nKHNoaXBzKVxuICAgICAgICBjb25zb2xlLmxvZyhzaGlwLmNvb3Jkcyk7XG4gICAgICAgIHJldHVybiBzaGlwXG4gICAgfVxuICAgIFxuICAgIGZ1bmN0aW9uIHJlY2lldmVBdHRhY2soY29vcmRzKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGNvb3JkcylcbiAgICAgICAgbGV0IGF0dGFja1N0YXR1cyA9ICdtaXNzJztcblxuICAgICAgICAvLyBjaGVjayB0byBzZWUgaWYgY29vcmRzIGhhdmUgYWxyZWFkeSBiZWVuIHVzZWQ6XG4gICAgICAgIGlmIChjaGVja0lmVXNlZChjb29yZHMpID09PSB0cnVlKSB7XG4gICAgICAgICAgICByZXR1cm4gJ2ZpbGxlZCBhbHJlYWR5J1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgc2hpcHNbaV0uY29vcmRzLmZvckVhY2goKGNvb3JkKSA9PiB7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKGNoZWNrSWZVc2VkKGNvb3JkcykgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdmaWxsZWQgYWxyZWFkeSdcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoY29vcmRbMF0gPT09IGNvb3Jkc1swXSAmJiBjb29yZFsxXSA9PT0gY29vcmRzWzFdKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdoaXQnKTtcbiAgICAgICAgICAgICAgICAgICAgYXR0YWNrU3RhdHVzID0gJ2hpdCdcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYXR0YWNrU3RhdHVzKVxuICAgICAgICAgICAgICAgICAgICBzaGlwc1tpXS5oaXQoKTtcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlQm9hcmRTcG90KGNvb3Jkcyk7XG4gICAgICAgICAgICAgICAgICAgIGRpYWxvZ3VlUmVmcmVzaC5tb3ZlUmVzdWx0KGF0dGFja1N0YXR1cyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYXllck5hbWUsIGNvb3Jkcywgc2hpcHNbaV0pXG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3Vua0NoZWNrID0gc2hpcHNbaV0uY2hlY2tJZlN1bmsoKVxuICAgICAgICAgICAgICAgICAgICBpZiAoc3Vua0NoZWNrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkaWFsb2d1ZVJlZnJlc2guc3Vua1NoaXBNZXNzYWdlKHNoaXBzW2ldLCBwbGF5ZXJOYW1lKVxuICAgICAgICAgICAgICAgICAgICAgICAgc2hpcHMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tBbGxTdW5rKClcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIHVwZGF0ZUJvYXJkU3BvdChjb29yZHMsIGF0dGFja1N0YXR1cyk7XG4gICAgICAgIGlmIChhdHRhY2tTdGF0dXMgPT09ICdtaXNzJykge1xuICAgICAgICAgICAgZGlhbG9ndWVSZWZyZXNoLm1vdmVSZXN1bHQoYXR0YWNrU3RhdHVzLFxuICAgICAgICAgICAgICAgIHBsYXllck5hbWUsIGNvb3JkcylcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGF0dGFja1N0YXR1c1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNoZWNrQWxsU3VuaygpIHtcbiAgICAgICAgY29uc29sZS5sb2coc2hpcHMpO1xuICAgICAgICBpZiAoc2hpcHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICBkaWFsb2d1ZVJlZnJlc2guZW5kR2FtZU1lc3NhZ2UocGxheWVyTmFtZSlcbiAgICAgICAgICAgIGVuZEdhbWUoKVxuICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlQm9hcmRTcG90KGNvb3JkcywgYXR0YWNrU3RhdHVzKSB7XG4gICAgICAgIGJvYXJkW2Nvb3Jkc1swXSAtIDFdW2Nvb3Jkc1sxXSAtIDFdID0gdHJ1ZTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coYm9hcmQpXG4gICAgICAgIHJ1bkRPTS51c2VHcmlkU3BvdChjb29yZHMsIGF0dGFja1N0YXR1cywgcGxheWVyTmFtZSlcbiAgICAgICAgcmV0dXJuIGJvYXJkXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2hlY2tJZlVzZWQoY29vcmRzKSB7XG4gICAgICAgIGlmIChib2FyZFtjb29yZHNbMF0gLSAxXVtjb29yZHNbMV0gLSAxXSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ2FscmVhZHkgdXNlZCcpXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICBcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBlbmRHYW1lKCkge1xuICAgICAgICAvLyB3YW50IHRvIGRpc2FibGUgYm90aCBnYW1lQm9hcmRzXG4gICAgICAgIC8vIHdhbnQgdG8gbWFrZSB0aGUgcmVzdGFydCBidXR0b24gYXBwZWFyXG4gICAgICAgIGNvbnNvbGUubG9nKCdlbmRpbmcgZ2FtZScpO1xuICAgICAgICBydW5ET00uZnJlZXplR3JpZCgpO1xuICAgICAgICBydW5ET00ucmVuZGVyRW5kR2FtZSgpO1xuICAgIH1cbiAgICAvLyBsaWtlbHkgd2lsbCBoYXZlIHRvIGltcGxlbWVudCBjaGVjayB0byBtYWtlIHN1cmUgYSBzaGlwIGNhblxuICAgIC8vIGJlIHBsYWNlZCB3aXRoIG5vIG92ZXJsYXBcblxuXG4gICAgcmV0dXJuIHsgY3JlYXRlQm9hcmQsIHBsYWNlSG9yaXpvbnRhbFNoaXAsIHBsYWNlVmVydGljYWxTaGlwLCByZWNpZXZlQXR0YWNrLFxuICAgIGNoZWNrQWxsU3VuaywgdXBkYXRlQm9hcmRTcG90LCBjaGVja0lmVXNlZCwgZW5kR2FtZSB9XG59XG5cbiIsIi8vIGNyZWF0ZSBib3RoIHRoZSB1c2VyIHBsYXllciBhbmQgdGhlIGNvbXB1dGVyIHBsYXllciBoZXJlXG5cbi8vIGNvbXB1dGVyIHBsYXllciBoYXMgYXR0YWNrIGNvb3JkaW5hdGVzIGdlbmVyYXRvciBmdW5jdGlvblxuXG5leHBvcnQgY2xhc3MgUGxheWVyIHtcbiAgICBjb25zdHJ1Y3RvcihwbGF5ZXIsIGdhbWVCb2FyZCkge1xuICAgICAgICB0aGlzLnBsYXllciA9IHBsYXllcjtcbiAgICAgICAgdGhpcy5nYW1lQm9hcmQ9IG51bGxcbiAgICB9XG59XG5cblxuZXhwb3J0IGNvbnN0IHVzZXJQbGF5ZXIgPSBmdW5jdGlvbiAoKSB7XG5cbn1cblxuZXhwb3J0IGNvbnN0IGNvbXB1dGVyUGxheWVyID0gZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IHZpc2l0ZWQgPSBbXTtcblxuICAgIGZ1bmN0aW9uIHBpY2tSYW5kb21DZWxsKGh1bWFuQm9hcmQpIHtcbiAgICAgICAgY29uc3Qgcm93ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApICsgMVxuICAgICAgICBjb25zdCBjb2x1bW4gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCkgKyAxXG4gICAgICAgIGNvbnN0IGNvbXBDb29yZHMgPSBbcm93LCBjb2x1bW5dO1xuXG4gICAgICAgIGNvbnN0IHJlcGVhdEJvb2xlYW4gPSBjaGVja1JlcGVhdENlbGwoY29tcENvb3JkcylcbiAgICAgICAgY29uc29sZS5sb2cocmVwZWF0Qm9vbGVhbilcbiAgICAgICAgaWYgKHJlcGVhdEJvb2xlYW4gPT09IHRydWUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjb21wdXRlciBwaWNrZWQgdXNlZCBjZWxsISEnKVxuICAgICAgICAgICAgcGlja1JhbmRvbUNlbGwoaHVtYW5Cb2FyZCk7XG4gICAgICAgIH0gZWxzZSBpZiAocmVwZWF0Qm9vbGVhbiA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHZpc2l0ZWQucHVzaChjb21wQ29vcmRzKTtcbiAgICAgICAgICAgIGh1bWFuQm9hcmQucmVjaWV2ZUF0dGFjayhjb21wQ29vcmRzKTtcblxuICAgICAgICAgICAgcmV0dXJuIGNvbXBDb29yZHMgXG4gICAgICAgIH1cbiAgICAgICAgXG5cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjaGVja1JlcGVhdENlbGwoY29vcmRzKSB7XG4gICAgICAgIGNvbnN0IHN0cmluZ2VkQ29vcmRzID0gSlNPTi5zdHJpbmdpZnkoY29vcmRzKTtcbiAgICAgICAgY29uc3QgZXhpc3RzQm9vbGVhbiA9IHZpc2l0ZWQuc29tZSgoY29vcmQpID0+IEpTT04uc3RyaW5naWZ5KGNvb3JkKSA9PT0gc3RyaW5nZWRDb29yZHMpXG4gICAgICAgIGNvbnNvbGUubG9nKGV4aXN0c0Jvb2xlYW4pXG4gICAgICAgIHJldHVybiBleGlzdHNCb29sZWFuXG4gICAgfVxuXG4gICAgcmV0dXJuIHtwaWNrUmFuZG9tQ2VsbCwgY2hlY2tSZXBlYXRDZWxsfVxufSIsIi8qIGVzbGludC1kaXNhYmxlIG5vLWVsc2UtcmV0dXJuICovXG4vKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvcHJlZmVyLWRlZmF1bHQtZXhwb3J0ICovXG5cbmV4cG9ydCBjbGFzcyBTaGlwIHtcbiAgICBjb25zdHJ1Y3RvcihsZW5ndGgsIG5hbWUsIGhpdHMsIGlzU3VuaywgY29vcmRzKSB7XG4gICAgICAgIHRoaXMubGVuZ3RoID0gbGVuZ3RoO1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLmhpdHMgPSAwO1xuICAgICAgICB0aGlzLmlzU3VuayA9IGZhbHNlO1xuICAgICAgICB0aGlzLmNvb3JkcyA9IFtdXG4gICAgfVxuXG4gICAgaGl0KCkge1xuICAgICAgICB0aGlzLmhpdHMgKz0gMVxuICAgICAgICBjb25zb2xlLmxvZygnaGl0IGFkZGVkJylcbiAgICB9XG5cbiAgICBjaGVja0lmU3VuaygpIHtcbiAgICAgICAgaWYgKHRoaXMubGVuZ3RoID09PSB0aGlzLmhpdHMpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdTdW5rIScpXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5sZW5ndGgpO1xuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5oaXRzKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgfVxuXG59XG5cblxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRmxlZXQoKSB7XG4gICAgY29uc3Qgc2hpcHMgPSBbXVxuXG4gICAgY29uc3QgY2FycmllciA9IG5ldyBTaGlwKDUsICdDYXJyaWVyJyk7XG4gICAgY29uc3QgYmF0dGxlc2hpcCA9IG5ldyBTaGlwKDQsICdCYXR0bGVzaGlwJyk7XG4gICAgY29uc3QgZGVzdHJveWVyID0gbmV3IFNoaXAoMywgJ0Rlc3Ryb3llcicpO1xuICAgIGNvbnN0IHN1Ym1hcmluZSA9IG5ldyBTaGlwKDMsICdTdWJtYXJpbmUnKTtcbiAgICBjb25zdCBwYXRyb2xCb2F0ID0gbmV3IFNoaXAoMiwgJ1BhdHJvbCBCb2F0Jyk7XG4gXG4gICAgc2hpcHMucHVzaChjYXJyaWVyLCBiYXR0bGVzaGlwLCBkZXN0cm95ZXIsIHN1Ym1hcmluZSwgcGF0cm9sQm9hdClcblxuICAgIGNvbnNvbGUubG9nKHNoaXBzKTtcbiAgICByZXR1cm4gc2hpcHNcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZU9wcEZsZWV0KCkge1xuICAgIGNvbnN0IHNoaXBzID0gW11cblxuICAgIGNvbnN0IGNhcnJpZXIgPSBuZXcgU2hpcCg1LCAnQ2FycmllcicpO1xuICAgIGNvbnN0IGJhdHRsZXNoaXAgPSBuZXcgU2hpcCg0LCAnQmF0dGxlc2hpcCcpO1xuICAgIGNvbnN0IGRlc3Ryb3llciA9IG5ldyBTaGlwKDMsICdEZXN0cm95ZXInKTtcbiAgICBjb25zdCBzdWJtYXJpbmUgPSBuZXcgU2hpcCgzLCAnU3VibWFyaW5lJyk7XG4gICAgY29uc3QgcGF0cm9sQm9hdCA9IG5ldyBTaGlwKDIsICdQYXRyb2wgQm9hdCcpO1xuXG4gICAgc2hpcHMucHVzaChjYXJyaWVyLCBiYXR0bGVzaGlwLCBkZXN0cm95ZXIsIHN1Ym1hcmluZSwgcGF0cm9sQm9hdCk7XG5cbiAgICBjb25zb2xlLmxvZyhzaGlwcyk7XG4gICAgcmV0dXJuIHNoaXBzXG59IiwiLyogZXNsaW50LWRpc2FibGUgbm8tdXNlLWJlZm9yZS1kZWZpbmUgKi9cbi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9wcmVmZXItZGVmYXVsdC1leHBvcnQgKi9cblxuLy8gcm90YXRlQnV0dG9uIGFsbG93cyBwbGF5ZXJzIHRvIHJvdGF0ZSBzaGlwcyBkdXJpbmcgcGxhY2VtZW50IHBoYXNlXG4vLyBzdGFydEJ1dHRvbiBhbGxvd3MgcGxheWVyIHRvIGF0dGFjayB3aGVuIGFsbCBzaGlwcyBoYXZlIGJlZW4gcGxhY2VkXG5pbXBvcnQgeyBkaWFsb2d1ZUNvbnRyb2xsZXIgfSBmcm9tIFwiLi91c2VySW50ZXJmYWNlXCI7XG5cblxuZXhwb3J0IGNvbnN0IGh1bWFuU2hpcFBsYWNlbWVudCA9IGZ1bmN0aW9uIChodW1hbkJvYXJkLCBzaGlwcykge1xuICAgIGNvbnN0IHJvdGF0ZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yb3RhdGUtc2hpcCcpO1xuICAgIGNvbnN0IHN0YXJ0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN0YXJ0LWdhbWUtYnV0dG9uJyk7XG4gICAgY29uc3QgcGxheWVyQm9hcmRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdhbWVib2FyZHMnKTtcbiAgICBjb25zdCBnYW1lQm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ2FtZWJvYXJkJyk7XG4gICAgY29uc3QgZGlhbG9ndWVSdW4gPSBkaWFsb2d1ZUNvbnRyb2xsZXIoKTtcblxuICAgIC8vIG1lbW9yeSBzdG9yYWdlIGZvciB3aGVyZSBjZWxscyBjYW4ndCBiZSB1c2VkIGFnYWluXG4gICAgY29uc3Qgb2NjdXBpZWRDZWxscyA9IFtdO1xuXG4gICAgLy8gc2V0cyBwbGFuZVxuICAgIGxldCBjdXJyZW50UGxhbmUgPSAnaG9yaXpvbnRhbCc7XG4gICAgY3JlYXRlUm90YXRpb25BYmlsaXR5KCk7XG5cbiAgICBjb25zdCBodW1hbkNlbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNlbGwnKTtcbiAgICBsZXQgc2hpcEluZGV4ID0gMDtcbiAgICBcblxuICAgIGh1bWFuQ2VsbHMuZm9yRWFjaCgoY2VsbCkgPT4ge1xuICAgICAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsICgpID0+IHtcbiAgICAgICAgICAgIGNlbGxIb3ZlcihjZWxsLCBzaGlwc1tzaGlwSW5kZXhdKVxuICAgICAgICB9KTtcblxuICAgICAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgaWYgKGNlbGwuY2xhc3NMaXN0LmNvbnRhaW5zKCd2YWxpZC1wbGFjZW1lbnQnKSkge1xuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50UGxhbmUgPT09ICdob3Jpem9udGFsJykge1xuICAgICAgICAgICAgICAgICAgICBwbGFjZUhvcml6b250YWxseShjZWxsLmNvb3JkaW5hdGVzLCBjZWxsLmFjdGl2ZUNlbGxzLCBzaGlwc1tzaGlwSW5kZXhdKTtcbiAgICAgICAgICAgICAgICAgICAgc2hpcEluZGV4ICs9IDE7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzaGlwSW5kZXggPT09IDUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0QnV0dG9uRW1lcmdlKClcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhzaGlwSW5kZXgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY3VycmVudFBsYW5lID09PSAndmVydGljYWwnKSB7XG4gICAgICAgICAgICAgICAgICAgIHBsYWNlVmVydGljYWxseShjZWxsLmNvb3JkaW5hdGVzLCBjZWxsLmFjdGl2ZUNlbGxzLCBzaGlwc1tzaGlwSW5kZXhdKTtcbiAgICAgICAgICAgICAgICAgICAgc2hpcEluZGV4ICs9IDE7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzaGlwSW5kZXggPT09IDUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0QnV0dG9uRW1lcmdlKClcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhzaGlwSW5kZXgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBzaGlwSW5kZXhcbiAgICAgICAgfSlcbiAgICB9KVxuXG4gICAgXG4gICAgZnVuY3Rpb24gY2VsbEhvdmVyKGNlbGwsIHNoaXApIHtcbiAgICAgICAgY29uc3QgY2VsbENvb3JkcyA9IGNlbGwuY29vcmRpbmF0ZXM7XG4gICAgICAgIGNlbGwuYWN0aXZlQ2VsbHMgPSBbXTtcbiAgICAgICAgY29uc3QgZ3JvdXBlZENlbGxzID0gY2VsbC5hY3RpdmVDZWxscztcbiAgICAgICAgLy8gaGF2ZSB0byBjaGVjayBpZiBpdHMgaG9yaXpvbnRhbCBvciB2ZXJ0aWNhbFxuICAgICAgICAvLyB0aGVuIGNoZWNrIGlmIHN0YXJ0aW5nIHBvaW50ICsgc2hpcCBsZW5ndGggaXMgdmFsaWRcbiAgICAgICAgaWYgKHNoaXBJbmRleCA9PT0gNSkge1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY3VycmVudFBsYW5lID09PSAnaG9yaXpvbnRhbCcpIHtcbiAgICAgICAgICAgIGNvbnN0IGNlbGxSb3cgPSBjZWxsQ29vcmRzWzBdXG4gICAgICAgICAgICBsZXQgY2VsbENvbHVtbiA9IGNlbGxDb29yZHNbMV07XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGFjdGl2ZUNlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHtjZWxsUm93fSAke2NlbGxDb2x1bW59aGApXG4gICAgICAgICAgICAgICAgZ3JvdXBlZENlbGxzLnB1c2goYWN0aXZlQ2VsbCk7XG4gICAgICAgICAgICAgICAgY2VsbENvbHVtbiArPSAxXG4gICAgICAgICAgICAgICAgaWYgKGNlbGxDb2x1bW4gPiAxMCkge1xuICAgICAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGNvbmZsaWN0aW5nID0gY2hlY2tDb25mbGljdGluZ1NoaXBzKGdyb3VwZWRDZWxscyk7XG5cbiAgICAgICAgICAgIGlmICgoY2VsbENvb3Jkc1sxXSArIHNoaXAubGVuZ3RoKSAtIDEgPD0gMTAgJiYgY29uZmxpY3RpbmcgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgZ3JvdXBlZENlbGxzLmZvckVhY2goKGVsZW0pID0+IHtcbiAgICAgICAgICAgICAgICAgICBlbGVtLmNsYXNzTGlzdC5hZGQoJ3ZhbGlkLXBsYWNlbWVudCcpOyBcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfSBlbHNlIGlmICgoY2VsbENvb3Jkc1sxXSArIHNoaXAubGVuZ3RoKSAtIDEgPiAxMCB8fCBjb25mbGljdGluZyA9PT0gdHJ1ZSl7XG4gICAgICAgICAgICAgICAgZ3JvdXBlZENlbGxzLmZvckVhY2goKGVsZW0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZWxlbS5jbGFzc0xpc3QuYWRkKCdpbnZhbGlkLXBsYWNlbWVudCcpOyBcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0JywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGdyb3VwZWRDZWxscy5mb3JFYWNoKChlbGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGVsZW0uY2xhc3NMaXN0LnJlbW92ZSgndmFsaWQtcGxhY2VtZW50JywgJ2ludmFsaWQtcGxhY2VtZW50JylcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSlcblxuXG4gICAgICAgIH0gZWxzZSBpZiAoY3VycmVudFBsYW5lID09PSAndmVydGljYWwnKSB7XG4gICAgICAgICAgICBsZXQgY2VsbFJvdyA9IGNlbGxDb29yZHNbMF1cbiAgICAgICAgICAgIGNvbnN0IGNlbGxDb2x1bW4gPSBjZWxsQ29vcmRzWzFdO1xuXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBhY3RpdmVDZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7Y2VsbFJvd30gJHtjZWxsQ29sdW1ufWhgKVxuICAgICAgICAgICAgICAgIGdyb3VwZWRDZWxscy5wdXNoKGFjdGl2ZUNlbGwpO1xuICAgICAgICAgICAgICAgIGNlbGxSb3cgKz0gMVxuICAgICAgICAgICAgICAgIGlmIChjZWxsUm93ID4gMTApIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBjb25mbGljdGluZyA9IGNoZWNrQ29uZmxpY3RpbmdTaGlwcyhncm91cGVkQ2VsbHMpO1xuXG5cbiAgICAgICAgICAgIGlmICgoY2VsbENvb3Jkc1swXSArIHNoaXAubGVuZ3RoKSAtIDEgPD0gMTAgJiYgY29uZmxpY3RpbmcgPT09IGZhbHNlICkge1xuICAgICAgICAgICAgICAgIGdyb3VwZWRDZWxscy5mb3JFYWNoKChlbGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgZWxlbS5jbGFzc0xpc3QuYWRkKCd2YWxpZC1wbGFjZW1lbnQnKTsgXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoKGNlbGxDb29yZHNbMF0gKyBzaGlwLmxlbmd0aCkgLSAxID4gMTAgfHwgY29uZmxpY3RpbmcgPT09IHRydWUpe1xuICAgICAgICAgICAgICAgIGdyb3VwZWRDZWxscy5mb3JFYWNoKChlbGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGVsZW0uY2xhc3NMaXN0LmFkZCgnaW52YWxpZC1wbGFjZW1lbnQnKTsgXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW91dCcsICgpID0+IHtcbiAgICAgICAgICAgICAgICBncm91cGVkQ2VsbHMuZm9yRWFjaCgoZWxlbSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBlbGVtLmNsYXNzTGlzdC5yZW1vdmUoJ3ZhbGlkLXBsYWNlbWVudCcsICdpbnZhbGlkLXBsYWNlbWVudCcpXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwbGFjZUhvcml6b250YWxseShjZWxsQ29vcmRzLCBhY3RpdmVDZWxscywgc2hpcCkge1xuICAgICAgICBhY3RpdmVDZWxscy5mb3JFYWNoKChlbGVtKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlbGVtLmNvb3JkaW5hdGVzKTtcbiAgICAgICAgICAgIG9jY3VwaWVkQ2VsbHMucHVzaChlbGVtLmNvb3JkaW5hdGVzKTtcbiAgICAgICAgICAgIGVsZW0uY2xhc3NMaXN0LmFkZCgncGxhY2VkJyk7XG4gICAgICAgIH0pO1xuICAgICAgICBodW1hbkJvYXJkLnBsYWNlSG9yaXpvbnRhbFNoaXAoY2VsbENvb3Jkc1swXSwgY2VsbENvb3Jkc1sxXSwgc2hpcCk7XG4gICAgICAgIGNvbnNvbGUubG9nKG9jY3VwaWVkQ2VsbHMpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBsYWNlVmVydGljYWxseShjZWxsQ29vcmRzLCBhY3RpdmVDZWxscywgc2hpcCkge1xuICAgICAgICBhY3RpdmVDZWxscy5mb3JFYWNoKChlbGVtKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlbGVtLmNvb3JkaW5hdGVzKTtcbiAgICAgICAgICAgIG9jY3VwaWVkQ2VsbHMucHVzaChlbGVtLmNvb3JkaW5hdGVzKTtcbiAgICAgICAgICAgIGVsZW0uY2xhc3NMaXN0LmFkZCgncGxhY2VkJyk7XG4gICAgICAgIH0pO1xuICAgICAgICBodW1hbkJvYXJkLnBsYWNlVmVydGljYWxTaGlwKGNlbGxDb29yZHNbMF0sIGNlbGxDb29yZHNbMV0sIHNoaXApO1xuICAgICAgICBjb25zb2xlLmxvZyhvY2N1cGllZENlbGxzKVxuICAgIH1cblxuXG4gICAgXG4gICAgZnVuY3Rpb24gY2hlY2tDb25mbGljdGluZ1NoaXBzKGFjdGl2ZUNlbGxzKSB7XG4gICAgICAgIGxldCBhbHJlYWR5VXNlZCA9IGZhbHNlXG4gICAgICAgIGFjdGl2ZUNlbGxzLmZvckVhY2goKGVsZW0pID0+IHtcbiAgICAgICAgICAgIGlmIChjaGVja0ZvclJlcGVhdChlbGVtLmNvb3JkaW5hdGVzLCBvY2N1cGllZENlbGxzKSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIGFscmVhZHlVc2VkID0gdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICByZXR1cm4gYWxyZWFkeVVzZWRcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVSb3RhdGlvbkFiaWxpdHkoKSB7XG4gICAgICAgIHJvdGF0ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG5ld1BsYW5lID0gc3dpdGNoUGxhbmUoY3VycmVudFBsYW5lKTtcbiAgICAgICAgICAgIGN1cnJlbnRQbGFuZSA9IG5ld1BsYW5lXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc3RhcnRCdXR0b25FbWVyZ2UoKSB7XG4gICAgICAgIHN0YXJ0QnV0dG9uLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snOyBcbiAgICAgICAgc3RhcnRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICBkaWFsb2d1ZVJ1bi5iZWdpbkF0dGFja01lc3NhZ2UoKTtcbiAgICAgICAgICAgIGdhbWVCb2FyZC5zdHlsZS5wb2ludGVyRXZlbnRzID0gJ2F1dG8nO1xuICAgICAgICAgICAgcGxheWVyQm9hcmRzLnJlbW92ZUNoaWxkKHN0YXJ0QnV0dG9uKTtcbiAgICAgICAgICAgIHJvdGF0ZUJ1dHRvbi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIHJldHVybiB7IGNlbGxIb3ZlciwgcGxhY2VIb3Jpem9udGFsbHksIGNoZWNrQ29uZmxpY3RpbmdTaGlwcyB9XG59XG5cblxuXG5cblxuLy8gY29tcHV0ZXIgcGxhY2VtZW50IGxvZ2ljXG5cbmV4cG9ydCBjb25zdCBjb21wdXRlclBsYWNlbWVudCA9IGZ1bmN0aW9uIChjb21wdXRlckJvYXJkLCBzaGlwcykge1xuICAgIGNvbnN0IHBsYW5lcyA9IFsnaG9yaXpvbnRhbCcsICd2ZXJ0aWNhbCddXG4gICAgY29uc3QgdXNlZENlbGxzID0gW107XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNyZWF0ZVNoaXBDb29yZHMoc2hpcHNbaV0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZVNoaXBDb29yZHMoc2hpcCkge1xuXG4gICAgICAgIGNvbnN0IGNob3NlblBsYW5lID0gY2hvb3NlUGxhbmUocGxhbmVzKTtcbiAgICAgICAgY29uc29sZS5sb2coY2hvc2VuUGxhbmUpXG4gICAgICAgIGlmIChjaG9zZW5QbGFuZSA9PT0gJ2hvcml6b250YWwnKSB7XG4gICAgICAgICAgICB0ZXN0SG9yaXpvbnRhbFNoaXAoc2hpcClcbiAgICAgICAgfSBlbHNlIGlmIChjaG9zZW5QbGFuZSA9PT0gJ3ZlcnRpY2FsJykge1xuICAgICAgICAgICAgdGVzdFZlcnRpY2FsU2hpcChzaGlwKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgZnVuY3Rpb24gdGVzdEhvcml6b250YWxTaGlwKHNoaXApIHtcbiAgICAgICAgbGV0IHN0YXJ0aW5nQ29vcmRzID0gY3JlYXRlSG9yaXpvbnRhbFN0YXJ0KHNoaXApXG5cbiAgICAgICAgLy8gaW5pdGlhbCBjaGVjayBvZiByZXBlYXQ6XG4gICAgICAgIGxldCBmaXJzdFJlcGVhdCA9IGNoZWNrRm9yUmVwZWF0KHN0YXJ0aW5nQ29vcmRzLCB1c2VkQ2VsbHMpXG4gICAgICAgIHdoaWxlIChmaXJzdFJlcGVhdCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ25lZWQgbmV3IHN0YXJ0JylcbiAgICAgICAgICAgIHN0YXJ0aW5nQ29vcmRzID0gY3JlYXRlSG9yaXpvbnRhbFN0YXJ0KHNoaXApO1xuICAgICAgICAgICAgZmlyc3RSZXBlYXQgPSBjaGVja0ZvclJlcGVhdChzdGFydGluZ0Nvb3JkcywgdXNlZENlbGxzKVxuICAgICAgICB9XG4gICAgICAgIHVzZWRDZWxscy5wdXNoKHN0YXJ0aW5nQ29vcmRzKTsgXG4gICAgICAgIFxuICAgICAgICBsZXQgcmVwZWF0RGV0ZWN0ID0gZmFsc2U7XG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgc2hpcC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgbmV3Q29vcmRzID0gW3N0YXJ0aW5nQ29vcmRzWzBdLCBzdGFydGluZ0Nvb3Jkc1sxXSArIGldO1xuICAgICAgICAgICAgY29uc3QgcmVwZWF0ID0gY2hlY2tGb3JSZXBlYXQobmV3Q29vcmRzLCB1c2VkQ2VsbHMpXG4gICAgICAgICAgICBpZiAocmVwZWF0ID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIHVzZWRDZWxscy5wdXNoKG5ld0Nvb3Jkcyk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHJlcGVhdCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIHJlcGVhdERldGVjdCA9IHRydWVcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHJlcGVhdERldGVjdCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIGNvbXB1dGVyQm9hcmQucGxhY2VIb3Jpem9udGFsU2hpcChzdGFydGluZ0Nvb3Jkc1swXSwgc3RhcnRpbmdDb29yZHNbMV0sIHNoaXApO1xuICAgICAgICB9IGVsc2UgaWYgKHJlcGVhdERldGVjdCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgdGVzdEhvcml6b250YWxTaGlwKHNoaXApO1xuICAgICAgICB9XG5cbiAgICB9XG5cblxuICAgIGZ1bmN0aW9uIHRlc3RWZXJ0aWNhbFNoaXAoc2hpcCkge1xuICAgICAgICBsZXQgc3RhcnRpbmdDb29yZHMgPSBjcmVhdGVWZXJ0aWNhbFN0YXJ0KHNoaXApXG5cbiAgICAgICAgLy8gaW5pdGlhbCBjaGVjayBvZiByZXBlYXQ6XG4gICAgICAgIGxldCBmaXJzdFJlcGVhdCA9IGNoZWNrRm9yUmVwZWF0KHN0YXJ0aW5nQ29vcmRzLCB1c2VkQ2VsbHMpXG4gICAgICAgIHdoaWxlIChmaXJzdFJlcGVhdCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ25lZWQgbmV3IHN0YXJ0JylcbiAgICAgICAgICAgIHN0YXJ0aW5nQ29vcmRzID0gY3JlYXRlVmVydGljYWxTdGFydChzaGlwKTtcbiAgICAgICAgICAgIGZpcnN0UmVwZWF0ID0gY2hlY2tGb3JSZXBlYXQoc3RhcnRpbmdDb29yZHMsIHVzZWRDZWxscylcbiAgICAgICAgfVxuICAgICAgICB1c2VkQ2VsbHMucHVzaChzdGFydGluZ0Nvb3Jkcyk7XG5cbiAgICAgICAgbGV0IHJlcGVhdERldGVjdCA9IGZhbHNlO1xuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IHNoaXAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IG5ld0Nvb3JkcyA9IFtzdGFydGluZ0Nvb3Jkc1swXSArIGksIHN0YXJ0aW5nQ29vcmRzWzFdXTtcbiAgICAgICAgICAgIGNvbnN0IHJlcGVhdCA9IGNoZWNrRm9yUmVwZWF0KG5ld0Nvb3JkcywgdXNlZENlbGxzKVxuICAgICAgICAgICAgaWYgKHJlcGVhdCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgdXNlZENlbGxzLnB1c2gobmV3Q29vcmRzKTtcbiAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHJlcGVhdCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIHJlcGVhdERldGVjdCA9IHRydWVcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgIH1cblxuICAgICAgICBpZiAocmVwZWF0RGV0ZWN0ID09PSBmYWxzZSkge1xuICAgICAgICAgICAgY29tcHV0ZXJCb2FyZC5wbGFjZVZlcnRpY2FsU2hpcChzdGFydGluZ0Nvb3Jkc1swXSwgc3RhcnRpbmdDb29yZHNbMV0sIHNoaXApO1xuICAgICAgICB9IGVsc2UgaWYgKHJlcGVhdERldGVjdCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgdGVzdFZlcnRpY2FsU2hpcChzaGlwKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNob29zZVBsYW5lKHBsYW5lcykge1xuICAgICAgICBjb25zdCBjaG9zZW5JbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHBsYW5lcy5sZW5ndGgpO1xuICAgICAgICByZXR1cm4gcGxhbmVzW2Nob3NlbkluZGV4XVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZUhvcml6b250YWxTdGFydChzaGlwKSB7XG4gICAgICAgIGNvbnN0IHJvdyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKSArIDFcbiAgICAgICAgY29uc3QgY29sdW1uID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKDEwIC0gc2hpcC5sZW5ndGgpKSArIDFcbiAgICAgICAgY29uc3Qgc3RhcnRpbmdDb29yZCA9IFtyb3csIGNvbHVtbl07XG4gICAgICAgIHJldHVybiBzdGFydGluZ0Nvb3JkXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlVmVydGljYWxTdGFydChzaGlwKSB7XG4gICAgICAgIGNvbnN0IHJvdyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICgxMCAtIHNoaXAubGVuZ3RoKSkgKyAxXG4gICAgICAgIGNvbnN0IGNvbHVtbiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKSArIDFcbiAgICAgICAgY29uc3Qgc3RhcnRpbmdDb29yZCA9IFtyb3csIGNvbHVtbl07XG4gICAgICAgIHJldHVybiBzdGFydGluZ0Nvb3JkXG4gICAgfVxuXG4gICAgcmV0dXJuIHtjcmVhdGVTaGlwQ29vcmRzLCB0ZXN0SG9yaXpvbnRhbFNoaXAsIHRlc3RWZXJ0aWNhbFNoaXAsXG4gICAgICAgIGNob29zZVBsYW5lLCBjcmVhdGVIb3Jpem9udGFsU3RhcnQsIGNyZWF0ZVZlcnRpY2FsU3RhcnR9XG59XG5cblxuZnVuY3Rpb24gY2hlY2tGb3JSZXBlYXQoY29vcmRzLCBhcnJheSkge1xuICAgIGNvbnN0IHN0cmluZ2VkQ29vcmRzID0gSlNPTi5zdHJpbmdpZnkoY29vcmRzKTtcbiAgICBjb25zdCBleGlzdHNCb29sZWFuID0gYXJyYXkuc29tZSgoY29vcmQpID0+IEpTT04uc3RyaW5naWZ5KGNvb3JkKSA9PT0gc3RyaW5nZWRDb29yZHMpXG4gICAgY29uc29sZS5sb2coZXhpc3RzQm9vbGVhbilcbiAgICByZXR1cm4gZXhpc3RzQm9vbGVhblxufVxuXG5mdW5jdGlvbiBzd2l0Y2hQbGFuZShjdXJyZW50UGxhbmUpIHtcbiAgICBpZiAoY3VycmVudFBsYW5lID09PSAnaG9yaXpvbnRhbCcpIHtcbiAgICAgICAgY3VycmVudFBsYW5lID0gJ3ZlcnRpY2FsJ1xuICAgIH0gZWxzZSBpZiAoY3VycmVudFBsYW5lID09PSAndmVydGljYWwnKSB7XG4gICAgICAgIGN1cnJlbnRQbGFuZSA9ICdob3Jpem9udGFsJ1xuICAgIH1cbiAgICByZXR1cm4gY3VycmVudFBsYW5lXG59OyIsIi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9wcmVmZXItZGVmYXVsdC1leHBvcnQgKi9cbmltcG9ydCBoaXRJY29uIGZyb20gXCIuL2ljb25zL2hpdC5wbmdcIjtcbmltcG9ydCBtaXNzSWNvbiBmcm9tIFwiLi9pY29ucy9taXNzLnBuZ1wiO1xuXG5pbXBvcnQgeyBjb21wdXRlclBsYXllciB9IGZyb20gXCIuL3BsYXllclwiO1xuaW1wb3J0IHsgcmVzZXRJbnRlcmZhY2UgfSBmcm9tIFwiLi9nYW1lTG9vcFwiO1xuXG5cbmV4cG9ydCBjb25zdCBkb21NYW5pcHVsYXRpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgY29tcHV0ZXJNb3ZlcyA9IGNvbXB1dGVyUGxheWVyKClcblxuICAgIGNvbnN0IHBsYXllckJvYXJkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nYW1lYm9hcmRzJyk7XG4gICAgY29uc3QgZGlhbG9ndWVDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGlhbG9ndWUtY29udGFpbmVyJylcblxuICAgIGZ1bmN0aW9uIHJlbmRlclN0YXJ0KCkge1xuICAgICAgICBjb25zdCBzdGFydEdhbWVCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgYXBwZW5kRWxlbWVudChzdGFydEdhbWVCdXR0b24sICdzdGFydC1nYW1lLWJ1dHRvbicsIHBsYXllckJvYXJkcyk7XG4gICAgICAgIHN0YXJ0R2FtZUJ1dHRvbi50ZXh0Q29udGVudCA9ICdTdGFydCBGaXJpbmchJ1xuICAgICAgICBzdGFydEdhbWVCdXR0b24uc3R5bGUuZGlzcGxheSA9ICdub25lJztcblxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlbmRlckdhbWVCb2FyZChib2FyZENvbnRyb2xsZXIsIHBsYXllck5hbWUsIGh1bWFuQm9hcmQpIHtcbiAgICAgICAgbGV0IGlzQ29tcHV0ZXIgPSBmYWxzZTtcbiAgICAgICAgaWYgKHBsYXllck5hbWUgPT09ICdFbmVteScpIHtcbiAgICAgICAgICAgIGlzQ29tcHV0ZXIgPSB0cnVlXG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2coaXNDb21wdXRlcik7XG5cbiAgICAgICAgY29uc3QgZ2FtZUJvYXJkV3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBhcHBlbmRFbGVtZW50KGdhbWVCb2FyZFdyYXBwZXIsICdib2FyZC13cmFwcGVyJywgcGxheWVyQm9hcmRzKVxuICAgICAgIFxuICAgICAgICBjb25zdCBib2FyZFRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDInKTtcbiAgICAgICAgYXBwZW5kRWxlbWVudChib2FyZFRpdGxlLCAnYm9hcmQtdGl0bGUnLCBnYW1lQm9hcmRXcmFwcGVyKTtcbiAgICAgICAgYm9hcmRUaXRsZS50ZXh0Q29udGVudCA9IHBsYXllck5hbWU7XG5cbiAgICAgICAgLy8gcmVuZGVyIGJvYXJkOlxuICAgICAgICBjb25zdCBnYW1lYm9hcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgYXBwZW5kRWxlbWVudChnYW1lYm9hcmQsICdnYW1lYm9hcmQnLCBnYW1lQm9hcmRXcmFwcGVyKTtcblxuICAgICAgICBidWlsZEdyaWQoZ2FtZWJvYXJkLCBpc0NvbXB1dGVyKTtcbiAgICAgICAgXG4gICAgICAgIGlmIChpc0NvbXB1dGVyID09PSBmYWxzZSkge1xuICAgICAgICAgICAgY29uc3Qgcm90YXRlU2hpcEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICAgICAgYXBwZW5kRWxlbWVudChyb3RhdGVTaGlwQnV0dG9uLCAncm90YXRlLXNoaXAnLCBnYW1lQm9hcmRXcmFwcGVyKTtcbiAgICAgICAgICAgIHJvdGF0ZVNoaXBCdXR0b24udGV4dENvbnRlbnQgPSAnUm90YXRlJzsgICAgICAgIFxuXG4gICAgICAgICAgICBzZXRHcmlkVHJpZ2dlcnMoYm9hcmRDb250cm9sbGVyLCBodW1hbkJvYXJkKTtcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZ2FtZWJvYXJkLnN0eWxlLnBvaW50ZXJFdmVudHMgPSAnbm9uZSdcbiAgICAgICAgfVxuICAgICAgICBcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBidWlsZEdyaWQoZ2FtZWJvYXJkRWxlbWVudCwgaXNDb21wdXRlcikge1xuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IDExOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgYXBwZW5kRWxlbWVudChyb3csICdyb3cnLCBnYW1lYm9hcmRFbGVtZW50KTtcblxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDE7IGogPCAxMTsgaisrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgICAgIGNlbGwuY29vcmRpbmF0ZXMgPSBbaSwgal07XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coY2VsbC5jb29yZGluYXRlcylcbiAgICAgICAgICAgICAgICBpZiAoaXNDb21wdXRlciA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICBhcHBlbmRFbGVtZW50KGNlbGwsICdjZWxsLWMnLCByb3cpO1xuICAgICAgICAgICAgICAgICAgICBjZWxsLnNldEF0dHJpYnV0ZSgnaWQnLCBgJHtpfSAke2p9Y2ApXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICBhcHBlbmRFbGVtZW50KGNlbGwsICdjZWxsJywgcm93KTtcbiAgICAgICAgICAgICAgICAgICBjZWxsLnNldEF0dHJpYnV0ZSgnaWQnLCBgJHtpfSAke2p9aGApIFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2V0R3JpZFRyaWdnZXJzKGNvbXB1dGVyQm9hcmRDb250cm9sbGVyLCBodW1hbkJvYXJkQ29udHJvbGxlcikge1xuICAgICAgICBjb25zdCBjZWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jZWxsLWMnKTtcbiAgICAgICAgY2VsbHMuZm9yRWFjaCgoY2VsbCkgPT4ge1xuICAgICAgICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhjZWxsLmNvb3JkaW5hdGVzKTtcbiAgICAgICAgICAgICAgICBjb21wdXRlckJvYXJkQ29udHJvbGxlci5yZWNpZXZlQXR0YWNrKGNlbGwuY29vcmRpbmF0ZXMpO1xuICAgICAgICAgICAgICAgIGNlbGwuc3R5bGUucG9pbnRlckV2ZW50cyA9ICdub25lJztcblxuICAgICAgICAgICAgICAgIC8vIHRyaWdnZXIgY29tcHV0ZXIncyBhdHRhY2sgaW4gcmVzcG9uc2VcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhodW1hbkJvYXJkQ29udHJvbGxlcik7XG4gICAgICAgICAgICAgICAgY29tcHV0ZXJNb3Zlcy5waWNrUmFuZG9tQ2VsbChodW1hbkJvYXJkQ29udHJvbGxlcik7XG5cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgICAgICAgICBcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1c2VHcmlkU3BvdChjb29yZHMsIHN0YXR1cywgbmFtZSkge1xuICAgICAgICAvLyByZWdpc3RlcnMgdGhhdCB0ZWggZ3JpZCBzcG90IHdhcyB1c2VkLCBhbmQgZGlzcGxheXNcbiAgICAgICAgLy8gZWl0aGVyIGEgaGl0IG9yIG1pc3NcbiAgICAgICAgY29uc3QgYXR0YWNrSWNvbiA9IG5ldyBJbWFnZSgpO1xuICAgICAgICBhdHRhY2tJY29uLmNsYXNzTGlzdC5hZGQoJ2F0dGFjay1pY29uJyk7XG5cbiAgICAgICAgaWYgKG5hbWUgPT09ICdFbmVteScpIHtcbiAgICAgICAgICAgIGNvbnN0IHVzZWRDZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXG4gICAgICAgICAgICAgICAgYCR7Y29vcmRzWzBdfSAke2Nvb3Jkc1sxXX1jYClcblxuICAgICAgICAgICAgdXNlZENlbGwuYXBwZW5kQ2hpbGQoYXR0YWNrSWNvbik7XG4gICAgICAgICAgICBpZiAoc3RhdHVzID09PSAnaGl0Jykge1xuICAgICAgICAgICAgICAgIGF0dGFja0ljb24uc3JjID0gaGl0SWNvblxuICAgICAgICAgICAgfSBlbHNlIGlmIChzdGF0dXMgPT09ICdtaXNzJykge1xuICAgICAgICAgICAgICAgIGF0dGFja0ljb24uc3JjID0gbWlzc0ljb25cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgdXNlZENlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcbiAgICAgICAgICAgICAgICBgJHtjb29yZHNbMF19ICR7Y29vcmRzWzFdfWhgKVxuICAgICAgICAgICAgXG4gICAgICAgICAgICB1c2VkQ2VsbC5hcHBlbmRDaGlsZChhdHRhY2tJY29uKTtcbiAgICAgICAgICAgIGlmIChzdGF0dXMgPT09ICdoaXQnKSB7XG4gICAgICAgICAgICAgICAgYXR0YWNrSWNvbi5zcmMgPSBoaXRJY29uXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHN0YXR1cyA9PT0gJ21pc3MnKSB7XG4gICAgICAgICAgICAgICAgYXR0YWNrSWNvbi5zcmMgPSBtaXNzSWNvblxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZnJlZXplR3JpZCgpIHtcbiAgICAgICAgY29uc3QgZ2FtZWJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdhbWVib2FyZCcpO1xuICAgICAgICBnYW1lYm9hcmQuc3R5bGUucG9pbnRlckV2ZW50cyA9ICdub25lJztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZW5kZXJEaWFsb2d1ZUJveCgpIHtcbiAgICAgICAgY29uc3QgZGlhbG9ndWVCb3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgYXBwZW5kRWxlbWVudChkaWFsb2d1ZUJveCwgJ2RpYWxvZ3VlLWJveCcsIGRpYWxvZ3VlQ29udGFpbmVyKVxuXG4gICAgICAgIGNvbnN0IHRleHRCb3gxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgICAgYXBwZW5kRWxlbWVudCh0ZXh0Qm94MSwgJ3RleHQtYm94MScsIGRpYWxvZ3VlQm94KVxuXG4gICAgICAgIGNvbnN0IHRleHRCb3gyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgICAgYXBwZW5kRWxlbWVudCh0ZXh0Qm94MiwgJ3RleHQtYm94MicsIGRpYWxvZ3VlQm94KVxuXG4gICAgICAgIGNvbnN0IHRleHRCb3gzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGFwcGVuZEVsZW1lbnQodGV4dEJveDMsICd0ZXh0LWJveDMnLCBkaWFsb2d1ZUJveClcbiAgICB9XG5cblxuICAgIGZ1bmN0aW9uIHJlbmRlckVuZEdhbWUoKSB7XG5cbiAgICAgICAgY29uc3QgcmVzZXRHYW1lQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgIGFwcGVuZEVsZW1lbnQocmVzZXRHYW1lQnV0dG9uLCAncmVzZXQtZ2FtZS1idXR0b24nLCBwbGF5ZXJCb2FyZHMpO1xuICAgICAgICByZXNldEdhbWVCdXR0b24udGV4dENvbnRlbnQgPSAnUGxheSBBZ2Fpbj8nXG5cbiAgICAgICAgcmVzZXRHYW1lQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgcmVzZXRJbnRlcmZhY2UocmVzZXRHYW1lQnV0dG9uKTtcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhcHBlbmRFbGVtZW50KGVsZW1lbnROYW1lLCBjbGFzc05hbWUsIGZhdGhlckVsZW1lbnQgKSB7XG4gICAgICAgIGVsZW1lbnROYW1lLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcbiAgICAgICAgZmF0aGVyRWxlbWVudC5hcHBlbmRDaGlsZChlbGVtZW50TmFtZSk7XG5cbiAgICAgICAgcmV0dXJuIGVsZW1lbnROYW1lO1xuICAgIH1cblxuICAgIHJldHVybiB7cmVuZGVyU3RhcnQsIHJlbmRlckdhbWVCb2FyZCwgYXBwZW5kRWxlbWVudCwgYnVpbGRHcmlkLFxuICAgICAgICBzZXRHcmlkVHJpZ2dlcnMsIHVzZUdyaWRTcG90LCBmcmVlemVHcmlkLCByZW5kZXJEaWFsb2d1ZUJveCxcbiAgICAgICAgcmVuZGVyRW5kR2FtZX1cblxufVxuXG5cblxuXG5leHBvcnQgY29uc3QgZGlhbG9ndWVDb250cm9sbGVyID0gZnVuY3Rpb24oKSB7XG5cbiAgICBmdW5jdGlvbiAgcGxhY2VTaGlwc01lc3NhZ2UoKSB7XG4gICAgICAgIGNvbnN0IHRleHRCb3gxID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRleHQtYm94MScpO1xuICAgICAgICB0ZXh0Qm94MS50ZXh0Q29udGVudCA9ICdQbGFjZSB5b3VyIHNoaXBzIG9uIHRoZSBib2FyZCB0byB0aGUgcmlnaHQgdG8gYmVnaW4hJ1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGJlZ2luQXR0YWNrTWVzc2FnZSgpIHtcbiAgICAgICAgY29uc3QgdGV4dEJveDEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGV4dC1ib3gxJyk7XG4gICAgICAgIHRleHRCb3gxLnRleHRDb250ZW50ID0gJ1JlYWR5IHRvIEF0dGFjayEhJ1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1vdmVSZXN1bHQoc3RhdHVzLCBwbGF5ZXJOYW1lLCBjb29yZHMsIHNoaXAgPSBudWxsKSB7XG4gICAgICAgIGNvbnN0IHRleHRCb3gxID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRleHQtYm94MScpO1xuICAgICAgICBjb25zdCB0ZXh0Qm94MiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50ZXh0LWJveDInKTtcblxuICAgICAgICBpZiAocGxheWVyTmFtZSAhPT0gJ0VuZW15Jykge1xuICAgICAgICAgICAgaWYgKHN0YXR1cyA9PT0gJ2hpdCcpIHtcbiAgICAgICAgICAgICAgICB0ZXh0Qm94Mi50ZXh0Q29udGVudCA9IGBUaGUgZW5lbXkgaGFzIGhpdCB5b3VyICR7c2hpcC5uYW1lfVxuICAgICAgICAgICAgICAgIGF0IHJvdzogJHtjb29yZHNbMF19IGNvbHVtbjogJHtjb29yZHNbMV19IWBcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc3RhdHVzID09PSAnbWlzcycpIHtcbiAgICAgICAgICAgICAgICB0ZXh0Qm94Mi50ZXh0Q29udGVudCA9IGBUaGUgZW5lbXkgYXR0YWNrZWQgcm93OlxuICAgICAgICAgICAgICAgICR7Y29vcmRzWzBdfSBjb2x1bW46ICR7Y29vcmRzWzFdfSBhbmQgbWlzc2VkIWBcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9IGVsc2UgaWYgKHBsYXllck5hbWUgPT09ICdFbmVteScpIHtcbiAgICAgICAgICAgIGlmIChzdGF0dXMgPT09ICdoaXQnKSB7XG4gICAgICAgICAgICAgICAgdGV4dEJveDEudGV4dENvbnRlbnQgPSBgWW91IGhpdCB0aGUgZW5lbXkncyAke3NoaXAubmFtZX1cbiAgICAgICAgICAgICAgICBhdCByb3c6ICR7Y29vcmRzWzBdfSBjb2x1bW46ICR7Y29vcmRzWzFdfSFgXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHN0YXR1cyA9PT0gJ21pc3MnKSB7XG4gICAgICAgICAgICAgICAgdGV4dEJveDEudGV4dENvbnRlbnQgPSBgWW91IGF0dGFja2VkIHJvdzpcbiAgICAgICAgICAgICAgICAke2Nvb3Jkc1swXX0gY29sdW1uOiAke2Nvb3Jkc1sxXX0gYW5kIG1pc3NlZCFgXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzdW5rU2hpcE1lc3NhZ2Uoc2hpcCwgbmFtZSkge1xuICAgICAgICBjb25zdCB0ZXh0Qm94MSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50ZXh0LWJveDEnKTtcbiAgICAgICAgY29uc3QgdGV4dEJveDIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGV4dC1ib3gyJyk7XG4gICAgICAgIGNvbnNvbGUubG9nKHNoaXAsIG5hbWUpXG4gICAgICAgIGlmIChuYW1lICE9PSAnRW5lbXknKSB7XG4gICAgICAgICAgICB0ZXh0Qm94Mi50ZXh0Q29udGVudCA9IGBZb3VyICR7c2hpcC5uYW1lfSBoYXMgYmVlbiBzdW5rISFgXG4gICAgICAgIH0gZWxzZSBpZiAobmFtZSA9PT0gJ0VuZW15Jykge1xuICAgICAgICAgICAgdGV4dEJveDEudGV4dENvbnRlbnQgPSBgWW91IHN1bmsgdGhlIGVuZW15J3MgJHtzaGlwLm5hbWV9ISFgXG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGVuZEdhbWVNZXNzYWdlKG5hbWUpIHtcbiAgICAgICAgY29uc3QgdGV4dEJveDMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGV4dC1ib3gzJylcbiAgICAgICAgaWYgKG5hbWUgPT09ICdFbmVteScpIHtcbiAgICAgICAgICAgIHRleHRCb3gzLnRleHRDb250ZW50ID0gJ1RoZSBlbmVteSBmbGVldCBoYXMgYmVlbiBzYW5rLiBFeGNlbGxlbnQgd29yayBTb2xkaWVyISdcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRleHRCb3gzLnRleHRDb250ZW50ID0gJ1dlIGhhdmUgbG9zdCBvdXIgZmxlZXQgYW5kIGJlZW4gZGVmZWF0ZWQuIEFib3J0IHRoZSBtaXNzaW9uISdcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgcmV0dXJuIHtwbGFjZVNoaXBzTWVzc2FnZSwgYmVnaW5BdHRhY2tNZXNzYWdlLCBtb3ZlUmVzdWx0LCBcbiAgICAgICAgc3Vua1NoaXBNZXNzYWdlLCBlbmRHYW1lTWVzc2FnZX1cbn0iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzBfX18gPSBuZXcgVVJMKFwiLi9hc3NldHMvYmFja2dyb3VuZC5qcGdcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgYGh0bWwsIGJvZHkge1xuICAgIG1pbi1oZWlnaHQ6IDEwMCU7XG4gICAgbWluLXdpZHRoOiAxMDAlO1xuICAgIG1hcmdpbjogMHB4O1xufVxuXG5ib2R5IHtcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJHtfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19ffSk7XG4gICAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG59XG5cbi5wcm9tcHQtYm94IHtcbiAgICBkaXNwbGF5OiBub25lXG59XG5cbi5nYW1lLWNvbnRhaW5lciB7XG4gICAgZGlzcGxheTogZ3JpZDtcbiAgICBncmlkLXRlbXBsYXRlLXJvd3M6IDFmciA0ZnIgMS43ZnI7XG4gICAgaGVpZ2h0OiAxMDB2aDtcbiAgICB3aWR0aDogMTAwdnc7XG4gICAgLyogYmFja2dyb3VuZC1jb2xvcjogcmdiKDU5LCA1OSwgNTkpOyAqL1xufVxuXG4uaGVhZGVyIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgZ3JpZC1yb3c6IDEgLyAyO1xuICAgIFxufVxuXG4uZ2FtZS10aXRsZSB7XG4gICAgZm9udC1zaXplOiA2N3B4O1xuICAgIG1hcmdpbi10b3A6IDE1cHg7XG4gICAgbWFyZ2luLWJvdHRvbTogMTdweDtcbiAgICBjb2xvcjogcmdiYSg1OCwgNCwgNTgsIDAuNyk7XG4gICAgdGV4dC1zaGFkb3c6IDBweCAwcHggNDBweCByZ2IoMTI3LCAxMjIsIDEyMik7XG59XG5cbi5nYW1lYm9hcmRzIHtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcbiAgICBncmlkLXJvdzogMiAvIDM7XG4gICAgLyogYmFja2dyb3VuZC1jb2xvcjogcmdiKDExNCwgMTU1LCAxNTUpOyAqL1xuICAgIC8qIGJhY2tncm91bmQtY29sb3I6IHJnYig1OSwgNTksIDU5KTsgKi9cbn1cblxuLmRpYWxvZ3VlLWNvbnRhaW5lciB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIGdyaWQtcm93OiAzIC8gNDtcbn1cblxuLmRpYWxvZ3VlLWJveCB7XG4gICAgbWFyZ2luLXRvcDogOHB4O1xuICAgIGhlaWdodDogMjB2aDtcbiAgICB3aWR0aDogNTB2dztcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoNzcsIDEzNCwgNzcpO1xufVxuXG5cbi8qIGdhbWVib2FyZCB3cmFwcGVyIHN0eWxpbmcgKi9cbi5ib2FyZC13cmFwcGVyIHtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgaGVpZ2h0OiAxMDAlO1xuICAgIHdpZHRoOiA0MDBweDtcbiAgICBiYWNrZ3JvdW5kOiByZ2IoMTI4LCAwLCAxMjgsIDAuNCk7XG4gICAgYm9yZGVyOiA1cHggc29saWQgcmdiKDEyOCwgMCwgMTI4KTtcbiAgICBwYWRkaW5nOiAwIDE1cHg7XG4gICAgcGFkZGluZy1ib3R0b206IDdweDtcbiAgICBib3JkZXItcmFkaXVzOiAyNXB4O1xufVxuXG4uYm9hcmQtdGl0bGUge1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICBmb250LXNpemU6IDI3cHg7XG59XG5cbi5nYW1lYm9hcmQge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICBoZWlnaHQ6IDQwMHB4O1xuICAgIHdpZHRoOiA0MDBweDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBibHVldmlvbGV0O1xufVxuXG4ucm93IHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGhlaWdodDogMTAlO1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIC8qIGJhY2tncm91bmQtY29sb3I6IHBpbms7ICovXG59XG5cbi5jZWxsIHtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBtYXJnaW46IDBweDtcbiAgICBhc3BlY3QtcmF0aW86IDE7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDIyMSwgMjQxLCAyNDEsIDAuNSk7XG4gICAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XG59XG5cbi5jZWxsLWMge1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIG1hcmdpbjogMHB4O1xuICAgIGFzcGVjdC1yYXRpbzogMTtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjIxLCAyNDEsIDI0MSwgMC41KTtcbiAgICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcbn1cblxuLmNlbGwtYzpob3ZlciB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDExNywgMTU2LCAyMTEpO1xufVxuXG4vKiBpY29ucyAqL1xuLmF0dGFjay1pY29uIHtcbiAgICBvYmplY3QtZml0OiBjb3ZlcjtcbiAgICBoZWlnaHQ6IDEwMCU7XG59XG5cblxuLyogc3R5bGluZyBmb3IgZGlhbG9ndWUgYm94ICovXG4uZGlhbG9ndWUtY29udGFpbmVyIHtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIGdyaWQtcm93OiAzIC8gNDtcbn1cblxuLmRpYWxvZ3VlLWJveCB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtZXZlbmx5O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgaGVpZ2h0OiAxOHZoO1xuICAgIHdpZHRoOiA0NXZ3O1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYig3MiwgNjEsIDEzOSwgMC44KTtcbiAgICBib3JkZXI6IDVweCBzb2xpZCByZ2IoOTEsIDIyLCA5MSwgMSk7XG4gICAgYm9yZGVyLXJhZGl1czogMjVweDtcbiAgICBtYXJnaW4tdG9wOiAyMHB4O1xufVxuXG4udGV4dC1ib3gxLCAudGV4dC1ib3gyLCAudGV4dC1ib3gzIHtcbiAgICBjb2xvcjogcmdiKDE4MywgMTgzLCAxODMpO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBoZWlnaHQ6IDV2aDtcbiAgICB3aWR0aDogNTB2dztcbiAgICBmb250LXNpemU6IDI1cHg7XG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG59XG5cblxuLnJlc2V0LWdhbWUtYnV0dG9uIHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgdG9wOiAyNDVweDtcbiAgICBsZWZ0OiAwO1xuICAgIHJpZ2h0OiAwO1xuICAgIG1hcmdpbi1sZWZ0OiBhdXRvO1xuICAgIG1hcmdpbi1yaWdodDogYXV0bztcbiAgICBoZWlnaHQ6IDkwcHg7XG4gICAgd2lkdGg6IDEyNXB4O1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYig3MiwgNjEsIDEzOSk7XG4gICAgYm9yZGVyOiA0cHggc29saWQgcmdiKDc0LCAzOCwgMjU0KTtcbiAgICBib3JkZXItcmFkaXVzOiAxNXB4O1xuICAgIGZvbnQtc2l6ZTogMzBweDtcbiAgICBjb2xvcjogcmdiKDIyMiwgMjI0LCAyMjUpO1xufVxuXG4vKiBzaWduYXR1cmUgKi9cbi5zaWduYXR1cmUge1xuICAgIGNvbG9yOiB3aGl0ZTtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgYm90dG9tOiAyNXB4O1xuICAgIHJpZ2h0OiAyMHB4O1xuXG59XG5cbmEge1xuICAgIGNvbG9yOiBwdXJwbGU7XG4gICAgdGV4dC1zaGFkb3c6IDBweCAwcHggMTBweCBibGFjaztcbn1cblxuXG4vKiBzdHlsaW5nIGZvciBzaGlwIFBsYWNlbWVudCAqL1xuLnZhbGlkLXBsYWNlbWVudCB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDExMCwgMTg5LCAxMTAsIDEpO1xufVxuXG4uaW52YWxpZC1wbGFjZW1lbnQge1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYigyNDksIDExNiwgMTE2LCAxKTtcbn1cblxuLnBsYWNlZCB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDIxNCwgMTAwLCAxNjYpO1xufVxuXG4ucm90YXRlLXNoaXAge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB0b3A6IDE1cHg7XG4gICAgcmlnaHQ6IDIwcHg7XG4gICAgaGVpZ2h0OiAyNXB4O1xuICAgIHdpZHRoOiA2MHB4O1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYigyMjEsIDI0MSwgMjQxLCAxKTtcbiAgICBvcGFjaXR5OiAxO1xuICAgIGJvcmRlci1yYWRpdXM6IDIwcHg7XG4gICAgYm9yZGVyOiBub25lO1xufVxuXG4uc3RhcnQtZ2FtZS1idXR0b24ge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB0b3A6IDM1MHB4O1xuICAgIGxlZnQ6IDA7XG4gICAgcmlnaHQ6IDA7XG4gICAgbWFyZ2luLWxlZnQ6IGF1dG87XG4gICAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xuICAgIGhlaWdodDogMTEwcHg7XG4gICAgd2lkdGg6IDE0MHB4O1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYig3MiwgNjEsIDEzOSk7XG4gICAgYm9yZGVyOiA0cHggc29saWQgcHVycGxlO1xuICAgIGJvcmRlci1yYWRpdXM6IDE1cHg7XG4gICAgZm9udC1zaXplOiAzMHB4O1xuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuICAgIGNvbG9yOiByZ2IoMjIyLCAyMjQsIDIyNSk7XG59YCwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvcGFnZVN0eWxpbmcuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0lBQ0ksZ0JBQWdCO0lBQ2hCLGVBQWU7SUFDZixXQUFXO0FBQ2Y7O0FBRUE7SUFDSSx5REFBZ0Q7SUFDaEQsc0JBQXNCO0lBQ3RCLGtCQUFrQjtBQUN0Qjs7QUFFQTtJQUNJO0FBQ0o7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsaUNBQWlDO0lBQ2pDLGFBQWE7SUFDYixZQUFZO0lBQ1osdUNBQXVDO0FBQzNDOztBQUVBO0lBQ0ksYUFBYTtJQUNiLHVCQUF1QjtJQUN2QixtQkFBbUI7SUFDbkIsZUFBZTs7QUFFbkI7O0FBRUE7SUFDSSxlQUFlO0lBQ2YsZ0JBQWdCO0lBQ2hCLG1CQUFtQjtJQUNuQiwyQkFBMkI7SUFDM0IsNENBQTRDO0FBQ2hEOztBQUVBO0lBQ0ksa0JBQWtCO0lBQ2xCLGFBQWE7SUFDYiw2QkFBNkI7SUFDN0IsZUFBZTtJQUNmLDBDQUEwQztJQUMxQyx1Q0FBdUM7QUFDM0M7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsdUJBQXVCO0lBQ3ZCLG1CQUFtQjtJQUNuQixlQUFlO0FBQ25COztBQUVBO0lBQ0ksZUFBZTtJQUNmLFlBQVk7SUFDWixXQUFXO0lBQ1gsa0NBQWtDO0FBQ3RDOzs7QUFHQSw4QkFBOEI7QUFDOUI7SUFDSSxrQkFBa0I7SUFDbEIsWUFBWTtJQUNaLFlBQVk7SUFDWixpQ0FBaUM7SUFDakMsa0NBQWtDO0lBQ2xDLGVBQWU7SUFDZixtQkFBbUI7SUFDbkIsbUJBQW1CO0FBQ3ZCOztBQUVBO0lBQ0ksa0JBQWtCO0lBQ2xCLGVBQWU7QUFDbkI7O0FBRUE7SUFDSSxhQUFhO0lBQ2Isc0JBQXNCO0lBQ3RCLGFBQWE7SUFDYixZQUFZO0lBQ1osNEJBQTRCO0FBQ2hDOztBQUVBO0lBQ0ksYUFBYTtJQUNiLFdBQVc7SUFDWCxXQUFXO0lBQ1gsNEJBQTRCO0FBQ2hDOztBQUVBO0lBQ0ksV0FBVztJQUNYLFdBQVc7SUFDWCxlQUFlO0lBQ2YseUNBQXlDO0lBQ3pDLHVCQUF1QjtBQUMzQjs7QUFFQTtJQUNJLFdBQVc7SUFDWCxXQUFXO0lBQ1gsZUFBZTtJQUNmLHlDQUF5QztJQUN6Qyx1QkFBdUI7QUFDM0I7O0FBRUE7SUFDSSxvQ0FBb0M7QUFDeEM7O0FBRUEsVUFBVTtBQUNWO0lBQ0ksaUJBQWlCO0lBQ2pCLFlBQVk7QUFDaEI7OztBQUdBLDZCQUE2QjtBQUM3QjtJQUNJLGtCQUFrQjtJQUNsQixhQUFhO0lBQ2IsdUJBQXVCO0lBQ3ZCLG1CQUFtQjtJQUNuQixlQUFlO0FBQ25COztBQUVBO0lBQ0ksYUFBYTtJQUNiLHNCQUFzQjtJQUN0Qiw2QkFBNkI7SUFDN0IsbUJBQW1CO0lBQ25CLFlBQVk7SUFDWixXQUFXO0lBQ1gsdUNBQXVDO0lBQ3ZDLG9DQUFvQztJQUNwQyxtQkFBbUI7SUFDbkIsZ0JBQWdCO0FBQ3BCOztBQUVBO0lBQ0kseUJBQXlCO0lBQ3pCLGFBQWE7SUFDYix1QkFBdUI7SUFDdkIsbUJBQW1CO0lBQ25CLFdBQVc7SUFDWCxXQUFXO0lBQ1gsZUFBZTtJQUNmLGlCQUFpQjtBQUNyQjs7O0FBR0E7SUFDSSxrQkFBa0I7SUFDbEIsVUFBVTtJQUNWLE9BQU87SUFDUCxRQUFRO0lBQ1IsaUJBQWlCO0lBQ2pCLGtCQUFrQjtJQUNsQixZQUFZO0lBQ1osWUFBWTtJQUNaLGtDQUFrQztJQUNsQyxrQ0FBa0M7SUFDbEMsbUJBQW1CO0lBQ25CLGVBQWU7SUFDZix5QkFBeUI7QUFDN0I7O0FBRUEsY0FBYztBQUNkO0lBQ0ksWUFBWTtJQUNaLGtCQUFrQjtJQUNsQixZQUFZO0lBQ1osV0FBVzs7QUFFZjs7QUFFQTtJQUNJLGFBQWE7SUFDYiwrQkFBK0I7QUFDbkM7OztBQUdBLCtCQUErQjtBQUMvQjtJQUNJLHVDQUF1QztBQUMzQzs7QUFFQTtJQUNJLHVDQUF1QztBQUMzQzs7QUFFQTtJQUNJLG9DQUFvQztBQUN4Qzs7QUFFQTtJQUNJLGtCQUFrQjtJQUNsQixTQUFTO0lBQ1QsV0FBVztJQUNYLFlBQVk7SUFDWixXQUFXO0lBQ1gsdUNBQXVDO0lBQ3ZDLFVBQVU7SUFDVixtQkFBbUI7SUFDbkIsWUFBWTtBQUNoQjs7QUFFQTtJQUNJLGtCQUFrQjtJQUNsQixVQUFVO0lBQ1YsT0FBTztJQUNQLFFBQVE7SUFDUixpQkFBaUI7SUFDakIsa0JBQWtCO0lBQ2xCLGFBQWE7SUFDYixZQUFZO0lBQ1osa0NBQWtDO0lBQ2xDLHdCQUF3QjtJQUN4QixtQkFBbUI7SUFDbkIsZUFBZTtJQUNmLGlCQUFpQjtJQUNqQix5QkFBeUI7QUFDN0JcIixcInNvdXJjZXNDb250ZW50XCI6W1wiaHRtbCwgYm9keSB7XFxuICAgIG1pbi1oZWlnaHQ6IDEwMCU7XFxuICAgIG1pbi13aWR0aDogMTAwJTtcXG4gICAgbWFyZ2luOiAwcHg7XFxufVxcblxcbmJvZHkge1xcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXFxcIi4vYXNzZXRzL2JhY2tncm91bmQuanBnXFxcIik7XFxuICAgIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG59XFxuXFxuLnByb21wdC1ib3gge1xcbiAgICBkaXNwbGF5OiBub25lXFxufVxcblxcbi5nYW1lLWNvbnRhaW5lciB7XFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxuICAgIGdyaWQtdGVtcGxhdGUtcm93czogMWZyIDRmciAxLjdmcjtcXG4gICAgaGVpZ2h0OiAxMDB2aDtcXG4gICAgd2lkdGg6IDEwMHZ3O1xcbiAgICAvKiBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoNTksIDU5LCA1OSk7ICovXFxufVxcblxcbi5oZWFkZXIge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgZ3JpZC1yb3c6IDEgLyAyO1xcbiAgICBcXG59XFxuXFxuLmdhbWUtdGl0bGUge1xcbiAgICBmb250LXNpemU6IDY3cHg7XFxuICAgIG1hcmdpbi10b3A6IDE1cHg7XFxuICAgIG1hcmdpbi1ib3R0b206IDE3cHg7XFxuICAgIGNvbG9yOiByZ2JhKDU4LCA0LCA1OCwgMC43KTtcXG4gICAgdGV4dC1zaGFkb3c6IDBweCAwcHggNDBweCByZ2IoMTI3LCAxMjIsIDEyMik7XFxufVxcblxcbi5nYW1lYm9hcmRzIHtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcXG4gICAgZ3JpZC1yb3c6IDIgLyAzO1xcbiAgICAvKiBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTE0LCAxNTUsIDE1NSk7ICovXFxuICAgIC8qIGJhY2tncm91bmQtY29sb3I6IHJnYig1OSwgNTksIDU5KTsgKi9cXG59XFxuXFxuLmRpYWxvZ3VlLWNvbnRhaW5lciB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBncmlkLXJvdzogMyAvIDQ7XFxufVxcblxcbi5kaWFsb2d1ZS1ib3gge1xcbiAgICBtYXJnaW4tdG9wOiA4cHg7XFxuICAgIGhlaWdodDogMjB2aDtcXG4gICAgd2lkdGg6IDUwdnc7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYig3NywgMTM0LCA3Nyk7XFxufVxcblxcblxcbi8qIGdhbWVib2FyZCB3cmFwcGVyIHN0eWxpbmcgKi9cXG4uYm9hcmQtd3JhcHBlciB7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbiAgICB3aWR0aDogNDAwcHg7XFxuICAgIGJhY2tncm91bmQ6IHJnYigxMjgsIDAsIDEyOCwgMC40KTtcXG4gICAgYm9yZGVyOiA1cHggc29saWQgcmdiKDEyOCwgMCwgMTI4KTtcXG4gICAgcGFkZGluZzogMCAxNXB4O1xcbiAgICBwYWRkaW5nLWJvdHRvbTogN3B4O1xcbiAgICBib3JkZXItcmFkaXVzOiAyNXB4O1xcbn1cXG5cXG4uYm9hcmQtdGl0bGUge1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgIGZvbnQtc2l6ZTogMjdweDtcXG59XFxuXFxuLmdhbWVib2FyZCB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIGhlaWdodDogNDAwcHg7XFxuICAgIHdpZHRoOiA0MDBweDtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogYmx1ZXZpb2xldDtcXG59XFxuXFxuLnJvdyB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGhlaWdodDogMTAlO1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgLyogYmFja2dyb3VuZC1jb2xvcjogcGluazsgKi9cXG59XFxuXFxuLmNlbGwge1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgbWFyZ2luOiAwcHg7XFxuICAgIGFzcGVjdC1yYXRpbzogMTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDIyMSwgMjQxLCAyNDEsIDAuNSk7XFxuICAgIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xcbn1cXG5cXG4uY2VsbC1jIHtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIG1hcmdpbjogMHB4O1xcbiAgICBhc3BlY3QtcmF0aW86IDE7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYigyMjEsIDI0MSwgMjQxLCAwLjUpO1xcbiAgICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcXG59XFxuXFxuLmNlbGwtYzpob3ZlciB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYigxMTcsIDE1NiwgMjExKTtcXG59XFxuXFxuLyogaWNvbnMgKi9cXG4uYXR0YWNrLWljb24ge1xcbiAgICBvYmplY3QtZml0OiBjb3ZlcjtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbn1cXG5cXG5cXG4vKiBzdHlsaW5nIGZvciBkaWFsb2d1ZSBib3ggKi9cXG4uZGlhbG9ndWUtY29udGFpbmVyIHtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgZ3JpZC1yb3c6IDMgLyA0O1xcbn1cXG5cXG4uZGlhbG9ndWUtYm94IHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1ldmVubHk7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGhlaWdodDogMTh2aDtcXG4gICAgd2lkdGg6IDQ1dnc7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYig3MiwgNjEsIDEzOSwgMC44KTtcXG4gICAgYm9yZGVyOiA1cHggc29saWQgcmdiKDkxLCAyMiwgOTEsIDEpO1xcbiAgICBib3JkZXItcmFkaXVzOiAyNXB4O1xcbiAgICBtYXJnaW4tdG9wOiAyMHB4O1xcbn1cXG5cXG4udGV4dC1ib3gxLCAudGV4dC1ib3gyLCAudGV4dC1ib3gzIHtcXG4gICAgY29sb3I6IHJnYigxODMsIDE4MywgMTgzKTtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGhlaWdodDogNXZoO1xcbiAgICB3aWR0aDogNTB2dztcXG4gICAgZm9udC1zaXplOiAyNXB4O1xcbiAgICBmb250LXdlaWdodDogYm9sZDtcXG59XFxuXFxuXFxuLnJlc2V0LWdhbWUtYnV0dG9uIHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB0b3A6IDI0NXB4O1xcbiAgICBsZWZ0OiAwO1xcbiAgICByaWdodDogMDtcXG4gICAgbWFyZ2luLWxlZnQ6IGF1dG87XFxuICAgIG1hcmdpbi1yaWdodDogYXV0bztcXG4gICAgaGVpZ2h0OiA5MHB4O1xcbiAgICB3aWR0aDogMTI1cHg7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYig3MiwgNjEsIDEzOSk7XFxuICAgIGJvcmRlcjogNHB4IHNvbGlkIHJnYig3NCwgMzgsIDI1NCk7XFxuICAgIGJvcmRlci1yYWRpdXM6IDE1cHg7XFxuICAgIGZvbnQtc2l6ZTogMzBweDtcXG4gICAgY29sb3I6IHJnYigyMjIsIDIyNCwgMjI1KTtcXG59XFxuXFxuLyogc2lnbmF0dXJlICovXFxuLnNpZ25hdHVyZSB7XFxuICAgIGNvbG9yOiB3aGl0ZTtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICBib3R0b206IDI1cHg7XFxuICAgIHJpZ2h0OiAyMHB4O1xcblxcbn1cXG5cXG5hIHtcXG4gICAgY29sb3I6IHB1cnBsZTtcXG4gICAgdGV4dC1zaGFkb3c6IDBweCAwcHggMTBweCBibGFjaztcXG59XFxuXFxuXFxuLyogc3R5bGluZyBmb3Igc2hpcCBQbGFjZW1lbnQgKi9cXG4udmFsaWQtcGxhY2VtZW50IHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDExMCwgMTg5LCAxMTAsIDEpO1xcbn1cXG5cXG4uaW52YWxpZC1wbGFjZW1lbnQge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjQ5LCAxMTYsIDExNiwgMSk7XFxufVxcblxcbi5wbGFjZWQge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjE0LCAxMDAsIDE2Nik7XFxufVxcblxcbi5yb3RhdGUtc2hpcCB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdG9wOiAxNXB4O1xcbiAgICByaWdodDogMjBweDtcXG4gICAgaGVpZ2h0OiAyNXB4O1xcbiAgICB3aWR0aDogNjBweDtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDIyMSwgMjQxLCAyNDEsIDEpO1xcbiAgICBvcGFjaXR5OiAxO1xcbiAgICBib3JkZXItcmFkaXVzOiAyMHB4O1xcbiAgICBib3JkZXI6IG5vbmU7XFxufVxcblxcbi5zdGFydC1nYW1lLWJ1dHRvbiB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdG9wOiAzNTBweDtcXG4gICAgbGVmdDogMDtcXG4gICAgcmlnaHQ6IDA7XFxuICAgIG1hcmdpbi1sZWZ0OiBhdXRvO1xcbiAgICBtYXJnaW4tcmlnaHQ6IGF1dG87XFxuICAgIGhlaWdodDogMTEwcHg7XFxuICAgIHdpZHRoOiAxNDBweDtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDcyLCA2MSwgMTM5KTtcXG4gICAgYm9yZGVyOiA0cHggc29saWQgcHVycGxlO1xcbiAgICBib3JkZXItcmFkaXVzOiAxNXB4O1xcbiAgICBmb250LXNpemU6IDMwcHg7XFxuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xcbiAgICBjb2xvcjogcmdiKDIyMiwgMjI0LCAyMjUpO1xcbn1cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107XG5cbiAgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07XG5cbiAgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodXJsLCBvcHRpb25zKSB7XG4gIGlmICghb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSB7fTtcbiAgfVxuICBpZiAoIXVybCkge1xuICAgIHJldHVybiB1cmw7XG4gIH1cbiAgdXJsID0gU3RyaW5nKHVybC5fX2VzTW9kdWxlID8gdXJsLmRlZmF1bHQgOiB1cmwpO1xuXG4gIC8vIElmIHVybCBpcyBhbHJlYWR5IHdyYXBwZWQgaW4gcXVvdGVzLCByZW1vdmUgdGhlbVxuICBpZiAoL15bJ1wiXS4qWydcIl0kLy50ZXN0KHVybCkpIHtcbiAgICB1cmwgPSB1cmwuc2xpY2UoMSwgLTEpO1xuICB9XG4gIGlmIChvcHRpb25zLmhhc2gpIHtcbiAgICB1cmwgKz0gb3B0aW9ucy5oYXNoO1xuICB9XG5cbiAgLy8gU2hvdWxkIHVybCBiZSB3cmFwcGVkP1xuICAvLyBTZWUgaHR0cHM6Ly9kcmFmdHMuY3Nzd2cub3JnL2Nzcy12YWx1ZXMtMy8jdXJsc1xuICBpZiAoL1tcIicoKSBcXHRcXG5dfCglMjApLy50ZXN0KHVybCkgfHwgb3B0aW9ucy5uZWVkUXVvdGVzKSB7XG4gICAgcmV0dXJuIFwiXFxcIlwiLmNvbmNhdCh1cmwucmVwbGFjZSgvXCIvZywgJ1xcXFxcIicpLnJlcGxhY2UoL1xcbi9nLCBcIlxcXFxuXCIpLCBcIlxcXCJcIik7XG4gIH1cbiAgcmV0dXJuIHVybDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vcGFnZVN0eWxpbmcuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9wYWdlU3R5bGluZy5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gdXBkYXRlcjtcbn1cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTtcblxuICAgIC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuICBjc3MgKz0gb2JqLmNzcztcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfVxuXG4gIC8vIEZvciBvbGQgSUVcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHJldHVybiB7XG4gICAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZSgpIHt9LFxuICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7fVxuICAgIH07XG4gIH1cbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJ2YXIgc2NyaXB0VXJsO1xuaWYgKF9fd2VicGFja19yZXF1aXJlX18uZy5pbXBvcnRTY3JpcHRzKSBzY3JpcHRVcmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcubG9jYXRpb24gKyBcIlwiO1xudmFyIGRvY3VtZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmRvY3VtZW50O1xuaWYgKCFzY3JpcHRVcmwgJiYgZG9jdW1lbnQpIHtcblx0aWYgKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQpXG5cdFx0c2NyaXB0VXJsID0gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmM7XG5cdGlmICghc2NyaXB0VXJsKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRpZihzY3JpcHRzLmxlbmd0aCkge1xuXHRcdFx0dmFyIGkgPSBzY3JpcHRzLmxlbmd0aCAtIDE7XG5cdFx0XHR3aGlsZSAoaSA+IC0xICYmICghc2NyaXB0VXJsIHx8ICEvXmh0dHAocz8pOi8udGVzdChzY3JpcHRVcmwpKSkgc2NyaXB0VXJsID0gc2NyaXB0c1tpLS1dLnNyYztcblx0XHR9XG5cdH1cbn1cbi8vIFdoZW4gc3VwcG9ydGluZyBicm93c2VycyB3aGVyZSBhbiBhdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIHlvdSBtdXN0IHNwZWNpZnkgYW4gb3V0cHV0LnB1YmxpY1BhdGggbWFudWFsbHkgdmlhIGNvbmZpZ3VyYXRpb25cbi8vIG9yIHBhc3MgYW4gZW1wdHkgc3RyaW5nIChcIlwiKSBhbmQgc2V0IHRoZSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyB2YXJpYWJsZSBmcm9tIHlvdXIgY29kZSB0byB1c2UgeW91ciBvd24gbG9naWMuXG5pZiAoIXNjcmlwdFVybCkgdGhyb3cgbmV3IEVycm9yKFwiQXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXJcIik7XG5zY3JpcHRVcmwgPSBzY3JpcHRVcmwucmVwbGFjZSgvIy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcPy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcL1teXFwvXSskLywgXCIvXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gc2NyaXB0VXJsOyIsIl9fd2VicGFja19yZXF1aXJlX18uYiA9IGRvY3VtZW50LmJhc2VVUkkgfHwgc2VsZi5sb2NhdGlvbi5ocmVmO1xuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwibWFpblwiOiAwXG59O1xuXG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG4vLyBubyBvbiBjaHVua3MgbG9hZGVkXG5cbi8vIG5vIGpzb25wIGZ1bmN0aW9uIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5uYyA9IHVuZGVmaW5lZDsiLCJpbXBvcnQgJy4vcGFnZVN0eWxpbmcuY3NzJztcbmltcG9ydCB7IGdhbWVCb2FyZENvbnRyb2xsZXIgfSBmcm9tIFwiLi9nYW1lYm9hcmRDb250cm9sbGVyXCI7XG5pbXBvcnQgeyBpbml0aWFsaXplR2FtZSB9IGZyb20gXCIuL2dhbWVMb29wXCI7XG5cblxuXG5pbml0aWFsaXplR2FtZSgpIl0sIm5hbWVzIjpbIlBsYXllciIsImdhbWVCb2FyZENvbnRyb2xsZXIiLCJjcmVhdGVGbGVldCIsImNyZWF0ZU9wcEZsZWV0IiwiZG9tTWFuaXB1bGF0aW9uIiwiZGlhbG9ndWVDb250cm9sbGVyIiwiaHVtYW5TaGlwUGxhY2VtZW50IiwiY29tcHV0ZXJQbGFjZW1lbnQiLCJpbml0aWFsaXplR2FtZSIsImNyZWF0ZUdhbWUiLCJydW5ET00iLCJodW1hblBsYXllciIsImh1bWFuRmxlZXQiLCJjb25zb2xlIiwibG9nIiwiZ2FtZUJvYXJkIiwicGxheWVyIiwiaHVtYW5Cb2FyZCIsImNyZWF0ZUJvYXJkIiwiQUlwbGF5ZXIiLCJjb21wdXRlckZsZWV0IiwiY29tcHV0ZXJCb2FyZCIsInJlbmRlclN0YXJ0IiwicmVuZGVyR2FtZUJvYXJkIiwiY3JlYXREaWFsb2d1ZSIsInJlbmRlckRpYWxvZ3VlQm94IiwiZGlhbG9ndWUiLCJwbGFjZVNoaXBzTWVzc2FnZSIsImNvbXB1dGVyUGxhY2VtZW50cyIsImh1bWFuUGxhY2VtZW50IiwicmVzZXRJbnRlcmZhY2UiLCJyZXNldEJ1dHRvbiIsInBsYXllckJvYXJkcyIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImRpYWxvZ3VlQ29udGFpbmVyIiwiZGlhbG9ndWVCb3giLCJnYW1lQm9hcmRXcmFwcGVycyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJmb3JFYWNoIiwiZWxlbWVudCIsInJlbW92ZUNoaWxkIiwiZGlhbG9ndWVSZWZyZXNoIiwiZmxlZXQiLCJuYW1lIiwicGxheWVyTmFtZSIsImJvYXJkIiwic2hpcHMiLCJpIiwiaiIsInBsYWNlSG9yaXpvbnRhbFNoaXAiLCJyb3ciLCJjb2wiLCJzaGlwIiwibGVuZ3RoIiwibmV3Q29vcmRzIiwiY29vcmRzIiwicHVzaCIsInBsYWNlVmVydGljYWxTaGlwIiwicmVjaWV2ZUF0dGFjayIsImF0dGFja1N0YXR1cyIsImNoZWNrSWZVc2VkIiwiY29vcmQiLCJoaXQiLCJ1cGRhdGVCb2FyZFNwb3QiLCJtb3ZlUmVzdWx0Iiwic3Vua0NoZWNrIiwiY2hlY2tJZlN1bmsiLCJzdW5rU2hpcE1lc3NhZ2UiLCJzcGxpY2UiLCJjaGVja0FsbFN1bmsiLCJlbmRHYW1lTWVzc2FnZSIsImVuZEdhbWUiLCJ1c2VHcmlkU3BvdCIsImZyZWV6ZUdyaWQiLCJyZW5kZXJFbmRHYW1lIiwiY29uc3RydWN0b3IiLCJ1c2VyUGxheWVyIiwiY29tcHV0ZXJQbGF5ZXIiLCJ2aXNpdGVkIiwicGlja1JhbmRvbUNlbGwiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJjb2x1bW4iLCJjb21wQ29vcmRzIiwicmVwZWF0Qm9vbGVhbiIsImNoZWNrUmVwZWF0Q2VsbCIsInN0cmluZ2VkQ29vcmRzIiwiSlNPTiIsInN0cmluZ2lmeSIsImV4aXN0c0Jvb2xlYW4iLCJzb21lIiwiU2hpcCIsImhpdHMiLCJpc1N1bmsiLCJjYXJyaWVyIiwiYmF0dGxlc2hpcCIsImRlc3Ryb3llciIsInN1Ym1hcmluZSIsInBhdHJvbEJvYXQiLCJyb3RhdGVCdXR0b24iLCJzdGFydEJ1dHRvbiIsImRpYWxvZ3VlUnVuIiwib2NjdXBpZWRDZWxscyIsImN1cnJlbnRQbGFuZSIsImNyZWF0ZVJvdGF0aW9uQWJpbGl0eSIsImh1bWFuQ2VsbHMiLCJzaGlwSW5kZXgiLCJjZWxsIiwiYWRkRXZlbnRMaXN0ZW5lciIsImNlbGxIb3ZlciIsImNsYXNzTGlzdCIsImNvbnRhaW5zIiwicGxhY2VIb3Jpem9udGFsbHkiLCJjb29yZGluYXRlcyIsImFjdGl2ZUNlbGxzIiwic3RhcnRCdXR0b25FbWVyZ2UiLCJwbGFjZVZlcnRpY2FsbHkiLCJjZWxsQ29vcmRzIiwiZ3JvdXBlZENlbGxzIiwiY2VsbFJvdyIsImNlbGxDb2x1bW4iLCJhY3RpdmVDZWxsIiwiZ2V0RWxlbWVudEJ5SWQiLCJjb25mbGljdGluZyIsImNoZWNrQ29uZmxpY3RpbmdTaGlwcyIsImVsZW0iLCJhZGQiLCJyZW1vdmUiLCJhbHJlYWR5VXNlZCIsImNoZWNrRm9yUmVwZWF0IiwibmV3UGxhbmUiLCJzd2l0Y2hQbGFuZSIsInN0eWxlIiwiZGlzcGxheSIsImJlZ2luQXR0YWNrTWVzc2FnZSIsInBvaW50ZXJFdmVudHMiLCJwbGFuZXMiLCJ1c2VkQ2VsbHMiLCJjcmVhdGVTaGlwQ29vcmRzIiwiY2hvc2VuUGxhbmUiLCJjaG9vc2VQbGFuZSIsInRlc3RIb3Jpem9udGFsU2hpcCIsInRlc3RWZXJ0aWNhbFNoaXAiLCJzdGFydGluZ0Nvb3JkcyIsImNyZWF0ZUhvcml6b250YWxTdGFydCIsImZpcnN0UmVwZWF0IiwicmVwZWF0RGV0ZWN0IiwicmVwZWF0IiwiY3JlYXRlVmVydGljYWxTdGFydCIsImNob3NlbkluZGV4Iiwic3RhcnRpbmdDb29yZCIsImFycmF5IiwiaGl0SWNvbiIsIm1pc3NJY29uIiwiY29tcHV0ZXJNb3ZlcyIsInN0YXJ0R2FtZUJ1dHRvbiIsImNyZWF0ZUVsZW1lbnQiLCJhcHBlbmRFbGVtZW50IiwidGV4dENvbnRlbnQiLCJib2FyZENvbnRyb2xsZXIiLCJpc0NvbXB1dGVyIiwiZ2FtZUJvYXJkV3JhcHBlciIsImJvYXJkVGl0bGUiLCJnYW1lYm9hcmQiLCJidWlsZEdyaWQiLCJyb3RhdGVTaGlwQnV0dG9uIiwic2V0R3JpZFRyaWdnZXJzIiwiZ2FtZWJvYXJkRWxlbWVudCIsInNldEF0dHJpYnV0ZSIsImNvbXB1dGVyQm9hcmRDb250cm9sbGVyIiwiaHVtYW5Cb2FyZENvbnRyb2xsZXIiLCJjZWxscyIsInN0YXR1cyIsImF0dGFja0ljb24iLCJJbWFnZSIsInVzZWRDZWxsIiwiYXBwZW5kQ2hpbGQiLCJzcmMiLCJ0ZXh0Qm94MSIsInRleHRCb3gyIiwidGV4dEJveDMiLCJyZXNldEdhbWVCdXR0b24iLCJlbGVtZW50TmFtZSIsImNsYXNzTmFtZSIsImZhdGhlckVsZW1lbnQiLCJhcmd1bWVudHMiLCJ1bmRlZmluZWQiXSwic291cmNlUm9vdCI6IiJ9