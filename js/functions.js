function checkLengthString(string = '', number = 1) {
  return string.length <= number;
}

function isPalindrome(string = '') {
  const normalizeString = string.replaceAll(' ', '').toLowerCase();
  const reverseString = normalizeString.split('').reverse().join('');
  return normalizeString === reverseString;
}

function getNumbers(string = '') {
  const str = String(string);
  let result = '';
  for(const sign of str) {
    if(!isNaN(parseInt(sign, 10))) {
      result += sign;
    }
  }
  return parseInt(result, 10);
}

function getTimeData (time) {
  const startWorkData = time.split(':');
  return parseInt(startWorkData[0], 10) * 60 + parseInt(startWorkData[1], 10);
}

function isMeetOvertime(startWork, endWork, startMeet, durationMeet) {
  const startWorkTime = getTimeData(startWork);
  const endWorkTime = getTimeData(endWork);
  const startMeetTime = getTimeData(startMeet);
  const endMeetTime = startMeetTime + durationMeet;
  return startMeetTime >= startWorkTime && endMeetTime <= endWorkTime;
}
