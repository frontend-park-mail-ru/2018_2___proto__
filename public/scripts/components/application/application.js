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
		this.navigate = this.navigate.bind(this);
		this._context = {
			menu: true,
			profile: false,
			leaderboard: false,
			about: false,
		};
	}

	render(context) {
		super.render(context);
		this._renderChildren();
	}

	navigate(item) {
		switch (item) {
			case "singleplayer":
			case "multiplayer":
			case "profile":
			case "about":
				this._context = {
					menu: false,
					profile: false,
					leaderboard: false,
					about: true,
				};
				break;
			case "menu":
				this._context = {
					menu: true,
					profile: false,
					leaderboard: false,
					about: false,
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
	}
}
