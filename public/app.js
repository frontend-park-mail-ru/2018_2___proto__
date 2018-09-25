"use strict";

import ButtonComponent from "./scripts/components/button/button.js";
import LogoComponent from "./scripts/components/logo/logo.js";

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

const buttons = {
	menuButtons: {
		"Play singleplayer": null,
		"Play multiplayer": null,
		"View profile": renderProfile,
		"Leaderboard": renderLeaderboard,
		"About:": renderAbout,
	},
	authButtons: {
		"Sign In": renderSignIn,
		"Sign Up": renderSignUp,
	}
};

// Базовый шаблон

const root = document.getElementById("root");

function createPage() {
	// Содержимое auth-block
	const authBlock = document.createElement("div");
	authBlock.id = "auth-block";
	const authButtons = document.createElement("ul");
	authButtons.className = "buttons";

	Object.entries(buttons.authButtons).forEach(([title, method]) => {
		let btnComp = new ButtonComponent({
			text: title,
			click: method,
		});

		btnComp.render();
		let button = btnComp.element();
		authButtons.appendChild(button);
	});
	
	authBlock.appendChild(authButtons);
	root.appendChild(authBlock);

	// Содержимое logo-block
	const logo = new LogoComponent({
		text: "Our Game",
		click: renderMenu,
	});

	logo.render(logo.context);

	// const logoBlock = document.createElement("div");
	// logoBlock.id = "logo-block";
	// const logoHeader = document.createElement("h1");
	// const logoLink = document.createElement("a");
	// logoLink.textContent = "Our Game";

	// logoHeader.appendChild(logoLink);
	// logoBlock.appendChild(logoHeader);
	root.appendChild(logo.element());

	// Содерижмое main-block
	const mainBlock = document.createElement("div");
	mainBlock.id = "main-block";
	const backside = document.createElement("div");
	backside.id = "backside";

	mainBlock.appendChild(backside);
	root.appendChild(mainBlock);

	// renderMenu();
}

// Содержимое main-block
function renderMenu() {
	renderToMainBlock("menu.hbs");
}

function renderSignIn() {
	renderToMainBlock("signin.hbs");
}

function renderSignUp() {
	renderToMainBlock("signup.hbs");
}

function renderLeaderboard() {
	renderToMainBlock("leaderboard.hbs", leaders);
}

function renderProfile() {
	renderToMainBlock("profile.hbs", user);
}

function renderAbout() {
	renderToMainBlock("about.hbs", members);
}

function renderToMainBlock(template, data) {
	let mainBlock = document.getElementById("main-block");
	// mainBlock.innerHTML = Handlebars.templates[template](data);
}

window.onload = createPage();
