// create both the user player and the computer player here

// computer player has attack coordinates generator function
import { gameBoardController } from "./gameboardController";

export class Player {
    constructor(player, gameBoard) {
        this.player = player;
        // this.playerShips = []
        this.gameBoard= null
    }
}


export const userPlayer = function () {

}

export const computerPlayer = function () {

    function pickRandomCell(humanBoard) {
        console.log(humanBoard);
        const row = Math.floor(Math.random() * 10) + 1
        const column = Math.floor(Math.random() * 10) + 1

        const compCoords = [row, column];
        console.log(compCoords)

        humanBoard.recieveAttack(compCoords);

        return compCoords

    }

    return {pickRandomCell}
}