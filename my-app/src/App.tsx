import { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Board from './components/Jigsaw-Sudoku/Board';
import NQBoard from './components/N-Queens/NQBoard';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';

function App() {
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  const toggleMode = () => {
    if (mode === 'light') {
      setMode('dark');
      document.body.style.backgroundColor = '#343a40';
      document.body.style.color = 'white';
    } else {
      setMode('light');
      document.body.style.backgroundColor = '#fff';
      document.body.style.color = '#000';
    }
  };

  return (
    <>
      <Router basename={process.env.PUBLIC_URL}>
        <Navbar title="FAI-App" mode={mode} toggleMode={toggleMode} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/NQueens" element={<NQBoard />} />
          <Route path="/Jigsaw-Sudoku" element={<Board />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
