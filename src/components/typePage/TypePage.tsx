import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import Logoimg from "assets/logo.png";
import { hidehash } from "hooks/useWallet";
import { Button, Btn } from "components/button/button";
import { useWeb3React } from "@web3-react/core";
import { Navlist } from "./NavList";
import { MobileLink } from "./MobileLink";

import { WalletAssembly } from "../WalletAssembly/index";
import useModal from "hooks/useModal";
import SwitchNet from "components/switchNetwork";
import { useLocation } from "react-router-dom";
import { ListenNetworkChanged } from "hooks/useAuth";
import { NoticeBox } from "components/notice";
import store from "state";
import { useSelector } from "react-redux";
import { UpdateNotice, UpdateNotice2 } from "state/TypePage/hooks";
// import MobileMenu from '../MobileMenu';
import MenuIcon from 'assets/page/caidan_m.png';

// import { InjectConnector } from '../../utils/web3'
// import { InjectedConnector } from '@web3-react/injected-connector'
// import { useWallet } from 'use-wallet';
// import { getLibray } from "../../utils/web3";
export const TypePageBox: React.FC<{ children: any }> = ({ children }) => {
  //进入页面回到顶部
  const ChildrenBoxRef = useRef<HTMLDivElement>(null);
  let Location = useLocation();
  const storeData = useSelector(store.getState);
  const Notice = storeData.Notice.Notice;
  const Notice2 = storeData.Notice.Notice2;
  const NoticeText = storeData.Notice.NoticeText;
  const setNotice = UpdateNotice();
  const setNotice2 = UpdateNotice2();
  useEffect(() => {
    if (ChildrenBoxRef.current) {
      ChildrenBoxRef.current.scrollTop = 0;
      setNotice(false)
      setNotice2(false)
    }
  }, [Location])
  useEffect(() => {
    if (Notice || Notice2) {
      setTimeout(() => {
        setNotice(false)
        setNotice2(false);
        clearTimeout()
      }, 3000)
    }
  }, [Notice, Notice2])
  /**
   * 钱包地址
   */
  ListenNetworkChanged();
  const { account, active, library, chainId, error, activate } = useWeb3React();
  const [WalletPopup, setWalletPopup] = useState<boolean>(false);
  const onWalletPopup = () => {
    setWalletPopup(!WalletPopup);
  };
  const [onShow, onHide] =
    useModal(<SwitchNet onHide={() => onHide()} />);
  const [visible, setvisible] = useState<boolean>(false);
  const accountOnclik = () => {
    setvisible(false)
    onShow()
  }
  return (
    <>
      {Notice ? (
        <div onClick={() => setNotice(false)}>
          <NoticeBox>{NoticeText} </NoticeBox>
        </div>
      ) : null}
      {Notice2 ? (
        <div onClick={() => setNotice2(false)}>
          <NoticeBox Shou={!Notice2}>{NoticeText}</NoticeBox>
        </div>
      ) : null}
      <Box>
        {/* 顶部logo 和链接钱包按钮 */}
        {/* <SwitchNet></SwitchNet> */}
        <TopBox>
          <Logo src={Logoimg}></Logo>
          {account ?
            <BtnBoxs>
              <Button w={150} h={40} onClick={accountOnclik}>
                {hidehash(account)}
              </Button>
            </BtnBoxs> :
            <BtnBoxs>
              <Button w={150} h={40} onClick={accountOnclik}>
                Unlock Wallet
              </Button>
            </BtnBoxs>
          }
          <MobileMenuBtn className={visible ? "MenuBtn" : ""}
            src={MenuIcon} onClick={() => setvisible(!visible)} />
        </TopBox>
        {
          visible ? <StyledMobileMenuWrapper>
            <NavBoxMobile className={visible ? "NavBoxMobile" : ""}>
              <Navlist isMobile={visible} callBack={setvisible}></Navlist>
            </NavBoxMobile>
          </StyledMobileMenuWrapper> : null
        }
        <BodyBox>
          {/* 左侧导航栏 */}
          <LeftBox>
            <Navlist />
          </LeftBox>
          {/* 内容部分 */}
          <ChildrenBox ref={ChildrenBoxRef}>{children}</ChildrenBox>
        </BodyBox>
      </Box>
      <Mobile style={{ display: "none" }}>
        <MBodyBox>
          <MChildrenBox>
            <MobileTopBox>
              <Logo src={Logoimg}></Logo>
              {account ?
                <BtnBoxs>
                  <Button w={150} h={40} onClick={onShow}>
                    {hidehash(account)}
                  </Button>
                </BtnBoxs> :
                <BtnBoxs>
                  <Button w={150} h={40} onClick={onShow}>
                    Unlock Wallet
                  </Button>
                </BtnBoxs>
              }
            </MobileTopBox>
            <TipsBox>
              Rabbit Finance does not yet support small screens. Please get a larger screen or resize your browser window.
            </TipsBox>
          </MChildrenBox>
          <MobileLink />
        </MBodyBox>
      </Mobile>
      {
        WalletPopup ? (
          <WalletAssembly onClick={onWalletPopup}></WalletAssembly>
        ) : null
      }
    </>
  );
};

const Box = styled.div`
  width: 100vw;
  min-height: 100vh;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-image: linear-gradient(134deg, rgb(71, 115, 207), rgb(118, 110, 177) 82%, rgb(241, 79, 125) 110%);
  @media (max-width: 1000px) {
    padding: 0 1rem;
  }
`;
const TopBox = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 50px;
  /* padding-top: 45px; */
  padding-right: 48px;
  @media (max-width: 1000px) {
    padding: 0;
    background: #5671c5;
    height: 80px;
  }
`;
const StyledMobileMenuWrapper = styled.div`
    display: flex;
    box-pack:center;
    justify-content: center;
    z-index: 1000;
    width: 100%;
    height: calc(100vh - 80px);
    position:fixed;
    top: 80px;
    left: 0;
    right: 0;
    background: #5671c5;
    @media (min-width: 1000px) {
    display: none;
  }
`
const NavBoxMobile = styled.div`
`
const BodyBox = styled.div`
  flex: 1;
  display: flex;
`;
const LeftBox = styled.div`
  width: 288px;
  height: 100%;
  @media (max-width: 1000px) {
    display:none
  }
`;
const ChildrenBox = styled.div`
  flex: 1;
  height: calc(100vh - 100px);
  overflow: hidden;
  padding-right: 48px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  @media (max-width: 1000px) {
    padding-right: 0px;
    height: calc(100vh - 80px);
  }
`;

const Logo = styled.img`
  height: 48px;
  @media (max-width: 1000px) {
    height: 40px;
  }
`;

const BtnBoxs = styled.div`
  margin-top: 5px;
`;

const MobileMenuBtn = styled.img`
  width:30px;
  height:30px;
  @media (min-width: 1000px){
    display: none;
  }
`
const Mobile = styled.div`
  width: 100vw;
  height: 100vh;
  flex-direction: column;
  background: #000;
  align-items:center;
  justify-content: center;
  display: block;
  @media (min-width: 1000px) {
    display: none;
  }
`
const MobileTopBox = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 50px;
  /* padding-top: 45px; */
  padding-right: 48px;
  /* @media (max-width: 1000px) {
    padding: 20px;
    background: #5671c5;
  } */
`;
const MBodyBox = styled.div`
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
`;
const MChildrenBox = styled.div`
  height: 80%;
`
const TipsBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  font-size: 24px;
  justify-content: center;
  margin-top: -10%;
  flex-direction: column;
  color: #fff;
  /* word-break: break-word; */
  text-indent: 2rem;
  padding: 0 10%;
`