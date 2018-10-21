import "../form.scss";
import template from "./signin.hbs";
import BaseComponent from "../../baseComponent";
import ButtonComponent from "../../button/button";
import http from "../../../modules/http";
import validate from "../../../modules/authorization";
import backend from "../../modules/constants";

/**
 * Компонент SignIn
 */
export default class SignInComponent extends BaseComponent {
	constructor() {
		super();
		this.template = template;
	}

	render(context) {
		super.render(context);
		this._info = this._element.querySelector("[ref=info]");
		this._login = this._element.querySelector("[ref=login]");
		this._pass = this._element.querySelector("[ref=pass]");
		this._info = this._element.querySelector("[ref=info]");
		this.renderChild("submit", ButtonComponent, {
			text: "Sign In",
			onClick: this._onSubmitClick.bind(this),
		});
	}

	_onSubmitClick() {
		const errorInfo = validate(this._login.validate, this._pass.value);
		if (errorInfo !== true) {
			this._info.innerText = errorInfo;
		} else {
			http.doPost({
				callback: (xhr) => {
					if (xhr.status === 200) {
						this._context.navigate("menu");
					}
				},
				body: {
					nickname: this._login.value,
					password: this._pass.value,
				},
				path: `${backend}/signin`,
			});
		}
	}

	_onNotRegisteredClick() {
		this._context.navigate("signup");
	}
}
