import { createPublicClient, createWalletClient, http, formatEther, parseEther } from 'https://esm.sh/viem';
import { localhost } from "https://esm.sh/viem/chains";

const ganache = {
    chain: localhost, 
    transport: http('http://localhost:7545')
};

export class Client {
    constructor(clientObject = ganache){
        this.public = createPublicClient(clientObject);
        this.wallet = createWalletClient(clientObject);
    }

    async lastBlock(){
        try{
            const blockNr = await this.public.getBlockNumber();
            return this.response(true, parseInt(blockNr));
        }catch(error){
            return this.response(false, error);
        }
    }

    async walletBalance(address){
        try{
            const wei = await this.public.getBalance({address});
            return this.response(true, parseFloat(formatEther(wei)).toFixed(2));
        }catch(error){
            return this.response(false, error);
        }
    }

    async createTransaction(obj){
        try {
            await this.wallet.sendTransaction({
                account: obj.from,
                to: obj.to,
                value: parseEther(obj.value)
            });
            return this.response(true, 'Transaction Added To Chain');
        }catch(error){
            return this.response(false, error);
        }
    }

    response(bool, val){
        return { success: bool, value: val }
    }
}
