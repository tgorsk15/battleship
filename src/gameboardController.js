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
import { Ship, createFleet } from "./ship-object"
import { domManipulation } from "./userInterface";

const runDOM = domManipulation();

export function gameBoardController(fleet, name) {
    const playerName = name;
    const board = [];
    const ships = fleet;

    console.log(ships);


    function createBoard() {
        for (let i = 0; i < 10; i++) {
            board[i] = [];

            for (let j = 0; j < 10; j++) {
                board[i][j] = false
            }
        }
        console.log(board);
        return board
    }

    function placeHorizontalShip(row, col, ship) {
        for (let i = 0; i < ship.length; i++) {
            const newCoords = [row, col + i];
            // put a check here to see if this conflicts with
            // any other ship's coords 
            ship.coords.push(newCoords)
        }
        return ship
    }

    function placeVerticalShip(row, col, ship) {
        for (let i = 0; i < ship.length; i++) {
            const newCoords = [row + i, col];
            // put a check here to see if this conflicts with
            // any other ship's coords 
            ship.coords.push(newCoords);
        }
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
                    console.log([coord[0], coord[1]])
                    console.log('hit');
                    attackStatus = 'hit'
                    ships[i].hit();
                    updateBoardSpot(coords);

                    const sunkCheck = ships[i].checkIfSunk()
                    if (sunkCheck) {
                        ships.splice(i, 1);
                        checkAllSunk()
                    }
                    return false
                }
            })
        }
        updateBoardSpot(coords, attackStatus);
        return attackStatus
    }

    function checkAllSunk() {
        console.log(ships)
        console.log(board)
        if (ships.length === 0) {
            console.log('player defeated');
            return true
        } else {
            return false
        }
    }

    function updateBoardSpot(coords, attackStatus) {
        board[coords[0] - 1][coords[1] - 1] = true;
        // console.log(board)
        runDOM.useGridSpot(coords, attackStatus, playerName)
        return board
    }

    function checkIfUsed(coords) {
        // console.log(board[coords[0] - 1][coords[1] - 1])
        if (board[coords[0] - 1][coords[1] - 1] === true) {
            console.log('already used')
            return true
        }
        return false
        
    }

    // likely will have to implement check to make sure a ship can
    // be placed with no overlap
    console.log('board exists');


    return { createBoard, placeHorizontalShip, placeVerticalShip, recieveAttack,
    checkAllSunk, updateBoardSpot, checkIfUsed }
}

