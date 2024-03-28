/* eslint-disable import/prefer-default-export */
import { Player, userPlayer, computerPlayer } from "./player";
import { gameBoardController } from "./gameboardController";
import { createFleet, createOppFleet } from "./ship-object"

export const initializeGame = function createGame() {
    const humanPlayer = new Player
    const humanFleet = createFleet()
    humanPlayer.gameBoard = gameBoardController(humanFleet);
    const humanBoard = humanPlayer.gameBoard
    humanBoard.createBoard();

    const AIplayer = new Player;
    const computerFleet = createOppFleet();
    AIplayer.gameBoard = gameBoardController(computerFleet);
    const computerBoard = AIplayer.gameBoard;
    computerBoard.createBoard();

    // call renderGameBoard function here?
}