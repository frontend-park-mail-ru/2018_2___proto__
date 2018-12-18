import "./profile.scss";
import template from "./profile.hbs";
import BaseComponent from "../baseComponent";
import ButtonComponent from "../button/button";
import http from "../../modules/http";
import Validator from "../../modules/validation";
import { loginPopup, passPopup } from "../../modules/constants";

/**
 * Компонент profile
 */
export default class ProfileComponent extends BaseComponent {
	constructor() {
		super();
		this.template = template;
		this._context = {
			preloader: true,
			changeProfile: false,
		};
	}

	render() {
		super.render();
		http.getUser().then((info) => {
			const context = { ...{ preloader: false }, ...info };
			context.avatar = `https://rasseki.pro/public/avatars/${info.avatar}`;
			super.render(context);
			this._login = this._element.querySelector("[ref=login]");
			this._pass = this._element.querySelector("[ref=pass]");
			this._loginInfo = this._element.querySelector(`[class=${loginPopup}]`);
			this._passInfo = this._element.querySelector(`[class=${passPopup}]`);

			this.renderChild("changeProfile", ButtonComponent, {
				text: "Change profile",
				onClick: this._onChangeProfileClick.bind(this),
			});

			this.renderChild("saveProfile", ButtonComponent, {
				text: "Save profile",
				onClick: this._onSaveProfileClick.bind(this),
			});
		});
	}

	_onChangeProfileClick() {
		this._context = {
			preloader: true,
			changeProfile: true,
		};

		this.render();
	}

	_onSaveProfileClick() {
		const errorLoginInfo = Validator.validateLogin(this._login.value);
		const errorPassInfo = Validator.validatePass(this._pass.value);

		if (errorLoginInfo === "" && errorPassInfo === "") {
			http.updateUser(this._login.value, this._pass.value).then((response) => {
				if (response.status === 200) {
					this._context.navigate("menu");
				} else {
					response.json().then((result) => {
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

			if (errorPassInfo === true) {
				this._pass.classList.add("error");
				this._passInfo.innerHTML = "";
			} else {
				this._pass.classList.add("error");
				this._passInfo.innerHTML = errorPassInfo;
			}
		}
	}
}
