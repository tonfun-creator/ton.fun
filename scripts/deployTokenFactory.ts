import { toNano, Address } from '@ton/core';
import { TokenFactory } from '../wrappers/TokenFactory';
import { compile, NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const platformWallet = Address.parse('EQAR5a675LvSpiCeoFuhB5RDpcSODbzZcDPYHZ7do09OvzC5');
    const owner = provider.sender().address!;
    
    const tokenFactory = provider.open(
        TokenFactory.createFromConfig(owner, platformWallet, await compile('TokenFactory'))
    );

    await tokenFactory.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(tokenFactory.address);

    console.log('✅ TokenFactory deployed at:', tokenFactory.address.toString());
    console.log('👤 Owner:', owner.toString());
    console.log('💰 Platform Wallet:', platformWallet.toString());
}
