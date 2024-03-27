/* eslint-disable no-use-before-define */
/* eslint-disable no-else-return */
/* eslint-disable no-loop-func */
/* eslint-disable no-plusplus */
/* eslint-disable import/prefer-default-export */

// need to create a board that is 10 x 10 ... board controller should get
// run twice to create eachplayer's board

// gameBoard should check if a game is over by seeing if the
// length of "ships" is zero (checkAllSunk)

// placing ships vertically... possible idea: have a column number (e.g 3)
// that you use to select the corresponding array item in each
// of the arrays that represents a row on the board
import { Ship, createFleet } from "./ship-object"


export function gameBoardController() {
    // const alphabet = ['a','b','c','d','e','f','g','h','i','j']
    const board = [];
    const ships = [];

    createFleet(ships);
    // console.log(ships);


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
        // const ship = new Ship(size);

        for (let i = 0; i < ship.length; i++) {
            const newCoords = [row, col + i];
            ship.coords.push(newCoords)
        }
        // ships.push(ship);
        return ship
    }

    function placeVerticalShip(row, col, ship) {
        console.log(ship);

        for (let i = 0; i < ship.length; i++) {
            const newCoords = [row + i, col];
            ship.coords.push(newCoords);
        }
        // ships.push(ship);
        return ship
    }
    
    function recieveAttack(coords) {
        let attackStatus = 'miss';

        // check to see if coords have already been used:
        if (checkIfUsed(coords) === true) {
            return 'filled already'
        }

        for (let i = 0; i < ships.length; i++) {
            ships[i].coords.every(coord => {
                if (coord[0] === coords[0] && coord[1] === coords[1]) {
                    console.log('hit');
                    attackStatus = 'hit'
                    ships[i].hit()

                    const sunkCheck = ships[i].checkIfSunk()
                    if (sunkCheck) {
                        ships.splice(i, 1);
                        checkAllSunk()
                    }
                    return false
                }
            })
        }
        updateBoardSpot(coords);
        return attackStatus
    }

    function checkAllSunk() {
        console.log(ships)
        if (ships.length === 0) {
            console.log('player defeated');
            return true
        } else {
            return false
        }
    }

    function updateBoardSpot(coords) {
        board[coords[0] - 1][coords[1] - 1] = true;
        // console.log(board)
        return board
    }

    function checkIfUsed(coords) {
        console.log(board[coords[0] - 1][coords[1] - 1])
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

