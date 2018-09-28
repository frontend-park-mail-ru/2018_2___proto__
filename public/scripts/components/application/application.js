import "./application.css";
import template from "./application.hbs";
import BaseComponent from "../baseComponent/baseComponent";
import MenuComponent from "../menu/menu";
import LogoComponent from "../logo/logo";
import AboutComponent from "../about/about";

/**
 * Компонент приложения
 */
export default class ApplicationComponent extends BaseComponent {
	constructor() {
		super();
		this.template = template;
		this._context = {
			menu: true,
			profile: false,
			leaderboard: false,
			about: false,
		};
	}

	render() {
		super.render();
		this._renderChildren();
	}

	/**
	 * Рендерит все блоки на странице
	 */
	_renderChildren() {
		this.renderChild("logo", LogoComponent, {});
		this.renderChild("menu", MenuComponent, {});
		// this.renderChild("profile", ProfileComponent, {});
		// this.renderChild("leaderboard", LeaderboardComponent, {});
		this.renderChild("about", AboutComponent, {});
	}
}