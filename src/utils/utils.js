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

const validateToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: 'Token não encontrado' });
  if (token.length !== 16 || typeof token !== 'string') {
    return res.status(401).json({ message: 'Token inválido' });
  }
  next();
};

const validateName = (req, res, next) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  if (name.length < 3) {
  return res.status(400)
  .json({ message: 'O "name" deve ter pelo menos 3 caracteres' }); 
  }
  next();
};

const validateAge = (req, res, next) => {
  const { age } = req.body;
  if (!age) return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  if (age <= 18) {
  return res.status(400)
  .json({ message: 'A pessoa palestrante deve ser maior de idade' }); 
  }
  next();
};

const validateWatchedAt = (req, res, next) => {
  const { watchedAt } = req.body.talk;
  const validFormat = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;
  if (!watchedAt) {
    return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' }); 
  }
  if (!validFormat.test(watchedAt)) {
      return res.status(400)
      .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' }); 
  }
  next();
};

const validateRate = (req, res, next) => {
  const { rate } = req.body.talk;
  if (rate === undefined) return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
  if (!Number.isInteger(rate)) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  if (rate < 1 || rate > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' }); 
  }
  next();
};

const validateTalk = (req, res, next) => {
  const { talk } = req.body;
  if (!talk) return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
  next();
};

module.exports = { 
  getNewToken, 
  validateEmail, 
  validatePassword,
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate };