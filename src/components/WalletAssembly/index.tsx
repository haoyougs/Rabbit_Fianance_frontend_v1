import React, { useEffect, useState } from "react";
import styled from "styled-components";
import closeImg from "assets/close@2x.png";
import { TokenIcon } from "components/icon/tokenIcon";
import { Button } from "components/button/button";
import { ethers } from "ethers";
import { useWeb3React } from '@web3-react/core'
interface parameter {
  onClick: () => void;
}

export const WalletAssembly: React.FC<parameter> = ({ onClick }) => {
  const { account} = useWeb3React()
  return (
    <>
      <BG onClick={onClick} />
      <Box>
        <TitleBox>
          <div>{account}</div>
          <CloseBtn src={closeImg} onClick={onClick} />
        </TitleBox>
      </Box>
    </>
  );
};

const Box = styled.div`
  width: 552px;
  /* height: 620px; */
  background-color: rgb(25, 25, 31);
  padding: 30px;
  border-radius: 10px;
  position: fixed;
  top: 50%;
  left: 50%;
  margin-top: -310px;
  margin-left: -276px;
  z-index: 1001;
  animation: fade-in-top 0.6s cubic-bezier(0.39, 0.575, 0.565, 1) both;
  @keyframes fade-in-top {
    0% {
      transform: translateY(-50px);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;
const BG = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  backdrop-filter: blur(20px);
`;
const TitleBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  font-size: 18px;
  font-weight: 700;
`;
const CloseBtn = styled.img`
  width: 30px;
  cursor: pointer;
  transition: all 0.3s;
  :hover {
    transform: rotate(180deg);
  }
`;
const TexBox1 = styled.div`
  padding: 20px 0;
  color: #fff;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  margin-bottom: 30px;
`;
const TexBox2 = styled.div`
  /* padding: 15px 0; */
`;
const TexBox3 = styled.div`
  color: #fff;
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
`;
const TipsBox = styled.div`
  padding: 10px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  font-size: 12px;
  border-radius: 5px;
  margin-bottom: 10px;
  width: 100%;
  color: rgba(255, 255, 255, 0.5);
  display: flex;
  margin-top: 20px;
`;
const BtnBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;
