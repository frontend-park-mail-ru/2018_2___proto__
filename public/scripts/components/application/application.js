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

		// this.renderChild("profile", ProfileComponent, {
			// login: "#USERNAME",
			// email: "example@email.com",
			// wins: 999,
			// loses: 101,
			// imgURL: "../../../img/avatar-blank.png",
		// });

		// this.renderChild("leaderboard", LeaderboardComponent, {
			// count: 12,
			// offset: 0,
			// records: [
			// 	{
			// 		nickname: "KOPTEЗ",
			// 		score: 9000,
			// 	},
			// 	{
			// 		nickname: "Armelior",
			// 		score: 11,
			// 	},
			// 	{
			// 		nickname: "avtyul",
			// 		score: 4259,
			// 	},
			// 	{
			// 		nickname: "Vileven",
			// 		score: 4500,
			// 	},
			// 	{
			// 		nickname: "8coon",
			// 		score: 1234,
			// 	},
			// 	{
			// 		nickname: "AlexMally",
			// 		score: 2277,
			// 	},
			// 	{
			// 		nickname: "Geralt of Rivia",
			// 		score: 472,
			// 	},
			// 	{
			// 		nickname: "Mother Fuehrer Gentelman",
			// 		score: 1488,
			// 	},
			// 	{
			// 		nickname: "Adeline Winterhalter",
			// 		score: 282,
			// 	},
			// 	{
			// 		nickname: "Bled Nevelny",
			// 		score: 2018,
			// 	},
			// 	{
			// 		nickname: "Fra Paul",
			// 		score: 7100,
			// 	},
			// 	{
			// 		nickname: "Nagibator1337",
			// 		score: 0,
			// 	},
			// ],
		// });
	}
}
