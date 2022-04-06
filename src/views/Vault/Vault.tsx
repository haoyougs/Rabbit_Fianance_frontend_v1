import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BgBox } from "components/backgroundBox/background";
import { NumberRoll } from "components/Loading";
import { TvlValue } from "hooks/useVault";
import { AuditBox } from "components/backgroundBox/AuditBox";
import { ListBox } from "./farmlist";
import '../index.css'
import { NoticeBox } from "components/notice";
import { useWeb3React } from "@web3-react/core";
/**
 * Vault页面内容部分
 */
export const Vault: React.FC = () => {
  const { account, library } = useWeb3React();
  let [Tvl, setTvl] = useState<Number>(0.00);

  //获取Total Value Locked
  useEffect(() => {
    // console.log(111, account)
    //没有钱包地址，不请求
    if (!account) {
      setTvl(0);
      return;
    }
    TvlValue().then((res) => {
      setTvl(0);
      setTvl(res);
    });
  }, [TvlValue, account, library]);
  return (
    <Content>
      {/* Total Value Locked 数值展示 */}
      {/* <NoticeBox></NoticeBox> */}
      <Box>
        <MinTitleBox>Total Value Locked</MinTitleBox>
        <div className="textAnimation">
          <NumberRoll
            item={{
              numerical: Tvl,
              decimal: 2,
              loadH: 20,
              loadW: 120,
            }}
          ></NumberRoll>
        </div>
      </Box>
      {/* 银行表单 */}
      <ListBox />
      {/* 审计 */}
      <AuditBox />
    </Content>
  );
};

const Box = styled(BgBox)`
  height: 193px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 32px;
  color: rgb(255, 255, 255);
`;
const Content = styled.div`
  width: 100%;
  height: 100%;
`;
const MinTitleBox = styled.div`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 10px;
`;

const FromBox = styled(BgBox)`

`
