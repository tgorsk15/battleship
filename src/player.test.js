import { userPlayer, computerPlayer } from "./player";

describe('test functions of computer player', () => {
   

    test.only('if random numbers generated are > 11', () => {
        const computer = computerPlayer()
        expect(computer.pickRandomCell().row).toBeLessThan(11)
        expect(computer.pickRandomCell().column).toBeLessThan(11)
    }) 
})