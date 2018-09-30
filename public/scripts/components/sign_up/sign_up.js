import "./sign_up.css";
import template from "./sign_up.hbs";
import BaseComponent from "../baseComponent/baseComponent";
import ButtonComponent from "../button/button";

/**
 * Компонент SignUp
 */
export default class SignUpComponent extends BaseComponent {
	constructor() {
		super();
		this.template = template;
		// this.events = {
		// 	click: this._onSubmitClick.bind(this),
		// };
	}

	render(context) {
		super.render(context);
		this.renderChild("register", ButtonComponent, {
			text: "Sign Up",
			onClick: this._onSubmitClick.bind(this),
		});
	}

	_onSubmitClick() {

	}

	_onAlreadyRegisteredClick() {
		this._context.navigate("signin");
	}
}