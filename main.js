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
      ship.coords.push(newCoords);
    }
    console.log(ships);
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

  // boardRun.placeHorizontalShip(1, 5, carrier);
  // boardRun.placeVerticalShip(4,1, battleship)
  // boardRun.placeHorizontalShip(7, 4, destroyer);
  // boardRun.placeVerticalShip(7, 8, submarine);
  // boardRun.placeHorizontalShip(2, 6, patrolBoat);
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

  // boardRun.placeHorizontalShip(1, 1, carrier);
  // boardRun.placeVerticalShip(4,2, battleship)
  // boardRun.placeHorizontalShip(6, 6, destroyer);
  // boardRun.placeVerticalShip(7, 8, submarine);
  // boardRun.placeHorizontalShip(3, 7, patrolBoat);
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
    // let chosenPlane = choosePlane(planes);
    // using to test:
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
    console.log(startingCoords);
    for (let i = 0; i < ship.length; i++) {}
    // create ship coords
    // push to usedCells
    // check if in usedCells
    // if false, run placeShip functions
  }
  function testVerticalShip(ship) {
    const startingCoords = createVerticalStart(ship);
    console.log(startingCoords);
    for (let i = 0; i < ship.length; i++) {}
  }
  function choosePlane(planes) {
    const chosenIndex = Math.floor(Math.random() * planes.length);
    console.log(planes[chosenIndex]);
    return planes[chosenIndex];
  }
  function createHorizontalStart(ship) {
    console.log(ship.name);
    const row = Math.floor(Math.random() * 10) + 1;
    const column = Math.floor(Math.random() * (10 - ship.length)) + 1;
    const startingCoord = [row, column];
    return startingCoord;
  }
  function createVerticalStart(ship) {
    console.log(ship.name);
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
  // console.log(existsBoolean)
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
    const rotateShipButton = document.createElement('button');
    appendElement(rotateShipButton, 'rotate-ship', playerBoards);
    rotateShipButton.textContent = 'Rotate';
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
    /* background-color: antiquewhite; */
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
    top: 300px;
    right: 40%;
    height: 25px;
    width: 60px;
    border: 2px solid orange;
}`, "",{"version":3,"sources":["webpack://./src/pageStyling.css"],"names":[],"mappings":"AAAA;IACI,gBAAgB;IAChB,eAAe;IACf,WAAW;AACf;;AAEA;IACI,sBAAsB;IACtB,kBAAkB;AACtB;;AAEA;IACI;AACJ;;AAEA;IACI,aAAa;IACb,iCAAiC;IACjC,aAAa;IACb,YAAY;IACZ,iCAAiC;AACrC;;AAEA;IACI,aAAa;IACb,eAAe;AACnB;;AAEA;IACI,kBAAkB;IAClB,aAAa;IACb,6BAA6B;IAC7B,eAAe;IACf,oCAAoC;AACxC;;AAEA;IACI,aAAa;IACb,uBAAuB;IACvB,mBAAmB;IACnB,eAAe;AACnB;;AAEA;IACI,YAAY;IACZ,WAAW;IACX,kCAAkC;AACtC;;;AAGA,8BAA8B;AAC9B;IACI,YAAY;IACZ,YAAY;IACZ,wBAAwB;IACxB,eAAe;AACnB;;AAEA;;AAEA;;AAEA;IACI,aAAa;IACb,sBAAsB;IACtB,aAAa;IACb,YAAY;IACZ,4BAA4B;AAChC;;AAEA;IACI,aAAa;IACb,4BAA4B;IAC5B,WAAW;IACX,WAAW;IACX,sBAAsB;AAC1B;;AAEA;IACI,WAAW;IACX,WAAW;IACX,eAAe;IACf,oCAAoC;IACpC,uBAAuB;AAC3B;;AAEA;IACI,WAAW;IACX,WAAW;IACX,eAAe;IACf,oCAAoC;IACpC,uBAAuB;AAC3B;;AAEA;IACI,oCAAoC;AACxC;;;AAGA,6BAA6B;AAC7B;IACI,aAAa;IACb,uBAAuB;IACvB,mBAAmB;IACnB,eAAe;AACnB;;AAEA;IACI,aAAa;IACb,sBAAsB;IACtB,6BAA6B;IAC7B,YAAY;IACZ,WAAW;IACX,kCAAkC;AACtC;;AAEA;IACI,WAAW;IACX,WAAW;IACX,2BAA2B;AAC/B;;AAEA;IACI,WAAW;IACX,WAAW;IACX,2BAA2B;AAC/B;;AAEA;IACI,WAAW;IACX,WAAW;IACX,2BAA2B;AAC/B;;;AAGA,2BAA2B;AAC3B;IACI,kBAAkB;IAClB,aAAa;IACb,uBAAuB;IACvB,mBAAmB;IACnB,UAAU;IACV,OAAO;IACP,QAAQ;IACR,iBAAiB;IACjB,kBAAkB;IAClB,YAAY;IACZ,aAAa;IACb,uBAAuB;AAC3B;;AAEA;IACI,YAAY;IACZ,WAAW;IACX,kCAAkC;AACtC;;;AAGA,+BAA+B;;AAE/B;IACI,oCAAoC;AACxC;;AAEA;IACI,oCAAoC;AACxC;;AAEA;IACI,kCAAkC;AACtC;;AAEA;IACI,kBAAkB;IAClB,UAAU;IACV,UAAU;IACV,YAAY;IACZ,WAAW;IACX,wBAAwB;AAC5B","sourcesContent":["html, body {\n    min-height: 100%;\n    min-width: 100%;\n    margin: 0px;\n}\n\nbody {\n    background-color: navy;\n    position: relative;\n}\n\n.prompt-box {\n    display: none\n}\n\n.game-container {\n    display: grid;\n    grid-template-rows: 1fr 4fr 1.7fr;\n    height: 100vh;\n    width: 100vw;\n    background-color: rgb(59, 59, 59);\n}\n\n.header {\n    display: flex;\n    grid-row: 1 / 2;\n}\n\n.gameboards {\n    position: relative;\n    display: flex;\n    justify-content: space-around;\n    grid-row: 2 / 3;\n    background-color: rgb(114, 155, 155);\n}\n\n.dialogue-container {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    grid-row: 3 / 4;\n}\n\n.dialogue-box {\n    height: 20vh;\n    width: 50vw;\n    background-color: rgb(77, 134, 77);\n}\n\n\n/* gameboard wrapper styling */\n.board-wrapper {\n    height: 100%;\n    width: 400px;\n    background-color: bisque;\n    padding: 0 15px;\n}\n\n.board-title {\n\n}\n\n.gameboard {\n    display: flex;\n    flex-direction: column;\n    height: 400px;\n    width: 400px;\n    background-color: blueviolet;\n}\n\n.row {\n    display: flex;\n    /* flex-direction: column; */\n    height: 10%;\n    width: 100%;\n    background-color: pink;\n}\n\n.cell {\n    width: 100%;\n    margin: 0px;\n    aspect-ratio: 1;\n    background-color: rgb(221, 241, 241);\n    border: 1px solid black;\n}\n\n.cell-c {\n    width: 100%;\n    margin: 0px;\n    aspect-ratio: 1;\n    background-color: rgb(221, 241, 241);\n    border: 1px solid black;\n}\n\n.cell:hover, .cell-c:hover {\n    /* background-color: antiquewhite; */\n}\n\n\n/* styling for dialogue box */\n.dialogue-container {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    grid-row: 3 / 4;\n}\n\n.dialogue-box {\n    display: flex;\n    flex-direction: column;\n    justify-content: space-evenly;\n    height: 20vh;\n    width: 45vw;\n    background-color: rgb(77, 134, 77);\n}\n\n.text-box1 {\n    height: 4vh;\n    width: 40vw;\n    background-color: lightblue;\n}\n\n.text-box2 {\n    height: 4vh;\n    width: 40vw;\n    background-color: lightblue;\n}\n\n.text-box3 {\n    height: 4vh;\n    width: 40vw;\n    background-color: lightblue;\n}\n\n\n/* styling for reset game */\n.end-game-box {\n    position: absolute;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    top: 245px;\n    left: 0;\n    right: 0;\n    margin-left: auto;\n    margin-right: auto;\n    width: 220px;\n    height: 220px;\n    background-color: azure;\n}\n\n.reset-game-button {\n    height: 50px;\n    width: 50px;\n    background-color: rgb(144, 58, 58);\n}\n\n\n/* styling for ship Placement */\n\n.valid-placement {\n    background-color: rgb(110, 189, 110);\n}\n\n.invalid-placement {\n    background-color: rgb(249, 116, 116);\n}\n\n.placed {\n    background-color: rgb(76, 76, 110);\n}\n\n.rotate-ship {\n    position: absolute;\n    top: 300px;\n    right: 40%;\n    height: 25px;\n    width: 60px;\n    border: 2px solid orange;\n}"],"sourceRoot":""}]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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ZUxvb3AuanMiLCJ3ZWJwYWNrOi8vbWFpbi10ZW1wbGF0ZS8uL3NyYy9nYW1lYm9hcmRDb250cm9sbGVyLmpzIiwid2VicGFjazovL21haW4tdGVtcGxhdGUvLi9zcmMvcGxheWVyLmpzIiwid2VicGFjazovL21haW4tdGVtcGxhdGUvLi9zcmMvc2hpcC1vYmplY3QuanMiLCJ3ZWJwYWNrOi8vbWFpbi10ZW1wbGF0ZS8uL3NyYy9zaGlwUGxhY2VtZW50LmpzIiwid2VicGFjazovL21haW4tdGVtcGxhdGUvLi9zcmMvdXNlckludGVyZmFjZS5qcyIsIndlYnBhY2s6Ly9tYWluLXRlbXBsYXRlLy4vc3JjL3BhZ2VTdHlsaW5nLmNzcyIsIndlYnBhY2s6Ly9tYWluLXRlbXBsYXRlLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly9tYWluLXRlbXBsYXRlLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vbWFpbi10ZW1wbGF0ZS8uL3NyYy9wYWdlU3R5bGluZy5jc3M/YTliNyIsIndlYnBhY2s6Ly9tYWluLXRlbXBsYXRlLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL21haW4tdGVtcGxhdGUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL21haW4tdGVtcGxhdGUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vbWFpbi10ZW1wbGF0ZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9tYWluLXRlbXBsYXRlLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vbWFpbi10ZW1wbGF0ZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL21haW4tdGVtcGxhdGUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbWFpbi10ZW1wbGF0ZS93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9tYWluLXRlbXBsYXRlL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9tYWluLXRlbXBsYXRlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vbWFpbi10ZW1wbGF0ZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL21haW4tdGVtcGxhdGUvd2VicGFjay9ydW50aW1lL25vbmNlIiwid2VicGFjazovL21haW4tdGVtcGxhdGUvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L3ByZWZlci1kZWZhdWx0LWV4cG9ydCAqL1xuaW1wb3J0IHsgUGxheWVyLCB1c2VyUGxheWVyLCBjb21wdXRlclBsYXllciB9IGZyb20gXCIuL3BsYXllclwiO1xuaW1wb3J0IHsgZ2FtZUJvYXJkQ29udHJvbGxlciB9IGZyb20gXCIuL2dhbWVib2FyZENvbnRyb2xsZXJcIjtcbmltcG9ydCB7IGNyZWF0ZUZsZWV0LCBjcmVhdGVPcHBGbGVldCB9IGZyb20gXCIuL3NoaXAtb2JqZWN0XCI7XG5pbXBvcnQgeyBkb21NYW5pcHVsYXRpb24gfSBmcm9tIFwiLi91c2VySW50ZXJmYWNlXCI7XG5pbXBvcnQgeyBodW1hblNoaXBQbGFjZW1lbnQsIGNvbXB1dGVyUGxhY2VtZW50IH0gZnJvbSBcIi4vc2hpcFBsYWNlbWVudFwiO1xuXG5leHBvcnQgY29uc3QgaW5pdGlhbGl6ZUdhbWUgPSBmdW5jdGlvbiBjcmVhdGVHYW1lKCkge1xuICAgIGNvbnN0IHJ1bkRPTSA9IGRvbU1hbmlwdWxhdGlvbigpO1xuXG4gICAgY29uc3QgaHVtYW5QbGF5ZXIgPSBuZXcgUGxheWVyKCdQbGF5ZXIgMScpXG4gICAgY29uc3QgaHVtYW5GbGVldCA9IGNyZWF0ZUZsZWV0KClcbiAgICBjb25zb2xlLmxvZyhodW1hbkZsZWV0KVxuICAgIGh1bWFuUGxheWVyLmdhbWVCb2FyZCA9IGdhbWVCb2FyZENvbnRyb2xsZXIoaHVtYW5GbGVldCwgaHVtYW5QbGF5ZXIucGxheWVyKTtcbiAgICBjb25zdCBodW1hbkJvYXJkID0gaHVtYW5QbGF5ZXIuZ2FtZUJvYXJkXG4gICAgaHVtYW5Cb2FyZC5jcmVhdGVCb2FyZCgpO1xuICAgIFxuXG4gICAgY29uc3QgQUlwbGF5ZXIgPSBuZXcgUGxheWVyKCdQbGF5ZXIgMicpO1xuICAgIGNvbnN0IGNvbXB1dGVyRmxlZXQgPSBjcmVhdGVPcHBGbGVldCgpO1xuICAgIEFJcGxheWVyLmdhbWVCb2FyZCA9IGdhbWVCb2FyZENvbnRyb2xsZXIoY29tcHV0ZXJGbGVldCwgQUlwbGF5ZXIucGxheWVyKTtcbiAgICBjb25zdCBjb21wdXRlckJvYXJkID0gQUlwbGF5ZXIuZ2FtZUJvYXJkO1xuICAgIGNvbXB1dGVyQm9hcmQuY3JlYXRlQm9hcmQoKTtcblxuICAgIHJ1bkRPTS5yZW5kZXJTdGFydCgpO1xuICAgIHJ1bkRPTS5yZW5kZXJHYW1lQm9hcmQoY29tcHV0ZXJCb2FyZC5jcmVhdGVCb2FyZCgpLCBBSXBsYXllci5wbGF5ZXIpO1xuICAgIHJ1bkRPTS5yZW5kZXJHYW1lQm9hcmQoY29tcHV0ZXJCb2FyZCwgaHVtYW5QbGF5ZXIucGxheWVyLCBodW1hbkJvYXJkKTtcbiAgICBcbiAgICAvLyBjYWxsIHJlbmRlciBkaWFsb2d1ZSBib3ggaGVyZVxuICAgIHJ1bkRPTS5yZW5kZXJEaWFsb2d1ZUJveCgpO1xuXG4gICAgLy8gY2FsbCBjb21wdXRlclBsYWNlbWVudCB0byBzZXQgdXAgY29tcHV0ZXIncyBjaGlwczpcbiAgICBjb25zdCBjb21wdXRlclBsYWNlbWVudHMgPSBjb21wdXRlclBsYWNlbWVudChjb21wdXRlckJvYXJkLCBjb21wdXRlckZsZWV0KTtcbiAgICBcbiAgICAvLyBjYWxsIHNoaXBQbGFjZW1lbnQgZnVuY3Rpb24gaGVyZSBmb3IgaHVtYW5Cb2FyZFxuICAgIGNvbnN0IGh1bWFuUGxhY2VtZW50ID0gaHVtYW5TaGlwUGxhY2VtZW50KGh1bWFuQm9hcmQsIGh1bWFuRmxlZXQpO1xuXG4gICBcbn1cblxuZXhwb3J0IGNvbnN0IHJlc2V0SW50ZXJmYWNlID0gZnVuY3Rpb24gKGJvZHlFLCBlbmRCb3gpIHtcbiAgICBjb25zb2xlLmxvZygncmVzZXRpbmcgYWxsIHRoaXMgc2hpdCcpO1xuICAgIGNvbnN0IHBsYXllckJvYXJkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nYW1lYm9hcmRzJyk7XG4gICAgY29uc3QgZGlhbG9ndWVDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGlhbG9ndWUtY29udGFpbmVyJyk7XG5cbiAgICBjb25zdCBnYW1lQm9hcmRXcmFwcGVycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ib2FyZC13cmFwcGVyJyk7XG4gICAgY29uc3QgZGlhbG9ndWVCb3ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGlhbG9ndWUtYm94Jyk7XG4gICAgLy8gY29uc29sZS5sb2cocGxheWVyQm9hcmRzLCBkaWFsb2d1ZUNvbnRhaW5lciwgZ2FtZUJvYXJkV3JhcHBlcnMsIGRpYWxvZ3VlQm94KVxuICAgIGNvbnNvbGUubG9nKGJvZHlFLCBlbmRCb3gpXG5cbiAgICBnYW1lQm9hcmRXcmFwcGVycy5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG4gICAgICAgIHBsYXllckJvYXJkcy5yZW1vdmVDaGlsZChlbGVtZW50KTtcbiAgICB9KTtcbiAgICBkaWFsb2d1ZUNvbnRhaW5lci5yZW1vdmVDaGlsZChkaWFsb2d1ZUJveCk7XG4gICAgYm9keUUucmVtb3ZlQ2hpbGQoZW5kQm94KTtcblxuICAgIGluaXRpYWxpemVHYW1lKCk7XG5cbn0iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby11c2UtYmVmb3JlLWRlZmluZSAqL1xuLyogZXNsaW50LWRpc2FibGUgbm8tZWxzZS1yZXR1cm4gKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLWxvb3AtZnVuYyAqL1xuLyogZXNsaW50LWRpc2FibGUgbm8tcGx1c3BsdXMgKi9cbi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9wcmVmZXItZGVmYXVsdC1leHBvcnQgKi9cblxuLy8gZ2FtZUJvYXJkIHNob3VsZCBjaGVjayBpZiBhIGdhbWUgaXMgb3ZlciBieSBzZWVpbmcgaWYgdGhlXG4vLyBsZW5ndGggb2YgXCJzaGlwc1wiIGlzIHplcm8gKGNoZWNrQWxsU3VuaylcblxuLy8gcGxhY2luZyBzaGlwcyB2ZXJ0aWNhbGx5Li4uIHBvc3NpYmxlIGlkZWE6IGhhdmUgYSBjb2x1bW4gbnVtYmVyIChlLmcgMylcbi8vIHRoYXQgeW91IHVzZSB0byBzZWxlY3QgdGhlIGNvcnJlc3BvbmRpbmcgYXJyYXkgaXRlbSBpbiBlYWNoXG4vLyBvZiB0aGUgYXJyYXlzIHRoYXQgcmVwcmVzZW50cyBhIHJvdyBvbiB0aGUgYm9hcmRcbmltcG9ydCB7IFNoaXAsIGNyZWF0ZUZsZWV0IH0gZnJvbSBcIi4vc2hpcC1vYmplY3RcIlxuaW1wb3J0IHsgZG9tTWFuaXB1bGF0aW9uLCBkaWFsb2d1ZUNvbnRyb2xsZXIgfSBmcm9tIFwiLi91c2VySW50ZXJmYWNlXCI7XG5cbmNvbnN0IHJ1bkRPTSA9IGRvbU1hbmlwdWxhdGlvbigpO1xuY29uc3QgZGlhbG9ndWVSZWZyZXNoID0gZGlhbG9ndWVDb250cm9sbGVyKCk7XG5cbmV4cG9ydCBmdW5jdGlvbiBnYW1lQm9hcmRDb250cm9sbGVyKGZsZWV0LCBuYW1lKSB7XG4gICAgY29uc3QgcGxheWVyTmFtZSA9IG5hbWU7XG4gICAgY29uc3QgYm9hcmQgPSBbXTtcbiAgICBjb25zdCBzaGlwcyA9IGZsZWV0O1xuXG4gICAgLy8gY29uc29sZS5sb2coc2hpcHMpO1xuXG5cbiAgICBmdW5jdGlvbiBjcmVhdGVCb2FyZCgpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgICAgICAgICBib2FyZFtpXSA9IFtdO1xuXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspIHtcbiAgICAgICAgICAgICAgICBib2FyZFtpXVtqXSA9IGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2coYm9hcmQpO1xuICAgICAgICByZXR1cm4gYm9hcmRcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwbGFjZUhvcml6b250YWxTaGlwKHJvdywgY29sLCBzaGlwKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgbmV3Q29vcmRzID0gW3JvdywgY29sICsgaV07XG4gICAgICAgICAgICBzaGlwLmNvb3Jkcy5wdXNoKG5ld0Nvb3JkcylcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyhzaGlwcyk7XG4gICAgICAgIHJldHVybiBzaGlwXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGxhY2VWZXJ0aWNhbFNoaXAocm93LCBjb2wsIHNoaXApIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBuZXdDb29yZHMgPSBbcm93ICsgaSwgY29sXTtcbiAgICAgICAgICAgIC8vIHB1dCBhIGNoZWNrIGhlcmUgdG8gc2VlIGlmIHRoaXMgY29uZmxpY3RzIHdpdGhcbiAgICAgICAgICAgIC8vIGFueSBvdGhlciBzaGlwJ3MgY29vcmRzIFxuICAgICAgICAgICAgc2hpcC5jb29yZHMucHVzaChuZXdDb29yZHMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzaGlwXG4gICAgfVxuICAgIFxuICAgIGZ1bmN0aW9uIHJlY2lldmVBdHRhY2soY29vcmRzKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGNvb3JkcylcbiAgICAgICAgbGV0IGF0dGFja1N0YXR1cyA9ICdtaXNzJztcblxuICAgICAgICAvLyBjaGVjayB0byBzZWUgaWYgY29vcmRzIGhhdmUgYWxyZWFkeSBiZWVuIHVzZWQ6XG4gICAgICAgIGlmIChjaGVja0lmVXNlZChjb29yZHMpID09PSB0cnVlKSB7XG4gICAgICAgICAgICByZXR1cm4gJ2ZpbGxlZCBhbHJlYWR5J1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgc2hpcHNbaV0uY29vcmRzLmZvckVhY2goKGNvb3JkKSA9PiB7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKGNoZWNrSWZVc2VkKGNvb3JkcykgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdmaWxsZWQgYWxyZWFkeSdcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoY29vcmRbMF0gPT09IGNvb3Jkc1swXSAmJiBjb29yZFsxXSA9PT0gY29vcmRzWzFdKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdoaXQnKTtcbiAgICAgICAgICAgICAgICAgICAgYXR0YWNrU3RhdHVzID0gJ2hpdCdcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYXR0YWNrU3RhdHVzKVxuICAgICAgICAgICAgICAgICAgICBzaGlwc1tpXS5oaXQoKTtcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlQm9hcmRTcG90KGNvb3Jkcyk7XG4gICAgICAgICAgICAgICAgICAgIGRpYWxvZ3VlUmVmcmVzaC5tb3ZlUmVzdWx0KGF0dGFja1N0YXR1cyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYXllck5hbWUsIGNvb3Jkcywgc2hpcHNbaV0pXG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3Vua0NoZWNrID0gc2hpcHNbaV0uY2hlY2tJZlN1bmsoKVxuICAgICAgICAgICAgICAgICAgICBpZiAoc3Vua0NoZWNrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkaWFsb2d1ZVJlZnJlc2guc3Vua1NoaXBNZXNzYWdlKHNoaXBzW2ldLCBwbGF5ZXJOYW1lKVxuICAgICAgICAgICAgICAgICAgICAgICAgc2hpcHMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tBbGxTdW5rKClcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIHVwZGF0ZUJvYXJkU3BvdChjb29yZHMsIGF0dGFja1N0YXR1cyk7XG4gICAgICAgIGlmIChhdHRhY2tTdGF0dXMgPT09ICdtaXNzJykge1xuICAgICAgICAgICAgZGlhbG9ndWVSZWZyZXNoLm1vdmVSZXN1bHQoYXR0YWNrU3RhdHVzLFxuICAgICAgICAgICAgICAgIHBsYXllck5hbWUsIGNvb3JkcylcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGF0dGFja1N0YXR1c1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNoZWNrQWxsU3VuaygpIHtcbiAgICAgICAgY29uc29sZS5sb2coc2hpcHMpO1xuICAgICAgICBpZiAoc2hpcHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICBkaWFsb2d1ZVJlZnJlc2guZW5kR2FtZU1lc3NhZ2UocGxheWVyTmFtZSlcbiAgICAgICAgICAgIGVuZEdhbWUoKVxuICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlQm9hcmRTcG90KGNvb3JkcywgYXR0YWNrU3RhdHVzKSB7XG4gICAgICAgIGJvYXJkW2Nvb3Jkc1swXSAtIDFdW2Nvb3Jkc1sxXSAtIDFdID0gdHJ1ZTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coYm9hcmQpXG4gICAgICAgIHJ1bkRPTS51c2VHcmlkU3BvdChjb29yZHMsIGF0dGFja1N0YXR1cywgcGxheWVyTmFtZSlcbiAgICAgICAgcmV0dXJuIGJvYXJkXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2hlY2tJZlVzZWQoY29vcmRzKSB7XG4gICAgICAgIGlmIChib2FyZFtjb29yZHNbMF0gLSAxXVtjb29yZHNbMV0gLSAxXSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ2FscmVhZHkgdXNlZCcpXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICBcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBlbmRHYW1lKCkge1xuICAgICAgICAvLyB3YW50IHRvIGRpc2FibGUgYm90aCBnYW1lQm9hcmRzXG4gICAgICAgIC8vIHdhbnQgdG8gbWFrZSB0aGUgcmVzdGFydCBidXR0b24gYXBwZWFyXG4gICAgICAgIGNvbnNvbGUubG9nKCdlbmRpbmcgZ2FtZScpO1xuICAgICAgICBydW5ET00uZnJlZXplR3JpZCgpO1xuICAgICAgICBydW5ET00ucmVuZGVyRW5kR2FtZSgpO1xuICAgIH1cbiAgICAvLyBsaWtlbHkgd2lsbCBoYXZlIHRvIGltcGxlbWVudCBjaGVjayB0byBtYWtlIHN1cmUgYSBzaGlwIGNhblxuICAgIC8vIGJlIHBsYWNlZCB3aXRoIG5vIG92ZXJsYXBcblxuXG4gICAgcmV0dXJuIHsgY3JlYXRlQm9hcmQsIHBsYWNlSG9yaXpvbnRhbFNoaXAsIHBsYWNlVmVydGljYWxTaGlwLCByZWNpZXZlQXR0YWNrLFxuICAgIGNoZWNrQWxsU3VuaywgdXBkYXRlQm9hcmRTcG90LCBjaGVja0lmVXNlZCwgZW5kR2FtZSB9XG59XG5cbiIsIi8vIGNyZWF0ZSBib3RoIHRoZSB1c2VyIHBsYXllciBhbmQgdGhlIGNvbXB1dGVyIHBsYXllciBoZXJlXG5cbi8vIGNvbXB1dGVyIHBsYXllciBoYXMgYXR0YWNrIGNvb3JkaW5hdGVzIGdlbmVyYXRvciBmdW5jdGlvblxuaW1wb3J0IHsgZ2FtZUJvYXJkQ29udHJvbGxlciB9IGZyb20gXCIuL2dhbWVib2FyZENvbnRyb2xsZXJcIjtcblxuZXhwb3J0IGNsYXNzIFBsYXllciB7XG4gICAgY29uc3RydWN0b3IocGxheWVyLCBnYW1lQm9hcmQpIHtcbiAgICAgICAgdGhpcy5wbGF5ZXIgPSBwbGF5ZXI7XG4gICAgICAgIC8vIHRoaXMucGxheWVyU2hpcHMgPSBbXVxuICAgICAgICB0aGlzLmdhbWVCb2FyZD0gbnVsbFxuICAgIH1cbn1cblxuXG5leHBvcnQgY29uc3QgdXNlclBsYXllciA9IGZ1bmN0aW9uICgpIHtcblxufVxuXG5leHBvcnQgY29uc3QgY29tcHV0ZXJQbGF5ZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgdmlzaXRlZCA9IFtdO1xuXG4gICAgZnVuY3Rpb24gcGlja1JhbmRvbUNlbGwoaHVtYW5Cb2FyZCkge1xuICAgICAgICBjb25zdCByb3cgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCkgKyAxXG4gICAgICAgIGNvbnN0IGNvbHVtbiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKSArIDFcbiAgICAgICAgY29uc3QgY29tcENvb3JkcyA9IFtyb3csIGNvbHVtbl07XG5cbiAgICAgICAgY29uc3QgcmVwZWF0Qm9vbGVhbiA9IGNoZWNrUmVwZWF0Q2VsbChjb21wQ29vcmRzKVxuICAgICAgICBjb25zb2xlLmxvZyhyZXBlYXRCb29sZWFuKVxuICAgICAgICBpZiAocmVwZWF0Qm9vbGVhbiA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2NvbXB1dGVyIHBpY2tlZCB1c2VkIGNlbGwhIScpXG4gICAgICAgICAgICBwaWNrUmFuZG9tQ2VsbChodW1hbkJvYXJkKTtcbiAgICAgICAgfSBlbHNlIGlmIChyZXBlYXRCb29sZWFuID09PSBmYWxzZSkge1xuICAgICAgICAgICAgdmlzaXRlZC5wdXNoKGNvbXBDb29yZHMpO1xuICAgICAgICAgICAgaHVtYW5Cb2FyZC5yZWNpZXZlQXR0YWNrKGNvbXBDb29yZHMpO1xuXG4gICAgICAgICAgICByZXR1cm4gY29tcENvb3JkcyBcbiAgICAgICAgfVxuICAgICAgICBcblxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNoZWNrUmVwZWF0Q2VsbChjb29yZHMpIHtcbiAgICAgICAgY29uc3Qgc3RyaW5nZWRDb29yZHMgPSBKU09OLnN0cmluZ2lmeShjb29yZHMpO1xuICAgICAgICBjb25zdCBleGlzdHNCb29sZWFuID0gdmlzaXRlZC5zb21lKChjb29yZCkgPT4gSlNPTi5zdHJpbmdpZnkoY29vcmQpID09PSBzdHJpbmdlZENvb3JkcylcbiAgICAgICAgY29uc29sZS5sb2coZXhpc3RzQm9vbGVhbilcbiAgICAgICAgcmV0dXJuIGV4aXN0c0Jvb2xlYW5cbiAgICB9XG5cbiAgICByZXR1cm4ge3BpY2tSYW5kb21DZWxsLCBjaGVja1JlcGVhdENlbGx9XG59IiwiLyogZXNsaW50LWRpc2FibGUgbm8tZWxzZS1yZXR1cm4gKi9cbi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9wcmVmZXItZGVmYXVsdC1leHBvcnQgKi9cbmltcG9ydCB7IGdhbWVCb2FyZENvbnRyb2xsZXIgfSBmcm9tIFwiLi9nYW1lYm9hcmRDb250cm9sbGVyXCI7XG5cblxuZXhwb3J0IGNsYXNzIFNoaXAge1xuICAgIGNvbnN0cnVjdG9yKGxlbmd0aCwgbmFtZSwgaGl0cywgaXNTdW5rLCBjb29yZHMpIHtcbiAgICAgICAgdGhpcy5sZW5ndGggPSBsZW5ndGg7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMuaGl0cyA9IDA7XG4gICAgICAgIHRoaXMuaXNTdW5rID0gZmFsc2U7XG4gICAgICAgIHRoaXMuY29vcmRzID0gW11cbiAgICB9XG5cbiAgICBoaXQoKSB7XG4gICAgICAgIHRoaXMuaGl0cyArPSAxXG4gICAgICAgIGNvbnNvbGUubG9nKCdoaXQgYWRkZWQnKVxuICAgIH1cblxuICAgIGNoZWNrSWZTdW5rKCkge1xuICAgICAgICBpZiAodGhpcy5sZW5ndGggPT09IHRoaXMuaGl0cykge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ1N1bmshJylcbiAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmxlbmd0aCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmhpdHMpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICB9XG5cbn1cblxuY29uc3QgYm9hcmRSdW4gPSBnYW1lQm9hcmRDb250cm9sbGVyKCk7XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVGbGVldCgpIHtcbiAgICBjb25zdCBzaGlwcyA9IFtdXG5cbiAgICBjb25zdCBjYXJyaWVyID0gbmV3IFNoaXAoNSwgJ0NhcnJpZXInKTtcbiAgICBjb25zdCBiYXR0bGVzaGlwID0gbmV3IFNoaXAoNCwgJ0JhdHRsZXNoaXAnKTtcbiAgICBjb25zdCBkZXN0cm95ZXIgPSBuZXcgU2hpcCgzLCAnRGVzdHJveWVyJyk7XG4gICAgY29uc3Qgc3VibWFyaW5lID0gbmV3IFNoaXAoMywgJ1N1Ym1hcmluZScpO1xuICAgIGNvbnN0IHBhdHJvbEJvYXQgPSBuZXcgU2hpcCgyLCAnUGF0cm9sIEJvYXQnKTtcbiBcbiAgICBzaGlwcy5wdXNoKGNhcnJpZXIsIGJhdHRsZXNoaXAsIGRlc3Ryb3llciwgc3VibWFyaW5lLCBwYXRyb2xCb2F0KVxuXG4gICAgLy8gYm9hcmRSdW4ucGxhY2VIb3Jpem9udGFsU2hpcCgxLCA1LCBjYXJyaWVyKTtcbiAgICAvLyBib2FyZFJ1bi5wbGFjZVZlcnRpY2FsU2hpcCg0LDEsIGJhdHRsZXNoaXApXG4gICAgLy8gYm9hcmRSdW4ucGxhY2VIb3Jpem9udGFsU2hpcCg3LCA0LCBkZXN0cm95ZXIpO1xuICAgIC8vIGJvYXJkUnVuLnBsYWNlVmVydGljYWxTaGlwKDcsIDgsIHN1Ym1hcmluZSk7XG4gICAgLy8gYm9hcmRSdW4ucGxhY2VIb3Jpem9udGFsU2hpcCgyLCA2LCBwYXRyb2xCb2F0KTtcbiAgICBjb25zb2xlLmxvZyhzaGlwcyk7XG4gICAgcmV0dXJuIHNoaXBzXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVPcHBGbGVldCgpIHtcbiAgICBjb25zdCBzaGlwcyA9IFtdXG5cbiAgICBjb25zdCBjYXJyaWVyID0gbmV3IFNoaXAoNSwgJ0NhcnJpZXInKTtcbiAgICBjb25zdCBiYXR0bGVzaGlwID0gbmV3IFNoaXAoNCwgJ0JhdHRsZXNoaXAnKTtcbiAgICBjb25zdCBkZXN0cm95ZXIgPSBuZXcgU2hpcCgzLCAnRGVzdHJveWVyJyk7XG4gICAgY29uc3Qgc3VibWFyaW5lID0gbmV3IFNoaXAoMywgJ1N1Ym1hcmluZScpO1xuICAgIGNvbnN0IHBhdHJvbEJvYXQgPSBuZXcgU2hpcCgyLCAnUGF0cm9sIEJvYXQnKTtcblxuICAgIHNoaXBzLnB1c2goY2FycmllciwgYmF0dGxlc2hpcCwgZGVzdHJveWVyLCBzdWJtYXJpbmUsIHBhdHJvbEJvYXQpO1xuXG4gICAgLy8gYm9hcmRSdW4ucGxhY2VIb3Jpem9udGFsU2hpcCgxLCAxLCBjYXJyaWVyKTtcbiAgICAvLyBib2FyZFJ1bi5wbGFjZVZlcnRpY2FsU2hpcCg0LDIsIGJhdHRsZXNoaXApXG4gICAgLy8gYm9hcmRSdW4ucGxhY2VIb3Jpem9udGFsU2hpcCg2LCA2LCBkZXN0cm95ZXIpO1xuICAgIC8vIGJvYXJkUnVuLnBsYWNlVmVydGljYWxTaGlwKDcsIDgsIHN1Ym1hcmluZSk7XG4gICAgLy8gYm9hcmRSdW4ucGxhY2VIb3Jpem9udGFsU2hpcCgzLCA3LCBwYXRyb2xCb2F0KTtcbiAgICBjb25zb2xlLmxvZyhzaGlwcyk7XG4gICAgcmV0dXJuIHNoaXBzXG59IiwiLyogZXNsaW50LWRpc2FibGUgbm8tdXNlLWJlZm9yZS1kZWZpbmUgKi9cbi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9wcmVmZXItZGVmYXVsdC1leHBvcnQgKi9cblxuLy8gaGF2ZSB0byBhZGQgYnV0dG9ucyB0byBVSSB0byBzd2l0Y2ggYmV0d2VuIGhvcml6b250YWwgYW5kIHZlcnRpY2FsXG4vLyBoYXZlIHRvIG1ha2UgYSBzdGFydCBidXR0b24gdGhhdCB1c2VyIGNhbiBwcmVzcyB3aGVuIGFsbCBcbi8vIHNoaXBzIGFyZSBwbGFjZWRcblxuXG5leHBvcnQgY29uc3QgaHVtYW5TaGlwUGxhY2VtZW50ID0gZnVuY3Rpb24gKGh1bWFuQm9hcmQsIHNoaXBzKSB7XG4gICAgLy8gbWVtb3J5IHN0b3JhZ2UgZm9yIHdoZXJlIGNlbGxzIGNhbid0IGJlIHVzZWQgYWdhaW5cbiAgICBjb25zdCByb3RhdGVCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucm90YXRlLXNoaXAnKTtcbiAgICBjb25zdCBvY2N1cGllZENlbGxzID0gW107XG5cbiAgICAvLyBzZXRzIHBsYW5lXG4gICAgbGV0IGN1cnJlbnRQbGFuZSA9ICdob3Jpem9udGFsJztcbiAgICBjcmVhdGVSb3RhdGlvbkFiaWxpdHkoKTtcblxuICAgIGNvbnN0IGh1bWFuQ2VsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2VsbCcpO1xuICAgIGxldCBzaGlwSW5kZXggPSAwO1xuICAgIFxuXG4gICAgaHVtYW5DZWxscy5mb3JFYWNoKChjZWxsKSA9PiB7XG4gICAgICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgKCkgPT4ge1xuICAgICAgICAgICAgY2VsbEhvdmVyKGNlbGwsIHNoaXBzW3NoaXBJbmRleF0pXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICBpZiAoY2VsbC5jbGFzc0xpc3QuY29udGFpbnMoJ3ZhbGlkLXBsYWNlbWVudCcpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRQbGFuZSA9PT0gJ2hvcml6b250YWwnKSB7XG4gICAgICAgICAgICAgICAgICAgIHBsYWNlSG9yaXpvbnRhbGx5KGNlbGwuY29vcmRpbmF0ZXMsIGNlbGwuYWN0aXZlQ2VsbHMsIHNoaXBzW3NoaXBJbmRleF0pO1xuICAgICAgICAgICAgICAgICAgICBzaGlwSW5kZXggKz0gMTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNoaXBJbmRleCA9PT0gNSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29tcHV0ZXJQbGFjZW1lbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhzaGlwSW5kZXgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY3VycmVudFBsYW5lID09PSAndmVydGljYWwnKSB7XG4gICAgICAgICAgICAgICAgICAgIHBsYWNlVmVydGljYWxseShjZWxsLmNvb3JkaW5hdGVzLCBjZWxsLmFjdGl2ZUNlbGxzLCBzaGlwc1tzaGlwSW5kZXhdKTtcbiAgICAgICAgICAgICAgICAgICAgc2hpcEluZGV4ICs9IDE7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzaGlwSW5kZXggPT09IDUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbXB1dGVyUGxhY2VtZW50KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coc2hpcEluZGV4KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gc2hpcEluZGV4XG4gICAgICAgIH0pXG4gICAgfSlcblxuICAgIFxuICAgIGZ1bmN0aW9uIGNlbGxIb3ZlcihjZWxsLCBzaGlwKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKHNoaXApO1xuICAgICAgICBjb25zdCBjZWxsQ29vcmRzID0gY2VsbC5jb29yZGluYXRlcztcbiAgICAgICAgY2VsbC5hY3RpdmVDZWxscyA9IFtdO1xuICAgICAgICBjb25zdCBncm91cGVkQ2VsbHMgPSBjZWxsLmFjdGl2ZUNlbGxzO1xuICAgICAgICAvLyBoYXZlIHRvIGNoZWNrIGlmIGl0cyBob3Jpem9udGFsIG9yIHZlcnRpY2FsXG4gICAgICAgIC8vIHRoZW4gY2hlY2sgaWYgc3RhcnRpbmcgcG9pbnQgKyBzaGlwIGxlbmd0aCBpcyB2YWxpZFxuICAgICAgICBpZiAoc2hpcEluZGV4ID09PSA1KSB7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjdXJyZW50UGxhbmUgPT09ICdob3Jpem9udGFsJykge1xuICAgICAgICAgICAgY29uc3QgY2VsbFJvdyA9IGNlbGxDb29yZHNbMF1cbiAgICAgICAgICAgIGxldCBjZWxsQ29sdW1uID0gY2VsbENvb3Jkc1sxXTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgYWN0aXZlQ2VsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGAke2NlbGxSb3d9ICR7Y2VsbENvbHVtbn1oYClcbiAgICAgICAgICAgICAgICBncm91cGVkQ2VsbHMucHVzaChhY3RpdmVDZWxsKTtcbiAgICAgICAgICAgICAgICBjZWxsQ29sdW1uICs9IDFcbiAgICAgICAgICAgICAgICBpZiAoY2VsbENvbHVtbiA+IDEwKSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgY29uZmxpY3RpbmcgPSBjaGVja0NvbmZsaWN0aW5nU2hpcHMoZ3JvdXBlZENlbGxzKTtcblxuICAgICAgICAgICAgaWYgKChjZWxsQ29vcmRzWzFdICsgc2hpcC5sZW5ndGgpIC0gMSA8PSAxMCAmJiBjb25mbGljdGluZyA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygndGhpcyBpcyB2YWxpZCEnKVxuICAgICAgICAgICAgICAgIGdyb3VwZWRDZWxscy5mb3JFYWNoKChlbGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgZWxlbS5jbGFzc0xpc3QuYWRkKCd2YWxpZC1wbGFjZW1lbnQnKTsgXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoKGNlbGxDb29yZHNbMV0gKyBzaGlwLmxlbmd0aCkgLSAxID4gMTAgfHwgY29uZmxpY3RpbmcgPT09IHRydWUpe1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdub3QgdmFsaWQnKTtcbiAgICAgICAgICAgICAgICBncm91cGVkQ2VsbHMuZm9yRWFjaCgoZWxlbSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBlbGVtLmNsYXNzTGlzdC5hZGQoJ2ludmFsaWQtcGxhY2VtZW50Jyk7IFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdXQnLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgZ3JvdXBlZENlbGxzLmZvckVhY2goKGVsZW0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZWxlbS5jbGFzc0xpc3QucmVtb3ZlKCd2YWxpZC1wbGFjZW1lbnQnLCAnaW52YWxpZC1wbGFjZW1lbnQnKVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KVxuXG5cbiAgICAgICAgfSBlbHNlIGlmIChjdXJyZW50UGxhbmUgPT09ICd2ZXJ0aWNhbCcpIHtcbiAgICAgICAgICAgIGxldCBjZWxsUm93ID0gY2VsbENvb3Jkc1swXVxuICAgICAgICAgICAgY29uc3QgY2VsbENvbHVtbiA9IGNlbGxDb29yZHNbMV07XG5cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGFjdGl2ZUNlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHtjZWxsUm93fSAke2NlbGxDb2x1bW59aGApXG4gICAgICAgICAgICAgICAgZ3JvdXBlZENlbGxzLnB1c2goYWN0aXZlQ2VsbCk7XG4gICAgICAgICAgICAgICAgY2VsbFJvdyArPSAxXG4gICAgICAgICAgICAgICAgaWYgKGNlbGxSb3cgPiAxMCkge1xuICAgICAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGNvbmZsaWN0aW5nID0gY2hlY2tDb25mbGljdGluZ1NoaXBzKGdyb3VwZWRDZWxscyk7XG5cblxuICAgICAgICAgICAgaWYgKChjZWxsQ29vcmRzWzBdICsgc2hpcC5sZW5ndGgpIC0gMSA8PSAxMCAmJiBjb25mbGljdGluZyA9PT0gZmFsc2UgKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3RoaXMgaXMgdmFsaWQhJylcbiAgICAgICAgICAgICAgICBncm91cGVkQ2VsbHMuZm9yRWFjaCgoZWxlbSkgPT4ge1xuICAgICAgICAgICAgICAgICAgIGVsZW0uY2xhc3NMaXN0LmFkZCgndmFsaWQtcGxhY2VtZW50Jyk7IFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9IGVsc2UgaWYgKChjZWxsQ29vcmRzWzBdICsgc2hpcC5sZW5ndGgpIC0gMSA+IDEwIHx8IGNvbmZsaWN0aW5nID09PSB0cnVlKXtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnbm90IHZhbGlkJyk7XG4gICAgICAgICAgICAgICAgZ3JvdXBlZENlbGxzLmZvckVhY2goKGVsZW0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZWxlbS5jbGFzc0xpc3QuYWRkKCdpbnZhbGlkLXBsYWNlbWVudCcpOyBcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0JywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGdyb3VwZWRDZWxscy5mb3JFYWNoKChlbGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGVsZW0uY2xhc3NMaXN0LnJlbW92ZSgndmFsaWQtcGxhY2VtZW50JywgJ2ludmFsaWQtcGxhY2VtZW50JylcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBsYWNlSG9yaXpvbnRhbGx5KGNlbGxDb29yZHMsIGFjdGl2ZUNlbGxzLCBzaGlwKSB7XG4gICAgICAgIGFjdGl2ZUNlbGxzLmZvckVhY2goKGVsZW0pID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVsZW0uY29vcmRpbmF0ZXMpO1xuICAgICAgICAgICAgb2NjdXBpZWRDZWxscy5wdXNoKGVsZW0uY29vcmRpbmF0ZXMpO1xuICAgICAgICAgICAgZWxlbS5jbGFzc0xpc3QuYWRkKCdwbGFjZWQnKVxuICAgICAgICB9KTtcbiAgICAgICAgLy8gbWF5YmUgcHV0IHRyaWdnZXIgaW4gaGVyZSB0byBjaGVjayBpZiBhbGwgc2hpcHMgYXJlIHBsYWNlZFxuICAgICAgICAvLyBpZiB0cnVlLCBkaXNiYWxlIHBvaW50ZXIgZXZlbnRzIGFuZCBydW4gZnVuY3Rpb24gZm9yXG4gICAgICAgIC8vIHBsYWNpbmcgY29tcHV0ZXIgc2hpcHNcbiAgICAgICAgaHVtYW5Cb2FyZC5wbGFjZUhvcml6b250YWxTaGlwKGNlbGxDb29yZHNbMF0sIGNlbGxDb29yZHNbMV0sIHNoaXApO1xuICAgICAgICBjb25zb2xlLmxvZyhvY2N1cGllZENlbGxzKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBsYWNlVmVydGljYWxseShjZWxsQ29vcmRzLCBhY3RpdmVDZWxscywgc2hpcCkge1xuICAgICAgICBhY3RpdmVDZWxscy5mb3JFYWNoKChlbGVtKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlbGVtLmNvb3JkaW5hdGVzKTtcbiAgICAgICAgICAgIG9jY3VwaWVkQ2VsbHMucHVzaChlbGVtLmNvb3JkaW5hdGVzKTtcbiAgICAgICAgICAgIGVsZW0uY2xhc3NMaXN0LmFkZCgncGxhY2VkJylcbiAgICAgICAgfSk7XG4gICAgICAgIGh1bWFuQm9hcmQucGxhY2VWZXJ0aWNhbFNoaXAoY2VsbENvb3Jkc1swXSwgY2VsbENvb3Jkc1sxXSwgc2hpcCk7XG4gICAgICAgIGNvbnNvbGUubG9nKG9jY3VwaWVkQ2VsbHMpXG4gICAgfVxuXG5cbiAgICBcblxuICAgIGZ1bmN0aW9uIGNoZWNrQ29uZmxpY3RpbmdTaGlwcyhhY3RpdmVDZWxscykge1xuICAgICAgICBsZXQgYWxyZWFkeVVzZWQgPSBmYWxzZVxuICAgICAgICBhY3RpdmVDZWxscy5mb3JFYWNoKChlbGVtKSA9PiB7XG4gICAgICAgICAgICBpZiAoY2hlY2tGb3JSZXBlYXQoZWxlbS5jb29yZGluYXRlcywgb2NjdXBpZWRDZWxscykgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBhbHJlYWR5VXNlZCA9IHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuIGFscmVhZHlVc2VkXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlUm90YXRpb25BYmlsaXR5KCkge1xuICAgICAgICByb3RhdGVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBuZXdQbGFuZSA9IHN3aXRjaFBsYW5lKGN1cnJlbnRQbGFuZSk7XG4gICAgICAgICAgICBjdXJyZW50UGxhbmUgPSBuZXdQbGFuZVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIHJldHVybiB7IGNlbGxIb3ZlciwgcGxhY2VIb3Jpem9udGFsbHksIGNoZWNrQ29uZmxpY3RpbmdTaGlwcyB9XG59XG5cblxuXG5cbmV4cG9ydCBjb25zdCBjb21wdXRlclBsYWNlbWVudCA9IGZ1bmN0aW9uIChjb21wdXRlckJvYXJkLCBzaGlwcykge1xuICAgIGNvbnN0IHBsYW5lcyA9IFsnaG9yaXpvbnRhbCcsICd2ZXJ0aWNhbCddXG4gICAgY29uc3QgdXNlZENlbGxzID0gW107XG4gICAgY29uc29sZS5sb2coc2hpcHMpO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjcmVhdGVTaGlwQ29vcmRzKHNoaXBzW2ldKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVTaGlwQ29vcmRzKHNoaXApIHtcblxuICAgICAgICAvLyBsZXQgY2hvc2VuUGxhbmUgPSBjaG9vc2VQbGFuZShwbGFuZXMpO1xuICAgICAgICAvLyB1c2luZyB0byB0ZXN0OlxuICAgICAgICBjb25zdCBjaG9zZW5QbGFuZSA9ICd2ZXJ0aWNhbCdcbiAgICAgICAgY29uc29sZS5sb2coY2hvc2VuUGxhbmUpXG4gICAgICAgIGlmIChjaG9zZW5QbGFuZSA9PT0gJ2hvcml6b250YWwnKSB7XG4gICAgICAgICAgICB0ZXN0SG9yaXpvbnRhbFNoaXAoc2hpcClcbiAgICAgICAgfSBlbHNlIGlmIChjaG9zZW5QbGFuZSA9PT0gJ3ZlcnRpY2FsJykge1xuICAgICAgICAgICAgdGVzdFZlcnRpY2FsU2hpcChzaGlwKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRlc3RIb3Jpem9udGFsU2hpcChzaGlwKSB7XG4gICAgICAgIGNvbnN0IHN0YXJ0aW5nQ29vcmRzID0gY3JlYXRlSG9yaXpvbnRhbFN0YXJ0KHNoaXApXG4gICAgICAgIGNvbnNvbGUubG9nKHN0YXJ0aW5nQ29vcmRzKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgICAgfVxuICAgICAgICAvLyBjcmVhdGUgc2hpcCBjb29yZHNcbiAgICAgICAgLy8gcHVzaCB0byB1c2VkQ2VsbHNcbiAgICAgICAgLy8gY2hlY2sgaWYgaW4gdXNlZENlbGxzXG4gICAgICAgIC8vIGlmIGZhbHNlLCBydW4gcGxhY2VTaGlwIGZ1bmN0aW9uc1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRlc3RWZXJ0aWNhbFNoaXAoc2hpcCkge1xuICAgICAgICBjb25zdCBzdGFydGluZ0Nvb3JkcyA9IGNyZWF0ZVZlcnRpY2FsU3RhcnQoc2hpcClcbiAgICAgICAgY29uc29sZS5sb2coc3RhcnRpbmdDb29yZHMpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAubGVuZ3RoOyBpKyspIHtcblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2hvb3NlUGxhbmUocGxhbmVzKSB7XG4gICAgICAgIGNvbnN0IGNob3NlbkluZGV4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogcGxhbmVzLmxlbmd0aCk7XG4gICAgICAgIGNvbnNvbGUubG9nKHBsYW5lc1tjaG9zZW5JbmRleF0pO1xuICAgICAgICByZXR1cm4gcGxhbmVzW2Nob3NlbkluZGV4XVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZUhvcml6b250YWxTdGFydChzaGlwKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKHNoaXAubmFtZSk7XG4gICAgICAgIGNvbnN0IHJvdyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKSArIDFcbiAgICAgICAgY29uc3QgY29sdW1uID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKDEwIC0gc2hpcC5sZW5ndGgpKSArIDFcbiAgICAgICAgY29uc3Qgc3RhcnRpbmdDb29yZCA9IFtyb3csIGNvbHVtbl07XG4gICAgICAgIHJldHVybiBzdGFydGluZ0Nvb3JkXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlVmVydGljYWxTdGFydChzaGlwKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKHNoaXAubmFtZSk7XG4gICAgICAgIGNvbnN0IHJvdyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICgxMCAtIHNoaXAubGVuZ3RoKSkgKyAxXG4gICAgICAgIGNvbnN0IGNvbHVtbiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKSArIDFcbiAgICAgICAgY29uc3Qgc3RhcnRpbmdDb29yZCA9IFtyb3csIGNvbHVtbl07XG4gICAgICAgIHJldHVybiBzdGFydGluZ0Nvb3JkXG4gICAgfVxuXG4gICAgcmV0dXJuIHtjcmVhdGVTaGlwQ29vcmRzLCB0ZXN0SG9yaXpvbnRhbFNoaXAsIHRlc3RWZXJ0aWNhbFNoaXAsXG4gICAgICAgIGNob29zZVBsYW5lLCBjcmVhdGVIb3Jpem9udGFsU3RhcnQsIGNyZWF0ZVZlcnRpY2FsU3RhcnR9XG59XG5cblxuZnVuY3Rpb24gY2hlY2tGb3JSZXBlYXQoY29vcmRzLCBhcnJheSkge1xuICAgIGNvbnN0IHN0cmluZ2VkQ29vcmRzID0gSlNPTi5zdHJpbmdpZnkoY29vcmRzKTtcbiAgICBjb25zdCBleGlzdHNCb29sZWFuID0gYXJyYXkuc29tZSgoY29vcmQpID0+IEpTT04uc3RyaW5naWZ5KGNvb3JkKSA9PT0gc3RyaW5nZWRDb29yZHMpXG4gICAgLy8gY29uc29sZS5sb2coZXhpc3RzQm9vbGVhbilcbiAgICByZXR1cm4gZXhpc3RzQm9vbGVhblxufVxuXG5mdW5jdGlvbiBzd2l0Y2hQbGFuZShjdXJyZW50UGxhbmUpIHtcbiAgICBpZiAoY3VycmVudFBsYW5lID09PSAnaG9yaXpvbnRhbCcpIHtcbiAgICAgICAgY3VycmVudFBsYW5lID0gJ3ZlcnRpY2FsJ1xuICAgIH0gZWxzZSBpZiAoY3VycmVudFBsYW5lID09PSAndmVydGljYWwnKSB7XG4gICAgICAgIGN1cnJlbnRQbGFuZSA9ICdob3Jpem9udGFsJ1xuICAgIH1cbiAgICByZXR1cm4gY3VycmVudFBsYW5lXG59OyIsIi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9wcmVmZXItZGVmYXVsdC1leHBvcnQgKi9cbmltcG9ydCB7IGNvbXB1dGVyUGxheWVyIH0gZnJvbSBcIi4vcGxheWVyXCI7XG5pbXBvcnQgeyByZXNldEludGVyZmFjZSB9IGZyb20gXCIuL2dhbWVMb29wXCI7XG5cblxuZXhwb3J0IGNvbnN0IGRvbU1hbmlwdWxhdGlvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICBjb25zdCBjb21wdXRlck1vdmVzID0gY29tcHV0ZXJQbGF5ZXIoKVxuXG4gICAgY29uc3QgcGxheWVyQm9hcmRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdhbWVib2FyZHMnKTtcbiAgICBjb25zdCBkaWFsb2d1ZUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kaWFsb2d1ZS1jb250YWluZXInKVxuXG4gICAgZnVuY3Rpb24gcmVuZGVyU3RhcnQoKSB7XG4gICAgICAgIGNvbnN0IHJvdGF0ZVNoaXBCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgYXBwZW5kRWxlbWVudChyb3RhdGVTaGlwQnV0dG9uLCAncm90YXRlLXNoaXAnLCBwbGF5ZXJCb2FyZHMpXG4gICAgICAgIHJvdGF0ZVNoaXBCdXR0b24udGV4dENvbnRlbnQgPSAnUm90YXRlJztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZW5kZXJHYW1lQm9hcmQoYm9hcmRDb250cm9sbGVyLCBwbGF5ZXJOYW1lLCBodW1hbkJvYXJkKSB7XG4gICAgICAgIGxldCBpc0NvbXB1dGVyID0gZmFsc2U7XG4gICAgICAgIGlmIChwbGF5ZXJOYW1lID09PSAnUGxheWVyIDInKSB7XG4gICAgICAgICAgICBpc0NvbXB1dGVyID0gdHJ1ZVxuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKGlzQ29tcHV0ZXIpO1xuXG4gICAgICAgIGNvbnN0IGdhbWVCb2FyZFdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgYXBwZW5kRWxlbWVudChnYW1lQm9hcmRXcmFwcGVyLCAnYm9hcmQtd3JhcHBlcicsIHBsYXllckJvYXJkcylcbiAgICAgICBcbiAgICAgICAgY29uc3QgYm9hcmRUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gyJyk7XG4gICAgICAgIGFwcGVuZEVsZW1lbnQoYm9hcmRUaXRsZSwgJ2JvYXJkLXRpdGxlJywgZ2FtZUJvYXJkV3JhcHBlcik7XG4gICAgICAgIGJvYXJkVGl0bGUudGV4dENvbnRlbnQgPSBwbGF5ZXJOYW1lO1xuXG4gICAgICAgIC8vIHJlbmRlciBib2FyZDpcbiAgICAgICAgY29uc3QgZ2FtZWJvYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGFwcGVuZEVsZW1lbnQoZ2FtZWJvYXJkLCAnZ2FtZWJvYXJkJywgZ2FtZUJvYXJkV3JhcHBlcik7XG5cbiAgICAgICAgYnVpbGRHcmlkKGdhbWVib2FyZCwgaXNDb21wdXRlcik7XG4gICAgICAgIFxuICAgICAgICBpZiAoaXNDb21wdXRlciA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCd0cmlnZ2VyZWQnKVxuICAgICAgICAgICAgc2V0R3JpZFRyaWdnZXJzKGJvYXJkQ29udHJvbGxlciwgaHVtYW5Cb2FyZCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYnVpbGRHcmlkKGdhbWVib2FyZEVsZW1lbnQsIGlzQ29tcHV0ZXIpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCAxMTsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCByb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGFwcGVuZEVsZW1lbnQocm93LCAncm93JywgZ2FtZWJvYXJkRWxlbWVudCk7XG5cbiAgICAgICAgICAgIGZvciAobGV0IGogPSAxOyBqIDwgMTE7IGorKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgICAgICBjZWxsLmNvb3JkaW5hdGVzID0gW2ksIGpdO1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGNlbGwuY29vcmRpbmF0ZXMpXG4gICAgICAgICAgICAgICAgaWYgKGlzQ29tcHV0ZXIgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgYXBwZW5kRWxlbWVudChjZWxsLCAnY2VsbC1jJywgcm93KTtcbiAgICAgICAgICAgICAgICAgICAgY2VsbC5zZXRBdHRyaWJ1dGUoJ2lkJywgYCR7aX0gJHtqfWNgKVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgYXBwZW5kRWxlbWVudChjZWxsLCAnY2VsbCcsIHJvdyk7XG4gICAgICAgICAgICAgICAgICAgY2VsbC5zZXRBdHRyaWJ1dGUoJ2lkJywgYCR7aX0gJHtqfWhgKSBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldEdyaWRUcmlnZ2Vycyhjb21wdXRlckJvYXJkQ29udHJvbGxlciwgaHVtYW5Cb2FyZENvbnRyb2xsZXIpIHtcbiAgICAgICAgY29uc3QgY2VsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2VsbC1jJyk7XG4gICAgICAgIGNlbGxzLmZvckVhY2goKGNlbGwpID0+IHtcbiAgICAgICAgICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coY2VsbC5jb29yZGluYXRlcyk7XG4gICAgICAgICAgICAgICAgY29tcHV0ZXJCb2FyZENvbnRyb2xsZXIucmVjaWV2ZUF0dGFjayhjZWxsLmNvb3JkaW5hdGVzKTtcblxuICAgICAgICAgICAgICAgIC8vIHRyaWdnZXIgY29tcHV0ZXIncyBhdHRhY2sgaW4gcmVzcG9uc2VcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhodW1hbkJvYXJkQ29udHJvbGxlcik7XG4gICAgICAgICAgICAgICAgY29tcHV0ZXJNb3Zlcy5waWNrUmFuZG9tQ2VsbChodW1hbkJvYXJkQ29udHJvbGxlcik7XG5cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgICAgICAgICBcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1c2VHcmlkU3BvdChjb29yZHMsIHN0YXR1cywgbmFtZSkge1xuICAgICAgICAvLyByZWdpc3RlcnMgdGhhdCB0ZWggZ3JpZCBzcG90IHdhcyB1c2VkLCBhbmQgZGlzcGxheXNcbiAgICAgICAgLy8gZWl0aGVyIGEgaGl0IG9yIG1pc3NcblxuICAgICAgICBpZiAobmFtZSA9PT0gJ1BsYXllciAyJykge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coc3RhdHVzKTtcbiAgICAgICAgICAgIGNvbnN0IHVzZWRDZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXG4gICAgICAgICAgICAgICAgYCR7Y29vcmRzWzBdfSAke2Nvb3Jkc1sxXX1jYClcblxuICAgICAgICAgICAgaWYgKHN0YXR1cyA9PT0gJ2hpdCcpIHtcbiAgICAgICAgICAgICAgICB1c2VkQ2VsbC50ZXh0Q29udGVudCA9ICdYJ1xuICAgICAgICAgICAgfSBlbHNlIGlmIChzdGF0dXMgPT09ICdtaXNzJykge1xuICAgICAgICAgICAgICAgIHVzZWRDZWxsLnRleHRDb250ZW50ID0gJ08nXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHN0YXR1cyk7XG4gICAgICAgICAgICBjb25zdCB1c2VkQ2VsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxuICAgICAgICAgICAgICAgIGAke2Nvb3Jkc1swXX0gJHtjb29yZHNbMV19aGApXG5cbiAgICAgICAgICAgIGlmIChzdGF0dXMgPT09ICdoaXQnKSB7XG4gICAgICAgICAgICAgICAgdXNlZENlbGwudGV4dENvbnRlbnQgPSAnWCdcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc3RhdHVzID09PSAnbWlzcycpIHtcbiAgICAgICAgICAgICAgICB1c2VkQ2VsbC50ZXh0Q29udGVudCA9ICdPJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZnJlZXplR3JpZCgpIHtcbiAgICAgICAgY29uc3QgZ2FtZWJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdhbWVib2FyZCcpO1xuICAgICAgICBnYW1lYm9hcmQuc3R5bGUucG9pbnRlckV2ZW50cyA9ICdub25lJztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZW5kZXJEaWFsb2d1ZUJveCgpIHtcbiAgICAgICAgY29uc3QgZGlhbG9ndWVCb3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgYXBwZW5kRWxlbWVudChkaWFsb2d1ZUJveCwgJ2RpYWxvZ3VlLWJveCcsIGRpYWxvZ3VlQ29udGFpbmVyKVxuXG4gICAgICAgIGNvbnN0IHRleHRCb3gxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgICAgYXBwZW5kRWxlbWVudCh0ZXh0Qm94MSwgJ3RleHQtYm94MScsIGRpYWxvZ3VlQm94KVxuXG4gICAgICAgIGNvbnN0IHRleHRCb3gyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgICAgYXBwZW5kRWxlbWVudCh0ZXh0Qm94MiwgJ3RleHQtYm94MicsIGRpYWxvZ3VlQm94KVxuXG4gICAgICAgIGNvbnN0IHRleHRCb3gzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGFwcGVuZEVsZW1lbnQodGV4dEJveDMsICd0ZXh0LWJveDMnLCBkaWFsb2d1ZUJveClcbiAgICB9XG5cblxuICAgIGZ1bmN0aW9uIHJlbmRlckVuZEdhbWUoKSB7XG4gICAgICAgIGNvbnN0IGJvZHlFbGVtZW50ID0gZG9jdW1lbnQuYm9keVxuXG4gICAgICAgIGNvbnN0IGVuZEdhbWVCb3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgYXBwZW5kRWxlbWVudChlbmRHYW1lQm94LCAnZW5kLWdhbWUtYm94JywgYm9keUVsZW1lbnQpO1xuXG4gICAgICAgIGNvbnN0IGVuZEdhbWVJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGFwcGVuZEVsZW1lbnQoZW5kR2FtZUljb24sICdlbmQtZ2FtZS1pY29uJywgZW5kR2FtZUJveCk7XG5cbiAgICAgICAgY29uc3QgcmVzZXRHYW1lQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgIGFwcGVuZEVsZW1lbnQocmVzZXRHYW1lQnV0dG9uLCAncmVzZXQtZ2FtZS1idXR0b24nLCBlbmRHYW1lQm94KTtcblxuICAgICAgICByZXNldEdhbWVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICByZXNldEludGVyZmFjZShib2R5RWxlbWVudCwgZW5kR2FtZUJveCk7XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYXBwZW5kRWxlbWVudChlbGVtZW50TmFtZSwgY2xhc3NOYW1lLCBmYXRoZXJFbGVtZW50ICkge1xuICAgICAgICBlbGVtZW50TmFtZS5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XG4gICAgICAgIGZhdGhlckVsZW1lbnQuYXBwZW5kQ2hpbGQoZWxlbWVudE5hbWUpO1xuXG4gICAgICAgIHJldHVybiBlbGVtZW50TmFtZTtcbiAgICB9XG5cbiAgICByZXR1cm4ge3JlbmRlclN0YXJ0LCByZW5kZXJHYW1lQm9hcmQsIGFwcGVuZEVsZW1lbnQsIGJ1aWxkR3JpZCxcbiAgICAgICAgc2V0R3JpZFRyaWdnZXJzLCB1c2VHcmlkU3BvdCwgZnJlZXplR3JpZCwgcmVuZGVyRGlhbG9ndWVCb3gsXG4gICAgICAgIHJlbmRlckVuZEdhbWV9XG5cbn1cblxuXG5cblxuZXhwb3J0IGNvbnN0IGRpYWxvZ3VlQ29udHJvbGxlciA9IGZ1bmN0aW9uKCkge1xuXG4gICAgLy8gZnVuY3Rpb24gIHBsYWNlU2hpcHNNZXNzYWdlKCkge1xuXG4gICAgLy8gfVxuXG4gICAgZnVuY3Rpb24gbW92ZVJlc3VsdChzdGF0dXMsIHBsYXllck5hbWUsIGNvb3Jkcywgc2hpcCA9IG51bGwpIHtcbiAgICAgICAgLy8gbmVlZCBhdHRhY2tTdGF0dXMsIHNoaXAgbmFtZSwgY29vcmRpbmF0ZXNcbiAgICAgICAgY29uc3QgdGV4dEJveDEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGV4dC1ib3gxJyk7XG4gICAgICAgIGNvbnN0IHRleHRCb3gyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRleHQtYm94MicpO1xuICAgICAgICBjb25zb2xlLmxvZygnZGlhbG9ndWUgcmVjb3JkZWQnKVxuICAgICAgICBpZiAocGxheWVyTmFtZSAhPT0gJ1BsYXllciAyJykge1xuICAgICAgICAgICAgaWYgKHN0YXR1cyA9PT0gJ2hpdCcpIHtcbiAgICAgICAgICAgICAgICB0ZXh0Qm94Mi50ZXh0Q29udGVudCA9IGBUaGUgZW5lbXkgaGFzIGhpdCB5b3VyICR7c2hpcC5uYW1lfVxuICAgICAgICAgICAgICAgIGF0IHJvdzogJHtjb29yZHNbMF19IGNvbHVtbjogJHtjb29yZHNbMV19IWBcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc3RhdHVzID09PSAnbWlzcycpIHtcbiAgICAgICAgICAgICAgICB0ZXh0Qm94Mi50ZXh0Q29udGVudCA9IGBUaGUgZW5lbXkgYXR0YWNrZWQgcm93OlxuICAgICAgICAgICAgICAgICR7Y29vcmRzWzBdfSBjb2x1bW46ICR7Y29vcmRzWzFdfSBhbmQgbWlzc2VkIWBcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9IGVsc2UgaWYgKHBsYXllck5hbWUgPT09ICdQbGF5ZXIgMicpIHtcbiAgICAgICAgICAgIGlmIChzdGF0dXMgPT09ICdoaXQnKSB7XG4gICAgICAgICAgICAgICAgdGV4dEJveDEudGV4dENvbnRlbnQgPSBgWW91IGhpdCB0aGUgZW5lbXkncyAke3NoaXAubmFtZX1cbiAgICAgICAgICAgICAgICBhdCByb3c6ICR7Y29vcmRzWzBdfSBjb2x1bW46ICR7Y29vcmRzWzFdfSFgXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHN0YXR1cyA9PT0gJ21pc3MnKSB7XG4gICAgICAgICAgICAgICAgdGV4dEJveDEudGV4dENvbnRlbnQgPSBgWW91IGF0dGFja2VkIHJvdzpcbiAgICAgICAgICAgICAgICAke2Nvb3Jkc1swXX0gY29sdW1uOiAke2Nvb3Jkc1sxXX0gYW5kIG1pc3NlZCFgXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzdW5rU2hpcE1lc3NhZ2Uoc2hpcCwgbmFtZSkge1xuICAgICAgICBjb25zdCB0ZXh0Qm94MSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50ZXh0LWJveDEnKTtcbiAgICAgICAgY29uc3QgdGV4dEJveDIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGV4dC1ib3gyJyk7XG4gICAgICAgIGNvbnNvbGUubG9nKHNoaXAsIG5hbWUpXG4gICAgICAgIGlmIChuYW1lICE9PSAnUGxheWVyIDInKSB7XG4gICAgICAgICAgICB0ZXh0Qm94Mi50ZXh0Q29udGVudCA9IGBZb3VyICR7c2hpcC5uYW1lfSBoYXMgYmVlbiBzdW5rISFgXG4gICAgICAgIH0gZWxzZSBpZiAobmFtZSA9PT0gJ1BsYXllciAyJykge1xuICAgICAgICAgICAgdGV4dEJveDEudGV4dENvbnRlbnQgPSBgWW91IHN1bmsgdGhlIGVuZW15J3MgJHtzaGlwLm5hbWV9ISFgXG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGVuZEdhbWVNZXNzYWdlKG5hbWUpIHtcbiAgICAgICAgY29uc3QgdGV4dEJveDMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGV4dC1ib3gzJylcbiAgICAgICAgLy8gbWF5YmUgcHV0IHRyaWdnZXIgaGVyZSB0byBtYWtlIGEgJ3Jlc3RhcnQgZ2FtZSdcbiAgICAgICAgLy8gYnV0dG9uIHRvIHBvcCB1cFxuICAgICAgICBpZiAobmFtZSA9PT0gJ1BsYXllciAyJykge1xuICAgICAgICAgICAgdGV4dEJveDMudGV4dENvbnRlbnQgPSAnVGhlIGVuZW15IGZsZWV0IGhhcyBiZWVuIHNhbmsuIEV4Y2VsbGVudCB3b3JrIFNvbGRpZXIhJ1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGV4dEJveDMudGV4dENvbnRlbnQgPSAnV2UgaGF2ZSBsb3N0IG91ciBmbGVldCBhbmQgYmVlbiBkZWZlYXRlZC4gQWJvcnQgdGhlIG1pc3Npb24hJ1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICByZXR1cm4ge21vdmVSZXN1bHQsIHN1bmtTaGlwTWVzc2FnZSwgZW5kR2FtZU1lc3NhZ2V9XG59IiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgYGh0bWwsIGJvZHkge1xuICAgIG1pbi1oZWlnaHQ6IDEwMCU7XG4gICAgbWluLXdpZHRoOiAxMDAlO1xuICAgIG1hcmdpbjogMHB4O1xufVxuXG5ib2R5IHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBuYXZ5O1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1cblxuLnByb21wdC1ib3gge1xuICAgIGRpc3BsYXk6IG5vbmVcbn1cblxuLmdhbWUtY29udGFpbmVyIHtcbiAgICBkaXNwbGF5OiBncmlkO1xuICAgIGdyaWQtdGVtcGxhdGUtcm93czogMWZyIDRmciAxLjdmcjtcbiAgICBoZWlnaHQ6IDEwMHZoO1xuICAgIHdpZHRoOiAxMDB2dztcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoNTksIDU5LCA1OSk7XG59XG5cbi5oZWFkZXIge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZ3JpZC1yb3c6IDEgLyAyO1xufVxuXG4uZ2FtZWJvYXJkcyB7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XG4gICAgZ3JpZC1yb3c6IDIgLyAzO1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYigxMTQsIDE1NSwgMTU1KTtcbn1cblxuLmRpYWxvZ3VlLWNvbnRhaW5lciB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIGdyaWQtcm93OiAzIC8gNDtcbn1cblxuLmRpYWxvZ3VlLWJveCB7XG4gICAgaGVpZ2h0OiAyMHZoO1xuICAgIHdpZHRoOiA1MHZ3O1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYig3NywgMTM0LCA3Nyk7XG59XG5cblxuLyogZ2FtZWJvYXJkIHdyYXBwZXIgc3R5bGluZyAqL1xuLmJvYXJkLXdyYXBwZXIge1xuICAgIGhlaWdodDogMTAwJTtcbiAgICB3aWR0aDogNDAwcHg7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogYmlzcXVlO1xuICAgIHBhZGRpbmc6IDAgMTVweDtcbn1cblxuLmJvYXJkLXRpdGxlIHtcblxufVxuXG4uZ2FtZWJvYXJkIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgaGVpZ2h0OiA0MDBweDtcbiAgICB3aWR0aDogNDAwcHg7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogYmx1ZXZpb2xldDtcbn1cblxuLnJvdyB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICAvKiBmbGV4LWRpcmVjdGlvbjogY29sdW1uOyAqL1xuICAgIGhlaWdodDogMTAlO1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGJhY2tncm91bmQtY29sb3I6IHBpbms7XG59XG5cbi5jZWxsIHtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBtYXJnaW46IDBweDtcbiAgICBhc3BlY3QtcmF0aW86IDE7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDIyMSwgMjQxLCAyNDEpO1xuICAgIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xufVxuXG4uY2VsbC1jIHtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBtYXJnaW46IDBweDtcbiAgICBhc3BlY3QtcmF0aW86IDE7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDIyMSwgMjQxLCAyNDEpO1xuICAgIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xufVxuXG4uY2VsbDpob3ZlciwgLmNlbGwtYzpob3ZlciB7XG4gICAgLyogYmFja2dyb3VuZC1jb2xvcjogYW50aXF1ZXdoaXRlOyAqL1xufVxuXG5cbi8qIHN0eWxpbmcgZm9yIGRpYWxvZ3VlIGJveCAqL1xuLmRpYWxvZ3VlLWNvbnRhaW5lciB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIGdyaWQtcm93OiAzIC8gNDtcbn1cblxuLmRpYWxvZ3VlLWJveCB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtZXZlbmx5O1xuICAgIGhlaWdodDogMjB2aDtcbiAgICB3aWR0aDogNDV2dztcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoNzcsIDEzNCwgNzcpO1xufVxuXG4udGV4dC1ib3gxIHtcbiAgICBoZWlnaHQ6IDR2aDtcbiAgICB3aWR0aDogNDB2dztcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBsaWdodGJsdWU7XG59XG5cbi50ZXh0LWJveDIge1xuICAgIGhlaWdodDogNHZoO1xuICAgIHdpZHRoOiA0MHZ3O1xuICAgIGJhY2tncm91bmQtY29sb3I6IGxpZ2h0Ymx1ZTtcbn1cblxuLnRleHQtYm94MyB7XG4gICAgaGVpZ2h0OiA0dmg7XG4gICAgd2lkdGg6IDQwdnc7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogbGlnaHRibHVlO1xufVxuXG5cbi8qIHN0eWxpbmcgZm9yIHJlc2V0IGdhbWUgKi9cbi5lbmQtZ2FtZS1ib3gge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgdG9wOiAyNDVweDtcbiAgICBsZWZ0OiAwO1xuICAgIHJpZ2h0OiAwO1xuICAgIG1hcmdpbi1sZWZ0OiBhdXRvO1xuICAgIG1hcmdpbi1yaWdodDogYXV0bztcbiAgICB3aWR0aDogMjIwcHg7XG4gICAgaGVpZ2h0OiAyMjBweDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBhenVyZTtcbn1cblxuLnJlc2V0LWdhbWUtYnV0dG9uIHtcbiAgICBoZWlnaHQ6IDUwcHg7XG4gICAgd2lkdGg6IDUwcHg7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDE0NCwgNTgsIDU4KTtcbn1cblxuXG4vKiBzdHlsaW5nIGZvciBzaGlwIFBsYWNlbWVudCAqL1xuXG4udmFsaWQtcGxhY2VtZW50IHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTEwLCAxODksIDExMCk7XG59XG5cbi5pbnZhbGlkLXBsYWNlbWVudCB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDI0OSwgMTE2LCAxMTYpO1xufVxuXG4ucGxhY2VkIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoNzYsIDc2LCAxMTApO1xufVxuXG4ucm90YXRlLXNoaXAge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB0b3A6IDMwMHB4O1xuICAgIHJpZ2h0OiA0MCU7XG4gICAgaGVpZ2h0OiAyNXB4O1xuICAgIHdpZHRoOiA2MHB4O1xuICAgIGJvcmRlcjogMnB4IHNvbGlkIG9yYW5nZTtcbn1gLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9wYWdlU3R5bGluZy5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7SUFDSSxnQkFBZ0I7SUFDaEIsZUFBZTtJQUNmLFdBQVc7QUFDZjs7QUFFQTtJQUNJLHNCQUFzQjtJQUN0QixrQkFBa0I7QUFDdEI7O0FBRUE7SUFDSTtBQUNKOztBQUVBO0lBQ0ksYUFBYTtJQUNiLGlDQUFpQztJQUNqQyxhQUFhO0lBQ2IsWUFBWTtJQUNaLGlDQUFpQztBQUNyQzs7QUFFQTtJQUNJLGFBQWE7SUFDYixlQUFlO0FBQ25COztBQUVBO0lBQ0ksa0JBQWtCO0lBQ2xCLGFBQWE7SUFDYiw2QkFBNkI7SUFDN0IsZUFBZTtJQUNmLG9DQUFvQztBQUN4Qzs7QUFFQTtJQUNJLGFBQWE7SUFDYix1QkFBdUI7SUFDdkIsbUJBQW1CO0lBQ25CLGVBQWU7QUFDbkI7O0FBRUE7SUFDSSxZQUFZO0lBQ1osV0FBVztJQUNYLGtDQUFrQztBQUN0Qzs7O0FBR0EsOEJBQThCO0FBQzlCO0lBQ0ksWUFBWTtJQUNaLFlBQVk7SUFDWix3QkFBd0I7SUFDeEIsZUFBZTtBQUNuQjs7QUFFQTs7QUFFQTs7QUFFQTtJQUNJLGFBQWE7SUFDYixzQkFBc0I7SUFDdEIsYUFBYTtJQUNiLFlBQVk7SUFDWiw0QkFBNEI7QUFDaEM7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsNEJBQTRCO0lBQzVCLFdBQVc7SUFDWCxXQUFXO0lBQ1gsc0JBQXNCO0FBQzFCOztBQUVBO0lBQ0ksV0FBVztJQUNYLFdBQVc7SUFDWCxlQUFlO0lBQ2Ysb0NBQW9DO0lBQ3BDLHVCQUF1QjtBQUMzQjs7QUFFQTtJQUNJLFdBQVc7SUFDWCxXQUFXO0lBQ1gsZUFBZTtJQUNmLG9DQUFvQztJQUNwQyx1QkFBdUI7QUFDM0I7O0FBRUE7SUFDSSxvQ0FBb0M7QUFDeEM7OztBQUdBLDZCQUE2QjtBQUM3QjtJQUNJLGFBQWE7SUFDYix1QkFBdUI7SUFDdkIsbUJBQW1CO0lBQ25CLGVBQWU7QUFDbkI7O0FBRUE7SUFDSSxhQUFhO0lBQ2Isc0JBQXNCO0lBQ3RCLDZCQUE2QjtJQUM3QixZQUFZO0lBQ1osV0FBVztJQUNYLGtDQUFrQztBQUN0Qzs7QUFFQTtJQUNJLFdBQVc7SUFDWCxXQUFXO0lBQ1gsMkJBQTJCO0FBQy9COztBQUVBO0lBQ0ksV0FBVztJQUNYLFdBQVc7SUFDWCwyQkFBMkI7QUFDL0I7O0FBRUE7SUFDSSxXQUFXO0lBQ1gsV0FBVztJQUNYLDJCQUEyQjtBQUMvQjs7O0FBR0EsMkJBQTJCO0FBQzNCO0lBQ0ksa0JBQWtCO0lBQ2xCLGFBQWE7SUFDYix1QkFBdUI7SUFDdkIsbUJBQW1CO0lBQ25CLFVBQVU7SUFDVixPQUFPO0lBQ1AsUUFBUTtJQUNSLGlCQUFpQjtJQUNqQixrQkFBa0I7SUFDbEIsWUFBWTtJQUNaLGFBQWE7SUFDYix1QkFBdUI7QUFDM0I7O0FBRUE7SUFDSSxZQUFZO0lBQ1osV0FBVztJQUNYLGtDQUFrQztBQUN0Qzs7O0FBR0EsK0JBQStCOztBQUUvQjtJQUNJLG9DQUFvQztBQUN4Qzs7QUFFQTtJQUNJLG9DQUFvQztBQUN4Qzs7QUFFQTtJQUNJLGtDQUFrQztBQUN0Qzs7QUFFQTtJQUNJLGtCQUFrQjtJQUNsQixVQUFVO0lBQ1YsVUFBVTtJQUNWLFlBQVk7SUFDWixXQUFXO0lBQ1gsd0JBQXdCO0FBQzVCXCIsXCJzb3VyY2VzQ29udGVudFwiOltcImh0bWwsIGJvZHkge1xcbiAgICBtaW4taGVpZ2h0OiAxMDAlO1xcbiAgICBtaW4td2lkdGg6IDEwMCU7XFxuICAgIG1hcmdpbjogMHB4O1xcbn1cXG5cXG5ib2R5IHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogbmF2eTtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbn1cXG5cXG4ucHJvbXB0LWJveCB7XFxuICAgIGRpc3BsYXk6IG5vbmVcXG59XFxuXFxuLmdhbWUtY29udGFpbmVyIHtcXG4gICAgZGlzcGxheTogZ3JpZDtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiAxZnIgNGZyIDEuN2ZyO1xcbiAgICBoZWlnaHQ6IDEwMHZoO1xcbiAgICB3aWR0aDogMTAwdnc7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYig1OSwgNTksIDU5KTtcXG59XFxuXFxuLmhlYWRlciB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGdyaWQtcm93OiAxIC8gMjtcXG59XFxuXFxuLmdhbWVib2FyZHMge1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xcbiAgICBncmlkLXJvdzogMiAvIDM7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYigxMTQsIDE1NSwgMTU1KTtcXG59XFxuXFxuLmRpYWxvZ3VlLWNvbnRhaW5lciB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBncmlkLXJvdzogMyAvIDQ7XFxufVxcblxcbi5kaWFsb2d1ZS1ib3gge1xcbiAgICBoZWlnaHQ6IDIwdmg7XFxuICAgIHdpZHRoOiA1MHZ3O1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoNzcsIDEzNCwgNzcpO1xcbn1cXG5cXG5cXG4vKiBnYW1lYm9hcmQgd3JhcHBlciBzdHlsaW5nICovXFxuLmJvYXJkLXdyYXBwZXIge1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxuICAgIHdpZHRoOiA0MDBweDtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogYmlzcXVlO1xcbiAgICBwYWRkaW5nOiAwIDE1cHg7XFxufVxcblxcbi5ib2FyZC10aXRsZSB7XFxuXFxufVxcblxcbi5nYW1lYm9hcmQge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBoZWlnaHQ6IDQwMHB4O1xcbiAgICB3aWR0aDogNDAwcHg7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IGJsdWV2aW9sZXQ7XFxufVxcblxcbi5yb3cge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICAvKiBmbGV4LWRpcmVjdGlvbjogY29sdW1uOyAqL1xcbiAgICBoZWlnaHQ6IDEwJTtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHBpbms7XFxufVxcblxcbi5jZWxsIHtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIG1hcmdpbjogMHB4O1xcbiAgICBhc3BlY3QtcmF0aW86IDE7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYigyMjEsIDI0MSwgMjQxKTtcXG4gICAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XFxufVxcblxcbi5jZWxsLWMge1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgbWFyZ2luOiAwcHg7XFxuICAgIGFzcGVjdC1yYXRpbzogMTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDIyMSwgMjQxLCAyNDEpO1xcbiAgICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcXG59XFxuXFxuLmNlbGw6aG92ZXIsIC5jZWxsLWM6aG92ZXIge1xcbiAgICAvKiBiYWNrZ3JvdW5kLWNvbG9yOiBhbnRpcXVld2hpdGU7ICovXFxufVxcblxcblxcbi8qIHN0eWxpbmcgZm9yIGRpYWxvZ3VlIGJveCAqL1xcbi5kaWFsb2d1ZS1jb250YWluZXIge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgZ3JpZC1yb3c6IDMgLyA0O1xcbn1cXG5cXG4uZGlhbG9ndWUtYm94IHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1ldmVubHk7XFxuICAgIGhlaWdodDogMjB2aDtcXG4gICAgd2lkdGg6IDQ1dnc7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYig3NywgMTM0LCA3Nyk7XFxufVxcblxcbi50ZXh0LWJveDEge1xcbiAgICBoZWlnaHQ6IDR2aDtcXG4gICAgd2lkdGg6IDQwdnc7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IGxpZ2h0Ymx1ZTtcXG59XFxuXFxuLnRleHQtYm94MiB7XFxuICAgIGhlaWdodDogNHZoO1xcbiAgICB3aWR0aDogNDB2dztcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogbGlnaHRibHVlO1xcbn1cXG5cXG4udGV4dC1ib3gzIHtcXG4gICAgaGVpZ2h0OiA0dmg7XFxuICAgIHdpZHRoOiA0MHZ3O1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBsaWdodGJsdWU7XFxufVxcblxcblxcbi8qIHN0eWxpbmcgZm9yIHJlc2V0IGdhbWUgKi9cXG4uZW5kLWdhbWUtYm94IHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgdG9wOiAyNDVweDtcXG4gICAgbGVmdDogMDtcXG4gICAgcmlnaHQ6IDA7XFxuICAgIG1hcmdpbi1sZWZ0OiBhdXRvO1xcbiAgICBtYXJnaW4tcmlnaHQ6IGF1dG87XFxuICAgIHdpZHRoOiAyMjBweDtcXG4gICAgaGVpZ2h0OiAyMjBweDtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogYXp1cmU7XFxufVxcblxcbi5yZXNldC1nYW1lLWJ1dHRvbiB7XFxuICAgIGhlaWdodDogNTBweDtcXG4gICAgd2lkdGg6IDUwcHg7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYigxNDQsIDU4LCA1OCk7XFxufVxcblxcblxcbi8qIHN0eWxpbmcgZm9yIHNoaXAgUGxhY2VtZW50ICovXFxuXFxuLnZhbGlkLXBsYWNlbWVudCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYigxMTAsIDE4OSwgMTEwKTtcXG59XFxuXFxuLmludmFsaWQtcGxhY2VtZW50IHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDI0OSwgMTE2LCAxMTYpO1xcbn1cXG5cXG4ucGxhY2VkIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDc2LCA3NiwgMTEwKTtcXG59XFxuXFxuLnJvdGF0ZS1zaGlwIHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB0b3A6IDMwMHB4O1xcbiAgICByaWdodDogNDAlO1xcbiAgICBoZWlnaHQ6IDI1cHg7XFxuICAgIHdpZHRoOiA2MHB4O1xcbiAgICBib3JkZXI6IDJweCBzb2xpZCBvcmFuZ2U7XFxufVwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTtcblxuICAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTtcblxuICAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3BhZ2VTdHlsaW5nLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vcGFnZVN0eWxpbmcuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7XG5cbiAgICAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cbiAgY3NzICs9IG9iai5jc3M7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH1cblxuICAvLyBGb3Igb2xkIElFXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoKSB7fSxcbiAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge31cbiAgICB9O1xuICB9XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5uYyA9IHVuZGVmaW5lZDsiLCJpbXBvcnQgJy4vcGFnZVN0eWxpbmcuY3NzJztcbmltcG9ydCB7IGdhbWVCb2FyZENvbnRyb2xsZXIgfSBmcm9tIFwiLi9nYW1lYm9hcmRDb250cm9sbGVyXCI7XG5pbXBvcnQgeyBpbml0aWFsaXplR2FtZSB9IGZyb20gXCIuL2dhbWVMb29wXCI7XG5cblxuXG5pbml0aWFsaXplR2FtZSgpIl0sIm5hbWVzIjpbIlBsYXllciIsInVzZXJQbGF5ZXIiLCJjb21wdXRlclBsYXllciIsImdhbWVCb2FyZENvbnRyb2xsZXIiLCJjcmVhdGVGbGVldCIsImNyZWF0ZU9wcEZsZWV0IiwiZG9tTWFuaXB1bGF0aW9uIiwiaHVtYW5TaGlwUGxhY2VtZW50IiwiY29tcHV0ZXJQbGFjZW1lbnQiLCJpbml0aWFsaXplR2FtZSIsImNyZWF0ZUdhbWUiLCJydW5ET00iLCJodW1hblBsYXllciIsImh1bWFuRmxlZXQiLCJjb25zb2xlIiwibG9nIiwiZ2FtZUJvYXJkIiwicGxheWVyIiwiaHVtYW5Cb2FyZCIsImNyZWF0ZUJvYXJkIiwiQUlwbGF5ZXIiLCJjb21wdXRlckZsZWV0IiwiY29tcHV0ZXJCb2FyZCIsInJlbmRlclN0YXJ0IiwicmVuZGVyR2FtZUJvYXJkIiwicmVuZGVyRGlhbG9ndWVCb3giLCJjb21wdXRlclBsYWNlbWVudHMiLCJodW1hblBsYWNlbWVudCIsInJlc2V0SW50ZXJmYWNlIiwiYm9keUUiLCJlbmRCb3giLCJwbGF5ZXJCb2FyZHMiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJkaWFsb2d1ZUNvbnRhaW5lciIsImdhbWVCb2FyZFdyYXBwZXJzIiwicXVlcnlTZWxlY3RvckFsbCIsImRpYWxvZ3VlQm94IiwiZm9yRWFjaCIsImVsZW1lbnQiLCJyZW1vdmVDaGlsZCIsIlNoaXAiLCJkaWFsb2d1ZUNvbnRyb2xsZXIiLCJkaWFsb2d1ZVJlZnJlc2giLCJmbGVldCIsIm5hbWUiLCJwbGF5ZXJOYW1lIiwiYm9hcmQiLCJzaGlwcyIsImkiLCJqIiwicGxhY2VIb3Jpem9udGFsU2hpcCIsInJvdyIsImNvbCIsInNoaXAiLCJsZW5ndGgiLCJuZXdDb29yZHMiLCJjb29yZHMiLCJwdXNoIiwicGxhY2VWZXJ0aWNhbFNoaXAiLCJyZWNpZXZlQXR0YWNrIiwiYXR0YWNrU3RhdHVzIiwiY2hlY2tJZlVzZWQiLCJjb29yZCIsImhpdCIsInVwZGF0ZUJvYXJkU3BvdCIsIm1vdmVSZXN1bHQiLCJzdW5rQ2hlY2siLCJjaGVja0lmU3VuayIsInN1bmtTaGlwTWVzc2FnZSIsInNwbGljZSIsImNoZWNrQWxsU3VuayIsImVuZEdhbWVNZXNzYWdlIiwiZW5kR2FtZSIsInVzZUdyaWRTcG90IiwiZnJlZXplR3JpZCIsInJlbmRlckVuZEdhbWUiLCJjb25zdHJ1Y3RvciIsInZpc2l0ZWQiLCJwaWNrUmFuZG9tQ2VsbCIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsImNvbHVtbiIsImNvbXBDb29yZHMiLCJyZXBlYXRCb29sZWFuIiwiY2hlY2tSZXBlYXRDZWxsIiwic3RyaW5nZWRDb29yZHMiLCJKU09OIiwic3RyaW5naWZ5IiwiZXhpc3RzQm9vbGVhbiIsInNvbWUiLCJoaXRzIiwiaXNTdW5rIiwiYm9hcmRSdW4iLCJjYXJyaWVyIiwiYmF0dGxlc2hpcCIsImRlc3Ryb3llciIsInN1Ym1hcmluZSIsInBhdHJvbEJvYXQiLCJyb3RhdGVCdXR0b24iLCJvY2N1cGllZENlbGxzIiwiY3VycmVudFBsYW5lIiwiY3JlYXRlUm90YXRpb25BYmlsaXR5IiwiaHVtYW5DZWxscyIsInNoaXBJbmRleCIsImNlbGwiLCJhZGRFdmVudExpc3RlbmVyIiwiY2VsbEhvdmVyIiwiY2xhc3NMaXN0IiwiY29udGFpbnMiLCJwbGFjZUhvcml6b250YWxseSIsImNvb3JkaW5hdGVzIiwiYWN0aXZlQ2VsbHMiLCJwbGFjZVZlcnRpY2FsbHkiLCJjZWxsQ29vcmRzIiwiZ3JvdXBlZENlbGxzIiwiY2VsbFJvdyIsImNlbGxDb2x1bW4iLCJhY3RpdmVDZWxsIiwiZ2V0RWxlbWVudEJ5SWQiLCJjb25mbGljdGluZyIsImNoZWNrQ29uZmxpY3RpbmdTaGlwcyIsImVsZW0iLCJhZGQiLCJyZW1vdmUiLCJhbHJlYWR5VXNlZCIsImNoZWNrRm9yUmVwZWF0IiwibmV3UGxhbmUiLCJzd2l0Y2hQbGFuZSIsInBsYW5lcyIsInVzZWRDZWxscyIsImNyZWF0ZVNoaXBDb29yZHMiLCJjaG9zZW5QbGFuZSIsInRlc3RIb3Jpem9udGFsU2hpcCIsInRlc3RWZXJ0aWNhbFNoaXAiLCJzdGFydGluZ0Nvb3JkcyIsImNyZWF0ZUhvcml6b250YWxTdGFydCIsImNyZWF0ZVZlcnRpY2FsU3RhcnQiLCJjaG9vc2VQbGFuZSIsImNob3NlbkluZGV4Iiwic3RhcnRpbmdDb29yZCIsImFycmF5IiwiY29tcHV0ZXJNb3ZlcyIsInJvdGF0ZVNoaXBCdXR0b24iLCJjcmVhdGVFbGVtZW50IiwiYXBwZW5kRWxlbWVudCIsInRleHRDb250ZW50IiwiYm9hcmRDb250cm9sbGVyIiwiaXNDb21wdXRlciIsImdhbWVCb2FyZFdyYXBwZXIiLCJib2FyZFRpdGxlIiwiZ2FtZWJvYXJkIiwiYnVpbGRHcmlkIiwic2V0R3JpZFRyaWdnZXJzIiwiZ2FtZWJvYXJkRWxlbWVudCIsInNldEF0dHJpYnV0ZSIsImNvbXB1dGVyQm9hcmRDb250cm9sbGVyIiwiaHVtYW5Cb2FyZENvbnRyb2xsZXIiLCJjZWxscyIsInN0YXR1cyIsInVzZWRDZWxsIiwic3R5bGUiLCJwb2ludGVyRXZlbnRzIiwidGV4dEJveDEiLCJ0ZXh0Qm94MiIsInRleHRCb3gzIiwiYm9keUVsZW1lbnQiLCJib2R5IiwiZW5kR2FtZUJveCIsImVuZEdhbWVJY29uIiwicmVzZXRHYW1lQnV0dG9uIiwiZWxlbWVudE5hbWUiLCJjbGFzc05hbWUiLCJmYXRoZXJFbGVtZW50IiwiYXBwZW5kQ2hpbGQiLCJhcmd1bWVudHMiLCJ1bmRlZmluZWQiXSwic291cmNlUm9vdCI6IiJ9