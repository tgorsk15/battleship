/* eslint-disable import/prefer-default-export */
import { Player, userPlayer, computerPlayer } from "./player";
import { gameBoardController } from "./gameboardController";
import { createFleet, createOppFleet } from "./ship-object";
import { domManipulation } from "./userInterface";

export const initializeGame = function createGame() {
    const runDOM = domManipulation();

    const humanPlayer = new Player('Player 1')
    const humanFleet = createFleet()
    humanPlayer.gameBoard = gameBoardController(humanFleet);
    const humanBoard = humanPlayer.gameBoard
    runDOM.renderGameBoard(humanBoard.createBoard(), humanPlayer.player);


    const AIplayer = new Player('Player 2');
    const computerFleet = createOppFleet();
    AIplayer.gameBoard = gameBoardController(computerFleet);
    const computerBoard = AIplayer.gameBoard;
    computerBoard.createBoard();
    // render gameBoard here

    // call render dialogue box here
}