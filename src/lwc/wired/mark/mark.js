import { LightningElement, api, track } from 'lwc';

export default class Mark extends LightningElement {
	@track state = {};
	@api get title() {
		return this.state.title;
	}

	set title(title) {
		this.state.title = title;
	}

	@api
	get backgroundColor() {
		return this.state.boxClass;
	}

	set backgroundColor(backgroundColor) {
		this.state.boxClass = 'item-title ' + backgroundColor;
	}
}
