import ApplicationComponent from "./components/application/application";

function createApplication() {
	const application = new ApplicationComponent();
	application.render({ preloader: true });
	document.body.appendChild(application.element);
}

window.onload = createApplication();
