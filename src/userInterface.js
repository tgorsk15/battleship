/* eslint-disable import/prefer-default-export */
import { computerPlayer } from "./player";

const computerMoves = computerPlayer()


export const domManipulation = function () {
    const playerBoards = document.querySelector('.gameboards');
    const dialogueContainer = document.querySelector('.dialogue-container')

    function renderGameBoard(boardController, playerName, humanBoard) {
        let isComputer = false;
        if (playerName === 'Player 2') {
            isComputer = true
        }
        console.log(isComputer);

        const gameBoardWrapper = document.createElement('div');
        appendElement(gameBoardWrapper, 'board-wrapper', playerBoards)
       
        const boardTitle = document.createElement('h2');
        appendElement(boardTitle, 'board-title', gameBoardWrapper);
        boardTitle.textContent = playerName;

        // render board:
        const gameboard = document.createElement('div');
        appendElement(gameboard, 'gameboard', gameBoardWrapper);

        buildGrid(gameboard, isComputer);
        
        if (isComputer === false) {
            console.log('triggered')
            setGridTriggers(boardController, humanBoard);
        }
        

    }

    function buildGrid(gameboardElement, isComputer) {
        for (let i = 1; i < 11; i++) {
            const row = document.createElement('div');
            appendElement(row, 'row', gameboardElement);

            for (let j = 1; j < 11; j++) {
                const cell = document.createElement('div');
                cell.coordinates = [i, j];
                // console.log(cell.coordinates)
                if (isComputer === true) {
                    appendElement(cell, 'cell-c', row);
                    cell.setAttribute('id', `${i} ${j}c`)
                } else {
                   appendElement(cell, 'cell', row);
                   cell.setAttribute('id', `${i} ${j}h`) 
                }
                
            }
        }

    }

    function setGridTriggers(computerBoardController, humanBoardController) {
        const cells = document.querySelectorAll('.cell-c');
        // console.log(cells);
        cells.forEach((cell) => {
            cell.addEventListener('click', () => {
                console.log(cell.coordinates);
                computerBoardController.recieveAttack(cell.coordinates);
                // need to trigger recieveAttack on the correct
                // game board 
                // need to trigger computer's attack in response
                console.log(humanBoardController);
                computerMoves.pickRandomCell(humanBoardController);
                // humanBoardController.recieveAttack(cp);
            })
        })
            
    }

    function useGridSpot(coords, status, name) {
        // registers that teh grid spot was used, and displays
        // either a hit or miss

        if (name === 'Player 2') {
            console.log(status);
            const usedCell = document.getElementById(
                `${coords[0]} ${coords[1]}c`)

            if (status === 'hit') {
                usedCell.textContent = 'X'
            } else if (status === 'miss') {
                usedCell.textContent = 'O'
            }

        } else {
            console.log(status);
            const usedCell = document.getElementById(
                `${coords[0]} ${coords[1]}h`)

            if (status === 'hit') {
                usedCell.textContent = 'X'
            } else if (status === 'miss') {
                usedCell.textContent = 'O'
            }
        }
    }

    function renderDialogueBox() {
        const dialogueBox = document.createElement('div');
        appendElement(dialogueBox, 'dialogue-box', dialogueContainer)
    }

    function appendElement(elementName, className, fatherElement ) {
        elementName.classList.add(className);
        fatherElement.appendChild(elementName);

        return elementName;
    }

    return {renderGameBoard, appendElement, buildGrid,
        setGridTriggers, useGridSpot, renderDialogueBox}

}