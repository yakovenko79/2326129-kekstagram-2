const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';


const errorTemplate = document.querySelector('#data-error');

const Routes = {
  GET_DATA: '/data',
  SEND_DATA: '/'
};

const Method = {
  GET: 'GET',
  POST: 'POST'
};

const ErrorText = {
  GET_DATA: 'Не удалось загрузить данные. Попробуйте обновить страницу',
  SEND_DATA: 'Не удалось отправить форму. Попробуйте ещё раз',
};

function showDataError(message) {
  const errorMessage = errorTemplate.content.cloneNode(true).firstElementChild;
  const titleElement = errorMessage.querySelector('.data-error__title');
  titleElement.textContent = message;
  document.body.appendChild(errorMessage);
  setTimeout(() => {
    errorMessage.remove();
  }, 5000);
}

function load(route, errorText, method = Method.GET, body = null){
  return fetch(`${BASE_URL}${route}`, {method, body})
    .then((response) => {
      if(!response.ok) {
        throw new Error(errorText);
      }
      return response.json();
    })
    .catch((err) => {
      throw err;
    });
}

function getData(){
  return load(Routes.GET_DATA, ErrorText.GET_DATA);
}

function sendData(body){
  return load(Routes.SEND_DATA, ErrorText.SEND_DATA, Method.POST, body);
}

export { getData, sendData, showDataError, ErrorText };
