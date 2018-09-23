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
		super.render(context);
	}
}