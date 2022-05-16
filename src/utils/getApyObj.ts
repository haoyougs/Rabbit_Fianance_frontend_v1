import { ERC20, pancakeFarmsABI, mdxFarmsABI, oldFarmsABI } from "config/ABI";
import {
    PANCAKE_FARMS_ADDRESS, PANCAKE_MDX_ADDRESS
} from 'config/address';
import { getUsdPrice } from "utils/getUsdPrice";
import { borrowAprCommon } from "utils/BorrowApr";

import {
    getFarmsAPR,
    getTradeFree,
    getRabbitRewards,
    getBorrowApr
} from "hooks/useFarms";
import { Contract, ethers } from "ethers";
import { getDefaultProvider } from 'utils/provider';
import { getApy } from "utils/ApyCommon";
export const getApyObj = async (LPaddress: any, LPtokenAddress1: any, index: any, type: any, tid: any, goblin: any, FairLaunch_Pid: any, Address: any, AddressApr: any, MdexTradeFree: any, PancakeTradeFree: any) => {
    try {
        //查询单币价格
        const Uprices = await getUsdPrice(LPtokenAddress1);
        // 单币价格
        let SingleTokenPriceS = Number(Uprices)
        //查询lp池子深度，就是池子中持有多少币；
        const tokenAmount = new Contract(LPtokenAddress1, ERC20, getDefaultProvider());
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
        let lpPrice = TotalPrice / LPAmountS
        //获取lp在挖矿合约的质押量
        // 1、构建mdx/pancake挖矿合约对象
        // 2、根据goblin地址，和pid查询质押数量
        let FarmsContract;
        if (type == 'Pancake') {
            FarmsContract = new Contract(PANCAKE_FARMS_ADDRESS, pancakeFarmsABI, getDefaultProvider());
        } else {
            FarmsContract = new Contract(PANCAKE_MDX_ADDRESS, mdxFarmsABI, getDefaultProvider());
        }
        let TVLvalue;
        if (tid > -1) {
            const { amount } = await FarmsContract.userInfo(tid, goblin);
            let debtTotal = ethers.utils.formatUnits(amount, 18);
            // //////console.log(debtTotal);
            TVLvalue = lpPrice * parseFloat(debtTotal);
            // //////console.log(TVLvalue)
            // return { value: TVLvalue, index: index }
        } else {
            const OldContract = new Contract("0x73feaa1eE314F8c655E354234017bE2193C9E24E", oldFarmsABI, getDefaultProvider());
            const { amount } = await OldContract.userInfo(420, goblin);
            let debtTotal = ethers.utils.formatUnits(amount, 18);
            TVLvalue = lpPrice * parseFloat(debtTotal);
        }

        //计算APY
        const Farm_Apr = await getFarmsAPR(type, tid, LPaddress, Address);
        const Trading_Free = await getTradeFree(type, LPaddress, MdexTradeFree, PancakeTradeFree);
        // console.log(index, Trading_Free)
        const Rabbit = await getRabbitRewards(FairLaunch_Pid, index);
        const RABBIT_Rewards = TVLvalue ? ((Rabbit.apr / TVLvalue)) : 0;
        const Borrow = await getBorrowApr(AddressApr);
        const Borrow_Apr = borrowAprCommon(Borrow.BorrowedValue, Borrow.DepositValue);
        return {
            value: TVLvalue,
            index: index,
            APY: { Farm_Apr, Trading_Free, RABBIT_Rewards, Borrow_Apr }
        }
    } catch (e) {
        console.error(index, '获取失败', e);
        return false
    }

}