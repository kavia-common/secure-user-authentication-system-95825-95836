import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import './App.css';
import './styles/theme.css';
import Login from './pages/Login';
import Register from './pages/Register';

const BrandHeader = () => (
  <header className="brand-header" role="banner">
    <div className="brand-container">
      <div className="brand-logo" aria-hidden="true">🌊</div>
      <div className="brand-title">
        <h1 className="app-title">OceanAuth</h1>
        <p className="app-subtitle">Secure sign-in made simple</p>
      </div>
      <nav className="brand-nav" aria-label="Primary">
        <Link className="nav-link" to="/login">Login</Link>
        <Link className="nav-link" to="/register">Register</Link>
      </nav>
    </div>
  </header>
);

// PUBLIC_INTERFACE
function App() {
  /** Root application with router and authentication routes. */
  return (
    <div className="App ocean-bg">
      <BrowserRouter>
        <BrandHeader />
        <main>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
