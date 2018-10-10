/**
 * Метод отправки запросов на бэкенд
 * @function sendRequest
 * @param {string} path - адрес запроса
 * @param {string} method - метод запроса
 * @param {Object} body - тело запроса
 * @returns {Promise}
 */

export default function sendRequest(path, method, body = {}) {
	return fetch(path, {
		method,
		mode: "cors",
		credentials: "include",
		body: Object.is(body, {}) ? {} : JSON.stringify(body),
		headers: { "Content-Type": "application/json; charset=utf-8" },
	}).then((response) => {
		const json = response.json();

		if (response.status >= 400) {
			return json.then((exception) => {
				throw exception;
			});
		}

		return json;
	});
}
