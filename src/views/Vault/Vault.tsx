import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BgBox } from "components/backgroundBox/background";
import { NumberRoll } from "components/Loading";
import { TvlValue } from "hooks/useVault";
import { AuditBox } from "components/backgroundBox/AuditBox";
import { ListBox } from "./farmlist";
import '../index.css'
import { NoticeBox } from "components/notice";
/**
 * Vault页面内容部分
 */
export const Vault: React.FC = () => {
  let [Tvl, setTvl] = useState(Number);
  useEffect(() => {
    TvlValue().then((res) => {
      setTvl(res);
    });
  }, [TvlValue]);
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
      <ListBox/>
      {/* 审计 */}
      <AuditBox/>
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
