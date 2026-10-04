import { toNano, Address } from '@ton/core';
import { BondingCurve } from '../wrappers/BondingCurve';
import { compile, NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const creator = provider.sender().address!;
    const platformWallet = Address.parse('EQAR5a675LvSpiCeoFuhB5RDpcSODbzZcDPYHZ7do09OvzC5');
    
    const bondingCurve = provider.open(
        BondingCurve.createFromConfig(
            1n,
            'TestToken',
            'TEST',
            creator,
            platformWallet,
            await compile('BondingCurve')
        )
    );

    await bondingCurve.sendDeploy(provider.sender(), toNano('0.1'));

    await provider.waitForDeploy(bondingCurve.address);

    console.log('✅ BondingCurve deployed at:', bondingCurve.address.toString());
    console.log('👤 Creator:', creator.toString());
}
