import { LightningElement, track } from 'lwc';

const sectionList = [
	{
		title: 'home',
		backgroundColor: 'flatGray',
		path: '/app/home/',
		animationBackground: '--flat-white',
		animationContrast: '--flat-black'
	},
	{
		title: 'sitio',
		backgroundColor: 'flatYellow',
		path: '/app/sitio/',
		animationBackground: '--flat-yellow',
		animationContrast: '--flat-white'
	},
	{
		title: 'proyectos',
		backgroundColor: 'flatBlue',
		path: '/app/projects/',
		animationBackground: '--flat-blue',
		animationContrast: '--flat-white'
	},
	{
		title: 'blog',
		backgroundColor: 'flatRed',
		path: '/app/blog/',
		animationBackground: '--flat-red',
		animationContrast: '--flat-white'
	},
	{
		title: 'contacto',
		backgroundColor: 'flatGreen',
		path: '/app/contact/',
		animationBackground: '--flat-green',
		animationContrast: '--flat-white'
	}
];

const sections = new Set(sectionList);
export default class Content extends LightningElement {
	@track state = {};

	constructor() {
		super();
		this.init();
	}

	init = () => {
		this.state.selectedSection = sectionList;
		this.state.previousSections = [];
		this.state.nextSections = [];
		this.state.sections = sections;
	};

	handleSegmentAssignment = (nextSegment) => {
		this.setSections(nextSegment);
	};

	setSections = (segment) => {
		const sections = this.state.sections;
		const previousSections = this.getPreviousSections(sections, segment);
		const nextSections = this.getNextSections(sections, segment);

		this.state.previousSections = previousSections;
		this.state.nextSections = nextSections;
	};

	getPreviousSections = (sections, segment) => {
		const previousSections = [];

		for (let i = 0; i < sections.length; ++i) {
			previousSections.push(sections[i]);
			if (sections[i].pathsegment == segment) {
				break;
			}
		}

		return previousSections;
	};

	getNextSections = (sections, segment) => {
		const nextSections = [];
		let currentIndex = sections.length;

		for (let i = 0; i < sections.length; ++i) {
			if (sections[i].pathsegment == segment) {
				currentIndex = i;
			} else {
				if (currentIndex < i) {
					nextSections.push(sections[i]);
				}
			}
		}

		return nextSections;
	};
}
