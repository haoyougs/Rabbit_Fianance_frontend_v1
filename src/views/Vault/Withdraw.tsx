import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { BgBox } from "components/backgroundBox/background";
import { TokenIcon } from "components/icon/tokenIcon";
import { Button } from "components/button/button";
import "../index.css";
import store from "state";
import { useSelector } from "react-redux";
import { BANK_ADDRESS, BNB_ADDRESS } from "config/address";
import { BankABI } from "config/ABI";
import { Withdraw } from "hooks/useVault";
import { useParams } from "react-router-dom";

/**
 * withdraw 取款页面
 * @returns
 */
export const WithdrawBox: React.FC = () => {
  let Routes = useParams();
  const TokenNames = Routes.id
  
   
  const Data = useSelector(store.getState);
  //输入框输入的取款数量
  const [Pamount, setPamount] = useState<any>();
  const [GetBNB, setGetBNB] = useState<any>(0);
  //输入框事件
  let ibBalances = Data.VaultReducer.BNB.ibBalance;
  const AmountChange = (e: any) => {
    let { value } = e.target;
    const reg = /^-?\d*(\.\d*)?$/;
    if ((!isNaN(value) && reg.test(value)) || value === "") {
      if (value > ibBalances) {
        value = ibBalances;
      }
      setPamount(value);
    }
    const BNBValue = (value * (1 / 0.9996)).toFixed(18);
    setGetBNB(BNBValue);
  };
  const navigate = useNavigate();
  /**
   * 返回上一级
   */
  const BackClick = () => {
    navigate("/");
  };
  /**
   * 最多可取出的币
   */

  const MaxClick = () => {
    const Value = (ibBalances * (1 / 0.9996)).toFixed(18);
    setGetBNB(Value);
    setPamount(ibBalances);
  };
  /**
   * 提现操作
   */
  const WithdrawCilck = () => {
    Withdraw(BANK_ADDRESS, BankABI, BNB_ADDRESS, GetBNB.toString()).then((res)=>{
      if(res === true){
        alert('取出成功')
      }else{
        alert('取出失败')
      }
    });
  };
  return (
    <Box className="textAnimation2">
      <LBox>
        <IconBox>
          <TokenIcon IconName={'ib'+TokenNames as string} />
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
        <BalanceBox>Balance ：{(ibBalances / 1).toFixed(8)} {'ib'+TokenNames}</BalanceBox>
        <InpBox>
          <TokenIcon IconName={'ib'+TokenNames as string} />
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
            {GetBNB} {'ib'+TokenNames}
          </Values>
        </ReceiveBox>
        {/* <Button w={0} h={40} mt={110}>
          Approve USDT
        </Button> */}
        <Button w={0} h={40} mt={110} onClick={WithdrawCilck}>
          Withdraw
        </Button>
      </RBox>
    </Box>
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
