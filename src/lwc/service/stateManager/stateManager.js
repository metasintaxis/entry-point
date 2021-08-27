function setState(property, value) {
	const state = this.state;
	state[property] = value;
	this.state = state;
}

export { setState };
