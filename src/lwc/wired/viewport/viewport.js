import { LightningElement, track, api } from 'lwc';
// import { history } from 'helper/history';
import { setState } from 'service/stateManager';

const routerVisibilityProperty = 'isRouterVisible';

export default class Viewport extends LightningElement {
	@api sections;
	@track state = {};

	constructor() {
		super();
		this.init();
	}

	connectedCallback() {
		const sections = this.sections;
		setState(this, 'sections', sections);
		setState(this, 'homeSection', sections[0]);
	}

	init = () => {
		this.state[routerVisibilityProperty] = true;
		// this.history = history;
	};

	handlefoo = () => {
		// this.history.pushState(this, routerVisibilityProperty, '/app/sitio/');
		this.template.querySelector('helper-view').push('/app/sitio/');
	};

	handlebar = () => {
		this.template.querySelector('helper-view').push('/app/home/');
		// this.history.pushState(this, routerVisibilityProperty, '/app/home/');
	};
}
