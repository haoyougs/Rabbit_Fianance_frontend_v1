import React, { useEffect, useState } from "react";
import styled from "styled-components";
import closeImg from "assets/close@2x.png";
import { TokenIcon } from "components/icon/tokenIcon";
import { Button } from "components/button/button";
import { AssetsBorrowed } from "hooks/useSupply";
import { PANCAKE_ROUTE } from "config/LPAddress";
import { ethers } from "ethers";

interface parameter {
  onClick: () => void;
  Data: any;
}

export const ClosePositionPage: React.FC<parameter> = ({ onClick, Data }) => {
  console.log(Data);
  //token0和token1的数量；
  const [Token0Amount, setToken0Amount] = useState<any>();
  const [Token1Amount, setToken1Amount] = useState<any>();

  //需要去交易的数量 Amount to Tradea
  let [AmountToTrade, setAmountToTrade] = useState<any>();

  // 非稳定币的单币价格
  let [CurrencyPrice, setCurrencyPrice] = useState<any>();

  useEffect(() => {
    // 获取币种价格
    AssetsBorrowed(
      PANCAKE_ROUTE,
      //wbnb的地址暂时放在这里，待更换
      "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
      Data.token0
    ).then((res) => {
      //赋值单币价格
      setCurrencyPrice(res);
      // 算出token0的数量
      let token0Amount =
        Number(ethers.utils.formatUnits(Data.positionsValue, 18)) / 2;
      setToken0Amount(token0Amount);
      // 算出token1的数量
      let token1Amount = token0Amount / res;
      setToken1Amount(token1Amount);

      // 获取需要去交易的数量
      if (Data.token0 == Data.borrowToken) {
        if (
          Number(ethers.utils.formatUnits(Data.totalValue, 18)) < token0Amount
        ) {
          setAmountToTrade(0);
        } else {
          let borrowToken0 =
            Number(ethers.utils.formatUnits(Data.totalValue, 18)) -
            token0Amount;
          setAmountToTrade(borrowToken0);
        }
      }
      if (Data.token1 == Data.borrowToken) {
        if (
          Number(ethers.utils.formatUnits(Data.totalValue, 18)) < token1Amount
        ) {
          setAmountToTrade(0);
        } else {
          let borrowToken1 =
            Number(ethers.utils.formatUnits(Data.totalValue, 18)) -
            token1Amount;
          setAmountToTrade(borrowToken1);
        }
      }
    });
  }, [Data]);

  //用户将会得到的币的数量
  const [ReceiveToken0, setReceiveToken0] = useState<any>();
  const [ReceiveToken1, setReceiveToken1] = useState<any>();

  // 判断用户要那个币
  const [MinimizeTrading, setMinimizeTrading] = useState<any>(true);
  const [Token0, setToken0] = useState<any>(false);
  const [Token1, setToken1] = useState<any>(false);
  //两个都要
  const MinimizeTradingClick = () => {
    setMinimizeTrading(true);
    setToken0(false);
    setToken1(false);
    // ?????? 去交易的数量小于等于0？
    if (AmountToTrade <= 0) {
      setReceiveToken0(Token0Amount);
      setReceiveToken1(Token1Amount);
    }
    // 判断如果token0 是债务的计算
    if (Data.token0 == Data.borrowToken) {
      let j1 =
        Token0Amount - Number(ethers.utils.formatUnits(Data.totalValue, 18));
      let j2 = Token0Amount + j1;
      let j3 = j2 / CurrencyPrice;
      let j4;
      if (j1 <= 0) {
        j4 = 0;
        setReceiveToken1(j4);
      } else {
        j4 = j1;
        setReceiveToken1(j4);
      }
      setReceiveToken1(j3);
    }
    // 判断如果token1 是债务的计算
    if (Data.token1 == Data.borrowToken) {
      let j1 =
        Token1Amount - Number(ethers.utils.formatUnits(Data.totalValue, 18));
      let j2 = Token1Amount + j1;
      let j3 = j2 / CurrencyPrice;
      let j4;
      if (j1 <= 0) {
        j4 = 0;
        setReceiveToken0(j4);
      } else {
        j4 = j1;
        setReceiveToken1(j4);
      }
      setReceiveToken1(j3);
    }
  };
  //要token0
  const Token0Click = () => {
    setMinimizeTrading(false);
    setToken0(true);
    setToken1(false);
    let j1 =
      Number(ethers.utils.formatUnits(Data.positionsValue, 18)) -
      Number(ethers.utils.formatUnits(Data.totalValue, 18));
    setReceiveToken0(j1);
    setReceiveToken1(0);
  };
  // 要token1
  const Token1Click = () => {
    setMinimizeTrading(false);
    setToken0(false);
    setToken1(true);
    let j1 =
      Number(ethers.utils.formatUnits(Data.positionsValue, 18)) -
      Number(ethers.utils.formatUnits(Data.totalValue, 18));
    let j2 = j1 / CurrencyPrice;
    setReceiveToken0(0);
    setReceiveToken1(j2);
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
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="sc-ksdxAp fdYigH"
            >
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
            </svg>
          </div>

          <div style={{ marginLeft: 15 }}>
            {MinimizeTrading
              ? `We will convert the minimum required amount of tokens into BNB to
            pay back the debt and return the remaining assets to you. This can
            potentially save on slippage and trading fees.`
              : null}
            {Token0
              ? `Your position value will all be converted to USDT and returned to you after paying back the debt.`
              : null}
            {Token1
              ? `Your position value will all be converted to BNB and returned to you after paying back the debt.`
              : null}
          </div>
        </TipsBox>
        <BtnBox>
          <Button
            w={150}
            h={36}
            onClick={MinimizeTradingClick}
            Select={MinimizeTrading}
          >
            Minimize Trading
          </Button>
          <Button w={150} h={36} onClick={Token0Click} Select={Token0}>
            USDT
          </Button>
          <Button w={150} h={36} onClick={Token1Click} Select={Token1}>
            BNB
          </Button>
        </BtnBox>
        <TexBox2>
          <TexBox3>
            <div>Redemption of liquid assets</div>
            <div>
              {Token0Amount?.toFixed(4)} USDT/{Token1Amount?.toFixed(4)} BNB
            </div>
          </TexBox3>
          <TexBox3>
            <div>Amount to Trade</div>
            <div>{AmountToTrade?.toFixed(4)} USDT</div>
          </TexBox3>
          <TexBox3>
            <div>Debt Value</div>
            <div>
              {Number(ethers.utils.formatUnits(Data.totalValue, 18))?.toFixed(
                4
              )}{" "}
              USDT
            </div>
          </TexBox3>
        </TexBox2>
        <TexBox1>
          <div>You will receive approximately</div>
          <div>
            {ReceiveToken0 ? Number(ReceiveToken0)?.toFixed(6) : "0.0"} USDT +{" "}
            {ReceiveToken1 ? Number(ReceiveToken1)?.toFixed(6) : "0.0"} BNB
          </div>
        </TexBox1>

        <Button w={0} h={40}>
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
  padding: 20px 0;
  color: #fff;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  justify-content: space-between;
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
