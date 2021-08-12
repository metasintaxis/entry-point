import lwc from '@lwc/rollup-plugin';
import replace from '@rollup/plugin-replace';
import run from '@rollup/plugin-run';
import resolve from '@rollup/plugin-node-resolve';

const dev = process.env.NODE_ENV !== 'production';

// const outputDir = path.resolve(__dirname, `./src/dist`);
// const input = path.resolve(__dirname, './src/index.js');

export default [
	{
		input: 'src/lwc/main.js',

		output: {
			file: 'src/client/dist/index.js',
			format: 'iife'
		},

		plugins: [
			{
				resolveId(id) {
					if (id === 'lwc') {
						return require('lwc').getModulePath('engine');
					} else if (id === '@lwc/wire-service') {
						return require('lwc').getModulePath('wire-service');
					} else if (id === '@lwc/synthetic-shadow') {
						return require('lwc').getModulePath('synthetic-shadow');
					}
				}
			},
			replace({
				'process.env.NODE_ENV': JSON.stringify('development'),
				preventAssignment: true
			}),
			lwc()
		]
	},
	{
		input: 'src/server/index.js',

		output: {
			file: 'src/server/dist/index.js',
			format: 'cjs'
		},
		plugins: [dev && run()]
	}
];
