import { gameBoardController } from "./gameboardController"

let boardRun;

beforeAll(() => {
    boardRun = gameBoardController()
});

// test('run a test function', () => {
//     expect(boardRun.testFunc(3)).toBe(4)
// })

test('create gameBoard', () => {
    expect(boardRun.createBoard()).toBe(3)
})

