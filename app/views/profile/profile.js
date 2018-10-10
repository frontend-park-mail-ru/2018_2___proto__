import "./profile.scss";
import template from "./profile.hbs";
import BaseView from "../baseView";
import ButtonView from "../button/button";
import httpModule from "../../modules/http";
import { regexLogin, regexPass } from "../../modules/constants";

/**
 * Компонент profile
 */
export default class ProfileView extends BaseView {
	constructor() {
		super();
		this.template = template;
		this._context = {
			changeProfile: false,
		};
	}

	render(context) {
		let newContext = {};

		httpModule.doGet({
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

		if (newContext !== {}) {
			this.renderChild("changeProfile", ButtonView, {
				text: "Change profile",
				onClick: this._onChangeProfileClick.bind(this),
			});

			this.renderChild("saveProfile", ButtonView, {
				text: "Save profile",
				onClick: this._onSaveProfileClick.bind(this),
			});
		}

		// if (newContext === {}) {
		// 	alert("Unauthorized");
		// } else {
		// 	this.renderChild("changeProfile", ButtonComponent, {
		// 		text: "Change profile",
		// 		onClick: this._onChangeProfileClick.bind(this),
		// 	});

		// 	this.renderChild("saveProfile", ButtonComponent, {
		// 		text: "Save profile",
		// 		onClick: this._onSaveProfileClick.bind(this),
		// 	});
		// }
	}

	_onChangeProfileClick() {
		this._context = {
			changeProfile: true,
		};

		this.render();
	}

	_onSaveProfileClick() {
		let errorInfo = "";

		if (this._login.value && !this._login.value.match(regexLogin)) {
			errorInfo += "Error: login must not starts with a digit\n";
		}

		if (this._password.value && this._passwordRepeat.value) {
			if (
				!this._password.value.match(regexPass)
				|| !this._passwordRepeat.value.match(regexPass)
			) {
				errorInfo += "Error: password length must be 6 or more symbols\n";
			}

			if (this._password.value !== this._passwordRepeat.value) {
				errorInfo += "Error: passwords do not match\n";
			}
		}

		if (this._password.value !== this._passwordRepeat.value) {
			errorInfo += "Error: passwords do not match\n";
		}

		if (errorInfo === "") {
			httpModule.doPut({
				body: {
					nickname: this._login.value,
					password: this._password.value,
				},
				path: "https://rasseki.org:8443/user",
			});
		}
	}
}
