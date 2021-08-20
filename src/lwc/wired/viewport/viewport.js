import { LightningElement, track, api } from 'lwc';
import { history } from 'helper/history';
import { setState } from 'service/stateManager';

const isRouterVisible = 'isRouterVisible';

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
		this.state.flag = true;
		this.state[isRouterVisible] = true;
		this.history = history;
	};

	handleUrlChange = () => {
		console.log('urlchange');
	};

	handlefoo = () => {
		this.history.pushState(this, isRouterVisible, '/app/sitio/');
	};

	handlebar = () => {
		this.history.pushState(this, isRouterVisible, '/app/home/');
	};
}
