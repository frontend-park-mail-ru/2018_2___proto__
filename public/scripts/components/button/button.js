"use strict";

import "./button.css";
import baseComponent from "../baseComponent/baseComponent.js";

export default class buttonComponent extends baseComponent {
	constructor({text, click} = {}) {
		super();
		this.context = {
			text,
		}
	}

	render(context) {
		this._template = require("./button.hbs");
		return super.render(context);
	}
}

// export default class ButtonComponent {
// 	constructor({ text, click } = {}) {
// 		this.template = Handlebars.compile("<li><a>{{text}}</a><li>");

// 		this.click = click;

// 		this.context = {
// 			text
// 		};
// 	}

// 	render() {
// 		// addEventListener("click", this.click);
// 		const el = document.createElement("div");
// 		el.innerHTML = this.template(this.context);
// 		el.firstChild.addEventListener("click", this.click);
// 		return el.firstChild;
// 	}

// 	// delete() {
// 	// 	removeEventListener("click");
// 	// }
// }
