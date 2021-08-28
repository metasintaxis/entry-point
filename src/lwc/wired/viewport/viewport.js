import { LightningElement, track, api } from 'lwc';
import { setState } from 'service/stateManager';
export default class Viewport extends LightningElement {
	@api sections = new Set();
	@track state = {};

	@api
	replaceSection(selectedSection) {
		this.template
			.querySelector('service-helper-route')
			.push(selectedSection.path);
	}

	constructor() {
		super();
		this.setState = setState.bind(this);
	}

	connectedCallback() {
		const sections = [...this.sections];

		const siteSection = sections.find(
			(section) => section.sectionName === 'sitio'
		);

		const homeSection = sections.find(
			(section) => section.sectionName === 'home'
		);

		this.setState('sections', sections);
		this.setState('homeSection', homeSection);
		this.setState('siteSection', siteSection);
	}
}
