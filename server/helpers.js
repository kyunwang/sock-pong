// Why not es6? well - micro performancing I guess right here

// Will break in the backend if no parameters are provided (userAgent)
exports.detectMobile = function(userAgent = navigator.userAgent) {
  return /Mobi/i.test(userAgent) || /Android/i.test(userAgent);
};

exports.generateUniqueID = function() {
  return Math.floor(Math.random() * 90000 + 10000);
};

// Helpers - I know is repeated - I did not setup lerna because this experiments is not big enough imo
exports.parseJSON = function parseJSON(data) {
  return JSON.parse(data);
};

exports.stringifyJSON = function stringifyJSON(data) {
  return JSON.stringify(data);
};

exports.readySocketData = function readySocketData(type, data) {
  const readyData = { type, data };

  const stringifiedData = JSON.stringify(readyData);
  return stringifiedData;
};
