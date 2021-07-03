import { LightningElement } from 'lwc';

export default class MarkList extends LightningElement {
	sections = [
		{
			title: 'inicio',
			backgroundColor: 'flatGray',
			pathlink: 'home',
			animationBackground: '--flat-white',
			animationContrast: '--flat-black'
		},
		{
			title: 'proyectos',
			backgroundColor: 'flatYellow',
			pathlink: 'projects',
			animationBackground: '--flat-yellow',
			animationContrast: '--flat-white'
		},
		{
			title: 'blog',
			backgroundColor: 'flatBlue',
			pathlink: 'blog',
			animationBackground: '--flat-blue',
			animationContrast: '--flat-white'
		},
		{
			title: 'feeds',
			backgroundColor: 'flatRed',
			pathlink: 'feeds',
			animationBackground: '--flat-red',
			animationContrast: '--flat-white'
		},
		{
			title: 'nosotros',
			backgroundColor: 'flatOrange',
			pathlink: 'hackers',
			animationBackground: '--flat-orange',
			animationContrast: '--flat-white'
		},
		{
			title: 'contacto',
			backgroundColor: 'flatGreen',
			pathlink: 'contact',
			animationBackground: '--flat-green',
			animationContrast: '--flat-white'
		}
	];
}
