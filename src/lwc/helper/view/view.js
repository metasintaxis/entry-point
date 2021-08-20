import { LightningElement, api, track } from 'lwc';
import { history } from 'helper/history';
import { setState } from 'service/stateManager';

export default class View extends LightningElement {
	@track state = {};
	path = '/app/home/';
	counter = 1;

	constructor() {
		super();
		this.history = history;
		this.state.isVisible = true;
		setState(this, 'isVisible', true);
	}

	@api
	push = (path) => {
		console.log(path);
		this.path = path;
		setState(this, 'isVisible', false);
		this.history.pushState(this, 'isVisible', this.path);
		setState(this, 'isVisible', true);
	};

}
