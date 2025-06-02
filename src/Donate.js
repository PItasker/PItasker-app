import React from 'react';

function Donate() {
  const handlePayment = () => {
    if (window.Pi) {
      window.Pi.createPayment({
        amount: 0.001,
        memo: "Test payment to TaskerPI",
        metadata: { type: "donation" },
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
      <h1 style={{ fontSize: '2.5em', color: '#B97FFF', marginBottom: '1em' }}>Ready to Donate?</h1>
      <button onClick={handlePayment} style={{
        backgroundColor: '#2D014D',
        color: '#FFA300',
        border: '2px solid #FFA300',
        padding: '0.75em 2em',
        fontSize: '1em',
        fontWeight: 400,
        borderRadius: '8px',
        cursor: 'pointer',
        transition: 'all 0.3s ease'
      }}>
        💸 Donate 0.001 Pi
      </button>
    </div>
  );
}

export default Donate;