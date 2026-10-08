import { beginCell } from '@ton/core';

// ton.fun Contract Addresses (Testnet)
export const CONTRACTS = {
  tokenFactory: 'EQDOOYa7i7JYLSp-UKY7KgccKYOKgfcikhXmkWp3F8sUG4nP',
  bondingCurve: 'EQA5gJ1h3vnXvbA3blJeeL2i9OEdhza8j1vfNMxAbSypox3o',
  platformWallet: 'EQAR5a675LvSpiCeoFuhB5RDpcSODbzZcDPYHZ7do09OvzC5',
};

// Op codes
export const OP_CREATE_TOKEN = 1;
export const OP_BUY = 1;
export const OP_SELL = 2;

// Fee constants (nanoTON)
export const CREATION_FEE = 1000000000n; // 1 TON
export const MIN_FIRST_BUY = 500000000n; // 0.5 TON

// Build create token body
export function buildCreateTokenBody(name: string, symbol: string) {
  return beginCell()
    .storeUint(OP_CREATE_TOKEN, 32)
    .storeUint(0, 64)
    .storeStringRefTail(name)
    .storeStringRefTail(symbol)
    .endCell();
}

// Build buy body
export function buildBuyBody() {
  return beginCell()
    .storeUint(OP_BUY, 32)
    .storeUint(0, 64)
    .endCell();
}

// Build sell body
export function buildSellBody(tokensAmount: bigint) {
  return beginCell()
    .storeUint(OP_SELL, 32)
    .storeUint(0, 64)
    .storeCoins(tokensAmount)
    .endCell();
}
