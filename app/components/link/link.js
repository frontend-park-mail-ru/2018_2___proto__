import template from "./link.hbs";
import BaseComponent from "../baseComponent";

/**
 * Компонент ссылки
 */

export default class LinkComponent extends BaseComponent {
	constructor() {
		super();
		this.template = template;
		this._context = {
			text: "",
			onClick: null,
		};

		this.events = {
			click: this._onClick.bind(this),
		};
	}

	/**
	 * Нажатие на ссылку
	 */
	_onClick() {
		if (this._context.onClick) {
			this._context.onClick();
		}
	}
}
