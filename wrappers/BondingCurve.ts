import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode } from '@ton/core';

export class BondingCurve implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new BondingCurve(address);
    }

    static createFromConfig(
        tokenId: bigint,
        tokenName: string,
        tokenSymbol: string,
        creator: Address,
        platformWallet: Address,
        code: Cell,
        workchain = 0
    ) {
        const data = beginCell()
            .storeUint(tokenId, 64)
            .storeRef(beginCell().storeStringTail(tokenName).endCell())
            .storeRef(beginCell().storeStringTail(tokenSymbol).endCell())
            .storeAddress(creator)
            .storeAddress(platformWallet)
            .storeCoins(0)               // supply
            .storeCoins(0)               // raised
            .storeUint(0, 8)             // graduated
            .storeCoins(2000000)         // k
            .storeBit(0)                 // balances = null dict ← NEW!
            .endCell();
        const init = { code, data };
        return new BondingCurve(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().endCell(),
        });
    }

    async sendBuy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().storeUint(1, 32).storeUint(0, 64).endCell(),
        });
    }

    async sendSell(provider: ContractProvider, via: Sender, value: bigint, tokensAmount: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().storeUint(2, 32).storeUint(0, 64).storeCoins(tokensAmount).endCell(),
        });
    }

    async getSupply(provider: ContractProvider): Promise<bigint> {
        const result = await provider.get('get_supply', []);
        return result.stack.readBigNumber();
    }

    async getRaised(provider: ContractProvider): Promise<bigint> {
        const result = await provider.get('get_raised', []);
        return result.stack.readBigNumber();
    }

    async getPrice(provider: ContractProvider): Promise<bigint> {
        const result = await provider.get('get_price', []);
        return result.stack.readBigNumber();
    }

    async isGraduated(provider: ContractProvider): Promise<bigint> {
        const result = await provider.get('is_graduated', []);
        return result.stack.readBigNumber();
    }

    async getCreator(provider: ContractProvider): Promise<Address> {
        const result = await provider.get('get_creator', []);
        return result.stack.readAddress();
    }

    async getUserBalance(provider: ContractProvider, user: Address): Promise<bigint> {
        const result = await provider.get('get_user_balance', [
            { type: 'slice', cell: beginCell().storeAddress(user).endCell() }
        ]);
        return result.stack.readBigNumber();
    }
}
