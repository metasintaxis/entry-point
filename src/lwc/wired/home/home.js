import { LightningElement, api, track } from 'lwc';
import { setState } from 'service/stateManager';

export default class Home extends LightningElement {
	@track state = {};
	@api section;

	iterator = 0;
	speed = 56;

	constructor() {
		super();
		this.setState = setState.bind(this);
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
		this.setState('welcomeText', welcomeText);
		this.iterator++;
	};
}
