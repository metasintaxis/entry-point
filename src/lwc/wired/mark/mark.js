import { LightningElement, api, track } from 'lwc';

export default class Mark extends LightningElement {
	@track state = {};
	@api get sectionName() {
		return this.state.sectionName;
	}

	set sectionName(sectionName) {
		this.state.sectionName = sectionName;
	}

	@api
	get backgroundColor() {
		return this.state.boxClass;
	}

	set backgroundColor(backgroundColor) {
		this.state.boxClass = 'mark__box ' + backgroundColor;
	}

	handleMouseOver(event) {
		this.template
			.querySelector('.mark__title')
			.classList.remove('opacity-0');
	}

	handleMouseOut(event) {
		this.template.querySelector('.mark__title').classList.add('opacity-0');
	}
}
