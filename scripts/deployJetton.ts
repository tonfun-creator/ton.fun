import { toNano, Address, beginCell, Cell } from '@ton/core';
import { JettonMaster } from '../wrappers/JettonMaster';
import { compile, NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const admin = provider.sender().address!;
    const bondingCurve = provider.sender().address!;   // temporary: same as admin

    // Token metadata (TEP-64 on-chain content)
    const content = beginCell()
        .storeUint(0, 8)                    // snake format
        .storeStringTail('TestToken')
        .endCell();

    // Compile JettonWallet code (needed as ref inside master)
    const jettonWalletCode = await compile('JettonWallet');

    const jettonMaster = provider.open(
        JettonMaster.createFromConfig(
            admin,
            content,
            jettonWalletCode,
            bondingCurve,
            await compile('JettonMaster')
        )
    );

    await jettonMaster.sendDeploy(provider.sender(), toNano('0.1'));
    await provider.waitForDeploy(jettonMaster.address);

    console.log('✅ JettonMaster deployed at:', jettonMaster.address.toString());
    console.log('👤 Admin:', admin.toString());
    console.log('💰 Bonding Curve:', bondingCurve.toString());
    console.log('\n📌 IMPORTANT: Copy the JettonMaster address!');
    console.log('   JettonMaster:', jettonMaster.address.toString());
}
