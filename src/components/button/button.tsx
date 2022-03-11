import React from "react";
import styled from "styled-components";

interface btn {
  w: number;
  h: number;
  children?: any;
}
/**
 * 自定义宽高按钮
 * @param w 按钮宽度
 * @param h 按钮高度
 * @returns
 */
export const Button: React.FC<btn> = ({ w, h, children }) => {
  return (
    <Box w={w} h={h}>
      {children}
    </Box>
  );
};
const Box = styled.div<{ w: number; h: number }>`
  width: ${(props) => props.w}px;
  height: ${(props) => props.h}px;
  border-radius: ${(props) => props.h}px;
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
  position: relative;
  :hover {
    transition: all 0.5s;
    background: rgba(255, 255, 255, 0.1);
    color: rgba(255, 255, 255, 0.5);
    border: 1px solid rgba(255, 255, 255, 0.5);
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
    background-color: rgba(255, 255, 255, 0.5);
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
