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
	 * Переход на новый URL
	 * @param {string} route - компонент для перехода
	 */
	static go(route) {
		window.history.pushState(null, "", route);
		this.currentContext = { ...this.defaultContext, ...{ [route]: true } };
	}

	/**
	 * Возврат на предыдущий URL
	 */
	static back() {
		window.history.back();
	}
}
