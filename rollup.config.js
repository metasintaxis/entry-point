import lwc from '@lwc/rollup-plugin';
import replace from '@rollup/plugin-replace';
import run from '@rollup/plugin-run';

const dev = process.env.NODE_ENV !== 'production';

export default [
	{
		input: 'src/lwc/main.js',

		output: {
			file: 'src/client/dist/index.js',
			format: 'umd'
		},

		plugins: [
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
