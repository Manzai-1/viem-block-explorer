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
            return {
                success: true,
                value: parseInt(blockNr)
            };
        }catch(error){
            return {
                success: false,
                value: error
            };
        }
    }

    async walletBalance(address){
        try{
            const wei = await this.public.getBalance({address});
            return {
                success: true,
                value: parseFloat(formatEther(wei)).toFixed(2)
            }
        }catch(error){
            return {
                success: false,
                value: error
            };
        }
    }

    async createTransaction(obj){
        try {
            await this.wallet.sendTransaction({
                account: obj.from,
                to: obj.to,
                value: parseEther(obj.value)
            });
            return {
                success: true,
                value: 'Transaction Added To Chain'
            };
        }catch(error){
            return {
                success: false,
                value: error
            };
        }
    }
}
