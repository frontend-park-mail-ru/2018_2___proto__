import "./sign_up.css";
import template from "./sign_up.hbs";
import BaseComponent from "../baseComponent/baseComponent";
import ButtonComponent from "../button/button";
import httpModule from "../../modules/http";
import { regexLogin, regexEmail, regexPass } from "../../modules/constants";

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
		let errorInfo = "";

		if (this._login.value
			&& this._email.value
			&& this._password.value
			&& this._passwordRepeat.value
		) {
			// Матчим Login
			if (!this._login.value.match(regexLogin)) {
				errorInfo += "Error: login must not starts with a digit\n";
			}

			// Матчим E-Mail
			if (!this._email.value.match(regexEmail)) {
				errorInfo += "Error: e-mail is incorrect\n";
			}

			// Матчим Password
			if (!this._password.value.match(regexPass) || !this._passwordRepeat.value.match(regexPass)) {
				errorInfo += "Error: password length must be 6 or more symbols\n";
			}

			if (this._password.value !== this._passwordRepeat.value) {
				errorInfo += "Error: passwords do not match\n";
			}
		} else {
			errorInfo += "Error: some fields are empty";
		}

		if (errorInfo === "") {
			httpModule.doPost({
				callback: (xhr) => {
					if (xhr.status === 201) {
						// alert("You've been successfully registered");
						this._context.navigate("menu");
					}
					// else {
					// 	alert(xhr.statusText);
					// }
				},
				body: {
					nickname: this._login.value,
					password: this._password.value,
					email: this._email.value,
				},
				path: "https://rasseki.org:8443/signup",
			});
		} else {
			this._info.innerText = errorInfo;
		}
	}

	_onAlreadyRegisteredClick() {
		this._context.navigate("signin");
	}
}
