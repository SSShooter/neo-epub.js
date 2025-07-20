#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// 清空dist目录
const distDir = path.join(__dirname, 'dist');
if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true, force: true });
}
fs.mkdirSync(distDir, { recursive: true });

console.log('Building all versions...');

// 构建不同版本
const builds = [
  { mode: 'development', name: 'Development build' },
  { mode: 'production', name: 'Production build (minified)' }
];

builds.forEach(({ mode, name }) => {
  console.log(`\n📦 ${name}...`);
  try {
    execSync(`vite build --mode ${mode}`, { stdio: 'inherit' });
    console.log(`✅ ${name} completed`);
  } catch (error) {
    console.error(`❌ ${name} failed:`, error.message);
  }
});

console.log('\n🎉 All builds completed!');