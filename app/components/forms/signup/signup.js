import "../form.scss";
import template from "./signup.hbs";
import BaseComponent from "../../baseComponent";
import ButtonComponent from "../../button/button";
import LinkComponent from "../../link/link";
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
		this._renderChildren();
		this._login = this._element.querySelector("[ref=login]");
		this._email = this._element.querySelector("[ref=email]");
		this._pass = this._element.querySelector("[ref=pass]");
		this._passRep = this._element.querySelector("[ref=passRep]");
		// this._info = this._element.querySelector("[ref=info]");
	}

	_renderChildren() {
		this.renderChild("submit", ButtonComponent, {
			text: "Sign Up",
			onClick: this._onSubmitClick.bind(this),
		});

		this.renderChild("toSignIn", LinkComponent, {
			text: "Already registered? Sign In!",
			onClick: this._onAlreadyRegisteredClick.bind(this),
		});
	}

	_onSubmitClick() {
		const errorInfo = validate(this._login.value,
			this._email.value, this._pass.value, this._passRep.value);

		// if (errorInfo !== true) {
		// 	this._info.innerText = errorInfo;
		// } else {
		// debugger;
		if (errorInfo === true) {
			console.log(`SignUp Request: ${this._login.value} ${this._email.value} ${this._pass.value}`);
			http.signup(this._login.value, this._email.value, this._pass.value).then((signUpResponse) => {
				debugger;
				if (signUpResponse.status === 201) {
					http.signin(this._login.value, this._pass.value).then((signInResponse) => {
						if (signInResponse.status === 200) {
							this._context.navigate("menu");
						} else {
							signInResponse.json().then((result) => {
								console.log(result.msg);
							});
						}
					});
				} else {
					signUpResponse.json().then((result) => {
						console.log(result.msg);
					});
				}
			});
			// http.signup(this._login.value, this._email.value, this._pass.value).then((status) => {
			// 	if (status === 201) {
			// 		this._context.navigate("menu");
			// 	}
			// });

			// http.signin(this._login.value, this._pass.value).then((status) => {
			// 	if (status === 200) {
			// 		this._context.navigate("menu");
			// 	}
			// });
		} else {
			console.log(`FrontendValidation failed: ${errorInfo}`);
		}
	}

	_onAlreadyRegisteredClick() {
		this._context.navigate("signin");
	}
}
