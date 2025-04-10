import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const url = 'https://lottie.host/2e947f5b-119b-4b9a-8b5d-7ee168361537/eJBWCuHWGt.json';
const outputDir = path.join(__dirname, '..', 'public', 'animations');
const outputFile = path.join(outputDir, 'developer-animation.json');

// Create the animations directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function downloadAnimation() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to download: ${response.status}`);
    }
    const data = await response.json();
    fs.writeFileSync(outputFile, JSON.stringify(data, null, 2));
    console.log('Animation downloaded successfully');
  } catch (err) {
    console.error('Error downloading animation:', err.message);
  }
}

downloadAnimation(); 