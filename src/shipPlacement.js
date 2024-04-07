/* eslint-disable no-use-before-define */
/* eslint-disable import/prefer-default-export */

// rotateButton allows players to rotate ships during placement phase
// startButton allows player to attack when all ships have been placed
import { dialogueController } from "./userInterface";


export const humanShipPlacement = function (humanBoard, ships) {
    const rotateButton = document.querySelector('.rotate-ship');
    const startButton = document.querySelector('.start-game-button');
    const gameBoard = document.querySelector('.gameboard');
    const dialogueRun = dialogueController();

    // memory storage for where cells can't be used again
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
                        startButtonEmerge()
                    }
                    console.log(shipIndex);
                } else if (currentPlane === 'vertical') {
                    placeVertically(cell.coordinates, cell.activeCells, ships[shipIndex]);
                    shipIndex += 1;
                    if (shipIndex === 5) {
                        startButtonEmerge()
                    }
                    console.log(shipIndex);
                }
                
            }
            return shipIndex
        })
    })

    
    function cellHover(cell, ship) {
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
                groupedCells.forEach((elem) => {
                   elem.classList.add('valid-placement'); 
                })
                
            } else if ((cellCoords[1] + ship.length) - 1 > 10 || conflicting === true){
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
                groupedCells.forEach((elem) => {
                   elem.classList.add('valid-placement'); 
                })
                
            } else if ((cellCoords[0] + ship.length) - 1 > 10 || conflicting === true){
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
        humanBoard.placeHorizontalShip(cellCoords[0], cellCoords[1], ship);
        console.log(occupiedCells);
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

    function startButtonEmerge() {
        startButton.style.display = 'block'; 
        startButton.addEventListener('click', () => {
            dialogueRun.beginAttackMessage();
            console.log('start!');
            gameBoard.style.pointerEvents = 'auto';
        })
    }

    return { cellHover, placeHorizontally, checkConflictingShips }
}





// computer placement logic

export const computerPlacement = function (computerBoard, ships) {
    const planes = ['horizontal', 'vertical']
    const usedCells = [];

    for (let i = 0; i < ships.length; i++) {
        createShipCoords(ships[i]);
    }

    function createShipCoords(ship) {

        const chosenPlane = choosePlane(planes);
        console.log(chosenPlane)
        if (chosenPlane === 'horizontal') {
            testHorizontalShip(ship)
        } else if (chosenPlane === 'vertical') {
            testVerticalShip(ship);
        }
    }


    function testHorizontalShip(ship) {
        let startingCoords = createHorizontalStart(ship)

        // initial check of repeat:
        let firstRepeat = checkForRepeat(startingCoords, usedCells)
        while (firstRepeat === true) {
            console.log('need new start')
            startingCoords = createHorizontalStart(ship);
            firstRepeat = checkForRepeat(startingCoords, usedCells)
        }
        usedCells.push(startingCoords); 
        
        let repeatDetect = false;
        for (let i = 1; i < ship.length; i++) {
            const newCoords = [startingCoords[0], startingCoords[1] + i];
            const repeat = checkForRepeat(newCoords, usedCells)
            if (repeat === false) {
                usedCells.push(newCoords);
                
            } else if (repeat === true) {
                repeatDetect = true
                break
            }
        }

        if (repeatDetect === false) {
            computerBoard.placeHorizontalShip(startingCoords[0], startingCoords[1], ship);
        } else if (repeatDetect === true) {
            testHorizontalShip(ship);
        }

    }


    function testVerticalShip(ship) {
        let startingCoords = createVerticalStart(ship)

        // initial check of repeat:
        let firstRepeat = checkForRepeat(startingCoords, usedCells)
        while (firstRepeat === true) {
            console.log('need new start')
            startingCoords = createVerticalStart(ship);
            firstRepeat = checkForRepeat(startingCoords, usedCells)
        }
        usedCells.push(startingCoords);

        let repeatDetect = false;
        for (let i = 1; i < ship.length; i++) {
            const newCoords = [startingCoords[0] + i, startingCoords[1]];
            const repeat = checkForRepeat(newCoords, usedCells)
            if (repeat === false) {
              usedCells.push(newCoords);
              
            } else if (repeat === true) {
                repeatDetect = true
                break
            }
            
        }

        if (repeatDetect === false) {
            computerBoard.placeVerticalShip(startingCoords[0], startingCoords[1], ship);
        } else if (repeatDetect === true) {
            testVerticalShip(ship);
        }
    }

    function choosePlane(planes) {
        const chosenIndex = Math.floor(Math.random() * planes.length);
        return planes[chosenIndex]
    }

    function createHorizontalStart(ship) {
        const row = Math.floor(Math.random() * 10) + 1
        const column = Math.floor(Math.random() * (10 - ship.length)) + 1
        const startingCoord = [row, column];
        return startingCoord
    }

    function createVerticalStart(ship) {
        const row = Math.floor(Math.random() * (10 - ship.length)) + 1
        const column = Math.floor(Math.random() * 10) + 1
        const startingCoord = [row, column];
        return startingCoord
    }

    return {createShipCoords, testHorizontalShip, testVerticalShip,
        choosePlane, createHorizontalStart, createVerticalStart}
}


function checkForRepeat(coords, array) {
    const stringedCoords = JSON.stringify(coords);
    const existsBoolean = array.some((coord) => JSON.stringify(coord) === stringedCoords)
    console.log(existsBoolean)
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