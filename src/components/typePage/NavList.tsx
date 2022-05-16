import React, { useEffect, useState, useMemo } from "react";
import styled from "styled-components";
import a1img from "assets/buttonImg/a1.png";
import a2img from "assets/buttonImg/a2.png";
import a3img from "assets/buttonImg/a3.png";
import xiaimg from "assets/buttonImg/31xiala.png";
import { Link } from "react-router-dom";
import "../components.css";
import tokenLogo from "assets/currency/rabbit.png";

import L1img from "assets/l1.png";
import L2img from "assets/l2.png";
import L3img from "assets/l3.png";
import L4img from "assets/l4.png";
import L5img from "assets/l5.png";
import { useLocation } from "react-router-dom";
import { getUsdPrice } from "utils/getUsdPrice";
import { subStringNum } from "utils/subStringNum";


import Icon1 from 'assets/link/icon1.png'
import Icon1s from 'assets/link/icon1_s.png'
import Icon2 from 'assets/link/icon2.png'
import Icon2s from 'assets/link/icon2_s.png'
import Icon3 from 'assets/link/icon3.png'
import Icon3s from 'assets/link/icon3_s.png'
import Icon4 from 'assets/link/icon4.png'
import Icon4s from 'assets/link/icon4_s.png'
import Icon5 from 'assets/link/icon5.png'
import Icon5s from 'assets/link/icon5_s.png'
import Icon6 from 'assets/link/contact-@2x.png'
import Icon6s from 'assets/link/contact@2x.png'
import Logoimg from "assets/logo.png";

/**
 * 页面左侧的导航栏
 * @returns
 */
export const Navlist: React.FC<{ isMobile?: boolean, callBack?: any }> = ({ isMobile, callBack }) => {
  // console.log(123, isMobile)
  /**
   * 展开收起二级路由
   */
  const [Bgcolor, setBgcolor] = useState(false);
  /**
   * 获取当前路由
   */
  const location = useLocation();
  const [RPrice, setRPrice] = useState<any>(null)
  const PageLinks = useMemo(() => {
    return [
      {
        title: '',
        href: 'https://twitter.com/FinanceRabbit',
        icon1: Icon1,
        icon2: Icon1s
      },
      {
        title: '',
        href: 'https://t.me/RabbitFinanceEN',
        icon1: Icon2,
        icon2: Icon2s
      },
      {
        title: '',
        href: 'https://discord.com/invite/YSWuKH42JG',
        icon1: Icon3,
        icon2: Icon3s
      },
      {
        title: '',
        href: 'https://rabbitfinance.medium.com/',
        icon1: Icon4,
        icon2: Icon4s
      },
      {
        title: '',
        href: 'https://rabbitfinance.gitbook.io/homepage/',
        icon1: Icon5,
        icon2: Icon5s
      },
      {
        title: '',
        href: 'mailto:business@rabbitfinance.io',
        icon1: Icon6,
        icon2: Icon6s
      },
    ]
  }, [])
  useEffect(() => {
    if (!RPrice) {
      getUsdPrice("0x95a1199EBA84ac5f19546519e287d43D2F0E1b41").then(res => {
        setRPrice(res)
      })
    }
  }, [RPrice]);
  const menuClcik = (value: any) => {
    setBgcolor(value);
    if (callBack) {
      callBack(false)
    }
  }
  const menuSubClcik = () => {
    if (callBack) {
      callBack(false)
    }
  }
  return (
    <Box>
      <Logo src={Logoimg}></Logo>
      <Uls>
        <LIs
          to="/" className={location.pathname === "/" ? "LinkBg" : ""}>
          <IconImgs src={a1img} />
          <SizeBox onClick={() => menuClcik(false)}>Vault</SizeBox>
        </LIs>
        <LIs
          to="/stake"
          className={location.pathname === "/stake" ? "LinkBg" : ""}
        >
          <IconImgs src={a2img} />
          <SizeBox onClick={() => menuClcik(false)}>Stake</SizeBox>
        </LIs>
        <LIs3Box Bgcolor={Bgcolor}>
          <LIs3 Bgcolor={Bgcolor} onClick={() => setBgcolor(!Bgcolor)}>
            <IconImgs src={a3img} />
            <SizeBox>Farm</SizeBox>
            <IconImgs2 src={xiaimg} Bgcolor={Bgcolor} />
          </LIs3>
          {Bgcolor ? (
            <div className={Bgcolor ? "subMenu" : ""}>
              <LIs2
                to="/allFarms"
                className={
                  location.pathname === "/allFarms" ? "subLinkBg subList" : "subList"
                }
              >
                <SizeBox onClick={menuSubClcik}>All Farms</SizeBox>
              </LIs2>
              <LIs2
                to="/myPositions"
                className={
                  location.pathname === "/myPositions"
                    ? "subLinkBg subList" : "subList"
                }
              >
                <SizeBox onClick={menuSubClcik}>My Positions</SizeBox>
              </LIs2>
              <LIs2
                to="/liquidation"
                className={
                  location.pathname === "/liquidation"
                    ? "subLinkBg subList" : "subList"
                }
              >
                <SizeBox onClick={menuSubClcik}>Liquidation</SizeBox>
              </LIs2>
            </div>
          ) : null}
        </LIs3Box>
      </Uls>
      <BottomBox>
        <LinkBoxa>
          <TokenLogoimg src={tokenLogo}></TokenLogoimg>
          <Price>$ {RPrice ? subStringNum(RPrice, 4) : null}</Price>
        </LinkBoxa>
        <Lianjie>
          <LinkBoxa>
            <Linka target="_blank" href="https://pancakeswap.finance/swap#/swap?inputCurrency=BNB&outputCurrency=0x95a1199EBA84ac5f19546519e287d43D2F0E1b41">
              <TokenLogoimg src={L1img}></TokenLogoimg>Buy RABBIT
            </Linka>
          </LinkBoxa>

          <LinkBoxa>
            <Linka target="_blank" href="https://bsc.mdex.me/#/swap?inputCurrency=0xe9e7cea3dedca5984780bafc599bd69add087d56&outputCurrency=0x95a1199EBA84ac5f19546519e287d43D2F0E1b41">

              <TokenLogoimg src={L2img}></TokenLogoimg>Buy RABBIT
            </Linka>
          </LinkBoxa>
          <LinkBoxa>
            <Linka target="_blank" href="https://exchange.biswap.org/#/swap?inputCurrency=0xe9e7cea3dedca5984780bafc599bd69add087d56&outputCurrency=0x95a1199EBA84ac5f19546519e287d43D2F0E1b41">
              <TokenLogoimg src={L3img}></TokenLogoimg>Buy RABBIT
            </Linka>
          </LinkBoxa>
          <LinkBoxa></LinkBoxa>
          <LinkBoxa>
            <Linka target="_blank" href="https://coinmarketcap.com/currencies/rabbit-finance/">
              <TokenLogoimg src={L4img}></TokenLogoimg>CoinMarketCap
            </Linka>
          </LinkBoxa>
          <LinkBoxa>
            <Linka target="_blank" href="https://www.coingecko.com/en/coins/rabbit-finance">
              <TokenLogoimg src={L5img}></TokenLogoimg>CoinGecko
            </Linka>
          </LinkBoxa>
        </Lianjie>
        <LinajieB>
          {PageLinks.map((item, key) =>
            <FooterItem href={item.href} target="_blank" key={key} icon1={item.icon1} icon2={item.icon2}
            />)}
        </LinajieB>
      </BottomBox>
    </Box >
  );
};

const Box = styled.div`
  width: 252px;
  height: 100%;
  margin: 0 auto;
  display: flex;
  /* justify-content: space-between; */
  flex-direction: column;
  @media (max-width: 1000px) {
    padding: 20px;
  }
`;
const Logo = styled.img`
  width: 132px;
  height: 48px;
  display: none;
  @media (max-width: 1000px) {
    display: none;
  }
`;
const Uls = styled.ul`
  margin-top:4px;
  min-height: calc(100% - 248px);
  margin-bottom: 0;
`;
const LIs = styled(Link)`
  width: 242px;
  height: 40px;
  padding: 10px 0;
  padding-left: 24px;
  display: flex;
  align-items: center;
  cursor: pointer;
  margin:4px 0 8px;
  transition: all 0.5s;
  opacity: 0.5;
  :hover {
    opacity: 1;
  }
`;
const LIs2 = styled(Link)`
  /* background-color: #ffffff10; */
  width: 242px;
  padding: 10px 0;
  padding-left: 44px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.5s;
  opacity: 0.5;
  color:#fff;
  /*:hover {
    opacity: 1;
    background-color: #ffffff20;
  } */
`;
const LIs3Box = styled.div<{ Bgcolor: boolean }>`
  width: 242px;
  height: auto;
  background-color: ${(props) => (props.Bgcolor ? "#577ace" : "")};
`
const LIs3 = styled.div<{ Bgcolor: boolean }>`
  width: 242px;
  padding: 10px 0;
  padding-left: 24px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.5s;
  opacity: 0.5;
  margin:4px 0;
  :hover {
    opacity: 1;
  }
  /* background-color: ${(props) => (props.Bgcolor ? "#ffffff20" : "")}; */
  opacity: ${(props) => (props.Bgcolor ? 1 : 0.5)};
`;
const IconImgs = styled.img`
  height: 20px;
`;
const IconImgs2 = styled.img<{ Bgcolor: boolean }>`
  height: 10px;
  margin-left: 115px;
  margin-top: 2px;
  transform: ${(props) => (props.Bgcolor ? "rotate(180deg)" : "rotate(0deg)")};
  transition: all 0.3s;
`;
const SizeBox = styled.div`
  font-family: PingFangSC;
  font-size: 14px;
  font-weight: 400;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  color: #fff;
  margin-left: 20px;
`;
const BottomBox = styled.div`
  width: 252px;
`;
const LinkBoxa = styled.div`
  width: 50%;
  height: 24px;
  font-family: Arial;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  color: #ffffff60;
  margin: 5px 0;
  padding-left: 12px;
  /* padding-bottom: 15px; */
  cursor: pointer;
  transition: all 0.3s;
  :hover {
    color: #ffffff;
  }
`;
const Price = styled.span`
  font-size: 14px;
  color: rgb(255, 255, 255);
`
const Linka = styled.a`
color: #ffffff60;
`
const TokenLogoimg = styled.img`
  width: 24px;
  margin-right: 5px;
`;
const Lianjie = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  padding-top: 15px;
  /* background: rgba(255, 255, 255, 0.1); */
  border-radius: 5px;
`;
const LinajieB = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
`;
const FooterItem = styled.a<{ icon1: any, icon2: any }>`
  width:25px;
  height:25px;
  margin:0px;
  display:block;
  background-image:url(${props => props.icon1});
  &:hover{
    background-image:url(${props => props.icon2});
  }
  &:last-child{
    margin-right: 0;
  }
  &:first-child{
    /* margin-left: 3px; */
  }
  background-size:100% 100%;
`
// const LianjieImg = styled.img`
//   width: 25px;
//   cursor: pointer;
//   transition: all 0.3s;
//   :hover {
//     color:red;
//   }
// `;
