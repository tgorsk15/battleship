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
      console.log('start!');
      gameBoard.style.pointerEvents = 'auto';
      playerBoards.removeChild(startButton);
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
    if (name === 'Player 2') {
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
    const bodyElement = document.body;
    const endGameBox = document.createElement('div');
    appendElement(endGameBox, 'end-game-box', bodyElement);
    const endGameIcon = document.createElement('div');
    appendElement(endGameIcon, 'end-game-icon', endGameBox);
    const resetGameButton = document.createElement('button');
    appendElement(resetGameButton, 'reset-game-button', endGameBox);
    resetGameButton.addEventListener('click', () => {
      (0,_gameLoop__WEBPACK_IMPORTED_MODULE_3__.resetInterface)(bodyElement, endGameBox);
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

/* icons */
.attack-icon {
    object-fit: cover;
    height: 100%;
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
}`, "",{"version":3,"sources":["webpack://./src/pageStyling.css"],"names":[],"mappings":"AAAA;IACI,gBAAgB;IAChB,eAAe;IACf,WAAW;AACf;;AAEA;IACI,sBAAsB;IACtB,kBAAkB;AACtB;;AAEA;IACI;AACJ;;AAEA;IACI,aAAa;IACb,iCAAiC;IACjC,aAAa;IACb,YAAY;IACZ,iCAAiC;AACrC;;AAEA;IACI,aAAa;IACb,uBAAuB;IACvB,mBAAmB;IACnB,eAAe;AACnB;;AAEA;IACI,eAAe;IACf,gBAAgB;IAChB,mBAAmB;AACvB;;AAEA;IACI,kBAAkB;IAClB,aAAa;IACb,6BAA6B;IAC7B,eAAe;IACf,oCAAoC;AACxC;;AAEA;IACI,aAAa;IACb,uBAAuB;IACvB,mBAAmB;IACnB,eAAe;AACnB;;AAEA;IACI,YAAY;IACZ,WAAW;IACX,kCAAkC;AACtC;;;AAGA,8BAA8B;AAC9B;IACI,kBAAkB;IAClB,YAAY;IACZ,YAAY;IACZ,wBAAwB;IACxB,eAAe;AACnB;;AAEA;;AAEA;;AAEA;IACI,aAAa;IACb,sBAAsB;IACtB,aAAa;IACb,YAAY;IACZ,4BAA4B;AAChC;;AAEA;IACI,aAAa;IACb,WAAW;IACX,WAAW;IACX,sBAAsB;AAC1B;;AAEA;IACI,WAAW;IACX,WAAW;IACX,eAAe;IACf,oCAAoC;IACpC,uBAAuB;AAC3B;;AAEA;IACI,WAAW;IACX,WAAW;IACX,eAAe;IACf,oCAAoC;IACpC,uBAAuB;AAC3B;;AAEA;IACI,8BAA8B;AAClC;;AAEA,UAAU;AACV;IACI,iBAAiB;IACjB,YAAY;AAChB;;;AAGA,6BAA6B;AAC7B;IACI,aAAa;IACb,uBAAuB;IACvB,mBAAmB;IACnB,eAAe;AACnB;;AAEA;IACI,aAAa;IACb,sBAAsB;IACtB,6BAA6B;IAC7B,mBAAmB;IACnB,YAAY;IACZ,WAAW;IACX,kCAAkC;AACtC;;AAEA;IACI,WAAW;IACX,WAAW;IACX,2BAA2B;IAC3B,eAAe;IACf,kBAAkB;AACtB;;;;AAIA,2BAA2B;AAC3B;IACI,kBAAkB;IAClB,aAAa;IACb,uBAAuB;IACvB,mBAAmB;IACnB,UAAU;IACV,OAAO;IACP,QAAQ;IACR,iBAAiB;IACjB,kBAAkB;IAClB,YAAY;IACZ,aAAa;IACb,uBAAuB;AAC3B;;AAEA;IACI,YAAY;IACZ,WAAW;IACX,kCAAkC;AACtC;;;AAGA,+BAA+B;AAC/B;IACI,oCAAoC;AACxC;;AAEA;IACI,oCAAoC;AACxC;;AAEA;IACI,kCAAkC;AACtC;;AAEA;IACI,kBAAkB;IAClB,SAAS;IACT,WAAW;IACX,YAAY;IACZ,WAAW;IACX,8BAA8B;AAClC;;AAEA;IACI,kBAAkB;IAClB,UAAU;IACV,OAAO;IACP,QAAQ;IACR,iBAAiB;IACjB,kBAAkB;IAClB,YAAY;IACZ,YAAY;IACZ,wBAAwB;AAC5B","sourcesContent":["html, body {\n    min-height: 100%;\n    min-width: 100%;\n    margin: 0px;\n}\n\nbody {\n    background-color: navy;\n    position: relative;\n}\n\n.prompt-box {\n    display: none\n}\n\n.game-container {\n    display: grid;\n    grid-template-rows: 1fr 4fr 1.7fr;\n    height: 100vh;\n    width: 100vw;\n    background-color: rgb(59, 59, 59);\n}\n\n.header {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    grid-row: 1 / 2;\n}\n\n.game-title {\n    font-size: 67px;\n    margin-top: 20px;\n    margin-bottom: 10px;\n}\n\n.gameboards {\n    position: relative;\n    display: flex;\n    justify-content: space-around;\n    grid-row: 2 / 3;\n    background-color: rgb(114, 155, 155);\n}\n\n.dialogue-container {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    grid-row: 3 / 4;\n}\n\n.dialogue-box {\n    height: 20vh;\n    width: 50vw;\n    background-color: rgb(77, 134, 77);\n}\n\n\n/* gameboard wrapper styling */\n.board-wrapper {\n    position: relative;\n    height: 100%;\n    width: 400px;\n    background-color: bisque;\n    padding: 0 15px;\n}\n\n.board-title {\n\n}\n\n.gameboard {\n    display: flex;\n    flex-direction: column;\n    height: 400px;\n    width: 400px;\n    background-color: blueviolet;\n}\n\n.row {\n    display: flex;\n    height: 10%;\n    width: 100%;\n    background-color: pink;\n}\n\n.cell {\n    width: 100%;\n    margin: 0px;\n    aspect-ratio: 1;\n    background-color: rgb(221, 241, 241);\n    border: 1px solid black;\n}\n\n.cell-c {\n    width: 100%;\n    margin: 0px;\n    aspect-ratio: 1;\n    background-color: rgb(221, 241, 241);\n    border: 1px solid black;\n}\n\n.cell-c:hover {\n    background-color: antiquewhite;\n}\n\n/* icons */\n.attack-icon {\n    object-fit: cover;\n    height: 100%;\n}\n\n\n/* styling for dialogue box */\n.dialogue-container {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    grid-row: 3 / 4;\n}\n\n.dialogue-box {\n    display: flex;\n    flex-direction: column;\n    justify-content: space-evenly;\n    align-items: center;\n    height: 20vh;\n    width: 55vw;\n    background-color: rgb(77, 134, 77);\n}\n\n.text-box1, .text-box2, .text-box3 {\n    height: 5vh;\n    width: 50vw;\n    background-color: lightblue;\n    font-size: 25px;\n    text-align: center;\n}\n\n\n\n/* styling for reset game */\n.end-game-box {\n    position: absolute;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    top: 245px;\n    left: 0;\n    right: 0;\n    margin-left: auto;\n    margin-right: auto;\n    width: 220px;\n    height: 220px;\n    background-color: azure;\n}\n\n.reset-game-button {\n    height: 50px;\n    width: 50px;\n    background-color: rgb(144, 58, 58);\n}\n\n\n/* styling for ship Placement */\n.valid-placement {\n    background-color: rgb(110, 189, 110);\n}\n\n.invalid-placement {\n    background-color: rgb(249, 116, 116);\n}\n\n.placed {\n    background-color: rgb(76, 76, 110);\n}\n\n.rotate-ship {\n    position: absolute;\n    top: 15px;\n    right: 20px;\n    height: 25px;\n    width: 60px;\n    /* border: 2px solid orange; */\n}\n\n.start-game-button {\n    position: absolute;\n    top: 350px;\n    left: 0;\n    right: 0;\n    margin-left: auto;\n    margin-right: auto;\n    height: 25px;\n    width: 110px;\n    border: 2px solid orange;\n}"],"sourceRoot":""}]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQztBQUNqQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsT0FBTyxzRkFBc0YsWUFBWSxXQUFXLFVBQVUsTUFBTSxLQUFLLFlBQVksYUFBYSxPQUFPLEtBQUssS0FBSyxNQUFNLEtBQUssVUFBVSxZQUFZLFdBQVcsVUFBVSxZQUFZLE9BQU8sS0FBSyxVQUFVLFlBQVksYUFBYSxXQUFXLE9BQU8sS0FBSyxVQUFVLFlBQVksYUFBYSxPQUFPLEtBQUssWUFBWSxXQUFXLFlBQVksV0FBVyxZQUFZLE9BQU8sS0FBSyxVQUFVLFlBQVksYUFBYSxXQUFXLE9BQU8sS0FBSyxVQUFVLFVBQVUsWUFBWSxRQUFRLFlBQVksTUFBTSxZQUFZLFdBQVcsVUFBVSxZQUFZLFdBQVcsT0FBTyxNQUFNLE1BQU0sS0FBSyxVQUFVLFlBQVksV0FBVyxVQUFVLFlBQVksT0FBTyxLQUFLLFVBQVUsVUFBVSxVQUFVLFlBQVksT0FBTyxLQUFLLFVBQVUsVUFBVSxVQUFVLFlBQVksYUFBYSxPQUFPLEtBQUssVUFBVSxVQUFVLFVBQVUsWUFBWSxhQUFhLE9BQU8sS0FBSyxZQUFZLE9BQU8sVUFBVSxLQUFLLFlBQVksV0FBVyxRQUFRLFlBQVksTUFBTSxVQUFVLFlBQVksYUFBYSxXQUFXLE9BQU8sS0FBSyxVQUFVLFlBQVksYUFBYSxhQUFhLFdBQVcsVUFBVSxZQUFZLE9BQU8sS0FBSyxVQUFVLFVBQVUsWUFBWSxXQUFXLFlBQVksU0FBUyxZQUFZLE1BQU0sWUFBWSxXQUFXLFlBQVksYUFBYSxXQUFXLFVBQVUsVUFBVSxZQUFZLGFBQWEsV0FBVyxVQUFVLFlBQVksT0FBTyxLQUFLLFVBQVUsVUFBVSxZQUFZLFFBQVEsWUFBWSxNQUFNLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksV0FBVyxVQUFVLFVBQVUsVUFBVSxZQUFZLE9BQU8sS0FBSyxZQUFZLFdBQVcs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V0FDQTtXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsR0FBRztXQUNIO1dBQ0E7V0FDQSxDQUFDOzs7OztXQ1BEOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7V0NOQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7Ozs7V0NsQkE7Ozs7Ozs7Ozs7Ozs7O0FDQTJCO0FBQ2lDO0FBQ2hCO0FBSTVDakUseURBQWMsQ0FBQyxDQUFDLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tYWluLXRlbXBsYXRlLy4vc3JjL2dhbWVMb29wLmpzIiwid2VicGFjazovL21haW4tdGVtcGxhdGUvLi9zcmMvZ2FtZWJvYXJkQ29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly9tYWluLXRlbXBsYXRlLy4vc3JjL3BsYXllci5qcyIsIndlYnBhY2s6Ly9tYWluLXRlbXBsYXRlLy4vc3JjL3NoaXAtb2JqZWN0LmpzIiwid2VicGFjazovL21haW4tdGVtcGxhdGUvLi9zcmMvc2hpcFBsYWNlbWVudC5qcyIsIndlYnBhY2s6Ly9tYWluLXRlbXBsYXRlLy4vc3JjL3VzZXJJbnRlcmZhY2UuanMiLCJ3ZWJwYWNrOi8vbWFpbi10ZW1wbGF0ZS8uL3NyYy9wYWdlU3R5bGluZy5jc3MiLCJ3ZWJwYWNrOi8vbWFpbi10ZW1wbGF0ZS8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vbWFpbi10ZW1wbGF0ZS8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL21haW4tdGVtcGxhdGUvLi9zcmMvcGFnZVN0eWxpbmcuY3NzP2E5YjciLCJ3ZWJwYWNrOi8vbWFpbi10ZW1wbGF0ZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9tYWluLXRlbXBsYXRlLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly9tYWluLXRlbXBsYXRlLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL21haW4tdGVtcGxhdGUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vbWFpbi10ZW1wbGF0ZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL21haW4tdGVtcGxhdGUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly9tYWluLXRlbXBsYXRlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL21haW4tdGVtcGxhdGUvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vbWFpbi10ZW1wbGF0ZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbWFpbi10ZW1wbGF0ZS93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL21haW4tdGVtcGxhdGUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9tYWluLXRlbXBsYXRlL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbWFpbi10ZW1wbGF0ZS93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly9tYWluLXRlbXBsYXRlL3dlYnBhY2svcnVudGltZS9ub25jZSIsIndlYnBhY2s6Ly9tYWluLXRlbXBsYXRlLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9wcmVmZXItZGVmYXVsdC1leHBvcnQgKi9cbmltcG9ydCB7IFBsYXllciB9IGZyb20gXCIuL3BsYXllclwiO1xuaW1wb3J0IHsgZ2FtZUJvYXJkQ29udHJvbGxlciB9IGZyb20gXCIuL2dhbWVib2FyZENvbnRyb2xsZXJcIjtcbmltcG9ydCB7IGNyZWF0ZUZsZWV0LCBjcmVhdGVPcHBGbGVldCB9IGZyb20gXCIuL3NoaXAtb2JqZWN0XCI7XG5pbXBvcnQgeyBkb21NYW5pcHVsYXRpb24sIGRpYWxvZ3VlQ29udHJvbGxlciB9IGZyb20gXCIuL3VzZXJJbnRlcmZhY2VcIjtcbmltcG9ydCB7IGh1bWFuU2hpcFBsYWNlbWVudCwgY29tcHV0ZXJQbGFjZW1lbnQgfSBmcm9tIFwiLi9zaGlwUGxhY2VtZW50XCI7XG5cbmV4cG9ydCBjb25zdCBpbml0aWFsaXplR2FtZSA9IGZ1bmN0aW9uIGNyZWF0ZUdhbWUoKSB7XG4gICAgY29uc3QgcnVuRE9NID0gZG9tTWFuaXB1bGF0aW9uKCk7XG5cblxuICAgIGNvbnN0IGh1bWFuUGxheWVyID0gbmV3IFBsYXllcignUGxheWVyIDEnKVxuICAgIGNvbnN0IGh1bWFuRmxlZXQgPSBjcmVhdGVGbGVldCgpXG4gICAgY29uc29sZS5sb2coaHVtYW5GbGVldClcbiAgICBodW1hblBsYXllci5nYW1lQm9hcmQgPSBnYW1lQm9hcmRDb250cm9sbGVyKGh1bWFuRmxlZXQsIGh1bWFuUGxheWVyLnBsYXllcik7XG4gICAgY29uc3QgaHVtYW5Cb2FyZCA9IGh1bWFuUGxheWVyLmdhbWVCb2FyZFxuICAgIGh1bWFuQm9hcmQuY3JlYXRlQm9hcmQoKTtcbiAgICBcblxuICAgIGNvbnN0IEFJcGxheWVyID0gbmV3IFBsYXllcignUGxheWVyIDInKTtcbiAgICBjb25zdCBjb21wdXRlckZsZWV0ID0gY3JlYXRlT3BwRmxlZXQoKTtcbiAgICBBSXBsYXllci5nYW1lQm9hcmQgPSBnYW1lQm9hcmRDb250cm9sbGVyKGNvbXB1dGVyRmxlZXQsIEFJcGxheWVyLnBsYXllcik7XG4gICAgY29uc3QgY29tcHV0ZXJCb2FyZCA9IEFJcGxheWVyLmdhbWVCb2FyZDtcbiAgICBjb21wdXRlckJvYXJkLmNyZWF0ZUJvYXJkKCk7XG5cbiAgICBydW5ET00ucmVuZGVyU3RhcnQoKTtcbiAgICBydW5ET00ucmVuZGVyR2FtZUJvYXJkKGNvbXB1dGVyQm9hcmQuY3JlYXRlQm9hcmQoKSwgQUlwbGF5ZXIucGxheWVyKTtcbiAgICBydW5ET00ucmVuZGVyR2FtZUJvYXJkKGNvbXB1dGVyQm9hcmQsIGh1bWFuUGxheWVyLnBsYXllciwgaHVtYW5Cb2FyZCk7XG4gICAgXG4gICAgLy8gY2FsbCByZW5kZXIgZGlhbG9ndWUgYm94IGhlcmVcbiAgICBjb25zdCBjcmVhdERpYWxvZ3VlID0gcnVuRE9NLnJlbmRlckRpYWxvZ3VlQm94KCk7XG4gICAgY29uc3QgZGlhbG9ndWUgPSBkaWFsb2d1ZUNvbnRyb2xsZXIoKVxuICAgIGRpYWxvZ3VlLnBsYWNlU2hpcHNNZXNzYWdlKClcblxuICAgIC8vIGNhbGwgY29tcHV0ZXJQbGFjZW1lbnQgdG8gc2V0IHVwIGNvbXB1dGVyJ3MgY2hpcHM6XG4gICAgY29uc3QgY29tcHV0ZXJQbGFjZW1lbnRzID0gY29tcHV0ZXJQbGFjZW1lbnQoY29tcHV0ZXJCb2FyZCwgY29tcHV0ZXJGbGVldCk7XG4gICAgXG4gICAgLy8gY2FsbCBzaGlwUGxhY2VtZW50IGZ1bmN0aW9uIGhlcmUgZm9yIGh1bWFuQm9hcmRcbiAgICBjb25zdCBodW1hblBsYWNlbWVudCA9IGh1bWFuU2hpcFBsYWNlbWVudChodW1hbkJvYXJkLCBodW1hbkZsZWV0KTtcblxuICAgXG59XG5cbmV4cG9ydCBjb25zdCByZXNldEludGVyZmFjZSA9IGZ1bmN0aW9uIChib2R5RSwgZW5kQm94KSB7XG4gICAgY29uc29sZS5sb2coJ3Jlc2V0aW5nIGFsbCB0aGlzIHNoaXQnKTtcbiAgICBjb25zdCBwbGF5ZXJCb2FyZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ2FtZWJvYXJkcycpO1xuICAgIGNvbnN0IGRpYWxvZ3VlQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRpYWxvZ3VlLWNvbnRhaW5lcicpO1xuICAgIGNvbnN0IGRpYWxvZ3VlQm94ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRpYWxvZ3VlLWJveCcpO1xuICAgIGNvbnN0IGdhbWVCb2FyZFdyYXBwZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmJvYXJkLXdyYXBwZXInKTtcblxuXG4gICAgZ2FtZUJvYXJkV3JhcHBlcnMuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuICAgICAgICBwbGF5ZXJCb2FyZHMucmVtb3ZlQ2hpbGQoZWxlbWVudCk7XG4gICAgfSk7XG5cbiAgICBkaWFsb2d1ZUNvbnRhaW5lci5yZW1vdmVDaGlsZChkaWFsb2d1ZUJveCk7XG4gICAgYm9keUUucmVtb3ZlQ2hpbGQoZW5kQm94KTtcblxuICAgIGluaXRpYWxpemVHYW1lKCk7XG5cbn0iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby11c2UtYmVmb3JlLWRlZmluZSAqL1xuLyogZXNsaW50LWRpc2FibGUgbm8tZWxzZS1yZXR1cm4gKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLWxvb3AtZnVuYyAqL1xuLyogZXNsaW50LWRpc2FibGUgbm8tcGx1c3BsdXMgKi9cbi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9wcmVmZXItZGVmYXVsdC1leHBvcnQgKi9cblxuLy8gZ2FtZUJvYXJkIHNob3VsZCBjaGVjayBpZiBhIGdhbWUgaXMgb3ZlciBieSBzZWVpbmcgaWYgdGhlXG4vLyBsZW5ndGggb2YgXCJzaGlwc1wiIGlzIHplcm8gKGNoZWNrQWxsU3VuaylcblxuLy8gcGxhY2luZyBzaGlwcyB2ZXJ0aWNhbGx5Li4uIHBvc3NpYmxlIGlkZWE6IGhhdmUgYSBjb2x1bW4gbnVtYmVyIChlLmcgMylcbi8vIHRoYXQgeW91IHVzZSB0byBzZWxlY3QgdGhlIGNvcnJlc3BvbmRpbmcgYXJyYXkgaXRlbSBpbiBlYWNoXG4vLyBvZiB0aGUgYXJyYXlzIHRoYXQgcmVwcmVzZW50cyBhIHJvdyBvbiB0aGUgYm9hcmRcbmltcG9ydCB7IFNoaXAsIGNyZWF0ZUZsZWV0IH0gZnJvbSBcIi4vc2hpcC1vYmplY3RcIlxuaW1wb3J0IHsgZG9tTWFuaXB1bGF0aW9uLCBkaWFsb2d1ZUNvbnRyb2xsZXIgfSBmcm9tIFwiLi91c2VySW50ZXJmYWNlXCI7XG5cbmNvbnN0IHJ1bkRPTSA9IGRvbU1hbmlwdWxhdGlvbigpO1xuY29uc3QgZGlhbG9ndWVSZWZyZXNoID0gZGlhbG9ndWVDb250cm9sbGVyKCk7XG5cbmV4cG9ydCBmdW5jdGlvbiBnYW1lQm9hcmRDb250cm9sbGVyKGZsZWV0LCBuYW1lKSB7XG4gICAgY29uc3QgcGxheWVyTmFtZSA9IG5hbWU7XG4gICAgY29uc3QgYm9hcmQgPSBbXTtcbiAgICBjb25zdCBzaGlwcyA9IGZsZWV0O1xuXG4gICAgLy8gY29uc29sZS5sb2coc2hpcHMpO1xuXG5cbiAgICBmdW5jdGlvbiBjcmVhdGVCb2FyZCgpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgICAgICAgICBib2FyZFtpXSA9IFtdO1xuXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspIHtcbiAgICAgICAgICAgICAgICBib2FyZFtpXVtqXSA9IGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2coYm9hcmQpO1xuICAgICAgICByZXR1cm4gYm9hcmRcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwbGFjZUhvcml6b250YWxTaGlwKHJvdywgY29sLCBzaGlwKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgbmV3Q29vcmRzID0gW3JvdywgY29sICsgaV07XG4gICAgICAgICAgICBzaGlwLmNvb3Jkcy5wdXNoKG5ld0Nvb3JkcylcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyhzaGlwKTtcbiAgICAgICAgY29uc29sZS5sb2coc2hpcC5uYW1lKTtcbiAgICAgICAgY29uc29sZS5sb2coc2hpcC5jb29yZHMpO1xuICAgICAgICBjb25zb2xlLmxvZyhzaGlwcylcbiAgICAgICAgcmV0dXJuIHNoaXBcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwbGFjZVZlcnRpY2FsU2hpcChyb3csIGNvbCwgc2hpcCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IG5ld0Nvb3JkcyA9IFtyb3cgKyBpLCBjb2xdO1xuICAgICAgICAgICAgc2hpcC5jb29yZHMucHVzaChuZXdDb29yZHMpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKHNoaXApXG4gICAgICAgIGNvbnNvbGUubG9nKHNoaXBzKVxuICAgICAgICBjb25zb2xlLmxvZyhzaGlwLmNvb3Jkcyk7XG4gICAgICAgIHJldHVybiBzaGlwXG4gICAgfVxuICAgIFxuICAgIGZ1bmN0aW9uIHJlY2lldmVBdHRhY2soY29vcmRzKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGNvb3JkcylcbiAgICAgICAgbGV0IGF0dGFja1N0YXR1cyA9ICdtaXNzJztcblxuICAgICAgICAvLyBjaGVjayB0byBzZWUgaWYgY29vcmRzIGhhdmUgYWxyZWFkeSBiZWVuIHVzZWQ6XG4gICAgICAgIGlmIChjaGVja0lmVXNlZChjb29yZHMpID09PSB0cnVlKSB7XG4gICAgICAgICAgICByZXR1cm4gJ2ZpbGxlZCBhbHJlYWR5J1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgc2hpcHNbaV0uY29vcmRzLmZvckVhY2goKGNvb3JkKSA9PiB7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKGNoZWNrSWZVc2VkKGNvb3JkcykgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdmaWxsZWQgYWxyZWFkeSdcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoY29vcmRbMF0gPT09IGNvb3Jkc1swXSAmJiBjb29yZFsxXSA9PT0gY29vcmRzWzFdKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdoaXQnKTtcbiAgICAgICAgICAgICAgICAgICAgYXR0YWNrU3RhdHVzID0gJ2hpdCdcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYXR0YWNrU3RhdHVzKVxuICAgICAgICAgICAgICAgICAgICBzaGlwc1tpXS5oaXQoKTtcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlQm9hcmRTcG90KGNvb3Jkcyk7XG4gICAgICAgICAgICAgICAgICAgIGRpYWxvZ3VlUmVmcmVzaC5tb3ZlUmVzdWx0KGF0dGFja1N0YXR1cyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYXllck5hbWUsIGNvb3Jkcywgc2hpcHNbaV0pXG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3Vua0NoZWNrID0gc2hpcHNbaV0uY2hlY2tJZlN1bmsoKVxuICAgICAgICAgICAgICAgICAgICBpZiAoc3Vua0NoZWNrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkaWFsb2d1ZVJlZnJlc2guc3Vua1NoaXBNZXNzYWdlKHNoaXBzW2ldLCBwbGF5ZXJOYW1lKVxuICAgICAgICAgICAgICAgICAgICAgICAgc2hpcHMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tBbGxTdW5rKClcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIHVwZGF0ZUJvYXJkU3BvdChjb29yZHMsIGF0dGFja1N0YXR1cyk7XG4gICAgICAgIGlmIChhdHRhY2tTdGF0dXMgPT09ICdtaXNzJykge1xuICAgICAgICAgICAgZGlhbG9ndWVSZWZyZXNoLm1vdmVSZXN1bHQoYXR0YWNrU3RhdHVzLFxuICAgICAgICAgICAgICAgIHBsYXllck5hbWUsIGNvb3JkcylcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGF0dGFja1N0YXR1c1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNoZWNrQWxsU3VuaygpIHtcbiAgICAgICAgY29uc29sZS5sb2coc2hpcHMpO1xuICAgICAgICBpZiAoc2hpcHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICBkaWFsb2d1ZVJlZnJlc2guZW5kR2FtZU1lc3NhZ2UocGxheWVyTmFtZSlcbiAgICAgICAgICAgIGVuZEdhbWUoKVxuICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlQm9hcmRTcG90KGNvb3JkcywgYXR0YWNrU3RhdHVzKSB7XG4gICAgICAgIGJvYXJkW2Nvb3Jkc1swXSAtIDFdW2Nvb3Jkc1sxXSAtIDFdID0gdHJ1ZTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coYm9hcmQpXG4gICAgICAgIHJ1bkRPTS51c2VHcmlkU3BvdChjb29yZHMsIGF0dGFja1N0YXR1cywgcGxheWVyTmFtZSlcbiAgICAgICAgcmV0dXJuIGJvYXJkXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2hlY2tJZlVzZWQoY29vcmRzKSB7XG4gICAgICAgIGlmIChib2FyZFtjb29yZHNbMF0gLSAxXVtjb29yZHNbMV0gLSAxXSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ2FscmVhZHkgdXNlZCcpXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICBcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBlbmRHYW1lKCkge1xuICAgICAgICAvLyB3YW50IHRvIGRpc2FibGUgYm90aCBnYW1lQm9hcmRzXG4gICAgICAgIC8vIHdhbnQgdG8gbWFrZSB0aGUgcmVzdGFydCBidXR0b24gYXBwZWFyXG4gICAgICAgIGNvbnNvbGUubG9nKCdlbmRpbmcgZ2FtZScpO1xuICAgICAgICBydW5ET00uZnJlZXplR3JpZCgpO1xuICAgICAgICBydW5ET00ucmVuZGVyRW5kR2FtZSgpO1xuICAgIH1cbiAgICAvLyBsaWtlbHkgd2lsbCBoYXZlIHRvIGltcGxlbWVudCBjaGVjayB0byBtYWtlIHN1cmUgYSBzaGlwIGNhblxuICAgIC8vIGJlIHBsYWNlZCB3aXRoIG5vIG92ZXJsYXBcblxuXG4gICAgcmV0dXJuIHsgY3JlYXRlQm9hcmQsIHBsYWNlSG9yaXpvbnRhbFNoaXAsIHBsYWNlVmVydGljYWxTaGlwLCByZWNpZXZlQXR0YWNrLFxuICAgIGNoZWNrQWxsU3VuaywgdXBkYXRlQm9hcmRTcG90LCBjaGVja0lmVXNlZCwgZW5kR2FtZSB9XG59XG5cbiIsIi8vIGNyZWF0ZSBib3RoIHRoZSB1c2VyIHBsYXllciBhbmQgdGhlIGNvbXB1dGVyIHBsYXllciBoZXJlXG5cbi8vIGNvbXB1dGVyIHBsYXllciBoYXMgYXR0YWNrIGNvb3JkaW5hdGVzIGdlbmVyYXRvciBmdW5jdGlvblxuXG5leHBvcnQgY2xhc3MgUGxheWVyIHtcbiAgICBjb25zdHJ1Y3RvcihwbGF5ZXIsIGdhbWVCb2FyZCkge1xuICAgICAgICB0aGlzLnBsYXllciA9IHBsYXllcjtcbiAgICAgICAgdGhpcy5nYW1lQm9hcmQ9IG51bGxcbiAgICB9XG59XG5cblxuZXhwb3J0IGNvbnN0IHVzZXJQbGF5ZXIgPSBmdW5jdGlvbiAoKSB7XG5cbn1cblxuZXhwb3J0IGNvbnN0IGNvbXB1dGVyUGxheWVyID0gZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IHZpc2l0ZWQgPSBbXTtcblxuICAgIGZ1bmN0aW9uIHBpY2tSYW5kb21DZWxsKGh1bWFuQm9hcmQpIHtcbiAgICAgICAgY29uc3Qgcm93ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApICsgMVxuICAgICAgICBjb25zdCBjb2x1bW4gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCkgKyAxXG4gICAgICAgIGNvbnN0IGNvbXBDb29yZHMgPSBbcm93LCBjb2x1bW5dO1xuXG4gICAgICAgIGNvbnN0IHJlcGVhdEJvb2xlYW4gPSBjaGVja1JlcGVhdENlbGwoY29tcENvb3JkcylcbiAgICAgICAgY29uc29sZS5sb2cocmVwZWF0Qm9vbGVhbilcbiAgICAgICAgaWYgKHJlcGVhdEJvb2xlYW4gPT09IHRydWUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjb21wdXRlciBwaWNrZWQgdXNlZCBjZWxsISEnKVxuICAgICAgICAgICAgcGlja1JhbmRvbUNlbGwoaHVtYW5Cb2FyZCk7XG4gICAgICAgIH0gZWxzZSBpZiAocmVwZWF0Qm9vbGVhbiA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHZpc2l0ZWQucHVzaChjb21wQ29vcmRzKTtcbiAgICAgICAgICAgIGh1bWFuQm9hcmQucmVjaWV2ZUF0dGFjayhjb21wQ29vcmRzKTtcblxuICAgICAgICAgICAgcmV0dXJuIGNvbXBDb29yZHMgXG4gICAgICAgIH1cbiAgICAgICAgXG5cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjaGVja1JlcGVhdENlbGwoY29vcmRzKSB7XG4gICAgICAgIGNvbnN0IHN0cmluZ2VkQ29vcmRzID0gSlNPTi5zdHJpbmdpZnkoY29vcmRzKTtcbiAgICAgICAgY29uc3QgZXhpc3RzQm9vbGVhbiA9IHZpc2l0ZWQuc29tZSgoY29vcmQpID0+IEpTT04uc3RyaW5naWZ5KGNvb3JkKSA9PT0gc3RyaW5nZWRDb29yZHMpXG4gICAgICAgIGNvbnNvbGUubG9nKGV4aXN0c0Jvb2xlYW4pXG4gICAgICAgIHJldHVybiBleGlzdHNCb29sZWFuXG4gICAgfVxuXG4gICAgcmV0dXJuIHtwaWNrUmFuZG9tQ2VsbCwgY2hlY2tSZXBlYXRDZWxsfVxufSIsIi8qIGVzbGludC1kaXNhYmxlIG5vLWVsc2UtcmV0dXJuICovXG4vKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvcHJlZmVyLWRlZmF1bHQtZXhwb3J0ICovXG5pbXBvcnQgeyBnYW1lQm9hcmRDb250cm9sbGVyIH0gZnJvbSBcIi4vZ2FtZWJvYXJkQ29udHJvbGxlclwiO1xuXG5cbmV4cG9ydCBjbGFzcyBTaGlwIHtcbiAgICBjb25zdHJ1Y3RvcihsZW5ndGgsIG5hbWUsIGhpdHMsIGlzU3VuaywgY29vcmRzKSB7XG4gICAgICAgIHRoaXMubGVuZ3RoID0gbGVuZ3RoO1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLmhpdHMgPSAwO1xuICAgICAgICB0aGlzLmlzU3VuayA9IGZhbHNlO1xuICAgICAgICB0aGlzLmNvb3JkcyA9IFtdXG4gICAgfVxuXG4gICAgaGl0KCkge1xuICAgICAgICB0aGlzLmhpdHMgKz0gMVxuICAgICAgICBjb25zb2xlLmxvZygnaGl0IGFkZGVkJylcbiAgICB9XG5cbiAgICBjaGVja0lmU3VuaygpIHtcbiAgICAgICAgaWYgKHRoaXMubGVuZ3RoID09PSB0aGlzLmhpdHMpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdTdW5rIScpXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5sZW5ndGgpO1xuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5oaXRzKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgfVxuXG59XG5cbmNvbnN0IGJvYXJkUnVuID0gZ2FtZUJvYXJkQ29udHJvbGxlcigpO1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRmxlZXQoKSB7XG4gICAgY29uc3Qgc2hpcHMgPSBbXVxuXG4gICAgY29uc3QgY2FycmllciA9IG5ldyBTaGlwKDUsICdDYXJyaWVyJyk7XG4gICAgY29uc3QgYmF0dGxlc2hpcCA9IG5ldyBTaGlwKDQsICdCYXR0bGVzaGlwJyk7XG4gICAgY29uc3QgZGVzdHJveWVyID0gbmV3IFNoaXAoMywgJ0Rlc3Ryb3llcicpO1xuICAgIGNvbnN0IHN1Ym1hcmluZSA9IG5ldyBTaGlwKDMsICdTdWJtYXJpbmUnKTtcbiAgICBjb25zdCBwYXRyb2xCb2F0ID0gbmV3IFNoaXAoMiwgJ1BhdHJvbCBCb2F0Jyk7XG4gXG4gICAgc2hpcHMucHVzaChjYXJyaWVyLCBiYXR0bGVzaGlwLCBkZXN0cm95ZXIsIHN1Ym1hcmluZSwgcGF0cm9sQm9hdClcblxuICAgIGNvbnNvbGUubG9nKHNoaXBzKTtcbiAgICByZXR1cm4gc2hpcHNcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZU9wcEZsZWV0KCkge1xuICAgIGNvbnN0IHNoaXBzID0gW11cblxuICAgIGNvbnN0IGNhcnJpZXIgPSBuZXcgU2hpcCg1LCAnQ2FycmllcicpO1xuICAgIGNvbnN0IGJhdHRsZXNoaXAgPSBuZXcgU2hpcCg0LCAnQmF0dGxlc2hpcCcpO1xuICAgIGNvbnN0IGRlc3Ryb3llciA9IG5ldyBTaGlwKDMsICdEZXN0cm95ZXInKTtcbiAgICBjb25zdCBzdWJtYXJpbmUgPSBuZXcgU2hpcCgzLCAnU3VibWFyaW5lJyk7XG4gICAgY29uc3QgcGF0cm9sQm9hdCA9IG5ldyBTaGlwKDIsICdQYXRyb2wgQm9hdCcpO1xuXG4gICAgc2hpcHMucHVzaChjYXJyaWVyLCBiYXR0bGVzaGlwLCBkZXN0cm95ZXIsIHN1Ym1hcmluZSwgcGF0cm9sQm9hdCk7XG5cbiAgICBjb25zb2xlLmxvZyhzaGlwcyk7XG4gICAgcmV0dXJuIHNoaXBzXG59IiwiLyogZXNsaW50LWRpc2FibGUgbm8tdXNlLWJlZm9yZS1kZWZpbmUgKi9cbi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9wcmVmZXItZGVmYXVsdC1leHBvcnQgKi9cblxuLy8gcm90YXRlQnV0dG9uIGFsbG93cyBwbGF5ZXJzIHRvIHJvdGF0ZSBzaGlwcyBkdXJpbmcgcGxhY2VtZW50IHBoYXNlXG4vLyBzdGFydEJ1dHRvbiBhbGxvd3MgcGxheWVyIHRvIGF0dGFjayB3aGVuIGFsbCBzaGlwcyBoYXZlIGJlZW4gcGxhY2VkXG5pbXBvcnQgeyBkaWFsb2d1ZUNvbnRyb2xsZXIgfSBmcm9tIFwiLi91c2VySW50ZXJmYWNlXCI7XG5cblxuZXhwb3J0IGNvbnN0IGh1bWFuU2hpcFBsYWNlbWVudCA9IGZ1bmN0aW9uIChodW1hbkJvYXJkLCBzaGlwcykge1xuICAgIGNvbnN0IHJvdGF0ZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yb3RhdGUtc2hpcCcpO1xuICAgIGNvbnN0IHN0YXJ0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN0YXJ0LWdhbWUtYnV0dG9uJyk7XG4gICAgY29uc3QgcGxheWVyQm9hcmRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdhbWVib2FyZHMnKTtcbiAgICBjb25zdCBnYW1lQm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ2FtZWJvYXJkJyk7XG4gICAgY29uc3QgZGlhbG9ndWVSdW4gPSBkaWFsb2d1ZUNvbnRyb2xsZXIoKTtcblxuICAgIC8vIG1lbW9yeSBzdG9yYWdlIGZvciB3aGVyZSBjZWxscyBjYW4ndCBiZSB1c2VkIGFnYWluXG4gICAgY29uc3Qgb2NjdXBpZWRDZWxscyA9IFtdO1xuXG4gICAgLy8gc2V0cyBwbGFuZVxuICAgIGxldCBjdXJyZW50UGxhbmUgPSAnaG9yaXpvbnRhbCc7XG4gICAgY3JlYXRlUm90YXRpb25BYmlsaXR5KCk7XG5cbiAgICBjb25zdCBodW1hbkNlbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNlbGwnKTtcbiAgICBsZXQgc2hpcEluZGV4ID0gMDtcbiAgICBcblxuICAgIGh1bWFuQ2VsbHMuZm9yRWFjaCgoY2VsbCkgPT4ge1xuICAgICAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsICgpID0+IHtcbiAgICAgICAgICAgIGNlbGxIb3ZlcihjZWxsLCBzaGlwc1tzaGlwSW5kZXhdKVxuICAgICAgICB9KTtcblxuICAgICAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgaWYgKGNlbGwuY2xhc3NMaXN0LmNvbnRhaW5zKCd2YWxpZC1wbGFjZW1lbnQnKSkge1xuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50UGxhbmUgPT09ICdob3Jpem9udGFsJykge1xuICAgICAgICAgICAgICAgICAgICBwbGFjZUhvcml6b250YWxseShjZWxsLmNvb3JkaW5hdGVzLCBjZWxsLmFjdGl2ZUNlbGxzLCBzaGlwc1tzaGlwSW5kZXhdKTtcbiAgICAgICAgICAgICAgICAgICAgc2hpcEluZGV4ICs9IDE7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzaGlwSW5kZXggPT09IDUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0QnV0dG9uRW1lcmdlKClcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhzaGlwSW5kZXgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY3VycmVudFBsYW5lID09PSAndmVydGljYWwnKSB7XG4gICAgICAgICAgICAgICAgICAgIHBsYWNlVmVydGljYWxseShjZWxsLmNvb3JkaW5hdGVzLCBjZWxsLmFjdGl2ZUNlbGxzLCBzaGlwc1tzaGlwSW5kZXhdKTtcbiAgICAgICAgICAgICAgICAgICAgc2hpcEluZGV4ICs9IDE7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzaGlwSW5kZXggPT09IDUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0QnV0dG9uRW1lcmdlKClcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhzaGlwSW5kZXgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBzaGlwSW5kZXhcbiAgICAgICAgfSlcbiAgICB9KVxuXG4gICAgXG4gICAgZnVuY3Rpb24gY2VsbEhvdmVyKGNlbGwsIHNoaXApIHtcbiAgICAgICAgY29uc3QgY2VsbENvb3JkcyA9IGNlbGwuY29vcmRpbmF0ZXM7XG4gICAgICAgIGNlbGwuYWN0aXZlQ2VsbHMgPSBbXTtcbiAgICAgICAgY29uc3QgZ3JvdXBlZENlbGxzID0gY2VsbC5hY3RpdmVDZWxscztcbiAgICAgICAgLy8gaGF2ZSB0byBjaGVjayBpZiBpdHMgaG9yaXpvbnRhbCBvciB2ZXJ0aWNhbFxuICAgICAgICAvLyB0aGVuIGNoZWNrIGlmIHN0YXJ0aW5nIHBvaW50ICsgc2hpcCBsZW5ndGggaXMgdmFsaWRcbiAgICAgICAgaWYgKHNoaXBJbmRleCA9PT0gNSkge1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY3VycmVudFBsYW5lID09PSAnaG9yaXpvbnRhbCcpIHtcbiAgICAgICAgICAgIGNvbnN0IGNlbGxSb3cgPSBjZWxsQ29vcmRzWzBdXG4gICAgICAgICAgICBsZXQgY2VsbENvbHVtbiA9IGNlbGxDb29yZHNbMV07XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGFjdGl2ZUNlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHtjZWxsUm93fSAke2NlbGxDb2x1bW59aGApXG4gICAgICAgICAgICAgICAgZ3JvdXBlZENlbGxzLnB1c2goYWN0aXZlQ2VsbCk7XG4gICAgICAgICAgICAgICAgY2VsbENvbHVtbiArPSAxXG4gICAgICAgICAgICAgICAgaWYgKGNlbGxDb2x1bW4gPiAxMCkge1xuICAgICAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGNvbmZsaWN0aW5nID0gY2hlY2tDb25mbGljdGluZ1NoaXBzKGdyb3VwZWRDZWxscyk7XG5cbiAgICAgICAgICAgIGlmICgoY2VsbENvb3Jkc1sxXSArIHNoaXAubGVuZ3RoKSAtIDEgPD0gMTAgJiYgY29uZmxpY3RpbmcgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgZ3JvdXBlZENlbGxzLmZvckVhY2goKGVsZW0pID0+IHtcbiAgICAgICAgICAgICAgICAgICBlbGVtLmNsYXNzTGlzdC5hZGQoJ3ZhbGlkLXBsYWNlbWVudCcpOyBcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfSBlbHNlIGlmICgoY2VsbENvb3Jkc1sxXSArIHNoaXAubGVuZ3RoKSAtIDEgPiAxMCB8fCBjb25mbGljdGluZyA9PT0gdHJ1ZSl7XG4gICAgICAgICAgICAgICAgZ3JvdXBlZENlbGxzLmZvckVhY2goKGVsZW0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZWxlbS5jbGFzc0xpc3QuYWRkKCdpbnZhbGlkLXBsYWNlbWVudCcpOyBcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0JywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGdyb3VwZWRDZWxscy5mb3JFYWNoKChlbGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGVsZW0uY2xhc3NMaXN0LnJlbW92ZSgndmFsaWQtcGxhY2VtZW50JywgJ2ludmFsaWQtcGxhY2VtZW50JylcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSlcblxuXG4gICAgICAgIH0gZWxzZSBpZiAoY3VycmVudFBsYW5lID09PSAndmVydGljYWwnKSB7XG4gICAgICAgICAgICBsZXQgY2VsbFJvdyA9IGNlbGxDb29yZHNbMF1cbiAgICAgICAgICAgIGNvbnN0IGNlbGxDb2x1bW4gPSBjZWxsQ29vcmRzWzFdO1xuXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBhY3RpdmVDZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7Y2VsbFJvd30gJHtjZWxsQ29sdW1ufWhgKVxuICAgICAgICAgICAgICAgIGdyb3VwZWRDZWxscy5wdXNoKGFjdGl2ZUNlbGwpO1xuICAgICAgICAgICAgICAgIGNlbGxSb3cgKz0gMVxuICAgICAgICAgICAgICAgIGlmIChjZWxsUm93ID4gMTApIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBjb25mbGljdGluZyA9IGNoZWNrQ29uZmxpY3RpbmdTaGlwcyhncm91cGVkQ2VsbHMpO1xuXG5cbiAgICAgICAgICAgIGlmICgoY2VsbENvb3Jkc1swXSArIHNoaXAubGVuZ3RoKSAtIDEgPD0gMTAgJiYgY29uZmxpY3RpbmcgPT09IGZhbHNlICkge1xuICAgICAgICAgICAgICAgIGdyb3VwZWRDZWxscy5mb3JFYWNoKChlbGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgZWxlbS5jbGFzc0xpc3QuYWRkKCd2YWxpZC1wbGFjZW1lbnQnKTsgXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoKGNlbGxDb29yZHNbMF0gKyBzaGlwLmxlbmd0aCkgLSAxID4gMTAgfHwgY29uZmxpY3RpbmcgPT09IHRydWUpe1xuICAgICAgICAgICAgICAgIGdyb3VwZWRDZWxscy5mb3JFYWNoKChlbGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGVsZW0uY2xhc3NMaXN0LmFkZCgnaW52YWxpZC1wbGFjZW1lbnQnKTsgXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW91dCcsICgpID0+IHtcbiAgICAgICAgICAgICAgICBncm91cGVkQ2VsbHMuZm9yRWFjaCgoZWxlbSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBlbGVtLmNsYXNzTGlzdC5yZW1vdmUoJ3ZhbGlkLXBsYWNlbWVudCcsICdpbnZhbGlkLXBsYWNlbWVudCcpXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwbGFjZUhvcml6b250YWxseShjZWxsQ29vcmRzLCBhY3RpdmVDZWxscywgc2hpcCkge1xuICAgICAgICBhY3RpdmVDZWxscy5mb3JFYWNoKChlbGVtKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlbGVtLmNvb3JkaW5hdGVzKTtcbiAgICAgICAgICAgIG9jY3VwaWVkQ2VsbHMucHVzaChlbGVtLmNvb3JkaW5hdGVzKTtcbiAgICAgICAgICAgIGVsZW0uY2xhc3NMaXN0LmFkZCgncGxhY2VkJylcbiAgICAgICAgfSk7XG4gICAgICAgIGh1bWFuQm9hcmQucGxhY2VIb3Jpem9udGFsU2hpcChjZWxsQ29vcmRzWzBdLCBjZWxsQ29vcmRzWzFdLCBzaGlwKTtcbiAgICAgICAgY29uc29sZS5sb2cob2NjdXBpZWRDZWxscyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGxhY2VWZXJ0aWNhbGx5KGNlbGxDb29yZHMsIGFjdGl2ZUNlbGxzLCBzaGlwKSB7XG4gICAgICAgIGFjdGl2ZUNlbGxzLmZvckVhY2goKGVsZW0pID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVsZW0uY29vcmRpbmF0ZXMpO1xuICAgICAgICAgICAgb2NjdXBpZWRDZWxscy5wdXNoKGVsZW0uY29vcmRpbmF0ZXMpO1xuICAgICAgICAgICAgZWxlbS5jbGFzc0xpc3QuYWRkKCdwbGFjZWQnKVxuICAgICAgICB9KTtcbiAgICAgICAgaHVtYW5Cb2FyZC5wbGFjZVZlcnRpY2FsU2hpcChjZWxsQ29vcmRzWzBdLCBjZWxsQ29vcmRzWzFdLCBzaGlwKTtcbiAgICAgICAgY29uc29sZS5sb2cob2NjdXBpZWRDZWxscylcbiAgICB9XG5cblxuICAgIFxuICAgIGZ1bmN0aW9uIGNoZWNrQ29uZmxpY3RpbmdTaGlwcyhhY3RpdmVDZWxscykge1xuICAgICAgICBsZXQgYWxyZWFkeVVzZWQgPSBmYWxzZVxuICAgICAgICBhY3RpdmVDZWxscy5mb3JFYWNoKChlbGVtKSA9PiB7XG4gICAgICAgICAgICBpZiAoY2hlY2tGb3JSZXBlYXQoZWxlbS5jb29yZGluYXRlcywgb2NjdXBpZWRDZWxscykgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBhbHJlYWR5VXNlZCA9IHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuIGFscmVhZHlVc2VkXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlUm90YXRpb25BYmlsaXR5KCkge1xuICAgICAgICByb3RhdGVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBuZXdQbGFuZSA9IHN3aXRjaFBsYW5lKGN1cnJlbnRQbGFuZSk7XG4gICAgICAgICAgICBjdXJyZW50UGxhbmUgPSBuZXdQbGFuZVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHN0YXJ0QnV0dG9uRW1lcmdlKCkge1xuICAgICAgICBzdGFydEJ1dHRvbi5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJzsgXG4gICAgICAgIHN0YXJ0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgZGlhbG9ndWVSdW4uYmVnaW5BdHRhY2tNZXNzYWdlKCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnc3RhcnQhJyk7XG4gICAgICAgICAgICBnYW1lQm9hcmQuc3R5bGUucG9pbnRlckV2ZW50cyA9ICdhdXRvJztcbiAgICAgICAgICAgIHBsYXllckJvYXJkcy5yZW1vdmVDaGlsZChzdGFydEJ1dHRvbik7XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgcmV0dXJuIHsgY2VsbEhvdmVyLCBwbGFjZUhvcml6b250YWxseSwgY2hlY2tDb25mbGljdGluZ1NoaXBzIH1cbn1cblxuXG5cblxuXG4vLyBjb21wdXRlciBwbGFjZW1lbnQgbG9naWNcblxuZXhwb3J0IGNvbnN0IGNvbXB1dGVyUGxhY2VtZW50ID0gZnVuY3Rpb24gKGNvbXB1dGVyQm9hcmQsIHNoaXBzKSB7XG4gICAgY29uc3QgcGxhbmVzID0gWydob3Jpem9udGFsJywgJ3ZlcnRpY2FsJ11cbiAgICBjb25zdCB1c2VkQ2VsbHMgPSBbXTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY3JlYXRlU2hpcENvb3JkcyhzaGlwc1tpXSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlU2hpcENvb3JkcyhzaGlwKSB7XG5cbiAgICAgICAgY29uc3QgY2hvc2VuUGxhbmUgPSBjaG9vc2VQbGFuZShwbGFuZXMpO1xuICAgICAgICBjb25zb2xlLmxvZyhjaG9zZW5QbGFuZSlcbiAgICAgICAgaWYgKGNob3NlblBsYW5lID09PSAnaG9yaXpvbnRhbCcpIHtcbiAgICAgICAgICAgIHRlc3RIb3Jpem9udGFsU2hpcChzaGlwKVxuICAgICAgICB9IGVsc2UgaWYgKGNob3NlblBsYW5lID09PSAndmVydGljYWwnKSB7XG4gICAgICAgICAgICB0ZXN0VmVydGljYWxTaGlwKHNoaXApO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBmdW5jdGlvbiB0ZXN0SG9yaXpvbnRhbFNoaXAoc2hpcCkge1xuICAgICAgICBsZXQgc3RhcnRpbmdDb29yZHMgPSBjcmVhdGVIb3Jpem9udGFsU3RhcnQoc2hpcClcblxuICAgICAgICAvLyBpbml0aWFsIGNoZWNrIG9mIHJlcGVhdDpcbiAgICAgICAgbGV0IGZpcnN0UmVwZWF0ID0gY2hlY2tGb3JSZXBlYXQoc3RhcnRpbmdDb29yZHMsIHVzZWRDZWxscylcbiAgICAgICAgd2hpbGUgKGZpcnN0UmVwZWF0ID09PSB0cnVlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnbmVlZCBuZXcgc3RhcnQnKVxuICAgICAgICAgICAgc3RhcnRpbmdDb29yZHMgPSBjcmVhdGVIb3Jpem9udGFsU3RhcnQoc2hpcCk7XG4gICAgICAgICAgICBmaXJzdFJlcGVhdCA9IGNoZWNrRm9yUmVwZWF0KHN0YXJ0aW5nQ29vcmRzLCB1c2VkQ2VsbHMpXG4gICAgICAgIH1cbiAgICAgICAgdXNlZENlbGxzLnB1c2goc3RhcnRpbmdDb29yZHMpOyBcbiAgICAgICAgXG4gICAgICAgIGxldCByZXBlYXREZXRlY3QgPSBmYWxzZTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBzaGlwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBuZXdDb29yZHMgPSBbc3RhcnRpbmdDb29yZHNbMF0sIHN0YXJ0aW5nQ29vcmRzWzFdICsgaV07XG4gICAgICAgICAgICBjb25zdCByZXBlYXQgPSBjaGVja0ZvclJlcGVhdChuZXdDb29yZHMsIHVzZWRDZWxscylcbiAgICAgICAgICAgIGlmIChyZXBlYXQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgdXNlZENlbGxzLnB1c2gobmV3Q29vcmRzKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocmVwZWF0ID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgcmVwZWF0RGV0ZWN0ID0gdHJ1ZVxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocmVwZWF0RGV0ZWN0ID09PSBmYWxzZSkge1xuICAgICAgICAgICAgY29tcHV0ZXJCb2FyZC5wbGFjZUhvcml6b250YWxTaGlwKHN0YXJ0aW5nQ29vcmRzWzBdLCBzdGFydGluZ0Nvb3Jkc1sxXSwgc2hpcCk7XG4gICAgICAgIH0gZWxzZSBpZiAocmVwZWF0RGV0ZWN0ID09PSB0cnVlKSB7XG4gICAgICAgICAgICB0ZXN0SG9yaXpvbnRhbFNoaXAoc2hpcCk7XG4gICAgICAgIH1cblxuICAgIH1cblxuXG4gICAgZnVuY3Rpb24gdGVzdFZlcnRpY2FsU2hpcChzaGlwKSB7XG4gICAgICAgIGxldCBzdGFydGluZ0Nvb3JkcyA9IGNyZWF0ZVZlcnRpY2FsU3RhcnQoc2hpcClcblxuICAgICAgICAvLyBpbml0aWFsIGNoZWNrIG9mIHJlcGVhdDpcbiAgICAgICAgbGV0IGZpcnN0UmVwZWF0ID0gY2hlY2tGb3JSZXBlYXQoc3RhcnRpbmdDb29yZHMsIHVzZWRDZWxscylcbiAgICAgICAgd2hpbGUgKGZpcnN0UmVwZWF0ID09PSB0cnVlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnbmVlZCBuZXcgc3RhcnQnKVxuICAgICAgICAgICAgc3RhcnRpbmdDb29yZHMgPSBjcmVhdGVWZXJ0aWNhbFN0YXJ0KHNoaXApO1xuICAgICAgICAgICAgZmlyc3RSZXBlYXQgPSBjaGVja0ZvclJlcGVhdChzdGFydGluZ0Nvb3JkcywgdXNlZENlbGxzKVxuICAgICAgICB9XG4gICAgICAgIHVzZWRDZWxscy5wdXNoKHN0YXJ0aW5nQ29vcmRzKTtcblxuICAgICAgICBsZXQgcmVwZWF0RGV0ZWN0ID0gZmFsc2U7XG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgc2hpcC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgbmV3Q29vcmRzID0gW3N0YXJ0aW5nQ29vcmRzWzBdICsgaSwgc3RhcnRpbmdDb29yZHNbMV1dO1xuICAgICAgICAgICAgY29uc3QgcmVwZWF0ID0gY2hlY2tGb3JSZXBlYXQobmV3Q29vcmRzLCB1c2VkQ2VsbHMpXG4gICAgICAgICAgICBpZiAocmVwZWF0ID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICB1c2VkQ2VsbHMucHVzaChuZXdDb29yZHMpO1xuICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocmVwZWF0ID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgcmVwZWF0RGV0ZWN0ID0gdHJ1ZVxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChyZXBlYXREZXRlY3QgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICBjb21wdXRlckJvYXJkLnBsYWNlVmVydGljYWxTaGlwKHN0YXJ0aW5nQ29vcmRzWzBdLCBzdGFydGluZ0Nvb3Jkc1sxXSwgc2hpcCk7XG4gICAgICAgIH0gZWxzZSBpZiAocmVwZWF0RGV0ZWN0ID09PSB0cnVlKSB7XG4gICAgICAgICAgICB0ZXN0VmVydGljYWxTaGlwKHNoaXApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2hvb3NlUGxhbmUocGxhbmVzKSB7XG4gICAgICAgIGNvbnN0IGNob3NlbkluZGV4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogcGxhbmVzLmxlbmd0aCk7XG4gICAgICAgIHJldHVybiBwbGFuZXNbY2hvc2VuSW5kZXhdXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlSG9yaXpvbnRhbFN0YXJ0KHNoaXApIHtcbiAgICAgICAgY29uc3Qgcm93ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApICsgMVxuICAgICAgICBjb25zdCBjb2x1bW4gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoMTAgLSBzaGlwLmxlbmd0aCkpICsgMVxuICAgICAgICBjb25zdCBzdGFydGluZ0Nvb3JkID0gW3JvdywgY29sdW1uXTtcbiAgICAgICAgcmV0dXJuIHN0YXJ0aW5nQ29vcmRcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVWZXJ0aWNhbFN0YXJ0KHNoaXApIHtcbiAgICAgICAgY29uc3Qgcm93ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKDEwIC0gc2hpcC5sZW5ndGgpKSArIDFcbiAgICAgICAgY29uc3QgY29sdW1uID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApICsgMVxuICAgICAgICBjb25zdCBzdGFydGluZ0Nvb3JkID0gW3JvdywgY29sdW1uXTtcbiAgICAgICAgcmV0dXJuIHN0YXJ0aW5nQ29vcmRcbiAgICB9XG5cbiAgICByZXR1cm4ge2NyZWF0ZVNoaXBDb29yZHMsIHRlc3RIb3Jpem9udGFsU2hpcCwgdGVzdFZlcnRpY2FsU2hpcCxcbiAgICAgICAgY2hvb3NlUGxhbmUsIGNyZWF0ZUhvcml6b250YWxTdGFydCwgY3JlYXRlVmVydGljYWxTdGFydH1cbn1cblxuXG5mdW5jdGlvbiBjaGVja0ZvclJlcGVhdChjb29yZHMsIGFycmF5KSB7XG4gICAgY29uc3Qgc3RyaW5nZWRDb29yZHMgPSBKU09OLnN0cmluZ2lmeShjb29yZHMpO1xuICAgIGNvbnN0IGV4aXN0c0Jvb2xlYW4gPSBhcnJheS5zb21lKChjb29yZCkgPT4gSlNPTi5zdHJpbmdpZnkoY29vcmQpID09PSBzdHJpbmdlZENvb3JkcylcbiAgICBjb25zb2xlLmxvZyhleGlzdHNCb29sZWFuKVxuICAgIHJldHVybiBleGlzdHNCb29sZWFuXG59XG5cbmZ1bmN0aW9uIHN3aXRjaFBsYW5lKGN1cnJlbnRQbGFuZSkge1xuICAgIGlmIChjdXJyZW50UGxhbmUgPT09ICdob3Jpem9udGFsJykge1xuICAgICAgICBjdXJyZW50UGxhbmUgPSAndmVydGljYWwnXG4gICAgfSBlbHNlIGlmIChjdXJyZW50UGxhbmUgPT09ICd2ZXJ0aWNhbCcpIHtcbiAgICAgICAgY3VycmVudFBsYW5lID0gJ2hvcml6b250YWwnXG4gICAgfVxuICAgIHJldHVybiBjdXJyZW50UGxhbmVcbn07IiwiLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L3ByZWZlci1kZWZhdWx0LWV4cG9ydCAqL1xuaW1wb3J0IGhpdEljb24gZnJvbSBcIi4vaWNvbnMvaGl0LnBuZ1wiO1xuaW1wb3J0IG1pc3NJY29uIGZyb20gXCIuL2ljb25zL21pc3MucG5nXCI7XG5cbmltcG9ydCB7IGNvbXB1dGVyUGxheWVyIH0gZnJvbSBcIi4vcGxheWVyXCI7XG5pbXBvcnQgeyByZXNldEludGVyZmFjZSB9IGZyb20gXCIuL2dhbWVMb29wXCI7XG5cblxuZXhwb3J0IGNvbnN0IGRvbU1hbmlwdWxhdGlvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICBjb25zdCBjb21wdXRlck1vdmVzID0gY29tcHV0ZXJQbGF5ZXIoKVxuXG4gICAgY29uc3QgcGxheWVyQm9hcmRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdhbWVib2FyZHMnKTtcbiAgICBjb25zdCBkaWFsb2d1ZUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kaWFsb2d1ZS1jb250YWluZXInKVxuXG4gICAgZnVuY3Rpb24gcmVuZGVyU3RhcnQoKSB7XG4gICAgICAgIGNvbnN0IHN0YXJ0R2FtZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICBhcHBlbmRFbGVtZW50KHN0YXJ0R2FtZUJ1dHRvbiwgJ3N0YXJ0LWdhbWUtYnV0dG9uJywgcGxheWVyQm9hcmRzKTtcbiAgICAgICAgc3RhcnRHYW1lQnV0dG9uLnRleHRDb250ZW50ID0gJ1N0YXJ0IEZpcmluZyEnXG4gICAgICAgIHN0YXJ0R2FtZUJ1dHRvbi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVuZGVyR2FtZUJvYXJkKGJvYXJkQ29udHJvbGxlciwgcGxheWVyTmFtZSwgaHVtYW5Cb2FyZCkge1xuICAgICAgICBsZXQgaXNDb21wdXRlciA9IGZhbHNlO1xuICAgICAgICBpZiAocGxheWVyTmFtZSA9PT0gJ1BsYXllciAyJykge1xuICAgICAgICAgICAgaXNDb21wdXRlciA9IHRydWVcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyhpc0NvbXB1dGVyKTtcblxuICAgICAgICBjb25zdCBnYW1lQm9hcmRXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGFwcGVuZEVsZW1lbnQoZ2FtZUJvYXJkV3JhcHBlciwgJ2JvYXJkLXdyYXBwZXInLCBwbGF5ZXJCb2FyZHMpXG4gICAgICAgXG4gICAgICAgIGNvbnN0IGJvYXJkVGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMicpO1xuICAgICAgICBhcHBlbmRFbGVtZW50KGJvYXJkVGl0bGUsICdib2FyZC10aXRsZScsIGdhbWVCb2FyZFdyYXBwZXIpO1xuICAgICAgICBib2FyZFRpdGxlLnRleHRDb250ZW50ID0gcGxheWVyTmFtZTtcblxuICAgICAgICAvLyByZW5kZXIgYm9hcmQ6XG4gICAgICAgIGNvbnN0IGdhbWVib2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBhcHBlbmRFbGVtZW50KGdhbWVib2FyZCwgJ2dhbWVib2FyZCcsIGdhbWVCb2FyZFdyYXBwZXIpO1xuXG4gICAgICAgIGJ1aWxkR3JpZChnYW1lYm9hcmQsIGlzQ29tcHV0ZXIpO1xuICAgICAgICBcbiAgICAgICAgaWYgKGlzQ29tcHV0ZXIgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICBjb25zdCByb3RhdGVTaGlwQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgICAgICBhcHBlbmRFbGVtZW50KHJvdGF0ZVNoaXBCdXR0b24sICdyb3RhdGUtc2hpcCcsIGdhbWVCb2FyZFdyYXBwZXIpO1xuICAgICAgICAgICAgcm90YXRlU2hpcEJ1dHRvbi50ZXh0Q29udGVudCA9ICdSb3RhdGUnOyAgICAgICAgXG5cbiAgICAgICAgICAgIHNldEdyaWRUcmlnZ2Vycyhib2FyZENvbnRyb2xsZXIsIGh1bWFuQm9hcmQpO1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBnYW1lYm9hcmQuc3R5bGUucG9pbnRlckV2ZW50cyA9ICdub25lJ1xuICAgICAgICB9XG4gICAgICAgIFxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGJ1aWxkR3JpZChnYW1lYm9hcmRFbGVtZW50LCBpc0NvbXB1dGVyKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgMTE7IGkrKykge1xuICAgICAgICAgICAgY29uc3Qgcm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBhcHBlbmRFbGVtZW50KHJvdywgJ3JvdycsIGdhbWVib2FyZEVsZW1lbnQpO1xuXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMTsgaiA8IDExOyBqKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICAgICAgY2VsbC5jb29yZGluYXRlcyA9IFtpLCBqXTtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhjZWxsLmNvb3JkaW5hdGVzKVxuICAgICAgICAgICAgICAgIGlmIChpc0NvbXB1dGVyID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGFwcGVuZEVsZW1lbnQoY2VsbCwgJ2NlbGwtYycsIHJvdyk7XG4gICAgICAgICAgICAgICAgICAgIGNlbGwuc2V0QXR0cmlidXRlKCdpZCcsIGAke2l9ICR7an1jYClcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgIGFwcGVuZEVsZW1lbnQoY2VsbCwgJ2NlbGwnLCByb3cpO1xuICAgICAgICAgICAgICAgICAgIGNlbGwuc2V0QXR0cmlidXRlKCdpZCcsIGAke2l9ICR7an1oYCkgXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXRHcmlkVHJpZ2dlcnMoY29tcHV0ZXJCb2FyZENvbnRyb2xsZXIsIGh1bWFuQm9hcmRDb250cm9sbGVyKSB7XG4gICAgICAgIGNvbnN0IGNlbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNlbGwtYycpO1xuICAgICAgICBjZWxscy5mb3JFYWNoKChjZWxsKSA9PiB7XG4gICAgICAgICAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGNlbGwuY29vcmRpbmF0ZXMpO1xuICAgICAgICAgICAgICAgIGNvbXB1dGVyQm9hcmRDb250cm9sbGVyLnJlY2lldmVBdHRhY2soY2VsbC5jb29yZGluYXRlcyk7XG4gICAgICAgICAgICAgICAgY2VsbC5zdHlsZS5wb2ludGVyRXZlbnRzID0gJ25vbmUnO1xuXG4gICAgICAgICAgICAgICAgLy8gdHJpZ2dlciBjb21wdXRlcidzIGF0dGFjayBpbiByZXNwb25zZVxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGh1bWFuQm9hcmRDb250cm9sbGVyKTtcbiAgICAgICAgICAgICAgICBjb21wdXRlck1vdmVzLnBpY2tSYW5kb21DZWxsKGh1bWFuQm9hcmRDb250cm9sbGVyKTtcblxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICAgICAgICAgIFxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVzZUdyaWRTcG90KGNvb3Jkcywgc3RhdHVzLCBuYW1lKSB7XG4gICAgICAgIC8vIHJlZ2lzdGVycyB0aGF0IHRlaCBncmlkIHNwb3Qgd2FzIHVzZWQsIGFuZCBkaXNwbGF5c1xuICAgICAgICAvLyBlaXRoZXIgYSBoaXQgb3IgbWlzc1xuICAgICAgICBjb25zdCBhdHRhY2tJY29uID0gbmV3IEltYWdlKCk7XG4gICAgICAgIGF0dGFja0ljb24uY2xhc3NMaXN0LmFkZCgnYXR0YWNrLWljb24nKTtcblxuICAgICAgICBpZiAobmFtZSA9PT0gJ1BsYXllciAyJykge1xuICAgICAgICAgICAgY29uc3QgdXNlZENlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcbiAgICAgICAgICAgICAgICBgJHtjb29yZHNbMF19ICR7Y29vcmRzWzFdfWNgKVxuXG4gICAgICAgICAgICB1c2VkQ2VsbC5hcHBlbmRDaGlsZChhdHRhY2tJY29uKTtcbiAgICAgICAgICAgIGlmIChzdGF0dXMgPT09ICdoaXQnKSB7XG4gICAgICAgICAgICAgICAgYXR0YWNrSWNvbi5zcmMgPSBoaXRJY29uXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHN0YXR1cyA9PT0gJ21pc3MnKSB7XG4gICAgICAgICAgICAgICAgYXR0YWNrSWNvbi5zcmMgPSBtaXNzSWNvblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCB1c2VkQ2VsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxuICAgICAgICAgICAgICAgIGAke2Nvb3Jkc1swXX0gJHtjb29yZHNbMV19aGApXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHVzZWRDZWxsLmFwcGVuZENoaWxkKGF0dGFja0ljb24pO1xuICAgICAgICAgICAgaWYgKHN0YXR1cyA9PT0gJ2hpdCcpIHtcbiAgICAgICAgICAgICAgICBhdHRhY2tJY29uLnNyYyA9IGhpdEljb25cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc3RhdHVzID09PSAnbWlzcycpIHtcbiAgICAgICAgICAgICAgICBhdHRhY2tJY29uLnNyYyA9IG1pc3NJY29uXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmcmVlemVHcmlkKCkge1xuICAgICAgICBjb25zdCBnYW1lYm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ2FtZWJvYXJkJyk7XG4gICAgICAgIGdhbWVib2FyZC5zdHlsZS5wb2ludGVyRXZlbnRzID0gJ25vbmUnO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlbmRlckRpYWxvZ3VlQm94KCkge1xuICAgICAgICBjb25zdCBkaWFsb2d1ZUJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBhcHBlbmRFbGVtZW50KGRpYWxvZ3VlQm94LCAnZGlhbG9ndWUtYm94JywgZGlhbG9ndWVDb250YWluZXIpXG5cbiAgICAgICAgY29uc3QgdGV4dEJveDEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgICBhcHBlbmRFbGVtZW50KHRleHRCb3gxLCAndGV4dC1ib3gxJywgZGlhbG9ndWVCb3gpXG5cbiAgICAgICAgY29uc3QgdGV4dEJveDIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgICBhcHBlbmRFbGVtZW50KHRleHRCb3gyLCAndGV4dC1ib3gyJywgZGlhbG9ndWVCb3gpXG5cbiAgICAgICAgY29uc3QgdGV4dEJveDMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgYXBwZW5kRWxlbWVudCh0ZXh0Qm94MywgJ3RleHQtYm94MycsIGRpYWxvZ3VlQm94KVxuICAgIH1cblxuXG4gICAgZnVuY3Rpb24gcmVuZGVyRW5kR2FtZSgpIHtcbiAgICAgICAgY29uc3QgYm9keUVsZW1lbnQgPSBkb2N1bWVudC5ib2R5XG5cbiAgICAgICAgY29uc3QgZW5kR2FtZUJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBhcHBlbmRFbGVtZW50KGVuZEdhbWVCb3gsICdlbmQtZ2FtZS1ib3gnLCBib2R5RWxlbWVudCk7XG5cbiAgICAgICAgY29uc3QgZW5kR2FtZUljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgYXBwZW5kRWxlbWVudChlbmRHYW1lSWNvbiwgJ2VuZC1nYW1lLWljb24nLCBlbmRHYW1lQm94KTtcblxuICAgICAgICBjb25zdCByZXNldEdhbWVCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgYXBwZW5kRWxlbWVudChyZXNldEdhbWVCdXR0b24sICdyZXNldC1nYW1lLWJ1dHRvbicsIGVuZEdhbWVCb3gpO1xuXG4gICAgICAgIHJlc2V0R2FtZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIHJlc2V0SW50ZXJmYWNlKGJvZHlFbGVtZW50LCBlbmRHYW1lQm94KTtcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhcHBlbmRFbGVtZW50KGVsZW1lbnROYW1lLCBjbGFzc05hbWUsIGZhdGhlckVsZW1lbnQgKSB7XG4gICAgICAgIGVsZW1lbnROYW1lLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcbiAgICAgICAgZmF0aGVyRWxlbWVudC5hcHBlbmRDaGlsZChlbGVtZW50TmFtZSk7XG5cbiAgICAgICAgcmV0dXJuIGVsZW1lbnROYW1lO1xuICAgIH1cblxuICAgIHJldHVybiB7cmVuZGVyU3RhcnQsIHJlbmRlckdhbWVCb2FyZCwgYXBwZW5kRWxlbWVudCwgYnVpbGRHcmlkLFxuICAgICAgICBzZXRHcmlkVHJpZ2dlcnMsIHVzZUdyaWRTcG90LCBmcmVlemVHcmlkLCByZW5kZXJEaWFsb2d1ZUJveCxcbiAgICAgICAgcmVuZGVyRW5kR2FtZX1cblxufVxuXG5cblxuXG5leHBvcnQgY29uc3QgZGlhbG9ndWVDb250cm9sbGVyID0gZnVuY3Rpb24oKSB7XG5cbiAgICBmdW5jdGlvbiAgcGxhY2VTaGlwc01lc3NhZ2UoKSB7XG4gICAgICAgIGNvbnN0IHRleHRCb3gxID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRleHQtYm94MScpO1xuICAgICAgICB0ZXh0Qm94MS50ZXh0Q29udGVudCA9ICdQbGFjZSB5b3VyIHNoaXBzIG9uIHRoZSBib2FyZCB0byB0aGUgcmlnaHQgdG8gYmVnaW4hJ1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGJlZ2luQXR0YWNrTWVzc2FnZSgpIHtcbiAgICAgICAgY29uc3QgdGV4dEJveDEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGV4dC1ib3gxJyk7XG4gICAgICAgIHRleHRCb3gxLnRleHRDb250ZW50ID0gJ1JlYWR5IHRvIEF0dGFjayEhJ1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1vdmVSZXN1bHQoc3RhdHVzLCBwbGF5ZXJOYW1lLCBjb29yZHMsIHNoaXAgPSBudWxsKSB7XG4gICAgICAgIC8vIG5lZWQgYXR0YWNrU3RhdHVzLCBzaGlwIG5hbWUsIGNvb3JkaW5hdGVzXG4gICAgICAgIGNvbnN0IHRleHRCb3gxID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRleHQtYm94MScpO1xuICAgICAgICBjb25zdCB0ZXh0Qm94MiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50ZXh0LWJveDInKTtcbiAgICAgICAgY29uc29sZS5sb2coJ2RpYWxvZ3VlIHJlY29yZGVkJylcbiAgICAgICAgaWYgKHBsYXllck5hbWUgIT09ICdQbGF5ZXIgMicpIHtcbiAgICAgICAgICAgIGlmIChzdGF0dXMgPT09ICdoaXQnKSB7XG4gICAgICAgICAgICAgICAgdGV4dEJveDIudGV4dENvbnRlbnQgPSBgVGhlIGVuZW15IGhhcyBoaXQgeW91ciAke3NoaXAubmFtZX1cbiAgICAgICAgICAgICAgICBhdCByb3c6ICR7Y29vcmRzWzBdfSBjb2x1bW46ICR7Y29vcmRzWzFdfSFgXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHN0YXR1cyA9PT0gJ21pc3MnKSB7XG4gICAgICAgICAgICAgICAgdGV4dEJveDIudGV4dENvbnRlbnQgPSBgVGhlIGVuZW15IGF0dGFja2VkIHJvdzpcbiAgICAgICAgICAgICAgICAke2Nvb3Jkc1swXX0gY29sdW1uOiAke2Nvb3Jkc1sxXX0gYW5kIG1pc3NlZCFgXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIGlmIChwbGF5ZXJOYW1lID09PSAnUGxheWVyIDInKSB7XG4gICAgICAgICAgICBpZiAoc3RhdHVzID09PSAnaGl0Jykge1xuICAgICAgICAgICAgICAgIHRleHRCb3gxLnRleHRDb250ZW50ID0gYFlvdSBoaXQgdGhlIGVuZW15J3MgJHtzaGlwLm5hbWV9XG4gICAgICAgICAgICAgICAgYXQgcm93OiAke2Nvb3Jkc1swXX0gY29sdW1uOiAke2Nvb3Jkc1sxXX0hYFxuICAgICAgICAgICAgfSBlbHNlIGlmIChzdGF0dXMgPT09ICdtaXNzJykge1xuICAgICAgICAgICAgICAgIHRleHRCb3gxLnRleHRDb250ZW50ID0gYFlvdSBhdHRhY2tlZCByb3c6XG4gICAgICAgICAgICAgICAgJHtjb29yZHNbMF19IGNvbHVtbjogJHtjb29yZHNbMV19IGFuZCBtaXNzZWQhYFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc3Vua1NoaXBNZXNzYWdlKHNoaXAsIG5hbWUpIHtcbiAgICAgICAgY29uc3QgdGV4dEJveDEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGV4dC1ib3gxJyk7XG4gICAgICAgIGNvbnN0IHRleHRCb3gyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRleHQtYm94MicpO1xuICAgICAgICBjb25zb2xlLmxvZyhzaGlwLCBuYW1lKVxuICAgICAgICBpZiAobmFtZSAhPT0gJ1BsYXllciAyJykge1xuICAgICAgICAgICAgdGV4dEJveDIudGV4dENvbnRlbnQgPSBgWW91ciAke3NoaXAubmFtZX0gaGFzIGJlZW4gc3VuayEhYFxuICAgICAgICB9IGVsc2UgaWYgKG5hbWUgPT09ICdQbGF5ZXIgMicpIHtcbiAgICAgICAgICAgIHRleHRCb3gxLnRleHRDb250ZW50ID0gYFlvdSBzdW5rIHRoZSBlbmVteSdzICR7c2hpcC5uYW1lfSEhYFxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBlbmRHYW1lTWVzc2FnZShuYW1lKSB7XG4gICAgICAgIGNvbnN0IHRleHRCb3gzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRleHQtYm94MycpXG4gICAgICAgIGlmIChuYW1lID09PSAnUGxheWVyIDInKSB7XG4gICAgICAgICAgICB0ZXh0Qm94My50ZXh0Q29udGVudCA9ICdUaGUgZW5lbXkgZmxlZXQgaGFzIGJlZW4gc2Fuay4gRXhjZWxsZW50IHdvcmsgU29sZGllciEnXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0ZXh0Qm94My50ZXh0Q29udGVudCA9ICdXZSBoYXZlIGxvc3Qgb3VyIGZsZWV0IGFuZCBiZWVuIGRlZmVhdGVkLiBBYm9ydCB0aGUgbWlzc2lvbiEnXG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIHJldHVybiB7cGxhY2VTaGlwc01lc3NhZ2UsIGJlZ2luQXR0YWNrTWVzc2FnZSwgbW92ZVJlc3VsdCwgXG4gICAgICAgIHN1bmtTaGlwTWVzc2FnZSwgZW5kR2FtZU1lc3NhZ2V9XG59IiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgYGh0bWwsIGJvZHkge1xuICAgIG1pbi1oZWlnaHQ6IDEwMCU7XG4gICAgbWluLXdpZHRoOiAxMDAlO1xuICAgIG1hcmdpbjogMHB4O1xufVxuXG5ib2R5IHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBuYXZ5O1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1cblxuLnByb21wdC1ib3gge1xuICAgIGRpc3BsYXk6IG5vbmVcbn1cblxuLmdhbWUtY29udGFpbmVyIHtcbiAgICBkaXNwbGF5OiBncmlkO1xuICAgIGdyaWQtdGVtcGxhdGUtcm93czogMWZyIDRmciAxLjdmcjtcbiAgICBoZWlnaHQ6IDEwMHZoO1xuICAgIHdpZHRoOiAxMDB2dztcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoNTksIDU5LCA1OSk7XG59XG5cbi5oZWFkZXIge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBncmlkLXJvdzogMSAvIDI7XG59XG5cbi5nYW1lLXRpdGxlIHtcbiAgICBmb250LXNpemU6IDY3cHg7XG4gICAgbWFyZ2luLXRvcDogMjBweDtcbiAgICBtYXJnaW4tYm90dG9tOiAxMHB4O1xufVxuXG4uZ2FtZWJvYXJkcyB7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XG4gICAgZ3JpZC1yb3c6IDIgLyAzO1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYigxMTQsIDE1NSwgMTU1KTtcbn1cblxuLmRpYWxvZ3VlLWNvbnRhaW5lciB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIGdyaWQtcm93OiAzIC8gNDtcbn1cblxuLmRpYWxvZ3VlLWJveCB7XG4gICAgaGVpZ2h0OiAyMHZoO1xuICAgIHdpZHRoOiA1MHZ3O1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYig3NywgMTM0LCA3Nyk7XG59XG5cblxuLyogZ2FtZWJvYXJkIHdyYXBwZXIgc3R5bGluZyAqL1xuLmJvYXJkLXdyYXBwZXIge1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gICAgd2lkdGg6IDQwMHB4O1xuICAgIGJhY2tncm91bmQtY29sb3I6IGJpc3F1ZTtcbiAgICBwYWRkaW5nOiAwIDE1cHg7XG59XG5cbi5ib2FyZC10aXRsZSB7XG5cbn1cblxuLmdhbWVib2FyZCB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIGhlaWdodDogNDAwcHg7XG4gICAgd2lkdGg6IDQwMHB4O1xuICAgIGJhY2tncm91bmQtY29sb3I6IGJsdWV2aW9sZXQ7XG59XG5cbi5yb3cge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgaGVpZ2h0OiAxMCU7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcGluaztcbn1cblxuLmNlbGwge1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIG1hcmdpbjogMHB4O1xuICAgIGFzcGVjdC1yYXRpbzogMTtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjIxLCAyNDEsIDI0MSk7XG4gICAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XG59XG5cbi5jZWxsLWMge1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIG1hcmdpbjogMHB4O1xuICAgIGFzcGVjdC1yYXRpbzogMTtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjIxLCAyNDEsIDI0MSk7XG4gICAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XG59XG5cbi5jZWxsLWM6aG92ZXIge1xuICAgIGJhY2tncm91bmQtY29sb3I6IGFudGlxdWV3aGl0ZTtcbn1cblxuLyogaWNvbnMgKi9cbi5hdHRhY2staWNvbiB7XG4gICAgb2JqZWN0LWZpdDogY292ZXI7XG4gICAgaGVpZ2h0OiAxMDAlO1xufVxuXG5cbi8qIHN0eWxpbmcgZm9yIGRpYWxvZ3VlIGJveCAqL1xuLmRpYWxvZ3VlLWNvbnRhaW5lciB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIGdyaWQtcm93OiAzIC8gNDtcbn1cblxuLmRpYWxvZ3VlLWJveCB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtZXZlbmx5O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgaGVpZ2h0OiAyMHZoO1xuICAgIHdpZHRoOiA1NXZ3O1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYig3NywgMTM0LCA3Nyk7XG59XG5cbi50ZXh0LWJveDEsIC50ZXh0LWJveDIsIC50ZXh0LWJveDMge1xuICAgIGhlaWdodDogNXZoO1xuICAgIHdpZHRoOiA1MHZ3O1xuICAgIGJhY2tncm91bmQtY29sb3I6IGxpZ2h0Ymx1ZTtcbiAgICBmb250LXNpemU6IDI1cHg7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuXG5cblxuLyogc3R5bGluZyBmb3IgcmVzZXQgZ2FtZSAqL1xuLmVuZC1nYW1lLWJveCB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICB0b3A6IDI0NXB4O1xuICAgIGxlZnQ6IDA7XG4gICAgcmlnaHQ6IDA7XG4gICAgbWFyZ2luLWxlZnQ6IGF1dG87XG4gICAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xuICAgIHdpZHRoOiAyMjBweDtcbiAgICBoZWlnaHQ6IDIyMHB4O1xuICAgIGJhY2tncm91bmQtY29sb3I6IGF6dXJlO1xufVxuXG4ucmVzZXQtZ2FtZS1idXR0b24ge1xuICAgIGhlaWdodDogNTBweDtcbiAgICB3aWR0aDogNTBweDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTQ0LCA1OCwgNTgpO1xufVxuXG5cbi8qIHN0eWxpbmcgZm9yIHNoaXAgUGxhY2VtZW50ICovXG4udmFsaWQtcGxhY2VtZW50IHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTEwLCAxODksIDExMCk7XG59XG5cbi5pbnZhbGlkLXBsYWNlbWVudCB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDI0OSwgMTE2LCAxMTYpO1xufVxuXG4ucGxhY2VkIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoNzYsIDc2LCAxMTApO1xufVxuXG4ucm90YXRlLXNoaXAge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB0b3A6IDE1cHg7XG4gICAgcmlnaHQ6IDIwcHg7XG4gICAgaGVpZ2h0OiAyNXB4O1xuICAgIHdpZHRoOiA2MHB4O1xuICAgIC8qIGJvcmRlcjogMnB4IHNvbGlkIG9yYW5nZTsgKi9cbn1cblxuLnN0YXJ0LWdhbWUtYnV0dG9uIHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgdG9wOiAzNTBweDtcbiAgICBsZWZ0OiAwO1xuICAgIHJpZ2h0OiAwO1xuICAgIG1hcmdpbi1sZWZ0OiBhdXRvO1xuICAgIG1hcmdpbi1yaWdodDogYXV0bztcbiAgICBoZWlnaHQ6IDI1cHg7XG4gICAgd2lkdGg6IDExMHB4O1xuICAgIGJvcmRlcjogMnB4IHNvbGlkIG9yYW5nZTtcbn1gLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9wYWdlU3R5bGluZy5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7SUFDSSxnQkFBZ0I7SUFDaEIsZUFBZTtJQUNmLFdBQVc7QUFDZjs7QUFFQTtJQUNJLHNCQUFzQjtJQUN0QixrQkFBa0I7QUFDdEI7O0FBRUE7SUFDSTtBQUNKOztBQUVBO0lBQ0ksYUFBYTtJQUNiLGlDQUFpQztJQUNqQyxhQUFhO0lBQ2IsWUFBWTtJQUNaLGlDQUFpQztBQUNyQzs7QUFFQTtJQUNJLGFBQWE7SUFDYix1QkFBdUI7SUFDdkIsbUJBQW1CO0lBQ25CLGVBQWU7QUFDbkI7O0FBRUE7SUFDSSxlQUFlO0lBQ2YsZ0JBQWdCO0lBQ2hCLG1CQUFtQjtBQUN2Qjs7QUFFQTtJQUNJLGtCQUFrQjtJQUNsQixhQUFhO0lBQ2IsNkJBQTZCO0lBQzdCLGVBQWU7SUFDZixvQ0FBb0M7QUFDeEM7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsdUJBQXVCO0lBQ3ZCLG1CQUFtQjtJQUNuQixlQUFlO0FBQ25COztBQUVBO0lBQ0ksWUFBWTtJQUNaLFdBQVc7SUFDWCxrQ0FBa0M7QUFDdEM7OztBQUdBLDhCQUE4QjtBQUM5QjtJQUNJLGtCQUFrQjtJQUNsQixZQUFZO0lBQ1osWUFBWTtJQUNaLHdCQUF3QjtJQUN4QixlQUFlO0FBQ25COztBQUVBOztBQUVBOztBQUVBO0lBQ0ksYUFBYTtJQUNiLHNCQUFzQjtJQUN0QixhQUFhO0lBQ2IsWUFBWTtJQUNaLDRCQUE0QjtBQUNoQzs7QUFFQTtJQUNJLGFBQWE7SUFDYixXQUFXO0lBQ1gsV0FBVztJQUNYLHNCQUFzQjtBQUMxQjs7QUFFQTtJQUNJLFdBQVc7SUFDWCxXQUFXO0lBQ1gsZUFBZTtJQUNmLG9DQUFvQztJQUNwQyx1QkFBdUI7QUFDM0I7O0FBRUE7SUFDSSxXQUFXO0lBQ1gsV0FBVztJQUNYLGVBQWU7SUFDZixvQ0FBb0M7SUFDcEMsdUJBQXVCO0FBQzNCOztBQUVBO0lBQ0ksOEJBQThCO0FBQ2xDOztBQUVBLFVBQVU7QUFDVjtJQUNJLGlCQUFpQjtJQUNqQixZQUFZO0FBQ2hCOzs7QUFHQSw2QkFBNkI7QUFDN0I7SUFDSSxhQUFhO0lBQ2IsdUJBQXVCO0lBQ3ZCLG1CQUFtQjtJQUNuQixlQUFlO0FBQ25COztBQUVBO0lBQ0ksYUFBYTtJQUNiLHNCQUFzQjtJQUN0Qiw2QkFBNkI7SUFDN0IsbUJBQW1CO0lBQ25CLFlBQVk7SUFDWixXQUFXO0lBQ1gsa0NBQWtDO0FBQ3RDOztBQUVBO0lBQ0ksV0FBVztJQUNYLFdBQVc7SUFDWCwyQkFBMkI7SUFDM0IsZUFBZTtJQUNmLGtCQUFrQjtBQUN0Qjs7OztBQUlBLDJCQUEyQjtBQUMzQjtJQUNJLGtCQUFrQjtJQUNsQixhQUFhO0lBQ2IsdUJBQXVCO0lBQ3ZCLG1CQUFtQjtJQUNuQixVQUFVO0lBQ1YsT0FBTztJQUNQLFFBQVE7SUFDUixpQkFBaUI7SUFDakIsa0JBQWtCO0lBQ2xCLFlBQVk7SUFDWixhQUFhO0lBQ2IsdUJBQXVCO0FBQzNCOztBQUVBO0lBQ0ksWUFBWTtJQUNaLFdBQVc7SUFDWCxrQ0FBa0M7QUFDdEM7OztBQUdBLCtCQUErQjtBQUMvQjtJQUNJLG9DQUFvQztBQUN4Qzs7QUFFQTtJQUNJLG9DQUFvQztBQUN4Qzs7QUFFQTtJQUNJLGtDQUFrQztBQUN0Qzs7QUFFQTtJQUNJLGtCQUFrQjtJQUNsQixTQUFTO0lBQ1QsV0FBVztJQUNYLFlBQVk7SUFDWixXQUFXO0lBQ1gsOEJBQThCO0FBQ2xDOztBQUVBO0lBQ0ksa0JBQWtCO0lBQ2xCLFVBQVU7SUFDVixPQUFPO0lBQ1AsUUFBUTtJQUNSLGlCQUFpQjtJQUNqQixrQkFBa0I7SUFDbEIsWUFBWTtJQUNaLFlBQVk7SUFDWix3QkFBd0I7QUFDNUJcIixcInNvdXJjZXNDb250ZW50XCI6W1wiaHRtbCwgYm9keSB7XFxuICAgIG1pbi1oZWlnaHQ6IDEwMCU7XFxuICAgIG1pbi13aWR0aDogMTAwJTtcXG4gICAgbWFyZ2luOiAwcHg7XFxufVxcblxcbmJvZHkge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBuYXZ5O1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxufVxcblxcbi5wcm9tcHQtYm94IHtcXG4gICAgZGlzcGxheTogbm9uZVxcbn1cXG5cXG4uZ2FtZS1jb250YWluZXIge1xcbiAgICBkaXNwbGF5OiBncmlkO1xcbiAgICBncmlkLXRlbXBsYXRlLXJvd3M6IDFmciA0ZnIgMS43ZnI7XFxuICAgIGhlaWdodDogMTAwdmg7XFxuICAgIHdpZHRoOiAxMDB2dztcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDU5LCA1OSwgNTkpO1xcbn1cXG5cXG4uaGVhZGVyIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGdyaWQtcm93OiAxIC8gMjtcXG59XFxuXFxuLmdhbWUtdGl0bGUge1xcbiAgICBmb250LXNpemU6IDY3cHg7XFxuICAgIG1hcmdpbi10b3A6IDIwcHg7XFxuICAgIG1hcmdpbi1ib3R0b206IDEwcHg7XFxufVxcblxcbi5nYW1lYm9hcmRzIHtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcXG4gICAgZ3JpZC1yb3c6IDIgLyAzO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTE0LCAxNTUsIDE1NSk7XFxufVxcblxcbi5kaWFsb2d1ZS1jb250YWluZXIge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgZ3JpZC1yb3c6IDMgLyA0O1xcbn1cXG5cXG4uZGlhbG9ndWUtYm94IHtcXG4gICAgaGVpZ2h0OiAyMHZoO1xcbiAgICB3aWR0aDogNTB2dztcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDc3LCAxMzQsIDc3KTtcXG59XFxuXFxuXFxuLyogZ2FtZWJvYXJkIHdyYXBwZXIgc3R5bGluZyAqL1xcbi5ib2FyZC13cmFwcGVyIHtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxuICAgIHdpZHRoOiA0MDBweDtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogYmlzcXVlO1xcbiAgICBwYWRkaW5nOiAwIDE1cHg7XFxufVxcblxcbi5ib2FyZC10aXRsZSB7XFxuXFxufVxcblxcbi5nYW1lYm9hcmQge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBoZWlnaHQ6IDQwMHB4O1xcbiAgICB3aWR0aDogNDAwcHg7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IGJsdWV2aW9sZXQ7XFxufVxcblxcbi5yb3cge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBoZWlnaHQ6IDEwJTtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHBpbms7XFxufVxcblxcbi5jZWxsIHtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIG1hcmdpbjogMHB4O1xcbiAgICBhc3BlY3QtcmF0aW86IDE7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYigyMjEsIDI0MSwgMjQxKTtcXG4gICAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XFxufVxcblxcbi5jZWxsLWMge1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgbWFyZ2luOiAwcHg7XFxuICAgIGFzcGVjdC1yYXRpbzogMTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDIyMSwgMjQxLCAyNDEpO1xcbiAgICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcXG59XFxuXFxuLmNlbGwtYzpob3ZlciB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IGFudGlxdWV3aGl0ZTtcXG59XFxuXFxuLyogaWNvbnMgKi9cXG4uYXR0YWNrLWljb24ge1xcbiAgICBvYmplY3QtZml0OiBjb3ZlcjtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbn1cXG5cXG5cXG4vKiBzdHlsaW5nIGZvciBkaWFsb2d1ZSBib3ggKi9cXG4uZGlhbG9ndWUtY29udGFpbmVyIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGdyaWQtcm93OiAzIC8gNDtcXG59XFxuXFxuLmRpYWxvZ3VlLWJveCB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtZXZlbmx5O1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBoZWlnaHQ6IDIwdmg7XFxuICAgIHdpZHRoOiA1NXZ3O1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoNzcsIDEzNCwgNzcpO1xcbn1cXG5cXG4udGV4dC1ib3gxLCAudGV4dC1ib3gyLCAudGV4dC1ib3gzIHtcXG4gICAgaGVpZ2h0OiA1dmg7XFxuICAgIHdpZHRoOiA1MHZ3O1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBsaWdodGJsdWU7XFxuICAgIGZvbnQtc2l6ZTogMjVweDtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbn1cXG5cXG5cXG5cXG4vKiBzdHlsaW5nIGZvciByZXNldCBnYW1lICovXFxuLmVuZC1nYW1lLWJveCB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIHRvcDogMjQ1cHg7XFxuICAgIGxlZnQ6IDA7XFxuICAgIHJpZ2h0OiAwO1xcbiAgICBtYXJnaW4tbGVmdDogYXV0bztcXG4gICAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xcbiAgICB3aWR0aDogMjIwcHg7XFxuICAgIGhlaWdodDogMjIwcHg7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IGF6dXJlO1xcbn1cXG5cXG4ucmVzZXQtZ2FtZS1idXR0b24ge1xcbiAgICBoZWlnaHQ6IDUwcHg7XFxuICAgIHdpZHRoOiA1MHB4O1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTQ0LCA1OCwgNTgpO1xcbn1cXG5cXG5cXG4vKiBzdHlsaW5nIGZvciBzaGlwIFBsYWNlbWVudCAqL1xcbi52YWxpZC1wbGFjZW1lbnQge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTEwLCAxODksIDExMCk7XFxufVxcblxcbi5pbnZhbGlkLXBsYWNlbWVudCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYigyNDksIDExNiwgMTE2KTtcXG59XFxuXFxuLnBsYWNlZCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYig3NiwgNzYsIDExMCk7XFxufVxcblxcbi5yb3RhdGUtc2hpcCB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdG9wOiAxNXB4O1xcbiAgICByaWdodDogMjBweDtcXG4gICAgaGVpZ2h0OiAyNXB4O1xcbiAgICB3aWR0aDogNjBweDtcXG4gICAgLyogYm9yZGVyOiAycHggc29saWQgb3JhbmdlOyAqL1xcbn1cXG5cXG4uc3RhcnQtZ2FtZS1idXR0b24ge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHRvcDogMzUwcHg7XFxuICAgIGxlZnQ6IDA7XFxuICAgIHJpZ2h0OiAwO1xcbiAgICBtYXJnaW4tbGVmdDogYXV0bztcXG4gICAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xcbiAgICBoZWlnaHQ6IDI1cHg7XFxuICAgIHdpZHRoOiAxMTBweDtcXG4gICAgYm9yZGVyOiAycHggc29saWQgb3JhbmdlO1xcbn1cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107XG5cbiAgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07XG5cbiAgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9wYWdlU3R5bGluZy5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3BhZ2VTdHlsaW5nLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiB1cGRhdGVyO1xufVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpO1xuXG4gICAgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG4gIGNzcyArPSBvYmouY3NzO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9XG5cbiAgLy8gRm9yIG9sZCBJRVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKCkge30sXG4gICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHt9XG4gICAgfTtcbiAgfVxuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwidmFyIHNjcmlwdFVybDtcbmlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmcuaW1wb3J0U2NyaXB0cykgc2NyaXB0VXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmxvY2F0aW9uICsgXCJcIjtcbnZhciBkb2N1bWVudCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5kb2N1bWVudDtcbmlmICghc2NyaXB0VXJsICYmIGRvY3VtZW50KSB7XG5cdGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KVxuXHRcdHNjcmlwdFVybCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjO1xuXHRpZiAoIXNjcmlwdFVybCkge1xuXHRcdHZhciBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIik7XG5cdFx0aWYoc2NyaXB0cy5sZW5ndGgpIHtcblx0XHRcdHZhciBpID0gc2NyaXB0cy5sZW5ndGggLSAxO1xuXHRcdFx0d2hpbGUgKGkgPiAtMSAmJiAoIXNjcmlwdFVybCB8fCAhL15odHRwKHM/KTovLnRlc3Qoc2NyaXB0VXJsKSkpIHNjcmlwdFVybCA9IHNjcmlwdHNbaS0tXS5zcmM7XG5cdFx0fVxuXHR9XG59XG4vLyBXaGVuIHN1cHBvcnRpbmcgYnJvd3NlcnMgd2hlcmUgYW4gYXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCB5b3UgbXVzdCBzcGVjaWZ5IGFuIG91dHB1dC5wdWJsaWNQYXRoIG1hbnVhbGx5IHZpYSBjb25maWd1cmF0aW9uXG4vLyBvciBwYXNzIGFuIGVtcHR5IHN0cmluZyAoXCJcIikgYW5kIHNldCB0aGUgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gdmFyaWFibGUgZnJvbSB5b3VyIGNvZGUgdG8gdXNlIHlvdXIgb3duIGxvZ2ljLlxuaWYgKCFzY3JpcHRVcmwpIHRocm93IG5ldyBFcnJvcihcIkF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyXCIpO1xuc2NyaXB0VXJsID0gc2NyaXB0VXJsLnJlcGxhY2UoLyMuKiQvLCBcIlwiKS5yZXBsYWNlKC9cXD8uKiQvLCBcIlwiKS5yZXBsYWNlKC9cXC9bXlxcL10rJC8sIFwiL1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18ucCA9IHNjcmlwdFVybDsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5jID0gdW5kZWZpbmVkOyIsImltcG9ydCAnLi9wYWdlU3R5bGluZy5jc3MnO1xuaW1wb3J0IHsgZ2FtZUJvYXJkQ29udHJvbGxlciB9IGZyb20gXCIuL2dhbWVib2FyZENvbnRyb2xsZXJcIjtcbmltcG9ydCB7IGluaXRpYWxpemVHYW1lIH0gZnJvbSBcIi4vZ2FtZUxvb3BcIjtcblxuXG5cbmluaXRpYWxpemVHYW1lKCkiXSwibmFtZXMiOlsiUGxheWVyIiwiZ2FtZUJvYXJkQ29udHJvbGxlciIsImNyZWF0ZUZsZWV0IiwiY3JlYXRlT3BwRmxlZXQiLCJkb21NYW5pcHVsYXRpb24iLCJkaWFsb2d1ZUNvbnRyb2xsZXIiLCJodW1hblNoaXBQbGFjZW1lbnQiLCJjb21wdXRlclBsYWNlbWVudCIsImluaXRpYWxpemVHYW1lIiwiY3JlYXRlR2FtZSIsInJ1bkRPTSIsImh1bWFuUGxheWVyIiwiaHVtYW5GbGVldCIsImNvbnNvbGUiLCJsb2ciLCJnYW1lQm9hcmQiLCJwbGF5ZXIiLCJodW1hbkJvYXJkIiwiY3JlYXRlQm9hcmQiLCJBSXBsYXllciIsImNvbXB1dGVyRmxlZXQiLCJjb21wdXRlckJvYXJkIiwicmVuZGVyU3RhcnQiLCJyZW5kZXJHYW1lQm9hcmQiLCJjcmVhdERpYWxvZ3VlIiwicmVuZGVyRGlhbG9ndWVCb3giLCJkaWFsb2d1ZSIsInBsYWNlU2hpcHNNZXNzYWdlIiwiY29tcHV0ZXJQbGFjZW1lbnRzIiwiaHVtYW5QbGFjZW1lbnQiLCJyZXNldEludGVyZmFjZSIsImJvZHlFIiwiZW5kQm94IiwicGxheWVyQm9hcmRzIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiZGlhbG9ndWVDb250YWluZXIiLCJkaWFsb2d1ZUJveCIsImdhbWVCb2FyZFdyYXBwZXJzIiwicXVlcnlTZWxlY3RvckFsbCIsImZvckVhY2giLCJlbGVtZW50IiwicmVtb3ZlQ2hpbGQiLCJTaGlwIiwiZGlhbG9ndWVSZWZyZXNoIiwiZmxlZXQiLCJuYW1lIiwicGxheWVyTmFtZSIsImJvYXJkIiwic2hpcHMiLCJpIiwiaiIsInBsYWNlSG9yaXpvbnRhbFNoaXAiLCJyb3ciLCJjb2wiLCJzaGlwIiwibGVuZ3RoIiwibmV3Q29vcmRzIiwiY29vcmRzIiwicHVzaCIsInBsYWNlVmVydGljYWxTaGlwIiwicmVjaWV2ZUF0dGFjayIsImF0dGFja1N0YXR1cyIsImNoZWNrSWZVc2VkIiwiY29vcmQiLCJoaXQiLCJ1cGRhdGVCb2FyZFNwb3QiLCJtb3ZlUmVzdWx0Iiwic3Vua0NoZWNrIiwiY2hlY2tJZlN1bmsiLCJzdW5rU2hpcE1lc3NhZ2UiLCJzcGxpY2UiLCJjaGVja0FsbFN1bmsiLCJlbmRHYW1lTWVzc2FnZSIsImVuZEdhbWUiLCJ1c2VHcmlkU3BvdCIsImZyZWV6ZUdyaWQiLCJyZW5kZXJFbmRHYW1lIiwiY29uc3RydWN0b3IiLCJ1c2VyUGxheWVyIiwiY29tcHV0ZXJQbGF5ZXIiLCJ2aXNpdGVkIiwicGlja1JhbmRvbUNlbGwiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJjb2x1bW4iLCJjb21wQ29vcmRzIiwicmVwZWF0Qm9vbGVhbiIsImNoZWNrUmVwZWF0Q2VsbCIsInN0cmluZ2VkQ29vcmRzIiwiSlNPTiIsInN0cmluZ2lmeSIsImV4aXN0c0Jvb2xlYW4iLCJzb21lIiwiaGl0cyIsImlzU3VuayIsImJvYXJkUnVuIiwiY2FycmllciIsImJhdHRsZXNoaXAiLCJkZXN0cm95ZXIiLCJzdWJtYXJpbmUiLCJwYXRyb2xCb2F0Iiwicm90YXRlQnV0dG9uIiwic3RhcnRCdXR0b24iLCJkaWFsb2d1ZVJ1biIsIm9jY3VwaWVkQ2VsbHMiLCJjdXJyZW50UGxhbmUiLCJjcmVhdGVSb3RhdGlvbkFiaWxpdHkiLCJodW1hbkNlbGxzIiwic2hpcEluZGV4IiwiY2VsbCIsImFkZEV2ZW50TGlzdGVuZXIiLCJjZWxsSG92ZXIiLCJjbGFzc0xpc3QiLCJjb250YWlucyIsInBsYWNlSG9yaXpvbnRhbGx5IiwiY29vcmRpbmF0ZXMiLCJhY3RpdmVDZWxscyIsInN0YXJ0QnV0dG9uRW1lcmdlIiwicGxhY2VWZXJ0aWNhbGx5IiwiY2VsbENvb3JkcyIsImdyb3VwZWRDZWxscyIsImNlbGxSb3ciLCJjZWxsQ29sdW1uIiwiYWN0aXZlQ2VsbCIsImdldEVsZW1lbnRCeUlkIiwiY29uZmxpY3RpbmciLCJjaGVja0NvbmZsaWN0aW5nU2hpcHMiLCJlbGVtIiwiYWRkIiwicmVtb3ZlIiwiYWxyZWFkeVVzZWQiLCJjaGVja0ZvclJlcGVhdCIsIm5ld1BsYW5lIiwic3dpdGNoUGxhbmUiLCJzdHlsZSIsImRpc3BsYXkiLCJiZWdpbkF0dGFja01lc3NhZ2UiLCJwb2ludGVyRXZlbnRzIiwicGxhbmVzIiwidXNlZENlbGxzIiwiY3JlYXRlU2hpcENvb3JkcyIsImNob3NlblBsYW5lIiwiY2hvb3NlUGxhbmUiLCJ0ZXN0SG9yaXpvbnRhbFNoaXAiLCJ0ZXN0VmVydGljYWxTaGlwIiwic3RhcnRpbmdDb29yZHMiLCJjcmVhdGVIb3Jpem9udGFsU3RhcnQiLCJmaXJzdFJlcGVhdCIsInJlcGVhdERldGVjdCIsInJlcGVhdCIsImNyZWF0ZVZlcnRpY2FsU3RhcnQiLCJjaG9zZW5JbmRleCIsInN0YXJ0aW5nQ29vcmQiLCJhcnJheSIsImhpdEljb24iLCJtaXNzSWNvbiIsImNvbXB1dGVyTW92ZXMiLCJzdGFydEdhbWVCdXR0b24iLCJjcmVhdGVFbGVtZW50IiwiYXBwZW5kRWxlbWVudCIsInRleHRDb250ZW50IiwiYm9hcmRDb250cm9sbGVyIiwiaXNDb21wdXRlciIsImdhbWVCb2FyZFdyYXBwZXIiLCJib2FyZFRpdGxlIiwiZ2FtZWJvYXJkIiwiYnVpbGRHcmlkIiwicm90YXRlU2hpcEJ1dHRvbiIsInNldEdyaWRUcmlnZ2VycyIsImdhbWVib2FyZEVsZW1lbnQiLCJzZXRBdHRyaWJ1dGUiLCJjb21wdXRlckJvYXJkQ29udHJvbGxlciIsImh1bWFuQm9hcmRDb250cm9sbGVyIiwiY2VsbHMiLCJzdGF0dXMiLCJhdHRhY2tJY29uIiwiSW1hZ2UiLCJ1c2VkQ2VsbCIsImFwcGVuZENoaWxkIiwic3JjIiwidGV4dEJveDEiLCJ0ZXh0Qm94MiIsInRleHRCb3gzIiwiYm9keUVsZW1lbnQiLCJib2R5IiwiZW5kR2FtZUJveCIsImVuZEdhbWVJY29uIiwicmVzZXRHYW1lQnV0dG9uIiwiZWxlbWVudE5hbWUiLCJjbGFzc05hbWUiLCJmYXRoZXJFbGVtZW50IiwiYXJndW1lbnRzIiwidW5kZWZpbmVkIl0sInNvdXJjZVJvb3QiOiIifQ==