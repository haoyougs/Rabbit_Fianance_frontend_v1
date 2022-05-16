import { VAultListAddress } from "config/address";
import { useDispatch } from 'react-redux'
import { TvlEvent, UpdateLeverage, UpdateAPY } from './slise'
import { getApy } from "utils/ApyCommon";
/**
 * 获取银行币种存款总量
 * @returns
 */
export interface UpdateTvl {
    MaxLeverage: number,
    Leverage: number,
    index: number,
    type: string

}
export const GetTvlEvent = () => {
    const dispatch = useDispatch()
    return (params: any) => {
        dispatch(TvlEvent(params))
    }
}
export const UpdateTvlLeverage = () => {
    const dispatch = useDispatch()
    return (params: any) => {
        const current_MaxLeverage = params.MaxLeverage;
        let current_Leverage = params.Leverage;

        if (current_MaxLeverage == 1) {
            return;
        }
        //type为up 并且Leverage 小于MaxLeverage
        if (params.type == 'up' && current_Leverage < current_MaxLeverage) {
            if (current_Leverage < 4) {
                current_Leverage += 0.5
            } else {
                current_Leverage += 1
            }
        }
        if (params.type == 'down' && current_Leverage > 1) {
            if (current_Leverage <= 4) {
                current_Leverage -= 0.5
            } else {
                current_Leverage -= 1
            }

        }
        // console.log(params);
        const Farm_Apr = params.APY.Farm_Apr;
        const Trading_Free = params.APY.Trading_Free;
        const RABBIT_Rewards = params.APY.RABBIT_Rewards;
        const Borrow_Apr = params.APY.Borrow_Apr;
        const APY = getApy(
            Farm_Apr,
            Trading_Free,
            RABBIT_Rewards,
            Borrow_Apr,
            current_Leverage);
        const NewAPY = {
            Farm_Apr, Trading_Free, RABBIT_Rewards, Borrow_Apr, APY
        }
        // console.log(NewAPY);
        dispatch(UpdateLeverage({ index: params.index, value: current_Leverage, APY: NewAPY }))
    }
}
export const UpdateTvlAPY = () => {
    const dispatch = useDispatch()
    return (params: any) => {
        dispatch(UpdateAPY({ index: params.index, value: params.APY }))
    }
}
