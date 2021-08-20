import { LightningElement, api, track } from 'lwc';
import { history } from 'helper/history';
import { setState } from 'service/stateManager';

export default class View extends LightningElement {
	@track state = {};

	constructor() {
		super();
		this.state.history = history;
		setState(this, 'isVisible', true);
	}

	@api
	push = (path) => {
		console.log(this);
		this.state.history.pushState(this, 'isVisible', path);
	};

}
