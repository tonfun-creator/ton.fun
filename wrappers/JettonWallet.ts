import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode } from '@ton/core';

export class JettonWallet implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new JettonWallet(address);
    }

    async getWalletBalance(provider: ContractProvider): Promise<bigint> {
        const result = await provider.get('get_wallet_balance', []);
        return result.stack.readBigNumber();
    }

    async getWalletOwner(provider: ContractProvider): Promise<Address> {
        const result = await provider.get('get_wallet_owner', []);
        return result.stack.readAddress();
    }

    async getWalletMaster(provider: ContractProvider): Promise<Address> {
        const result = await provider.get('get_wallet_master', []);
        return result.stack.readAddress();
    }

    async sendTransfer(
        provider: ContractProvider,
        via: Sender,
        value: bigint,
        toAddress: Address,
        amount: bigint,
        forwardTonAmount: bigint = 0n
    ) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell()
                .storeUint(0xf8a7ea5, 32)          // op::transfer
                .storeUint(0, 64)                   // query_id
                .storeCoins(amount)
                .storeAddress(toAddress)
                .storeAddress(via.address!)
                .storeUint(0, 1)                    // no custom payload
                .storeCoins(forwardTonAmount)
                .storeUint(0, 1)                    // no forward payload
                .endCell(),
        });
    }
}
