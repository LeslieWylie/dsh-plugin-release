# dsh-plugin-release

面向 DeepSeek Harness 插件的通用发布卫生工具包，明确 npm/package 契约、敏感信息扫描、clean install、DSH profile 探针、CI、产物和回滚步骤。

- `dsh_plugin_package_check`：校验 npm-ready 包契约。
- `dsh_plugin_release_checklist`：生成完整发布清单，不自动发布。

```bash
npm install dsh-plugin-release
# 或：pnpm add dsh-plugin-release
```

插件通过 `package.json`、`exports`、`files`、`engines` 和 `publishConfig` 支持 npm；真正发布仍由维护者显式执行。
