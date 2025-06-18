module.exports = {
  branches: ["main"],
  tagFormat: "@vpvnguyen/yarn-workspace-reference-utils-v${version}",
  plugins: [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@semantic-release/changelog",
    "@semantic-release/npm",
    "@semantic-release/github",
    "@semantic-release/git",
  ],
};
