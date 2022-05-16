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
import { https } from "utils/https";
import { TokenName } from "config/TokenName";
import {
  FarmAddressArrs
} from "config/LPAddress";
/**
 * Your Reward Summary 组件
 * @returns
 */
export const LiquidationPage: React.FC = () => {
  const params = {
    type: "get",
    url: "https://api.rabbitfinance.io/api/v1/get_liq_pool"
  }
  const [Liquidation, setLiquidation] = useState<any>([]);
  // const getLiquidation =
  useEffect(() => {
    (async () => {
      const res: any = await https(params);
      // console.log(res);
      const data = res.data;
      data.forEach((item: any) => {
        // const crr = FarmAddressArrs.filter(Fitem => Fitem.Goblin == item.Goblin);
        let name0 = "";
        const TokenName0 = TokenName.filter((t: any) => t.token.toUpperCase() == item.Token0.toUpperCase());
        name0 = TokenName0[0]?.name;
        let name1 = "";
        const TokenName1 = TokenName.filter((t: any) => t.token.toUpperCase() == item.Token1.toUpperCase());
        name1 = TokenName1[0]?.name;

        // console.log(name0, name1)
        if (name0 && name1) {
          item.LPtokenName = name0 + '-' + name1
        } else {
          item.LPtokenName = "RABBIT-BNB";
        }
      });
      setLiquidation(data)
    })()
  }, [])

  return (
    <>
      <RewardSummary>
        <RewardSummaryIcon>All Positions</RewardSummaryIcon>
        <RewardSummaryList>
          <TheadBox>
            <ThBox style={{ width: "20%" }}>Liquidation list</ThBox>
            <ThBox>Supply value</ThBox>
            <ThBox>Loan value</ThBox>
            <ThBox>Position value</ThBox>
            <ThBox style={{ width: "20%" }}>Risk ratio</ThBox>
            <ThBox style={{ width: "10%" }}> Liquidate </ThBox>
          </TheadBox>
          <TbodyBox>
            {Liquidation.map((item: any, key: any) => (
              <TrBox key={key}>
                <TdBox style={{ width: "20%" }}>
                  {item.LPtokenName ? <>
                    <TokenIcon IconName={item.LPtokenName} />
                    <span>{item.LPtokenName}</span>
                  </> :
                    <div>
                      <LoadingBox />
                      <LoadingBox />
                    </div>
                  }
                </TdBox>
                <TdBox>
                  {item.PositionsValue && item.TotalValue ?
                    `${(item.PositionsValue - item.TotalValue).toFixed(2)}`
                    :
                    <LoadingBox />
                  }
                </TdBox>
                <TdBox>
                  {item.TotalValue ?
                    `${parseFloat(item.TotalValue).toFixed(2)}`
                    : <LoadingBox />
                  }
                </TdBox>
                <TdBox>
                  {item.PositionsValue ?
                    `${parseFloat(item.PositionsValue).toFixed(2)}`
                    : <LoadingBox />
                  }
                </TdBox>
                <TdBox style={{ width: "20%" }}>
                  {item.GlobalRisk ?
                    <>
                      {(item.GlobalRisk * 100).toFixed(2)} %
                      <RiskBox>
                        <RiskProcess width={item.GlobalRisk}></RiskProcess>
                      </RiskBox>
                    </>
                    : <LoadingBox />
                  }
                </TdBox>
                <TdBox style={{ width: "10%" }}>
                  <Button w={100} h={35} ml={0}>
                    Liquidate
                  </Button>
                </TdBox>
                <MTdBox>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <TokenIcon IconName={item.LPtokenName} />
                    <MTdBoxLeft>
                      {item.LPtokenName}
                    </MTdBoxLeft>
                  </div>
                </MTdBox>
                <MTdBox>
                  <MTdBoxLeft>
                    Supply value
                  </MTdBoxLeft>
                  <div>
                    {item.PositionsValue && item.TotalValue ?
                      `${(item.PositionsValue - item.TotalValue).toFixed(2)}`
                      :
                      <LoadingBox />
                    }
                  </div>
                </MTdBox>
                <MTdBox>
                  <MTdBoxLeft>
                    Loan value
                  </MTdBoxLeft>
                  <div>
                    {item.TotalValue ?
                      `${parseFloat(item.TotalValue).toFixed(2)}`
                      : <LoadingBox />
                    }
                  </div>
                </MTdBox>
                <MTdBox>
                  <MTdBoxLeft>
                    Position value
                  </MTdBoxLeft>
                  <div>
                    {item.PositionsValue ?
                      `${parseFloat(item.PositionsValue).toFixed(2)}`
                      : <LoadingBox />
                    }
                  </div>
                </MTdBox>
                <MTdBox>
                  <MTdBoxLeft>
                    Risk ratio
                  </MTdBoxLeft>
                  <div>
                    {item.GlobalRisk ?
                      <div style={{ display: "flex" }}>
                        {(item.GlobalRisk * 100).toFixed(2)} %
                        <RiskBox>
                          <RiskProcess width={item.GlobalRisk}></RiskProcess>
                        </RiskBox>
                      </div>
                      : <LoadingBox />
                    }
                  </div>
                </MTdBox>
                <MTdBox>
                  <div style={{ width: "100%", justifyContent: "center", display: "flex" }}>
                    <Button w={100} h={35} ml={0}>
                      Liquidate
                    </Button>
                  </div>
                </MTdBox>
              </TrBox>
            ))}
          </TbodyBox>
        </RewardSummaryList>
        {
          !Liquidation.length ?
            <div style={{ width: "100%", height: "700px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <LoadingBox height={30} width={200} />
            </div>
            : ""
        }
      </RewardSummary>
      <AuditBox />
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
const RewardSummaryList = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  padding: 20px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  @media (max-width: 1000px) {
    padding: 0px;
  }
`;
const TheadBox = styled.div`
  width: 100%;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
  padding: 0 20px 20px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  @media (max-width: 1000px) {
    display: none;
  }
`;
const TbodyBox = styled.div`
  width: 100%;
`;
const ThBox = styled.div`
  width: 16%;
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
  @media (max-width: 1000px) {
    padding: 10px;
    height: auto;
    flex-direction: column;
  }
`;
const TdBox = styled.div`
  width: 16%;
  display: flex;
  align-items: center;
  @media (max-width: 1000px) {
    display: none;
  }
`;
const RiskBox = styled.div`
    width: 60px;
    height: 16px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 3px;
    padding: 4px;
`
const RiskProcess = styled.div<{ width: any }>`
    width: ${props => props.width * 100}%;
    height: 6px;
    background-color: red;
`
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
const MTdBoxLeft = styled.div`
    font-family: Arial;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.6;
    color:#fff;
`