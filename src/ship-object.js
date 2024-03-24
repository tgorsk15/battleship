class Ship {
    constructor(length, hits, isSunk) {
        this.length = length;
        this.hits = hits;
        this.isSunk = isSunk;
    }

    hit() {
        this.hits += 1
    }

    checkIfSunk() {
        if (length === hits) {
            console.log('Sunk!')
        }
    }

}