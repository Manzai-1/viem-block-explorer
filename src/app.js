import { Client } from "./utils/client.js";
import { createMessage, createErrorMessage } from "./utils/dom.js";

const searchForm = document.querySelector('#search-form');
const transactionForm = document.querySelector('#transaction-form');
const addressField = document.querySelector('#address');
const blockNumberField = document.querySelector('#latest-block');
const balanceField = document.querySelector('#balance');

let client = undefined;

const initApp = ()=>{
    client = new Client();
    loadBlockNumber();
}

const loadBlockNumber = async()=>{
    const response = await client.lastBlock();
    response.success ? 
        displayBlockNumber(response.value) : 
        displayMessage('header-error', createErrorMessage(response.value));
}

const displayBlockNumber = (blockNr)=>{
    blockNumberField.textContent = `Total Blocks: ${blockNr}`;
}

const displayBalance = (balance)=>{
    balanceField.textContent = `Current Balance: ${balance} ETH`;
}

const displayMessage = (divID, msgDiv)=>{
    const div = document.querySelector(`#${divID}`);
    div.appendChild(msgDiv);

    setTimeout(()=>{
        div.innerHTML = '';
    }, 5000);
}

const handleSearch = async(e)=>{
    e.preventDefault();

    const response = await client.walletBalance(addressField.value);
    response.success ? 
        displayBalance(response.value) : 
        displayMessage('balance-error', createErrorMessage(response.value));
}

const handleCreateTransaction = async(e)=>{
    e.preventDefault();

    const formData = new FormData(transactionForm);
    const response = await client.createTransaction(Object.fromEntries(formData));
    response.success ? 
        displayMessage('transaction-message', createMessage(response.value)): 
        displayMessage('transaction-message', createErrorMessage(response.value));

    loadBlockNumber();
}

searchForm.addEventListener('submit', handleSearch);
transactionForm.addEventListener('submit', handleCreateTransaction);
document.addEventListener("DOMContentLoaded", initApp);