/* eslint-disable import/prefer-default-export */

// this will house the function that checks to see if ALL coords
// are staying in bounds of the gameBoard

// have to add buttons to UI to switch betwen horizontal and vertical
// have to make a start button that user can press when all 
// ships are placed


export const humanShipPlacement = function (humanBoard, ships) {
    // memory storage for where cells can't be used again
    console.log('human trigger')
    const occupiedCells = [];

    // sets plane
    const currentPlane = 'horizontal';
    const humanCells = document.querySelectorAll('.cell');
    
    const allShipsPlaced = false;
    let shipIndex = 0;
    

    // if (shipIndex !== 6) {
        humanCells.forEach((cell) => {
            cell.addEventListener('mouseover', () => {
                cellHover(cell, ships[shipIndex])
            });

            cell.addEventListener('click', () => {
                console.log(cell.activeCells);
                if (cell.classList.contains('valid-placement')) {
                    placeHorizontally(cell.coordinates, cell.activeCells, ships[shipIndex]);
                    shipIndex += 1;
                    console.log('new ship');
                    console.log(shipIndex);
                }
                return shipIndex
            })
        })
    // }
    
    function cellHover(cell, ship) {
        console.log(ship);
        const cellCoords = cell.coordinates;
        cell.activeCells = [];
        const groupedCells = cell.activeCells;
        console.log(cell.activeCells)
        // have to check if its horizontal or vertical
        // then check if starting point + ship length is valid

        if (shipIndex === 5) {
            return
        }

        if (currentPlane === 'horizontal') {
            const cellRow = cellCoords[0]
            let cellColumn = cellCoords[1];
            
            for (let i = 0; i < ship.length; i++) {
                const activeCell = document.getElementById(`${cellRow} ${cellColumn}h`)
                groupedCells.push(activeCell);
                cellColumn += 1
                if (cellColumn > 10) {
                    break
                }
            }
            console.log(groupedCells);

            if ((cellCoords[1] + ship.length) - 1 <= 10 ) {
                console.log('this is valid!')
                groupedCells.forEach((elem) => {
                   elem.classList.add('valid-placement'); 
                })
                
            } else if ((cellCoords[1] + ship.length) - 1 > 10){
                console.log('not valid');
                groupedCells.forEach((elem) => {
                    elem.classList.add('invalid-placement'); 
                })
            }

            cell.addEventListener('mouseout', () => {
                groupedCells.forEach((elem) => {
                    elem.classList.remove('valid-placement', 'invalid-placement')
                })
            })


        } else if (currentPlane === 'vertical') {
            let cellRow = cellCoords[0]
            const cellColumn = cellCoords[1];

            for (let i = 0; i < ship.length; i++) {
                const activeCell = document.getElementById(`${cellRow} ${cellColumn}h`)
                groupedCells.push(activeCell);
                cellRow += 1
                if (cellRow > 10) {
                    break
                }
            }

        }
    }

    function placeHorizontally(cellCoords, activeCells, ship) {
        activeCells.forEach((elem) => {
            console.log(activeCells)
            console.log(elem.coordinates);
            occupiedCells.push(elem.coordinates);
            elem.classList.add('placed')
        });
        humanBoard.placeHorizontalShip(cellCoords[0], cellCoords[1], ship);
        console.log(occupiedCells)
    }

    return { cellHover, placeHorizontally }
}


export const computerPlacement = function () {

}

function switchPlane(currentPlane) {
    if (currentPlane === 'horizontal') {
        currentPlane = 'vertical'
    } else if (currentPlane === 'vertical') {
        currentPlane = 'horizontal'
    }
    return currentPlane
};