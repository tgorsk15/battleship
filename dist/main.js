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
    font-family: "Silkscreen", sans-serif;
}

.gameboards {
    position: relative;
    display: flex;
    justify-content: space-around;
    grid-row: 2 / 3;
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
    color: rgb(222, 224, 225);
    font-family: "Silkscreen", sans-serif;
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
    font-family: "Podkova", serif;
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
    height: 110px;
    width: 190px;
    background-color: rgb(72, 61, 139);
    border: 4px solid rgb(74, 38, 254);
    border-radius: 15px;
    font-size: 30px;
    font-family: "Silkscreen", sans-serif;
    text-align: center;
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
    width: 100px;
    background-color: rgb(221, 241, 241, 1);
    opacity: 1;
    border-radius: 20px;
    border: none;
    font-family: "Silkscreen", sans-serif;
}

.start-game-button {
    position: absolute;
    top: 350px;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    height: 110px;
    width: 180px;
    background-color: rgb(72, 61, 139);
    border: 4px solid purple;
    border-radius: 15px;
    font-size: 30px;
    font-weight: bold;
    font-family: "Silkscreen", sans-serif;
    color: rgb(222, 224, 225);
    text-align: center;
}`, "",{"version":3,"sources":["webpack://./src/pageStyling.css"],"names":[],"mappings":"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","sourcesContent":["html, body {\n    min-height: 100%;\n    min-width: 100%;\n    margin: 0px;\n}\n\nbody {\n    background-image: url(\"./assets/background.jpg\");\n    background-size: cover;\n    position: relative;\n}\n\n.prompt-box {\n    display: none\n}\n\n.game-container {\n    display: grid;\n    grid-template-rows: 1fr 4fr 1.7fr;\n    height: 100vh;\n    width: 100vw;\n    /* background-color: rgb(59, 59, 59); */\n}\n\n.header {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    grid-row: 1 / 2;\n    \n}\n\n.game-title {\n    font-size: 67px;\n    margin-top: 15px;\n    margin-bottom: 17px;\n    color: rgba(58, 4, 58, 0.7);\n    text-shadow: 0px 0px 40px rgb(127, 122, 122);\n    font-family: \"Silkscreen\", sans-serif;\n}\n\n.gameboards {\n    position: relative;\n    display: flex;\n    justify-content: space-around;\n    grid-row: 2 / 3;\n}\n\n.dialogue-container {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    grid-row: 3 / 4;\n}\n\n.dialogue-box {\n    margin-top: 8px;\n    height: 20vh;\n    width: 50vw;\n    background-color: rgb(77, 134, 77);\n}\n\n\n/* gameboard wrapper styling */\n.board-wrapper {\n    position: relative;\n    height: 100%;\n    width: 400px;\n    background: rgb(128, 0, 128, 0.4);\n    border: 5px solid rgb(128, 0, 128);\n    padding: 0 15px;\n    padding-bottom: 7px;\n    border-radius: 25px;\n}\n\n.board-title {\n    text-align: center;\n    font-size: 27px;\n    color: rgb(222, 224, 225);\n    font-family: \"Silkscreen\", sans-serif;\n}\n\n.gameboard {\n    display: flex;\n    flex-direction: column;\n    height: 400px;\n    width: 400px;\n    background-color: blueviolet;\n}\n\n.row {\n    display: flex;\n    height: 10%;\n    width: 100%;\n    /* background-color: pink; */\n}\n\n.cell {\n    width: 100%;\n    margin: 0px;\n    aspect-ratio: 1;\n    background-color: rgb(221, 241, 241, 0.5);\n    border: 1px solid black;\n}\n\n.cell-c {\n    width: 100%;\n    margin: 0px;\n    aspect-ratio: 1;\n    background-color: rgb(221, 241, 241, 0.5);\n    border: 1px solid black;\n}\n\n.cell-c:hover {\n    background-color: rgb(117, 156, 211);\n}\n\n/* icons */\n.attack-icon {\n    object-fit: cover;\n    height: 100%;\n}\n\n\n/* styling for dialogue box */\n.dialogue-container {\n    position: relative;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    grid-row: 3 / 4;\n}\n\n.dialogue-box {\n    display: flex;\n    flex-direction: column;\n    justify-content: space-evenly;\n    align-items: center;\n    height: 18vh;\n    width: 45vw;\n    background-color: rgb(72, 61, 139, 0.8);\n    border: 5px solid rgb(91, 22, 91, 1);\n    border-radius: 25px;\n    margin-top: 20px;\n}\n\n.text-box1, .text-box2, .text-box3 {\n    color: rgb(183, 183, 183);\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    height: 5vh;\n    width: 50vw;\n    font-family: \"Podkova\", serif;\n    font-size: 25px;\n    font-weight: bold;\n}\n\n\n.reset-game-button {\n    position: absolute;\n    top: 245px;\n    left: 0;\n    right: 0;\n    margin-left: auto;\n    margin-right: auto;\n    height: 110px;\n    width: 190px;\n    background-color: rgb(72, 61, 139);\n    border: 4px solid rgb(74, 38, 254);\n    border-radius: 15px;\n    font-size: 30px;\n    font-family: \"Silkscreen\", sans-serif;\n    text-align: center;\n    color: rgb(222, 224, 225);\n}\n\n/* signature */\n.signature {\n    color: white;\n    position: absolute;\n    bottom: 25px;\n    right: 20px;\n\n}\n\na {\n    color: purple;\n    text-shadow: 0px 0px 10px black;\n}\n\n\n/* styling for ship Placement */\n.valid-placement {\n    background-color: rgb(110, 189, 110, 1);\n}\n\n.invalid-placement {\n    background-color: rgb(249, 116, 116, 1);\n}\n\n.placed {\n    background-color: rgb(214, 100, 166);\n}\n\n.rotate-ship {\n    position: absolute;\n    top: 15px;\n    right: 20px;\n    height: 25px;\n    width: 100px;\n    background-color: rgb(221, 241, 241, 1);\n    opacity: 1;\n    border-radius: 20px;\n    border: none;\n    font-family: \"Silkscreen\", sans-serif;\n}\n\n.start-game-button {\n    position: absolute;\n    top: 350px;\n    left: 0;\n    right: 0;\n    margin-left: auto;\n    margin-right: auto;\n    height: 110px;\n    width: 180px;\n    background-color: rgb(72, 61, 139);\n    border: 4px solid purple;\n    border-radius: 15px;\n    font-size: 30px;\n    font-weight: bold;\n    font-family: \"Silkscreen\", sans-serif;\n    color: rgb(222, 224, 225);\n    text-align: center;\n}"],"sourceRoot":""}]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCO0FBQy9COztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsT0FBTyxzRkFBc0YsWUFBWSxXQUFXLFVBQVUsTUFBTSxLQUFLLFlBQVksYUFBYSxhQUFhLE9BQU8sS0FBSyxLQUFLLE1BQU0sS0FBSyxVQUFVLFlBQVksV0FBVyxVQUFVLFlBQVksT0FBTyxLQUFLLFVBQVUsWUFBWSxhQUFhLFlBQVksT0FBTyxLQUFLLFVBQVUsWUFBWSxhQUFhLGFBQWEsYUFBYSxhQUFhLE9BQU8sS0FBSyxZQUFZLFdBQVcsWUFBWSxXQUFXLE9BQU8sS0FBSyxVQUFVLFlBQVksYUFBYSxXQUFXLE9BQU8sS0FBSyxVQUFVLFVBQVUsVUFBVSxZQUFZLFFBQVEsWUFBWSxNQUFNLFlBQVksV0FBVyxVQUFVLFlBQVksYUFBYSxXQUFXLFlBQVksYUFBYSxPQUFPLEtBQUssWUFBWSxXQUFXLFlBQVksYUFBYSxPQUFPLEtBQUssVUFBVSxZQUFZLFdBQVcsVUFBVSxZQUFZLE9BQU8sS0FBSyxVQUFVLFVBQVUsVUFBVSxZQUFZLE9BQU8sS0FBSyxVQUFVLFVBQVUsVUFBVSxZQUFZLGFBQWEsT0FBTyxLQUFLLFVBQVUsVUFBVSxVQUFVLFlBQVksYUFBYSxPQUFPLEtBQUssWUFBWSxPQUFPLFVBQVUsS0FBSyxZQUFZLFdBQVcsUUFBUSxZQUFZLE1BQU0sWUFBWSxXQUFXLFlBQVksYUFBYSxXQUFXLE9BQU8sS0FBSyxVQUFVLFlBQVksYUFBYSxhQUFhLFdBQVcsVUFBVSxZQUFZLGFBQWEsYUFBYSxhQUFhLE9BQU8sS0FBSyxZQUFZLFdBQVcsWUFBWSxhQUFhLFdBQVcsVUFBVSxZQUFZLFdBQVcsWUFBWSxRQUFRLEtBQUssWUFBWSxXQUFXLFVBQVUsVUFBVSxZQUFZLGFBQWEsV0FBVyxVQUFVLFlBQVksYUFBYSxhQUFhLFdBQVcsWUFBWSxhQUFhLGFBQWEsT0FBTyxVQUFVLEtBQUssVUFBVSxZQUFZLFdBQVcsV0FBVyxNQUFNLEtBQUssVUFBVSxZQUFZLFFBQVEsWUFBWSxNQUFNLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksV0FBVyxVQUFVLFVBQVUsVUFBVSxZQUFZLFdB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LXRlbXBsYXRlLy4vc3JjL2dhbWVMb29wLmpzIiwid2VicGFjazovL21haW4tdGVtcGxhdGUvLi9zcmMvZ2FtZWJvYXJkQ29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly9tYWluLXRlbXBsYXRlLy4vc3JjL3BsYXllci5qcyIsIndlYnBhY2s6Ly9tYWluLXRlbXBsYXRlLy4vc3JjL3NoaXAtb2JqZWN0LmpzIiwid2VicGFjazovL21haW4tdGVtcGxhdGUvLi9zcmMvc2hpcFBsYWNlbWVudC5qcyIsIndlYnBhY2s6Ly9tYWluLXRlbXBsYXRlLy4vc3JjL3VzZXJJbnRlcmZhY2UuanMiLCJ3ZWJwYWNrOi8vbWFpbi10ZW1wbGF0ZS8uL3NyYy9wYWdlU3R5bGluZy5jc3MiLCJ3ZWJwYWNrOi8vbWFpbi10ZW1wbGF0ZS8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vbWFpbi10ZW1wbGF0ZS8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRVcmwuanMiLCJ3ZWJwYWNrOi8vbWFpbi10ZW1wbGF0ZS8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL21haW4tdGVtcGxhdGUvLi9zcmMvcGFnZVN0eWxpbmcuY3NzP2E5YjciLCJ3ZWJwYWNrOi8vbWFpbi10ZW1wbGF0ZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9tYWluLXRlbXBsYXRlLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly9tYWluLXRlbXBsYXRlLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL21haW4tdGVtcGxhdGUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vbWFpbi10ZW1wbGF0ZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL21haW4tdGVtcGxhdGUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly9tYWluLXRlbXBsYXRlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL21haW4tdGVtcGxhdGUvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vbWFpbi10ZW1wbGF0ZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbWFpbi10ZW1wbGF0ZS93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL21haW4tdGVtcGxhdGUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9tYWluLXRlbXBsYXRlL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbWFpbi10ZW1wbGF0ZS93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly9tYWluLXRlbXBsYXRlL3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovL21haW4tdGVtcGxhdGUvd2VicGFjay9ydW50aW1lL25vbmNlIiwid2VicGFjazovL21haW4tdGVtcGxhdGUvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L3ByZWZlci1kZWZhdWx0LWV4cG9ydCAqL1xuaW1wb3J0IHsgUGxheWVyIH0gZnJvbSBcIi4vcGxheWVyXCI7XG5pbXBvcnQgeyBnYW1lQm9hcmRDb250cm9sbGVyIH0gZnJvbSBcIi4vZ2FtZWJvYXJkQ29udHJvbGxlclwiO1xuaW1wb3J0IHsgY3JlYXRlRmxlZXQsIGNyZWF0ZU9wcEZsZWV0IH0gZnJvbSBcIi4vc2hpcC1vYmplY3RcIjtcbmltcG9ydCB7IGRvbU1hbmlwdWxhdGlvbiwgZGlhbG9ndWVDb250cm9sbGVyIH0gZnJvbSBcIi4vdXNlckludGVyZmFjZVwiO1xuaW1wb3J0IHsgaHVtYW5TaGlwUGxhY2VtZW50LCBjb21wdXRlclBsYWNlbWVudCB9IGZyb20gXCIuL3NoaXBQbGFjZW1lbnRcIjtcblxuZXhwb3J0IGNvbnN0IGluaXRpYWxpemVHYW1lID0gZnVuY3Rpb24gY3JlYXRlR2FtZSgpIHtcbiAgICBjb25zdCBydW5ET00gPSBkb21NYW5pcHVsYXRpb24oKTtcblxuXG4gICAgY29uc3QgaHVtYW5QbGF5ZXIgPSBuZXcgUGxheWVyKCdVc2VyJylcbiAgICBjb25zdCBodW1hbkZsZWV0ID0gY3JlYXRlRmxlZXQoKVxuICAgIGNvbnNvbGUubG9nKGh1bWFuRmxlZXQpXG4gICAgaHVtYW5QbGF5ZXIuZ2FtZUJvYXJkID0gZ2FtZUJvYXJkQ29udHJvbGxlcihodW1hbkZsZWV0LCBodW1hblBsYXllci5wbGF5ZXIpO1xuICAgIGNvbnN0IGh1bWFuQm9hcmQgPSBodW1hblBsYXllci5nYW1lQm9hcmRcbiAgICBodW1hbkJvYXJkLmNyZWF0ZUJvYXJkKCk7XG4gICAgXG5cbiAgICBjb25zdCBBSXBsYXllciA9IG5ldyBQbGF5ZXIoJ0VuZW15Jyk7XG4gICAgY29uc3QgY29tcHV0ZXJGbGVldCA9IGNyZWF0ZU9wcEZsZWV0KCk7XG4gICAgQUlwbGF5ZXIuZ2FtZUJvYXJkID0gZ2FtZUJvYXJkQ29udHJvbGxlcihjb21wdXRlckZsZWV0LCBBSXBsYXllci5wbGF5ZXIpO1xuICAgIGNvbnN0IGNvbXB1dGVyQm9hcmQgPSBBSXBsYXllci5nYW1lQm9hcmQ7XG4gICAgY29tcHV0ZXJCb2FyZC5jcmVhdGVCb2FyZCgpO1xuXG4gICAgcnVuRE9NLnJlbmRlclN0YXJ0KCk7XG4gICAgcnVuRE9NLnJlbmRlckdhbWVCb2FyZChjb21wdXRlckJvYXJkLmNyZWF0ZUJvYXJkKCksIEFJcGxheWVyLnBsYXllcik7XG4gICAgcnVuRE9NLnJlbmRlckdhbWVCb2FyZChjb21wdXRlckJvYXJkLCBodW1hblBsYXllci5wbGF5ZXIsIGh1bWFuQm9hcmQpO1xuICAgIFxuICAgIC8vIGNhbGwgcmVuZGVyIGRpYWxvZ3VlIGJveCBoZXJlXG4gICAgY29uc3QgY3JlYXREaWFsb2d1ZSA9IHJ1bkRPTS5yZW5kZXJEaWFsb2d1ZUJveCgpO1xuICAgIGNvbnN0IGRpYWxvZ3VlID0gZGlhbG9ndWVDb250cm9sbGVyKClcbiAgICBkaWFsb2d1ZS5wbGFjZVNoaXBzTWVzc2FnZSgpXG5cbiAgICAvLyBjYWxsIGNvbXB1dGVyUGxhY2VtZW50IHRvIHNldCB1cCBjb21wdXRlcidzIGNoaXBzOlxuICAgIGNvbnN0IGNvbXB1dGVyUGxhY2VtZW50cyA9IGNvbXB1dGVyUGxhY2VtZW50KGNvbXB1dGVyQm9hcmQsIGNvbXB1dGVyRmxlZXQpO1xuICAgIFxuICAgIC8vIGNhbGwgc2hpcFBsYWNlbWVudCBmdW5jdGlvbiBoZXJlIGZvciBodW1hbkJvYXJkXG4gICAgY29uc3QgaHVtYW5QbGFjZW1lbnQgPSBodW1hblNoaXBQbGFjZW1lbnQoaHVtYW5Cb2FyZCwgaHVtYW5GbGVldCk7XG5cbiAgIFxufVxuXG5leHBvcnQgY29uc3QgcmVzZXRJbnRlcmZhY2UgPSBmdW5jdGlvbiAocmVzZXRCdXR0b24pIHtcbiAgICBjb25zb2xlLmxvZygncmVzZXRpbmcgYWxsIHRoaXMgc2hpdCcpO1xuICAgIGNvbnN0IHBsYXllckJvYXJkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nYW1lYm9hcmRzJyk7XG4gICAgY29uc3QgZGlhbG9ndWVDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGlhbG9ndWUtY29udGFpbmVyJyk7XG4gICAgY29uc3QgZGlhbG9ndWVCb3ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGlhbG9ndWUtYm94Jyk7XG4gICAgY29uc3QgZ2FtZUJvYXJkV3JhcHBlcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYm9hcmQtd3JhcHBlcicpO1xuXG5cbiAgICBnYW1lQm9hcmRXcmFwcGVycy5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG4gICAgICAgIHBsYXllckJvYXJkcy5yZW1vdmVDaGlsZChlbGVtZW50KTtcbiAgICB9KTtcblxuICAgIGRpYWxvZ3VlQ29udGFpbmVyLnJlbW92ZUNoaWxkKGRpYWxvZ3VlQm94KTtcbiAgICBwbGF5ZXJCb2FyZHMucmVtb3ZlQ2hpbGQocmVzZXRCdXR0b24pXG5cbiAgICBpbml0aWFsaXplR2FtZSgpO1xuXG59IiwiLyogZXNsaW50LWRpc2FibGUgbm8tdXNlLWJlZm9yZS1kZWZpbmUgKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLWVsc2UtcmV0dXJuICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1sb29wLWZ1bmMgKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLXBsdXNwbHVzICovXG4vKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvcHJlZmVyLWRlZmF1bHQtZXhwb3J0ICovXG5pbXBvcnQgeyBkb21NYW5pcHVsYXRpb24sIGRpYWxvZ3VlQ29udHJvbGxlciB9IGZyb20gXCIuL3VzZXJJbnRlcmZhY2VcIjtcblxuXG5jb25zdCBydW5ET00gPSBkb21NYW5pcHVsYXRpb24oKTtcbmNvbnN0IGRpYWxvZ3VlUmVmcmVzaCA9IGRpYWxvZ3VlQ29udHJvbGxlcigpO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2FtZUJvYXJkQ29udHJvbGxlcihmbGVldCwgbmFtZSkge1xuICAgIGNvbnN0IHBsYXllck5hbWUgPSBuYW1lO1xuICAgIGNvbnN0IGJvYXJkID0gW107XG4gICAgY29uc3Qgc2hpcHMgPSBmbGVldDtcblxuXG4gICAgZnVuY3Rpb24gY3JlYXRlQm9hcmQoKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgICAgICAgICAgYm9hcmRbaV0gPSBbXTtcblxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaisrKSB7XG4gICAgICAgICAgICAgICAgYm9hcmRbaV1bal0gPSBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKGJvYXJkKTtcbiAgICAgICAgcmV0dXJuIGJvYXJkXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGxhY2VIb3Jpem9udGFsU2hpcChyb3csIGNvbCwgc2hpcCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IG5ld0Nvb3JkcyA9IFtyb3csIGNvbCArIGldO1xuICAgICAgICAgICAgc2hpcC5jb29yZHMucHVzaChuZXdDb29yZHMpXG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2coc2hpcCk7XG4gICAgICAgIGNvbnNvbGUubG9nKHNoaXAubmFtZSk7XG4gICAgICAgIGNvbnNvbGUubG9nKHNoaXAuY29vcmRzKTtcbiAgICAgICAgY29uc29sZS5sb2coc2hpcHMpXG4gICAgICAgIHJldHVybiBzaGlwXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGxhY2VWZXJ0aWNhbFNoaXAocm93LCBjb2wsIHNoaXApIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBuZXdDb29yZHMgPSBbcm93ICsgaSwgY29sXTtcbiAgICAgICAgICAgIHNoaXAuY29vcmRzLnB1c2gobmV3Q29vcmRzKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyhzaGlwKVxuICAgICAgICBjb25zb2xlLmxvZyhzaGlwcylcbiAgICAgICAgY29uc29sZS5sb2coc2hpcC5jb29yZHMpO1xuICAgICAgICByZXR1cm4gc2hpcFxuICAgIH1cbiAgICBcbiAgICBmdW5jdGlvbiByZWNpZXZlQXR0YWNrKGNvb3Jkcykge1xuICAgICAgICBjb25zb2xlLmxvZyhjb29yZHMpXG4gICAgICAgIGxldCBhdHRhY2tTdGF0dXMgPSAnbWlzcyc7XG5cbiAgICAgICAgLy8gY2hlY2sgdG8gc2VlIGlmIGNvb3JkcyBoYXZlIGFscmVhZHkgYmVlbiB1c2VkOlxuICAgICAgICBpZiAoY2hlY2tJZlVzZWQoY29vcmRzKSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgcmV0dXJuICdmaWxsZWQgYWxyZWFkeSdcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHNoaXBzW2ldLmNvb3Jkcy5mb3JFYWNoKChjb29yZCkgPT4ge1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmIChjaGVja0lmVXNlZChjb29yZHMpID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnZmlsbGVkIGFscmVhZHknXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGNvb3JkWzBdID09PSBjb29yZHNbMF0gJiYgY29vcmRbMV0gPT09IGNvb3Jkc1sxXSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnaGl0Jyk7XG4gICAgICAgICAgICAgICAgICAgIGF0dGFja1N0YXR1cyA9ICdoaXQnXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGF0dGFja1N0YXR1cylcbiAgICAgICAgICAgICAgICAgICAgc2hpcHNbaV0uaGl0KCk7XG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZUJvYXJkU3BvdChjb29yZHMpO1xuICAgICAgICAgICAgICAgICAgICBkaWFsb2d1ZVJlZnJlc2gubW92ZVJlc3VsdChhdHRhY2tTdGF0dXMsXG4gICAgICAgICAgICAgICAgICAgICAgICBwbGF5ZXJOYW1lLCBjb29yZHMsIHNoaXBzW2ldKVxuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHN1bmtDaGVjayA9IHNoaXBzW2ldLmNoZWNrSWZTdW5rKClcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN1bmtDaGVjaykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGlhbG9ndWVSZWZyZXNoLnN1bmtTaGlwTWVzc2FnZShzaGlwc1tpXSwgcGxheWVyTmFtZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHNoaXBzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrQWxsU3VuaygpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICB1cGRhdGVCb2FyZFNwb3QoY29vcmRzLCBhdHRhY2tTdGF0dXMpO1xuICAgICAgICBpZiAoYXR0YWNrU3RhdHVzID09PSAnbWlzcycpIHtcbiAgICAgICAgICAgIGRpYWxvZ3VlUmVmcmVzaC5tb3ZlUmVzdWx0KGF0dGFja1N0YXR1cyxcbiAgICAgICAgICAgICAgICBwbGF5ZXJOYW1lLCBjb29yZHMpXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiBhdHRhY2tTdGF0dXNcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjaGVja0FsbFN1bmsoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKHNoaXBzKTtcbiAgICAgICAgaWYgKHNoaXBzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgZGlhbG9ndWVSZWZyZXNoLmVuZEdhbWVNZXNzYWdlKHBsYXllck5hbWUpXG4gICAgICAgICAgICBlbmRHYW1lKClcbiAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVwZGF0ZUJvYXJkU3BvdChjb29yZHMsIGF0dGFja1N0YXR1cykge1xuICAgICAgICBib2FyZFtjb29yZHNbMF0gLSAxXVtjb29yZHNbMV0gLSAxXSA9IHRydWU7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGJvYXJkKVxuICAgICAgICBydW5ET00udXNlR3JpZFNwb3QoY29vcmRzLCBhdHRhY2tTdGF0dXMsIHBsYXllck5hbWUpXG4gICAgICAgIHJldHVybiBib2FyZFxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNoZWNrSWZVc2VkKGNvb3Jkcykge1xuICAgICAgICBpZiAoYm9hcmRbY29vcmRzWzBdIC0gMV1bY29vcmRzWzFdIC0gMV0gPT09IHRydWUpIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdhbHJlYWR5IHVzZWQnKVxuICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZW5kR2FtZSgpIHtcbiAgICAgICAgLy8gd2FudCB0byBkaXNhYmxlIGJvdGggZ2FtZUJvYXJkc1xuICAgICAgICAvLyB3YW50IHRvIG1ha2UgdGhlIHJlc3RhcnQgYnV0dG9uIGFwcGVhclxuICAgICAgICBjb25zb2xlLmxvZygnZW5kaW5nIGdhbWUnKTtcbiAgICAgICAgcnVuRE9NLmZyZWV6ZUdyaWQoKTtcbiAgICAgICAgcnVuRE9NLnJlbmRlckVuZEdhbWUoKTtcbiAgICB9XG4gICAgLy8gbGlrZWx5IHdpbGwgaGF2ZSB0byBpbXBsZW1lbnQgY2hlY2sgdG8gbWFrZSBzdXJlIGEgc2hpcCBjYW5cbiAgICAvLyBiZSBwbGFjZWQgd2l0aCBubyBvdmVybGFwXG5cblxuICAgIHJldHVybiB7IGNyZWF0ZUJvYXJkLCBwbGFjZUhvcml6b250YWxTaGlwLCBwbGFjZVZlcnRpY2FsU2hpcCwgcmVjaWV2ZUF0dGFjayxcbiAgICBjaGVja0FsbFN1bmssIHVwZGF0ZUJvYXJkU3BvdCwgY2hlY2tJZlVzZWQsIGVuZEdhbWUgfVxufVxuXG4iLCIvLyBjcmVhdGUgYm90aCB0aGUgdXNlciBwbGF5ZXIgYW5kIHRoZSBjb21wdXRlciBwbGF5ZXIgaGVyZVxuXG4vLyBjb21wdXRlciBwbGF5ZXIgaGFzIGF0dGFjayBjb29yZGluYXRlcyBnZW5lcmF0b3IgZnVuY3Rpb25cblxuZXhwb3J0IGNsYXNzIFBsYXllciB7XG4gICAgY29uc3RydWN0b3IocGxheWVyLCBnYW1lQm9hcmQpIHtcbiAgICAgICAgdGhpcy5wbGF5ZXIgPSBwbGF5ZXI7XG4gICAgICAgIHRoaXMuZ2FtZUJvYXJkPSBudWxsXG4gICAgfVxufVxuXG5cbmV4cG9ydCBjb25zdCB1c2VyUGxheWVyID0gZnVuY3Rpb24gKCkge1xuXG59XG5cbmV4cG9ydCBjb25zdCBjb21wdXRlclBsYXllciA9IGZ1bmN0aW9uICgpIHtcbiAgICBjb25zdCB2aXNpdGVkID0gW107XG5cbiAgICBmdW5jdGlvbiBwaWNrUmFuZG9tQ2VsbChodW1hbkJvYXJkKSB7XG4gICAgICAgIGNvbnN0IHJvdyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKSArIDFcbiAgICAgICAgY29uc3QgY29sdW1uID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApICsgMVxuICAgICAgICBjb25zdCBjb21wQ29vcmRzID0gW3JvdywgY29sdW1uXTtcblxuICAgICAgICBjb25zdCByZXBlYXRCb29sZWFuID0gY2hlY2tSZXBlYXRDZWxsKGNvbXBDb29yZHMpXG4gICAgICAgIGNvbnNvbGUubG9nKHJlcGVhdEJvb2xlYW4pXG4gICAgICAgIGlmIChyZXBlYXRCb29sZWFuID09PSB0cnVlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnY29tcHV0ZXIgcGlja2VkIHVzZWQgY2VsbCEhJylcbiAgICAgICAgICAgIHBpY2tSYW5kb21DZWxsKGh1bWFuQm9hcmQpO1xuICAgICAgICB9IGVsc2UgaWYgKHJlcGVhdEJvb2xlYW4gPT09IGZhbHNlKSB7XG4gICAgICAgICAgICB2aXNpdGVkLnB1c2goY29tcENvb3Jkcyk7XG4gICAgICAgICAgICBodW1hbkJvYXJkLnJlY2lldmVBdHRhY2soY29tcENvb3Jkcyk7XG5cbiAgICAgICAgICAgIHJldHVybiBjb21wQ29vcmRzIFxuICAgICAgICB9XG4gICAgICAgIFxuXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2hlY2tSZXBlYXRDZWxsKGNvb3Jkcykge1xuICAgICAgICBjb25zdCBzdHJpbmdlZENvb3JkcyA9IEpTT04uc3RyaW5naWZ5KGNvb3Jkcyk7XG4gICAgICAgIGNvbnN0IGV4aXN0c0Jvb2xlYW4gPSB2aXNpdGVkLnNvbWUoKGNvb3JkKSA9PiBKU09OLnN0cmluZ2lmeShjb29yZCkgPT09IHN0cmluZ2VkQ29vcmRzKVxuICAgICAgICBjb25zb2xlLmxvZyhleGlzdHNCb29sZWFuKVxuICAgICAgICByZXR1cm4gZXhpc3RzQm9vbGVhblxuICAgIH1cblxuICAgIHJldHVybiB7cGlja1JhbmRvbUNlbGwsIGNoZWNrUmVwZWF0Q2VsbH1cbn0iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby1lbHNlLXJldHVybiAqL1xuLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L3ByZWZlci1kZWZhdWx0LWV4cG9ydCAqL1xuXG5leHBvcnQgY2xhc3MgU2hpcCB7XG4gICAgY29uc3RydWN0b3IobGVuZ3RoLCBuYW1lLCBoaXRzLCBpc1N1bmssIGNvb3Jkcykge1xuICAgICAgICB0aGlzLmxlbmd0aCA9IGxlbmd0aDtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy5oaXRzID0gMDtcbiAgICAgICAgdGhpcy5pc1N1bmsgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5jb29yZHMgPSBbXVxuICAgIH1cblxuICAgIGhpdCgpIHtcbiAgICAgICAgdGhpcy5oaXRzICs9IDFcbiAgICAgICAgY29uc29sZS5sb2coJ2hpdCBhZGRlZCcpXG4gICAgfVxuXG4gICAgY2hlY2tJZlN1bmsoKSB7XG4gICAgICAgIGlmICh0aGlzLmxlbmd0aCA9PT0gdGhpcy5oaXRzKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnU3VuayEnKVxuICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMubGVuZ3RoKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuaGl0cyk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgIH1cblxufVxuXG5cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUZsZWV0KCkge1xuICAgIGNvbnN0IHNoaXBzID0gW11cblxuICAgIGNvbnN0IGNhcnJpZXIgPSBuZXcgU2hpcCg1LCAnQ2FycmllcicpO1xuICAgIGNvbnN0IGJhdHRsZXNoaXAgPSBuZXcgU2hpcCg0LCAnQmF0dGxlc2hpcCcpO1xuICAgIGNvbnN0IGRlc3Ryb3llciA9IG5ldyBTaGlwKDMsICdEZXN0cm95ZXInKTtcbiAgICBjb25zdCBzdWJtYXJpbmUgPSBuZXcgU2hpcCgzLCAnU3VibWFyaW5lJyk7XG4gICAgY29uc3QgcGF0cm9sQm9hdCA9IG5ldyBTaGlwKDIsICdQYXRyb2wgQm9hdCcpO1xuIFxuICAgIHNoaXBzLnB1c2goY2FycmllciwgYmF0dGxlc2hpcCwgZGVzdHJveWVyLCBzdWJtYXJpbmUsIHBhdHJvbEJvYXQpXG5cbiAgICBjb25zb2xlLmxvZyhzaGlwcyk7XG4gICAgcmV0dXJuIHNoaXBzXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVPcHBGbGVldCgpIHtcbiAgICBjb25zdCBzaGlwcyA9IFtdXG5cbiAgICBjb25zdCBjYXJyaWVyID0gbmV3IFNoaXAoNSwgJ0NhcnJpZXInKTtcbiAgICBjb25zdCBiYXR0bGVzaGlwID0gbmV3IFNoaXAoNCwgJ0JhdHRsZXNoaXAnKTtcbiAgICBjb25zdCBkZXN0cm95ZXIgPSBuZXcgU2hpcCgzLCAnRGVzdHJveWVyJyk7XG4gICAgY29uc3Qgc3VibWFyaW5lID0gbmV3IFNoaXAoMywgJ1N1Ym1hcmluZScpO1xuICAgIGNvbnN0IHBhdHJvbEJvYXQgPSBuZXcgU2hpcCgyLCAnUGF0cm9sIEJvYXQnKTtcblxuICAgIHNoaXBzLnB1c2goY2FycmllciwgYmF0dGxlc2hpcCwgZGVzdHJveWVyLCBzdWJtYXJpbmUsIHBhdHJvbEJvYXQpO1xuXG4gICAgY29uc29sZS5sb2coc2hpcHMpO1xuICAgIHJldHVybiBzaGlwc1xufSIsIi8qIGVzbGludC1kaXNhYmxlIG5vLXVzZS1iZWZvcmUtZGVmaW5lICovXG4vKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvcHJlZmVyLWRlZmF1bHQtZXhwb3J0ICovXG5cbi8vIHJvdGF0ZUJ1dHRvbiBhbGxvd3MgcGxheWVycyB0byByb3RhdGUgc2hpcHMgZHVyaW5nIHBsYWNlbWVudCBwaGFzZVxuLy8gc3RhcnRCdXR0b24gYWxsb3dzIHBsYXllciB0byBhdHRhY2sgd2hlbiBhbGwgc2hpcHMgaGF2ZSBiZWVuIHBsYWNlZFxuaW1wb3J0IHsgZGlhbG9ndWVDb250cm9sbGVyIH0gZnJvbSBcIi4vdXNlckludGVyZmFjZVwiO1xuXG5cbmV4cG9ydCBjb25zdCBodW1hblNoaXBQbGFjZW1lbnQgPSBmdW5jdGlvbiAoaHVtYW5Cb2FyZCwgc2hpcHMpIHtcbiAgICBjb25zdCByb3RhdGVCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucm90YXRlLXNoaXAnKTtcbiAgICBjb25zdCBzdGFydEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdGFydC1nYW1lLWJ1dHRvbicpO1xuICAgIGNvbnN0IHBsYXllckJvYXJkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nYW1lYm9hcmRzJyk7XG4gICAgY29uc3QgZ2FtZUJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdhbWVib2FyZCcpO1xuICAgIGNvbnN0IGRpYWxvZ3VlUnVuID0gZGlhbG9ndWVDb250cm9sbGVyKCk7XG5cbiAgICAvLyBtZW1vcnkgc3RvcmFnZSBmb3Igd2hlcmUgY2VsbHMgY2FuJ3QgYmUgdXNlZCBhZ2FpblxuICAgIGNvbnN0IG9jY3VwaWVkQ2VsbHMgPSBbXTtcblxuICAgIC8vIHNldHMgcGxhbmVcbiAgICBsZXQgY3VycmVudFBsYW5lID0gJ2hvcml6b250YWwnO1xuICAgIGNyZWF0ZVJvdGF0aW9uQWJpbGl0eSgpO1xuXG4gICAgY29uc3QgaHVtYW5DZWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jZWxsJyk7XG4gICAgbGV0IHNoaXBJbmRleCA9IDA7XG4gICAgXG5cbiAgICBodW1hbkNlbGxzLmZvckVhY2goKGNlbGwpID0+IHtcbiAgICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCAoKSA9PiB7XG4gICAgICAgICAgICBjZWxsSG92ZXIoY2VsbCwgc2hpcHNbc2hpcEluZGV4XSlcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIGlmIChjZWxsLmNsYXNzTGlzdC5jb250YWlucygndmFsaWQtcGxhY2VtZW50JykpIHtcbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudFBsYW5lID09PSAnaG9yaXpvbnRhbCcpIHtcbiAgICAgICAgICAgICAgICAgICAgcGxhY2VIb3Jpem9udGFsbHkoY2VsbC5jb29yZGluYXRlcywgY2VsbC5hY3RpdmVDZWxscywgc2hpcHNbc2hpcEluZGV4XSk7XG4gICAgICAgICAgICAgICAgICAgIHNoaXBJbmRleCArPSAxO1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2hpcEluZGV4ID09PSA1KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFydEJ1dHRvbkVtZXJnZSgpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coc2hpcEluZGV4KTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGN1cnJlbnRQbGFuZSA9PT0gJ3ZlcnRpY2FsJykge1xuICAgICAgICAgICAgICAgICAgICBwbGFjZVZlcnRpY2FsbHkoY2VsbC5jb29yZGluYXRlcywgY2VsbC5hY3RpdmVDZWxscywgc2hpcHNbc2hpcEluZGV4XSk7XG4gICAgICAgICAgICAgICAgICAgIHNoaXBJbmRleCArPSAxO1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2hpcEluZGV4ID09PSA1KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFydEJ1dHRvbkVtZXJnZSgpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coc2hpcEluZGV4KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gc2hpcEluZGV4XG4gICAgICAgIH0pXG4gICAgfSlcblxuICAgIFxuICAgIGZ1bmN0aW9uIGNlbGxIb3ZlcihjZWxsLCBzaGlwKSB7XG4gICAgICAgIGNvbnN0IGNlbGxDb29yZHMgPSBjZWxsLmNvb3JkaW5hdGVzO1xuICAgICAgICBjZWxsLmFjdGl2ZUNlbGxzID0gW107XG4gICAgICAgIGNvbnN0IGdyb3VwZWRDZWxscyA9IGNlbGwuYWN0aXZlQ2VsbHM7XG4gICAgICAgIC8vIGhhdmUgdG8gY2hlY2sgaWYgaXRzIGhvcml6b250YWwgb3IgdmVydGljYWxcbiAgICAgICAgLy8gdGhlbiBjaGVjayBpZiBzdGFydGluZyBwb2ludCArIHNoaXAgbGVuZ3RoIGlzIHZhbGlkXG4gICAgICAgIGlmIChzaGlwSW5kZXggPT09IDUpIHtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGN1cnJlbnRQbGFuZSA9PT0gJ2hvcml6b250YWwnKSB7XG4gICAgICAgICAgICBjb25zdCBjZWxsUm93ID0gY2VsbENvb3Jkc1swXVxuICAgICAgICAgICAgbGV0IGNlbGxDb2x1bW4gPSBjZWxsQ29vcmRzWzFdO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBhY3RpdmVDZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7Y2VsbFJvd30gJHtjZWxsQ29sdW1ufWhgKVxuICAgICAgICAgICAgICAgIGdyb3VwZWRDZWxscy5wdXNoKGFjdGl2ZUNlbGwpO1xuICAgICAgICAgICAgICAgIGNlbGxDb2x1bW4gKz0gMVxuICAgICAgICAgICAgICAgIGlmIChjZWxsQ29sdW1uID4gMTApIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBjb25mbGljdGluZyA9IGNoZWNrQ29uZmxpY3RpbmdTaGlwcyhncm91cGVkQ2VsbHMpO1xuXG4gICAgICAgICAgICBpZiAoKGNlbGxDb29yZHNbMV0gKyBzaGlwLmxlbmd0aCkgLSAxIDw9IDEwICYmIGNvbmZsaWN0aW5nID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIGdyb3VwZWRDZWxscy5mb3JFYWNoKChlbGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgZWxlbS5jbGFzc0xpc3QuYWRkKCd2YWxpZC1wbGFjZW1lbnQnKTsgXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoKGNlbGxDb29yZHNbMV0gKyBzaGlwLmxlbmd0aCkgLSAxID4gMTAgfHwgY29uZmxpY3RpbmcgPT09IHRydWUpe1xuICAgICAgICAgICAgICAgIGdyb3VwZWRDZWxscy5mb3JFYWNoKChlbGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGVsZW0uY2xhc3NMaXN0LmFkZCgnaW52YWxpZC1wbGFjZW1lbnQnKTsgXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW91dCcsICgpID0+IHtcbiAgICAgICAgICAgICAgICBncm91cGVkQ2VsbHMuZm9yRWFjaCgoZWxlbSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBlbGVtLmNsYXNzTGlzdC5yZW1vdmUoJ3ZhbGlkLXBsYWNlbWVudCcsICdpbnZhbGlkLXBsYWNlbWVudCcpXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pXG5cblxuICAgICAgICB9IGVsc2UgaWYgKGN1cnJlbnRQbGFuZSA9PT0gJ3ZlcnRpY2FsJykge1xuICAgICAgICAgICAgbGV0IGNlbGxSb3cgPSBjZWxsQ29vcmRzWzBdXG4gICAgICAgICAgICBjb25zdCBjZWxsQ29sdW1uID0gY2VsbENvb3Jkc1sxXTtcblxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgYWN0aXZlQ2VsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGAke2NlbGxSb3d9ICR7Y2VsbENvbHVtbn1oYClcbiAgICAgICAgICAgICAgICBncm91cGVkQ2VsbHMucHVzaChhY3RpdmVDZWxsKTtcbiAgICAgICAgICAgICAgICBjZWxsUm93ICs9IDFcbiAgICAgICAgICAgICAgICBpZiAoY2VsbFJvdyA+IDEwKSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgY29uZmxpY3RpbmcgPSBjaGVja0NvbmZsaWN0aW5nU2hpcHMoZ3JvdXBlZENlbGxzKTtcblxuXG4gICAgICAgICAgICBpZiAoKGNlbGxDb29yZHNbMF0gKyBzaGlwLmxlbmd0aCkgLSAxIDw9IDEwICYmIGNvbmZsaWN0aW5nID09PSBmYWxzZSApIHtcbiAgICAgICAgICAgICAgICBncm91cGVkQ2VsbHMuZm9yRWFjaCgoZWxlbSkgPT4ge1xuICAgICAgICAgICAgICAgICAgIGVsZW0uY2xhc3NMaXN0LmFkZCgndmFsaWQtcGxhY2VtZW50Jyk7IFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9IGVsc2UgaWYgKChjZWxsQ29vcmRzWzBdICsgc2hpcC5sZW5ndGgpIC0gMSA+IDEwIHx8IGNvbmZsaWN0aW5nID09PSB0cnVlKXtcbiAgICAgICAgICAgICAgICBncm91cGVkQ2VsbHMuZm9yRWFjaCgoZWxlbSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBlbGVtLmNsYXNzTGlzdC5hZGQoJ2ludmFsaWQtcGxhY2VtZW50Jyk7IFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdXQnLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgZ3JvdXBlZENlbGxzLmZvckVhY2goKGVsZW0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZWxlbS5jbGFzc0xpc3QucmVtb3ZlKCd2YWxpZC1wbGFjZW1lbnQnLCAnaW52YWxpZC1wbGFjZW1lbnQnKVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGxhY2VIb3Jpem9udGFsbHkoY2VsbENvb3JkcywgYWN0aXZlQ2VsbHMsIHNoaXApIHtcbiAgICAgICAgYWN0aXZlQ2VsbHMuZm9yRWFjaCgoZWxlbSkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZWxlbS5jb29yZGluYXRlcyk7XG4gICAgICAgICAgICBvY2N1cGllZENlbGxzLnB1c2goZWxlbS5jb29yZGluYXRlcyk7XG4gICAgICAgICAgICBlbGVtLmNsYXNzTGlzdC5hZGQoJ3BsYWNlZCcpO1xuICAgICAgICB9KTtcbiAgICAgICAgaHVtYW5Cb2FyZC5wbGFjZUhvcml6b250YWxTaGlwKGNlbGxDb29yZHNbMF0sIGNlbGxDb29yZHNbMV0sIHNoaXApO1xuICAgICAgICBjb25zb2xlLmxvZyhvY2N1cGllZENlbGxzKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwbGFjZVZlcnRpY2FsbHkoY2VsbENvb3JkcywgYWN0aXZlQ2VsbHMsIHNoaXApIHtcbiAgICAgICAgYWN0aXZlQ2VsbHMuZm9yRWFjaCgoZWxlbSkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZWxlbS5jb29yZGluYXRlcyk7XG4gICAgICAgICAgICBvY2N1cGllZENlbGxzLnB1c2goZWxlbS5jb29yZGluYXRlcyk7XG4gICAgICAgICAgICBlbGVtLmNsYXNzTGlzdC5hZGQoJ3BsYWNlZCcpO1xuICAgICAgICB9KTtcbiAgICAgICAgaHVtYW5Cb2FyZC5wbGFjZVZlcnRpY2FsU2hpcChjZWxsQ29vcmRzWzBdLCBjZWxsQ29vcmRzWzFdLCBzaGlwKTtcbiAgICAgICAgY29uc29sZS5sb2cob2NjdXBpZWRDZWxscylcbiAgICB9XG5cblxuICAgIFxuICAgIGZ1bmN0aW9uIGNoZWNrQ29uZmxpY3RpbmdTaGlwcyhhY3RpdmVDZWxscykge1xuICAgICAgICBsZXQgYWxyZWFkeVVzZWQgPSBmYWxzZVxuICAgICAgICBhY3RpdmVDZWxscy5mb3JFYWNoKChlbGVtKSA9PiB7XG4gICAgICAgICAgICBpZiAoY2hlY2tGb3JSZXBlYXQoZWxlbS5jb29yZGluYXRlcywgb2NjdXBpZWRDZWxscykgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBhbHJlYWR5VXNlZCA9IHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuIGFscmVhZHlVc2VkXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlUm90YXRpb25BYmlsaXR5KCkge1xuICAgICAgICByb3RhdGVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBuZXdQbGFuZSA9IHN3aXRjaFBsYW5lKGN1cnJlbnRQbGFuZSk7XG4gICAgICAgICAgICBjdXJyZW50UGxhbmUgPSBuZXdQbGFuZVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHN0YXJ0QnV0dG9uRW1lcmdlKCkge1xuICAgICAgICBzdGFydEJ1dHRvbi5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJzsgXG4gICAgICAgIHN0YXJ0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgZGlhbG9ndWVSdW4uYmVnaW5BdHRhY2tNZXNzYWdlKCk7XG4gICAgICAgICAgICBnYW1lQm9hcmQuc3R5bGUucG9pbnRlckV2ZW50cyA9ICdhdXRvJztcbiAgICAgICAgICAgIHBsYXllckJvYXJkcy5yZW1vdmVDaGlsZChzdGFydEJ1dHRvbik7XG4gICAgICAgICAgICByb3RhdGVCdXR0b24uc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICByZXR1cm4geyBjZWxsSG92ZXIsIHBsYWNlSG9yaXpvbnRhbGx5LCBjaGVja0NvbmZsaWN0aW5nU2hpcHMgfVxufVxuXG5cblxuXG5cbi8vIGNvbXB1dGVyIHBsYWNlbWVudCBsb2dpY1xuXG5leHBvcnQgY29uc3QgY29tcHV0ZXJQbGFjZW1lbnQgPSBmdW5jdGlvbiAoY29tcHV0ZXJCb2FyZCwgc2hpcHMpIHtcbiAgICBjb25zdCBwbGFuZXMgPSBbJ2hvcml6b250YWwnLCAndmVydGljYWwnXVxuICAgIGNvbnN0IHVzZWRDZWxscyA9IFtdO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjcmVhdGVTaGlwQ29vcmRzKHNoaXBzW2ldKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVTaGlwQ29vcmRzKHNoaXApIHtcblxuICAgICAgICBjb25zdCBjaG9zZW5QbGFuZSA9IGNob29zZVBsYW5lKHBsYW5lcyk7XG4gICAgICAgIGNvbnNvbGUubG9nKGNob3NlblBsYW5lKVxuICAgICAgICBpZiAoY2hvc2VuUGxhbmUgPT09ICdob3Jpem9udGFsJykge1xuICAgICAgICAgICAgdGVzdEhvcml6b250YWxTaGlwKHNoaXApXG4gICAgICAgIH0gZWxzZSBpZiAoY2hvc2VuUGxhbmUgPT09ICd2ZXJ0aWNhbCcpIHtcbiAgICAgICAgICAgIHRlc3RWZXJ0aWNhbFNoaXAoc2hpcCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIGZ1bmN0aW9uIHRlc3RIb3Jpem9udGFsU2hpcChzaGlwKSB7XG4gICAgICAgIGxldCBzdGFydGluZ0Nvb3JkcyA9IGNyZWF0ZUhvcml6b250YWxTdGFydChzaGlwKVxuXG4gICAgICAgIC8vIGluaXRpYWwgY2hlY2sgb2YgcmVwZWF0OlxuICAgICAgICBsZXQgZmlyc3RSZXBlYXQgPSBjaGVja0ZvclJlcGVhdChzdGFydGluZ0Nvb3JkcywgdXNlZENlbGxzKVxuICAgICAgICB3aGlsZSAoZmlyc3RSZXBlYXQgPT09IHRydWUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCduZWVkIG5ldyBzdGFydCcpXG4gICAgICAgICAgICBzdGFydGluZ0Nvb3JkcyA9IGNyZWF0ZUhvcml6b250YWxTdGFydChzaGlwKTtcbiAgICAgICAgICAgIGZpcnN0UmVwZWF0ID0gY2hlY2tGb3JSZXBlYXQoc3RhcnRpbmdDb29yZHMsIHVzZWRDZWxscylcbiAgICAgICAgfVxuICAgICAgICB1c2VkQ2VsbHMucHVzaChzdGFydGluZ0Nvb3Jkcyk7IFxuICAgICAgICBcbiAgICAgICAgbGV0IHJlcGVhdERldGVjdCA9IGZhbHNlO1xuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IHNoaXAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IG5ld0Nvb3JkcyA9IFtzdGFydGluZ0Nvb3Jkc1swXSwgc3RhcnRpbmdDb29yZHNbMV0gKyBpXTtcbiAgICAgICAgICAgIGNvbnN0IHJlcGVhdCA9IGNoZWNrRm9yUmVwZWF0KG5ld0Nvb3JkcywgdXNlZENlbGxzKVxuICAgICAgICAgICAgaWYgKHJlcGVhdCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICB1c2VkQ2VsbHMucHVzaChuZXdDb29yZHMpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfSBlbHNlIGlmIChyZXBlYXQgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICByZXBlYXREZXRlY3QgPSB0cnVlXG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChyZXBlYXREZXRlY3QgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICBjb21wdXRlckJvYXJkLnBsYWNlSG9yaXpvbnRhbFNoaXAoc3RhcnRpbmdDb29yZHNbMF0sIHN0YXJ0aW5nQ29vcmRzWzFdLCBzaGlwKTtcbiAgICAgICAgfSBlbHNlIGlmIChyZXBlYXREZXRlY3QgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHRlc3RIb3Jpem9udGFsU2hpcChzaGlwKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG5cbiAgICBmdW5jdGlvbiB0ZXN0VmVydGljYWxTaGlwKHNoaXApIHtcbiAgICAgICAgbGV0IHN0YXJ0aW5nQ29vcmRzID0gY3JlYXRlVmVydGljYWxTdGFydChzaGlwKVxuXG4gICAgICAgIC8vIGluaXRpYWwgY2hlY2sgb2YgcmVwZWF0OlxuICAgICAgICBsZXQgZmlyc3RSZXBlYXQgPSBjaGVja0ZvclJlcGVhdChzdGFydGluZ0Nvb3JkcywgdXNlZENlbGxzKVxuICAgICAgICB3aGlsZSAoZmlyc3RSZXBlYXQgPT09IHRydWUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCduZWVkIG5ldyBzdGFydCcpXG4gICAgICAgICAgICBzdGFydGluZ0Nvb3JkcyA9IGNyZWF0ZVZlcnRpY2FsU3RhcnQoc2hpcCk7XG4gICAgICAgICAgICBmaXJzdFJlcGVhdCA9IGNoZWNrRm9yUmVwZWF0KHN0YXJ0aW5nQ29vcmRzLCB1c2VkQ2VsbHMpXG4gICAgICAgIH1cbiAgICAgICAgdXNlZENlbGxzLnB1c2goc3RhcnRpbmdDb29yZHMpO1xuXG4gICAgICAgIGxldCByZXBlYXREZXRlY3QgPSBmYWxzZTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBzaGlwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBuZXdDb29yZHMgPSBbc3RhcnRpbmdDb29yZHNbMF0gKyBpLCBzdGFydGluZ0Nvb3Jkc1sxXV07XG4gICAgICAgICAgICBjb25zdCByZXBlYXQgPSBjaGVja0ZvclJlcGVhdChuZXdDb29yZHMsIHVzZWRDZWxscylcbiAgICAgICAgICAgIGlmIChyZXBlYXQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgIHVzZWRDZWxscy5wdXNoKG5ld0Nvb3Jkcyk7XG4gICAgICAgICAgICAgIFxuICAgICAgICAgICAgfSBlbHNlIGlmIChyZXBlYXQgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICByZXBlYXREZXRlY3QgPSB0cnVlXG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHJlcGVhdERldGVjdCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIGNvbXB1dGVyQm9hcmQucGxhY2VWZXJ0aWNhbFNoaXAoc3RhcnRpbmdDb29yZHNbMF0sIHN0YXJ0aW5nQ29vcmRzWzFdLCBzaGlwKTtcbiAgICAgICAgfSBlbHNlIGlmIChyZXBlYXREZXRlY3QgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHRlc3RWZXJ0aWNhbFNoaXAoc2hpcCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjaG9vc2VQbGFuZShwbGFuZXMpIHtcbiAgICAgICAgY29uc3QgY2hvc2VuSW5kZXggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBwbGFuZXMubGVuZ3RoKTtcbiAgICAgICAgcmV0dXJuIHBsYW5lc1tjaG9zZW5JbmRleF1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVIb3Jpem9udGFsU3RhcnQoc2hpcCkge1xuICAgICAgICBjb25zdCByb3cgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCkgKyAxXG4gICAgICAgIGNvbnN0IGNvbHVtbiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICgxMCAtIHNoaXAubGVuZ3RoKSkgKyAxXG4gICAgICAgIGNvbnN0IHN0YXJ0aW5nQ29vcmQgPSBbcm93LCBjb2x1bW5dO1xuICAgICAgICByZXR1cm4gc3RhcnRpbmdDb29yZFxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZVZlcnRpY2FsU3RhcnQoc2hpcCkge1xuICAgICAgICBjb25zdCByb3cgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoMTAgLSBzaGlwLmxlbmd0aCkpICsgMVxuICAgICAgICBjb25zdCBjb2x1bW4gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCkgKyAxXG4gICAgICAgIGNvbnN0IHN0YXJ0aW5nQ29vcmQgPSBbcm93LCBjb2x1bW5dO1xuICAgICAgICByZXR1cm4gc3RhcnRpbmdDb29yZFxuICAgIH1cblxuICAgIHJldHVybiB7Y3JlYXRlU2hpcENvb3JkcywgdGVzdEhvcml6b250YWxTaGlwLCB0ZXN0VmVydGljYWxTaGlwLFxuICAgICAgICBjaG9vc2VQbGFuZSwgY3JlYXRlSG9yaXpvbnRhbFN0YXJ0LCBjcmVhdGVWZXJ0aWNhbFN0YXJ0fVxufVxuXG5cbmZ1bmN0aW9uIGNoZWNrRm9yUmVwZWF0KGNvb3JkcywgYXJyYXkpIHtcbiAgICBjb25zdCBzdHJpbmdlZENvb3JkcyA9IEpTT04uc3RyaW5naWZ5KGNvb3Jkcyk7XG4gICAgY29uc3QgZXhpc3RzQm9vbGVhbiA9IGFycmF5LnNvbWUoKGNvb3JkKSA9PiBKU09OLnN0cmluZ2lmeShjb29yZCkgPT09IHN0cmluZ2VkQ29vcmRzKVxuICAgIGNvbnNvbGUubG9nKGV4aXN0c0Jvb2xlYW4pXG4gICAgcmV0dXJuIGV4aXN0c0Jvb2xlYW5cbn1cblxuZnVuY3Rpb24gc3dpdGNoUGxhbmUoY3VycmVudFBsYW5lKSB7XG4gICAgaWYgKGN1cnJlbnRQbGFuZSA9PT0gJ2hvcml6b250YWwnKSB7XG4gICAgICAgIGN1cnJlbnRQbGFuZSA9ICd2ZXJ0aWNhbCdcbiAgICB9IGVsc2UgaWYgKGN1cnJlbnRQbGFuZSA9PT0gJ3ZlcnRpY2FsJykge1xuICAgICAgICBjdXJyZW50UGxhbmUgPSAnaG9yaXpvbnRhbCdcbiAgICB9XG4gICAgcmV0dXJuIGN1cnJlbnRQbGFuZVxufTsiLCIvKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvcHJlZmVyLWRlZmF1bHQtZXhwb3J0ICovXG5pbXBvcnQgaGl0SWNvbiBmcm9tIFwiLi9pY29ucy9oaXQucG5nXCI7XG5pbXBvcnQgbWlzc0ljb24gZnJvbSBcIi4vaWNvbnMvbWlzcy5wbmdcIjtcblxuaW1wb3J0IHsgY29tcHV0ZXJQbGF5ZXIgfSBmcm9tIFwiLi9wbGF5ZXJcIjtcbmltcG9ydCB7IHJlc2V0SW50ZXJmYWNlIH0gZnJvbSBcIi4vZ2FtZUxvb3BcIjtcblxuXG5leHBvcnQgY29uc3QgZG9tTWFuaXB1bGF0aW9uID0gZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IGNvbXB1dGVyTW92ZXMgPSBjb21wdXRlclBsYXllcigpXG5cbiAgICBjb25zdCBwbGF5ZXJCb2FyZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ2FtZWJvYXJkcycpO1xuICAgIGNvbnN0IGRpYWxvZ3VlQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRpYWxvZ3VlLWNvbnRhaW5lcicpXG5cbiAgICBmdW5jdGlvbiByZW5kZXJTdGFydCgpIHtcbiAgICAgICAgY29uc3Qgc3RhcnRHYW1lQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgIGFwcGVuZEVsZW1lbnQoc3RhcnRHYW1lQnV0dG9uLCAnc3RhcnQtZ2FtZS1idXR0b24nLCBwbGF5ZXJCb2FyZHMpO1xuICAgICAgICBzdGFydEdhbWVCdXR0b24udGV4dENvbnRlbnQgPSAnU3RhcnQgRmlyaW5nISdcbiAgICAgICAgc3RhcnRHYW1lQnV0dG9uLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG5cbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZW5kZXJHYW1lQm9hcmQoYm9hcmRDb250cm9sbGVyLCBwbGF5ZXJOYW1lLCBodW1hbkJvYXJkKSB7XG4gICAgICAgIGxldCBpc0NvbXB1dGVyID0gZmFsc2U7XG4gICAgICAgIGlmIChwbGF5ZXJOYW1lID09PSAnRW5lbXknKSB7XG4gICAgICAgICAgICBpc0NvbXB1dGVyID0gdHJ1ZVxuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKGlzQ29tcHV0ZXIpO1xuXG4gICAgICAgIGNvbnN0IGdhbWVCb2FyZFdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgYXBwZW5kRWxlbWVudChnYW1lQm9hcmRXcmFwcGVyLCAnYm9hcmQtd3JhcHBlcicsIHBsYXllckJvYXJkcylcbiAgICAgICBcbiAgICAgICAgY29uc3QgYm9hcmRUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gyJyk7XG4gICAgICAgIGFwcGVuZEVsZW1lbnQoYm9hcmRUaXRsZSwgJ2JvYXJkLXRpdGxlJywgZ2FtZUJvYXJkV3JhcHBlcik7XG4gICAgICAgIGJvYXJkVGl0bGUudGV4dENvbnRlbnQgPSBwbGF5ZXJOYW1lO1xuXG4gICAgICAgIC8vIHJlbmRlciBib2FyZDpcbiAgICAgICAgY29uc3QgZ2FtZWJvYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGFwcGVuZEVsZW1lbnQoZ2FtZWJvYXJkLCAnZ2FtZWJvYXJkJywgZ2FtZUJvYXJkV3JhcHBlcik7XG5cbiAgICAgICAgYnVpbGRHcmlkKGdhbWVib2FyZCwgaXNDb21wdXRlcik7XG4gICAgICAgIFxuICAgICAgICBpZiAoaXNDb21wdXRlciA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIGNvbnN0IHJvdGF0ZVNoaXBCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgICAgIGFwcGVuZEVsZW1lbnQocm90YXRlU2hpcEJ1dHRvbiwgJ3JvdGF0ZS1zaGlwJywgZ2FtZUJvYXJkV3JhcHBlcik7XG4gICAgICAgICAgICByb3RhdGVTaGlwQnV0dG9uLnRleHRDb250ZW50ID0gJ1JvdGF0ZSc7ICAgICAgICBcblxuICAgICAgICAgICAgc2V0R3JpZFRyaWdnZXJzKGJvYXJkQ29udHJvbGxlciwgaHVtYW5Cb2FyZCk7XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGdhbWVib2FyZC5zdHlsZS5wb2ludGVyRXZlbnRzID0gJ25vbmUnXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYnVpbGRHcmlkKGdhbWVib2FyZEVsZW1lbnQsIGlzQ29tcHV0ZXIpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCAxMTsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCByb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGFwcGVuZEVsZW1lbnQocm93LCAncm93JywgZ2FtZWJvYXJkRWxlbWVudCk7XG5cbiAgICAgICAgICAgIGZvciAobGV0IGogPSAxOyBqIDwgMTE7IGorKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgICAgICBjZWxsLmNvb3JkaW5hdGVzID0gW2ksIGpdO1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGNlbGwuY29vcmRpbmF0ZXMpXG4gICAgICAgICAgICAgICAgaWYgKGlzQ29tcHV0ZXIgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgYXBwZW5kRWxlbWVudChjZWxsLCAnY2VsbC1jJywgcm93KTtcbiAgICAgICAgICAgICAgICAgICAgY2VsbC5zZXRBdHRyaWJ1dGUoJ2lkJywgYCR7aX0gJHtqfWNgKVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgYXBwZW5kRWxlbWVudChjZWxsLCAnY2VsbCcsIHJvdyk7XG4gICAgICAgICAgICAgICAgICAgY2VsbC5zZXRBdHRyaWJ1dGUoJ2lkJywgYCR7aX0gJHtqfWhgKSBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldEdyaWRUcmlnZ2Vycyhjb21wdXRlckJvYXJkQ29udHJvbGxlciwgaHVtYW5Cb2FyZENvbnRyb2xsZXIpIHtcbiAgICAgICAgY29uc3QgY2VsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2VsbC1jJyk7XG4gICAgICAgIGNlbGxzLmZvckVhY2goKGNlbGwpID0+IHtcbiAgICAgICAgICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coY2VsbC5jb29yZGluYXRlcyk7XG4gICAgICAgICAgICAgICAgY29tcHV0ZXJCb2FyZENvbnRyb2xsZXIucmVjaWV2ZUF0dGFjayhjZWxsLmNvb3JkaW5hdGVzKTtcbiAgICAgICAgICAgICAgICBjZWxsLnN0eWxlLnBvaW50ZXJFdmVudHMgPSAnbm9uZSc7XG5cbiAgICAgICAgICAgICAgICAvLyB0cmlnZ2VyIGNvbXB1dGVyJ3MgYXR0YWNrIGluIHJlc3BvbnNlXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coaHVtYW5Cb2FyZENvbnRyb2xsZXIpO1xuICAgICAgICAgICAgICAgIGNvbXB1dGVyTW92ZXMucGlja1JhbmRvbUNlbGwoaHVtYW5Cb2FyZENvbnRyb2xsZXIpO1xuXG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgICAgICAgICAgXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXNlR3JpZFNwb3QoY29vcmRzLCBzdGF0dXMsIG5hbWUpIHtcbiAgICAgICAgLy8gcmVnaXN0ZXJzIHRoYXQgdGVoIGdyaWQgc3BvdCB3YXMgdXNlZCwgYW5kIGRpc3BsYXlzXG4gICAgICAgIC8vIGVpdGhlciBhIGhpdCBvciBtaXNzXG4gICAgICAgIGNvbnN0IGF0dGFja0ljb24gPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgYXR0YWNrSWNvbi5jbGFzc0xpc3QuYWRkKCdhdHRhY2staWNvbicpO1xuXG4gICAgICAgIGlmIChuYW1lID09PSAnRW5lbXknKSB7XG4gICAgICAgICAgICBjb25zdCB1c2VkQ2VsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxuICAgICAgICAgICAgICAgIGAke2Nvb3Jkc1swXX0gJHtjb29yZHNbMV19Y2ApXG5cbiAgICAgICAgICAgIHVzZWRDZWxsLmFwcGVuZENoaWxkKGF0dGFja0ljb24pO1xuICAgICAgICAgICAgaWYgKHN0YXR1cyA9PT0gJ2hpdCcpIHtcbiAgICAgICAgICAgICAgICBhdHRhY2tJY29uLnNyYyA9IGhpdEljb25cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc3RhdHVzID09PSAnbWlzcycpIHtcbiAgICAgICAgICAgICAgICBhdHRhY2tJY29uLnNyYyA9IG1pc3NJY29uXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IHVzZWRDZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXG4gICAgICAgICAgICAgICAgYCR7Y29vcmRzWzBdfSAke2Nvb3Jkc1sxXX1oYClcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdXNlZENlbGwuYXBwZW5kQ2hpbGQoYXR0YWNrSWNvbik7XG4gICAgICAgICAgICBpZiAoc3RhdHVzID09PSAnaGl0Jykge1xuICAgICAgICAgICAgICAgIGF0dGFja0ljb24uc3JjID0gaGl0SWNvblxuICAgICAgICAgICAgfSBlbHNlIGlmIChzdGF0dXMgPT09ICdtaXNzJykge1xuICAgICAgICAgICAgICAgIGF0dGFja0ljb24uc3JjID0gbWlzc0ljb25cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZyZWV6ZUdyaWQoKSB7XG4gICAgICAgIGNvbnN0IGdhbWVib2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nYW1lYm9hcmQnKTtcbiAgICAgICAgZ2FtZWJvYXJkLnN0eWxlLnBvaW50ZXJFdmVudHMgPSAnbm9uZSc7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVuZGVyRGlhbG9ndWVCb3goKSB7XG4gICAgICAgIGNvbnN0IGRpYWxvZ3VlQm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGFwcGVuZEVsZW1lbnQoZGlhbG9ndWVCb3gsICdkaWFsb2d1ZS1ib3gnLCBkaWFsb2d1ZUNvbnRhaW5lcilcblxuICAgICAgICBjb25zdCB0ZXh0Qm94MSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICAgIGFwcGVuZEVsZW1lbnQodGV4dEJveDEsICd0ZXh0LWJveDEnLCBkaWFsb2d1ZUJveClcblxuICAgICAgICBjb25zdCB0ZXh0Qm94MiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICAgIGFwcGVuZEVsZW1lbnQodGV4dEJveDIsICd0ZXh0LWJveDInLCBkaWFsb2d1ZUJveClcblxuICAgICAgICBjb25zdCB0ZXh0Qm94MyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBhcHBlbmRFbGVtZW50KHRleHRCb3gzLCAndGV4dC1ib3gzJywgZGlhbG9ndWVCb3gpXG4gICAgfVxuXG5cbiAgICBmdW5jdGlvbiByZW5kZXJFbmRHYW1lKCkge1xuXG4gICAgICAgIGNvbnN0IHJlc2V0R2FtZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICBhcHBlbmRFbGVtZW50KHJlc2V0R2FtZUJ1dHRvbiwgJ3Jlc2V0LWdhbWUtYnV0dG9uJywgcGxheWVyQm9hcmRzKTtcbiAgICAgICAgcmVzZXRHYW1lQnV0dG9uLnRleHRDb250ZW50ID0gJ1BsYXkgQWdhaW4/J1xuXG4gICAgICAgIHJlc2V0R2FtZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIHJlc2V0SW50ZXJmYWNlKHJlc2V0R2FtZUJ1dHRvbik7XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYXBwZW5kRWxlbWVudChlbGVtZW50TmFtZSwgY2xhc3NOYW1lLCBmYXRoZXJFbGVtZW50ICkge1xuICAgICAgICBlbGVtZW50TmFtZS5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XG4gICAgICAgIGZhdGhlckVsZW1lbnQuYXBwZW5kQ2hpbGQoZWxlbWVudE5hbWUpO1xuXG4gICAgICAgIHJldHVybiBlbGVtZW50TmFtZTtcbiAgICB9XG5cbiAgICByZXR1cm4ge3JlbmRlclN0YXJ0LCByZW5kZXJHYW1lQm9hcmQsIGFwcGVuZEVsZW1lbnQsIGJ1aWxkR3JpZCxcbiAgICAgICAgc2V0R3JpZFRyaWdnZXJzLCB1c2VHcmlkU3BvdCwgZnJlZXplR3JpZCwgcmVuZGVyRGlhbG9ndWVCb3gsXG4gICAgICAgIHJlbmRlckVuZEdhbWV9XG5cbn1cblxuXG5cblxuZXhwb3J0IGNvbnN0IGRpYWxvZ3VlQ29udHJvbGxlciA9IGZ1bmN0aW9uKCkge1xuXG4gICAgZnVuY3Rpb24gIHBsYWNlU2hpcHNNZXNzYWdlKCkge1xuICAgICAgICBjb25zdCB0ZXh0Qm94MSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50ZXh0LWJveDEnKTtcbiAgICAgICAgdGV4dEJveDEudGV4dENvbnRlbnQgPSAnUGxhY2UgeW91ciBzaGlwcyBvbiB0aGUgYm9hcmQgdG8gdGhlIHJpZ2h0IHRvIGJlZ2luISdcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBiZWdpbkF0dGFja01lc3NhZ2UoKSB7XG4gICAgICAgIGNvbnN0IHRleHRCb3gxID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRleHQtYm94MScpO1xuICAgICAgICB0ZXh0Qm94MS50ZXh0Q29udGVudCA9ICdSZWFkeSB0byBBdHRhY2shISdcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtb3ZlUmVzdWx0KHN0YXR1cywgcGxheWVyTmFtZSwgY29vcmRzLCBzaGlwID0gbnVsbCkge1xuICAgICAgICBjb25zdCB0ZXh0Qm94MSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50ZXh0LWJveDEnKTtcbiAgICAgICAgY29uc3QgdGV4dEJveDIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGV4dC1ib3gyJyk7XG5cbiAgICAgICAgaWYgKHBsYXllck5hbWUgIT09ICdFbmVteScpIHtcbiAgICAgICAgICAgIGlmIChzdGF0dXMgPT09ICdoaXQnKSB7XG4gICAgICAgICAgICAgICAgdGV4dEJveDIudGV4dENvbnRlbnQgPSBgVGhlIGVuZW15IGhhcyBoaXQgeW91ciAke3NoaXAubmFtZX1cbiAgICAgICAgICAgICAgICBhdCByb3c6ICR7Y29vcmRzWzBdfSBjb2x1bW46ICR7Y29vcmRzWzFdfSFgXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHN0YXR1cyA9PT0gJ21pc3MnKSB7XG4gICAgICAgICAgICAgICAgdGV4dEJveDIudGV4dENvbnRlbnQgPSBgVGhlIGVuZW15IGF0dGFja2VkIHJvdzpcbiAgICAgICAgICAgICAgICAke2Nvb3Jkc1swXX0gY29sdW1uOiAke2Nvb3Jkc1sxXX0gYW5kIG1pc3NlZCFgXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIGlmIChwbGF5ZXJOYW1lID09PSAnRW5lbXknKSB7XG4gICAgICAgICAgICBpZiAoc3RhdHVzID09PSAnaGl0Jykge1xuICAgICAgICAgICAgICAgIHRleHRCb3gxLnRleHRDb250ZW50ID0gYFlvdSBoaXQgdGhlIGVuZW15J3MgJHtzaGlwLm5hbWV9XG4gICAgICAgICAgICAgICAgYXQgcm93OiAke2Nvb3Jkc1swXX0gY29sdW1uOiAke2Nvb3Jkc1sxXX0hYFxuICAgICAgICAgICAgfSBlbHNlIGlmIChzdGF0dXMgPT09ICdtaXNzJykge1xuICAgICAgICAgICAgICAgIHRleHRCb3gxLnRleHRDb250ZW50ID0gYFlvdSBhdHRhY2tlZCByb3c6XG4gICAgICAgICAgICAgICAgJHtjb29yZHNbMF19IGNvbHVtbjogJHtjb29yZHNbMV19IGFuZCBtaXNzZWQhYFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc3Vua1NoaXBNZXNzYWdlKHNoaXAsIG5hbWUpIHtcbiAgICAgICAgY29uc3QgdGV4dEJveDEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGV4dC1ib3gxJyk7XG4gICAgICAgIGNvbnN0IHRleHRCb3gyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRleHQtYm94MicpO1xuICAgICAgICBjb25zb2xlLmxvZyhzaGlwLCBuYW1lKVxuICAgICAgICBpZiAobmFtZSAhPT0gJ0VuZW15Jykge1xuICAgICAgICAgICAgdGV4dEJveDIudGV4dENvbnRlbnQgPSBgWW91ciAke3NoaXAubmFtZX0gaGFzIGJlZW4gc3VuayEhYFxuICAgICAgICB9IGVsc2UgaWYgKG5hbWUgPT09ICdFbmVteScpIHtcbiAgICAgICAgICAgIHRleHRCb3gxLnRleHRDb250ZW50ID0gYFlvdSBzdW5rIHRoZSBlbmVteSdzICR7c2hpcC5uYW1lfSEhYFxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBlbmRHYW1lTWVzc2FnZShuYW1lKSB7XG4gICAgICAgIGNvbnN0IHRleHRCb3gzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRleHQtYm94MycpXG4gICAgICAgIGlmIChuYW1lID09PSAnRW5lbXknKSB7XG4gICAgICAgICAgICB0ZXh0Qm94My50ZXh0Q29udGVudCA9ICdUaGUgZW5lbXkgZmxlZXQgaGFzIGJlZW4gc2Fuay4gRXhjZWxsZW50IHdvcmsgU29sZGllciEnXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0ZXh0Qm94My50ZXh0Q29udGVudCA9ICdXZSBoYXZlIGxvc3Qgb3VyIGZsZWV0IGFuZCBiZWVuIGRlZmVhdGVkLiBBYm9ydCB0aGUgbWlzc2lvbiEnXG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIHJldHVybiB7cGxhY2VTaGlwc01lc3NhZ2UsIGJlZ2luQXR0YWNrTWVzc2FnZSwgbW92ZVJlc3VsdCwgXG4gICAgICAgIHN1bmtTaGlwTWVzc2FnZSwgZW5kR2FtZU1lc3NhZ2V9XG59IiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2dldFVybC5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8wX19fID0gbmV3IFVSTChcIi4vYXNzZXRzL2JhY2tncm91bmQuanBnXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMF9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzBfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIGBodG1sLCBib2R5IHtcbiAgICBtaW4taGVpZ2h0OiAxMDAlO1xuICAgIG1pbi13aWR0aDogMTAwJTtcbiAgICBtYXJnaW46IDBweDtcbn1cblxuYm9keSB7XG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKCR7X19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMF9fX30pO1xuICAgIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xufVxuXG4ucHJvbXB0LWJveCB7XG4gICAgZGlzcGxheTogbm9uZVxufVxuXG4uZ2FtZS1jb250YWluZXIge1xuICAgIGRpc3BsYXk6IGdyaWQ7XG4gICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiAxZnIgNGZyIDEuN2ZyO1xuICAgIGhlaWdodDogMTAwdmg7XG4gICAgd2lkdGg6IDEwMHZ3O1xuICAgIC8qIGJhY2tncm91bmQtY29sb3I6IHJnYig1OSwgNTksIDU5KTsgKi9cbn1cblxuLmhlYWRlciB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIGdyaWQtcm93OiAxIC8gMjtcbiAgICBcbn1cblxuLmdhbWUtdGl0bGUge1xuICAgIGZvbnQtc2l6ZTogNjdweDtcbiAgICBtYXJnaW4tdG9wOiAxNXB4O1xuICAgIG1hcmdpbi1ib3R0b206IDE3cHg7XG4gICAgY29sb3I6IHJnYmEoNTgsIDQsIDU4LCAwLjcpO1xuICAgIHRleHQtc2hhZG93OiAwcHggMHB4IDQwcHggcmdiKDEyNywgMTIyLCAxMjIpO1xuICAgIGZvbnQtZmFtaWx5OiBcIlNpbGtzY3JlZW5cIiwgc2Fucy1zZXJpZjtcbn1cblxuLmdhbWVib2FyZHMge1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xuICAgIGdyaWQtcm93OiAyIC8gMztcbn1cblxuLmRpYWxvZ3VlLWNvbnRhaW5lciB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIGdyaWQtcm93OiAzIC8gNDtcbn1cblxuLmRpYWxvZ3VlLWJveCB7XG4gICAgbWFyZ2luLXRvcDogOHB4O1xuICAgIGhlaWdodDogMjB2aDtcbiAgICB3aWR0aDogNTB2dztcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoNzcsIDEzNCwgNzcpO1xufVxuXG5cbi8qIGdhbWVib2FyZCB3cmFwcGVyIHN0eWxpbmcgKi9cbi5ib2FyZC13cmFwcGVyIHtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgaGVpZ2h0OiAxMDAlO1xuICAgIHdpZHRoOiA0MDBweDtcbiAgICBiYWNrZ3JvdW5kOiByZ2IoMTI4LCAwLCAxMjgsIDAuNCk7XG4gICAgYm9yZGVyOiA1cHggc29saWQgcmdiKDEyOCwgMCwgMTI4KTtcbiAgICBwYWRkaW5nOiAwIDE1cHg7XG4gICAgcGFkZGluZy1ib3R0b206IDdweDtcbiAgICBib3JkZXItcmFkaXVzOiAyNXB4O1xufVxuXG4uYm9hcmQtdGl0bGUge1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICBmb250LXNpemU6IDI3cHg7XG4gICAgY29sb3I6IHJnYigyMjIsIDIyNCwgMjI1KTtcbiAgICBmb250LWZhbWlseTogXCJTaWxrc2NyZWVuXCIsIHNhbnMtc2VyaWY7XG59XG5cbi5nYW1lYm9hcmQge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICBoZWlnaHQ6IDQwMHB4O1xuICAgIHdpZHRoOiA0MDBweDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBibHVldmlvbGV0O1xufVxuXG4ucm93IHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGhlaWdodDogMTAlO1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIC8qIGJhY2tncm91bmQtY29sb3I6IHBpbms7ICovXG59XG5cbi5jZWxsIHtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBtYXJnaW46IDBweDtcbiAgICBhc3BlY3QtcmF0aW86IDE7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDIyMSwgMjQxLCAyNDEsIDAuNSk7XG4gICAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XG59XG5cbi5jZWxsLWMge1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIG1hcmdpbjogMHB4O1xuICAgIGFzcGVjdC1yYXRpbzogMTtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjIxLCAyNDEsIDI0MSwgMC41KTtcbiAgICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcbn1cblxuLmNlbGwtYzpob3ZlciB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDExNywgMTU2LCAyMTEpO1xufVxuXG4vKiBpY29ucyAqL1xuLmF0dGFjay1pY29uIHtcbiAgICBvYmplY3QtZml0OiBjb3ZlcjtcbiAgICBoZWlnaHQ6IDEwMCU7XG59XG5cblxuLyogc3R5bGluZyBmb3IgZGlhbG9ndWUgYm94ICovXG4uZGlhbG9ndWUtY29udGFpbmVyIHtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIGdyaWQtcm93OiAzIC8gNDtcbn1cblxuLmRpYWxvZ3VlLWJveCB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtZXZlbmx5O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgaGVpZ2h0OiAxOHZoO1xuICAgIHdpZHRoOiA0NXZ3O1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYig3MiwgNjEsIDEzOSwgMC44KTtcbiAgICBib3JkZXI6IDVweCBzb2xpZCByZ2IoOTEsIDIyLCA5MSwgMSk7XG4gICAgYm9yZGVyLXJhZGl1czogMjVweDtcbiAgICBtYXJnaW4tdG9wOiAyMHB4O1xufVxuXG4udGV4dC1ib3gxLCAudGV4dC1ib3gyLCAudGV4dC1ib3gzIHtcbiAgICBjb2xvcjogcmdiKDE4MywgMTgzLCAxODMpO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBoZWlnaHQ6IDV2aDtcbiAgICB3aWR0aDogNTB2dztcbiAgICBmb250LWZhbWlseTogXCJQb2Rrb3ZhXCIsIHNlcmlmO1xuICAgIGZvbnQtc2l6ZTogMjVweDtcbiAgICBmb250LXdlaWdodDogYm9sZDtcbn1cblxuXG4ucmVzZXQtZ2FtZS1idXR0b24ge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB0b3A6IDI0NXB4O1xuICAgIGxlZnQ6IDA7XG4gICAgcmlnaHQ6IDA7XG4gICAgbWFyZ2luLWxlZnQ6IGF1dG87XG4gICAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xuICAgIGhlaWdodDogMTEwcHg7XG4gICAgd2lkdGg6IDE5MHB4O1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYig3MiwgNjEsIDEzOSk7XG4gICAgYm9yZGVyOiA0cHggc29saWQgcmdiKDc0LCAzOCwgMjU0KTtcbiAgICBib3JkZXItcmFkaXVzOiAxNXB4O1xuICAgIGZvbnQtc2l6ZTogMzBweDtcbiAgICBmb250LWZhbWlseTogXCJTaWxrc2NyZWVuXCIsIHNhbnMtc2VyaWY7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIGNvbG9yOiByZ2IoMjIyLCAyMjQsIDIyNSk7XG59XG5cbi8qIHNpZ25hdHVyZSAqL1xuLnNpZ25hdHVyZSB7XG4gICAgY29sb3I6IHdoaXRlO1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBib3R0b206IDI1cHg7XG4gICAgcmlnaHQ6IDIwcHg7XG5cbn1cblxuYSB7XG4gICAgY29sb3I6IHB1cnBsZTtcbiAgICB0ZXh0LXNoYWRvdzogMHB4IDBweCAxMHB4IGJsYWNrO1xufVxuXG5cbi8qIHN0eWxpbmcgZm9yIHNoaXAgUGxhY2VtZW50ICovXG4udmFsaWQtcGxhY2VtZW50IHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTEwLCAxODksIDExMCwgMSk7XG59XG5cbi5pbnZhbGlkLXBsYWNlbWVudCB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDI0OSwgMTE2LCAxMTYsIDEpO1xufVxuXG4ucGxhY2VkIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjE0LCAxMDAsIDE2Nik7XG59XG5cbi5yb3RhdGUtc2hpcCB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHRvcDogMTVweDtcbiAgICByaWdodDogMjBweDtcbiAgICBoZWlnaHQ6IDI1cHg7XG4gICAgd2lkdGg6IDEwMHB4O1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYigyMjEsIDI0MSwgMjQxLCAxKTtcbiAgICBvcGFjaXR5OiAxO1xuICAgIGJvcmRlci1yYWRpdXM6IDIwcHg7XG4gICAgYm9yZGVyOiBub25lO1xuICAgIGZvbnQtZmFtaWx5OiBcIlNpbGtzY3JlZW5cIiwgc2Fucy1zZXJpZjtcbn1cblxuLnN0YXJ0LWdhbWUtYnV0dG9uIHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgdG9wOiAzNTBweDtcbiAgICBsZWZ0OiAwO1xuICAgIHJpZ2h0OiAwO1xuICAgIG1hcmdpbi1sZWZ0OiBhdXRvO1xuICAgIG1hcmdpbi1yaWdodDogYXV0bztcbiAgICBoZWlnaHQ6IDExMHB4O1xuICAgIHdpZHRoOiAxODBweDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoNzIsIDYxLCAxMzkpO1xuICAgIGJvcmRlcjogNHB4IHNvbGlkIHB1cnBsZTtcbiAgICBib3JkZXItcmFkaXVzOiAxNXB4O1xuICAgIGZvbnQtc2l6ZTogMzBweDtcbiAgICBmb250LXdlaWdodDogYm9sZDtcbiAgICBmb250LWZhbWlseTogXCJTaWxrc2NyZWVuXCIsIHNhbnMtc2VyaWY7XG4gICAgY29sb3I6IHJnYigyMjIsIDIyNCwgMjI1KTtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59YCwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvcGFnZVN0eWxpbmcuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0lBQ0ksZ0JBQWdCO0lBQ2hCLGVBQWU7SUFDZixXQUFXO0FBQ2Y7O0FBRUE7SUFDSSx5REFBZ0Q7SUFDaEQsc0JBQXNCO0lBQ3RCLGtCQUFrQjtBQUN0Qjs7QUFFQTtJQUNJO0FBQ0o7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsaUNBQWlDO0lBQ2pDLGFBQWE7SUFDYixZQUFZO0lBQ1osdUNBQXVDO0FBQzNDOztBQUVBO0lBQ0ksYUFBYTtJQUNiLHVCQUF1QjtJQUN2QixtQkFBbUI7SUFDbkIsZUFBZTs7QUFFbkI7O0FBRUE7SUFDSSxlQUFlO0lBQ2YsZ0JBQWdCO0lBQ2hCLG1CQUFtQjtJQUNuQiwyQkFBMkI7SUFDM0IsNENBQTRDO0lBQzVDLHFDQUFxQztBQUN6Qzs7QUFFQTtJQUNJLGtCQUFrQjtJQUNsQixhQUFhO0lBQ2IsNkJBQTZCO0lBQzdCLGVBQWU7QUFDbkI7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsdUJBQXVCO0lBQ3ZCLG1CQUFtQjtJQUNuQixlQUFlO0FBQ25COztBQUVBO0lBQ0ksZUFBZTtJQUNmLFlBQVk7SUFDWixXQUFXO0lBQ1gsa0NBQWtDO0FBQ3RDOzs7QUFHQSw4QkFBOEI7QUFDOUI7SUFDSSxrQkFBa0I7SUFDbEIsWUFBWTtJQUNaLFlBQVk7SUFDWixpQ0FBaUM7SUFDakMsa0NBQWtDO0lBQ2xDLGVBQWU7SUFDZixtQkFBbUI7SUFDbkIsbUJBQW1CO0FBQ3ZCOztBQUVBO0lBQ0ksa0JBQWtCO0lBQ2xCLGVBQWU7SUFDZix5QkFBeUI7SUFDekIscUNBQXFDO0FBQ3pDOztBQUVBO0lBQ0ksYUFBYTtJQUNiLHNCQUFzQjtJQUN0QixhQUFhO0lBQ2IsWUFBWTtJQUNaLDRCQUE0QjtBQUNoQzs7QUFFQTtJQUNJLGFBQWE7SUFDYixXQUFXO0lBQ1gsV0FBVztJQUNYLDRCQUE0QjtBQUNoQzs7QUFFQTtJQUNJLFdBQVc7SUFDWCxXQUFXO0lBQ1gsZUFBZTtJQUNmLHlDQUF5QztJQUN6Qyx1QkFBdUI7QUFDM0I7O0FBRUE7SUFDSSxXQUFXO0lBQ1gsV0FBVztJQUNYLGVBQWU7SUFDZix5Q0FBeUM7SUFDekMsdUJBQXVCO0FBQzNCOztBQUVBO0lBQ0ksb0NBQW9DO0FBQ3hDOztBQUVBLFVBQVU7QUFDVjtJQUNJLGlCQUFpQjtJQUNqQixZQUFZO0FBQ2hCOzs7QUFHQSw2QkFBNkI7QUFDN0I7SUFDSSxrQkFBa0I7SUFDbEIsYUFBYTtJQUNiLHVCQUF1QjtJQUN2QixtQkFBbUI7SUFDbkIsZUFBZTtBQUNuQjs7QUFFQTtJQUNJLGFBQWE7SUFDYixzQkFBc0I7SUFDdEIsNkJBQTZCO0lBQzdCLG1CQUFtQjtJQUNuQixZQUFZO0lBQ1osV0FBVztJQUNYLHVDQUF1QztJQUN2QyxvQ0FBb0M7SUFDcEMsbUJBQW1CO0lBQ25CLGdCQUFnQjtBQUNwQjs7QUFFQTtJQUNJLHlCQUF5QjtJQUN6QixhQUFhO0lBQ2IsdUJBQXVCO0lBQ3ZCLG1CQUFtQjtJQUNuQixXQUFXO0lBQ1gsV0FBVztJQUNYLDZCQUE2QjtJQUM3QixlQUFlO0lBQ2YsaUJBQWlCO0FBQ3JCOzs7QUFHQTtJQUNJLGtCQUFrQjtJQUNsQixVQUFVO0lBQ1YsT0FBTztJQUNQLFFBQVE7SUFDUixpQkFBaUI7SUFDakIsa0JBQWtCO0lBQ2xCLGFBQWE7SUFDYixZQUFZO0lBQ1osa0NBQWtDO0lBQ2xDLGtDQUFrQztJQUNsQyxtQkFBbUI7SUFDbkIsZUFBZTtJQUNmLHFDQUFxQztJQUNyQyxrQkFBa0I7SUFDbEIseUJBQXlCO0FBQzdCOztBQUVBLGNBQWM7QUFDZDtJQUNJLFlBQVk7SUFDWixrQkFBa0I7SUFDbEIsWUFBWTtJQUNaLFdBQVc7O0FBRWY7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsK0JBQStCO0FBQ25DOzs7QUFHQSwrQkFBK0I7QUFDL0I7SUFDSSx1Q0FBdUM7QUFDM0M7O0FBRUE7SUFDSSx1Q0FBdUM7QUFDM0M7O0FBRUE7SUFDSSxvQ0FBb0M7QUFDeEM7O0FBRUE7SUFDSSxrQkFBa0I7SUFDbEIsU0FBUztJQUNULFdBQVc7SUFDWCxZQUFZO0lBQ1osWUFBWTtJQUNaLHVDQUF1QztJQUN2QyxVQUFVO0lBQ1YsbUJBQW1CO0lBQ25CLFlBQVk7SUFDWixxQ0FBcUM7QUFDekM7O0FBRUE7SUFDSSxrQkFBa0I7SUFDbEIsVUFBVTtJQUNWLE9BQU87SUFDUCxRQUFRO0lBQ1IsaUJBQWlCO0lBQ2pCLGtCQUFrQjtJQUNsQixhQUFhO0lBQ2IsWUFBWTtJQUNaLGtDQUFrQztJQUNsQyx3QkFBd0I7SUFDeEIsbUJBQW1CO0lBQ25CLGVBQWU7SUFDZixpQkFBaUI7SUFDakIscUNBQXFDO0lBQ3JDLHlCQUF5QjtJQUN6QixrQkFBa0I7QUFDdEJcIixcInNvdXJjZXNDb250ZW50XCI6W1wiaHRtbCwgYm9keSB7XFxuICAgIG1pbi1oZWlnaHQ6IDEwMCU7XFxuICAgIG1pbi13aWR0aDogMTAwJTtcXG4gICAgbWFyZ2luOiAwcHg7XFxufVxcblxcbmJvZHkge1xcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXFxcIi4vYXNzZXRzL2JhY2tncm91bmQuanBnXFxcIik7XFxuICAgIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG59XFxuXFxuLnByb21wdC1ib3gge1xcbiAgICBkaXNwbGF5OiBub25lXFxufVxcblxcbi5nYW1lLWNvbnRhaW5lciB7XFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxuICAgIGdyaWQtdGVtcGxhdGUtcm93czogMWZyIDRmciAxLjdmcjtcXG4gICAgaGVpZ2h0OiAxMDB2aDtcXG4gICAgd2lkdGg6IDEwMHZ3O1xcbiAgICAvKiBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoNTksIDU5LCA1OSk7ICovXFxufVxcblxcbi5oZWFkZXIge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgZ3JpZC1yb3c6IDEgLyAyO1xcbiAgICBcXG59XFxuXFxuLmdhbWUtdGl0bGUge1xcbiAgICBmb250LXNpemU6IDY3cHg7XFxuICAgIG1hcmdpbi10b3A6IDE1cHg7XFxuICAgIG1hcmdpbi1ib3R0b206IDE3cHg7XFxuICAgIGNvbG9yOiByZ2JhKDU4LCA0LCA1OCwgMC43KTtcXG4gICAgdGV4dC1zaGFkb3c6IDBweCAwcHggNDBweCByZ2IoMTI3LCAxMjIsIDEyMik7XFxuICAgIGZvbnQtZmFtaWx5OiBcXFwiU2lsa3NjcmVlblxcXCIsIHNhbnMtc2VyaWY7XFxufVxcblxcbi5nYW1lYm9hcmRzIHtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcXG4gICAgZ3JpZC1yb3c6IDIgLyAzO1xcbn1cXG5cXG4uZGlhbG9ndWUtY29udGFpbmVyIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGdyaWQtcm93OiAzIC8gNDtcXG59XFxuXFxuLmRpYWxvZ3VlLWJveCB7XFxuICAgIG1hcmdpbi10b3A6IDhweDtcXG4gICAgaGVpZ2h0OiAyMHZoO1xcbiAgICB3aWR0aDogNTB2dztcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDc3LCAxMzQsIDc3KTtcXG59XFxuXFxuXFxuLyogZ2FtZWJvYXJkIHdyYXBwZXIgc3R5bGluZyAqL1xcbi5ib2FyZC13cmFwcGVyIHtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxuICAgIHdpZHRoOiA0MDBweDtcXG4gICAgYmFja2dyb3VuZDogcmdiKDEyOCwgMCwgMTI4LCAwLjQpO1xcbiAgICBib3JkZXI6IDVweCBzb2xpZCByZ2IoMTI4LCAwLCAxMjgpO1xcbiAgICBwYWRkaW5nOiAwIDE1cHg7XFxuICAgIHBhZGRpbmctYm90dG9tOiA3cHg7XFxuICAgIGJvcmRlci1yYWRpdXM6IDI1cHg7XFxufVxcblxcbi5ib2FyZC10aXRsZSB7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICAgZm9udC1zaXplOiAyN3B4O1xcbiAgICBjb2xvcjogcmdiKDIyMiwgMjI0LCAyMjUpO1xcbiAgICBmb250LWZhbWlseTogXFxcIlNpbGtzY3JlZW5cXFwiLCBzYW5zLXNlcmlmO1xcbn1cXG5cXG4uZ2FtZWJvYXJkIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgaGVpZ2h0OiA0MDBweDtcXG4gICAgd2lkdGg6IDQwMHB4O1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBibHVldmlvbGV0O1xcbn1cXG5cXG4ucm93IHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgaGVpZ2h0OiAxMCU7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICAvKiBiYWNrZ3JvdW5kLWNvbG9yOiBwaW5rOyAqL1xcbn1cXG5cXG4uY2VsbCB7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBtYXJnaW46IDBweDtcXG4gICAgYXNwZWN0LXJhdGlvOiAxO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjIxLCAyNDEsIDI0MSwgMC41KTtcXG4gICAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XFxufVxcblxcbi5jZWxsLWMge1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgbWFyZ2luOiAwcHg7XFxuICAgIGFzcGVjdC1yYXRpbzogMTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDIyMSwgMjQxLCAyNDEsIDAuNSk7XFxuICAgIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xcbn1cXG5cXG4uY2VsbC1jOmhvdmVyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDExNywgMTU2LCAyMTEpO1xcbn1cXG5cXG4vKiBpY29ucyAqL1xcbi5hdHRhY2staWNvbiB7XFxuICAgIG9iamVjdC1maXQ6IGNvdmVyO1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxufVxcblxcblxcbi8qIHN0eWxpbmcgZm9yIGRpYWxvZ3VlIGJveCAqL1xcbi5kaWFsb2d1ZS1jb250YWluZXIge1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBncmlkLXJvdzogMyAvIDQ7XFxufVxcblxcbi5kaWFsb2d1ZS1ib3gge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWV2ZW5seTtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgaGVpZ2h0OiAxOHZoO1xcbiAgICB3aWR0aDogNDV2dztcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDcyLCA2MSwgMTM5LCAwLjgpO1xcbiAgICBib3JkZXI6IDVweCBzb2xpZCByZ2IoOTEsIDIyLCA5MSwgMSk7XFxuICAgIGJvcmRlci1yYWRpdXM6IDI1cHg7XFxuICAgIG1hcmdpbi10b3A6IDIwcHg7XFxufVxcblxcbi50ZXh0LWJveDEsIC50ZXh0LWJveDIsIC50ZXh0LWJveDMge1xcbiAgICBjb2xvcjogcmdiKDE4MywgMTgzLCAxODMpO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgaGVpZ2h0OiA1dmg7XFxuICAgIHdpZHRoOiA1MHZ3O1xcbiAgICBmb250LWZhbWlseTogXFxcIlBvZGtvdmFcXFwiLCBzZXJpZjtcXG4gICAgZm9udC1zaXplOiAyNXB4O1xcbiAgICBmb250LXdlaWdodDogYm9sZDtcXG59XFxuXFxuXFxuLnJlc2V0LWdhbWUtYnV0dG9uIHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB0b3A6IDI0NXB4O1xcbiAgICBsZWZ0OiAwO1xcbiAgICByaWdodDogMDtcXG4gICAgbWFyZ2luLWxlZnQ6IGF1dG87XFxuICAgIG1hcmdpbi1yaWdodDogYXV0bztcXG4gICAgaGVpZ2h0OiAxMTBweDtcXG4gICAgd2lkdGg6IDE5MHB4O1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoNzIsIDYxLCAxMzkpO1xcbiAgICBib3JkZXI6IDRweCBzb2xpZCByZ2IoNzQsIDM4LCAyNTQpO1xcbiAgICBib3JkZXItcmFkaXVzOiAxNXB4O1xcbiAgICBmb250LXNpemU6IDMwcHg7XFxuICAgIGZvbnQtZmFtaWx5OiBcXFwiU2lsa3NjcmVlblxcXCIsIHNhbnMtc2VyaWY7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICAgY29sb3I6IHJnYigyMjIsIDIyNCwgMjI1KTtcXG59XFxuXFxuLyogc2lnbmF0dXJlICovXFxuLnNpZ25hdHVyZSB7XFxuICAgIGNvbG9yOiB3aGl0ZTtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICBib3R0b206IDI1cHg7XFxuICAgIHJpZ2h0OiAyMHB4O1xcblxcbn1cXG5cXG5hIHtcXG4gICAgY29sb3I6IHB1cnBsZTtcXG4gICAgdGV4dC1zaGFkb3c6IDBweCAwcHggMTBweCBibGFjaztcXG59XFxuXFxuXFxuLyogc3R5bGluZyBmb3Igc2hpcCBQbGFjZW1lbnQgKi9cXG4udmFsaWQtcGxhY2VtZW50IHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDExMCwgMTg5LCAxMTAsIDEpO1xcbn1cXG5cXG4uaW52YWxpZC1wbGFjZW1lbnQge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjQ5LCAxMTYsIDExNiwgMSk7XFxufVxcblxcbi5wbGFjZWQge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjE0LCAxMDAsIDE2Nik7XFxufVxcblxcbi5yb3RhdGUtc2hpcCB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdG9wOiAxNXB4O1xcbiAgICByaWdodDogMjBweDtcXG4gICAgaGVpZ2h0OiAyNXB4O1xcbiAgICB3aWR0aDogMTAwcHg7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYigyMjEsIDI0MSwgMjQxLCAxKTtcXG4gICAgb3BhY2l0eTogMTtcXG4gICAgYm9yZGVyLXJhZGl1czogMjBweDtcXG4gICAgYm9yZGVyOiBub25lO1xcbiAgICBmb250LWZhbWlseTogXFxcIlNpbGtzY3JlZW5cXFwiLCBzYW5zLXNlcmlmO1xcbn1cXG5cXG4uc3RhcnQtZ2FtZS1idXR0b24ge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHRvcDogMzUwcHg7XFxuICAgIGxlZnQ6IDA7XFxuICAgIHJpZ2h0OiAwO1xcbiAgICBtYXJnaW4tbGVmdDogYXV0bztcXG4gICAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xcbiAgICBoZWlnaHQ6IDExMHB4O1xcbiAgICB3aWR0aDogMTgwcHg7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYig3MiwgNjEsIDEzOSk7XFxuICAgIGJvcmRlcjogNHB4IHNvbGlkIHB1cnBsZTtcXG4gICAgYm9yZGVyLXJhZGl1czogMTVweDtcXG4gICAgZm9udC1zaXplOiAzMHB4O1xcbiAgICBmb250LXdlaWdodDogYm9sZDtcXG4gICAgZm9udC1mYW1pbHk6IFxcXCJTaWxrc2NyZWVuXFxcIiwgc2Fucy1zZXJpZjtcXG4gICAgY29sb3I6IHJnYigyMjIsIDIyNCwgMjI1KTtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbn1cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107XG5cbiAgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07XG5cbiAgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodXJsLCBvcHRpb25zKSB7XG4gIGlmICghb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSB7fTtcbiAgfVxuICBpZiAoIXVybCkge1xuICAgIHJldHVybiB1cmw7XG4gIH1cbiAgdXJsID0gU3RyaW5nKHVybC5fX2VzTW9kdWxlID8gdXJsLmRlZmF1bHQgOiB1cmwpO1xuXG4gIC8vIElmIHVybCBpcyBhbHJlYWR5IHdyYXBwZWQgaW4gcXVvdGVzLCByZW1vdmUgdGhlbVxuICBpZiAoL15bJ1wiXS4qWydcIl0kLy50ZXN0KHVybCkpIHtcbiAgICB1cmwgPSB1cmwuc2xpY2UoMSwgLTEpO1xuICB9XG4gIGlmIChvcHRpb25zLmhhc2gpIHtcbiAgICB1cmwgKz0gb3B0aW9ucy5oYXNoO1xuICB9XG5cbiAgLy8gU2hvdWxkIHVybCBiZSB3cmFwcGVkP1xuICAvLyBTZWUgaHR0cHM6Ly9kcmFmdHMuY3Nzd2cub3JnL2Nzcy12YWx1ZXMtMy8jdXJsc1xuICBpZiAoL1tcIicoKSBcXHRcXG5dfCglMjApLy50ZXN0KHVybCkgfHwgb3B0aW9ucy5uZWVkUXVvdGVzKSB7XG4gICAgcmV0dXJuIFwiXFxcIlwiLmNvbmNhdCh1cmwucmVwbGFjZSgvXCIvZywgJ1xcXFxcIicpLnJlcGxhY2UoL1xcbi9nLCBcIlxcXFxuXCIpLCBcIlxcXCJcIik7XG4gIH1cbiAgcmV0dXJuIHVybDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vcGFnZVN0eWxpbmcuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9wYWdlU3R5bGluZy5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gdXBkYXRlcjtcbn1cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTtcblxuICAgIC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuICBjc3MgKz0gb2JqLmNzcztcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfVxuXG4gIC8vIEZvciBvbGQgSUVcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHJldHVybiB7XG4gICAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZSgpIHt9LFxuICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7fVxuICAgIH07XG4gIH1cbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJ2YXIgc2NyaXB0VXJsO1xuaWYgKF9fd2VicGFja19yZXF1aXJlX18uZy5pbXBvcnRTY3JpcHRzKSBzY3JpcHRVcmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcubG9jYXRpb24gKyBcIlwiO1xudmFyIGRvY3VtZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmRvY3VtZW50O1xuaWYgKCFzY3JpcHRVcmwgJiYgZG9jdW1lbnQpIHtcblx0aWYgKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQpXG5cdFx0c2NyaXB0VXJsID0gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmM7XG5cdGlmICghc2NyaXB0VXJsKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRpZihzY3JpcHRzLmxlbmd0aCkge1xuXHRcdFx0dmFyIGkgPSBzY3JpcHRzLmxlbmd0aCAtIDE7XG5cdFx0XHR3aGlsZSAoaSA+IC0xICYmICghc2NyaXB0VXJsIHx8ICEvXmh0dHAocz8pOi8udGVzdChzY3JpcHRVcmwpKSkgc2NyaXB0VXJsID0gc2NyaXB0c1tpLS1dLnNyYztcblx0XHR9XG5cdH1cbn1cbi8vIFdoZW4gc3VwcG9ydGluZyBicm93c2VycyB3aGVyZSBhbiBhdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIHlvdSBtdXN0IHNwZWNpZnkgYW4gb3V0cHV0LnB1YmxpY1BhdGggbWFudWFsbHkgdmlhIGNvbmZpZ3VyYXRpb25cbi8vIG9yIHBhc3MgYW4gZW1wdHkgc3RyaW5nIChcIlwiKSBhbmQgc2V0IHRoZSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyB2YXJpYWJsZSBmcm9tIHlvdXIgY29kZSB0byB1c2UgeW91ciBvd24gbG9naWMuXG5pZiAoIXNjcmlwdFVybCkgdGhyb3cgbmV3IEVycm9yKFwiQXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXJcIik7XG5zY3JpcHRVcmwgPSBzY3JpcHRVcmwucmVwbGFjZSgvIy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcPy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcL1teXFwvXSskLywgXCIvXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gc2NyaXB0VXJsOyIsIl9fd2VicGFja19yZXF1aXJlX18uYiA9IGRvY3VtZW50LmJhc2VVUkkgfHwgc2VsZi5sb2NhdGlvbi5ocmVmO1xuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwibWFpblwiOiAwXG59O1xuXG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG4vLyBubyBvbiBjaHVua3MgbG9hZGVkXG5cbi8vIG5vIGpzb25wIGZ1bmN0aW9uIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5uYyA9IHVuZGVmaW5lZDsiLCJpbXBvcnQgJy4vcGFnZVN0eWxpbmcuY3NzJztcbmltcG9ydCB7IGdhbWVCb2FyZENvbnRyb2xsZXIgfSBmcm9tIFwiLi9nYW1lYm9hcmRDb250cm9sbGVyXCI7XG5pbXBvcnQgeyBpbml0aWFsaXplR2FtZSB9IGZyb20gXCIuL2dhbWVMb29wXCI7XG5cblxuXG5pbml0aWFsaXplR2FtZSgpIl0sIm5hbWVzIjpbIlBsYXllciIsImdhbWVCb2FyZENvbnRyb2xsZXIiLCJjcmVhdGVGbGVldCIsImNyZWF0ZU9wcEZsZWV0IiwiZG9tTWFuaXB1bGF0aW9uIiwiZGlhbG9ndWVDb250cm9sbGVyIiwiaHVtYW5TaGlwUGxhY2VtZW50IiwiY29tcHV0ZXJQbGFjZW1lbnQiLCJpbml0aWFsaXplR2FtZSIsImNyZWF0ZUdhbWUiLCJydW5ET00iLCJodW1hblBsYXllciIsImh1bWFuRmxlZXQiLCJjb25zb2xlIiwibG9nIiwiZ2FtZUJvYXJkIiwicGxheWVyIiwiaHVtYW5Cb2FyZCIsImNyZWF0ZUJvYXJkIiwiQUlwbGF5ZXIiLCJjb21wdXRlckZsZWV0IiwiY29tcHV0ZXJCb2FyZCIsInJlbmRlclN0YXJ0IiwicmVuZGVyR2FtZUJvYXJkIiwiY3JlYXREaWFsb2d1ZSIsInJlbmRlckRpYWxvZ3VlQm94IiwiZGlhbG9ndWUiLCJwbGFjZVNoaXBzTWVzc2FnZSIsImNvbXB1dGVyUGxhY2VtZW50cyIsImh1bWFuUGxhY2VtZW50IiwicmVzZXRJbnRlcmZhY2UiLCJyZXNldEJ1dHRvbiIsInBsYXllckJvYXJkcyIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImRpYWxvZ3VlQ29udGFpbmVyIiwiZGlhbG9ndWVCb3giLCJnYW1lQm9hcmRXcmFwcGVycyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJmb3JFYWNoIiwiZWxlbWVudCIsInJlbW92ZUNoaWxkIiwiZGlhbG9ndWVSZWZyZXNoIiwiZmxlZXQiLCJuYW1lIiwicGxheWVyTmFtZSIsImJvYXJkIiwic2hpcHMiLCJpIiwiaiIsInBsYWNlSG9yaXpvbnRhbFNoaXAiLCJyb3ciLCJjb2wiLCJzaGlwIiwibGVuZ3RoIiwibmV3Q29vcmRzIiwiY29vcmRzIiwicHVzaCIsInBsYWNlVmVydGljYWxTaGlwIiwicmVjaWV2ZUF0dGFjayIsImF0dGFja1N0YXR1cyIsImNoZWNrSWZVc2VkIiwiY29vcmQiLCJoaXQiLCJ1cGRhdGVCb2FyZFNwb3QiLCJtb3ZlUmVzdWx0Iiwic3Vua0NoZWNrIiwiY2hlY2tJZlN1bmsiLCJzdW5rU2hpcE1lc3NhZ2UiLCJzcGxpY2UiLCJjaGVja0FsbFN1bmsiLCJlbmRHYW1lTWVzc2FnZSIsImVuZEdhbWUiLCJ1c2VHcmlkU3BvdCIsImZyZWV6ZUdyaWQiLCJyZW5kZXJFbmRHYW1lIiwiY29uc3RydWN0b3IiLCJ1c2VyUGxheWVyIiwiY29tcHV0ZXJQbGF5ZXIiLCJ2aXNpdGVkIiwicGlja1JhbmRvbUNlbGwiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJjb2x1bW4iLCJjb21wQ29vcmRzIiwicmVwZWF0Qm9vbGVhbiIsImNoZWNrUmVwZWF0Q2VsbCIsInN0cmluZ2VkQ29vcmRzIiwiSlNPTiIsInN0cmluZ2lmeSIsImV4aXN0c0Jvb2xlYW4iLCJzb21lIiwiU2hpcCIsImhpdHMiLCJpc1N1bmsiLCJjYXJyaWVyIiwiYmF0dGxlc2hpcCIsImRlc3Ryb3llciIsInN1Ym1hcmluZSIsInBhdHJvbEJvYXQiLCJyb3RhdGVCdXR0b24iLCJzdGFydEJ1dHRvbiIsImRpYWxvZ3VlUnVuIiwib2NjdXBpZWRDZWxscyIsImN1cnJlbnRQbGFuZSIsImNyZWF0ZVJvdGF0aW9uQWJpbGl0eSIsImh1bWFuQ2VsbHMiLCJzaGlwSW5kZXgiLCJjZWxsIiwiYWRkRXZlbnRMaXN0ZW5lciIsImNlbGxIb3ZlciIsImNsYXNzTGlzdCIsImNvbnRhaW5zIiwicGxhY2VIb3Jpem9udGFsbHkiLCJjb29yZGluYXRlcyIsImFjdGl2ZUNlbGxzIiwic3RhcnRCdXR0b25FbWVyZ2UiLCJwbGFjZVZlcnRpY2FsbHkiLCJjZWxsQ29vcmRzIiwiZ3JvdXBlZENlbGxzIiwiY2VsbFJvdyIsImNlbGxDb2x1bW4iLCJhY3RpdmVDZWxsIiwiZ2V0RWxlbWVudEJ5SWQiLCJjb25mbGljdGluZyIsImNoZWNrQ29uZmxpY3RpbmdTaGlwcyIsImVsZW0iLCJhZGQiLCJyZW1vdmUiLCJhbHJlYWR5VXNlZCIsImNoZWNrRm9yUmVwZWF0IiwibmV3UGxhbmUiLCJzd2l0Y2hQbGFuZSIsInN0eWxlIiwiZGlzcGxheSIsImJlZ2luQXR0YWNrTWVzc2FnZSIsInBvaW50ZXJFdmVudHMiLCJwbGFuZXMiLCJ1c2VkQ2VsbHMiLCJjcmVhdGVTaGlwQ29vcmRzIiwiY2hvc2VuUGxhbmUiLCJjaG9vc2VQbGFuZSIsInRlc3RIb3Jpem9udGFsU2hpcCIsInRlc3RWZXJ0aWNhbFNoaXAiLCJzdGFydGluZ0Nvb3JkcyIsImNyZWF0ZUhvcml6b250YWxTdGFydCIsImZpcnN0UmVwZWF0IiwicmVwZWF0RGV0ZWN0IiwicmVwZWF0IiwiY3JlYXRlVmVydGljYWxTdGFydCIsImNob3NlbkluZGV4Iiwic3RhcnRpbmdDb29yZCIsImFycmF5IiwiaGl0SWNvbiIsIm1pc3NJY29uIiwiY29tcHV0ZXJNb3ZlcyIsInN0YXJ0R2FtZUJ1dHRvbiIsImNyZWF0ZUVsZW1lbnQiLCJhcHBlbmRFbGVtZW50IiwidGV4dENvbnRlbnQiLCJib2FyZENvbnRyb2xsZXIiLCJpc0NvbXB1dGVyIiwiZ2FtZUJvYXJkV3JhcHBlciIsImJvYXJkVGl0bGUiLCJnYW1lYm9hcmQiLCJidWlsZEdyaWQiLCJyb3RhdGVTaGlwQnV0dG9uIiwic2V0R3JpZFRyaWdnZXJzIiwiZ2FtZWJvYXJkRWxlbWVudCIsInNldEF0dHJpYnV0ZSIsImNvbXB1dGVyQm9hcmRDb250cm9sbGVyIiwiaHVtYW5Cb2FyZENvbnRyb2xsZXIiLCJjZWxscyIsInN0YXR1cyIsImF0dGFja0ljb24iLCJJbWFnZSIsInVzZWRDZWxsIiwiYXBwZW5kQ2hpbGQiLCJzcmMiLCJ0ZXh0Qm94MSIsInRleHRCb3gyIiwidGV4dEJveDMiLCJyZXNldEdhbWVCdXR0b24iLCJlbGVtZW50TmFtZSIsImNsYXNzTmFtZSIsImZhdGhlckVsZW1lbnQiLCJhcmd1bWVudHMiLCJ1bmRlZmluZWQiXSwic291cmNlUm9vdCI6IiJ9