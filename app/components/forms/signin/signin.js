import "../form.scss";
import template from "./signin.hbs";
import BaseComponent from "../../baseComponent";
import ButtonComponent from "../../button/button";
import LinkComponent from "../../link/link";
import http from "../../../modules/http";
import validate from "../../../modules/authorization";

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
		this._renderChildren();
		this._info = this._element.querySelector("[ref=info]");
		this._login = this._element.querySelector("[ref=login]");
		this._pass = this._element.querySelector("[ref=pass]");
		// this._info = this._element.querySelector("[ref=info]");
	}

	_renderChildren() {
		this.renderChild("submit", ButtonComponent, {
			text: "Sign In",
			onClick: this._onSubmitClick.bind(this),
		});

		this.renderChild("toSignUp", LinkComponent, {
			text: "Not registered? Sign Up!",
			onClick: this._onNotRegisteredClick.bind(this),
		});
	}

	_onSubmitClick() {
		const errorInfo = validate(this._login.value, this._pass.value);
		// if (errorInfo !== true) {
		// 	this._info.innerText = errorInfo;
		// } else {
		if (errorInfo === true) {
			console.log(`SignIn Request: ${this._login.value} ${this._pass.value}`);
			http.signin(this._login.value, this._pass.value).then((response) => {
				if (response.status === 200) {
					this._context.navigate("menu");
				} else {
					response.json().then((result) => {
						console.log(result.msg);
					});
				}
				// if (status === 200) {
				// 	this._context.navigate("menu");
				// } else {
				// 	console.log
				// }
			});
		} else {
			console.log(`FrontendValidation failed: ${errorInfo}`);
		}
	}

	_onNotRegisteredClick() {
		this._context.navigate("signup");
	}
}
