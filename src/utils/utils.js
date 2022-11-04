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

const validateEmail = (req, res, next) => {
  const { email } = req.body;
  const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  if (!email) return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  if (!emailRegex.test(email)) {
  return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' }); 
  }
  next();
};

const validatePassword = (req, res, next) => {
  const { password } = req.body;
  if (!password) return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  if (password.length < 6) {
  return res.status(400)
    .json({ message: 'O "password" deve ter pelo menos 6 caracteres' }); 
  }
  next();
};

module.exports = { getNewToken, validateEmail, validatePassword };