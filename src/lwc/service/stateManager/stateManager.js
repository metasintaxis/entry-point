function setState(partialState) {
	const state = this.state;
	this.state = Object.assign({}, state, partialState);
}

export { setState };
