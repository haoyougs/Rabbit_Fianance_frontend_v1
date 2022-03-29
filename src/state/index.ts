import { createStore, configureStore } from "@reduxjs/toolkit";
import reducer from "./reducer";
import { VaultReducer } from "./Vault/slise";
import { VaultList } from './VaultList/slise'
import { AllFroms } from './AllFarm/slise';

export const store = configureStore({
    reducer: {
        VaultReducer: VaultReducer,
        VaultList: VaultList,
        AllFroms:AllFroms
    }
})

// 使用createStore来引用reducer中的数据
// const store = createStore(reducer)
// 创建完成后将它导出
export default store