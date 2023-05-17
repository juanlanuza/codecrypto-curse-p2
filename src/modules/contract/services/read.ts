import { contract } from './config';

// ----------------------------------------------------------------------

// Read Contract
// 1.  balance()
export async function balance(): Promise<number> {
  const balance = await contract.methods.balance().call();
  return balance;
}
