"use strict";

import "./logo.css";
import baseComponent from "../baseComponent/baseComponent.js";

export default class logoComponent extends baseComponent {
	constructor({ text, click } = {}) {
		super();
		this.context = {
			text,
		}
	}

	render(context) {
		this._template = require("./logo.hbs");
		super.render(context);
	}
}
