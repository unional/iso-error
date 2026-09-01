import { defineConfig } from 'vitest/config'

export default defineConfig({
	test: {
		globals: true,
		include: ['ts/**/*.spec.ts'],
		coverage: {
			provider: 'v8',
			include: ['ts/**/*.ts'],
			exclude: ['ts/**/*.spec.ts', 'ts/**/test-utils/**', 'ts/testErrors.ts'],
			reporter: ['text', ['lcovonly', { projectRoot: '../..' }]],
			thresholds: { statements: 90, branches: 50, functions: 100, lines: 100 }
		}
	}
})
