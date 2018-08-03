/* @flow */
jest.mock('loader-utils');

const loaderUtils = require('loader-utils');
const loader = require('.');

describe('liferay-lang-key-dev-loader', () => {
	loaderUtils.getOptions.mockImplementation(({options}) => options);

	const properties = `
		foo-bar-baz=FooBarBaz
		hello-world=Hello World
		x-y-z=XYZ
	`;

	const mockWebpackContext = ({callback, options = {}}) => ({
		async: () => callback,
		addDependency: jest.fn(),
		options,
		fs: {
			readFile: jest.fn((path, cb) => cb(null, Buffer.from(properties)))
		}
	});

	const getCall = (source, options = {}) => {
		const fn = jest.fn();

		loader.call(mockWebpackContext({callback: fn, options}), source);

		return fn.mock.calls[0];
	};

	it.each([
		[
			"const x = Liferay.Language.get('hello-world');",
			'const x = "Hello World";'
		],
		[
			"const x = Liferay.language.get('hello-world');",
			"const x = Liferay.language.get('hello-world');"
		],
		[
			"const x = Liferay   .Language\n.get('hello-world');",
			'const x = "Hello World";'
		]
	])('should replace %s with %s', (source, expected) => {
		const [err, result] = getCall(source);

		expect(err).toBe(null);
		expect(result).toBe(expected);
	});
});
