import { Client } from "./utils/client.js";

const form = document.querySelector('#transaction-form');

let client = undefined;

const initApp = ()=>{
    client = new Client();
}

const handleCreateTransaction = async(e)=>{
    e.preventDefault();
    const formData = new FormData(form);
    client.createTransaction(Object.fromEntries(formData));
}

form.addEventListener('submit', handleCreateTransaction);
document.addEventListener('DOMContentLoaded', initApp);