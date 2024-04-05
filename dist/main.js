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
          console.log(shipIndex);
        } else if (currentPlane === 'vertical') {
          placeVertically(cell.coordinates, cell.activeCells, ships[shipIndex]);
          shipIndex += 1;
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
  function checkForRepeat(coords) {
    const stringedCoords = JSON.stringify(coords);
    const existsBoolean = occupiedCells.some(coord => JSON.stringify(coord) === stringedCoords);
    // console.log(existsBoolean)
    return existsBoolean;
  }
  function checkConflictingShips(activeCells) {
    let alreadyUsed = false;
    activeCells.forEach(elem => {
      if (checkForRepeat(elem.coordinates) === true) {
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
    checkConflictingShips,
    checkForRepeat
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsK0JBQStCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsdUNBQXVDO0FBQ3ZDOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLE9BQU8sc0ZBQXNGLFlBQVksV0FBVyxVQUFVLE1BQU0sS0FBSyxZQUFZLGFBQWEsT0FBTyxLQUFLLEtBQUssTUFBTSxLQUFLLFVBQVUsWUFBWSxXQUFXLFVBQVUsWUFBWSxPQUFPLEtBQUss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QTtBQUNBO0FBQ0EseURBQXlEO0FBQ3pEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0M7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDNURhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7VUNiQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7V0NOQTs7Ozs7Ozs7Ozs7Ozs7QUNBMkI7QUFDaUM7QUFDaEI7QUFJNUM5RCx5REFBYyxDQUFDLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL21haW4tdGVtcGxhdGUvLi9zcmMvZ2FtZUxvb3AuanMiLCJ3ZWJwYWNrOi8vbWFpbi10ZW1wbGF0ZS8uL3NyYy9nYW1lYm9hcmRDb250cm9sbGVyLmpzIiwid2VicGFjazovL21haW4tdGVtcGxhdGUvLi9zcmMvcGxheWVyLmpzIiwid2VicGFjazovL21haW4tdGVtcGxhdGUvLi9zcmMvc2hpcC1vYmplY3QuanMiLCJ3ZWJwYWNrOi8vbWFpbi10ZW1wbGF0ZS8uL3NyYy9zaGlwUGxhY2VtZW50LmpzIiwid2VicGFjazovL21haW4tdGVtcGxhdGUvLi9zcmMvdXNlckludGVyZmFjZS5qcyIsIndlYnBhY2s6Ly9tYWluLXRlbXBsYXRlLy4vc3JjL3BhZ2VTdHlsaW5nLmNzcyIsIndlYnBhY2s6Ly9tYWluLXRlbXBsYXRlLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly9tYWluLXRlbXBsYXRlLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vbWFpbi10ZW1wbGF0ZS8uL3NyYy9wYWdlU3R5bGluZy5jc3M/YTliNyIsIndlYnBhY2s6Ly9tYWluLXRlbXBsYXRlLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL21haW4tdGVtcGxhdGUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL21haW4tdGVtcGxhdGUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vbWFpbi10ZW1wbGF0ZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9tYWluLXRlbXBsYXRlLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vbWFpbi10ZW1wbGF0ZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL21haW4tdGVtcGxhdGUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbWFpbi10ZW1wbGF0ZS93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9tYWluLXRlbXBsYXRlL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9tYWluLXRlbXBsYXRlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vbWFpbi10ZW1wbGF0ZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL21haW4tdGVtcGxhdGUvd2VicGFjay9ydW50aW1lL25vbmNlIiwid2VicGFjazovL21haW4tdGVtcGxhdGUvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L3ByZWZlci1kZWZhdWx0LWV4cG9ydCAqL1xuaW1wb3J0IHsgUGxheWVyLCB1c2VyUGxheWVyLCBjb21wdXRlclBsYXllciB9IGZyb20gXCIuL3BsYXllclwiO1xuaW1wb3J0IHsgZ2FtZUJvYXJkQ29udHJvbGxlciB9IGZyb20gXCIuL2dhbWVib2FyZENvbnRyb2xsZXJcIjtcbmltcG9ydCB7IGNyZWF0ZUZsZWV0LCBjcmVhdGVPcHBGbGVldCB9IGZyb20gXCIuL3NoaXAtb2JqZWN0XCI7XG5pbXBvcnQgeyBkb21NYW5pcHVsYXRpb24gfSBmcm9tIFwiLi91c2VySW50ZXJmYWNlXCI7XG5pbXBvcnQgeyBodW1hblNoaXBQbGFjZW1lbnQgfSBmcm9tIFwiLi9zaGlwUGxhY2VtZW50XCI7XG5cbmV4cG9ydCBjb25zdCBpbml0aWFsaXplR2FtZSA9IGZ1bmN0aW9uIGNyZWF0ZUdhbWUoKSB7XG4gICAgY29uc3QgcnVuRE9NID0gZG9tTWFuaXB1bGF0aW9uKCk7XG5cbiAgICBjb25zdCBodW1hblBsYXllciA9IG5ldyBQbGF5ZXIoJ1BsYXllciAxJylcbiAgICBjb25zdCBodW1hbkZsZWV0ID0gY3JlYXRlRmxlZXQoKVxuICAgIGNvbnNvbGUubG9nKGh1bWFuRmxlZXQpXG4gICAgaHVtYW5QbGF5ZXIuZ2FtZUJvYXJkID0gZ2FtZUJvYXJkQ29udHJvbGxlcihodW1hbkZsZWV0LCBodW1hblBsYXllci5wbGF5ZXIpO1xuICAgIGNvbnN0IGh1bWFuQm9hcmQgPSBodW1hblBsYXllci5nYW1lQm9hcmRcbiAgICBodW1hbkJvYXJkLmNyZWF0ZUJvYXJkKCk7XG4gICAgXG5cbiAgICBjb25zdCBBSXBsYXllciA9IG5ldyBQbGF5ZXIoJ1BsYXllciAyJyk7XG4gICAgY29uc3QgY29tcHV0ZXJGbGVldCA9IGNyZWF0ZU9wcEZsZWV0KCk7XG4gICAgQUlwbGF5ZXIuZ2FtZUJvYXJkID0gZ2FtZUJvYXJkQ29udHJvbGxlcihjb21wdXRlckZsZWV0LCBBSXBsYXllci5wbGF5ZXIpO1xuICAgIGNvbnN0IGNvbXB1dGVyQm9hcmQgPSBBSXBsYXllci5nYW1lQm9hcmQ7XG4gICAgY29tcHV0ZXJCb2FyZC5jcmVhdGVCb2FyZCgpO1xuXG4gICAgcnVuRE9NLnJlbmRlclN0YXJ0KCk7XG4gICAgcnVuRE9NLnJlbmRlckdhbWVCb2FyZChjb21wdXRlckJvYXJkLmNyZWF0ZUJvYXJkKCksIEFJcGxheWVyLnBsYXllcik7XG4gICAgcnVuRE9NLnJlbmRlckdhbWVCb2FyZChjb21wdXRlckJvYXJkLCBodW1hblBsYXllci5wbGF5ZXIsIGh1bWFuQm9hcmQpO1xuICAgIFxuICAgIC8vIGNhbGwgcmVuZGVyIGRpYWxvZ3VlIGJveCBoZXJlXG4gICAgcnVuRE9NLnJlbmRlckRpYWxvZ3VlQm94KCk7XG5cbiAgICAvLyBjYWxsIHNoaXBQbGFjZW1lbnQgZnVuY3Rpb24gaGVyZSBmb3IgaHVtYW5Cb2FyZFxuICAgIGNvbnN0IGh1bWFuUGxhY2VtZW50ID0gaHVtYW5TaGlwUGxhY2VtZW50KGh1bWFuQm9hcmQsIGh1bWFuRmxlZXQpO1xufVxuXG5leHBvcnQgY29uc3QgcmVzZXRJbnRlcmZhY2UgPSBmdW5jdGlvbiAoYm9keUUsIGVuZEJveCkge1xuICAgIGNvbnNvbGUubG9nKCdyZXNldGluZyBhbGwgdGhpcyBzaGl0Jyk7XG4gICAgY29uc3QgcGxheWVyQm9hcmRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdhbWVib2FyZHMnKTtcbiAgICBjb25zdCBkaWFsb2d1ZUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kaWFsb2d1ZS1jb250YWluZXInKTtcblxuICAgIGNvbnN0IGdhbWVCb2FyZFdyYXBwZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmJvYXJkLXdyYXBwZXInKTtcbiAgICBjb25zdCBkaWFsb2d1ZUJveCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kaWFsb2d1ZS1ib3gnKTtcbiAgICAvLyBjb25zb2xlLmxvZyhwbGF5ZXJCb2FyZHMsIGRpYWxvZ3VlQ29udGFpbmVyLCBnYW1lQm9hcmRXcmFwcGVycywgZGlhbG9ndWVCb3gpXG4gICAgY29uc29sZS5sb2coYm9keUUsIGVuZEJveClcblxuICAgIGdhbWVCb2FyZFdyYXBwZXJzLmZvckVhY2goKGVsZW1lbnQpID0+IHtcbiAgICAgICAgcGxheWVyQm9hcmRzLnJlbW92ZUNoaWxkKGVsZW1lbnQpO1xuICAgIH0pO1xuICAgIGRpYWxvZ3VlQ29udGFpbmVyLnJlbW92ZUNoaWxkKGRpYWxvZ3VlQm94KTtcbiAgICBib2R5RS5yZW1vdmVDaGlsZChlbmRCb3gpO1xuXG4gICAgaW5pdGlhbGl6ZUdhbWUoKTtcblxufSIsIi8qIGVzbGludC1kaXNhYmxlIG5vLXVzZS1iZWZvcmUtZGVmaW5lICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1lbHNlLXJldHVybiAqL1xuLyogZXNsaW50LWRpc2FibGUgbm8tbG9vcC1mdW5jICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1wbHVzcGx1cyAqL1xuLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L3ByZWZlci1kZWZhdWx0LWV4cG9ydCAqL1xuXG4vLyBnYW1lQm9hcmQgc2hvdWxkIGNoZWNrIGlmIGEgZ2FtZSBpcyBvdmVyIGJ5IHNlZWluZyBpZiB0aGVcbi8vIGxlbmd0aCBvZiBcInNoaXBzXCIgaXMgemVybyAoY2hlY2tBbGxTdW5rKVxuXG4vLyBwbGFjaW5nIHNoaXBzIHZlcnRpY2FsbHkuLi4gcG9zc2libGUgaWRlYTogaGF2ZSBhIGNvbHVtbiBudW1iZXIgKGUuZyAzKVxuLy8gdGhhdCB5b3UgdXNlIHRvIHNlbGVjdCB0aGUgY29ycmVzcG9uZGluZyBhcnJheSBpdGVtIGluIGVhY2hcbi8vIG9mIHRoZSBhcnJheXMgdGhhdCByZXByZXNlbnRzIGEgcm93IG9uIHRoZSBib2FyZFxuaW1wb3J0IHsgU2hpcCwgY3JlYXRlRmxlZXQgfSBmcm9tIFwiLi9zaGlwLW9iamVjdFwiXG5pbXBvcnQgeyBkb21NYW5pcHVsYXRpb24sIGRpYWxvZ3VlQ29udHJvbGxlciB9IGZyb20gXCIuL3VzZXJJbnRlcmZhY2VcIjtcblxuY29uc3QgcnVuRE9NID0gZG9tTWFuaXB1bGF0aW9uKCk7XG5jb25zdCBkaWFsb2d1ZVJlZnJlc2ggPSBkaWFsb2d1ZUNvbnRyb2xsZXIoKTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdhbWVCb2FyZENvbnRyb2xsZXIoZmxlZXQsIG5hbWUpIHtcbiAgICBjb25zdCBwbGF5ZXJOYW1lID0gbmFtZTtcbiAgICBjb25zdCBib2FyZCA9IFtdO1xuICAgIGNvbnN0IHNoaXBzID0gZmxlZXQ7XG5cbiAgICAvLyBjb25zb2xlLmxvZyhzaGlwcyk7XG5cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZUJvYXJkKCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICAgICAgICAgIGJvYXJkW2ldID0gW107XG5cbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGorKykge1xuICAgICAgICAgICAgICAgIGJvYXJkW2ldW2pdID0gZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyhib2FyZCk7XG4gICAgICAgIHJldHVybiBib2FyZFxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBsYWNlSG9yaXpvbnRhbFNoaXAocm93LCBjb2wsIHNoaXApIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBuZXdDb29yZHMgPSBbcm93LCBjb2wgKyBpXTtcbiAgICAgICAgICAgIHNoaXAuY29vcmRzLnB1c2gobmV3Q29vcmRzKVxuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKHNoaXBzKTtcbiAgICAgICAgcmV0dXJuIHNoaXBcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwbGFjZVZlcnRpY2FsU2hpcChyb3csIGNvbCwgc2hpcCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IG5ld0Nvb3JkcyA9IFtyb3cgKyBpLCBjb2xdO1xuICAgICAgICAgICAgLy8gcHV0IGEgY2hlY2sgaGVyZSB0byBzZWUgaWYgdGhpcyBjb25mbGljdHMgd2l0aFxuICAgICAgICAgICAgLy8gYW55IG90aGVyIHNoaXAncyBjb29yZHMgXG4gICAgICAgICAgICBzaGlwLmNvb3Jkcy5wdXNoKG5ld0Nvb3Jkcyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNoaXBcbiAgICB9XG4gICAgXG4gICAgZnVuY3Rpb24gcmVjaWV2ZUF0dGFjayhjb29yZHMpIHtcbiAgICAgICAgY29uc29sZS5sb2coY29vcmRzKVxuICAgICAgICBsZXQgYXR0YWNrU3RhdHVzID0gJ21pc3MnO1xuXG4gICAgICAgIC8vIGNoZWNrIHRvIHNlZSBpZiBjb29yZHMgaGF2ZSBhbHJlYWR5IGJlZW4gdXNlZDpcbiAgICAgICAgaWYgKGNoZWNrSWZVc2VkKGNvb3JkcykgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHJldHVybiAnZmlsbGVkIGFscmVhZHknXG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBzaGlwc1tpXS5jb29yZHMuZm9yRWFjaCgoY29vcmQpID0+IHtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAoY2hlY2tJZlVzZWQoY29vcmRzKSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ2ZpbGxlZCBhbHJlYWR5J1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChjb29yZFswXSA9PT0gY29vcmRzWzBdICYmIGNvb3JkWzFdID09PSBjb29yZHNbMV0pIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2hpdCcpO1xuICAgICAgICAgICAgICAgICAgICBhdHRhY2tTdGF0dXMgPSAnaGl0J1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhhdHRhY2tTdGF0dXMpXG4gICAgICAgICAgICAgICAgICAgIHNoaXBzW2ldLmhpdCgpO1xuICAgICAgICAgICAgICAgICAgICB1cGRhdGVCb2FyZFNwb3QoY29vcmRzKTtcbiAgICAgICAgICAgICAgICAgICAgZGlhbG9ndWVSZWZyZXNoLm1vdmVSZXN1bHQoYXR0YWNrU3RhdHVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGxheWVyTmFtZSwgY29vcmRzLCBzaGlwc1tpXSlcblxuICAgICAgICAgICAgICAgICAgICBjb25zdCBzdW5rQ2hlY2sgPSBzaGlwc1tpXS5jaGVja0lmU3VuaygpXG4gICAgICAgICAgICAgICAgICAgIGlmIChzdW5rQ2hlY2spIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpYWxvZ3VlUmVmcmVzaC5zdW5rU2hpcE1lc3NhZ2Uoc2hpcHNbaV0sIHBsYXllck5hbWUpXG4gICAgICAgICAgICAgICAgICAgICAgICBzaGlwcy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGVja0FsbFN1bmsoKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgdXBkYXRlQm9hcmRTcG90KGNvb3JkcywgYXR0YWNrU3RhdHVzKTtcbiAgICAgICAgaWYgKGF0dGFja1N0YXR1cyA9PT0gJ21pc3MnKSB7XG4gICAgICAgICAgICBkaWFsb2d1ZVJlZnJlc2gubW92ZVJlc3VsdChhdHRhY2tTdGF0dXMsXG4gICAgICAgICAgICAgICAgcGxheWVyTmFtZSwgY29vcmRzKVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gYXR0YWNrU3RhdHVzXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2hlY2tBbGxTdW5rKCkge1xuICAgICAgICBjb25zb2xlLmxvZyhzaGlwcyk7XG4gICAgICAgIGlmIChzaGlwcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIGRpYWxvZ3VlUmVmcmVzaC5lbmRHYW1lTWVzc2FnZShwbGF5ZXJOYW1lKVxuICAgICAgICAgICAgZW5kR2FtZSgpXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVCb2FyZFNwb3QoY29vcmRzLCBhdHRhY2tTdGF0dXMpIHtcbiAgICAgICAgYm9hcmRbY29vcmRzWzBdIC0gMV1bY29vcmRzWzFdIC0gMV0gPSB0cnVlO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhib2FyZClcbiAgICAgICAgcnVuRE9NLnVzZUdyaWRTcG90KGNvb3JkcywgYXR0YWNrU3RhdHVzLCBwbGF5ZXJOYW1lKVxuICAgICAgICByZXR1cm4gYm9hcmRcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjaGVja0lmVXNlZChjb29yZHMpIHtcbiAgICAgICAgaWYgKGJvYXJkW2Nvb3Jkc1swXSAtIDFdW2Nvb3Jkc1sxXSAtIDFdID09PSB0cnVlKSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnYWxyZWFkeSB1c2VkJylcbiAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIFxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGVuZEdhbWUoKSB7XG4gICAgICAgIC8vIHdhbnQgdG8gZGlzYWJsZSBib3RoIGdhbWVCb2FyZHNcbiAgICAgICAgLy8gd2FudCB0byBtYWtlIHRoZSByZXN0YXJ0IGJ1dHRvbiBhcHBlYXJcbiAgICAgICAgY29uc29sZS5sb2coJ2VuZGluZyBnYW1lJyk7XG4gICAgICAgIHJ1bkRPTS5mcmVlemVHcmlkKCk7XG4gICAgICAgIHJ1bkRPTS5yZW5kZXJFbmRHYW1lKCk7XG4gICAgfVxuICAgIC8vIGxpa2VseSB3aWxsIGhhdmUgdG8gaW1wbGVtZW50IGNoZWNrIHRvIG1ha2Ugc3VyZSBhIHNoaXAgY2FuXG4gICAgLy8gYmUgcGxhY2VkIHdpdGggbm8gb3ZlcmxhcFxuXG5cbiAgICByZXR1cm4geyBjcmVhdGVCb2FyZCwgcGxhY2VIb3Jpem9udGFsU2hpcCwgcGxhY2VWZXJ0aWNhbFNoaXAsIHJlY2lldmVBdHRhY2ssXG4gICAgY2hlY2tBbGxTdW5rLCB1cGRhdGVCb2FyZFNwb3QsIGNoZWNrSWZVc2VkLCBlbmRHYW1lIH1cbn1cblxuIiwiLy8gY3JlYXRlIGJvdGggdGhlIHVzZXIgcGxheWVyIGFuZCB0aGUgY29tcHV0ZXIgcGxheWVyIGhlcmVcblxuLy8gY29tcHV0ZXIgcGxheWVyIGhhcyBhdHRhY2sgY29vcmRpbmF0ZXMgZ2VuZXJhdG9yIGZ1bmN0aW9uXG5pbXBvcnQgeyBnYW1lQm9hcmRDb250cm9sbGVyIH0gZnJvbSBcIi4vZ2FtZWJvYXJkQ29udHJvbGxlclwiO1xuXG5leHBvcnQgY2xhc3MgUGxheWVyIHtcbiAgICBjb25zdHJ1Y3RvcihwbGF5ZXIsIGdhbWVCb2FyZCkge1xuICAgICAgICB0aGlzLnBsYXllciA9IHBsYXllcjtcbiAgICAgICAgLy8gdGhpcy5wbGF5ZXJTaGlwcyA9IFtdXG4gICAgICAgIHRoaXMuZ2FtZUJvYXJkPSBudWxsXG4gICAgfVxufVxuXG5cbmV4cG9ydCBjb25zdCB1c2VyUGxheWVyID0gZnVuY3Rpb24gKCkge1xuXG59XG5cbmV4cG9ydCBjb25zdCBjb21wdXRlclBsYXllciA9IGZ1bmN0aW9uICgpIHtcbiAgICBjb25zdCB2aXNpdGVkID0gW107XG5cbiAgICBmdW5jdGlvbiBwaWNrUmFuZG9tQ2VsbChodW1hbkJvYXJkKSB7XG4gICAgICAgIGNvbnN0IHJvdyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKSArIDFcbiAgICAgICAgY29uc3QgY29sdW1uID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApICsgMVxuICAgICAgICBjb25zdCBjb21wQ29vcmRzID0gW3JvdywgY29sdW1uXTtcblxuICAgICAgICBjb25zdCByZXBlYXRCb29sZWFuID0gY2hlY2tSZXBlYXRDZWxsKGNvbXBDb29yZHMpXG4gICAgICAgIGNvbnNvbGUubG9nKHJlcGVhdEJvb2xlYW4pXG4gICAgICAgIGlmIChyZXBlYXRCb29sZWFuID09PSB0cnVlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnY29tcHV0ZXIgcGlja2VkIHVzZWQgY2VsbCEhJylcbiAgICAgICAgICAgIHBpY2tSYW5kb21DZWxsKGh1bWFuQm9hcmQpO1xuICAgICAgICB9IGVsc2UgaWYgKHJlcGVhdEJvb2xlYW4gPT09IGZhbHNlKSB7XG4gICAgICAgICAgICB2aXNpdGVkLnB1c2goY29tcENvb3Jkcyk7XG4gICAgICAgICAgICBodW1hbkJvYXJkLnJlY2lldmVBdHRhY2soY29tcENvb3Jkcyk7XG5cbiAgICAgICAgICAgIHJldHVybiBjb21wQ29vcmRzIFxuICAgICAgICB9XG4gICAgICAgIFxuXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2hlY2tSZXBlYXRDZWxsKGNvb3Jkcykge1xuICAgICAgICBjb25zdCBzdHJpbmdlZENvb3JkcyA9IEpTT04uc3RyaW5naWZ5KGNvb3Jkcyk7XG4gICAgICAgIGNvbnN0IGV4aXN0c0Jvb2xlYW4gPSB2aXNpdGVkLnNvbWUoKGNvb3JkKSA9PiBKU09OLnN0cmluZ2lmeShjb29yZCkgPT09IHN0cmluZ2VkQ29vcmRzKVxuICAgICAgICBjb25zb2xlLmxvZyhleGlzdHNCb29sZWFuKVxuICAgICAgICByZXR1cm4gZXhpc3RzQm9vbGVhblxuICAgIH1cblxuICAgIHJldHVybiB7cGlja1JhbmRvbUNlbGwsIGNoZWNrUmVwZWF0Q2VsbH1cbn0iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby1lbHNlLXJldHVybiAqL1xuLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L3ByZWZlci1kZWZhdWx0LWV4cG9ydCAqL1xuaW1wb3J0IHsgZ2FtZUJvYXJkQ29udHJvbGxlciB9IGZyb20gXCIuL2dhbWVib2FyZENvbnRyb2xsZXJcIjtcblxuZXhwb3J0IGNsYXNzIFNoaXAge1xuICAgIGNvbnN0cnVjdG9yKGxlbmd0aCwgbmFtZSwgaGl0cywgaXNTdW5rLCBjb29yZHMpIHtcbiAgICAgICAgdGhpcy5sZW5ndGggPSBsZW5ndGg7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMuaGl0cyA9IDA7XG4gICAgICAgIHRoaXMuaXNTdW5rID0gZmFsc2U7XG4gICAgICAgIHRoaXMuY29vcmRzID0gW11cbiAgICB9XG5cbiAgICBoaXQoKSB7XG4gICAgICAgIHRoaXMuaGl0cyArPSAxXG4gICAgICAgIGNvbnNvbGUubG9nKCdoaXQgYWRkZWQnKVxuICAgIH1cblxuICAgIGNoZWNrSWZTdW5rKCkge1xuICAgICAgICBpZiAodGhpcy5sZW5ndGggPT09IHRoaXMuaGl0cykge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ1N1bmshJylcbiAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmxlbmd0aCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmhpdHMpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICB9XG5cbn1cblxuY29uc3QgYm9hcmRSdW4gPSBnYW1lQm9hcmRDb250cm9sbGVyKCk7XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVGbGVldCgpIHtcbiAgICBjb25zdCBzaGlwcyA9IFtdXG5cbiAgICBjb25zdCBjYXJyaWVyID0gbmV3IFNoaXAoNSwgJ0NhcnJpZXInKTtcbiAgICBjb25zdCBiYXR0bGVzaGlwID0gbmV3IFNoaXAoNCwgJ0JhdHRsZXNoaXAnKTtcbiAgICBjb25zdCBkZXN0cm95ZXIgPSBuZXcgU2hpcCgzLCAnRGVzdHJveWVyJyk7XG4gICAgY29uc3Qgc3VibWFyaW5lID0gbmV3IFNoaXAoMywgJ1N1Ym1hcmluZScpO1xuICAgIGNvbnN0IHBhdHJvbEJvYXQgPSBuZXcgU2hpcCgyLCAnUGF0cm9sIEJvYXQnKTtcbiBcbiAgICBzaGlwcy5wdXNoKGNhcnJpZXIsIGJhdHRsZXNoaXAsIGRlc3Ryb3llciwgc3VibWFyaW5lLCBwYXRyb2xCb2F0KVxuXG4gICAgLy8gYm9hcmRSdW4ucGxhY2VIb3Jpem9udGFsU2hpcCgxLCA1LCBjYXJyaWVyKTtcbiAgICAvLyBib2FyZFJ1bi5wbGFjZVZlcnRpY2FsU2hpcCg0LDEsIGJhdHRsZXNoaXApXG4gICAgLy8gYm9hcmRSdW4ucGxhY2VIb3Jpem9udGFsU2hpcCg3LCA0LCBkZXN0cm95ZXIpO1xuICAgIC8vIGJvYXJkUnVuLnBsYWNlVmVydGljYWxTaGlwKDcsIDgsIHN1Ym1hcmluZSk7XG4gICAgLy8gYm9hcmRSdW4ucGxhY2VIb3Jpem9udGFsU2hpcCgyLCA2LCBwYXRyb2xCb2F0KTtcbiAgICBjb25zb2xlLmxvZyhzaGlwcyk7XG4gICAgcmV0dXJuIHNoaXBzXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVPcHBGbGVldCgpIHtcbiAgICBjb25zdCBzaGlwcyA9IFtdXG5cbiAgICBjb25zdCBjYXJyaWVyID0gbmV3IFNoaXAoNSwgJ0NhcnJpZXInKTtcbiAgICBjb25zdCBiYXR0bGVzaGlwID0gbmV3IFNoaXAoNCwgJ0JhdHRsZXNoaXAnKTtcbiAgICBjb25zdCBkZXN0cm95ZXIgPSBuZXcgU2hpcCgzLCAnRGVzdHJveWVyJyk7XG4gICAgY29uc3Qgc3VibWFyaW5lID0gbmV3IFNoaXAoMywgJ1N1Ym1hcmluZScpO1xuICAgIGNvbnN0IHBhdHJvbEJvYXQgPSBuZXcgU2hpcCgyLCAnUGF0cm9sIEJvYXQnKTtcblxuICAgIHNoaXBzLnB1c2goY2FycmllciwgYmF0dGxlc2hpcCwgZGVzdHJveWVyLCBzdWJtYXJpbmUsIHBhdHJvbEJvYXQpO1xuXG4gICAgYm9hcmRSdW4ucGxhY2VIb3Jpem9udGFsU2hpcCgxLCAxLCBjYXJyaWVyKTtcbiAgICBib2FyZFJ1bi5wbGFjZVZlcnRpY2FsU2hpcCg0LDIsIGJhdHRsZXNoaXApXG4gICAgYm9hcmRSdW4ucGxhY2VIb3Jpem9udGFsU2hpcCg2LCA2LCBkZXN0cm95ZXIpO1xuICAgIGJvYXJkUnVuLnBsYWNlVmVydGljYWxTaGlwKDcsIDgsIHN1Ym1hcmluZSk7XG4gICAgYm9hcmRSdW4ucGxhY2VIb3Jpem9udGFsU2hpcCgzLCA3LCBwYXRyb2xCb2F0KTtcbiAgICBjb25zb2xlLmxvZyhzaGlwcyk7XG4gICAgcmV0dXJuIHNoaXBzXG59IiwiLyogZXNsaW50LWRpc2FibGUgbm8tdXNlLWJlZm9yZS1kZWZpbmUgKi9cbi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9wcmVmZXItZGVmYXVsdC1leHBvcnQgKi9cblxuLy8gaGF2ZSB0byBhZGQgYnV0dG9ucyB0byBVSSB0byBzd2l0Y2ggYmV0d2VuIGhvcml6b250YWwgYW5kIHZlcnRpY2FsXG4vLyBoYXZlIHRvIG1ha2UgYSBzdGFydCBidXR0b24gdGhhdCB1c2VyIGNhbiBwcmVzcyB3aGVuIGFsbCBcbi8vIHNoaXBzIGFyZSBwbGFjZWRcblxuXG5leHBvcnQgY29uc3QgaHVtYW5TaGlwUGxhY2VtZW50ID0gZnVuY3Rpb24gKGh1bWFuQm9hcmQsIHNoaXBzKSB7XG4gICAgLy8gbWVtb3J5IHN0b3JhZ2UgZm9yIHdoZXJlIGNlbGxzIGNhbid0IGJlIHVzZWQgYWdhaW5cbiAgICBjb25zdCByb3RhdGVCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucm90YXRlLXNoaXAnKTtcbiAgICBjb25zdCBvY2N1cGllZENlbGxzID0gW107XG5cbiAgICAvLyBzZXRzIHBsYW5lXG4gICAgbGV0IGN1cnJlbnRQbGFuZSA9ICdob3Jpem9udGFsJztcbiAgICBjcmVhdGVSb3RhdGlvbkFiaWxpdHkoKTtcblxuICAgIGNvbnN0IGh1bWFuQ2VsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2VsbCcpO1xuICAgIGxldCBzaGlwSW5kZXggPSAwO1xuICAgIFxuXG4gICAgaHVtYW5DZWxscy5mb3JFYWNoKChjZWxsKSA9PiB7XG4gICAgICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgKCkgPT4ge1xuICAgICAgICAgICAgY2VsbEhvdmVyKGNlbGwsIHNoaXBzW3NoaXBJbmRleF0pXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICBpZiAoY2VsbC5jbGFzc0xpc3QuY29udGFpbnMoJ3ZhbGlkLXBsYWNlbWVudCcpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRQbGFuZSA9PT0gJ2hvcml6b250YWwnKSB7XG4gICAgICAgICAgICAgICAgICAgIHBsYWNlSG9yaXpvbnRhbGx5KGNlbGwuY29vcmRpbmF0ZXMsIGNlbGwuYWN0aXZlQ2VsbHMsIHNoaXBzW3NoaXBJbmRleF0pO1xuICAgICAgICAgICAgICAgICAgICBzaGlwSW5kZXggKz0gMTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coc2hpcEluZGV4KTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGN1cnJlbnRQbGFuZSA9PT0gJ3ZlcnRpY2FsJykge1xuICAgICAgICAgICAgICAgICAgICBwbGFjZVZlcnRpY2FsbHkoY2VsbC5jb29yZGluYXRlcywgY2VsbC5hY3RpdmVDZWxscywgc2hpcHNbc2hpcEluZGV4XSk7XG4gICAgICAgICAgICAgICAgICAgIHNoaXBJbmRleCArPSAxO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhzaGlwSW5kZXgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBzaGlwSW5kZXhcbiAgICAgICAgfSlcbiAgICB9KVxuXG4gICAgXG4gICAgZnVuY3Rpb24gY2VsbEhvdmVyKGNlbGwsIHNoaXApIHtcbiAgICAgICAgY29uc29sZS5sb2coc2hpcCk7XG4gICAgICAgIGNvbnN0IGNlbGxDb29yZHMgPSBjZWxsLmNvb3JkaW5hdGVzO1xuICAgICAgICBjZWxsLmFjdGl2ZUNlbGxzID0gW107XG4gICAgICAgIGNvbnN0IGdyb3VwZWRDZWxscyA9IGNlbGwuYWN0aXZlQ2VsbHM7XG4gICAgICAgIC8vIGhhdmUgdG8gY2hlY2sgaWYgaXRzIGhvcml6b250YWwgb3IgdmVydGljYWxcbiAgICAgICAgLy8gdGhlbiBjaGVjayBpZiBzdGFydGluZyBwb2ludCArIHNoaXAgbGVuZ3RoIGlzIHZhbGlkXG4gICAgICAgIGlmIChzaGlwSW5kZXggPT09IDUpIHtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGN1cnJlbnRQbGFuZSA9PT0gJ2hvcml6b250YWwnKSB7XG4gICAgICAgICAgICBjb25zdCBjZWxsUm93ID0gY2VsbENvb3Jkc1swXVxuICAgICAgICAgICAgbGV0IGNlbGxDb2x1bW4gPSBjZWxsQ29vcmRzWzFdO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBhY3RpdmVDZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7Y2VsbFJvd30gJHtjZWxsQ29sdW1ufWhgKVxuICAgICAgICAgICAgICAgIGdyb3VwZWRDZWxscy5wdXNoKGFjdGl2ZUNlbGwpO1xuICAgICAgICAgICAgICAgIGNlbGxDb2x1bW4gKz0gMVxuICAgICAgICAgICAgICAgIGlmIChjZWxsQ29sdW1uID4gMTApIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBjb25mbGljdGluZyA9IGNoZWNrQ29uZmxpY3RpbmdTaGlwcyhncm91cGVkQ2VsbHMpO1xuXG4gICAgICAgICAgICBpZiAoKGNlbGxDb29yZHNbMV0gKyBzaGlwLmxlbmd0aCkgLSAxIDw9IDEwICYmIGNvbmZsaWN0aW5nID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCd0aGlzIGlzIHZhbGlkIScpXG4gICAgICAgICAgICAgICAgZ3JvdXBlZENlbGxzLmZvckVhY2goKGVsZW0pID0+IHtcbiAgICAgICAgICAgICAgICAgICBlbGVtLmNsYXNzTGlzdC5hZGQoJ3ZhbGlkLXBsYWNlbWVudCcpOyBcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfSBlbHNlIGlmICgoY2VsbENvb3Jkc1sxXSArIHNoaXAubGVuZ3RoKSAtIDEgPiAxMCB8fCBjb25mbGljdGluZyA9PT0gdHJ1ZSl7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ25vdCB2YWxpZCcpO1xuICAgICAgICAgICAgICAgIGdyb3VwZWRDZWxscy5mb3JFYWNoKChlbGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGVsZW0uY2xhc3NMaXN0LmFkZCgnaW52YWxpZC1wbGFjZW1lbnQnKTsgXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW91dCcsICgpID0+IHtcbiAgICAgICAgICAgICAgICBncm91cGVkQ2VsbHMuZm9yRWFjaCgoZWxlbSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBlbGVtLmNsYXNzTGlzdC5yZW1vdmUoJ3ZhbGlkLXBsYWNlbWVudCcsICdpbnZhbGlkLXBsYWNlbWVudCcpXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pXG5cblxuICAgICAgICB9IGVsc2UgaWYgKGN1cnJlbnRQbGFuZSA9PT0gJ3ZlcnRpY2FsJykge1xuICAgICAgICAgICAgbGV0IGNlbGxSb3cgPSBjZWxsQ29vcmRzWzBdXG4gICAgICAgICAgICBjb25zdCBjZWxsQ29sdW1uID0gY2VsbENvb3Jkc1sxXTtcblxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgYWN0aXZlQ2VsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGAke2NlbGxSb3d9ICR7Y2VsbENvbHVtbn1oYClcbiAgICAgICAgICAgICAgICBncm91cGVkQ2VsbHMucHVzaChhY3RpdmVDZWxsKTtcbiAgICAgICAgICAgICAgICBjZWxsUm93ICs9IDFcbiAgICAgICAgICAgICAgICBpZiAoY2VsbFJvdyA+IDEwKSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgY29uZmxpY3RpbmcgPSBjaGVja0NvbmZsaWN0aW5nU2hpcHMoZ3JvdXBlZENlbGxzKTtcblxuXG4gICAgICAgICAgICBpZiAoKGNlbGxDb29yZHNbMF0gKyBzaGlwLmxlbmd0aCkgLSAxIDw9IDEwICYmIGNvbmZsaWN0aW5nID09PSBmYWxzZSApIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygndGhpcyBpcyB2YWxpZCEnKVxuICAgICAgICAgICAgICAgIGdyb3VwZWRDZWxscy5mb3JFYWNoKChlbGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgZWxlbS5jbGFzc0xpc3QuYWRkKCd2YWxpZC1wbGFjZW1lbnQnKTsgXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoKGNlbGxDb29yZHNbMF0gKyBzaGlwLmxlbmd0aCkgLSAxID4gMTAgfHwgY29uZmxpY3RpbmcgPT09IHRydWUpe1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdub3QgdmFsaWQnKTtcbiAgICAgICAgICAgICAgICBncm91cGVkQ2VsbHMuZm9yRWFjaCgoZWxlbSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBlbGVtLmNsYXNzTGlzdC5hZGQoJ2ludmFsaWQtcGxhY2VtZW50Jyk7IFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdXQnLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgZ3JvdXBlZENlbGxzLmZvckVhY2goKGVsZW0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZWxlbS5jbGFzc0xpc3QucmVtb3ZlKCd2YWxpZC1wbGFjZW1lbnQnLCAnaW52YWxpZC1wbGFjZW1lbnQnKVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGxhY2VIb3Jpem9udGFsbHkoY2VsbENvb3JkcywgYWN0aXZlQ2VsbHMsIHNoaXApIHtcbiAgICAgICAgYWN0aXZlQ2VsbHMuZm9yRWFjaCgoZWxlbSkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZWxlbS5jb29yZGluYXRlcyk7XG4gICAgICAgICAgICBvY2N1cGllZENlbGxzLnB1c2goZWxlbS5jb29yZGluYXRlcyk7XG4gICAgICAgICAgICBlbGVtLmNsYXNzTGlzdC5hZGQoJ3BsYWNlZCcpXG4gICAgICAgIH0pO1xuICAgICAgICAvLyBtYXliZSBwdXQgdHJpZ2dlciBpbiBoZXJlIHRvIGNoZWNrIGlmIGFsbCBzaGlwcyBhcmUgcGxhY2VkXG4gICAgICAgIC8vIGlmIHRydWUsIGRpc2JhbGUgcG9pbnRlciBldmVudHMgYW5kIHJ1biBmdW5jdGlvbiBmb3JcbiAgICAgICAgLy8gcGxhY2luZyBjb21wdXRlciBzaGlwc1xuICAgICAgICBodW1hbkJvYXJkLnBsYWNlSG9yaXpvbnRhbFNoaXAoY2VsbENvb3Jkc1swXSwgY2VsbENvb3Jkc1sxXSwgc2hpcCk7XG4gICAgICAgIGNvbnNvbGUubG9nKG9jY3VwaWVkQ2VsbHMpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGxhY2VWZXJ0aWNhbGx5KGNlbGxDb29yZHMsIGFjdGl2ZUNlbGxzLCBzaGlwKSB7XG4gICAgICAgIGFjdGl2ZUNlbGxzLmZvckVhY2goKGVsZW0pID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVsZW0uY29vcmRpbmF0ZXMpO1xuICAgICAgICAgICAgb2NjdXBpZWRDZWxscy5wdXNoKGVsZW0uY29vcmRpbmF0ZXMpO1xuICAgICAgICAgICAgZWxlbS5jbGFzc0xpc3QuYWRkKCdwbGFjZWQnKVxuICAgICAgICB9KTtcbiAgICAgICAgaHVtYW5Cb2FyZC5wbGFjZVZlcnRpY2FsU2hpcChjZWxsQ29vcmRzWzBdLCBjZWxsQ29vcmRzWzFdLCBzaGlwKTtcbiAgICAgICAgY29uc29sZS5sb2cob2NjdXBpZWRDZWxscylcbiAgICB9XG5cblxuXG4gICAgZnVuY3Rpb24gY2hlY2tGb3JSZXBlYXQoY29vcmRzKSB7XG4gICAgICAgIGNvbnN0IHN0cmluZ2VkQ29vcmRzID0gSlNPTi5zdHJpbmdpZnkoY29vcmRzKTtcbiAgICAgICAgY29uc3QgZXhpc3RzQm9vbGVhbiA9IG9jY3VwaWVkQ2VsbHMuc29tZSgoY29vcmQpID0+IEpTT04uc3RyaW5naWZ5KGNvb3JkKSA9PT0gc3RyaW5nZWRDb29yZHMpXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGV4aXN0c0Jvb2xlYW4pXG4gICAgICAgIHJldHVybiBleGlzdHNCb29sZWFuXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2hlY2tDb25mbGljdGluZ1NoaXBzKGFjdGl2ZUNlbGxzKSB7XG4gICAgICAgIGxldCBhbHJlYWR5VXNlZCA9IGZhbHNlXG4gICAgICAgIGFjdGl2ZUNlbGxzLmZvckVhY2goKGVsZW0pID0+IHtcbiAgICAgICAgICAgIGlmIChjaGVja0ZvclJlcGVhdChlbGVtLmNvb3JkaW5hdGVzKSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIGFscmVhZHlVc2VkID0gdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICByZXR1cm4gYWxyZWFkeVVzZWRcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVSb3RhdGlvbkFiaWxpdHkoKSB7XG4gICAgICAgIHJvdGF0ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG5ld1BsYW5lID0gc3dpdGNoUGxhbmUoY3VycmVudFBsYW5lKTtcbiAgICAgICAgICAgIGN1cnJlbnRQbGFuZSA9IG5ld1BsYW5lXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgcmV0dXJuIHsgY2VsbEhvdmVyLCBwbGFjZUhvcml6b250YWxseSwgY2hlY2tDb25mbGljdGluZ1NoaXBzLFxuICAgICAgICBjaGVja0ZvclJlcGVhdCB9XG59XG5cblxuZXhwb3J0IGNvbnN0IGNvbXB1dGVyUGxhY2VtZW50ID0gZnVuY3Rpb24gKCkge1xuICAgIFxufVxuXG5cbmZ1bmN0aW9uIHN3aXRjaFBsYW5lKGN1cnJlbnRQbGFuZSkge1xuICAgIGlmIChjdXJyZW50UGxhbmUgPT09ICdob3Jpem9udGFsJykge1xuICAgICAgICBjdXJyZW50UGxhbmUgPSAndmVydGljYWwnXG4gICAgfSBlbHNlIGlmIChjdXJyZW50UGxhbmUgPT09ICd2ZXJ0aWNhbCcpIHtcbiAgICAgICAgY3VycmVudFBsYW5lID0gJ2hvcml6b250YWwnXG4gICAgfVxuICAgIHJldHVybiBjdXJyZW50UGxhbmVcbn07IiwiLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L3ByZWZlci1kZWZhdWx0LWV4cG9ydCAqL1xuaW1wb3J0IHsgY29tcHV0ZXJQbGF5ZXIgfSBmcm9tIFwiLi9wbGF5ZXJcIjtcbmltcG9ydCB7IHJlc2V0SW50ZXJmYWNlIH0gZnJvbSBcIi4vZ2FtZUxvb3BcIjtcblxuXG5leHBvcnQgY29uc3QgZG9tTWFuaXB1bGF0aW9uID0gZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IGNvbXB1dGVyTW92ZXMgPSBjb21wdXRlclBsYXllcigpXG5cbiAgICBjb25zdCBwbGF5ZXJCb2FyZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ2FtZWJvYXJkcycpO1xuICAgIGNvbnN0IGRpYWxvZ3VlQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRpYWxvZ3VlLWNvbnRhaW5lcicpXG5cbiAgICBmdW5jdGlvbiByZW5kZXJTdGFydCgpIHtcbiAgICAgICAgY29uc3Qgcm90YXRlU2hpcEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICBhcHBlbmRFbGVtZW50KHJvdGF0ZVNoaXBCdXR0b24sICdyb3RhdGUtc2hpcCcsIHBsYXllckJvYXJkcylcbiAgICAgICAgcm90YXRlU2hpcEJ1dHRvbi50ZXh0Q29udGVudCA9ICdSb3RhdGUnO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlbmRlckdhbWVCb2FyZChib2FyZENvbnRyb2xsZXIsIHBsYXllck5hbWUsIGh1bWFuQm9hcmQpIHtcbiAgICAgICAgbGV0IGlzQ29tcHV0ZXIgPSBmYWxzZTtcbiAgICAgICAgaWYgKHBsYXllck5hbWUgPT09ICdQbGF5ZXIgMicpIHtcbiAgICAgICAgICAgIGlzQ29tcHV0ZXIgPSB0cnVlXG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2coaXNDb21wdXRlcik7XG5cbiAgICAgICAgY29uc3QgZ2FtZUJvYXJkV3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBhcHBlbmRFbGVtZW50KGdhbWVCb2FyZFdyYXBwZXIsICdib2FyZC13cmFwcGVyJywgcGxheWVyQm9hcmRzKVxuICAgICAgIFxuICAgICAgICBjb25zdCBib2FyZFRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDInKTtcbiAgICAgICAgYXBwZW5kRWxlbWVudChib2FyZFRpdGxlLCAnYm9hcmQtdGl0bGUnLCBnYW1lQm9hcmRXcmFwcGVyKTtcbiAgICAgICAgYm9hcmRUaXRsZS50ZXh0Q29udGVudCA9IHBsYXllck5hbWU7XG5cbiAgICAgICAgLy8gcmVuZGVyIGJvYXJkOlxuICAgICAgICBjb25zdCBnYW1lYm9hcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgYXBwZW5kRWxlbWVudChnYW1lYm9hcmQsICdnYW1lYm9hcmQnLCBnYW1lQm9hcmRXcmFwcGVyKTtcblxuICAgICAgICBidWlsZEdyaWQoZ2FtZWJvYXJkLCBpc0NvbXB1dGVyKTtcbiAgICAgICAgXG4gICAgICAgIGlmIChpc0NvbXB1dGVyID09PSBmYWxzZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ3RyaWdnZXJlZCcpXG4gICAgICAgICAgICBzZXRHcmlkVHJpZ2dlcnMoYm9hcmRDb250cm9sbGVyLCBodW1hbkJvYXJkKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBidWlsZEdyaWQoZ2FtZWJvYXJkRWxlbWVudCwgaXNDb21wdXRlcikge1xuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IDExOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgYXBwZW5kRWxlbWVudChyb3csICdyb3cnLCBnYW1lYm9hcmRFbGVtZW50KTtcblxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDE7IGogPCAxMTsgaisrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgICAgIGNlbGwuY29vcmRpbmF0ZXMgPSBbaSwgal07XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coY2VsbC5jb29yZGluYXRlcylcbiAgICAgICAgICAgICAgICBpZiAoaXNDb21wdXRlciA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICBhcHBlbmRFbGVtZW50KGNlbGwsICdjZWxsLWMnLCByb3cpO1xuICAgICAgICAgICAgICAgICAgICBjZWxsLnNldEF0dHJpYnV0ZSgnaWQnLCBgJHtpfSAke2p9Y2ApXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICBhcHBlbmRFbGVtZW50KGNlbGwsICdjZWxsJywgcm93KTtcbiAgICAgICAgICAgICAgICAgICBjZWxsLnNldEF0dHJpYnV0ZSgnaWQnLCBgJHtpfSAke2p9aGApIFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2V0R3JpZFRyaWdnZXJzKGNvbXB1dGVyQm9hcmRDb250cm9sbGVyLCBodW1hbkJvYXJkQ29udHJvbGxlcikge1xuICAgICAgICBjb25zdCBjZWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jZWxsLWMnKTtcbiAgICAgICAgY2VsbHMuZm9yRWFjaCgoY2VsbCkgPT4ge1xuICAgICAgICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhjZWxsLmNvb3JkaW5hdGVzKTtcbiAgICAgICAgICAgICAgICBjb21wdXRlckJvYXJkQ29udHJvbGxlci5yZWNpZXZlQXR0YWNrKGNlbGwuY29vcmRpbmF0ZXMpO1xuXG4gICAgICAgICAgICAgICAgLy8gdHJpZ2dlciBjb21wdXRlcidzIGF0dGFjayBpbiByZXNwb25zZVxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGh1bWFuQm9hcmRDb250cm9sbGVyKTtcbiAgICAgICAgICAgICAgICBjb21wdXRlck1vdmVzLnBpY2tSYW5kb21DZWxsKGh1bWFuQm9hcmRDb250cm9sbGVyKTtcblxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICAgICAgICAgIFxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVzZUdyaWRTcG90KGNvb3Jkcywgc3RhdHVzLCBuYW1lKSB7XG4gICAgICAgIC8vIHJlZ2lzdGVycyB0aGF0IHRlaCBncmlkIHNwb3Qgd2FzIHVzZWQsIGFuZCBkaXNwbGF5c1xuICAgICAgICAvLyBlaXRoZXIgYSBoaXQgb3IgbWlzc1xuXG4gICAgICAgIGlmIChuYW1lID09PSAnUGxheWVyIDInKSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhzdGF0dXMpO1xuICAgICAgICAgICAgY29uc3QgdXNlZENlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcbiAgICAgICAgICAgICAgICBgJHtjb29yZHNbMF19ICR7Y29vcmRzWzFdfWNgKVxuXG4gICAgICAgICAgICBpZiAoc3RhdHVzID09PSAnaGl0Jykge1xuICAgICAgICAgICAgICAgIHVzZWRDZWxsLnRleHRDb250ZW50ID0gJ1gnXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHN0YXR1cyA9PT0gJ21pc3MnKSB7XG4gICAgICAgICAgICAgICAgdXNlZENlbGwudGV4dENvbnRlbnQgPSAnTydcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coc3RhdHVzKTtcbiAgICAgICAgICAgIGNvbnN0IHVzZWRDZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXG4gICAgICAgICAgICAgICAgYCR7Y29vcmRzWzBdfSAke2Nvb3Jkc1sxXX1oYClcblxuICAgICAgICAgICAgaWYgKHN0YXR1cyA9PT0gJ2hpdCcpIHtcbiAgICAgICAgICAgICAgICB1c2VkQ2VsbC50ZXh0Q29udGVudCA9ICdYJ1xuICAgICAgICAgICAgfSBlbHNlIGlmIChzdGF0dXMgPT09ICdtaXNzJykge1xuICAgICAgICAgICAgICAgIHVzZWRDZWxsLnRleHRDb250ZW50ID0gJ08nXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmcmVlemVHcmlkKCkge1xuICAgICAgICBjb25zdCBnYW1lYm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ2FtZWJvYXJkJyk7XG4gICAgICAgIGdhbWVib2FyZC5zdHlsZS5wb2ludGVyRXZlbnRzID0gJ25vbmUnO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlbmRlckRpYWxvZ3VlQm94KCkge1xuICAgICAgICBjb25zdCBkaWFsb2d1ZUJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBhcHBlbmRFbGVtZW50KGRpYWxvZ3VlQm94LCAnZGlhbG9ndWUtYm94JywgZGlhbG9ndWVDb250YWluZXIpXG5cbiAgICAgICAgY29uc3QgdGV4dEJveDEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgICBhcHBlbmRFbGVtZW50KHRleHRCb3gxLCAndGV4dC1ib3gxJywgZGlhbG9ndWVCb3gpXG5cbiAgICAgICAgY29uc3QgdGV4dEJveDIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgICBhcHBlbmRFbGVtZW50KHRleHRCb3gyLCAndGV4dC1ib3gyJywgZGlhbG9ndWVCb3gpXG5cbiAgICAgICAgY29uc3QgdGV4dEJveDMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgYXBwZW5kRWxlbWVudCh0ZXh0Qm94MywgJ3RleHQtYm94MycsIGRpYWxvZ3VlQm94KVxuICAgIH1cblxuXG4gICAgZnVuY3Rpb24gcmVuZGVyRW5kR2FtZSgpIHtcbiAgICAgICAgY29uc3QgYm9keUVsZW1lbnQgPSBkb2N1bWVudC5ib2R5XG5cbiAgICAgICAgY29uc3QgZW5kR2FtZUJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBhcHBlbmRFbGVtZW50KGVuZEdhbWVCb3gsICdlbmQtZ2FtZS1ib3gnLCBib2R5RWxlbWVudCk7XG5cbiAgICAgICAgY29uc3QgZW5kR2FtZUljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgYXBwZW5kRWxlbWVudChlbmRHYW1lSWNvbiwgJ2VuZC1nYW1lLWljb24nLCBlbmRHYW1lQm94KTtcblxuICAgICAgICBjb25zdCByZXNldEdhbWVCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgYXBwZW5kRWxlbWVudChyZXNldEdhbWVCdXR0b24sICdyZXNldC1nYW1lLWJ1dHRvbicsIGVuZEdhbWVCb3gpO1xuXG4gICAgICAgIHJlc2V0R2FtZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIHJlc2V0SW50ZXJmYWNlKGJvZHlFbGVtZW50LCBlbmRHYW1lQm94KTtcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhcHBlbmRFbGVtZW50KGVsZW1lbnROYW1lLCBjbGFzc05hbWUsIGZhdGhlckVsZW1lbnQgKSB7XG4gICAgICAgIGVsZW1lbnROYW1lLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcbiAgICAgICAgZmF0aGVyRWxlbWVudC5hcHBlbmRDaGlsZChlbGVtZW50TmFtZSk7XG5cbiAgICAgICAgcmV0dXJuIGVsZW1lbnROYW1lO1xuICAgIH1cblxuICAgIHJldHVybiB7cmVuZGVyU3RhcnQsIHJlbmRlckdhbWVCb2FyZCwgYXBwZW5kRWxlbWVudCwgYnVpbGRHcmlkLFxuICAgICAgICBzZXRHcmlkVHJpZ2dlcnMsIHVzZUdyaWRTcG90LCBmcmVlemVHcmlkLCByZW5kZXJEaWFsb2d1ZUJveCxcbiAgICAgICAgcmVuZGVyRW5kR2FtZX1cblxufVxuXG5cblxuXG5leHBvcnQgY29uc3QgZGlhbG9ndWVDb250cm9sbGVyID0gZnVuY3Rpb24oKSB7XG5cbiAgICAvLyBmdW5jdGlvbiAgcGxhY2VTaGlwc01lc3NhZ2UoKSB7XG5cbiAgICAvLyB9XG5cbiAgICBmdW5jdGlvbiBtb3ZlUmVzdWx0KHN0YXR1cywgcGxheWVyTmFtZSwgY29vcmRzLCBzaGlwID0gbnVsbCkge1xuICAgICAgICAvLyBuZWVkIGF0dGFja1N0YXR1cywgc2hpcCBuYW1lLCBjb29yZGluYXRlc1xuICAgICAgICBjb25zdCB0ZXh0Qm94MSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50ZXh0LWJveDEnKTtcbiAgICAgICAgY29uc3QgdGV4dEJveDIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGV4dC1ib3gyJyk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdkaWFsb2d1ZSByZWNvcmRlZCcpXG4gICAgICAgIGlmIChwbGF5ZXJOYW1lICE9PSAnUGxheWVyIDInKSB7XG4gICAgICAgICAgICBpZiAoc3RhdHVzID09PSAnaGl0Jykge1xuICAgICAgICAgICAgICAgIHRleHRCb3gyLnRleHRDb250ZW50ID0gYFRoZSBlbmVteSBoYXMgaGl0IHlvdXIgJHtzaGlwLm5hbWV9XG4gICAgICAgICAgICAgICAgYXQgcm93OiAke2Nvb3Jkc1swXX0gY29sdW1uOiAke2Nvb3Jkc1sxXX0hYFxuICAgICAgICAgICAgfSBlbHNlIGlmIChzdGF0dXMgPT09ICdtaXNzJykge1xuICAgICAgICAgICAgICAgIHRleHRCb3gyLnRleHRDb250ZW50ID0gYFRoZSBlbmVteSBhdHRhY2tlZCByb3c6XG4gICAgICAgICAgICAgICAgJHtjb29yZHNbMF19IGNvbHVtbjogJHtjb29yZHNbMV19IGFuZCBtaXNzZWQhYFxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0gZWxzZSBpZiAocGxheWVyTmFtZSA9PT0gJ1BsYXllciAyJykge1xuICAgICAgICAgICAgaWYgKHN0YXR1cyA9PT0gJ2hpdCcpIHtcbiAgICAgICAgICAgICAgICB0ZXh0Qm94MS50ZXh0Q29udGVudCA9IGBZb3UgaGl0IHRoZSBlbmVteSdzICR7c2hpcC5uYW1lfVxuICAgICAgICAgICAgICAgIGF0IHJvdzogJHtjb29yZHNbMF19IGNvbHVtbjogJHtjb29yZHNbMV19IWBcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc3RhdHVzID09PSAnbWlzcycpIHtcbiAgICAgICAgICAgICAgICB0ZXh0Qm94MS50ZXh0Q29udGVudCA9IGBZb3UgYXR0YWNrZWQgcm93OlxuICAgICAgICAgICAgICAgICR7Y29vcmRzWzBdfSBjb2x1bW46ICR7Y29vcmRzWzFdfSBhbmQgbWlzc2VkIWBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHN1bmtTaGlwTWVzc2FnZShzaGlwLCBuYW1lKSB7XG4gICAgICAgIGNvbnN0IHRleHRCb3gxID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRleHQtYm94MScpO1xuICAgICAgICBjb25zdCB0ZXh0Qm94MiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50ZXh0LWJveDInKTtcbiAgICAgICAgY29uc29sZS5sb2coc2hpcCwgbmFtZSlcbiAgICAgICAgaWYgKG5hbWUgIT09ICdQbGF5ZXIgMicpIHtcbiAgICAgICAgICAgIHRleHRCb3gyLnRleHRDb250ZW50ID0gYFlvdXIgJHtzaGlwLm5hbWV9IGhhcyBiZWVuIHN1bmshIWBcbiAgICAgICAgfSBlbHNlIGlmIChuYW1lID09PSAnUGxheWVyIDInKSB7XG4gICAgICAgICAgICB0ZXh0Qm94MS50ZXh0Q29udGVudCA9IGBZb3Ugc3VuayB0aGUgZW5lbXkncyAke3NoaXAubmFtZX0hIWBcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZW5kR2FtZU1lc3NhZ2UobmFtZSkge1xuICAgICAgICBjb25zdCB0ZXh0Qm94MyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50ZXh0LWJveDMnKVxuICAgICAgICAvLyBtYXliZSBwdXQgdHJpZ2dlciBoZXJlIHRvIG1ha2UgYSAncmVzdGFydCBnYW1lJ1xuICAgICAgICAvLyBidXR0b24gdG8gcG9wIHVwXG4gICAgICAgIGlmIChuYW1lID09PSAnUGxheWVyIDInKSB7XG4gICAgICAgICAgICB0ZXh0Qm94My50ZXh0Q29udGVudCA9ICdUaGUgZW5lbXkgZmxlZXQgaGFzIGJlZW4gc2Fuay4gRXhjZWxsZW50IHdvcmsgU29sZGllciEnXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0ZXh0Qm94My50ZXh0Q29udGVudCA9ICdXZSBoYXZlIGxvc3Qgb3VyIGZsZWV0IGFuZCBiZWVuIGRlZmVhdGVkLiBBYm9ydCB0aGUgbWlzc2lvbiEnXG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIHJldHVybiB7bW92ZVJlc3VsdCwgc3Vua1NoaXBNZXNzYWdlLCBlbmRHYW1lTWVzc2FnZX1cbn0iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBgaHRtbCwgYm9keSB7XG4gICAgbWluLWhlaWdodDogMTAwJTtcbiAgICBtaW4td2lkdGg6IDEwMCU7XG4gICAgbWFyZ2luOiAwcHg7XG59XG5cbmJvZHkge1xuICAgIGJhY2tncm91bmQtY29sb3I6IG5hdnk7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xufVxuXG4ucHJvbXB0LWJveCB7XG4gICAgZGlzcGxheTogbm9uZVxufVxuXG4uZ2FtZS1jb250YWluZXIge1xuICAgIGRpc3BsYXk6IGdyaWQ7XG4gICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiAxZnIgNGZyIDEuN2ZyO1xuICAgIGhlaWdodDogMTAwdmg7XG4gICAgd2lkdGg6IDEwMHZ3O1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYig1OSwgNTksIDU5KTtcbn1cblxuLmhlYWRlciB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBncmlkLXJvdzogMSAvIDI7XG59XG5cbi5nYW1lYm9hcmRzIHtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcbiAgICBncmlkLXJvdzogMiAvIDM7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDExNCwgMTU1LCAxNTUpO1xufVxuXG4uZGlhbG9ndWUtY29udGFpbmVyIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgZ3JpZC1yb3c6IDMgLyA0O1xufVxuXG4uZGlhbG9ndWUtYm94IHtcbiAgICBoZWlnaHQ6IDIwdmg7XG4gICAgd2lkdGg6IDUwdnc7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDc3LCAxMzQsIDc3KTtcbn1cblxuXG4vKiBnYW1lYm9hcmQgd3JhcHBlciBzdHlsaW5nICovXG4uYm9hcmQtd3JhcHBlciB7XG4gICAgaGVpZ2h0OiAxMDAlO1xuICAgIHdpZHRoOiA0MDBweDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBiaXNxdWU7XG4gICAgcGFkZGluZzogMCAxNXB4O1xufVxuXG4uYm9hcmQtdGl0bGUge1xuXG59XG5cbi5nYW1lYm9hcmQge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICBoZWlnaHQ6IDQwMHB4O1xuICAgIHdpZHRoOiA0MDBweDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBibHVldmlvbGV0O1xufVxuXG4ucm93IHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIC8qIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47ICovXG4gICAgaGVpZ2h0OiAxMCU7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcGluaztcbn1cblxuLmNlbGwge1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIG1hcmdpbjogMHB4O1xuICAgIGFzcGVjdC1yYXRpbzogMTtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjIxLCAyNDEsIDI0MSk7XG4gICAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XG59XG5cbi5jZWxsLWMge1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIG1hcmdpbjogMHB4O1xuICAgIGFzcGVjdC1yYXRpbzogMTtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjIxLCAyNDEsIDI0MSk7XG4gICAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XG59XG5cbi5jZWxsOmhvdmVyLCAuY2VsbC1jOmhvdmVyIHtcbiAgICAvKiBiYWNrZ3JvdW5kLWNvbG9yOiBhbnRpcXVld2hpdGU7ICovXG59XG5cblxuLyogc3R5bGluZyBmb3IgZGlhbG9ndWUgYm94ICovXG4uZGlhbG9ndWUtY29udGFpbmVyIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgZ3JpZC1yb3c6IDMgLyA0O1xufVxuXG4uZGlhbG9ndWUtYm94IHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1ldmVubHk7XG4gICAgaGVpZ2h0OiAyMHZoO1xuICAgIHdpZHRoOiA0NXZ3O1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYig3NywgMTM0LCA3Nyk7XG59XG5cbi50ZXh0LWJveDEge1xuICAgIGhlaWdodDogNHZoO1xuICAgIHdpZHRoOiA0MHZ3O1xuICAgIGJhY2tncm91bmQtY29sb3I6IGxpZ2h0Ymx1ZTtcbn1cblxuLnRleHQtYm94MiB7XG4gICAgaGVpZ2h0OiA0dmg7XG4gICAgd2lkdGg6IDQwdnc7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogbGlnaHRibHVlO1xufVxuXG4udGV4dC1ib3gzIHtcbiAgICBoZWlnaHQ6IDR2aDtcbiAgICB3aWR0aDogNDB2dztcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBsaWdodGJsdWU7XG59XG5cblxuLyogc3R5bGluZyBmb3IgcmVzZXQgZ2FtZSAqL1xuLmVuZC1nYW1lLWJveCB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICB0b3A6IDI0NXB4O1xuICAgIGxlZnQ6IDA7XG4gICAgcmlnaHQ6IDA7XG4gICAgbWFyZ2luLWxlZnQ6IGF1dG87XG4gICAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xuICAgIHdpZHRoOiAyMjBweDtcbiAgICBoZWlnaHQ6IDIyMHB4O1xuICAgIGJhY2tncm91bmQtY29sb3I6IGF6dXJlO1xufVxuXG4ucmVzZXQtZ2FtZS1idXR0b24ge1xuICAgIGhlaWdodDogNTBweDtcbiAgICB3aWR0aDogNTBweDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTQ0LCA1OCwgNTgpO1xufVxuXG5cbi8qIHN0eWxpbmcgZm9yIHNoaXAgUGxhY2VtZW50ICovXG5cbi52YWxpZC1wbGFjZW1lbnQge1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYigxMTAsIDE4OSwgMTEwKTtcbn1cblxuLmludmFsaWQtcGxhY2VtZW50IHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjQ5LCAxMTYsIDExNik7XG59XG5cbi5wbGFjZWQge1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYig3NiwgNzYsIDExMCk7XG59XG5cbi5yb3RhdGUtc2hpcCB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHRvcDogMzAwcHg7XG4gICAgcmlnaHQ6IDQwJTtcbiAgICBoZWlnaHQ6IDI1cHg7XG4gICAgd2lkdGg6IDYwcHg7XG4gICAgYm9yZGVyOiAycHggc29saWQgb3JhbmdlO1xufWAsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3BhZ2VTdHlsaW5nLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtJQUNJLGdCQUFnQjtJQUNoQixlQUFlO0lBQ2YsV0FBVztBQUNmOztBQUVBO0lBQ0ksc0JBQXNCO0lBQ3RCLGtCQUFrQjtBQUN0Qjs7QUFFQTtJQUNJO0FBQ0o7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsaUNBQWlDO0lBQ2pDLGFBQWE7SUFDYixZQUFZO0lBQ1osaUNBQWlDO0FBQ3JDOztBQUVBO0lBQ0ksYUFBYTtJQUNiLGVBQWU7QUFDbkI7O0FBRUE7SUFDSSxrQkFBa0I7SUFDbEIsYUFBYTtJQUNiLDZCQUE2QjtJQUM3QixlQUFlO0lBQ2Ysb0NBQW9DO0FBQ3hDOztBQUVBO0lBQ0ksYUFBYTtJQUNiLHVCQUF1QjtJQUN2QixtQkFBbUI7SUFDbkIsZUFBZTtBQUNuQjs7QUFFQTtJQUNJLFlBQVk7SUFDWixXQUFXO0lBQ1gsa0NBQWtDO0FBQ3RDOzs7QUFHQSw4QkFBOEI7QUFDOUI7SUFDSSxZQUFZO0lBQ1osWUFBWTtJQUNaLHdCQUF3QjtJQUN4QixlQUFlO0FBQ25COztBQUVBOztBQUVBOztBQUVBO0lBQ0ksYUFBYTtJQUNiLHNCQUFzQjtJQUN0QixhQUFhO0lBQ2IsWUFBWTtJQUNaLDRCQUE0QjtBQUNoQzs7QUFFQTtJQUNJLGFBQWE7SUFDYiw0QkFBNEI7SUFDNUIsV0FBVztJQUNYLFdBQVc7SUFDWCxzQkFBc0I7QUFDMUI7O0FBRUE7SUFDSSxXQUFXO0lBQ1gsV0FBVztJQUNYLGVBQWU7SUFDZixvQ0FBb0M7SUFDcEMsdUJBQXVCO0FBQzNCOztBQUVBO0lBQ0ksV0FBVztJQUNYLFdBQVc7SUFDWCxlQUFlO0lBQ2Ysb0NBQW9DO0lBQ3BDLHVCQUF1QjtBQUMzQjs7QUFFQTtJQUNJLG9DQUFvQztBQUN4Qzs7O0FBR0EsNkJBQTZCO0FBQzdCO0lBQ0ksYUFBYTtJQUNiLHVCQUF1QjtJQUN2QixtQkFBbUI7SUFDbkIsZUFBZTtBQUNuQjs7QUFFQTtJQUNJLGFBQWE7SUFDYixzQkFBc0I7SUFDdEIsNkJBQTZCO0lBQzdCLFlBQVk7SUFDWixXQUFXO0lBQ1gsa0NBQWtDO0FBQ3RDOztBQUVBO0lBQ0ksV0FBVztJQUNYLFdBQVc7SUFDWCwyQkFBMkI7QUFDL0I7O0FBRUE7SUFDSSxXQUFXO0lBQ1gsV0FBVztJQUNYLDJCQUEyQjtBQUMvQjs7QUFFQTtJQUNJLFdBQVc7SUFDWCxXQUFXO0lBQ1gsMkJBQTJCO0FBQy9COzs7QUFHQSwyQkFBMkI7QUFDM0I7SUFDSSxrQkFBa0I7SUFDbEIsYUFBYTtJQUNiLHVCQUF1QjtJQUN2QixtQkFBbUI7SUFDbkIsVUFBVTtJQUNWLE9BQU87SUFDUCxRQUFRO0lBQ1IsaUJBQWlCO0lBQ2pCLGtCQUFrQjtJQUNsQixZQUFZO0lBQ1osYUFBYTtJQUNiLHVCQUF1QjtBQUMzQjs7QUFFQTtJQUNJLFlBQVk7SUFDWixXQUFXO0lBQ1gsa0NBQWtDO0FBQ3RDOzs7QUFHQSwrQkFBK0I7O0FBRS9CO0lBQ0ksb0NBQW9DO0FBQ3hDOztBQUVBO0lBQ0ksb0NBQW9DO0FBQ3hDOztBQUVBO0lBQ0ksa0NBQWtDO0FBQ3RDOztBQUVBO0lBQ0ksa0JBQWtCO0lBQ2xCLFVBQVU7SUFDVixVQUFVO0lBQ1YsWUFBWTtJQUNaLFdBQVc7SUFDWCx3QkFBd0I7QUFDNUJcIixcInNvdXJjZXNDb250ZW50XCI6W1wiaHRtbCwgYm9keSB7XFxuICAgIG1pbi1oZWlnaHQ6IDEwMCU7XFxuICAgIG1pbi13aWR0aDogMTAwJTtcXG4gICAgbWFyZ2luOiAwcHg7XFxufVxcblxcbmJvZHkge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBuYXZ5O1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxufVxcblxcbi5wcm9tcHQtYm94IHtcXG4gICAgZGlzcGxheTogbm9uZVxcbn1cXG5cXG4uZ2FtZS1jb250YWluZXIge1xcbiAgICBkaXNwbGF5OiBncmlkO1xcbiAgICBncmlkLXRlbXBsYXRlLXJvd3M6IDFmciA0ZnIgMS43ZnI7XFxuICAgIGhlaWdodDogMTAwdmg7XFxuICAgIHdpZHRoOiAxMDB2dztcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDU5LCA1OSwgNTkpO1xcbn1cXG5cXG4uaGVhZGVyIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZ3JpZC1yb3c6IDEgLyAyO1xcbn1cXG5cXG4uZ2FtZWJvYXJkcyB7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XFxuICAgIGdyaWQtcm93OiAyIC8gMztcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDExNCwgMTU1LCAxNTUpO1xcbn1cXG5cXG4uZGlhbG9ndWUtY29udGFpbmVyIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGdyaWQtcm93OiAzIC8gNDtcXG59XFxuXFxuLmRpYWxvZ3VlLWJveCB7XFxuICAgIGhlaWdodDogMjB2aDtcXG4gICAgd2lkdGg6IDUwdnc7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYig3NywgMTM0LCA3Nyk7XFxufVxcblxcblxcbi8qIGdhbWVib2FyZCB3cmFwcGVyIHN0eWxpbmcgKi9cXG4uYm9hcmQtd3JhcHBlciB7XFxuICAgIGhlaWdodDogMTAwJTtcXG4gICAgd2lkdGg6IDQwMHB4O1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBiaXNxdWU7XFxuICAgIHBhZGRpbmc6IDAgMTVweDtcXG59XFxuXFxuLmJvYXJkLXRpdGxlIHtcXG5cXG59XFxuXFxuLmdhbWVib2FyZCB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIGhlaWdodDogNDAwcHg7XFxuICAgIHdpZHRoOiA0MDBweDtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogYmx1ZXZpb2xldDtcXG59XFxuXFxuLnJvdyB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIC8qIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47ICovXFxuICAgIGhlaWdodDogMTAlO1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcGluaztcXG59XFxuXFxuLmNlbGwge1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgbWFyZ2luOiAwcHg7XFxuICAgIGFzcGVjdC1yYXRpbzogMTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDIyMSwgMjQxLCAyNDEpO1xcbiAgICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcXG59XFxuXFxuLmNlbGwtYyB7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBtYXJnaW46IDBweDtcXG4gICAgYXNwZWN0LXJhdGlvOiAxO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjIxLCAyNDEsIDI0MSk7XFxuICAgIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xcbn1cXG5cXG4uY2VsbDpob3ZlciwgLmNlbGwtYzpob3ZlciB7XFxuICAgIC8qIGJhY2tncm91bmQtY29sb3I6IGFudGlxdWV3aGl0ZTsgKi9cXG59XFxuXFxuXFxuLyogc3R5bGluZyBmb3IgZGlhbG9ndWUgYm94ICovXFxuLmRpYWxvZ3VlLWNvbnRhaW5lciB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBncmlkLXJvdzogMyAvIDQ7XFxufVxcblxcbi5kaWFsb2d1ZS1ib3gge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWV2ZW5seTtcXG4gICAgaGVpZ2h0OiAyMHZoO1xcbiAgICB3aWR0aDogNDV2dztcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDc3LCAxMzQsIDc3KTtcXG59XFxuXFxuLnRleHQtYm94MSB7XFxuICAgIGhlaWdodDogNHZoO1xcbiAgICB3aWR0aDogNDB2dztcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogbGlnaHRibHVlO1xcbn1cXG5cXG4udGV4dC1ib3gyIHtcXG4gICAgaGVpZ2h0OiA0dmg7XFxuICAgIHdpZHRoOiA0MHZ3O1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBsaWdodGJsdWU7XFxufVxcblxcbi50ZXh0LWJveDMge1xcbiAgICBoZWlnaHQ6IDR2aDtcXG4gICAgd2lkdGg6IDQwdnc7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IGxpZ2h0Ymx1ZTtcXG59XFxuXFxuXFxuLyogc3R5bGluZyBmb3IgcmVzZXQgZ2FtZSAqL1xcbi5lbmQtZ2FtZS1ib3gge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICB0b3A6IDI0NXB4O1xcbiAgICBsZWZ0OiAwO1xcbiAgICByaWdodDogMDtcXG4gICAgbWFyZ2luLWxlZnQ6IGF1dG87XFxuICAgIG1hcmdpbi1yaWdodDogYXV0bztcXG4gICAgd2lkdGg6IDIyMHB4O1xcbiAgICBoZWlnaHQ6IDIyMHB4O1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBhenVyZTtcXG59XFxuXFxuLnJlc2V0LWdhbWUtYnV0dG9uIHtcXG4gICAgaGVpZ2h0OiA1MHB4O1xcbiAgICB3aWR0aDogNTBweDtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDE0NCwgNTgsIDU4KTtcXG59XFxuXFxuXFxuLyogc3R5bGluZyBmb3Igc2hpcCBQbGFjZW1lbnQgKi9cXG5cXG4udmFsaWQtcGxhY2VtZW50IHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDExMCwgMTg5LCAxMTApO1xcbn1cXG5cXG4uaW52YWxpZC1wbGFjZW1lbnQge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjQ5LCAxMTYsIDExNik7XFxufVxcblxcbi5wbGFjZWQge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoNzYsIDc2LCAxMTApO1xcbn1cXG5cXG4ucm90YXRlLXNoaXAge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHRvcDogMzAwcHg7XFxuICAgIHJpZ2h0OiA0MCU7XFxuICAgIGhlaWdodDogMjVweDtcXG4gICAgd2lkdGg6IDYwcHg7XFxuICAgIGJvcmRlcjogMnB4IHNvbGlkIG9yYW5nZTtcXG59XCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdO1xuXG4gIC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9O1xuXG4gIC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vcGFnZVN0eWxpbmcuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9wYWdlU3R5bGluZy5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gdXBkYXRlcjtcbn1cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTtcblxuICAgIC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuICBjc3MgKz0gb2JqLmNzcztcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfVxuXG4gIC8vIEZvciBvbGQgSUVcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHJldHVybiB7XG4gICAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZSgpIHt9LFxuICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7fVxuICAgIH07XG4gIH1cbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5jID0gdW5kZWZpbmVkOyIsImltcG9ydCAnLi9wYWdlU3R5bGluZy5jc3MnO1xuaW1wb3J0IHsgZ2FtZUJvYXJkQ29udHJvbGxlciB9IGZyb20gXCIuL2dhbWVib2FyZENvbnRyb2xsZXJcIjtcbmltcG9ydCB7IGluaXRpYWxpemVHYW1lIH0gZnJvbSBcIi4vZ2FtZUxvb3BcIjtcblxuXG5cbmluaXRpYWxpemVHYW1lKCkiXSwibmFtZXMiOlsiUGxheWVyIiwidXNlclBsYXllciIsImNvbXB1dGVyUGxheWVyIiwiZ2FtZUJvYXJkQ29udHJvbGxlciIsImNyZWF0ZUZsZWV0IiwiY3JlYXRlT3BwRmxlZXQiLCJkb21NYW5pcHVsYXRpb24iLCJodW1hblNoaXBQbGFjZW1lbnQiLCJpbml0aWFsaXplR2FtZSIsImNyZWF0ZUdhbWUiLCJydW5ET00iLCJodW1hblBsYXllciIsImh1bWFuRmxlZXQiLCJjb25zb2xlIiwibG9nIiwiZ2FtZUJvYXJkIiwicGxheWVyIiwiaHVtYW5Cb2FyZCIsImNyZWF0ZUJvYXJkIiwiQUlwbGF5ZXIiLCJjb21wdXRlckZsZWV0IiwiY29tcHV0ZXJCb2FyZCIsInJlbmRlclN0YXJ0IiwicmVuZGVyR2FtZUJvYXJkIiwicmVuZGVyRGlhbG9ndWVCb3giLCJodW1hblBsYWNlbWVudCIsInJlc2V0SW50ZXJmYWNlIiwiYm9keUUiLCJlbmRCb3giLCJwbGF5ZXJCb2FyZHMiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJkaWFsb2d1ZUNvbnRhaW5lciIsImdhbWVCb2FyZFdyYXBwZXJzIiwicXVlcnlTZWxlY3RvckFsbCIsImRpYWxvZ3VlQm94IiwiZm9yRWFjaCIsImVsZW1lbnQiLCJyZW1vdmVDaGlsZCIsIlNoaXAiLCJkaWFsb2d1ZUNvbnRyb2xsZXIiLCJkaWFsb2d1ZVJlZnJlc2giLCJmbGVldCIsIm5hbWUiLCJwbGF5ZXJOYW1lIiwiYm9hcmQiLCJzaGlwcyIsImkiLCJqIiwicGxhY2VIb3Jpem9udGFsU2hpcCIsInJvdyIsImNvbCIsInNoaXAiLCJsZW5ndGgiLCJuZXdDb29yZHMiLCJjb29yZHMiLCJwdXNoIiwicGxhY2VWZXJ0aWNhbFNoaXAiLCJyZWNpZXZlQXR0YWNrIiwiYXR0YWNrU3RhdHVzIiwiY2hlY2tJZlVzZWQiLCJjb29yZCIsImhpdCIsInVwZGF0ZUJvYXJkU3BvdCIsIm1vdmVSZXN1bHQiLCJzdW5rQ2hlY2siLCJjaGVja0lmU3VuayIsInN1bmtTaGlwTWVzc2FnZSIsInNwbGljZSIsImNoZWNrQWxsU3VuayIsImVuZEdhbWVNZXNzYWdlIiwiZW5kR2FtZSIsInVzZUdyaWRTcG90IiwiZnJlZXplR3JpZCIsInJlbmRlckVuZEdhbWUiLCJjb25zdHJ1Y3RvciIsInZpc2l0ZWQiLCJwaWNrUmFuZG9tQ2VsbCIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsImNvbHVtbiIsImNvbXBDb29yZHMiLCJyZXBlYXRCb29sZWFuIiwiY2hlY2tSZXBlYXRDZWxsIiwic3RyaW5nZWRDb29yZHMiLCJKU09OIiwic3RyaW5naWZ5IiwiZXhpc3RzQm9vbGVhbiIsInNvbWUiLCJoaXRzIiwiaXNTdW5rIiwiYm9hcmRSdW4iLCJjYXJyaWVyIiwiYmF0dGxlc2hpcCIsImRlc3Ryb3llciIsInN1Ym1hcmluZSIsInBhdHJvbEJvYXQiLCJyb3RhdGVCdXR0b24iLCJvY2N1cGllZENlbGxzIiwiY3VycmVudFBsYW5lIiwiY3JlYXRlUm90YXRpb25BYmlsaXR5IiwiaHVtYW5DZWxscyIsInNoaXBJbmRleCIsImNlbGwiLCJhZGRFdmVudExpc3RlbmVyIiwiY2VsbEhvdmVyIiwiY2xhc3NMaXN0IiwiY29udGFpbnMiLCJwbGFjZUhvcml6b250YWxseSIsImNvb3JkaW5hdGVzIiwiYWN0aXZlQ2VsbHMiLCJwbGFjZVZlcnRpY2FsbHkiLCJjZWxsQ29vcmRzIiwiZ3JvdXBlZENlbGxzIiwiY2VsbFJvdyIsImNlbGxDb2x1bW4iLCJhY3RpdmVDZWxsIiwiZ2V0RWxlbWVudEJ5SWQiLCJjb25mbGljdGluZyIsImNoZWNrQ29uZmxpY3RpbmdTaGlwcyIsImVsZW0iLCJhZGQiLCJyZW1vdmUiLCJjaGVja0ZvclJlcGVhdCIsImFscmVhZHlVc2VkIiwibmV3UGxhbmUiLCJzd2l0Y2hQbGFuZSIsImNvbXB1dGVyUGxhY2VtZW50IiwiY29tcHV0ZXJNb3ZlcyIsInJvdGF0ZVNoaXBCdXR0b24iLCJjcmVhdGVFbGVtZW50IiwiYXBwZW5kRWxlbWVudCIsInRleHRDb250ZW50IiwiYm9hcmRDb250cm9sbGVyIiwiaXNDb21wdXRlciIsImdhbWVCb2FyZFdyYXBwZXIiLCJib2FyZFRpdGxlIiwiZ2FtZWJvYXJkIiwiYnVpbGRHcmlkIiwic2V0R3JpZFRyaWdnZXJzIiwiZ2FtZWJvYXJkRWxlbWVudCIsInNldEF0dHJpYnV0ZSIsImNvbXB1dGVyQm9hcmRDb250cm9sbGVyIiwiaHVtYW5Cb2FyZENvbnRyb2xsZXIiLCJjZWxscyIsInN0YXR1cyIsInVzZWRDZWxsIiwic3R5bGUiLCJwb2ludGVyRXZlbnRzIiwidGV4dEJveDEiLCJ0ZXh0Qm94MiIsInRleHRCb3gzIiwiYm9keUVsZW1lbnQiLCJib2R5IiwiZW5kR2FtZUJveCIsImVuZEdhbWVJY29uIiwicmVzZXRHYW1lQnV0dG9uIiwiZWxlbWVudE5hbWUiLCJjbGFzc05hbWUiLCJmYXRoZXJFbGVtZW50IiwiYXBwZW5kQ2hpbGQiLCJhcmd1bWVudHMiLCJ1bmRlZmluZWQiXSwic291cmNlUm9vdCI6IiJ9