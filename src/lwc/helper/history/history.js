import { createBrowserHistory } from 'history';
import { setState } from 'service/stateManager';

class historyObject {
	dataObject;

	constructor() {
		this.dataObject = createBrowserHistory();
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
				setTimeout(() => {
					this.asyncSetState(reference, property, true);
				},100 );
			})
			.catch((error) => {
				console.error(error);
			});
	};
}

const history = new historyObject();

export { history };
