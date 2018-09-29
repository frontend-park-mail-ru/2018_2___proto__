import "./application.css";
import template from "./application.hbs";
import BaseComponent from "../baseComponent/baseComponent";
import MenuComponent from "../menu/menu";
import LogoComponent from "../logo/logo";
import AboutComponent from "../about/about";
import LeaderboardComponent from "../leaderboard/leaderboard";
import ProfileComponent from "../profile/profile";

/**
 * Компонент приложения
 */
export default class ApplicationComponent extends BaseComponent {
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
			case "profile":
				this._context = {
					menu: false,
					profile: true,
					leaderboard: false,
					about: false,
					singleplayer: false,
					multiplayer: false,
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
				};
				break;
			default:
				break;
		}

		this.render();
	}

	/**
	 * Рендерит все блоки на странице
	 */
	_renderChildren() {
		this.renderChild("logo", LogoComponent, { navigate: this.navigate });
		this.renderChild("menu", MenuComponent, { navigate: this.navigate });
		this.renderChild("about", AboutComponent, {});

		this.renderChild("profile", ProfileComponent, {
			username: "#USERNAME",
			email: "example@email.com",
			wins: 999,
			loses: 101,
			imgURL: "../../../img/avatar-blank.png",
		});

		this.renderChild("leaderboard", LeaderboardComponent, [
			{
				place: "1st",
				username: "KOPTEЗ",
				score: "OVER 9000",
			},
			{
				place: "2nd",
				username: "Vileven",
				score: "4500",
			},
			{
				place: "3rd",
				username: "avtyul",
				score: "4259",
			},
			{
				place: "4th",
				username: "8coon",
				score: "1234",
			},
			{
				place: "5th",
				username: "Armelior",
				score: "1",
			},
		]);
	}
}
