/* eslint-disable import/prefer-default-export */


export const initialLoad = function() {

}


export const domManipulation = function () {
    const playerBoards = document.querySelector('.gameboards');


    function renderGameBoard(boardController, playerName) {
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
            setGridTriggers(boardController)
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
                    cell.setAttribute('id', 
                    `${cell.coordinates[0]} ${cell.coordinates[1]}c`)
                } else {
                   appendElement(cell, 'cell', row);
                   cell.setAttribute('id', 
                    `${cell.coordinates[0]} ${cell.coordinates[1]}h`) 
                }
                
            }
        }

    }

    function setGridTriggers(computerBoardController) {
        const cells = document.querySelectorAll('.cell-c');
        console.log(cells);
        cells.forEach((cell) => {
            cell.addEventListener('click', () => {
                console.log(cell.coordinates);
                computerBoardController.recieveAttack(cell.coordinates);
                // need to trigger recieveAttack on the correct
                // game board 
                // need to trigger computer's attack in response
                // need to give feedback on each gameboard
            })
        })
            
    }

    function useGridSpot(coords, status, name) {

        if (name === 'Player 2') {
            console.log(status);
            const usedCell = document.getElementById(
                `${coords[0]} ${coords[1]}c`)
            console.log(usedCell)

            if (status === 'hit') {
                usedCell.textContent = 'X'
            } else if (status === 'miss') {
                usedCell.textContent = '.'
            }

        } else {
            console.log(humanCells)
        }
        console.log('used up the spot');
    }

    function appendElement(elementName, className, fatherElement ) {
        elementName.classList.add(className);
        fatherElement.appendChild(elementName);

        return elementName;
    }

    return {renderGameBoard, appendElement, buildGrid,
        setGridTriggers, useGridSpot}

}