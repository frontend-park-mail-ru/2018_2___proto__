import "./menu.scss";
import template from "./menu.hbs";
import BaseComponent from "../baseComponent";
import ButtonComponent from "../button/button";

/**
 * Компонент меню
 */
export default class MenuComponent extends BaseComponent {
	constructor() {
		super();
		this.template = template;
	}

	render(context) {
		super.render(context);
		this._renderChildren();
	}

	/**
	 * Рендерит все кнопки и вешает на них callback
	 */
	_renderChildren() {
		this.renderChild("singleplayer", ButtonComponent, {
			text: "Play singleplayer",
			onClick: this._onSingleplayerClick.bind(this),
		});

		this.renderChild("multiplayer", ButtonComponent, {
			text: "Play multiplayer",
			onClick: this._onMultiplayerClick.bind(this),
		});

		this.renderChild("profile", ButtonComponent, {
			text: "View profile",
			onClick: this._onProfileClick.bind(this),
		});

		this.renderChild("leaderboard", ButtonComponent, {
			text: "Leaderboard",
			onClick: this._onLeaderboardClick.bind(this),
		});

		this.renderChild("about", ButtonComponent, {
			text: "About",
			onClick: this._onAboutClick.bind(this),
		});
	}

	/**
	 * Callback на нажатие "Play singleplayer"
	 */
	_onSingleplayerClick() {
		this._context.navigate("singleplayer");
	}

	/**
	 * Callback на нажатие "Play multiplayer"
	 */
	_onMultiplayerClick() {
		this._context.navigate("multiplayer");
	}

	/**
	 * Callback на нажатие "View profile"
	 */
	_onProfileClick() {
		this._context.navigate("profile");
	}

	/**
	 * Callback на нажатие "Leaderboard"
	 */
	_onLeaderboardClick() {
		this._context.navigate("leaderboard");
	}

	/**
	 * Callback на нажатие "About"
	 */
	_onAboutClick() {
		this._context.navigate("about");
	}
}
