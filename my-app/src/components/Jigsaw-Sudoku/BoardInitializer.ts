type Board = number[][];
type Island = number[][];

export default function generateInitialJigsawBoard(island: Island, filledPercentage: number = 0.05): Board {
    const size = 9;
    const totalCells = size * size;
    const numToFill = Math.floor(filledPercentage * totalCells);

    let board: Board = Array.from({ length: size }, () => Array(size).fill(0));
    if (!solveJigsawSudoku(board, island)) {
        throw new Error("Failed to generate a complete board");
    }

    let filledPositions: [number, number][] = [];
    while (filledPositions.length < numToFill) {
        const row = Math.floor(Math.random() * size);
        const col = Math.floor(Math.random() * size);
        if (board[row][col] !== 0 && !filledPositions.some(([r, c]) => r === row && c === col)) {
            filledPositions.push([row, col]);
        }
    }

    let puzzleBoard: Board = Array.from({ length: size }, () => Array(size).fill(0));
    filledPositions.forEach(([row, col]) => {
        puzzleBoard[row][col] = board[row][col];
    });

    return puzzleBoard;
}

// Helper function to check if a number can be placed at a position
function isSafe(board: Board, row: number, col: number, num: number, island: Island): boolean {
    for (let i = 0; i < 9; i++) {
        // Check the row and column
        if (board[row][i] === num || board[i][col] === num) {
            return false;
        }
    }

    const regionId = island[row][col];
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            if (island[r][c] === regionId && board[r][c] === num) {
                return false;
            }
        }
    }
    return true;
}

function solveJigsawSudoku(board: Board, island: Island): boolean {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] === 0) {
                for (let num = 1; num <= 9; num++) {
                    if (isSafe(board, row, col, num, island)) {
                        board[row][col] = num;
                        if (solveJigsawSudoku(board, island)) {
                            return true;
                        }
                        board[row][col] = 0;
                    }
                }
                return false;
            }
        }
    }
    return true;
}