import "./sign_in.css";
import template from "./sign_in.hbs";
import BaseComponent from "../baseComponent/baseComponent";
import ButtonComponent from "../button/button";

/**
 * Компонент SignIn
 */
export default class SignInComponent extends BaseComponent {
	constructor() {
		super();
		this.template = template;
		// this.events = {
		// 	click: this._onSubmitClick.bind(this),
		// };
	}

	render(context) {
		super.render(context);
		this._info = this._element.querySelector("[ref=info]");
		this._login = this._element.querySelector("[ref=login]");
		this._password = this._element.querySelector("[ref=password]");
		this.renderChild("submit", ButtonComponent, {
			text: "Sign In",
			onClick: this._onSubmitClick.bind(this),
		});
	}

	_onSubmitClick() {
		this._info.innerText = "";

		if (this._login.value && this._password.value) {
			// doPost()?
		} else {
			this._info.innerText += "Error: some fields are empty\n";
		}
	}

	_onNotRegisteredClick() {
		this._context.navigate("signup");
	}
}
