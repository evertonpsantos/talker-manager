const fs = require('fs').promises;
const path = require('path');

const jsonPath = path.resolve(__dirname, '../talker.json');

const readJson = async () => {
  const jsonList = await fs.readFile(jsonPath, 'utf-8');
  const convertedJson = JSON.parse(jsonList);
  return convertedJson;
};

module.exports = { readJson };