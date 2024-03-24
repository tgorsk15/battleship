/* eslint-disable import/prefer-default-export */

// need to create a board that is 10 x 10 ... board controller should get
// run twice to create eachplayer's board
// should board be a graph??

// gameBoard should check if a game is over by seeing if the
// total amount of 'hits' or 'trues' equals the total length
// of ships that are on the board


export function gameBoardController() {
    
    function testFunc(input) {
        console.log('test ran');
        const resultz = input + 1;
        return resultz
    }



    return {
        testFunc
    }
}

