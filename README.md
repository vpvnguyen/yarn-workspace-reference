# yarn-workspace-reference

Ref: https://yarnpkg.com/features/workspaces

## Init
- Init yarn in root
```zsh
yarn init
```
- Make 2 separate directorys in root:
```zsh
mkdir apps/vite
mkdir packages/ui
```
- Declare workspaces in `package.json`
```json
{
  "workspaces": ["apps/*", "packages/*"]
}
```
- Init each new directory
```zsh
cd apps/vite
yarn init
```
```zsh
cd packages/ui
yarn init
```
- Use dependencies from `packages/` in `apps/` (i.e.: `packages/ui` in `apps/vite`)
- In `apps/vite/package.json`, declare dependency:
```json
{
  "dependencies": {
    "@vpvnguyen/yarn-workspace-reference-ui": "workspace:^"
  }
}
```
- Link workspaces together
```zsh
yarn install
```

## Development
- Setup in root
```zsh
corepack enable
corepack prepare
yarn install
```

## Private NPM Registry

### Configure the Package for Publishing

`/packages/ui/package.json`:
```
{
  "name": "@vpvnguyen/yarn-workspace-reference-ui",
  "version": "1.0.0",
  "main": "dist/index.js",
  "module": "dist/index.mjs",
  "files": [
    "dist"
  ],
  "scripts": {
    "build": "vite build"
  },
  "publishConfig": {
    "registry": "https://npm.pkg.github.com/"
  }
}
```

### Vite Config

`/packages/ui/vite.config.js`:
```
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.js', // Adjust as needed
      name: 'ui',
      fileName: (format) => `ui.${format}.js`
    }
  }
});

```

### Authenticate with GitHub Packages

To publish to GitHub Packages, you need a GitHub token with `write:packages` and repo scope.

Generate `.npmrc` in your project root:

```
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN
@yarn-workspace-reference:registry=https://npm.pkg.github.com/

```
- Replace `YOUR_GITHUB_TOKEN` with your actual token, and `@yarn-workspace-reference` with your GitHub username or org.
- Never commit `.npmrc` with your token. Use `.npmrc` locally or set the token in CI/CD (like GitHub Actions).

### Publish Script
```
cd packages/ui
yarn build
yarn npm publish --access restricted
```

### Use GitHub Actions to Automate Publishing

Create `.github/workflows/publish.yml`

```yaml
name: Publish Package

on:
  push:
    branches:
      - main

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - uses: actions/setup-node@v3
        with:
          node-version: 22
          registry-url: 'https://npm.pkg.github.com/'

      - name: Install dependencies
        run: yarn install

      - name: Build package
        run: yarn workspace @vpvnguyen/yarn-workspace-reference-ui run build

      - name: Publish package
        run: yarn workspace @vpvnguyen/yarn-workspace-reference-ui npm publish --access restricted
        env:
          NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}

```
