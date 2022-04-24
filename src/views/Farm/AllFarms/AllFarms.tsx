import React, { useEffect, useState, useCallback } from "react";
import { SVGloading1, SVGloading2, SVGloading3 } from "components/Loading/SVG";
import { BgBox } from "components/backgroundBox/background";
import { AuditBox } from "components/backgroundBox/AuditBox";
import { OldBtn, Button } from "components/button/button";
import styled from "styled-components";
import { TipsIcon, MinTipsBar } from "components/icon";
import { TokenIcon } from "components/icon/tokenIcon";
import { GetTvlEvent, UpdateTvlLeverage } from "state/AllFarm/hooks";
import store from "state";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import shangIcon from "assets/xiangshang.png";
import xiaIcon from "assets/xiangxia.png";
import {
  WBNB_USDT_LP,
  PANCAKE_ROUTE,
  FarmMdexRABBIT_BUSD,
  FarmAddressArrs,
} from "config/LPAddress";
import { LoadingBox } from "components/Loading";
export const AllFarmsPage: React.FC = () => {
  //class tab
  const SwitchClassButtonArrs = ['ALL', 'PancakeSwap', 'MDEX'];
  //type tab
  const SwitchButtonArrs = ['ALL', 'STABLE', 'RABBIT', 'USDT', 'BNB', 'BUSD', 'ETH', 'BTCB',];
  const [Data, setData] = useState<any[]>([]);
  //请求事件
  const TvlEvent = GetTvlEvent();
  const UpdateLeverage = UpdateTvlLeverage();
  //获取Tvl
  const getTvlEvent = useCallback(() => {
    //循环事件
    FarmAddressArrs.forEach(async (item, index) => {
      await TvlEvent({
        routeAddress: PANCAKE_ROUTE,
        LPaddress: item.LP,
        LPtokenAddress0: item.LPtokenAddress0,
        LPtokenAddress1: item.LPtokenAddress1,
        debtToken: item.debtToken,
        index: index
      });
    })
  }, [TvlEvent])
  useEffect(getTvlEvent, []);
  const Store = useSelector(store.getState);
  let listdata = Store.AllFroms
  // console.log(111, listdata)
  useEffect(() => {
    setData(listdata)
  }, [listdata])
  //筛选功能儿——根据币种筛选；
  const [CurrentTab, setCurrentTab] = useState<number>(0);
  const FilterList = (key: number) => {
    setCurrentTab(key)
  }
  const switchList = useCallback(() => {
    let Data = null;
    switch (CurrentTab) {
      case 0:
        Data = Store.AllFroms;
        setData(Data);
        break;
      case 1:
        Data = Store.AllFroms.filter((el) => el.type2 === 0);
        setData(Data);
        break;
      case 2:
        Data = Store.AllFroms.filter(
          (e) => e.LPtokenName.toLowerCase().indexOf("RABBIT".toLowerCase()) !== -1
        );
        setData(Data);
        break;
      case 3:
        Data = Store.AllFroms.filter(
          (e) => e.LPtokenName.toLowerCase().indexOf("USDT".toLowerCase()) !== -1
        );
        setData(Data);
        break;
      case 4:
        Data = Store.AllFroms.filter(
          (e) => e.LPtokenName.toLowerCase().indexOf("BNB".toLowerCase()) !== -1
        );
        setData(Data);
        break;
      case 5:
        Data = Store.AllFroms.filter(
          (e) => e.LPtokenName.toLowerCase().indexOf("BUSD".toLowerCase()) !== -1
        );
        setData(Data);
        break;
      case 6:
        Data = Store.AllFroms.filter(
          (e) => e.LPtokenName.toLowerCase().indexOf("ETH".toLowerCase()) !== -1
        );
        setData(Data);
        break;
      case 7:
        Data = Store.AllFroms.filter(
          (e) => e.LPtokenName.toLowerCase().indexOf("BTCB".toLowerCase()) !== -1
        );
        setData(Data);
        break;
      case 8:
        Data = Store.AllFroms;
        setData(Data);
        break;
      case 9:
        Data = Store.AllFroms.filter((el) => el.type === "PancakeSwap");
        setData(Data);
        break;
      case 10:
        Data = Store.AllFroms.filter((el) => el.type === "MDEX");
        setData(Data);
        break;
    }
  }, [CurrentTab])
  useEffect(switchList, [switchList]);
  //点击farm杠杆倍数
  const updateLeverage = (item: any, index: number, type: string) => {
    UpdateLeverage({
      MaxLeverage: item.MaxLeverage,
      Leverage: item.Leverage,
      index: index,
      type: type
    })
  }
  return (
    <>
      <Box>
        {/* 分类1 */}
        <TopBox>
          {
            SwitchClassButtonArrs.map((item, key) => (
              <Button key={key} w={135} h={42} mr={10} onClick={() => FilterList(key + 8)} Select={CurrentTab === (key + 8)}>
                {item}
              </Button>
            ))
          }
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
          {
            SwitchButtonArrs.map((item, key) => (
              <Button key={key} w={115} h={37} mr={10} Select={(CurrentTab === key)}
                onClick={() => FilterList(key)} >  {item}
              </Button>
            ))
          }
        </TheadBox2>
        {/* 表格的顶部分类标题 */}
        <TheadBox>
          <TdBox style={{ maxWidth: "29%", minWidth: "200px" }}>Pool</TdBox>
          <TdBox style={{ maxWidth: "20%" }}>Yield (APY)</TdBox>
          <TdBox style={{ maxWidth: "20%" }}>TVL</TdBox>
          <TdBox style={{ maxWidth: "20%" }}>Leverage</TdBox>
          <TdBox className="TdWdith"> </TdBox>
        </TheadBox>
        <TbodyBox>
          {Data.map((item, key) => (
            <TrBox key={key}>
              <TdBox style={{ maxWidth: "29%", minWidth: "200px" }}>
                <TokenIcon IconName={item.LPtokenName} />
                <div>
                  <div style={{ marginLeft: 10, color: "#fff" }}>
                    {item.LPtokenName ? item.LPtokenName : <LoadingBox />}
                  </div>
                  <div style={{ marginLeft: 10 }}>
                    {item.type ? item.type : <LoadingBox />}
                  </div>
                  {item.New ?
                    <div style={{ marginTop: 10, }}>
                      <Tips>{item.New}</Tips>
                      <Tipsfff style={{ color: "fff" }}>{item.Featured}</Tipsfff>
                    </div>
                    : null}
                  {item.Ellipsis ?
                    <div style={{ marginTop: 10, display: "flex" }}>
                      <Tips>{item.Leverage}X</Tips>
                      <Tipsfff>{item.Ellipsis}</Tipsfff>
                    </div>
                    : null}
                </div>
              </TdBox>
              <TdBox style={{ maxWidth: "20%" }}>{item.APY === 0 ? <LoadingBox /> : item.APY}</TdBox>
              <TdBox style={{ color: "#fff", maxWidth: "20%" }}>{item.TVL == undefined ? <LoadingBox /> : "$" + item.TVL}</TdBox>
              <TdBox style={{ maxWidth: "20%" }}>
                <DoubleBtnBox>
                  <NumberBox>{item.Leverage}</NumberBox>
                  <BtnDiv>
                    <Btn1 onClick={() => updateLeverage(item, key, 'up')}>
                      <Icon src={shangIcon} />
                    </Btn1>
                    <Btn2 onClick={() => updateLeverage(item, key, 'down')}>
                      <Icon src={xiaIcon} />
                    </Btn2>
                  </BtnDiv>
                </DoubleBtnBox>
              </TdBox>
              <TdBox className="TdWdith">
                <Link to={`/positions/${item.New_LPtokenName ? item.New_LPtokenName : item.LPtokenName}/${item.index}/${item.Leverage}/${item.MaxLeverage}`}>
                  <Button w={100} h={35} ml={0}>
                    {item.Leverage}X Farm
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
    max-width: 100px;
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
const TbodyBox = styled.div`
/* max-height:400px;
overflow-y: auto; */
`;
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
const Tips = styled.span`
  padding: 2px 12px;
    border-radius: 2px;
    background-color: rgb(84, 71, 120);
    color: rgb(248, 182, 41);
    font-size: 12px;
    margin: 5px;
`
const Tipsfff = styled.span`
  padding: 2px 12px;
    border-radius: 2px;
    background-color: rgb(84, 71, 120);
    color: rgb(255, 255, 255);
    font-size: 12px;
    margin: 5px;
`