import "./game.scss";
import template from "./game.hbs";
import BaseComponent from "../baseComponent";
import ButtonComponent from "../button/button";
import GameScene from "../../game/engine/core/gameScene";
import GameObject from "../../game/engine/core/gameObject";
import HeroBehaviour from "../../game/gameplay/heroBehaviour";
import LocalServer from "../../game/serverSide/localGameServer";

/**
 * Компонент игры
 */

export default class GameComponent extends BaseComponent {
	constructor() {
		super();
		this.template = template;
	}

	render(context) {
		super.render(context);
		this.renderChild("isReadyButton", ButtonComponent, {
			text: "Ready",
			onClick: this.prepareGame.bind(this),
		});
	}

	prepareGame() {
		this._scene = new GameScene();
		this._heroObject = new GameObject();
		this._heroObject.AddBehaviour(new HeroBehaviour("test", this._scene));
		this._heroObject.Enable();
		this._scene.Render();
		this._localServer = new LocalServer();
		this.render({ isReady: true });
		this._localServer.StartGame();
	}
}
