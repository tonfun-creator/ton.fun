import { Address, toNano } from '@ton/core';
import { TokenFactory } from '../wrappers/TokenFactory';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const contractAddress = Address.parse('EQDOOYa7i7JYLSp-UKY7KgccKYOKgfcikhXmkWp3F8sUG4nP');
    const tokenFactory = provider.open(TokenFactory.createFromAddress(contractAddress));

    console.log('📊 Before:');
    console.log('Token Count:', (await tokenFactory.getTokenCount()).toString());

    console.log('\n🚀 Creating token with 2 TON...');
    
    await tokenFactory.sendCreateToken(provider.sender(), toNano('2'));

    console.log('✅ Transaction sent! Waiting 30 seconds...');
    await new Promise(resolve => setTimeout(resolve, 30000));

    console.log('\n📊 After:');
    const newCount = await tokenFactory.getTokenCount();
    console.log('Token Count:', newCount.toString());
    
    if (newCount > 0n) {
        console.log('🎉 Token created successfully!');
    } else {
        console.log('⚠️ Token count still 0. Check Tonscan for details.');
    }
}
