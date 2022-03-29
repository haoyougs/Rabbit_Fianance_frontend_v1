import { BankABI, KaicangABI } from "config/ABI";
import { BANK_ADDRESS } from "config/address";
import { KAICANG } from "config/LPAddress";
import { ethers, Contract } from "ethers";
import { getDefaultProvider, getSigner } from "utils/provider";

/**
 * 查询已有的仓位
 * @param account 钱包地址 
 * @returns 返回仓位数据 是个
 */
export const QueryBin = async (account: string) => {
    const ContractObj = new Contract(BANK_ADDRESS, BankABI, getDefaultProvider());
    const Result = await ContractObj.getUserPosition(account);
    return Result
}

/**
 * 获取钱包中的币种余额 
 * @param library 
 * @param TokenAddress 币种地址
 * @returns 
 */
export const TokenBalance1 = async (library: any, TokenAddress: any) => {
    const Balances = await library?.getBalance(TokenAddress);
    let Value = ethers.utils.formatUnits(Balances, 18)
    return Value
};

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
export const Replenishment = async (strategyAddress: string, token0Address: string, token1Address: string, token0Amount: any, token1Amount: any, posId: any) => {
    // console.log('开仓策略地址', strategyAddress);
    // console.log('币种0地址', token0Address);
    // console.log('币种1地址', token1Address);
    // console.log('支付的币种数量0', ethers.utils.parseEther(token0Amount).toString(), '没转之前', token0Amount);
    // console.log('支付的币种数量1', ethers.utils.parseEther(token1Amount).toString(), '没转之前', token1Amount);
    // console.log('借款策略id', 0);
    // console.log('借款token的数量', ethers.utils.parseEther('0').toString());
    try {
        const codeData = new Contract(KAICANG, KaicangABI, getSigner());
        const codeResult = await codeData.add_encode(strategyAddress, token0Address, token1Address, ethers.utils.parseEther(token0Amount), ethers.utils.parseEther(token1Amount), 0);
        const bankContract = new Contract(BANK_ADDRESS, BankABI, getSigner())
        const tx = await bankContract.work(posId, 0, ethers.utils.parseEther('0').toString(), codeResult, { value: ethers.utils.parseEther(token1Amount).toString() })
        await tx.wait()
        console.log('补仓结果', tx);
        return true
    } catch (e) {
        console.error('补仓错误', e);
        return false
    }
}


/**
 * 平仓合约
 * @param strategyAddress 平仓策略地址
 * @param token0Address 币种0的地址
 * @param token1Address 币种1的地址
 * @param whichWantBack 转哪种币给⽤户。0 ⽤户要token0， 1 ⽤户要token1， 2 ⽤户两种币都要。
 * @param pid 借款策略id 传0 
 * @param borrow 借款token的数量 传'0'
 * @param posId 仓位查询出来的posId
 */
 export const ClosePosition = async (strategyAddress: string, token0Address: string, token1Address: string, whichWantBack:any, posId: any) => {
    try {
        const codeData = new Contract(KAICANG, KaicangABI, getSigner());
        const codeResult = await codeData.withdraw_encode(strategyAddress, token0Address, token1Address, ethers.utils.parseEther(whichWantBack), 0);
        const bankContract = new Contract(BANK_ADDRESS, BankABI, getSigner())
        const tx = await bankContract.work(posId, 0, ethers.utils.parseEther('0').toString(), codeResult, { value: ethers.utils.parseEther(whichWantBack).toString() })
        await tx.wait()
        console.log('平仓结果', tx);
        return true
    } catch (e) {
        console.error('平仓错误', e);
        return false
    }
}

