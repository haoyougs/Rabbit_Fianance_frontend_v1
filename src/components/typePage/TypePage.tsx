import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Logoimg from "assets/logo.png";
import { hidehash } from "hooks/useWallet";
import { Button, Btn } from "components/button/button";
import { useWeb3React } from "@web3-react/core";
import { Navlist } from "./NavList";
import { WalletAssembly } from "../WalletAssembly/index";

export const TypePageBox: React.FC<{ children: any }> = ({ children }) => {
  /**
   * 钱包地址
   */
  const { account, library, chainId } = useWeb3React();

  const [WalletPopup, setWalletPopup] = useState<boolean>(false);
  const onWalletPopup = () => {
    setWalletPopup(!WalletPopup);
  };

  return (
    <>
      <Box>
        {/* 顶部logo 和链接钱包按钮 */}
        <TopBox>
          <Logo src={Logoimg}></Logo>
          <BtnBoxs>
            <Button w={150} h={40} onClick={onWalletPopup}>
              {hidehash(account)}
            </Button>
          </BtnBoxs>
        </TopBox>
        <BodyBox>
          {/* 左侧导航栏 */}
          <LeftBox>
            <Navlist />
          </LeftBox>
          {/* 内容部分 */}
          <ChildrenBox>{children}</ChildrenBox>
        </BodyBox>
      </Box>
      {WalletPopup ? (
        <WalletAssembly onClick={onWalletPopup}></WalletAssembly>
      ) : null}
    </>
  );
};

const Box = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;
const TopBox = styled.div`
  width: 100%;
  height: 110px;
  display: flex;
  justify-content: space-between;
  padding-left: 82px;
  padding-top: 45px;
  padding-right: 40px;
`;
const BodyBox = styled.div`
  flex: 1;
  display: flex;
`;
const LeftBox = styled.div`
  width: 320px;
  height: 100%;
`;
const ChildrenBox = styled.div`
  flex: 1;
  height: 85vh;
  overflow: hidden;
  padding-right: 40px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const Logo = styled.img`
  height: 50px;
`;

const BtnBoxs = styled.div`
  margin-top: 5px;
`;
