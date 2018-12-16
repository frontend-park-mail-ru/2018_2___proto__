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

		// debugger
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
				console.log(question.Text());
				this.showQuestion(question);
				clearInterval(playerCountUpTimer);
			}, timeToAnswer );

			// while (this.timeIsOut !== true) { }

			heroesAlive = !!+this.heroInfo.playerHP && !!+this.heroInfo.opponentHP;
			break;
		}
	}

	showQuestion(question) {
		const context = {
			questionWindow: true,
			question: question.Text(),
			answer1: question.GetAnswer(1),
			answer2: question.GetAnswer(2),
			answer3: question.GetAnswer(3),
			answer4: question.GetAnswer(4),
		};
		// this.game.renderChild("question_window", QuestionComponent, context);
	}

	_countTime() {
		this.playerCountUpTime += 100;
		// console.log(this.playerCountUpTime);
	}
}
