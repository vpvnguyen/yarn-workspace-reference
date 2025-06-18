const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const baseDir = path.resolve(__dirname, "packages");
const dirs = fs.readdirSync(baseDir).filter((name) => {
  const pkgPath = path.join(baseDir, name, "package.json");
  return fs.existsSync(pkgPath);
});

dirs.forEach((dir) => {
  const packageDir = path.join(baseDir, dir);
  console.log(`\n Releasing package: ${dir}`);

  try {
    execSync(`npx semantic-release --extends ./release.config.js`, {
      cwd: packageDir,
      stdio: "inherit",
      env: {
        ...process.env,
        // Optional: pass GitHub token explicitly if needed
        // GITHUB_TOKEN: process.env.GITHUB_TOKEN,
        // NODE_AUTH_TOKEN: process.env.NODE_AUTH_TOKEN
      },
    });
  } catch (error) {
    console.warn(
      `[warn] Skipping ${dir} due to error or no release: ${error?.message}`,
    );
  }
});
