import { regexLogin, regexEmail, regexPass } from "./constants";

/**
 * Модуль валидации
 * Возвращает true, если валидация успешна и текстовое сообщение
 * с объяснением ошибки, если валидация не прошла успешно
 * @class ValidationModule
 */

export default class ValidationModule {
	/**
	 * Проверка логина
	 * @function validateLogin
	 * @param {string} login - логин
	 * @returns {string || true}
	 */
	static validateLogin(login) {
		if (!login) {
			return "Field is empty";
		}

		if (!login.match(regexLogin)) {
			return "Login must not start with a digit \nor contain non-latin symbols";
		}

		return true;
	}

	/**
	 * Проверка почты
	 * @function validateEmail
	 * @param {string} email - почта
	 * @returns {string || true}
	 */
	static validateEmail(email) {
		if (!email) {
			return "Field is empty";
		}

		if (!email.match(regexEmail)) {
			return "E-Mail is incorrect";
		}

		return true;
	}

	/**
	 * Проверка пароля
	 * @function validatePass
	 * @param {string} pass - пароль
	 * @returns {string || true}
	 */
	static validatePass(pass) {
		if (!pass) {
			return "Field is empty";
		}

		if (!pass.match(regexPass)) {
			return "Password must contain at least 8 \nsymbols (one uppercase and one digit)";
		}

		return true;
	}
}
