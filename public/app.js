import MenuComponent from "./scripts/components/menu/menu";
import LogoComponent from "./scripts/components/logo/logo";

const root = document.querySelector("[ref=root]");
const backside = document.querySelector("[ref=backside]");

function createPage() {
	const logo = new LogoComponent();
	const menu = new MenuComponent();

	logo.render();
	menu.render();

	backside.appendChild(menu.element);
	root.appendChild(logo.element);
}

window.onload = createPage();
