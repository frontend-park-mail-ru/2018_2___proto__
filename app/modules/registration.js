import Validator from "./validation";

/**
 * Проверка полей формы регистрации
 * @function registrationCheck
 * @param {string} login - логин
 * @param {string} email - почта
 * @param {string} pass - пароль
 * @param {string} passRep - повтор пароля
 * @returns {string || true}
 */
export default function registrationCheck(login, email, pass, passRep) {
	let errorInfo = "";

	const loginValidation = Validator.validateLogin(login);
	const emailValidation = Validator.validateEmail(email);
	const passValidation = Validator.validatePass(pass);
	const passRepValidation = Validator.validatePass(passRep);

	if (loginValidation !== true) {
		errorInfo += loginValidation;
	}

	if (emailValidation !== true) {
		errorInfo += emailValidation;
	}

	if (passValidation !== true && passRepValidation !== true) {
		errorInfo += passValidation;
	} else if (passValidation !== true) {
		errorInfo += passValidation;
	} else if (passRepValidation !== true) {
		errorInfo += passRepValidation;
	}

	if (pass !== passRep) {
		errorInfo += "Passwords do not match\n";
	}

	if (errorInfo !== "") {
		return errorInfo;
	}

	return true;
}
