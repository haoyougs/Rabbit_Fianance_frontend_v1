import React from "react";
import styled from "styled-components";
import { BgBox } from "components/backgroundBox/background";
import { TokenIcon } from "components/icon/tokenIcon";
import { Button } from "components/button/button";

/**
 * IRO Pool 和 Airdrop Pool 组件
 * @returns 
 */
export const Pool: React.FC = () => {
  return (
    <>
      <PoolBox>
        <PoolTitle>
          <PoolTitle1>IRO Pool</PoolTitle1>
          <PoolTitle2>
            <RewardSummaryListBoxValBox1>Earned:</RewardSummaryListBoxValBox1>
            <RewardSummaryListBoxValBox2>0 RABBIT</RewardSummaryListBoxValBox2>
            <Button w={100} h={35} ml={20} disabled={false}>
              Claim
            </Button>
          </PoolTitle2>
        </PoolTitle>
        <PoolListBox1>
          <PoolListBox2>
            <PoolListBoxVal>
              <TokenIcon IconName={"rRABBIT"} />
              <TokenName>rRabbit</TokenName>
            </PoolListBoxVal>
            <PoolVal>
              <RewardSummaryListBoxValBox1>
                Deposits
              </RewardSummaryListBoxValBox1>
              <div style={{ marginTop: 5 }}>0 rRabbit</div>
            </PoolVal>
            <PoolBtn>
              <Button w={100} h={35}>
                Stake
              </Button>
              <Button w={100} h={35} ml={20}>
                Unstake
              </Button>
            </PoolBtn>
          </PoolListBox2>
        </PoolListBox1>
      </PoolBox>
      {/*  */}
      <PoolBox>
        <PoolTitle>
          <PoolTitle1>Airdrop Pool</PoolTitle1>
          <PoolTitle2>
            <RewardSummaryListBoxValBox1>Earned:</RewardSummaryListBoxValBox1>
            <RewardSummaryListBoxValBox2>0 RABBIT</RewardSummaryListBoxValBox2>
            <Button w={100} h={35} ml={20} disabled={false}>
              Claim
            </Button>
          </PoolTitle2>
        </PoolTitle>
        <PoolListBox1>
          <PoolListBox2>
            <PoolListBoxVal>
              <TokenIcon IconName={"rCANDY"} />
              <TokenName>TURTLE</TokenName>
            </PoolListBoxVal>

            <PoolVal>
              <RewardSummaryListBoxValBox1>
                Deposits
              </RewardSummaryListBoxValBox1>
              <div style={{ marginTop: 5 }}>0 TURTLE</div>
            </PoolVal>
            <PoolBtn>
              <Button w={100} h={35}>
                Stake
              </Button>
              <Button w={100} h={35} ml={20}>
                Unstake
              </Button>
            </PoolBtn>
          </PoolListBox2>
        </PoolListBox1>
      </PoolBox>
    </>
  );
};



const PoolBox = styled(BgBox)`
  height: 218px;
  margin-top: 20px;
  padding: 20px;
`;
const TokenName = styled.div`
  margin-left: 10px;
  color: #fff;
`;
const RewardSummaryListBoxValBox1 = styled.div`
  color: rgba(255, 255, 255, 0.5);
`;
const RewardSummaryListBoxValBox2 = styled.div`
  color: rgb(239, 185, 11);
  margin-left: 10px;
`;
const PoolTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const PoolTitle1 = styled.div`
  font-size: 20px;
  color: #fff;
  margin: 20px;
`;
const PoolTitle2 = styled.div`
  display: flex;
  align-items: center;
  margin-right: 20px;
`;
const PoolListBox1 = styled.div`
  width: 100%;
  padding: 20px;
`;
const PoolListBox2 = styled.div`
  width: 100%;
  height: 80px;
  background-color: rgba(103, 72, 159, 0.3);
  border-radius: 5px;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const PoolVal = styled.div`
  color: #fff;
`;
const PoolBtn = styled.div`
  display: flex;
`;
const PoolListBoxVal = styled.div`
  display: flex;
  align-items: center;
`;
