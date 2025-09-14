const fs = require('fs').promises;
const path = require('path');
const crypto = require('crypto');

function getPath(hash, directoryOnly, relativeOnly) {
  const level_1 = hashed.slice(0, 1);
  const level_2 = hashed.slice(1, 3);
  const dir = `./data/filesystem/${level_1}/${level_2}/${!directoryOnly ? hashed : ''}`;
  if (relativeOnly) return path.posix.join('database', dir);
  return path.join(__dirname, dir);
}

async function saveFile(buffer, mimeType) {
  const hash = crypto.createHash('sha256').update(buffer).digest('hex') + '-' + Buffer.from(mimeType).toString('hex');
  if (!fs.exists(getPath(hash))) {
    try {
      await fs.mkdir(getPath(hash, true), {recursive: true});
    }
    catch (error) {}
    fs.writeFile(getPath(hash), buffer);
  }
  return hash
}

async function deleteFile(hashed) {
  await fs.unlink(getPath(hashed));
}

module.exports = {saveFile, deleteFile, getPath};
