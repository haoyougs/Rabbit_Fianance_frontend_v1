import styled from 'styled-components';
import { Copy, ExternalLink } from 'react-feather';
export const Modalbox = styled.div`
    box-sizing: border-box;
    margin: 0px auto;
    max-width: 552px;
    padding: 20px;
    width: 100%;
    background-color: rgb(25, 25, 31);
    border-radius: 10px;
    z-index: 10;
`
export const Box = styled.div`
  display: flex;
    flex-direction: column;
    padding: 24px;
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
export const TitleBox = styled.div`
    align-items: center;
    color: rgb(255, 255, 255);
    display: flex;
    font-size: 18px;
    font-weight: 700;
    height: 72px;
    justify-content: space-between;
    margin-top: -24px;
`;
export const CloseBtn = styled.img`
  width: 30px;
  cursor: pointer;
  transition: all 0.3s;
  :hover {
    transform: rotate(180deg);
  }
`;
export const UnAccountBox = styled.div`
    background-color: rgb(36, 32, 47);
    padding: 30px 20px 30px 30px;
    justify-content: space-between;
    color: rgb(255, 255, 255);
    margin-bottom: 24px;
    display: flex;
    border-radius: 5px;
`
export const ButtonBox = styled.div``
export const AccountInfo = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`
export const AccountName = styled.div`
    opacity: 0.5;
    font-size: 12px;
    line-height: 1;
    color: #fff;
`
export const AccountDesc = styled.div`
    margin: 10px 0px;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
`
export const AccountImg = styled.img`
    width: 25px;
`
export const AccountText = styled.div`
    margin-left: 20px;
    font-size: 20px;
    color: rgb(255, 255, 255);
`
export const CopyIcon = styled(Copy)`

`
export const ExternalLinkIcon = styled(ExternalLink)`
color:rgba(255,255,255,.5);
`
export const AccountToolItem = styled.a`
    display: flex;
    align-items: center;
    font-size: 12px;
    color:rgba(255,255,255,0.5);
    margin-right: 10px;
    &:hover{
    color:#F8B629;
    ${CopyIcon}{
    color:#F8B629;
    }
    ${ExternalLinkIcon}{
      color:#F8B629;
    }
  }
`
export const AccountToolTxt = styled.div`
  line-height: 30px;
  margin-left: 5px;
`
export const AccountTool = styled.div`
display: flex;`

export const AccountBox = styled.div`
    display: flex;
    flex-direction: column;
    -webkit-box-pack: center;
    justify-content: center;
    color: rgb(255, 255, 255);
    margin-bottom: 24px;
`;
export const AccountWalletLine = styled.div`
    cursor: pointer;
    display: flex;
    align-items:center;
    margin-right: 10px;
    background-color:#302e3a;
    padding:13px 25px;
    border-radius: 5px;
    font-size:18px;
    margin:5px 0;
    &:hover{
    background-color: #24202f;
    }
`
export const AccountWalletIcon = styled.img`
  width: 40px;
`
export const AccountWalletItem = styled.div`
  margin-left: 15px;
`