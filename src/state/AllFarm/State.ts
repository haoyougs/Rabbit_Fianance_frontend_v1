import { 
    FarmPancakeUSDT_BNB,
    FarmPancakeUSDT_BUSD,
    FarmPancakeBNBBUSD,
    FarmPancakeETH_BNB,
    FarmPancakeBTCB_BUSD,
    FarmPancakeBTCB_BNB,
    FarmPancakeCAKE_BNB,
    FarmPancakeBNB_LINK,
    FarmPancakeBNB_XVS,
    FarmPancakeDOT_BNB,
    FarmPancakeADA_BNB,
    FarmPancakeBNB_UNI,
    FarmPancakeCAKE_BUSD,
    FarmPancakeUSDC_USDT,
    FarmPancakeUSDC_BUSD,
    FarmPancakeDAI_BUSD,
    FarmPancakeTUSD_BUSD,
    FarmPancakeUST_BUSD,
    FarmPancakeVAI_BUSD,
    FarmPancakeRABBIT_BNB,
    FarmMdexBNB_BUSD,
    FarmMdexUSDT_BNB,
    FarmMdexETH_BNB,
    FarmMdexBTCB_BNB,
    FarmMdexBTCB_USDT,
    FarmMdexETH_USDT,
    FarmMdexETH_BTCB,
    FarmMdexMDX_BUSD,
    FarmMdexFIL_USDT,
    FarmMdexDOT_USDT,
    FarmMdexRABBITBUSD,
} from "config/LPAddress"


export const initialState = [
    {
        LPtokenName: 'RABBIT-BUSD',
        type: 'MDEX',
        APY: 0,
        TVL: 0,
        Leverage: 1,
        type2: 1,
        address:'FarmPancakeUSDT_BNB'
    }, {
        LPtokenName: 'RABBIT-BNB',
        type: 'PancakeSwap',
        APY: 0,
        TVL: 0,
        Leverage: 1,
        type2: 1
    }, {
        LPtokenName: 'USDC-BUSD',
        type: 'PancakeSwap',
        APY: 0,
        TVL: 0,
        Leverage: 9,
        type2: 0
    }, {
        LPtokenName: 'USDT-USDC',
        type: 'PancakeSwap',
        APY: 0,
        TVL: 0,
        Leverage: 9,
        type2: 0
    }, {
        LPtokenName: 'USDT-BUSD',
        type: 'PancakeSwap',
        APY: 0,
        TVL: 0,
        Leverage: 9,
        type2: 0
    }, {
        LPtokenName: 'DAI-BUSD',
        type: 'PancakeSwap',
        APY: 0,
        TVL: 0,
        Leverage: 4,
        type2: 0
    }, {
        LPtokenName: 'BNB-BUSD',
        type: 'PancakeSwap',
        APY: 0,
        TVL: 0,
        Leverage: 3,
        type2: 1
    }, {
        LPtokenName: 'BNB-BUSD',
        type: 'MDEX',
        APY: 0,
        TVL: 0,
        Leverage: 3,
        type2: 1
    }, {
        LPtokenName: 'USDT-BNB',
        type: 'PancakeSwap',
        APY: 0,
        TVL: 0,
        Leverage: 3,
        type2: 1,
        address:FarmPancakeUSDT_BNB
    }, {
        LPtokenName: 'USDT-BNB',
        type: 'MDEX',
        APY: 0,
        TVL: 0,
        Leverage: 3,
        type2: 1
    }, {
        LPtokenName: 'ETH-BNB',
        type: 'MDEX',
        APY: 0,
        TVL: 0,
        Leverage: 3,
        type2: 1
    }, {
        LPtokenName: 'ETH-BNB',
        type: 'PancakeSwap',
        APY: 0,
        TVL: 0,
        Leverage: 3,
        type2: 1
    }, {
        LPtokenName: 'ETH-USDT',
        type: 'MDEX',
        APY: 0,
        TVL: 0,
        Leverage: 3,
        type2: 1
    }, {
        LPtokenName: 'ETH-BTCB',
        type: 'MDEX',
        APY: 0,
        TVL: 0,
        Leverage: 3,
        type2: 1
    }, {
        LPtokenName: 'BTCB-BNB',
        type: 'MDEX',
        APY: 0,
        TVL: 0,
        Leverage: 3,
        type2: 1
    }, {
        LPtokenName: 'BTCB-BNB',
        type: 'PancakeSwap',
        APY: 0,
        TVL: 0,
        Leverage: 3,
        type2: 1
    }, {
        LPtokenName: 'BTCB-USDT',
        type: 'MDEX',
        APY: 0,
        TVL: 0,
        Leverage: 3,
        type2: 1
    }, {
        LPtokenName: 'BTCB-BUSD',
        type: 'PancakeSwap',
        APY: 0,
        TVL: 0,
        Leverage: 3,
        type2: 1
    }, {
        LPtokenName: 'CAKE-BNB',
        type: 'PancakeSwap',
        APY: 0,
        TVL: 0,
        Leverage: 3,
        type2: 1
    }, {
        LPtokenName: 'CAKE-BUSD',
        type: 'PancakeSwap',
        APY: 0,
        TVL: 0,
        Leverage: 3,
        type2: 1
    }, {
        LPtokenName: 'MDX-BUSD',
        type: 'MDEX',
        APY: 0,
        TVL: 0,
        Leverage: 3,
        type2: 1
    }, {
        LPtokenName: 'VAI-BUSD',
        type: 'PancakeSwap',
        APY: 0,
        TVL: 0,
        Leverage: 4,
        type2: 0
    }, {
        LPtokenName: 'UST-BUSD',
        type: 'PancakeSwap',
        APY: 0,
        TVL: 0,
        Leverage: 4,
        type2: 0
    }, {
        LPtokenName: 'TUSD-BUSD',
        type: 'PancakeSwap',
        APY: 0,
        TVL: 0,
        Leverage: 4,
        type2: 0
    }, {
        LPtokenName: 'ADA-BNB',
        type: 'PancakeSwap',
        APY: 0,
        TVL: 0,
        Leverage: 3,
        type2: 1
    }, {
        LPtokenName: 'FIL-USDT',
        type: 'MDEX',
        APY: 0,
        TVL: 0,
        Leverage: 3,
        type2: 1
    }, {
        LPtokenName: 'DOT-USDT',
        type: 'MDEX',
        APY: 0,
        TVL: 0,
        Leverage: 3,
        type2: 1
    }, {
        LPtokenName: 'DOT-BNB',
        type: 'PancakeSwap',
        APY: 0,
        TVL: 0,
        Leverage: 3,
        type2: 1
    }, {
        LPtokenName: 'LINK-BNB',
        type: 'PancakeSwap',
        APY: 0,
        TVL: 0,
        Leverage: 3,
        type2: 1
    }, {
        LPtokenName: 'XVS-BNB',
        type: 'PancakeSwap',
        APY: 0,
        TVL: 0,
        Leverage: 3,
        type2: 1
    }, {
        LPtokenName: 'UNI-BNB',
        type: 'PancakeSwap',
        APY: 0,
        TVL: 0,
        Leverage: 3,
        type2: 1
    },
]