import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { BgBox } from "components/backgroundBox/background";
import { TokenIcon } from "components/icon/tokenIcon";
import { Button } from "components/button/button";
import { SliderInp } from "components/SlidingBar";
import { Slider } from "antd";
import {
  TokenBalanceOf,
  MaxMinLoan,
  DataInfo,
  GoblinEvent,
  AvailableBNBBalance,
  AvailableBalance,
} from "hooks/useSupply";
import {
  FarmPancakeUSDT_BNB, PANCAKE_ROUTE,
  FarmAddressArrs
} from "config/LPAddress";
import { BANK_ADDRESS, BNB_ADDRESS } from "config/address";
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
import {
  Box, LBox, RBox, NameSize, IconBox, IconBox2, BtnBox, Tips1,
  Title, BalanceBox, InpBox, Input, Suffix, Borrow, BorrowBtnBox, Tips2,
  Tips3, DataList, DataListDiv
} from "./SupplyStyled";
import { UpdateNotice, UpdateNotice2, UpdateNoticeText } from "state/TypePage/hooks"
/**
 * SupplyBox 开仓页面
 * @returns
 */
export const SupplyPage: React.FC = () => {
  let Routes = useParams();
  const TokenNames = Routes.name;
  const TokenIndex = Routes.index;
  const Leverages = Routes.leverage;
  const MaxLeverage = Routes.MaxLeverage;
  const { account, library } = useWeb3React();
  //杠杆比例
  const RatioArrs = [0.25, 0.5, 0.75, 1]
  //通知框
  const setNotice = UpdateNotice();
  const setNotice2 = UpdateNotice2();
  const setNoticeText = UpdateNoticeText();
  //当前币种的info
  const [CurrentTokenInfo, setCurrentTokens] = useState<any>({});
  const [Token0Pid, setToken0Pid] = useState<any>();
  const [Token1Pid, setToken1Pid] = useState<any>();
  //钱包中的币种余额
  const [Balance0, setBalance0] = useState<any>();
  const [Balance1, setBalance1] = useState<any>();
  //可借的最大数量和最小数量
  const [Loan0Max, setLoan0Max] = useState<any>();
  const [Loan1Max, setLoan1Max] = useState<any>();
  const [Loan0Min, setLoan0Min] = useState<any>();
  const [Loan1Min, setLoan1Min] = useState<any>();
  //可借款数量
  const [TotalBorrowedData, setTotalBorrowedData] = useState<any>();
  //可借的最大数量和最小数量币种切换
  const [LoanSwitch0, setLoanSwitch0] = useState<boolean>(false);
  const [LoanSwitch1, setLoanSwitch1] = useState<boolean>(false);
  const [CurrenName, setCurrenName] = useState<any>();
  //输入框部分
  const [Amount0, setAmount0] = useState<any>("0");
  const [Amount1, setAmount1] = useState<any>("0");
  //授权
  //授权按钮的状态默认为true
  const [ApprovdDisabled, setApprovdDisabled] = useState<boolean>(true);
  const [FarmDisabled, setFarmDisabled] = useState<boolean>(false)
  const [ApproveBtn0, setApproveBtn0] = useState(true);
  const [ApproveBtn1, setApproveBtn1] = useState(true);
  const [FarmBtn, setFarmBtn] = useState(false);
  //获取当前的CurrentTokens 和Token0Pid，Token1Pid
  useEffect(() => {
    const CurrentToken = FarmAddressArrs[Number(TokenIndex)];
    setToken0Pid(CurrentToken?.BorrowToken0?._Pid)
    setToken1Pid(CurrentToken?.BorrowToken1?._Pid)
    if (!CurrentToken?.BorrowToken0?._Pid && CurrentToken?.BorrowToken1?._Pid) {
      setLoanSwitch0(false);
      setLoanSwitch1(true);
      setCurrenName(TokenNames?.split("-")[1])
    } else {
      setLoanSwitch0(true);
      setLoanSwitch1(false);
      setCurrenName(TokenNames?.split("-")[0])
    }
    setCurrentTokens(CurrentToken);
  }, [TokenIndex]);
  //获取 可借款数量
  const getTotalBorrowed = async () => {
    console.log(444, CurrentTokenInfo)
    //根据切换当前币，切换address
    const TokenAddress = LoanSwitch0 ? CurrentTokenInfo.LPtokenAddress0 : CurrentTokenInfo.LPtokenAddress1;
    if (!TokenAddress) {
      return;
    }
    let res;
    if (CurrenName == "BNB") {
      res = await AvailableBNBBalance();
    } else {
      res = await AvailableBalance(TokenAddress)
    }
    // console.log("可借款数量", res, CurrenName)
    setTotalBorrowedData(res);
  }
  //获取 可借款数量
  useEffect(() => {
    getTotalBorrowed()
  }, [LoanSwitch0, LoanSwitch1]);
  // console.log(333, Leverages)
  //滑动条
  const [InputSlider, setInputSlider] = useState<any>(Leverages);
  const SliderChange = (e: any) => {
    let a = e.target;
    setInputSlider(a.value);
  };
  const SliderClick = (value: any) => {
    // console.log(value)
    setInputSlider(value);
  };
  //获取总借款数量
  const [AssetsBorroweds, setAssetsBorroweds] = useState<any>();
  //总头⼨中两个币数量
  const [PositionValu0, setPositionValu0] = useState<any>(null);
  const [PositionValu1, setPositionValu1] = useState<any>();
  //债务率
  const [DebtRatio, setDebtRatio] = useState<any>();
  //获取底部数据
  const getDataList = async () => {
    const token0 = CurrentTokenInfo.LPtokenAddress0;
    const tokne1 = CurrentTokenInfo.LPtokenAddress1;

    //稳定币种
    let baseToken = null;
    const baseName = ["BUSD", "USDT", "DAI", "USDC"];
    const Token0Name = TokenNames?.split("-")[0];
    const Token1Name = TokenNames?.split("-")[1];
    if (Token0Name && baseName.includes(Token0Name)) {
      baseToken = 0;
    } else if (Token1Name && baseName.includes(Token1Name)) {
      baseToken = 1;
    }
    const type = CurrentTokenInfo.Type;
    const res = await DataInfo(token0, tokne1, Amount0, Amount1, InputSlider,
      //LoanSwitch0, baseToken,
      type);
    // console.log(222, res);
    const { tvl, userTvl, token0Price, token1Price, token0Amount, token1Amount, debts } = res;
    let Borrowed;
    if (LoanSwitch0 == true) {
      Borrowed = (tvl - userTvl) / token0Price;
      setAssetsBorroweds(Borrowed);
    }
    if (LoanSwitch1 == true) {
      Borrowed = (tvl - userTvl) / token1Price;
      setAssetsBorroweds(Borrowed);
    }
    setPositionValu0(token0Amount);
    setPositionValu1(token1Amount);
    //计算债务率
    setDebtRatio(debts);
  }
  //获取底部数据
  useEffect(() => {
    if (!CurrentTokenInfo.LPtokenAddress0) {
      return;
    }
    getDataList()
  }, [Amount0, Amount1, LoanSwitch0, LoanSwitch1, CurrentTokenInfo, InputSlider]);

  //获取币余额，最大值最小值
  const getBalanceMinMax = async () => {
    if (!CurrentTokenInfo.LPtokenAddress0) {
      return;
    }
    await TokenBalanceOf(
      account,
      library,
      CurrentTokenInfo.LPtokenAddress0,
      TokenNames?.split("-")[0]
    ).then((res) => {
      setBalance0(res);
      // console.log("token0币余额", res);
    });
    await TokenBalanceOf(
      account,
      library,
      CurrentTokenInfo.LPtokenAddress1,
      TokenNames?.split("-")[1]
    ).then((res) => {
      // console.log("token1币余额", res);
      setBalance1(res);
    });
    if (CurrentTokenInfo.BorrowToken0?._Pid) {
      await MaxMinLoan(
        BANK_ADDRESS,
        CurrentTokenInfo.BorrowToken0?._Pid
      ).then((res) => {
        // console.log("token0大小值", res)
        setLoan0Max(res?.Max);
        setLoan0Min(res?.Min);
      });
    }
    if (CurrentTokenInfo.BorrowToken1?._Pid) {
      await MaxMinLoan(
        BANK_ADDRESS,
        CurrentTokenInfo.BorrowToken1?._Pid
      ).then((res) => {
        // console.log("token1大小值", res)
        setLoan1Max(res?.Max);
        setLoan1Min(res?.Min);
      });
    }
  }
  //页面授权
  const ApprovedsEvent = async () => {
    //给token0授权
    if (TokenNames?.split("-")[0] != "BNB") {
      await Approveds(
        TokenNames?.split("-")[0],
        account,
        ERC20,
        CurrentTokenInfo.LPtokenAddress0,
        library,
        CurrentTokenInfo.AddTwoStrategyAddr
      ).then((res) => {
        console.log("是否授权0", res);
        // setTokenApproved0(res as boolean);
        if (res) {
          setApproveBtn0(false);
        } else {
          setApproveBtn0(true);
        }
      });
    } else {
      //token0免授权
      setApproveBtn0(false);
    }
    //给token1授权
    if (TokenNames?.split("-")[1] != "BNB") {
      await Approveds(
        TokenNames?.split("-")[1],
        account,
        ERC20,
        CurrentTokenInfo.LPtokenAddress1,
        library,
        CurrentTokenInfo.AddTwoStrategyAddr
      ).then((res) => {
        // console.log("是否授权1", res);
        // setTokenApproved1(res as boolean);
        if (res) {
          // console.log("是否授权11", res);
          setApproveBtn1(false);
        } else {
          // console.log("是否授权222", res);
          setApproveBtn1(true);
        }
      });
    } else {
      //token1免授权
      setApproveBtn1(false);
    }
  }
  //页面授权 获取币余额，最大值最小值
  useEffect(() => {
    if (!CurrentTokenInfo.LPtokenAddress0 || !library) {
      return;
    }
    //获取币余额，最大值最小值
    getBalanceMinMax();
    //页面授权
    ApprovedsEvent()
  }, [CurrentTokenInfo, library]);
  // 手动授权token0
  const ApprovedClick0 = () => {
    setApprovdDisabled(false);
    ApproveWay(
      TokenNames?.split("-")[0],
      account,
      ERC20,
      CurrentTokenInfo.LPtokenAddress0,
      library,
      CurrentTokenInfo.AddTwoStrategyAddr
    ).then((res) => {
      // console.log(res);
      if (res) {
        setNoticeText("Approve succeed");

        setNotice(true);
        setApprovdDisabled(true);
        setApproveBtn0(false);
      } else {
        setApprovdDisabled(true);
        setNotice2(true);
        setNoticeText("Approve fail");
      }
    });
  };
  // 手动授权token1
  const ApprovedClick1 = () => {
    setApprovdDisabled(false);
    ApproveWay(
      TokenNames?.split("-")[1],
      account,
      ERC20,
      CurrentTokenInfo.LPtokenAddress1,
      library,
      CurrentTokenInfo.AddTwoStrategyAddr
    ).then((res) => {
      console.log(res);
      if (res) {
        setNoticeText("Approve succeed");
        setNotice(true);
        setApprovdDisabled(true);
        setApproveBtn1(false);
      } else {
        setApprovdDisabled(true);
        setNotice2(true);
        setNoticeText("Approve fail");
      };
    });
  };
  //是否出现farm按钮  setFarmDisabled
  useEffect(() => {
    if (!ApproveBtn0 && !ApproveBtn1) {
      setFarmBtn(true)
    }
  }, [ApproveBtn0, ApproveBtn1]);
  useEffect(() => {
    // console.log(999, Amount0 != 0, Amount1 != 0)
    if (Amount0 != 0 || Amount1 != 0) {
      setFarmDisabled(true)
    } else {
      setFarmDisabled(false)
    }
  }, [Amount0, Amount1]);
  const balance0Ratio = (ratio: number) => {
    setAmount0((Balance0 * ratio).toFixed(6));
  }
  const balance1Ratio = (ratio: number) => {
    setAmount1((Balance1 * ratio).toFixed(6));
  };
  const LoanSwitch0Click = () => {
    setLoanSwitch0(true);
    setLoanSwitch1(false);
  };
  const LoanSwitch1Click = () => {
    setLoanSwitch0(false);
    setLoanSwitch1(true);
  };
  //输入框部分
  const AmountChange0 = (e: any) => {
    let { value } = e.target;
    const reg = /^-?\d*(\.\d*)?$/;
    if ((!isNaN(value) && reg.test(value)) || value === "") {
      // value = value ? parseFloat(value).toFixed(6) : value;
      setAmount0(value);
    }
  };
  const AmountChange1 = (e: any) => {
    let { value } = e.target;
    const reg = /^-?\d*(\.\d*)?$/;
    if ((!isNaN(value) && reg.test(value)) || value === "") {
      setAmount1(value);
    }
  };
  //判断当前币种是否是bnb
  let token0IsBNB: any = TokenNames?.split("-")[0] == "BNB" ? true : false;
  let token1IsBNB: any = TokenNames?.split("-")[1] == "BNB" ? true : false;
  //开仓按钮事件
  const FarmClick = () => {
    const strategyAddress = CurrentTokenInfo.AddTwoStrategyAddr;
    //如果token0，或者token1是bnb，BNB_ADDRESS。
    const token0Address = TokenNames?.split("-")[0] != "BNB" ? CurrentTokenInfo.LPtokenAddress0 : BNB_ADDRESS;
    const token1Address = TokenNames?.split("-")[1] != "BNB" ? CurrentTokenInfo.LPtokenAddress1 : BNB_ADDRESS;
    const token0Amount = Amount0.toString();
    const token1Amount = Amount1.toString();
    let pid;
    if (LoanSwitch0 == true) {
      pid = Token0Pid;
    }
    if (LoanSwitch1 == true) {
      pid = Token1Pid;
    }
    const borrow = AssetsBorroweds.toString();
    GoblinEvent(
      strategyAddress,
      token0Address,
      token1Address,
      token0Amount,
      token1Amount,
      pid,
      borrow,
      token0IsBNB,
      token1IsBNB
    ).then((res) => {
      if (res) {
        setNoticeText("Farm succeed");
        setNotice(true);
      } else {
        setNoticeText("Farm fail");
        setNotice2(true);
      }
    });
  };
  const marks = [1, 3, 4, 7, 9];
  return (
    <>
      <Box className="textAnimation2">
        <LBox>
          <IconBox>
            <TokenIcon IconName={`${TokenNames}`} />
            <NameSize>{TokenNames}</NameSize>
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
            Balance ：{(Balance0 / 1).toFixed(6)}
            {/* {TokenNames?.split("-")[0]} */}
          </BalanceBox>
          <InpBox>
            <TokenIcon IconName={`${TokenNames?.split("-")[0]}`} />
            <Input
              type="text"
              value={Amount0}
              placeholder="0.00"
              onChange={AmountChange0}
            ></Input>
            <Suffix>{TokenNames?.split("-")[0]}</Suffix>
          </InpBox>
          <BtnBox>
            {RatioArrs.map((item, key) => (
              <Button key={key} w={125} h={40} mt={15} mr={10}
                onClick={() => balance0Ratio(item)}>
                {item * 100}%
              </Button>
            ))}
          </BtnBox>
          <BalanceBox>
            Balance ：{(Balance1 / 1).toFixed(6)}
            {/* {TokenNames?.split("-")[1]} */}
          </BalanceBox>
          <InpBox>
            <TokenIcon IconName={`${TokenNames?.split("-")[1]}`} />
            <Input
              type="text"
              value={Amount1}
              placeholder="0.00"
              onChange={AmountChange1}
            ></Input>
            <Suffix>{TokenNames?.split("-")[1]}</Suffix>
          </InpBox>
          <BtnBox>
            {RatioArrs.map((item, key) => (
              <Button key={key} w={125} h={40} mt={15} mr={10}
                onClick={() => balance1Ratio(item)}>
                {item * 100}%
              </Button>
            ))}
          </BtnBox>
          {/* <Slider marks={marks} step={null} defaultValue={37} /> */}
          <SliderInp
            max={MaxLeverage}
            min={1}
            value={InputSlider}
            marks={marks}
            onChange={SliderChange}
            onClick={SliderClick}
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

            <span className="Available">Available Balance :
              {parseFloat(TotalBorrowedData).toFixed(6)}</span>
          </Borrow>
          <BorrowBtnBox>
            {Token0Pid ?
              <Button w={100} h={40} mr={10} onClick={LoanSwitch0Click}
                Select={LoanSwitch0}>
                {TokenNames?.split("-")[0]}
              </Button>
              : ""}
            {Token1Pid ?
              <Button w={100} h={40} onClick={LoanSwitch1Click}
                Select={LoanSwitch1}>
                {TokenNames?.split("-")[1]}
              </Button>
              : ""}
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
            <div style={{ color: "rgb(240, 72, 72)" }}>
              {CurrentTokenInfo.Type == "Pancake" ? "-0.25%" : "-0.30%"}
            </div>
          </Tips3>
          <DataList>
            <DataListDiv>
              <div>Assets Supplied</div>
              <div className="AssetsSupplied">
                {(Amount0 / 1).toFixed(6)} ${TokenNames?.split("-")[0]}
                + {(Amount1 / 1).toFixed(6)} ${TokenNames?.split("-")[1]}
              </div>
            </DataListDiv>
            <DataListDiv>
              <div>Assets Borrowed</div>
              <div>
                {(AssetsBorroweds / 1).toFixed(3)}
                {LoanSwitch0 == true ? `${TokenNames?.split("-")[0]}` : `${TokenNames?.split("-")[1]}`}

              </div>
            </DataListDiv>
            <DataListDiv>
              <div>Total Assets in Position Value</div>
              <div>
                {PositionValu0 != null ? (
                  `${(PositionValu0 / 1).toFixed(6)}
                  ${TokenNames?.split("-")[0]}
                  + ${(PositionValu1 / 1).toFixed(6)}
                  ${TokenNames?.split("-")[1]}`
                ) : (
                  <LoadingBox width={50} height={14} />
                )}
              </div>
            </DataListDiv>
            <DataListDiv>
              <div>Debt Ratio</div>
              <div>
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
              Approved {TokenNames?.split("-")[0]}
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
              Approved {TokenNames?.split("-")[1]}
            </Button>
          ) : null}
          {FarmBtn ? (
            <Button
              w={0}
              h={40}
              mt={40}
              disabled={FarmDisabled}
              onClick={FarmClick}
            >
              Farm {InputSlider}x{FarmBtn}
            </Button>
          ) : null}
        </RBox>
      </Box>
    </>
  );
};