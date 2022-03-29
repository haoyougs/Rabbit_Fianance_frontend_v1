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

/**
 * MyPositionsPage 我的仓位页面
 * @returns
 */
export const MyPositionsPage: React.FC = () => {
  const { account } = useWeb3React();
  const [PositionData, setPositionData] = useState<any>([]);
  const [PositionImg, setPositionImg] = useState<boolean>(false);
  const [Loading, setLoading] = useState(false);
  useEffect(() => {
    if (account) {
      QueryBin(account).then((res) => {
        setPositionData(res);
        // res.map((item: any, key: any) => {
        //   let Data = [];
        //   Data.push(res)
        //   setPositionData(Data)
        //   //如果positionsValue的值等于0的话就不展示仓位,吧表示没有仓位的图片设置为true
        //   if(ethers.utils.formatUnits(item.positionsValue) == '0'){
        //     setPositionImg(true);
        //   }
        // });
      });
    }
  }, [QueryBin, account]);

  const [AddShou, setAddShou] = useState(false);
  const [CloseShou, setCloseShou] = useState(false);
  const [AddCollateralData,setAddCollateralData] = useState<any>()
  const AddCollateralClick =(item:any)=>{
    setAddCollateralData(item)
    setAddShou(!AddShou)
  }
  const ClosePosition =(item:any)=>{
    setAddCollateralData(item)
    setCloseShou(!AddShou)
  }
  return (
    <>
      <RewardSummary>
        <RewardSummaryIcon>
          My Positions{" "}
          <Button w={120} h={37} ml={20}>
            PancakeSwap
          </Button>
          <Button w={120} h={37} ml={20}>
            MDEX
          </Button>
        </RewardSummaryIcon>
        <RewardSummaryList>
          {PositionData == [] || PositionImg == true ? (
            <>
              <PositionsImg src={MyPositionsImg} alt="" />
              <TipsBox>There is no order at present</TipsBox>
            </>
          ) : (
            <>
              {PositionData.map((item: any, key: any) => (
                <div key={key} style={{ width: "100%" }}>
                  {ethers.utils.formatUnits(item.positionsValue) !== "0.0" ? (
                    <Position>
                      <TitleBox>
                        <TitleContent>
                          <TokenIcon IconName={"USDT-BNB"} />
                          <TokenNmae>USDT-BNB</TokenNmae>
                        </TitleContent>
                        <TitleContent>
                          <Earned>Earned：</Earned>
                          <EarnedVal></EarnedVal>
                          <Button w={100} h={35} ml={10}>
                            Claim
                          </Button>
                        </TitleContent>
                      </TitleBox>
                      <Content>
                        <ContBox>
                          <MinTitle>Position Value</MinTitle>
                          <PositionValues>
                  
                                {Number(
                                  ethers.utils.formatUnits(item.positionsValue)
                                ).toFixed(6)}
                             
                          </PositionValues>
                        </ContBox>
                        <ContBox>
                          <MinTitle>Total debts</MinTitle>
                          <PositionValues>
                            {Number(
                              ethers.utils.formatUnits(item.totalValue)
                            ).toFixed(6)}
                            {/* {<LoadingBox height={14} />} */}
                          </PositionValues>
                        </ContBox>
                        <ContBox>
                          <MinTitle>Equity Value</MinTitle>
                          <PositionValues>
                            {Number(
                              ethers.utils.formatUnits(item.positionsValue)
                            ) -
                              Number(ethers.utils.formatUnits(item.totalValue))}
                            {/* {<LoadingBox height={14} />} */}
                          </PositionValues>
                        </ContBox>
                        <ContBox>
                          <MinTitle>Yield (APY)</MinTitle>
                          <PositionValues2>
                            {/* {<LoadingBox height={14} />}  */}
                            <Icon1 src={Duihao} />
                          </PositionValues2>
                        </ContBox>
                        <ContBox>
                          <MinTitle>Risk ratio</MinTitle>
                          <PositionValues>
                            {(Number(item.totalValue) /
                              Number(item.positionsValue)) *
                              100}
                            %
                            {/* {<LoadingBox height={14} />} */}
                          </PositionValues>
                        </ContBox>
                        <ContBox2>
                          <Button
                            w={150}
                            h={35}
                            onClick={() => AddCollateralClick(item)}
                          >
                            Add Collateral
                          </Button>
                          <Button
                            w={150}
                            h={35}
                            mt={10}
                            onClick={() => ClosePosition(item)}
                          >
                            Close Position
                          </Button>
                        </ContBox2>
                      </Content>
                    </Position>
                  ) : null}
                </div>
              ))}
            </>
          )}
        </RewardSummaryList>
      </RewardSummary>
      <AuditBox />
      {/* 弹窗 */}
      {AddShou ? (
        <AddCollateralPage onClick={() => setAddShou(!AddShou)} Data={AddCollateralData} />
      ) : null}
      {CloseShou ? (
        <ClosePositionPage onClick={() => setCloseShou(!CloseShou)} Data={AddCollateralData} />
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
