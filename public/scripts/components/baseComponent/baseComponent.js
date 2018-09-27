/** Базовый класс-компонент */
export default class BaseComponent {
	/**
	 * Конструктор
	 * @param {node} _element - Внутреннее представление в виде HTML-ноды
	 * @param {object} events - События компонента для рендеринга (Protected)
	 */
	constructor() {
		this._element = null;
		this.events = {};
	}

	/**
	 * Рендерит компонент в зависимости от контекста и обновляет Listeners @protected
	 * @param {object} newContext - Контекст для компонента
	 */
	render(newContext = {}) {
		this._removeEvents();
		this._renderTemplate(newContext);
		this._addEvents();
	}

	get element() {
		return this._element;
	}

	/**
	 * Рендерит дочерний компонент @protected
	 * @param {string} ref - Параметр ref родительского элемента
	 * @param {object} Component - Компонент для рендеринга
	 * @param {object} context - Контекст для компонента
	 */
	renderChild(ref, Component, context) {
		if (!ref) {
			return;
		}

		const parentNode = this._element.querySelector(`[ref=${ref}]`);
		const childNode = new Component();
		childNode.render(context);

		while (parentNode.firstChild) {
			parentNode.removeChild(parentNode.firstChild);
		}

		parentNode.appendChild(childNode.element);
	}

	/**
	 * Рендерит шаблон в зависимости от контекста
	 * @param {object} newContext - Контекст для компонента
	 */
	_renderTemplate(newContext = {}) {
		this._context = { ...this._context, ...newContext };
		const div = document.createElement("div");
		div.innerHTML = this.template(this._context);
		const newElement = div.firstChild;

		if (this._element) {
			this._element.parentNode.replaceChild(newElement, this._element);
		}

		this._element = newElement;
	}

	/**
	 * Ввешает Listeners
	 */
	_addEvents() {
		Object.entries(this.events).forEach(([event, callback]) => {
			this._element.addEventListener(event, callback);
		});
	}

	/**
	 * Убирает Listeners
	 */
	_removeEvents() {
		if (this._element) {
			Object.entries(this.events).forEach(([event, callback]) => {
				this._element.removeEventListener(event, callback);
			});
		}
	}
}
