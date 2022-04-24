import { VAultListAddress } from "config/address";
import { useDispatch } from 'react-redux';
import { setNotice, setNotice2, setNoticeText } from "./slice"
//notice show or hide
export const UpdateNotice = () => {
    const dispatch = useDispatch();
    return (params: any) => {
        dispatch(setNotice(params))
    }
}
//notice2 show or hide
export const UpdateNotice2 = () => {
    const dispatch = useDispatch();
    return (params: any) => {
        dispatch(setNotice2(params))
    }
}
//更新notice info
export const UpdateNoticeText = () => {
    const dispatch = useDispatch();
    return (params: any) => {
        dispatch(setNoticeText(params))
    }
}
