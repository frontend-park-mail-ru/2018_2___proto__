import ApplicationComponent from "./scripts/components/application/application";
import "./scripts/modules/http";

function createApplication() {
	const application = new ApplicationComponent();
	application.render();
	document.body.appendChild(application.element);
}

window.onload = createApplication();
