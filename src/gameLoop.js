/* eslint-disable import/prefer-default-export */
import { Player, userPlayer, computerPlayer } from "./player";
import { gameBoardController } from "./gameboardController";
import { createFleet } from "./ship-object"

export const initializeGame = function createGame() {
    const humanPlayer = new Player
    const humanFleet = createFleet()
    console.log(humanFleet)
    console.log('creating first board')
    humanPlayer.gameBoard = gameBoardController(humanFleet);
    const humanBoard = humanPlayer.gameBoard
    humanBoard.createBoard();

}