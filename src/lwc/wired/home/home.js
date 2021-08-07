import { LightningElement, api, track } from 'lwc';

export default class Home extends LightningElement {
	@track state = {};
	@api section;

	iterator = 0;
	speed = 60;

	constructor() {
		super();
		this.init();
	}

	init = () => {
		this.state.textPlaceholder = 'the humble crm programmer';
		this.state.welcomeText = '';
	};

	typeWriter = () => {
		setTimeout(() => {
			this.addNextCharacter();
		}, this.speed);
	};

	renderedCallback() {
		if (this.charactersRemaining()) {
			this.typeWriter();
		}
	}

	charactersRemaining = () => {
		return this.iterator < this.state.textPlaceholder.length;
	};

	addNextCharacter = () => {
		const welcomeText =
			this.state.welcomeText + this.state.textPlaceholder[this.iterator];
		this.setStateProperty('welcomeText', welcomeText);
		this.iterator++;
	};

	setStateProperty = (prop, value) => {
		this.state[prop] = value;
	};
}
