import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode } from '@ton/core';

export class TokenFactory implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new TokenFactory(address);
    }

    static createFromConfig(owner: Address, platformWallet: Address, code: Cell, workchain = 0) {
        const data = beginCell()
            .storeAddress(owner)
            .storeAddress(platformWallet)
            .storeUint(0, 64)
            .storeCoins(1000000000)
            .storeCoins(500000000)
            .endCell();
        const init = { code, data };
        return new TokenFactory(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().endCell(),
        });
    }

    async sendCreateToken(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().storeUint(1, 32).endCell(),
        });
    }

    async sendUpdateFee(provider: ContractProvider, via: Sender, value: bigint, newFee: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().storeUint(2, 32).storeCoins(newFee).endCell(),
        });
    }

    async getTokenCount(provider: ContractProvider): Promise<bigint> {
        const result = await provider.get('get_token_count', []);
        return result.stack.readBigNumber();
    }

    async getCreationFee(provider: ContractProvider): Promise<bigint> {
        const result = await provider.get('get_creation_fee', []);
        return result.stack.readBigNumber();
    }

    async getPlatformWallet(provider: ContractProvider): Promise<Address> {
        const result = await provider.get('get_platform_wallet', []);
        return result.stack.readAddress();
    }

    async getOwner(provider: ContractProvider): Promise<Address> {
        const result = await provider.get('get_owner', []);
        return result.stack.readAddress();
    }
}
