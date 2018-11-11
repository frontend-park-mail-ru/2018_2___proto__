/**
 * Метод отправки запросов на бэкенд
 * @function sendRequest
 * @param {string} path - адрес запроса
 * @param {string} method - метод запроса
 * @param {Object} body - тело запроса
 * @returns {Promise}
 */

export default function sendRequest(path, method, body = null) {
	return fetch(path, {
		method,
		mode: "cors",
		credentials: "include",
		body: null && JSON.stringify(body) ? null : body,
		headers: { "Content-Type": "application/json; charset=utf-8" },
	});
}
