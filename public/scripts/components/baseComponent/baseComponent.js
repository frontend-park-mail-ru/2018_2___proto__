"use strict";

export default class baseComponent {
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

	// Добавить методы AddListners и RemoveListners
}