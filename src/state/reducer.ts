
// 定义默认数据---模拟数据
const defaultState = {
    data: [
        {
            id: '#001',
            name: 'BNB',
        },
    ]
}
// 导出一个函数返回数据状态
export default (state = defaultState, action: { list: any; type: string; }) => {
    if (action.type === 'dataLis') {
        let newState = JSON.parse(JSON.stringify(state));
        newState.zhanshi = action.list
        return newState
    }
    return state
};

/**
 * action action 创建函数  异步action(createAsyncThunk)
 * reducer: slice, reducer  exreduerce
 * store:
 *
 *    configura(reudcer:{
 * })
 */

// react-redux useSelect 获取状态
// useDispatch 出发函数

//     context API  跨级别传值，爷爷级组价给孙子级组件传值
//       Provider   consumers