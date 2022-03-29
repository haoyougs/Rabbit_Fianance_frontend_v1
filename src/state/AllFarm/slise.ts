import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getDefaultProvider, getSigner } from 'utils/provider'
import { ERC20, BankABI, PancakeAbi } from "config/ABI";
import { BigNumber, Contract, ethers } from "ethers";
import { initialState } from "./State";

/**
 * 获取tvl
 * @param routeAddress 交易所的route合约
 * @param LPaddress LP的合约地址
 * @param LPtokenAddress0 传入的第一个币种地址
 * @param LPtokenAddress1 传入的第二个币种地址
 * @param debtToken lp对应的债务tken地址
 * @return 返回tvl的值
 */
export const TvlEvent = createAsyncThunk<any, { routeAddress: string, LPaddress: string, LPtokenAddress0: string, LPtokenAddress1: string, debtToken: string }>(
    'TvlEvent',
    async ({ routeAddress, LPaddress, LPtokenAddress0, LPtokenAddress1, debtToken }) => {
        try {
            //查询单币价格
            const ContractObj = new Contract(routeAddress, PancakeAbi, getDefaultProvider());
            const x = ethers.utils.parseEther('1')
            const [z, y] = await ContractObj.getAmountsOut(x, [LPtokenAddress0, LPtokenAddress1]);
            let singleTokenPrice = ethers.utils.formatUnits(y, 18);
            let SingleTokenPriceS = Number(singleTokenPrice)
            //查询lp池子深度，就是池子中持有多少币；
            const tokenAmount = new Contract(LPtokenAddress0, ERC20, getDefaultProvider());
            const pondDepth = await tokenAmount.balanceOf(LPaddress)
            let PondDepthS = ethers.utils.formatUnits(pondDepth, 18);
            let depth = Number(PondDepthS)
            let TotalPrice = (SingleTokenPriceS * depth) * 2
            //查lp总数量
            const LPAmount = new Contract(LPaddress, ERC20, getDefaultProvider());
            const lpamount = await LPAmount.totalSupply()
            let lpamountS = ethers.utils.formatUnits(lpamount, 18);
            let LPAmountS = Number(lpamountS)
            let lpPrice = TotalPrice / LPAmountS
            //获取债务token总量
            const debtAddress = new Contract(debtToken, ERC20, getDefaultProvider());
            const debtAmmount = await debtAddress.totalSupply();
            let debtTotal = ethers.utils.formatUnits(debtAmmount, 18);
            let DebtTotalS = Number(debtTotal)
            let TVLvalue = lpPrice * DebtTotalS
            console.log('tvl', TVLvalue);
            return TVLvalue
        } catch (e) {
            console.error('TVL获取失败', e);
            return false
        }

    }
)

const Slice = createSlice({
    name: 'VaultList',
    initialState,
    reducers: {
        setData(state, action) { }
    },
    extraReducers: (builder) => {
        builder.addCase(TvlEvent.pending, (state) => { })
        builder.addCase(TvlEvent.fulfilled, (state, action) => {
            state[0].TVL = action.payload
        })
    }
})

export const { setData } = Slice.actions
export const AllFroms = Slice.reducer


