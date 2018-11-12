import "./game.scss";
import template from "./game.hbs";
import BaseComponent from "../baseComponent";

/**
 * Компонент игры
 */

export default class GameComponent extends BaseComponent {
	constructor() {
		super();
		this.template = template;
	}

	render(context) {
		super.render(context);
		this.renderChild();
	}
}
