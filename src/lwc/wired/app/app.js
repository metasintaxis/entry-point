import { LightningElement } from 'lwc';

const sectionList = [
	{
		title: 'welcome',
		backgroundColor: 'flatGray',
		pathlink: 'home',
		animationBackground: '--flat-white',
		animationContrast: '--flat-black'
	},
	{
		title: 'sitio',
		backgroundColor: 'flatYellow',
		pathlink: 'sitio',
		animationBackground: '--flat-yellow',
		animationContrast: '--flat-white'
	},
	{
		title: 'proyectos',
		backgroundColor: 'flatBlue',
		pathlink: 'proyectos',
		animationBackground: '--flat-blue',
		animationContrast: '--flat-white'
	},
	{
		title: 'blog',
		backgroundColor: 'flatRed',
		pathlink: 'blog',
		animationBackground: '--flat-red',
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

export default class App extends LightningElement {
	selectedSection = {};
	sections = sectionList;
	previousSections = sectionList;
	nextSections = sectionList;
}
