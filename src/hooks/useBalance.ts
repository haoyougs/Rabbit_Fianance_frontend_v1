import { Token } from "typescript";
import { ethers } from 'ethers'
import { useState, useEffect } from 'react'
import { ERC20 } from "config/ABI";


/**
 * 获取链上基础代币
 * @param account 用户钱包地址
 * @param provider provider
 * @param decimals 代币小数点位数，默认为18位
 * @returns 
 */
export const useBalance = (account: string, provider: ethers.providers.Web3Provider, decimals = 18) => {
    const [balance, setBalance] = useState('0')
    useEffect(() => {
        if (account && provider) {
            provider.getBalance(account).then(res => {
                setBalance(ethers.utils.formatUnits(res, decimals))
            })
        }
    }, [account, provider])
    return balance
}
/**
 * 
 * @param account 
 * @param abi 
 * @param decimals 
 * @returns 
 */
// export const useERC20Balance = (account,abi=erc20abi,decimals=18) => {
//     const [balance, setBalance] = useState('0')
//     useEffect(() => {
//         if (account && provider) {
//             erc20 = new ethers.Contract()
//             ERC20.balanceOf(accout).then(res => {
//                 setBalance(ethers.utils.formatUnits(res, decimals))
//             })
//         }
//     }, [account, provider])
//     return balance
// }

