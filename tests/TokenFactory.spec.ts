import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { Cell, toNano } from '@ton/core';
import { TokenFactory } from '../wrappers/TokenFactory';
import '@ton/test-utils';
import { compile } from '@ton/blueprint';

describe('TokenFactory', () => {
    let code: Cell;
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let platformWallet: SandboxContract<TreasuryContract>;
    let tokenFactory: SandboxContract<TokenFactory>;

    beforeAll(async () => {
        code = await compile('TokenFactory');
    });

    beforeEach(async () => {
        blockchain = await Blockchain.create();
        deployer = await blockchain.treasury('deployer');
        platformWallet = await blockchain.treasury('platform');

        tokenFactory = blockchain.openContract(
            TokenFactory.createFromConfig(deployer.address, platformWallet.address, code)
        );

        const deployResult = await tokenFactory.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: tokenFactory.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy with correct initial values', async () => {
        const tokenCount = await tokenFactory.getTokenCount();
        const creationFee = await tokenFactory.getCreationFee();
        const owner = await tokenFactory.getOwner();
        const platform = await tokenFactory.getPlatformWallet();

        expect(tokenCount).toBe(0n);
        expect(creationFee).toBe(toNano('1'));
        expect(owner.toString()).toBe(deployer.address.toString());
        expect(platform.toString()).toBe(platformWallet.address.toString());
    });

    it('should create token', async () => {
        const result = await tokenFactory.sendCreateToken(deployer.getSender(), toNano('1.5'));

        expect(result.transactions).toHaveTransaction({
            from: deployer.address,
            to: tokenFactory.address,
            success: true,
        });

        const tokenCount = await tokenFactory.getTokenCount();
        expect(tokenCount).toBe(1n);
    });

    it('should fail if fee is insufficient', async () => {
        const result = await tokenFactory.sendCreateToken(deployer.getSender(), toNano('0.5'));

        expect(result.transactions).toHaveTransaction({
            from: deployer.address,
            to: tokenFactory.address,
            success: false,
            exitCode: 401,
        });
    });
});
