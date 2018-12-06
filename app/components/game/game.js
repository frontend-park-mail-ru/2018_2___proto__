import "./game.scss";
import template from "./game.hbs";
import BaseComponent from "../baseComponent";
import ButtonComponent from "../button/button";
import Manager from "../../game/animation/manager";
// import GameScene from "../../game/engine/core/gameScene.ts";
// import GameObject from "../../game/engine/core/gameObject.ts";
// import HeroBehaviour from "../../game/gameplay/heroBehaviour.ts";
// import LocalServer from "../../game/serverSide/localGameServer.ts";

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
			onClick: this.prepareGame.bind(this),
		});
	}

	_renderCanvas() {
		this.manager = new Manager({
			width: 1000,
			height: 600,
		});

		this.manager.addCanvas("game-screen__background")
			.addCanvas("game-screen__interface")
			.addCanvas("game-screen__hero-left")
			.addCanvas("game-screen__hero-right")
			.createHero("wiz", "left")
			.createHero("wiz", "right");

		this.manager.getHero("left").animateIdle();

		this.manager.getCanvas("background").drawBackground();

		this.manager.getCanvas("interface").setLeftHP(0);
	}

	prepareGame() {
		this.render({ isReady: true });
		this._renderCanvas();
		// this._scene = new GameScene();
		// this._heroObject = new GameObject();
		// this._heroObject.AddBehaviour(new HeroBehaviour("test", this._scene));
		// this._heroObject.Enable();
		// this._scene.Render();
		// this._localServer = new LocalServer();
		// this._localServer.StartGame();
	}
}
