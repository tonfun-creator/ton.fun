import { Address } from '@ton/core';
import { BondingCurve } from '../wrappers/BondingCurve';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    // ⚠️ Ye address deploy ke baad update karein
    const contractAddress = Address.parse('PASTE_NEW_DEPLOYED_ADDRESS');
    const bondingCurve = provider.open(BondingCurve.createFromAddress(contractAddress));

    console.log('📊 BondingCurve Info:');
    console.log('Supply:', (await bondingCurve.getSupply()).toString());
    console.log('Raised:', (await bondingCurve.getRaised()).toString());
    console.log('Price:', (await bondingCurve.getPrice()).toString());
    console.log('Graduated:', (await bondingCurve.isGraduated()).toString());
    console.log('Creator:', (await bondingCurve.getCreator()).toString());
}
