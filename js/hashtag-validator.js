const MAX_HASHTAG_SYMBOLS = 20;
const MAX_HASHTAGS = 5;


let errorMessage = '';

function error() {
  return errorMessage;
}

function isHashtagValid(value){
  errorMessage = '';
  const inputText = value.toLowerCase().trim();

  if(inputText.lenght === 0){
    return true;
  }

  const inputTextsArray = inputText.split(/\s+/);

  const validateRules = [
    {
      check: inputTextsArray.some((item) => item === '#'),
      error: 'Хештег не может состоять только из решетки'
    },
    {
      check: inputTextsArray.some((item) => item.slice(1).includes('#')),
      error: 'Хештеги разделяются пробелами'
    },
    {
      check: inputTextsArray.some((item) => item[0] !== '#'),
      error: 'Хештег должен начинаться с символа "#"'
    },
    {
      check: inputTextsArray.some((item, num, array) => array.includes(item, num + 1)),
      error: 'Хештеги не должны повторяться'
    },
    {
      check: inputTextsArray.some((item) => item.length > MAX_HASHTAG_SYMBOLS),
      error: `Хештег должен содержать не более ${MAX_HASHTAG_SYMBOLS} символов, включая "#"`
    },
    {
      check: inputTextsArray.length > MAX_HASHTAGS,
      error: `Максимально допустимое количество хештегов - ${MAX_HASHTAGS}`
    },
    {
      check: inputTextsArray.some((item) => !/^#[a-zа-яё0-9]{1,19}$/i.test(item)),
      error: 'Хештег содержит недопустимые символы'
    }
  ];

  return validateRules.every((rule) => {
    const isInvalid = rule.check;
    if(isInvalid){
      errorMessage = rule.error;
    }
    return !isInvalid;
  });
}

export { isHashtagValid, error };
