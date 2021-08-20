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

	pushState = (reference, property, path) => {
		const newValue = false;
		setState(reference, property, newValue);
		this.asyncPush(reference, property, path)
			.then((message) => {
				const newValue = true;
				setState(reference, property, newValue);
			})
			.catch((error) => {
				console.error(error);
			});
	};
}

const history = new historyObject();

export { history };