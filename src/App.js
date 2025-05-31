import React from 'react';

function App() {
  const handleLogin = () => {
    if (window.Pi) {
      window.Pi.authenticate(['username'], (res) => {
        console.log("Authenticated:", res);
        alert(`Welcome, ${res.user.username}!`);
      }, console.error);
    } else {
      alert("Pi SDK not loaded");
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Hello from Pi App!</h1>
      <p>This is a test app for Pi Network integration.</p>
      <button onClick={handleLogin}>Login with Pi</button>
    </div>
  );
}

export default App;
