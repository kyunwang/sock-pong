// Why not es6? well - micro performancing I guess right here
export function detectMobile(userAgent = navigator.userAgent) {
  return /Mobi/i.test(userAgent) || /Android/i.test(userAgent);
}

export function generateUniqueID() {
  return Math.floor(Math.random() * 90000 + 10000);
}

export function hasGyroscope() {}

// Helpers - I know is repeated - I did not setup lerna because this experiments is not big enough imo
export function parseJSON(data) {
  return JSON.parse(data);
}

export function stringifyJSON(data) {
  return JSON.stringify(data);
}

export function readySocketData(type, data) {
  const readyData = { type, data };

  const stringifiedData = JSON.stringify(readyData);
  return stringifiedData;
}
