// App.jsx
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import UserProfile from './pages/UserProfile';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) setIsLoggedIn(true);
  }, []);

  const handleLoginSuccess = (data) => {
    setIsLoggedIn(true);
    localStorage.setItem('token', data.token); 
    localStorage.setItem('user', JSON.stringify(data.user)); 
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Navigate to={isLoggedIn ? '/dashboard' : '/login'} />}
        />

        <Route
          path="/login"
          element={
            isLoggedIn ? (
              <Navigate to="/dashboard" />
            ) : (
              <Login onLoginSuccess={handleLoginSuccess} />
            )
          }
        />

        <Route
          path="/register"
          element={
            isLoggedIn ? (
              <Navigate to="/dashboard" />
            ) : (
              <Register onRegisterSuccess={handleLoginSuccess} />
            )
          }
        />

        <Route
  path="/profile"
  element={
    isLoggedIn ? <UserProfile /> : <Navigate to="/login" />
  }
/>

        <Route
          path="/dashboard"
          element={
            isLoggedIn ? <Dashboard /> : <Navigate to="/login" />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
