> **⚠️ Archived — merged into [dsh-ops-kit](https://github.com/LeslieWylie/dsh-ops-kit)**
> This repository shipped one of five skills that used to be published as five separate packages. They are now maintained together as a single bundle so nobody has to install — and the ecosystem does not have to index — the same skill five times. Please switch to `dsh-ops-kit`.
>
> **已归档 — 已合并至 [dsh-ops-kit](https://github.com/LeslieWylie/dsh-ops-kit)**
> 本仓库此前是五个独立发布包之一，其功能现已与另外四个包一起合并维护为单一 bundle，避免同一批 skill 被拆成五份重复发布、重复索引。请改用 `dsh-ops-kit`。

---

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
