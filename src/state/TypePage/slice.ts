import { createSlice } from "@reduxjs/toolkit"
import { NoticeState } from "./state"
//给initState添加MaxLeverage

const Slice = createSlice({
    name: "Notice",
    initialState: NoticeState,
    reducers: {
        setNotice(state, action) {
            state.Notice = action.payload
        },
        setNotice2(state, action) {
            state.Notice2 = action.payload
        },
        setNoticeText(state, action) {
            state.NoticeText = action.payload
        }
    },
    extraReducers: (builder) => {
    }
});
export const { setNotice, setNotice2, setNoticeText } = Slice.actions;
export const Notice = Slice.reducer;
