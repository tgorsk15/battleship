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
  runDOM.renderDialogueBox();

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
  const rotateShipButton = document.querySelector('.rotate-ship');
  gameBoardWrappers.forEach(element => {
    playerBoards.removeChild(element);
  });
  playerBoards.removeChild(rotateShipButton);
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
/* eslint-disable no-use-before-define */
/* eslint-disable import/prefer-default-export */

// have to add buttons to UI to switch betwen horizontal and vertical
// have to make a start button that user can press when all 
// ships are placed

const humanShipPlacement = function (humanBoard, ships) {
  // memory storage for where cells can't be used again
  const rotateButton = document.querySelector('.rotate-ship');
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
            computerPlacement();
          }
          console.log(shipIndex);
        } else if (currentPlane === 'vertical') {
          placeVertically(cell.coordinates, cell.activeCells, ships[shipIndex]);
          shipIndex += 1;
          if (shipIndex === 5) {
            computerPlacement();
          }
          console.log(shipIndex);
        }
      }
      return shipIndex;
    });
  });
  function cellHover(cell, ship) {
    console.log(ship);
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
        console.log('this is valid!');
        groupedCells.forEach(elem => {
          elem.classList.add('valid-placement');
        });
      } else if (cellCoords[1] + ship.length - 1 > 10 || conflicting === true) {
        console.log('not valid');
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
        console.log('this is valid!');
        groupedCells.forEach(elem => {
          elem.classList.add('valid-placement');
        });
      } else if (cellCoords[0] + ship.length - 1 > 10 || conflicting === true) {
        console.log('not valid');
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
    // maybe put trigger in here to check if all ships are placed
    // if true, disbale pointer events and run function for
    // placing computer ships
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
  return {
    cellHover,
    placeHorizontally,
    checkConflictingShips
  };
};
const computerPlacement = function (computerBoard, ships) {
  const planes = ['horizontal', 'vertical'];
  const usedCells = [];
  console.log(ships);
  for (let i = 0; i < ships.length; i++) {
    createShipCoords(ships[i]);
  }
  function createShipCoords(ship) {
    const chosenPlane = choosePlane(planes);
    // using to test:
    // const chosenPlane = 'horizontal'
    console.log(chosenPlane);
    if (chosenPlane === 'horizontal') {
      testHorizontalShip(ship);
    } else if (chosenPlane === 'vertical') {
      testVerticalShip(ship);
    }
  }
  function testHorizontalShip(ship) {
    const startingCoords = createHorizontalStart(ship);
    // console.log(startingCoords);
    usedCells.push(startingCoords);
    for (let i = 1; i < ship.length; i++) {
      const newCoords = [startingCoords[0], startingCoords[1] + i];
      const repeat = checkForRepeat(newCoords, usedCells);
      if (repeat === false) {
        usedCells.push(newCoords);
        if (i + 1 === ship.length) {
          computerBoard.placeHorizontalShip(startingCoords[0], startingCoords[1], ship);
        }
      } else if (repeat === true) {
        testHorizontalShip(ship);
      }
    }
  }
  function testVerticalShip(ship) {
    const startingCoords = createVerticalStart(ship);
    // console.log(startingCoords);
    usedCells.push(startingCoords);
    for (let i = 1; i < ship.length; i++) {
      const newCoords = [startingCoords[0] + i, startingCoords[1]];
      const repeat = checkForRepeat(newCoords, usedCells);
      if (repeat === false) {
        usedCells.push(newCoords);
        if (i + 1 === ship.length) {
          computerBoard.placeVerticalShip(startingCoords[0], startingCoords[1], ship);
        }
      } else if (repeat === true) {
        testVerticalShip(ship);
      }
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
  // function  placeShipsMessage() {

  // }

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
    /* margin-left: auto;
    margin-right: auto; */
    height: 25px;
    width: 60px;
    border: 2px solid orange;
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
}`, "",{"version":3,"sources":["webpack://./src/pageStyling.css"],"names":[],"mappings":"AAAA;IACI,gBAAgB;IAChB,eAAe;IACf,WAAW;AACf;;AAEA;IACI,sBAAsB;IACtB,kBAAkB;AACtB;;AAEA;IACI;AACJ;;AAEA;IACI,aAAa;IACb,iCAAiC;IACjC,aAAa;IACb,YAAY;IACZ,iCAAiC;AACrC;;AAEA;IACI,aAAa;IACb,eAAe;AACnB;;AAEA;IACI,kBAAkB;IAClB,aAAa;IACb,6BAA6B;IAC7B,eAAe;IACf,oCAAoC;AACxC;;AAEA;IACI,aAAa;IACb,uBAAuB;IACvB,mBAAmB;IACnB,eAAe;AACnB;;AAEA;IACI,YAAY;IACZ,WAAW;IACX,kCAAkC;AACtC;;;AAGA,8BAA8B;AAC9B;IACI,kBAAkB;IAClB,YAAY;IACZ,YAAY;IACZ,wBAAwB;IACxB,eAAe;AACnB;;AAEA;;AAEA;;AAEA;IACI,aAAa;IACb,sBAAsB;IACtB,aAAa;IACb,YAAY;IACZ,4BAA4B;AAChC;;AAEA;IACI,aAAa;IACb,4BAA4B;IAC5B,WAAW;IACX,WAAW;IACX,sBAAsB;AAC1B;;AAEA;IACI,WAAW;IACX,WAAW;IACX,eAAe;IACf,oCAAoC;IACpC,uBAAuB;AAC3B;;AAEA;IACI,WAAW;IACX,WAAW;IACX,eAAe;IACf,oCAAoC;IACpC,uBAAuB;AAC3B;;AAEA;IACI,8BAA8B;AAClC;;;AAGA,6BAA6B;AAC7B;IACI,aAAa;IACb,uBAAuB;IACvB,mBAAmB;IACnB,eAAe;AACnB;;AAEA;IACI,aAAa;IACb,sBAAsB;IACtB,6BAA6B;IAC7B,YAAY;IACZ,WAAW;IACX,kCAAkC;AACtC;;AAEA;IACI,WAAW;IACX,WAAW;IACX,2BAA2B;AAC/B;;AAEA;IACI,WAAW;IACX,WAAW;IACX,2BAA2B;AAC/B;;AAEA;IACI,WAAW;IACX,WAAW;IACX,2BAA2B;AAC/B;;;AAGA,2BAA2B;AAC3B;IACI,kBAAkB;IAClB,aAAa;IACb,uBAAuB;IACvB,mBAAmB;IACnB,UAAU;IACV,OAAO;IACP,QAAQ;IACR,iBAAiB;IACjB,kBAAkB;IAClB,YAAY;IACZ,aAAa;IACb,uBAAuB;AAC3B;;AAEA;IACI,YAAY;IACZ,WAAW;IACX,kCAAkC;AACtC;;;AAGA,+BAA+B;;AAE/B;IACI,oCAAoC;AACxC;;AAEA;IACI,oCAAoC;AACxC;;AAEA;IACI,kCAAkC;AACtC;;AAEA;IACI,kBAAkB;IAClB,SAAS;IACT,WAAW;IACX;yBACqB;IACrB,YAAY;IACZ,WAAW;IACX,wBAAwB;AAC5B;;AAEA;IACI,kBAAkB;IAClB,UAAU;IACV,OAAO;IACP,QAAQ;IACR,iBAAiB;IACjB,kBAAkB;IAClB,YAAY;IACZ,YAAY;IACZ,wBAAwB;AAC5B","sourcesContent":["html, body {\n    min-height: 100%;\n    min-width: 100%;\n    margin: 0px;\n}\n\nbody {\n    background-color: navy;\n    position: relative;\n}\n\n.prompt-box {\n    display: none\n}\n\n.game-container {\n    display: grid;\n    grid-template-rows: 1fr 4fr 1.7fr;\n    height: 100vh;\n    width: 100vw;\n    background-color: rgb(59, 59, 59);\n}\n\n.header {\n    display: flex;\n    grid-row: 1 / 2;\n}\n\n.gameboards {\n    position: relative;\n    display: flex;\n    justify-content: space-around;\n    grid-row: 2 / 3;\n    background-color: rgb(114, 155, 155);\n}\n\n.dialogue-container {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    grid-row: 3 / 4;\n}\n\n.dialogue-box {\n    height: 20vh;\n    width: 50vw;\n    background-color: rgb(77, 134, 77);\n}\n\n\n/* gameboard wrapper styling */\n.board-wrapper {\n    position: relative;\n    height: 100%;\n    width: 400px;\n    background-color: bisque;\n    padding: 0 15px;\n}\n\n.board-title {\n\n}\n\n.gameboard {\n    display: flex;\n    flex-direction: column;\n    height: 400px;\n    width: 400px;\n    background-color: blueviolet;\n}\n\n.row {\n    display: flex;\n    /* flex-direction: column; */\n    height: 10%;\n    width: 100%;\n    background-color: pink;\n}\n\n.cell {\n    width: 100%;\n    margin: 0px;\n    aspect-ratio: 1;\n    background-color: rgb(221, 241, 241);\n    border: 1px solid black;\n}\n\n.cell-c {\n    width: 100%;\n    margin: 0px;\n    aspect-ratio: 1;\n    background-color: rgb(221, 241, 241);\n    border: 1px solid black;\n}\n\n.cell-c:hover {\n    background-color: antiquewhite;\n}\n\n\n/* styling for dialogue box */\n.dialogue-container {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    grid-row: 3 / 4;\n}\n\n.dialogue-box {\n    display: flex;\n    flex-direction: column;\n    justify-content: space-evenly;\n    height: 20vh;\n    width: 45vw;\n    background-color: rgb(77, 134, 77);\n}\n\n.text-box1 {\n    height: 4vh;\n    width: 40vw;\n    background-color: lightblue;\n}\n\n.text-box2 {\n    height: 4vh;\n    width: 40vw;\n    background-color: lightblue;\n}\n\n.text-box3 {\n    height: 4vh;\n    width: 40vw;\n    background-color: lightblue;\n}\n\n\n/* styling for reset game */\n.end-game-box {\n    position: absolute;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    top: 245px;\n    left: 0;\n    right: 0;\n    margin-left: auto;\n    margin-right: auto;\n    width: 220px;\n    height: 220px;\n    background-color: azure;\n}\n\n.reset-game-button {\n    height: 50px;\n    width: 50px;\n    background-color: rgb(144, 58, 58);\n}\n\n\n/* styling for ship Placement */\n\n.valid-placement {\n    background-color: rgb(110, 189, 110);\n}\n\n.invalid-placement {\n    background-color: rgb(249, 116, 116);\n}\n\n.placed {\n    background-color: rgb(76, 76, 110);\n}\n\n.rotate-ship {\n    position: absolute;\n    top: 15px;\n    right: 20px;\n    /* margin-left: auto;\n    margin-right: auto; */\n    height: 25px;\n    width: 60px;\n    border: 2px solid orange;\n}\n\n.start-game-button {\n    position: absolute;\n    top: 350px;\n    left: 0;\n    right: 0;\n    margin-left: auto;\n    margin-right: auto;\n    height: 25px;\n    width: 110px;\n    border: 2px solid orange;\n}"],"sourceRoot":""}]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxPQUFPLHNGQUFzRixZQUFZLFdBQVcsVUFBVSxNQUFNLEtBQUssWUFBWSxhQUFhLE9BQU8sS0FBSyxLQUFLLE1BQU0sS0FBSyxVQUFVLFlBQVksV0FBVyxVQUFVLFlBQVksT0FBTyxLQUFLLFVBQVUsVUFBVSxPQUFPLEtBQUssWUFBWSxXQUFXLFlBQVksV0FBVyxZQUFZLE9BQU8sS0FBSyxVQUFVLFlBQVksYUFBYSxXQUFXLE9BQU8sS0FBSyxVQUFVLFVBQVUsWUFBWSxRQUFRLFlBQVksTUFBTSxZQUFZLFdBQVcsVUFBVSxZQUFZLFdBQVcsT0FBTyxNQUFNLE1BQU0sS0FBSyxVQUFVLFlBQVksV0FBVyxVQUFVLFlBQVksT0FBTyxLQUFLLFVBQVUsWUFBWSxXQUFXLFVBQVUsWUFBWSxPQUFPLEtBQUssVUFBVSxVQUFVLFVBQVUsWUFBWSxhQUFhLE9BQU8sS0FBSyxVQUFVLFVBQVUsVUFBVSxZQUFZLGFBQWEsT0FBTyxLQUFLLFlBQVksUUFBUSxZQUFZLE1BQU0sVUFBVSxZQUFZLGFBQWEsV0FBVyxPQUFPLEtBQUssVUFBVSxZQUFZLGFBQWEsV0FBVyxVQUFVLFlBQVksT0FBTyxLQUFLLFVBQVUsVUFB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QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O1VDYkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlDQUFpQyxXQUFXO1dBQzVDO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1dDTkE7Ozs7Ozs7Ozs7Ozs7O0FDQTJCO0FBQ2lDO0FBQ2hCO0FBSTVDaEUseURBQWMsQ0FBQyxDQUFDLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tYWluLXRlbXBsYXRlLy4vc3JjL2dhbWVMb29wLmpzIiwid2VicGFjazovL21haW4tdGVtcGxhdGUvLi9zcmMvZ2FtZWJvYXJkQ29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly9tYWluLXRlbXBsYXRlLy4vc3JjL3BsYXllci5qcyIsIndlYnBhY2s6Ly9tYWluLXRlbXBsYXRlLy4vc3JjL3NoaXAtb2JqZWN0LmpzIiwid2VicGFjazovL21haW4tdGVtcGxhdGUvLi9zcmMvc2hpcFBsYWNlbWVudC5qcyIsIndlYnBhY2s6Ly9tYWluLXRlbXBsYXRlLy4vc3JjL3VzZXJJbnRlcmZhY2UuanMiLCJ3ZWJwYWNrOi8vbWFpbi10ZW1wbGF0ZS8uL3NyYy9wYWdlU3R5bGluZy5jc3MiLCJ3ZWJwYWNrOi8vbWFpbi10ZW1wbGF0ZS8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vbWFpbi10ZW1wbGF0ZS8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL21haW4tdGVtcGxhdGUvLi9zcmMvcGFnZVN0eWxpbmcuY3NzP2E5YjciLCJ3ZWJwYWNrOi8vbWFpbi10ZW1wbGF0ZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9tYWluLXRlbXBsYXRlLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly9tYWluLXRlbXBsYXRlLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL21haW4tdGVtcGxhdGUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vbWFpbi10ZW1wbGF0ZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL21haW4tdGVtcGxhdGUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly9tYWluLXRlbXBsYXRlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL21haW4tdGVtcGxhdGUvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vbWFpbi10ZW1wbGF0ZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbWFpbi10ZW1wbGF0ZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL21haW4tdGVtcGxhdGUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9tYWluLXRlbXBsYXRlL3dlYnBhY2svcnVudGltZS9ub25jZSIsIndlYnBhY2s6Ly9tYWluLXRlbXBsYXRlLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9wcmVmZXItZGVmYXVsdC1leHBvcnQgKi9cbmltcG9ydCB7IFBsYXllciwgdXNlclBsYXllciwgY29tcHV0ZXJQbGF5ZXIgfSBmcm9tIFwiLi9wbGF5ZXJcIjtcbmltcG9ydCB7IGdhbWVCb2FyZENvbnRyb2xsZXIgfSBmcm9tIFwiLi9nYW1lYm9hcmRDb250cm9sbGVyXCI7XG5pbXBvcnQgeyBjcmVhdGVGbGVldCwgY3JlYXRlT3BwRmxlZXQgfSBmcm9tIFwiLi9zaGlwLW9iamVjdFwiO1xuaW1wb3J0IHsgZG9tTWFuaXB1bGF0aW9uIH0gZnJvbSBcIi4vdXNlckludGVyZmFjZVwiO1xuaW1wb3J0IHsgaHVtYW5TaGlwUGxhY2VtZW50LCBjb21wdXRlclBsYWNlbWVudCB9IGZyb20gXCIuL3NoaXBQbGFjZW1lbnRcIjtcblxuZXhwb3J0IGNvbnN0IGluaXRpYWxpemVHYW1lID0gZnVuY3Rpb24gY3JlYXRlR2FtZSgpIHtcbiAgICBjb25zdCBydW5ET00gPSBkb21NYW5pcHVsYXRpb24oKTtcblxuICAgIGNvbnN0IGh1bWFuUGxheWVyID0gbmV3IFBsYXllcignUGxheWVyIDEnKVxuICAgIGNvbnN0IGh1bWFuRmxlZXQgPSBjcmVhdGVGbGVldCgpXG4gICAgY29uc29sZS5sb2coaHVtYW5GbGVldClcbiAgICBodW1hblBsYXllci5nYW1lQm9hcmQgPSBnYW1lQm9hcmRDb250cm9sbGVyKGh1bWFuRmxlZXQsIGh1bWFuUGxheWVyLnBsYXllcik7XG4gICAgY29uc3QgaHVtYW5Cb2FyZCA9IGh1bWFuUGxheWVyLmdhbWVCb2FyZFxuICAgIGh1bWFuQm9hcmQuY3JlYXRlQm9hcmQoKTtcbiAgICBcblxuICAgIGNvbnN0IEFJcGxheWVyID0gbmV3IFBsYXllcignUGxheWVyIDInKTtcbiAgICBjb25zdCBjb21wdXRlckZsZWV0ID0gY3JlYXRlT3BwRmxlZXQoKTtcbiAgICBBSXBsYXllci5nYW1lQm9hcmQgPSBnYW1lQm9hcmRDb250cm9sbGVyKGNvbXB1dGVyRmxlZXQsIEFJcGxheWVyLnBsYXllcik7XG4gICAgY29uc3QgY29tcHV0ZXJCb2FyZCA9IEFJcGxheWVyLmdhbWVCb2FyZDtcbiAgICBjb21wdXRlckJvYXJkLmNyZWF0ZUJvYXJkKCk7XG5cbiAgICBydW5ET00ucmVuZGVyU3RhcnQoKTtcbiAgICBydW5ET00ucmVuZGVyR2FtZUJvYXJkKGNvbXB1dGVyQm9hcmQuY3JlYXRlQm9hcmQoKSwgQUlwbGF5ZXIucGxheWVyKTtcbiAgICBydW5ET00ucmVuZGVyR2FtZUJvYXJkKGNvbXB1dGVyQm9hcmQsIGh1bWFuUGxheWVyLnBsYXllciwgaHVtYW5Cb2FyZCk7XG4gICAgXG4gICAgLy8gY2FsbCByZW5kZXIgZGlhbG9ndWUgYm94IGhlcmVcbiAgICBydW5ET00ucmVuZGVyRGlhbG9ndWVCb3goKTtcblxuICAgIC8vIGNhbGwgY29tcHV0ZXJQbGFjZW1lbnQgdG8gc2V0IHVwIGNvbXB1dGVyJ3MgY2hpcHM6XG4gICAgY29uc3QgY29tcHV0ZXJQbGFjZW1lbnRzID0gY29tcHV0ZXJQbGFjZW1lbnQoY29tcHV0ZXJCb2FyZCwgY29tcHV0ZXJGbGVldCk7XG4gICAgXG4gICAgLy8gY2FsbCBzaGlwUGxhY2VtZW50IGZ1bmN0aW9uIGhlcmUgZm9yIGh1bWFuQm9hcmRcbiAgICBjb25zdCBodW1hblBsYWNlbWVudCA9IGh1bWFuU2hpcFBsYWNlbWVudChodW1hbkJvYXJkLCBodW1hbkZsZWV0KTtcblxuICAgXG59XG5cbmV4cG9ydCBjb25zdCByZXNldEludGVyZmFjZSA9IGZ1bmN0aW9uIChib2R5RSwgZW5kQm94KSB7XG4gICAgY29uc29sZS5sb2coJ3Jlc2V0aW5nIGFsbCB0aGlzIHNoaXQnKTtcbiAgICBjb25zdCBwbGF5ZXJCb2FyZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ2FtZWJvYXJkcycpO1xuICAgIGNvbnN0IGRpYWxvZ3VlQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRpYWxvZ3VlLWNvbnRhaW5lcicpO1xuICAgIGNvbnN0IGRpYWxvZ3VlQm94ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRpYWxvZ3VlLWJveCcpO1xuICAgIGNvbnN0IGdhbWVCb2FyZFdyYXBwZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmJvYXJkLXdyYXBwZXInKTtcblxuICAgIGNvbnN0IHJvdGF0ZVNoaXBCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucm90YXRlLXNoaXAnKTtcblxuXG4gICAgZ2FtZUJvYXJkV3JhcHBlcnMuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuICAgICAgICBwbGF5ZXJCb2FyZHMucmVtb3ZlQ2hpbGQoZWxlbWVudCk7XG4gICAgfSk7XG4gICAgcGxheWVyQm9hcmRzLnJlbW92ZUNoaWxkKHJvdGF0ZVNoaXBCdXR0b24pO1xuXG4gICAgZGlhbG9ndWVDb250YWluZXIucmVtb3ZlQ2hpbGQoZGlhbG9ndWVCb3gpO1xuICAgIGJvZHlFLnJlbW92ZUNoaWxkKGVuZEJveCk7XG5cbiAgICBpbml0aWFsaXplR2FtZSgpO1xuXG59IiwiLyogZXNsaW50LWRpc2FibGUgbm8tdXNlLWJlZm9yZS1kZWZpbmUgKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLWVsc2UtcmV0dXJuICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1sb29wLWZ1bmMgKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLXBsdXNwbHVzICovXG4vKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvcHJlZmVyLWRlZmF1bHQtZXhwb3J0ICovXG5cbi8vIGdhbWVCb2FyZCBzaG91bGQgY2hlY2sgaWYgYSBnYW1lIGlzIG92ZXIgYnkgc2VlaW5nIGlmIHRoZVxuLy8gbGVuZ3RoIG9mIFwic2hpcHNcIiBpcyB6ZXJvIChjaGVja0FsbFN1bmspXG5cbi8vIHBsYWNpbmcgc2hpcHMgdmVydGljYWxseS4uLiBwb3NzaWJsZSBpZGVhOiBoYXZlIGEgY29sdW1uIG51bWJlciAoZS5nIDMpXG4vLyB0aGF0IHlvdSB1c2UgdG8gc2VsZWN0IHRoZSBjb3JyZXNwb25kaW5nIGFycmF5IGl0ZW0gaW4gZWFjaFxuLy8gb2YgdGhlIGFycmF5cyB0aGF0IHJlcHJlc2VudHMgYSByb3cgb24gdGhlIGJvYXJkXG5pbXBvcnQgeyBTaGlwLCBjcmVhdGVGbGVldCB9IGZyb20gXCIuL3NoaXAtb2JqZWN0XCJcbmltcG9ydCB7IGRvbU1hbmlwdWxhdGlvbiwgZGlhbG9ndWVDb250cm9sbGVyIH0gZnJvbSBcIi4vdXNlckludGVyZmFjZVwiO1xuXG5jb25zdCBydW5ET00gPSBkb21NYW5pcHVsYXRpb24oKTtcbmNvbnN0IGRpYWxvZ3VlUmVmcmVzaCA9IGRpYWxvZ3VlQ29udHJvbGxlcigpO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2FtZUJvYXJkQ29udHJvbGxlcihmbGVldCwgbmFtZSkge1xuICAgIGNvbnN0IHBsYXllck5hbWUgPSBuYW1lO1xuICAgIGNvbnN0IGJvYXJkID0gW107XG4gICAgY29uc3Qgc2hpcHMgPSBmbGVldDtcblxuICAgIC8vIGNvbnNvbGUubG9nKHNoaXBzKTtcblxuXG4gICAgZnVuY3Rpb24gY3JlYXRlQm9hcmQoKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgICAgICAgICAgYm9hcmRbaV0gPSBbXTtcblxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaisrKSB7XG4gICAgICAgICAgICAgICAgYm9hcmRbaV1bal0gPSBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKGJvYXJkKTtcbiAgICAgICAgcmV0dXJuIGJvYXJkXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGxhY2VIb3Jpem9udGFsU2hpcChyb3csIGNvbCwgc2hpcCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IG5ld0Nvb3JkcyA9IFtyb3csIGNvbCArIGldO1xuICAgICAgICAgICAgc2hpcC5jb29yZHMucHVzaChuZXdDb29yZHMpXG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2coc2hpcCk7XG4gICAgICAgIGNvbnNvbGUubG9nKHNoaXAubmFtZSk7XG4gICAgICAgIGNvbnNvbGUubG9nKHNoaXBzKVxuICAgICAgICByZXR1cm4gc2hpcFxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBsYWNlVmVydGljYWxTaGlwKHJvdywgY29sLCBzaGlwKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgbmV3Q29vcmRzID0gW3JvdyArIGksIGNvbF07XG4gICAgICAgICAgICBzaGlwLmNvb3Jkcy5wdXNoKG5ld0Nvb3Jkcyk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2coc2hpcClcbiAgICAgICAgY29uc29sZS5sb2coc2hpcHMpXG4gICAgICAgIHJldHVybiBzaGlwXG4gICAgfVxuICAgIFxuICAgIGZ1bmN0aW9uIHJlY2lldmVBdHRhY2soY29vcmRzKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGNvb3JkcylcbiAgICAgICAgbGV0IGF0dGFja1N0YXR1cyA9ICdtaXNzJztcblxuICAgICAgICAvLyBjaGVjayB0byBzZWUgaWYgY29vcmRzIGhhdmUgYWxyZWFkeSBiZWVuIHVzZWQ6XG4gICAgICAgIGlmIChjaGVja0lmVXNlZChjb29yZHMpID09PSB0cnVlKSB7XG4gICAgICAgICAgICByZXR1cm4gJ2ZpbGxlZCBhbHJlYWR5J1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgc2hpcHNbaV0uY29vcmRzLmZvckVhY2goKGNvb3JkKSA9PiB7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKGNoZWNrSWZVc2VkKGNvb3JkcykgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdmaWxsZWQgYWxyZWFkeSdcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoY29vcmRbMF0gPT09IGNvb3Jkc1swXSAmJiBjb29yZFsxXSA9PT0gY29vcmRzWzFdKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdoaXQnKTtcbiAgICAgICAgICAgICAgICAgICAgYXR0YWNrU3RhdHVzID0gJ2hpdCdcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYXR0YWNrU3RhdHVzKVxuICAgICAgICAgICAgICAgICAgICBzaGlwc1tpXS5oaXQoKTtcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlQm9hcmRTcG90KGNvb3Jkcyk7XG4gICAgICAgICAgICAgICAgICAgIGRpYWxvZ3VlUmVmcmVzaC5tb3ZlUmVzdWx0KGF0dGFja1N0YXR1cyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYXllck5hbWUsIGNvb3Jkcywgc2hpcHNbaV0pXG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3Vua0NoZWNrID0gc2hpcHNbaV0uY2hlY2tJZlN1bmsoKVxuICAgICAgICAgICAgICAgICAgICBpZiAoc3Vua0NoZWNrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkaWFsb2d1ZVJlZnJlc2guc3Vua1NoaXBNZXNzYWdlKHNoaXBzW2ldLCBwbGF5ZXJOYW1lKVxuICAgICAgICAgICAgICAgICAgICAgICAgc2hpcHMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tBbGxTdW5rKClcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIHVwZGF0ZUJvYXJkU3BvdChjb29yZHMsIGF0dGFja1N0YXR1cyk7XG4gICAgICAgIGlmIChhdHRhY2tTdGF0dXMgPT09ICdtaXNzJykge1xuICAgICAgICAgICAgZGlhbG9ndWVSZWZyZXNoLm1vdmVSZXN1bHQoYXR0YWNrU3RhdHVzLFxuICAgICAgICAgICAgICAgIHBsYXllck5hbWUsIGNvb3JkcylcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGF0dGFja1N0YXR1c1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNoZWNrQWxsU3VuaygpIHtcbiAgICAgICAgY29uc29sZS5sb2coc2hpcHMpO1xuICAgICAgICBpZiAoc2hpcHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICBkaWFsb2d1ZVJlZnJlc2guZW5kR2FtZU1lc3NhZ2UocGxheWVyTmFtZSlcbiAgICAgICAgICAgIGVuZEdhbWUoKVxuICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlQm9hcmRTcG90KGNvb3JkcywgYXR0YWNrU3RhdHVzKSB7XG4gICAgICAgIGJvYXJkW2Nvb3Jkc1swXSAtIDFdW2Nvb3Jkc1sxXSAtIDFdID0gdHJ1ZTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coYm9hcmQpXG4gICAgICAgIHJ1bkRPTS51c2VHcmlkU3BvdChjb29yZHMsIGF0dGFja1N0YXR1cywgcGxheWVyTmFtZSlcbiAgICAgICAgcmV0dXJuIGJvYXJkXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2hlY2tJZlVzZWQoY29vcmRzKSB7XG4gICAgICAgIGlmIChib2FyZFtjb29yZHNbMF0gLSAxXVtjb29yZHNbMV0gLSAxXSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ2FscmVhZHkgdXNlZCcpXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICBcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBlbmRHYW1lKCkge1xuICAgICAgICAvLyB3YW50IHRvIGRpc2FibGUgYm90aCBnYW1lQm9hcmRzXG4gICAgICAgIC8vIHdhbnQgdG8gbWFrZSB0aGUgcmVzdGFydCBidXR0b24gYXBwZWFyXG4gICAgICAgIGNvbnNvbGUubG9nKCdlbmRpbmcgZ2FtZScpO1xuICAgICAgICBydW5ET00uZnJlZXplR3JpZCgpO1xuICAgICAgICBydW5ET00ucmVuZGVyRW5kR2FtZSgpO1xuICAgIH1cbiAgICAvLyBsaWtlbHkgd2lsbCBoYXZlIHRvIGltcGxlbWVudCBjaGVjayB0byBtYWtlIHN1cmUgYSBzaGlwIGNhblxuICAgIC8vIGJlIHBsYWNlZCB3aXRoIG5vIG92ZXJsYXBcblxuXG4gICAgcmV0dXJuIHsgY3JlYXRlQm9hcmQsIHBsYWNlSG9yaXpvbnRhbFNoaXAsIHBsYWNlVmVydGljYWxTaGlwLCByZWNpZXZlQXR0YWNrLFxuICAgIGNoZWNrQWxsU3VuaywgdXBkYXRlQm9hcmRTcG90LCBjaGVja0lmVXNlZCwgZW5kR2FtZSB9XG59XG5cbiIsIi8vIGNyZWF0ZSBib3RoIHRoZSB1c2VyIHBsYXllciBhbmQgdGhlIGNvbXB1dGVyIHBsYXllciBoZXJlXG5cbi8vIGNvbXB1dGVyIHBsYXllciBoYXMgYXR0YWNrIGNvb3JkaW5hdGVzIGdlbmVyYXRvciBmdW5jdGlvblxuaW1wb3J0IHsgZ2FtZUJvYXJkQ29udHJvbGxlciB9IGZyb20gXCIuL2dhbWVib2FyZENvbnRyb2xsZXJcIjtcblxuZXhwb3J0IGNsYXNzIFBsYXllciB7XG4gICAgY29uc3RydWN0b3IocGxheWVyLCBnYW1lQm9hcmQpIHtcbiAgICAgICAgdGhpcy5wbGF5ZXIgPSBwbGF5ZXI7XG4gICAgICAgIC8vIHRoaXMucGxheWVyU2hpcHMgPSBbXVxuICAgICAgICB0aGlzLmdhbWVCb2FyZD0gbnVsbFxuICAgIH1cbn1cblxuXG5leHBvcnQgY29uc3QgdXNlclBsYXllciA9IGZ1bmN0aW9uICgpIHtcblxufVxuXG5leHBvcnQgY29uc3QgY29tcHV0ZXJQbGF5ZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgdmlzaXRlZCA9IFtdO1xuXG4gICAgZnVuY3Rpb24gcGlja1JhbmRvbUNlbGwoaHVtYW5Cb2FyZCkge1xuICAgICAgICBjb25zdCByb3cgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCkgKyAxXG4gICAgICAgIGNvbnN0IGNvbHVtbiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKSArIDFcbiAgICAgICAgY29uc3QgY29tcENvb3JkcyA9IFtyb3csIGNvbHVtbl07XG5cbiAgICAgICAgY29uc3QgcmVwZWF0Qm9vbGVhbiA9IGNoZWNrUmVwZWF0Q2VsbChjb21wQ29vcmRzKVxuICAgICAgICBjb25zb2xlLmxvZyhyZXBlYXRCb29sZWFuKVxuICAgICAgICBpZiAocmVwZWF0Qm9vbGVhbiA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2NvbXB1dGVyIHBpY2tlZCB1c2VkIGNlbGwhIScpXG4gICAgICAgICAgICBwaWNrUmFuZG9tQ2VsbChodW1hbkJvYXJkKTtcbiAgICAgICAgfSBlbHNlIGlmIChyZXBlYXRCb29sZWFuID09PSBmYWxzZSkge1xuICAgICAgICAgICAgdmlzaXRlZC5wdXNoKGNvbXBDb29yZHMpO1xuICAgICAgICAgICAgaHVtYW5Cb2FyZC5yZWNpZXZlQXR0YWNrKGNvbXBDb29yZHMpO1xuXG4gICAgICAgICAgICByZXR1cm4gY29tcENvb3JkcyBcbiAgICAgICAgfVxuICAgICAgICBcblxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNoZWNrUmVwZWF0Q2VsbChjb29yZHMpIHtcbiAgICAgICAgY29uc3Qgc3RyaW5nZWRDb29yZHMgPSBKU09OLnN0cmluZ2lmeShjb29yZHMpO1xuICAgICAgICBjb25zdCBleGlzdHNCb29sZWFuID0gdmlzaXRlZC5zb21lKChjb29yZCkgPT4gSlNPTi5zdHJpbmdpZnkoY29vcmQpID09PSBzdHJpbmdlZENvb3JkcylcbiAgICAgICAgY29uc29sZS5sb2coZXhpc3RzQm9vbGVhbilcbiAgICAgICAgcmV0dXJuIGV4aXN0c0Jvb2xlYW5cbiAgICB9XG5cbiAgICByZXR1cm4ge3BpY2tSYW5kb21DZWxsLCBjaGVja1JlcGVhdENlbGx9XG59IiwiLyogZXNsaW50LWRpc2FibGUgbm8tZWxzZS1yZXR1cm4gKi9cbi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9wcmVmZXItZGVmYXVsdC1leHBvcnQgKi9cbmltcG9ydCB7IGdhbWVCb2FyZENvbnRyb2xsZXIgfSBmcm9tIFwiLi9nYW1lYm9hcmRDb250cm9sbGVyXCI7XG5cblxuZXhwb3J0IGNsYXNzIFNoaXAge1xuICAgIGNvbnN0cnVjdG9yKGxlbmd0aCwgbmFtZSwgaGl0cywgaXNTdW5rLCBjb29yZHMpIHtcbiAgICAgICAgdGhpcy5sZW5ndGggPSBsZW5ndGg7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMuaGl0cyA9IDA7XG4gICAgICAgIHRoaXMuaXNTdW5rID0gZmFsc2U7XG4gICAgICAgIHRoaXMuY29vcmRzID0gW11cbiAgICB9XG5cbiAgICBoaXQoKSB7XG4gICAgICAgIHRoaXMuaGl0cyArPSAxXG4gICAgICAgIGNvbnNvbGUubG9nKCdoaXQgYWRkZWQnKVxuICAgIH1cblxuICAgIGNoZWNrSWZTdW5rKCkge1xuICAgICAgICBpZiAodGhpcy5sZW5ndGggPT09IHRoaXMuaGl0cykge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ1N1bmshJylcbiAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmxlbmd0aCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmhpdHMpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICB9XG5cbn1cblxuY29uc3QgYm9hcmRSdW4gPSBnYW1lQm9hcmRDb250cm9sbGVyKCk7XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVGbGVldCgpIHtcbiAgICBjb25zdCBzaGlwcyA9IFtdXG5cbiAgICBjb25zdCBjYXJyaWVyID0gbmV3IFNoaXAoNSwgJ0NhcnJpZXInKTtcbiAgICBjb25zdCBiYXR0bGVzaGlwID0gbmV3IFNoaXAoNCwgJ0JhdHRsZXNoaXAnKTtcbiAgICBjb25zdCBkZXN0cm95ZXIgPSBuZXcgU2hpcCgzLCAnRGVzdHJveWVyJyk7XG4gICAgY29uc3Qgc3VibWFyaW5lID0gbmV3IFNoaXAoMywgJ1N1Ym1hcmluZScpO1xuICAgIGNvbnN0IHBhdHJvbEJvYXQgPSBuZXcgU2hpcCgyLCAnUGF0cm9sIEJvYXQnKTtcbiBcbiAgICBzaGlwcy5wdXNoKGNhcnJpZXIsIGJhdHRsZXNoaXAsIGRlc3Ryb3llciwgc3VibWFyaW5lLCBwYXRyb2xCb2F0KVxuXG4gICAgY29uc29sZS5sb2coc2hpcHMpO1xuICAgIHJldHVybiBzaGlwc1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlT3BwRmxlZXQoKSB7XG4gICAgY29uc3Qgc2hpcHMgPSBbXVxuXG4gICAgY29uc3QgY2FycmllciA9IG5ldyBTaGlwKDUsICdDYXJyaWVyJyk7XG4gICAgY29uc3QgYmF0dGxlc2hpcCA9IG5ldyBTaGlwKDQsICdCYXR0bGVzaGlwJyk7XG4gICAgY29uc3QgZGVzdHJveWVyID0gbmV3IFNoaXAoMywgJ0Rlc3Ryb3llcicpO1xuICAgIGNvbnN0IHN1Ym1hcmluZSA9IG5ldyBTaGlwKDMsICdTdWJtYXJpbmUnKTtcbiAgICBjb25zdCBwYXRyb2xCb2F0ID0gbmV3IFNoaXAoMiwgJ1BhdHJvbCBCb2F0Jyk7XG5cbiAgICBzaGlwcy5wdXNoKGNhcnJpZXIsIGJhdHRsZXNoaXAsIGRlc3Ryb3llciwgc3VibWFyaW5lLCBwYXRyb2xCb2F0KTtcblxuICAgIGNvbnNvbGUubG9nKHNoaXBzKTtcbiAgICByZXR1cm4gc2hpcHNcbn0iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby11c2UtYmVmb3JlLWRlZmluZSAqL1xuLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L3ByZWZlci1kZWZhdWx0LWV4cG9ydCAqL1xuXG4vLyBoYXZlIHRvIGFkZCBidXR0b25zIHRvIFVJIHRvIHN3aXRjaCBiZXR3ZW4gaG9yaXpvbnRhbCBhbmQgdmVydGljYWxcbi8vIGhhdmUgdG8gbWFrZSBhIHN0YXJ0IGJ1dHRvbiB0aGF0IHVzZXIgY2FuIHByZXNzIHdoZW4gYWxsIFxuLy8gc2hpcHMgYXJlIHBsYWNlZFxuXG5cbmV4cG9ydCBjb25zdCBodW1hblNoaXBQbGFjZW1lbnQgPSBmdW5jdGlvbiAoaHVtYW5Cb2FyZCwgc2hpcHMpIHtcbiAgICAvLyBtZW1vcnkgc3RvcmFnZSBmb3Igd2hlcmUgY2VsbHMgY2FuJ3QgYmUgdXNlZCBhZ2FpblxuICAgIGNvbnN0IHJvdGF0ZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yb3RhdGUtc2hpcCcpO1xuICAgIGNvbnN0IG9jY3VwaWVkQ2VsbHMgPSBbXTtcblxuICAgIC8vIHNldHMgcGxhbmVcbiAgICBsZXQgY3VycmVudFBsYW5lID0gJ2hvcml6b250YWwnO1xuICAgIGNyZWF0ZVJvdGF0aW9uQWJpbGl0eSgpO1xuXG4gICAgY29uc3QgaHVtYW5DZWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jZWxsJyk7XG4gICAgbGV0IHNoaXBJbmRleCA9IDA7XG4gICAgXG5cbiAgICBodW1hbkNlbGxzLmZvckVhY2goKGNlbGwpID0+IHtcbiAgICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCAoKSA9PiB7XG4gICAgICAgICAgICBjZWxsSG92ZXIoY2VsbCwgc2hpcHNbc2hpcEluZGV4XSlcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIGlmIChjZWxsLmNsYXNzTGlzdC5jb250YWlucygndmFsaWQtcGxhY2VtZW50JykpIHtcbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudFBsYW5lID09PSAnaG9yaXpvbnRhbCcpIHtcbiAgICAgICAgICAgICAgICAgICAgcGxhY2VIb3Jpem9udGFsbHkoY2VsbC5jb29yZGluYXRlcywgY2VsbC5hY3RpdmVDZWxscywgc2hpcHNbc2hpcEluZGV4XSk7XG4gICAgICAgICAgICAgICAgICAgIHNoaXBJbmRleCArPSAxO1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2hpcEluZGV4ID09PSA1KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb21wdXRlclBsYWNlbWVudCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHNoaXBJbmRleCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjdXJyZW50UGxhbmUgPT09ICd2ZXJ0aWNhbCcpIHtcbiAgICAgICAgICAgICAgICAgICAgcGxhY2VWZXJ0aWNhbGx5KGNlbGwuY29vcmRpbmF0ZXMsIGNlbGwuYWN0aXZlQ2VsbHMsIHNoaXBzW3NoaXBJbmRleF0pO1xuICAgICAgICAgICAgICAgICAgICBzaGlwSW5kZXggKz0gMTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNoaXBJbmRleCA9PT0gNSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29tcHV0ZXJQbGFjZW1lbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhzaGlwSW5kZXgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBzaGlwSW5kZXhcbiAgICAgICAgfSlcbiAgICB9KVxuXG4gICAgXG4gICAgZnVuY3Rpb24gY2VsbEhvdmVyKGNlbGwsIHNoaXApIHtcbiAgICAgICAgY29uc29sZS5sb2coc2hpcCk7XG4gICAgICAgIGNvbnN0IGNlbGxDb29yZHMgPSBjZWxsLmNvb3JkaW5hdGVzO1xuICAgICAgICBjZWxsLmFjdGl2ZUNlbGxzID0gW107XG4gICAgICAgIGNvbnN0IGdyb3VwZWRDZWxscyA9IGNlbGwuYWN0aXZlQ2VsbHM7XG4gICAgICAgIC8vIGhhdmUgdG8gY2hlY2sgaWYgaXRzIGhvcml6b250YWwgb3IgdmVydGljYWxcbiAgICAgICAgLy8gdGhlbiBjaGVjayBpZiBzdGFydGluZyBwb2ludCArIHNoaXAgbGVuZ3RoIGlzIHZhbGlkXG4gICAgICAgIGlmIChzaGlwSW5kZXggPT09IDUpIHtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGN1cnJlbnRQbGFuZSA9PT0gJ2hvcml6b250YWwnKSB7XG4gICAgICAgICAgICBjb25zdCBjZWxsUm93ID0gY2VsbENvb3Jkc1swXVxuICAgICAgICAgICAgbGV0IGNlbGxDb2x1bW4gPSBjZWxsQ29vcmRzWzFdO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBhY3RpdmVDZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7Y2VsbFJvd30gJHtjZWxsQ29sdW1ufWhgKVxuICAgICAgICAgICAgICAgIGdyb3VwZWRDZWxscy5wdXNoKGFjdGl2ZUNlbGwpO1xuICAgICAgICAgICAgICAgIGNlbGxDb2x1bW4gKz0gMVxuICAgICAgICAgICAgICAgIGlmIChjZWxsQ29sdW1uID4gMTApIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBjb25mbGljdGluZyA9IGNoZWNrQ29uZmxpY3RpbmdTaGlwcyhncm91cGVkQ2VsbHMpO1xuXG4gICAgICAgICAgICBpZiAoKGNlbGxDb29yZHNbMV0gKyBzaGlwLmxlbmd0aCkgLSAxIDw9IDEwICYmIGNvbmZsaWN0aW5nID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCd0aGlzIGlzIHZhbGlkIScpXG4gICAgICAgICAgICAgICAgZ3JvdXBlZENlbGxzLmZvckVhY2goKGVsZW0pID0+IHtcbiAgICAgICAgICAgICAgICAgICBlbGVtLmNsYXNzTGlzdC5hZGQoJ3ZhbGlkLXBsYWNlbWVudCcpOyBcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfSBlbHNlIGlmICgoY2VsbENvb3Jkc1sxXSArIHNoaXAubGVuZ3RoKSAtIDEgPiAxMCB8fCBjb25mbGljdGluZyA9PT0gdHJ1ZSl7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ25vdCB2YWxpZCcpO1xuICAgICAgICAgICAgICAgIGdyb3VwZWRDZWxscy5mb3JFYWNoKChlbGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGVsZW0uY2xhc3NMaXN0LmFkZCgnaW52YWxpZC1wbGFjZW1lbnQnKTsgXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW91dCcsICgpID0+IHtcbiAgICAgICAgICAgICAgICBncm91cGVkQ2VsbHMuZm9yRWFjaCgoZWxlbSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBlbGVtLmNsYXNzTGlzdC5yZW1vdmUoJ3ZhbGlkLXBsYWNlbWVudCcsICdpbnZhbGlkLXBsYWNlbWVudCcpXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pXG5cblxuICAgICAgICB9IGVsc2UgaWYgKGN1cnJlbnRQbGFuZSA9PT0gJ3ZlcnRpY2FsJykge1xuICAgICAgICAgICAgbGV0IGNlbGxSb3cgPSBjZWxsQ29vcmRzWzBdXG4gICAgICAgICAgICBjb25zdCBjZWxsQ29sdW1uID0gY2VsbENvb3Jkc1sxXTtcblxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgYWN0aXZlQ2VsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGAke2NlbGxSb3d9ICR7Y2VsbENvbHVtbn1oYClcbiAgICAgICAgICAgICAgICBncm91cGVkQ2VsbHMucHVzaChhY3RpdmVDZWxsKTtcbiAgICAgICAgICAgICAgICBjZWxsUm93ICs9IDFcbiAgICAgICAgICAgICAgICBpZiAoY2VsbFJvdyA+IDEwKSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgY29uZmxpY3RpbmcgPSBjaGVja0NvbmZsaWN0aW5nU2hpcHMoZ3JvdXBlZENlbGxzKTtcblxuXG4gICAgICAgICAgICBpZiAoKGNlbGxDb29yZHNbMF0gKyBzaGlwLmxlbmd0aCkgLSAxIDw9IDEwICYmIGNvbmZsaWN0aW5nID09PSBmYWxzZSApIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygndGhpcyBpcyB2YWxpZCEnKVxuICAgICAgICAgICAgICAgIGdyb3VwZWRDZWxscy5mb3JFYWNoKChlbGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgZWxlbS5jbGFzc0xpc3QuYWRkKCd2YWxpZC1wbGFjZW1lbnQnKTsgXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoKGNlbGxDb29yZHNbMF0gKyBzaGlwLmxlbmd0aCkgLSAxID4gMTAgfHwgY29uZmxpY3RpbmcgPT09IHRydWUpe1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdub3QgdmFsaWQnKTtcbiAgICAgICAgICAgICAgICBncm91cGVkQ2VsbHMuZm9yRWFjaCgoZWxlbSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBlbGVtLmNsYXNzTGlzdC5hZGQoJ2ludmFsaWQtcGxhY2VtZW50Jyk7IFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdXQnLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgZ3JvdXBlZENlbGxzLmZvckVhY2goKGVsZW0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZWxlbS5jbGFzc0xpc3QucmVtb3ZlKCd2YWxpZC1wbGFjZW1lbnQnLCAnaW52YWxpZC1wbGFjZW1lbnQnKVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGxhY2VIb3Jpem9udGFsbHkoY2VsbENvb3JkcywgYWN0aXZlQ2VsbHMsIHNoaXApIHtcbiAgICAgICAgYWN0aXZlQ2VsbHMuZm9yRWFjaCgoZWxlbSkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZWxlbS5jb29yZGluYXRlcyk7XG4gICAgICAgICAgICBvY2N1cGllZENlbGxzLnB1c2goZWxlbS5jb29yZGluYXRlcyk7XG4gICAgICAgICAgICBlbGVtLmNsYXNzTGlzdC5hZGQoJ3BsYWNlZCcpXG4gICAgICAgIH0pO1xuICAgICAgICAvLyBtYXliZSBwdXQgdHJpZ2dlciBpbiBoZXJlIHRvIGNoZWNrIGlmIGFsbCBzaGlwcyBhcmUgcGxhY2VkXG4gICAgICAgIC8vIGlmIHRydWUsIGRpc2JhbGUgcG9pbnRlciBldmVudHMgYW5kIHJ1biBmdW5jdGlvbiBmb3JcbiAgICAgICAgLy8gcGxhY2luZyBjb21wdXRlciBzaGlwc1xuICAgICAgICBodW1hbkJvYXJkLnBsYWNlSG9yaXpvbnRhbFNoaXAoY2VsbENvb3Jkc1swXSwgY2VsbENvb3Jkc1sxXSwgc2hpcCk7XG4gICAgICAgIGNvbnNvbGUubG9nKG9jY3VwaWVkQ2VsbHMpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBsYWNlVmVydGljYWxseShjZWxsQ29vcmRzLCBhY3RpdmVDZWxscywgc2hpcCkge1xuICAgICAgICBhY3RpdmVDZWxscy5mb3JFYWNoKChlbGVtKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlbGVtLmNvb3JkaW5hdGVzKTtcbiAgICAgICAgICAgIG9jY3VwaWVkQ2VsbHMucHVzaChlbGVtLmNvb3JkaW5hdGVzKTtcbiAgICAgICAgICAgIGVsZW0uY2xhc3NMaXN0LmFkZCgncGxhY2VkJylcbiAgICAgICAgfSk7XG4gICAgICAgIGh1bWFuQm9hcmQucGxhY2VWZXJ0aWNhbFNoaXAoY2VsbENvb3Jkc1swXSwgY2VsbENvb3Jkc1sxXSwgc2hpcCk7XG4gICAgICAgIGNvbnNvbGUubG9nKG9jY3VwaWVkQ2VsbHMpXG4gICAgfVxuXG5cbiAgICBcblxuICAgIGZ1bmN0aW9uIGNoZWNrQ29uZmxpY3RpbmdTaGlwcyhhY3RpdmVDZWxscykge1xuICAgICAgICBsZXQgYWxyZWFkeVVzZWQgPSBmYWxzZVxuICAgICAgICBhY3RpdmVDZWxscy5mb3JFYWNoKChlbGVtKSA9PiB7XG4gICAgICAgICAgICBpZiAoY2hlY2tGb3JSZXBlYXQoZWxlbS5jb29yZGluYXRlcywgb2NjdXBpZWRDZWxscykgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBhbHJlYWR5VXNlZCA9IHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuIGFscmVhZHlVc2VkXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlUm90YXRpb25BYmlsaXR5KCkge1xuICAgICAgICByb3RhdGVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBuZXdQbGFuZSA9IHN3aXRjaFBsYW5lKGN1cnJlbnRQbGFuZSk7XG4gICAgICAgICAgICBjdXJyZW50UGxhbmUgPSBuZXdQbGFuZVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIHJldHVybiB7IGNlbGxIb3ZlciwgcGxhY2VIb3Jpem9udGFsbHksIGNoZWNrQ29uZmxpY3RpbmdTaGlwcyB9XG59XG5cblxuXG5cbmV4cG9ydCBjb25zdCBjb21wdXRlclBsYWNlbWVudCA9IGZ1bmN0aW9uIChjb21wdXRlckJvYXJkLCBzaGlwcykge1xuICAgIGNvbnN0IHBsYW5lcyA9IFsnaG9yaXpvbnRhbCcsICd2ZXJ0aWNhbCddXG4gICAgY29uc3QgdXNlZENlbGxzID0gW107XG4gICAgY29uc29sZS5sb2coc2hpcHMpO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjcmVhdGVTaGlwQ29vcmRzKHNoaXBzW2ldKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVTaGlwQ29vcmRzKHNoaXApIHtcblxuICAgICAgICBjb25zdCBjaG9zZW5QbGFuZSA9IGNob29zZVBsYW5lKHBsYW5lcyk7XG4gICAgICAgIC8vIHVzaW5nIHRvIHRlc3Q6XG4gICAgICAgIC8vIGNvbnN0IGNob3NlblBsYW5lID0gJ2hvcml6b250YWwnXG4gICAgICAgIGNvbnNvbGUubG9nKGNob3NlblBsYW5lKVxuICAgICAgICBpZiAoY2hvc2VuUGxhbmUgPT09ICdob3Jpem9udGFsJykge1xuICAgICAgICAgICAgdGVzdEhvcml6b250YWxTaGlwKHNoaXApXG4gICAgICAgIH0gZWxzZSBpZiAoY2hvc2VuUGxhbmUgPT09ICd2ZXJ0aWNhbCcpIHtcbiAgICAgICAgICAgIHRlc3RWZXJ0aWNhbFNoaXAoc2hpcCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0ZXN0SG9yaXpvbnRhbFNoaXAoc2hpcCkge1xuICAgICAgICBjb25zdCBzdGFydGluZ0Nvb3JkcyA9IGNyZWF0ZUhvcml6b250YWxTdGFydChzaGlwKVxuICAgICAgICAvLyBjb25zb2xlLmxvZyhzdGFydGluZ0Nvb3Jkcyk7XG4gICAgICAgIHVzZWRDZWxscy5wdXNoKHN0YXJ0aW5nQ29vcmRzKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBzaGlwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBuZXdDb29yZHMgPSBbc3RhcnRpbmdDb29yZHNbMF0sIHN0YXJ0aW5nQ29vcmRzWzFdICsgaV07XG4gICAgICAgICAgICBjb25zdCByZXBlYXQgPSBjaGVja0ZvclJlcGVhdChuZXdDb29yZHMsIHVzZWRDZWxscylcbiAgICAgICAgICAgIGlmIChyZXBlYXQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgdXNlZENlbGxzLnB1c2gobmV3Q29vcmRzKTtcbiAgICAgICAgICAgICAgICBpZiAoaSArIDEgPT09IHNoaXAubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbXB1dGVyQm9hcmQucGxhY2VIb3Jpem9udGFsU2hpcChzdGFydGluZ0Nvb3Jkc1swXSwgc3RhcnRpbmdDb29yZHNbMV0sIHNoaXApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHJlcGVhdCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIHRlc3RIb3Jpem9udGFsU2hpcChzaGlwKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0ZXN0VmVydGljYWxTaGlwKHNoaXApIHtcbiAgICAgICAgY29uc3Qgc3RhcnRpbmdDb29yZHMgPSBjcmVhdGVWZXJ0aWNhbFN0YXJ0KHNoaXApXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHN0YXJ0aW5nQ29vcmRzKTtcbiAgICAgICAgdXNlZENlbGxzLnB1c2goc3RhcnRpbmdDb29yZHMpO1xuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IHNoaXAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IG5ld0Nvb3JkcyA9IFtzdGFydGluZ0Nvb3Jkc1swXSArIGksIHN0YXJ0aW5nQ29vcmRzWzFdXTtcbiAgICAgICAgICAgIGNvbnN0IHJlcGVhdCA9IGNoZWNrRm9yUmVwZWF0KG5ld0Nvb3JkcywgdXNlZENlbGxzKVxuICAgICAgICAgICAgaWYgKHJlcGVhdCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgdXNlZENlbGxzLnB1c2gobmV3Q29vcmRzKTtcbiAgICAgICAgICAgICAgaWYgKGkgKyAxID09PSBzaGlwLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGNvbXB1dGVyQm9hcmQucGxhY2VWZXJ0aWNhbFNoaXAoc3RhcnRpbmdDb29yZHNbMF0sIHN0YXJ0aW5nQ29vcmRzWzFdLCBzaGlwKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocmVwZWF0ID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgdGVzdFZlcnRpY2FsU2hpcChzaGlwKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjaG9vc2VQbGFuZShwbGFuZXMpIHtcbiAgICAgICAgY29uc3QgY2hvc2VuSW5kZXggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBwbGFuZXMubGVuZ3RoKTtcbiAgICAgICAgY29uc29sZS5sb2cocGxhbmVzW2Nob3NlbkluZGV4XSk7XG4gICAgICAgIHJldHVybiBwbGFuZXNbY2hvc2VuSW5kZXhdXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlSG9yaXpvbnRhbFN0YXJ0KHNoaXApIHtcbiAgICAgICAgY29uc3Qgcm93ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApICsgMVxuICAgICAgICBjb25zdCBjb2x1bW4gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoMTAgLSBzaGlwLmxlbmd0aCkpICsgMVxuICAgICAgICBjb25zdCBzdGFydGluZ0Nvb3JkID0gW3JvdywgY29sdW1uXTtcbiAgICAgICAgcmV0dXJuIHN0YXJ0aW5nQ29vcmRcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVWZXJ0aWNhbFN0YXJ0KHNoaXApIHtcbiAgICAgICAgY29uc3Qgcm93ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKDEwIC0gc2hpcC5sZW5ndGgpKSArIDFcbiAgICAgICAgY29uc3QgY29sdW1uID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApICsgMVxuICAgICAgICBjb25zdCBzdGFydGluZ0Nvb3JkID0gW3JvdywgY29sdW1uXTtcbiAgICAgICAgcmV0dXJuIHN0YXJ0aW5nQ29vcmRcbiAgICB9XG5cbiAgICByZXR1cm4ge2NyZWF0ZVNoaXBDb29yZHMsIHRlc3RIb3Jpem9udGFsU2hpcCwgdGVzdFZlcnRpY2FsU2hpcCxcbiAgICAgICAgY2hvb3NlUGxhbmUsIGNyZWF0ZUhvcml6b250YWxTdGFydCwgY3JlYXRlVmVydGljYWxTdGFydH1cbn1cblxuXG5mdW5jdGlvbiBjaGVja0ZvclJlcGVhdChjb29yZHMsIGFycmF5KSB7XG4gICAgY29uc3Qgc3RyaW5nZWRDb29yZHMgPSBKU09OLnN0cmluZ2lmeShjb29yZHMpO1xuICAgIGNvbnN0IGV4aXN0c0Jvb2xlYW4gPSBhcnJheS5zb21lKChjb29yZCkgPT4gSlNPTi5zdHJpbmdpZnkoY29vcmQpID09PSBzdHJpbmdlZENvb3JkcylcbiAgICBjb25zb2xlLmxvZyhleGlzdHNCb29sZWFuKVxuICAgIHJldHVybiBleGlzdHNCb29sZWFuXG59XG5cbmZ1bmN0aW9uIHN3aXRjaFBsYW5lKGN1cnJlbnRQbGFuZSkge1xuICAgIGlmIChjdXJyZW50UGxhbmUgPT09ICdob3Jpem9udGFsJykge1xuICAgICAgICBjdXJyZW50UGxhbmUgPSAndmVydGljYWwnXG4gICAgfSBlbHNlIGlmIChjdXJyZW50UGxhbmUgPT09ICd2ZXJ0aWNhbCcpIHtcbiAgICAgICAgY3VycmVudFBsYW5lID0gJ2hvcml6b250YWwnXG4gICAgfVxuICAgIHJldHVybiBjdXJyZW50UGxhbmVcbn07IiwiLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L3ByZWZlci1kZWZhdWx0LWV4cG9ydCAqL1xuaW1wb3J0IHsgY29tcHV0ZXJQbGF5ZXIgfSBmcm9tIFwiLi9wbGF5ZXJcIjtcbmltcG9ydCB7IHJlc2V0SW50ZXJmYWNlIH0gZnJvbSBcIi4vZ2FtZUxvb3BcIjtcblxuXG5leHBvcnQgY29uc3QgZG9tTWFuaXB1bGF0aW9uID0gZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IGNvbXB1dGVyTW92ZXMgPSBjb21wdXRlclBsYXllcigpXG5cbiAgICBjb25zdCBwbGF5ZXJCb2FyZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ2FtZWJvYXJkcycpO1xuICAgIGNvbnN0IGRpYWxvZ3VlQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRpYWxvZ3VlLWNvbnRhaW5lcicpXG5cbiAgICBmdW5jdGlvbiByZW5kZXJTdGFydCgpIHtcbiAgICAgICAgY29uc3Qgc3RhcnRHYW1lQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgIGFwcGVuZEVsZW1lbnQoc3RhcnRHYW1lQnV0dG9uLCAnc3RhcnQtZ2FtZS1idXR0b24nLCBwbGF5ZXJCb2FyZHMpO1xuICAgICAgICBzdGFydEdhbWVCdXR0b24udGV4dENvbnRlbnQgPSAnU3RhcnQgRmlyaW5nISdcbiAgICAgICAgXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVuZGVyR2FtZUJvYXJkKGJvYXJkQ29udHJvbGxlciwgcGxheWVyTmFtZSwgaHVtYW5Cb2FyZCkge1xuICAgICAgICBsZXQgaXNDb21wdXRlciA9IGZhbHNlO1xuICAgICAgICBpZiAocGxheWVyTmFtZSA9PT0gJ1BsYXllciAyJykge1xuICAgICAgICAgICAgaXNDb21wdXRlciA9IHRydWVcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyhpc0NvbXB1dGVyKTtcblxuICAgICAgICBjb25zdCBnYW1lQm9hcmRXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGFwcGVuZEVsZW1lbnQoZ2FtZUJvYXJkV3JhcHBlciwgJ2JvYXJkLXdyYXBwZXInLCBwbGF5ZXJCb2FyZHMpXG4gICAgICAgXG4gICAgICAgIGNvbnN0IGJvYXJkVGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMicpO1xuICAgICAgICBhcHBlbmRFbGVtZW50KGJvYXJkVGl0bGUsICdib2FyZC10aXRsZScsIGdhbWVCb2FyZFdyYXBwZXIpO1xuICAgICAgICBib2FyZFRpdGxlLnRleHRDb250ZW50ID0gcGxheWVyTmFtZTtcblxuICAgICAgICAvLyByZW5kZXIgYm9hcmQ6XG4gICAgICAgIGNvbnN0IGdhbWVib2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBhcHBlbmRFbGVtZW50KGdhbWVib2FyZCwgJ2dhbWVib2FyZCcsIGdhbWVCb2FyZFdyYXBwZXIpO1xuXG4gICAgICAgIGJ1aWxkR3JpZChnYW1lYm9hcmQsIGlzQ29tcHV0ZXIpO1xuICAgICAgICBcbiAgICAgICAgaWYgKGlzQ29tcHV0ZXIgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICBjb25zdCByb3RhdGVTaGlwQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgICAgICBhcHBlbmRFbGVtZW50KHJvdGF0ZVNoaXBCdXR0b24sICdyb3RhdGUtc2hpcCcsIGdhbWVCb2FyZFdyYXBwZXIpO1xuICAgICAgICAgICAgcm90YXRlU2hpcEJ1dHRvbi50ZXh0Q29udGVudCA9ICdSb3RhdGUnOyAgICAgICAgXG5cbiAgICAgICAgICAgIHNldEdyaWRUcmlnZ2Vycyhib2FyZENvbnRyb2xsZXIsIGh1bWFuQm9hcmQpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGJ1aWxkR3JpZChnYW1lYm9hcmRFbGVtZW50LCBpc0NvbXB1dGVyKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgMTE7IGkrKykge1xuICAgICAgICAgICAgY29uc3Qgcm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBhcHBlbmRFbGVtZW50KHJvdywgJ3JvdycsIGdhbWVib2FyZEVsZW1lbnQpO1xuXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMTsgaiA8IDExOyBqKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICAgICAgY2VsbC5jb29yZGluYXRlcyA9IFtpLCBqXTtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhjZWxsLmNvb3JkaW5hdGVzKVxuICAgICAgICAgICAgICAgIGlmIChpc0NvbXB1dGVyID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGFwcGVuZEVsZW1lbnQoY2VsbCwgJ2NlbGwtYycsIHJvdyk7XG4gICAgICAgICAgICAgICAgICAgIGNlbGwuc2V0QXR0cmlidXRlKCdpZCcsIGAke2l9ICR7an1jYClcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgIGFwcGVuZEVsZW1lbnQoY2VsbCwgJ2NlbGwnLCByb3cpO1xuICAgICAgICAgICAgICAgICAgIGNlbGwuc2V0QXR0cmlidXRlKCdpZCcsIGAke2l9ICR7an1oYCkgXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXRHcmlkVHJpZ2dlcnMoY29tcHV0ZXJCb2FyZENvbnRyb2xsZXIsIGh1bWFuQm9hcmRDb250cm9sbGVyKSB7XG4gICAgICAgIGNvbnN0IGNlbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNlbGwtYycpO1xuICAgICAgICBjZWxscy5mb3JFYWNoKChjZWxsKSA9PiB7XG4gICAgICAgICAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGNlbGwuY29vcmRpbmF0ZXMpO1xuICAgICAgICAgICAgICAgIGNvbXB1dGVyQm9hcmRDb250cm9sbGVyLnJlY2lldmVBdHRhY2soY2VsbC5jb29yZGluYXRlcyk7XG5cbiAgICAgICAgICAgICAgICAvLyB0cmlnZ2VyIGNvbXB1dGVyJ3MgYXR0YWNrIGluIHJlc3BvbnNlXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coaHVtYW5Cb2FyZENvbnRyb2xsZXIpO1xuICAgICAgICAgICAgICAgIGNvbXB1dGVyTW92ZXMucGlja1JhbmRvbUNlbGwoaHVtYW5Cb2FyZENvbnRyb2xsZXIpO1xuXG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgICAgICAgICAgXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXNlR3JpZFNwb3QoY29vcmRzLCBzdGF0dXMsIG5hbWUpIHtcbiAgICAgICAgLy8gcmVnaXN0ZXJzIHRoYXQgdGVoIGdyaWQgc3BvdCB3YXMgdXNlZCwgYW5kIGRpc3BsYXlzXG4gICAgICAgIC8vIGVpdGhlciBhIGhpdCBvciBtaXNzXG5cbiAgICAgICAgaWYgKG5hbWUgPT09ICdQbGF5ZXIgMicpIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHN0YXR1cyk7XG4gICAgICAgICAgICBjb25zdCB1c2VkQ2VsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxuICAgICAgICAgICAgICAgIGAke2Nvb3Jkc1swXX0gJHtjb29yZHNbMV19Y2ApXG5cbiAgICAgICAgICAgIGlmIChzdGF0dXMgPT09ICdoaXQnKSB7XG4gICAgICAgICAgICAgICAgdXNlZENlbGwudGV4dENvbnRlbnQgPSAnWCdcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc3RhdHVzID09PSAnbWlzcycpIHtcbiAgICAgICAgICAgICAgICB1c2VkQ2VsbC50ZXh0Q29udGVudCA9ICdPJ1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhzdGF0dXMpO1xuICAgICAgICAgICAgY29uc3QgdXNlZENlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcbiAgICAgICAgICAgICAgICBgJHtjb29yZHNbMF19ICR7Y29vcmRzWzFdfWhgKVxuXG4gICAgICAgICAgICBpZiAoc3RhdHVzID09PSAnaGl0Jykge1xuICAgICAgICAgICAgICAgIHVzZWRDZWxsLnRleHRDb250ZW50ID0gJ1gnXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHN0YXR1cyA9PT0gJ21pc3MnKSB7XG4gICAgICAgICAgICAgICAgdXNlZENlbGwudGV4dENvbnRlbnQgPSAnTydcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZyZWV6ZUdyaWQoKSB7XG4gICAgICAgIGNvbnN0IGdhbWVib2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nYW1lYm9hcmQnKTtcbiAgICAgICAgZ2FtZWJvYXJkLnN0eWxlLnBvaW50ZXJFdmVudHMgPSAnbm9uZSc7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVuZGVyRGlhbG9ndWVCb3goKSB7XG4gICAgICAgIGNvbnN0IGRpYWxvZ3VlQm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGFwcGVuZEVsZW1lbnQoZGlhbG9ndWVCb3gsICdkaWFsb2d1ZS1ib3gnLCBkaWFsb2d1ZUNvbnRhaW5lcilcblxuICAgICAgICBjb25zdCB0ZXh0Qm94MSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICAgIGFwcGVuZEVsZW1lbnQodGV4dEJveDEsICd0ZXh0LWJveDEnLCBkaWFsb2d1ZUJveClcblxuICAgICAgICBjb25zdCB0ZXh0Qm94MiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICAgIGFwcGVuZEVsZW1lbnQodGV4dEJveDIsICd0ZXh0LWJveDInLCBkaWFsb2d1ZUJveClcblxuICAgICAgICBjb25zdCB0ZXh0Qm94MyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBhcHBlbmRFbGVtZW50KHRleHRCb3gzLCAndGV4dC1ib3gzJywgZGlhbG9ndWVCb3gpXG4gICAgfVxuXG5cbiAgICBmdW5jdGlvbiByZW5kZXJFbmRHYW1lKCkge1xuICAgICAgICBjb25zdCBib2R5RWxlbWVudCA9IGRvY3VtZW50LmJvZHlcblxuICAgICAgICBjb25zdCBlbmRHYW1lQm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGFwcGVuZEVsZW1lbnQoZW5kR2FtZUJveCwgJ2VuZC1nYW1lLWJveCcsIGJvZHlFbGVtZW50KTtcblxuICAgICAgICBjb25zdCBlbmRHYW1lSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBhcHBlbmRFbGVtZW50KGVuZEdhbWVJY29uLCAnZW5kLWdhbWUtaWNvbicsIGVuZEdhbWVCb3gpO1xuXG4gICAgICAgIGNvbnN0IHJlc2V0R2FtZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICBhcHBlbmRFbGVtZW50KHJlc2V0R2FtZUJ1dHRvbiwgJ3Jlc2V0LWdhbWUtYnV0dG9uJywgZW5kR2FtZUJveCk7XG5cbiAgICAgICAgcmVzZXRHYW1lQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgcmVzZXRJbnRlcmZhY2UoYm9keUVsZW1lbnQsIGVuZEdhbWVCb3gpO1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFwcGVuZEVsZW1lbnQoZWxlbWVudE5hbWUsIGNsYXNzTmFtZSwgZmF0aGVyRWxlbWVudCApIHtcbiAgICAgICAgZWxlbWVudE5hbWUuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xuICAgICAgICBmYXRoZXJFbGVtZW50LmFwcGVuZENoaWxkKGVsZW1lbnROYW1lKTtcblxuICAgICAgICByZXR1cm4gZWxlbWVudE5hbWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtyZW5kZXJTdGFydCwgcmVuZGVyR2FtZUJvYXJkLCBhcHBlbmRFbGVtZW50LCBidWlsZEdyaWQsXG4gICAgICAgIHNldEdyaWRUcmlnZ2VycywgdXNlR3JpZFNwb3QsIGZyZWV6ZUdyaWQsIHJlbmRlckRpYWxvZ3VlQm94LFxuICAgICAgICByZW5kZXJFbmRHYW1lfVxuXG59XG5cblxuXG5cbmV4cG9ydCBjb25zdCBkaWFsb2d1ZUNvbnRyb2xsZXIgPSBmdW5jdGlvbigpIHtcblxuICAgIC8vIGZ1bmN0aW9uICBwbGFjZVNoaXBzTWVzc2FnZSgpIHtcblxuICAgIC8vIH1cblxuICAgIGZ1bmN0aW9uIG1vdmVSZXN1bHQoc3RhdHVzLCBwbGF5ZXJOYW1lLCBjb29yZHMsIHNoaXAgPSBudWxsKSB7XG4gICAgICAgIC8vIG5lZWQgYXR0YWNrU3RhdHVzLCBzaGlwIG5hbWUsIGNvb3JkaW5hdGVzXG4gICAgICAgIGNvbnN0IHRleHRCb3gxID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRleHQtYm94MScpO1xuICAgICAgICBjb25zdCB0ZXh0Qm94MiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50ZXh0LWJveDInKTtcbiAgICAgICAgY29uc29sZS5sb2coJ2RpYWxvZ3VlIHJlY29yZGVkJylcbiAgICAgICAgaWYgKHBsYXllck5hbWUgIT09ICdQbGF5ZXIgMicpIHtcbiAgICAgICAgICAgIGlmIChzdGF0dXMgPT09ICdoaXQnKSB7XG4gICAgICAgICAgICAgICAgdGV4dEJveDIudGV4dENvbnRlbnQgPSBgVGhlIGVuZW15IGhhcyBoaXQgeW91ciAke3NoaXAubmFtZX1cbiAgICAgICAgICAgICAgICBhdCByb3c6ICR7Y29vcmRzWzBdfSBjb2x1bW46ICR7Y29vcmRzWzFdfSFgXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHN0YXR1cyA9PT0gJ21pc3MnKSB7XG4gICAgICAgICAgICAgICAgdGV4dEJveDIudGV4dENvbnRlbnQgPSBgVGhlIGVuZW15IGF0dGFja2VkIHJvdzpcbiAgICAgICAgICAgICAgICAke2Nvb3Jkc1swXX0gY29sdW1uOiAke2Nvb3Jkc1sxXX0gYW5kIG1pc3NlZCFgXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIGlmIChwbGF5ZXJOYW1lID09PSAnUGxheWVyIDInKSB7XG4gICAgICAgICAgICBpZiAoc3RhdHVzID09PSAnaGl0Jykge1xuICAgICAgICAgICAgICAgIHRleHRCb3gxLnRleHRDb250ZW50ID0gYFlvdSBoaXQgdGhlIGVuZW15J3MgJHtzaGlwLm5hbWV9XG4gICAgICAgICAgICAgICAgYXQgcm93OiAke2Nvb3Jkc1swXX0gY29sdW1uOiAke2Nvb3Jkc1sxXX0hYFxuICAgICAgICAgICAgfSBlbHNlIGlmIChzdGF0dXMgPT09ICdtaXNzJykge1xuICAgICAgICAgICAgICAgIHRleHRCb3gxLnRleHRDb250ZW50ID0gYFlvdSBhdHRhY2tlZCByb3c6XG4gICAgICAgICAgICAgICAgJHtjb29yZHNbMF19IGNvbHVtbjogJHtjb29yZHNbMV19IGFuZCBtaXNzZWQhYFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc3Vua1NoaXBNZXNzYWdlKHNoaXAsIG5hbWUpIHtcbiAgICAgICAgY29uc3QgdGV4dEJveDEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGV4dC1ib3gxJyk7XG4gICAgICAgIGNvbnN0IHRleHRCb3gyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRleHQtYm94MicpO1xuICAgICAgICBjb25zb2xlLmxvZyhzaGlwLCBuYW1lKVxuICAgICAgICBpZiAobmFtZSAhPT0gJ1BsYXllciAyJykge1xuICAgICAgICAgICAgdGV4dEJveDIudGV4dENvbnRlbnQgPSBgWW91ciAke3NoaXAubmFtZX0gaGFzIGJlZW4gc3VuayEhYFxuICAgICAgICB9IGVsc2UgaWYgKG5hbWUgPT09ICdQbGF5ZXIgMicpIHtcbiAgICAgICAgICAgIHRleHRCb3gxLnRleHRDb250ZW50ID0gYFlvdSBzdW5rIHRoZSBlbmVteSdzICR7c2hpcC5uYW1lfSEhYFxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBlbmRHYW1lTWVzc2FnZShuYW1lKSB7XG4gICAgICAgIGNvbnN0IHRleHRCb3gzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRleHQtYm94MycpXG4gICAgICAgIC8vIG1heWJlIHB1dCB0cmlnZ2VyIGhlcmUgdG8gbWFrZSBhICdyZXN0YXJ0IGdhbWUnXG4gICAgICAgIC8vIGJ1dHRvbiB0byBwb3AgdXBcbiAgICAgICAgaWYgKG5hbWUgPT09ICdQbGF5ZXIgMicpIHtcbiAgICAgICAgICAgIHRleHRCb3gzLnRleHRDb250ZW50ID0gJ1RoZSBlbmVteSBmbGVldCBoYXMgYmVlbiBzYW5rLiBFeGNlbGxlbnQgd29yayBTb2xkaWVyISdcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRleHRCb3gzLnRleHRDb250ZW50ID0gJ1dlIGhhdmUgbG9zdCBvdXIgZmxlZXQgYW5kIGJlZW4gZGVmZWF0ZWQuIEFib3J0IHRoZSBtaXNzaW9uISdcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgcmV0dXJuIHttb3ZlUmVzdWx0LCBzdW5rU2hpcE1lc3NhZ2UsIGVuZEdhbWVNZXNzYWdlfVxufSIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIGBodG1sLCBib2R5IHtcbiAgICBtaW4taGVpZ2h0OiAxMDAlO1xuICAgIG1pbi13aWR0aDogMTAwJTtcbiAgICBtYXJnaW46IDBweDtcbn1cblxuYm9keSB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogbmF2eTtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG59XG5cbi5wcm9tcHQtYm94IHtcbiAgICBkaXNwbGF5OiBub25lXG59XG5cbi5nYW1lLWNvbnRhaW5lciB7XG4gICAgZGlzcGxheTogZ3JpZDtcbiAgICBncmlkLXRlbXBsYXRlLXJvd3M6IDFmciA0ZnIgMS43ZnI7XG4gICAgaGVpZ2h0OiAxMDB2aDtcbiAgICB3aWR0aDogMTAwdnc7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDU5LCA1OSwgNTkpO1xufVxuXG4uaGVhZGVyIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGdyaWQtcm93OiAxIC8gMjtcbn1cblxuLmdhbWVib2FyZHMge1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xuICAgIGdyaWQtcm93OiAyIC8gMztcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTE0LCAxNTUsIDE1NSk7XG59XG5cbi5kaWFsb2d1ZS1jb250YWluZXIge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBncmlkLXJvdzogMyAvIDQ7XG59XG5cbi5kaWFsb2d1ZS1ib3gge1xuICAgIGhlaWdodDogMjB2aDtcbiAgICB3aWR0aDogNTB2dztcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoNzcsIDEzNCwgNzcpO1xufVxuXG5cbi8qIGdhbWVib2FyZCB3cmFwcGVyIHN0eWxpbmcgKi9cbi5ib2FyZC13cmFwcGVyIHtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgaGVpZ2h0OiAxMDAlO1xuICAgIHdpZHRoOiA0MDBweDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBiaXNxdWU7XG4gICAgcGFkZGluZzogMCAxNXB4O1xufVxuXG4uYm9hcmQtdGl0bGUge1xuXG59XG5cbi5nYW1lYm9hcmQge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICBoZWlnaHQ6IDQwMHB4O1xuICAgIHdpZHRoOiA0MDBweDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBibHVldmlvbGV0O1xufVxuXG4ucm93IHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIC8qIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47ICovXG4gICAgaGVpZ2h0OiAxMCU7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcGluaztcbn1cblxuLmNlbGwge1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIG1hcmdpbjogMHB4O1xuICAgIGFzcGVjdC1yYXRpbzogMTtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjIxLCAyNDEsIDI0MSk7XG4gICAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XG59XG5cbi5jZWxsLWMge1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIG1hcmdpbjogMHB4O1xuICAgIGFzcGVjdC1yYXRpbzogMTtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjIxLCAyNDEsIDI0MSk7XG4gICAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XG59XG5cbi5jZWxsLWM6aG92ZXIge1xuICAgIGJhY2tncm91bmQtY29sb3I6IGFudGlxdWV3aGl0ZTtcbn1cblxuXG4vKiBzdHlsaW5nIGZvciBkaWFsb2d1ZSBib3ggKi9cbi5kaWFsb2d1ZS1jb250YWluZXIge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBncmlkLXJvdzogMyAvIDQ7XG59XG5cbi5kaWFsb2d1ZS1ib3gge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWV2ZW5seTtcbiAgICBoZWlnaHQ6IDIwdmg7XG4gICAgd2lkdGg6IDQ1dnc7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDc3LCAxMzQsIDc3KTtcbn1cblxuLnRleHQtYm94MSB7XG4gICAgaGVpZ2h0OiA0dmg7XG4gICAgd2lkdGg6IDQwdnc7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogbGlnaHRibHVlO1xufVxuXG4udGV4dC1ib3gyIHtcbiAgICBoZWlnaHQ6IDR2aDtcbiAgICB3aWR0aDogNDB2dztcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBsaWdodGJsdWU7XG59XG5cbi50ZXh0LWJveDMge1xuICAgIGhlaWdodDogNHZoO1xuICAgIHdpZHRoOiA0MHZ3O1xuICAgIGJhY2tncm91bmQtY29sb3I6IGxpZ2h0Ymx1ZTtcbn1cblxuXG4vKiBzdHlsaW5nIGZvciByZXNldCBnYW1lICovXG4uZW5kLWdhbWUtYm94IHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIHRvcDogMjQ1cHg7XG4gICAgbGVmdDogMDtcbiAgICByaWdodDogMDtcbiAgICBtYXJnaW4tbGVmdDogYXV0bztcbiAgICBtYXJnaW4tcmlnaHQ6IGF1dG87XG4gICAgd2lkdGg6IDIyMHB4O1xuICAgIGhlaWdodDogMjIwcHg7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogYXp1cmU7XG59XG5cbi5yZXNldC1nYW1lLWJ1dHRvbiB7XG4gICAgaGVpZ2h0OiA1MHB4O1xuICAgIHdpZHRoOiA1MHB4O1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYigxNDQsIDU4LCA1OCk7XG59XG5cblxuLyogc3R5bGluZyBmb3Igc2hpcCBQbGFjZW1lbnQgKi9cblxuLnZhbGlkLXBsYWNlbWVudCB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDExMCwgMTg5LCAxMTApO1xufVxuXG4uaW52YWxpZC1wbGFjZW1lbnQge1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYigyNDksIDExNiwgMTE2KTtcbn1cblxuLnBsYWNlZCB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDc2LCA3NiwgMTEwKTtcbn1cblxuLnJvdGF0ZS1zaGlwIHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgdG9wOiAxNXB4O1xuICAgIHJpZ2h0OiAyMHB4O1xuICAgIC8qIG1hcmdpbi1sZWZ0OiBhdXRvO1xuICAgIG1hcmdpbi1yaWdodDogYXV0bzsgKi9cbiAgICBoZWlnaHQ6IDI1cHg7XG4gICAgd2lkdGg6IDYwcHg7XG4gICAgYm9yZGVyOiAycHggc29saWQgb3JhbmdlO1xufVxuXG4uc3RhcnQtZ2FtZS1idXR0b24ge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB0b3A6IDM1MHB4O1xuICAgIGxlZnQ6IDA7XG4gICAgcmlnaHQ6IDA7XG4gICAgbWFyZ2luLWxlZnQ6IGF1dG87XG4gICAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xuICAgIGhlaWdodDogMjVweDtcbiAgICB3aWR0aDogMTEwcHg7XG4gICAgYm9yZGVyOiAycHggc29saWQgb3JhbmdlO1xufWAsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3BhZ2VTdHlsaW5nLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtJQUNJLGdCQUFnQjtJQUNoQixlQUFlO0lBQ2YsV0FBVztBQUNmOztBQUVBO0lBQ0ksc0JBQXNCO0lBQ3RCLGtCQUFrQjtBQUN0Qjs7QUFFQTtJQUNJO0FBQ0o7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsaUNBQWlDO0lBQ2pDLGFBQWE7SUFDYixZQUFZO0lBQ1osaUNBQWlDO0FBQ3JDOztBQUVBO0lBQ0ksYUFBYTtJQUNiLGVBQWU7QUFDbkI7O0FBRUE7SUFDSSxrQkFBa0I7SUFDbEIsYUFBYTtJQUNiLDZCQUE2QjtJQUM3QixlQUFlO0lBQ2Ysb0NBQW9DO0FBQ3hDOztBQUVBO0lBQ0ksYUFBYTtJQUNiLHVCQUF1QjtJQUN2QixtQkFBbUI7SUFDbkIsZUFBZTtBQUNuQjs7QUFFQTtJQUNJLFlBQVk7SUFDWixXQUFXO0lBQ1gsa0NBQWtDO0FBQ3RDOzs7QUFHQSw4QkFBOEI7QUFDOUI7SUFDSSxrQkFBa0I7SUFDbEIsWUFBWTtJQUNaLFlBQVk7SUFDWix3QkFBd0I7SUFDeEIsZUFBZTtBQUNuQjs7QUFFQTs7QUFFQTs7QUFFQTtJQUNJLGFBQWE7SUFDYixzQkFBc0I7SUFDdEIsYUFBYTtJQUNiLFlBQVk7SUFDWiw0QkFBNEI7QUFDaEM7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsNEJBQTRCO0lBQzVCLFdBQVc7SUFDWCxXQUFXO0lBQ1gsc0JBQXNCO0FBQzFCOztBQUVBO0lBQ0ksV0FBVztJQUNYLFdBQVc7SUFDWCxlQUFlO0lBQ2Ysb0NBQW9DO0lBQ3BDLHVCQUF1QjtBQUMzQjs7QUFFQTtJQUNJLFdBQVc7SUFDWCxXQUFXO0lBQ1gsZUFBZTtJQUNmLG9DQUFvQztJQUNwQyx1QkFBdUI7QUFDM0I7O0FBRUE7SUFDSSw4QkFBOEI7QUFDbEM7OztBQUdBLDZCQUE2QjtBQUM3QjtJQUNJLGFBQWE7SUFDYix1QkFBdUI7SUFDdkIsbUJBQW1CO0lBQ25CLGVBQWU7QUFDbkI7O0FBRUE7SUFDSSxhQUFhO0lBQ2Isc0JBQXNCO0lBQ3RCLDZCQUE2QjtJQUM3QixZQUFZO0lBQ1osV0FBVztJQUNYLGtDQUFrQztBQUN0Qzs7QUFFQTtJQUNJLFdBQVc7SUFDWCxXQUFXO0lBQ1gsMkJBQTJCO0FBQy9COztBQUVBO0lBQ0ksV0FBVztJQUNYLFdBQVc7SUFDWCwyQkFBMkI7QUFDL0I7O0FBRUE7SUFDSSxXQUFXO0lBQ1gsV0FBVztJQUNYLDJCQUEyQjtBQUMvQjs7O0FBR0EsMkJBQTJCO0FBQzNCO0lBQ0ksa0JBQWtCO0lBQ2xCLGFBQWE7SUFDYix1QkFBdUI7SUFDdkIsbUJBQW1CO0lBQ25CLFVBQVU7SUFDVixPQUFPO0lBQ1AsUUFBUTtJQUNSLGlCQUFpQjtJQUNqQixrQkFBa0I7SUFDbEIsWUFBWTtJQUNaLGFBQWE7SUFDYix1QkFBdUI7QUFDM0I7O0FBRUE7SUFDSSxZQUFZO0lBQ1osV0FBVztJQUNYLGtDQUFrQztBQUN0Qzs7O0FBR0EsK0JBQStCOztBQUUvQjtJQUNJLG9DQUFvQztBQUN4Qzs7QUFFQTtJQUNJLG9DQUFvQztBQUN4Qzs7QUFFQTtJQUNJLGtDQUFrQztBQUN0Qzs7QUFFQTtJQUNJLGtCQUFrQjtJQUNsQixTQUFTO0lBQ1QsV0FBVztJQUNYO3lCQUNxQjtJQUNyQixZQUFZO0lBQ1osV0FBVztJQUNYLHdCQUF3QjtBQUM1Qjs7QUFFQTtJQUNJLGtCQUFrQjtJQUNsQixVQUFVO0lBQ1YsT0FBTztJQUNQLFFBQVE7SUFDUixpQkFBaUI7SUFDakIsa0JBQWtCO0lBQ2xCLFlBQVk7SUFDWixZQUFZO0lBQ1osd0JBQXdCO0FBQzVCXCIsXCJzb3VyY2VzQ29udGVudFwiOltcImh0bWwsIGJvZHkge1xcbiAgICBtaW4taGVpZ2h0OiAxMDAlO1xcbiAgICBtaW4td2lkdGg6IDEwMCU7XFxuICAgIG1hcmdpbjogMHB4O1xcbn1cXG5cXG5ib2R5IHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogbmF2eTtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbn1cXG5cXG4ucHJvbXB0LWJveCB7XFxuICAgIGRpc3BsYXk6IG5vbmVcXG59XFxuXFxuLmdhbWUtY29udGFpbmVyIHtcXG4gICAgZGlzcGxheTogZ3JpZDtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiAxZnIgNGZyIDEuN2ZyO1xcbiAgICBoZWlnaHQ6IDEwMHZoO1xcbiAgICB3aWR0aDogMTAwdnc7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYig1OSwgNTksIDU5KTtcXG59XFxuXFxuLmhlYWRlciB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGdyaWQtcm93OiAxIC8gMjtcXG59XFxuXFxuLmdhbWVib2FyZHMge1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xcbiAgICBncmlkLXJvdzogMiAvIDM7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYigxMTQsIDE1NSwgMTU1KTtcXG59XFxuXFxuLmRpYWxvZ3VlLWNvbnRhaW5lciB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBncmlkLXJvdzogMyAvIDQ7XFxufVxcblxcbi5kaWFsb2d1ZS1ib3gge1xcbiAgICBoZWlnaHQ6IDIwdmg7XFxuICAgIHdpZHRoOiA1MHZ3O1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoNzcsIDEzNCwgNzcpO1xcbn1cXG5cXG5cXG4vKiBnYW1lYm9hcmQgd3JhcHBlciBzdHlsaW5nICovXFxuLmJvYXJkLXdyYXBwZXIge1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgIGhlaWdodDogMTAwJTtcXG4gICAgd2lkdGg6IDQwMHB4O1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBiaXNxdWU7XFxuICAgIHBhZGRpbmc6IDAgMTVweDtcXG59XFxuXFxuLmJvYXJkLXRpdGxlIHtcXG5cXG59XFxuXFxuLmdhbWVib2FyZCB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIGhlaWdodDogNDAwcHg7XFxuICAgIHdpZHRoOiA0MDBweDtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogYmx1ZXZpb2xldDtcXG59XFxuXFxuLnJvdyB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIC8qIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47ICovXFxuICAgIGhlaWdodDogMTAlO1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcGluaztcXG59XFxuXFxuLmNlbGwge1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgbWFyZ2luOiAwcHg7XFxuICAgIGFzcGVjdC1yYXRpbzogMTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDIyMSwgMjQxLCAyNDEpO1xcbiAgICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcXG59XFxuXFxuLmNlbGwtYyB7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBtYXJnaW46IDBweDtcXG4gICAgYXNwZWN0LXJhdGlvOiAxO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjIxLCAyNDEsIDI0MSk7XFxuICAgIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xcbn1cXG5cXG4uY2VsbC1jOmhvdmVyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogYW50aXF1ZXdoaXRlO1xcbn1cXG5cXG5cXG4vKiBzdHlsaW5nIGZvciBkaWFsb2d1ZSBib3ggKi9cXG4uZGlhbG9ndWUtY29udGFpbmVyIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGdyaWQtcm93OiAzIC8gNDtcXG59XFxuXFxuLmRpYWxvZ3VlLWJveCB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtZXZlbmx5O1xcbiAgICBoZWlnaHQ6IDIwdmg7XFxuICAgIHdpZHRoOiA0NXZ3O1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoNzcsIDEzNCwgNzcpO1xcbn1cXG5cXG4udGV4dC1ib3gxIHtcXG4gICAgaGVpZ2h0OiA0dmg7XFxuICAgIHdpZHRoOiA0MHZ3O1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBsaWdodGJsdWU7XFxufVxcblxcbi50ZXh0LWJveDIge1xcbiAgICBoZWlnaHQ6IDR2aDtcXG4gICAgd2lkdGg6IDQwdnc7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IGxpZ2h0Ymx1ZTtcXG59XFxuXFxuLnRleHQtYm94MyB7XFxuICAgIGhlaWdodDogNHZoO1xcbiAgICB3aWR0aDogNDB2dztcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogbGlnaHRibHVlO1xcbn1cXG5cXG5cXG4vKiBzdHlsaW5nIGZvciByZXNldCBnYW1lICovXFxuLmVuZC1nYW1lLWJveCB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIHRvcDogMjQ1cHg7XFxuICAgIGxlZnQ6IDA7XFxuICAgIHJpZ2h0OiAwO1xcbiAgICBtYXJnaW4tbGVmdDogYXV0bztcXG4gICAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xcbiAgICB3aWR0aDogMjIwcHg7XFxuICAgIGhlaWdodDogMjIwcHg7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IGF6dXJlO1xcbn1cXG5cXG4ucmVzZXQtZ2FtZS1idXR0b24ge1xcbiAgICBoZWlnaHQ6IDUwcHg7XFxuICAgIHdpZHRoOiA1MHB4O1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTQ0LCA1OCwgNTgpO1xcbn1cXG5cXG5cXG4vKiBzdHlsaW5nIGZvciBzaGlwIFBsYWNlbWVudCAqL1xcblxcbi52YWxpZC1wbGFjZW1lbnQge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTEwLCAxODksIDExMCk7XFxufVxcblxcbi5pbnZhbGlkLXBsYWNlbWVudCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYigyNDksIDExNiwgMTE2KTtcXG59XFxuXFxuLnBsYWNlZCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYig3NiwgNzYsIDExMCk7XFxufVxcblxcbi5yb3RhdGUtc2hpcCB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdG9wOiAxNXB4O1xcbiAgICByaWdodDogMjBweDtcXG4gICAgLyogbWFyZ2luLWxlZnQ6IGF1dG87XFxuICAgIG1hcmdpbi1yaWdodDogYXV0bzsgKi9cXG4gICAgaGVpZ2h0OiAyNXB4O1xcbiAgICB3aWR0aDogNjBweDtcXG4gICAgYm9yZGVyOiAycHggc29saWQgb3JhbmdlO1xcbn1cXG5cXG4uc3RhcnQtZ2FtZS1idXR0b24ge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHRvcDogMzUwcHg7XFxuICAgIGxlZnQ6IDA7XFxuICAgIHJpZ2h0OiAwO1xcbiAgICBtYXJnaW4tbGVmdDogYXV0bztcXG4gICAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xcbiAgICBoZWlnaHQ6IDI1cHg7XFxuICAgIHdpZHRoOiAxMTBweDtcXG4gICAgYm9yZGVyOiAycHggc29saWQgb3JhbmdlO1xcbn1cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107XG5cbiAgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07XG5cbiAgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9wYWdlU3R5bGluZy5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3BhZ2VTdHlsaW5nLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiB1cGRhdGVyO1xufVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpO1xuXG4gICAgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG4gIGNzcyArPSBvYmouY3NzO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9XG5cbiAgLy8gRm9yIG9sZCBJRVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKCkge30sXG4gICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHt9XG4gICAgfTtcbiAgfVxuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubmMgPSB1bmRlZmluZWQ7IiwiaW1wb3J0ICcuL3BhZ2VTdHlsaW5nLmNzcyc7XG5pbXBvcnQgeyBnYW1lQm9hcmRDb250cm9sbGVyIH0gZnJvbSBcIi4vZ2FtZWJvYXJkQ29udHJvbGxlclwiO1xuaW1wb3J0IHsgaW5pdGlhbGl6ZUdhbWUgfSBmcm9tIFwiLi9nYW1lTG9vcFwiO1xuXG5cblxuaW5pdGlhbGl6ZUdhbWUoKSJdLCJuYW1lcyI6WyJQbGF5ZXIiLCJ1c2VyUGxheWVyIiwiY29tcHV0ZXJQbGF5ZXIiLCJnYW1lQm9hcmRDb250cm9sbGVyIiwiY3JlYXRlRmxlZXQiLCJjcmVhdGVPcHBGbGVldCIsImRvbU1hbmlwdWxhdGlvbiIsImh1bWFuU2hpcFBsYWNlbWVudCIsImNvbXB1dGVyUGxhY2VtZW50IiwiaW5pdGlhbGl6ZUdhbWUiLCJjcmVhdGVHYW1lIiwicnVuRE9NIiwiaHVtYW5QbGF5ZXIiLCJodW1hbkZsZWV0IiwiY29uc29sZSIsImxvZyIsImdhbWVCb2FyZCIsInBsYXllciIsImh1bWFuQm9hcmQiLCJjcmVhdGVCb2FyZCIsIkFJcGxheWVyIiwiY29tcHV0ZXJGbGVldCIsImNvbXB1dGVyQm9hcmQiLCJyZW5kZXJTdGFydCIsInJlbmRlckdhbWVCb2FyZCIsInJlbmRlckRpYWxvZ3VlQm94IiwiY29tcHV0ZXJQbGFjZW1lbnRzIiwiaHVtYW5QbGFjZW1lbnQiLCJyZXNldEludGVyZmFjZSIsImJvZHlFIiwiZW5kQm94IiwicGxheWVyQm9hcmRzIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiZGlhbG9ndWVDb250YWluZXIiLCJkaWFsb2d1ZUJveCIsImdhbWVCb2FyZFdyYXBwZXJzIiwicXVlcnlTZWxlY3RvckFsbCIsInJvdGF0ZVNoaXBCdXR0b24iLCJmb3JFYWNoIiwiZWxlbWVudCIsInJlbW92ZUNoaWxkIiwiU2hpcCIsImRpYWxvZ3VlQ29udHJvbGxlciIsImRpYWxvZ3VlUmVmcmVzaCIsImZsZWV0IiwibmFtZSIsInBsYXllck5hbWUiLCJib2FyZCIsInNoaXBzIiwiaSIsImoiLCJwbGFjZUhvcml6b250YWxTaGlwIiwicm93IiwiY29sIiwic2hpcCIsImxlbmd0aCIsIm5ld0Nvb3JkcyIsImNvb3JkcyIsInB1c2giLCJwbGFjZVZlcnRpY2FsU2hpcCIsInJlY2lldmVBdHRhY2siLCJhdHRhY2tTdGF0dXMiLCJjaGVja0lmVXNlZCIsImNvb3JkIiwiaGl0IiwidXBkYXRlQm9hcmRTcG90IiwibW92ZVJlc3VsdCIsInN1bmtDaGVjayIsImNoZWNrSWZTdW5rIiwic3Vua1NoaXBNZXNzYWdlIiwic3BsaWNlIiwiY2hlY2tBbGxTdW5rIiwiZW5kR2FtZU1lc3NhZ2UiLCJlbmRHYW1lIiwidXNlR3JpZFNwb3QiLCJmcmVlemVHcmlkIiwicmVuZGVyRW5kR2FtZSIsImNvbnN0cnVjdG9yIiwidmlzaXRlZCIsInBpY2tSYW5kb21DZWxsIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwiY29sdW1uIiwiY29tcENvb3JkcyIsInJlcGVhdEJvb2xlYW4iLCJjaGVja1JlcGVhdENlbGwiLCJzdHJpbmdlZENvb3JkcyIsIkpTT04iLCJzdHJpbmdpZnkiLCJleGlzdHNCb29sZWFuIiwic29tZSIsImhpdHMiLCJpc1N1bmsiLCJib2FyZFJ1biIsImNhcnJpZXIiLCJiYXR0bGVzaGlwIiwiZGVzdHJveWVyIiwic3VibWFyaW5lIiwicGF0cm9sQm9hdCIsInJvdGF0ZUJ1dHRvbiIsIm9jY3VwaWVkQ2VsbHMiLCJjdXJyZW50UGxhbmUiLCJjcmVhdGVSb3RhdGlvbkFiaWxpdHkiLCJodW1hbkNlbGxzIiwic2hpcEluZGV4IiwiY2VsbCIsImFkZEV2ZW50TGlzdGVuZXIiLCJjZWxsSG92ZXIiLCJjbGFzc0xpc3QiLCJjb250YWlucyIsInBsYWNlSG9yaXpvbnRhbGx5IiwiY29vcmRpbmF0ZXMiLCJhY3RpdmVDZWxscyIsInBsYWNlVmVydGljYWxseSIsImNlbGxDb29yZHMiLCJncm91cGVkQ2VsbHMiLCJjZWxsUm93IiwiY2VsbENvbHVtbiIsImFjdGl2ZUNlbGwiLCJnZXRFbGVtZW50QnlJZCIsImNvbmZsaWN0aW5nIiwiY2hlY2tDb25mbGljdGluZ1NoaXBzIiwiZWxlbSIsImFkZCIsInJlbW92ZSIsImFscmVhZHlVc2VkIiwiY2hlY2tGb3JSZXBlYXQiLCJuZXdQbGFuZSIsInN3aXRjaFBsYW5lIiwicGxhbmVzIiwidXNlZENlbGxzIiwiY3JlYXRlU2hpcENvb3JkcyIsImNob3NlblBsYW5lIiwiY2hvb3NlUGxhbmUiLCJ0ZXN0SG9yaXpvbnRhbFNoaXAiLCJ0ZXN0VmVydGljYWxTaGlwIiwic3RhcnRpbmdDb29yZHMiLCJjcmVhdGVIb3Jpem9udGFsU3RhcnQiLCJyZXBlYXQiLCJjcmVhdGVWZXJ0aWNhbFN0YXJ0IiwiY2hvc2VuSW5kZXgiLCJzdGFydGluZ0Nvb3JkIiwiYXJyYXkiLCJjb21wdXRlck1vdmVzIiwic3RhcnRHYW1lQnV0dG9uIiwiY3JlYXRlRWxlbWVudCIsImFwcGVuZEVsZW1lbnQiLCJ0ZXh0Q29udGVudCIsImJvYXJkQ29udHJvbGxlciIsImlzQ29tcHV0ZXIiLCJnYW1lQm9hcmRXcmFwcGVyIiwiYm9hcmRUaXRsZSIsImdhbWVib2FyZCIsImJ1aWxkR3JpZCIsInNldEdyaWRUcmlnZ2VycyIsImdhbWVib2FyZEVsZW1lbnQiLCJzZXRBdHRyaWJ1dGUiLCJjb21wdXRlckJvYXJkQ29udHJvbGxlciIsImh1bWFuQm9hcmRDb250cm9sbGVyIiwiY2VsbHMiLCJzdGF0dXMiLCJ1c2VkQ2VsbCIsInN0eWxlIiwicG9pbnRlckV2ZW50cyIsInRleHRCb3gxIiwidGV4dEJveDIiLCJ0ZXh0Qm94MyIsImJvZHlFbGVtZW50IiwiYm9keSIsImVuZEdhbWVCb3giLCJlbmRHYW1lSWNvbiIsInJlc2V0R2FtZUJ1dHRvbiIsImVsZW1lbnROYW1lIiwiY2xhc3NOYW1lIiwiZmF0aGVyRWxlbWVudCIsImFwcGVuZENoaWxkIiwiYXJndW1lbnRzIiwidW5kZWZpbmVkIl0sInNvdXJjZVJvb3QiOiIifQ==