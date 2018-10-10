import "./about.scss";
import template from "./about.hbs";
import BaseView from "../baseView";
import ButtonView from "../button/button";

/**
 * Компонент About
 */
export default class AboutView extends BaseView {
	constructor() {
		super();
		this.template = template;
	}

	render(context) {
		super.render(context);
		this._renderChildren();
	}

	/**
	 * Рендерит все кнопки-ссылки
	 */
	_renderChildren() {
		this.renderChild("dev-1", ButtonView, { text: "armelior", href: "https://github.com/armelior" });
		this.renderChild("dev-2", ButtonView, { text: "mouseartiom", href: "https://github.com/mouseartiom" });
		this.renderChild("dev-3", ButtonView, { text: "0sektor0", href: "https://github.com/0sektor0" });
		this.renderChild("mentor", ButtonView, { text: "8coon", href: "https://github.com/8coon" });
	}
}
