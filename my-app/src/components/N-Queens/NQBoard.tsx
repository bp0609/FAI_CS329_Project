import React, { useState } from 'react';

const NQBoard: React.FC = () => {
  const [N, setN] = useState<number>(8); // Default size
  const [board, setBoard] = useState<number[][]>(
    Array(8).fill(0).map(() => Array(8).fill(0))
  );
  const [showForwardConsistency, setShowForwardConsistency] = useState(false);
  const [showArcConsistency, setShowArcConsistency] = useState(false);

  const isSafe = (board: number[][], row: number, col: number): boolean => {

    for (let i = 0; i < N; i++) {
      if (board[row][i] === 1 && i != col) return false; // Row check
    }
    // Check if the column already has a queen (we can safely skip this row if the user has placed a queen)
    for (let i = 0; i < N; i++) {
      if (board[i][col] === 1 && i != row) return false; // Column check
    }

    // Check the upper-left diagonal
    for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
      if (board[i][j] === 1) return false; // Upper-left diagonal check
    }

    // Check the upper-right diagonal
    for (let i = row - 1, j = col + 1; i >= 0 && j < N; i--, j++) {
      if (board[i][j] === 1) return false; // Upper-right diagonal check
    }

    // Check if the bottom-left diagonal has a queen
    for (let i = row + 1, j = col - 1; i < N && j >= 0; i++, j--) {
      if (board[i][j] === 1) return false; // Bottom-left diagonal check
    }

    // Check if the bottom-right diagonal has a queen
    for (let i = row + 1, j = col + 1; i < N && j < N; i++, j++) {
      if (board[i][j] === 1) return false; // Bottom-right diagonal check
    }



    // If a queen is already placed by the user in this cell, consider it safe
    return true;
  };

  // Backtracking function to solve the N-Queens problem
  const solveNQUtil = (board: number[][], row: number): boolean => {
    // If all queens are placed
    if (row === N) return true;

    // If the current row already has a queen (placed by the user), move to the next row
    if (board[row].includes(1)) {
      return solveNQUtil(board, row + 1); // Skip this row, move to the next row
    }

    // Try placing a queen in each column of the current row
    for (let col = 0; col < N; col++) {
      ;

      // Check if the current position is safe
      if (isSafe(board, row, col)) {
        board[row][col] = 1; // Place the queen

        // Recursively solve for the next row
        if (solveNQUtil(board, row + 1)) return true;

        // Backtrack if placing the queen doesn't lead to a solution
        board[row][col] = 0;
      }
    }

    // If no valid placement is found, return false
    return false;
  };

  // Function to initiate solving the N-Queens problem from the current board state
  const solveNQ = (board: number[][]) => {
    // Check if the current board state is already invalid (early exit)
    for (let row = 0; row < N; row++) {
      for (let col = 0; col < N; col++) {
        if (board[row][col] === 1 && !isSafe(board, row, col)) {
          alert('The user-placed queens are in an invalid configuration!');
          return;
        }
      }
    }

    // Start solving from the first empty row
    let startRow = 0;
    for (let row = 0; row < N; row++) {
      if (board[row].includes(0)) {
        startRow = row;
        break;
      }
    }

    // Start solving the board from the found start row
    if (solveNQUtil(board, startRow)) {
      setBoard(board); // Update the board with the solution
    } else {
      alert('Solution does not exist for this configuration.');
    }
  };


  // Compute forward consistency (mark unsafe cells)
  const getForwardConsistency = (): boolean[][] => {
    const unsafeCells = Array(N).fill(0).map(() => Array(N).fill(false));

    for (let row = 0; row < N; row++) {
      for (let col = 0; col < N; col++) {
        if (board[row][col] === 1) {
          // Mark all cells in the same row, column, and diagonals as unsafe
          for (let k = 0; k < N; k++) {
            unsafeCells[row][k] = true; // Row
            unsafeCells[k][col] = true; // Column
            if (row + k < N && col + k < N) unsafeCells[row + k][col + k] = true; // Lower-right diagonal
            if (row - k >= 0 && col - k >= 0) unsafeCells[row - k][col - k] = true; // Upper-left diagonal
            if (row + k < N && col - k >= 0) unsafeCells[row + k][col - k] = true; // Lower-left diagonal
            if (row - k >= 0 && col + k < N) unsafeCells[row - k][col + k] = true; // Upper-right diagonal
          }
        }
      }
    }
    return unsafeCells;
  };

  // Compute arc consistency
  const getArcConsistency = (): boolean[][] => {
    const arcInconsistentCells = Array(N).fill(0).map(() => Array(N).fill(false));

    for (let row = 0; row < N; row++) {
      for (let col = 0; col < N; col++) {
        if (!isSafe(board, row, col)) {
          arcInconsistentCells[row][col] = true;
        }
      }
    }

    return arcInconsistentCells;
  };

  // Toggle queen placement
  const handleCellClick = (row: number, col: number) => {
    const newBoard = board.map((r, i) =>
      r.map((c, j) => (i === row && j === col ? 1 - c : c))
    );
    setBoard(newBoard);
  };


  // Handle board size change
  const handleNChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value >= 1 && value <= 15) {
      setN(value);
      setBoard(Array(value).fill(0).map(() => Array(value).fill(0)));
    }
  };

  const resetBoard = () => {
    setBoard(Array(N).fill(0).map(() => Array(N).fill(0)));
    setShowForwardConsistency(false);
    setShowArcConsistency(false);
  };

  // Render the board
  const renderBoard = () => {
    const forwardConsistency = showForwardConsistency ? getForwardConsistency() : null;
    const arcConsistency = showArcConsistency ? getArcConsistency() : null;

    const maxSize = 1000; // Maximum board size in pixels
    const size = Math.min(maxSize, 75 * N); // Larger scaling factor for bigger squares
    const squareSize = size / N;

    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${N}, ${squareSize}px)`,
          gap: '2px',
          justifyContent: 'center',
          margin: '20px auto',
        }}
      >
        {board.map((row, i) =>
          row.map((cell, j) => (
            <div
              key={`${i}-${j}`}
              onClick={() => handleCellClick(i, j)}
              style={{
                width: squareSize,
                height: squareSize,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor:
                  cell === 1
                    ? '#00c853' // Green for queens
                    : forwardConsistency?.[i][j]
                      ? '#f88' // Red for forward consistency
                      : arcConsistency?.[i][j]
                        ? '#88f' // Blue for arc consistency
                        : (i + j) % 2 === 0
                          ? '#eaeaea' // Light gray for regular cells
                          : '#b0b0b0', // Dark gray for regular cells
                border: '1px solid #ccc',
                cursor: 'pointer',
              }}
            >
              {cell === 1 && (
                <span style={{ fontSize: `${squareSize * 0.6}px` }}>👑</span>
              )}
            </div>
          ))
        )}
      </div>
    );
  };

  const validateboard = (board: number[][]) => {
    let totalQueens = 0;
    for (let row = 0; row < N; row++) {
      for (let col = 0; col < N; col++) {
        if (board[row][col] === 1) totalQueens++;
        if (board[row][col] === 1 && !isSafe(board, row, col)) {
          alert('The user-placed queens are in an invalid configuration!');
          return;
        }
      }
    }
    if (totalQueens !== N) alert('User has not placed the required number of queens!');
    else
      alert('The user-placed queens are in a valid configuration!');
  }


  return (
    <div
      className="container d-flex flex-column align-items-center"
      style={{
        fontFamily: 'Roboto, sans-serif',
        padding: '20px',
        overflowY: 'auto',
        minHeight: '100vh',
      }}
    >
      <h1
        style={{
          fontWeight: 'bold',
          fontSize: '2.5rem',
          marginBottom: '20px',
        }}
      >
        N-Queens Solver
      </h1>

      <div
        className="controls mb-4"
        style={{
          display: 'flex',
          gap: '15px',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        <input
          type="number"
          min="1"
          max="15"
          value={N}
          onChange={handleNChange}
          placeholder="Enter board size (1-15)"
          style={{
            padding: '10px',
            fontSize: '1.2rem',
            borderRadius: '8px',
            border: '1px solid #ccc',
            textAlign: 'center',
          }}
        />
        <button
          onClick={() => solveNQ(board)}
          style={{
            padding: '10px 20px',
            fontSize: '1.2rem',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: '#007BFF',
            color: 'white',
            cursor: 'pointer',
            transition: 'background 0.2s ease',
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = '#0056b3')
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = '#007BFF')
          }
        >
          Solve
        </button>
        <button
          onClick={() => validateboard(board)}
          style={{
            padding: '10px 20px',
            fontSize: '1.2rem',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: '#00c853',
            color: 'white',
            cursor: 'pointer',
            transition: 'background 0.2s ease',
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = '#009624')
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = '#00c853')
          }
        >
          Validate
        </button>
        <button
          onClick={resetBoard}
          style={{
            padding: '10px 20px',
            fontSize: '1.2rem',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: '#FF5733',
            color: 'white',
            cursor: 'pointer',
            transition: 'background 0.2s ease',
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = '#cc4626')
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = '#FF5733')
          }
        >
          Reset
        </button>
        <button
          onClick={() => setShowForwardConsistency(!showForwardConsistency)}
          style={{
            padding: '10px 20px',
            fontSize: '1.2rem',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: showForwardConsistency ? '#00c853' : '#007BFF',
            color: 'white',
            cursor: 'pointer',
            transition: 'background 0.2s ease',
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = '#0056b3')
          }
          onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor =
            showForwardConsistency ? '#00c853' : '#007BFF')
          }
        >
          Toggle Forward Consistency
        </button>
        <button
          onClick={() => setShowArcConsistency(!showArcConsistency)}
          style={{
            padding: '10px 20px',
            fontSize: '1.2rem',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: showArcConsistency ? '#00c853' : '#007BFF',
            color: 'white',
            cursor: 'pointer',
            transition: 'background 0.2s ease',
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = '#0056b3')
          }
          onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor =
            showArcConsistency ? '#00c853' : '#007BFF')
          }
        >
          Toggle Arc Consistency
        </button>
      </div>

      {renderBoard()}
    </div>
  );
};

export default NQBoard;