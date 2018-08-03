# `liferay-lang-key-dev-loader`

A webpack loader that will inline your Liferay Portal language keys in your
source files. This is particularly useful if you are using the
[`webpack-dev-server`](https://github.com/webpack/webpack-dev-server).

## Usage

Configure the loader to be used in your development builds:

```js
/* webpack.config.js */
module.exports = {
	devServer: {
		port: 3000,
		proxy: {
			'**': 'http://0.0.0.0:8080'
		},
	},
	devtool: 'inline-source-map',
	mode: 'development',
	module: {
		rules: [
			{
				loader: 'liferay-lang-key-dev-loader',
				test: /\.js$/
			}
		]
	},
};
```

## Options

### `path`

| Type | Default |
| ---- | ------- |
| `string` | `src/main/resources/content/Language.properties` |

The path to your `Language.properties` file.

### `regex`

| Type |
| ---- |
| `RegeExp` |

The regex used to match uses of `Liferay.Language.get`.

## LICENSE

MIT
