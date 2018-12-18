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
			text: this._context.answer1,
			onClick: this._answerEvent(1),
		});
		this.renderChild("answer2", AnswerButtonComponent, {
			text: this._context.answer1,
			onClick: this._answerEvent(2),
		});
		this.renderChild("answer3", AnswerButtonComponent, {
			text: this._context.answer1,
			onClick: this._answerEvent(3),
		});
		this.renderChild("answer4", AnswerButtonComponent, {
			text: this._context.answer1,
			onClick: this._answerEvent(4),
		});
	}

	_answerEvent(answerID) {
		alert(answerID);
	}
}
