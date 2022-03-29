import React, { useEffect, useState } from "react";
import styled from "styled-components";
import closeImg from "assets/close@2x.png";
import { TokenIcon } from "components/icon/tokenIcon";
import { Button } from "components/button/button";
import { useWeb3React } from "@web3-react/core";
import { TokenBalance1 } from "hooks/useMyPosition";
import { LoadingBox } from "components/Loading";
import { Replenishment } from "hooks/useMyPosition";
import { AssetsBorrowed } from "hooks/useSupply";
import { PANCAKE_ROUTE } from "config/LPAddress";
import { ethers } from "ethers";
import store from "state";
import { useSelector } from "react-redux";
import { NoticeBox } from "components/notice/index";

interface parameter {
  onClick: () => void;
  Data: any;
}

export const AddCollateralPage: React.FC<parameter> = ({ onClick, Data }) => {
  //获取钱包地址
  let { account, library } = useWeb3React();
  console.log(Data);

  //判断当前币种是否是bnb
  let token0: string | null | undefined;
  if (Data.token0 == "0x0000000000000000000000000000000000000000") {
    token0 = account;
  } else {
    token0 = Data.token0;
  }
  let token1: string | null | undefined;
  if (Data.token1 == "0x0000000000000000000000000000000000000000") {
    token1 = account;
  } else {
    token1 = Data.token1;
  }
  //获取账户余额的变量
  let [Token0Balance, setToken0Balance] = useState<Number>();
  let [Token1Balance, setToken1Balance] = useState<Number>();

  //token0的输入框
  const [Amount0, setAmount0] = useState<any>();
  const AmountChange0 = (e: any) => {
    let { value } = e.target;
    const reg = /^-?\d*(\.\d*)?$/;
    if ((!isNaN(value) && reg.test(value)) || value === "") {
      if (value > Number(Token0Balance)) {
        value = Token0Balance;
      }
      setAmount0(value);
    }
  };
  //百分比按钮时间
  const Token0percent25 = () => {
    setAmount0(Number(Token0Balance) * 0.25);
  };
  const Token0percent50 = () => {
    setAmount0(Number(Token0Balance) * 0.5);
  };
  const Token0percent75 = () => {
    setAmount0(Number(Token0Balance) * 0.75);
  };
  const Token0percent100 = () => {
    setAmount0(Number(Token0Balance));
  };

  //token1的输入框
  const [Amount1, setAmount1] = useState<any>();
  const AmountChange1 = (e: any) => {
    let { value } = e.target;
    const reg = /^-?\d*(\.\d*)?$/;
    if ((!isNaN(value) && reg.test(value)) || value === "") {
      if (value > Number(Token1Balance)) {
        value = Token1Balance;
      }
      setAmount1(value);
    }
  };
  const Token1percent25 = () => {
    setAmount1(Number(Token1Balance) * 0.25);
  };
  const Token1percent50 = () => {
    setAmount1(Number(Token1Balance) * 0.5);
  };
  const Token1percent75 = () => {
    setAmount1(Number(Token1Balance) * 0.75);
  };
  const Token1percent100 = () => {
    setAmount1(Number(Token1Balance));
  };
  //获取账户余额
  useEffect(() => {
    // 获取token0余额
    if (token0) {
      TokenBalance1(library, token0).then((res) => {
        let resData = Number(res);
        setToken0Balance(resData);
      });
    }
    if (token1) {
      TokenBalance1(library, token1).then((res) => {
        let resData = Number(res);
        setToken1Balance(resData);
      });
    }
  }, [account, token0, token1]);

  //Assets to be Added to Position 中展示的数据
  let [AddedtoPosition0, setAddedtoPosition0] = useState<any>();
  let [AddedtoPosition1, setAddedtoPosition1] = useState<any>();
  //Updated Assets in Position Value 中的数据
  let [AssetsPositionValue0, setAssetsPositionValue0] = useState<any>();
  let [AssetsPositionValue1, setAssetsPositionValue1] = useState<any>();
  // //更新后的债务率
  let [TotalValueAfter, setTotalValueAfter] = useState<any>();
  useEffect(() => {
    // 获取币种的价格
    if (token0 !== undefined || (null && token1 !== undefined) || null) {
      AssetsBorrowed(
        PANCAKE_ROUTE,
        //这个地址是WBNB的地址，暂时放在这里
        "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
        Data.token0
      ).then((res) => {
        // 获取平均后的币种各个币种的数量
        let AddToken = (Amount0 + Amount1) / 2;
        let token0Totalvalue = AddToken * res;
        let token1Totalvalue = AddToken * 1;
        setAddedtoPosition0(token0Totalvalue);
        setAddedtoPosition1(token1Totalvalue);
        // 更新后的头寸value价值
        let positionsValue =
          Number(ethers.utils.formatUnits(Data.positionsValue, 18)) / 2;
        let PositionValue0 = positionsValue * 1 + token0Totalvalue;
        let PositionValue1 = positionsValue / res + token1Totalvalue;
        setAssetsPositionValue0(PositionValue0);
        setAssetsPositionValue1(PositionValue1);

        //更新后的总价值
        let totalValue = PositionValue0 + PositionValue1 * res;
        let RiskRatioAfter =
          Number(ethers.utils.formatUnits(Data.totalValue, 18)) / totalValue;
        setTotalValueAfter(RiskRatioAfter);
      });
    }
  }, [Amount0, Amount1]);

  //更新前的债务率
  let RiskRatioBefore =
    Number(ethers.utils.formatUnits(Data.totalValue, 18)) /
    Number(ethers.utils.formatUnits(Data.positionsValue, 18));

  //获取数据
  let Store = useSelector(store.getState);
  let ListData = Store.AllFroms;
  let Routes = "USDT-BNB";
  const TokenNames = Routes;
  let list = ListData.filter(
    (el) => el.LPtokenName === TokenNames && el.type == "PancakeSwap"
  );
  let AddressData: any = {};
  list.forEach((item) => {
    AddressData = { ...item };
  });
  //补仓操作
  const [Notice, setNotice] = useState<any>(false);
  const [Notice2, setNotice2] = useState<any>(true);

  const ConfirmClick = () => {
    const strategyAddress =
      AddressData.address.PancakeUSDT_BNBAddTwoStrategyAddr;
    const token0Address = AddressData.address.PancakeUSDT_BNB_USDTtoken;
    const token1Address = AddressData.address.BNB_ADDRESS;
    const token0Amount = Amount0.toString();
    const token1Amount = Amount1.toString();
    const posId = Data.posid._hex;
    Replenishment(
      strategyAddress,
      token0Address,
      token1Address,
      token0Amount,
      token1Amount,
      posId
    ).then((res) => {
      console.log(res);
      if (res == true) {
        setNotice(res);
      }else{
        setNotice2(res);
      }
    });
  };

  return (
    <>
    {Notice ? <div style={{zIndex:3000}}><NoticeBox Shou={Notice}> 补仓成功 </NoticeBox></div> : null}
    {Notice2 == false? <div style={{zIndex:3000}}><NoticeBox Shou={Notice}> 补仓失败 </NoticeBox></div> : null}

      <BG onClick={onClick} />
      <Box>
        <TitleBox>
          <div>Add Collateral USDT/BNB</div>
          <CloseBtn src={closeImg} onClick={onClick} />
        </TitleBox>
        <InpModular>
          <BalanceText>
            Balance:{" "}
            {Token0Balance !== 0.0 ? Number(Token0Balance).toFixed(3) : 0.0}{" "}
            {"USDT"}
          </BalanceText>
          <Inputs>
            <TokenIcon IconName={"USDT"} />
            <Input
              type="text"
              value={Amount0}
              placeholder="0.00"
              onChange={AmountChange0}
            ></Input>
            <CurrencyBox>BUSD</CurrencyBox>
          </Inputs>
          <BtnBox>
            <Button w={120} h={40} onClick={Token0percent25}>
              25%
            </Button>
            <Button w={120} h={40} onClick={Token0percent50}>
              50%
            </Button>
            <Button w={120} h={40} onClick={Token0percent75}>
              75%
            </Button>
            <Button w={120} h={40} onClick={Token0percent100}>
              100%
            </Button>
          </BtnBox>
        </InpModular>
        <InpModular>
          <BalanceText>
            Balance:{" "}
            {Token1Balance !== 0.0 ? Number(Token1Balance).toFixed(3) : 0.0}{" "}
            {"BNB"}
          </BalanceText>
          <Inputs>
            <TokenIcon IconName={"BNB"} />
            <Input
              type="text"
              value={Amount1}
              placeholder="0.00"
              onChange={AmountChange1}
            ></Input>
            <CurrencyBox>BUSD</CurrencyBox>
          </Inputs>
          <BtnBox>
            <Button w={120} h={40} onClick={Token1percent25}>
              25%
            </Button>
            <Button w={120} h={40} onClick={Token1percent50}>
              50%
            </Button>
            <Button w={120} h={40} onClick={Token1percent75}>
              75%
            </Button>
            <Button w={120} h={40} onClick={Token1percent100}>
              100%
            </Button>
          </BtnBox>
        </InpModular>

        <TexBox1>
          <div>Assets to be Added to Position</div>
          <div>
            {AddedtoPosition0 ? (
              <>{(AddedtoPosition0 / 1).toFixed(3)} USDT</>
            ) : (
              <>0.0 USDT</>
            )}{" "}
            +{" "}
            {AddedtoPosition1 ? (
              <>{(AddedtoPosition1 / 1).toFixed(3)} BNB</>
            ) : (
              <>0.0 BNB</>
            )}{" "}
          </div>
        </TexBox1>
        <TexBox2>
          <TexBox3>
            <div>Updated Assets in Position Value</div>
            <div>
              {AssetsPositionValue0 ? (
                <>{(AssetsPositionValue0 / 1).toFixed(3)} USDT</>
              ) : (
                <>0.0 USDT</>
              )}{" "}
              +{" "}
              {AssetsPositionValue1 ? (
                <>{(AssetsPositionValue1 / 1).toFixed(3)} BNB</>
              ) : (
                <>0.0 BNB</>
              )}{" "}
            </div>
          </TexBox3>
          <TexBox3>
            <div>Risk ratio before margin call</div>
            <div>{(RiskRatioBefore * 100).toFixed(2)}%</div>
          </TexBox3>
          <TexBox3>
            <div>Risk ratio after margin call</div>
            <div>
              {AssetsPositionValue1 ? (
                <>{(TotalValueAfter * 100).toFixed(2)}%</>
              ) : (
                <>
                  <LoadingBox width={50} height={14} />
                </>
              )}
            </div>
          </TexBox3>
        </TexBox2>
        <Button w={0} h={40} onClick={ConfirmClick}>
          Confirm
        </Button>
        
      </Box>
      
    </>
  );
};

const Box = styled.div`
  width: 552px;
  background-color: rgb(25, 25, 31);
  padding: 30px;
  border-radius: 10px;
  position: fixed;
  top: 50%;
  left: 50%;
  margin-top: -310px;
  margin-left: -276px;
  z-index: 1001;
  animation: fade-in-top 0.6s cubic-bezier(0.39, 0.575, 0.565, 1) both;
  @keyframes fade-in-top {
    0% {
      transform: translateY(-50px);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;
const BG = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  backdrop-filter: blur(20px);
`;
const TitleBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  font-size: 18px;
  font-weight: 700;
`;
const CloseBtn = styled.img`
  width: 30px;
  cursor: pointer;
  transition: all 0.3s;
  :hover {
    transform: rotate(180deg);
  }
`;
const InpModular = styled.div`
  width: 100%;
  margin-top: 20px;
`;
const BalanceText = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  height: 38px;
  color: rgba(255, 255, 255, 0.5);
  font-size: 12px;
`;
const Inputs = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  background-color: rgb(66, 60, 86);
  height: 50px;
  border-radius: 10px;
  padding: 10px;
`;
const Input = styled.input`
  border: 0;
  background: #00000000;
  flex: 1;
  height: 30px;
  padding-left: 10px;
  color: #fff;
  font-size: 16px;
`;
const CurrencyBox = styled.div`
  color: rgba(255, 255, 255, 0.5);
`;
const BtnBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
`;

const TexBox1 = styled.div`
  padding: 20px 0;
  color: #fff;
  border-bottom: 1px solid #fff;
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
`;
const TexBox2 = styled.div`
  padding: 15px 0;
`;
const TexBox3 = styled.div`
  color: #fff;
  display: flex;
  justify-content: space-between;
  margin: 5px 0;
`;
