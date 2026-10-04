import { Address } from '@ton/core';
import { TokenFactory } from '../wrappers/TokenFactory';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const contractAddress = Address.parse('EQDOOYa7i7JYLSp-UKY7KgccKYOKgfcikhXmkWp3F8sUG4nP');
    const tokenFactory = provider.open(TokenFactory.createFromAddress(contractAddress));

    const tokenCount = await tokenFactory.getTokenCount();
    const creationFee = await tokenFactory.getCreationFee();
    const owner = await tokenFactory.getOwner();
    const platform = await tokenFactory.getPlatformWallet();

    console.log('📊 Contract Info:');
    console.log('Token Count:', tokenCount.toString());
    console.log('Creation Fee:', creationFee.toString(), 'nanoTON (', Number(creationFee) / 1e9, 'TON )');
    console.log('Owner:', owner.toString());
    console.log('Platform Wallet:', platform.toString());
}
