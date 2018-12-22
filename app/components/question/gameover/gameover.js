import "../question.scss";
import "./gameover.scss";
import template from "./gameover.hbs";
import BaseComponent from "../../baseComponent";
import AnswerButtonComponent from "../answer_button/button";
import Bus from "../../../modules/bus";

export default class GameoverComponent extends BaseComponent {
	constructor() {
		super();
		this.template = template;
		this._context = {
			gameoverWindow: false,
			statusText: "",
		};
	}

	render(context) {
		super.render(context);
		this._renderChildren();
	}

	_renderChildren() {
		this.renderChild("cancel", AnswerButtonComponent, {
			answer: "Выйти",
			onClick: this._onCancelClick.bind(this),
		});
		this.renderChild("new", AnswerButtonComponent, {
			answer: "Новая игра",
			onClick: this._onNewClick.bind(this),
		});
	}

	_onCancelClick() {
		Bus.emit("cancel");
	}

	_onNewClick() {
		Bus.emit("newGame");
	}
}
