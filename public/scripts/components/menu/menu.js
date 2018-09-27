"use strict";

import "./menu.css";
import BaseComponent from "../baseComponent/baseComponent.js";
import ButtonComponent from "../button/button.js";
import AboutComponent from "../about/about.js";

export default class MenuComponent extends BaseComponent {
	constructor() {
		super();
		this._template = require("./menu.hbs");
	}

	render() {
		super.render();
		this._renderChildren();
	}

	_renderChildren() {
		this._renderChild("singleplayer", ButtonComponent, {
			text: "Play singleplayer",
			onClick: this._onSingleplayerClick
		});

		this._renderChild("multiplayer", ButtonComponent, {
			text: "Play multiplayer",
			onClick: this._onMultiplayerClick
		});

		this._renderChild("profile", ButtonComponent, {
			text: "View profile",
			onClick: this._onProfileClick
		});

		this._renderChild("leaderboard", ButtonComponent, {
			text: "Leaderboard",
			onClick: this._onLeaderboardClick
		});

		this._renderChild("about", ButtonComponent, {
			text: "About",
			onClick: this._onAboutClick
		});
	}

	_onSingleplayerClick() {}

	_onMultiplayerClick() {}

	_onProfileClick() {}

	_onLeaderboardClick() {}

	_onAboutClick() {
		const about = new AboutComponent();
		about.render();
		const backside = document.querySelector("[ref=backside]");
		const menu = document.querySelector("[ref=menu]");
		backside.replaceChild(about.element, menu);
	}
}
