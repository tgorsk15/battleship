/* eslint-disable no-loop-func */
/* eslint-disable no-plusplus */
/* eslint-disable import/prefer-default-export */

// need to create a board that is 10 x 10 ... board controller should get
// run twice to create eachplayer's board
// should board be a graph??

// gameBoard should check if a game is over by seeing if the
// total amount of 'hits' or 'trues' equals the total length
// of ships that are on the board

// placing ships vertically... possible idea: have a column number (e.g 3)
// that you use to select the corresponding array item in each
// of the arrays that represents a row on the board
import { Ship } from "./ship-object"


export function gameBoardController() {
    // const alphabet = ['a','b','c','d','e','f','g','h','i','j']
    const board = [];
    const ships = [];

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

    function placeHorizontalShip(row, col, size) {
        // maybe make a separate function that determines the END POINT of
        // the ship, given the starting row and column positions, as well
        // as the length ... or maybe keep it in house here since 
        // horizontal is dfferent from vertical

        // need to store the memory of the ships coordinates somewhere,
        // potentially in the Ship class
        const ship = new Ship(size);

        for (let i = 0; i < size; i++) {
            const newCoords = [row, col + i];
            ship.coords.push(newCoords)
        }
        ships.push(ship);
        console.log(ships);
        console.log(ship)
        return ship
    }

    function placeVerticalShip(row, col, size) {
        // maybe make a separate function that determines the END POINT of
        // the ship, given the starting row and column positions
        // as the length ... or maybe keep it in house here since 
        // horizontal is idfferent from vertical
        const ship = new Ship(size);

        for (let i = 0; i < size; i++) {
            const newCoords = [row + i, col];
            ship.coords.push(newCoords);
        }
        ships.push(ship);
        console.log(ships);
        console.log(ship)
        return ship
    }
    
    function recieveAttack(coords) {
        let attackStatus = 'miss';
        for (let i = 0; i < ships.length; i++) {
            ships[i].coords.every(coord => {
                if (coord[0] === coords[0] && coord[1] === coords[1]) {
                    console.log('hit');
                    attackStatus = 'hit'
                    return false
                }
            })
        }
        return attackStatus
    }



    return { createBoard, placeHorizontalShip, placeVerticalShip, recieveAttack }
}

