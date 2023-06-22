const resultNode = document.querySelector('.j-result');


const btnNode = document.querySelector('.j-btn-request');


const useRequest = (page, limit) => {
    return fetch(`https://picsum.photos/v2/list?page=${page}&limit=${limit}`)
    .then((response) => {
        return response.json();
    })
    .then((json) => {   
        return json;
    })
    .catch(() => { console.log('error') });
}


function displayResult(apiData) {
    let cards = '';
    apiData.forEach(item => {
    const cardBlock = `
        <div class="card">
        <img
            src="${item.download_url}"
            class="card-image"
        />
        <p>${item.author}</p>
        </div>
    `;
    cards = cards + cardBlock;
    });
    resultNode.innerHTML = cards;
}


const lastRequestResult = JSON.parse(localStorage.getItem('lastRequestResult'));
if (lastRequestResult) {
    displayResult(JSON.parse(localStorage.getItem('lastRequestResult')));
}


btnNode.addEventListener('click', async () => {


    let page = document.getElementById('page').value;
    let limit = document.getElementById('limit').value;

    
    const requestResult = await useRequest(page,limit);

      
    const flagPage = (page > 0 && page < 11) ? true : false; 
    const flagLimit = (limit > 0 && limit < 11) ? true : false; 
    
    if (flagPage && flagLimit ) {    
        
        displayResult(requestResult);      
        localStorage.setItem('lastRequestResult', JSON.stringify(requestResult));         
    } else {

        if (!flagPage && flagLimit) {resultNode.innerHTML = 'Номер страницы вне диапазона от 1 до 10';}; 
        if (flagPage && !flagLimit) {resultNode.innerHTML = 'Лимит вне диапазона от 1 до 10';};   
        if (!flagPage && !flagLimit) {resultNode.innerHTML = 'Номер страницы и лимит вне диапазона от 1 до 10';};
    }; 

});