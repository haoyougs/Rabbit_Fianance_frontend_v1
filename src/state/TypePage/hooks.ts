import { VAultListAddress } from "config/address";
import { useDispatch } from 'react-redux';
import { setNotice, setNotice2, setNoticeText } from "./slice"
export const UpdateNotice = () => {
    const dispatch = useDispatch();
    return (params: any) => {
        dispatch(setNotice(params))
    }
}
export const UpdateNotice2 = () => {
    const dispatch = useDispatch();
    return (params: any) => {
        dispatch(setNotice2(params))
    }
}
export const UpdateNoticeText = () => {
    const dispatch = useDispatch();
    return (params: any) => {
        dispatch(setNoticeText(params))
    }
}