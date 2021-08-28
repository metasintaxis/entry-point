import { LightningElement, api } from 'lwc';

export default class TileList extends LightningElement {
	@api sections;
	@api handleSectionSelect;

	handleClick = (event) => {
		event.stopPropagation();
		this.handleSectionSelect(event);
	};
}
