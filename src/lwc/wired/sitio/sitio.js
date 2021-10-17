import { LightningElement } from 'lwc';

export default class Sitio extends LightningElement {
	scrollToOne = (event) => {
		const container = this.template.querySelector('.section3');
		container.scrollIntoView(true);
	};
}
