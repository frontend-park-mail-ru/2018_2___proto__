import "../form.scss";
import template from "./signin.hbs";
import BaseComponent from "../../baseComponent";
import ButtonComponent from "../../button/button";
import LinkComponent from "../../link/link";
import http from "../../../modules/http";
import Validator from "../../../modules/validation";
import { loginPopup, passPopup } from "../../../modules/constants";

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
		this._login = this._element.querySelector("[data=login]");
		this._pass = this._element.querySelector("[data=pass]");
		this._loginInfo = this._element.querySelector(`[class=${loginPopup}]`);
		this._passInfo = this._element.querySelector(`[class=${passPopup}]`);
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

		this._element.querySelector("[id=close]").onclick = this._onModalCloseClick.bind(this);

		window.onclick = (event) => {
			if (event.target === this._element.querySelector("[id=modal]")) {
				this._onModalCloseClick();
			}
		};
	}

	_onSubmitClick() {
		const errorLoginInfo = Validator.validateLogin(this._login.value);
		const errorPassInfo = Validator.validatePass(this._pass.value);

		if (errorLoginInfo === true && errorPassInfo === true) {
			http.signin(this._login.value, this._pass.value)
				.then((response) => {
					if (response.status !== 200) {
						throw new Error(response.msg);
					}

					this._context.navigate("menu");
				})
				.catch((error) => {
					this._element.querySelector("[data=modal-info]").innerHTML = error;
					this._onModalOpen();
				});
		} else {
			if (errorLoginInfo === true) {
				this._login.classList.remove("error");
				this._loginInfo.innerHTML = "";
			} else {
				this._login.classList.add("error");
				this._loginInfo.innerHTML = errorLoginInfo;
			}

			if (errorPassInfo === true) {
				this._pass.classList.add("error");
				this._passInfo.innerHTML = "";
			} else {
				this._pass.classList.add("error");
				this._passInfo.innerHTML = errorPassInfo;
			}
		}
	}

	_onNotRegisteredClick() {
		this._context.navigate("signup");
	}

	/**
	 * Callback на нажатие "X" в модальной форме
	 */
	_onModalCloseClick() {
		this._element.querySelector("[id=modal]").style.display = "none";
	}

	/**
	 * Callback на открытие модальной формы
	 */
	_onModalOpen() {
		this._element.querySelector("[id=modal]").style.display = "block";
	}
}
