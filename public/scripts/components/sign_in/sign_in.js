import "./sign_in.css";
import template from "./sign_in.hbs";
import BaseComponent from "../baseComponent/baseComponent";
import ButtonComponent from "../button/button";
import httpModule from "../../modules/http";

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
		this._password = this._element.querySelector("[ref=password]");
		this.renderChild("submit", ButtonComponent, {
			text: "Sign In",
			onClick: this._onSubmitClick.bind(this),
		});
	}

	_onSubmitClick() {
		let errorInfo = "";

		if (this._login.value && this._password.value) {
			httpModule.doPost({
				callback: (xhr) => {
					if (xhr.status === 200) {
						// alert("You've logged in");
						this._context.navigate("menu");
					}
					// else {
					// 	alert(xhr.statusText);
					// }
				},
				body: {
					nickname: this._login.value,
					password: this._password.value,
				},
				path: "https://rasseki.org:8443/signin",
			});
		} else {
			errorInfo += "Error: some fields are empty\n";
			this._info.innerText = errorInfo;
		}
	}

	_onNotRegisteredClick() {
		this._context.navigate("signup");
	}
}
