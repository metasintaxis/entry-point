import { LightningElement, api, track } from 'lwc';
import { history } from 'helper/history';
import { setState } from 'service/stateManager';

export default class View extends LightningElement {
	@track state = {};

	constructor() {
		super();
		this.history = history;
		setState(this, 'isVisible', true);
	}

	@api
	push = (path) => {
		this.history.pushState(this, 'isVisible', path);
	};

}
