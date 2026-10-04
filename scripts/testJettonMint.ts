import { toNano, Address } from '@ton/core';
import { JettonMaster } from '../wrappers/JettonMaster';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    // ⚠️ Deploy ke baad ye address update karein
const masterAddress = Address.parse('EQC5x99vVEQamlThLxVRotGaU9Xo-f4bL_Pv-8-Mp4yKEHhO');
    const jettonMaster = provider.open(JettonMaster.createFromAddress(masterAddress));

    const recipient = provider.sender().address!;

    console.log('📊 Before Mint:');
    console.log('Total Supply:', (await jettonMaster.getTotalSupply()).toString());

    console.log('\n🚀 Minting 1000 tokens to:', recipient.toString());

    try {
        await jettonMaster.sendMint(
            provider.sender(),
            toNano('0.1'),
            recipient,
            1000000000n        // 1000 tokens (9 decimals)
        );
        console.log('✅ Mint transaction sent!');
    } catch (error) {
        console.log('❌ ERROR:', error);
        return;
    }

    console.log('⏳ Waiting 45 seconds...');
    await new Promise(resolve => setTimeout(resolve, 45000));

    console.log('\n📊 After Mint:');
    console.log('Total Supply:', (await jettonMaster.getTotalSupply()).toString());
}
