import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { BgBox } from "components/backgroundBox/background";
import { TokenIcon } from "components/icon/tokenIcon";
import { Button } from "components/button/button";
import "../index.css";
import store from "state";
import { ERC20 } from "config/ABI";
import { useSelector } from "react-redux";
import { Pledge } from "hooks/useStake";
import { useWeb3React } from "@web3-react/core";
import {
  FAIR_LAUNCH_ADDRESS, ibBNB_FAIRLAUNCH_PID,
  ibBNB_ADDRESS, VAultListAddress
} from "config/address";
import { Approveds, ApproveWay } from "utils/tokenApproved";
import { NoticeBox } from "components/notice";
import { ibTokneData } from "hooks/useStake";
import {
  getIbTokenBalance,
} from "state/Vault/hooks";
import { UpdateNotice, UpdateNotice2, UpdateNoticeText } from "state/TypePage/hooks"
/**
 * withdraw 存款页面
 * @returns
 */
export const Stake: React.FC = () => {
  let Routes = useParams();
  const TokenNames = Routes.id;
  const urlIndex = useLocation()?.search.replace("?", "");
  const { account, library } = useWeb3React();
  const navigate = useNavigate();
  const [IbBalances, setIbBalances] = useState<any>(0);
  const setNotice = UpdateNotice();
  const setNotice2 = UpdateNotice2();
  const setNoticeText = UpdateNoticeText();
  const [Pid, setPid] = useState<number | string>("");
  const [Amount, setAmount] = useState<any>("");
  //按钮状态
  const [ApproveBtn, setApproveBtn] = useState(false);
  const [BtnDisabled, setBtnDisabled] = useState(false);
  const [StakeBtn, setStakeBtn] = useState(false);

  const current_pid = ibTokneData.filter((item) => item.tokenName === TokenNames)[0].pid;
  const current_ibtokenAddress = ibTokneData.filter((item) => item.tokenName === TokenNames)[0].ibTokneAddress;
  //地址 取ib的
  const ibTokenAddress = TokenNames === "ibBNB" ? ibBNB_ADDRESS :
    current_ibtokenAddress;
  //拿到ibBalance
  useEffect(() => {
    if (!account) {
      return;
    }
    if (TokenNames === "ibBNB") {
      getIbTokenBalance(
        account,
        ERC20,
        library,
        ibBNB_ADDRESS,
      ).then(res => {
        console.log("aaa", res);
        setIbBalances(res);
      });
      setPid(ibBNB_FAIRLAUNCH_PID);
    } else {
      getIbTokenBalance(
        account,
        ERC20,
        library,
        current_ibtokenAddress,
      ).then(res => {
        console.log("bbb", res);
        setIbBalances(res);
      });
      setPid(current_pid);
    }
  }, [TokenNames, account]);
  /**
   * 返回上一级
   */
  const BackClick = () => {
    navigate("/stake");
  };

  // 授权
  useEffect(() => {
    if (!account) {
      return;
    }
    setBtnDisabled(true);
    //TokenNames 当前币name ibTokenAddress 当前币的ib地址 ERC20 合约规范
    //account钱包地址
    // console.log(333, ibTokenAddress);
    const ApprovedAddress = ibTokenAddress;
    Approveds(TokenNames, account, ERC20, ibTokenAddress, library, ApprovedAddress).then((res) => {
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
    ApproveWay(TokenNames, ibTokenAddress, ERC20, account, library, ApprovedAddress).then(
      (res) => {
        setBtnDisabled(false); setNotice2(true);
        // setNoticeText("授权失败");
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
  const AmountChange = (e: any) => {
    let { value } = e.target;
    const reg = /^-?\d*(\.\d*)?$/;
    if ((!isNaN(value) && reg.test(value)) || value === "") {
      if (value > IbBalances) {
        value = parseFloat(IbBalances).toFixed(6);
      }
      setAmount(value);
    }
  };
  const MaxClick = () => {
    if (0 >= Number(IbBalances)) {
      return;
    }
    setAmount(parseFloat(IbBalances).toFixed(6));
  };
  useEffect(() => {
    if (Amount) {
      setStakeBtn(true);
    } else {
      setStakeBtn(false)
    }
  }, [Amount])
  const StateClick = () => {
    setBtnDisabled(true);
    // account 钱包地址
    // PID 质押池子的id
    // Amount 质押数量
    // LAUNCH_ADDRESS 计息币挖矿地址
    if (Amount) {
      Pledge(account, Pid.toString(), Amount.toString(), FAIR_LAUNCH_ADDRESS).then((res) => {
        setBtnDisabled(false);
        if (res === true) {
          setNoticeText("State succeed");
          setNotice(true);
        } else {
          setNoticeText("State fail");
          setNotice2(true);
        }
      });
    } else {
      setNoticeText("Amount not empty");
      setNotice2(true);
    }
  };
  return (
    <>
      <Box className="textAnimation2">
        <LBox>
          <IconBox>
            <TokenIcon IconName={`${TokenNames}`} />
            <NameSize>{TokenNames}</NameSize>
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
            Balance ：{parseFloat(IbBalances).toFixed(6)} {TokenNames}
          </BalanceBox>
          <InpBox>
            <TokenIcon IconName={`${TokenNames}`} />
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
          {ApproveBtn ? (
            <Button w={0} h={40} mt={145}
              disabled={StakeBtn}
              onClick={StateClick}>
              Stake
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
