import { LightningElement, api } from 'lwc';

export default class Sidebar extends LightningElement {
	@api sections;
	@api handleSectionSelect;
}
