type EthereumProviderEip1193 = {
    request: (args: {
        method: string
        params?: unknown[] | object
    }) => Promise<unknown>
}

type EthereumProviderSend = {
    send: (method: string, params: string[]) => Promise<unknown>
}

type EthereumProviderSendAsync = {
    sendAsync: (
        params: {
            method: string
            params: string[]
            from: string
            jsonrpc: '2.0'
            id: number
        },
        callback: (err: Error, result: unknown) => void
    ) => void
    selectedAddress: string
}

/**
 * window.ethereum 类型
 * Eip-1193 规范
 */
export type EthereumProvider = EthereumProviderEip1193 &
    EthereumProviderSend &
    EthereumProviderSendAsync