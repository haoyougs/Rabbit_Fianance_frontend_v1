import { Token } from "utils/token";
/**
 * 判断代币是否授权
 * @param tokenName 代币名称
 * @param account 钱包地址
 * @param ABI 代币ABI
 * @param address 代币合约
 * @param AddTwoStrategyAddr spender
 * @returns 查看是否授权，已授权返回 true，没有授权返回false
 */
export const Approveds = async (tokenName: any, account: any, ABI: any, address: any, library?: any, AddTwoStrategyAddr?: any) => {
    try {
        const TokneIsApprovd = new Token({ name: tokenName, icon: '', address: address, chainId: 56, ABI: ABI, symbol: '' })
        const IsApproved = await TokneIsApprovd.allowance({ address: account, spender: AddTwoStrategyAddr, signer: library!.getSigner() });
        //////console.log('查询授权', IsApproved);
        return IsApproved
    } catch (e) {
        console.error('查询失败', e);
        return e
    }

}
/**
 * 授权代币的方法
 * @param tokenName 代币名称
 * @param address 代币合约
 * @param ABI 代币abi
 * @param account 钱包地址
 * @param library
 */
export const ApproveWay = async (tokenName: any, address: any, ABI: any, account: any, library: any, AddTwoStrategyAddr?: any) => {
    //////console.log("address", address, "account", account, "addressspender", AddTwoStrategyAddr)
    try {
        //////console.log(tokenName)
        const TokneIsApprovd = new Token({ name: tokenName, icon: '', address: address, chainId: 56, ABI: ABI, symbol: '' })
        const Result = await TokneIsApprovd.approve({ address: account, spender: AddTwoStrategyAddr, signer: library!.getSigner() });
        //////console.log('授权成功', Result);
        return Result
    } catch (e) {
        //////console.log('授权失败', e);
        return e
    }
}