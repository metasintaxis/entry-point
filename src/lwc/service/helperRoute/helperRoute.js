import { LightningElement, api } from 'lwc';

export default class HelperRoute extends LightningElement {
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
