import { Address, beginCell, Cell, toNano } from '@ton/core';
import { compile, NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const owner = Address.parse('0QCQKJzAAkrAGOCO8o5mybx1NQTOUp7Akh3SofTb5lN4c-Lq');
    const master = Address.parse('EQC5x99vVEQamlThLxVRotGaU9Xo-f4bL_Pv-8-Mp4yKEHhO');
    
    const walletCode = await compile('JettonWallet');
    
    const walletData = beginCell()
        .storeCoins(0)
        .storeAddress(owner)
        .storeAddress(master)
        .storeRef(walletCode)
        .endCell();
    
    // CORRECT StateInit format: use storeMaybeRef not storeRef
    const stateInit = beginCell()
        .storeUint(0, 2)              // split_depth + special
        .storeMaybeRef(walletCode)    // code (with maybe bit)
        .storeMaybeRef(walletData)    // data (with maybe bit)
        .storeUint(0, 1)              // library
        .endCell();
    
    const walletAddress = new Address(0, stateInit.hash());
    
    console.log('👤 Owner:', owner.toString());
    console.log('💎 Master:', master.toString());
    console.log('\n📌 Jetton Wallet Address:');
    console.log(walletAddress.toString());
    console.log('\n🔗 View at:');
    console.log('https://testnet.tonviewer.com/' + walletAddress.toString());
}
