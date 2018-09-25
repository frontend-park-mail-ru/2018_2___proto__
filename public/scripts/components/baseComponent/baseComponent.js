"use strict";

export default class BaseComponent {
	constructor(template) {
		this._element = null;
		this._template = template;
		this.events = ["click"];
	}

	render(context) {
		const div = document.createElement("div");
		div.innerHTML = this._template(context);
		this._element = div.firstChild;
	}

	appendChild(component) {
		this._element.appendChild(component);
	}

	element() {
		return this._element;
	}

	insertInto(parentId) {
		let parent = document.getElementById(parentId);
		
		if(parent !== null)
			parent.innerHTML = this._element.innerHTML;

		return parent;
	}

	appendTo(parentId) {
		let parent = document.getElementById(parentId);

		if(parent === null)
			return null;
		
		parent.appendChild(this._element);
		return this.element();
	}
	
	// Добавить методы AddListners и RemoveListners
}