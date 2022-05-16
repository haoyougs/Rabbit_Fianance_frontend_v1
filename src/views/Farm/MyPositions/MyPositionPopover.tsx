import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { subStringNum } from "utils/subStringNum";
import { Button } from "components/button/button";

/*
 * Vault页面里的数据展示表格
 * @returns
 */
export const MyPositionPopover: React.FC<{ data?: any, currentToken?: any }> = ({ data, currentToken }) => {
    const Leverage = data.Leverage;
    const Farm_Apr = data.APY.Farm_Apr;
    const Trading_Free = data.APY.Trading_Free;
    const RABBIT_Rewards = data.APY.RABBIT_Rewards;
    const Borrow_Apr = data.APY.Borrow_Apr;
    const total_apr = Farm_Apr * Leverage + Trading_Free * Leverage +
        RABBIT_Rewards * Leverage -
        Borrow_Apr * (Leverage - 1);
    const Daily_Apr = total_apr / 365;
    return (
        <ApyBox>
            <ApyBtnBox>
                <Button w={80} h={30} Select={true}>
                    {currentToken}
                </Button>
            </ApyBtnBox>
            <ApyList>
                <p>Yield Farm APR: </p>
                <p>{subStringNum(Farm_Apr * Leverage * 100, 2)}%</p>
            </ApyList>
            <ApyList>
                <p>Trading Free: </p>
                <p>{subStringNum(Trading_Free * Leverage * 100, 2)}%</p>
            </ApyList>
            <ApyList>
                <p>RABBIT Rewards APR:</p>
                <p>{subStringNum(RABBIT_Rewards * Leverage * 100, 2)}%</p>
            </ApyList>
            <ApyList>
                <p>Borrowing Interest:</p>
                <p>-{subStringNum(Borrow_Apr * (Leverage - 1) * 100, 2)}%</p>
            </ApyList>
            <ApyList>
                <p>Total APR:</p>
                <p>{subStringNum(total_apr * 100, 2)}%</p>
            </ApyList>
            <ApyList>
                <p>Daily APR:</p>
                <p>{subStringNum(Daily_Apr * 100, 2)}%</p>
            </ApyList>
        </ApyBox>
    )
}
const ApyBox = styled.div`
`
const ApyBtnBox = styled.div`
padding: 10px 0 20px 0,;
display: flex;
    @media (max-width: 1000px) {
        display: none;
    }
`
const ApyList = styled.div`
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    @media (max-width: 1000px) {
        color: rgb(255, 255, 255);
        margin: 5px 0px;
        p{
            margin-bottom: 0;
        }
    }
`