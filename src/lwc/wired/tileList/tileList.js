import { LightningElement, api, wire } from 'lwc';
import { history } from '@lwce/router';

export default class TileList extends LightningElement {
	@wire(history) his;

	@api
	sections;

	handleClick = (event) => {
		this.his.push();
	}
}
