import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { TipsIcon, MinTipsBar } from "components/icon";
import { BgBox } from "components/backgroundBox/background";
import { OldBtn, Button } from "components/button/button";
import { TokenIcon } from "components/icon/tokenIcon";
import "../index.css";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { ibBNB_ADDRESS } from "config/address";
import { ERC20, BankABI } from "config/ABI";
import { useNavigate } from "react-router-dom";
import {
  useTotalBorrowedData,
  useTotalDepositData,
  useBNBTokneBalance,
  useIbTokneBalance,
} from "state/Vault/hooks";
import store from "state";
import { useSelector } from "react-redux";
import { TokenList } from "./farmlist2";
import { Link } from "react-router-dom";
import ValueSkeleton from "components/ValueSkeleton"
import VaultAPY from "assets/page/VaultAPY.png"
import { Popover } from 'antd';
import { VaultApyContainer } from "./VaultApyContainer"
import { ibTokneData, getTotalAllocPoint } from "hooks/useStake";
import { LoadingBox } from "components/Loading";
import { subStringNum } from "utils/subStringNum";
import { borrowAprCommon } from "utils/BorrowApr"
/**
 * Vault页面里的数据展示表格
 * @returns
 */
export const ListBox: React.FC = () => {
  const { account, library } = useWeb3React<ethers.providers.Web3Provider>();
  const onTotalBorrowedData = useTotalBorrowedData();
  const onTotalDepositData = useTotalDepositData();
  const onBNBTokneBalance = useBNBTokneBalance();
  const onIbTokneBalance = useIbTokneBalance();

  useEffect(() => {
    //没有钱包地址，不请求
    if (!account) {
      return;
    }
    onTotalBorrowedData();
    onTotalDepositData({ library, account });
    //library当前账户 account钱包地址
    onBNBTokneBalance({ library, account });
    //Address当前钱包地址 Abi: ERC20 合约规范 library当前账户
    //TokenAddress: ibBNB_ADDRESS, ibbnb地址
    onIbTokneBalance({
      Address: account,
      Abi: ERC20,
      library: library,
      TokenAddress: ibBNB_ADDRESS,
    });
  }, [
    account,
    onTotalBorrowedData,
    onTotalDepositData,
    onBNBTokneBalance,
    onIbTokneBalance,
  ]);

  const listData = useSelector(store.getState);
  const BNBData = listData.VaultReducer.BNB;
  const [NEW_BNBData, setNEW_BNBData] = useState<any>({})
  const getAPRTVL = async () => {
    for (let i = 0; i < (ibTokneData.length); i++) {
      if (i > 0) {
        return;
      }
      const item = ibTokneData[i]
      const res = await getTotalAllocPoint(item.pid, item.ibTokneAddress,
        item.AmountsOutAddress);
      const newObj = JSON.parse(JSON.stringify(BNBData))
      newObj.APYObj['Staking'] = res.apr;
      const borrowApr = borrowAprCommon(
        BNBData.TotalBorrowed, BNBData.TotalDeposit)
      const u = BNBData.TotalBorrowed / BNBData.TotalDeposit;
      const Lending = borrowApr * u * 0.8
      newObj.APYObj['Lending'] = Lending;
      const total = (res.apr + Lending)
      const day = 1 + (total / 365);
      const APY = Math.pow(day, 365) - 1
      if (!isNaN(APY)) {
        newObj.APY = APY;
      }
      setNEW_BNBData(newObj);
    };
  }
  useEffect(() => {
    if (!account) {
      return;
    }

  }, [account]);
  useEffect(() => {
    if (!BNBData.TotalBorrowed) {
      return;
    }
    getAPRTVL();

    // setNEW_BNBData(newObj)
  }, [BNBData])
  /**
   * 路由跳转
   */
  const navigate = useNavigate();
  const DepositClick = () => {
    navigate("/Deposit", { state: BNBData.tokenName });
  };
  const WithdrawClick = () => {
    navigate("/Withdraw", { state: BNBData.tokenName });
  };
  function nFormatter(num: any, digits: any) {
    const si = [
      { value: 1, symbol: "" },
      { value: 1E3, symbol: "K" },
      { value: 1E6, symbol: "M" },
      { value: 1E9, symbol: "G" },
      { value: 1E12, symbol: "T" },
      { value: 1E15, symbol: "P" },
      { value: 1E18, symbol: "E" }
    ];
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    let i;
    for (i = si.length - 1; i > 0; i--) {
      if (num >= si[i].value) {
        break;
      }
    }
    return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
  }
  return (
    <Box>
      <TitleBox>
        <Ldiv>
          <TipsIcon>Pools</TipsIcon>
          <MinTipsBar>
            Users do not have to withdraw assets from Vaults, you can just
            re-stake your ibToken to the V3 Stake page
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
        <TdBox>APY</TdBox>
        {/* 总存款 */}
        <TdBox>Total Deposit</TdBox>
        {/* 总借款 */}
        <TdBox>Total Borrowed</TdBox>
        {/* 资金使用率  */}
        <TdBox>Utilization</TdBox>
        <TdBox style={{ minWidth: "120px" }}>Your Balance</TdBox>
        <TdBox className="TdWdith">Action</TdBox>
      </TheadBox>
      <TbodyBox>
        <TrBox>
          <TdBox>
            <TokenIcon IconName={"BNB"} />
            <APYBox>
              {BNBData.tokenName}
            </APYBox>
          </TdBox>
          <TdBox>
            {NEW_BNBData?.APY ?
              <div style={{ position: "relative" }}>
                <span style={{
                  fontSize: "14px", fontWeight: "bold",
                  color: "rgb(48, 162, 122)"
                }}>
                  {NEW_BNBData?.APY ? `${subStringNum(NEW_BNBData?.APY * 100, 2)}%` :
                    <LoadingBox />}
                </span>
                <Popover placement="right"
                  content={<VaultApyContainer data={NEW_BNBData} ></VaultApyContainer>}
                  trigger="click" overlayClassName="vaultApy"
                >
                  <APYImg src={VaultAPY}></APYImg>
                </Popover>
              </div>
              :
              <ValueSkeleton width={50}></ValueSkeleton>
            }
          </TdBox>
          <TdBox>
            {/* 总存款 */}
            <div style={{ width: "100px" }}>
              <div>
                <TopText>{BNBData?.TotalDeposit ?
                  BNBData.TotalDeposit > 1000 ? nFormatter(BNBData.TotalDeposit, 3)
                    : subStringNum(BNBData?.TotalDeposit, 6)
                  :
                  <ValueSkeleton width={50}></ValueSkeleton>
                }
                </TopText>
              </div>
              <div style={{ padding: "5px 0" }}>
                <BottomText>{BNBData.tokenName}</BottomText>
              </div>
            </div>
          </TdBox>
          <TdBox>
            {/* 总借款 */}
            <div style={{ width: "100px" }}>
              <div>
                <TopText>
                  {BNBData?.TotalBorrowed ?
                    BNBData.TotalBorrowed > 1000 ? nFormatter(BNBData.TotalBorrowed, 3) :
                      subStringNum(BNBData?.TotalBorrowed, 6)
                    :
                    <ValueSkeleton width={50}></ValueSkeleton>
                  }
                </TopText>
              </div>
              <div style={{ padding: "5px 0" }}>
                <BottomText>{BNBData.tokenName}</BottomText>
              </div>
            </div>
          </TdBox>
          <TdBox>
            {/* 资金使用率 总借款 / 总存款  */}
            <TopText>
              {(BNBData?.TotalBorrowed && BNBData.TotalDeposit) ?
                `${subStringNum(((BNBData.TotalBorrowed / BNBData.TotalDeposit) * 100), 2)}%`
                :
                <ValueSkeleton width={50}></ValueSkeleton>
              }
            </TopText>
          </TdBox>
          <TdBox style={{ minWidth: "120px" }}>
            {/* 余额 */}
            <div style={{ minWidth: "120px" }}>
              <div>
                {BNBData?.ibBalance ?
                  <>
                    <TopText>{(BNBData.ibBalance / 1).toFixed(6)}</TopText>
                    <BottomText style={{ marginLeft: "5px" }}>ibBNB</BottomText>
                  </>
                  :
                  <ValueSkeleton width={50}></ValueSkeleton>
                }
              </div>
              <div>
                {BNBData?.Balance ?
                  <>
                    <TopText>{(BNBData.Balance / 1).toFixed(6)}</TopText>
                    <BottomText style={{ marginLeft: "5px" }}>{BNBData.tokenName}</BottomText>
                  </>
                  // `${(BNBData.Balance / 1).toFixed(6)} ${BNBData.tokenName}`
                  :
                  <ValueSkeleton width={50}></ValueSkeleton>
                }
              </div>

            </div>
          </TdBox>
          <TdBox className="TdWdith">
            <Link to={`/Deposit/${BNBData.tokenName}`}>
              <Button w={60} h={35}>
                Deposit
              </Button>
            </Link>
            <Link to={`/Withdraw/${BNBData.tokenName}`}>
              <Button w={70} h={35} ml={10}>
                Withdraw
              </Button>
            </Link>
          </TdBox>
          {/* mobile */}
          <MTdBox>
            <div>
              <TokenIcon IconName={"BNB"} />
              <APYBox>
                {BNBData.tokenName}
              </APYBox>
            </div>
          </MTdBox>
          <MTdBox>
            <MobileAPYLeft>
              Lending APR:
            </MobileAPYLeft>
            <>
              {NEW_BNBData?.APY ?
                <div style={{ position: "relative" }}>
                  <span style={{
                    fontSize: "14px", fontWeight: "bold",
                    color: "#fff"
                  }}>
                    {subStringNum(NEW_BNBData?.APYObj.Lending * 100, 2)}%
                  </span>
                </div>
                :
                <ValueSkeleton width={50}></ValueSkeleton>
              }
            </>
          </MTdBox>
          <MTdBox>
            <MobileAPYLeft>
              Staking APR:
            </MobileAPYLeft>
            <>
              {NEW_BNBData?.APY ?
                <div style={{ position: "relative" }}>
                  <span style={{
                    fontSize: "14px", fontWeight: "bold",
                    color: "#fff"
                  }}>
                    {subStringNum(NEW_BNBData?.APYObj.Staking * 100, 2)}%
                  </span>
                </div>
                :
                <ValueSkeleton width={50}></ValueSkeleton>
              }
            </>

            {/* </TdBox> */}
          </MTdBox>
          <MTdBox>
            <MobileAPYLeft>
              Total APR:
            </MobileAPYLeft>
            <>
              {NEW_BNBData?.APY ?
                <div style={{ position: "relative" }}>
                  <span style={{
                    fontSize: "14px", fontWeight: "bold",
                    color: "#fff"
                  }}>
                    {subStringNum(
                      (NEW_BNBData?.APYObj.Lending +
                        NEW_BNBData?.APYObj.Staking)
                      * 100, 2)}%
                  </span>
                </div>
                :
                <ValueSkeleton width={50}></ValueSkeleton>
              }
            </>
          </MTdBox>
          <MTdBox>
            <MobileAPYLeft>
              APY
            </MobileAPYLeft>
            <>
              {NEW_BNBData?.APY ?
                <div style={{ position: "relative" }}>
                  <span style={{
                    fontSize: "14px", fontWeight: "bold",
                    color: "rgb(48, 162, 122)"
                  }}>
                    {subStringNum(NEW_BNBData?.APY * 100, 2)}%
                  </span>
                </div>
                :
                <ValueSkeleton width={50}></ValueSkeleton>
              }
            </>
          </MTdBox>
          <MTdBox>
            <MobileAPYLeft>
              Utilization
            </MobileAPYLeft>
            <TopText>
              {(BNBData?.TotalBorrowed && BNBData.TotalDeposit) ?
                `${subStringNum(((BNBData.TotalBorrowed / BNBData.TotalDeposit) * 100), 2)}%`
                :
                <ValueSkeleton width={50}></ValueSkeleton>
              }
            </TopText>
          </MTdBox>
          <MTdBox>
            <MobileAPYLeft>
              Total Deposit
            </MobileAPYLeft>
            <TopText>{BNBData?.TotalDeposit ?
              BNBData.TotalDeposit > 1000 ? nFormatter(BNBData.TotalDeposit, 3)
                : subStringNum(BNBData?.TotalDeposit, 6)
              :
              <ValueSkeleton width={50}></ValueSkeleton>
            }
            </TopText>
          </MTdBox>
          <MTdBox>
            <MobileAPYLeft>
              Total Borrowed
            </MobileAPYLeft>
            <TopText>
              {BNBData?.TotalBorrowed ?
                BNBData.TotalBorrowed > 1000 ? nFormatter(BNBData.TotalBorrowed, 2) :
                  subStringNum(BNBData?.TotalBorrowed, 6)
                :
                <ValueSkeleton width={50}></ValueSkeleton>
              }
            </TopText>
          </MTdBox>
          <MTdBox>
            <MobileAPYLeft>
              Your Balance
            </MobileAPYLeft>
            <TopText>
              <div>
                {BNBData?.ibBalance ?
                  <>
                    <TopText>{(BNBData.ibBalance / 1).toFixed(6)}</TopText>
                    <BottomText style={{ marginLeft: "5px" }}>ibBNB</BottomText>
                  </>
                  :
                  <ValueSkeleton width={50}></ValueSkeleton>
                }
              </div>
              <div>
                {BNBData?.Balance ?
                  <>
                    <TopText>{(BNBData.Balance / 1).toFixed(6)}</TopText>
                    <BottomText style={{ marginLeft: "5px" }}>{BNBData.tokenName}</BottomText>
                  </>
                  // `${(BNBData.Balance / 1).toFixed(6)} ${BNBData.tokenName}`
                  :
                  <ValueSkeleton width={50}></ValueSkeleton>
                }
              </div>
            </TopText>
          </MTdBox>
          <MTdBox style={{ margin: "15px 0" }}>
            <Link style={{ width: "50%", paddingRight: "10px" }}
              to={`/Deposit/${BNBData.tokenName}`}>
              <Button disabled={!!NEW_BNBData?.APY} w={0} h={35}>
                Deposit
              </Button>
            </Link>
            <Link style={{ width: "50%", paddingLeft: "10px" }}
              to={`/Withdraw/${BNBData.tokenName}`}>
              <Button disabled={!!NEW_BNBData?.APY} w={0} h={35}>
                Withdraw
              </Button>
            </Link>
          </MTdBox>
        </TrBox>
        <TokenList />
      </TbodyBox>
    </Box>
  );
};

const Box = styled(BgBox)`
  margin-top: 20px;
  padding: 20px;
  @media (max-width: 1000px) {
    padding: 10px;
  }
  .TdWdith {
    min-width: 150px;
  }
`;
const TitleBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
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
const MobileAPYLeft = styled.div`
    font-family: Arial;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.6;
    color:#fff;
`
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
const APYBox = styled.span`
  font-size: 14px;
    color: rgb(255, 255, 255);
  font-weight: bold;
  margin-left: 10px;
`
const TopText = styled.span`
  font-size: 14px;
  color: rgb(255, 255, 255);
  font-family: Arial;
    font-weight: 400;
`
const BottomText = styled.span`
    font-size: 12px;
    color: rgba(255, 255, 255, 0.5);
`
const APYImg = styled.img`
  width:15px;
  margin-left: 5px;
  margin-top: -5px;
`
