export default class Router {
	constructor() {
		this.defaultContext = {
			menu: false,
			profile: false,
			leaderboard: false,
			about: false,
			singleplayer: false,
			multiplayer: false,
			signin: false,
			signup: false,
		};

		this.currentContext = this.defaultContext;
	}

	/**
	 * Получение текущего URL
	 * @param {*} route
	 */
	static getLocation() {
		return `/${window.location.href.split("/").slice(-1)}`;
	}

	/**
	 * Переход на новый URL
	 * @param {string} route - компонент для перехода
	 */
	static go(route) {
		if (route === "/" || route === "menu") {
			this.currentContext = { ...this.defaultContext, ...{ menu: true } };
		} else {
			this.currentContext = { ...this.defaultContext, ...{ [route]: true } };
		}

		window.history.pushState(null, "", route);
		return this.currentContext;
	}

	/**
	 * Возврат на предыдущий URL
	 */
	static back() {
		window.history.back();
	}
}
