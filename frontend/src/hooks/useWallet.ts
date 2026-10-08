import { useTonAddress, useTonConnectUI } from '@tonconnect/ui-react';

export function useWallet() {
  const address = useTonAddress();
  const [tonConnectUI] = useTonConnectUI();

  const shortAddress = address
    ? `${address.slice(0, 4)}...${address.slice(-4)}`
    : '';

  const isConnected = !!address;

  const disconnect = () => tonConnectUI.disconnect();

  const sendTransaction = async (to: string, amount: string, payload?: string) => {
    if (!address) throw new Error('Wallet not connected');
    const tx = {
      validUntil: Math.floor(Date.now() / 1000) + 360,
      messages: [{
        address: to,
        amount,
        ...(payload ? { payload } : {}),
      }],
    };
    return tonConnectUI.sendTransaction(tx);
  };

  return {
    address,
    shortAddress,
    isConnected,
    disconnect,
    sendTransaction,
    tonConnectUI,
  };
}
