import ApplicationComponent from "./scripts/components/application/application";

// import MenuComponent from "./scripts/components/menu/menu";
// import LogoComponent from "./scripts/components/logo/logo";

// const root = document.querySelector("[ref=root]");
// const backside = document.querySelector("[ref=backside]");

function createApplication() {
	// debugger;
	const application = new ApplicationComponent();
	application.render();
	console.log(application.element);
	document.body.appendChild(application.element);
// 	const logo = new LogoComponent();
// 	const menu = new MenuComponent();

// 	logo.render();
// 	menu.render();

// 	backside.appendChild(menu.element);
// 	root.appendChild(logo.element);
}

window.onload = createApplication();
