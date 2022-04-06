import { VAultListAddress } from "config/address";
import { useDispatch } from 'react-redux'
import { TotalDeposit2, TotalBorrowedData2, TokneBalanceS, IbTokenBalance } from './slise'

/**
 * 获取银行币种存款总量
 * @returns
 */
export const useTotalDeposit = () => {
    const dispatch = useDispatch()
    return (params: any) => {
        dispatch(TotalDeposit2(params))
    }
}
//获取银行总借款
export const useTotalBorrowedData = () => {
    const dispatch = useDispatch()
    return (params: any) => {
        dispatch(TotalBorrowedData2(params))
    }
}
//获取用户币种余额
export const useTokneBalance = () => {
    const dispatch = useDispatch()
    return (params: any) => {
        dispatch(TokneBalanceS(params))
    }
}
//获取用户ibtoken余额
export const useIbTokenBalance = () => {
    const dispatch = useDispatch()
    return (params: any) => {
        dispatch(IbTokenBalance(params))
    }
}
