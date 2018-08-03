/* @flow */
const fs = require('fs');
const path = require('path');
const loaderUtils = require('loader-utils');
const properties = require('properties');

/* ::
type Options = {
	path?: string,
	regex?: RegExp
}
*/

/**
 * Default path to the language properties file
 * @type {string}
 */
const LANG_KEY_PATH = path.resolve(
	'src',
	'main',
	'resources',
	'content',
	'Language.properties'
);

/**
 * Regex used to extract calls to Liferay.Language.get and the
 * associated key
 * @type {RegExp}
 */
const REGEX = /Liferay\s*\.Language\s*\.get\(\s*'(.*?)'\s*\)/g;

module.exports = function(source /* : string */) {
	const {path = LANG_KEY_PATH, regex = REGEX} /* : Options */ =
		loaderUtils.getOptions(this) || {};

	this.addDependency(path);

	const callback = this.async();

	const fileSystem = this.fs || fs;

	fileSystem.readFile(path, (err, buffer) => {
		if (err) {
			callback(err);
		}

		const keys = properties.parse(buffer.toString('utf8')) || {};

		const result = source.replace(regex, (match, key) =>
			JSON.stringify(keys[key] || key)
		);

		callback(null, result);
	});
};
