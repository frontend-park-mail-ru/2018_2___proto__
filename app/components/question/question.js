import "./question.scss";
import template from "./question.hbs";
import BaseComponent from "../baseComponent";

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

/* 	render(context) {
		super.render(context);
		this.renderChild("question_window", QuestionComponent, {
			questionWindow: true,
			question: "question.Text()",
			answer1: "question.GetAnswer(1)",
			answer2: "question.GetAnswer(2)",
			answer3: "question.GetAnswer(3)",
			answer4: "question.GetAnswer(4)",
		});
	} */

	// this.events = {
	// 	click: this._onClick.bind(this),
	// };
}
