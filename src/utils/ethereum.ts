import { AddEthereumChainParams, MetaMaskRequestMethods } from "chain";
import { EthereumProvider } from "types/ethereum";

function isUnwrappedRpcResult(response: unknown): response is {
    error?: string
    result?: unknown
} {
    return (
        typeof response === 'object' && response !== null && 'jsonrpc' in response
    )
}
/**
 * 防止有的客户端没有包裹response
 */
export function rpcResult(response: unknown): unknown | null {
    // Some providers don’t wrap the response
    if (isUnwrappedRpcResult(response)) {
        if (response.error) {
            throw new Error(response.error)
        }
        return response.result || null
    }

    return response || null
}
/**
 * metamask request 方法封装
 * @param ethereum provider, 浏览器中使用window.ethereum
 * @param method 请求方法
 * @param params 参数
 * @returns 
 */
export async function ethereumRequest(
    ethereum: EthereumProvider,
    method: string,
    params: string[]
): Promise<any> {
    // If ethereum.request() exists, the provider is probably EIP-1193 compliant.
    if (ethereum.request) {
        return ethereum.request({ method, params }).then(rpcResult)
    }
    // This is specific to some older versions of MetaMask combined with Web3.js.
    if (ethereum.sendAsync && ethereum.selectedAddress) {
        return new Promise((resolve, reject) => {
            ethereum.sendAsync(
                {
                    method,
                    params,
                    from: ethereum.selectedAddress,
                    jsonrpc: '2.0',
                    id: 0,
                },
                (err: Error, result: any) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(result)
                    }
                }
            )
        }).then(rpcResult)
    }
    // If none of the previous two exist, we assume the provider is pre EIP-1193,
    // using .send() rather than .request().
    if (ethereum.send) {
        return ethereum.send(method, params).then(rpcResult)
    }
    throw new Error(
        'The Ethereum provider doesn’t seem to provide a request method.'
    )
}

/**
 * 获取区块编码
 * @param ethereum provider, 默认使用window.ethereum
 * @returns 
 */
export async function getBlockNumber(ethereum?: EthereumProvider) {
    ethereum = ethereum ?? window.ethereum as any
    return ethereumRequest(ethereum!, MetaMaskRequestMethods.blockNumber, [])
}
/**
 * 添加链到metamask 上
 */
export async function addChainToBlock(id: number, ethereum?: EthereumProvider) {
    ethereum = ethereum ?? window.ethereum as any
    const params = AddEthereumChainParams[id]
    // ! 确保ethereum 部位null
    return ethereumRequest(ethereum!, MetaMaskRequestMethods.addEthereumChain, [params])
}