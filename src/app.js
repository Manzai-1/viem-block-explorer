import { Client } from "./utils/client.js";

const searchForm = document.querySelector('#search-form');
const transactionForm = document.querySelector('#transaction-form');
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

const handleCreateTransaction = async(e)=>{
    e.preventDefault();
    const formData = new FormData(transactionForm);
    client.createTransaction(Object.fromEntries(formData));
}

searchForm.addEventListener('submit', handleSearch);
transactionForm.addEventListener('submit', handleCreateTransaction);
document.addEventListener("DOMContentLoaded", initApp);