import { LightningElement, track, api, wire } from 'lwc';
import { historyWire } from 'helper/historyWire';
import { setState } from 'service/stateManager';

const routerVisibilityProperty = 'isRouterVisible';

export default class Viewport extends LightningElement {
	@api sections;
	@track state = {};
	path = '';
	random = 0;

	@wire(historyWire, {
		reference: '$state',
		routerVisibilityProperty,
		path: '$path'
	})
	historyWire(randomNumber) {
		console.log(randomNumber);
		this.random = randomNumber;
	}

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
		// this.template.querySelector('helper-view').push('/app/sitio/');
		this.path = '/app/sitio/';
	};

	handlebar = () => {
		// this.template.querySelector('helper-view').push('/app/home/');
		// this.history.pushState(this, routerVisibilityProperty, '/app/home/');
		this.path = '/app/home/';
	};
}
