import { account, address, contract } from './config';
import toast from 'react-hot-toast';

// ----------------------------------------------------------------------
// Write Contract

async function sendTx(params: any[]) {
  return await (window as any).ethereum
    .request({ method: 'eth_sendTransaction', params })
    .then((txHash: any) => {
      toast.success('Request sended. Processing...');
      return true;
    })
    .catch((e: any) => {
      toast.error(e.message);
      return false;
    });
}

// 1. decrement()
export async function decrement() {
  return sendTx([
    {
      from: account,
      to: address,
      data: contract.methods.decrement().encodeABI()
    }
  ]);
}

// 2. increment()
export async function increment() {
  return sendTx([
    {
      from: account,
      to: address,
      data: contract.methods.increment().encodeABI()
    }
  ]);
}
