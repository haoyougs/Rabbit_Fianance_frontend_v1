import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { BgBox } from "components/backgroundBox/background";
import { RewardSummaryIcon } from "components/icon";
import { TokenIcon } from "components/icon/tokenIcon";
import { Button } from "components/button/button";
import { useWeb3React } from "@web3-react/core";
import { GETRewardSummary, DepositAmount, Claim } from "hooks/useStake";
import { FAIR_LAUNCH_ADDRESS, ibBNB_FAIRLAUNCH_PID, ibBUSD_FairLaunch_Pid } from 'config/address'
import { ibTokneData } from "hooks/useStake";
import { UpdateNotice, UpdateNotice2, UpdateNoticeText } from "state/TypePage/hooks"
/**
 * Your Reward Summary 组件
 * @returns
 */
export const RewardSummaryBox: React.FC = () => {
  const { account } = useWeb3React();
  const setNotice = UpdateNotice();
  const setNotice2 = UpdateNotice2();
  const setNoticeText = UpdateNoticeText();
  const [SunmayData, setSunmayData] = useState<[]>([])
  const SunmayTokneData = JSON.parse(JSON.stringify(ibTokneData));
  const getSunmayData = async () => {
    for (let i = 0; i < SunmayTokneData.length; i++) {
      const item = SunmayTokneData[i]
      const res = await DepositAmount(item.pid, account, FAIR_LAUNCH_ADDRESS);
      item.deposits = res;
      // console.log(i, "res", res)
      // 获得兔子币
      const res_earned = await GETRewardSummary(item.pid, account, FAIR_LAUNCH_ADDRESS)
      item.earned = parseFloat(res_earned).toFixed(6);
      setSunmayData([])
    }
    const filter_SunmayTokneData = SunmayTokneData.filter((f_item: any) => parseFloat(f_item.deposits) > 0);
    setSunmayData(filter_SunmayTokneData)
    // SunmayTokneData.forEach(async (item: any) => {
    //   // 质押数量
    //   const res = await DepositAmount(item.pid, account, FAIR_LAUNCH_ADDRESS);
    //   item.deposits = res;
    //   console.log("res", res)
    //   // 获得兔子币
    //   const res_earned = await GETRewardSummary(item.pid, account, FAIR_LAUNCH_ADDRESS)
    //   item.earned = parseFloat(res_earned).toFixed(6);
    //   setSunmayData([])
    //   const filter_SunmayTokneData = SunmayTokneData.filter((f_item: any) => parseFloat(f_item.deposits) > 0)
    //   console.log(1)
    //   setSunmayData(filter_SunmayTokneData)
    // })
  }
  useEffect(() => {
    if (!account) {
      return;
    }
    getSunmayData();
  }, [account]);

  const ClaimClick = (pid: string) => {
    Claim(pid, FAIR_LAUNCH_ADDRESS).then((res) => {
      if (res === true) {
        getSunmayData();
        setNotice(true);
        setNoticeText("Claim succeed");
      } else {
        setNotice2(true);
        setNoticeText("Claim fail");
      }
    });

  };

  return (
    <>
      <RewardSummary>
        <RewardSummaryIcon>Your Reward Summary</RewardSummaryIcon>
        <RewardSummaryList>
          {SunmayData.map((item: any, key: any) => (
            <RewardSummaryListBox key={key} >
              <NameBox>
                <TokenIcon IconName={item.tokenName} />
                <TokenName>{item.tokenName}</TokenName>
              </NameBox>
              <RewardSummaryListBoxVal>
                <RewardSummaryListBoxValBox1>Deposits:</RewardSummaryListBoxValBox1>
                <TokenName>{item.deposits}</TokenName>
              </RewardSummaryListBoxVal>
              <RewardSummaryListBoxVal>
                <RewardSummaryListBoxValBox1>
                  Earned:
                </RewardSummaryListBoxValBox1>
                <RewardSummaryListBoxValBox2>
                  {item.earned} RABBIT
                </RewardSummaryListBoxValBox2>
              </RewardSummaryListBoxVal>
              <RewardSummaryListBoxVal2>
                <Button w={0} h={36} onClick={() => ClaimClick(item.pid)}>
                  Claim
                </Button>
              </RewardSummaryListBoxVal2>
            </RewardSummaryListBox>
          ))}
        </RewardSummaryList>
      </RewardSummary>
    </>
  );
};

const RewardSummary = styled(BgBox)`
  height: auto;
  padding: 20px;
  margin-bottom: 20px;
  @media (max-width: 1000px) {
    padding: 10px;
  }
`;
const RewardSummaryList = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  /* padding: 20px; */
`;
const RewardSummaryListBox = styled.div`
  height: 70px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 5px;
  padding: 0 10px 0 20px;
  margin: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 1000px) {
    height: auto;
    padding: 10px;
    margin: 10px 0;
    flex-direction: column;
    align-items: baseline;
  }
`;
const RewardSummaryListBoxVal = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  @media (max-width: 1000px) {
    width: 100%;
    justify-content: space-between;
    line-height: 1.6rem;
  }
`;
const NameBox = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;
const RewardSummaryListBoxVal2 = styled.div`
  width:120px;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  @media (max-width: 1000px) {
    width: 100%;
    margin-top: 10px;
    justify-content: center;
  }
`;
const TokenName = styled.div`
  margin-left: 10px;
  color: #fff;
`;
const RewardSummaryListBoxValBox1 = styled.div`
  color: rgba(255, 255, 255, 0.5);
`;
const RewardSummaryListBoxValBox2 = styled.div`
  color: rgb(239, 185, 11);
  margin-left: 10px;
`;
