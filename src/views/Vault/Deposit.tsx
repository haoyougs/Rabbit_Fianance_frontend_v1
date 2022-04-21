import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { BgBox } from "components/backgroundBox/background";
import { TokenIcon } from "components/icon/tokenIcon";
import { Button } from "components/button/button";
import "../index.css";
import { Deposit, Receive } from "hooks/useVault";
import { BANK_ADDRESS, BNB_ADDRESS, ibBNB_ADDRESS, VAultListAddress, BUSD_ADDRESS } from "config/address";
import { ERC20, BankABI } from "config/ABI";
import store from "state";
import { useSelector } from "react-redux";
import { Approveds, ApproveWay } from "utils/tokenApproved";
import { useWeb3React } from "@web3-react/core";
import { NoticeBox } from "components/notice";
import { UpdateNotice, UpdateNotice2, UpdateNoticeText } from "state/TypePage/hooks"
import {
  getBNBTokneBalance,
  getIbTokenBalance,
  TokneBalanceS
} from "state/Vault/hooks";
/**
 * Deposit存款页面
 * @returns
 */
export const DepositBox: React.FC = () => {
  let Routes = useParams();
  const navigate = useNavigate();
  const TokenNames = Routes.id;
  const urlIndex = useLocation()?.search.replace("?", "");
  const setNotice = UpdateNotice();
  const setNotice2 = UpdateNotice2();
  const setNoticeText = UpdateNoticeText();
  const { account, library } = useWeb3React();
  //判断是否已授权
  const [BtnDisabled, setBtnDisabled] = useState(false);
  const [ApproveBtn, setApproveBtn] = useState(false);
  const [DepositBtn, setDepositBtn] = useState(false);
  //原始数据
  const [Amounts, setAmounts] = useState<any>(0);
  const [ReceiveVal, setReceiveVal] = useState<any>(0);
  //输入框输入的存款数量
  const [Amount, setAmount] = useState<any>("");
  const [VAultListAddressInfo, setVAultListAddressInfo] = useState<any>({})
  useEffect(() => {
    setVAultListAddressInfo(VAultListAddress[Number(urlIndex)])
  }, [urlIndex])
  // console.log("VAultListAddressInfo", VAultListAddressInfo)
  //获取币的数量
  useEffect(() => {
    if (TokenNames === "BNB") {
      if (!account) {
        return;
      }
      //library当前账户 account钱包地址
      getBNBTokneBalance(library, account).then(res => {
        console.log("aaa", res);
        setAmounts(res);
      });
    } else {
      if (library && VAultListAddressInfo?.tikenAddress) {
        TokneBalanceS(
          account,
          ERC20,
          library,
          VAultListAddressInfo?.tikenAddress,
        ).then(res => {
          setAmounts(res);
        })
      }
    }
  }, [account, library, VAultListAddressInfo])
  /**
   * 返回上一级
   */
  const BackClick = () => {
    navigate("/");
  };
  // 当前的tokenAddress
  const TOKEN_ADDRESS = TokenNames === "BNB" ? BNB_ADDRESS : VAultListAddressInfo?.tikenAddress;
  // 当前的tokenAddress
  const IB_TOKEN_ADDRESS = TokenNames === "BNB" ? BNB_ADDRESS : VAultListAddressInfo?.ibtokenAddress;
  // 授权
  useEffect(() => {
    //BNB不需要授权
    if (TokenNames === "BNB") {
      setApproveBtn(true);
      return;
    }
    setBtnDisabled(true);
    //TokenNames 当前币name TOKEN_ADDRESS 当前币的地址 ERC20 合约规范
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
  // const [ApproveBtn2, setApproveBtn2] = useState(false);
  //授权操作
  const OnApproveClick = () => {
    setBtnDisabled(true);
    //TokenNames 当前币name TOKEN_ADDRESS 当前币的地址 ERC20 合约规范
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
  //输入框事件
  const AmountChange = (e: any) => {
    let { value } = e.target;
    const reg = /^-?\d*(\.\d*)?$/;
    if ((!isNaN(value) && reg.test(value)) || value === "") {
      if (value > Number(Amounts)) {
        value = parseFloat(Amounts).toFixed(6);
      }
      setAmount(value);
      if (value) {
        // 计息币ibBNB
        Receive(BANK_ADDRESS, BankABI, TOKEN_ADDRESS, value.toString()).then(
          (res) => {
            setReceiveVal(res);
          }
        );
      }
    }
  };
  useEffect(() => {
    if (Amount > 0) {
      setDepositBtn(true);
    } else {
      setDepositBtn(false);
      setReceiveVal(0);
    }
  }, [Amount])
  /**
   * 最多可存入的币
   */
  const MaxClick = () => {

    if (0 >= Number(Amounts)) {
      return;
    }
    setAmount(parseFloat(Amounts).toFixed(6));
    if (!TOKEN_ADDRESS) {
      return;
    }
    // 计息币ibBNB
    Receive(BANK_ADDRESS, BankABI, TOKEN_ADDRESS, Amounts.toString()).then(
      (res) => {
        console.log(res)
        setReceiveVal(res);
      }
    );
  };

  // 存款
  const DepositClick = () => {
    if (Amount) {
      setBtnDisabled(true);
      Deposit(BANK_ADDRESS, BankABI, TOKEN_ADDRESS, Amount.toString(), TokenNames).then(
        (res) => {
          console.log(res);
          if (res === true) {
            setAmount(Number);
            setNoticeText("Deposit Approve");
            setNotice(true);
            setBtnDisabled(false);
          } else {
            setNoticeText("Deposit fail");
            setNotice2(true);
            setBtnDisabled(false);
          }
        }
      );
    } else {
      setNoticeText("Amount not empty");
      setNotice2(true);
    }
  };
  return (
    <>
      {/* {Notice ? (
        <div onClick={() => setNotice(false)}>
          <NoticeBox>{NoticeText} </NoticeBox>
        </div>
      ) : null}
      {Notice2 ? (
        <div onClick={() => setNotice2(false)}>
          <NoticeBox Shou={!Notice2}>{NoticeText}</NoticeBox>
        </div>
      ) : null} */}

      <Box className="textAnimation2">
        <LBox>
          <IconBox>
            <TokenIcon IconName={TokenNames as string} />
            <NameSize>{TokenNames}</NameSize>
          </IconBox>
          <IconBox>
            <Tips1>1</Tips1>
            deposit Tokens
          </IconBox>
          <BtnBox>
            <Button w={100} h={40} onClick={BackClick}>
              BACK
            </Button>
          </BtnBox>
        </LBox>
        <RBox>
          <Title>I’d like to deposit</Title>
          <BalanceBox>
            Balance ： {parseFloat(Amounts).toFixed(6)} {TokenNames as string}
          </BalanceBox>
          <InpBox>
            <TokenIcon IconName={TokenNames as string} />
            <Input
              type="text"
              value={Amount}
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
              {!ReceiveVal ? "0.00" : parseFloat(ReceiveVal).toFixed(6)} ib{TokenNames as string}
            </Values>
          </ReceiveBox>
          <TipsBox>
            Notice: remember to stake ibToken on 'Stake' page to get RABBIT
            staking reward
          </TipsBox>
          {ApproveBtn ? (
            // 存款
            <Button
              w={0}
              h={40}
              mt={60}
              disabled={DepositBtn}
              onClick={DepositClick}
            >
              Deposit
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
