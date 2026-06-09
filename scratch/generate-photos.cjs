const fs = require('fs');
const spans = [
  'col-span-2 row-span-2',
  'col-span-1 row-span-1',
  'col-span-1 row-span-1',
  'col-span-1 row-span-2',
  'col-span-2 row-span-1',
  'col-span-1 row-span-1',
  'col-span-2 row-span-2',
  'col-span-1 row-span-1',
  'col-span-2 row-span-1',
];
let items = [];
let spanIdx = 0;
for(let i=1; i<=28; i++) {
  items.push(`  {
    src: "/images/Gala_ancienne_edition (${i}).jpeg",
    alt: "AIESEC in Benin - Gala Archives",
    edition: "Éditions passées",
    span: "${spans[spanIdx % spans.length]}"
  }`);
  spanIdx++;
}
for(let i=1; i<=12; i++) {
  items.push(`  {
    src: "/images/gala_archive (${i}).jpg",
    alt: "AIESEC in Benin - Gala Archives",
    edition: "Éditions passées",
    span: "${spans[spanIdx % spans.length]}"
  }`);
  spanIdx++;
}
const finalStr = 'const photos: Photo[] = [\n' + items.join(',\n') + '\n]';
fs.writeFileSync('scratch/photos_new.txt', finalStr);
console.log('done');
