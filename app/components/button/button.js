import "./button.scss";
import template from "./button.hbs";
import BaseComponent from "../baseComponent";

/**
 * Компонент кнопки
 */
export default class ButtonComponent extends BaseComponent {
	constructor() {
		super();
		this.template = template;
		this._context = {
			text: "",
			onClick: null,
			href: null,
		};
		this.events = {
			click: this._onClick.bind(this),
		};
	}

	/**
	 * Нажатие на кнопку
	 * @param {event} event - sender
	 */
	_onClick(event) {
		if (!this._context.href) {
			event.preventDefault();
		}

		if (this._context.onClick) {
			this._context.onClick();
		}
	}
}
