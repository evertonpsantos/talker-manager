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

const registerNewTalker = async (newTalker) => {
  const talkerList = await readJson();
  const newId = talkerList[talkerList.length - 1].id + 1;
  const newObj = { id: newId, ...newTalker };
  talkerList.push(newObj);
  await fs.writeFile(jsonPath, JSON.stringify(talkerList));
  return newObj;
};

module.exports = { readJson, getById, registerNewTalker };