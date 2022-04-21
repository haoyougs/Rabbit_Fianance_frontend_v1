import React, { useEffect, useState } from "react";
import styled from "styled-components";
import closeImg from "assets/close@2x.png";
import { TokenIcon } from "components/icon/tokenIcon";
import { Button } from "components/button/button";
import { AssetsBorrowed } from "hooks/useSupply";
import { PANCAKE_ROUTE, MDEX_ROUTE } from "config/LPAddress";
import { ethers } from "ethers";
import { useWeb3React } from "@web3-react/core";
import { NoticeBox } from "components/notice/index";
import { TokenBalance1, TokneBalanceS, getShares, getshareToBalance, getTotalSupply, ClosePosition } from "hooks/useMyPosition";
import { LoadingBox } from "components/Loading";
import { UpdateNotice, UpdateNotice2, UpdateNoticeText } from "state/TypePage/hooks"
interface parameter {
  onClick: () => void;
  info: any;
}

export const ClosePositionPage: React.FC<parameter> = ({ onClick, info }) => {
  //获取钱包地址
  let { account, library } = useWeb3React();
  const LPAddress = info.LPAddress;
  const Ellipsis = LPAddress.Ellipsis;
  const Data = info.item;
  const Names = info.LPAddress.LPtokenName;
  //借款币是不是token0
  const borrowToken0 = Data.borrowToken == LPAddress.LPtokenAddress0 ? true : false;
  const Token0Name = LPAddress.BorrowToken0.name;
  const Token1Name = LPAddress.BorrowToken1.name;
  const posId = Data.posid._hex;
  // console.log(info);
  //token0和token1的数量；
  const [Token0Amount, setToken0Amount] = useState<any>();
  const [Token1Amount, setToken1Amount] = useState<any>();

  //需要去交易的数量 Amount to Tradea
  let [AmountToTrade, setAmountToTrade] = useState<any>(0);

  // 非稳定币的单币价格
  let [CurrencyPrice, setCurrencyPrice] = useState<any>();
  //用户将会得到的币的数量
  const [ReceiveToken0, setReceiveToken0] = useState<any>();
  const [ReceiveToken1, setReceiveToken1] = useState<any>();
  // 当前的币种
  const [CurrentToken, setCurrentToken] = useState<any>(0);
  const [DebtValue, setDebtValue] = useState<any>(0)
  //债务手续费
  const [TradeFees, setTradeFees] = useState<any>(0);
  //提示
  const setNotice = UpdateNotice();
  const setNotice2 = UpdateNotice2();
  const setNoticeText = UpdateNoticeText();
  //判断当前币种是否是bnb
  let token0IsBNB: any = Data.token0 == "0x0000000000000000000000000000000000000000" ? true : false;
  let token1IsBNB: any = Data.token1 == "0x0000000000000000000000000000000000000000" ? true : false;
  const ROUTE = info.LPAddress.Type == "Pancake" ? PANCAKE_ROUTE : MDEX_ROUTE;
  // 获取币种价格
  useEffect(() => {
    AssetsBorrowed(
      ROUTE,
      info.LPAddress.LPtokenAddress0,
      info.LPAddress.LPtokenAddress1
    ).then((res) => {
      //赋值单币价格
      let token1Price = 1 / (Math.floor(res * 100000) / 100000);
      setCurrencyPrice(token1Price);
    });
  }, [Data]);
  const getTokenAssets = async () => {
    const debtValue = Number(ethers.utils.formatUnits(Data.totalValue, 18));
    setDebtValue(debtValue)
    //对应的份额
    const shares = await getShares(posId, LPAddress.Goblin);
    // console.log("shares", shares)
    //lp数量
    const shareToBalance = await getshareToBalance(shares, LPAddress.Goblin);
    //总lp 数量
    const TotalLP = await getTotalSupply(info.LPAddress.LP);
    //lp合约中token
    const token0 = await TokneBalanceS(info.LPAddress.LP, library,
      LPAddress.LPtokenAddress0);
    const token1 = await TokneBalanceS(info.LPAddress.LP, library,
      LPAddress.LPtokenAddress1);
    // console.log(shareToBalance, TotalLP, token0, token1, CurrencyPrice);
    //我lp数量 / 总lp 数量 * lp合约中有的token0（或者token1）
    const token0Amount = ethers.BigNumber.from(shareToBalance).mul(ethers.BigNumber.from(token0)).div(ethers.BigNumber.from(TotalLP))
    const token1Amount = ethers.BigNumber.from(shareToBalance).mul(ethers.BigNumber.from(token1)).div(ethers.BigNumber.from(TotalLP))

    const token0AmountData = ethers.utils.formatUnits(token0Amount, 18)
    const token1AmountData = ethers.utils.formatUnits(token1Amount, 18)
    setToken0Amount(parseFloat(token0AmountData));
    setToken1Amount(parseFloat(token1AmountData));
  }
  useEffect(() => {
    if (account) {
      getTokenAssets()
    }
  }, [account])
  useEffect(() => {
    if (Token0Amount && Token1Amount) {
      if (borrowToken0) {
        const Fees = Number(Token1Amount * 0.0004).toLocaleString();
        setTradeFees(Fees);
        if (DebtValue > Token0Amount) {
          const amountToTrade0 = DebtValue - Token0Amount;
          setAmountToTrade(amountToTrade0)
        } else {
          setAmountToTrade(0)
        }

      } else {
        const Fees = Number(Token0Amount * 0.0004).toLocaleString();
        setTradeFees(Fees);
        if (DebtValue > Token1Amount) {
          const amountToTrade1 = DebtValue - Token1Amount;
          setAmountToTrade(amountToTrade1)
        } else {
          setAmountToTrade(0)
        }
      }
      if (CurrentToken == 0) {
        //交易数量是0
        if (AmountToTrade == 0) {
          //交易token0
          if (!Ellipsis) {
            if (borrowToken0) {
              //哪个是债务token减去对应的债务 token
              setReceiveToken0(Token0Amount - DebtValue);
              setReceiveToken1(Token1Amount);
            } else {
              setReceiveToken0(Token0Amount);
              setReceiveToken1(Token1Amount - DebtValue);
            }
          } else {
            if (borrowToken0) {
              //哪个是债务token减去对应的债务 token
              setReceiveToken0(Token0Amount + Token1Amount * CurrencyPrice - DebtValue);
              setReceiveToken1(0);
            } else {
              setReceiveToken0(0);
              setReceiveToken1(Token1Amount + Token0Amount / CurrencyPrice - DebtValue);
            }
          }

        } else {
          //交易token0;
          if (borrowToken0) {
            //token1的数量减去交易数量的AmountToTrade价值多少token1
            const AmountToTrade1 = Token1Amount - AmountToTrade / CurrencyPrice;
            setReceiveToken0(0);
            setReceiveToken1(AmountToTrade1);
          } else {
            //token0的数量减去交易数量的AmountToTrade价值多少token0
            const AmountToTrade0 = Token0Amount - AmountToTrade * CurrencyPrice;
            setReceiveToken0(AmountToTrade0);
            setReceiveToken1(0);
          }
        }
      }
    }
  }, [Token0Amount, Token1Amount])
  //点击切换事件
  const CurrentTokenHandle = (val: any) => {
    console.log(borrowToken0)
    setCurrentToken(val);
    //交易数量是0
    if (AmountToTrade == 0) {
      if (val == 0) {
        setReceiveToken0(Token0Amount);
        setReceiveToken1(Token1Amount);
      }
      if (val == 1) {
        const Token0Receive = Token0Amount + Token1Amount * CurrencyPrice;
        setReceiveToken0(Token0Receive);
        setReceiveToken1(0);
      }
      if (val == 2) {
        const Token1Receive = Token0Amount / CurrencyPrice + Token1Amount * 1;
        setReceiveToken0(0);
        setReceiveToken1(Token1Receive);
      }
    } else {
      //交易token0;//token1的数量减去交易数量的AmountToTrade价值多少token1
      const AmountToTrade1 = Token1Amount - AmountToTrade / CurrencyPrice;
      //交易token1;//token0的数量减去交易数量的AmountToTrade价值多少token0
      const AmountToTrade0 = Token0Amount - AmountToTrade * CurrencyPrice;
      if (val == 0) {
        if (borrowToken0) {
          setReceiveToken0(0);
          setReceiveToken1(AmountToTrade1);
        } else {
          setReceiveToken0(AmountToTrade0);
          setReceiveToken1(0);
        }
      }
      if (val == 1) {
        // const Token0Receive = Token0Amount + Token1Amount * CurrencyPrice;
        setReceiveToken0(AmountToTrade0);
        setReceiveToken1(0);
      }
      if (val == 2) {
        setReceiveToken0(0);
        setReceiveToken1(AmountToTrade1);
      }
    }
  };
  //平仓操作
  const ConfirmClick = () => {
    const strategyAddress = info.LPAddress.WithdrawStrategyAddr;
    const token0Address = Data.token0;
    const token1Address = Data.token1;
    const posId = Data.posid._hex;
    ClosePosition(
      strategyAddress,
      token0Address,
      token1Address,
      CurrentToken.toString(),
      posId,

    ).then((res) => {
      console.log(res);
      if (res == true) {
        setNotice(res);
        setNoticeText("Close Collateral succeed");
      } else {
        setNotice2(true);
        setNoticeText("Close Collateral fail");
      }
    });
  };
  return (
    <>
      <BG onClick={onClick} />
      <Box>
        <TitleBox>
          <div>Close Position And Quit</div>
          <CloseBtn src={closeImg} onClick={onClick} />
        </TitleBox>
        <TipsBox>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="sc-ksdxAp fdYigH"
            >
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
            </svg>
          </div>
          <div style={{ marginLeft: 15 }}>
            {CurrentToken == 0
              ? `We will convert the minimum required amount of tokens into BNB to
            pay back the debt and return the remaining assets to you. This can
            potentially save on slippage and trading fees.`
              : null}
            {CurrentToken == 1
              ? `Your position value will all be converted to USDT and returned to you after paying back the debt.`
              : null}
            {CurrentToken == 2
              ? `Your position value will all be converted to BNB and returned to you after paying back the debt.`
              : null}
          </div>
        </TipsBox>
        <BtnBox>
          <Button
            w={150}
            h={36}
            onClick={() => CurrentTokenHandle(0)}
            Select={CurrentToken == 0}
          >
            Minimize Trading
          </Button>
          {Ellipsis ? null :
            <Button w={150} h={36} onClick={() => CurrentTokenHandle(1)} Select={CurrentToken == 1}>
              {Token0Name}
            </Button>
          }
          {Ellipsis ? null :
            <Button w={150} h={36} onClick={() => CurrentTokenHandle(2)} Select={CurrentToken == 2}>
              {Token1Name}
            </Button>
          }

        </BtnBox>
        <TexBox2>
          <TexBox3>
            <div>Redemption of liquid assets</div>
            <div style={{ display: "flex" }}>
              {Token0Amount ? Token0Amount?.toFixed(6) : <LoadingBox height={12} />}
              {Token0Name}/
              {Token1Amount ? Token1Amount?.toFixed(6) : <LoadingBox height={12} />} {Token1Name}
            </div>
          </TexBox3>
          {Ellipsis ? null :
            <TexBox3>
              <div>Amount to Trade</div>
              <div>{AmountToTrade == 0 ? "0.00" : AmountToTrade?.toFixed(6)} {borrowToken0 ? Token0Name : Token1Name}</div>
            </TexBox3>
          }
          <TexBox3>
            <div>Debt Value</div>
            <div>
              {DebtValue == 0 ? "0.00" : DebtValue?.toFixed(6)}{" "}
              {borrowToken0 ? Token0Name : Token1Name}
            </div>
          </TexBox3>
        </TexBox2>
        <TexBox1>

          {!Ellipsis ? null :
            <TexBox3>
              <div>Price Impact and Trading Fees</div>
              <div style={{ color: "#f04848" }}>
                {TradeFees}{borrowToken0 ? Token0Name : Token1Name}
                (0.04%)
              </div>
            </TexBox3>
          }
          <TexBox3>
            <div>You will receive approximately</div>
            <div>
              {ReceiveToken0 != undefined || ReceiveToken1 != undefined ?
                <>
                  {ReceiveToken0 ? Number(ReceiveToken0)?.toFixed(6)
                    : "0.0"}{Token0Name}+{" "}
                  {ReceiveToken1 ? Number(ReceiveToken1)?.toFixed(6) : "0.0"} {Token1Name}
                </> : <LoadingBox height={12} />}
            </div>
          </TexBox3>
        </TexBox1>
        <Button w={0} h={40} onClick={ConfirmClick}>
          Confirm
        </Button>
      </Box>
    </>
  );
};

const Box = styled.div`
  width: 552px;
  /* height: 620px; */
  background-color: rgb(25, 25, 31);
  padding: 30px;
  border-radius: 10px;
  position: fixed;
  top: 50%;
  left: 50%;
  margin-top: -310px;
  margin-left: -276px;
  z-index: 1001;
  animation: fade-in-top 0.6s cubic-bezier(0.39, 0.575, 0.565, 1) both;
  @keyframes fade-in-top {
    0% {
      transform: translateY(-50px);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;
const BG = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  backdrop-filter: blur(20px);
`;
const TitleBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  font-size: 18px;
  font-weight: 700;
`;
const CloseBtn = styled.img`
  width: 30px;
  cursor: pointer;
  transition: all 0.3s;
  :hover {
    transform: rotate(180deg);
  }
`;
const TexBox1 = styled.div`
  /* padding: 20px 0; */
  color: #fff;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  /* display: flex; */
  /* justify-content: space-between; */
  margin-top: 15px;
  margin-bottom: 30px;
`;
const TexBox2 = styled.div`
  /* padding: 15px 0; */
`;
const TexBox3 = styled.div`
  color: #fff;
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
`;
const TipsBox = styled.div`
  padding: 10px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  font-size: 12px;
  border-radius: 5px;
  margin-bottom: 10px;
  width: 100%;
  color: rgba(255, 255, 255, 0.5);
  display: flex;
  margin-top: 20px;
`;
const BtnBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;
