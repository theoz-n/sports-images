const fs = require('fs');
const path = require('path');

const username = 'theoz-n'; // replace with your GitHub username
const repo = 'sports-images';     // your repo name
const branch = 'main';            // usually 'main'

const baseUrl = `https://raw.githubusercontent.com/${username}/${repo}/${branch}`;

function walkDir(dir, obj) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      obj[file] = [];
      walkDir(fullPath, obj[file]);
    } else {
      const relativePath = fullPath.replace(__dirname + path.sep, '').replace(/\\/g, '/');
      obj.push(`${baseUrl}/${relativePath}`);
    }
  });
}

const images = {};
walkDir('.', images);

console.log(JSON.stringify(images, null, 2));
