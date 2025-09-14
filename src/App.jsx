import React, { useState } from 'react';
import HomePage from './components/HomePage';
import MainApp from './MainApp'; // main party menu app component

function App() {
  const [user, setUser] = useState(null);

  // Login handler sets the user state on successful login
  const login = (username) => {
    setUser({ username });
    return true;
  };

  // Logout handler resets user to null
  const logout = () => setUser(null);

  return (
    <>
      {user ? (
        <MainApp user={user} logout={logout} />
      ) : (
        <HomePage login={login} />
      )}
    </>
  );
}

export default App;
