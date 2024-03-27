/* eslint-disable no-else-return */
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


export function shipController() {

    

}