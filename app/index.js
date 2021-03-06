import ApplicationComponent from "./components/application/application";

function createApplication() {
	const application = new ApplicationComponent();
	application.render();
	document.body.appendChild(application.element);
}

window.onload = createApplication();
