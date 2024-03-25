/* eslint-disable import/prefer-default-export */
export class Ship {
    constructor(length, hits, isSunk, coords) {
        this.length = length;
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
        }
    }

}