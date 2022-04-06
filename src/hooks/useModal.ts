import React, { useCallback, useContext } from "react";
import { Context } from "contexts/Motal";

const useModal = (modal:React.ReactNode)=>{
    const {onShow,onHide} = useContext(Context);
    const handleShow = useCallback(()=>{
        onShow(modal)
    },[modal,onShow])
    return [handleShow,onHide]
}
export default useModal;