import { writeFile } from 'node:fs/promises'
import { defineConfig } from 'tsdown'

/**
 * Two outputs, matching what the package has published since it moved off `tsc`:
 *
 * - `cjs/**` — one file per source module, plus the `cjs/package.json`
 *   `{"type":"commonjs"}` marker the `"type": "module"` package would otherwise override.
 * - `esm/**` — the same per-module shape.
 *
 * `unbundle` keeps every published path exactly where `tsc` put it, so the swap needs
 * no version bump beyond the rebuild itself.
 */
const entry = ['ts/**/*.ts', '!ts/**/*.spec.ts']

export default defineConfig([
	{
		entry,
		format: 'cjs',
		outDir: 'cjs',
		platform: 'neutral',
		target: 'es2015',
		unbundle: true,
		sourcemap: true,
		dts: { sourcemap: true },
		outExtensions: () => ({ js: '.js', dts: '.d.ts' }),
		// `tsc` marked its CommonJS output with `__esModule`, and interop in consumers
		// keys off that. Rolldown omits it unless asked.
		outputOptions: { esModule: true },
		clean: ['cjs'],
		hooks: {
			// `copy`'s `to` is treated as a directory, so it cannot write a file named
			// `cjs/package.json`. Write it after the build instead.
			'build:done': async () => {
				await writeFile('cjs/package.json', `${JSON.stringify({ type: 'commonjs' }, null, 2)}\n`)
			}
		}
	},
	{
		entry,
		format: 'esm',
		outDir: 'esm',
		platform: 'neutral',
		target: 'es2020',
		unbundle: true,
		sourcemap: true,
		dts: { sourcemap: true },
		outExtensions: () => ({ js: '.js', dts: '.d.ts' }),
		clean: ['esm']
	}
])
