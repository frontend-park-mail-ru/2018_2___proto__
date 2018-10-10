import "./application.scss";
import template from "./application.hbs";
import BaseView from "../baseView";
import LogoView from "../logo/logo";
import AuthBarView from "../auth/auth";

/**
 * Компонент приложения
 */
export default class ApplicationView extends BaseView {
	constructor() {
		super();
		this.template = template;
		this.navigate = this.navigate.bind(this);
		this._context = {
			menu: true,
			profile: false,
			leaderboard: false,
			about: false,
			singleplayer: false,
			multiplayer: false,
			signin: false,
			signup: false,
		};
	}

	render(context) {
		super.render(context);
		this._renderChildren();
	}

	navigate(item) {
		switch (item) {
			case "singleplayer":
				break;
			case "multiplayer":
				break;
			case "signin":
				this._context = {
					menu: false,
					profile: false,
					leaderboard: false,
					about: false,
					singleplayer: false,
					multiplayer: false,
					signin: true,
					signup: false,
				};
				break;
			case "signup":
				this._context = {
					menu: false,
					profile: false,
					leaderboard: false,
					about: false,
					singleplayer: false,
					multiplayer: false,
					signin: false,
					signup: true,
				};
				break;
			case "profile":
				this._context = {
					menu: false,
					profile: true,
					leaderboard: false,
					about: false,
					singleplayer: false,
					multiplayer: false,
					signin: false,
					signup: false,
				};
				break;
			case "about":
				this._context = {
					menu: false,
					profile: false,
					leaderboard: false,
					about: true,
					singleplayer: false,
					multiplayer: false,
					signin: false,
					signup: false,
				};
				break;
			case "menu":
				this._context = {
					menu: true,
					profile: false,
					leaderboard: false,
					about: false,
					singleplayer: false,
					multiplayer: false,
					signin: false,
					signup: false,
				};
				break;
			case "leaderboard":
				this._context = {
					menu: false,
					profile: false,
					leaderboard: true,
					about: false,
					singleplayer: false,
					multiplayer: false,
					signin: false,
					signup: false,
				};
				break;
			default:
				break;
		}

		this.render();
	}

	/**
	 * Рендерит дочерние
	 */
	_renderChildren() {
		this.renderChild("auth", AuthBarView, { navigate: this.navigate });
		this.renderChild("logo", LogoView, { navigate: this.navigate });
		// Как быть с дочерними?
	}
}
