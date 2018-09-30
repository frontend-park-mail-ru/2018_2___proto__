import "./sign_up.css";
import template from "./sign_up.hbs";
import BaseComponent from "../baseComponent/baseComponent";
import ButtonComponent from "../button/button";

/**
 * Компонент SignUp
 */
export default class SignUpComponent extends BaseComponent {
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
		this.renderChild("register", ButtonComponent, {
			text: "Sign Up",
			onClick: this._onSubmitClick.bind(this),
		});
	}

	_onSubmitClick() {
		this._info.innerText = "";
		const login = this._element.childNodes[1].childNodes[1].value;
		const email = this._element.childNodes[1].childNodes[3].value;
		const password = this._element.childNodes[1].childNodes[5].value;
		const passwordRepeat = this._element.childNodes[1].childNodes[7].value;
		
		if (login && email && password && passwordRepeat) {
			// Матчим Login
			if (login.match(/^[0-9]/)) {
				this._info.innerText += "Error: login must not starts with a digit\n";
			}

			// Матчим E-Mail
			if (!email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
				this._info.innerText += "Error: e-mail is incorrect\n";
			}

			// Матчим Password
			if (!password.match(/[0-9a-zA-Z]{6,}/)) {
				this._info.innerText += "Error: password length must be 6 or more symbols\n";
			} else if (password !== passwordRepeat) {
				this._info.innerText += "Error: passwords do not match\n";
			}
		} else {
			this._info.innerText += "Error: some fields are empty";
		}
	}

	_onAlreadyRegisteredClick() {
		this._context.navigate("signin");
	}
}