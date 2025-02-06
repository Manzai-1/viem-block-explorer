import {createPublicClient, createWalletClient, http} from 'https://esm.sh/viem';
import { localhost } from "https://esm.sh/viem/chains";

const clientObject = {
    chain: localhost,
    transport: http('http://localhost:7545')
  }

export const createClient = ()=>{
    return createPublicClient(clientObject);
}

export const createWallet = ()=>{
    return createWalletClient(clientObject);
}