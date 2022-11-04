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

const updateTalker = async (id, newInfo) => {
  const talkerList = await readJson();
  const talkerToUpdate = talkerList.findIndex((talker) => talker.id === Number(id));
  talkerList[talkerToUpdate] = { id: Number(id), ...newInfo };
  await fs.writeFile(jsonPath, JSON.stringify(talkerList));
  return talkerList[talkerToUpdate];
};

const deleteTalker = async (id) => {
  const talkerList = await readJson();
  const filteredList = talkerList.filter((talker) => talker.id !== Number(id));
  await fs.writeFile(jsonPath, JSON.stringify(filteredList));
  return filteredList;
};

module.exports = { readJson, getById, registerNewTalker, updateTalker, deleteTalker };