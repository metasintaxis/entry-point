import { LightningElement, track } from 'lwc';
import { setState } from 'service/stateManager';

const sections = [
	{
		sectionName: 'home',
		backgroundColor: 'flatGray',
		path: '/app/home/',
		animationBackground: '--flat-gray',
		animationContrast: '--flat-white'
	},
	{
		sectionName: 'site',
		backgroundColor: 'flatYellow',
		path: '/app/site/',
		animationBackground: '--flat-yellow',
		animationContrast: '--flat-white'
	},
	{
		sectionName: 'projects',
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
		sectionName: 'contact',
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
		const initialSection = this.findInitialPathSection(
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
		const nextSections = this.getNextSections(sections, selectedSection);

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

	findInitialPathSection = (sections, pathname) => {
		const selectedSection = sections.find((section) =>
			pathname.startsWith(section.path)
		);

		return selectedSection;
	};

	handleSectionSelect = (event) => {
		const componentType = event.target.tagName;
		const selectedSection = this.state.sections.find(
			(section) => section.sectionName === event.target.sectionName
		);
		this.animateTransition(selectedSection, componentType);
		this.template
			.querySelector('wired-viewport')
			.replaceSection(selectedSection);
		this.setSections(this.state.sections, selectedSection);
	};

	animateTransition = (selectedSection, componentType) => {
		const buttonTypeAnglesRelation = new Map([
			['WIRED-MARK', 180],
			['WIRED-TILE', 90]
		]);

		const animationAngle = buttonTypeAnglesRelation.get(componentType);

		const animationKeyFrames = this.generateKeyFrames(
			animationAngle,
			selectedSection.animationBackground,
			selectedSection.animationContrast
		);

		this.template.querySelector('.main').animate(animationKeyFrames, {
			duration: 700,
			direction: 'reverse'
		});
	};

	generateKeyFrames = (
		angle,
		animationBackgroundColor,
		animationContrastColor
	) => {
		const animationKeyFrames = [];
		const frameMidLimit = 100;

		for (let step = 0; step < frameMidLimit; step += 5) {
			animationKeyFrames.push({
				background: `linear-gradient(${angle}deg, var(${animationBackgroundColor}) ${step}%, var(--flat-white) ${step}%)`,
				color: `var(${animationContrastColor})`
			});
		}

		for (let step = 0; step < frameMidLimit; step += 5) {
			animationKeyFrames.push({
				background: `linear-gradient(${angle}deg, var(--flat-white) ${step}%, var(${animationBackgroundColor}) ${step}%)`,
				color: `var(${animationContrastColor})`
			});
		}

		return animationKeyFrames;
	};
}
