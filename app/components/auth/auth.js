import "./auth.scss";
import template from "./auth.hbs";
import BaseComponent from "../baseComponent";
import ButtonComponent from "../button/button";

/**
 * Компонент Auth
 */
export default class AuthComponent extends BaseComponent {
	constructor() {
		super();
		this.template = template;
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

	_onLogOutClick() {
		this._context.navigate("menu");
	}
}
