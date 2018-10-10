import "./auth.scss";
import template from "./auth.hbs";
import BaseView from "../baseView";
import ButtonView from "../button/button";

/**
 * Компонент AuthBar
 */
export default class AuthBarView extends BaseView {
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
		this.renderChild("signin", ButtonView, {
			text: "Sign In",
			onClick: this._onSignInClick.bind(this),
		});

		this.renderChild("signup", ButtonView, {
			text: "Sign Up",
			onClick: this._onSignUpClick.bind(this),
		});

		this.renderChild("logout", ButtonView, {
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
		this._context.navigate("logout");
	}
}
