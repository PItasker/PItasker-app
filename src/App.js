import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    if (window.Pi) {
      window.Pi.init({ version: "2.0", sandbox: true });
      console.log("Pi SDK initialized in sandbox mode.");
    }
  }, []);

  const handleLogin = async () => {
    console.log("Login clicked");
    if (!window.Pi) {
      alert("Pi SDK not available.");
      return;
    }

    console.log("Attempting login...");
    try {
      const result = await new Promise((resolve, reject) => {
        window.Pi.authenticate(['username', 'payments'], resolve, reject);
      });
      console.log("Authenticated:", result);
      alert(`Welcome, ${result.user.username}!`);
      navigate('/donate');
    } catch (error) {
      console.error("Authentication failed:", error);
      alert("Authentication failed. Check the console.");
    }
  };

  const skipToDonate = () => {
    console.log("Bypassing login, going to donate page...");
    navigate('/donate');
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
        A Pi Network App prototype focused on testing the Web3 ecosystem.
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
        transition: 'background 0.3s ease',
        marginBottom: '1em'
      }}>
        Login with Pi
      </button>

      <button onClick={skipToDonate} style={{
        backgroundColor: '#ffffff20',
        color: '#FFFFFF',
        border: '1px solid #FFA300',
        padding: '0.6em 1.5em',
        fontSize: '0.95em',
        borderRadius: '6px',
        cursor: 'pointer',
        transition: 'border 0.3s ease'
      }}>
        👉 Go to Donate (debug bypass)
      </button>
    </div>
  );
}

export default App;
