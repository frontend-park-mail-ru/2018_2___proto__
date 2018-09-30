import "./application.css";
import template from "./application.hbs";
import BaseComponent from "../baseComponent/baseComponent";
import MenuComponent from "../menu/menu";
import LogoComponent from "../logo/logo";
import AboutComponent from "../about/about";
import LeaderboardComponent from "../leaderboard/leaderboard";
import ProfileComponent from "../profile/profile";
import AuthComponent from "../auth/auth";
import SignInComponent from "../sign_in/sign_in";
import SignUpComponent from "../sign_up/sign_up";

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
	 * Рендерит все блоки на странице
	 */
	_renderChildren() {
		this.renderChild("auth", AuthComponent, { navigate: this.navigate });
		this.renderChild("logo", LogoComponent, { navigate: this.navigate });
		this.renderChild("menu", MenuComponent, { navigate: this.navigate });
		this.renderChild("signin", SignInComponent, { navigate: this.navigate });
		this.renderChild("signup", SignUpComponent, { navigate: this.navigate });
		this.renderChild("about", AboutComponent, {});

		this.renderChild("profile", ProfileComponent, {
			login: "#USERNAME",
			email: "example@email.com",
			wins: 999,
			loses: 101,
			imgURL: "../../../img/avatar-blank.png",
		});

		this.renderChild("leaderboard", LeaderboardComponent, {
			cscores: 12,
			offset: 0,
			records: [
				{
					username: "KOPTEЗ",
					score: 9000,
				},
				{
					username: "Armelior",
					score: 11,
				},
				{
					username: "avtyul",
					score: 4259,
				},
				{
					username: "Vileven",
					score: 4500,
				},
				{
					username: "8coon",
					score: 1234,
				},
				{
					username: "AlexMally",
					score: 2277,
				},
				{
					username: "Geralt of Rivia",
					score: 472,
				},
				{
					username: "Mother Fuehrer Gentelman",
					score: 1488,
				},
				{
					username: "Adeline Winterhalter",
					score: 282,
				},
				{
					username: "Bled Nevelny",
					score: 2018,
				},
				{
					username: "Fra Paul",
					score: 7100,
				},
				{
					username: "Nagibator1337",
					score: 0,
				},
			],
		});
	}
}
