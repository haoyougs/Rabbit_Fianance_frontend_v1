import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getDefaultProvider, getSigner } from 'utils/provider'
import { ERC20, BankABI, PancakeAbi, pancakeFarmsABI, mdxFarmsABI, oldFarmsABI } from "config/ABI";
import { BigNumber, Contract, ethers } from "ethers";
export const UsdPrice = [
    {
        name: 'busd',
        address: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
        price: 1
    },
    {
        name: 'usdt',
        address: '0x55d398326f99059fF775485246999027B3197955',
        price: 1
    }, {
        name: 'usdc',
        address: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
        price: 1
    }, {
        name: 'dai',
        address: '0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3',
        price: 1
    }, {
        name: 'ust',
        address: '0x23396cF899Ca06c4472205fC903bDB4de249D6fC',
        price: 1
    }, {
        name: 'tusd',
        address: '0x14016E85a25aeb13065688cAFB43044C2ef86784',
        price: 1
    },
    {
        name: 'bnb',
        address: '0x0000000000000000000000000000000000000000',
        route: '0x10ED43C718714eb63d5aA57B78B54704E256024E',
        AmountsOutAddress: ["0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c", "0x55d398326f99059fF775485246999027B3197955"]
    },
    {
        name: 'bnb',
        address: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
        route: '0x10ED43C718714eb63d5aA57B78B54704E256024E',
        AmountsOutAddress: ["0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c", "0x55d398326f99059fF775485246999027B3197955"]
    },
    {
        name: 'btc',
        address: '0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c',
        route: '0x10ED43C718714eb63d5aA57B78B54704E256024E',
        AmountsOutAddress: ["0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c", "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56"]
    }, {
        name: 'eth',
        address: '0x2170ed0880ac9a755fd29b2688956bd959f933f8',
        route: '0x10ED43C718714eb63d5aA57B78B54704E256024E',
        AmountsOutAddress: ["0x2170Ed0880ac9A755fd29B2688956BD959F933F8", "0x55d398326f99059fF775485246999027B3197955"]
    }, {
        name: 'rabbit',
        address: '0x95a1199EBA84ac5f19546519e287d43D2F0E1b41',
        route: '0x10ED43C718714eb63d5aA57B78B54704E256024E',
        AmountsOutAddress: ["0x95a1199EBA84ac5f19546519e287d43D2F0E1b41", "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c", "0x55d398326f99059fF775485246999027B3197955"]
    }, {
        name: 'mdx',
        address: '0x9C65AB58d8d978DB963e63f2bfB7121627e3a739',
        route: '0x7DAe51BD3E3376B8c7c4900E9107f12Be3AF1bA8',
        AmountsOutAddress: ["0x9C65AB58d8d978DB963e63f2bfB7121627e3a739", "0x55d398326f99059fF775485246999027B3197955"]
    },
    {
        name: 'cake',
        address: '0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82',
        route: '0x10ED43C718714eb63d5aA57B78B54704E256024E',
        AmountsOutAddress: ["0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82", "0x55d398326f99059fF775485246999027B3197955"]
    },
    {
        name: 'vai',
        address: '0x4BD17003473389A42DAF6a0a729f6Fdb328BbBd7',
        route: '0x10ED43C718714eb63d5aA57B78B54704E256024E',
        AmountsOutAddress: ["0x4BD17003473389A42DAF6a0a729f6Fdb328BbBd7", "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56"]
    }, {
        name: 'ada',
        address: '0x3EE2200Efb3400fAbB9AacF31297cBdD1d435D47',
        route: '0x10ED43C718714eb63d5aA57B78B54704E256024E',
        AmountsOutAddress: ["0x3EE2200Efb3400fAbB9AacF31297cBdD1d435D47", "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56"]
    }, {
        name: 'fil',
        address: '0x0D8Ce2A99Bb6e3B7Db580eD848240e4a0F9aE153',
        route: '0x10ED43C718714eb63d5aA57B78B54704E256024E',
        AmountsOutAddress: ["0x0D8Ce2A99Bb6e3B7Db580eD848240e4a0F9aE153", "0x55d398326f99059fF775485246999027B3197955"]
    }, {
        name: 'Dot',
        address: '0x7083609fCE4d1d8Dc0C979AAb8c869Ea2C873402',
        route: '0x10ED43C718714eb63d5aA57B78B54704E256024E',
        AmountsOutAddress: ["0x7083609fCE4d1d8Dc0C979AAb8c869Ea2C873402", "0x55d398326f99059fF775485246999027B3197955"]
    }, {
        name: 'link',
        address: '0xF8A0BF9cF54Bb92F17374d9e9A321E6a111a51bD',
        route: '0x10ED43C718714eb63d5aA57B78B54704E256024E',
        AmountsOutAddress: ["0xF8A0BF9cF54Bb92F17374d9e9A321E6a111a51bD", "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c", "0x55d398326f99059fF775485246999027B3197955"]
    },
    {
        name: 'xvs',
        address: '0xcF6BB5389c92Bdda8a3747Ddb454cB7a64626C63',
        route: '0x10ED43C718714eb63d5aA57B78B54704E256024E',
        AmountsOutAddress: ["0xcF6BB5389c92Bdda8a3747Ddb454cB7a64626C63", "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c", "0x55d398326f99059fF775485246999027B3197955"]
    },
    {
        name: 'uni',
        address: '0xBf5140A22578168FD562DCcF235E5D43A02ce9B1',
        route: '0x10ED43C718714eb63d5aA57B78B54704E256024E',
        AmountsOutAddress: ["0xBf5140A22578168FD562DCcF235E5D43A02ce9B1", "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c", "0x55d398326f99059fF775485246999027B3197955"]
    },
]
export const getUsdPrice = async (t1Address: any) => {
    // UsdPrice
    const current = UsdPrice.filter(item => item.address.toUpperCase() == t1Address.toUpperCase())[0];
    if (current.price) {
        return current.price;
    } else {
        const ContractObj = new Contract((current as any).route, PancakeAbi, getDefaultProvider());
        const x = ethers.utils.parseEther('1')
        const Price = await ContractObj.getAmountsOut("1000000000000000000", current.AmountsOutAddress);
        const TokenPrice = ethers.utils.formatUnits(Price[Price.length - 1], 18);
        return TokenPrice;
    }
}

export const TokenToAddress = [
    {
        name: 'BUSD',
        address: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
    },
    {
        name: 'USDT',
        address: '0x55d398326f99059fF775485246999027B3197955',
    }, {
        name: 'USDC',
        address: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
    }, {
        name: 'DAI',
        address: '0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3',
    }, {
        name: 'UST',
        address: '0x23396cF899Ca06c4472205fC903bDB4de249D6fC',
    }, {
        name: 'TUSD',
        address: '0x14016E85a25aeb13065688cAFB43044C2ef86784',
    },
    {
        name: 'BNB',
        address: '0x0000000000000000000000000000000000000000',
    },
    {
        name: 'BNB',
        address: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
    },
    {
        name: 'BTC',
        address: '0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c',
    }, {
        name: 'ETH',
        address: '0x2170ed0880ac9a755fd29b2688956bd959f933f8',
    }, {
        name: 'RABBIT',
        address: '0x95a1199EBA84ac5f19546519e287d43D2F0E1b41',
    }, {
        name: 'MDX',
        address: '0x9C65AB58d8d978DB963e63f2bfB7121627e3a739',
    },
    {
        name: 'CAKE',
        address: '0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82',
    },
    {
        name: 'VAI',
        address: '0x4BD17003473389A42DAF6a0a729f6Fdb328BbBd7',
    }, {
        name: 'ADA',
        address: '0x3EE2200Efb3400fAbB9AacF31297cBdD1d435D47',
    }, {
        name: 'FIL',
        address: '0x0D8Ce2A99Bb6e3B7Db580eD848240e4a0F9aE153',
    }, {
        name: 'DOT',
        address: '0x7083609fCE4d1d8Dc0C979AAb8c869Ea2C873402',
    }, {
        name: 'LINK',
        address: '0xF8A0BF9cF54Bb92F17374d9e9A321E6a111a51bD',
    },
    {
        name: 'XVS',
        address: '0xcF6BB5389c92Bdda8a3747Ddb454cB7a64626C63',
    },
    {
        name: 'UNI',
        address: '0xBf5140A22578168FD562DCcF235E5D43A02ce9B1',
    },
]