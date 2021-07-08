import { LightningElement } from 'lwc';

export default class Header extends LightningElement {
	state = {};

	connectedCallback() {
		this.state.title = 'the humble crm programmer';
	}
}
