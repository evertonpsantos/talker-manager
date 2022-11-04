const CryptoJs = require('crypto-js');

const getNewToken = (email) => {
  const wordInArray = email.split('');
  const newArray = [];
  for (let i = 0; i < wordInArray.length; i += 1) {
    const randomNumber = Math.floor(Math.random() * wordInArray.length);
    newArray.push(wordInArray[randomNumber]);
  }
  const newWord = newArray.join('');
  const newToken = CryptoJs.MD5(newWord).toString().slice(0, 16);
  return newToken;
};

module.exports = getNewToken;