import { LightningElement, api, track } from 'lwc';
import { setState } from 'service/stateManager';

export default class Home extends LightningElement {
	@track state = {};
	@api section;
	@api sections = [];

	iterator = 0;
	speed = 56;

	constructor() {
		super();
		this.setState = setState.bind(this);
		this.init();
	}

	init = () => {
		this.state.textPlaceholder = 'the self in the wired';
		this.state.welcomeText = '';
		this.state.homeMain = 'home-main background';
	};

	typeWriter = () => {
		setTimeout(() => {
			this.addNextCharacter();
		}, this.speed);
	};

	renderedCallback() {
		if (this.charactersRemaining()) {
			this.typeWriter();
		} else {
			const subtitle = this.template.querySelector('.home-text_subtitle');
			subtitle.classList.remove('slds-hide');
		}
	}

	charactersRemaining = () => {
		return this.iterator < this.state.textPlaceholder.length;
	};

	addNextCharacter = () => {
		const welcomeText =
			this.state.welcomeText + this.state.textPlaceholder[this.iterator];
		this.setState({ welcomeText: welcomeText });
		this.iterator++;
	};
}
