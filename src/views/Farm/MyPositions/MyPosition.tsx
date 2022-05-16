import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BgBox } from "components/backgroundBox/background";
import { RewardSummaryIcon } from "components/icon";
import { AuditBox } from "components/backgroundBox/AuditBox";
import MyPositionsImg from "assets/none@2x.png";
import { Button } from "components/button/button";
import { useWeb3React } from "@web3-react/core";
import { QueryBin } from "hooks/useMyPosition";
import { TokenIcon } from "components/icon/tokenIcon";
import FarmApr from "assets/page/FarmApr.png"
import { LoadingBox } from "components/Loading";
import { SVGloading4 } from "components/Loading/SVG";
import { ethers } from "ethers";
import { AddCollateralPage } from "./AddCollateral";
import { ClosePositionPage } from "./ClosePosition";
import { FAIR_LAUNCH_ADDRESS } from "config/address";
import { GETRewardMdxSummary, GETRewardSummary, MdxClaim, Claim } from "hooks/useStake";
import { UpdateNotice, UpdateNotice2, UpdateNoticeText } from "state/TypePage/hooks"
import { Popover } from 'antd';
import { MyPositionPopover } from './MyPositionPopover';
import { getApyObj } from "utils/getApyObj";
import { BNB_ADDRESS, W_BNB_ADDRESS } from "config/address";
import { subStringNum } from "utils/subStringNum";
import { getApy } from "utils/ApyCommon";
import Icon2 from 'assets/RewardSummary.png'
import {
  getMdexTradeFree,
  getPancakeTradeFree
} from "hooks/useFarms";
/**
 * MyPositionsPage 我的仓位页面
 * @returns
 */
export const MyPositionsPage: React.FC = () => {
  const { account } = useWeb3React();
  const [BaseData, setBaseData] = useState<any>([]);
  const [PositionData, setPositionData] = useState<any>([]);
  const [PositionImg, setPositionImg] = useState<boolean>(false);
  const [Loading, setLoading] = useState(false);
  const [SwitchPancake, setSwitchPancake] = useState<string>("Pancake");
  const [ClaimbtnArrs, setClaimbtnArrs] = useState<any>([]);
  const [MdxClaimbtnArrs, setMdxClaimbtnArrs] = useState<any>([]);
  const [ApyObjArr, setApyObjArr] = useState<any>([]);
  const setNotice = UpdateNotice();
  const setNotice2 = UpdateNotice2();
  const setNoticeText = UpdateNoticeText();
  const getQueryBin = async (account: any) => {
    // console.log(111)
    const res = await QueryBin(account)
    setBaseData(res);
    const MdexTradeFree = await getMdexTradeFree();
    const PancakeTradeFree = await getPancakeTradeFree();
    let ObjArrs = [];
    for (let i = 0; i < res.length; i++) {
      const FarmAddressArrs = res[i].LPAddress;
      const item = res[i].item;
      let AddressApr;
      let Names;
      //假如token1有_Pid
      if (!FarmAddressArrs?.BorrowToken0?._Pid && FarmAddressArrs?.BorrowToken1?._Pid) {
        AddressApr = FarmAddressArrs.LPtokenAddress1;
        Names = FarmAddressArrs.BorrowToken1.name
      } else {
        AddressApr = FarmAddressArrs.LPtokenAddress0;
        Names = FarmAddressArrs?.BorrowToken0.name
      }
      if (Names == "BNB") {
        AddressApr = BNB_ADDRESS
      }
      const ApyObj = await getApyObj(
        FarmAddressArrs.LP,
        FarmAddressArrs.LPtokenAddress1,
        i,
        FarmAddressArrs.Type,
        FarmAddressArrs.Tid,
        FarmAddressArrs.Goblin,
        FarmAddressArrs.FairLaunch_Pid,
        //计算Apy用的参数
        FarmAddressArrs.LPtokenAddress0,
        AddressApr,
        MdexTradeFree,
        PancakeTradeFree
      );
      const position =
        Number(ethers.utils.formatUnits(item.positionsValue));
      const equity = Number(
        ethers.utils.formatUnits(item.positionsValue)
      ) -
        Number(ethers.utils.formatUnits(item.totalValue));
      const Leverage = Math.ceil(position / equity);
      ObjArrs.push({ ...ApyObj, Leverage })
    }
    setApyObjArr(ObjArrs);
  }
  useEffect(() => {
    if (account) {
      getQueryBin(account);
    }
  }, [account]);
  const GETReward = async (LPAddressArr: any, arr: any) => {
    const ClaimArrs: any = [];
    const MdxClaimArrs: any = [];
    for (let i = 0; i < (LPAddressArr.length); i++) {
      if (LPAddressArr[i].Type == "Mdex") {
        const Mdxres = await GETRewardMdxSummary(LPAddressArr[i].Goblin, account);
        arr[i]['MdxEarned'] = Mdxres;
        arr[i]['Goblin'] = LPAddressArr[i].Goblin;
        MdxClaimArrs.push(false);
      }
      const res = await GETRewardSummary(LPAddressArr[i].FairLaunch_Pid, account, FAIR_LAUNCH_ADDRESS);
      arr[i]['earned'] = res;
      ClaimArrs.push(false);
    }
    setMdxClaimbtnArrs(MdxClaimArrs)
    setClaimbtnArrs(ClaimArrs);
    setPositionData(arr)
  }
  useEffect(() => {
    if (!BaseData[0]) {
      return;
    }
    // console.log(222);
    const SelectData = BaseData.filter((item: any) => item.LPAddress.Type == SwitchPancake);
    let goblinArrs: any = [];
    let Result: any = [];
    let LPAddressArr: any = [];
    SelectData.forEach((S_item: any) => {
      if (goblinArrs.indexOf(S_item.item.goblin) == -1) {
        let Name;
        if (!S_item.LPAddress?.BorrowToken0?._Pid && S_item.LPAddress?.BorrowToken1?._Pid) {
          Name = S_item.LPAddress?.BorrowToken1.name
        } else {
          Name = S_item.LPAddress?.BorrowToken0.name
        }
        Result.push({
          "item": [S_item],
          "goblin": S_item.item.goblin,
          "LPtokenName": S_item.LPAddress.LPtokenName,
          "Pid": S_item.LPAddress.FairLaunch_Pid,
          "Name": Name
        })
        goblinArrs.push(S_item.item.goblin);
        LPAddressArr.push(S_item.LPAddress);
      } else {
        const a_index = goblinArrs.indexOf(S_item.item.goblin);
        Result[a_index].item.push(S_item)
      }
    });
    // //////console.log(Result)
    GETReward(LPAddressArr, Result)
  }, [SwitchPancake, BaseData]);
  const [AddShou, setAddShou] = useState(false);
  const [CloseShou, setCloseShou] = useState(false);
  const [AddCollateralData, setAddCollateralData] = useState<any>()
  const AddCollateralClick = (item: any) => {
    setAddCollateralData(item)
    setAddShou(!AddShou)
  }
  const ClosePosition = (item: any) => {
    setAddCollateralData(item)
    setCloseShou(!AddShou)
  }
  //Mdx领取奖励
  const MdxClaimClick = (goblin: any, index: any) => {
    let beforeMdxArrs = JSON.parse(JSON.stringify(MdxClaimbtnArrs));
    beforeMdxArrs[index] = true;
    setMdxClaimbtnArrs(beforeMdxArrs);
    MdxClaim(goblin).then((res) => {
      let afterMdxArrs = JSON.parse(JSON.stringify(MdxClaimbtnArrs));
      afterMdxArrs[index] = false;
      setMdxClaimbtnArrs(afterMdxArrs);
      if (res === true) {
        //////console.log('领取成功');
        setNotice(true);
        setNoticeText("Claim succeed");
      } else {
        setNotice2(true);
        setNoticeText("Claim fail");
      }
    });

  };
  //rabbit领取奖励
  const ClaimClick = (pid: string, index: any) => {
    let beforeArrs = JSON.parse(JSON.stringify(ClaimbtnArrs));
    beforeArrs[index] = true;
    setClaimbtnArrs(beforeArrs);
    Claim(pid, FAIR_LAUNCH_ADDRESS).then((res) => {
      let afterArrs = JSON.parse(JSON.stringify(ClaimbtnArrs));
      afterArrs[index] = false;
      setClaimbtnArrs(afterArrs);
      if (res === true) {
        setNotice(true);
        setNoticeText("Claim succeed");
      } else {
        setNotice2(true);
        setNoticeText("Claim fail");
      }
    });

  };
  const computeRisk = (totalValue: any, positionsValue: any, LiquidationFactor: any) => {
    const risk = totalValue / positionsValue / LiquidationFactor;
    return risk > 0 ? (risk * 100).toFixed(2) : risk;
  }
  const selectAPYObj = (index: any) => {
    const ApyObj = ApyObjArr[index];
    const APY = getApy(ApyObj.APY.Farm_Apr,
      ApyObj.APY.Trading_Free,
      ApyObj.APY.RABBIT_Rewards,
      ApyObj.APY.Borrow_Apr,
      ApyObj.Leverage);
    return APY * 100;
  }
  const selectData = (index: any) => {
    const ApyObj = ApyObjArr[index];
    return ApyObj;
  }
  const fresh = () => {
    setBaseData([]);
    getQueryBin(account)
  }
  const getPositionValue = (Ellipsis: any, value: any) => {
    if (Ellipsis) {
      const res = parseFloat(value) / 2 / 0.9996 + parseFloat(value) / 2;
      return res;
    } else {
      return value
    }
  }
  return (
    <>
      <RewardSummary>
        <RewardSummaryIcon>
          <TopBox>
            <TopText>
              <Icon src={Icon2}></Icon>
              My Positions
            </TopText>
            <TopBtnBox>
              <Button w={120} h={37} Select={SwitchPancake == "Pancake"} onClick={() => setSwitchPancake("Pancake")}>
                PancakeSwap
              </Button>
              <Button w={120} h={37} ml={20} Select={SwitchPancake == "Mdex"} onClick={() => setSwitchPancake("Mdex")}>
                MDEX
              </Button>
            </TopBtnBox>
          </TopBox>
        </RewardSummaryIcon>
        <RewardSummaryList>
          {!PositionData.length || PositionImg == true ? (
            <>
              <PositionsImg src={MyPositionsImg} alt="" />
              <TipsBox>There is no order at present</TipsBox>
            </>
          ) : (
            <>
              {PositionData.map((ob: any, key: any) => (
                <div key={key} style={{ width: "100%" }}>
                  {/* {ethers.utils.formatUnits(ob.item.positionsValue) !== "0.0" ? ( */}
                  <Position>
                    <TitleBox>
                      <TitleContent>
                        <TokenIcon IconName={ob.LPtokenName} />
                        <TokenNmae>{ob.LPtokenName}</TokenNmae>
                      </TitleContent>
                      <TitleBtnContent>
                        <TitleBtnBox>
                          {ob.MdxEarned ?
                            <>
                              <Earned>
                                Earned：
                                <span style={{ color: "rgb(239, 185, 11)" }}>
                                  {parseFloat(ob.MdxEarned).toFixed(6)} MDX
                                </span>
                              </Earned>
                              <EarnedVal></EarnedVal>
                              <Button w={100} h={35} ml={10}
                                disabled={!MdxClaimbtnArrs.filter((item: any) => item == true).length}
                                loading={MdxClaimbtnArrs[key]}
                                onClick={() => { MdxClaimClick(ob.Goblin, key) }}>
                                Claim
                              </Button>
                            </>
                            : null}
                        </TitleBtnBox>
                        <TitleBtnBox>
                          <Earned style={{ marginLeft: "10px" }}>
                            Earned：
                            <span style={{ color: "rgb(239, 185, 11)" }}>
                              {parseFloat(ob.earned).toFixed(6)} RABBIT
                            </span>
                          </Earned>
                          <EarnedVal></EarnedVal>
                          <Button w={100} h={35} ml={10}
                            disabled={!ClaimbtnArrs.filter((item: any) => item == true).length}
                            loading={ClaimbtnArrs[key]}
                            onClick={() => { ClaimClick(ob.Pid, key) }}>
                            Claim
                          </Button>
                        </TitleBtnBox>
                      </TitleBtnContent>
                    </TitleBox>
                    {!!ob.item.length ?
                      ob.item.map((o_item: any, o_index: any) => (
                        <Content key={o_index}>
                          <ContBox>
                            <MinTitle>Position Value</MinTitle>
                            <PositionValues>
                              {subStringNum(
                                getPositionValue(o_item.Ellipsis,
                                  ethers.utils.formatUnits(o_item.item.positionsValue)
                                ), 6)
                              }
                              {ob.Name}
                            </PositionValues>
                          </ContBox>
                          <ContBox>
                            <MinTitle>Total debts</MinTitle>
                            <PositionValues>
                              {subStringNum(
                                ethers.utils.formatUnits(o_item.item.totalValue)
                                , 6)}
                              {ob.Name}
                              {/* {<LoadingBox height={14} />} */}
                            </PositionValues>
                          </ContBox>
                          <ContBox>
                            <MinTitle>Equity Value</MinTitle>
                            <PositionValues>
                              {subStringNum((Number(
                                getPositionValue(o_item.Ellipsis,
                                  ethers.utils.formatUnits(o_item.item.positionsValue)
                                )
                              ) -
                                Number(ethers.utils.formatUnits(o_item.item.totalValue))), 6)
                              }
                              {ob.Name}
                            </PositionValues>
                          </ContBox>
                          <MAPRBox>
                            {
                              ApyObjArr.length ?
                                <MyPositionPopover
                                  data={selectData(o_item.index)}
                                  currentToken={ob.Name}
                                ></MyPositionPopover>
                                : <LoadingBox width={200} height={14} />}
                          </MAPRBox>
                          <ContBox>
                            <MinTitle>
                              Yield (APY)
                            </MinTitle>
                            <MPositionValues2>
                              {
                                ApyObjArr.length ?
                                  subStringNum(selectAPYObj(o_item.index), 2)
                                  : <LoadingBox height={14} />
                              }%
                            </MPositionValues2>
                            <PositionValues2>
                              <div style={{ position: "relative" }}>
                                {ApyObjArr.length ?
                                  <>{
                                    subStringNum(selectAPYObj(o_item.index), 2)}%
                                    <Popover placement="right"
                                      content={<MyPositionPopover
                                        data={selectData(o_item.index)}
                                        currentToken={ob.Name}
                                      ></MyPositionPopover>}
                                      trigger="click" overlayClassName="vaultApy">
                                      <APYImg src={FarmApr}></APYImg>
                                    </Popover>
                                  </>
                                  : <LoadingBox height={14} />}
                              </div>
                            </PositionValues2>
                          </ContBox>
                          <ContBox>
                            <MinTitle>Risk ratio</MinTitle>
                            <PositionValues>
                              <>
                                {
                                  computeRisk(o_item.item.totalValue, o_item.item.positionsValue, o_item.LPAddress.LiquidationFactor)
                                }
                                %
                                <RiskProcess>
                                  <RiskInert width={computeRisk(o_item.item.totalValue, o_item.item.positionsValue, o_item.LPAddress.LiquidationFactor)}></RiskInert>
                                </RiskProcess>
                              </>
                            </PositionValues>
                          </ContBox>
                          <ContBox2>
                            <Button
                              w={150}
                              h={35}
                              disabled={!!ApyObjArr.length}
                              onClick={() => AddCollateralClick(o_item)}
                            >
                              Add Collateral
                            </Button>
                            <EmptyBox></EmptyBox>
                            <Button
                              w={150}
                              h={35}
                              mt={10}
                              disabled={!!ApyObjArr.length}
                              onClick={() => ClosePosition(o_item)}
                            >
                              Close Position
                            </Button>
                          </ContBox2>
                        </Content>
                      )) : null}
                  </Position>
                  {/* ) : null} */}
                </div>
              ))}
            </>
          )}
        </RewardSummaryList>
      </RewardSummary >
      <AuditBox />
      {/* 弹窗 */}
      {
        AddShou ? (
          <AddCollateralPage key={Math.random()} onClick={() => setAddShou(!AddShou)} info={AddCollateralData} freshParent={fresh} />
        ) : null
      }
      {
        CloseShou ? (
          <ClosePositionPage onClick={() => setCloseShou(!CloseShou)} info={AddCollateralData} freshParent={fresh} />
        ) : null
      }
    </>
  );
};

const RewardSummary = styled(BgBox)`
  min-height: 738px;
  padding: 20px;
  margin-bottom: 20px;
  @media (max-width: 1000px) {
    padding: 10px;
  }
`;
const TopBox = styled.div`
    display:flex;
  @media (max-width: 1000px) {
    flex-direction:column;
  }
`
const TopText = styled.div`
display:flex;
margin-right: 20px;
font-family: Arial;
font-weight: 400;
@media (max-width: 1000px) {
  /* display: none; */
}
`
const Icon = styled.img`
  height: 30px;
  margin-right: 10px;
`;
const TopBtnBox = styled.div`
display:flex;
@media (max-width: 1000px) {
  margin-top: 20px;
}
`
const RewardSummaryList = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  padding: 20px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const PositionsImg = styled.img`
  width: 250px;
  height: 170px;
  margin-top: 40px;
`;
const TipsBox = styled.div`
  color: rgba(255, 255, 255, 0.5);
`;
const Position = styled.div`
  width: 100%;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding: 20px;
  @media (max-width: 1000px) {
    padding: 0px;
  }
`;
const TitleBox = styled.div`
  width: 100%;
  padding: 20px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 1000px) {
    flex-direction: column;
    align-items: normal;
  }
`;
const TitleContent = styled.div`
  display: flex;
  align-items: center;
`;
const TokenNmae = styled.div`
  color: #fff;
`;
const TitleBtnContent = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 1000px) {
    flex-direction: column;
    align-items: normal;
  }
`;
const TitleBtnBox = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 1000px) {
    justify-content: end;
    margin-top:10px;
  }
`;
const Earned = styled.div`
  color: rgba(255, 255, 255, 0.5);
`;
const EarnedVal = styled.div`
  color: rgb(239, 185, 11);
`;
const Content = styled.div`
  background: rgba(255, 255, 255, 0.1);
  width: 100%;
  padding: 20px;
  border-radius: 5px;
  display: flex;
  margin-top: 10px;
  @media (max-width: 1000px) {
    flex-direction: column;
  }
`;
const ContBox = styled.div`
  flex: 1;
  @media (max-width: 1000px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 5px 0;
  }
`;
const ContBox2 = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  @media (max-width: 1000px) {
    flex-direction: row-reverse;
  }
`;
const MinTitle = styled.div`
  color: rgba(255, 255, 255, 0.5);
  @media (max-width: 1000px) {
    color: rgba(255, 255, 255, 1);
  }
`;
const PositionValues = styled.div`
  color: #fff;
  margin-top: 15px;
  display: flex;
    align-items: center;
    @media (max-width: 1000px) {
      margin-top: 0px;
  }
`;
const PositionValues2 = styled.div`
  color: rgb(48, 162, 122);
  margin-top: 15px;
  display: flex;
  align-items: center;
  @media (max-width: 1000px) {
      display: none;
  }
`;
const MAPRBox = styled.div`
width: 100%;
@media (min-width: 1000px) {
        display: none;
  }
`
const MPositionValues2 = styled.div`
  display: flex;
  align-items: center;
  color: rgb(48, 162, 122);
  @media (min-width: 1000px) {
        display: none;
  }
`;
const Icon1 = styled.img`
  width: 14px;
  margin-left: 5px;
`;
const RiskProcess = styled.div`
    margin-left:5px;
    width: 50%;
    min-width: 60px;
    max-width: 60px;
    height: 16px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 3px;
    padding: 4px;
`
const RiskInert = styled.div<{ width: any }>`
    width: ${(props) => props.width + '%'};
    height: 6px;
  background-color: ${(props) => props.width > 90 ? 'red' : props.width == 0 ? 'none' : 'green'};
`
const APYImg = styled.img`
width:15px;
margin-left: 5px;
`
const EmptyBox = styled.div`
 width: 20px;
`