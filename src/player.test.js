// import { userPlayer, computerPlayer } from "./player";

// describe('test functions of computer player', () => {
   

//     test('if random numbers generated are > 11', () => {
//         const computer = computerPlayer()
//         expect(computer.pickRandomCell().row).toBeLessThan(11)
//         expect(computer.pickRandomCell().column).toBeLessThan(11)
//     }) 
// })

// test for checkRepeatCell:
test('check if existing coords is picked up in array', () => {
    const visited = [[2,4], [3,4], [7,6]];

    function testRepeat(coords) {
        const stringedCoords = JSON.stringify(coords);
        const existsBoolean = visited.some((coord) => JSON.stringify(coord) === stringedCoords)
        console.log(existsBoolean)
        return existsBoolean
    }

    expect(testRepeat([4,4])).toBe(false);
    expect(testRepeat([2,4]).toBe(true));

})