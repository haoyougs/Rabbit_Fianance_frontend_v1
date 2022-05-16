import { TotalDepositData, TotalBorrowedData, BNBTokneBalance, IbTokenBalance } from './slise'
import { useDispatch } from 'react-redux'
import { Contract, ethers } from "ethers";
/**
 * 获取银行币种存款总量
 * @returns
 */
export const useTotalDepositData = () => {
    const dispatch = useDispatch() //store.dispatch
    return (params: any) => {
        // dispatch 出发action
        dispatch(TotalDepositData(params))
    }
}
/**
 * 获取银行币种借款总量
 * @returns
 */
export const useTotalBorrowedData = () => {
    const dispatch = useDispatch()
    return () => {
        dispatch(TotalBorrowedData())
    }
}
/**
 * 获取用户的币种余额
 * @returns
 */
export const useBNBTokneBalance = () => {
    const dispatch = useDispatch();
    return (params: any) => {
        dispatch(BNBTokneBalance(params))
    }
}
/**
 * 获取用户的ibToken余额
 */
export const useIbTokneBalance = () => {
    const dispatch = useDispatch();
    return (params: any) => {
        dispatch(IbTokenBalance(params))
    }
}
//获取BNB余额
export const getBNBTokneBalance = async (library: any, account: any) => {
    try {
        const Balances = await library?.getBalance(account);
        let Value = ethers.utils.formatUnits(Balances, 18)
        return Value
    } catch (e) {
        console.error('BNBTokneBalance获取时错误');
    }
}
//获取ibBNB余额
export const getIbTokenBalance = async (Address: any, Abi: any,
    library: any, TokenAddress: any) => {
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
/**
 * 获取用户币种余额
 */
export const TokneBalanceS = async (account: any, Abi: any,
    library: any, TokenAddress: any) => {
    try {
        const Tokenaddress = new Contract(TokenAddress, Abi, library);
        const Balances = await Tokenaddress.balanceOf(account)
        let Value = ethers.utils.formatUnits(Balances, 18)
        return Value;
    } catch (e) {
        console.error('BNBTokneBalance获取时错误');
        return e
    }
}