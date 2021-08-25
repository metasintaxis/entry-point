import { createBrowserHistory } from 'history';
import { setState } from 'service/stateManager';

export class historyWire {
	dataCallback;
	dataObject;

	constructor(dataCallback) {
		this.dataObject = createBrowserHistory();
		this.dataCallback = dataCallback;
	}

	asyncPush = (path) => {
		const promise = new Promise((resolve, reject) => {
			if (path) {
				this.dataObject.push(path);
				resolve('Success!');
			} else {
				reject('Url is not defined!');
			}
		});

		return promise;
	};

	asyncSetState = (reference, property, value) => {
		const promise = new Promise((resolve, reject) => {
			if (value != undefined) {
				setState(reference, property, value);
				resolve('Success!');
			} else {
				reject('Url is not defined!');
			}
		});

		return promise;
	};

	pushState = (reference, property, path) => {
		console.log(reference);
		console.log(property);

		this.asyncSetState(reference, property, false)
			.then(() => {
				return this.asyncPush(path);
			})
			.then((message) => {
				return this.asyncSetState(reference, property, true);
			})
			.catch((error) => {
				console.error(error);
			});
	};

	update(config) {
		this.asyncPush(config.path).then(() => {
			setTimeout(() => {
				this.dataCallback(Math.random());
			}, 2000);
		});
	}

	connect() {}

	disconnect() {}
}
