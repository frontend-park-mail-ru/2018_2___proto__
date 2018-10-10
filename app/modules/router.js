/**
 * Модуль роутинга
 */
export default new class Router {
	constructor() {
		this.routes = new Map();
	}

	/**
	 * Регистрация нового урла и компонента
	 * @param {string} path - путь
	 * @param {BaseView} view - компонент
	 */
	register(path, view) {
		this.routes.set(path, view);
		return this;
	}

	/**
	 * Получение текущего положения
	 */
	static getLocation() {
		return `/${window.location.href.split("/").slice(-1)}`;
	}

	/**
	 * Запуск роутера
	 */
	start() {
		window.onpopstate = () => {
			this.go(Router.getLocation());
		};

		document.body.addEventListener("click", event => {
			if (
				event.target.tagName !== "button"
				|| !(event.target instanceof HTMLAnchorElement)
			) {
				return;
			}

			event.preventDefault();
			const path = event.target.value;
			this.go(path);
		});

		this.go(Router.getLocation());
	}

	/**
	 * Переход по урлу
	 * @param {string} path - путь
	 */
	go(path) {
		let view = this.routes.get(path);
		if (!view) {
			this.go("/");
			return;
		}

		if (Router.getLocation() !== path) {
			window.history.pushState(null, "", path);
		}

		if (this.current) {
			this.current.destroy();
		}

		view.render();
		this.current = view;
	}

	/**
	 * Возвращение на предыдущий урл
	 */
	back() {
		window.history.back();
	}
}();
