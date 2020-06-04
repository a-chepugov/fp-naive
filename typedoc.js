const packageJson = require('./package');

module.exports = {
	name: packageJson.name,
	includeVersion: true,
	toc: true,
	readme: "none",
	theme: "minimal",

	mode: "file",
	inputFiles: ['./source/index'],
	out: './docs',

	includeDeclarations: true,
	excludePrivate: true,
	excludeProtected: true,
	excludeNotExported: true,
	excludeExternals: true,
	listInvalidSymbolLinks: true,
	hideGenerator: true,
	categorizeByGroup: true,
};
