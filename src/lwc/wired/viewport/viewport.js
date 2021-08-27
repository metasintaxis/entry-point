import { LightningElement, track, api } from 'lwc';
import { setState } from 'service/stateManager';
export default class Viewport extends LightningElement {
	@api sections;
	@track state = new Set();

	constructor() {
		super();
	}

	connectedCallback() {
		const sections = [...this.sections];

		const siteSection = sections.find(
			(section) => section.title == 'sitio'
		);

		const homeSection = sections.find((section) => section.title == 'home');

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
