import { ethers } from "ethers";
//获取默认provider
export function getDefaultProvider(): ethers.providers.Web3Provider {
    return new ethers.providers.Web3Provider(window.ethereum as any)
}
export function getSigner(): ethers.Signer {
    return getDefaultProvider().getSigner()
}