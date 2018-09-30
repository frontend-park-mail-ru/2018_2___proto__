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
	}

	render(context) {
		super.render(context);
		this._info = this._element.querySelector("[ref=info]");
		this._login = this._element.querySelector("[ref=login]");
		this._email = this._element.querySelector("[ref=email]");
		this._password = this._element.querySelector("[ref=pass]");
		this._passwordRepeat = this._element.querySelector("[ref=pass-rep]");
		this.renderChild("submit", ButtonComponent, {
			text: "Sign Up",
			onClick: this._onSubmitClick.bind(this),
		});
	}

	_onSubmitClick() {
		this._info.innerText = "";
		
		if (this._login.value && this._email.value && this._password.value && this._passwordRepeat.value) {
			// Матчим Login
			if (!this._login.value.match(/^[a-zA-Z]/)) {
				this._info.innerText += "Error: login must not starts with a digit\n";
			}

			// Матчим E-Mail
			if (!this._email.value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
				this._info.innerText += "Error: e-mail is incorrect\n";
			}

			// Матчим Password
			if (!this._password.value.match(/[0-9a-zA-Z]{6,}/) || !this._passwordRepeat.value.match(/[0-9a-zA-Z]{6,}/)) {
				this._info.innerText += "Error: password length must be 6 or more symbols\n";
			}
			
			if (this._password.value !== this._passwordRepeat.value) {
				this._info.innerText += "Error: passwords do not match\n";
			}
		} else {
			this._info.innerText += "Error: some fields are empty";
		}

		if (this._info.innerText != "") {
			return;
		} else {
			// doPost() ?
		}
	}

	_onAlreadyRegisteredClick() {
		this._context.navigate("signin");
	}
}