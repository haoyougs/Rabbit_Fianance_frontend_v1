import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { BgBox } from "components/backgroundBox/background";
import { TokenIcon } from "components/icon/tokenIcon";
import { Button } from "components/button/button";
import "../index.css";
import store from "state";
import { useSelector } from "react-redux";
import { BANK_ADDRESS, BNB_ADDRESS, ibBNB_ADDRESS, VAultListAddress } from "config/address";
import { ERC20, BankABI } from "config/ABI";
import { Receive, Withdraw } from "hooks/useVault";
import { Approveds, ApproveWay } from "utils/tokenApproved";
import { useWeb3React } from "@web3-react/core";
import { NoticeBox } from "components/notice";
import {
  getBNBTokneBalance,
  getIbTokenBalance,
  TokneBalanceS
} from "state/Vault/hooks";
import { UpdateNotice, UpdateNotice2, UpdateNoticeText } from "state/TypePage/hooks"
/**
 * withdraw 取款页面
 * @returns
 */
export const WithdrawBox: React.FC = () => {
  let Routes = useParams();
  const TokenNames = Routes.id
  const { account, library } = useWeb3React();
  const urlIndex = useLocation()?.search.replace("?", "");

  const setNotice = UpdateNotice();
  const setNotice2 = UpdateNotice2();
  const setNoticeText = UpdateNoticeText();
  //输入框输入的取款数量
  const [Pamount, setPamount] = useState<any>("");
  const [Balances, setBalances] = useState<any>("");
  const [IbBalances, setIbBalances] = useState<any>(0);
  const [IbRotio, setIbRotio] = useState<any>(0);
  //判断是否已授权
  const [BtnDisabled, setBtnDisabled] = useState(false);
  const [ApproveBtn, setApproveBtn] = useState(false);
  const [WithdrawBtn, setWithdrawBtn] = useState(false);

  //获取
  const [VAultListAddressInfo, setVAultListAddressInfo] = useState<any>({})
  useEffect(() => {
    setVAultListAddressInfo(VAultListAddress[Number(urlIndex)])
    console.log(VAultListAddressInfo)
  }, [urlIndex])
  const TOKEN_ADDRESS = TokenNames === "BNB" ?
    BNB_ADDRESS : VAultListAddressInfo?.tikenAddress;
  // 当前的tokenAddress
  const IB_TOKEN_ADDRESS = TokenNames === "BNB" ? BNB_ADDRESS : VAultListAddressInfo?.ibtokenAddress;
  useEffect(() => {
    if (TokenNames === "BNB") {
      if (!account) {
        return;
      }
      //library当前账户 account钱包地址
      // getBNBTokneBalance(library, account).then(res => {
      //   console.log("aaa", res);
      //   setBalances(res);
      // });
      //Address当前钱包地址 Abi: ERC20 合约规范 library当前账户
      //TokenAddress: ibBNB_ADDRESS, ibbnb地址
      getIbTokenBalance(
        account,
        ERC20,
        library,
        ibBNB_ADDRESS,
      ).then(res => {
        console.log("bbb", res);
        setIbBalances(res);
      });
    } else {
      if (library && VAultListAddressInfo?.tikenAddress) {
        // console.log(item)
        // TokneBalanceS(
        //   account,
        //   ERC20,
        //   library,
        //   VAultListAddressInfo?.tikenAddress,
        // ).then(res => {
        //   console.log("aaa", res);
        //   setBalances(res);
        // })
        getIbTokenBalance(
          account,
          ERC20,
          library,
          VAultListAddressInfo?.ibtokenAddress,
        ).then(res => {
          console.log("bbb", res);
          setIbBalances(res);
        });
      }
    }
    if (!TOKEN_ADDRESS) {
      return;
    }
    Receive(BANK_ADDRESS, BankABI, TOKEN_ADDRESS, '1').then(
      (res) => {
        console.log(res)
        setIbRotio(res);
      }
    );
  }, [account, library, VAultListAddressInfo])

  //判断是否已授权
  // 授权
  useEffect(() => {
    //BNB不需要授权
    if (TokenNames === "BNB") {
      setApproveBtn(true);
      return;
    }
    setBtnDisabled(true);
    //TokenNames 当前币name TokenAddress 当前币的地址 ERC20 合约规范
    //account钱包地址
    if (!TOKEN_ADDRESS || !account) {
      return;
    }
    const ApprovedAddress = IB_TOKEN_ADDRESS;
    Approveds(TokenNames, account, ERC20, TOKEN_ADDRESS, library, ApprovedAddress).then((res) => {
      setBtnDisabled(false);
      console.log("是否授权", res);
      if (res) {
        // setBtnDisabled(res as boolean)
        setApproveBtn(res as boolean);
      }
    });
  }, [TOKEN_ADDRESS, account]);
  //授权操作
  const OnApproveClick = () => {
    setBtnDisabled(true);
    //TokenNames 当前币name TokenAddress 当前币的地址 ERC20 合约规范
    //account钱包地址 library当前账户
    const ApprovedAddress = IB_TOKEN_ADDRESS;
    ApproveWay(TokenNames, TOKEN_ADDRESS, ERC20, account, library, ApprovedAddress).then(
      (res) => {
        setBtnDisabled(false);
        if (res) {
          setNoticeText("Approve succeed");
          setNotice(true);
          setApproveBtn(res as boolean);
          // setApproveBtn2(res as boolean);
        } else {
          setNotice2(true);
          setNoticeText("Approve fail");
        }
      }
    );
  };
  const navigate = useNavigate();
  /**
   * 返回上一级
   */
  const BackClick = () => {
    navigate("/");
  };
  //输入框事件
  const AmountChange = (e: any) => {
    let { value } = e.target;
    const reg = /^-?\d*(\.\d*)?$/;
    if ((!isNaN(value) && reg.test(value)) || value === "") {
      if (value > IbBalances) {
        value = parseFloat(IbBalances).toFixed(6);;
      }
      setPamount(value);
    }
    const BNBValue = (value * IbRotio).toFixed(6);
    setBalances(BNBValue);
  };
  // 最多可取出的币
  const MaxClick = () => {
    if (0 >= Number(IbBalances)) {
      return;
    }
    const Value = (parseFloat(IbBalances) * IbRotio).toFixed(6);
    setBalances(Value);
    setPamount(parseFloat(IbBalances).toFixed(6));
  };
  useEffect(() => {
    if (Pamount > 0) {
      setWithdrawBtn(true);
    } else {
      setWithdrawBtn(false);
      setBalances(0);
    }
  }, [Pamount])
  /**
   * 提现操作
   */
  const WithdrawCilck = () => {
    if (!!Balances) {
      setBtnDisabled(true);
      Withdraw(BANK_ADDRESS, BankABI, TOKEN_ADDRESS,
        parseFloat(Balances).toFixed(6).toString()).then((res) => {
          if (res === true) {
            setNoticeText("Withdraw succeed");
            setNotice(true);
            setBtnDisabled(false);
          } else {
            setNotice2(true);
            setNoticeText("Withdraw fail");
            setBtnDisabled(false);
          }
        });
    } else {
      setNoticeText("Balances not empty");
      setNotice2(true);
    }
  };
  return (
    <>
      <Box className="textAnimation2">
        <LBox>
          <IconBox>
            <TokenIcon IconName={'ib' + TokenNames} />
            <NameSize>ib{TokenNames}</NameSize>
          </IconBox>
          <IconBox>
            <Tips1>1</Tips1>
            withdraw Tokens
          </IconBox>
          <BtnBox>
            <Button w={100} h={40} onClick={BackClick}>
              BACK
            </Button>
          </BtnBox>
        </LBox>
        <RBox>
          <Title>I’d like to withdraw</Title>
          <BalanceBox>Balance ：{parseFloat(IbBalances).toFixed(6)} {'ib' + TokenNames}</BalanceBox>
          <InpBox>
            <TokenIcon IconName={'ib' + TokenNames} />
            <Input
              type="text"
              value={Pamount}
              placeholder="0.00"
              onChange={AmountChange}
            ></Input>
            <Button w={60} h={26} onClick={MaxClick}>
              MAX
            </Button>
          </InpBox>
          <ReceiveBox>
            You will receive ：
            <Values>
              {Balances ? parseFloat(Balances).toFixed(6) : "0.00"} {TokenNames}
            </Values>
          </ReceiveBox>
          {/* <Button w={0} h={40} mt={110}>
          Approve USDT
        </Button> */}
          {ApproveBtn ? (
            <Button
              w={0} h={40}
              mt={110}
              disabled={WithdrawBtn}
              onClick={WithdrawCilck}>
              Withdraw
            </Button>
          ) : (
            // 授权
            <Button
              w={0}
              h={40}
              mt={60}
              disabled={!BtnDisabled}
              onClick={OnApproveClick}
            >
              Approve {TokenNames}
            </Button>
          )}
        </RBox>
      </Box>
    </>
  );
};

const Box = styled(BgBox)`
  margin: 0 auto;
  width: 100%;
  max-width: 900px;
  height: 380px;
  display: flex;
  overflow: hidden;
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
