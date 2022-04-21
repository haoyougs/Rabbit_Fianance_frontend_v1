import { BankABI, KaicangABI, ERC20, GoblinABI } from "config/ABI";
import { BANK_ADDRESS } from "config/address";
import { KAICANG, FarmAddressArrs } from "config/LPAddress";
import { ethers, Contract } from "ethers";
import { getDefaultProvider, getSigner } from "utils/provider";
/**
 * 查询已有的仓位
 * @param account 钱包地址
 * @returns 返回仓位数据 是个
 */
export const QueryBin = async (account: string) => {
    const ContractObj = new Contract(BANK_ADDRESS, BankABI, getDefaultProvider());
    const res = await ContractObj.getUserPosition(account);
    // console.log(res)
    let Result = <any>[];
    res.map((item: any, index: any) => {
        const ob: any = {};
        FarmAddressArrs.forEach((F_item: any) => {
            if (item.goblin == F_item.Goblin) {
                ob['item'] = item;
                ob['LPAddress'] = F_item
            }
        });
        Result.push(ob)
    });
    return Result
}

/**
 * 获取钱包中的币种余额
 * @param library
 * @param TokenAddress 币种地址
 * @returns
 */
// BNB
export const TokenBalance1 = async (library: any, account: any) => {
    const Balances = await library?.getBalance(account);
    let Value = ethers.utils.formatUnits(Balances, 18)
    return Value
};
/**
 * 获取用户币种余额
 */
export const TokneBalanceS = async (account: any,
    library: any, TokenAddress: any) => {
    try {
        const Tokenaddress = new Contract(TokenAddress, ERC20, library);
        const Balances = await Tokenaddress.balanceOf(account);
        let Value = ethers.BigNumber.from(Balances);
        return Value;
    } catch (e) {
        console.error('BNBTokneBalance获取时错误');
        return e
    }
}
/**
 * 补仓合约
 * @param strategyAddress 开仓策略地址
 * @param token0Address 币种0的地址
 * @param token1Address 币种1的地址
 * @param token0Amount 支付的币种0的数量
 * @param token1Amount 支付的币种1的数量
 * @param minLPAmount 获得lp的最小期望值设置为0即可
 * @param pid 借款策略id 传0
 * @param borrow 借款token的数量 传'0'
 * @param posId 仓位查询出来的posId
 */
export const Replenishment = async (strategyAddress: string, token0Address: string, token1Address: string, token0Amount: any, token1Amount: any, posId: any, token0IsBNB: any, token1IsBNB: any) => {
    // console.log('开仓策略地址', strategyAddress);
    // console.log('币种0地址', token0Address);
    // console.log('币种1地址', token1Address);
    // console.log('支付的币种数量0', ethers.utils.parseEther(token0Amount).toString(), '没转之前', token0Amount);
    // console.log('支付的币种数量1', ethers.utils.parseEther(token1Amount).toString(), '没转之前', token1Amount == 0);
    // // console.log('借款策略id', 0);
    // // console.log('借款token的数量', ethers.utils.parseEther('0').toString());
    // console.log('posId', Number(posId), token0IsBNB, token1IsBNB);
    try {
        const codeData = new Contract(KAICANG, KaicangABI, getSigner());
        const codeResult = await codeData.add_encode(strategyAddress, token0Address, token1Address, ethers.utils.parseEther(token0Amount), ethers.utils.parseEther(token1Amount), 0);
        const bankContract = new Contract(BANK_ADDRESS, BankABI, getSigner());
        if ((!token0IsBNB && !token1IsBNB) ||
            (token0IsBNB && token0Amount == 0) ||
            (token1IsBNB && token1Amount == 0)) {
            const tx = await bankContract.work(Number(posId), 0, 0, codeResult);
            await tx.wait()
            console.log('补仓结果', tx);
        } if (token0IsBNB && token0Amount != 0) {
            const tx = await bankContract.work(Number(posId), 0, 0, codeResult, { value: ethers.utils.parseEther(token0Amount).toString() });
            await tx.wait()
            console.log('补仓结果', tx);
        } else if (token1IsBNB && token1Amount != 0) {
            const tx = await bankContract.work(Number(posId), 0, 0, codeResult, { value: ethers.utils.parseEther(token1Amount).toString() });
            await tx.wait()
            console.log('补仓结果', tx);
        }
        return true
    } catch (e) {
        console.error('补仓错误', e);
        return false
    }
}

export const getShares = async (posId: any, goblinAddress: string) => {
    console.log(posId, goblinAddress)
    try {
        const tokenGoblin = new Contract(goblinAddress, GoblinABI, getSigner());
        const res = await tokenGoblin.shares(posId);
        let Value = ethers.utils.formatUnits(res, 18);
        return Value
    } catch (e) {
        console.error('goblin错误', e);
        return false

    }
}
export const getshareToBalance = async (shares: any, goblinAddress: string) => {
    // console.log(shares, goblinAddress)
    try {
        const tokenGoblin = new Contract(goblinAddress, GoblinABI, getSigner());
        const res = await tokenGoblin.shareToBalance(ethers.utils.parseEther(shares));
        let Value = ethers.BigNumber.from(res);
        return Value
    } catch (e) {
        console.error('goblin错误', e);
        return false
    }
}
export const getTotalSupply = async (LPaddress: any) => {
    try {
        //查lp总数量
        const LPAmount = new Contract(LPaddress, ERC20, getDefaultProvider());
        const lpamount = await LPAmount.totalSupply();
        // console.log("lpamount", Number(lpamount._hex))
        let Value = ethers.BigNumber.from(lpamount);
        return Value;
    } catch (e) {
        console.error('totalSupply错误', e);
        return false
    }

}
//平仓合约
//strategyAddress 平仓策略地址token0Address 币种0的地址token1Address 币种1的地址 whichWantBack 转哪种币给⽤户。0 ⽤户要token0， 1 ⽤户要token1， 2 ⽤户两种币都要。
//借款策略id 传0  借款token的数量 传'0' 仓位查询出来的posId
export const ClosePosition = async (strategyAddress: string, token0Address: string, token1Address: string, whichWantBack: any, posId: any) => {
    // console.log(Number(posId))
    try {
        const codeData = new Contract(KAICANG, KaicangABI, getSigner());
        const codeResult = await codeData.withdraw_encode(strategyAddress, token0Address, token1Address, whichWantBack);
        // console.log("codeResult", codeResult)
        const bankContract = new Contract(BANK_ADDRESS, BankABI, getSigner())
        const tx = await bankContract.work(Number(posId), 0, 0, codeResult);
        await tx.wait()
        console.log('平仓结果', tx);
        return true
    } catch (e) {
        console.error('平仓错误', e);
        return false
    }
}
