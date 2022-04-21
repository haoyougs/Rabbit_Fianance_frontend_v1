
/**
 * pancake交易所的route合约
 */
export const PANCAKE_ROUTE = '0x10ED43C718714eb63d5aA57B78B54704E256024E';

export const MDEX_ROUTE = "0x7DAe51BD3E3376B8c7c4900E9107f12Be3AF1bA8";
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

// --------------------------------------- ------------------------------------------
export const FarmMdexRABBIT_BUSD = {
    Goblin: '0x0Ff774721005b0cbd53d4719903D35468D47956F',
    LPtokenName: 'RABBIT-BUSD',
    LiqStrat: '0xBf71c53F6be53B846f44B14Ef54bcC60a397af76',
    WithdrawStrategyAddr: '0xEe5687397C00fBDAb702C0609b4FC4ff211193D5',
    // -----------------_FairLaunch DebtToken_Pid --------------------
    FairLaunch_Pid: 36,
    // ------------------ Bank Borrow_Pid --------------------
    // MdexDOT_USDT_BorrowToken1: { name: 'BUSD', _Pid: 171 },
    LP: '0x0025D20D85788C2cAE2FEB9C298bdaFc93bF08Ce',
    debtToken: "0x0a7040471deB4fAb1aBB29ceaa6AB120FF9FBD90",
    LPtokenAddress0: '0x95a1199EBA84ac5f19546519e287d43D2F0E1b41',
    LPtokenAddress1: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
    BorrowToken0: { name: 'RABBIT', _Pid: null },
    BorrowToken1: { name: 'BUSD', _Pid: 171 },
    Type: 'Mdex',
    AddTwoStrategyAddr: '0x6cB6e631Cc60EdC18f1483419b3b24D8185ef81F',
}
export const FarmPancakeRABBIT_BNB = {
    Goblin: '0x912977ff20b641B37C2E0185fA4b02803601a3a3',
    LPtokenName: 'RABBIT-BNB',
    ReinvestStrat: '0x2b7Ee480ffad7D9079A12640F60421d4bea035e3',
    LiqStrat: '0x20960Abb669c780a697253B55A7Fe8478e48A489',
    // PancakeRABBIT_BNBAddTwoStrategyAddr: '0x435ad779f739f91b4e0906e28fC2b46f029b2EaC',
    WithdrawStrategyAddr: '0x8079339bC13C5ACCEc508df422dE9D3836C8fBE8',
    // ------------------_FairLaunch DebtToken_Pid --------------------
    FairLaunch_Pid: 25,
    // ------------------ Bank Borrow_Pid --------------------
    // PancakeRABBIT_BNB_BorrowToken1: { name: 'BNB', _Pid: 153 },
    LP: '0x04b56A5B3f45CFeaFbfDCFc999c14be5434f2146',
    debtToken: "0x778A827fEFc74850fC0a8a4E44792D8Ec4D6cAeA",
    LPtokenAddress0: '0x95a1199EBA84ac5f19546519e287d43D2F0E1b41',
    LPtokenAddress1: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
    BorrowToken0: { name: 'RABBIT', _Pid: null },
    BorrowToken1: { name: 'BNB', _Pid: 153 },
    Type: 'Pancake',
    AddTwoStrategyAddr: '0x435ad779f739f91b4e0906e28fC2b46f029b2EaC',
}
export const FarmPancakeUSDC_BUSD = {
    Goblin: '0xac988E0Cf82E28595C5973835f3429fd72515E42',
    LPtokenName: 'USDC-BUSD',
    LiqStrat: '0xE0D7877EEC30Db9a1D1aD4CC0A3c413774d7c781',
    ReinvestStrat: '0x2b7Ee480ffad7D9079A12640F60421d4bea035e3',
    WithdrawStrategyAddr: '0x3F365b0C749B41359B27FDE462772219d999C5b2',
    // ------------------_FairLaunch DebtToken_Pid --------------------
    FairLaunch_Pid: 20,
    // ------------------ Bank Borrow_Pid --------------------
    LP: '0x2354ef4DF11afacb85a5C7f98B624072ECcddbB1',
    debtToken: "0x466F586903D94fFC2D7728DE4d65C50A462Af7Ec",
    LPtokenAddress0: '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d',
    LPtokenAddress1: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
    BorrowToken0: { name: 'USDC', _Pid: null },
    BorrowToken1: { name: 'BUSD', _Pid: 148 },
    Type: 'Pancake',
    AddTwoStrategyAddr: '0xb32861e4709922d65F43cD7e78C73878081d0E6d',
    Ellipsis: "0.04% Fees on Ellipsis"
}
export const FarmPancakeUSDT_USDC = {
    Goblin: '0x028C44b049aD2A46B743FA65Ff51BCF427BcF780',
    LPtokenName: 'USDT-USDC',
    LiqStrat: '0xE0D7877EEC30Db9a1D1aD4CC0A3c413774d7c781',
    ReinvestStrat: '0x2b7Ee480ffad7D9079A12640F60421d4bea035e3',
    WithdrawStrategyAddr: '0x3F365b0C749B41359B27FDE462772219d999C5b2',
    // ------------------_FairLaunch DebtToken_Pid --------------------
    FairLaunch_Pid: 19,
    LP: '0xEc6557348085Aa57C72514D67070dC863C0a5A8c',
    debtToken: "0x1FA76EcefCe86CBBdf442571Bf76D11CBd1ffA4F",
    LPtokenAddress0: '0x55d398326f99059ff775485246999027b3197955',
    LPtokenAddress1: '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d',
    BorrowToken0: { name: 'USDT', _Pid: 147 },
    BorrowToken1: { name: 'USDC', _Pid: null },
    Type: 'Pancake',
    AddTwoStrategyAddr: '0x595A02FA4952E5803A07ba3B7d717A1e5a04be9a',
    Ellipsis: "0.04% Fees on Ellipsis"
}
export const FarmPancakeUSDT_BUSD = {
    Goblin: '0x92aE1b543D59aE30F999eb6490A895e11E9882b5', //开仓合约
    LPtokenName: 'USDT-BUSD',
    ReinvestStrat: '0x2b7Ee480ffad7D9079A12640F60421d4bea035e3',
    LiqStrat: '0xE0D7877EEC30Db9a1D1aD4CC0A3c413774d7c781',
    WithdrawStrategyAddr: '0x3F365b0C749B41359B27FDE462772219d999C5b2',//平仓地址
    FairLaunchPid: 6, //债务token存在挖矿合约的id
    LP: '0x7EFaEf62fDdCCa950418312c6C91Aef321375A00',
    debtToken: "0x5C1cAb77E95a9F18Ebf2DC2581366123f2cfd549",
    LPtokenAddress0: '0x55d398326f99059ff775485246999027b3197955',
    LPtokenAddress1: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
    // ------------------_FairLaunch DebtToken_Pid --------------------
    BorrowToken0: { name: 'USDT', _Pid: 128 },//对应银行借款id
    BorrowToken1: { name: 'BUSD', _Pid: 129 },//对应银行借款id
    Type: 'Pancake',
    AddTwoStrategyAddr: '0x1cEF6A51a951246D2943800e472B9F35e57E2E6d',
    Ellipsis: "0.04% Fees on Ellipsis"
}
export const FarmPancakeDAI_BUSD = {
    Goblin: '0x3378b8c59a7b6328ade3F7b6bFcE8cCbf198086A',
    LPtokenName: 'DAI-BUSD',
    ReinvestStrat: '0x2b7Ee480ffad7D9079A12640F60421d4bea035e3',
    LiqStrat: '0x20960Abb669c780a697253B55A7Fe8478e48A489',
    WithdrawStrategyAddr: '0x8079339bC13C5ACCEc508df422dE9D3836C8fBE8',
    // ------------------_FairLaunch DebtToken_Pid --------------------
    FairLaunch_Pid: 21,
    // ------------------ Bank Borrow_Pid --------------------
    LP: '0x66FDB2eCCfB58cF098eaa419e5EfDe841368e489',
    debtToken: "0xa14533c63D0b6C278172E92900E67Da23F795cdD",
    LPtokenAddress0: '0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3',
    LPtokenAddress1: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
    BorrowToken0: { name: 'DAI', _Pid: null },
    BorrowToken1: { name: 'BUSD', _Pid: 149 },
    Type: 'Pancake',
    AddTwoStrategyAddr: '0xbf4015fBad2037C84e7B5c1F120Fb5d359A2f80f',
}
export const FarmPancakeBNB_BUSD = {
    Goblin: '0xA7CA19be60e2422BF60a385612e752E132333581',
    LPtokenName: 'BNB-BUSD',
    LiqStrat: '0x20960Abb669c780a697253B55A7Fe8478e48A489',
    ReinvestStrat: '0x2b7Ee480ffad7D9079A12640F60421d4bea035e3',
    WithdrawStrategyAddr: '0x8079339bC13C5ACCEc508df422dE9D3836C8fBE8',
    // ------------------_FairLaunch DebtToken_Pid --------------------
    FairLaunch_Pid: 7,
    LP: '0x58F876857a02D6762E0101bb5C46A8c1ED44Dc16',
    debtToken: "0xA5cd68b3F3a82e858ceaF6738C1f62d0FB0c9e17",
    LPtokenAddress0: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
    LPtokenAddress1: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
    BorrowToken0: { name: 'BNB', _Pid: 130 },
    BorrowToken1: { name: 'BUSD', _Pid: 131 },
    Type: 'Pancake',
    AddTwoStrategyAddr: '0xFbf731119d31B9FFC6f3fafa7E3EAd911d73433c',
}
export const FarmMdexBNB_BUSD = {
    Goblin: '0x4e07250388ED8156911Db11Dea00e2Ebbb0eC48C',
    LPtokenName: 'BNB-BUSD',
    LiqStrat: '0xBf71c53F6be53B846f44B14Ef54bcC60a397af76',
    WithdrawStrategyAddr: '0xEe5687397C00fBDAb702C0609b4FC4ff211193D5',
    // -----------------_FairLaunch DebtToken_Pid --------------------
    FairLaunch_Pid: 26,
    LP: '0x340192D37d95fB609874B1db6145ED26d1e47744',
    debtToken: "0xEF4A4990105Da3E423aFe1Ed45c53AF81F4Be5bd",
    LPtokenAddress0: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
    LPtokenAddress1: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
    BorrowToken0: { name: 'BNB', _Pid: 154 },
    BorrowToken1: { name: 'BUSD', _Pid: 155 },
    Type: 'Mdex',
    AddTwoStrategyAddr: '0x3980E0FBe69Cb9331b1659f0A34806796FcbDEb3',
}
export const FarmPancakeUSDT_BNB = {
    // BNB_ADDRESS: '0x0000000000000000000000000000000000000000',
    // BNBADDRES: '0x4ace4032a18Cb8a194470eDf00fAeaf0A25C41cB',
    // PancakeUSDT_BNBdebtToken: '0x0a7040471deB4fAb1aBB29ceaa6AB120FF9FBD90',
    Goblin: '0x6c4Eb13d0A6A88e4D18C02992C4bA047b6a13bD0',
    LPtokenName: 'USDT-BNB',
    ReinvestStrat: '0x2b7Ee480ffad7D9079A12640F60421d4bea035e3',
    LiqStrat: '0x20960Abb669c780a697253B55A7Fe8478e48A489',
    WithdrawStrategyAddr: '0x8079339bC13C5ACCEc508df422dE9D3836C8fBE8',
    // ------------------_FairLaunch DebtToken_Pid --------------------
    FairLaunch_Pid: 8,
    LP: '0x16b9a82891338f9bA80E2D6970FddA79D1eb0daE',
    debtToken: "0xd6db7b574F0f29C2C2Bd31D659E517A0799fcE6B",
    LPtokenAddress0: '0x55d398326f99059ff775485246999027b3197955',
    LPtokenAddress1: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
    BorrowToken0: { name: 'USDT', _Pid: 132 },
    BorrowToken1: { name: 'BNB', _Pid: 133 },
    Type: 'Pancake',
    AddTwoStrategyAddr: '0x12Df61e4888ed73D26033898a7540829bf08931d',
}

export const FarmMdexUSDT_BNB = {
    Goblin: '0x1A49705aBFF34BCDFED5bF56f89b416EA768d856',
    LPtokenName: 'USDT-BNB',
    LiqStrat: '0xBf71c53F6be53B846f44B14Ef54bcC60a397af76',
    WithdrawStrategyAddr: '0xEe5687397C00fBDAb702C0609b4FC4ff211193D5',
    // -----------------_FairLaunch DebtToken_Pid --------------------
    FairLaunch_Pid: 27,
    LP: '0x09CB618bf5eF305FadfD2C8fc0C26EeCf8c6D5fd',
    debtToken: "0x13243c949cDe0f6a2b24ccE947D78f3A9A0f306e",
    LPtokenAddress0: '0x55d398326f99059ff775485246999027b3197955',
    LPtokenAddress1: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
    BorrowToken0: { name: 'USDT', _Pid: 156 },
    BorrowToken1: { name: 'BNB', _Pid: 157 },
    Type: 'Mdex',
    AddTwoStrategyAddr: '0x8454786C4168a792914c9fFd17a661C5515E7Cc8',
}
export const FarmMdexETH_BNB = {
    Goblin: '0x48f6AFA01Ed9C41Be8ad985eE177f3277E14B1cf',
    LPtokenName: 'ETH-BNB',
    LiqStrat: '0xBf71c53F6be53B846f44B14Ef54bcC60a397af76',
    WithdrawStrategyAddr: '0xEe5687397C00fBDAb702C0609b4FC4ff211193D5',
    // -----------------_FairLaunch DebtToken_Pid --------------------
    FairLaunch_Pid: 28,
    LP: '0x82E8F9e7624fA038DfF4a39960F5197A43fa76aa',
    debtToken: "0xd42E60a2f24657E151866873Aff4BD945Ff897D8",
    LPtokenAddress0: '0x2170ed0880ac9a755fd29b2688956bd959f933f8',
    LPtokenAddress1: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
    BorrowToken0: { name: 'ETH', _Pid: 158 },
    BorrowToken1: { name: 'BNB', _Pid: 159 },
    Type: 'Mdex',
    AddTwoStrategyAddr: '0x049Ed364c6EAe2145e08dC1b73caE0e342EC2C67',
}

export const FarmPancakeETH_BNB = {
    Goblin: '0x00E7295Cc0e68AdFeec7C69039656201b77aC9D4',
    LPtokenName: 'ETH-BNB',
    LiqStrat: '0x20960Abb669c780a697253B55A7Fe8478e48A489',
    ReinvestStrat: '0x2b7Ee480ffad7D9079A12640F60421d4bea035e3',
    WithdrawStrategyAddr: '0x8079339bC13C5ACCEc508df422dE9D3836C8fBE8',
    // ------------------_FairLaunch DebtToken_Pid --------------------
    FairLaunch_Pid: 9,
    LP: '0x74E4716E431f45807DCF19f284c7aA99F18a4fbc',
    debtToken: "0xDD23C084045b1a52d6DaceCdFD53fA0e8BfC5d76",
    LPtokenAddress0: '0x2170ed0880ac9a755fd29b2688956bd959f933f8',
    LPtokenAddress1: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
    BorrowToken0: { name: 'ETH', _Pid: 134 },
    BorrowToken1: { name: 'BNB', _Pid: 135 },
    Type: 'Pancake',
    AddTwoStrategyAddr: '0xF3Dd75Fb470198392bb14A49F1a4Df98449916C7',
}
export const FarmMdexETH_USDT = {
    Goblin: '0xB35148aB8d675C45B86F20EBFB151b9Fc4eF63ae',
    LPtokenName: 'ETH-USDT',
    LiqStrat: '0xBf71c53F6be53B846f44B14Ef54bcC60a397af76',
    WithdrawStrategyAddr: '0xEe5687397C00fBDAb702C0609b4FC4ff211193D5',
    // -----------------_FairLaunch DebtToken_Pid --------------------
    FairLaunch_Pid: 31,
    LP: '0x0FB881c078434b1C0E4d0B64d8c64d12078b7Ce2',
    debtToken: "0xF7297B205C7D368657fb2e0005991fd66E35044B",
    LPtokenAddress0: '0x2170ed0880ac9a755fd29b2688956bd959f933f8',
    LPtokenAddress1: '0x55d398326f99059ff775485246999027b3197955',
    BorrowToken0: { name: 'ETH', _Pid: 164 },
    BorrowToken1: { name: 'USDT', _Pid: 165 },
    Type: 'Mdex',
    AddTwoStrategyAddr: '0x0bd721f356c956802172A6AEcF3eb57f19C74B7e',
}
export const FarmMdexETH_BTCB = {
    Goblin: '0xbb0b4f98E20DB9c202fA412Ab84c904bF4F07e1C',
    LPtokenName: 'ETH-BTCB',
    LiqStrat: '0xBf71c53F6be53B846f44B14Ef54bcC60a397af76',
    WithdrawStrategyAddr: '0xEe5687397C00fBDAb702C0609b4FC4ff211193D5',
    // -----------------_FairLaunch DebtToken_Pid --------------------
    FairLaunch_Pid: 32,
    LP: '0x577d005912C49B1679B4c21E334FdB650E92C077',
    debtToken: "0x59a56178247dE8936323ba75A0515A7cfA26c28F",
    LPtokenAddress0: '0x2170ed0880ac9a755fd29b2688956bd959f933f8',
    LPtokenAddress1: '0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c',
    BorrowToken0: { name: 'ETH', _Pid: 166 },
    BorrowToken1: { name: 'BTCB', _Pid: 167 },
    Type: 'Mdex',
    AddTwoStrategyAddr: '0xdE9588A446A0Cf4949bAf24ea0b507140f4CCc6B',
}
export const FarmMdexBTCB_BNB = {
    Goblin: '0xf6ADB924213C78Cfab7B8f9ca21489e15E9410C2',
    LPtokenName: 'BTCB-BNB',
    LiqStrat: '0xBf71c53F6be53B846f44B14Ef54bcC60a397af76',
    WithdrawStrategyAddr: '0xEe5687397C00fBDAb702C0609b4FC4ff211193D5',
    // -----------------_FairLaunch DebtToken_Pid --------------------
    FairLaunch_Pid: 29,
    LP: '0x969f2556F786a576F32AeF6c1D6618f0221Ec70e',
    debtToken: "0x193ad3a24c9dFaB79b3097A0a6C00E7d227b349c",
    LPtokenAddress0: '0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c',
    LPtokenAddress1: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
    BorrowToken0: { name: 'BTCB', _Pid: 160 },
    BorrowToken1: { name: 'BNB', _Pid: 161 },
    Type: 'Mdex',
    AddTwoStrategyAddr: '0xCb061D2fd73a2C28408A20c82be4D39764D36B04',
}
export const FarmPancakeBTCB_BNB = {
    Goblin: '0xA67D61a1e12161a56ba9aF6054300C3296b3C6Ef',
    LPtokenName: 'BTCB-BNB',
    ReinvestStrat: '0x2b7Ee480ffad7D9079A12640F60421d4bea035e3',
    LiqStrat: '0x20960Abb669c780a697253B55A7Fe8478e48A489',
    WithdrawStrategyAddr: '0x8079339bC13C5ACCEc508df422dE9D3836C8fBE8',
    // ------------------_FairLaunch DebtToken_Pid --------------------
    FairLaunch_Pid: 11,
    LP: '0x61EB789d75A95CAa3fF50ed7E47b96c132fEc082',
    debtToken: "0x261E41Eb27e6396c9B06de128fc1833d42Ea9c6B",
    LPtokenAddress0: '0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c',
    LPtokenAddress1: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
    BorrowToken0: { name: 'BTCB', _Pid: 138 },
    BorrowToken1: { name: 'BNB', _Pid: 139 },
    Type: 'Pancake',
    AddTwoStrategyAddr: '0xA7eED1d7BCd39E7d2F57851C3525634a7c5C2cf9',
}
export const FarmMdexBTCB_USDT = {
    Goblin: '0xCf2ac9f8CF72F4908357376158b21Dfe00B0ace5',
    LPtokenName: 'BTCB-USDT',
    LiqStrat: '0xBf71c53F6be53B846f44B14Ef54bcC60a397af76',
    WithdrawStrategyAddr: '0xEe5687397C00fBDAb702C0609b4FC4ff211193D5',
    // -----------------_FairLaunch DebtToken_Pid --------------------
    FairLaunch_Pid: 30,
    LP: '0xda28Eb7ABa389C1Ea226A420bCE04Cb565Aafb85',
    debtToken: "0xF1cc2217e77b23f178E3b389De3B89E70EEa315a",
    LPtokenAddress0: '0x55d398326f99059ff775485246999027b3197955',
    LPtokenAddress1: '0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c',
    BorrowToken0: { name: 'USDT', _Pid: 163 },
    BorrowToken1: { name: 'BTCB', _Pid: 162 },
    Type: 'Mdex',
    AddTwoStrategyAddr: '0xBB90F5F9e13BbC5d70eE5430822fA740a2e73e04',
}
export const FarmPancakeBTCB_BUSD = {
    Goblin: '0x0404cF4294e6Bd4289DFA24974402C3f1166ca56',
    LPtokenName: 'BTCB-BUSD',
    ReinvestStrat: '0x2b7Ee480ffad7D9079A12640F60421d4bea035e3',
    LiqStrat: '0x20960Abb669c780a697253B55A7Fe8478e48A489',
    WithdrawStrategyAddr: '0x8079339bC13C5ACCEc508df422dE9D3836C8fBE8',
    // ------------------_FairLaunch DebtToken_Pid --------------------
    FairLaunch_Pid: 10,
    LP: '0xF45cd219aEF8618A92BAa7aD848364a158a24F33',
    debtToken: "0xc31638025DEC9A9f3ee1382717f53BE2fD48AE4b",
    LPtokenAddress0: '0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c',
    LPtokenAddress1: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
    BorrowToken0: { name: 'BTCB', _Pid: 136 },
    BorrowToken1: { name: 'BUSD', _Pid: 137 },
    Type: 'Pancake',
    AddTwoStrategyAddr: '0xa2D0D08E08823b978232611EB54795608d92362b',
}
export const FarmPancakeCAKE_BNB = {
    Goblin: '0x37ce37088B1D84786864c3856f9660B0Ddc835B0',
    LPtokenName: 'CAKE-BNB',
    ReinvestStrat: '0x2b7Ee480ffad7D9079A12640F60421d4bea035e3',
    LiqStrat: '0x20960Abb669c780a697253B55A7Fe8478e48A489',
    WithdrawStrategyAddr: '0x8079339bC13C5ACCEc508df422dE9D3836C8fBE8',
    // ------------------_FairLaunch DebtToken_Pid --------------------
    FairLaunch_Pid: 12,
    LP: '0x0eD7e52944161450477ee417DE9Cd3a859b14fD0',
    debtToken: "0xF902feFAeaeF32596E3895078bfc834Fb4210bcE",
    LPtokenAddress0: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
    LPtokenAddress1: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
    BorrowToken0: { name: 'BTCB', _Pid: null },
    BorrowToken1: { name: 'BNB', _Pid: 140 },
    Type: 'Pancake',
    AddTwoStrategyAddr: '0x70c18D9990942D8cE01c1054e33DC65e3f6928a7',
}
export const FarmPancakeCAKE_BUSD = {
    Goblin: '0xCa00524c55703C057632c7fCb914a7C64E139505',
    LPtokenName: 'CAKE-BUSD',
    LiqStrat: '0x20960Abb669c780a697253B55A7Fe8478e48A489',
    WithdrawStrategyAddr: '0x8079339bC13C5ACCEc508df422dE9D3836C8fBE8',
    ReinvestStrat: '0x2b7Ee480ffad7D9079A12640F60421d4bea035e3',
    // ------------------_FairLaunch DebtToken_Pid --------------------
    FairLaunch_Pid: 18,
    LP: '0x804678fa97d91B974ec2af3c843270886528a9E6',
    debtToken: "0xacB29A85f1283bF6217F70507B148adE984B5465",
    LPtokenAddress0: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
    LPtokenAddress1: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
    BorrowToken0: { name: 'CAKE', _Pid: null },
    BorrowToken1: { name: 'BUSD', _Pid: 146 },
    Type: 'Pancake',
    AddTwoStrategyAddr: '0x4f17667B1079649958e340b664Bee4939Ea45AEC',
}
export const FarmMdexMDX_BUSD = {
    Goblin: '0xE026B019d8CFc57eB8eF0cf5778bdB5a5f290505',
    LPtokenName: 'MDX-BUSD',
    LiqStrat: '0xBf71c53F6be53B846f44B14Ef54bcC60a397af76',
    WithdrawStrategyAddr: '0xEe5687397C00fBDAb702C0609b4FC4ff211193D5',
    // -----------------_FairLaunch DebtToken_Pid --------------------
    FairLaunch_Pid: 33,
    LP: '0x223740a259E461aBeE12D84A9FFF5Da69Ff071dD',
    debtToken: "0xeB7626Fe01C425E3b9aa35FDa71321029B01B6b9",
    LPtokenAddress0: '0x9c65ab58d8d978db963e63f2bfb7121627e3a739',
    LPtokenAddress1: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
    BorrowToken0: { name: 'MDX', _Pid: null },
    BorrowToken1: { name: 'BUSD', _Pid: 168 },
    Type: 'Mdex',
    AddTwoStrategyAddr: '0x47E3F33CEc2C25bdfd8db65150ee7E46b401BA65',
}
export const FarmPancakeVAI_BUSD = {
    Goblin: '0x55786573875F1Dd45FEfB741762B9D163fAd3516',
    LPtokenName: 'VAI-BUSD',
    ReinvestStrat: '0x2b7Ee480ffad7D9079A12640F60421d4bea035e3',
    LiqStrat: '0x20960Abb669c780a697253B55A7Fe8478e48A489',
    WithdrawStrategyAddr: '0x8079339bC13C5ACCEc508df422dE9D3836C8fBE8',
    // ------------------_FairLaunch DebtToken_Pid --------------------
    FairLaunch_Pid: 24,
    LP: '0x133ee93FE93320e1182923E1a640912eDE17C90C',
    debtToken: "0xBF21fE7d4008936474e92cf455Dfbd99cB2Cc3bf",
    LPtokenAddress0: '0x4bd17003473389a42daf6a0a729f6fdb328bbbd7',
    LPtokenAddress1: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
    BorrowToken0: { name: 'VAI', _Pid: null },
    BorrowToken1: { name: 'BUSD', _Pid: 152 },
    Type: 'Pancake',
    AddTwoStrategyAddr: '0xd8997AA8c32c48c052dcf1D12B2020082FB527FF',
}
export const FarmPancakeUST_BUSD = {
    Goblin: '0x6ff7daa1a40146E9132CE2DbCE5a35EF3A840A06',
    LPtokenName: 'UST-BUSD',
    LiqStrat: '0x20960Abb669c780a697253B55A7Fe8478e48A489',
    ReinvestStrat: '0x2b7Ee480ffad7D9079A12640F60421d4bea035e3',
    WithdrawStrategyAddr: '0x8079339bC13C5ACCEc508df422dE9D3836C8fBE8',
    // ------------------_FairLaunch DebtToken_Pid --------------------
    FairLaunch_Pid: 23,
    LP: '0x05faf555522Fa3F93959F86B41A3808666093210',
    debtToken: "0x645c306a15cD29560a2EEBB689aF7918B760911A",
    LPtokenAddress0: '0x23396cf899ca06c4472205fc903bdb4de249d6fc',
    LPtokenAddress1: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
    BorrowToken0: { name: 'UST', _Pid: null },
    BorrowToken1: { name: 'BUSD', _Pid: 151 },
    Type: 'Pancake',
    AddTwoStrategyAddr: '0xf786651C8B9d23406848531814b5A0aB844734ab',
}
export const FarmPancakeTUSD_BUSD = {
    Goblin: '0x99a8578dB15F86c4087C7375268342f71cD3a2DA',
    LPtokenName: 'TUSD-BUSD',
    ReinvestStrat: '0x2b7Ee480ffad7D9079A12640F60421d4bea035e3',
    LiqStrat: '0x20960Abb669c780a697253B55A7Fe8478e48A489',
    WithdrawStrategyAddr: '0x8079339bC13C5ACCEc508df422dE9D3836C8fBE8',
    // ------------------_FairLaunch DebtToken_Pid --------------------
    FairLaunch_Pid: 22,
    LP: '0x2E28b9B74D6d99D4697e913b82B41ef1CAC51c6C',
    debtToken: "0x7acc6f35eE91438d79196fBaedAdE0F0364Df6cc",
    LPtokenAddress0: '0x14016e85a25aeb13065688cafb43044c2ef86784',
    LPtokenAddress1: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
    BorrowToken0: { name: 'TUSD', _Pid: null },
    BorrowToken1: { name: 'BUSD', _Pid: 150 },
    Type: 'Pancake',
    AddTwoStrategyAddr: '0x0A754686D49A253590C327C25680B1E70D0f82EA',
}
export const FarmPancakeADA_BNB = {
    Goblin: '0xc991242e925c94B56C0F483Bd9Aaa62A97b84cfA',
    LPtokenName: 'ADA-BNB',
    LiqStrat: '0x20960Abb669c780a697253B55A7Fe8478e48A489',
    ReinvestStrat: '0x2b7Ee480ffad7D9079A12640F60421d4bea035e3',
    WithdrawStrategyAddr: '0x8079339bC13C5ACCEc508df422dE9D3836C8fBE8',
    // ------------------_FairLaunch DebtToken_Pid --------------------
    FairLaunch_Pid: 16,
    LP: '0x28415ff2C35b65B9E5c7de82126b4015ab9d031F',
    debtToken: "0x3D8e505Cf09fCa3814980BE89A39F2B48fB040B1",
    LPtokenAddress0: '0x3ee2200efb3400fabb9aacf31297cbdd1d435d47',
    LPtokenAddress1: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
    BorrowToken0: { name: 'ADA', _Pid: null },
    BorrowToken1: { name: 'BNB', _Pid: 144 },
    Type: 'Pancake',
    AddTwoStrategyAddr: '0xf2D7EBb4de9fC051245691913Cf3c9083C171926',
}
export const FarmMdexFIL_USDT = {
    Goblin: '0x31Fa58e5007BA827de0dc0C3c839C96a5a413414',
    LPtokenName: 'FIL-USDT',
    LiqStrat: '0xBf71c53F6be53B846f44B14Ef54bcC60a397af76',
    WithdrawStrategyAddr: '0xEe5687397C00fBDAb702C0609b4FC4ff211193D5',
    // -----------------_FairLaunch DebtToken_Pid --------------------
    FairLaunch_Pid: 34,
    LP: '0xCAABda10a3ac99Fc15f5B636Aa18E6B4Fd8db16D',
    debtToken: "0xe53bB24C614504229E34C0AD9EE22006A07f2F5F",
    LPtokenAddress0: '0x0d8ce2a99bb6e3b7db580ed848240e4a0f9ae153',
    LPtokenAddress1: '0x55d398326f99059ff775485246999027b3197955',
    BorrowToken0: { name: 'FIL', _Pid: null },
    BorrowToken1: { name: 'USDT', _Pid: 169 },
    Type: 'Mdex',
    AddTwoStrategyAddr: '0x7e3577BCCaE88fb424e4d15E978218f5319feE15',
}
export const FarmMdexDOT_USDT = {
    Goblin: '0xeAbA73300b04fB2e40cA7c78ab5920068B6f1D5C',
    LPtokenName: 'DOT-USDT',
    LiqStrat: '0xBf71c53F6be53B846f44B14Ef54bcC60a397af76',
    WithdrawStrategyAddr: '0xEe5687397C00fBDAb702C0609b4FC4ff211193D5',
    // -----------------_FairLaunch DebtToken_Pid --------------------
    FairLaunch_Pid: 35,
    LP: '0xFf44e10662E1CD4f7AfE399144636c74B0D05D80',
    debtToken: "0x1dFD3D2a7E1b245F5393c086c690bE98C6A1aEcE",
    LPtokenAddress0: '0x55d398326f99059ff775485246999027b3197955',
    LPtokenAddress1: '0x7083609fce4d1d8dc0c979aab8c869ea2c873402',
    BorrowToken0: { name: 'USDT', _Pid: 170 },
    BorrowToken1: { name: 'DOT', _Pid: null },
    Type: 'Mdex',
    AddTwoStrategyAddr: '0xaF09A0Fa2f78D9dc67313dB99315105649BF46C6',
}
export const FarmPancakeDOT_BNB = {
    Goblin: '0xa7De761a606101F55DF7241991ECCE867869B4A4',
    LPtokenName: 'DOT-BNB',
    ReinvestStrat: '0x2b7Ee480ffad7D9079A12640F60421d4bea035e3',
    LiqStrat: '0x20960Abb669c780a697253B55A7Fe8478e48A489',
    WithdrawStrategyAddr: '0x8079339bC13C5ACCEc508df422dE9D3836C8fBE8',
    // ------------------_FairLaunch DebtToken_Pid --------------------
    FairLaunch_Pid: 15,
    LP: '0xDd5bAd8f8b360d76d12FdA230F8BAF42fe0022CF',
    debtToken: "0x7A4aB5c9b59869A5124bFC0C7e57fdD6a998F342",
    LPtokenAddress0: '0x7083609fce4d1d8dc0c979aab8c869ea2c873402',
    LPtokenAddress1: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
    BorrowToken0: { name: 'DOT', _Pid: null },
    BorrowToken1: { name: 'BNB', _Pid: 143 },
    Type: 'Pancake',
    AddTwoStrategyAddr: '0x0533b11E4d5F45cef52FaD4744aC4c374c0770Ce',
}
export const FarmPancakeLINK_BNB = {
    Goblin: '0x592081857B7bC5E0E8c533A93755b26A21b0e00a',
    LPtokenName: 'LINK-BNB',
    LiqStrat: '0x20960Abb669c780a697253B55A7Fe8478e48A489',
    ReinvestStrat: '0x2b7Ee480ffad7D9079A12640F60421d4bea035e3',
    WithdrawStrategyAddr: '0x8079339bC13C5ACCEc508df422dE9D3836C8fBE8',
    // ------------------_FairLaunch DebtToken_Pid --------------------
    FairLaunch_Pid: 13,
    LP: '0x824eb9faDFb377394430d2744fa7C42916DE3eCe',
    debtToken: "0xA31fe9059F54562132C00D812829165695DB02bD",
    LPtokenAddress0: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
    LPtokenAddress1: '0xf8a0bf9cf54bb92f17374d9e9a321e6a111a51bd',
    BorrowToken0: { name: 'BNB', _Pid: 141 },
    BorrowToken1: { name: 'LINK', _Pid: null },
    Type: 'Pancake',
    AddTwoStrategyAddr: '0x3d5bF120b8ccA2946D8d409070DaF653430203d1',
}
export const FarmPancakeXVS_BNB = {
    Goblin: '0x288D67a11c38fEee3B4A30c07936C19346bde428',
    LPtokenName: 'XVS-BNB',
    ReinvestStrat: '0x2b7Ee480ffad7D9079A12640F60421d4bea035e3',
    LiqStrat: '0x20960Abb669c780a697253B55A7Fe8478e48A489',
    WithdrawStrategyAddr: '0x8079339bC13C5ACCEc508df422dE9D3836C8fBE8',
    // ------------------_FairLaunch DebtToken_Pid --------------------
    FairLaunch_Pid: 14,
    LP: '0x7EB5D86FD78f3852a3e0e064f2842d45a3dB6EA2',
    debtToken: "0x99a97a3DBA557C2cfa6eF444bB043024D00845a4",
    LPtokenAddress0: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
    LPtokenAddress1: '0xcf6bb5389c92bdda8a3747ddb454cb7a64626c63',
    BorrowToken0: { name: 'BNB', _Pid: 142 },
    BorrowToken1: { name: 'XVS', _Pid: null },
    Type: 'Pancake',
    AddTwoStrategyAddr: '0xb5f37a71dd20237F54781E97217b9CD4fF52E5b7',
}
export const FarmPancakeUNI_BNB = {
    Goblin: '0x3a58406bdBc32b3EAAfFC971AFC485185cC78D9F',
    LPtokenName: 'UNI-BNB',
    ReinvestStrat: '0x2b7Ee480ffad7D9079A12640F60421d4bea035e3',
    LiqStrat: '0x20960Abb669c780a697253B55A7Fe8478e48A489',
    WithdrawStrategyAddr: '0x8079339bC13C5ACCEc508df422dE9D3836C8fBE8',
    // ------------------_FairLaunch DebtToken_Pid --------------------
    FairLaunch_Pid: 17,
    LP: '0x014608E87AF97a054C9a49f81E1473076D51d9a3',
    debtToken: "0xE2190efB3BdBE07b0C1c55c69867D3cB595661bF",
    LPtokenAddress0: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
    LPtokenAddress1: '0xbf5140a22578168fd562dccf235e5d43a02ce9b1',
    BorrowToken0: { name: 'BNB', _Pid: 145 },
    BorrowToken1: { name: 'UNI', _Pid: null },
    Type: 'Pancake',
    AddTwoStrategyAddr: '0x4630C513b344A79496F4335Ac49f58C1dC913a84',
}
export const FarmAddressArrs = [FarmMdexRABBIT_BUSD, FarmPancakeRABBIT_BNB, FarmPancakeUSDC_BUSD, FarmPancakeUSDT_USDC, FarmPancakeUSDT_BUSD, FarmPancakeDAI_BUSD, FarmPancakeBNB_BUSD, FarmMdexBNB_BUSD, FarmPancakeUSDT_BNB, FarmMdexUSDT_BNB, FarmMdexETH_BNB, FarmPancakeETH_BNB, FarmMdexETH_USDT, FarmMdexETH_BTCB, FarmMdexBTCB_BNB, FarmPancakeBTCB_BNB, FarmMdexBTCB_USDT, FarmPancakeBTCB_BUSD, FarmPancakeCAKE_BNB, FarmPancakeCAKE_BUSD, FarmMdexMDX_BUSD, FarmPancakeVAI_BUSD, FarmPancakeUST_BUSD, FarmPancakeTUSD_BUSD, FarmPancakeADA_BNB, FarmMdexFIL_USDT, FarmMdexDOT_USDT, FarmPancakeDOT_BNB, FarmPancakeLINK_BNB, FarmPancakeXVS_BNB, FarmPancakeUNI_BNB]




















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

