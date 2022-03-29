import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BgBox } from "components/backgroundBox/background";
import { RewardSummaryIcon } from "components/icon";
import { AuditBox } from "components/backgroundBox/AuditBox";
import MyPositionsImg from "assets/none@2x.png";
import { Button } from "components/button/button";
import { TokenIcon } from "components/icon/tokenIcon";
import { LoadingBox } from "components/Loading";
import { Link } from "react-router-dom";
import shangIcon from "assets/xiangshang.png";
import xiaIcon from "assets/xiangxia.png";
/**
 * Your Reward Summary 组件
 * @returns
 */
export const LiquidationPage: React.FC = () => {
  return (
    <>
      <RewardSummary>
        <RewardSummaryIcon>All Positions</RewardSummaryIcon>
        <RewardSummaryList>
          <TheadBox>
            <TdBox>Liquidation list</TdBox>
            <TdBox>Supply value</TdBox>
            <TdBox>Loan value</TdBox>
            <TdBox>Position value</TdBox>
            <TdBox>Risk ratio</TdBox>
            <TdBox className="TdWdith"> Liquidate </TdBox>
          </TheadBox>
          <TbodyBox>
            <TrBox>
              <TdBox>
                <TokenIcon IconName={"BNB-UNI"} />
                <div>
                  <div style={{ marginLeft: 10 }}>
                    <LoadingBox />
                  </div>
                  <div style={{ marginLeft: 10 }}>
                    <LoadingBox />
                  </div>
                </div>
              </TdBox>
              <TdBox>
                <LoadingBox />
              </TdBox>
              <TdBox>
                <LoadingBox />
              </TdBox>
              <TdBox>
                <LoadingBox />
              </TdBox>
              <TdBox>
                <LoadingBox />
              </TdBox>
              <TdBox className="TdWdith">
                <Button w={100} h={35} ml={0}>
                  Liquidate
                </Button>
              </TdBox>
            </TrBox>
          </TbodyBox>
        </RewardSummaryList>
      </RewardSummary>
      <AuditBox />
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

const TdBox = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
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
const TheadBox = styled.div`
  width: 100%;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
  padding: 0 20px 20px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
`;
const TbodyBox = styled.div`
  width: 100%;
`;
