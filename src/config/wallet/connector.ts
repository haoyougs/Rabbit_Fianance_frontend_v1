/**
 * 不同的钱包，连接方式不同
 */
import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { BscConnector } from '@binance-chain/bsc-connector'
import { SupportChains, WalletMapChains } from 'chain/index'
import { ConnectorNames } from './wallet'
/**
 * 初始化inected 类型的连接器
 */
const injected = new InjectedConnector({ supportedChainIds: SupportChains })
/**
 * 初始化walletConnectConnect
 *
 */
const walletconnect = new WalletConnectConnector({
  rpc: WalletMapChains,
  qrcode: true
})
/**
 * 初始化币安钱包连接器
 */
const bscConnector = new BscConnector({ supportedChainIds: SupportChains })

export const WalletConnectorByName: { [connectorName in ConnectorNames]: any } = {
  [ConnectorNames.Injected]: injected,
  [ConnectorNames.WalletConnect]: walletconnect,
  [ConnectorNames.BSC]: bscConnector
}