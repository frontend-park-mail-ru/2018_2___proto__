// please kill me for this
function LoadQuestion() {
	const questionsJSON = `{
        "questions": [
          {
            "text": "question1",
            "correctAnswerIndex": 0,
            "timeToAnswer": 5,
            "answers": [
              "true",
              "false",
              "false",
              "true"
            ]
          },
          {
            "text": "question2",
            "correctAnswerIndex": 0,
            "timeToAnswer": 5,
            "answers": [
              "true",
              "false",
              "false",
              "true"
            ]
          },
          {
            "text": "question3",
            "correctAnswerIndex": 0,
            "timeToAnswer": 5,
            "answers": [
              "true",
              "false",
              "false",
              "true"
            ]
          },
          {
            "text": "question4",
            "correctAnswerIndex": 0,
            "timeToAnswer": 5,
            "answers": [
              "true",
              "false",
              "false",
              "true"
            ]
          }
        ]
      }`;
	const questionInfoArray = new Array();
	const questionsArray = JSON.parse(questionsJSON).questions;
	questionsArray.forEach((question) => {
		questionInfoArray.push(new QuestionInfo(question));
	});
	return questionInfoArray;
}

export default class QuestionManager {
	static Instance() {
		if (this._instance === null) { this._instance = new QuestionManager(); }
		return this._instance;
	}

	NewQuestion() {
		if (this._usedQuestions.length === 0 && this._questionStorage.length === 0) {
			console.exception("not enough questions");
			return new QuestionInfo(undefined);
		}
		if (this._usedQuestions.length !== 0 && this._questionStorage.length === 0) {
			this._questionStorage = this._usedQuestions;
			this._usedQuestions = new Array();
		}
		const index = Math.floor(Math.random() * this._questionStorage.length);
		const question = this._questionStorage[index];
		this._questionStorage.splice(index, 1);
		this._usedQuestions.push(question);
		return question;
	}

	constructor() {
		this._questionStorage = LoadQuestion();
		this._usedQuestions = new Array();
	}
}


class QuestionInfo {
	Text() {
		return this._text;
	}

	TimeToAnswer() {
		return this._timeToAnswer;
	}

	AnswersCount() {
		return this._answers.length;
	}

	constructor(question) {
		this._answers = question.answers;
		this._correctAnswerIndex = question.correctAnswerIndex;
		this._timeToAnswer = question.timeToAnswer;
		this._text = question.text;
	}

	GetAnswer(i) {
		if (i < 0 || i > this.AnswersCount) { i = 0; }
		return this._answers[i];
	}

	CheckAnswerCorrectness(answerIndex) {
		return answerIndex === this._correctAnswerIndex;
	}
}
