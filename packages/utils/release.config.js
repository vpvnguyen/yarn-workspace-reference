module.exports = {
  branches: ["main"],
  tagFormat: "@vpvnguyen/yarn-workspace-reference-utils-v${version}",
  plugins: [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@semantic-release/changelog",
    "@semantic-release/github",
    "@semantic-release/git",
    [
      "@semantic-release/exec",
      {
        prepareCmd:
          "yarn version --new-version ${nextRelease.version} --no-git-tag-version",
        publishCmd: "yarn npm publish",
      },
    ],
  ],
};
