const fs = require('fs');
const path = require('path');

function jsonToStrings(jsonFilePath, outputFilePath) {
  const jsonData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));
  let stringsContent = '';

  for (const [key, value] of Object.entries(jsonData)) {
    const escapedValue = value.replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/\t/g, '\\t');
    stringsContent += `"${key}" = "${escapedValue}";

`;
  }

  fs.writeFileSync(outputFilePath, stringsContent.trim(), 'utf8');
  console.log(`Generated: ${outputFilePath}`);
}

const jsonFiles = ['en.json', 'fr.json'];

jsonFiles.forEach((file) => {
  const inputPath = path.join(__dirname, file);
  const outputPath = path.join(__dirname, file.replace('.json', '.strings'));
  jsonToStrings(inputPath, outputPath);
});
