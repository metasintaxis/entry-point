import { LightningElement, api } from 'lwc';

export default class Home extends LightningElement {
	textPlaceholder = 'the humble crm programmer';
	welcomeText = '';
	iterator = 0;
	speed = 60;

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
		return this.iterator < this.textPlaceholder.length;
	};

	addNextCharacter = () => {
		this.welcomeText += this.textPlaceholder[this.iterator];
		this.iterator++;
	};
}
