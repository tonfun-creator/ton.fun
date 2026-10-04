import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode } from '@ton/core';

export class JettonMaster implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new JettonMaster(address);
    }

    static createFromConfig(
        admin: Address,
        content: Cell,
        jettonWalletCode: Cell,
        bondingCurve: Address,
        code: Cell,
        workchain = 0
    ) {
        const data = beginCell()
            .storeCoins(0)                    // total_supply
            .storeAddress(admin)
            .storeRef(content)
            .storeRef(jettonWalletCode)
            .storeAddress(bondingCurve)
            .endCell();
        const init = { code, data };
        return new JettonMaster(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().endCell(),
        });
    }

    async sendMint(
        provider: ContractProvider,
        via: Sender,
        value: bigint,
        toAddress: Address,
        amount: bigint
    ) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell()
                .storeUint(21, 32)          // op::mint
                .storeUint(0, 64)           // query_id
                .storeAddress(toAddress)
                .storeCoins(amount)
                .endCell(),
        });
    }

    async getTotalSupply(provider: ContractProvider): Promise<bigint> {
        const result = await provider.get('get_total_supply', []);
        return result.stack.readBigNumber();
    }

    async getAdminAddress(provider: ContractProvider): Promise<Address> {
        const result = await provider.get('get_admin_address', []);
        return result.stack.readAddress();
    }

    async getJettonWalletCode(provider: ContractProvider): Promise<Cell> {
        const result = await provider.get('get_jetton_wallet_code', []);
        return result.stack.readCell();
    }

    async getBondingCurveAddress(provider: ContractProvider): Promise<Address> {
        const result = await provider.get('get_bonding_curve_address', []);
        return result.stack.readAddress();
    }
}
