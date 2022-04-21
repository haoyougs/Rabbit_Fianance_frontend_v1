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
import Duihao from "assets/shenmm(2).png";
import { LoadingBox } from "components/Loading";
import { SVGloading4 } from "components/Loading/SVG";
import { ethers } from "ethers";
import { AddCollateralPage } from "./AddCollateral";
import { ClosePositionPage } from "./ClosePosition";
import { FAIR_LAUNCH_ADDRESS } from "config/address";
import { GETRewardSummary, Claim } from "hooks/useStake";
import { NoticeBox } from "components/notice";
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
  const [Notice1, setNotice1] = useState(false);
  const [Notice2, setNotice2] = useState(false);
  const [NoticeText, setNoticeText] = useState("");
  useEffect(() => {
    if (account) {
      QueryBin(account).then((res) => {
        // console.log("res", res);
        setBaseData(res);
      });
    }
  }, [QueryBin, account]);
  const GETReward = async (Pids: any, arr: any) => {
    const ClaimArrs: any = [];
    for (let i = 0; i < (Pids.length); i++) {
      const res = await GETRewardSummary(Pids[i], account, FAIR_LAUNCH_ADDRESS);
      arr[i]['earned'] = res;
      ClaimArrs.push(false);
    }
    console.log(arr);
    setClaimbtnArrs(ClaimArrs)
    setPositionData(arr)
  }
  useEffect(() => {
    if (!BaseData.length) {
      return;
    }
    const SelectData = BaseData.filter((item: any) => item.LPAddress.Type == SwitchPancake);
    // console.log(SelectData);
    let goblinArrs: any = [];
    let Result: any = [];
    let Pids: any = [];
    SelectData.forEach(async (S_item: any) => {
      if (goblinArrs.indexOf(S_item.item.goblin) == -1) {
        Result.push({
          "item": [S_item],
          "goblin": S_item.item.goblin,
          "LPtokenName": S_item.LPAddress.LPtokenName,
          "Pid": S_item.LPAddress.FairLaunch_Pid
        })
        goblinArrs.push(S_item.item.goblin);
        Pids.push(S_item.LPAddress.FairLaunch_Pid);
      } else {
        const a_index = goblinArrs.indexOf(S_item.item.goblin);
        Result[a_index].item.push(S_item)
      }
    });
    GETReward(Pids, Result)
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
  const ClaimClick = (pid: string, index: any) => {
    let new_ClaimbtnArrs = JSON.parse(JSON.stringify(ClaimbtnArrs));
    new_ClaimbtnArrs[index] = true;
    setClaimbtnArrs(new_ClaimbtnArrs);
    Claim(pid, FAIR_LAUNCH_ADDRESS).then((res) => {
      let new_ClaimbtnArrs = JSON.parse(JSON.stringify(ClaimbtnArrs));
      new_ClaimbtnArrs[index] = false;
      setClaimbtnArrs(new_ClaimbtnArrs);

      if (res === true) {
        console.log('领取成功');
        setNotice1(true);
        setNoticeText("领取成功");
      } else {
        setNotice2(true);
        setNoticeText("领取失败");
      }
    });

  };
  return (
    <>
      {Notice1 ? (
        <div onClick={() => setNotice1(false)}>
          <NoticeBox Shou={!Notice2}>{NoticeText}</NoticeBox>
        </div>
      ) : null}
      {Notice2 ? (
        <div onClick={() => setNotice2(false)}>
          <NoticeBox Shou={!Notice2}>{NoticeText}</NoticeBox>
        </div>
      ) : null}
      <RewardSummary>
        <RewardSummaryIcon>
          My Positions{" "}
          <Button w={120} h={37} ml={20} Select={SwitchPancake == "Pancake"} onClick={() => setSwitchPancake("Pancake")}>
            PancakeSwap
          </Button>
          <Button w={120} h={37} ml={20} Select={SwitchPancake == "Mdex"} onClick={() => setSwitchPancake("Mdex")}>
            MDEX
          </Button>
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
                      <TitleContent>
                        <Earned>Earned：{parseFloat(ob.earned).toFixed(6)}</Earned>
                        <EarnedVal></EarnedVal>
                        <Button w={100} h={35} ml={10}
                          disabled={!ClaimbtnArrs[key]}
                          loading={ClaimbtnArrs[key]}
                          onClick={() => { ClaimClick(ob.Pid, key) }}>
                          Claim
                        </Button>
                      </TitleContent>
                    </TitleBox>
                    {!!ob.item.length ?
                      ob.item.map((o_item: any, o_index: any) => (
                        <Content key={o_index}>
                          <ContBox>
                            <MinTitle>Position Value</MinTitle>
                            <PositionValues>
                              {Number(
                                ethers.utils.formatUnits(o_item.item.positionsValue)
                              ).toFixed(6)}
                            </PositionValues>
                          </ContBox>
                          <ContBox>
                            <MinTitle>Total debts</MinTitle>
                            <PositionValues>
                              {Number(
                                ethers.utils.formatUnits(o_item.item.totalValue)
                              ).toFixed(6)}
                              {/* {<LoadingBox height={14} />} */}
                            </PositionValues>
                          </ContBox>
                          <ContBox>
                            <MinTitle>Equity Value</MinTitle>
                            <PositionValues>
                              {(Number(
                                ethers.utils.formatUnits(o_item.item.positionsValue)
                              ) -
                                Number(ethers.utils.formatUnits(o_item.item.totalValue))).toFixed(6)

                              }
                              {/* {<LoadingBox height={14} />} */}
                            </PositionValues>
                          </ContBox>
                          <ContBox>
                            <MinTitle>Yield (APY)</MinTitle>
                            <PositionValues2>
                              {<LoadingBox height={14} />}
                              <Icon1 src={Duihao} />
                            </PositionValues2>
                          </ContBox>
                          <ContBox>
                            <MinTitle>Risk ratio</MinTitle>
                            <PositionValues>
                              {(Number(o_item.item.totalValue) /
                                Number(o_item.item.positionsValue)) *
                                100}
                              %
                              {/* {<LoadingBox height={14} />} */}
                            </PositionValues>
                          </ContBox>
                          <ContBox2>
                            <Button
                              w={150}
                              h={35}
                              onClick={() => AddCollateralClick(o_item)}
                            >
                              Add Collateral
                            </Button>
                            <Button
                              w={150}
                              h={35}
                              mt={10}
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
      </RewardSummary>
      <AuditBox />
      {/* 弹窗 */}
      {AddShou ? (
        <AddCollateralPage key={Math.random()} onClick={() => setAddShou(!AddShou)} info={AddCollateralData} />
      ) : null}
      {CloseShou ? (
        <ClosePositionPage onClick={() => setCloseShou(!CloseShou)} info={AddCollateralData} />
      ) : null}
    </>
  );
};

const RewardSummary = styled(BgBox)`
  min-height: 738px;
  padding: 20px;
  margin-bottom: 20px;
`;
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
`;
const TitleBox = styled.div`
  width: 100%;
  padding: 20px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const TitleContent = styled.div`
  display: flex;
  align-items: center;
`;
const TokenNmae = styled.div`
  color: #fff;
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
`;
const ContBox = styled.div`
  flex: 1;
`;
const ContBox2 = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;
const MinTitle = styled.div`
  color: rgba(255, 255, 255, 0.5);
`;
const PositionValues = styled.div`
  color: #fff;
  margin-top: 15px;
`;
const PositionValues2 = styled.div`
  color: rgb(48, 162, 122);
  margin-top: 15px;
  display: flex;
  align-items: center;
`;
const Icon1 = styled.img`
  width: 14px;
  margin-left: 5px;
`;
