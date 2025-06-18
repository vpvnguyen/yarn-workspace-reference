const path = require("path");

module.exports = {
  branches: ["main"],
  tagFormat: "@vpvnguyen/yarn-workspace-reference-utils@${version}",
  plugins: [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@semantic-release/changelog",
    [
      "@semantic-release/npm",
      {
        pkgRoot: path.resolve(__dirname),
        tarballDir: "dist",
        npmPublish: true,
      },
    ],
    [
      "@semantic-release/git",
      {
        assets: ["CHANGELOG.md", "package.json"],
        message:
          "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}",
      },
    ],
    "@semantic-release/github",
  ],
};
