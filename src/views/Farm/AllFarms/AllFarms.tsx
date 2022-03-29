import React, { useEffect, useState } from "react";
import { SVGloading1, SVGloading2, SVGloading3 } from "components/Loading/SVG";
import { BgBox } from "components/backgroundBox/background";
import { AuditBox } from "components/backgroundBox/AuditBox";
import { OldBtn, Button } from "components/button/button";
import styled from "styled-components";
import { TipsIcon, MinTipsBar } from "components/icon";
import { TokenIcon } from "components/icon/tokenIcon";
import { GetTvlEvent } from "state/AllFarm/hooks";
import store from "state";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import shangIcon from "assets/xiangshang.png";
import xiaIcon from "assets/xiangxia.png";
import {
  WBNB_USDT_LP,
  PANCAKE_ROUTE,
  FarmPancakeUSDT_BNB,
} from "config/LPAddress";
import { LoadingBox } from "components/Loading";
import { NumberRoll } from "components/Loading";

export const AllFarmsPage: React.FC = () => {
  const TvlEvent = GetTvlEvent();
  useEffect(() => {
    TvlEvent({
      routeAddress: PANCAKE_ROUTE,
      LPaddress: `${FarmPancakeUSDT_BNB.USDT_BNB_LP}`,
      LPtokenAddress0: `${FarmPancakeUSDT_BNB.PancakeUSDT_BNB_WBNBtoken}`,
      LPtokenAddress1: `${FarmPancakeUSDT_BNB.PancakeUSDT_BNB_USDTtoken}`,
      debtToken: `${FarmPancakeUSDT_BNB.PancakeUSDT_BNBdebtToken}`,
    });
  }, [TvlEvent]);
  const Store = useSelector(store.getState);
  let listdata = Store.AllFroms
  let [Data, setData] = useState(listdata);
  const [All, setAll] = useState<boolean>(true);
  const [PancakeSwap, setPancakeSwap] = useState<boolean>(false);
  const [MDEX, setMDEX] = useState<boolean>(false);
  useEffect(()=>{
    setData(listdata)
  },[listdata])

  //筛选功能——根据交易所筛选
  const AllClick = () => {
    let Data = Store.AllFroms;
    setData(Data);
    setAll(true);
    setPancakeSwap(false);
    setMDEX(false);
  };
  const PancakeSwapClick = () => {
    let Data = Store.AllFroms.filter((el) => el.type === "PancakeSwap");
    setData(Data);
    setAll(false);
    setPancakeSwap(true);
    setMDEX(false);
  };
  const MDEXClick = () => {
    let Data = Store.AllFroms.filter((el) => el.type === "MDEX");
    setData(Data);
    setAll(false);
    setPancakeSwap(false);
    setMDEX(true);
  };
  //筛选功能儿——根据币种筛选；
  const [TokenBtn1, setTokenBtn1] = useState(true);
  const [TokenBtn2, setTokenBtn2] = useState(false);
  const [TokenBtn3, setTokenBtn3] = useState(false);
  const [TokenBtn4, setTokenBtn4] = useState(false);
  const [TokenBtn5, setTokenBtn5] = useState(false);
  const [TokenBtn6, setTokenBtn6] = useState(false);
  const [TokenBtn7, setTokenBtn7] = useState(false);
  const [TokenBtn8, setTokenBtn8] = useState(false);

  const tokenAllClick = (e?: any) => {
    let Data = Store.AllFroms;
    setData(Data);
    setTokenBtn1(true);
    setTokenBtn2(false);
    setTokenBtn3(false);
    setTokenBtn4(false);
    setTokenBtn5(false);
    setTokenBtn6(false);
    setTokenBtn7(false);
    setTokenBtn8(false);
  };
  const tokenSTABLEclick = () => {
    let Data = Store.AllFroms.filter((el) => el.type2 === 0);
    setData(Data);
    setTokenBtn1(false);
    setTokenBtn2(true);
    setTokenBtn3(false);
    setTokenBtn4(false);
    setTokenBtn5(false);
    setTokenBtn6(false);
    setTokenBtn7(false);
    setTokenBtn8(false);
  };
  const tokenRABBITclick = () => {
    let Data = Store.AllFroms.filter(
      (e) => e.LPtokenName.toLowerCase().indexOf("RABBIT".toLowerCase()) !== -1
    );
    setData(Data);
    setTokenBtn1(false);
    setTokenBtn2(false);
    setTokenBtn3(true);
    setTokenBtn4(false);
    setTokenBtn5(false);
    setTokenBtn6(false);
    setTokenBtn7(false);
    setTokenBtn8(false);
  };
  const tokenUSDTclick = () => {
    let Data = Store.AllFroms.filter(
      (e) => e.LPtokenName.toLowerCase().indexOf("USDT".toLowerCase()) !== -1
    );
    setData(Data);
    setTokenBtn1(false);
    setTokenBtn2(false);
    setTokenBtn3(false);
    setTokenBtn4(true);
    setTokenBtn5(false);
    setTokenBtn6(false);
    setTokenBtn7(false);
    setTokenBtn8(false);
  };
  const tokenBNBclick = () => {
    let Data = Store.AllFroms.filter(
      (e) => e.LPtokenName.toLowerCase().indexOf("BNB".toLowerCase()) !== -1
    );
    setData(Data);
    setTokenBtn1(false);
    setTokenBtn2(false);
    setTokenBtn3(false);
    setTokenBtn4(false);
    setTokenBtn5(true);
    setTokenBtn6(false);
    setTokenBtn7(false);
    setTokenBtn8(false);
  };
  const tokenBUSDclick = () => {
    let Data = Store.AllFroms.filter(
      (e) => e.LPtokenName.toLowerCase().indexOf("BUSD".toLowerCase()) !== -1
    );
    setData(Data);
    setTokenBtn1(false);
    setTokenBtn2(false);
    setTokenBtn3(false);
    setTokenBtn4(false);
    setTokenBtn5(false);
    setTokenBtn6(true);
    setTokenBtn7(false);
    setTokenBtn8(false);
  };
  const tokenETHclick = () => {
    let Data = Store.AllFroms.filter(
      (e) => e.LPtokenName.toLowerCase().indexOf("ETH".toLowerCase()) !== -1
    );
    setData(Data);
    setTokenBtn1(false);
    setTokenBtn2(false);
    setTokenBtn3(false);
    setTokenBtn4(false);
    setTokenBtn5(false);
    setTokenBtn6(false);
    setTokenBtn7(true);
    setTokenBtn8(false);
  };
  const tokenBTCBclick = () => {
    let Data = Store.AllFroms.filter(
      (e) => e.LPtokenName.toLowerCase().indexOf("BTCB".toLowerCase()) !== -1
    );
    setData(Data);
    setTokenBtn1(false);
    setTokenBtn2(false);
    setTokenBtn3(false);
    setTokenBtn4(false);
    setTokenBtn5(false);
    setTokenBtn6(false);
    setTokenBtn7(false);
    setTokenBtn8(true);
  };
  return (
    <>
      <Box>
        {/* 分类1 */}
        <TopBox>
          <Button w={135} h={42} mr={10} onClick={AllClick} Select={All}>
            All
          </Button>
          <Button
            w={135}
            h={42}
            mr={10}
            onClick={PancakeSwapClick}
            Select={PancakeSwap}
          >
            PancakeSwap
          </Button>
          <Button w={135} h={42} mr={10} onClick={MDEXClick} Select={MDEX}>
            MDEX
          </Button>
        </TopBox>
        <TitleBox>
          <Ldiv>
            <TipsIcon>Pools</TipsIcon>
            <MinTipsBar>
              After V3 upgrade, please close the leveraged farming and trading
              position on old and reopen on V3 to get the RABBIT reward
            </MinTipsBar>
          </Ldiv>
          <OldBtn />
        </TitleBox>
        {/* 分类2 */}
        <TheadBox2>
          <Button
            w={115}
            h={37}
            mr={10}
            Select={TokenBtn1}
            onClick={tokenAllClick}
          >
            ALL
          </Button>
          <Button
            w={115}
            h={37}
            mr={10}
            Select={TokenBtn2}
            onClick={tokenSTABLEclick}
          >
            STABLE
          </Button>
          <Button
            w={115}
            h={37}
            mr={10}
            Select={TokenBtn3}
            onClick={tokenRABBITclick}
          >
            RABBIT
          </Button>
          <Button
            w={115}
            h={37}
            mr={10}
            Select={TokenBtn4}
            onClick={tokenUSDTclick}
          >
            USDT
          </Button>
          <Button
            w={115}
            h={37}
            mr={10}
            Select={TokenBtn5}
            onClick={tokenBNBclick}
          >
            BNB
          </Button>
          <Button
            w={115}
            h={37}
            mr={10}
            Select={TokenBtn6}
            onClick={tokenBUSDclick}
          >
            BUSD
          </Button>
          <Button
            w={115}
            h={37}
            mr={10}
            Select={TokenBtn7}
            onClick={tokenETHclick}
          >
            ETH
          </Button>
          <Button
            w={115}
            h={37}
            mr={10}
            Select={TokenBtn8}
            onClick={tokenBTCBclick}
          >
            BTCB
          </Button>
        </TheadBox2>
        {/* 表格的顶部分类标题 */}
        <TheadBox>
          <TdBox>Pool</TdBox>
          <TdBox>Yield (APY)</TdBox>
          <TdBox>TVL</TdBox>
          <TdBox>Leverage</TdBox>
          <TdBox className="TdWdith"> </TdBox>
        </TheadBox>
        <TbodyBox>
          {Data.map((item, key) => (
            <TrBox key={key}>
              <TdBox>
                <TokenIcon IconName={item.LPtokenName} />
                <div>
                  <div style={{ marginLeft: 10 }}>
                    {item.LPtokenName ? item.LPtokenName : <LoadingBox />}
                  </div>
                  <div style={{ marginLeft: 10 }}>
                    {item.type ? item.type : <LoadingBox />}
                  </div>
                </div>
              </TdBox>
              <TdBox>{item.APY === 0 ? <LoadingBox /> : item.APY}</TdBox>
              <TdBox>{item.TVL === 0 ? <LoadingBox /> : "$" + item.TVL}</TdBox>
              <TdBox>
                <DoubleBtnBox>
                  <NumberBox>{item.Leverage}</NumberBox>
                  <BtnDiv>
                    <Btn1>
                      <Icon src={shangIcon} />
                    </Btn1>
                    <Btn2>
                      <Icon src={xiaIcon} />
                    </Btn2>
                  </BtnDiv>
                </DoubleBtnBox>
              </TdBox>
              <TdBox className="TdWdith">
                <Link to={`/positions/${'USDT-BNB'}`}>
                  <Button w={100} h={35} ml={0}>
                    {item.Leverage} Farm
                  </Button>
                </Link>
              </TdBox>
            </TrBox>
          ))}
        </TbodyBox>
      </Box>

      <AuditBox />
    </>
  );
};

const TopBox = styled.div`
  display: flex;
  position: fixed;
  top: 50px;
  left: 320px;
  z-index: 1000;
`;
const Box = styled(BgBox)`
  padding: 20px;

  .TdWdith {
    min-width: 220px;
  }
`;
const TitleBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Ldiv = styled.div`
  display: flex;
  align-items: center;
`;
const TheadBox = styled.div`
  width: 100%;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
  padding: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
`;
const TheadBox2 = styled.div`
  width: 100%;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
  padding: 20px;
  display: flex;
`;
const TdBox = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;
const TbodyBox = styled.div``;
const TrBox = styled.div`
  width: 100%;
  height: 100px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
  padding: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
`;

const DoubleBtnBox = styled.div`
  width: 80px;
  height: 40px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  display: flex;
  overflow: hidden;
`;
const NumberBox = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const BtnDiv = styled.div`
  flex: 1;
  max-width: 27px;
  border-left: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  flex-direction: column;
`;
const Btn1 = styled.div`
  flex: 1;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.5s;

  :hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;
const Btn2 = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.5s;
  :hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;
const Icon = styled.img`
  width: 15px;
  height: 15px;
  opacity: 0.6;
  transition: all 0.1s;
  :hover {
    opacity: 1;
  }
  :active {
    transform: scale(0.7);
  }
`;
