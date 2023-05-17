// ABI
import Abi from './contract-abi.json';
// web3
import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
// utils
import { switchChainToBSC } from 'common/utils/switchChainToBSC';

// ----------------------------------------------------------------------

export const address = process.env.NEXT_PUBLIC_ADDRESS;

// TestNet
const web3 = new Web3('wss://bsc-testnet.nodereal.io/ws/v1/51b669d8367e41978ad32600d92d6ca7'); //  production
//const web3 = new Web3(new Web3.providers.HttpProvider('https://bsc-dataseed1.binance.org'));
//const web3 = new Web3( new Web3.providers.HttpProvider('https://data-seed-prebsc-1-s1.binance.org:8545')); //  testnet

export const contract = new web3.eth.Contract(Abi as AbiItem[], address);

// account of user
export let account: string;

export function setAccount(currentAccount: string) {
  account = currentAccount;
  !!currentAccount && switchChainToBSC();
}
