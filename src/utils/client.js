import { createPublicClient, createWalletClient, http, formatEther, parseEther } from 'https://esm.sh/viem';
import { localhost } from "https://esm.sh/viem/chains";

const clientObject = {
    chain: localhost, 
    transport: http('http://localhost:7545')
};


export class Client {
    constructor(){
        this.public = createPublicClient(clientObject);
        this.wallet = createWalletClient(clientObject);
    }

    async lastBlock(){
        try{
            const blockNr = await this.public.getBlockNumber();
            return parseInt(blockNr);
        }catch(error){
            return error;
        }
    }

    async walletBalance(address){
        try{
            const wei = await this.public.getBalance({address});
            return parseFloat(formatEther(wei)).toFixed(2);
        }catch(error){
            return error;
        }
    }

    async createTransaction(obj){
        try {
            await this.wallet.sendTransaction({
                account: obj.from,
                to: obj.to,
                value: parseEther(obj.value)
            });
        }catch(error){
            return error;
        }
    }
}
