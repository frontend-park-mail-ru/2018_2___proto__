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
		}).then((response) => {
			if (response.status === 201) {
				const info = response.json();
				this.username = info.nickname;
			}

			return response.status;
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
		}).then((response) => {
			if (response.status === 200) {
				const info = response.json();
				this.username = info.nickname;
			}

			return response.status;
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

			debugger;
			const info = response.json();
			console.log(info);
			console.log({ ...info, ...{ isOnline: true } });
			this.username = info.login;
			return { ...info, ...{ isOnline: true } };
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
		}).then((response) => {
			const info = response.json();
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
		return sendRequest(`${this.baseUrl}/leaders/${offset}/${limit}`, "GET", {}).then(((response) => {
			const info = response.json();
			return info;
		}));
	}

	/**
	 * Получение данных о текущей сессии
	 */
	sessionInfo() {
		return sendRequest(`${this.baseUrl}/session`, "GET").then((response => response.status === 200 ? { isOnline: true } : { isOnline: false }));
	}
}();
