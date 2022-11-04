const express = require('express');
const bodyParser = require('body-parser');
const { readJson, getById } = require('./db/talkerDB');
const getNewToken = require('./utils/utils');

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

app.post('/login', (req, res) => {
  const { email } = req.body;
  const newToken = getNewToken(email);
  res.status(200).json({ token: newToken });
});

app.listen(PORT, () => {
  console.log('Online');
});