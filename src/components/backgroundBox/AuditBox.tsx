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
      <PCbY>
        <Simg1 src={img1} />
        <SizeBox>Audited by</SizeBox>
      </PCbY>
      <MbY>
        <Simg1 src={img1} />
        <SizeBox>Audited by</SizeBox>
      </MbY>
      <Box1>
        <Linka target="_blank" href="https://github.com/peckshield/publications/blob/master/audit_reports/PeckShield-Audit-Report-Rabbit-v1.0.pdf">
          <Simg2 src={img2} />
        </Linka>
        <Linka target="_blank" href="https://www.certik.com/projects/rabbitfinance">
          <Simg2 src={img3} />
        </Linka>
        <Linka target="_blank" href="https://www.rabbitfinance.io/ChainsGuard-Rabbit-Finance-Smart-Contract-Audit-Report.pdf">
          <Simg2 src={img4} />
        </Linka>
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
  @media (max-width: 1000px) {
    padding: 10px;
    height: auto;
    flex-direction: column;
    /* align-items: baseline; */
  }
`;
const PCbY = styled.div`
    display: flex;
    align-items: center;
    @media (max-width: 1000px) {
    display: none;
}
`
const MbY = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    margin-left: 50px;
    @media (min-width: 1000px) {
    display: none;
}
`
const Box1 = styled.div`
    display: flex;
    align-items: center;
    @media (max-width: 1000px) {
      width: 100%;
      padding: 10px;
      height: auto;
      flex-direction: column;
  }
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
const Linka = styled.a`
  @media (max-width: 1000px) {
    width: 100%;
    margin:15px 0 15px 0
  }
`