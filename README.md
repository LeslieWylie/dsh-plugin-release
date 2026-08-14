# dsh-plugin-release

Portable release hygiene for DeepSeek Harness plugins. It makes the npm/package contract, secret scan, clean install, DSH profile probe, CI, artifact, and rollback steps explicit.

Tools:

- `dsh_plugin_package_check`: validate an npm-ready package contract from declared checks.
- `dsh_plugin_release_checklist`: produce the full release checklist without publishing.

```bash
npm install dsh-plugin-release
# or: pnpm add dsh-plugin-release
```

The package supports npm publication through `package.json`, `exports`, `files`, `engines`, and `publishConfig`; publication itself remains an explicit maintainer action.

```bash
npm run build && npm run typecheck && npm test && npm pack --dry-run
```
