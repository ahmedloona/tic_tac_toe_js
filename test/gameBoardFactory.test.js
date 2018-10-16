import gameBoard from '../src/gameBoardFactory';


describe('board definition', () => {
    //check gameBoard the gameBoard was defined through the IIFE
    test('gameBoard is defined', () => {
        expect(gameBoard).toBeDefined();
    });

    // test that 'board' state variable is private
    test('board is not defined', () => {
        expect(gameBoard.board).toBeUndefined();
    });
});

//test gameBoard.placeMarker() public method
describe('marker placement', () => {

    afterEach(() => {
        console.log(`clearing the gameBoard, before: ${gameBoard.show()}`);
        gameBoard.clear();
        console.log(`clearing the gameBoard, after: ${gameBoard.show()}`);
    });

    test('puts an X at row 1 column 1', () => {
        expect(gameBoard.placeMarker([1, 1], 'X'))
        .toEqual([[null, null, null], [null, 'X', null], [null, null, null]]);
    });

    test('puts an O at row 2 column 0', () => {
        expect(gameBoard.placeMarker([2, 0], 'O'))
        .toEqual([[null, null, null], [null, null, null], ['O', null, null]]);
    });

    test('does not put a G at row 2 column 0', () => {
        expect(gameBoard.placeMarker([2, 0], 'G'))
        .toEqual([[null, null, null], [null, null, null], [null, null, null]]);
    });

    test('does not put a O at row 3 column 0', () => {
        expect(gameBoard.placeMarker([2, 0], 'G'))
        .toEqual([[null, null, null], [null, null, null], [null, null, null]]);
    });

    test('does not put marker at a position already marked', () => {
        gameBoard.placeMarker([1, 1], 'X')
        expect(gameBoard.placeMarker([1, 1], 'O'))
        .toEqual([[null, null, null], [null, 'X', null], [null, null, null]]);
    });

});

//test gameBoard.clear() public method
describe('board clearing', () => {

    beforeEach(() => {
        const markers = ['X', 'O'];
        for (let row = 0; row <= 2; row++) {
            for (let column = 0; column <= 2; column++) {
              const randomIndex = Math.floor(Math.random() * 2);
              const randomMarker = markers[randomIndex];
              gameBoard.placeMarker([row, column], randomMarker);
            }
        }
        console.log(`before clearing: ${gameBoard.show()}`);
    });

    afterEach(() => {
     console.log(`after clearing: ${gameBoard.show()}`);
    });

    test('clearBoard puts null in all spots', () => {
       expect(gameBoard.clear())
       .toEqual([[null, null, null], [null, null, null], [null, null, null]]);
    });

});

describe('has winner', () => {

    afterEach(() => gameBoard.clear());

    /* private method
    test('board is transposed', () => {
        const board = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
        const transposed = [[1, 4, 7], [2, 5, 8], [3, 6, 9]];
        expect(gameBoard.getTranspose(board)).toEqual(transposed);
        console.table(gameBoard.show());
    });
    */

    test('detects horizontal X win', () => {
        for (let column = 0; column <=2; column++) {
            gameBoard.placeMarker([0, column], 'X');
        }
        expect(gameBoard.hasWinner()).toBeTruthy();
    });

    test('detects horizontal O win', () => {
        for (let column = 0; column <=2; column++) {
            gameBoard.placeMarker([2, column], 'O');
        }
        expect(gameBoard.hasWinner()).toBeTruthy();
    });

    test('detects vertical X win', () => {
        for (let row = 0; row <=2; row++) {
            gameBoard.placeMarker([row, 1], 'X');
        }
        expect(gameBoard.hasWinner()).toBeTruthy();
    });

    test('detects vertical O win', () => {
        for (let row = 0; row <=2; row++) {
            gameBoard.placeMarker([row, 2], 'O');
        }
        expect(gameBoard.hasWinner()).toBeTruthy();
    });

    test('detects forward diagonal X win', () => {

        gameBoard.placeMarker([0, 2], 'X');
        gameBoard.placeMarker([1, 1], 'X');
        gameBoard.placeMarker([2, 0], 'X');

        expect(gameBoard.hasWinner()).toBeTruthy();
    });

    test('detects reverse diagonal O win', () => {
        gameBoard.placeMarker([0, 0], 'O');
        gameBoard.placeMarker([1, 1], 'O');
        gameBoard.placeMarker([2, 2], 'O');

        expect(gameBoard.hasWinner()).toBeTruthy();
    });

    test('returns false when there is no winner', () => {

        gameBoard.placeMarker([0, 0], 'O');
        gameBoard.placeMarker([0, 1], 'O');
        gameBoard.placeMarker([0, 2], 'X');
        gameBoard.placeMarker([1, 0], 'X');
        gameBoard.placeMarker([1, 1], 'X');
        gameBoard.placeMarker([1, 2], 'O');
        gameBoard.placeMarker([2, 0], 'O');
        gameBoard.placeMarker([2, 1], 'O');
        gameBoard.placeMarker([2, 2], 'X');

        expect(gameBoard.hasWinner()).toBeFalsy();
    });
});



/*PRIVATE METHOD TESTS

// isMarkerValid() should return true for 'X' and 'O'. Should return false for
// other characters/numbers
test('return true for X', () => {
    expect(gameBoard.isMarkerValid('X')).toBeTruthy();
});

test('return true for O', () => {
    expect(gameBoard.isMarkerValid('O')).toBeTruthy();
});

test('return false for little x', () => {
    expect(gameBoard.isMarkerValid('x')).toBeFalsy();
});

test('return false for G', () => {
    expect(gameBoard.isMarkerValid('G')).toBeFalsy();
});

test('return false for 8', () => {
    expect(gameBoard.isMarkerValid(8)).toBeFalsy();
});

//areRowColumnValid() should return true for 0, 1, 2. False for all else
test('return true for [1, 1]', () => {
    expect(gameBoard.areRowColumnValid([1, 1])).toBeTruthy();
});

test('return false for [1, 3]', () => {
    expect(gameBoard.areRowColumnValid([1, 3])).toBeFalsy();
});

test('return false for [4, 2]', () => {
    expect(gameBoard.areRowColumnValid([4, 2])).toBeFalsy();
});
*/
