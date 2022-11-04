const express = require('express');
const bodyParser = require('body-parser');
const { readJson, getById, registerNewTalker, updateTalker, deleteTalker } = require('./db/talkerDB');
const { getNewToken, validateEmail, validatePassword, validateToken, 
  validateName, validateAge, validateTalk, 
  validateWatchedAt, validateRate } = require('./utils/utils');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_req, res) => {
  const talkers = await readJson();
  if (talkers) {
    return res.status(200).json(talkers);
  } 
    return res.status(400).json([]);
});

app.get('/talker/:id', async (req, res) => {
  const paramsId = req.params.id;
  const foundTalker = await getById(paramsId);
  if (foundTalker) return res.status(200).json(foundTalker);
  return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
});

app.post('/login', validateEmail, validatePassword, (req, res) => {
  const { email } = req.body;
  const newToken = getNewToken(email);
  return res.status(200).json({ token: newToken });
});

app.post('/talker', 
  validateToken, 
  validateName, 
  validateAge, 
  validateTalk, 
  validateWatchedAt, 
  validateRate, 
  async (req, res) => {
  const newTalker = req.body;
  const newRegisteredTalker = await registerNewTalker(newTalker);
  return res.status(201).json(newRegisteredTalker);
});

app.put('/talker/:id', 
  validateToken, 
  validateName, 
  validateAge, 
  validateTalk, 
  validateWatchedAt, 
  validateRate, 
  async (req, res) => {
    const paramsId = req.params.id;
    const newInfo = req.body;
    const updatedTalker = await updateTalker(paramsId, newInfo);
  return res.status(200).json(updatedTalker);
});

app.delete('/talker/:id', validateToken, async (req, res) => {
  const paramsId = req.params.id;
  const newList = await deleteTalker(paramsId);
  return res.status(204).json(newList);
});

app.listen(PORT, () => {
  console.log('Online');
});