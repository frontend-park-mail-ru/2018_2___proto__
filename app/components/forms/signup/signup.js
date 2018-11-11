import "../form.scss";
import template from "./signup.hbs";
import BaseComponent from "../../baseComponent";
import ButtonComponent from "../../button/button";
import LinkComponent from "../../link/link";
import http from "../../../modules/http";
import Validator from "../../../modules/validation";
import {
	loginPopup,
	emailPopup,
	passPopup,
	passRepPopup,
} from "../../../modules/constants";


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
		this._login = this._element.querySelector("[data=login]");
		this._email = this._element.querySelector("[data=email]");
		this._pass = this._element.querySelector("[data=pass]");
		this._passRep = this._element.querySelector("[data=passRep]");
		this._loginInfo = this._element.querySelector(`[class=${loginPopup}]`)
		this._emailInfo = this._element.querySelector(`[class=${emailPopup}]`);
		this._passInfo = this._element.querySelector(`[class=${passPopup}]`);
		this._passRepInfo = this._element.querySelector(`[class=${passRepPopup}]`);
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
		const errorLoginInfo = Validator.validateLogin(this._login.value);
		const errorEmailInfo = Validator.validateEmail(this._email.value);
		const errorPassInfo = Validator.validatePass(this._pass.value);

		if (errorLoginInfo === ""
			&& errorEmailInfo === ""
			&& errorPassInfo === ""
			&& this._pass.value === this._passRep.value) {
			http.signup(this._login.value, this._email.value, this._pass.value).then((signUpResponse) => {
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
		} else {
			if (errorLoginInfo === true) {
				this._login.classList.remove("error");
				this._loginInfo.innerHTML = "";
			} else {
				this._login.classList.add("error");
				this._loginInfo.innerHTML = errorLoginInfo;
			}

			if (errorEmailInfo === true) {
				this._email.classList.remove("error");
				this._emailInfo.innerHTML = "";
			} else {
				this._email.classList.add("error");
				this._emailInfo.innerHTML = errorEmailInfo;
			}

			if (errorPassInfo === true) {
				this._pass.classList.remove("error");
				this._passInfo.innerHTML = "";
			} else {
				this._pass.classList.add("error");
				this._passInfo.innerHTML = errorPassInfo;
			}

			if (!this._passRep.value) {
				this._passRep.classList.add("error");
				this._passRepInfo.innerHTML = "Field is empty";
			} else if (this._pass.value !== this._passRep.value) {
				this._passRep.classList.add("error");
				this._passRepInfo.innerHTML = "Passwords do not match";
			} else {
				this._passRep.classList.remove("error");
				this._passRepInfo.innerHTML = "";
			}
		}
	}

	_onAlreadyRegisteredClick() {
		this._context.navigate("signin");
	}
}
