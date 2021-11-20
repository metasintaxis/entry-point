import { LightningElement, api } from 'lwc';

export default class Tile extends LightningElement {
	state = {};

	@api
	get backgroundColor() {
		return this.state.tileClass;
	}

	set backgroundColor(backgroundColor) {
		this.state.tileClass = 'item-title ' + backgroundColor;
	}

	@api get sectionName() {
		return this.state.sectionName;
	}

	set sectionName(sectionName) {
		this.state.sectionName = sectionName;
	}

	handleTileSelection = (event) => {
		// const element = event.target;
		// console.log(element);
		// element.classList.add('slds-hide');
	}

}
