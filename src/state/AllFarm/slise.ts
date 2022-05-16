import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getDefaultProvider, getSigner } from 'utils/provider'
import { ERC20, BankABI, PancakeAbi, pancakeFarmsABI, mdxFarmsABI, oldFarmsABI } from "config/ABI";
import { BigNumber, Contract, ethers } from "ethers";
import { initialState } from "./State";
import {
    PANCAKE_FARMS_ADDRESS, PANCAKE_MDX_ADDRESS
} from 'config/address';
import { getUsdPrice } from "utils/getUsdPrice";
import {
    getFarmsAPR, getTradeFree, getRabbitRewards,
    getBorrowApr
} from "hooks/useFarms";
import { subStringNum } from "utils/subStringNum";
import { getApy } from "utils/ApyCommon";
import { borrowAprCommon } from "utils/BorrowApr";

//给initState添加MaxLeverage
export const new_initialState = () => {
    initialState.map((item: any, index: number) => {
        item.MaxLeverage = item.Leverage;
        item.index = index;
        item.visiblePop = false;
    });
    // //////console.log(123, initialState)
    return initialState;
}
/**
 * 获取tvl
 * @param routeAddress 交易所的route合约
 * @param LPaddress LP的合约地址
 * @param LPtokenAddress0 传入的第一个币种地址
 * @param LPtokenAddress1 传入的第二个币种地址
 * @param debtToken lp对应的债务tken地址
 * @return 返回tvl的值
 */
export const TvlEvent = createAsyncThunk<any, {
    routeAddress: string, LPaddress: string, LPtokenAddress0: string, LPtokenAddress1: string, debtToken: string, index: number | string, type: any, tid: any, goblin: any, FairLaunch_Pid: any, Address: any, Leverage: any, AddressApr: any, MdexTradeFree: any, PancakeTradeFree: any
}>(
    'TvlEvent',
    async ({ routeAddress, LPaddress, LPtokenAddress0, LPtokenAddress1, debtToken, index, type, tid, goblin, FairLaunch_Pid, Address, AddressApr,
        MdexTradeFree, PancakeTradeFree }) => {
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
            const Leverage = initialState[index as number].Leverage;

            const Farm_Apr = await getFarmsAPR(type, tid, LPaddress, Address);
            const Trading_Free = await getTradeFree(type, LPaddress, MdexTradeFree, PancakeTradeFree);
            const Rabbit = await getRabbitRewards(FairLaunch_Pid, index);
            const RABBIT_Rewards = TVLvalue ? ((Rabbit.apr / TVLvalue)) : 0;
            const Borrow = await getBorrowApr(AddressApr);
            const Borrow_Apr = borrowAprCommon(Borrow.BorrowedValue, Borrow.DepositValue);
            const APY = getApy(Farm_Apr, Trading_Free, RABBIT_Rewards, Borrow_Apr, Leverage);
            return {
                value: TVLvalue,
                index: index,
                APY: { Farm_Apr, Trading_Free, RABBIT_Rewards, Borrow_Apr, APY }
            }
        } catch (e) {
            console.error(index, 'TVL获取失败', e);
            return false
        }

    }
)
const Slice = createSlice({
    name: 'VaultList',
    initialState: new_initialState(),
    reducers: {
        setData(state, action) { },
        UpdateLeverage(state, action) {
            // console.log(111, action.payload.APY)
            state[action?.payload?.index].Leverage = action.payload.value;
            state[action?.payload?.index].APY = action.payload.APY;
        },
        //更新APY
        UpdateAPY(state, action) {
            // console.log(222, action.payload.value)
            state[action?.payload?.index].APY = action.payload.value
        },
    },
    extraReducers: (builder) => {
        builder.addCase(TvlEvent.pending, (state) => { })
        builder.addCase(TvlEvent.fulfilled, (state, action) => {
            state[action?.payload?.index].TVL = action.payload.value;
            //APY
            state[action?.payload?.index].APY = action.payload.APY;

        })
    }
})
export const { setData, UpdateLeverage, UpdateAPY } = Slice.actions
export const AllFroms = Slice.reducer


