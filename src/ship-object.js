/* eslint-disable no-else-return */
/* eslint-disable import/prefer-default-export */

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
    }

    checkIfSunk() {
        if (this.length === this.hits) {
            console.log('Sunk!')
            return true
        } else {
            return false
        }
    }

}



export function createFleet() {
    const ships = []

    const carrier = new Ship(5, 'Carrier');
    const battleship = new Ship(4, 'Battleship');
    const destroyer = new Ship(3, 'Destroyer');
    const submarine = new Ship(3, 'Submarine');
    const patrolBoat = new Ship(2, 'Patrol Boat');
 
    ships.push(carrier, battleship, destroyer, submarine, patrolBoat)
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
    return ships
}