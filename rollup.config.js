import lwc from '@lwc/rollup-plugin';
import replace from '@rollup/plugin-replace';
import run from '@rollup/plugin-run';
import path from 'path';
import resolve from '@rollup/plugin-node-resolve';

const dev = process.env.NODE_ENV !== 'production';

const lwcInputDir = path.resolve(__dirname, 'src/lwc/');
const lwcInput = path.join(lwcInputDir, 'main.js');
const lwcOutputDir = path.resolve(__dirname, 'src/client/dist/');
const lwcOutput = {
	file: path.join(lwcOutputDir, 'index.js'),
	format: 'iife'
};

const serverInputDir = path.resolve(__dirname, 'src/server/');
const serverInput = path.join(serverInputDir, 'index.js');
const serverOutputDir = path.resolve(__dirname, 'src/server/dist/');
const serverOutput = {
	file: path.join(serverOutputDir, 'index.js'),
	format: 'cjs'
};
const resolveLWCModules = {
	resolveId(id) {
		if (id === 'lwc') {
			return require('lwc').getModulePath('engine');
		} else if (id === '@lwc/wire-service') {
			return require('lwc').getModulePath('wire-service');
		} else if (id === '@lwc/synthetic-shadow') {
			return require('lwc').getModulePath('synthetic-shadow');
		} else if (id === '@lwc/engine-dom') {
			return require('lwc').getModulePath('engine-dom');
		} else if (id === '@lwc/router') {
			return require('@lwce/router').getModulePath('router');
		}
	},


};

const lwcConfig = {
	input: lwcInput,
	output: lwcOutput,
	plugins: [
		resolveLWCModules,
		resolve({
			mainFields: ['module', 'main'],
			browser: true
		}),
		replace({
			'process.env.NODE_ENV': JSON.stringify('development'),
			preventAssignment: true
		}),
		lwc()
	]
};

const serverConfig = {
	input: serverInput,
	output: serverOutput,
	plugins: [dev && run()]
};

export default [lwcConfig, serverConfig];
