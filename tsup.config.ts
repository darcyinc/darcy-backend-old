import type { Format } from 'tsup';
import { defineConfig } from 'tsup';

export function createTsupConfig({
	entry = ['src/index.ts'],
	external = [],
	noExternal = [],
	format = ['esm', 'cjs'] as Format[],
	skipNodeModulesBundle = true,
	clean = true,
	shims = false,
	minify = false,
	splitting = false,
	keepNames = true,
	dts = true,
	sourcemap = true,
	esbuildPlugins = [],
} = {}) {
	return defineConfig({
		entry,
		external,
		noExternal,
		platform: 'node',
		format,
		skipNodeModulesBundle,
		target: 'esnext',
		clean,
		shims,
		minify,
		splitting,
		keepNames,
		dts,
		sourcemap,
		esbuildPlugins,
	});
}
