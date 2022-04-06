
import React, { useMemo, useState, useEffect, useCallback } from 'react'
import styled from 'styled-components';
import { useWeb3React } from '@web3-react/core'
import { hidehash } from "hooks/useWallet";
import closeImg from "assets/close@2x.png";
import headImg from "assets/modal/head.png"
import { Modalbox, Box, TitleBox, CloseBtn, UnAccountBox, AccountBox, ButtonBox, AccountInfo, AccountName, AccountDesc, AccountImg, AccountText, AccountTool, AccountToolItem, CopyIcon, AccountToolTxt, ExternalLinkIcon, AccountWalletLine, AccountWalletIcon, AccountWalletItem } from "./indexStyled"
import { Button, Btn } from "components/button/button";
import MaiziIcon from 'assets/modal/maizi@2x.png'
import MetamaskIcon from 'assets/modal/metamask@2x.png'
import TpIcon from 'assets/modal/tp@2x.png'
import WalletIcon from 'assets/modal/wallet@2x.png'
import { useAuth2 } from "hooks/useAuth";
import { ConnectorNames } from 'config/wallet/wallet';
import { InjectConnector } from 'utils/web3'
// import { useWallet } from 'use-wallet';
interface parameter {
    onClick: () => void;
}
const SwitchNet: React.FC<{ onHide?: any }> = ({ onHide }) => {
    // const wallet = useWallet()
    const { activate } = useWeb3React()
    const { account } = useWeb3React()
    const [change, setChange] = useState<boolean>(false);
    const [copy, setCopy] = useState<boolean>(false)
    //复制
    const copyAccount = useCallback(async () => {
        const res = await navigator.clipboard.writeText(`${account}`);
        setCopy(true)
        setTimeout(() => {
            setCopy(false)
        }, 1000);
    }, []);
    const { Login, Logout } = useAuth2(56);
    //连接wallet钱包
    const onWalletConnect = async () => {
        await Login(ConnectorNames.WalletConnect)
        onHide()
    }
    //连接matemask钱包
    const onMetamaskConnect = async () => {
        await Login(ConnectorNames.Injected)
        onHide()
    }
    return (
        <>
            <Modalbox >
                <Box>
                    <TitleBox>
                        <div>{account ? 'Account' : ''}</div>
                        <CloseBtn src={closeImg} onClick={onHide} />
                    </TitleBox>
                    {
                        account && change == false ?
                            <UnAccountBox>
                                <AccountInfo>
                                    <AccountName>
                                        Connected with MetaMask
                                    </AccountName>
                                    <AccountDesc>
                                        <AccountImg src={headImg}></AccountImg>
                                        <AccountText>{hidehash(account, 6)}</AccountText>
                                    </AccountDesc>
                                    <AccountTool>
                                        <AccountToolItem onClick={copyAccount}>
                                            <CopyIcon size={13} />
                                            <AccountToolTxt>
                                                {!copy ? 'Copy Address' : 'Copied'}
                                            </AccountToolTxt>
                                        </AccountToolItem>
                                        <AccountToolItem target="_blank" href={`https://www.bscscan.com/address/${account}`}>
                                            <ExternalLinkIcon width={13} />
                                            <AccountToolTxt>
                                                View on BSC
                                            </AccountToolTxt>
                                        </AccountToolItem>
                                    </AccountTool>
                                </AccountInfo>
                                <ButtonBox>
                                    <Button w={100} h={36} onClick={() => setChange(true)}>
                                        Change
                                    </Button>
                                </ButtonBox>
                            </UnAccountBox> :
                            <AccountBox>
                                <AccountWalletLine onClick={onMetamaskConnect}>
                                    <AccountWalletIcon src={MetamaskIcon} />
                                    <AccountWalletItem>
                                        Metamask
                                    </AccountWalletItem>
                                </AccountWalletLine>
                                <AccountWalletLine onClick={onWalletConnect}>
                                    <AccountWalletIcon src={WalletIcon} />
                                    <AccountWalletItem>
                                        Wallet Connect
                                    </AccountWalletItem>
                                </AccountWalletLine>

                                <AccountWalletLine onClick={onWalletConnect}>
                                    <AccountWalletIcon src={TpIcon} />
                                    <AccountWalletItem>
                                        Token Pocket
                                    </AccountWalletItem>
                                </AccountWalletLine>

                                <AccountWalletLine onClick={onMetamaskConnect}>
                                    <AccountWalletIcon src={MaiziIcon} />
                                    <AccountWalletItem>
                                        MathWallet
                                    </AccountWalletItem>
                                </AccountWalletLine>
                            </AccountBox>
                    }
                </Box>

            </Modalbox>
        </>
    )
}
export default SwitchNet;
