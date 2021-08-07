import { LightningElement, track, api } from 'lwc';
import Router from 'wired/router';

export default class Content extends LightningElement {
	@track state = {};

	@api sections;
	@api handleSegmentAssignment;

	connectedCallback() {
		this.init();
		Router.handlePathSegment(this.handlePathSegment);
	}

	init = () => {
		this.state.sections = this.sections;

		this.state.homeSection = this.state.sections[0];
		this.state.home = false;

		this.state.sitioSection = this.state.sections[1];
		this.state.sitio = false;
	};

	handlePathSegment = (nextSegment) => {
		if (this.state[`${nextSegment}`] != undefined) {
			this.setSectionVisibility(nextSegment);
			this.handleSegmentAssignment(nextSegment);
		}
	};

	setSectionVisibility = (nextSegment) => {
		this.state[`${nextSegment}`] = true;
	};
}
