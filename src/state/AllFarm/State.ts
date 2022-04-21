import {
    FarmPancakeUSDT_BNB,
    FarmPancakeUSDT_BUSD,
    FarmPancakeBNB_BUSD,
    FarmPancakeETH_BNB,
    FarmPancakeBTCB_BUSD,
    FarmPancakeBTCB_BNB,
    FarmPancakeCAKE_BNB,
    FarmPancakeLINK_BNB,
    FarmPancakeXVS_BNB,
    FarmPancakeDOT_BNB,
    FarmPancakeADA_BNB,
    FarmPancakeUNI_BNB,
    FarmPancakeCAKE_BUSD,
    FarmPancakeUSDT_USDC,
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
    FarmMdexRABBIT_BUSD,
} from "config/LPAddress"


export const initialState = [
    {
        LPtokenName: 'RABBIT-BUSD',
        type: 'MDEX',
        APY: 0,
        TVL: undefined,
        Leverage: 1,
        type2: 1,
        address: 'FarmMdexRABBIT_BUSD',
        New: "NEW",
        Featured: "Featured",
    }, {
        LPtokenName: 'RABBIT-BNB',
        type: 'PancakeSwap',
        APY: 0,
        TVL: undefined,
        Leverage: 1,
        type2: 1,
        New: "NEW",
        Featured: "Featured",
    }, {
        LPtokenName: 'USDC-BUSD',
        type: 'PancakeSwap',
        APY: 0,
        TVL: undefined,
        Leverage: 9,
        type2: 0,
        Ellipsis: "0.04% Fees on Ellipsis"
    }, {
        LPtokenName: 'USDT-USDC',
        type: 'PancakeSwap',
        APY: 0,
        TVL: undefined,
        Leverage: 9,
        type2: 0,
        Ellipsis: "0.04% Fees on Ellipsis"
    }, {
        LPtokenName: 'USDT-BUSD',
        type: 'PancakeSwap',
        APY: 0,
        TVL: undefined,
        Leverage: 9,
        type2: 0,
        Ellipsis: "0.04% Fees on Ellipsis"
    }, {
        LPtokenName: 'DAI-BUSD',
        type: 'PancakeSwap',
        APY: 0,
        TVL: undefined,
        Leverage: 4,
        type2: 0
    }, {
        LPtokenName: 'BNB-BUSD',
        type: 'PancakeSwap',
        APY: 0,
        TVL: undefined,
        Leverage: 3,
        type2: 1
    }, {
        LPtokenName: 'BNB-BUSD',
        type: 'MDEX',
        APY: 0,
        TVL: undefined,
        Leverage: 3,
        type2: 1
    }, {
        LPtokenName: 'USDT-BNB',
        type: 'PancakeSwap',
        APY: 0,
        TVL: undefined,
        Leverage: 3,
        type2: 1,
        address: FarmPancakeUSDT_BNB
    }, {
        LPtokenName: 'USDT-BNB',
        type: 'MDEX',
        APY: 0,
        TVL: undefined,
        Leverage: 3,
        type2: 1
    }, {
        LPtokenName: 'ETH-BNB',
        type: 'MDEX',
        APY: 0,
        TVL: undefined,
        Leverage: 3,
        type2: 1
    }, {
        LPtokenName: 'ETH-BNB',
        type: 'PancakeSwap',
        APY: 0,
        TVL: undefined,
        Leverage: 3,
        type2: 1
    }, {
        LPtokenName: 'ETH-USDT',
        type: 'MDEX',
        APY: 0,
        TVL: undefined,
        Leverage: 3,
        type2: 1
    }, {
        LPtokenName: 'ETH-BTCB',
        type: 'MDEX',
        APY: 0,
        TVL: undefined,
        Leverage: 3,
        type2: 1
    }, {
        LPtokenName: 'BTCB-BNB',
        type: 'MDEX',
        APY: 0,
        TVL: undefined,
        Leverage: 3,
        type2: 1
    }, {
        LPtokenName: 'BTCB-BNB',
        type: 'PancakeSwap',
        APY: 0,
        TVL: undefined,
        Leverage: 3,
        type2: 1
    }, {
        LPtokenName: 'BTCB-USDT',
        type: 'MDEX',
        APY: 0,
        TVL: undefined,
        Leverage: 3,
        type2: 1,
        New_LPtokenName: 'USDT-BTCB',
    }, {
        LPtokenName: 'BTCB-BUSD',
        type: 'PancakeSwap',
        APY: 0,
        TVL: undefined,
        Leverage: 3,
        type2: 1
    }, {
        LPtokenName: 'CAKE-BNB',
        type: 'PancakeSwap',
        APY: 0,
        TVL: undefined,
        Leverage: 3,
        type2: 1
    }, {
        LPtokenName: 'CAKE-BUSD',
        type: 'PancakeSwap',
        APY: 0,
        TVL: undefined,
        Leverage: 3,
        type2: 1
    }, {
        LPtokenName: 'MDX-BUSD',
        type: 'MDEX',
        APY: 0,
        TVL: undefined,
        Leverage: 3,
        type2: 1
    }, {
        LPtokenName: 'VAI-BUSD',
        type: 'PancakeSwap',
        APY: 0,
        TVL: undefined,
        Leverage: 4,
        type2: 0
    }, {
        LPtokenName: 'UST-BUSD',
        type: 'PancakeSwap',
        APY: 0,
        TVL: undefined,
        Leverage: 4,
        type2: 0
    }, {
        LPtokenName: 'TUSD-BUSD',
        type: 'PancakeSwap',
        APY: 0,
        TVL: undefined,
        Leverage: 4,
        type2: 0
    }, {
        LPtokenName: 'ADA-BNB',
        type: 'PancakeSwap',
        APY: 0,
        TVL: undefined,
        Leverage: 3,
        type2: 1
    }, {
        LPtokenName: 'FIL-USDT',
        type: 'MDEX',
        APY: 0,
        TVL: undefined,
        Leverage: 3,
        type2: 1
    }, {
        LPtokenName: 'DOT-USDT',
        type: 'MDEX',
        APY: 0,
        TVL: undefined,
        Leverage: 3,
        type2: 1,
        New_LPtokenName: 'USDT-DOT',
    }, {
        LPtokenName: 'DOT-BNB',
        type: 'PancakeSwap',
        APY: 0,
        TVL: undefined,
        Leverage: 3,
        type2: 1
    }, {
        LPtokenName: 'LINK-BNB',
        type: 'PancakeSwap',
        APY: 0,
        TVL: undefined,
        Leverage: 3,
        type2: 1,
        New_LPtokenName: 'BNB-LINK',
    }, {
        LPtokenName: 'XVS-BNB',
        type: 'PancakeSwap',
        APY: 0,
        TVL: undefined,
        Leverage: 3,
        type2: 1,
        New_LPtokenName: 'BNB-XVS',
    }, {
        LPtokenName: 'UNI-BNB',
        type: 'PancakeSwap',
        APY: 0,
        TVL: undefined,
        Leverage: 3,
        type2: 1,
        New_LPtokenName: 'BNB-UNI',
    },
]