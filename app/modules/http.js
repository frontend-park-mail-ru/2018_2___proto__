export default new class HttpModule {
	_http({
		callback = () => null,
		method = "GET",
		path = "/",
		body,
	} = {}) {
		const xhr = new XMLHttpRequest();
		xhr.open(method, path, true);
		xhr.withCredentials = true;

		if (body) {
			xhr.setRequestHeader(
				"Content-Type",
				"application/json; charset=utf-8",
			);
		}

		xhr.onreadystatechange = () => {
			if (xhr.readyState !== 4) {
				return;
			}

			callback(xhr);
		};

		if (body) {
			xhr.send(JSON.stringify(body));
		} else {
			xhr.send();
		}
	}

	doGet(params = {}) {
		this._http({ ...params, method: "GET" });
	}

	doPost(params = {}) {
		this._http({ ...params, method: "POST" });
	}

	doPut(params = {}) {
		this._http({ ...params, method: "PUT" });
	}

	doDelete(params = {}) {
		this._http({ ...params, method: "DELETE" });
	}
}();
