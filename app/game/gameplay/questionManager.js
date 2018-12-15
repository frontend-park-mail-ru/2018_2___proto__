import questions from "./questions.json";

export default class QuestionManager {
	static get Instance() {
		if (this._instance == null) this._instance = new QuestionManager();
		return this._instance;
	}

	get NewQuestion() {
		if (this._usedQuestions.length === 0 && this._questionStorage.length === 0) {
			console.exception("not enough questions");
			return new QUestionInfo(undefined);
		}

		if (this._usedQuestions.length !== 0 && this._questionStorage.length === 0) {
			this._questionStorage = this._usedQuestions;
			this._usedQuestions = new Array();
		}

		let index = Math.floor(Math.random() * this._questionStorage.length);
		let question = this._questionStorage[index];
		this._questionStorage.splice(index, 1);
		this._usedQuestions.push(question);
		return question;
	}

	constructor() {
		this._questionStorage = LoadQuestion();
		this._usedQuestions = new Array();
	}
}

// please kill me for this
function LoadQuestion() {
	let questionsJSON = JSON.parse(questions);

	let questionInfoArray = new Array();
	let questionsArray = JSON.parse(questionsJSON)["questions"];

	questionsArray.forEach((question) => {
		questionInfoArray.push(new QuestionInfo(question));
	});

	return questionInfoArray;
}

class QuestionInfo {
	get Text() {
		return this._text;
	}

	get TimeToAnswer() {
		return this._timeToAnswer;
	}

	get AnswersCount() {
		return this._answers.length;
	}

	constructor(question) {
		this._answers = question.answers;
		this._correctAnswerIndex = question.correctAnswerIndex;
		this._timeToAnswer = question.timeToAnswer;
		this._text = question.text;
	}

	GetAnswer(i) {
		if (i < 0 || i > this.AnswersCount) {
			i = 0;
		}

		return this._answers[i];
	}

	CheckAnswerCorrectness(answerIndex) {
		return answerIndex === this._correctAnswerIndex;
	}
}
