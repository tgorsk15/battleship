/* eslint-disable import/prefer-default-export */
import { Player, userPlayer, computerPlayer } from "./player";
import { gameBoardController } from "./gameboardController";
import { createFleet, createOppFleet } from "./ship-object";
import { domManipulation } from "./userInterface";
import { humanShipPlacement, computerPlacement } from "./shipPlacement";

export const initializeGame = function createGame() {
    const runDOM = domManipulation();

    const humanPlayer = new Player('Player 1')
    const humanFleet = createFleet()
    console.log(humanFleet)
    humanPlayer.gameBoard = gameBoardController(humanFleet, humanPlayer.player);
    const humanBoard = humanPlayer.gameBoard
    humanBoard.createBoard();
    

    const AIplayer = new Player('Player 2');
    const computerFleet = createOppFleet();
    AIplayer.gameBoard = gameBoardController(computerFleet, AIplayer.player);
    const computerBoard = AIplayer.gameBoard;
    computerBoard.createBoard();

    runDOM.renderStart();
    runDOM.renderGameBoard(computerBoard.createBoard(), AIplayer.player);
    runDOM.renderGameBoard(computerBoard, humanPlayer.player, humanBoard);
    
    // call render dialogue box here
    runDOM.renderDialogueBox();

    // call computerPlacement to set up computer's chips:
    const computerPlacements = computerPlacement(computerBoard, computerFleet);
    
    // call shipPlacement function here for humanBoard
    const humanPlacement = humanShipPlacement(humanBoard, humanFleet);

   
}

export const resetInterface = function (bodyE, endBox) {
    console.log('reseting all this shit');
    const playerBoards = document.querySelector('.gameboards');
    const dialogueContainer = document.querySelector('.dialogue-container');
    const dialogueBox = document.querySelector('.dialogue-box');
    const gameBoardWrappers = document.querySelectorAll('.board-wrapper');

    const rotateShipButton = document.querySelector('.rotate-ship');


    gameBoardWrappers.forEach((element) => {
        playerBoards.removeChild(element);
    });
    playerBoards.removeChild(rotateShipButton);

    dialogueContainer.removeChild(dialogueBox);
    bodyE.removeChild(endBox);

    initializeGame();

}