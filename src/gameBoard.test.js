import { gameBoardController } from "./gameboardController"
import { createFleet } from "./ship-object";

let boardRun;
const ships = createFleet([]);

beforeAll(() => {
    boardRun = gameBoardController(ships)
    boardRun.createBoard()
});



// test('test if correct vertical ship is returned', () => {
//     console.log(ships[0]);
//     expect(boardRun.placeVerticalShip(7, 8, ships[4])).toEqual (
//         {
//             length: 2,
//             hits: 0,
//             isSunk: false,
//             coords: [[7, 8], [8, 8]]
//         }
//     )
// })

// test('test if correct horiz ship is returned', () => {
//     expect(boardRun.placeHorizontalShip(2, 3, ships[2])).toEqual (
//         {
//             length: 3,
//             hits: 0,
//             isSunk: false,
//             coords: [[2,3], [2, 4], [2, 5]]
//         }
//     )
// })

// test('place ship that is vertical', () => {
//     expect(boardRun.placeVerticalShip(5, 6, ships[1])).toEqual (
//         {
//             length: 4,
//             hits: 0,
//             isSunk: false,
//             coords: [[5, 6], [6, 6], [7, 6], [8, 6] ]
//         }
//     )
// })




// test('check if attack is a hit or miss', () => {
//     expect(boardRun.recieveAttack([7, 5])).toBe('hit')
// })
// test('check if attack is a hit or miss', () => {
//     expect(boardRun.recieveAttack([7, 4])).toBe('hit')
// })

// // should console.log Sunk! and remove from ships array
// test('check if ship is sunk', () => {
//     expect(boardRun.recieveAttack([7, 6])).toBe('hit')
// }) 

// // tests for a miss
// test('check if attack is a miss', () => {
//     expect(boardRun.recieveAttack([3, 4])).toBe('miss')
// })  


// test('if cell is reused, recieveAttack should return nothing', () => {
//     expect(boardRun.recieveAttack([7,5])).toBe('filled already')
//     expect(boardRun.checkIfUsed([7,5])).toBe(true)
// })


// test('check if all sunk', () => {
//     expect(boardRun.checkAllSunk()).toBe(false)
// })
// below test is for checking when ships length is 0
// test.only('check if all sunk', () => {

//     expect(boardRun.checkAllSunk()).toBe(true)
// })


// describe('making sure board updates when attack is recieved', () => {

//     test('check if board update correctly', () => {
//         const board = boardRun.createBoard()
//         boardRun.updateBoardSpot([9, 9])
//         expect(board).toEqual([[false, false, false, false, false, false, false, false, false, false], 
//             [false, false, false, false, false, false, false, false, false, false], 
//             [false, false, false, false, false, false, false, false, false, false], 
//             [false, false, false, false, false, false, false, false, false, false], 
//             [false, false, false, false, false, false, false, false, false, false], 
//             [false, false, false, false, false, false, false, false, false, false], 
//             [false, false, false, false, false, false, false, false, false, false], 
//             [false, false, false, false, false, false, false, false, false, false], 
//             [false, false, false, false, false, false, false, false, true, false], 
//             [false, false, false, false, false, false, false, false, false, false]])
//     })
// })