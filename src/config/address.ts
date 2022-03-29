/**
 *  Total Value Lockedd 合约地址
 */
export const TVL_ADDRESS = '0x9490C7f68c8409eD0099610Be3d40487856df59d';
/**
 * BANK_ADDRESS 银行地址
 */
export const BANK_ADDRESS = '0xc18907269640D11E2A91D7204f33C5115Ce3419e';


// 币种合约
/**
 * BNB_ADDRESS BNB合约地址
 */
export const BNB_ADDRESS = '0x0000000000000000000000000000000000000000';
/**
 * 查询自己钱包中的BNB余额用的地址
 */
export const BNBADDRES = '0x4ace4032a18Cb8a194470eDf00fAeaf0A25C41cB';
/**
 * ibBNB_ADDRESS BNB的计息币ibBNB合约地址
 */
export const ibBNB_ADDRESS = '0x45b887D3569cACa67E10662075241F972D337850';
/**
 * ibBNB挖矿池子id
 */
export const ibBNB_FAIRLAUNCH_PID = 0;

/**
 * FAIR_LAUNCH_ADDRESS 质押计息币挖矿的合约地址
 */
export const FAIR_LAUNCH_ADDRESS = '0x5ABd28694EDBD546247C2547738076a128cA1157';





/**
 * BUSD币种合约地址
 */
export const BUSD_ADDRESS = '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56';
/**
 * ibBUSD计息币合约地址
 */
export const ibBUSD_ADDRESS = '0xE0d1130Def49C29A4793De52eac680880Fc7cB70';
/**
 * ibBUSD挖矿池子地址
 */
export const ibBUSD_FairLaunch_Pid = 1;





/**
 * USDT币种合约地址
 */
export const USDT_ADDRESS = '0x55d398326f99059fF775485246999027B3197955';
/**
 * ibUSDT计息币合约地址
 */
export const ibUSDT_ADDRESS = '0xFE1622F9F594A113cd3C1A93F7F6B0d3C0588781';
/**
 * ibUSDT挖矿池子地址
 */
export const ibUSDT_FairLaunch_Pid = 2;





/**
 * BTC币种合约地址
 */
export const BTC_ADDRESS = '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c';
/**
 * ibBTC计息币合约地址
 */
export const ibBTC_ADDRESS = '0xe124118Cf775D320C11319458A9836a092E24307';
/**
 * ibBTC挖矿池子地址
 */
export const ibBTC_FairLaunch_Pid = 3;





/**
 * ETH币种合约地址
 */
export const ETH_ADDRESS = '0x2170Ed0880ac9A755fd29B2688956BD959F933F8';
/**
 * ibETH计息币合约地址
 */
export const ibETH_ADDRESS = '0x44945c51ed156cE2BF4b845Ab1F243e45b459D75';
/**
 * ibETH挖矿池子地址
 */
export const ibETH_FairLaunch_Pid = 4;






/**
 * RABBIT币种合约地址
 */
export const RABBIT_ADDRESS = '0x95a1199EBA84ac5f19546519e287d43D2F0E1b41';
/**
 * ibRABBIT计息币合约地址
 */
export const ibRabbit_ADDRESSS = '0x04Ffb93127D8af3144FEB3412Ad6c646214C6744';
/**
 * ibRABBIT挖矿池子地址
 */
export const ibRabbit_FairLaunch_Pid = 5;


export const VAultListAddress = [
    {
        bankAddress:BANK_ADDRESS,
        tikenAddress:BUSD_ADDRESS,
        ibtokenAddress:ibBUSD_ADDRESS,
        fairLaunch:ibBUSD_FairLaunch_Pid
    },
    {
        bankAddress:BANK_ADDRESS,
        tikenAddress:USDT_ADDRESS,
        ibtokenAddress:ibUSDT_ADDRESS,
        fairLaunch:ibUSDT_FairLaunch_Pid
    },
    {
        bankAddress:BANK_ADDRESS,
        tikenAddress:BTC_ADDRESS,
        ibtokenAddress:ibBTC_ADDRESS,
        fairLaunch:ibBTC_FairLaunch_Pid
    },
    {
        bankAddress:BANK_ADDRESS,
        tikenAddress:ETH_ADDRESS,
        ibtokenAddress:ibETH_ADDRESS,
        fairLaunch:ibETH_FairLaunch_Pid
    },
    {
        bankAddress:BANK_ADDRESS,
        tikenAddress:RABBIT_ADDRESS,
        ibtokenAddress:ibRabbit_ADDRESSS,
        fairLaunch:ibRabbit_FairLaunch_Pid
    }
]