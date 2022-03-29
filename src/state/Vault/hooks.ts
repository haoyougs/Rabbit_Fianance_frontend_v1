import { TotalDepositData, TotalBorrowedData, BNBTokneBalance,IbTokenBalance } from './slise'
import { useDispatch } from 'react-redux'

/**
 * 获取银行币种存款总量
 * @returns 
 */
export const useTotalDepositData = () => {
    const dispatch = useDispatch() //store.dispatch
    return () => {
        // dispatch 出发action
        dispatch(TotalDepositData())
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


