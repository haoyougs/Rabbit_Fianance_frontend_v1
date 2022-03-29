import { ethers, Contract } from "ethers";
import { getDefaultProvider, getSigner } from "utils/provider";
import { ERC20, BankABI, PancakeAbi, KaicangABI } from "config/ABI";
import { FarmPancakeUSDT_BNB, PANCAKE_ROUTE, KAICANG } from "config/LPAddress";
import { BADFLAGS } from "dns";
import { BANK_ADDRESS } from "config/address";

/**
 * 获取钱包中的币种余额 这个方法用于获取bnb
 * @param library 
 * @param account 钱包地址,也可以传币种的值 、获取bnb时传钱包地址获取其他币种时传其他币种地址
 * @returns 
 */
export const TokenBalance0 = async (library: any, account: any) => {
    const Balances = await library?.getBalance(account);
    let Value = ethers.utils.formatUnits(Balances, 18)
    return Value
};
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
 * 获取最大借款量和最小借款量
 * @param addres 借款银行合约地址
 * @param pid 借款策略id
 * @returns 返回一个对象，{Max是最大值，Min是最小值}
 */
export const MaxMinLoan = async (addres: string, pid: any) => {
    try {
        const ContractObj = new Contract(addres, BankABI, getDefaultProvider());
        const Result = await ContractObj.productions(pid);
        const Max = ethers.utils.formatUnits(Result.maxDebt, 18)
        const Min = ethers.utils.formatUnits(Result.minDebt, 18)
        return { Max, Min }
    } catch (e) {
        console.error('获取最大借款量和最小借款量错误', e);
    }
}
/**
 * 总借款数量用到的获取单币价格的方法
 * @param pancakeAddress pancake交易所的route合约
 * @param tokenAddress0 非稳定币地址
 * @param tokenAddress1 稳定币地址
 * @returns 返回非稳定币的单价
 */
export const AssetsBorrowed = async (pancakeAddress: string, tokenAddress0: string, tokenAddress1: string) => {
    //查询单币价格
    const ContractObj = new Contract(pancakeAddress, PancakeAbi, getDefaultProvider());
    const x = ethers.utils.parseEther('1')
    const [z, y] = await ContractObj.getAmountsOut(x, [tokenAddress0, tokenAddress1]);
    let singleTokenPrice = ethers.utils.formatUnits(y, 18);
    let SingleTokenPriceS = Number(singleTokenPrice)
    return SingleTokenPriceS
}

/**
 * 开仓合约
 * @param strategyAddress 开仓策略地址
 * @param token0Address 币种0的地址
 * @param token1Address 币种1的地址
 * @param token0Amount 支付的币种0的数量
 * @param token1Amount 支付的币种1的数量
 * @param minLPAmount 获得lp的最小期望值设置为0即可
 * @param pid 借款策略id
 * @param borrow 借款token的数量
 * @param
 */
export const GoblinEvent = async (strategyAddress: string, token0Address: string, token1Address: string, token0Amount: any, token1Amount: any, pid: any, borrow: any) => {

    // console.log('开仓策略地址',strategyAddress);
    // console.log('币种0地址',token0Address);
    // console.log('币种1地址',token1Address);
    // console.log('支付的币种数量0',ethers.utils.parseEther(token0Amount).toString());
    // console.log('支付的币种数量1',ethers.utils.parseEther(token1Amount).toString());
    // console.log('借款策略id',pid);
    // console.log('借款token的数量',ethers.utils.parseEther(borrow).toString());

    
    try {
        const ContractObj = new Contract(KAICANG, KaicangABI, getSigner());
        // 查询编码后的结果
        const Result = await ContractObj.add_encode(strategyAddress, token0Address, token1Address, ethers.utils.parseEther(token0Amount), ethers.utils.parseEther(token1Amount), 0);
        // console.log(Result);
        
        const bankContract = new Contract(BANK_ADDRESS, BankABI, getSigner())
        const tx = await bankContract.work(0, pid, ethers.utils.parseEther(borrow).toString(), Result, {value : ethers.utils.parseEther(token1Amount).toString()})
        await tx.wait()
        console.log('开仓结果', tx);
        return true

    } catch (e) {
        console.error('开仓错误', e);
        return false
    }

}