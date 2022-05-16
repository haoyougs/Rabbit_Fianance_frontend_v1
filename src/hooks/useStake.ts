import { FairLaunchABI, PancakeAbi, ERC20, GoblinABI } from 'config/ABI'
import { Contract, ethers } from 'ethers'
import { getDefaultProvider, getSigner } from 'utils/provider'
import {
    BNBADDRES, ibBNB_ADDRESS, BUSD_ADDRESS, ibBUSD_ADDRESS, USDT_ADDRESS, ibUSDT_ADDRESS, BTC_ADDRESS, ibBTC_ADDRESS, ETH_ADDRESS, ibETH_ADDRESS, RABBIT_ADDRESS, ibRabbit_ADDRESSS, BANK_ADDRESS,
    ibBNB_FAIRLAUNCH_PID, ibBUSD_FairLaunch_Pid, ibUSDT_FairLaunch_Pid, ibBTC_FairLaunch_Pid, ibETH_FairLaunch_Pid, ibRabbit_FairLaunch_Pid,
    FAIR_LAUNCH_ADDRESS
} from 'config/address';
import { PANCAKE_ROUTE } from 'config/LPAddress';
import BigNumber from "bignumber.js"
//ibtoken数据
export const ibTokneData = [
    {
        tokenName: 'ibBNB',
        APR: "",
        TVL: "",
        TokneAddress: BNBADDRES,
        ibTokneAddress: ibBNB_ADDRESS,
        pid: ibBNB_FAIRLAUNCH_PID,
        AmountsOutAddress: ["0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c", "0x55d398326f99059fF775485246999027B3197955"]
    },
    {
        tokenName: 'ibBUSD',
        APR: "",
        TVL: "",
        TokneAddress: BUSD_ADDRESS,
        ibTokneAddress: ibBUSD_ADDRESS,
        pid: ibBUSD_FairLaunch_Pid,
        AmountsOutAddress: []
    },
    {
        tokenName: 'ibUSDT',
        APR: "",
        TVL: "",
        TokneAddress: USDT_ADDRESS,
        ibTokneAddress: ibUSDT_ADDRESS,
        pid: ibUSDT_FairLaunch_Pid,
        AmountsOutAddress: []
    },
    {
        tokenName: 'ibBTCB',
        APR: "",
        TVL: "",
        TokneAddress: BTC_ADDRESS,
        ibTokneAddress: ibBTC_ADDRESS,
        pid: ibBTC_FairLaunch_Pid,
        AmountsOutAddress: ["0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c", "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56"]
    },
    {
        tokenName: 'ibETH',
        APR: "",
        TVL: "",
        TokneAddress: ETH_ADDRESS,
        ibTokneAddress: ibETH_ADDRESS,
        pid: ibETH_FairLaunch_Pid,
        AmountsOutAddress: ["0x2170Ed0880ac9A755fd29B2688956BD959F933F8", "0x55d398326f99059fF775485246999027B3197955"]
    },
    {
        tokenName: 'ibRABBIT',
        APR: "",
        TVL: "",
        TokneAddress: RABBIT_ADDRESS,
        ibTokneAddress: ibRabbit_ADDRESSS,
        pid: ibRabbit_FairLaunch_Pid,
        AmountsOutAddress: ["0x95a1199EBA84ac5f19546519e287d43D2F0E1b41", "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c", "0x55d398326f99059fF775485246999027B3197955"]
    },
]
export const getTotalAllocPoint = async (pid: any, ibTokneAddress: any, AmountsOutAddress: any) => {
    //FairLaunch
    const FairLaunchContract = new Contract(FAIR_LAUNCH_ADDRESS, FairLaunchABI, getDefaultProvider());
    // 总点数
    const totaAllocl = await FairLaunchContract.totalAllocPoint();
    //某个池子的点数
    const Allocl = await FairLaunchContract.poolInfo(pid);
    //每秒产币量
    const rabbitPerBlock = await FairLaunchContract.rabbitPerBlock();
    const secondRabbitNum = Number(ethers.utils.formatUnits(rabbitPerBlock._hex, 18)) / 3;
    //该矿池的RABBIT年产量
    const yearRabbitNum = secondRabbitNum * 86400 * 365;
    // 币的价格
    const ContractObj = new Contract(PANCAKE_ROUTE, PancakeAbi, getDefaultProvider());
    let TokenPrice = null;
    if (AmountsOutAddress.length) {
        const Price = await ContractObj.getAmountsOut("1000000000000000000", AmountsOutAddress);
        TokenPrice = ethers.utils.formatUnits(Price[Price.length - 1], 18);
    } else {
        TokenPrice = "1";
    }
    const RabbitTokenPrice = await ContractObj.getAmountsOut("1000000000000000000", ["0x95a1199EBA84ac5f19546519e287d43D2F0E1b41", "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c", "0x55d398326f99059fF775485246999027B3197955"]);
    //rabbit价格
    const Rabbit = ethers.utils.formatUnits(RabbitTokenPrice[RabbitTokenPrice.length - 1], 18);
    // 拥有多少币
    const tokenAmount = new Contract(ibTokneAddress, ERC20, getDefaultProvider());
    const pondDepth = await tokenAmount.balanceOf(FAIR_LAUNCH_ADDRESS);
    let PondDepthS = ethers.utils.formatUnits(pondDepth, 18);
    const TVL = parseFloat(PondDepthS) * parseFloat(TokenPrice);
    //池子产量 = 池子点数/重点数*年产量
    const alloc = Allocl.allocPoint / totaAllocl * yearRabbitNum
    const APR = (alloc * parseFloat(Rabbit)) / TVL;
    return { apr: APR, tvl: TVL }
}
//Mdx领取奖励部分
export const GETRewardMdxSummary = async (goblinAddress: any, account: any) => {
    const tokenGoblin = new Contract(goblinAddress, GoblinABI, getSigner());
    const Result = await tokenGoblin.earned(account);
    let Value = ethers.utils.formatUnits(Result._hex, 18);
    // //////console.log("MdxEarned", Value);
    return Value;

}
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
    let Value = ethers.utils.formatUnits(Result._hex, 18);
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
    const Result = await RewardAddress.userInfo(Number(pid)
        , account);
    // //////console.log(444, Result)
    let Value = ethers.utils.formatUnits(Result.amount, 18);
    return Value
}
/**
 * Mdx领取奖励
 * @param pid 奖励池id
 * @param FairLaunch 计息币挖矿地址
 * @returns 领取成功返回 true，领取失败返回false
 */
export const MdxClaim = async (goblinAddress: any) => {
    try {
        const tokenGoblin = new Contract(goblinAddress, GoblinABI, getSigner());
        const gas = await tokenGoblin.estimateGas.harvest();
        // console.log(Number(gas));
        const Result = await tokenGoblin.harvest({ gasLimit: Math.floor(Number(gas) * 1.5) });
        await Result.wait()
        return true
    } catch (e) {
        console.error('领取奖励失败', e);
        return false
    }
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
        const gas = await RewardAddress.estimateGas.harvest(pid);

        // console.log(Number(gas));

        const Result = await RewardAddress.harvest(pid, { gasLimit: Math.floor(Number(gas) * 1.5) });

        // const Result = await RewardAddress.harvest(pid);
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
        // console.log(333, pid, amount)
        const ContractAddress = new Contract(FairLaunch, FairLaunchABI, getSigner());
        const gas = await ContractAddress.estimateGas.deposit(account, pid, ethers.utils.parseEther(amount));
        // console.log(Number(gas));
        const Result = await ContractAddress.deposit(account, pid, ethers.utils.parseEther(amount), { gasLimit: Math.floor(Number(gas) * 1.5) })

        // const Result = await ContractAddress.deposit(account, pid, ethers.utils.parseEther(amount))
        await Result.wait()
        //////console.log('质押结果', Result);
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
        // console.log('amount',pid, amount);
        const ContractAddress = new Contract(FairLaunch, FairLaunchABI, getSigner());
        const gas = await ContractAddress.estimateGas.withdraw(account, pid, ethers.utils.parseEther(amount));
        // console.log(Number(gas));

        const Result = await ContractAddress.withdraw(
            account, pid, ethers.utils.parseEther(amount),
            { gasLimit: Math.floor(Number(gas) * 1.5) }
        )

        // const Result = await ContractAddress.withdraw(account, pid, ethers.utils.parseEther(amount))
        await Result.wait()
        //////console.log('提现结果', Result);
        return true
    } catch (e) {
        console.error('提现失败', e);
        return false
    }
}

