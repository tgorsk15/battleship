/* eslint-disable import/prefer-default-export */
import { Player } from "./player";
import { gameBoardController } from "./gameboardController";
import { createFleet, createOppFleet } from "./ship-object";
import { domManipulation, dialogueController } from "./userInterface";
import { humanShipPlacement, computerPlacement } from "./shipPlacement";

export const initializeGame = function createGame() {
    const runDOM = domManipulation();


    const humanPlayer = new Player('User')
    const humanFleet = createFleet()
    console.log(humanFleet)
    humanPlayer.gameBoard = gameBoardController(humanFleet, humanPlayer.player);
    const humanBoard = humanPlayer.gameBoard
    humanBoard.createBoard();
    

    const AIplayer = new Player('Enemy');
    const computerFleet = createOppFleet();
    console.log(computerFleet);
    AIplayer.gameBoard = gameBoardController(computerFleet, AIplayer.player);
    const computerBoard = AIplayer.gameBoard;
    computerBoard.createBoard();

    runDOM.renderStart();
    runDOM.renderGameBoard(computerBoard.createBoard(), AIplayer.player);
    runDOM.renderGameBoard(computerBoard, humanPlayer.player, humanBoard);
    
    // call render dialogue box here
    const creatDialogue = runDOM.renderDialogueBox();
    const dialogue = dialogueController()
    dialogue.placeShipsMessage()

    // call computerPlacement to set up computer's chips:
    const computerPlacements = computerPlacement(computerBoard, computerFleet);
    
    // call shipPlacement function here for humanBoard
    const humanPlacement = humanShipPlacement(humanBoard, humanFleet);

   
}

export const resetInterface = function (resetButton) {
    const playerBoards = document.querySelector('.gameboards');
    const dialogueContainer = document.querySelector('.dialogue-container');
    const dialogueBox = document.querySelector('.dialogue-box');
    const gameBoardWrappers = document.querySelectorAll('.board-wrapper');


    gameBoardWrappers.forEach((element) => {
        playerBoards.removeChild(element);
    });

    dialogueContainer.removeChild(dialogueBox);
    playerBoards.removeChild(resetButton)

    initializeGame();

}