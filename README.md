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
    "@yarn-workspace-reference/ui": "workspace:^"
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

