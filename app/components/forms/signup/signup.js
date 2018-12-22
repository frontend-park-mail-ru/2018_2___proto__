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
		this._loginInfo = this._element.querySelector(`[class=${loginPopup}]`);
		this._emailInfo = this._element.querySelector(`[class=${emailPopup}]`);
		this._passInfo = this._element.querySelector(`[class=${passPopup}]`);
		this._passRepInfo = this._element.querySelector(`[class=${passRepPopup}]`);
	}

	_renderChildren() {
		this.renderChild("submit", ButtonComponent, {
			text: "Регистрация",
			onClick: this._onSubmitClick.bind(this),
		});

		this.renderChild("toSignIn", LinkComponent, {
			text: "Уже зарегистрированы? Войдите здесь",
			onClick: this._onAlreadyRegisteredClick.bind(this),
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
		const errorEmailInfo = Validator.validateEmail(this._email.value);
		const errorPassInfo = Validator.validatePass(this._pass.value);

		if (errorLoginInfo === true
			&& errorEmailInfo === true
			&& errorPassInfo === true
			&& this._pass.value === this._passRep.value
		) {
			http.signup(this._login.value, this._email.value, this._pass.value)
				.then((response) => {
					if (response.status !== 201) {
						throw response;
					}
				})
				.then(() => http.signin(this._login.value, this._pass.value)
					.then((response) => {
						if (response.status !== 200) {
							throw response;
						}

						this._context.navigate("menu");
					}))
				.catch((error) => {
					error.json().then((info) => {
						this._element.querySelector("[data=modal-info]").innerHTML = info.msg;
						this._onModalOpen();
					});
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

	_onModalCloseClick() {
		this._element.querySelector("[id=modal]").style.display = "none";
	}

	_onModalOpen() {
		this._element.querySelector("[id=modal]").style.display = "block";
	}
}
