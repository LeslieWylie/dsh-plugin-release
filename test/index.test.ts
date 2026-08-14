import assert from 'node:assert/strict'
import test from 'node:test'
import { apply } from '../src/index.ts'

function fakeContext() {
  const tools: Array<{ definition: { name: string; execute: (args: Record<string, unknown>) => Promise<unknown> | unknown } }> = []
  return { tools: { register(definition: typeof tools[number]['definition']) { tools.push({ definition }) } }, skills: { register() {} }, registered: tools }
}

test('registers package contract and release checklist tools', () => {
  const context = fakeContext(); apply(context as never)
  assert.deepEqual(context.registered.map(x => x.definition.name), ['dsh_plugin_package_check', 'dsh_plugin_release_checklist'])
})

test('package contract reports missing release checks', async () => {
  const context = fakeContext(); apply(context as never)
  const value = await context.registered[0]!.definition.execute({ package_name: 'example', version: '0.1.0', has_main: true, has_types: true, has_build: true, has_test: false, has_license: true, has_readme: true, has_secret_scan: false }) as Record<string, unknown>
  assert.equal(value.ok, false); assert.deepEqual(value.missing, ['test', 'secret_scan'])
})

test('release checklist is side-effect free', async () => {
  const context = fakeContext(); apply(context as never)
  const value = await context.registered[1]!.definition.execute({}) as Record<string, unknown>
  assert.equal(value.ok, true); assert.match(JSON.stringify(value), /rollback/)
})
