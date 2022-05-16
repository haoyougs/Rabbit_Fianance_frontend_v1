import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core'
import { InjectConnector } from '../utils/web3'
import { addChainToBlock } from 'utils/ethereum'
import { Toast } from 'utils/toast'
import { useEffect } from 'react'
import { NoEthereumProviderError } from '@web3-react/injected-connector'
import { NoBscProviderError } from '@binance-chain/bsc-connector'
import { InitalChainId } from 'chain'
import { WalletConnectorByName } from 'config/wallet/connector'
import { ConnectorNames, LoginFn } from 'config/wallet/wallet'
import { InjectedConnector } from '@web3-react/injected-connector'
import { EthereumProvider } from "types/ethereum";
const connectKey = "CONNECtOR"

export const useAuth = () => {
    const { activate } = useWeb3React()
    const Login = () => {
        // //////console.log(333, InjectConnector)
        if (InjectConnector) {
            activate(InjectConnector, async (error: Error) => {
                if (error instanceof UnsupportedChainIdError) {
                    const hasSetup = await addChainToBlock(56)
                    if (hasSetup) {
                        activate(InjectConnector)
                    }
                }
            })
        }
    }
    return Login
}
/**
 * 用户连接钱包
 * @param currentChainId 初始化链id
 * @returns
 */
export const useAuth2 = (currentChainId: number = InitalChainId) => {
    const { chainId, activate, deactivate } = useWeb3React()

    const Login: LoginFn = (connectId: ConnectorNames) => {
        // 根据选择的钱包获取钱包连接器
        const connector = WalletConnectorByName[connectId]
        //////console.log(444, connector)
        localStorage.setItem(connectKey, connectId)
        if (connector) {
            // 连接钱包
            activate(connector, async (error: Error) => {
                // UnsupportedChainIdError 表示链不在钱包中
                //////console.log(666, error)
                if (error instanceof UnsupportedChainIdError) {
                    // 添加链到钱包，然后再重新连接
                    addChainToBlock(currentChainId).then(res => {
                        activate(connector)
                    }).catch(ex => {
                        Toast.error(ex.message)
                    })
                } else {
                    if (error instanceof NoEthereumProviderError || error instanceof NoBscProviderError) {
                        Toast.error("No provider was found")
                    } else {
                        Toast.error(error.message)
                    }
                }
            })
        } else {
            // 未获取到连接器，表示还不支持此类型钱包
            Toast.error("Unable to find connector")
        }
    }

    const Logout = () => {
        deactivate()
    }
    return { Login, Logout }
}
/**
 *
 */
export const useInitWallet = () => {
    const { Login } = useAuth2()
    const { chainId, account, library } = useWeb3React()
    useEffect(() => {
        if (!account) {
            const connector = localStorage.getItem(connectKey)
            if (connector) {
                Login(connector as any)
            } else if (window.ethereum) {// 如果有ethereum，则表示支持小狐狸的
                Login(ConnectorNames.Injected)
            } else if (window.BinanceChain) {// BinanceChain 是币安钱包全局注册进去的变量
                Login(ConnectorNames.BSC)
            }
        }

    }, [])
}
//监听切换网络
export const ListenNetworkChanged = () => {
    const { account, active, library, chainId, error, activate } = useWeb3React();
    const ethereum = window.ethereum as EthereumProvider | undefined;
    if (window.ethereum && (window.ethereum as any).on) {
        if (window.ethereum.isMetaMask) {
            (ethereum as any).on(("networkChanged"), (res: any) => {
                const InjectConnector = new InjectedConnector({ supportedChainIds: [56] })
                // //////console.log(222,InjectConnector.supportedChainIds)
                if (InjectConnector) {
                    activate(InjectConnector)
                }
            })
        }
    }
}