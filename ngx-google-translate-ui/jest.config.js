module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	testMatch: ['**/*.+(spec.ts)'],
	transform: {
		'^.+\\.ts?$': 'ts-jest'
	},
	transformIgnorePatterns: ['<rootDir>/node_modules/']
}
