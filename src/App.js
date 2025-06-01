import React, { useEffect } from 'react';
import './App.css'; // Optional, in case styling is needed later

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
    <div style={{
      margin: 0,
      fontFamily: "'DM Sans', sans-serif",
      backgroundColor: '#2D014D',
      color: '#FFFFFF',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      textAlign: 'center'
    }}>
      <img src="logo.png" alt="TaskerPI Logo" style={{ width: '90px', marginBottom: '1.5em' }} />
      <h1 style={{ fontSize: '3em', color: '#B97FFF', marginBottom: '0.3em' }}>Welcome to TaskerPI</h1>
      <p style={{ fontSize: '1.1em', maxWidth: '520px', lineHeight: '1.6', marginBottom: '2em' }}>
        A clean and minimal Pi Network prototype built for clarity, elegance, and focused testing in the Web3 ecosystem.
      </p>
      <button onClick={handleLogin} style={{
        backgroundColor: '#FFA300',
        color: '#2D014D',
        border: 'none',
        padding: '0.75em 2em',
        fontSize: '1em',
        fontWeight: 400,
        borderRadius: '8px',
        cursor: 'pointer',
        transition: 'background 0.3s ease'
      }}>
        Login with Pi
      </button>
    </div>
  );
}

export default App;
