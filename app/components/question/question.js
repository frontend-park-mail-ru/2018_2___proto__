import "./question.scss";
import template from "./question.hbs";
import BaseComponent from "../baseComponent";
import AnswerButtonComponent from "./answer_button/button";

export default class QuestionComponent extends BaseComponent {
	constructor() {
		super();
		this.template = template;
		this._context = {
			questionWindow: false,
			question: "",
			answer1: "",
			answer2: "",
			answer3: "",
			answer4: "",
		};
	}

	render(context) {
		super.render(context);
		this._renderChildren();
	}

	_renderChildren() {
		this.renderChild("answer1", AnswerButtonComponent, {
			answer: this._context.answer1,
			onClick: this._onAnswer1Click.bind(this),
		});
		this.renderChild("answer2", AnswerButtonComponent, {
			answer: this._context.answer2,
			onClick: this._onAnswer2Click.bind(this),
		});
		this.renderChild("answer3", AnswerButtonComponent, {
			answer: this._context.answer3,
			onClick: this._onAnswer3Click.bind(this),
		});
		this.renderChild("answer4", AnswerButtonComponent, {
			answer: this._context.answer4,
			onClick: this._onAnswer4Click.bind(this),
		});
	}

	_onAnswer1Click() {
		alert(this._context.answer1);
	}

	_onAnswer2Click() {
		alert(this._context.answer2);
	}

	_onAnswer3Click() {
		alert(this._context.answer3);
	}

	_onAnswer4Click() {
		alert(this._context.answer4);
	}
}
