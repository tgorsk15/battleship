import { gameBoardController } from "./gameboardController"

let boardRun;

beforeAll(() => {
    boardRun = gameBoardController()
    boardRun.createBoard()
});



test('test if Sunk trigger works', () => {
    expect(boardRun.placeVerticalShip(7, 8, 1)).toEqual (
        {
            length: 1,
            hits: 0,
            isSunk: false,
            coords: [[7, 8]]
        }
    )
})

test('place ship that is horizontal', () => {
    expect(boardRun.placeHorizontalShip(2, 3, 3)).toEqual (
        {
            length: 3,
            hits: 0,
            isSunk: false,
            coords: [[2,3], [2, 4], [2, 5]]
        }
    )
})

test('place ship that is vertical', () => {
    expect(boardRun.placeVerticalShip(5, 6, 4)).toEqual (
        {
            length: 4,
            hits: 0,
            isSunk: false,
            coords: [[5, 6], [6, 6], [7, 6], [8, 6] ]
        }
    )
})




test('check if attack is a hit or miss', () => {
    expect(boardRun.recieveAttack([5, 6])).toBe('hit')
})
test('check if attack is a hit or miss', () => {
    expect(boardRun.recieveAttack([3, 8])).toBe('miss')
})

test('check if ship is sunk', () => {
    expect(boardRun.recieveAttack([7, 8])).toBe('hit')
})  // should console.log Sunk! and remove from ships array


describe('making sure board updates when attack is recieved', () => {
    // beforeEach(() => {
    //     const board = boardRun.createBoard()
    // });

    test('check if board update correctly', () => {
        const board = boardRun.createBoard()
        boardRun.updateBoardSpot([9, 9])
        expect(board).toEqual([[false, false, false, false, false, false, false, false, false, false], 
            [false, false, false, false, false, false, false, false, false, false], 
            [false, false, false, false, false, false, false, false, false, false], 
            [false, false, false, false, false, false, false, false, false, false], 
            [false, false, false, false, false, false, false, false, false, false], 
            [false, false, false, false, false, false, false, false, false, false], 
            [false, false, false, false, false, false, false, false, false, false], 
            [false, false, false, false, false, false, false, false, false, false], 
            [false, false, false, false, false, false, false, false, true, false], 
            [false, false, false, false, false, false, false, false, false, false]])
    })
})