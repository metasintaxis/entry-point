import { LightningElement, track, api } from 'lwc';

export default class Viewport extends LightningElement {
	@track state = {};

	@api sections;

	connectedCallback() {
		this.init();
	}

	init = () => {
		const sections = this.sections;
		this.state.sections = sections;
		this.state.homeSection = sections[0];
	};
}
