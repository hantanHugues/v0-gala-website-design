const fs=require('fs');
const log=fs.readFileSync('C:\\Users\\HP ELITEBOOK\\.gemini\\antigravity-ide\\brain\\04956b96-ff17-4303-b5fa-f41775bec25a\\.system_generated\\tasks\\task-33.log', 'utf8');
const map={};
const regex = /Uploaded (.*?) -> (https:\/\/res\.cloudinary\.com\/.*)/g;
let match;
while((match=regex.exec(log))!==null) {
  map[match[1]] = match[2];
}
let content = fs.readFileSync('components/gala/gallery.tsx', 'utf8');
for(const [k, v] of Object.entries(map)) {
  const searchStr = '/images/' + k;
  content = content.split(searchStr).join(v);
}
fs.writeFileSync('components/gala/gallery.tsx', content);
console.log('Restored Cloudinary URLs in gallery.tsx using exact string replacement');
