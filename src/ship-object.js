/* eslint-disable no-else-return */
/* eslint-disable import/prefer-default-export */
import { gameBoardController } from "./gameboardController";

export class Ship {
    constructor(length, name, hits, isSunk, coords) {
        this.length = length;
        this.name = name;
        this.hits = 0;
        this.isSunk = false;
        this.coords = []
    }

    hit() {
        this.hits += 1
        console.log('hit added')
    }

    checkIfSunk() {
        if (this.length === this.hits) {
            console.log('Sunk!')
            return true
        } else {
            console.log(this.length);
            console.log(this.hits);
            return false
        }
    }

}

const boardRun = gameBoardController();

export function createFleet() {
    const ships = []

    const carrier = new Ship(5, 'Carrier');
    const battleship = new Ship(4, 'Battleship');
    const destroyer = new Ship(3, 'Destroyer');
    const submarine = new Ship(3, 'Submarine');
    const patrolBoat = new Ship(2, 'Patrol Boat');
 
    ships.push(carrier, battleship, destroyer, submarine, patrolBoat)

    boardRun.placeHorizontalShip(1, 5, carrier);
    boardRun.placeVerticalShip(4,1, battleship)
    boardRun.placeHorizontalShip(7, 4, destroyer);
    boardRun.placeVerticalShip(7, 8, submarine);
    boardRun.placeHorizontalShip(2, 6, patrolBoat);
    console.log(ships);
    return ships
}

export function createOppFleet() {
    const ships = []

    const carrier = new Ship(5, 'Carrier');
    const battleship = new Ship(4, 'Battleship');
    const destroyer = new Ship(3, 'Destroyer');
    const submarine = new Ship(3, 'Submarine');
    const patrolBoat = new Ship(2, 'Patrol Boat');

    ships.push(carrier, battleship, destroyer, submarine, patrolBoat);

    boardRun.placeHorizontalShip(1, 1, carrier);
    boardRun.placeVerticalShip(4,2, battleship)
    boardRun.placeHorizontalShip(6, 6, destroyer);
    boardRun.placeVerticalShip(7, 8, submarine);
    boardRun.placeHorizontalShip(3, 7, patrolBoat);
    console.log(ships);
    return ships
}