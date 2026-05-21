const TIMEOUT_DELAY = 500;

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

export {isEscapeKey, debounce };
