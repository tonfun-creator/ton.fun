export default function Privacy() {
  return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh', margin: '-16px', padding: '20px 16px 80px 0', color: '#fff' }}>
      <div style={{ padding: '0 16px' }}>
        <button
          onClick={() => window.history.back()}
          style={{ background: 'transparent', border: 'none', color: '#4ade80', fontSize: '14px', fontWeight: 700, cursor: 'pointer', marginBottom: '16px', padding: 0 }}
        >
          ← Back
        </button>

        <h1 style={{ fontSize: '24px', fontWeight: 900, marginBottom: '4px' }}>Privacy Policy</h1>
        <p style={{ fontSize: '12px', color: '#888', marginBottom: '20px' }}>Last updated: October 2026</p>

        <div style={{ fontSize: '14px', lineHeight: 1.7, color: '#ccc' }}>
          {[
            { title: '1. Information We Collect', text: 'ton.fun collects minimal data required to provide our services. When you connect via Telegram, we receive your public Telegram username and ID. We do not collect your private keys, wallet seed phrases, or any sensitive financial information.' },
            { title: '2. How We Use Your Information', text: 'Your Telegram username is used to display your profile and referral leaderboard position. Wallet addresses are stored locally on your device for tracking your rewards. We never sell or share your data with third parties.' },
            { title: '3. Blockchain Data', text: 'All transactions on ton.fun are public and recorded on the TON blockchain. This includes token creation, buy/sell transactions, and wallet addresses. This data is immutable and cannot be deleted.' },
            { title: '4. Cookies & Local Storage', text: 'We use browser localStorage to store your rewards balance, watchlist, settings, and referral data. This data stays on your device and is not transmitted to our servers.' },
            { title: '5. Third-Party Services', text: 'We use TonConnect for wallet connection, TON blockchain for transactions, and Telegram for authentication. Each service has its own privacy policy.' },
            { title: '6. Security', text: 'We use industry-standard security practices. However, you are responsible for securing your wallet and Telegram account. ton.fun never has access to your private keys.' },
            { title: '7. Children\'s Privacy', text: 'ton.fun is not intended for users under 18. We do not knowingly collect information from children.' },
            { title: '8. Changes to Policy', text: 'We may update this policy from time to time. Continued use of ton.fun means you accept the updated policy.' },
            { title: '9. Contact', text: 'For privacy concerns, contact us via our support chat or Telegram channel.' },
          ].map((section, i) => (
            <div key={i} style={{ marginBottom: '20px' }}>
              <h2 style={{ fontSize: '15px', fontWeight: 900, color: '#4ade80', marginBottom: '6px' }}>{section.title}</h2>
              <p>{section.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
