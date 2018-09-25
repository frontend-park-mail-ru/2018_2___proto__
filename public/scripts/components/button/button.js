"use strict";

import "./button.css";
import BaseComponent from "../baseComponent/baseComponent.js";

export default class ButtonComponent extends BaseComponent {
	constructor({text, click} = {}) {
		super();
		this._template = require("./button.hbs");
		this._context = {
			text,
		}
	}

	render() {
		super.render(this._context);
	}
}