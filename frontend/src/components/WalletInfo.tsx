import { useTonAddress, useTonConnectUI } from '@tonconnect/ui-react';

export default function WalletInfo() {
  const userFriendlyAddress = useTonAddress();
  const [tonConnectUI] = useTonConnectUI();

  if (!userFriendlyAddress) return null;

  const shortAddress = `${userFriendlyAddress.slice(0, 4)}...${userFriendlyAddress.slice(-4)}`;

  return (
    <div className="wallet-info">
      <div className="wallet-address">
        <span className="wallet-dot" />
        {shortAddress}
      </div>
      <button
        className="wallet-disconnect"
        onClick={() => tonConnectUI.disconnect()}
      >
        Disconnect
      </button>
    </div>
  );
}
