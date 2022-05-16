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
import FarmApr from "assets/page/FarmApr.png"
import { FarmApyContainer } from "./FarmApyContainer"
import { Popover } from 'antd';
import { LoadingBox } from "components/Loading";
import { BNB_ADDRESS, W_BNB_ADDRESS } from "config/address";
import {
  getFarmsAPR, getTotalApr, getRabbitRewards,
  getBorrowApr
} from "hooks/useFarms";
import {
  getMdexTradeFree,
  getPancakeTradeFree
} from "hooks/useFarms";
import { useWeb3React } from "@web3-react/core";
import { subStringNum } from "utils/subStringNum";
import { T } from "antd/lib/upload/utils";
import { borrowAprCommon } from "utils/BorrowApr";
import { UpdateTvlAPY } from "state/AllFarm/hooks";
import { getApy } from "utils/ApyCommon";

export const AllFarmsPage: React.FC = () => {
  const { account, library } = useWeb3React();
  const UpdateAPY = UpdateTvlAPY();
  //class tab
  const SwitchClassButtonArrs = ['ALL', 'PancakeSwap', 'MDEX'];
  //type tab
  const SwitchButtonArrs = ['ALL', 'STABLE', 'RABBIT', 'USDT', 'BNB', 'BUSD', 'ETH', 'BTCB',];
  const [Data, setData] = useState<any[]>([]);
  const [TokenArr, setTokenArr] = useState<any[]>([]);
  const getTokenArr = () => {
    let arr = [];
    for (let item of FarmAddressArrs) {
      if (item?.BorrowToken0?._Pid && item?.BorrowToken1?._Pid) {
        arr.push([
          {
            name: item?.BorrowToken0.name,
            select: true,
            AddressApr: item?.BorrowToken0.name == "BNB" ? BNB_ADDRESS : item?.LPtokenAddress0
          },
          {
            name: item?.BorrowToken1.name,
            select: false,
            AddressApr: item?.BorrowToken1.name == "BNB" ? BNB_ADDRESS : item?.LPtokenAddress1
          }]
        )
      } else if (item?.BorrowToken0?._Pid) {
        arr.push([{
          name: item?.BorrowToken0.name,
          select: true
        }])
      } else if (item?.BorrowToken1?._Pid) {
        arr.push([{
          name: item?.BorrowToken1.name,
          select: true
        }])
      }
    }
    setTokenArr(arr)
  }
  //请求事件
  const TvlEvent = GetTvlEvent();
  const UpdateLeverage = UpdateTvlLeverage();
  //获取Tvl
  const getTvlEvent = async () => {
    const MdexTradeFree = await getMdexTradeFree();
    const PancakeTradeFree = await getPancakeTradeFree();
    //循环事件
    for (let i = 0; i < FarmAddressArrs.length; i++) {
      let AddressApr;
      let Names;
      //假如token1有_Pid
      if (!FarmAddressArrs[i]?.BorrowToken0?._Pid && FarmAddressArrs[i]?.BorrowToken1?._Pid) {
        AddressApr = FarmAddressArrs[i].LPtokenAddress1;
        Names = FarmAddressArrs[i]?.BorrowToken1.name
      } else {
        AddressApr = FarmAddressArrs[i].LPtokenAddress0;
        Names = FarmAddressArrs[i]?.BorrowToken0.name
      }
      if (Names == "BNB") {
        AddressApr = BNB_ADDRESS
      }
      await TvlEvent({
        routeAddress: PANCAKE_ROUTE,
        LPaddress: FarmAddressArrs[i].LP,
        LPtokenAddress0: FarmAddressArrs[i].LPtokenAddress0,
        LPtokenAddress1: FarmAddressArrs[i].LPtokenAddress1,
        debtToken: FarmAddressArrs[i].debtToken,
        index: i,
        type: FarmAddressArrs[i].Type,
        tid: FarmAddressArrs[i].Tid,
        goblin: FarmAddressArrs[i].Goblin,
        FairLaunch_Pid: FarmAddressArrs[i].FairLaunch_Pid,
        //计算Apy用的参数
        Address: FarmAddressArrs[i].LPtokenAddress0,
        AddressApr: AddressApr,
        MdexTradeFree: MdexTradeFree,
        PancakeTradeFree: PancakeTradeFree
      });
    }
  }
  useEffect(() => {
    getTokenArr()
    getTvlEvent()
  }, []);
  const Store = useSelector(store.getState);
  let listdata = Store.AllFroms

  //筛选功能儿——根据币种筛选；
  const [CurrentTab, setCurrentTab] = useState<number>(0);
  const FilterList = (key: number) => {
    setCurrentTab(key)
    switchList(key);
  }
  const switchList = (key: any) => {
    let Data = null;
    switch (key) {
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
  }
  useEffect(() => {
    // console.log(listdata);
    setData(listdata)
    switchList(CurrentTab)
  }, [listdata])
  //点击farm杠杆倍数
  const updateLeverage = async (item: any, index: number, type: string) => {
    await UpdateLeverage({
      MaxLeverage: item.MaxLeverage,
      Leverage: item.Leverage,
      index: index,
      type: type,
      APY: item.APY,
    });
  }
  const [visibleKey, setvisibleKey] = useState<any>(null);
  const TotalAPR = (data: any, Leverage: any) => {
    const Farm_Apr = data.Farm_Apr;
    const Trading_Free = data.Trading_Free;
    const RABBIT_Rewards = data.RABBIT_Rewards;
    const Borrow_Apr = data.Borrow_Apr;
    if (Farm_Apr || Trading_Free || RABBIT_Rewards || Borrow_Apr) {
      // console.log(Trading_Free)
      const total_apr = Farm_Apr * Leverage +
        Trading_Free * Leverage +
        RABBIT_Rewards * Leverage -
        Borrow_Apr * (Leverage - 1);
      return total_apr
    } else {
      return 0
    }
  }
  const DailyAPR = (data: any, Leverage: any) => {
    const Farm_Apr = data.Farm_Apr;
    const Trading_Free = data.Trading_Free;
    const RABBIT_Rewards = data.RABBIT_Rewards;
    const Borrow_Apr = data.Borrow_Apr;
    if (Farm_Apr || Trading_Free || RABBIT_Rewards || Borrow_Apr) {
      const total_apr = Farm_Apr * Leverage +
        Trading_Free * Leverage +
        RABBIT_Rewards * Leverage -
        Borrow_Apr * (Leverage - 1);
      const Daily = total_apr / 365;
      return Daily
    } else {
      return 0
    }
  }
  const BorrowApr = async (AddressApr: any, data: any) => {
    const Borrow = await getBorrowApr(AddressApr);
    const Borrow_Apr = borrowAprCommon(Borrow.BorrowedValue, Borrow.DepositValue);
    const Farm_Apr = data.APY.Farm_Apr;
    const Trading_Free = data.APY.Trading_Free;
    const RABBIT_Rewards = data.APY.RABBIT_Rewards;
    const Leverage = data.Leverage;
    const APY = getApy(Farm_Apr, Trading_Free, RABBIT_Rewards, Borrow_Apr, Leverage);
    UpdateAPY({
      index: data.index,
      APY: { Farm_Apr, Trading_Free, RABBIT_Rewards, Borrow_Apr, Leverage, APY }
    })
  }
  const TokenArrSelect = (item: any, t: any) => {
    const newTokenArr = JSON.parse(JSON.stringify(TokenArr));
    const index = item.index;
    newTokenArr[index][t].select = false;
    if (newTokenArr[index].length == 1) {
      return;
    }
    if (newTokenArr[index][0]) {
      newTokenArr[index][0].select = false;
    }
    if (newTokenArr[index][1]) {
      newTokenArr[index][1].select = false;
    }
    newTokenArr[index][t].select = true;
    // console.log(index, t);
    setTokenArr([]);
    setTokenArr(newTokenArr);
    const AddressApr = newTokenArr[index][t].AddressApr;
    BorrowApr(AddressApr, item);
  }
  return (
    <>
      <TopBox>
        {
          SwitchClassButtonArrs.map((item, key) => (
            <Button key={key} w={135} h={42} mr={10} SelectBG="#f8b629"
              SelectColor="#fff"
              onClick={() => FilterList(key + 8)} Select={CurrentTab === (key + 8)}>
              {item}
            </Button>
          ))
        }
      </TopBox>
      <MTopBox>
        {
          SwitchClassButtonArrs.map((item, key) => (
            <Button key={key} w={135} h={37} mr={10}
              SelectBG="#f8b629" SelectColor="#fff"
              onClick={() => FilterList(key + 8)} Select={CurrentTab === (key + 8)}>
              {item}
            </Button>
          ))
        }
      </MTopBox>
      <Box>
        {/* 分类1 */}
        <TitleBox>
          <Ldiv>
            <TipsIcon>Pools</TipsIcon>
            <MinTipsBar>
              After V3 upgrade, please close the leveraged farming and trading
              position on old and reopen on V3 to get the RABBIT reward
            </MinTipsBar>
          </Ldiv>
          <Mdiv>
            <TipsIcon>Pools</TipsIcon>
          </Mdiv>
          <OldBtn />
        </TitleBox>
        <MobileTips>
          <MinTipsBar>
            Users do not have to withdraw assets from Vaults, you can just
            re-stake your ibToken to the V3 Stake page
          </MinTipsBar>
        </MobileTips>
        {/* 分类2 */}
        <TheadBox2>
          {
            SwitchButtonArrs.map((item, key) => (
              <Button key={key} w={115} h={42} mr={10} Select={(CurrentTab === key)}
                onClick={() => FilterList(key)} >  {item}
              </Button>
            ))
          }
        </TheadBox2>
        <MTheadBox2>
          {
            SwitchButtonArrs.map((item, key) => (
              <Button key={key} w={75} h={28} mr={10} mt={10} Select={(CurrentTab === key)}
                onClick={() => FilterList(key)} >  {item}
              </Button>
            ))
          }
        </MTheadBox2>
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
                    <TopText>
                      {item.LPtokenName ? item.LPtokenName : <LoadingBox />}
                    </TopText>
                  </div>
                  <div style={{ marginLeft: 10 }}>
                    {item.type ? item.type : <LoadingBox />}
                  </div>
                  {item.New ?
                    <div style={{ marginTop: 10, }}>
                      <Tips>{item.New} </Tips>
                      <Tipsfff style={{ color: "fff" }}>{item.Featured}</Tipsfff>
                    </div>
                    : null}
                  {item.Ellipsis ?
                    <div style={{ marginTop: 10, display: "flex" }}>
                      <Tips>{item.MaxLeverage}X</Tips>
                      <Tipsfff>{item.Ellipsis}</Tipsfff>
                    </div>
                    : null}
                </div>
              </TdBox>
              <TdBox style={{
                maxWidth: "20%", fontSize: "14px", fontWeight: "bold",
                color: "rgb(48, 162, 122)"
              }}>
                {item.APY != null ?
                  <div style={{ position: "relative" }}>
                    {(parseFloat(item.APY.APY) * 100).toFixed(2)}%
                    <Popover key={key} placement="right"
                      content={<FarmApyContainer data={item}
                        onclick={setvisibleKey} ></FarmApyContainer>}
                      trigger="click" overlayClassName="vaultApy farmsApy"
                      visible={key == visibleKey}
                    >
                      <APYImg
                        onClick={() => setvisibleKey(key)} src={FarmApr}></APYImg>
                    </Popover>
                  </div>
                  : <LoadingBox />}
              </TdBox>
              <TdBox style={{ color: "#fff", maxWidth: "20%" }}>
                <TopText>
                  {item.TVL == undefined ? <LoadingBox /> : "$" +
                    subStringNum(item.TVL, 6)}
                </TopText>
              </TdBox>
              <TdBox style={{ maxWidth: "20%" }}>
                <DoubleBtnBox>
                  <NumberBox>{item.Leverage}</NumberBox>
                  <BtnDiv>
                    <Btn1 onClick={() => updateLeverage(item, item.index, 'up')}>
                      <Icon src={shangIcon} />
                    </Btn1>
                    <Btn2 onClick={() => updateLeverage(item, item.index, 'down')}>
                      <Icon src={xiaIcon} />
                    </Btn2>
                  </BtnDiv>
                </DoubleBtnBox>
              </TdBox>
              <TdBox className="TdWdith">
                <Link to={`/positions/${item.New_LPtokenName ? item.New_LPtokenName : item.LPtokenName}/${item.index}/${item.Leverage}/${item.MaxLeverage}/
                    ${window.btoa(JSON.stringify(item.APY))}`}>
                  <Button w={100} h={35} ml={0}
                  >
                    {item.Leverage}X Farm
                  </Button>
                </Link>
              </TdBox>
              {/* mobile */}
              <MTdBox>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <TokenIcon IconName={item.LPtokenName} />
                  <div>
                    <div style={{ marginLeft: 5, color: "#fff" }}>
                      <TopText>
                        {item.LPtokenName ? item.LPtokenName : <LoadingBox />}
                      </TopText>
                    </div>
                    <div style={{ marginLeft: 5 }}>
                      {item.type ? item.type : <LoadingBox />}
                    </div>
                    {item.New ?
                      <div style={{ marginTop: 5, }}>
                        <Tips>{item.New} </Tips>
                        <Tipsfff style={{ color: "fff" }}>{item.Featured}</Tipsfff>
                      </div>
                      : null}
                    {item.Ellipsis ?
                      <div style={{ marginTop: 5, display: "flex" }}>
                        <Tips>{item.MaxLeverage}X</Tips>
                        <Tipsfff>{item.Ellipsis}</Tipsfff>
                      </div>
                      : null}
                  </div>
                </div>
              </MTdBox>
              <MTdBox>
                <MobileAPYLeft>
                  Borrow Asset:
                </MobileAPYLeft>
                <div style={{ padding: "10px 0 20px 0", display: "flex" }}>
                  <>
                    {TokenArr[item.index]?.map((Titem: any, t: any) => (
                      <Button key={t} w={80} h={22} ml={10}
                        Select={Titem.select}
                        onClick={() => TokenArrSelect(item, t)}
                      >
                        {Titem.name}
                      </Button>
                    ))
                    }
                  </>

                </div>
              </MTdBox>
              <MTdBox>
                <MobileAPYLeft>
                  Yield Farm APR :
                </MobileAPYLeft>
                <div>
                  <TopText>
                    {item.APY != null ? `${(parseFloat(item.APY.Farm_Apr) *
                      item.Leverage * 100).toFixed(2)}%` : <LoadingBox />}
                  </TopText>
                </div>
              </MTdBox>
              <MTdBox>
                <MobileAPYLeft>
                  RABBIT Rewards APR :
                </MobileAPYLeft>
                <div>
                  <TopText>
                    {item.APY != null ? `${(parseFloat(item.APY.RABBIT_Rewards) *
                      item.Leverage * 100).toFixed(2)}%` : <LoadingBox />}
                  </TopText>
                </div>
              </MTdBox>
              <MTdBox>
                <MobileAPYLeft>
                  Trading Fees :
                </MobileAPYLeft>
                <div>
                  <TopText>
                    {item.APY != null ? `${(parseFloat(item.APY.Trading_Free) *
                      item.Leverage * 100).toFixed(2)}%` : <LoadingBox />}
                  </TopText>
                </div>
              </MTdBox>
              <MTdBox>
                <MobileAPYLeft>
                  Borrowing Interest :
                </MobileAPYLeft>
                <div>
                  <TopText>
                    {item.APY != null ? `-${(parseFloat(item.APY.Borrow_Apr) *
                      (item.Leverage - 1) * 100).toFixed(2)}%` : <LoadingBox />}
                  </TopText>
                </div>
              </MTdBox>
              <MTdBox>
                <MobileAPYLeft>
                  Total APR :
                </MobileAPYLeft>
                <div>
                  <TopText>
                    {item.APY != null ? <>{(TotalAPR(item.APY, item.Leverage) * 100).toFixed(2)}%</> : <LoadingBox />}
                  </TopText>
                </div>
              </MTdBox>
              <MTdBox>
                <MobileAPYLeft>
                  Daily APR :
                </MobileAPYLeft>
                <div>
                  <TopText>
                    {item.APY != null ? <>{(DailyAPR(item.APY, item.Leverage) * 100).toFixed(2)}%</> : <LoadingBox />}
                  </TopText>
                </div>
              </MTdBox>
              <MTdBox>
                <MobileAPYLeft>
                  TVL
                </MobileAPYLeft>
                <div>
                  <TopText>
                    {item.TVL == undefined ? <LoadingBox /> : "$" +
                      subStringNum(item.TVL, 6)}
                  </TopText>
                </div>
              </MTdBox>
              <MTdBox>
                <MobileAPYLeft>
                  Yield (APY)
                </MobileAPYLeft>
                <div>
                  <span style={{
                    maxWidth: "20%", fontSize: "14px", fontWeight: "bold",
                    color: "rgb(48, 162, 122)"
                  }}>
                    {item.APY != null ? `${(parseFloat(item.APY.APY) * 100).toFixed(2)}%` : <LoadingBox />}
                  </span>
                </div>
              </MTdBox>
              <MTdBox>
                <MobileAPYLeft>
                  Leverage
                </MobileAPYLeft>
                {item.APY != null ?
                  <DoubleBtnBox>
                    <NumberBox>{item.Leverage}</NumberBox>
                    <BtnDiv>
                      <Btn1 onClick={() => updateLeverage(item, item.index, 'up')}>
                        <Icon src={shangIcon} />
                      </Btn1>
                      <Btn2 onClick={() => updateLeverage(item, item.index, 'down')}>
                        <Icon src={xiaIcon} />
                      </Btn2>
                    </BtnDiv>
                  </DoubleBtnBox>
                  : <LoadingBox />}
              </MTdBox>
              <MTdBox style={{ margin: "30px 0" }}>
                <Link style={{ width: "100%", maxWidth: "100%" }} to={`/positions/${item.New_LPtokenName ? item.New_LPtokenName : item.LPtokenName}/${item.index}/${item.Leverage}/${item.MaxLeverage}/
                    ${window.btoa(JSON.stringify(item.APY))}`}>
                  <Button disabled={item.APY != null} w={0} h={35} ml={0}>
                    {item.Leverage}X Farm
                  </Button>
                </Link>
              </MTdBox>
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
  @media (max-width: 1000px) {
    display: none;
  }
`;
const MTopBox = styled.div`
display: flex;
@media (min-width: 1000px) {
  display: none;
}
`;
const Box = styled(BgBox)`
  padding: 20px;
  @media (max-width: 1000px) {
    margin-top: 30px;
    padding: 10px;
  }
  .TdWdith {
    max-width: 100px;
  }
`;

const TitleBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const TopText = styled.span`
  font-size: 14px;
  color: rgb(255, 255, 255);
  font-family: Arial;
    font-weight: 400;
`
const Ldiv = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 1000px) {
    display: none;
  }
`;
const Mdiv = styled.div`
  @media (min-width: 1000px) {
    display: none;
  }
`;
const MobileTips = styled.div`
  @media (min-width: 1000px) {
    display: none;
  }
`
const TheadBox = styled.div`
  width: 100%;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
  padding: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  @media (max-width: 1000px) {
    display: none;
  }
`;
const TheadBox2 = styled.div`
  width: 100%;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
  padding: 20px;
  display: flex;
  @media (max-width: 1000px) {
    display: none;
  }
`;
const MTheadBox2 = styled.div`
  width: 100%;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
  padding: 10px 0;
  display: flex;
  flex-wrap: wrap;
  @media (min-width: 1000px) {
    display: none;
  }
`;
const TdBox = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  @media (max-width: 1000px) {
    display: none;
  }
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
  @media (max-width: 1000px) {
    padding: 10px;
    height: auto;
    flex-direction: column;
  }
`;
const MTdBox = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
    padding: 5px 0;
  @media (min-width: 1000px) {
    display: none;
  }
`;
const MobileAPYLeft = styled.div`
    font-family: Arial;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.6;
    color:#fff;
`
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
const APYImg = styled.img`
width:15px;
margin-left: 5px;
`