import "./application.scss";
import template from "./application.hbs";
import BaseComponent from "../baseComponent";
import MenuComponent from "../menu/menu";
import LogoComponent from "../logo/logo";
import AboutComponent from "../about/about";
import LeaderboardComponent from "../leaderboard/leaderboard";
import ProfileComponent from "../profile/profile";
import AuthComponent from "../auth/auth";
import SignInComponent from "../forms/signin/signin";
import SignUpComponent from "../forms/signup/signup";
import Router from "../../modules/router";

/**
 * Компонент приложения
 */
export default class ApplicationComponent extends BaseComponent {
	constructor() {
		super();
		this.template = template;
		this.navigate = this.navigate.bind(this);
		this.navigate("menu");
		// this._context = {
		// 	menu: true,
		// 	profile: false,
		// 	leaderboard: false,
		// 	about: false,
		// 	singleplayer: false,
		// 	multiplayer: false,
		// 	signin: false,
		// 	signup: false,
		// };

		// this._routes = new Map();
		// this._routes.set("singleplayer", undefined);
		// this._routes.set("multiplayer", undefined);

		// this.setLeaderboardContext = this.setLeaderboardContext.bind(this);
		// this._routes.set("leaderboard", this.setLeaderboardContext);

		// this.setProfileContext = this.setProfileContext.bind(this);
		// this._routes.set("profile", this.setProfileContext);

		// this.setSignInContext = this.setSignInContext.bind(this);
		// this._routes.set("signin", this.setSignInContext);

		// this.setSignUpContext = this.setSignUpContext.bind(this);
		// this._routes.set("signup", this.setSignUpContext);

		// this.setAboutContext = this.setAboutContext.bind(this);
		// this._routes.set("about", this.setAboutContext);

		// this.setMenuContext = this.setMenuContext.bind(this);
		// this._routes.set("menu", this.setMenuContext);
	}

	render(context) {
		super.render(context);
		this._renderChildren();
	}

	// setSignInContext() {
	// 	this._context = {
	// 		menu: false,
	// 		profile: false,
	// 		leaderboard: false,
	// 		about: false,
	// 		singleplayer: false,
	// 		multiplayer: false,
	// 		signin: true,
	// 		signup: false,
	// 	};
	// }

	// setSignUpContext() {
	// 	this._context = {
	// 		menu: false,
	// 		profile: false,
	// 		leaderboard: false,
	// 		about: false,
	// 		singleplayer: false,
	// 		multiplayer: false,
	// 		signin: false,
	// 		signup: true,
	// 	};
	// }

	// setProfileContext() {
	// 	this._context = {
	// 		menu: false,
	// 		profile: true,
	// 		leaderboard: false,
	// 		about: false,
	// 		singleplayer: false,
	// 		multiplayer: false,
	// 		signin: false,
	// 		signup: false,
	// 	};
	// }

	// setAboutContext() {
	// 	this._context = {
	// 		menu: false,
	// 		profile: false,
	// 		leaderboard: false,
	// 		about: true,
	// 		singleplayer: false,
	// 		multiplayer: false,
	// 		signin: false,
	// 		signup: false,
	// 	};
	// }

	// setMenuContext() {
	// 	this._context = {
	// 		menu: true,
	// 		profile: false,
	// 		leaderboard: false,
	// 		about: false,
	// 		singleplayer: false,
	// 		multiplayer: false,
	// 		signin: false,
	// 		signup: false,
	// 	};
	// }

	// setLeaderboardContext() {
	// 	this._context = {
	// 		menu: false,
	// 		profile: false,
	// 		leaderboard: true,
	// 		about: false,
	// 		singleplayer: false,
	// 		multiplayer: false,
	// 		signin: false,
	// 		signup: false,
	// 	};
	// }

	navigate(item) {
		Router.go(item);
		this.render();

		// const route = this._routes.get(item);

		// if (route !== undefined) {
		// 	route();
		// 	this.render();
		// }
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
		this.renderChild("leaderboard", LeaderboardComponent, {});
		this.renderChild("profile", ProfileComponent, {});
		this.renderChild("about", AboutComponent, {});
	}
}
