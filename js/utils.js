const TIMEOUT_DELAY = 500;

function getRandomNumber(minValue, maxValue) {
  const lower = Math.ceil(Math.min(minValue, maxValue));
  const upper = Math.floor(Math.max(minValue, maxValue));

  let previous = -1;
  return () => {
    const result = Math.floor(Math.random() * (upper - lower + 1) + lower);
    if(previous !== result) {
      previous = result;
      return result;
    }
    return result === upper ? lower : result + 1;
  };
}

function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function isEscapeKey(evt) {
  return evt.key === 'Escape';
}

function debounce (callback, timeoutDelay = TIMEOUT_DELAY) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export {getRandomElement, getRandomNumber, isEscapeKey, debounce };
