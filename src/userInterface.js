/* eslint-disable import/prefer-default-export */


export const initialLoad = function() {

}


export const domManipulation = function () {
    const playerBoards = document.querySelector('.gameboards');


    function renderGameBoard(board, playerName) {
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
        console.log('grid built');

        
        if (isComputer === true) {
            setGridTriggers()
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
                } else {
                   appendElement(cell, 'cell', row); 
                }
                
            }
        }

    }

    function setGridTriggers() {
        const cells = document.querySelectorAll('.cell-c');
        console.log(cells)
    }

    function disableGrid() {

    }

    function appendElement(elementName, className, fatherElement ) {
        elementName.classList.add(className);
        fatherElement.appendChild(elementName);

        return elementName;
    }

    return {renderGameBoard, appendElement, buildGrid, disableGrid,
        setGridTriggers}

}