const fs = require('fs');
const path = require('path');

const username = 'YOUR_USERNAME'; // replace with your GitHub username
const repo = 'sports-images';     // your repo name
const branch = 'main';            // usually 'main'

const baseUrl = `https://raw.githubusercontent.com/${username}/${repo}/${branch}`;

// Function to generate URLs for a single folder
function getImages(folder) {
  const files = fs.readdirSync(folder);
  const urls = files
    .filter(file => !fs.statSync(path.join(folder, file)).isDirectory()) // only files
    .map(file => `${baseUrl}/${folder.replace(/\\/g, '/')}/${file}`);
  return urls;
}

// Read all folders in the main directory
const folders = fs.readdirSync('.');
const images = {};

folders.forEach(folder => {
  if (fs.statSync(folder).isDirectory()) {
    images[folder] = getImages(folder);
  }
});

console.log(JSON.stringify(images, null, 2));
