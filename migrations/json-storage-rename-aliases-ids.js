const fs = require('node:fs');
const path = require('node:path');

const dirname = {
  read: path.join(process.cwd(), 'json-storage-premigration/collection'),
  write: path.join(process.cwd(), 'json-storage/collection'),
};

const fileList = fs.readdirSync(dirname.read);

fileList.forEach((fileName) => {
  const filePath = Object.fromEntries(
    Object.entries(dirname).map(([key, dirname]) => {
      return [key, path.join(dirname, fileName)];
    })
  );

  const fileText = fs.readFileSync(filePath.read, 'utf-8');
  fs.writeFileSync(filePath.write, fileText.replace('"aliases"', '"ids"'));
});
