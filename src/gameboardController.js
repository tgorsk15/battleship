/* eslint-disable no-use-before-define */
/* eslint-disable no-else-return */
/* eslint-disable no-loop-func */
/* eslint-disable no-plusplus */
/* eslint-disable import/prefer-default-export */
import { domManipulation, dialogueController } from "./userInterface";


const runDOM = domManipulation();
const dialogueRefresh = dialogueController();

export function gameBoardController(fleet, name) {
    const playerName = name;
    const board = [];
    const ships = fleet;


    function createBoard() {
        for (let i = 0; i < 10; i++) {
            board[i] = [];

            for (let j = 0; j < 10; j++) {
                board[i][j] = false
            }
        }
        // console.log(board);
        return board
    }

    function placeHorizontalShip(row, col, ship) {
        for (let i = 0; i < ship.length; i++) {
            const newCoords = [row, col + i];
            ship.coords.push(newCoords)
        }
        console.log(ship.name);
        console.log(ship.coords);
        return ship
    }

    function placeVerticalShip(row, col, ship) {
        for (let i = 0; i < ship.length; i++) {
            const newCoords = [row + i, col];
            ship.coords.push(newCoords);
        }
        console.log(ship.name);
        console.log(ship.coords);
        return ship
    }
    
    function recieveAttack(coords) {
        console.log(coords)
        let attackStatus = 'miss';

        // check to see if coords have already been used:
        if (checkIfUsed(coords) === true) {
            return 'filled already'
        }

        for (let i = 0; i < ships.length; i++) {
            ships[i].coords.forEach((coord) => {
                
                if (checkIfUsed(coords) === true) {
                    return 'filled already'
                }

                if (coord[0] === coords[0] && coord[1] === coords[1]) {
                    console.log('hit');
                    attackStatus = 'hit'
                    ships[i].hit();
                    updateBoardSpot(coords);
                    dialogueRefresh.moveResult(attackStatus,
                        playerName, coords, ships[i])

                    const sunkCheck = ships[i].checkIfSunk()
                    if (sunkCheck) {
                        dialogueRefresh.sunkShipMessage(ships[i], playerName)
                        ships.splice(i, 1);
                        checkAllSunk()
                    }
                    return false
                }
            })
        }
        updateBoardSpot(coords, attackStatus);
        if (attackStatus === 'miss') {
            dialogueRefresh.moveResult(attackStatus,
                playerName, coords)
        }
        
        return attackStatus
    }

    function checkAllSunk() {
        if (ships.length === 0) {
            dialogueRefresh.endGameMessage(playerName)
            endGame()
            return true
        } else {
            return false
        }
    }

    function updateBoardSpot(coords, attackStatus) {
        board[coords[0] - 1][coords[1] - 1] = true;
        runDOM.useGridSpot(coords, attackStatus, playerName)
        return board
    }

    function checkIfUsed(coords) {
        if (board[coords[0] - 1][coords[1] - 1] === true) {
            return true
        }
        return false
        
    }

    function endGame() {
        // disable gameBoards and trigger restart button
        runDOM.freezeGrid();
        runDOM.renderEndGame();
    }

    return { createBoard, placeHorizontalShip, placeVerticalShip, recieveAttack,
    checkAllSunk, updateBoardSpot, checkIfUsed, endGame }
}

