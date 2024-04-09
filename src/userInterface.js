/* eslint-disable import/prefer-default-export */
import hitIcon from "./icons/hit.png";
import missIcon from "./icons/miss.png";

import { computerPlayer } from "./player";
import { resetInterface } from "./gameLoop";


export const domManipulation = function () {
    const computerMoves = computerPlayer()

    const playerBoards = document.querySelector('.gameboards');
    const dialogueContainer = document.querySelector('.dialogue-container')

    function renderStart() {
        const startGameButton = document.createElement('button');
        appendElement(startGameButton, 'start-game-button', playerBoards);
        startGameButton.textContent = 'Start Firing!'
        startGameButton.style.display = 'none';

    }

    function renderGameBoard(boardController, playerName, humanBoard) {
        let isComputer = false;
        if (playerName === 'Enemy') {
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
            const rotateShipButton = document.createElement('button');
            appendElement(rotateShipButton, 'rotate-ship', gameBoardWrapper);
            rotateShipButton.textContent = 'Rotate';        

            setGridTriggers(boardController, humanBoard);

        } else {
            gameboard.style.pointerEvents = 'none'
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
        cells.forEach((cell) => {
            cell.addEventListener('click', () => {
                console.log(cell.coordinates);
                computerBoardController.recieveAttack(cell.coordinates);
                cell.style.pointerEvents = 'none';

                // trigger computer's attack in response
                console.log(humanBoardController);
                computerMoves.pickRandomCell(humanBoardController);

            })
        })
            
    }

    function useGridSpot(coords, status, name) {
        // registers that teh grid spot was used, and displays
        // either a hit or miss
        const attackIcon = new Image();
        attackIcon.classList.add('attack-icon');

        if (name === 'Enemy') {
            const usedCell = document.getElementById(
                `${coords[0]} ${coords[1]}c`)

            usedCell.appendChild(attackIcon);
            if (status === 'hit') {
                attackIcon.src = hitIcon
            } else if (status === 'miss') {
                attackIcon.src = missIcon
            }

        } else {
            const usedCell = document.getElementById(
                `${coords[0]} ${coords[1]}h`)
            
            usedCell.appendChild(attackIcon);
            if (status === 'hit') {
                attackIcon.src = hitIcon
            } else if (status === 'miss') {
                attackIcon.src = missIcon
            }
        }
    }

    function freezeGrid() {
        const gameboard = document.querySelector('.gameboard');
        gameboard.style.pointerEvents = 'none';
    }

    function renderDialogueBox() {
        const dialogueBox = document.createElement('div');
        appendElement(dialogueBox, 'dialogue-box', dialogueContainer)

        const textBox1 = document.createElement('div')
        appendElement(textBox1, 'text-box1', dialogueBox)

        const textBox2 = document.createElement('div')
        appendElement(textBox2, 'text-box2', dialogueBox)

        const textBox3 = document.createElement('div');
        appendElement(textBox3, 'text-box3', dialogueBox)
    }


    function renderEndGame() {

        const resetGameButton = document.createElement('button');
        appendElement(resetGameButton, 'reset-game-button', playerBoards);
        resetGameButton.textContent = 'Play Again?'

        resetGameButton.addEventListener('click', () => {
            resetInterface(resetGameButton);
        })
    }

    function appendElement(elementName, className, fatherElement ) {
        elementName.classList.add(className);
        fatherElement.appendChild(elementName);

        return elementName;
    }

    return {renderStart, renderGameBoard, appendElement, buildGrid,
        setGridTriggers, useGridSpot, freezeGrid, renderDialogueBox,
        renderEndGame}

}




export const dialogueController = function() {

    function  placeShipsMessage() {
        const textBox1 = document.querySelector('.text-box1');
        textBox1.textContent = 'Place your ships on the board to the right to begin!'
    }

    function beginAttackMessage() {
        const textBox1 = document.querySelector('.text-box1');
        textBox1.textContent = 'Ready to Attack!!'
    }

    function moveResult(status, playerName, coords, ship = null) {
        const textBox1 = document.querySelector('.text-box1');
        const textBox2 = document.querySelector('.text-box2');

        if (playerName !== 'Enemy') {
            if (status === 'hit') {
                textBox2.textContent = `The enemy has hit your ${ship.name}
                at row: ${coords[0]} column: ${coords[1]}!`
            } else if (status === 'miss') {
                textBox2.textContent = `The enemy attacked row:
                ${coords[0]} column: ${coords[1]} and missed!`
            }

        } else if (playerName === 'Enemy') {
            if (status === 'hit') {
                textBox1.textContent = `You hit the enemy's ${ship.name}
                at row: ${coords[0]} column: ${coords[1]}!`
            } else if (status === 'miss') {
                textBox1.textContent = `You attacked row:
                ${coords[0]} column: ${coords[1]} and missed!`
            }
        }
    }

    function sunkShipMessage(ship, name) {
        const textBox1 = document.querySelector('.text-box1');
        const textBox2 = document.querySelector('.text-box2');
        console.log(ship, name)
        if (name !== 'Enemy') {
            textBox2.textContent = `Your ${ship.name} has been sunk!!`
        } else if (name === 'Enemy') {
            textBox1.textContent = `You sunk the enemy's ${ship.name}!!`
        }

    }

    function endGameMessage(name) {
        const textBox3 = document.querySelector('.text-box3')
        if (name === 'Enemy') {
            textBox3.textContent = 'The enemy fleet has been sank. Excellent work Soldier!'
        } else {
            textBox3.textContent = 'We have lost our fleet and been defeated. Abort the mission!'
        }
    }


    return {placeShipsMessage, beginAttackMessage, moveResult, 
        sunkShipMessage, endGameMessage}
}