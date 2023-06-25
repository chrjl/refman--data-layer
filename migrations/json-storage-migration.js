const fs = require('node:fs/promises');
const path = require('node:path');

const dirname = {
  read: path.join(process.cwd(), 'json-storage-premigration/entries'),
  write: path.join(process.cwd(), 'json-storage/collection'),
};

console.log(dirname);

fs.readdir(dirname.read).then((files) => {
  files.forEach((file) => {
    const readPath = path.join(dirname.read, file);
    const writePath = path.join(dirname.write, file);

    parseFile(readPath).then((content) => {
      // transform fields
      content.ids = [path.parse(file).name];
      delete content.id;

      if ('publisher' in content) {
        content.publisher = [content.publisher];
      }

      if ('online' in content) {
        if (content.type) content.entrysubtype = content.type;

        content.type = 'online';
        delete content.online;
      }

      if ('issued' in content) {
        content.date = content.issued;
        delete content.issued;
      }

      if ('accessed' in content) {
        content.urldate = content.accessed;
        delete content.accessed;
      }

      // order fields
      const firstKeys = ['title', 'edition', 'author', 'publisher', 'url', 'type', 'entrysubtype'];
      const lastKeys = ['ids', 'keywords']

      const headObj = {};
      const tailObj = {};

      firstKeys.forEach(key => {
        if (key in content) {
          headObj[key] = content[key];
          delete content[key];
        }
      })

      lastKeys.forEach(key => {
        if (key in content) {
          tailObj[key] = content[key];
          delete content[key];
        }
      })

      const orderedContent = {...headObj, ...content, ...tailObj}

      // write new file
      fs.writeFile(writePath, JSON.stringify({...orderedContent, ...content}));
    });
  });
});

async function parseFile(fileName) {
  const fileContent = await fs.readFile(fileName, 'utf-8');
  return JSON.parse(fileContent);
}
