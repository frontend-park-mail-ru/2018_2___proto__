"use strict";

import "./logo.css";
import BaseComponent from "../baseComponent/baseComponent.js";

export default class LogoComponent extends BaseComponent {
	constructor({ text, click } = {}) {
		super();
		this._template = require("./logo.hbs");
		this._context = {
			text,
		}
	}

	render(context) {
		this._template = require("./logo.hbs");
		super.render(this._context);
	}
}
