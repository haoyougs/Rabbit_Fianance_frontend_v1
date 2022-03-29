/**
 * 支持的链
 */
 export const SuportChain = {
    eth: {
        chainId: 1,
        name: 'eth'
    },
    bsc: {
        chainId: 56,
        name: 'bsc'
    },
    polygon: {
        chainId: 56,
        name: 'polygon'
    }
}

export enum NetWorkID {
    Mainnet = 56,
    Testnet = 97
}

export enum SUPPORT_CHAIN {
    BSC = 56,
    BSCTEST = 97,

}

// 当前链id
export const CURRENT_CHAIN = 56

/**
 * MetaMask 中request请求中的methods 方法
 */
export enum MetaMaskRequestMethods {
    /**
     * 添加一条现在metamask 中不存在的链
     */
    addEthereumChain = "wallet_addEthereumChain",
    /**
     * 添加token 代币到钱包中
     */
    watchAsset = 'wallet_watchAsset',
    /**
     *  获取当前连接网络的链的id
     */
    chainId = 'eth_chainId',
    /**
     * eth_requestAccounts 获取账号(或者可以理解为链接metamask 钱包)
     */
    requestAccounts = 'eth_requestAccounts',
    /**
     * 获取账户地址
     */
    accounts = 'eth_accounts',
    /**
     * 获取最新区块编号
     */
    blockNumber = 'eth_blockNumber'
}
/**
 * 添加一条链到metamask 上时，请求的网络参数
 */
export const AddEthereumChainParams: { [key: number]: any } = {
    8: {
        chainId: "0x8",
        chainName: "Ubiq",
        nativeCurrency: {
            name: "Ubiq Ether",
            symbol: "UBQ",
            decimals: 18,
        },
        rpcUrls: ["https://rpc.octano.dev/"],
        blockExplorerUrls: ["https://ubiqscan.io/"]
    },
    56: {
        chainId: `0x38`,
        chainName: 'Binance Smart Chain Mainnet',
        nativeCurrency: {
            name: 'BNB',
            symbol: 'bnb',
            decimals: 18,
        },
        rpcUrls: ['https://bsc-dataseed1.ninicoin.io', 'https://bsc-dataseed1.defibit.io', 'https://bsc-dataseed.binance.org'],
        blockExplorerUrls: [`https://bscscan.com/`],
    },
}

/**
 * 当前应用支持的链
 */
export const SupportChains = [SuportChain.bsc].map(item => item.chainId)
/**
 * wallet connect 支持的链
 */
export const WalletMapChains = {
    [SuportChain.bsc.chainId]: 'https://bsc-dataseed.binance.org'
}
/**
 * 应用初始应用链
 */
export const InitalChainId = 56