import { LightningElement } from 'lwc';

export default class Header extends LightningElement {
	connectedCallback() {

	}
	renderedCallback () {

		const foo = this.template.querySelector('.main-header__logo');

		console.log('foo', foo);


		foo.innerHTML = 'jojo';

	}
}