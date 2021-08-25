import { LightningElement, track, api } from 'lwc';
import { setState } from 'service/stateManager';
export default class Viewport extends LightningElement {
	@api sections;
	@track state = {};

	constructor() {
		super();
	}

	connectedCallback() {
		const sections = this.sections;
		setState(this, 'siteSection', sections[1]);
		setState(this, 'sections', sections);
		setState(this, 'homeSection', sections[0]);
		console.log(this.state.siteSection.path);
	}

	handlefoo = () => {
		this.template.querySelector('service-helper-route').push('/app/sitio/');
	};

	handlebar = () => {
		this.template.querySelector('service-helper-route').push('/app/home/');
	};
}
