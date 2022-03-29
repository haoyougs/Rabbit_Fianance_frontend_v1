import React from "react";
import styled from "styled-components";
import { BgBox } from "./background";
import img1 from "assets/page/shenji.png";
import img2 from "assets/page/peckshield.png";
import img3 from "assets/page/certik.png";
import img4 from "assets/page/chainsguard.png";

/**
 * 底部审计部分
 * @returns 
 */
export const AuditBox: React.FC = () => {
  return (
    <Box>
      <Box1>
        <Simg1 src={img1} />
        <SizeBox>Audited by</SizeBox>
      </Box1>
      <Box1>
        <Simg2 src={img2} />
        <Simg2 src={img3} />
        <Simg2 src={img4} />
      </Box1>
    </Box>
  );
};

const Box = styled(BgBox)`
  height: 100px;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
`;
const Box1 = styled.div`
    display: flex;
    align-items: center;
`
const Simg1 = styled.img`
  width: 30px;
`;
const SizeBox = styled.div`
  font-size: 16px;
  color: #fff;
  margin-left: 10px;
`;
const Simg2 = styled.img`
    height: 50px;
    margin-left: 20px;
`
