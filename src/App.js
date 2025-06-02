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

  const handleLogin = () => {
  alert("FORZATO: vado su /donate senza login");
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
        transition: 'background 0.3s ease'
      }}>
        Login with Pi
      </button>
    </div>
  );
}

export default App;