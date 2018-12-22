import QuestionManager from "../gameplay/questionManager";
import QuestionComponent from "../../components/question/question";
import GameoverComponent from "../../components/question/gameover/gameover";
import Bus from "../../modules/bus";

// I don't know who wrote this.
export default class LocalGameServer {
	constructor(game, manager) {
		this.game = game;
		this.canvasManager = manager;
		this.questionManager = new QuestionManager();

		Bus.on("answer", (index) => {
			this.answerIndex = index;
			// console.log(index);
			this._checkAnswer(this.answerIndex);
		});

		Bus.on("newGame", () => {
			this._hideGameOverWindow();
			this.StartGame();
		});

		Bus.on("cancel", () => {
			this._clearTimeouts();
			location.reload();
		});
	}

	StartGame() {
		this.heroInfo = {
			playerHP: 4,
			npcHP: 4,
			playerAlive: true,
			npcAlive: true,
		};

		this._refreshGame();

		// game starts here
		this.playerAnswerTime = 0;

		setTimeout(() => {
			this._showQuestion();
		}, 2000);
	}

	_showQuestion() {
		if (!this.heroInfo.playerAlive || !this.heroInfo.npcAlive) return;
		this.currentQuestion = this.questionManager.NewQuestion();
		this.timeToAnswer = this.currentQuestion.TimeToAnswer();
		this.playerAnswerTime = 0;
		this.playerCountUpTimer = setInterval(this._countTime.bind(this), 100);

		// timer for answering
		setTimeout(() => {
			// this.timeIsOut = true;
			clearInterval(this.playerCountUpTimer);
		}, this.timeToAnswer * 1000);

		const context = {
			questionWindow: true,
			questionText: this.currentQuestion.Text(),
			answer1: this.currentQuestion.GetAnswer(0),
			answer2: this.currentQuestion.GetAnswer(1),
			answer3: this.currentQuestion.GetAnswer(2),
			answer4: this.currentQuestion.GetAnswer(3),
		};
		this.game.renderChild("question_window", QuestionComponent, context);
		this.game.manager.getCanvas("interface").drawNumber(this.timeToAnswer);

		this.answerTimeout = setTimeout(() => {
			// this._hideQuestion();
			this._checkAnswer(-1);
		}, this.currentQuestion.TimeToAnswer() * 1000);
	}

	_checkAnswer(answerIndex) {
		clearTimeout(this.answerTimeout);
		clearInterval(this.playerCountUpTimer);
		const correctPlayerAnswer = this.currentQuestion.CheckAnswerCorrectness(answerIndex);

		const npcAnswer = this._npcAnswer(this.currentQuestion.TimeToAnswer());
		const correctNPCAnswer = this.currentQuestion.CheckAnswerCorrectness(npcAnswer.answerIndex);

		console.log("player:", correctPlayerAnswer, "npc:", correctNPCAnswer);
		console.log("player:", this.playerAnswerTime, "npc:", npcAnswer.answerTime);

		// AI comes here!
		if (correctPlayerAnswer) {
			if (correctNPCAnswer) {
				if (this.playerAnswerTime < npcAnswer.answerTime) {
					this.attack("player");
				} else {
					this.attack("npc");
				}
			} else if (!correctNPCAnswer) {
				this.attack("player");
			}
		} else if (!correctPlayerAnswer) {
			if (correctNPCAnswer) {
				this.attack("npc");
			} else if (!correctNPCAnswer) {
				if (this.playerAnswerTime < npcAnswer.answerTime) {
					this.attack("player");
				} else {
					this.attack("npc");
				}
			}
		}
		this._hideQuestion();

		let action;
		// let newGame;
		let time;
		if (this.heroInfo.playerAlive && this.heroInfo.npcAlive) {
			action = () => { this._showQuestion(); };
			time = 2000;
		} else if (!this.heroInfo.playerAlive) {
			action = () => {
				// newGame = confirm("Game over!\nPlay again? :D");
				this._showGameOverWindow("Игра окончена!\nПопробовать ещё?");
				// if (newGame) { this.StartGame(); } else { this._clearTimeouts(); }
			};
			time = 3000;
		} else if (!this.heroInfo.npcAlive) {
			action = () => {
				// newGame = confirm("Nice! You've won!!!\nNew game?");
				this._showGameOverWindow("Вы выиграли!\nБудем продолжать?");
				// if (newGame) { this.StartGame(); } else { this._clearTimeouts(); }
			};
			time = 3000;
		}

		setTimeout(action, time);
	}

	attack(whoAttacks) {
		if (whoAttacks === "npc") {
			console.log("NPC attacks!");
			this.game.manager.rightHero.animate("attack");
			if (this.heroInfo.playerHP === 1) {
				this.kill("player");
			} else {
				this.heroInfo.playerHP -= 1;
				this.game.manager.leftHero.decreaseHP();
			}
		}	else if (whoAttacks === "player") {
			console.log("player attacks!");
			this.game.manager.leftHero.animate("attack");
			if (this.heroInfo.npcHP === 1) {
				this.kill("npc");
			} else {
				this.heroInfo.npcHP -= 1;
				this.game.manager.rightHero.decreaseHP();
			}
		}
	}

	kill(subject) {
		if (subject === "npc") {
			this.heroInfo.npcAlive = false;
			this.heroInfo.npcHP -= 1;
			this.game.manager.rightHero.decreaseHP();
			setTimeout(() => {
				this.game.manager.rightHero.animate("die");
			}, 700);
			console.log("NPC dies!");
		}	else if (subject === "player") {
			this.heroInfo.playerAlive = false;
			this.heroInfo.playerHP -= 1;
			this.game.manager.leftHero.decreaseHP();
			setTimeout(() => {
				this.game.manager.leftHero.animate("die");
			}, 700);
			console.log("player dies!");
		}
		// this._clearTimeouts();
	}

	_npcAnswer(maxAnswerTime) {
		const answer = {
			answerIndex: this._getRandomInt(4),
			answerTime: this._getRandomInt(maxAnswerTime * 1000) / 8,
		};
		return answer;
	}

	_hideQuestion() {
		const context = {
			questionWindow: false,
		};
		this.game.renderChild("question_window", QuestionComponent, context);
	}

	_showGameOverWindow(text) {
		const context = {
			gameoverWindow: true,
			statusText: text,
		};
		this.game.renderChild("gameover_window", GameoverComponent, context);
	}

	_hideGameOverWindow() {
		const context = {
			gameoverWindow: false,
		};
		this.game.renderChild("gameover_window", GameoverComponent, context);
	}

	_refreshGame() {
		this.game.manager.getCanvas("interface").drawNumber(-1);
		this.game.manager.rightHero.animate("idle");
		this.game.manager.leftHero.animate("idle");
		this.game.manager.leftHero.setHP(4);
		this.game.manager.rightHero.setHP(4);
	}

	_clearTimeouts() {
		let id = window.setTimeout(() => {}, 0);

		while (id) {
			window.clearTimeout(id);
			id -= 1;
		}
	}

	_countTime() {
		this.playerAnswerTime += 100;
		if (this.playerAnswerTime % 1000 === 0) {
			this.timeToAnswer -= 1;
			this.game.manager.getCanvas("interface").drawNumber(this.timeToAnswer);
		}
	}

	_getRandomInt(max) {
		return Math.floor(Math.random() * Math.floor(max));
	}
}
