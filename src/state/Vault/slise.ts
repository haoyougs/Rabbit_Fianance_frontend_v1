import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TVL_ADDRESS, BANK_ADDRESS, BNB_ADDRESS } from "config/address";
import { ERC20, BankABI, TVLABI } from "config/ABI";
// import { TotalDeposit, TotalBorrowed, Balance, IbToken } from "hooks/useVault";
// import { useEffect } from "react";
// import { useWeb3React } from "@web3-react/core";
import { getDefaultProvider, getSigner } from 'utils/provider'
import { Contract, ethers } from "ethers";


const initialState = {
    BNB:
    {
        tokenName: 'BNB',
        APY: 1,
        //银行BNB总存款
        TotalDeposit: 0,
        //银行BNB借存款
        TotalBorrowed: 0,
        //用户BNB余额
        Balance: 0,
        //用户ibBNB余额
        ibBalance: 0
    },
}
/**
 * 获取银行BNB总存款
 */
export const TotalDepositData = createAsyncThunk<any>(
    'TotalDeposits',
    async () => {
        try {
            const ContractObj = new Contract(BANK_ADDRESS, BankABI, getDefaultProvider())
            const ResVal = await ContractObj.totalToken(BNB_ADDRESS)
            let Value = ethers.utils.formatUnits(ResVal, 18)
            return Value
        } catch (e) {
            return e
        }
    }
)
/**
 * 获取银行BNB借存款
 */
export const TotalBorrowedData = createAsyncThunk<any>(
    'TotalBorroweds',
    async () => {
        try {
            const ContractObj = new Contract(BANK_ADDRESS, BankABI, getDefaultProvider())
            const ResVal = await ContractObj.banks(BNB_ADDRESS)
            let Value = ethers.utils.formatUnits(ResVal.totalDebt, 18)
            return Value
        } catch (e) {
            return e
        }
    }
)
/**
 * 获取用户BNB余额
 */
export const BNBTokneBalance = createAsyncThunk<any, { library: any, TokenAddress: any }>(
    'tokenBalances',
    async ({ library, TokenAddress }) => {
        try {
            const Balances = await library?.getBalance(TokenAddress);
            let Value = ethers.utils.formatUnits(Balances, 18)
            return Value
        } catch (e) {
            console.error('BNBTokneBalance获取时错误');
            return e
        }
    }
)
/**
 * 获取用户ibBNB余额
 */
export const IbTokenBalance = createAsyncThunk<any, { Address: any, Abi: any, library: any, TokenAddress: any }>(
    'ibTokenBalance',
    async ({ Address, Abi, library, TokenAddress }) => {
        try {
            const Tokenaddress = new Contract(TokenAddress, Abi, library);
            const Balances = await Tokenaddress.balanceOf(Address)
            let Value = ethers.utils.formatUnits(Balances, 18)
            return Value
        } catch (e) {
            console.error('ibTokenBalance获取时错误');
            return e
        }
    }
)
const Slice = createSlice({
    name: 'bankData',
    initialState,
    reducers: {
        setData(state, action) { }
    },
    extraReducers: (builder) => {
        // 异步action 的三种状态，完成没有错误的情况
        builder.addCase(TotalDepositData.pending, (state) => { })
        builder.addCase(TotalDepositData.fulfilled, (state, action) => {
            state.BNB.TotalDeposit = action?.payload
        })
        // // rejected状态
        builder.addCase(TotalDepositData.rejected, (state) => { })

        builder.addCase(TotalBorrowedData.pending, (state) => { })
        builder.addCase(TotalBorrowedData.fulfilled, (state, action) => {
            state.BNB.TotalBorrowed = action?.payload
        })

        builder.addCase(BNBTokneBalance.pending, (state) => { })
        builder.addCase(BNBTokneBalance.fulfilled, (state, action) => {
            state.BNB.Balance = action?.payload
        })

        builder.addCase(IbTokenBalance.pending, (state) => { })
        builder.addCase(IbTokenBalance.fulfilled, (state, action) => {
            state.BNB.ibBalance = action?.payload
        })
    }
})

export const { setData } = Slice.actions
export const VaultReducer = Slice.reducer























// 待优化部分
// const Address={
//     56:{
//         bnb:"sdf"
//     },
//     97:{

//     }
// }
// const ERC20Contranct=(address,singerOrProvier)=>{
//     return new Contract(address, abi,singerOrProvier )
// }
// const TOtalCOntranct=(chainId,singerOrProvier)=>{
//     address=address[chainId].bnb
//     return new Contract(address, abi,singerOrProvier )
// }