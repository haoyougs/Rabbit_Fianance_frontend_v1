import React, { useState } from "react";
import styled from "styled-components";
import a1img from "assets/buttonImg/a1.png";
import a2img from "assets/buttonImg/a2.png";
import a3img from "assets/buttonImg/a3.png";
import xiaimg from "assets/buttonImg/31xiala.png";
import { Link } from "react-router-dom";
import "../components.css";
import tokenLogo from "assets/currency/rabbit.png";
import lianImg1 from "assets/buttonImg/icon1.png";
import lianImg2 from "assets/buttonImg/icon2.png";
import lianImg3 from "assets/buttonImg/icon3.png";
import lianImg4 from "assets/buttonImg/icon4.png";
import lianImg5 from "assets/buttonImg/icon5.png";
import lianImg6 from "assets/buttonImg/contact-@2x.png";
import L1img from "assets/l1.png";
import L2img from "assets/l2.png";
import L3img from "assets/l3.png";
import L4img from "assets/l4.png";
import L5img from "assets/l5.png";
import { useLocation } from "react-router-dom";

/**
 * 页面左侧的导航栏
 * @returns
 */
export const Navlist: React.FC = () => {
  /**
   * 展开收起二级路由
   */
  const [Bgcolor, setBgcolor] = useState(false);
  /**
   * 获取当前路由
   */
  const location = useLocation();

  return (
    <Box>
      <Uls>
        <LIs to="/" className={location.pathname === "/" ? "LinkBg" : ""}>
          <IconImgs src={a1img} />
          <SizeBox>Vault</SizeBox>
        </LIs>
        <LIs
          to="/stake"
          className={location.pathname === "/stake" ? "LinkBg" : ""}
        >
          <IconImgs src={a2img} />
          <SizeBox>Stake</SizeBox>
        </LIs>
        <LIs3 Bgcolor={Bgcolor} onClick={() => setBgcolor(!Bgcolor)}>
          <IconImgs src={a3img} />
          <SizeBox>Farm</SizeBox>
          <IconImgs2 src={xiaimg} Bgcolor={Bgcolor} />
        </LIs3>
        {Bgcolor ? (
          <>
            <LIs2
              // Bgcolor={Bgcolor}
              to="/allFarms"
              className={
                location.pathname === "/allFarms" ? "LinkBg list-l1" : "list-l1"
              }
            >
              <SizeBox>All Farms</SizeBox>
            </LIs2>
            <LIs2
              // Bgcolor={Bgcolor}
              to="/myPositions"
              className={
                location.pathname === "/myPositions"
                  ? "LinkBg list-l2"
                  : "list-l2"
              }
            >
              <SizeBox>My Positions</SizeBox>
            </LIs2>
            <LIs2
              // Bgcolor={Bgcolor}
              to="/liquidation"
              className={
                location.pathname === "/liquidation"
                  ? "LinkBg list-l3"
                  : "list-l3"
              }
            >
              <SizeBox>Liquidation</SizeBox>
            </LIs2>
          </>
        ) : null}
      </Uls>
      <BottomBox>
        <LinkBoxa>
          <TokenLogoimg src={tokenLogo}></TokenLogoimg>$ 2.451
        </LinkBoxa>
        <Lianjie>
          <LinkBoxa>
            <TokenLogoimg src={L1img}></TokenLogoimg>Buy RABBIT
          </LinkBoxa>
          <LinkBoxa>
            <TokenLogoimg src={L2img}></TokenLogoimg>Buy RABBIT
          </LinkBoxa>
          <LinkBoxa>
            <TokenLogoimg src={L3img}></TokenLogoimg>Buy RABBIT
          </LinkBoxa>
          <LinkBoxa>
            <TokenLogoimg src={L4img}></TokenLogoimg>CoinMarketCap
          </LinkBoxa>
          <LinkBoxa>
            <TokenLogoimg src={L5img}></TokenLogoimg>CoinGecko
          </LinkBoxa>
        </Lianjie>
        <LinajieB>
          <a href="https://twitter.com/FinanceRabbit" target="_blank">
            <LianjieImg src={lianImg1} />
          </a>
          <a href="https://t.me/RabbitFinanceEN" target="_blank">
            <LianjieImg src={lianImg2} />
          </a>
          {/* <a href="" target="_blank">
            <LianjieImg src={lianImg3} />
          </a> */}
          <a href="https://rabbitfinance.medium.com/" target="_blank">
            <LianjieImg src={lianImg4} />
          </a>
          <a href="https://rabbitfinance.gitbook.io/homepage/" target="_blank">
            <LianjieImg src={lianImg5} />
          </a>
          <a href="mailto:business@rabbitfinance.io" target="_blank">
            <LianjieImg src={lianImg6} />
          </a>
        </LinajieB>
      </BottomBox>
    </Box>
  );
};

const Box = styled.div`
  width: 270px;
  height: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;
const Uls = styled.ul``;
const LIs = styled(Link)`
  width: 270px;
  padding: 25px 0;
  padding-left: 32px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.5s;
  opacity: 0.5;
  :hover {
    opacity: 1;
  }
`;
const LIs2 = styled(Link)`
  background-color: #ffffff10;
  width: 270px;
  padding: 25px 0;
  padding-left: 52px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.5s;
  /* opacity: 0.5;
  :hover {
    opacity: 1;
    background-color: #ffffff20;
  } */
`;
const LIs3 = styled.div<{ Bgcolor: boolean }>`
  width: 270px;
  padding: 25px 0;
  padding-left: 32px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.5s;
  opacity: 0.5;
  :hover {
    opacity: 1;
  }
  background-color: ${(props) => (props.Bgcolor ? "#ffffff20" : "")};
  opacity: ${(props) => (props.Bgcolor ? 1 : 0.5)};
`;
const IconImgs = styled.img`
  height: 20px;
`;
const IconImgs2 = styled.img<{ Bgcolor: boolean }>`
  height: 16px;
  margin-left: 110px;
  margin-top: 2px;
  transform: ${(props) => (props.Bgcolor ? "rotate(180deg)" : "rotate(0deg)")};
  transition: all 0.3s;
`;
const SizeBox = styled.div`
  font-family: PingFangSC;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  color: #fff;
  margin-left: 25px;
`;
const BottomBox = styled.div`
  width: 100%;
`;
const LinkBoxa = styled.div`
  width: 50%;
  font-family: Arial;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  color: #ffffff60;
  padding-left: 15px;
  padding-bottom: 15px;
  cursor: pointer;
  transition: all 0.3s;
  :hover {
    color: #ffffff;
  }
`;
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
  background: rgba(255, 255, 255, 0.1);
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

const LianjieImg = styled.img`
  width: 20px;
  cursor: pointer;
  transition: all 0.3s;
  opacity: 0.7;
  :hover {
    transform: scale(1.2);
    opacity: 1;
  }
`;
