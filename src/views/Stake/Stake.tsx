import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { BgBox } from "components/backgroundBox/background";
import { TokenIcon } from "components/icon/tokenIcon";
import { Button } from "components/button/button";
import "../index.css";
import store from "state";
import { useSelector } from "react-redux";
import { Pledge } from "hooks/useStake";
import { useWeb3React } from "@web3-react/core";
import { FAIR_LAUNCH_ADDRESS, ibBNB_FAIRLAUNCH_PID } from "config/address";
/**
 * withdraw 存款页面
 * @returns
 */
export const Stake: React.FC = () => {
  let location = useLocation();
  console.log(location.state);
  let Data = useSelector(store.getState);
  let ibBalance = Data.VaultReducer.BNB.ibBalance;
  const navigate = useNavigate();
  const { account } = useWeb3React();
  /**
   * 返回上一级
   */
  const BackClick = () => {
    navigate("/stake");
  };
  const [Amount, setAmount] = useState<any>();
  const [ReceiveVal, setReceiveVal] = useState<any>();
  const AmountChange = (e: any) => {
    let { value } = e.target;
    const reg = /^-?\d*(\.\d*)?$/;
    if ((!isNaN(value) && reg.test(value)) || value === "") {
      if (value > ibBalance) {
        value = ibBalance;
      }
      setAmount(value);
    }
  };
  const MaxClick = () => {
    setAmount(ibBalance);
  };
  const StateClick = () => {
    Pledge(account, ibBNB_FAIRLAUNCH_PID, Amount, FAIR_LAUNCH_ADDRESS).then((res) => {
      if (res === true) {
        alert('质押成功')
      }
    });
  };
  return (
    <Box className="textAnimation2">
      <LBox>
        <IconBox>
          <TokenIcon IconName={"ibBNB"} />
          <NameSize>ibBNB</NameSize>
        </IconBox>
        <IconBox>
          <Tips1>1</Tips1>
          Stake Tokens
        </IconBox>
        <BtnBox>
          <Button w={100} h={40} onClick={BackClick}>
            BACK
          </Button>
        </BtnBox>
      </LBox>
      <RBox>
        <Title>I’d like to stake</Title>
        <BalanceBox>
          Balance ：{ibBalance} {"ibBNB"}
        </BalanceBox>
        <InpBox>
          <TokenIcon IconName={"ibBNB"} />
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

        <Button w={0} h={40} mt={145} onClick={StateClick}>
          Stake
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
