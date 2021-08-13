import { LightningElement, track } from 'lwc';
export default class App extends LightningElement {
	@track state = {};

	constructor() {
		super();
		this.setInitialLocation();
	}

	setInitialLocation = () => {
		let location = null;
		if (window.__originalLocation) {
			location = window.__originalLocation;
			window.history.replaceState(
				{},
				'custom',
				`${window.__originalLocation.href}`
			);
		} else {
			window.history.replaceState(
				{},
				'home',
				`${window.location.href}home/`
			);
			location = window.location;
			window.__originalLocation = null;
		}
		return location;
	};
}
