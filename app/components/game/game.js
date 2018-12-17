import "./game.scss";
import template from "./game.hbs";
import BaseComponent from "../baseComponent";
import ButtonComponent from "../button/button";
import QuestionComponent from "../question/question";
import Manager from "../../game/animation/manager";
// import GameScene from "../../game/engine/core/gameScene.ts";
// import GameObject from "../../game/engine/core/gameObject.ts";
// import HeroBehaviour from "../../game/gameplay/heroBehaviour.ts";
import LocalGameServer from "../../game/server/server";

// function sleep(ms) {
// 	ms += new Date().getTime();
// 	while (new Date() < ms) {}
// }

/**
 * Компонент игры
 */

export default class GameComponent extends BaseComponent {
	constructor(width, height) {
		super();
		this.template = template;
		this.canvas_width = width;
		this.canvas_height = height;
	}

	render(context) {
		super.render(context);
		this.renderChild("isReadyButton", ButtonComponent, {
			text: "Ready",
			onClick: this._prepareGame.bind(this),
		});
	}

	_renderCanvas() {
		this.manager = new Manager({
			width: document.documentElement.clientWidth,
			height: document.documentElement.clientHeight,
		});

		window.manager = this.manager;
		window.render = this;

		this.manager.addCanvas("game-screen__background")
			.addCanvas("game-screen__interface")
			.addCanvas("game-screen__hero-left")
			.addCanvas("game-screen__hero-right")
			.createHero("wiz", "left")
			.createHero("knight", "right");

		this.manager.getCanvas("background").drawBackground();
		this.manager.getCanvas("interface").drawInterface();
		this.manager.getHero("left").animate("idle");
		this.manager.getHero("right").animate("idle");

		// this.manager.getHero("right").animate("attack");

		// this.manager.getHero("left").decreaseHP();
	}

	_prepareGame() {
		this.render({ isReady: true });
		this._renderCanvas();

		// this._scene = new GameScene();
		// this._heroObject = new GameObject();
		// this._heroObject.AddBehaviour(new HeroBehaviour("test", this._scene));
		// this._heroObject.Enable();
		// this._scene.Render();
		this._localServer = new LocalGameServer(this, this.manager);
		this._localServer.StartGame();
	}
}
