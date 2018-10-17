import "../form.scss";
import template from "./signup.hbs";
import BaseComponent from "../../baseComponent";
import ButtonComponent from "../../button/button";
import http from "../../../modules/http";
import validate from "../../../modules/registration";

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
		this._login = this._element.querySelector("[ref=login]");
		this._email = this._element.querySelector("[ref=email]");
		this._pass = this._element.querySelector("[ref=pass]");
		this._passRep = this._element.querySelector("[ref=passRep]");
		this._info = this._element.querySelector("[ref=info]");
		this.renderChild("submit", ButtonComponent, {
			text: "Sign Up",
			onClick: this._onSubmitClick.bind(this),
		});
	}

	_onSubmitClick() {
		const errorInfo = validate(this._login.value, this._email.value, this._pass.value, this._passRep.value);

		if (errorInfo !== true) {
			this._info.innerText = errorInfo;
		} else {
			http.doPost({
				callback: (xhr) => {
					if (xhr.status === 201) {
						this._context.navigate("menu");
					}
				},
				body: {
					nickname: this._login.value,
					password: this._pass.value,
					email: this._email.value,
				},
				path: "https://rasseki.org:8443/signup",
			});
		}
	}

	_onAlreadyRegisteredClick() {
		this._context.navigate("signin");
	}
}
