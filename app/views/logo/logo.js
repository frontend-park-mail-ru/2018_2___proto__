import "./logo.scss";
import template from "./logo.hbs";
import BaseView from "../baseView";

/**
 * Компонент Logo
 */
export default class LogoView extends BaseView {
	constructor() {
		super();
		this.template = template;
		this.events = {
			click: this._onLogoClick.bind(this),
		};
	}

	/**
	 * Нажатие на сам логотип рендерит меню (как возврат на index)
	 */
	_onLogoClick() {
		this._context.navigate("menu");
	}
}
