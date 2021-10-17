import { LightningElement, track } from 'lwc';
import { setState } from 'service/stateManager';

const slides = [
	{
		Id: 'site',
		title: 'this site',
		headerAlignment: 'center',
		backgroundColor: 'flatGreen',
		content:
			'This portal serves as a proof of concept of a website built entirely with Lightning Web Components. The site was created to showcase my skills as a frontend developer but also to experiment with new web technologies. The challenge was to create a user experience from scratch that was efficient but still intuitive.'
	},

	{
		Id: 'css',
		title: 'css is awesome',
		headerAlignment: 'start',
		backgroundColor: 'flatYellow',
		content:
			'This portal serves as proof of concept of a website built entirely with Lightning Web Components. This technology is a framework developed by Salesforce on top of the Web Components standard, allowing to reuse interfaces inside and outside of the platform. The main target of this technology is the customer experience cloud. But as you can see here, it also can be used to create standalone sites and applications.'
	},
	{
		Id: 'wired',
		title: 'the self in the wired',
		backgroundColor: 'flatRed',
		headerAlignment: 'end',
		content:
			'The Wired is a metaphor in the Serial Experiments Lain series that represents a dream/desire of individuals to materialize themselves in an omnipresent digital world. Since The Wired eventually gets merged with the physical world, the individuals that can manipulate the Wired could also modify the reality that initially scared them. I think that any profile in our network responds to this desire of being present in every place, at any time, even in the long past of future generations.'
	}
];

export default class Sitio extends LightningElement {
	@track slides = slides;
	@track state = {};
	currentNodeSelected = null;

	constructor() {
		super();
		this.setState = setState.bind(this);
		this.init();
	}

	init = () => {
		this.setState('slides', slides);
		this.setState('firstTimeRendered', true);
		this.setState('currentNodeSelected', null);
	};

	renderedCallback() {
		if (this.state.firstTimeRendered) {
			const slideshow = this.template.querySelector('.slideshow');
			const currentNodeSelected =
				this.template.querySelector('.site');
			this.setState('currentNodeSelected', currentNodeSelected);
			slideshow.addEventListener('wheel', this.handleScroll);
			this.setState('firstTimeRendered', false);
		}
	}

	handleScroll = (event) => {
		const slideshow = this.template.querySelector('.slideshow');
		const scrollDirection = this.getVerticalScrollDirection(event);
		const milisecondsDelay = 900;

		if (scrollDirection != undefined) {
			slideshow.removeEventListener('wheel', this.handleScroll, {
				passive: true
			});
			if (scrollDirection === 'forward') {
				const elementSelected = this.state.currentNodeSelected;
				const slide = elementSelected.nextElementSibling;
				if (slide) {
					slide.scrollIntoView(true);
					this.setState('currentNodeSelected', slide);
				}
			} else {
				const elementSelected = this.state.currentNodeSelected;
				const slide = elementSelected.previousElementSibling;
				if (slide) {
					slide.scrollIntoView(true);
					this.setState('currentNodeSelected', slide);
				}
			}
			setTimeout(() => {
				slideshow.addEventListener('wheel', this.handleScroll);
			}, milisecondsDelay);
		}
	};

	getVerticalScrollDirection = (event) => {
		if (event.wheelDelta) {
			if (event.wheelDelta > 0) {
				return 'backward';
			}
			return 'forward';
		}
	};
}
