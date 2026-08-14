import { readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineTool } from '@deepseek-ai/dsh-tools';
const PACKAGE_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SKILL_PATH = 'skills/dsh-plugin-release/SKILL.md';
const SKILL = {
    name: 'dsh-plugin-release',
    description: 'Portable DSH package, installation, release, and rollback guidance.',
    whenToUse: 'Load when packaging, validating, or publishing a DSH plugin.',
    source: 'dsh-plugin-release',
    path: join(PACKAGE_ROOT, SKILL_PATH),
    content: readFileSync(join(PACKAGE_ROOT, SKILL_PATH), 'utf8'),
    invocation: { modelInvocable: true, userInvocable: true },
};
const asJson = (value) => value;
export function apply(ctx) {
    ctx.skills.register(SKILL);
    ctx.tools.register(defineTool({
        name: 'dsh_plugin_package_check',
        description: 'Check an npm-ready DSH package contract from declared booleans; it does not publish or modify files.',
        parameters: {
            package_name: { type: 'string', required: true }, version: { type: 'string', required: true },
            has_main: { type: 'boolean', required: true }, has_types: { type: 'boolean', required: true }, has_build: { type: 'boolean', required: true },
            has_test: { type: 'boolean', required: true }, has_license: { type: 'boolean', required: true }, has_readme: { type: 'boolean', required: true }, has_secret_scan: { type: 'boolean', required: true },
        },
        output: { schema: { type: 'json' }, render: (_args, value) => [{ type: 'text', text: JSON.stringify(value, null, 2) }] },
        execute: args => {
            const checks = { name: Boolean(args.package_name), version: Boolean(args.version), main: Boolean(args.has_main), types: Boolean(args.has_types), build: Boolean(args.has_build), test: Boolean(args.has_test), license: Boolean(args.has_license), readme: Boolean(args.has_readme), secret_scan: Boolean(args.has_secret_scan) };
            const missing = Object.entries(checks).filter(([, value]) => !value).map(([key]) => key);
            return Promise.resolve(asJson({ ok: missing.length === 0, package_name: String(args.package_name), version: String(args.version), checks, missing, publish_contract: ['npm pack --dry-run', 'install from clean directory', 'live DSH profile probe', 'rollback documented'] }));
        },
    }));
    ctx.tools.register(defineTool({
        name: 'dsh_plugin_release_checklist',
        description: 'Return the complete release checklist for a DSH plugin without publishing or changing repository state.',
        parameters: {},
        output: { schema: { type: 'json' }, render: (_args, value) => [{ type: 'text', text: JSON.stringify(value, null, 2) }] },
        execute: () => Promise.resolve(asJson({ ok: true, phases: [
                { id: 'contract', items: ['package name/version/main/types', 'DSH bundle patch', 'README and license'] },
                { id: 'hygiene', items: ['scan secrets', 'remove machine paths', 'review files allowlist', 'check dependencies'] },
                { id: 'validation', items: ['clean install', 'build', 'typecheck', 'unit tests', 'npm pack --dry-run', 'live profile HTTP and tool probe'] },
                { id: 'publication', items: ['commit and tag', 'publish package or repository', 'record CI and artifact', 'document rollback'] },
            ], non_goals: ['no credential handling', 'no automatic remote writes', 'no claim of official authorship'] })),
    }));
}
//# sourceMappingURL=index.js.map