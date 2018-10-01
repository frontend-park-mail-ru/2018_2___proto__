import "./about.css";
import template from "./about.hbs";
import BaseComponent from "../baseComponent/baseComponent";
import ButtonComponent from "../button/button";

/**
 * Компонент About
 */
export default class AboutComponent extends BaseComponent {
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
		this.renderChild("dev-1", ButtonComponent, { text: "armelior", href: "https://github.com/armelior" });
		this.renderChild("dev-2", ButtonComponent, { text: "mouseartiom", href: "https://github.com/mouseartiom" });
		this.renderChild("dev-3", ButtonComponent, { text: "0sektor0", href: "https://github.com/0sektor0" });
		this.renderChild("dev-4", ButtonComponent, { text: "YB97", href: "https://github.com/YB97" });
		this.renderChild("mentor", ButtonComponent, { text: "8coon", href: "https://github.com/8coon" });
	}
}
