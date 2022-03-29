import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { BgBox } from "components/backgroundBox/background";
import { TokenIcon } from "components/icon/tokenIcon";
import { Button } from "components/button/button";
import { Slider, SliderInp } from "components/SlidingBar";
import {
  TokenBalance0,
  TokenBalance1,
  MaxMinLoan,
  AssetsBorrowed,
  GoblinEvent,
} from "hooks/useSupply";
import { FarmPancakeUSDT_BNB, PANCAKE_ROUTE } from "config/LPAddress";
import { BANK_ADDRESS } from "config/address";
import { useWeb3React } from "@web3-react/core";
import { Link, useParams } from "react-router-dom";
import "../../index.css";
import { GantianIcon } from "components/icon/SVGicon";
import { LoadingBox } from "components/Loading";
import { Approveds, ApproveWay } from "utils/tokenApproved";
import { ERC20 } from "config/ABI";
import store from "state";
import { useSelector } from "react-redux";
import { NoticeBox } from "components/notice";
import { ethers } from "ethers";

/**
 * SupplyBox 开仓页面
 * @returns
 */
export const SupplyPage: React.FC = () => {
  //通知框
  const [Popup, setPopup] = useState(false);
  const [PopupText, setPopupText] = useState("");

  const { account, library } = useWeb3React();

  //获取数据
  let Store = useSelector(store.getState);
  let ListData = Store.AllFroms;
  let Routes = useParams();
  const TokenNames = Routes.id;
  let list = ListData.filter(
    (el) => el.LPtokenName === TokenNames && el.type == "PancakeSwap"
  );
  let Data: any = {};
  list.forEach((item) => {
    Data = { ...item };
  });

  //钱包中的币种余额
  const [Balance0, setBalance0] = useState<any>();
  const [Balance1, setBalance1] = useState<any>();

  //可借的最大数量和最小数量
  const [Loan0Max, setLoan0Max] = useState<any>();
  const [Loan1Max, setLoan1Max] = useState<any>();
  const [Loan0Min, setLoan0Min] = useState<any>();
  const [Loan1Min, setLoan1Min] = useState<any>();

  //可借的最大数量和最小数量币种切换
  const [LoanSwitch0, setLoanSwitch0] = useState<boolean>(true);
  const [LoanSwitch1, setLoanSwitch1] = useState<boolean>(false);
  const LoanSwitch0Click = () => {
    setLoanSwitch0(true);
    setLoanSwitch1(false);
  };
  const LoanSwitch1Click = () => {
    setLoanSwitch0(false);
    setLoanSwitch1(true);
  };

  //调用合约方法部分
  useEffect(() => {
    TokenBalance0(
      library,
      `${FarmPancakeUSDT_BNB.PancakeUSDT_BNB_USDTtoken}`
    ).then((res) => {
      setBalance0(res);
      console.log("0", res);
    });
    TokenBalance0(library, account).then((res) => {
      setBalance1(res);
      console.log("1", res);
    });

    MaxMinLoan(
      BANK_ADDRESS,
      `${FarmPancakeUSDT_BNB.PancakeBNB_BUSD_BorrowToken0._Pid}`
    ).then((res) => {
      setLoan0Max(res?.Max);
      setLoan0Min(res?.Min);
    });
    MaxMinLoan(
      BANK_ADDRESS,
      `${FarmPancakeUSDT_BNB.PancakeBNB_BUSD_BorrowToken1._Pid}`
    ).then((res) => {
      setLoan1Max(res?.Max);
      setLoan1Min(res?.Min);
    });
  }, [TokenBalance0, TokenBalance1, MaxMinLoan]);

  //输入框部分
  const [Amount0, setAmount0] = useState<any>();
  const [Amount1, setAmount1] = useState<any>();
  const AmountChange0 = (e: any) => {
    let { value } = e.target;
    const reg = /^-?\d*(\.\d*)?$/;
    if ((!isNaN(value) && reg.test(value)) || value === "") {
      if (value > Balance0) {
        value = Balance0;
      }
      setAmount0(value);
    }
  };
  const AmountChange1 = (e: any) => {
    let { value } = e.target;
    const reg = /^-?\d*(\.\d*)?$/;
    if ((!isNaN(value) && reg.test(value)) || value === "") {
      if (value > Balance1) {
        value = Balance1;
      }
      setAmount1(value);
    }
  };
  const bf25_0 = () => {
    setAmount0(Balance0 * 0.25);
  };
  const bf50_0 = () => {
    setAmount0(Balance0 * 0.5);
  };
  const bf75_0 = () => {
    setAmount0(Balance0 * 0.75);
  };
  const bf100_0 = () => {
    setAmount0(Balance0);
  };
  const bf25_1 = () => {
    setAmount1(Balance1 * 0.25);
  };
  const bf50_1 = () => {
    setAmount1(Balance1 * 0.5);
  };
  const bf75_1 = () => {
    setAmount1(Balance1 * 0.75);
  };
  const bf100_1 = () => {
    setAmount1(Balance1);
  };

  //杠杆倍数
  let Leverages = Data.Leverage;
  //滑动条
  const [InputSlider, setInputSlider] = useState<any>(Leverages);
  const SliderChange = (e: any) => {
    let a = e.target;
    setInputSlider(a.value);
  };

  //获取总借款数量
  const [AssetsBorroweds, setAssetsBorroweds] = useState<any>();
  //总头⼨中两个币数量
  const [PositionValu0, setPositionValu0] = useState<any>();
  const [PositionValu1, setPositionValu1] = useState<any>();
  //债务率
  const [DebtRatio, setDebtRatio] = useState<any>();

  useEffect(() => {
    const token0 = `${FarmPancakeUSDT_BNB.PancakeUSDT_BNB_WBNBtoken}`;
    const tokne1 = `${FarmPancakeUSDT_BNB.PancakeUSDT_BNB_USDTtoken}`;

    AssetsBorrowed(PANCAKE_ROUTE, token0, tokne1).then((res) => {
      let token0Price = 1;
      let token1Price = res;
      let TotalPrice = token0Price * Amount0 + token1Price * Amount1;
      console.log("uuu", TotalPrice);
      let Borrowed;
      let tvl = TotalPrice * Leverages;
      if (LoanSwitch0 == true) {
        Borrowed = (tvl - TotalPrice) / token0Price;
        setAssetsBorroweds(Borrowed);
      }
      if (LoanSwitch1 == true) {
        Borrowed = (tvl - TotalPrice) / token1Price;
        setAssetsBorroweds(Borrowed);
      }

      //计算总头寸中两个币的数量
      let tokentvl = tvl / 2;
      let token0Amount = tokentvl / token0Price;
      setPositionValu0(token0Amount);
      let token1Amount = tokentvl / token1Price;
      setPositionValu1(token1Amount);
      //计算债务率
      let debts = (tvl - TotalPrice) / tvl;
      setDebtRatio(debts);
    });
  }, [Amount0, Amount1, LoanSwitch0, LoanSwitch1]);

  //授权
  //判断有没有授权的状态
  const [tokenApproved0, setTokenApproved0] = useState<boolean>(false);
  const [tokenApproved1, setTokenApproved1] = useState<boolean>(false);

  //授权按钮的状态默认为true
  const [ApprovdDisabled, setApprovdDisabled] = useState<boolean>(true);
  const [ApproveBtn0, setApproveBtn0] = useState(true);
  const [ApproveBtn1, setApproveBtn1] = useState(false);
  const [FarmBtn, setFarmBtn] = useState(false);

  useEffect(() => {
    Approveds(
      `${FarmPancakeUSDT_BNB.PancakeBNB_BUSD_BorrowToken0}`,
      `${FarmPancakeUSDT_BNB.PancakeUSDT_BNB_USDTtoken}`,
      ERC20,
      account
    ).then((res) => {
      console.log("查看代币是否授权0", res);
      setTokenApproved0(res as boolean);
      if (res) {
        setApproveBtn0(false);
        setApproveBtn1(true);
        setFarmBtn(false);
      }
    });
    Approveds(
      `${FarmPancakeUSDT_BNB.PancakeBNB_BUSD_BorrowToken1}`,
      `${FarmPancakeUSDT_BNB.PancakeUSDT_BNB_WBNBtoken}`,
      ERC20,
      account
    ).then((res) => {
      console.log("查看代币是否授权1", res);
      setTokenApproved1(res as boolean);
      if (res) {
        setApproveBtn0(false);
        setApproveBtn1(false);
        setFarmBtn(true);
      }
    });
  }, []);

  const ApprovedClick0 = () => {
    setApprovdDisabled(false);
    ApproveWay(
      `${FarmPancakeUSDT_BNB.PancakeBNB_BUSD_BorrowToken0}`,
      `${FarmPancakeUSDT_BNB.PancakeUSDT_BNB_USDTtoken}`,
      ERC20,
      account,
      library
    ).then((res) => {
      console.log(res);
      if (res) {
        setPopupText("token0授权成功");
        setPopup(true);
        setApprovdDisabled(true);
        setApproveBtn0(false);
        setApproveBtn1(true);
      } else {
        setPopupText("token0授权失败");
        setPopup(true);
      }
    });
  };
  const ApprovedClick1 = () => {
    setApprovdDisabled(false);
    ApproveWay(
      `${FarmPancakeUSDT_BNB.PancakeBNB_BUSD_BorrowToken1}`,
      `${FarmPancakeUSDT_BNB.PancakeUSDT_BNB_WBNBtoken}`,
      ERC20,
      account,
      library
    ).then((res) => {
      console.log(res);
      if (res) {
        setPopupText("token1授权成功");
        setPopup(true);
        setApprovdDisabled(true);
        setApproveBtn1(false);
        setFarmBtn(true);
      } else {
        setPopupText("token1授权失败");
        setPopup(true);
      }
    });
  };
  const PopupClick = () => {
    setPopup(false);
    setApprovdDisabled(true);
  };

  //开仓按钮事件
  const FarmClick = () => {
    const strategyAddress = Data.address.PancakeUSDT_BNBAddTwoStrategyAddr;
    const token0Address = Data.address.PancakeUSDT_BNB_USDTtoken;
    const token1Address = Data.address.BNB_ADDRESS;
    const token0Amount = Amount0.toString();
    const token1Amount = Amount1.toString();
    let pid;
    if (LoanSwitch0 == true) {
      pid = Data.address.PancakeBNB_BUSD_BorrowToken0._Pid;
    }
    if (LoanSwitch1 == true) {
      pid = Data.address.PancakeBNB_BUSD_BorrowToken1._Pid;
    }
    const borrow = AssetsBorroweds.toString();

    GoblinEvent(
      strategyAddress,
      token0Address,
      token1Address,
      token0Amount,
      token1Amount,
      pid,
      borrow
    ).then((res)=>{
      if(res){
        setPopupText('开仓成功');
        setPopup(true)
      }
    });
  };
  return (
    <>
      {Popup ? (
        <div onClick={PopupClick}>
          <NoticeBox>{PopupText}</NoticeBox>
        </div>
      ) : null}

      <Box className="textAnimation2">
        <LBox>
          <IconBox>
            <TokenIcon IconName={"USDT-BNB"} />
            <NameSize>USDT-BNB</NameSize>
          </IconBox>
          <IconBox2>
            <Tips1>1</Tips1>
            Approve Assets
          </IconBox2>
          <IconBox2>
            <Tips1>2</Tips1>
            Strategy Setting
          </IconBox2>
          <IconBox2>
            <Tips1>3</Tips1>
            Start Farming
          </IconBox2>
          <BtnBox>
            <Link to={"/allFarms"}>
              <Button w={100} h={40}>
                BACK
              </Button>
            </Link>
          </BtnBox>
        </LBox>
        <RBox>
          <Title>I’d like to withdraw</Title>
          <BalanceBox>
            Balance ：{(Balance0 / 1).toFixed(6)} {"USDT"}
          </BalanceBox>
          <InpBox>
            <TokenIcon IconName={"USDT"} />
            <Input
              type="text"
              value={Amount0}
              placeholder="0.00"
              onChange={AmountChange0}
            ></Input>
            <Suffix>USDT</Suffix>
          </InpBox>
          <BtnBox>
            <Button w={125} h={40} mt={15} mr={10} onClick={bf25_0}>
              25%
            </Button>
            <Button w={125} h={40} mt={15} mr={10} onClick={bf50_0}>
              50%
            </Button>
            <Button w={125} h={40} mt={15} mr={10} onClick={bf75_0}>
              75%
            </Button>
            <Button w={125} h={40} mt={15} onClick={bf100_0}>
              100%
            </Button>
          </BtnBox>
          <BalanceBox>
            Balance ：{(Balance1 / 1).toFixed(6)} {"BNB"}
          </BalanceBox>
          <InpBox>
            <TokenIcon IconName={"BNB"} />
            <Input
              type="text"
              value={Amount1}
              placeholder="0.00"
              onChange={AmountChange1}
            ></Input>
            <Suffix>BNB</Suffix>
          </InpBox>
          <BtnBox>
            <Button w={125} h={40} mt={15} mr={10} onClick={bf25_1}>
              25%
            </Button>
            <Button w={125} h={40} mt={15} mr={10} onClick={bf50_1}>
              50%
            </Button>
            <Button w={125} h={40} mt={15} mr={10} onClick={bf75_1}>
              75%
            </Button>
            <Button w={125} h={40} mt={15} onClick={bf100_1}>
              100%
            </Button>
          </BtnBox>
          <SliderInp
            max={30}
            min={1}
            value={InputSlider}
            onChange={SliderChange}
          ></SliderInp>

          <Borrow>
            {/* {LoanSwitch?:} */}
            {LoanSwitch0 ? (
              <span>
                I'd like to borrow (min:{Loan0Min},max:{Loan0Max})
              </span>
            ) : null}
            {LoanSwitch1 ? (
              <span>
                I'd like to borrow (min:{Loan1Min},max:{Loan1Max})
              </span>
            ) : null}

            <span className="Available">Available Balance :1551989.426774</span>
          </Borrow>
          <BorrowBtnBox>
            <Button
              w={100}
              h={40}
              mr={10}
              onClick={LoanSwitch0Click}
              Select={LoanSwitch0}
            >
              USDT
            </Button>
            <Button
              w={100}
              h={40}
              onClick={LoanSwitch1Click}
              Select={LoanSwitch1}
            >
              BNB
            </Button>
          </BorrowBtnBox>
          <Tips2>
            <div>
              <GantianIcon />
            </div>
            <div style={{ marginLeft: 10, fontSize: 12 }}>
              To supply 2 assets with equal value is suggested, in this way the
              trading fee and slippage is minimized.
            </div>
          </Tips2>
          <Tips3>
            <div>Price Impact and Trading Fees</div>
            <div style={{ color: "rgb(240, 72, 72)" }}>-0.25%</div>
          </Tips3>
          <DataList>
            <DataListDiv>
              <div>Assets Supplied</div>
              <div className="AssetsSupplied">
                {(Amount0 / 1).toFixed(3)} USDT + {(Amount1 / 1).toFixed(3)} BNB
              </div>
            </DataListDiv>
            <DataListDiv>
              <div>Assets Borrowed</div>
              <div>
                {/* {AssetsBorroweds ? (
                  `${(AssetsBorroweds / 1).toFixed(2)} USDT`
                ) : (
                  <LoadingBox width={50} height={14} />
                )} */}
                {(AssetsBorroweds / 1).toFixed(3)}
                {LoanSwitch0 == true ? "USDT" : "BNB"}
                {/* {LoanSwitch1 == true ? "BNB" : ""} */}
              </div>
            </DataListDiv>
            <DataListDiv>
              <div>Total Assets in Position Value</div>
              <div>
                {PositionValu0 ? (
                  `${(PositionValu0 / 1).toFixed(2)} USDT + ${(
                    PositionValu1 / 1
                  ).toFixed(2)} BNB`
                ) : (
                  <LoadingBox width={50} height={14} />
                )}
              </div>
            </DataListDiv>
            <DataListDiv>
              <div>Debt Ratio</div>
              <div>
                {/* {DebtRatio ? (
                  `${(DebtRatio / 1).toFixed(2)}%`
                ) : (
                  <LoadingBox width={50} height={14} />
                )} */}
                {(DebtRatio * 100).toFixed(2)}%
              </div>
            </DataListDiv>
            <DataListDiv>
              <div>Total APY</div>
              <div style={{ color: "rgb(48, 162, 122)" }}>
                <LoadingBox width={50} height={14} />
                {/* <GantianIcon /> */}
              </div>
            </DataListDiv>
          </DataList>
          {ApproveBtn0 ? (
            <Button
              w={0}
              h={40}
              mt={40}
              disabled={ApprovdDisabled}
              onClick={ApprovedClick0}
            >
              Approved token0
            </Button>
          ) : null}
          {ApproveBtn1 ? (
            <Button
              w={0}
              h={40}
              mt={40}
              disabled={ApprovdDisabled}
              onClick={ApprovedClick1}
            >
              Approved token1
            </Button>
          ) : null}
          {FarmBtn ? (
            <Button
              w={0}
              h={40}
              mt={40}
              disabled={ApprovdDisabled}
              onClick={FarmClick}
            >
              Farm {Leverages}x
            </Button>
          ) : null}
        </RBox>
      </Box>
    </>
  );
};

const Box = styled(BgBox)`
  margin: 0 auto;
  width: 100%;
  max-width: 900px;
  /* height: 380px; */
  display: flex;
  overflow: hidden;
  margin-bottom: 40px;
`;
const LBox = styled.div`
  flex: 1;
  background: rgba(25, 25, 31, 0.6);
  padding: 25px;
`;
const RBox = styled.div`
  flex: 2;
  padding: 25px;
`;
const NameSize = styled.div`
  font-size: 18px;
  margin-left: 10px;
  color: #fff;
`;
const IconBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 40px;
  color: #fff;
`;
const IconBox2 = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  color: #fff;
`;
const BtnBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Tips1 = styled.div`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(48, 49, 72);
  color: #fff;
  margin-right: 10px;
`;

const Title = styled.div`
  font-size: 16px;
  color: rgba(255, 255, 255, 0.5);
`;
const BalanceBox = styled.div`
  width: 100%;
  height: 38px;
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
`;
const InpBox = styled.div`
  width: 100%;
  height: 50px;
  background-color: rgb(66, 60, 86);
  border-radius: 10px;
  padding: 0 10px;
  display: flex;
  align-items: center;
`;
const Input = styled.input`
  flex: 1;
  height: 40px;
  border: 0;
  background: 0;
  padding: 0 10px;
  font-size: 16px;
  color: #fff;
`;
const ReceiveBox = styled.div`
  width: 100%;
  height: 38px;
  display: flex;
  align-items: center;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
`;
const Values = styled.div`
  color: rgb(255, 182, 13);
`;
const TipsBox = styled.div`
  display: flex;
  font-size: 12px;
  margin-top: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 10px;
  color: rgba(255, 255, 255, 0.5);
  border-radius: 5px;
`;
const Suffix = styled.div`
  color: rgba(255, 255, 255, 0.5);
`;
const Borrow = styled.div`
  color: rgba(255, 255, 255, 0.5);
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
`;
const BorrowBtnBox = styled.div`
  display: flex;
`;
const Tips2 = styled.div`
  width: 100%;
  height: 60px;
  margin: 30px 0;
  padding: 10px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 5px;
  color: rgba(255, 255, 255, 0.5);
  display: flex;
  align-items: center;
`;
const Tips3 = styled.div`
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
`;
const DataList = styled.div`
  margin-top: 30px;
  width: 100%;
`;
const DataListDiv = styled.div`
  width: 100%;
  margin-bottom: 15px;
  color: #fff;
  display: flex;
  justify-content: space-between;
  .AssetsSupplied {
    display: flex;
  }
`;
