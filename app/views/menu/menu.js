import "./menu.scss";
import template from "./menu.hbs";
import BaseView from "../baseView";
import ButtonView from "../button/button";

/**
 * Компонент меню
 */
export default class MenuView extends BaseView {
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
		this.renderChild("singleplayer", ButtonView, {
			text: "Play singleplayer",
			onClick: this._onSingleplayerClick.bind(this),
		});

		this.renderChild("multiplayer", ButtonView, {
			text: "Play multiplayer",
			onClick: this._onMultiplayerClick.bind(this),
		});

		this.renderChild("profile", ButtonView, {
			text: "View profile",
			onClick: this._onProfileClick.bind(this),
		});

		this.renderChild("leaderboard", ButtonView, {
			text: "Leaderboard",
			onClick: this._onLeaderboardClick.bind(this),
		});

		this.renderChild("about", ButtonView, {
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
