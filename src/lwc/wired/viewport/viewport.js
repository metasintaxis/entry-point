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
		this.state.flag = true;
	};

	handlefoo = () => {
		// history.pushState({},'','localhost:5000/app/home/');
		if (this.state.flag) {
			this.state.flag = !this.state.flag;
		}
	};


	handlebar = () => {
		if (this.state.flag) {
			this.state.flag = !this.state.flag;
		}
		const link = this.template.querySelector('lwce-link[class="foo"]');
		console.log(link);
		console.log( typeof link);
		link.click();
		// history.pushState({},'','http://localhost:5000/app/sitio/');
	};

}
