import { VAultListAddress } from "config/address";
import { useDispatch } from 'react-redux'
import {TotalDeposit2,TotalBorrowedData2,TokneBalanceS,IbTokenBalance} from './slise'

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

export const useTotalBorrowedData = () => {
    const dispatch = useDispatch() 
    return (params: any) => {
        dispatch(TotalBorrowedData2(params))
    }
}

export const useTokneBalance = () => {
    const dispatch = useDispatch() 
    return (params: any) => {
        dispatch(TokneBalanceS(params))
    }
}

export const useIbTokenBalance = () => {
    const dispatch = useDispatch() 
    return (params: any) => {
        dispatch(IbTokenBalance(params))
    }
}
