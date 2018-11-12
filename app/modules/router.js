export default class Router {
	constructor() {
		this.defaultContext = {
			game: false,
			menu: false,
			profile: false,
			leaderboard: false,
			about: false,
			singleplayer: false,
			multiplayer: false,
			signin: false,
			signup: false,
			notfound: false,
		};

		this.currentContext = this.defaultContext;
	}

	/**
	 * Получение текущего URL
	 * @param {string} route
	 */
	getLocation() {
		return window.location.pathname;
	}

	/**
	 * Переход по URL
	 * @param {string} route
	 * @returns {Object} - контекст для рендеринга
	 */
	go(route) {
		let historyRoute = route;
		let correctedRoute = route;
		let location = this.getLocation();

		switch (route) {
			case "/":
			case "/menu/":
			case "/index/":
				this.currentContext = { ...this.defaultContext, ...{ menu: true } };
				break;
			default:
				if (route.startsWith("/")) {
					correctedRoute = route.slice(1);
				}

				if (route.endsWith("/")) {
					correctedRoute = correctedRoute.slice(0, -1);
				}

				if (Object.keys(this.defaultContext).includes(correctedRoute)) {
					this.currentContext = { ...this.defaultContext, ...{ [correctedRoute]: true } };
				} else {
					return { notfound: true };
				}
				break;
		}

		if (route !== "/" && route.endsWith("/")) {
			historyRoute = historyRoute.slice(0, -1);
		}

		if (location !== "/" && location.endsWith("/")) {
			location = location.slice(0, -1);
		}

		if (route !== location) {
			window.history.pushState({ historyRoute }, null, historyRoute);
		}

		return this.currentContext;
	}
}
