import { LightningElement, track, api, wire } from 'lwc';
import { historyWire } from 'helper/historyWire';
import { setState } from 'service/stateManager';

const routerVisibilityProperty = 'isRouterVisible';

export default class Viewport extends LightningElement {
	@api sections;
	@track state = {};

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
		// this.state[routerVisibilityProperty] = true;
		// this.history = history;
	};

	handlefoo = () => {
		this.template.querySelector('helper-route').push('/app/sitio/');
	};

	handlebar = () => {
		this.template.querySelector('helper-route').push('/app/home/');
	};
}
