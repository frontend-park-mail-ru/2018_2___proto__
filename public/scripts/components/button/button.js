"use strict";

import "./button.css";
import BaseComponent from "../baseComponent/baseComponent.js";

export default class ButtonComponent extends BaseComponent {
	constructor() {
		super();
		this._template = require("./button.hbs");
		this._context = {
			text: "",
			onClick: null,
		};
		this.events = {
			click: this._onClick.bind(this),
		};
	}

	_onClick() {
		if (this._context.onClick) {
			this._context.onClick();
		}
	}
}