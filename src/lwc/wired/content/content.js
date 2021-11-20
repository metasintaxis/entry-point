import { LightningElement, track } from 'lwc';
import { setState } from 'service/stateManager';

const sections = [
	{
		sectionName: 'home',
		backgroundColor: 'flatGray',
		path: '/app/home/',
		animationBackground: '--flat-red'
	},
	{
		sectionName: 'site',
		backgroundColor: 'flatYellow',
		path: '/app/site/',
		animationBackground: '--flat-yellow'
	},
	{
		sectionName: 'projects',
		backgroundColor: 'flatBlue',
		path: '/app/projects/',
		animationBackground: '--flat-blue'
	},
	{
		sectionName: 'blog',
		backgroundColor: 'flatRed',
		path: '/app/blog/',
		animationBackground: '--flat-red'
	},
	{
		sectionName: 'contact',
		backgroundColor: 'flatGreen',
		path: '/app/contact/',
		animationBackground: '--flat-green'
	}
];

export default class Content extends LightningElement {
	@track state = {};

	set sectionAfterAnimation(selectedSection) {
		setTimeout(() => {
			this.template
				.querySelector('wired-viewport')
				.replaceSection(selectedSection);
			this.sortSections(this.state.sections, selectedSection);
			this.setState('selectedSection', selectedSection);
			this.template
				.querySelector('.transition-block')
				.classList.add('slds-hide');
		}, this.state.sectionTransitionDuration);
	}

	get sectionAfterAnimation() {
		return this.state.selectedSection;
	}

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

		this.sortSections(sections, initialSection);
		this.setState('sectionTransitionDuration', 700);
	};

	sortSections = (sections, selectedSection, source) => {};

	sortSections = (sections, selectedSection) => {
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
		this.animateTransitionBlock(selectedSection, componentType);
	};

	animateTransitionBlock = (selectedSection, componentType) => {
		const buttonTypeAnglesRelation = new Map([
			['WIRED-MARK', 180],
			['WIRED-TILE', 90]
		]);

		const animationAngle = buttonTypeAnglesRelation.get(componentType);

		const animationKeyFrames = this.generateKeyFrames(
			animationAngle,
			selectedSection.animationBackground
		);

		this.template
			.querySelector('.transition-block')
			.animate(animationKeyFrames, {
				duration: this.state.sectionTransitionDuration,
				direction: 'reverse'
			});

		this.template
			.querySelector('.transition-block')
			.classList.remove('slds-hide');

		this.sectionAfterAnimation = selectedSection;
	};

	generateKeyFrames = (angle, animationBackgroundColor) => {
		const animationKeyFrames = [];
		const frameMidLimit = 100;

		for (let step = 0; step < frameMidLimit; step += 5) {
			animationKeyFrames.push({
				background: `linear-gradient(${angle}deg, var(${animationBackgroundColor}) ${step}%, var(--flat-white) ${step}%)`
			});
		}

		for (let step = 0; step < frameMidLimit; step += 5) {
			animationKeyFrames.push({
				background: `linear-gradient(${angle}deg, rgba(255,255,255,0) ${step}%, var(${animationBackgroundColor}) ${step}%)`
			});
		}

		return animationKeyFrames;
	};
}
