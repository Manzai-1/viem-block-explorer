import { createPublicClient, createWalletClient, http, formatEther, parseEther } from 'https://esm.sh/viem';
import { localhost } from "https://esm.sh/viem/chains";


export class Client {
    constructor(){
        const clientObject = {chain: localhost, transport: http('http://localhost:7545')}
        this.public = createPublicClient(clientObject);
        this.wallet = createWalletClient(clientObject);
    }

    async lastBlock(){
        return parseInt(await this.public.getBlockNumber());
    }

    async walletBalance(address){
        const wei = await this.public.getBalance({address});
        return parseFloat(formatEther(wei)).toFixed(2);
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
