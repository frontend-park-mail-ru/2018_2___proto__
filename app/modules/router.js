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
		return window.location.pathname;
	}

	/**
	 * Переход на новый URL
	 * @param {string} route - компонент для перехода
	 */
	static go(route) {
		if (route === "/" || route === "/menu/") {
			this.currentContext = { ...this.defaultContext, ...{ menu: true } };
		} else {
			let correctedRoute = route;

			if (route.startsWith("/")) {
				correctedRoute = route.slice(1);
			}

			if (route.endsWith("/")) {
				correctedRoute = correctedRoute.slice(0, -1);
			}

			this.currentContext = { ...this.defaultContext, ...{ [correctedRoute]: true } };
		}

		window.history.pushState({ route }, route, route);
		return this.currentContext;
	}

	/**
	 * Возврат на предыдущий URL
	 */
	static back() {
		window.history.back();
	}
}
