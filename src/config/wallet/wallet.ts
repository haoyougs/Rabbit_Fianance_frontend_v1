
import MetamaskImg from 'assets/WalletImg/Metamask.png'
import WalletConnectImg from 'assets/WalletImg/WalletConnect.png'
import MathWalletImg from 'assets/WalletImg/MathWallet.png'
import TokenPocketImg from 'assets/WalletImg/TokenPocket.png'
import TrustWalletImg from 'assets/WalletImg/TrustWallet.png'
import BinanceChainImg from 'assets/WalletImg/BinanceChain.svg'

/**
 * 钱包连接方式
 */
export  enum ConnectorNames {
    // 浏览器插件注入，比如metamask,tokenpocket,mathwallet等
    Injected = "injected",
    // WalletConnect 类型的钱包
    WalletConnect = "walletconnect",
    // 币安钱包
    BSC = "bsc"
}
/**
 * 连接钱包
 */
export  type LoginFn = (connectorId: ConnectorNames) => void;
/**
 * 钱包配置
 */
export interface IWalletConfig {
    // 钱包名称
    title: string;
    // 钱包icon
    icon: any;
    // 连接方式
    connectorId: ConnectorNames;
    // 优先级
    priority: number;
}
/**
 * 项目中用到的钱包
 */
export const WalletConnectors: IWalletConfig[] = [
    
    {
        // metamask 钱包
        title: "Metamask",
        icon: MetamaskImg,
        connectorId: ConnectorNames.Injected,
        priority: 1,
    },
    {
        // 支持WalletConnect 的钱包
        title: "WalletConnect",
        icon: WalletConnectImg,
        connectorId: ConnectorNames.WalletConnect,
        priority: 2,
    },
    {
        // 币安钱包
        title: "Binance Chain",
        icon: BinanceChainImg,
        connectorId: ConnectorNames.BSC,
        priority: 999,
    },
    {
        // TokenPocket 钱包
        title: "TokenPocket",
        icon: TokenPocketImg,
        connectorId: ConnectorNames.Injected,
        priority: 999,
    },
    {
        // MathWallet 钱包
        title: "MathWallet",
        icon: MathWalletImg,
        connectorId: ConnectorNames.Injected,
        priority: 999,
    },
    // 暂时不用
    {
        title: "Trust Wallet",
        icon: TrustWalletImg,
        connectorId: ConnectorNames.Injected,
        priority: 3,
    },
   /*  {
        title: "SafePal",
        icon: '',
        connectorId: ConnectorNames.Injected,
        priority: 999,
    },
    {
        title: "Coin98",
        icon: '',
        connectorId: ConnectorNames.Injected,
        priority: 999,
    }, */
];