import { Client } from "./utils/client.js";

const searchForm = document.querySelector('#transaction-form');
const addressField = document.querySelector('#address');
const blockNumberField = document.querySelector('#latest-block');
const balanceField = document.querySelector('#balance');

let client = undefined;

const initApp = ()=>{
    client = new Client();
    client.lastBlock().then(blockNr => displayBlockNumber(blockNr));
}

const displayBlockNumber = (blockNr)=>{
    blockNumberField.textContent = `Total Blocks: ${blockNr}`;
}

const displayBalance = (balance)=>{
    balanceField.textContent = `Current Balance: ${balance} ETH`;
}

const handleSearch = async(e)=>{
    e.preventDefault();
    displayBalance(await client.walletBalance(addressField.value));
}

searchForm.addEventListener('submit', handleSearch);
document.addEventListener("DOMContentLoaded", initApp);