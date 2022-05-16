import React, { useEffect, useState, useCallback, useLayoutEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { BgBox } from "components/backgroundBox/background";
import { TokenIcon } from "components/icon/tokenIcon";
import { Button } from "components/button/button";
import "../index.css";
import store from "state";
import { useSelector } from "react-redux";
import { ERC20 } from "config/ABI";
import {
  FAIR_LAUNCH_ADDRESS, ibBNB_FAIRLAUNCH_PID,
  ibBNB_ADDRESS
} from "config/address";
import { DepositAmount } from "hooks/useStake";
import { useWeb3React } from "@web3-react/core";
import { Withdrawal } from "hooks/useStake";
import { ibTokneData } from "hooks/useStake";
import { Approveds, ApproveWay } from "utils/tokenApproved";
import { NoticeBox } from "components/notice";
import { UpdateNotice, UpdateNotice2, UpdateNoticeText } from "state/TypePage/hooks"
import { subStringNum } from "utils/subStringNum"

/**
 *  Unstake 解质押 提现
 * @returns
 */
type RoutesType = string | undefined;

export const Unstake: React.FC = () => {
  let location = useLocation();
  const navigate = useNavigate();
  let Routes = useParams();
  const TokenNames: RoutesType = Routes.id;
  const { account, library } = useWeb3React();
  const [UnBalance, setUnBalance] = useState<any>();
  //按钮状态
  const [ApproveBtn, setApproveBtn] = useState(false);
  const [BtnDisabled, setBtnDisabled] = useState(false);
  const [UnStakeBtn, setUnStakeBtn] = useState(false);
  const [Amount, setAmount] = useState<any>(0);
  const setNotice = UpdateNotice();
  const setNotice2 = UpdateNotice2();
  const setNoticeText = UpdateNoticeText();
  const [Pid, setPid] = useState<number | string>();

  const current_pid = ibTokneData.filter((item) => item.tokenName === TokenNames)[0].pid;
  const current_ibtokenAddress = ibTokneData.filter((item) => item.tokenName === TokenNames)[0].ibTokneAddress;
  const ibTokenAddress = TokenNames === "ibBNB" ? ibBNB_ADDRESS :
    current_ibtokenAddress;
  useEffect(() => {
    window.addEventListener("beforeunload", () => {
      // //////console.log
    })
  }, [])
  /**
   * 返回上一级
   */
  const BackClick = () => {
    navigate("/stake");
  };
  useEffect(() => {
    if (TokenNames === "ibBNB") {
      setPid(ibBNB_FAIRLAUNCH_PID);
    } else {
      setPid(current_pid);
    }
  }, [Pid, account]);
  //获取Amounts
  const getAmount = useCallback(() => {
    if (Pid == undefined) {
      return
    }
    if (!account) {
      return;
    }
    DepositAmount(Pid, account, FAIR_LAUNCH_ADDRESS).then(
      (res) => {
        //////console.log(res);
        const value = subStringNum(res, 6)
        setUnBalance(value);
      }
    );
  }, [Pid, account])
  //获取Amounts
  useEffect(getAmount, [getAmount]);
  //输入Amounts
  const AmountChange = (e: any) => {
    let { value } = e.target;
    const reg = /^-?\d*(\.\d*)?$/;
    if ((!isNaN(value) && reg.test(value)) || value === "") {
      if (value > UnBalance) {
        // value = UnBalance;
        value = subStringNum(UnBalance, 6);
      }
      setAmount(value);
    }
  };
  const MaxClick = () => {
    if (0 >= Number(UnBalance)) {
      return;
    }
    // setAmount(UnBalance);
    setAmount(subStringNum(UnBalance, 6));
  };
  useEffect(() => {
    if (Amount) {
      setUnStakeBtn(true);
    } else {
      setUnStakeBtn(false)
    }
  }, [Amount])
  // 授权
  useEffect(() => {
    setApproveBtn(true)
    return;
    if (!account) {
      return;
    }
    setBtnDisabled(true);
    //TokenNames 当前币name ibTokenAddress 当前币的ib地址 ERC20 合约规范
    //account钱包地址
    // //////console.log(333, ibTokenAddress)
    const ApprovedAddress = ibTokenAddress;
    Approveds(
      TokenNames,
      account,
      ERC20,
      ibTokenAddress,
      library,
      "0x5ABd28694EDBD546247C2547738076a128cA1157"
      // ApprovedAddress
    ).then((res) => {
      setBtnDisabled(false);
      console.log("是否授权", res);
      if (res) {
        setApproveBtn(res as boolean);
      }
    });
  }, [ibTokenAddress, account]);
  //授权操作
  const OnApproveClick = () => {
    setBtnDisabled(true);
    //TokenNames 当前币name ibTokenAddress 当前币的ib地址 ERC20 合约规范
    //account钱包地址 library当前账户
    const ApprovedAddress = ibTokenAddress;
    ApproveWay(
      TokenNames,
      ibTokenAddress,
      ERC20,
      account,
      library,
      "0x5ABd28694EDBD546247C2547738076a128cA1157"
      // ApprovedAddress
    ).then(
      (res) => {
        setBtnDisabled(false);
        if (res) {
          setNoticeText("Approve succeed");
          setNotice(true);
          setApproveBtn(res as boolean);
        } else {
          setNotice2(true);
          setNoticeText("Approve fail");
        }
      }
    );
  };
  //解除质押
  const UnStakeClick = () => {
    Withdrawal(account, Pid, Amount, FAIR_LAUNCH_ADDRESS).then((res) => {
      if (res == true) {
        setNoticeText("UnStake succeed");
        setNotice(true);
      } else {
        setNotice2(true);
        setNoticeText("UnStake fail");
      }
    });
  };
  return (
    <>
      <Box className="textAnimation2">
        <LBox>
          <IconBox>
            <TokenIcon IconName={`${TokenNames}`} />
            <NameSize>{TokenNames}</NameSize>
          </IconBox>
          <LBoxTtxt>
            <Tips1>1</Tips1>
            Unstake Tokens
          </LBoxTtxt>
          <BtnBox>
            <Button w={100} h={40} onClick={BackClick}>
              BACK
            </Button>
          </BtnBox>
        </LBox>
        <RBox>
          <Title>I’d like to unstake</Title>
          <BalanceBox>Balance ：{UnBalance} {TokenNames}</BalanceBox>
          <InpBox>
            <TokenIcon IconName={`${TokenNames}`} />
            <Input
              type="text"
              value={Amount}
              placeholder="0.00"
              onChange={AmountChange}
            ></Input>
            <Button w={70} h={26} onClick={MaxClick}>
              MAX
            </Button>
          </InpBox>
          {ApproveBtn ? (
            <Button w={0} h={40} mt={145} disabled={UnStakeBtn}
              onClick={UnStakeClick}>
              UnStake
            </Button>
          ) : (
            // 授权
            <Button w={0} h={40} mt={60}
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
  @media (max-width: 1000px) {
    flex-direction: column;
    height: auto;
  }
`;
const LBox = styled.div`
  flex: 1;
  background: rgba(25, 25, 31, 0.6);
  padding: 25px;
  @media (max-width: 1000px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;
const RBox = styled.div`
  flex: 2;
  padding: 25px;
  @media (max-width: 1000px) {
    padding: 10px;
  }
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
  @media (max-width: 1000px) {
    margin-bottom: 0px;
  }
`;
const LBoxTtxt = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 40px;
    color: #fff;
    @media (max-width: 1000px) {
        display: none;
      }
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
