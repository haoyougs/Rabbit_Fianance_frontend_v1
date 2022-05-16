import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import APYClose from "assets/page/APYClose.png"
import {
    getFarmsAPR,
    getTradeFree,
    getRabbitRewards,
    getBorrowApr
} from "hooks/useFarms";
import { Button } from "components/button/button";
import { FarmAddressArrs } from "config/LPAddress";
import { useWeb3React } from "@web3-react/core";
import { BNB_ADDRESS } from "config/address";
import { LoadingBox } from "components/Loading";
import store from "state";
import { useSelector } from "react-redux";
import { UpdateTvlAPY } from "state/AllFarm/hooks";
import { subStringNum } from "utils/subStringNum";
import { getApy } from "utils/ApyCommon";
import { borrowAprCommon } from "utils/BorrowApr";
import {
    getMdexTradeFree,
    getPancakeTradeFree
} from "hooks/useFarms";
import { setTimeout } from "timers/promises";
/*
 * Vault页面里的数据展示表格
 * @returns
 */
type RoutesType = string | undefined;

export const FarmApyContainer: React.FC<{ data?: any, onclick: any }> = ({ data, onclick }) => {
    const UpdateAPY = UpdateTvlAPY();
    // console.log(123, data);
    const { account } = useWeb3React();
    const TokenIndex: RoutesType = data.index;
    const TokenNames: RoutesType = data.New_LPtokenName || data.LPtokenName;
    //当前币种的info
    const [CurrentTokenInfo, setCurrentTokenInfo] = useState<any>({});
    const [Token0Pid, setToken0Pid] = useState<any>();
    const [Token1Pid, setToken1Pid] = useState<any>();
    //币种切换
    const [LoanSwitch0, setLoanSwitch0] = useState<boolean>(false);
    const [LoanSwitch1, setLoanSwitch1] = useState<boolean>(false);
    const [CurrenName, setCurrenName] = useState<any>();
    const [Leverage, setLeverage] = useState<any>(null);

    const [Farm_Apr, setFarm_Apr] = useState<any>(null);
    const [Trading_Free, setTrading_Free] = useState<any>(null);
    const [RABBIT_Rewards, setRABBIT_Rewards] = useState<any>(null);
    const [Borrow_Apr, setBorrow_Apr] = useState<any>(null);
    const [Total_Apr, setTotal_Apr] = useState<any>(null);
    const [Daily_Apr, setDaily_Apr] = useState<any>(null);

    const gatCurrentToken = () => {
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
        };
        setLeverage(data.Leverage)
        // console.log("CurrentToken", CurrentToken);
        setCurrentTokenInfo(CurrentToken);

        const Farm_Apr = data.APY.Farm_Apr;
        const Trading_Free = data.APY.Trading_Free;
        const RABBIT_Rewards = data.APY.RABBIT_Rewards;
        const Borrow_Apr = data.APY.Borrow_Apr;
        setFarm_Apr(Farm_Apr);
        setTrading_Free(Trading_Free);
        setRABBIT_Rewards(RABBIT_Rewards);
        setBorrow_Apr(Borrow_Apr);

    }

    useEffect(() => {
        gatCurrentToken();
    }, [account]);

    const FarmsAPR = async () => {
        // console.log(123, Farm_Apr)
        if (Farm_Apr != null) {
            return;
        }
        const Tid = CurrentTokenInfo.Tid;
        const Type = CurrentTokenInfo.Type;
        const LPaddress = CurrentTokenInfo.LP;
        const res = await getFarmsAPR(Type, Tid, LPaddress, CurrentTokenInfo.LPtokenAddress0);
        setFarm_Apr(res)
    }
    const TradingFees = async () => {
        if (Trading_Free != null) {
            return;
        }
        const MdexTradeFree = await getMdexTradeFree();
        const PancakeTradeFree = await getPancakeTradeFree();
        const Type = CurrentTokenInfo.Type;
        const LPaddress = CurrentTokenInfo.LP;
        const res = await getTradeFree(Type, LPaddress, MdexTradeFree, PancakeTradeFree);
        setTrading_Free(res)
    }
    const RabbitRewards = async () => {
        if (RABBIT_Rewards != null) {
            return;
        }
        const FairLaunch_Pid = CurrentTokenInfo.FairLaunch_Pid;
        const res = await getRabbitRewards(FairLaunch_Pid);
        ////console.log("rabbit年化收益率", res, data.TVL);
        const Rewards = data.TVL == 0 ? 0 : (res.apr / data.TVL);
        setRABBIT_Rewards(Rewards)
    }
    const BorrowApr = async (AddressApr: any) => {
        const Borrow = await getBorrowApr(AddressApr);
        const borrowApr = borrowAprCommon(Borrow.BorrowedValue, Borrow.DepositValue);
        setBorrow_Apr(borrowApr)
    }
    useEffect(() => {
        if (!account) {
            return;
        }

    }, [account]);
    useEffect(() => {
        setLeverage(data.Leverage)
    }, [data.Leverage])
    useEffect(() => {
        if (Farm_Apr != null &&
            Trading_Free != null &&
            RABBIT_Rewards != null &&
            Borrow_Apr != null) {
            const APY = getApy(Farm_Apr, Trading_Free, RABBIT_Rewards, Borrow_Apr, Leverage);
            UpdateAPY({
                index: data.index,
                APY: { Farm_Apr, Trading_Free, RABBIT_Rewards, Borrow_Apr, Leverage, APY }
            })
            const total_apr = Farm_Apr * Leverage +
                Trading_Free * Leverage +
                RABBIT_Rewards * Leverage -
                Borrow_Apr * (Leverage - 1);
            setTotal_Apr(total_apr);
        }
    }, [Farm_Apr, Trading_Free, RABBIT_Rewards, Borrow_Apr, Leverage]);

    useEffect(() => {
        if (Total_Apr != null) {
            const Daily = Total_Apr / 365;
            setDaily_Apr(Daily)
        }
    }, [Total_Apr]);
    const LoanSwitch0Click = () => {
        setLoanSwitch0(true);
        setLoanSwitch1(false);
        let AddressApr;
        let CurrenName;
        AddressApr = CurrentTokenInfo.LPtokenAddress0;
        CurrenName = TokenNames?.split("-")[0];
        if (CurrenName == "BNB") {
            AddressApr = BNB_ADDRESS
        }
        BorrowApr(AddressApr)
    };
    const LoanSwitch1Click = () => {
        setLoanSwitch0(false);
        setLoanSwitch1(true);
        let AddressApr;
        let CurrenName;
        AddressApr = CurrentTokenInfo.LPtokenAddress1;
        CurrenName = TokenNames?.split("-")[1];
        if (CurrenName == "BNB") {
            AddressApr = BNB_ADDRESS
        }
        BorrowApr(AddressApr)
    };
    const close = () => {
        onclick(-1)
    }
    return (
        <ApyBox>
            <Apytop>
                <span>Borrow Asset</span>
                <ApytopImg src={APYClose} onClick={close}></ApytopImg>
            </Apytop>
            <div style={{ padding: "10px 0 20px 0", display: "flex" }}>
                {Token0Pid ?
                    <Button w={80} h={30} mr={10} onClick={LoanSwitch0Click}
                        Select={LoanSwitch0}>
                        {TokenNames?.split("-")[0]}
                    </Button>
                    : ""}
                {Token1Pid ?
                    <Button w={80} h={30} onClick={LoanSwitch1Click}
                        Select={LoanSwitch1}>
                        {TokenNames?.split("-")[1]}
                    </Button>
                    : ""}
            </div>
            <ApyList>
                <p>Yield Farm APR : </p>
                <div>{Farm_Apr != null ?
                    `${(parseFloat(Farm_Apr) * Leverage * 100).toFixed(2)}%`
                    : <LoadingBox />
                }
                </div>
            </ApyList>
            <ApyList>
                <p>Trading Fees : </p>
                <div>{Trading_Free != null ?
                    `${(parseFloat(Trading_Free) * Leverage * 100).toFixed(2)}%`
                    : <LoadingBox />
                }
                </div>
            </ApyList>
            <ApyList >
                <p>RABBIT Rewards APR:</p>
                <div>{RABBIT_Rewards != null ? `${(parseFloat(RABBIT_Rewards) * Leverage * 100).toFixed(2)}%`
                    : <LoadingBox />
                }
                </div>
            </ApyList >
            <ApyList>
                <p>Borrowing Interest:</p>
                <div>{Borrow_Apr != null ?
                    `-${(Math.abs(parseFloat(Borrow_Apr)) * (Leverage - 1) * 100).toFixed(2)}%`
                    : <LoadingBox />
                }
                </div>
            </ApyList>
            <ApyList>
                <p>Total APR:</p>
                <div>{Total_Apr != null ? `${(parseFloat(Total_Apr) * 100).toFixed(2)}%`
                    : <LoadingBox />
                }
                </div>
            </ApyList>
            <ApyList>
                <p>Daily APR:</p>
                <div>{Daily_Apr != null ? `${(parseFloat(Daily_Apr) * 100).toFixed(2)}%`
                    : <LoadingBox />
                }
                </div>
            </ApyList>
        </ApyBox >
    )
}
const ApyBox = styled.div`
`
const Apytop = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
padding: 10px 0;
`
const ApytopImg = styled.img`
width:30px;
`
const ApyList = styled.div`
display: flex;
justify-content: space-between;
`
