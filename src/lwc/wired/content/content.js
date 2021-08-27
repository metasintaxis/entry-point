import { LightningElement, track } from 'lwc';
import { setState } from 'service/stateManager';

const sections = [
	{
		sectionName: 'home',
		backgroundColor: 'flatGray',
		path: '/app/home/',
		animationBackground: '--flat-white',
		animationContrast: '--flat-black'
	},
	{
		sectionName: 'sitio',
		backgroundColor: 'flatYellow',
		path: '/app/sitio/',
		animationBackground: '--flat-yellow',
		animationContrast: '--flat-white'
	},
	{
		sectionName: 'proyectos',
		backgroundColor: 'flatBlue',
		path: '/app/projects/',
		animationBackground: '--flat-blue',
		animationContrast: '--flat-white'
	},
	{
		sectionName: 'blog',
		backgroundColor: 'flatRed',
		path: '/app/blog/',
		animationBackground: '--flat-red',
		animationContrast: '--flat-white'
	},
	{
		sectionName: 'contacto',
		backgroundColor: 'flatGreen',
		path: '/app/contact/',
		animationBackground: '--flat-green',
		animationContrast: '--flat-white'
	}
];
export default class Content extends LightningElement {
	@track state = {};

	constructor() {
		super();
		this.setState = setState.bind(this);
		this.init();
	}

	init = () => {
		const initialSection = this.findCurrentSection(
			sections,
			window.location.pathname
		);
		
		this.setSections(sections, initialSection);
	};

	setSections = (sections, selectedSection) => {
		const previousSections = this.getPreviousSections(
			sections,
			selectedSection
		);
		const nextSections = this.getNextSections(
			sections,
			selectedSection
		);

		this.setState('sections', sections);
		this.setState('previousSections', previousSections);
		this.setState('nextSections', nextSections);
	};

	getSelectedSectionIndex = (sections, selectedSection) => {
		return sections.findIndex(
			(section) => section.sectionName === selectedSection.sectionName
		);
	};

	getPreviousSections = (sections, selectedSection) => {
		const selectedSectionIndex = this.getSelectedSectionIndex(
			sections,
			selectedSection
		);

		const previousSections = sections.filter(
			(section, index) => index <= selectedSectionIndex
		);

		return previousSections;
	};

	getNextSections = (sections, selectedSection) => {
		const selectedSectionIndex = this.getSelectedSectionIndex(
			sections,
			selectedSection
		);

		const nextSections = sections.filter(
			(section, index) => selectedSectionIndex < index
		);

		return nextSections;
	};

	findCurrentSection = (sections, pathname) => {
		const selectedSection = sections.find((section) =>
			pathname.startsWith(section.path)
		);

		return selectedSection;
	};

	handleSectionSelect = (selectedSection) => {
		// this.template.querySelector();
	};
}
