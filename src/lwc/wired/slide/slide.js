import { LightningElement, api } from 'lwc';

export default class Slide extends LightningElement {
	@api title;
	@api content;
	titleClass = 'header-title slds-p-around_x-small';

	@api set headerAlignment(value) {
		this.headerAlignmentValue = value;
	}

	get headerAlignment() {
		return this.headerAlignmentValue;
	}

	@api set backgroundColor(value) {
		this.backgroundColorValue = value;
	}

	get backgroundColor() {
		return this.backgroundColorValue;
	}

	get headerAlignment() {
		return this.headerAlignmentValue;
	}

	renderedCallback() {
		console.log(this.headerAlignmentValue);
		const header = this.template.querySelector('.slide-header');

		if (header) {
			if (this.headerAlignmentValue === 'center') {
				header.classList.add('slds-grid_align-center');
			} else if (this.headerAlignmentValue === 'end') {
				header.classList.add('slds-grid_align-end');
			}
		}

		this.titleClass = 'header-title slds-p-around_x-small ' + this.backgroundColor;
	}
}
