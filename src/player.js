// create both the user player and the computer player here

// computer player should have a random cell picker function

// perhaps each player should be assigned an array with specified
// lengths for each ship that is created for them (battleship,
// carrier, etc...)
// this arry can be iterated through, nd create all the necessary ships
export class Player {
    constructor(player, gameBoard) {
        this.player = player;
        // this.playerShips = []
        this.gameBoard= null
    }
}


export const userPlayer = function () {

}

export const computerPlayer = function () {

    function pickRandomCell() {
        const row = Math.floor(Math.random() * 10) + 1
        const column = Math.floor(Math.random() * 10) + 1
        console.log(row)
        console.log(column)
        return { row, column }
        // need to implement a checker at some point to ensure
        // that computer can't pick already used cells
    }

    return {pickRandomCell}
}