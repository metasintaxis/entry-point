import { LightningElement, api } from 'lwc';

export default class TileList extends LightningElement {
	@api sections;
	@api handleSectionSelect;

	handleClick = (event) => {
		event.stopPropagation();
		const element = event.target;
		element.classList.add('transparent-block');
		this.handleSectionSelect(event);
	};
}
