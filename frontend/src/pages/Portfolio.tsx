export default function Portfolio() {
  return (
    <div style={{ padding: '20px' }}>
      <h1 className="page-title">Portfolio</h1>
      <p className="page-subtitle">Apni holdings dekhein</p>

      <div style={{ background: '#0a0a0a', borderRadius: '16px', padding: '24px', color: 'white', marginBottom: '16px' }}>
        <div style={{ fontSize: '12px', color: '#888', marginBottom: '8px' }}>TOTAL VALUE</div>
        <div style={{ fontSize: '42px', fontWeight: 900 }}>$0.00</div>
      </div>

      <div style={{ background: 'white', border: '2px solid #0a0a0a', borderRadius: '12px', padding: '24px', textAlign: 'center' }}>
        <div style={{ fontSize: '40px', marginBottom: '10px' }}>👛</div>
        <p style={{ fontSize: '14px', color: '#666' }}>Wallet connect karein</p>
      </div>
    </div>
  );
}
