/* eslint-disable import/prefer-default-export */

// this will house the function that checks to see if ALL coords
// are staying in bounds of the gameBoard

// have to add buttons to UI to switch betwen horizontal and vertical
// have to make a start button that user can press when all 
// ships are placed


export const humanShipPlacement = function () {
    // this will be either horizontal or vertical
    const currentPlane = 'horizontal';
    const humanCells = document.querySelectorAll('.cell')
    console.log(currentPlane);
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