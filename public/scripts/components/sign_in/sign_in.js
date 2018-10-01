import "./sign_in.css";
import template from "./sign_in.hbs";
import BaseComponent from "../baseComponent/baseComponent";
import ButtonComponent from "../button/button";
import ajaxModule from "../../modules/ajax";

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
		this._info.innerText = "";

		if (this._login.value && this._password.value) {
			ajaxModule.doPost({
				callback: (xhr) => {
					if (xhr.status === 200) {
						alert("You've logged in");
						this._context.navigate("menu");
					} else {
						alert(xhr.statusText);
					}
				},
				body: {
					nickname: this._login.value,
					password: this._password.value,
				},
				path: "/signin",
			});
		} else {
			this._info.innerText += "Error: some fields are empty\n";
		}
	}

	_onNotRegisteredClick() {
		this._context.navigate("signup");
	}
}
