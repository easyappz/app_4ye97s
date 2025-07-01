import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Calculator from './components/Calculator';
import ErrorBoundary from './ErrorBoundary';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>iPhone Calculator</h1>
        </header>
        <main>
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<Calculator />} />
            </Routes>
          </ErrorBoundary>
        </main>
      </div>
    </Router>
  );
}

export default App;