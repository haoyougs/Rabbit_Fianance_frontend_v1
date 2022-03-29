import { VAultListAddress } from "config/address";
import { useDispatch } from 'react-redux'
import {TvlEvent} from './slise'

/**
 * 获取银行币种存款总量
 * @returns 
 */
export const GetTvlEvent = () => {
    const dispatch = useDispatch() 
    return (params:any) => {
        dispatch(TvlEvent(params))
    }
}
