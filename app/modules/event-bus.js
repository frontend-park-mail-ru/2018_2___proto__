/**
 * Модуль шины событий
 * @var {Map<string, Array<Function>>} listeners - связка всех callbacks с типом события
 */
export default new class EventBus {
	constructor() {
		this.listeners = new Map();
	}

	/**
	 * Подписка на событие
	 * @param {string} event - имя события
	 * @param {Function} callback - callback
	 * @var {Array<Function>>} events - массив событий
	 */
	on(event, callback) {
		let events = this.listeners.get(event);
		if (!events) {
			this.listeners.set(event, []);
			events = this.listeners.get(event);
		}

		events.push(callback);
	}

	/**
	 * Отписка от события
	 * @param {string} event - имя события
	 * @param {Function} callback - callback
	 * @var {Array<Function>>} events - массив событий
	 */
	off(event, callback) {
		const events = this.listeners.get(event);
		if (!events) {
			return;
		}

		events.splice(events.indexOf(callback), 1);
	}

	/**
	 * Диспатч события
	 * @param {string} event - имя события
	 * @param {Function} data - данные для диспатча
	 */
	emit(event, data) {
		const events = this.listeners.get(event);
		if (!events) {
			return;
		}

		events.forEach((callback) => {
			callback(data);
		});
	}

	/**
	 * Удаление события
	 * @param {string} event - имя события
	 */
	remove(event) {
		this.listeners.delete(event);
	}
}
