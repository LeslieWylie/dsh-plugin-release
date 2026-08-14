# Architecture

`dsh-plugin-release` is a release-contract plugin, not a publisher.

- `dsh_plugin_package_check` validates the declared package contract, build/typecheck/test status, hygiene checks, and artifact presence.
- `dsh_plugin_release_checklist` exposes a repeatable contract → hygiene → validation → publication sequence.
- The skill covers npm metadata, clean-install checks, secret scanning, DSH bundle discovery, CI, artifact review, and rollback notes.
- Publishing is always an explicit operator action. The package never reads or writes npm tokens and never pushes to a remote by itself.

The contract is usable for public npm packages, private registries, or an internal mirror.
