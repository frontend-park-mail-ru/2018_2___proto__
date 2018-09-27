"use strict";

import "./about.css";
import BaseComponent from "../baseComponent/baseComponent.js";
import ButtonComponent from "../button/button.js";

export default class AboutComponent extends BaseComponent {
	constructor() {
		super();
		this._template = require("./about.hbs");
	}

	render() {
		super.render();
		this._renderChildren();
	}

	_renderChildren() {
		this._renderChild("dev-1", ButtonComponent, {
			text: "armelior",
			onClick: this._onDeveloperClick,
		});

		this._renderChild("dev-2", ButtonComponent, {
			text: "mouseartiom",
			onClick: this._onDeveloperClick,
		});

		this._renderChild("dev-3", ButtonComponent, {
			text: "0sektor0",
			onClick: this._onDeveloperClick,
		});

		this._renderChild("dev-4", ButtonComponent, {
			text: "YB97",
			onClick: this._onDeveloperClick,
		});

		this._renderChild("mentor", ButtonComponent, {
			text: "8coon",
			onClick: this._onDeveloperClick,
		});
	}

	_onDeveloperClick() {
		const developer = event.target;
		switch (developer.text) {
			case "armelior":
				location.href = "https://github.com/armelior";
				break;
			case "mouseartiom":
				location.href = "https://github.com/mouseartiom";
				break;
			case "0sektor0":
				location.href = "https://github.com/0sektor0";
				break;
			case "YB97":
				location.href = "https://github.com/YB97";
				break;
			case "8coon":
				location.href = "https://github.com/8coon";
				break;
		}

	}
}
