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
		this.renderChild("login", ButtonComponent, {
			text: "Sign In",
			onClick: this._onSubmitClick.bind(this),
		});
	}

	_onSubmitClick() {
		const login = (this._element.childNodes[1].childNodes[1].value);
		const password = (this._element.childNodes[1].childNodes[3].value);
		if (login && password) {
			this._info.innerText = "";
			// doPost()?
		} else {
			this._info.innerText = "Error: some fields are empty";
		}
	}

	_onNotRegisteredClick() {
		this._context.navigate("signup");
	}
}
