import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { useAuth } from "hooks/useAuth";
// 获取钱包地址
/**
 * 链接钱包
 */
export const useWallet = () => {
    console.log("use wallet")
    const Login = useAuth();
    useEffect(() => {
        Login();
    }, []);
   
  
}
// 截取钱包地址的方法
/**
 * 截取钱包地址的方法
 * @param str 钱包地址
 * @param len 截取长度
 * @returns 
 */
export const hidehash = (str: any, len = 4) => {
    return str ? `${str.slice(0, len)}....${str.slice(-len)}` : ''
}

