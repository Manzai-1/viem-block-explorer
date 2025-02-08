export const createErrorMessage = (message)=>{
    const div = createMessage(message);
    div.classList.add('error');
    return div;
}

export const createMessage = (message)=>{
    const div = createElem('div');
    div.classList.add('message-div');

    const p = createElem('p');
    p.textContent = message;

    div.appendChild(p);
    return div;
}

const createElem = (type) => {
    return document.createElement(type);
}