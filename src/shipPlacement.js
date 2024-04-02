/* eslint-disable import/prefer-default-export */

// this will house the function that checks to see if ALL coords
// are staying in bounds of the gameBoard

// have to add buttons to UI to switch betwen horizontal and vertical
// have to make a start button that user can press when all 
// ships are placed


export const humanShipPlacement = function (humanBoard, ships) {
    // memory storage for where cells can't be used again
    const occupiedCells = [];

    // sets plane
    const currentPlane = 'horizontal';
    const humanCells = document.querySelectorAll('.cell');
    
    const allShipsPlaced = false;
    const shipIndex = 0;
    

    if (allShipsPlaced === false) {
        humanCells.forEach((cell) => {
            cell.addEventListener('mouseover', () => {
                cellHover(cell, ships[shipIndex])
            });
            cell.addEventListener('mouseout', () => {
                cell.classList.remove('valid-placement', 'invalid-placement');
            })
            cell.addEventListener('click', () => {
                console.log(cell.id)
            });
        })
    }
    
    function cellHover(cell, ship) {
        console.log(ship);
        const cellCoords = cell.coordinates;
        const activeCells = [];
        // have to check if its horizontal or vertical
        // then check if starting point + ship length is valid

        if (currentPlane === 'horizontal') {
            const cellRow = cellCoords[0]
            let cellColumn = cellCoords[1];
            
            for (let i = 0; i < ship.length; i++) {
                const activeCell = document.getElementById(`${cellRow} ${cellColumn}h`)
                activeCells.push(activeCell);
                cellColumn += 1
                if (cellColumn > 10) {
                    break
                }
            }
            console.log(activeCells);

            if ((cellCoords[1] + ship.length) - 1 <= 10 ) {
                console.log('this is valid!')
                activeCells.forEach((elem) => {
                   elem.classList.add('valid-placement'); 
                })
                
            } else if ((cellCoords[1] + ship.length) - 1 > 10){
                console.log('not valid');
                activeCells.forEach((elem) => {
                    elem.classList.add('invalid-placement'); 
                })
            }

            cell.addEventListener('mouseout', () => {
                activeCells.forEach((elem) => {
                    elem.classList.remove('valid-placement', 'invalid-placement')
                })
            })

        } else if (currentPlane === 'vertical') {


        }
    }

    return { cellHover }
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