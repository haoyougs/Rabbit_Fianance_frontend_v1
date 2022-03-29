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

/**
 * Vault页面里的数据展示表格
 * @returns
 */
export const ListBox: React.FC = () => {
  const { account, library } = useWeb3React<ethers.providers.Web3Provider>();
  const onTotalBorrowedData = useTotalBorrowedData();
  const onTotalDepositData = useTotalDepositData();
  const onBNBTokneBalanc = useBNBTokneBalance();
  const onIbTokneBalance = useIbTokneBalance();

  useEffect(() => {
    if (!account) {
      return;
    }
    onTotalBorrowedData();
    onTotalDepositData();
    onBNBTokneBalanc({ library: library, TokenAddress: account });

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
    onBNBTokneBalanc,
    onIbTokneBalance,
  ]);
  const listData = useSelector(store.getState);
  const Data1 = listData.VaultReducer.BNB;
  /**
   * 路由跳转
   */
  const navigate = useNavigate();
  const DepositClick = () => {
    navigate("/Deposit", { state: Data1.tokenName });
  };
  const WithdrawClick = () => {
    navigate("/Withdraw", { state: Data1.tokenName });
  };

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
        <OldBtn />
      </TitleBox>
      {/* 表格的顶部分类标题 */}
      <TheadBox>
        <TdBox>Pool</TdBox>
        <TdBox>APY</TdBox>
        <TdBox>Total Deposit</TdBox>
        <TdBox>Total Borrowed</TdBox>
        <TdBox>Utilization</TdBox>
        <TdBox>Your Balance</TdBox>
        <TdBox className="TdWdith">Action</TdBox>
      </TheadBox>
      <TbodyBox>
        <TrBox>
          <TdBox>
            <TokenIcon IconName={"BNB"} />
            <div style={{ marginLeft: 10 }}>BNB</div>
          </TdBox>
          <TdBox>Apy</TdBox>
          <TdBox>
            <div>
              <div>{(Data1.TotalDeposit / 1).toFixed(2)}k</div>
              <div style={{ marginTop: 10 }}>BNB</div>
            </div>
          </TdBox>
          <TdBox>
            <div>
              <div>{(Data1.TotalBorrowed / 1).toFixed(2)}k</div>
              <div style={{ marginTop: 10 }}>BNB</div>
            </div>
          </TdBox>
          <TdBox>
            {((Data1.TotalBorrowed / Data1.TotalDeposit) * 100).toFixed(2)}%
          </TdBox>
          <TdBox>
            <div>
              <div>{(Data1.Balance / 1).toFixed(6)} BNB</div>
              <div style={{ marginTop: 10 }}>
                {(Data1.ibBalance / 1).toFixed(6)} ibBNB
              </div>
            </div>
          </TdBox>
          <TdBox className="TdWdith">
            <Link to={`/Deposit/${Data1.tokenName}`}>
              <Button w={100} h={35}>
                Deposit
              </Button>
            </Link>
            <Link to={`/Withdraw/${Data1.tokenName}`}>
              <Button w={100} h={35} ml={10}>
                Withdraw
              </Button>
            </Link>
          </TdBox>
        </TrBox>
        <TokenList />
      </TbodyBox>
    </Box>
  );
};

const Box = styled(BgBox)`
  margin-top: 20px;
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