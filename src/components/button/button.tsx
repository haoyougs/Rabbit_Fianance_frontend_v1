import React, { useState } from "react";
import styled from "styled-components";

import {
  SVGloading1,
  SVGloading2,
  SVGloading3,
  SVGloading4,
} from "components/Loading/SVG";

interface btn {
  w: number;
  h: number;
  children?: any;
  onClick?: () => void;
  ml?: number;
  mr?: number;
  mt?: number;
  mb?: number;
  disabled?: boolean;
  Select?: boolean;
}
/**
 * 自定义按钮
 * @param w 宽
 * @param h 高
 * @param children 按钮中的的文字内容
 * @param onClick 按钮点击事件
 * @param ml 左边距
 * @param mr 右边距
 * @param mt 上边距
 * @param mb 下边距
 * @param disabled 禁用状态 禁用时loading出现
 * @param Select 选中状态
 */
export const Button: React.FC<btn> = ({
  w,
  h,
  children,
  onClick,
  ml,
  mr,
  mt,
  mb,
  disabled = true,
  Select = false,
}) => {
  const ClickEvent = () => {
    if (onClick && disabled == true) {
      onClick();
    }
  };
  return (
    <Box
      w={w}
      h={h}
      onClick={ClickEvent}
      ml={ml}
      mr={mr}
      mt={mt}
      mb={mb}
      disabled={disabled}
      Select={Select}
    >
      {disabled ? "" : <SVGloading1 />} {children}
    </Box>
  );
};
const Box = styled.div<{
  w: number;
  h: number;
  ml?: number;
  mr?: number;
  mt?: number;
  mb?: number;
  disabled?: boolean;
  Select: boolean;
}>`
  width: ${(props) => (props.w === 0 ? "100%" : props.w + "px")};
  height: ${(props) => props.h}px;
  margin-left: ${(props) => props.ml}px;
  margin-right: ${(props) => props.mr}px;
  margin-bottom: ${(props) => props.mb}px;
  margin-top: ${(props) => props.mt}px;
  border-radius: ${(props) => props.h}px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Arial;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  color: rgba(255, 255, 255,0.5);
  background: ${(props) => (props.Select ? "rgba(255, 255, 255,0.1)" : "")};
  opacity: ${(props) => (props.disabled ? "1" : "0.2")};
  cursor: ${(props) => (props.disabled ? "pointer" : "not-allowed")};
  position: relative;
  :hover {
    transition: all 0.5s;
    // background: rgba(248, 182, 41, 0.1);
    color: rgba(248, 182, 41);
    border: 1px solid rgba(248, 182, 41);
  }
  :focus {
    outline: none;
  }
  :after {
    content: "";
    display: block;
    position: absolute;
    border-radius: ${(props) => props.h}px;
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
    pointer-events: none;
    background-color: rgba(248, 182, 41, 0.5);
    background-repeat: no-repeat;
    background-position: 50%;
    opacity: 0;
    transition: all 0.5s;
  }
  :active:after {
    opacity: 0.8;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    transition: 0s;
  }
`;

// 可继承样式
export const Btn = styled.div`
  width: 100px;
  height: 35px;
  border-radius: 35px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Arial;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  color: rgba(255, 255, 255);
  cursor: pointer;
  transition: all 0.3s;
`;

/**
 * 新旧版切换按钮
 */
export const OldBtn: React.FC = () => {
  return (
    <OldBox>
      <Oldbg>Old</Oldbg>
      <OldbgV3>V3</OldbgV3>
    </OldBox>
  );
};
const OldBox = styled.div`
  border: 1px solid rgb(114, 118, 144);
  border-radius: 100px;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
const Oldbg = styled.div`
  width: 50px;
  height: 26px;
  border-radius: 25px;
  color: rgb(255, 255, 255);
  text-align: center;
  line-height: 26px;
`;
const OldbgV3 = styled.div`
  width: 50px;
  height: 26px;
  border-radius: 25px;
  color: rgb(255, 255, 255);
  background-color: rgb(94, 97, 132);
  text-align: center;
  line-height: 26px;
`;
