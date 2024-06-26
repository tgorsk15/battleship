// create both the user player and the computer player here

// computer player has attack coordinates generator function

export class Player {
    constructor(player, gameBoard) {
        this.player = player;
        this.gameBoard= null
    }
}


export const computerPlayer = function () {
    const visited = [];

    function pickRandomCell(humanBoard) {
        const row = Math.floor(Math.random() * 10) + 1
        const column = Math.floor(Math.random() * 10) + 1
        const compCoords = [row, column];

        const repeatBoolean = checkRepeatCell(compCoords)
        // console.log(repeatBoolean)
        if (repeatBoolean === true) {
            console.log('computer picked used cell!!')
            pickRandomCell(humanBoard);
        } else if (repeatBoolean === false) {
            visited.push(compCoords);
            humanBoard.recieveAttack(compCoords);

            return compCoords 
        }
        

    }

    function checkRepeatCell(coords) {
        const stringedCoords = JSON.stringify(coords);
        const existsBoolean = visited.some((coord) => JSON.stringify(coord) === stringedCoords)
        return existsBoolean
    }

    return {pickRandomCell, checkRepeatCell}
}