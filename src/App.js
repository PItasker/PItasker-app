import React, { useEffect } from 'react';

function App() {
  useEffect(() => {
    if (window.Pi) {
      window.Pi.init({ version: "2.0", sandbox: true });
      console.log("Pi SDK initialized in sandbox mode.");
    }
  }, []);

  const handleLogin = () => {
    if (window.Pi) {
      window.Pi.authenticate(['username'], (result) => {
        console.log("Authenticated:", result);
        alert(`Welcome, ${result.user.username}!`);
      }, (error) => {
        console.error("Authentication failed:", error);
        alert("Authentication failed. Check the console.");
      });
    } else {
      alert("Pi SDK not loaded.");
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Hello from Pi App!</h1>
      <p>This is a test app for Pi Network integration in sandbox mode.</p>
      <button onClick={handleLogin}>Login with Pi</button>
    </div>
  );
}

export default App;
