import "./application.scss";
import template from "./application.hbs";
import BaseComponent from "../baseComponent";
import MenuComponent from "../menu/menu";
import LogoComponent from "../logo/logo";
import AboutComponent from "../about/about";
import LeaderboardComponent from "../leaderboard/leaderboard";
import ProfileComponent from "../profile/profile";
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
		this.router = new Router();
		window.onpopstate = () => {
			this.navigate(this.router.getLocation());
		};

		this.navigate(this.router.getLocation());
	}

	render(context) {
		super.render(context);
		this._renderChildren();
	}

	navigate(route) {
		this._context = this.router.go(route);
		this.render();
	}

	/**
	 * Рендерит все блоки на странице
	 */
	_renderChildren() {
		this.renderChild("signin", SignInComponent, { navigate: this.navigate });
		this.renderChild("signup", SignUpComponent, { navigate: this.navigate });
		this.renderChild("menu", MenuComponent, { navigate: this.navigate, preloader: true });
		this.renderChild("logo", LogoComponent, { navigate: this.navigate });
		this.renderChild("leaderboard", LeaderboardComponent, { preloader: true });
		this.renderChild("profile", ProfileComponent, { preloader: true });
		this.renderChild("about", AboutComponent, {});
	}
}
