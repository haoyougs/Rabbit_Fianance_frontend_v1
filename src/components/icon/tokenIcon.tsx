import BNB from "assets/currency/BNB@2x.png";
import BUSD from "assets/currency/BUSD@2x.png";
import USDT from "assets/currency/USDT@2x.png";
import BTCB from "assets/currency/BTCB@2x.png";
import ETH from "assets/currency/ETH@2x.png";
import RABBIT from "assets/currency/rabbit.png";
import USDC from "assets/currency/USDC@2x.png";
import DAI from "assets/currency/DAI@2x.png";
import CAKE from "assets/currency/cake@2x.png";
import MDX from "assets/currency/mdx@2x.png";
import VAI from "assets/currency/vai@2x.png";
import UST from "assets/currency/UST@2x.png";
import TUSD from "assets/currency/TUSD@2x.png";
import ADA from "assets/currency/ADA@2x.png";
import FIL from "assets/currency/FIL@2x.png";
import DOT from "assets/currency/DOT@2x.png";
import LINK from "assets/currency/LINK@2x.png";
import XVS from "assets/currency/XVS@2x.png";
import UNI from "assets/currency/UNI@2x.png";
import LTC from "assets/currency/LTC@2x.png";

import ibBNB from "assets/currency/ibBNB@2x.png";
import ibBUSD from "assets/currency/ibBUSD@2x.png";
import ibUSDT from "assets/currency/ibUSDT@2x.png";
import ibBTCB from "assets/currency/ibBTCB@2x.png";
import ibETH from "assets/currency/ibETH@2x.png";
import ibRABBIT from "assets/currency/ibrabbit@3x.png";
import ibUSDC from "assets/currency/ibUSDC@2x.png";
import ibDAI from "assets/currency/ibDAI@2x.png";
import ibCAKE from "assets/currency/ibada@2x.png";
import ibMDX from "assets/currency/ibmdx@3x.png";
// import ibVAI from 'assets/currency/ibvai@2x.png'
// import ibUST from "assets/currency/ibUST@2x.png";
// import ibTUSD from 'assets/currency/ibTUSD@2x.png'
import ibADA from "assets/currency/ibada@2x.png";
import ibFIL from "assets/currency/ibfil@2x.png";
import ibDOT from "assets/currency/ibdot@2x.png";
import ibLINK from "assets/currency/iblink@2x.png";
import ibXVS from "assets/currency/ibxvs@2x.png";
import ibUNI from "assets/currency/ibuni@2x.png";
import styled from "styled-components";
import rRABBIT from "assets/rRABBIT.png";
import rCANDY from "assets/rCANDY.png";

const logosByIconName: { [title: string]: string } = {
  BNB: BNB,
  ibBNB: ibBNB,
  BUSD: BUSD,
  USDT: USDT,
  rRABBIT: rRABBIT,
  rCANDY: rCANDY,
  BTCB: BTCB,
  ETH: ETH,
  RABBIT: RABBIT,
  USDC: USDC,
  DAI: DAI,
  CAKE: CAKE,
  MDX: MDX,
  VAI: VAI,
  UST: UST,
  TUSD: TUSD,
  ADA: ADA,
  FIL: FIL,
  DOT: DOT,
  LINK: LINK,
  XVS: XVS,
  UNI: UNI,
  LTC: LTC,

  ibBUSD: ibBUSD,
  ibUSDT: ibUSDT,
  ibBTCB: ibBTCB,
  ibETH: ibETH,
  ibRABBIT: ibRABBIT,
  ibUSDC: ibUSDC,
  ibDAI: ibDAI,
  ibCAKE: ibCAKE,
  ibMDX: ibMDX,
  // ibUST: ibUST,
  ibADA: ibADA,
  ibFIL: ibFIL,
  ibDOT: ibDOT,
  ibLINK: ibLINK,
  ibXVS: ibXVS,
  ibUNI: ibUNI,
};

type StarterLogoProps = {
  IconName: string;
  size?: number;
  msize?: number;
  className?: any;
};

type BasisLogoProps = {
  IconName1: string;
  IconName2: string;
  size?: number;
  className?: any;
};
/**
 * 双币icon
 * @param param0
 * @returns
 */
const TokenIcons: React.FC<BasisLogoProps> = ({
  IconName1,
  IconName2,
  size = 32,
  className,
}) => {
  return (
    <div
      className={className}
      style={{ position: "relative", display: "flex" }}
    >
      <div style={{ position: "relative", zIndex: 1 }}>
        <TokenIcon IconName={IconName1} size={size} />
      </div>
      <div style={{ position: "relative", left: -size / 3 }}>
        <TokenIcon IconName={IconName2} size={size} />
      </div>
    </div>
  );
};
/**
 * 单币icon
 * @param 传递IconName参数，string类型，要展示单币种只需要传递单币种的币种图标名字，展示币对的话需要在两个币种名字之间用 - 隔开
 * 使用例子：
 * @param 单币种:<TokenIcon IconName={"BNB"} />
 * @param 币对:<TokenIcon IconName={"BNB-BUSD"} />
 * @returns
 */
export const TokenIcon: React.FC<StarterLogoProps> = ({
  IconName,
  size = 32,
  msize = size,
  className,
}) => {
  if (IconName.includes("-")) {
    const tokens = IconName.split("-");
    return (
      <TokenIcons
        className={className}
        IconName1={tokens[0]}
        IconName2={tokens[1]}
        size={size}
      />
    );
  }
  if (!logosByIconName[IconName]) {
    // throw new Error(`Invalid RabbitLogo IconName: ${IconName}`);
    return <span>{IconName}</span>;
  }
  return (
    <ImgBox
      className={className}
      src={logosByIconName[IconName] || IconName}
      alt={`${IconName} Logo`}
      size={size}
      msize={msize}
    />
  );
};

const ImgBox = styled.img<{ size: number; msize: number }>`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  user-select: none;
  @media (max-width: 1000px) {
    width: ${(props) => props.msize}px;
    height: ${(props) => props.msize}px;
  }
`;
