export default class Router {
	static location = null;
	static pathname = null;
	static subpathname = null;

	static handlePathName = (pathName) => {
		console.log(this.currentHref);
	};

	static init = () => {
		const location = this.setInitialLocation();
		this.location = location;
		this.pathname = location.pathname;
		this.subpathname = location.pathname;
	};

	static setInitialLocation = () => {
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

	static getPathSegments(pathname) {
		const splittedLevels = pathname.split('/');
		return splittedLevels.filter((level) => level != '');
	}

	static getNextSegment(pathname) {
		const segments = this.getPathSegments(pathname);
		const nextSegment = segments[0];
		return nextSegment;
	}

	static handlePathSegment = (callback) => {
		const pathname = this.subpathname;
		const nextSegment = this.getNextSegment(pathname);
		const subpathname = pathname.replace(/\/[A-Z]*/i, '');

		console.log(pathname);

		callback(nextSegment);
		this.subpathname = subpathname;
	};
}
