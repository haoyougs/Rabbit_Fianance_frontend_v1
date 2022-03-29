import { FairLaunchABI } from 'config/ABI'
import { Contract, ethers } from 'ethers'
import { getDefaultProvider, getSigner } from 'utils/provider'
import { BNBADDRES, ibBNB_ADDRESS, BUSD_ADDRESS, ibBUSD_ADDRESS, USDT_ADDRESS, ibUSDT_ADDRESS, BTC_ADDRESS, ibBTC_ADDRESS, ETH_ADDRESS, ibETH_ADDRESS, RABBIT_ADDRESS, ibRabbit_ADDRESSS, BANK_ADDRESS } from 'config/address'

//ibtoken数据
export const ibTokneData = [
    {
        tokenName: 'ibBNB',
        APR: 0,
        TVL: 0,
        ibTokneAddress: ibBNB_ADDRESS
    },
    {
        tokenName: 'ibBUSD',
        APR: 1,
        TVL: 0,
        ibTokneAddress: ibBUSD_ADDRESS
    },
    {
        tokenName: 'ibUSDT',
        APR: 2,
        TVL: 0,
        ibTokneAddress: ibUSDT_ADDRESS
    },
    {
        tokenName: 'ibBTCB',
        APR: 3,
        TVL: 0,
        ibTokneAddress: ibBTC_ADDRESS
    },
    {
        tokenName: 'ibETH',
        APR: 4,
        TVL: 0,
        ibTokneAddress: ibETH_ADDRESS
    },
    {
        tokenName: 'ibRABBIT',
        APR: 5,
        TVL: 0,
        ibTokneAddress: ibRabbit_ADDRESSS
    },
]

//领取奖励部分
/**
 * 查询可获得的奖励
 * @param account 需要传递钱包地址
 * @param pid 奖励池id
 * @param FairLaunch 计息币挖矿地址
 * @returns 返回查询到的奖励数量
 */
export const GETRewardSummary = async (pid: any, account: any, FairLaunch: any) => {
    const RewardAddress = new Contract(FairLaunch, FairLaunchABI, getDefaultProvider());
    const Result = await RewardAddress.pendingRabbit(pid, account);
    let Value = ethers.utils.formatUnits(Result, 18);
    return Value
}
/**
 * 查询存款量
 * @param account 需要传递钱包地址
 * @param pid 奖励池id
 * @param FairLaunch 计息币挖矿地址
 * @returns 返回查询到的存款数量
 */
export const DepositAmount = async (pid: any, account: any, FairLaunch: any) => {
    const RewardAddress = new Contract(FairLaunch, FairLaunchABI, getDefaultProvider());
    const Result = await RewardAddress.userInfo(pid, account);
    let Value = ethers.utils.formatUnits(Result.amount, 18);
    return Value
}
/**
 * 领取奖励
 * @param pid 奖励池id
 * @param FairLaunch 计息币挖矿地址
 * @returns 领取成功返回 true，领取失败返回false
 */
export const Claim = async (pid: any, FairLaunch: any) => {
    try {
        const RewardAddress = new Contract(FairLaunch, FairLaunchABI, getSigner());
        const Result = await RewardAddress.harvest(pid);
        await Result.wait()
        return true
    } catch (e) {
        console.error('领取奖励失败', e);
        return false
    }
}

// 质押提现部分
/**
 * 质押ibtoken
 * @param account 钱包地址
 * @param pid 质押池子的id
 * @param amount 质押数量
 * @param FairLaunch 计息币挖矿地址
 * @returns 质押成功返回 true，质押失败返回 false
 */
export const Pledge = async (account: any, pid: any, amount: any, FairLaunch: any) => {
    try {
        const ContractAddress = new Contract(FairLaunch, FairLaunchABI, getSigner());
        const Result = await ContractAddress.deposit(account, pid, ethers.utils.parseEther(amount))
        await Result.wait()
        console.log('质押结果', Result);
        return true
    } catch (e) {
        console.error('质押失败', e);
        return false
    }
}
/**
 * 提现 ibtoken
 * @param account 钱包地址
 * @param pid 质押池地址
 * @param amount 提现数量
 * @param FairLaunch 计息币挖矿地址
 * @returns 提现成功返回 true，提现失败返回 false
 */
export const Withdrawal = async (account: any, pid: any, amount: any, FairLaunch: any) => {
    try {
        const ContractAddress = new Contract(FairLaunch, FairLaunchABI, getSigner());
        const Result = await ContractAddress.withdraw(account, pid, ethers.utils.parseEther(amount))
        await Result.wait()
        console.log('提现结果', Result);
        return true
    } catch (e) {
        console.error('提现失败', e);
        return false
    }
}

