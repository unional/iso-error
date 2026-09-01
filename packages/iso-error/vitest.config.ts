import { defineConfig } from 'vitest/config'

/**
 * The library is isomorphic, so the suite runs twice — once on node and once on jsdom —
 * exactly as the two jest projects it replaces did.
 */
export default defineConfig({
	test: {
		projects: [
			{
				test: {
					name: 'node',
					environment: 'node',
					globals: true,
					include: ['ts/**/*.spec.ts']
				}
			},
			{
				test: {
					name: 'jsdom',
					environment: 'jsdom',
					globals: true,
					include: ['ts/**/*.spec.ts']
				}
			}
		],
		coverage: {
			provider: 'v8',
			include: ['ts/**/*.ts'],
			exclude: ['ts/**/*.spec.ts', 'ts/testErrors.ts'],
			reporter: ['text', 'lcov'],
			thresholds: { statements: 100, branches: 98, functions: 100, lines: 100 }
		}
	}
})
