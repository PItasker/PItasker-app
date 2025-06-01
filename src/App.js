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

  const handlePayment = () => {
    if (window.Pi) {
      window.Pi.createPayment({
        amount: 0.001,
        memo: "Test payment to TaskerPI",
        metadata: { type: "donation" },
        to: "app_wallet", // questo campo sarà ignorato in sandbox
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

      <button onClick={handlePayment} style={{
        backgroundColor: '#2D014D',
        color: '#FFA300',
        border: '2px solid #FFA300',
        padding: '0.75em 2em',
        fontSize: '1em',
        fontWeight: 400,
        borderRadius: '8px',
        marginTop: '1em',
        cursor: 'pointer',
        transition: 'all 0.3s ease'
      }}>
        💸 Donate 0.001 Pi
      </button>

      
    </div>
  );
}

export default App;
