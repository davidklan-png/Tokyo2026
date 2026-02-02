import fs from 'fs';
import path from 'path';
import heicConvert from 'heic-convert';

const photosDir = 'public/photos';

async function convertHeicToJpg(filePath) {
  try {
    const inputBuffer = fs.readFileSync(filePath);
    const outputBuffer = await heicConvert({
      buffer: inputBuffer,
      format: 'JPEG',
      quality: 0.9,
    });

    // Replace HEIC with JPG
    const jpgPath = filePath.replace(/\.heic$/i, '.jpg');
    fs.writeFileSync(jpgPath, outputBuffer);

    // Delete original HEIC file
    fs.unlinkSync(filePath);

    console.log(`Converted: ${filePath} -> ${jpgPath}`);
    return true;
  } catch (error) {
    console.error(`Error converting ${filePath}:`, error.message);
    return false;
  }
}

async function main() {
  const dateDirs = fs.readdirSync(photosDir).filter(d => d.match(/^\d{4}-\d{2}-\d{2}$/));

  for (const dateDir of dateDirs) {
    const dirPath = path.join(photosDir, dateDir);
    const files = fs.readdirSync(dirPath);

    for (const file of files) {
      const filePath = path.join(dirPath, file);
      const stat = fs.statSync(filePath);

      if (stat.isFile() && file.toLowerCase().endsWith('.heic')) {
        await convertHeicToJpg(filePath);
      }
    }
  }

  console.log('Conversion complete!');
}

main().catch(console.error);
