import React from "react";
import TVL_ABI from 'config/abi/TVL.json'
import { TVL_ADDRESS, BANK_ADDRESS, BNB_ADDRESS, VAultListAddress } from "config/address";
import { BankABI } from 'config/ABI'
import { getDefaultProvider, getSigner } from 'utils/provider'
import { Contract, ethers } from "ethers";

/**
 * 获取Total Value Locked的值
 */
export const TvlValue = async () => {
    const TvlAddress = new Contract(TVL_ADDRESS, TVL_ABI, getDefaultProvider())
    const TvlAddressVal = await TvlAddress.getTvl('tvl')
    let Value = Number(TvlAddressVal._hex)
    return Value
}
/**
 * 获取银行总存款
 */
export const TotalDeposit = async (bankAddress: string, tikenAddress: string) => {
    const ContractObj = new Contract(
        bankAddress,
        BankABI,
        getDefaultProvider()
    );
    const ResVal = await ContractObj.banks(tikenAddress);
    let Value = ethers.utils.formatUnits(ResVal.totalDebt, 18);
    // console.log('返回值', Value);

    return Value;
}
/**
 * 获取银行借款总量
 */
export const TotalBorrowed = async (address: string, abi: any) => {
    const ContractObj = new Contract(address, abi, getDefaultProvider())
    const ResVal = await ContractObj.banks(BNB_ADDRESS)
    let Value = ethers.utils.formatUnits(ResVal.totalDebt, 18)
    return Value
}

/**
 * 获取BNB的余额
 */
export const Balance = async (library: any, TokenAddress: any) => {
    const Balances = await library?.getBalance(TokenAddress);
    let Value = ethers.utils.formatUnits(Balances, 18)
    return Value
};

/**
 * 获取ibToken的余额
 */
export const IbToken = async (Address: any, Abi: any, library: any, TokenAddress: any) => {
    const Tokenaddress = new Contract(TokenAddress, Abi, library);
    const Balances = await Tokenaddress.balanceOf(Address)
    let Value = ethers.utils.formatUnits(Balances, 18)
    return Value
}

/**
 * 往银行存入BNB
 */
export const Deposit = async (address: string, abi: any, token: string, amount: string) => {
    try {
        const Banks = new Contract(address, abi, getSigner());
        const Result = await Banks.deposit(token, ethers.utils.parseEther(amount));
        await Result.wait()
        // console.log('存入成功', Result);
        return true
    } catch (e) {
        console.error('存入BNB失败', e)
        return false
    }
}
/**
 * 存入BNB预计得到多少计息币ibBNB
 */
export const Receive = async (address: string, abi: any, Token: string, amount: string) => {

    const Banks = new Contract(address, abi, getSigner());
    const Result = await Banks.ibTokenCalculation(Token, ethers.utils.parseEther(amount));
    let Value = ethers.utils.formatUnits(Result, 18)
    // console.log('预计的到多少计息币', Result);
    return Value
}

/**
 * 计息币提现操作
 */
export const Withdraw = async (address: string, abi: any, Token: string, pamount: string) => {
    try {
        console.log('取款数量', pamount);
        const Banks = new Contract(address, abi, getSigner());
        const Result = await Banks.withdraw(Token, ethers.utils.parseEther(pamount))
        await Result.wait()
        // console.log('取出成功', Result);
        return true
    } catch (e) {
        console.error('取出失败', e)
        return false
    }

}