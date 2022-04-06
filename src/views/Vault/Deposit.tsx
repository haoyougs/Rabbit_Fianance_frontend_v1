import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { BgBox } from "components/backgroundBox/background";
import { TokenIcon } from "components/icon/tokenIcon";
import { Button } from "components/button/button";
import "../index.css";
import { Deposit, Receive } from "hooks/useVault";
import { BANK_ADDRESS, BNB_ADDRESS } from "config/address";
import { ERC20, BankABI } from "config/ABI";
import store from "state";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Approveds, ApproveWay } from "utils/tokenApproved";
import { useWeb3React } from "@web3-react/core";
import { NoticeBox } from "components/notice";

/**
 * Deposit存款页面
 * @returns
 */
export const DepositBox: React.FC = () => {
  let Routes = useParams();
  const navigate = useNavigate();
  const TokenNames = Routes.id;
  const { account, library } = useWeb3React();

  const [Notice, setNotice] = useState(false);
  const [Notice2, setNotice2] = useState(false);
  const [NoticeText, setNoticeText] = useState("");
  //获取
  const ListData = useSelector(store.getState);
  // console.log(111, ListData);
  let data = ListData.VaultList.filter((el) => el.tokenName === TokenNames);
  // console.log(222, data)
  //拿到的数据
  let Data: any = {};
  data.map((item) => {
    Data = item;
  });
  const Store = useSelector(store.getState);
  console.log(444, Store.VaultList)
  // 可存的钱
  let Amounts = () => {
    if (TokenNames == 'BNB') {
      return ListData.VaultReducer.BNB.Balance;
    } else {
      return 1;
    }
  }

  /**
   * 返回上一级
   */
  const BackClick = () => {
    navigate("/");
  };
  //输入框输入的存款数量
  const [Amount, setAmount] = useState<any>();
  const [ReceiveVal, setReceiveVal] = useState("0");
  //输入框事件
  const AmountChange = (e: any) => {
    let { value } = e.target;
    const reg = /^-?\d*(\.\d*)?$/;
    if ((!isNaN(value) && reg.test(value)) || value === "") {
      if (value > Number(Amounts)) {
        value = Number(Amounts);
      }
      setAmount(value);
      if (value) {
        // 计息币ibBNB
        Receive(BANK_ADDRESS, BankABI, BNB_ADDRESS, value.toString()).then(
          (res) => {
            setReceiveVal(res);
          }
        );
      }
    }
  };
  // 存款
  const DepositClick = () => {
    if (Amount) {
      Deposit(BANK_ADDRESS, BankABI, BNB_ADDRESS, Amount.toString()).then(
        (res) => {
          if (res === true) {
            setAmount(Number);
            setNoticeText("存款成功");
            setNotice(true);
          } else {
            setNoticeText("存款失败");
            setNotice2(true);
          }
        }
      );
    }
  };
  /**
   * 最多可存入的币
   */


  const MaxClick = () => {
    setAmount(Amounts);
    // 计息币ibBNB
    Receive(BANK_ADDRESS, BankABI, BNB_ADDRESS, Amounts.toString()).then(
      (res) => {
        setReceiveVal(res);
      }
    );
  };

  //判断是否已授权
  const [BtnDisabled, setBtnDisabled] = useState(false);
  const [ApproveBtn, setApproveBtn] = useState(false);

  const TokenAddress = Data.tokenAddress;
  // 授权
  useEffect(() => {
    //BNB不需要授权
    if (TokenNames === "BNB") {
      setApproveBtn(true);
      return;
    }
    //TokenNames 当前币name TokenAddress 当前币的地址 ERC20 合约规范
    //account钱包地址
    Approveds(TokenNames, TokenAddress, ERC20, account).then((res) => {
      console.log("是否授权", res);
      if (res) {
        setApproveBtn(res as boolean);
      }
    });
  }, [TokenAddress]);
  const [ApproveBtn2, setApproveBtn2] = useState(false);
  //授权操作
  const OnApproveClick = () => {
    console.log(444)
    setBtnDisabled(true);
    //TokenNames 当前币name TokenAddress 当前币的地址 ERC20 合约规范
    //account钱包地址 library当前账户
    ApproveWay(TokenNames, TokenAddress, ERC20, account, library).then(
      (res) => {
        if (res) {
          setNoticeText("授权成功");
          setNotice(true);
          setApproveBtn(res as boolean);
          setApproveBtn2(res as boolean);
          setBtnDisabled(false);
        } else {
          setNotice2(true);
          setNoticeText("授权失败");
        }
      }
    );
  };
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
            Balance ： {Amounts} {TokenNames as string}
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
              {ReceiveVal} ib{TokenNames as string}
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
              disabled={!BtnDisabled}
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
              Approve USDT
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
