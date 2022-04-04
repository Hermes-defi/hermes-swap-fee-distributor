import { expect } from "chai";
import { ethers } from "hardhat";
import {
  Distributor,
  Distributor__factory,
  MockERC20,
  MockERC20__factory,
  UniswapRouterMock__factory,
} from "../typechain";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { parseEther } from "ethers/lib/utils";

describe("Distribution", function () {
  let distributor: Distributor;
  let mockERC20: MockERC20;
  let daiERC20: MockERC20;
  let usdcERC20: MockERC20;
  let owner: SignerWithAddress,
    treasury: SignerWithAddress,
    xHRMS: SignerWithAddress,
    sHRMS: SignerWithAddress;

  before(async () => {
    [owner, treasury, xHRMS, sHRMS] = await ethers.getSigners();
    const uniswapMock = await new UniswapRouterMock__factory(owner).deploy();
    distributor = await new Distributor__factory(owner).deploy(
      uniswapMock.address,
      treasury.address,
      xHRMS.address,
      sHRMS.address
    );
    mockERC20 = await new MockERC20__factory(owner).deploy();
    daiERC20 = await new MockERC20__factory(owner).deploy();
    usdcERC20 = await new MockERC20__factory(owner).deploy();
    daiERC20.connect(owner).transfer(uniswapMock.address, parseEther("100000"))
    usdcERC20.connect(owner).transfer(uniswapMock.address, parseEther("100000"))
    await uniswapMock.setRate(mockERC20.address, daiERC20.address, 100);
    await uniswapMock.setRate(mockERC20.address, usdcERC20.address, 100);
  });

  it("Should add new tokens", async function () {
    await expect(
      distributor.addNewToken(
        mockERC20.address,
        [mockERC20.address, daiERC20.address],
        [mockERC20.address, usdcERC20.address]
      )
    )
      .to.emit(distributor, "AddNewToken")
      .withArgs(
        mockERC20.address,
        [mockERC20.address, daiERC20.address],
        [mockERC20.address, usdcERC20.address]
      );
  });

  it("Should convert", async function () {
    await mockERC20
      .connect(owner)
      .transfer(distributor.address, parseEther("1000"));
    await expect(distributor.connect(owner).convert())
      .to.emit(distributor, "Convert")
      .withArgs(parseEther("1000"));
  });
});
