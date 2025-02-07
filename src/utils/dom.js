export const createMessage = (message, isError=true)=>{
    const div = createElem('div');
    div.classList.add('message-div');
    if(isError) div.classList.add('error');

    const p = createElem('p');
    p.textContent = message;

    div.appendChild(p);
    return div;
}

const createElem = (type) => {
    return document.createElement(type);
}