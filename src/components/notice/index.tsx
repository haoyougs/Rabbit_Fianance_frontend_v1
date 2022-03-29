import React from "react";
import styled from "styled-components";
import Chenggong from "assets/chenggong (1).png";
import ShiBai from "assets/shibai.png";

/**
 * 顶部通知栏
 * @param children 通知内容，直接用标签包起来就行
 * @param Shou 判断展示成功图标还是失败图标 默认是成功
 * @returns
 */
export const NoticeBox: React.FC<{
  onClick?: () => void;
  children?: any;
  Shou?: boolean;
}> = ({ onClick, children, Shou = true }) => {
  return (
    <Box>
      {Shou?<Icon src={Chenggong} />:<Icon src={ShiBai} />}
      {children}
    </Box>
  );
};

const Box = styled.div`
  z-index: 3000;
  width: 600px;
  height: 70px;
  background: rgba(25, 25, 31, 0.6);
  border-radius: 10px;
  position: fixed;
  top: 20px;
  left: 50%;
  margin-left: -300px;
  cursor: pointer;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: slide-in-top 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  @keyframes slide-in-top {
    0% {
      transform: translateY(-40px);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;
const Icon = styled.img`
  width: 28px;
  position: absolute;
  left: 20px;
  top: 20px;
`;
