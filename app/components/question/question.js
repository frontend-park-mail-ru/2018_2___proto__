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
}
