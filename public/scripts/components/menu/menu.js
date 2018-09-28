import "./menu.css";
import template from "./menu.hbs";
import BaseComponent from "../baseComponent/baseComponent";
import ButtonComponent from "../button/button";
// import AboutComponent from "../about/about";

/**
 * Компонент меню
 */
export default class MenuComponent extends BaseComponent {
	constructor() {
		super();
		this.template = template;
	}

	render() {
		super.render();
		this._renderChildren();
	}

	/**
	 * Рендерит все кнопки и вешает на них callback
	 */
	_renderChildren() {
		this.renderChild("singleplayer", ButtonComponent, {
			text: "Play singleplayer",
			onClick: this._onSingleplayerClick,
		});

		this.renderChild("multiplayer", ButtonComponent, {
			text: "Play multiplayer",
			onClick: this._onMultiplayerClick,
		});

		this.renderChild("profile", ButtonComponent, {
			text: "View profile",
			onClick: this._onProfileClick,
		});

		this.renderChild("leaderboard", ButtonComponent, {
			text: "Leaderboard",
			onClick: this._onLeaderboardClick,
		});

		this.renderChild("about", ButtonComponent, {
			text: "About",
			onClick: this._onAboutClick,
		});
	}

	/**
	 * Callback на нажатие "Play singleplayer"
	 */
	_onSingleplayerClick() {}

	/**
	 * Callback на нажатие "Play multiplayer"
	 */
	_onMultiplayerClick() {}

	/**
	 * Callback на нажатие "View profile"
	 */
	_onProfileClick() {}

	/**
	 * Callback на нажатие "Leaderboard"
	 */
	_onLeaderboardClick() {}

	/**
	 * Callback на нажатие "About"
	 */
	_onAboutClick() {
		// const about = new AboutComponent();
		// about.render();
		// const backside = document.querySelector("[ref=backside]");
		// const menu = document.querySelector("[ref=menu]");
		// backside.replaceChild(about.element, menu);
	}
}
