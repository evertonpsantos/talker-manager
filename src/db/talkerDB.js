const fs = require('fs').promises;
const path = require('path');

const jsonPath = path.resolve(__dirname, '../talker.json');

const readJson = async () => {
  const jsonList = await fs.readFile(jsonPath, 'utf-8');
  const convertedJson = JSON.parse(jsonList);
  return convertedJson;
};

const getById = async (id) => {
  const talkers = await readJson();
  const talkerById = talkers.find((talker) => talker.id === Number(id));
  return talkerById;
};

module.exports = { readJson, getById };