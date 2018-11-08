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
		window.onpopstate = (event) => {
			console.log(event.state);
			this.navigate(event.state);
		}
		this.navigate(Router.getLocation());
	}

	render(context) {
		super.render(context);
		this._renderChildren();
	}

	navigate(item) {
		this._context = Router.go(item);
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
		this.renderChild("leaderboard", LeaderboardComponent, { records: [] });
		this.renderChild("profile", ProfileComponent, {});
		this.renderChild("about", AboutComponent, {});
	}
}
