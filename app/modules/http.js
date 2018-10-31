import sendRequest from "./sendRequest";
import { backend } from "./constants";

export default new class HttpModule {
	constructor() {
		this.baseUrl = backend;
		this.username = null;
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
		}).then((info) => {
			this.username = info.nickname;
			return info;
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
		}).then((info) => {
			this.username = info.nickname;
			return info;
		});
	}

	/**
	 * Выход пользователя
	 * @returns {Promise}
	 */
	logout() {
		this.username = null;
		return sendRequest(`${this.baseUrl}/logout`, "DELETE", {});
	}

	/**
	 * Получание данных о себе
	 * @returns {Promise}
	 */
	getUser() {
		return sendRequest(`${this.baseUrl}/user`, "GET", {}).then((info) => {
			this.username = info.login;
			return info;
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
		}).then((info) => {
			this.username = info.login;
			return info;
		});
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
		return sendRequest(`${this.baseUrl}/leaders/${offset}/${limit}`, "GET", {}).then(((info) => {
			return info;
		}));
	}

	/**
	 * Получение данных о текущей сессии
	 */
	// sessionInfo() {
	// 	return sendRequest(`${this.baseUrl}/session`, "GET", {});
	// }
}();
