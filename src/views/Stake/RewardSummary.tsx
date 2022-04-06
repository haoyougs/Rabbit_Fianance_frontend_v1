import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BgBox } from "components/backgroundBox/background";
import { RewardSummaryIcon } from "components/icon";
import { TokenIcon } from "components/icon/tokenIcon";
import { Button } from "components/button/button";
import { useWeb3React } from "@web3-react/core";
import { GETRewardSummary, DepositAmount, Claim } from "hooks/useStake";
import { FAIR_LAUNCH_ADDRESS, ibBNB_FAIRLAUNCH_PID } from 'config/address'




/**
 * Your Reward Summary 组件
 * @returns
 */
export const RewardSummaryBox: React.FC = () => {
  const { account } = useWeb3React();
  const [Earned, setEarned] = useState<any>();
  const [Deposits, setDeposits] = useState<any>();

  useEffect(() => {
    GETRewardSummary(ibBNB_FAIRLAUNCH_PID, account, FAIR_LAUNCH_ADDRESS).then((res) => {
      console.log(111, res)
      setEarned(res);
    });
    DepositAmount(ibBNB_FAIRLAUNCH_PID, account, FAIR_LAUNCH_ADDRESS).then((res) => {
      console.log(222, res)
      setDeposits(res);
    });
  }, [GETRewardSummary, DepositAmount, account]);

  const ClaimClick = () => {
    Claim(ibBNB_FAIRLAUNCH_PID, FAIR_LAUNCH_ADDRESS).then((res) => {
      if (res === true) {
        alert('领取成功')
      } else {
        alert('领取失败')
      }
    });

  };

  return (
    <RewardSummary>
      <RewardSummaryIcon>Your Reward Summary</RewardSummaryIcon>
      <RewardSummaryList>
        <RewardSummaryListBox>
          <RewardSummaryListBoxVal>
            <TokenIcon IconName={"ibBNB"} />
            <TokenName>ibBNB</TokenName>
          </RewardSummaryListBoxVal>
          <RewardSummaryListBoxVal>
            <RewardSummaryListBoxValBox1>Deposits:</RewardSummaryListBoxValBox1>
            <TokenName>{(Deposits / 1).toFixed(6)}</TokenName>
          </RewardSummaryListBoxVal>
          <RewardSummaryListBoxVal>
            <RewardSummaryListBoxValBox1>Earned:</RewardSummaryListBoxValBox1>
            <RewardSummaryListBoxValBox2>
              {(Earned / 1).toFixed(6)} RABBIT
            </RewardSummaryListBoxValBox2>
          </RewardSummaryListBoxVal>
          <RewardSummaryListBoxVal2>
            <Button w={100} h={36} onClick={ClaimClick}>
              Claim
            </Button>
          </RewardSummaryListBoxVal2>
        </RewardSummaryListBox>
      </RewardSummaryList>
    </RewardSummary>
  );
};

const RewardSummary = styled(BgBox)`
  height: 218px;
  padding: 20px;
  margin-bottom: 20px;
`;
const RewardSummaryList = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  padding: 20px;
`;
const RewardSummaryListBox = styled.div`
  width: 100%;
  height: 70px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 5px;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const RewardSummaryListBoxVal = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;
const RewardSummaryListBoxVal2 = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
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
