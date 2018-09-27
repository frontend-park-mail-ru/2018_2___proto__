"use strict";

import "./logo.css";
import BaseComponent from "../baseComponent/baseComponent.js";
import MenuComponent from "../menu/menu.js";

export default class LogoComponent extends BaseComponent {
	constructor() {
		super();
		this._template = require("./logo.hbs");
		this.events = {
			click: this._onLogoClick.bind(this)
		};
	}

	_onLogoClick() {
		this._renderMenu();
	}

	_renderMenu() {
		if (document.querySelector("[ref=menu]")) {
			return;
		}

		const menu = new MenuComponent();
		menu.render();
		
		const backside = document.querySelector("[ref=backside]");
		while (backside.firstChild) {
			backside.removeChild(backside.firstChild);
		}

		backside.appendChild(menu.element);
	}
}
