import { LightningElement, api } from 'lwc';

export default class Tile extends LightningElement {
	state = {};

	@api
	get backgroundColor() {
		return this.state.tileClass;
	}

	set backgroundColor(backgroundColor) {
		this.state.tileClass = 'mark__box ' + backgroundColor;
	}

	@api get title() {
		return this.state.title;
	}

	set title(title) {
		this.state.title = title;
	}
}
