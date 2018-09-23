"use strict";

import baseComponent from "../baseComponent/baseComponent.js";
import buttonComponent from "../button/button.js";

const authButtons = {
	"Sign In": renderSignIn,
	"Sign Up": renderSignUp
};

export default class authBlockComponent extends baseComponent {
	constructor() {
		super();
		this.fillBlock();
		this.context = {
			
		}
	}

	render(context) {
		this._template = require("./auth-block.hbs");
		super.render(context);
	}

	fillBlock() {
		Object.entries(authButtons).forEach(([title, method]) => {
			this.appendChild(this.addButton(title, method));
		});
	}

	addButton(title, method) {
		let btnComp = new buttonComponent({
			text: title,
			click: method
		});

		btnComp.render(btnComp.context);
		let button = btnComp.element();
		return button;
	}
}
