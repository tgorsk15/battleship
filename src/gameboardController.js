/* eslint-disable import/prefer-default-export */

// need to create a board that is 10 x 10 ... board controller should get
// run twice to create eachplayer's board
// should board be a graph??

// gameBoard should check if a game is over by seeing if the
// total amount of 'hits' or 'trues' equals the total length
// of ships that are on the board

// placing ships vertically... possible idea: have a column number (e.g 3)
// that you use to select the corresponding array item in each
// of the arrays that represents a row on the board


export function gameBoardController() {
    const alphabet = ['a','b','c','d','e','f','g','h','i','j']
    
    function createBoard() {
        const board = [];
        for (let i = 0; i < 10; i++) {
            board[i] = [];

            for (let j = 0; j < 10; j++) {
                board[i][j] = false
            }
        }
        console.log(board);
        return board
    }

    // function testFunc(input) {
    //     console.log('test ran');
    //     const resultz = input + 1;
    //     return resultz
    // }



    return { createBoard }
}

