import { Address, toNano } from '@ton/core';
import { BondingCurve } from '../wrappers/BondingCurve';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const contractAddress = Address.parse('EQA5gJ1h3vnXvbA3blJeeL2i9OEdhza8j1vfNMxAbSypox3o');
    const bondingCurve = provider.open(BondingCurve.createFromAddress(contractAddress));

    console.log('📊 Before Buy:');
    console.log('Supply:', (await bondingCurve.getSupply()).toString());
    console.log('Raised:', (await bondingCurve.getRaised()).toString());
    console.log('Price:', (await bondingCurve.getPrice()).toString());

    console.log('\n🚀 Sending 1 TON to contract...');

    try {
        await bondingCurve.sendBuy(provider.sender(), toNano('1'));
        console.log('✅ Transaction sent!');
    } catch (error) {
        console.log('❌ ERROR:', error);
        return;
    }

    console.log('⏳ Waiting 45 seconds...');
    await new Promise(resolve => setTimeout(resolve, 45000));

    console.log('\n📊 After Buy:');
    console.log('Supply:', (await bondingCurve.getSupply()).toString());
    console.log('Raised:', (await bondingCurve.getRaised()).toString());
    console.log('Price:', (await bondingCurve.getPrice()).toString());

    // Check user balance
    const userAddress = provider.sender().address!;
    const userBalance = await bondingCurve.getUserBalance(userAddress);
    console.log('\n👤 Your Token Balance:', userBalance.toString());
}
