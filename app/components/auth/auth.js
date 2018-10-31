import "./auth.scss";
import template from "./auth.hbs";
import BaseComponent from "../baseComponent";
import ButtonComponent from "../button/button";
import http from "../../modules/http";
import { backend } from "../../modules/constants";

/**
 * Компонент Auth
 */
export default class AuthComponent extends BaseComponent {
	constructor() {
		super();
		this.template = template;
		// http.doGet({
		// 	callback: (xhr) => {
		// 		if (xhr.status === 200) {
		// 			this.render({ isOnline: true });
		// 		} else {
		// 			this.render({ isOnline: false });
		// 		}
		// 	},
		// 	path: `${backend}/session`,
		// });
	}

	render(context) {
		super.render(context);
		this._renderChildren();
	}

	/**
	 * Рендерит все кнопки и вешает на них callback
	 */

	_renderChildren() {
		this.renderChild("signin", ButtonComponent, {
			text: "Sign In",
			onClick: this._onSignInClick.bind(this),
		});

		this.renderChild("signup", ButtonComponent, {
			text: "Sign Up",
			onClick: this._onSignUpClick.bind(this),
		});

		this.renderChild("logout", ButtonComponent, {
			text: "Log Out",
			onClick: this._onLogOutClick.bind(this),
		});
	}

	/**
	 * Callback на нажатие "Sign In"
	 */
	_onSignInClick() {
		this._context.navigate("signin");
	}

	/**
	 * Callback на нажатие "Sign Up"
	 */
	_onSignUpClick() {
		this._context.navigate("signup");
	}

	/**
	 * Callback на нажатие "Log Out"
	 */
	_onLogOutClick() {
		// http.doDelete({
		// 	path: `${backend}/logout`,
		// });
		this._context.navigate("menu");
	}
}
