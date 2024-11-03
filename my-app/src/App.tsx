import { useState } from 'react';
import Navbar from './components/Navbar';
import About from './components/About';
import Home from './components/Home';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import Alert from './components/Alert';

type AlertType = {
  msg: string;
  type: string;
} | null;

function App() {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const [alert, setAlert] = useState<AlertType>(null);

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

  const showAlert = (message: string, type: string) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 500);
  };

  return (
    <>
      <Router>
        <Navbar title="FAI-App" mode={mode} toggleMode={toggleMode} />
        <Alert alert={alert} />
        <div className="container my-3">
          <Routes>
            <Route path="/" element={<Home showAlert={showAlert} />} />
            <Route path="/about" element={<About showAlert={showAlert} />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
