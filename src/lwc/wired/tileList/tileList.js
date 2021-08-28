import { LightningElement, api } from 'lwc';

export default class TileList extends LightningElement {
	@api sections;
	@api handleSectionSelect;

	handleClick = (event) => {
		event.stopPropagation();
		const selectedSection = this.sections.find(
			(section) => section.sectionName === event.target.sectionName
		);
		this.handleSectionSelect(selectedSection);
	};
}
