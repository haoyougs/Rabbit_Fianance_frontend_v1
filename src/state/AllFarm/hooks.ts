import { VAultListAddress } from "config/address";
import { useDispatch } from 'react-redux'
import { TvlEvent, UpdateTvl } from './slise'

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
    return (params: UpdateTvl) => {
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
        dispatch(UpdateTvl({ index: params.index, value: current_Leverage }))
    }
}
