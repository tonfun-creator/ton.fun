import { Address, toNano } from '@ton/core';
import { BondingCurve } from '../wrappers/BondingCurve';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const contractAddress = Address.parse('EQA5gJ1h3vnXvbA3blJeeL2i9OEdhza8j1vfNMxAbSypox3o');
    const bondingCurve = provider.open(BondingCurve.createFromAddress(contractAddress));

    const userAddress = provider.sender().address!;

    console.log('📊 Before Sell:');
    console.log('Supply:', (await bondingCurve.getSupply()).toString());
    console.log('Raised:', (await bondingCurve.getRaised()).toString());
    console.log('Price:', (await bondingCurve.getPrice()).toString());
    console.log('Your Balance:', (await bondingCurve.getUserBalance(userAddress)).toString());

    const tokensToSell = 10n;

    console.log(`\n🚀 Selling ${tokensToSell} tokens...`);

    try {
        await bondingCurve.sendSell(provider.sender(), toNano('0.05'), tokensToSell);
        console.log('✅ Transaction sent!');
    } catch (error) {
        console.log('❌ ERROR:', error);
        return;
    }

    console.log('⏳ Waiting 45 seconds...');
    await new Promise(resolve => setTimeout(resolve, 45000));

    console.log('\n📊 After Sell:');
    console.log('Supply:', (await bondingCurve.getSupply()).toString());
    console.log('Raised:', (await bondingCurve.getRaised()).toString());
    console.log('Price:', (await bondingCurve.getPrice()).toString());
    console.log('Your Balance:', (await bondingCurve.getUserBalance(userAddress)).toString());
}
