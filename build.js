import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Derive __dirname from import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to create a 'dist' directory and copy static files
const build = () => {
  const distDir = path.join(__dirname, 'dist');
  const publicDir = path.join(__dirname, 'public');

  // Check if 'public' directory exists
  if (!fs.existsSync(publicDir)) {
    console.error('=> Publish directory build does not exist!');
    return; // Exit the build process
  }

  // Create 'dist' directory if it doesn't exist
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
  }

  // Copy static files from 'public' to 'dist'
  const copyFiles = (src, dest) => {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach(file => {
      const srcFile = path.join(src, file);
      const destFile = path.join(dest, file);
      if (fs.lstatSync(srcFile).isDirectory()) {
        // Recursively copy directory
        copyFiles(srcFile, destFile);
      } else {
        // Copy file
        fs.copyFileSync(srcFile, destFile);
      }
    });
  };

  // Copy files to 'dist'
  copyFiles(publicDir, distDir);
  console.log('Build completed! Static files copied to /dist');
};

// Run the build function
build();
