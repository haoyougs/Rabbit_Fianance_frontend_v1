import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button } from "components/button/button";
import { TokenIcon } from "components/icon/tokenIcon";
import "../index.css";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { Link, useNavigate } from "react-router-dom";
import store from "state";
import { useSelector } from "react-redux";
import { VAultListAddress } from "config/address";
import {
  useTotalDeposit,
  useTotalBorrowedData,
  useTokneBalance,
  useIbTokenBalance,
} from "state/VaultList/hooks";
// import { Router } from "react-router-dom";
import { ERC20 } from "config/ABI";
import ValueSkeleton from "components/ValueSkeleton";
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
export const TokenList: React.FC = () => {
  const { account, library } = useWeb3React<ethers.providers.Web3Provider>();

  const OnTotalDeposit = useTotalDeposit();
  const OnTotalBorrowedData = useTotalBorrowedData();
  const OnTokneBalance = useTokneBalance();
  const OnIbTokenBalance = useIbTokenBalance();
  //请求接口
  const awer = (library: any) => {
    VAultListAddress.forEach((item, key) => {
      //银行币种存款总量
      OnTotalDeposit({
        bankAddress: item.bankAddress,
        tikenAddress: item.tikenAddress,
        key: key,
        library: library,
        account: account
      });
      //获取银行总借款
      OnTotalBorrowedData({
        TokenAddress: item.tikenAddress,
        key: key,
      });
      //获取用户币种余额
      if (library) {
        // //////console.log(item)
        OnTokneBalance({
          Address: account,
          Abi: ERC20,
          library: library,
          TokenAddress: item.tikenAddress,
          key: key,
        });
      }
      //获取用户ibtoken余额
      if (library) {
        OnIbTokenBalance({
          Address: account,
          Abi: ERC20,
          library: library,
          TokenAddress: item.ibtokenAddress,
          key: key,
        });
      }
    });
  };
  const Store = useSelector(store.getState);
  let Data = Store.VaultList;
  const [NEW_Data, setNEW_Data] = useState<any>([]);

  const getAPRTVL = async () => {
    const newObj = JSON.parse(JSON.stringify(Data));
    for (let i = 0; i < (ibTokneData.length); i++) {
      if (i > 0) {
        const item = ibTokneData[i];
        // console.log(111, item)
        const res = await getTotalAllocPoint(item.pid, item.ibTokneAddress,
          item.AmountsOutAddress);
        newObj[i - 1].APYObj = {
          Lending: 0,
          Staking: 0,
          Total: 0,
        }
        newObj[i - 1].APYObj.Staking = res.apr;
        const borrowApr = borrowAprCommon(
          newObj[i - 1].TotalBorrowed, newObj[i - 1].TotalDeposit)
        const u = newObj[i - 1].TotalBorrowed / newObj[i - 1].TotalDeposit;
        const Lending = borrowApr * u * 0.8;
        newObj[i - 1].APYObj['Lending'] = Lending;
        const total = (res.apr + Lending);
        const day = 1 + (total / 365);
        const APY = Math.pow(day, 365) - 1;
        if (!isNaN(APY)) {
          newObj[i - 1].APY = APY;
        };
        setNEW_Data(newObj)
      }
    };
  }
  useEffect(() => {
    if (!Data[4].TotalBorrowed) {
      return;
    }
    getAPRTVL()
  }, [account, Data])
  const navigate = useNavigate();
  useEffect(() => {
    //没有钱包地址，不请求
    if (!account) {
      return;
    }
    awer(library);
  }, [library, account]);
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
    <>
      {NEW_Data.length ? NEW_Data.map((item: any, key: any) => (
        <TrBox key={key}>
          <TdBox>
            <TokenIcon IconName={item.tokenName} />
            <APYBox>{item.tokenName}</APYBox>
          </TdBox>
          <TdBox>
            {item?.APY ?
              <div style={{ position: "relative" }}>
                <span style={{
                  fontSize: "14px", fontWeight: "bold",
                  color: "rgb(48, 162, 122)"
                }}>
                  {item?.APY ? `${subStringNum(item?.APY * 100, 2)}%` :
                    <LoadingBox />}
                </span>
                <Popover placement="right"
                  content={<VaultApyContainer data={item} ></VaultApyContainer>}
                  trigger="click" overlayClassName="vaultApy">
                  <APYImg src={VaultAPY}></APYImg>
                </Popover>
              </div>
              :
              <ValueSkeleton width={50}></ValueSkeleton>
            }
          </TdBox>
          <TdBox>
            {/* 总存款 */}
            <div>
              <div>
                <TopText>
                  {item?.TotalDeposit ?
                    item?.TotalDeposit > 1000 ? nFormatter(item?.TotalDeposit, 3) : parseFloat(item?.TotalDeposit).toFixed(6)
                    :
                    <ValueSkeleton width={50}></ValueSkeleton>
                  }
                </TopText>
              </div>
              <div style={{ padding: "5px 0" }}>
                <BottomText>{item.tokenName}</BottomText>
              </div>
            </div>
          </TdBox>
          <TdBox>
            <div>
              {/* 总借款 */}
              <div>
                <TopText>
                  {item?.TotalBorrowed ?
                    item?.TotalBorrowed > 1000 ? nFormatter(item?.TotalBorrowed, 3) : parseFloat(item?.TotalBorrowed).toFixed(6)
                    :
                    <ValueSkeleton width={50}></ValueSkeleton>
                  }
                </TopText>
              </div>
              {/* <div style={{ marginTop: 10 }}>{item.tokenName}</div> */}
              <div style={{ padding: "5px 0" }}>
                <BottomText>{item.tokenName}</BottomText>
              </div>
            </div>
          </TdBox>
          <TdBox>
            {/* 资金使用率 总借款 / 总存款  */}
            <TopText>
              {(item?.TotalBorrowed && item?.TotalDeposit) ?
                `${subStringNum(((item.TotalBorrowed / item.TotalDeposit) * 100), 2)}%`
                :
                <ValueSkeleton width={50}></ValueSkeleton>
              }
            </TopText>
          </TdBox>
          <TdBox style={{ minWidth: "120px" }}>
            {/* 余额 */}
            <div style={{ minWidth: "120px" }}>
              <div style={{ marginTop: 10 }}>
                {item?.ibBalance ?

                  <>
                    <TopText>{(item.ibBalance / 1).toFixed(6)}</TopText>
                    <BottomText style={{ marginLeft: "5px" }}>ib{item.tokenName}</BottomText>
                  </>

                  // `${(item.ibBalance / 1).toFixed(6)} ib${item.tokenName}`
                  :
                  <ValueSkeleton width={50}></ValueSkeleton>
                }
              </div>
              <div>
                {item?.Balance ?
                  <>
                    <TopText>{(item.Balance / 1).toFixed(6)}</TopText>
                    <BottomText style={{ marginLeft: "5px" }}>{item.tokenName}</BottomText>
                  </>

                  // `${(item.Balance / 1).toFixed(6)} ${item.tokenName}`
                  :
                  <ValueSkeleton width={50}></ValueSkeleton>
                }
              </div>

            </div>
          </TdBox>
          <TdBox className="TdWdith">
            <Link to={`/Deposit/${item.tokenName}?${key}`}>
              <Button w={80} h={35}>
                Deposit
              </Button>
            </Link>

            <Link to={`/Withdraw/${item.tokenName}?${key}`}>
              <Button w={80} h={35} ml={10}>
                Withdraw
              </Button>
            </Link>
          </TdBox>
          {/* mobile */}
          <MTdBox>
            <div>
              <TokenIcon IconName={item.tokenName} />
              <APYBox>
                {item.tokenName}
              </APYBox>
            </div>
          </MTdBox>
          <MTdBox>
            <MobileAPYLeft>
              Lending APR:
            </MobileAPYLeft>
            <>
              {item?.APY ?
                <div style={{ position: "relative" }}>
                  <span style={{
                    fontSize: "14px", fontWeight: "bold",
                    color: "#fff"
                  }}>
                    {subStringNum(item?.APYObj.Lending * 100, 2)}%
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
              {item?.APY ?
                <div style={{ position: "relative" }}>
                  <span style={{
                    fontSize: "14px", fontWeight: "bold",
                    color: "#fff"
                  }}>
                    {subStringNum(item?.APYObj.Staking * 100, 2)}%
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
              {item?.APY ?
                <div style={{ position: "relative" }}>
                  <span style={{
                    fontSize: "14px", fontWeight: "bold",
                    color: "#fff"
                  }}>
                    {subStringNum(
                      (item?.APYObj.Lending +
                        item?.APYObj.Staking)
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
              {item?.APY ?
                <div style={{ position: "relative" }}>
                  <span style={{
                    fontSize: "14px", fontWeight: "bold",
                    color: "rgb(48, 162, 122)"
                  }}>
                    {subStringNum(item?.APY * 100, 2)}%
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
              {(item?.TotalBorrowed && item?.TotalDeposit) ?
                `${subStringNum(((item.TotalBorrowed / item.TotalDeposit) * 100), 2)}%`
                :
                <ValueSkeleton width={50}></ValueSkeleton>
              }
            </TopText>
          </MTdBox>
          <MTdBox>
            <MobileAPYLeft>
              Total Deposit
            </MobileAPYLeft>
            <TopText>{item?.TotalDeposit ?
              item.TotalDeposit > 1000 ? nFormatter(item.TotalDeposit, 3)
                : subStringNum(item?.TotalDeposit, 6)
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
              {item?.TotalBorrowed ?
                item.TotalBorrowed > 1000 ? nFormatter(item.TotalBorrowed, 2) :
                  subStringNum(item?.TotalBorrowed, 6)
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
                {item?.ibBalance ?
                  <>
                    <TopText>{(item.ibBalance / 1).toFixed(6)}</TopText>
                    <BottomText style={{ marginLeft: "5px" }}>ibBNB</BottomText>
                  </>
                  :
                  <ValueSkeleton width={50}></ValueSkeleton>
                }
              </div>
              <div>
                {item?.Balance ?
                  <>
                    <TopText>{(item.Balance / 1).toFixed(6)}</TopText>
                    <BottomText style={{ marginLeft: "5px" }}>{item.tokenName}</BottomText>
                  </>
                  :
                  <ValueSkeleton width={50}></ValueSkeleton>
                }
              </div>
            </TopText>
          </MTdBox>
          <MTdBox style={{ margin: "15px 0" }}>
            <Link style={{ width: "50%", paddingRight: "10px" }} to={`/Deposit/${item.tokenName}`}>
              <Button disabled={!!item?.APY} w={0} h={35}>
                Deposit
              </Button>
            </Link>
            <Link style={{ width: "50%", paddingLeft: "10px" }} to={`/Withdraw/${item.tokenName}`}>
              <Button disabled={!!item?.APY} w={0} h={35}>
                Withdraw
              </Button>
            </Link>
          </MTdBox>
        </TrBox>
      )) : null}
    </>
  );
};

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
    font-family: Arial;
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
`
