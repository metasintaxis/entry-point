
const setState = (reference, property, value) => {
	const state = reference.state;
	state[property] = value;
	reference.state = state;
};

export {setState};