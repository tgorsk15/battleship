/* eslint-disable import/prefer-default-export */

// this will house the function that checks to see if ALL coords
// are staying in bounds of the gameBoard

// have to add buttons to UI to switch betwen horizontal and vertical
// have to make a start button that user can press when all 
// ships are placed


export const humanShipPlacement = function (humanBoard, ships) {
    // memory storage for where ships are placed, so new ships
    // can't be placed on top of them
    const occupiedCells = [];

    // this will be either horizontal or vertical
    const currentPlane = 'horizontal';
    const humanCells = document.querySelectorAll('.cell');
    
    const allShipsPlaced = false;
    const shipIndex = 0;

    if (allShipsPlaced === false) {
        humanCells.forEach((cell) => {
            cell.addEventListener('mouseover', () => {
                cellHover(cell, ships[shipIndex])
            });
            cell.addEventListener('click', () => {
                console.log(cell.id)
            });
        })
    }
    
    function cellHover(cell, ship) {
        console.log(ship);
        const cellCoords = cell.coordinates;
        console.log(cellCoords);
        // have to check if its horizontal or vertical
        // then check if starting point + ship length is valid

        // if valid, give cell AND its follwers
        // their valid Placement class

        // if invalid give cell + followers invalid class
        if (currentPlane === 'horizontal') {
            if ((cellCoords[1] + ship.length) - 1 <= 10 ) {
                console.log('this is valid!')
                cell.classList.add('valid-placement');
            };

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