import { LightningElement, track, api } from 'lwc';
import { setState } from 'service/stateManager';
export default class Viewport extends LightningElement {
	@api sections = new Set();
	@track state = {};

	constructor() {
		super();
	}

	connectedCallback() {
		const sections = [...this.sections];

		const siteSection = sections.find(
			(section) => section.sectionName == 'sitio'
		);

		const homeSection = sections.find(
			(section) => section.sectionName == 'home'
		);

		setState(this, 'sections', sections);
		setState(this, 'homeSection', homeSection);
		setState(this, 'siteSection', siteSection);
	}

	handlefoo = () => {
		this.template.querySelector('service-helper-route').push('/app/sitio/');
	};

	handlebar = () => {
		this.template.querySelector('service-helper-route').push('/app/home/');
	};
}
