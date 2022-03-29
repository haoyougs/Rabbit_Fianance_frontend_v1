import { ethers } from "ethers"

// 合约声明对象需要一个provider或者一个singer
// provider智能读取不能写入
// singer可读可写，
export type singerOrProvier = ethers.providers.Provider | ethers.Signer
// 定义获取合约对象，address合约地址，abi是合约生成的abi，singer或者provider。
export const getContract = (address: string, abi: ethers.ContractInterface, singer?: singerOrProvier) => {
    singer = singer ?? new ethers.providers.Web3Provider(window!.ethereum as any)
    // 创建合约对象
    return new ethers.Contract(address, abi, singer)
}