import React, { useState } from 'react';

const NQBoard: React.FC = () => {
  const [N, setN] = useState<number | string>(8); // Default size
  const [board, setBoard] = useState<number[][]>(
    Array(8).fill(Array(8).fill(0))
  );
  const [isSolved, setIsSolved] = useState<boolean>(false);

  // Check if placing a queen is safe
  const isSafe = (board: number[][], row: number, col: number): boolean => {
    for (let i = 0; i < row; i++) if (board[i][col] === 1) return false;
    for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--)
      if (board[i][j] === 1) return false;
    for (let i = row - 1, j = col + 1; i >= 0 && j < Number(N); i--, j++)
      if (board[i][j] === 1) return false;

    return true;
  };

  // Recursive function for solving N-Queens
  const solveNQUtil = (board: number[][], row: number): boolean => {
    if (row === Number(N)) return true;

    for (let col = 0; col < Number(N); col++) {
      if (isSafe(board, row, col)) {
        board[row][col] = 1;
        if (solveNQUtil(board, row + 1)) return true;
        board[row][col] = 0; // Backtrack
      }
    }

    return false;
  };

  const solveNQ = () => {
    const newBoard = Array(Number(N))
      .fill(0)
      .map(() => Array(Number(N)).fill(0));

    if (solveNQUtil(newBoard, 0)) {
      setBoard(newBoard);
      setIsSolved(true);
    } else {
      alert('Solution does not exist for this size.');
    }
  };

  const handleNChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '') {
      setN(8); // Default to 8 when empty
      setBoard(Array(8).fill(Array(8).fill(0)));
      setIsSolved(false);
    } else {
      const numericValue = Number(value);
      if (numericValue >= 1 && numericValue <= 15) {
        setN(numericValue);
        setBoard(
          Array(numericValue).fill(Array(numericValue).fill(0))
        );
        setIsSolved(false);
      }
    }
  };

  const resetBoard = () => {
    setN(8);
    setBoard(Array(8).fill(Array(8).fill(0)));
    setIsSolved(false);
  };

  const renderBoard = () => {
    const maxSize = 1000; // Maximum board size in pixels
    const size = Math.min(maxSize, 75 * (typeof N === 'number' ? N : 8)); // Larger scaling factor for bigger squares
    const squareSize = size / (typeof N === 'number' ? N : 8);

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
        {board.flat().map((cell, index) => (
          <div
            key={index}
            style={{
              width: squareSize,
              height: squareSize,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: squareSize / 2,
              backgroundColor:
                (Math.floor(index / Number(N)) + (index % Number(N))) % 2 === 0
                  ? '#eaeaea'
                  : '#b0b0b0', // Softer colors for better contrast
              color:
                (Math.floor(index / Number(N)) + (index % Number(N))) % 2 === 0
                  ? '#000'
                  : '#333', // Ensure text visibility
              border: '1px solid #ccc', // Subtle border
              borderRadius: 4,
              transition: 'transform 0.2s ease',
            }}
          >
            {cell === 1 && <span>👑</span>}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div
      className="container d-flex flex-column align-items-center"
      style={{
        fontFamily: 'Roboto, sans-serif',
        padding: '20px',
        overflowY: 'auto', // Allow scrolling when content overflows
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
          onClick={solveNQ}
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
      </div>

      {renderBoard()}

      <button
        onClick={resetBoard}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          fontSize: '1.2rem',
          borderRadius: '8px',
          border: 'none',
          backgroundColor: '#FF4136',
          color: 'white',
          cursor: 'pointer',
          transition: 'background 0.2s ease',
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = '#B32D21')
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = '#FF4136')
        }
      >
        Reset
      </button>
    </div>
  );
};

export default NQBoard;