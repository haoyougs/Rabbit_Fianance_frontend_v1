import React, { useEffect, useState } from "react";
import styled from "styled-components";
import closeImg from "assets/close@2x.png";
import { TokenIcon } from "components/icon/tokenIcon";
import { Button } from "components/button/button";
import { useWeb3React } from "@web3-react/core";
import { LoadingBox } from "components/Loading";
import { Replenishment } from "hooks/useMyPosition";
import { AssetsBorrowed } from "hooks/useSupply";
import { PANCAKE_ROUTE, MDEX_ROUTE } from "config/LPAddress";
import { ethers } from "ethers";
import store from "state";
import { useSelector } from "react-redux";
import { NoticeBox } from "components/notice/index";
import { TokenBalance1, TokneBalanceS } from "hooks/useMyPosition";
import { Approveds, ApproveWay } from "utils/tokenApproved";
import { ERC20 } from "config/ABI";
import { UpdateNotice, UpdateNotice2, UpdateNoticeText } from "state/TypePage/hooks"
import { subStringNum } from "utils/subStringNum";
interface parameter {
  onClick: () => void;
  info: any;
  freshParent: any;

}

export const AddCollateralPage: React.FC<parameter> = ({ onClick, info, freshParent }) => {
  //获取钱包地址
  let { account, library } = useWeb3React();
  //杠杆比例
  const RatioArrs: number[] = [0.25, 0.5, 0.75, 1]
  const LPAddress: any = info.LPAddress;
  const Ellipsis: string = (LPAddress as { Ellipsis: string }).Ellipsis;
  const Data: any = info.item;
  const Names: string = info.LPAddress.LPtokenName
  const Token0Name: string = Names?.split("-")[0];
  const Token1Name: string = Names?.split("-")[1];
  // //////console.log(info, Ellipsis);
  //获取账户余额的变量
  let [Token0Balance, setToken0Balance] = useState<any>();
  let [Token1Balance, setToken1Balance] = useState<any>();
  //token0的输入框
  const [Amount0, setAmount0] = useState<any>("0");
  //token1的输入框
  const [Amount1, setAmount1] = useState<any>("0");
  //授权按钮的状态默认为true
  const [ApprovdDisabled, setApprovdDisabled] = useState<boolean>(true);
  const [ApproveBtn0, setApproveBtn0] = useState(true);
  const [ApproveBtn1, setApproveBtn1] = useState(true);
  const [FarmBtn, setFarmBtn] = useState(false);
  const [FarmDisabled, setFarmDisabled] = useState<boolean>(false);
  //token0 选择比例
  const [Ratio0Select, setRatio0Select] = useState<string>("");
  //token1 选择比例
  const [Ratio1Select, setRatio1Select] = useState<string>("");
  //提示
  const setNotice = UpdateNotice();
  const setNotice2 = UpdateNotice2();
  const setNoticeText = UpdateNoticeText();
  //判断当前币种是否是bnb
  let token0IsBNB: any = Data.token0 == "0x0000000000000000000000000000000000000000" ? true : false;
  let token1IsBNB: any = Data.token1 == "0x0000000000000000000000000000000000000000" ? true : false;
  //获取账户余额
  useEffect(() => {
    // 获取token0余额
    if (account) {
      // //////console.log(account);
      if (token0IsBNB) {
        TokenBalance1(library, account).then((res) => {
          const value = subStringNum(res, 6)
          setToken0Balance(value);
        });
      } else {
        TokneBalanceS(account, library, info.LPAddress.LPtokenAddress0).then((res) => {
          const result = ethers.utils.formatUnits(ethers.BigNumber.from(res), 18);
          const value = subStringNum(result, 6)
          setToken0Balance(value);
        });
      }
      if (token1IsBNB) {
        TokenBalance1(library, account).then((res) => {
          const value = subStringNum(res, 6)
          setToken1Balance(value);
        });
      } else {
        TokneBalanceS(account, library, info.LPAddress.LPtokenAddress1).then((res) => {
          const result = ethers.utils.formatUnits(ethers.BigNumber.from(res), 18)
          const value = subStringNum(result, 6)
          setToken1Balance(value);
        });
      }
    }
  }, [account]);
  //token0的输入
  const AmountChange0 = (e: any) => {
    let { value } = e.target;
    const reg = /^-?\d*(\.\d*)?$/;
    if ((!isNaN(value) && reg.test(value)) || value === "") {
      // value = value ? parseFloat(value).toFixed(6) : value;
      setAmount0(value);
    }
  };
  //token1的输入
  const AmountChange1 = (e: any) => {
    let { value } = e.target;
    const reg = /^-?\d*(\.\d*)?$/;
    if ((!isNaN(value) && reg.test(value)) || value === "") {
      setAmount1(value);
    }
  };
  const balance0Ratio = <T extends number>(ratio: T) => {
    setRatio0Select(ratio.toString() + "0");
    setAmount0((Token0Balance * ratio).toFixed(6));
  }
  const balance1Ratio = <T extends number>(ratio: T) => {
    setRatio1Select(ratio.toString() + "1");
    setAmount1((Token1Balance * ratio).toFixed(6));
  };
  //页面授权
  const ApprovedsEvent = async () => {
    //给token0授权
    if (Token0Name != "BNB") {
      await Approveds(
        Token0Name,
        account,
        ERC20,
        info.LPAddress.LPtokenAddress0,
        library,
        info.LPAddress.AddTwoStrategyAddr
      ).then((res) => {
        //////console.log("是否授权0", res);
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
    if (Token1Name != "BNB") {
      await Approveds(
        Token1Name,
        account,
        ERC20,
        info.LPAddress.LPtokenAddress1,
        library,
        info.LPAddress.AddTwoStrategyAddr
      ).then((res) => {
        //////console.log("是否授权1", res);
        // setTokenApproved1(res as boolean);
        if (res) {
          //////console.log("是否授权11", res);
          setApproveBtn1(false);
        } else {
          //////console.log("是否授权222", res);
          setApproveBtn1(true);
        }
      });
    } else {
      //token1免授权
      setApproveBtn1(false);
    }
  }
  //页面授权
  useEffect(() => {
    if (!library) {
      return;
    }
    //页面授权
    ApprovedsEvent()
  }, [library]);
  // 手动授权token0
  const ApprovedClick0 = () => {
    setApprovdDisabled(false);
    ApproveWay(
      Token0Name,
      account,
      ERC20,
      info.LPAddress.LPtokenAddress0,
      library,
      info.LPAddress.AddTwoStrategyAddr
    ).then((res) => {
      // //////console.log(res);
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
      Token1Name,
      account,
      ERC20,
      info.LPAddress.LPtokenAddress1,
      library,
      info.LPAddress.AddTwoStrategyAddr
    ).then((res) => {
      //////console.log(res);
      if (res) {
        setNoticeText("Approve succeed");
        setNotice(true);
        setApprovdDisabled(true);
        setApproveBtn1(false);
      } else {
        setApprovdDisabled(true);
        setNotice2(true);
        setNoticeText("Approve fail");
      }
    });
  };
  //是否出现farm按钮
  useEffect(() => {
    if (!ApproveBtn0 && !ApproveBtn1) {
      setFarmBtn(true)
    }
  }, [ApproveBtn0, ApproveBtn1]);
  useEffect(() => {
    // //////console.log(999, Amount0 != 0, Amount1 != 0)
    if (Amount0 != 0 || Amount1 != 0) {
      setFarmDisabled(true)
    } else {
      setFarmDisabled(false)
    }
  }, [Amount0, Amount1]);
  const ROUTE = info.LPAddress.Type == "Pancake" ? PANCAKE_ROUTE : MDEX_ROUTE;
  //Assets to be Added to Position 中展示的数据
  let [AddedtoPosition0, setAddedtoPosition0] = useState<any>();
  let [AddedtoPosition1, setAddedtoPosition1] = useState<any>();
  //Updated Assets in Position Value 中的数据
  let [AssetsPositionValue0, setAssetsPositionValue0] = useState<any>();
  let [AssetsPositionValue1, setAssetsPositionValue1] = useState<any>();
  //更新前的债务率

  const computeRisk = (totalValue: any, positionsValue: any, LiquidationFactor: any) => {
    const risk = totalValue / positionsValue / LiquidationFactor;
    return risk;
  }
  let RiskRatioBefore = computeRisk(Data.totalValue, Data.positionsValue, LPAddress.LiquidationFactor);

  // //更新后的债务率
  let [TotalValueAfter, setTotalValueAfter] = useState<any>();
  useEffect(() => {
    if (!info.LPAddress.LPtokenAddress0) {
      return;
    }
    // 获取币种的价格
    if (Data.token0 || ROUTE) {
      AssetsBorrowed(
        ROUTE,
        //这个地址是WBNB的地址，暂时放在这里
        info.LPAddress.LPtokenAddress0,
        info.LPAddress.LPtokenAddress1
      ).then((res) => {
        //////console.log("res", res)
        let token0Price = 1;
        //非稳定币价格
        let token1Price = 1 / (Math.floor(res * 100000) / 100000);
        //////console.log(222, token1Price, Amount0, Amount1);

        const new_Amount0 = Amount0 ? Amount0 : 0;
        const new_Amount1 = Amount1 ? Amount1 : 0;
        //////console.log(res);
        //非稳定币价格
        //////console.log(222, new_Amount0, new_Amount1);
        // 获取平均后的币种各个币种的数量得合计
        let TotalToken = token0Price * parseFloat(new_Amount0) + token1Price * parseFloat(new_Amount1);
        //单币的价格
        const singleToken = TotalToken / 2
        //////console.log(111, TotalToken, singleToken);
        let token0Totalvalue = singleToken / token0Price;
        let token1Totalvalue = singleToken / token1Price;
        setAddedtoPosition0(token0Totalvalue);
        setAddedtoPosition1(token1Totalvalue);
        //借款币是不是token0
        const borrowToken0 = Data.borrowToken == Data.token0 ? true : false;
        //////console.log(borrowToken0)
        // // 更新后的头寸value价值
        let positionsValue =
          Number(ethers.utils.formatUnits(Data.positionsValue, 18)) / 2;
        let PositionValue0;
        let PositionValue1;
        //假如是稳定币
        if (Ellipsis) {
          // //////console.log(333, positionsValue)
          if (borrowToken0) {
            PositionValue0 = positionsValue * 1 + token0Totalvalue;
            PositionValue1 = positionsValue / token1Price + token1Totalvalue;
          } else {
            PositionValue0 = positionsValue * token1Price + token0Totalvalue;
            PositionValue1 = positionsValue * 1 + token1Totalvalue;
          }
          setAssetsPositionValue0(PositionValue0);
          setAssetsPositionValue1(PositionValue1);
        } else {
          //////console.log(444, positionsValue)
          //以第一个计价
          if (borrowToken0) {
            PositionValue0 = positionsValue * 1 + token0Totalvalue;
            PositionValue1 = positionsValue / token1Price + token1Totalvalue;
          } else {
            PositionValue0 = positionsValue * token1Price + token0Totalvalue;
            PositionValue1 = positionsValue * 1 + token1Totalvalue;
          }
          setAssetsPositionValue0(PositionValue0);
          setAssetsPositionValue1(PositionValue1);
        }
        // //更新后的总价值
        let totalValue = PositionValue0 + PositionValue1 * token1Price;
        let RiskRatioAfter =
          (Number(ethers.utils.formatUnits(Data.totalValue, 18)) / totalValue) / LPAddress.LiquidationFactor;
        if (new_Amount0 == 0 && new_Amount1 == 0) {
          setTotalValueAfter(RiskRatioBefore);
        } else {
          setTotalValueAfter(RiskRatioAfter);
        }
      });
    }
  }, [Amount0, Amount1, info]);

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
  const ConfirmClick = () => {
    //////console.log(Amount0, Amount1)
    const strategyAddress = info.LPAddress.AddTwoStrategyAddr;
    const token0Address = Data.token0;
    const token1Address = Data.token1;
    const token0Amount = Amount0 ? Amount0.toString() : "0";
    const token1Amount = Amount1 ? Amount1.toString() : "0";
    const posId = Data.posid._hex;
    Replenishment(
      strategyAddress,
      token0Address,
      token1Address,
      token0Amount,
      token1Amount,
      posId,
      token0IsBNB,
      token1IsBNB
    ).then((res) => {
      if (res == true) {
        onClick()
        freshParent()
        setNotice(res);
        setNoticeText("Add Collateral succeed");
      } else {

        setNotice2(true);
        setNoticeText("Add Collateral fail");
      }
    });
  };
  return (
    <>
      <BG onClick={onClick} />
      <OutContainer>
        <Box>
          <TitleBox>
            <div>Add Collateral {LPAddress.LPtokenName}</div>
            <CloseBtn src={closeImg} onClick={onClick} />
          </TitleBox>
          <InpModular>
            <BalanceText>
              Balance:{" "}
              {Token0Balance !== 0.0 ? Number(Token0Balance).toFixed(6) : 0.0}{" "}
              {Token0Name}
            </BalanceText>
            <Inputs>
              <TokenIcon IconName={Token0Name} />
              <Input
                type="text"
                value={Amount0}
                placeholder="0.00"
                onChange={AmountChange0}
              ></Input>
              <CurrencyBox>{Token0Name}</CurrencyBox>
            </Inputs>
            <BtnBox>
              {RatioArrs.map((item, key) => (
                <Button key={key} w={120} h={40}
                  onClick={() => balance0Ratio(item)}
                  Select={Ratio0Select == (item.toString() + "0")}>
                  {item * 100}%
                </Button>
              ))}
            </BtnBox>
            <MBtnBox>
              {RatioArrs.map((item, key) => (
                <Button key={key} w={66} h={30}
                  onClick={() => balance0Ratio(item)}
                  Select={Ratio0Select == (item.toString() + "0")}>
                  {item * 100}%
                </Button>
              ))}
            </MBtnBox>
          </InpModular>
          <InpModular>
            <BalanceText>
              Balance:{" "}
              {Token1Balance !== 0.0 ? Number(Token1Balance).toFixed(6) : 0.0}{" "}
              {Token1Name}
            </BalanceText>
            <Inputs>
              <TokenIcon IconName={Token1Name} />
              <Input
                type="text"
                value={Amount1}
                placeholder="0.00"
                onChange={AmountChange1}
              ></Input>
              <CurrencyBox>{Token1Name}</CurrencyBox>
            </Inputs>
            <BtnBox>
              {RatioArrs.map((item, key) => (
                <Button key={key} w={120} h={40}
                  onClick={() => balance1Ratio(item)}
                  Select={Ratio1Select == (item.toString() + "1")}>
                  {item * 100}%
                </Button>
              ))}
            </BtnBox>
            <MBtnBox>
              {RatioArrs.map((item, key) => (
                <Button key={key} w={66} h={30}
                  onClick={() => balance1Ratio(item)}
                  Select={Ratio1Select == (item.toString() + "1")}>
                  {item * 100}%
                </Button>
              ))}
            </MBtnBox>
          </InpModular>
          <TexBox1>
            <div style={{ width: "50%" }}>Assets to be Added to Position</div>
            <div>
              {AddedtoPosition0 ? (
                <>{(AddedtoPosition0 / 1).toFixed(6)} {Token0Name}</>
              ) : (
                <>0.0 {Token0Name}</>
              )}{" "}
              +{" "}
              {AddedtoPosition1 ? (
                <>{(AddedtoPosition1 / 1).toFixed(6)} {Token1Name}</>
              ) : (
                <>0.0 {Token1Name}</>
              )}{" "}
            </div>
          </TexBox1>
          <TexBox2>
            <TexBox3>
              <div>Updated Assets in Position Value</div>
              <div style={{ textAlign: "end" }}>
                {AssetsPositionValue0 != undefined || AssetsPositionValue1 != undefined ?
                  <>
                    <span>{AssetsPositionValue0 ?
                      <>{(AssetsPositionValue0 / 1).toFixed(6)} {Token0Name}</>
                      :
                      <>0.0 {Token0Name}</>
                    }
                    </span>
                    {" "}+{" "}
                    <span>
                      {AssetsPositionValue1 ?
                        <>{(AssetsPositionValue1 / 1).toFixed(6)} {Token1Name}</>
                        :
                        <>0.0 {Token1Name}</>
                      }
                    </span>
                  </>
                  : <LoadingBox height={12} />}
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
          {ApproveBtn0 ? (
            <Button
              w={0}
              h={40}
              mt={40}
              disabled={ApprovdDisabled}
              onClick={ApprovedClick0}
            >
              Approved {Token0Name}
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
              Approved {Token1Name}
            </Button>
          ) : null}
          {FarmBtn ? (
            <Button w={0} h={40} disabled={FarmDisabled} onClick={ConfirmClick}>
              Confirm
            </Button>
          ) : null}
        </Box>
      </OutContainer>
    </>
  );
};

const OutContainer = styled.div`
    /* box-sizing: border-box; */
    margin: 0px auto;
    max-width: 600px;
    padding: 0px 24px;
    width: 100%;
    position: fixed;
    top: 50%;
    margin-top: -320px;
    z-index: 1001;
    animation: fade-in-top 0.6s;
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
  @media (max-width: 1000px) {
    padding: 0 20px;
    margin-left: -1rem;
  }
`
const Box = styled.div`
  width: 552px;
  background-color: rgb(25, 25, 31);
  padding: 30px;
  border-radius: 10px;
  @media (max-width: 1000px) {
    width: 100%;
    padding: 10px 10px 20px;
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
  @media (max-width: 1000px) {
    margin-top: 10px;
  }
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
  @media (max-width: 1000px) {
    display: none;
  }
`;
const MBtnBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  @media (min-width: 1000px) {
    display: none;
  }
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
  @media (max-width: 1000px) {
    font-size: 12px;
  }
`;
