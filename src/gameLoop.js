/* eslint-disable import/prefer-default-export */
import { Player, userPlayer, computerPlayer } from "./player";
import { gameBoardController } from "./gameboardController";

export const initializeGame = function createGame() {
    const humanPlayer = new Player
    let humanBoard = humanPlayer.gameBoard;
    humanBoard = gameBoardController();
    humanBoard.createBoard();
}