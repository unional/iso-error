import { defineConfig } from 'vitest/config'

export default defineConfig({
	test: {
		globals: true,
		include: ['ts/**/*.spec.ts'],
		coverage: {
			provider: 'v8',
			include: ['ts/**/*.ts'],
			// Re-export barrels and the pure type modules have no statements to cover;
			// counting them says nothing about the library.
			exclude: [
				'ts/**/*.spec.ts',
				'ts/**/test-utils/**',
				'ts/index.ts',
				'ts/protobuf/index.ts',
				'ts/protobuf/protobuf.ts',
				'ts/rpc/index.ts',
				'ts/rpc/rpc.ts',
				'ts/rpc/types.ts'
			],
			reporter: ['text', ['lcovonly', { projectRoot: '../..' }]],
			thresholds: { statements: 97, branches: 66, functions: 100, lines: 98 }
		}
	}
})
