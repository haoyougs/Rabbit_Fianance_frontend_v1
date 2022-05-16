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
import { ibTokneData, getTotalAllocPoint } from "hooks/useStake";
import { Link } from "react-router-dom";
import { useWeb3React } from "@web3-react/core";
import { subStringNum } from "utils/subStringNum";
import { LoadingBox } from "components/Loading";

/**
 * Stake 页面
 * @returns
 */
export const StakePage: React.FC = () => {
  const { account } = useWeb3React();
  const [StakeList, setStakeList] = useState<any>([])
  /**
   * 路由跳转
   */
  const navigate = useNavigate();
  const getAPRTVL = async () => {
    let arr: any = [];
    for (let i = 0; i < (ibTokneData.length); i++) {
      const item = ibTokneData[i]
      const res = await getTotalAllocPoint(item.pid, item.ibTokneAddress,
        item.AmountsOutAddress);
      item.TVL = res.tvl + '';
      item.APR = res.apr + '';
      arr.push(item);
      setStakeList([])
      setStakeList(ibTokneData)
    };
  }
  useEffect(() => {
    if (!account) {
      return;
    }
    getAPRTVL()
  }, [account])
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
        {/* 表格的顶部分类标题 */}
        <TheadBox>
          <TdBox>Pool</TdBox>
          <TdBox>APR</TdBox>
          <TdBox>TVL</TdBox>
          <TdBox className="TdWdith">Action</TdBox>
        </TheadBox>
        <TbodyBox>
          {StakeList.map((item: any, key: any) => (
            <TrBox key={key} >
              <TdBox>
                <TokenIcon IconName={item.tokenName} />
                <div style={{ marginLeft: 10 }}>
                  <TopText>
                    {item.tokenName ? item.tokenName : <LoadingBox />}
                  </TopText>
                </div>
              </TdBox>
              <TdBox style={{
                fontSize: "14px", fontWeight: "bold",
                color: "rgb(48, 162, 122)"
              }}>{
                  item.APR ?
                    <> {subStringNum(item.APR * 100, 2)}% </>
                    : <LoadingBox />}
              </TdBox>
              <TdBox>
                <TopText>
                  {item.TVL ?
                    <>${subStringNum(item.TVL, 6)}</> : <LoadingBox />}
                </TopText>
              </TdBox>
              <TdBox className="TdWdith">
                {/* //去除掉ib 后面根据id来查找数据 */}
                <Link to={`/stake/stake/${item.tokenName}`}>
                  <Button w={90} h={35}>
                    Stake
                  </Button>
                </Link>
                <Link to={`/stake/Unstake/${item.tokenName}`}>
                  <Button w={90} h={35} ml={20}>
                    Unstake
                  </Button>
                </Link>
              </TdBox>
              {/* mobile */}
              <MTdBox>
                <div>
                  <TokenIcon IconName={item.tokenName} />
                  <TopText style={{ marginLeft: 10 }}>
                    {item.tokenName}
                  </TopText>
                </div>
              </MTdBox>
              <MTdBox>
                <MobileAPYLeft>
                  APR
                </MobileAPYLeft>
                <div style={{
                  fontSize: "14px", fontWeight: "bold",
                  color: "rgb(48, 162, 122)"
                }}>
                  {item.APR ?
                    <>
                      {subStringNum(item.APR * 100, 2)}%
                    </> : <LoadingBox />
                  }
                </div>
              </MTdBox>
              <MTdBox>
                <MobileAPYLeft>
                  TVL
                </MobileAPYLeft>
                <TopText>
                  {
                    item.TVL ?
                      <>
                        ${subStringNum(item.TVL, 6)}
                      </> : <LoadingBox />
                  }

                </TopText>
              </MTdBox>
              <MTdBox style={{ margin: "15px 0" }}>
                {/* //去除掉ib 后面根据id来查找数据 */}
                <Link style={{ width: "50%", paddingRight: "10px" }}
                  to={`/stake/stake/${item.tokenName}`}>
                  <Button disabled={!!item.TVL} w={0} h={35}>
                    Stake
                  </Button>
                </Link>
                <Link style={{ width: "50%", paddingLeft: "10px" }}
                  to={`/stake/Unstake/${item.tokenName}`}>
                  <Button disabled={!!item.TVL} w={0} h={35}>
                    Unstake
                  </Button>
                </Link>
              </MTdBox>
            </TrBox>
          ))}
          {
            !StakeList.length ?
              <div style={{ width: "100%", height: "100px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <LoadingBox height={30} width={200} />
              </div>
              : ""
          }
        </TbodyBox>
      </Box>
      {/* <Pool /> */}
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
  @media (max-width: 1000px) {
    padding: 10px;
  }
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
  @media (max-width: 1000px) {
    display: none;
  }
`;
const Mdiv = styled.div`
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
const TdBox = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  @media (max-width: 1000px) {
    display: none;
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
const TbodyBox = styled.div``;
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
const TopText = styled.span`
  font-size: 14px;
  color: rgb(255, 255, 255);
  font-family: Arial;
    font-weight: 400;
`
