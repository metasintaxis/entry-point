import { LightningElement } from 'lwc';

export default class Header extends LightningElement {
	state = {};

	connectedCallback() {
		this.state.sectionName = 'the humble crm programmer';
	}
}
