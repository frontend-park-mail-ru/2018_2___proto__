"use strict";

import ButtonComponent from "./scripts/components/button/button.js";
import MenuComponent from "./scripts/components/menu/menu.js";
import LogoComponent from "./scripts/components/logo/logo.js";
import AboutComponent from "./scripts/components/about/about.js";

// Данные для шаблонов

const leaders = [
	{
		place: "1st",
		username: "KOPTEЗ",
		score: "OVER 9000"
	},
	{
		place: "2nd",
		username: "Vileven",
		score: "4500"
	},
	{
		place: "3rd",
		username: "avtyul",
		score: "4259"
	},
	{
		place: "4th",
		username: "8coon",
		score: "1234"
	},
	{
		place: "5th",
		username: "Armelior",
		score: "1"
	}
];

const user = {
	avatar: "../img/avatar-blank.png",
	username: "#USERNAME",
	email: "example@mail.ru",
	wins: "1707",
	loses: "42"
};

// Базовый шаблон

const root = document.querySelector("[ref=root]");

function createPage() {
	const logo = new LogoComponent();
	logo.render();
	root.appendChild(logo.element);

	const mainBlock = document.createElement("div");
	mainBlock.className = "main-block";
	mainBlock.setAttribute("ref", "main");
	const backside = document.createElement("div");
	backside.className = "backside";
	backside.setAttribute("ref", "backside");

	const menu = new MenuComponent();
	menu.render();
	backside.appendChild(menu.element);
	mainBlock.appendChild(backside);
	root.appendChild(mainBlock);
}

window.onload = createPage();
