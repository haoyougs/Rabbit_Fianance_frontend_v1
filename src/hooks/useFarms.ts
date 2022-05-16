import { FairLaunchABI, PancakeAbi, ERC20, BankABI, pancakeFarmsABI, mdxFarmsABI } from 'config/ABI'
import { Contract, ethers } from 'ethers'
import { getDefaultProvider, getSigner } from 'utils/provider'
import {
    BNBADDRES, ibBNB_ADDRESS, BUSD_ADDRESS, ibBUSD_ADDRESS, USDT_ADDRESS, ibUSDT_ADDRESS, BTC_ADDRESS, ibBTC_ADDRESS, ETH_ADDRESS, ibETH_ADDRESS, RABBIT_ADDRESS, ibRabbit_ADDRESSS, BANK_ADDRESS,
    ibBNB_FAIRLAUNCH_PID, ibBUSD_FairLaunch_Pid, ibUSDT_FairLaunch_Pid, ibBTC_FairLaunch_Pid, ibETH_FairLaunch_Pid, ibRabbit_FairLaunch_Pid,
    FAIR_LAUNCH_ADDRESS, PANCAKE_FARMS_ADDRESS, PANCAKE_MDX_ADDRESS
} from 'config/address';
import { PANCAKE_ROUTE, MDEX_ROUTE } from 'config/LPAddress';
import { BNB_ADDRESS } from "config/address";
import BigNumber from "bignumber.js"
import { getUsdPrice } from "utils/getUsdPrice";
import { https } from "utils/https";
//Cake/MDX年化收益率
export const getFarmsAPR = async (Type: any, Tid: any, LPaddress: any, LPtokenAddress: any) => {
    if (Tid == -1) {
        return 0;
    }
    //查询单币价格
    const Uprices = await getUsdPrice(LPtokenAddress);
    // 单币价格
    let SingleTokenPriceS = Number(Uprices)
    //查询lp池子深度，就是池子中持有多少币；
    const tokenAmount = new Contract(LPtokenAddress, ERC20, getDefaultProvider());
    const pondDepth = await tokenAmount.balanceOf(LPaddress)
    let PondDepthS = ethers.utils.formatUnits(pondDepth, 18);
    let depth = Number(PondDepthS)
    let TotalPrice = (SingleTokenPriceS * depth) * 2
    //查lp总数量
    const LPAmount = new Contract(LPaddress, ERC20, getDefaultProvider());
    const lpamount = await LPAmount.totalSupply()
    let lpamountS = ethers.utils.formatUnits(lpamount, 18);
    let LPAmountS = Number(lpamountS)
    // lp价格
    let lpPrice = TotalPrice / LPAmountS;
    if (Type == "Pancake") {
        // //////console.log("lpPrice", lpPrice)
        //FarmsContract
        const FarmsContract = new Contract(PANCAKE_FARMS_ADDRESS, pancakeFarmsABI, getDefaultProvider());
        // 总点数
        const totaAllocl = await FarmsContract.totalRegularAllocPoint();
        // //////console.log("总点数", Number(totaAllocl))
        // return;
        //某个池子的点数
        const Allocl = await FarmsContract.poolInfo(Tid);
        // //////console.log("池子的点数", Number(Allocl.allocPoint));
        const lpDes = ethers.utils.formatUnits(Allocl.totalBoostedShare, 18);
        // //////console.log("lp质押数量", lpDes);

        //每秒产币量
        const cakePerBlock = await FarmsContract.cakePerBlock(true);
        const secondRabbitNum = Number(ethers.utils.formatUnits(cakePerBlock._hex, 18)) / 3;
        // //////console.log("cakePerBlock", cakePerBlock)
        // 该矿池的RABBIT年产量
        const yearRabbitNum = secondRabbitNum * 86400 * 365;
        // //////console.log("cakePerBlock", secondRabbitNum, yearRabbitNum);
        // 币的价格
        const ContractObj = new Contract(PANCAKE_ROUTE, PancakeAbi, getDefaultProvider());
        const Price = await ContractObj.getAmountsOut("1000000000000000000", ["0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82", "0x55d398326f99059fF775485246999027B3197955"]);
        const cakePrice = ethers.utils.formatUnits(Price[Price.length - 1], 18);
        // //////console.log("cakePrice", cakePrice);
        //pancake 年产值计算：池⼦的点数 / 总点数 * 年产币量 * cake的币价：
        const pancakeNum = Allocl.allocPoint / totaAllocl * yearRabbitNum * parseFloat(cakePrice);
        //池⼦总质押价值：lp总质押数量 * lp价格 = 价值
        const poolNum = lpPrice * parseFloat(lpDes)
        return (pancakeNum / poolNum * 0.7)
    } else {
        //FarmsContract
        const FarmsContract = new Contract(PANCAKE_MDX_ADDRESS, mdxFarmsABI, getDefaultProvider());
        // 总点数
        const totaAllocl = await FarmsContract.totalAllocPoint();
        // //////console.log("总点数", Number(totaAllocl))
        //某个池子的点数
        const Allocl = await FarmsContract.poolInfo(Tid);
        // console.log("池子的点数", Allocl);
        //lp质押数量
        const lpDes = ethers.utils.formatUnits(Allocl.totalAmount, 18);
        //console.log("lp质押数量", lpDes);
        //每秒产币量
        //最后更新区块
        const lastRewardBlock = Allocl.lastRewardBlock;
        const cakePerBlock = await FarmsContract.reward(lastRewardBlock);
        const secondRabbitNum = Number(ethers.utils.formatUnits(cakePerBlock._hex, 18)) / 3;
        // //////console.log("cakePerBlock", cakePerBlock)
        // 该矿池的RABBIT年产量
        const yearRabbitNum = secondRabbitNum * 86400 * 365;
        // //////console.log("cakePerBlock", secondRabbitNum, yearRabbitNum);
        // 币的价格
        const ContractObj = new Contract(MDEX_ROUTE, PancakeAbi, getDefaultProvider());
        //MDX币价
        const Price = await ContractObj.getAmountsOut("1000000000000000000", ["0x9C65AB58d8d978DB963e63f2bfB7121627e3a739", "0x55d398326f99059fF775485246999027B3197955"]);
        const cakePrice = ethers.utils.formatUnits(Price[Price.length - 1], 18);
        // //////console.log("cakePriceMDX币价", cakePrice);
        //pancake 年产值计算：池⼦的点数 / 总点数 * 年产币量 * cake的币价：
        const mdxNum = Allocl.allocPoint / totaAllocl * yearRabbitNum * parseFloat(cakePrice);
        //池⼦总质押价值：lp总质押数量 * lp价格 = 价值
        const poolNum = lpPrice * parseFloat(lpDes);
        // //////console.log(Allocl.allocPoint / totaAllocl)
        return (mdxNum / poolNum * 0.7)

    }

}

export const getTotalApr = async (pid: any,
    // ibTokneAddress: any, AmountsOutAddress: any
) => {
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
    const RabbitTokenPrice = await ContractObj.getAmountsOut("1000000000000000000", ["0x95a1199EBA84ac5f19546519e287d43D2F0E1b41", "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c", "0x55d398326f99059fF775485246999027B3197955"]);
    //rabbit价格
    const Rabbit = ethers.utils.formatUnits(RabbitTokenPrice[RabbitTokenPrice.length - 1], 18);
    // 拥有多少币
    // const tokenAmount = new Contract(ibTokneAddress, ERC20, getDefaultProvider());
    // const pondDepth = await tokenAmount.balanceOf(FAIR_LAUNCH_ADDRESS);
    // let PondDepthS = ethers.utils.formatUnits(pondDepth, 18);
    // const TVL = parseFloat(PondDepthS) * parseFloat(TokenPrice);
    //池子产量 = 池子点数/重点数*年产量
    const alloc = Allocl.allocPoint / totaAllocl * yearRabbitNum;
    const APR = alloc * parseFloat(Rabbit);
    return { apr: APR }
}
export const getRabbitRewards = async (pid: any, index?: any) => {
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
    const RabbitTokenPrice = await ContractObj.getAmountsOut("1000000000000000000", ["0x95a1199EBA84ac5f19546519e287d43D2F0E1b41", "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c", "0x55d398326f99059fF775485246999027B3197955"]);
    //rabbit价格
    const Rabbit = ethers.utils.formatUnits(RabbitTokenPrice[RabbitTokenPrice.length - 1], 18);
    //池子产量 = 池子点数/重点数*年产量
    const alloc = Allocl.allocPoint / totaAllocl * yearRabbitNum;
    const APR = alloc * parseFloat(Rabbit);
    // //////console.log(APR, index);
    return { apr: APR }
}
export const getBorrowApr = async (Address: any) => {
    const ContractObj = new Contract(BANK_ADDRESS, BankABI, getDefaultProvider());
    //获取银行总存款
    const banks = await ContractObj.banks(Address);
    const totalVal = ethers.utils.formatUnits(banks.totalVal, 18);
    const totalDebt = ethers.utils.formatUnits(banks.totalDebt, 18);
    //获取银行BNB借款
    const BorrowedValue = ethers.utils.formatUnits(banks.totalDebt, 18)

    let Value = parseFloat(totalVal) + parseFloat(totalDebt)

    return { DepositValue: Value, BorrowedValue: BorrowedValue }
}
export const getMdexTradeFree = async () => {
    const params = {
        type: "get",
        url: "https://gateway.mdex.one/v3/mingpool/lps?mdex_chainid=56"
    }
    const res: any = await https(params);
    const result = res.result;
    return result;
}
export const getPancakeTradeFree = async () => {
    const params = {
        type: "get",
        url: "https://api.rabbitfinance.io/api/v1/get_pairDayDatas"
    }
    const res: any = await https(params);
    const result = res.data;
    return result;
}
export const getTradeFree = async (Type: any, LPaddress: any, MdexTradeFree: any, PancakeTradeFree: any) => {
    let Trading_Free = 0;
    if (Type == "Mdex") {
        for (let item in MdexTradeFree) {
            if (MdexTradeFree[item].address.toUpperCase() == LPaddress.toUpperCase()) {
                const data = MdexTradeFree[item];
                const volume_24hr = data.volume_24hr;
                const pool_tvl = data.pool_tvl;
                Trading_Free = (parseFloat(volume_24hr) * 365 * 0.003 * 0.66) / pool_tvl;
            }
        }
    } else {
        for (let item in PancakeTradeFree) {
            if (item.toUpperCase() == LPaddress.toUpperCase()) {
                const parseData = JSON.parse(PancakeTradeFree[item]);
                const data = parseData?.data?.pairDayDatas[0];
                // console.log(data);
                const volume_24hr = data.dailyVolumeUSD;
                const pool_tvl = data.reserveUSD;
                Trading_Free = (parseFloat(volume_24hr) * 365 * 0.003 * 0.66) / parseFloat(pool_tvl);
            }
        }
    }
    return Trading_Free;
}
