import "./profile.css";
import template from "./profile.hbs";
import BaseComponent from "../baseComponent/baseComponent";
import ButtonComponent from "../button/button";
import ajaxModule from "../../modules/ajax";

/**
 * Компонент profile
 */
export default class ProfileComponent extends BaseComponent {
	constructor() {
		super();
		this.template = template;
		this._context = {
			changeProfile: false,
		};
	}

	render(context) {
		const newContext = {};

		ajaxModule.doGet({
			callback(xhr) {
				newContext = JSON.parse(xhr.responseText);
			},
			path: "/user",
		});

		super.render(context);
		this._info = this._element.querySelector("[ref=info]");
		this._login = this._element.querySelector("[ref=login]");
		this._password = this._element.querySelector("[ref=pass]");
		this._passwordRepeat = this._element.querySelector("[ref=pass-rep]");

		if (newContext === {}) {
			alert("Unauthorized");
		} else {
			this.renderChild("changeProfile", ButtonComponent, {
				text: "Change profile",
				onClick: this._onChangeProfileClick.bind(this),
			});
	
			this.renderChild("saveProfile", ButtonComponent, {
				text: "Save profile",
				onClick: this._onSaveProfileClick.bind(this),
			});
		}
	}

	_onChangeProfileClick() {
		this._context = {
			changeProfile: true,
		};

		this.render();
	}

	_onSaveProfileClick() {
		this._info.innerText = "";
		if (this._login.value && !this._login.value.match(/^[a-zA-Z]/)) {
			this._info.innerText += "Error: login must not starts with a digit\n";
		}

		if (this._password.value && this._passwordRepeat.value) {
			if (!this._password.value.match(/[0-9a-zA-Z]{6,}/) || !this._passwordRepeat.value.match(/[0-9a-zA-Z]{6,}/)) {
				this._info.innerText += "Error: password length must be 6 or more symbols\n";
			}

			if (this._password.value !== this._passwordRepeat.value) {
				this._info.innerText += "Error: passwords do not match\n";
			}
		}

		if (this._password.value !== this._passwordRepeat.value) {
			this._info.innerText += "Error: passwords do not match\n";
		}

		if (this._info.innerText !== "") {
			return;
		} else {
			ajaxModule.doPut({
				body: {
					nickname: this._login.value,
					password: this._password.value,
				},
				path: "/user",
			});
		}
	}
}
