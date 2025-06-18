// release-all.js
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const baseDir = path.resolve(__dirname, 'packages');
const packageDirs = fs.readdirSync(baseDir, { withFileTypes: true });

for (const dirent of packageDirs) {
  if (!dirent.isDirectory()) continue;

  const dirPath = path.join(baseDir, dirent.name);
  console.log(`\n🚀 Releasing package: ${dirent.name}`);

  try {
    execSync(`npx semantic-release --dry-run`, {
      cwd: dirPath,
      stdio: 'inherit',
      env: {
        ...process.env,
        SEMANTIC_RELEASE_PACKAGE: dirent.name,
      },
    });
  } catch (err) {
    console.warn(`⚠️ Skipping ${dirent.name}: ${err.message}`);
  }
}
