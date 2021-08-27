import { LightningElement, track, api } from 'lwc';
import { setState } from 'service/stateManager';
export default class Viewport extends LightningElement {
	@api sections = new Set();
	@track state = {};

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

	handlefoo = () => {
		this.template.querySelector('service-helper-route').push('/app/sitio/');
	};

	handlebar = () => {
		this.template.querySelector('service-helper-route').push('/app/home/');
	};
}
