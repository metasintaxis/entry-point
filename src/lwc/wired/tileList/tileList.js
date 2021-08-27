import { LightningElement, api } from 'lwc';

export default class TileList extends LightningElement {
	@api sections;

	handleTileSelect = (event) => {
		event.stopPropagation();
		console.log(event.target.sectionName);
	}
}
