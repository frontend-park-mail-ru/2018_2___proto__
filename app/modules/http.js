import sendRequest from "./sendRequest";
import { backend } from "./constants";

export default new class HttpModule {
	constructor() {
		this.baseUrl = backend;
	}

	/**
	 * Регистрация нового пользователя
	 * @param {string} login - логин
	 * @param {string} email - почта
	 * @param {string} pass - пароль
	 * @returns {Promise}
	 */
	signup(login, email, pass) {
		return sendRequest(`${this.baseUrl}/signup`, "POST", {
			nickname: login,
			password: pass,
			email,
		});
	}

	/**
	 * Авторизация пользователя
	 * @param {string} login - логин
	 * @param {string} pass - пароль
	 * @returns {Promise}
	 */
	signin(login, pass) {
		return sendRequest(`${this.baseUrl}/signin`, "POST", {
			nickname: login,
			password: pass,
		});
	}

	/**
	 * Выход пользователя
	 * @returns {Promise}
	 */
	logout() {
		this.username = null;
		return sendRequest(`${this.baseUrl}/logout`, "DELETE");
	}

	/**
	 * Получание данных о себе
	 * @returns {Promise}
	 */
	getUser() {
		return sendRequest(`${this.baseUrl}/user`, "GET").then((response) => {
			if (response.status === 401) {
				return { isOnline: false };
			}

			return response.json().then(result => ({ ...result, ...{ isOnline: true } }));
		});
	}

	/**
	 * Обновление данных пользователя
	 * @param {string} login - логин
	 * @param {string} pass - пароль
	 * @returns {Promise}
	 */
	updateUser(login, pass) {
		return sendRequest(`${this.baseUrl}/user`, "PUT", {
			nickname: login,
			password: pass,
		}).then(response => response.json());
	}

	/**
	 * Обновление аватара пользователя (нужно реализовать)
	 * @returns {Promise}
	 */
	updateAvatar() {}

	/**
	 * Получение текущего состояния таблицы лидеров
	 * @param {*} offset - смещение по таблице
	 * @param {*} limit - число записей на странице
	 */
	getLeaderboard(offset, limit) {
		return sendRequest(`${this.baseUrl}/leaders/${offset}/${limit}`, "GET").then((response => response.json()));
	}

	/**
	 * Получение данных о текущей сессии
	 */
	sessionInfo() {
		return sendRequest(`${this.baseUrl}/session`, "GET").then((response) => {
			if (response.status === 200) {
				return { sessionExists: true, preloader: false };
			}

			return { sessionExists: false, preloader: false };
		});
	}
}();
