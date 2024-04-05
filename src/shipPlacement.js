/* eslint-disable no-use-before-define */
/* eslint-disable import/prefer-default-export */

// have to add buttons to UI to switch betwen horizontal and vertical
// have to make a start button that user can press when all 
// ships are placed


export const humanShipPlacement = function (humanBoard, ships) {
    // memory storage for where cells can't be used again
    const rotateButton = document.querySelector('.rotate-ship');
    const occupiedCells = [];

    // sets plane
    let currentPlane = 'horizontal';
    createRotationAbility();

    const humanCells = document.querySelectorAll('.cell');
    let shipIndex = 0;
    

    humanCells.forEach((cell) => {
        cell.addEventListener('mouseover', () => {
            cellHover(cell, ships[shipIndex])
        });

        cell.addEventListener('click', () => {
            if (cell.classList.contains('valid-placement')) {
                if (currentPlane === 'horizontal') {
                    placeHorizontally(cell.coordinates, cell.activeCells, ships[shipIndex]);
                    shipIndex += 1;
                    if (shipIndex === 5) {
                        computerPlacement();
                    }
                    console.log(shipIndex);
                } else if (currentPlane === 'vertical') {
                    placeVertically(cell.coordinates, cell.activeCells, ships[shipIndex]);
                    shipIndex += 1;
                    if (shipIndex === 5) {
                        computerPlacement();
                    }
                    console.log(shipIndex);
                }
                
            }
            return shipIndex
        })
    })

    
    function cellHover(cell, ship) {
        console.log(ship);
        const cellCoords = cell.coordinates;
        cell.activeCells = [];
        const groupedCells = cell.activeCells;
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
            const conflicting = checkConflictingShips(groupedCells);

            if ((cellCoords[1] + ship.length) - 1 <= 10 && conflicting === false) {
                console.log('this is valid!')
                groupedCells.forEach((elem) => {
                   elem.classList.add('valid-placement'); 
                })
                
            } else if ((cellCoords[1] + ship.length) - 1 > 10 || conflicting === true){
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
            const conflicting = checkConflictingShips(groupedCells);


            if ((cellCoords[0] + ship.length) - 1 <= 10 && conflicting === false ) {
                console.log('this is valid!')
                groupedCells.forEach((elem) => {
                   elem.classList.add('valid-placement'); 
                })
                
            } else if ((cellCoords[0] + ship.length) - 1 > 10 || conflicting === true){
                console.log('not valid');
                groupedCells.forEach((elem) => {
                    elem.classList.add('invalid-placement'); 
                })
            }

            cell.addEventListener('mouseout', () => {
                groupedCells.forEach((elem) => {
                    elem.classList.remove('valid-placement', 'invalid-placement')
                })
            });

        }
    }

    function placeHorizontally(cellCoords, activeCells, ship) {
        activeCells.forEach((elem) => {
            console.log(elem.coordinates);
            occupiedCells.push(elem.coordinates);
            elem.classList.add('placed')
        });
        // maybe put trigger in here to check if all ships are placed
        // if true, disbale pointer events and run function for
        // placing computer ships
        humanBoard.placeHorizontalShip(cellCoords[0], cellCoords[1], ship);
        console.log(occupiedCells)
    }

    function placeVertically(cellCoords, activeCells, ship) {
        activeCells.forEach((elem) => {
            console.log(elem.coordinates);
            occupiedCells.push(elem.coordinates);
            elem.classList.add('placed')
        });
        humanBoard.placeVerticalShip(cellCoords[0], cellCoords[1], ship);
        console.log(occupiedCells)
    }


    

    function checkConflictingShips(activeCells) {
        let alreadyUsed = false
        activeCells.forEach((elem) => {
            if (checkForRepeat(elem.coordinates, occupiedCells) === true) {
                alreadyUsed = true
            }
        })
        return alreadyUsed
    }

    function createRotationAbility() {
        rotateButton.addEventListener('click', () => {
            const newPlane = switchPlane(currentPlane);
            currentPlane = newPlane
        })
    }

    return { cellHover, placeHorizontally, checkConflictingShips,
        checkForRepeat }
}


export const computerPlacement = function (computerBoard, ships) {
    // ships are already created in ship-object.js...

}


function checkForRepeat(coords, array) {
    const stringedCoords = JSON.stringify(coords);
    const existsBoolean = array.some((coord) => JSON.stringify(coord) === stringedCoords)
    // console.log(existsBoolean)
    return existsBoolean
}

function switchPlane(currentPlane) {
    if (currentPlane === 'horizontal') {
        currentPlane = 'vertical'
    } else if (currentPlane === 'vertical') {
        currentPlane = 'horizontal'
    }
    return currentPlane
};