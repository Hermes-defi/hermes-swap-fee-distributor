import {ethers, network} from "hardhat"
import {expect} from "chai"
import {ADDRESS_ZERO, advanceTimeAndBlock, advanceBlockTo, latest, duration, increase} from "./utilities"


function toWei(v: string): string {
    return ethers.utils.parseUnits(v, 18).toString();
}

function fromWei(v: string): string {
    return ethers.utils.formatUnits(v, 18).toString();
}

function toGWei(v: string): string {
    return ethers.utils.parseUnits(v, 9).toString();
}

function fromGWei(v: string): string {
    return ethers.utils.formatUnits(v, 9).toString();
}

function now(x: number) {
    let t = new Date().getTime() / 1000;
    t += x;
    return parseInt(t.toString());
}


describe("Distributor", function () {
    before(async function () {
        this.signers = await ethers.getSigners()
        this.dev = this.signers[0]
        this.treasure = this.signers[1]
        this.xHRMSAddress = this.signers[2]

        this.Distributor = await ethers.getContractFactory("Distributor")
        this.ERC20MockDecimals = await ethers.getContractFactory("ERC20MockDecimals")
        this.HermesPair = await ethers.getContractFactory("HermesPair")
        this.HermesFactory = await ethers.getContractFactory("HermesFactory")
        this.HermesRouter02 = await ethers.getContractFactory("HermesRouter02")
        this.WONE9Mock = await ethers.getContractFactory("WONE9Mock")

        this.wone = await this.WONE9Mock.deploy();
        await this.wone.deployed()

        this.factory = await this.HermesFactory.deploy(this.dev.address);
        await this.factory.deployed()
        this.router = await this.HermesRouter02.deploy(this.factory.address, this.wone.address);
        await this.router.deployed()

        const pairCodeHash = await this.factory.pairCodeHash();
        // expect(pairCodeHash).to.be.eq('0x83bc7bb34b67d17e1f2fc8ad5d7a0f8a374a52474546c4ecbfb368acdc0ff2e1');
        expect(pairCodeHash).to.be.eq('0x2b5c1f92763cc808d46f799ed176bc720efdf2600b6b6ba91296a61afd2aa00b');

    })

    it("swap fees and check balances", async function () {
        this.hrms = await this.ERC20MockDecimals.deploy(18, "hrms", "hrms")
        await this.hrms.deployed()
        await this.hrms.mint(this.dev.address, ethers.utils.parseUnits('9000000', 18).toString());

        this.dai = await this.ERC20MockDecimals.deploy(18, "dai", "dai")
        await this.dai.deployed()
        await this.dai.mint(this.dev.address, ethers.utils.parseUnits('9000000', 18).toString());

        this.main = await this.Distributor.deploy(
<<<<<<< HEAD
          this.router.address, this.treasure.address,
          this.xHRMSAddress.address, this.hrms.address);

=======
            this.router.address, this.treasure.address, this.xHRMSAddress.address);
>>>>>>> 337d7b161d08cf266ba2dd99026f9025d37f317c
        await this.main.deployed()
        await this.factory.setFeeTo(this.main.address);

        await this.main.addNewToken(this.dai.address,
<<<<<<< HEAD
          [this.dai.address, this.wone.address]);
=======
            [this.dai.address, this.wone.address]);
>>>>>>> 337d7b161d08cf266ba2dd99026f9025d37f317c

        await this.main.addNewToken(this.hrms.address,
          [this.hrms.address, this.wone.address]);

        await this.hrms.approve(this.router.address, ethers.utils.parseUnits('9000000', 18).toString());
        await this.dai.approve(this.router.address, ethers.utils.parseUnits('9000000', 18).toString());

        const amount = ethers.utils.parseUnits('1000000', 18).toString();
        const amount1000 = ethers.utils.parseUnits('1000', 18).toString();
        this.router.addLiquidity(
          this.hrms.address, this.dai.address, amount, amount,
          '0', '0', this.dev.address, '9647704139')

        this.router.addLiquidityONE(
          this.hrms.address,
          amount, '0', '0', this.dev.address, '9647704139', {value: amount1000})

        this.router.addLiquidityONE(
<<<<<<< HEAD
          this.dai.address,
          amount, '0', '0', this.dev.address, '9647704139', {value: amount1000})
=======
            this.dai.address,
            amount, '0', '0', this.dev.address, '9647704139', {value: amount1000})
>>>>>>> 337d7b161d08cf266ba2dd99026f9025d37f317c

        const amount1 = ethers.utils.parseUnits('10000', 18).toString();
        const path1 = [this.hrms.address, this.dai.address];
        const path2 = [this.hrms.address, this.wone.address];
        const path3 = [this.dai.address, this.wone.address];

        await this.router.swapExactTokensForTokensSupportingFeeOnTransferTokens(amount1, '0', path1, this.dev.address, '9647704139');
        await this.router.swapExactTokensForTokensSupportingFeeOnTransferTokens(amount1, '0', path1, this.dev.address, '9647704139');
        await this.router.swapExactTokensForTokensSupportingFeeOnTransferTokens(amount1, '0', path1, this.dev.address, '9647704139');
        await this.router.swapExactTokensForTokensSupportingFeeOnTransferTokens(amount1, '0', path2, this.dev.address, '9647704139');
        await this.router.swapExactTokensForTokensSupportingFeeOnTransferTokens(amount1, '0', path3, this.dev.address, '9647704139');


        this.router.addLiquidity(
          this.hrms.address, this.dai.address,
          amount,
          amount,
          '0', '0', this.dev.address, '9647704139')

        this.pair_hrms_dai_addr = await this.factory.getPair(this.hrms.address, this.dai.address);

        this.hrmsdai = this.HermesPair.attach(this.pair_hrms_dai_addr);

        const hrmsdaiBalanceOfMain = fromWei((await this.hrmsdai.balanceOf(this.main.address)).toString());
        // console.log('hrmsdaiBalanceOfMain', hrmsdaiBalanceOfMain);
        await expect(hrmsdaiBalanceOfMain).to.be.eq("6.302918283888926182")

        await this.main.run();

        const xHRMSBalance = (await this.hrms.balanceOf(this.xHRMSAddress.address)).toString();
<<<<<<< HEAD
        await expect(fromWei(xHRMSBalance)).to.be.eq("6.268126090538383771") // HRMS
=======
        await expect(fromWei(xHRMSBalance)).to.be.eq("3.134072770337029409") // HRMS
>>>>>>> 337d7b161d08cf266ba2dd99026f9025d37f317c

        const treasureBalance = (await this.wone.balanceOf(this.treasure.address)).toString();
        await expect(fromWei(treasureBalance)).to.be.eq("0.006163250774984714") // WONE

    })

    after(async function () {
        await network.provider.request({
            method: "hardhat_reset",
            params: [],
        })
    })
})
