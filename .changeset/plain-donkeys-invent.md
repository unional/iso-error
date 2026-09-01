---
'iso-error': patch
'iso-error-web': patch
'iso-error-google-cloud-api': patch
'google-cloud-api': patch
---

Rebuild with tsdown, and fix the `exports` map.

The four packages are now built by tsdown (rolldown) instead of `tsc`, so the
emitted JavaScript changes even though every published path, every export name
and the CommonJS `__esModule` marker stay exactly as they were.

The `exports` map used a `type` condition, which is not a thing — the condition
Node and TypeScript look for is `types`. Type resolution therefore fell back to
the top-level `types` field, which pointed at the CommonJS declarations for both
entry points. `import` now resolves `esm/index.d.ts` and `require` resolves
`cjs/index.d.ts`.

No API change: the exported names are identical to the previous release, checked
against the published tarballs for all four packages.
