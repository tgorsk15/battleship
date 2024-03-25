import { gameBoardController } from "./gameboardController"

let boardRun;

beforeAll(() => {
    boardRun = gameBoardController()
});

// test('run a test function', () => {
//     expect(boardRun.testFunc(3)).toBe(4)
// })

// test('create gameBoard', () => {
//     expect(boardRun.createBoard()).toBe(3)
// })

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
