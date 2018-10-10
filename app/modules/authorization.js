import Validator from "./validation";

/**
 * Проверка полей формы авторизации
 * @param {string} login - логин
 * @param {string} pass - пароль
 * @returns {string || true}
 */
export default function authorizationCheck(login, pass) {
	let errorInfo = "";

	const loginValidation = Validator.validateLogin(login);
	const passValidation = Validator.validatePass(pass);

	if (loginValidation !== true) {
		errorInfo += loginValidation;
	}

	if (passValidation !== true) {
		errorInfo += passValidation;
	}

	if (errorInfo !== "") {
		return errorInfo;
	}
	
	return true;
}
