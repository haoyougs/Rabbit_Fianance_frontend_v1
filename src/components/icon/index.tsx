import React from "react";
import styled from "styled-components";
import Icon1 from "assets/chan.png";
import Icon2 from 'assets/RewardSummary.png'
import laba from "assets/laba.png";

/**
 * 表单顶部用的iocn图标和文字，文字需要传递children来展示
 * @param param0
 * @returns
 */
export const TipsIcon: React.FC<{ children: any }> = ({ children }) => {
  return (
    <IconBox>
      <Icon src={Icon1}></Icon>
      <TextSize>{children}</TextSize>
    </IconBox>
  );
};
export const RewardSummaryIcon: React.FC<{ children: any }> = ({ children }) => {
  return (
    <IconBox>
      <Icon src={Icon2}></Icon>
      <TextSize>{children}</TextSize>
    </IconBox>
  );
};
const IconBox = styled.div`
  padding: 20px;
  display: flex;
  align-items: center;
`;
const Icon = styled.img`
  height: 30px;
  margin-right: 10px;
`;
const TextSize = styled.div`
  font-size: 20px;
  color: #fff;
  margin-right: 20px;
  display: flex;
  align-items: center;

`;
/**
 * 表单顶部通知框，通知内容需要传递children来展示。
 */
export const MinTipsBar: React.FC<{ children: any }> = ({ children }) => {
  return (
    <MinTipsBarBox>
      <IconBox2 src={laba}></IconBox2>
      {children}
    </MinTipsBarBox>
  );
};
const MinTipsBarBox = styled.div`
  height: 36px;
  border-radius: 5px;
  border: 1px solid rgba(255, 213, 65, 0.4);
  padding-right: 10px;
  display: flex;
  align-items: center;
  color: rgb(255, 213, 65);
`;
const IconBox2 = styled.img`
  height: 30px;
`;






