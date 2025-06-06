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
    console.log("Login clicked");
    if (window.Pi) {
      console.log("Attempting login...");
      window.Pi.authenticate(['username', 'payments'], (result) => {
        console.log("Authenticated:", result);
        alert(`Welcome, ${result.user.username}!`);
      }, (error) => {
        console.error("Authentication failed:", error);
        alert("Authentication failed. Check the console.");
      });
    } else {
      alert("Pi SDK not available.");
    }
  };

  const handleInlineDonate = () => {
    if (window.Pi) {
      window.Pi.createPayment({
        amount: 0.001,
        memo: "Inline test payment from TaskerPI",
        metadata: { type: "inline-donation" },
        to: "app_wallet",
      }, {
        onReadyForServerApproval: (paymentId) => {
          console.log("Ready for server approval:", paymentId);
        },
        onReadyForServerCompletion: (paymentId, txid) => {
          console.log("Ready for server completion:", paymentId, txid);
          alert(`✅ Payment approved!\nPaymentID: ${paymentId}`);
        },
        onCancel: () => {
          console.log("❌ Payment cancelled by user");
          alert("Payment cancelled.");
        },
        onError: (error) => {
          console.error("❌ Payment error:", error);
          alert("Payment error occurred.");
        }
      });
    } else {
      alert("Pi SDK not available.");
    }
  };

  const handleNavigate = () => {
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

      <button onClick={handleLogin} style={buttonStyle}>Login with Pi</button>
      <div style={{ height: '1em' }} />
      <button onClick={handleNavigate} style={buttonStyle}>Go to Donate page</button>
      <div style={{ height: '1em' }} />
      <button onClick={handleInlineDonate} style={buttonStyle}>Donate 0.001 Pi (inline)</button>
    </div>
  );
}

const buttonStyle = {
  backgroundColor: '#FFA300',
  color: '#2D014D',
  border: 'none',
  padding: '0.75em 2em',
  fontSize: '1em',
  fontWeight: 400,
  borderRadius: '8px',
  cursor: 'pointer',
  transition: 'background 0.3s ease'
};

export default App;
