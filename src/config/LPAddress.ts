
/**
 * pancake交易所的route合约
 */
export const PANCAKE_ROUTE = '0x10ED43C718714eb63d5aA57B78B54704E256024E';
/**
 * wBNB和USDT的LP地址
 */
export const WBNB_USDT_LP = '0x16b9a82891338f9bA80E2D6970FddA79D1eb0daE';
/**
 * 开仓合约地址 ，abi也是对应的开仓abi
 */
export const KAICANG = '0x94c89FBa4B3E988656e4c0bbbB083Ff5d06B809C'


/**
 * FarmPancakeUSDT_BNB所需合约对象
 */
export const FarmPancakeUSDT_BNB = {
    BNB_ADDRESS: '0x0000000000000000000000000000000000000000',
    USDT_BNB_LP: '0x16b9a82891338f9bA80E2D6970FddA79D1eb0daE',
    BNBADDRES: '0x4ace4032a18Cb8a194470eDf00fAeaf0A25C41cB',
    PancakeUSDT_BNB_WBNBtoken: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
    PancakeUSDT_BNB_USDTtoken: '0x55d398326f99059fF775485246999027B3197955',
    PancakeUSDT_BNBdebtToken: '0xd6db7b574F0f29C2C2Bd31D659E517A0799fcE6B',
    PancakeUSDT_BNBPancakeGoblin: '0x6c4Eb13d0A6A88e4D18C02992C4bA047b6a13bD0',
    PancakeUSDT_BNBFarmPancakeReinvestStrat: '0x2b7Ee480ffad7D9079A12640F60421d4bea035e3',
    PancakeUSDT_BNBAddTwoStrategyAddr: '0x12Df61e4888ed73D26033898a7540829bf08931d',
    PancakeUSDT_BNBFarmPancakeLiqStrat: '0x20960Abb669c780a697253B55A7Fe8478e48A489',
    PancakeUSDT_BNBWithdrawStrategyAddr: '0x8079339bC13C5ACCEc508df422dE9D3836C8fBE8',
    LP:'0x16b9a82891338f9bA80E2D6970FddA79D1eb0daE',
    // ------------------_FairLaunch DebtToken_Pid --------------------
    debtPancakeBNB_BUSD_FairLaunchPid: 8,
    // ------------------_FairLaunch DebtToken_Pid --------------------
    PancakeBNB_BUSD_BorrowToken0: { name: 'USDT', _Pid: 132 },
    PancakeBNB_BUSD_BorrowToken1: { name: 'BNB', _Pid: 133 }
}


export const FarmPancakeUSDT_BUSD = {
    PancakeUSDT_BUSDdebtToken: '0x5C1cAb77E95a9F18Ebf2DC2581366123f2cfd549', //lp对应的债务tken
    PancakeUSDT_BUSDPancakeGoblin: '0x92aE1b543D59aE30F999eb6490A895e11E9882b5', //开仓合约
    PancakeUSDT_BUSDFarmPancakeReinvestStrat: '0x2b7Ee480ffad7D9079A12640F60421d4bea035e3',
    PancakeUSDT_BUSDFarmPancakeLiqStrat: '0xE0D7877EEC30Db9a1D1aD4CC0A3c413774d7c781',
    PancakeUSDT_BUSDAddTwoStrategyAddr: '0x1cEF6A51a951246D2943800e472B9F35e57E2E6d',//开仓策略地址
    PancakeUSDT_BUSDWithdrawStrategyAddr: '0x3F365b0C749B41359B27FDE462772219d999C5b2',//平仓地址
    LP:'0x7EFaEf62fDdCCa950418312c6C91Aef321375A00',
    debtPancakeBUSD_USDT_FairLaunchPid: 6, //债务token存在挖矿合约的id
    // ------------------_FairLaunch DebtToken_Pid --------------------
    PancakeUSDT_BUSD_BorrowToken0: { name: 'USDT', _Pid: 128 }, //对应银行借款id
    PancakeUSDT_BUSD_BorrowToken1: { name: 'BUSD', _Pid: 129 } //对应银行借款id
}

export const FarmPancakeBNBBUSD = {
    PancakeBNB_BUSDdebtToken: '0xA5cd68b3F3a82e858ceaF6738C1f62d0FB0c9e17',
    PancakeBNB_BUSDPancakeGoblin: '0xA7CA19be60e2422BF60a385612e752E132333581',
    PancakeBNB_BUSDFarmPancakeLiqStrat: '0x20960Abb669c780a697253B55A7Fe8478e48A489',
    PancakeBNB_BUSDFarmPancakeReinvestStrat: '0x2b7Ee480ffad7D9079A12640F60421d4bea035e3',
    PancakeBNB_BUSDAddTwoStrategyAddr: '0xFbf731119d31B9FFC6f3fafa7E3EAd911d73433c',
    PancakeBNB_BUSDWithdrawStrategyAddr: '0x8079339bC13C5ACCEc508df422dE9D3836C8fBE8',
    LP:'0x58F876857a02D6762E0101bb5C46A8c1ED44Dc16',
    // ------------------_FairLaunch DebtToken_Pid --------------------
    debtPancakeBNB_BUSD_FairLaunchPid: 7,
    // ------------------_FairLaunch DebtToken_Pid --------------------
    PancakeBNB_BUSD_BorrowToken0: { name: 'BNB', _Pid: 130 },
    PancakeBNB_BUSD_BorrowToken1: { name: 'BUSD', _Pid: 131 }
}

export const FarmPancakeETH_BNB = {
    PancakeETH_BNBdebtToken: '0xDD23C084045b1a52d6DaceCdFD53fA0e8BfC5d76',
    PancakeETH_BNBPancakeGoblin: '0x00E7295Cc0e68AdFeec7C69039656201b77aC9D4',
    PancakeETH_BNBFarmPancakeLiqStrat: '0x20960Abb669c780a697253B55A7Fe8478e48A489',
    PancakeETH_BNBFarmPancakeReinvestStrat: '0x2b7Ee480ffad7D9079A12640F60421d4bea035e3',
    PancakeETH_BNBAddTwoStrategyAddr: '0xF3Dd75Fb470198392bb14A49F1a4Df98449916C7',
    PancakeETH_BNBWithdrawStrategyAddr: '0x8079339bC13C5ACCEc508df422dE9D3836C8fBE8',
    LP:'0x74E4716E431f45807DCF19f284c7aA99F18a4fbc',
    // ------------------_FairLaunch DebtToken_Pid --------------------
    debtPancakeETH_BNB_FairLaunchPid: 9,
    // ------------------_FairLaunch DebtToken_Pid --------------------
    PancakeETH_BNB_BorrowToken0: { name: 'ETH', _Pid: 134 },
    PancakeETH_BNB_BorrowToken1: { name: 'BNB', _Pid: 135 }
}

export const FarmPancakeBTCB_BUSD = {
    PancakeBTCB_BUSDdebtToken: '0xc31638025DEC9A9f3ee1382717f53BE2fD48AE4b',
    PancakeBTCB_BUSDPancakeGoblin: '0x0404cF4294e6Bd4289DFA24974402C3f1166ca56',
    PancakeBTCB_BUSDFarmPancakeReinvestStrat: '0x2b7Ee480ffad7D9079A12640F60421d4bea035e3',
    PancakeBTCB_BUSDFarmPancakeLiqStrat: '0x20960Abb669c780a697253B55A7Fe8478e48A489',
    PancakeBTCB_BUSDAddTwoStrategyAddr: '0xa2D0D08E08823b978232611EB54795608d92362b',
    PancakeBTCB_BUSDWithdrawStrategyAddr: '0x8079339bC13C5ACCEc508df422dE9D3836C8fBE8',
    LP:'0xF45cd219aEF8618A92BAa7aD848364a158a24F33',
    // ------------------_FairLaunch DebtToken_Pid --------------------
    debtPancakeBTCB_BUSD_FairLaunchPid: 10,
    // ------------------ Bank Borrow_Pid --------------------
    PancakeBTCB_BUSD_BorrowToken0: { name: 'BTCB', _Pid: 136 },
    PancakeBTCB_BUSD_BorrowToken1: { name: 'BUSD', _Pid: 137 }
}


export const FarmPancakeBTCB_BNB = {
    PancakeBTCB_BNBdebtToken: '0x261E41Eb27e6396c9B06de128fc1833d42Ea9c6B',
    PancakeBTCB_BNBPancakeGoblin: '0xA67D61a1e12161a56ba9aF6054300C3296b3C6Ef',
    PancakeBTCB_BNBFarmPancakeReinvestStrat: '0x2b7Ee480ffad7D9079A12640F60421d4bea035e3',
    PancakeBTCB_BNBFarmPancakeLiqStrat: '0x20960Abb669c780a697253B55A7Fe8478e48A489',
    PancakeBTCB_BNBAddTwoStrategyAddr: '0xA7eED1d7BCd39E7d2F57851C3525634a7c5C2cf9',
    PancakeBTCB_BNBWithdrawStrategyAddr: '0x8079339bC13C5ACCEc508df422dE9D3836C8fBE8',
    LP:'0x61EB789d75A95CAa3fF50ed7E47b96c132fEc082',
    // ------------------_FairLaunch DebtToken_Pid --------------------
    debtPancakeBTCB_BNB_FairLaunchPid: 11,
    // ------------------ Bank Borrow_Pid --------------------
    PancakeBTCB_BNB_BorrowToken0: { name: 'BTCB', _Pid: 138 },
    PancakeBTCB_BNB_BorrowToken1: { name: 'BNB', _Pid: 139 }
}

// --------------------------------------- ------------------------------------------

export const FarmPancakeCAKE_BNB = {
    PancakeCAKE_BNBdebtToken: '0xF902feFAeaeF32596E3895078bfc834Fb4210bcE',
    PancakeCAKE_BNBPancakeGoblin: '0x37ce37088B1D84786864c3856f9660B0Ddc835B0',
    PancakeCAKE_BNBFarmPancakeReinvestStrat: '0x2b7Ee480ffad7D9079A12640F60421d4bea035e3',
    PancakeCAKE_BNBFarmPancakeLiqStrat: '0x20960Abb669c780a697253B55A7Fe8478e48A489',
    PancakeCAKE_BNBAddTwoStrategyAddr: '0x70c18D9990942D8cE01c1054e33DC65e3f6928a7',
    PancakeCAKE_BNBWithdrawStrategyAddr: '0x8079339bC13C5ACCEc508df422dE9D3836C8fBE8',
    LP:'0x0eD7e52944161450477ee417DE9Cd3a859b14fD0',
    // ------------------_FairLaunch DebtToken_Pid --------------------
    debtPancakeCAKE_BNB_FairLaunchPid: 12,
    //------------------Bank Borrow_Pid--------------------
    PancakeCAKE_BNB_BorrowToken1: { name: 'BNB', _Pid: 140 }
}


export const FarmPancakeBNB_LINK = {
    PancakeBNB_LINKdebtToken: '0xA31fe9059F54562132C00D812829165695DB02bD',
    PancakeBNB_LINKPancakeGoblin: '0x592081857B7bC5E0E8c533A93755b26A21b0e00a',
    PancakeBNB_LINKFarmPancakeLiqStrat: '0x20960Abb669c780a697253B55A7Fe8478e48A489',
    PancakeBNB_LINKFarmPancakeReinvestStrat: '0x2b7Ee480ffad7D9079A12640F60421d4bea035e3',
    PancakeBNB_LINKAddTwoStrategyAddr: '0x3d5bF120b8ccA2946D8d409070DaF653430203d1',
    PancakeBNB_LINKWithdrawStrategyAddr: '0x8079339bC13C5ACCEc508df422dE9D3836C8fBE8',
    LP:'0x824eb9faDFb377394430d2744fa7C42916DE3eCe',
    // ------------------_FairLaunch DebtToken_Pid --------------------
    debtPancakeBNB_LINK_FairLaunchPid: 13,
    // ------------------ Bank Borrow_Pid --------------------
    PancakeBNB_LINK_BorrowToken0: { name: 'BNB', _Pid: 141 }
}

export const FarmPancakeBNB_XVS = {
    PancakeBNB_XVSdebtToken: '0x99a97a3DBA557C2cfa6eF444bB043024D00845a4',
    PancakeBNB_XVSPancakeGoblin: '0x288D67a11c38fEee3B4A30c07936C19346bde428',
    PancakeBNB_XVSFarmPancakeReinvestStrat: '0x2b7Ee480ffad7D9079A12640F60421d4bea035e3',
    PancakeBNB_XVSFarmPancakeLiqStrat: '0x20960Abb669c780a697253B55A7Fe8478e48A489',
    PancakeBNB_XVSAddTwoStrategyAddr: '0xb5f37a71dd20237F54781E97217b9CD4fF52E5b7',
    PancakeBNB_XVSWithdrawStrategyAddr: '0x8079339bC13C5ACCEc508df422dE9D3836C8fBE8',
    LP:'0x7EB5D86FD78f3852a3e0e064f2842d45a3dB6EA2',
    // ------------------_FairLaunch DebtToken_Pid --------------------
    debtPancakeBNB_XVS_FairLaunchPid: 14,
    // ------------------ Bank Borrow_Pid --------------------
    PancakeBNB_XVS_BorrowToken0: { name: 'BNB', _Pid: 142 }
}

export const FarmPancakeDOT_BNB = {
    PancakeDOT_BNBdebtToken: '0x7A4aB5c9b59869A5124bFC0C7e57fdD6a998F342',
    PancakeDOT_BNBPancakeGoblin: '0xa7De761a606101F55DF7241991ECCE867869B4A4',
    PancakeDOT_BNBFarmPancakeReinvestStrat: '0x2b7Ee480ffad7D9079A12640F60421d4bea035e3',
    PancakeDOT_BNBFarmPancakeLiqStrat: '0x20960Abb669c780a697253B55A7Fe8478e48A489',
    PancakeDOT_BNBAddTwoStrategyAddr: '0x0533b11E4d5F45cef52FaD4744aC4c374c0770Ce',
    PancakeDOT_BNBWithdrawStrategyAddr: '0x8079339bC13C5ACCEc508df422dE9D3836C8fBE8',
    LP:'0xDd5bAd8f8b360d76d12FdA230F8BAF42fe0022CF',
    // ------------------_FairLaunch DebtToken_Pid --------------------
    debtPancakeDOT_BNB_FairLaunch_Pid: 15,
    // ------------------ Bank Borrow_Pid --------------------
    PancakeDOT_BNB_BorrowToken1: { name: 'BNB', _Pid: 143 }
}


export const FarmPancakeADA_BNB = {
    PancakeADA_BNBdebtToken: '0x3D8e505Cf09fCa3814980BE89A39F2B48fB040B1',
    PancakeADA_BNBPancakeGoblin: '0xc991242e925c94B56C0F483Bd9Aaa62A97b84cfA',
    PancakeADA_BNBFarmPancakeLiqStrat: '0x20960Abb669c780a697253B55A7Fe8478e48A489',
    PancakeADA_BNBFarmPancakeReinvestStrat: '0x2b7Ee480ffad7D9079A12640F60421d4bea035e3',
    PancakeADA_BNBAddTwoStrategyAddr: '0xf2D7EBb4de9fC051245691913Cf3c9083C171926',
    PancakeADA_BNBWithdrawStrategyAddr: '0x8079339bC13C5ACCEc508df422dE9D3836C8fBE8',
    LP:'0x28415ff2C35b65B9E5c7de82126b4015ab9d031F',
    // ------------------_FairLaunch DebtToken_Pid --------------------
    debtPancakeADA_BNB_FairLaunch_Pid: 16,
    // ------------------ Bank Borrow_Pid --------------------
    PancakeADA_BNB_BorrowToken1: { name: 'BNB', _Pid: 144 }
}


export const FarmPancakeBNB_UNI = {
    PancakeBNB_UNIdebtToken: '0xE2190efB3BdBE07b0C1c55c69867D3cB595661bF',
    PancakeBNB_UNIPancakeGoblin: '0x3a58406bdBc32b3EAAfFC971AFC485185cC78D9F',
    PancakeBNB_UNIFarmPancakeReinvestStrat: '0x2b7Ee480ffad7D9079A12640F60421d4bea035e3',
    PancakeBNB_UNIFarmPancakeLiqStrat: '0x20960Abb669c780a697253B55A7Fe8478e48A489',
    PancakeBNB_UNIAddTwoStrategyAddr: '0x4630C513b344A79496F4335Ac49f58C1dC913a84',
    PancakeBNB_UNIWithdrawStrategyAddr: '0x8079339bC13C5ACCEc508df422dE9D3836C8fBE8',
    LP:'0x014608E87AF97a054C9a49f81E1473076D51d9a3',
    // ------------------_FairLaunch DebtToken_Pid --------------------
    debtPancakeBNB_UNI_FairLaunch_Pid: 17,
    // ------------------ Bank Borrow_Pid --------------------
    PancakeBNB_UNI_BorrowToken0: { name: 'BNB', _Pid: 145 }
}


export const FarmPancakeCAKE_BUSD = {
    PancakeCAKE_BUSDdebtToken: '0xacB29A85f1283bF6217F70507B148adE984B5465',
    PancakeCAKE_BUSDPancakeGoblin: '0xCa00524c55703C057632c7fCb914a7C64E139505',
    PancakeCAKE_BUSDFarmPancakeLiqStrat: '0x20960Abb669c780a697253B55A7Fe8478e48A489',
    PancakeCAKE_BUSDWithdrawStrategyAddr: '0x8079339bC13C5ACCEc508df422dE9D3836C8fBE8',
    PancakeCAKE_BUSDAddTwoStrategyAddr: '0x4f17667B1079649958e340b664Bee4939Ea45AEC',
    PancakeCAKE_BUSDFarmPancakeReinvestStrat: '0x2b7Ee480ffad7D9079A12640F60421d4bea035e3',
    LP:'0x804678fa97d91B974ec2af3c843270886528a9E6',
    // ------------------_FairLaunch DebtToken_Pid --------------------
    debtPancakeCAKE_BUSD_FairLaunch_Pid: 18,
    // ------------------ Bank Borrow_Pid --------------------
    PancakeCAKE_BUSD_BorrowToken1: { name: 'BUSD', _Pid: 146 }
}


export const FarmPancakeUSDC_USDT = {
    PancakeUSDC_USDTdebtToken: '0x1FA76EcefCe86CBBdf442571Bf76D11CBd1ffA4F',
    PancakeUSDC_USDTPancakeGoblin: '0x028C44b049aD2A46B743FA65Ff51BCF427BcF780',
    PancakeUSDC_USDTFarmPancakeLiqStrat: '0xE0D7877EEC30Db9a1D1aD4CC0A3c413774d7c781',
    PancakeUSDC_USDTFarmPancakeReinvestStrat: '0x2b7Ee480ffad7D9079A12640F60421d4bea035e3',
    PancakeUSDC_USDTAddTwoStrategyAddr: '0x595A02FA4952E5803A07ba3B7d717A1e5a04be9a',
    PancakeUSDC_USDTWithdrawStrategyAddr: '0x3F365b0C749B41359B27FDE462772219d999C5b2',
    LP:'0xEc6557348085Aa57C72514D67070dC863C0a5A8c',
    // ------------------_FairLaunch DebtToken_Pid --------------------
    debtPancakeUSDC_USDT_FairLaunch_Pid: 19,
    // ------------------ Bank Borrow_Pid --------------------
    PancakeUSDC_USDT_BorrowToken1: { name: 'USDT', _Pid: 147 }
}


export const FarmPancakeUSDC_BUSD = {
    PancakeUSDC_BUSDdebtToken: '0x466F586903D94fFC2D7728DE4d65C50A462Af7Ec',
    PancakeUSDC_BUSDPancakeGoblin: '0xac988E0Cf82E28595C5973835f3429fd72515E42',
    PancakeUSDC_BUSDFarmPancakeLiqStrat: '0xE0D7877EEC30Db9a1D1aD4CC0A3c413774d7c781',
    PancakeUSDC_BUSDFarmPancakeReinvestStrat: '0x2b7Ee480ffad7D9079A12640F60421d4bea035e3',
    PancakeUSDC_BUSDAddTwoStrategyAddr: '0xb32861e4709922d65F43cD7e78C73878081d0E6d',
    PancakeUSDC_BUSDWithdrawStrategyAddr: '0x3F365b0C749B41359B27FDE462772219d999C5b2',
    LP:'0x2354ef4DF11afacb85a5C7f98B624072ECcddbB1',
    // ------------------_FairLaunch DebtToken_Pid --------------------
    debtPancakeUSDC_BUSD_FairLaunch_Pid: 20,
    // ------------------ Bank Borrow_Pid --------------------
    PancakeUSDC_BUSD_BorrowToken1: { name: 'BUSD', _Pid: 148 }
}


export const FarmPancakeDAI_BUSD = {
    PancakeDAI_BUSDdebtToken: '0xa14533c63D0b6C278172E92900E67Da23F795cdD',
    PancakeDAI_BUSDPancakeGoblin: '0x3378b8c59a7b6328ade3F7b6bFcE8cCbf198086A',
    PancakeDAI_BUSDFarmPancakeReinvestStrat: '0x2b7Ee480ffad7D9079A12640F60421d4bea035e3',
    PancakeDAI_BUSDFarmPancakeLiqStrat: '0x20960Abb669c780a697253B55A7Fe8478e48A489',
    PancakeDAI_BUSDAddTwoStrategyAddr: '0xbf4015fBad2037C84e7B5c1F120Fb5d359A2f80f',
    PancakeDAI_BUSDWithdrawStrategyAddr: '0x8079339bC13C5ACCEc508df422dE9D3836C8fBE8',
    LP:'0x66FDB2eCCfB58cF098eaa419e5EfDe841368e489',
    // ------------------_FairLaunch DebtToken_Pid --------------------
    debtPancakeDAI_BUSD_FairLaunch_Pid: 21,
    // ------------------ Bank Borrow_Pid --------------------
    PancakeDAI_BUSD_BorrowToken1: { name: 'BUSD', _Pid: 149 }
}


export const FarmPancakeTUSD_BUSD = {
    PancakeTUSD_BUSDdebtToken: '0x7acc6f35eE91438d79196fBaedAdE0F0364Df6cc',
    PancakeTUSD_BUSDPancakeGoblin: '0x99a8578dB15F86c4087C7375268342f71cD3a2DA',
    PancakeTUSD_BUSDFarmPancakeReinvestStrat: '0x2b7Ee480ffad7D9079A12640F60421d4bea035e3',
    PancakeTUSD_BUSDFarmPancakeLiqStrat: '0x20960Abb669c780a697253B55A7Fe8478e48A489',
    PancakeTUSD_BUSDWithdrawStrategyAddr: '0x8079339bC13C5ACCEc508df422dE9D3836C8fBE8',
    PancakeTUSD_BUSDAddTwoStrategyAddr: '0x0A754686D49A253590C327C25680B1E70D0f82EA',
    LP:'0x2E28b9B74D6d99D4697e913b82B41ef1CAC51c6C',
    // ------------------_FairLaunch DebtToken_Pid --------------------
    debtPancakeTUSD_BUSD_FairLaunch_Pid: 22,
    // ------------------ Bank Borrow_Pid --------------------
    PancakeTUSD_BUSD_BorrowToken1: { name: 'BUSD', _Pid: 150 }
}

export const FarmPancakeUST_BUSD = {
    PancakeUST_BUSDdebtToken: '0x645c306a15cD29560a2EEBB689aF7918B760911A',
    PancakeUST_BUSDPancakeGoblin: '0x6ff7daa1a40146E9132CE2DbCE5a35EF3A840A06',
    PancakeUST_BUSDFarmPancakeLiqStrat: '0x20960Abb669c780a697253B55A7Fe8478e48A489',
    PancakeUST_BUSDAddTwoStrategyAddr: '0xf786651C8B9d23406848531814b5A0aB844734ab',
    PancakeUST_BUSDFarmPancakeReinvestStrat: '0x2b7Ee480ffad7D9079A12640F60421d4bea035e3',
    PancakeUST_BUSDWithdrawStrategyAddr: '0x8079339bC13C5ACCEc508df422dE9D3836C8fBE8',
    LP:'0x05faf555522Fa3F93959F86B41A3808666093210',
    // ------------------_FairLaunch DebtToken_Pid --------------------
    debtPancakeUST_BUSD_FairLaunch_Pid: 23,
    // ------------------ Bank Borrow_Pid --------------------
    PancakeUST_BUSD_BorrowToken1: { name: 'BUSD', _Pid: 151 }
}


export const FarmPancakeVAI_BUSD = {
    PancakeVAI_BUSDdebtToken: '0xBF21fE7d4008936474e92cf455Dfbd99cB2Cc3bf',
    PancakeVAI_BUSDPancakeGoblin: '0x55786573875F1Dd45FEfB741762B9D163fAd3516',
    PancakeVAI_BUSDFarmPancakeReinvestStrat: '0x2b7Ee480ffad7D9079A12640F60421d4bea035e3',
    PancakeVAI_BUSDFarmPancakeLiqStrat: '0x20960Abb669c780a697253B55A7Fe8478e48A489',
    PancakeVAI_BUSDAddTwoStrategyAddr: '0xd8997AA8c32c48c052dcf1D12B2020082FB527FF',
    PancakeVAI_BUSDWithdrawStrategyAddr: '0x8079339bC13C5ACCEc508df422dE9D3836C8fBE8',
    LP:'0x133ee93FE93320e1182923E1a640912eDE17C90C',
    // ------------------_FairLaunch DebtToken_Pid --------------------
    debtPancakeVAI_BUSD_FairLaunch_Pid: 24,
    // ------------------ Bank Borrow_Pid --------------------
    PancakeVAI_BUSD_BorrowToken1: { name: 'BUSD', _Pid: 152 }
}


export const FarmPancakeRABBIT_BNB = {
    PancakeRABBIT_BNBdebtToken: '0x778A827fEFc74850fC0a8a4E44792D8Ec4D6cAeA',
    PancakeRABBIT_BNBPancakeGoblin: '0x912977ff20b641B37C2E0185fA4b02803601a3a3',
    PancakeRABBIT_BNBFarmPancakeReinvestStrat: '0x2b7Ee480ffad7D9079A12640F60421d4bea035e3',
    PancakeRABBIT_BNBFarmPancakeLiqStrat: '0x20960Abb669c780a697253B55A7Fe8478e48A489',
    PancakeRABBIT_BNBAddTwoStrategyAddr: '0x435ad779f739f91b4e0906e28fC2b46f029b2EaC',
    PancakeRABBIT_BNBWithdrawStrategyAddr: '0x8079339bC13C5ACCEc508df422dE9D3836C8fBE8',
    LP:'0x04b56A5B3f45CFeaFbfDCFc999c14be5434f2146',
    // ------------------_FairLaunch DebtToken_Pid --------------------
    debtPancakeRABBIT_BNB_FairLaunch_Pid: 25,
    // ------------------ Bank Borrow_Pid --------------------
    PancakeRABBIT_BNB_BorrowToken1: { name: 'BNB', _Pid: 153 }
}


export const FarmMdexBNB_BUSD = {
    MdexBNB_BUSDdebtToken: '0xEF4A4990105Da3E423aFe1Ed45c53AF81F4Be5bd',
    MdexBNB_BUSDMdxGoblin: '0x4e07250388ED8156911Db11Dea00e2Ebbb0eC48C',
    MdexBNB_BUSDFarmMdxLiqStrat: '0xBf71c53F6be53B846f44B14Ef54bcC60a397af76',
    MdexBNB_BUSDAddTwoStrategyAddr: '0x3980E0FBe69Cb9331b1659f0A34806796FcbDEb3',
    MdexBNB_BUSDWithdrawStrategyAddr: '0xEe5687397C00fBDAb702C0609b4FC4ff211193D5',
    LP:'0x340192D37d95fB609874B1db6145ED26d1e47744',
    // -----------------_FairLaunch DebtToken_Pid --------------------
    debtMdexBNB_BUSD_FairLaunch_Pid: 26,
    // ------------------ Bank Borrow_Pid --------------------
    MdexBNB_BUSD_BorrowToken0: { name: 'BNB', _Pid: 154 },
    MdexBNB_BUSD_BorrowToken1: { name: 'BUSD', _Pid: 155 }
}


export const FarmMdexUSDT_BNB = {
    MdexUSDT_BNBdebtToken: '0x13243c949cDe0f6a2b24ccE947D78f3A9A0f306e',
    MdexUSDT_BNBMdxGoblin: '0x1A49705aBFF34BCDFED5bF56f89b416EA768d856',
    MdexUSDT_BNBFarmMdxLiqStrat: '0xBf71c53F6be53B846f44B14Ef54bcC60a397af76',
    MdexUSDT_BNBAddTwoStrategyAddr: '0x8454786C4168a792914c9fFd17a661C5515E7Cc8',
    MdexUSDT_BNBWithdrawStrategyAddr: '0xEe5687397C00fBDAb702C0609b4FC4ff211193D5',
    LP:'0x09CB618bf5eF305FadfD2C8fc0C26EeCf8c6D5fd',
    // -----------------_FairLaunch DebtToken_Pid --------------------
    debtMdexUSDT_BNB_FairLaunch_Pid: 27,
    // ------------------ Bank Borrow_Pid --------------------
    MdexUSDT_BNB_BorrowToken0: { name: 'USDT', _Pid: 156 },
    MdexUSDT_BNB_BorrowToken1: { name: 'BNB', _Pid: 157 }
}


export const FarmMdexETH_BNB = {
    MdexETH_BNBdebtToken: '0xd42E60a2f24657E151866873Aff4BD945Ff897D8',
    MdexETH_BNBMdxGoblin: '0x48f6AFA01Ed9C41Be8ad985eE177f3277E14B1cf',
    MdexETH_BNBFarmMdxLiqStrat: '0xBf71c53F6be53B846f44B14Ef54bcC60a397af76',
    MdexETH_BNBAddTwoStrategyAddr: '0x049Ed364c6EAe2145e08dC1b73caE0e342EC2C67',
    MdexETH_BNBWithdrawStrategyAddr: '0xEe5687397C00fBDAb702C0609b4FC4ff211193D5',
    LP:'0x82E8F9e7624fA038DfF4a39960F5197A43fa76aa',
    // -----------------_FairLaunch DebtToken_Pid --------------------
    debtMdexETH_BNB_FairLaunch_Pid: 28,
    // ------------------ Bank Borrow_Pid --------------------
    MdexETH_BNB_BorrowToken0: { name: 'ETH', _Pid: 158 },
    MdexETH_BNB_BorrowToken1: { name: 'BNB', _Pid: 159 }
}


export const FarmMdexBTCB_BNB = {
    MdexBTCB_BNBdebtToken: '0x193ad3a24c9dFaB79b3097A0a6C00E7d227b349c',
    MdexBTCB_BNBMdxGoblin: '0xf6ADB924213C78Cfab7B8f9ca21489e15E9410C2',
    MdexBTCB_BNBFarmMdxLiqStrat: '0xBf71c53F6be53B846f44B14Ef54bcC60a397af76',
    MdexBTCB_BNBAddTwoStrategyAddr: '0xCb061D2fd73a2C28408A20c82be4D39764D36B04',
    MdexBTCB_BNBWithdrawStrategyAddr: '0xEe5687397C00fBDAb702C0609b4FC4ff211193D5',
    LP:'0x969f2556F786a576F32AeF6c1D6618f0221Ec70e',
    // -----------------_FairLaunch DebtToken_Pid --------------------
    debtMdexBTCB_BNB_FairLaunch_Pid: 29,
    // ------------------ Bank Borrow_Pid --------------------
    MdexBTCB_BNB_BorrowToken0: { name: 'BTCB', _Pid: 160 },
    MdexBTCB_BNB_BorrowToken1: { name: 'BNB', _Pid: 161 }
}


export const FarmMdexBTCB_USDT = {
    MdexBTCB_USDTdebtToken: '0xF1cc2217e77b23f178E3b389De3B89E70EEa315a',
    MdexBTCB_USDTMdxGoblin: '0xCf2ac9f8CF72F4908357376158b21Dfe00B0ace5',
    MdexBTCB_USDTAddTwoStrategyAddr: '0xBB90F5F9e13BbC5d70eE5430822fA740a2e73e04',
    MdexBTCB_USDTFarmMdxLiqStrat: '0xBf71c53F6be53B846f44B14Ef54bcC60a397af76',
    MdexBTCB_USDTWithdrawStrategyAddr: '0xEe5687397C00fBDAb702C0609b4FC4ff211193D5',
    LP:'0xda28Eb7ABa389C1Ea226A420bCE04Cb565Aafb85',
    // -----------------_FairLaunch DebtToken_Pid --------------------
    debtMdexBTCB_USDT_FairLaunch_Pid: 30,
    // ------------------ Bank Borrow_Pid --------------------
    MdexBTCB_USDT_BorrowToken0: { name: 'BTCB', _Pid: 162 },
    MdexBTCB_USDT_BorrowToken1: { name: 'USDT', _Pid: 163 }
}


export const FarmMdexETH_USDT = {
    MdexETH_USDTdebtToken: '0xF7297B205C7D368657fb2e0005991fd66E35044B',
    MdexETH_USDTMdxGoblin: '0xB35148aB8d675C45B86F20EBFB151b9Fc4eF63ae',
    MdexETH_USDTAddTwoStrategyAddr: '0x0bd721f356c956802172A6AEcF3eb57f19C74B7e',
    MdexETH_USDTFarmMdxLiqStrat: '0xBf71c53F6be53B846f44B14Ef54bcC60a397af76',
    MdexETH_USDTWithdrawStrategyAddr: '0xEe5687397C00fBDAb702C0609b4FC4ff211193D5',
    LP:'0x0FB881c078434b1C0E4d0B64d8c64d12078b7Ce2',
    // -----------------_FairLaunch DebtToken_Pid --------------------
    debtMdexETH_USDT_FairLaunch_Pid: 31,
    // ------------------ Bank Borrow_Pid --------------------
    MdexETH_USDT_BorrowToken0: { name: 'ETH', _Pid: 164 },
    MdexETH_USDT_BorrowToken1: { name: 'USDT', _Pid: 165 }
}


export const FarmMdexETH_BTCB = {
    MdexETH_BTCBdebtToken: '0x59a56178247dE8936323ba75A0515A7cfA26c28F',
    MdexETH_BTCBMdxGoblin: '0xbb0b4f98E20DB9c202fA412Ab84c904bF4F07e1C',
    MdexETH_BTCBFarmMdxLiqStrat: '0xBf71c53F6be53B846f44B14Ef54bcC60a397af76',
    MdexETH_BTCBAddTwoStrategyAddr: '0xdE9588A446A0Cf4949bAf24ea0b507140f4CCc6B',
    MdexETH_BTCBWithdrawStrategyAddr: '0xEe5687397C00fBDAb702C0609b4FC4ff211193D5',
    LP:'0x577d005912C49B1679B4c21E334FdB650E92C077',
    // -----------------_FairLaunch DebtToken_Pid --------------------
    debtMdexETH_BTCB_FairLaunch_Pid: 32,
    // ------------------ Bank Borrow_Pid --------------------
    MdexETH_BTCB_BorrowToken0: { name: 'ETH', _Pid: 166 },
    MdexETH_BTCB_BorrowToken1: { name: 'BTCB', _Pid: 167 }
}


export const FarmMdexMDX_BUSD = {
    MdexMDX_BUSDdebtToken: '0xeB7626Fe01C425E3b9aa35FDa71321029B01B6b9',
    MdexMDX_BUSDMdxGoblin: '0xE026B019d8CFc57eB8eF0cf5778bdB5a5f290505',
    MdexMDX_BUSDFarmMdxLiqStrat: '0xBf71c53F6be53B846f44B14Ef54bcC60a397af76',
    MdexMDX_BUSDAddTwoStrategyAddr: '0x47E3F33CEc2C25bdfd8db65150ee7E46b401BA65',
    MdexMDX_BUSDWithdrawStrategyAddr: '0xEe5687397C00fBDAb702C0609b4FC4ff211193D5',
    LP:'0x223740a259E461aBeE12D84A9FFF5Da69Ff071dD',
    // -----------------_FairLaunch DebtToken_Pid --------------------
    debtMdexMDX_BUSD_FairLaunch_Pid: 33,
    // ------------------ Bank Borrow_Pid --------------------
    MdexMDX_BUSD_BorrowToken1: { name: 'BUSD', _Pid: 168 }
}


export const FarmMdexFIL_USDT = {
    MdexFIL_USDTdebtToken: '0xe53bB24C614504229E34C0AD9EE22006A07f2F5F',
    MdexFIL_USDTMdxGoblin: '0x31Fa58e5007BA827de0dc0C3c839C96a5a413414',
    MdexFIL_USDTAddTwoStrategyAddr: '0x7e3577BCCaE88fb424e4d15E978218f5319feE15',
    MdexFIL_USDTFarmMdxLiqStrat: '0xBf71c53F6be53B846f44B14Ef54bcC60a397af76',
    MdexFIL_USDTWithdrawStrategyAddr: '0xEe5687397C00fBDAb702C0609b4FC4ff211193D5',
    LP:'0xCAABda10a3ac99Fc15f5B636Aa18E6B4Fd8db16D',
    // -----------------_FairLaunch DebtToken_Pid --------------------
    debtMdexFIL_USDT_FairLaunch_Pid: 34,
    // ------------------ Bank Borrow_Pid --------------------
    MdexFIL_USDT_BorrowToken1: { name: 'USDT', _Pid: 169 }
}


export const FarmMdexDOT_USDT = {
    MdexDOT_USDTdebtToken: '0x1dFD3D2a7E1b245F5393c086c690bE98C6A1aEcE',
    MdexDOT_USDTMdxGoblin: '0xeAbA73300b04fB2e40cA7c78ab5920068B6f1D5C',
    MdexDOT_USDTFarmMdxLiqStrat: '0xBf71c53F6be53B846f44B14Ef54bcC60a397af76',
    MdexDOT_USDTAddTwoStrategyAddr: '0xaF09A0Fa2f78D9dc67313dB99315105649BF46C6',
    MdexDOT_USDTWithdrawStrategyAddr: '0xEe5687397C00fBDAb702C0609b4FC4ff211193D5',
    LP:'0xFf44e10662E1CD4f7AfE399144636c74B0D05D80',
    // -----------------_FairLaunch DebtToken_Pid --------------------
    debtMdexDOT_USDT_FairLaunch_Pid: 35,
    // ------------------ Bank Borrow_Pid --------------------
    MdexDOT_USDT_BorrowToken1: { name: 'USDT', _Pid: 170 }
}

export const FarmMdexRABBITBUSD = {
    MdexRABBIT_BUSDdebtToken: '0x0a7040471deB4fAb1aBB29ceaa6AB120FF9FBD90',
    MdexRABBIT_BUSDMdxGoblin: '0x0Ff774721005b0cbd53d4719903D35468D47956F',
    MdexRABBIT_BUSDFarmMdxLiqStrat: '0xBf71c53F6be53B846f44B14Ef54bcC60a397af76',
    MdexRABBIT_BUSDWithdrawStrategyAddr: '0xEe5687397C00fBDAb702C0609b4FC4ff211193D5',
    MdexRABBIT_BUSDAddTwoStrategyAddr: '0x6cB6e631Cc60EdC18f1483419b3b24D8185ef81F',
    LP:'0x0025D20D85788C2cAE2FEB9C298bdaFc93bF08Ce',
    // -----------------_FairLaunch DebtToken_Pid --------------------
    debtMdexRABBIT_BUSD_FairLaunch_Pid: 36,
    // ------------------ Bank Borrow_Pid --------------------
    MdexDOT_USDT_BorrowToken1: { name: 'BNB', _Pid: 171 }
}




















/**
 * @param LpName: '',//lp的名字
 * @param LpTokenName0: '',//lptoken0的名字
 * @param LpTokenName1: '',//lptoken1的名字
 * @param LpToken0Pid: '',//token0对应的借款id
 * @param LpToken1Pid: '',//token1对应的借款id
 * @param LP_Address: '',//lp合约地址
 * @param LpTokenAddress0: '',//lptoken0的地址
 * @param LpTokenAddress1: '',//lptoken1的地址
 * @param Exchange: '',//lp交易所名字
 * @param DebtToken: '',//lp对应债务token
 * @param AddTwoStrategyAddr: '',//开仓策略地址
 * @param WithdrawStrategyAddr: '',//平仓策略地址
 * @param FairLaunchPid: '',//债务token在挖矿合约的id
 */
//  export const LpData = [
//     {
//         LpName: '',//lp的名字
//         LpTokenName0: '',//lptoken0的名字
//         LpTokenName1: '',//lptoken1的名字
//         LpToken0Pid: '',//token0对应的借款id
//         LpToken1Pid: '',//token1对应的借款id
//         LP_Address: '',//lp合约地址
//         LpTokenAddress0: '',//lptoken0的地址
//         LpTokenAddress1: '',//lptoken1的地址
//         Exchange: '',//lp交易所名字
//         DebtToken: '',//lp对应债务token
//         AddTwoStrategyAddr: '',//开仓策略地址
//         WithdrawStrategyAddr: '',//平仓策略地址
//         FairLaunchPid: '',//债务token在挖矿合约的id
//     }
// ]

