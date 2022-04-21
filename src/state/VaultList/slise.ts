import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getDefaultProvider, getSigner } from 'utils/provider'
import { ERC20, BankABI } from "config/ABI";
import { Contract, ethers } from "ethers";
import { BUSD_ADDRESS, ibBUSD_ADDRESS, USDT_ADDRESS, ibUSDT_ADDRESS, BTC_ADDRESS, ibBTC_ADDRESS, ETH_ADDRESS, ibETH_ADDRESS, RABBIT_ADDRESS, ibRabbit_ADDRESSS, BANK_ADDRESS } from 'config/address'

const initialState = [
    {
        tokenName: 'BUSD',
        APY: 1,
        TotalDeposit: 0,
        TotalBorrowed: 0,
        Balance: 0,
        ibBalance: 0,
        approve: false,
        btnState: true,
        tokenAddress: BUSD_ADDRESS,
        ibTokneAddress: ibBUSD_ADDRESS
    },
    {
        tokenName: 'USDT',
        APY: 2,
        TotalDeposit: 0,
        TotalBorrowed: 0,
        Balance: 0,
        ibBalance: 0,
        approve: false,
        btnState: true,
        tokenAddress: USDT_ADDRESS,
        ibTokneAddress: ibUSDT_ADDRESS
    },
    {
        tokenName: 'BTCB',
        APY: 3,
        TotalDeposit: 0,
        TotalBorrowed: 0,
        Balance: 0,
        ibBalance: 0,
        approve: false,
        btnState: true,
        tokenAddress: BTC_ADDRESS,
        ibTokneAddress: ibBTC_ADDRESS
    },
    {
        tokenName: 'ETH',
        APY: 4,
        TotalDeposit: 0,
        TotalBorrowed: 0,
        Balance: 0,
        ibBalance: 0,
        approve: false,
        btnState: true,
        tokenAddress: ETH_ADDRESS,
        ibTokneAddress: ibETH_ADDRESS
    },
    {
        tokenName: 'RABBIT',
        APY: 5,
        TotalDeposit: 0,
        TotalBorrowed: 0,
        Balance: 0,
        ibBalance: 0,
        approve: false,
        btnState: true,
        tokenAddress: RABBIT_ADDRESS,
        ibTokneAddress: ibRabbit_ADDRESSS
    },
]
const a: any[] = []
/**
 * 获取银行总存款
 */
export const TotalDeposit2 = createAsyncThunk<any, { bankAddress: any, tikenAddress: any, key: any }>(
    'TotalDeposit',
    async ({ bankAddress, tikenAddress, key }) => {

        try {
            const ContractObj = new Contract(
                BANK_ADDRESS,
                BankABI,
                getDefaultProvider()
            );
            const ResVal = await ContractObj.totalToken(tikenAddress);
            let Value = ethers.utils.formatUnits(ResVal, 18);
            return { value: Value, key: key };
        } catch (e) {
        }
    }
)

/**
 * 获取银行总借款
 */
export const TotalBorrowedData2 = createAsyncThunk<any, { TokenAddress: string, key: any }>(
    'TotalBorrowedsss',
    async ({ TokenAddress, key }) => {
        try {
            const ContractObj = new Contract(BANK_ADDRESS, BankABI, getDefaultProvider())
            const ResVal = await ContractObj.banks(TokenAddress)
            let Value = ethers.utils.formatUnits(ResVal.totalDebt, 18)
            return { value: Value, key: key }
        } catch (e) {
            return e
        }
    }
)
/**
 * 获取用户币种余额
 */
export const TokneBalanceS = createAsyncThunk<any, { Address: any, Abi: any, library: any, TokenAddress: any, key: any }>(
    'tokenBalanceS',
    async ({ Address, Abi, library, TokenAddress, key }) => {
        // console.log("Address", Address)
        try {
            const Tokenaddress = new Contract(TokenAddress, Abi, library);
            const Balances = await Tokenaddress.balanceOf(Address)
            let Value = ethers.utils.formatUnits(Balances, 18)
            return { value: Value, key: key }
        } catch (e) {
            console.error('BNBTokneBalance获取时错误');
            return e
        }
    }
)
/**
 * 获取用户ibtoken余额
 */
export const IbTokenBalance = createAsyncThunk<any, { Address: any, Abi: any, library: any, TokenAddress: any, key: any }>(
    'ibTokenBalanceS',
    async ({ Address, Abi, library, TokenAddress, key }) => {
        try {
            const Tokenaddress = new Contract(TokenAddress, Abi, library);
            const Balances = await Tokenaddress.balanceOf(Address)
            let Value = ethers.utils.formatUnits(Balances, 18)
            return { value: Value, key: key }
        } catch (e) {
            console.error('ibTokenBalance获取时错误');
            return e
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
        builder.addCase(TotalDeposit2.pending, (state) => { })
        builder.addCase(TotalDeposit2.fulfilled, (state, action) => {
            state[action.payload.key].TotalDeposit = action.payload.value
        })
        builder.addCase(TotalBorrowedData2.pending, (state) => { })
        builder.addCase(TotalBorrowedData2.fulfilled, (state, action) => {
            state[action.payload.key].TotalBorrowed = action.payload.value
        })
        builder.addCase(TokneBalanceS.pending, (state) => { })
        builder.addCase(TokneBalanceS.fulfilled, (state, action) => {
            state[action.payload.key].Balance = action.payload.value
        })
        builder.addCase(IbTokenBalance.pending, (state) => { })
        builder.addCase(IbTokenBalance.fulfilled, (state, action) => {
            state[action.payload.key].ibBalance = action.payload.value
        })
    }
})

export const { setData } = Slice.actions
export const VaultList = Slice.reducer


