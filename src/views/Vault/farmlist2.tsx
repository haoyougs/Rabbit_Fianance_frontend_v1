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
import { Router } from "react-router-dom";
import { ERC20 } from "config/ABI";

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
  const awer = (library: any) => {    
    VAultListAddress.forEach((item, key) => {
      OnTotalDeposit({
        bankAddress: item.bankAddress,
        tikenAddress: item.tikenAddress,
        key: key,
      });
      OnTotalBorrowedData({
        TokenAddress: item.tikenAddress,
        key: key,
      });
      if (library) {
        OnTokneBalance({
          library: library,
          TokenAddress: item.tikenAddress,
          key: key,
        });
      }
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
  // console.log(Store.VaultList);
  // const [Data, setData] = useState(Store.VaultList);

  const navigate = useNavigate();

  useEffect(() => {
    awer(library);
  }, [library]);

  return (
    <>
      {Data.map((item, key) => (
        <TrBox key={key}>
          <TdBox>
            <TokenIcon IconName={item.tokenName} />
            <div style={{ marginLeft: 10 }}>{item.tokenName}</div>
          </TdBox>
          <TdBox>Apy</TdBox>
          <TdBox>
            <div>
              <div>{(item.TotalDeposit / 1).toFixed(2)}</div>
              <div style={{ marginTop: 10 }}>{item.tokenName}</div>
            </div>
          </TdBox>
          <TdBox>
            <div>
              <div>{(item.TotalBorrowed / 1).toFixed(2)}</div>
              <div style={{ marginTop: 10 }}>{item.tokenName}</div>
            </div>
          </TdBox>
          <TdBox>
            {((item.TotalBorrowed / item.TotalDeposit) * 100).toFixed(2)}%
          </TdBox>
          <TdBox>
            <div>
              <div>
                {(item.Balance / 1).toFixed(6)} {item.tokenName}
              </div>
              <div style={{ marginTop: 10 }}>
                {(item.ibBalance / 1).toFixed(6)} ib{item.tokenName}
              </div>
            </div>
          </TdBox>
          <TdBox className="TdWdith">
            <Link to={`/Deposit/${item.tokenName}`}>
              <Button w={100} h={35}>
                Deposit
              </Button>
            </Link>

            <Link to={`/Withdraw/${item.tokenName}`}>
              <Button w={100} h={35} ml={10}>
                Withdraw
              </Button>
            </Link>
          </TdBox>
        </TrBox>
      ))}
    </>
  );
};

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
