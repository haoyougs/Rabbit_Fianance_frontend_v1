import { Signer, providers, ContractInterface, ethers } from 'ethers'
import { getContract, singerOrProvier } from 'contract'
const MAX_APPROVE_VALUE = ethers.constants.MaxUint256
const ZERO_VALUE = ethers.utils.parseEther('0')
/**
 * token 代表
 */
export interface ITokenOptions {
    /*
     *token 名称
    */
    name?: string
    /**
     * token  图标
     */
    icon?: string
    /**
     * token 合约地址
     */
    address: string
    /**
     * token 符号
     */
    symbol: string
    /**
     * 小数点位数
     */
    decimals?: number
    /**
     * token 位于那个链上
     */
    chainId?: number,
    /**
     * token abi
     */
    ABI: ContractInterface
}
export interface ITokenFunctionParams {
    /**
     * 用户地址
     */
    address: string,
    /**
     * 授权的合约地址，（表示该授权合约需要用到当前代币）
     */
    spender: string,
    /**
     * 授权额度
     */
    value?: string | number
    /**
     * Provider 或者 Signer
     */
    signer?: singerOrProvier
}
export interface IToken {
    /**
     * 总铸造量
     */
    totalSupply: (signer?: singerOrProvier) => Promise<number>
    /**
     * 授权，把当前代币授权给某个合约调用
     * @param address 用户地址
     * @param spender 授权合约地址
     * @param value 授权数量
     */
    approve({ address, spender, value, signer }: ITokenFunctionParams): Promise<boolean>
    /**
     * 查询剩余授权额度，
     * @param address 用户地址
     * @param spender 合约地址
     */
    allowance({ address, spender }: Pick<ITokenFunctionParams, 'address' | 'spender' | 'signer'>): Promise<boolean>
    /**
     * 返回用户有用的该代币的数量
     * @param address 用户地址
     */
    balanceOf({ address, signer }: Pick<ITokenFunctionParams, 'address' | 'signer'>): Promise<number>
}

export class Token implements IToken {
    /*
    *token 名称
   */
    name?: string
    /**
     * token  图标
     */
    icon?: string
    /**
     * token 合约地址
     */
    address: string
    /**
     * token 符号
     */
    symbol: string
    /**
     * 小数点位数
     */
    decimals?: number
    /**
     * token 位于那个链上
     */
    chainId?: number
    /**
    * token abi
    */
    ABI: ContractInterface
    /**
     * 构造函数
     */
    constructor({ name, icon, address, symbol, decimals, chainId, ABI }: ITokenOptions) {
        this.name = name ?? symbol
        this.icon = icon
        this.address = address
        this.symbol = symbol
        // 默认18 位，因为以太坊中默认为18 位
        this.decimals = decimals ?? 18
        this.chainId = chainId
        this.ABI = ABI
    }
    async approve({ address, spender, value, signer }: ITokenFunctionParams): Promise<boolean> {
        // ERC20 合约对象
        const contract = this.getTokenContract(signer)
        try {
            const tx = await contract.approve(spender, value ?? MAX_APPROVE_VALUE)
            await tx.wait()
            return true
        } catch (ex) {
            //////console.log("授权ex:", ex)
            return false
        }
    }
    async allowance({ address, spender, signer }: Pick<ITokenFunctionParams, 'address' | 'signer' | 'spender'>): Promise<boolean> {
        // ERC20 合约对象
        const contract = this.getTokenContract(signer)
        try {
            const num = await contract.allowance(address, spender)
            return num.gt(ZERO_VALUE)

        } catch (ex) {
            //////console.log("授权ex:", ex)
            return false
        }
    }
    async balanceOf({ address, signer }: Pick<ITokenFunctionParams, 'address' | 'signer'>): Promise<number> {
        // ERC20 合约对象
        const contract = this.getTokenContract(signer)
        try {
            const num = await contract.balanceOf(address)
            return Number(ethers.utils.formatUnits(num, this.decimals))

        } catch (ex) {
            //////console.log("balanceOf ex:", ex)
            return 0
        }
    }
    getTokenContract(signer?: singerOrProvier) {
        return getContract(this.address, this.ABI, signer)
    }
    /**
     * 当前代币的总发行量
     * @param signer provider 或者 Signer
     */
    async totalSupply(signer?: singerOrProvier): Promise<number> {
        throw new Error("Method not implemented.")
    }

}