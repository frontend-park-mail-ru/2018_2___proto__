import "./sign_in.css";
import template from "./sign_in.hbs";
import BaseComponent from "../baseComponent/baseComponent";
import ButtonComponent from "../button/button";

/**
 * Компонент SignIn
 */
export default class SignInComponent extends BaseComponent {
	constructor() {
		super();
		this.template = template;
		// this.events = {
		// 	click: this._onSubmitClick.bind(this),
		// };
	}

	render(context) {
		debugger;
		super.render(context);
		this.renderChild("login", ButtonComponent, {
			text: "Sign In",
			onClick: this._onSubmitClick.bind(this),
		});
	}

	_onSubmitClick() {}

	_onNotRegisteredClick() {
		this._context.navigate("signup");
	}
}
