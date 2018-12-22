import "./menu.scss";
import template from "./menu.hbs";
import BaseComponent from "../baseComponent";
import ButtonComponent from "../button/button";
import http from "../../modules/http";

/**
 * Компонент меню
 */
export default class MenuComponent extends BaseComponent {
	constructor() {
		super();
		this.template = template;

		http.sessionInfo().then((info) => {
			this.render(info);
		});
	}

	render(context) {
		super.render(context);
		this._renderChildren();
	}

	/**
	 * Рендерит все кнопки и вешает на них callback
	 */
	_renderChildren() {
		this.renderChild("singleplayer", ButtonComponent, {
			text: "Играть",
			onClick: this._onSingleplayerClick.bind(this),
		});

		this.renderChild("multiplayer", ButtonComponent, {
			text: "Играть",
			onClick: this._onMultiplayerClick.bind(this),
		});

		this.renderChild("profile", ButtonComponent, {
			text: "Профиль",
			onClick: this._onProfileClick.bind(this),
		});

		this.renderChild("leaderboard", ButtonComponent, {
			text: "Лидеры",
			onClick: this._onLeaderboardClick.bind(this),
		});

		this.renderChild("about", ButtonComponent, {
			text: "О проекте",
			onClick: this._onAboutClick.bind(this),
		});

		this.renderChild("signin", ButtonComponent, {
			text: "Вход",
			onClick: this._onSignInClick.bind(this),
		});

		this.renderChild("signup", ButtonComponent, {
			text: "Регистрация",
			onClick: this._onSignUpClick.bind(this),
		});

		this.renderChild("logout", ButtonComponent, {
			text: "Выйти",
			onClick: this._onLogOutClick.bind(this),
		});

		this._element.querySelector("[id=close]").onclick = this._onModalCloseClick.bind(this);

		window.onclick = (event) => {
			if (event.target === this._element.querySelector("[id=modal]")) {
				this._onModalCloseClick();
			}
		};
	}

	/**
	 * Callback на нажатие "Play singleplayer"
	 */
	_onSingleplayerClick() {
		this._context.navigate("game");
	}

	/**
	 * Callback на нажатие "Play multiplayer"
	 */
	_onMultiplayerClick() {
		this._context.navigate("game");
	}

	/**
	 * Callback на нажатие "View profile"
	 */
	_onProfileClick() {
		this._context.navigate("profile");
	}

	/**
	 * Callback на нажатие "Leaderboard"
	 */
	_onLeaderboardClick() {
		this._context.navigate("leaderboard");
	}

	/**
	 * Callback на нажатие "About"
	 */
	_onAboutClick() {
		this._context.navigate("about");
	}

	/**
	 * Callback на нажатие "Sign In"
	 */
	_onSignInClick() {
		this._context.navigate("signin");
	}

	/**
	 * Callback на нажатие "Sign Up"
	 */
	_onSignUpClick() {
		this._context.navigate("signup");
	}

	/**
	 * Callback на нажатие "Log Out"
	 */
	_onLogOutClick() {
		http.logout()
			.then((response) => {
				if (response.status !== 410) {
					throw response;
				}

				this._context.navigate("menu");
			})
			.catch((error) => {
				error.json().then((info) => {
					this._element.querySelector("[data=modal-info]").innerHTML = info.msg;
					this._onModalOpen();
				});
			});
	}

	/**
	 * Callback на нажатие "X" в модальной форме
	 */
	_onModalCloseClick() {
		this._element.querySelector("[id=modal]").style.display = "none";
	}

	/**
	 * Callback на открытие модальной формы
	 */
	_onModalOpen() {
		this._element.querySelector("[id=modal]").style.display = "block";
	}
}
