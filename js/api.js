const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';

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

function loads(route, errorText, method = Method.GET, body = null){
  fetch(`${BASE_URL}${route}`{method, body})
  .then((response) => {
    if(!response.ok){
      throw new Error()
    }
    return response.json();
  })
  .catch(() => {
    throw new Error(errorText);
  });
}

function getData(){loads(Routes.GET_DATA, ErrorText.GET_DATA)}

function setData(body){loads(Routes.SEND_DATA, ErrorText.SEND_DATA, Method.POST, body)}

export { getData, setData };
