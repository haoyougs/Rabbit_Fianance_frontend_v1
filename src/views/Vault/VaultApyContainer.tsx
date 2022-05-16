import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { subStringNum } from "utils/subStringNum";

/*
 * Vault页面里的数据展示表格
 * @returns
 */
export const VaultApyContainer: React.FC<{ data?: any }> = ({ data }) => {
    //////console.log("data", data);
    return (
        <ApyBox>
            <ApyList>
                <p>Lending APR: </p>
                <p>{subStringNum(data.APYObj.Lending * 100, 2)}%</p>
            </ApyList>
            <ApyList>
                <p>Staking APR:</p>
                <p>{subStringNum(data.APYObj.Staking * 100, 2)}%</p>
            </ApyList>
            <ApyList>
                <p>Total APR:</p>
                <p>{
                    subStringNum((data.APYObj.Lending + data.APYObj.Staking) * 100, 3)}%</p>
            </ApyList>
        </ApyBox>
    )
}
const ApyBox = styled.div`
`
const ApyList = styled.div`
display: flex;
justify-content: space-between;
`