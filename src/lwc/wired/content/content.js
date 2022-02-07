import { LightningElement, track } from 'lwc';
import { setState } from 'service/stateManager';

const sections = [
	{
		sectionName: 'HOME',
		markColor: 'flatWhite',
		path: '/app/home/',
		animationBackground: '--flat-white'
	},
	{
		sectionName: 'SITE',
		markColor: 'flatYellow',
		path: '/app/site/',
		animationBackground: '--flat-yellow'
	},
	{
		sectionName: 'PROJECTS',
		markColor: 'flatBlue',
		path: '/app/projects/',
		animationBackground: '--flat-blue'
	},
	{
		sectionName: 'BLOG',
		markColor: 'flatOrange',
		path: '/app/blog/',
		animationBackground: '--flat-orange'
	},
	{
		sectionName: 'CONTACT',
		markColor: 'flatGreen',
		path: '/app/contact/',
		animationBackground: '--flat-green'
	}
];

export default class Content extends LightningElement {
	@track state = {};

	set sectionAfterAnimation(selectedSection) {
		this.template
			.querySelector('wired-viewport')
			.replaceSection(selectedSection);
		this.sortSections(this.state.sections, selectedSection);
		this.setState({ selectedSection: selectedSection });
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
		this.setState({ sectionTransitionDuration: 450 });
	};

	sortSections = (sections, selectedSection, source) => {};

	sortSections = (sections, selectedSection) => {
		const previousSections = this.getPreviousSections(
			sections,
			selectedSection
		);
		const nextSections = this.getNextSections(sections, selectedSection);

		this.setState({
			sections: sections,
			previousSections: previousSections,
			nextSections: nextSections
		});
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
		const selectedSection = this.state.sections.find(
			(section) => section.sectionName === event.target.sectionName
		);

		this.animateTransitionBlock(selectedSection);
	};

	showTransitionBlock = () => {
		const showPromise = new Promise((resolve) => {
			const transitionBlock =
				this.template.querySelector('.transition-block');
			transitionBlock.classList.remove('slds-hide');
			resolve();
		});

		return showPromise;
	};

	animateTransitionBlock = (selectedSection) => {
		const animationAngles = [0, 45, 90, 135, 180, 225, 270, 315];

		const effectiveAngle =
			animationAngles[Math.floor(Math.random() * animationAngles.length)];

		const animationKeyFrames = this.generateKeyFrames(
			effectiveAngle,
			selectedSection.animationBackground
		);

		const transitionBlock =
			this.template.querySelector('.transition-block');

		this.showTransitionBlock()
			.then((result) => {
				const animationPromise = new Promise((resolve, reject) => {
					const animation = transitionBlock.animate(
						animationKeyFrames,
						{
							duration: this.state.sectionTransitionDuration,
							direction: 'reverse',
							fill: 'forwards'
						}
					);

					animation.onfinish = () => {
						console.log('animation finished');
						resolve();
					};
				});

				return animationPromise;
			})
			.then(() => {
				this.sectionAfterAnimation = selectedSection;

				const complementaryKeyFrames =
					this.generateComplementaryKeyFrames(
						effectiveAngle,
						selectedSection.animationBackground
					);

				const complementaryAnimation = transitionBlock.animate(
					complementaryKeyFrames,
					{
						duration: this.state.sectionTransitionDuration,
						direction: 'reverse',
						fill: 'forwards'
					}
				);

				complementaryAnimation.onfinish = () => {
					transitionBlock.classList.add('slds-hide');
					console.log('complementary animation finished');
				};
			});
	};

	generateComplementaryKeyFrames = (angle, animationBackgroundColor) => {
		const animationKeyFrames = [];
		const frameMidLimit = 100;

		for (let step = 0; step < frameMidLimit; step += 1) {
			animationKeyFrames.push({
				animationTimingFunction: 'ease-in-out',
				background: `linear-gradient(${angle}deg, var(${animationBackgroundColor}) ${step}%, rgba(255,255,255,0) ${step}%)`
			});
		}

		return animationKeyFrames;
	};

	generateKeyFrames = (angle, animationBackgroundColor) => {
		const animationKeyFrames = [];
		const frameMidLimit = 100;

		for (let step = 0; step < frameMidLimit; step += 1) {
			animationKeyFrames.push({
				animationTimingFunction: 'ease-in-out',
				background: `linear-gradient(${angle}deg, rgba(255,255,255,0) ${step}%, var(${animationBackgroundColor}) ${step}%)`
			});
		}

		return animationKeyFrames;
	};

	handleAnimation = (event) => {
		console.log('animation ended');
	};
}
