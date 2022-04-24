import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { TipsIcon, MinTipsBar } from "components/icon";
import { BgBox } from "components/backgroundBox/background";
import { OldBtn, Button } from "components/button/button";
import { TokenIcon } from "components/icon/tokenIcon";
import "../index.css";
import { useNavigate } from "react-router-dom";
import { AuditBox } from "components/backgroundBox/AuditBox";
import { RewardSummaryBox } from "./RewardSummary";
import { Pool } from "./Pool";
import { ibTokneData } from "hooks/useStake";
import { Link } from "react-router-dom";
import { useWeb3React } from "@web3-react/core";
import { GETRewardSummary } from "hooks/useStake";
import { FAIR_LAUNCH_ADDRESS, ibBNB_FAIRLAUNCH_PID } from "config/address";
/**
 * Stake 页面
 * @returns
 */
export const StakePage: React.FC = () => {
  const { account } = useWeb3React();
  /**
   * 路由跳转
   */
  const navigate = useNavigate();

  return (
    <>
      <RewardSummaryBox />
      <Box>
        <TitleBox>
          <Ldiv>
            <TipsIcon>Pools</TipsIcon>
            <MinTipsBar>
              After V3 upgrade, please go to old STAKE page to unstake ibToken
              and re-stake on V3 to get RABBIT rewards
            </MinTipsBar>
          </Ldiv>
          <OldBtn />
        </TitleBox>
        {/* 表格的顶部分类标题 */}
        <TheadBox>
          <TdBox>Pool</TdBox>
          <TdBox>APR</TdBox>
          <TdBox>TVL</TdBox>
          <TdBox className="TdWdith">Action</TdBox>
        </TheadBox>
        <TbodyBox>
          {ibTokneData.map((item: any, key: any) => (
            <TrBox key={key} >
              <TdBox>
                <TokenIcon IconName={item.tokenName} />
                <div style={{ marginLeft: 10 }}>{item.tokenName}</div>
              </TdBox>
              <TdBox>{item.APR}</TdBox>
              <TdBox>{item.TVL}</TdBox>
              <TdBox className="TdWdith">
                {/* //去除掉ib 后面根据id来查找数据 */}
                <Link to={`/stake/stake/${item.tokenName}`}>
                  <Button w={100} h={35}>
                    Stake
                  </Button>
                </Link>
                <Link to={`/stake/Unstake/${item.tokenName}`}>
                  <Button w={100} h={35} ml={20}>
                    Unstake
                  </Button>
                </Link>
              </TdBox>
            </TrBox>
          ))}
        </TbodyBox>
      </Box>
      <Pool />
      {/* 审计 */}
      <AuditBox />
    </>
  );
};

const Content = styled.div`
  width: 100%;
  height: 100%;
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

const PoolBox = styled(BgBox)`
  height: 218px;
  margin-top: 20px;
  padding: 20px;
`;
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
const PoolTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const PoolTitle1 = styled.div`
  font-size: 20px;
  color: #fff;
  margin: 20px;
`;
const PoolTitle2 = styled.div`
  display: flex;
  align-items: center;
  margin-right: 20px;
`;
const PoolListBox1 = styled.div`
  width: 100%;
  padding: 20px;
`;
const PoolListBox2 = styled.div`
  width: 100%;
  height: 80px;
  background-color: rgba(103, 72, 159, 0.3);
  border-radius: 5px;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const PoolVal = styled.div`
  color: #fff;
`;
const PoolBtn = styled.div`
  display: flex;
`;
const PoolListBoxVal = styled.div`
  display: flex;
  align-items: center;
`;
