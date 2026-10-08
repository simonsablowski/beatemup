import js from '@eslint/js';
import globals from 'globals';

export default [
	{ignores: ['node_modules/']},
	js.configs.recommended,
	{
		files: ['src/**/*.js'],
		languageOptions: {globals: globals.browser}
	},
	{
		files: ['test/**/*.js', '*.config.js'],
		languageOptions: {globals: globals.node}
	}
];
