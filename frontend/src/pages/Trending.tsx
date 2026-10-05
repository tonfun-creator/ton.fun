const MOVERS = [
  { id: '1', name: 'NUTFLEX', symbol: 'NUTFLEX', emoji: '🍎', vol: '$802K', mcap: '$116.5K', change: '+2630%', holders: '739', tx: '11.7K' },
  { id: '2', name: 'trenchdots.fun', symbol: 'TRENCH', emoji: '🪖', vol: '$2M', mcap: '$217.8K', change: '+1840%', holders: '2.3K', tx: '26.6K' },
  { id: '3', name: 'Arthur', symbol: 'ARTHUR', emoji: '🦍', vol: '$3M', mcap: '$1.5M', change: '+980%', holders: '3.2K', tx: '33.9K' },
  { id: '4', name: 'Super Intelligence', symbol: 'SI', emoji: '🧠', vol: '$3M', mcap: '$338.3K', change: '+720%', holders: '2.3K', tx: '49.6K' },
  { id: '5', name: 'Commander Vrax', symbol: 'VRAX', emoji: '😼', vol: '$13M', mcap: '$3.8M', change: '+450%', holders: '4.9K', tx: '68.4K' },
  { id: '6', name: 'unites states', symbol: 'US', emoji: '🇺🇸', vol: '$630K', mcap: '$457.7K', change: '+380%', holders: '1K', tx: '8.7K' },
  { id: '7', name: 'sender', symbol: 'SENDER', emoji: '😎', vol: '$656K', mcap: '$203.5K', change: '+290%', holders: '1K', tx: '12.6K' },
  { id: '8', name: 'AirPod', symbol: 'AIRPOD', emoji: '🎧', vol: '$819K', mcap: '$745.5K', change: '+250%', holders: '2.1K', tx: '15.2K' },
];

export default function Trending() {
  return (
    <div style={{ padding: '0 0 80px 0' }}>
      <div style={{ padding: '16px' }}>
        <h1 className="page-title">Movers</h1>
        <p className="page-subtitle">🔥 Hot tokens on ton.fun</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {MOVERS.map(m => (
            <div key={m.id} style={{
              background: 'white',
              border: '2px solid #0a0a0a',
              borderRadius: '12px',
              padding: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                background: '#e0f5e0',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '26px',
                flexShrink: 0,
              }}>
                {m.emoji}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                  <span style={{ fontWeight: 800, fontSize: '14px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {m.name}
                  </span>
                  <span style={{
                    background: '#ff4444',
                    color: 'white',
                    fontSize: '9px',
                    fontWeight: 800,
                    padding: '2px 6px',
                    borderRadius: '4px',
                  }}>
                    HOT
                  </span>
                </div>
                <div style={{ fontSize: '10px', color: '#666', fontWeight: 600 }}>
                  {m.symbol} · 👤 {m.holders} · 📊 {m.tx} TX
                </div>
              </div>
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <div style={{ fontSize: '12px', fontWeight: 900 }}>
                  V {m.vol} · MC {m.mcap}
                </div>
                <div style={{ fontSize: '12px', fontWeight: 800, color: '#16a34a' }}>
                  ↑ {m.change}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
