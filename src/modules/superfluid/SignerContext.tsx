import { createContext } from 'react';
import { ethers } from 'ethers';

export const SignerContext = createContext<
  [chainId: number, signerAddress: string, signer: ethers.Signer]
>(undefined!);
