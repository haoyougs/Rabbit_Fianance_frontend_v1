import { ethers } from "ethers";

export type singerOrProvier = ethers.providers.Provider | ethers.Signer
// // 定义获取合约对象，address合约地址，abi是合约生成的abi，singer或者provider。
export const getContract = (address: string, abi: ethers.ContractInterface, singer?: singerOrProvier) => {
    singer = singer ?? new ethers.providers.Web3Provider(window!.ethereum as any)
    // 创建合约对象
    return new ethers.Contract(address, abi, singer)
}

export function getDefaultProvider(): ethers.providers.Web3Provider {
    return new ethers.providers.Web3Provider(window.ethereum as any)
}
export function getSigner(): ethers.Signer {
    return getDefaultProvider().getSigner()
}