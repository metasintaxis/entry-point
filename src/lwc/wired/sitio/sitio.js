import { LightningElement, track } from 'lwc';
import { setState } from 'service/stateManager';

const slides = [
	{
		Id: 'site',
		title: 'this site',
		headerAlignment: 'center',
		backgroundColor: 'flatGreen',
		content:
			'This portal serves as a proof of concept of a website \
			entirely built with Lightning Web Components. Although \
			the framework is a relatively new technology, it\'s \
			still a very powerful tool for creating web \
			interfaces. The site itself is intended to be used as \
			a starting point for creating more complex designs and \
			applications. And it shows how far you can get with \
			your customizations on the customer cloud.',
	},
	{
		Id: 'webComponents',
		title: 'standard web components',
		backgroundColor: 'flatRed',
		headerAlignment: 'end',
		content:
			'LWC was leveraged on top of the standard web components \
			to create a highly customizable and extensible \
			framework. This allows us to reuse the same components \
			across multiple platforms in a relatively simple way. \
			But most importantly, we can apply powerful coding \
			techniques from other ecosystems like React or Vue to our projects, \
			and that\'s is possible because all these technologies \
			rely on the same programming language, which is \
			JavaScript; but also because the markup language is \
			close to the standard HTML for all cases. And all this have \
			contributed to make the site possible.',
	},
	{
		Id: 'css',
		title: 'css is awesome',
		headerAlignment: 'start',
		backgroundColor: 'flatYellow',
		content:
			'The look and feel of the site is supported by some of \
			the most interesting additions to the CSS language \
			like CSS Animations and CSS Variables. It would be \
			simpler to adopt a framework to handle all this job, \
			but standard CSS provides plenty of a room for experimentation. \
			CSS has been seen as a hard language to learn, but \
			once you get deep into the technology, you can appreciate \
			how robust it is. However, the slds frameworks is \
			still used in this site for layouts, mainly \
			because that\'s how you would tipically work in \
			your daily projects. '
			
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
		this.setState({
			slides: slides,
			firstTimeRendered: true,
			currentNodeSelected: {}
		});
	};

	renderedCallback() {
		if (this.state.firstTimeRendered) {
			const currentNodeSelected = this.template.querySelector('.site');
			this.setState({currentNodeSelected: currentNodeSelected});
			this.addSlideShowEventListener();
			this.setState({firstTimeRendered: false});
		}
	}

	handleScroll = (event) => {
		const slideshow = this.template.querySelector('.slideshow');
		const scrollDirection = this.getVerticalScrollDirection(event);
		const milisecondsDelay = 800;

		if (scrollDirection != undefined) {
			slideshow.removeEventListener('wheel', this.handleScroll, {
				passive: true
			});
			if (scrollDirection === 'forward') {
				this.goToElement('nextElementSibling');
			} else {
				this.goToElement('previousElementSibling');
			}
			setTimeout(() => {
				this.addSlideShowEventListener();
			}, milisecondsDelay);
		}
	};

	addSlideShowEventListener = () => {
		const slideshow = this.template.querySelector('.slideshow');
		slideshow.addEventListener('wheel', this.handleScroll);
	};

	goToElement = (property) => {
		const elementSelected = this.state.currentNodeSelected;
		const slide = elementSelected[property];
		if (slide) {
			slide.scrollIntoView(true);
			this.setState({currentNodeSelected: slide});
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
