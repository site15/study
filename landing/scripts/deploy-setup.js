#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Get GitHub username from command line argument or prompt
const githubUsername = process.argv[2];

if (!githubUsername) {
  console.log('Usage: node scripts/deploy-setup.js <site15>');
  console.log('Example: node scripts/deploy-setup.js johnsmith');
  process.exit(1);
}

const packageJsonPath = path.join(__dirname, '..', 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

// Update homepage URL
packageJson.homepage = `https://${githubUsername}.github.io/study`;

// Write updated package.json
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

console.log(`✅ Updated homepage to: ${packageJson.homepage}`);
console.log('\nNext steps:');
console.log('1. Commit the changes:');
console.log('   git add package.json');
console.log('   git commit -m "Update homepage URL for GitHub Pages"');
console.log('2. Deploy to GitHub Pages:');
console.log('   npm run deploy');