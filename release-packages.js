const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const workspaces = ["packages"];
const cwd = process.cwd();

for (const workspace of workspaces) {
  const fullPath = path.resolve(cwd, workspace);
  if (!fs.existsSync(fullPath)) continue;

  const packages = fs.readdirSync(fullPath);

  for (const pkg of packages) {
    const pkgPath = path.join(fullPath, pkg);
    const pkgJsonPath = path.join(pkgPath, "package.json");

    if (!fs.existsSync(pkgJsonPath)) continue;

    console.log(`CWD: ${cwd}`);
    console.log(`\n🔍 Releasing ${workspace}/${pkg} ...`);

    try {
      execSync(
        `npx semantic-release --cwd ${pkgPath} --extends ./release.config.js`,
        {
          stdio: "inherit",
          env: {
            ...process.env,
            // Optional: pass GitHub token explicitly if needed
            // GITHUB_TOKEN: process.env.GITHUB_TOKEN,
            // NODE_AUTH_TOKEN: process.env.NODE_AUTH_TOKEN
          },
        },
      );
    } catch (e) {
      console.warn(`⚠️ Semantic release failed for ${pkg}: ${e.message}`);
    }
  }
}
