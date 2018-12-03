import "./game.scss";
import template from "./game.hbs";
import BaseComponent from "../baseComponent";
import ButtonComponent from "../button/button";
import Canvas from "../../game/animation/render";
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
		const [backgroundCanvas] = document.getElementsByClassName("game-screen__background");
		this.bg = new Canvas(backgroundCanvas, 1000, 600);

		const [heroCanvas] = document.getElementsByClassName("game-screen__heroes");
		this.heroes = new Canvas(heroCanvas, 1000, 600);

		const background = {
			image_name: "full-bg",
			pos_x: 0, // coords of the sprite"s top left point
			pos_y: 0,
			width: 1920, // size of the image
			height: 1080,
		};
		this.bg.draw(background);

		const heroLeft = {
			image_name: "wiz_idle_left",
			pos_x: 0,
			pos_y: 100,
			width: 2248,
			height: 368,
			numberOfFrames: 10,
			ticksPerFrame: 2,
		};
		this.heroes.animate(heroLeft);

		const heroRight = {
			image_name: "knight_idle_right",
			pos_x: 500, // coords of the sprite"s top left point
			pos_y: 100,
			width: 4406, // size of the spritestrip
			height: 322,
			numberOfFrames: 12, // amount of frames in spritestrip
			ticksPerFrame: 2, // speed of animation, more is slower
		};
		this.heroes.animate(heroRight);
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
