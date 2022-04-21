import { ethers, Contract } from "ethers";
import { getDefaultProvider, getSigner } from "utils/provider";
import { ERC20, BankABI, PancakeAbi, KaicangABI } from "config/ABI";
import { FarmPancakeUSDT_BNB, PANCAKE_ROUTE, KAICANG, MDEX_ROUTE } from "config/LPAddress";
import { BADFLAGS } from "dns";
import { BANK_ADDRESS, BNB_ADDRESS } from "config/address";

/**
 * 获取钱包中的币种余额 这个方法用于获取bnb
 * @param library
 * @param account 钱包地址,也可以传币种的值 、获取bnb时传钱包地址获取其他币种时传其他币种地址
 * @returns
 */
export const TokenBalanceOf = async (account: any, library: any, address: any, name: any) => {
    console.log("TokenAddress", address);
    let Balances;
    if (name == "BNB") {
        //bnb
        Balances = await library?.getBalance(account);
    } else {
        //非bnb
        console.log("address", address)
        const Tokenaddress = new Contract(address, ERC20, library);
        Balances = await Tokenaddress.balanceOf(account)
    }
    let Value = ethers.utils.formatUnits(Balances, 18);
    return Value
};
/**
 * 获取钱包中的币种余额
 * @param library
 * @param TokenAddress 币种地址
 * @returns
 */
// export const BNBTokneBalance = async (library: any, TokenAddress: any) => {
//     const Balances = await library?.getBalance(TokenAddress);
//     let Value = ethers.utils.formatUnits(Balances, 18)
//     return Value
// };

/**
 * 获取最大借款量和最小借款量
 * @param addres 借款银行合约地址
 * @param pid 借款策略id
 * @returns 返回一个对象，{Max是最大值，Min是最小值}
 */
export const MaxMinLoan = async (addres: string, pid: any) => {
    console.log(222, pid)
    if (!pid) {
        return;
    }
    try {
        const ContractObj = new Contract(addres, BankABI, getDefaultProvider());
        const Result = await ContractObj.productions(Number(pid));
        const Max = ethers.utils.formatUnits(Result.maxDebt, 18)
        const Min = ethers.utils.formatUnits(Result.minDebt, 18)
        return { Max, Min }
    } catch (e) {
        console.error('获取最大借款量和最小借款量错误', e);
    }
}


/**
 * 开仓合约
 * @param strategyAddress 开仓策略地址
 * @param token0Address 币种0的地址
 * @param token1Address 币种1的地址
 * @param token0Amount 支付的币种0的数量
 * @param token1Amount 支付的币种1的数量
 * @param minLPAmount 获得lp的最小期望值设置为0即可
 * @param pid 借款策略id
 * @param borrow 借款token的数量
 * @param
 */
export const GoblinEvent = async (strategyAddress: string, token0Address: string, token1Address: string, token0Amount: any, token1Amount: any, pid: any, borrow: any, token0IsBNB: any, token1IsBNB: any) => {

    console.log('开仓策略地址', strategyAddress);
    console.log('币种0地址', token0Address);
    console.log('币种1地址', token1Address);
    console.log('支付的币种数量0', token0Amount);
    console.log('支付的币种数量1', token1Amount);
    console.log('借款策略id', pid);
    console.log('借款token的数量', ethers.utils.parseEther(borrow));
    console.log('token0IsBNB', token0IsBNB, token1IsBNB);

    try {
        const ContractObj = new Contract(KAICANG, KaicangABI, getSigner());
        // 查询编码后的结果
        const Result = await ContractObj.add_encode(strategyAddress, token0Address, token1Address, ethers.utils.parseEther(token0Amount), ethers.utils.parseEther(token1Amount), 0);
        // console.log(Result);

        const bankContract = new Contract(BANK_ADDRESS, BankABI, getSigner())
        // const tx = await bankContract.work(0, Number(pid), ethers.utils.parseEther(borrow), Result,
        //     { value: ethers.utils.parseEther(token1Amount).toString() }
        // )
        // await tx.wait()
        // console.log('开仓结果', tx);
        if ((!token0IsBNB && !token1IsBNB) ||
            (token0IsBNB && token0Amount == 0) ||
            (token1IsBNB && token1Amount == 0)) {
            const tx = await bankContract.work(0, Number(pid), ethers.utils.parseEther(borrow), Result,
                { value: ethers.utils.parseEther(token1Amount).toString() }
            )
            await tx.wait()
            console.log('开仓结果', tx);
        } else if (token0IsBNB && token0Amount != 0) {
            const tx = await bankContract.work(0, Number(pid), ethers.utils.parseEther(borrow), Result,
                { value: ethers.utils.parseEther(token0Amount).toString() }
            )
            await tx.wait()
            console.log('开仓结果', tx);
        } else if (token1IsBNB && token1Amount != 0) {
            const tx = await bankContract.work(0, Number(pid), ethers.utils.parseEther(borrow), Result,
                { value: ethers.utils.parseEther(token1Amount).toString() }
            )
            await tx.wait()
            console.log('开仓结果', tx);
        }
        return true

    } catch (e) {
        console.error('开仓错误', e);
        return false
    }

}
/**
 * 获取银行总借款
 */
export const TotalBorrowed = async (TokenAddress: string) => {
    try {
        const ContractObj = new Contract(BANK_ADDRESS, BankABI, getDefaultProvider())
        const ResVal = await ContractObj.banks(TokenAddress);
        let value = ethers.utils.formatUnits(ResVal.totalDebt, 18)
        return value;
    } catch (e) {
        return e
    }
}
//BNB可使用的余额
export const AvailableBNBBalance = async () => {
    try {
        const ContractObj = new Contract(BANK_ADDRESS, BankABI, getDefaultProvider());
        //银行总额
        const ResVal = await ContractObj.totalToken(BNB_ADDRESS);
        let totalVal = ethers.utils.formatUnits(ResVal, 18);
        //BNB银行债务
        const banks = await ContractObj.banks(BNB_ADDRESS);
        const totalDebt = ethers.utils.formatUnits(banks.totalDebt, 18);
        // console.log(totalVal, totalDebt)
        let value = parseFloat(totalVal) - parseFloat(totalDebt);
        return value;
    } catch (e) {
        return e
    }
}
/**
 * 获取可使用的余额
 */
export const AvailableBalance = async (TokenAddress: string) => {
    try {
        console.log(123);
        const ContractObj = new Contract(BANK_ADDRESS, BankABI, getDefaultProvider());
        //银行总额
        const total = await ContractObj.totalToken(TokenAddress);
        const totalVal = ethers.utils.formatUnits(total, 18);
        //银行债务
        const banks = await ContractObj.banks(TokenAddress);
        const totalDebt = ethers.utils.formatUnits(banks.totalDebt, 18);
        // console.log(totalVal);
        // console.log(totalDebt);
        let value = parseFloat(totalVal) - parseFloat(totalDebt);
        return value;
    } catch (e) {
        return e
    }
}

/**
 * 总借款数量用到的获取单币价格的方法
 * @param pancakeAddress pancake交易所的route合约
 * @param tokenAddress0 非稳定币地址
 * @param tokenAddress1 稳定币地址
 * @returns 返回非稳定币的单价
 */
export const AssetsBorrowed = async (pancakeAddress: string, tokenAddress0: string, tokenAddress1: string) => {
    // console.log(pancakeAddress, tokenAddress0, tokenAddress1)
    //查询单币价格
    const ContractObj = new Contract(pancakeAddress, PancakeAbi, getDefaultProvider());
    const x = ethers.utils.parseEther('1')
    const [z, y] = await ContractObj.getAmountsOut(x, [tokenAddress0, tokenAddress1]);
    // console.log(ethers.utils.formatUnits(z, 18), ethers.utils.formatUnits(y, 18))
    let singleTokenPrice = ethers.utils.formatUnits(y, 18);
    let SingleTokenPriceS = Number(singleTokenPrice)
    return SingleTokenPriceS
}
export const DataInfo = async (token0: string, token1: string,
    Amount0: any, Amount1: any, Leverages: any,
    // LoanSwitch0: any, baseToken: any,
    type: any) => {
    const ROUTE = type == "Pancake" ? PANCAKE_ROUTE : MDEX_ROUTE;
    let res = await AssetsBorrowed(ROUTE, token0, token1);
    console.log("res", res);
    let token0Price = 1;
    //非稳定币价格
    let token1Price = 1 / (Math.floor(res * 100000) / 100000);
    console.log("token0Price", token0Price)
    console.log("token1Price", token1Price)
    const new_Amount0 = Amount0 ? Amount0 : 0;
    const new_Amount1 = Amount1 ? Amount1 : 0;
    // userTvl⽤户出的价值
    let userTvl = token0Price * parseFloat(new_Amount0) + token1Price * parseFloat(new_Amount1);
    console.log("TotalPrice", userTvl);
    // 头寸总tvl 总价格*杠杆倍数
    let tvl = userTvl * parseInt(Leverages);
    console.log("tvl", tvl);
    //计算总头寸中两个币的数量
    //总头⼨tvl / 2 = ⼀个币的tvl。
    let tokentvl = tvl / 2;
    console.log("tokentvl", tokentvl)
    //⼀个币的tvl / 币价 = 这个币的数量
    let token0Amount = tokentvl / token0Price;
    // console.log("token0Amount", token0Amount)
    //⼀个币的tvl / 币价 = 这个币的数量
    let token1Amount = tokentvl / token1Price;
    // console.log("token1Amount", token1Amount)
    //计算债务率
    let debts = tvl == 0 ? 0 : ((tvl - userTvl) / tvl);
    // console.log("debts", debts)
    return { tvl, userTvl, token0Price, token1Price, token0Amount, token1Amount, debts }
}

