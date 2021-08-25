import { LightningElement, api, track } from 'lwc';
import { history } from 'helper/history';

export default class View extends LightningElement {
	@track state = {};

	constructor() {
		super();
		this.state.history = history;
	}

	@api
	push = (path) => {
		this.dispatchEvent(
			new CustomEvent('lwcerouter_navigate', {
				detail: path,
				bubbles: true,
				composed: true
			})
		);
	};
}
