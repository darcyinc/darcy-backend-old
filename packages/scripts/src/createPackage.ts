import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { copy } from 'fs-extra';
import templateJSON from './template/template.package.json';

export async function createPackage(packageName: string, packageDescription?: string) {
	const packageDir = join('packages', packageName);

	await mkdir(packageDir);

	await mkdir(`${packageDir}/src`);

	await writeFile(
		join('packages', packageName, 'src', 'index.ts'),
		`console.log('Hi, from @darcyinc/${packageName}');`,
	);
	await writeFile(
		join('packages', packageName, '.eslintrc.json'),
		await readFile(join('packages', 'scripts', 'src', 'template', 'template.eslintrc.json'), 'utf8'),
	);

	const packageJSON = {
		...templateJSON,
		name: templateJSON.name.replace('{name}', packageName),
		description: packageDescription ?? '',
	};

	await writeFile(join('packages', packageName, `package.json`), JSON.stringify(packageJSON, null, 2));

	await copy(join('packages', 'scripts', 'src', 'template', 'default'), packageDir);
}
