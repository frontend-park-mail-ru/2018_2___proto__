import QuestionManager from "../gameplay/questionManager";
import QuestionComponent from "../../components/question/question";


export default class LocalGameServer {
	constructor(game, manager) {
		this.game = game;
		this.canvasManager = manager;
		this.questionManager = new QuestionManager();
	}

	StartGame() {
		this.heroInfo = {
			playerHP: 4,
			opponentHP: 4,
		};

		// game starts here
		this.timeIsOut = false;
		this.roundTime = 10;
		let question;
		let heroesAlive = !!+this.heroInfo.playerHP && !!+this.heroInfo.opponentHP;

		while (heroesAlive !== false) {
			question = this.questionManager.NewQuestion();
			const timeToAnswer = question.TimeToAnswer();
			const playerCountUpTimer = setInterval(this._countTime.bind(this), 100);
			const countDownTimer = setTimeout(() => {
				this.timeIsOut = true;
				this._showQuestion(question);
				clearInterval(playerCountUpTimer);
			}, timeToAnswer );

			// while (this.timeIsOut !== true) { }

			heroesAlive = !!+this.heroInfo.playerHP && !!+this.heroInfo.opponentHP;
			break;
		}
	}

	_showQuestion(question) {
		const context = {
			questionWindow: true,
			questionText: question.Text(),
			answer1: question.GetAnswer(0),
			answer2: question.GetAnswer(1),
			answer3: question.GetAnswer(2),
			answer4: question.GetAnswer(3),
		};
		this.game.renderChild("question_window", QuestionComponent, context);
	}

	_hideQuestion() {
		const context = {
			questionWindow: false,
		};
		this.game.renderChild("question_window", QuestionComponent, context);
	}

	_countTime() {
		this.playerCountUpTime += 100;
	}
}
