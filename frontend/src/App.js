import './App.css';
import { HashRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './Pages/home';
import { Page1 } from './Pages/page1';
import Page2 from './Pages/page2';
import Dashboard from './Pages/dashboard';
import { AuthProvider } from './Pages/auth';
import React from 'react';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/page1">Page 1</Link>
              </li>
              <li>
                <Link to="/page2">Page 2</Link>
              </li>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
            </ul>
          </nav>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/page1" element={<Page1 />} />
            <Route path="/page2" element={<Page2 />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;