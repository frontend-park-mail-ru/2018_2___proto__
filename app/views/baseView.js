import EventBus from "../modules/event-bus";
import RequestModule from "../modules/request";

/**
 * Базовый класс-компонент
 */
export default class BaseView {
	/**
	 * Конструктор
	 * @param {node} _element - Внутреннее представление в виде HTML-ноды
	 * @param {array} _children - Все дочерние компоненты
	 * @param {object} events - События компонента для рендеринга (Protected)
	 */
	constructor() {
		this._element = null;
		this._children = [];
		this.events = {};
		this.eventBus = EventBus;
		this.requestModule = RequestModule;
		this.template = null;
	}

	/**
	 * Рендерит компонент в зависимости от контекста и обновляет Listeners
	 * @param {object} newContext - Контекст для компонента
	 */
	render(newContext = {}) {
		this._removeEvents();
		this._renderTemplate(newContext);
		this._addEvents();
	}

	/**
	 * Уничтожает все Listeners себя и своих дочерних
	 */
	destroy() {
		this._removeEvents();
		this._children.forEach((child) => {
			child.destroy();
		});
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
		const oldChild = this._children[ref];
		if (oldChild) {
			oldChild.destroy();
		}

		delete this._children[ref];

		const parentNode = this._element.querySelector(`[ref=${ref}]`);
		if (parentNode === null) {
			return;
		}

		const newChild = new Component();
		newChild.render(context);
		const newChildNodes = newChild.element.querySelectorAll("*");

		for (let i = 0; i < newChildNodes.length; i++) {
			newChildNodes[i].removeAttribute("ref");
		}

		this._children[ref] = newChild;

		while (parentNode.firstChild) {
			parentNode.removeChild(parentNode.firstChild);
		}

		parentNode.appendChild(newChild.element);
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
	 * Вешает Listeners
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
