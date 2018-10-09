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
			return "Login field is empty\n";
		}

		if (!login.match(regexLogin)) {
			return "Login must not starts with a digit or contains non-latin symbols\n";
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
			return "E-Mail field is empty\n";
		}

		if (!email.match(regexEmail)) {
			return "E-Mail is incorrect\n";
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
			return "Password field is empty\n";
		}

		if (!pass.match(regexPass)) {
			return "Password may contain 6 latin symbols and digits as min.\n";
		}

		return true;
	}
}
