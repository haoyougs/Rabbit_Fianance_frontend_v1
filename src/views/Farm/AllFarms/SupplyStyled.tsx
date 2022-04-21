import styled from "styled-components";
import { BgBox } from "components/backgroundBox/background";
export const Box = styled(BgBox)`
  margin: 0 auto;
  width: 100%;
  max-width: 900px;
  /* height: 380px; */
  display: flex;
  overflow: hidden;
  margin-bottom: 40px;
`;
export const LBox = styled.div`
  flex: 1;
  background: rgba(25, 25, 31, 0.6);
  padding: 25px;
`;
export const RBox = styled.div`
  flex: 2;
  padding: 25px;
`;
export const NameSize = styled.div`
  font-size: 18px;
  margin-left: 10px;
  color: #fff;
`;
export const IconBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 40px;
  color: #fff;
`;
export const IconBox2 = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  color: #fff;
`;
export const BtnBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const Tips1 = styled.div`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(48, 49, 72);
  color: #fff;
  margin-right: 10px;
`;

export const Title = styled.div`
  font-size: 16px;
  color: rgba(255, 255, 255, 0.5);
`;
export const BalanceBox = styled.div`
  width: 100%;
  height: 38px;
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
`;
export const InpBox = styled.div`
  width: 100%;
  height: 50px;
  background-color: rgb(66, 60, 86);
  border-radius: 10px;
  padding: 0 10px;
  display: flex;
  align-items: center;
`;
export const Input = styled.input`
  flex: 1;
  height: 40px;
  border: 0;
  background: 0;
  padding: 0 10px;
  font-size: 16px;
  color: #fff;
`;
export const ReceiveBox = styled.div`
  width: 100%;
  height: 38px;
  display: flex;
  align-items: center;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
`;
export const Values = styled.div`
  color: rgb(255, 182, 13);
`;
export const TipsBox = styled.div`
  display: flex;
  font-size: 12px;
  margin-top: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 10px;
  color: rgba(255, 255, 255, 0.5);
  border-radius: 5px;
`;
export const Suffix = styled.div`
  color: rgba(255, 255, 255, 0.5);
`;
export const Borrow = styled.div`
  color: rgba(255, 255, 255, 0.5);
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
`;
export const BorrowBtnBox = styled.div`
  display: flex;
`;
export const Tips2 = styled.div`
  width: 100%;
  height: 60px;
  margin: 30px 0;
  padding: 10px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 5px;
  color: rgba(255, 255, 255, 0.5);
  display: flex;
  align-items: center;
`;
export const Tips3 = styled.div`
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
`;
export const DataList = styled.div`
  margin-top: 30px;
  width: 100%;
`;
export const DataListDiv = styled.div`
  width: 100%;
  margin-bottom: 15px;
  color: #fff;
  display: flex;
  justify-content: space-between;
  .AssetsSupplied {
    display: flex;
  }
`;