import "./form.css";
import template from "./form.hbs";
import BaseComponent from "../baseComponent/baseComponent";
import ButtonComponent from "../button/button";

/**
 * Компонент Logo
 */
export default class SignInComponent extends BaseComponent {
	constructor() {
		super();
		this.template = template;
		this.events = {
			click: this._onSubmitClick.bind(this),
		};
	}

	render(context) {
		super.render(context);
		this.renderChild("login", ButtonComponent, {
			text: "Log in",
			onClick: this._onSubmitClick.bind(this),
		});
	}

	/**
	 * Нажатие на сам логотип рендерит меню (как возврат на index)
	 */

	_onSubmitClick() {
		this._context.navigate("menu");
	}
}
