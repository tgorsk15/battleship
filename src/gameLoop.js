/* eslint-disable import/prefer-default-export */
import { Player, userPlayer, computerPlayer } from "./player";
import { gameBoardController } from "./gameboardController";
import { createFleet, createOppFleet } from "./ship-object";
import { domManipulation } from "./userInterface";

export const initializeGame = function createGame() {
    const runDOM = domManipulation();

    const humanPlayer = new Player('Player 1')
    const humanFleet = createFleet()
    humanPlayer.gameBoard = gameBoardController(humanFleet, humanPlayer.player);
    const humanBoard = humanPlayer.gameBoard
    humanBoard.createBoard();
    



    const AIplayer = new Player('Player 2');
    const computerFleet = createOppFleet();
    AIplayer.gameBoard = gameBoardController(computerFleet, AIplayer.player);
    const computerBoard = AIplayer.gameBoard;
    computerBoard.createBoard();

    
    runDOM.renderGameBoard(computerBoard.createBoard(), AIplayer.player);
    runDOM.renderGameBoard(computerBoard, humanPlayer.player, humanBoard);
    
    // call render dialogue box here
    runDOM.renderDialogueBox();
}

export const resetInterface = function () {

}